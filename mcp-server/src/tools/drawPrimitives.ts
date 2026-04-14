import { getProject, getLayer, pushUndo, type UndoEntry } from '../project.js';
import { hexToRgba } from '../lib/colorUtils.js';
import { bresenhamLine } from '../lib/bresenham.js';
import { floodFill } from '../lib/flood-fill.js';

export interface DrawLineArgs {
  projectId: string;
  layer?: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  thickness?: number;
}

export interface DrawRectArgs {
  projectId: string;
  layer?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  filled?: boolean;
}

export interface FillAreaArgs {
  projectId: string;
  layer?: string;
  x: number;
  y: number;
  color: string;
}

export function handleDrawLine(args: DrawLineArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const layer = getLayer(project, args.layer);
  if (!layer) {
    return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };
  }

  const undoEntry: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const color = hexToRgba(args.color);
  const thickness = Math.max(1, Math.round(args.thickness ?? 1));

  const points = bresenhamLine(
    Math.round(args.x1), Math.round(args.y1),
    Math.round(args.x2), Math.round(args.y2)
  );

  for (const p of points) {
    if (thickness === 1) {
      layer.buffer.setPixel(p.x, p.y, color);
    } else {
      const half = Math.floor(thickness / 2);
      for (let dy = 0; dy < thickness; dy++) {
        for (let dx = 0; dx < thickness; dx++) {
          layer.buffer.setPixel(p.x - half + dx, p.y - half + dy, color);
        }
      }
    }
  }

  pushUndo(project, [undoEntry]);
  project.updatedAt = Date.now();

  return {
    content: [{ type: 'text' as const, text: `Drew line from (${args.x1},${args.y1}) to (${args.x2},${args.y2}) on "${layer.name}"` }],
  };
}

export function handleDrawRect(args: DrawRectArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const layer = getLayer(project, args.layer);
  if (!layer) {
    return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };
  }

  const undoEntry: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const color = hexToRgba(args.color);
  const x = Math.round(args.x);
  const y = Math.round(args.y);
  const w = Math.round(args.w);
  const h = Math.round(args.h);
  const filled = args.filled ?? false;

  if (filled) {
    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        layer.buffer.setPixel(x + dx, y + dy, color);
      }
    }
  } else {
    // Top and bottom edges
    for (let dx = 0; dx < w; dx++) {
      layer.buffer.setPixel(x + dx, y, color);
      layer.buffer.setPixel(x + dx, y + h - 1, color);
    }
    // Left and right edges
    for (let dy = 0; dy < h; dy++) {
      layer.buffer.setPixel(x, y + dy, color);
      layer.buffer.setPixel(x + w - 1, y + dy, color);
    }
  }

  pushUndo(project, [undoEntry]);
  project.updatedAt = Date.now();

  return {
    content: [{ type: 'text' as const, text: `Drew ${filled ? 'filled' : 'outline'} rect at (${x},${y}) ${w}x${h} on "${layer.name}"` }],
  };
}

export function handleFillArea(args: FillAreaArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const layer = getLayer(project, args.layer);
  if (!layer) {
    return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };
  }

  const undoEntry: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const color = hexToRgba(args.color);

  floodFill(layer.buffer, Math.round(args.x), Math.round(args.y), color);

  pushUndo(project, [undoEntry]);
  project.updatedAt = Date.now();

  return {
    content: [{ type: 'text' as const, text: `Flood filled from (${args.x},${args.y}) on "${layer.name}"` }],
  };
}
