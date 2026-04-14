/**
 * 16x16 boss templates — batch 3.
 * 20 templates with imposing silhouettes and high density (60-75%).
 * DB16 palette. Colored eyes (red/yellow/purple) for all bosses.
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

const BOSS3_BASE = {
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

function scheme(name: string, overrides: Partial<typeof BOSS3_BASE>): ColorScheme {
  return { name, mapping: { ...BOSS3_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. BONE_EMPEROR — Skeletal king seated on bone throne,
//    crown of ribs, glowing red eye sockets, scepter.
// ════════════════════════════════════════════════════════════
export const BONE_EMPEROR_16: SpriteTemplate = {
  name: 'bone_emperor_16', width: 16, height: 16,
  description: 'Skeletal king on bone throne. Crown of ribs, glowing red eye sockets, regal scepter.',
  regions: [
    // Crown — rib-like spikes
    { name: 'crown', role: 'accessory', pixels: [
      [5,0], [7,0], [9,0],
      [4,1], [5,1], [7,1], [9,1], [10,1],
    ]},
    // Skull head
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
    ]},
    // Glowing red eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Jaw
    { name: 'jaw', role: 'face', pixels: [
      [6,5], [7,5], [8,5], [9,5],
    ]},
    // Ribcage torso
    { name: 'torso', role: 'body', pixels: [
      ...hLine(6, 5, 10),
      [5,7], [6,7], [8,7], [10,7],
      [5,8], [7,8], [9,8], [10,8],
      ...hLine(9, 5, 10),
    ]},
    // Scepter — left hand
    { name: 'scepter', role: 'belt', pixels: [
      [3,2], [3,3], [2,3],
      ...vLine(3, 4, 12),
    ]},
    // Arms — bony
    { name: 'arms', role: 'arm', pixels: [
      [4,6], [4,7], [4,8],
      [11,6], [11,7], [11,8],
    ]},
    // Hands
    { name: 'hands', role: 'hand', pixels: [
      [3,8], [4,9],
      [11,9], [12,8],
    ]},
    // Throne back — wide bone structure
    { name: 'throne_back', role: 'hair', pixels: [
      [1,3], [1,4], [1,5], [1,6], [1,7], [1,8],
      [14,3], [14,4], [14,5], [14,6], [14,7], [14,8],
      [2,4], [2,5], [2,6], [2,7],
      [13,4], [13,5], [13,6], [13,7],
    ]},
    // Throne seat + legs
    { name: 'throne_seat', role: 'leg', pixels: [
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
      [2,12], [3,12], [4,12], [11,12], [12,12], [13,12],
    ]},
    // Throne base
    { name: 'throne_base', role: 'boot', pixels: [
      ...hLine(13, 1, 14),
      ...hLine(14, 1, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 2. LEVIATHAN — Massive sea beast coiling up from below,
//    huge jaws, fins, scales, serpentine body.
// ════════════════════════════════════════════════════════════
export const LEVIATHAN_16: SpriteTemplate = {
  name: 'leviathan_16', width: 16, height: 16,
  description: 'Massive sea beast. Serpentine body coiling upward, huge fanged jaws, dorsal fins, glowing eyes.',
  regions: [
    // Dorsal fin crest
    { name: 'crest', role: 'accessory', pixels: [
      [5,0], [6,0],
      [4,1], [5,1],
    ]},
    // Head — massive jaws
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 6, 10),
      ...hLine(2, 4, 11),
      ...hLine(3, 4, 12),
      ...hLine(4, 5, 11),
    ]},
    // Glowing yellow eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,2], [7,2], [10,2], [11,2],
    ]},
    // Fangs / jaw
    { name: 'jaws', role: 'face', pixels: [
      [5,5], [6,5], [9,5], [10,5], [11,5],
      [6,6], [10,6],
    ]},
    // Upper body — thick serpentine coil
    { name: 'body_upper', role: 'body', pixels: [
      ...hLine(5, 7, 8),
      ...hLine(6, 2, 9),
      ...hLine(7, 1, 8),
      ...hLine(8, 1, 7),
    ]},
    // Mid body coil
    { name: 'body_mid', role: 'arm', pixels: [
      ...hLine(9, 3, 10),
      ...hLine(10, 5, 12),
      ...hLine(11, 7, 13),
    ]},
    // Scales pattern
    { name: 'scales', role: 'belt', pixels: [
      [3,7], [5,7], [7,7],
      [4,9], [6,9], [8,9],
      [7,11], [9,11], [11,11],
    ]},
    // Lower coil
    { name: 'body_lower', role: 'leg', pixels: [
      ...hLine(12, 4, 11),
      ...hLine(13, 2, 9),
      ...hLine(14, 1, 7),
    ]},
    // Tail fin
    { name: 'tail', role: 'boot', pixels: [
      [1,14], [2,14],
      [0,15], [1,15], [2,15], [3,15],
    ]},
    // Side fins
    { name: 'fins', role: 'hair', pixels: [
      [0,7], [0,8],
      [13,9], [14,9], [14,10],
      [14,12], [15,12], [15,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 3. MOTH_QUEEN — Giant moth with spread dust wings,
//    antennae, fuzzy body, wing eye spots.
// ════════════════════════════════════════════════════════════
export const MOTH_QUEEN_16: SpriteTemplate = {
  name: 'moth_queen_16', width: 16, height: 16,
  description: 'Giant moth queen. Spread dust wings with eye spots, feathered antennae, fuzzy thorax.',
  regions: [
    // Antennae — feathered
    { name: 'antennae', role: 'hair', pixels: [
      [4,0], [5,0], [10,0], [11,0],
      [5,1], [6,1], [9,1], [10,1],
    ]},
    // Head — small fuzzy
    { name: 'head', role: 'head', pixels: [
      [6,2], [7,2], [8,2], [9,2],
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Glowing purple eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7,2], [8,2],
    ]},
    // Thorax — fuzzy body
    { name: 'thorax', role: 'body', pixels: [
      ...hLine(4, 6, 9),
      ...hLine(5, 5, 10),
      ...hLine(6, 6, 9),
      ...hLine(7, 6, 9),
    ]},
    // Left wing — large spread
    { name: 'wing_left', role: 'arm', pixels: [
      [3,3], [4,3], [5,3],
      [2,4], [3,4], [4,4], [5,4],
      [1,5], [2,5], [3,5], [4,5],
      [1,6], [2,6], [3,6], [4,6], [5,6],
      [1,7], [2,7], [3,7], [4,7], [5,7],
      [1,8], [2,8], [3,8], [4,8], [5,8],
      [2,9], [3,9], [4,9], [5,9],
      [3,10], [4,10], [5,10],
    ]},
    // Right wing — large spread
    { name: 'wing_right', role: 'leg', pixels: [
      [10,3], [11,3], [12,3],
      [10,4], [11,4], [12,4], [13,4],
      [10,5], [11,5], [12,5], [13,5], [14,5],
      [10,6], [11,6], [12,6], [13,6], [14,6],
      [10,7], [11,7], [12,7], [13,7], [14,7],
      [10,8], [11,8], [12,8], [13,8], [14,8],
      [10,9], [11,9], [12,9], [13,9],
      [10,10], [11,10], [12,10],
    ]},
    // Wing eye spots — dramatic markings
    { name: 'eye_spots', role: 'accessory', pixels: [
      [3,6], [4,6],
      [3,7], [4,7],
      [11,6], [12,6],
      [11,7], [12,7],
    ]},
    // Wing dust pattern
    { name: 'dust', role: 'belt', pixels: [
      [2,5], [3,8], [5,9],
      [13,5], [12,8], [10,9],
    ]},
    // Abdomen — hanging below
    { name: 'abdomen', role: 'face', pixels: [
      [7,8], [8,8],
      [6,9], [7,9], [8,9], [9,9],
      [6,10], [7,10], [8,10], [9,10],
      [7,11], [8,11],
    ]},
    // Lower wing tips
    { name: 'wing_tips', role: 'boot', pixels: [
      [2,11], [3,11], [4,11],
      [1,12], [2,12], [3,12],
      [11,11], [12,11], [13,11],
      [12,12], [13,12], [14,12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 4. IRON_TITAN — Massive metal golem with riveted plates,
//    steam vents, glowing furnace core, huge arms.
// ════════════════════════════════════════════════════════════
export const IRON_TITAN_16: SpriteTemplate = {
  name: 'iron_titan_16', width: 16, height: 16,
  description: 'Massive metal golem. Riveted plate armor, steam vents on shoulders, furnace core glow, boulder fists.',
  regions: [
    // Small armored head
    { name: 'head', role: 'head', pixels: [
      [6,0], [7,0], [8,0], [9,0],
      [6,1], [7,1], [8,1], [9,1],
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Glowing yellow eyes — slit visor
    { name: 'eyes', role: 'eye', pixels: [
      [7,1], [8,1],
    ]},
    // Steam vents — shoulder pipes
    { name: 'vents', role: 'accessory', pixels: [
      [2,2], [3,2], [12,2], [13,2],
      [2,3], [3,3], [12,3], [13,3],
    ]},
    // Massive shoulders + torso plates
    { name: 'torso', role: 'body', pixels: [
      ...hLine(3, 4, 11),
      ...hLine(4, 2, 13),
      ...hLine(5, 2, 13),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 4, 11),
    ]},
    // Furnace core — glowing center
    { name: 'furnace', role: 'belt', pixels: [
      [7,5], [8,5],
      [6,6], [7,6], [8,6], [9,6],
      [7,7], [8,7],
    ]},
    // Arms — thick metal pillars
    { name: 'arms', role: 'arm', pixels: [
      [1,4], [1,5], [1,6], [1,7], [1,8],
      [0,5], [0,6], [0,7],
      [14,4], [14,5], [14,6], [14,7], [14,8],
      [15,5], [15,6], [15,7],
    ]},
    // Huge fists
    { name: 'fists', role: 'hand', pixels: [
      [0,8], [0,9], [1,9], [2,9],
      [0,10], [1,10], [2,10],
      [13,9], [14,9], [15,8], [15,9],
      [13,10], [14,10], [15,10],
    ]},
    // Rivets detail
    { name: 'rivets', role: 'face', pixels: [
      [4,4], [11,4],
      [5,6], [10,6],
      [4,8], [11,8],
    ]},
    // Legs — armored columns
    { name: 'legs', role: 'leg', pixels: [
      ...rect(4, 9, 6, 13),
      ...rect(9, 9, 11, 13),
    ]},
    // Feet — heavy plates
    { name: 'feet', role: 'boot', pixels: [
      ...hLine(14, 3, 7),
      ...hLine(14, 8, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 5. MIND_FLAYER — Tentacle-faced psychic entity with
//    brain dome, face tentacles, robes, psionic aura.
// ════════════════════════════════════════════════════════════
export const MIND_FLAYER_16: SpriteTemplate = {
  name: 'mind_flayer_16', width: 16, height: 16,
  description: 'Tentacle-faced psychic. Bulging brain dome, face tentacles, dark robes, psionic aura.',
  regions: [
    // Brain dome — bulging cranium
    { name: 'brain', role: 'hair', pixels: [
      ...hLine(0, 5, 10),
      ...hLine(1, 4, 11),
      ...hLine(2, 4, 11),
    ]},
    // Face
    { name: 'head', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
    ]},
    // Glowing purple eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Face tentacles — hanging down
    { name: 'tentacles', role: 'face', pixels: [
      [5,5], [6,5], [7,5], [8,5], [9,5], [10,5],
      [5,6], [7,6], [8,6], [10,6],
      [5,7], [7,7], [8,7], [10,7],
      [4,8], [6,8], [9,8], [11,8],
    ]},
    // Psionic aura — energy around head
    { name: 'aura', role: 'accessory', pixels: [
      [3,0], [12,0],
      [3,1], [12,1],
      [3,3], [12,3],
      [2,4], [13,4],
    ]},
    // Robed body
    { name: 'robes', role: 'body', pixels: [
      ...hLine(7, 4, 11),
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
      ...hLine(10, 3, 12),
      ...hLine(11, 4, 11),
    ]},
    // Arms — robed, spread
    { name: 'arms', role: 'arm', pixels: [
      [2,8], [2,9], [2,10],
      [1,9], [1,10],
      [13,8], [13,9], [13,10],
      [14,9], [14,10],
    ]},
    // Hands — clawed
    { name: 'hands', role: 'hand', pixels: [
      [0,10], [1,11],
      [15,10], [14,11],
    ]},
    // Robe lower
    { name: 'robe_lower', role: 'leg', pixels: [
      ...hLine(12, 4, 11),
      ...hLine(13, 5, 10),
      [5,14], [6,14], [9,14], [10,14],
    ]},
    // Robe hem
    { name: 'hem', role: 'boot', pixels: [
      [4,14], [7,14], [8,14], [11,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 6. PLAGUE_DRAGON — Diseased dragon with torn wings,
//    pustules, decayed scales, toxic breath glow.
// ════════════════════════════════════════════════════════════
export const PLAGUE_DRAGON_16: SpriteTemplate = {
  name: 'plague_dragon_16', width: 16, height: 16,
  description: 'Diseased dragon. Torn membranous wings, pustule-covered scales, toxic breath glow, rotting body.',
  regions: [
    // Horns — twisted
    { name: 'horns', role: 'hair', pixels: [
      [3,0], [4,0],
      [3,1],
    ]},
    // Head — decayed dragon skull
    { name: 'head', role: 'head', pixels: [
      [4,1], [5,1], [6,1],
      [3,2], [4,2], [5,2], [6,2], [7,2],
      [3,3], [4,3], [5,3], [6,3],
    ]},
    // Toxic green eyes
    { name: 'eyes', role: 'eye', pixels: [
      [4,2], [5,2],
    ]},
    // Toxic breath — glow
    { name: 'breath', role: 'accessory', pixels: [
      [7,3], [8,3],
      [8,4], [9,4], [10,4],
      [9,5], [10,5], [11,5],
    ]},
    // Snout / jaw
    { name: 'jaw', role: 'face', pixels: [
      [6,4], [7,4],
      [5,4],
    ]},
    // Body — massive decayed torso
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 3, 8),
      ...hLine(6, 2, 9),
      ...hLine(7, 2, 10),
      ...hLine(8, 2, 10),
      ...hLine(9, 3, 9),
    ]},
    // Pustules — sickly spots on body
    { name: 'pustules', role: 'belt', pixels: [
      [4,6], [7,6],
      [3,8], [6,8], [9,8],
      [5,9], [8,9],
    ]},
    // Left torn wing
    { name: 'wing_left', role: 'arm', pixels: [
      [0,3], [1,3],
      [0,4], [1,4], [2,4],
      [0,5], [1,5], [2,5],
      [0,6], [1,6],
      [1,7],
    ]},
    // Right torn wing
    { name: 'wing_right', role: 'leg', pixels: [
      [11,6], [12,6], [13,6],
      [11,7], [12,7], [13,7], [14,7],
      [12,8], [13,8], [14,8],
      [13,9], [14,9],
    ]},
    // Tail — thick decaying
    { name: 'tail', role: 'boot', pixels: [
      ...hLine(10, 4, 8),
      ...hLine(11, 5, 9),
      ...hLine(12, 7, 11),
      [10,13], [11,13], [12,13],
      [12,14], [13,14],
    ]},
    // Legs — stubby
    { name: 'legs', role: 'hand', pixels: [
      [2,10], [3,10], [4,10],
      [2,11], [3,11],
      [6,10], [7,10], [8,10],
      [7,11], [8,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 7. STAR_DEVOURER — Cosmic entity with nebula body,
//    star-core eye, tendrils reaching outward, void aura.
// ════════════════════════════════════════════════════════════
export const STAR_DEVOURER_16: SpriteTemplate = {
  name: 'star_devourer_16', width: 16, height: 16,
  description: 'Cosmic entity. Nebula-like body, single burning star-core eye, void tendrils, cosmic aura.',
  regions: [
    // Cosmic tendrils — top
    { name: 'tendrils_top', role: 'accessory', pixels: [
      [3,0], [7,0], [8,0], [12,0],
      [4,1], [7,1], [8,1], [11,1],
    ]},
    // Outer nebula shell
    { name: 'nebula', role: 'hair', pixels: [
      [5,1], [6,1], [9,1], [10,1],
      [3,2], [4,2], [11,2], [12,2],
      [2,3], [3,3], [12,3], [13,3],
      [2,4], [13,4],
      [1,5], [14,5],
      [1,6], [14,6],
      [1,7], [14,7],
      [2,8], [13,8],
      [2,9], [13,9],
      [3,10], [12,10],
    ]},
    // Inner body — dense cosmic mass
    { name: 'body', role: 'body', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 3, 12),
      ...hLine(5, 2, 13),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
      ...hLine(10, 4, 11),
    ]},
    // Star-core eye — massive central eye
    { name: 'star_eye', role: 'eye', pixels: [
      [7,4], [8,4],
      [6,5], [7,5], [8,5], [9,5],
      [6,6], [7,6], [8,6], [9,6],
      [7,7], [8,7],
    ]},
    // Energy veins — internal glow lines
    { name: 'veins', role: 'belt', pixels: [
      [5,3], [10,3],
      [4,5], [11,5],
      [4,7], [11,7],
      [5,9], [10,9],
    ]},
    // Lower tendrils
    { name: 'tendrils_lower', role: 'leg', pixels: [
      [4,11], [5,11], [6,11], [9,11], [10,11], [11,11],
      [3,12], [5,12], [6,12], [9,12], [10,12], [12,12],
      [2,13], [4,13], [7,13], [8,13], [11,13], [13,13],
    ]},
    // Tendril tips
    { name: 'tendril_tips', role: 'boot', pixels: [
      [1,14], [3,14], [7,14], [8,14], [12,14], [14,14],
    ]},
    // Side wisps
    { name: 'wisps', role: 'arm', pixels: [
      [0,5], [0,6], [0,7],
      [15,5], [15,6], [15,7],
    ]},
    // Face detail — maw beneath eye
    { name: 'maw', role: 'face', pixels: [
      [7,8], [8,8],
      [6,9], [9,9],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 8. FUNGUS_LORD — Massive mushroom king with cap crown,
//    spore clouds, trunk body, root tendrils.
// ════════════════════════════════════════════════════════════
export const FUNGUS_LORD_16: SpriteTemplate = {
  name: 'fungus_lord_16', width: 16, height: 16,
  description: 'Massive mushroom king. Enormous cap crown with spots, thick trunk body, root tendrils, spore aura.',
  regions: [
    // Mushroom cap — wide dome
    { name: 'cap', role: 'hair', pixels: [
      ...hLine(0, 5, 10),
      ...hLine(1, 3, 12),
      ...hLine(2, 2, 13),
      ...hLine(3, 1, 14),
      ...hLine(4, 1, 14),
      ...hLine(5, 2, 13),
    ]},
    // Cap spots — toxic markings
    { name: 'spots', role: 'accessory', pixels: [
      [6,1], [10,1],
      [4,2], [8,2], [12,2],
      [3,3], [7,3], [11,3],
      [5,4], [9,4], [13,4],
    ]},
    // Face — recessed under cap
    { name: 'face', role: 'head', pixels: [
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
    ]},
    // Glowing red eyes
    { name: 'eyes', role: 'eye', pixels: [
      [5,6], [6,6], [9,6], [10,6],
    ]},
    // Mouth
    { name: 'mouth', role: 'face', pixels: [
      [7,7], [8,7],
    ]},
    // Trunk body — thick stalk
    { name: 'trunk', role: 'body', pixels: [
      ...hLine(8, 5, 10),
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
    ]},
    // Arms — branch-like
    { name: 'arms', role: 'arm', pixels: [
      [3,8], [3,9], [2,9], [2,10],
      [12,8], [12,9], [13,9], [13,10],
    ]},
    // Hands — fungal claws
    { name: 'hands', role: 'hand', pixels: [
      [1,10], [1,11],
      [14,10], [14,11],
    ]},
    // Root tendrils
    { name: 'roots', role: 'leg', pixels: [
      ...hLine(12, 4, 11),
      [3,13], [5,13], [6,13], [9,13], [10,13], [12,13],
      [2,14], [4,14], [7,14], [8,14], [11,14], [13,14],
    ]},
    // Spore cloud
    { name: 'spores', role: 'belt', pixels: [
      [0,4], [15,4],
      [0,7], [15,7],
      [1,8], [14,8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 9. SAND_EMPRESS — Desert queen with headdress,
//    scarab armor, sand magic, flowing robes.
// ════════════════════════════════════════════════════════════
export const SAND_EMPRESS_16: SpriteTemplate = {
  name: 'sand_empress_16', width: 16, height: 16,
  description: 'Desert queen. Tall pharaoh headdress, scarab breastplate, sand magic aura, flowing golden robes.',
  regions: [
    // Headdress — tall pharaoh crown
    { name: 'headdress', role: 'accessory', pixels: [
      [7,0], [8,0],
      [6,1], [7,1], [8,1], [9,1],
      [5,2], [6,2], [7,2], [8,2], [9,2], [10,2],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
    ]},
    // Glowing yellow eyes — divine
    { name: 'eyes', role: 'eye', pixels: [
      [6,4], [7,4], [8,4], [9,4],
    ]},
    // Headdress side flaps
    { name: 'flaps', role: 'hair', pixels: [
      [4,3], [4,4], [4,5], [4,6],
      [11,3], [11,4], [11,5], [11,6],
      [3,5], [3,6],
      [12,5], [12,6],
    ]},
    // Face — jaw veil
    { name: 'face_veil', role: 'face', pixels: [
      [6,5], [7,5], [8,5], [9,5],
    ]},
    // Scarab breastplate
    { name: 'scarab', role: 'belt', pixels: [
      [7,6], [8,6],
      [6,7], [7,7], [8,7], [9,7],
      [7,8], [8,8],
    ]},
    // Body — robed torso
    { name: 'body', role: 'body', pixels: [
      [5,6], [6,6], [9,6], [10,6],
      [5,7], [10,7],
      [5,8], [6,8], [9,8], [10,8],
      ...hLine(9, 5, 10),
    ]},
    // Arms — raised with magic
    { name: 'arms', role: 'arm', pixels: [
      [3,7], [2,7], [2,8], [1,8],
      [12,7], [13,7], [13,8], [14,8],
    ]},
    // Sand magic particles
    { name: 'sand_magic', role: 'hand', pixels: [
      [0,7], [0,8], [1,9],
      [15,7], [15,8], [14,9],
    ]},
    // Flowing robes — wide bottom
    { name: 'robes', role: 'leg', pixels: [
      ...hLine(10, 4, 11),
      ...hLine(11, 3, 12),
      ...hLine(12, 2, 13),
      ...hLine(13, 2, 13),
    ]},
    // Robe hem
    { name: 'hem', role: 'boot', pixels: [
      ...hLine(14, 1, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 10. THUNDER_GOD — Lightning deity with crackling aura,
//     hammer, thundercloud base, muscular build.
// ════════════════════════════════════════════════════════════
export const THUNDER_GOD_16: SpriteTemplate = {
  name: 'thunder_god_16', width: 16, height: 16,
  description: 'Lightning deity. Crackling aura, war hammer, thundercloud base, muscular divine body.',
  regions: [
    // Lightning crown
    { name: 'crown', role: 'accessory', pixels: [
      [5,0], [7,0], [9,0], [11,0],
      [6,0], [8,0], [10,0],
    ]},
    // Head — divine helm
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 5, 10),
      ...hLine(2, 5, 10),
      ...hLine(3, 6, 9),
    ]},
    // Glowing yellow eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Beard
    { name: 'beard', role: 'face', pixels: [
      [7,3], [8,3],
      [7,4], [8,4],
    ]},
    // Muscular torso
    { name: 'torso', role: 'body', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 5, 10),
    ]},
    // Belt / waist
    { name: 'belt', role: 'belt', pixels: [
      ...hLine(9, 5, 10),
    ]},
    // Left arm + hammer
    { name: 'arm_left', role: 'arm', pixels: [
      [3,5], [3,6], [3,7],
      [2,5], [2,6],
    ]},
    // Hammer
    { name: 'hammer', role: 'hair', pixels: [
      [0,4], [1,4], [2,4],
      [0,5], [1,5],
      [1,7], [1,8],
    ]},
    // Right arm
    { name: 'arm_right', role: 'hand', pixels: [
      [12,5], [12,6], [12,7],
      [13,5], [13,6],
    ]},
    // Lightning bolts — from right hand
    { name: 'lightning', role: 'hair', pixels: [
      [14,5], [14,6],
      [15,4], [15,6],
    ]},
    // Legs — powerful
    { name: 'legs', role: 'leg', pixels: [
      ...rect(5, 10, 7, 12),
      ...rect(8, 10, 10, 12),
    ]},
    // Thundercloud base
    { name: 'cloud', role: 'boot', pixels: [
      ...hLine(13, 3, 12),
      ...hLine(14, 2, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 11. ICE_QUEEN_BOSS — Frozen sorceress with crystal crown,
//     ice armor, frost aura, frozen scepter.
// ════════════════════════════════════════════════════════════
export const ICE_QUEEN_BOSS_16: SpriteTemplate = {
  name: 'ice_queen_boss_16', width: 16, height: 16,
  description: 'Frozen sorceress. Crystal crown, ice armor plates, frost aura, frozen scepter.',
  regions: [
    // Crystal crown — jagged ice shards
    { name: 'crown', role: 'accessory', pixels: [
      [5,0], [7,0], [10,0],
      [5,1], [6,1], [7,1], [9,1], [10,1],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
      ...hLine(4, 6, 9),
    ]},
    // Glowing purple-blue eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Ice veil
    { name: 'veil', role: 'face', pixels: [
      [7,4], [8,4],
    ]},
    // Ice armor torso
    { name: 'torso', role: 'body', pixels: [
      ...hLine(5, 5, 10),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 5, 10),
    ]},
    // Frost aura — particles around body
    { name: 'frost', role: 'belt', pixels: [
      [3,4], [12,4],
      [2,6], [13,6],
      [3,8], [12,8],
    ]},
    // Arms — armored
    { name: 'arms', role: 'arm', pixels: [
      [3,5], [3,6], [3,7],
      [12,5], [12,6], [12,7],
    ]},
    // Scepter — left hand
    { name: 'scepter', role: 'hair', pixels: [
      [1,3], [2,3],
      [2,4], [2,5],
      [1,5], [1,6], [1,7],
    ]},
    // Hands
    { name: 'hands', role: 'hand', pixels: [
      [2,7], [2,8],
      [13,7], [13,8],
    ]},
    // Flowing icy gown
    { name: 'gown', role: 'leg', pixels: [
      ...hLine(9, 4, 11),
      ...hLine(10, 3, 12),
      ...hLine(11, 3, 12),
      ...hLine(12, 2, 13),
      ...hLine(13, 2, 13),
    ]},
    // Gown hem — ice crystals
    { name: 'hem', role: 'boot', pixels: [
      ...hLine(14, 1, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 12. LAVA_TITAN — Magma giant with cracked rock skin,
//     molten core, lava drips, volcanic vents.
// ════════════════════════════════════════════════════════════
export const LAVA_TITAN_16: SpriteTemplate = {
  name: 'lava_titan_16', width: 16, height: 16,
  description: 'Magma giant. Cracked obsidian rock skin, molten lava core, volcanic vent shoulders, dripping magma.',
  regions: [
    // Small rocky head
    { name: 'head', role: 'head', pixels: [
      [6,0], [7,0], [8,0], [9,0],
      [6,1], [7,1], [8,1], [9,1],
    ]},
    // Glowing red eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7,0], [8,0],
    ]},
    // Volcanic vent shoulders
    { name: 'vents', role: 'accessory', pixels: [
      [2,1], [3,1], [12,1], [13,1],
      [2,2], [3,2], [12,2], [13,2],
    ]},
    // Massive body — cracked rock
    { name: 'body', role: 'body', pixels: [
      ...hLine(2, 4, 11),
      ...hLine(3, 2, 13),
      ...hLine(4, 1, 14),
      ...hLine(5, 1, 14),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 3, 12),
    ]},
    // Molten core — lava glow inside
    { name: 'core', role: 'belt', pixels: [
      [7,4], [8,4],
      [6,5], [7,5], [8,5], [9,5],
      [7,6], [8,6],
    ]},
    // Cracks — magma seams
    { name: 'cracks', role: 'face', pixels: [
      [4,3], [11,3],
      [3,5], [12,5],
      [5,7], [10,7],
    ]},
    // Arms — rocky pillars
    { name: 'arms', role: 'arm', pixels: [
      [0,4], [0,5], [0,6], [0,7],
      [1,6], [1,7], [1,8],
      [15,4], [15,5], [15,6], [15,7],
      [14,6], [14,7], [14,8],
    ]},
    // Fists — molten
    { name: 'fists', role: 'hand', pixels: [
      [0,8], [0,9], [1,9],
      [15,8], [15,9], [14,9],
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      ...rect(3, 9, 6, 12),
      ...rect(9, 9, 12, 12),
    ]},
    // Lava drip feet
    { name: 'feet', role: 'boot', pixels: [
      ...hLine(13, 2, 7),
      ...hLine(13, 8, 13),
      [3,14], [4,14], [5,14],
      [10,14], [11,14], [12,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 13. SHADOW_HYDRA — Multi-headed shadow serpent,
//     three shadowy heads, writhing body, dark aura.
// ════════════════════════════════════════════════════════════
export const SHADOW_HYDRA_16: SpriteTemplate = {
  name: 'shadow_hydra_16', width: 16, height: 16,
  description: 'Multi-headed shadow serpent. Three shadowy heads on long necks, writhing body, dark mist aura.',
  regions: [
    // Left head
    { name: 'head_left', role: 'head', pixels: [
      [1,0], [2,0], [3,0],
      [1,1], [2,1], [3,1],
      [2,2], [3,2],
    ]},
    // Center head
    { name: 'head_center', role: 'hair', pixels: [
      [7,0], [8,0],
      [6,1], [7,1], [8,1], [9,1],
      [7,2], [8,2],
    ]},
    // Right head
    { name: 'head_right', role: 'face', pixels: [
      [12,0], [13,0], [14,0],
      [12,1], [13,1], [14,1],
      [12,2], [13,2],
    ]},
    // Six glowing red eyes (2 per head)
    { name: 'eyes', role: 'eye', pixels: [
      [1,1], [3,1],
      [7,1], [8,1],
      [12,1], [14,1],
    ]},
    // Necks — snaking down
    { name: 'necks', role: 'arm', pixels: [
      [3,3], [4,3],
      [4,4], [5,4],
      [7,3], [8,3],
      [7,4], [8,4],
      [11,3], [12,3],
      [10,4], [11,4],
    ]},
    // Central body mass
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 11),
    ]},
    // Dark core
    { name: 'core', role: 'belt', pixels: [
      [7,6], [8,6],
      [6,7], [7,7], [8,7], [9,7],
      [7,8], [8,8],
    ]},
    // Shadow aura
    { name: 'aura', role: 'accessory', pixels: [
      [2,5], [13,5],
      [1,6], [14,6],
      [1,7], [14,7],
      [2,8], [13,8],
    ]},
    // Lower body — tendrils
    { name: 'lower', role: 'leg', pixels: [
      ...hLine(10, 4, 11),
      [3,11], [5,11], [6,11], [9,11], [10,11], [12,11],
      [2,12], [4,12], [7,12], [8,12], [11,12], [13,12],
    ]},
    // Tendril tips
    { name: 'tips', role: 'boot', pixels: [
      [1,13], [3,13], [6,13], [9,13], [12,13], [14,13],
      [1,14], [5,14], [10,14], [14,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 14. CLOCKWORK_KING — Mechanical ruler with gear crown,
//     bronze body, clock face chest, cog arms.
// ════════════════════════════════════════════════════════════
export const CLOCKWORK_KING_16: SpriteTemplate = {
  name: 'clockwork_king_16', width: 16, height: 16,
  description: 'Mechanical ruler. Gear-tooth crown, bronze plated body, clock face chest, rotating cog arms.',
  regions: [
    // Gear crown — cog-tooth top
    { name: 'crown', role: 'accessory', pixels: [
      [5,0], [7,0], [8,0], [10,0],
      [4,1], [5,1], [6,1], [7,1], [8,1], [9,1], [10,1], [11,1],
    ]},
    // Head — bronze helm
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
      ...hLine(4, 6, 9),
    ]},
    // Glowing yellow eyes — lens-like
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Face vent
    { name: 'vent', role: 'face', pixels: [
      [7,4], [8,4],
    ]},
    // Body — broad bronze plates
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 11),
    ]},
    // Clock face — circular in chest
    { name: 'clock', role: 'belt', pixels: [
      [7,5], [8,5],
      [6,6], [7,6], [8,6], [9,6],
      [6,7], [9,7],
      [6,8], [7,8], [8,8], [9,8],
      [7,9], [8,9],
    ]},
    // Clock hands
    { name: 'hands_clock', role: 'hair', pixels: [
      [7,7], [8,7],
    ]},
    // Cog arms — left
    { name: 'arm_left', role: 'arm', pixels: [
      [2,5], [2,6], [2,7], [2,8],
      [1,6], [1,7],
    ]},
    // Cog arms — right
    { name: 'arm_right', role: 'hand', pixels: [
      [13,5], [13,6], [13,7], [13,8],
      [14,6], [14,7],
    ]},
    // Cog fists
    { name: 'fists', role: 'arm', pixels: [
      [0,7], [1,8], [0,8],
      [15,7], [14,8], [15,8],
    ]},
    // Legs — piston-like
    { name: 'legs', role: 'leg', pixels: [
      ...rect(4, 10, 6, 13),
      ...rect(9, 10, 11, 13),
    ]},
    // Feet — flat mechanical
    { name: 'feet', role: 'boot', pixels: [
      ...hLine(14, 3, 7),
      ...hLine(14, 8, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 15. SWAMP_LORD — Bog monster boss with lily pad crown,
//     mossy body, vine arms, mud-dripping form.
// ════════════════════════════════════════════════════════════
export const SWAMP_LORD_16: SpriteTemplate = {
  name: 'swamp_lord_16', width: 16, height: 16,
  description: 'Bog monster boss. Lily pad crown, moss-covered body, vine whip arms, mud and algae dripping.',
  regions: [
    // Lily pad crown
    { name: 'crown', role: 'accessory', pixels: [
      ...hLine(0, 4, 11),
      ...hLine(1, 3, 12),
    ]},
    // Head — mossy mound
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 4, 11),
      ...hLine(3, 4, 11),
      ...hLine(4, 5, 10),
    ]},
    // Glowing yellow-green eyes
    { name: 'eyes', role: 'eye', pixels: [
      [5,3], [6,3], [9,3], [10,3],
    ]},
    // Gaping mouth
    { name: 'mouth', role: 'face', pixels: [
      [6,4], [7,4], [8,4], [9,4],
    ]},
    // Thick mossy body
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 11),
    ]},
    // Moss patches
    { name: 'moss', role: 'belt', pixels: [
      [5,5], [10,5],
      [4,7], [11,7],
      [5,9], [10,9],
    ]},
    // Vine left arm
    { name: 'vine_left', role: 'arm', pixels: [
      [2,5], [2,6], [1,6], [1,7], [0,7],
      [0,8], [0,9],
    ]},
    // Vine right arm
    { name: 'vine_right', role: 'hand', pixels: [
      [13,5], [13,6], [14,6], [14,7], [15,7],
      [15,8], [15,9],
    ]},
    // Mud-dripping lower body
    { name: 'mud_body', role: 'leg', pixels: [
      ...hLine(10, 3, 12),
      ...hLine(11, 3, 12),
      [3,12], [4,12], [6,12], [7,12], [8,12], [9,12], [11,12], [12,12],
    ]},
    // Mud drips and roots
    { name: 'roots', role: 'boot', pixels: [
      [2,13], [4,13], [7,13], [8,13], [11,13], [13,13],
      [3,14], [5,14], [7,14], [10,14], [12,14],
    ]},
    // Swamp flora
    { name: 'flora', role: 'hair', pixels: [
      [2,3], [13,3],
      [1,5], [14,5],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 16. VOID_EMPRESS — Dark dimension queen with corona,
//     rift body, dimension tears, ethereal gown.
// ════════════════════════════════════════════════════════════
export const VOID_EMPRESS_16: SpriteTemplate = {
  name: 'void_empress_16', width: 16, height: 16,
  description: 'Dark dimension queen. Void corona, rift-torn body, dimension tear wings, ethereal flowing gown.',
  regions: [
    // Void corona — spiky energy crown
    { name: 'corona', role: 'accessory', pixels: [
      [4,0], [7,0], [8,0], [11,0],
      [5,0], [6,0], [9,0], [10,0],
      [4,1], [5,1], [10,1], [11,1],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
    ]},
    // Glowing purple eyes — regal
    { name: 'eyes', role: 'eye', pixels: [
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Ethereal jaw
    { name: 'jaw', role: 'face', pixels: [
      [7,3], [8,3],
    ]},
    // Dimension tear wings — left
    { name: 'wing_left', role: 'arm', pixels: [
      [2,2], [3,2],
      [1,3], [2,3], [3,3],
      [0,4], [1,4], [2,4],
      [0,5], [1,5],
      [0,6], [1,6],
    ]},
    // Dimension tear wings — right
    { name: 'wing_right', role: 'hand', pixels: [
      [12,2], [13,2],
      [12,3], [13,3], [14,3],
      [13,4], [14,4], [15,4],
      [14,5], [15,5],
      [14,6], [15,6],
    ]},
    // Body — rift-torn
    { name: 'body', role: 'body', pixels: [
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 5, 10),
    ]},
    // Void rift core
    { name: 'rift', role: 'belt', pixels: [
      [7,5], [8,5],
      [6,6], [7,6], [8,6], [9,6],
    ]},
    // Ethereal gown — flowing wide
    { name: 'gown', role: 'leg', pixels: [
      ...hLine(8, 4, 11),
      ...hLine(9, 3, 12),
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
      ...hLine(12, 1, 14),
    ]},
    // Gown dissolving hem
    { name: 'hem', role: 'boot', pixels: [
      [1,13], [3,13], [5,13], [7,13], [8,13], [10,13], [12,13], [14,13],
      [2,14], [4,14], [6,14], [9,14], [11,14], [13,14],
    ]},
    // Crown hair
    { name: 'hair_strands', role: 'hair', pixels: [
      [3,1], [12,1],
      [3,4], [12,4],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 17. CRYSTAL_TITAN — Massive gem golem with faceted body,
//     prismatic glow, crystal spikes, refracting core.
// ════════════════════════════════════════════════════════════
export const CRYSTAL_TITAN_16: SpriteTemplate = {
  name: 'crystal_titan_16', width: 16, height: 16,
  description: 'Massive gem golem. Faceted crystalline body, prismatic glow, crystal spike shoulders, refracting core.',
  regions: [
    // Crystal spike crown
    { name: 'spikes', role: 'accessory', pixels: [
      [5,0], [10,0],
      [4,0], [11,0],
      [3,1], [12,1],
    ]},
    // Small faceted head
    { name: 'head', role: 'head', pixels: [
      [6,0], [7,0], [8,0], [9,0],
      [6,1], [7,1], [8,1], [9,1],
    ]},
    // Glowing purple eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7,1], [8,1],
    ]},
    // Shoulder crystals
    { name: 'shoulders', role: 'hair', pixels: [
      [2,2], [3,2], [12,2], [13,2],
      [1,3], [2,3], [13,3], [14,3],
    ]},
    // Massive faceted torso
    { name: 'torso', role: 'body', pixels: [
      ...hLine(2, 4, 11),
      ...hLine(3, 3, 12),
      ...hLine(4, 2, 13),
      ...hLine(5, 1, 14),
      ...hLine(6, 1, 14),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 3, 12),
    ]},
    // Refracting core
    { name: 'core', role: 'belt', pixels: [
      [7,4], [8,4],
      [6,5], [7,5], [8,5], [9,5],
      [6,6], [7,6], [8,6], [9,6],
      [7,7], [8,7],
    ]},
    // Facet lines
    { name: 'facets', role: 'face', pixels: [
      [4,3], [11,3],
      [3,5], [12,5],
      [4,7], [11,7],
    ]},
    // Arms — crystal formations
    { name: 'arms', role: 'arm', pixels: [
      [0,5], [0,6], [0,7],
      [15,5], [15,6], [15,7],
    ]},
    // Fists
    { name: 'fists', role: 'hand', pixels: [
      [0,8], [1,8], [1,9],
      [15,8], [14,8], [14,9],
    ]},
    // Legs — thick crystal pillars
    { name: 'legs', role: 'leg', pixels: [
      ...rect(3, 10, 6, 13),
      ...rect(9, 10, 12, 13),
    ]},
    // Feet — wide crystal base
    { name: 'feet', role: 'boot', pixels: [
      ...hLine(14, 2, 7),
      ...hLine(14, 8, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 18. BLOOD_DRAGON — Crimson dragon with blood-red scales,
//     jagged wings, dripping fangs, glowing red core.
// ════════════════════════════════════════════════════════════
export const BLOOD_DRAGON_16: SpriteTemplate = {
  name: 'blood_dragon_16', width: 16, height: 16,
  description: 'Crimson dragon. Blood-red scales, jagged torn wings, dripping fangs, glowing crimson core.',
  regions: [
    // Horns — sharp curved
    { name: 'horns', role: 'accessory', pixels: [
      [2,0], [3,0],
      [2,1], [3,1],
    ]},
    // Head — dragon skull
    { name: 'head', role: 'head', pixels: [
      [4,0], [5,0], [6,0],
      [3,1], [4,1], [5,1], [6,1], [7,1],
      [3,2], [4,2], [5,2], [6,2], [7,2],
      [4,3], [5,3], [6,3],
    ]},
    // Glowing red eyes
    { name: 'eyes', role: 'eye', pixels: [
      [4,1], [5,1],
    ]},
    // Fangs / jaw
    { name: 'jaw', role: 'face', pixels: [
      [7,3], [8,3],
      [7,2], [8,2],
    ]},
    // Dripping blood from jaw
    { name: 'drips', role: 'belt', pixels: [
      [7,4], [8,4],
      [8,5],
    ]},
    // Body — massive serpentine
    { name: 'body', role: 'body', pixels: [
      ...hLine(4, 3, 7),
      ...hLine(5, 2, 8),
      ...hLine(6, 2, 9),
      ...hLine(7, 2, 10),
      ...hLine(8, 3, 10),
      ...hLine(9, 4, 10),
    ]},
    // Red core glow
    { name: 'core', role: 'hair', pixels: [
      [5,6], [6,6],
      [5,7], [6,7],
    ]},
    // Left wing — jagged
    { name: 'wing_left', role: 'arm', pixels: [
      [0,3], [1,3],
      [0,4], [1,4],
      [0,5], [1,5],
      [0,6], [1,6],
      [0,7],
    ]},
    // Right wing — jagged
    { name: 'wing_right', role: 'leg', pixels: [
      [11,5], [12,5], [13,5],
      [11,6], [12,6], [13,6], [14,6],
      [12,7], [13,7], [14,7], [15,7],
      [13,8], [14,8], [15,8],
      [14,9], [15,9],
    ]},
    // Tail — thick, curving
    { name: 'tail', role: 'hand', pixels: [
      ...hLine(10, 5, 11),
      ...hLine(11, 7, 12),
      ...hLine(12, 9, 13),
      [12,13], [13,13], [14,13],
      [14,14], [15,14],
    ]},
    // Legs — clawed
    { name: 'legs', role: 'boot', pixels: [
      [2,8], [3,8], [3,9],
      [2,9], [2,10], [3,10],
      [6,9], [7,9],
      [6,10], [7,10], [7,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 19. STORM_PHOENIX — Lightning fire bird with crackling
//     wings, thunder plumage, electric tail feathers.
// ════════════════════════════════════════════════════════════
export const STORM_PHOENIX_16: SpriteTemplate = {
  name: 'storm_phoenix_16', width: 16, height: 16,
  description: 'Lightning fire bird. Crackling electric wings, thunder plumage crest, blazing tail feathers.',
  regions: [
    // Crest plumage — electric
    { name: 'crest', role: 'accessory', pixels: [
      [6,0], [8,0], [10,0],
      [7,0], [9,0],
      [7,1], [8,1],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      [6,1], [7,1], [8,1], [9,1],
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Glowing yellow eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7,2], [8,2],
    ]},
    // Beak
    { name: 'beak', role: 'face', pixels: [
      [10,2], [11,2],
      [10,3],
    ]},
    // Body — avian core
    { name: 'body', role: 'body', pixels: [
      ...hLine(3, 5, 9),
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
      ...hLine(6, 6, 9),
    ]},
    // Left wing — spread crackling
    { name: 'wing_left', role: 'arm', pixels: [
      [4,2], [5,2],
      [3,3], [4,3], [5,3],
      [2,4], [3,4], [4,4],
      [1,5], [2,5], [3,5], [4,5],
      [0,6], [1,6], [2,6], [3,6],
      [0,7], [1,7], [2,7],
      [0,8], [1,8],
    ]},
    // Right wing — spread crackling
    { name: 'wing_right', role: 'hand', pixels: [
      [10,2], [11,3],
      [11,4], [12,4], [13,4],
      [11,5], [12,5], [13,5], [14,5],
      [12,6], [13,6], [14,6], [15,6],
      [13,7], [14,7], [15,7],
      [14,8], [15,8],
    ]},
    // Lightning sparks on wings
    { name: 'sparks', role: 'belt', pixels: [
      [1,4], [3,6],
      [14,4], [12,7],
      [0,5], [15,5],
    ]},
    // Tail feathers — blazing downward
    { name: 'tail', role: 'leg', pixels: [
      [5,7], [6,7], [7,7], [8,7], [9,7], [10,7],
      [4,8], [5,8], [7,8], [8,8], [10,8], [11,8],
      [3,9], [5,9], [7,9], [8,9], [10,9], [12,9],
      [4,10], [6,10], [9,10], [11,10],
    ]},
    // Tail tips — electric glow
    { name: 'tail_tips', role: 'boot', pixels: [
      [3,11], [5,11], [7,11], [8,11], [10,11], [12,11],
      [4,12], [6,12], [9,12], [11,12],
    ]},
    // Thunder aura
    { name: 'aura', role: 'hair', pixels: [
      [5,0], [11,0],
      [4,1], [11,1],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 20. ANCIENT_GOLEM — Primordial stone guardian with
//     rune-carved body, moss patches, crystal heart.
// ════════════════════════════════════════════════════════════
export const ANCIENT_GOLEM_16: SpriteTemplate = {
  name: 'ancient_golem_16', width: 16, height: 16,
  description: 'Primordial stone guardian. Rune-carved ancient body, moss patches, crystal heart, earthen limbs.',
  regions: [
    // Small weathered head
    { name: 'head', role: 'head', pixels: [
      [6,0], [7,0], [8,0], [9,0],
      [5,1], [6,1], [7,1], [8,1], [9,1], [10,1],
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Glowing red eyes — ancient power
    { name: 'eyes', role: 'eye', pixels: [
      [7,1], [8,1],
    ]},
    // Rune markings on head
    { name: 'head_runes', role: 'face', pixels: [
      [6,1], [9,1],
    ]},
    // Massive shoulders
    { name: 'shoulders', role: 'hair', pixels: [
      [2,2], [3,2], [4,2],
      [11,2], [12,2], [13,2],
    ]},
    // Body — enormous stone mass
    { name: 'body', role: 'body', pixels: [
      ...hLine(3, 3, 12),
      ...hLine(4, 2, 13),
      ...hLine(5, 2, 13),
      ...hLine(6, 2, 13),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
    ]},
    // Crystal heart — glowing center
    { name: 'heart', role: 'belt', pixels: [
      [7,4], [8,4],
      [6,5], [7,5], [8,5], [9,5],
      [7,6], [8,6],
    ]},
    // Rune carvings on body
    { name: 'runes', role: 'accessory', pixels: [
      [4,4], [11,4],
      [3,6], [12,6],
      [5,8], [10,8],
    ]},
    // Moss patches
    { name: 'moss', role: 'arm', pixels: [
      [4,3], [5,3],
      [10,3], [11,3],
      [3,5], [4,5],
      [11,5], [12,5],
    ]},
    // Arms — thick stone
    { name: 'arms', role: 'arm', pixels: [
      [1,4], [1,5], [1,6], [1,7],
      [0,5], [0,6],
      [14,4], [14,5], [14,6], [14,7],
      [15,5], [15,6],
    ]},
    // Fists — boulder
    { name: 'fists', role: 'hand', pixels: [
      [0,7], [0,8], [1,8],
      [15,7], [15,8], [14,8],
    ]},
    // Legs — pillars of stone
    { name: 'legs', role: 'leg', pixels: [
      ...rect(3, 9, 6, 12),
      ...rect(9, 9, 12, 12),
    ]},
    // Feet — wide earthen base
    { name: 'feet', role: 'boot', pixels: [
      ...hLine(13, 2, 7),
      ...hLine(13, 8, 13),
      ...hLine(14, 2, 7),
      ...hLine(14, 8, 13),
    ]},
  ],
};


// ════════════════════════════════════════════════════════════
// Color Schemes
// ════════════════════════════════════════════════════════════

const BONE_EMPEROR_COLORS = scheme('bone_emperor_default', {
  head:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },   // bone skull
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },   // bone jaw
  eye:       { shadow: '#d04648', base: '#dad45e',  highlight: '#deeed6' },   // red glow
  body:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // ribcage bone
  hair:      { shadow: '#442434', base: '#4e4a4e',  highlight: '#757161' },   // throne dark bone
  leg:       { shadow: '#442434', base: '#4e4a4e',  highlight: '#757161' },   // throne seat
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },   // throne base
  accessory: { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // golden crown
  belt:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // golden scepter
  arm:       { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },   // bony arms
  hand:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },   // skeletal hands
});

const LEVIATHAN_COLORS = scheme('leviathan_default', {
  head:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // deep blue scales
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },   // fangs
  eye:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // yellow glow
  body:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // dark sea body
  arm:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // mid coil
  leg:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // lower coil
  boot:      { shadow: '#30346d', base: '#6dc2ca',  highlight: '#deeed6' },   // tail fin
  hair:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // side fins
  belt:      { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },   // scale highlights
  accessory: { shadow: '#30346d', base: '#6dc2ca',  highlight: '#deeed6' },   // dorsal fin
  hand:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // unused
});

const MOTH_QUEEN_COLORS = scheme('moth_queen_default', {
  head:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },   // fuzzy head
  eye:       { shadow: '#442434', base: '#597dce',  highlight: '#6dc2ca' },   // purple glow
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // fuzzy thorax
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },   // left wing
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },   // right wing
  accessory: { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // wing eye spots
  belt:      { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // wing dust
  face:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },   // abdomen
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // antennae
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },   // lower wing tips
  hand:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },   // unused
});

const IRON_TITAN_COLORS = scheme('iron_titan_default', {
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // armored head
  eye:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // yellow visor
  body:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // iron plates
  belt:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // furnace glow
  arm:       { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // metal arms
  hand:      { shadow: '#757161', base: '#8595a1',  highlight: '#d2aa99' },   // iron fists
  face:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // rivets
  accessory: { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },   // steam vents
  leg:       { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // armored legs
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },   // heavy feet
  hair:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // unused
});

const MIND_FLAYER_COLORS = scheme('mind_flayer_default', {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },   // brain dome
  head:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },   // face
  eye:       { shadow: '#442434', base: '#597dce',  highlight: '#6dc2ca' },   // purple glow
  face:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // tentacles
  body:      { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },   // dark robes
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },   // robed arms
  hand:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },   // clawed hands
  accessory: { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // psionic aura
  leg:       { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },   // robe lower
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },   // hem
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },   // unused
});

const PLAGUE_DRAGON_COLORS = scheme('plague_dragon_default', {
  head:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // diseased scales
  eye:       { shadow: '#6daa2c', base: '#dad45e',  highlight: '#deeed6' },   // toxic green glow
  body:      { shadow: '#346524', base: '#6daa2c',  highlight: '#854c30' },   // decayed body
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },   // jaw
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // twisted horns
  belt:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // pustules
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#854c30' },   // torn left wing
  leg:       { shadow: '#346524', base: '#6daa2c',  highlight: '#854c30' },   // torn right wing
  accessory: { shadow: '#6daa2c', base: '#dad45e',  highlight: '#deeed6' },   // toxic breath
  boot:      { shadow: '#346524', base: '#854c30',  highlight: '#d27d2c' },   // tail
  hand:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // stubby legs
});

const STAR_DEVOURER_COLORS = scheme('star_devourer_default', {
  hair:      { shadow: '#30346d', base: '#442434',  highlight: '#597dce' },   // nebula shell
  body:      { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },   // inner body
  eye:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // star core eye
  belt:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // energy veins
  leg:       { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },   // lower tendrils
  boot:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // tendril tips
  arm:       { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // side wisps
  face:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // maw
  accessory: { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // tendrils top
  head:      { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },   // unused
  hand:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // unused
});

const FUNGUS_LORD_COLORS = scheme('fungus_lord_default', {
  hair:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // mushroom cap
  head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // face under cap
  eye:       { shadow: '#d04648', base: '#dad45e',  highlight: '#deeed6' },   // red glow
  face:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },   // mouth
  body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // trunk stalk
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // branch arms
  hand:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // fungal claws
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // root tendrils
  accessory: { shadow: '#d04648', base: '#deeed6',  highlight: '#deeed6' },   // cap spots
  belt:      { shadow: '#6daa2c', base: '#dad45e',  highlight: '#deeed6' },   // spore cloud
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },   // unused
});

const SAND_EMPRESS_COLORS = scheme('sand_empress_default', {
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // golden headdress
  head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // face
  eye:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // divine glow
  hair:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // headdress flaps
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },   // veil
  body:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // golden robes
  belt:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // scarab lapis
  arm:       { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // arms
  hand:      { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // sand magic
  leg:       { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // flowing robes
  boot:      { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // hem
});

const THUNDER_GOD_COLORS = scheme('thunder_god_default', {
  accessory: { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // lightning crown
  head:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },   // divine helm
  eye:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // yellow glow
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },   // beard
  body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // muscular torso
  belt:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // golden belt
  arm:       { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // muscular arms
  hair:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // hammer metal
  hand:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // right arm
  leg:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // divine legs
  boot:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },   // thundercloud
});

const ICE_QUEEN_BOSS_COLORS = scheme('ice_queen_boss_default', {
  accessory: { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // crystal crown
  head:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // icy face
  eye:       { shadow: '#442434', base: '#597dce',  highlight: '#6dc2ca' },   // purple-blue glow
  face:      { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },   // ice veil
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // ice armor
  belt:      { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },   // frost particles
  arm:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // armored arms
  hair:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // scepter
  hand:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // hands
  leg:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // icy gown
  boot:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // hem crystals
});

const LAVA_TITAN_COLORS = scheme('lava_titan_default', {
  head:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },   // rock head
  eye:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // red glow
  body:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },   // obsidian body
  belt:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // molten core
  face:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // magma cracks
  arm:       { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },   // rock arms
  hand:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // molten fists
  accessory: { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // vent shoulders
  leg:       { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },   // rock legs
  boot:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // lava drip feet
  hair:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },   // unused
});

const SHADOW_HYDRA_COLORS = scheme('shadow_hydra_default', {
  head:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },   // left head
  hair:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },   // center head
  face:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },   // right head
  eye:       { shadow: '#d04648', base: '#dad45e',  highlight: '#deeed6' },   // red glow x6
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },   // necks
  body:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // central mass
  belt:      { shadow: '#442434', base: '#597dce',  highlight: '#6dc2ca' },   // dark core
  accessory: { shadow: '#30346d', base: '#442434',  highlight: '#597dce' },   // shadow aura
  leg:       { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // lower tendrils
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },   // tendril tips
  hand:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },   // unused
});

const CLOCKWORK_KING_COLORS = scheme('clockwork_king_default', {
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // gear crown gold
  head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // bronze helm
  eye:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // yellow lens
  face:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // vent
  body:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // bronze plates
  belt:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },   // clock face
  hair:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },   // clock hands
  arm:       { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // cog arms
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // cog arms right
  leg:       { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // piston legs
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },   // flat feet
});

const SWAMP_LORD_COLORS = scheme('swamp_lord_default', {
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // lily pad crown
  head:      { shadow: '#346524', base: '#6daa2c',  highlight: '#854c30' },   // mossy head
  eye:       { shadow: '#6daa2c', base: '#dad45e',  highlight: '#deeed6' },   // yellow-green glow
  face:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },   // gaping mouth
  body:      { shadow: '#346524', base: '#854c30',  highlight: '#6daa2c' },   // mossy body
  belt:      { shadow: '#6daa2c', base: '#dad45e',  highlight: '#deeed6' },   // moss patches
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#854c30' },   // vine left
  hand:      { shadow: '#346524', base: '#6daa2c',  highlight: '#854c30' },   // vine right
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // mud body
  boot:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },   // mud drips
  hair:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // flora
});

const VOID_EMPRESS_COLORS = scheme('void_empress_default', {
  accessory: { shadow: '#442434', base: '#597dce',  highlight: '#6dc2ca' },   // void corona
  head:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },   // dark face
  eye:       { shadow: '#442434', base: '#597dce',  highlight: '#6dc2ca' },   // purple glow
  face:      { shadow: '#442434', base: '#4e4a4e',  highlight: '#8595a1' },   // ethereal jaw
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // left tear wing
  hand:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // right tear wing
  body:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // rift body
  belt:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // void rift core
  leg:       { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // dark gown
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#442434' },   // dissolving hem
  hair:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // crown hair
});

const CRYSTAL_TITAN_COLORS = scheme('crystal_titan_default', {
  accessory: { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // crystal spikes
  head:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // faceted head
  eye:       { shadow: '#442434', base: '#597dce',  highlight: '#6dc2ca' },   // purple glow
  hair:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // shoulder crystals
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // faceted torso
  belt:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // refracting core
  face:      { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },   // facet lines
  arm:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // crystal arms
  hand:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // fists
  leg:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // crystal legs
  boot:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // crystal base
});

const BLOOD_DRAGON_COLORS = scheme('blood_dragon_default', {
  head:      { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },   // crimson head
  eye:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // red glow
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },   // fangs
  body:      { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },   // crimson body
  hair:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // red core glow
  arm:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },   // left wing
  leg:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },   // right wing
  hand:      { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },   // tail
  belt:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#deeed6' },   // blood drips
  accessory: { shadow: '#140c1c', base: '#442434',  highlight: '#d04648' },   // dark horns
  boot:      { shadow: '#442434', base: '#854c30',  highlight: '#d04648' },   // clawed legs
});

const STORM_PHOENIX_COLORS = scheme('storm_phoenix_default', {
  accessory: { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // electric crest
  head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // feathered head
  eye:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // yellow glow
  face:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // beak
  body:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // avian core
  arm:       { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // left wing
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // right wing
  belt:      { shadow: '#d04648', base: '#dad45e',  highlight: '#deeed6' },   // lightning sparks
  leg:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // tail feathers
  boot:      { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },   // electric tail tips
  hair:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // thunder aura
});

const ANCIENT_GOLEM_COLORS = scheme('ancient_golem_default', {
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // weathered stone head
  eye:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // red ancient glow
  face:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // rune markings
  hair:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // massive shoulders
  body:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // stone body
  belt:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // crystal heart
  accessory: { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // rune carvings
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // moss patches + arms
  hand:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // boulder fists
  leg:       { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // stone legs
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },   // wide earthen base
});


// ════════════════════════════════════════════════════════════
// Exports
// ════════════════════════════════════════════════════════════

export const BOSS_BATCH3_TEMPLATES: Record<string, SpriteTemplate> = {
  bone_emperor_16:     BONE_EMPEROR_16,
  leviathan_16:        LEVIATHAN_16,
  moth_queen_16:       MOTH_QUEEN_16,
  iron_titan_16:       IRON_TITAN_16,
  mind_flayer_16:      MIND_FLAYER_16,
  plague_dragon_16:    PLAGUE_DRAGON_16,
  star_devourer_16:    STAR_DEVOURER_16,
  fungus_lord_16:      FUNGUS_LORD_16,
  sand_empress_16:     SAND_EMPRESS_16,
  thunder_god_16:      THUNDER_GOD_16,
  ice_queen_boss_16:   ICE_QUEEN_BOSS_16,
  lava_titan_16:       LAVA_TITAN_16,
  shadow_hydra_16:     SHADOW_HYDRA_16,
  clockwork_king_16:   CLOCKWORK_KING_16,
  swamp_lord_16:       SWAMP_LORD_16,
  void_empress_16:     VOID_EMPRESS_16,
  crystal_titan_16:    CRYSTAL_TITAN_16,
  blood_dragon_16:     BLOOD_DRAGON_16,
  storm_phoenix_16:    STORM_PHOENIX_16,
  ancient_golem_16:    ANCIENT_GOLEM_16,
};

export const BOSS_BATCH3_COLOR_SCHEMES: Record<string, ColorScheme> = {
  bone_emperor_default:     BONE_EMPEROR_COLORS,
  leviathan_default:        LEVIATHAN_COLORS,
  moth_queen_default:       MOTH_QUEEN_COLORS,
  iron_titan_default:       IRON_TITAN_COLORS,
  mind_flayer_default:      MIND_FLAYER_COLORS,
  plague_dragon_default:    PLAGUE_DRAGON_COLORS,
  star_devourer_default:    STAR_DEVOURER_COLORS,
  fungus_lord_default:      FUNGUS_LORD_COLORS,
  sand_empress_default:     SAND_EMPRESS_COLORS,
  thunder_god_default:      THUNDER_GOD_COLORS,
  ice_queen_boss_default:   ICE_QUEEN_BOSS_COLORS,
  lava_titan_default:       LAVA_TITAN_COLORS,
  shadow_hydra_default:     SHADOW_HYDRA_COLORS,
  clockwork_king_default:   CLOCKWORK_KING_COLORS,
  swamp_lord_default:       SWAMP_LORD_COLORS,
  void_empress_default:     VOID_EMPRESS_COLORS,
  crystal_titan_default:    CRYSTAL_TITAN_COLORS,
  blood_dragon_default:     BLOOD_DRAGON_COLORS,
  storm_phoenix_default:    STORM_PHOENIX_COLORS,
  ancient_golem_default:    ANCIENT_GOLEM_COLORS,
};
