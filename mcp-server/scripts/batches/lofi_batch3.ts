/**
 * Lo-Fi Study Cofi batch 3.
 * 60 original 16x16 templates to bring the Lo-Fi bundle to 100 total.
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

interface Variant {
  id: string;
  description: string;
  a?: Triad;
  b?: Triad;
  c?: Triad;
}

function makeCup(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      S: { name: 'steam', role: 'accessory' },
      R: { name: 'rim', role: 'head' },
      L: { name: 'liquid', role: 'body' },
      C: { name: 'cup_shell', role: 'arm' },
      H: { name: 'handle', role: 'belt' },
      P: { name: 'plate', role: 'leg' },
    },
    {
      accessory: v.c ?? COLORS.paper,
      head: v.b ?? COLORS.ceramic,
      body: v.a ?? COLORS.coffee,
      arm: v.b ?? COLORS.ceramic,
      belt: v.b ?? COLORS.ceramic,
      leg: COLORS.paper,
    },
    (g) => {
      paintPoints(g, 'S', [[7, 2], [8, 1], [9, 2], [8, 3]]);
      paintH(g, 'R', 4, 4, 11);
      paintRect(g, 'C', 4, 5, 11, 9);
      paintRect(g, 'L', 5, 5, 10, 7);
      paintV(g, 'H', 12, 6, 8);
      paintPoints(g, 'H', [[13, 7]]);
      paintH(g, 'P', 10, 3, 12);
      paintH(g, 'P', 11, 4, 11);
    },
  );
}

function makeScreenDevice(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      B: { name: 'bezel', role: 'body' },
      S: { name: 'screen', role: 'head' },
      G: { name: 'glow', role: 'eye' },
      D: { name: 'dock', role: 'belt' },
      A: { name: 'accent', role: 'accessory' },
    },
    {
      body: v.b ?? COLORS.metal,
      head: v.a ?? COLORS.screen,
      eye: v.c ?? COLORS.neon,
      belt: COLORS.wood,
      accessory: COLORS.accent,
    },
    (g) => {
      paintRect(g, 'B', 2, 3, 13, 10);
      paintRect(g, 'S', 3, 4, 12, 9);
      paintRect(g, 'G', 5, 5, 10, 8);
      paintPoints(g, 'A', [[3, 3], [12, 3], [7, 9], [8, 9]]);
      paintRect(g, 'D', 7, 11, 8, 12);
      paintH(g, 'D', 13, 5, 10);
    },
  );
}

function makePaperTool(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      C: { name: 'cover', role: 'body' },
      P: { name: 'pages', role: 'head' },
      L: { name: 'lines', role: 'arm' },
      M: { name: 'marks', role: 'eye' },
      B: { name: 'binding', role: 'belt' },
    },
    {
      body: v.b ?? COLORS.wood,
      head: v.a ?? COLORS.paper,
      arm: v.c ?? COLORS.glass,
      eye: COLORS.green,
      belt: COLORS.metal,
    },
    (g) => {
      paintRect(g, 'C', 3, 4, 12, 11);
      paintRect(g, 'P', 4, 5, 11, 10);
      paintV(g, 'B', 8, 5, 10);
      paintH(g, 'L', 6, 5, 7);
      paintH(g, 'L', 6, 9, 10);
      paintH(g, 'L', 8, 5, 7);
      paintH(g, 'L', 8, 9, 10);
      paintPoints(g, 'M', [[5, 6], [10, 8], [10, 9]]);
    },
  );
}

function makeLight(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      F: { name: 'light_core', role: 'eye' },
      G: { name: 'glass_or_glow', role: 'head' },
      M: { name: 'metal_frame', role: 'body' },
      S: { name: 'stand', role: 'arm' },
      B: { name: 'base', role: 'belt' },
    },
    {
      eye: v.a ?? COLORS.amber,
      head: v.c ?? COLORS.glass,
      body: v.b ?? COLORS.metal,
      arm: COLORS.metal,
      belt: COLORS.wood,
    },
    (g) => {
      paintPoints(g, 'F', [[8, 3], [7, 4], [8, 4], [9, 4]]);
      paintRect(g, 'G', 6, 5, 9, 8);
      paintRect(g, 'M', 5, 9, 10, 11);
      paintV(g, 'S', 8, 8, 11);
      paintH(g, 'B', 12, 5, 10);
    },
  );
}

function makeAudio(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      C: { name: 'case', role: 'body' },
      D: { name: 'dial_or_driver', role: 'head' },
      L: { name: 'led_or_label', role: 'eye' },
      T: { name: 'trim', role: 'arm' },
      W: { name: 'wire', role: 'belt' },
    },
    {
      body: v.b ?? COLORS.wood,
      head: v.a ?? COLORS.metal,
      eye: v.c ?? COLORS.neon,
      arm: COLORS.metal,
      belt: COLORS.paper,
    },
    (g) => {
      paintRect(g, 'C', 3, 4, 12, 11);
      paintRect(g, 'D', 5, 6, 10, 9);
      paintPoints(g, 'L', [[6, 7], [9, 7], [7, 8], [8, 8]]);
      paintH(g, 'T', 5, 4, 11);
      paintPoints(g, 'W', [[10, 10], [11, 11], [12, 12]]);
    },
  );
}

function makeShelf(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      F: { name: 'frame', role: 'body' },
      I: { name: 'items', role: 'head' },
      A: { name: 'accents', role: 'eye' },
      P: { name: 'planks', role: 'arm' },
      B: { name: 'base', role: 'belt' },
    },
    {
      body: v.b ?? COLORS.wood,
      head: v.a ?? COLORS.paper,
      eye: v.c ?? COLORS.accent,
      arm: COLORS.wood,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'F', 3, 3, 12, 12);
      paintRect(g, 'I', 4, 4, 11, 11);
      paintH(g, 'P', 7, 4, 11);
      paintH(g, 'P', 9, 4, 11);
      paintPoints(g, 'A', [[5, 5], [8, 6], [10, 10]]);
      paintH(g, 'B', 13, 4, 11);
    },
  );
}

function makePlantDecor(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      P: { name: 'pot', role: 'body' },
      L: { name: 'leaves', role: 'head' },
      H: { name: 'highlights', role: 'eye' },
      S: { name: 'soil_or_fill', role: 'belt' },
      A: { name: 'accent', role: 'accessory' },
    },
    {
      body: v.b ?? COLORS.ceramic,
      head: v.a ?? COLORS.green,
      eye: v.c ?? COLORS.paper,
      belt: COLORS.wood,
      accessory: COLORS.accent,
    },
    (g) => {
      paintRect(g, 'P', 5, 8, 10, 12);
      paintH(g, 'S', 8, 5, 10);
      paintPoints(g, 'L', [[7, 4], [8, 4], [6, 5], [7, 5], [8, 5], [9, 5], [7, 6], [8, 6]]);
      paintPoints(g, 'H', [[8, 4], [9, 5], [8, 6]]);
      paintPoints(g, 'A', [[6, 9], [9, 10]]);
    },
  );
}

function makeBoard(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      F: { name: 'frame', role: 'body' },
      B: { name: 'board', role: 'head' },
      N: { name: 'notes', role: 'arm' },
      P: { name: 'pins', role: 'eye' },
      T: { name: 'tape', role: 'belt' },
    },
    {
      body: v.b ?? COLORS.wood,
      head: v.a ?? COLORS.amber,
      arm: COLORS.paper,
      eye: v.c ?? COLORS.accent,
      belt: COLORS.paper,
    },
    (g) => {
      paintRect(g, 'F', 2, 3, 13, 12);
      paintRect(g, 'B', 3, 4, 12, 11);
      paintRect(g, 'N', 4, 5, 7, 7);
      paintRect(g, 'N', 8, 8, 11, 10);
      paintPoints(g, 'P', [[5, 5], [9, 8], [10, 9]]);
      paintPoints(g, 'T', [[10, 4], [11, 4], [12, 5]]);
    },
  );
}

function makeUtility(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      T: { name: 'tool_body', role: 'body' },
      C: { name: 'core', role: 'head' },
      A: { name: 'accents', role: 'arm' },
      L: { name: 'led', role: 'eye' },
      B: { name: 'base', role: 'belt' },
    },
    {
      body: v.b ?? COLORS.metal,
      head: v.a ?? COLORS.screen,
      arm: COLORS.accent,
      eye: v.c ?? COLORS.neon,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'T', 4, 5, 11, 10);
      paintRect(g, 'C', 5, 6, 10, 9);
      paintPoints(g, 'A', [[4, 6], [11, 6], [4, 9], [11, 9]]);
      paintPoints(g, 'L', [[6, 7], [9, 7]]);
      paintH(g, 'B', 11, 4, 11);
    },
  );
}

function makeComfort(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      C: { name: 'core_shape', role: 'body' },
      F: { name: 'folds', role: 'head' },
      H: { name: 'highlight', role: 'eye' },
      A: { name: 'accent', role: 'arm' },
      S: { name: 'shadow', role: 'belt' },
    },
    {
      body: v.a ?? COLORS.ceramic,
      head: v.b ?? COLORS.paper,
      eye: COLORS.paper,
      arm: v.c ?? COLORS.accent,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'C', 3, 6, 12, 12);
      paintPoints(g, 'F', [[6, 7], [7, 8], [8, 8], [9, 9], [10, 10]]);
      paintPoints(g, 'H', [[5, 7], [6, 7], [7, 7]]);
      paintPoints(g, 'A', [[4, 9], [11, 10]]);
      paintH(g, 'S', 13, 4, 11);
    },
  );
}

const cupVariants: Variant[] = [
  { id: 'cappuccino_mug_lofi_16', description: 'Cappuccino mug with creamy foam and soft steam.' },
  { id: 'herbal_tea_mug_lofi_16', description: 'Herbal tea cup for calm late-night study breaks.', a: COLORS.green },
  { id: 'mocha_cup_lofi_16', description: 'Mocha cup variant with darker coffee fill.', a: COLORS.coffee, c: COLORS.amber },
  { id: 'vanilla_latte_cup_lofi_16', description: 'Vanilla latte cup with bright warm body tones.', a: COLORS.amber },
  { id: 'focus_espresso_mug_lofi_16', description: 'Small focus espresso mug with compact proportions.', a: COLORS.coffee, b: COLORS.paper },
  { id: 'night_chai_mug_lofi_16', description: 'Spiced chai mug for cozy evening reading sessions.', a: COLORS.amber, b: COLORS.ceramic },
];

const screenVariants: Variant[] = [
  { id: 'study_monitor_minimal_lofi_16', description: 'Minimal study monitor with clean UI glow.' },
  { id: 'focus_mode_display_lofi_16', description: 'Focus mode display with centered calm palette.', a: COLORS.neon },
  { id: 'pomodoro_screen_lofi_16', description: 'Pomodoro timer screen layout on desktop display.', a: COLORS.screen, c: COLORS.accent },
  { id: 'night_shift_display_lofi_16', description: 'Night shift display with warm blue-reduced tones.', a: COLORS.glass, c: COLORS.paper },
  { id: 'music_visualizer_screen_lofi_16', description: 'Ambient music visualizer on a desk monitor.', a: COLORS.neon, c: COLORS.green },
  { id: 'stream_chat_screen_lofi_16', description: 'Stream chat side display for co-working scenes.', a: COLORS.screen, b: COLORS.metal },
];

const paperVariants: Variant[] = [
  { id: 'study_notepad_grid_lofi_16', description: 'Grid notepad page for neat session planning.' },
  { id: 'assignment_planner_lofi_16', description: 'Assignment planner with sections and checks.' },
  { id: 'exam_revision_sheet_lofi_16', description: 'Revision sheet layout for exam prep loops.' },
  { id: 'mindmap_notebook_lofi_16', description: 'Mindmap notebook spread with branch markers.', c: COLORS.neon },
  { id: 'journal_page_lofi_16', description: 'Daily journal page with concise bullet entries.', b: COLORS.wood, a: COLORS.paper },
  { id: 'flashcard_notebook_lofi_16', description: 'Notebook used as a flip-style flashcard stack.' },
];

const lightVariants: Variant[] = [
  { id: 'study_lantern_lofi_16', description: 'Compact study lantern with warm center flame.' },
  { id: 'amber_desk_lamp_lofi_16', description: 'Amber desk lamp for nighttime focus lighting.', a: COLORS.amber },
  { id: 'glass_candle_lamp_lofi_16', description: 'Glass candle lamp with soft reflected highlights.' },
  { id: 'moonlight_desk_lamp_lofi_16', description: 'Cool moonlight lamp variant for quiet ambiance.', a: COLORS.neon, c: COLORS.glass },
  { id: 'retro_bulb_lamp_lofi_16', description: 'Retro bulb lamp with visible filament glow.', a: COLORS.amber, b: COLORS.metal },
  { id: 'soft_night_lamp_lofi_16', description: 'Small bedside-style night lamp for cozy desks.', a: COLORS.paper, c: COLORS.glass },
];

const audioVariants: Variant[] = [
  { id: 'radio_player_lofi_16', description: 'Compact radio player for lo-fi channel playback.' },
  { id: 'cassette_deck_lofi_16', description: 'Desk cassette deck variant with status indicator.' },
  { id: 'mini_mixer_lofi_16', description: 'Tiny audio mixer for stream ambience control.' },
  { id: 'headphone_amp_lofi_16', description: 'Headphone amp unit for clean study audio.' },
  { id: 'speaker_control_box_lofi_16', description: 'Speaker control box with dual level dials.' },
  { id: 'vinyl_preamp_lofi_16', description: 'Vinyl preamp device with subtle front LED glow.' },
];

const shelfVariants: Variant[] = [
  { id: 'study_shelf_books_lofi_16', description: 'Study shelf with compact books and trinkets.' },
  { id: 'desk_shelf_tools_lofi_16', description: 'Desk shelf with tools, clips, and tiny storage.' },
  { id: 'coffee_shelf_jars_lofi_16', description: 'Coffee shelf with labeled jars and cups.' },
  { id: 'retro_shelf_media_lofi_16', description: 'Retro media shelf with tapes and mini boxes.' },
  { id: 'cozy_shelf_plants_lofi_16', description: 'Cozy shelf with plants and warm decor pieces.', a: COLORS.green },
  { id: 'night_shelf_glow_lofi_16', description: 'Shelf variant with tiny LED accent details.', c: COLORS.neon },
];

const plantVariants: Variant[] = [
  { id: 'succulent_pot_lofi_16', description: 'Small succulent pot for desk corner decoration.' },
  { id: 'ivy_pot_lofi_16', description: 'Ivy-style pot with denser top leaf mass.', a: COLORS.green },
  { id: 'fern_pot_lofi_16', description: 'Fern pot silhouette for natural cozy contrast.' },
  { id: 'flower_pot_lofi_16', description: 'Flowering pot with bright small accent petals.', c: COLORS.accent },
  { id: 'moss_pot_lofi_16', description: 'Low mossy pot with soft rounded foliage.', a: COLORS.green, b: COLORS.wood },
  { id: 'bamboo_pot_lofi_16', description: 'Mini bamboo-like pot for vertical shape variety.', a: COLORS.green, c: COLORS.paper },
];

const boardVariants: Variant[] = [
  { id: 'task_board_lofi_16', description: 'Task board with pinned notes and progress cues.' },
  { id: 'habit_tracker_board_lofi_16', description: 'Habit tracker board for daily streak marks.' },
  { id: 'study_quotes_board_lofi_16', description: 'Motivation quotes board with taped snippets.' },
  { id: 'deadline_board_lofi_16', description: 'Deadline board with highlighted priority notes.' },
  { id: 'project_board_lofi_16', description: 'Project planning board for multi-step workflows.' },
  { id: 'reading_list_board_lofi_16', description: 'Reading list board with stacked recommendation cards.' },
];

const utilityVariants: Variant[] = [
  { id: 'usb_dock_lofi_16', description: 'USB dock with compact port cluster and led.' },
  { id: 'charging_hub_lofi_16', description: 'Charging hub for phone, tablet, and earbuds.' },
  { id: 'router_box_lofi_16', description: 'Desk router box with simple status indicators.' },
  { id: 'smart_plug_panel_lofi_16', description: 'Smart plug control panel for desk appliances.' },
  { id: 'power_strip_lofi_16', description: 'Power strip accessory with tidy cable routing.' },
  { id: 'cable_hub_lofi_16', description: 'Cable hub splitter with balanced connector spacing.' },
];

const comfortVariants: Variant[] = [
  { id: 'floor_cushion_round_lofi_16', description: 'Round floor cushion for relaxed reading corners.' },
  { id: 'bean_pillow_lofi_16', description: 'Bean pillow with soft folds and plush body.' },
  { id: 'throw_blanket_fold_lofi_16', description: 'Folded throw blanket for cozy desk seating.' },
  { id: 'hoodie_folded_lofi_16', description: 'Folded hoodie stack for personal room vibe.' },
  { id: 'slippers_pair_lofi_16', description: 'Indoor slippers pair as a lived-in detail asset.' },
  { id: 'cozy_plush_pillow_lofi_16', description: 'Plush pillow accent with stitched seam highlights.' },
];

const templates: CompactTemplate[] = [
  ...cupVariants.map(makeCup),
  ...screenVariants.map(makeScreenDevice),
  ...paperVariants.map(makePaperTool),
  ...lightVariants.map(makeLight),
  ...audioVariants.map(makeAudio),
  ...shelfVariants.map(makeShelf),
  ...plantVariants.map(makePlantDecor),
  ...boardVariants.map(makeBoard),
  ...utilityVariants.map(makeUtility),
  ...comfortVariants.map(makeComfort),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'LOFI_BATCH3_TEMPLATES',
    schemes: 'LOFI_BATCH3_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
