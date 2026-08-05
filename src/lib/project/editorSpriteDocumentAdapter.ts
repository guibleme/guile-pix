import type { Layer } from '@/types/layer';
import type { Frame } from '@/types/frame';
import type { ProjectSettings } from '@/types/project';
import { serializeProject } from '@/lib/export/projectFile';
import {
  migrateProjectFileV1,
  validateDocumentV2,
  type CoreResult,
  type SpriteDocumentV2,
  type V1MigrationOptions,
} from '@guile-pix/sprite-core';

export interface EditorSpriteDocumentSnapshotInput {
  project: ProjectSettings;
  layers: Layer[];
  activeLayerId: string;
  frames: Frame[];
  activeFrameIndex: number;
  fps: number;
  loop: boolean;
  migration?: Omit<V1MigrationOptions, 'loop'>;
  sourceDocument?: SpriteDocumentV2;
}

export function snapshotEditorDocumentV2(
  input: EditorSpriteDocumentSnapshotInput
): CoreResult<SpriteDocumentV2> {
  if (
    !Number.isInteger(input.activeFrameIndex)
    || input.activeFrameIndex < 0
    || input.activeFrameIndex >= input.frames.length
  ) {
    return {
      ok: false,
      issues: [{
        code: 'INVALID_ACTIVE_TARGET',
        path: '$.activeFrameIndex',
        message: 'Active frame index must reference an existing frame',
      }],
    };
  }

  let base: SpriteDocumentV2;
  if (input.sourceDocument) {
    const validated = validateDocumentV2(input.sourceDocument);
    if (!validated.ok) return validated;
    base = validated.value;
  } else {
    const migrated = migrateProjectFileV1(serializeProject(input.project, input.layers, input.activeLayerId, input.frames, input.fps), {
      ...input.migration,
      loop: input.loop ? 'linear' : 'once',
    });
    if (!migrated.ok) return migrated;
    base = migrated.value;
  }

  const document = JSON.parse(JSON.stringify(base)) as SpriteDocumentV2;
  const identityCels = new Map<Uint8ClampedArray, string>();
  const claimed = new Map<string, Uint8ClampedArray>();
  const cels: SpriteDocumentV2['cels'] = { ...document.cels };
  const uniqueCelId = (preferred: string): string => {
    let id = preferred; let suffix = 2;
    while (cels[id] && claimed.has(id)) id = `${preferred}:${suffix++}`;
    return id;
  };
  const frames = input.frames.map((frame) => {
    const sourceFrame = base.frames.find((candidate) => candidate.id === frame.id);
    const celRefs: Record<string, string> = {};
    for (const layer of input.layers) {
      const data = frame.layerData[layer.id] ?? new Uint8ClampedArray(input.project.width * input.project.height * 4);
      let celId = identityCels.get(data);
      if (!celId) {
        const preferred = sourceFrame?.celRefs[layer.id] ?? `cel:${frame.id}:${layer.id}`;
        celId = uniqueCelId(preferred);
        identityCels.set(data, celId);
        claimed.set(celId, data);
        cels[celId] = { id: celId, data: Array.from(data) };
      }
      celRefs[layer.id] = celId;
    }
    return { id: frame.id, durationMs: frame.duration, celRefs };
  });
  document.project = { ...input.project };
  document.layers = input.layers.map((layer) => ({ ...layer }));
  document.frames = frames;
  document.cels = cels;
  document.activeLayerId = input.activeLayerId;
  document.activeFrameId = input.frames[input.activeFrameIndex].id;
  const ids = new Set(frames.map((frame) => frame.id));
  if (document.clips) {
    document.clips = document.clips.map((clip) => ({ ...clip, frameIds: clip.frameIds.filter((id) => ids.has(id)) }));
    const active = document.clips.find((clip) => clip.id === document.activeClipId);
    if (active) document.clip = JSON.parse(JSON.stringify(active)) as typeof document.clip;
  } else {
    document.clip.frameIds = frames.map((frame) => frame.id);
    if (document.clip.loop !== 'ping_pong') document.clip.loop = input.loop ? 'linear' : 'once';
  }
  return validateDocumentV2(document);
}
