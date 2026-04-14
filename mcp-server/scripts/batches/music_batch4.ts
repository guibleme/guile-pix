/**
 * Music & Instruments batch 4.
 * 20 original 16x16 templates — more variety + accessories.
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
  // ── 1. LYRE ──────────────────────────────────────────────────────
  makeTemplate(
    'lyre_16',
    'Ancient Greek lyre with curved frame, crossbar, and gut strings.',
    {
      F: { name: 'frame_arms', role: 'body' },
      S: { name: 'strings', role: 'head' },
      B: { name: 'soundbox', role: 'arm' },
      C: { name: 'crossbar', role: 'accessory' },
      D: { name: 'decorative_scroll', role: 'belt' },
    },
    {
      body: C.gold,
      head: C.ivory,
      arm: C.wood,
      accessory: C.brass,
      belt: C.gold,
    },
    (g) => {
      // Left arm (curved upward)
      paintV(g, 'F', 3, 1, 10);
      paintV(g, 'F', 4, 1, 10);
      paintPoints(g, 'F', [[2, 1], [2, 2]]);
      // Right arm (curved upward)
      paintV(g, 'F', 11, 1, 10);
      paintV(g, 'F', 12, 1, 10);
      paintPoints(g, 'F', [[13, 1], [13, 2]]);
      // Decorative scroll tops
      paintPoints(g, 'D', [[1, 1], [14, 1]]);
      // Crossbar (top, connecting arms)
      paintH(g, 'C', 3, 4, 11);
      // Strings (hanging from crossbar to soundbox)
      paintV(g, 'S', 5, 4, 10);
      paintV(g, 'S', 7, 4, 10);
      paintV(g, 'S', 9, 4, 10);
      // Soundbox (bottom, curved)
      paintRect(g, 'B', 3, 11, 12, 13);
      paintH(g, 'B', 14, 4, 11);
      paintH(g, 'B', 10, 4, 11);
    },
  ),

  // ── 2. CONCERTINA ────────────────────────────────────────────────
  makeTemplate(
    'concertina_16',
    'Anglo concertina with hexagonal ends, bellows, and button arrays.',
    {
      L: { name: 'left_end', role: 'body' },
      R: { name: 'right_end', role: 'head' },
      B: { name: 'bellows', role: 'arm' },
      K: { name: 'buttons', role: 'accessory' },
      S: { name: 'strap', role: 'belt' },
    },
    {
      body: C.red,
      head: C.red,
      arm: C.leather,
      accessory: C.metal,
      belt: C.black,
    },
    (g) => {
      // Left hexagonal end
      paintRect(g, 'L', 1, 4, 4, 11);
      paintH(g, 'L', 3, 2, 3);
      paintH(g, 'L', 12, 2, 3);
      // Left buttons
      paintPoints(g, 'K', [[2, 5], [3, 6], [2, 7], [3, 8], [2, 9], [3, 10]]);
      // Bellows (center, zigzag pattern)
      paintRect(g, 'B', 5, 4, 10, 11);
      paintPoints(g, 'B', [[5, 5], [6, 6], [5, 7], [6, 8], [5, 9], [6, 10]]);
      paintPoints(g, 'B', [[10, 5], [9, 6], [10, 7], [9, 8], [10, 9], [9, 10]]);
      // Right hexagonal end
      paintRect(g, 'R', 11, 4, 14, 11);
      paintH(g, 'R', 3, 12, 13);
      paintH(g, 'R', 12, 12, 13);
      // Right buttons
      paintPoints(g, 'K', [[12, 5], [13, 6], [12, 7], [13, 8], [12, 9], [13, 10]]);
      // Straps
      paintPoints(g, 'S', [[1, 6], [1, 9], [14, 6], [14, 9]]);
    },
  ),

  // ── 3. ORGAN PIPES ───────────────────────────────────────────────
  makeTemplate(
    'organ_pipes_16',
    'Church organ pipe cluster with graduated metal pipes and wooden rack.',
    {
      P: { name: 'metal_pipes', role: 'body' },
      R: { name: 'pipe_rack', role: 'head' },
      M: { name: 'pipe_mouths', role: 'arm' },
      D: { name: 'decorative_facade', role: 'accessory' },
      B: { name: 'base_wind_chest', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.wood,
      arm: C.darkMetal,
      accessory: C.gold,
      belt: C.darkWood,
    },
    (g) => {
      // Graduated pipes (center tallest)
      paintV(g, 'P', 4, 5, 11);
      paintV(g, 'P', 5, 4, 11);
      paintV(g, 'P', 6, 2, 11);
      paintV(g, 'P', 7, 1, 11);
      paintV(g, 'P', 8, 1, 11);
      paintV(g, 'P', 9, 2, 11);
      paintV(g, 'P', 10, 4, 11);
      paintV(g, 'P', 11, 5, 11);
      // Pipe mouths (openings)
      paintPoints(g, 'M', [[4, 10], [5, 9], [6, 7], [7, 6], [8, 6], [9, 7], [10, 9], [11, 10]]);
      // Decorative facade (top accents)
      paintPoints(g, 'D', [[4, 5], [5, 4], [6, 2], [7, 1], [8, 1], [9, 2], [10, 4], [11, 5]]);
      // Rack/frame
      paintH(g, 'R', 12, 3, 12);
      paintV(g, 'R', 3, 6, 12);
      paintV(g, 'R', 12, 6, 12);
      // Base wind chest
      paintRect(g, 'B', 3, 13, 12, 14);
    },
  ),

  // ── 4. HARPSICHORD ───────────────────────────────────────────────
  makeTemplate(
    'harpsichord_16',
    'Baroque harpsichord from above with wing-shaped body, keyboard, and lid.',
    {
      B: { name: 'wing_body', role: 'body' },
      K: { name: 'keyboard', role: 'head' },
      D: { name: 'black_keys', role: 'eye' },
      L: { name: 'painted_lid', role: 'arm' },
      G: { name: 'legs', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.ivory,
      eye: C.black,
      arm: C.green,
      belt: C.wood,
    },
    (g) => {
      // Wing body (grand piano-like top view)
      paintRect(g, 'B', 2, 3, 13, 11);
      paintH(g, 'B', 2, 3, 12);
      paintH(g, 'B', 12, 3, 11);
      paintPoints(g, 'B', [[13, 4], [13, 5]]);
      // Painted lid section (decorative inner)
      paintRect(g, 'L', 3, 3, 12, 6);
      // Keyboard
      paintRect(g, 'K', 3, 9, 12, 10);
      // Black keys
      paintPoints(g, 'D', [[4, 9], [5, 9], [7, 9], [8, 9], [10, 9], [11, 9]]);
      // Legs
      paintPoints(g, 'G', [[3, 13], [4, 14], [11, 13], [12, 14]]);
    },
  ),

  // ── 5. DULCIMER ──────────────────────────────────────────────────
  makeTemplate(
    'dulcimer_16',
    'Hammered dulcimer with trapezoidal frame, string courses, and mallets.',
    {
      F: { name: 'trapez_frame', role: 'body' },
      S: { name: 'string_courses', role: 'head' },
      B: { name: 'bridge_bars', role: 'accessory' },
      M: { name: 'mallets', role: 'arm' },
      P: { name: 'tuning_pins', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.gold,
      accessory: C.darkWood,
      arm: C.leather,
      belt: C.metal,
    },
    (g) => {
      // Trapezoidal frame (wider at top)
      paintH(g, 'F', 3, 2, 13);
      paintH(g, 'F', 4, 2, 13);
      paintH(g, 'F', 12, 4, 11);
      paintH(g, 'F', 13, 4, 11);
      paintV(g, 'F', 2, 3, 8);
      paintV(g, 'F', 13, 3, 8);
      paintV(g, 'F', 4, 9, 12);
      paintV(g, 'F', 11, 9, 12);
      paintPoints(g, 'F', [[3, 9], [3, 10], [12, 9], [12, 10]]);
      // String courses (diagonal lines)
      paintPoints(g, 'S', [[4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]]);
      paintPoints(g, 'S', [[5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10]]);
      paintPoints(g, 'S', [[6, 5], [7, 6], [8, 7], [9, 8], [10, 9], [11, 10]]);
      // Bridge bars (crossing strings)
      paintV(g, 'B', 7, 5, 10);
      paintV(g, 'B', 8, 5, 10);
      // Tuning pins (along edges)
      paintPoints(g, 'P', [[3, 5], [3, 7], [12, 5], [12, 7]]);
      // Mallets (above)
      paintPoints(g, 'M', [[4, 1], [5, 2], [10, 1], [11, 2]]);
    },
  ),

  // ── 6. ELECTRIC VIOLIN ───────────────────────────────────────────
  makeTemplate(
    'electric_violin_16',
    'Solid-body electric violin with minimalist frame, pickup, and cable.',
    {
      F: { name: 'skeletal_frame', role: 'body' },
      N: { name: 'neck_scroll', role: 'arm' },
      P: { name: 'pickup_electronics', role: 'accessory' },
      S: { name: 'strings', role: 'head' },
      W: { name: 'cable_jack', role: 'belt' },
    },
    {
      body: C.darkMetal,
      arm: C.black,
      accessory: C.blue,
      head: C.metal,
      belt: C.black,
    },
    (g) => {
      // Scroll
      paintPoints(g, 'N', [[7, 1], [8, 1]]);
      // Neck
      paintRect(g, 'N', 7, 2, 8, 5);
      // Skeletal frame (cutaway solid body)
      paintV(g, 'F', 5, 6, 13);
      paintV(g, 'F', 10, 6, 13);
      paintH(g, 'F', 6, 5, 10);
      paintH(g, 'F', 13, 5, 10);
      paintH(g, 'F', 9, 6, 9);
      // Pickup (center of body)
      paintRect(g, 'P', 6, 7, 9, 8);
      // Strings
      paintV(g, 'S', 7, 2, 13);
      paintV(g, 'S', 8, 2, 13);
      // Cable jack
      paintPoints(g, 'W', [[10, 11], [11, 11], [12, 12]]);
      // Chin rest area
      paintPoints(g, 'F', [[5, 14], [6, 14], [9, 14], [10, 14]]);
    },
  ),

  // ── 7. DOUBLE BASS ───────────────────────────────────────────────
  makeTemplate(
    'double_bass_16',
    'Upright double bass with large body, scroll, endpin, and bow.',
    {
      B: { name: 'bass_body', role: 'body' },
      N: { name: 'neck_scroll', role: 'arm' },
      F: { name: 'f_holes', role: 'eye' },
      S: { name: 'strings', role: 'accessory' },
      E: { name: 'endpin', role: 'belt' },
    },
    {
      body: C.wood,
      arm: C.darkWood,
      eye: C.black,
      accessory: C.gold,
      belt: C.metal,
    },
    (g) => {
      // Scroll
      paintPoints(g, 'N', [[7, 1], [8, 1]]);
      // Neck
      paintRect(g, 'N', 7, 2, 8, 4);
      // Upper bout
      paintRect(g, 'B', 5, 5, 10, 6);
      // Waist (narrow)
      paintRect(g, 'B', 6, 7, 9, 7);
      // Lower bout (large)
      paintRect(g, 'B', 3, 8, 12, 12);
      paintH(g, 'B', 13, 4, 11);
      // F-holes
      paintPoints(g, 'F', [[5, 9], [10, 9], [5, 10], [10, 10], [4, 10], [11, 10]]);
      // Strings
      paintV(g, 'S', 7, 3, 12);
      paintV(g, 'S', 8, 3, 12);
      // Endpin
      paintV(g, 'E', 7, 14, 14);
      paintV(g, 'E', 8, 14, 14);
    },
  ),

  // ── 8. PICCOLO ───────────────────────────────────────────────────
  makeTemplate(
    'piccolo_16',
    'Small silver piccolo with keys, embouchure plate, and headjoint.',
    {
      B: { name: 'piccolo_tube', role: 'body' },
      K: { name: 'key_mechanism', role: 'head' },
      E: { name: 'embouchure_plate', role: 'accessory' },
      F: { name: 'foot_joint', role: 'arm' },
    },
    {
      body: C.metal,
      head: C.gold,
      accessory: C.teal,
      arm: C.metal,
    },
    (g) => {
      // Main tube (horizontal, shorter than flute)
      paintH(g, 'B', 7, 3, 12);
      paintH(g, 'B', 8, 3, 12);
      // Embouchure plate (left)
      paintRect(g, 'E', 3, 6, 5, 9);
      // Keys (along body)
      paintPoints(g, 'K', [[5, 6], [7, 6], [9, 6], [11, 6]]);
      paintPoints(g, 'K', [[6, 9], [8, 9], [10, 9]]);
      // Foot joint (right end)
      paintRect(g, 'F', 12, 7, 13, 8);
    },
  ),

  // ── 9. BASSOON ───────────────────────────────────────────────────
  makeTemplate(
    'bassoon_16',
    'Double-reed bassoon with boot joint, wing joint, bell, and bocal.',
    {
      B: { name: 'bassoon_body', role: 'body' },
      K: { name: 'key_mechanism', role: 'head' },
      O: { name: 'bocal_reed', role: 'arm' },
      E: { name: 'bell', role: 'accessory' },
      J: { name: 'boot_joint', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.metal,
      arm: C.darkWood,
      accessory: C.wood,
      belt: C.leather,
    },
    (g) => {
      // Wing joint (left tube)
      paintRect(g, 'B', 5, 3, 6, 12);
      // Boot joint (bottom, connects both tubes)
      paintRect(g, 'J', 5, 13, 10, 14);
      // Long joint (right tube, going up)
      paintRect(g, 'B', 9, 2, 10, 12);
      // Bell (top of right tube)
      paintRect(g, 'E', 8, 1, 11, 2);
      paintPoints(g, 'E', [[8, 3], [11, 3]]);
      // Bocal (curved pipe from wing to left)
      paintH(g, 'O', 3, 2, 5);
      paintPoints(g, 'O', [[2, 2], [2, 3], [3, 4]]);
      // Keys (on both tubes)
      paintPoints(g, 'K', [[4, 4], [4, 6], [4, 8], [4, 10]]);
      paintPoints(g, 'K', [[11, 5], [11, 7], [11, 9], [11, 11]]);
    },
  ),

  // ── 10. TIMPANI DRUM ─────────────────────────────────────────────
  makeTemplate(
    'timpani_drum_16',
    'Orchestral timpani/kettle drum with copper bowl, drumhead, and pedal.',
    {
      C: { name: 'copper_bowl', role: 'body' },
      H: { name: 'drumhead', role: 'head' },
      R: { name: 'rim_counter_hoop', role: 'accessory' },
      P: { name: 'pedal_mechanism', role: 'arm' },
      L: { name: 'legs_frame', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.paper,
      accessory: C.metal,
      arm: C.darkMetal,
      belt: C.darkMetal,
    },
    (g) => {
      // Counter hoop/rim (top edge)
      paintH(g, 'R', 3, 3, 12);
      // Drumhead
      paintH(g, 'H', 4, 3, 12);
      paintH(g, 'H', 5, 4, 11);
      // Copper bowl
      paintRect(g, 'C', 3, 6, 12, 10);
      paintH(g, 'C', 11, 4, 11);
      paintH(g, 'C', 12, 5, 10);
      // Legs/frame
      paintPoints(g, 'L', [[2, 11], [13, 11]]);
      paintPoints(g, 'L', [[1, 12], [14, 12]]);
      paintPoints(g, 'L', [[1, 13], [14, 13]]);
      paintH(g, 'L', 14, 1, 5);
      paintH(g, 'L', 14, 10, 14);
      // Pedal mechanism (center bottom)
      paintPoints(g, 'P', [[7, 13], [8, 13], [7, 14], [8, 14]]);
    },
  ),

  // ── 11. SNARE DRUM SOLO ──────────────────────────────────────────
  makeTemplate(
    'snare_drum_solo_16',
    'Standalone snare drum with drumhead, shell, snare wires, and stand.',
    {
      S: { name: 'drum_shell', role: 'body' },
      H: { name: 'drumhead', role: 'head' },
      W: { name: 'snare_wires', role: 'accessory' },
      R: { name: 'rim_lugs', role: 'arm' },
      T: { name: 'stand', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.paper,
      accessory: C.gold,
      arm: C.brass,
      belt: C.darkMetal,
    },
    (g) => {
      // Top rim
      paintH(g, 'R', 3, 3, 12);
      // Drumhead (top view, oval)
      paintRect(g, 'H', 3, 4, 12, 5);
      // Shell
      paintRect(g, 'S', 3, 6, 12, 9);
      // Lugs (side detail)
      paintPoints(g, 'R', [[2, 5], [2, 7], [2, 9], [13, 5], [13, 7], [13, 9]]);
      // Bottom rim
      paintH(g, 'R', 10, 3, 12);
      // Snare wires (visible underneath)
      paintH(g, 'W', 11, 5, 10);
      paintPoints(g, 'W', [[5, 10], [7, 10], [9, 10], [11, 10]]);
      // Stand
      paintV(g, 'T', 7, 12, 13);
      paintV(g, 'T', 8, 12, 13);
      paintH(g, 'T', 14, 4, 11);
      paintPoints(g, 'T', [[3, 14], [12, 14]]);
    },
  ),

  // ── 12. RIDE CYMBAL ──────────────────────────────────────────────
  makeTemplate(
    'ride_cymbal_16',
    'Ride cymbal on stand with bell, bow, edge, and tilter mechanism.',
    {
      C: { name: 'cymbal_disc', role: 'body' },
      B: { name: 'cymbal_bell', role: 'head' },
      S: { name: 'stand_pole', role: 'arm' },
      T: { name: 'tilter_clutch', role: 'accessory' },
      F: { name: 'tripod_feet', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.gold,
      arm: C.metal,
      accessory: C.darkMetal,
      belt: C.darkMetal,
    },
    (g) => {
      // Cymbal disc (tilted oval)
      paintH(g, 'C', 3, 3, 12);
      paintRect(g, 'C', 2, 4, 13, 5);
      paintH(g, 'C', 6, 3, 12);
      // Bell (center raised)
      paintRect(g, 'B', 6, 3, 9, 5);
      // Tilter/clutch
      paintPoints(g, 'T', [[7, 6], [8, 6], [7, 7], [8, 7]]);
      // Stand pole
      paintV(g, 'S', 7, 8, 12);
      paintV(g, 'S', 8, 8, 12);
      // Tripod feet
      paintH(g, 'F', 13, 4, 11);
      paintPoints(g, 'F', [[3, 14], [4, 13], [11, 13], [12, 14]]);
    },
  ),

  // ── 13. CRASH CYMBAL STAND ───────────────────────────────────────
  makeTemplate(
    'crash_cymbal_stand_16',
    'Crash cymbal on boom stand with angled arm and counterweight.',
    {
      C: { name: 'crash_cymbal', role: 'body' },
      B: { name: 'cymbal_bell', role: 'head' },
      A: { name: 'boom_arm', role: 'arm' },
      S: { name: 'stand_tube', role: 'accessory' },
      F: { name: 'base_feet', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.gold,
      arm: C.metal,
      accessory: C.darkMetal,
      belt: C.darkMetal,
    },
    (g) => {
      // Crash cymbal (smaller, higher)
      paintH(g, 'C', 2, 2, 8);
      paintH(g, 'C', 3, 1, 9);
      paintH(g, 'C', 4, 2, 8);
      // Bell
      paintPoints(g, 'B', [[5, 2], [5, 3], [4, 3]]);
      // Boom arm (diagonal from cymbal to stand)
      paintPoints(g, 'A', [[6, 5], [7, 6], [8, 7], [9, 8]]);
      // Counterweight (left end of boom)
      paintPoints(g, 'A', [[11, 7], [12, 6]]);
      // Stand tube (vertical)
      paintV(g, 'S', 9, 8, 12);
      paintV(g, 'S', 10, 8, 12);
      // Base feet
      paintH(g, 'F', 13, 6, 13);
      paintPoints(g, 'F', [[5, 14], [6, 13], [12, 13], [13, 14]]);
    },
  ),

  // ── 14. KEYTAR ───────────────────────────────────────────────────
  makeTemplate(
    'keytar_16',
    'Keytar (shoulder keyboard) with keys, neck handle, and pitch bend.',
    {
      B: { name: 'keytar_body', role: 'body' },
      K: { name: 'keys_white', role: 'head' },
      D: { name: 'keys_black', role: 'eye' },
      N: { name: 'neck_handle', role: 'arm' },
      P: { name: 'pitch_bend', role: 'accessory' },
    },
    {
      body: C.red,
      head: C.ivory,
      eye: C.black,
      arm: C.darkMetal,
      accessory: C.blue,
    },
    (g) => {
      // Neck handle (extends left/up)
      paintRect(g, 'N', 1, 4, 4, 6);
      paintH(g, 'N', 3, 2, 5);
      // Body (right, where keys are)
      paintRect(g, 'B', 4, 4, 13, 11);
      paintH(g, 'B', 3, 5, 12);
      paintH(g, 'B', 12, 5, 12);
      // White keys
      paintRect(g, 'K', 5, 7, 12, 10);
      // Black keys
      paintPoints(g, 'D', [[6, 7], [7, 7], [9, 7], [10, 7], [12, 7]]);
      // Pitch bend ribbon (on neck)
      paintRect(g, 'P', 2, 5, 3, 6);
      // Strap hook
      paintPoints(g, 'N', [[1, 3], [13, 3]]);
    },
  ),

  // ── 15. SAMPLER PAD ──────────────────────────────────────────────
  makeTemplate(
    'sampler_pad_16',
    'MPC-style sampler pad controller with 4x4 pads, screen, and encoders.',
    {
      B: { name: 'unit_body', role: 'body' },
      P: { name: 'rubber_pads', role: 'head' },
      S: { name: 'lcd_screen', role: 'arm' },
      E: { name: 'rotary_encoders', role: 'accessory' },
      L: { name: 'led_strip', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.red,
      arm: C.blue,
      accessory: C.ivory,
      belt: C.green,
    },
    (g) => {
      // Unit body
      paintRect(g, 'B', 1, 2, 14, 13);
      paintH(g, 'B', 1, 2, 13);
      // LCD screen (top)
      paintRect(g, 'S', 2, 3, 7, 5);
      // Rotary encoders
      paintPoints(g, 'E', [[9, 3], [11, 3], [13, 3]]);
      // LED strip
      paintH(g, 'L', 6, 2, 13);
      // 4x4 pad grid (bottom section)
      paintRect(g, 'P', 2, 8, 3, 9);
      paintRect(g, 'P', 5, 8, 6, 9);
      paintRect(g, 'P', 8, 8, 9, 9);
      paintRect(g, 'P', 11, 8, 12, 9);
      paintRect(g, 'P', 2, 11, 3, 12);
      paintRect(g, 'P', 5, 11, 6, 12);
      paintRect(g, 'P', 8, 11, 9, 12);
      paintRect(g, 'P', 11, 11, 12, 12);
    },
  ),

  // ── 16. LOOP PEDAL ───────────────────────────────────────────────
  makeTemplate(
    'loop_pedal_16',
    'Guitar loop pedal with stomp buttons, LED ring, and display.',
    {
      B: { name: 'pedal_body', role: 'body' },
      S: { name: 'stomp_buttons', role: 'head' },
      D: { name: 'led_display', role: 'arm' },
      R: { name: 'led_ring', role: 'accessory' },
      J: { name: 'jacks', role: 'belt' },
    },
    {
      body: C.black,
      head: C.metal,
      arm: C.green,
      accessory: C.red,
      belt: C.darkMetal,
    },
    (g) => {
      // Pedal body
      paintRect(g, 'B', 3, 2, 12, 13);
      paintH(g, 'B', 1, 4, 11);
      // LED display (top center)
      paintRect(g, 'D', 5, 3, 10, 5);
      // LED ring (circular indicator)
      paintPoints(g, 'R', [[6, 7], [9, 7], [5, 8], [10, 8], [6, 9], [9, 9]]);
      paintPoints(g, 'R', [[7, 7], [8, 7], [7, 9], [8, 9]]);
      // Stomp buttons (two large ones)
      paintRect(g, 'S', 4, 10, 6, 12);
      paintRect(g, 'S', 9, 10, 11, 12);
      // I/O jacks (top edge)
      paintPoints(g, 'J', [[4, 2], [5, 2], [10, 2], [11, 2]]);
    },
  ),

  // ── 17. GUITAR CASE ──────────────────────────────────────────────
  makeTemplate(
    'guitar_case_16',
    'Hard guitar case with latches, handle, and plush interior.',
    {
      B: { name: 'case_shell', role: 'body' },
      L: { name: 'latches', role: 'head' },
      H: { name: 'carry_handle', role: 'arm' },
      I: { name: 'interior_plush', role: 'accessory' },
      S: { name: 'stitching', role: 'belt' },
    },
    {
      body: C.black,
      head: C.brass,
      arm: C.leather,
      accessory: C.red,
      belt: C.darkMetal,
    },
    (g) => {
      // Case shell (guitar-shaped outline)
      paintRect(g, 'B', 3, 1, 12, 14);
      paintH(g, 'B', 2, 5, 10);
      // Interior (slightly inside shape)
      paintRect(g, 'I', 4, 3, 11, 12);
      paintH(g, 'I', 2, 5, 10);
      // Case edge (covers interior at edges)
      paintV(g, 'B', 3, 2, 13);
      paintV(g, 'B', 12, 2, 13);
      paintH(g, 'B', 1, 4, 11);
      paintH(g, 'B', 14, 4, 11);
      // Handle
      paintH(g, 'H', 1, 6, 9);
      paintPoints(g, 'H', [[5, 0], [10, 0]]);
      // Latches
      paintPoints(g, 'L', [[3, 5], [3, 10], [12, 5], [12, 10]]);
      // Stitching (center line)
      paintV(g, 'S', 7, 2, 13);
    },
  ),

  // ── 18. TRUMPET MUTE ────────────────────────────────────────────
  makeTemplate(
    'trumpet_mute_16',
    'Straight trumpet mute (harmon) with cone shape, cork ring, and stem.',
    {
      C: { name: 'cone_body', role: 'body' },
      K: { name: 'cork_ring', role: 'head' },
      S: { name: 'stem_tube', role: 'arm' },
      T: { name: 'tip', role: 'accessory' },
    },
    {
      body: C.metal,
      head: C.leather,
      arm: C.brass,
      accessory: C.metal,
    },
    (g) => {
      // Cone body (wider at top, narrower at bottom)
      paintRect(g, 'C', 4, 3, 11, 4);
      paintRect(g, 'C', 5, 5, 10, 7);
      paintRect(g, 'C', 6, 8, 9, 10);
      paintH(g, 'C', 2, 5, 10);
      // Cork ring (at widest point, for insertion)
      paintH(g, 'K', 3, 3, 12);
      paintPoints(g, 'K', [[3, 4], [12, 4]]);
      // Stem tube (center, extends down)
      paintV(g, 'S', 7, 11, 13);
      paintV(g, 'S', 8, 11, 13);
      // Tip
      paintPoints(g, 'T', [[7, 14], [8, 14]]);
    },
  ),

  // ── 19. ROSIN BLOCK ──────────────────────────────────────────────
  makeTemplate(
    'rosin_block_16',
    'Violin rosin cake in wooden holder with cloth wrap and label.',
    {
      R: { name: 'rosin_cake', role: 'body' },
      W: { name: 'wooden_holder', role: 'head' },
      C: { name: 'cloth_wrap', role: 'arm' },
      L: { name: 'label', role: 'accessory' },
    },
    {
      body: C.orange,
      head: C.wood,
      arm: C.paper,
      accessory: C.gold,
    },
    (g) => {
      // Wooden holder (outer frame)
      paintRect(g, 'W', 3, 4, 12, 11);
      // Cloth wrap (partially open)
      paintRect(g, 'C', 4, 5, 11, 10);
      paintH(g, 'C', 3, 5, 10);
      // Rosin cake (exposed amber surface)
      paintRect(g, 'R', 5, 6, 10, 9);
      // Label (on front)
      paintRect(g, 'L', 6, 7, 9, 8);
      // Holder edges
      paintH(g, 'W', 3, 4, 11);
      paintH(g, 'W', 12, 4, 11);
      paintV(g, 'W', 3, 4, 11);
      paintV(g, 'W', 12, 4, 11);
    },
  ),

  // ── 20. PITCH PIPE ──────────────────────────────────────────────
  makeTemplate(
    'pitch_pipe_16',
    'Circular pitch pipe with rotating dial, note labels, and blow hole.',
    {
      B: { name: 'pipe_body', role: 'body' },
      D: { name: 'dial_ring', role: 'head' },
      H: { name: 'blow_hole', role: 'arm' },
      L: { name: 'note_labels', role: 'accessory' },
      C: { name: 'center_hub', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.brass,
      arm: C.black,
      accessory: C.ivory,
      belt: C.darkMetal,
    },
    (g) => {
      // Outer ring
      paintH(g, 'D', 2, 5, 10);
      paintH(g, 'D', 13, 5, 10);
      paintV(g, 'D', 2, 5, 10);
      paintV(g, 'D', 13, 5, 10);
      paintPoints(g, 'D', [[3, 3], [3, 4], [4, 3], [12, 3], [11, 3], [12, 4]]);
      paintPoints(g, 'D', [[3, 12], [3, 11], [4, 12], [12, 12], [11, 12], [12, 11]]);
      // Pipe body (inner fill)
      paintRect(g, 'B', 3, 5, 12, 10);
      paintRect(g, 'B', 4, 4, 11, 11);
      paintRect(g, 'B', 5, 3, 10, 12);
      // Note labels (around the edge)
      paintPoints(g, 'L', [[7, 3], [4, 5], [11, 5], [4, 10], [11, 10], [7, 12]]);
      // Center hub
      paintRect(g, 'C', 7, 7, 8, 8);
      // Blow hole (top extension)
      paintRect(g, 'H', 7, 1, 8, 2);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'MUSIC_BATCH4_TEMPLATES',
    schemes: 'MUSIC_BATCH4_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
