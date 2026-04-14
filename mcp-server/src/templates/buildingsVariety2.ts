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

const BUILDING_BASE = {
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  face:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  hand:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof BUILDING_BASE>): ColorScheme {
  return { name, mapping: { ...BUILDING_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. SPACE_STATION_16 — Sci-fi orbital station with solar panels and central hub.
// ════════════════════════════════════════════════════════════
export const SPACE_STATION_16: SpriteTemplate = {
  name: 'space_station_16', width: 16, height: 16,
  description: 'Sci-fi orbital station with central hub, solar panels, and docking ring.',
  regions: [
    // Central hub — round body in the middle
    { name: 'hub', role: 'body', pixels: [
      ...hLine(5, 6, 9),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
      ...hLine(9, 6, 9),
    ]},
    // Docking ring around hub
    { name: 'ring', role: 'head', pixels: [
      ...hLine(4, 6, 9),
      [5, 5], [10, 5],
      [5, 9], [10, 9],
      ...hLine(10, 6, 9),
    ]},
    // Left solar panel arm
    { name: 'left_panel', role: 'arm', pixels: [
      ...hLine(7, 0, 4),
      ...hLine(8, 0, 4),
    ]},
    // Right solar panel arm
    { name: 'right_panel', role: 'accessory', pixels: [
      ...hLine(7, 11, 15),
      ...hLine(8, 11, 15),
    ]},
    // Antenna spire top
    { name: 'antenna', role: 'hair', pixels: [
      [7, 0], [8, 0],
      [7, 1], [8, 1],
      [7, 2], [8, 2],
      [7, 3], [8, 3],
    ]},
    // Viewport windows on hub
    { name: 'windows', role: 'eye', pixels: [
      [6, 7], [7, 6], [8, 6], [9, 7],
      [7, 8], [8, 8],
    ]},
    // Thruster exhaust ports bottom
    { name: 'thrusters', role: 'belt', pixels: [
      [5, 11], [6, 11], [9, 11], [10, 11],
      [5, 12], [10, 12],
    ]},
    // Base station ground mount
    { name: 'base', role: 'boot', pixels: [
      ...hLine(13, 5, 10),
      ...hLine(14, 6, 9),
      ...hLine(15, 4, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 2. PYRAMID_16 — Egyptian pyramid with entrance and capstone.
// ════════════════════════════════════════════════════════════
export const PYRAMID_16: SpriteTemplate = {
  name: 'pyramid_16', width: 16, height: 16,
  description: 'Egyptian stone pyramid with capstone, stone courses, and arched entrance.',
  regions: [
    // Capstone tip
    { name: 'capstone', role: 'hair', pixels: [
      [7, 1], [8, 1],
    ]},
    // Upper pyramid body
    { name: 'apex', role: 'head', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(5, 3, 12),
    ]},
    // Mid stone courses
    { name: 'body', role: 'body', pixels: [
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 1, 14),
      ...hLine(9, 1, 14),
    ]},
    // Lower base courses
    { name: 'base_courses', role: 'leg', pixels: [
      ...hLine(10, 1, 14),
      ...hLine(11, 0, 15),
      ...hLine(12, 0, 15),
      ...hLine(13, 0, 15),
    ]},
    // Entrance doorway arch
    { name: 'entrance', role: 'belt', pixels: [
      [6, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [9, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Hieroglyph decoration strips
    { name: 'decoration', role: 'accessory', pixels: [
      [4, 8], [11, 8],
      [3, 9], [12, 9],
      [2, 10], [13, 10],
    ]},
    // Ground/sand base
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 0, 15),
      ...hLine(15, 0, 15),
    ]},
    // Gold capstone glint
    { name: 'glint', role: 'eye', pixels: [
      [7, 0], [8, 0],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 3. IGLOO_16 — Arctic snow dome house with tunnel entrance.
// ════════════════════════════════════════════════════════════
export const IGLOO_16: SpriteTemplate = {
  name: 'igloo_16', width: 16, height: 16,
  description: 'Arctic igloo snow dome with low tunnel entrance and ice block texture.',
  regions: [
    // Dome top
    { name: 'dome_top', role: 'head', pixels: [
      ...hLine(3, 6, 9),
      ...hLine(4, 4, 11),
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 12),
    ]},
    // Dome mid body
    { name: 'dome_body', role: 'body', pixels: [
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 3, 12),
    ]},
    // Ice block seam lines (decorative)
    { name: 'ice_seams', role: 'arm', pixels: [
      [5, 5], [10, 5],
      [4, 7], [7, 6], [11, 7],
      [5, 9], [9, 8],
      [6, 4], [9, 4],
    ]},
    // Tunnel entrance
    { name: 'tunnel', role: 'belt', pixels: [
      [5, 11], [10, 11],
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
      [5, 13], [10, 13],
    ]},
    // Tunnel interior dark
    { name: 'tunnel_inside', role: 'hair', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [9, 12],
    ]},
    // Snow highlight on dome
    { name: 'highlight', role: 'eye', pixels: [
      [6, 4], [7, 4],
      [5, 6], [6, 5],
    ]},
    // Snow ground
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 1, 14),
      ...hLine(15, 0, 15),
    ]},
    // Smoke hole at top
    { name: 'smoke_hole', role: 'accessory', pixels: [
      [7, 2], [8, 2],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 4. PAGODA_16 — Asian multi-tier temple with upswept eaves.
// ════════════════════════════════════════════════════════════
export const PAGODA_16: SpriteTemplate = {
  name: 'pagoda_16', width: 16, height: 16,
  description: 'Asian pagoda with three upswept roof tiers, red pillars, and ornate spire.',
  regions: [
    // Finial spire
    { name: 'spire', role: 'hair', pixels: [
      [7, 0], [8, 0],
      [7, 1],
    ]},
    // Top tier roof
    { name: 'roof_top', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [4, 4], [11, 4],
    ]},
    // Top tier walls
    { name: 'walls_top', role: 'body', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [9, 5],
    ]},
    // Mid tier roof
    { name: 'roof_mid', role: 'arm', pixels: [
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [3, 7], [12, 7],
    ]},
    // Mid tier walls
    { name: 'walls_mid', role: 'belt', pixels: [
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [10, 8],
      [5, 9], [10, 9],
    ]},
    // Lower tier roof
    { name: 'roof_low', role: 'leg', pixels: [
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
      [1, 11], [14, 11],
    ]},
    // Lower tier walls
    { name: 'walls_low', role: 'accessory', pixels: [
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      [4, 12], [11, 12],
      [4, 13], [11, 13],
    ]},
    // Gate/door
    { name: 'door', role: 'eye', pixels: [
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
    ]},
    // Stone base platform
    { name: 'platform', role: 'boot', pixels: [
      ...hLine(14, 3, 12),
      ...hLine(15, 2, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 5. FACTORY_16 — Industrial building with two smokestacks.
// ════════════════════════════════════════════════════════════
export const FACTORY_16: SpriteTemplate = {
  name: 'factory_16', width: 16, height: 16,
  description: 'Industrial factory with two smokestacks, corrugated roof, and loading bay.',
  regions: [
    // Left smokestack
    { name: 'stack_left', role: 'hair', pixels: [
      ...vLine(3, 0, 6),
      ...vLine(4, 0, 6),
    ]},
    // Right smokestack
    { name: 'stack_right', role: 'head', pixels: [
      ...vLine(10, 0, 6),
      ...vLine(11, 0, 6),
    ]},
    // Smokestack caps
    { name: 'caps', role: 'accessory', pixels: [
      [2, 0], [5, 0], [9, 0], [12, 0],
    ]},
    // Factory roof (flat with vents)
    { name: 'roof', role: 'arm', pixels: [
      ...hLine(5, 1, 14),
      ...hLine(6, 1, 14),
    ]},
    // Roof vents
    { name: 'vents', role: 'eye', pixels: [
      [5, 4], [5, 5],
      [7, 4], [7, 5],
      [13, 4], [13, 5],
    ]},
    // Main factory walls
    { name: 'walls', role: 'body', pixels: [
      ...hLine(7, 1, 14),
      ...vLine(1, 7, 13),
      ...vLine(14, 7, 13),
      ...hLine(8, 1, 14), ...hLine(9, 1, 14), ...hLine(10, 1, 14), ...hLine(11, 1, 14), ...hLine(12, 1, 14),
    ]},
    // Row of factory windows
    { name: 'windows', role: 'face', pixels: [
      [2, 8], [3, 8], [2, 9], [3, 9],
      [5, 8], [6, 8], [5, 9], [6, 9],
      [11, 8], [12, 8], [11, 9], [12, 9],
    ]},
    // Loading bay doors
    { name: 'bay_doors', role: 'belt', pixels: [
      [7, 9], [8, 9], [9, 9], [10, 9],
      [7, 10], [10, 10],
      [7, 11], [8, 11], [9, 11], [10, 11],
      [7, 12], [10, 12],
      [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
    // Foundation/ground
    { name: 'foundation', role: 'boot', pixels: [
      ...hLine(13, 1, 14),
      ...hLine(14, 0, 15),
      ...hLine(15, 0, 15),
    ]},
    // Smoke puffs above stacks
    { name: 'smoke', role: 'leg', pixels: [
      [3, 0], [4, 0],
      [10, 0], [11, 0],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 6. SALOON_16 — Western saloon with facade, swing doors, balcony.
// ════════════════════════════════════════════════════════════
export const SALOON_16: SpriteTemplate = {
  name: 'saloon_16', width: 16, height: 16,
  description: 'Western saloon with false-front facade, swing doors, balcony rail, and sign.',
  regions: [
    // False front facade top
    { name: 'facade_top', role: 'head', pixels: [
      ...hLine(1, 2, 13),
      ...hLine(2, 2, 13),
      ...hLine(3, 2, 13),
    ]},
    // Saloon sign on facade
    { name: 'sign', role: 'eye', pixels: [
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
    ]},
    // Balcony floor
    { name: 'balcony', role: 'arm', pixels: [
      ...hLine(4, 2, 13),
    ]},
    // Balcony railing posts
    { name: 'railing', role: 'accessory', pixels: [
      [2, 4], [2, 5], [2, 6],
      [5, 4], [5, 5], [5, 6],
      [8, 4], [8, 5], [8, 6],
      [11, 4], [11, 5], [11, 6],
      [13, 4], [13, 5], [13, 6],
      ...hLine(4, 2, 13),
    ]},
    // Main walls
    { name: 'walls', role: 'body', pixels: [
      ...vLine(2, 4, 13),
      ...vLine(13, 4, 13),
      ...hLine(7, 2, 13),
    ]},
    // Upper floor windows
    { name: 'windows', role: 'face', pixels: [
      [3, 5], [4, 5], [3, 6], [4, 6],
      [9, 5], [10, 5], [9, 6], [10, 6],
    ]},
    // Swing doors (classic double)
    { name: 'doors', role: 'belt', pixels: [
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [9, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Lower wall (wood planks)
    { name: 'lower_walls', role: 'leg', pixels: [
      [3, 9], [4, 9], [5, 9], [10, 9], [11, 9], [12, 9],
      [3, 10], [4, 10], [5, 10], [10, 10], [11, 10], [12, 10],
      [3, 11], [4, 11], [5, 11], [10, 11], [11, 11], [12, 11],
      [3, 12], [4, 12], [5, 12], [10, 12], [11, 12], [12, 12],
      [3, 13], [4, 13], [5, 13], [10, 13], [11, 13], [12, 13],
    ]},
    // Boardwalk ground
    { name: 'boardwalk', role: 'boot', pixels: [
      ...hLine(14, 1, 14),
      ...hLine(15, 0, 15),
    ]},
    // Hitching post (left)
    { name: 'hitch', role: 'hair', pixels: [
      [0, 11], [0, 12], [0, 13], [0, 14],
      [15, 11], [15, 12], [15, 13], [15, 14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 7. HAUNTED_MANSION_16 — Spooky house with broken roof and cracked windows.
// ════════════════════════════════════════════════════════════
export const HAUNTED_MANSION_16: SpriteTemplate = {
  name: 'haunted_mansion_16', width: 16, height: 16,
  description: 'Haunted mansion with broken peak, cracked windows, iron fence, and bat.',
  regions: [
    // Broken gable roof peak
    { name: 'peak', role: 'hair', pixels: [
      [7, 0], [8, 0],
      [6, 1], [9, 1],
      [5, 2], [10, 2],
    ]},
    // Roof slopes
    { name: 'roof', role: 'head', pixels: [
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [3, 4], [12, 4],
      [2, 5], [13, 5],
    ]},
    // Attic dormer window
    { name: 'dormer', role: 'eye', pixels: [
      [6, 2], [7, 2], [8, 2],
      [6, 3], [8, 3],
    ]},
    // Main walls
    { name: 'walls', role: 'body', pixels: [
      ...hLine(5, 2, 13),
      ...vLine(2, 5, 13),
      ...vLine(13, 5, 13),
      ...hLine(6, 2, 13), ...hLine(7, 2, 13), ...hLine(8, 2, 13),
      ...hLine(9, 2, 13), ...hLine(10, 2, 13), ...hLine(11, 2, 13), ...hLine(12, 2, 13),
    ]},
    // Cracked upper windows
    { name: 'windows', role: 'face', pixels: [
      [3, 6], [4, 6], [3, 7], [4, 7],
      [11, 6], [12, 6], [11, 7], [12, 7],
    ]},
    // Window crack details
    { name: 'cracks', role: 'arm', pixels: [
      [4, 6], [3, 7],
      [11, 6], [12, 7],
    ]},
    // Lower windows
    { name: 'lower_windows', role: 'accessory', pixels: [
      [3, 9], [4, 9], [3, 10], [4, 10],
      [11, 9], [12, 9], [11, 10], [12, 10],
    ]},
    // Arched door
    { name: 'door', role: 'belt', pixels: [
      [7, 9], [8, 9],
      [6, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Iron fence at base
    { name: 'fence', role: 'leg', pixels: [
      [0, 12], [0, 13], [1, 11], [1, 12], [1, 13],
      [14, 12], [14, 13], [15, 11], [15, 12], [15, 13],
      [0, 11], [15, 11],
    ]},
    // Ground
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 0, 15),
      ...hLine(15, 0, 15),
    ]},
    // Bat silhouette near peak
    { name: 'bat', role: 'hand', pixels: [
      [1, 2], [2, 2], [3, 2],
      [2, 1],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 8. MUSHROOM_HOUSE_16 — Fairy mushroom home with cap roof and door.
// ════════════════════════════════════════════════════════════
export const MUSHROOM_HOUSE_16: SpriteTemplate = {
  name: 'mushroom_house_16', width: 16, height: 16,
  description: 'Fairy-tale mushroom house with spotted cap roof and round door.',
  regions: [
    // Mushroom cap top
    { name: 'cap_top', role: 'head', pixels: [
      ...hLine(1, 5, 10),
      ...hLine(2, 4, 11),
      ...hLine(3, 3, 12),
      ...hLine(4, 2, 13),
      ...hLine(5, 2, 13),
    ]},
    // Cap underside overhang
    { name: 'cap_rim', role: 'hair', pixels: [
      ...hLine(6, 2, 13),
      [1, 6], [14, 6],
    ]},
    // White spots on cap
    { name: 'spots', role: 'eye', pixels: [
      [5, 3], [6, 3],
      [9, 2], [10, 2],
      [4, 5], [5, 5],
      [10, 4], [11, 4],
      [7, 4], [8, 4],
    ]},
    // Mushroom stalk / walls
    { name: 'stalk', role: 'body', pixels: [
      ...vLine(4, 7, 13),
      ...vLine(5, 7, 13),
      ...vLine(10, 7, 13),
      ...vLine(11, 7, 13),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11), ...hLine(9, 4, 11), ...hLine(10, 4, 11),
      ...hLine(11, 4, 11), ...hLine(12, 4, 11), ...hLine(13, 4, 11),
    ]},
    // Round door
    { name: 'door', role: 'belt', pixels: [
      [7, 9], [8, 9],
      [6, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Circular window
    { name: 'window', role: 'arm', pixels: [
      [5, 9], [5, 10],
      [10, 9], [10, 10],
    ]},
    // Ground grass tufts
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 2, 13),
      ...hLine(15, 0, 15),
    ]},
    // Small mushroom accent
    { name: 'small_mushroom', role: 'accessory', pixels: [
      [1, 11], [2, 11], [3, 11],
      [2, 12], [2, 13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 9. CRYSTAL_SPIRE_16 — Magical crystal tower with faceted top.
// ════════════════════════════════════════════════════════════
export const CRYSTAL_SPIRE_16: SpriteTemplate = {
  name: 'crystal_spire_16', width: 16, height: 16,
  description: 'Magical crystal spire with faceted gem top, glowing core, and rocky base.',
  regions: [
    // Crystal point tip
    { name: 'tip', role: 'hair', pixels: [
      [7, 0], [8, 0],
    ]},
    // Upper crystal facets
    { name: 'facets_top', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [9, 3], [10, 3],
    ]},
    // Crystal body mid
    { name: 'crystal_body', role: 'body', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
      ...hLine(9, 5, 10),
    ]},
    // Inner glow core
    { name: 'glow', role: 'eye', pixels: [
      [7, 3], [8, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [9, 5],
      [7, 6], [8, 6],
    ]},
    // Crystal facet lines
    { name: 'facets_mid', role: 'arm', pixels: [
      [5, 4], [10, 4],
      [5, 6], [10, 6],
      [5, 7], [10, 7],
      [5, 8], [10, 8],
    ]},
    // Base cluster of smaller crystals
    { name: 'base_crystals', role: 'accessory', pixels: [
      [3, 9], [4, 9], [5, 9],
      [10, 9], [11, 9], [12, 9],
      [3, 10], [12, 10],
      [4, 8], [11, 8],
    ]},
    // Rock foundation
    { name: 'foundation', role: 'leg', pixels: [
      ...hLine(10, 4, 11),
      ...hLine(11, 3, 12),
      ...hLine(12, 3, 12),
      ...hLine(13, 2, 13),
    ]},
    // Ground
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 1, 14),
      ...hLine(15, 0, 15),
    ]},
    // Crystal gleam highlights
    { name: 'highlights', role: 'belt', pixels: [
      [6, 2], [6, 3],
      [5, 5], [5, 6],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 10. BUNKER_16 — Military concrete bunker with slit windows.
// ════════════════════════════════════════════════════════════
export const BUNKER_16: SpriteTemplate = {
  name: 'bunker_16', width: 16, height: 16,
  description: 'Military concrete bunker with firing slit, reinforced walls, and blast door.',
  regions: [
    // Bunker roof (thick concrete slab)
    { name: 'roof', role: 'head', pixels: [
      ...hLine(4, 1, 14),
      ...hLine(5, 1, 14),
      ...hLine(6, 1, 14),
    ]},
    // Roof overhang lip
    { name: 'overhang', role: 'hair', pixels: [
      [0, 6], [15, 6],
      [0, 5], [15, 5],
    ]},
    // Main concrete walls
    { name: 'walls', role: 'body', pixels: [
      ...vLine(1, 7, 13),
      ...vLine(14, 7, 13),
      ...hLine(7, 1, 14),
      ...hLine(8, 1, 14), ...hLine(9, 1, 14), ...hLine(10, 1, 14),
      ...hLine(11, 1, 14), ...hLine(12, 1, 14), ...hLine(13, 1, 14),
    ]},
    // Gun slit / firing port
    { name: 'slit', role: 'eye', pixels: [
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8],
    ]},
    // Observation slit upper right
    { name: 'obs_slit', role: 'arm', pixels: [
      [9, 7], [10, 7], [11, 7], [12, 7],
    ]},
    // Reinforcement ribs on wall
    { name: 'ribs', role: 'accessory', pixels: [
      [3, 7], [3, 13],
      [6, 7], [6, 13],
      [10, 7], [10, 13],
      [13, 7], [13, 13],
    ]},
    // Blast door (heavy metal)
    { name: 'door', role: 'belt', pixels: [
      [7, 10], [8, 10], [9, 10], [10, 10],
      [7, 11], [10, 11],
      [7, 12], [8, 12], [9, 12], [10, 12],
      [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
    // Door handle/wheel
    { name: 'wheel', role: 'hand', pixels: [
      [8, 11], [9, 11],
    ]},
    // Earthen berm around base
    { name: 'berm', role: 'leg', pixels: [
      [0, 13], [15, 13],
    ]},
    // Ground
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 0, 15),
      ...hLine(15, 0, 15),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 11. GREENHOUSE_16 — Glass plant house with arched roof.
// ════════════════════════════════════════════════════════════
export const GREENHOUSE_16: SpriteTemplate = {
  name: 'greenhouse_16', width: 16, height: 16,
  description: 'Glass greenhouse with arched roof panels, brick base, and door.',
  regions: [
    // Arched glass roof
    { name: 'roof', role: 'head', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(5, 3, 12),
    ]},
    // Roof frame struts
    { name: 'frame', role: 'arm', pixels: [
      [5, 4], [7, 3], [9, 3], [11, 4],
      [5, 5], [11, 5],
      [5, 6], [11, 6],
      [7, 4], [9, 4],
    ]},
    // Glass panes (light interior visible)
    { name: 'glass', role: 'eye', pixels: [
      [6, 3], [8, 3], [10, 3],
      [6, 4], [8, 4], [10, 4],
      [6, 5], [8, 5], [10, 5],
      [7, 5], [9, 5],
    ]},
    // Brick base walls
    { name: 'walls', role: 'body', pixels: [
      ...vLine(3, 6, 13),
      ...vLine(12, 6, 13),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12), ...hLine(8, 3, 12), ...hLine(9, 3, 12),
      ...hLine(10, 3, 12), ...hLine(11, 3, 12), ...hLine(12, 3, 12), ...hLine(13, 3, 12),
    ]},
    // Brick texture pattern
    { name: 'bricks', role: 'belt', pixels: [
      [5, 8], [8, 8], [11, 8],
      [4, 10], [7, 10], [10, 10],
      [5, 12], [8, 12], [11, 12],
    ]},
    // Plants inside visible through glass
    { name: 'plants', role: 'leg', pixels: [
      [5, 9], [6, 8], [7, 7], [8, 8], [9, 7], [10, 8], [11, 9],
    ]},
    // Door
    { name: 'door', role: 'accessory', pixels: [
      [7, 10], [8, 10],
      [6, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Ground/foundation
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(13, 3, 12),
      ...hLine(14, 2, 13),
      ...hLine(15, 1, 14),
    ]},
    // Ridge cap at top
    { name: 'ridge', role: 'hair', pixels: [
      [7, 1], [8, 1],
      [7, 2], [8, 2],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 12. WATCHTOWER_WOOD_16 — Wooden guard tower on stilts.
// ════════════════════════════════════════════════════════════
export const WATCHTOWER_WOOD_16: SpriteTemplate = {
  name: 'watchtower_wood_16', width: 16, height: 16,
  description: 'Medieval wooden watchtower on log stilts with floor platform and peaked roof.',
  regions: [
    // Peaked roof
    { name: 'roof', role: 'head', pixels: [
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
    ]},
    // Roof overhang
    { name: 'eaves', role: 'hair', pixels: [
      [3, 5], [12, 5],
    ]},
    // Watch room walls
    { name: 'walls', role: 'body', pixels: [
      ...vLine(4, 5, 9),
      ...vLine(11, 5, 9),
      ...hLine(5, 4, 11),
      ...hLine(9, 4, 11),
    ]},
    // Watch room windows (open)
    { name: 'windows', role: 'eye', pixels: [
      [5, 6], [6, 6], [5, 7], [6, 7],
      [9, 6], [10, 6], [9, 7], [10, 7],
    ]},
    // Platform floor
    { name: 'platform', role: 'arm', pixels: [
      ...hLine(9, 3, 12),
      ...hLine(10, 3, 12),
    ]},
    // Railing on platform
    { name: 'railing', role: 'accessory', pixels: [
      [3, 8], [3, 9],
      [6, 8], [6, 9],
      [9, 8], [9, 9],
      [12, 8], [12, 9],
      ...hLine(8, 3, 12),
    ]},
    // Log stilts / support posts
    { name: 'stilts', role: 'leg', pixels: [
      ...vLine(4, 10, 13),
      ...vLine(5, 10, 13),
      ...vLine(10, 10, 13),
      ...vLine(11, 10, 13),
    ]},
    // Cross braces between stilts
    { name: 'braces', role: 'belt', pixels: [
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
      [5, 12], [10, 12],
    ]},
    // Ground
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 2, 13),
      ...hLine(15, 1, 14),
    ]},
    // Flag/banner at top
    { name: 'flag', role: 'belt', pixels: [
      [8, 0], [9, 0], [10, 0],
      [8, 1],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 13. DOCK_16 — Wooden water dock/pier with mooring post.
// ════════════════════════════════════════════════════════════
export const DOCK_16: SpriteTemplate = {
  name: 'dock_16', width: 16, height: 16,
  description: 'Coastal wooden dock pier with planks, mooring posts, rope, and water.',
  regions: [
    // Dock planks (horizontal surface)
    { name: 'planks', role: 'body', pixels: [
      ...hLine(8, 0, 15),
      ...hLine(9, 0, 15),
      ...hLine(10, 0, 15),
    ]},
    // Plank gaps/wood grain lines
    { name: 'gaps', role: 'arm', pixels: [
      [2, 8], [5, 8], [8, 8], [11, 8], [14, 8],
    ]},
    // Dock support posts in water
    { name: 'posts', role: 'leg', pixels: [
      ...vLine(2, 11, 15),
      ...vLine(3, 11, 15),
      ...vLine(7, 11, 15),
      ...vLine(8, 11, 15),
      ...vLine(13, 11, 15),
      ...vLine(14, 11, 15),
    ]},
    // Mooring bollard posts (above deck)
    { name: 'bollards', role: 'head', pixels: [
      [1, 6], [1, 7], [1, 8],
      [0, 6], [2, 6],
      [14, 6], [14, 7], [14, 8],
      [13, 6], [15, 6],
    ]},
    // Rope/line connecting bollards
    { name: 'rope', role: 'accessory', pixels: [
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
    ]},
    // Water surface
    { name: 'water', role: 'eye', pixels: [
      ...hLine(11, 0, 15),
      ...hLine(12, 0, 15),
      ...hLine(13, 0, 15),
      ...hLine(14, 0, 1), ...hLine(14, 4, 6), ...hLine(14, 9, 12),
      ...hLine(15, 0, 2), ...hLine(15, 5, 7), ...hLine(15, 10, 13),
    ]},
    // Water ripples
    { name: 'ripples', role: 'belt', pixels: [
      [4, 12], [5, 12], [9, 12], [10, 12],
      [1, 14], [2, 14], [11, 14], [12, 14],
    ]},
    // Shore/land at top
    { name: 'shore', role: 'boot', pixels: [
      ...hLine(5, 0, 15),
      ...hLine(6, 0, 15),
      ...hLine(7, 0, 15),
    ]},
    // Dock edge beam
    { name: 'edge_beam', role: 'hair', pixels: [
      ...hLine(10, 0, 15),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 14. CAVE_ENTRANCE_16 — Dungeon cave mouth with stalactites.
// ════════════════════════════════════════════════════════════
export const CAVE_ENTRANCE_16: SpriteTemplate = {
  name: 'cave_entrance_16', width: 16, height: 16,
  description: 'Dungeon cave entrance with jagged rock arch, stalactites, and dark interior.',
  regions: [
    // Rock arch top/cliff face
    { name: 'cliff', role: 'head', pixels: [
      ...hLine(0, 0, 15),
      ...hLine(1, 0, 15),
      ...hLine(2, 0, 4), ...hLine(2, 11, 15),
      ...hLine(3, 0, 3), ...hLine(3, 12, 15),
      ...hLine(4, 0, 2), ...hLine(4, 13, 15),
    ]},
    // Left rock wall
    { name: 'left_wall', role: 'body', pixels: [
      ...vLine(0, 3, 15),
      ...vLine(1, 4, 15),
      ...vLine(2, 5, 15),
      ...vLine(3, 6, 15),
      [4, 7], [4, 8], [4, 9], [4, 10],
    ]},
    // Right rock wall
    { name: 'right_wall', role: 'arm', pixels: [
      ...vLine(15, 3, 15),
      ...vLine(14, 4, 15),
      ...vLine(13, 5, 15),
      ...vLine(12, 6, 15),
      [11, 7], [11, 8], [11, 9], [11, 10],
    ]},
    // Cave opening (dark interior)
    { name: 'interior', role: 'hair', pixels: [
      ...hLine(3, 4, 11),
      ...hLine(4, 3, 12),
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 12),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 5, 10),
    ]},
    // Stalactites hanging from arch
    { name: 'stalactites', role: 'accessory', pixels: [
      [5, 3], [5, 4],
      [7, 2], [7, 3], [7, 4],
      [9, 3], [9, 4], [9, 5],
      [11, 4],
    ]},
    // Ground inside cave
    { name: 'floor', role: 'boot', pixels: [
      ...hLine(10, 4, 11),
      ...hLine(11, 3, 12),
      ...hLine(12, 3, 12),
    ]},
    // Glowing eyes in dark interior
    { name: 'eyes', role: 'eye', pixels: [
      [6, 6], [8, 6],
    ]},
    // Mossy rock textures
    { name: 'moss', role: 'leg', pixels: [
      [2, 7], [1, 9],
      [13, 8], [14, 6],
    ]},
    // Ground outside cave
    { name: 'ground', role: 'belt', pixels: [
      ...hLine(13, 1, 14),
      ...hLine(14, 0, 15),
      ...hLine(15, 0, 15),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 15. OBELISK_16 — Tall Egyptian stone monument with glyphs.
// ════════════════════════════════════════════════════════════
export const OBELISK_16: SpriteTemplate = {
  name: 'obelisk_16', width: 16, height: 16,
  description: 'Tall Egyptian obelisk monument with gold pyramidion, carved glyphs, and stone base.',
  regions: [
    // Gold pyramidion tip
    { name: 'pyramidion', role: 'hair', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
    ]},
    // Upper obelisk shaft
    { name: 'shaft_top', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [6, 3], [9, 3],
      [6, 4], [9, 4],
      [6, 5], [9, 5],
      [6, 6], [9, 6],
    ]},
    // Mid obelisk shaft
    { name: 'shaft_mid', role: 'body', pixels: [
      [5, 7], [6, 7], [9, 7], [10, 7],
      [5, 8], [10, 8],
      [5, 9], [10, 9],
      [5, 10], [10, 10],
    ]},
    // Lower shaft (slightly wider)
    { name: 'shaft_low', role: 'arm', pixels: [
      [5, 11], [10, 11],
      [4, 11], [11, 11],
    ]},
    // Hieroglyph panel left
    { name: 'glyphs_left', role: 'eye', pixels: [
      [7, 3], [7, 5], [7, 7], [7, 9],
    ]},
    // Hieroglyph panel right
    { name: 'glyphs_right', role: 'accessory', pixels: [
      [8, 4], [8, 6], [8, 8], [8, 10],
    ]},
    // Stepped stone base
    { name: 'base_step1', role: 'leg', pixels: [
      ...hLine(12, 4, 11),
      ...hLine(11, 4, 11),
    ]},
    { name: 'base_step2', role: 'belt', pixels: [
      ...hLine(13, 3, 12),
    ]},
    // Ground platform
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 2, 13),
      ...hLine(15, 1, 14),
    ]},
    // Gold gleam on pyramidion
    { name: 'gleam', role: 'hand', pixels: [
      [7, 0], [8, 1],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 16. WINDMILL_STONE_16 — Stone windmill variant with 4 sails.
// ════════════════════════════════════════════════════════════
export const WINDMILL_STONE_16: SpriteTemplate = {
  name: 'windmill_stone_16', width: 16, height: 16,
  description: 'Stone windmill with four angled sails, conical roof, and arched door.',
  regions: [
    // Conical stone roof
    { name: 'roof', role: 'head', pixels: [
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
    ]},
    // Sail hub center
    { name: 'hub', role: 'hair', pixels: [
      [7, 4], [8, 4],
      [7, 5], [8, 5],
    ]},
    // Top sail blade
    { name: 'sail_top', role: 'arm', pixels: [
      [6, 0], [7, 0],
      [5, 0],
    ]},
    // Bottom sail blade
    { name: 'sail_bottom', role: 'accessory', pixels: [
      [8, 8], [9, 8],
      [10, 9],
    ]},
    // Left sail blade
    { name: 'sail_left', pixels: [
      [3, 3], [4, 4], [5, 5],
    ], role: 'eye' },
    // Right sail blade
    { name: 'sail_right', role: 'belt', pixels: [
      [10, 4], [11, 3], [12, 2],
    ]},
    // Stone tower walls
    { name: 'walls', role: 'body', pixels: [
      ...vLine(4, 4, 13),
      ...vLine(5, 4, 13),
      ...vLine(10, 4, 13),
      ...vLine(11, 4, 13),
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 11), ...hLine(6, 4, 11), ...hLine(7, 4, 11),
      ...hLine(8, 4, 11), ...hLine(9, 4, 11), ...hLine(10, 4, 11),
      ...hLine(11, 4, 11), ...hLine(12, 4, 11), ...hLine(13, 4, 11),
    ]},
    // Stone texture blocks
    { name: 'stones', role: 'face', pixels: [
      [6, 6], [9, 6],
      [5, 8], [10, 8],
      [6, 10], [9, 10],
      [5, 12], [10, 12],
    ]},
    // Arched door
    { name: 'door', role: 'leg', pixels: [
      [7, 10], [8, 10],
      [6, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Ground
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 3, 12),
      ...hLine(15, 2, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 17. PRISON_CELL_16 — Barred jail cell with cot and torch.
// ════════════════════════════════════════════════════════════
export const PRISON_CELL_16: SpriteTemplate = {
  name: 'prison_cell_16', width: 16, height: 16,
  description: 'Dungeon prison cell with iron bars, stone walls, wooden cot, and wall torch.',
  regions: [
    // Stone wall back
    { name: 'back_wall', role: 'head', pixels: [
      ...hLine(2, 0, 15),
      ...hLine(3, 0, 15),
      ...hLine(4, 0, 15),
    ]},
    // Stone side walls
    { name: 'side_walls', role: 'body', pixels: [
      ...vLine(0, 2, 15),
      ...vLine(1, 2, 15),
      ...vLine(14, 2, 15),
      ...vLine(15, 2, 15),
    ]},
    // Stone floor
    { name: 'floor', role: 'leg', pixels: [
      ...hLine(12, 2, 13),
      ...hLine(13, 2, 13),
      ...hLine(14, 0, 15),
      ...hLine(15, 0, 15),
    ]},
    // Iron bars (vertical)
    { name: 'bars', role: 'arm', pixels: [
      ...vLine(4, 4, 13),
      ...vLine(6, 4, 13),
      ...vLine(8, 4, 13),
      ...vLine(10, 4, 13),
      ...vLine(12, 4, 13),
    ]},
    // Bar cross-rail
    { name: 'bar_rail', role: 'belt', pixels: [
      ...hLine(5, 4, 12),
      ...hLine(9, 4, 12),
    ]},
    // Wooden cot/bench
    { name: 'cot', role: 'accessory', pixels: [
      ...hLine(10, 2, 3),
      ...hLine(11, 2, 3),
      [2, 12], [3, 12],
    ]},
    // Cot legs
    { name: 'cot_legs', role: 'hand', pixels: [
      [2, 12], [3, 12],
    ]},
    // Wall torch with flame
    { name: 'torch', role: 'eye', pixels: [
      [12, 4], [13, 4],
      [12, 5], [13, 5],
      [12, 3], [13, 3],
    ]},
    // Chain on wall
    { name: 'chain', role: 'hair', pixels: [
      [2, 5], [3, 5],
      [2, 6], [3, 6],
      [2, 7],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 18. STABLE_16 — Farming stable with hay loft and stall doors.
// ════════════════════════════════════════════════════════════
export const STABLE_16: SpriteTemplate = {
  name: 'stable_16', width: 16, height: 16,
  description: 'Farming stable with pitched hay loft, wooden stall doors, and horseshoe sign.',
  regions: [
    // Gabled roof
    { name: 'roof', role: 'head', pixels: [
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
    ]},
    // Hay loft opening in gable
    { name: 'loft', role: 'eye', pixels: [
      [7, 3], [8, 3],
      [7, 4], [8, 4],
    ]},
    // Main stable walls (wood planks)
    { name: 'walls', role: 'body', pixels: [
      ...vLine(2, 6, 13),
      ...vLine(13, 6, 13),
      ...hLine(6, 2, 13),
    ]},
    // Wood plank texture
    { name: 'planks', role: 'arm', pixels: [
      ...hLine(8, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(12, 2, 13),
    ]},
    // Left stall door
    { name: 'stall_left', role: 'belt', pixels: [
      [3, 8], [4, 8], [5, 8],
      [3, 9], [5, 9],
      [3, 10], [4, 10], [5, 10],
      [3, 11], [5, 11],
      [3, 12], [4, 12], [5, 12],
      [3, 13], [4, 13], [5, 13],
    ]},
    // Right stall door
    { name: 'stall_right', role: 'leg', pixels: [
      [10, 8], [11, 8], [12, 8],
      [10, 9], [12, 9],
      [10, 10], [11, 10], [12, 10],
      [10, 11], [12, 11],
      [10, 12], [11, 12], [12, 12],
      [10, 13], [11, 13], [12, 13],
    ]},
    // Middle gate/entrance between stalls
    { name: 'entrance', role: 'accessory', pixels: [
      [7, 8], [8, 8],
      [6, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Horseshoe sign on wall
    { name: 'sign', role: 'hair', pixels: [
      [7, 6], [8, 6], [9, 6],
      [7, 7], [9, 7],
    ]},
    // Ground
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(14, 1, 14),
      ...hLine(15, 0, 15),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 19. LIBRARY_16 — Medieval book-filled building with arched windows.
// ════════════════════════════════════════════════════════════
export const LIBRARY_16: SpriteTemplate = {
  name: 'library_16', width: 16, height: 16,
  description: 'Medieval library building with book-symbol frieze, arched windows, and double doors.',
  regions: [
    // Crenellated parapet top
    { name: 'parapet', role: 'head', pixels: [
      [2, 2], [3, 2], [5, 2], [6, 2], [8, 2], [9, 2], [11, 2], [12, 2],
      [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3],
    ]},
    // Frieze band (book symbols)
    { name: 'frieze', role: 'accessory', pixels: [
      ...hLine(4, 2, 13),
      [3, 5], [5, 5], [7, 5], [9, 5], [11, 5], [13, 5],
    ]},
    // Stone walls
    { name: 'walls', role: 'body', pixels: [
      ...vLine(2, 4, 13),
      ...vLine(13, 4, 13),
      ...hLine(4, 2, 13),
      ...hLine(5, 2, 13), ...hLine(6, 2, 13), ...hLine(7, 2, 13),
      ...hLine(8, 2, 13), ...hLine(9, 2, 13), ...hLine(10, 2, 13),
      ...hLine(11, 2, 13), ...hLine(12, 2, 13), ...hLine(13, 2, 13),
    ]},
    // Left arched window
    { name: 'window_left', role: 'eye', pixels: [
      [3, 6], [4, 6],
      [3, 7], [4, 7],
      [3, 8], [4, 8],
      [3, 9], [4, 9],
    ]},
    // Right arched window
    { name: 'window_right', role: 'arm', pixels: [
      [11, 6], [12, 6],
      [11, 7], [12, 7],
      [11, 8], [12, 8],
      [11, 9], [12, 9],
    ]},
    // Stone arch over windows
    { name: 'arches', role: 'belt', pixels: [
      [3, 5], [4, 5], [5, 5],
      [10, 5], [11, 5], [12, 5],
    ]},
    // Double entry doors
    { name: 'doors', role: 'leg', pixels: [
      [6, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Door divider post
    { name: 'door_post', role: 'hair', pixels: [
      [7, 9], [7, 10], [7, 11], [7, 12], [7, 13],
      [8, 9], [8, 10], [8, 11], [8, 12], [8, 13],
    ]},
    // Stone step entrance
    { name: 'step', role: 'boot', pixels: [
      ...hLine(13, 4, 11),
      ...hLine(14, 3, 12),
      ...hLine(15, 2, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 20. VOLCANO_ALTAR_16 — Sacrificial altar on lava field.
// ════════════════════════════════════════════════════════════
export const VOLCANO_ALTAR_16: SpriteTemplate = {
  name: 'volcano_altar_16', width: 16, height: 16,
  description: 'Evil volcano altar on lava field with stone sacrificial table and bone decorations.',
  regions: [
    // Volcano peak erupting
    { name: 'volcano', role: 'head', pixels: [
      [6, 0], [7, 0], [8, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1],
      [4, 2], [5, 2], [9, 2], [10, 2],
      [3, 3], [4, 3], [10, 3], [11, 3],
    ]},
    // Eruption lava/fire plume
    { name: 'plume', role: 'hair', pixels: [
      [7, 0], [8, 0],
      [6, 0], [9, 0],
    ]},
    // Lava flow spilling down sides
    { name: 'lava_flow', role: 'accessory', pixels: [
      [4, 4], [5, 4], [9, 4], [10, 4],
      [3, 5], [11, 5],
      [2, 6], [12, 6],
      [1, 7], [13, 7],
    ]},
    // Altar stone table top
    { name: 'altar_top', role: 'body', pixels: [
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
    ]},
    // Altar support pillars
    { name: 'pillars', role: 'arm', pixels: [
      ...vLine(4, 9, 12),
      ...vLine(5, 9, 12),
      ...vLine(10, 9, 12),
      ...vLine(11, 9, 12),
    ]},
    // Skull/bone decorations on altar
    { name: 'bones', role: 'eye', pixels: [
      [5, 7], [6, 7], [7, 7],
      [9, 7], [10, 7], [11, 7],
      [7, 8], [8, 8], [9, 8],
    ]},
    // Fire bowl on altar surface
    { name: 'fire', role: 'belt', pixels: [
      [7, 6], [8, 6], [9, 6],
      [8, 5],
    ]},
    // Lava pool ground
    { name: 'lava_ground', role: 'leg', pixels: [
      ...hLine(13, 0, 15),
      ...hLine(14, 0, 15),
    ]},
    // Dark rock ground
    { name: 'rock_ground', role: 'boot', pixels: [
      ...hLine(15, 0, 15),
    ]},
    // Altar base/plinth
    { name: 'plinth', role: 'face', pixels: [
      ...hLine(12, 3, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// COLOR SCHEMES
// ════════════════════════════════════════════════════════════

export const SPACE_STATION_COLORS = scheme('space_station_default', {
  body:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
  head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#8595a1' },
  arm:       { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  accessory: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const PYRAMID_COLORS = scheme('pyramid_default', {
  hair:     { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  head:     { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  body:     { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  leg:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  belt:     { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory:{ shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:     { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  eye:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
});

export const IGLOO_COLORS = scheme('igloo_default', {
  head:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  boot:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
});

export const PAGODA_COLORS = scheme('pagoda_default', {
  hair:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d04648' },
  arm:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
});

export const FACTORY_COLORS = scheme('factory_default', {
  hair:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  face:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
});

export const SALOON_COLORS = scheme('saloon_default', {
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  face:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  hair:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
});

export const HAUNTED_MANSION_COLORS = scheme('haunted_mansion_default', {
  hair:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  face:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hand:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
});

export const MUSHROOM_HOUSE_COLORS = scheme('mushroom_house_default', {
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#d04648' },
  hair:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
});

export const CRYSTAL_SPIRE_COLORS = scheme('crystal_spire_default', {
  hair:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  head:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  accessory: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  belt:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
});

export const BUNKER_COLORS = scheme('bunker_default', {
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  hair:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  accessory: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  hand:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
});

export const GREENHOUSE_COLORS = scheme('greenhouse_default', {
  head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  accessory: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
});

export const WATCHTOWER_WOOD_COLORS = scheme('watchtower_wood_default', {
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  boot:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
});

export const DOCK_COLORS = scheme('dock_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  boot:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  hair:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
});

export const CAVE_ENTRANCE_COLORS = scheme('cave_entrance_default', {
  head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  hair:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
  accessory: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#8595a1' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
});

export const OBELISK_COLORS = scheme('obelisk_default', {
  hair:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  arm:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  hand:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
});

export const WINDMILL_STONE_COLORS = scheme('windmill_stone_default', {
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  hair:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  face:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
});

export const PRISON_CELL_COLORS = scheme('prison_cell_default', {
  head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hand:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const STABLE_COLORS = scheme('stable_default', {
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  boot:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
});

export const LIBRARY_COLORS = scheme('library_default', {
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  hair:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
});

export const VOLCANO_ALTAR_COLORS = scheme('volcano_altar_default', {
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  hair:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  leg:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  face:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
});

// ════════════════════════════════════════════════════════════
// EXPORTS
// ════════════════════════════════════════════════════════════

export const BUILDING_BATCH2_TEMPLATES: Record<string, SpriteTemplate> = {
  space_station_16:    SPACE_STATION_16,
  pyramid_16:          PYRAMID_16,
  igloo_16:            IGLOO_16,
  pagoda_16:           PAGODA_16,
  factory_16:          FACTORY_16,
  saloon_16:           SALOON_16,
  haunted_mansion_16:  HAUNTED_MANSION_16,
  mushroom_house_16:   MUSHROOM_HOUSE_16,
  crystal_spire_16:    CRYSTAL_SPIRE_16,
  bunker_16:           BUNKER_16,
  greenhouse_16:       GREENHOUSE_16,
  watchtower_wood_16:  WATCHTOWER_WOOD_16,
  dock_16:             DOCK_16,
  cave_entrance_16:    CAVE_ENTRANCE_16,
  obelisk_16:          OBELISK_16,
  windmill_stone_16:   WINDMILL_STONE_16,
  prison_cell_16:      PRISON_CELL_16,
  stable_16:           STABLE_16,
  library_16:          LIBRARY_16,
  volcano_altar_16:    VOLCANO_ALTAR_16,
};

export const BUILDING_BATCH2_COLOR_SCHEMES: Record<string, ColorScheme> = {
  space_station_default:   SPACE_STATION_COLORS,
  pyramid_default:         PYRAMID_COLORS,
  igloo_default:           IGLOO_COLORS,
  pagoda_default:          PAGODA_COLORS,
  factory_default:         FACTORY_COLORS,
  saloon_default:          SALOON_COLORS,
  haunted_mansion_default: HAUNTED_MANSION_COLORS,
  mushroom_house_default:  MUSHROOM_HOUSE_COLORS,
  crystal_spire_default:   CRYSTAL_SPIRE_COLORS,
  bunker_default:          BUNKER_COLORS,
  greenhouse_default:      GREENHOUSE_COLORS,
  watchtower_wood_default: WATCHTOWER_WOOD_COLORS,
  dock_default:            DOCK_COLORS,
  cave_entrance_default:   CAVE_ENTRANCE_COLORS,
  obelisk_default:         OBELISK_COLORS,
  windmill_stone_default:  WINDMILL_STONE_COLORS,
  prison_cell_default:     PRISON_CELL_COLORS,
  stable_default:          STABLE_COLORS,
  library_default:         LIBRARY_COLORS,
  volcano_altar_default:   VOLCANO_ALTAR_COLORS,
};
