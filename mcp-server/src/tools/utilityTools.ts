import { getProject, getLayer, pushUndo, type UndoEntry } from '../project.js';
import { PixelBuffer, type RGBA } from '../lib/pixelBuffer.js';
import { hexToRgba, rgbaEqual, rgbaToHex } from '../lib/colorUtils.js';
import { bresenhamLine } from '../lib/bresenham.js';

// ─── mirror_horizontal ────────────────────────────────────────────────
export interface MirrorHorizontalArgs {
  projectId: string;
  layer?: string;
  direction: 'left_to_right' | 'right_to_left';
}

export function handleMirrorHorizontal(args: MirrorHorizontalArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const w = project.width;
  const h = project.height;
  const mid = Math.floor(w / 2);

  if (args.direction === 'left_to_right') {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < mid; x++) {
        const pixel = layer.buffer.getPixel(x, y);
        layer.buffer.setPixel(w - 1 - x, y, pixel);
      }
    }
  } else {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < mid; x++) {
        const pixel = layer.buffer.getPixel(w - 1 - x, y);
        layer.buffer.setPixel(x, y, pixel);
      }
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return { content: [{ type: 'text' as const, text: `Mirrored "${layer.name}" ${args.direction.replace('_', ' ')}` }] };
}

// ─── mirror_vertical ──────────────────────────────────────────────────
export interface MirrorVerticalArgs {
  projectId: string;
  layer?: string;
  direction: 'top_to_bottom' | 'bottom_to_top';
}

export function handleMirrorVertical(args: MirrorVerticalArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const w = project.width;
  const h = project.height;
  const mid = Math.floor(h / 2);

  if (args.direction === 'top_to_bottom') {
    for (let y = 0; y < mid; y++) {
      for (let x = 0; x < w; x++) {
        const pixel = layer.buffer.getPixel(x, y);
        layer.buffer.setPixel(x, h - 1 - y, pixel);
      }
    }
  } else {
    for (let y = 0; y < mid; y++) {
      for (let x = 0; x < w; x++) {
        const pixel = layer.buffer.getPixel(x, h - 1 - y);
        layer.buffer.setPixel(x, y, pixel);
      }
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return { content: [{ type: 'text' as const, text: `Mirrored "${layer.name}" ${args.direction.replace('_', ' ')}` }] };
}

// ─── shift_pixels ─────────────────────────────────────────────────────
export interface ShiftPixelsArgs {
  projectId: string;
  layer?: string;
  dx: number;
  dy: number;
  wrap?: boolean;
}

export function handleShiftPixels(args: ShiftPixelsArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const w = project.width;
  const h = project.height;
  const dx = Math.round(args.dx);
  const dy = Math.round(args.dy);
  const wrap = args.wrap ?? false;

  const newBuffer = new PixelBuffer(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (pixel.a === 0) continue;
      let nx = x + dx;
      let ny = y + dy;
      if (wrap) {
        nx = ((nx % w) + w) % w;
        ny = ((ny % h) + h) % h;
      }
      newBuffer.setPixel(nx, ny, pixel);
    }
  }

  layer.buffer = newBuffer;
  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return { content: [{ type: 'text' as const, text: `Shifted "${layer.name}" by (${dx}, ${dy})${wrap ? ' with wrap' : ''}` }] };
}

// ─── replace_color ────────────────────────────────────────────────────
export interface ReplaceColorArgs {
  projectId: string;
  layer?: string;
  fromColor: string;
  toColor: string;
}

export function handleReplaceColor(args: ReplaceColorArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const from = hexToRgba(args.fromColor);
  const to = hexToRgba(args.toColor);
  let count = 0;

  for (let y = 0; y < project.height; y++) {
    for (let x = 0; x < project.width; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (rgbaEqual(pixel, from)) {
        layer.buffer.setPixel(x, y, to);
        count++;
      }
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return { content: [{ type: 'text' as const, text: `Replaced ${count} pixels: ${args.fromColor} → ${args.toColor} on "${layer.name}"` }] };
}

// ─── draw_ellipse ─────────────────────────────────────────────────────
export interface DrawEllipseArgs {
  projectId: string;
  layer?: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  color: string;
  filled?: boolean;
}

function midpointEllipsePoints(cx: number, cy: number, rx: number, ry: number): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = [];
  const addSymmetric = (px: number, py: number) => {
    points.push({ x: cx + px, y: cy + py });
    points.push({ x: cx - px, y: cy + py });
    points.push({ x: cx + px, y: cy - py });
    points.push({ x: cx - px, y: cy - py });
  };

  let x = 0;
  let y = ry;
  const rx2 = rx * rx;
  const ry2 = ry * ry;
  let d1 = ry2 - rx2 * ry + 0.25 * rx2;
  let dx = 2 * ry2 * x;
  let dy = 2 * rx2 * y;

  while (dx < dy) {
    addSymmetric(x, y);
    if (d1 < 0) {
      x++;
      dx += 2 * ry2;
      d1 += dx + ry2;
    } else {
      x++;
      y--;
      dx += 2 * ry2;
      dy -= 2 * rx2;
      d1 += dx - dy + ry2;
    }
  }

  let d2 = ry2 * (x + 0.5) * (x + 0.5) + rx2 * (y - 1) * (y - 1) - rx2 * ry2;
  while (y >= 0) {
    addSymmetric(x, y);
    if (d2 > 0) {
      y--;
      dy -= 2 * rx2;
      d2 += rx2 - dy;
    } else {
      y--;
      x++;
      dx += 2 * ry2;
      dy -= 2 * rx2;
      d2 += dx - dy + rx2;
    }
  }

  return points;
}

export function handleDrawEllipse(args: DrawEllipseArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const color = hexToRgba(args.color);
  const cx = Math.round(args.cx);
  const cy = Math.round(args.cy);
  const rx = Math.max(1, Math.round(args.rx));
  const ry = Math.max(1, Math.round(args.ry));
  const filled = args.filled ?? false;

  if (filled) {
    // Scanline fill
    for (let dy = -ry; dy <= ry; dy++) {
      const y = cy + dy;
      // Find x extent at this y
      const xExtent = Math.round(rx * Math.sqrt(1 - (dy * dy) / (ry * ry)));
      for (let dx = -xExtent; dx <= xExtent; dx++) {
        layer.buffer.setPixel(cx + dx, y, color);
      }
    }
  } else {
    const points = midpointEllipsePoints(cx, cy, rx, ry);
    for (const p of points) {
      layer.buffer.setPixel(p.x, p.y, color);
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return { content: [{ type: 'text' as const, text: `Drew ${filled ? 'filled' : 'outline'} ellipse at (${cx},${cy}) r=${rx}x${ry} on "${layer.name}"` }] };
}

// ─── copy_region ──────────────────────────────────────────────────────
export interface CopyRegionArgs {
  projectId: string;
  sourceLayer: string;
  targetLayer: string;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  tx: number;
  ty: number;
}

export function handleCopyRegion(args: CopyRegionArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const srcLayer = project.layers.find(l => l.id === args.sourceLayer);
  const tgtLayer = project.layers.find(l => l.id === args.targetLayer);
  if (!srcLayer) return { content: [{ type: 'text' as const, text: `Error: Source layer not found` }], isError: true };
  if (!tgtLayer) return { content: [{ type: 'text' as const, text: `Error: Target layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: tgtLayer.id, data: new Uint8ClampedArray(tgtLayer.buffer.data) };

  let count = 0;
  for (let dy = 0; dy < args.sh; dy++) {
    for (let dx = 0; dx < args.sw; dx++) {
      const pixel = srcLayer.buffer.getPixel(args.sx + dx, args.sy + dy);
      if (pixel.a > 0) {
        tgtLayer.buffer.setPixel(args.tx + dx, args.ty + dy, pixel);
        count++;
      }
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return { content: [{ type: 'text' as const, text: `Copied ${count} pixels from "${srcLayer.name}" to "${tgtLayer.name}"` }] };
}

// ─── flip_layer ───────────────────────────────────────────────────────
export interface FlipLayerArgs {
  projectId: string;
  layer?: string;
  axis: 'horizontal' | 'vertical';
}

export function handleFlipLayer(args: FlipLayerArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const w = project.width;
  const h = project.height;
  const newBuffer = new PixelBuffer(w, h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (args.axis === 'horizontal') {
        newBuffer.setPixel(w - 1 - x, y, pixel);
      } else {
        newBuffer.setPixel(x, h - 1 - y, pixel);
      }
    }
  }

  layer.buffer = newBuffer;
  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return { content: [{ type: 'text' as const, text: `Flipped "${layer.name}" ${args.axis}ly` }] };
}

// ─── rotate_layer ─────────────────────────────────────────────────────
export interface RotateLayerArgs {
  projectId: string;
  layer?: string;
  angle: 90 | 180 | 270;
}

export function handleRotateLayer(args: RotateLayerArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  // Only works for square canvases on 90/270
  if (args.angle !== 180 && project.width !== project.height) {
    return { content: [{ type: 'text' as const, text: `Error: 90°/270° rotation requires square canvas` }], isError: true };
  }

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const w = project.width;
  const h = project.height;
  const newBuffer = new PixelBuffer(w, h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (args.angle === 90) {
        newBuffer.setPixel(h - 1 - y, x, pixel);
      } else if (args.angle === 180) {
        newBuffer.setPixel(w - 1 - x, h - 1 - y, pixel);
      } else {
        newBuffer.setPixel(y, w - 1 - x, pixel);
      }
    }
  }

  layer.buffer = newBuffer;
  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return { content: [{ type: 'text' as const, text: `Rotated "${layer.name}" ${args.angle}°` }] };
}

// ─── outline_layer ────────────────────────────────────────────────────
export interface OutlineLayerArgs {
  projectId: string;
  sourceLayer: string;
  targetLayer: string;
  color: string;
}

/**
 * Auto-generate an outline on targetLayer from the non-transparent pixels of sourceLayer.
 * For every transparent pixel adjacent to a non-transparent pixel, place the outline color.
 */
export function handleOutlineLayer(args: OutlineLayerArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const srcLayer = project.layers.find(l => l.id === args.sourceLayer);
  const tgtLayer = project.layers.find(l => l.id === args.targetLayer);
  if (!srcLayer) return { content: [{ type: 'text' as const, text: `Error: Source layer not found` }], isError: true };
  if (!tgtLayer) return { content: [{ type: 'text' as const, text: `Error: Target layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: tgtLayer.id, data: new Uint8ClampedArray(tgtLayer.buffer.data) };
  const color = hexToRgba(args.color);
  const w = project.width;
  const h = project.height;
  let count = 0;

  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pixel = srcLayer.buffer.getPixel(x, y);
      if (pixel.a > 0) continue; // skip non-transparent pixels

      // Check if any neighbor is non-transparent
      let hasOpaqueNeighbor = false;
      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
        if (srcLayer.buffer.getPixel(nx, ny).a > 0) {
          hasOpaqueNeighbor = true;
          break;
        }
      }

      if (hasOpaqueNeighbor) {
        tgtLayer.buffer.setPixel(x, y, color);
        count++;
      }
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return { content: [{ type: 'text' as const, text: `Generated ${count} outline pixels on "${tgtLayer.name}" from "${srcLayer.name}"` }] };
}

// ─── auto_shade ───────────────────────────────────────────────────────
export interface AutoShadeArgs {
  projectId: string;
  sourceLayer: string;
  targetLayer: string;
  lightDirection: 'top_left' | 'top_right' | 'top' | 'left';
  intensity?: number; // 0-100, default 30
}

/**
 * Auto-generate shading on targetLayer based on sourceLayer content.
 * Places darkened pixels on edges facing away from light source.
 */
export function handleAutoShade(args: AutoShadeArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const srcLayer = project.layers.find(l => l.id === args.sourceLayer);
  const tgtLayer = project.layers.find(l => l.id === args.targetLayer);
  if (!srcLayer) return { content: [{ type: 'text' as const, text: `Error: Source layer not found` }], isError: true };
  if (!tgtLayer) return { content: [{ type: 'text' as const, text: `Error: Target layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: tgtLayer.id, data: new Uint8ClampedArray(tgtLayer.buffer.data) };
  const w = project.width;
  const h = project.height;
  const intensity = Math.max(10, Math.min(80, args.intensity ?? 30)) / 100;

  // Shadow direction offsets (opposite of light direction)
  let shadowDx = 0, shadowDy = 0;
  switch (args.lightDirection) {
    case 'top_left': shadowDx = 1; shadowDy = 1; break;
    case 'top_right': shadowDx = -1; shadowDy = 1; break;
    case 'top': shadowDx = 0; shadowDy = 1; break;
    case 'left': shadowDx = 1; shadowDy = 0; break;
  }

  let count = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pixel = srcLayer.buffer.getPixel(x, y);
      if (pixel.a === 0) continue;

      // Check if pixel is on the shadow edge (adjacent pixel in shadow direction is transparent or OOB)
      const checkX = x + shadowDx;
      const checkY = y + shadowDy;
      const isEdge = checkX < 0 || checkX >= w || checkY < 0 || checkY >= h ||
        srcLayer.buffer.getPixel(checkX, checkY).a === 0;

      if (!isEdge) continue;

      // Darken the pixel
      const dark: RGBA = {
        r: Math.round(pixel.r * (1 - intensity)),
        g: Math.round(pixel.g * (1 - intensity)),
        b: Math.round(pixel.b * (1 - intensity)),
        a: pixel.a,
      };
      tgtLayer.buffer.setPixel(x, y, dark);
      count++;
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return { content: [{ type: 'text' as const, text: `Generated ${count} shadow pixels on "${tgtLayer.name}" (light: ${args.lightDirection}, intensity: ${Math.round(intensity * 100)}%)` }] };
}

// ─── auto_highlight ───────────────────────────────────────────────────
export interface AutoHighlightArgs {
  projectId: string;
  sourceLayer: string;
  targetLayer: string;
  lightDirection: 'top_left' | 'top_right' | 'top' | 'left';
  intensity?: number; // 0-100, default 25
}

export function handleAutoHighlight(args: AutoHighlightArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const srcLayer = project.layers.find(l => l.id === args.sourceLayer);
  const tgtLayer = project.layers.find(l => l.id === args.targetLayer);
  if (!srcLayer) return { content: [{ type: 'text' as const, text: `Error: Source layer not found` }], isError: true };
  if (!tgtLayer) return { content: [{ type: 'text' as const, text: `Error: Target layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: tgtLayer.id, data: new Uint8ClampedArray(tgtLayer.buffer.data) };
  const w = project.width;
  const h = project.height;
  const intensity = Math.max(10, Math.min(80, args.intensity ?? 25)) / 100;

  // Light direction offsets (toward light)
  let lightDx = 0, lightDy = 0;
  switch (args.lightDirection) {
    case 'top_left': lightDx = -1; lightDy = -1; break;
    case 'top_right': lightDx = 1; lightDy = -1; break;
    case 'top': lightDx = 0; lightDy = -1; break;
    case 'left': lightDx = -1; lightDy = 0; break;
  }

  let count = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pixel = srcLayer.buffer.getPixel(x, y);
      if (pixel.a === 0) continue;

      const checkX = x + lightDx;
      const checkY = y + lightDy;
      const isEdge = checkX < 0 || checkX >= w || checkY < 0 || checkY >= h ||
        srcLayer.buffer.getPixel(checkX, checkY).a === 0;

      if (!isEdge) continue;

      const bright: RGBA = {
        r: Math.min(255, Math.round(pixel.r + (255 - pixel.r) * intensity)),
        g: Math.min(255, Math.round(pixel.g + (255 - pixel.g) * intensity)),
        b: Math.min(255, Math.round(pixel.b + (255 - pixel.b) * intensity)),
        a: pixel.a,
      };
      tgtLayer.buffer.setPixel(x, y, bright);
      count++;
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return { content: [{ type: 'text' as const, text: `Generated ${count} highlight pixels on "${tgtLayer.name}" (light: ${args.lightDirection}, intensity: ${Math.round(intensity * 100)}%)` }] };
}
