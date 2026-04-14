import { getProject, getLayer, pushUndo, type UndoEntry } from '../project.js';
import { hexToRgba } from '../lib/colorUtils.js';

export interface PixelEntry {
  x: number;
  y: number;
  color: string; // hex
}

export interface SetPixelsArgs {
  projectId: string;
  layer?: string;
  pixels: PixelEntry[];
}

export function handleSetPixels(args: SetPixelsArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const layer = getLayer(project, args.layer);
  if (!layer) {
    return { content: [{ type: 'text' as const, text: `Error: Layer "${args.layer || project.activeLayerId}" not found` }], isError: true };
  }

  // Save undo state
  const undoEntry: UndoEntry = {
    layerId: layer.id,
    data: new Uint8ClampedArray(layer.buffer.data),
  };

  let count = 0;
  for (const pixel of args.pixels) {
    const x = Math.round(pixel.x);
    const y = Math.round(pixel.y);
    if (x < 0 || x >= project.width || y < 0 || y >= project.height) continue;
    const color = hexToRgba(pixel.color);
    layer.buffer.setPixel(x, y, color);
    count++;
  }

  pushUndo(project, [undoEntry]);
  project.updatedAt = Date.now();

  return {
    content: [
      {
        type: 'text' as const,
        text: `Set ${count} pixels on layer "${layer.name}" (${layer.id})`,
      },
    ],
  };
}
