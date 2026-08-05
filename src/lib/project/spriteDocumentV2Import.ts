import type { ProjectFile } from '@/lib/export/projectFile';
import {
  validateDocumentV2,
  type SpriteDocumentV2,
} from '@guile-pix/sprite-core';

export type SpriteDocumentV2ImportResult =
  | { ok: true; value: ProjectFile }
  | { ok: false; code: 'INVALID_V2_PROJECT' | 'UNSUPPORTED_LINKED_CELS' | 'UNSUPPORTED_PROJECT_SIZE'; message: string };

function invalid(message: string): SpriteDocumentV2ImportResult {
  return { ok: false, code: 'INVALID_V2_PROJECT', message };
}

function deriveFps(document: SpriteDocumentV2): number {
  const averageDuration = document.frames.reduce((total, frame) => total + frame.durationMs, 0)
    / document.frames.length;
  return Math.max(1, Math.min(120, Math.round(1000 / averageDuration)));
}

export function importSpriteDocumentV2(
  input: unknown,
  maxProjectPixelBytes: number,
): SpriteDocumentV2ImportResult {
  const validated = validateDocumentV2(input);
  if (!validated.ok) {
    const first = validated.issues[0];
    return invalid(first ? `${first.path}: ${first.message}` : 'Document validation failed');
  }

  const document = validated.value;
  const frameLayerBytes = document.project.width
    * document.project.height
    * 4
    * document.frames.length
    * document.layers.length;
  if (!Number.isSafeInteger(frameLayerBytes) || frameLayerBytes > maxProjectPixelBytes) {
    return {
      ok: false,
      code: 'UNSUPPORTED_PROJECT_SIZE',
      message: `Expanded editor pixel data exceeds ${maxProjectPixelBytes} bytes`,
    };
  }

  const referencedCels = new Map<string, string>();
  for (let frameIndex = 0; frameIndex < document.frames.length; frameIndex += 1) {
    const frame = document.frames[frameIndex];
    for (const layer of document.layers) {
      const celId = frame.celRefs[layer.id];
      const path = `$.frames[${frameIndex}].celRefs.${layer.id}`;
      const firstPath = referencedCels.get(celId);
      if (firstPath) {
        return {
          ok: false,
          code: 'UNSUPPORTED_LINKED_CELS',
          message: `Linked cel ${celId} is shared by ${firstPath} and ${path}; unlink it before opening in the editor`,
        };
      }
      referencedCels.set(celId, path);
    }
  }

  if (referencedCels.size !== Object.keys(document.cels).length) {
    return invalid('Document contains unreferenced cels that the editor cannot preserve');
  }

  return {
    ok: true,
    value: {
      version: 1,
      project: { ...document.project },
      layers: document.layers.map((layer) => ({ ...layer })),
      activeLayerId: document.activeLayerId,
      activeFrameId: document.activeFrameId,
      loop: document.clip.loop !== 'once',
      frames: document.frames.map((frame, index) => ({
        id: frame.id,
        index,
        duration: frame.durationMs,
        layerData: Object.fromEntries(document.layers.map((layer) => [
          layer.id,
          Array.from(document.cels[frame.celRefs[layer.id]].data),
        ])),
      })),
      fps: deriveFps(document),
    },
  };
}
