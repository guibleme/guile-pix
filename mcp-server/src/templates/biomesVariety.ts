/**
 * 16x16 biome environment tile/scenery templates — variety batch.
 * 20 new biome tiles distinct from biomes.ts originals.
 * All tiles are 16x16, high density (55-95%), DB16 palette only.
 *
 * Role mapping for biome tiles:
 * - 'head'      = surface features / top layer detail
 * - 'body'      = main terrain fill / ground base
 * - 'eye'       = highlights / glow / sparkle accents
 * - 'accessory' = scattered surface elements / decoration
 * - 'arm'       = texture lines / streaks / veins
 * - 'belt'      = layering / mid-depth band
 * - 'leg'       = secondary terrain / sub-surface
 * - 'boot'      = deep base / darkest floor
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

const BIOME_BASE = {
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  face:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  hand:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  belt:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#222034', highlight: '#30346d' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof BIOME_BASE>): ColorScheme {
  return { name, mapping: { ...BIOME_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. TUNDRA_16 — Frozen arctic wasteland
// Pale blue-grey permafrost with frost crust and wind-scoured patches.
// ════════════════════════════════════════════════════════════
export const TUNDRA_16: SpriteTemplate = {
  name: 'tundra_16', width: 16, height: 16,
  description: 'Frozen arctic tundra permafrost with wind-scoured frost patches and pale icy crust.',
  regions: [
    { name: 'frost_crust', role: 'head', pixels: [
      ...hLine(0, 0, 15), ...hLine(1, 0, 15), ...hLine(2, 0, 15),
      [3,3],[5,3],[9,3],[12,3],[14,3],
      [1,4],[4,4],[7,4],[10,4],[13,4],[15,4],
    ]},
    { name: 'permafrost', role: 'body', pixels: [
      ...hLine(3, 0, 15), ...hLine(4, 0, 15), ...hLine(5, 0, 15),
      ...hLine(6, 0, 15), ...hLine(7, 0, 15), ...hLine(8, 0, 15),
      ...hLine(9, 0, 15), ...hLine(10, 0, 15), ...hLine(11, 0, 15),
      ...hLine(12, 0, 15), ...hLine(13, 0, 15),
    ]},
    { name: 'dark_base', role: 'leg', pixels: [
      ...hLine(14, 0, 15), ...hLine(15, 0, 15),
    ]},
    { name: 'frost_shine', role: 'eye', pixels: [
      [2,1],[6,1],[11,1],[14,1],
      [0,2],[4,2],[8,2],[13,2],
      [3,4],[8,4],[11,4],
    ]},
    { name: 'wind_cracks', role: 'arm', pixels: [
      [1,5],[2,6],[3,7],[4,6],[5,5],
      [8,7],[9,8],[10,9],[11,8],[12,7],
      [0,10],[1,11],[2,12],[3,11],[4,10],
      [7,12],[8,13],[9,12],
      [13,10],[14,11],[15,10],
    ]},
    { name: 'pebbles', role: 'accessory', pixels: [
      [6,8],[7,9],[12,9],[13,11],[1,13],[5,13],[9,14],[14,13],
    ]},
    { name: 'shadow_patches', role: 'belt', pixels: [
      [0,6],[1,6],[2,7],[3,8],[4,8],[5,9],
      [10,6],[11,7],[12,8],[13,9],[14,9],[15,8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 2. SAVANNA_16 — Dry golden grassland
// Sun-baked earth with dry yellow-brown grass tufts.
// ════════════════════════════════════════════════════════════
export const SAVANNA_16: SpriteTemplate = {
  name: 'savanna_16', width: 16, height: 16,
  description: 'Sun-baked savanna earth with dry golden grass tufts and parched soil cracks.',
  regions: [
    { name: 'grass_tufts', role: 'head', pixels: [
      [1,0],[2,0],[3,0],[3,1],[4,0],[5,1],
      [7,0],[8,0],[9,0],[8,1],[9,1],[10,0],
      [12,0],[13,0],[14,0],[13,1],[14,1],[15,0],
      [0,4],[1,4],[1,3],[2,3],
      [5,4],[6,4],[6,3],[7,4],
      [11,3],[12,3],[12,4],[13,4],
    ]},
    { name: 'dry_earth', role: 'body', pixels: [
      ...hLine(2, 0, 15), ...hLine(5, 0, 15), ...hLine(6, 0, 15),
      ...hLine(7, 0, 15), ...hLine(8, 0, 15), ...hLine(9, 0, 15),
      ...hLine(10, 0, 15), ...hLine(11, 0, 15), ...hLine(12, 0, 15),
    ]},
    { name: 'deep_soil', role: 'leg', pixels: [
      ...hLine(13, 0, 15), ...hLine(14, 0, 15), ...hLine(15, 0, 15),
    ]},
    { name: 'sun_glint', role: 'eye', pixels: [
      [0,1],[6,0],[11,0],
      [3,3],[9,3],[14,3],
    ]},
    { name: 'soil_cracks', role: 'arm', pixels: [
      [2,6],[3,7],[4,6],
      [7,8],[8,9],[9,8],[10,9],[11,8],
      [0,11],[1,12],[2,11],
      [5,13],[6,14],[7,13],
      [12,11],[13,12],[14,11],[15,12],
      [3,14],[4,15],[5,14],
      [9,14],[10,15],[11,14],
    ]},
    { name: 'dry_patches', role: 'accessory', pixels: [
      [1,7],[5,6],[6,7],[13,6],[14,7],
      [0,9],[4,10],[8,10],[12,9],[15,10],
      [2,13],[7,12],[11,13],[15,14],
    ]},
    { name: 'mid_shade', role: 'belt', pixels: [
      ...hLine(4, 0, 15),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 3. DEEP_OCEAN_16 — Dark ocean depths
// Near-black water with faint bioluminescent dots and pressure cracks.
// ════════════════════════════════════════════════════════════
export const DEEP_OCEAN_16: SpriteTemplate = {
  name: 'deep_ocean_16', width: 16, height: 16,
  description: 'Dark ocean floor at extreme depth with bioluminescent glows and sediment layers.',
  regions: [
    { name: 'void_water', role: 'boot', pixels: [
      ...rect(0, 0, 15, 5),
    ]},
    { name: 'deep_mid', role: 'body', pixels: [
      ...rect(0, 6, 15, 11),
    ]},
    { name: 'ocean_floor', role: 'leg', pixels: [
      ...hLine(12, 0, 15), ...hLine(13, 0, 15), ...hLine(14, 0, 15), ...hLine(15, 0, 15),
    ]},
    { name: 'bioluminescence', role: 'eye', pixels: [
      [2,1],[6,2],[11,1],[14,3],
      [1,4],[8,3],[13,4],
      [3,6],[7,5],[12,6],[15,5],
      [0,8],[5,9],[10,8],[14,9],
      [4,11],[9,10],[13,11],
    ]},
    { name: 'current_lines', role: 'arm', pixels: [
      [0,2],[1,2],[2,3],[3,2],[4,2],
      [9,4],[10,5],[11,4],[12,4],
      [1,7],[2,7],[3,8],[4,7],
      [8,6],[9,7],[10,6],[11,7],[12,6],
      [0,10],[1,10],[2,11],[3,10],[4,10],
      [6,10],[7,11],[8,10],[9,11],[10,10],
    ]},
    { name: 'sediment', role: 'accessory', pixels: [
      [1,12],[3,12],[5,12],[8,12],[10,12],[12,12],[14,12],
      [0,13],[2,13],[4,13],[7,13],[9,13],[11,13],[13,13],[15,13],
      [1,14],[5,14],[6,14],[10,14],[13,14],
    ]},
    { name: 'pressure_cracks', role: 'belt', pixels: [
      [7,6],[7,7],[8,8],[9,9],[8,10],
      [3,4],[4,5],[5,4],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 4. MANGROVE_16 — Coastal mangrove roots and shallow water
// Twisted root arches emerging from murky teal water.
// ════════════════════════════════════════════════════════════
export const MANGROVE_16: SpriteTemplate = {
  name: 'mangrove_16', width: 16, height: 16,
  description: 'Coastal mangrove tile with arching prop roots emerging from shallow teal water.',
  regions: [
    { name: 'water', role: 'body', pixels: [
      ...hLine(8, 0, 15), ...hLine(9, 0, 15), ...hLine(10, 0, 15),
      ...hLine(11, 0, 15), ...hLine(12, 0, 15), ...hLine(13, 0, 15),
      ...hLine(14, 0, 15), ...hLine(15, 0, 15),
    ]},
    { name: 'roots', role: 'leg', pixels: [
      // left root arch
      [2,0],[2,1],[2,2],[3,3],[4,4],[5,5],[5,6],[5,7],
      [1,0],[1,1],[1,2],[2,3],[3,4],[4,5],[4,6],[4,7],
      // right root arch
      [11,0],[11,1],[11,2],[10,3],[9,4],[8,5],[8,6],[8,7],
      [12,0],[12,1],[12,2],[11,3],[10,4],[9,5],[9,6],[9,7],
      // center root
      [7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],
    ]},
    { name: 'canopy', role: 'head', pixels: [
      ...hLine(0, 0, 15),
    ]},
    { name: 'mud_floor', role: 'boot', pixels: [
      [0,8],[1,8],[2,8],[3,8],[6,8],[10,8],[13,8],[14,8],[15,8],
    ]},
    { name: 'water_shimmer', role: 'eye', pixels: [
      [0,9],[3,10],[6,9],[9,10],[12,9],[15,10],
      [1,12],[5,11],[8,12],[11,11],[14,12],
      [3,14],[7,13],[10,14],[13,13],
    ]},
    { name: 'water_dark', role: 'arm', pixels: [
      [2,10],[4,9],[7,10],[10,9],[13,10],
      [0,11],[6,12],[9,11],[15,11],
      [2,13],[5,12],[11,13],[14,14],
      [0,15],[4,15],[8,15],[12,15],[15,15],
    ]},
    { name: 'mud_patches', role: 'accessory', pixels: [
      [5,8],[6,8],[11,8],[12,8],
      [3,9],[4,9],[10,9],[11,9],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 5. REDWOOD_FOREST_16 — Giant tree trunk section
// Cross-section of a massive redwood trunk with bark ridges and rings.
// ════════════════════════════════════════════════════════════
export const REDWOOD_FOREST_16: SpriteTemplate = {
  name: 'redwood_forest_16', width: 16, height: 16,
  description: 'Giant redwood trunk cross-section with deep bark ridges and inner wood rings.',
  regions: [
    { name: 'bark_outer', role: 'head', pixels: [
      ...vLine(0, 0, 15), ...vLine(1, 0, 15),
      ...vLine(14, 0, 15), ...vLine(15, 0, 15),
      ...hLine(0, 0, 15), ...hLine(1, 0, 15),
      ...hLine(14, 0, 15), ...hLine(15, 0, 15),
    ]},
    { name: 'bark_mid', role: 'belt', pixels: [
      ...vLine(2, 2, 13), ...vLine(13, 2, 13),
      ...hLine(2, 2, 13), ...hLine(13, 2, 13),
    ]},
    { name: 'wood_body', role: 'body', pixels: [
      ...rect(3, 3, 12, 12),
    ]},
    { name: 'inner_ring', role: 'arm', pixels: [
      ...hLine(5, 5, 10), ...hLine(10, 5, 10),
      ...vLine(5, 5, 10), ...vLine(10, 5, 10),
    ]},
    { name: 'core', role: 'leg', pixels: [
      ...rect(6, 6, 9, 9),
    ]},
    { name: 'bark_ridges', role: 'accessory', pixels: [
      [0,3],[0,5],[0,7],[0,9],[0,11],[0,13],
      [15,3],[15,5],[15,7],[15,9],[15,11],[15,13],
      [3,0],[5,0],[7,0],[9,0],[11,0],[13,0],
      [3,15],[5,15],[7,15],[9,15],[11,15],[13,15],
    ]},
    { name: 'wood_shine', role: 'eye', pixels: [
      [4,4],[7,4],[7,7],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 6. CORAL_GARDEN_16 — Colorful underwater coral
// Vibrant coral formations on a sandy ocean floor.
// ════════════════════════════════════════════════════════════
export const CORAL_GARDEN_16: SpriteTemplate = {
  name: 'coral_garden_16', width: 16, height: 16,
  description: 'Colorful underwater coral garden with branching formations on sandy seafloor.',
  regions: [
    { name: 'water_bg', role: 'body', pixels: [
      ...rect(0, 0, 15, 8),
    ]},
    { name: 'sand_floor', role: 'leg', pixels: [
      ...hLine(9, 0, 15), ...hLine(10, 0, 15),
      ...hLine(11, 0, 15), ...hLine(12, 0, 15),
      ...hLine(13, 0, 15), ...hLine(14, 0, 15), ...hLine(15, 0, 15),
    ]},
    { name: 'coral_branches', role: 'head', pixels: [
      // left coral cluster
      [1,8],[2,7],[2,6],[3,5],[2,5],[1,5],[3,6],[1,6],
      // center coral
      [7,8],[8,7],[8,6],[8,5],[7,5],[9,5],[7,6],[9,6],[8,4],[7,4],[9,4],
      // right coral cluster
      [13,8],[12,7],[12,6],[13,5],[11,6],[12,5],[14,6],[13,6],
    ]},
    { name: 'coral_glow', role: 'eye', pixels: [
      [2,4],[3,4],[8,3],[9,3],[12,4],[13,4],
      [1,4],[7,3],[14,5],
    ]},
    { name: 'sea_anemone', role: 'accessory', pixels: [
      [5,8],[5,7],[5,6],[4,7],[6,7],[4,6],[6,6],
      [11,8],[10,7],[10,6],[11,7],[12,7],
      [15,7],[15,6],[14,7],
      [0,7],[0,6],[0,5],
    ]},
    { name: 'sand_pebbles', role: 'arm', pixels: [
      [1,10],[3,11],[5,10],[8,11],[10,10],[12,11],[14,10],
      [0,13],[2,12],[4,13],[7,12],[9,13],[11,12],[13,13],[15,12],
    ]},
    { name: 'water_dapple', role: 'belt', pixels: [
      [0,1],[3,0],[6,1],[9,0],[12,1],[15,0],
      [1,3],[5,2],[8,2],[11,3],[14,2],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 7. VOLCANIC_ASH_16 — Grey volcanic ashfield
// Dense grey ash blanket with faint sulfur tones and buried rubble.
// ════════════════════════════════════════════════════════════
export const VOLCANIC_ASH_16: SpriteTemplate = {
  name: 'volcanic_ash_16', width: 16, height: 16,
  description: 'Volcanic ashfield with deep grey ash dunes, buried rubble, and sulfurous crust.',
  regions: [
    { name: 'ash_surface', role: 'head', pixels: [
      ...hLine(0, 0, 15), ...hLine(1, 0, 15), ...hLine(2, 0, 15),
      [1,3],[4,3],[7,3],[10,3],[13,3],
      [0,4],[3,4],[6,4],[9,4],[12,4],[15,4],
    ]},
    { name: 'ash_body', role: 'body', pixels: [
      ...hLine(3, 0, 15), ...hLine(4, 0, 15), ...hLine(5, 0, 15),
      ...hLine(6, 0, 15), ...hLine(7, 0, 15), ...hLine(8, 0, 15),
      ...hLine(9, 0, 15), ...hLine(10, 0, 15),
    ]},
    { name: 'deep_ash', role: 'leg', pixels: [
      ...hLine(11, 0, 15), ...hLine(12, 0, 15), ...hLine(13, 0, 15),
      ...hLine(14, 0, 15), ...hLine(15, 0, 15),
    ]},
    { name: 'sulfur_crust', role: 'eye', pixels: [
      [3,1],[7,0],[11,1],[14,0],
      [1,2],[5,2],[9,2],[13,2],
      [2,4],[6,3],[10,4],[15,3],
    ]},
    { name: 'rubble', role: 'accessory', pixels: [
      [0,6],[1,7],[2,6],[3,7],
      [6,5],[7,6],[8,5],[9,6],[10,5],
      [12,7],[13,6],[14,7],[15,6],
      [4,9],[5,10],[6,9],
      [11,9],[12,10],[13,9],
      [1,12],[2,13],[3,12],
      [8,11],[9,12],[10,11],
      [14,12],[15,11],
    ]},
    { name: 'ash_dunes', role: 'arm', pixels: [
      [2,5],[3,6],[4,5],[5,6],[6,7],[7,8],[8,7],[9,8],[10,7],[11,8],[12,6],[13,7],[14,6],[15,7],
      [0,9],[1,10],[2,9],[3,10],[4,9],[5,11],[6,10],[7,11],[8,10],[9,11],[10,10],[11,11],[12,8],[13,9],[14,8],[15,9],
    ]},
    { name: 'ash_shadow', role: 'belt', pixels: [
      [0,8],[1,9],[5,8],[6,9],[10,8],[11,10],[14,9],[15,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 8. FAIRY_GLADE_16 — Magical glowing meadow
// Soft green meadow with luminous fairy lights and glowing flowers.
// ════════════════════════════════════════════════════════════
export const FAIRY_GLADE_16: SpriteTemplate = {
  name: 'fairy_glade_16', width: 16, height: 16,
  description: 'Enchanted fairy glade with soft glowing ground, luminous flowers, and floating motes.',
  regions: [
    { name: 'meadow_grass', role: 'body', pixels: [
      ...rect(0, 4, 15, 15),
    ]},
    { name: 'flower_stems', role: 'leg', pixels: [
      [2,3],[2,4],[3,4],
      [7,2],[7,3],[7,4],[8,4],
      [12,3],[12,4],[11,4],
      [0,5],[1,5],
      [5,5],[6,5],
      [10,5],[9,5],
      [14,4],[15,4],[14,5],[15,5],
    ]},
    { name: 'flowers', role: 'head', pixels: [
      [1,2],[2,2],[3,2],[2,1],
      [6,1],[7,1],[8,1],[7,0],
      [11,2],[12,2],[13,2],[12,1],
      [0,4],[1,3],
      [5,4],[6,4],
      [9,3],[10,3],
      [14,3],[15,3],
    ]},
    { name: 'fairy_lights', role: 'eye', pixels: [
      [0,1],[4,0],[10,0],[15,1],
      [3,3],[9,2],[14,2],
      [1,6],[5,7],[8,6],[11,7],[14,6],
      [3,9],[6,10],[10,9],[13,10],
      [0,12],[4,13],[8,12],[12,13],[15,12],
    ]},
    { name: 'glow_patches', role: 'accessory', pixels: [
      [2,6],[3,6],[4,6],[4,7],[5,6],
      [7,8],[8,8],[9,8],[8,9],
      [11,6],[12,6],[13,6],[12,7],
      [1,10],[2,10],[3,11],[2,11],
      [6,12],[7,12],[7,13],[8,12],
      [10,11],[11,11],[12,11],[11,12],
      [14,8],[15,8],[15,9],
      [0,14],[1,14],[1,15],
      [5,15],[6,15],[6,14],
      [13,14],[14,14],[14,15],
    ]},
    { name: 'dark_grass', role: 'arm', pixels: [
      [0,7],[4,8],[9,7],[13,8],[15,7],
      [2,9],[5,9],[8,10],[11,10],[14,11],
      [0,11],[3,12],[7,11],[10,12],[15,11],
      [1,13],[4,14],[9,13],[12,14],[15,13],
      [2,15],[7,15],[11,15],
    ]},
    { name: 'mushroom_spots', role: 'belt', pixels: [
      [4,10],[5,11],[6,11],
      [9,14],[10,14],[10,15],
      [13,12],[14,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 9. FROZEN_LAKE_16 — Cracked ice surface
// Blue-white lake ice with deep fracture lines and air bubbles below.
// ════════════════════════════════════════════════════════════
export const FROZEN_LAKE_16: SpriteTemplate = {
  name: 'frozen_lake_16', width: 16, height: 16,
  description: 'Frozen lake surface with deep blue crack network and trapped air bubbles beneath.',
  regions: [
    { name: 'ice_top', role: 'head', pixels: [
      ...hLine(0, 0, 15), ...hLine(1, 0, 15), ...hLine(2, 0, 15),
    ]},
    { name: 'ice_body', role: 'body', pixels: [
      ...rect(0, 3, 15, 12),
    ]},
    { name: 'ice_base', role: 'leg', pixels: [
      ...hLine(13, 0, 15), ...hLine(14, 0, 15), ...hLine(15, 0, 15),
    ]},
    { name: 'crack_network', role: 'arm', pixels: [
      // main radial crack from center-left
      [4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,10],[12,9],
      [4,5],[3,4],[2,3],[1,2],
      [4,5],[3,6],[2,7],[1,8],[0,9],
      [4,5],[5,5],[6,4],[7,3],
      // secondary cracks
      [8,3],[9,4],[10,5],[11,4],[12,3],
      [12,9],[13,10],[14,11],[15,12],
      [0,11],[1,12],[2,13],[3,12],[4,13],
      [7,12],[7,13],[8,14],[9,13],[10,14],[11,15],
      [13,6],[14,5],[15,4],
      [13,6],[13,7],[14,8],[15,9],
    ]},
    { name: 'surface_shine', role: 'eye', pixels: [
      [0,0],[3,1],[7,0],[11,1],[15,0],
      [1,1],[5,0],[9,1],[13,0],
      [2,2],[6,2],[10,2],[14,2],
      [8,5],[12,6],[4,8],[15,7],
    ]},
    { name: 'air_bubbles', role: 'accessory', pixels: [
      [2,5],[3,6],[5,9],[6,10],[9,6],[10,7],[13,5],[14,9],
      [1,10],[4,12],[7,10],[11,11],[15,10],
    ]},
    { name: 'deep_ice', role: 'belt', pixels: [
      [0,4],[1,4],[0,5],[0,6],
      [14,3],[15,3],[15,4],[15,5],
      [6,12],[7,11],[8,12],
      [3,9],[4,9],[3,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 10. CANYON_WALL_16 — Layered red rock wall
// Stratified red/orange sandstone cliff face with horizontal bands.
// ════════════════════════════════════════════════════════════
export const CANYON_WALL_16: SpriteTemplate = {
  name: 'canyon_wall_16', width: 16, height: 16,
  description: 'Stratified canyon wall with horizontal sandstone bands in red, orange, and brown.',
  regions: [
    { name: 'top_layer', role: 'head', pixels: [
      ...hLine(0, 0, 15), ...hLine(1, 0, 15), ...hLine(2, 0, 15),
    ]},
    { name: 'mid_band_a', role: 'body', pixels: [
      ...hLine(3, 0, 15), ...hLine(4, 0, 15), ...hLine(5, 0, 15), ...hLine(6, 0, 15),
    ]},
    { name: 'mid_band_b', role: 'belt', pixels: [
      ...hLine(7, 0, 15), ...hLine(8, 0, 15), ...hLine(9, 0, 15),
    ]},
    { name: 'lower_band', role: 'leg', pixels: [
      ...hLine(10, 0, 15), ...hLine(11, 0, 15), ...hLine(12, 0, 15), ...hLine(13, 0, 15),
    ]},
    { name: 'base_rock', role: 'boot', pixels: [
      ...hLine(14, 0, 15), ...hLine(15, 0, 15),
    ]},
    { name: 'strata_lines', role: 'arm', pixels: [
      [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],[14,3],[15,3],
      [0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[14,7],[15,7],
      [0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],[12,10],[13,10],[14,10],[15,10],
    ]},
    { name: 'erosion_detail', role: 'accessory', pixels: [
      [2,1],[5,2],[9,1],[13,2],
      [1,5],[4,4],[7,5],[11,4],[14,5],
      [3,8],[6,8],[9,8],[12,8],[15,8],
      [2,11],[5,12],[8,11],[11,12],[14,11],
      [1,14],[4,15],[7,14],[10,15],[13,14],
    ]},
    { name: 'rock_shine', role: 'eye', pixels: [
      [0,0],[4,1],[8,0],[12,1],
      [1,4],[6,3],[10,4],[15,3],
      [3,7],[7,6],[11,7],[14,6],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 11. CHERRY_BLOSSOM_16 — Pink petal covered ground
// Spring ground carpeted in soft pink cherry petals.
// ════════════════════════════════════════════════════════════
export const CHERRY_BLOSSOM_16: SpriteTemplate = {
  name: 'cherry_blossom_16', width: 16, height: 16,
  description: 'Spring ground blanketed in fallen cherry blossom petals with a soft green base.',
  regions: [
    { name: 'grass_base', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'petals_main', role: 'head', pixels: [
      [0,0],[1,0],[1,1],[2,0],
      [4,0],[5,0],[4,1],[5,1],[6,0],
      [8,0],[9,0],[9,1],[10,0],
      [12,0],[13,0],[13,1],[14,0],
      [0,2],[1,2],[2,2],[2,3],[3,2],
      [5,2],[6,2],[6,3],[7,2],[7,3],
      [10,2],[11,2],[11,3],[12,2],
      [14,2],[15,2],[15,3],
      [0,4],[1,4],[1,5],[2,4],
      [4,4],[5,4],[4,5],[5,5],[6,4],
      [9,4],[10,4],[9,5],[10,5],
      [13,4],[14,4],[13,5],[14,5],
      [0,6],[1,6],[2,6],[1,7],[2,7],[3,6],
      [5,6],[6,6],[7,6],[6,7],[7,7],
      [10,6],[11,6],[12,6],[11,7],[12,7],
      [14,6],[15,6],[15,7],
      [0,8],[1,8],[2,8],[2,9],[3,8],
      [5,8],[6,8],[5,9],[6,9],[7,8],
      [9,8],[10,8],[9,9],[10,9],
      [13,8],[14,8],[13,9],[14,9],
      [1,10],[2,10],[3,10],[2,11],[3,11],
      [6,10],[7,10],[8,10],[7,11],[8,11],
      [11,10],[12,10],[11,11],[12,11],
      [14,10],[15,10],[15,11],
      [0,12],[1,12],[2,12],[1,13],
      [4,12],[5,12],[6,12],[5,13],[6,13],
      [9,12],[10,12],[9,13],[10,13],
      [13,12],[14,12],[13,13],[14,13],
      [0,14],[1,14],[2,14],[2,15],[3,14],
      [5,14],[6,14],[5,15],[6,15],[7,14],
      [9,14],[10,14],[10,15],[11,14],
      [13,14],[14,14],[14,15],[15,14],
    ]},
    { name: 'petal_shadow', role: 'leg', pixels: [
      [3,1],[7,1],[11,1],[15,1],
      [3,3],[8,3],[13,3],
      [3,5],[8,5],[11,5],[15,5],
      [4,7],[9,7],[13,7],
      [4,9],[8,9],[12,9],[15,9],
      [4,11],[9,11],[13,11],
      [3,13],[8,13],[12,13],[15,13],
      [4,15],[8,15],[12,15],
    ]},
    { name: 'petal_center', role: 'eye', pixels: [
      [1,1],[5,1],[9,1],[13,1],
      [2,3],[7,3],[12,3],
      [2,5],[5,5],[10,5],[14,5],
      [2,7],[6,7],[11,7],[15,7],
      [2,9],[6,9],[10,9],[14,9],
      [2,11],[7,11],[12,11],
      [2,13],[6,13],[10,13],[14,13],
      [3,15],[7,15],[11,15],[15,15],
    ]},
    { name: 'grass_showing', role: 'accessory', pixels: [
      [3,0],[7,0],[11,0],[15,0],
      [4,2],[9,2],[14,2],
      [3,4],[8,4],[12,4],[15,4],
      [4,6],[8,6],[13,6],
      [4,8],[8,8],[12,8],
      [5,10],[9,10],[14,10],
      [4,12],[8,12],[12,12],
      [4,14],[9,14],[12,14],
    ]},
    { name: 'dark_patches', role: 'arm', pixels: [
      [0,1],[3,2],[6,1],[10,1],[14,1],
      [1,3],[5,3],[10,3],[15,3],
      [0,5],[4,5],[9,5],[13,5],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 12. TOXIC_WASTE_16 — Green radioactive ground
// Bubbling neon-green toxic sludge with glowing contamination.
// ════════════════════════════════════════════════════════════
export const TOXIC_WASTE_16: SpriteTemplate = {
  name: 'toxic_waste_16', width: 16, height: 16,
  description: 'Radioactive toxic waste ground with bubbling neon-green sludge and glowing vats.',
  regions: [
    { name: 'sludge_base', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'toxic_crust', role: 'head', pixels: [
      [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],
      [0,1],[1,1],[2,1],[3,1],[15,1],
      [0,2],[1,2],[14,2],[15,2],
      [4,2],[5,2],[9,2],[10,2],[11,2],
    ]},
    { name: 'glow_pools', role: 'eye', pixels: [
      [3,3],[4,3],[5,3],[3,4],[4,4],[5,4],[4,5],
      [10,2],[11,3],[12,3],[10,3],[11,4],[12,4],[11,5],
      [1,7],[2,7],[3,7],[1,8],[2,8],[3,8],[2,9],
      [7,6],[8,6],[9,6],[7,7],[8,7],[9,7],[8,8],
      [12,7],[13,7],[14,7],[12,8],[13,8],[14,8],[13,9],
      [4,11],[5,11],[6,11],[4,12],[5,12],[6,12],[5,13],
      [9,10],[10,10],[11,10],[9,11],[10,11],[11,11],[10,12],
      [1,13],[2,13],[3,13],[1,14],[2,14],[3,14],[2,15],
      [13,12],[14,12],[15,12],[13,13],[14,13],[15,13],[14,14],
    ]},
    { name: 'bubbles', role: 'accessory', pixels: [
      [6,2],[7,2],[8,2],
      [0,4],[1,4],[2,4],[13,4],[14,4],[15,4],
      [6,5],[7,5],[8,5],[9,5],
      [0,6],[15,6],
      [5,9],[6,9],[10,9],[11,9],
      [0,10],[1,10],[14,10],[15,10],
      [3,15],[4,15],[7,14],[8,14],[9,15],[12,15],[13,15],
    ]},
    { name: 'dark_sludge', role: 'leg', pixels: [
      [2,2],[3,2],[6,3],[9,3],[12,2],[13,2],
      [4,6],[5,6],[11,6],[14,6],
      [0,9],[1,9],[6,8],[7,8],[14,9],[15,9],
      [3,10],[4,10],[7,10],[8,10],[12,10],[13,10],
      [0,12],[1,12],[6,13],[7,13],[15,11],
      [8,13],[9,14],[10,13],[11,14],[12,14],
    ]},
    { name: 'crack_lines', role: 'arm', pixels: [
      [5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],
      [2,3],[3,5],[4,7],[5,8],[6,10],[7,11],[8,13],[9,14],[10,15],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 13. SPACE_TERRAIN_16 — Alien planet surface
// Purple-grey alien regolith with craters and alien crystal formations.
// ════════════════════════════════════════════════════════════
export const SPACE_TERRAIN_16: SpriteTemplate = {
  name: 'space_terrain_16', width: 16, height: 16,
  description: 'Alien planet surface with purple-grey regolith, impact craters, and crystal outcroppings.',
  regions: [
    { name: 'regolith', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'crater_a', role: 'head', pixels: [
      [2,2],[3,2],[4,2],[5,2],
      [1,3],[5,3],[6,3],
      [1,4],[2,4],[5,4],[6,4],
      [2,5],[3,5],[4,5],
    ]},
    { name: 'crater_b', role: 'belt', pixels: [
      [10,6],[11,6],[12,6],[13,6],
      [9,7],[13,7],[14,7],
      [9,8],[10,8],[13,8],[14,8],
      [10,9],[11,9],[12,9],
    ]},
    { name: 'crater_floor', role: 'leg', pixels: [
      [3,3],[4,3],
      [2,4],[3,4],[4,4],
      [11,7],[12,7],
      [10,8],[11,8],[12,8],
    ]},
    { name: 'crystals', role: 'accessory', pixels: [
      // crystal cluster left
      [7,0],[7,1],[7,2],[8,2],[6,1],[6,0],
      [8,0],[8,1],[9,1],[9,0],
      // crystal cluster right
      [13,10],[13,11],[13,12],[14,11],[12,11],[12,12],
      [14,10],[14,12],[15,11],
    ]},
    { name: 'alien_glow', role: 'eye', pixels: [
      [7,3],[8,3],[6,2],
      [13,9],[14,9],[12,10],
      [1,8],[2,9],[0,9],
      [4,12],[5,13],[3,13],
      [10,12],[11,13],[9,12],
      [1,14],[2,15],[0,15],
    ]},
    { name: 'dust', role: 'arm', pixels: [
      [0,0],[1,1],[3,0],[6,0],[10,0],[14,0],[15,1],
      [0,5],[1,6],[15,5],[14,6],
      [5,10],[6,11],[4,11],
      [8,13],[9,14],[7,14],
      [11,14],[12,15],[10,15],
      [15,13],[15,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 14. UNDERGROUND_RIVER_16 — Cave with flowing water stream
// Dark cave floor with central stream of blue water and wet rock edges.
// ════════════════════════════════════════════════════════════
export const UNDERGROUND_RIVER_16: SpriteTemplate = {
  name: 'underground_river_16', width: 16, height: 16,
  description: 'Underground cave with a central flowing water stream, wet stone banks, and dripping stalactite shadows.',
  regions: [
    { name: 'cave_floor', role: 'body', pixels: [
      ...rect(0, 0, 3, 15),
      ...rect(12, 0, 15, 15),
      ...hLine(0, 4, 11),
      ...hLine(1, 4, 11),
      ...hLine(14, 4, 11),
      ...hLine(15, 4, 11),
    ]},
    { name: 'river_water', role: 'leg', pixels: [
      ...rect(4, 2, 11, 13),
    ]},
    { name: 'water_surface', role: 'head', pixels: [
      ...hLine(2, 4, 11), ...hLine(3, 4, 11),
    ]},
    { name: 'water_shimmer', role: 'eye', pixels: [
      [5,3],[6,4],[7,3],[8,4],[9,3],[10,4],
      [4,6],[5,7],[6,6],[7,7],[8,6],[9,7],[10,6],[11,7],
      [5,9],[6,10],[7,9],[8,10],[9,9],[10,10],
      [4,12],[5,13],[6,12],[7,13],[8,12],[9,13],[10,12],[11,13],
    ]},
    { name: 'wet_bank', role: 'accessory', pixels: [
      [3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11],[3,12],[3,13],
      [12,2],[12,3],[12,4],[12,5],[12,6],[12,7],[12,8],[12,9],[12,10],[12,11],[12,12],[12,13],
    ]},
    { name: 'cave_dark', role: 'boot', pixels: [
      ...hLine(0, 0, 3), ...hLine(1, 0, 3),
      ...hLine(0, 12, 15), ...hLine(1, 12, 15),
      [0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],
      [15,2],[15,3],[15,4],[15,5],[15,6],[15,7],[15,8],[15,9],[15,10],[15,11],
    ]},
    { name: 'drips', role: 'arm', pixels: [
      [1,3],[1,5],[1,7],[1,9],[1,11],[1,13],
      [14,3],[14,5],[14,7],[14,9],[14,11],[14,13],
      [2,14],[13,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 15. AUTUMN_FOREST_16 — Orange/red leaf covered ground
// Forest floor blanketed in autumn leaves of orange, red, and yellow.
// ════════════════════════════════════════════════════════════
export const AUTUMN_FOREST_16: SpriteTemplate = {
  name: 'autumn_forest_16', width: 16, height: 16,
  description: 'Autumn forest floor carpeted in orange, red, and yellow fallen leaves on dark earth.',
  regions: [
    { name: 'dark_earth', role: 'boot', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'orange_leaves', role: 'body', pixels: [
      [0,0],[1,0],[2,1],[3,0],[4,0],[5,1],
      [1,2],[2,2],[3,2],[4,2],[5,2],[6,1],[7,0],[8,0],[9,1],[10,0],[11,1],[12,0],[13,0],[14,1],[15,0],
      [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,2],[7,2],[8,1],[9,2],[10,1],[11,2],[12,1],[13,2],[14,2],[15,2],
      [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,3],[7,3],[8,2],[9,3],[10,2],[11,3],[12,2],[13,3],[14,3],[15,3],
      [0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,4],[7,4],[8,3],[9,4],[10,3],[11,4],[12,3],[13,4],[14,4],[15,4],
      [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,5],[7,5],[8,4],[9,5],[10,4],[11,5],[12,4],[13,5],[14,5],[15,5],
      [0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[6,6],[7,6],[8,5],[9,6],[10,5],[11,6],[12,5],[13,6],[14,6],[15,6],
    ]},
    { name: 'red_leaves', role: 'head', pixels: [
      [0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,7],[7,7],[8,6],[9,7],[10,6],[11,7],[12,6],[13,7],[14,7],[15,7],
      [0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[6,8],[7,8],[8,7],[9,8],[10,7],[11,8],[12,7],[13,8],[14,8],[15,8],
      [0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,9],[7,9],[8,8],[9,9],[10,8],[11,9],[12,8],[13,9],[14,9],[15,9],
    ]},
    { name: 'yellow_leaves', role: 'accessory', pixels: [
      [0,11],[1,11],[2,11],[3,11],[4,11],[5,11],[6,10],[7,10],[8,9],[9,10],[10,9],[11,10],[12,9],[13,10],[14,10],[15,10],
      [0,12],[1,12],[2,12],[3,12],[4,12],[5,12],[6,11],[7,11],[8,10],[9,11],[10,10],[11,11],[12,10],[13,11],[14,11],[15,11],
    ]},
    { name: 'leaf_highlights', role: 'eye', pixels: [
      [1,1],[5,0],[10,0],[15,1],
      [3,2],[8,1],[13,1],
      [2,5],[6,4],[11,4],[15,5],
      [0,8],[5,7],[9,8],[14,8],
      [3,11],[7,10],[12,11],[15,12],
    ]},
    { name: 'leaf_shadows', role: 'leg', pixels: [
      [0,2],[4,1],[9,2],[14,2],
      [2,4],[7,3],[12,3],
      [4,6],[8,5],[13,6],
      [2,9],[6,8],[10,9],[15,9],
      ...hLine(13, 0, 15), ...hLine(14, 0, 15), ...hLine(15, 0, 15),
    ]},
    { name: 'twig', role: 'arm', pixels: [
      [6,12],[7,12],[8,11],[9,12],[10,12],[11,11],[12,12],[13,12],[14,12],[15,12],
      [6,13],[7,13],[8,12],[9,13],[10,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 16. FLOATING_ISLAND_16 — Sky island chunk with grass top
// Dirt-and-rock chunk floating in blue sky with lush grass surface.
// ════════════════════════════════════════════════════════════
export const FLOATING_ISLAND_16: SpriteTemplate = {
  name: 'floating_island_16', width: 16, height: 16,
  description: 'Floating sky island tile with lush grass top, layered earth mid, and hanging rock underside.',
  regions: [
    { name: 'sky_bg', role: 'body', pixels: [
      ...rect(0, 0, 15, 2),
      [0,3],[1,3],[2,3],
      [13,3],[14,3],[15,3],
      [0,11],[1,11],[2,12],[3,12],[4,12],[5,12],
      [10,12],[11,12],[12,12],[13,12],[14,12],[15,12],[15,11],[14,11],[13,11],
    ]},
    { name: 'grass_top', role: 'head', pixels: [
      [3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],
      [3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],
    ]},
    { name: 'earth_layer', role: 'belt', pixels: [
      [2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],
      [2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],
      [2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],
    ]},
    { name: 'rock_body', role: 'leg', pixels: [
      [3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8],[12,8],
      [4,9],[5,9],[6,9],[7,9],[8,9],[9,9],[10,9],[11,9],
      [5,10],[6,10],[7,10],[8,10],[9,10],[10,10],
    ]},
    { name: 'hanging_rocks', role: 'boot', pixels: [
      [5,11],[6,11],[7,11],[8,11],[9,11],[10,11],
      [6,12],[7,12],[8,12],[9,12],
      [7,13],[8,13],
      [6,13],[9,13],
      [5,14],[10,14],
      [7,14],[8,14],
    ]},
    { name: 'grass_detail', role: 'accessory', pixels: [
      [3,2],[5,1],[7,2],[9,1],[11,2],[13,2],
      [4,3],[6,2],[8,3],[10,2],[12,3],
    ]},
    { name: 'earth_roots', role: 'arm', pixels: [
      [2,8],[13,8],[3,9],[12,9],[4,10],[11,10],
    ]},
    { name: 'rock_shine', role: 'eye', pixels: [
      [5,8],[8,9],[10,8],
      [6,10],[9,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 17. NETHER_FLOOR_16 — Hell/nether cracked red floor
// Dark red netherrack with glowing magma seeping through deep cracks.
// ════════════════════════════════════════════════════════════
export const NETHER_FLOOR_16: SpriteTemplate = {
  name: 'nether_floor_16', width: 16, height: 16,
  description: 'Nether/hell floor of dark red cracked netherrack with glowing magma seeping through fissures.',
  regions: [
    { name: 'nether_rock', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'rock_surface', role: 'head', pixels: [
      [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],
      [0,1],[1,1],[2,1],[15,1],
      [0,2],[1,2],[14,2],[15,2],
    ]},
    { name: 'magma_cracks', role: 'eye', pixels: [
      // main diagonal crack
      [3,2],[4,3],[5,4],[6,5],[7,6],[8,7],[9,8],[10,9],[11,10],[12,11],[13,12],[14,13],[15,14],
      // branch crack left
      [3,2],[2,3],[1,4],[0,5],
      [4,3],[3,4],[2,5],[1,6],[0,7],
      // branch crack right
      [10,9],[11,8],[12,7],[13,6],[14,5],[15,4],
      [9,8],[10,7],[11,6],[12,5],[13,4],[14,3],[15,2],
      // secondary cracks
      [0,10],[1,11],[2,12],[3,13],[4,14],[5,15],
      [11,11],[12,12],[13,13],[14,14],[15,15],
      [6,13],[7,14],[8,15],
    ]},
    { name: 'dark_rock', role: 'leg', pixels: [
      [2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[10,10],[11,11],[12,12],[13,13],[14,14],
      [1,3],[2,4],[3,5],[4,6],[5,7],[6,8],[7,9],[8,10],[9,11],[10,12],[11,13],[12,14],[13,15],
    ]},
    { name: 'red_patches', role: 'accessory', pixels: [
      [5,1],[6,2],[7,1],[8,2],[9,1],[10,2],[11,1],[12,2],[13,1],
      [3,6],[4,7],[2,7],[5,8],[3,9],[4,10],[2,11],
      [12,3],[13,4],[11,4],[14,5],[12,6],[13,7],[11,7],
      [6,10],[7,11],[5,11],[6,12],[7,13],[5,14],
      [10,13],[11,14],[9,14],[10,15],[9,15],
    ]},
    { name: 'rock_texture', role: 'arm', pixels: [
      [0,3],[1,2],[5,2],[8,1],[9,3],[13,2],[15,3],
      [0,6],[1,5],[4,5],[8,4],[11,3],[15,5],
      [0,9],[2,8],[6,7],[9,6],[12,4],[15,7],
      [0,12],[2,11],[5,10],[8,9],[11,8],[14,6],[15,10],
      [0,15],[3,14],[6,14],[9,12],[12,10],[15,12],
    ]},
    { name: 'deep_shadow', role: 'boot', pixels: [
      [1,4],[2,5],[3,6],[4,7],[5,8],[6,9],[7,10],[8,11],[9,12],[10,13],[11,14],[12,15],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 18. MUSHROOM_BIOME_16 — Giant mushroom forest floor
// Spore-dusted purple floor beneath giant mushroom stalks.
// ════════════════════════════════════════════════════════════
export const MUSHROOM_BIOME_16: SpriteTemplate = {
  name: 'mushroom_biome_16', width: 16, height: 16,
  description: 'Giant mushroom forest floor with purple spore-dusted earth and tiny mushroom clusters.',
  regions: [
    { name: 'spore_floor', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'mushroom_stalks', role: 'leg', pixels: [
      // left stalk
      [1,0],[2,0],[1,1],[2,1],[1,2],[2,2],[1,3],[2,3],
      // center stalk
      [7,0],[8,0],[7,1],[8,1],[7,2],[8,2],[7,3],[8,3],
      // right stalk
      [13,0],[14,0],[13,1],[14,1],[13,2],[14,2],[13,3],[14,3],
    ]},
    { name: 'small_mushrooms', role: 'head', pixels: [
      // cluster a
      [4,5],[5,5],[4,6],[5,6],[4,7],[5,7],[3,7],[6,7],
      [3,5],[3,6],[6,5],[6,6],
      // cluster b
      [10,9],[11,9],[10,10],[11,10],[10,11],[11,11],[9,11],[12,11],
      [9,9],[9,10],[12,9],[12,10],
      // single small
      [0,10],[1,10],[0,11],[1,11],
      [14,4],[15,4],[14,5],[15,5],
    ]},
    { name: 'spore_glow', role: 'eye', pixels: [
      [0,4],[3,3],[6,4],[9,4],[12,3],[15,4],
      [1,7],[4,8],[7,7],[10,7],[13,7],[15,7],
      [2,11],[5,12],[8,11],[11,12],[14,11],
      [0,14],[3,15],[7,14],[10,14],[13,15],
    ]},
    { name: 'cap_shadow', role: 'accessory', pixels: [
      // spot dusting on floor
      [0,5],[1,5],[2,5],[1,6],[2,6],
      [6,3],[7,3],[6,4],[7,4],
      [12,5],[13,5],[11,5],[11,6],[12,6],
      [0,8],[1,8],[0,9],[1,9],
      [4,9],[5,9],[5,10],[6,10],[4,10],
      [9,13],[10,13],[9,14],[10,14],
      [13,12],[14,12],[13,13],[14,13],
      [2,13],[3,13],[2,14],[3,14],
      [6,14],[7,15],[8,14],[7,13],
    ]},
    { name: 'mycelium', role: 'arm', pixels: [
      [3,4],[4,4],[5,4],[6,5],
      [8,5],[9,5],[10,5],[11,5],[10,6],[9,7],[8,8],
      [2,8],[3,9],[4,10],[5,11],
      [12,8],[13,9],[14,10],[15,11],
      [1,12],[2,13],[3,14],[4,15],
      [11,13],[12,14],[13,15],
    ]},
    { name: 'dark_base', role: 'belt', pixels: [
      [0,2],[0,3],[15,2],[15,3],
      [5,0],[6,0],[9,0],[10,0],[11,0],[12,0],[15,0],
      [3,0],[4,0],
      [0,12],[0,13],[0,15],[15,12],[15,13],[15,15],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 19. GLACIER_16 — Blue-white glacial ice
// Deep blue-white glacial ice mass with internal light refraction.
// ════════════════════════════════════════════════════════════
export const GLACIER_16: SpriteTemplate = {
  name: 'glacier_16', width: 16, height: 16,
  description: 'Glacial ice tile with deep blue-white layers, internal light refraction veins, and surface compression cracks.',
  regions: [
    { name: 'surface_ice', role: 'head', pixels: [
      ...hLine(0, 0, 15), ...hLine(1, 0, 15), ...hLine(2, 0, 15),
      [3,3],[5,3],[8,3],[11,3],[13,3],
      [1,4],[4,4],[7,4],[10,4],[14,4],
    ]},
    { name: 'mid_ice', role: 'body', pixels: [
      ...hLine(3, 0, 15), ...hLine(4, 0, 15), ...hLine(5, 0, 15),
      ...hLine(6, 0, 15), ...hLine(7, 0, 15), ...hLine(8, 0, 15),
    ]},
    { name: 'deep_ice', role: 'belt', pixels: [
      ...hLine(9, 0, 15), ...hLine(10, 0, 15), ...hLine(11, 0, 15),
    ]},
    { name: 'ice_base', role: 'leg', pixels: [
      ...hLine(12, 0, 15), ...hLine(13, 0, 15), ...hLine(14, 0, 15), ...hLine(15, 0, 15),
    ]},
    { name: 'refraction_veins', role: 'eye', pixels: [
      [2,1],[4,2],[6,1],[8,2],[10,1],[12,2],[14,1],
      [1,3],[3,4],[5,3],[7,4],[9,3],[11,4],[13,3],[15,4],
      [0,6],[2,5],[4,6],[6,5],[8,6],[10,5],[12,6],[14,5],
      [1,7],[3,8],[5,7],[7,8],[9,7],[11,8],[13,7],[15,8],
      [0,10],[2,9],[4,10],[6,9],[8,10],[10,9],[12,10],[14,9],
      [1,11],[3,12],[5,11],[7,12],[9,11],[11,12],[13,11],[15,12],
    ]},
    { name: 'compression_cracks', role: 'arm', pixels: [
      [0,5],[1,6],[2,7],[3,6],[4,5],
      [7,3],[8,4],[9,5],[10,4],[11,3],
      [5,9],[6,10],[7,11],[8,10],[9,9],
      [12,8],[13,9],[14,10],[15,9],
      [0,12],[1,13],[2,14],[3,13],[4,12],
      [7,13],[8,14],[9,15],[10,14],[11,13],
    ]},
    { name: 'ice_shine', role: 'accessory', pixels: [
      [0,0],[3,0],[6,0],[9,0],[12,0],[15,0],
      [1,2],[5,2],[9,2],[13,2],
      [2,4],[6,4],[10,4],[14,4],
      [3,7],[7,6],[11,7],[15,6],
      [4,11],[8,12],[12,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 20. DEAD_WASTELAND_16 — Barren cracked dry earth
// Sunbaked completely barren earth with deep wide crack network.
// ════════════════════════════════════════════════════════════
export const DEAD_WASTELAND_16: SpriteTemplate = {
  name: 'dead_wasteland_16', width: 16, height: 16,
  description: 'Utterly barren wasteland of sun-baked cracked earth with deep wide fractures and dust.',
  regions: [
    { name: 'dry_earth', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'surface_crust', role: 'head', pixels: [
      // polygonal cracked plates
      ...rect(1, 1, 5, 4),
      ...rect(7, 0, 11, 4),
      ...rect(13, 1, 15, 4),
      ...rect(0, 6, 4, 9),
      ...rect(6, 6, 10, 9),
      ...rect(12, 6, 15, 9),
      ...rect(1, 11, 5, 14),
      ...rect(7, 11, 11, 14),
      ...rect(13, 11, 15, 14),
    ]},
    { name: 'crack_gaps', role: 'boot', pixels: [
      // horizontal major cracks
      ...hLine(0, 0, 15),
      ...hLine(5, 0, 15),
      ...hLine(10, 0, 15),
      ...hLine(15, 0, 15),
      // vertical major cracks
      ...vLine(0, 0, 15),
      ...vLine(6, 0, 15),
      ...vLine(12, 0, 15),
    ]},
    { name: 'deep_cracks', role: 'leg', pixels: [
      // inner plate cracks
      [2,2],[3,3],[4,2],[5,3],
      [8,1],[9,2],[10,1],[11,2],
      [14,2],[15,3],[14,3],
      [1,7],[2,8],[3,7],[4,8],
      [7,7],[8,8],[9,7],[10,8],
      [13,7],[14,8],[15,7],
      [2,12],[3,13],[4,12],[5,13],
      [8,12],[9,13],[10,12],[11,13],
      [14,12],[15,13],
    ]},
    { name: 'dust', role: 'accessory', pixels: [
      [3,1],[4,4],[8,2],[9,4],[14,1],[15,4],
      [1,6],[5,9],[7,6],[11,9],[13,6],
      [2,11],[5,14],[8,11],[11,14],[13,11],[15,14],
    ]},
    { name: 'crack_shadow', role: 'arm', pixels: [
      [1,0],[2,1],[3,0],[4,1],[5,0],
      [7,0],[8,1],[9,0],[10,1],[11,0],
      [13,0],[14,1],[15,0],
      [0,1],[0,2],[0,3],[0,4],
      [6,1],[6,2],[6,3],[6,4],
      [12,1],[12,2],[12,3],[12,4],
      [1,5],[2,5],[3,5],[4,5],[5,5],
      [7,5],[8,5],[9,5],[10,5],[11,5],
      [13,5],[14,5],[15,5],
      [0,6],[0,7],[0,8],[0,9],
      [6,6],[6,7],[6,8],[6,9],
      [12,6],[12,7],[12,8],[12,9],
      [1,10],[2,10],[3,10],[4,10],[5,10],
      [7,10],[8,10],[9,10],[10,10],[11,10],
      [13,10],[14,10],[15,10],
      [0,11],[0,12],[0,13],[0,14],
      [6,11],[6,12],[6,13],[6,14],
      [12,11],[12,12],[12,13],[12,14],
    ]},
    { name: 'plate_highlight', role: 'eye', pixels: [
      [1,1],[7,0],[13,1],
      [0,6],[6,6],[12,6],
      [1,11],[7,11],[13,11],
      [3,4],[9,4],[14,4],
      [3,9],[9,9],[14,9],
      [3,14],[9,14],[14,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// COLOR SCHEMES — DB16 palette, biome-appropriate
// DB16: #140c1c #442434 #30346d #4e4a4e #854c30 #346524 #d04648 #757161
//       #597dce #d27d2c #8595a1 #6daa2c #d2aa99 #6dc2ca #dad45e #deeed6
// ════════════════════════════════════════════════════════════

export const TUNDRA_COLORS = scheme('tundra_default', {
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  body:      { shadow: '#597dce', base: '#8595a1', highlight: '#d2aa99' },
  leg:       { shadow: '#30346d', base: '#4e4a4e', highlight: '#8595a1' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  belt:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#597dce' },
});

export const SAVANNA_COLORS = scheme('savanna_default', {
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#d27d2c', highlight: '#dad45e' },
});

export const DEEP_OCEAN_COLORS = scheme('deep_ocean_default', {
  boot:      { shadow: '#140c1c', base: '#222034', highlight: '#30346d' },
  body:      { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
  leg:       { shadow: '#30346d', base: '#4e4a4e', highlight: '#597dce' },
  eye:       { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  arm:       { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#30346d' },
});

export const MANGROVE_COLORS = scheme('mangrove_default', {
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#854c30' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
  accessory: { shadow: '#346524', base: '#4e4a4e', highlight: '#757161' },
});

export const REDWOOD_FOREST_COLORS = scheme('redwood_forest_default', {
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#854c30' },
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  accessory: { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
});

export const CORAL_GARDEN_COLORS = scheme('coral_garden_default', {
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  leg:       { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },
  belt:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
});

export const VOLCANIC_ASH_COLORS = scheme('volcanic_ash_default', {
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  body:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const FAIRY_GLADE_COLORS = scheme('fairy_glade_default', {
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  leg:       { shadow: '#346524', base: '#4e4a4e', highlight: '#6daa2c' },
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  arm:       { shadow: '#346524', base: '#4e4a4e', highlight: '#6daa2c' },
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
});

export const FROZEN_LAKE_COLORS = scheme('frozen_lake_default', {
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm:       { shadow: '#30346d', base: '#4e4a4e', highlight: '#597dce' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#597dce', base: '#8595a1', highlight: '#deeed6' },
  belt:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
});

export const CANYON_WALL_COLORS = scheme('canyon_wall_default', {
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#d2aa99' },
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  arm:       { shadow: '#442434', base: '#4e4a4e', highlight: '#854c30' },
  accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  eye:       { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
});

export const CHERRY_BLOSSOM_COLORS = scheme('cherry_blossom_default', {
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  head:      { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' },
  leg:       { shadow: '#d04648', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#d04648', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
});

export const TOXIC_WASTE_COLORS = scheme('toxic_waste_default', {
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#6daa2c' },
  eye:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  leg:       { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },
  arm:       { shadow: '#346524', base: '#4e4a4e', highlight: '#6daa2c' },
  boot:      { shadow: '#140c1c', base: '#346524', highlight: '#4e4a4e' },
});

export const SPACE_TERRAIN_COLORS = scheme('space_terrain_default', {
  body:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  belt:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
  accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
});

export const UNDERGROUND_RIVER_COLORS = scheme('underground_river_default', {
  body:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  boot:      { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
});

export const AUTUMN_FOREST_COLORS = scheme('autumn_forest_default', {
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  head:      { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
  accessory: { shadow: '#854c30', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
});

export const FLOATING_ISLAND_COLORS = scheme('floating_island_default', {
  body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
});

export const NETHER_FLOOR_COLORS = scheme('nether_floor_default', {
  body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#d2aa99' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#d04648' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  arm:       { shadow: '#442434', base: '#4e4a4e', highlight: '#d04648' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
});

export const MUSHROOM_BIOME_COLORS = scheme('mushroom_biome_default', {
  body:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  accessory: { shadow: '#442434', base: '#4e4a4e', highlight: '#597dce' },
  arm:       { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
  belt:      { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
});

export const GLACIER_COLORS = scheme('glacier_default', {
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  body:      { shadow: '#6dc2ca', base: '#8595a1', highlight: '#d2aa99' },
  belt:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#8595a1' },
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#30346d', base: '#4e4a4e', highlight: '#597dce' },
  accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
});

export const DEAD_WASTELAND_COLORS = scheme('dead_wasteland_default', {
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  head:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// EXPORTS
// ════════════════════════════════════════════════════════════

export const BIOME_VARIETY_TEMPLATES: Record<string, SpriteTemplate> = {
  tundra_16: TUNDRA_16,
  savanna_16: SAVANNA_16,
  deep_ocean_16: DEEP_OCEAN_16,
  mangrove_16: MANGROVE_16,
  redwood_forest_16: REDWOOD_FOREST_16,
  coral_garden_16: CORAL_GARDEN_16,
  volcanic_ash_16: VOLCANIC_ASH_16,
  fairy_glade_16: FAIRY_GLADE_16,
  frozen_lake_16: FROZEN_LAKE_16,
  canyon_wall_16: CANYON_WALL_16,
  cherry_blossom_16: CHERRY_BLOSSOM_16,
  toxic_waste_16: TOXIC_WASTE_16,
  space_terrain_16: SPACE_TERRAIN_16,
  underground_river_16: UNDERGROUND_RIVER_16,
  autumn_forest_16: AUTUMN_FOREST_16,
  floating_island_16: FLOATING_ISLAND_16,
  nether_floor_16: NETHER_FLOOR_16,
  mushroom_biome_16: MUSHROOM_BIOME_16,
  glacier_16: GLACIER_16,
  dead_wasteland_16: DEAD_WASTELAND_16,
};

export const BIOME_VARIETY_COLOR_SCHEMES: Record<string, ColorScheme> = {
  tundra_default: TUNDRA_COLORS,
  savanna_default: SAVANNA_COLORS,
  deep_ocean_default: DEEP_OCEAN_COLORS,
  mangrove_default: MANGROVE_COLORS,
  redwood_forest_default: REDWOOD_FOREST_COLORS,
  coral_garden_default: CORAL_GARDEN_COLORS,
  volcanic_ash_default: VOLCANIC_ASH_COLORS,
  fairy_glade_default: FAIRY_GLADE_COLORS,
  frozen_lake_default: FROZEN_LAKE_COLORS,
  canyon_wall_default: CANYON_WALL_COLORS,
  cherry_blossom_default: CHERRY_BLOSSOM_COLORS,
  toxic_waste_default: TOXIC_WASTE_COLORS,
  space_terrain_default: SPACE_TERRAIN_COLORS,
  underground_river_default: UNDERGROUND_RIVER_COLORS,
  autumn_forest_default: AUTUMN_FOREST_COLORS,
  floating_island_default: FLOATING_ISLAND_COLORS,
  nether_floor_default: NETHER_FLOOR_COLORS,
  mushroom_biome_default: MUSHROOM_BIOME_COLORS,
  glacier_default: GLACIER_COLORS,
  dead_wasteland_default: DEAD_WASTELAND_COLORS,
};
