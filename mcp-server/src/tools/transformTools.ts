/**
 * Transform & advanced utility tools:
 * - Sprite resize (nearest-neighbor scale)
 * - Crop to content (trim transparent edges)
 * - Tile repeat (repeat sprite in grid pattern)
 * - Color swap (swap two colors)
 * - Hue/Saturation/Brightness adjust
 * - Invert colors
 * - Merge layers (flatten visible layers)
 * - Stamp layer (paste one layer onto another at offset)
 * - Nine-slice info (detect border/corner/center for UI scaling)
 */

import { getProject, getLayer, addLayer, pushUndo, type UndoEntry, type McpProject } from '../project.js';
import { PixelBuffer, type RGBA } from '../lib/pixelBuffer.js';
import { hexToRgba, rgbaToHex, rgbaEqual } from '../lib/colorUtils.js';

// ═══════════════════════════════════════════════════════════════
// RESIZE SPRITE (nearest-neighbor)
// ═══════════════════════════════════════════════════════════════

export interface ResizeSpriteArgs {
  projectId: string;
  newWidth: number;
  newHeight: number;
}

export function handleResizeSprite(args: ResizeSpriteArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const nw = Math.max(1, Math.min(256, args.newWidth));
  const nh = Math.max(1, Math.min(256, args.newHeight));
  const ow = project.width;
  const oh = project.height;

  // Resize each layer
  for (const layer of project.layers) {
    const oldBuffer = layer.buffer;
    const newBuffer = new PixelBuffer(nw, nh);

    for (let y = 0; y < nh; y++) {
      for (let x = 0; x < nw; x++) {
        const srcX = Math.floor(x * ow / nw);
        const srcY = Math.floor(y * oh / nh);
        const pixel = oldBuffer.getPixel(srcX, srcY);
        if (pixel.a > 0) newBuffer.setPixel(x, y, pixel);
      }
    }

    layer.buffer = newBuffer;
  }

  project.width = nw;
  project.height = nh;
  project.updatedAt = Date.now();

  return {
    content: [{
      type: 'text' as const,
      text: `Resized from ${ow}x${oh} to ${nw}x${nh} (nearest-neighbor). ${project.layers.length} layers updated.`,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// CROP TO CONTENT (trim transparent edges)
// ═══════════════════════════════════════════════════════════════

export interface CropToContentArgs {
  projectId: string;
  padding?: number; // extra pixels of padding to keep (default: 0)
}

export function handleCropToContent(args: CropToContentArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const w = project.width;
  const h = project.height;
  const pad = Math.max(0, Math.min(8, args.padding ?? 0));

  // Find content bounds across ALL layers
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (const layer of project.layers) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (layer.buffer.getPixel(x, y).a > 0) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }
  }

  if (maxX < 0) {
    return { content: [{ type: 'text' as const, text: `All layers are empty, nothing to crop.` }] };
  }

  // Apply padding
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);

  const nw = maxX - minX + 1;
  const nh = maxY - minY + 1;

  if (nw === w && nh === h) {
    return { content: [{ type: 'text' as const, text: `No transparent edges to crop.` }] };
  }

  // Crop each layer
  for (const layer of project.layers) {
    const oldBuffer = layer.buffer;
    const newBuffer = new PixelBuffer(nw, nh);

    for (let y = 0; y < nh; y++) {
      for (let x = 0; x < nw; x++) {
        const pixel = oldBuffer.getPixel(x + minX, y + minY);
        if (pixel.a > 0) newBuffer.setPixel(x, y, pixel);
      }
    }
    layer.buffer = newBuffer;
  }

  project.width = nw;
  project.height = nh;
  project.updatedAt = Date.now();

  return {
    content: [{
      type: 'text' as const,
      text: `Cropped from ${w}x${h} to ${nw}x${nh}. Trimmed region: (${minX},${minY}) to (${maxX},${maxY}).`,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// TILE REPEAT (repeat sprite in grid)
// ═══════════════════════════════════════════════════════════════

export interface TileRepeatArgs {
  projectId: string;
  layer?: string;
  repeatX: number; // 2-8
  repeatY: number; // 2-8
  targetLayer: string; // layer name to write tiled result
}

export function handleTileRepeat(args: TileRepeatArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const source = getLayer(project, args.layer);
  if (!source) return { content: [{ type: 'text' as const, text: `Error: Source layer not found` }], isError: true };

  let target = project.layers.find(l => l.name === args.targetLayer || l.id === args.targetLayer);
  if (!target) target = addLayer(project, args.targetLayer);
  else target.buffer.clear();

  const w = project.width;
  const h = project.height;
  const rx = Math.max(1, Math.min(8, args.repeatX));
  const ry = Math.max(1, Math.min(8, args.repeatY));
  let count = 0;

  for (let ty = 0; ty < ry; ty++) {
    for (let tx = 0; tx < rx; tx++) {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const pixel = source.buffer.getPixel(x, y);
          if (pixel.a === 0) continue;
          const destX = x + tx * w;
          const destY = y + ty * h;
          // Only draw within current canvas bounds
          if (destX < w && destY < h) {
            // For tiling preview within same canvas, we modulo-wrap
            target.buffer.setPixel(destX % w, destY % h, pixel);
            count++;
          }
        }
      }
    }
  }

  project.updatedAt = Date.now();
  return {
    content: [{
      type: 'text' as const,
      text: `Tiled ${rx}x${ry} on layer "${target.name}". ${count} pixels written. Note: tiling is wrapped to ${w}x${h} canvas. For full tiled export, create a larger project first.`,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// COLOR SWAP (swap two colors on layer)
// ═══════════════════════════════════════════════════════════════

export interface ColorSwapArgs {
  projectId: string;
  layer?: string;
  colorA: string;
  colorB: string;
}

export function handleColorSwap(args: ColorSwapArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const a = hexToRgba(args.colorA);
  const b = hexToRgba(args.colorB);
  let swapped = 0;

  for (let y = 0; y < project.height; y++) {
    for (let x = 0; x < project.width; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (pixel.a === 0) continue;
      if (rgbaEqual(pixel, a)) {
        layer.buffer.setPixel(x, y, b);
        swapped++;
      } else if (rgbaEqual(pixel, b)) {
        layer.buffer.setPixel(x, y, a);
        swapped++;
      }
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return {
    content: [{
      type: 'text' as const,
      text: `Swapped ${args.colorA} <-> ${args.colorB}: ${swapped} pixels changed.`,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// HSB ADJUST (Hue/Saturation/Brightness)
// ═══════════════════════════════════════════════════════════════

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1/3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1/3) * 255),
  ];
}

export interface HsbAdjustArgs {
  projectId: string;
  layer?: string;
  hueShift?: number;         // -180 to 180 degrees
  saturationShift?: number;  // -100 to 100
  brightnessShift?: number;  // -100 to 100
}

export function handleHsbAdjust(args: HsbAdjustArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const hShift = args.hueShift ?? 0;
  const sShift = args.saturationShift ?? 0;
  const bShift = args.brightnessShift ?? 0;
  let count = 0;

  for (let y = 0; y < project.height; y++) {
    for (let x = 0; x < project.width; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (pixel.a === 0) continue;

      let [h, s, l] = rgbToHsl(pixel.r, pixel.g, pixel.b);
      h = ((h + hShift) % 360 + 360) % 360;
      s = Math.max(0, Math.min(100, s + sShift));
      l = Math.max(0, Math.min(100, l + bShift));

      const [r, g, b] = hslToRgb(h, s, l);
      layer.buffer.setPixel(x, y, { r, g, b, a: pixel.a });
      count++;
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return {
    content: [{
      type: 'text' as const,
      text: `HSB adjusted ${count} pixels: hue ${hShift > 0 ? '+' : ''}${hShift}°, sat ${sShift > 0 ? '+' : ''}${sShift}, bright ${bShift > 0 ? '+' : ''}${bShift}`,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// INVERT COLORS
// ═══════════════════════════════════════════════════════════════

export interface InvertColorsArgs {
  projectId: string;
  layer?: string;
}

export function handleInvertColors(args: InvertColorsArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  let count = 0;

  for (let y = 0; y < project.height; y++) {
    for (let x = 0; x < project.width; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (pixel.a === 0) continue;
      layer.buffer.setPixel(x, y, {
        r: 255 - pixel.r,
        g: 255 - pixel.g,
        b: 255 - pixel.b,
        a: pixel.a,
      });
      count++;
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return {
    content: [{
      type: 'text' as const,
      text: `Inverted ${count} pixels.`,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// MERGE LAYERS (flatten visible into one)
// ═══════════════════════════════════════════════════════════════

export interface MergeLayersArgs {
  projectId: string;
  layerIds?: string[];  // specific layers to merge (default: all visible)
  targetName?: string;  // name for merged layer (default: "merged")
}

export function handleMergeLayers(args: MergeLayersArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const w = project.width;
  const h = project.height;
  const merged = new PixelBuffer(w, h);

  // Select layers to merge
  const layersToMerge = args.layerIds
    ? project.layers.filter(l => args.layerIds!.includes(l.id) || args.layerIds!.includes(l.name))
    : project.layers.filter(l => l.visible);

  if (layersToMerge.length === 0) {
    return { content: [{ type: 'text' as const, text: `No layers to merge.` }] };
  }

  // Composite bottom-up (simple over blend)
  for (const layer of layersToMerge) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const src = layer.buffer.getPixel(x, y);
        if (src.a === 0) continue;

        const dst = merged.getPixel(x, y);
        if (dst.a === 0) {
          merged.setPixel(x, y, src);
        } else {
          // Alpha compositing (source over)
          const srcA = src.a / 255;
          const dstA = dst.a / 255;
          const outA = srcA + dstA * (1 - srcA);
          if (outA > 0) {
            merged.setPixel(x, y, {
              r: Math.round((src.r * srcA + dst.r * dstA * (1 - srcA)) / outA),
              g: Math.round((src.g * srcA + dst.g * dstA * (1 - srcA)) / outA),
              b: Math.round((src.b * srcA + dst.b * dstA * (1 - srcA)) / outA),
              a: Math.round(outA * 255),
            });
          }
        }
      }
    }
  }

  // Create merged layer
  const targetName = args.targetName ?? 'merged';
  let targetLayer = project.layers.find(l => l.name === targetName);
  if (!targetLayer) targetLayer = addLayer(project, targetName);
  else targetLayer.buffer.clear();

  targetLayer.buffer.data.set(merged.data);

  project.updatedAt = Date.now();
  return {
    content: [{
      type: 'text' as const,
      text: JSON.stringify({
        mergedLayers: layersToMerge.map(l => l.name),
        targetLayer: targetLayer.name,
        targetLayerId: targetLayer.id,
      }, null, 2),
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// STAMP LAYER (paste one layer onto another with offset)
// ═══════════════════════════════════════════════════════════════

export interface StampLayerArgs {
  projectId: string;
  sourceLayer: string;
  targetLayer: string;
  offsetX?: number;
  offsetY?: number;
  blendMode?: 'over' | 'replace'; // default: over
}

export function handleStampLayer(args: StampLayerArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const source = project.layers.find(l => l.id === args.sourceLayer || l.name === args.sourceLayer);
  const target = project.layers.find(l => l.id === args.targetLayer || l.name === args.targetLayer);
  if (!source) return { content: [{ type: 'text' as const, text: `Error: Source layer not found` }], isError: true };
  if (!target) return { content: [{ type: 'text' as const, text: `Error: Target layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: target.id, data: new Uint8ClampedArray(target.buffer.data) };
  const ox = args.offsetX ?? 0;
  const oy = args.offsetY ?? 0;
  const blend = args.blendMode ?? 'over';
  let count = 0;

  for (let y = 0; y < project.height; y++) {
    for (let x = 0; x < project.width; x++) {
      const src = source.buffer.getPixel(x, y);
      if (src.a === 0) continue;

      const tx = x + ox;
      const ty = y + oy;
      if (tx < 0 || tx >= project.width || ty < 0 || ty >= project.height) continue;

      if (blend === 'replace') {
        target.buffer.setPixel(tx, ty, src);
      } else {
        // Alpha compositing
        const dst = target.buffer.getPixel(tx, ty);
        if (dst.a === 0) {
          target.buffer.setPixel(tx, ty, src);
        } else {
          const srcA = src.a / 255;
          const dstA = dst.a / 255;
          const outA = srcA + dstA * (1 - srcA);
          if (outA > 0) {
            target.buffer.setPixel(tx, ty, {
              r: Math.round((src.r * srcA + dst.r * dstA * (1 - srcA)) / outA),
              g: Math.round((src.g * srcA + dst.g * dstA * (1 - srcA)) / outA),
              b: Math.round((src.b * srcA + dst.b * dstA * (1 - srcA)) / outA),
              a: Math.round(outA * 255),
            });
          }
        }
      }
      count++;
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return {
    content: [{
      type: 'text' as const,
      text: `Stamped ${count} pixels from "${source.name}" to "${target.name}" at offset (${ox}, ${oy}), mode: ${blend}`,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// ANALYZE SPRITE (gather statistics)
// ═══════════════════════════════════════════════════════════════

export interface AnalyzeSpriteArgs {
  projectId: string;
  layer?: string;
}

export function handleAnalyzeSprite(args: AnalyzeSpriteArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const w = project.width;
  const h = project.height;

  // Bounding box
  let minX = w, minY = h, maxX = -1, maxY = -1;
  let pixelCount = 0;
  const colorCounts = new Map<string, number>();

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (pixel.a === 0) continue;
      pixelCount++;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      const hex = rgbaToHex(pixel);
      colorCounts.set(hex, (colorCounts.get(hex) ?? 0) + 1);
    }
  }

  if (pixelCount === 0) {
    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({ empty: true, layer: layer.name, size: `${w}x${h}` }, null, 2),
      }],
    };
  }

  // Sort colors by frequency
  const sortedColors = [...colorCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([color, count]) => ({ color, count, pct: Math.round(count / pixelCount * 100) }));

  return {
    content: [{
      type: 'text' as const,
      text: JSON.stringify({
        layer: layer.name,
        size: `${w}x${h}`,
        pixelCount,
        fillPercentage: Math.round(pixelCount / (w * h) * 100),
        boundingBox: { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 },
        uniqueColors: colorCounts.size,
        colorBreakdown: sortedColors.slice(0, 16), // top 16 colors
        totalColors: sortedColors.length,
      }, null, 2),
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// PALETTE EXTRACT (get all unique colors from layer)
// ═══════════════════════════════════════════════════════════════

export interface PaletteExtractArgs {
  projectId: string;
  layer?: string;
  sortBy?: 'frequency' | 'hue' | 'lightness';
}

export function handlePaletteExtract(args: PaletteExtractArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const colorCounts = new Map<string, { color: RGBA; count: number }>();

  for (let y = 0; y < project.height; y++) {
    for (let x = 0; x < project.width; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (pixel.a === 0) continue;
      const hex = rgbaToHex(pixel);
      const entry = colorCounts.get(hex);
      if (entry) entry.count++;
      else colorCounts.set(hex, { color: { ...pixel }, count: 1 });
    }
  }

  const entries = [...colorCounts.entries()];
  const sortBy = args.sortBy ?? 'frequency';

  switch (sortBy) {
    case 'frequency':
      entries.sort((a, b) => b[1].count - a[1].count);
      break;
    case 'hue': {
      entries.sort((a, b) => {
        const [hA] = rgbToHsl(a[1].color.r, a[1].color.g, a[1].color.b);
        const [hB] = rgbToHsl(b[1].color.r, b[1].color.g, b[1].color.b);
        return hA - hB;
      });
      break;
    }
    case 'lightness': {
      entries.sort((a, b) => {
        const [, , lA] = rgbToHsl(a[1].color.r, a[1].color.g, a[1].color.b);
        const [, , lB] = rgbToHsl(b[1].color.r, b[1].color.g, b[1].color.b);
        return lA - lB;
      });
      break;
    }
  }

  const palette = entries.map(([hex, { count }]) => ({ hex, count }));

  return {
    content: [{
      type: 'text' as const,
      text: JSON.stringify({
        totalColors: palette.length,
        sortedBy: sortBy,
        colors: palette,
        hexArray: palette.map(p => p.hex),
        hint: 'Use set_palette with this hexArray, or use individual colors with replace_color.',
      }, null, 2),
    }],
  };
}
