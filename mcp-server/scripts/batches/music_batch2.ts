/**
 * Music & Instruments batch 2.
 * 20 original 16x16 templates — classical/orchestral + brass/woodwind + studio gear.
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
  // ── 1. CELLO ─────────────────────────────────────────────────────
  makeTemplate(
    'cello_16',
    'Concert cello with wide body, f-holes, endpin, and bow.',
    {
      B: { name: 'cello_body', role: 'body' },
      N: { name: 'neck_scroll', role: 'arm' },
      F: { name: 'f_holes', role: 'eye' },
      S: { name: 'strings', role: 'accessory' },
      W: { name: 'bow', role: 'head' },
    },
    {
      body: C.wood,
      arm: C.darkWood,
      eye: C.black,
      accessory: C.gold,
      head: C.leather,
    },
    (g) => {
      // Scroll
      paintPoints(g, 'N', [[7, 1], [8, 1]]);
      // Neck
      paintRect(g, 'N', 7, 2, 8, 4);
      // Upper bout
      paintRect(g, 'B', 5, 5, 10, 6);
      // Waist
      paintRect(g, 'B', 6, 7, 9, 8);
      // Lower bout (wider than violin)
      paintRect(g, 'B', 3, 9, 12, 12);
      paintH(g, 'B', 13, 4, 11);
      // F-holes
      paintPoints(g, 'F', [[5, 10], [10, 10], [5, 11], [10, 11]]);
      // Strings
      paintV(g, 'S', 7, 3, 12);
      paintV(g, 'S', 8, 3, 12);
      // Endpin
      paintPoints(g, 'N', [[7, 14], [8, 14]]);
      // Bow (right side)
      paintV(g, 'W', 14, 2, 14);
    },
  ),

  // ── 2. BANJO ─────────────────────────────────────────────────────
  makeTemplate(
    'banjo_16',
    'Five-string banjo with round drum body, long neck, and tuning pegs.',
    {
      D: { name: 'drum_body', role: 'body' },
      N: { name: 'banjo_neck', role: 'arm' },
      H: { name: 'headstock', role: 'head' },
      S: { name: 'strings', role: 'accessory' },
      R: { name: 'resonator_ring', role: 'belt' },
    },
    {
      body: C.paper,
      arm: C.wood,
      head: C.darkWood,
      accessory: C.gold,
      belt: C.metal,
    },
    (g) => {
      // Headstock
      paintRect(g, 'H', 6, 1, 8, 2);
      paintPoints(g, 'H', [[5, 1], [9, 2]]);
      // Neck
      paintRect(g, 'N', 7, 3, 8, 7);
      // Strings on neck
      paintV(g, 'S', 7, 3, 12);
      paintV(g, 'S', 8, 3, 12);
      // Resonator ring (circular outline)
      paintH(g, 'R', 7, 5, 10);
      paintH(g, 'R', 13, 5, 10);
      paintV(g, 'R', 4, 8, 12);
      paintV(g, 'R', 11, 8, 12);
      paintPoints(g, 'R', [[5, 7], [10, 7], [5, 13], [10, 13]]);
      // Drum body (inner)
      paintRect(g, 'D', 5, 8, 10, 12);
    },
  ),

  // ── 3. UKULELE ───────────────────────────────────────────────────
  makeTemplate(
    'ukulele_16',
    'Small Hawaiian ukulele with figure-8 body, rosette, and nylon strings.',
    {
      B: { name: 'uke_body', role: 'body' },
      N: { name: 'neck', role: 'arm' },
      H: { name: 'headstock', role: 'head' },
      R: { name: 'rosette', role: 'accessory' },
      S: { name: 'strings', role: 'belt' },
    },
    {
      body: C.orange,
      arm: C.wood,
      head: C.darkWood,
      accessory: C.green,
      belt: C.ivory,
    },
    (g) => {
      // Headstock
      paintRect(g, 'H', 6, 1, 9, 2);
      // Neck
      paintRect(g, 'N', 7, 3, 8, 6);
      // Strings on neck
      paintV(g, 'S', 7, 3, 12);
      paintV(g, 'S', 8, 3, 12);
      // Upper bout
      paintRect(g, 'B', 5, 7, 10, 8);
      // Lower bout
      paintRect(g, 'B', 4, 9, 11, 13);
      paintH(g, 'B', 14, 5, 10);
      // Rosette
      paintRect(g, 'R', 7, 10, 8, 11);
    },
  ),

  // ── 4. MANDOLIN ──────────────────────────────────────────────────
  makeTemplate(
    'mandolin_16',
    'Pear-shaped mandolin with paired strings, f-holes, and pickguard.',
    {
      B: { name: 'mandolin_body', role: 'body' },
      N: { name: 'neck', role: 'arm' },
      H: { name: 'headstock', role: 'head' },
      F: { name: 'f_holes', role: 'eye' },
      P: { name: 'pickguard', role: 'accessory' },
    },
    {
      body: C.wood,
      arm: C.darkWood,
      head: C.darkWood,
      eye: C.black,
      accessory: C.red,
    },
    (g) => {
      // Headstock (angled)
      paintRect(g, 'H', 5, 1, 7, 2);
      paintPoints(g, 'H', [[8, 2]]);
      // Neck
      paintRect(g, 'N', 7, 3, 8, 6);
      // Body (teardrop shape)
      paintRect(g, 'B', 5, 7, 10, 8);
      paintRect(g, 'B', 4, 9, 11, 12);
      paintH(g, 'B', 13, 5, 10);
      // F-holes
      paintPoints(g, 'F', [[5, 9], [10, 9], [5, 10], [10, 10]]);
      // Pickguard (under soundhole area)
      paintPoints(g, 'P', [[6, 11], [7, 11], [8, 11], [6, 12], [7, 12]]);
    },
  ),

  // ── 5. HARMONICA ─────────────────────────────────────────────────
  makeTemplate(
    'harmonica_16',
    'Blues harmonica with reed plates, comb, and cover plates.',
    {
      C: { name: 'cover_plates', role: 'body' },
      R: { name: 'reed_holes', role: 'head' },
      M: { name: 'comb_body', role: 'arm' },
      D: { name: 'edge_detail', role: 'accessory' },
    },
    {
      body: C.metal,
      head: C.black,
      arm: C.wood,
      accessory: C.brass,
    },
    (g) => {
      // Top cover plate
      paintRect(g, 'C', 2, 5, 13, 6);
      // Comb with reed holes
      paintRect(g, 'M', 2, 7, 13, 8);
      paintH(g, 'R', 7, 3, 12);
      // Bottom cover plate
      paintRect(g, 'C', 2, 9, 13, 10);
      // Edge details
      paintV(g, 'D', 2, 5, 10);
      paintV(g, 'D', 13, 5, 10);
      // Decorative band
      paintH(g, 'D', 6, 3, 12);
      paintH(g, 'D', 10, 3, 12);
    },
  ),

  // ── 6. TROMBONE ──────────────────────────────────────────────────
  makeTemplate(
    'trombone_16',
    'Slide trombone with bell, slide mechanism, and mouthpiece.',
    {
      B: { name: 'brass_body', role: 'body' },
      S: { name: 'slide_tube', role: 'arm' },
      E: { name: 'bell_flare', role: 'head' },
      M: { name: 'mouthpiece', role: 'accessory' },
      L: { name: 'slide_lock', role: 'belt' },
    },
    {
      body: C.brass,
      arm: C.metal,
      head: C.gold,
      accessory: C.darkMetal,
      belt: C.metal,
    },
    (g) => {
      // Mouthpiece (left)
      paintH(g, 'M', 6, 1, 2);
      // Upper tube
      paintH(g, 'B', 5, 2, 12);
      paintH(g, 'B', 6, 2, 12);
      // Slide (lower tube, extends further)
      paintH(g, 'S', 9, 1, 14);
      paintH(g, 'S', 10, 1, 14);
      // Slide connector (right curve)
      paintV(g, 'B', 12, 6, 9);
      paintV(g, 'B', 13, 6, 9);
      // Slide lock
      paintPoints(g, 'L', [[6, 8], [7, 8]]);
      // Bell (top right)
      paintRect(g, 'E', 12, 3, 13, 5);
      paintV(g, 'E', 14, 2, 6);
      paintPoints(g, 'E', [[11, 4], [11, 5]]);
    },
  ),

  // ── 7. FRENCH HORN ───────────────────────────────────────────────
  makeTemplate(
    'french_horn_16',
    'Coiled French horn with flared bell, rotary valves, and mouthpiece.',
    {
      B: { name: 'horn_body', role: 'body' },
      E: { name: 'bell', role: 'head' },
      V: { name: 'rotary_valves', role: 'accessory' },
      T: { name: 'tubing_coils', role: 'arm' },
      M: { name: 'mouthpiece_pipe', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.gold,
      accessory: C.metal,
      arm: C.brass,
      belt: C.darkMetal,
    },
    (g) => {
      // Bell (large, left side)
      paintRect(g, 'E', 1, 4, 5, 11);
      paintV(g, 'E', 6, 5, 10);
      paintH(g, 'E', 3, 2, 5);
      paintH(g, 'E', 12, 2, 5);
      // Tubing coils (right, circular)
      paintH(g, 'T', 5, 7, 12);
      paintH(g, 'T', 10, 7, 12);
      paintV(g, 'T', 7, 5, 10);
      paintV(g, 'T', 12, 5, 10);
      // Horn body (inner coil area)
      paintRect(g, 'B', 8, 6, 11, 9);
      // Valves (top of coil)
      paintPoints(g, 'V', [[8, 4], [9, 3], [10, 4], [11, 3]]);
      // Mouthpiece pipe (extends up-right)
      paintH(g, 'M', 2, 11, 13);
      paintPoints(g, 'M', [[13, 3], [14, 3]]);
    },
  ),

  // ── 8. TUBA ──────────────────────────────────────────────────────
  makeTemplate(
    'tuba_16',
    'Large brass tuba with wide upward bell, valves, and coiled body.',
    {
      B: { name: 'tuba_body', role: 'body' },
      E: { name: 'bell_opening', role: 'head' },
      V: { name: 'valve_section', role: 'accessory' },
      T: { name: 'tubing', role: 'arm' },
      M: { name: 'mouthpiece', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.gold,
      accessory: C.metal,
      arm: C.brass,
      belt: C.darkMetal,
    },
    (g) => {
      // Bell (wide, top)
      paintRect(g, 'E', 3, 1, 10, 3);
      paintH(g, 'E', 4, 4, 9);
      paintPoints(g, 'E', [[2, 2], [11, 2]]);
      // Main body tube
      paintRect(g, 'B', 5, 4, 8, 12);
      paintV(g, 'T', 4, 5, 11);
      paintV(g, 'T', 9, 5, 11);
      // Valve section (right side)
      paintRect(g, 'V', 10, 5, 11, 10);
      paintPoints(g, 'V', [[12, 6], [12, 8], [12, 10]]);
      // Tubing bottom loop
      paintH(g, 'T', 13, 4, 9);
      // Mouthpiece (left, extends up)
      paintV(g, 'M', 3, 4, 8);
      paintPoints(g, 'M', [[2, 4], [2, 5]]);
    },
  ),

  // ── 9. CLARINET ──────────────────────────────────────────────────
  makeTemplate(
    'clarinet_16',
    'Bb clarinet with barrel, tone holes, keys, and bell.',
    {
      B: { name: 'wooden_body', role: 'body' },
      K: { name: 'silver_keys', role: 'head' },
      M: { name: 'mouthpiece_barrel', role: 'arm' },
      E: { name: 'bell_flare', role: 'accessory' },
      R: { name: 'reed', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.metal,
      arm: C.black,
      accessory: C.darkWood,
      belt: C.orange,
    },
    (g) => {
      // Mouthpiece
      paintRect(g, 'M', 7, 1, 8, 2);
      // Reed
      paintPoints(g, 'R', [[7, 3]]);
      // Barrel
      paintRect(g, 'M', 7, 3, 8, 4);
      // Upper joint body
      paintRect(g, 'B', 7, 5, 8, 9);
      // Lower joint body
      paintRect(g, 'B', 7, 10, 8, 12);
      // Keys (left side)
      paintPoints(g, 'K', [[6, 5], [6, 6], [6, 7], [6, 8], [6, 10], [6, 11]]);
      // Keys (right side)
      paintPoints(g, 'K', [[9, 6], [9, 8], [9, 10]]);
      // Bell flare
      paintRect(g, 'E', 6, 13, 9, 14);
      paintPoints(g, 'E', [[5, 14], [10, 14]]);
    },
  ),

  // ── 10. OBOE ─────────────────────────────────────────────────────
  makeTemplate(
    'oboe_16',
    'Concert oboe with double reed, narrow body, silver keywork, and bell.',
    {
      B: { name: 'oboe_body', role: 'body' },
      K: { name: 'keywork', role: 'head' },
      R: { name: 'double_reed', role: 'accessory' },
      E: { name: 'bell', role: 'arm' },
      S: { name: 'staple_cork', role: 'belt' },
    },
    {
      body: C.black,
      head: C.metal,
      accessory: C.wood,
      arm: C.black,
      belt: C.leather,
    },
    (g) => {
      // Double reed
      paintPoints(g, 'R', [[7, 1], [8, 1]]);
      // Staple/cork
      paintRect(g, 'S', 7, 2, 8, 3);
      // Upper body
      paintRect(g, 'B', 7, 4, 8, 9);
      // Lower body
      paintRect(g, 'B', 7, 10, 8, 12);
      // Keys (left)
      paintPoints(g, 'K', [[6, 4], [6, 5], [6, 7], [6, 8], [6, 10]]);
      // Keys (right)
      paintPoints(g, 'K', [[9, 5], [9, 7], [9, 9], [9, 11]]);
      // Bell (slight flare)
      paintRect(g, 'E', 6, 13, 9, 14);
    },
  ),

  // ── 11. BONGO DRUMS ──────────────────────────────────────────────
  makeTemplate(
    'bongo_drums_16',
    'Pair of bongo drums with contrasting drumheads, shells, and hardware.',
    {
      L: { name: 'large_drum_shell', role: 'body' },
      S: { name: 'small_drum_shell', role: 'head' },
      H: { name: 'drumheads', role: 'arm' },
      R: { name: 'rim_hardware', role: 'accessory' },
      B: { name: 'bridge_block', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.red,
      arm: C.paper,
      accessory: C.metal,
      belt: C.darkWood,
    },
    (g) => {
      // Large drum (left) - wider
      // Rim
      paintH(g, 'R', 4, 1, 7);
      // Drumhead
      paintH(g, 'H', 5, 2, 6);
      paintH(g, 'H', 6, 2, 6);
      // Shell
      paintRect(g, 'L', 1, 7, 7, 12);
      paintH(g, 'L', 13, 2, 6);
      // Small drum (right) - narrower
      // Rim
      paintH(g, 'R', 4, 9, 14);
      // Drumhead
      paintH(g, 'H', 5, 10, 13);
      paintH(g, 'H', 6, 10, 13);
      // Shell
      paintRect(g, 'S', 9, 7, 14, 11);
      paintH(g, 'S', 12, 10, 13);
      // Bridge block connecting them
      paintRect(g, 'B', 7, 6, 9, 10);
    },
  ),

  // ── 12. STEEL DRUM ───────────────────────────────────────────────
  makeTemplate(
    'steel_drum_16',
    'Caribbean steel pan drum with concave surface, note zones, and stand.',
    {
      P: { name: 'pan_surface', role: 'body' },
      N: { name: 'note_zones', role: 'head' },
      R: { name: 'rim_skirt', role: 'arm' },
      S: { name: 'stand_frame', role: 'accessory' },
      M: { name: 'mallets', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.teal,
      arm: C.darkMetal,
      accessory: C.darkMetal,
      belt: C.wood,
    },
    (g) => {
      // Pan surface (oval from above)
      paintH(g, 'P', 3, 4, 11);
      paintRect(g, 'P', 3, 4, 12, 7);
      paintH(g, 'P', 8, 4, 11);
      // Note zones (patterned indentations)
      paintPoints(g, 'N', [[5, 4], [7, 4], [9, 4], [11, 4]]);
      paintPoints(g, 'N', [[4, 6], [6, 5], [8, 6], [10, 5], [12, 6]]);
      paintPoints(g, 'N', [[5, 7], [7, 7], [9, 7], [11, 7]]);
      // Rim/skirt
      paintH(g, 'R', 2, 5, 10);
      paintRect(g, 'R', 3, 9, 12, 10);
      paintV(g, 'R', 3, 3, 8);
      paintV(g, 'R', 12, 3, 8);
      // Stand legs
      paintPoints(g, 'S', [[4, 11], [11, 11]]);
      paintPoints(g, 'S', [[3, 12], [12, 12]]);
      paintPoints(g, 'S', [[2, 13], [13, 13]]);
      paintPoints(g, 'S', [[1, 14], [14, 14]]);
      // Mallets
      paintPoints(g, 'M', [[6, 2], [9, 1]]);
      paintPoints(g, 'M', [[6, 3], [9, 2]]);
    },
  ),

  // ── 13. GONG/CYMBAL ──────────────────────────────────────────────
  makeTemplate(
    'gong_cymbal_16',
    'Large gong on frame with mallet, boss center, and rope hangers.',
    {
      G: { name: 'gong_disc', role: 'body' },
      B: { name: 'boss_center', role: 'head' },
      F: { name: 'frame_stand', role: 'arm' },
      R: { name: 'rope_hangers', role: 'accessory' },
      M: { name: 'mallet', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.gold,
      arm: C.wood,
      accessory: C.red,
      belt: C.leather,
    },
    (g) => {
      // Frame (A-frame stand)
      paintV(g, 'F', 2, 1, 14);
      paintV(g, 'F', 13, 1, 14);
      paintH(g, 'F', 1, 3, 12);
      paintH(g, 'F', 14, 1, 14);
      // Rope hangers
      paintPoints(g, 'R', [[4, 2], [5, 3], [11, 2], [10, 3]]);
      // Gong disc
      paintH(g, 'G', 3, 5, 10);
      paintRect(g, 'G', 4, 4, 11, 11);
      paintH(g, 'G', 12, 5, 10);
      // Boss center
      paintRect(g, 'B', 6, 6, 9, 9);
      paintPoints(g, 'B', [[7, 5], [8, 5], [7, 10], [8, 10]]);
      // Mallet (right side, leaning)
      paintV(g, 'M', 14, 6, 12);
      paintPoints(g, 'M', [[13, 6], [14, 5]]);
    },
  ),

  // ── 14. TRIANGLE INSTRUMENT ──────────────────────────────────────
  makeTemplate(
    'triangle_instrument_16',
    'Metal triangle with beater and suspension string.',
    {
      T: { name: 'triangle_bar', role: 'body' },
      B: { name: 'beater_stick', role: 'head' },
      S: { name: 'suspension_string', role: 'accessory' },
      H: { name: 'clip_hook', role: 'arm' },
    },
    {
      body: C.metal,
      head: C.wood,
      accessory: C.gold,
      arm: C.brass,
    },
    (g) => {
      // Suspension string (from top)
      paintV(g, 'S', 7, 1, 3);
      // Clip/hook
      paintPoints(g, 'H', [[6, 3], [8, 3]]);
      // Triangle shape — open at bottom-right
      // Left side going down
      paintPoints(g, 'T', [[7, 4], [6, 5], [5, 6], [4, 7], [3, 8], [2, 9], [2, 10], [3, 11]]);
      // Bottom side going right
      paintH(g, 'T', 12, 3, 12);
      paintH(g, 'T', 11, 3, 4);
      // Right side going up (open gap)
      paintPoints(g, 'T', [[12, 11], [12, 10], [11, 9], [11, 8], [10, 7], [10, 6], [9, 5], [8, 4]]);
      // Beater (left side)
      paintV(g, 'B', 13, 4, 10);
      paintPoints(g, 'B', [[14, 4], [12, 4]]);
    },
  ),

  // ── 15. COWBELL ──────────────────────────────────────────────────
  makeTemplate(
    'cowbell_16',
    'Percussion cowbell with handle, striker surface, and weld seam.',
    {
      B: { name: 'bell_body', role: 'body' },
      H: { name: 'handle_grip', role: 'head' },
      S: { name: 'striker', role: 'arm' },
      W: { name: 'weld_seam', role: 'accessory' },
    },
    {
      body: C.darkMetal,
      head: C.metal,
      arm: C.wood,
      accessory: C.brass,
    },
    (g) => {
      // Handle at top
      paintRect(g, 'H', 6, 1, 9, 3);
      paintPoints(g, 'H', [[7, 2], [8, 2]]);
      // Bell body (trapezoidal, wider at bottom)
      paintRect(g, 'B', 5, 4, 10, 6);
      paintRect(g, 'B', 4, 7, 11, 9);
      paintRect(g, 'B', 3, 10, 12, 12);
      // Bottom opening
      paintH(g, 'B', 13, 4, 11);
      // Weld seam (center vertical)
      paintV(g, 'W', 7, 4, 13);
      paintV(g, 'W', 8, 4, 13);
      // Striker (to the side)
      paintV(g, 'S', 14, 3, 9);
      paintPoints(g, 'S', [[13, 3], [13, 4]]);
    },
  ),

  // ── 16. METRONOME ────────────────────────────────────────────────
  makeTemplate(
    'metronome_16',
    'Mechanical pyramid metronome with pendulum, tempo scale, and winding key.',
    {
      B: { name: 'pyramid_body', role: 'body' },
      P: { name: 'pendulum_arm', role: 'head' },
      S: { name: 'tempo_scale', role: 'accessory' },
      W: { name: 'weight', role: 'arm' },
      K: { name: 'winding_key', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.metal,
      accessory: C.paper,
      arm: C.brass,
      belt: C.darkMetal,
    },
    (g) => {
      // Pyramid body (wider at bottom)
      paintRect(g, 'B', 6, 3, 9, 4);
      paintRect(g, 'B', 5, 5, 10, 7);
      paintRect(g, 'B', 4, 8, 11, 10);
      paintRect(g, 'B', 3, 11, 12, 13);
      paintH(g, 'B', 14, 2, 13);
      // Tempo scale (face plate)
      paintRect(g, 'S', 5, 8, 10, 10);
      // Pendulum arm (tilted left)
      paintPoints(g, 'P', [[7, 4], [6, 5], [5, 6], [5, 7]]);
      paintV(g, 'P', 7, 8, 12);
      // Weight on pendulum
      paintPoints(g, 'W', [[4, 6], [4, 7]]);
      // Top finial
      paintPoints(g, 'B', [[7, 2], [8, 2]]);
      // Winding key (side)
      paintPoints(g, 'K', [[12, 11], [13, 11]]);
    },
  ),

  // ── 17. TUNING FORK ──────────────────────────────────────────────
  makeTemplate(
    'tuning_fork_16',
    'Metal tuning fork with two prongs, stem, and ball end.',
    {
      P: { name: 'prongs', role: 'body' },
      S: { name: 'stem_handle', role: 'head' },
      B: { name: 'ball_end', role: 'accessory' },
      V: { name: 'vibration_lines', role: 'arm' },
    },
    {
      body: C.metal,
      head: C.darkMetal,
      accessory: C.metal,
      arm: C.teal,
    },
    (g) => {
      // Left prong
      paintV(g, 'P', 6, 1, 8);
      paintV(g, 'P', 7, 1, 8);
      // Right prong
      paintV(g, 'P', 9, 1, 8);
      paintV(g, 'P', 10, 1, 8);
      // Join at base of prongs
      paintRect(g, 'P', 7, 9, 9, 9);
      // Stem
      paintV(g, 'S', 7, 10, 13);
      paintV(g, 'S', 8, 10, 13);
      // Ball end
      paintRect(g, 'B', 7, 14, 8, 14);
      paintPoints(g, 'B', [[6, 14], [9, 14]]);
      // Vibration lines
      paintPoints(g, 'V', [[5, 2], [11, 2], [5, 5], [11, 5], [4, 4], [12, 4]]);
    },
  ),

  // ── 18. GUITAR PEDAL ─────────────────────────────────────────────
  makeTemplate(
    'guitar_pedal_16',
    'Guitar effects pedal with stomp switch, knobs, LED, and I/O jacks.',
    {
      B: { name: 'pedal_housing', role: 'body' },
      K: { name: 'control_knobs', role: 'head' },
      S: { name: 'stomp_switch', role: 'arm' },
      L: { name: 'led_indicator', role: 'accessory' },
      J: { name: 'io_jacks', role: 'belt' },
    },
    {
      body: C.red,
      head: C.ivory,
      arm: C.metal,
      accessory: C.green,
      belt: C.darkMetal,
    },
    (g) => {
      // Housing body
      paintRect(g, 'B', 3, 2, 12, 13);
      // Top edge
      paintH(g, 'B', 1, 4, 11);
      // Control knobs
      paintPoints(g, 'K', [[5, 3], [7, 3], [10, 3]]);
      paintPoints(g, 'K', [[5, 5], [10, 5]]);
      // LED indicator
      paintPoints(g, 'L', [[7, 5], [8, 5]]);
      // Label area (center)
      paintRect(g, 'B', 4, 6, 11, 8);
      // Stomp switch (large, bottom)
      paintRect(g, 'S', 5, 10, 10, 12);
      paintH(g, 'S', 9, 6, 9);
      // I/O jacks (sides)
      paintPoints(g, 'J', [[2, 6], [2, 7], [13, 6], [13, 7]]);
      // Bottom
      paintH(g, 'B', 14, 4, 11);
    },
  ),

  // ── 19. MIXER CONSOLE ────────────────────────────────────────────
  makeTemplate(
    'mixer_console_16',
    'Audio mixing board with channel faders, knobs, VU meters, and master section.',
    {
      B: { name: 'console_body', role: 'body' },
      F: { name: 'fader_channels', role: 'head' },
      K: { name: 'eq_knobs', role: 'accessory' },
      V: { name: 'vu_meters', role: 'arm' },
      M: { name: 'master_section', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.ivory,
      accessory: C.blue,
      arm: C.green,
      belt: C.red,
    },
    (g) => {
      // Console body (angled shape)
      paintRect(g, 'B', 1, 3, 14, 13);
      paintH(g, 'B', 2, 2, 13);
      // EQ knobs row (top)
      paintPoints(g, 'K', [[3, 4], [5, 4], [7, 4], [9, 4], [11, 4]]);
      paintPoints(g, 'K', [[3, 6], [5, 6], [7, 6], [9, 6], [11, 6]]);
      // VU meters
      paintRect(g, 'V', 12, 4, 13, 6);
      // Fader channels (vertical strips)
      paintV(g, 'F', 3, 8, 12);
      paintV(g, 'F', 5, 8, 12);
      paintV(g, 'F', 7, 8, 12);
      paintV(g, 'F', 9, 8, 12);
      paintV(g, 'F', 11, 8, 12);
      // Master fader
      paintV(g, 'M', 13, 8, 12);
      paintPoints(g, 'M', [[12, 10], [13, 10]]);
    },
  ),

  // ── 20. HEADPHONES STUDIO ────────────────────────────────────────
  makeTemplate(
    'headphones_studio_16',
    'Over-ear studio headphones with padded cups, headband, and coiled cable.',
    {
      C: { name: 'ear_cups', role: 'body' },
      P: { name: 'ear_pads', role: 'head' },
      H: { name: 'headband', role: 'arm' },
      D: { name: 'driver_mesh', role: 'accessory' },
      W: { name: 'cable_coil', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.leather,
      arm: C.metal,
      accessory: C.darkMetal,
      belt: C.black,
    },
    (g) => {
      // Headband (arch)
      paintH(g, 'H', 1, 5, 10);
      paintH(g, 'H', 2, 4, 11);
      paintPoints(g, 'H', [[3, 3], [12, 3]]);
      // Left ear cup
      paintRect(g, 'C', 1, 5, 4, 11);
      paintRect(g, 'P', 1, 6, 2, 10);
      paintPoints(g, 'D', [[3, 7], [3, 9]]);
      // Hinge connections
      paintV(g, 'H', 3, 4, 5);
      paintV(g, 'H', 12, 4, 5);
      // Right ear cup
      paintRect(g, 'C', 11, 5, 14, 11);
      paintRect(g, 'P', 13, 6, 14, 10);
      paintPoints(g, 'D', [[12, 7], [12, 9]]);
      // Cable (coiled, from left cup)
      paintPoints(g, 'W', [[2, 12], [2, 13], [3, 14], [4, 14]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'MUSIC_BATCH2_TEMPLATES',
    schemes: 'MUSIC_BATCH2_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
