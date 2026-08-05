import * as fs from 'node:fs';
import * as path from 'node:path';
import { randomUUID } from 'node:crypto';
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
  validateDocumentV2,
  type SpriteDocumentV2,
  type BundleReviewStatus,
  type WalkRightBrief,
  type ValidationIssue,
} from '@guile-pix/sprite-core';
import { getOutputDir } from './outputDir.js';
import { getPalette } from './palettes/builtIn.js';
import { analyzeFrameChanges, assertContactSheetSize, renderContactSheet } from './review.js';
import { encodeAnimationAtlas } from './animationBundle.js';

export type BridgeErrorCode =
  | 'STALE_REVISION'
  | 'INVALID_TARGET'
  | 'INVALID_CEL_REF'
  | 'VALIDATION_FAILED';

interface Hashes {
  semantic: string;
  pixels: string;
}

interface UndoSnapshot {
  before: SpriteDocumentV2;
  operation: string;
}

interface ProjectSession {
  document: SpriteDocumentV2;
  baseline: SpriteDocumentV2;
  lastUndo?: UndoSnapshot;
  reviewSequence: number;
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

function cloneDocument(document: SpriteDocumentV2): SpriteDocumentV2 {
  return JSON.parse(JSON.stringify(document)) as SpriteDocumentV2;
}

async function documentHashes(document: SpriteDocumentV2): Promise<Hashes> {
  return {
    semantic: await hashDocumentSemantic(document),
    pixels: await hashDocumentPixels(document),
  };
}

function response(
  payload: Record<string, unknown>,
  options: { isError?: boolean; image?: Buffer } = {},
): CallToolResult {
  const content: CallToolResult['content'] = [{ type: 'text', text: JSON.stringify(payload) }];
  if (options.image) {
    content.push({ type: 'image', data: options.image.toString('base64'), mimeType: 'image/png' });
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

export class AnimationBridge {
  private readonly sessions = new Map<string, ProjectSession>();
  private readonly operationQueues = new Map<string, Promise<void>>();
  private readonly outputDir: string;
  private nextProjectId = 1;

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
      if (session.document !== current || session.document.revision !== expectedRevision) {
        return this.failure(projectId, 'STALE_REVISION', 'The project changed before commit', 'Read the latest revision and retry.');
      }
      session.document = validated.value;
      session.lastUndo = { before: cloneDocument(current), operation };
      return response({
        ok: true,
        operation,
        projectId,
        revision: validated.value.revision,
        beforeHashes,
        afterHashes,
        ...(mutationResult.target ? { target: mutationResult.target } : {}),
        ...(mutationResult.data ?? {}),
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
      pivotPx: { x: Math.floor(args.width / 2), y: args.height - 1 },
      activeLayerId: layerId,
      activeFrameId: frameId,
      revision: 0,
    };
    const validated = validateDocumentV2(document);
    if (!validated.ok) {
      return this.failure(undefined, 'VALIDATION_FAILED', 'Could not create a valid sprite document', 'Correct the project inputs.', undefined, validated.issues);
    }
    this.sessions.set(projectId, { document: validated.value, baseline: cloneDocument(validated.value), reviewSequence: 0 });
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
      this.sessions.set(projectId, { document: loaded.value, baseline: cloneDocument(loaded.value), reviewSequence: 0 });
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

  async saveProject(args: { projectId: string; expectedRevision: number; outputPath?: string }): Promise<CallToolResult> {
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
        fs.renameSync(temporary, target);
      } catch (error) {
        if (temporary && fs.existsSync(temporary)) fs.rmSync(temporary);
        return this.failure(args.projectId, 'VALIDATION_FAILED', `Project save failed: ${(error as Error).message}`, 'Correct the output path or filesystem condition and retry.');
      }
      session.baseline = cloneDocument(session.document);
      return response({
        ok: true,
        operation: 'save_project',
        projectId: args.projectId,
        revision: session.document.revision,
        outputPath: target,
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
      const built = await buildAnimationBundle(session.document);
      if (!built.ok) {
        return this.failure(
          args.projectId,
          'VALIDATION_FAILED',
          'Animation does not satisfy the fixed runtime bundle contract',
          'Correct the reported source, clip, frame, timing, palette, or pivot issues and retry.',
          undefined,
          built.issues,
        );
      }
      const bundle = built.value;
      const atlasPng = encodeAnimationAtlas(bundle);
      const target = args.outputPath
        ? path.resolve(args.outputPath)
        : path.join(this.outputDir, 'bundles', `${safeName(args.projectId)}-walk_right-r${session.document.revision}`);
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
      draft.clip.frameIds = draft.frames.map((frame) => frame.id);
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
      draft.clip.frameIds = draft.frames.map((frame) => frame.id);
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

  async undo(args: { projectId: string; expectedRevision: number }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId);
      if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.');
      const current = session.document;
      if (current.revision !== args.expectedRevision) return this.failure(args.projectId, 'STALE_REVISION', `Expected revision ${args.expectedRevision}, current revision is ${current.revision}`, `Retry with expectedRevision ${current.revision}.`);
      if (!session.lastUndo) return this.failure(args.projectId, 'INVALID_TARGET', 'There is no operation to undo', 'Perform a document mutation before calling undo.');
      const beforeHashes = await documentHashes(current);
      const candidate = cloneDocument(session.lastUndo.before);
      candidate.revision = current.revision + 1;
      candidate.project.updatedAt = Date.now();
      const validated = validateDocumentV2(candidate);
      if (!validated.ok) return this.failure(args.projectId, 'VALIDATION_FAILED', 'Undo snapshot is invalid', 'Reload the project from its last saved baseline.', undefined, validated.issues);
      const afterHashes = await documentHashes(validated.value);
      if (session.document !== current) return this.failure(args.projectId, 'STALE_REVISION', 'The project changed before undo committed', 'Read the latest revision and retry.');
      const undoneOperation = session.lastUndo.operation;
      session.document = validated.value;
      session.lastUndo = undefined;
      return response({ ok: true, operation: 'undo', undoneOperation, projectId: args.projectId, revision: validated.value.revision, beforeHashes, afterHashes });
    });
  }

  async validateAnimation(args: { projectId: string }): Promise<CallToolResult> {
    return this.serial(args.projectId, async () => {
      const session = this.sessions.get(args.projectId);
      if (!session) return this.failure(args.projectId, 'INVALID_TARGET', `Project "${args.projectId}" was not found`, 'Load or create the project first.');
      const validated = validateDocumentV2(session.document);
      if (!validated.ok) return this.failure(args.projectId, 'VALIDATION_FAILED', 'Animation validation failed', 'Correct the reported document issues.', undefined, validated.issues);
      return response({
        ok: true,
        operation: 'validate_animation',
        projectId: args.projectId,
        revision: session.document.revision,
        valid: true,
        issues: [],
        frameCount: session.document.frames.length,
        afterHashes: await documentHashes(session.document),
      });
    });
  }

  async getAnimationReview(args: { projectId: string; scale?: number }): Promise<CallToolResult> {
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
          assertContactSheetSize(kind, session.baseline, session.document, 1);
          assertContactSheetSize(kind, session.baseline, session.document, scale);
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
            const buffer = renderContactSheet(kind, session.baseline, session.document, sheetScale, changes);
            fs.writeFileSync(path.join(temporaryDir, filename), buffer, { flag: 'wx' });
            artifacts[key] = path.join(finalDir, filename);
          }
        }
        image = renderContactSheet('diff', session.baseline, session.document, scale, changes);
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
        artifacts,
      }, { image });
    });
  }
}
