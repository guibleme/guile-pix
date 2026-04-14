import { getProject, getLayer, pushUndo, type UndoEntry } from '../project.js';
import { rgbaToHex } from '../lib/colorUtils.js';

export interface GetCanvasStateArgs {
  projectId: string;
  layer?: string;
}

export interface ClearLayerArgs {
  projectId: string;
  layer?: string;
}

export function handleGetCanvasState(args: GetCanvasStateArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const layer = getLayer(project, args.layer);
  if (!layer) {
    return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };
  }

  // Build a text grid representation
  const lines: string[] = [];
  lines.push(`Canvas: ${project.width}x${project.height} | Layer: "${layer.name}" (${layer.id})`);
  lines.push('');

  // Header with column numbers
  let header = '   ';
  for (let x = 0; x < project.width; x++) {
    header += (x % 10).toString();
  }
  lines.push(header);

  for (let y = 0; y < project.height; y++) {
    let row = String(y).padStart(2, ' ') + ' ';
    for (let x = 0; x < project.width; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (pixel.a === 0) {
        row += '.';
      } else {
        // Use a simple character mapping for common colors
        row += '#';
      }
    }
    lines.push(row);
  }

  // Also include a color map for non-empty pixels
  const colorMap = new Map<string, Array<[number, number]>>();
  for (let y = 0; y < project.height; y++) {
    for (let x = 0; x < project.width; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (pixel.a > 0) {
        const hex = rgbaToHex(pixel);
        if (!colorMap.has(hex)) colorMap.set(hex, []);
        colorMap.get(hex)!.push([x, y]);
      }
    }
  }

  if (colorMap.size > 0) {
    lines.push('');
    lines.push('Colors used:');
    for (const [hex, coords] of colorMap) {
      lines.push(`  ${hex}: ${coords.length} pixels`);
    }
  }

  return {
    content: [{ type: 'text' as const, text: lines.join('\n') }],
  };
}

export function handleClearLayer(args: ClearLayerArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const layer = getLayer(project, args.layer);
  if (!layer) {
    return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };
  }

  const undoEntry: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  layer.buffer.clear();
  pushUndo(project, [undoEntry]);
  project.updatedAt = Date.now();

  return {
    content: [{ type: 'text' as const, text: `Cleared layer "${layer.name}" (${layer.id})` }],
  };
}
