/**
 * Music & Instruments batch 1.
 * 20 original 16x16 templates — diverse instruments across genres.
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
};

const templates: CompactTemplate[] = [
  // ── 1. ACOUSTIC GUITAR ─────────────────────────────────────────
  makeTemplate(
    'acoustic_guitar_16',
    'Acoustic guitar with wooden body, soundhole, neck, and headstock.',
    {
      B: { name: 'guitar_body', role: 'body' },
      N: { name: 'neck', role: 'arm' },
      S: { name: 'soundhole', role: 'eye' },
      H: { name: 'headstock', role: 'head' },
      T: { name: 'strings', role: 'accessory' },
    },
    {
      body: C.wood,
      arm: C.darkWood,
      eye: C.black,
      head: C.darkWood,
      accessory: C.gold,
    },
    (g) => {
      // Headstock at top
      paintRect(g, 'H', 6, 1, 8, 2);
      // Neck
      paintRect(g, 'N', 7, 3, 8, 7);
      // Strings on neck
      paintV(g, 'T', 7, 3, 7);
      paintV(g, 'T', 8, 3, 7);
      // Body (pear shape)
      paintRect(g, 'B', 5, 8, 10, 13);
      paintH(g, 'B', 7, 6, 9);
      paintH(g, 'B', 14, 6, 9);
      // Soundhole
      paintRect(g, 'S', 7, 9, 8, 10);
      // Strings on body
      paintPoints(g, 'T', [[7, 8], [8, 8], [7, 11], [8, 11]]);
    },
  ),

  // ── 2. ELECTRIC GUITAR ─────────────────────────────────────────
  makeTemplate(
    'electric_guitar_16',
    'Electric guitar with solid body, pickups, and angled headstock.',
    {
      B: { name: 'solid_body', role: 'body' },
      N: { name: 'neck_fretboard', role: 'arm' },
      P: { name: 'pickups', role: 'accessory' },
      H: { name: 'headstock', role: 'head' },
      K: { name: 'knobs', role: 'belt' },
    },
    {
      body: C.red,
      arm: C.darkWood,
      accessory: C.metal,
      head: C.darkWood,
      belt: C.brass,
    },
    (g) => {
      paintRect(g, 'H', 6, 1, 7, 2);
      paintPoints(g, 'H', [[5, 1], [8, 2]]);
      paintRect(g, 'N', 7, 3, 8, 7);
      // Body (strat-like)
      paintRect(g, 'B', 4, 8, 11, 13);
      paintH(g, 'B', 7, 5, 10);
      paintPoints(g, 'B', [[4, 7], [3, 9], [3, 10]]);
      // Pickups
      paintH(g, 'P', 9, 5, 10);
      paintH(g, 'P', 11, 5, 10);
      // Knobs
      paintPoints(g, 'K', [[9, 12], [10, 12]]);
    },
  ),

  // ── 3. BASS GUITAR ─────────────────────────────────────────────
  makeTemplate(
    'bass_guitar_16',
    'Bass guitar with long neck, thick body, and heavy tuning pegs.',
    {
      B: { name: 'bass_body', role: 'body' },
      N: { name: 'long_neck', role: 'arm' },
      H: { name: 'headstock_pegs', role: 'head' },
      P: { name: 'pickup', role: 'accessory' },
      S: { name: 'strings', role: 'belt' },
    },
    {
      body: C.darkMetal,
      arm: C.wood,
      head: C.wood,
      accessory: C.metal,
      belt: C.gold,
    },
    (g) => {
      paintRect(g, 'H', 6, 1, 8, 2);
      paintPoints(g, 'H', [[5, 1], [9, 2]]);
      paintRect(g, 'N', 7, 3, 8, 8);
      paintV(g, 'S', 7, 3, 12);
      paintRect(g, 'B', 5, 9, 10, 14);
      paintH(g, 'B', 8, 6, 9);
      paintH(g, 'P', 10, 6, 9);
      paintH(g, 'P', 12, 6, 9);
    },
  ),

  // ── 4. GRAND PIANO ─────────────────────────────────────────────
  makeTemplate(
    'grand_piano_16',
    'Grand piano from above with open lid, keys, and legs.',
    {
      B: { name: 'piano_body', role: 'body' },
      L: { name: 'open_lid', role: 'head' },
      W: { name: 'white_keys', role: 'arm' },
      K: { name: 'black_keys', role: 'eye' },
      G: { name: 'legs', role: 'belt' },
    },
    {
      body: C.black,
      head: C.darkMetal,
      arm: C.ivory,
      eye: C.black,
      belt: C.darkWood,
    },
    (g) => {
      // Piano body (curved shape)
      paintRect(g, 'B', 2, 3, 13, 12);
      paintH(g, 'B', 2, 4, 12);
      paintH(g, 'B', 13, 4, 12);
      // Open lid
      paintRect(g, 'L', 3, 3, 12, 5);
      // White keys
      paintRect(g, 'W', 3, 10, 12, 11);
      // Black keys
      paintPoints(g, 'K', [[4, 10], [6, 10], [7, 10], [9, 10], [11, 10]]);
      // Legs
      paintPoints(g, 'G', [[3, 13], [4, 14], [11, 13], [12, 14]]);
    },
  ),

  // ── 5. UPRIGHT PIANO ───────────────────────────────────────────
  makeTemplate(
    'upright_piano_16',
    'Front-view upright piano with keyboard, music stand, and pedals.',
    {
      B: { name: 'cabinet', role: 'body' },
      K: { name: 'keyboard_white', role: 'arm' },
      D: { name: 'keyboard_black', role: 'eye' },
      M: { name: 'music_stand', role: 'head' },
      P: { name: 'pedals', role: 'accessory' },
    },
    {
      body: C.wood,
      arm: C.ivory,
      eye: C.black,
      head: C.paper,
      accessory: C.brass,
    },
    (g) => {
      paintRect(g, 'B', 3, 2, 12, 12);
      // Music stand area
      paintRect(g, 'M', 4, 3, 11, 5);
      // Keyboard
      paintRect(g, 'K', 4, 9, 11, 10);
      paintPoints(g, 'D', [[5, 9], [6, 9], [8, 9], [9, 9], [10, 9]]);
      // Pedals
      paintPoints(g, 'P', [[6, 13], [8, 13], [10, 13]]);
    },
  ),

  // ── 6. DRUM KIT ────────────────────────────────────────────────
  makeTemplate(
    'drum_kit_16',
    'Full drum kit with bass drum, snare, toms, hi-hat, and cymbal.',
    {
      B: { name: 'bass_drum', role: 'body' },
      S: { name: 'snare_toms', role: 'head' },
      C: { name: 'cymbals', role: 'accessory' },
      R: { name: 'rims_hardware', role: 'belt' },
      H: { name: 'drum_heads', role: 'arm' },
    },
    {
      body: C.red,
      head: C.wood,
      accessory: C.brass,
      belt: C.metal,
      arm: C.paper,
    },
    (g) => {
      // Bass drum (center)
      paintRect(g, 'B', 5, 8, 10, 12);
      paintH(g, 'R', 8, 5, 10);
      paintH(g, 'R', 12, 5, 10);
      // Bass drum head
      paintRect(g, 'H', 6, 9, 9, 11);
      // Snare (left)
      paintRect(g, 'S', 2, 6, 5, 9);
      paintH(g, 'H', 7, 3, 4);
      // Tom (right)
      paintRect(g, 'S', 10, 5, 13, 8);
      paintH(g, 'H', 6, 11, 12);
      // Cymbals
      paintH(g, 'C', 3, 1, 4);
      paintH(g, 'C', 2, 12, 14);
      paintPoints(g, 'C', [[2, 4], [13, 4]]);
      // Hi-hat stand
      paintV(g, 'R', 3, 4, 6);
      paintV(g, 'R', 13, 5, 8);
    },
  ),

  // ── 7. VIOLIN ──────────────────────────────────────────────────
  makeTemplate(
    'violin_16',
    'Classical violin with bow, f-holes, chin rest, and strings.',
    {
      B: { name: 'violin_body', role: 'body' },
      N: { name: 'neck_scroll', role: 'arm' },
      S: { name: 'strings', role: 'accessory' },
      F: { name: 'f_holes', role: 'eye' },
      W: { name: 'bow', role: 'head' },
    },
    {
      body: C.wood,
      arm: C.darkWood,
      accessory: C.gold,
      eye: C.black,
      head: C.leather,
    },
    (g) => {
      // Scroll
      paintPoints(g, 'N', [[7, 1], [8, 1]]);
      // Neck
      paintRect(g, 'N', 7, 2, 8, 5);
      // Upper bout
      paintRect(g, 'B', 5, 6, 10, 7);
      // Waist (narrower)
      paintRect(g, 'B', 6, 8, 9, 9);
      // Lower bout
      paintRect(g, 'B', 4, 10, 11, 13);
      paintH(g, 'B', 14, 5, 10);
      // F-holes
      paintPoints(g, 'F', [[5, 11], [10, 11], [5, 12], [10, 12]]);
      // Strings
      paintV(g, 'S', 7, 3, 13);
      paintV(g, 'S', 8, 3, 13);
      // Bow (right side)
      paintV(g, 'W', 13, 2, 14);
      paintPoints(g, 'W', [[14, 3], [14, 13]]);
    },
  ),

  // ── 8. TRUMPET ─────────────────────────────────────────────────
  makeTemplate(
    'trumpet_16',
    'Brass trumpet with valves, bell, mouthpiece, and tubing.',
    {
      B: { name: 'brass_body', role: 'body' },
      V: { name: 'valve_caps', role: 'head' },
      E: { name: 'bell', role: 'arm' },
      M: { name: 'mouthpiece', role: 'belt' },
      T: { name: 'tubing', role: 'accessory' },
    },
    {
      body: C.brass,
      head: C.metal,
      arm: C.brass,
      belt: C.metal,
      accessory: C.gold,
    },
    (g) => {
      // Mouthpiece (left)
      paintH(g, 'M', 8, 1, 3);
      // Main tube
      paintH(g, 'B', 7, 3, 11);
      paintH(g, 'B', 8, 3, 11);
      // Valve section
      paintRect(g, 'V', 5, 5, 5, 7);
      paintRect(g, 'V', 7, 5, 7, 7);
      paintRect(g, 'V', 9, 5, 9, 7);
      // Tubing loops
      paintH(g, 'T', 9, 4, 10);
      paintH(g, 'T', 10, 5, 9);
      // Bell (right, flared)
      paintRect(g, 'E', 12, 6, 13, 10);
      paintV(g, 'E', 14, 5, 11);
      paintPoints(g, 'E', [[11, 7], [11, 9]]);
    },
  ),

  // ── 9. SAXOPHONE ───────────────────────────────────────────────
  makeTemplate(
    'saxophone_16',
    'Alto saxophone with curved bell, keys, neck, and mouthpiece.',
    {
      B: { name: 'sax_body', role: 'body' },
      K: { name: 'key_pads', role: 'head' },
      E: { name: 'bell_end', role: 'arm' },
      M: { name: 'mouthpiece_neck', role: 'accessory' },
      R: { name: 'key_rods', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.metal,
      arm: C.gold,
      accessory: C.black,
      belt: C.metal,
    },
    (g) => {
      // Mouthpiece
      paintPoints(g, 'M', [[6, 1], [7, 2]]);
      // Neck (curved)
      paintPoints(g, 'B', [[8, 3], [9, 4], [9, 5]]);
      // Body (straight down)
      paintRect(g, 'B', 8, 5, 9, 11);
      // Key pads (left side)
      paintPoints(g, 'K', [[7, 6], [7, 7], [7, 8], [7, 9], [7, 10]]);
      // Key rods
      paintPoints(g, 'R', [[10, 6], [10, 8], [10, 10]]);
      // Bell curve
      paintRect(g, 'E', 5, 12, 9, 13);
      paintH(g, 'E', 11, 6, 8);
      paintPoints(g, 'E', [[4, 12], [4, 11]]);
    },
  ),

  // ── 10. FLUTE ──────────────────────────────────────────────────
  makeTemplate(
    'flute_16',
    'Silver concert flute with keys, embouchure hole, and foot joint.',
    {
      B: { name: 'flute_tube', role: 'body' },
      K: { name: 'key_mechanism', role: 'head' },
      E: { name: 'embouchure_plate', role: 'accessory' },
      F: { name: 'foot_joint', role: 'arm' },
    },
    {
      body: C.metal,
      head: C.gold,
      accessory: C.blue,
      arm: C.metal,
    },
    (g) => {
      // Main tube (horizontal)
      paintH(g, 'B', 7, 1, 14);
      paintH(g, 'B', 8, 1, 14);
      // Embouchure plate (left end)
      paintRect(g, 'E', 1, 6, 3, 9);
      // Keys along the body
      paintPoints(g, 'K', [[4, 6], [6, 6], [8, 6], [10, 6], [12, 6]]);
      paintPoints(g, 'K', [[5, 9], [7, 9], [9, 9], [11, 9]]);
      // Foot joint
      paintRect(g, 'F', 13, 7, 14, 8);
      paintPoints(g, 'F', [[13, 6], [14, 6]]);
    },
  ),

  // ── 11. HARP ───────────────────────────────────────────────────
  makeTemplate(
    'harp_16',
    'Concert harp with gold frame, strings, ornate column, and base.',
    {
      F: { name: 'frame_column', role: 'body' },
      S: { name: 'strings', role: 'head' },
      B: { name: 'soundboard', role: 'arm' },
      D: { name: 'decorative_top', role: 'accessory' },
      P: { name: 'pedal_base', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.gold,
      arm: C.wood,
      accessory: C.gold,
      belt: C.darkWood,
    },
    (g) => {
      // Crown/decorative top
      paintPoints(g, 'D', [[4, 1], [5, 1], [3, 2], [4, 2]]);
      // Neck (top horizontal)
      paintH(g, 'F', 2, 4, 10);
      paintH(g, 'F', 3, 3, 4);
      // Column (left vertical)
      paintV(g, 'F', 3, 4, 13);
      paintV(g, 'F', 4, 4, 13);
      // Soundboard (right diagonal)
      paintV(g, 'B', 10, 3, 12);
      paintV(g, 'B', 11, 5, 13);
      paintPoints(g, 'B', [[9, 12], [9, 13]]);
      // Strings
      paintPoints(g, 'S', [[5, 4], [6, 5], [7, 6], [8, 7], [9, 8]]);
      paintPoints(g, 'S', [[5, 6], [6, 7], [7, 8], [8, 9], [9, 10]]);
      paintPoints(g, 'S', [[5, 8], [6, 9], [7, 10], [8, 11]]);
      paintPoints(g, 'S', [[5, 10], [6, 11], [7, 12]]);
      // Base
      paintH(g, 'P', 14, 3, 11);
    },
  ),

  // ── 12. TAMBOURINE ─────────────────────────────────────────────
  makeTemplate(
    'tambourine_16',
    'Hand tambourine with jingles, drumhead, and ribbon accent.',
    {
      F: { name: 'frame_ring', role: 'body' },
      H: { name: 'drumhead', role: 'head' },
      J: { name: 'jingles', role: 'accessory' },
      R: { name: 'ribbon', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.paper,
      accessory: C.brass,
      arm: C.red,
    },
    (g) => {
      // Outer ring (circular)
      paintH(g, 'F', 3, 5, 10);
      paintH(g, 'F', 4, 4, 11);
      paintH(g, 'F', 12, 4, 11);
      paintH(g, 'F', 13, 5, 10);
      paintV(g, 'F', 3, 5, 11);
      paintV(g, 'F', 4, 4, 12);
      paintV(g, 'F', 11, 4, 12);
      paintV(g, 'F', 12, 5, 11);
      // Drumhead (inner fill)
      paintRect(g, 'H', 5, 5, 10, 11);
      // Jingles (on frame edges)
      paintPoints(g, 'J', [[3, 7], [3, 9], [12, 7], [12, 9], [7, 3], [9, 3], [7, 13], [9, 13]]);
      // Ribbon
      paintPoints(g, 'R', [[7, 14], [8, 14], [6, 14]]);
    },
  ),

  // ── 13. ACCORDION ──────────────────────────────────────────────
  makeTemplate(
    'accordion_16',
    'Button accordion with bellows, keyboard side, and bass buttons.',
    {
      B: { name: 'bellows', role: 'body' },
      K: { name: 'keyboard_side', role: 'head' },
      A: { name: 'bass_buttons', role: 'arm' },
      S: { name: 'strap', role: 'belt' },
      G: { name: 'grille', role: 'accessory' },
    },
    {
      body: C.red,
      head: C.ivory,
      arm: C.metal,
      belt: C.leather,
      accessory: C.darkMetal,
    },
    (g) => {
      // Left side (bass buttons)
      paintRect(g, 'A', 2, 3, 4, 12);
      paintPoints(g, 'G', [[3, 4], [3, 6], [3, 8], [3, 10]]);
      // Bellows (center)
      paintRect(g, 'B', 5, 3, 9, 12);
      // Right side (keyboard)
      paintRect(g, 'K', 10, 3, 13, 12);
      // Black keys
      paintPoints(g, 'A', [[11, 4], [11, 6], [11, 8], [11, 10], [11, 11]]);
      // Strap
      paintV(g, 'S', 1, 4, 10);
      paintPoints(g, 'S', [[2, 3], [2, 12]]);
    },
  ),

  // ── 14. XYLOPHONE ──────────────────────────────────────────────
  makeTemplate(
    'xylophone_16',
    'Xylophone with graduated tone bars, frame, and pair of mallets.',
    {
      B: { name: 'tone_bars', role: 'body' },
      F: { name: 'frame_rails', role: 'head' },
      M: { name: 'mallets', role: 'accessory' },
      R: { name: 'resonators', role: 'arm' },
    },
    {
      body: C.brass,
      head: C.wood,
      accessory: C.red,
      arm: C.darkWood,
    },
    (g) => {
      // Frame rails
      paintH(g, 'F', 6, 2, 13);
      paintH(g, 'F', 12, 2, 13);
      // Tone bars (graduated lengths)
      paintV(g, 'B', 3, 7, 11);
      paintV(g, 'B', 5, 7, 11);
      paintV(g, 'B', 7, 7, 11);
      paintV(g, 'B', 9, 8, 11);
      paintV(g, 'B', 11, 8, 11);
      paintV(g, 'B', 13, 9, 11);
      // Resonators
      paintPoints(g, 'R', [[3, 12], [5, 12], [7, 12], [9, 12], [11, 12], [13, 12]]);
      // Mallets
      paintPoints(g, 'M', [[5, 3], [6, 4], [7, 5]]);
      paintPoints(g, 'M', [[10, 3], [9, 4], [8, 5]]);
    },
  ),

  // ── 15. MICROPHONE VINTAGE ─────────────────────────────────────
  makeTemplate(
    'microphone_stage_16',
    'Classic stage microphone on adjustable stand with round head.',
    {
      H: { name: 'mic_head', role: 'head' },
      G: { name: 'mic_grille', role: 'accessory' },
      S: { name: 'stand_tube', role: 'body' },
      B: { name: 'stand_base', role: 'belt' },
      C: { name: 'cable', role: 'arm' },
    },
    {
      head: C.darkMetal,
      accessory: C.metal,
      body: C.metal,
      belt: C.darkMetal,
      arm: C.black,
    },
    (g) => {
      // Mic head (round)
      paintRect(g, 'H', 6, 2, 9, 5);
      paintH(g, 'H', 1, 7, 8);
      // Grille
      paintRect(g, 'G', 7, 3, 8, 4);
      // Stand
      paintV(g, 'S', 7, 6, 12);
      paintV(g, 'S', 8, 6, 12);
      // Base (tripod feet)
      paintH(g, 'B', 13, 4, 11);
      paintH(g, 'B', 14, 3, 5);
      paintH(g, 'B', 14, 10, 12);
      // Cable
      paintPoints(g, 'C', [[9, 7], [10, 8], [10, 9], [11, 10]]);
    },
  ),

  // ── 16. AMPLIFIER ──────────────────────────────────────────────
  makeTemplate(
    'guitar_amplifier_16',
    'Guitar amp combo with speaker grille, control knobs, and handle.',
    {
      B: { name: 'cabinet', role: 'body' },
      G: { name: 'speaker_grille', role: 'head' },
      K: { name: 'control_knobs', role: 'accessory' },
      H: { name: 'carry_handle', role: 'belt' },
      S: { name: 'speaker_cone', role: 'arm' },
    },
    {
      body: C.black,
      head: C.darkMetal,
      accessory: C.brass,
      belt: C.leather,
      arm: C.paper,
    },
    (g) => {
      // Cabinet
      paintRect(g, 'B', 2, 3, 13, 13);
      // Handle
      paintH(g, 'H', 3, 6, 9);
      paintPoints(g, 'H', [[5, 2], [10, 2]]);
      // Control panel
      paintH(g, 'K', 4, 3, 12);
      paintPoints(g, 'K', [[4, 5], [6, 5], [8, 5], [10, 5], [12, 5]]);
      // Speaker grille
      paintRect(g, 'G', 3, 6, 12, 12);
      // Speaker cone
      paintRect(g, 'S', 5, 8, 10, 11);
      paintPoints(g, 'S', [[7, 7], [8, 7], [7, 12], [8, 12]]);
    },
  ),

  // ── 17. MUSIC STAND ────────────────────────────────────────────
  makeTemplate(
    'music_stand_16',
    'Sheet music stand with tilted desk, adjustable pole, and tripod base.',
    {
      D: { name: 'desk_panel', role: 'body' },
      M: { name: 'sheet_music', role: 'head' },
      P: { name: 'pole', role: 'arm' },
      B: { name: 'tripod_base', role: 'belt' },
      L: { name: 'music_notes', role: 'accessory' },
    },
    {
      body: C.darkMetal,
      head: C.paper,
      arm: C.metal,
      belt: C.darkMetal,
      accessory: C.black,
    },
    (g) => {
      // Sheet music
      paintRect(g, 'M', 3, 2, 12, 7);
      // Desk panel (behind sheet)
      paintH(g, 'D', 1, 4, 11);
      paintV(g, 'D', 3, 2, 7);
      paintV(g, 'D', 12, 2, 7);
      paintH(g, 'D', 8, 5, 10);
      // Music notes
      paintPoints(g, 'L', [[5, 4], [7, 3], [9, 5], [6, 6], [10, 4]]);
      // Pole
      paintV(g, 'P', 7, 8, 12);
      paintV(g, 'P', 8, 8, 12);
      // Tripod base
      paintH(g, 'B', 13, 4, 11);
      paintPoints(g, 'B', [[3, 14], [4, 13], [11, 13], [12, 14]]);
    },
  ),

  // ── 18. DJEMBE DRUM ────────────────────────────────────────────
  makeTemplate(
    'djembe_drum_16',
    'West African djembe drum with goatskin head, rope tuning, and carved base.',
    {
      H: { name: 'drum_head', role: 'head' },
      R: { name: 'rope_tuning', role: 'accessory' },
      B: { name: 'wooden_shell', role: 'body' },
      S: { name: 'stem_base', role: 'belt' },
      D: { name: 'carved_detail', role: 'arm' },
    },
    {
      head: C.paper,
      accessory: C.gold,
      body: C.wood,
      belt: C.darkWood,
      arm: C.red,
    },
    (g) => {
      // Drum head (top, wide)
      paintH(g, 'H', 2, 4, 11);
      paintH(g, 'H', 3, 4, 11);
      // Rope tuning
      paintH(g, 'R', 4, 4, 11);
      // Shell (goblet shape)
      paintRect(g, 'B', 4, 5, 11, 8);
      paintRect(g, 'B', 5, 9, 10, 10);
      paintRect(g, 'B', 6, 11, 9, 12);
      // Carved detail
      paintPoints(g, 'D', [[5, 6], [10, 6], [6, 8], [9, 8]]);
      // Stem base
      paintRect(g, 'S', 6, 13, 9, 14);
    },
  ),

  // ── 19. MARACAS PAIR ───────────────────────────────────────────
  makeTemplate(
    'maracas_pair_16',
    'Pair of colorful maracas with round shells, handles, and band accents.',
    {
      L: { name: 'left_shell', role: 'body' },
      R: { name: 'right_shell', role: 'head' },
      H: { name: 'handles', role: 'arm' },
      A: { name: 'decorative_bands', role: 'accessory' },
    },
    {
      body: C.red,
      head: C.green,
      arm: C.wood,
      accessory: C.gold,
    },
    (g) => {
      // Left maraca shell
      paintRect(g, 'L', 2, 3, 5, 7);
      paintH(g, 'L', 2, 3, 4);
      paintH(g, 'L', 8, 3, 4);
      // Left band
      paintH(g, 'A', 5, 2, 5);
      // Left handle
      paintV(g, 'H', 3, 9, 13);
      paintV(g, 'H', 4, 9, 13);
      // Right maraca shell
      paintRect(g, 'R', 10, 3, 13, 7);
      paintH(g, 'R', 2, 11, 12);
      paintH(g, 'R', 8, 11, 12);
      // Right band
      paintH(g, 'A', 5, 10, 13);
      // Right handle
      paintV(g, 'H', 11, 9, 13);
      paintV(g, 'H', 12, 9, 13);
    },
  ),

  // ── 20. VINYL RECORD ───────────────────────────────────────────
  makeTemplate(
    'vinyl_record_16',
    'Vinyl LP record with grooves, center label, and sleeve edge.',
    {
      V: { name: 'vinyl_disc', role: 'body' },
      G: { name: 'groove_rings', role: 'head' },
      L: { name: 'center_label', role: 'accessory' },
      S: { name: 'sleeve_edge', role: 'arm' },
      H: { name: 'spindle_hole', role: 'eye' },
    },
    {
      body: C.black,
      head: C.darkMetal,
      accessory: C.red,
      arm: C.paper,
      eye: C.ivory,
    },
    (g) => {
      // Sleeve (partially behind)
      paintRect(g, 'S', 1, 2, 3, 14);
      paintV(g, 'S', 4, 3, 13);
      // Vinyl disc (circular)
      paintH(g, 'V', 2, 7, 12);
      paintH(g, 'V', 3, 5, 13);
      paintRect(g, 'V', 4, 4, 14, 12);
      paintH(g, 'V', 13, 5, 13);
      paintH(g, 'V', 14, 7, 12);
      // Groove rings
      paintPoints(g, 'G', [[6, 4], [10, 4], [5, 6], [13, 6], [5, 10], [13, 10], [6, 12], [10, 12]]);
      // Center label
      paintRect(g, 'L', 8, 7, 10, 9);
      // Spindle hole
      paintPoints(g, 'H', [[9, 8]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'MUSIC_BATCH1_TEMPLATES',
    schemes: 'MUSIC_BATCH1_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
