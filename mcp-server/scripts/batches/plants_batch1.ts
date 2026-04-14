/**
 * Botanical expansion batch.
 * 90 new 16x16 plant templates to build a dedicated 100-template plants bundle.
 */
import type { BatchDefinition, CompactTemplate } from '../templateGenerator.js';

type Grid = string[][];
type Triad = { shadow: string; base: string; highlight: string };

interface Variant {
  id: string;
  description: string;
  a?: Triad;
  b?: Triad;
  c?: Triad;
}

function createGrid(): Grid {
  return Array.from({ length: 16 }, () => Array(16).fill('.'));
}

function paintRect(grid: Grid, ch: string, x1: number, y1: number, x2: number, y2: number): void {
  for (let y = y1; y <= y2; y++) {
    for (let x = x1; x <= x2; x++) {
      if (x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
    }
  }
}

function paintH(grid: Grid, ch: string, y: number, x1: number, x2: number): void {
  for (let x = x1; x <= x2; x++) {
    if (x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
  }
}

function paintV(grid: Grid, ch: string, x: number, y1: number, y2: number): void {
  for (let y = y1; y <= y2; y++) {
    if (x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
  }
}

function paintPoints(grid: Grid, ch: string, points: Array<[number, number]>): void {
  for (const [x, y] of points) {
    if (x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
  }
}

function paintDiamond(grid: Grid, ch: string, cx: number, cy: number, radius: number): void {
  for (let y = cy - radius; y <= cy + radius; y++) {
    for (let x = cx - radius; x <= cx + radius; x++) {
      const d = Math.abs(x - cx) + Math.abs(y - cy);
      if (d <= radius && x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
    }
  }
}

function toRows(grid: Grid): string[] {
  return grid.map((r) => r.join(''));
}

function makeTemplate(
  id: string,
  description: string,
  chars: CompactTemplate['chars'],
  colors: CompactTemplate['colors'],
  draw: (grid: Grid) => void,
): CompactTemplate {
  const grid = createGrid();
  draw(grid);
  return { id, description, grid: toRows(grid), chars, colors };
}

const COLORS = {
  leafA: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  leafB: { shadow: '#346524', base: '#6daa2c', highlight: '#deeed6' },
  leafC: { shadow: '#346524', base: '#4aa52c', highlight: '#dad45e' },
  stem: { shadow: '#346524', base: '#346524', highlight: '#6daa2c' },
  paper: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  bark: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  soil: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  water: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  pot: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  petalRed: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  petalPink: { shadow: '#442434', base: '#d04648', highlight: '#deeed6' },
  petalPurple: { shadow: '#30346d', base: '#597dce', highlight: '#d2aa99' },
  petalBlue: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  petalOrange: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  flowerCore: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  mushroomCap: { shadow: '#442434', base: '#d04648', highlight: '#d2aa99' },
  mushroomStem: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  cactus: { shadow: '#346524', base: '#6daa2c', highlight: '#deeed6' },
};

const PETAL_SET: Triad[] = [
  COLORS.petalRed,
  COLORS.petalPink,
  COLORS.petalPurple,
  COLORS.petalBlue,
  COLORS.petalOrange,
];

function makeBloom(v: Variant, i: number): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      P: { name: 'petals', role: 'accessory' },
      C: { name: 'flower_center', role: 'eye' },
      S: { name: 'stem', role: 'body' },
      L: { name: 'leaves', role: 'head' },
      G: { name: 'ground', role: 'belt' },
    },
    {
      accessory: v.a ?? PETAL_SET[i % PETAL_SET.length],
      eye: v.c ?? COLORS.flowerCore,
      body: COLORS.stem,
      head: v.b ?? COLORS.leafA,
      belt: COLORS.soil,
    },
    (g) => {
      const cfg = [
        { cx: 7, cy: 4, r: 2, stemX: 7, leaves: [[5, 9], [6, 10], [8, 10], [9, 11], [7, 12]] as Array<[number, number]> },
        { cx: 8, cy: 4, r: 3, stemX: 8, leaves: [[6, 9], [7, 10], [9, 10], [10, 11], [8, 12]] as Array<[number, number]> },
        { cx: 7, cy: 5, r: 2, stemX: 7, leaves: [[4, 9], [5, 10], [8, 9], [9, 10], [6, 12]] as Array<[number, number]> },
        { cx: 8, cy: 5, r: 3, stemX: 8, leaves: [[6, 8], [7, 9], [10, 9], [9, 11], [8, 12]] as Array<[number, number]> },
        { cx: 6, cy: 4, r: 2, stemX: 6, leaves: [[4, 8], [5, 9], [7, 10], [8, 11], [6, 12]] as Array<[number, number]> },
        { cx: 9, cy: 4, r: 3, stemX: 9, leaves: [[7, 8], [8, 9], [10, 10], [11, 11], [9, 12]] as Array<[number, number]> },
        { cx: 7, cy: 3, r: 2, stemX: 7, leaves: [[5, 8], [6, 9], [8, 9], [9, 10], [7, 12]] as Array<[number, number]> },
        { cx: 8, cy: 3, r: 3, stemX: 8, leaves: [[6, 8], [7, 9], [9, 9], [10, 10], [8, 12]] as Array<[number, number]> },
        { cx: 6, cy: 5, r: 2, stemX: 7, leaves: [[4, 10], [5, 11], [7, 10], [8, 11], [6, 12]] as Array<[number, number]> },
        { cx: 9, cy: 5, r: 3, stemX: 8, leaves: [[6, 9], [7, 10], [9, 11], [10, 10], [8, 12]] as Array<[number, number]> },
      ][i];

      paintDiamond(g, 'P', cfg.cx, cfg.cy, cfg.r + 1);
      paintDiamond(g, 'C', cfg.cx, cfg.cy, 1);
      paintV(g, 'S', cfg.stemX, cfg.cy + cfg.r + 1, 12);
      paintPoints(g, 'L', cfg.leaves);
      paintH(g, 'G', 13, 4 + (i % 2), 11 - (i % 2));
    },
  );
}

function makePotted(v: Variant, i: number): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      F: { name: 'foliage', role: 'body' },
      H: { name: 'leaf_highlight', role: 'head' },
      B: { name: 'buds', role: 'accessory' },
      P: { name: 'pot', role: 'belt' },
      S: { name: 'soil', role: 'arm' },
      D: { name: 'base_shadow', role: 'leg' },
    },
    {
      body: v.a ?? COLORS.leafA,
      head: v.b ?? COLORS.leafB,
      accessory: v.c ?? PETAL_SET[i % PETAL_SET.length],
      belt: COLORS.pot,
      arm: COLORS.soil,
      leg: COLORS.soil,
    },
    (g) => {
      const cfg = [
        { top: 2, spread: 2, shift: 0, potL: 5, potR: 10 },
        { top: 3, spread: 3, shift: -1, potL: 4, potR: 10 },
        { top: 1, spread: 3, shift: 1, potL: 5, potR: 11 },
        { top: 2, spread: 2, shift: -1, potL: 4, potR: 9 },
        { top: 2, spread: 4, shift: 0, potL: 5, potR: 10 },
        { top: 1, spread: 3, shift: 1, potL: 6, potR: 11 },
        { top: 2, spread: 2, shift: 0, potL: 5, potR: 10 },
        { top: 3, spread: 3, shift: -1, potL: 4, potR: 10 },
        { top: 1, spread: 4, shift: 0, potL: 5, potR: 11 },
        { top: 2, spread: 3, shift: 1, potL: 6, potR: 11 },
      ][i];

      for (let y = cfg.top; y <= 8; y++) {
        const taper = Math.floor((y - cfg.top) / 2);
        const w = Math.max(1, cfg.spread - taper);
        paintH(g, 'F', y, 8 + cfg.shift - w, 8 + cfg.shift + w);
      }

      paintPoints(g, 'H', [[7 + cfg.shift, cfg.top + 1], [8 + cfg.shift, cfg.top], [9 + cfg.shift, cfg.top + 2], [8 + cfg.shift, 6]]);
      paintPoints(g, 'B', [[6 + cfg.shift, cfg.top + 2], [10 + cfg.shift, cfg.top + 2], [8 + cfg.shift, cfg.top + 1]]);
      paintPoints(g, 'B', [[4 + (i % 8), 8 + Math.floor(i / 8)]]);
      paintRect(g, 'P', cfg.potL, 10, cfg.potR, 12);
      paintH(g, 'S', 10, cfg.potL, cfg.potR);
      paintH(g, 'D', 13, cfg.potL, cfg.potR);
    },
  );
}

function makeMushroom(v: Variant, i: number): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      C: { name: 'cap', role: 'body' },
      S: { name: 'spots', role: 'eye' },
      G: { name: 'gills', role: 'head' },
      T: { name: 'stem', role: 'arm' },
      M: { name: 'moss', role: 'belt' },
    },
    {
      body: v.a ?? COLORS.mushroomCap,
      eye: v.c ?? COLORS.paper,
      head: COLORS.petalOrange,
      arm: v.b ?? COLORS.mushroomStem,
      belt: COLORS.leafA,
    },
    (g) => {
      const cfg = [
        { cx: 8, cy: 5, r: 3, stemL: 7, stemR: 8 },
        { cx: 7, cy: 5, r: 4, stemL: 6, stemR: 7 },
        { cx: 8, cy: 4, r: 3, stemL: 7, stemR: 9 },
        { cx: 9, cy: 5, r: 4, stemL: 8, stemR: 9 },
        { cx: 8, cy: 6, r: 3, stemL: 7, stemR: 8 },
        { cx: 7, cy: 4, r: 4, stemL: 6, stemR: 8 },
        { cx: 8, cy: 5, r: 3, stemL: 7, stemR: 8 },
        { cx: 9, cy: 4, r: 4, stemL: 8, stemR: 9 },
        { cx: 8, cy: 6, r: 3, stemL: 7, stemR: 9 },
        { cx: 7, cy: 5, r: 4, stemL: 6, stemR: 7 },
      ][i];

      paintDiamond(g, 'C', cfg.cx, cfg.cy, cfg.r);
      paintH(g, 'G', cfg.cy + 2, cfg.cx - cfg.r, cfg.cx + cfg.r);
      paintRect(g, 'T', cfg.stemL, 8, cfg.stemR, 12);
      paintPoints(g, 'S', [[cfg.cx - 1, cfg.cy - 1], [cfg.cx, cfg.cy - 2], [cfg.cx + 1, cfg.cy], [cfg.cx - 2, cfg.cy + 1], [cfg.cx + 2, cfg.cy + 1]]);
      paintPoints(g, 'S', [[5 + (i % 6), 5 + Math.floor(i / 6)]]);
      paintH(g, 'M', 13, 4 + (i % 3), 11);
    },
  );
}

function makeCactus(v: Variant, i: number): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      C: { name: 'cactus_body', role: 'body' },
      R: { name: 'ribs', role: 'head' },
      S: { name: 'spines', role: 'eye' },
      F: { name: 'flower', role: 'accessory' },
      P: { name: 'pot', role: 'belt' },
      B: { name: 'pot_base', role: 'leg' },
    },
    {
      body: v.a ?? COLORS.cactus,
      head: v.b ?? COLORS.leafB,
      eye: COLORS.paper,
      accessory: v.c ?? PETAL_SET[(i + 2) % PETAL_SET.length],
      belt: COLORS.pot,
      leg: COLORS.soil,
    },
    (g) => {
      const cfg = [
        { l: 6, r: 9, laY: 5, raY: 6, potL: 5, potR: 10 },
        { l: 5, r: 10, laY: 6, raY: 7, potL: 4, potR: 11 },
        { l: 6, r: 9, laY: 4, raY: 7, potL: 5, potR: 10 },
        { l: 5, r: 10, laY: 5, raY: 8, potL: 4, potR: 11 },
        { l: 6, r: 9, laY: 6, raY: 5, potL: 5, potR: 10 },
        { l: 5, r: 10, laY: 7, raY: 6, potL: 4, potR: 11 },
        { l: 6, r: 9, laY: 5, raY: 8, potL: 5, potR: 10 },
        { l: 5, r: 10, laY: 6, raY: 9, potL: 4, potR: 11 },
        { l: 6, r: 9, laY: 4, raY: 6, potL: 5, potR: 10 },
        { l: 5, r: 10, laY: 7, raY: 8, potL: 4, potR: 11 },
      ][i];

      paintRect(g, 'C', cfg.l, 2, cfg.r, 10);
      paintRect(g, 'C', cfg.l - 2, cfg.laY, cfg.l - 1, cfg.laY + 3);
      paintRect(g, 'C', cfg.r + 1, cfg.raY, cfg.r + 2, cfg.raY + 3);
      paintV(g, 'R', 7, 3, 10);
      paintV(g, 'R', 8, 3, 10);
      paintPoints(g, 'S', [[cfg.l, 4], [cfg.r, 4], [cfg.l - 2, cfg.laY + 1], [cfg.r + 2, cfg.raY + 1], [7, 6], [8, 9]]);
      paintPoints(g, 'F', [[7, 1], [8, 1], [8, 0], [6 + (i % 3), 1]]);
      paintRect(g, 'P', cfg.potL, 11, cfg.potR, 12);
      paintH(g, 'B', 13, cfg.potL, cfg.potR);
    },
  );
}

function makeCrop(v: Variant, i: number): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      K: { name: 'grain_or_fruit', role: 'accessory' },
      T: { name: 'stalk', role: 'body' },
      L: { name: 'leaves', role: 'head' },
      N: { name: 'nodes', role: 'eye' },
      G: { name: 'ground', role: 'belt' },
    },
    {
      accessory: v.a ?? COLORS.flowerCore,
      body: COLORS.stem,
      head: v.b ?? COLORS.leafA,
      eye: v.c ?? COLORS.flowerCore,
      belt: COLORS.soil,
    },
    (g) => {
      if (v.id === 'botanica_crop_rye_bundle_16') {
        paintPoints(g, 'T', [[6, 4], [6, 5], [7, 6], [7, 7], [7, 8], [8, 9], [8, 10], [8, 11], [8, 12]]);
        paintPoints(g, 'T', [[10, 4], [10, 5], [9, 6], [9, 7], [9, 8], [8, 9], [8, 10], [8, 11], [8, 12]]);
        paintPoints(g, 'K', [[5, 3], [6, 3], [6, 2], [7, 4], [9, 3], [10, 3], [10, 2], [9, 4]]);
        paintPoints(g, 'L', [[5, 8], [6, 9], [10, 8], [9, 9], [7, 10], [9, 10]]);
        paintPoints(g, 'N', [[7, 7], [9, 7], [8, 9]]);
        paintH(g, 'G', 13, 4, 11);
        return;
      }

      if (v.id === 'botanica_crop_oat_stalks_16') {
        paintV(g, 'T', 6, 4, 12);
        paintV(g, 'T', 8, 3, 12);
        paintV(g, 'T', 10, 4, 12);
        paintPoints(g, 'K', [[7, 2], [8, 2], [9, 2], [9, 3], [10, 3], [5, 3], [6, 3], [11, 4]]);
        paintPoints(g, 'L', [[5, 7], [7, 8], [9, 7], [11, 8], [6, 10], [10, 10]]);
        paintPoints(g, 'N', [[6, 6], [8, 7], [10, 8], [8, 10]]);
        paintH(g, 'G', 13, 4, 11);
        return;
      }

      if (v.id === 'botanica_crop_reed_grain_16') {
        paintV(g, 'T', 5, 5, 12);
        paintV(g, 'T', 7, 4, 12);
        paintV(g, 'T', 9, 5, 12);
        paintV(g, 'T', 11, 4, 12);
        paintPoints(g, 'K', [[5, 4], [7, 3], [9, 4], [11, 3], [6, 3], [10, 3]]);
        paintPoints(g, 'L', [[4, 8], [6, 9], [8, 8], [10, 9], [12, 8], [7, 10], [9, 10]]);
        paintPoints(g, 'N', [[5, 7], [7, 8], [9, 7], [11, 8]]);
        paintH(g, 'G', 13, 3, 12);
        return;
      }

      if (v.id === 'botanica_crop_barley_stalks_16') {
        paintV(g, 'T', 5, 4, 12);
        paintV(g, 'T', 7, 3, 12);
        paintV(g, 'T', 9, 4, 12);
        paintPoints(g, 'K', [[5, 2], [6, 2], [7, 1], [7, 2], [8, 2], [9, 2], [10, 2], [9, 3]]);
        paintPoints(g, 'L', [[4, 7], [6, 8], [8, 7], [10, 8], [6, 10], [8, 10], [10, 9]]);
        paintPoints(g, 'N', [[5, 6], [7, 7], [9, 8], [7, 10]]);
        paintH(g, 'G', 13, 4, 11);
        return;
      }

      if (v.id === 'botanica_crop_harvest_stems_16') {
        paintV(g, 'T', 5, 5, 11);
        paintV(g, 'T', 8, 4, 11);
        paintV(g, 'T', 11, 5, 11);
        paintPoints(g, 'K', [[5, 4], [8, 3], [11, 4], [6, 3], [10, 3], [8, 2]]);
        paintPoints(g, 'L', [[4, 8], [6, 9], [10, 9], [12, 8], [7, 10], [9, 10]]);
        paintPoints(g, 'N', [[5, 7], [8, 8], [11, 7], [8, 10]]);
        paintH(g, 'G', 12, 4, 12);
        paintH(g, 'G', 13, 3, 12);
        return;
      }

      const cfg = [
        { x0: 4, top: 2 }, { x0: 5, top: 1 }, { x0: 4, top: 1 }, { x0: 5, top: 2 }, { x0: 4, top: 2 },
        { x0: 5, top: 1 }, { x0: 4, top: 2 }, { x0: 5, top: 1 }, { x0: 4, top: 1 }, { x0: 5, top: 2 },
      ][i];
      const x0 = cfg.x0;
      paintV(g, 'T', x0, 4, 12);
      paintV(g, 'T', x0 + 2, 3, 12);
      paintV(g, 'T', x0 + 4, 4, 12);
      paintPoints(g, 'K', [[x0, cfg.top + 1], [x0 + 1, cfg.top + 2], [x0 + 2, cfg.top], [x0 + 2, cfg.top + 1], [x0 + 4, cfg.top + 1], [x0 + 4, cfg.top + 2], [x0 + 3, cfg.top + 2]]);
      paintPoints(g, 'L', [[x0 - 1, 7], [x0 + 1, 8], [x0 + 3, 7], [x0 + 5, 8], [x0 + (i % 2), 10], [x0 + 3, 10], [x0 + 2, 9]]);
      paintPoints(g, 'N', [[x0, 6], [x0 + 2, 7], [x0 + 4, 8], [x0 + 2, 10]]);
      const marker = [[4, 9], [5, 10], [6, 9], [7, 10], [8, 9], [9, 10], [10, 9], [11, 10], [6, 11], [9, 11]][i] as [number, number];
      paintPoints(g, 'N', [marker]);
      paintH(g, 'G', 13, 3 + (i % 2), 12 - (i % 2));
    },
  );
}

function makeTree(v: Variant, i: number): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      C: { name: 'canopy', role: 'body' },
      H: { name: 'canopy_light', role: 'head' },
      T: { name: 'trunk', role: 'arm' },
      F: { name: 'fruit_or_flowers', role: 'accessory' },
      R: { name: 'roots', role: 'belt' },
    },
    {
      body: v.a ?? COLORS.leafA,
      head: v.b ?? COLORS.leafB,
      arm: COLORS.bark,
      accessory: v.c ?? PETAL_SET[i % PETAL_SET.length],
      belt: COLORS.soil,
    },
    (g) => {
      const cfg = [
        { cx: 7, cy: 5, r: 3, trunkL: 7, trunkR: 8 },
        { cx: 8, cy: 5, r: 4, trunkL: 7, trunkR: 8 },
        { cx: 8, cy: 4, r: 3, trunkL: 7, trunkR: 8 },
        { cx: 7, cy: 4, r: 4, trunkL: 6, trunkR: 8 },
        { cx: 9, cy: 5, r: 3, trunkL: 8, trunkR: 9 },
        { cx: 8, cy: 6, r: 4, trunkL: 7, trunkR: 8 },
        { cx: 7, cy: 5, r: 3, trunkL: 6, trunkR: 7 },
        { cx: 9, cy: 4, r: 4, trunkL: 8, trunkR: 9 },
        { cx: 8, cy: 5, r: 3, trunkL: 7, trunkR: 9 },
        { cx: 8, cy: 4, r: 4, trunkL: 7, trunkR: 8 },
      ][i];

      paintDiamond(g, 'C', cfg.cx, cfg.cy, cfg.r);
      paintDiamond(g, 'H', cfg.cx, cfg.cy, cfg.r - 1);
      paintPoints(g, 'C', [[cfg.cx - 2, cfg.cy + 2], [cfg.cx + 2, cfg.cy + 2], [cfg.cx - 1, cfg.cy - 2], [cfg.cx + 1, cfg.cy - 2]]);
      paintRect(g, 'T', cfg.trunkL, 8, cfg.trunkR, 12);
      paintPoints(g, 'F', [[cfg.cx - 2, cfg.cy - 1], [cfg.cx + 1, cfg.cy - 1], [cfg.cx - 1, cfg.cy + 1], [cfg.cx + 2, cfg.cy + 1]]);
      paintH(g, 'R', 13, cfg.trunkL - 1, cfg.trunkR + 1);
    },
  );
}

function makeVine(v: Variant, i: number): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      V: { name: 'main_vine', role: 'body' },
      L: { name: 'leaves', role: 'head' },
      T: { name: 'tendrils', role: 'arm' },
      F: { name: 'buds', role: 'eye' },
      A: { name: 'anchor', role: 'belt' },
    },
    {
      body: v.a ?? COLORS.stem,
      head: v.b ?? COLORS.leafA,
      arm: COLORS.leafB,
      eye: v.c ?? PETAL_SET[(i + 1) % PETAL_SET.length],
      belt: COLORS.soil,
    },
    (g) => {
      const amp = 1 + (i % 3);
      const freq = 2.2 + ((i % 4) * 0.35);
      const phase = i * 0.6;
      const base = 7 + (i % 2 === 0 ? 0 : 1);
      const vinePoints: Array<[number, number]> = [];

      for (let y = 0; y <= 14; y++) {
        const x = base + Math.round(Math.sin((y + phase) / freq) * amp);
        vinePoints.push([x, y]);
        if (y % 3 === 0) vinePoints.push([x + (y % 6 === 0 ? 1 : -1), y]);
        if (y % 5 === 0) vinePoints.push([x, y + 1]);
      }
      paintPoints(g, 'V', vinePoints);

      const leafPoints: Array<[number, number]> = [];
      const tendrils: Array<[number, number]> = [];
      for (let y = 2; y <= 13; y += 2) {
        const x = base + Math.round(Math.sin((y + phase) / freq) * amp);
        const side = (y + i) % 4 < 2 ? -1 : 1;
        leafPoints.push([x + side, y], [x + side * 2, y + (y % 3 === 0 ? 0 : 1)], [x + side, y + 1]);
        if (y % 4 === 2) tendrils.push([x - side * 2, y - 1]);
      }
      paintPoints(g, 'L', leafPoints);
      paintPoints(g, 'T', tendrils);
      paintPoints(g, 'F', [[base, 3 + (i % 3)], [base + (i % 2 ? 1 : -1), 8], [base, 12]]);
      paintPoints(g, 'A', [[base - 1, 15], [base, 15], [base + 1, 15]]);
    },
  );
}

function makeAquatic(v: Variant, i: number): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      P: { name: 'pad_or_reed', role: 'body' },
      F: { name: 'flower', role: 'accessory' },
      W: { name: 'water', role: 'head' },
      R: { name: 'ripples', role: 'eye' },
      S: { name: 'stems', role: 'arm' },
      M: { name: 'mud', role: 'belt' },
    },
    {
      body: v.a ?? COLORS.leafA,
      accessory: v.c ?? PETAL_SET[i % PETAL_SET.length],
      head: COLORS.water,
      eye: COLORS.paper,
      arm: COLORS.stem,
      belt: COLORS.soil,
    },
    (g) => {
      if (v.id === 'botanica_aquatic_lotus_16') {
        paintDiamond(g, 'P', 8, 9, 3);
        paintPoints(g, 'P', [[6, 8], [10, 8], [7, 10], [9, 10]]);
        paintPoints(g, 'F', [[8, 5], [7, 6], [8, 6], [9, 6], [8, 7]]);
        paintV(g, 'S', 8, 8, 12);
        paintH(g, 'W', 12, 3, 12);
        paintPoints(g, 'R', [[5, 11], [8, 11], [10, 11], [12, 11]]);
        paintH(g, 'M', 13, 4, 11);
        return;
      }

      if (v.id === 'botanica_aquatic_bloom_pink_16') {
        paintDiamond(g, 'P', 7, 9, 2);
        paintDiamond(g, 'P', 10, 9, 2);
        paintPoints(g, 'F', [[8, 6], [9, 6], [7, 7], [8, 7], [9, 7], [10, 7], [8, 8], [9, 8]]);
        paintPoints(g, 'S', [[8, 9], [9, 9], [8, 10], [9, 10], [8, 11], [9, 11]]);
        paintH(g, 'W', 12, 4, 11);
        paintPoints(g, 'R', [[5, 11], [7, 11], [10, 11], [12, 11]]);
        paintH(g, 'M', 13, 5, 10);
        return;
      }

      if (v.id === 'botanica_aquatic_reed_small_16') {
        paintV(g, 'S', 6, 5, 11);
        paintV(g, 'S', 8, 4, 11);
        paintV(g, 'S', 10, 5, 11);
        paintPoints(g, 'P', [[6, 7], [8, 6], [10, 7], [7, 9], [9, 9]]);
        paintPoints(g, 'F', [[8, 4], [7, 5], [9, 5]]);
        paintH(g, 'W', 12, 4, 11);
        paintPoints(g, 'R', [[5, 11], [8, 11], [10, 11]]);
        paintH(g, 'M', 13, 5, 10);
        return;
      }

      if (v.id === 'botanica_aquatic_river_reeds_16') {
        paintV(g, 'S', 4, 5, 11);
        paintV(g, 'S', 6, 4, 11);
        paintV(g, 'S', 8, 3, 11);
        paintV(g, 'S', 10, 4, 11);
        paintV(g, 'S', 12, 5, 11);
        paintPoints(g, 'P', [[4, 7], [6, 6], [8, 5], [10, 6], [12, 7], [5, 9], [7, 8], [9, 9], [11, 8]]);
        paintPoints(g, 'F', [[8, 3], [7, 4], [9, 4]]);
        paintH(g, 'W', 12, 3, 12);
        paintPoints(g, 'R', [[4, 11], [6, 11], [8, 11], [10, 11], [12, 11]]);
        paintH(g, 'M', 13, 4, 11);
        return;
      }

      const mode = i % 5;
      if (mode === 0) {
        paintDiamond(g, 'P', 8, 8, 3);
        paintPoints(g, 'F', [[8, 6], [7, 7], [8, 7], [9, 7], [8, 8]]);
        paintV(g, 'S', 8, 9, 12);
      } else if (mode === 1) {
        paintV(g, 'S', 6, 3, 11);
        paintV(g, 'S', 8, 2, 11);
        paintV(g, 'S', 10, 4, 11);
        paintPoints(g, 'P', [[6, 5], [8, 4], [10, 6], [6, 8], [8, 7], [10, 9], [7, 10], [9, 10]]);
        paintPoints(g, 'F', [[8, 2], [7, 3], [9, 3]]);
      } else if (mode === 2) {
        paintDiamond(g, 'P', 7, 8, 2);
        paintDiamond(g, 'P', 10, 8, 2);
        paintPoints(g, 'F', [[8, 7], [9, 7], [8, 8]]);
        paintV(g, 'S', 8, 8, 12);
      } else if (mode === 3) {
        paintV(g, 'S', 5, 4, 11);
        paintV(g, 'S', 7, 3, 11);
        paintV(g, 'S', 9, 2, 11);
        paintV(g, 'S', 11, 4, 11);
        paintPoints(g, 'P', [[7, 5], [9, 4], [11, 6], [5, 7], [7, 8], [9, 9], [11, 8]]);
        paintPoints(g, 'F', [[9, 2], [8, 3], [10, 3]]);
      } else {
        paintDiamond(g, 'P', 8, 9, 3);
        paintPoints(g, 'F', [[7, 8], [8, 7], [9, 8], [8, 9]]);
        paintV(g, 'S', 8, 10, 12);
      }
      paintH(g, 'W', 12, 3 + (i % 2), 12 - (i % 2));
      paintPoints(g, 'R', [[5, 11], [8, 11], [10, 11], [12, 11]]);
      paintH(g, 'M', 13, 4 + (i % 2), 11 - (i % 2));
    },
  );
}

function makeHerb(v: Variant, i: number): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      L: { name: 'leaf_cluster', role: 'body' },
      H: { name: 'highlight', role: 'head' },
      B: { name: 'buds', role: 'accessory' },
      S: { name: 'stems', role: 'arm' },
      G: { name: 'ground', role: 'belt' },
    },
    {
      body: v.a ?? COLORS.leafA,
      head: v.b ?? COLORS.leafB,
      accessory: v.c ?? PETAL_SET[(i + 3) % PETAL_SET.length],
      arm: COLORS.stem,
      belt: COLORS.soil,
    },
    (g) => {
      if (v.id === 'botanica_herb_dill_16') {
        paintDiamond(g, 'L', 6, 6, 2);
        paintDiamond(g, 'L', 9, 7, 3);
        paintPoints(g, 'H', [[6, 5], [9, 5], [8, 7], [10, 8], [7, 8]]);
        paintPoints(g, 'B', [[5, 4], [10, 4], [8, 3], [9, 4], [7, 4]]);
        paintPoints(g, 'S', [[7, 10], [8, 10], [9, 10], [8, 11], [8, 12], [7, 12], [9, 12]]);
        paintH(g, 'G', 13, 5, 10);
        return;
      }

      const cfg = [
        { c1: 7, c2: 9, r: 3 },
        { c1: 6, c2: 8, r: 3 },
        { c1: 7, c2: 10, r: 2 },
        { c1: 6, c2: 9, r: 3 },
        { c1: 7, c2: 9, r: 2 },
        { c1: 6, c2: 8, r: 3 },
        { c1: 7, c2: 10, r: 3 },
        { c1: 6, c2: 9, r: 2 },
        { c1: 7, c2: 9, r: 3 },
        { c1: 6, c2: 10, r: 2 },
      ][i];
      paintDiamond(g, 'L', cfg.c1, 7, cfg.r);
      paintDiamond(g, 'L', cfg.c2, 7, cfg.r);
      paintPoints(g, 'H', [[cfg.c1, 6], [8, 5], [cfg.c2, 6], [8, 8], [7, 7], [9, 7]]);
      paintPoints(g, 'B', [[cfg.c1 - 1, 4], [cfg.c2 + 1, 4], [8, 3], [7, 4]]);
      const herbMarker = [[4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [6, 10], [9, 10]][i] as [number, number];
      paintPoints(g, 'B', [herbMarker]);
      paintPoints(g, 'S', [[7, 10], [8, 10], [9, 10], [8, 11], [8, 12], [7, 12], [9, 12]]);
      paintH(g, 'G', 13, 4 + (i % 2), 11 - (i % 2));
    },
  );
}

const bloomVariants: Variant[] = [
  { id: 'botanica_wild_rose_cluster_16', description: 'Wild rose cluster with layered petals and long stem.' },
  { id: 'botanica_meadow_daisy_16', description: 'Meadow daisy bloom with bright center and slim leaves.' },
  { id: 'botanica_evening_tulip_16', description: 'Evening tulip profile with warm petal gradient.' },
  { id: 'botanica_mountain_aster_16', description: 'Mountain aster with compact petals and dense center.' },
  { id: 'botanica_bluebell_stem_16', description: 'Bluebell stem with hanging bell-shaped petals.' },
  { id: 'botanica_marigold_head_16', description: 'Marigold-like flower with packed rounded petals.' },
  { id: 'botanica_lilac_bloom_16', description: 'Lilac bloom silhouette with soft clustered petals.' },
  { id: 'botanica_camellia_flower_16', description: 'Camellia flower icon for ornamental garden scenes.' },
  { id: 'botanica_cosmos_flower_16', description: 'Cosmos-style bloom with airy petal spread.' },
  { id: 'botanica_garden_peony_16', description: 'Peony-inspired blossom with rich center contrast.' },
];

const pottedVariants: Variant[] = [
  { id: 'botanica_potted_fern_16', description: 'Potted fern with layered fronds and clay base.' },
  { id: 'botanica_potted_ivy_16', description: 'Potted ivy mound with creeping side leaves.' },
  { id: 'botanica_potted_mint_16', description: 'Mint pot for kitchen herb and cafe scenes.' },
  { id: 'botanica_potted_basil_16', description: 'Basil pot with broad aromatic leaves.' },
  { id: 'botanica_potted_sage_16', description: 'Sage pot with rounded leaf clusters.' },
  { id: 'botanica_potted_lavender_16', description: 'Lavender pot with tiny blossoms over foliage.' },
  { id: 'botanica_potted_blossom_16', description: 'Decorative blossom pot for interiors and porches.' },
  { id: 'botanica_potted_reed_16', description: 'Tall reed pot for vertical botanical accents.' },
  { id: 'botanica_potted_sprout_mix_16', description: 'Mixed sprout pot with colorful small buds.' },
  { id: 'botanica_potted_greenery_16', description: 'General greenery pot for cozy room decoration.' },
];

const mushroomVariants: Variant[] = [
  { id: 'botanica_mushroom_redcap_16', description: 'Classic red cap mushroom with pale stem.' },
  { id: 'botanica_mushroom_goldcap_16', description: 'Golden cap mushroom for fantasy forest floors.' },
  { id: 'botanica_mushroom_azurecap_16', description: 'Azure cap mushroom with cool-tone spots.' },
  { id: 'botanica_mushroom_mosscap_16', description: 'Mossy cap mushroom with earthy palette.' },
  { id: 'botanica_mushroom_tallcap_16', description: 'Tall cap mushroom silhouette for variation.' },
  { id: 'botanica_mushroom_roundcap_16', description: 'Round cap mushroom with dense spot pattern.' },
  { id: 'botanica_mushroom_toadstool_16', description: 'Toadstool variant with oversized cap edge.' },
  { id: 'botanica_mushroom_forest_16', description: 'Forest floor mushroom for damp biome sets.' },
  { id: 'botanica_mushroom_glow_16', description: 'Subtle glow mushroom for magical biomes.' },
  { id: 'botanica_mushroom_cluster_16', description: 'Mushroom cluster icon with layered caps.' },
];

const cactusVariants: Variant[] = [
  { id: 'botanica_cactus_saguaro_16', description: 'Saguaro-like cactus with dual arms and bloom.' },
  { id: 'botanica_cactus_barrel_16', description: 'Barrel cactus silhouette with compact profile.' },
  { id: 'botanica_cactus_column_16', description: 'Column cactus variant for desert landscaping.' },
  { id: 'botanica_cactus_branching_16', description: 'Branching cactus with asymmetrical arm layout.' },
  { id: 'botanica_cactus_pink_bloom_16', description: 'Cactus with bright pink desert flower.' },
  { id: 'botanica_cactus_orange_bloom_16', description: 'Cactus with warm orange flowering top.' },
  { id: 'botanica_cactus_stonepot_16', description: 'Cactus set in a sturdy stone-like pot.' },
  { id: 'botanica_cactus_tallpot_16', description: 'Tall pot cactus with vertical emphasis.' },
  { id: 'botanica_cactus_clusterpot_16', description: 'Clustered cactus heads inside a shared pot.' },
  { id: 'botanica_cactus_spine_dense_16', description: 'Dense-spine cactus for harsher biome tone.' },
];

const cropVariants: Variant[] = [
  { id: 'botanica_crop_wheat_bundle_16', description: 'Wheat bundle with ripe grain heads.' },
  { id: 'botanica_crop_rye_bundle_16', description: 'Rye stalk bundle with slimmer grains.' },
  { id: 'botanica_crop_oat_stalks_16', description: 'Oat stalks with airy top grain clusters.' },
  { id: 'botanica_crop_corn_patch_16', description: 'Corn patch icon with broad leaf blades.' },
  { id: 'botanica_crop_barley_stalks_16', description: 'Barley stalks for farm and field scenes.' },
  { id: 'botanica_crop_sorghum_stalks_16', description: 'Sorghum-like stalks with compact seed tops.' },
  { id: 'botanica_crop_reed_grain_16', description: 'Reed-grain hybrid for wetland farming setups.' },
  { id: 'botanica_crop_millet_heads_16', description: 'Millet heads with dense clustered grains.' },
  { id: 'botanica_crop_seedling_rows_16', description: 'Young crop rows for early-growth visuals.' },
  { id: 'botanica_crop_harvest_stems_16', description: 'Harvest-ready stems with heavy grain weight.' },
];

const treeVariants: Variant[] = [
  { id: 'botanica_tree_sapling_oak_16', description: 'Young oak sapling with rounded canopy.' },
  { id: 'botanica_tree_sapling_pine_16', description: 'Pine-like sapling with tighter crown.' },
  { id: 'botanica_tree_sapling_maple_16', description: 'Maple sapling with broad clustered leaves.' },
  { id: 'botanica_tree_sapling_willow_16', description: 'Willow sapling silhouette for soft canopies.' },
  { id: 'botanica_tree_sapling_fruit_16', description: 'Fruit sapling with colored orchard accents.' },
  { id: 'botanica_tree_sapling_dense_16', description: 'Dense canopy sapling for forest biomes.' },
  { id: 'botanica_tree_sapling_light_16', description: 'Light canopy sapling with airy silhouette.' },
  { id: 'botanica_tree_sapling_redfruit_16', description: 'Red-fruit sapling for decorative groves.' },
  { id: 'botanica_tree_sapling_goldfruit_16', description: 'Gold-fruit sapling with warm highlight cues.' },
  { id: 'botanica_tree_sapling_flower_16', description: 'Flowering sapling for spring-themed scenes.' },
];

const vineVariants: Variant[] = [
  { id: 'botanica_vine_hanging_short_16', description: 'Short hanging vine with alternating leaf rhythm.' },
  { id: 'botanica_vine_hanging_long_16', description: 'Long hanging vine suited for walls and arches.' },
  { id: 'botanica_vine_flower_buds_16', description: 'Vine with tiny buds for garden trellises.' },
  { id: 'botanica_vine_thick_leaf_16', description: 'Thick-leaf vine with denser foliage nodes.' },
  { id: 'botanica_vine_curling_16', description: 'Curling vine silhouette with tendril hooks.' },
  { id: 'botanica_vine_wild_16', description: 'Wild vine for overgrown ruins and corners.' },
  { id: 'botanica_vine_wallpatch_16', description: 'Wallpatch vine for vertical green accents.' },
  { id: 'botanica_vine_balcony_16', description: 'Balcony vine style with drooping leaf pattern.' },
  { id: 'botanica_vine_jungle_16', description: 'Jungle vine with stronger body curve.' },
  { id: 'botanica_vine_trellis_16', description: 'Trellis vine intended for structured supports.' },
];

const aquaticVariants: Variant[] = [
  { id: 'botanica_aquatic_lilypad_16', description: 'Lily pad bloom floating on calm water.' },
  { id: 'botanica_aquatic_reed_small_16', description: 'Small reed clump with thin stem rhythm.' },
  { id: 'botanica_aquatic_reed_tall_16', description: 'Tall reed cluster for marsh edges.' },
  { id: 'botanica_aquatic_lotus_16', description: 'Lotus-style water flower with central bloom.' },
  { id: 'botanica_aquatic_pond_flower_16', description: 'Pond flower icon for tranquil biomes.' },
  { id: 'botanica_aquatic_marsh_grass_16', description: 'Marsh grass patch with watery base ripples.' },
  { id: 'botanica_aquatic_river_reeds_16', description: 'River reed silhouette for shoreline scenes.' },
  { id: 'botanica_aquatic_bloom_blue_16', description: 'Blue aquatic bloom with bright center detail.' },
  { id: 'botanica_aquatic_bloom_pink_16', description: 'Pink aquatic bloom for decorative ponds.' },
  { id: 'botanica_aquatic_wetland_16', description: 'Wetland plant icon for swamp biome kits.' },
];

const herbVariants: Variant[] = [
  { id: 'botanica_herb_rosemary_16', description: 'Rosemary-like herb tuft with aromatic needles.' },
  { id: 'botanica_herb_thyme_16', description: 'Thyme-like herb clump with tiny top buds.' },
  { id: 'botanica_herb_oregano_16', description: 'Oregano herb mound with broad clustered leaves.' },
  { id: 'botanica_herb_chives_16', description: 'Chive herb bundle with upright sprout feel.' },
  { id: 'botanica_herb_parsley_16', description: 'Parsley-like herb with dense rounded leaf mass.' },
  { id: 'botanica_herb_dill_16', description: 'Dill-inspired herb shape with airy top spread.' },
  { id: 'botanica_herb_mint_patch_16', description: 'Mint patch icon for tea and kitchen themes.' },
  { id: 'botanica_herb_basil_patch_16', description: 'Basil patch icon with fuller rounded silhouette.' },
  { id: 'botanica_herb_sage_patch_16', description: 'Sage patch icon with muted herbal highlights.' },
  { id: 'botanica_herb_mixed_patch_16', description: 'Mixed herb patch for gardening scene variety.' },
];

const templates: CompactTemplate[] = [
  ...bloomVariants.map((v, i) => makeBloom(v, i)),
  ...pottedVariants.map((v, i) => makePotted(v, i)),
  ...mushroomVariants.map((v, i) => makeMushroom(v, i)),
  ...cactusVariants.map((v, i) => makeCactus(v, i)),
  ...cropVariants.map((v, i) => makeCrop(v, i)),
  ...treeVariants.map((v, i) => makeTree(v, i)),
  ...vineVariants.map((v, i) => makeVine(v, i)),
  ...aquaticVariants.map((v, i) => makeAquatic(v, i)),
  ...herbVariants.map((v, i) => makeHerb(v, i)),
];

const batch: BatchDefinition = {
  category: 'plants',
  exportNames: {
    templates: 'PLANT_BATCH1_TEMPLATES',
    schemes: 'PLANT_BATCH1_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
