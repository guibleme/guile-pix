/**
 * Template Generator — ASCII grid / DSL → TypeScript source code.
 *
 * Converts compact ASCII grids OR DSL draw commands into full
 * SpriteTemplate + ColorScheme TypeScript source code.
 *
 * Supports both 16×16 and 32×32 sprites.
 *
 * USAGE:
 *   cd mcp-server && npx tsx scripts/templateGenerator.ts <batchFile>
 *
 * BATCH FILE FORMAT (TypeScript):
 *   export default {
 *     category: 'items',
 *     exportNames: { templates: 'ITEM_TEMPLATES2', schemes: 'ITEM_COLOR_SCHEMES2' },
 *     templates: [
 *       // ─── Classic ASCII grid format ───
 *       {
 *         id: 'dagger_16',
 *         description: 'Short dagger with curved blade',
 *         grid: [
 *           '................',
 *           // ... 16 lines of 16 chars
 *         ],
 *         chars: { B: { name: 'blade', role: 'body' } },
 *         colors: { body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' } },
 *       },
 *
 *       // ─── DSL draw format (token-efficient) ───
 *       {
 *         id: 'shield_32',
 *         description: 'Round shield with boss',
 *         size: 32,
 *         draw: [
 *           'ellipse(16,16,14,14,B)',  // body ellipse
 *           'circle(16,16,4,S)',       // center boss
 *           'ring(16,16,14,12,R)',     // rim ring
 *           'outline(B,O)',            // outline around body
 *           'mirror_h',               // ensure symmetry
 *         ],
 *         chars: {
 *           B: { name: 'shield_face', role: 'body' },
 *           S: { name: 'center_boss', role: 'accessory' },
 *           R: { name: 'rim', role: 'belt' },
 *           O: { name: 'outline', role: 'boot' },
 *         },
 *         colors: { ... },
 *       },
 *     ],
 *   };
 *
 * DSL COMMANDS:
 *   rect(x, y, w, h, C)             — filled rectangle
 *   ellipse(cx, cy, rx, ry, C)      — filled ellipse
 *   circle(cx, cy, r, C)            — filled circle (shorthand)
 *   line(x1, y1, x2, y2, C)        — Bresenham line
 *   pixel(x, y, C)                  — single pixel
 *   pixels(C, x1,y1, x2,y2, ...)   — multiple specific pixels
 *   ring(cx, cy, r_outer, r_inner, C) — ring/donut shape
 *   tri(x1,y1, x2,y2, x3,y3, C)    — filled triangle
 *   outline(targetC, outlineC)      — add 4-connected outline around targetC pixels
 *   smooth(cx, startY, w1-w2-..., C) — progressive-width rows for organic curves
 *   mirror_h                        — mirror left half → right half
 *   mirror_v                        — mirror top half → bottom half
 *   clear(C)                        — remove all pixels of char C
 *   auto_shade                      — bake shadow/highlight sub-regions per role
 *   auto_selout                     — bake colored selout outline sub-region
 *
 * The generator:
 *   1. Parses each grid/DSL into pixel coordinate arrays
 *   2. Groups pixels by char into named regions
 *   3. Validates quality (density, bounds, minimum pixels)
 *   4. Fills missing color roles with category-appropriate defaults
 *   5. Outputs complete TypeScript source code to stdout
 */

// ─── Types ──────────────────────────────────────────────────────

interface CharMapping {
  name: string;
  role: string;
  tone?: 'shadow' | 'base' | 'highlight';   // which color of the triad to use
}

interface ColorTriad {
  shadow: string;
  base: string;
  highlight: string;
}

export interface CompactTemplate {
  id: string;
  description: string;
  size?: 16 | 32;                              // defaults to 16
  grid?: string[];                             // classic: N lines of N chars
  draw?: string[];                             // DSL draw commands
  chars: Record<string, CharMapping>;          // char → { name, role }
  colors: Record<string, ColorTriad>;          // role → shadow/base/highlight
}

export interface BatchDefinition {
  category: string;
  exportNames: { templates: string; schemes: string };
  templates: CompactTemplate[];
}

interface ValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
  pixelCount: number;
  density: number;
  roles: string[];
}

// ─── DB16 Palette ───────────────────────────────────────────────

const DB16 = [
  '#140c1c', '#442434', '#30346d', '#4e4a4e',
  '#854c30', '#346524', '#d04648', '#757161',
  '#597dce', '#d27d2c', '#8595a1', '#6daa2c',
  '#d2aa99', '#6dc2ca', '#dad45e', '#deeed6',
];

// ─── Category Color Presets ─────────────────────────────────────

const ALL_ROLES = ['head', 'hair', 'face', 'eye', 'body', 'arm', 'hand', 'belt', 'leg', 'boot', 'accessory'];

const PRESET_STEEL: Record<string, ColorTriad> = {
  head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
  face:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  hand:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
};

const PRESET_WOOD: Record<string, ColorTriad> = {
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
};

const PRESET_NATURE: Record<string, ColorTriad> = {
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#deeed6' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  face:      { shadow: '#346524', base: '#6daa2c', highlight: '#deeed6' },
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  hand:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
};

const PRESET_STONE: Record<string, ColorTriad> = {
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
};

const PRESET_MAGIC: Record<string, ColorTriad> = {
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  boot:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  face:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  hand:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  hair:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
};

const PRESET_CREATURE: Record<string, ColorTriad> = {
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  face:      { shadow: '#346524', base: '#6daa2c', highlight: '#deeed6' },
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  hand:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
};

const PRESET_FOOD: Record<string, ColorTriad> = {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  hand:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  leg:       { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
};

const PRESET_ENEMY: Record<string, ColorTriad> = {
  head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  body:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  face:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  arm:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  hand:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  hair:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
};

const PRESET_UI: Record<string, ColorTriad> = {
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
  face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
};

export const CATEGORY_PRESETS: Record<string, Record<string, ColorTriad>> = {
  items: PRESET_STEEL,
  weapons: PRESET_STEEL,
  equipment: PRESET_STEEL,
  creatures: PRESET_CREATURE,
  enemies: PRESET_ENEMY,
  bosses: PRESET_ENEMY,
  nature: PRESET_NATURE,
  plants: PRESET_NATURE,
  environment: PRESET_STONE,
  biomes: PRESET_NATURE,
  buildings: PRESET_STONE,
  dungeon: PRESET_STONE,
  furniture: PRESET_WOOD,
  props: PRESET_WOOD,
  food: PRESET_FOOD,
  effects: PRESET_MAGIC,
  ui: PRESET_UI,
  rpgui: PRESET_UI,
  vehicles: PRESET_STEEL,
  npcs: PRESET_WOOD,
  characters: PRESET_WOOD,
};

// ─── DSL Drawing Primitives ─────────────────────────────────────

type GridBuffer = (string | null)[][];

function createBuffer(size: number): GridBuffer {
  return Array.from({ length: size }, () => Array(size).fill(null));
}

function bufferSet(buf: GridBuffer, x: number, y: number, ch: string): void {
  const size = buf.length;
  if (x >= 0 && x < size && y >= 0 && y < size) {
    buf[y][x] = ch;
  }
}

function drawRect(buf: GridBuffer, x: number, y: number, w: number, h: number, ch: string): void {
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      bufferSet(buf, x + dx, y + dy, ch);
    }
  }
}

function drawEllipse(buf: GridBuffer, cx: number, cy: number, rx: number, ry: number, ch: string): void {
  // Filled ellipse using midpoint algorithm
  for (let y = cy - ry; y <= cy + ry; y++) {
    for (let x = cx - rx; x <= cx + rx; x++) {
      const dx = x - cx;
      const dy = y - cy;
      if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1.0) {
        bufferSet(buf, Math.round(x), Math.round(y), ch);
      }
    }
  }
}

function drawCircle(buf: GridBuffer, cx: number, cy: number, r: number, ch: string): void {
  drawEllipse(buf, cx, cy, r, r, ch);
}

function drawLine(buf: GridBuffer, x0: number, y0: number, x1: number, y1: number, ch: string): void {
  // Bresenham's line algorithm
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let cx = x0, cy = y0;

  while (true) {
    bufferSet(buf, cx, cy, ch);
    if (cx === x1 && cy === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; cx += sx; }
    if (e2 < dx) { err += dx; cy += sy; }
  }
}

function drawRing(buf: GridBuffer, cx: number, cy: number, rOuter: number, rInner: number, ch: string): void {
  for (let y = cy - rOuter; y <= cy + rOuter; y++) {
    for (let x = cx - rOuter; x <= cx + rOuter; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist2 = dx * dx + dy * dy;
      if (dist2 <= rOuter * rOuter && dist2 >= rInner * rInner) {
        bufferSet(buf, Math.round(x), Math.round(y), ch);
      }
    }
  }
}

function drawTriangle(buf: GridBuffer, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, ch: string): void {
  // Scanline fill triangle
  const minY = Math.min(y0, y1, y2);
  const maxY = Math.max(y0, y1, y2);
  const minX = Math.min(x0, x1, x2);
  const maxX = Math.max(x0, x1, x2);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      // Barycentric coordinate test
      const d = (y1 - y2) * (x0 - x2) + (x2 - x1) * (y0 - y2);
      if (d === 0) continue;
      const a = ((y1 - y2) * (x - x2) + (x2 - x1) * (y - y2)) / d;
      const b = ((y2 - y0) * (x - x2) + (x0 - x2) * (y - y2)) / d;
      const c = 1 - a - b;
      if (a >= 0 && b >= 0 && c >= 0) {
        bufferSet(buf, x, y, ch);
      }
    }
  }
}

function drawSpans(buf: GridBuffer, ch: string, spans: string[]): void {
  // Each span is "y:x1-x2" (inclusive range)
  for (const span of spans) {
    const [yStr, rangeStr] = span.split(':');
    if (!yStr || !rangeStr) continue;
    const y = Number(yStr);
    const [x1Str, x2Str] = rangeStr.split('-');
    const x1 = Number(x1Str);
    const x2 = Number(x2Str);
    for (let x = x1; x <= x2; x++) {
      bufferSet(buf, x, y, ch);
    }
  }
}

function drawPolygon(buf: GridBuffer, points: [number, number][], ch: string): void {
  if (points.length < 3) return;
  // Find bounding box
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const [px, py] of points) {
    minX = Math.min(minX, px); maxX = Math.max(maxX, px);
    minY = Math.min(minY, py); maxY = Math.max(maxY, py);
  }
  // Point-in-polygon via ray casting
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      let inside = false;
      for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const [xi, yi] = points[i];
        const [xj, yj] = points[j];
        if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      if (inside) bufferSet(buf, x, y, ch);
    }
  }
  // Also draw edges to fill boundary pixels
  for (let i = 0; i < points.length; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[(i + 1) % points.length];
    drawLine(buf, x0, y0, x1, y1, ch);
  }
}

function applyOutline(buf: GridBuffer, targetCh: string, outlineCh: string): void {
  const size = buf.length;
  const outlinePixels: [number, number][] = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (buf[y][x] === targetCh) {
        // Check 4-connected neighbors for empty space
        const neighbors: [number, number][] = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < size && ny >= 0 && ny < size && buf[ny][nx] === null) {
            outlinePixels.push([nx, ny]);
          }
        }
      }
    }
  }

  for (const [x, y] of outlinePixels) {
    buf[y][x] = outlineCh;
  }
}

function mirrorHorizontal(buf: GridBuffer): void {
  const size = buf.length;
  const half = Math.floor(size / 2);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < half; x++) {
      const mirrorX = size - 1 - x;
      if (buf[y][x] !== null) {
        buf[y][mirrorX] = buf[y][x];
      }
    }
  }
}

function mirrorVertical(buf: GridBuffer): void {
  const size = buf.length;
  const half = Math.floor(size / 2);
  for (let y = 0; y < half; y++) {
    const mirrorY = size - 1 - y;
    for (let x = 0; x < size; x++) {
      if (buf[y][x] !== null) {
        buf[mirrorY][x] = buf[y][x];
      }
    }
  }
}

function drawSmooth(buf: GridBuffer, cx: number, startY: number, widths: number[], ch: string, id: string): void {
  // Progressive width array for organic shapes (domes, bowls, heads).
  // Same algorithm as draw_smooth_shape MCP tool.
  for (let i = 0; i < widths.length; i++) {
    const w = widths[i];
    const y = startY + i;
    if (w <= 0) continue;
    // Warn if adjacent rows differ by > 2px (creates jaggies)
    if (i > 0 && Math.abs(w - widths[i - 1]) > 2) {
      console.error(`    ⚠ ${id}: smooth row ${i} width delta ${Math.abs(w - widths[i - 1])} > 2 (jaggies risk)`);
    }
    const left = Math.round(cx - w / 2);
    for (let x = left; x < left + w; x++) {
      bufferSet(buf, x, y, ch);
    }
  }
}

function clearChar(buf: GridBuffer, ch: string): void {
  const size = buf.length;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (buf[y][x] === ch) buf[y][x] = null;
    }
  }
}

// ─── DSL Parser ─────────────────────────────────────────────────

function parseArgs(argsStr: string): string[] {
  // Split by comma, trim whitespace
  return argsStr.split(',').map(s => s.trim());
}

function executeDSL(commands: string[], size: number, id: string): GridBuffer {
  const buf = createBuffer(size);

  for (const cmd of commands) {
    const trimmed = cmd.trim();
    if (!trimmed || trimmed.startsWith('//')) continue;

    // Simple commands without parens
    if (trimmed === 'mirror_h') { mirrorHorizontal(buf); continue; }
    if (trimmed === 'mirror_v') { mirrorVertical(buf); continue; }

    // Parse command(args...)
    const match = trimmed.match(/^(\w+)\((.+)\)$/);
    if (!match) {
      throw new Error(`${id}: invalid DSL command: "${trimmed}"`);
    }

    const [, name, argsStr] = match;
    const args = parseArgs(argsStr);

    switch (name) {
      case 'rect': {
        // rect(x, y, w, h, C)
        if (args.length !== 5) throw new Error(`${id}: rect needs 5 args (x,y,w,h,C), got ${args.length}`);
        const [x, y, w, h] = args.slice(0, 4).map(Number);
        drawRect(buf, x, y, w, h, args[4]);
        break;
      }

      case 'ellipse': {
        // ellipse(cx, cy, rx, ry, C)
        if (args.length !== 5) throw new Error(`${id}: ellipse needs 5 args (cx,cy,rx,ry,C), got ${args.length}`);
        const [cx, cy, rx, ry] = args.slice(0, 4).map(Number);
        drawEllipse(buf, cx, cy, rx, ry, args[4]);
        break;
      }

      case 'circle': {
        // circle(cx, cy, r, C)
        if (args.length !== 4) throw new Error(`${id}: circle needs 4 args (cx,cy,r,C), got ${args.length}`);
        const [cx, cy, r] = args.slice(0, 3).map(Number);
        drawCircle(buf, cx, cy, r, args[3]);
        break;
      }

      case 'line': {
        // line(x1, y1, x2, y2, C)
        if (args.length !== 5) throw new Error(`${id}: line needs 5 args (x1,y1,x2,y2,C), got ${args.length}`);
        const [x1, y1, x2, y2] = args.slice(0, 4).map(Number);
        drawLine(buf, x1, y1, x2, y2, args[4]);
        break;
      }

      case 'pixel': {
        // pixel(x, y, C)
        if (args.length !== 3) throw new Error(`${id}: pixel needs 3 args (x,y,C), got ${args.length}`);
        bufferSet(buf, Number(args[0]), Number(args[1]), args[2]);
        break;
      }

      case 'pixels': {
        // pixels(C, x1,y1, x2,y2, ...)
        if (args.length < 3 || args.length % 2 === 0) {
          throw new Error(`${id}: pixels needs char + even number of coordinates`);
        }
        const ch = args[0];
        for (let i = 1; i < args.length; i += 2) {
          bufferSet(buf, Number(args[i]), Number(args[i + 1]), ch);
        }
        break;
      }

      case 'ring': {
        // ring(cx, cy, r_outer, r_inner, C)
        if (args.length !== 5) throw new Error(`${id}: ring needs 5 args (cx,cy,ro,ri,C), got ${args.length}`);
        const [cx, cy, ro, ri] = args.slice(0, 4).map(Number);
        drawRing(buf, cx, cy, ro, ri, args[4]);
        break;
      }

      case 'tri': {
        // tri(x1,y1, x2,y2, x3,y3, C)
        if (args.length !== 7) throw new Error(`${id}: tri needs 7 args (x1,y1,x2,y2,x3,y3,C), got ${args.length}`);
        const [x1, y1, x2, y2, x3, y3] = args.slice(0, 6).map(Number);
        drawTriangle(buf, x1, y1, x2, y2, x3, y3, args[6]);
        break;
      }

      case 'spans': {
        // spans(C, y1:x1-x2, y2:x1-x2, ...)
        if (args.length < 2) throw new Error(`${id}: spans needs char + at least one span`);
        const spansCh = args[0];
        const spanDefs = args.slice(1);
        drawSpans(buf, spansCh, spanDefs);
        break;
      }

      case 'poly': {
        // poly(C, x1,y1, x2,y2, x3,y3, ...)
        if (args.length < 7 || args.length % 2 === 0) {
          throw new Error(`${id}: poly needs char + at least 3 points (7+ args odd count)`);
        }
        const polyCh = args[0];
        const polyPoints: [number, number][] = [];
        for (let i = 1; i < args.length; i += 2) {
          polyPoints.push([Number(args[i]), Number(args[i + 1])]);
        }
        drawPolygon(buf, polyPoints, polyCh);
        break;
      }

      case 'outline': {
        // outline(targetC, outlineC)
        if (args.length !== 2) throw new Error(`${id}: outline needs 2 args (targetC,outlineC), got ${args.length}`);
        applyOutline(buf, args[0], args[1]);
        break;
      }

      case 'smooth': {
        // smooth(cx, startY, w1-w2-w3-..., C)
        if (args.length !== 4) throw new Error(`${id}: smooth needs 4 args (cx,startY,widths,C), got ${args.length}`);
        const [smCx, smStartY] = [Number(args[0]), Number(args[1])];
        const widths = args[2].split('-').map(Number);
        if (widths.some(isNaN)) throw new Error(`${id}: smooth widths must be dash-separated integers, got "${args[2]}"`);
        drawSmooth(buf, smCx, smStartY, widths, args[3], id);
        break;
      }

      case 'clear': {
        // clear(C)
        if (args.length !== 1) throw new Error(`${id}: clear needs 1 arg (C), got ${args.length}`);
        clearChar(buf, args[0]);
        break;
      }

      default:
        throw new Error(`${id}: unknown DSL command: "${name}"`);
    }
  }

  return buf;
}

// ─── Grid Parser (supports both grid and DSL) ───────────────────

function getTemplateSize(def: CompactTemplate): number {
  return def.size || 16;
}

function parseTemplate(def: CompactTemplate): { regions: Array<{ name: string; role: string; pixels: [number, number][] }> } {
  const size = getTemplateSize(def);

  if (def.draw && def.draw.length > 0) {
    return parseDSLTemplate(def, size);
  }
  if (def.grid && def.grid.length > 0) {
    return parseGridTemplate(def, size);
  }
  throw new Error(`${def.id}: template must have either 'grid' or 'draw' field`);
}

function parseDSLTemplate(def: CompactTemplate, size: number): { regions: Array<{ name: string; role: string; tone?: string; pixels: [number, number][] }> } {
  // Filter out post-processing commands before passing to DSL executor
  const drawCmds = def.draw!.filter(c => c.trim() !== 'auto_shade' && c.trim() !== 'auto_selout');
  const hasAutoShade = def.draw!.some(c => c.trim() === 'auto_shade');
  const hasAutoSelout = def.draw!.some(c => c.trim() === 'auto_selout');

  const buf = executeDSL(drawCmds, size, def.id);

  // Collect pixels per char from buffer
  const charPixels = new Map<string, [number, number][]>();

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const ch = buf[y][x];
      if (ch === null) continue;
      if (!def.chars[ch]) {
        throw new Error(`${def.id}: DSL produced char '${ch}' at (${x},${y}) not in chars map.`);
      }
      if (!charPixels.has(ch)) charPixels.set(ch, []);
      charPixels.get(ch)!.push([x, y]);
    }
  }

  // Build regions in chars definition order
  let regions: Array<{ name: string; role: string; tone?: string; pixels: [number, number][] }> = [];
  for (const [ch, mapping] of Object.entries(def.chars)) {
    const pixels = charPixels.get(ch);
    if (!pixels || pixels.length === 0) continue;
    const region: { name: string; role: string; tone?: string; pixels: [number, number][] } = { name: mapping.name, role: mapping.role, pixels };
    if (mapping.tone) region.tone = mapping.tone;
    regions.push(region);
  }

  // auto_shade: split each role into base/shadow/highlight sub-regions
  if (hasAutoShade) {
    regions = applyAutoShade(regions, size);
  }

  // auto_selout: create outline sub-region from border pixels
  if (hasAutoSelout) {
    regions = applyAutoSelout(regions, size, buf, def.chars);
  }

  return { regions };
}

/** Split each role's pixels into base/shadow/highlight using positional gradient. */
function applyAutoShade(
  regions: Array<{ name: string; role: string; tone?: string; pixels: [number, number][] }>,
  size: number
): Array<{ name: string; role: string; tone?: string; pixels: [number, number][] }> {
  const result: Array<{ name: string; role: string; tone?: string; pixels: [number, number][] }> = [];

  for (const region of regions) {
    // Skip if already has explicit tone
    if (region.tone) {
      result.push(region);
      continue;
    }

    // Compute per-role bounding box
    let minX = size, minY = size, maxX = 0, maxY = 0;
    for (const [x, y] of region.pixels) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    const bboxW = maxX - minX || 1;
    const bboxH = maxY - minY || 1;

    // Use same thresholds as generateMaterialShading
    const shadowThreshold = 0.68;
    const highlightThreshold = 0.85;

    const basePixels: [number, number][] = [];
    const shadowPixels: [number, number][] = [];
    const highlightPixels: [number, number][] = [];

    for (const [x, y] of region.pixels) {
      const nx = (x - minX) / bboxW;
      const ny = (y - minY) / bboxH;
      const shadowScore = nx * 0.5 + ny * 0.5;
      const highlightScore = 1.0 - shadowScore;

      if (shadowScore > shadowThreshold) {
        shadowPixels.push([x, y]);
      } else if (highlightScore > highlightThreshold) {
        highlightPixels.push([x, y]);
      } else {
        basePixels.push([x, y]);
      }
    }

    // Only split if there are actually shadow/highlight pixels
    if (basePixels.length > 0) {
      result.push({ name: `${region.name}_base`, role: region.role, tone: 'base', pixels: basePixels });
    }
    if (shadowPixels.length > 0) {
      result.push({ name: `${region.name}_shadow`, role: region.role, tone: 'shadow', pixels: shadowPixels });
    }
    if (highlightPixels.length > 0) {
      result.push({ name: `${region.name}_highlight`, role: region.role, tone: 'highlight', pixels: highlightPixels });
    }
    // If no split happened (all base), keep original
    if (shadowPixels.length === 0 && highlightPixels.length === 0) {
      result.push(region);
    }
  }

  return result;
}

/** Add a colored selout outline sub-region from border pixels using shadow tone. */
function applyAutoSelout(
  regions: Array<{ name: string; role: string; tone?: string; pixels: [number, number][] }>,
  size: number,
  buf: GridBuffer,
  chars: Record<string, CharMapping>
): Array<{ name: string; role: string; tone?: string; pixels: [number, number][] }> {
  // Find border pixels (adjacent to transparent) and assign them to shadow tone
  // We need a special outline char — use the role of the adjacent filled pixel
  const filledSet = new Set<string>();
  const pixelRole = new Map<string, string>();
  for (const region of regions) {
    for (const [x, y] of region.pixels) {
      const key = `${x},${y}`;
      filledSet.add(key);
      pixelRole.set(key, region.role);
    }
  }

  const dirs: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const outlineByRole = new Map<string, [number, number][]>();

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (filledSet.has(`${x},${y}`)) continue; // not empty

      // Check 4-connected neighbors for filled pixel
      let adjRole: string | null = null;
      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy;
        const key = `${nx},${ny}`;
        if (pixelRole.has(key)) {
          adjRole = pixelRole.get(key)!;
          break;
        }
      }
      if (!adjRole) continue;

      if (!outlineByRole.has(adjRole)) outlineByRole.set(adjRole, []);
      outlineByRole.get(adjRole)!.push([x, y]);
    }
  }

  // Add outline regions with shadow tone (they'll use the role's shadow color)
  const result = [...regions];
  for (const [role, pixels] of outlineByRole) {
    if (pixels.length === 0) continue;
    result.push({
      name: `outline_${role}`,
      role,
      tone: 'shadow',
      pixels,
    });
  }

  return result;
}

function parseGridTemplate(def: CompactTemplate, size: number): { regions: Array<{ name: string; role: string; tone?: string; pixels: [number, number][] }> } {
  const { grid, chars } = def;

  if (!grid || grid.length !== size) {
    throw new Error(`${def.id}: grid must have exactly ${size} rows, got ${grid?.length ?? 0}`);
  }

  const charPixels = new Map<string, [number, number][]>();

  for (let y = 0; y < size; y++) {
    const row = grid[y];
    if (row.length !== size) {
      throw new Error(`${def.id}: row ${y} must have ${size} chars, got ${row.length} ("${row}")`);
    }
    for (let x = 0; x < size; x++) {
      const ch = row[x];
      if (ch === '.') continue;
      if (!chars[ch]) {
        throw new Error(`${def.id}: unknown char '${ch}' at (${x},${y}). Define it in chars map.`);
      }
      if (!charPixels.has(ch)) charPixels.set(ch, []);
      charPixels.get(ch)!.push([x, y]);
    }
  }

  const regions: Array<{ name: string; role: string; tone?: string; pixels: [number, number][] }> = [];
  for (const [ch, mapping] of Object.entries(chars)) {
    const pixels = charPixels.get(ch);
    if (!pixels || pixels.length === 0) continue;
    const region: { name: string; role: string; tone?: string; pixels: [number, number][] } = { name: mapping.name, role: mapping.role, pixels };
    if (mapping.tone) region.tone = mapping.tone;
    regions.push(region);
  }

  return { regions };
}

// ─── Validator ──────────────────────────────────────────────────

// Category-aware density targets (from qualityValidation.ts)
const DENSITY_TARGETS: Record<string, { min: number; max: number }> = {
  characters: { min: 0.25, max: 0.65 },
  npcs: { min: 0.25, max: 0.65 },
  enemies: { min: 0.25, max: 0.65 },
  bosses: { min: 0.25, max: 0.65 },
  creatures: { min: 0.25, max: 0.65 },
  items: { min: 0.15, max: 0.55 },
  weapons: { min: 0.15, max: 0.45 },
  equipment: { min: 0.15, max: 0.55 },
  food: { min: 0.20, max: 0.55 },
  props: { min: 0.20, max: 0.55 },
  furniture: { min: 0.25, max: 0.60 },
  nature: { min: 0.20, max: 0.60 },
  plants: { min: 0.15, max: 0.55 },
  environment: { min: 0.20, max: 0.60 },
  buildings: { min: 0.30, max: 0.75 },
  dungeon: { min: 0.25, max: 0.65 },
  effects: { min: 0.10, max: 0.50 },
  ui: { min: 0.25, max: 0.80 },
  rpgui: { min: 0.25, max: 0.80 },
  vehicles: { min: 0.25, max: 0.60 },
};

interface QualityScore {
  score: number;      // 0-100
  issues: string[];   // detail messages
}

function computeQuality(def: CompactTemplate, regions: Array<{ name: string; role: string; pixels: [number, number][] }>, category: string): QualityScore {
  const size = getTemplateSize(def);
  const issues: string[] = [];
  let deductions = 0;

  // Build a filled-pixel set for neighbor checks
  const filledSet = new Set<string>();
  const charAtPixel = new Map<string, string>();
  for (const region of regions) {
    for (const [x, y] of region.pixels) {
      const key = `${x},${y}`;
      filledSet.add(key);
      charAtPixel.set(key, region.role);
    }
  }

  // 1. Orphan pixels — isolated 1px with no same-role orthogonal neighbor
  let orphanCount = 0;
  for (const region of regions) {
    for (const [x, y] of region.pixels) {
      const neighbors = [[x-1,y],[x+1,y],[x,y-1],[x,y+1]];
      const hasSameRole = neighbors.some(([nx, ny]) => charAtPixel.get(`${nx},${ny}`) === region.role);
      if (!hasSameRole) orphanCount++;
    }
  }
  if (orphanCount > 0) {
    const penalty = Math.min(15, orphanCount * 3);
    deductions += penalty;
    issues.push(`${orphanCount} orphan pixel(s) (-${penalty})`);
  }

  // 2. Structural width — 1px-wide spans > 3px long
  // Scan horizontal runs per role
  let thinSpanCount = 0;
  for (const region of regions) {
    const byRow = new Map<number, number[]>();
    for (const [x, y] of region.pixels) {
      if (!byRow.has(y)) byRow.set(y, []);
      byRow.get(y)!.push(x);
    }
    for (const [y, xs] of byRow) {
      xs.sort((a, b) => a - b);
      for (let i = 0; i < xs.length; i++) {
        const x = xs[i];
        // Check if this pixel has a same-role neighbor above or below
        const hasVerticalNeighbor =
          charAtPixel.get(`${x},${y-1}`) === region.role ||
          charAtPixel.get(`${x},${y+1}`) === region.role;
        if (!hasVerticalNeighbor) {
          // Count consecutive horizontally-isolated pixels
          let runLen = 1;
          while (i + 1 < xs.length && xs[i + 1] === xs[i] + 1 &&
            charAtPixel.get(`${xs[i+1]},${y-1}`) !== region.role &&
            charAtPixel.get(`${xs[i+1]},${y+1}`) !== region.role) {
            runLen++;
            i++;
          }
          if (runLen >= 4) thinSpanCount++;
        }
      }
    }
  }
  if (thinSpanCount > 0) {
    const penalty = Math.min(10, thinSpanCount * 5);
    deductions += penalty;
    issues.push(`${thinSpanCount} thin 1px span(s) > 3px long (-${penalty})`);
  }

  // 3. Density by category
  const allPixels = regions.flatMap(r => r.pixels);
  const density = allPixels.length / (size * size);
  const target = DENSITY_TARGETS[category];
  if (target) {
    if (density < target.min) {
      deductions += 5;
      issues.push(`Density ${(density*100).toFixed(1)}% below ${category} min ${(target.min*100).toFixed(0)}% (-5)`);
    } else if (density > target.max) {
      deductions += 5;
      issues.push(`Density ${(density*100).toFixed(1)}% above ${category} max ${(target.max*100).toFixed(0)}% (-5)`);
    }
  }

  // 4. Color count (distinct roles)
  const uniqueRoles = new Set(regions.map(r => r.role));
  const minColors = size === 32 ? 3 : 2;
  const maxColors = size === 32 ? 16 : 12;
  if (uniqueRoles.size < minColors) {
    deductions += 5;
    issues.push(`Only ${uniqueRoles.size} role(s) — needs at least ${minColors} (-5)`);
  } else if (uniqueRoles.size > maxColors) {
    deductions += 3;
    issues.push(`${uniqueRoles.size} roles exceeds recommended max ${maxColors} (-3)`);
  }

  // 5. Bounding box utilization — sprite should fill >= 60% of canvas
  let minX = size, minY = size, maxX = 0, maxY = 0;
  for (const [x, y] of allPixels) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const bboxW = maxX - minX + 1;
  const bboxH = maxY - minY + 1;
  const bboxUtil = Math.max(bboxW, bboxH) / size;
  if (bboxUtil < 0.60) {
    deductions += 5;
    issues.push(`Bbox utilization ${(bboxUtil*100).toFixed(0)}% < 60% — sprite may be too small (-5)`);
  }

  return { score: Math.max(0, 100 - deductions), issues };
}

function validate(def: CompactTemplate, category?: string): ValidationResult {
  const size = getTemplateSize(def);
  const totalPixels = size * size;
  const result: ValidationResult = { valid: true, warnings: [], errors: [], pixelCount: 0, density: 0, roles: [] };

  try {
    const { regions } = parseTemplate(def);
    const allPixels = regions.flatMap(r => r.pixels);
    result.pixelCount = allPixels.length;
    result.density = allPixels.length / totalPixels;
    result.roles = [...new Set(regions.map(r => r.role))];

    // Check for duplicate pixels
    const pixelSet = new Set<string>();
    for (const [x, y] of allPixels) {
      const key = `${x},${y}`;
      if (pixelSet.has(key)) {
        result.warnings.push(`Duplicate pixel at (${x},${y}) — last region wins in render`);
      }
      pixelSet.add(key);
    }

    // Density checks (basic)
    if (result.density < 0.15) {
      result.warnings.push(`Very low density (${(result.density * 100).toFixed(1)}%) — sprite may look too sparse`);
    }
    if (result.density > 0.75) {
      result.warnings.push(`Very high density (${(result.density * 100).toFixed(1)}%) — sprite may look too full`);
    }

    // Minimum pixel count (scaled by size)
    const minPixels = size === 32 ? 60 : 20;
    if (result.pixelCount < minPixels) {
      result.warnings.push(`Only ${result.pixelCount} pixels — sprite may lack detail`);
    }

    // Check bounds
    const maxCoord = size - 1;
    for (const [x, y] of allPixels) {
      if (x < 0 || x > maxCoord || y < 0 || y > maxCoord) {
        result.errors.push(`Pixel out of bounds: (${x},${y})`);
        result.valid = false;
      }
    }

    // Check color scheme covers all roles
    for (const role of result.roles) {
      if (!def.colors[role]) {
        result.warnings.push(`No color defined for role '${role}' — will use category preset`);
      }
    }

    // Quality checks (orphan pixels, structural width, density-by-category, etc.)
    if (category) {
      const quality = computeQuality(def, regions, category);
      if (quality.issues.length > 0) {
        for (const issue of quality.issues) {
          result.warnings.push(issue);
        }
      }
      // Attach score as a warning-level note (not an error)
      (result as any).qualityScore = quality.score;
    }

  } catch (e: any) {
    result.errors.push(e.message);
    result.valid = false;
  }

  return result;
}

// ─── Code Generator ─────────────────────────────────────────────

function generateTemplateCode(def: CompactTemplate): string {
  const size = getTemplateSize(def);
  const { regions } = parseTemplate(def);
  const sizeSuffix = `_${size}`;
  const constName = def.id.toUpperCase().replace(new RegExp(`_${size}$`), sizeSuffix);

  const lines: string[] = [];
  lines.push(`export const ${constName}: SpriteTemplate = {`);
  lines.push(`  name: '${def.id}',`);
  lines.push(`  width: ${size},`);
  lines.push(`  height: ${size},`);
  lines.push(`  description: '${def.description.replace(/'/g, "\\'")}',`);
  lines.push(`  regions: [`);

  for (const region of regions) {
    const tonePart = region.tone ? `, tone: '${region.tone}'` : '';
    lines.push(`    { name: '${region.name}', role: '${region.role}'${tonePart}, pixels: [`);

    // Group pixels by row for readability
    const byRow = new Map<number, number[]>();
    for (const [x, y] of region.pixels) {
      if (!byRow.has(y)) byRow.set(y, []);
      byRow.get(y)!.push(x);
    }

    const rows = [...byRow.entries()].sort((a, b) => a[0] - b[0]);
    for (const [y, xs] of rows) {
      const pixelStr = xs.sort((a, b) => a - b).map(x => `[${x},${y}]`).join(', ');
      lines.push(`      ${pixelStr},`);
    }

    lines.push(`    ]},`);
  }

  lines.push(`  ],`);
  lines.push(`};`);

  return lines.join('\n');
}

function generateColorCode(def: CompactTemplate, categoryPreset: Record<string, ColorTriad>): string {
  const size = getTemplateSize(def);
  const schemeName = def.id.replace(new RegExp(`_${size}$`), '');
  const constName = schemeName.toUpperCase() + '_COLORS';

  const mapping: Record<string, ColorTriad> = {};
  for (const role of ALL_ROLES) {
    mapping[role] = def.colors[role] || categoryPreset[role] || PRESET_STEEL[role];
  }

  const lines: string[] = [];
  lines.push(`export const ${constName}: ColorScheme = {`);
  lines.push(`  name: '${schemeName}_default',`);
  lines.push(`  mapping: {`);

  const maxRoleLen = Math.max(...ALL_ROLES.map(r => r.length));
  for (const role of ALL_ROLES) {
    const c = mapping[role];
    const pad = ' '.repeat(maxRoleLen - role.length);
    lines.push(`    ${role}:${pad} { shadow: '${c.shadow}', base: '${c.base}', highlight: '${c.highlight}' },`);
  }

  lines.push(`  },`);
  lines.push(`};`);

  return lines.join('\n');
}

function generateBatchFile(batch: BatchDefinition): string {
  const preset = CATEGORY_PRESETS[batch.category] || PRESET_STEEL;

  // Detect sizes in batch
  const sizes = new Set(batch.templates.map(t => getTemplateSize(t)));
  const sizeLabel = [...sizes].sort().join('/');

  const lines: string[] = [];

  // Header
  lines.push(`/**`);
  lines.push(` * ${sizeLabel}x${sizeLabel} ${batch.category} templates — generated batch.`);
  lines.push(` * Generated by templateGenerator.ts on ${new Date().toISOString().split('T')[0]}.`);
  lines.push(` * ${batch.templates.length} templates.`);
  lines.push(` */`);
  lines.push(``);
  lines.push(`import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';`);
  lines.push(``);

  // Templates
  for (const def of batch.templates) {
    const separator = '// ' + '═'.repeat(60);
    const size = getTemplateSize(def);
    lines.push(separator);
    lines.push(`// ${def.id.toUpperCase().replace(new RegExp(`_${size}$`), '')} — ${def.description}`);
    lines.push(separator);
    lines.push(generateTemplateCode(def));
    lines.push(``);
  }

  // Color schemes
  lines.push(`// ${'═'.repeat(60)}`);
  lines.push(`// COLOR SCHEMES`);
  lines.push(`// ${'═'.repeat(60)}`);
  lines.push(``);

  for (const def of batch.templates) {
    lines.push(generateColorCode(def, preset));
    lines.push(``);
  }

  // Export records
  lines.push(`// ${'═'.repeat(60)}`);
  lines.push(`// EXPORTS`);
  lines.push(`// ${'═'.repeat(60)}`);
  lines.push(``);

  lines.push(`export const ${batch.exportNames.templates}: Record<string, SpriteTemplate> = {`);
  for (const def of batch.templates) {
    const size = getTemplateSize(def);
    const constName = def.id.toUpperCase().replace(new RegExp(`_${size}$`), `_${size}`);
    lines.push(`  ${def.id}: ${constName},`);
  }
  lines.push(`};`);
  lines.push(``);

  lines.push(`export const ${batch.exportNames.schemes}: Record<string, ColorScheme> = {`);
  for (const def of batch.templates) {
    const size = getTemplateSize(def);
    const schemeName = def.id.replace(new RegExp(`_${size}$`), '');
    const constName = schemeName.toUpperCase() + '_COLORS';
    lines.push(`  ${schemeName}_default: ${constName},`);
  }
  lines.push(`};`);

  return lines.join('\n');
}

// ─── CLI ────────────────────────────────────────────────────────

async function main() {
  const batchFile = process.argv[2];

  if (!batchFile) {
    console.log('Usage: npx tsx scripts/templateGenerator.ts <batchFile.ts>');
    console.log('');
    console.log('Batch file should export default a BatchDefinition object.');
    console.log('Supports both ASCII grid and DSL draw formats.');
    console.log('Supports 16x16 and 32x32 sprite sizes.');
    console.log('See templateGenerator.ts header comment for format.');
    process.exit(1);
  }

  // Dynamic import of batch file (resolve relative to cwd)
  const path = await import('path');
  const resolved = path.resolve(process.cwd(), batchFile);
  const mod = await import(`file://${resolved.replace(/\\/g, '/')}`);
  const batch: BatchDefinition = mod.default;

  const sizes = new Set(batch.templates.map(t => getTemplateSize(t)));
  const sizeLabel = [...sizes].sort().join('/');

  console.error(`\n╔══════════════════════════════════════════════╗`);
  console.error(`║  Template Generator — ${batch.category.padEnd(22)}║`);
  console.error(`║  ${String(batch.templates.length).padStart(3)} templates (${sizeLabel}x${sizeLabel})${' '.repeat(Math.max(0, 19 - sizeLabel.length * 2))}║`);
  console.error(`╚══════════════════════════════════════════════╝\n`);

  // Validate all
  let allValid = true;
  const strictMode = process.argv.includes('--strict');
  for (const def of batch.templates) {
    const result = validate(def, batch.category);
    const size = getTemplateSize(def);
    const mode = def.draw ? 'DSL' : 'grid';
    const status = result.valid ? '✓' : '✗';
    const densityStr = (result.density * 100).toFixed(1).padStart(5) + '%';
    const qScore = (result as any).qualityScore as number | undefined;
    const qStr = qScore !== undefined ? `  quality:${qScore}/100` : '';
    console.error(`  ${status} ${def.id.padEnd(30)} ${String(result.pixelCount).padStart(4)}px  ${densityStr}  ${size}x${size}  ${mode}  roles:${result.roles.length}${qStr}`);

    if (result.warnings.length) {
      for (const w of result.warnings) console.error(`    ⚠ ${w}`);
    }
    if (result.errors.length) {
      for (const e of result.errors) console.error(`    ✗ ${e}`);
      allValid = false;
    }
    if (strictMode && qScore !== undefined && qScore < 70) {
      console.error(`    ✗ Quality score ${qScore} < 70 (strict mode)`);
      allValid = false;
    }
  }

  console.error('');

  if (!allValid) {
    console.error('❌ Validation failed. Fix errors above before generating.');
    process.exit(1);
  }

  // Check for ID collisions
  const ids = new Set<string>();
  for (const def of batch.templates) {
    if (ids.has(def.id)) {
      console.error(`❌ Duplicate template ID: ${def.id}`);
      process.exit(1);
    }
    ids.add(def.id);
  }

  // Generate output
  const output = generateBatchFile(batch);

  // Summary
  const totalPixels = batch.templates.reduce((sum, def) => {
    const r = validate(def);
    return sum + r.pixelCount;
  }, 0);
  const avgTotalPixels = batch.templates.reduce((sum, def) => sum + getTemplateSize(def) ** 2, 0);
  const avgDensity = totalPixels / avgTotalPixels;

  console.error(`✅ Generated ${batch.templates.length} templates`);
  console.error(`   Total pixels: ${totalPixels}`);
  console.error(`   Avg density:  ${(avgDensity * 100).toFixed(1)}%`);
  console.error(`   Output: stdout (pipe to file)`);
  console.error('');

  // Output to stdout
  console.log(output);
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
