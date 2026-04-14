/**
 * Music & Instruments batch 3.
 * 20 original 16x16 templates — world music + electronic + accessories.
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
  purple:    { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },
};

const templates: CompactTemplate[] = [
  // ── 1. SITAR ─────────────────────────────────────────────────────
  makeTemplate(
    'sitar_16',
    'Indian sitar with gourd resonator, long neck, sympathetic strings, and tuning pegs.',
    {
      G: { name: 'gourd_body', role: 'body' },
      N: { name: 'long_neck', role: 'arm' },
      S: { name: 'main_strings', role: 'accessory' },
      P: { name: 'tuning_pegs', role: 'head' },
      F: { name: 'frets_bridge', role: 'belt' },
    },
    {
      body: C.orange,
      arm: C.wood,
      accessory: C.gold,
      head: C.darkWood,
      belt: C.brass,
    },
    (g) => {
      // Tuning pegs (top)
      paintPoints(g, 'P', [[5, 1], [6, 1], [9, 1], [10, 1]]);
      paintPoints(g, 'P', [[5, 2], [10, 2]]);
      // Long neck
      paintRect(g, 'N', 7, 2, 8, 8);
      // Frets along neck
      paintPoints(g, 'F', [[6, 3], [9, 3], [6, 5], [9, 5], [6, 7], [9, 7]]);
      // Strings
      paintV(g, 'S', 7, 2, 13);
      paintV(g, 'S', 8, 2, 13);
      // Gourd resonator (large, round)
      paintRect(g, 'G', 4, 9, 11, 13);
      paintH(g, 'G', 8, 5, 10);
      paintH(g, 'G', 14, 5, 10);
      // Bridge
      paintH(g, 'F', 10, 5, 10);
    },
  ),

  // ── 2. BAGPIPES ──────────────────────────────────────────────────
  makeTemplate(
    'bagpipes_16',
    'Scottish bagpipes with bag, chanter, drone pipes, and blowpipe.',
    {
      B: { name: 'bag', role: 'body' },
      D: { name: 'drone_pipes', role: 'head' },
      C: { name: 'chanter', role: 'arm' },
      W: { name: 'blowpipe', role: 'accessory' },
      T: { name: 'tartan_cover', role: 'belt' },
    },
    {
      body: C.leather,
      head: C.darkWood,
      arm: C.wood,
      accessory: C.darkWood,
      belt: C.red,
    },
    (g) => {
      // Drone pipes (tall, top)
      paintV(g, 'D', 5, 1, 6);
      paintV(g, 'D', 7, 1, 5);
      paintV(g, 'D', 9, 1, 6);
      // Drone tops (decorative caps)
      paintPoints(g, 'D', [[4, 1], [6, 1], [8, 1], [10, 1]]);
      // Bag (large, rounded)
      paintRect(g, 'B', 3, 7, 11, 12);
      paintH(g, 'B', 6, 4, 10);
      paintH(g, 'B', 13, 4, 10);
      // Tartan cover (stripes on bag)
      paintH(g, 'T', 8, 4, 10);
      paintH(g, 'T', 10, 4, 10);
      paintV(g, 'T', 6, 7, 12);
      paintV(g, 'T', 9, 7, 12);
      // Chanter (going down from bag)
      paintV(g, 'C', 7, 13, 14);
      paintV(g, 'C', 8, 13, 14);
      // Blowpipe (extends to left)
      paintH(g, 'W', 9, 1, 3);
    },
  ),

  // ── 3. PAN FLUTE ─────────────────────────────────────────────────
  makeTemplate(
    'pan_flute_16',
    'Multi-tube pan flute with graduated bamboo pipes and binding cord.',
    {
      P: { name: 'bamboo_pipes', role: 'body' },
      B: { name: 'binding_cord', role: 'head' },
      O: { name: 'pipe_openings', role: 'accessory' },
      D: { name: 'decorative_wrap', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.red,
      accessory: C.black,
      arm: C.gold,
    },
    (g) => {
      // Graduated pipes (tallest on left)
      paintV(g, 'P', 2, 2, 13);
      paintV(g, 'P', 3, 2, 13);
      paintV(g, 'P', 4, 3, 13);
      paintV(g, 'P', 5, 3, 13);
      paintV(g, 'P', 6, 4, 13);
      paintV(g, 'P', 7, 4, 13);
      paintV(g, 'P', 8, 5, 13);
      paintV(g, 'P', 9, 5, 13);
      paintV(g, 'P', 10, 7, 13);
      paintV(g, 'P', 11, 7, 13);
      paintV(g, 'P', 12, 9, 13);
      paintV(g, 'P', 13, 9, 13);
      // Pipe openings (top of each pair)
      paintPoints(g, 'O', [[2, 2], [3, 2], [4, 3], [5, 3], [6, 4], [7, 4]]);
      paintPoints(g, 'O', [[8, 5], [9, 5], [10, 7], [11, 7], [12, 9], [13, 9]]);
      // Binding cord (horizontal bands)
      paintH(g, 'B', 11, 2, 13);
      // Decorative wrap
      paintH(g, 'D', 13, 2, 13);
    },
  ),

  // ── 4. KALIMBA ───────────────────────────────────────────────────
  makeTemplate(
    'kalimba_16',
    'African thumb piano (kalimba) with metal tines, wooden body, and sound hole.',
    {
      B: { name: 'wooden_body', role: 'body' },
      T: { name: 'metal_tines', role: 'head' },
      H: { name: 'sound_hole', role: 'eye' },
      R: { name: 'bridge_bar', role: 'accessory' },
      D: { name: 'decorative_pattern', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.metal,
      eye: C.black,
      accessory: C.brass,
      arm: C.green,
    },
    (g) => {
      // Wooden body (rounded rectangle)
      paintRect(g, 'B', 3, 3, 12, 14);
      paintH(g, 'B', 2, 4, 11);
      // Metal tines (graduated lengths, from center)
      paintV(g, 'T', 7, 4, 10);
      paintV(g, 'T', 8, 4, 10);
      paintV(g, 'T', 6, 4, 9);
      paintV(g, 'T', 9, 4, 9);
      paintV(g, 'T', 5, 4, 8);
      paintV(g, 'T', 10, 4, 8);
      paintV(g, 'T', 4, 4, 7);
      paintV(g, 'T', 11, 4, 7);
      // Bridge bar (across all tines)
      paintH(g, 'R', 4, 4, 11);
      // Sound hole
      paintRect(g, 'H', 7, 12, 8, 13);
      // Decorative pattern
      paintPoints(g, 'D', [[4, 12], [5, 13], [10, 13], [11, 12]]);
    },
  ),

  // ── 5. OCARINA ───────────────────────────────────────────────────
  makeTemplate(
    'ocarina_16',
    'Sweet potato ocarina with finger holes, mouthpiece, and wind channel.',
    {
      B: { name: 'ceramic_body', role: 'body' },
      H: { name: 'finger_holes', role: 'head' },
      M: { name: 'mouthpiece', role: 'arm' },
      D: { name: 'decoration', role: 'accessory' },
    },
    {
      body: C.teal,
      head: C.black,
      arm: C.blue,
      accessory: C.gold,
    },
    (g) => {
      // Main body (egg/potato shape)
      paintH(g, 'B', 5, 4, 11);
      paintRect(g, 'B', 3, 6, 12, 10);
      paintH(g, 'B', 11, 4, 11);
      paintH(g, 'B', 4, 5, 10);
      // Mouthpiece (left, narrow extension)
      paintRect(g, 'M', 1, 7, 3, 9);
      paintPoints(g, 'M', [[1, 8]]);
      // Finger holes (top row)
      paintPoints(g, 'H', [[5, 6], [7, 6], [9, 6], [11, 6]]);
      // Finger holes (bottom/thumb)
      paintPoints(g, 'H', [[6, 10], [8, 10]]);
      // Decorative pattern
      paintPoints(g, 'D', [[6, 8], [7, 7], [8, 8], [9, 7], [10, 8]]);
    },
  ),

  // ── 6. RECORDER ──────────────────────────────────────────────────
  makeTemplate(
    'recorder_16',
    'Wooden recorder (soprano) with tone holes, windway, and bell end.',
    {
      B: { name: 'recorder_body', role: 'body' },
      H: { name: 'tone_holes', role: 'head' },
      W: { name: 'windway_beak', role: 'arm' },
      E: { name: 'bell_end', role: 'accessory' },
      J: { name: 'joint_rings', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.black,
      arm: C.darkWood,
      accessory: C.wood,
      belt: C.ivory,
    },
    (g) => {
      // Windway/beak (top)
      paintRect(g, 'W', 7, 1, 8, 3);
      // Main body
      paintRect(g, 'B', 7, 4, 8, 12);
      // Joint rings
      paintH(g, 'J', 4, 6, 9);
      paintH(g, 'J', 8, 6, 9);
      // Tone holes (left side)
      paintPoints(g, 'H', [[6, 5], [6, 6], [6, 7], [6, 9], [6, 10], [6, 11]]);
      // Thumb hole (right)
      paintPoints(g, 'H', [[9, 6]]);
      // Bell end (slight flare)
      paintRect(g, 'E', 6, 13, 9, 14);
    },
  ),

  // ── 7. MELODICA ──────────────────────────────────────────────────
  makeTemplate(
    'melodica_16',
    'Keyboard melodica with blow tube, piano keys, and plastic body.',
    {
      B: { name: 'plastic_body', role: 'body' },
      K: { name: 'white_keys', role: 'head' },
      D: { name: 'black_keys', role: 'eye' },
      T: { name: 'blow_tube', role: 'arm' },
      M: { name: 'mouthpiece', role: 'accessory' },
    },
    {
      body: C.blue,
      head: C.ivory,
      eye: C.black,
      arm: C.teal,
      accessory: C.metal,
    },
    (g) => {
      // Body (horizontal keyboard shape)
      paintRect(g, 'B', 1, 5, 14, 10);
      paintH(g, 'B', 4, 2, 13);
      paintH(g, 'B', 11, 2, 13);
      // White keys (bottom portion)
      paintRect(g, 'K', 2, 8, 13, 10);
      // Black keys (alternating on top of white)
      paintPoints(g, 'D', [[3, 7], [4, 7], [6, 7], [7, 7], [9, 7], [10, 7], [12, 7]]);
      // Blow tube (extends from left)
      paintH(g, 'T', 7, 1, 1);
      paintV(g, 'T', 1, 7, 13);
      // Mouthpiece (end of tube)
      paintPoints(g, 'M', [[1, 13], [1, 14], [2, 14]]);
    },
  ),

  // ── 8. THEREMIN ──────────────────────────────────────────────────
  makeTemplate(
    'theremin_16',
    'Theremin electronic instrument with pitch antenna, volume loop, and cabinet.',
    {
      B: { name: 'cabinet_body', role: 'body' },
      P: { name: 'pitch_antenna', role: 'head' },
      V: { name: 'volume_loop', role: 'arm' },
      W: { name: 'sound_waves', role: 'accessory' },
      K: { name: 'control_panel', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.metal,
      arm: C.metal,
      accessory: C.teal,
      belt: C.brass,
    },
    (g) => {
      // Cabinet body
      paintRect(g, 'B', 4, 7, 11, 13);
      paintH(g, 'B', 14, 3, 12);
      // Control panel
      paintRect(g, 'K', 5, 8, 10, 10);
      paintPoints(g, 'K', [[6, 9], [8, 9], [10, 9]]);
      // Pitch antenna (tall, right side, vertical)
      paintV(g, 'P', 12, 1, 7);
      paintPoints(g, 'P', [[11, 1], [13, 1]]);
      // Volume loop (left side, horizontal loop)
      paintH(g, 'V', 9, 1, 4);
      paintPoints(g, 'V', [[1, 8], [1, 10], [2, 8], [2, 10]]);
      // Sound waves (emanating from antennas)
      paintPoints(g, 'W', [[14, 3], [14, 5], [13, 4]]);
      paintPoints(g, 'W', [[1, 7], [2, 7], [3, 11]]);
    },
  ),

  // ── 9. SYNTHESIZER KEYBOARD ──────────────────────────────────────
  makeTemplate(
    'synthesizer_keyboard_16',
    'Analog synthesizer with keys, knobs, patch cables, and oscilloscope screen.',
    {
      B: { name: 'synth_body', role: 'body' },
      K: { name: 'keyboard_keys', role: 'head' },
      N: { name: 'knob_panel', role: 'accessory' },
      S: { name: 'scope_screen', role: 'arm' },
      P: { name: 'patch_cables', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.ivory,
      accessory: C.red,
      arm: C.green,
      belt: C.orange,
    },
    (g) => {
      // Body (wide, angled)
      paintRect(g, 'B', 1, 3, 14, 13);
      paintH(g, 'B', 2, 2, 13);
      // Scope screen (top-left)
      paintRect(g, 'S', 2, 4, 5, 6);
      // Knob rows
      paintPoints(g, 'N', [[7, 4], [9, 4], [11, 4], [13, 4]]);
      paintPoints(g, 'N', [[7, 6], [9, 6], [11, 6], [13, 6]]);
      // Patch cable section
      paintPoints(g, 'P', [[2, 8], [4, 8], [6, 8], [8, 8], [10, 8], [12, 8]]);
      // Keyboard (bottom)
      paintRect(g, 'K', 2, 10, 13, 12);
      // Black keys
      paintPoints(g, 'B', [[3, 10], [4, 10], [6, 10], [7, 10], [9, 10], [10, 10], [12, 10]]);
    },
  ),

  // ── 10. DRUM MACHINE ─────────────────────────────────────────────
  makeTemplate(
    'drum_machine_16',
    'Classic drum machine with step sequencer pads, LED display, and knobs.',
    {
      B: { name: 'machine_body', role: 'body' },
      P: { name: 'trigger_pads', role: 'head' },
      D: { name: 'led_display', role: 'arm' },
      K: { name: 'rotary_knobs', role: 'accessory' },
      S: { name: 'step_buttons', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.red,
      arm: C.green,
      accessory: C.ivory,
      belt: C.orange,
    },
    (g) => {
      // Machine body
      paintRect(g, 'B', 1, 2, 14, 13);
      paintH(g, 'B', 1, 2, 13);
      // LED display
      paintRect(g, 'D', 2, 3, 6, 5);
      // Knobs row
      paintPoints(g, 'K', [[8, 3], [10, 3], [12, 3], [13, 3]]);
      // Trigger pads (2x4 grid)
      paintRect(g, 'P', 2, 7, 3, 8);
      paintRect(g, 'P', 5, 7, 6, 8);
      paintRect(g, 'P', 8, 7, 9, 8);
      paintRect(g, 'P', 11, 7, 12, 8);
      paintRect(g, 'P', 2, 10, 3, 11);
      paintRect(g, 'P', 5, 10, 6, 11);
      paintRect(g, 'P', 8, 10, 9, 11);
      paintRect(g, 'P', 11, 10, 12, 11);
      // Step sequencer buttons (bottom row)
      paintPoints(g, 'S', [[2, 13], [4, 13], [6, 13], [8, 13], [10, 13], [12, 13]]);
    },
  ),

  // ── 11. TURNTABLE DJ ─────────────────────────────────────────────
  makeTemplate(
    'turntable_dj_16',
    'DJ turntable with platter, tonearm, pitch slider, and start/stop button.',
    {
      B: { name: 'deck_body', role: 'body' },
      P: { name: 'platter', role: 'head' },
      A: { name: 'tonearm', role: 'arm' },
      S: { name: 'pitch_slider', role: 'accessory' },
      D: { name: 'spindle_dot', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.black,
      arm: C.metal,
      accessory: C.red,
      belt: C.ivory,
    },
    (g) => {
      // Deck body
      paintRect(g, 'B', 1, 2, 14, 13);
      // Platter (circular, left-center)
      paintH(g, 'P', 3, 3, 9);
      paintRect(g, 'P', 2, 4, 10, 11);
      paintH(g, 'P', 12, 3, 9);
      // Spindle center
      paintPoints(g, 'D', [[6, 7], [6, 8]]);
      // Tonearm (top-right, L-shape)
      paintH(g, 'A', 3, 11, 13);
      paintV(g, 'A', 13, 3, 9);
      paintPoints(g, 'A', [[12, 9], [11, 10]]);
      // Pitch slider (right edge)
      paintV(g, 'S', 12, 5, 8);
      paintPoints(g, 'S', [[12, 6]]);
      // Start/stop button
      paintPoints(g, 'S', [[12, 11], [13, 11]]);
    },
  ),

  // ── 12. SPEAKER MONITOR ──────────────────────────────────────────
  makeTemplate(
    'speaker_monitor_16',
    'Studio monitor speaker with woofer, tweeter, bass port, and front grille.',
    {
      B: { name: 'cabinet', role: 'body' },
      W: { name: 'woofer_cone', role: 'head' },
      T: { name: 'tweeter', role: 'accessory' },
      P: { name: 'bass_port', role: 'arm' },
      G: { name: 'front_panel', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.paper,
      accessory: C.metal,
      arm: C.black,
      belt: C.darkMetal,
    },
    (g) => {
      // Cabinet
      paintRect(g, 'B', 3, 1, 12, 14);
      // Front panel (inset)
      paintRect(g, 'G', 4, 2, 11, 13);
      // Tweeter (small, top)
      paintRect(g, 'T', 7, 3, 8, 4);
      // Woofer (larger, center)
      paintRect(g, 'W', 5, 6, 10, 11);
      paintH(g, 'W', 5, 6, 9);
      paintH(g, 'W', 12, 6, 9);
      // Woofer dust cap (center)
      paintRect(g, 'G', 7, 8, 8, 9);
      // Bass port (bottom)
      paintRect(g, 'P', 6, 13, 9, 13);
    },
  ),

  // ── 13. AUDIO INTERFACE ──────────────────────────────────────────
  makeTemplate(
    'audio_interface_16',
    'Desktop audio interface with input gain knobs, phantom power, and LED meters.',
    {
      B: { name: 'interface_body', role: 'body' },
      K: { name: 'gain_knobs', role: 'head' },
      L: { name: 'led_meters', role: 'arm' },
      I: { name: 'input_jacks', role: 'accessory' },
      P: { name: 'phantom_button', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.ivory,
      arm: C.green,
      accessory: C.metal,
      belt: C.red,
    },
    (g) => {
      // Body (desktop form factor, wider than tall)
      paintRect(g, 'B', 1, 5, 14, 11);
      paintH(g, 'B', 4, 2, 13);
      paintH(g, 'B', 12, 2, 13);
      // Gain knobs (top row)
      paintRect(g, 'K', 3, 6, 4, 7);
      paintRect(g, 'K', 6, 6, 7, 7);
      // LED meters (right side)
      paintV(g, 'L', 10, 6, 10);
      paintV(g, 'L', 11, 6, 10);
      paintV(g, 'L', 12, 7, 10);
      // Input jacks (front panel, bottom)
      paintPoints(g, 'I', [[3, 10], [4, 10], [6, 10], [7, 10]]);
      // Phantom power button
      paintPoints(g, 'P', [[9, 6], [9, 7]]);
      // Output section (right)
      paintPoints(g, 'I', [[13, 8], [13, 9]]);
    },
  ),

  // ── 14. GUITAR PICK ──────────────────────────────────────────────
  makeTemplate(
    'guitar_pick_16',
    'Oversized guitar pick/plectrum with grip texture and tip.',
    {
      B: { name: 'pick_body', role: 'body' },
      T: { name: 'pick_tip', role: 'head' },
      G: { name: 'grip_texture', role: 'accessory' },
      E: { name: 'edge_bevel', role: 'arm' },
    },
    {
      body: C.red,
      head: C.orange,
      accessory: C.gold,
      arm: C.darkWood,
    },
    (g) => {
      // Pick body (triangular, rounded)
      paintH(g, 'B', 3, 4, 11);
      paintRect(g, 'B', 3, 4, 12, 7);
      paintRect(g, 'B', 4, 8, 11, 9);
      paintRect(g, 'B', 5, 10, 10, 11);
      // Tip (bottom point)
      paintRect(g, 'T', 6, 12, 9, 13);
      paintPoints(g, 'T', [[7, 14], [8, 14]]);
      // Grip texture (center dots)
      paintPoints(g, 'G', [[6, 5], [8, 5], [10, 5], [7, 7], [9, 7], [8, 9]]);
      // Edge bevel
      paintV(g, 'E', 3, 4, 7);
      paintV(g, 'E', 12, 4, 7);
      paintPoints(g, 'E', [[4, 8], [11, 8], [5, 10], [10, 10]]);
    },
  ),

  // ── 15. DRUM STICKS PAIR ─────────────────────────────────────────
  makeTemplate(
    'drum_sticks_pair_16',
    'Pair of crossed drumsticks with wood grain, tips, and grip wraps.',
    {
      L: { name: 'left_stick', role: 'body' },
      R: { name: 'right_stick', role: 'head' },
      T: { name: 'stick_tips', role: 'accessory' },
      G: { name: 'grip_wraps', role: 'arm' },
    },
    {
      body: C.wood,
      head: C.wood,
      accessory: C.ivory,
      arm: C.red,
    },
    (g) => {
      // Left stick (diagonal, top-left to bottom-right)
      paintPoints(g, 'L', [[2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 12], [13, 13]]);
      // Right stick (diagonal, top-right to bottom-left)
      paintPoints(g, 'R', [[13, 2], [12, 3], [11, 4], [10, 5], [9, 6], [8, 7], [7, 8], [6, 9], [5, 10], [4, 11], [3, 12], [2, 13]]);
      // Tips (rounded ends)
      paintPoints(g, 'T', [[1, 1], [2, 1], [1, 2]]);
      paintPoints(g, 'T', [[14, 1], [13, 1], [14, 2]]);
      // Grip wraps (near bottom)
      paintPoints(g, 'G', [[11, 11], [12, 12]]);
      paintPoints(g, 'G', [[3, 12], [4, 11]]);
    },
  ),

  // ── 16. SHEET MUSIC SCROLL ───────────────────────────────────────
  makeTemplate(
    'sheet_music_scroll_16',
    'Rolled sheet music scroll with musical notation, staff lines, and ribbon tie.',
    {
      P: { name: 'paper_scroll', role: 'body' },
      S: { name: 'staff_lines', role: 'head' },
      N: { name: 'music_notes', role: 'arm' },
      R: { name: 'ribbon_tie', role: 'accessory' },
      E: { name: 'rolled_edge', role: 'belt' },
    },
    {
      body: C.paper,
      head: C.darkMetal,
      arm: C.black,
      accessory: C.red,
      belt: C.leather,
    },
    (g) => {
      // Paper scroll (main sheet)
      paintRect(g, 'P', 3, 2, 12, 12);
      // Rolled top edge
      paintRect(g, 'E', 3, 1, 12, 2);
      // Staff lines
      paintH(g, 'S', 4, 4, 11);
      paintH(g, 'S', 5, 4, 11);
      paintH(g, 'S', 6, 4, 11);
      paintH(g, 'S', 7, 4, 11);
      paintH(g, 'S', 8, 4, 11);
      // Music notes
      paintPoints(g, 'N', [[5, 4], [7, 5], [6, 7], [9, 4], [10, 6], [8, 8]]);
      // Second staff
      paintH(g, 'S', 10, 4, 11);
      paintH(g, 'S', 11, 4, 11);
      paintPoints(g, 'N', [[5, 10], [8, 10], [10, 11]]);
      // Rolled bottom
      paintRect(g, 'E', 3, 13, 12, 14);
      // Ribbon tie
      paintPoints(g, 'R', [[1, 7], [2, 7], [2, 8], [1, 8]]);
      paintPoints(g, 'R', [[1, 9], [0, 8]]);
    },
  ),

  // ── 17. MUSIC BOX ────────────────────────────────────────────────
  makeTemplate(
    'music_box_16',
    'Mechanical music box with open lid, rotating cylinder, and comb mechanism.',
    {
      B: { name: 'box_body', role: 'body' },
      L: { name: 'open_lid', role: 'head' },
      C: { name: 'cylinder_drum', role: 'accessory' },
      M: { name: 'comb_mechanism', role: 'arm' },
      D: { name: 'decorative_inlay', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.wood,
      accessory: C.brass,
      arm: C.metal,
      belt: C.gold,
    },
    (g) => {
      // Open lid (tilted back)
      paintRect(g, 'L', 2, 1, 13, 4);
      paintH(g, 'L', 5, 3, 12);
      // Box body
      paintRect(g, 'B', 2, 6, 13, 13);
      paintH(g, 'B', 14, 3, 12);
      // Cylinder drum (inside)
      paintRect(g, 'C', 4, 8, 7, 10);
      // Comb mechanism (right side inside)
      paintRect(g, 'M', 9, 8, 12, 10);
      paintPoints(g, 'M', [[9, 8], [10, 8], [11, 8], [12, 8]]);
      // Decorative inlay (on front of box)
      paintRect(g, 'D', 5, 12, 10, 12);
      // Hinge
      paintPoints(g, 'B', [[2, 5], [13, 5]]);
    },
  ),

  // ── 18. CONDUCTOR BATON ──────────────────────────────────────────
  makeTemplate(
    'conductor_baton_16',
    'Orchestra conductor baton with cork grip, tapered shaft, and tip.',
    {
      S: { name: 'shaft', role: 'body' },
      G: { name: 'cork_grip', role: 'head' },
      T: { name: 'baton_tip', role: 'accessory' },
      B: { name: 'balance_point', role: 'arm' },
    },
    {
      body: C.ivory,
      head: C.leather,
      accessory: C.metal,
      arm: C.gold,
    },
    (g) => {
      // Cork grip (bottom, thicker)
      paintRect(g, 'G', 10, 11, 12, 14);
      paintPoints(g, 'G', [[9, 13], [13, 13], [9, 12]]);
      // Balance point
      paintPoints(g, 'B', [[9, 10], [10, 10]]);
      // Shaft (diagonal, thin)
      paintPoints(g, 'S', [[10, 10], [9, 9], [9, 8], [8, 7], [8, 6], [7, 5], [7, 4], [6, 3], [6, 2]]);
      paintPoints(g, 'S', [[11, 10], [10, 9], [10, 8], [9, 7], [9, 6], [8, 5], [8, 4], [7, 3], [7, 2]]);
      // Tip
      paintPoints(g, 'T', [[5, 1], [6, 1]]);
    },
  ),

  // ── 19. CAJON DRUM ───────────────────────────────────────────────
  makeTemplate(
    'cajon_drum_16',
    'Peruvian cajon box drum with striking surface, sound hole, and rubber feet.',
    {
      B: { name: 'box_body', role: 'body' },
      F: { name: 'striking_face', role: 'head' },
      H: { name: 'sound_hole', role: 'eye' },
      S: { name: 'screws', role: 'accessory' },
      R: { name: 'rubber_feet', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.paper,
      eye: C.black,
      accessory: C.metal,
      belt: C.darkMetal,
    },
    (g) => {
      // Box body (visible sides for 3/4 perspective)
      paintRect(g, 'B', 2, 2, 12, 13);
      // Right side panel (darker for depth)
      paintRect(g, 'B', 12, 3, 13, 12);
      // Striking face (front)
      paintRect(g, 'F', 3, 3, 11, 12);
      // Sound hole (rear, visible on right side)
      paintRect(g, 'H', 12, 6, 13, 9);
      // Corner screws
      paintPoints(g, 'S', [[3, 3], [11, 3], [3, 12], [11, 12]]);
      paintPoints(g, 'S', [[5, 3], [9, 3], [5, 12], [9, 12]]);
      // Rubber feet
      paintPoints(g, 'R', [[3, 14], [4, 14], [10, 14], [11, 14]]);
    },
  ),

  // ── 20. BALALAIKA ────────────────────────────────────────────────
  makeTemplate(
    'balalaika_16',
    'Russian balalaika with triangular body, three strings, and decorated soundhole.',
    {
      B: { name: 'triangular_body', role: 'body' },
      N: { name: 'neck_fretboard', role: 'arm' },
      H: { name: 'headstock', role: 'head' },
      S: { name: 'strings', role: 'accessory' },
      D: { name: 'soundhole_decoration', role: 'belt' },
    },
    {
      body: C.wood,
      arm: C.darkWood,
      head: C.darkWood,
      accessory: C.gold,
      belt: C.red,
    },
    (g) => {
      // Headstock
      paintRect(g, 'H', 6, 1, 9, 2);
      paintPoints(g, 'H', [[5, 1], [10, 2]]);
      // Neck
      paintRect(g, 'N', 7, 3, 8, 6);
      // Strings on neck
      paintV(g, 'S', 7, 3, 13);
      paintV(g, 'S', 8, 3, 13);
      // Triangular body (widening downward)
      paintRect(g, 'B', 6, 7, 9, 7);
      paintRect(g, 'B', 5, 8, 10, 9);
      paintRect(g, 'B', 4, 10, 11, 11);
      paintRect(g, 'B', 3, 12, 12, 13);
      paintH(g, 'B', 14, 4, 11);
      // Soundhole decoration
      paintPoints(g, 'D', [[7, 9], [8, 9]]);
      paintPoints(g, 'D', [[6, 10], [9, 10]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'furniture',
  exportNames: {
    templates: 'MUSIC_BATCH3_TEMPLATES',
    schemes: 'MUSIC_BATCH3_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
