/**
 * Crafting & Workshop batch 5 — Containers, Storage & Utility.
 * 20 original 16x16 templates — chests, crates, aprons, tools, timers.
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
  cream:     { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  cloth:     { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
};

const templates: CompactTemplate[] = [
  // ── 1. TOOL CHEST ──────────────────────────────────────────────
  makeTemplate(
    'tool_chest_16',
    'Sturdy wooden tool chest with metal latch, leather handles, and dividers.',
    {
      B: { name: 'chest_body', role: 'body' },
      L: { name: 'lid_top', role: 'head' },
      M: { name: 'metal_latch', role: 'accessory' },
      H: { name: 'leather_handles', role: 'arm' },
      D: { name: 'dividers', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.darkWood,
      accessory: C.brass,
      arm: C.leather,
      belt: C.iron,
    },
    (g) => {
      // Lid
      paintRect(g, 'L', 1, 3, 14, 5);
      // Metal latch (center front)
      paintPoints(g, 'M', [[7, 5], [8, 5], [7, 6], [8, 6]]);
      // Chest body
      paintRect(g, 'B', 1, 6, 14, 13);
      // Handles (sides)
      paintPoints(g, 'H', [[0, 8], [0, 9]]);
      paintPoints(g, 'H', [[15, 8], [15, 9]]);
      // Dividers inside (visible partition lines)
      paintV(g, 'D', 5, 7, 12);
      paintV(g, 'D', 10, 7, 12);
    },
  ),

  // ── 2. MATERIAL CRATE ──────────────────────────────────────────
  makeTemplate(
    'material_crate_16',
    'Open wooden shipping crate with straw packing and visible contents.',
    {
      C: { name: 'crate_planks', role: 'body' },
      S: { name: 'straw_packing', role: 'head' },
      N: { name: 'nails_hardware', role: 'accessory' },
      L: { name: 'label_stamp', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.rope,
      accessory: C.iron,
      arm: C.fire,
    },
    (g) => {
      // Crate body (open top)
      paintRect(g, 'C', 1, 5, 14, 14);
      // Plank separators
      paintH(g, 'C', 5, 1, 14);
      paintH(g, 'C', 9, 1, 14);
      paintH(g, 'C', 14, 1, 14);
      paintV(g, 'C', 1, 5, 14);
      paintV(g, 'C', 14, 5, 14);
      // Straw packing (top, spilling out)
      paintPoints(g, 'S', [[3, 4], [5, 3], [7, 4], [9, 3], [11, 4], [13, 3]]);
      paintRect(g, 'S', 2, 5, 13, 7);
      // Nails
      paintPoints(g, 'N', [[1, 6], [14, 6], [1, 10], [14, 10]]);
      // Label stamp
      paintRect(g, 'L', 4, 10, 8, 12);
    },
  ),

  // ── 3. INGREDIENT CABINET ──────────────────────────────────────
  makeTemplate(
    'ingredient_cabinet_16',
    'Wooden apothecary cabinet with labeled drawers and glass-front doors.',
    {
      F: { name: 'cabinet_frame', role: 'body' },
      D: { name: 'drawer_faces', role: 'head' },
      G: { name: 'glass_doors', role: 'accessory' },
      H: { name: 'drawer_pulls', role: 'arm' },
      L: { name: 'labels', role: 'eye' },
    },
    {
      body: C.wood,
      head: C.darkWood,
      accessory: C.glass,
      arm: C.brass,
      eye: C.paper,
    },
    (g) => {
      // Cabinet frame
      paintV(g, 'F', 1, 1, 14);
      paintV(g, 'F', 14, 1, 14);
      paintH(g, 'F', 1, 1, 14);
      paintH(g, 'F', 14, 1, 14);
      paintH(g, 'F', 7, 1, 14);
      // Top section: glass doors
      paintRect(g, 'G', 2, 2, 6, 6);
      paintRect(g, 'G', 8, 2, 13, 6);
      paintV(g, 'F', 7, 2, 6);
      // Bottom section: drawers
      paintRect(g, 'D', 2, 8, 6, 10);
      paintRect(g, 'D', 8, 8, 13, 10);
      paintRect(g, 'D', 2, 11, 6, 13);
      paintRect(g, 'D', 8, 11, 13, 13);
      // Drawer pulls
      paintPoints(g, 'H', [[4, 9], [10, 9], [4, 12], [10, 12]]);
      // Labels
      paintPoints(g, 'L', [[3, 9], [5, 9], [9, 9], [11, 9]]);
    },
  ),

  // ── 4. RECIPE BOARD ────────────────────────────────────────────
  makeTemplate(
    'recipe_board_16',
    'Wooden bulletin board with pinned recipe cards and ingredient lists.',
    {
      B: { name: 'board_body', role: 'body' },
      C: { name: 'recipe_cards', role: 'head' },
      P: { name: 'push_pins', role: 'accessory' },
      F: { name: 'frame_border', role: 'arm' },
    },
    {
      body: C.leather,
      head: C.paper,
      accessory: C.fire,
      arm: C.wood,
    },
    (g) => {
      // Frame border
      paintH(g, 'F', 1, 1, 14);
      paintH(g, 'F', 14, 1, 14);
      paintV(g, 'F', 1, 1, 14);
      paintV(g, 'F', 14, 1, 14);
      // Board body
      paintRect(g, 'B', 2, 2, 13, 13);
      // Recipe card 1 (top-left)
      paintRect(g, 'C', 3, 3, 7, 7);
      paintPoints(g, 'P', [[5, 3]]);
      // Recipe card 2 (top-right)
      paintRect(g, 'C', 9, 3, 12, 6);
      paintPoints(g, 'P', [[10, 3]]);
      // Recipe card 3 (bottom)
      paintRect(g, 'C', 4, 9, 11, 12);
      paintPoints(g, 'P', [[7, 9]]);
    },
  ),

  // ── 5. APPRENTICE APRON ────────────────────────────────────────
  makeTemplate(
    'apprentice_apron_16',
    'Leather work apron with tool pockets, loops, and neck strap.',
    {
      A: { name: 'apron_body', role: 'body' },
      P: { name: 'pockets', role: 'head' },
      S: { name: 'straps', role: 'accessory' },
      T: { name: 'pocket_tools', role: 'arm' },
    },
    {
      body: C.leather,
      head: C.darkWood,
      accessory: C.rope,
      arm: C.iron,
    },
    (g) => {
      // Neck strap
      paintPoints(g, 'S', [[6, 1], [7, 1], [8, 1], [9, 1]]);
      paintPoints(g, 'S', [[5, 2], [10, 2]]);
      // Apron body (A-shape)
      paintRect(g, 'A', 4, 3, 11, 13);
      paintV(g, 'A', 3, 5, 13);
      paintV(g, 'A', 12, 5, 13);
      // Side tie straps
      paintPoints(g, 'S', [[2, 5], [1, 6], [13, 5], [14, 6]]);
      // Pockets
      paintRect(g, 'P', 4, 8, 7, 12);
      paintRect(g, 'P', 8, 9, 11, 12);
      // Tools peeking out of pockets
      paintPoints(g, 'T', [[5, 7], [6, 7], [9, 8], [10, 8]]);
    },
  ),

  // ── 6. WORK GLOVES ────────────────────────────────────────────
  makeTemplate(
    'work_gloves_16',
    'Pair of heavy work gloves with reinforced palms and stitching.',
    {
      G: { name: 'glove_body', role: 'body' },
      P: { name: 'palm_reinforcement', role: 'head' },
      S: { name: 'stitching_lines', role: 'accessory' },
      C: { name: 'cuff_edge', role: 'arm' },
    },
    {
      body: C.leather,
      head: C.darkWood,
      accessory: C.rope,
      arm: C.wood,
    },
    (g) => {
      // Left glove
      paintRect(g, 'G', 1, 5, 5, 13);
      paintV(g, 'G', 2, 3, 5);
      paintV(g, 'G', 3, 2, 5);
      paintV(g, 'G', 4, 3, 5);
      paintV(g, 'G', 5, 4, 5);
      paintPoints(g, 'G', [[0, 7], [0, 8]]);
      // Left palm
      paintPoints(g, 'P', [[2, 8], [3, 8], [4, 8], [2, 9], [3, 9], [4, 9]]);
      // Left cuff
      paintH(g, 'C', 13, 1, 5);
      // Left stitching
      paintPoints(g, 'S', [[3, 5], [3, 10]]);
      // Right glove
      paintRect(g, 'G', 9, 5, 14, 13);
      paintV(g, 'G', 10, 4, 5);
      paintV(g, 'G', 11, 3, 5);
      paintV(g, 'G', 12, 2, 5);
      paintV(g, 'G', 13, 3, 5);
      paintPoints(g, 'G', [[15, 7], [15, 8]]);
      // Right palm
      paintPoints(g, 'P', [[10, 8], [11, 8], [12, 8], [10, 9], [11, 9], [12, 9]]);
      // Right cuff
      paintH(g, 'C', 13, 9, 14);
      // Right stitching
      paintPoints(g, 'S', [[12, 5], [12, 10]]);
    },
  ),

  // ── 7. SAFETY GOGGLES ──────────────────────────────────────────
  makeTemplate(
    'safety_goggles_16',
    'Brass-framed safety goggles with round glass lenses and leather strap.',
    {
      F: { name: 'brass_frame', role: 'body' },
      G: { name: 'glass_lenses', role: 'head' },
      S: { name: 'leather_strap', role: 'accessory' },
      B: { name: 'nose_bridge', role: 'arm' },
    },
    {
      body: C.brass,
      head: C.glass,
      accessory: C.leather,
      arm: C.brass,
    },
    (g) => {
      // Leather strap (extends left and right)
      paintH(g, 'S', 7, 0, 2);
      paintH(g, 'S', 8, 0, 2);
      paintH(g, 'S', 7, 13, 15);
      paintH(g, 'S', 8, 13, 15);
      // Left lens frame
      paintRect(g, 'F', 2, 5, 7, 10);
      paintH(g, 'F', 4, 3, 6);
      paintH(g, 'F', 11, 3, 6);
      // Left glass lens
      paintRect(g, 'G', 3, 6, 6, 9);
      // Nose bridge
      paintH(g, 'B', 7, 7, 8);
      paintH(g, 'B', 8, 7, 8);
      // Right lens frame
      paintRect(g, 'F', 8, 5, 13, 10);
      paintH(g, 'F', 4, 9, 12);
      paintH(g, 'F', 11, 9, 12);
      // Right glass lens
      paintRect(g, 'G', 9, 6, 12, 9);
    },
  ),

  // ── 8. DUST MASK ───────────────────────────────────────────────
  makeTemplate(
    'dust_mask_16',
    'Cloth dust mask with filter pocket, elastic straps, and nose wire.',
    {
      M: { name: 'mask_body', role: 'body' },
      F: { name: 'filter_panel', role: 'head' },
      S: { name: 'elastic_straps', role: 'accessory' },
      N: { name: 'nose_wire', role: 'arm' },
    },
    {
      body: C.cloth,
      head: C.paper,
      accessory: C.rope,
      arm: C.iron,
    },
    (g) => {
      // Straps (extending left and right)
      paintPoints(g, 'S', [[1, 5], [2, 5], [1, 10], [2, 10]]);
      paintPoints(g, 'S', [[13, 5], [14, 5], [13, 10], [14, 10]]);
      // Mask body
      paintRect(g, 'M', 3, 4, 12, 11);
      paintH(g, 'M', 3, 5, 10);
      paintH(g, 'M', 12, 5, 10);
      // Nose wire (top center)
      paintH(g, 'N', 4, 5, 10);
      // Filter panel (center)
      paintRect(g, 'F', 5, 6, 10, 9);
    },
  ),

  // ── 9. BLUEPRINT SCROLL ────────────────────────────────────────
  makeTemplate(
    'blueprint_scroll_16',
    'Rolled blueprint with visible schematic lines and measurement marks.',
    {
      P: { name: 'paper_body', role: 'body' },
      L: { name: 'schematic_lines', role: 'head' },
      R: { name: 'roll_ends', role: 'accessory' },
      M: { name: 'measurements', role: 'arm' },
    },
    {
      body: C.blue,
      head: C.paper,
      accessory: C.clay,
      arm: C.cream,
    },
    (g) => {
      // Unrolled paper body
      paintRect(g, 'P', 2, 3, 13, 12);
      // Roll ends (top and bottom cylinders)
      paintH(g, 'R', 2, 1, 14);
      paintH(g, 'R', 3, 1, 14);
      paintH(g, 'R', 12, 1, 14);
      paintH(g, 'R', 13, 1, 14);
      // Schematic lines (white on blue)
      paintH(g, 'L', 5, 3, 12);
      paintH(g, 'L', 8, 3, 12);
      paintV(g, 'L', 5, 4, 11);
      paintV(g, 'L', 10, 4, 11);
      // Measurement marks
      paintPoints(g, 'M', [[4, 6], [7, 6], [12, 6], [4, 10], [8, 10]]);
    },
  ),

  // ── 10. PATTERN TEMPLATE ───────────────────────────────────────
  makeTemplate(
    'pattern_template_16',
    'Cardboard pattern template with cut-out shapes and pencil marks.',
    {
      C: { name: 'cardboard_body', role: 'body' },
      S: { name: 'cut_shapes', role: 'head' },
      M: { name: 'pencil_marks', role: 'accessory' },
      E: { name: 'edge_trim', role: 'arm' },
    },
    {
      body: C.paper,
      head: C.darkWood,
      accessory: C.stone,
      arm: C.leather,
    },
    (g) => {
      // Cardboard body
      paintRect(g, 'C', 1, 2, 14, 13);
      // Edge trim
      paintH(g, 'E', 2, 1, 14);
      paintH(g, 'E', 13, 1, 14);
      paintV(g, 'E', 1, 2, 13);
      paintV(g, 'E', 14, 2, 13);
      // Cut-out shapes (holes in template)
      paintRect(g, 'S', 3, 4, 6, 7);
      paintRect(g, 'S', 8, 4, 12, 6);
      paintRect(g, 'S', 3, 9, 5, 11);
      paintRect(g, 'S', 9, 8, 12, 11);
      // Pencil marks
      paintPoints(g, 'M', [[7, 8], [7, 9], [7, 10], [7, 11]]);
    },
  ),

  // ── 11. QUALITY STAMP ──────────────────────────────────────────
  makeTemplate(
    'quality_stamp_16',
    'Official quality approval stamp with wooden handle and ink pad.',
    {
      H: { name: 'wooden_handle', role: 'body' },
      D: { name: 'stamp_die', role: 'head' },
      P: { name: 'ink_pad', role: 'accessory' },
      I: { name: 'ink_stain', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.brass,
      accessory: C.fire,
      arm: C.fire,
    },
    (g) => {
      // Stamp handle (vertical, left)
      paintRect(g, 'H', 2, 2, 5, 8);
      // Stamp die (bottom of handle)
      paintRect(g, 'D', 1, 9, 6, 10);
      // Ink pad (right section)
      paintRect(g, 'P', 8, 7, 14, 12);
      paintH(g, 'P', 6, 9, 13);
      // Ink stain (near stamp)
      paintPoints(g, 'I', [[3, 11], [4, 12], [5, 11]]);
    },
  ),

  // ── 12. CRAFT BELL ─────────────────────────────────────────────
  makeTemplate(
    'craft_bell_16',
    'Service bell for the workshop counter with brass dome and wooden base.',
    {
      D: { name: 'bell_dome', role: 'body' },
      B: { name: 'bell_button', role: 'head' },
      R: { name: 'bell_rim', role: 'accessory' },
      W: { name: 'wood_base', role: 'arm' },
    },
    {
      body: C.brass,
      head: C.darkIron,
      accessory: C.gold,
      arm: C.wood,
    },
    (g) => {
      // Button on top
      paintPoints(g, 'B', [[7, 3], [8, 3]]);
      // Bell dome
      paintH(g, 'D', 4, 6, 9);
      paintH(g, 'D', 5, 5, 10);
      paintH(g, 'D', 6, 4, 11);
      paintH(g, 'D', 7, 3, 12);
      paintH(g, 'D', 8, 3, 12);
      paintH(g, 'D', 9, 2, 13);
      // Bell rim
      paintH(g, 'R', 10, 2, 13);
      paintH(g, 'R', 11, 2, 13);
      // Wood base
      paintRect(g, 'W', 1, 12, 14, 14);
    },
  ),

  // ── 13. ORDER CLIPBOARD ────────────────────────────────────────
  makeTemplate(
    'order_clipboard_16',
    'Workshop clipboard with order sheet, metal clip, and check marks.',
    {
      B: { name: 'board_body', role: 'body' },
      P: { name: 'paper_sheet', role: 'head' },
      C: { name: 'metal_clip', role: 'accessory' },
      K: { name: 'check_marks', role: 'arm' },
      L: { name: 'text_lines', role: 'eye' },
    },
    {
      body: C.wood,
      head: C.paper,
      accessory: C.iron,
      arm: C.green,
      eye: C.stone,
    },
    (g) => {
      // Board body
      paintRect(g, 'B', 3, 1, 12, 14);
      // Metal clip (top)
      paintRect(g, 'C', 5, 1, 10, 3);
      // Paper sheet
      paintRect(g, 'P', 4, 3, 11, 13);
      // Text lines
      paintH(g, 'L', 5, 6, 10);
      paintH(g, 'L', 7, 6, 10);
      paintH(g, 'L', 9, 6, 10);
      paintH(g, 'L', 11, 6, 10);
      // Check marks
      paintPoints(g, 'K', [[5, 5], [5, 7], [5, 9]]);
    },
  ),

  // ── 14. DELIVERY CRATE ─────────────────────────────────────────
  makeTemplate(
    'delivery_crate_16',
    'Sealed delivery crate with rope binding, shipping label, and stamps.',
    {
      C: { name: 'crate_body', role: 'body' },
      R: { name: 'rope_binding', role: 'head' },
      L: { name: 'shipping_label', role: 'accessory' },
      S: { name: 'stamps', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.rope,
      accessory: C.paper,
      arm: C.fire,
    },
    (g) => {
      // Crate body
      paintRect(g, 'C', 1, 3, 14, 14);
      // Lid (top planks)
      paintH(g, 'C', 3, 1, 14);
      paintH(g, 'C', 4, 1, 14);
      // Rope binding (cross pattern)
      paintH(g, 'R', 5, 1, 14);
      paintV(g, 'R', 7, 3, 14);
      // Shipping label (front)
      paintRect(g, 'L', 9, 7, 13, 11);
      // Stamps
      paintPoints(g, 'S', [[10, 8], [12, 10]]);
    },
  ),

  // ── 15. WASTE BIN ──────────────────────────────────────────────
  makeTemplate(
    'waste_bin_16',
    'Workshop waste bin with wood shavings and scrap material overflowing.',
    {
      B: { name: 'bin_body', role: 'body' },
      W: { name: 'wood_shavings', role: 'head' },
      R: { name: 'bin_rim', role: 'accessory' },
      S: { name: 'scrap_bits', role: 'arm' },
    },
    {
      body: C.darkIron,
      head: C.rope,
      accessory: C.iron,
      arm: C.stone,
    },
    (g) => {
      // Bin rim
      paintH(g, 'R', 5, 3, 12);
      paintH(g, 'R', 6, 3, 12);
      // Bin body (tapers down)
      paintRect(g, 'B', 3, 7, 12, 13);
      paintV(g, 'B', 4, 7, 14);
      paintV(g, 'B', 11, 7, 14);
      paintH(g, 'B', 14, 4, 11);
      // Wood shavings (overflowing)
      paintPoints(g, 'W', [[4, 4], [6, 3], [8, 4], [10, 3], [12, 4]]);
      paintPoints(g, 'W', [[5, 5], [7, 5], [9, 5], [11, 5]]);
      // Scrap bits (near bin)
      paintPoints(g, 'S', [[2, 13], [13, 14], [1, 14]]);
    },
  ),

  // ── 16. SWEEP BROOM ────────────────────────────────────────────
  makeTemplate(
    'sweep_broom_16',
    'Workshop broom with straw bristles, wooden handle, and binding twine.',
    {
      H: { name: 'broom_handle', role: 'body' },
      B: { name: 'straw_bristles', role: 'head' },
      T: { name: 'binding_twine', role: 'accessory' },
      D: { name: 'dust_debris', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.rope,
      accessory: C.darkWood,
      arm: C.stone,
    },
    (g) => {
      // Handle (long, angled slightly)
      paintV(g, 'H', 7, 1, 8);
      paintV(g, 'H', 8, 1, 8);
      // Binding twine
      paintH(g, 'T', 9, 5, 10);
      paintH(g, 'T', 10, 5, 10);
      // Straw bristles (wide, bottom)
      paintRect(g, 'B', 3, 11, 12, 14);
      paintH(g, 'B', 10, 5, 10);
      paintV(g, 'B', 4, 10, 14);
      paintV(g, 'B', 5, 10, 14);
      paintV(g, 'B', 6, 11, 14);
      paintV(g, 'B', 7, 11, 14);
      paintV(g, 'B', 8, 11, 14);
      paintV(g, 'B', 9, 11, 14);
      paintV(g, 'B', 10, 10, 14);
      paintV(g, 'B', 11, 10, 14);
      // Dust debris
      paintPoints(g, 'D', [[2, 14], [13, 14], [4, 14], [11, 14]]);
    },
  ),

  // ── 17. BUCKET WATER ───────────────────────────────────────────
  makeTemplate(
    'bucket_water_16',
    'Wooden water bucket with iron bands, rope handle, and water surface.',
    {
      B: { name: 'bucket_body', role: 'body' },
      W: { name: 'water_surface', role: 'head' },
      M: { name: 'metal_bands', role: 'accessory' },
      H: { name: 'rope_handle', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.blue,
      accessory: C.iron,
      arm: C.rope,
    },
    (g) => {
      // Rope handle (arch)
      paintPoints(g, 'H', [[4, 2], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 2]]);
      // Bucket body
      paintRect(g, 'B', 3, 4, 12, 13);
      paintV(g, 'B', 2, 5, 12);
      paintV(g, 'B', 13, 5, 12);
      paintH(g, 'B', 14, 4, 11);
      // Metal bands
      paintH(g, 'M', 4, 2, 13);
      paintH(g, 'M', 8, 2, 13);
      paintH(g, 'M', 13, 3, 12);
      // Water surface
      paintH(g, 'W', 5, 3, 12);
      paintH(g, 'W', 6, 3, 12);
      paintH(g, 'W', 7, 3, 12);
    },
  ),

  // ── 18. HOURGLASS TIMER ────────────────────────────────────────
  makeTemplate(
    'hourglass_timer_16',
    'Ornate hourglass timer with brass frame, flowing sand, and wooden caps.',
    {
      F: { name: 'brass_frame', role: 'body' },
      G: { name: 'glass_bulbs', role: 'head' },
      S: { name: 'flowing_sand', role: 'accessory' },
      W: { name: 'wood_caps', role: 'arm' },
    },
    {
      body: C.brass,
      head: C.glass,
      accessory: C.gold,
      arm: C.wood,
    },
    (g) => {
      // Top wood cap
      paintH(g, 'W', 1, 3, 12);
      paintH(g, 'W', 2, 3, 12);
      // Bottom wood cap
      paintH(g, 'W', 13, 3, 12);
      paintH(g, 'W', 14, 3, 12);
      // Brass frame posts
      paintV(g, 'F', 3, 2, 13);
      paintV(g, 'F', 12, 2, 13);
      // Upper glass bulb
      paintRect(g, 'G', 4, 3, 11, 6);
      // Neck
      paintPoints(g, 'G', [[7, 7], [8, 7]]);
      // Lower glass bulb
      paintRect(g, 'G', 4, 8, 11, 12);
      // Sand (upper, mostly empty)
      paintPoints(g, 'S', [[6, 6], [7, 6], [8, 6], [9, 6]]);
      // Sand stream
      paintPoints(g, 'S', [[7, 7], [8, 7]]);
      // Sand (lower, mostly full)
      paintRect(g, 'S', 5, 10, 10, 12);
      paintH(g, 'S', 9, 6, 9);
    },
  ),

  // ── 19. LANTERN WORKSHOP ───────────────────────────────────────
  makeTemplate(
    'lantern_workshop_16',
    'Hanging workshop lantern with oil flame, glass panels, and iron cage.',
    {
      C: { name: 'iron_cage', role: 'body' },
      G: { name: 'glass_panels', role: 'head' },
      F: { name: 'flame', role: 'accessory' },
      H: { name: 'hanging_hook', role: 'arm' },
      W: { name: 'warm_glow', role: 'eye' },
    },
    {
      body: C.darkIron,
      head: C.glass,
      accessory: C.embers,
      arm: C.iron,
      eye: C.gold,
    },
    (g) => {
      // Hanging hook and chain
      paintPoints(g, 'H', [[7, 1], [8, 1], [7, 2], [8, 2]]);
      // Top cage cap
      paintH(g, 'C', 3, 5, 10);
      paintH(g, 'C', 4, 4, 11);
      // Side cage bars
      paintV(g, 'C', 4, 5, 11);
      paintV(g, 'C', 11, 5, 11);
      // Glass panels
      paintRect(g, 'G', 5, 5, 10, 11);
      // Flame (center)
      paintPoints(g, 'F', [[7, 6], [8, 6], [7, 7], [8, 7], [7, 8], [8, 8]]);
      // Warm glow
      paintPoints(g, 'W', [[6, 7], [9, 7], [6, 9], [9, 9]]);
      // Bottom cage cap
      paintH(g, 'C', 12, 5, 10);
      paintH(g, 'C', 13, 6, 9);
    },
  ),

  // ── 20. CRAFTING TABLE PORTABLE ────────────────────────────────
  makeTemplate(
    'crafting_table_portable_16',
    'Foldable portable crafting table with canvas top and collapsible legs.',
    {
      T: { name: 'canvas_top', role: 'body' },
      F: { name: 'wood_frame', role: 'head' },
      L: { name: 'folding_legs', role: 'arm' },
      S: { name: 'strap_latch', role: 'accessory' },
      C: { name: 'craft_items', role: 'eye' },
    },
    {
      body: C.cloth,
      head: C.wood,
      accessory: C.leather,
      arm: C.darkWood,
      eye: C.iron,
    },
    (g) => {
      // Wood frame (edge)
      paintH(g, 'F', 5, 1, 14);
      paintH(g, 'F', 8, 1, 14);
      paintV(g, 'F', 1, 5, 8);
      paintV(g, 'F', 14, 5, 8);
      // Canvas top
      paintRect(g, 'T', 2, 6, 13, 7);
      // Craft items on top
      paintPoints(g, 'C', [[4, 4], [5, 4], [8, 4], [9, 4], [12, 4]]);
      // Folding legs (X-shape underneath)
      paintPoints(g, 'L', [[2, 9], [3, 10], [4, 11], [5, 12], [6, 13]]);
      paintPoints(g, 'L', [[13, 9], [12, 10], [11, 11], [10, 12], [9, 13]]);
      paintPoints(g, 'L', [[6, 9], [5, 10], [4, 11], [3, 12], [2, 13]]);
      paintPoints(g, 'L', [[9, 9], [10, 10], [11, 11], [12, 12], [13, 13]]);
      // Strap latch
      paintPoints(g, 'S', [[7, 8], [8, 8]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'CRAFTING_BATCH5_TEMPLATES',
    schemes: 'CRAFTING_BATCH5_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
