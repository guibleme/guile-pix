/**
 * 16x16 RPG prop/decoration templates for roguelike and dungeon games.
 * Each template defines pixel regions by functional part, repurposing
 * humanoid roles for prop anatomy:
 *
 *   'body'      = main material / surface
 *   'head'      = top section / cap / roof
 *   'accessory' = detail / decoration / accent
 *   'eye'       = bright accent / glow
 *   'belt'      = middle section / band
 *   'leg'       = support structure / base pillars
 *   'arm'       = thin structural element / posts
 *   'boot'      = base / ground level
 *
 * All coordinates are within the [0, 15] range for 16x16 sprites.
 * Pixel counts noted per template for density reference.
 * DB16 palette used throughout.
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// BARREL_16 - Wooden barrel front view. Round-ish body with
//             metal bands, planks, flat top with opening. ~92 pixels.
// ═══════════════════════════════════════════════════════════════
export const BARREL_16: SpriteTemplate = {
  name: 'barrel_16',
  width: 16,
  height: 16,
  description: 'Front-facing wooden barrel with round body, two metal bands, visible plank lines, and flat top with small opening.',
  regions: [
    // Top rim / cap (rows 2-3)
    { name: 'top_rim', role: 'head', pixels: [
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
    ]},
    // Opening on top
    { name: 'opening', role: 'eye', pixels: [
      [7, 2], [8, 2],
    ]},
    // Upper barrel body (rows 4-5)
    { name: 'body_upper', role: 'body', pixels: [
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
    ]},
    // Upper metal band (row 6)
    { name: 'band_upper', role: 'belt', pixels: [
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
    ]},
    // Middle barrel body (rows 7-9, widest section)
    { name: 'body_mid', role: 'body', pixels: [
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
    ]},
    // Plank lines (vertical lines across body for wood grain)
    { name: 'plank_lines', role: 'accessory', pixels: [
      [6, 4], [6, 5], [6, 7], [6, 8], [6, 9],
      [9, 4], [9, 5], [9, 7], [9, 8], [9, 9],
    ]},
    // Lower metal band (row 10)
    { name: 'band_lower', role: 'belt', pixels: [
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
    ]},
    // Lower barrel body (rows 11-12)
    { name: 'body_lower', role: 'body', pixels: [
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ]},
    // Base (row 13)
    { name: 'base', role: 'boot', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CRATE_16 - Wooden shipping crate. Boxy shape with X-nailed
//            planks and metal corner brackets. ~96 pixels.
// ═══════════════════════════════════════════════════════════════
export const CRATE_16: SpriteTemplate = {
  name: 'crate_16',
  width: 16,
  height: 16,
  description: 'Front-facing wooden shipping crate with X-nailed planks on front face and metal corner brackets.',
  regions: [
    // Top edge / lid (row 3)
    { name: 'lid', role: 'head', pixels: [
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
    ]},
    // Main crate body (rows 4-12, 10px wide)
    { name: 'crate_body', role: 'body', pixels: [
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
    ]},
    // X-plank cross nailed on face (diagonals)
    { name: 'x_planks', role: 'accessory', pixels: [
      // Top-left to bottom-right diagonal
      [4, 5], [5, 6], [6, 7], [7, 8], [8, 8], [9, 9], [10, 10], [11, 11],
      // Top-right to bottom-left diagonal
      [11, 5], [10, 6], [9, 7], [6, 9], [5, 10], [4, 11],
    ]},
    // Center nail
    { name: 'nail', role: 'eye', pixels: [
      [7, 8], [8, 8],
    ]},
    // Metal corner brackets (2px L-shapes at corners)
    { name: 'brackets', role: 'belt', pixels: [
      // Top-left bracket
      [3, 4], [4, 4], [3, 5],
      // Top-right bracket
      [11, 4], [12, 4], [12, 5],
      // Bottom-left bracket
      [3, 11], [3, 12], [4, 12],
      // Bottom-right bracket
      [12, 11], [11, 12], [12, 12],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// TORCH_WALL_16 - Wall-mounted torch. Metal bracket, wooden
//                 handle, flame at top. ~62 pixels.
// ═══════════════════════════════════════════════════════════════
export const TORCH_WALL_16: SpriteTemplate = {
  name: 'torch_wall_16',
  width: 16,
  height: 16,
  description: 'Wall-mounted torch with metal bracket on right side, wooden handle, and bright flame at top.',
  regions: [
    // Flame tip (row 0)
    { name: 'flame_tip', role: 'eye', pixels: [
      [7, 0], [8, 0],
    ]},
    // Flame body (rows 1-3) - bright yellow/orange
    { name: 'flame_body', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
    ]},
    // Torch handle - wooden (rows 4-10, 2px wide)
    { name: 'handle', role: 'body', pixels: [
      [7, 4], [8, 4],
      [7, 5], [8, 5],
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
    ]},
    // Metal bracket arm (rows 6-10, extends right from handle)
    { name: 'bracket_arm', role: 'arm', pixels: [
      [9, 6], [10, 6],
      [9, 7], [10, 7], [11, 7],
      [10, 8], [11, 8], [12, 8],
      [9, 9], [10, 9], [11, 9],
      [9, 10], [10, 10],
    ]},
    // Bracket wall plate (rows 6-10, right side)
    { name: 'wall_plate', role: 'belt', pixels: [
      [12, 6], [13, 6],
      [12, 7], [13, 7],
      [13, 8],
      [12, 9], [13, 9],
      [12, 10], [13, 10],
    ]},
    // Ember glow around base of flame
    { name: 'ember_glow', role: 'accessory', pixels: [
      [5, 3], [10, 3],
    ]},
    // Handle base cap
    { name: 'base_cap', role: 'boot', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BANNER_16 - Tall banner/flag on pole. Pole on left, cloth
//             hanging right with heraldic stripe. ~100 pixels.
// ═══════════════════════════════════════════════════════════════
export const BANNER_16: SpriteTemplate = {
  name: 'banner_16',
  width: 16,
  height: 16,
  description: 'Tall banner on a pole with finial. Pole on left side, rectangular cloth hanging right with heraldic stripe detail.',
  regions: [
    // Pole finial / top ornament (rows 0-1)
    { name: 'finial', role: 'eye', pixels: [
      [3, 0], [4, 0],
      [3, 1], [4, 1],
    ]},
    // Pole shaft (rows 2-15, 2px wide)
    { name: 'pole', role: 'arm', pixels: [
      [3, 2], [4, 2],
      [3, 3], [4, 3],
      [3, 4], [4, 4],
      [3, 5], [4, 5],
      [3, 6], [4, 6],
      [3, 7], [4, 7],
      [3, 8], [4, 8],
      [3, 9], [4, 9],
      [3, 10], [4, 10],
      [3, 11], [4, 11],
      [3, 12], [4, 12],
      [3, 13], [4, 13],
      [3, 14], [4, 14],
      [3, 15], [4, 15],
    ]},
    // Cloth main body (rows 2-12, hangs from pole)
    { name: 'cloth', role: 'body', pixels: [
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Heraldic stripe (vertical stripe through center of cloth)
    { name: 'stripe', role: 'accessory', pixels: [
      [8, 2], [9, 2],
      [8, 3], [9, 3],
      [8, 4], [9, 4],
      [8, 5], [9, 5],
      [8, 6], [9, 6],
      [8, 7], [9, 7],
      [8, 8], [9, 8],
      [8, 9],
    ]},
    // Cloth bottom fringe / tattered edge (rows 11-12)
    { name: 'fringe', role: 'belt', pixels: [
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12],
    ]},
    // Pole base on ground
    { name: 'ground_base', role: 'boot', pixels: [
      [2, 15], [3, 15], [4, 15], [5, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// STATUE_16 - Small stone statue on pedestal. Simplified
//             humanoid figure on square base. ~110 pixels.
// ═══════════════════════════════════════════════════════════════
export const STATUE_16: SpriteTemplate = {
  name: 'statue_16',
  width: 16,
  height: 16,
  description: 'Small stone statue of a humanoid figure on a square pedestal. Arms at sides, simplified features.',
  regions: [
    // Head crown/top (row 1)
    { name: 'statue_crown', role: 'accessory', pixels: [
      [7, 1], [8, 1],
    ]},
    // Head (rows 2-4, round-ish)
    { name: 'statue_head', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    // Face detail (eye dots on statue)
    { name: 'face_detail', role: 'eye', pixels: [
      [7, 3], [8, 3],
    ]},
    // Body / torso (rows 5-8, wider)
    { name: 'statue_body', role: 'body', pixels: [
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    ]},
    // Arms at sides (rows 5-8, 2px wide each)
    { name: 'statue_arms', role: 'arm', pixels: [
      [3, 5], [4, 5],    [11, 5], [12, 5],
      [3, 6], [4, 6],    [11, 6], [12, 6],
      [3, 7], [4, 7],    [11, 7], [12, 7],
      [3, 8], [4, 8],    [11, 8], [12, 8],
    ]},
    // Belt / waist sash detail (row 7)
    { name: 'sash', role: 'belt', pixels: [
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
    ]},
    // Legs (rows 9-11)
    { name: 'statue_legs', role: 'leg', pixels: [
      [5, 9], [6, 9], [7, 9],    [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10],  [8, 10], [9, 10], [10, 10],
      [6, 11], [7, 11],           [8, 11], [9, 11],
    ]},
    // Pedestal top (row 12) - slightly wider
    { name: 'pedestal_top', role: 'accessory', pixels: [
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
    ]},
    // Pedestal body (rows 13-15)
    { name: 'pedestal', role: 'boot', pixels: [
      [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
      [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14],
      [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CRYSTAL_CLUSTER_16 - Glowing crystal formation. Multiple
//                      crystals of different heights on rocky
//                      base. Blue/teal glow. ~96 pixels.
// ═══════════════════════════════════════════════════════════════
export const CRYSTAL_CLUSTER_16: SpriteTemplate = {
  name: 'crystal_cluster_16',
  width: 16,
  height: 16,
  description: 'Glowing crystal formation with multiple crystals of different heights growing from a rocky base. Blue/teal glow accents.',
  regions: [
    // Main crystal tip (center, tallest, rows 1-2)
    { name: 'crystal_main_tip', role: 'eye', pixels: [
      [7, 1], [8, 1],
      [7, 2], [8, 2],
    ]},
    // Main crystal shaft (rows 3-10, center)
    { name: 'crystal_main', role: 'body', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [7, 10], [8, 10],
    ]},
    // Crystal inner glow line
    { name: 'crystal_glow', role: 'accessory', pixels: [
      [7, 4], [7, 5], [7, 6], [7, 7], [7, 8],
    ]},
    // Left smaller crystal (rows 4-10)
    { name: 'crystal_left', role: 'head', pixels: [
      [3, 4], [4, 4],
      [3, 5], [4, 5],
      [3, 6], [4, 6],
      [3, 7], [4, 7],
      [3, 8], [4, 8],
      [4, 9], [4, 10],
    ]},
    // Right smaller crystal (rows 5-10)
    { name: 'crystal_right', role: 'head', pixels: [
      [11, 5], [12, 5],
      [11, 6], [12, 6],
      [11, 7], [12, 7],
      [11, 8], [12, 8],
      [11, 9], [12, 9],
      [11, 10],
    ]},
    // Rocky base (rows 11-14)
    { name: 'rock_base', role: 'belt', pixels: [
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12],
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
    ]},
    // Ground shadow
    { name: 'ground', role: 'boot', pixels: [
      [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// WELL_16 - Stone well with roof. Circular stone ring at base,
//           two wooden posts, peaked roof. ~102 pixels.
// ═══════════════════════════════════════════════════════════════
export const WELL_16: SpriteTemplate = {
  name: 'well_16',
  width: 16,
  height: 16,
  description: 'Stone well with peaked wooden roof, two support posts, circular stone ring, and rope/bucket hint.',
  regions: [
    // Peaked roof (rows 0-3)
    { name: 'roof', role: 'head', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
    ]},
    // Left post (rows 4-9, 2px wide)
    { name: 'post_left', role: 'arm', pixels: [
      [3, 4], [4, 4],
      [3, 5], [4, 5],
      [3, 6], [4, 6],
      [3, 7], [4, 7],
      [3, 8], [4, 8],
      [3, 9], [4, 9],
    ]},
    // Right post (rows 4-9, 2px wide)
    { name: 'post_right', role: 'arm', pixels: [
      [11, 4], [12, 4],
      [11, 5], [12, 5],
      [11, 6], [12, 6],
      [11, 7], [12, 7],
      [11, 8], [12, 8],
      [11, 9], [12, 9],
    ]},
    // Rope and bucket hint (center, rows 5-8)
    { name: 'rope_bucket', role: 'accessory', pixels: [
      [7, 5], [8, 5],
      [7, 6],
      [7, 7],
      [6, 8], [7, 8], [8, 8],
    ]},
    // Crossbar (row 4, connects posts under roof)
    { name: 'crossbar', role: 'belt', pixels: [
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
    ]},
    // Stone well ring (rows 9-13)
    { name: 'stone_ring', role: 'body', pixels: [
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
      [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
    ]},
    // Well opening darkness (inside the ring)
    { name: 'well_inside', role: 'eye', pixels: [
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Base / ground (row 14)
    { name: 'base', role: 'boot', pixels: [
      [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// LADDER_16 - Wooden ladder. Two vertical rails with 5 rungs.
//             ~76 pixels.
// ═══════════════════════════════════════════════════════════════
export const LADDER_16: SpriteTemplate = {
  name: 'ladder_16',
  width: 16,
  height: 16,
  description: 'Wooden ladder with two 2px-wide vertical rails and 5 horizontal rungs connecting them.',
  regions: [
    // Left rail (rows 1-14, 2px wide)
    { name: 'rail_left', role: 'arm', pixels: [
      [5, 1], [6, 1],
      [5, 2], [6, 2],
      [5, 3], [6, 3],
      [5, 4], [6, 4],
      [5, 5], [6, 5],
      [5, 6], [6, 6],
      [5, 7], [6, 7],
      [5, 8], [6, 8],
      [5, 9], [6, 9],
      [5, 10], [6, 10],
      [5, 11], [6, 11],
      [5, 12], [6, 12],
      [5, 13], [6, 13],
      [5, 14], [6, 14],
    ]},
    // Right rail (rows 1-14, 2px wide)
    { name: 'rail_right', role: 'arm', pixels: [
      [9, 1], [10, 1],
      [9, 2], [10, 2],
      [9, 3], [10, 3],
      [9, 4], [10, 4],
      [9, 5], [10, 5],
      [9, 6], [10, 6],
      [9, 7], [10, 7],
      [9, 8], [10, 8],
      [9, 9], [10, 9],
      [9, 10], [10, 10],
      [9, 11], [10, 11],
      [9, 12], [10, 12],
      [9, 13], [10, 13],
      [9, 14], [10, 14],
    ]},
    // Rung 1 (row 3)
    { name: 'rung_1', role: 'body', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
    ]},
    // Rung 2 (row 5)
    { name: 'rung_2', role: 'body', pixels: [
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Rung 3 (row 7)
    { name: 'rung_3', role: 'body', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    // Rung 4 (row 9)
    { name: 'rung_4', role: 'body', pixels: [
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Rung 5 (row 11)
    { name: 'rung_5', role: 'body', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
    // Rail top caps
    { name: 'top_caps', role: 'head', pixels: [
      [5, 0], [6, 0], [9, 0], [10, 0],
    ]},
    // Rail bottom feet
    { name: 'feet', role: 'boot', pixels: [
      [5, 15], [6, 15], [9, 15], [10, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// ALTAR_16 - Stone altar/shrine. Flat stone top, ornate front
//            face with symbol, stepped base, candle accent. ~100 pixels.
// ═══════════════════════════════════════════════════════════════
export const ALTAR_16: SpriteTemplate = {
  name: 'altar_16',
  width: 16,
  height: 16,
  description: 'Stone altar with flat top surface, ornate front face with carved symbol, stepped base, and candle accent on top.',
  regions: [
    // Candle flame (rows 1-2)
    { name: 'candle_flame', role: 'eye', pixels: [
      [10, 1], [11, 1],
      [10, 2], [11, 2],
    ]},
    // Candle body (rows 3-4)
    { name: 'candle', role: 'accessory', pixels: [
      [10, 3], [11, 3],
      [10, 4], [11, 4],
    ]},
    // Altar top surface (rows 5-7, wide flat stone slab)
    { name: 'altar_top', role: 'head', pixels: [
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
    ]},
    // Ornate front face (rows 8-11) with carved symbol
    { name: 'front_face', role: 'body', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
    ]},
    // Carved symbol on front face (diamond/gem shape)
    { name: 'symbol', role: 'belt', pixels: [
      [7, 8], [8, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [7, 10], [8, 10],
    ]},
    // Lower step (row 12, wider)
    { name: 'step_lower', role: 'leg', pixels: [
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
    ]},
    // Base step (rows 13-15, widest)
    { name: 'base', role: 'boot', pixels: [
      [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13],
      [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
      [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// WEAPON_RACK_16 - Wooden weapon display rack. Horizontal bar,
//                  two vertical posts, weapon silhouettes. ~88 pixels.
// ═══════════════════════════════════════════════════════════════
export const WEAPON_RACK_16: SpriteTemplate = {
  name: 'weapon_rack_16',
  width: 16,
  height: 16,
  description: 'Wooden weapon display rack with horizontal bar across middle, two vertical posts, and weapon silhouettes hanging.',
  regions: [
    // Post caps (row 3)
    { name: 'post_caps', role: 'head', pixels: [
      [2, 3], [3, 3], [12, 3], [13, 3],
    ]},
    // Left vertical post (rows 4-14, 2px wide)
    { name: 'post_left', role: 'arm', pixels: [
      [2, 4], [3, 4],
      [2, 5], [3, 5],
      [2, 6], [3, 6],
      [2, 7], [3, 7],
      [2, 8], [3, 8],
      [2, 9], [3, 9],
      [2, 10], [3, 10],
      [2, 11], [3, 11],
      [2, 12], [3, 12],
      [2, 13], [3, 13],
      [2, 14], [3, 14],
    ]},
    // Right vertical post (rows 4-14, 2px wide)
    { name: 'post_right', role: 'arm', pixels: [
      [12, 4], [13, 4],
      [12, 5], [13, 5],
      [12, 6], [13, 6],
      [12, 7], [13, 7],
      [12, 8], [13, 8],
      [12, 9], [13, 9],
      [12, 10], [13, 10],
      [12, 11], [13, 11],
      [12, 12], [13, 12],
      [12, 13], [13, 13],
      [12, 14], [13, 14],
    ]},
    // Horizontal bar upper (row 7, connects posts)
    { name: 'bar_upper', role: 'body', pixels: [
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
    ]},
    // Horizontal bar lower (row 8, connects posts)
    { name: 'bar_lower', role: 'belt', pixels: [
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
    ]},
    // Weapon 1 - sword hanging (left, rows 4-12)
    { name: 'weapon_sword', role: 'accessory', pixels: [
      [5, 4], [6, 4],
      [5, 5], [6, 5],
      [5, 6], [6, 6],
      [5, 9], [6, 9],
      [5, 10], [6, 10],
      [5, 11], [6, 11],
      [5, 12],
    ]},
    // Weapon 2 - axe hanging (center, rows 5-11)
    { name: 'weapon_axe', role: 'accessory', pixels: [
      [8, 4], [9, 4],
      [8, 5], [9, 5],
      [8, 6], [9, 6],
      [8, 9], [9, 9],
      [8, 10], [9, 10],
    ]},
    // Weapon accent highlights (crossguards/axe blade)
    { name: 'weapon_accents', role: 'eye', pixels: [
      [4, 6], [7, 6],    // sword crossguard
      [7, 9], [10, 9],   // axe blade edges
    ]},
    // Base / feet (row 15)
    { name: 'base', role: 'boot', pixels: [
      [1, 15], [2, 15], [3, 15], [4, 15],
      [11, 15], [12, 15], [13, 15], [14, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CAMPFIRE_16 - Ground campfire with crossed logs, ember bed,
//               and layered flame silhouette.
// ═══════════════════════════════════════════════════════════════
export const CAMPFIRE_16: SpriteTemplate = {
  name: 'bonfire_16',
  width: 16,
  height: 16,
  description: 'Small campfire with crossed logs, glowing embers, layered flame core, and stone ring base.',
  regions: [
    { name: 'flame_tip', role: 'eye', pixels: [
      [7, 1], [8, 1],
    ]},
    { name: 'flame_body', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
    ]},
    { name: 'flame_core', role: 'accessory', pixels: [
      [7, 3], [8, 3],
      [7, 4], [8, 4],
      [7, 5], [8, 5],
    ]},
    { name: 'log_cross_a', role: 'body', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    { name: 'log_cross_b', role: 'belt', pixels: [
      [10, 8], [9, 8], [8, 8], [7, 8], [6, 8],
      [11, 9], [10, 9], [9, 9], [8, 9], [7, 9],
      [10, 10], [9, 10], [8, 10], [7, 10], [6, 10],
    ]},
    { name: 'embers', role: 'arm', pixels: [
      [5, 7], [10, 7],
      [5, 8], [10, 8],
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
    { name: 'stone_ring', role: 'boot', pixels: [
      [4, 11], [5, 11], [10, 11], [11, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// ANVIL_16 - Blacksmith anvil with horn, waist, and heavy base.
// ═══════════════════════════════════════════════════════════════
export const ANVIL_16: SpriteTemplate = {
  name: 'forge_anvil_16',
  width: 16,
  height: 16,
  description: 'Forging anvil with left horn, broad striking face, narrow waist, and reinforced pedestal.',
  regions: [
    { name: 'horn', role: 'head', pixels: [
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
      [3, 8], [4, 8], [5, 8], [6, 8],
    ]},
    { name: 'face_plate', role: 'body', pixels: [
      [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
    ]},
    { name: 'waist', role: 'belt', pixels: [
      [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
    ]},
    { name: 'pedestal', role: 'leg', pixels: [
      [7, 11], [8, 11], [9, 11], [10, 11],
      [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12],
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
    ]},
    { name: 'base_shadow', role: 'boot', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14],
    ]},
    { name: 'rivets', role: 'accessory', pixels: [
      [6, 9], [11, 9],
    ]},
    { name: 'shine', role: 'eye', pixels: [
      [10, 7], [11, 7], [10, 8],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CAULDRON_16 - Iron pot with bubbling brew and support legs.
// ═══════════════════════════════════════════════════════════════
export const CAULDRON_16: SpriteTemplate = {
  name: 'brew_cauldron_16',
  width: 16,
  height: 16,
  description: 'Iron cauldron with thick rim, bubbling liquid, side handles, and short support legs.',
  regions: [
    { name: 'rim', role: 'head', pixels: [
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
    ]},
    { name: 'handles', role: 'arm', pixels: [
      [2, 7], [3, 7], [12, 7], [13, 7],
      [3, 8], [13, 8],
    ]},
    { name: 'pot_body', role: 'body', pixels: [
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    { name: 'brew_surface', role: 'eye', pixels: [
      [6, 6], [7, 6], [8, 6], [9, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
    ]},
    { name: 'bubbles', role: 'accessory', pixels: [
      [6, 5], [9, 5], [8, 6],
    ]},
    { name: 'legs', role: 'leg', pixels: [
      [5, 12], [6, 12], [9, 12], [10, 12],
    ]},
    { name: 'ground', role: 'boot', pixels: [
      [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// SIGNPOST_16 - Wooden sign board with post and carved text lines.
// ═══════════════════════════════════════════════════════════════
export const SIGNPOST_16: SpriteTemplate = {
  name: 'village_signpost_16',
  width: 16,
  height: 16,
  description: 'Wooden signpost with framed board, carved text marks, center post, and ground base.',
  regions: [
    { name: 'board_frame', role: 'head', pixels: [
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      [2, 4], [13, 4],
      [2, 5], [13, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
    ]},
    { name: 'board_fill', role: 'body', pixels: [
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
    ]},
    { name: 'text_marks', role: 'accessory', pixels: [
      [5, 4], [6, 4], [8, 4], [9, 4], [10, 4],
      [5, 5], [7, 5], [9, 5], [11, 5],
    ]},
    { name: 'nails', role: 'eye', pixels: [
      [3, 3], [12, 3], [3, 6], [12, 6],
    ]},
    { name: 'crossbeam', role: 'belt', pixels: [
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
    ]},
    { name: 'post', role: 'arm', pixels: [
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
      [7, 14], [8, 14],
    ]},
    { name: 'base', role: 'boot', pixels: [
      [6, 15], [7, 15], [8, 15], [9, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BOOKSHELF_16 - Tall shelf with multiple rows and mixed books.
// ═══════════════════════════════════════════════════════════════
export const BOOKSHELF_16: SpriteTemplate = {
  name: 'grand_bookshelf_16',
  width: 16,
  height: 16,
  description: 'Tall wooden bookshelf with three shelves, packed books, and small decorative corner highlights.',
  regions: [
    { name: 'top_frame', role: 'head', pixels: [
      [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],
    ]},
    { name: 'side_frame', role: 'arm', pixels: [
      [3, 3], [4, 3], [11, 3], [12, 3],
      [3, 4], [4, 4], [11, 4], [12, 4],
      [3, 5], [4, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [11, 6], [12, 6],
      [3, 7], [4, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [11, 9], [12, 9],
      [3, 10], [4, 10], [11, 10], [12, 10],
      [3, 11], [4, 11], [11, 11], [12, 11],
      [3, 12], [4, 12], [11, 12], [12, 12],
      [3, 13], [4, 13], [11, 13], [12, 13],
    ]},
    { name: 'shelves', role: 'belt', pixels: [
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
    ]},
    { name: 'books', role: 'body', pixels: [
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
    { name: 'book_accents', role: 'accessory', pixels: [
      [6, 3], [8, 3], [10, 3],
      [5, 6], [7, 6], [9, 6],
      [6, 9], [8, 9], [10, 9],
      [5, 12], [7, 12], [9, 12],
    ]},
    { name: 'corner_glints', role: 'eye', pixels: [
      [3, 2], [12, 2], [3, 13], [12, 13],
    ]},
    { name: 'base', role: 'boot', pixels: [
      [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
      [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15],
    ]},
  ],
};


// ═══════════════════════════════════════════════════════════════
// Color schemes (DB16 palette)
// Each uses 3-tone ramps: shadow / base / highlight
// ═══════════════════════════════════════════════════════════════

export const BARREL_COLORS: ColorScheme = {
  name: 'barrel_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // warm wood planks
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // lighter wood top rim
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // metal bands
    accessory: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, // plank line shadows
    eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // dark barrel opening
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // base wood
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};

export const CRATE_COLORS: ColorScheme = {
  name: 'crate_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wood body
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // lighter wood lid
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // metal corner brackets
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // X-plank cross
    eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // nail highlight
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};

export const TORCH_WALL_COLORS: ColorScheme = {
  name: 'torch_wall_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wooden handle
    head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // flame body (orange-yellow)
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // flame tip (bright yellow-white)
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // metal bracket arm
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // wall plate (dark iron)
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // ember glow
    boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // handle base cap
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};

export const BANNER_COLORS: ColorScheme = {
  name: 'banner_default',
  mapping: {
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // red cloth
    head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // (unused)
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wooden pole
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d04648' }, // fringe / tattered edge
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // golden finial
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // heraldic gold stripe
    boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // ground base stone
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    face:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // (unused)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};

export const STATUE_COLORS: ColorScheme = {
  name: 'statue_default',
  mapping: {
    head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' }, // stone head (lighter)
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // stone body
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // stone arms
    belt:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // sash highlight
    leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // stone legs (darker)
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, // glowing eyes
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // pedestal top
    boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // dark stone pedestal
    face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // (unused)
    hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // (unused)
  },
};

export const CRYSTAL_CLUSTER_COLORS: ColorScheme = {
  name: 'crystal_cluster_default',
  mapping: {
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // main crystal (blue)
    head:      { shadow: '#442434', base: '#597dce', highlight: '#6dc2ca' }, // side crystals (blue-purple)
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, // crystal tips (bright glow)
    accessory: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, // inner glow line (white)
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // rocky base
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // ground shadow
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // (unused)
    leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // (unused)
    face:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // (unused)
    hand:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // (unused)
  },
};

export const WELL_COLORS: ColorScheme = {
  name: 'well_default',
  mapping: {
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wood roof
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // stone ring
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wood posts
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // crossbar wood
    accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' }, // rope (light tan)
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' }, // dark well opening
    boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // ground stone
    leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // (unused)
    face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // (unused)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};

export const LADDER_COLORS: ColorScheme = {
  name: 'ladder_default',
  mapping: {
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wood rails
    body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // wood rungs (lighter)
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // top caps
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // feet
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // (unused)
    accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};

export const ALTAR_COLORS: ColorScheme = {
  name: 'altar_default',
  mapping: {
    head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' }, // altar top (light stone)
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // front face stone
    belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // carved symbol (gold)
    leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // lower step (dark stone)
    boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // base steps (darkest)
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // candle flame (golden)
    accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' }, // candle body (cream)
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // (unused)
    face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // (unused)
    hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // (unused)
  },
};

export const WEAPON_RACK_COLORS: ColorScheme = {
  name: 'weapon_rack_default',
  mapping: {
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wood posts
    body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // horizontal bar upper
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // horizontal bar lower
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // post caps
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // weapon silhouettes (iron)
    eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, // weapon bright accents
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // base feet
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};

export const CAMPFIRE_COLORS: ColorScheme = {
  name: 'bonfire_default',
  mapping: {
    head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // flame body
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // flame core
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, // hottest tip
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // log A
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' }, // log B
    arm:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // embers
    boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // stone ring
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  },
};

export const ANVIL_COLORS: ColorScheme = {
  name: 'forge_anvil_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // horn
    body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#8595a1' }, // face plate
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // waist
    leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // pedestal
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // base shadow
    accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // rivets
    eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, // metal glint
    arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
    face:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
    hand:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  },
};

export const CAULDRON_COLORS: ColorScheme = {
  name: 'brew_cauldron_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // rim
    arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // handles
    body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#8595a1' }, // pot body
    eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // brew surface
    accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, // bubbles
    leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // legs
    boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, // ground
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
    face:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    hand:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  },
};

export const SIGNPOST_COLORS: ColorScheme = {
  name: 'village_signpost_default',
  mapping: {
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // frame
    body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' }, // board fill
    accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // text marks
    eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // nails
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // crossbeam
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // post
    boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // base stone
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const BOOKSHELF_COLORS: ColorScheme = {
  name: 'grand_bookshelf_default',
  mapping: {
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // top frame
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // side frame
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // shelf boards
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // books base mix
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // book accents
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, // corner glints
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // base plinth
    leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    face:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};


// ═══════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════

export const PROP_TEMPLATES: Record<string, SpriteTemplate> = {
  barrel_16: BARREL_16,
  crate_16: CRATE_16,
  torch_wall_16: TORCH_WALL_16,
  banner_16: BANNER_16,
  statue_16: STATUE_16,
  crystal_cluster_16: CRYSTAL_CLUSTER_16,
  well_16: WELL_16,
  ladder_16: LADDER_16,
  altar_16: ALTAR_16,
  weapon_rack_16: WEAPON_RACK_16,
  bonfire_16: CAMPFIRE_16,
  forge_anvil_16: ANVIL_16,
  brew_cauldron_16: CAULDRON_16,
  village_signpost_16: SIGNPOST_16,
  grand_bookshelf_16: BOOKSHELF_16,
};

export const PROP_COLOR_SCHEMES: Record<string, ColorScheme> = {
  barrel_default: BARREL_COLORS,
  crate_default: CRATE_COLORS,
  torch_wall_default: TORCH_WALL_COLORS,
  banner_default: BANNER_COLORS,
  statue_default: STATUE_COLORS,
  crystal_cluster_default: CRYSTAL_CLUSTER_COLORS,
  well_default: WELL_COLORS,
  ladder_default: LADDER_COLORS,
  altar_default: ALTAR_COLORS,
  weapon_rack_default: WEAPON_RACK_COLORS,
  bonfire_default: CAMPFIRE_COLORS,
  forge_anvil_default: ANVIL_COLORS,
  brew_cauldron_default: CAULDRON_COLORS,
  village_signpost_default: SIGNPOST_COLORS,
  grand_bookshelf_default: BOOKSHELF_COLORS,
};
