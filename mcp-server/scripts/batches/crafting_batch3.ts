/**
 * Crafting & Workshop batch 3 — Ingredients & Materials.
 * 20 original 16x16 templates — ores, ingots, gems, herbs, dyes, fibers.
 * All 16x16, DB16 palette only.
 */
import type { BatchDefinition, CompactTemplate } from '../templateGenerator.js';

type Grid = string[][];

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

function toRows(grid: Grid): string[] {
  return grid.map((row) => row.join(''));
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

// ─── Color palettes ─────────────────────────────────────────────
const C = {
  wood:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  darkWood:  { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  iron:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  darkIron:  { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  stone:     { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  gold:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  fire:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  embers:    { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  leather:   { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  paper:     { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  green:     { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  blue:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  clay:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  glass:     { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  rope:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  black:     { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  brass:     { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  copper:    { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  purple:    { shadow: '#442434', base: '#30346d', highlight: '#597dce' },
  ruby:      { shadow: '#442434', base: '#d04648', highlight: '#d2aa99' },
  bone:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
};

const templates: CompactTemplate[] = [
  // ── 1. ORE CHUNK RAW ───────────────────────────────────────────
  makeTemplate(
    'ore_chunk_raw_16',
    'Rough unprocessed ore chunk with visible metal veins and rocky surface.',
    {
      R: { name: 'rock_body', role: 'body' },
      V: { name: 'metal_veins', role: 'head' },
      S: { name: 'surface_cracks', role: 'accessory' },
      G: { name: 'glint_spots', role: 'eye' },
    },
    {
      body: C.stone,
      head: C.iron,
      accessory: C.darkIron,
      eye: C.gold,
    },
    (g) => {
      // Rock body (irregular)
      paintRect(g, 'R', 3, 4, 12, 12);
      paintH(g, 'R', 3, 5, 11);
      paintH(g, 'R', 13, 4, 11);
      paintV(g, 'R', 2, 6, 10);
      paintV(g, 'R', 13, 6, 10);
      // Metal veins
      paintPoints(g, 'V', [[5, 5], [6, 6], [7, 7], [8, 7], [9, 8], [10, 9]]);
      paintPoints(g, 'V', [[4, 9], [5, 10], [6, 10], [7, 11]]);
      // Surface cracks
      paintPoints(g, 'S', [[8, 4], [11, 6], [4, 7], [12, 10]]);
      // Glint spots
      paintPoints(g, 'G', [[6, 5], [9, 7], [5, 10]]);
    },
  ),

  // ── 2. IRON INGOT ──────────────────────────────────────────────
  makeTemplate(
    'iron_ingot_16',
    'Trapezoidal iron ingot bar with forged surface and stamp mark.',
    {
      B: { name: 'ingot_body', role: 'body' },
      T: { name: 'top_face', role: 'head' },
      S: { name: 'stamp_mark', role: 'accessory' },
      E: { name: 'side_edge', role: 'arm' },
    },
    {
      body: C.iron,
      head: C.iron,
      accessory: C.darkIron,
      arm: C.darkIron,
    },
    (g) => {
      // Top face (trapezoid top)
      paintRect(g, 'T', 4, 5, 11, 7);
      paintH(g, 'T', 4, 5, 10);
      // Body (main block)
      paintRect(g, 'B', 3, 8, 12, 11);
      paintH(g, 'B', 7, 4, 11);
      // Side edges
      paintV(g, 'E', 3, 8, 11);
      paintV(g, 'E', 12, 8, 11);
      paintH(g, 'E', 12, 3, 12);
      // Stamp mark
      paintPoints(g, 'S', [[7, 9], [8, 9], [7, 10], [8, 10]]);
    },
  ),

  // ── 3. GOLD BAR ────────────────────────────────────────────────
  makeTemplate(
    'gold_bar_16',
    'Gleaming gold bar with beveled edges and royal hallmark stamp.',
    {
      B: { name: 'bar_body', role: 'body' },
      T: { name: 'top_bevel', role: 'head' },
      S: { name: 'hallmark', role: 'accessory' },
      G: { name: 'gleam', role: 'eye' },
    },
    {
      body: C.gold,
      head: C.embers,
      accessory: C.fire,
      eye: C.paper,
    },
    (g) => {
      // Top bevel
      paintRect(g, 'T', 4, 5, 11, 6);
      paintH(g, 'T', 4, 5, 10);
      // Bar body
      paintRect(g, 'B', 3, 7, 12, 11);
      paintH(g, 'B', 12, 4, 11);
      // Hallmark stamp
      paintPoints(g, 'S', [[7, 9], [8, 9], [7, 10], [8, 10]]);
      // Gleam
      paintPoints(g, 'G', [[5, 5], [6, 5]]);
    },
  ),

  // ── 4. COPPER WIRE COIL ────────────────────────────────────────
  makeTemplate(
    'copper_wire_coil_16',
    'Coiled copper wire with loose end and metallic sheen.',
    {
      C: { name: 'coil_body', role: 'body' },
      W: { name: 'wire_end', role: 'head' },
      S: { name: 'sheen', role: 'accessory' },
      H: { name: 'coil_hole', role: 'arm' },
    },
    {
      body: C.copper,
      head: C.brass,
      accessory: C.gold,
      arm: C.darkWood,
    },
    (g) => {
      // Coil body (donut shape)
      paintH(g, 'C', 4, 5, 10);
      paintH(g, 'C', 5, 4, 11);
      paintV(g, 'C', 3, 6, 10);
      paintV(g, 'C', 4, 5, 11);
      paintV(g, 'C', 11, 5, 11);
      paintV(g, 'C', 12, 6, 10);
      paintH(g, 'C', 11, 4, 11);
      paintH(g, 'C', 12, 5, 10);
      // Hole in center
      paintRect(g, 'H', 6, 7, 9, 9);
      // Fill coil ring gaps
      paintRect(g, 'C', 5, 6, 10, 10);
      paintRect(g, 'H', 6, 7, 9, 9);
      // Sheen highlights
      paintPoints(g, 'S', [[5, 5], [6, 5], [5, 6]]);
      // Wire end trailing
      paintPoints(g, 'W', [[12, 8], [13, 7], [14, 6], [14, 5]]);
    },
  ),

  // ── 5. GEM ROUGH ───────────────────────────────────────────────
  makeTemplate(
    'gem_rough_16',
    'Uncut rough gemstone with natural crystal faces and inclusions.',
    {
      B: { name: 'gem_body', role: 'body' },
      F: { name: 'crystal_faces', role: 'head' },
      I: { name: 'inclusions', role: 'accessory' },
      G: { name: 'glint', role: 'eye' },
    },
    {
      body: C.purple,
      head: C.blue,
      accessory: C.darkIron,
      eye: C.paper,
    },
    (g) => {
      // Gem body (irregular crystal shape)
      paintRect(g, 'B', 5, 4, 10, 12);
      paintH(g, 'B', 3, 6, 9);
      paintH(g, 'B', 13, 6, 9);
      paintV(g, 'B', 4, 5, 11);
      paintV(g, 'B', 11, 5, 11);
      // Crystal faces (lighter facets)
      paintPoints(g, 'F', [[6, 4], [7, 4], [8, 4], [5, 5], [6, 5]]);
      paintPoints(g, 'F', [[5, 6], [5, 7]]);
      // Inclusions
      paintPoints(g, 'I', [[8, 8], [7, 10], [9, 9]]);
      // Glint
      paintPoints(g, 'G', [[6, 5], [7, 4]]);
    },
  ),

  // ── 6. GEM CUT ─────────────────────────────────────────────────
  makeTemplate(
    'gem_cut_16',
    'Faceted cut gemstone with brilliant facets and light refraction.',
    {
      B: { name: 'gem_body', role: 'body' },
      T: { name: 'table_facet', role: 'head' },
      F: { name: 'side_facets', role: 'accessory' },
      G: { name: 'sparkle', role: 'eye' },
    },
    {
      body: C.fire,
      head: C.embers,
      accessory: C.ruby,
      eye: C.paper,
    },
    (g) => {
      // Table facet (top flat)
      paintH(g, 'T', 4, 5, 10);
      paintH(g, 'T', 5, 5, 10);
      // Crown facets
      paintH(g, 'F', 6, 4, 11);
      paintH(g, 'F', 7, 3, 12);
      // Pavilion body
      paintH(g, 'B', 8, 3, 12);
      paintH(g, 'B', 9, 4, 11);
      paintH(g, 'B', 10, 5, 10);
      paintH(g, 'B', 11, 6, 9);
      paintH(g, 'B', 12, 7, 8);
      // Sparkle
      paintPoints(g, 'G', [[6, 4], [7, 5], [5, 6]]);
    },
  ),

  // ── 7. HERB BUNDLE DRIED ───────────────────────────────────────
  makeTemplate(
    'herb_bundle_dried_16',
    'Tied bundle of dried herbs with twine binding and hanging loop.',
    {
      H: { name: 'herb_leaves', role: 'body' },
      S: { name: 'stems', role: 'head' },
      T: { name: 'twine_binding', role: 'accessory' },
      L: { name: 'hanging_loop', role: 'arm' },
    },
    {
      body: C.green,
      head: C.darkWood,
      accessory: C.rope,
      arm: C.rope,
    },
    (g) => {
      // Hanging loop
      paintPoints(g, 'L', [[7, 1], [8, 1], [6, 2], [9, 2]]);
      // Stems (upper)
      paintV(g, 'S', 6, 3, 6);
      paintV(g, 'S', 7, 3, 6);
      paintV(g, 'S', 8, 3, 6);
      paintV(g, 'S', 9, 3, 6);
      // Twine binding
      paintH(g, 'T', 7, 5, 10);
      paintH(g, 'T', 8, 5, 10);
      // Herb leaves (bushy, bottom)
      paintRect(g, 'H', 4, 9, 11, 13);
      paintH(g, 'H', 8, 5, 10);
      paintH(g, 'H', 14, 5, 10);
      paintV(g, 'H', 3, 10, 12);
      paintV(g, 'H', 12, 10, 12);
    },
  ),

  // ── 8. MUSHROOM BASKET ─────────────────────────────────────────
  makeTemplate(
    'mushroom_basket_16',
    'Woven basket full of assorted mushrooms with spots and different caps.',
    {
      B: { name: 'basket_body', role: 'body' },
      M: { name: 'mushroom_caps', role: 'head' },
      S: { name: 'mushroom_stems', role: 'arm' },
      D: { name: 'cap_dots', role: 'accessory' },
      W: { name: 'weave_pattern', role: 'belt' },
    },
    {
      body: C.rope,
      head: C.fire,
      arm: C.clay,
      accessory: C.paper,
      belt: C.leather,
    },
    (g) => {
      // Basket body
      paintRect(g, 'B', 2, 8, 13, 13);
      paintH(g, 'B', 14, 3, 12);
      // Weave pattern
      paintPoints(g, 'W', [[4, 10], [8, 10], [12, 10], [3, 12], [7, 12], [11, 12]]);
      // Mushroom 1 (left)
      paintPoints(g, 'S', [[4, 7], [4, 8]]);
      paintPoints(g, 'M', [[3, 5], [4, 5], [5, 5], [3, 6], [4, 6], [5, 6]]);
      paintPoints(g, 'D', [[3, 5], [5, 6]]);
      // Mushroom 2 (center)
      paintPoints(g, 'S', [[8, 6], [8, 7]]);
      paintPoints(g, 'M', [[7, 4], [8, 4], [9, 4], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5]]);
      paintPoints(g, 'D', [[7, 4], [9, 5]]);
      // Mushroom 3 (right)
      paintPoints(g, 'S', [[12, 7], [12, 8]]);
      paintPoints(g, 'M', [[11, 5], [12, 5], [13, 5], [11, 6], [12, 6], [13, 6]]);
      paintPoints(g, 'D', [[13, 5]]);
    },
  ),

  // ── 9. FLOWER PRESS ────────────────────────────────────────────
  makeTemplate(
    'flower_press_16',
    'Wooden flower press with clamping bolts and pressed petals peeking out.',
    {
      W: { name: 'wood_plates', role: 'body' },
      B: { name: 'clamping_bolts', role: 'head' },
      P: { name: 'pressed_petals', role: 'accessory' },
      N: { name: 'wing_nuts', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.iron,
      accessory: C.fire,
      arm: C.brass,
    },
    (g) => {
      // Top wood plate
      paintRect(g, 'W', 2, 3, 13, 5);
      // Bottom wood plate
      paintRect(g, 'W', 2, 10, 13, 12);
      // Bolts (four corners)
      paintV(g, 'B', 3, 3, 12);
      paintV(g, 'B', 12, 3, 12);
      // Wing nuts (top)
      paintPoints(g, 'N', [[2, 2], [3, 2], [4, 2]]);
      paintPoints(g, 'N', [[11, 2], [12, 2], [13, 2]]);
      // Pressed petals peeking out
      paintPoints(g, 'P', [[5, 7], [6, 7], [7, 8], [8, 7], [9, 8], [10, 7], [11, 8]]);
      paintPoints(g, 'P', [[6, 8], [9, 7]]);
    },
  ),

  // ── 10. DYE BOTTLES ────────────────────────────────────────────
  makeTemplate(
    'dye_bottles_16',
    'Three glass bottles of colored dye — red, blue, and green.',
    {
      G: { name: 'glass_bottles', role: 'body' },
      R: { name: 'red_dye', role: 'head' },
      B: { name: 'blue_dye', role: 'arm' },
      N: { name: 'green_dye', role: 'accessory' },
      K: { name: 'cork_stoppers', role: 'belt' },
    },
    {
      body: C.glass,
      head: C.fire,
      arm: C.blue,
      accessory: C.green,
      belt: C.leather,
    },
    (g) => {
      // Bottle 1 (red dye, left)
      paintV(g, 'G', 1, 5, 13);
      paintV(g, 'G', 5, 5, 13);
      paintH(g, 'G', 14, 1, 5);
      paintPoints(g, 'K', [[2, 4], [3, 4], [4, 4]]);
      paintRect(g, 'R', 2, 6, 4, 13);
      // Bottle 2 (blue dye, center)
      paintV(g, 'G', 6, 4, 13);
      paintV(g, 'G', 10, 4, 13);
      paintH(g, 'G', 14, 6, 10);
      paintPoints(g, 'K', [[7, 3], [8, 3], [9, 3]]);
      paintRect(g, 'B', 7, 5, 9, 13);
      // Bottle 3 (green dye, right)
      paintV(g, 'G', 11, 5, 13);
      paintV(g, 'G', 14, 5, 13);
      paintH(g, 'G', 14, 11, 14);
      paintPoints(g, 'K', [[12, 4], [13, 4]]);
      paintRect(g, 'N', 12, 6, 13, 13);
    },
  ),

  // ── 11. PIGMENT JARS ───────────────────────────────────────────
  makeTemplate(
    'pigment_jars_16',
    'Row of four small ceramic jars with colored pigment powder inside.',
    {
      J: { name: 'jar_bodies', role: 'body' },
      P: { name: 'pigment_red', role: 'head' },
      Q: { name: 'pigment_gold', role: 'accessory' },
      L: { name: 'jar_lids', role: 'arm' },
    },
    {
      body: C.clay,
      head: C.fire,
      accessory: C.gold,
      arm: C.darkWood,
    },
    (g) => {
      // Jar 1
      paintRect(g, 'J', 1, 8, 3, 13);
      paintH(g, 'J', 7, 1, 3);
      paintRect(g, 'P', 1, 6, 3, 7);
      paintPoints(g, 'L', [[1, 5], [2, 5], [3, 5]]);
      // Jar 2
      paintRect(g, 'J', 5, 8, 7, 13);
      paintH(g, 'J', 7, 5, 7);
      paintRect(g, 'Q', 5, 6, 7, 7);
      paintPoints(g, 'L', [[5, 5], [6, 5], [7, 5]]);
      // Jar 3
      paintRect(g, 'J', 9, 8, 11, 13);
      paintH(g, 'J', 7, 9, 11);
      paintRect(g, 'P', 9, 6, 11, 7);
      paintPoints(g, 'L', [[9, 5], [10, 5], [11, 5]]);
      // Jar 4
      paintRect(g, 'J', 13, 8, 14, 13);
      paintH(g, 'J', 7, 13, 14);
      paintRect(g, 'Q', 13, 6, 14, 7);
      paintPoints(g, 'L', [[13, 5], [14, 5]]);
    },
  ),

  // ── 12. CLOTH BOLT ─────────────────────────────────────────────
  makeTemplate(
    'cloth_bolt_16',
    'Bolt of colorful fabric partially unrolled on a table.',
    {
      R: { name: 'rolled_cloth', role: 'body' },
      U: { name: 'unrolled_tail', role: 'head' },
      P: { name: 'pattern_stripe', role: 'accessory' },
      E: { name: 'end_circle', role: 'arm' },
    },
    {
      body: C.blue,
      head: C.blue,
      accessory: C.gold,
      arm: C.purple,
    },
    (g) => {
      // Rolled bolt (cylinder, right side)
      paintRect(g, 'R', 8, 4, 13, 12);
      paintV(g, 'R', 7, 5, 11);
      paintV(g, 'R', 14, 5, 11);
      // End circle
      paintRect(g, 'E', 9, 5, 12, 11);
      paintPoints(g, 'E', [[10, 4], [11, 4], [10, 12], [11, 12]]);
      // Unrolled tail (extending left)
      paintRect(g, 'U', 1, 10, 7, 12);
      paintH(g, 'U', 9, 3, 7);
      // Pattern stripe
      paintPoints(g, 'P', [[3, 11], [5, 11], [7, 11]]);
      paintPoints(g, 'P', [[4, 10], [6, 10]]);
    },
  ),

  // ── 13. WOOL BALL ──────────────────────────────────────────────
  makeTemplate(
    'wool_ball_16',
    'Round ball of yarn with trailing strand and knitting needles.',
    {
      B: { name: 'ball_body', role: 'body' },
      S: { name: 'strand_trail', role: 'head' },
      W: { name: 'wrap_lines', role: 'accessory' },
      N: { name: 'knitting_needles', role: 'arm' },
    },
    {
      body: C.fire,
      head: C.fire,
      accessory: C.ruby,
      arm: C.iron,
    },
    (g) => {
      // Ball body (circle)
      paintRect(g, 'B', 4, 5, 11, 12);
      paintH(g, 'B', 4, 5, 10);
      paintH(g, 'B', 13, 5, 10);
      paintV(g, 'B', 3, 6, 11);
      paintV(g, 'B', 12, 6, 11);
      // Wrap lines (texture)
      paintPoints(g, 'W', [[5, 6], [7, 6], [9, 7], [4, 8], [6, 9], [8, 10], [10, 11], [5, 11]]);
      // Strand trail
      paintPoints(g, 'S', [[12, 10], [13, 9], [14, 8], [14, 7]]);
      // Knitting needles (crossed, sticking out)
      paintPoints(g, 'N', [[3, 3], [4, 4], [5, 5]]);
      paintPoints(g, 'N', [[9, 3], [8, 4], [7, 5]]);
    },
  ),

  // ── 14. THREAD SPOOL ───────────────────────────────────────────
  makeTemplate(
    'thread_spool_16',
    'Small wooden spool wound with colored thread and needle.',
    {
      S: { name: 'spool_body', role: 'body' },
      T: { name: 'wound_thread', role: 'head' },
      N: { name: 'needle', role: 'accessory' },
      F: { name: 'spool_flanges', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.blue,
      accessory: C.iron,
      arm: C.darkWood,
    },
    (g) => {
      // Flanges (top/bottom)
      paintH(g, 'F', 4, 4, 11);
      paintH(g, 'F', 5, 4, 11);
      paintH(g, 'F', 11, 4, 11);
      paintH(g, 'F', 12, 4, 11);
      // Core
      paintV(g, 'S', 4, 6, 10);
      paintV(g, 'S', 11, 6, 10);
      // Wound thread
      paintRect(g, 'T', 5, 6, 10, 10);
      // Needle (sticking out right-up)
      paintPoints(g, 'N', [[12, 8], [13, 7], [14, 6], [14, 5], [14, 4]]);
    },
  ),

  // ── 15. BONE PILE ──────────────────────────────────────────────
  makeTemplate(
    'bone_pile_16',
    'Pile of assorted bones — femurs, ribs, skull fragment — for crafting.',
    {
      B: { name: 'large_bones', role: 'body' },
      S: { name: 'small_bones', role: 'head' },
      K: { name: 'skull_fragment', role: 'accessory' },
      J: { name: 'joint_knobs', role: 'arm' },
    },
    {
      body: C.bone,
      head: C.clay,
      accessory: C.paper,
      arm: C.stone,
    },
    (g) => {
      // Large bones (crossed)
      paintH(g, 'B', 9, 2, 13);
      paintH(g, 'B', 10, 2, 13);
      paintH(g, 'B', 12, 3, 12);
      paintH(g, 'B', 13, 3, 12);
      // Joint knobs
      paintPoints(g, 'J', [[1, 9], [14, 9], [2, 12], [13, 12]]);
      paintPoints(g, 'J', [[1, 10], [14, 10], [2, 13], [13, 13]]);
      // Small bones
      paintPoints(g, 'S', [[5, 7], [6, 8], [10, 7], [9, 8]]);
      paintPoints(g, 'S', [[4, 11], [7, 14], [11, 14]]);
      // Skull fragment (upper)
      paintRect(g, 'K', 5, 3, 10, 6);
      paintH(g, 'K', 2, 6, 9);
      paintPoints(g, 'K', [[7, 5], [9, 5]]);
    },
  ),

  // ── 16. FEATHER QUILL BUNCH ────────────────────────────────────
  makeTemplate(
    'feather_quill_bunch_16',
    'Bundle of colorful feather quills in a small jar for writing.',
    {
      J: { name: 'inkwell_jar', role: 'body' },
      F: { name: 'feather_vanes', role: 'head' },
      Q: { name: 'quill_shafts', role: 'accessory' },
      I: { name: 'ink_level', role: 'arm' },
    },
    {
      body: C.glass,
      head: C.paper,
      accessory: C.rope,
      arm: C.black,
    },
    (g) => {
      // Jar body
      paintRect(g, 'J', 4, 9, 11, 14);
      paintH(g, 'J', 8, 5, 10);
      // Ink inside
      paintRect(g, 'I', 5, 11, 10, 14);
      // Quill shafts (diverging up from jar)
      paintV(g, 'Q', 5, 4, 9);
      paintV(g, 'Q', 8, 3, 9);
      paintV(g, 'Q', 11, 4, 9);
      // Feather vanes
      paintPoints(g, 'F', [[3, 2], [4, 2], [4, 3], [5, 3], [6, 4]]);
      paintPoints(g, 'F', [[7, 1], [8, 1], [7, 2], [9, 2], [9, 3]]);
      paintPoints(g, 'F', [[10, 2], [11, 2], [12, 3], [12, 4]]);
    },
  ),

  // ── 17. GLASS VIAL RACK ────────────────────────────────────────
  makeTemplate(
    'glass_vial_rack_16',
    'Wooden rack holding six glass vials with different colored liquids.',
    {
      R: { name: 'rack_frame', role: 'body' },
      V: { name: 'glass_vials', role: 'head' },
      L: { name: 'liquids', role: 'accessory' },
      C: { name: 'corks', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.glass,
      accessory: C.green,
      arm: C.leather,
    },
    (g) => {
      // Rack frame (horizontal bars)
      paintH(g, 'R', 5, 1, 14);
      paintH(g, 'R', 14, 1, 14);
      paintV(g, 'R', 1, 5, 14);
      paintV(g, 'R', 14, 5, 14);
      // Vials (6 tubes hanging)
      for (let i = 0; i < 6; i++) {
        const vx = 3 + i * 2;
        paintPoints(g, 'C', [[vx, 4]]);
        paintV(g, 'V', vx, 5, 12);
        paintPoints(g, 'L', [[vx, 9], [vx, 10], [vx, 11], [vx, 12]]);
      }
    },
  ),

  // ── 18. WAX SEAL KIT ───────────────────────────────────────────
  makeTemplate(
    'wax_seal_kit_16',
    'Wax seal kit with stamp handle, wax stick, and pressed seal.',
    {
      S: { name: 'stamp_handle', role: 'body' },
      W: { name: 'wax_stick', role: 'head' },
      P: { name: 'pressed_seal', role: 'accessory' },
      D: { name: 'stamp_die', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.fire,
      accessory: C.fire,
      arm: C.brass,
    },
    (g) => {
      // Stamp handle (left, vertical)
      paintRect(g, 'S', 2, 2, 4, 9);
      // Stamp die (bottom of handle)
      paintRect(g, 'D', 1, 10, 5, 11);
      // Wax stick (right, angled)
      paintRect(g, 'W', 9, 3, 10, 11);
      paintPoints(g, 'W', [[9, 2], [10, 2]]);
      // Pressed seal (bottom right, circle)
      paintRect(g, 'P', 10, 12, 14, 14);
      paintPoints(g, 'P', [[11, 11], [12, 11], [13, 11]]);
      paintPoints(g, 'P', [[11, 14], [12, 14], [13, 14]]);
    },
  ),

  // ── 19. RESIN BOTTLE ───────────────────────────────────────────
  makeTemplate(
    'resin_bottle_16',
    'Amber resin bottle with dripping stopper and label.',
    {
      B: { name: 'bottle_glass', role: 'body' },
      R: { name: 'resin_liquid', role: 'head' },
      S: { name: 'stopper', role: 'accessory' },
      L: { name: 'label', role: 'arm' },
      D: { name: 'drip', role: 'eye' },
    },
    {
      body: C.glass,
      head: C.embers,
      accessory: C.wood,
      arm: C.paper,
      eye: C.gold,
    },
    (g) => {
      // Stopper
      paintRect(g, 'S', 6, 2, 9, 3);
      // Bottle neck
      paintV(g, 'B', 6, 4, 5);
      paintV(g, 'B', 9, 4, 5);
      paintH(g, 'B', 4, 7, 8);
      // Bottle body
      paintV(g, 'B', 4, 6, 13);
      paintV(g, 'B', 11, 6, 13);
      paintH(g, 'B', 6, 5, 10);
      paintH(g, 'B', 14, 5, 10);
      // Resin liquid
      paintRect(g, 'R', 5, 7, 10, 13);
      // Label
      paintRect(g, 'L', 5, 9, 10, 11);
      // Drip
      paintPoints(g, 'D', [[9, 4], [10, 5]]);
    },
  ),

  // ── 20. CHARCOAL PILE ──────────────────────────────────────────
  makeTemplate(
    'charcoal_pile_16',
    'Mound of charcoal chunks with glowing ember edges and ash dust.',
    {
      C: { name: 'charcoal_chunks', role: 'body' },
      E: { name: 'ember_glow', role: 'head' },
      A: { name: 'ash_dust', role: 'accessory' },
      S: { name: 'smoke_wisps', role: 'eye' },
    },
    {
      body: C.black,
      head: C.embers,
      accessory: C.stone,
      eye: C.paper,
    },
    (g) => {
      // Base ash layer
      paintRect(g, 'A', 1, 13, 14, 14);
      // Charcoal pile (mound shape)
      paintRect(g, 'C', 2, 9, 13, 12);
      paintH(g, 'C', 8, 4, 11);
      paintH(g, 'C', 7, 5, 10);
      paintH(g, 'C', 6, 6, 9);
      // Ember glow edges
      paintPoints(g, 'E', [[3, 10], [6, 9], [9, 8], [12, 9], [5, 12], [10, 12]]);
      paintPoints(g, 'E', [[7, 7], [8, 6]]);
      // Smoke wisps
      paintPoints(g, 'S', [[7, 4], [8, 3], [6, 2], [9, 1]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'CRAFTING_BATCH3_TEMPLATES',
    schemes: 'CRAFTING_BATCH3_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
