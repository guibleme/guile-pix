/**
 * 16x16 RPG item and object templates.
 * Each item is designed to be centered and balanced within a 16x16 grid.
 * Uses the DB16 palette for all color schemes.
 *
 * Templates reuse the same SpriteRegion roles from humanoid16.ts
 * to stay compatible with the existing rendering/coloring pipeline.
 *
 * Items included:
 * - SWORD_16    Classic RPG sword, vertical, blade up
 * - SHIELD_16   Kite/heater shield with heraldic emblem
 * - POTION_16   Round flask with colored liquid
 * - CHEST_16    Treasure chest, front-facing, closed
 * - HEART_16    Health/life heart icon
 * - COIN_16     Gold coin with center symbol
 * - GEM_16      Cut gemstone, diamond shape with facets
 * - KEY_16      Ornate key with decorative bow
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// =================================================================
// SWORD - Classic RPG sword, vertical orientation, blade pointing up
// Centered around x=7-8, spanning most of the height
// =================================================================
export const SWORD_16: SpriteTemplate = {
  name: 'sword_16',
  width: 16,
  height: 16,
  description: 'Vertical sword, blade pointing up. 3px wide filled blade with edge highlight, gold guard, brown grip.',
  regions: [
    // Blade tip (row 0-1) - pointed top, 1px then 2px
    { name: 'blade_tip', role: 'body', pixels: [
      [8, 0],
      [7, 1], [8, 1],
    ]},
    // Blade upper (rows 2-4) - 3px wide filled
    { name: 'blade_upper', role: 'body', pixels: [
      [7, 2], [8, 2], [9, 2],
      [7, 3], [8, 3], [9, 3],
      [7, 4], [8, 4], [9, 4],
    ]},
    // Blade middle (rows 5-7) - 3px wide with edge highlight on right
    { name: 'blade_middle', role: 'body', pixels: [
      [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7], [9, 7],
    ]},
    // Blade edge highlight (right side, rows 3-8) - renders as accessory for brighter material
    { name: 'blade_edge', role: 'accessory', pixels: [
      [9, 3], [9, 5], [9, 7],
    ]},
    // Blade lower (rows 8-9) - 3px wide approaching guard
    { name: 'blade_lower', role: 'body', pixels: [
      [7, 8], [8, 8], [9, 8],
      [7, 9], [8, 9], [9, 9],
    ]},
    // Fuller / blood groove (center detail, rows 3-8)
    { name: 'fuller', role: 'arm', pixels: [
      [8, 3], [8, 5], [8, 7],
    ]},
    // Guard / cross-piece (row 10) - 6px wide, horizontal bar
    { name: 'guard', role: 'accessory', pixels: [
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Grip (rows 11-13) - narrow 2px handle
    { name: 'grip', role: 'belt', pixels: [
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
    ]},
    // Pommel (rows 14-15) - rounded bottom cap
    { name: 'pommel', role: 'boot', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
      [7, 15], [8, 15],
    ]},
  ],
};

// =================================================================
// SHIELD - Kite/heater shield shape with heraldic design
// Centered in grid, wider at top, tapering to point at bottom
// =================================================================
export const SHIELD_16: SpriteTemplate = {
  name: 'shield_16',
  width: 16,
  height: 16,
  description: 'Kite/heater shield with heraldic cross emblem. Blue field, silver border, gold emblem.',
  regions: [
    // Border - top edge (row 2)
    { name: 'border_top', role: 'accessory', pixels: [
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
    ]},
    // Border - left edge (rows 3-10)
    { name: 'border_left', role: 'accessory', pixels: [
      [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8],
      [4, 9], [4, 10],
    ]},
    // Border - right edge (rows 3-10)
    { name: 'border_right', role: 'accessory', pixels: [
      [12, 3], [12, 4], [12, 5], [12, 6], [12, 7], [12, 8],
      [11, 9], [11, 10],
    ]},
    // Border - bottom taper (rows 11-13) - kite shape point
    { name: 'border_bottom', role: 'accessory', pixels: [
      [5, 11], [10, 11],
      [6, 12], [9, 12],
      [7, 13], [8, 13],
    ]},
    // Field - main shield area (rows 3-8), inside border
    { name: 'field', role: 'body', pixels: [
      // Row 3
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      // Row 4
      [4, 4], [5, 4], [6, 4],                 [9, 4], [10, 4], [11, 4],
      // Row 5
      [4, 5], [5, 5], [6, 5],                 [9, 5], [10, 5], [11, 5],
      // Row 6
      [4, 6], [5, 6], [6, 6],                 [9, 6], [10, 6], [11, 6],
      // Row 7
      [4, 7], [5, 7], [6, 7],                 [9, 7], [10, 7], [11, 7],
      // Row 8
      [4, 8], [5, 8], [6, 8],                 [9, 8], [10, 8], [11, 8],
      // Row 9
      [5, 9], [6, 9],                         [9, 9], [10, 9],
      // Row 10
      [5, 10], [6, 10],                       [9, 10], [10, 10],
      // Row 11
      [6, 11],                                [9, 11],
      // Row 12
      [7, 12], [8, 12],
    ]},
    // Emblem - heraldic cross in center (rows 4-8, cols 7-8 vertical + row 6 horizontal)
    { name: 'emblem', role: 'belt', pixels: [
      // Vertical bar of cross
      [7, 4], [8, 4],
      [7, 5], [8, 5],
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      // Horizontal bar of cross (row 6)
      [5, 6], [6, 6], [9, 6], [10, 6],
    ]},
  ],
};

// =================================================================
// POTION - Round flask/bottle with colored liquid inside
// Centered, with cork on top, round body, liquid fill
// =================================================================
export const POTION_16: SpriteTemplate = {
  name: 'potion_16',
  width: 16,
  height: 16,
  description: 'Round potion flask with cork stopper and colored liquid inside.',
  regions: [
    // Cork (rows 2-3) - small stopper on top
    { name: 'cork', role: 'accessory', pixels: [
      [7, 2], [8, 2],
      [7, 3], [8, 3],
    ]},
    // Neck (rows 4-5) - narrow bottle neck
    { name: 'neck', role: 'head', pixels: [
      [7, 4], [8, 4],
      [7, 5], [8, 5],
    ]},
    // Bottle glass - upper portion above liquid (rows 6-8)
    { name: 'bottle_upper', role: 'body', pixels: [
      // Row 6 - bottle widens
      [5, 6], [6, 6],             [9, 6], [10, 6],
      // Row 7 - widest
      [4, 7],                             [11, 7],
      // Row 8 - widest
      [4, 8],                             [11, 8],
    ]},
    // Bottle glass - lower portion around liquid (rows 9-12)
    { name: 'bottle_lower', role: 'body', pixels: [
      // Row 9 - sides
      [4, 9],                              [11, 9],
      // Row 10 - sides
      [4, 10],                             [11, 10],
      // Row 11 - starts narrowing
      [4, 11],                             [11, 11],
      // Row 12 - bottom of glass
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ]},
    // Liquid fill - inside bottle (rows 7-11)
    { name: 'liquid', role: 'leg', pixels: [
      // Row 7 - liquid surface (slightly wavy)
      [6, 7], [7, 7],        [9, 7],
      // Row 8 - full width inside
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      // Row 9
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      // Row 10
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      // Row 11
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Liquid surface highlight (row 7) - meniscus
    { name: 'liquid_surface', role: 'leg', pixels: [
      [8, 7], [10, 7],
    ]},
    // Glass highlight / shine (rows 6-8) - top-left reflection
    { name: 'highlight', role: 'eye', pixels: [
      [6, 7],
      [5, 8],
      [5, 9],
    ]},
    // Bottle base (row 13) - flat bottom
    { name: 'base', role: 'body', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
  ],
};

// =================================================================
// CHEST - Treasure chest, front-facing, closed
// Slightly wider than tall, centered in grid
// =================================================================
export const CHEST_16: SpriteTemplate = {
  name: 'chest_16',
  width: 16,
  height: 16,
  description: 'Closed treasure chest, front-facing. Wood body with gold lock and trim.',
  regions: [
    // Lid top - domed curve (row 3)
    { name: 'lid_top', role: 'head', pixels: [
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
    ]},
    // Lid body (rows 4-6) - upper half of chest
    { name: 'lid_body', role: 'head', pixels: [
      // Row 4
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      // Row 5
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      // Row 6
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
    ]},
    // Trim band between lid and body (row 7)
    { name: 'trim', role: 'belt', pixels: [
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
    ]},
    // Chest body lower (rows 8-12) - main box
    { name: 'body', role: 'body', pixels: [
      // Row 8
      [3, 8], [4, 8], [5, 8], [6, 8],                 [9, 8], [10, 8], [11, 8], [12, 8],
      // Row 9
      [3, 9], [4, 9], [5, 9], [6, 9],                 [9, 9], [10, 9], [11, 9], [12, 9],
      // Row 10
      [3, 10], [4, 10], [5, 10], [6, 10],              [9, 10], [10, 10], [11, 10], [12, 10],
      // Row 11
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      // Row 12
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
    ]},
    // Lock plate and keyhole (rows 8-10, center)
    { name: 'lock', role: 'accessory', pixels: [
      // Lock plate
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      // Keyhole
      [7, 10], [8, 10],
    ]},
    // Bottom trim / feet (row 13)
    { name: 'bottom_trim', role: 'belt', pixels: [
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
    ]},
  ],
};

// =================================================================
// HEART - Health/life heart icon, classic shape
// Centered, two bumps at top tapering to point at bottom
// =================================================================
export const HEART_16: SpriteTemplate = {
  name: 'heart_16',
  width: 16,
  height: 16,
  description: 'Classic heart shape for health/life. Red body with pink highlight.',
  regions: [
    // Heart body - classic two-bump shape with center point
    { name: 'heart_body', role: 'body', pixels: [
      // Row 3 - top bumps begin
      [3, 3], [4, 3], [5, 3],             [10, 3], [11, 3], [12, 3],
      // Row 4 - bumps widen
      [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4],
      // Row 5 - full width
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      // Row 6 - full width
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      // Row 7 - starts tapering
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      // Row 8 - narrowing
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      // Row 9
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      // Row 10
      [6, 10], [7, 10], [8, 10], [9, 10],
      // Row 11
      [7, 11], [8, 11],
      // Row 12 - bottom point
      [7, 12],
    ]},
    // Highlight - top-left shine on left bump (rows 3-5)
    { name: 'highlight', role: 'eye', pixels: [
      [4, 3], [5, 3],
      [3, 4], [4, 4],
      [3, 5],
    ]},
  ],
};

// =================================================================
// COIN - Gold coin, front-facing circle with center symbol
// Circular shape centered in grid
// =================================================================
export const COIN_16: SpriteTemplate = {
  name: 'coin_16',
  width: 16,
  height: 16,
  description: 'Gold coin with rim and center symbol. Front-facing circular design.',
  regions: [
    // Rim - outer edge of coin forming a circle
    { name: 'rim', role: 'accessory', pixels: [
      // Top arc (row 3)
      [6, 3], [7, 3], [8, 3], [9, 3],
      // Upper sides (row 4)
      [4, 4], [5, 4],                     [10, 4], [11, 4],
      // Left edge (rows 5-10)
      [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10],
      // Right edge (rows 5-10)
      [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10],
      // Lower sides (row 11)
      [4, 11], [5, 11],                   [10, 11], [11, 11],
      // Bottom arc (row 12)
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Coin body - main face inside rim
    { name: 'coin_body', role: 'body', pixels: [
      // Row 4 (inner)
      [6, 4], [7, 4], [8, 4], [9, 4],
      // Row 5
      [4, 5], [5, 5], [6, 5],         [9, 5], [10, 5], [11, 5],
      // Row 6
      [4, 6], [5, 6], [6, 6],         [9, 6], [10, 6], [11, 6],
      // Row 7
      [4, 7], [5, 7],                         [10, 7], [11, 7],
      // Row 8
      [4, 8], [5, 8],                         [10, 8], [11, 8],
      // Row 9
      [4, 9], [5, 9], [6, 9],         [9, 9], [10, 9], [11, 9],
      // Row 10
      [4, 10], [5, 10], [6, 10],      [9, 10], [10, 10], [11, 10],
      // Row 11 (inner)
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
    // Center symbol - star/$ mark (rows 5-10, centered)
    { name: 'symbol', role: 'belt', pixels: [
      // Star/dollar vertical bar
      [7, 5], [8, 5],
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      // Star/dollar horizontal bars
      [6, 7], [9, 7],
      [6, 8], [9, 8],
    ]},
  ],
};

// =================================================================
// GEM - Cut gemstone with diamond shape and facets
// Diamond/hexagonal shape, centered, with shine
// =================================================================
export const GEM_16: SpriteTemplate = {
  name: 'gem_16',
  width: 16,
  height: 16,
  description: 'Cut gemstone with diamond shape and visible facets. Blue gem with white highlight.',
  regions: [
    // Top facet (rows 3-5) - upper portion of gem, lighter
    { name: 'top_facet', role: 'head', pixels: [
      // Row 3 - top point
      [7, 3], [8, 3],
      // Row 4 - widens
      [6, 4], [7, 4], [8, 4], [9, 4],
      // Row 5 - wider still
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
    ]},
    // Crown / widest band (rows 6-7)
    { name: 'crown_facets', role: 'body', pixels: [
      // Row 6 - widest
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      // Row 7 - widest
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
    ]},
    // Left facet (rows 8-10) - lower left
    { name: 'left_facet', role: 'body', pixels: [
      [5, 8], [6, 8], [7, 8],
      [6, 9], [7, 9],
      [7, 10],
    ]},
    // Right facet (rows 8-10) - lower right
    { name: 'right_facet', role: 'body', pixels: [
      [8, 8], [9, 8], [10, 8],
      [8, 9], [9, 9],
      [8, 10],
    ]},
    // Bottom point (rows 11-12) - pavilion tip
    { name: 'bottom_point', role: 'leg', pixels: [
      [7, 11], [8, 11],
      [7, 12],
    ]},
    // Highlight - top-left facet shine
    { name: 'highlight', role: 'eye', pixels: [
      [7, 3],
      [6, 4], [7, 4],
      [5, 5], [6, 5],
      [5, 6],
    ]},
    // Girdle line - dividing line between crown and pavilion (row 8 edges)
    { name: 'girdle', role: 'accessory', pixels: [
      [4, 8], [11, 8],
    ]},
  ],
};

// =================================================================
// KEY - Ornate key with decorative bow, shaft, and teeth
// Vertical orientation, bow at top, teeth at bottom
// =================================================================
export const KEY_16: SpriteTemplate = {
  name: 'key_16',
  width: 16,
  height: 16,
  description: 'Ornate golden key. Decorative bow loop at top, long shaft, notched teeth at bottom.',
  regions: [
    // Bow - decorative loop at top (rows 1-5)
    { name: 'bow_outer', role: 'head', pixels: [
      // Row 1 - top of loop
      [6, 1], [7, 1], [8, 1], [9, 1],
      // Row 2 - sides of loop
      [5, 2],                   [10, 2],
      // Row 3 - sides of loop
      [5, 3],                   [10, 3],
      // Row 4 - sides of loop
      [5, 4],                   [10, 4],
      // Row 5 - bottom of loop, connects to shaft
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Bow inner - hollow center of the loop
    { name: 'bow_inner', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    // Shaft (rows 6-11) - long narrow bar
    { name: 'shaft', role: 'body', pixels: [
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
    ]},
    // Teeth / ward (rows 12-14) - notched key bit at bottom
    { name: 'teeth', role: 'accessory', pixels: [
      // Row 12 - first tooth extends right
      [7, 12], [8, 12], [9, 12], [10, 12],
      // Row 13 - notch (gap at 9) then tooth
      [7, 13], [8, 13],          [10, 13],
      // Row 14 - bottom tooth
      [7, 14], [8, 14], [9, 14], [10, 14],
    ]},
  ],
};

// =================================================================
// AXE - One-handed battle axe with broad steel head
// Vertical orientation with wooden haft and wrapped grip
// =================================================================
export const AXE_16: SpriteTemplate = {
  name: 'battle_axe_16',
  width: 16,
  height: 16,
  description: 'One-handed battle axe with broad steel head, sharpened edge, wooden haft, and wrapped grip.',
  regions: [
    { name: 'axe_head', role: 'head', pixels: [
      [8, 1],
      [7, 2], [8, 2], [9, 2],
      [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [7, 5], [8, 5], [9, 5],
    ]},
    { name: 'axe_beard', role: 'accessory', pixels: [
      [10, 5], [10, 6], [9, 6], [10, 7], [9, 7],
    ]},
    { name: 'axe_edge', role: 'eye', pixels: [
      [8, 2], [9, 3], [9, 4],
    ]},
    { name: 'haft', role: 'body', pixels: [
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ]},
    { name: 'grip_wrap', role: 'belt', pixels: [
      [7, 13], [8, 13],
      [7, 14], [8, 14],
    ]},
    { name: 'pommel', role: 'boot', pixels: [
      [6, 15], [7, 15], [8, 15], [9, 15],
    ]},
  ],
};

// =================================================================
// BOW - Recurve bow with central grip and taut string
// Front-facing icon style suitable for inventory UI
// =================================================================
export const BOW_16: SpriteTemplate = {
  name: 'hunter_bow_16',
  width: 16,
  height: 16,
  description: 'Recurve bow with pronounced limbs, taut string, and leather-wrapped center grip.',
  regions: [
    { name: 'limbs_outer', role: 'head', pixels: [
      [6, 1], [10, 1],
      [6, 2], [10, 2],
      [5, 3], [11, 3],
      [5, 4], [11, 4],
      [4, 5], [12, 5],
      [4, 6], [12, 6],
      [4, 7], [12, 7],
      [4, 8], [12, 8],
      [4, 9], [12, 9],
      [4, 10], [12, 10],
      [5, 11], [11, 11],
      [5, 12], [11, 12],
      [6, 13], [10, 13],
      [6, 14], [10, 14],
    ]},
    { name: 'limbs_inner', role: 'body', pixels: [
      [7, 3], [9, 3],
      [6, 4], [10, 4],
      [6, 5], [10, 5],
      [5, 6], [11, 6],
      [5, 7], [11, 7],
      [5, 8], [11, 8],
      [5, 9], [11, 9],
      [6, 10], [10, 10],
      [6, 11], [10, 11],
      [7, 12], [9, 12],
    ]},
    { name: 'string', role: 'accessory', pixels: [
      [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7],
      [8, 8], [8, 9], [8, 10], [8, 11], [8, 12], [8, 13],
    ]},
    { name: 'grip', role: 'belt', pixels: [
      [7, 7], [9, 7],
      [7, 8], [9, 8],
      [7, 9], [9, 9],
    ]},
    { name: 'nock_wraps', role: 'boot', pixels: [
      [7, 6], [9, 6], [7, 10], [9, 10],
    ]},
    { name: 'tips', role: 'eye', pixels: [
      [6, 1], [10, 1], [6, 14], [10, 14],
    ]},
  ],
};

// =================================================================
// SPELLBOOK - Arcane tome with clasp, rune, and hanging bookmark
// =================================================================
export const SPELLBOOK_16: SpriteTemplate = {
  name: 'spellbook_16',
  width: 16,
  height: 16,
  description: 'Arcane spellbook with thick leather cover, metal clasp, etched rune, and cloth bookmark.',
  regions: [
    { name: 'cover_top', role: 'head', pixels: [
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
    ]},
    { name: 'cover_body', role: 'body', pixels: [
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
    ]},
    { name: 'pages', role: 'face', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
    ]},
    { name: 'spine', role: 'arm', pixels: [
      [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11],
      [4, 12], [5, 12],
    ]},
    { name: 'clasp', role: 'belt', pixels: [
      [11, 6], [12, 6],
      [11, 7], [12, 7],
      [11, 8], [12, 8],
      [11, 9], [12, 9],
    ]},
    { name: 'bookmark', role: 'accessory', pixels: [
      [8, 12], [8, 13], [9, 13],
    ]},
    { name: 'rune', role: 'eye', pixels: [
      [8, 7], [9, 7], [8, 8],
    ]},
    { name: 'bottom_edge', role: 'boot', pixels: [
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
    ]},
  ],
};

// =================================================================
// BOMB - Classic lit bomb with short fuse and metallic body shine
// =================================================================
export const BOMB_16: SpriteTemplate = {
  name: 'bomb_16',
  width: 16,
  height: 16,
  description: 'Classic cartoon bomb with lit fuse, round iron shell, seam, and bright spark.',
  regions: [
    { name: 'fuse', role: 'accessory', pixels: [
      [8, 1], [8, 2], [9, 2], [9, 3],
    ]},
    { name: 'spark', role: 'eye', pixels: [
      [10, 1], [11, 0], [11, 1],
    ]},
    { name: 'cap', role: 'head', pixels: [
      [7, 3], [8, 3], [9, 3],
    ]},
    { name: 'shell', role: 'body', pixels: [
      [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
      [7, 12], [8, 12], [9, 12],
    ]},
    { name: 'shell_seam', role: 'belt', pixels: [
      [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    ]},
    { name: 'shine', role: 'boot', pixels: [
      [6, 6], [6, 7], [5, 7],
    ]},
  ],
};

// =================================================================
// SCROLL - Rolled parchment with ribbon tie and wax seal
// =================================================================
export const SCROLL_16: SpriteTemplate = {
  name: 'arcane_scroll_16',
  width: 16,
  height: 16,
  description: 'Rolled parchment scroll with curled ends, center ribbon tie, and wax seal.',
  regions: [
    { name: 'top_roll', role: 'head', pixels: [
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [4, 4], [11, 4],
    ]},
    { name: 'parchment', role: 'body', pixels: [
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ]},
    { name: 'text_lines', role: 'accessory', pixels: [
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [7, 7], [8, 7],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10],
    ]},
    { name: 'ribbon', role: 'belt', pixels: [
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    ]},
    { name: 'seal', role: 'eye', pixels: [
      [7, 8], [8, 8],
    ]},
    { name: 'bottom_roll', role: 'leg', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
      [4, 13], [11, 13],
    ]},
    { name: 'curl_shadow', role: 'boot', pixels: [
      [4, 4], [11, 4], [4, 13], [11, 13],
    ]},
  ],
};

// =================================================================
// RING - Gem ring icon with metallic band and top gem setting
// =================================================================
export const RING_16: SpriteTemplate = {
  name: 'jeweled_ring_16',
  width: 16,
  height: 16,
  description: 'Ornate ring with circular gold band, pronged setting, and bright center gem.',
  regions: [
    { name: 'gem_core', role: 'eye', pixels: [
      [7, 3], [8, 3],
    ]},
    { name: 'gem_setting', role: 'head', pixels: [
      [7, 4], [8, 4],
    ]},
    { name: 'prongs', role: 'accessory', pixels: [
      [6, 4], [9, 4],
    ]},
    { name: 'band_outer', role: 'body', pixels: [
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 6], [6, 6], [9, 6], [10, 6],
      [4, 7], [5, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [10, 8], [11, 8],
      [5, 9], [6, 9], [9, 9], [10, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    { name: 'band_inner_shine', role: 'belt', pixels: [
      [7, 6], [8, 6],
      [6, 7], [9, 7],
      [6, 8], [9, 8],
      [7, 9], [8, 9],
    ]},
    { name: 'ground_shadow', role: 'boot', pixels: [
      [7, 11], [8, 11],
    ]},
  ],
};


// =================================================================
// COLOR SCHEMES - DB16 palette, 3 tones per role (shadow/base/highlight)
// =================================================================

/**
 * DB16 palette reference:
 * #140c1c  black          #d04648  red
 * #442434  dark purple    #757161  olive grey
 * #30346d  navy           #597dce  blue
 * #4e4a4e  dark grey      #d27d2c  orange
 * #854c30  brown          #8595a1  light grey
 * #346524  forest green   #6dc2ca  teal
 * #dad45e  yellow         #deeed6  cream/white
 * #d2aa99  peach/skin
 */

export const SWORD_COLORS: ColorScheme = {
  name: 'sword_default',
  mapping: {
    body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // silver blade
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // gold guard
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // brown leather grip
    boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // gold pommel
    head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // unused fallback
    face:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
    arm:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    hand:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    leg:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  },
};

export const SHIELD_COLORS: ColorScheme = {
  name: 'shield_default',
  mapping: {
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // blue field
    accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // silver border
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // gold emblem
    head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // unused fallback
    face:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    hand:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    boot:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  },
};

export const POTION_COLORS: ColorScheme = {
  name: 'potion_default',
  mapping: {
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // brown cork
    head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' }, // clear glass neck
    body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' }, // clear glass body
    leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // red liquid
    eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, // white glass shine
    face:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    hand:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    boot:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  },
};

export const CHEST_COLORS: ColorScheme = {
  name: 'chest_default',
  mapping: {
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wood lid
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wood body
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // gold lock
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // gold trim
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    eye:       { shadow: '#dad45e', base: '#dad45e', highlight: '#dad45e' },
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const HEART_COLORS: ColorScheme = {
  name: 'heart_default',
  mapping: {
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // red heart
    eye:       { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' }, // pink/white highlight
    head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    face:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    arm:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    boot:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  },
};

export const COIN_COLORS: ColorScheme = {
  name: 'coin_default',
  mapping: {
    body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // gold coin face
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // gold rim (slightly darker)
    belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // bright gold symbol
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    eye:       { shadow: '#dad45e', base: '#dad45e', highlight: '#deeed6' },
    arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    hand:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  },
};

export const GEM_COLORS: ColorScheme = {
  name: 'gem_default',
  mapping: {
    head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // blue top facet
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // blue main facets
    leg:       { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' }, // dark bottom point
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, // white highlight
    accessory: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // dark girdle edge
    face:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    hand:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    boot:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  },
};

export const KEY_COLORS: ColorScheme = {
  name: 'key_default',
  mapping: {
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // gold bow
    body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // gold shaft
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // gold teeth
    face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    eye:       { shadow: '#dad45e', base: '#dad45e', highlight: '#deeed6' },
    arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    hand:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  },
};

export const AXE_COLORS: ColorScheme = {
  name: 'battle_axe_default',
  mapping: {
    head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' }, // steel axe head
    accessory: { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' }, // tempered steel edge/beard
    eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, // specular glint
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wooden haft
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' }, // grip wrap
    boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // metal pommel
    face:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const BOW_COLORS: ColorScheme = {
  name: 'hunter_bow_default',
  mapping: {
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // outer limbs
    body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // inner limbs
    accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, // bow string
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' }, // leather grip
    boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // nock wraps
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, // tips glint
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const SPELLBOOK_COLORS: ColorScheme = {
  name: 'spellbook_default',
  mapping: {
    head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // top cover
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // leather cover
    face:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // pages
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // spine
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // clasp
    accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // bookmark cloth
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, // arcane rune glow
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' }, // bottom edge
    hand:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  },
};

export const BOMB_COLORS: ColorScheme = {
  name: 'bomb_default',
  mapping: {
    body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // iron shell
    head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // fuse cap
    accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' }, // fuse rope
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // seam line
    eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // spark
    boot:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // shell shine
    face:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
    arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
    hand:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
    leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  },
};

export const SCROLL_COLORS: ColorScheme = {
  name: 'arcane_scroll_default',
  mapping: {
    head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // top roll parchment
    body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' }, // parchment sheet
    accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // ink text
    belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // ribbon tie
    eye:       { shadow: '#d04648', base: '#d04648', highlight: '#deeed6' }, // wax seal
    leg:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // bottom roll parchment
    boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, // curled shadows
    face:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
    arm:       { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
    hand:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  },
};

export const RING_COLORS: ColorScheme = {
  name: 'jeweled_ring_default',
  mapping: {
    body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // gold band
    belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // inner shine
    head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // gem body
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, // gem sparkle
    accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // setting prongs
    boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, // cast shadow
    face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    hand:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  },
};


// =================================================================
// Exports - aggregate records
// =================================================================

export const ITEM_TEMPLATES: Record<string, SpriteTemplate> = {
  sword_16: SWORD_16,
  shield_16: SHIELD_16,
  potion_16: POTION_16,
  chest_16: CHEST_16,
  heart_16: HEART_16,
  coin_16: COIN_16,
  gem_16: GEM_16,
  key_16: KEY_16,
  battle_axe_16: AXE_16,
  hunter_bow_16: BOW_16,
  spellbook_16: SPELLBOOK_16,
  bomb_16: BOMB_16,
  arcane_scroll_16: SCROLL_16,
  jeweled_ring_16: RING_16,
};

export const ITEM_COLOR_SCHEMES: Record<string, ColorScheme> = {
  sword_default: SWORD_COLORS,
  shield_default: SHIELD_COLORS,
  potion_default: POTION_COLORS,
  chest_default: CHEST_COLORS,
  heart_default: HEART_COLORS,
  coin_default: COIN_COLORS,
  gem_default: GEM_COLORS,
  key_default: KEY_COLORS,
  battle_axe_default: AXE_COLORS,
  hunter_bow_default: BOW_COLORS,
  spellbook_default: SPELLBOOK_COLORS,
  bomb_default: BOMB_COLORS,
  arcane_scroll_default: SCROLL_COLORS,
  jeweled_ring_default: RING_COLORS,
};
