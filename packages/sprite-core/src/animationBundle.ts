import { compositeFrame } from './composite.js';
import { canonicalJson, validateDocumentV2 } from './document.js';
import { hashDocumentSemantic, sha256Hex } from './hash.js';
import type { CoreResult, SpriteDocumentV2, ValidationIssue } from './types.js';

export const ANIMATION_BUNDLE_CONTRACT = {
  sourceArtifactId: 'cornerfall-fighter-right-16',
  sourcePixelSha256: '7ca4f48ddf57c8efbf48e9fc40bbac41ebd1802d5c4104715d5082c099fdd3ee',
  paletteId: 'db16',
  palette: [
    '#140c1c', '#442434', '#30346d', '#4e4a4e',
    '#854c30', '#346524', '#d04648', '#757161',
    '#597dce', '#d27d2c', '#8595a1', '#6daa2c',
    '#d2aa99', '#6dc2ca', '#dad45e', '#deeed6',
  ],
  clipName: 'walk_right',
  frameCount: 4,
  frameWidth: 16,
  frameHeight: 16,
  durationMs: 100,
  pivotPx: { x: 8, y: 15 },
  facing: 'right',
  groundLineY: 15,
  rootMotion: 'none',
  atlasFilename: 'atlas.png',
  manifestFilename: 'manifest.json',
} as const;

export interface AsepriteFrameRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface AsepriteFrameEntry {
  filename: string;
  frame: AsepriteFrameRect;
  rotated: false;
  trimmed: false;
  spriteSourceSize: AsepriteFrameRect;
  sourceSize: { w: number; h: number };
  duration: number;
}

export interface GuilePixBundleMetadata {
  schemaVersion: 1;
  bundleHash: string;
  atlasSha256: string;
  documentSemanticHash: string;
  source: { artifactId: string; pixelSha256: string };
  palette: { id: string; sha256: string };
  framePixelHashes: string[];
  facing: 'right';
  groundLineY: 15;
  rootMotion: 'none';
}

export interface AsepriteAnimationManifest {
  frames: AsepriteFrameEntry[];
  meta: {
    app: 'guile-pix';
    version: '1.0';
    image: 'atlas.png';
    format: 'RGBA8888';
    size: { w: 64; h: 16 };
    scale: '1';
    frameTags: Array<{
      name: 'walk_right';
      from: 0;
      to: 3;
      direction: 'forward';
    }>;
    slices: Array<{
      name: 'guile_pix_origin';
      color: '#00000000';
      keys: Array<{
        frame: 0;
        bounds: AsepriteFrameRect;
        pivot: { x: 8; y: 15 };
      }>;
    }>;
    guile_pix: GuilePixBundleMetadata;
  };
}

export interface AnimationBundle {
  atlasWidth: 64;
  atlasHeight: 16;
  atlasRgba: Uint8Array;
  manifest: AsepriteAnimationManifest;
  manifestJson: string;
  bundleHash: string;
  atlasSha256: string;
}

export type BundleReviewStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface BundleReviewSidecar {
  schemaVersion: 1;
  bundleHash: string;
  status: BundleReviewStatus;
}

function issue(code: string, path: string, message: string): ValidationIssue {
  return { code, path, message };
}

function fail(issues: ValidationIssue[]): CoreResult<never> {
  return { ok: false, issues };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function exactObject(value: unknown, expected: Record<string, unknown>): boolean {
  return isObject(value)
    && Object.keys(value).length === Object.keys(expected).length
    && Object.entries(expected).every(([key, expectedValue]) => value[key] === expectedValue);
}

function bundleHashProjection(manifest: AsepriteAnimationManifest): unknown {
  const clone = JSON.parse(JSON.stringify(manifest)) as AsepriteAnimationManifest;
  delete (clone.meta.guile_pix as Partial<GuilePixBundleMetadata>).bundleHash;
  return {
    atlasSha256: clone.meta.guile_pix.atlasSha256,
    manifest: clone,
  };
}

async function calculateBundleHash(manifest: AsepriteAnimationManifest): Promise<string> {
  return sha256Hex(canonicalJson(bundleHashProjection(manifest)));
}

function validateFixedDocument(document: SpriteDocumentV2): ValidationIssue[] {
  const contract = ANIMATION_BUNDLE_CONTRACT;
  const issues: ValidationIssue[] = [];
  if (document.project.width !== contract.frameWidth || document.project.height !== contract.frameHeight) {
    issues.push(issue('BUNDLE_CONTRACT', '$.project', 'Bundle export requires a 16x16 project'));
  }
  if (document.clip.name !== contract.clipName || document.clip.loop !== 'linear') {
    issues.push(issue('BUNDLE_CONTRACT', '$.clip', 'Bundle export requires the linear walk_right clip'));
  }
  if (document.frames.length !== contract.frameCount) {
    issues.push(issue('BUNDLE_CONTRACT', '$.frames', 'Bundle export requires exactly four frames'));
  }
  document.frames.forEach((frame, index) => {
    if (frame.durationMs !== contract.durationMs) {
      issues.push(issue('BUNDLE_CONTRACT', `$.frames[${index}].durationMs`, 'Every frame must be 100 ms'));
    }
  });
  if (document.pivotPx.x !== contract.pivotPx.x || document.pivotPx.y !== contract.pivotPx.y) {
    issues.push(issue('BUNDLE_CONTRACT', '$.pivotPx', 'Bundle export requires pivot (8,15)'));
  }
  if (document.palette.length !== contract.palette.length
    || document.palette.some((color, index) => color.toLowerCase() !== contract.palette[index])) {
    issues.push(issue('BUNDLE_CONTRACT', '$.palette', 'Bundle export requires the ordered DB16 palette'));
  }
  if (document.source?.artifactId !== contract.sourceArtifactId || document.source.paletteId !== contract.paletteId) {
    issues.push(issue('BUNDLE_CONTRACT', '$.source', 'Bundle export requires the approved cornerfall-fighter-right-16 DB16 source'));
  }
  return issues;
}

export async function buildAnimationBundle(input: unknown): Promise<CoreResult<AnimationBundle>> {
  const validated = validateDocumentV2(input);
  if (!validated.ok) return validated;
  const document = validated.value;
  const contractIssues = validateFixedDocument(document);
  if (contractIssues.length > 0) return fail(contractIssues);

  const framePixels = document.frames.map((frame) => new Uint8Array(compositeFrame(document, frame.id)));
  const sourcePixelSha256 = await sha256Hex(framePixels[0]);
  if (sourcePixelSha256 !== ANIMATION_BUNDLE_CONTRACT.sourcePixelSha256) {
    return fail([issue(
      'SOURCE_PIXEL_MISMATCH',
      '$.frames[0]',
      `Canonical source pixels must hash to ${ANIMATION_BUNDLE_CONTRACT.sourcePixelSha256}`,
    )]);
  }

  const atlasRgba = new Uint8Array(64 * 16 * 4);
  for (let frameIndex = 0; frameIndex < framePixels.length; frameIndex += 1) {
    const pixels = framePixels[frameIndex];
    for (let y = 0; y < 16; y += 1) {
      const sourceStart = y * 16 * 4;
      const targetStart = (y * 64 + frameIndex * 16) * 4;
      atlasRgba.set(pixels.subarray(sourceStart, sourceStart + 16 * 4), targetStart);
    }
  }

  const atlasSha256 = await sha256Hex(atlasRgba);
  const paletteSha256 = await sha256Hex(canonicalJson(ANIMATION_BUNDLE_CONTRACT.palette));
  const framePixelHashes = await Promise.all(framePixels.map((pixels) => sha256Hex(pixels)));
  const documentSemanticHash = await hashDocumentSemantic(document);
  const frames: AsepriteFrameEntry[] = document.frames.map((_, index) => ({
    filename: `walk_right-${index}.png`,
    frame: { x: index * 16, y: 0, w: 16, h: 16 },
    rotated: false,
    trimmed: false,
    spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 },
    sourceSize: { w: 16, h: 16 },
    duration: 100,
  }));
  const metadata: GuilePixBundleMetadata = {
    schemaVersion: 1,
    bundleHash: '',
    atlasSha256,
    documentSemanticHash,
    source: { artifactId: ANIMATION_BUNDLE_CONTRACT.sourceArtifactId, pixelSha256: sourcePixelSha256 },
    palette: { id: ANIMATION_BUNDLE_CONTRACT.paletteId, sha256: paletteSha256 },
    framePixelHashes,
    facing: 'right',
    groundLineY: 15,
    rootMotion: 'none',
  };
  const manifest: AsepriteAnimationManifest = {
    frames,
    meta: {
      app: 'guile-pix',
      version: '1.0',
      image: 'atlas.png',
      format: 'RGBA8888',
      size: { w: 64, h: 16 },
      scale: '1',
      frameTags: [{ name: 'walk_right', from: 0, to: 3, direction: 'forward' }],
      slices: [{
        name: 'guile_pix_origin',
        color: '#00000000',
        keys: [{ frame: 0, bounds: { x: 0, y: 0, w: 16, h: 16 }, pivot: { x: 8, y: 15 } }],
      }],
      guile_pix: metadata,
    },
  };
  const bundleHash = await calculateBundleHash(manifest);
  manifest.meta.guile_pix.bundleHash = bundleHash;
  const manifestValidation = await validateAsepriteManifestSubset(manifest);
  if (!manifestValidation.ok) return manifestValidation;
  return {
    ok: true,
    value: {
      atlasWidth: 64,
      atlasHeight: 16,
      atlasRgba,
      manifest,
      manifestJson: canonicalJson(manifest),
      bundleHash,
      atlasSha256,
    },
  };
}

export async function validateAsepriteManifestSubset(input: unknown): Promise<CoreResult<AsepriteAnimationManifest>> {
  if (!isObject(input) || !Array.isArray(input.frames) || !isObject(input.meta)) {
    return fail([issue('INVALID_MANIFEST', '$', 'Expected frames array and meta object')]);
  }
  let manifest: AsepriteAnimationManifest;
  try {
    manifest = JSON.parse(JSON.stringify(input)) as AsepriteAnimationManifest;
  } catch {
    return fail([issue('INVALID_MANIFEST', '$', 'Manifest must be finite, acyclic JSON data')]);
  }
  const issues: ValidationIssue[] = [];
  if (manifest.frames.length !== 4) issues.push(issue('INVALID_MANIFEST', '$.frames', 'Expected exactly four frames'));
  manifest.frames.forEach((frame, index) => {
    const path = `$.frames[${index}]`;
    if (!isObject(frame)) {
      issues.push(issue('INVALID_MANIFEST', path, 'Frame must be an object'));
      return;
    }
    if (frame.filename !== `walk_right-${index}.png`) issues.push(issue('INVALID_MANIFEST', `${path}.filename`, 'Unexpected frame filename/order'));
    if (!exactObject(frame.frame, { x: index * 16, y: 0, w: 16, h: 16 })) issues.push(issue('INVALID_MANIFEST', `${path}.frame`, 'Unexpected atlas rectangle'));
    if (frame.rotated !== false || frame.trimmed !== false) issues.push(issue('INVALID_MANIFEST', path, 'Frames must be untrimmed and non-rotated'));
    if (!exactObject(frame.spriteSourceSize, { x: 0, y: 0, w: 16, h: 16 })) issues.push(issue('INVALID_MANIFEST', `${path}.spriteSourceSize`, 'Unexpected source rectangle'));
    if (!exactObject(frame.sourceSize, { w: 16, h: 16 })) issues.push(issue('INVALID_MANIFEST', `${path}.sourceSize`, 'Unexpected source size'));
    if (frame.duration !== 100) issues.push(issue('INVALID_MANIFEST', `${path}.duration`, 'Frame duration must be 100 ms'));
  });

  const meta = manifest.meta;
  if (meta.app !== 'guile-pix' || meta.version !== '1.0' || meta.image !== 'atlas.png' || meta.format !== 'RGBA8888' || meta.scale !== '1') {
    issues.push(issue('INVALID_MANIFEST', '$.meta', 'Unexpected Aseprite metadata identity/format'));
  }
  if (!exactObject(meta.size, { w: 64, h: 16 })) issues.push(issue('INVALID_MANIFEST', '$.meta.size', 'Atlas size must be 64x16'));
  if (!Array.isArray(meta.frameTags) || meta.frameTags.length !== 1
    || !exactObject(meta.frameTags[0], { name: 'walk_right', from: 0, to: 3, direction: 'forward' })) {
    issues.push(issue('INVALID_MANIFEST', '$.meta.frameTags', 'Expected one forward walk_right tag covering frames 0-3'));
  }
  const slice = Array.isArray(meta.slices) && meta.slices.length === 1 ? meta.slices[0] : undefined;
  const key = slice && Array.isArray(slice.keys) && slice.keys.length === 1 ? slice.keys[0] : undefined;
  if (!slice || slice.name !== 'guile_pix_origin' || slice.color !== '#00000000' || !key
    || key.frame !== 0 || !exactObject(key.bounds, { x: 0, y: 0, w: 16, h: 16 })
    || !exactObject(key.pivot, { x: 8, y: 15 })) {
    issues.push(issue('INVALID_MANIFEST', '$.meta.slices', 'Expected guile_pix_origin with pivot (8,15)'));
  }

  const extension = meta.guile_pix;
  const sha256 = /^[0-9a-f]{64}$/;
  const expectedPaletteSha256 = await sha256Hex(canonicalJson(ANIMATION_BUNDLE_CONTRACT.palette));
  if (!isObject(extension)
    || extension.schemaVersion !== 1
    || !sha256.test(extension.bundleHash)
    || !sha256.test(extension.atlasSha256)
    || !sha256.test(extension.documentSemanticHash)
    || !isObject(extension.source)
    || extension.source.artifactId !== ANIMATION_BUNDLE_CONTRACT.sourceArtifactId
    || extension.source.pixelSha256 !== ANIMATION_BUNDLE_CONTRACT.sourcePixelSha256
    || !isObject(extension.palette)
    || extension.palette.id !== ANIMATION_BUNDLE_CONTRACT.paletteId
    || extension.palette.sha256 !== expectedPaletteSha256
    || !Array.isArray(extension.framePixelHashes)
    || extension.framePixelHashes.length !== 4
    || extension.framePixelHashes.some((hash) => typeof hash !== 'string' || !sha256.test(hash))
    || extension.facing !== 'right'
    || extension.groundLineY !== 15
    || extension.rootMotion !== 'none') {
    issues.push(issue('INVALID_MANIFEST', '$.meta.guile_pix', 'Invalid Guile Pix runtime metadata'));
  }
  if (issues.length === 0 && extension.bundleHash !== await calculateBundleHash(manifest)) {
    issues.push(issue('INVALID_MANIFEST', '$.meta.guile_pix.bundleHash', 'Bundle hash does not match manifest semantics'));
  }
  return issues.length > 0 ? { ok: false, issues } : { ok: true, value: manifest };
}

export function buildBundleReviewSidecar(bundleHash: string, status: BundleReviewStatus): BundleReviewSidecar {
  return { schemaVersion: 1, bundleHash, status };
}

export function serializeBundleReviewSidecar(bundleHash: string, status: BundleReviewStatus): string {
  return canonicalJson(buildBundleReviewSidecar(bundleHash, status));
}
