/**
 * Library Cozy batch 5.
 * 20 original 16x16 templates to push Library Cozy to 100 sprites.
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
  wood: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  brass: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  paper: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  fabricBlue: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  fabricGreen: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  candle: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  stone: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  glass: { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
  accentRed: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
};

interface Variant {
  id: string;
  description: string;
  a?: Triad;
  b?: Triad;
  c?: Triad;
}

function makeShelf(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      F: { name: 'shelf_frame', role: 'body' },
      B: { name: 'book_spines', role: 'head' },
      L: { name: 'ladder', role: 'arm' },
      A: { name: 'bookmarks', role: 'eye' },
      P: { name: 'plinth', role: 'belt' },
    },
    {
      body: v.b ?? COLORS.wood,
      head: v.a ?? COLORS.paper,
      arm: COLORS.brass,
      eye: v.c ?? COLORS.accentRed,
      belt: COLORS.wood,
    },
    (g) => {
      paintRect(g, 'F', 2, 2, 13, 12);
      paintRect(g, 'B', 3, 3, 12, 11);
      paintH(g, 'P', 6, 3, 12);
      paintH(g, 'P', 9, 3, 12);
      paintV(g, 'L', 1, 4, 11);
      paintPoints(g, 'L', [[2, 5], [2, 7], [2, 9], [2, 11]]);
      paintH(g, 'P', 13, 3, 12);
      paintPoints(g, 'A', [[5, 4], [7, 5], [10, 7], [8, 10]]);
    },
  );
}

function makeDesk(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      D: { name: 'desk_body', role: 'body' },
      T: { name: 'table_top', role: 'head' },
      R: { name: 'drawers', role: 'arm' },
      H: { name: 'handles', role: 'eye' },
      P: { name: 'papers', role: 'accessory' },
      C: { name: 'chair', role: 'belt' },
    },
    {
      body: v.b ?? COLORS.wood,
      head: v.a ?? COLORS.fabricGreen,
      arm: COLORS.wood,
      eye: COLORS.brass,
      accessory: COLORS.paper,
      belt: v.c ?? COLORS.fabricBlue,
    },
    (g) => {
      paintH(g, 'T', 4, 1, 14);
      paintRect(g, 'D', 1, 5, 14, 11);
      paintRect(g, 'R', 2, 6, 5, 10);
      paintRect(g, 'R', 10, 6, 13, 10);
      paintPoints(g, 'H', [[4, 8], [11, 8]]);
      paintRect(g, 'P', 6, 6, 9, 8);
      paintRect(g, 'C', 6, 12, 9, 13);
    },
  );
}

function makeLamp(v: Variant): CompactTemplate {
  return makeTemplate(
    v.id,
    v.description,
    {
      F: { name: 'flame_core', role: 'eye' },
      G: { name: 'shade_glass', role: 'head' },
      M: { name: 'metal_body', role: 'body' },
      A: { name: 'armature', role: 'arm' },
      B: { name: 'base_plate', role: 'belt' },
    },
    {
      eye: v.a ?? COLORS.candle,
      head: v.c ?? COLORS.glass,
      body: v.b ?? COLORS.brass,
      arm: COLORS.brass,
      belt: COLORS.stone,
    },
    (g) => {
      paintPoints(g, 'F', [[8, 2], [7, 3], [8, 3], [9, 3]]);
      paintRect(g, 'G', 6, 4, 9, 7);
      paintRect(g, 'M', 5, 8, 10, 10);
      paintV(g, 'A', 8, 7, 11);
      paintH(g, 'B', 12, 5, 10);
      paintH(g, 'B', 13, 4, 11);
    },
  );
}

const shelfVariants: Variant[] = [
  { id: 'oak_archive_shelf_library_16', description: 'Tall oak archive shelf with mixed binders and side ladder.' },
  { id: 'alcove_book_shelf_library_16', description: 'Alcove book shelf packed with worn novels and journals.', a: COLORS.paper, b: COLORS.wood, c: COLORS.fabricBlue },
  { id: 'scholar_ladder_shelf_library_16', description: 'Scholar shelf with brass ladder and highlighted reference books.', a: COLORS.fabricGreen, c: COLORS.brass },
  { id: 'compact_tome_shelf_library_16', description: 'Compact tome shelf for cozy reading corners and hallways.', a: COLORS.paper, b: COLORS.wood, c: COLORS.accentRed },
  { id: 'grand_reference_shelf_library_16', description: 'Grand reference shelf with deeper rows of indexed volumes.', a: COLORS.fabricBlue, b: COLORS.wood, c: COLORS.brass },
];

const deskVariants: Variant[] = [
  { id: 'quill_writing_desk_library_16', description: 'Writing desk with quill papers and deep wooden drawers.' },
  { id: 'catalog_research_desk_library_16', description: 'Research desk tuned for catalog lookup and note taking.', a: COLORS.fabricBlue },
  { id: 'tea_reading_desk_library_16', description: 'Tea reading desk with cozy tabletop workspace and chair.', a: COLORS.fabricGreen, c: COLORS.fabricGreen },
  { id: 'map_annotation_desk_library_16', description: 'Map annotation desk for study map pins and sketches.', a: COLORS.paper, c: COLORS.fabricBlue },
  { id: 'journal_planning_desk_library_16', description: 'Journal planning desk built for long study sessions.', a: COLORS.fabricGreen, c: COLORS.fabricBlue },
];

const lampVariants: Variant[] = [
  { id: 'brass_sconce_library_cozy_16', description: 'Brass wall sconce variant with warm candle center.' },
  { id: 'stained_glass_lamp_library_16', description: 'Stained glass lamp with color-shifted glow over books.' },
  { id: 'twin_candle_holder_library_16', description: 'Twin candle holder used in archive aisles and desks.', a: COLORS.candle, b: COLORS.brass, c: COLORS.paper },
  { id: 'table_oil_lamp_cozy_16', description: 'Table oil lamp for intimate reading corners at night.', a: COLORS.candle, b: COLORS.brass, c: COLORS.glass },
  { id: 'amber_reading_lamp_library_16', description: 'Amber reading lamp with soft focused light cone.', a: COLORS.brass, b: COLORS.brass, c: COLORS.glass },
];

const templates: CompactTemplate[] = [
  ...shelfVariants.map(makeShelf),
  ...deskVariants.map(makeDesk),
  ...lampVariants.map(makeLamp),
  makeTemplate(
    'rolling_book_cart_library_16',
    'Rolling book cart loaded with returns and sorting labels.',
    {
      F: { name: 'frame', role: 'body' },
      B: { name: 'books', role: 'head' },
      W: { name: 'wheels', role: 'belt' },
      H: { name: 'push_handle', role: 'arm' },
      A: { name: 'labels', role: 'eye' },
    },
    {
      body: COLORS.stone,
      head: COLORS.paper,
      belt: COLORS.brass,
      arm: COLORS.stone,
      eye: COLORS.accentRed,
    },
    (g) => {
      paintRect(g, 'F', 2, 5, 13, 11);
      paintRect(g, 'B', 3, 6, 12, 9);
      paintH(g, 'F', 8, 3, 12);
      paintV(g, 'H', 13, 4, 8);
      paintPoints(g, 'A', [[4, 7], [7, 7], [10, 8]]);
      paintPoints(g, 'W', [[3, 12], [6, 12], [9, 12], [12, 12]]);
    },
  ),
  makeTemplate(
    'card_catalog_cabinet_library_16',
    'Tall card catalog cabinet with brass pulls and label tabs.',
    {
      F: { name: 'frame', role: 'body' },
      D: { name: 'drawers', role: 'head' },
      H: { name: 'handles', role: 'eye' },
      T: { name: 'tabs', role: 'accessory' },
      B: { name: 'base', role: 'belt' },
    },
    {
      body: COLORS.wood,
      head: COLORS.wood,
      eye: COLORS.brass,
      accessory: COLORS.paper,
      belt: COLORS.stone,
    },
    (g) => {
      paintRect(g, 'F', 3, 2, 12, 12);
      paintRect(g, 'D', 4, 3, 11, 11);
      paintH(g, 'B', 13, 3, 12);
      paintH(g, 'F', 5, 4, 11);
      paintH(g, 'F', 8, 4, 11);
      paintPoints(g, 'H', [[6, 4], [9, 4], [6, 7], [9, 7], [6, 10], [9, 10]]);
      paintPoints(g, 'T', [[5, 3], [8, 6], [10, 9]]);
    },
  ),
  makeTemplate(
    'globe_side_table_library_16',
    'Decorative globe on side table for old-world library vibes.',
    {
      G: { name: 'globe', role: 'head' },
      R: { name: 'meridian_ring', role: 'arm' },
      T: { name: 'table', role: 'body' },
      B: { name: 'base', role: 'belt' },
      A: { name: 'map_accent', role: 'eye' },
    },
    {
      head: COLORS.glass,
      arm: COLORS.brass,
      body: COLORS.wood,
      belt: COLORS.wood,
      eye: COLORS.fabricGreen,
    },
    (g) => {
      paintRect(g, 'G', 5, 2, 10, 7);
      paintRect(g, 'R', 4, 3, 11, 6);
      paintPoints(g, 'A', [[7, 4], [8, 5], [9, 4]]);
      paintH(g, 'T', 8, 3, 12);
      paintRect(g, 'T', 4, 9, 11, 10);
      paintV(g, 'B', 7, 10, 13);
      paintV(g, 'B', 8, 10, 13);
    },
  ),
  makeTemplate(
    'round_reading_rug_library_16',
    'Round reading rug with stitched border and woven center.',
    {
      O: { name: 'outer_ring', role: 'body' },
      I: { name: 'inner_weave', role: 'head' },
      P: { name: 'pattern_marks', role: 'eye' },
      S: { name: 'stitching', role: 'arm' },
      H: { name: 'floor_shadow', role: 'belt' },
    },
    {
      body: COLORS.fabricBlue,
      head: COLORS.fabricGreen,
      eye: COLORS.paper,
      arm: COLORS.accentRed,
      belt: COLORS.stone,
    },
    (g) => {
      paintRect(g, 'O', 3, 4, 12, 11);
      paintRect(g, 'I', 4, 5, 11, 10);
      paintPoints(g, 'P', [[6, 6], [9, 6], [7, 8], [10, 8], [8, 10]]);
      paintPoints(g, 'S', [[4, 4], [11, 4], [4, 11], [11, 11]]);
      paintH(g, 'H', 12, 4, 11);
    },
  ),
  makeTemplate(
    'fern_corner_pot_library_16',
    'Corner fern pot used to soften shelves and reading nooks.',
    {
      P: { name: 'pot', role: 'body' },
      L: { name: 'leaf_cluster', role: 'head' },
      H: { name: 'leaf_highlight', role: 'eye' },
      S: { name: 'soil', role: 'belt' },
      A: { name: 'pot_accent', role: 'arm' },
    },
    {
      body: COLORS.wood,
      head: COLORS.fabricGreen,
      eye: COLORS.paper,
      belt: COLORS.stone,
      arm: COLORS.brass,
    },
    (g) => {
      paintRect(g, 'P', 5, 8, 10, 12);
      paintH(g, 'S', 8, 5, 10);
      paintPoints(g, 'L', [[7, 3], [8, 3], [6, 4], [7, 4], [8, 4], [9, 4], [5, 5], [6, 5], [9, 5], [10, 5], [7, 6], [8, 6]]);
      paintPoints(g, 'H', [[8, 3], [9, 4], [8, 5]]);
      paintPoints(g, 'A', [[5, 10], [10, 10]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'library',
  exportNames: {
    templates: 'LIBRARY_BATCH5_TEMPLATES',
    schemes: 'LIBRARY_BATCH5_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
