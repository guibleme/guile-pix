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

const ENV_BASE = {
  head:      { shadow: '#442434', base: '#757161', highlight: '#8595a1' },
  body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#757161', highlight: '#8595a1' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#140c1c', highlight: '#4e4a4e' },
  accessory: { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
};

function scheme(name: string, overrides: Partial<typeof ENV_BASE>): ColorScheme {
  return { name, mapping: { ...ENV_BASE, ...overrides } };
}

// ═══════════════════════════════════════════════════════════════
// 1. COBBLESTONE_PATH_16 — paved stone road tile
// Rounded cobbles in a packed irregular pattern, mortar between.
// ═══════════════════════════════════════════════════════════════
export const COBBLESTONE_PATH_16: SpriteTemplate = {
  name: 'cobblestone_path_16', width: 16, height: 16,
  description: 'Paved cobblestone road tile. Rounded irregular stones packed tightly with mortar gaps.',
  regions: [
    { name: 'stone_fill', role: 'body', pixels: [
      // Row 0-2: top stones (large stone left, medium stone right)
      ...rect(1, 0, 6, 2), ...rect(8, 0, 13, 2), [15, 0], [15, 1], [15, 2],
      // Row 4-6: offset row
      ...rect(0, 4, 4, 6), ...rect(6, 4, 11, 6), ...rect(13, 4, 15, 6),
      // Row 8-10: back to first offset
      ...rect(1, 8, 5, 10), ...rect(7, 8, 12, 10), [14, 8], [15, 8], [14, 9], [15, 9], [14, 10], [15, 10],
      // Row 12-14: last row
      ...rect(0, 12, 3, 14), ...rect(5, 12, 10, 14), ...rect(12, 12, 15, 14),
    ]},
    { name: 'mortar', role: 'belt', pixels: [
      // Horizontal mortar rows
      ...hLine(3, 0, 15), ...hLine(7, 0, 15), ...hLine(11, 0, 15), ...hLine(15, 0, 15),
      // Vertical mortar gaps row 0-2
      [0, 0], [0, 1], [0, 2], [7, 0], [7, 1], [7, 2], [14, 0], [14, 1], [14, 2],
      // Vertical mortar gaps row 4-6
      [5, 4], [5, 5], [5, 6], [12, 4], [12, 5], [12, 6],
      // Vertical mortar gaps row 8-10
      [0, 8], [0, 9], [0, 10], [6, 8], [6, 9], [6, 10], [13, 8], [13, 9], [13, 10],
      // Vertical mortar gaps row 12-14
      [4, 12], [4, 13], [4, 14], [11, 12], [11, 13], [11, 14],
    ]},
    { name: 'stone_highlight', role: 'head', pixels: [
      [2, 0], [9, 0], [1, 4], [7, 4], [14, 4], [2, 8], [8, 8], [1, 12], [6, 12], [13, 12],
    ]},
    { name: 'stone_shadow', role: 'boot', pixels: [
      [5, 2], [12, 2], [4, 6], [10, 6], [4, 10], [11, 10], [3, 14], [9, 14],
    ]},
    { name: 'worn_shine', role: 'eye', pixels: [
      [3, 0], [10, 0], [2, 4], [8, 4], [3, 8], [9, 8], [2, 12], [7, 12],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 2. DIRT_PATH_16 — worn dirt trail
// Bare brown earth, scuffed with footwear tracks and pebbles.
// ═══════════════════════════════════════════════════════════════
export const DIRT_PATH_16: SpriteTemplate = {
  name: 'dirt_path_16', width: 16, height: 16,
  description: 'Worn dirt trail tile. Brown earth base with scuff marks, pebbles, and track grooves.',
  regions: [
    { name: 'dirt_base', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'track_grooves', role: 'arm', pixels: [
      // Two parallel rut tracks running vertically
      [4, 0], [4, 1], [5, 2], [5, 3], [4, 4], [4, 5], [5, 6], [4, 7], [4, 8], [5, 9], [4, 10], [4, 11], [5, 12], [4, 13], [4, 14], [5, 15],
      [10, 0], [11, 1], [10, 2], [10, 3], [11, 4], [10, 5], [10, 6], [11, 7], [10, 8], [10, 9], [11, 10], [10, 11], [10, 12], [11, 13], [10, 14], [10, 15],
    ]},
    { name: 'pebbles', role: 'accessory', pixels: [
      [1, 1], [7, 3], [13, 2], [2, 6], [14, 5], [8, 7], [3, 10], [12, 9], [6, 12], [15, 11], [1, 14], [9, 15],
    ]},
    { name: 'dirt_shadow', role: 'boot', pixels: [
      [0, 3], [6, 1], [9, 4], [15, 3], [2, 8], [13, 7], [5, 11], [11, 13], [0, 15], [8, 14],
    ]},
    { name: 'dirt_highlight', role: 'head', pixels: [
      [3, 0], [8, 2], [15, 0], [1, 5], [12, 6], [6, 9], [0, 12], [14, 10], [7, 14], [11, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 3. MARSH_GROUND_16 — wet muddy marsh tile
// Dark wet mud base with water pools, reeds, and algae patches.
// ═══════════════════════════════════════════════════════════════
export const MARSH_GROUND_16: SpriteTemplate = {
  name: 'marsh_ground_16', width: 16, height: 16,
  description: 'Wet muddy marsh tile. Dark mud with standing water pools and scattered reeds.',
  regions: [
    { name: 'mud_base', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'water_pools', role: 'leg', pixels: [
      // Small standing water pools
      ...rect(2, 1, 5, 3), ...rect(10, 0, 14, 2), ...rect(0, 7, 4, 9),
      ...rect(11, 6, 15, 8), ...rect(5, 12, 9, 14), ...rect(1, 13, 3, 15),
      [6, 10], [7, 10], [6, 11], [7, 11],
    ]},
    { name: 'water_shine', role: 'eye', pixels: [
      [3, 1], [11, 0], [1, 7], [12, 6], [6, 12], [2, 14],
    ]},
    { name: 'reeds', role: 'accessory', pixels: [
      // Thin reed stalks poking up
      [7, 0], [7, 1], [8, 0],
      [0, 5], [0, 4],
      [15, 4], [15, 3],
      [9, 11], [9, 10],
      [13, 14], [13, 13],
    ]},
    { name: 'algae', role: 'head', pixels: [
      [6, 2], [9, 3], [1, 6], [14, 5], [3, 11], [12, 10], [7, 15], [0, 15],
    ]},
    { name: 'mud_shadow', role: 'boot', pixels: [
      [1, 4], [6, 5], [10, 4], [5, 9], [14, 9], [2, 12], [10, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 4. SNOW_TILE_16 — fresh snow ground
// Bright white snow with subtle blue shadows and small bump mounds.
// ═══════════════════════════════════════════════════════════════
export const SNOW_TILE_16: SpriteTemplate = {
  name: 'snow_tile_16', width: 16, height: 16,
  description: 'Fresh snow ground tile. White snow surface with gentle mounds and blue shadow dips.',
  regions: [
    { name: 'snow_base', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'snow_mounds', role: 'head', pixels: [
      // Slight raised mound ridges
      ...hLine(2, 2, 7), ...hLine(3, 1, 8),
      ...hLine(2, 10, 14), ...hLine(3, 9, 15),
      ...hLine(9, 0, 6), ...hLine(10, 1, 5),
      ...hLine(9, 10, 15), ...hLine(10, 11, 14),
    ]},
    { name: 'snow_shadow', role: 'leg', pixels: [
      // Blue-tinted depressions
      [0, 4], [1, 5], [2, 4], [8, 3], [9, 4], [15, 2],
      [0, 11], [15, 10], [7, 13], [8, 14], [3, 14], [4, 15],
      [12, 7], [13, 8], [6, 7], [7, 8],
    ]},
    { name: 'sparkle', role: 'eye', pixels: [
      [4, 0], [12, 1], [0, 7], [15, 6], [5, 11], [10, 12], [1, 15], [14, 14],
    ]},
    { name: 'footprint', role: 'boot', pixels: [
      [6, 5], [7, 6], [9, 8], [10, 9], [5, 13], [6, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 5. MOSSY_STONE_16 — overgrown stone tile
// Gray stone base with green moss patches spreading across surface.
// ═══════════════════════════════════════════════════════════════
export const MOSSY_STONE_16: SpriteTemplate = {
  name: 'mossy_stone_16', width: 16, height: 16,
  description: 'Overgrown stone tile. Gray stone with spreading green moss patches and damp cracks.',
  regions: [
    { name: 'stone_base', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'moss_patches', role: 'leg', pixels: [
      // Irregular moss blobs
      ...rect(0, 0, 4, 3), ...rect(1, 4, 3, 5),
      ...rect(12, 1, 15, 5), [11, 2], [11, 3],
      ...rect(5, 8, 9, 12), ...rect(4, 9, 10, 11),
      ...rect(0, 12, 3, 15), ...rect(4, 13, 5, 15),
      ...rect(12, 11, 15, 15), [11, 12], [11, 13],
    ]},
    { name: 'moss_highlight', role: 'accessory', pixels: [
      [2, 0], [1, 2], [13, 1], [14, 3], [6, 9], [8, 10], [7, 11], [1, 13], [13, 12], [14, 14],
    ]},
    { name: 'stone_highlight', role: 'head', pixels: [
      [6, 0], [10, 0], [5, 4], [8, 4], [11, 6], [3, 7], [12, 7], [5, 14], [10, 14],
    ]},
    { name: 'crack', role: 'arm', pixels: [
      [7, 0], [7, 1], [8, 2], [8, 3], [9, 4], [9, 5], [8, 6], [7, 7],
      [0, 8], [1, 8], [2, 9], [3, 9],
      [12, 8], [13, 9], [14, 9], [15, 8],
    ]},
    { name: 'damp_shadow', role: 'boot', pixels: [
      [4, 1], [3, 3], [10, 3], [6, 6], [4, 8], [11, 8], [2, 11], [12, 13], [6, 15], [9, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 6. METAL_FLOOR_16 — sci-fi metal grate floor
// Dark metal plate with bright grate lines and bolted seams.
// ═══════════════════════════════════════════════════════════════
export const METAL_FLOOR_16: SpriteTemplate = {
  name: 'metal_floor_16', width: 16, height: 16,
  description: 'Sci-fi metal grate floor tile. Dark plates with raised grate pattern and corner bolts.',
  regions: [
    { name: 'metal_plate', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'grate_lines', role: 'arm', pixels: [
      // Horizontal grate bars
      ...hLine(3, 0, 15), ...hLine(7, 0, 15), ...hLine(11, 0, 15),
      // Vertical grate bars
      ...vLine(3, 0, 15), ...vLine(7, 0, 15), ...vLine(11, 0, 15),
    ]},
    { name: 'plate_highlight', role: 'head', pixels: [
      // Top-left edges of each plate cell catching light
      [1, 0], [2, 0], [0, 1], [0, 2],
      [5, 0], [6, 0], [4, 1], [4, 2],
      [9, 0], [10, 0], [8, 1], [8, 2],
      [13, 0], [14, 0], [12, 1], [12, 2],
      [1, 4], [2, 4], [0, 5], [0, 6],
      [5, 4], [6, 4], [4, 5], [4, 6],
      [9, 4], [10, 4], [8, 5], [8, 6],
      [13, 4], [14, 4], [12, 5], [12, 6],
      [1, 8], [2, 8], [0, 9], [0, 10],
      [5, 8], [6, 8], [4, 9], [4, 10],
      [9, 8], [10, 8], [8, 9], [8, 10],
      [13, 8], [14, 8], [12, 9], [12, 10],
      [1, 12], [2, 12], [0, 13], [0, 14],
      [5, 12], [6, 12], [4, 13], [4, 14],
      [9, 12], [10, 12], [8, 13], [8, 14],
      [13, 12], [14, 12], [12, 13], [12, 14],
    ]},
    { name: 'bolts', role: 'eye', pixels: [
      [0, 0], [4, 0], [8, 0], [12, 0],
      [0, 4], [4, 4], [8, 4], [12, 4],
      [0, 8], [4, 8], [8, 8], [12, 8],
      [0, 12], [4, 12], [8, 12], [12, 12],
    ]},
    { name: 'plate_shadow', role: 'boot', pixels: [
      // Bottom-right shadow edges of plate cells
      [2, 2], [1, 2], [2, 1],
      [6, 2], [5, 2], [6, 1],
      [10, 2], [9, 2], [10, 1],
      [14, 2], [13, 2], [14, 1],
      [2, 6], [1, 6], [2, 5],
      [6, 6], [5, 6], [6, 5],
      [10, 6], [9, 6], [10, 5],
      [14, 6], [13, 6], [14, 5],
    ]},
    { name: 'grate_void', role: 'belt', pixels: [
      // Dark openings between grate lines
      [15, 3], [15, 7], [15, 11], [3, 15], [7, 15], [11, 15], [15, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 7. CLOUD_TILE_16 — sky/cloud platform
// Puffy white cloud with blue sky gaps and soft rounded edges.
// ═══════════════════════════════════════════════════════════════
export const CLOUD_TILE_16: SpriteTemplate = {
  name: 'cloud_tile_16', width: 16, height: 16,
  description: 'Sky cloud platform tile. Puffy white cloud masses on blue sky background.',
  regions: [
    { name: 'sky_bg', role: 'leg', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'cloud_mass', role: 'body', pixels: [
      // Main cloud body
      ...hLine(4, 3, 12), ...hLine(5, 2, 13), ...hLine(6, 1, 14),
      ...hLine(7, 0, 15), ...hLine(8, 0, 15), ...hLine(9, 0, 15),
      ...hLine(10, 1, 14), ...hLine(11, 2, 13), ...hLine(12, 3, 12),
      // Extra puffs on top
      ...hLine(2, 5, 8), ...hLine(1, 6, 7),
      ...hLine(2, 10, 13), ...hLine(1, 11, 12),
    ]},
    { name: 'cloud_highlight', role: 'head', pixels: [
      // Bright white top of cloud puffs
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [6, 4], [7, 4], [11, 2], [12, 2],
      [3, 4], [2, 5], [2, 6],
    ]},
    { name: 'cloud_shadow', role: 'belt', pixels: [
      // Underside shadow
      [3, 11], [4, 12], [5, 12], [11, 12], [12, 11], [12, 10],
      [2, 10], [2, 9], [13, 9], [13, 10],
    ]},
    { name: 'sky_shine', role: 'eye', pixels: [
      [0, 1], [15, 2], [0, 14], [15, 13], [7, 0], [8, 0],
    ]},
    { name: 'cloud_wisps', role: 'accessory', pixels: [
      [0, 7], [0, 8], [15, 7], [15, 8], [1, 6], [14, 6],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 8. OBSIDIAN_16 — dark volcanic glass tile
// Near-black glassy surface with sharp reflective highlights.
// ═══════════════════════════════════════════════════════════════
export const OBSIDIAN_16: SpriteTemplate = {
  name: 'obsidian_16', width: 16, height: 16,
  description: 'Dark volcanic glass tile. Near-black obsidian with sharp bright reflections and fracture lines.',
  regions: [
    { name: 'obsidian_base', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'fracture_lines', role: 'arm', pixels: [
      // Sharp diagonal cracks through the glass
      [0, 3], [1, 2], [2, 1], [3, 0],
      [4, 0], [5, 1], [6, 2], [7, 3], [8, 4], [9, 5],
      [10, 4], [11, 3], [12, 2], [13, 1], [14, 0], [15, 0],
      [0, 8], [1, 9], [2, 10], [3, 11],
      [15, 8], [14, 9], [13, 10], [12, 11],
      [5, 15], [6, 14], [7, 13], [8, 12], [9, 11], [10, 12], [11, 13], [12, 14], [13, 15],
    ]},
    { name: 'glass_reflection', role: 'head', pixels: [
      // Medium purple-blue reflection bands
      ...rect(2, 4, 5, 6), ...rect(11, 7, 14, 9),
      ...rect(3, 12, 6, 14), ...rect(9, 1, 12, 3),
    ]},
    { name: 'bright_specular', role: 'eye', pixels: [
      // Sharp white-blue specular highlights
      [3, 4], [4, 4], [12, 7], [13, 7],
      [4, 12], [5, 12], [10, 1], [11, 1],
      [0, 15], [15, 0],
    ]},
    { name: 'deep_void', role: 'boot', pixels: [
      // Deepest dark void spots
      [7, 0], [0, 7], [15, 7], [7, 15], [0, 0], [15, 15], [8, 8],
    ]},
    { name: 'mid_sheen', role: 'belt', pixels: [
      [6, 5], [7, 6], [8, 5], [9, 6],
      [6, 10], [7, 9], [5, 9], [8, 10],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 9. CORAL_REEF_16 — underwater coral ground
// Sandy seabed with colorful coral growths and seaweed.
// ═══════════════════════════════════════════════════════════════
export const CORAL_REEF_16: SpriteTemplate = {
  name: 'coral_reef_16', width: 16, height: 16,
  description: 'Underwater coral reef floor tile. Sandy seabed with colorful corals and swaying seaweed.',
  regions: [
    { name: 'seabed', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'coral_branches', role: 'accessory', pixels: [
      // Left coral cluster
      [1, 10], [1, 9], [1, 8], [0, 7], [2, 7], [1, 6], [0, 5], [2, 5],
      // Center coral
      [7, 11], [7, 10], [7, 9], [6, 8], [8, 8], [7, 7], [6, 6], [8, 6],
      // Right coral cluster
      [13, 9], [13, 8], [13, 7], [12, 6], [14, 6], [13, 5], [12, 4], [14, 4],
    ]},
    { name: 'seaweed', role: 'leg', pixels: [
      [4, 12], [4, 11], [3, 10], [4, 9], [5, 8], [4, 7], [4, 6],
      [10, 13], [11, 12], [10, 11], [11, 10], [10, 9], [11, 8],
    ]},
    { name: 'coral_tip', role: 'head', pixels: [
      [0, 5], [2, 5], [1, 4], [6, 6], [8, 6], [7, 5], [12, 4], [14, 4], [13, 3],
    ]},
    { name: 'water_shimmer', role: 'eye', pixels: [
      [5, 0], [6, 1], [10, 0], [11, 1], [2, 3], [14, 2], [0, 14], [8, 3], [15, 5],
    ]},
    { name: 'sand_grain', role: 'belt', pixels: [
      [2, 14], [3, 15], [6, 14], [7, 15], [9, 14], [12, 15], [5, 13], [11, 14], [14, 13],
    ]},
    { name: 'pebble', role: 'arm', pixels: [
      [5, 11], [9, 12], [15, 10], [0, 12], [3, 13], [13, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 10. BAMBOO_FLOOR_16 — Asian bamboo mat floor
// Woven bamboo strips in a tight grid pattern with joint dots.
// ═══════════════════════════════════════════════════════════════
export const BAMBOO_FLOOR_16: SpriteTemplate = {
  name: 'bamboo_floor_16', width: 16, height: 16,
  description: 'Woven bamboo mat floor tile. Interlocked bamboo strips with weave shadow pattern.',
  regions: [
    { name: 'bamboo_base', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'weave_over', role: 'head', pixels: [
      // Horizontal strips passing over (slightly lighter)
      ...hLine(0, 0, 15), ...hLine(1, 0, 15),
      ...hLine(4, 0, 15), ...hLine(5, 0, 15),
      ...hLine(8, 0, 15), ...hLine(9, 0, 15),
      ...hLine(12, 0, 15), ...hLine(13, 0, 15),
    ]},
    { name: 'weave_shadow', role: 'arm', pixels: [
      // Vertical strip shadows (under horizontal strips)
      [2, 0], [3, 0], [2, 1], [3, 1],
      [6, 0], [7, 0], [6, 1], [7, 1],
      [10, 0], [11, 0], [10, 1], [11, 1],
      [14, 0], [15, 0], [14, 1], [15, 1],
      [0, 4], [1, 4], [0, 5], [1, 5],
      [4, 4], [5, 4], [4, 5], [5, 5],
      [8, 4], [9, 4], [8, 5], [9, 5],
      [12, 4], [13, 4], [12, 5], [13, 5],
      [2, 8], [3, 8], [2, 9], [3, 9],
      [6, 8], [7, 8], [6, 9], [7, 9],
      [10, 8], [11, 8], [10, 9], [11, 9],
      [14, 8], [15, 8], [14, 9], [15, 9],
      [0, 12], [1, 12], [0, 13], [1, 13],
      [4, 12], [5, 12], [4, 13], [5, 13],
      [8, 12], [9, 12], [8, 13], [9, 13],
      [12, 12], [13, 12], [12, 13], [13, 13],
    ]},
    { name: 'strip_seam', role: 'belt', pixels: [
      ...hLine(2, 0, 15), ...hLine(6, 0, 15), ...hLine(10, 0, 15), ...hLine(14, 0, 15),
      ...vLine(2, 0, 15), ...vLine(6, 0, 15), ...vLine(10, 0, 15), ...vLine(14, 0, 15),
    ]},
    { name: 'knot_highlight', role: 'eye', pixels: [
      [0, 0], [4, 0], [8, 0], [12, 0],
      [0, 4], [4, 4], [8, 4], [12, 4],
      [0, 8], [4, 8], [8, 8], [12, 8],
      [0, 12], [4, 12], [8, 12], [12, 12],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 11. CARPET_RED_16 — interior red carpet tile
// Rich red carpet with woven border trim and pile texture.
// ═══════════════════════════════════════════════════════════════
export const CARPET_RED_16: SpriteTemplate = {
  name: 'carpet_red_16', width: 16, height: 16,
  description: 'Interior red carpet tile. Rich red pile with decorative gold border trim and fleur pattern.',
  regions: [
    { name: 'carpet_pile', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'border_trim', role: 'accessory', pixels: [
      // Ornate gold border ring
      ...hLine(0, 0, 15), ...hLine(1, 0, 15),
      ...hLine(14, 0, 15), ...hLine(15, 0, 15),
      ...vLine(0, 0, 15), ...vLine(1, 0, 15),
      ...vLine(14, 0, 15), ...vLine(15, 0, 15),
    ]},
    { name: 'inner_pattern', role: 'head', pixels: [
      // Central fleur-de-lis / diamond motif
      [7, 4], [8, 4], [7, 5], [8, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [5, 7], [6, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [9, 8], [10, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [7, 10], [8, 10], [7, 11], [8, 11],
    ]},
    { name: 'pattern_shine', role: 'eye', pixels: [
      [7, 4], [8, 5], [6, 7], [9, 8], [7, 10],
    ]},
    { name: 'pile_texture', role: 'arm', pixels: [
      // Subtle pile direction lines
      [3, 3], [5, 3], [10, 3], [12, 3],
      [3, 12], [5, 12], [10, 12], [12, 12],
      [2, 7], [2, 8], [13, 7], [13, 8],
    ]},
    { name: 'carpet_shadow', role: 'boot', pixels: [
      // Deep shadow in pile near borders
      [2, 2], [13, 2], [2, 13], [13, 13],
      [3, 2], [4, 2], [11, 2], [12, 2],
      [2, 3], [2, 4], [2, 11], [2, 12],
      [13, 3], [13, 4], [13, 11], [13, 12],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 12. MARBLE_FLOOR_16 — polished marble tile
// White/cream marble with dark veining and strong specular shine.
// ═══════════════════════════════════════════════════════════════
export const MARBLE_FLOOR_16: SpriteTemplate = {
  name: 'marble_floor_16', width: 16, height: 16,
  description: 'Polished marble floor tile. Cream base with dark natural veining and bright specular reflection.',
  regions: [
    { name: 'marble_base', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'veins', role: 'arm', pixels: [
      // Natural marble vein pattern
      [0, 2], [1, 2], [2, 3], [3, 3], [4, 4], [5, 4], [6, 5], [7, 5], [8, 6], [9, 6], [10, 7], [11, 7], [12, 8], [13, 8], [14, 9], [15, 9],
      [0, 10], [1, 9], [2, 9], [3, 8],
      [12, 2], [13, 2], [14, 3], [15, 3],
      [4, 12], [5, 11], [6, 11], [7, 12], [8, 13], [9, 13], [10, 14], [11, 14],
    ]},
    { name: 'vein_shadow', role: 'boot', pixels: [
      // Dark edge of veins
      [1, 3], [2, 4], [3, 4], [4, 5], [5, 5], [6, 6], [7, 6], [8, 7], [9, 7], [10, 8], [11, 8], [12, 9], [13, 9],
      [13, 3], [14, 4],
      [5, 12], [6, 12], [7, 13], [8, 14],
    ]},
    { name: 'specular', role: 'eye', pixels: [
      // Bright mirror-like reflection strip
      [14, 0], [15, 0], [15, 1],
      [0, 14], [0, 15], [1, 15],
      [6, 3], [7, 3], [3, 6],
    ]},
    { name: 'tile_seam', role: 'belt', pixels: [
      ...hLine(0, 0, 15), ...vLine(0, 0, 15),
      ...hLine(15, 0, 15), ...vLine(15, 0, 15),
    ]},
    { name: 'marble_shadow', role: 'leg', pixels: [
      [0, 15], [1, 14], [2, 14], [14, 1], [15, 2],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 13. HAY_FLOOR_16 — barn hay-covered ground
// Golden straw scattered across wooden barn floor.
// ═══════════════════════════════════════════════════════════════
export const HAY_FLOOR_16: SpriteTemplate = {
  name: 'hay_floor_16', width: 16, height: 16,
  description: 'Barn hay-covered ground tile. Loose golden straw scattered densely with visible stalk details.',
  regions: [
    { name: 'hay_base', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'straw_stalks', role: 'arm', pixels: [
      // Diagonal straw stalks in multiple directions
      [0, 0], [1, 1], [2, 2], [3, 3],
      [2, 0], [3, 1], [4, 2], [5, 3],
      [5, 0], [6, 1], [7, 2],
      [8, 0], [9, 1], [10, 2], [11, 3],
      [12, 0], [13, 1], [14, 2], [15, 3],
      [15, 1], [14, 0],
      [0, 4], [1, 5], [2, 6], [3, 7],
      [4, 4], [5, 5], [6, 6], [7, 7],
      [8, 4], [9, 5], [10, 6], [11, 7],
      [12, 4], [13, 5], [14, 6], [15, 7],
      [0, 8], [1, 9], [2, 10], [3, 11],
      [4, 8], [5, 9], [6, 10], [7, 11],
      [8, 8], [9, 9], [10, 10], [11, 11],
      [12, 8], [13, 9], [14, 10], [15, 11],
      [0, 12], [1, 13], [2, 14], [3, 15],
      [4, 12], [5, 13], [6, 14], [7, 15],
      [8, 12], [9, 13], [10, 14], [11, 15],
      [12, 12], [13, 13], [14, 14], [15, 15],
    ]},
    { name: 'straw_highlight', role: 'head', pixels: [
      [0, 1], [4, 1], [8, 1], [12, 1],
      [1, 4], [5, 4], [9, 4], [13, 4],
      [0, 9], [4, 9], [8, 9], [12, 9],
      [2, 12], [6, 12], [10, 12], [14, 12],
    ]},
    { name: 'straw_tip', role: 'eye', pixels: [
      [3, 0], [11, 0], [0, 3], [15, 0],
      [6, 3], [14, 3], [3, 6], [11, 6],
      [0, 11], [15, 8], [6, 11], [14, 8],
      [3, 14], [11, 14], [0, 15], [15, 12],
    ]},
    { name: 'hay_shadow', role: 'boot', pixels: [
      [4, 3], [12, 3], [0, 7], [8, 7], [4, 11], [12, 11], [0, 15], [8, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 14. BONE_PILE_16 — dungeon bone-littered floor
// Dark dungeon floor strewn with scattered bones and skulls.
// ═══════════════════════════════════════════════════════════════
export const BONE_PILE_16: SpriteTemplate = {
  name: 'bone_pile_16', width: 16, height: 16,
  description: 'Dungeon floor tile littered with scattered bones, skulls, and remains.',
  regions: [
    { name: 'dungeon_floor', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'bones', role: 'head', pixels: [
      // Scattered bone fragments
      // Long bones
      [1, 1], [2, 2], [3, 3], [4, 4],
      [12, 0], [13, 1], [14, 2], [15, 3],
      [0, 8], [1, 9], [2, 10],
      [13, 10], [14, 11], [15, 12],
      [3, 13], [4, 14], [5, 15],
      [10, 13], [11, 14], [12, 15],
      // Short bone bits
      [6, 6], [7, 6], [8, 6],
      [6, 8], [6, 9], [6, 10],
      [9, 7], [10, 7],
      [3, 6], [4, 6],
      [11, 4], [12, 4],
      [1, 12], [2, 12], [1, 13],
      [14, 7], [15, 7], [15, 6],
      [7, 13], [8, 13], [7, 14],
    ]},
    { name: 'skull', role: 'accessory', pixels: [
      // Small skull shapes
      [5, 1], [6, 1], [7, 0], [5, 2], [6, 2],
      [10, 11], [11, 11], [10, 12], [11, 12],
    ]},
    { name: 'eye_socket', role: 'eye', pixels: [
      [5, 2], [7, 2], [10, 12], [12, 12],
    ]},
    { name: 'bone_shadow', role: 'boot', pixels: [
      [2, 3], [4, 5], [14, 3], [11, 5],
      [1, 10], [15, 13], [4, 15], [11, 15],
      [8, 7], [9, 8],
    ]},
    { name: 'floor_crack', role: 'belt', pixels: [
      [9, 0], [10, 1], [11, 2], [12, 3],
      [0, 5], [1, 6], [2, 7],
      [14, 8], [13, 9], [12, 10],
      [8, 14], [9, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 15. CRYSTAL_FLOOR_16 — magical crystal surface
// Faceted crystal tiles with prismatic colors and sharp reflections.
// ═══════════════════════════════════════════════════════════════
export const CRYSTAL_FLOOR_16: SpriteTemplate = {
  name: 'crystal_floor_16', width: 16, height: 16,
  description: 'Magical crystal floor tile. Faceted gem-like surface with prismatic light and sharp reflections.',
  regions: [
    { name: 'crystal_base', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'facet_lines', role: 'belt', pixels: [
      // Crystal facet dividers radiating from center
      ...vLine(7, 0, 15), ...vLine(8, 0, 15),
      ...hLine(7, 0, 15), ...hLine(8, 0, 15),
      // Diagonal facets
      [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6],
      [9, 9], [10, 10], [11, 11], [12, 12], [13, 13], [14, 14], [15, 15],
      [15, 0], [14, 1], [13, 2], [12, 3], [11, 4], [10, 5], [9, 6],
      [6, 9], [5, 10], [4, 11], [3, 12], [2, 13], [1, 14], [0, 15],
    ]},
    { name: 'facet_bright', role: 'head', pixels: [
      // Bright facets (top-left of each section)
      ...rect(0, 0, 6, 6),
      ...rect(9, 0, 15, 6),
      // Remove facet line pixels (approximate — just leave the base)
    ]},
    { name: 'facet_mid', role: 'leg', pixels: [
      ...rect(0, 9, 6, 15),
      ...rect(9, 9, 15, 15),
    ]},
    { name: 'prism_shine', role: 'eye', pixels: [
      // Brightest specular dots
      [1, 1], [14, 1], [1, 14], [14, 14],
      [7, 0], [8, 0], [0, 7], [0, 8],
      [15, 7], [15, 8], [7, 15], [8, 15],
      [4, 4], [11, 4], [4, 11], [11, 11],
    ]},
    { name: 'inner_glow', role: 'accessory', pixels: [
      // Teal inner glow at center intersection
      [5, 6], [6, 5], [5, 7], [7, 5],
      [9, 6], [10, 5], [9, 7], [10, 6],
      [5, 9], [6, 10], [7, 9], [5, 10],
      [9, 9], [10, 10], [10, 9], [9, 10],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 16. ASH_GROUND_16 — post-apocalyptic ash terrain
// Gray ash covering ground with ember glow spots and char cracks.
// ═══════════════════════════════════════════════════════════════
export const ASH_GROUND_16: SpriteTemplate = {
  name: 'ash_ground_16', width: 16, height: 16,
  description: 'Post-apocalyptic ash terrain tile. Gray ash layer with glowing ember spots and charred cracks.',
  regions: [
    { name: 'ash_base', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'ash_variation', role: 'head', pixels: [
      // Lighter ash mounds and drifts
      ...hLine(1, 0, 4), ...hLine(2, 0, 5), ...hLine(1, 0, 3),
      ...hLine(1, 10, 15), ...hLine(2, 11, 14),
      ...hLine(7, 5, 10), ...hLine(8, 4, 11),
      [0, 6], [0, 7], [1, 7], [15, 4], [15, 5], [14, 5],
      [8, 14], [9, 14], [8, 15], [9, 15], [10, 15],
    ]},
    { name: 'char_cracks', role: 'boot', pixels: [
      [3, 0], [4, 1], [5, 2], [6, 3], [7, 4],
      [9, 0], [10, 1], [11, 2],
      [0, 9], [1, 10], [2, 11],
      [12, 6], [13, 7], [14, 8], [15, 9],
      [5, 13], [6, 14], [7, 15],
      [11, 12], [12, 13], [13, 14],
    ]},
    { name: 'ember_glow', role: 'accessory', pixels: [
      [6, 2], [7, 2], [6, 3], [7, 3],
      [13, 5], [14, 5], [13, 6],
      [2, 8], [3, 8], [2, 9],
      [9, 11], [10, 11], [9, 12],
      [1, 14], [2, 14], [1, 15],
      [14, 13], [15, 13], [14, 14],
    ]},
    { name: 'hot_ember', role: 'eye', pixels: [
      [7, 2], [14, 5], [3, 8], [10, 11], [2, 14], [15, 13],
    ]},
    { name: 'ash_dust', role: 'arm', pixels: [
      [1, 3], [5, 5], [11, 3], [15, 7], [0, 13], [4, 15], [13, 10], [8, 6],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 17. MUSHROOM_GROUND_16 — fungal biome floor with small mushrooms
// Dark spore-dusted earth with small mushroom caps and mycelium.
// ═══════════════════════════════════════════════════════════════
export const MUSHROOM_GROUND_16: SpriteTemplate = {
  name: 'mushroom_ground_16', width: 16, height: 16,
  description: 'Fungal biome floor tile. Dark earth with small mushroom growths and glowing mycelium veins.',
  regions: [
    { name: 'spore_earth', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'mycelium_veins', role: 'arm', pixels: [
      // Thin branching mycelium network
      [0, 4], [1, 4], [2, 3], [3, 3], [4, 4], [5, 4], [6, 5], [7, 5],
      [8, 4], [9, 3], [10, 3], [11, 4], [12, 4], [13, 5],
      [1, 8], [2, 8], [3, 7], [4, 7], [5, 8],
      [10, 7], [11, 7], [12, 8], [13, 8], [14, 7], [15, 7],
      [3, 12], [4, 12], [5, 11], [6, 11], [7, 12],
      [9, 12], [10, 11], [11, 12], [12, 12], [13, 11],
    ]},
    { name: 'mushroom_cap', role: 'accessory', pixels: [
      // Small mushroom caps scattered around
      [1, 1], [2, 1], [1, 2],
      [13, 0], [14, 0], [15, 1], [14, 1],
      [6, 7], [7, 6], [8, 6], [7, 7],
      [0, 11], [1, 10], [2, 10], [1, 11],
      [13, 13], [14, 13], [15, 12], [14, 12],
    ]},
    { name: 'mushroom_stem', role: 'belt', pixels: [
      [1, 3], [14, 2], [7, 8], [1, 12], [14, 14],
    ]},
    { name: 'spore_glow', role: 'eye', pixels: [
      // Bioluminescent spore dots
      [4, 0], [11, 1], [0, 6], [15, 5], [5, 10], [10, 9], [2, 14], [13, 15],
    ]},
    { name: 'dark_soil', role: 'boot', pixels: [
      [6, 0], [9, 0], [3, 5], [12, 6], [7, 9], [4, 13], [11, 13], [0, 15], [15, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 18. ROOT_FLOOR_16 — tree root covered ground
// Gnarled exposed roots weaving across dark earth.
// ═══════════════════════════════════════════════════════════════
export const ROOT_FLOOR_16: SpriteTemplate = {
  name: 'root_floor_16', width: 16, height: 16,
  description: 'Tree root covered ground tile. Gnarled roots weaving across dark earth with visible gaps.',
  regions: [
    { name: 'dark_earth', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'root_body', role: 'head', pixels: [
      // Main thick root running horizontally
      ...hLine(3, 0, 7), ...hLine(4, 0, 8), ...hLine(3, 9, 15), ...hLine(4, 8, 15),
      // Secondary root crossing diagonally
      ...hLine(9, 0, 5), ...hLine(10, 0, 6), ...hLine(9, 11, 15), ...hLine(10, 10, 15),
      // Thin connecting root
      [7, 5], [8, 5], [8, 6], [9, 6], [9, 7], [10, 7], [10, 8],
    ]},
    { name: 'root_highlight', role: 'accessory', pixels: [
      // Top surface of roots catching light
      ...hLine(3, 1, 6), ...hLine(3, 10, 14),
      ...hLine(9, 1, 4), ...hLine(9, 12, 14),
      [8, 5], [9, 6], [10, 7],
    ]},
    { name: 'root_shadow', role: 'boot', pixels: [
      // Underside shadow of roots
      ...hLine(5, 1, 7), ...hLine(5, 9, 14),
      ...hLine(11, 1, 5), ...hLine(11, 11, 14),
      [7, 6], [8, 7], [9, 8],
    ]},
    { name: 'earth_gap', role: 'belt', pixels: [
      // Dark earth visible between roots
      [0, 6], [1, 6], [0, 7], [1, 7],
      [0, 11], [1, 11], [0, 12], [1, 12],
      [6, 11], [6, 12], [7, 11],
      [14, 5], [15, 5], [15, 6],
    ]},
    { name: 'root_texture', role: 'arm', pixels: [
      // Bark texture lines along roots
      [2, 3], [5, 4], [11, 3], [14, 4],
      [1, 9], [4, 10], [12, 9], [15, 10],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 19. QUICKSAND_16 — dangerous quicksand tile
// Tan/orange sand with a visible swirling vortex sinkhole pattern.
// ═══════════════════════════════════════════════════════════════
export const QUICKSAND_16: SpriteTemplate = {
  name: 'quicksand_16', width: 16, height: 16,
  description: 'Dangerous quicksand tile. Sandy swirling surface with a central vortex sinkhole pattern.',
  regions: [
    { name: 'sand_surface', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'swirl_ring_outer', role: 'arm', pixels: [
      // Outermost swirl ring
      ...hLine(1, 4, 11), ...hLine(2, 3, 12), ...hLine(3, 2, 3), ...hLine(3, 12, 13),
      ...hLine(12, 2, 3), ...hLine(12, 12, 13), ...hLine(13, 3, 12),
      ...vLine(2, 4, 11), ...vLine(13, 4, 11),
    ]},
    { name: 'swirl_ring_mid', role: 'head', pixels: [
      // Middle swirl ring
      ...hLine(4, 5, 10), ...hLine(5, 4, 5), ...hLine(5, 10, 11),
      ...hLine(10, 4, 5), ...hLine(10, 10, 11), ...hLine(11, 5, 10),
      ...vLine(5, 5, 10), ...vLine(10, 5, 10),
    ]},
    { name: 'swirl_center', role: 'leg', pixels: [
      // Inner vortex center
      ...rect(6, 6, 9, 9),
    ]},
    { name: 'vortex_core', role: 'eye', pixels: [
      [7, 7], [8, 7], [7, 8], [8, 8],
    ]},
    { name: 'sand_ripple', role: 'accessory', pixels: [
      // Ripple marks radiating outward from swirl
      [0, 0], [1, 1], [14, 0], [15, 1],
      [0, 14], [1, 15], [14, 14], [15, 15],
      [0, 7], [0, 8], [15, 7], [15, 8],
    ]},
    { name: 'dark_depth', role: 'boot', pixels: [
      [6, 7], [7, 6], [9, 6], [9, 7], [9, 8], [9, 9], [8, 9], [6, 9], [6, 8],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 20. HONEYCOMB_16 — bee hive honeycomb tile
// Golden hexagonal cell pattern covering the full tile.
// ═══════════════════════════════════════════════════════════════
export const HONEYCOMB_16: SpriteTemplate = {
  name: 'honeycomb_16', width: 16, height: 16,
  description: 'Bee hive honeycomb tile. Packed hexagonal wax cells with honey glow and wax wall edges.',
  regions: [
    { name: 'hex_fill', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'wax_walls', role: 'belt', pixels: [
      // Horizontal hex dividers
      ...hLine(0, 0, 15), ...hLine(5, 0, 15), ...hLine(10, 0, 15), ...hLine(15, 0, 15),
      // Diagonal walls for hex pattern row A (rows 0-4)
      [0, 1], [0, 2], [1, 3], [1, 4],
      [4, 1], [4, 2], [3, 3], [3, 4],
      [8, 1], [8, 2], [7, 3], [7, 4],
      [12, 1], [12, 2], [11, 3], [11, 4],
      // Diagonal walls row B (rows 5-9)
      [2, 6], [2, 7], [1, 8], [1, 9],
      [6, 6], [6, 7], [5, 8], [5, 9],
      [10, 6], [10, 7], [9, 8], [9, 9],
      [14, 6], [14, 7], [13, 8], [13, 9],
      // Diagonal walls row C (rows 10-14)
      [0, 11], [0, 12], [1, 13], [1, 14],
      [4, 11], [4, 12], [3, 13], [3, 14],
      [8, 11], [8, 12], [7, 13], [7, 14],
      [12, 11], [12, 12], [11, 13], [11, 14],
    ]},
    { name: 'honey_pool', role: 'accessory', pixels: [
      // Honey filling the hex cells
      ...rect(2, 1, 3, 4), ...rect(6, 1, 7, 4),
      ...rect(10, 1, 11, 4), ...rect(14, 1, 15, 4),
      ...rect(0, 6, 1, 9), ...rect(4, 6, 5, 9),
      ...rect(8, 6, 9, 9), ...rect(12, 6, 13, 9),
      ...rect(2, 11, 3, 14), ...rect(6, 11, 7, 14),
      ...rect(10, 11, 11, 14), ...rect(14, 11, 15, 14),
    ]},
    { name: 'honey_shine', role: 'head', pixels: [
      // Top-left honey glint in each cell
      [2, 1], [6, 1], [10, 1], [14, 1],
      [0, 6], [4, 6], [8, 6], [12, 6],
      [2, 11], [6, 11], [10, 11], [14, 11],
    ]},
    { name: 'amber_glow', role: 'eye', pixels: [
      // Bright honey amber at center of large cells
      [2, 2], [6, 2], [10, 2], [14, 2],
      [0, 7], [4, 7], [8, 7], [12, 7],
      [2, 12], [6, 12], [10, 12], [14, 12],
    ]},
    { name: 'wax_shadow', role: 'boot', pixels: [
      // Dark shadow under wax walls
      ...hLine(4, 0, 15), ...hLine(9, 0, 15), ...hLine(14, 0, 15),
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// Color Schemes
// DB16: #140c1c, #442434, #30346d, #4e4a4e, #854c30, #346524,
//       #d04648, #757161, #597dce, #d27d2c, #8595a1, #6daa2c,
//       #d2aa99, #6dc2ca, #dad45e, #deeed6
// ═══════════════════════════════════════════════════════════════

export const COBBLESTONE_PATH_COLORS = scheme('cobblestone_path_default', {
  body:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
});

export const DIRT_PATH_COLORS = scheme('dirt_path_default', {
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  boot:      { shadow: '#442434', base: '#442434', highlight: '#854c30' },
  head:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
});

export const MARSH_GROUND_COLORS = scheme('marsh_ground_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  head:      { shadow: '#346524', base: '#346524', highlight: '#6daa2c' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
});

export const SNOW_TILE_COLORS = scheme('snow_tile_default', {
  body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  head:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  leg:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  boot:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#8595a1' },
});

export const MOSSY_STONE_COLORS = scheme('mossy_stone_default', {
  body:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
});

export const METAL_FLOOR_COLORS = scheme('metal_floor_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  boot:      { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
});

export const CLOUD_TILE_COLORS = scheme('cloud_tile_default', {
  body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#597dce', base: '#8595a1', highlight: '#d2aa99' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
});

export const OBSIDIAN_COLORS = scheme('obsidian_default', {
  body:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  boot:      { shadow: '#140c1c', base: '#140c1c', highlight: '#30346d' },
  belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
});

export const CORAL_REEF_COLORS = scheme('coral_reef_default', {
  body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#854c30', base: '#d2aa99', highlight: '#d2aa99' },
  arm:       { shadow: '#757161', base: '#8595a1', highlight: '#8595a1' },
});

export const BAMBOO_FLOOR_COLORS = scheme('bamboo_floor_default', {
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  head:      { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
  arm:       { shadow: '#346524', base: '#346524', highlight: '#6daa2c' },
  belt:      { shadow: '#140c1c', base: '#346524', highlight: '#346524' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
});

export const CARPET_RED_COLORS = scheme('carpet_red_default', {
  body:      { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#d04648', highlight: '#d04648' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#d04648' },
});

export const MARBLE_FLOOR_COLORS = scheme('marble_floor_default', {
  body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  leg:       { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
});

export const HAY_FLOOR_COLORS = scheme('hay_floor_default', {
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
});

export const BONE_PILE_COLORS = scheme('bone_pile_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
});

export const CRYSTAL_FLOOR_COLORS = scheme('crystal_floor_default', {
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt:      { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
  head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  leg:       { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#6dc2ca', base: '#6dc2ca', highlight: '#deeed6' },
});

export const ASH_GROUND_COLORS = scheme('ash_ground_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  head:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const MUSHROOM_GROUND_COLORS = scheme('mushroom_ground_default', {
  body:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
});

export const ROOT_FLOOR_COLORS = scheme('root_floor_default', {
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
});

export const QUICKSAND_COLORS = scheme('quicksand_default', {
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  arm:       { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
  head:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
  accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
});

export const HONEYCOMB_COLORS = scheme('honeycomb_default', {
  body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  head:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
});

export const ENVIRONMENT_VARIETY_TEMPLATES: Record<string, SpriteTemplate> = {
  cobblestone_path_16: COBBLESTONE_PATH_16,
  dirt_path_16: DIRT_PATH_16,
  marsh_ground_16: MARSH_GROUND_16,
  snow_tile_16: SNOW_TILE_16,
  mossy_stone_16: MOSSY_STONE_16,
  metal_floor_16: METAL_FLOOR_16,
  cloud_tile_16: CLOUD_TILE_16,
  obsidian_16: OBSIDIAN_16,
  coral_reef_16: CORAL_REEF_16,
  bamboo_floor_16: BAMBOO_FLOOR_16,
  carpet_red_16: CARPET_RED_16,
  marble_floor_16: MARBLE_FLOOR_16,
  hay_floor_16: HAY_FLOOR_16,
  bone_pile_16: BONE_PILE_16,
  crystal_floor_16: CRYSTAL_FLOOR_16,
  ash_ground_16: ASH_GROUND_16,
  mushroom_ground_16: MUSHROOM_GROUND_16,
  root_floor_16: ROOT_FLOOR_16,
  quicksand_16: QUICKSAND_16,
  honeycomb_16: HONEYCOMB_16,
};

export const ENVIRONMENT_VARIETY_COLOR_SCHEMES: Record<string, ColorScheme> = {
  cobblestone_path_default: COBBLESTONE_PATH_COLORS,
  dirt_path_default: DIRT_PATH_COLORS,
  marsh_ground_default: MARSH_GROUND_COLORS,
  snow_tile_default: SNOW_TILE_COLORS,
  mossy_stone_default: MOSSY_STONE_COLORS,
  metal_floor_default: METAL_FLOOR_COLORS,
  cloud_tile_default: CLOUD_TILE_COLORS,
  obsidian_default: OBSIDIAN_COLORS,
  coral_reef_default: CORAL_REEF_COLORS,
  bamboo_floor_default: BAMBOO_FLOOR_COLORS,
  carpet_red_default: CARPET_RED_COLORS,
  marble_floor_default: MARBLE_FLOOR_COLORS,
  hay_floor_default: HAY_FLOOR_COLORS,
  bone_pile_default: BONE_PILE_COLORS,
  crystal_floor_default: CRYSTAL_FLOOR_COLORS,
  ash_ground_default: ASH_GROUND_COLORS,
  mushroom_ground_default: MUSHROOM_GROUND_COLORS,
  root_floor_default: ROOT_FLOOR_COLORS,
  quicksand_default: QUICKSAND_COLORS,
  honeycomb_default: HONEYCOMB_COLORS,
};
