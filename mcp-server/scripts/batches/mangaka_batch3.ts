/**
 * Mangaka Simulator batch 3 — 20 workspace & furniture templates.
 * Focus: desks, lamps, screens, chairs, shelves, and everyday studio items.
 */
import type { BatchDefinition, CompactTemplate } from '../templateGenerator.js';

type Grid = string[][];
type Triad = { shadow: string; base: string; highlight: string };

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

const COLORS = {
  wood: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  darkWood: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  steel: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  brass: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  graphite: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  screen: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  paper: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  ink: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  redPlastic: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  greenPlastic: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  bluePlastic: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  glow: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  fabric: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  stone: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  cork: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  cream: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  darkCloth: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  steam: { shadow: '#757161', base: '#deeed6', highlight: '#deeed6' },
};

// ─── 1. Drafting Desk ──────────────────────────────────────────
// Tilted drafting desk with paper — 3/4 view, chunky wood frame
const templates: CompactTemplate[] = [
  makeTemplate(
    'drafting_desk_mg_16',
    'Tilted drafting desk with manuscript paper for manga inking.',
    {
      T: { name: 'table_top', role: 'head' },
      F: { name: 'frame_legs', role: 'body' },
      P: { name: 'paper_sheet', role: 'arm' },
      D: { name: 'drawer_front', role: 'belt' },
      H: { name: 'handle_knob', role: 'eye' },
    },
    {
      head: COLORS.wood,
      body: COLORS.darkWood,
      arm: COLORS.paper,
      belt: COLORS.steel,
      eye: COLORS.brass,
    },
    (g) => {
      // tilted top surface
      paintPoints(g, 'T', [
        [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3],
        [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4],
        [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5],
        [1, 6], [2, 6], [13, 6], [14, 6],
      ]);
      // paper on tilted surface
      paintPoints(g, 'P', [
        [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
        [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      ]);
      // front panel / side panel
      paintRect(g, 'F', 1, 7, 14, 8);
      // legs
      paintRect(g, 'F', 2, 9, 4, 14);
      paintRect(g, 'F', 11, 9, 13, 14);
      // drawer
      paintRect(g, 'D', 5, 9, 10, 11);
      // handle
      paintPoints(g, 'H', [[7, 10], [8, 10]]);
    },
  ),

  // ─── 2. Desk Lamp Arm ──────────────────────────────────────────
  // Adjustable desk lamp — thick 2px+ arm, chunky shade
  makeTemplate(
    'desk_lamp_arm_mg_16',
    'Adjustable desk lamp with thick articulated arm for late-night inking.',
    {
      S: { name: 'shade_hood', role: 'head' },
      G: { name: 'glow_bulb', role: 'eye' },
      A: { name: 'arm_joint', role: 'arm' },
      B: { name: 'base_foot', role: 'body' },
      W: { name: 'wire_cord', role: 'belt' },
    },
    {
      head: COLORS.steel,
      eye: COLORS.glow,
      arm: COLORS.graphite,
      body: COLORS.steel,
      belt: COLORS.ink,
    },
    (g) => {
      // shade (wide hood)
      paintRect(g, 'S', 6, 1, 14, 3);
      paintRect(g, 'S', 7, 4, 14, 4);
      // glow bulb under shade
      paintPoints(g, 'G', [[8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [9, 6], [10, 6], [11, 6], [12, 6]]);
      // thick arm (2-3px wide)
      paintPoints(g, 'A', [
        [7, 6], [8, 6], [6, 7], [7, 7], [8, 7],
        [5, 8], [6, 8], [7, 8], [4, 9], [5, 9], [6, 9],
        [4, 10], [5, 10], [5, 11], [6, 11],
      ]);
      // base (chunky)
      paintRect(g, 'B', 2, 12, 10, 13);
      paintH(g, 'B', 14, 1, 11);
      // wire
      paintPoints(g, 'W', [[11, 13], [12, 14], [13, 14], [14, 14]]);
    },
  ),

  // ─── 3. Light Box ─────────────────────────────────────────────
  // Light box / tracing table — glowing flat surface
  makeTemplate(
    'light_box_mg_16',
    'Light box tracing table with glowing surface for clean lineart transfer.',
    {
      F: { name: 'frame_shell', role: 'body' },
      G: { name: 'glow_surface', role: 'eye' },
      B: { name: 'button_strip', role: 'belt' },
      S: { name: 'side_vent', role: 'arm' },
      C: { name: 'cord_plug', role: 'head' },
    },
    {
      body: COLORS.steel,
      eye: COLORS.glow,
      belt: COLORS.bluePlastic,
      arm: COLORS.graphite,
      head: COLORS.ink,
    },
    (g) => {
      // outer frame
      paintRect(g, 'F', 1, 5, 14, 12);
      // glowing surface
      paintRect(g, 'G', 2, 6, 13, 10);
      // top bevel
      paintH(g, 'F', 4, 2, 13);
      // button strip
      paintPoints(g, 'B', [[3, 11], [5, 11], [7, 11], [9, 11]]);
      // side vents
      paintV(g, 'S', 1, 7, 10);
      paintV(g, 'S', 14, 7, 10);
      // cord
      paintPoints(g, 'C', [[13, 12], [14, 13], [14, 14]]);
    },
  ),

  // ─── 4. Bookshelf Manga ───────────────────────────────────────
  // Small bookshelf packed with manga volumes
  makeTemplate(
    'bookshelf_manga_mg_16',
    'Small bookshelf crammed with manga volumes and reference books.',
    {
      F: { name: 'shelf_frame', role: 'body' },
      B: { name: 'book_spines', role: 'head' },
      A: { name: 'accent_volumes', role: 'arm' },
      S: { name: 'shelf_board', role: 'belt' },
      D: { name: 'spine_labels', role: 'eye' },
    },
    {
      body: COLORS.wood,
      head: COLORS.bluePlastic,
      arm: COLORS.redPlastic,
      belt: COLORS.darkWood,
      eye: COLORS.paper,
    },
    (g) => {
      // outer frame
      paintV(g, 'F', 1, 1, 14);
      paintV(g, 'F', 14, 1, 14);
      paintH(g, 'F', 1, 1, 14);
      paintH(g, 'F', 14, 1, 14);
      // shelf boards
      paintH(g, 'S', 5, 2, 13);
      paintH(g, 'S', 9, 2, 13);
      paintH(g, 'S', 13, 2, 13);
      // top row books
      paintRect(g, 'B', 2, 2, 4, 4);
      paintRect(g, 'A', 5, 2, 7, 4);
      paintRect(g, 'B', 8, 2, 10, 4);
      paintRect(g, 'A', 11, 2, 13, 4);
      // middle row books
      paintRect(g, 'A', 2, 6, 4, 8);
      paintRect(g, 'B', 5, 6, 8, 8);
      paintRect(g, 'A', 9, 6, 11, 8);
      paintRect(g, 'B', 12, 6, 13, 8);
      // bottom row books
      paintRect(g, 'B', 2, 10, 5, 12);
      paintRect(g, 'A', 6, 10, 9, 12);
      paintRect(g, 'B', 10, 10, 13, 12);
      // spine labels
      paintPoints(g, 'D', [[3, 3], [6, 3], [9, 3], [12, 3], [3, 7], [7, 7], [10, 7], [4, 11], [8, 11], [12, 11]]);
    },
  ),

  // ─── 5. Pen Stand ─────────────────────────────────────────────
  // Desktop pen stand organizer — cylindrical holder
  makeTemplate(
    'pen_stand_mg_16',
    'Desktop pen stand organizer holding G-pens and brush markers.',
    {
      C: { name: 'cup_body', role: 'body' },
      R: { name: 'rim_edge', role: 'head' },
      P: { name: 'pen_tips', role: 'arm' },
      B: { name: 'base_ring', role: 'belt' },
      D: { name: 'label_mark', role: 'eye' },
    },
    {
      body: COLORS.steel,
      head: COLORS.brass,
      arm: COLORS.graphite,
      belt: COLORS.darkWood,
      eye: COLORS.redPlastic,
    },
    (g) => {
      // pen tips sticking up
      paintPoints(g, 'P', [
        [4, 1], [5, 1], [7, 1], [8, 1], [10, 1], [11, 1],
        [4, 2], [5, 2], [7, 2], [8, 2], [10, 2], [11, 2],
        [5, 3], [7, 3], [8, 3], [10, 3],
      ]);
      // rim
      paintH(g, 'R', 4, 3, 12);
      paintH(g, 'R', 5, 3, 12);
      // cup body
      paintRect(g, 'C', 3, 6, 12, 12);
      paintPoints(g, 'C', [[4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5]]);
      // base ring
      paintH(g, 'B', 13, 3, 12);
      paintH(g, 'B', 14, 4, 11);
      // label
      paintPoints(g, 'D', [[7, 9], [8, 9], [7, 10], [8, 10]]);
    },
  ),

  // ─── 6. Ink Tray ──────────────────────────────────────────────
  // Tray with ink bottles arranged
  makeTemplate(
    'ink_tray_mg_16',
    'Wooden tray with ink bottles arranged for quick manga inking access.',
    {
      T: { name: 'tray_body', role: 'body' },
      B: { name: 'bottle_glass', role: 'head' },
      I: { name: 'ink_fill', role: 'eye' },
      R: { name: 'tray_rim', role: 'belt' },
      L: { name: 'bottle_label', role: 'arm' },
    },
    {
      body: COLORS.wood,
      head: COLORS.steel,
      eye: COLORS.ink,
      belt: COLORS.darkWood,
      arm: COLORS.paper,
    },
    (g) => {
      // tray base
      paintRect(g, 'T', 1, 10, 14, 13);
      // tray rim
      paintH(g, 'R', 9, 1, 14);
      paintH(g, 'R', 14, 1, 14);
      paintV(g, 'R', 0, 10, 13);
      paintV(g, 'R', 15, 10, 13);
      // bottle 1 (left)
      paintRect(g, 'B', 2, 5, 4, 9);
      paintPoints(g, 'B', [[3, 4]]);
      paintRect(g, 'I', 2, 7, 4, 9);
      paintPoints(g, 'L', [[3, 6]]);
      // bottle 2 (center)
      paintRect(g, 'B', 6, 4, 8, 9);
      paintPoints(g, 'B', [[7, 3]]);
      paintRect(g, 'I', 6, 6, 8, 9);
      paintPoints(g, 'L', [[7, 5]]);
      // bottle 3 (right)
      paintRect(g, 'B', 10, 5, 12, 9);
      paintPoints(g, 'B', [[11, 4]]);
      paintRect(g, 'I', 10, 7, 12, 9);
      paintPoints(g, 'L', [[11, 6]]);
    },
  ),

  // ─── 7. Reference Board ───────────────────────────────────────
  // Cork board with pinned references
  makeTemplate(
    'reference_board_mg_16',
    'Cork board with pinned reference images and pose sheets.',
    {
      C: { name: 'cork_surface', role: 'body' },
      F: { name: 'frame_border', role: 'head' },
      P: { name: 'pinned_cards', role: 'arm' },
      N: { name: 'pin_dots', role: 'eye' },
      S: { name: 'string_line', role: 'belt' },
    },
    {
      body: COLORS.cork,
      head: COLORS.darkWood,
      arm: COLORS.paper,
      eye: COLORS.redPlastic,
      belt: COLORS.graphite,
    },
    (g) => {
      // frame border
      paintH(g, 'F', 1, 1, 14);
      paintH(g, 'F', 14, 1, 14);
      paintV(g, 'F', 1, 1, 14);
      paintV(g, 'F', 14, 1, 14);
      // cork surface
      paintRect(g, 'C', 2, 2, 13, 13);
      // pinned card 1 (upper-left)
      paintRect(g, 'P', 3, 3, 6, 6);
      // pinned card 2 (upper-right)
      paintRect(g, 'P', 8, 3, 12, 5);
      // pinned card 3 (lower-center)
      paintRect(g, 'P', 4, 8, 8, 12);
      // pinned card 4 (lower-right)
      paintRect(g, 'P', 10, 8, 12, 11);
      // pins
      paintPoints(g, 'N', [[4, 3], [10, 3], [6, 8], [11, 8]]);
      // string connecting pins
      paintPoints(g, 'S', [[5, 4], [6, 5], [7, 6], [8, 7], [7, 7], [6, 7], [5, 8]]);
    },
  ),

  // ─── 8. Monitor Screen ────────────────────────────────────────
  // Computer monitor — nearly full-frame, chunky bezel
  makeTemplate(
    'monitor_screen_mg_16',
    'Computer monitor for digital manga workflow and reference browsing.',
    {
      B: { name: 'bezel_frame', role: 'body' },
      S: { name: 'screen_panel', role: 'head' },
      U: { name: 'ui_elements', role: 'eye' },
      N: { name: 'neck_stand', role: 'arm' },
      F: { name: 'foot_base', role: 'belt' },
    },
    {
      body: COLORS.graphite,
      head: COLORS.screen,
      eye: COLORS.paper,
      arm: COLORS.steel,
      belt: COLORS.steel,
    },
    (g) => {
      // bezel
      paintRect(g, 'B', 1, 1, 14, 10);
      // screen
      paintRect(g, 'S', 2, 2, 13, 9);
      // UI elements on screen
      paintPoints(g, 'U', [
        [3, 3], [4, 3], [5, 3], [8, 3], [9, 3], [10, 3], [11, 3],
        [3, 5], [4, 5], [5, 5], [6, 5],
        [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7],
      ]);
      // neck/stand
      paintRect(g, 'N', 6, 11, 9, 12);
      // foot base
      paintRect(g, 'F', 4, 13, 11, 14);
    },
  ),

  // ─── 9. Drawing Tablet ────────────────────────────────────────
  // Graphics tablet with stylus resting on it
  makeTemplate(
    'drawing_tablet_mg_16',
    'Graphics drawing tablet with stylus pen for digital manga production.',
    {
      F: { name: 'tablet_frame', role: 'body' },
      S: { name: 'active_surface', role: 'head' },
      K: { name: 'side_buttons', role: 'arm' },
      P: { name: 'stylus_pen', role: 'belt' },
      D: { name: 'led_indicator', role: 'eye' },
    },
    {
      body: COLORS.graphite,
      head: COLORS.steel,
      arm: COLORS.ink,
      belt: COLORS.steel,
      eye: COLORS.greenPlastic,
    },
    (g) => {
      // tablet frame
      paintRect(g, 'F', 1, 4, 14, 12);
      // active drawing surface
      paintRect(g, 'S', 4, 5, 13, 11);
      // side button strip
      paintRect(g, 'K', 2, 5, 3, 11);
      // stylus pen resting diagonally
      paintPoints(g, 'P', [
        [12, 2], [13, 2], [11, 3], [12, 3],
        [10, 4], [11, 4], [9, 5], [10, 5],
      ]);
      // LED indicator
      paintPoints(g, 'D', [[2, 12], [3, 12]]);
    },
  ),

  // ─── 10. Scanner Flat ─────────────────────────────────────────
  // Flatbed scanner — boxy, wide
  makeTemplate(
    'scanner_flat_mg_16',
    'Flatbed scanner for digitizing manga manuscript pages.',
    {
      C: { name: 'case_body', role: 'body' },
      G: { name: 'glass_surface', role: 'head' },
      L: { name: 'lid_top', role: 'arm' },
      B: { name: 'button_panel', role: 'belt' },
      D: { name: 'indicator_led', role: 'eye' },
    },
    {
      body: COLORS.steel,
      head: COLORS.screen,
      arm: COLORS.graphite,
      belt: COLORS.bluePlastic,
      eye: COLORS.greenPlastic,
    },
    (g) => {
      // lid top
      paintRect(g, 'L', 1, 3, 14, 5);
      // hinge line
      paintH(g, 'C', 6, 1, 14);
      // glass surface visible
      paintRect(g, 'G', 2, 4, 13, 5);
      // case body
      paintRect(g, 'C', 1, 7, 14, 12);
      // front face
      paintH(g, 'C', 13, 1, 14);
      // button panel on front
      paintPoints(g, 'B', [[3, 13], [5, 13], [7, 13], [9, 13], [11, 13]]);
      // LED indicator
      paintPoints(g, 'D', [[13, 13]]);
    },
  ),

  // ─── 11. Printer Small ────────────────────────────────────────
  // Small desktop printer
  makeTemplate(
    'printer_small_mg_16',
    'Small desktop printer for proof prints and storyboard output.',
    {
      C: { name: 'case_shell', role: 'body' },
      T: { name: 'tray_slot', role: 'head' },
      P: { name: 'paper_out', role: 'arm' },
      B: { name: 'button_row', role: 'belt' },
      D: { name: 'status_light', role: 'eye' },
    },
    {
      body: COLORS.steel,
      head: COLORS.graphite,
      arm: COLORS.paper,
      belt: COLORS.bluePlastic,
      eye: COLORS.greenPlastic,
    },
    (g) => {
      // paper coming out top
      paintPoints(g, 'P', [
        [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
        [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      ]);
      // tray slot opening
      paintH(g, 'T', 4, 3, 12);
      // case shell
      paintRect(g, 'C', 2, 5, 13, 12);
      paintH(g, 'C', 13, 3, 12);
      // top bevel
      paintH(g, 'T', 5, 2, 13);
      // button row
      paintPoints(g, 'B', [[3, 7], [5, 7], [7, 7]]);
      // status light
      paintPoints(g, 'D', [[11, 7], [12, 7]]);
    },
  ),

  // ─── 12. Filing Cabinet ───────────────────────────────────────
  // Filing cabinet for manuscripts
  makeTemplate(
    'filing_cabinet_mg_16',
    'Filing cabinet for storing organized manga manuscript chapters.',
    {
      F: { name: 'frame_body', role: 'body' },
      D: { name: 'drawer_faces', role: 'head' },
      H: { name: 'handle_pulls', role: 'eye' },
      T: { name: 'top_surface', role: 'arm' },
      L: { name: 'label_slots', role: 'belt' },
    },
    {
      body: COLORS.steel,
      head: COLORS.stone,
      eye: COLORS.brass,
      arm: COLORS.steel,
      belt: COLORS.paper,
    },
    (g) => {
      // top surface
      paintH(g, 'T', 1, 3, 12);
      paintH(g, 'T', 2, 3, 12);
      // frame body
      paintV(g, 'F', 3, 3, 14);
      paintV(g, 'F', 12, 3, 14);
      // drawer 1
      paintRect(g, 'D', 4, 3, 11, 5);
      // drawer 2
      paintRect(g, 'D', 4, 6, 11, 8);
      // drawer 3
      paintRect(g, 'D', 4, 9, 11, 11);
      // drawer 4
      paintRect(g, 'D', 4, 12, 11, 14);
      // handles
      paintPoints(g, 'H', [[7, 4], [8, 4], [7, 7], [8, 7], [7, 10], [8, 10], [7, 13], [8, 13]]);
      // label slots
      paintPoints(g, 'L', [[5, 4], [6, 4], [5, 7], [6, 7], [5, 10], [6, 10], [5, 13], [6, 13]]);
    },
  ),

  // ─── 13. Swivel Chair ────────────────────────────────────────
  // Office swivel chair (side view)
  makeTemplate(
    'swivel_chair_mg_16',
    'Office swivel chair for marathon manga drawing sessions.',
    {
      B: { name: 'back_rest', role: 'body' },
      S: { name: 'seat_pad', role: 'head' },
      A: { name: 'arm_rest', role: 'arm' },
      P: { name: 'post_stem', role: 'belt' },
      W: { name: 'wheel_base', role: 'eye' },
    },
    {
      body: COLORS.darkCloth,
      head: COLORS.darkCloth,
      arm: COLORS.steel,
      belt: COLORS.graphite,
      eye: COLORS.graphite,
    },
    (g) => {
      // back rest
      paintRect(g, 'B', 3, 1, 7, 7);
      paintPoints(g, 'B', [[8, 2], [8, 3], [8, 4], [8, 5], [8, 6]]);
      // arm rest
      paintPoints(g, 'A', [
        [9, 5], [10, 5], [11, 5],
        [9, 6], [10, 6], [11, 6],
      ]);
      // seat pad
      paintRect(g, 'S', 3, 8, 12, 10);
      paintPoints(g, 'S', [[2, 9], [13, 9]]);
      // post/stem
      paintRect(g, 'P', 7, 11, 8, 12);
      // wheel base
      paintPoints(g, 'W', [
        [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
        [3, 14], [4, 14], [11, 14], [12, 14],
      ]);
    },
  ),

  // ─── 14. Waste Basket ────────────────────────────────────────
  // Waste paper basket with crumpled pages
  makeTemplate(
    'waste_basket_mg_16',
    'Waste paper basket overflowing with crumpled manga draft pages.',
    {
      B: { name: 'basket_body', role: 'body' },
      R: { name: 'rim_edge', role: 'head' },
      P: { name: 'crumpled_paper', role: 'arm' },
      S: { name: 'basket_shadow', role: 'belt' },
      D: { name: 'ink_smudge', role: 'eye' },
    },
    {
      body: COLORS.steel,
      head: COLORS.brass,
      arm: COLORS.paper,
      belt: COLORS.graphite,
      eye: COLORS.ink,
    },
    (g) => {
      // crumpled paper poking out
      paintPoints(g, 'P', [
        [5, 2], [6, 2], [7, 2], [9, 2], [10, 2],
        [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
        [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      ]);
      // ink smudges on paper
      paintPoints(g, 'D', [[6, 3], [9, 3], [7, 4]]);
      // rim
      paintH(g, 'R', 5, 3, 12);
      paintH(g, 'R', 6, 3, 12);
      // basket body (wider at top, narrower at bottom)
      paintRect(g, 'B', 3, 7, 12, 8);
      paintRect(g, 'B', 4, 9, 11, 10);
      paintRect(g, 'B', 4, 11, 11, 12);
      paintRect(g, 'B', 5, 13, 10, 14);
      // shadow inside basket
      paintPoints(g, 'S', [[5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7]]);
    },
  ),

  // ─── 15. Fan Desk ────────────────────────────────────────────
  // Small desk fan for drying ink
  makeTemplate(
    'fan_desk_mg_16',
    'Small desk fan used for quick-drying ink on manga pages.',
    {
      G: { name: 'guard_ring', role: 'body' },
      B: { name: 'blade_fan', role: 'head' },
      H: { name: 'hub_center', role: 'eye' },
      P: { name: 'post_neck', role: 'arm' },
      F: { name: 'foot_base', role: 'belt' },
    },
    {
      body: COLORS.steel,
      head: COLORS.bluePlastic,
      eye: COLORS.graphite,
      arm: COLORS.steel,
      belt: COLORS.steel,
    },
    (g) => {
      // guard ring (circular)
      paintPoints(g, 'G', [
        [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
        [4, 2], [11, 2],
        [3, 3], [12, 3],
        [3, 4], [12, 4],
        [3, 5], [12, 5],
        [3, 6], [12, 6],
        [3, 7], [12, 7],
        [4, 8], [11, 8],
        [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      ]);
      // blades (fills interior)
      paintPoints(g, 'B', [
        [6, 2], [7, 2], [8, 2], [9, 2],
        [5, 3], [6, 3], [7, 3], [9, 3], [10, 3], [11, 3],
        [4, 4], [5, 4], [6, 4], [10, 4], [11, 4],
        [4, 5], [5, 5], [10, 5], [11, 5],
        [4, 6], [5, 6], [6, 6], [10, 6], [11, 6],
        [4, 7], [5, 7], [6, 7], [7, 7], [9, 7], [10, 7], [11, 7],
        [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      ]);
      // hub center
      paintPoints(g, 'H', [[7, 5], [8, 5], [7, 6], [8, 6]]);
      // post neck
      paintRect(g, 'P', 7, 10, 8, 11);
      // foot base
      paintRect(g, 'F', 4, 12, 11, 13);
      paintH(g, 'F', 14, 3, 12);
    },
  ),

  // ─── 16. Calendar Wall ───────────────────────────────────────
  // Wall calendar with deadline marked
  makeTemplate(
    'calendar_wall_mg_16',
    'Wall calendar with circled deadline date and manga schedule notes.',
    {
      P: { name: 'page_body', role: 'body' },
      G: { name: 'grid_lines', role: 'head' },
      R: { name: 'red_circle', role: 'eye' },
      H: { name: 'header_bar', role: 'arm' },
      C: { name: 'clip_ring', role: 'belt' },
    },
    {
      body: COLORS.paper,
      head: COLORS.graphite,
      eye: COLORS.redPlastic,
      arm: COLORS.bluePlastic,
      belt: COLORS.steel,
    },
    (g) => {
      // clip rings at top
      paintPoints(g, 'C', [[4, 1], [5, 1], [10, 1], [11, 1]]);
      // header bar
      paintRect(g, 'H', 2, 2, 13, 4);
      // page body
      paintRect(g, 'P', 2, 5, 13, 14);
      // grid lines (rows of date cells)
      paintH(g, 'G', 5, 2, 13);
      paintH(g, 'G', 8, 2, 13);
      paintH(g, 'G', 11, 2, 13);
      paintV(g, 'G', 5, 5, 14);
      paintV(g, 'G', 8, 5, 14);
      paintV(g, 'G', 11, 5, 14);
      // red deadline circle around a cell
      paintPoints(g, 'R', [
        [9, 9], [10, 9],
        [8, 10], [11, 10],
        [8, 11], [11, 11],
        [9, 12], [10, 12],
      ]);
    },
  ),

  // ─── 17. Clock Alarm ─────────────────────────────────────────
  // Alarm clock — classic round face with bells
  makeTemplate(
    'clock_alarm_mg_16',
    'Alarm clock reminding the mangaka of looming chapter deadlines.',
    {
      F: { name: 'face_body', role: 'body' },
      D: { name: 'dial_face', role: 'head' },
      H: { name: 'hands_marks', role: 'eye' },
      B: { name: 'bell_tops', role: 'arm' },
      L: { name: 'legs_base', role: 'belt' },
    },
    {
      body: COLORS.brass,
      head: COLORS.cream,
      eye: COLORS.ink,
      arm: COLORS.brass,
      belt: COLORS.graphite,
    },
    (g) => {
      // bell tops
      paintPoints(g, 'B', [
        [3, 1], [4, 1], [5, 1],
        [10, 1], [11, 1], [12, 1],
        [4, 2], [11, 2],
      ]);
      // face body (round)
      paintPoints(g, 'F', [
        [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
        [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
        [3, 4], [4, 4], [11, 4], [12, 4],
        [3, 5], [12, 5],
        [3, 6], [12, 6],
        [3, 7], [12, 7],
        [3, 8], [12, 8],
        [3, 9], [4, 9], [11, 9], [12, 9],
        [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
        [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
      ]);
      // dial face
      paintPoints(g, 'D', [
        [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
        [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
        [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
        [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
        [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
        [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
        [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      ]);
      // clock hands
      paintPoints(g, 'H', [
        [7, 4], [8, 4], // 12 mark
        [7, 6], [8, 6], // center to top
        [7, 7], [8, 7], // center
        [9, 7], [10, 7], // hour hand right
        [7, 9], [8, 9], // 6 mark
      ]);
      // legs
      paintPoints(g, 'L', [
        [4, 11], [5, 12], [4, 13],
        [10, 11], [11, 12], [10, 13],
      ]);
    },
  ),

  // ─── 18. Coffee Mug ─────────────────────────────────────────
  // Coffee mug with steam
  makeTemplate(
    'coffee_mug_mg_16',
    'Coffee mug with rising steam — essential manga studio fuel.',
    {
      M: { name: 'mug_body', role: 'body' },
      H: { name: 'handle_loop', role: 'arm' },
      C: { name: 'coffee_surface', role: 'head' },
      S: { name: 'steam_wisps', role: 'eye' },
      R: { name: 'rim_lip', role: 'belt' },
    },
    {
      body: COLORS.cream,
      arm: COLORS.cream,
      head: COLORS.darkWood,
      eye: COLORS.steam,
      belt: COLORS.paper,
    },
    (g) => {
      // steam wisps
      paintPoints(g, 'S', [
        [5, 1], [8, 1], [11, 1],
        [4, 2], [6, 2], [7, 2], [9, 2], [10, 2],
        [5, 3], [8, 3], [11, 3],
      ]);
      // rim (wider)
      paintH(g, 'R', 4, 3, 11);
      // coffee surface
      paintRect(g, 'C', 3, 5, 11, 6);
      // mug body (chunky)
      paintRect(g, 'M', 3, 7, 11, 12);
      paintH(g, 'M', 13, 4, 10);
      paintH(g, 'M', 14, 5, 9);
      // handle loop (thick)
      paintPoints(g, 'H', [
        [12, 7], [13, 7],
        [13, 8], [14, 8],
        [13, 9], [14, 9],
        [13, 10], [14, 10],
        [12, 11], [13, 11],
      ]);
    },
  ),

  // ─── 19. Ashtray ─────────────────────────────────────────────
  // Ashtray — classic mangaka workspace element
  makeTemplate(
    'ashtray_mg_16',
    'Ashtray with cigarette — classic late-night mangaka workspace fixture.',
    {
      T: { name: 'tray_body', role: 'body' },
      R: { name: 'rim_edge', role: 'head' },
      A: { name: 'ash_fill', role: 'arm' },
      C: { name: 'cigarette', role: 'belt' },
      E: { name: 'ember_tip', role: 'eye' },
    },
    {
      body: COLORS.stone,
      head: COLORS.steel,
      arm: COLORS.graphite,
      belt: COLORS.paper,
      eye: COLORS.redPlastic,
    },
    (g) => {
      // cigarette resting diagonally
      paintPoints(g, 'C', [
        [10, 3], [11, 3], [12, 3], [13, 3],
        [9, 4], [10, 4],
        [8, 5], [9, 5],
      ]);
      // ember tip
      paintPoints(g, 'E', [[14, 3], [14, 2]]);
      // smoke wisps
      paintPoints(g, 'A', [[14, 1], [13, 1], [15, 1]]);
      // rim edge (wide oval)
      paintPoints(g, 'R', [
        [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
        [2, 6], [13, 6],
        [2, 7], [13, 7],
      ]);
      // tray body (chunky round)
      paintPoints(g, 'T', [
        [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
        [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
        [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
        [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
        [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
        [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
      ]);
      // ash fill inside (notch grooves)
      paintPoints(g, 'A', [
        [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
        [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      ]);
    },
  ),

  // ─── 20. Cushion Floor ───────────────────────────────────────
  // Zabuton floor cushion — flat, square, Japanese style
  makeTemplate(
    'cushion_floor_mg_16',
    'Zabuton floor cushion for traditional mangaka seated workspace.',
    {
      F: { name: 'fabric_top', role: 'body' },
      E: { name: 'edge_piping', role: 'head' },
      S: { name: 'side_panel', role: 'arm' },
      T: { name: 'tuft_button', role: 'eye' },
      B: { name: 'base_shadow', role: 'belt' },
    },
    {
      body: COLORS.fabric,
      head: COLORS.greenPlastic,
      arm: COLORS.darkCloth,
      eye: COLORS.brass,
      belt: COLORS.graphite,
    },
    (g) => {
      // edge piping (top outline)
      paintPoints(g, 'E', [
        [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4],
        [1, 5], [14, 5],
        [1, 8], [14, 8],
        [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      ]);
      // fabric top surface
      paintPoints(g, 'F', [
        [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
        [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
        [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
        [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      ]);
      // tuft buttons
      paintPoints(g, 'T', [[4, 6], [11, 6], [4, 8], [11, 8], [7, 7], [8, 7]]);
      // side panel (3/4 depth)
      paintPoints(g, 'S', [
        [1, 9], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 9],
        [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11],
      ]);
      // base shadow
      paintPoints(g, 'B', [
        [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
      ]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'library',
  exportNames: {
    templates: 'MANGAKA_BATCH3_TEMPLATES',
    schemes: 'MANGAKA_BATCH3_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
