/**
 * Music & Instruments batch 5.
 * 20 original 16x16 templates — remaining diverse instruments + props.
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
  brass:     { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  gold:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  metal:     { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  darkMetal: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  paper:     { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  red:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  blue:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  green:     { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  black:     { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  ivory:     { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  leather:   { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  teal:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  orange:    { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
};

const templates: CompactTemplate[] = [
  // ── 1. ERHU ──────────────────────────────────────────────────────
  makeTemplate(
    'erhu_16',
    'Chinese erhu two-string fiddle with python skin resonator, neck, and bow.',
    {
      R: { name: 'resonator_body', role: 'body' },
      N: { name: 'neck_pole', role: 'arm' },
      S: { name: 'strings', role: 'accessory' },
      P: { name: 'python_skin', role: 'head' },
      W: { name: 'bow_hair', role: 'belt' },
    },
    {
      body: C.wood,
      arm: C.darkWood,
      accessory: C.gold,
      head: C.leather,
      belt: C.ivory,
    },
    (g) => {
      // Tuning pegs (top)
      paintPoints(g, 'N', [[6, 1], [9, 1]]);
      // Neck (long vertical pole)
      paintV(g, 'N', 7, 2, 9);
      paintV(g, 'N', 8, 2, 9);
      // Strings
      paintV(g, 'S', 7, 2, 13);
      paintV(g, 'S', 8, 2, 13);
      // Resonator body (small hexagonal)
      paintRect(g, 'R', 5, 10, 10, 13);
      paintH(g, 'R', 9, 6, 9);
      paintH(g, 'R', 14, 6, 9);
      // Python skin (front face of resonator)
      paintRect(g, 'P', 6, 10, 9, 12);
      // Bow hair (right side, going through strings)
      paintV(g, 'W', 10, 4, 12);
      paintV(g, 'W', 11, 3, 13);
    },
  ),

  // ── 2. SHAMISEN ──────────────────────────────────────────────────
  makeTemplate(
    'shamisen_16',
    'Japanese shamisen with square body, long neck, bachi pick, and silk strings.',
    {
      B: { name: 'square_body', role: 'body' },
      N: { name: 'long_neck', role: 'arm' },
      H: { name: 'headstock', role: 'head' },
      S: { name: 'silk_strings', role: 'accessory' },
      P: { name: 'bachi_pick', role: 'belt' },
    },
    {
      body: C.paper,
      arm: C.darkWood,
      head: C.darkWood,
      accessory: C.gold,
      belt: C.wood,
    },
    (g) => {
      // Headstock
      paintRect(g, 'H', 6, 1, 9, 2);
      paintPoints(g, 'H', [[5, 1], [10, 1], [5, 2], [10, 2]]);
      // Long thin neck
      paintRect(g, 'N', 7, 3, 8, 8);
      // Strings
      paintV(g, 'S', 7, 2, 13);
      paintV(g, 'S', 8, 2, 13);
      // Square body (covered in cat/dog skin)
      paintRect(g, 'B', 4, 9, 11, 14);
      // Bridge on body
      paintH(g, 'N', 11, 5, 10);
      // Bachi pick (right, large fan shape)
      paintPoints(g, 'P', [[13, 8], [13, 9], [14, 9], [13, 10], [14, 10], [14, 11], [13, 11]]);
    },
  ),

  // ── 3. DIDGERIDOO ────────────────────────────────────────────────
  makeTemplate(
    'didgeridoo_16',
    'Aboriginal didgeridoo with painted designs, wide bell end, and mouthpiece.',
    {
      B: { name: 'tube_body', role: 'body' },
      P: { name: 'painted_design', role: 'head' },
      M: { name: 'beeswax_mouthpiece', role: 'arm' },
      E: { name: 'bell_end', role: 'accessory' },
      D: { name: 'dot_pattern', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.red,
      arm: C.orange,
      accessory: C.darkWood,
      belt: C.ivory,
    },
    (g) => {
      // Mouthpiece (top, narrow)
      paintRect(g, 'M', 7, 1, 8, 2);
      // Upper tube (narrow)
      paintRect(g, 'B', 7, 3, 8, 6);
      // Middle tube (slightly wider)
      paintRect(g, 'B', 6, 7, 9, 10);
      // Lower tube (wider)
      paintRect(g, 'B', 5, 11, 10, 12);
      // Bell end (widest)
      paintRect(g, 'E', 4, 13, 11, 14);
      // Painted design bands
      paintH(g, 'P', 4, 6, 9);
      paintH(g, 'P', 7, 5, 10);
      paintH(g, 'P', 10, 5, 10);
      // Dot patterns
      paintPoints(g, 'D', [[7, 5], [8, 5], [7, 8], [8, 8], [7, 11], [8, 11]]);
      paintPoints(g, 'D', [[6, 9], [9, 9]]);
    },
  ),

  // ── 4. HURDY GURDY ──────────────────────────────────────────────
  makeTemplate(
    'hurdy_gurdy_16',
    'Medieval hurdy-gurdy with crank wheel, keys, drone strings, and guitar body.',
    {
      B: { name: 'body_case', role: 'body' },
      W: { name: 'crank_wheel', role: 'head' },
      K: { name: 'key_box', role: 'arm' },
      S: { name: 'strings', role: 'accessory' },
      H: { name: 'crank_handle', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.brass,
      arm: C.darkWood,
      accessory: C.gold,
      belt: C.metal,
    },
    (g) => {
      // Guitar-shaped body (right half)
      paintRect(g, 'B', 7, 4, 13, 11);
      paintH(g, 'B', 3, 8, 12);
      paintH(g, 'B', 12, 8, 12);
      // Key box (left, narrow)
      paintRect(g, 'K', 2, 6, 7, 9);
      // Keys (protruding from box)
      paintPoints(g, 'K', [[2, 6], [3, 6], [4, 6], [5, 6]]);
      paintPoints(g, 'K', [[2, 9], [3, 9], [4, 9], [5, 9]]);
      // Strings (through key box and body)
      paintH(g, 'S', 7, 2, 13);
      paintH(g, 'S', 8, 2, 13);
      // Crank wheel (right end, circular)
      paintRect(g, 'W', 12, 6, 14, 9);
      paintPoints(g, 'W', [[11, 7], [11, 8]]);
      // Crank handle
      paintPoints(g, 'H', [[14, 5], [14, 10], [13, 5], [13, 10]]);
    },
  ),

  // ── 5. CELESTA ───────────────────────────────────────────────────
  makeTemplate(
    'celesta_16',
    'Celesta keyboard with small upright cabinet, metal plates, and pedal.',
    {
      B: { name: 'cabinet', role: 'body' },
      K: { name: 'keyboard_white', role: 'head' },
      D: { name: 'keyboard_black', role: 'eye' },
      P: { name: 'resonator_plates', role: 'arm' },
      F: { name: 'pedal_legs', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.ivory,
      eye: C.black,
      arm: C.brass,
      belt: C.wood,
    },
    (g) => {
      // Cabinet body (small upright)
      paintRect(g, 'B', 3, 2, 12, 10);
      // Resonator plate area (inside top)
      paintRect(g, 'P', 4, 3, 11, 5);
      // White keyboard
      paintRect(g, 'K', 4, 8, 11, 9);
      // Black keys
      paintPoints(g, 'D', [[5, 8], [6, 8], [8, 8], [9, 8], [11, 8]]);
      // Legs
      paintPoints(g, 'F', [[3, 11], [4, 12], [4, 13], [11, 11], [12, 12], [12, 13]]);
      // Pedal
      paintH(g, 'F', 14, 6, 9);
    },
  ),

  // ── 6. VIBRAPHONE ────────────────────────────────────────────────
  makeTemplate(
    'vibraphone_16',
    'Vibraphone with metal tone bars, resonator tubes, pedal, and mallets.',
    {
      B: { name: 'tone_bars', role: 'body' },
      R: { name: 'resonator_tubes', role: 'head' },
      F: { name: 'frame', role: 'arm' },
      M: { name: 'mallets', role: 'accessory' },
      P: { name: 'pedal_mechanism', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.gold,
      arm: C.darkMetal,
      accessory: C.red,
      belt: C.darkMetal,
    },
    (g) => {
      // Frame rails
      paintH(g, 'F', 5, 1, 14);
      paintH(g, 'F', 8, 1, 14);
      // Tone bars (graduated)
      paintV(g, 'B', 2, 6, 7);
      paintV(g, 'B', 4, 6, 7);
      paintV(g, 'B', 6, 6, 7);
      paintV(g, 'B', 8, 6, 7);
      paintV(g, 'B', 10, 6, 7);
      paintV(g, 'B', 12, 6, 7);
      // Resonator tubes (below bars)
      paintV(g, 'R', 2, 9, 12);
      paintV(g, 'R', 4, 9, 11);
      paintV(g, 'R', 6, 9, 11);
      paintV(g, 'R', 8, 9, 10);
      paintV(g, 'R', 10, 9, 10);
      paintV(g, 'R', 12, 9, 10);
      // Frame legs
      paintPoints(g, 'F', [[1, 13], [1, 14], [14, 13], [14, 14]]);
      // Mallets
      paintPoints(g, 'M', [[4, 3], [5, 4], [9, 3], [10, 4]]);
      // Pedal
      paintH(g, 'P', 14, 6, 9);
    },
  ),

  // ── 7. BASS DRUM MARCHING ────────────────────────────────────────
  makeTemplate(
    'bass_drum_marching_16',
    'Marching bass drum with harness hooks, mallet, and decorative shell.',
    {
      S: { name: 'drum_shell', role: 'body' },
      H: { name: 'drumheads', role: 'head' },
      R: { name: 'rim_hardware', role: 'accessory' },
      M: { name: 'mallet', role: 'arm' },
      K: { name: 'harness_hooks', role: 'belt' },
    },
    {
      body: C.red,
      head: C.paper,
      accessory: C.metal,
      arm: C.wood,
      belt: C.brass,
    },
    (g) => {
      // Drumheads (left and right faces)
      paintV(g, 'H', 2, 4, 11);
      paintV(g, 'H', 13, 4, 11);
      // Rims
      paintV(g, 'R', 3, 3, 12);
      paintV(g, 'R', 12, 3, 12);
      // Shell (cylindrical body)
      paintRect(g, 'S', 4, 3, 11, 12);
      paintH(g, 'S', 2, 5, 10);
      paintH(g, 'S', 13, 5, 10);
      // Decorative stripe
      paintH(g, 'S', 7, 4, 11);
      paintH(g, 'S', 8, 4, 11);
      // Harness hooks (top and bottom)
      paintPoints(g, 'K', [[5, 2], [10, 2], [5, 13], [10, 13]]);
      // Mallet
      paintV(g, 'M', 14, 4, 11);
      paintPoints(g, 'M', [[14, 3], [14, 4]]);
    },
  ),

  // ── 8. CASTANETS ─────────────────────────────────────────────────
  makeTemplate(
    'castanets_16',
    'Pair of castanets with finger loop, shells, and decorative inlay.',
    {
      L: { name: 'left_shell', role: 'body' },
      R: { name: 'right_shell', role: 'head' },
      S: { name: 'string_loop', role: 'accessory' },
      D: { name: 'decorative_inlay', role: 'arm' },
    },
    {
      body: C.darkWood,
      head: C.wood,
      accessory: C.red,
      arm: C.gold,
    },
    (g) => {
      // Left shell (top, slightly open)
      paintH(g, 'L', 3, 3, 8);
      paintRect(g, 'L', 2, 4, 9, 6);
      paintH(g, 'L', 7, 3, 8);
      // Left decorative inlay
      paintPoints(g, 'D', [[5, 5], [6, 5]]);
      // String loop (connecting both)
      paintPoints(g, 'S', [[10, 4], [10, 5], [10, 6], [10, 7]]);
      paintPoints(g, 'S', [[11, 5], [11, 6]]);
      // Right shell (bottom, slightly open)
      paintH(g, 'R', 8, 3, 8);
      paintRect(g, 'R', 2, 9, 9, 11);
      paintH(g, 'R', 12, 3, 8);
      // Right decorative inlay
      paintPoints(g, 'D', [[5, 10], [6, 10]]);
    },
  ),

  // ── 9. GUIRO SHAKER ─────────────────────────────────────────────
  makeTemplate(
    'guiro_shaker_16',
    'Latin percussion guiro with ridged surface, handle, and scraper stick.',
    {
      B: { name: 'gourd_body', role: 'body' },
      R: { name: 'ridges', role: 'head' },
      H: { name: 'handle_grip', role: 'arm' },
      S: { name: 'scraper_stick', role: 'accessory' },
    },
    {
      body: C.green,
      head: C.darkWood,
      arm: C.wood,
      accessory: C.wood,
    },
    (g) => {
      // Gourd body (elongated oval, horizontal)
      paintH(g, 'B', 6, 2, 12);
      paintRect(g, 'B', 1, 7, 13, 9);
      paintH(g, 'B', 10, 2, 12);
      paintH(g, 'B', 5, 3, 11);
      paintH(g, 'B', 11, 3, 11);
      // Ridges (on top surface)
      paintPoints(g, 'R', [[3, 7], [5, 7], [7, 7], [9, 7], [11, 7]]);
      paintPoints(g, 'R', [[4, 7], [6, 7], [8, 7], [10, 7]]);
      // Handle (left end opening)
      paintRect(g, 'H', 1, 7, 2, 9);
      // Scraper stick (above)
      paintH(g, 'S', 3, 5, 12);
      paintPoints(g, 'S', [[4, 2], [5, 3], [12, 2]]);
    },
  ),

  // ── 10. CLAVES PAIR ──────────────────────────────────────────────
  makeTemplate(
    'claves_pair_16',
    'Pair of wooden claves (rhythm sticks) with rounded ends.',
    {
      L: { name: 'striker_clave', role: 'body' },
      R: { name: 'resonator_clave', role: 'head' },
      E: { name: 'rounded_ends', role: 'accessory' },
      G: { name: 'wood_grain', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.darkWood,
      accessory: C.leather,
      arm: C.orange,
    },
    (g) => {
      // Striker clave (top, diagonal)
      paintPoints(g, 'L', [[3, 3], [4, 3], [4, 4], [5, 4], [5, 5], [6, 5], [6, 6], [7, 6], [7, 7], [8, 7], [8, 8], [9, 8], [9, 9], [10, 9], [10, 10], [11, 10]]);
      // Striker ends
      paintPoints(g, 'E', [[2, 3], [3, 2], [12, 10], [11, 11]]);
      // Striker grain
      paintPoints(g, 'G', [[5, 4], [7, 6], [9, 8]]);
      // Resonator clave (bottom, horizontal)
      paintH(g, 'R', 12, 2, 13);
      paintH(g, 'R', 13, 2, 13);
      // Resonator ends
      paintPoints(g, 'E', [[1, 12], [1, 13], [14, 12], [14, 13]]);
      // Resonator grain
      paintPoints(g, 'G', [[5, 12], [8, 12], [11, 12]]);
    },
  ),

  // ── 11. KAZOO ────────────────────────────────────────────────────
  makeTemplate(
    'kazoo_16',
    'Metal kazoo with turret, membrane cap, and tapered body.',
    {
      B: { name: 'kazoo_body', role: 'body' },
      T: { name: 'turret_cap', role: 'head' },
      M: { name: 'membrane', role: 'accessory' },
      E: { name: 'bell_end', role: 'arm' },
    },
    {
      body: C.blue,
      head: C.metal,
      accessory: C.paper,
      arm: C.blue,
    },
    (g) => {
      // Main body (submarine/cigar shape)
      paintH(g, 'B', 7, 2, 13);
      paintH(g, 'B', 8, 2, 13);
      paintH(g, 'B', 6, 4, 11);
      paintH(g, 'B', 9, 4, 11);
      // Mouthpiece (left, narrow)
      paintPoints(g, 'B', [[1, 7], [1, 8]]);
      // Bell end (right, slightly flared)
      paintPoints(g, 'E', [[14, 7], [14, 8], [14, 6], [14, 9]]);
      // Turret (top bump with membrane)
      paintRect(g, 'T', 6, 4, 9, 5);
      paintH(g, 'T', 3, 7, 8);
      // Membrane (inside turret)
      paintPoints(g, 'M', [[7, 4], [8, 4]]);
    },
  ),

  // ── 12. SLIDE WHISTLE ────────────────────────────────────────────
  makeTemplate(
    'slide_whistle_16',
    'Slide whistle with mouthpiece, sliding rod, and tube body.',
    {
      T: { name: 'tube_body', role: 'body' },
      S: { name: 'slide_rod', role: 'head' },
      M: { name: 'mouthpiece', role: 'arm' },
      H: { name: 'slide_handle', role: 'accessory' },
      W: { name: 'whistle_slot', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.brass,
      arm: C.darkMetal,
      accessory: C.red,
      belt: C.black,
    },
    (g) => {
      // Main tube body (horizontal)
      paintH(g, 'T', 7, 2, 12);
      paintH(g, 'T', 8, 2, 12);
      // Mouthpiece (left end, slightly wider)
      paintRect(g, 'M', 1, 6, 2, 9);
      // Whistle slot
      paintPoints(g, 'W', [[3, 6], [4, 6]]);
      // Slide rod (extends right, thinner)
      paintH(g, 'S', 7, 8, 14);
      paintH(g, 'S', 8, 8, 14);
      // Slide handle (right end, knob)
      paintRect(g, 'H', 13, 6, 14, 9);
    },
  ),

  // ── 13. ELECTRIC ORGAN ───────────────────────────────────────────
  makeTemplate(
    'electric_organ_16',
    'Vintage electric organ (Hammond-style) with dual manuals, drawbars, and legs.',
    {
      B: { name: 'organ_body', role: 'body' },
      K: { name: 'upper_manual', role: 'head' },
      L: { name: 'lower_manual', role: 'arm' },
      D: { name: 'drawbar_section', role: 'accessory' },
      G: { name: 'legs_pedals', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.ivory,
      arm: C.ivory,
      accessory: C.metal,
      belt: C.darkWood,
    },
    (g) => {
      // Organ body
      paintRect(g, 'B', 2, 2, 13, 11);
      // Music stand area (top)
      paintH(g, 'B', 1, 3, 12);
      // Drawbar section (top panel)
      paintRect(g, 'D', 3, 3, 12, 4);
      paintPoints(g, 'D', [[4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3]]);
      // Upper manual (keyboard)
      paintRect(g, 'K', 3, 6, 12, 7);
      // Lower manual (keyboard)
      paintRect(g, 'L', 3, 9, 12, 10);
      // Black keys on both
      paintPoints(g, 'B', [[4, 6], [5, 6], [7, 6], [8, 6], [10, 6], [11, 6]]);
      paintPoints(g, 'B', [[4, 9], [5, 9], [7, 9], [8, 9], [10, 9], [11, 9]]);
      // Legs
      paintV(g, 'G', 3, 12, 14);
      paintV(g, 'G', 12, 12, 14);
      // Pedals
      paintH(g, 'G', 14, 5, 10);
    },
  ),

  // ── 14. AMP STACK ────────────────────────────────────────────────
  makeTemplate(
    'amp_stack_16',
    'Guitar amplifier stack (head + 4x12 cabinet) with speaker grille.',
    {
      H: { name: 'amp_head', role: 'body' },
      C: { name: 'speaker_cabinet', role: 'head' },
      G: { name: 'speaker_grille', role: 'arm' },
      K: { name: 'knobs_controls', role: 'accessory' },
      L: { name: 'logo_plate', role: 'belt' },
    },
    {
      body: C.black,
      head: C.darkMetal,
      arm: C.paper,
      accessory: C.brass,
      belt: C.gold,
    },
    (g) => {
      // Amp head (top box)
      paintRect(g, 'H', 2, 1, 13, 4);
      // Knobs on head
      paintPoints(g, 'K', [[4, 2], [6, 2], [8, 2], [10, 2], [12, 2]]);
      // Logo plate
      paintH(g, 'L', 3, 5, 10);
      // Speaker cabinet (larger, below)
      paintRect(g, 'C', 1, 5, 14, 14);
      // Speaker grille (cloth)
      paintRect(g, 'G', 2, 6, 13, 13);
      // Speaker cones (4 circles in 2x2)
      paintRect(g, 'C', 3, 7, 6, 9);
      paintRect(g, 'C', 9, 7, 12, 9);
      paintRect(g, 'C', 3, 11, 6, 13);
      paintRect(g, 'C', 9, 11, 12, 13);
    },
  ),

  // ── 15. CABLE COIL AUDIO ─────────────────────────────────────────
  makeTemplate(
    'cable_coil_audio_16',
    'Coiled audio cable with 1/4 inch jack connectors at both ends.',
    {
      C: { name: 'cable_coil', role: 'body' },
      L: { name: 'left_connector', role: 'head' },
      R: { name: 'right_connector', role: 'arm' },
      S: { name: 'strain_relief', role: 'accessory' },
    },
    {
      body: C.black,
      head: C.metal,
      arm: C.metal,
      accessory: C.darkMetal,
    },
    (g) => {
      // Cable coil (circular loop)
      paintH(g, 'C', 3, 5, 10);
      paintH(g, 'C', 4, 4, 11);
      paintV(g, 'C', 3, 5, 10);
      paintV(g, 'C', 4, 4, 11);
      paintV(g, 'C', 11, 4, 11);
      paintV(g, 'C', 12, 5, 10);
      paintH(g, 'C', 11, 4, 11);
      paintH(g, 'C', 12, 5, 10);
      // Inner loop gap (make it look coiled)
      paintPoints(g, 'C', [[6, 6], [7, 6], [8, 6], [9, 6]]);
      paintPoints(g, 'C', [[6, 9], [7, 9], [8, 9], [9, 9]]);
      // Left connector (extends up-left)
      paintRect(g, 'L', 1, 1, 2, 4);
      paintPoints(g, 'L', [[3, 4]]);
      // Strain relief
      paintPoints(g, 'S', [[1, 4], [2, 4]]);
      // Right connector (extends down-right)
      paintRect(g, 'R', 13, 11, 14, 14);
      paintPoints(g, 'R', [[12, 11]]);
      // Strain relief
      paintPoints(g, 'S', [[13, 11], [14, 11]]);
    },
  ),

  // ── 16. GUITAR STRAP ────────────────────────────────────────────
  makeTemplate(
    'guitar_strap_16',
    'Leather guitar strap with adjustable buckle, strap button holes, and embossed pattern.',
    {
      S: { name: 'strap_leather', role: 'body' },
      B: { name: 'buckle', role: 'head' },
      H: { name: 'button_holes', role: 'arm' },
      P: { name: 'embossed_pattern', role: 'accessory' },
      E: { name: 'strap_ends', role: 'belt' },
    },
    {
      body: C.leather,
      head: C.brass,
      arm: C.black,
      accessory: C.gold,
      belt: C.darkWood,
    },
    (g) => {
      // Main strap body (coiled/folded display)
      paintRect(g, 'S', 2, 3, 13, 5);
      paintRect(g, 'S', 2, 7, 13, 9);
      paintRect(g, 'S', 2, 11, 13, 13);
      // Strap connections between layers
      paintV(g, 'S', 2, 5, 7);
      paintV(g, 'S', 13, 9, 11);
      // Buckle (center of middle row)
      paintRect(g, 'B', 6, 7, 9, 9);
      // Button holes (ends)
      paintPoints(g, 'H', [[3, 3], [4, 3]]);
      paintPoints(g, 'H', [[11, 13], [12, 13]]);
      // Strap ends (reinforced)
      paintRect(g, 'E', 2, 3, 5, 3);
      paintRect(g, 'E', 10, 13, 13, 13);
      // Embossed pattern
      paintPoints(g, 'P', [[5, 4], [7, 4], [9, 4], [11, 4]]);
      paintPoints(g, 'P', [[4, 8], [10, 8]]);
      paintPoints(g, 'P', [[5, 12], [7, 12], [9, 12]]);
    },
  ),

  // ── 17. GUITAR TUNER ─────────────────────────────────────────────
  makeTemplate(
    'guitar_tuner_16',
    'Clip-on guitar tuner with LCD display, clamp, and buttons.',
    {
      D: { name: 'lcd_display', role: 'body' },
      C: { name: 'clamp_jaw', role: 'head' },
      B: { name: 'button_panel', role: 'arm' },
      S: { name: 'screen_content', role: 'accessory' },
      H: { name: 'hinge_pivot', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.black,
      arm: C.metal,
      accessory: C.green,
      belt: C.metal,
    },
    (g) => {
      // LCD display housing (top, rotated screen)
      paintRect(g, 'D', 3, 1, 12, 7);
      // Screen content (green backlit)
      paintRect(g, 'S', 4, 2, 11, 6);
      // Tuner needle indicator
      paintPoints(g, 'S', [[7, 3], [8, 3], [7, 5], [8, 5]]);
      // Hinge/pivot
      paintRect(g, 'H', 6, 8, 9, 9);
      // Clamp jaw (bottom)
      paintRect(g, 'C', 4, 10, 11, 12);
      paintH(g, 'C', 13, 5, 10);
      // Jaw teeth (grip)
      paintPoints(g, 'C', [[5, 13], [7, 13], [9, 13]]);
      // Buttons
      paintPoints(g, 'B', [[5, 8], [10, 8]]);
    },
  ),

  // ── 18. CAPO CLIP ────────────────────────────────────────────────
  makeTemplate(
    'capo_clip_16',
    'Spring-loaded guitar capo clip with rubber pad, handle, and tension spring.',
    {
      B: { name: 'upper_bar', role: 'body' },
      L: { name: 'lower_jaw', role: 'head' },
      R: { name: 'rubber_pad', role: 'arm' },
      S: { name: 'tension_spring', role: 'accessory' },
      H: { name: 'handle_grip', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.darkMetal,
      arm: C.black,
      accessory: C.brass,
      belt: C.red,
    },
    (g) => {
      // Upper bar (clamping surface)
      paintRect(g, 'B', 2, 5, 12, 7);
      // Rubber pad (under upper bar)
      paintH(g, 'R', 8, 3, 11);
      // Lower jaw
      paintRect(g, 'L', 2, 9, 12, 11);
      // Gap between jaws (where neck goes)
      // Rubber pad on lower jaw
      paintH(g, 'R', 9, 3, 11);
      // Tension spring (right side, connecting jaws)
      paintPoints(g, 'S', [[13, 6], [13, 7], [13, 8], [13, 9], [13, 10]]);
      paintPoints(g, 'S', [[12, 7], [12, 9]]);
      // Handle grip (extends right from both jaws)
      paintRect(g, 'H', 12, 3, 14, 5);
      paintRect(g, 'H', 12, 11, 14, 13);
    },
  ),

  // ── 19. REED CASE ───────────────────────────────────────────────
  makeTemplate(
    'reed_case_16',
    'Clarinet/saxophone reed case with slots, lid, and humidity control.',
    {
      B: { name: 'case_body', role: 'body' },
      L: { name: 'case_lid', role: 'head' },
      R: { name: 'reed_slots', role: 'arm' },
      H: { name: 'humidity_pad', role: 'accessory' },
      C: { name: 'clasp', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.wood,
      arm: C.paper,
      accessory: C.teal,
      belt: C.brass,
    },
    (g) => {
      // Case lid (top half, open)
      paintRect(g, 'L', 3, 1, 12, 4);
      // Clasp
      paintPoints(g, 'C', [[7, 1], [8, 1]]);
      // Case body (bottom half)
      paintRect(g, 'B', 3, 5, 12, 14);
      // Reed slots (4 slots in case)
      paintRect(g, 'R', 4, 6, 5, 12);
      paintRect(g, 'R', 6, 6, 7, 12);
      paintRect(g, 'R', 8, 6, 9, 12);
      paintRect(g, 'R', 10, 6, 11, 12);
      // Humidity control pad (bottom of case)
      paintRect(g, 'H', 4, 13, 11, 13);
    },
  ),

  // ── 20. MUSIC TROPHY ─────────────────────────────────────────────
  makeTemplate(
    'music_trophy_16',
    'Music award trophy with treble clef figure, base plate, and engraved plaque.',
    {
      F: { name: 'clef_figure', role: 'body' },
      B: { name: 'trophy_base', role: 'head' },
      P: { name: 'name_plaque', role: 'arm' },
      S: { name: 'stem_pillar', role: 'accessory' },
      T: { name: 'star_accent', role: 'belt' },
    },
    {
      body: C.gold,
      head: C.darkWood,
      arm: C.brass,
      accessory: C.metal,
      belt: C.gold,
    },
    (g) => {
      // Star accent (top)
      paintPoints(g, 'T', [[7, 1], [8, 1], [6, 2], [9, 2]]);
      // Treble clef figure (stylized)
      paintPoints(g, 'F', [[8, 2], [7, 3], [6, 4], [7, 4]]);
      paintPoints(g, 'F', [[8, 4], [9, 5], [8, 5], [7, 5]]);
      paintPoints(g, 'F', [[6, 5], [6, 6], [7, 6], [8, 6]]);
      paintPoints(g, 'F', [[9, 6], [9, 7], [8, 7], [7, 7]]);
      paintPoints(g, 'F', [[6, 7], [7, 8]]);
      // Stem pillar
      paintV(g, 'S', 7, 9, 10);
      paintV(g, 'S', 8, 9, 10);
      // Name plaque
      paintRect(g, 'P', 4, 11, 11, 12);
      // Trophy base (tiered)
      paintRect(g, 'B', 3, 13, 12, 14);
      paintH(g, 'B', 12, 5, 10);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'MUSIC_BATCH5_TEMPLATES',
    schemes: 'MUSIC_BATCH5_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
