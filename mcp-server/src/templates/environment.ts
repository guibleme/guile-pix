/**
 * 16x16 tileable environment templates.
 * Each tile is designed to tile seamlessly or serve as a standalone element.
 * Uses the DB16 palette for all color schemes.
 *
 * Templates reuse the same SpriteRegion roles from humanoid16.ts
 * to stay compatible with the existing rendering/coloring pipeline.
 *
 * Role mapping for environment tiles:
 * - 'body'      = main fill / ground
 * - 'head'      = secondary element / accent
 * - 'accessory' = detail / highlight
 * - 'eye'       = special accent dot
 * - 'belt'      = border / edge
 * - 'leg'       = base / darker area
 * - 'arm'       = thin detail
 *
 * Tiles included:
 * - GRASS_16      Grass ground with blade details
 * - STONE_16      Cobblestone with mortar lines
 * - WATER_16      Water surface with wave highlights
 * - TREE_16       Small tree with trunk and leafy crown
 * - LAVA_16       Lava with bright flow lines
 * - SAND_16       Sandy ground with grain detail
 * - BRICK_16      Brick wall in offset pattern
 * - WOOD_FLOOR_16 Horizontal wood planks with grain
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// GRASS_16 - Grass tile with variation patches and blade details
// Full coverage ground tile. Darker base, medium grass, lighter
// variation patches, and small blade tips poking up on top rows.
// ═══════════════════════════════════════════════════════════════
export const GRASS_16: SpriteTemplate = {
  name: 'grass_16',
  width: 16,
  height: 16,
  description: 'Tileable grass ground. Green base with variation patches and blade tips.',
  regions: [
    // Main grass fill (body) - covers most of the tile
    { name: 'grass_base', role: 'body', pixels: [
      // Row 0 - partial (blades stick up from row 1)
      [1, 0], [2, 0], [4, 0], [5, 0], [7, 0], [8, 0], [10, 0], [11, 0], [13, 0], [14, 0],
      // Row 1
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1],
      // Row 2
      [0, 2], [1, 2], [2, 2], [3, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2],
      // Row 3
      [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [14, 3], [15, 3],
      // Row 4
      [0, 4], [1, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4],
      // Row 5
      [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5],
      // Row 6
      [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6],
      // Row 7
      [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [13, 7], [14, 7], [15, 7],
      // Row 8
      [0, 8], [1, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8],
      // Row 9
      [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [12, 9], [13, 9], [14, 9], [15, 9],
      // Row 10
      [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10],
      // Row 11
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [14, 11], [15, 11],
      // Row 12
      [0, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12],
      // Row 13
      [0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13], [15, 13],
      // Row 14
      [0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [14, 14], [15, 14],
      // Row 15
      [0, 15], [1, 15], [2, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15],
    ]},
    // Variation patches (head) - slightly different shade clusters
    { name: 'grass_variation', role: 'head', pixels: [
      [4, 2], [10, 2],
      [13, 3],
      [2, 4],
      [9, 5],
      [7, 6],
      [12, 7],
      [2, 8],
      [11, 9],
      [5, 10],
      [13, 11],
      [1, 12],
      [8, 13],
      [13, 14],
      [3, 15],
    ]},
    // Blade tips and highlights (accessory) - lighter accent dots
    { name: 'grass_blades', role: 'accessory', pixels: [
      [0, 0], [3, 0], [6, 0], [9, 0], [12, 0], [15, 0],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// STONE_16 - Cobblestone tile with irregular stone shapes
// Stones of varying sizes separated by darker mortar lines.
// ═══════════════════════════════════════════════════════════════
export const STONE_16: SpriteTemplate = {
  name: 'stone_16',
  width: 16,
  height: 16,
  description: 'Tileable cobblestone ground. Irregular stones with mortar lines between.',
  regions: [
    // Stone surfaces (body) - main stone fill
    { name: 'stone_fill', role: 'body', pixels: [
      // Top row of stones (rows 0-3)
      [1, 0], [2, 0], [3, 0], [5, 0], [6, 0], [7, 0], [9, 0], [10, 0], [11, 0], [12, 0], [14, 0], [15, 0],
      [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [9, 1], [10, 1], [11, 1], [12, 1], [14, 1], [15, 1],
      [1, 2], [2, 2], [3, 2], [5, 2], [6, 2], [7, 2], [9, 2], [10, 2], [11, 2], [12, 2], [14, 2], [15, 2],
      // Second row of stones (rows 4-7) - offset
      [0, 4], [1, 4], [2, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [10, 4], [11, 4], [12, 4], [13, 4], [15, 4],
      [0, 5], [1, 5], [2, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [10, 5], [11, 5], [12, 5], [13, 5], [15, 5],
      [0, 6], [1, 6], [2, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [10, 6], [11, 6], [12, 6], [13, 6], [15, 6],
      // Third row of stones (rows 8-11)
      [1, 8], [2, 8], [3, 8], [4, 8], [6, 8], [7, 8], [8, 8], [10, 8], [11, 8], [12, 8], [14, 8], [15, 8],
      [1, 9], [2, 9], [3, 9], [4, 9], [6, 9], [7, 9], [8, 9], [10, 9], [11, 9], [12, 9], [14, 9], [15, 9],
      [1, 10], [2, 10], [3, 10], [4, 10], [6, 10], [7, 10], [8, 10], [10, 10], [11, 10], [12, 10], [14, 10], [15, 10],
      // Fourth row of stones (rows 12-15) - offset again
      [0, 12], [1, 12], [2, 12], [3, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [11, 12], [12, 12], [13, 12], [15, 12],
      [0, 13], [1, 13], [2, 13], [3, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [11, 13], [12, 13], [13, 13], [15, 13],
      [0, 14], [1, 14], [2, 14], [3, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [11, 14], [12, 14], [13, 14], [15, 14],
    ]},
    // Mortar lines (leg) - darker gaps between stones
    { name: 'mortar', role: 'leg', pixels: [
      // Horizontal mortar rows
      [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], [15, 3],
      [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7],
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11],
      [0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15],
      // Vertical mortar columns (between horizontal rows)
      [0, 0], [4, 0], [8, 0], [13, 0],
      [0, 1], [4, 1], [8, 1], [13, 1],
      [0, 2], [4, 2], [8, 2], [13, 2],
      [3, 4], [9, 4], [14, 4],
      [3, 5], [9, 5], [14, 5],
      [3, 6], [9, 6], [14, 6],
      [0, 8], [5, 8], [9, 8], [13, 8],
      [0, 9], [5, 9], [9, 9], [13, 9],
      [0, 10], [5, 10], [9, 10], [13, 10],
      [4, 12], [10, 12], [14, 12],
      [4, 13], [10, 13], [14, 13],
      [4, 14], [10, 14], [14, 14],
    ]},
    // Stone highlights (accessory) - light spots on stone surfaces
    { name: 'stone_highlight', role: 'accessory', pixels: [
      [2, 0], [6, 0], [10, 0],
      [1, 4], [5, 4], [11, 4],
      [2, 8], [7, 8], [11, 8],
      [1, 12], [6, 12], [12, 12],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// WATER_16 - Water surface tile with wave pattern highlights
// Blue base with lighter wave crests and dark depth accents.
// ═══════════════════════════════════════════════════════════════
export const WATER_16: SpriteTemplate = {
  name: 'water_16',
  width: 16,
  height: 16,
  description: 'Tileable water surface. Blue base with wave highlight pattern.',
  regions: [
    // Water base (body) - deep blue fill
    { name: 'water_base', role: 'body', pixels: [
      // Row 0
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [8, 0], [9, 0], [10, 0], [11, 0], [14, 0], [15, 0],
      // Row 1
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1],
      // Row 2
      [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2],
      // Row 3
      [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], [15, 3],
      // Row 4
      [0, 4], [1, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4],
      // Row 5
      [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5],
      // Row 6
      [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6],
      // Row 7
      [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7],
      // Row 8
      [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [15, 8],
      // Row 9
      [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9],
      // Row 10
      [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10],
      // Row 11
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11],
      // Row 12
      [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12],
      // Row 13
      [0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13], [15, 13],
      // Row 14
      [0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14],
      // Row 15
      [0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15],
    ]},
    // Wave crest highlights (accessory) - light streaks across surface
    { name: 'wave_crests', role: 'accessory', pixels: [
      // Wave crest 1 (row 0)
      [6, 0], [7, 0], [12, 0], [13, 0],
      // Wave crest 2 (row 4)
      [2, 4], [3, 4],
      // Wave crest 3 (row 8)
      [6, 8], [7, 8], [13, 8], [14, 8],
      // Wave crest 4 (row 12)
      [0, 12], [1, 12],
    ]},
    // Depth shadows (leg) - darker spots suggesting depth
    { name: 'water_depth', role: 'leg', pixels: [
      [3, 3], [10, 3],
      [7, 6], [14, 6],
      [2, 10], [11, 10],
      [6, 14], [13, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// TREE_16 - Small tree with brown trunk and round leafy crown
// Trunk is 2px wide, ~6px tall. Crown is a rounded cluster above.
// ═══════════════════════════════════════════════════════════════
export const TREE_16: SpriteTemplate = {
  name: 'tree_16',
  width: 16,
  height: 16,
  description: 'Small tree. Brown trunk centered, round green crown on top.',
  regions: [
    // Crown top (rows 0-1) - rounded top of foliage
    { name: 'crown_top', role: 'body', pixels: [
      [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0],
      [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1],
    ]},
    // Crown middle (rows 2-4) - widest foliage
    { name: 'crown_mid', role: 'body', pixels: [
      [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
    ]},
    // Crown bottom (rows 5-7) - tapering foliage
    { name: 'crown_bottom', role: 'body', pixels: [
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
    ]},
    // Leaf highlights (accessory) - lighter dots on crown
    { name: 'leaf_highlights', role: 'accessory', pixels: [
      [6, 0], [9, 0],
      [5, 1], [10, 1],
      [4, 2], [7, 2], [11, 2],
      [5, 3], [9, 3],
      [4, 4], [8, 4], [11, 4],
      [6, 5], [10, 5],
      [5, 6], [9, 6],
    ]},
    // Leaf shadows (leg) - darker depth in crown
    { name: 'leaf_shadow', role: 'leg', pixels: [
      [7, 1], [8, 1],
      [6, 3], [10, 3],
      [7, 5], [8, 5],
      [7, 6], [8, 6],
    ]},
    // Trunk (head) - brown, 2px wide, centered
    { name: 'trunk', role: 'head', pixels: [
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
    ]},
    // Trunk bark detail (arm) - thin line on trunk
    { name: 'bark_detail', role: 'arm', pixels: [
      [7, 9],
      [8, 10],
      [7, 11],
      [8, 12],
    ]},
    // Roots / ground base (belt) - roots spreading at bottom
    { name: 'roots', role: 'belt', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
      [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15],
    ]},
    // Eye-catching detail - fruit or bright spot on crown
    { name: 'fruit', role: 'eye', pixels: [
      [6, 2], [10, 4],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// LAVA_16 - Lava tile with dark base and bright flow lines
// Dark red/orange base with hot bright cracks and glow spots.
// ═══════════════════════════════════════════════════════════════
export const LAVA_16: SpriteTemplate = {
  name: 'lava_16',
  width: 16,
  height: 16,
  description: 'Tileable lava surface. Dark red base with bright orange/yellow flow cracks.',
  regions: [
    // Lava base (body) - dark red/orange cooled surface
    { name: 'lava_base', role: 'body', pixels: [
      // Row 0
      [0, 0], [1, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0],
      // Row 1
      [0, 1], [1, 1], [2, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1],
      // Row 2
      [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [14, 2], [15, 2],
      // Row 3
      [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], [15, 3],
      // Row 4
      [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [12, 4], [13, 4], [14, 4], [15, 4],
      // Row 5
      [0, 5], [1, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5],
      // Row 6
      [0, 6], [1, 6], [2, 6], [3, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6],
      // Row 7
      [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [15, 7],
      // Row 8
      [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8],
      // Row 9
      [0, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9],
      // Row 10
      [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10],
      // Row 11
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [12, 11], [13, 11], [14, 11], [15, 11],
      // Row 12
      [0, 12], [1, 12], [2, 12], [3, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12],
      // Row 13
      [0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [14, 13], [15, 13],
      // Row 14
      [0, 14], [1, 14], [2, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14],
      // Row 15
      [0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15],
    ]},
    // Lava flow cracks (head) - bright orange flow lines
    { name: 'lava_flow', role: 'head', pixels: [
      // Crack pattern 1 (top-left winding down)
      [2, 0], [3, 0],
      [3, 1],
      [6, 2], [13, 2],
      // Crack pattern 2 (mid area)
      [11, 4],
      [2, 5],
      [4, 6],
      [14, 7],
      [9, 8],
      [1, 9],
      [7, 10],
      [11, 11],
      [4, 12],
      [13, 13],
      [3, 14],
      [8, 15],
    ]},
    // Hot spots / glow centers (accessory) - brightest yellow
    { name: 'lava_glow', role: 'accessory', pixels: [
      [9, 0], [10, 0],
      [10, 1],
      [2, 6],
      [9, 7],
      [5, 11],
      [10, 13],
      [6, 15],
    ]},
    // Bright eye-catch accent (eye) - hottest glow dots
    { name: 'lava_hotspot', role: 'eye', pixels: [
      [3, 1],
      [11, 5],
      [1, 9],
      [14, 8],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// SAND_16 - Sand tile with subtle grain dots and shadow patches
// Warm tan base with lighter grain specks and small shadow dips.
// ═══════════════════════════════════════════════════════════════
export const SAND_16: SpriteTemplate = {
  name: 'sand_16',
  width: 16,
  height: 16,
  description: 'Tileable sand ground. Warm tan base with grain dots and small shadow patches.',
  regions: [
    // Sand base (body) - warm tan fill, nearly full coverage
    { name: 'sand_base', role: 'body', pixels: [
      // Row 0
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [13, 0], [14, 0], [15, 0],
      // Row 1
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1],
      // Row 2
      [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2],
      // Row 3
      [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], [15, 3],
      // Row 4
      [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4],
      // Row 5
      [0, 5], [1, 5], [2, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5],
      // Row 6
      [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6],
      // Row 7
      [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [15, 7],
      // Row 8
      [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8],
      // Row 9
      [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9],
      // Row 10
      [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [14, 10], [15, 10],
      // Row 11
      [0, 11], [1, 11], [2, 11], [3, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11],
      // Row 12
      [0, 12], [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12],
      // Row 13
      [0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [12, 13], [13, 13], [14, 13], [15, 13],
      // Row 14
      [0, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14],
      // Row 15
      [0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15],
    ]},
    // Grain dots / lighter specks (accessory) - scattered highlights
    { name: 'sand_grain', role: 'accessory', pixels: [
      [12, 0],
      [9, 2],
      [6, 3],
      [3, 5],
      [14, 7],
      [7, 9],
      [13, 10],
      [4, 11],
      [11, 13],
      [1, 14],
    ]},
    // Shadow patches (leg) - slightly darker dips in sand
    { name: 'sand_shadow', role: 'leg', pixels: [
      [5, 1], [6, 1],
      [2, 4], [3, 4],
      [10, 6], [11, 6],
      [0, 9], [1, 9],
      [7, 12], [8, 12],
      [4, 15], [5, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BRICK_16 - Brick wall tile with offset pattern and mortar
// Red bricks in standard offset bond. Mortar lines between.
// ═══════════════════════════════════════════════════════════════
export const BRICK_16: SpriteTemplate = {
  name: 'brick_16',
  width: 16,
  height: 16,
  description: 'Tileable brick wall. Red bricks in offset bond with mortar lines.',
  regions: [
    // Brick faces (body) - main red brick surface
    { name: 'brick_face', role: 'body', pixels: [
      // Row A bricks (rows 0-2): bricks at [0..6], [8..14]
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0],
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1],
      [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2],
      // Row B bricks (rows 4-6): offset bricks at [0..2], [4..10], [12..15]
      [0, 4], [1, 4], [2, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [12, 4], [13, 4], [14, 4], [15, 4],
      [0, 5], [1, 5], [2, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [12, 5], [13, 5], [14, 5], [15, 5],
      [0, 6], [1, 6], [2, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [12, 6], [13, 6], [14, 6], [15, 6],
      // Row C bricks (rows 8-10): same as row A
      [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
      [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9],
      [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10],
      // Row D bricks (rows 12-14): same as row B
      [0, 12], [1, 12], [2, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [12, 12], [13, 12], [14, 12], [15, 12],
      [0, 13], [1, 13], [2, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [12, 13], [13, 13], [14, 13], [15, 13],
      [0, 14], [1, 14], [2, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [12, 14], [13, 14], [14, 14], [15, 14],
    ]},
    // Mortar lines (belt) - border/edge between bricks
    { name: 'mortar', role: 'belt', pixels: [
      // Horizontal mortar rows (full width)
      [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], [15, 3],
      [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7],
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11],
      [0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15],
      // Vertical mortar columns - row A pattern (between rows 0-2)
      [7, 0], [15, 0],
      [7, 1], [15, 1],
      [7, 2], [15, 2],
      // Vertical mortar columns - row B pattern (between rows 4-6)
      [3, 4], [11, 4],
      [3, 5], [11, 5],
      [3, 6], [11, 6],
      // Vertical mortar columns - row C pattern (between rows 8-10)
      [7, 8], [15, 8],
      [7, 9], [15, 9],
      [7, 10], [15, 10],
      // Vertical mortar columns - row D pattern (between rows 12-14)
      [3, 12], [11, 12],
      [3, 13], [11, 13],
      [3, 14], [11, 14],
    ]},
    // Brick highlights (accessory) - lighter spots on brick faces
    { name: 'brick_highlight', role: 'accessory', pixels: [
      [1, 0], [9, 0],
      [2, 1], [10, 1],
      [1, 4], [5, 4], [13, 4],
      [5, 5], [13, 5],
      [1, 8], [9, 8],
      [2, 9], [10, 9],
      [1, 12], [5, 12], [13, 12],
      [5, 13], [13, 13],
    ]},
    // Brick shadows (leg) - darker spots on brick faces for depth
    { name: 'brick_shadow', role: 'leg', pixels: [
      [5, 2], [13, 2],
      [2, 6], [9, 6], [15, 6],
      [5, 10], [13, 10],
      [2, 14], [9, 14], [15, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// WOOD_FLOOR_16 - Horizontal wood planks with grain lines
// Planks run left-to-right, separated by darker seam lines.
// Grain runs along each plank as thin detail lines.
// ═══════════════════════════════════════════════════════════════
export const WOOD_FLOOR_16: SpriteTemplate = {
  name: 'wood_floor_16',
  width: 16,
  height: 16,
  description: 'Tileable wood plank floor. Horizontal planks with grain lines and seams.',
  regions: [
    // Plank surfaces (body) - main wood fill
    { name: 'plank_fill', role: 'body', pixels: [
      // Plank 1 (rows 0-2)
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0],
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [12, 1], [13, 1], [14, 1], [15, 1],
      [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2],
      // Plank 2 (rows 4-6)
      [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4],
      [0, 5], [1, 5], [2, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5],
      [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6],
      // Plank 3 (rows 8-10)
      [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8],
      [0, 9], [1, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9],
      [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10],
      // Plank 4 (rows 12-14)
      [0, 12], [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12],
      [0, 13], [2, 13], [3, 13], [4, 13], [5, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [13, 13], [14, 13], [15, 13],
      [0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14],
    ]},
    // Plank seam lines (belt) - dark gaps between planks
    { name: 'plank_seams', role: 'belt', pixels: [
      // Horizontal seams between planks
      [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], [15, 3],
      [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7],
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11],
      [0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15],
    ]},
    // Wood grain lines (arm) - thin darker streaks running horizontally
    { name: 'wood_grain', role: 'arm', pixels: [
      // Grain on plank 1
      [5, 1], [11, 1],
      // Grain on plank 2
      [3, 5], [10, 5],
      // Grain on plank 3
      [2, 9], [9, 9],
      // Grain on plank 4
      [1, 13], [6, 13], [12, 13],
    ]},
    // Knot details (eye) - small dark knot spots in wood
    { name: 'wood_knots', role: 'eye', pixels: [
      [8, 1],
      [14, 5],
      [5, 9],
      [10, 13],
    ]},
    // Plank highlights (accessory) - lighter worn spots
    { name: 'plank_highlight', role: 'accessory', pixels: [
      [3, 0], [10, 0],
      [6, 4], [13, 4],
      [4, 8], [11, 8],
      [2, 12], [9, 12],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// Color schemes for environment tiles (DB16 palette)
// DB16: #140c1c, #442434, #30346d, #4e4a4e, #854c30, #346524,
//       #d04648, #757161, #597dce, #d27d2c, #8595a1, #6daa2c,
//       #d2aa99, #6dc2ca, #dad45e, #deeed6
// ═══════════════════════════════════════════════════════════════

export const GRASS_COLORS: ColorScheme = {
  name: 'grass_default',
  mapping: {
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },  // green base
    head:      { shadow: '#346524', base: '#346524', highlight: '#6daa2c' },  // darker variation
    accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },  // bright blade tips
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    belt:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    leg:       { shadow: '#140c1c', base: '#346524', highlight: '#346524' },  // (unused)
    arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#6daa2c' },  // (unused)
  },
};

export const STONE_COLORS: ColorScheme = {
  name: 'stone_default',
  mapping: {
    body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },  // stone surface
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (unused)
    accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // stone highlight
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },  // (unused)
    leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // mortar
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },  // (unused)
  },
};

export const WATER_COLORS: ColorScheme = {
  name: 'water_default',
  mapping: {
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // water blue
    head:      { shadow: '#30346d', base: '#30346d', highlight: '#597dce' },  // (unused)
    accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },  // wave crest highlight
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    belt:      { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },  // (unused)
    leg:       { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },  // depth shadow
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#597dce' },  // (unused)
  },
};

export const TREE_COLORS: ColorScheme = {
  name: 'tree_default',
  mapping: {
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },  // foliage green
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // trunk brown
    accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },  // leaf highlights
    eye:       { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },  // fruit accent
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // roots
    leg:       { shadow: '#140c1c', base: '#346524', highlight: '#346524' },  // leaf shadow
    arm:       { shadow: '#442434', base: '#442434', highlight: '#854c30' },  // bark detail
  },
};

export const LAVA_COLORS: ColorScheme = {
  name: 'lava_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d04648' },  // cooled lava crust
    head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },  // flow cracks
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // bright glow
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },  // hottest dots
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },  // (unused)
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },  // (unused)
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#854c30' },  // (unused)
  },
};

export const SAND_COLORS: ColorScheme = {
  name: 'sand_default',
  mapping: {
    body:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },  // warm tan sand
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },  // (unused)
    accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },  // grain highlight specks
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    belt:      { shadow: '#854c30', base: '#854c30', highlight: '#d27d2c' },  // (unused)
    leg:       { shadow: '#854c30', base: '#854c30', highlight: '#d27d2c' },  // shadow patches
    arm:       { shadow: '#d27d2c', base: '#d2aa99', highlight: '#d2aa99' },  // (unused)
  },
};

export const BRICK_COLORS: ColorScheme = {
  name: 'brick_default',
  mapping: {
    body:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },  // red brick face
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d04648' },  // (unused)
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#d2aa99' },  // brick highlight
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // mortar lines
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#854c30' },  // brick shadow
    arm:       { shadow: '#854c30', base: '#d04648', highlight: '#d04648' },  // (unused)
  },
};

export const WOOD_FLOOR_COLORS: ColorScheme = {
  name: 'wood_floor_default',
  mapping: {
    body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },  // wood plank
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (unused)
    accessory: { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },  // worn highlights
    eye:       { shadow: '#140c1c', base: '#442434', highlight: '#442434' },  // wood knots
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },  // plank seams
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#854c30' },  // (unused)
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#854c30' },  // wood grain
  },
};

// ═══════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════

export const ENVIRONMENT_TEMPLATES: Record<string, SpriteTemplate> = {
  grass_16: GRASS_16,
  stone_16: STONE_16,
  water_16: WATER_16,
  tree_16: TREE_16,
  lava_16: LAVA_16,
  sand_16: SAND_16,
  brick_16: BRICK_16,
  wood_floor_16: WOOD_FLOOR_16,
};

export const ENVIRONMENT_COLOR_SCHEMES: Record<string, ColorScheme> = {
  grass_default: GRASS_COLORS,
  stone_default: STONE_COLORS,
  water_default: WATER_COLORS,
  tree_default: TREE_COLORS,
  lava_default: LAVA_COLORS,
  sand_default: SAND_COLORS,
  brick_default: BRICK_COLORS,
  wood_floor_default: WOOD_FLOOR_COLORS,
};
