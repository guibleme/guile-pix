/**
 * 16x16 boss templates — batch 2.
 * 20 templates with imposing silhouettes and high density.
 * DB16 palette. Colored eyes for all bosses.
 */

import { SpriteTemplate, ColorScheme } from './humanoid16.js';

// ─── Helper functions ────────────────────────────────────────

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

// ─── Color base ──────────────────────────────────────────────

const BOSS2_BASE = {
  hair:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  head:      { shadow: '#442434', base: '#4e4a4e',  highlight: '#757161' },
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },
  eye:       { shadow: '#d04648', base: '#dad45e',  highlight: '#deeed6' },
  body:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  arm:       { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  hand:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },
  belt:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
  leg:       { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  accessory: { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
};

function scheme(name: string, overrides: Partial<typeof BOSS2_BASE>): ColorScheme {
  return { name, mapping: { ...BOSS2_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. VOID_LORD — Dark cosmic entity with tentacle crown,
//    floating torso, void rift core, wispy lower body.
// ════════════════════════════════════════════════════════════
export const VOID_LORD_16: SpriteTemplate = {
  name: 'void_lord_16', width: 16, height: 16,
  description: 'Dark cosmic entity. Tentacle crown, floating torso with void rift core, wispy dissolving lower body.',
  regions: [
    // Tentacle crown — tendrils rising from head
    { name: 'crown', role: 'accessory', pixels: [
      [3,0], [7,0], [8,0], [12,0],
      [3,1], [4,1], [7,1], [8,1], [11,1], [12,1],
      [4,2], [5,2], [10,2], [11,2],
    ]},
    // Head — wide dark skull
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
      ...hLine(5, 6, 9),
    ]},
    // Glowing purple eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3], [8,3], [9,3],
      [6,4], [9,4],
    ]},
    // Face detail
    { name: 'jaw', role: 'face', pixels: [
      [7,5], [8,5],
    ]},
    // Upper body — broad, floating
    { name: 'torso', role: 'body', pixels: [
      ...hLine(6, 4, 11),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 11),
    ]},
    // Void core — glowing rift in chest
    { name: 'core', role: 'belt', pixels: [
      [7,7], [8,7],
      [6,8], [7,8], [8,8], [9,8],
      [7,9], [8,9],
    ]},
    // Spectral arms
    { name: 'arms', role: 'arm', pixels: [
      [2,7], [3,7], [12,7], [13,7],
      [1,8], [2,8], [13,8], [14,8],
      [0,9], [1,9], [14,9], [15,9],
      [0,10], [15,10],
    ]},
    // Wispy lower body — dissolving into void
    { name: 'wisps', role: 'leg', pixels: [
      ...hLine(10, 4, 11),
      [4,11], [5,11], [7,11], [8,11], [10,11], [11,11],
      [3,12], [5,12], [6,12], [9,12], [10,12], [12,12],
      [3,13], [4,13], [7,13], [8,13], [11,13], [12,13],
      [2,14], [5,14], [6,14], [9,14], [10,14], [13,14],
    ]},
    // Wisp tips
    { name: 'wisp_tips', role: 'boot', pixels: [
      [2,15], [3,15], [5,15], [7,15], [8,15], [10,15], [12,15], [13,15],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 2. COLOSSUS — Massive stone humanoid filling the canvas,
//    glowing rune seams, tiny head, enormous fists.
// ════════════════════════════════════════════════════════════
export const COLOSSUS_16: SpriteTemplate = {
  name: 'colossus_16', width: 16, height: 16,
  description: 'Massive stone humanoid. Tiny head atop enormous body, glowing rune seams, boulder fists.',
  regions: [
    // Tiny head
    { name: 'head', role: 'head', pixels: [
      [6,0], [7,0], [8,0], [9,0],
      [6,1], [7,1], [8,1], [9,1],
    ]},
    // Eyes — orange glow
    { name: 'eyes', role: 'eye', pixels: [
      [7,1], [8,1],
    ]},
    // Neck
    { name: 'neck', role: 'face', pixels: [
      [7,2], [8,2],
    ]},
    // Massive shoulders + torso
    { name: 'torso', role: 'body', pixels: [
      ...hLine(3, 2, 13),
      ...hLine(4, 1, 14),
      ...hLine(5, 1, 14),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
    ]},
    // Rune seams — glowing lines across torso
    { name: 'runes', role: 'accessory', pixels: [
      [7,4], [8,4],
      [5,5], [6,5], [9,5], [10,5],
      [7,6], [8,6],
      [6,7], [9,7],
      [7,8], [8,8],
    ]},
    // Arms — thick pillars
    { name: 'arms', role: 'arm', pixels: [
      [0,4], [0,5], [0,6], [0,7], [0,8],
      [15,4], [15,5], [15,6], [15,7], [15,8],
      [1,6], [1,7], [1,8],
      [14,6], [14,7], [14,8],
    ]},
    // Huge fists
    { name: 'fists', role: 'hand', pixels: [
      [0,9], [1,9], [2,9],
      [0,10], [1,10], [2,10],
      [13,9], [14,9], [15,9],
      [13,10], [14,10], [15,10],
    ]},
    // Waist
    { name: 'waist', role: 'belt', pixels: [
      ...hLine(10, 4, 11),
    ]},
    // Legs — thick pillars
    { name: 'legs', role: 'leg', pixels: [
      ...rect(3, 11, 6, 13),
      ...rect(9, 11, 12, 13),
    ]},
    // Feet — wide stone blocks
    { name: 'feet', role: 'boot', pixels: [
      ...hLine(14, 2, 6),
      ...hLine(15, 2, 6),
      ...hLine(14, 9, 13),
      ...hLine(15, 9, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 3. QUEEN_BEE — Massive insect queen with wings, striped
//    abdomen, mandibles, crown-like antennae.
// ════════════════════════════════════════════════════════════
export const QUEEN_BEE_16: SpriteTemplate = {
  name: 'queen_bee_16', width: 16, height: 16,
  description: 'Massive insect queen. Crown-like antennae, compound eyes, thorax with wings, huge striped abdomen.',
  regions: [
    // Antennae — crown-like
    { name: 'antennae', role: 'accessory', pixels: [
      [4,0], [5,0], [10,0], [11,0],
      [5,1], [6,1], [9,1], [10,1],
    ]},
    // Head — wide insect head
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 5, 10),
    ]},
    // Compound eyes — red
    { name: 'eyes', role: 'eye', pixels: [
      [5,3], [6,3], [9,3], [10,3],
    ]},
    // Mandibles
    { name: 'mandibles', role: 'face', pixels: [
      [6,5], [7,5], [8,5], [9,5],
    ]},
    // Thorax — compact middle
    { name: 'thorax', role: 'body', pixels: [
      ...hLine(5, 5, 10),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
    ]},
    // Wings — spread wide
    { name: 'wings', role: 'arm', pixels: [
      [1,4], [2,4], [3,4], [12,4], [13,4], [14,4],
      [0,5], [1,5], [2,5], [3,5], [12,5], [13,5], [14,5], [15,5],
      [0,6], [1,6], [2,6], [3,6], [12,6], [13,6], [14,6], [15,6],
      [1,7], [2,7], [3,7], [12,7], [13,7], [14,7],
      [2,8], [3,8], [12,8], [13,8],
    ]},
    // Abdomen — huge, striped
    { name: 'abdomen', role: 'leg', pixels: [
      ...hLine(8, 4, 11),
      ...hLine(9, 3, 12),
      ...hLine(10, 3, 12),
      ...hLine(11, 3, 12),
      ...hLine(12, 4, 11),
      ...hLine(13, 5, 10),
    ]},
    // Stripes on abdomen
    { name: 'stripes', role: 'belt', pixels: [
      ...hLine(9, 4, 11),
      ...hLine(11, 4, 11),
      ...hLine(13, 6, 9),
    ]},
    // Legs — 4 tiny legs
    { name: 'legs', role: 'boot', pixels: [
      [3,14], [4,14], [11,14], [12,14],
      [2,15], [3,15], [5,15], [6,15], [9,15], [10,15], [12,15], [13,15],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 4. FROST_GIANT — Icy titan with jagged ice crown,
//    massive frame, frozen beard, ice weapon.
// ════════════════════════════════════════════════════════════
export const FROST_GIANT_16: SpriteTemplate = {
  name: 'frost_giant_16', width: 16, height: 16,
  description: 'Icy titan. Jagged ice crown, massive frosty frame, frozen beard, ice fists.',
  regions: [
    // Ice crown — jagged spikes
    { name: 'crown', role: 'accessory', pixels: [
      [4,0], [7,0], [8,0], [11,0],
      [5,0], [10,0],
      [5,1], [6,1], [9,1], [10,1],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
    ]},
    // Glowing cyan eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Frozen beard
    { name: 'beard', role: 'face', pixels: [
      [6,4], [7,4], [8,4], [9,4],
      [7,5], [8,5],
    ]},
    // Massive torso
    { name: 'torso', role: 'body', pixels: [
      ...hLine(5, 3, 12),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
    ]},
    // Belt
    { name: 'belt', role: 'belt', pixels: [
      ...hLine(10, 4, 11),
    ]},
    // Arms — thick
    { name: 'arms', role: 'arm', pixels: [
      [1,5], [1,6], [1,7], [1,8], [1,9],
      [14,5], [14,6], [14,7], [14,8], [14,9],
      [0,6], [0,7], [0,8],
      [15,6], [15,7], [15,8],
    ]},
    // Ice fists
    { name: 'fists', role: 'hand', pixels: [
      [0,9], [0,10], [1,10],
      [15,9], [15,10], [14,10],
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      ...rect(4, 11, 6, 13),
      ...rect(9, 11, 11, 13),
    ]},
    // Boots — wide icy
    { name: 'boots', role: 'boot', pixels: [
      ...hLine(14, 3, 7),
      ...hLine(15, 3, 7),
      ...hLine(14, 8, 12),
      ...hLine(15, 8, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 5. CYBER_DRAGON — Mechanical dragon with metal plating,
//    glowing circuits, cannon mouth, turbine wings.
// ════════════════════════════════════════════════════════════
export const CYBER_DRAGON_16: SpriteTemplate = {
  name: 'cyber_dragon_16', width: 16, height: 16,
  description: 'Mechanical dragon. Metal-plated head, circuit glow lines, cannon mouth, turbine wings, armored body.',
  regions: [
    // Metal horns
    { name: 'horns', role: 'accessory', pixels: [
      [3,0], [4,0], [11,0], [12,0],
      [4,1], [11,1],
    ]},
    // Armored head
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 5, 10),
      ...hLine(2, 4, 11),
      ...hLine(3, 4, 11),
      ...hLine(4, 5, 10),
    ]},
    // Glowing red scanner eyes
    { name: 'eyes', role: 'eye', pixels: [
      [5,2], [6,2], [9,2], [10,2],
    ]},
    // Cannon mouth
    { name: 'cannon', role: 'face', pixels: [
      [6,4], [7,4], [8,4], [9,4],
      [7,5], [8,5],
    ]},
    // Armored body
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 4, 6),
      ...hLine(5, 9, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 5, 10),
    ]},
    // Circuit glow lines
    { name: 'circuits', role: 'belt', pixels: [
      [7,6], [8,6],
      [6,7], [9,7],
      [7,8], [8,8],
    ]},
    // Turbine wings
    { name: 'wings', role: 'arm', pixels: [
      [0,3], [1,3], [2,3], [3,3], [12,3], [13,3], [14,3], [15,3],
      [0,4], [1,4], [2,4], [3,4], [12,4], [13,4], [14,4], [15,4],
      [1,5], [2,5], [3,5], [12,5], [13,5], [14,5],
      [2,6], [3,6], [12,6], [13,6],
      [3,7], [12,7],
    ]},
    // Tail — segmented mech tail
    { name: 'tail', role: 'leg', pixels: [
      ...hLine(10, 5, 10),
      ...hLine(11, 6, 11),
      [8,11], [9,11], [10,11], [11,11],
      [9,12], [10,12], [11,12], [12,12],
      [10,13], [11,13], [12,13], [13,13],
    ]},
    // Claws
    { name: 'claws', role: 'boot', pixels: [
      [4,10], [5,10], [10,10], [11,10],
      [3,11], [4,11], [5,11],
      [3,12], [4,12],
    ]},
    // Exhaust
    { name: 'exhaust', role: 'hand', pixels: [
      [12,14], [13,14], [14,14],
      [13,15], [14,15], [15,15],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 6. ANCIENT_PHARAOH — Undead pharaoh with ornate headdress,
//    sarcophagus armor, glowing ankh staff.
// ════════════════════════════════════════════════════════════
export const ANCIENT_PHARAOH_16: SpriteTemplate = {
  name: 'ancient_pharaoh_16', width: 16, height: 16,
  description: 'Undead pharaoh. Ornate headdress, wrapped bandage body, sarcophagus armor, glowing ankh staff.',
  regions: [
    // Headdress — ornate, wide
    { name: 'headdress', role: 'accessory', pixels: [
      ...hLine(0, 5, 10),
      ...hLine(1, 4, 11),
      [3,2], [4,2], [11,2], [12,2],
      [3,3], [4,3], [11,3], [12,3],
      [3,4], [12,4],
    ]},
    // Head — wrapped skull
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 11),
    ]},
    // Glowing yellow eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3], [9,3], [10,3],
    ]},
    // Jaw / face
    { name: 'face', role: 'face', pixels: [
      [7,4], [8,4], [9,4],
      [7,5], [8,5], [9,5],
    ]},
    // Ankh staff — left side
    { name: 'staff', role: 'accessory', pixels: [
      [1,1], [2,1], [3,1],
      [2,2], [2,3],
      [1,3], [3,3],
      ...vLine(2, 4, 14),
    ]},
    // Torso — armored wrappings
    { name: 'torso', role: 'body', pixels: [
      ...hLine(5, 5, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 5, 10),
    ]},
    // Sash
    { name: 'sash', role: 'belt', pixels: [
      ...hLine(10, 5, 10),
      [7,6], [8,6],
    ]},
    // Arms
    { name: 'arms', role: 'arm', pixels: [
      [3,6], [3,7], [3,8],
      [12,6], [12,7], [12,8], [13,7],
    ]},
    // Hands
    { name: 'hands', role: 'hand', pixels: [
      [3,9], [13,8], [13,9],
    ]},
    // Robe lower
    { name: 'robe', role: 'leg', pixels: [
      ...hLine(11, 4, 11),
      ...hLine(12, 4, 12),
      ...hLine(13, 3, 12),
      ...hLine(14, 3, 12),
    ]},
    // Hem
    { name: 'hem', role: 'boot', pixels: [
      ...hLine(15, 3, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 7. BLOOD_MOON — Living red moon entity with face, tendrils
//    extending from lunar surface, eerie aura.
// ════════════════════════════════════════════════════════════
export const BLOOD_MOON_16: SpriteTemplate = {
  name: 'blood_moon_16', width: 16, height: 16,
  description: 'Living red moon entity. Massive circular face with craters, glowing eyes, tendrils extending downward.',
  regions: [
    // Aura — outer glow
    { name: 'aura', role: 'accessory', pixels: [
      [5,0], [6,0], [9,0], [10,0],
      [3,1], [4,1], [11,1], [12,1],
      [2,2], [13,2],
      [1,3], [14,3],
      [1,4], [14,4],
      [1,5], [14,5],
      [2,6], [13,6],
      [3,7], [12,7],
    ]},
    // Moon body — large circle
    { name: 'moon', role: 'head', pixels: [
      ...hLine(0, 6, 9),
      ...hLine(1, 5, 10),
      ...hLine(2, 4, 12),
      ...hLine(3, 3, 13),
      ...hLine(4, 3, 13),
      ...hLine(5, 3, 13),
      ...hLine(6, 4, 12),
      ...hLine(7, 5, 11),
    ]},
    // Eyes — glowing red slit pupils
    { name: 'eyes', role: 'eye', pixels: [
      [5,3], [6,3], [9,3], [10,3],
      [5,4], [6,4], [9,4], [10,4],
    ]},
    // Mouth — jagged grin
    { name: 'mouth', role: 'face', pixels: [
      [5,6], [6,6], [7,6], [8,6], [9,6], [10,6],
      [6,7], [9,7],
    ]},
    // Craters on surface
    { name: 'craters', role: 'body', pixels: [
      [4,2], [11,1],
      [12,4], [3,5],
      [8,2], [7,5],
    ]},
    // Tendrils — hanging down from moon body
    { name: 'tendrils', role: 'leg', pixels: [
      [4,8], [5,8], [7,8], [8,8], [10,8], [11,8],
      [3,9], [4,9], [7,9], [8,9], [11,9], [12,9],
      [3,10], [8,10], [12,10],
      [2,11], [3,11], [7,11], [8,11], [12,11], [13,11],
      [2,12], [7,12], [13,12],
      [1,13], [2,13], [7,13], [8,13], [13,13], [14,13],
    ]},
    // Tendril tips
    { name: 'tendril_tips', role: 'boot', pixels: [
      [1,14], [7,14], [8,14], [14,14],
      [0,15], [1,15], [7,15], [14,15], [15,15],
    ]},
    // Drip details
    { name: 'drips', role: 'belt', pixels: [
      [5,9], [6,9], [10,9],
      [5,10], [10,10], [11,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 8. STORM_TITAN — Weather giant wreathed in lightning,
//    cloud armor, massive build, lightning bolt weapon.
// ════════════════════════════════════════════════════════════
export const STORM_TITAN_16: SpriteTemplate = {
  name: 'storm_titan_16', width: 16, height: 16,
  description: 'Weather giant. Cloud-wreathed armor, massive build, lightning crackling around body, bolt weapon.',
  regions: [
    // Head — stern face in storm clouds
    { name: 'head', role: 'head', pixels: [
      ...hLine(0, 5, 10),
      ...hLine(1, 5, 10),
      ...hLine(2, 5, 10),
      ...hLine(3, 6, 9),
    ]},
    // Glowing white-yellow eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,1], [7,1], [8,1], [9,1],
    ]},
    // Face
    { name: 'jaw', role: 'face', pixels: [
      [7,3], [8,3],
    ]},
    // Lightning bolt — held in right hand
    { name: 'bolt', role: 'accessory', pixels: [
      [14,0], [15,0],
      [13,1], [14,1],
      [13,2], [14,2],
      [12,3], [13,3],
      ...vLine(13, 4, 14),
      [12,15], [13,15],
    ]},
    // Massive torso
    { name: 'torso', role: 'body', pixels: [
      ...hLine(4, 3, 12),
      ...hLine(5, 2, 12),
      ...hLine(6, 2, 12),
      ...hLine(7, 3, 11),
      ...hLine(8, 3, 11),
    ]},
    // Belt
    { name: 'belt', role: 'belt', pixels: [
      ...hLine(9, 4, 10),
    ]},
    // Arms
    { name: 'arms', role: 'arm', pixels: [
      [1,4], [1,5], [1,6], [1,7],
      [0,5], [0,6], [0,7],
    ]},
    // Hands
    { name: 'hands', role: 'hand', pixels: [
      [0,8], [1,8], [12,7], [12,8],
    ]},
    // Lightning crackle aura
    { name: 'lightning', role: 'accessory', pixels: [
      [0,2], [15,3],
      [0,10], [15,9],
      [1,13], [14,12],
    ]},
    // Legs — massive
    { name: 'legs', role: 'leg', pixels: [
      ...rect(4, 10, 6, 13),
      ...rect(8, 10, 10, 13),
    ]},
    // Feet
    { name: 'feet', role: 'boot', pixels: [
      ...hLine(14, 3, 7),
      ...hLine(15, 3, 7),
      ...hLine(14, 8, 11),
      ...hLine(15, 8, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 9. PLAGUE_MOTHER — Disease entity with bloated body,
//    dripping toxins, multiple pustule eyes, toxic cloud.
// ════════════════════════════════════════════════════════════
export const PLAGUE_MOTHER_16: SpriteTemplate = {
  name: 'plague_mother_16', width: 16, height: 16,
  description: 'Disease-spreading entity. Bloated body, dripping toxins, multiple pustule eyes, toxic cloud around.',
  regions: [
    // Toxic cloud above
    { name: 'cloud', role: 'accessory', pixels: [
      [4,0], [5,0], [10,0], [11,0],
      [3,1], [6,1], [9,1], [12,1],
    ]},
    // Bloated head
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 4, 11),
      ...hLine(3, 3, 12),
      ...hLine(4, 3, 12),
      ...hLine(5, 4, 11),
    ]},
    // Multiple eyes — green pustules
    { name: 'eyes', role: 'eye', pixels: [
      [5,3], [6,3], [8,3], [9,3], [11,3],
      [4,4], [7,4], [10,4],
    ]},
    // Mouth — dripping maw
    { name: 'mouth', role: 'face', pixels: [
      [6,5], [7,5], [8,5], [9,5],
    ]},
    // Bloated body — enormous, round
    { name: 'body', role: 'body', pixels: [
      ...hLine(6, 3, 12),
      ...hLine(7, 2, 13),
      ...hLine(8, 1, 14),
      ...hLine(9, 1, 14),
      ...hLine(10, 2, 13),
      ...hLine(11, 3, 12),
    ]},
    // Pustules on body
    { name: 'pustules', role: 'belt', pixels: [
      [4,7], [9,7], [12,7],
      [3,9], [7,8], [11,9],
      [5,10], [10,10],
    ]},
    // Tentacle arms
    { name: 'arms', role: 'arm', pixels: [
      [0,8], [0,9], [0,10],
      [15,8], [15,9], [15,10],
      [1,10], [1,11],
      [14,10], [14,11],
    ]},
    // Dripping lower body
    { name: 'drips', role: 'leg', pixels: [
      ...hLine(12, 4, 11),
      [4,13], [5,13], [7,13], [8,13], [10,13], [11,13],
      [3,14], [5,14], [8,14], [10,14], [12,14],
    ]},
    // Drip tips
    { name: 'drip_tips', role: 'boot', pixels: [
      [3,15], [5,15], [7,15], [8,15], [10,15], [12,15],
    ]},
    // Hands
    { name: 'hands', role: 'hand', pixels: [
      [0,11], [1,12],
      [15,11], [14,12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 10. CRYSTAL_DRAKE — Gem-scaled dragon with crystalline
//     spines, prismatic breath, faceted body.
// ════════════════════════════════════════════════════════════
export const CRYSTAL_DRAKE_16: SpriteTemplate = {
  name: 'crystal_drake_16', width: 16, height: 16,
  description: 'Gem-scaled dragon. Crystalline spines along back, faceted body, prismatic eyes, jagged wings.',
  regions: [
    // Crystal spines along back
    { name: 'spines', role: 'accessory', pixels: [
      [6,0], [8,0], [10,0],
      [5,1], [7,1], [9,1], [11,1],
    ]},
    // Head — angular, faceted
    { name: 'head', role: 'head', pixels: [
      [2,1], [3,1], [4,1],
      [1,2], [2,2], [3,2], [4,2], [5,2],
      [1,3], [2,3], [3,3], [4,3], [5,3],
      [2,4], [3,4], [4,4],
    ]},
    // Prismatic eyes
    { name: 'eyes', role: 'eye', pixels: [
      [2,2], [4,2],
      [2,3], [4,3],
    ]},
    // Snout
    { name: 'snout', role: 'face', pixels: [
      [0,3], [0,4], [1,4],
    ]},
    // Neck
    { name: 'neck', role: 'body', pixels: [
      [4,5], [5,5], [6,5],
      [5,4], [6,4],
    ]},
    // Body — large, faceted
    { name: 'body', role: 'body', pixels: [
      ...hLine(6, 5, 11),
      ...hLine(7, 4, 12),
      ...hLine(8, 4, 12),
      ...hLine(9, 4, 12),
      ...hLine(10, 5, 11),
    ]},
    // Facet highlights
    { name: 'facets', role: 'belt', pixels: [
      [7,7], [10,7],
      [6,8], [8,8], [11,8],
      [7,9], [10,9],
    ]},
    // Wings — jagged crystalline
    { name: 'wings', role: 'arm', pixels: [
      [12,2], [13,2], [14,2],
      [12,3], [13,3], [14,3], [15,3],
      [13,4], [14,4], [15,4],
      [13,5], [14,5], [15,5],
      [13,6], [14,6],
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      [5,11], [6,11], [9,11], [10,11],
      [4,12], [5,12], [9,12], [10,12], [11,12],
      [4,13], [5,13], [10,13], [11,13],
    ]},
    // Claws
    { name: 'claws', role: 'boot', pixels: [
      [3,14], [4,14], [11,14], [12,14],
      [3,15], [4,15], [11,15], [12,15],
    ]},
    // Tail
    { name: 'tail', role: 'hand', pixels: [
      [3,7], [3,8], [2,8],
      [2,9], [1,9], [1,10],
      [0,10], [0,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 11. SHADOW_KING — Dark sovereign with massive cape,
//     shadow crown, two-handed dark sword.
// ════════════════════════════════════════════════════════════
export const SHADOW_KING_16: SpriteTemplate = {
  name: 'shadow_king_16', width: 16, height: 16,
  description: 'Dark ruler. Massive shadow crown, imposing armored body, flowing cape, dark greatsword.',
  regions: [
    // Shadow crown — tall jagged
    { name: 'crown', role: 'accessory', pixels: [
      [5,0], [7,0], [9,0], [11,0],
      [5,1], [6,1], [7,1], [8,1], [9,1], [10,1], [11,1],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 6, 10),
      ...hLine(3, 6, 10),
      ...hLine(4, 7, 9),
    ]},
    // Purple glowing eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7,3], [8,3], [9,3],
    ]},
    // Face
    { name: 'jaw', role: 'face', pixels: [
      [7,4], [8,4],
    ]},
    // Greatsword — left side
    { name: 'sword', role: 'accessory', pixels: [
      [1,0], [2,0],
      [2,1], [3,1],
      [3,2], [3,3],
      ...vLine(3, 4, 15),
    ]},
    // Armored torso
    { name: 'torso', role: 'body', pixels: [
      ...hLine(5, 5, 11),
      ...hLine(6, 5, 11),
      ...hLine(7, 5, 11),
      ...hLine(8, 5, 11),
      ...hLine(9, 6, 10),
    ]},
    // Belt
    { name: 'belt', role: 'belt', pixels: [
      ...hLine(10, 6, 10),
    ]},
    // Arms
    { name: 'arms', role: 'arm', pixels: [
      [4,5], [4,6], [4,7], [4,8],
      [12,5], [12,6], [12,7], [12,8],
    ]},
    // Gauntlets
    { name: 'gauntlets', role: 'hand', pixels: [
      [4,9], [4,10],
      [12,9], [12,10],
    ]},
    // Cape — flowing behind
    { name: 'cape', role: 'leg', pixels: [
      [13,5], [14,5],
      [13,6], [14,6], [15,6],
      [13,7], [14,7], [15,7],
      [13,8], [14,8], [15,8],
      [13,9], [14,9], [15,9],
      [13,10], [14,10], [15,10],
      [13,11], [14,11], [15,11],
      [14,12], [15,12],
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      ...rect(6, 11, 7, 13),
      ...rect(9, 11, 10, 13),
    ]},
    // Boots
    { name: 'boots', role: 'boot', pixels: [
      [5,14], [6,14], [7,14], [9,14], [10,14], [11,14],
      [5,15], [6,15], [7,15], [9,15], [10,15], [11,15],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 12. MAGMA_WYRM — Lava serpent coiled with glowing
//     molten cracks, fiery maw, obsidian scales.
// ════════════════════════════════════════════════════════════
export const MAGMA_WYRM_16: SpriteTemplate = {
  name: 'magma_wyrm_16', width: 16, height: 16,
  description: 'Lava serpent. Coiled obsidian body with glowing molten cracks, fiery maw, horns.',
  regions: [
    // Horns
    { name: 'horns', role: 'accessory', pixels: [
      [4,0], [5,0], [10,0], [11,0],
    ]},
    // Head — angular serpent
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 5, 10),
      ...hLine(2, 4, 11),
      ...hLine(3, 4, 11),
    ]},
    // Fiery yellow eyes
    { name: 'eyes', role: 'eye', pixels: [
      [5,2], [6,2], [9,2], [10,2],
    ]},
    // Open maw
    { name: 'maw', role: 'face', pixels: [
      [6,3], [7,3], [8,3], [9,3],
      [5,4], [6,4], [9,4], [10,4],
    ]},
    // Coiled body — upper coil
    { name: 'coil_upper', role: 'body', pixels: [
      ...hLine(4, 2, 4),
      ...hLine(4, 11, 13),
      ...hLine(5, 1, 5),
      ...hLine(5, 10, 14),
      ...hLine(6, 1, 5),
      ...hLine(6, 10, 14),
      ...hLine(7, 2, 4),
      ...hLine(7, 11, 13),
    ]},
    // Coiled body — lower coil
    { name: 'coil_lower', role: 'body', pixels: [
      ...hLine(8, 3, 12),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 3, 12),
    ]},
    // Molten cracks — glowing seams
    { name: 'cracks', role: 'belt', pixels: [
      [3,5], [12,5],
      [2,6], [13,6],
      [5,9], [7,8], [10,9], [8,10],
      [4,10], [11,10],
    ]},
    // Belly scales
    { name: 'belly', role: 'arm', pixels: [
      ...hLine(5, 6, 9),
      ...hLine(6, 6, 9),
      ...hLine(7, 6, 9),
    ]},
    // Tail tip
    { name: 'tail', role: 'leg', pixels: [
      ...hLine(12, 5, 10),
      [6,13], [7,13], [8,13], [9,13],
      [7,14], [8,14],
    ]},
    // Lava drips beneath
    { name: 'drips', role: 'boot', pixels: [
      [4,15], [7,15], [8,15], [11,15],
      [3,14], [5,14], [10,14], [12,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 13. GHOST_SHIP — Haunted vessel boss with skull prow,
//     tattered sails, spectral glow.
// ════════════════════════════════════════════════════════════
export const GHOST_SHIP_16: SpriteTemplate = {
  name: 'ghost_ship_16', width: 16, height: 16,
  description: 'Haunted vessel. Skull prow, tattered ghostly sails, spectral hull, floating above dark water.',
  regions: [
    // Mast top
    { name: 'mast_top', role: 'accessory', pixels: [
      [7,0], [8,0],
    ]},
    // Tattered sail — large, torn
    { name: 'sail', role: 'arm', pixels: [
      ...hLine(1, 5, 10),
      ...hLine(2, 4, 11),
      ...hLine(3, 3, 11),
      ...hLine(4, 3, 10),
      ...hLine(5, 4, 10),
      [4,6], [5,6], [9,6], [10,6],
    ]},
    // Mast
    { name: 'mast', role: 'accessory', pixels: [
      ...vLine(7, 1, 8),
    ]},
    // Sail tears / holes
    { name: 'tears', role: 'face', pixels: [
      [6,3], [9,3],
      [5,4], [8,5],
    ]},
    // Skull prow — front of ship
    { name: 'skull', role: 'head', pixels: [
      [0,7], [1,7], [2,7],
      [0,8], [1,8], [2,8], [3,8],
      [1,9], [2,9],
    ]},
    // Ghost eyes on skull
    { name: 'eyes', role: 'eye', pixels: [
      [1,7], [2,7],
    ]},
    // Hull — main ship body
    { name: 'hull', role: 'body', pixels: [
      ...hLine(7, 3, 13),
      ...hLine(8, 4, 14),
      ...hLine(9, 3, 14),
      ...hLine(10, 4, 13),
    ]},
    // Ghostly glow along hull
    { name: 'glow', role: 'belt', pixels: [
      [5,7], [10,7], [13,7],
      [6,9], [11,9],
    ]},
    // Hull bottom — keel
    { name: 'keel', role: 'leg', pixels: [
      ...hLine(11, 5, 12),
      ...hLine(12, 6, 11),
      ...hLine(13, 7, 10),
    ]},
    // Stern
    { name: 'stern', role: 'accessory', pixels: [
      [14,6], [15,6],
      [14,7], [15,7],
    ]},
    // Dark water below
    { name: 'water', role: 'boot', pixels: [
      ...hLine(14, 3, 12),
      ...hLine(15, 2, 13),
    ]},
    // Cannon ports
    { name: 'cannons', role: 'hand', pixels: [
      [5,8], [8,8], [11,8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 14. WAR_MACHINE — Massive bipedal mech with dual cannons,
//     heavy armor plating, reactor core.
// ════════════════════════════════════════════════════════════
export const WAR_MACHINE_16: SpriteTemplate = {
  name: 'war_machine_16', width: 16, height: 16,
  description: 'Massive bipedal mech. Dual shoulder cannons, heavy armor plating, glowing reactor core, thick legs.',
  regions: [
    // Shoulder cannons
    { name: 'cannons', role: 'accessory', pixels: [
      [0,0], [1,0], [2,0], [13,0], [14,0], [15,0],
      [0,1], [1,1], [14,1], [15,1],
      [1,2], [14,2],
    ]},
    // Head — small sensor dome
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
    ]},
    // Visor — red scanner
    { name: 'visor', role: 'eye', pixels: [
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Face plate
    { name: 'plate', role: 'face', pixels: [
      [7,3], [8,3],
    ]},
    // Torso — huge armored
    { name: 'torso', role: 'body', pixels: [
      ...hLine(3, 4, 11),
      ...hLine(4, 3, 12),
      ...hLine(5, 2, 13),
      ...hLine(6, 2, 13),
      ...hLine(7, 3, 12),
      ...hLine(8, 4, 11),
    ]},
    // Reactor core — glowing center
    { name: 'core', role: 'belt', pixels: [
      [7,5], [8,5],
      [6,6], [7,6], [8,6], [9,6],
      [7,7], [8,7],
    ]},
    // Arms — heavy weapon arms
    { name: 'arms', role: 'arm', pixels: [
      [1,3], [1,4], [1,5], [1,6], [1,7],
      [14,3], [14,4], [14,5], [14,6], [14,7],
      [0,4], [0,5], [0,6],
      [15,4], [15,5], [15,6],
    ]},
    // Fists — heavy
    { name: 'fists', role: 'hand', pixels: [
      [0,7], [0,8], [1,8],
      [15,7], [15,8], [14,8],
    ]},
    // Waist
    { name: 'waist', role: 'belt', pixels: [
      ...hLine(9, 5, 10),
    ]},
    // Legs — thick mechanical
    { name: 'legs', role: 'leg', pixels: [
      ...rect(4, 10, 6, 13),
      ...rect(9, 10, 11, 13),
    ]},
    // Feet — wide stabilizer pads
    { name: 'feet', role: 'boot', pixels: [
      ...hLine(14, 3, 7),
      ...hLine(15, 3, 7),
      ...hLine(14, 8, 12),
      ...hLine(15, 8, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 15. FOREST_GUARDIAN — Ancient tree boss with face in bark,
//     branch arms, root feet, leaf crown.
// ════════════════════════════════════════════════════════════
export const FOREST_GUARDIAN_16: SpriteTemplate = {
  name: 'forest_guardian_16', width: 16, height: 16,
  description: 'Ancient tree boss. Face carved in bark, branch arms, root feet, leafy crown canopy.',
  regions: [
    // Leaf canopy — broad crown
    { name: 'canopy', role: 'accessory', pixels: [
      ...hLine(0, 4, 11),
      ...hLine(1, 3, 12),
      ...hLine(2, 2, 13),
      ...hLine(3, 3, 12),
    ]},
    // Face in bark — carved features
    { name: 'face_bark', role: 'head', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 5, 10),
    ]},
    // Glowing green eyes
    { name: 'eyes', role: 'eye', pixels: [
      [5,5], [6,5], [9,5], [10,5],
    ]},
    // Mouth — hollow
    { name: 'mouth', role: 'face', pixels: [
      [7,7], [8,7],
      [6,6], [7,6], [8,6], [9,6],
    ]},
    // Trunk — thick body
    { name: 'trunk', role: 'body', pixels: [
      ...hLine(8, 5, 10),
      ...hLine(9, 5, 10),
      ...hLine(10, 5, 10),
      ...hLine(11, 5, 10),
    ]},
    // Branch arms — spreading wide
    { name: 'branches', role: 'arm', pixels: [
      [2,4], [3,4], [4,4], [11,4], [12,4], [13,4],
      [1,5], [2,5], [3,5], [12,5], [13,5], [14,5],
      [0,6], [1,6], [2,6], [13,6], [14,6], [15,6],
      [0,7], [1,7], [14,7], [15,7],
    ]},
    // Branch tips / twigs
    { name: 'twigs', role: 'hand', pixels: [
      [0,5], [15,5],
      [0,8], [15,8],
    ]},
    // Bark details
    { name: 'bark', role: 'belt', pixels: [
      [6,9], [9,9],
      [7,10], [8,10],
      [6,11], [9,11],
    ]},
    // Root feet — spreading base
    { name: 'roots', role: 'leg', pixels: [
      [4,12], [5,12], [10,12], [11,12],
      [3,13], [4,13], [5,13], [10,13], [11,13], [12,13],
      [2,14], [3,14], [4,14], [11,14], [12,14], [13,14],
    ]},
    // Root tips
    { name: 'root_tips', role: 'boot', pixels: [
      [1,15], [2,15], [3,15], [4,15], [5,15],
      [10,15], [11,15], [12,15], [13,15], [14,15],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 16. DEATH_KNIGHT — Undead commander in heavy armor,
//     burning sword, tattered cape, skull helm.
// ════════════════════════════════════════════════════════════
export const DEATH_KNIGHT_16: SpriteTemplate = {
  name: 'death_knight_16', width: 16, height: 16,
  description: 'Undead commander. Skull helmet with plume, heavy dark armor, burning greatsword, tattered cape.',
  regions: [
    // Helm plume
    { name: 'plume', role: 'accessory', pixels: [
      [8,0], [9,0], [10,0],
      [9,1], [10,1], [11,1],
    ]},
    // Skull helm
    { name: 'helm', role: 'head', pixels: [
      ...hLine(1, 5, 8),
      ...hLine(2, 5, 9),
      ...hLine(3, 5, 9),
      ...hLine(4, 6, 8),
    ]},
    // Burning eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,2], [7,2], [8,2],
      [6,3],
    ]},
    // Visor
    { name: 'visor', role: 'face', pixels: [
      [7,3], [8,3],
      [6,4], [7,4],
    ]},
    // Burning sword — left side
    { name: 'sword', role: 'accessory', pixels: [
      [1,0], [2,0],
      [2,1], [3,1],
      [3,2],
      ...vLine(3, 3, 14),
    ]},
    // Armored torso
    { name: 'torso', role: 'body', pixels: [
      ...hLine(5, 5, 10),
      ...hLine(6, 4, 10),
      ...hLine(7, 4, 10),
      ...hLine(8, 5, 10),
    ]},
    // Belt
    { name: 'belt', role: 'belt', pixels: [
      ...hLine(9, 5, 10),
    ]},
    // Arms
    { name: 'arms', role: 'arm', pixels: [
      [4,5], [4,6], [4,7],
      [11,5], [11,6], [11,7], [11,8],
    ]},
    // Gauntlets
    { name: 'gauntlets', role: 'hand', pixels: [
      [4,8], [4,9],
      [11,9], [12,9],
    ]},
    // Cape
    { name: 'cape', role: 'leg', pixels: [
      [11,5], [12,5],
      [12,6], [13,6],
      [12,7], [13,7], [14,7],
      [12,8], [13,8], [14,8],
      [12,9], [13,9], [14,9], [15,9],
      [13,10], [14,10], [15,10],
      [14,11], [15,11],
      [15,12],
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      ...rect(5, 10, 7, 13),
      ...rect(8, 10, 10, 13),
    ]},
    // Boots
    { name: 'boots', role: 'boot', pixels: [
      [4,14], [5,14], [6,14], [7,14], [8,14], [9,14], [10,14], [11,14],
      [4,15], [5,15], [6,15], [7,15], [8,15], [9,15], [10,15], [11,15],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 17. SPACE_KRAKEN — Cosmic squid with nebula body,
//     star-filled eye, cosmic tentacles.
// ════════════════════════════════════════════════════════════
export const SPACE_KRAKEN_16: SpriteTemplate = {
  name: 'space_kraken_16', width: 16, height: 16,
  description: 'Cosmic squid. Nebula-colored mantle, massive star-eye, cosmic tentacles trailing through space.',
  regions: [
    // Mantle — bulbous, star-filled
    { name: 'mantle', role: 'head', pixels: [
      ...hLine(0, 5, 10),
      ...hLine(1, 4, 11),
      ...hLine(2, 3, 12),
      ...hLine(3, 3, 12),
      ...hLine(4, 3, 12),
      ...hLine(5, 4, 11),
      ...hLine(6, 5, 10),
    ]},
    // Massive star-eye
    { name: 'eye', role: 'eye', pixels: [
      [6,2], [7,2], [8,2], [9,2],
      [6,3], [7,3], [8,3], [9,3],
      [6,4], [7,4], [8,4], [9,4],
    ]},
    // Pupil detail
    { name: 'pupil', role: 'face', pixels: [
      [7,3], [8,3],
    ]},
    // Star sparkles in mantle
    { name: 'stars', role: 'accessory', pixels: [
      [4,1], [11,1],
      [4,4], [11,4],
      [5,2], [10,2],
    ]},
    // Tentacle base
    { name: 'base', role: 'body', pixels: [
      ...hLine(7, 4, 11),
      ...hLine(8, 3, 12),
    ]},
    // Main tentacles — spreading down
    { name: 'tentacles', role: 'leg', pixels: [
      [2,9], [3,9], [5,9], [6,9], [9,9], [10,9], [12,9], [13,9],
      [1,10], [2,10], [5,10], [6,10], [9,10], [10,10], [13,10], [14,10],
      [1,11], [6,11], [7,11], [8,11], [9,11], [14,11],
      [0,12], [1,12], [6,12], [9,12], [14,12], [15,12],
      [0,13], [5,13], [6,13], [9,13], [10,13], [15,13],
    ]},
    // Tentacle tips — curling
    { name: 'tips', role: 'boot', pixels: [
      [0,14], [5,14], [10,14], [15,14],
      [0,15], [4,15], [5,15], [10,15], [11,15], [15,15],
    ]},
    // Cosmic particles
    { name: 'particles', role: 'belt', pixels: [
      [3,10], [4,10], [11,10], [12,10],
      [3,12], [4,12], [11,12], [12,12],
    ]},
    // Side fins
    { name: 'fins', role: 'arm', pixels: [
      [1,5], [2,5], [13,5], [14,5],
      [0,6], [1,6], [14,6], [15,6],
      [0,7], [1,7], [2,7], [13,7], [14,7], [15,7],
      [1,8], [2,8], [13,8], [14,8],
    ]},
    // Biolum spots
    { name: 'biolum', role: 'hand', pixels: [
      [3,7], [12,7],
      [4,8], [11,8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 18. CHIMERA — Multi-beast hybrid with lion head, goat
//     horns, snake tail, wings.
// ════════════════════════════════════════════════════════════
export const CHIMERA_16: SpriteTemplate = {
  name: 'chimera_16', width: 16, height: 16,
  description: 'Multi-beast hybrid. Lion head with mane, goat horns, dragon wings, snake tail, quadruped stance.',
  regions: [
    // Goat horns
    { name: 'horns', role: 'accessory', pixels: [
      [2,0], [3,0], [7,0], [8,0],
      [3,1], [7,1],
    ]},
    // Lion head — facing left
    { name: 'head', role: 'head', pixels: [
      [3,1], [4,1], [5,1], [6,1],
      [2,2], [3,2], [4,2], [5,2], [6,2],
      [2,3], [3,3], [4,3], [5,3], [6,3],
      [3,4], [4,4], [5,4],
    ]},
    // Mane
    { name: 'mane', role: 'hair', pixels: [
      [1,1], [1,2], [1,3], [1,4],
      [2,4], [6,4],
    ]},
    // Fiery eyes
    { name: 'eyes', role: 'eye', pixels: [
      [3,2], [5,2],
    ]},
    // Jaw
    { name: 'jaw', role: 'face', pixels: [
      [2,4], [6,4],
      [1,5], [2,5],
    ]},
    // Body — quadruped, wide
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 3, 11),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 4, 11),
    ]},
    // Wings
    { name: 'wings', role: 'arm', pixels: [
      [8,1], [9,1], [10,1],
      [9,2], [10,2], [11,2], [12,2],
      [10,3], [11,3], [12,3], [13,3],
      [11,4], [12,4], [13,4], [14,4],
      [12,5], [13,5],
    ]},
    // Belly
    { name: 'belly', role: 'belt', pixels: [
      [5,7], [6,7], [7,7], [8,7], [9,7],
    ]},
    // Front legs
    { name: 'front_legs', role: 'leg', pixels: [
      [3,9], [4,9], [5,9],
      [3,10], [4,10],
      [3,11], [4,11],
      [3,12], [4,12],
    ]},
    // Rear legs
    { name: 'rear_legs', role: 'leg', pixels: [
      [9,9], [10,9], [11,9],
      [10,10], [11,10],
      [10,11], [11,11],
      [10,12], [11,12],
    ]},
    // Paws
    { name: 'paws', role: 'boot', pixels: [
      [2,13], [3,13], [4,13], [5,13],
      [9,13], [10,13], [11,13], [12,13],
    ]},
    // Snake tail
    { name: 'tail', role: 'hand', pixels: [
      [12,8], [13,8],
      [13,9], [14,9],
      [14,10], [15,10],
      [14,11], [15,11],
      [13,12], [14,12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 19. TIME_WRAITH — Temporal specter with hourglass core,
//     clock-gear halo, fading copies, spectral cloak.
// ════════════════════════════════════════════════════════════
export const TIME_WRAITH_16: SpriteTemplate = {
  name: 'time_wraith_16', width: 16, height: 16,
  description: 'Temporal specter. Hourglass core, clock-gear halo above head, spectral flowing cloak, fading afterimages.',
  regions: [
    // Clock-gear halo
    { name: 'halo', role: 'accessory', pixels: [
      [6,0], [7,0], [8,0], [9,0],
      [5,1], [10,1],
      [5,2], [10,2],
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Head — spectral, within halo
    { name: 'head', role: 'head', pixels: [
      [6,1], [7,1], [8,1], [9,1],
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Glowing purple eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7,2], [8,2],
    ]},
    // Face
    { name: 'face', role: 'face', pixels: [
      [7,3], [8,3],
    ]},
    // Hourglass core — in chest
    { name: 'hourglass', role: 'belt', pixels: [
      [6,5], [7,5], [8,5], [9,5],
      [7,6], [8,6],
      [6,7], [7,7], [8,7], [9,7],
    ]},
    // Spectral cloak body
    { name: 'cloak', role: 'body', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 4, 5),
      ...hLine(5, 10, 11),
      ...hLine(6, 4, 6),
      ...hLine(6, 9, 11),
      ...hLine(7, 4, 5),
      ...hLine(7, 10, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 4, 11),
    ]},
    // Spectral arms
    { name: 'arms', role: 'arm', pixels: [
      [3,5], [3,6], [3,7], [3,8],
      [12,5], [12,6], [12,7], [12,8],
      [2,6], [2,7],
      [13,6], [13,7],
    ]},
    // Ghostly hands
    { name: 'hands', role: 'hand', pixels: [
      [1,8], [2,8], [3,9],
      [13,8], [14,8], [12,9],
    ]},
    // Fading afterimage — left
    { name: 'afterimage_l', role: 'accessory', pixels: [
      [0,4], [1,4],
      [0,5], [1,5],
      [0,6],
    ]},
    // Fading afterimage — right
    { name: 'afterimage_r', role: 'accessory', pixels: [
      [14,4], [15,4],
      [14,5], [15,5],
      [15,6],
    ]},
    // Flowing lower cloak
    { name: 'lower_cloak', role: 'leg', pixels: [
      ...hLine(10, 3, 12),
      [3,11], [4,11], [6,11], [7,11], [8,11], [9,11], [11,11], [12,11],
      [2,12], [4,12], [5,12], [8,12], [10,12], [11,12], [13,12],
      [2,13], [3,13], [6,13], [7,13], [9,13], [12,13], [13,13],
    ]},
    // Wisp tips
    { name: 'wisps', role: 'boot', pixels: [
      [1,14], [2,14], [5,14], [6,14], [9,14], [10,14], [13,14], [14,14],
      [1,15], [4,15], [7,15], [8,15], [11,15], [14,15],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 20. ABYSSAL_LEVIATHAN — Deep-sea mega-beast with
//     bioluminescent lures, armored plates, massive jaw.
// ════════════════════════════════════════════════════════════
export const ABYSSAL_LEVIATHAN_16: SpriteTemplate = {
  name: 'abyssal_leviathan_16', width: 16, height: 16,
  description: 'Deep-sea mega-beast. Massive armored head with bioluminescent lure, gaping jaw of teeth, fin crests.',
  regions: [
    // Bioluminescent lure — dangling above
    { name: 'lure', role: 'accessory', pixels: [
      [7,0], [8,0],
      [7,1], [8,1],
      [6,2], [9,2],
    ]},
    // Armored head — massive, fills upper half
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 4, 11),
      ...hLine(3, 3, 12),
      ...hLine(4, 2, 13),
      ...hLine(5, 2, 13),
      ...hLine(6, 3, 12),
    ]},
    // Small fierce eyes — deep set
    { name: 'eyes', role: 'eye', pixels: [
      [4,3], [5,3], [10,3], [11,3],
    ]},
    // Armored plate ridges
    { name: 'plates', role: 'face', pixels: [
      [6,4], [7,4], [8,4], [9,4],
      [5,5], [10,5],
    ]},
    // Upper jaw + teeth row
    { name: 'upper_jaw', role: 'body', pixels: [
      ...hLine(7, 2, 13),
    ]},
    // Teeth — jagged
    { name: 'teeth', role: 'belt', pixels: [
      [3,8], [5,8], [7,8], [9,8], [11,8],
      [4,9], [6,9], [8,9], [10,9], [12,9],
    ]},
    // Lower jaw
    { name: 'lower_jaw', role: 'body', pixels: [
      ...hLine(9, 3, 12),
      ...hLine(10, 4, 11),
    ]},
    // Fin crests — sides
    { name: 'fins', role: 'arm', pixels: [
      [0,3], [1,3], [14,3], [15,3],
      [0,4], [1,4], [14,4], [15,4],
      [0,5], [1,5], [14,5], [15,5],
      [1,6], [14,6],
      [0,6], [15,6],
    ]},
    // Body below jaw
    { name: 'body', role: 'body', pixels: [
      ...hLine(11, 5, 10),
      ...hLine(12, 6, 9),
    ]},
    // Tail fin
    { name: 'tail', role: 'leg', pixels: [
      [5,13], [6,13], [7,13], [8,13], [9,13], [10,13],
      [4,14], [5,14], [10,14], [11,14],
      [3,15], [4,15], [11,15], [12,15],
    ]},
    // Ventral fins
    { name: 'ventral', role: 'boot', pixels: [
      [3,11], [4,11], [11,11], [12,11],
      [2,12], [3,12], [12,12], [13,12],
    ]},
    // Biolum spots on body
    { name: 'biolum', role: 'hand', pixels: [
      [4,5], [11,5],
      [3,4], [12,4],
    ]},
  ],
};


// ════════════════════════════════════════════════════════════
// COLOR SCHEMES
// ════════════════════════════════════════════════════════════

export const VOID_LORD_COLORS = scheme('void_lord_default', {
  head:      { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },
  eye:       { shadow: '#442434', base: '#597dce',  highlight: '#deeed6' },
  body:      { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },
  arm:       { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },
  belt:      { shadow: '#442434', base: '#597dce',  highlight: '#6dc2ca' },
  leg:       { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },
  accessory: { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },
});

export const COLOSSUS_COLORS = scheme('colossus_default', {
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  eye:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
  face:      { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
  body:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  arm:       { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  hand:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  belt:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  leg:       { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  accessory: { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
});

export const QUEEN_BEE_COLORS = scheme('queen_bee_default', {
  head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  eye:       { shadow: '#854c30', base: '#d04648',  highlight: '#d27d2c' },
  face:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  body:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  arm:       { shadow: '#757161', base: '#d2aa99',  highlight: '#deeed6' },
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  leg:       { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  boot:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  accessory: { shadow: '#854c30', base: '#dad45e',  highlight: '#deeed6' },
});

export const FROST_GIANT_COLORS = scheme('frost_giant_default', {
  head:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  eye:       { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
  face:      { shadow: '#597dce', base: '#8595a1',  highlight: '#deeed6' },
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#8595a1' },
  arm:       { shadow: '#30346d', base: '#597dce',  highlight: '#8595a1' },
  hand:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
  belt:      { shadow: '#140c1c', base: '#30346d',  highlight: '#4e4a4e' },
  leg:       { shadow: '#30346d', base: '#597dce',  highlight: '#8595a1' },
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
  accessory: { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
});

export const CYBER_DRAGON_COLORS = scheme('cyber_dragon_default', {
  head:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },
  eye:       { shadow: '#854c30', base: '#d04648',  highlight: '#d27d2c' },
  face:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  body:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  arm:       { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },
  hand:      { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
  belt:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
  leg:       { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  accessory: { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
});

export const ANCIENT_PHARAOH_COLORS = scheme('ancient_pharaoh_default', {
  head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
  eye:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
  face:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  hand:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },
  belt:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
});

export const BLOOD_MOON_COLORS = scheme('blood_moon_default', {
  head:      { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },
  eye:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  face:      { shadow: '#140c1c', base: '#442434',  highlight: '#d04648' },
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d04648' },
  arm:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },
  belt:      { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },
  leg:       { shadow: '#140c1c', base: '#442434',  highlight: '#d04648' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
});

export const STORM_TITAN_COLORS = scheme('storm_titan_default', {
  head:      { shadow: '#30346d', base: '#4e4a4e',  highlight: '#8595a1' },
  eye:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },
  body:      { shadow: '#30346d', base: '#4e4a4e',  highlight: '#757161' },
  arm:       { shadow: '#30346d', base: '#4e4a4e',  highlight: '#757161' },
  hand:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  belt:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
  leg:       { shadow: '#30346d', base: '#4e4a4e',  highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#4e4a4e' },
  accessory: { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
});

export const PLAGUE_MOTHER_COLORS = scheme('plague_mother_default', {
  head:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
  eye:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
  face:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  body:      { shadow: '#346524', base: '#6daa2c',  highlight: '#d2aa99' },
  arm:       { shadow: '#140c1c', base: '#346524',  highlight: '#6daa2c' },
  hand:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
  belt:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  leg:       { shadow: '#140c1c', base: '#346524',  highlight: '#6daa2c' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#346524' },
  accessory: { shadow: '#442434', base: '#6daa2c',  highlight: '#dad45e' },
});

export const CRYSTAL_DRAKE_COLORS = scheme('crystal_drake_default', {
  head:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  eye:       { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
  face:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  arm:       { shadow: '#442434', base: '#597dce',  highlight: '#deeed6' },
  hand:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  belt:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
  leg:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
  accessory: { shadow: '#442434', base: '#597dce',  highlight: '#deeed6' },
});

export const SHADOW_KING_COLORS = scheme('shadow_king_default', {
  head:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  eye:       { shadow: '#442434', base: '#597dce',  highlight: '#deeed6' },
  face:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  body:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  arm:       { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  hand:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },
  leg:       { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  accessory: { shadow: '#30346d', base: '#4e4a4e',  highlight: '#757161' },
});

export const MAGMA_WYRM_COLORS = scheme('magma_wyrm_default', {
  head:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  eye:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
  face:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  body:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  arm:       { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  belt:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  leg:       { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  boot:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  accessory: { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
});

export const GHOST_SHIP_COLORS = scheme('ghost_ship_default', {
  head:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },
  eye:       { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
  face:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#757161' },
  arm:       { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },
  hand:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  belt:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
  accessory: { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },
});

export const WAR_MACHINE_COLORS = scheme('war_machine_default', {
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  eye:       { shadow: '#854c30', base: '#d04648',  highlight: '#d27d2c' },
  face:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  body:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  arm:       { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  hand:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  belt:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  leg:       { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  accessory: { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
});

export const FOREST_GUARDIAN_COLORS = scheme('forest_guardian_default', {
  head:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  eye:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
  face:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  hand:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
  belt:      { shadow: '#346524', base: '#854c30',  highlight: '#d27d2c' },
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
});

export const DEATH_KNIGHT_COLORS = scheme('death_knight_default', {
  head:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  eye:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  face:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  body:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  arm:       { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  hand:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  leg:       { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
});

export const SPACE_KRAKEN_COLORS = scheme('space_kraken_default', {
  head:      { shadow: '#30346d', base: '#442434',  highlight: '#597dce' },
  eye:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
  face:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
  body:      { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
  hand:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#597dce',  highlight: '#6dc2ca' },
  leg:       { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },
  accessory: { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
});

export const CHIMERA_COLORS = scheme('chimera_default', {
  hair:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  eye:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  face:      { shadow: '#854c30', base: '#d04648',  highlight: '#d27d2c' },
  body:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  hand:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
  belt:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
  leg:       { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },
  boot:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  accessory: { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
});

export const TIME_WRAITH_COLORS = scheme('time_wraith_default', {
  head:      { shadow: '#30346d', base: '#597dce',  highlight: '#8595a1' },
  eye:       { shadow: '#442434', base: '#597dce',  highlight: '#deeed6' },
  face:      { shadow: '#30346d', base: '#597dce',  highlight: '#8595a1' },
  body:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },
  hand:      { shadow: '#30346d', base: '#597dce',  highlight: '#8595a1' },
  belt:      { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
  leg:       { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },
  accessory: { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },
});

export const ABYSSAL_LEVIATHAN_COLORS = scheme('abyssal_leviathan_default', {
  head:      { shadow: '#140c1c', base: '#30346d',  highlight: '#4e4a4e' },
  eye:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  face:      { shadow: '#30346d', base: '#4e4a4e',  highlight: '#757161' },
  body:      { shadow: '#140c1c', base: '#30346d',  highlight: '#4e4a4e' },
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#4e4a4e' },
  hand:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
  belt:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
  leg:       { shadow: '#140c1c', base: '#30346d',  highlight: '#4e4a4e' },
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#4e4a4e' },
  accessory: { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
});


// ════════════════════════════════════════════════════════════
// Exports
// ════════════════════════════════════════════════════════════

export const BOSS_BATCH2_TEMPLATES: Record<string, SpriteTemplate> = {
  void_lord_16: VOID_LORD_16,
  colossus_16: COLOSSUS_16,
  queen_bee_16: QUEEN_BEE_16,
  frost_giant_16: FROST_GIANT_16,
  cyber_dragon_16: CYBER_DRAGON_16,
  ancient_pharaoh_16: ANCIENT_PHARAOH_16,
  blood_moon_16: BLOOD_MOON_16,
  storm_titan_16: STORM_TITAN_16,
  plague_mother_16: PLAGUE_MOTHER_16,
  crystal_drake_16: CRYSTAL_DRAKE_16,
  shadow_king_16: SHADOW_KING_16,
  magma_wyrm_16: MAGMA_WYRM_16,
  ghost_ship_16: GHOST_SHIP_16,
  war_machine_16: WAR_MACHINE_16,
  forest_guardian_16: FOREST_GUARDIAN_16,
  death_knight_16: DEATH_KNIGHT_16,
  space_kraken_16: SPACE_KRAKEN_16,
  chimera_16: CHIMERA_16,
  time_wraith_16: TIME_WRAITH_16,
  abyssal_leviathan_16: ABYSSAL_LEVIATHAN_16,
};

export const BOSS_BATCH2_COLOR_SCHEMES: Record<string, ColorScheme> = {
  void_lord_default: VOID_LORD_COLORS,
  colossus_default: COLOSSUS_COLORS,
  queen_bee_default: QUEEN_BEE_COLORS,
  frost_giant_default: FROST_GIANT_COLORS,
  cyber_dragon_default: CYBER_DRAGON_COLORS,
  ancient_pharaoh_default: ANCIENT_PHARAOH_COLORS,
  blood_moon_default: BLOOD_MOON_COLORS,
  storm_titan_default: STORM_TITAN_COLORS,
  plague_mother_default: PLAGUE_MOTHER_COLORS,
  crystal_drake_default: CRYSTAL_DRAKE_COLORS,
  shadow_king_default: SHADOW_KING_COLORS,
  magma_wyrm_default: MAGMA_WYRM_COLORS,
  ghost_ship_default: GHOST_SHIP_COLORS,
  war_machine_default: WAR_MACHINE_COLORS,
  forest_guardian_default: FOREST_GUARDIAN_COLORS,
  death_knight_default: DEATH_KNIGHT_COLORS,
  space_kraken_default: SPACE_KRAKEN_COLORS,
  chimera_default: CHIMERA_COLORS,
  time_wraith_default: TIME_WRAITH_COLORS,
  abyssal_leviathan_default: ABYSSAL_LEVIATHAN_COLORS,
};
