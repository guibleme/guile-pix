/**
 * Lo-Fi Study Cofi batch 1.
 * 20 original 16x16 templates focused on study desk + coffee ambiance.
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
  return {
    id,
    description,
    grid: toRows(grid),
    chars,
    colors,
  };
}

const COLORS = {
  ceramic: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  coffee: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  metal: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  wood: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  paper: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  glass: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  screen: { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
  amber: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  green: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  accent: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
};

const templates: CompactTemplate[] = [
  makeTemplate(
    'coffee_mug_lofi_16',
    'Ceramic coffee mug with steam and saucer for cozy desk scenes.',
    {
      S: { name: 'steam', role: 'accessory' },
      R: { name: 'mug_rim', role: 'head' },
      C: { name: 'coffee_fill', role: 'body' },
      M: { name: 'mug_body', role: 'arm' },
      H: { name: 'mug_handle', role: 'belt' },
      P: { name: 'saucer', role: 'leg' },
    },
    {
      accessory: COLORS.paper,
      head: COLORS.ceramic,
      body: COLORS.coffee,
      arm: COLORS.ceramic,
      belt: COLORS.ceramic,
      leg: COLORS.paper,
    },
    (g) => {
      paintPoints(g, 'S', [[7, 2], [8, 1], [9, 2], [8, 3]]);
      paintH(g, 'R', 4, 4, 11);
      paintRect(g, 'M', 4, 5, 11, 9);
      paintRect(g, 'C', 5, 5, 10, 7);
      paintV(g, 'H', 12, 6, 8);
      paintPoints(g, 'H', [[13, 7]]);
      paintH(g, 'P', 10, 3, 12);
      paintH(g, 'P', 11, 4, 11);
    },
  ),
  makeTemplate(
    'latte_art_cup_16',
    'Wide cup with latte art swirl and short plate base.',
    {
      S: { name: 'steam_wisp', role: 'accessory' },
      C: { name: 'cup_shell', role: 'head' },
      L: { name: 'latte_surface', role: 'body' },
      A: { name: 'art_swirl', role: 'eye' },
      H: { name: 'handle', role: 'belt' },
      P: { name: 'plate', role: 'leg' },
    },
    {
      accessory: COLORS.paper,
      head: COLORS.ceramic,
      body: COLORS.amber,
      eye: COLORS.paper,
      belt: COLORS.ceramic,
      leg: COLORS.paper,
    },
    (g) => {
      paintPoints(g, 'S', [[6, 2], [7, 1], [8, 2], [9, 1]]);
      paintRect(g, 'C', 4, 4, 11, 9);
      paintRect(g, 'L', 5, 5, 10, 7);
      paintPoints(g, 'A', [[7, 6], [8, 6], [8, 5], [9, 6]]);
      paintV(g, 'H', 12, 6, 8);
      paintH(g, 'P', 10, 3, 12);
    },
  ),
  makeTemplate(
    'pour_over_kettle_16',
    'Gooseneck pour-over kettle with curved spout and lid knob.',
    {
      K: { name: 'kettle_body', role: 'body' },
      L: { name: 'lid_and_knob', role: 'head' },
      P: { name: 'spout', role: 'arm' },
      H: { name: 'rear_handle', role: 'belt' },
      B: { name: 'base_shadow', role: 'leg' },
    },
    {
      body: COLORS.metal,
      head: COLORS.metal,
      arm: COLORS.metal,
      belt: COLORS.wood,
      leg: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'K', 5, 5, 10, 10);
      paintH(g, 'L', 4, 6, 9);
      paintPoints(g, 'L', [[8, 3]]);
      paintPoints(g, 'P', [[11, 6], [12, 6], [13, 5], [14, 5]]);
      paintV(g, 'H', 4, 6, 9);
      paintPoints(g, 'H', [[3, 7], [3, 8]]);
      paintH(g, 'B', 11, 5, 10);
    },
  ),
  makeTemplate(
    'french_press_lofi_16',
    'Glass french press with metal frame and plunger stem.',
    {
      F: { name: 'frame', role: 'head' },
      G: { name: 'glass_body', role: 'body' },
      C: { name: 'coffee_level', role: 'arm' },
      P: { name: 'plunger', role: 'belt' },
      B: { name: 'base', role: 'leg' },
    },
    {
      head: COLORS.metal,
      body: COLORS.glass,
      arm: COLORS.coffee,
      belt: COLORS.metal,
      leg: COLORS.metal,
    },
    (g) => {
      paintRect(g, 'F', 5, 4, 10, 11);
      paintRect(g, 'G', 6, 5, 9, 10);
      paintRect(g, 'C', 6, 8, 9, 10);
      paintV(g, 'P', 8, 2, 4);
      paintH(g, 'P', 2, 7, 9);
      paintH(g, 'B', 12, 5, 10);
    },
  ),
  makeTemplate(
    'vinyl_turntable_lofi_16',
    'Compact turntable with platter, vinyl disk, and tonearm.',
    {
      B: { name: 'base_case', role: 'body' },
      P: { name: 'platter', role: 'head' },
      V: { name: 'vinyl_disk', role: 'arm' },
      L: { name: 'center_label', role: 'eye' },
      T: { name: 'tonearm', role: 'belt' },
    },
    {
      body: COLORS.wood,
      head: COLORS.metal,
      arm: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      eye: COLORS.accent,
      belt: COLORS.metal,
    },
    (g) => {
      paintRect(g, 'B', 2, 4, 13, 12);
      paintRect(g, 'P', 4, 5, 9, 10);
      paintRect(g, 'V', 5, 6, 8, 9);
      paintPoints(g, 'L', [[6, 7], [7, 7], [7, 8]]);
      paintPoints(g, 'T', [[10, 6], [11, 7], [12, 8], [12, 9], [11, 10]]);
    },
  ),
  makeTemplate(
    'cassette_player_lofi_16',
    'Portable cassette player with tape window and side controls.',
    {
      B: { name: 'player_shell', role: 'body' },
      W: { name: 'window', role: 'head' },
      T: { name: 'cassette_tape', role: 'arm' },
      U: { name: 'buttons', role: 'accessory' },
      S: { name: 'strap', role: 'belt' },
    },
    {
      body: COLORS.metal,
      head: COLORS.glass,
      arm: { shadow: '#442434', base: '#757161', highlight: '#8595a1' },
      accessory: COLORS.accent,
      belt: COLORS.paper,
    },
    (g) => {
      paintRect(g, 'B', 3, 4, 12, 11);
      paintRect(g, 'W', 5, 6, 10, 9);
      paintPoints(g, 'T', [[6, 7], [9, 7], [7, 8], [8, 8]]);
      paintRect(g, 'U', 4, 10, 7, 10);
      paintV(g, 'S', 13, 5, 10);
    },
  ),
  makeTemplate(
    'desk_lamp_lofi_16',
    'Articulated desk lamp with warm cone light.',
    {
      B: { name: 'base', role: 'body' },
      S: { name: 'arm_segments', role: 'head' },
      H: { name: 'lamp_shade', role: 'arm' },
      L: { name: 'light_cone', role: 'accessory' },
      C: { name: 'cord', role: 'belt' },
    },
    {
      body: COLORS.metal,
      head: COLORS.metal,
      arm: COLORS.metal,
      accessory: COLORS.amber,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'B', 6, 11, 10, 12);
      paintPoints(g, 'S', [[8, 10], [8, 9], [9, 8], [10, 7]]);
      paintRect(g, 'H', 10, 5, 13, 7);
      paintPoints(g, 'L', [[12, 8], [11, 9], [12, 9], [13, 9], [10, 10], [11, 10], [12, 10], [13, 10]]);
      paintPoints(g, 'C', [[7, 13], [6, 13], [5, 14]]);
    },
  ),
  makeTemplate(
    'study_notebook_lofi_16',
    'Open ruled notebook with center binding and folded corner.',
    {
      C: { name: 'cover_back', role: 'body' },
      P: { name: 'paper_pages', role: 'head' },
      R: { name: 'rule_lines', role: 'accessory' },
      B: { name: 'binding', role: 'belt' },
      F: { name: 'fold_corner', role: 'eye' },
    },
    {
      body: COLORS.wood,
      head: COLORS.paper,
      accessory: COLORS.glass,
      belt: COLORS.metal,
      eye: COLORS.paper,
    },
    (g) => {
      paintRect(g, 'C', 3, 4, 12, 11);
      paintRect(g, 'P', 4, 5, 11, 10);
      paintV(g, 'B', 8, 5, 10);
      paintH(g, 'R', 6, 5, 7);
      paintH(g, 'R', 6, 9, 10);
      paintH(g, 'R', 8, 5, 7);
      paintH(g, 'R', 8, 9, 10);
      paintPoints(g, 'F', [[11, 5], [10, 5], [11, 6]]);
    },
  ),
  makeTemplate(
    'sticky_note_stack_lofi_16',
    'Layered sticky notes with push pin and cast shadow.',
    {
      N: { name: 'note_stack', role: 'body' },
      E: { name: 'edge_layers', role: 'head' },
      P: { name: 'pin', role: 'accessory' },
      S: { name: 'drop_shadow', role: 'belt' },
    },
    {
      body: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      head: COLORS.paper,
      accessory: COLORS.accent,
      belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    },
    (g) => {
      paintRect(g, 'S', 5, 10, 12, 12);
      paintRect(g, 'N', 3, 5, 10, 10);
      paintRect(g, 'E', 4, 6, 11, 11);
      paintPoints(g, 'P', [[7, 4], [7, 5], [8, 5]]);
    },
  ),
  makeTemplate(
    'mechanical_keyboard_lofi_16',
    'Compact mechanical keyboard with highlighted macro keys.',
    {
      B: { name: 'keyboard_base', role: 'body' },
      K: { name: 'keycaps', role: 'head' },
      A: { name: 'accent_keys', role: 'accessory' },
      C: { name: 'cable', role: 'belt' },
    },
    {
      body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      head: COLORS.paper,
      accessory: COLORS.accent,
      belt: COLORS.metal,
    },
    (g) => {
      paintRect(g, 'B', 2, 7, 13, 12);
      paintRect(g, 'K', 3, 8, 12, 11);
      paintPoints(g, 'A', [[4, 9], [5, 9], [10, 10], [11, 10]]);
      paintPoints(g, 'C', [[13, 8], [14, 8], [15, 7]]);
    },
  ),
  makeTemplate(
    'compact_mouse_lofi_16',
    'Small ergonomic mouse with center wheel and subtle shadow.',
    {
      B: { name: 'mouse_shell', role: 'body' },
      W: { name: 'scroll_wheel', role: 'head' },
      S: { name: 'underside_shadow', role: 'belt' },
      H: { name: 'highlight', role: 'eye' },
    },
    {
      body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      head: COLORS.accent,
      belt: COLORS.wood,
      eye: COLORS.paper,
    },
    (g) => {
      paintRect(g, 'B', 5, 5, 10, 11);
      paintRect(g, 'S', 5, 11, 10, 12);
      paintV(g, 'W', 8, 6, 8);
      paintPoints(g, 'H', [[7, 6], [6, 7]]);
    },
  ),
  makeTemplate(
    'monitor_with_notes_16',
    'Desktop monitor with sticky notes on bezel corners.',
    {
      B: { name: 'bezel', role: 'body' },
      S: { name: 'screen', role: 'head' },
      N: { name: 'sticky_notes', role: 'accessory' },
      T: { name: 'stand', role: 'belt' },
      F: { name: 'foot', role: 'leg' },
    },
    {
      body: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      head: COLORS.screen,
      accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      belt: COLORS.metal,
      leg: COLORS.metal,
    },
    (g) => {
      paintRect(g, 'B', 2, 3, 13, 9);
      paintRect(g, 'S', 3, 4, 12, 8);
      paintPoints(g, 'N', [[2, 3], [3, 3], [12, 3], [13, 3]]);
      paintRect(g, 'T', 7, 10, 8, 12);
      paintH(g, 'F', 13, 5, 10);
    },
  ),
  makeTemplate(
    'laptop_study_lofi_16',
    'Open laptop with keyboard deck and soft blue screen glow.',
    {
      S: { name: 'screen_panel', role: 'head' },
      G: { name: 'screen_glow', role: 'eye' },
      C: { name: 'chassis', role: 'body' },
      K: { name: 'keyboard_keys', role: 'arm' },
      H: { name: 'hinge', role: 'belt' },
    },
    {
      head: COLORS.screen,
      eye: COLORS.glass,
      body: COLORS.metal,
      arm: COLORS.paper,
      belt: COLORS.metal,
    },
    (g) => {
      paintRect(g, 'S', 4, 3, 11, 7);
      paintRect(g, 'G', 5, 4, 10, 6);
      paintH(g, 'H', 4, 4, 11);
      paintRect(g, 'C', 3, 8, 12, 11);
      paintRect(g, 'K', 4, 9, 11, 10);
    },
  ),
  makeTemplate(
    'desk_clock_digital_16',
    'Small digital desk clock with segmented time display.',
    {
      F: { name: 'clock_frame', role: 'body' },
      D: { name: 'display_panel', role: 'head' },
      G: { name: 'digit_segments', role: 'accessory' },
      S: { name: 'support_base', role: 'belt' },
    },
    {
      body: COLORS.metal,
      head: COLORS.screen,
      accessory: COLORS.paper,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'F', 3, 5, 12, 10);
      paintRect(g, 'D', 4, 6, 11, 9);
      paintPoints(g, 'G', [[5, 7], [6, 7], [8, 7], [9, 7], [10, 7], [6, 8], [9, 8]]);
      paintH(g, 'S', 11, 5, 10);
    },
  ),
  makeTemplate(
    'headphones_hanging_16',
    'Over-ear headphones hanging on a slim desk stand.',
    {
      B: { name: 'headband', role: 'head' },
      E: { name: 'earcups', role: 'body' },
      S: { name: 'stand', role: 'arm' },
      C: { name: 'cable', role: 'belt' },
      P: { name: 'pad_detail', role: 'accessory' },
    },
    {
      head: COLORS.metal,
      body: { shadow: '#30346d', base: '#4e4a4e', highlight: '#8595a1' },
      arm: COLORS.metal,
      belt: COLORS.wood,
      accessory: COLORS.paper,
    },
    (g) => {
      paintH(g, 'B', 3, 5, 10);
      paintV(g, 'B', 5, 4, 6);
      paintV(g, 'B', 10, 4, 6);
      paintRect(g, 'E', 4, 7, 6, 10);
      paintRect(g, 'E', 9, 7, 11, 10);
      paintPoints(g, 'P', [[5, 8], [10, 8]]);
      paintV(g, 'S', 8, 7, 12);
      paintH(g, 'S', 13, 6, 10);
      paintPoints(g, 'C', [[11, 11], [12, 12], [12, 13]]);
    },
  ),
  makeTemplate(
    'bookshelf_small_lofi_16',
    'Compact bookshelf with stacked books and a tiny decor piece.',
    {
      F: { name: 'shelf_frame', role: 'body' },
      B: { name: 'book_spines', role: 'head' },
      D: { name: 'decor_item', role: 'accessory' },
      S: { name: 'shelf_planks', role: 'belt' },
    },
    {
      body: COLORS.wood,
      head: COLORS.paper,
      accessory: COLORS.accent,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'F', 3, 3, 12, 12);
      paintRect(g, 'B', 4, 4, 11, 11);
      paintH(g, 'S', 7, 4, 11);
      paintH(g, 'S', 9, 4, 11);
      paintPoints(g, 'D', [[10, 5], [10, 6], [11, 6]]);
      paintPoints(g, 'B', [[5, 5], [6, 5], [7, 5], [5, 8], [6, 8], [7, 8], [8, 8]]);
    },
  ),
  makeTemplate(
    'rain_window_panel_16',
    'Window frame panel with rainy glass and interior sill.',
    {
      F: { name: 'window_frame', role: 'body' },
      G: { name: 'glass_panel', role: 'head' },
      R: { name: 'raindrops', role: 'accessory' },
      S: { name: 'sill', role: 'belt' },
      L: { name: 'light_reflect', role: 'eye' },
    },
    {
      body: COLORS.wood,
      head: COLORS.glass,
      accessory: COLORS.paper,
      belt: COLORS.wood,
      eye: COLORS.screen,
    },
    (g) => {
      paintRect(g, 'F', 2, 2, 13, 11);
      paintRect(g, 'G', 3, 3, 12, 10);
      paintH(g, 'S', 12, 2, 13);
      paintPoints(g, 'R', [[5, 4], [7, 5], [10, 4], [6, 7], [9, 8], [11, 6]]);
      paintPoints(g, 'L', [[4, 4], [4, 5], [5, 5]]);
    },
  ),
  makeTemplate(
    'potted_succulent_lofi_16',
    'Small succulent in ceramic pot for desk greenery accents.',
    {
      P: { name: 'pot', role: 'body' },
      S: { name: 'soil', role: 'belt' },
      L: { name: 'leaf_cluster', role: 'head' },
      H: { name: 'leaf_highlight', role: 'accessory' },
    },
    {
      body: COLORS.ceramic,
      belt: COLORS.wood,
      head: COLORS.green,
      accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
    },
    (g) => {
      paintRect(g, 'P', 5, 8, 10, 12);
      paintH(g, 'S', 5, 5, 10);
      paintPoints(g, 'L', [[7, 4], [8, 4], [6, 5], [7, 5], [8, 5], [9, 5], [7, 6], [8, 6]]);
      paintPoints(g, 'H', [[8, 4], [9, 5], [8, 6]]);
    },
  ),
  makeTemplate(
    'pen_holder_lofi_16',
    'Desk cup with pens, marker caps, and metallic holder rim.',
    {
      C: { name: 'cup_body', role: 'body' },
      R: { name: 'rim', role: 'head' },
      P: { name: 'pens', role: 'arm' },
      A: { name: 'pen_caps', role: 'accessory' },
      B: { name: 'base', role: 'belt' },
    },
    {
      body: COLORS.metal,
      head: COLORS.paper,
      arm: COLORS.glass,
      accessory: COLORS.accent,
      belt: COLORS.wood,
    },
    (g) => {
      paintV(g, 'P', 6, 3, 7);
      paintV(g, 'P', 8, 2, 7);
      paintV(g, 'P', 10, 3, 7);
      paintPoints(g, 'A', [[6, 2], [8, 1], [10, 2]]);
      paintRect(g, 'C', 5, 7, 11, 12);
      paintH(g, 'R', 7, 5, 11);
      paintH(g, 'B', 13, 5, 11);
    },
  ),
  makeTemplate(
    'study_desk_setup_16',
    'Full desk setup icon with monitor, lamp, notebook, and coffee mug.',
    {
      D: { name: 'desk_surface', role: 'body' },
      M: { name: 'monitor', role: 'head' },
      L: { name: 'lamp', role: 'arm' },
      N: { name: 'notebook', role: 'belt' },
      C: { name: 'coffee_mug', role: 'accessory' },
      S: { name: 'screen_glow', role: 'eye' },
    },
    {
      body: COLORS.wood,
      head: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      arm: COLORS.metal,
      belt: COLORS.paper,
      accessory: COLORS.ceramic,
      eye: COLORS.screen,
    },
    (g) => {
      paintRect(g, 'D', 1, 10, 14, 12);
      paintRect(g, 'M', 5, 4, 10, 8);
      paintRect(g, 'S', 6, 5, 9, 7);
      paintPoints(g, 'L', [[3, 9], [4, 8], [5, 7], [5, 6], [6, 6]]);
      paintRect(g, 'N', 11, 9, 13, 10);
      paintRect(g, 'C', 2, 8, 3, 9);
      paintPoints(g, 'C', [[4, 8]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'LOFI_BATCH1_TEMPLATES',
    schemes: 'LOFI_BATCH1_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
