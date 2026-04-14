/**
 * Advanced pixel art tools:
 * - Dithering (checkerboard, Bayer 2x2/4x4, custom patterns)
 * - Color ramp generator (hue-shifted palette ramps)
 * - Walk cycle generator (4-frame animation from standing pose)
 * - Anti-alias edges
 * - Palette reduction (quantize to N colors)
 */

import { getProject, getLayer, addLayer, pushUndo, type UndoEntry, type McpProject } from '../project.js';
import { PixelBuffer, type RGBA } from '../lib/pixelBuffer.js';
import { hexToRgba, rgbaToHex, rgbaEqual } from '../lib/colorUtils.js';

// ═══════════════════════════════════════════════════════════════
// DITHERING TOOL
// ═══════════════════════════════════════════════════════════════

// Standard Bayer dithering matrices (normalized 0-1)
const BAYER_2X2 = [
  [0.00, 0.50],
  [0.75, 0.25],
];

const BAYER_4X4 = [
  [0.000, 0.500, 0.125, 0.625],
  [0.750, 0.250, 0.875, 0.375],
  [0.188, 0.688, 0.063, 0.563],
  [0.938, 0.438, 0.813, 0.313],
];

export interface DitherArgs {
  projectId: string;
  layer?: string;
  color1: string;
  color2: string;
  pattern: 'checkerboard' | 'bayer2x2' | 'bayer4x4' | 'horizontal_lines' | 'vertical_lines' | 'diagonal';
  region?: { x: number; y: number; w: number; h: number };
  mix?: number; // 0-100, controls threshold for bayer dithering (default: 50)
}

export function handleDither(args: DitherArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };

  const c1 = hexToRgba(args.color1);
  const c2 = hexToRgba(args.color2);
  const mix = (args.mix ?? 50) / 100;

  const rx = args.region?.x ?? 0;
  const ry = args.region?.y ?? 0;
  const rw = args.region?.w ?? project.width;
  const rh = args.region?.h ?? project.height;
  let count = 0;

  for (let y = ry; y < ry + rh && y < project.height; y++) {
    for (let x = rx; x < rx + rw && x < project.width; x++) {
      let useColor1: boolean;

      switch (args.pattern) {
        case 'checkerboard':
          useColor1 = (x + y) % 2 === 0;
          break;
        case 'bayer2x2': {
          const threshold = BAYER_2X2[y % 2][x % 2];
          useColor1 = mix > threshold;
          break;
        }
        case 'bayer4x4': {
          const threshold = BAYER_4X4[y % 4][x % 4];
          useColor1 = mix > threshold;
          break;
        }
        case 'horizontal_lines':
          useColor1 = y % 2 === 0;
          break;
        case 'vertical_lines':
          useColor1 = x % 2 === 0;
          break;
        case 'diagonal':
          useColor1 = (x + y) % 3 !== 0;
          break;
        default:
          useColor1 = (x + y) % 2 === 0;
      }

      layer.buffer.setPixel(x, y, useColor1 ? c1 : c2);
      count++;
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return {
    content: [{
      type: 'text' as const,
      text: `Applied ${args.pattern} dithering: ${count} pixels. Colors: ${args.color1} / ${args.color2}`,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// DITHER OVER EXISTING - Apply dither blend to existing pixels
// ═══════════════════════════════════════════════════════════════
export interface DitherOverArgs {
  projectId: string;
  layer?: string;
  blendColor: string;
  pattern: 'checkerboard' | 'bayer2x2' | 'bayer4x4';
  mix?: number; // 0-100 blend threshold (default: 50)
}

export function handleDitherOver(args: DitherOverArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const blend = hexToRgba(args.blendColor);
  const mix = (args.mix ?? 50) / 100;
  let count = 0;

  for (let y = 0; y < project.height; y++) {
    for (let x = 0; x < project.width; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (pixel.a === 0) continue;

      let shouldBlend: boolean;
      switch (args.pattern) {
        case 'checkerboard':
          shouldBlend = (x + y) % 2 === 0;
          break;
        case 'bayer2x2':
          shouldBlend = mix > BAYER_2X2[y % 2][x % 2];
          break;
        case 'bayer4x4':
          shouldBlend = mix > BAYER_4X4[y % 4][x % 4];
          break;
        default:
          shouldBlend = (x + y) % 2 === 0;
      }

      if (shouldBlend) {
        layer.buffer.setPixel(x, y, blend);
        count++;
      }
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();
  return {
    content: [{
      type: 'text' as const,
      text: `Dither-blended ${count} pixels with ${args.blendColor} using ${args.pattern}`,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// COLOR RAMP GENERATOR
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

export interface ColorRampArgs {
  startColor: string;
  endColor: string;
  steps: number; // 3-16
  hueShift?: 'none' | 'warm_highlights' | 'cool_shadows' | 'full'; // default: full
}

export function handleColorRamp(args: ColorRampArgs) {
  const steps = Math.max(3, Math.min(16, args.steps));
  const c1 = hexToRgba(args.startColor);
  const c2 = hexToRgba(args.endColor);
  const mode = args.hueShift ?? 'full';

  const [h1, s1, l1] = rgbToHsl(c1.r, c1.g, c1.b);
  const [h2, s2, l2] = rgbToHsl(c2.r, c2.g, c2.b);

  const ramp: string[] = [];

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);

    let h: number, s: number, l: number;

    if (mode === 'none') {
      // Simple RGB interpolation
      const r = Math.round(c1.r + (c2.r - c1.r) * t);
      const g = Math.round(c1.g + (c2.g - c1.g) * t);
      const b = Math.round(c1.b + (c2.b - c1.b) * t);
      ramp.push(rgbaToHex({ r, g, b, a: 255 }));
      continue;
    }

    // HSL interpolation with optional hue shift
    l = l1 + (l2 - l1) * t;
    s = s1 + (s2 - s1) * t;

    // Hue interpolation: shortest path
    let hDiff = h2 - h1;
    if (hDiff > 180) hDiff -= 360;
    if (hDiff < -180) hDiff += 360;
    h = h1 + hDiff * t;

    // Professional hue-shifting: shadows cooler, highlights warmer
    if (mode === 'warm_highlights' || mode === 'full') {
      // Shift highlights toward yellow/warm (+15-20 deg)
      if (t > 0.5) {
        h += (t - 0.5) * 30;
      }
    }
    if (mode === 'cool_shadows' || mode === 'full') {
      // Shift shadows toward blue/cool (-15-20 deg)
      if (t < 0.5) {
        h -= (0.5 - t) * 30;
      }
    }

    // Saturation peaks at midtones
    if (mode === 'full') {
      const satBoost = 1 + 0.15 * Math.sin(t * Math.PI);
      s *= satBoost;
    }

    // Normalize
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(100, s));
    l = Math.max(0, Math.min(100, l));

    const [r, g, b] = hslToRgb(h, s, l);
    ramp.push(rgbaToHex({ r, g, b, a: 255 }));
  }

  return {
    content: [{
      type: 'text' as const,
      text: JSON.stringify({
        ramp,
        steps,
        hueShiftMode: mode,
        from: args.startColor,
        to: args.endColor,
        hint: 'Use set_palette to apply this ramp, or use individual colors with set_pixels/replace_color.',
      }, null, 2),
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// WALK CYCLE GENERATOR
// Auto-generate 4-frame walk animation from a standing sprite.
// Creates 4 layers representing walk frames.
// ═══════════════════════════════════════════════════════════════

export interface WalkCycleArgs {
  projectId: string;
  sourceLayer?: string;
  amplitude?: number; // leg swing in pixels (default: 2)
  bob?: number;       // vertical bounce in pixels (default: 1)
}

export function handleWalkCycle(args: WalkCycleArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const source = getLayer(project, args.sourceLayer);
  if (!source) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const w = project.width;
  const h = project.height;
  const amp = args.amplitude ?? 2;
  const bob = args.bob ?? 1;

  // Analyze sprite: find bounding box and center
  let minY = h, maxY = 0, minX = w, maxX = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (source.buffer.getPixel(x, y).a > 0) {
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      }
    }
  }

  if (minY >= maxY) {
    return { content: [{ type: 'text' as const, text: `Error: Source layer is empty` }], isError: true };
  }

  const spriteH = maxY - minY + 1;
  const centerX = Math.floor((minX + maxX) / 2);
  const midBody = minY + Math.floor(spriteH * 0.65); // hip line ~65% down

  // Create 4 walk frame layers
  const frameNames = ['walk_frame_1', 'walk_frame_2', 'walk_frame_3', 'walk_frame_4'];
  const frameLayers = frameNames.map(name => {
    let existing = project.layers.find(l => l.name === name);
    if (!existing) existing = addLayer(project, name);
    else existing.buffer.clear();
    return existing;
  });

  // Frame transformations:
  // Frame 1: Contact right (right leg forward, left back, bob down)
  // Frame 2: Passing (legs center, bob up)
  // Frame 3: Contact left (left forward, right back, bob down)
  // Frame 4: Passing (legs center, bob up) - mirror of 2
  const transforms = [
    { legShiftR: amp, legShiftL: -amp, bodyBob: bob, label: 'right contact' },
    { legShiftR: 0, legShiftL: 0, bodyBob: -bob, label: 'passing' },
    { legShiftR: -amp, legShiftL: amp, bodyBob: bob, label: 'left contact' },
    { legShiftR: 0, legShiftL: 0, bodyBob: -bob, label: 'passing' },
  ];

  for (let f = 0; f < 4; f++) {
    const tf = transforms[f];
    const target = frameLayers[f];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const pixel = source.buffer.getPixel(x, y);
        if (pixel.a === 0) continue;

        let newX = x;
        let newY = y;

        if (y >= midBody) {
          // Lower body: shift legs
          const isLeftSide = x < centerX;
          newX = x + (isLeftSide ? tf.legShiftL : tf.legShiftR);
        }

        // Apply bob to upper body
        if (y < midBody) {
          newY = y + tf.bodyBob;
        }

        // Bounds check
        if (newX >= 0 && newX < w && newY >= 0 && newY < h) {
          target.buffer.setPixel(newX, newY, pixel);
        }
      }
    }
  }

  project.updatedAt = Date.now();

  return {
    content: [{
      type: 'text' as const,
      text: JSON.stringify({
        framesGenerated: 4,
        layers: frameLayers.map(l => ({ id: l.id, name: l.name })),
        transforms: transforms.map(t => t.label),
        amplitude: amp,
        bob,
        hint: 'Each walk frame is on its own layer. Toggle visibility to see animation. Use get_preview on each layer for visual review.',
      }, null, 2),
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// ANTI-ALIAS EDGES
// Smooth jagged edges by adding intermediate color pixels
// ═══════════════════════════════════════════════════════════════

export interface AntiAliasArgs {
  projectId: string;
  layer?: string;
  strength?: number; // 1-3, how many levels of AA (default: 1)
}

export function handleAntiAlias(args: AntiAliasArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const w = project.width;
  const h = project.height;
  const strength = Math.max(1, Math.min(3, args.strength ?? 1));

  // Create a copy to read from while writing
  const original = new PixelBuffer(w, h);
  original.data.set(layer.buffer.data);

  let count = 0;

  // Find diagonal edge pixels and smooth them
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const center = original.getPixel(x, y);
      if (center.a === 0) continue;

      // Check if this is a corner/staircase pixel
      // Look for L-shaped patterns that indicate jaggies
      const top = original.getPixel(x, y - 1);
      const bot = original.getPixel(x, y + 1);
      const left = original.getPixel(x - 1, y);
      const right = original.getPixel(x + 1, y);
      const tl = original.getPixel(x - 1, y - 1);
      const tr = original.getPixel(x + 1, y - 1);
      const bl = original.getPixel(x - 1, y + 1);
      const br = original.getPixel(x + 1, y + 1);

      // Detect corner patterns where AA would help
      const isCorner =
        (top.a === 0 && left.a === 0 && br.a > 0) ||
        (top.a === 0 && right.a === 0 && bl.a > 0) ||
        (bot.a === 0 && left.a === 0 && tr.a > 0) ||
        (bot.a === 0 && right.a === 0 && tl.a > 0);

      if (!isCorner) continue;

      // Reduce alpha at corners to create intermediate blend
      const newAlpha = Math.round(center.a * (1 - 0.25 * strength));
      layer.buffer.setPixel(x, y, {
        r: center.r,
        g: center.g,
        b: center.b,
        a: Math.max(64, newAlpha),
      });
      count++;
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();

  return {
    content: [{
      type: 'text' as const,
      text: `Anti-aliased ${count} edge pixels (strength: ${strength})`,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// PALETTE REDUCTION / QUANTIZE
// Reduce sprite colors to N most-used colors
// ═══════════════════════════════════════════════════════════════

export interface PaletteReduceArgs {
  projectId: string;
  layer?: string;
  maxColors: number; // 2-64
  dither?: boolean;  // apply dithering during reduction (default: false)
}

export function handlePaletteReduce(args: PaletteReduceArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };
  const w = project.width;
  const h = project.height;
  const maxColors = Math.max(2, Math.min(64, args.maxColors));

  // Count color frequencies
  const colorCounts = new Map<string, { color: RGBA; count: number }>();
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (pixel.a === 0) continue;
      const key = rgbaToHex(pixel);
      const entry = colorCounts.get(key);
      if (entry) entry.count++;
      else colorCounts.set(key, { color: { ...pixel }, count: 1 });
    }
  }

  // If already within limit, nothing to do
  if (colorCounts.size <= maxColors) {
    return {
      content: [{
        type: 'text' as const,
        text: `Already at ${colorCounts.size} colors (max: ${maxColors}). No reduction needed.`,
      }],
    };
  }

  // Keep the N most frequent colors
  const sorted = [...colorCounts.values()].sort((a, b) => b.count - a.count);
  const palette = sorted.slice(0, maxColors).map(e => e.color);

  // Map every pixel to nearest palette color
  let replaced = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pixel = layer.buffer.getPixel(x, y);
      if (pixel.a === 0) continue;

      // Find nearest palette color (RGB Euclidean distance)
      let bestDist = Infinity;
      let bestColor = palette[0];
      for (const pc of palette) {
        const dr = pixel.r - pc.r;
        const dg = pixel.g - pc.g;
        const db = pixel.b - pc.b;
        const dist = dr * dr + dg * dg + db * db;
        if (dist < bestDist) {
          bestDist = dist;
          bestColor = pc;
        }
      }

      if (!rgbaEqual(pixel, bestColor)) {
        // Optional ordered dithering
        if (args.dither) {
          const threshold = BAYER_2X2[y % 2][x % 2];
          const dist = Math.sqrt(bestDist);
          if (dist > 30 && threshold > 0.5) {
            // For large color jumps, use 2nd closest color sometimes
            let secondBest = palette[0];
            let secondDist = Infinity;
            for (const pc of palette) {
              if (rgbaEqual(pc, bestColor)) continue;
              const dr = pixel.r - pc.r;
              const dg = pixel.g - pc.g;
              const db = pixel.b - pc.b;
              const d = dr * dr + dg * dg + db * db;
              if (d < secondDist) {
                secondDist = d;
                secondBest = pc;
              }
            }
            layer.buffer.setPixel(x, y, secondBest);
          } else {
            layer.buffer.setPixel(x, y, bestColor);
          }
        } else {
          layer.buffer.setPixel(x, y, bestColor);
        }
        replaced++;
      }
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();

  const resultPalette = palette.map(c => rgbaToHex(c));
  return {
    content: [{
      type: 'text' as const,
      text: JSON.stringify({
        originalColors: colorCounts.size,
        reducedTo: maxColors,
        pixelsChanged: replaced,
        palette: resultPalette,
        dithered: args.dither ?? false,
      }, null, 2),
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// GRADIENT FILL
// ═══════════════════════════════════════════════════════════════

export interface GradientFillArgs {
  projectId: string;
  layer?: string;
  color1: string;
  color2: string;
  direction: 'horizontal' | 'vertical' | 'diagonal';
  region?: { x: number; y: number; w: number; h: number };
  dither?: boolean; // use dithering between gradient steps (default: true)
}

export function handleGradientFill(args: GradientFillArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const layer = getLayer(project, args.layer);
  if (!layer) return { content: [{ type: 'text' as const, text: `Error: Layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) };

  const c1 = hexToRgba(args.color1);
  const c2 = hexToRgba(args.color2);
  const dither = args.dither !== false;

  const rx = args.region?.x ?? 0;
  const ry = args.region?.y ?? 0;
  const rw = args.region?.w ?? project.width;
  const rh = args.region?.h ?? project.height;
  let count = 0;

  for (let y = ry; y < ry + rh && y < project.height; y++) {
    for (let x = rx; x < rx + rw && x < project.width; x++) {
      let t: number;
      switch (args.direction) {
        case 'horizontal':
          t = rw > 1 ? (x - rx) / (rw - 1) : 0;
          break;
        case 'vertical':
          t = rh > 1 ? (y - ry) / (rh - 1) : 0;
          break;
        case 'diagonal':
          t = (rw + rh) > 2 ? ((x - rx) + (y - ry)) / ((rw - 1) + (rh - 1)) : 0;
          break;
      }

      // Add dithering noise
      if (dither) {
        const ditherNoise = BAYER_4X4[y % 4][x % 4] - 0.5;
        t = Math.max(0, Math.min(1, t + ditherNoise * (1 / Math.max(rw, rh))));
      }

      const color: RGBA = {
        r: Math.round(c1.r + (c2.r - c1.r) * t),
        g: Math.round(c1.g + (c2.g - c1.g) * t),
        b: Math.round(c1.b + (c2.b - c1.b) * t),
        a: Math.round(c1.a + (c2.a - c1.a) * t),
      };

      layer.buffer.setPixel(x, y, color);
      count++;
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();

  return {
    content: [{
      type: 'text' as const,
      text: `Gradient fill (${args.direction}): ${count} pixels. ${args.color1} → ${args.color2}${dither ? ' (dithered)' : ''}`,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════
// DROP SHADOW
// Add a directional shadow behind the sprite
// ═══════════════════════════════════════════════════════════════

export interface DropShadowArgs {
  projectId: string;
  sourceLayer: string;
  targetLayer: string;
  offsetX?: number; // default: 1
  offsetY?: number; // default: 1
  color?: string;   // default: #140c1c (near-black)
  opacity?: number;  // 0-255 (default: 128)
}

export function handleDropShadow(args: DropShadowArgs) {
  const project = getProject(args.projectId);
  if (!project) return { content: [{ type: 'text' as const, text: `Error: Project not found` }], isError: true };

  const source = project.layers.find(l => l.id === args.sourceLayer || l.name === args.sourceLayer);
  const target = project.layers.find(l => l.id === args.targetLayer || l.name === args.targetLayer);
  if (!source) return { content: [{ type: 'text' as const, text: `Error: Source layer not found` }], isError: true };
  if (!target) return { content: [{ type: 'text' as const, text: `Error: Target layer not found` }], isError: true };

  const undo: UndoEntry = { layerId: target.id, data: new Uint8ClampedArray(target.buffer.data) };
  const ox = args.offsetX ?? 1;
  const oy = args.offsetY ?? 1;
  const shadowColor = hexToRgba(args.color ?? '#140c1c');
  shadowColor.a = args.opacity ?? 128;
  let count = 0;

  for (let y = 0; y < project.height; y++) {
    for (let x = 0; x < project.width; x++) {
      const pixel = source.buffer.getPixel(x, y);
      if (pixel.a === 0) continue;

      const sx = x + ox;
      const sy = y + oy;
      if (sx < 0 || sx >= project.width || sy < 0 || sy >= project.height) continue;

      // Only place shadow where source is transparent (behind the sprite)
      if (source.buffer.getPixel(sx, sy).a === 0) {
        target.buffer.setPixel(sx, sy, shadowColor);
        count++;
      }
    }
  }

  pushUndo(project, [undo]);
  project.updatedAt = Date.now();

  return {
    content: [{
      type: 'text' as const,
      text: `Drop shadow: ${count} pixels at offset (${ox}, ${oy})`,
    }],
  };
}
