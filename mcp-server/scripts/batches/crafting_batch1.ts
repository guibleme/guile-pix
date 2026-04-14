/**
 * Crafting & Workshop batch 1.
 * 20 original 16x16 templates — forge, loom, alchemy, woodwork, and more.
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
};

const templates: CompactTemplate[] = [
  // ── 1. BLACKSMITH ANVIL ────────────────────────────────────────
  makeTemplate(
    'blacksmith_anvil_16',
    'Heavy iron anvil with horn, face, and hardy hole on a wood stump.',
    {
      A: { name: 'anvil_body', role: 'body' },
      H: { name: 'horn', role: 'head' },
      F: { name: 'anvil_face', role: 'accessory' },
      S: { name: 'wood_stump', role: 'belt' },
      D: { name: 'hardy_hole', role: 'eye' },
    },
    {
      body: C.darkIron,
      head: C.iron,
      accessory: C.iron,
      belt: C.wood,
      eye: C.black,
    },
    (g) => {
      // Anvil face (top)
      paintH(g, 'F', 4, 3, 12);
      paintH(g, 'F', 5, 3, 12);
      // Horn (left extension)
      paintPoints(g, 'H', [[1, 5], [2, 5], [2, 4]]);
      // Hardy hole
      paintPoints(g, 'D', [[10, 4]]);
      // Anvil body
      paintRect(g, 'A', 4, 6, 11, 8);
      paintRect(g, 'A', 3, 9, 12, 9);
      // Wood stump
      paintRect(g, 'S', 3, 10, 12, 14);
    },
  ),

  // ── 2. FORGE FURNACE ───────────────────────────────────────────
  makeTemplate(
    'forge_furnace_16',
    'Stone forge with blazing coals, bellows port, and chimney vent.',
    {
      B: { name: 'stone_body', role: 'body' },
      F: { name: 'fire_coals', role: 'head' },
      V: { name: 'chimney_vent', role: 'accessory' },
      O: { name: 'opening', role: 'arm' },
      G: { name: 'grate', role: 'belt' },
    },
    {
      body: C.stone,
      head: C.embers,
      accessory: C.darkIron,
      arm: C.fire,
      belt: C.darkIron,
    },
    (g) => {
      // Chimney
      paintRect(g, 'V', 6, 1, 9, 3);
      // Stone body
      paintRect(g, 'B', 2, 4, 13, 13);
      // Opening
      paintRect(g, 'O', 4, 7, 11, 10);
      // Fire/coals inside
      paintRect(g, 'F', 5, 8, 10, 10);
      paintPoints(g, 'F', [[6, 7], [8, 7], [10, 7]]);
      // Grate
      paintH(g, 'G', 11, 4, 11);
      paintPoints(g, 'G', [[5, 11], [7, 11], [9, 11]]);
    },
  ),

  // ── 3. CRAFTING WORKBENCH ──────────────────────────────────────
  makeTemplate(
    'crafting_workbench_16',
    'Wooden workbench with vise, tools hanging, and storage shelf.',
    {
      T: { name: 'table_top', role: 'body' },
      L: { name: 'legs_frame', role: 'arm' },
      V: { name: 'vise_clamp', role: 'accessory' },
      S: { name: 'shelf_bottom', role: 'belt' },
      H: { name: 'hanging_tools', role: 'head' },
    },
    {
      body: C.wood,
      arm: C.darkWood,
      accessory: C.iron,
      belt: C.wood,
      head: C.iron,
    },
    (g) => {
      // Tools hanging on back wall
      paintPoints(g, 'H', [[4, 2], [5, 3], [7, 1], [7, 2], [9, 2], [9, 3], [11, 2]]);
      // Table top
      paintRect(g, 'T', 1, 5, 14, 7);
      // Vise
      paintRect(g, 'V', 12, 5, 14, 9);
      // Legs
      paintV(g, 'L', 2, 8, 14);
      paintV(g, 'L', 3, 8, 14);
      paintV(g, 'L', 12, 10, 14);
      paintV(g, 'L', 13, 10, 14);
      // Bottom shelf
      paintH(g, 'S', 12, 3, 12);
      paintRect(g, 'S', 4, 11, 11, 11);
    },
  ),

  // ── 4. SPINNING WHEEL ─────────────────────────────────────────
  makeTemplate(
    'spinning_wheel_16',
    'Wooden spinning wheel with spindle, flyer, and treadle pedal.',
    {
      W: { name: 'wheel_rim', role: 'body' },
      S: { name: 'spokes', role: 'head' },
      F: { name: 'frame_legs', role: 'arm' },
      D: { name: 'spindle_flyer', role: 'accessory' },
      P: { name: 'treadle', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.leather,
      arm: C.darkWood,
      accessory: C.brass,
      belt: C.darkWood,
    },
    (g) => {
      // Wheel (large circle, left side)
      paintH(g, 'W', 2, 3, 7);
      paintH(g, 'W', 3, 2, 8);
      paintV(g, 'W', 1, 4, 10);
      paintV(g, 'W', 2, 3, 11);
      paintV(g, 'W', 9, 3, 11);
      paintV(g, 'W', 10, 4, 10);
      paintH(g, 'W', 11, 2, 8);
      paintH(g, 'W', 12, 3, 7);
      // Spokes
      paintPoints(g, 'S', [[5, 4], [6, 5], [5, 7], [6, 7], [5, 10], [6, 9]]);
      paintPoints(g, 'S', [[3, 7], [8, 7]]);
      // Spindle/flyer (right)
      paintRect(g, 'D', 11, 4, 13, 6);
      paintH(g, 'D', 7, 11, 13);
      // Frame
      paintV(g, 'F', 12, 8, 13);
      paintV(g, 'F', 13, 8, 13);
      paintH(g, 'F', 13, 1, 5);
      // Treadle
      paintH(g, 'P', 14, 3, 12);
    },
  ),

  // ── 5. MORTAR AND PESTLE ───────────────────────────────────────
  makeTemplate(
    'mortar_pestle_16',
    'Stone mortar bowl with wooden pestle and herb residue inside.',
    {
      M: { name: 'mortar_bowl', role: 'body' },
      P: { name: 'pestle', role: 'head' },
      H: { name: 'herb_residue', role: 'accessory' },
      R: { name: 'rim', role: 'arm' },
    },
    {
      body: C.stone,
      head: C.wood,
      accessory: C.green,
      arm: C.iron,
    },
    (g) => {
      // Pestle (diagonal, leaning out)
      paintPoints(g, 'P', [[10, 2], [11, 3], [10, 4], [9, 5], [9, 6]]);
      paintPoints(g, 'P', [[11, 2], [12, 3]]);
      // Rim
      paintH(g, 'R', 6, 3, 11);
      // Mortar bowl
      paintRect(g, 'M', 3, 7, 12, 12);
      paintV(g, 'M', 2, 7, 10);
      paintV(g, 'M', 13, 7, 10);
      paintH(g, 'M', 13, 4, 11);
      // Herb residue
      paintPoints(g, 'H', [[5, 8], [7, 7], [8, 9], [6, 10], [9, 8]]);
    },
  ),

  // ── 6. SEWING TABLE ────────────────────────────────────────────
  makeTemplate(
    'sewing_table_16',
    'Compact sewing station with fabric roll, thread spools, and scissors.',
    {
      T: { name: 'table_surface', role: 'body' },
      F: { name: 'fabric_roll', role: 'head' },
      S: { name: 'thread_spools', role: 'accessory' },
      C: { name: 'scissors', role: 'arm' },
      L: { name: 'table_legs', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.blue,
      accessory: C.fire,
      arm: C.iron,
      belt: C.darkWood,
    },
    (g) => {
      // Table
      paintRect(g, 'T', 1, 7, 14, 9);
      // Fabric roll (on table)
      paintRect(g, 'F', 2, 4, 6, 7);
      paintH(g, 'F', 3, 3, 5);
      // Thread spools
      paintPoints(g, 'S', [[8, 5], [8, 6], [10, 5], [10, 6], [12, 5], [12, 6]]);
      // Scissors
      paintPoints(g, 'C', [[9, 7], [10, 7], [11, 8]]);
      // Legs
      paintV(g, 'L', 2, 10, 14);
      paintV(g, 'L', 3, 10, 14);
      paintV(g, 'L', 12, 10, 14);
      paintV(g, 'L', 13, 10, 14);
    },
  ),

  // ── 7. POTTERY WHEEL ──────────────────────────────────────────
  makeTemplate(
    'pottery_wheel_16',
    'Pottery wheel with clay pot forming, splash guard, and kick pedal.',
    {
      W: { name: 'wheel_disc', role: 'body' },
      P: { name: 'clay_pot', role: 'head' },
      S: { name: 'splash_guard', role: 'arm' },
      B: { name: 'pedal_base', role: 'belt' },
      C: { name: 'clay_splatter', role: 'accessory' },
    },
    {
      body: C.darkIron,
      head: C.clay,
      arm: C.stone,
      belt: C.wood,
      accessory: C.leather,
    },
    (g) => {
      // Clay pot (forming)
      paintRect(g, 'P', 5, 3, 10, 6);
      paintH(g, 'P', 2, 6, 9);
      paintH(g, 'P', 7, 6, 9);
      // Splash guard
      paintV(g, 'S', 3, 4, 8);
      paintV(g, 'S', 12, 4, 8);
      // Wheel disc
      paintH(g, 'W', 8, 4, 11);
      paintH(g, 'W', 9, 4, 11);
      // Clay splatter
      paintPoints(g, 'C', [[4, 5], [11, 6], [13, 7]]);
      // Stand and pedal
      paintV(g, 'B', 7, 10, 13);
      paintV(g, 'B', 8, 10, 13);
      paintH(g, 'B', 14, 4, 11);
    },
  ),

  // ── 8. ALCHEMY STATION ─────────────────────────────────────────
  makeTemplate(
    'alchemy_station_16',
    'Alchemy table with bubbling flask, ingredient jars, and open recipe book.',
    {
      T: { name: 'table', role: 'body' },
      F: { name: 'bubbling_flask', role: 'head' },
      J: { name: 'ingredient_jars', role: 'accessory' },
      K: { name: 'recipe_book', role: 'arm' },
      B: { name: 'bubbles', role: 'eye' },
    },
    {
      body: C.wood,
      head: C.glass,
      accessory: C.green,
      arm: C.leather,
      eye: C.blue,
    },
    (g) => {
      // Table
      paintRect(g, 'T', 1, 8, 14, 10);
      paintV(g, 'T', 2, 11, 14);
      paintV(g, 'T', 13, 11, 14);
      // Flask (center)
      paintRect(g, 'F', 6, 4, 9, 8);
      paintH(g, 'F', 3, 7, 8);
      // Bubbles
      paintPoints(g, 'B', [[7, 2], [8, 3], [7, 5]]);
      // Jars (left)
      paintRect(g, 'J', 2, 5, 4, 8);
      paintH(g, 'J', 4, 3, 3);
      // Recipe book (right)
      paintRect(g, 'K', 11, 5, 13, 8);
      paintPoints(g, 'K', [[12, 6], [12, 7]]);
    },
  ),

  // ── 9. TANNING RACK ────────────────────────────────────────────
  makeTemplate(
    'tanning_rack_16',
    'Leather tanning rack with stretched hide, wooden frame, and pegs.',
    {
      F: { name: 'wood_frame', role: 'body' },
      H: { name: 'stretched_hide', role: 'head' },
      P: { name: 'pegs_ties', role: 'accessory' },
      B: { name: 'base_feet', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.leather,
      accessory: C.rope,
      belt: C.darkWood,
    },
    (g) => {
      // Frame (A-shape)
      paintV(g, 'F', 2, 2, 13);
      paintV(g, 'F', 3, 2, 13);
      paintV(g, 'F', 12, 2, 13);
      paintV(g, 'F', 13, 2, 13);
      paintH(g, 'F', 2, 4, 11);
      // Stretched hide
      paintRect(g, 'H', 4, 3, 11, 11);
      // Pegs/ties
      paintPoints(g, 'P', [[4, 3], [7, 3], [11, 3], [4, 11], [7, 11], [11, 11]]);
      paintPoints(g, 'P', [[3, 6], [3, 9], [12, 6], [12, 9]]);
      // Base
      paintH(g, 'B', 14, 1, 5);
      paintH(g, 'B', 14, 10, 14);
    },
  ),

  // ── 10. SMELTING CRUCIBLE ──────────────────────────────────────
  makeTemplate(
    'smelting_crucible_16',
    'Red-hot crucible with molten metal, tongs, and brick stand.',
    {
      C: { name: 'crucible', role: 'body' },
      M: { name: 'molten_metal', role: 'head' },
      T: { name: 'tongs', role: 'accessory' },
      S: { name: 'brick_stand', role: 'belt' },
      G: { name: 'glow', role: 'eye' },
    },
    {
      body: C.darkIron,
      head: C.embers,
      accessory: C.iron,
      belt: C.fire,
      eye: C.gold,
    },
    (g) => {
      // Crucible
      paintRect(g, 'C', 4, 4, 11, 9);
      paintH(g, 'C', 3, 5, 10);
      paintH(g, 'C', 10, 5, 10);
      // Molten metal inside
      paintRect(g, 'M', 5, 5, 10, 7);
      // Glow
      paintPoints(g, 'G', [[6, 5], [8, 4], [9, 6]]);
      // Tongs (right side)
      paintPoints(g, 'T', [[12, 5], [13, 4], [14, 3], [12, 6], [13, 5]]);
      // Brick stand
      paintRect(g, 'S', 3, 11, 12, 14);
      paintH(g, 'S', 10, 4, 11);
    },
  ),

  // ── 11. TOOL RACK ──────────────────────────────────────────────
  makeTemplate(
    'tool_rack_16',
    'Wall-mounted tool rack with hammer, saw, wrench, and pegs.',
    {
      B: { name: 'backboard', role: 'body' },
      T: { name: 'tools_hanging', role: 'head' },
      P: { name: 'pegs', role: 'accessory' },
      F: { name: 'frame', role: 'arm' },
      S: { name: 'shelf', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.iron,
      accessory: C.brass,
      arm: C.darkWood,
      belt: C.wood,
    },
    (g) => {
      // Backboard
      paintRect(g, 'B', 2, 2, 13, 13);
      // Frame
      paintH(g, 'F', 2, 2, 13);
      paintH(g, 'F', 13, 2, 13);
      paintV(g, 'F', 2, 2, 13);
      paintV(g, 'F', 13, 2, 13);
      // Pegs row
      paintPoints(g, 'P', [[4, 4], [7, 4], [10, 4]]);
      paintPoints(g, 'P', [[4, 8], [7, 8], [10, 8]]);
      // Tools (hanging from pegs)
      paintV(g, 'T', 4, 5, 7);   // hammer
      paintV(g, 'T', 7, 5, 7);   // wrench
      paintV(g, 'T', 10, 5, 7);  // saw
      paintH(g, 'T', 5, 3, 5);   // hammer head
      paintPoints(g, 'T', [[9, 6], [11, 6]]);
      // Bottom shelf
      paintH(g, 'S', 10, 3, 12);
      paintRect(g, 'S', 4, 11, 11, 12);
    },
  ),

  // ── 12. GRINDING WHEEL ─────────────────────────────────────────
  makeTemplate(
    'grinding_wheel_16',
    'Pedal grinding wheel with stone disc, trough, and foot treadle.',
    {
      S: { name: 'stone_wheel', role: 'body' },
      F: { name: 'frame', role: 'arm' },
      H: { name: 'handle_crank', role: 'accessory' },
      T: { name: 'trough', role: 'head' },
      P: { name: 'treadle_pedal', role: 'belt' },
    },
    {
      body: C.stone,
      arm: C.wood,
      accessory: C.iron,
      head: C.darkWood,
      belt: C.darkWood,
    },
    (g) => {
      // Stone wheel (circle)
      paintRect(g, 'S', 5, 3, 10, 10);
      paintH(g, 'S', 2, 6, 9);
      paintH(g, 'S', 11, 6, 9);
      paintV(g, 'S', 4, 4, 9);
      paintV(g, 'S', 11, 4, 9);
      // Handle/crank
      paintPoints(g, 'H', [[12, 6], [13, 5], [13, 6]]);
      // Frame/supports
      paintV(g, 'F', 3, 5, 13);
      paintV(g, 'F', 12, 7, 13);
      paintH(g, 'F', 13, 3, 12);
      // Trough (under wheel)
      paintRect(g, 'T', 4, 11, 11, 12);
      // Treadle
      paintH(g, 'P', 14, 1, 6);
    },
  ),

  // ── 13. BELLOWS ────────────────────────────────────────────────
  makeTemplate(
    'forge_bellows_16',
    'Large fireplace bellows with leather body, wood handles, and metal nozzle.',
    {
      B: { name: 'leather_body', role: 'body' },
      H: { name: 'wood_handles', role: 'head' },
      N: { name: 'metal_nozzle', role: 'accessory' },
      R: { name: 'rivets', role: 'arm' },
      A: { name: 'air_blast', role: 'eye' },
    },
    {
      body: C.leather,
      head: C.wood,
      accessory: C.iron,
      arm: C.brass,
      eye: C.paper,
    },
    (g) => {
      // Handles (wide end, right)
      paintRect(g, 'H', 11, 4, 14, 5);
      paintRect(g, 'H', 11, 10, 14, 11);
      // Leather body (triangular, pointing left)
      paintRect(g, 'B', 4, 5, 11, 10);
      paintRect(g, 'B', 6, 4, 10, 11);
      paintRect(g, 'B', 3, 6, 5, 9);
      // Rivets along fold
      paintPoints(g, 'R', [[7, 5], [9, 5], [7, 10], [9, 10]]);
      // Metal nozzle (left tip)
      paintRect(g, 'N', 1, 7, 3, 8);
      // Air blast
      paintPoints(g, 'A', [[0, 7], [0, 8]]);
    },
  ),

  // ── 14. WEAVING LOOM ───────────────────────────────────────────
  makeTemplate(
    'weaving_loom_16',
    'Tabletop loom with warp threads, shuttle, and partially woven fabric.',
    {
      F: { name: 'loom_frame', role: 'body' },
      W: { name: 'warp_threads', role: 'head' },
      S: { name: 'shuttle', role: 'accessory' },
      C: { name: 'woven_cloth', role: 'arm' },
      B: { name: 'beam_rollers', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.paper,
      accessory: C.fire,
      arm: C.blue,
      belt: C.darkWood,
    },
    (g) => {
      // Frame uprights
      paintV(g, 'F', 2, 2, 14);
      paintV(g, 'F', 3, 2, 14);
      paintV(g, 'F', 12, 2, 14);
      paintV(g, 'F', 13, 2, 14);
      // Top beam
      paintH(g, 'B', 2, 3, 12);
      // Bottom beam
      paintH(g, 'B', 14, 3, 12);
      // Warp threads
      paintV(g, 'W', 5, 3, 8);
      paintV(g, 'W', 7, 3, 8);
      paintV(g, 'W', 9, 3, 8);
      paintV(g, 'W', 11, 3, 8);
      // Shuttle
      paintH(g, 'S', 7, 4, 11);
      // Woven cloth (bottom part)
      paintRect(g, 'C', 4, 9, 11, 13);
    },
  ),

  // ── 15. WOODWORKING LATHE ──────────────────────────────────────
  makeTemplate(
    'woodworking_lathe_16',
    'Foot-powered wood lathe with spinning workpiece, tool rest, and chuck.',
    {
      B: { name: 'lathe_bed', role: 'body' },
      W: { name: 'workpiece', role: 'head' },
      C: { name: 'chuck_headstock', role: 'accessory' },
      T: { name: 'tool_rest', role: 'arm' },
      L: { name: 'legs', role: 'belt' },
    },
    {
      body: C.darkIron,
      head: C.wood,
      accessory: C.iron,
      arm: C.iron,
      belt: C.wood,
    },
    (g) => {
      // Lathe bed (horizontal)
      paintRect(g, 'B', 1, 7, 14, 9);
      // Chuck/headstock (left)
      paintRect(g, 'C', 1, 5, 3, 10);
      // Workpiece
      paintH(g, 'W', 6, 4, 10);
      paintH(g, 'W', 7, 4, 10);
      paintH(g, 'W', 8, 4, 10);
      // Tailstock (right)
      paintRect(g, 'C', 12, 5, 14, 10);
      // Tool rest
      paintRect(g, 'T', 6, 10, 10, 10);
      paintV(g, 'T', 8, 10, 11);
      // Legs
      paintV(g, 'L', 2, 11, 14);
      paintV(g, 'L', 13, 11, 14);
    },
  ),

  // ── 16. CAULDRON ───────────────────────────────────────────────
  makeTemplate(
    'brew_cauldron_16',
    'Cast iron cauldron over fire with bubbling brew and hanging chain.',
    {
      C: { name: 'cauldron', role: 'body' },
      B: { name: 'bubbling_brew', role: 'head' },
      F: { name: 'fire_underneath', role: 'arm' },
      H: { name: 'chain_handle', role: 'accessory' },
      S: { name: 'steam_bubbles', role: 'eye' },
    },
    {
      body: C.darkIron,
      head: C.green,
      arm: C.embers,
      accessory: C.iron,
      eye: C.paper,
    },
    (g) => {
      // Chain/handle
      paintV(g, 'H', 7, 1, 3);
      paintV(g, 'H', 8, 1, 3);
      paintPoints(g, 'H', [[5, 3], [6, 3], [9, 3], [10, 3]]);
      // Cauldron rim
      paintH(g, 'C', 4, 4, 11);
      // Cauldron body
      paintRect(g, 'C', 3, 5, 12, 10);
      paintH(g, 'C', 11, 4, 11);
      // Brew
      paintRect(g, 'B', 4, 5, 11, 7);
      // Steam
      paintPoints(g, 'S', [[6, 2], [9, 1], [5, 1]]);
      // Fire underneath
      paintH(g, 'F', 12, 5, 10);
      paintPoints(g, 'F', [[6, 13], [8, 13], [10, 13], [7, 14], [9, 14]]);
    },
  ),

  // ── 17. ENCHANTING TABLE ───────────────────────────────────────
  makeTemplate(
    'enchanting_table_16',
    'Magic enchanting table with glowing runes, open tome, and crystal focus.',
    {
      T: { name: 'table_body', role: 'body' },
      R: { name: 'glowing_runes', role: 'head' },
      B: { name: 'open_tome', role: 'arm' },
      C: { name: 'crystal_focus', role: 'accessory' },
      G: { name: 'magic_glow', role: 'eye' },
    },
    {
      body: C.darkIron,
      head: C.blue,
      arm: C.leather,
      accessory: C.glass,
      eye: C.gold,
    },
    (g) => {
      // Crystal focus (hovering)
      paintPoints(g, 'C', [[7, 1], [8, 1], [7, 2], [8, 2]]);
      paintPoints(g, 'G', [[6, 2], [9, 2], [7, 3], [8, 3]]);
      // Table top
      paintRect(g, 'T', 2, 6, 13, 8);
      // Runes on table
      paintPoints(g, 'R', [[4, 7], [6, 7], [8, 7], [10, 7], [12, 7]]);
      // Open tome
      paintRect(g, 'B', 4, 4, 11, 6);
      paintV(g, 'B', 7, 4, 6);
      // Table legs
      paintV(g, 'T', 3, 9, 14);
      paintV(g, 'T', 4, 9, 14);
      paintV(g, 'T', 11, 9, 14);
      paintV(g, 'T', 12, 9, 14);
    },
  ),

  // ── 18. KILN OVEN ─────────────────────────────────────────────
  makeTemplate(
    'kiln_oven_16',
    'Ceramic kiln with brick dome, fire window, and chimney stack.',
    {
      B: { name: 'brick_body', role: 'body' },
      D: { name: 'dome_top', role: 'head' },
      F: { name: 'fire_window', role: 'arm' },
      C: { name: 'chimney', role: 'accessory' },
      G: { name: 'fire_glow', role: 'eye' },
    },
    {
      body: C.fire,
      head: C.clay,
      arm: C.black,
      accessory: C.stone,
      eye: C.embers,
    },
    (g) => {
      // Chimney
      paintRect(g, 'C', 9, 1, 11, 4);
      // Dome
      paintH(g, 'D', 4, 3, 12);
      paintH(g, 'D', 3, 4, 11);
      paintH(g, 'D', 5, 3, 12);
      // Brick body
      paintRect(g, 'B', 2, 6, 13, 13);
      // Fire window (arch)
      paintRect(g, 'F', 5, 8, 10, 12);
      paintH(g, 'F', 7, 6, 9);
      // Fire glow inside
      paintPoints(g, 'G', [[6, 10], [8, 9], [9, 11], [7, 11]]);
    },
  ),

  // ── 19. SAWMILL LOG ────────────────────────────────────────────
  makeTemplate(
    'sawmill_station_16',
    'Sawmill station with circular blade, log, sawdust, and crank handle.',
    {
      B: { name: 'saw_blade', role: 'body' },
      L: { name: 'wood_log', role: 'head' },
      T: { name: 'table_frame', role: 'arm' },
      D: { name: 'sawdust', role: 'accessory' },
      H: { name: 'crank_handle', role: 'belt' },
    },
    {
      body: C.iron,
      head: C.wood,
      arm: C.darkWood,
      accessory: C.rope,
      belt: C.iron,
    },
    (g) => {
      // Saw blade (circular, center)
      paintRect(g, 'B', 5, 2, 10, 7);
      paintH(g, 'B', 1, 7, 8);
      paintH(g, 'B', 8, 7, 8);
      paintV(g, 'B', 4, 4, 5);
      paintV(g, 'B', 11, 4, 5);
      // Crank handle
      paintPoints(g, 'H', [[12, 4], [13, 3], [13, 4]]);
      // Table/frame
      paintRect(g, 'T', 1, 9, 14, 11);
      paintV(g, 'T', 2, 12, 14);
      paintV(g, 'T', 13, 12, 14);
      // Log (on table, being cut)
      paintRect(g, 'L', 1, 7, 5, 9);
      paintRect(g, 'L', 10, 7, 14, 9);
      // Sawdust
      paintPoints(g, 'D', [[6, 10], [8, 10], [7, 11], [9, 11]]);
    },
  ),

  // ── 20. CRYSTAL GRINDER ────────────────────────────────────────
  makeTemplate(
    'crystal_grinder_16',
    'Magic crystal grinding station with gem dust, collection tray, and hand crank.',
    {
      B: { name: 'grinder_base', role: 'body' },
      C: { name: 'crystal_hopper', role: 'head' },
      D: { name: 'gem_dust', role: 'accessory' },
      T: { name: 'collection_tray', role: 'arm' },
      H: { name: 'hand_crank', role: 'belt' },
    },
    {
      body: C.stone,
      head: C.glass,
      accessory: C.gold,
      arm: C.wood,
      belt: C.iron,
    },
    (g) => {
      // Crystal hopper (top, V-shape)
      paintH(g, 'C', 2, 4, 11);
      paintH(g, 'C', 3, 5, 10);
      paintH(g, 'C', 4, 6, 9);
      // Grinder body
      paintRect(g, 'B', 4, 5, 11, 9);
      paintH(g, 'B', 10, 5, 10);
      // Hand crank
      paintPoints(g, 'H', [[12, 6], [13, 5], [14, 5], [13, 6]]);
      // Collection tray
      paintRect(g, 'T', 3, 11, 12, 13);
      paintH(g, 'T', 10, 5, 10);
      // Gem dust (falling)
      paintPoints(g, 'D', [[7, 10], [8, 10], [6, 11], [9, 11], [7, 12], [8, 12]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'CRAFTING_BATCH1_TEMPLATES',
    schemes: 'CRAFTING_BATCH1_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
