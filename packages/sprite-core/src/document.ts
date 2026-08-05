import {
  SPRITE_DOCUMENT_VERSION,
  type BlendMode,
  type CoreResult,
  type ProjectFileV1,
  type SpriteDocumentV2,
  type ValidationIssue,
  type V1MigrationOptions,
} from './types.js';

const BLEND_MODES = new Set<BlendMode>(['normal', 'multiply', 'screen', 'overlay']);
const LOOP_MODES = new Set(['linear', 'ping_pong', 'once']);
const HEX_COLOR = /^#[0-9a-f]{6}$/i;
const SHA256 = /^[0-9a-f]{64}$/i;
const MAX_SIDE = 1024;
const MAX_FRAMES = 240;
const MAX_LAYERS = 64;
// v1 stores channels as JS number arrays, so cap aggregate migration input before allocation.
const MAX_V1_MIGRATION_RGBA_BYTES = 64 * 1024 * 1024;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFiniteInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && Number.isInteger(value);
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function issue(code: string, path: string, message: string): ValidationIssue {
  return { code, path, message };
}

function structuralFailure(path: string, expected: string): CoreResult<SpriteDocumentV2> {
  return { ok: false, issues: [issue('INVALID_STRUCTURE', path, `Expected ${expected}`)] };
}

export function validateDocumentV2(input: unknown): CoreResult<SpriteDocumentV2> {
  if (!isObject(input)) return structuralFailure('$', 'an object');
  if (input.version !== SPRITE_DOCUMENT_VERSION) {
    return { ok: false, issues: [issue('UNSUPPORTED_VERSION', '$.version', 'Expected version 2')] };
  }
  if (!isObject(input.project)) return structuralFailure('$.project', 'an object');
  if (!Array.isArray(input.layers)) return structuralFailure('$.layers', 'an array');
  if (!isObject(input.cels)) return structuralFailure('$.cels', 'an object');
  if (!Array.isArray(input.frames)) return structuralFailure('$.frames', 'an array');
  if (!isObject(input.clip)) return structuralFailure('$.clip', 'an object');
  if (!Array.isArray(input.palette)) return structuralFailure('$.palette', 'an array');
  if (!isObject(input.pivotPx)) return structuralFailure('$.pivotPx', 'an object');

  let document: SpriteDocumentV2;
  try {
    document = cloneJson(input) as unknown as SpriteDocumentV2;
  } catch {
    return { ok: false, issues: [issue('INVALID_STRUCTURE', '$', 'Document must be finite, acyclic JSON data')] };
  }
  const issues: ValidationIssue[] = [];
  const { project } = document;

  if (!project.id || typeof project.id !== 'string') issues.push(issue('INVALID_PROJECT', '$.project.id', 'Project ID is required'));
  if (!project.name || typeof project.name !== 'string') issues.push(issue('INVALID_PROJECT', '$.project.name', 'Project name is required'));
  if (!isFiniteInteger(project.width) || project.width < 1 || project.width > MAX_SIDE) {
    issues.push(issue('INVALID_DIMENSION', '$.project.width', `Width must be an integer from 1 to ${MAX_SIDE}`));
  }
  if (!isFiniteInteger(project.height) || project.height < 1 || project.height > MAX_SIDE) {
    issues.push(issue('INVALID_DIMENSION', '$.project.height', `Height must be an integer from 1 to ${MAX_SIDE}`));
  }
  if (typeof project.createdAt !== 'number' || !Number.isFinite(project.createdAt)) {
    issues.push(issue('INVALID_PROJECT', '$.project.createdAt', 'createdAt must be finite'));
  }
  if (typeof project.updatedAt !== 'number' || !Number.isFinite(project.updatedAt)) {
    issues.push(issue('INVALID_PROJECT', '$.project.updatedAt', 'updatedAt must be finite'));
  }

  if (document.layers.length < 1 || document.layers.length > MAX_LAYERS) {
    issues.push(issue('INVALID_LAYER_COUNT', '$.layers', `Layer count must be from 1 to ${MAX_LAYERS}`));
  }
  const layerIds = new Set<string>();
  document.layers.forEach((layer, index) => {
    const path = `$.layers[${index}]`;
    if (!isObject(layer)) {
      issues.push(issue('INVALID_LAYER', path, 'Layer must be an object'));
      return;
    }
    if (!layer.id || typeof layer.id !== 'string') issues.push(issue('INVALID_LAYER', `${path}.id`, 'Layer ID is required'));
    else if (layerIds.has(layer.id)) issues.push(issue('DUPLICATE_ID', `${path}.id`, `Duplicate layer ID ${layer.id}`));
    else layerIds.add(layer.id);
    if (typeof layer.name !== 'string' || !layer.name) issues.push(issue('INVALID_LAYER', `${path}.name`, 'Layer name is required'));
    if (typeof layer.visible !== 'boolean') issues.push(issue('INVALID_LAYER', `${path}.visible`, 'visible must be boolean'));
    if (typeof layer.locked !== 'boolean') issues.push(issue('INVALID_LAYER', `${path}.locked`, 'locked must be boolean'));
    if (typeof layer.opacity !== 'number' || !Number.isFinite(layer.opacity) || layer.opacity < 0 || layer.opacity > 1) {
      issues.push(issue('INVALID_LAYER', `${path}.opacity`, 'opacity must be from 0 to 1'));
    }
    if (!BLEND_MODES.has(layer.blendMode)) issues.push(issue('INVALID_BLEND_MODE', `${path}.blendMode`, 'Unsupported blend mode'));
  });

  const expectedBytes = Number.isInteger(project.width) && Number.isInteger(project.height)
    ? project.width * project.height * 4
    : -1;
  const celIds = new Set<string>();
  Object.entries(document.cels).forEach(([key, cel]) => {
    const path = `$.cels.${key}`;
    if (!isObject(cel)) {
      issues.push(issue('INVALID_CEL', path, 'Cel must be an object'));
      return;
    }
    if (cel.id !== key) issues.push(issue('INVALID_CEL', `${path}.id`, 'Cel ID must match its map key'));
    if (celIds.has(key)) issues.push(issue('DUPLICATE_ID', path, `Duplicate cel ID ${key}`));
    celIds.add(key);
    if (!Array.isArray(cel.data) || cel.data.length !== expectedBytes) {
      issues.push(issue('INVALID_CEL_DATA', `${path}.data`, `Cel data must contain ${expectedBytes} bytes`));
      return;
    }
    cel.data.forEach((byte, byteIndex) => {
      if (!isFiniteInteger(byte) || byte < 0 || byte > 255) {
        issues.push(issue('INVALID_CEL_DATA', `${path}.data[${byteIndex}]`, 'Pixel channel must be an integer byte'));
      }
    });
  });

  if (document.frames.length < 1 || document.frames.length > MAX_FRAMES) {
    issues.push(issue('INVALID_FRAME_COUNT', '$.frames', `Frame count must be from 1 to ${MAX_FRAMES}`));
  }
  const frameIds = new Set<string>();
  document.frames.forEach((frame, index) => {
    const path = `$.frames[${index}]`;
    if (!isObject(frame)) {
      issues.push(issue('INVALID_FRAME', path, 'Frame must be an object'));
      return;
    }
    if (!frame.id || typeof frame.id !== 'string') issues.push(issue('INVALID_FRAME', `${path}.id`, 'Frame ID is required'));
    else if (frameIds.has(frame.id)) issues.push(issue('DUPLICATE_ID', `${path}.id`, `Duplicate frame ID ${frame.id}`));
    else frameIds.add(frame.id);
    if (!isFiniteInteger(frame.durationMs) || frame.durationMs < 1 || frame.durationMs > 10000) {
      issues.push(issue('INVALID_DURATION', `${path}.durationMs`, 'Duration must be an integer from 1 to 10000 ms'));
    }
    if (!isObject(frame.celRefs)) {
      issues.push(issue('INVALID_CEL_REF', `${path}.celRefs`, 'celRefs must be an object'));
      return;
    }
    for (const layerId of layerIds) {
      const celId = frame.celRefs[layerId];
      if (typeof celId !== 'string') {
        issues.push(issue('MISSING_CEL_REF', `${path}.celRefs.${layerId}`, 'Every frame must reference every layer'));
      } else if (!celIds.has(celId)) {
        issues.push(issue('INVALID_CEL_REF', `${path}.celRefs.${layerId}`, `Unknown cel ID ${celId}`));
      }
    }
    Object.keys(frame.celRefs).forEach((layerId) => {
      if (!layerIds.has(layerId)) issues.push(issue('INVALID_CEL_REF', `${path}.celRefs.${layerId}`, `Unknown layer ID ${layerId}`));
    });
  });

  if (!document.clip.id || typeof document.clip.id !== 'string') issues.push(issue('INVALID_CLIP', '$.clip.id', 'Clip ID is required'));
  if (!document.clip.name || typeof document.clip.name !== 'string') issues.push(issue('INVALID_CLIP', '$.clip.name', 'Clip name is required'));
  if (!LOOP_MODES.has(document.clip.loop)) issues.push(issue('INVALID_CLIP', '$.clip.loop', 'Unsupported loop mode'));
  if (!Array.isArray(document.clip.frameIds)) {
    issues.push(issue('INVALID_CLIP', '$.clip.frameIds', 'frameIds must be an array'));
  } else {
    const orderedFrameIds = document.frames.map((frame) => frame.id);
    if (document.clip.frameIds.length !== orderedFrameIds.length || document.clip.frameIds.some((id, index) => id !== orderedFrameIds[index])) {
      issues.push(issue('INVALID_CLIP', '$.clip.frameIds', 'The single clip must reference every frame in document order'));
    }
  }

  document.palette.forEach((color, index) => {
    if (typeof color !== 'string' || !HEX_COLOR.test(color)) {
      issues.push(issue('INVALID_PALETTE', `$.palette[${index}]`, 'Palette entries must be #RRGGBB colors'));
    }
  });
  if (!isFiniteInteger(document.pivotPx.x) || document.pivotPx.x < 0 || document.pivotPx.x >= project.width) {
    issues.push(issue('INVALID_PIVOT', '$.pivotPx.x', 'Pivot x must be inside the canvas'));
  }
  if (!isFiniteInteger(document.pivotPx.y) || document.pivotPx.y < 0 || document.pivotPx.y >= project.height) {
    issues.push(issue('INVALID_PIVOT', '$.pivotPx.y', 'Pivot y must be inside the canvas'));
  }
  if (!layerIds.has(document.activeLayerId)) issues.push(issue('INVALID_ACTIVE_TARGET', '$.activeLayerId', 'Active layer does not exist'));
  if (!frameIds.has(document.activeFrameId)) issues.push(issue('INVALID_ACTIVE_TARGET', '$.activeFrameId', 'Active frame does not exist'));
  if (!isFiniteInteger(document.revision) || document.revision < 0) issues.push(issue('INVALID_REVISION', '$.revision', 'Revision must be a non-negative integer'));
  if (document.source) {
    if (!document.source.artifactId) issues.push(issue('INVALID_SOURCE', '$.source.artifactId', 'Source artifact ID is required'));
    if (!SHA256.test(document.source.sha256)) issues.push(issue('INVALID_SOURCE', '$.source.sha256', 'Source SHA-256 must contain 64 hex characters'));
    if (!document.source.paletteId) issues.push(issue('INVALID_SOURCE', '$.source.paletteId', 'Source palette ID is required'));
    if (!document.source.renderProcedure) issues.push(issue('INVALID_SOURCE', '$.source.renderProcedure', 'Source render procedure is required'));
  }

  return issues.length > 0 ? { ok: false, issues } : { ok: true, value: document };
}

export function normalizeDocumentV2(input: unknown): CoreResult<SpriteDocumentV2> {
  return validateDocumentV2(input);
}

export function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (ArrayBuffer.isView(value)) return Array.from(value as unknown as ArrayLike<number>);
  if (!isObject(value)) return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, canonicalize(value[key])]),
  );
}

export function canonicalJson(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

export function serializeDocumentV2(input: unknown): CoreResult<string> {
  const result = validateDocumentV2(input);
  return result.ok ? { ok: true, value: canonicalJson(result.value) } : result;
}

export function deserializeDocumentV2(json: string): CoreResult<SpriteDocumentV2> {
  try {
    return validateDocumentV2(JSON.parse(json));
  } catch {
    return { ok: false, issues: [issue('INVALID_JSON', '$', 'Document is not valid JSON')] };
  }
}

function v1Failure(path: string, message: string): CoreResult<SpriteDocumentV2> {
  return { ok: false, issues: [issue('INVALID_V1_PROJECT', path, message)] };
}

export function migrateProjectFileV1(input: unknown, options: V1MigrationOptions = {}): CoreResult<SpriteDocumentV2> {
  if (!isObject(input) || input.version !== 1) return v1Failure('$.version', 'Expected a version 1 project');
  if (!isObject(input.project) || !Array.isArray(input.layers) || !Array.isArray(input.frames)) {
    return v1Failure('$', 'Project, layers, and frames are required');
  }
  try {
    const v1 = input as unknown as ProjectFileV1;
    if (v1.layers.length < 1 || v1.layers.length > MAX_LAYERS) {
      return v1Failure('$.layers', `Layer count must be from 1 to ${MAX_LAYERS}`);
    }
    if (v1.frames.length < 1 || v1.frames.length > MAX_FRAMES) {
      return v1Failure('$.frames', `Frame count must be from 1 to ${MAX_FRAMES}`);
    }
    if (v1.layers.some((layer) => !isObject(layer)) || v1.frames.some((frame) => !isObject(frame))) {
      return v1Failure('$', 'Layers and frames must contain objects');
    }
    const width = v1.project.width;
    const height = v1.project.height;
    if (!isFiniteInteger(width) || width < 1 || width > MAX_SIDE || !isFiniteInteger(height) || height < 1 || height > MAX_SIDE) {
      return v1Failure('$.project', `Width and height must be integers from 1 to ${MAX_SIDE}`);
    }
    const expectedPixels = width * height;
    const expectedBytes = expectedPixels * 4;
    const aggregateBytes = expectedBytes * v1.layers.length * v1.frames.length;
    if (!Number.isSafeInteger(expectedPixels) || !Number.isSafeInteger(expectedBytes) || !Number.isSafeInteger(aggregateBytes)) {
      return v1Failure('$.project', 'Project pixel byte count must be a finite safe integer');
    }
    if (aggregateBytes > MAX_V1_MIGRATION_RGBA_BYTES) {
      return v1Failure('$.project', `Version 1 migration is limited to ${MAX_V1_MIGRATION_RGBA_BYTES} RGBA bytes`);
    }

    const cels: SpriteDocumentV2['cels'] = {};
    const frames: SpriteDocumentV2['frames'] = [];
    for (let frameIndex = 0; frameIndex < v1.frames.length; frameIndex += 1) {
      const frame = v1.frames[frameIndex];
      const frameId = frame.id || `frame-${frameIndex}`;
      const celRefs: Record<string, string> = {};
      for (let layerIndex = 0; layerIndex < v1.layers.length; layerIndex += 1) {
        const layer = v1.layers[layerIndex];
        const layerId = layer.id || `layer-${layerIndex}`;
        const celId = `cel:${frameId}:${layerId}`;
        const raw = frame.layerData?.[layerId];
        let data: number[];
        if (raw === undefined) {
          data = new Array<number>(expectedBytes).fill(0);
        } else {
          const rawLength = Array.isArray(raw) || ArrayBuffer.isView(raw)
            ? (raw as ArrayLike<number>).length
            : -1;
          if (rawLength !== expectedBytes) {
            return v1Failure(`$.frames[${frameIndex}].layerData.${layerId}`, `Pixel data must contain exactly ${expectedBytes} bytes`);
          }
          data = Array.from(raw as ArrayLike<number>);
        }
        cels[celId] = { id: celId, data };
        celRefs[layerId] = celId;
      }
      frames.push({ id: frameId, durationMs: frame.duration, celRefs });
    }

    const document: SpriteDocumentV2 = {
      version: SPRITE_DOCUMENT_VERSION,
      project: cloneJson(v1.project),
      layers: cloneJson(v1.layers),
      cels,
      frames,
      clip: {
        id: options.clipId ?? 'clip-default',
        name: options.clipName ?? 'default',
        frameIds: frames.map((frame) => frame.id),
        loop: options.loop ?? 'linear',
      },
      palette: [...(options.palette ?? [])],
      pivotPx: options.pivotPx ?? {
        x: Math.floor(v1.project.width / 2),
        y: Math.max(0, v1.project.height - 1),
      },
      activeLayerId: v1.activeLayerId,
      activeFrameId: frames[0].id,
      revision: 0,
      source: options.source ? cloneJson(options.source) : undefined,
    };
    return validateDocumentV2(document);
  } catch {
    return v1Failure('$', 'Version 1 project must be finite, acyclic JSON data');
  }
}
