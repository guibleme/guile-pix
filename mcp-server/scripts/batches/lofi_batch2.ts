/**
 * Lo-Fi Study Cofi batch 2.
 * 20 additional original 16x16 templates for study + coffee ambiance.
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
  neon: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
};

const templates: CompactTemplate[] = [
  makeTemplate(
    'espresso_machine_lofi_16',
    'Countertop espresso machine with gauges, drip tray, and steam wand.',
    {
      C: { name: 'machine_body', role: 'body' },
      P: { name: 'control_panel', role: 'head' },
      G: { name: 'gauges', role: 'eye' },
      M: { name: 'portafilter', role: 'arm' },
      S: { name: 'steam_wand', role: 'accessory' },
      B: { name: 'drip_tray', role: 'belt' },
    },
    {
      body: COLORS.metal,
      head: COLORS.metal,
      eye: COLORS.accent,
      arm: COLORS.metal,
      accessory: COLORS.paper,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'C', 3, 3, 12, 11);
      paintRect(g, 'P', 4, 4, 11, 6);
      paintPoints(g, 'G', [[6, 5], [9, 5]]);
      paintRect(g, 'M', 5, 7, 10, 8);
      paintPoints(g, 'M', [[8, 9]]);
      paintPoints(g, 'S', [[11, 7], [12, 8], [12, 9]]);
      paintH(g, 'B', 12, 3, 12);
    },
  ),
  makeTemplate(
    'moka_pot_lofi_16',
    'Stovetop moka pot with octagonal body and top knob.',
    {
      T: { name: 'top_chamber', role: 'head' },
      B: { name: 'bottom_chamber', role: 'body' },
      S: { name: 'side_handle', role: 'arm' },
      P: { name: 'spout', role: 'accessory' },
      K: { name: 'knob_and_base', role: 'belt' },
    },
    {
      head: COLORS.metal,
      body: COLORS.metal,
      arm: COLORS.wood,
      accessory: COLORS.metal,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'T', 5, 4, 10, 7);
      paintRect(g, 'B', 4, 8, 11, 11);
      paintPoints(g, 'P', [[10, 6], [11, 6], [12, 5]]);
      paintV(g, 'S', 4, 6, 9);
      paintPoints(g, 'S', [[3, 7], [3, 8]]);
      paintPoints(g, 'K', [[8, 3], [7, 12], [8, 12], [9, 12]]);
    },
  ),
  makeTemplate(
    'coffee_bean_jar_16',
    'Glass jar full of coffee beans with lid label strip.',
    {
      J: { name: 'jar_glass', role: 'head' },
      L: { name: 'lid', role: 'body' },
      B: { name: 'beans', role: 'arm' },
      H: { name: 'highlight', role: 'eye' },
      T: { name: 'label_tape', role: 'belt' },
    },
    {
      head: COLORS.glass,
      body: COLORS.wood,
      arm: COLORS.coffee,
      eye: COLORS.paper,
      belt: COLORS.paper,
    },
    (g) => {
      paintRect(g, 'L', 4, 3, 11, 4);
      paintRect(g, 'J', 4, 5, 11, 11);
      paintRect(g, 'B', 5, 6, 10, 10);
      paintPoints(g, 'H', [[5, 6], [5, 8], [6, 7]]);
      paintH(g, 'T', 9, 4, 11);
    },
  ),
  makeTemplate(
    'neon_sign_coffee_16',
    'Wall neon sign over slim backing board with hanging wire.',
    {
      P: { name: 'panel', role: 'body' },
      N: { name: 'neon_tube', role: 'head' },
      G: { name: 'neon_glow', role: 'eye' },
      W: { name: 'wire', role: 'belt' },
      A: { name: 'anchor', role: 'accessory' },
    },
    {
      body: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      head: COLORS.neon,
      eye: COLORS.neon,
      belt: COLORS.metal,
      accessory: COLORS.accent,
    },
    (g) => {
      paintRect(g, 'P', 2, 4, 13, 11);
      paintRect(g, 'N', 4, 6, 11, 9);
      paintH(g, 'G', 7, 5, 10);
      paintPoints(g, 'G', [[6, 6], [9, 8], [11, 7]]);
      paintV(g, 'W', 8, 1, 3);
      paintPoints(g, 'A', [[8, 0], [8, 1]]);
    },
  ),
  makeTemplate(
    'desk_fan_lofi_16',
    'Compact desk fan with circular grill and angled stand base.',
    {
      R: { name: 'fan_ring', role: 'head' },
      B: { name: 'fan_blades', role: 'body' },
      H: { name: 'hub', role: 'eye' },
      S: { name: 'stand', role: 'arm' },
      T: { name: 'base', role: 'belt' },
    },
    {
      head: COLORS.metal,
      body: COLORS.glass,
      eye: COLORS.accent,
      arm: COLORS.metal,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'R', 4, 3, 11, 10);
      paintRect(g, 'B', 5, 4, 10, 9);
      paintPoints(g, 'H', [[7, 6], [8, 6], [8, 7]]);
      paintPoints(g, 'S', [[8, 10], [8, 11], [7, 12], [8, 12], [9, 12]]);
      paintH(g, 'T', 13, 5, 10);
    },
  ),
  makeTemplate(
    'tablet_notes_lofi_16',
    'Tablet showing handwritten notes and small checkboxes.',
    {
      F: { name: 'tablet_frame', role: 'body' },
      S: { name: 'screen', role: 'head' },
      L: { name: 'note_lines', role: 'accessory' },
      C: { name: 'checkboxes', role: 'eye' },
      D: { name: 'dock_edge', role: 'belt' },
    },
    {
      body: COLORS.metal,
      head: COLORS.screen,
      accessory: COLORS.paper,
      eye: COLORS.accent,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'F', 3, 3, 12, 12);
      paintRect(g, 'S', 4, 4, 11, 11);
      paintH(g, 'L', 6, 5, 10);
      paintH(g, 'L', 8, 5, 10);
      paintPoints(g, 'C', [[5, 6], [5, 8], [5, 10]]);
      paintH(g, 'D', 13, 5, 10);
    },
  ),
  makeTemplate(
    'smartphone_timer_lofi_16',
    'Phone timer widget with large digits and side buttons.',
    {
      F: { name: 'phone_frame', role: 'body' },
      S: { name: 'screen', role: 'head' },
      D: { name: 'digits', role: 'eye' },
      B: { name: 'buttons', role: 'accessory' },
      E: { name: 'edge_shadow', role: 'belt' },
    },
    {
      body: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      head: COLORS.screen,
      eye: COLORS.paper,
      accessory: COLORS.accent,
      belt: COLORS.metal,
    },
    (g) => {
      paintRect(g, 'F', 5, 2, 10, 13);
      paintRect(g, 'S', 6, 3, 9, 12);
      paintPoints(g, 'D', [[6, 5], [7, 5], [8, 5], [9, 5], [6, 7], [9, 7], [6, 9], [9, 9]]);
      paintPoints(g, 'B', [[10, 5], [10, 7], [10, 9]]);
      paintH(g, 'E', 13, 6, 9);
    },
  ),
  makeTemplate(
    'bulletin_board_lofi_16',
    'Cork bulletin board with pinned notes and photo corners.',
    {
      F: { name: 'wood_frame', role: 'body' },
      C: { name: 'cork_area', role: 'head' },
      N: { name: 'notes', role: 'arm' },
      P: { name: 'pins', role: 'eye' },
      T: { name: 'tape_strip', role: 'accessory' },
    },
    {
      body: COLORS.wood,
      head: COLORS.amber,
      arm: COLORS.paper,
      eye: COLORS.accent,
      accessory: COLORS.paper,
    },
    (g) => {
      paintRect(g, 'F', 2, 3, 13, 12);
      paintRect(g, 'C', 3, 4, 12, 11);
      paintRect(g, 'N', 4, 5, 7, 7);
      paintRect(g, 'N', 8, 8, 11, 10);
      paintPoints(g, 'P', [[5, 5], [9, 8]]);
      paintPoints(g, 'T', [[10, 4], [11, 4], [12, 5]]);
    },
  ),
  makeTemplate(
    'planner_weekly_lofi_16',
    'Weekly planner spread with section dividers and checklist marks.',
    {
      C: { name: 'cover', role: 'body' },
      P: { name: 'pages', role: 'head' },
      D: { name: 'dividers', role: 'arm' },
      M: { name: 'marks', role: 'eye' },
      B: { name: 'binding', role: 'belt' },
    },
    {
      body: COLORS.wood,
      head: COLORS.paper,
      arm: COLORS.glass,
      eye: COLORS.green,
      belt: COLORS.metal,
    },
    (g) => {
      paintRect(g, 'C', 2, 4, 13, 11);
      paintRect(g, 'P', 3, 5, 12, 10);
      paintV(g, 'B', 7, 5, 10);
      paintV(g, 'D', 5, 6, 9);
      paintV(g, 'D', 9, 6, 9);
      paintPoints(g, 'M', [[4, 6], [4, 8], [10, 7], [11, 9]]);
    },
  ),
  makeTemplate(
    'highlighter_set_lofi_16',
    'Cup of highlighters with color bands and cap clips.',
    {
      C: { name: 'cup', role: 'body' },
      P: { name: 'pens', role: 'head' },
      A: { name: 'accent_bands', role: 'accessory' },
      L: { name: 'clips', role: 'eye' },
      B: { name: 'cup_base', role: 'belt' },
    },
    {
      body: COLORS.metal,
      head: COLORS.paper,
      accessory: COLORS.accent,
      eye: COLORS.neon,
      belt: COLORS.wood,
    },
    (g) => {
      paintV(g, 'P', 5, 3, 7);
      paintV(g, 'P', 7, 2, 7);
      paintV(g, 'P', 9, 3, 7);
      paintPoints(g, 'A', [[5, 5], [7, 5], [9, 5]]);
      paintPoints(g, 'L', [[5, 3], [7, 2], [9, 3]]);
      paintRect(g, 'C', 4, 7, 10, 12);
      paintH(g, 'B', 13, 4, 10);
    },
  ),
  makeTemplate(
    'cable_organizer_lofi_16',
    'Cable organizer tray with wrapped cords and label tabs.',
    {
      T: { name: 'tray', role: 'body' },
      C: { name: 'cables', role: 'head' },
      W: { name: 'wire_loops', role: 'arm' },
      L: { name: 'labels', role: 'accessory' },
      S: { name: 'shadow', role: 'belt' },
    },
    {
      body: COLORS.wood,
      head: COLORS.metal,
      arm: COLORS.glass,
      accessory: COLORS.paper,
      belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    },
    (g) => {
      paintRect(g, 'T', 2, 7, 13, 11);
      paintPoints(g, 'C', [[4, 8], [6, 8], [8, 8], [10, 8], [12, 8]]);
      paintPoints(g, 'W', [[4, 9], [5, 10], [7, 9], [8, 10], [10, 9], [11, 10]]);
      paintPoints(g, 'L', [[3, 6], [6, 6], [9, 6], [12, 6]]);
      paintH(g, 'S', 12, 3, 12);
    },
  ),
  makeTemplate(
    'webcam_mount_lofi_16',
    'Small webcam on clip mount with indicator light.',
    {
      B: { name: 'camera_body', role: 'body' },
      L: { name: 'lens', role: 'head' },
      I: { name: 'indicator', role: 'eye' },
      C: { name: 'clip_mount', role: 'arm' },
      S: { name: 'support', role: 'belt' },
    },
    {
      body: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      head: COLORS.glass,
      eye: COLORS.green,
      arm: COLORS.metal,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'B', 5, 5, 10, 8);
      paintRect(g, 'L', 7, 6, 8, 7);
      paintPoints(g, 'I', [[10, 6]]);
      paintRect(g, 'C', 6, 9, 9, 10);
      paintPoints(g, 'C', [[5, 10], [10, 10]]);
      paintH(g, 'S', 11, 5, 10);
    },
  ),
  makeTemplate(
    'microphone_usb_lofi_16',
    'USB condenser microphone with grille and compact desk stand.',
    {
      G: { name: 'grille', role: 'head' },
      M: { name: 'mic_body', role: 'body' },
      R: { name: 'ring', role: 'arm' },
      S: { name: 'stand', role: 'belt' },
      C: { name: 'cable', role: 'accessory' },
    },
    {
      head: COLORS.metal,
      body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      arm: COLORS.accent,
      belt: COLORS.metal,
      accessory: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'G', 6, 3, 9, 5);
      paintRect(g, 'M', 6, 6, 9, 10);
      paintH(g, 'R', 6, 5, 10);
      paintV(g, 'S', 7, 11, 12);
      paintV(g, 'S', 8, 11, 12);
      paintH(g, 'S', 13, 5, 10);
      paintPoints(g, 'C', [[10, 10], [11, 11], [12, 12]]);
    },
  ),
  makeTemplate(
    'speaker_pair_lofi_16',
    'Pair of bookshelf speakers with woofers and tweeters.',
    {
      C: { name: 'cabinet', role: 'body' },
      W: { name: 'woofer', role: 'head' },
      T: { name: 'tweeter', role: 'eye' },
      G: { name: 'grille_trim', role: 'arm' },
      B: { name: 'base_line', role: 'belt' },
    },
    {
      body: COLORS.wood,
      head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      eye: COLORS.neon,
      arm: COLORS.metal,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'C', 2, 4, 6, 11);
      paintRect(g, 'C', 9, 4, 13, 11);
      paintRect(g, 'W', 3, 7, 5, 9);
      paintRect(g, 'W', 10, 7, 12, 9);
      paintPoints(g, 'T', [[4, 5], [11, 5]]);
      paintH(g, 'G', 6, 3, 5);
      paintH(g, 'G', 6, 10, 12);
      paintH(g, 'B', 12, 2, 13);
    },
  ),
  makeTemplate(
    'ambient_candle_lofi_16',
    'Desk candle jar with warm flame and label sticker.',
    {
      F: { name: 'flame', role: 'accessory' },
      J: { name: 'jar_body', role: 'body' },
      G: { name: 'glass', role: 'head' },
      W: { name: 'wax', role: 'arm' },
      L: { name: 'label', role: 'belt' },
    },
    {
      accessory: COLORS.amber,
      body: COLORS.ceramic,
      head: COLORS.glass,
      arm: COLORS.paper,
      belt: COLORS.paper,
    },
    (g) => {
      paintPoints(g, 'F', [[8, 3], [7, 4], [8, 4], [9, 4]]);
      paintRect(g, 'G', 5, 5, 10, 10);
      paintRect(g, 'W', 6, 6, 9, 7);
      paintRect(g, 'J', 5, 8, 10, 11);
      paintH(g, 'L', 9, 6, 9);
    },
  ),
  makeTemplate(
    'rain_lamp_lofi_16',
    'Tall rain lamp with droplets and glowing center core.',
    {
      T: { name: 'tower_frame', role: 'body' },
      G: { name: 'glass_tube', role: 'head' },
      D: { name: 'droplets', role: 'accessory' },
      C: { name: 'core_light', role: 'eye' },
      B: { name: 'base_cap', role: 'belt' },
    },
    {
      body: COLORS.metal,
      head: COLORS.glass,
      accessory: COLORS.paper,
      eye: COLORS.neon,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'T', 6, 2, 9, 12);
      paintRect(g, 'G', 7, 3, 8, 10);
      paintPoints(g, 'D', [[7, 4], [8, 5], [7, 7], [8, 8], [7, 10]]);
      paintRect(g, 'C', 7, 6, 8, 7);
      paintH(g, 'B', 13, 5, 10);
    },
  ),
  makeTemplate(
    'hoodie_on_chair_16',
    'Comfy chair with hoodie draped over backrest.',
    {
      C: { name: 'chair_frame', role: 'body' },
      H: { name: 'hoodie', role: 'head' },
      F: { name: 'fabric_folds', role: 'arm' },
      S: { name: 'seat_cushion', role: 'belt' },
      L: { name: 'leg_posts', role: 'leg' },
    },
    {
      body: COLORS.wood,
      head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      arm: COLORS.paper,
      belt: COLORS.ceramic,
      leg: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'C', 4, 4, 11, 9);
      paintRect(g, 'H', 5, 3, 10, 7);
      paintPoints(g, 'F', [[6, 5], [7, 6], [8, 5], [9, 6]]);
      paintRect(g, 'S', 5, 8, 10, 9);
      paintV(g, 'L', 5, 10, 13);
      paintV(g, 'L', 10, 10, 13);
    },
  ),
  makeTemplate(
    'snack_bowl_lofi_16',
    'Round snack bowl with mixed treats for late study sessions.',
    {
      B: { name: 'bowl_shell', role: 'body' },
      S: { name: 'snacks', role: 'head' },
      A: { name: 'accents', role: 'accessory' },
      R: { name: 'rim', role: 'arm' },
      T: { name: 'table_shadow', role: 'belt' },
    },
    {
      body: COLORS.ceramic,
      head: COLORS.amber,
      accessory: COLORS.accent,
      arm: COLORS.paper,
      belt: COLORS.wood,
    },
    (g) => {
      paintH(g, 'R', 6, 4, 11);
      paintRect(g, 'B', 4, 7, 11, 10);
      paintRect(g, 'S', 5, 6, 10, 8);
      paintPoints(g, 'A', [[6, 7], [8, 7], [9, 8]]);
      paintH(g, 'T', 11, 4, 11);
    },
  ),
  makeTemplate(
    'beanbag_cozy_lofi_16',
    'Soft beanbag seat with stitched seams and floor shadow.',
    {
      B: { name: 'beanbag_body', role: 'body' },
      S: { name: 'seams', role: 'head' },
      H: { name: 'highlight', role: 'eye' },
      F: { name: 'floor_shadow', role: 'belt' },
    },
    {
      body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      head: COLORS.paper,
      eye: COLORS.paper,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'B', 3, 6, 12, 12);
      paintPoints(g, 'S', [[6, 7], [7, 8], [8, 9], [9, 10]]);
      paintPoints(g, 'H', [[5, 7], [6, 7], [7, 7]]);
      paintH(g, 'F', 13, 4, 11);
    },
  ),
  makeTemplate(
    'study_poster_lofi_16',
    'Motivational study poster with frame, title bar, and icon marks.',
    {
      F: { name: 'poster_frame', role: 'body' },
      P: { name: 'paper_area', role: 'head' },
      T: { name: 'title_bar', role: 'arm' },
      I: { name: 'icons', role: 'accessory' },
      S: { name: 'shadow_strip', role: 'belt' },
    },
    {
      body: COLORS.wood,
      head: COLORS.paper,
      arm: COLORS.screen,
      accessory: COLORS.accent,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'F', 3, 2, 12, 13);
      paintRect(g, 'P', 4, 3, 11, 12);
      paintH(g, 'T', 4, 4, 11);
      paintPoints(g, 'I', [[5, 6], [7, 6], [9, 6], [6, 9], [8, 10], [10, 9]]);
      paintH(g, 'S', 13, 4, 11);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'LOFI_BATCH2_TEMPLATES',
    schemes: 'LOFI_BATCH2_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
