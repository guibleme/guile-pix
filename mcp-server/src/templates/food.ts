/**
 * 16x16 food and consumable item templates.
 * Each item is designed to be centered and recognizable within a 16x16 grid.
 * Uses the DB16 palette for all color schemes.
 *
 * Templates reuse the same SpriteRegion roles from humanoid16.ts
 * to stay compatible with the existing rendering/coloring pipeline.
 *
 * Role mapping for food items:
 * - 'body'      = main food mass / primary surface
 * - 'head'      = secondary element (plate, crust top, etc.)
 * - 'accessory' = detail accent (leaf, steam, decoration)
 * - 'eye'       = highlight / shine dot
 * - 'belt'      = border / rim / band
 * - 'leg'       = base / shadow area / underside
 * - 'arm'       = thin detail (stem, handle, crack)
 *
 * Items included:
 * - APPLE_16          Red apple with green leaf and stem
 * - BREAD_16          Loaf of bread with golden crust and slashes
 * - FISH_16           Cooked fish, side view with tail and fins
 * - MEAT_16           Cartoon drumstick with bone
 * - PIE_16            Round pie with crimped edges and steam
 * - ALE_MUG_16        Wooden ale mug with foam overflow
 * - CHEESE_16         Cheese wedge with holes
 * - MUSHROOM_FOOD_16  Edible mushroom on small plate
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// APPLE_16 - Red apple with green leaf and small stem
// Round shape centered in grid, ~45 pixels
// ═══════════════════════════════════════════════════════════════
export const APPLE_16: SpriteTemplate = {
  name: 'apple_16',
  width: 16,
  height: 16,
  description: 'Red apple with green leaf and brown stem. Round shape, front-facing.',
  regions: [
    // Leaf (rows 2-3) - small green leaf at top-right of stem
    { name: 'leaf', role: 'accessory', pixels: [
      [9, 2], [10, 2],
      [10, 3],
    ]},
    // Stem (rows 2-4) - thin brown stem at top center
    { name: 'stem', role: 'arm', pixels: [
      [8, 2],
      [8, 3],
      [8, 4],
    ]},
    // Apple body (rows 4-11) - round red fruit
    { name: 'apple_body', role: 'body', pixels: [
      // Row 4 - top curve, indent around stem
      [6, 4], [7, 4], [9, 4], [10, 4],
      // Row 5 - widens
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      // Row 6 - widest
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      // Row 7 - widest
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      // Row 8 - widest
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      // Row 9 - starts tapering
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      // Row 10 - narrowing
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      // Row 11 - bottom curve
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
    // Highlight - shine on upper-left (rows 5-6)
    { name: 'highlight', role: 'eye', pixels: [
      [5, 5], [6, 5],
      [5, 6],
    ]},
    // Shadow - darker underside (rows 9-11)
    { name: 'shadow', role: 'leg', pixels: [
      [5, 9],
      [5, 10], [6, 10],
      [6, 11],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BREAD_16 - Loaf of bread with golden crust and slash marks
// Rounded top, flat bottom, centered, ~55 pixels
// ═══════════════════════════════════════════════════════════════
export const BREAD_16: SpriteTemplate = {
  name: 'bread_16',
  width: 16,
  height: 16,
  description: 'Loaf of bread, golden brown. Rounded top with slash marks, flat bottom.',
  regions: [
    // Crust top (rows 3-5) - darker golden rounded dome
    { name: 'crust_top', role: 'head', pixels: [
      // Row 3 - top curve
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      // Row 4 - wider
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      // Row 5 - widest crust
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
    ]},
    // Slash marks on crust - diagonal cuts
    { name: 'slashes', role: 'arm', pixels: [
      [6, 4], [8, 4], [10, 4],
      [5, 5], [7, 5], [9, 5],
    ]},
    // Bread body (rows 6-10) - lighter inside visible from front
    { name: 'bread_body', role: 'body', pixels: [
      // Row 6 - widest body
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      // Row 7
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      // Row 8
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      // Row 9
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      // Row 10 - bottom
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
    ]},
    // Bottom crust edge (row 11) - darker base
    { name: 'bottom_crust', role: 'belt', pixels: [
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
    ]},
    // Highlight on body - warm light spot
    { name: 'highlight', role: 'eye', pixels: [
      [5, 6], [6, 6],
      [4, 7],
    ]},
    // Shadow underside
    { name: 'shadow', role: 'leg', pixels: [
      [11, 8], [12, 8],
      [11, 9], [12, 9],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// FISH_16 - Cooked fish, side view with tail and fins visible
// Horizontal layout centered, ~45 pixels
// ═══════════════════════════════════════════════════════════════
export const FISH_16: SpriteTemplate = {
  name: 'fish_16',
  width: 16,
  height: 16,
  description: 'Cooked fish, side view. Body with visible tail fin and dorsal fin.',
  regions: [
    // Dorsal fin (rows 3-4) - top fin
    { name: 'dorsal_fin', role: 'accessory', pixels: [
      [7, 3], [8, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    // Fish body (rows 5-10) - main oval body
    { name: 'fish_body', role: 'body', pixels: [
      // Row 5 - head starts wide
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      // Row 6 - widest
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      // Row 7 - widest
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      // Row 8 - body tapers toward tail
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      // Row 9 - narrowing
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      // Row 10 - narrow before tail
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Eye on fish head (row 6)
    { name: 'eye', role: 'eye', pixels: [
      [4, 6],
    ]},
    // Tail fin (rows 9-12) - fanned out at right
    { name: 'tail', role: 'head', pixels: [
      [11, 9], [12, 9],
      [12, 10], [13, 10],
      [12, 11], [13, 11],
      [11, 12], [12, 12],
    ]},
    // Belly fin (row 10-11) - small ventral fin
    { name: 'belly_fin', role: 'accessory', pixels: [
      [6, 11], [7, 11],
    ]},
    // Fish scale highlights (rows 6-8) - lighter detail on body
    { name: 'scale_highlight', role: 'arm', pixels: [
      [5, 6], [8, 6],
      [6, 7], [9, 7],
      [7, 8],
    ]},
    // Shadow underside
    { name: 'shadow', role: 'leg', pixels: [
      [4, 9], [5, 9],
      [5, 10],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// MEAT_16 - Classic cartoon drumstick with bone
// Angled slightly, bone at right, meat at left, ~40 pixels
// ═══════════════════════════════════════════════════════════════
export const MEAT_16: SpriteTemplate = {
  name: 'meat_16',
  width: 16,
  height: 16,
  description: 'Cartoon drumstick/leg of meat. Brown cooked meat with exposed bone end.',
  regions: [
    // Meat mass (rows 3-9) - large rounded meaty part on left
    { name: 'meat_body', role: 'body', pixels: [
      // Row 3 - top of meat
      [4, 3], [5, 3], [6, 3], [7, 3],
      // Row 4
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4],
      // Row 5 - widest
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5],
      // Row 6 - widest
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6],
      // Row 7
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7],
      // Row 8
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8],
      // Row 9 - bottom of meat
      [5, 9], [6, 9], [7, 9],
    ]},
    // Meat highlight - shiny spot
    { name: 'highlight', role: 'eye', pixels: [
      [4, 4], [5, 4],
      [4, 5],
    ]},
    // Meat shadow - darker underside
    { name: 'shadow', role: 'leg', pixels: [
      [4, 8], [5, 8],
      [5, 9],
    ]},
    // Bone shaft (rows 7-11) - extending right from meat
    { name: 'bone_shaft', role: 'head', pixels: [
      [9, 6], [10, 6],
      [9, 7], [10, 7],
      [10, 8], [11, 8],
      [10, 9], [11, 9],
      [11, 10], [12, 10],
    ]},
    // Bone knob end (rows 10-12) - rounded bone cap
    { name: 'bone_knob', role: 'accessory', pixels: [
      [12, 9], [13, 9],
      [11, 10], [12, 10], [13, 10],
      [12, 11], [13, 11],
    ]},
    // Meat-bone transition - border ring
    { name: 'meat_edge', role: 'belt', pixels: [
      [8, 5], [9, 5],
      [9, 6],
      [8, 7],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// PIE_16 - Round pie from slight angle, crimped edges, steam
// Centered, golden crust, ~55 pixels
// ═══════════════════════════════════════════════════════════════
export const PIE_16: SpriteTemplate = {
  name: 'pie_16',
  width: 16,
  height: 16,
  description: 'Round pie with crimped crust edge, golden top, and steam wisps.',
  regions: [
    // Steam wisps (rows 1-3) - rising from pie
    { name: 'steam', role: 'accessory', pixels: [
      [6, 1], [10, 1],
      [5, 2], [9, 2],
      [6, 3], [10, 3],
    ]},
    // Pie crust top (rows 4-7) - golden domed top
    { name: 'crust_top', role: 'head', pixels: [
      // Row 4
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      // Row 5
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      // Row 6
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      // Row 7
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
    ]},
    // Crust vent slits - diagonal cuts on top
    { name: 'vents', role: 'arm', pixels: [
      [6, 5], [8, 5],
      [7, 6], [9, 6],
    ]},
    // Crimped edge / rim (row 8) - decorative border
    { name: 'crimp_edge', role: 'belt', pixels: [
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
    ]},
    // Pie dish / body side (rows 9-11) - visible dish wall
    { name: 'dish', role: 'body', pixels: [
      // Row 9
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      // Row 10
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      // Row 11 - bottom of dish
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Crust highlight
    { name: 'highlight', role: 'eye', pixels: [
      [5, 5], [6, 5],
      [4, 6],
    ]},
    // Dish shadow
    { name: 'shadow', role: 'leg', pixels: [
      [11, 9], [12, 9],
      [10, 10], [11, 10],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// ALE_MUG_16 - Wooden beer/ale mug with foam overflowing top
// Handle on right side, centered, ~50 pixels
// ═══════════════════════════════════════════════════════════════
export const ALE_MUG_16: SpriteTemplate = {
  name: 'ale_mug_16',
  width: 16,
  height: 16,
  description: 'Wooden ale mug with foamy head overflowing. Handle on right side.',
  regions: [
    // Foam overflow (rows 2-4) - bubbly white foam on top and dripping
    { name: 'foam', role: 'accessory', pixels: [
      // Row 2 - foam peaks
      [5, 2], [6, 2], [8, 2], [9, 2],
      // Row 3 - foam body
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      // Row 4 - foam base meeting mug rim
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
    ]},
    // Foam highlight bubbles
    { name: 'foam_highlight', role: 'eye', pixels: [
      [7, 2],
      [5, 3], [8, 3],
    ]},
    // Mug rim (row 5) - top edge of wooden mug
    { name: 'mug_rim', role: 'belt', pixels: [
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
    ]},
    // Mug body (rows 6-12) - wooden barrel-shaped mug
    { name: 'mug_body', role: 'body', pixels: [
      // Row 6
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      // Row 7
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      // Row 8
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      // Row 9
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      // Row 10
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      // Row 11
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Handle (rows 6-10) - curved handle on right side
    { name: 'handle', role: 'head', pixels: [
      [11, 6], [12, 6],
      [12, 7], [13, 7],
      [12, 8], [13, 8],
      [12, 9], [13, 9],
      [11, 10], [12, 10],
    ]},
    // Mug base (row 12) - bottom edge
    { name: 'mug_base', role: 'belt', pixels: [
      [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ]},
    // Wood band detail - horizontal stave lines
    { name: 'stave_lines', role: 'arm', pixels: [
      [4, 7], [6, 7], [8, 7],
      [5, 10], [7, 10], [9, 10],
    ]},
    // Shadow on mug body
    { name: 'shadow', role: 'leg', pixels: [
      [9, 8], [10, 8],
      [9, 9], [10, 9],
      [9, 11], [10, 11],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CHEESE_16 - Cheese wedge with holes, triangular shape
// Side-view wedge, yellow with darker holes, ~40 pixels
// ═══════════════════════════════════════════════════════════════
export const CHEESE_16: SpriteTemplate = {
  name: 'cheese_16',
  width: 16,
  height: 16,
  description: 'Cheese wedge with holes. Triangular wedge shape, classic yellow cheese.',
  regions: [
    // Cheese top surface (rows 4-6) - angled top face of wedge
    { name: 'cheese_top', role: 'head', pixels: [
      // Row 4 - point of wedge
      [3, 4], [4, 4],
      // Row 5 - growing wider
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
      // Row 6 - wider still
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
    ]},
    // Cheese front face (rows 7-11) - main visible face of wedge
    { name: 'cheese_body', role: 'body', pixels: [
      // Row 7 - full width of wedge
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      // Row 8
      [3, 8], [4, 8], [5, 8], [6, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      // Row 9
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [10, 9], [11, 9], [12, 9],
      // Row 10
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      // Row 11 - bottom
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
    ]},
    // Cheese holes - dark circular holes in body
    { name: 'holes', role: 'arm', pixels: [
      [7, 8],
      [9, 9],
      [5, 10], [6, 10],
    ]},
    // Bottom edge (row 12) - base of wedge on surface
    { name: 'base_edge', role: 'belt', pixels: [
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
    ]},
    // Cheese highlight - light spot on top face
    { name: 'highlight', role: 'eye', pixels: [
      [4, 5], [5, 5],
      [4, 6],
    ]},
    // Shadow on front face
    { name: 'shadow', role: 'leg', pixels: [
      [11, 8], [12, 8],
      [11, 9], [12, 9],
      [11, 10], [12, 10],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// MUSHROOM_FOOD_16 - Edible mushroom with brown cap and white stem
// Simple cap on stem, on small plate, ~35 pixels
// ═══════════════════════════════════════════════════════════════
export const MUSHROOM_FOOD_16: SpriteTemplate = {
  name: 'mushroom_food_16',
  width: 16,
  height: 16,
  description: 'Edible mushroom. Brown cap, white stem, sitting on a small plate.',
  regions: [
    // Mushroom cap (rows 3-6) - rounded brown dome
    { name: 'cap', role: 'body', pixels: [
      // Row 3 - top of cap
      [6, 3], [7, 3], [8, 3], [9, 3],
      // Row 4 - wider
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      // Row 5 - widest
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      // Row 6 - cap underside edge
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
    ]},
    // Cap highlight - shiny dome spot
    { name: 'cap_highlight', role: 'eye', pixels: [
      [6, 3], [7, 3],
      [6, 4],
    ]},
    // Cap spots - lighter speckle detail on cap
    { name: 'cap_spots', role: 'accessory', pixels: [
      [8, 4], [10, 4],
      [5, 5], [9, 5],
    ]},
    // Stem (rows 7-10) - white/cream vertical stem
    { name: 'stem', role: 'head', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [7, 10], [8, 10],
    ]},
    // Plate (rows 11-12) - small dish underneath
    { name: 'plate', role: 'belt', pixels: [
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ]},
    // Stem shadow
    { name: 'stem_shadow', role: 'leg', pixels: [
      [9, 8], [9, 9],
      [8, 10],
    ]},
    // Cap underside gills detail
    { name: 'gills', role: 'arm', pixels: [
      [5, 6], [7, 6], [9, 6],
    ]},
  ],
};


// ═══════════════════════════════════════════════════════════════
// Color schemes for food items (DB16 palette)
// DB16: #140c1c, #442434, #30346d, #4e4a4e, #854c30, #346524,
//       #d04648, #757161, #597dce, #d27d2c, #8595a1, #6daa2c,
//       #d2aa99, #6dc2ca, #dad45e, #deeed6
// ═══════════════════════════════════════════════════════════════

export const APPLE_COLORS: ColorScheme = {
  name: 'apple_default',
  mapping: {
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },  // red apple
    head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },  // (unused)
    accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },  // green leaf
    eye:       { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' },  // shine highlight
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // brown stem
    belt:      { shadow: '#442434', base: '#d04648', highlight: '#d04648' },  // (unused)
    leg:       { shadow: '#442434', base: '#442434', highlight: '#854c30' },  // dark shadow
    face:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },  // (unused)
    hand:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },  // (unused)
    boot:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },  // (unused)
  },
};

export const BREAD_COLORS: ColorScheme = {
  name: 'bread_default',
  mapping: {
    body:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },  // bread interior
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // golden crust top
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },  // (unused)
    eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },  // warm highlight
    arm:       { shadow: '#854c30', base: '#854c30', highlight: '#d27d2c' },  // slash marks
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // bottom crust edge
    leg:       { shadow: '#854c30', base: '#854c30', highlight: '#d27d2c' },  // shadow
    face:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },  // (unused)
    hand:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },  // (unused)
    boot:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },  // (unused)
  },
};

export const FISH_COLORS: ColorScheme = {
  name: 'fish_default',
  mapping: {
    body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },  // cooked fish body
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // tail fin
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // dorsal/belly fins
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#4e4a4e' },  // dark fish eye
    arm:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },  // scale highlights
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },  // (unused)
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#854c30' },  // belly shadow
    face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },  // (unused)
    hand:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },  // (unused)
    boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },  // (unused)
  },
};

export const MEAT_COLORS: ColorScheme = {
  name: 'meat_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // cooked meat
    head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },  // bone
    accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // bone knob
    eye:       { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },  // meat shine
    arm:       { shadow: '#854c30', base: '#854c30', highlight: '#d27d2c' },  // (unused)
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // meat-bone edge
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },  // dark underside
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (unused)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (unused)
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (unused)
  },
};

export const PIE_COLORS: ColorScheme = {
  name: 'pie_default',
  mapping: {
    body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },  // pie dish
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // golden crust top
    accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // steam wisps
    eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },  // crust highlight
    arm:       { shadow: '#854c30', base: '#854c30', highlight: '#d27d2c' },  // vent slits
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // crimped edge
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#854c30' },  // dish shadow
    face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // (unused)
    hand:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // (unused)
    boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // (unused)
  },
};

export const ALE_MUG_COLORS: ColorScheme = {
  name: 'ale_mug_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wooden mug
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },  // handle
    accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },  // foam
    eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },  // foam bubble highlights
    arm:       { shadow: '#442434', base: '#442434', highlight: '#854c30' },  // stave lines
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // rim and base
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },  // mug shadow
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (unused)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (unused)
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (unused)
  },
};

export const CHEESE_COLORS: ColorScheme = {
  name: 'cheese_default',
  mapping: {
    body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // yellow cheese face
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // darker top surface
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#dad45e' },  // (unused)
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },  // highlight
    arm:       { shadow: '#854c30', base: '#854c30', highlight: '#d27d2c' },  // hole shadows
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },  // base edge
    leg:       { shadow: '#854c30', base: '#854c30', highlight: '#d27d2c' },  // face shadow
    face:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // (unused)
    hand:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // (unused)
    boot:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // (unused)
  },
};

export const MUSHROOM_FOOD_COLORS: ColorScheme = {
  name: 'mushroom_food_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // brown cap
    head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },  // white/cream stem
    accessory: { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },  // cap spots
    eye:       { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },  // cap highlight
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#854c30' },  // gill lines
    belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // plate
    leg:       { shadow: '#757161', base: '#8595a1', highlight: '#8595a1' },  // stem shadow
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (unused)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (unused)
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (unused)
  },
};


// ═══════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════

export const FOOD_TEMPLATES: Record<string, SpriteTemplate> = {
  apple_16: APPLE_16,
  bread_16: BREAD_16,
  fish_16: FISH_16,
  meat_16: MEAT_16,
  pie_16: PIE_16,
  ale_mug_16: ALE_MUG_16,
  cheese_16: CHEESE_16,
  mushroom_food_16: MUSHROOM_FOOD_16,
};

export const FOOD_COLOR_SCHEMES: Record<string, ColorScheme> = {
  apple_default: APPLE_COLORS,
  bread_default: BREAD_COLORS,
  fish_default: FISH_COLORS,
  meat_default: MEAT_COLORS,
  pie_default: PIE_COLORS,
  ale_mug_default: ALE_MUG_COLORS,
  cheese_default: CHEESE_COLORS,
  mushroom_food_default: MUSHROOM_FOOD_COLORS,
};
