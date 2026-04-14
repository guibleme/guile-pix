/**
 * Crafting & Workshop batch 2 — Tools & Smithing.
 * 20 original 16x16 templates — hammers, tongs, chisels, workshop tools.
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
  tan:       { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
};

const templates: CompactTemplate[] = [
  // ── 1. HAMMER SMITHING ─────────────────────────────────────────
  makeTemplate(
    'hammer_smithing_16',
    'Heavy smithing hammer with iron head and wrapped leather handle.',
    {
      H: { name: 'hammer_head', role: 'body' },
      S: { name: 'handle_shaft', role: 'arm' },
      W: { name: 'leather_wrap', role: 'accessory' },
      F: { name: 'face_flat', role: 'head' },
    },
    {
      body: C.iron,
      arm: C.wood,
      accessory: C.leather,
      head: C.darkIron,
    },
    (g) => {
      // Hammer head (horizontal, top)
      paintRect(g, 'H', 3, 2, 12, 5);
      paintH(g, 'H', 6, 4, 11);
      // Flat striking face
      paintV(g, 'F', 3, 3, 5);
      paintV(g, 'F', 12, 3, 5);
      // Handle shaft (vertical, center)
      paintV(g, 'S', 7, 6, 14);
      paintV(g, 'S', 8, 6, 14);
      // Leather wrap
      paintPoints(g, 'W', [[7, 9], [8, 9], [7, 10], [8, 10], [7, 12], [8, 12]]);
    },
  ),

  // ── 2. TONGS FORGING ───────────────────────────────────────────
  makeTemplate(
    'tongs_forging_16',
    'Long-handled forging tongs with flat jaws for gripping hot metal.',
    {
      J: { name: 'jaw_tips', role: 'body' },
      A: { name: 'arms', role: 'arm' },
      P: { name: 'pivot_rivet', role: 'accessory' },
      H: { name: 'handles', role: 'head' },
    },
    {
      body: C.darkIron,
      arm: C.iron,
      accessory: C.brass,
      head: C.wood,
    },
    (g) => {
      // Jaw tips (top, open V)
      paintPoints(g, 'J', [[4, 1], [5, 1], [4, 2], [5, 2]]);
      paintPoints(g, 'J', [[10, 1], [11, 1], [10, 2], [11, 2]]);
      // Arms converging
      paintPoints(g, 'A', [[5, 3], [6, 4], [6, 5], [7, 5]]);
      paintPoints(g, 'A', [[10, 3], [9, 4], [9, 5], [8, 5]]);
      // Pivot rivet
      paintPoints(g, 'P', [[7, 6], [8, 6]]);
      // Handles (diverging down)
      paintV(g, 'H', 5, 7, 14);
      paintV(g, 'H', 6, 7, 11);
      paintV(g, 'H', 10, 7, 14);
      paintV(g, 'H', 9, 7, 11);
    },
  ),

  // ── 3. CHISEL SET ──────────────────────────────────────────────
  makeTemplate(
    'chisel_set_16',
    'Set of three chisels with steel blades and wooden handles on a cloth.',
    {
      B: { name: 'chisel_blades', role: 'body' },
      H: { name: 'chisel_handles', role: 'head' },
      F: { name: 'ferrules', role: 'accessory' },
      C: { name: 'cloth_base', role: 'arm' },
    },
    {
      body: C.iron,
      head: C.wood,
      accessory: C.brass,
      arm: C.leather,
    },
    (g) => {
      // Cloth base
      paintRect(g, 'C', 1, 12, 14, 14);
      // Chisel 1 (left)
      paintV(g, 'B', 3, 2, 5);
      paintV(g, 'B', 4, 2, 5);
      paintPoints(g, 'F', [[3, 6], [4, 6]]);
      paintV(g, 'H', 3, 7, 11);
      paintV(g, 'H', 4, 7, 11);
      // Chisel 2 (center)
      paintV(g, 'B', 7, 3, 6);
      paintV(g, 'B', 8, 3, 6);
      paintPoints(g, 'F', [[7, 7], [8, 7]]);
      paintV(g, 'H', 7, 8, 11);
      paintV(g, 'H', 8, 8, 11);
      // Chisel 3 (right)
      paintV(g, 'B', 11, 4, 7);
      paintV(g, 'B', 12, 4, 7);
      paintPoints(g, 'F', [[11, 8], [12, 8]]);
      paintV(g, 'H', 11, 9, 11);
      paintV(g, 'H', 12, 9, 11);
    },
  ),

  // ── 4. FILE RASP ───────────────────────────────────────────────
  makeTemplate(
    'file_rasp_16',
    'Metal file rasp with textured surface and wooden tang handle.',
    {
      B: { name: 'file_body', role: 'body' },
      T: { name: 'teeth_texture', role: 'head' },
      H: { name: 'handle', role: 'arm' },
      F: { name: 'ferrule', role: 'accessory' },
    },
    {
      body: C.iron,
      head: C.darkIron,
      arm: C.wood,
      accessory: C.brass,
    },
    (g) => {
      // File body (long, angled)
      paintRect(g, 'B', 5, 1, 8, 8);
      paintH(g, 'B', 9, 6, 9);
      // Teeth texture marks
      paintPoints(g, 'T', [[6, 2], [7, 3], [6, 4], [7, 5], [6, 6], [7, 7], [6, 8]]);
      // Ferrule
      paintH(g, 'F', 9, 5, 9);
      paintH(g, 'F', 10, 5, 9);
      // Handle
      paintRect(g, 'H', 5, 11, 9, 14);
      paintH(g, 'H', 10, 6, 8);
    },
  ),

  // ── 5. PLIERS WORKSHOP ─────────────────────────────────────────
  makeTemplate(
    'pliers_workshop_16',
    'Heavy-duty workshop pliers with serrated jaws and rubber grips.',
    {
      J: { name: 'jaw_head', role: 'body' },
      P: { name: 'pivot_joint', role: 'accessory' },
      H: { name: 'handle_left', role: 'arm' },
      R: { name: 'handle_right', role: 'head' },
      G: { name: 'rubber_grips', role: 'belt' },
    },
    {
      body: C.iron,
      accessory: C.brass,
      arm: C.darkIron,
      head: C.darkIron,
      belt: C.fire,
    },
    (g) => {
      // Jaws (top, open)
      paintPoints(g, 'J', [[5, 1], [6, 1], [5, 2], [6, 2], [5, 3], [6, 3]]);
      paintPoints(g, 'J', [[9, 1], [10, 1], [9, 2], [10, 2], [9, 3], [10, 3]]);
      // Converge to pivot
      paintPoints(g, 'J', [[6, 4], [7, 4], [8, 4], [9, 4]]);
      // Pivot
      paintPoints(g, 'P', [[7, 5], [8, 5]]);
      // Left handle
      paintV(g, 'H', 5, 6, 14);
      paintV(g, 'H', 6, 6, 9);
      // Right handle
      paintV(g, 'R', 10, 6, 14);
      paintV(g, 'R', 9, 6, 9);
      // Rubber grips
      paintPoints(g, 'G', [[5, 10], [5, 11], [5, 12], [5, 13]]);
      paintPoints(g, 'G', [[10, 10], [10, 11], [10, 12], [10, 13]]);
    },
  ),

  // ── 6. WRENCH SET ──────────────────────────────────────────────
  makeTemplate(
    'wrench_set_16',
    'Three wrenches of different sizes hanging on a peg board.',
    {
      W: { name: 'wrench_bodies', role: 'body' },
      J: { name: 'wrench_jaws', role: 'head' },
      B: { name: 'peg_board', role: 'arm' },
      P: { name: 'pegs', role: 'accessory' },
    },
    {
      body: C.iron,
      head: C.darkIron,
      arm: C.wood,
      accessory: C.brass,
    },
    (g) => {
      // Peg board (back)
      paintRect(g, 'B', 1, 1, 14, 3);
      // Pegs
      paintPoints(g, 'P', [[3, 3], [7, 3], [11, 3]]);
      // Small wrench (left)
      paintV(g, 'W', 3, 4, 9);
      paintPoints(g, 'J', [[2, 9], [4, 9], [2, 10], [4, 10]]);
      // Medium wrench (center)
      paintV(g, 'W', 7, 4, 11);
      paintPoints(g, 'J', [[6, 11], [8, 11], [6, 12], [8, 12]]);
      // Large wrench (right)
      paintV(g, 'W', 11, 4, 12);
      paintPoints(g, 'J', [[10, 12], [12, 12], [10, 13], [12, 13], [10, 14], [12, 14]]);
    },
  ),

  // ── 7. HAND DRILL ──────────────────────────────────────────────
  makeTemplate(
    'hand_drill_16',
    'Hand-cranked drill with gear mechanism, chuck, and wooden handle.',
    {
      B: { name: 'drill_body', role: 'body' },
      G: { name: 'gear_wheel', role: 'head' },
      K: { name: 'chuck_bit', role: 'accessory' },
      H: { name: 'handle_crank', role: 'arm' },
      W: { name: 'wood_grip', role: 'belt' },
    },
    {
      body: C.iron,
      head: C.darkIron,
      accessory: C.brass,
      arm: C.iron,
      belt: C.wood,
    },
    (g) => {
      // Top grip
      paintRect(g, 'W', 6, 1, 9, 2);
      // Drill body (vertical shaft)
      paintV(g, 'B', 7, 3, 11);
      paintV(g, 'B', 8, 3, 11);
      // Gear wheel (side)
      paintRect(g, 'G', 9, 5, 12, 8);
      paintPoints(g, 'G', [[10, 4], [11, 4], [10, 9], [11, 9]]);
      // Crank handle
      paintPoints(g, 'H', [[13, 6], [14, 6], [13, 7], [14, 7]]);
      // Chuck and drill bit
      paintV(g, 'K', 7, 12, 14);
      paintV(g, 'K', 8, 12, 14);
      paintPoints(g, 'K', [[7, 14], [8, 14]]);
    },
  ),

  // ── 8. CLAMP VICE ──────────────────────────────────────────────
  makeTemplate(
    'clamp_vice_16',
    'Iron bench clamp vice with screw mechanism and swivel base.',
    {
      J: { name: 'jaw_plates', role: 'body' },
      S: { name: 'screw_shaft', role: 'head' },
      H: { name: 'handle_bar', role: 'accessory' },
      B: { name: 'base_mount', role: 'arm' },
      W: { name: 'workpiece', role: 'belt' },
    },
    {
      body: C.iron,
      head: C.darkIron,
      accessory: C.iron,
      arm: C.darkIron,
      belt: C.wood,
    },
    (g) => {
      // Fixed jaw (left)
      paintRect(g, 'J', 2, 3, 4, 9);
      // Moving jaw (right)
      paintRect(g, 'J', 10, 3, 12, 9);
      // Workpiece between jaws
      paintRect(g, 'W', 5, 4, 9, 8);
      // Screw shaft
      paintH(g, 'S', 6, 12, 14);
      paintH(g, 'S', 7, 12, 14);
      // Handle bar
      paintV(g, 'H', 14, 4, 9);
      // Base mount
      paintRect(g, 'B', 1, 10, 13, 12);
      paintRect(g, 'B', 2, 13, 12, 14);
    },
  ),

  // ── 9. HACKSAW ─────────────────────────────────────────────────
  makeTemplate(
    'hacksaw_16',
    'Metal hacksaw with tensioned blade, C-frame, and pistol grip.',
    {
      F: { name: 'c_frame', role: 'body' },
      B: { name: 'blade', role: 'head' },
      H: { name: 'handle_grip', role: 'arm' },
      T: { name: 'tension_screw', role: 'accessory' },
    },
    {
      body: C.iron,
      head: C.darkIron,
      arm: C.wood,
      accessory: C.brass,
    },
    (g) => {
      // C-frame (top arch)
      paintH(g, 'F', 3, 2, 12);
      paintH(g, 'F', 4, 2, 12);
      paintV(g, 'F', 2, 4, 7);
      paintV(g, 'F', 12, 4, 7);
      // Blade (bottom, horizontal)
      paintH(g, 'B', 8, 2, 12);
      paintH(g, 'B', 9, 2, 12);
      // Tension screw (right)
      paintPoints(g, 'T', [[13, 5], [14, 5], [13, 6], [14, 6]]);
      // Handle/grip (left, below)
      paintRect(g, 'H', 1, 9, 4, 14);
      paintV(g, 'H', 2, 7, 9);
    },
  ),

  // ── 10. MEASURING TAPE ─────────────────────────────────────────
  makeTemplate(
    'measuring_tape_16',
    'Retractable measuring tape with coiled spring housing and belt clip.',
    {
      H: { name: 'housing_body', role: 'body' },
      T: { name: 'tape_strip', role: 'head' },
      B: { name: 'lock_button', role: 'accessory' },
      C: { name: 'belt_clip', role: 'arm' },
      M: { name: 'markings', role: 'eye' },
    },
    {
      body: C.fire,
      head: C.gold,
      accessory: C.darkIron,
      arm: C.iron,
      eye: C.black,
    },
    (g) => {
      // Housing (rounded square)
      paintRect(g, 'H', 3, 4, 10, 11);
      paintH(g, 'H', 3, 4, 9);
      paintH(g, 'H', 12, 4, 9);
      // Lock button
      paintPoints(g, 'B', [[6, 7], [7, 7], [6, 8], [7, 8]]);
      // Tape strip (extending right and up)
      paintH(g, 'T', 7, 11, 14);
      paintH(g, 'T', 8, 11, 14);
      paintV(g, 'T', 14, 2, 7);
      paintV(g, 'T', 13, 2, 4);
      // Markings on tape
      paintPoints(g, 'M', [[12, 7], [14, 5], [14, 3]]);
      // Belt clip (back)
      paintV(g, 'C', 2, 5, 10);
      paintV(g, 'C', 1, 6, 9);
    },
  ),

  // ── 11. SPIRIT LEVEL ───────────────────────────────────────────
  makeTemplate(
    'spirit_level_16',
    'Yellow spirit level with bubble vials and aluminum frame.',
    {
      F: { name: 'frame_body', role: 'body' },
      V: { name: 'bubble_vials', role: 'head' },
      B: { name: 'bubble', role: 'accessory' },
      E: { name: 'end_caps', role: 'arm' },
    },
    {
      body: C.gold,
      head: C.green,
      accessory: C.paper,
      arm: C.darkIron,
    },
    (g) => {
      // Frame body (long horizontal bar)
      paintRect(g, 'F', 1, 6, 14, 9);
      // End caps
      paintRect(g, 'E', 1, 5, 2, 10);
      paintRect(g, 'E', 13, 5, 14, 10);
      // Center bubble vial
      paintRect(g, 'V', 5, 6, 10, 9);
      // Bubble (inside vial)
      paintPoints(g, 'B', [[7, 7], [8, 7], [7, 8], [8, 8]]);
    },
  ),

  // ── 12. SCREWDRIVER SET ────────────────────────────────────────
  makeTemplate(
    'screwdriver_set_16',
    'Set of four screwdrivers in a wooden holder block.',
    {
      H: { name: 'holder_block', role: 'body' },
      S: { name: 'shafts', role: 'head' },
      T: { name: 'tips', role: 'accessory' },
      G: { name: 'grip_handles', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.iron,
      accessory: C.darkIron,
      arm: C.fire,
    },
    (g) => {
      // Holder block (bottom)
      paintRect(g, 'H', 2, 11, 13, 14);
      // Screwdriver 1
      paintV(g, 'S', 3, 6, 10);
      paintPoints(g, 'T', [[3, 11]]);
      paintRect(g, 'G', 2, 2, 4, 5);
      // Screwdriver 2
      paintV(g, 'S', 6, 6, 10);
      paintPoints(g, 'T', [[6, 11]]);
      paintRect(g, 'G', 5, 3, 7, 5);
      // Screwdriver 3
      paintV(g, 'S', 9, 6, 10);
      paintPoints(g, 'T', [[9, 11]]);
      paintRect(g, 'G', 8, 3, 10, 5);
      // Screwdriver 4
      paintV(g, 'S', 12, 6, 10);
      paintPoints(g, 'T', [[12, 11]]);
      paintRect(g, 'G', 11, 4, 13, 5);
    },
  ),

  // ── 13. NAIL BUCKET ────────────────────────────────────────────
  makeTemplate(
    'nail_bucket_16',
    'Wooden bucket overflowing with iron nails and a metal band.',
    {
      B: { name: 'bucket_body', role: 'body' },
      N: { name: 'nails', role: 'head' },
      R: { name: 'metal_bands', role: 'accessory' },
      H: { name: 'handle', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.iron,
      accessory: C.darkIron,
      arm: C.iron,
    },
    (g) => {
      // Handle (arch)
      paintPoints(g, 'H', [[4, 2], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 2]]);
      // Nails sticking out top
      paintPoints(g, 'N', [[5, 3], [6, 4], [7, 3], [8, 4], [9, 3], [10, 4]]);
      paintH(g, 'N', 5, 4, 11);
      // Bucket body
      paintRect(g, 'B', 3, 6, 12, 13);
      paintH(g, 'B', 14, 4, 11);
      // Metal bands
      paintH(g, 'R', 6, 3, 12);
      paintH(g, 'R', 9, 3, 12);
      paintH(g, 'R', 13, 3, 12);
    },
  ),

  // ── 14. BOLT JAR ───────────────────────────────────────────────
  makeTemplate(
    'bolt_jar_16',
    'Glass mason jar filled with assorted bolts, nuts, and washers.',
    {
      G: { name: 'glass_jar', role: 'body' },
      B: { name: 'bolts_inside', role: 'head' },
      L: { name: 'lid', role: 'accessory' },
      N: { name: 'nuts_washers', role: 'arm' },
    },
    {
      body: C.glass,
      head: C.iron,
      accessory: C.brass,
      arm: C.darkIron,
    },
    (g) => {
      // Lid
      paintRect(g, 'L', 4, 2, 11, 3);
      // Glass jar body
      paintV(g, 'G', 3, 4, 13);
      paintV(g, 'G', 12, 4, 13);
      paintH(g, 'G', 4, 4, 11);
      paintH(g, 'G', 14, 4, 11);
      // Bolts inside
      paintPoints(g, 'B', [[5, 6], [7, 5], [9, 6], [11, 5], [6, 8], [8, 7], [10, 8]]);
      paintPoints(g, 'B', [[5, 10], [7, 9], [9, 10], [11, 9]]);
      // Nuts/washers
      paintPoints(g, 'N', [[6, 11], [8, 12], [10, 11], [5, 13], [9, 13]]);
    },
  ),

  // ── 15. OIL CAN ────────────────────────────────────────────────
  makeTemplate(
    'oil_can_16',
    'Brass oiler can with long spout, pump handle, and round body.',
    {
      B: { name: 'can_body', role: 'body' },
      S: { name: 'spout', role: 'head' },
      H: { name: 'pump_handle', role: 'accessory' },
      D: { name: 'oil_drip', role: 'arm' },
    },
    {
      body: C.brass,
      head: C.iron,
      accessory: C.wood,
      arm: C.gold,
    },
    (g) => {
      // Can body (round)
      paintRect(g, 'B', 4, 6, 11, 12);
      paintH(g, 'B', 5, 5, 10);
      paintH(g, 'B', 13, 5, 10);
      // Spout (long, pointing right-up)
      paintPoints(g, 'S', [[12, 6], [13, 5], [14, 4], [14, 3]]);
      paintPoints(g, 'S', [[12, 7], [13, 6]]);
      // Oil drip
      paintPoints(g, 'D', [[14, 2]]);
      // Pump handle (top)
      paintV(g, 'H', 7, 2, 5);
      paintV(g, 'H', 8, 2, 5);
      paintH(g, 'H', 2, 6, 9);
    },
  ),

  // ── 16. WHETSTONE ──────────────────────────────────────────────
  makeTemplate(
    'whetstone_16',
    'Sharpening whetstone on wooden base with water dish and blade.',
    {
      S: { name: 'stone_block', role: 'body' },
      B: { name: 'wood_base', role: 'arm' },
      W: { name: 'water_dish', role: 'accessory' },
      K: { name: 'knife_blade', role: 'head' },
    },
    {
      body: C.stone,
      arm: C.wood,
      accessory: C.blue,
      head: C.iron,
    },
    (g) => {
      // Knife blade (resting on stone, angled)
      paintPoints(g, 'K', [[2, 3], [3, 4], [4, 5], [5, 5], [6, 5], [7, 5], [8, 6]]);
      paintPoints(g, 'K', [[2, 4], [3, 5]]);
      // Whetstone (horizontal block)
      paintRect(g, 'S', 2, 7, 13, 10);
      paintH(g, 'S', 6, 3, 12);
      // Wood base
      paintRect(g, 'B', 1, 11, 14, 13);
      // Water dish (small, side)
      paintRect(g, 'W', 10, 3, 13, 5);
      paintPoints(g, 'W', [[11, 4], [12, 4]]);
    },
  ),

  // ── 17. SANDPAPER BLOCK ────────────────────────────────────────
  makeTemplate(
    'sandpaper_block_16',
    'Sanding block with sandpaper wrapped around cork block and dust.',
    {
      B: { name: 'block_body', role: 'body' },
      S: { name: 'sandpaper', role: 'head' },
      D: { name: 'sawdust', role: 'accessory' },
      G: { name: 'grip_top', role: 'arm' },
    },
    {
      body: C.tan,
      head: C.rope,
      accessory: C.gold,
      arm: C.leather,
    },
    (g) => {
      // Grip top
      paintRect(g, 'G', 3, 4, 12, 6);
      // Block body
      paintRect(g, 'B', 2, 7, 13, 10);
      // Sandpaper (bottom surface)
      paintRect(g, 'S', 2, 11, 13, 12);
      // Sawdust particles
      paintPoints(g, 'D', [[1, 13], [4, 13], [7, 14], [10, 13], [13, 14], [3, 14], [9, 14]]);
    },
  ),

  // ── 18. WIRE SPOOL ─────────────────────────────────────────────
  makeTemplate(
    'wire_spool_16',
    'Wooden spool wound with copper wire and loose tail end.',
    {
      S: { name: 'spool_flanges', role: 'body' },
      W: { name: 'wound_wire', role: 'head' },
      C: { name: 'spool_core', role: 'arm' },
      T: { name: 'wire_tail', role: 'accessory' },
    },
    {
      body: C.wood,
      head: C.copper,
      arm: C.darkWood,
      accessory: C.copper,
    },
    (g) => {
      // Top flange
      paintH(g, 'S', 3, 3, 12);
      paintH(g, 'S', 4, 3, 12);
      // Bottom flange
      paintH(g, 'S', 11, 3, 12);
      paintH(g, 'S', 12, 3, 12);
      // Core
      paintV(g, 'C', 3, 5, 10);
      paintV(g, 'C', 12, 5, 10);
      // Wound wire
      paintRect(g, 'W', 4, 5, 11, 10);
      // Wire tail (extending out)
      paintPoints(g, 'T', [[13, 8], [14, 7], [14, 6], [13, 5], [14, 4]]);
    },
  ),

  // ── 19. LEATHER ROLL ───────────────────────────────────────────
  makeTemplate(
    'leather_roll_16',
    'Rolled leather hide with buckle strap, partially unrolled on bench.',
    {
      R: { name: 'rolled_leather', role: 'body' },
      U: { name: 'unrolled_part', role: 'head' },
      S: { name: 'buckle_strap', role: 'accessory' },
      B: { name: 'bench_surface', role: 'arm' },
    },
    {
      body: C.leather,
      head: C.tan,
      accessory: C.brass,
      arm: C.wood,
    },
    (g) => {
      // Bench surface
      paintRect(g, 'B', 1, 11, 14, 14);
      // Rolled leather (cylinder)
      paintRect(g, 'R', 8, 4, 12, 10);
      paintH(g, 'R', 3, 9, 11);
      paintV(g, 'R', 7, 5, 9);
      paintV(g, 'R', 13, 5, 9);
      // Unrolled part (flat, trailing left)
      paintRect(g, 'U', 1, 9, 7, 10);
      paintH(g, 'U', 8, 2, 7);
      // Buckle strap
      paintPoints(g, 'S', [[9, 6], [10, 6], [11, 6]]);
      paintPoints(g, 'S', [[10, 5], [10, 7]]);
    },
  ),

  // ── 20. WOOD PLANKS STACK ──────────────────────────────────────
  makeTemplate(
    'wood_planks_stack_16',
    'Stacked pile of lumber planks with different wood tones and grain.',
    {
      L: { name: 'light_planks', role: 'body' },
      D: { name: 'dark_planks', role: 'head' },
      G: { name: 'grain_marks', role: 'accessory' },
      E: { name: 'end_grain', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.darkWood,
      accessory: C.rope,
      arm: C.leather,
    },
    (g) => {
      // Bottom plank pair (dark)
      paintRect(g, 'D', 1, 12, 14, 14);
      paintPoints(g, 'G', [[3, 13], [7, 13], [11, 13]]);
      // Middle plank pair (light)
      paintRect(g, 'L', 1, 8, 14, 11);
      paintPoints(g, 'G', [[4, 9], [8, 9], [12, 10]]);
      // Top plank pair (dark)
      paintRect(g, 'D', 2, 5, 13, 7);
      paintPoints(g, 'G', [[5, 6], [9, 6]]);
      // Topmost plank (light)
      paintRect(g, 'L', 3, 2, 12, 4);
      paintPoints(g, 'G', [[6, 3], [10, 3]]);
      // End grain circles
      paintPoints(g, 'E', [[1, 9], [1, 13], [14, 9], [14, 13]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'CRAFTING_BATCH2_TEMPLATES',
    schemes: 'CRAFTING_BATCH2_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
