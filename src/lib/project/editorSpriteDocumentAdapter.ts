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
}

function findSharedLayerDataReference(frames: Frame[]): { firstPath: string; sharedPath: string } | null {
  const owners = new Map<Uint8ClampedArray, string>();

  for (let frameIndex = 0; frameIndex < frames.length; frameIndex += 1) {
    for (const [layerId, data] of Object.entries(frames[frameIndex].layerData)) {
      const path = `$.frames[${frameIndex}].layerData.${layerId}`;
      const firstPath = owners.get(data);
      if (firstPath) return { firstPath, sharedPath: path };
      owners.set(data, path);
    }
  }

  return null;
}

export function snapshotEditorDocumentV2(
  input: EditorSpriteDocumentSnapshotInput
): CoreResult<SpriteDocumentV2> {
  const sharedReference = findSharedLayerDataReference(input.frames);
  if (sharedReference) {
    return {
      ok: false,
      issues: [{
        code: 'UNSUPPORTED_LINK_SEMANTICS',
        path: sharedReference.sharedPath,
        message: `Shared layer data with ${sharedReference.firstPath} cannot be preserved by version 1 persistence`,
      }],
    };
  }

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

  const v1 = serializeProject(
    input.project,
    input.layers,
    input.activeLayerId,
    input.frames,
    input.fps,
  );
  const migrated = migrateProjectFileV1(v1, {
    ...input.migration,
    loop: input.loop ? 'linear' : 'once',
  });
  if (!migrated.ok) return migrated;

  migrated.value.activeFrameId = input.frames[input.activeFrameIndex].id;
  return validateDocumentV2(migrated.value);
}
