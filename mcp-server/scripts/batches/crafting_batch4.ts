/**
 * Crafting & Workshop batch 4 — Specialized Stations.
 * 20 original 16x16 templates — jeweler, tinkerer, cheese press, distillery, etc.
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
  cream:     { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  purple:    { shadow: '#442434', base: '#30346d', highlight: '#597dce' },
};

const templates: CompactTemplate[] = [
  // ── 1. TINKERER DESK ───────────────────────────────────────────
  makeTemplate(
    'tinkerer_desk_16',
    'Cluttered tinkerer desk with gears, magnifying lens, and small drawers.',
    {
      T: { name: 'desk_body', role: 'body' },
      G: { name: 'gears_parts', role: 'head' },
      L: { name: 'magnifier_lens', role: 'accessory' },
      D: { name: 'small_drawers', role: 'arm' },
      F: { name: 'desk_legs', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.brass,
      accessory: C.glass,
      arm: C.darkWood,
      belt: C.darkWood,
    },
    (g) => {
      // Desk top surface
      paintRect(g, 'T', 1, 6, 14, 8);
      // Gears and parts on desk
      paintPoints(g, 'G', [[3, 5], [4, 5], [5, 5], [3, 4], [4, 4]]);
      paintPoints(g, 'G', [[9, 5], [10, 4], [10, 5]]);
      // Magnifying lens (right, standing)
      paintPoints(g, 'L', [[12, 2], [13, 2], [12, 3], [13, 3], [12, 4], [13, 4]]);
      paintPoints(g, 'L', [[12, 5], [13, 5]]);
      // Drawers (underneath)
      paintRect(g, 'D', 2, 9, 6, 12);
      paintRect(g, 'D', 9, 9, 13, 12);
      // Legs
      paintV(g, 'F', 2, 13, 14);
      paintV(g, 'F', 6, 13, 14);
      paintV(g, 'F', 9, 13, 14);
      paintV(g, 'F', 13, 13, 14);
    },
  ),

  // ── 2. JEWELER BENCH ───────────────────────────────────────────
  makeTemplate(
    'jeweler_bench_16',
    'Jeweler workbench with loupe, gem tray, and precision tools.',
    {
      B: { name: 'bench_body', role: 'body' },
      G: { name: 'gem_tray', role: 'head' },
      L: { name: 'loupe_stand', role: 'accessory' },
      T: { name: 'tiny_tools', role: 'arm' },
      D: { name: 'drawers', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.gold,
      accessory: C.brass,
      arm: C.iron,
      belt: C.darkWood,
    },
    (g) => {
      // Bench surface
      paintRect(g, 'B', 1, 6, 14, 8);
      // Gem tray (on surface)
      paintRect(g, 'G', 2, 4, 6, 6);
      // Loupe stand (right)
      paintV(g, 'L', 11, 2, 6);
      paintV(g, 'L', 12, 2, 6);
      paintPoints(g, 'L', [[10, 2], [13, 2], [10, 3], [13, 3]]);
      // Tiny tools
      paintPoints(g, 'T', [[8, 5], [9, 5], [8, 4]]);
      // Drawers below
      paintRect(g, 'D', 2, 9, 13, 12);
      // Legs
      paintV(g, 'B', 2, 13, 14);
      paintV(g, 'B', 13, 13, 14);
    },
  ),

  // ── 3. SCROLL WRITING DESK ─────────────────────────────────────
  makeTemplate(
    'scroll_writing_desk_16',
    'Writing desk with inkwell, quill, parchment scroll, and candle.',
    {
      D: { name: 'desk_surface', role: 'body' },
      S: { name: 'scroll_parchment', role: 'head' },
      I: { name: 'inkwell', role: 'accessory' },
      Q: { name: 'quill_pen', role: 'arm' },
      K: { name: 'candle_flame', role: 'eye' },
    },
    {
      body: C.wood,
      head: C.paper,
      accessory: C.black,
      arm: C.paper,
      eye: C.embers,
    },
    (g) => {
      // Desk surface
      paintRect(g, 'D', 1, 7, 14, 9);
      paintV(g, 'D', 2, 10, 14);
      paintV(g, 'D', 3, 10, 14);
      paintV(g, 'D', 12, 10, 14);
      paintV(g, 'D', 13, 10, 14);
      // Scroll (unrolled on desk)
      paintRect(g, 'S', 3, 4, 10, 7);
      paintPoints(g, 'S', [[2, 5], [2, 6], [11, 5], [11, 6]]);
      // Inkwell (right)
      paintRect(g, 'I', 12, 5, 13, 7);
      // Quill (resting in inkwell)
      paintPoints(g, 'Q', [[12, 4], [11, 3], [10, 2], [9, 1]]);
      // Candle + flame (far left)
      paintV(g, 'K', 1, 4, 7);
      paintPoints(g, 'K', [[1, 3], [0, 3]]);
    },
  ),

  // ── 4. POTION SHELF ────────────────────────────────────────────
  makeTemplate(
    'potion_shelf_16',
    'Wall shelf with assorted potion bottles, vials, and bubbling flasks.',
    {
      S: { name: 'shelf_frame', role: 'body' },
      P: { name: 'potion_bottles', role: 'head' },
      V: { name: 'small_vials', role: 'accessory' },
      B: { name: 'bubbles', role: 'eye' },
    },
    {
      body: C.wood,
      head: C.green,
      accessory: C.glass,
      eye: C.gold,
    },
    (g) => {
      // Shelf planks
      paintH(g, 'S', 1, 1, 14);
      paintH(g, 'S', 7, 1, 14);
      paintH(g, 'S', 13, 1, 14);
      // Shelf sides
      paintV(g, 'S', 1, 1, 13);
      paintV(g, 'S', 14, 1, 13);
      // Top row potions
      paintRect(g, 'P', 3, 3, 4, 7);
      paintPoints(g, 'P', [[3, 2], [4, 2]]);
      paintRect(g, 'P', 7, 4, 8, 7);
      paintPoints(g, 'P', [[7, 3], [8, 3]]);
      paintRect(g, 'P', 11, 3, 12, 7);
      paintPoints(g, 'P', [[11, 2], [12, 2]]);
      // Bubbles
      paintPoints(g, 'B', [[3, 4], [8, 5], [11, 4]]);
      // Bottom row vials
      paintV(g, 'V', 3, 9, 13);
      paintV(g, 'V', 5, 10, 13);
      paintV(g, 'V', 7, 9, 13);
      paintV(g, 'V', 9, 10, 13);
      paintV(g, 'V', 11, 9, 13);
      paintV(g, 'V', 13, 10, 13);
    },
  ),

  // ── 5. HERB DRYING RACK ────────────────────────────────────────
  makeTemplate(
    'herb_drying_rack_16',
    'Ceiling-hung drying rack with herb bundles dangling from cross-bars.',
    {
      F: { name: 'frame_bars', role: 'body' },
      H: { name: 'herb_bundles', role: 'head' },
      R: { name: 'hanging_ropes', role: 'accessory' },
      C: { name: 'ceiling_hooks', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.green,
      accessory: C.rope,
      arm: C.iron,
    },
    (g) => {
      // Ceiling hooks
      paintPoints(g, 'C', [[3, 1], [12, 1]]);
      // Hanging ropes
      paintV(g, 'R', 3, 2, 3);
      paintV(g, 'R', 12, 2, 3);
      // Frame bars (horizontal)
      paintH(g, 'F', 4, 2, 13);
      paintH(g, 'F', 5, 2, 13);
      // Hanging herb bundles (5 bundles)
      paintV(g, 'R', 3, 6, 6);
      paintRect(g, 'H', 2, 7, 4, 10);
      paintV(g, 'R', 6, 6, 7);
      paintRect(g, 'H', 5, 8, 7, 12);
      paintV(g, 'R', 8, 6, 6);
      paintRect(g, 'H', 7, 7, 9, 10);
      paintV(g, 'R', 10, 6, 7);
      paintRect(g, 'H', 9, 8, 11, 11);
      paintV(g, 'R', 13, 6, 6);
      paintRect(g, 'H', 12, 7, 14, 9);
    },
  ),

  // ── 6. CHEESE PRESS ────────────────────────────────────────────
  makeTemplate(
    'cheese_press_16',
    'Wooden cheese press with screw top, drip tray, and cheese round.',
    {
      F: { name: 'press_frame', role: 'body' },
      S: { name: 'screw_press', role: 'head' },
      C: { name: 'cheese_wheel', role: 'accessory' },
      T: { name: 'drip_tray', role: 'arm' },
      H: { name: 'crank_handle', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.iron,
      accessory: C.gold,
      arm: C.darkWood,
      belt: C.iron,
    },
    (g) => {
      // Frame uprights
      paintV(g, 'F', 2, 2, 13);
      paintV(g, 'F', 3, 2, 13);
      paintV(g, 'F', 12, 2, 13);
      paintV(g, 'F', 13, 2, 13);
      // Top beam
      paintH(g, 'F', 2, 3, 12);
      // Screw
      paintV(g, 'S', 7, 3, 7);
      paintV(g, 'S', 8, 3, 7);
      // Crank handle
      paintH(g, 'H', 3, 5, 10);
      // Press plate
      paintH(g, 'S', 8, 4, 11);
      // Cheese wheel
      paintRect(g, 'C', 4, 9, 11, 11);
      // Drip tray
      paintRect(g, 'T', 3, 12, 12, 13);
    },
  ),

  // ── 7. BUTTER CHURN ────────────────────────────────────────────
  makeTemplate(
    'butter_churn_16',
    'Tall wooden butter churn barrel with plunger handle and metal bands.',
    {
      B: { name: 'barrel_body', role: 'body' },
      H: { name: 'plunger_handle', role: 'head' },
      M: { name: 'metal_bands', role: 'accessory' },
      L: { name: 'lid_top', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.wood,
      accessory: C.iron,
      arm: C.darkWood,
    },
    (g) => {
      // Plunger handle (sticking up)
      paintV(g, 'H', 7, 1, 4);
      paintV(g, 'H', 8, 1, 4);
      paintH(g, 'H', 1, 6, 9);
      // Lid
      paintH(g, 'L', 5, 4, 11);
      paintH(g, 'L', 6, 4, 11);
      // Barrel body
      paintRect(g, 'B', 4, 7, 11, 13);
      paintV(g, 'B', 3, 8, 12);
      paintV(g, 'B', 12, 8, 12);
      // Metal bands
      paintH(g, 'M', 7, 3, 12);
      paintH(g, 'M', 10, 3, 12);
      paintH(g, 'M', 13, 4, 11);
      // Base
      paintH(g, 'B', 14, 3, 12);
    },
  ),

  // ── 8. CANDLE MAKING STATION ───────────────────────────────────
  makeTemplate(
    'candle_making_station_16',
    'Candle dipping station with wax pot, hanging wicks, and finished candles.',
    {
      T: { name: 'table_frame', role: 'body' },
      W: { name: 'wax_pot', role: 'head' },
      C: { name: 'finished_candles', role: 'accessory' },
      K: { name: 'hanging_wicks', role: 'arm' },
      F: { name: 'flame_tips', role: 'eye' },
    },
    {
      body: C.wood,
      head: C.embers,
      accessory: C.cream,
      arm: C.paper,
      eye: C.gold,
    },
    (g) => {
      // Table
      paintRect(g, 'T', 1, 8, 14, 10);
      paintV(g, 'T', 2, 11, 14);
      paintV(g, 'T', 13, 11, 14);
      // Wax pot (center)
      paintRect(g, 'W', 5, 5, 10, 8);
      paintH(g, 'W', 4, 6, 9);
      // Hanging wicks (dipping into pot)
      paintV(g, 'K', 6, 2, 5);
      paintV(g, 'K', 9, 2, 5);
      // Finished candles (on table, right)
      paintV(g, 'C', 12, 5, 8);
      paintV(g, 'C', 13, 6, 8);
      // Flame tips
      paintPoints(g, 'F', [[12, 4], [13, 5]]);
      // Candle on left
      paintV(g, 'C', 2, 5, 8);
      paintPoints(g, 'F', [[2, 4]]);
    },
  ),

  // ── 9. SOAP MOLD ──────────────────────────────────────────────
  makeTemplate(
    'soap_mold_16',
    'Wooden soap mold tray with multiple bar slots and drying rack.',
    {
      M: { name: 'mold_frame', role: 'body' },
      S: { name: 'soap_bars', role: 'head' },
      R: { name: 'drying_rack', role: 'arm' },
      D: { name: 'dried_soaps', role: 'accessory' },
    },
    {
      body: C.wood,
      head: C.green,
      accessory: C.blue,
      arm: C.darkWood,
    },
    (g) => {
      // Mold frame (bottom section)
      paintRect(g, 'M', 1, 8, 14, 11);
      // Soap bars in mold (3 bars)
      paintRect(g, 'S', 2, 9, 4, 10);
      paintRect(g, 'S', 6, 9, 8, 10);
      paintRect(g, 'S', 10, 9, 12, 10);
      // Drying rack (top section)
      paintH(g, 'R', 2, 1, 14);
      paintV(g, 'R', 1, 2, 6);
      paintV(g, 'R', 14, 2, 6);
      paintH(g, 'R', 6, 1, 14);
      // Dried soaps on rack
      paintRect(g, 'D', 3, 3, 5, 5);
      paintRect(g, 'D', 7, 3, 9, 5);
      paintRect(g, 'D', 11, 3, 13, 5);
      // Mold base
      paintH(g, 'M', 12, 1, 14);
    },
  ),

  // ── 10. PAPER PRESS ────────────────────────────────────────────
  makeTemplate(
    'paper_press_16',
    'Paper-making press with wet pulp tray, felt layers, and press screw.',
    {
      F: { name: 'frame_body', role: 'body' },
      P: { name: 'pulp_sheets', role: 'head' },
      S: { name: 'press_screw', role: 'accessory' },
      T: { name: 'tray_base', role: 'arm' },
      H: { name: 'handle_wheel', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.paper,
      accessory: C.iron,
      arm: C.darkWood,
      belt: C.iron,
    },
    (g) => {
      // Frame uprights
      paintV(g, 'F', 2, 1, 14);
      paintV(g, 'F', 13, 1, 14);
      // Top beam
      paintH(g, 'F', 1, 2, 13);
      // Press screw (center, top)
      paintV(g, 'S', 7, 2, 6);
      paintV(g, 'S', 8, 2, 6);
      // Handle wheel
      paintH(g, 'H', 2, 5, 10);
      // Press plate
      paintH(g, 'S', 7, 3, 12);
      // Pulp/paper sheets
      paintRect(g, 'P', 3, 8, 12, 10);
      // Tray base
      paintRect(g, 'T', 3, 11, 12, 13);
    },
  ),

  // ── 11. PRINTING PRESS ─────────────────────────────────────────
  makeTemplate(
    'printing_press_16',
    'Gutenberg-style printing press with roller, type bed, and press lever.',
    {
      F: { name: 'frame', role: 'body' },
      R: { name: 'roller_drum', role: 'head' },
      B: { name: 'type_bed', role: 'accessory' },
      L: { name: 'press_lever', role: 'arm' },
      P: { name: 'paper_sheet', role: 'eye' },
    },
    {
      body: C.darkWood,
      head: C.darkIron,
      accessory: C.iron,
      arm: C.wood,
      eye: C.paper,
    },
    (g) => {
      // Frame
      paintV(g, 'F', 1, 2, 14);
      paintV(g, 'F', 2, 2, 14);
      paintV(g, 'F', 13, 2, 14);
      paintV(g, 'F', 14, 2, 14);
      paintH(g, 'F', 2, 2, 13);
      // Lever (extending right)
      paintPoints(g, 'L', [[13, 3], [14, 3], [14, 4]]);
      paintH(g, 'L', 3, 9, 13);
      // Roller drum
      paintRect(g, 'R', 4, 5, 11, 7);
      paintH(g, 'R', 4, 5, 10);
      paintH(g, 'R', 8, 5, 10);
      // Paper
      paintH(g, 'P', 8, 3, 12);
      paintH(g, 'P', 9, 3, 12);
      // Type bed
      paintRect(g, 'B', 3, 10, 12, 12);
      // Base
      paintH(g, 'F', 14, 1, 14);
    },
  ),

  // ── 12. GLASS BLOWER STATION ───────────────────────────────────
  makeTemplate(
    'glass_blower_station_16',
    'Glass blowing station with glory hole furnace, blowpipe, and annealing shelf.',
    {
      F: { name: 'furnace_body', role: 'body' },
      G: { name: 'glory_hole', role: 'head' },
      P: { name: 'blowpipe', role: 'accessory' },
      S: { name: 'annealing_shelf', role: 'arm' },
      M: { name: 'molten_glass', role: 'eye' },
    },
    {
      body: C.stone,
      head: C.fire,
      accessory: C.iron,
      arm: C.wood,
      eye: C.embers,
    },
    (g) => {
      // Furnace body
      paintRect(g, 'F', 1, 4, 8, 13);
      paintH(g, 'F', 3, 2, 7);
      // Glory hole opening
      paintRect(g, 'G', 3, 7, 6, 10);
      // Molten glass glow
      paintPoints(g, 'M', [[4, 8], [5, 9], [4, 10]]);
      // Blowpipe (extending right from furnace)
      paintH(g, 'P', 8, 7, 14);
      paintH(g, 'P', 9, 7, 14);
      // Annealing shelf (right side)
      paintRect(g, 'S', 10, 11, 14, 13);
      paintV(g, 'S', 10, 10, 11);
      paintV(g, 'S', 14, 10, 11);
    },
  ),

  // ── 13. MAP TABLE (CRAFTING) ───────────────────────────────────
  makeTemplate(
    'map_table_16',
    'Cartographer table with map spread, compass, and dividers tool.',
    {
      T: { name: 'table_body', role: 'body' },
      M: { name: 'map_parchment', role: 'head' },
      C: { name: 'compass_rose', role: 'accessory' },
      D: { name: 'dividers_tool', role: 'arm' },
      L: { name: 'table_legs', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.paper,
      accessory: C.brass,
      arm: C.iron,
      belt: C.darkWood,
    },
    (g) => {
      // Table surface
      paintRect(g, 'T', 1, 6, 14, 8);
      // Map parchment (on table)
      paintRect(g, 'M', 2, 3, 12, 6);
      // Compass rose
      paintPoints(g, 'C', [[4, 4], [5, 4], [4, 5], [5, 5]]);
      // Dividers tool (right side)
      paintPoints(g, 'D', [[13, 3], [13, 4], [14, 4], [13, 5]]);
      // Table legs
      paintV(g, 'L', 2, 9, 14);
      paintV(g, 'L', 3, 9, 14);
      paintV(g, 'L', 12, 9, 14);
      paintV(g, 'L', 13, 9, 14);
    },
  ),

  // ── 14. TELESCOPE WORKBENCH ────────────────────────────────────
  makeTemplate(
    'telescope_workbench_16',
    'Optics workbench with telescope tube, lens array, and brass fittings.',
    {
      B: { name: 'bench_body', role: 'body' },
      T: { name: 'telescope_tube', role: 'head' },
      L: { name: 'lens_array', role: 'accessory' },
      F: { name: 'brass_fittings', role: 'arm' },
      G: { name: 'bench_legs', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.darkIron,
      accessory: C.glass,
      arm: C.brass,
      belt: C.darkWood,
    },
    (g) => {
      // Bench surface
      paintRect(g, 'B', 1, 7, 14, 9);
      // Telescope tube (on bench)
      paintRect(g, 'T', 2, 4, 11, 6);
      // Brass fittings
      paintPoints(g, 'F', [[2, 5], [5, 5], [8, 5], [11, 5]]);
      // Lens array (right side, standing)
      paintRect(g, 'L', 12, 3, 14, 7);
      paintPoints(g, 'L', [[12, 2], [13, 2], [14, 2]]);
      // Legs
      paintV(g, 'G', 2, 10, 14);
      paintV(g, 'G', 13, 10, 14);
    },
  ),

  // ── 15. CLOCKWORK BENCH ────────────────────────────────────────
  makeTemplate(
    'clockwork_bench_16',
    'Clockmaker bench with gears, springs, mainspring, and tiny screws.',
    {
      B: { name: 'bench_top', role: 'body' },
      G: { name: 'gear_wheels', role: 'head' },
      S: { name: 'springs', role: 'accessory' },
      T: { name: 'tiny_tools', role: 'arm' },
      L: { name: 'bench_legs', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.brass,
      accessory: C.iron,
      arm: C.darkIron,
      belt: C.darkWood,
    },
    (g) => {
      // Bench surface
      paintRect(g, 'B', 1, 7, 14, 9);
      // Large gear (left)
      paintRect(g, 'G', 2, 3, 6, 7);
      paintPoints(g, 'G', [[4, 2], [3, 2], [5, 2]]);
      // Small gears
      paintRect(g, 'G', 8, 4, 10, 7);
      // Springs
      paintPoints(g, 'S', [[11, 5], [12, 5], [11, 6], [12, 6], [13, 5], [13, 6]]);
      // Tiny tools
      paintPoints(g, 'T', [[3, 7], [6, 7], [9, 7], [12, 7]]);
      // Legs
      paintV(g, 'L', 2, 10, 14);
      paintV(g, 'L', 3, 10, 14);
      paintV(g, 'L', 12, 10, 14);
      paintV(g, 'L', 13, 10, 14);
    },
  ),

  // ── 16. TAXIDERMY STAND ────────────────────────────────────────
  makeTemplate(
    'taxidermy_stand_16',
    'Taxidermy stand with mounted head form, glass eyes, and tool tray.',
    {
      S: { name: 'stand_post', role: 'body' },
      H: { name: 'head_form', role: 'head' },
      E: { name: 'glass_eyes', role: 'accessory' },
      T: { name: 'tool_tray', role: 'arm' },
      B: { name: 'base_plate', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.leather,
      accessory: C.glass,
      arm: C.iron,
      belt: C.darkWood,
    },
    (g) => {
      // Head form (oval)
      paintRect(g, 'H', 5, 2, 10, 7);
      paintH(g, 'H', 1, 6, 9);
      paintH(g, 'H', 8, 6, 9);
      // Glass eyes
      paintPoints(g, 'E', [[6, 4], [9, 4]]);
      // Stand post
      paintV(g, 'S', 7, 8, 12);
      paintV(g, 'S', 8, 8, 12);
      // Tool tray (side)
      paintRect(g, 'T', 11, 9, 14, 11);
      // Base plate
      paintRect(g, 'B', 4, 13, 11, 14);
    },
  ),

  // ── 17. DISTILLERY STILL ───────────────────────────────────────
  makeTemplate(
    'distillery_still_16',
    'Copper pot still with condenser coil, collection flask, and brick base.',
    {
      P: { name: 'pot_body', role: 'body' },
      N: { name: 'neck_tube', role: 'head' },
      C: { name: 'condenser_coil', role: 'accessory' },
      F: { name: 'collection_flask', role: 'arm' },
      B: { name: 'brick_base', role: 'belt' },
    },
    {
      body: C.copper,
      head: C.copper,
      accessory: C.brass,
      arm: C.glass,
      belt: C.fire,
    },
    (g) => {
      // Pot body (large, left)
      paintRect(g, 'P', 1, 6, 7, 11);
      paintH(g, 'P', 5, 2, 6);
      paintV(g, 'P', 0, 7, 10);
      paintV(g, 'P', 8, 7, 10);
      // Dome top
      paintH(g, 'P', 4, 3, 5);
      // Neck tube (going right)
      paintH(g, 'N', 3, 5, 9);
      paintH(g, 'N', 4, 7, 10);
      // Condenser coil
      paintV(g, 'C', 10, 4, 11);
      paintV(g, 'C', 11, 5, 10);
      paintPoints(g, 'C', [[10, 6], [11, 7], [10, 8], [11, 9]]);
      // Collection flask (right, bottom)
      paintRect(g, 'F', 12, 9, 14, 13);
      paintPoints(g, 'F', [[12, 8], [13, 8], [14, 8]]);
      // Brick base
      paintH(g, 'B', 12, 0, 8);
      paintH(g, 'B', 13, 0, 8);
    },
  ),

  // ── 18. FERMENTING BARREL ──────────────────────────────────────
  makeTemplate(
    'fermenting_barrel_16',
    'Wooden fermenting barrel with spigot, bung hole, and yeast foam.',
    {
      B: { name: 'barrel_staves', role: 'body' },
      M: { name: 'metal_hoops', role: 'head' },
      S: { name: 'spigot', role: 'accessory' },
      F: { name: 'foam_bubbles', role: 'arm' },
      H: { name: 'bung_hole', role: 'eye' },
    },
    {
      body: C.wood,
      head: C.darkIron,
      accessory: C.brass,
      arm: C.cream,
      eye: C.black,
    },
    (g) => {
      // Barrel body (horizontal, oval)
      paintRect(g, 'B', 2, 4, 13, 12);
      paintH(g, 'B', 3, 4, 11);
      paintH(g, 'B', 13, 4, 11);
      paintV(g, 'B', 1, 6, 10);
      paintV(g, 'B', 14, 6, 10);
      // Metal hoops
      paintV(g, 'M', 4, 4, 13);
      paintV(g, 'M', 11, 4, 13);
      // Bung hole (top center)
      paintPoints(g, 'H', [[7, 3], [8, 3]]);
      // Foam (coming out of bung)
      paintPoints(g, 'F', [[6, 2], [7, 2], [8, 2], [9, 2], [7, 1], [8, 1]]);
      // Spigot (front, bottom)
      paintPoints(g, 'S', [[7, 13], [8, 13], [7, 14], [8, 14]]);
    },
  ),

  // ── 19. DYEING VAT ────────────────────────────────────────────
  makeTemplate(
    'dyeing_vat_16',
    'Large stone dyeing vat with colored liquid, stirring paddle, and drip.',
    {
      V: { name: 'vat_body', role: 'body' },
      D: { name: 'dye_liquid', role: 'head' },
      P: { name: 'stirring_paddle', role: 'accessory' },
      S: { name: 'steam', role: 'arm' },
      C: { name: 'cloth_draping', role: 'eye' },
    },
    {
      body: C.stone,
      head: C.purple,
      accessory: C.wood,
      arm: C.paper,
      eye: C.blue,
    },
    (g) => {
      // Vat body (large bowl)
      paintV(g, 'V', 1, 6, 12);
      paintV(g, 'V', 2, 5, 13);
      paintV(g, 'V', 13, 5, 13);
      paintV(g, 'V', 14, 6, 12);
      paintH(g, 'V', 5, 3, 12);
      paintH(g, 'V', 14, 3, 12);
      // Dye liquid
      paintRect(g, 'D', 3, 7, 12, 13);
      paintH(g, 'D', 6, 3, 12);
      // Steam
      paintPoints(g, 'S', [[5, 3], [7, 2], [9, 3], [8, 1]]);
      // Stirring paddle (angled)
      paintPoints(g, 'P', [[11, 2], [12, 3], [12, 4], [11, 5]]);
      paintV(g, 'P', 11, 6, 10);
      // Cloth draping (over edge)
      paintPoints(g, 'C', [[1, 5], [0, 6], [0, 7], [0, 8]]);
    },
  ),

  // ── 20. GEM POLISHER ───────────────────────────────────────────
  makeTemplate(
    'gem_polisher_16',
    'Pedal-operated gem polishing wheel with gem holder and polish compound.',
    {
      W: { name: 'polishing_wheel', role: 'body' },
      H: { name: 'gem_holder', role: 'head' },
      C: { name: 'polish_compound', role: 'accessory' },
      F: { name: 'frame_stand', role: 'arm' },
      P: { name: 'foot_pedal', role: 'belt' },
    },
    {
      body: C.stone,
      head: C.brass,
      accessory: C.green,
      arm: C.iron,
      belt: C.darkWood,
    },
    (g) => {
      // Polishing wheel (circle)
      paintRect(g, 'W', 4, 3, 11, 8);
      paintH(g, 'W', 2, 6, 9);
      paintH(g, 'W', 9, 6, 9);
      // Gem holder (arm approaching wheel)
      paintPoints(g, 'H', [[12, 4], [13, 4], [12, 5], [13, 5], [14, 5]]);
      // Polish compound (jar, left)
      paintRect(g, 'C', 1, 5, 3, 8);
      paintPoints(g, 'C', [[1, 4], [2, 4], [3, 4]]);
      // Frame/stand
      paintV(g, 'F', 7, 9, 12);
      paintV(g, 'F', 8, 9, 12);
      paintH(g, 'F', 12, 4, 11);
      // Foot pedal
      paintH(g, 'P', 13, 3, 12);
      paintH(g, 'P', 14, 2, 13);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'CRAFTING_BATCH4_TEMPLATES',
    schemes: 'CRAFTING_BATCH4_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
