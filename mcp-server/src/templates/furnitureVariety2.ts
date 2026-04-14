/**
 * 16x16 furniture/prop templates — batch 2.
 * 20 templates: diverse medieval, modern, sci-fi, cozy, dungeon.
 * DB16 palette, 30-55% density, 1-2px margin.
 */

import { SpriteTemplate, ColorScheme } from './humanoid16.js';

// ── Helpers ──────────────────────────────────────────────────

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

const FURN2_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  hand:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },
  belt:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  accessory: { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
};

function scheme(name: string, overrides: Partial<typeof FURN2_BASE>): ColorScheme {
  return { name, mapping: { ...FURN2_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. GRANDFATHER_CLOCK — Tall standing clock with pendulum.
// ════════════════════════════════════════════════════════════
export const GRANDFATHER_CLOCK_16: SpriteTemplate = {
  name: 'grandfather_clock_16', width: 16, height: 16,
  description: 'Tall standing grandfather clock with clock face, pendulum, and wooden cabinet.',
  regions: [
    // Clock top cap — ornamental crown
    { name: 'crown', role: 'accessory', pixels: [
      ...hLine(0, 5, 10),
      [4,1], ...hLine(1, 5, 10), [11,1],
    ]},
    // Clock face — circular area with hands
    { name: 'clock_face', role: 'eye', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
      ...hLine(5, 6, 9),
    ]},
    // Clock hands (drawn over face)
    { name: 'hands', role: 'hair', pixels: [
      [7,3], [8,3], [8,4],
    ]},
    // Upper cabinet body
    { name: 'upper_body', role: 'body', pixels: [
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
    ]},
    // Waist trim
    { name: 'waist', role: 'belt', pixels: [
      ...hLine(8, 5, 10),
    ]},
    // Pendulum window
    { name: 'pendulum_window', role: 'head', pixels: [
      ...hLine(9, 5, 10),
      ...hLine(10, 5, 10),
      ...hLine(11, 5, 10),
    ]},
    // Pendulum disc
    { name: 'pendulum', role: 'accessory', pixels: [
      [7,10], [8,10],
      [7,11], [8,11],
    ]},
    // Lower cabinet
    { name: 'lower_body', role: 'arm', pixels: [
      ...hLine(12, 5, 10),
      ...hLine(13, 5, 10),
    ]},
    // Base / feet
    { name: 'base', role: 'boot', pixels: [
      ...hLine(14, 4, 11),
      ...hLine(15, 4, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 2. PIANO — Upright piano with keyboard visible.
// ════════════════════════════════════════════════════════════
export const PIANO_16: SpriteTemplate = {
  name: 'piano_16', width: 16, height: 16,
  description: 'Upright piano with visible keyboard, music stand, and wooden body.',
  regions: [
    // Music stand / top
    { name: 'music_stand', role: 'accessory', pixels: [
      ...hLine(1, 3, 12),
      ...hLine(2, 3, 12),
    ]},
    // Piano top body
    { name: 'upper_body', role: 'body', pixels: [
      ...hLine(3, 2, 13),
      ...hLine(4, 2, 13),
      ...hLine(5, 2, 13),
      ...hLine(6, 2, 13),
    ]},
    // Keyboard area — white keys
    { name: 'white_keys', role: 'eye', pixels: [
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
    ]},
    // Black keys
    { name: 'black_keys', role: 'hair', pixels: [
      [3,7], [5,7], [7,7], [9,7], [10,7], [12,7],
    ]},
    // Lower body panel
    { name: 'lower_panel', role: 'head', pixels: [
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
    ]},
    // Pedal area
    { name: 'pedals', role: 'belt', pixels: [
      ...hLine(12, 2, 13),
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      ...vLine(3, 13, 15),
      ...vLine(4, 13, 15),
      ...vLine(11, 13, 15),
      ...vLine(12, 13, 15),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 3. BATHTUB — Claw foot bathtub with water.
// ════════════════════════════════════════════════════════════
export const BATHTUB_16: SpriteTemplate = {
  name: 'bathtub_16', width: 16, height: 16,
  description: 'Claw foot bathtub with water surface and bubbles visible.',
  regions: [
    // Bubbles above water
    { name: 'bubbles', role: 'eye', pixels: [
      [5,3], [7,2], [9,3], [11,2],
    ]},
    // Tub rim
    { name: 'rim', role: 'head', pixels: [
      ...hLine(4, 2, 13),
      [1,5], [2,5], [13,5], [14,5],
    ]},
    // Water surface
    { name: 'water', role: 'accessory', pixels: [
      ...hLine(5, 3, 12),
      ...hLine(6, 2, 13),
    ]},
    // Tub body
    { name: 'tub_body', role: 'body', pixels: [
      ...vLine(1, 6, 10),
      ...vLine(14, 6, 10),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
    ]},
    // Tub bottom curve
    { name: 'tub_bottom', role: 'belt', pixels: [
      ...hLine(11, 3, 12),
    ]},
    // Claw feet
    { name: 'feet', role: 'leg', pixels: [
      [2,12], [3,12], [2,13], [3,13],
      [12,12], [13,12], [12,13], [13,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 4. ORNATE_THRONE — Ornate royal throne with cushion + crown.
// ════════════════════════════════════════════════════════════
export const ORNATE_THRONE_16: SpriteTemplate = {
  name: 'ornate_throne_16', width: 16, height: 16,
  description: 'Ornate royal throne with tall back, crown finial, armrests, and velvet cushion.',
  regions: [
    // Crown finial at top
    { name: 'crown', role: 'accessory', pixels: [
      [6,0], [7,0], [8,0], [9,0],
      [5,1], [7,1], [8,1], [10,1],
    ]},
    // Tall backrest
    { name: 'backrest', role: 'body', pixels: [
      ...rect(5, 2, 10, 7),
    ]},
    // Backrest ornament
    { name: 'ornament', role: 'eye', pixels: [
      [7,3], [8,3],
      [7,4], [8,4],
    ]},
    // Armrests
    { name: 'armrests', role: 'arm', pixels: [
      [3,7], [4,7], [11,7], [12,7],
      [3,8], [4,8], [11,8], [12,8],
      [3,9], [11,9],
    ]},
    // Seat cushion
    { name: 'cushion', role: 'head', pixels: [
      ...hLine(8, 5, 10),
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
    ]},
    // Front panel
    { name: 'front_panel', role: 'belt', pixels: [
      ...hLine(11, 4, 11),
      ...hLine(12, 4, 11),
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      ...vLine(4, 13, 15),
      ...vLine(5, 13, 15),
      ...vLine(10, 13, 15),
      ...vLine(11, 13, 15),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 5. SPINNING_WHEEL — Textile spinning wheel with spool.
// ════════════════════════════════════════════════════════════
export const SPINNING_WHEEL_16: SpriteTemplate = {
  name: 'spinning_wheel_16', width: 16, height: 16,
  description: 'Wooden spinning wheel with large wheel, spindle, and thread spool.',
  regions: [
    // Large wheel — circular outline
    { name: 'wheel_rim', role: 'arm', pixels: [
      ...hLine(1, 3, 6),
      [2,2], [7,2],
      ...vLine(1, 3, 8),
      ...vLine(8, 3, 8),
      [2,9], [7,9],
      ...hLine(10, 3, 6),
    ]},
    // Wheel spokes
    { name: 'spokes', role: 'belt', pixels: [
      [4,2], [5,2],
      [4,9], [5,9],
      [2,5], [3,5], [6,5], [7,5],
      [4,5], [5,5],
    ]},
    // Hub
    { name: 'hub', role: 'eye', pixels: [
      [4,5], [5,5],
      [4,6], [5,6],
    ]},
    // Spindle / flyer assembly
    { name: 'spindle', role: 'head', pixels: [
      ...hLine(4, 9, 13),
      ...hLine(5, 9, 13),
      ...hLine(6, 9, 13),
    ]},
    // Thread spool on spindle
    { name: 'spool', role: 'accessory', pixels: [
      [11,3], [12,3],
      [11,7], [12,7],
    ]},
    // Frame / body connecting wheel to spindle
    { name: 'frame', role: 'body', pixels: [
      ...hLine(7, 8, 10),
      ...hLine(8, 5, 10),
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      [2,11], [3,11], [3,12],
      [6,11], [7,11], [6,12],
      [10,11], [11,11],
    ]},
    // Base
    { name: 'base', role: 'boot', pixels: [
      ...hLine(13, 1, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 6. TELESCOPE — Observatory telescope on tripod.
// ════════════════════════════════════════════════════════════
export const TELESCOPE_16: SpriteTemplate = {
  name: 'telescope_16', width: 16, height: 16,
  description: 'Brass telescope on tripod mount, angled upward for stargazing.',
  regions: [
    // Telescope tube — angled from lower-left to upper-right
    { name: 'tube', role: 'body', pixels: [
      [11,1], [12,1],
      [10,2], [11,2], [12,2],
      [9,3], [10,3], [11,3],
      [8,4], [9,4], [10,4],
      [7,5], [8,5], [9,5],
      [6,6], [7,6], [8,6],
    ]},
    // Lens cap
    { name: 'lens', role: 'eye', pixels: [
      [12,0], [13,0],
      [13,1],
    ]},
    // Eyepiece
    { name: 'eyepiece', role: 'accessory', pixels: [
      [5,7], [6,7],
      [5,8],
    ]},
    // Mount / pivot
    { name: 'mount', role: 'belt', pixels: [
      [7,7], [8,7],
      [7,8], [8,8],
    ]},
    // Tripod legs
    { name: 'tripod', role: 'arm', pixels: [
      // Center leg
      ...vLine(8, 9, 13),
      // Left leg
      [7,9], [6,10], [5,11], [4,12], [3,13],
      // Right leg
      [9,9], [10,10], [11,11], [12,12], [13,13],
    ]},
    // Tripod feet
    { name: 'feet', role: 'boot', pixels: [
      [2,14], [3,14], [7,14], [8,14], [9,14], [13,14], [14,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 7. WINE_BARREL — Wooden wine barrel on its side.
// ════════════════════════════════════════════════════════════
export const WINE_BARREL_16: SpriteTemplate = {
  name: 'wine_barrel_16', width: 16, height: 16,
  description: 'Wooden wine barrel lying on its side with tap, bands, and staves.',
  regions: [
    // Barrel end — circular front face
    { name: 'barrel_face', role: 'body', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 3, 12),
      ...hLine(5, 2, 13),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 3, 12),
      ...hLine(11, 5, 10),
    ]},
    // Metal bands — horizontal rings
    { name: 'bands', role: 'belt', pixels: [
      ...hLine(4, 4, 11),
      ...hLine(10, 4, 11),
    ]},
    // Tap/spigot
    { name: 'tap', role: 'accessory', pixels: [
      [7,7], [8,7],
      [6,8], [9,8],
    ]},
    // Bung hole plug
    { name: 'bung', role: 'head', pixels: [
      [7,5], [8,5],
      [7,6], [8,6],
    ]},
    // Barrel shadow/depth staves
    { name: 'staves', role: 'arm', pixels: [
      ...vLine(5, 4, 10),
      ...vLine(10, 4, 10),
    ]},
    // Stand / cradle
    { name: 'stand', role: 'leg', pixels: [
      [3,12], [4,12], [11,12], [12,12],
      [2,13], [3,13], [12,13], [13,13],
    ]},
    // Ground
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 2, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 8. BIRD_CAGE — Decorative wire bird cage with bird inside.
// ════════════════════════════════════════════════════════════
export const BIRD_CAGE_16: SpriteTemplate = {
  name: 'bird_cage_16', width: 16, height: 16,
  description: 'Decorative wire bird cage with a small bird perched inside.',
  regions: [
    // Hook / hanging ring
    { name: 'hook', role: 'belt', pixels: [
      [7,0], [8,0],
      [7,1], [8,1],
    ]},
    // Cage dome top
    { name: 'dome', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      [4,3], [11,3],
      [4,4], [11,4],
    ]},
    // Cage wires — vertical bars
    { name: 'wires', role: 'arm', pixels: [
      ...vLine(4, 5, 12),
      ...vLine(6, 3, 12),
      ...vLine(8, 3, 12),
      ...vLine(10, 3, 12),
      ...vLine(11, 5, 12),
    ]},
    // Bird body
    { name: 'bird_body', role: 'accessory', pixels: [
      [7,8], [8,8], [9,8],
      [7,9], [8,9], [9,9],
    ]},
    // Bird eye
    { name: 'bird_eye', role: 'eye', pixels: [
      [9,8],
    ]},
    // Perch
    { name: 'perch', role: 'body', pixels: [
      ...hLine(10, 5, 10),
    ]},
    // Cage base ring
    { name: 'base_ring', role: 'boot', pixels: [
      ...hLine(13, 4, 11),
      ...hLine(14, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 9. MAGIC_MIRROR — Enchanted standing mirror with glow.
// ════════════════════════════════════════════════════════════
export const MAGIC_MIRROR_16: SpriteTemplate = {
  name: 'magic_mirror_16', width: 16, height: 16,
  description: 'Enchanted standing mirror with ornate frame and magical glow on reflective surface.',
  regions: [
    // Ornate frame top
    { name: 'frame_top', role: 'accessory', pixels: [
      [7,0], [8,0],
      ...hLine(1, 5, 10),
    ]},
    // Frame sides
    { name: 'frame_sides', role: 'arm', pixels: [
      ...vLine(4, 2, 10),
      ...vLine(11, 2, 10),
    ]},
    // Mirror glass surface
    { name: 'glass', role: 'body', pixels: [
      ...rect(5, 2, 10, 10),
    ]},
    // Magic glow / reflection
    { name: 'glow', role: 'eye', pixels: [
      [6,3], [7,3],
      [6,4],
      [9,8], [10,8],
      [10,9],
    ]},
    // Frame bottom
    { name: 'frame_bottom', role: 'head', pixels: [
      ...hLine(11, 4, 11),
    ]},
    // Stand / support legs
    { name: 'stand', role: 'leg', pixels: [
      [5,12], [6,12], [9,12], [10,12],
      [4,13], [5,13], [10,13], [11,13],
    ]},
    // Base
    { name: 'base', role: 'boot', pixels: [
      ...hLine(14, 3, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 10. FIREPLACE — Stone fireplace with fire inside.
// ════════════════════════════════════════════════════════════
export const FIREPLACE_16: SpriteTemplate = {
  name: 'fireplace_16', width: 16, height: 16,
  description: 'Stone fireplace with mantle, fire burning inside, and stone surround.',
  regions: [
    // Mantle top
    { name: 'mantle', role: 'head', pixels: [
      ...hLine(1, 1, 14),
      ...hLine(2, 1, 14),
    ]},
    // Stone surround — left pillar
    { name: 'stone_left', role: 'body', pixels: [
      ...rect(1, 3, 3, 13),
    ]},
    // Stone surround — right pillar
    { name: 'stone_right', role: 'body', pixels: [
      ...rect(12, 3, 14, 13),
    ]},
    // Arch top of firebox
    { name: 'arch', role: 'belt', pixels: [
      ...hLine(3, 4, 11),
      ...hLine(4, 4, 11),
    ]},
    // Fire — flames
    { name: 'flames', role: 'accessory', pixels: [
      [6,5], [7,5], [8,5], [9,5],
      [5,6], [6,6], [7,6], [8,6], [9,6], [10,6],
      [5,7], [6,7], [7,7], [8,7], [9,7], [10,7],
      [6,8], [7,8], [8,8], [9,8],
    ]},
    // Fire core
    { name: 'fire_core', role: 'eye', pixels: [
      [7,6], [8,6],
      [7,7], [8,7],
    ]},
    // Firebox interior darkness
    { name: 'firebox', role: 'hair', pixels: [
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
      ...hLine(11, 4, 11),
      ...hLine(12, 4, 11),
    ]},
    // Logs
    { name: 'logs', role: 'leg', pixels: [
      [5,9], [6,9], [9,9], [10,9],
    ]},
    // Hearth base
    { name: 'hearth', role: 'boot', pixels: [
      ...hLine(13, 4, 11),
      ...hLine(14, 1, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 11. WOODEN_LADDER — Freestanding A-frame ladder.
// ════════════════════════════════════════════════════════════
export const WOODEN_LADDER_16: SpriteTemplate = {
  name: 'wooden_ladder_16', width: 16, height: 16,
  description: 'Freestanding A-frame wooden ladder with 5 rungs.',
  regions: [
    // Top cap
    { name: 'top_cap', role: 'head', pixels: [
      [6,1], [7,1], [8,1], [9,1],
    ]},
    // Left rail
    { name: 'rail_left', role: 'arm', pixels: [
      ...vLine(5, 2, 14),
    ]},
    // Right rail
    { name: 'rail_right', role: 'arm', pixels: [
      ...vLine(10, 2, 14),
    ]},
    // Rungs
    { name: 'rungs', role: 'body', pixels: [
      ...hLine(3, 6, 9),
      ...hLine(5, 6, 9),
      ...hLine(7, 6, 9),
      ...hLine(9, 6, 9),
      ...hLine(11, 6, 9),
    ]},
    // Rung highlights
    { name: 'rung_highlights', role: 'accessory', pixels: [
      [6,3], [6,5], [6,7], [6,9], [6,11],
    ]},
    // A-frame back legs (spread outward)
    { name: 'back_legs', role: 'leg', pixels: [
      [4,12], [3,13], [2,14],
      [11,12], [12,13], [13,14],
    ]},
    // Feet
    { name: 'feet', role: 'boot', pixels: [
      [1,15], [2,15], [5,15],
      [10,15], [13,15], [14,15],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 12. WITCH_CAULDRON — Large bubbling witch cauldron.
// ════════════════════════════════════════════════════════════
export const WITCH_CAULDRON_16: SpriteTemplate = {
  name: 'witch_cauldron_16', width: 16, height: 16,
  description: 'Large bubbling witch cauldron with purple potion, skull decoration, and flames underneath.',
  regions: [
    // Magical steam
    { name: 'steam', role: 'accessory', pixels: [
      [5,0], [10,0],
      [6,1], [9,1],
      [5,2], [8,2], [11,2],
    ]},
    // Potion surface
    { name: 'potion', role: 'eye', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
    ]},
    // Cauldron rim
    { name: 'rim', role: 'head', pixels: [
      ...hLine(5, 3, 12),
    ]},
    // Cauldron body
    { name: 'pot_body', role: 'body', pixels: [
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 3, 12),
      ...hLine(10, 4, 11),
    ]},
    // Skull decoration
    { name: 'skull', role: 'face', pixels: [
      [7,7], [8,7],
      [7,8], [8,8],
    ]},
    // Handle lugs
    { name: 'handles', role: 'belt', pixels: [
      [1,6], [1,7],
      [14,6], [14,7],
    ]},
    // Flames underneath
    { name: 'flames', role: 'leg', pixels: [
      [5,11], [7,11], [9,11], [10,11],
      [4,12], [6,12], [8,12], [11,12],
    ]},
    // Fire base / ground
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(13, 3, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 13. WALL_WEAPON_RACK — Wall-mounted weapon display.
// ════════════════════════════════════════════════════════════
export const WALL_WEAPON_RACK_16: SpriteTemplate = {
  name: 'wall_weapon_rack_16', width: 16, height: 16,
  description: 'Wall-mounted weapon display rack with sword and shield.',
  regions: [
    // Wall plaque / backboard
    { name: 'backboard', role: 'body', pixels: [
      ...rect(2, 2, 13, 13),
    ]},
    // Mounting brackets
    { name: 'brackets', role: 'belt', pixels: [
      ...hLine(5, 3, 12),
      ...hLine(10, 3, 12),
    ]},
    // Sword — vertical
    { name: 'sword', role: 'arm', pixels: [
      [5,3], [5,4],
      ...vLine(5, 6, 12),
    ]},
    // Sword guard + pommel
    { name: 'sword_guard', role: 'accessory', pixels: [
      [4,5], [5,5], [6,5],
      [5,13],
    ]},
    // Shield — rounded shape
    { name: 'shield', role: 'head', pixels: [
      ...hLine(6, 8, 11),
      ...hLine(7, 8, 12),
      ...hLine(8, 8, 12),
      ...hLine(9, 8, 11),
    ]},
    // Shield emblem
    { name: 'emblem', role: 'eye', pixels: [
      [10,7], [10,8],
    ]},
    // Frame border
    { name: 'frame', role: 'hair', pixels: [
      ...border(1, 1, 14, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 14. GOLD_TREASURE_PILE — Heap of gold coins and gems.
// ════════════════════════════════════════════════════════════
export const GOLD_TREASURE_PILE_16: SpriteTemplate = {
  name: 'gold_treasure_pile_16', width: 16, height: 16,
  description: 'Heap of gold coins, gems, and a goblet scattered in a pile.',
  regions: [
    // Goblet top
    { name: 'goblet', role: 'accessory', pixels: [
      [3,4], [4,4], [5,4],
      [4,5],
    ]},
    // Gold coins — main heap
    { name: 'gold_coins', role: 'body', pixels: [
      ...hLine(6, 4, 12),
      ...hLine(7, 3, 13),
      ...hLine(8, 3, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 3, 12),
      ...hLine(12, 4, 11),
    ]},
    // Coin highlights — scattered glints
    { name: 'coin_highlights', role: 'eye', pixels: [
      [5,7], [8,7], [11,7],
      [4,9], [7,9], [10,9], [12,9],
      [6,11], [9,11],
    ]},
    // Gems — colorful accents
    { name: 'gems', role: 'head', pixels: [
      [6,6], [10,6],
      [5,8], [9,8],
      [7,10], [11,10],
    ]},
    // Ground shadow
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(13, 2, 13),
      ...hLine(14, 3, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 15. GLOBE — World globe on a wooden stand.
// ════════════════════════════════════════════════════════════
export const GLOBE_16: SpriteTemplate = {
  name: 'globe_16', width: 16, height: 16,
  description: 'World globe on a wooden stand with meridian ring and continents.',
  regions: [
    // Globe sphere
    { name: 'ocean', role: 'body', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 4, 11),
      ...hLine(3, 3, 12),
      ...hLine(4, 3, 12),
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 12),
      ...hLine(7, 4, 11),
      ...hLine(8, 6, 9),
    ]},
    // Continents — land shapes
    { name: 'land', role: 'head', pixels: [
      [5,2], [6,2],
      [4,3], [5,3], [8,3], [9,3],
      [4,4], [5,4], [9,4], [10,4],
      [7,5], [8,5], [11,5],
      [5,6], [6,6], [10,6],
      [6,7], [7,7],
    ]},
    // Meridian ring
    { name: 'meridian', role: 'belt', pixels: [
      [7,0], [8,0],
      [3,4], [12,4], [3,5], [12,5],
      [7,9], [8,9],
    ]},
    // Globe highlight / glare
    { name: 'highlight', role: 'eye', pixels: [
      [5,1], [6,1],
      [4,2],
    ]},
    // Stand pillar
    { name: 'pillar', role: 'arm', pixels: [
      ...vLine(7, 10, 12),
      ...vLine(8, 10, 12),
    ]},
    // Stand base
    { name: 'base', role: 'boot', pixels: [
      ...hLine(13, 4, 11),
      ...hLine(14, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 16. SUIT_OF_ARMOR — Decorative standing suit of armor.
// ════════════════════════════════════════════════════════════
export const SUIT_OF_ARMOR_16: SpriteTemplate = {
  name: 'suit_of_armor_16', width: 16, height: 16,
  description: 'Decorative standing suit of plate armor with helmet, breastplate, and halberd.',
  regions: [
    // Helmet plume
    { name: 'plume', role: 'accessory', pixels: [
      [8,0], [9,0],
      [9,1],
    ]},
    // Helmet
    { name: 'helmet', role: 'head', pixels: [
      [6,1], [7,1], [8,1],
      [6,2], [7,2], [8,2], [9,2],
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Visor slit
    { name: 'visor', role: 'eye', pixels: [
      [7,3], [8,3],
    ]},
    // Breastplate / torso
    { name: 'breastplate', role: 'body', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 6, 9),
    ]},
    // Pauldrons (shoulders)
    { name: 'pauldrons', role: 'belt', pixels: [
      [4,4], [4,5], [11,4], [11,5],
    ]},
    // Arms / gauntlets
    { name: 'arms', role: 'arm', pixels: [
      ...vLine(4, 6, 8),
      ...vLine(11, 6, 8),
    ]},
    // Halberd held in right hand
    { name: 'halberd', role: 'hair', pixels: [
      ...vLine(13, 0, 14),
      [12,1], [14,1],
    ]},
    // Leg armor / greaves
    { name: 'greaves', role: 'leg', pixels: [
      ...vLine(6, 9, 13),
      ...vLine(7, 9, 13),
      ...vLine(8, 9, 13),
      ...vLine(9, 9, 13),
    ]},
    // Boots
    { name: 'boots', role: 'boot', pixels: [
      [5,14], [6,14], [7,14], [8,14], [9,14], [10,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 17. WELL_BUCKET — Hanging bucket on a rope.
// ════════════════════════════════════════════════════════════
export const WELL_BUCKET_16: SpriteTemplate = {
  name: 'well_bucket_16', width: 16, height: 16,
  description: 'Wooden bucket hanging from a rope with iron bands and water droplets.',
  regions: [
    // Rope above
    { name: 'rope', role: 'arm', pixels: [
      ...vLine(7, 0, 3),
      ...vLine(8, 0, 3),
    ]},
    // Bucket handle
    { name: 'handle', role: 'belt', pixels: [
      [5,3], [6,3],
      [5,4],
      [9,3], [10,3],
      [10,4],
    ]},
    // Bucket rim
    { name: 'rim', role: 'head', pixels: [
      ...hLine(5, 4, 11),
    ]},
    // Bucket body (wooden staves)
    { name: 'bucket_body', role: 'body', pixels: [
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 5, 10),
      ...hLine(10, 5, 10),
      ...hLine(11, 5, 10),
    ]},
    // Iron bands
    { name: 'bands', role: 'accessory', pixels: [
      ...hLine(7, 4, 11),
      ...hLine(10, 5, 10),
    ]},
    // Water inside (surface)
    { name: 'water', role: 'eye', pixels: [
      [5,6], [6,6], [7,6], [8,6], [9,6], [10,6],
    ]},
    // Bucket bottom
    { name: 'bottom', role: 'boot', pixels: [
      ...hLine(12, 6, 9),
    ]},
    // Water droplets falling
    { name: 'droplets', role: 'face', pixels: [
      [6,13], [9,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 18. HARP — Musical harp with strings.
// ════════════════════════════════════════════════════════════
export const HARP_16: SpriteTemplate = {
  name: 'harp_16', width: 16, height: 16,
  description: 'Golden musical harp with curved neck, pillar, and visible strings.',
  regions: [
    // Curved neck (top arch)
    { name: 'neck', role: 'head', pixels: [
      [5,1], [6,1], [7,1], [8,1], [9,1],
      [4,2], [10,2],
      [3,3], [11,3],
      [3,4],
    ]},
    // Crown ornament
    { name: 'crown', role: 'accessory', pixels: [
      [7,0], [8,0],
    ]},
    // Pillar (front vertical)
    { name: 'pillar', role: 'body', pixels: [
      ...vLine(11, 4, 12),
      ...vLine(12, 4, 12),
    ]},
    // Soundboard (back curved piece)
    { name: 'soundboard', role: 'arm', pixels: [
      ...vLine(3, 5, 12),
      ...vLine(4, 5, 12),
    ]},
    // Strings
    { name: 'strings', role: 'belt', pixels: [
      ...vLine(5, 3, 12),
      ...vLine(6, 2, 12),
      ...vLine(7, 2, 12),
      ...vLine(8, 2, 12),
      ...vLine(9, 2, 12),
      ...vLine(10, 3, 12),
    ]},
    // String highlight (plucked vibration)
    { name: 'string_glow', role: 'eye', pixels: [
      [6,5], [8,7], [7,9], [9,11],
    ]},
    // Base / foot
    { name: 'base', role: 'boot', pixels: [
      ...hLine(13, 2, 13),
      ...hLine(14, 3, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 19. IRON_CAGE — Prison / dungeon iron cage.
// ════════════════════════════════════════════════════════════
export const IRON_CAGE_16: SpriteTemplate = {
  name: 'iron_cage_16', width: 16, height: 16,
  description: 'Iron prison cage with vertical bars, padlock, and chain ring on top.',
  regions: [
    // Chain ring on top
    { name: 'chain_ring', role: 'accessory', pixels: [
      [7,0], [8,0],
      [6,1], [9,1],
      [7,1], [8,1],
    ]},
    // Cage top frame
    { name: 'top_frame', role: 'head', pixels: [
      ...hLine(2, 2, 13),
      ...hLine(3, 2, 13),
    ]},
    // Vertical bars
    { name: 'bars', role: 'arm', pixels: [
      ...vLine(2, 4, 12),
      ...vLine(4, 4, 12),
      ...vLine(6, 4, 12),
      ...vLine(8, 4, 12),
      ...vLine(10, 4, 12),
      ...vLine(12, 4, 12),
      ...vLine(13, 4, 12),
    ]},
    // Cross bars (horizontal)
    { name: 'cross_bars', role: 'belt', pixels: [
      ...hLine(7, 2, 13),
    ]},
    // Interior darkness (between bars)
    { name: 'interior', role: 'body', pixels: [
      ...vLine(3, 4, 12),
      ...vLine(5, 4, 12),
      ...vLine(7, 4, 12),
      ...vLine(9, 4, 12),
      ...vLine(11, 4, 12),
    ]},
    // Padlock
    { name: 'padlock', role: 'eye', pixels: [
      [7,8], [8,8],
      [7,9], [8,9],
    ]},
    // Bottom frame
    { name: 'bottom_frame', role: 'boot', pixels: [
      ...hLine(13, 2, 13),
      ...hLine(14, 2, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 20. STONE_ALTAR — Sacrificial stone altar with runes.
// ════════════════════════════════════════════════════════════
export const STONE_ALTAR_16: SpriteTemplate = {
  name: 'stone_altar_16', width: 16, height: 16,
  description: 'Ancient stone altar with carved runes, candles, and a glowing center.',
  regions: [
    // Candle flames
    { name: 'flames', role: 'accessory', pixels: [
      [3,1], [12,1],
      [3,2], [12,2],
    ]},
    // Candle bodies
    { name: 'candles', role: 'arm', pixels: [
      [3,3], [3,4], [3,5],
      [12,3], [12,4], [12,5],
    ]},
    // Altar top surface
    { name: 'altar_top', role: 'head', pixels: [
      ...hLine(5, 2, 13),
      ...hLine(6, 2, 13),
    ]},
    // Glowing center orb
    { name: 'glow_orb', role: 'eye', pixels: [
      [7,4], [8,4],
      [7,5], [8,5],
    ]},
    // Altar body — front face
    { name: 'altar_body', role: 'body', pixels: [
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
    ]},
    // Rune carvings on front face
    { name: 'runes', role: 'belt', pixels: [
      [4,8], [6,8], [9,8], [11,8],
      [5,9], [7,9], [8,9], [10,9],
      [4,10], [6,10], [9,10], [11,10],
    ]},
    // Step / base platform
    { name: 'step', role: 'leg', pixels: [
      ...hLine(12, 1, 14),
      ...hLine(13, 1, 14),
    ]},
    // Ground
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 1, 14),
    ]},
  ],
};


// ════════════════════════════════════════════════════════════
// COLOR SCHEMES
// ════════════════════════════════════════════════════════════

export const GRANDFATHER_CLOCK_COLORS = scheme('grandfather_clock_default', {
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Crown ornament gold
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Clock face white
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Clock hands dark
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Upper cabinet wood
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },     // Waist trim
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Pendulum window
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Lower cabinet
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Base dark
});

export const PIANO_COLORS = scheme('piano_default', {
  accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },     // Music stand paper
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Piano body black
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // White keys
  hair:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },     // Black keys
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Lower panel
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Pedal area
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Legs
});

export const BATHTUB_COLORS = scheme('bathtub_default', {
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },     // Bubbles white
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Rim porcelain
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Water blue
  body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Tub body porcelain
  belt:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },     // Tub bottom
  leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Claw feet brass
});

export const ORNATE_THRONE_COLORS = scheme('ornate_throne_default', {
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Crown gold
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Backrest wood
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Ornament gold shine
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Armrests wood
  head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Cushion red velvet
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Front panel
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Legs
});

export const SPINNING_WHEEL_COLORS = scheme('spinning_wheel_default', {
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wheel rim wood
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },     // Spokes
  eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Hub brass
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Spindle assembly
  accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Thread spool white
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Frame
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Legs
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Base
});

export const TELESCOPE_COLORS = scheme('telescope_default', {
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Brass tube
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Lens glint
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Eyepiece
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Mount
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Tripod wood
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Feet
});

export const WINE_BARREL_COLORS = scheme('wine_barrel_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Barrel wood
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal bands
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Tap iron
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },     // Bung plug
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Stave shadows
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Stand
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Ground
});

export const BIRD_CAGE_COLORS = scheme('bird_cage_default', {
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Hook iron
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Dome gold
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Wires gold
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Bird body blue
  eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },     // Bird eye dark
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Perch wood
  boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Base ring gold
});

export const MAGIC_MIRROR_COLORS = scheme('magic_mirror_default', {
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Frame top ornament gold
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Frame sides gold
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Mirror glass blue
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Magic glow white
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Frame bottom gold
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Stand wood
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Base dark
});

export const FIREPLACE_COLORS = scheme('fireplace_default', {
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Mantle stone
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Stone pillars
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Arch stone
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Flames orange
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Fire core yellow
  hair:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },     // Firebox dark
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Logs wood
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Hearth stone dark
});

export const WOODEN_LADDER_COLORS = scheme('wooden_ladder_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Top cap
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Rails
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Rungs
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Rung highlights
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Back legs
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Feet
});

export const WITCH_CAULDRON_COLORS = scheme('witch_cauldron_default', {
  accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },     // Steam white
  eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Purple potion
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Rim iron
  body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Pot body dark iron
  face:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Skull bone
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Handle lugs
  leg:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Flames
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Ground
});

export const WALL_WEAPON_RACK_COLORS = scheme('wall_weapon_rack_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Backboard wood
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Brackets iron
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Sword blade
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Sword guard gold
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Shield blue
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Shield emblem gold
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Frame border dark
});

export const GOLD_TREASURE_PILE_COLORS = scheme('gold_treasure_pile_default', {
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Goblet gold
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold coins
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Coin glints
  head:      { shadow: '#d04648', base: '#597dce', highlight: '#6dc2ca' },     // Gems multi-color
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Ground shadow
});

export const GLOBE_COLORS = scheme('globe_default', {
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Ocean blue
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Land green
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Meridian ring iron
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Highlight glare
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Stand pillar wood
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Stand base wood
});

export const SUIT_OF_ARMOR_COLORS = scheme('suit_of_armor_default', {
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Plume red/gold
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Helmet iron
  eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },     // Visor slit dark
  body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Breastplate polished
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Pauldrons
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Arms iron
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Halberd wood shaft
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Greaves
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Boots dark iron
});

export const WELL_BUCKET_COLORS = scheme('well_bucket_default', {
  arm:       { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },     // Rope light tan
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Handle iron
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Rim iron
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Bucket wood
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Iron bands
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Water blue
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Bottom wood
  face:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Droplets blue
});

export const HARP_COLORS = scheme('harp_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Neck gold wood
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Crown ornament
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Pillar gold
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Soundboard dark wood
  belt:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Strings silver
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // String glow
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Base wood
});

export const IRON_CAGE_COLORS = scheme('iron_cage_default', {
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Chain ring
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Top frame
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Bars
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Cross bars
  body:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },     // Interior dark
  eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Padlock brass
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Bottom frame
});

export const STONE_ALTAR_COLORS = scheme('stone_altar_default', {
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Candle flames
  arm:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Candle bodies white
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Altar top stone
  eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Glow orb green
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Altar body stone
  belt:      { shadow: '#346524', base: '#6daa2c', highlight: '#6dc2ca' },     // Runes glow
  leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Step dark stone
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Ground
});


// ════════════════════════════════════════════════════════════
// EXPORT RECORDS
// ════════════════════════════════════════════════════════════

export const FURNITURE_BATCH2_TEMPLATES: Record<string, SpriteTemplate> = {
  grandfather_clock_16:   GRANDFATHER_CLOCK_16,
  piano_16:               PIANO_16,
  bathtub_16:             BATHTUB_16,
  ornate_throne_16:       ORNATE_THRONE_16,
  spinning_wheel_16:      SPINNING_WHEEL_16,
  telescope_16:           TELESCOPE_16,
  wine_barrel_16:         WINE_BARREL_16,
  bird_cage_16:           BIRD_CAGE_16,
  magic_mirror_16:        MAGIC_MIRROR_16,
  fireplace_16:           FIREPLACE_16,
  wooden_ladder_16:       WOODEN_LADDER_16,
  witch_cauldron_16:      WITCH_CAULDRON_16,
  wall_weapon_rack_16:    WALL_WEAPON_RACK_16,
  gold_treasure_pile_16:  GOLD_TREASURE_PILE_16,
  globe_16:               GLOBE_16,
  suit_of_armor_16:       SUIT_OF_ARMOR_16,
  well_bucket_16:         WELL_BUCKET_16,
  harp_16:                HARP_16,
  iron_cage_16:           IRON_CAGE_16,
  stone_altar_16:         STONE_ALTAR_16,
};

export const FURNITURE_BATCH2_COLOR_SCHEMES: Record<string, ColorScheme> = {
  grandfather_clock_default:   GRANDFATHER_CLOCK_COLORS,
  piano_default:               PIANO_COLORS,
  bathtub_default:             BATHTUB_COLORS,
  ornate_throne_default:       ORNATE_THRONE_COLORS,
  spinning_wheel_default:      SPINNING_WHEEL_COLORS,
  telescope_default:           TELESCOPE_COLORS,
  wine_barrel_default:         WINE_BARREL_COLORS,
  bird_cage_default:           BIRD_CAGE_COLORS,
  magic_mirror_default:        MAGIC_MIRROR_COLORS,
  fireplace_default:           FIREPLACE_COLORS,
  wooden_ladder_default:       WOODEN_LADDER_COLORS,
  witch_cauldron_default:      WITCH_CAULDRON_COLORS,
  wall_weapon_rack_default:    WALL_WEAPON_RACK_COLORS,
  gold_treasure_pile_default:  GOLD_TREASURE_PILE_COLORS,
  globe_default:               GLOBE_COLORS,
  suit_of_armor_default:       SUIT_OF_ARMOR_COLORS,
  well_bucket_default:         WELL_BUCKET_COLORS,
  harp_default:                HARP_COLORS,
  iron_cage_default:           IRON_CAGE_COLORS,
  stone_altar_default:         STONE_ALTAR_COLORS,
};
