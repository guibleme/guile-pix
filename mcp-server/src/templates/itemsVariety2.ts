/**
 * 16x16 RPG adventure item templates — BATCH 2 (20 new items).
 * Target density: 28-50%. DB16 palette only. 1-2px margin on edges.
 * Min 2px width for handles/shafts.
 *
 * Templates:
 *  1. health_potion     - red potion bottle
 *  2. mana_potion       - blue potion bottle
 *  3. scroll_rolled     - rolled parchment
 *  4. torch_lit         - burning torch
 *  5. compass_nav       - navigation compass
 *  6. rope_coil         - coiled rope
 *  7. lantern_oil       - oil lantern
 *  8. treasure_key      - ornate golden key
 *  9. magic_book        - glowing spellbook
 * 10. crystal_ball      - fortune telling orb
 * 11. hourglass_item    - sand timer
 * 12. treasure_map      - folded map with X
 * 13. lockpick_set      - thief's lockpick set
 * 14. fishing_rod_b2    - rod with line and hook
 * 15. magnifying_glass  - detective lens
 * 16. round_bomb        - round bomb with fuse
 * 17. anchor_item       - small anchor
 * 18. telescope_item    - handheld spyglass
 * 19. music_box         - small ornate box
 * 20. grapple_rope      - hook on rope
 */

import { SpriteTemplate, ColorScheme } from './humanoid16.js';

// ── helpers ──────────────────────────────────────────────────

function hLine(y: number, x0: number, x1: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let x = x0; x <= x1; x++) out.push([x, y]);
  return out;
}

function vLine(x: number, y0: number, y1: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let y = y0; y <= y1; y++) out.push([x, y]);
  return out;
}

function rect(x0: number, y0: number, x1: number, y1: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) out.push([x, y]);
  }
  return out;
}

function border(x0: number, y0: number, x1: number, y1: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let x = x0; x <= x1; x++) { out.push([x, y0]); out.push([x, y1]); }
  for (let y = y0 + 1; y < y1; y++) { out.push([x0, y]); out.push([x1, y]); }
  return out;
}

// ── base tone palette (DB16) ─────────────────────────────────

const ITEM2_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  belt:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  leg:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof ITEM2_BASE>): ColorScheme {
  return { name, mapping: { ...ITEM2_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. HEALTH_POTION — Red potion bottle with cork
// ════════════════════════════════════════════════════════════
export const HEALTH_POTION_16: SpriteTemplate = {
  name: 'health_potion_16', width: 16, height: 16,
  description: 'Red healing potion in a round glass bottle with cork stopper.',
  regions: [
    // Cork stopper
    { name: 'cork', role: 'arm', pixels: [
      ...hLine(2, 7, 8),
      ...hLine(3, 7, 8),
    ]},
    // Bottle neck
    { name: 'neck', role: 'body', pixels: [
      ...vLine(7, 4, 5),
      ...vLine(8, 4, 5),
    ]},
    // Bottle body outline
    { name: 'bottle_outline', role: 'boot', pixels: [
      ...hLine(6, 5, 10),
      [4, 7], [11, 7],
      [4, 8], [11, 8],
      [4, 9], [11, 9],
      [4, 10], [11, 10],
      [4, 11], [11, 11],
      ...hLine(12, 5, 10),
    ]},
    // Red liquid fill
    { name: 'liquid', role: 'leg', pixels: [
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
      ...hLine(9, 5, 10),
      ...hLine(10, 5, 10),
      ...hLine(11, 5, 10),
    ]},
    // Glass highlight
    { name: 'highlight', role: 'eye', pixels: [
      [5, 7], [5, 8],
    ]},
    // Label / cross symbol
    { name: 'label', role: 'accessory', pixels: [
      [7, 9], [8, 9],
      [7, 10], [8, 10],
    ]},
  ],
};

export const HEALTH_POTION_COLORS = scheme('health_potion_default', {
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Cork brown
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Glass tint
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Dark outline
  leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Red liquid
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },     // Glass shine
  accessory: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },     // White cross
});

// ════════════════════════════════════════════════════════════
// 2. MANA_POTION — Blue potion bottle with cork
// ════════════════════════════════════════════════════════════
export const MANA_POTION_16: SpriteTemplate = {
  name: 'mana_potion_16', width: 16, height: 16,
  description: 'Blue mana potion in a round glass bottle with cork stopper.',
  regions: [
    // Cork stopper
    { name: 'cork', role: 'arm', pixels: [
      ...hLine(2, 7, 8),
      ...hLine(3, 7, 8),
    ]},
    // Bottle neck
    { name: 'neck', role: 'body', pixels: [
      ...vLine(7, 4, 5),
      ...vLine(8, 4, 5),
    ]},
    // Bottle body outline
    { name: 'bottle_outline', role: 'boot', pixels: [
      ...hLine(6, 5, 10),
      [4, 7], [11, 7],
      [4, 8], [11, 8],
      [4, 9], [11, 9],
      [4, 10], [11, 10],
      [4, 11], [11, 11],
      ...hLine(12, 5, 10),
    ]},
    // Blue liquid fill
    { name: 'liquid', role: 'belt', pixels: [
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
      ...hLine(9, 5, 10),
      ...hLine(10, 5, 10),
      ...hLine(11, 5, 10),
    ]},
    // Glass highlight
    { name: 'highlight', role: 'eye', pixels: [
      [5, 7], [5, 8],
    ]},
    // Star sparkle
    { name: 'sparkle', role: 'accessory', pixels: [
      [8, 8], [7, 9], [8, 9], [9, 9], [8, 10],
    ]},
  ],
};

export const MANA_POTION_COLORS = scheme('mana_potion_default', {
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Cork brown
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Glass tint
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Dark outline
  belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue liquid
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },     // Glass shine
  accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Sparkle white-cyan
});

// ════════════════════════════════════════════════════════════
// 3. SCROLL_ROLLED — Rolled parchment with ribbon
// ════════════════════════════════════════════════════════════
export const SCROLL_ROLLED_16: SpriteTemplate = {
  name: 'scroll_rolled_16', width: 16, height: 16,
  description: 'Rolled parchment scroll with wooden end-caps and tied ribbon.',
  regions: [
    // Top wooden cap
    { name: 'cap_top', role: 'arm', pixels: [
      ...hLine(3, 4, 11),
      ...hLine(4, 4, 11),
    ]},
    // Parchment roll body
    { name: 'parchment', role: 'head', pixels: [
      ...hLine(5, 5, 10),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
      ...hLine(9, 5, 10),
      ...hLine(10, 5, 10),
    ]},
    // Bottom wooden cap
    { name: 'cap_bottom', role: 'arm', pixels: [
      ...hLine(11, 4, 11),
      ...hLine(12, 4, 11),
    ]},
    // Ribbon band
    { name: 'ribbon', role: 'leg', pixels: [
      ...hLine(7, 5, 10),
    ]},
    // Ribbon tail
    { name: 'ribbon_tail', role: 'leg', pixels: [
      [10, 8], [11, 8], [11, 9],
    ]},
    // Parchment highlight
    { name: 'highlight', role: 'eye', pixels: [
      [6, 5], [6, 6],
    ]},
  ],
};

export const SCROLL_ROLLED_COLORS = scheme('scroll_rolled_default', {
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Wooden caps
  head: { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },          // Parchment cream
  leg:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },          // Red ribbon
  eye:  { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },          // Parchment shine
});

// ════════════════════════════════════════════════════════════
// 4. TORCH_LIT — Burning torch with flame
// ════════════════════════════════════════════════════════════
export const TORCH_LIT_16: SpriteTemplate = {
  name: 'torch_lit_16', width: 16, height: 16,
  description: 'Burning wooden torch with wrapped handle and flickering flame.',
  regions: [
    // Flame top
    { name: 'flame_tip', role: 'eye', pixels: [
      [7, 1], [8, 1],
      [7, 2], [8, 2],
    ]},
    // Flame body
    { name: 'flame_body', role: 'head', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [7, 5], [8, 5],
    ]},
    // Torch head (oiled wrap)
    { name: 'torch_head', role: 'leg', pixels: [
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    // Handle shaft
    { name: 'handle', role: 'arm', pixels: [
      ...vLine(7, 8, 13),
      ...vLine(8, 8, 13),
    ]},
    // Handle wrap bands
    { name: 'wrap', role: 'boot', pixels: [
      [7, 9], [8, 9],
      [7, 11], [8, 11],
    ]},
  ],
};

export const TORCH_LIT_COLORS = scheme('torch_lit_default', {
  eye:  { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },          // Bright flame tip
  head: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },          // Orange flame
  leg:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Oil-soaked wrap
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Wooden handle
  boot: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },          // Dark wrap bands
});

// ════════════════════════════════════════════════════════════
// 5. COMPASS_NAV — Navigation compass with needle
// ════════════════════════════════════════════════════════════
export const COMPASS_NAV_16: SpriteTemplate = {
  name: 'compass_nav_16', width: 16, height: 16,
  description: 'Brass navigation compass with cardinal directions and spinning needle.',
  regions: [
    // Compass outer ring (brass)
    { name: 'ring', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 5), ...hLine(4, 10, 11),
      [3, 5], [3, 6], [12, 5], [12, 6],
      [3, 9], [3, 10], [12, 9], [12, 10],
      ...hLine(12, 5, 10),
      ...hLine(11, 4, 5), ...hLine(11, 10, 11),
    ]},
    // Compass face (white)
    { name: 'face', role: 'eye', pixels: [
      ...hLine(4, 6, 9),
      ...rect(4, 5, 11, 10),
    ]},
    // Needle red (north)
    { name: 'needle_n', role: 'leg', pixels: [
      [7, 5], [8, 5],
      [7, 6], [8, 6],
      [7, 7], [8, 7],
    ]},
    // Needle dark (south)
    { name: 'needle_s', role: 'boot', pixels: [
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
    ]},
    // Cardinal markers (N/S/E/W dots)
    { name: 'cardinals', role: 'arm', pixels: [
      [7, 4], [8, 4],     // N
      [7, 11], [8, 11],   // S
      [4, 7], [4, 8],     // W
      [11, 7], [11, 8],   // E
    ]},
    // Center pivot
    { name: 'pivot', role: 'accessory', pixels: [
      [7, 7], [8, 8],
    ]},
  ],
};

export const COMPASS_NAV_COLORS = scheme('compass_nav_default', {
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },          // Brass ring
  eye:  { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },          // White face
  leg:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },          // Red needle
  boot: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },          // Dark needle
  arm:  { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },          // Cardinal marks
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold pivot
});

// ════════════════════════════════════════════════════════════
// 6. ROPE_COIL — Coiled rope bundle
// ════════════════════════════════════════════════════════════
export const ROPE_COIL_16: SpriteTemplate = {
  name: 'rope_coil_16', width: 16, height: 16,
  description: 'Neatly coiled bundle of sturdy rope with visible loops.',
  regions: [
    // Top loops
    { name: 'top_loops', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      [4, 4], [5, 4], [10, 4], [11, 4],
    ]},
    // Left coil stack
    { name: 'left_coil', role: 'arm', pixels: [
      ...vLine(4, 5, 10),
      ...vLine(5, 5, 10),
    ]},
    // Right coil stack
    { name: 'right_coil', role: 'arm', pixels: [
      ...vLine(10, 5, 10),
      ...vLine(11, 5, 10),
    ]},
    // Inner coil fill
    { name: 'inner', role: 'body', pixels: [
      ...rect(6, 5, 9, 10),
    ]},
    // Bottom loops
    { name: 'bottom_loops', role: 'head', pixels: [
      ...hLine(11, 5, 10),
      [4, 11], [11, 11],
    ]},
    // Rope end tail
    { name: 'tail', role: 'boot', pixels: [
      [8, 12], [9, 12], [9, 13],
    ]},
    // Highlight strands
    { name: 'highlight', role: 'eye', pixels: [
      [5, 6], [5, 8],
    ]},
  ],
};

export const ROPE_COIL_COLORS = scheme('rope_coil_default', {
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },          // Rope light
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Rope mid
  body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Inner strands
  boot: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Tail end
  eye:  { shadow: '#d2aa99', base: '#d2aa99', highlight: '#deeed6' },          // Light strand
});

// ════════════════════════════════════════════════════════════
// 7. LANTERN_OIL — Oil lantern with glow
// ════════════════════════════════════════════════════════════
export const LANTERN_OIL_16: SpriteTemplate = {
  name: 'lantern_oil_16', width: 16, height: 16,
  description: 'Hanging oil lantern with metal frame, glass pane, and warm glow.',
  regions: [
    // Handle loop
    { name: 'handle', role: 'boot', pixels: [
      [7, 1], [8, 1],
      [6, 2], [9, 2],
      [7, 2], [8, 2],
    ]},
    // Top cap
    { name: 'cap', role: 'body', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 6, 9),
    ]},
    // Metal frame sides
    { name: 'frame', role: 'body', pixels: [
      ...vLine(5, 5, 10),
      ...vLine(10, 5, 10),
      [6, 5], [9, 5],
      [6, 10], [9, 10],
    ]},
    // Glass pane (warm glow)
    { name: 'glass', role: 'head', pixels: [
      ...rect(6, 6, 9, 9),
    ]},
    // Flame center
    { name: 'flame', role: 'eye', pixels: [
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    // Bottom base
    { name: 'base', role: 'boot', pixels: [
      ...hLine(11, 5, 10),
      ...hLine(12, 6, 9),
    ]},
  ],
};

export const LANTERN_OIL_COLORS = scheme('lantern_oil_default', {
  boot: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },          // Dark iron frame
  body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },          // Metal cap/frame
  head: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },          // Warm glass glow
  eye:  { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },          // Bright flame
});

// ════════════════════════════════════════════════════════════
// 8. TREASURE_KEY — Ornate golden key
// ════════════════════════════════════════════════════════════
export const TREASURE_KEY_16: SpriteTemplate = {
  name: 'treasure_key_16', width: 16, height: 16,
  description: 'Ornate golden key with decorative bow and notched bit.',
  regions: [
    // Key bow (circular top)
    { name: 'bow', role: 'head', pixels: [
      ...hLine(2, 6, 9),
      [5, 3], [10, 3],
      [5, 4], [10, 4],
      [5, 5], [10, 5],
      ...hLine(6, 6, 9),
    ]},
    // Bow inner hole
    { name: 'bow_hole', role: 'boot', pixels: [
      [7, 3], [8, 3],
      [7, 4], [8, 4],
      [7, 5], [8, 5],
    ]},
    // Key shaft
    { name: 'shaft', role: 'head', pixels: [
      ...vLine(7, 7, 12),
      ...vLine(8, 7, 12),
    ]},
    // Key bit (teeth)
    { name: 'teeth', role: 'arm', pixels: [
      [9, 10], [10, 10],
      [9, 11],
      [9, 12], [10, 12],
    ]},
    // Decorative gem on bow
    { name: 'gem', role: 'accessory', pixels: [
      [7, 3], [8, 3],
    ]},
    // Shaft highlight
    { name: 'highlight', role: 'eye', pixels: [
      [7, 8], [7, 10],
    ]},
  ],
};

export const TREASURE_KEY_COLORS = scheme('treasure_key_default', {
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },          // Gold body
  arm:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },          // Gold teeth
  boot: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },          // Dark bow hole
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red gem
  eye:  { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },          // Gold shine
});

// ════════════════════════════════════════════════════════════
// 9. MAGIC_BOOK — Glowing spellbook
// ════════════════════════════════════════════════════════════
export const MAGIC_BOOK_16: SpriteTemplate = {
  name: 'magic_book_16', width: 16, height: 16,
  description: 'Leather-bound spellbook with glowing rune on cover and metal clasp.',
  regions: [
    // Book spine
    { name: 'spine', role: 'boot', pixels: [
      ...vLine(3, 3, 12),
      ...vLine(4, 3, 12),
    ]},
    // Book cover (leather)
    { name: 'cover', role: 'leg', pixels: [
      ...hLine(3, 5, 12),
      ...vLine(12, 4, 11),
      ...hLine(12, 5, 12),
    ]},
    // Pages (visible edge)
    { name: 'pages', role: 'eye', pixels: [
      ...vLine(5, 4, 11),
    ]},
    // Cover surface
    { name: 'surface', role: 'arm', pixels: [
      ...rect(6, 4, 11, 11),
    ]},
    // Glowing rune symbol
    { name: 'rune', role: 'accessory', pixels: [
      [8, 6], [9, 6],
      [7, 7], [10, 7],
      [8, 8], [9, 8],
      [7, 9], [10, 9],
    ]},
    // Metal clasp
    { name: 'clasp', role: 'body', pixels: [
      [12, 7], [12, 8],
    ]},
  ],
};

export const MAGIC_BOOK_COLORS = scheme('magic_book_default', {
  boot: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },          // Dark spine
  leg:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Leather border
  arm:  { shadow: '#30346d', base: '#442434', highlight: '#854c30' },          // Dark leather surface
  eye:  { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },          // White pages
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Green glow rune
  body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },          // Metal clasp
});

// ════════════════════════════════════════════════════════════
// 10. CRYSTAL_BALL — Fortune-telling orb on stand
// ════════════════════════════════════════════════════════════
export const CRYSTAL_BALL_16: SpriteTemplate = {
  name: 'crystal_ball_16', width: 16, height: 16,
  description: 'Mystical crystal ball on an ornate golden stand with inner swirl.',
  regions: [
    // Orb top highlight
    { name: 'orb_shine', role: 'eye', pixels: [
      [7, 2], [8, 2],
      [6, 3], [7, 3],
    ]},
    // Orb outer ring
    { name: 'orb_outer', role: 'belt', pixels: [
      ...hLine(1, 6, 9),
      [5, 2], [10, 2],
      [4, 3], [4, 4], [4, 5], [4, 6],
      [11, 3], [11, 4], [11, 5], [11, 6],
      [5, 7], [10, 7],
      ...hLine(8, 6, 9),
    ]},
    // Orb inner fill
    { name: 'orb_inner', role: 'body', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
      ...hLine(6, 5, 10),
      ...hLine(7, 6, 9),
    ]},
    // Inner swirl mist
    { name: 'swirl', role: 'accessory', pixels: [
      [6, 4], [7, 5], [8, 4], [9, 5], [7, 6], [8, 6],
    ]},
    // Stand pedestal
    { name: 'stand', role: 'head', pixels: [
      ...hLine(9, 6, 9),
      ...hLine(10, 5, 10),
      ...hLine(11, 4, 11),
      ...hLine(12, 5, 10),
    ]},
    // Stand base
    { name: 'base', role: 'arm', pixels: [
      ...hLine(13, 4, 11),
    ]},
  ],
};

export const CRYSTAL_BALL_COLORS = scheme('crystal_ball_default', {
  eye:  { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },          // Orb shine
  belt: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },          // Blue orb edge
  body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },          // Blue orb fill
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Light swirl
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },          // Gold stand
  arm:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },          // Gold base
});

// ════════════════════════════════════════════════════════════
// 11. HOURGLASS_ITEM — Sand timer
// ════════════════════════════════════════════════════════════
export const HOURGLASS_ITEM_16: SpriteTemplate = {
  name: 'hourglass_item_16', width: 16, height: 16,
  description: 'Wooden-framed hourglass with falling sand grains.',
  regions: [
    // Top frame bar
    { name: 'top_frame', role: 'arm', pixels: [
      ...hLine(1, 4, 11),
      ...hLine(2, 4, 11),
    ]},
    // Top glass bulb
    { name: 'top_glass', role: 'body', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 6, 9),
      [7, 5], [8, 5],
    ]},
    // Sand (top remaining)
    { name: 'sand_top', role: 'head', pixels: [
      [7, 4], [8, 4],
      [7, 3], [8, 3], [6, 3], [9, 3],
    ]},
    // Neck
    { name: 'neck', role: 'boot', pixels: [
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    // Falling sand grain
    { name: 'sand_falling', role: 'head', pixels: [
      [7, 7], [8, 7],
    ]},
    // Bottom glass bulb
    { name: 'bottom_glass', role: 'body', pixels: [
      [7, 9], [8, 9],
      ...hLine(10, 6, 9),
      ...hLine(11, 5, 10),
    ]},
    // Sand pile (bottom)
    { name: 'sand_bottom', role: 'head', pixels: [
      ...hLine(11, 6, 9),
      [7, 10], [8, 10],
    ]},
    // Bottom frame bar
    { name: 'bottom_frame', role: 'arm', pixels: [
      ...hLine(12, 4, 11),
      ...hLine(13, 4, 11),
    ]},
    // Frame side posts
    { name: 'posts', role: 'arm', pixels: [
      ...vLine(4, 3, 11),
      ...vLine(11, 3, 11),
    ]},
  ],
};

export const HOURGLASS_ITEM_COLORS = scheme('hourglass_item_default', {
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Wooden frame
  body: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },          // Glass bulbs
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },          // Sand gold
  boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },          // Neck metal
});

// ════════════════════════════════════════════════════════════
// 12. TREASURE_MAP — Folded map with X mark
// ════════════════════════════════════════════════════════════
export const TREASURE_MAP_16: SpriteTemplate = {
  name: 'treasure_map_16', width: 16, height: 16,
  description: 'Weathered treasure map with fold lines, coast, and a red X marking the spot.',
  regions: [
    // Map body (parchment)
    { name: 'parchment', role: 'head', pixels: [
      ...rect(2, 3, 13, 12),
    ]},
    // Map outline border
    { name: 'border', role: 'arm', pixels: [
      ...hLine(2, 2, 13),
      ...hLine(13, 2, 13),
      ...vLine(2, 3, 12),
      ...vLine(13, 3, 12),
    ]},
    // Coast line (wavy edge on left)
    { name: 'coast', role: 'belt', pixels: [
      [4, 5], [5, 6], [4, 7], [5, 8], [4, 9], [5, 10], [4, 11],
    ]},
    // Water area left of coast
    { name: 'water', role: 'body', pixels: [
      [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [3, 11],
      [4, 6], [4, 8], [4, 10],
    ]},
    // Red X marks the spot
    { name: 'x_mark', role: 'leg', pixels: [
      [9, 6], [11, 6],
      [10, 7],
      [9, 8], [11, 8],
    ]},
    // Fold crease lines
    { name: 'fold_lines', role: 'boot', pixels: [
      ...vLine(7, 3, 12),
      ...hLine(7, 3, 12),
    ]},
    // Compass rose (tiny)
    { name: 'compass_rose', role: 'accessory', pixels: [
      [11, 10], [12, 10],
      [11, 11], [12, 11],
    ]},
  ],
};

export const TREASURE_MAP_COLORS = scheme('treasure_map_default', {
  head: { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },          // Parchment
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Border edge
  belt: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },          // Coast green
  body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },          // Water blue
  leg:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },          // Red X
  boot: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },          // Fold lines
  accessory: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Compass rose
});

// ════════════════════════════════════════════════════════════
// 13. LOCKPICK_SET — Thief's lockpick set
// ════════════════════════════════════════════════════════════
export const LOCKPICK_SET_16: SpriteTemplate = {
  name: 'lockpick_set_16', width: 16, height: 16,
  description: 'Leather roll with visible lockpick tools: tension wrench and picks.',
  regions: [
    // Leather roll (background)
    { name: 'leather_roll', role: 'arm', pixels: [
      ...rect(3, 4, 12, 12),
    ]},
    // Leather edge roll
    { name: 'roll_edge', role: 'boot', pixels: [
      ...vLine(12, 4, 12),
      ...vLine(13, 5, 11),
    ]},
    // Pick 1 (rake pick)
    { name: 'pick_rake', role: 'body', pixels: [
      ...vLine(5, 2, 11),
      [5, 2], [6, 2],
    ]},
    // Pick 2 (hook pick)
    { name: 'pick_hook', role: 'body', pixels: [
      ...vLine(7, 2, 11),
      [8, 2],
    ]},
    // Pick 3 (diamond pick)
    { name: 'pick_diamond', role: 'body', pixels: [
      ...vLine(9, 3, 11),
      [9, 2], [10, 3],
    ]},
    // Tension wrench
    { name: 'wrench', role: 'head', pixels: [
      ...vLine(11, 3, 11),
      [11, 3], [12, 3],
    ]},
    // Tie strap
    { name: 'strap', role: 'leg', pixels: [
      ...hLine(8, 4, 12),
    ]},
    // Pick tips highlight
    { name: 'tips', role: 'eye', pixels: [
      [5, 2], [7, 2], [9, 2],
    ]},
  ],
};

export const LOCKPICK_SET_COLORS = scheme('lockpick_set_default', {
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Leather roll
  boot: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },          // Roll edge dark
  body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },          // Metal picks
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },          // Wrench iron
  leg:  { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },          // Tie strap
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },          // Pick tip shine
});

// ════════════════════════════════════════════════════════════
// 14. FISHING_ROD_B2 — Rod with line and hook
// ════════════════════════════════════════════════════════════
export const FISHING_ROD_B2_16: SpriteTemplate = {
  name: 'fishing_rod_b2_16', width: 16, height: 16,
  description: 'Bamboo fishing rod with reel, line, and baited hook dangling.',
  regions: [
    // Rod tip
    { name: 'rod_tip', role: 'head', pixels: [
      [2, 1], [3, 2],
    ]},
    // Rod shaft (diagonal)
    { name: 'rod_shaft', role: 'arm', pixels: [
      [4, 3], [5, 4], [6, 5], [7, 6], [8, 7], [9, 8],
      [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8],
    ]},
    // Handle grip
    { name: 'handle', role: 'boot', pixels: [
      [9, 9], [10, 9],
      [10, 10], [11, 10],
      [11, 11], [12, 11],
    ]},
    // Reel
    { name: 'reel', role: 'body', pixels: [
      [8, 9], [9, 10], [8, 10],
    ]},
    // Fishing line
    { name: 'line', role: 'eye', pixels: [
      [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7],
      [2, 8], [2, 9], [2, 10],
    ]},
    // Hook
    { name: 'hook', role: 'accessory', pixels: [
      [2, 11], [2, 12], [3, 12], [3, 11],
    ]},
    // Float / bobber
    { name: 'bobber', role: 'leg', pixels: [
      [2, 6], [2, 7],
    ]},
  ],
};

export const FISHING_ROD_B2_COLORS = scheme('fishing_rod_b2_default', {
  head: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },          // Green rod tip
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Bamboo shaft
  boot: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },          // Dark handle
  body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },          // Metal reel
  eye:  { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },          // Thin line
  accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Metal hook
  leg:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },          // Red bobber
});

// ════════════════════════════════════════════════════════════
// 15. MAGNIFYING_GLASS — Detective magnifying lens
// ════════════════════════════════════════════════════════════
export const MAGNIFYING_GLASS_16: SpriteTemplate = {
  name: 'magnifying_glass_16', width: 16, height: 16,
  description: 'Brass-rimmed magnifying glass with clear lens and wooden handle.',
  regions: [
    // Lens rim (circle)
    { name: 'rim', role: 'head', pixels: [
      ...hLine(2, 5, 8),
      [4, 3], [9, 3],
      [3, 4], [3, 5], [3, 6],
      [10, 4], [10, 5], [10, 6],
      [4, 7], [9, 7],
      ...hLine(8, 5, 8),
    ]},
    // Lens glass
    { name: 'glass', role: 'belt', pixels: [
      ...hLine(3, 5, 8),
      ...rect(4, 4, 9, 6),
      ...hLine(7, 5, 8),
    ]},
    // Lens highlight
    { name: 'highlight', role: 'eye', pixels: [
      [5, 3], [6, 3],
      [4, 4], [5, 4],
    ]},
    // Handle connector
    { name: 'connector', role: 'body', pixels: [
      [7, 9], [8, 9],
    ]},
    // Wooden handle
    { name: 'handle', role: 'arm', pixels: [
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
    ]},
  ],
};

export const MAGNIFYING_GLASS_COLORS = scheme('magnifying_glass_default', {
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },          // Brass rim
  belt: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },          // Clear glass
  eye:  { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },          // Lens shine
  body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },          // Metal connector
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Wooden handle
});

// ════════════════════════════════════════════════════════════
// 16. ROUND_BOMB — Classic round bomb with lit fuse
// ════════════════════════════════════════════════════════════
export const ROUND_BOMB_16: SpriteTemplate = {
  name: 'round_bomb_16', width: 16, height: 16,
  description: 'Classic round black bomb with a lit, sparking fuse.',
  regions: [
    // Fuse spark
    { name: 'spark', role: 'eye', pixels: [
      [10, 1], [11, 1], [12, 1],
      [11, 2],
    ]},
    // Fuse line
    { name: 'fuse', role: 'head', pixels: [
      [9, 2], [10, 2],
      [9, 3],
    ]},
    // Bomb body outline (circle)
    { name: 'body_outline', role: 'boot', pixels: [
      ...hLine(3, 5, 9),
      [4, 4], [4, 10],
      [3, 5], [3, 6], [3, 7], [3, 8], [3, 9],
      [11, 5], [11, 6], [11, 7], [11, 8], [11, 9],
      [4, 10], [10, 10],
      ...hLine(11, 5, 9),
    ]},
    // Bomb body fill
    { name: 'body_fill', role: 'arm', pixels: [
      ...hLine(4, 5, 9),
      ...rect(4, 5, 10, 10),
    ]},
    // Highlight shine
    { name: 'highlight', role: 'body', pixels: [
      [5, 5], [6, 5],
      [5, 6],
    ]},
    // Fuse cap
    { name: 'fuse_cap', role: 'head', pixels: [
      [8, 3], [9, 4],
    ]},
  ],
};

export const ROUND_BOMB_COLORS = scheme('round_bomb_default', {
  eye:  { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },          // Spark bright
  head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Brown fuse
  boot: { shadow: '#140c1c', base: '#140c1c', highlight: '#4e4a4e' },          // Dark outline
  arm:  { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },          // Dark bomb body
  body: { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },          // Highlight area
});

// ════════════════════════════════════════════════════════════
// 17. ANCHOR_ITEM — Small ship anchor
// ════════════════════════════════════════════════════════════
export const ANCHOR_ITEM_16: SpriteTemplate = {
  name: 'anchor_item_16', width: 16, height: 16,
  description: 'Small iron ship anchor with ring, shank, and curved flukes.',
  regions: [
    // Ring at top
    { name: 'ring', role: 'head', pixels: [
      [7, 1], [8, 1],
      [6, 2], [9, 2],
      [7, 2], [8, 2],
      [6, 3], [9, 3],
      [7, 3], [8, 3],
    ]},
    // Cross bar (stock)
    { name: 'stock', role: 'body', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
    ]},
    // Central shank
    { name: 'shank', role: 'boot', pixels: [
      ...vLine(7, 4, 11),
      ...vLine(8, 4, 11),
    ]},
    // Left fluke (curved)
    { name: 'fluke_left', role: 'arm', pixels: [
      [5, 10], [6, 10],
      [4, 11], [5, 11],
      [3, 12], [4, 12],
      [4, 13], [5, 13],
    ]},
    // Right fluke (curved)
    { name: 'fluke_right', role: 'arm', pixels: [
      [9, 10], [10, 10],
      [10, 11], [11, 11],
      [11, 12], [12, 12],
      [10, 13], [11, 13],
    ]},
    // Highlight
    { name: 'highlight', role: 'eye', pixels: [
      [7, 5], [7, 7],
    ]},
  ],
};

export const ANCHOR_ITEM_COLORS = scheme('anchor_item_default', {
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },          // Iron ring
  body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },          // Iron stock
  boot: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },          // Dark shank
  arm:  { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },          // Iron flukes
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },          // Metal shine
});

// ════════════════════════════════════════════════════════════
// 18. TELESCOPE_ITEM — Handheld spyglass
// ════════════════════════════════════════════════════════════
export const TELESCOPE_ITEM_16: SpriteTemplate = {
  name: 'telescope_item_16', width: 16, height: 16,
  description: 'Handheld brass spyglass / telescope, extended position, diagonal.',
  regions: [
    // Objective lens (wider end, top-left)
    { name: 'objective', role: 'head', pixels: [
      [2, 3], [3, 3], [4, 3],
      [2, 4], [3, 4], [4, 4],
      [2, 5], [3, 5], [4, 5],
    ]},
    // Main tube section 1
    { name: 'tube_1', role: 'body', pixels: [
      [5, 5], [5, 6],
      [6, 6], [6, 7],
      [7, 7], [7, 8],
    ]},
    // Main tube section 2 (inner tube)
    { name: 'tube_2', role: 'arm', pixels: [
      [8, 8], [8, 9],
      [9, 9], [9, 10],
      [10, 10], [10, 11],
    ]},
    // Eyepiece (narrower end, bottom-right)
    { name: 'eyepiece', role: 'boot', pixels: [
      [11, 11], [11, 12],
      [12, 11], [12, 12],
    ]},
    // Brass rings / bands
    { name: 'bands', role: 'accessory', pixels: [
      [4, 4],
      [7, 7],
      [10, 10],
    ]},
    // Lens glint
    { name: 'lens_glint', role: 'eye', pixels: [
      [2, 3], [3, 3],
    ]},
  ],
};

export const TELESCOPE_ITEM_COLORS = scheme('telescope_item_default', {
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },          // Brass objective
  body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Outer tube
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Inner tube
  boot: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },          // Dark eyepiece
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Gold bands
  eye:  { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },          // Lens glint
});

// ════════════════════════════════════════════════════════════
// 19. MUSIC_BOX — Small ornate music box
// ════════════════════════════════════════════════════════════
export const MUSIC_BOX_16: SpriteTemplate = {
  name: 'music_box_16', width: 16, height: 16,
  description: 'Small ornate wooden music box with open lid and visible mechanism.',
  regions: [
    // Open lid (tilted up)
    { name: 'lid', role: 'arm', pixels: [
      ...hLine(2, 3, 12),
      ...hLine(3, 3, 12),
      ...hLine(4, 4, 12),
    ]},
    // Lid hinge
    { name: 'hinge', role: 'boot', pixels: [
      [12, 4], [12, 5],
    ]},
    // Box body front
    { name: 'box_body', role: 'head', pixels: [
      ...hLine(5, 3, 12),
      ...vLine(3, 6, 11),
      ...vLine(12, 6, 11),
      ...hLine(12, 3, 12),
    ]},
    // Box fill (interior)
    { name: 'interior', role: 'body', pixels: [
      ...rect(4, 6, 11, 11),
    ]},
    // Music cylinder mechanism
    { name: 'mechanism', role: 'accessory', pixels: [
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
    ]},
    // Musical notes floating out
    { name: 'notes', role: 'eye', pixels: [
      [5, 1], [6, 2],
      [9, 1], [10, 2],
    ]},
    // Decorative trim
    { name: 'trim', role: 'leg', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(11, 4, 11),
    ]},
    // Key/crank
    { name: 'crank', role: 'belt', pixels: [
      [13, 8], [14, 8], [14, 9],
    ]},
  ],
};

export const MUSIC_BOX_COLORS = scheme('music_box_default', {
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Wooden lid
  boot: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },          // Metal hinge
  head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Wood box
  body: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },          // Dark interior
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold mechanism
  eye:  { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },          // Musical notes
  leg:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },          // Gold trim
  belt: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },          // Metal crank
});

// ════════════════════════════════════════════════════════════
// 20. GRAPPLE_ROPE — Grappling hook on rope
// ════════════════════════════════════════════════════════════
export const GRAPPLE_ROPE_16: SpriteTemplate = {
  name: 'grapple_rope_16', width: 16, height: 16,
  description: 'Three-pronged grappling hook attached to coiled rope.',
  regions: [
    // Center hook prong (upward)
    { name: 'prong_center', role: 'body', pixels: [
      [7, 1], [8, 1],
      [7, 2], [8, 2],
      [7, 3], [8, 3],
    ]},
    // Left hook prong
    { name: 'prong_left', role: 'body', pixels: [
      [4, 3], [5, 3],
      [5, 4], [6, 4],
      [4, 4],
    ]},
    // Right hook prong
    { name: 'prong_right', role: 'body', pixels: [
      [10, 3], [11, 3],
      [9, 4], [10, 4],
      [11, 4],
    ]},
    // Hook collar / connector
    { name: 'collar', role: 'head', pixels: [
      ...hLine(5, 6, 9),
      ...hLine(6, 6, 9),
    ]},
    // Rope upper
    { name: 'rope_upper', role: 'arm', pixels: [
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    // Rope coil
    { name: 'rope_coil', role: 'arm', pixels: [
      ...hLine(9, 5, 10),
      [4, 10], [5, 10], [10, 10], [11, 10],
      [4, 11], [11, 11],
      [4, 12], [5, 12], [10, 12], [11, 12],
      ...hLine(13, 6, 9),
    ]},
    // Rope coil inner
    { name: 'rope_inner', role: 'head', pixels: [
      ...hLine(10, 6, 9),
      ...hLine(11, 5, 10),
      ...hLine(12, 6, 9),
    ]},
    // Hook highlight
    { name: 'highlight', role: 'eye', pixels: [
      [7, 1], [5, 3],
    ]},
  ],
};

export const GRAPPLE_ROPE_COLORS = scheme('grapple_rope_default', {
  body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },          // Metal hooks
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },          // Collar / inner
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },          // Rope brown
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },          // Metal highlight
});

// ════════════════════════════════════════════════════════════
// EXPORT RECORDS
// ════════════════════════════════════════════════════════════

export const ITEM_BATCH2_TEMPLATES: Record<string, SpriteTemplate> = {
  health_potion_16:     HEALTH_POTION_16,
  mana_potion_16:       MANA_POTION_16,
  scroll_rolled_16:     SCROLL_ROLLED_16,
  torch_lit_16:         TORCH_LIT_16,
  compass_nav_16:       COMPASS_NAV_16,
  rope_coil_16:         ROPE_COIL_16,
  lantern_oil_16:       LANTERN_OIL_16,
  treasure_key_16:      TREASURE_KEY_16,
  magic_book_16:        MAGIC_BOOK_16,
  crystal_ball_16:      CRYSTAL_BALL_16,
  hourglass_item_16:    HOURGLASS_ITEM_16,
  treasure_map_16:      TREASURE_MAP_16,
  lockpick_set_16:      LOCKPICK_SET_16,
  fishing_rod_b2_16:    FISHING_ROD_B2_16,
  magnifying_glass_16:  MAGNIFYING_GLASS_16,
  round_bomb_16:        ROUND_BOMB_16,
  anchor_item_16:       ANCHOR_ITEM_16,
  telescope_item_16:    TELESCOPE_ITEM_16,
  music_box_16:         MUSIC_BOX_16,
  grapple_rope_16:      GRAPPLE_ROPE_16,
};

export const ITEM_BATCH2_COLOR_SCHEMES: Record<string, ColorScheme> = {
  health_potion_default:     HEALTH_POTION_COLORS,
  mana_potion_default:       MANA_POTION_COLORS,
  scroll_rolled_default:     SCROLL_ROLLED_COLORS,
  torch_lit_default:         TORCH_LIT_COLORS,
  compass_nav_default:       COMPASS_NAV_COLORS,
  rope_coil_default:         ROPE_COIL_COLORS,
  lantern_oil_default:       LANTERN_OIL_COLORS,
  treasure_key_default:      TREASURE_KEY_COLORS,
  magic_book_default:        MAGIC_BOOK_COLORS,
  crystal_ball_default:      CRYSTAL_BALL_COLORS,
  hourglass_item_default:    HOURGLASS_ITEM_COLORS,
  treasure_map_default:      TREASURE_MAP_COLORS,
  lockpick_set_default:      LOCKPICK_SET_COLORS,
  fishing_rod_b2_default:    FISHING_ROD_B2_COLORS,
  magnifying_glass_default:  MAGNIFYING_GLASS_COLORS,
  round_bomb_default:        ROUND_BOMB_COLORS,
  anchor_item_default:       ANCHOR_ITEM_COLORS,
  telescope_item_default:    TELESCOPE_ITEM_COLORS,
  music_box_default:         MUSIC_BOX_COLORS,
  grapple_rope_default:      GRAPPLE_ROPE_COLORS,
};
