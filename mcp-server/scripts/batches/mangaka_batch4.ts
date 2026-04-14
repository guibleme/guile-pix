/**
 * Mangaka Simulator batch 4 — 20 publishing & production templates.
 * Focus: manga volumes, magazines, proofs, awards, charts, and promotional items.
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
  paper: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  ink: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  steel: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  wood: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  gold: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  brass: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  red: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  blue: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  green: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  darkCloth: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  stone: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  abyss: { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
};

const templates: CompactTemplate[] = [
  // ── 1. manga_volume_mg_16 — Single tankobon volume, spine visible ──
  makeTemplate(
    'manga_volume_mg_16',
    'Single manga tankobon volume with visible spine and cover art.',
    {
      C: { name: 'cover', role: 'body' },
      S: { name: 'spine', role: 'head' },
      P: { name: 'page_block', role: 'arm' },
      T: { name: 'title_band', role: 'belt' },
      D: { name: 'cover_art', role: 'eye' },
    },
    {
      body: COLORS.blue,
      head: COLORS.abyss,
      arm: COLORS.paper,
      belt: COLORS.gold,
      eye: COLORS.red,
    },
    (g) => {
      // Spine on left (2px wide), cover on right, pages at bottom
      paintRect(g, 'S', 3, 2, 4, 13);
      paintRect(g, 'C', 5, 2, 12, 13);
      paintH(g, 'P', 13, 5, 12);
      paintH(g, 'P', 12, 12, 13);
      // Title band across cover
      paintH(g, 'T', 3, 5, 12);
      paintH(g, 'T', 4, 5, 12);
      // Cover art detail pixels
      paintPoints(g, 'D', [[7, 6], [8, 6], [9, 6], [7, 7], [8, 7], [9, 7], [10, 7], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [7, 9], [8, 9], [9, 9]]);
    },
  ),

  // ── 2. manga_stack_mg_16 — Stack of 3 manga volumes ──
  makeTemplate(
    'manga_stack_mg_16',
    'Stack of three manga tankobon volumes piled on a surface.',
    {
      A: { name: 'top_cover', role: 'body' },
      B: { name: 'mid_cover', role: 'head' },
      C: { name: 'bottom_cover', role: 'arm' },
      P: { name: 'page_edges', role: 'belt' },
      D: { name: 'spine_marks', role: 'eye' },
    },
    {
      body: COLORS.red,
      head: COLORS.blue,
      arm: COLORS.green,
      belt: COLORS.paper,
      eye: COLORS.ink,
    },
    (g) => {
      // Bottom book (widest, green)
      paintRect(g, 'C', 2, 10, 13, 13);
      paintH(g, 'P', 13, 12, 14);
      // Middle book (blue)
      paintRect(g, 'B', 3, 7, 12, 9);
      paintH(g, 'P', 9, 11, 13);
      // Top book (red)
      paintRect(g, 'A', 4, 4, 11, 6);
      paintH(g, 'P', 6, 10, 12);
      // Spine marks/text details
      paintPoints(g, 'D', [[5, 5], [7, 5], [9, 5], [4, 8], [6, 8], [8, 8], [3, 11], [6, 11], [9, 11]]);
    },
  ),

  // ── 3. magazine_weekly_mg_16 — Weekly manga magazine (like Shonen Jump) ──
  makeTemplate(
    'magazine_weekly_mg_16',
    'Thick weekly manga magazine with colorful masthead and dense pages.',
    {
      C: { name: 'cover_body', role: 'body' },
      M: { name: 'masthead', role: 'head' },
      P: { name: 'page_block', role: 'arm' },
      A: { name: 'cover_art', role: 'belt' },
      T: { name: 'title_text', role: 'eye' },
    },
    {
      body: COLORS.red,
      head: COLORS.gold,
      arm: COLORS.paper,
      belt: COLORS.blue,
      eye: COLORS.ink,
    },
    (g) => {
      // Thick magazine body
      paintRect(g, 'C', 3, 1, 12, 13);
      // Page block visible on right side
      paintV(g, 'P', 12, 2, 12);
      paintV(g, 'P', 13, 3, 11);
      // Masthead/logo at top
      paintRect(g, 'M', 4, 2, 11, 3);
      // Cover art in center
      paintRect(g, 'A', 5, 5, 10, 9);
      // Title text lines at bottom
      paintPoints(g, 'T', [[4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12]]);
    },
  ),

  // ── 4. magazine_monthly_mg_16 — Monthly manga magazine ──
  makeTemplate(
    'magazine_monthly_mg_16',
    'Slim monthly manga magazine with elegant cover layout.',
    {
      C: { name: 'cover', role: 'body' },
      S: { name: 'spine_edge', role: 'head' },
      I: { name: 'illustration', role: 'arm' },
      B: { name: 'banner', role: 'belt' },
      T: { name: 'text_lines', role: 'eye' },
    },
    {
      body: COLORS.abyss,
      head: COLORS.darkCloth,
      arm: COLORS.brass,
      belt: COLORS.red,
      eye: COLORS.paper,
    },
    (g) => {
      // Slim magazine
      paintRect(g, 'C', 4, 1, 12, 14);
      // Spine on left
      paintV(g, 'S', 4, 1, 14);
      // Center illustration
      paintRect(g, 'I', 6, 4, 11, 9);
      // Red banner across top
      paintRect(g, 'B', 5, 2, 12, 3);
      // Text lines at bottom
      paintPoints(g, 'T', [[5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [6, 12], [7, 12], [8, 12], [9, 12], [7, 13], [8, 13]]);
    },
  ),

  // ── 5. manga_cover_art_mg_16 — Cover art proof/print ──
  makeTemplate(
    'manga_cover_art_mg_16',
    'Cover art proof print pinned on a board for color review.',
    {
      P: { name: 'print_sheet', role: 'body' },
      I: { name: 'illustration', role: 'head' },
      B: { name: 'bleed_marks', role: 'arm' },
      N: { name: 'pin_tacks', role: 'belt' },
      C: { name: 'color_bars', role: 'eye' },
    },
    {
      body: COLORS.paper,
      head: COLORS.blue,
      arm: COLORS.red,
      belt: COLORS.steel,
      eye: COLORS.green,
    },
    (g) => {
      // Large print sheet
      paintRect(g, 'P', 2, 2, 13, 13);
      // Center illustration area
      paintRect(g, 'I', 4, 4, 11, 10);
      // Crop/bleed marks at corners
      paintPoints(g, 'B', [[2, 2], [3, 2], [2, 3], [13, 2], [12, 2], [13, 3], [2, 13], [3, 13], [2, 12], [13, 13], [12, 13], [13, 12]]);
      // Pin tacks at top
      paintPoints(g, 'N', [[4, 1], [11, 1]]);
      // Color reference bars at bottom
      paintPoints(g, 'C', [[4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12]]);
    },
  ),

  // ── 6. color_page_mg_16 — Color manga page (special spread) ──
  makeTemplate(
    'color_page_mg_16',
    'Special color manga page with vivid panels and painted art.',
    {
      P: { name: 'page_body', role: 'body' },
      A: { name: 'art_panels', role: 'head' },
      G: { name: 'gutter_lines', role: 'arm' },
      T: { name: 'title_bar', role: 'belt' },
      D: { name: 'detail_dots', role: 'eye' },
    },
    {
      body: COLORS.paper,
      head: COLORS.blue,
      arm: COLORS.ink,
      belt: COLORS.red,
      eye: COLORS.brass,
    },
    (g) => {
      // Page with transparent border
      paintRect(g, 'P', 3, 2, 12, 13);
      // Title bar at top
      paintRect(g, 'T', 4, 3, 11, 4);
      // Panel gutters (dividing lines)
      paintH(g, 'G', 7, 4, 11);
      paintV(g, 'G', 8, 5, 6);
      paintV(g, 'G', 7, 8, 12);
      // Art panels filled with color
      paintRect(g, 'A', 4, 5, 7, 6);
      paintRect(g, 'A', 9, 5, 11, 6);
      paintRect(g, 'A', 4, 8, 6, 12);
      paintRect(g, 'A', 8, 8, 11, 12);
      // Detail marks in panels
      paintPoints(g, 'D', [[5, 5], [10, 5], [5, 10], [9, 10]]);
    },
  ),

  // ── 7. proof_galley_mg_16 — Galley proof with red correction marks ──
  makeTemplate(
    'proof_galley_mg_16',
    'Galley proof sheet covered in red editorial correction marks.',
    {
      S: { name: 'sheet', role: 'body' },
      T: { name: 'text_lines', role: 'head' },
      R: { name: 'red_marks', role: 'arm' },
      M: { name: 'margin_notes', role: 'belt' },
      C: { name: 'clip_binding', role: 'eye' },
    },
    {
      body: COLORS.paper,
      head: COLORS.ink,
      arm: COLORS.red,
      belt: COLORS.blue,
      eye: COLORS.steel,
    },
    (g) => {
      // Sheet with border
      paintRect(g, 'S', 4, 2, 13, 13);
      // Text lines
      paintH(g, 'T', 4, 6, 12);
      paintH(g, 'T', 6, 6, 12);
      paintH(g, 'T', 8, 6, 12);
      paintH(g, 'T', 10, 6, 12);
      paintH(g, 'T', 12, 6, 12);
      // Red correction marks (circles, crosses, arrows)
      paintPoints(g, 'R', [[7, 3], [8, 3], [7, 5], [10, 5], [9, 7], [12, 7], [6, 9], [7, 9], [11, 9], [8, 11], [9, 11]]);
      // Margin notes on left
      paintPoints(g, 'M', [[5, 4], [5, 6], [5, 8], [5, 10], [5, 12]]);
      // Clip at top
      paintPoints(g, 'C', [[8, 1], [9, 1], [8, 2], [9, 2]]);
    },
  ),

  // ── 8. isbn_barcode_mg_16 — ISBN barcode sticker ──
  makeTemplate(
    'isbn_barcode_mg_16',
    'ISBN barcode sticker for manga volume back cover.',
    {
      S: { name: 'sticker_body', role: 'body' },
      B: { name: 'barcode_lines', role: 'head' },
      N: { name: 'number_row', role: 'arm' },
      F: { name: 'frame_border', role: 'belt' },
      D: { name: 'isbn_prefix', role: 'eye' },
    },
    {
      body: COLORS.paper,
      head: COLORS.ink,
      arm: COLORS.ink,
      belt: COLORS.steel,
      eye: COLORS.darkCloth,
    },
    (g) => {
      // Sticker outline
      paintRect(g, 'F', 2, 4, 13, 12);
      // White sticker body
      paintRect(g, 'S', 3, 5, 12, 11);
      // Barcode vertical lines (varied thickness)
      paintV(g, 'B', 4, 6, 9);
      paintV(g, 'B', 5, 6, 9);
      paintV(g, 'B', 7, 6, 9);
      paintV(g, 'B', 8, 6, 9);
      paintV(g, 'B', 9, 6, 9);
      paintV(g, 'B', 11, 6, 9);
      // Number row
      paintH(g, 'N', 10, 4, 11);
      // ISBN prefix text
      paintPoints(g, 'D', [[4, 5], [5, 5], [6, 5], [7, 5]]);
    },
  ),

  // ── 9. bookmark_manga_mg_16 — Decorative manga bookmark ──
  makeTemplate(
    'bookmark_manga_mg_16',
    'Decorative manga bookmark with character art and tassel.',
    {
      B: { name: 'bookmark_body', role: 'body' },
      A: { name: 'art_panel', role: 'head' },
      T: { name: 'tassel_cord', role: 'arm' },
      F: { name: 'foil_border', role: 'belt' },
      D: { name: 'character_detail', role: 'eye' },
    },
    {
      body: COLORS.paper,
      head: COLORS.blue,
      arm: COLORS.red,
      belt: COLORS.gold,
      eye: COLORS.ink,
    },
    (g) => {
      // Tall narrow bookmark body (wider for density)
      paintRect(g, 'B', 4, 1, 11, 12);
      // Foil border edges
      paintV(g, 'F', 4, 1, 12);
      paintV(g, 'F', 11, 1, 12);
      paintH(g, 'F', 1, 4, 11);
      paintH(g, 'F', 12, 4, 11);
      // Character art panel in center
      paintRect(g, 'A', 5, 3, 10, 8);
      // Character face detail
      paintPoints(g, 'D', [[7, 4], [8, 4], [6, 5], [9, 5], [7, 6], [8, 6], [6, 7], [7, 7], [8, 7], [9, 7]]);
      // Bottom point shape
      paintPoints(g, 'B', [[5, 13], [10, 13], [6, 13], [9, 13], [7, 14], [8, 14]]);
      // Tassel cord at top
      paintPoints(g, 'T', [[7, 0], [8, 0]]);
      // Tassel fringe below hole
      paintPoints(g, 'F', [[7, 2], [8, 2]]);
    },
  ),

  // ── 10. dust_jacket_mg_16 — Dust jacket wrapper ──
  makeTemplate(
    'dust_jacket_mg_16',
    'Removable dust jacket wrapper for a deluxe manga edition.',
    {
      J: { name: 'jacket_paper', role: 'body' },
      A: { name: 'art_print', role: 'head' },
      F: { name: 'fold_flaps', role: 'arm' },
      S: { name: 'spine_stripe', role: 'belt' },
      T: { name: 'title_foil', role: 'eye' },
    },
    {
      body: COLORS.paper,
      head: COLORS.abyss,
      arm: COLORS.darkCloth,
      belt: COLORS.gold,
      eye: COLORS.brass,
    },
    (g) => {
      // Opened-out dust jacket shape (wide)
      paintRect(g, 'J', 1, 3, 14, 12);
      // Left fold flap
      paintRect(g, 'F', 1, 3, 3, 12);
      // Right fold flap
      paintRect(g, 'F', 12, 3, 14, 12);
      // Main art area in center
      paintRect(g, 'A', 5, 4, 10, 11);
      // Spine stripe
      paintV(g, 'S', 4, 3, 12);
      paintV(g, 'S', 11, 3, 12);
      // Title foil on spine area
      paintPoints(g, 'T', [[4, 5], [4, 6], [4, 7], [4, 8], [11, 5], [11, 6], [11, 7], [11, 8]]);
    },
  ),

  // ── 11. obi_band_mg_16 — Obi promotional band strip ──
  makeTemplate(
    'obi_band_mg_16',
    'Obi promotional paper band wrapped around a manga volume.',
    {
      B: { name: 'book_body', role: 'body' },
      O: { name: 'obi_band', role: 'head' },
      T: { name: 'promo_text', role: 'arm' },
      S: { name: 'spine', role: 'belt' },
      N: { name: 'number_badge', role: 'eye' },
    },
    {
      body: COLORS.blue,
      head: COLORS.gold,
      arm: COLORS.red,
      belt: COLORS.abyss,
      eye: COLORS.paper,
    },
    (g) => {
      // Book body
      paintRect(g, 'B', 3, 2, 12, 13);
      // Spine
      paintV(g, 'S', 3, 2, 13);
      paintV(g, 'S', 4, 2, 13);
      // Obi band wrapping lower third
      paintRect(g, 'O', 3, 9, 12, 12);
      // Promo text on obi
      paintPoints(g, 'T', [[5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11]]);
      // Number badge (sales count circle)
      paintPoints(g, 'N', [[10, 4], [11, 4], [10, 5], [11, 5], [10, 3], [11, 3]]);
    },
  ),

  // ── 12. portfolio_case_mg_16 — Art portfolio carrying case ──
  makeTemplate(
    'portfolio_case_mg_16',
    'Art portfolio case for carrying original manga pages safely.',
    {
      C: { name: 'case_body', role: 'body' },
      H: { name: 'handle_strap', role: 'head' },
      Z: { name: 'zipper_track', role: 'arm' },
      L: { name: 'label_patch', role: 'belt' },
      B: { name: 'buckle_clasp', role: 'eye' },
    },
    {
      body: COLORS.darkCloth,
      head: COLORS.wood,
      arm: COLORS.steel,
      belt: COLORS.paper,
      eye: COLORS.brass,
    },
    (g) => {
      // Large case body
      paintRect(g, 'C', 2, 4, 13, 13);
      // Handle at top
      paintPoints(g, 'H', [[5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [5, 3], [10, 3]]);
      paintPoints(g, 'H', [[4, 3], [4, 4], [11, 3], [11, 4]]);
      // Zipper track across top edge
      paintH(g, 'Z', 4, 3, 12);
      // Label/name patch
      paintRect(g, 'L', 5, 7, 10, 9);
      // Buckle clasps
      paintPoints(g, 'B', [[3, 8], [3, 9], [12, 8], [12, 9]]);
    },
  ),

  // ── 13. shipping_box_mg_16 — Shipping box for manuscripts ──
  makeTemplate(
    'shipping_box_mg_16',
    'Cardboard shipping box for mailing manga manuscripts to editors.',
    {
      B: { name: 'box_body', role: 'body' },
      F: { name: 'flap_top', role: 'head' },
      T: { name: 'tape_seal', role: 'arm' },
      L: { name: 'address_label', role: 'belt' },
      S: { name: 'stamp_mark', role: 'eye' },
    },
    {
      body: COLORS.wood,
      head: COLORS.brass,
      arm: COLORS.paper,
      belt: COLORS.paper,
      eye: COLORS.red,
    },
    (g) => {
      // Box body
      paintRect(g, 'B', 2, 5, 13, 13);
      // Flap top (3D illusion)
      paintPoints(g, 'F', [[2, 5], [3, 4], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 4], [12, 5], [13, 5]]);
      paintPoints(g, 'F', [[3, 5], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 5]]);
      // Tape seal down center
      paintV(g, 'T', 7, 3, 13);
      paintV(g, 'T', 8, 3, 13);
      // Address label
      paintRect(g, 'L', 3, 8, 6, 11);
      // Stamp/mark
      paintPoints(g, 'S', [[10, 7], [11, 7], [10, 8], [11, 8]]);
    },
  ),

  // ── 14. rubber_stamp_mg_16 — Editor's approval rubber stamp ──
  makeTemplate(
    'rubber_stamp_mg_16',
    'Wooden rubber stamp used for editorial approval marks.',
    {
      W: { name: 'wood_handle', role: 'body' },
      R: { name: 'rubber_base', role: 'head' },
      G: { name: 'grip_band', role: 'arm' },
      I: { name: 'ink_residue', role: 'belt' },
      M: { name: 'stamp_mark', role: 'eye' },
    },
    {
      body: COLORS.wood,
      head: COLORS.darkCloth,
      arm: COLORS.brass,
      belt: COLORS.red,
      eye: COLORS.red,
    },
    (g) => {
      // Wood handle (top part, cylindrical look)
      paintRect(g, 'W', 4, 1, 11, 6);
      // Grip band
      paintH(g, 'G', 4, 4, 11);
      paintH(g, 'G', 5, 4, 11);
      // Rubber base (bottom, wider)
      paintRect(g, 'R', 3, 7, 12, 9);
      // Ink residue on stamp bottom surface
      paintH(g, 'I', 9, 4, 11);
      // Stamp impression mark nearby (shows what it prints)
      paintRect(g, 'M', 3, 11, 8, 13);
      paintPoints(g, 'M', [[9, 11], [9, 12]]);
    },
  ),

  // ── 15. award_trophy_mg_16 — Manga award trophy (like Tezuka Prize) ──
  makeTemplate(
    'award_trophy_mg_16',
    'Prestigious manga award trophy with star emblem and marble base.',
    {
      C: { name: 'cup_body', role: 'body' },
      S: { name: 'star_emblem', role: 'head' },
      H: { name: 'handles', role: 'arm' },
      B: { name: 'base_pedestal', role: 'belt' },
      P: { name: 'plaque_text', role: 'eye' },
    },
    {
      body: COLORS.gold,
      head: COLORS.paper,
      arm: COLORS.brass,
      belt: COLORS.stone,
      eye: COLORS.ink,
    },
    (g) => {
      // Cup body (wide goblet shape)
      paintPoints(g, 'C', [[5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1]]);
      paintRect(g, 'C', 4, 2, 11, 4);
      paintPoints(g, 'C', [[5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5]]);
      // Star emblem on front
      paintPoints(g, 'S', [[7, 2], [8, 2], [7, 3], [8, 3], [6, 3], [9, 3]]);
      // Handles on sides
      paintPoints(g, 'H', [[3, 2], [3, 3], [3, 4], [4, 5], [12, 2], [12, 3], [12, 4], [11, 5]]);
      // Stem
      paintPoints(g, 'C', [[7, 6], [8, 6], [7, 7], [8, 7]]);
      // Base/pedestal
      paintRect(g, 'B', 4, 8, 11, 9);
      paintRect(g, 'B', 3, 10, 12, 12);
      paintH(g, 'B', 13, 2, 13);
      // Plaque text
      paintPoints(g, 'P', [[5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11]]);
    },
  ),

  // ── 16. award_plaque_mg_16 — Achievement plaque/certificate ──
  makeTemplate(
    'award_plaque_mg_16',
    'Framed achievement plaque celebrating a manga milestone.',
    {
      F: { name: 'frame_border', role: 'body' },
      P: { name: 'plaque_face', role: 'head' },
      T: { name: 'text_engrave', role: 'arm' },
      S: { name: 'seal_emblem', role: 'belt' },
      N: { name: 'nameplate', role: 'eye' },
    },
    {
      body: COLORS.wood,
      head: COLORS.brass,
      arm: COLORS.ink,
      belt: COLORS.red,
      eye: COLORS.gold,
    },
    (g) => {
      // Outer wood frame
      paintRect(g, 'F', 2, 2, 13, 13);
      // Inner plaque face
      paintRect(g, 'P', 3, 3, 12, 12);
      // Frame edges (overwrite inner to keep border)
      paintRect(g, 'P', 4, 4, 11, 11);
      // Text engraving lines
      paintH(g, 'T', 5, 5, 10);
      paintH(g, 'T', 7, 5, 10);
      // Seal emblem in center
      paintPoints(g, 'S', [[7, 9], [8, 9], [7, 10], [8, 10]]);
      // Nameplate at bottom
      paintRect(g, 'N', 5, 12, 10, 12);
    },
  ),

  // ── 17. sales_chart_mg_16 — Sales ranking chart display ──
  makeTemplate(
    'sales_chart_mg_16',
    'Sales ranking bar chart showing manga volume performance.',
    {
      B: { name: 'board_bg', role: 'body' },
      R: { name: 'bar_columns', role: 'head' },
      A: { name: 'axis_lines', role: 'arm' },
      T: { name: 'top_bar', role: 'belt' },
      L: { name: 'labels', role: 'eye' },
    },
    {
      body: COLORS.paper,
      head: COLORS.blue,
      arm: COLORS.ink,
      belt: COLORS.gold,
      eye: COLORS.darkCloth,
    },
    (g) => {
      // Board background (leaving transparent border)
      paintRect(g, 'B', 2, 2, 13, 13);
      // Y axis
      paintV(g, 'A', 3, 3, 11);
      // X axis
      paintH(g, 'A', 11, 3, 12);
      // Bar columns (varying heights for chart look)
      paintRect(g, 'R', 4, 9, 5, 10);
      paintRect(g, 'R', 6, 6, 7, 10);
      paintRect(g, 'T', 8, 4, 9, 10);  // Tallest bar (gold/top)
      paintRect(g, 'R', 10, 7, 11, 10);
      // Labels
      paintPoints(g, 'L', [[4, 12], [6, 12], [8, 12], [10, 12]]);
    },
  ),

  // ── 18. popularity_poll_mg_16 — Character popularity poll results ──
  makeTemplate(
    'popularity_poll_mg_16',
    'Character popularity poll results board with rankings and bars.',
    {
      B: { name: 'board_body', role: 'body' },
      C: { name: 'crown_first', role: 'head' },
      R: { name: 'rank_bars', role: 'arm' },
      N: { name: 'number_badges', role: 'belt' },
      S: { name: 'star_icons', role: 'eye' },
    },
    {
      body: COLORS.paper,
      head: COLORS.gold,
      arm: COLORS.red,
      belt: COLORS.abyss,
      eye: COLORS.brass,
    },
    (g) => {
      // Board (with transparent border)
      paintRect(g, 'B', 2, 2, 13, 13);
      // Crown icon for #1
      paintPoints(g, 'C', [[4, 2], [5, 1], [6, 2], [7, 1], [8, 2], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3]]);
      // Rank bars (descending sizes)
      paintRect(g, 'R', 4, 5, 11, 6);   // 1st place bar (longest)
      paintRect(g, 'R', 4, 8, 9, 9);    // 2nd place
      paintRect(g, 'R', 4, 11, 7, 12);  // 3rd place
      // Number badges
      paintPoints(g, 'N', [[3, 5], [3, 8], [3, 11]]);
      // Stars for top rank
      paintPoints(g, 'S', [[10, 5], [11, 5], [12, 5], [8, 8], [9, 8]]);
    },
  ),

  // ── 19. chapter_flag_mg_16 — "New Chapter!" promotional flag ──
  makeTemplate(
    'chapter_flag_mg_16',
    'Promotional pennant flag announcing a new manga chapter release.',
    {
      F: { name: 'flag_body', role: 'body' },
      T: { name: 'text_banner', role: 'head' },
      P: { name: 'pole_stick', role: 'arm' },
      S: { name: 'star_burst', role: 'belt' },
      E: { name: 'edge_trim', role: 'eye' },
    },
    {
      body: COLORS.red,
      head: COLORS.gold,
      arm: COLORS.wood,
      belt: COLORS.paper,
      eye: COLORS.brass,
    },
    (g) => {
      // Flag pole on left
      paintV(g, 'P', 2, 1, 14);
      paintV(g, 'P', 3, 1, 14);
      // Flag body (pennant shape tapering right)
      paintRect(g, 'F', 4, 2, 13, 9);
      paintPoints(g, 'F', [[12, 10], [11, 10], [10, 10], [9, 10]]);
      // Trim edge at bottom of flag
      paintH(g, 'E', 9, 4, 13);
      paintPoints(g, 'E', [[12, 10], [11, 10]]);
      // Text banner
      paintRect(g, 'T', 5, 4, 12, 6);
      // Star burst accent
      paintPoints(g, 'S', [[6, 3], [11, 3], [5, 8], [10, 8]]);
    },
  ),

  // ── 20. serialization_card_mg_16 — Serialization announcement card ──
  makeTemplate(
    'serialization_card_mg_16',
    'Formal serialization announcement card with gold seal and letterpress.',
    {
      C: { name: 'card_body', role: 'body' },
      B: { name: 'border_line', role: 'head' },
      T: { name: 'text_lines', role: 'arm' },
      S: { name: 'seal_stamp', role: 'belt' },
      R: { name: 'ribbon_bow', role: 'eye' },
    },
    {
      body: COLORS.paper,
      head: COLORS.gold,
      arm: COLORS.ink,
      belt: COLORS.red,
      eye: COLORS.red,
    },
    (g) => {
      // Card body
      paintRect(g, 'C', 2, 2, 13, 13);
      // Gold border
      paintH(g, 'B', 2, 2, 13);
      paintH(g, 'B', 13, 2, 13);
      paintV(g, 'B', 2, 2, 13);
      paintV(g, 'B', 13, 2, 13);
      // Inner border line
      paintH(g, 'B', 3, 3, 12);
      paintH(g, 'B', 12, 3, 12);
      paintV(g, 'B', 3, 3, 12);
      paintV(g, 'B', 12, 3, 12);
      // Text lines in center
      paintH(g, 'T', 5, 5, 10);
      paintH(g, 'T', 7, 5, 10);
      paintH(g, 'T', 9, 6, 9);
      // Gold seal at bottom
      paintPoints(g, 'S', [[7, 10], [8, 10], [7, 11], [8, 11]]);
      // Ribbon bow at top center
      paintPoints(g, 'R', [[7, 1], [8, 1], [6, 2], [9, 2]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'library',
  exportNames: {
    templates: 'MANGAKA_BATCH4_TEMPLATES',
    schemes: 'MANGAKA_BATCH4_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
