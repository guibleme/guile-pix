/**
 * 16x16 building templates — batch 3.
 * 20 new structures: fantasy, sci-fi, modern, ancient, cozy genres.
 */

import { SpriteTemplate, ColorScheme } from './humanoid16.js';

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

const BUILDING3_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  head:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  arm:       { shadow: '#442434', base: '#4e4a4e',  highlight: '#757161' },
  hand:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  leg:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
  boot:      { shadow: '#442434', base: '#4e4a4e',  highlight: '#757161' },
  accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof BUILDING3_BASE>): ColorScheme {
  return { name, mapping: { ...BUILDING3_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. OBSERVATORY_16 — Domed building with telescope slit.
// ════════════════════════════════════════════════════════════
export const OBSERVATORY_16: SpriteTemplate = {
  name: 'observatory_16', width: 16, height: 16,
  description: 'Astronomical observatory with rotating dome, telescope slit, and stone base.',
  regions: [
    // Dome top — rounded cap
    { name: 'dome', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 11),
    ]},
    // Telescope slit opening in dome
    { name: 'telescope_slit', role: 'eye', pixels: [
      [7, 2], [8, 2],
      [7, 3], [8, 3],
      [7, 4],
    ]},
    // Telescope tube poking out
    { name: 'telescope', role: 'accessory', pixels: [
      [8, 0], [9, 0],
      [9, 1],
    ]},
    // Dome ring/base trim
    { name: 'dome_ring', role: 'arm', pixels: [
      ...hLine(6, 3, 12),
    ]},
    // Tower body — cylindrical stone walls
    { name: 'tower_body', role: 'body', pixels: [
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
      ...hLine(11, 4, 11),
      ...hLine(12, 4, 11),
    ]},
    // Small windows on tower
    { name: 'windows', role: 'eye', pixels: [
      [6, 8], [9, 8],
      [6, 10], [9, 10],
    ]},
    // Door
    { name: 'door', role: 'belt', pixels: [
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
    ]},
    // Foundation
    { name: 'foundation', role: 'boot', pixels: [
      ...hLine(13, 3, 12),
      ...hLine(14, 3, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 2. BANK_16 — Columned neoclassical bank building.
// ════════════════════════════════════════════════════════════
export const BANK_16: SpriteTemplate = {
  name: 'bank_16', width: 16, height: 16,
  description: 'Neoclassical bank with columned portico, triangular pediment, and vault door.',
  regions: [
    // Pediment — triangular roof
    { name: 'pediment', role: 'head', pixels: [
      [7, 1], [8, 1],
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 3, 12),
    ]},
    // Dollar sign / emblem on pediment
    { name: 'emblem', role: 'accessory', pixels: [
      [7, 2], [8, 2],
      [7, 3], [8, 3],
    ]},
    // Entablature — horizontal band
    { name: 'entablature', role: 'arm', pixels: [
      ...hLine(5, 2, 13),
    ]},
    // Columns — four pillars
    { name: 'columns', role: 'body', pixels: [
      ...vLine(3, 6, 12),
      ...vLine(6, 6, 12),
      ...vLine(9, 6, 12),
      ...vLine(12, 6, 12),
    ]},
    // Interior wall behind columns
    { name: 'walls', role: 'belt', pixels: [
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
      ...hLine(11, 4, 11),
      ...hLine(12, 4, 11),
    ]},
    // Vault door
    { name: 'vault_door', role: 'eye', pixels: [
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ]},
    // Steps
    { name: 'steps', role: 'boot', pixels: [
      ...hLine(13, 2, 13),
      ...hLine(14, 1, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 3. HOSPITAL_16 — White building with red cross marking.
// ════════════════════════════════════════════════════════════
export const HOSPITAL_16: SpriteTemplate = {
  name: 'hospital_16', width: 16, height: 16,
  description: 'Medical hospital with flat roof, red cross emblem, automatic doors, and ambulance bay.',
  regions: [
    // Flat roof with parapet
    { name: 'roof', role: 'head', pixels: [
      ...hLine(2, 2, 13),
      ...hLine(3, 2, 13),
    ]},
    // Red cross emblem on facade
    { name: 'cross_emblem', role: 'accessory', pixels: [
      [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6],
    ]},
    // Main facade walls
    { name: 'walls', role: 'body', pixels: [
      ...hLine(4, 2, 13),
      ...hLine(5, 2, 13),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
      ...hLine(12, 2, 13),
    ]},
    // Windows — row of four
    { name: 'windows', role: 'eye', pixels: [
      [3, 8], [4, 8], [6, 8], [7, 8], [9, 8], [10, 8], [12, 8], [13, 8],
      [3, 9], [4, 9], [6, 9], [7, 9], [9, 9], [10, 9], [12, 9], [13, 9],
    ]},
    // Entrance doors
    { name: 'doors', role: 'belt', pixels: [
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ]},
    // Entrance canopy
    { name: 'canopy', role: 'arm', pixels: [
      ...hLine(10, 5, 10),
    ]},
    // Foundation/ground
    { name: 'foundation', role: 'boot', pixels: [
      ...hLine(13, 1, 14),
      ...hLine(14, 1, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 4. SCHOOL_16 — Simple school building with bell tower.
// ════════════════════════════════════════════════════════════
export const SCHOOL_16: SpriteTemplate = {
  name: 'school_16', width: 16, height: 16,
  description: 'Small school building with bell tower, pitched roof, windows, and front entrance.',
  regions: [
    // Bell tower cap
    { name: 'bell_cap', role: 'accessory', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
    ]},
    // Bell
    { name: 'bell', role: 'eye', pixels: [
      [7, 2], [8, 2],
    ]},
    // Bell tower body
    { name: 'bell_tower', role: 'arm', pixels: [
      [6, 2], [9, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
    ]},
    // Main roof — pitched
    { name: 'roof', role: 'head', pixels: [
      ...hLine(4, 4, 11),
      ...hLine(5, 3, 12),
      ...hLine(6, 2, 13),
    ]},
    // Walls
    { name: 'walls', role: 'body', pixels: [
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
      ...hLine(12, 2, 13),
    ]},
    // Windows — three across
    { name: 'windows', role: 'eye', pixels: [
      [3, 8], [4, 8], [7, 8], [8, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [7, 9], [8, 9], [11, 9], [12, 9],
    ]},
    // Door
    { name: 'door', role: 'belt', pixels: [
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ]},
    // Foundation
    { name: 'foundation', role: 'boot', pixels: [
      ...hLine(13, 1, 14),
      ...hLine(14, 1, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 5. ARENA_16 — Circular colosseum/arena with tiers.
// ════════════════════════════════════════════════════════════
export const ARENA_16: SpriteTemplate = {
  name: 'arena_16', width: 16, height: 16,
  description: 'Stone colosseum arena with tiered seating, arched entrances, and sand floor.',
  regions: [
    // Upper tier/wall ring
    { name: 'upper_wall', role: 'head', pixels: [
      ...hLine(2, 4, 11),
      [3, 3], [12, 3],
      [2, 3], [13, 3],
      ...hLine(3, 4, 11),
    ]},
    // Arches along the wall
    { name: 'arches', role: 'arm', pixels: [
      [5, 4], [8, 4], [11, 4],
      [5, 5], [8, 5], [11, 5],
    ]},
    // Mid wall
    { name: 'mid_wall', role: 'body', pixels: [
      ...hLine(4, 3, 12),
      ...hLine(5, 3, 12),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
    ]},
    // Lower wall / seating tiers
    { name: 'seating', role: 'belt', pixels: [
      ...hLine(8, 2, 13),
      ...hLine(9, 3, 12),
    ]},
    // Sand arena floor
    { name: 'arena_floor', role: 'leg', pixels: [
      ...hLine(10, 3, 12),
      ...hLine(11, 4, 11),
      ...hLine(12, 4, 11),
    ]},
    // Gate entrance at bottom
    { name: 'gate', role: 'eye', pixels: [
      [7, 10], [8, 10],
      [7, 11], [8, 11],
    ]},
    // Foundation pillars
    { name: 'pillars', role: 'boot', pixels: [
      ...hLine(13, 2, 13),
      ...hLine(14, 2, 13),
    ]},
    // Flags on top
    { name: 'flags', role: 'accessory', pixels: [
      [4, 1], [5, 1],
      [10, 1], [11, 1],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 6. MINE_ENTRANCE_16 — Timber-framed mine shaft opening.
// ════════════════════════════════════════════════════════════
export const MINE_ENTRANCE_16: SpriteTemplate = {
  name: 'mine_entrance_16', width: 16, height: 16,
  description: 'Timber-framed mine shaft entrance with rail tracks, lantern, and rock walls.',
  regions: [
    // Rocky hillside
    { name: 'hillside', role: 'body', pixels: [
      ...hLine(2, 3, 12),
      ...hLine(3, 2, 13),
      ...hLine(4, 1, 14),
      ...hLine(5, 1, 14),
      ...hLine(6, 1, 14),
      ...hLine(7, 1, 14),
    ]},
    // Timber frame — posts and lintel
    { name: 'timber_frame', role: 'arm', pixels: [
      ...hLine(4, 5, 10),
      ...vLine(5, 5, 12),
      ...vLine(10, 5, 12),
    ]},
    // Dark mine opening
    { name: 'mine_opening', role: 'belt', pixels: [
      ...rect(6, 5, 9, 12),
    ]},
    // Lantern hanging from frame
    { name: 'lantern', role: 'accessory', pixels: [
      [4, 3], [4, 4],
      [4, 5],
    ]},
    // Lantern glow
    { name: 'glow', role: 'eye', pixels: [
      [3, 4], [5, 4],
      [3, 5],
    ]},
    // Rail tracks on ground
    { name: 'rails', role: 'head', pixels: [
      ...hLine(13, 4, 11),
      [5, 12], [7, 12], [9, 12], [11, 12],
    ]},
    // Ground / dirt
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 0, 15),
      [0, 13], [1, 13], [2, 13], [3, 13], [12, 13], [13, 13], [14, 13], [15, 13],
    ]},
    // Rock texture on hillside
    { name: 'rocks', role: 'leg', pixels: [
      [3, 3], [8, 3], [12, 3],
      [2, 5], [13, 5],
      [2, 7], [13, 7],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 7. CLOCK_TOWER_16 — Tall tower with clock face.
// ════════════════════════════════════════════════════════════
export const CLOCK_TOWER_16: SpriteTemplate = {
  name: 'clock_tower_16', width: 16, height: 16,
  description: 'Tall stone clock tower with clock face, spire, and arched base entrance.',
  regions: [
    // Spire point at top
    { name: 'spire', role: 'accessory', pixels: [
      [7, 0], [8, 0],
      [7, 1], [8, 1],
    ]},
    // Spire roof
    { name: 'spire_roof', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
    ]},
    // Clock face — circular area
    { name: 'clock_face', role: 'eye', pixels: [
      [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7],
    ]},
    // Clock hands
    { name: 'clock_hands', role: 'hair', pixels: [
      [7, 5], [8, 6],
    ]},
    // Tower body
    { name: 'tower_body', role: 'body', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
      ...hLine(9, 5, 10),
      ...hLine(10, 5, 10),
      ...hLine(11, 5, 10),
    ]},
    // Masonry detail
    { name: 'masonry', role: 'arm', pixels: [
      [6, 9], [8, 9], [10, 9],
      [5, 11], [7, 11], [9, 11],
    ]},
    // Arched entrance
    { name: 'entrance', role: 'belt', pixels: [
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [6, 12], [9, 12],
    ]},
    // Base foundation
    { name: 'foundation', role: 'boot', pixels: [
      ...hLine(13, 4, 11),
      ...hLine(14, 4, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 8. SUBMARINE_BASE_16 — Underwater docking base with dome.
// ════════════════════════════════════════════════════════════
export const SUBMARINE_BASE_16: SpriteTemplate = {
  name: 'submarine_base_16', width: 16, height: 16,
  description: 'Underwater submarine base with glass dome, docking clamps, and pressure hull.',
  regions: [
    // Water above (bubbles)
    { name: 'bubbles', role: 'eye', pixels: [
      [4, 0], [10, 1],
      [6, 1], [12, 0],
    ]},
    // Glass dome top
    { name: 'dome', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 3, 12),
    ]},
    // Interior glow through dome
    { name: 'interior', role: 'accessory', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
    ]},
    // Main hull body
    { name: 'hull', role: 'body', pixels: [
      ...hLine(5, 3, 12),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 3, 12),
    ]},
    // Docking clamps / arms on sides
    { name: 'clamps', role: 'arm', pixels: [
      [1, 6], [1, 7], [1, 8],
      [14, 6], [14, 7], [14, 8],
    ]},
    // Portholes on hull
    { name: 'portholes', role: 'eye', pixels: [
      [4, 7], [7, 7], [10, 7],
    ]},
    // Support struts under hull
    { name: 'struts', role: 'belt', pixels: [
      ...vLine(5, 10, 12),
      ...vLine(10, 10, 12),
    ]},
    // Seafloor base
    { name: 'seafloor', role: 'boot', pixels: [
      ...hLine(13, 1, 14),
      ...hLine(14, 0, 15),
    ]},
    // Seaweed on floor
    { name: 'seaweed', role: 'leg', pixels: [
      [2, 12], [3, 11], [3, 12],
      [12, 12], [13, 11], [13, 12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 9. TREE_FORT_16 — Treehouse military fort in branches.
// ════════════════════════════════════════════════════════════
export const TREE_FORT_16: SpriteTemplate = {
  name: 'tree_fort_16', width: 16, height: 16,
  description: 'Wooden tree fort built into branches with rope ladder, lookout platform, and flag.',
  regions: [
    // Flag on top
    { name: 'flag', role: 'accessory', pixels: [
      [9, 0], [10, 0], [11, 0],
      [9, 1], [10, 1],
    ]},
    // Flagpole
    { name: 'flagpole', role: 'arm', pixels: [
      [8, 0], [8, 1], [8, 2],
    ]},
    // Fort roof / lookout platform
    { name: 'roof', role: 'head', pixels: [
      ...hLine(2, 3, 12),
      ...hLine(3, 3, 12),
    ]},
    // Fort cabin walls
    { name: 'cabin', role: 'body', pixels: [
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
    ]},
    // Window in cabin
    { name: 'window', role: 'eye', pixels: [
      [6, 5], [7, 5],
      [6, 6], [7, 6],
    ]},
    // Door in cabin
    { name: 'door', role: 'belt', pixels: [
      [9, 5], [10, 5],
      [9, 6], [10, 6],
      [9, 7], [10, 7],
    ]},
    // Platform floor / branch supports
    { name: 'platform', role: 'arm', pixels: [
      ...hLine(8, 3, 12),
    ]},
    // Tree trunk
    { name: 'trunk', role: 'hair', pixels: [
      ...vLine(7, 8, 14),
      ...vLine(8, 8, 14),
      [6, 9], [9, 9],
      [6, 13], [9, 13],
    ]},
    // Rope ladder
    { name: 'ladder', role: 'belt', pixels: [
      [11, 8], [12, 8],
      [11, 10], [12, 10],
      [11, 12], [12, 12],
      ...vLine(11, 8, 13),
      ...vLine(12, 8, 13),
    ]},
    // Foliage around branches
    { name: 'foliage', role: 'leg', pixels: [
      [2, 4], [3, 3], [12, 4], [13, 3],
      [1, 5], [14, 5],
      [2, 7], [13, 7],
    ]},
    // Ground
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 4, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 10. ICE_PALACE_16 — Frozen ice castle with crystalline towers.
// ════════════════════════════════════════════════════════════
export const ICE_PALACE_16: SpriteTemplate = {
  name: 'ice_palace_16', width: 16, height: 16,
  description: 'Frozen ice palace with crystalline spires, frost walls, and glowing windows.',
  regions: [
    // Left spire
    { name: 'left_spire', role: 'accessory', pixels: [
      [3, 0], [4, 0],
      [3, 1], [4, 1],
      [2, 2], [3, 2], [4, 2], [5, 2],
    ]},
    // Right spire
    { name: 'right_spire', role: 'accessory', pixels: [
      [11, 0], [12, 0],
      [11, 1], [12, 1],
      [10, 2], [11, 2], [12, 2], [13, 2],
    ]},
    // Central tower roof
    { name: 'central_roof', role: 'head', pixels: [
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      ...hLine(3, 5, 10),
    ]},
    // Upper walls
    { name: 'upper_walls', role: 'body', pixels: [
      ...hLine(4, 3, 12),
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 12),
    ]},
    // Lower walls / main facade
    { name: 'lower_walls', role: 'body', pixels: [
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
    ]},
    // Glowing windows
    { name: 'windows', role: 'eye', pixels: [
      [4, 5], [5, 5], [10, 5], [11, 5],
      [4, 6], [5, 6], [10, 6], [11, 6],
      [7, 8], [8, 8],
    ]},
    // Grand entrance arch
    { name: 'entrance', role: 'belt', pixels: [
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [7, 11], [8, 11],
    ]},
    // Ice crystal details
    { name: 'crystals', role: 'arm', pixels: [
      [3, 8], [12, 8],
      [2, 10], [13, 10],
    ]},
    // Snow base / foundation
    { name: 'foundation', role: 'boot', pixels: [
      ...hLine(12, 1, 14),
      ...hLine(13, 1, 14),
      ...hLine(14, 0, 15),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 11. TRAIN_STATION_16 — Platform with shelter and tracks.
// ════════════════════════════════════════════════════════════
export const TRAIN_STATION_16: SpriteTemplate = {
  name: 'train_station_16', width: 16, height: 16,
  description: 'Small train station with platform shelter, bench, clock, and rail tracks.',
  regions: [
    // Shelter roof — slanted cover
    { name: 'shelter_roof', role: 'head', pixels: [
      ...hLine(2, 1, 10),
      ...hLine(3, 1, 10),
      ...hLine(4, 2, 9),
    ]},
    // Support posts
    { name: 'posts', role: 'arm', pixels: [
      ...vLine(2, 5, 9),
      ...vLine(9, 5, 9),
    ]},
    // Back wall of shelter
    { name: 'back_wall', role: 'body', pixels: [
      ...hLine(5, 3, 8),
      ...hLine(6, 3, 8),
      ...hLine(7, 3, 8),
      ...hLine(8, 3, 8),
    ]},
    // Clock on wall
    { name: 'clock', role: 'accessory', pixels: [
      [5, 5], [6, 5],
      [5, 6], [6, 6],
    ]},
    // Bench
    { name: 'bench', role: 'belt', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8],
    ]},
    // Platform surface
    { name: 'platform', role: 'body', pixels: [
      ...hLine(9, 1, 14),
      ...hLine(10, 1, 14),
    ]},
    // Platform edge stripe
    { name: 'edge_stripe', role: 'accessory', pixels: [
      ...hLine(11, 1, 14),
    ]},
    // Rail tracks
    { name: 'tracks', role: 'boot', pixels: [
      ...hLine(13, 0, 15),
      ...hLine(14, 0, 15),
    ]},
    // Rail ties
    { name: 'ties', role: 'arm', pixels: [
      [1, 12], [4, 12], [7, 12], [10, 12], [13, 12],
    ]},
    // Signal light
    { name: 'signal', role: 'eye', pixels: [
      [12, 3], [13, 3],
      [12, 4], [13, 4],
    ]},
    // Signal pole
    { name: 'signal_pole', role: 'arm', pixels: [
      ...vLine(12, 5, 9),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 12. AIRPORT_TOWER_16 — Air traffic control tower.
// ════════════════════════════════════════════════════════════
export const AIRPORT_TOWER_16: SpriteTemplate = {
  name: 'airport_tower_16', width: 16, height: 16,
  description: 'Air traffic control tower with wraparound glass cab, antenna, and tapered shaft.',
  regions: [
    // Antenna on top
    { name: 'antenna', role: 'accessory', pixels: [
      [7, 0], [8, 0],
      [7, 1],
    ]},
    // Control cab roof
    { name: 'cab_roof', role: 'head', pixels: [
      ...hLine(2, 4, 11),
    ]},
    // Glass control cab — wraparound windows
    { name: 'cab_glass', role: 'eye', pixels: [
      ...hLine(3, 3, 12),
      ...hLine(4, 3, 12),
      ...hLine(5, 3, 12),
    ]},
    // Cab floor / walkway ring
    { name: 'walkway', role: 'arm', pixels: [
      ...hLine(6, 2, 13),
    ]},
    // Tower shaft — tapered
    { name: 'shaft', role: 'body', pixels: [
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
      ...hLine(9, 6, 9),
      ...hLine(10, 6, 9),
      ...hLine(11, 6, 9),
      ...hLine(12, 6, 9),
    ]},
    // Shaft windows
    { name: 'shaft_windows', role: 'eye', pixels: [
      [7, 8], [8, 8],
      [7, 10], [8, 10],
    ]},
    // Radar dish on side
    { name: 'radar', role: 'hair', pixels: [
      [12, 7], [13, 7],
      [13, 8],
    ]},
    // Wide base
    { name: 'base', role: 'boot', pixels: [
      ...hLine(13, 4, 11),
      ...hLine(14, 3, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 13. BREWERY_16 — Brewing house with barrel and chimney.
// ════════════════════════════════════════════════════════════
export const BREWERY_16: SpriteTemplate = {
  name: 'brewery_16', width: 16, height: 16,
  description: 'Rustic brewery with pitched roof, smoking chimney, barrel storage, and wooden door.',
  regions: [
    // Chimney with smoke
    { name: 'chimney', role: 'arm', pixels: [
      [12, 0], [13, 0],
      [12, 1], [13, 1],
      [12, 2], [13, 2],
    ]},
    // Smoke puffs
    { name: 'smoke', role: 'eye', pixels: [
      [11, 0], [14, 0],
      [13, 1],
    ]},
    // Pitched roof
    { name: 'roof', role: 'head', pixels: [
      [7, 2], [8, 2],
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(5, 3, 12),
    ]},
    // Walls
    { name: 'walls', role: 'body', pixels: [
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
    ]},
    // Windows
    { name: 'windows', role: 'eye', pixels: [
      [3, 7], [4, 7], [10, 7], [11, 7],
      [3, 8], [4, 8], [10, 8], [11, 8],
    ]},
    // Door
    { name: 'door', role: 'belt', pixels: [
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
    ]},
    // Barrel beside door
    { name: 'barrel', role: 'hair', pixels: [
      [12, 9], [13, 9],
      [12, 10], [13, 10],
      [12, 11], [13, 11],
    ]},
    // Hanging sign
    { name: 'sign', role: 'accessory', pixels: [
      [5, 9], [6, 9],
      [5, 10],
    ]},
    // Foundation
    { name: 'foundation', role: 'boot', pixels: [
      ...hLine(12, 1, 14),
      ...hLine(13, 1, 14),
      ...hLine(14, 1, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 14. PET_SHOP_16 — Animal store with paw print sign.
// ════════════════════════════════════════════════════════════
export const PET_SHOP_16: SpriteTemplate = {
  name: 'pet_shop_16', width: 16, height: 16,
  description: 'Cozy pet shop with paw-print sign, display window with animals, and bright awning.',
  regions: [
    // Paw sign above
    { name: 'paw_sign', role: 'accessory', pixels: [
      [6, 0], [7, 0], [8, 0], [9, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
    ]},
    // Paw detail on sign
    { name: 'paw_detail', role: 'eye', pixels: [
      [7, 0], [8, 0],
      [7, 1],
    ]},
    // Awning
    { name: 'awning', role: 'head', pixels: [
      ...hLine(2, 2, 13),
      ...hLine(3, 2, 13),
      ...hLine(4, 3, 12),
    ]},
    // Awning stripes
    { name: 'awning_stripes', role: 'hair', pixels: [
      [3, 3], [5, 3], [7, 3], [9, 3], [11, 3], [13, 3],
    ]},
    // Walls
    { name: 'walls', role: 'body', pixels: [
      ...hLine(5, 2, 13),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
      ...hLine(12, 2, 13),
    ]},
    // Display window with animals
    { name: 'display_window', role: 'eye', pixels: [
      ...rect(3, 6, 6, 9),
    ]},
    // Side window
    { name: 'side_window', role: 'eye', pixels: [
      [10, 6], [11, 6],
      [10, 7], [11, 7],
    ]},
    // Door
    { name: 'door', role: 'belt', pixels: [
      [8, 8], [9, 8],
      [8, 9], [9, 9],
      [8, 10], [9, 10],
      [8, 11], [9, 11],
      [8, 12], [9, 12],
    ]},
    // Foundation
    { name: 'foundation', role: 'boot', pixels: [
      ...hLine(13, 1, 14),
      ...hLine(14, 1, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 15. FORGE_16 — Metal forge with anvil and bellows.
// ════════════════════════════════════════════════════════════
export const FORGE_16: SpriteTemplate = {
  name: 'forge_16', width: 16, height: 16,
  description: 'Open-air metal forge with anvil, bellows, glowing furnace, and tool rack.',
  regions: [
    // Furnace chimney / hood
    { name: 'chimney', role: 'head', pixels: [
      [2, 0], [3, 0], [4, 0],
      [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
      [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
      [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
    ]},
    // Furnace fire glow
    { name: 'furnace_fire', role: 'accessory', pixels: [
      [2, 4], [3, 4], [4, 4],
      [2, 5], [3, 5], [4, 5],
      [2, 6], [3, 6], [4, 6],
    ]},
    // Furnace body
    { name: 'furnace_body', role: 'body', pixels: [
      [1, 4], [5, 4],
      [1, 5], [5, 5],
      [1, 6], [5, 6],
      ...hLine(7, 1, 5),
    ]},
    // Anvil
    { name: 'anvil', role: 'arm', pixels: [
      [7, 8], [8, 8], [9, 8],
      [8, 9], [8, 10],
      [7, 11], [8, 11], [9, 11],
    ]},
    // Bellows on right
    { name: 'bellows', role: 'belt', pixels: [
      [11, 5], [12, 5], [13, 5],
      [11, 6], [12, 6], [13, 6],
      [11, 7], [12, 7], [13, 7],
      [12, 4], [12, 8],
    ]},
    // Tool rack on right wall
    { name: 'tool_rack', role: 'hair', pixels: [
      ...hLine(2, 11, 14),
      [11, 3], [13, 3],
      [11, 4], [13, 4],
      [14, 3], [14, 4],
    ]},
    // Sparks from anvil work
    { name: 'sparks', role: 'eye', pixels: [
      [6, 7], [10, 7],
      [7, 6], [9, 6],
    ]},
    // Open shelter roof beams
    { name: 'roof_beams', role: 'arm', pixels: [
      ...hLine(1, 6, 14),
    ]},
    // Ground / cobblestone
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(12, 0, 15),
      ...hLine(13, 0, 15),
      ...hLine(14, 0, 15),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 16. UNDERWATER_TEMPLE_16 — Sunken ruins with coral growth.
// ════════════════════════════════════════════════════════════
export const UNDERWATER_TEMPLE_16: SpriteTemplate = {
  name: 'underwater_temple_16', width: 16, height: 16,
  description: 'Sunken ancient temple with crumbling pillars, coral growth, and glowing altar.',
  regions: [
    // Water/bubble particles at top
    { name: 'bubbles', role: 'eye', pixels: [
      [3, 0], [8, 0], [13, 1],
      [5, 1], [11, 0],
    ]},
    // Broken pediment / lintel fragment
    { name: 'pediment', role: 'head', pixels: [
      ...hLine(3, 3, 12),
      ...hLine(4, 4, 11),
      [5, 3], [6, 3],
    ]},
    // Left crumbling pillar
    { name: 'left_pillar', role: 'body', pixels: [
      ...vLine(4, 5, 12),
      ...vLine(5, 5, 11),
    ]},
    // Right crumbling pillar
    { name: 'right_pillar', role: 'body', pixels: [
      ...vLine(10, 5, 12),
      ...vLine(11, 5, 10),
    ]},
    // Central altar — glowing
    { name: 'altar', role: 'accessory', pixels: [
      [7, 8], [8, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Altar glow
    { name: 'glow', role: 'eye', pixels: [
      [7, 7], [8, 7],
      [6, 8], [9, 8],
    ]},
    // Coral growth on left
    { name: 'coral_left', role: 'leg', pixels: [
      [1, 10], [2, 10], [2, 9],
      [1, 11], [2, 11], [3, 11],
      [1, 12], [2, 12],
    ]},
    // Coral growth on right
    { name: 'coral_right', role: 'leg', pixels: [
      [12, 9], [13, 10], [14, 10],
      [12, 11], [13, 11], [14, 11],
      [13, 12], [14, 12],
    ]},
    // Seaweed strands
    { name: 'seaweed', role: 'hair', pixels: [
      [0, 12], [0, 13],
      [15, 11], [15, 12],
    ]},
    // Seafloor rubble
    { name: 'seafloor', role: 'boot', pixels: [
      ...hLine(13, 0, 15),
      ...hLine(14, 0, 15),
    ]},
    // Fallen stone blocks
    { name: 'rubble', role: 'arm', pixels: [
      [6, 12], [7, 12], [8, 12], [9, 12],
      [7, 11], [8, 11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 17. SKY_TOWER_16 — Floating tower on clouds.
// ════════════════════════════════════════════════════════════
export const SKY_TOWER_16: SpriteTemplate = {
  name: 'sky_tower_16', width: 16, height: 16,
  description: 'Magical floating sky tower resting on clouds with glowing beacon and bridges.',
  regions: [
    // Beacon light at top
    { name: 'beacon', role: 'eye', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
    ]},
    // Tower spire
    { name: 'spire', role: 'head', pixels: [
      [7, 2], [8, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
    ]},
    // Tower body
    { name: 'tower_body', role: 'body', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
    ]},
    // Tower windows
    { name: 'windows', role: 'eye', pixels: [
      [6, 5], [9, 5],
      [7, 7], [8, 7],
    ]},
    // Balcony ring
    { name: 'balcony', role: 'arm', pixels: [
      ...hLine(9, 4, 11),
    ]},
    // Floating bridge left
    { name: 'bridge_left', role: 'accessory', pixels: [
      [1, 6], [2, 6], [3, 6], [4, 6],
      [1, 7], [2, 7],
    ]},
    // Floating bridge right
    { name: 'bridge_right', role: 'accessory', pixels: [
      [11, 6], [12, 6], [13, 6], [14, 6],
      [13, 7], [14, 7],
    ]},
    // Lower tower base
    { name: 'base_tower', role: 'body', pixels: [
      ...hLine(10, 6, 9),
      ...hLine(11, 6, 9),
    ]},
    // Cloud mass underneath
    { name: 'clouds', role: 'hair', pixels: [
      ...hLine(12, 3, 12),
      ...hLine(13, 2, 13),
      ...hLine(14, 4, 11),
    ]},
    // Cloud highlight
    { name: 'cloud_highlight', role: 'face', pixels: [
      [5, 12], [6, 12], [9, 12], [10, 12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 18. HAUNTED_HOUSE_16 — Spooky tilted house with ghost.
// ════════════════════════════════════════════════════════════
export const HAUNTED_HOUSE_16: SpriteTemplate = {
  name: 'haunted_house_16', width: 16, height: 16,
  description: 'Crooked haunted house with broken shutters, ghost in window, bats, and dead tree.',
  regions: [
    // Bats flying above
    { name: 'bats', role: 'accessory', pixels: [
      [2, 0], [4, 0],
      [3, 1],
      [11, 1], [13, 1],
      [12, 2],
    ]},
    // Crooked roof
    { name: 'roof', role: 'head', pixels: [
      [8, 1], [9, 1],
      ...hLine(2, 6, 11),
      ...hLine(3, 5, 12),
      ...hLine(4, 4, 13),
    ]},
    // Chimney — crooked
    { name: 'chimney', role: 'arm', pixels: [
      [5, 0], [6, 0],
      [5, 1], [6, 1],
    ]},
    // Walls — slightly uneven
    { name: 'walls', role: 'body', pixels: [
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
      ...hLine(10, 3, 12),
      ...hLine(11, 3, 12),
    ]},
    // Ghost in window — glowing eyes
    { name: 'ghost_window', role: 'eye', pixels: [
      [4, 6], [5, 6], [6, 6],
      [4, 7], [5, 7], [6, 7],
      [4, 8], [5, 8], [6, 8],
    ]},
    // Boarded window right
    { name: 'boarded_window', role: 'belt', pixels: [
      [9, 6], [10, 6], [11, 6],
      [9, 7], [10, 7], [11, 7],
    ]},
    // Broken door
    { name: 'door', role: 'belt', pixels: [
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
    ]},
    // Dead tree beside house
    { name: 'dead_tree', role: 'hair', pixels: [
      [14, 5], [14, 6],
      [13, 7], [14, 7], [15, 7],
      [14, 8], [14, 9], [14, 10], [14, 11],
    ]},
    // Fence/ground
    { name: 'fence', role: 'leg', pixels: [
      [1, 12], [3, 12], [5, 12],
      ...hLine(13, 0, 15),
    ]},
    // Foundation
    { name: 'foundation', role: 'boot', pixels: [
      ...hLine(12, 2, 13),
      ...hLine(14, 0, 15),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 19. DOJO_16 — Japanese martial arts training hall.
// ════════════════════════════════════════════════════════════
export const DOJO_16: SpriteTemplate = {
  name: 'dojo_16', width: 16, height: 16,
  description: 'Traditional Japanese dojo with curved roof, sliding doors, training banner, and stone path.',
  regions: [
    // Curved roof top ornament
    { name: 'ornament', role: 'accessory', pixels: [
      [7, 0], [8, 0],
    ]},
    // Curved roof
    { name: 'roof', role: 'head', pixels: [
      [7, 1], [8, 1],
      ...hLine(2, 5, 10),
      ...hLine(3, 3, 12),
      [2, 3], [13, 3],
      ...hLine(4, 2, 13),
      [1, 4], [14, 4],
    ]},
    // Roof trim/edge
    { name: 'roof_trim', role: 'arm', pixels: [
      ...hLine(5, 1, 14),
    ]},
    // Walls — white/cream plaster
    { name: 'walls', role: 'body', pixels: [
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
    ]},
    // Sliding doors (shoji) — center
    { name: 'shoji_doors', role: 'eye', pixels: [
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
    // Training banner (noren) hanging left
    { name: 'banner', role: 'belt', pixels: [
      [3, 6], [4, 6],
      [3, 7], [4, 7],
      [3, 8], [4, 8],
    ]},
    // Side window right
    { name: 'side_window', role: 'eye', pixels: [
      [11, 7], [12, 7],
      [11, 8], [12, 8],
    ]},
    // Wooden frame detail
    { name: 'frame', role: 'hair', pixels: [
      ...vLine(2, 6, 11),
      ...vLine(13, 6, 11),
      [5, 8], [10, 8],
    ]},
    // Stone path to entrance
    { name: 'stone_path', role: 'arm', pixels: [
      [7, 12], [8, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Foundation / raised platform
    { name: 'foundation', role: 'boot', pixels: [
      ...hLine(12, 1, 14),
      ...hLine(14, 4, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 20. CRYSTAL_CAVE_16 — Gem-filled cavern with glowing crystals.
// ════════════════════════════════════════════════════════════
export const CRYSTAL_CAVE_16: SpriteTemplate = {
  name: 'crystal_cave_16', width: 16, height: 16,
  description: 'Natural crystal cave with glowing gem formations, stalactites, and a treasure glow.',
  regions: [
    // Cave ceiling / stalactites
    { name: 'ceiling', role: 'head', pixels: [
      ...hLine(0, 0, 15),
      ...hLine(1, 0, 15),
      ...hLine(2, 0, 4),
      ...hLine(2, 11, 15),
      [0, 3], [1, 3], [14, 3], [15, 3],
      [0, 4], [15, 4],
    ]},
    // Stalactite points hanging down
    { name: 'stalactites', role: 'arm', pixels: [
      [3, 3], [3, 4],
      [7, 2], [7, 3],
      [12, 3], [12, 4], [12, 5],
    ]},
    // Large crystal cluster left — glowing
    { name: 'crystal_left', role: 'accessory', pixels: [
      [2, 8], [3, 7], [3, 8], [4, 6], [4, 7], [4, 8],
      [5, 7], [5, 8],
      [2, 9], [3, 9],
    ]},
    // Large crystal cluster right — glowing
    { name: 'crystal_right', role: 'accessory', pixels: [
      [10, 7], [10, 8], [11, 6], [11, 7], [11, 8],
      [12, 7], [12, 8], [13, 8],
      [12, 9], [13, 9],
    ]},
    // Crystal glow aura
    { name: 'glow', role: 'eye', pixels: [
      [1, 7], [1, 8],
      [6, 7], [6, 8],
      [9, 7], [9, 8],
      [14, 7], [14, 8],
    ]},
    // Cave interior / dark space
    { name: 'cave_interior', role: 'belt', pixels: [
      ...hLine(5, 1, 14),
      ...hLine(6, 1, 14),
      ...hLine(7, 6, 9),
      ...hLine(8, 6, 9),
      ...hLine(9, 4, 11),
    ]},
    // Treasure glow at center bottom
    { name: 'treasure', role: 'eye', pixels: [
      [7, 10], [8, 10],
      [7, 11], [8, 11],
    ]},
    // Cave floor
    { name: 'floor', role: 'boot', pixels: [
      ...hLine(12, 0, 15),
      ...hLine(13, 0, 15),
      ...hLine(14, 0, 15),
    ]},
    // Floor crystals / small gems
    { name: 'floor_gems', role: 'leg', pixels: [
      [2, 11], [5, 11], [10, 11], [13, 11],
      [3, 12], [7, 12], [8, 12], [12, 12],
    ]},
    // Cave walls left and right
    { name: 'cave_walls', role: 'body', pixels: [
      ...vLine(0, 5, 11),
      ...vLine(15, 5, 11),
      [1, 9], [1, 10], [1, 11],
      [14, 9], [14, 10], [14, 11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// COLOR SCHEMES
// ════════════════════════════════════════════════════════════

export const OBSERVATORY_COLORS = scheme('observatory_default', {
  head:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const BANK_COLORS = scheme('bank_default', {
  head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  belt:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  boot:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
});

export const HOSPITAL_COLORS = scheme('hospital_default', {
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  body:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
  belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const SCHOOL_COLORS = scheme('school_default', {
  head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const ARENA_COLORS = scheme('arena_default', {
  head:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  belt:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const MINE_ENTRANCE_COLORS = scheme('mine_entrance_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  belt:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  head:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
});

export const CLOCK_TOWER_COLORS = scheme('clock_tower_default', {
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const SUBMARINE_BASE_COLORS = scheme('submarine_base_default', {
  head:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  body:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
});

export const TREE_FORT_COLORS = scheme('tree_fort_default', {
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
});

export const ICE_PALACE_COLORS = scheme('ice_palace_default', {
  head:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  boot:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
});

export const TRAIN_STATION_COLORS = scheme('train_station_default', {
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
});

export const AIRPORT_TOWER_COLORS = scheme('airport_tower_default', {
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const BREWERY_COLORS = scheme('brewery_default', {
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const PET_SHOP_COLORS = scheme('pet_shop_default', {
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  hair:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const FORGE_COLORS = scheme('forge_default', {
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  body:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
});

export const UNDERWATER_TEMPLE_COLORS = scheme('underwater_temple_default', {
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  body:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  leg:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  hair:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
});

export const SKY_TOWER_COLORS = scheme('sky_tower_default', {
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  hair:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  face:      { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const HAUNTED_HOUSE_COLORS = scheme('haunted_house_default', {
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  body:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
  leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
});

export const DOJO_COLORS = scheme('dojo_default', {
  head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  body:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const CRYSTAL_CAVE_COLORS = scheme('crystal_cave_default', {
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
  leg:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
});

// ════════════════════════════════════════════════════════════
// EXPORTS
// ════════════════════════════════════════════════════════════

export const BUILDING_BATCH3_TEMPLATES: Record<string, SpriteTemplate> = {
  observatory_16:        OBSERVATORY_16,
  bank_16:               BANK_16,
  hospital_16:           HOSPITAL_16,
  school_16:             SCHOOL_16,
  arena_16:              ARENA_16,
  mine_entrance_16:      MINE_ENTRANCE_16,
  clock_tower_16:        CLOCK_TOWER_16,
  submarine_base_16:     SUBMARINE_BASE_16,
  tree_fort_16:          TREE_FORT_16,
  ice_palace_16:         ICE_PALACE_16,
  train_station_16:      TRAIN_STATION_16,
  airport_tower_16:      AIRPORT_TOWER_16,
  brewery_16:            BREWERY_16,
  pet_shop_16:           PET_SHOP_16,
  forge_16:              FORGE_16,
  underwater_temple_16:  UNDERWATER_TEMPLE_16,
  sky_tower_16:          SKY_TOWER_16,
  haunted_house_16:      HAUNTED_HOUSE_16,
  dojo_16:               DOJO_16,
  crystal_cave_16:       CRYSTAL_CAVE_16,
};

export const BUILDING_BATCH3_COLOR_SCHEMES: Record<string, ColorScheme> = {
  observatory_default:        OBSERVATORY_COLORS,
  bank_default:               BANK_COLORS,
  hospital_default:           HOSPITAL_COLORS,
  school_default:             SCHOOL_COLORS,
  arena_default:              ARENA_COLORS,
  mine_entrance_default:      MINE_ENTRANCE_COLORS,
  clock_tower_default:        CLOCK_TOWER_COLORS,
  submarine_base_default:     SUBMARINE_BASE_COLORS,
  tree_fort_default:          TREE_FORT_COLORS,
  ice_palace_default:         ICE_PALACE_COLORS,
  train_station_default:      TRAIN_STATION_COLORS,
  airport_tower_default:      AIRPORT_TOWER_COLORS,
  brewery_default:            BREWERY_COLORS,
  pet_shop_default:           PET_SHOP_COLORS,
  forge_default:              FORGE_COLORS,
  underwater_temple_default:  UNDERWATER_TEMPLE_COLORS,
  sky_tower_default:          SKY_TOWER_COLORS,
  haunted_house_default:      HAUNTED_HOUSE_COLORS,
  dojo_default:               DOJO_COLORS,
  crystal_cave_default:       CRYSTAL_CAVE_COLORS,
};
