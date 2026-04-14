/**
 * Browser-side template renderer ported from mcp-server/src/tools/templateTools.ts.
 * Pure functions — no Node.js dependencies (no pngjs, no fs).
 */

import type { SpriteTemplate, ColorScheme } from './types';

// ─── RGBA helpers ────────────────────────────────────────────

interface RGBA { r: number; g: number; b: number; a: number }

function clamp(v: number): number { return Math.max(0, Math.min(255, Math.round(v))); }

export function hexToRgba(hex: string): RGBA {
  const c = hex.replace('#', '');
  if (c.length === 6) {
    return { r: parseInt(c.slice(0, 2), 16), g: parseInt(c.slice(2, 4), 16), b: parseInt(c.slice(4, 6), 16), a: 255 };
  }
  if (c.length === 3) {
    return { r: parseInt(c[0] + c[0], 16), g: parseInt(c[1] + c[1], 16), b: parseInt(c[2] + c[2], 16), a: 255 };
  }
  return { r: 0, g: 0, b: 0, a: 255 };
}

export function rgbaToHex(color: RGBA): string {
  return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
}

// ─── DB16 Palette ────────────────────────────────────────────

const DB16_RGBA: RGBA[] = [
  { r: 20, g: 12, b: 28, a: 255 },
  { r: 68, g: 36, b: 52, a: 255 },
  { r: 105, g: 41, b: 83, a: 255 },
  { r: 160, g: 114, b: 66, a: 255 },
  { r: 206, g: 190, b: 113, a: 255 },
  { r: 243, g: 248, b: 244, a: 255 },
  { r: 159, g: 117, b: 21, a: 255 },
  { r: 243, g: 59, b: 30, a: 255 },
  { r: 247, g: 145, b: 27, a: 255 },
  { r: 133, g: 76, b: 48, a: 255 },
  { r: 52, g: 101, b: 36, a: 255 },
  { r: 208, g: 70, b: 72, a: 255 },
  { r: 117, g: 113, b: 97, a: 255 },
  { r: 89, g: 125, b: 206, a: 255 },
  { r: 210, g: 125, b: 44, a: 255 },
  { r: 133, g: 149, b: 161, a: 255 },
  { r: 109, g: 170, b: 44, a: 255 },
  { r: 210, g: 170, b: 153, a: 255 },
  { r: 109, g: 194, b: 202, a: 255 },
  { r: 218, g: 212, b: 94, a: 255 },
  { r: 222, g: 238, b: 214, a: 255 },
];

function snapToDb16(color: RGBA): RGBA {
  let bestDist = Infinity;
  let best: RGBA = DB16_RGBA[0];
  for (const db of DB16_RGBA) {
    const dr = color.r - db.r;
    const dg = color.g - db.g;
    const dbl = color.b - db.b;
    const dist = dr * dr + dg * dg + dbl * dbl;
    if (dist < bestDist) { bestDist = dist; best = db; }
  }
  return { ...best, a: color.a };
}

// ─── Hue-shift shading ──────────────────────────────────────

function hueShiftShadow(base: RGBA, intensity: number): RGBA {
  return {
    r: Math.max(12, clamp(base.r * (1 - intensity * 1.25))),
    g: Math.max(12, clamp(base.g * (1 - intensity * 1.05))),
    b: Math.max(18, clamp(base.b * (1 - intensity * 0.55))),
    a: base.a,
  };
}

function hueShiftHighlight(base: RGBA, intensity: number): RGBA {
  return {
    r: Math.min(245, clamp(base.r + (255 - base.r) * intensity * 1.2)),
    g: Math.min(240, clamp(base.g + (255 - base.g) * intensity * 1.05)),
    b: Math.min(230, clamp(base.b + (255 - base.b) * intensity * 0.7)),
    a: base.a,
  };
}

function bounceLight(shadow: RGBA, intensity: number): RGBA {
  return {
    r: clamp(shadow.r + 18 * intensity),
    g: clamp(shadow.g + 12 * intensity),
    b: clamp(shadow.b + 8 * intensity),
    a: shadow.a,
  };
}

// ─── Material contrast ──────────────────────────────────────

const MATERIAL_CONTRAST: Record<string, { shadowThreshold: number; highlightThreshold: number }> = {
  head: { shadowThreshold: 0.65, highlightThreshold: 0.82 },
  face: { shadowThreshold: 0.75, highlightThreshold: 0.90 },
  eye: { shadowThreshold: 0.95, highlightThreshold: 0.95 },
  body: { shadowThreshold: 0.68, highlightThreshold: 0.84 },
  arm: { shadowThreshold: 0.68, highlightThreshold: 0.84 },
  hand: { shadowThreshold: 0.72, highlightThreshold: 0.88 },
  belt: { shadowThreshold: 0.70, highlightThreshold: 0.86 },
  leg: { shadowThreshold: 0.68, highlightThreshold: 0.84 },
  boot: { shadowThreshold: 0.70, highlightThreshold: 0.86 },
  accessory: { shadowThreshold: 0.65, highlightThreshold: 0.82 },
  hair: { shadowThreshold: 0.72, highlightThreshold: 0.87 },
};
const DEFAULT_CONTRAST = { shadowThreshold: 0.70, highlightThreshold: 0.85 };

// ─── Pixel buffer (lightweight) ─────────────────────────────

class PixelBuf {
  readonly w: number;
  readonly h: number;
  readonly data: Uint8ClampedArray;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.data = new Uint8ClampedArray(w * h * 4);
  }

  get(x: number, y: number): RGBA {
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return { r: 0, g: 0, b: 0, a: 0 };
    const i = (y * this.w + x) * 4;
    return { r: this.data[i], g: this.data[i + 1], b: this.data[i + 2], a: this.data[i + 3] };
  }

  set(x: number, y: number, c: RGBA): void {
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return;
    const i = (y * this.w + x) * 4;
    this.data[i] = c.r; this.data[i + 1] = c.g; this.data[i + 2] = c.b; this.data[i + 3] = c.a;
  }
}

// ─── Outline generation (colored selout) ─────────────────────

function generateOutline(src: PixelBuf, out: PixelBuf): void {
  const { w, h } = src;
  const dirs: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const brightness = (c: RGBA) => c.r * 0.299 + c.g * 0.587 + c.b * 0.114;

  const darkenCool = (c: RGBA, f: number): RGBA => ({
    r: Math.max(10, clamp(c.r * f * 0.92)),
    g: Math.max(10, clamp(c.g * f * 0.95)),
    b: Math.max(15, clamp(c.b * f * 1.15)),
    a: 255,
  });
  const darkenWarm = (c: RGBA, f: number): RGBA => ({
    r: Math.max(10, clamp(c.r * f * 1.05)),
    g: Math.max(10, clamp(c.g * f * 0.98)),
    b: Math.max(10, clamp(c.b * f * 0.75)),
    a: 255,
  });

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pixel = src.get(x, y);
      if (pixel.a === 0) continue;

      let hasEmpty = false;
      let brightest: RGBA | null = null;
      for (const [dx, dy] of dirs) {
        const nb = src.get(x + dx, y + dy);
        if (nb.a === 0) hasEmpty = true;
        else if (!brightest || brightness(nb) < brightness(brightest)) brightest = nb;
      }
      if (!hasEmpty) continue;

      const below = src.get(x, y + 1);
      const right = src.get(x + 1, y);
      const above = src.get(x, y - 1);
      const left = src.get(x - 1, y);
      const isLight = (below.a > 0 || right.a > 0) && (above.a === 0 || left.a === 0);

      let oc: RGBA;
      if (brightest) {
        oc = isLight ? snapToDb16(darkenWarm(brightest, 0.50)) : snapToDb16(darkenCool(brightest, 0.28));
      } else {
        oc = isLight ? { r: 68, g: 36, b: 52, a: 255 } : { r: 20, g: 12, b: 28, a: 255 };
      }
      out.set(x, y, oc);
    }
  }
}

// ─── Material-aware shading ──────────────────────────────────

function generateMaterialShading(
  src: PixelBuf, target: PixelBuf,
  pixelRoleMap: Map<string, string>,
  scheme: ColorScheme | null,
  mode: 'shadow' | 'highlight',
): void {
  const { w, h } = src;

  // Group pixels by role
  const roleGroups = new Map<string, Array<{ x: number; y: number; color: RGBA }>>();
  const roleBBoxes = new Map<string, { minX: number; minY: number; maxX: number; maxY: number }>();
  const noRole: Array<{ x: number; y: number; color: RGBA }> = [];
  let gMinX = w, gMinY = h, gMaxX = 0, gMaxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = src.get(x, y);
      if (px.a === 0) continue;
      const role = pixelRoleMap.get(`${x},${y}`);
      if (role) {
        let group = roleGroups.get(role);
        if (!group) {
          group = [];
          roleGroups.set(role, group);
          roleBBoxes.set(role, { minX: x, minY: y, maxX: x, maxY: y });
        }
        group.push({ x, y, color: px });
        const bb = roleBBoxes.get(role)!;
        if (x < bb.minX) bb.minX = x; if (x > bb.maxX) bb.maxX = x;
        if (y < bb.minY) bb.minY = y; if (y > bb.maxY) bb.maxY = y;
      } else {
        noRole.push({ x, y, color: px });
        if (x < gMinX) gMinX = x; if (x > gMaxX) gMaxX = x;
        if (y < gMinY) gMinY = y; if (y > gMaxY) gMaxY = y;
      }
    }
  }

  const filledSet = new Set<string>();
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (src.get(x, y).a > 0) filledSet.add(`${x},${y}`);

  const shadedPositions: Array<{ x: number; y: number; color: RGBA }> = [];

  const shadePixel = (px: { x: number; y: number; color: RGBA; role?: string }, bbox: { minX: number; minY: number; maxX: number; maxY: number }) => {
    const bboxW = bbox.maxX - bbox.minX || 1;
    const bboxH = bbox.maxY - bbox.minY || 1;
    const nx = (px.x - bbox.minX) / bboxW;
    const ny = (px.y - bbox.minY) / bboxH;
    const contrast = px.role ? (MATERIAL_CONTRAST[px.role] ?? DEFAULT_CONTRAST) : DEFAULT_CONTRAST;

    let edgeBonus = 0;
    if (mode === 'shadow') {
      if (!filledSet.has(`${px.x + 1},${px.y}`) || !filledSet.has(`${px.x},${px.y + 1}`)) edgeBonus = 0.15;
    } else {
      if (!filledSet.has(`${px.x - 1},${px.y}`) || !filledSet.has(`${px.x},${px.y - 1}`)) edgeBonus = 0.15;
    }

    if (mode === 'shadow') {
      if (nx * 0.5 + ny * 0.5 + edgeBonus <= contrast.shadowThreshold) return;
    } else {
      if (1.0 - (nx * 0.5 + ny * 0.5) + edgeBonus <= contrast.highlightThreshold) return;
    }

    const mat = px.role && scheme ? scheme.mapping[px.role] : null;
    let color: RGBA;
    if (mat) {
      color = hexToRgba(mode === 'shadow' ? mat.shadow : mat.highlight);
    } else {
      color = mode === 'shadow'
        ? snapToDb16(hueShiftShadow(px.color, 0.35))
        : snapToDb16(hueShiftHighlight(px.color, 0.28));
    }
    target.set(px.x, px.y, color);
    if (mode === 'shadow') shadedPositions.push({ x: px.x, y: px.y, color });
  };

  for (const [, group] of roleGroups) {
    const role = pixelRoleMap.get(`${group[0].x},${group[0].y}`)!;
    const bb = roleBBoxes.get(role)!;
    for (const px of group) shadePixel({ ...px, role }, bb);
  }

  if (noRole.length > 0) {
    const gBBox = { minX: gMinX, minY: gMinY, maxX: gMaxX, maxY: gMaxY };
    for (const px of noRole) shadePixel(px, gBBox);
  }

  // Bounce light (32x32+)
  if (mode === 'shadow' && w >= 32) {
    const shadedSet = new Set(shadedPositions.map(p => `${p.x},${p.y}`));
    for (const { x, y, color } of shadedPositions) {
      const abovePixel = src.get(x, y - 1);
      const leftPixel = src.get(x - 1, y);
      const lit = (abovePixel.a > 0 && !shadedSet.has(`${x},${y - 1}`)) ||
                  (leftPixel.a > 0 && !shadedSet.has(`${x - 1},${y}`));
      if (lit) target.set(x, y, snapToDb16(bounceLight(color, 0.6)));
    }
  }
}

// ─── Alpha-over compositing ─────────────────────────────────

function compositeOver(dst: PixelBuf, src: PixelBuf): void {
  for (let i = 0; i < dst.data.length; i += 4) {
    const sa = src.data[i + 3] / 255;
    if (sa === 0) continue;
    const da = dst.data[i + 3] / 255;
    const oa = sa + da * (1 - sa);
    if (oa <= 0) continue;
    dst.data[i] = Math.round((src.data[i] * sa + dst.data[i] * da * (1 - sa)) / oa);
    dst.data[i + 1] = Math.round((src.data[i + 1] * sa + dst.data[i + 1] * da * (1 - sa)) / oa);
    dst.data[i + 2] = Math.round((src.data[i + 2] * sa + dst.data[i + 2] * da * (1 - sa)) / oa);
    dst.data[i + 3] = Math.round(oa * 255);
  }
}

// ─── Scheme lookup (same fallback chain as MCP) ──────────────

export function resolveScheme(
  templateName: string,
  schemes: Record<string, ColorScheme>,
  explicitScheme?: string,
): ColorScheme | null {
  if (explicitScheme && schemes[explicitScheme]) return schemes[explicitScheme];
  const d1 = templateName.replace(/_\d+$/, '_default');
  if (schemes[d1]) return schemes[d1];
  const d2 = templateName.replace(/_(walk|idle|attack|hurt)_\d+$/, '_default');
  if (schemes[d2]) return schemes[d2];
  if (schemes[templateName + '_default']) return schemes[templateName + '_default'];
  if (schemes[templateName]) return schemes[templateName];
  return null;
}

// ─── Main render function ────────────────────────────────────

/**
 * Render a template + scheme into an ImageData (browser-ready).
 * Replicates the 4-layer pipeline: base → shading → highlights → outline.
 */
export function renderTemplate(
  template: SpriteTemplate,
  scheme: ColorScheme | null,
  customColors?: Record<string, { shadow: string; base: string; highlight: string }>,
): ImageData {
  const { width: w, height: h } = template;
  const baseBuf = new PixelBuf(w, h);
  const shadeBuf = new PixelBuf(w, h);
  const hlBuf = new PixelBuf(w, h);
  const outlineBuf = new PixelBuf(w, h);

  const pixelRoleMap = new Map<string, string>();
  const bakedToneRoles = new Set<string>();
  for (const region of template.regions) {
    if (region.tone) bakedToneRoles.add(region.role);
  }

  // Use custom colors merged over scheme
  const effectiveScheme: ColorScheme | null = scheme
    ? {
        name: scheme.name,
        mapping: { ...scheme.mapping, ...(customColors ? Object.fromEntries(
          Object.entries(customColors).map(([role, triad]) => [role, triad])
        ) : {}) },
      }
    : customColors
      ? { name: 'custom', mapping: customColors }
      : null;

  // Draw base colors
  for (const region of template.regions) {
    let color: RGBA;
    const mapping = effectiveScheme?.mapping[region.role];
    if (mapping) {
      if (region.tone === 'shadow') color = hexToRgba(mapping.shadow);
      else if (region.tone === 'highlight') color = hexToRgba(mapping.highlight);
      else color = hexToRgba(mapping.base);
    } else {
      color = { r: 128, g: 128, b: 128, a: 255 };
    }
    for (const [x, y] of region.pixels) {
      baseBuf.set(x, y, color);
      pixelRoleMap.set(`${x},${y}`, region.role);
    }
  }

  // Eye highlight
  const eyeMapping = effectiveScheme?.mapping.eye;
  let allowEyeHighlight = true;
  if (eyeMapping) {
    const eb = hexToRgba(eyeMapping.base);
    allowEyeHighlight = (eb.r * 0.299 + eb.g * 0.587 + eb.b * 0.114) > 42;
  }
  if (allowEyeHighlight) {
    const eyeHl: RGBA = { r: 222, g: 238, b: 214, a: 255 };
    for (const region of template.regions) {
      if (region.role === 'eye' && region.name.includes('eye') && region.pixels.length >= 2) {
        const sorted = [...region.pixels].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        if (sorted.length <= 3) {
          for (const [px, py] of sorted) hlBuf.set(px, py, eyeHl);
        } else {
          const groups: Array<Array<[number, number]>> = [[sorted[0]]];
          for (let i = 1; i < sorted.length; i++) {
            if (sorted[i][0] - sorted[i - 1][0] > 1) groups.push([sorted[i]]);
            else groups[groups.length - 1].push(sorted[i]);
          }
          for (const g of groups) hlBuf.set(g[0][0], g[0][1], eyeHl);
        }
      }
    }
  }

  // Auto-outline
  generateOutline(baseBuf, outlineBuf);

  // Auto-shade (material-aware)
  const filteredRoleMap = bakedToneRoles.size > 0
    ? new Map([...pixelRoleMap].filter(([, r]) => !bakedToneRoles.has(r)))
    : pixelRoleMap;

  if (filteredRoleMap.size > 0) {
    generateMaterialShading(baseBuf, shadeBuf, filteredRoleMap, effectiveScheme, 'shadow');
    generateMaterialShading(baseBuf, hlBuf, filteredRoleMap, effectiveScheme, 'highlight');
  }

  // Composite: base → shading → highlights → outline
  const result = new PixelBuf(w, h);
  compositeOver(result, baseBuf);
  compositeOver(result, shadeBuf);
  compositeOver(result, hlBuf);
  compositeOver(result, outlineBuf);

  const pixelData = new Uint8ClampedArray(w * h * 4);
  pixelData.set(result.data);
  return new ImageData(pixelData, w, h);
}
