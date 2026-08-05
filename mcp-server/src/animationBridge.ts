import * as fs from 'node:fs';
import * as path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { deflateSync } from 'node:zlib';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import {
  SPRITE_DOCUMENT_VERSION,
  buildAnimationBundle,
  generateWalkRightDocument,
  serializeBundleReviewSidecar,
  deserializeDocumentV2,
  hashDocumentPixels,
  hashDocumentSemantic,
  migrateProjectFileV1,
  serializeDocumentV2,
  canonicalJson,
  validateDocumentV2,
  compositeFrame,
  type SpriteDocumentV2,
  type SpriteClipV2,
  type BundleReviewStatus,
  type WalkRightBrief,
  type ValidationIssue,
} from '@guile-pix/sprite-core';
import { getOutputDir } from './outputDir.js';
import { getPalette } from './palettes/builtIn.js';
import { analyzeFrameChanges, assertContactSheetSize, getContactSheetDimensions, renderContactSheet } from './review.js';
import { encodeAnimationAtlas } from './animationBundle.js';
import { PNG } from 'pngjs';
import * as gifencModule from 'gifenc';

const gifenc = typeof gifencModule.GIFEncoder === 'function'
  ? gifencModule
  : (gifencModule as unknown as { default: typeof gifencModule }).default;
const { GIFEncoder, applyPalette, quantize } = gifenc;

export type BridgeErrorCode =
  | 'STALE_REVISION'
  | 'INVALID_TARGET'
  | 'INVALID_CEL_REF'
  | 'VALIDATION_FAILED';

interface Hashes {
  semantic: string;
  pixels: string;
}

interface HistorySnapshot {
  document: SpriteDocumentV2;
  operation: string;
  bytes: number;
}

interface ProjectSession {
  document: SpriteDocumentV2;
  baseline: SpriteDocumentV2;
  undo: HistorySnapshot[];
  redo: HistorySnapshot[];
  reviewSequence: number;
}

const MAX_HISTORY_ENTRIES = 32;
const MAX_HISTORY_BYTES = 32 * 1024 * 1024;

function snapshotBytes(document: SpriteDocumentV2): number {
  return Buffer.byteLength(JSON.stringify(document));
}

function pushHistory(stack: HistorySnapshot[], document: SpriteDocumentV2, operation: string): void {
  stack.push({ document: cloneDocument(document), operation, bytes: snapshotBytes(document) });
  let total = stack.reduce((sum, entry) => sum + entry.bytes, 0);
  while (stack.length > MAX_HISTORY_ENTRIES || total > MAX_HISTORY_BYTES) {
    total -= stack.shift()!.bytes;
  }
}

interface BridgeOptions {
  outputDir?: string;
}

interface MutationResult {
  target?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

interface PixelEntry {
  x: number;
  y: number;
  color: string;
}

interface MaskRun { y: number; xStart: number; xEnd: number }
interface PixelMask { runs: MaskRun[] }
interface NamedMask { mask: PixelMask; bounds: { x: number; y: number; width: number; height: number } }

class BridgeFault extends Error {
  constructor(
    readonly code: BridgeErrorCode,
    message: string,
    readonly correctiveAction: string,
    readonly target?: Record<string, unknown>,
    readonly issues?: ValidationIssue[],
  ) {
    super(message);
  }
}

function cloneDocument<T>(document: T): T {
  return JSON.parse(JSON.stringify(document)) as T;
}

async function documentHashes(document: SpriteDocumentV2): Promise<Hashes> {
  return {
    semantic: await hashDocumentSemantic(document),
    pixels: await hashDocumentPixels(document),
  };
}

function response(
  payload: Record<string, unknown>,
  options: { isError?: boolean; image?: Buffer; mimeType?: string } = {},
): CallToolResult {
  const content: CallToolResult['content'] = [{ type: 'text', text: JSON.stringify(payload) }];
  if (options.image) {
    content.push({ type: 'image', data: options.image.toString('base64'), mimeType: options.mimeType ?? 'image/png' });
  }
  return {
    content,
    structuredContent: payload,
    ...(options.isError ? { isError: true } : {}),
  };
}

function rgba(color: string): [number, number, number, number] | null {
  if (!/^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color)) return null;
  let value = color.slice(1);
  if (value.length === 3) value = [...value].map((part) => part + part).join('');
  if (value.length === 6) value += 'ff';
  return [0, 2, 4, 6].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16)) as [number, number, number, number];
}

function safeName(value: string): string {
  const sanitized = value.replace(/[^a-zA-Z0-9._-]/g, '_');
  return sanitized || 'sprite';
}

function isWithin(target: string, root: string): boolean {
  const relative = path.relative(root, target);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function makeUniqueCelId(document: SpriteDocumentV2, base: string): string {
  let candidate = base;
  let suffix = 2;
  while (document.cels[candidate]) candidate = `${base}:${suffix++}`;
  return candidate;
}

function clipsOf(document: SpriteDocumentV2): SpriteClipV2[] {
  return document.clips ?? [document.clip];
}

function materializeClips(document: SpriteDocumentV2): SpriteClipV2[] {
  if (!document.clips) {
    document.clips = [cloneDocument(document.clip) as SpriteClipV2];
    document.activeClipId = document.clip.id;
  }
  return document.clips;
}

function syncActiveClip(document: SpriteDocumentV2): void {
  if (!document.clips) return;
  const active = document.clips.find((clip) => clip.id === document.activeClipId);
  if (!active) throw new BridgeFault('INVALID_TARGET', 'Active clip was not found', 'Choose an existing active clip.');
  document.clip = cloneDocument(active) as SpriteClipV2;
}

function insertIntoActiveClip(document: SpriteDocumentV2, frameId: string, afterFrameId: string): void {
  if (!document.clips) { document.clip.frameIds = document.frames.map((frame) => frame.id); return; }
  const active = document.clips.find((clip) => clip.id === document.activeClipId)!;
  const index = active.frameIds.indexOf(afterFrameId);
  active.frameIds.splice(index < 0 ? active.frameIds.length : index + 1, 0, frameId);
  syncActiveClip(document);
}

function garbageCollectCels(document: SpriteDocumentV2): void {
  const used = new Set(document.frames.flatMap((frame) => Object.values(frame.celRefs)));
  for (const id of Object.keys(document.cels)) if (!used.has(id)) delete document.cels[id];
}

function normalizeMask(mask: PixelMask, width: number, height: number): NamedMask {
  if (!mask || !Array.isArray(mask.runs) || mask.runs.length < 1 || mask.runs.length > width * height) {
    throw new BridgeFault('VALIDATION_FAILED', 'Mask must contain bounded coordinate runs', 'Provide at least one in-bounds run.');
  }
  const points = new Set<string>();
  for (const run of mask.runs) {
    if (!Number.isInteger(run.y) || !Number.isInteger(run.xStart) || !Number.isInteger(run.xEnd)
      || run.y < 0 || run.y >= height || run.xStart < 0 || run.xEnd < run.xStart || run.xEnd >= width) {
      throw new BridgeFault('VALIDATION_FAILED', 'Mask run is outside the canvas', 'Use inclusive, in-bounds xStart/xEnd coordinates.');
    }
    for (let x = run.xStart; x <= run.xEnd; x += 1) points.add(`${x},${run.y}`);
  }
  const coordinates = [...points].map((key) => key.split(',').map(Number) as [number, number]).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  const runs: MaskRun[] = [];
  for (const [x, y] of coordinates) {
    const previous = runs.at(-1);
    if (previous && previous.y === y && previous.xEnd + 1 === x) previous.xEnd = x;
    else runs.push({ y, xStart: x, xEnd: x });
  }
  const xs = coordinates.map(([x]) => x);
  const ys = coordinates.map(([, y]) => y);
  return { mask: { runs }, bounds: { x: Math.min(...xs), y: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs) + 1, height: Math.max(...ys) - Math.min(...ys) + 1 } };
}

function maskPoints(mask: PixelMask): Array<{ x: number; y: number }> {
  return mask.runs.flatMap((run) => Array.from({ length: run.xEnd - run.xStart + 1 }, (_, index) => ({ x: run.xStart + index, y: run.y })));
}

function resolveCel(document: SpriteDocumentV2, frameId?: string, layerId?: string) {
  const resolvedFrameId = frameId ?? document.activeFrameId;
  const resolvedLayerId = layerId ?? document.activeLayerId;
  const frame = document.frames.find((candidate) => candidate.id === resolvedFrameId);
  const layer = document.layers.find((candidate) => candidate.id === resolvedLayerId);
  if (!frame || !layer) throw new BridgeFault('INVALID_TARGET', 'Frame or layer was not found', 'Use existing frame and layer IDs.', { frameId: resolvedFrameId, layerId: resolvedLayerId });
  if (layer.locked) throw new BridgeFault('INVALID_TARGET', `Layer "${resolvedLayerId}" is locked`, 'Unlock the layer before editing.');
  const celId = frame.celRefs[resolvedLayerId];
  const cel = document.cels[celId];
  if (!cel) throw new BridgeFault('INVALID_CEL_REF', `Missing cel "${celId}"`, 'Repair the cel reference before editing.');
  return { frame, layer, cel, celId, frameId: resolvedFrameId, layerId: resolvedLayerId };
}

function linePoints(x0: number, y0: number, x1: number, y1: number): Array<{ x: number; y: number }> {
  const result: Array<{ x: number; y: number }> = [];
  let x = x0; let y = y0;
  const dx = Math.abs(x1 - x0); const sx = x0 < x1 ? 1 : -1;
  const dy = -Math.abs(y1 - y0); const sy = y0 < y1 ? 1 : -1;
  let error = dx + dy;
  while (true) {
    result.push({ x, y });
    if (x === x1 && y === y1) break;
    const twice = 2 * error;
    if (twice >= dy) { error += dy; x += sx; }
    if (twice <= dx) { error += dx; y += sy; }
  }
  return result;
}

function pixelMass(data: number[]): number {
  let count = 0;
  for (let offset = 3; offset < data.length; offset += 4) if (data[offset] > 0) count += 1;
  return count;
}

function opaqueBounds(data: number[], width: number, height: number) {
  let minX = width; let minY = height; let maxX = -1; let maxY = -1;
  for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
    if (data[(y * width + x) * 4 + 3] === 0) continue;
    minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
  }
  return maxX < 0 ? null : { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

function shortestOpaquePath(data: number[], width: number, height: number, starts: Array<{ x: number; y: number }>, goals: Set<string>): Array<{ x: number; y: number }> | null {
  const queue = [...starts]; const previous = new Map<string, string | null>(); for (const start of starts) previous.set(`${start.x},${start.y}`, null);
  let found: string | undefined;
  while (queue.length > 0 && !found) { const point = queue.shift()!; const key = `${point.x},${point.y}`; if (goals.has(key)) { found = key; break; } for (const next of [{ x: point.x, y: point.y - 1 }, { x: point.x - 1, y: point.y }, { x: point.x + 1, y: point.y }, { x: point.x, y: point.y + 1 }]) { const nextKey = `${next.x},${next.y}`; if (next.x < 0 || next.y < 0 || next.x >= width || next.y >= height || previous.has(nextKey) || data[(next.y * width + next.x) * 4 + 3] === 0) continue; previous.set(nextKey, key); queue.push(next); } }
  if (!found) return null; const path: Array<{ x: number; y: number }> = []; let cursor: string | null = found; while (cursor) { const [x, y] = cursor.split(',').map(Number); path.push({ x, y }); cursor = previous.get(cursor) ?? null; } return path.reverse();
}

function regionMetrics(data: number[], width: number, points: Array<{ x: number; y: number }>) {
  const opaque = new Set(points.filter(({ x, y }) => x >= 0 && y >= 0 && x < width && (y * width + x) * 4 + 3 < data.length && data[(y * width + x) * 4 + 3] > 0).map(({ x, y }) => `${x},${y}`));
  const coordinates = [...opaque].map((key) => key.split(',').map(Number) as [number, number]);
  const bounds = coordinates.length === 0 ? null : { x: Math.min(...coordinates.map(([x]) => x)), y: Math.min(...coordinates.map(([, y]) => y)), width: Math.max(...coordinates.map(([x]) => x)) - Math.min(...coordinates.map(([x]) => x)) + 1, height: Math.max(...coordinates.map(([, y]) => y)) - Math.min(...coordinates.map(([, y]) => y)) + 1 };
  let components = 0; const visited = new Set<string>(); for (const key of opaque) { if (visited.has(key)) continue; components += 1; const queue = [key]; while (queue.length) { const current = queue.shift()!; if (visited.has(current)) continue; visited.add(current); const [x, y] = current.split(',').map(Number); for (const neighbor of [`${x - 1},${y}`, `${x + 1},${y}`, `${x},${y - 1}`, `${x},${y + 1}`]) if (opaque.has(neighbor) && !visited.has(neighbor)) queue.push(neighbor); } }
  let enclosedHoles = 0;
  if (bounds) { const empty = new Set<string>(); for (let y = bounds.y; y < bounds.y + bounds.height; y += 1) for (let x = bounds.x; x < bounds.x + bounds.width; x += 1) if (!opaque.has(`${x},${y}`)) empty.add(`${x},${y}`); const outside = new Set<string>(); const queue = [...empty].filter((key) => { const [x, y] = key.split(',').map(Number); return x === bounds.x || y === bounds.y || x === bounds.x + bounds.width - 1 || y === bounds.y + bounds.height - 1; }); while (queue.length) { const current = queue.shift()!; if (outside.has(current)) continue; outside.add(current); const [x, y] = current.split(',').map(Number); for (const neighbor of [`${x - 1},${y}`, `${x + 1},${y}`, `${x},${y - 1}`, `${x},${y + 1}`]) if (empty.has(neighbor) && !outside.has(neighbor)) queue.push(neighbor); } const holes = [...empty].filter((key) => !outside.has(key)); const counted = new Set<string>(); for (const key of holes) { if (counted.has(key)) continue; enclosedHoles += 1; const holeQueue = [key]; while (holeQueue.length) { const current = holeQueue.shift()!; if (counted.has(current)) continue; counted.add(current); const [x, y] = current.split(',').map(Number); for (const neighbor of [`${x - 1},${y}`, `${x + 1},${y}`, `${x},${y - 1}`, `${x},${y + 1}`]) if (empty.has(neighbor) && !outside.has(neighbor) && !counted.has(neighbor)) holeQueue.push(neighbor); } } }
  return { pixelMass: opaque.size, bounds, components, enclosedHoles };
}

function uint32(value: number): Buffer { const buffer = Buffer.alloc(4); buffer.writeUInt32BE(value >>> 0); return buffer; }
function crc32(buffer: Buffer): number { let crc = 0xffffffff; for (const byte of buffer) { crc ^= byte; for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); } return (crc ^ 0xffffffff) >>> 0; }
function pngChunk(type: string, data: Buffer): Buffer { const name = Buffer.from(type, 'ascii'); const body = Buffer.concat([name, data]); return Buffer.concat([uint32(data.length), body, uint32(crc32(body))]); }
function encodeApng(frames: Buffer[], width: number, height: number, durations: number[], repeat: number): Buffer {
  const chunks: Buffer[] = [Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])]; const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4); ihdr[8] = 8; ihdr[9] = 6; chunks.push(pngChunk('IHDR', ihdr), pngChunk('acTL', Buffer.concat([uint32(frames.length), uint32(repeat)])));
  let sequence = 0; frames.forEach((rgbaFrame, index) => { const control = Buffer.alloc(26); control.writeUInt32BE(sequence++, 0); control.writeUInt32BE(width, 4); control.writeUInt32BE(height, 8); control.writeUInt32BE(0, 12); control.writeUInt32BE(0, 16); control.writeUInt16BE(durations[index], 20); control.writeUInt16BE(1000, 22); control[24] = 0; control[25] = 0; chunks.push(pngChunk('fcTL', control)); const rows = Buffer.alloc(height * (width * 4 + 1)); for (let y = 0; y < height; y += 1) rgbaFrame.copy(rows, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4); const compressed = deflateSync(rows, { level: 9 }); chunks.push(index === 0 ? pngChunk('IDAT', compressed) : pngChunk('fdAT', Buffer.concat([uint32(sequence++), compressed]))); }); chunks.push(pngChunk('IEND', Buffer.alloc(0))); return Buffer.concat(chunks);
}

function encodeGif(frames: Buffer[], width: number, height: number, durations: number[], repeat: number): Buffer {
  const encoder = GIFEncoder();
  frames.forEach((frame, index) => {
    const rgbaFrame = new Uint8ClampedArray(frame);
    const palette = quantize(rgbaFrame, 256, { format: 'rgba4444', oneBitAlpha: true });
    const indexed = applyPalette(rgbaFrame, palette, 'rgba4444');
    const options = { palette, delay: durations[index], repeat, transparent: palette.some((color) => color[3] === 0), transparentIndex: Math.max(0, palette.findIndex((color) => color[3] === 0)) } as unknown as Parameters<typeof encoder.writeFrame>[3];
    encoder.writeFrame(indexed, width, height, options);
  });
  encoder.finish();
  return Buffer.from(encoder.bytes());
}

async function buildGenericBundle(document: SpriteDocumentV2) {
  const clip = document.clip; const frameWidth = document.project.width; const frameHeight = document.project.height; const count = clip.frameIds.length; const columns = Math.ceil(Math.sqrt(count)); const rows = Math.ceil(count / columns); const atlasWidth = columns * frameWidth; const atlasHeight = rows * frameHeight; const rgbaBytes = atlasWidth * atlasHeight * 4; if (!Number.isSafeInteger(rgbaBytes) || rgbaBytes > 64 * 1024 * 1024) throw new Error('Generic atlas exceeds the 64 MiB RGBA limit');
  const atlasRgba = new Uint8Array(rgbaBytes); const framePixels = clip.frameIds.map((id) => new Uint8Array(compositeFrame(document, id))); for (let i = 0; i < count; i += 1) { const originX = (i % columns) * frameWidth; const originY = Math.floor(i / columns) * frameHeight; for (let y = 0; y < frameHeight; y += 1) atlasRgba.set(framePixels[i].subarray(y * frameWidth * 4, (y + 1) * frameWidth * 4), ((originY + y) * atlasWidth + originX) * 4); }
  const atlasSha256 = await hashBytes(atlasRgba); const paletteSha256 = await hashBytes(Buffer.from(canonicalJson(document.palette))); const framePixelHashes = await Promise.all(framePixels.map(hashBytes)); const documentSemanticHash = await hashDocumentSemantic(document);
  const manifest = { frames: clip.frameIds.map((id, i) => { const frame = document.frames.find((candidate) => candidate.id === id)!; return { filename: `${safeName(clip.name)}-${i}.png`, frame: { x: (i % columns) * frameWidth, y: Math.floor(i / columns) * frameHeight, w: frameWidth, h: frameHeight }, rotated: false, trimmed: false, spriteSourceSize: { x: 0, y: 0, w: frameWidth, h: frameHeight }, sourceSize: { w: frameWidth, h: frameHeight }, duration: frame.durationMs }; }), meta: { app: 'guile-pix', version: '2.0', image: 'atlas.png', format: 'RGBA8888', size: { w: atlasWidth, h: atlasHeight }, scale: '1', frameTags: [{ name: clip.name, from: 0, to: count - 1, direction: clip.direction ?? 'forward', loop: clip.loop }], slices: [{ name: 'guile_pix_origin', color: '#00000000', keys: [{ frame: 0, bounds: { x: 0, y: 0, w: frameWidth, h: frameHeight }, pivot: document.pivotPx }] }], guile_pix: { schemaVersion: 2, atlasSha256, documentSemanticHash, palette: { id: document.production?.paletteId ?? null, name: document.production?.paletteName ?? null, sha256: paletteSha256 }, framePixelHashes, facing: document.production?.facing ?? 'none', groundLineY: document.production?.groundLineY ?? document.pivotPx.y, rootMotion: document.production?.rootMotion ?? { mode: 'none' }, artisticApproval: 'pending_human_review', godot: { animationName: clip.name, loop: clip.loop !== 'once' } } } };
  const bundleHash = await hashBytes(Buffer.from(canonicalJson(manifest))); (manifest.meta as { guile_pix: Record<string, unknown> }).guile_pix.bundleHash = bundleHash; return { atlasWidth, atlasHeight, atlasRgba, atlasSha256, bundleHash, manifest, manifestJson: canonicalJson(manifest) };
}

async function hashBytes(value: Uint8Array | Uint8ClampedArray): Promise<string> { return createHash('sha256').update(value).digest('hex'); }

export class AnimationBridge {
  private readonly sessions = new Map<string, ProjectSession>();
  private readonly operationQueues = new Map<string, Promise<void>>();
  private readonly outputDir: string;
  private nextProjectId = 1;
  private readonly masks = new Map<string, Map<string, NamedMask>>();

  constructor(options: BridgeOptions = {}) {
    this.outputDir = path.resolve(options.outputDir ?? getOutputDir());
    fs.mkdirSync(this.outputDir, { recursive: true });
  }

  getDocument(projectId: string): SpriteDocumentV2 | undefined {
    const document = this.sessions.get(projectId)?.document;
    return document ? cloneDocument(document) : undefined;
  }

  private async serial<T>(projectId: string, work: () => Promise<T>): Promise<T> {
    const previous = this.operationQueues.get(projectId) ?? Promise.resolve();
    let release!: () => void;
    const gate = new Promise<void>((resolve) => { release = resolve; });
    this.operationQueues.set(projectId, previous.then(() => gate));
    await previous;
    try {
      return await work();
    } finally {
      release();
    }
  }

  private async failure(
    projectId: string | undefined,
    code: BridgeErrorCode,
    message: string,
    correctiveAction: string,
    target?: Record<string, unknown>,
    issues?: ValidationIssue[],
  ): Promise<CallToolResult> {
    const session = projectId ? this.sessions.get(projectId) : undefined;
    const payload: Record<string, unknown> = {
      ok: false,
      code,
      message,
      correctiveAction,
      ...(projectId ? { projectId } : {}),
      ...(target ? { target } : {}),
      ...(issues ? { issues } : {}),
    };
    if (session) {
      payload.currentRevision = session.document.revision;
      payload.currentHashes = await documentHashes(session.document);
    }
    return response(payload, { isError: true });
  }

  private async mutate(
    projectId: string,
    expectedRevision: number,
    operation: string,
    apply: (draft: SpriteDocumentV2) => MutationResult | Promise<MutationResult>,
  ): Promise<CallToolResult> {
    return this.serial(projectId, async () => {
      const session = this.sessions.get(projectId);
      if (!session) {
        return this.failure(projectId, 'INVALID_TARGET', `Project "${projectId}" was not found`, 'Use create_sprite or load_project first.');
      }
      const current = session.document;
      if (current.revision !== expectedRevision) {
        return this.failure(
          projectId,
          'STALE_REVISION',
          `Expected revision ${expectedRevision}, current revision is ${current.revision}`,
          `Retry with expectedRevision ${current.revision}.`,
        );
      }
      const beforeHashes = await documentHashes(current);
      const draft = cloneDocument(current);
      let mutationResult: MutationResult;
      try {
        mutationResult = await apply(draft);
      } catch (error) {
        if (error instanceof BridgeFault) {
          return this.failure(projectId, error.code, error.message, error.correctiveAction, error.target, error.issues);
        }
        return this.failure(projectId, 'VALIDATION_FAILED', (error as Error).message, 'Correct the operation and retry.');
      }
      draft.project.updatedAt = Date.now();
      draft.revision = current.revision + 1;
      const validated = validateDocumentV2(draft);
      if (!validated.ok) {
        return this.failure(
          projectId,
          'VALIDATION_FAILED',
          'The operation would produce an invalid sprite document',
          'Correct the reported document issues and retry.',
          mutationResult.target,
          validated.issues,
        );
      }
      const afterHashes = await documentHashes(validated.value);
      if (beforeHashes.semantic === afterHashes.semantic && beforeHashes.pixels === afterHashes.pixels) {
        return this.failure(projectId, 'VALIDATION_FAILED', 'The operation would not change the document', 'Change at least one value before retrying.', mutationResult.target);
      }
      if (session.document !== current || session.document.revision !== expectedRevision) {
        return this.failure(projectId, 'STALE_REVISION', 'The project changed before commit', 'Read the latest revision and retry.');
      }
      session.document = validated.value;
      pushHistory(session.undo, current, operation);
      session.redo = [];
      return response({
        ok: true,
        operation,
        projectId,
        revision: validated.value.revision,
        beforeHashes,
        afterHashes,
        ...(mutationResult.target ? { target: mutationResult.target } : {}),
        ...(mutationResult.data ?? {}),
        history: { undoDepth: session.undo.length, redoDepth: 0, maxEntries: MAX_HISTORY_ENTRIES, maxBytes: MAX_HISTORY_BYTES },
      });
    });
  }

  async createSprite(args: { width: number; height: number; name?: string; palette?: string }): Promise<CallToolResult> {
    const projectId = (() => {
      let id = `proj-${this.nextProjectId++}`;
      while (this.sessions.has(id)) id = `proj-${this.nextProjectId++}`;
      return id;
    })();
    const palette = args.palette ? getPalette(args.palette) : undefined;
    if (args.palette && !palette) {
      return this.failure(undefined, 'VALIDATION_FAILED', `Unknown palette "${args.palette}"`, 'Use a listed built-in palette.');
    }
    const now = Date.now();
    const layerId = 'layer-1';
    const frameId = 'frame-0';
    const celId = `cel:${frameId}:${layerId}`;
    const document: SpriteDocumentV2 = {
      version: SPRITE_DOCUMENT_VERSION,
      project: { id: projectId, name: args.name ?? 'Untitled Sprite', width: args.width, height: args.height, createdAt: now, updatedAt: now },
      layers: [{ id: layerId, name: 'Layer 1', visible: true, locked: false, opacity: 1, blendMode: 'normal' }],
      cels: { [celId]: { id: celId, data: new Array(args.width * args.height * 4).fill(0) } },
      frames: [{ id: frameId, durationMs: 100, celRefs: { [layerId]: celId } }],
      clip: { id: 'clip-default', name: 'default', frameIds: [frameId], loop: 'linear' },
      palette: palette ? [...palette.colors] : [],
      ...(palette ? { production: { paletteId: args.palette!.toLowerCase(), paletteName: palette.name } } : {}),
      pivotPx: { x: Math.floor(args.width / 2), y: args.height - 1 },
      activeLayerId: layerId,
      activeFrameId: frameId,
      revision: 0,
    };
    const validated = validateDocumentV2(document);
    if (!validated.ok) {
      return this.failure(undefined, 'VALIDATION_FAILED', 'Could not create a valid sprite document', 'Correct the project inputs.', undefined, validated.issues);
    }
    this.sessions.set(projectId, { document: validated.value, baseline: cloneDocument(validated.value), undo: [], redo: [], reviewSequence: 0 });
    return response({
      ok: true,
      operation: 'create_sprite',
      projectId,
      revision: 0,
      width: args.width,
      height: args.height,
      activeLayerId: layerId,
      activeFrameId: frameId,
      frames: [{ id: frameId, durationMs: 100 }],
      pivotPx: validated.value.pivotPx,
      palette: { id: validated.value.production?.paletteId, name: validated.value.production?.paletteName, colors: validated.value.palette },
      afterHashes: await documentHashes(validated.value),
    });
  }

  async loadProject(args: { filePath: string }): Promise<CallToolResult> {
    const filePath = path.resolve(args.filePath);
    let text: string;
    try {
      const stat = fs.statSync(filePath);
      if (!stat.isFile() || stat.size > 64 * 1024 * 1024) throw new Error('Project must be a file no larger than 64 MiB');
      text = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      return this.failure(undefined, 'VALIDATION_FAILED', `Could not read project: ${(error as Error).message}`, 'Provide a readable v1 or v2 project file.');
    }
    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      return this.failure(undefined, 'VALIDATION_FAILED', 'Project is not valid JSON', 'Correct the project JSON and retry.');
    }
    const version = typeof raw === 'object' && raw !== null ? (raw as { version?: unknown }).version : undefined;
    const loaded = version === 2 ? deserializeDocumentV2(text) : migrateProjectFileV1(raw);
    if (!loaded.ok) {
      return this.failure(undefined, 'VALIDATION_FAILED', 'Project validation failed', 'Correct the reported project issues and retry.', undefined, loaded.issues);
    }
    const projectId = loaded.value.project.id;
    await this.serial(projectId, async () => {
      this.sessions.set(projectId, { document: loaded.value, baseline: cloneDocument(loaded.value), undo: [], redo: [], reviewSequence: 0 });
      this.masks.delete(projectId);
    });
    return response({
      ok: true,
      operation: 'load_project',
      projectId,
      revision: loaded.value.revision,
      version: loaded.value.version,
      frameCount: loaded.value.frames.length,
      layerCount: loaded.value.layers.length,
      activeLayerId: loaded.value.activeLayerId,
      activeFrameId: loaded.value.activeFrameId,
      afterHashes: await documentHashes(loaded.value),
    });
  }

  async saveProject(args: { projectId: string; expectedRevision: number; outputPath?: string; overwrite?: boolean }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId);
      if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.');
      if (session.document.revision !== args.expectedRevision) {
        return this.failure(args.projectId, 'STALE_REVISION', `Expected revision ${args.expectedRevision}, current revision is ${session.document.revision}`, `Retry with expectedRevision ${session.document.revision}.`);
      }
      const serialized = serializeDocumentV2(session.document);
      if (!serialized.ok) return this.failure(args.projectId, 'VALIDATION_FAILED', 'Project validation failed before save', 'Correct the reported issues.', undefined, serialized.issues);
      const target = args.outputPath
        ? path.resolve(args.outputPath)
        : path.join(this.outputDir, `${safeName(session.document.project.name)}.dogsprite`);
      if (!isWithin(target, this.outputDir)) {
        return this.failure(args.projectId, 'VALIDATION_FAILED', `Save path must be inside ${this.outputDir}`, 'Choose an outputPath inside the MCP output directory.');
      }
      const parent = path.dirname(target);
      let temporary = '';
      try {
        fs.mkdirSync(parent, { recursive: true });
        const realRoot = fs.realpathSync(this.outputDir);
        const realParent = fs.realpathSync(parent);
        if (!isWithin(realParent, realRoot)) throw new Error('Resolved save directory leaves the MCP output directory');
        temporary = path.join(realParent, `.${path.basename(target)}.${randomUUID()}.tmp`);
        fs.writeFileSync(temporary, serialized.value, { encoding: 'utf8', flag: 'wx' });
        if (args.overwrite) fs.renameSync(temporary, target);
        else { fs.linkSync(temporary, target); fs.rmSync(temporary); }
      } catch (error) {
        if (temporary && fs.existsSync(temporary)) fs.rmSync(temporary);
        return this.failure(args.projectId, 'VALIDATION_FAILED', `Project save failed: ${(error as Error).message}`, 'Choose a fresh output path or set overwrite true deliberately.');
      }
      session.baseline = cloneDocument(session.document);
      return response({
        ok: true,
        operation: 'save_project',
        projectId: args.projectId,
        revision: session.document.revision,
        outputPath: target,
        overwrite: args.overwrite ?? false,
        afterHashes: await documentHashes(session.document),
      });
    });
  }

  async exportAnimationBundle(args: {
    projectId: string;
    expectedRevision: number;
    outputPath?: string;
    reviewStatus?: BundleReviewStatus;
  }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId);
      if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load the approved walk project first.');
      if (session.document.revision !== args.expectedRevision) {
        return this.failure(
          args.projectId,
          'STALE_REVISION',
          `Expected revision ${args.expectedRevision}, current revision is ${session.document.revision}`,
          `Retry with expectedRevision ${session.document.revision}.`,
        );
      }
      const fixed = await buildAnimationBundle(session.document);
      let bundle: { atlasWidth: number; atlasHeight: number; atlasRgba: Uint8Array<ArrayBufferLike>; atlasSha256: string; bundleHash: string; manifest: { frames: unknown[] }; manifestJson: string };
      let atlasPng: Buffer;
      if (fixed.ok) { bundle = fixed.value; atlasPng = encodeAnimationAtlas(fixed.value); }
      else {
        try { bundle = await buildGenericBundle(session.document); const png = new PNG({ width: bundle.atlasWidth, height: bundle.atlasHeight }); png.data.set(bundle.atlasRgba); atlasPng = PNG.sync.write(png); }
        catch (error) { return this.failure(args.projectId, 'VALIDATION_FAILED', `Generic runtime bundle failed: ${(error as Error).message}`, 'Correct the document metadata or reduce the atlas allocation.'); }
      }
      const target = args.outputPath
        ? path.resolve(args.outputPath)
        : path.join(this.outputDir, 'bundles', `${safeName(args.projectId)}-${safeName(session.document.clip.name)}-r${session.document.revision}`);
      if (!isWithin(target, this.outputDir)) {
        return this.failure(args.projectId, 'VALIDATION_FAILED', `Bundle path must be inside ${this.outputDir}`, 'Choose an outputPath inside the MCP output directory.');
      }
      const parent = path.dirname(target);
      let temporaryDir = '';
      try {
        fs.mkdirSync(parent, { recursive: true });
        const realRoot = fs.realpathSync(this.outputDir);
        const realParent = fs.realpathSync(parent);
        if (!isWithin(realParent, realRoot)) throw new Error('Resolved bundle directory leaves the MCP output directory');
        if (fs.existsSync(target)) throw new Error('Bundle output directory already exists; choose a fresh outputPath');
        temporaryDir = fs.mkdtempSync(path.join(realParent, `.${path.basename(target)}.pending-`));
        fs.writeFileSync(path.join(temporaryDir, 'atlas.png'), atlasPng, { flag: 'wx' });
        fs.writeFileSync(path.join(temporaryDir, 'manifest.json'), bundle.manifestJson, { encoding: 'utf8', flag: 'wx' });
        if (args.reviewStatus) {
          fs.writeFileSync(
            path.join(temporaryDir, 'review.json'),
            serializeBundleReviewSidecar(bundle.bundleHash, args.reviewStatus),
            { encoding: 'utf8', flag: 'wx' },
          );
        }
        fs.renameSync(temporaryDir, target);
      } catch (error) {
        if (temporaryDir && fs.existsSync(temporaryDir)) fs.rmSync(temporaryDir, { recursive: true });
        return this.failure(args.projectId, 'VALIDATION_FAILED', `Animation bundle export failed: ${(error as Error).message}`, 'Correct the output path or filesystem condition and retry.');
      }
      return response({
        ok: true,
        operation: 'export_animation_bundle',
        projectId: args.projectId,
        revision: session.document.revision,
        outputPath: target,
        atlasPath: path.join(target, 'atlas.png'),
        manifestPath: path.join(target, 'manifest.json'),
        ...(args.reviewStatus ? { reviewPath: path.join(target, 'review.json'), reviewStatus: args.reviewStatus } : {}),
        bundleHash: bundle.bundleHash,
        atlasSha256: bundle.atlasSha256,
        atlasSize: { width: bundle.atlasWidth, height: bundle.atlasHeight },
        frameCount: bundle.manifest.frames.length,
        runtimeReadiness: 'structurally_engine_ready',
        artisticApproval: 'pending_human_review',
        bundleKind: fixed.ok ? 'frozen_compatibility_fixture' : 'generic_v2',
        afterHashes: await documentHashes(session.document),
      });
    });
  }

  async generateWalkRight(args: {
    projectId: string;
    expectedRevision: number;
    brief: WalkRightBrief;
  }): Promise<CallToolResult> {
    const mutation = await this.mutate(args.projectId, args.expectedRevision, 'generate_walk_right', async (draft) => {
      const generated = await generateWalkRightDocument(draft, args.brief);
      if (!generated.ok) {
        throw new BridgeFault(
          'VALIDATION_FAILED',
          'Source or brief does not satisfy the frozen walk_right recipe',
          'Use the exact approved source pixels and fixed walk_right brief; no document changes were applied.',
          { sourceArtifactId: args.brief.sourceArtifactId, clipName: args.brief.clipName },
          generated.issues,
        );
      }
      Object.assign(draft, generated.value.document);
      return {
        target: { clipName: 'walk_right', frameIds: generated.value.document.frames.map((frame) => frame.id) },
        data: {
          recipeId: generated.value.recipeId,
          poseIds: generated.value.poseIds,
          structuralValidation: {
            document: 'valid',
            animationBundle: 'valid',
            sourcePixelSha256: generated.value.sourcePixelSha256,
            bundleHash: generated.value.bundleHash,
            atlasSha256: generated.value.atlasSha256,
          },
        },
      };
    });
    if (mutation.isError) return mutation;

    const mutationData = mutation.structuredContent as Record<string, unknown>;
    let review: CallToolResult;
    try {
      review = await this.getAnimationReview({ projectId: args.projectId, scale: 4 });
    } catch (error) {
      return response({
        ...mutationData,
        reviewStatus: 'generation_failed',
        reviewArtifacts: null,
        reviewRetry: { tool: 'get_animation_review', arguments: { projectId: args.projectId, scale: 4 } },
        reviewError: (error as Error).message,
        artisticApproval: 'pending_human_review',
      });
    }
    if (review.isError) {
      return response({
        ...mutationData,
        reviewStatus: 'generation_failed',
        reviewArtifacts: null,
        reviewRetry: { tool: 'get_animation_review', arguments: { projectId: args.projectId, scale: 4 } },
        reviewError: review.structuredContent,
        artisticApproval: 'pending_human_review',
      });
    }
    const reviewData = review.structuredContent as Record<string, unknown>;
    const reviewImage = review.content.find((item) => item.type === 'image');
    return response({
      ...mutationData,
      reviewNumber: reviewData.reviewNumber,
      reviewStatus: 'ready',
      reviewScale: reviewData.scale,
      reviewArtifacts: reviewData.artifacts,
      changedFrames: reviewData.changedFrames,
      artisticApproval: 'pending_human_review',
    }, {
      ...(reviewImage?.type === 'image' ? { image: Buffer.from(reviewImage.data, 'base64') } : {}),
    });
  }

  async setPixels(args: { projectId: string; expectedRevision: number; frameId?: string; layer?: string; pixels: PixelEntry[] }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'set_pixels', (draft) => {
      const frameId = args.frameId ?? draft.activeFrameId;
      const layerId = args.layer ?? draft.activeLayerId;
      const frame = draft.frames.find((candidate) => candidate.id === frameId);
      const layer = draft.layers.find((candidate) => candidate.id === layerId);
      const target = { frameId, layerId };
      if (!frame || !layer) throw new BridgeFault('INVALID_TARGET', 'Frame or layer was not found', 'Use an existing frameId and layer ID.', target);
      if (layer.locked) throw new BridgeFault('INVALID_TARGET', `Layer "${layerId}" is locked`, 'Unlock the layer in the source document before editing.', target);
      const celId = frame.celRefs[layerId];
      const cel = draft.cels[celId];
      if (!cel) throw new BridgeFault('INVALID_CEL_REF', `Frame "${frameId}" references missing cel "${celId}"`, 'Repair the cel reference before editing.', { ...target, celId });
      const parsed = args.pixels.map((pixel) => ({ ...pixel, rgba: rgba(pixel.color) }));
      if (parsed.some((pixel) => !pixel.rgba || pixel.x < 0 || pixel.x >= draft.project.width || pixel.y < 0 || pixel.y >= draft.project.height)) {
        throw new BridgeFault('VALIDATION_FAILED', 'Every pixel must have an in-bounds coordinate and valid hex color', 'Correct the pixel batch; no pixels were changed.', { ...target, celId });
      }
      for (const pixel of parsed) {
        const offset = (pixel.y * draft.project.width + pixel.x) * 4;
        cel.data.splice(offset, 4, ...pixel.rgba!);
      }
      return { target: { ...target, celId }, data: { pixelsWritten: parsed.length } };
    });
  }

  async clearLayer(args: { projectId: string; expectedRevision: number; frameId?: string; layer?: string }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'clear_layer', (draft) => {
      const frameId = args.frameId ?? draft.activeFrameId;
      const layerId = args.layer ?? draft.activeLayerId;
      const frame = draft.frames.find((candidate) => candidate.id === frameId);
      const layer = draft.layers.find((candidate) => candidate.id === layerId);
      const target = { frameId, layerId };
      if (!frame || !layer) throw new BridgeFault('INVALID_TARGET', 'Frame or layer was not found', 'Use an existing frameId and layer ID.', target);
      if (layer.locked) throw new BridgeFault('INVALID_TARGET', `Layer "${layerId}" is locked`, 'Unlock the layer in the source document before editing.', target);
      const celId = frame.celRefs[layerId];
      const cel = draft.cels[celId];
      if (!cel) throw new BridgeFault('INVALID_CEL_REF', `Missing cel "${celId}"`, 'Repair the cel reference before editing.', { ...target, celId });
      cel.data.fill(0);
      return { target: { ...target, celId } };
    });
  }

  async setActiveLayer(args: { projectId: string; layerId: string }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId);
      if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.');
      if (!session.document.layers.some((layer) => layer.id === args.layerId)) {
        return this.failure(args.projectId, 'INVALID_TARGET', `Layer "${args.layerId}" was not found`, 'Use an existing layer ID.', { layerId: args.layerId });
      }
      const draft = cloneDocument(session.document);
      draft.activeLayerId = args.layerId;
      session.document = draft;
      return response({ ok: true, operation: 'set_active_layer', projectId: args.projectId, revision: draft.revision, activeLayerId: args.layerId, afterHashes: await documentHashes(draft) });
    });
  }

  async selectFrame(args: { projectId: string; frameId: string }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId);
      if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.');
      if (!session.document.frames.some((frame) => frame.id === args.frameId)) {
        return this.failure(args.projectId, 'INVALID_TARGET', `Frame "${args.frameId}" was not found`, 'Use an existing frame ID.', { frameId: args.frameId });
      }
      const draft = cloneDocument(session.document);
      draft.activeFrameId = args.frameId;
      session.document = draft;
      return response({ ok: true, operation: 'select_frame', projectId: args.projectId, revision: draft.revision, activeFrameId: args.frameId, afterHashes: await documentHashes(draft) });
    });
  }

  async createFrame(args: { projectId: string; expectedRevision: number; frameId: string; afterFrameId?: string; durationMs: number }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'create_frame', (draft) => {
      if (draft.frames.some((frame) => frame.id === args.frameId)) throw new BridgeFault('INVALID_TARGET', `Frame "${args.frameId}" already exists`, 'Choose a unique frameId.', { frameId: args.frameId });
      const afterFrameId = args.afterFrameId ?? draft.activeFrameId;
      const afterIndex = draft.frames.findIndex((frame) => frame.id === afterFrameId);
      if (afterIndex < 0) throw new BridgeFault('INVALID_TARGET', `Frame "${afterFrameId}" was not found`, 'Choose an existing afterFrameId.', { frameId: afterFrameId });
      const celRefs: Record<string, string> = {};
      for (const layer of draft.layers) {
        const celId = makeUniqueCelId(draft, `cel:${args.frameId}:${layer.id}`);
        draft.cels[celId] = { id: celId, data: new Array(draft.project.width * draft.project.height * 4).fill(0) };
        celRefs[layer.id] = celId;
      }
      draft.frames.splice(afterIndex + 1, 0, { id: args.frameId, durationMs: args.durationMs, celRefs });
      insertIntoActiveClip(draft, args.frameId, afterFrameId);
      draft.activeFrameId = args.frameId;
      return { target: { frameId: args.frameId }, data: { frameOrder: [...draft.clip.frameIds] } };
    });
  }

  async duplicateFrame(args: { projectId: string; expectedRevision: number; sourceFrameId?: string; frameId: string; afterFrameId?: string }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'duplicate_frame', (draft) => {
      if (draft.frames.some((frame) => frame.id === args.frameId)) throw new BridgeFault('INVALID_TARGET', `Frame "${args.frameId}" already exists`, 'Choose a unique frameId.', { frameId: args.frameId });
      const sourceFrameId = args.sourceFrameId ?? draft.activeFrameId;
      const source = draft.frames.find((frame) => frame.id === sourceFrameId);
      if (!source) throw new BridgeFault('INVALID_TARGET', `Source frame "${sourceFrameId}" was not found`, 'Choose an existing sourceFrameId.', { frameId: sourceFrameId });
      const afterFrameId = args.afterFrameId ?? sourceFrameId;
      const afterIndex = draft.frames.findIndex((frame) => frame.id === afterFrameId);
      if (afterIndex < 0) throw new BridgeFault('INVALID_TARGET', `Frame "${afterFrameId}" was not found`, 'Choose an existing afterFrameId.', { frameId: afterFrameId });
      const copiedCels = new Map<string, string>();
      const celRefs: Record<string, string> = {};
      for (const [layerId, sourceCelId] of Object.entries(source.celRefs)) {
        const sourceCel = draft.cels[sourceCelId];
        if (!sourceCel) throw new BridgeFault('INVALID_CEL_REF', `Source frame references missing cel "${sourceCelId}"`, 'Repair the source frame before duplicating.', { frameId: sourceFrameId, layerId, celId: sourceCelId });
        let celId = copiedCels.get(sourceCelId);
        if (!celId) {
          celId = makeUniqueCelId(draft, `cel:${args.frameId}:${sourceCelId}`);
          draft.cels[celId] = { id: celId, data: [...sourceCel.data] };
          copiedCels.set(sourceCelId, celId);
        }
        celRefs[layerId] = celId;
      }
      draft.frames.splice(afterIndex + 1, 0, { id: args.frameId, durationMs: source.durationMs, celRefs });
      insertIntoActiveClip(draft, args.frameId, afterFrameId);
      draft.activeFrameId = args.frameId;
      return { target: { frameId: args.frameId, sourceFrameId }, data: { frameOrder: [...draft.clip.frameIds] } };
    });
  }

  async setFrameDuration(args: { projectId: string; expectedRevision: number; frameId?: string; durationMs: number }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'set_frame_duration', (draft) => {
      const frameId = args.frameId ?? draft.activeFrameId;
      const frame = draft.frames.find((candidate) => candidate.id === frameId);
      if (!frame) throw new BridgeFault('INVALID_TARGET', `Frame "${frameId}" was not found`, 'Use an existing frame ID.', { frameId });
      frame.durationMs = args.durationMs;
      return { target: { frameId }, data: { durationMs: args.durationMs } };
    });
  }

  async setProjectMetadata(args: { projectId: string; expectedRevision: number; pivotPx?: { x: number; y: number }; groundLineY?: number; facing?: NonNullable<SpriteDocumentV2['production']>['facing']; rootMotion?: NonNullable<SpriteDocumentV2['production']>['rootMotion']; paletteId?: string; paletteName?: string }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'set_project_metadata', (draft) => {
      if (args.pivotPx) draft.pivotPx = { ...args.pivotPx };
      const next = { ...(draft.production ?? {}) };
      if (args.groundLineY !== undefined) next.groundLineY = args.groundLineY;
      if (args.facing !== undefined) next.facing = args.facing;
      if (args.rootMotion !== undefined) next.rootMotion = cloneDocument(args.rootMotion) as typeof args.rootMotion;
      if (args.paletteId !== undefined) next.paletteId = args.paletteId;
      if (args.paletteName !== undefined) next.paletteName = args.paletteName;
      draft.production = next;
      return { data: { pivotPx: draft.pivotPx, production: draft.production } };
    });
  }

  async setClipMetadata(args: { projectId: string; expectedRevision: number; clipId?: string; name?: string; loop?: SpriteClipV2['loop']; direction?: SpriteClipV2['direction'] }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'set_clip_metadata', (draft) => {
      const clips = materializeClips(draft);
      const id = args.clipId ?? draft.activeClipId!;
      const clip = clips.find((candidate) => candidate.id === id);
      if (!clip) throw new BridgeFault('INVALID_TARGET', `Clip "${id}" was not found`, 'Use an existing clip ID.');
      if (args.name !== undefined) clip.name = args.name;
      if (args.loop !== undefined) clip.loop = args.loop;
      if (args.direction !== undefined) clip.direction = args.direction;
      if (clips.some((candidate) => candidate !== clip && candidate.name === clip.name)) throw new BridgeFault('VALIDATION_FAILED', `Clip name "${clip.name}" already exists`, 'Choose a unique clip name.');
      syncActiveClip(draft);
      return { target: { clipId: id }, data: { clip: cloneDocument(clip) } };
    });
  }

  async deleteFrame(args: { projectId: string; expectedRevision: number; frameId: string }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'delete_frame', (draft) => {
      if (draft.frames.length === 1) throw new BridgeFault('VALIDATION_FAILED', 'Cannot delete the final frame', 'Keep at least one frame.');
      const index = draft.frames.findIndex((frame) => frame.id === args.frameId);
      if (index < 0) throw new BridgeFault('INVALID_TARGET', `Frame "${args.frameId}" was not found`, 'Use an existing frame ID.');
      draft.frames.splice(index, 1);
      for (const clip of materializeClips(draft)) clip.frameIds = clip.frameIds.filter((id) => id !== args.frameId);
      if (draft.clips!.some((clip) => clip.frameIds.length === 0)) throw new BridgeFault('VALIDATION_FAILED', 'Deleting this frame would empty a clip', 'Delete or update the clip first.');
      draft.activeFrameId = draft.frames[Math.min(index, draft.frames.length - 1)].id;
      garbageCollectCels(draft); syncActiveClip(draft);
      return { target: { frameId: args.frameId }, data: { frameOrder: draft.frames.map((frame) => frame.id) } };
    });
  }

  async reorderFrames(args: { projectId: string; expectedRevision: number; frameIds: string[] }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'reorder_frames', (draft) => {
      const previous = draft.frames.map((frame) => frame.id);
      if (args.frameIds.length !== previous.length || new Set(args.frameIds).size !== previous.length || args.frameIds.some((id) => !previous.includes(id))) throw new BridgeFault('VALIDATION_FAILED', 'frameIds must be a complete unique permutation', 'Provide every document frame exactly once.');
      const rank = new Map(args.frameIds.map((id, index) => [id, index]));
      draft.frames.sort((a, b) => rank.get(a.id)! - rank.get(b.id)!);
      for (const clip of clipsOf(draft)) clip.frameIds.sort((a, b) => rank.get(a)! - rank.get(b)!);
      syncActiveClip(draft);
      return { data: { previousFrameOrder: previous, frameOrder: [...args.frameIds] } };
    });
  }

  async duplicateFrameRange(args: { projectId: string; expectedRevision: number; sourceFrameIds: string[]; targetFrameIds: string[]; afterFrameId?: string }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'duplicate_frame_range', (draft) => {
      if (args.sourceFrameIds.length < 1 || args.sourceFrameIds.length !== args.targetFrameIds.length || new Set(args.targetFrameIds).size !== args.targetFrameIds.length || args.targetFrameIds.some((id) => draft.frames.some((frame) => frame.id === id))) throw new BridgeFault('VALIDATION_FAILED', 'Source and unique target frame ranges must have equal non-zero length', 'Provide valid source IDs and fresh target IDs.');
      const indices = args.sourceFrameIds.map((id) => draft.frames.findIndex((frame) => frame.id === id));
      if (indices.some((index) => index < 0) || indices.some((index, i) => i > 0 && index !== indices[0] + i)) throw new BridgeFault('VALIDATION_FAILED', 'Source frames must be a contiguous ordered range', 'Use consecutive document frame IDs.');
      const copied = new Map<string, string>();
      const copies = args.sourceFrameIds.map((sourceId, i) => {
        const source = draft.frames.find((frame) => frame.id === sourceId)!;
        const celRefs: Record<string, string> = {};
        for (const [layerId, oldId] of Object.entries(source.celRefs)) {
          let id = copied.get(oldId);
          if (!id) { id = makeUniqueCelId(draft, `cel:${args.targetFrameIds[i]}:${oldId}`); draft.cels[id] = { id, data: [...draft.cels[oldId].data] }; copied.set(oldId, id); }
          celRefs[layerId] = id;
        }
        return { id: args.targetFrameIds[i], durationMs: source.durationMs, celRefs };
      });
      const after = args.afterFrameId ?? args.sourceFrameIds.at(-1)!;
      const insert = draft.frames.findIndex((frame) => frame.id === after);
      if (insert < 0) throw new BridgeFault('INVALID_TARGET', `Frame "${after}" was not found`, 'Use an existing afterFrameId.');
      draft.frames.splice(insert + 1, 0, ...copies);
      if (draft.clips) for (const clip of draft.clips) { const anchor = clip.frameIds.indexOf(after); if (anchor >= 0) clip.frameIds.splice(anchor + 1, 0, ...args.targetFrameIds); }
      else draft.clip.frameIds = draft.frames.map((frame) => frame.id);
      syncActiveClip(draft); draft.activeFrameId = args.targetFrameIds.at(-1)!;
      return { data: { createdFrameIds: args.targetFrameIds, frameOrder: draft.frames.map((frame) => frame.id) } };
    });
  }

  async createClip(args: { projectId: string; expectedRevision: number; clipId: string; name: string; frameIds: string[]; loop: SpriteClipV2['loop']; direction?: SpriteClipV2['direction'] }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'create_clip', (draft) => {
      const clips = materializeClips(draft);
      if (clips.some((clip) => clip.id === args.clipId || clip.name === args.name)) throw new BridgeFault('INVALID_TARGET', 'Clip ID and name must be unique', 'Choose a unique ID and name.');
      clips.push({ id: args.clipId, name: args.name, frameIds: [...args.frameIds], loop: args.loop, ...(args.direction ? { direction: args.direction } : {}) });
      draft.activeClipId = args.clipId; syncActiveClip(draft);
      return { target: { clipId: args.clipId }, data: { clip: draft.clip } };
    });
  }

  async deleteClip(args: { projectId: string; expectedRevision: number; clipId: string }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'delete_clip', (draft) => {
      const clips = materializeClips(draft); const index = clips.findIndex((clip) => clip.id === args.clipId);
      if (index < 0) throw new BridgeFault('INVALID_TARGET', `Clip "${args.clipId}" was not found`, 'Use an existing clip ID.');
      if (clips.length === 1) throw new BridgeFault('VALIDATION_FAILED', 'Cannot delete the final clip', 'Keep at least one clip.');
      clips.splice(index, 1); if (draft.activeClipId === args.clipId) draft.activeClipId = clips[Math.min(index, clips.length - 1)].id; syncActiveClip(draft);
      return { target: { clipId: args.clipId }, data: { activeClipId: draft.activeClipId } };
    });
  }

  async createLayer(args: { projectId: string; expectedRevision: number; layerId: string; name: string; sourceLayerId?: string; preserveLinks?: boolean }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'create_layer', (draft) => {
      if (draft.layers.some((layer) => layer.id === args.layerId)) throw new BridgeFault('INVALID_TARGET', `Layer "${args.layerId}" already exists`, 'Choose a unique layer ID.');
      const source = args.sourceLayerId ? draft.layers.find((layer) => layer.id === args.sourceLayerId) : undefined;
      if (args.sourceLayerId && !source) throw new BridgeFault('INVALID_TARGET', `Layer "${args.sourceLayerId}" was not found`, 'Use an existing source layer.');
      draft.layers.push({ id: args.layerId, name: args.name, visible: true, locked: false, opacity: 1, blendMode: 'normal' });
      const shared = new Map<string, string>();
      for (const frame of draft.frames) {
        const sourceCel = source ? draft.cels[frame.celRefs[source.id]] : undefined;
        let id = sourceCel && args.preserveLinks ? shared.get(sourceCel.id) : undefined;
        if (!id) { id = makeUniqueCelId(draft, `cel:${frame.id}:${args.layerId}`); draft.cels[id] = { id, data: sourceCel ? [...sourceCel.data] : new Array(draft.project.width * draft.project.height * 4).fill(0) }; if (sourceCel && args.preserveLinks) shared.set(sourceCel.id, id); }
        frame.celRefs[args.layerId] = id;
      }
      draft.activeLayerId = args.layerId;
      return { target: { layerId: args.layerId }, data: { layerOrder: draft.layers.map((layer) => layer.id) } };
    });
  }

  async updateLayer(args: { projectId: string; expectedRevision: number; layerId: string; name?: string; visible?: boolean; locked?: boolean; opacity?: number; blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'update_layer', (draft) => {
      const layer = draft.layers.find((candidate) => candidate.id === args.layerId); if (!layer) throw new BridgeFault('INVALID_TARGET', `Layer "${args.layerId}" was not found`, 'Use an existing layer ID.');
      for (const key of ['name', 'visible', 'locked', 'opacity', 'blendMode'] as const) if (args[key] !== undefined) Object.assign(layer, { [key]: args[key] });
      return { target: { layerId: args.layerId }, data: { layer } };
    });
  }

  async deleteLayer(args: { projectId: string; expectedRevision: number; layerId: string }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'delete_layer', (draft) => {
      if (draft.layers.length === 1) throw new BridgeFault('VALIDATION_FAILED', 'Cannot delete the final layer', 'Keep at least one layer.');
      const index = draft.layers.findIndex((layer) => layer.id === args.layerId); if (index < 0) throw new BridgeFault('INVALID_TARGET', `Layer "${args.layerId}" was not found`, 'Use an existing layer ID.');
      draft.layers.splice(index, 1); for (const frame of draft.frames) delete frame.celRefs[args.layerId]; garbageCollectCels(draft);
      if (draft.activeLayerId === args.layerId) draft.activeLayerId = draft.layers[Math.min(index, draft.layers.length - 1)].id;
      return { target: { layerId: args.layerId }, data: { layerOrder: draft.layers.map((layer) => layer.id) } };
    });
  }

  async reorderLayers(args: { projectId: string; expectedRevision: number; layerIds: string[] }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'reorder_layers', (draft) => {
      const ids = draft.layers.map((layer) => layer.id); if (args.layerIds.length !== ids.length || new Set(args.layerIds).size !== ids.length || args.layerIds.some((id) => !ids.includes(id))) throw new BridgeFault('VALIDATION_FAILED', 'layerIds must be a complete unique permutation', 'Provide every layer exactly once.');
      const rank = new Map(args.layerIds.map((id, index) => [id, index])); draft.layers.sort((a, b) => rank.get(a.id)! - rank.get(b.id)!);
      return { data: { layerOrder: [...args.layerIds] } };
    });
  }

  async linkCels(args: { projectId: string; expectedRevision: number; source: { frameId: string; layerId: string }; targets: Array<{ frameId: string; layerId: string }> }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'link_cels', (draft) => {
      const source = resolveCel(draft, args.source.frameId, args.source.layerId);
      for (const target of args.targets) resolveCel(draft, target.frameId, target.layerId).frame.celRefs[target.layerId] = source.celId;
      garbageCollectCels(draft);
      const refs = draft.frames.flatMap((frame) => Object.entries(frame.celRefs).filter(([, id]) => id === source.celId).map(([layerId]) => ({ frameId: frame.id, layerId })));
      return { target: { celId: source.celId }, data: { references: refs } };
    });
  }

  async unlinkCel(args: { projectId: string; expectedRevision: number; frameId: string; layerId: string }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'unlink_cel', (draft) => {
      const target = resolveCel(draft, args.frameId, args.layerId); const refs = draft.frames.flatMap((frame) => Object.values(frame.celRefs)).filter((id) => id === target.celId).length;
      if (refs < 2) throw new BridgeFault('VALIDATION_FAILED', 'Cel is already unlinked', 'Choose a shared cel reference.');
      const id = makeUniqueCelId(draft, `cel:${args.frameId}:${args.layerId}`); draft.cels[id] = { id, data: [...target.cel.data] }; target.frame.celRefs[args.layerId] = id;
      return { target: { frameId: args.frameId, layerId: args.layerId }, data: { previousCelId: target.celId, celId: id } };
    });
  }

  async getPalette(args: { projectId: string }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId); if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.');
      return response({ ok: true, operation: 'get_palette', projectId: args.projectId, revision: session.document.revision, palette: { id: session.document.production?.paletteId, name: session.document.production?.paletteName, colors: session.document.palette } });
    });
  }

  async setProjectPalette(args: { projectId: string; expectedRevision: number; builtIn?: string; id?: string; name?: string; colors?: string[] }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'set_project_palette', (draft) => {
      const builtIn = args.builtIn ? getPalette(args.builtIn) : undefined;
      if (args.builtIn && !builtIn) throw new BridgeFault('VALIDATION_FAILED', `Unknown palette "${args.builtIn}"`, 'Use a listed built-in palette.');
      const colors = builtIn?.colors ?? args.colors;
      if (!colors || colors.length < 1 || colors.some((color) => !/^#[0-9a-f]{6}$/i.test(color))) throw new BridgeFault('VALIDATION_FAILED', 'Palette requires #RRGGBB swatches', 'Provide one or more opaque six-digit colors.');
      draft.palette = colors.map((color) => color.toLowerCase());
      draft.production = { ...(draft.production ?? {}), paletteId: args.builtIn ?? args.id, paletteName: builtIn?.name ?? args.name };
      return { data: { palette: { id: draft.production.paletteId, name: draft.production.paletteName, colors: draft.palette } } };
    });
  }

  async replaceColor(args: { projectId: string; expectedRevision: number; source: string; target: string; frameIds?: string[]; layerIds?: string[]; mask?: PixelMask }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'replace_color', (draft) => {
      const source = rgba(args.source); const target = rgba(args.target); if (!source || !target) throw new BridgeFault('VALIDATION_FAILED', 'Colors must be valid RGBA hex', 'Use #RGB, #RRGGBB, or #RRGGBBAA.');
      const allowed = args.mask ? new Set(maskPoints(normalizeMask(args.mask, draft.project.width, draft.project.height).mask).map(({ x, y }) => y * draft.project.width + x)) : undefined;
      const celIds = new Set<string>();
      for (const frame of draft.frames) if (!args.frameIds || args.frameIds.includes(frame.id)) for (const [layerId, id] of Object.entries(frame.celRefs)) if (!args.layerIds || args.layerIds.includes(layerId)) celIds.add(id);
      let pixelsChanged = 0;
      for (const id of celIds) for (let offset = 0; offset < draft.cels[id].data.length; offset += 4) {
        if (allowed && !allowed.has(offset / 4)) continue;
        if (source.every((value, channel) => draft.cels[id].data[offset + channel] === value)) { draft.cels[id].data.splice(offset, 4, ...target); pixelsChanged += 1; }
      }
      return { data: { pixelsChanged, celsChanged: celIds.size } };
    });
  }

  async mapToPalette(args: { projectId: string; expectedRevision: number; frameIds?: string[]; layerIds?: string[] }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'map_to_palette', (draft) => {
      const palette = draft.palette.map((color) => rgba(color)!); if (palette.length < 1) throw new BridgeFault('VALIDATION_FAILED', 'Project palette is empty', 'Set a project palette first.');
      const celIds = new Set<string>(); for (const frame of draft.frames) if (!args.frameIds || args.frameIds.includes(frame.id)) for (const [layerId, id] of Object.entries(frame.celRefs)) if (!args.layerIds || args.layerIds.includes(layerId)) celIds.add(id);
      const mapping = new Map<string, string>(); let pixelsChanged = 0;
      for (const id of celIds) for (let offset = 0; offset < draft.cels[id].data.length; offset += 4) {
        const data = draft.cels[id].data; if (data[offset + 3] === 0) continue;
        const distances = palette.map((color, index) => ({ index, distance: [0, 1, 2].reduce((sum, channel) => sum + (data[offset + channel] - color[channel]) ** 2, 0) })); distances.sort((a, b) => a.distance - b.distance || a.index - b.index);
        const selected = palette[distances[0].index]; const before = `#${data.slice(offset, offset + 3).map((value) => value.toString(16).padStart(2, '0')).join('')}`; const after = draft.palette[distances[0].index]; mapping.set(before, after);
        if ([0, 1, 2].some((channel) => data[offset + channel] !== selected[channel])) pixelsChanged += 1;
        data.splice(offset, 3, selected[0], selected[1], selected[2]);
      }
      return { data: { pixelsChanged, mapping: Object.fromEntries([...mapping].sort()) } };
    });
  }

  async drawPrimitives(args: { projectId: string; expectedRevision: number; frameId?: string; layer?: string; operations: Array<{ kind: 'line' | 'rectangle' | 'contour' | 'flood_fill'; color: string; x?: number; y?: number; x1?: number; y1?: number; x2?: number; y2?: number; filled?: boolean; points?: Array<{ x: number; y: number }> }> }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'draw_primitives', (draft) => {
      const target = resolveCel(draft, args.frameId, args.layer); let written = 0;
      const write = (x: number, y: number, color: string) => { const parsed = rgba(color); if (!parsed || x < 0 || y < 0 || x >= draft.project.width || y >= draft.project.height) throw new BridgeFault('VALIDATION_FAILED', 'Primitive coordinates/colors must be valid and in bounds', 'Correct the full batch; no changes were applied.'); const offset = (y * draft.project.width + x) * 4; target.cel.data.splice(offset, 4, ...parsed); written += 1; };
      for (const operation of args.operations) {
        const integer = (value: unknown) => Number.isInteger(value);
        if ((operation.kind === 'line' || operation.kind === 'rectangle') && ![operation.x1, operation.y1, operation.x2, operation.y2].every(integer)) throw new BridgeFault('VALIDATION_FAILED', `${operation.kind} requires integer x1, y1, x2, and y2`, 'Correct the full batch; no changes were applied.');
        if (operation.kind === 'contour' && (!operation.points || operation.points.length < 2 || operation.points.some((point) => !integer(point.x) || !integer(point.y)))) throw new BridgeFault('VALIDATION_FAILED', 'Contour requires at least two integer points', 'Correct the full batch; no changes were applied.');
        if (operation.kind === 'flood_fill' && (!integer(operation.x) || !integer(operation.y))) throw new BridgeFault('VALIDATION_FAILED', 'Flood fill requires integer x and y', 'Correct the full batch; no changes were applied.');
        if (operation.kind === 'line') for (const point of linePoints(operation.x1!, operation.y1!, operation.x2!, operation.y2!)) write(point.x, point.y, operation.color);
        else if (operation.kind === 'rectangle') {
          const minX = Math.min(operation.x1!, operation.x2!); const maxX = Math.max(operation.x1!, operation.x2!); const minY = Math.min(operation.y1!, operation.y2!); const maxY = Math.max(operation.y1!, operation.y2!);
          for (let y = minY; y <= maxY; y += 1) for (let x = minX; x <= maxX; x += 1) if (operation.filled || x === minX || x === maxX || y === minY || y === maxY) write(x, y, operation.color);
        } else if (operation.kind === 'contour') {
          if (!operation.points || operation.points.length < 2) throw new BridgeFault('VALIDATION_FAILED', 'Contour requires at least two points', 'Provide an ordered contour.');
          for (let i = 0; i < operation.points.length; i += 1) for (const point of linePoints(operation.points[i].x, operation.points[i].y, operation.points[(i + 1) % operation.points.length].x, operation.points[(i + 1) % operation.points.length].y)) write(point.x, point.y, operation.color);
        } else {
          const x = operation.x!; const y = operation.y!; if (x < 0 || y < 0 || x >= draft.project.width || y >= draft.project.height) throw new BridgeFault('VALIDATION_FAILED', 'Flood-fill seed is out of bounds', 'Choose an in-bounds seed.');
          const start = (y * draft.project.width + x) * 4; const source = target.cel.data.slice(start, start + 4); const next = rgba(operation.color); if (!next) throw new BridgeFault('VALIDATION_FAILED', 'Invalid fill color', 'Use a hex color.');
          const queue = [{ x, y }]; const seen = new Set<string>(); while (queue.length) { const point = queue.shift()!; const key = `${point.x},${point.y}`; if (seen.has(key) || point.x < 0 || point.y < 0 || point.x >= draft.project.width || point.y >= draft.project.height) continue; seen.add(key); const offset = (point.y * draft.project.width + point.x) * 4; if (!source.every((value, channel) => target.cel.data[offset + channel] === value)) continue; write(point.x, point.y, operation.color); queue.push({ x: point.x - 1, y: point.y }, { x: point.x + 1, y: point.y }, { x: point.x, y: point.y - 1 }, { x: point.x, y: point.y + 1 }); }
        }
      }
      return { target: { frameId: target.frameId, layerId: target.layerId, celId: target.celId }, data: { pixelsWritten: written, primitiveCount: args.operations.length } };
    });
  }

  async defineMask(args: { projectId: string; name: string; mask: PixelMask }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => { const session = this.sessions.get(args.projectId); if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.'); const normalized = normalizeMask(args.mask, session.document.project.width, session.document.project.height); const masks = this.masks.get(args.projectId) ?? new Map<string, NamedMask>(); masks.set(args.name, normalized); this.masks.set(args.projectId, masks); return response({ ok: true, operation: 'define_mask', projectId: args.projectId, revision: session.document.revision, name: args.name, ...normalized, persistence: 'session_only' }); });
  }

  async getMask(args: { projectId: string; name: string }): Promise<CallToolResult> {
    const session = this.sessions.get(args.projectId); const mask = this.masks.get(args.projectId)?.get(args.name); if (!session || !mask) return this.failure(args.projectId, 'INVALID_TARGET', `Mask "${args.name}" was not found`, 'Define the session-scoped mask first.'); return response({ ok: true, operation: 'get_mask', projectId: args.projectId, revision: session.document.revision, name: args.name, ...mask, persistence: 'session_only' });
  }

  async applyMask(args: { projectId: string; expectedRevision: number; name: string; frameId?: string; layer?: string; action: 'clear' | 'recolor' | 'copy' | 'move'; color?: string; translatePx?: { x: number; y: number } }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'apply_mask', (draft) => {
      const named = this.masks.get(args.projectId)?.get(args.name); if (!named) throw new BridgeFault('INVALID_TARGET', `Mask "${args.name}" was not found`, 'Define the session-scoped mask first.'); const target = resolveCel(draft, args.frameId, args.layer); const before = [...target.cel.data]; const points = maskPoints(named.mask); let changed = 0;
      if (args.action === 'clear' || args.action === 'recolor') { const color = args.action === 'clear' ? [0, 0, 0, 0] as [number, number, number, number] : rgba(args.color ?? ''); if (!color) throw new BridgeFault('VALIDATION_FAILED', 'Recolor requires a valid color', 'Provide a hex color.'); for (const point of points) { const offset = (point.y * draft.project.width + point.x) * 4; target.cel.data.splice(offset, 4, ...color); changed += 1; } }
      else { const delta = args.translatePx; if (!delta || !Number.isInteger(delta.x) || !Number.isInteger(delta.y)) throw new BridgeFault('VALIDATION_FAILED', 'Copy/move requires integer translatePx', 'Provide integer x/y translation.'); if (args.action === 'move') for (const point of points) target.cel.data.splice((point.y * draft.project.width + point.x) * 4, 4, 0, 0, 0, 0); for (const point of points) { const x = point.x + delta.x; const y = point.y + delta.y; if (x < 0 || y < 0 || x >= draft.project.width || y >= draft.project.height) throw new BridgeFault('VALIDATION_FAILED', 'Mask translation leaves the canvas', 'Choose an in-bounds translation.'); const source = (point.y * draft.project.width + point.x) * 4; target.cel.data.splice((y * draft.project.width + x) * 4, 4, ...before.slice(source, source + 4)); changed += 1; } }
      return { target: { frameId: target.frameId, layerId: target.layerId }, data: { pixelsChanged: changed, bounds: named.bounds, persistence: 'session_only' } };
    });
  }

  async transformRegion(args: { projectId: string; expectedRevision: number; frameId?: string; layer?: string; mask: PixelMask; pivotPx: { x: number; y: number }; translatePx?: { x: number; y: number }; rotateDegrees?: number; fillMode: 'transparent' | 'source' | 'bridge'; preservePixelMass?: boolean; anchoredRegions?: Array<{ name: string; mask: PixelMask }> }): Promise<CallToolResult> {
    return this.mutate(args.projectId, args.expectedRevision, 'transform_region', (draft) => {
      const target = resolveCel(draft, args.frameId, args.layer); const normalized = normalizeMask(args.mask, draft.project.width, draft.project.height); const sourceData = [...target.cel.data];
      const normalizedAnchors = (args.anchoredRegions ?? []).map((entry) => ({ name: entry.name, points: maskPoints(normalizeMask(entry.mask, draft.project.width, draft.project.height).mask) }));
      const anchored = new Set(normalizedAnchors.flatMap((entry) => entry.points).map(({ x, y }) => `${x},${y}`));
      const points = maskPoints(normalized.mask).filter(({ x, y }) => !anchored.has(`${x},${y}`)); const radians = (args.rotateDegrees ?? 0) * Math.PI / 180; const cosine = Math.cos(radians); const sine = Math.sin(radians); const dx = args.translatePx?.x ?? 0; const dy = args.translatePx?.y ?? 0;
      const bridgeKeep = new Set<string>();
      if (args.fillMode === 'bridge') { const goals = new Set(points.filter(({ x, y }) => sourceData[(y * draft.project.width + x) * 4 + 3] > 0).map(({ x, y }) => `${x},${y}`)); for (const anchor of normalizedAnchors) { const starts = anchor.points.filter(({ x, y }) => sourceData[(y * draft.project.width + x) * 4 + 3] > 0); const path = shortestOpaquePath(sourceData, draft.project.width, draft.project.height, starts, goals); if (!path) throw new BridgeFault('VALIDATION_FAILED', `Anchor "${anchor.name}" has no opaque source path to the moving region`, 'Correct the mask or choose transparent/source fill mode.'); path.forEach(({ x, y }) => bridgeKeep.add(`${x},${y}`)); } }
      const moves = points.map(({ x, y }) => { const rx = x - args.pivotPx.x; const ry = y - args.pivotPx.y; return { source: { x, y }, destination: { x: Math.round(args.pivotPx.x + rx * cosine - ry * sine + dx), y: Math.round(args.pivotPx.y + rx * sine + ry * cosine + dy) } }; });
      const selectedBefore = regionMetrics(sourceData, draft.project.width, points);
      const destinations = new Set<string>(); let outOfBounds = 0; let collisions = 0; let selectedOpaquePixels = 0;
      const sourceKeys = new Set(points.map(({ x, y }) => `${x},${y}`));
      for (const move of moves) {
        const sourceOffset = (move.source.y * draft.project.width + move.source.x) * 4; if (sourceData[sourceOffset + 3] > 0) selectedOpaquePixels += 1;
        const { x, y } = move.destination; if (x < 0 || y < 0 || x >= draft.project.width || y >= draft.project.height) { outOfBounds += 1; continue; }
        const key = `${x},${y}`; if (destinations.has(key)) collisions += 1; destinations.add(key); const offset = (y * draft.project.width + x) * 4; if (sourceData[offset + 3] > 0 && !sourceKeys.has(key)) collisions += 1;
      }
      const holes = Math.max(0, selectedOpaquePixels - destinations.size - outOfBounds);
      if (args.preservePixelMass && (collisions > 0 || holes > 0 || outOfBounds > 0)) throw new BridgeFault('VALIDATION_FAILED', 'Transform would lose or collide pixels', 'Adjust the mask, pivot, or transform; the document was preserved.', { collisions, holes, outOfBounds });
      if (args.fillMode !== 'source') for (const point of points) if (!bridgeKeep.has(`${point.x},${point.y}`)) target.cel.data.splice((point.y * draft.project.width + point.x) * 4, 4, 0, 0, 0, 0);
      let writtenOpaquePixels = 0;
      for (const move of moves) { const { x, y } = move.destination; if (x < 0 || y < 0 || x >= draft.project.width || y >= draft.project.height) continue; const sourceOffset = (move.source.y * draft.project.width + move.source.x) * 4; const pixel = sourceData.slice(sourceOffset, sourceOffset + 4); target.cel.data.splice((y * draft.project.width + x) * 4, 4, ...pixel); if (pixel[3] > 0) writtenOpaquePixels += 1; }
      const beforeMass = pixelMass(sourceData); const afterMass = pixelMass(target.cel.data); const selectedAfter = regionMetrics(target.cel.data, draft.project.width, moves.map((move) => move.destination)); const anchorConnectivity = normalizedAnchors.map((entry) => ({ name: entry.name, connectedBefore: shortestOpaquePath(sourceData, draft.project.width, draft.project.height, entry.points, new Set(points.map(({ x, y }) => `${x},${y}`))) !== null, connectedAfter: shortestOpaquePath(target.cel.data, draft.project.width, draft.project.height, entry.points, new Set(moves.map(({ destination }) => `${destination.x},${destination.y}`))) !== null }));
      if (args.preservePixelMass && (beforeMass !== afterMass || selectedBefore.pixelMass !== selectedAfter.pixelMass)) throw new BridgeFault('VALIDATION_FAILED', 'Transform changed total or selected-region pixel mass', 'Use a collision-free transform.', { pixelMassBefore: beforeMass, pixelMassAfter: afterMass, selectedRegionMassBefore: selectedBefore.pixelMass, selectedRegionMassAfter: selectedAfter.pixelMass });
      return { target: { frameId: target.frameId, layerId: target.layerId, celId: target.celId }, data: { selectedOpaquePixels, writtenOpaquePixels, collisions, holes, outOfBounds, pixelMassBefore: beforeMass, pixelMassAfter: afterMass, boundsBefore: opaqueBounds(sourceData, draft.project.width, draft.project.height), boundsAfter: opaqueBounds(target.cel.data, draft.project.width, draft.project.height), selectedRegion: { massBefore: selectedBefore.pixelMass, massAfter: selectedAfter.pixelMass, localBoundsBefore: selectedBefore.bounds, localBoundsAfter: selectedAfter.bounds, componentsBefore: selectedBefore.components, componentsAfter: selectedAfter.components, enclosedHolesBefore: selectedBefore.enclosedHoles, enclosedHolesAfter: selectedAfter.enclosedHoles }, anchoredRegions: anchorConnectivity, bridgePixelsRetained: bridgeKeep.size, rounding: 'nearest_integer_pixel_center' } };
    });
  }

  async getProjectSnapshot(args: { projectId: string; frameIds?: string[]; layers?: string[]; region?: { x: number; y: number; width: number; height: number }; includePixels?: boolean }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId); if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.'); const document = session.document;
      const frames = args.frameIds ? document.frames.filter((frame) => args.frameIds!.includes(frame.id)) : document.frames; const layers = args.layers ? document.layers.filter((layer) => args.layers!.includes(layer.id)) : document.layers;
      if (args.frameIds?.some((id) => !frames.some((frame) => frame.id === id)) || args.layers?.some((id) => !layers.some((layer) => layer.id === id))) return this.failure(args.projectId, 'INVALID_TARGET', 'Snapshot filter references an unknown frame or layer', 'Use existing IDs.');
      const region = args.region ?? { x: 0, y: 0, width: document.project.width, height: document.project.height }; if (region.x < 0 || region.y < 0 || region.width < 1 || region.height < 1 || region.x + region.width > document.project.width || region.y + region.height > document.project.height) return this.failure(args.projectId, 'VALIDATION_FAILED', 'Snapshot region is outside the canvas', 'Use an in-bounds positive rectangle.');
      const celIds = [...new Set(frames.flatMap((frame) => layers.map((layer) => frame.celRefs[layer.id])))]; const pixelCels: Record<string, unknown> = {};
      if (args.includePixels) for (const id of celIds) { const data = document.cels[id].data; const runs: Array<{ count: number; rgba: number[] }> = []; for (let y = region.y; y < region.y + region.height; y += 1) for (let x = region.x; x < region.x + region.width; x += 1) { const rgbaValue = data.slice((y * document.project.width + x) * 4, (y * document.project.width + x) * 4 + 4); const last = runs.at(-1); if (last && last.rgba.every((value, channel) => value === rgbaValue[channel])) last.count += 1; else runs.push({ count: 1, rgba: rgbaValue }); } pixelCels[id] = { encoding: 'row_major_rgba8_rle', region, runs }; }
      const payload = { ok: true, operation: 'get_project_snapshot', projectId: args.projectId, revision: document.revision, hashes: await documentHashes(document), project: document.project, pivotPx: document.pivotPx, production: document.production, palette: document.palette, clips: clipsOf(document), activeClipId: document.activeClipId ?? document.clip.id, layers, frames: frames.map((frame) => ({ id: frame.id, durationMs: frame.durationMs, celRefs: Object.fromEntries(layers.map((layer) => [layer.id, frame.celRefs[layer.id]])) })), ...(args.includePixels ? { pixelCels } : {}) };
      if (Buffer.byteLength(JSON.stringify(payload)) > 4 * 1024 * 1024) return this.failure(args.projectId, 'VALIDATION_FAILED', 'Snapshot exceeds the 4 MiB response limit', 'Narrow frame, layer, or region filters.'); return response(payload);
    });
  }

  async exportAnimationPreview(args: { projectId: string; expectedRevision: number; format?: 'apng' | 'gif' | 'webp'; scale?: number; background?: 'transparent' | 'checkerboard' | 'solid'; backgroundColor?: string; repeat?: number; outputPath?: string; overwrite?: boolean }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId); if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.'); if (session.document.revision !== args.expectedRevision) return this.failure(args.projectId, 'STALE_REVISION', `Expected revision ${args.expectedRevision}, current revision is ${session.document.revision}`, `Retry with expectedRevision ${session.document.revision}.`);
      const format = args.format ?? 'apng';
      if (format === 'webp') return this.failure(args.projectId, 'VALIDATION_FAILED', 'Exact animated WebP encoding is not available in this server', 'Use format "apng", or use "gif" only when every duration is exactly representable in centiseconds.');
      const scale = args.scale ?? 4; const width = session.document.project.width * scale; const height = session.document.project.height * scale; const bytes = width * height * 4 * session.document.clip.frameIds.length; if (!Number.isSafeInteger(bytes) || bytes > 64 * 1024 * 1024) return this.failure(args.projectId, 'VALIDATION_FAILED', 'Animated preview exceeds the 64 MiB frame allocation limit', 'Reduce scale or frame count.');
      const background = args.background ?? 'transparent'; const solid = rgba(args.backgroundColor ?? '#000000ff'); if (background === 'solid' && !solid) return this.failure(args.projectId, 'VALIDATION_FAILED', 'Solid background requires a valid color', 'Provide backgroundColor as hex RGBA.');
      const frames = session.document.clip.frameIds.map((frameId) => { const source = compositeFrame(session.document, frameId); const output = Buffer.alloc(width * height * 4); for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) { const sourceOffset = (Math.floor(y / scale) * session.document.project.width + Math.floor(x / scale)) * 4; const targetOffset = (y * width + x) * 4; const alpha = source[sourceOffset + 3] / 255; const bg = background === 'transparent' ? [0, 0, 0, 0] : background === 'solid' ? solid! : ((Math.floor(x / (4 * scale)) + Math.floor(y / (4 * scale))) % 2 ? [170, 170, 170, 255] : [220, 220, 220, 255]); output[targetOffset] = Math.round(source[sourceOffset] * alpha + bg[0] * (1 - alpha)); output[targetOffset + 1] = Math.round(source[sourceOffset + 1] * alpha + bg[1] * (1 - alpha)); output[targetOffset + 2] = Math.round(source[sourceOffset + 2] * alpha + bg[2] * (1 - alpha)); output[targetOffset + 3] = background === 'transparent' ? source[sourceOffset + 3] : 255; } return output; });
      const durations = session.document.clip.frameIds.map((id) => session.document.frames.find((frame) => frame.id === id)!.durationMs); const repeat = args.repeat ?? 0;
      if (format === 'gif' && durations.some((duration) => duration % 10 !== 0)) return this.failure(args.projectId, 'VALIDATION_FAILED', 'GIF delays are centiseconds and cannot exactly represent every frame duration', 'Use format "apng" for exact millisecond timing.');
      const encoded = format === 'gif' ? encodeGif(frames, width, height, durations, repeat) : encodeApng(frames, width, height, durations, repeat); const extension = format === 'gif' ? 'gif' : 'png'; const mimeType = format === 'gif' ? 'image/gif' : 'image/apng'; const target = args.outputPath ? path.resolve(args.outputPath) : path.join(this.outputDir, 'previews', `${safeName(args.projectId)}-r${session.document.revision}.${extension}`); if (!isWithin(target, this.outputDir)) return this.failure(args.projectId, 'VALIDATION_FAILED', `Preview path must be inside ${this.outputDir}`, 'Choose an outputPath inside the MCP output directory.');
      let temporary = ''; try { fs.mkdirSync(path.dirname(target), { recursive: true }); const realRoot = fs.realpathSync(this.outputDir); const realParent = fs.realpathSync(path.dirname(target)); if (!isWithin(realParent, realRoot)) throw new Error('Resolved preview directory leaves the output root'); temporary = path.join(realParent, `.${path.basename(target)}.${randomUUID()}.tmp`); fs.writeFileSync(temporary, encoded, { flag: 'wx' }); if (args.overwrite) fs.renameSync(temporary, target); else { fs.linkSync(temporary, target); fs.rmSync(temporary); } } catch (error) { if (temporary && fs.existsSync(temporary)) fs.rmSync(temporary); return this.failure(args.projectId, 'VALIDATION_FAILED', `Preview export failed: ${(error as Error).message}`, 'Correct the output path or set overwrite true deliberately.'); }
      return response({ ok: true, operation: 'export_animation_preview', projectId: args.projectId, revision: session.document.revision, format, outputPath: target, mimeType, width, height, scale, frameDurationsMs: durations, totalDurationMs: durations.reduce((sum, value) => sum + value, 0), repeat, background, overwrite: args.overwrite ?? false, sha256: createHash('sha256').update(encoded).digest('hex'), artisticApproval: 'pending_human_review' }, { image: encoded, mimeType });
    });
  }

  async undo(args: { projectId: string; expectedRevision: number }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId);
      if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.');
      const current = session.document;
      if (current.revision !== args.expectedRevision) return this.failure(args.projectId, 'STALE_REVISION', `Expected revision ${args.expectedRevision}, current revision is ${current.revision}`, `Retry with expectedRevision ${current.revision}.`);
      const snapshot = session.undo.at(-1);
      if (!snapshot) return this.failure(args.projectId, 'INVALID_TARGET', 'There is no operation to undo', 'Perform a document mutation before calling undo.');
      const beforeHashes = await documentHashes(current);
      const candidate = cloneDocument(snapshot.document);
      candidate.revision = current.revision + 1;
      candidate.project.updatedAt = Date.now();
      const validated = validateDocumentV2(candidate);
      if (!validated.ok) return this.failure(args.projectId, 'VALIDATION_FAILED', 'Undo snapshot is invalid', 'Reload the project from its last saved baseline.', undefined, validated.issues);
      const afterHashes = await documentHashes(validated.value);
      if (session.document !== current) return this.failure(args.projectId, 'STALE_REVISION', 'The project changed before undo committed', 'Read the latest revision and retry.');
      const undoneOperation = snapshot.operation;
      session.undo.pop();
      pushHistory(session.redo, current, undoneOperation);
      session.document = validated.value;
      return response({ ok: true, operation: 'undo', undoneOperation, projectId: args.projectId, revision: validated.value.revision, beforeHashes, afterHashes, history: { undoDepth: session.undo.length, redoDepth: session.redo.length } });
    });
  }

  async redo(args: { projectId: string; expectedRevision: number }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId);
      if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.');
      const current = session.document;
      if (current.revision !== args.expectedRevision) return this.failure(args.projectId, 'STALE_REVISION', `Expected revision ${args.expectedRevision}, current revision is ${current.revision}`, `Retry with expectedRevision ${current.revision}.`);
      const snapshot = session.redo.at(-1);
      if (!snapshot) return this.failure(args.projectId, 'INVALID_TARGET', 'There is no operation to redo', 'Undo a document mutation before calling redo.');
      const beforeHashes = await documentHashes(current);
      const candidate = cloneDocument(snapshot.document);
      candidate.revision = current.revision + 1;
      candidate.project.updatedAt = Date.now();
      const validated = validateDocumentV2(candidate);
      if (!validated.ok) return this.failure(args.projectId, 'VALIDATION_FAILED', 'Redo snapshot is invalid', 'Reload the project from its last saved baseline.', undefined, validated.issues);
      const afterHashes = await documentHashes(validated.value);
      const redoneOperation = snapshot.operation;
      session.redo.pop();
      pushHistory(session.undo, current, redoneOperation);
      session.document = validated.value;
      return response({ ok: true, operation: 'redo', redoneOperation, projectId: args.projectId, revision: validated.value.revision, beforeHashes, afterHashes, history: { undoDepth: session.undo.length, redoDepth: session.redo.length } });
    });
  }

  async validateAnimation(args: { projectId: string; diagnostics?: { minDurationMs?: number; maxDurationMs?: number; includeLoopDiscontinuity?: boolean; detectDuplicateFrames?: boolean; componentRegions?: Array<{ name: string; layerId: string; mask: PixelMask; frameIds?: string[] }>; trackedRegions?: Array<{ name: string; layerId: string; mask: PixelMask; frameIds?: string[] }>; rigidRegions?: Array<{ name: string; layerId: string; mask: PixelMask; frameIds?: string[] }>; phaseSequence?: { expected: string[]; observed: Array<{ frameId: string; phase: string }> }; movingRegions?: Array<{ fromFrameId: string; toFrameId: string; mask: PixelMask }>; symmetryPairs?: Array<{ frameIdA: string; frameIdB: string }> } }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId);
      if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.');
      const validated = validateDocumentV2(session.document);
      if (!validated.ok) return this.failure(args.projectId, 'VALIDATION_FAILED', 'Animation validation failed', 'Correct the reported document issues.', undefined, validated.issues);
      const diagnostics: Array<Record<string, unknown>> = [];
      const pixelHashes = await Promise.all(session.document.clip.frameIds.map(async (id) => hashBytes(compositeFrame(session.document, id))));
      if (args.diagnostics?.detectDuplicateFrames) pixelHashes.forEach((hash, index) => { const first = pixelHashes.indexOf(hash); if (first < index) diagnostics.push({ code: 'DUPLICATE_FRAME_PIXELS', severity: 'info', frameIds: [session.document.clip.frameIds[first], session.document.clip.frameIds[index]], hash }); });
      for (const frame of session.document.frames) { if (args.diagnostics?.minDurationMs !== undefined && frame.durationMs < args.diagnostics.minDurationMs) diagnostics.push({ code: 'DURATION_BELOW_DECLARED_MIN', severity: 'warning', frameIds: [frame.id], durationMs: frame.durationMs, configuredMinMs: args.diagnostics.minDurationMs }); if (args.diagnostics?.maxDurationMs !== undefined && frame.durationMs > args.diagnostics.maxDurationMs) diagnostics.push({ code: 'DURATION_ABOVE_DECLARED_MAX', severity: 'warning', frameIds: [frame.id], durationMs: frame.durationMs, configuredMaxMs: args.diagnostics.maxDurationMs }); }
      if (args.diagnostics?.includeLoopDiscontinuity && pixelHashes.length > 1) { const first = compositeFrame(session.document, session.document.clip.frameIds[0]); const last = compositeFrame(session.document, session.document.clip.frameIds.at(-1)!); let changedPixels = 0; for (let offset = 0; offset < first.length; offset += 4) if ([0, 1, 2, 3].some((channel) => first[offset + channel] !== last[offset + channel])) changedPixels += 1; diagnostics.push({ code: 'LAST_TO_FIRST_RAW_CHANGE', severity: 'info', frameIds: [session.document.clip.frameIds.at(-1), session.document.clip.frameIds[0]], changedPixels }); }
      const readRegion = (frameId: string, layerId: string, mask: PixelMask) => { const frame = session.document.frames.find((candidate) => candidate.id === frameId); const layer = session.document.layers.find((candidate) => candidate.id === layerId); if (!frame || !layer) throw new BridgeFault('INVALID_TARGET', 'Diagnostic frame or layer was not found', 'Use existing declared frame/layer IDs.'); return regionMetrics(session.document.cels[frame.celRefs[layerId]].data, session.document.project.width, maskPoints(normalizeMask(mask, session.document.project.width, session.document.project.height).mask)); };
      for (const declaration of args.diagnostics?.componentRegions ?? []) { const ids = declaration.frameIds ?? session.document.clip.frameIds; const metrics = ids.map((frameId) => ({ frameId, ...readRegion(frameId, declaration.layerId, declaration.mask) })); diagnostics.push({ code: 'DECLARED_COMPONENT_SEAM_METRICS', severity: 'info', name: declaration.name, metrics, componentBreaks: metrics.slice(1).filter((metric) => metric.components > metrics[0].components).map((metric) => metric.frameId), newEnclosedSeams: metrics.slice(1).filter((metric) => metric.enclosedHoles > metrics[0].enclosedHoles).map((metric) => metric.frameId) }); }
      for (const declaration of args.diagnostics?.trackedRegions ?? []) { const ids = declaration.frameIds ?? session.document.clip.frameIds; const metrics = ids.map((frameId) => ({ frameId, ...readRegion(frameId, declaration.layerId, declaration.mask) })); const origin = metrics[0]?.bounds; diagnostics.push({ code: 'DECLARED_PIVOT_FOOT_DRIFT', severity: 'info', name: declaration.name, metrics: metrics.map((metric) => ({ frameId: metric.frameId, bounds: metric.bounds, deltaPx: origin && metric.bounds ? { x: metric.bounds.x + Math.floor(metric.bounds.width / 2) - (origin.x + Math.floor(origin.width / 2)), y: metric.bounds.y + metric.bounds.height - 1 - (origin.y + origin.height - 1) } : null })) }); }
      for (const declaration of args.diagnostics?.rigidRegions ?? []) { const ids = declaration.frameIds ?? session.document.clip.frameIds; diagnostics.push({ code: 'DECLARED_RIGID_REGION_METRICS', severity: 'info', name: declaration.name, metrics: ids.map((frameId) => ({ frameId, ...readRegion(frameId, declaration.layerId, declaration.mask) })) }); }
      if (args.diagnostics?.phaseSequence) { const observed = args.diagnostics.phaseSequence.observed; const observedPhases = observed.map((entry) => entry.phase); diagnostics.push({ code: 'DECLARED_PHASE_SEQUENCE', severity: 'info', expected: args.diagnostics.phaseSequence.expected, observed, missingPhases: args.diagnostics.phaseSequence.expected.filter((phase) => !observedPhases.includes(phase)), duplicatePhases: observedPhases.filter((phase, index) => observedPhases.indexOf(phase) !== index) }); }
      for (const declaration of args.diagnostics?.movingRegions ?? []) { const before = compositeFrame(session.document, declaration.fromFrameId); const after = compositeFrame(session.document, declaration.toFrameId); const allowed = new Set(maskPoints(normalizeMask(declaration.mask, session.document.project.width, session.document.project.height).mask).map(({ x, y }) => y * session.document.project.width + x)); let changedOutsideMask = 0; for (let pixel = 0; pixel < before.length / 4; pixel += 1) if (!allowed.has(pixel) && [0, 1, 2, 3].some((channel) => before[pixel * 4 + channel] !== after[pixel * 4 + channel])) changedOutsideMask += 1; diagnostics.push({ code: 'CHANGES_OUTSIDE_DECLARED_MOVING_REGION', severity: changedOutsideMask > 0 ? 'warning' : 'info', frameIds: [declaration.fromFrameId, declaration.toFrameId], changedOutsideMask }); }
      for (const pair of args.diagnostics?.symmetryPairs ?? []) { const a = session.document.frames.find((frame) => frame.id === pair.frameIdA); const b = session.document.frames.find((frame) => frame.id === pair.frameIdB); if (!a || !b) throw new BridgeFault('INVALID_TARGET', 'Timing symmetry pair references an unknown frame', 'Use existing frame IDs.'); diagnostics.push({ code: 'DECLARED_TIMING_SYMMETRY', severity: a.durationMs === b.durationMs ? 'info' : 'warning', frameIds: [a.id, b.id], durationsMs: [a.durationMs, b.durationMs], deltaMs: Math.abs(a.durationMs - b.durationMs) }); }
      return response({
        ok: true,
        operation: 'validate_animation',
        projectId: args.projectId,
        revision: session.document.revision,
        valid: true,
        issues: [],
        diagnostics,
        frameCount: session.document.frames.length,
        afterHashes: await documentHashes(session.document),
      });
    });
  }

  async getAnimationReview(args: { projectId: string; scale?: number; columns?: number }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId);
      if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.');
      const scale = args.scale ?? 8;
      const changes = analyzeFrameChanges(session.baseline, session.document);
      const artifacts: Record<string, string> = {};
      let sequence = session.reviewSequence + 1;
      let temporaryDir: string | undefined;
      let image: Buffer | undefined;
      try {
        for (const kind of ['baseline', 'current', 'diff'] as const) {
          assertContactSheetSize(kind, session.baseline, session.document, 1, args.columns);
          assertContactSheetSize(kind, session.baseline, session.document, scale, args.columns);
        }
        const reviewRoot = path.join(this.outputDir, 'reviews', safeName(args.projectId));
        fs.mkdirSync(reviewRoot, { recursive: true });
        while (fs.existsSync(path.join(reviewRoot, `review-${String(sequence).padStart(4, '0')}`))) sequence += 1;
        const finalDir = path.join(reviewRoot, `review-${String(sequence).padStart(4, '0')}`);
        temporaryDir = fs.mkdtempSync(path.join(reviewRoot, '.pending-'));
        for (const kind of ['baseline', 'current', 'diff'] as const) {
          for (const sheetScale of [1, scale]) {
            const key = `${kind}${sheetScale}x`;
            const filename = `${kind}-${sheetScale}x.png`;
            const buffer = renderContactSheet(kind, session.baseline, session.document, sheetScale, changes, args.columns);
            fs.writeFileSync(path.join(temporaryDir, filename), buffer, { flag: 'wx' });
            artifacts[key] = path.join(finalDir, filename);
          }
        }
        image = renderContactSheet('diff', session.baseline, session.document, scale, changes, args.columns);
        fs.renameSync(temporaryDir, finalDir);
      } catch (error) {
        if (temporaryDir) {
          try {
            fs.rmSync(temporaryDir, { recursive: true, force: true });
          } catch {
            // Preserve the original structured review failure.
          }
        }
        return this.failure(args.projectId, 'VALIDATION_FAILED', `Review generation failed: ${(error as Error).message}`, 'Correct the output filesystem condition and retry.');
      }
      if (!image) return this.failure(args.projectId, 'VALIDATION_FAILED', 'Review generation produced no image', 'Retry review generation.');
      session.reviewSequence = sequence;
      const baselineHashes = await documentHashes(session.baseline);
      const currentHashes = await documentHashes(session.document);
      return response({
        ok: true,
        operation: 'get_animation_review',
        projectId: args.projectId,
        revision: session.document.revision,
        reviewNumber: sequence,
        scale,
        baselineHashes,
        currentHashes,
        changedFrames: changes.filter((change) => change.pixelsChanged || change.durationChanged),
        frameOrderChanged: session.baseline.frames.map((frame) => frame.id).join('\0') !== session.document.frames.map((frame) => frame.id).join('\0'),
        baselineFrameOrder: session.baseline.frames.map((frame) => frame.id),
        currentFrameOrder: session.document.frames.map((frame) => frame.id),
        layout: getContactSheetDimensions('diff', session.baseline, session.document, scale, args.columns),
        artifacts,
      }, { image });
    });
  }
}
