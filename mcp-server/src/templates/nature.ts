/**
 * 16x16 natural environment prop templates.
 * Standalone nature elements (not tileable ground, but placed objects).
 * Uses the DB16 palette for all color schemes.
 *
 * Templates reuse the same SpriteRegion roles from humanoid16.ts
 * to stay compatible with the existing rendering/coloring pipeline.
 *
 * Role mapping for nature props:
 * - 'body'      = main fill / primary mass
 * - 'head'      = secondary structure / stem / trunk
 * - 'accessory' = accent / bright detail
 * - 'eye'       = special highlight / glow
 * - 'belt'      = base / ground contact
 * - 'leg'       = darker area / shadow
 * - 'arm'       = thin detail / vein / crack
 *
 * DB16 palette reference:
 * #140c1c  black          #d04648  red
 * #442434  dark purple    #757161  olive grey
 * #30346d  navy           #597dce  blue
 * #4e4a4e  dark grey      #d27d2c  orange
 * #854c30  brown          #8595a1  light grey
 * #346524  forest green   #6dc2ca  teal
 * #dad45e  yellow         #deeed6  cream/white
 * #d2aa99  peach/skin     #6daa2c  green
 *
 * Templates included:
 * - FLOWER_16    Small flower with stem, leaves, and petals
 * - MUSHROOM_16  Fantasy mushroom with spotted cap
 * - BUSH_16      Green bush, rounded leafy mass
 * - ROCK_16      Boulder with cracks and moss hints
 * - CRYSTAL_16   Glowing crystal cluster
 * - VINE_16      Hanging vine with small leaves
 * - POND_16      Small pond with lily pad
 * - STUMP_16     Tree stump with growth rings and sprout
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// FLOWER_16 - Small flower with green stem, leaves, colorful petals
// 5-petal flower centered near top, stem runs down center
// ═══════════════════════════════════════════════════════════════
export const FLOWER_16: SpriteTemplate = {
  name: 'flower_16',
  width: 16,
  height: 16,
  description: 'Small flower. Green stem, 2-3 leaves, colorful 5-petal flower top.',
  regions: [
    // Petals (5-petal arrangement around center)
    { name: 'petals', role: 'body', pixels: [
      // Top petal (rows 2-3)
      [7, 2], [8, 2],
      [7, 3], [8, 3],
      // Left petal (rows 4-5)
      [5, 4], [6, 4],
      [5, 5], [6, 5],
      // Right petal (rows 4-5)
      [9, 4], [10, 4],
      [9, 5], [10, 5],
      // Bottom-left petal (rows 6-7)
      [6, 6], [6, 7],
      // Bottom-right petal (rows 6-7)
      [9, 6], [9, 7],
    ]},
    // Flower center (pistil)
    { name: 'center', role: 'accessory', pixels: [
      [7, 4], [8, 4],
      [7, 5], [8, 5],
    ]},
    // Petal highlight
    { name: 'petal_highlight', role: 'eye', pixels: [
      [7, 2],
      [5, 4],
    ]},
    // Stem (green, vertical)
    { name: 'stem', role: 'head', pixels: [
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8],
      [7, 9],
      [7, 10],
      [7, 11],
      [7, 12],
      [7, 13],
    ]},
    // Leaves on stem
    { name: 'leaves', role: 'leg', pixels: [
      // Left leaf (row 9-10)
      [5, 9], [6, 9],
      [5, 10], [6, 10],
      // Right leaf (row 11-12)
      [8, 11], [9, 11],
      [8, 12], [9, 12],
    ]},
    // Ground base
    { name: 'ground', role: 'belt', pixels: [
      [6, 14], [7, 14], [8, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// MUSHROOM_16 - Fantasy mushroom with red spotted cap, white stem
// Dome-shaped cap on top, cylindrical stem below
// ═══════════════════════════════════════════════════════════════
export const MUSHROOM_16: SpriteTemplate = {
  name: 'mushroom_16',
  width: 16,
  height: 16,
  description: 'Fantasy mushroom. Red spotted dome cap, white stem, small detail at base.',
  regions: [
    // Cap dome (rows 2-7)
    { name: 'cap', role: 'body', pixels: [
      // Row 2 - cap top
      [6, 2], [7, 2], [8, 2], [9, 2],
      // Row 3 - wider
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      // Row 4 - widest
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      // Row 5 - widest
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      // Row 6 - slightly narrower
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      // Row 7 - cap lip / underside
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
    ]},
    // Cap spots (white dots on cap)
    { name: 'cap_spots', role: 'accessory', pixels: [
      [7, 2], [8, 2],
      [5, 3], [10, 3],
      [4, 5], [7, 4], [11, 5],
      [6, 6], [9, 6],
    ]},
    // Cap highlight (shine)
    { name: 'cap_highlight', role: 'eye', pixels: [
      [5, 3], [6, 3],
      [4, 4], [5, 4],
    ]},
    // Stem (rows 8-12)
    { name: 'stem', role: 'head', pixels: [
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ]},
    // Base detail (small ring at ground)
    { name: 'base', role: 'belt', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BUSH_16 - Green bush, rounded leafy mass, wider than tall
// Organic rounded shape with leaf detail and shadow at bottom
// ═══════════════════════════════════════════════════════════════
export const BUSH_16: SpriteTemplate = {
  name: 'bush_16',
  width: 16,
  height: 16,
  description: 'Green bush. Rounded leafy mass, slightly wider than tall, darker shading at bottom.',
  regions: [
    // Bush leaf mass (main body)
    { name: 'leaves', role: 'body', pixels: [
      // Row 3 - top of bush
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      // Row 4
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      // Row 5 - widest
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      // Row 6 - widest
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      // Row 7
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      // Row 8
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      // Row 9
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      // Row 10
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      // Row 11
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
    ]},
    // Leaf highlights (lighter spots)
    { name: 'leaf_highlights', role: 'accessory', pixels: [
      [6, 3], [9, 3],
      [4, 4], [8, 4], [11, 4],
      [3, 5], [7, 5], [12, 5],
      [5, 6], [10, 6],
      [4, 7], [9, 7],
      [6, 8], [11, 8],
    ]},
    // Leaf shadow (darker bottom patches)
    { name: 'leaf_shadow', role: 'leg', pixels: [
      [5, 9], [8, 9], [11, 9],
      [6, 10], [9, 10],
      [5, 11], [8, 11], [10, 11],
    ]},
    // Ground shadow (dark base)
    { name: 'ground_shadow', role: 'belt', pixels: [
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ]},
    // Berry or bright detail
    { name: 'berry', role: 'eye', pixels: [
      [6, 5], [10, 7],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// ROCK_16 - Boulder/rock with irregular shape, cracks, moss hints
// Rounded stone, slightly asymmetric, with texture detail
// ═══════════════════════════════════════════════════════════════
export const ROCK_16: SpriteTemplate = {
  name: 'rock_16',
  width: 16,
  height: 16,
  description: 'Boulder/rock. Irregular rounded stone shape with cracks and moss hints.',
  regions: [
    // Rock main body
    { name: 'rock_body', role: 'body', pixels: [
      // Row 4 - top of rock
      [6, 4], [7, 4], [8, 4], [9, 4],
      // Row 5
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      // Row 6
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      // Row 7
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      // Row 8
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      // Row 9 - widest
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      // Row 10
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
      // Row 11
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      // Row 12
      [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12],
    ]},
    // Rock highlight (top-left shine)
    { name: 'rock_highlight', role: 'eye', pixels: [
      [6, 4], [7, 4],
      [4, 5], [5, 5],
      [3, 6], [4, 6],
      [3, 7],
    ]},
    // Rock shadow (bottom-right darker area)
    { name: 'rock_shadow', role: 'leg', pixels: [
      [11, 8], [12, 8], [13, 8],
      [11, 9], [12, 9], [13, 9],
      [10, 10], [11, 10], [12, 10], [13, 10],
      [10, 11], [11, 11], [12, 11],
      [10, 12], [11, 12],
    ]},
    // Crack lines (thin detail)
    { name: 'cracks', role: 'arm', pixels: [
      [7, 6], [8, 7], [8, 8], [7, 9],
      [5, 8], [5, 9],
    ]},
    // Moss patches (green accent on top)
    { name: 'moss', role: 'accessory', pixels: [
      [8, 4], [9, 4],
      [10, 5], [11, 5],
      [6, 5],
    ]},
    // Ground contact
    { name: 'ground', role: 'belt', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CRYSTAL_16 - Glowing crystal cluster, 2-3 pointed shards
// Bright core with color gradient, jutting upward from base
// ═══════════════════════════════════════════════════════════════
export const CRYSTAL_16: SpriteTemplate = {
  name: 'crystal_16',
  width: 16,
  height: 16,
  description: 'Glowing crystal cluster. 2-3 pointed shards jutting upward, bright core, color gradient.',
  regions: [
    // Tallest shard (center, rows 1-12)
    { name: 'shard_center', role: 'body', pixels: [
      // Tip (row 1)
      [7, 1],
      // Upper (rows 2-5)
      [7, 2], [8, 2],
      [7, 3], [8, 3],
      [6, 4], [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      // Middle (rows 6-9)
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      // Lower (rows 10-12)
      [6, 10], [7, 10], [8, 10], [9, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ]},
    // Left shard (shorter, rows 4-11)
    { name: 'shard_left', role: 'body', pixels: [
      [4, 4],
      [4, 5], [5, 5],
      [4, 6], [5, 6],
      [3, 7], [4, 7], [5, 7],
      [3, 8], [4, 8], [5, 8],
      [3, 9], [4, 9], [5, 9],
      [4, 10], [5, 10],
      [4, 11], [5, 11],
    ]},
    // Right shard (shortest, rows 5-11)
    { name: 'shard_right', role: 'body', pixels: [
      [11, 5],
      [10, 6], [11, 6],
      [10, 7], [11, 7],
      [10, 8], [11, 8], [12, 8],
      [10, 9], [11, 9], [12, 9],
      [10, 10], [11, 10],
      [10, 11], [11, 11],
    ]},
    // Crystal core glow (brightest center)
    { name: 'core_glow', role: 'eye', pixels: [
      [7, 4], [8, 4],
      [7, 5], [8, 5],
      [7, 6], [8, 6],
      [4, 7], [5, 7],
      [11, 8],
    ]},
    // Crystal edge highlight (left facet)
    { name: 'edge_highlight', role: 'accessory', pixels: [
      [7, 1], [7, 2],
      [6, 4], [6, 5], [6, 6],
      [4, 4], [4, 5], [4, 6],
      [3, 7], [3, 8],
      [11, 5], [11, 6],
    ]},
    // Crystal base / ground cluster
    { name: 'base', role: 'belt', pixels: [
      [3, 12], [4, 12], [5, 12], [6, 12], [9, 12], [10, 12], [11, 12], [12, 12],
      [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// VINE_16 - Hanging vine/ivy with small leaves
// Vertical trailing vines suitable for wall overlay
// ═══════════════════════════════════════════════════════════════
export const VINE_16: SpriteTemplate = {
  name: 'hanging_vine_16',
  width: 16,
  height: 16,
  description: 'Hanging vine/ivy. Vertical trailing vines with small leaves, wall overlay.',
  regions: [
    // Main vine stems (thin vertical lines)
    { name: 'vine_stem', role: 'head', pixels: [
      // Left vine
      [4, 0], [4, 1], [4, 2], [4, 3], [5, 4], [5, 5], [5, 6], [4, 7], [4, 8], [4, 9],
      [5, 10], [5, 11], [5, 12], [4, 13], [4, 14],
      // Right vine
      [10, 0], [10, 1], [11, 2], [11, 3], [11, 4], [10, 5], [10, 6], [10, 7],
      [11, 8], [11, 9], [11, 10], [10, 11], [10, 12],
    ]},
    // Leaves on left vine
    { name: 'leaves_left', role: 'body', pixels: [
      // Leaf 1 (row 2-3, left of stem)
      [2, 2], [3, 2],
      [2, 3], [3, 3],
      // Leaf 2 (row 5-6, right of stem)
      [6, 5], [7, 5],
      [6, 6], [7, 6],
      // Leaf 3 (row 9-10, left of stem)
      [2, 9], [3, 9],
      [2, 10], [3, 10],
      // Leaf 4 (row 13-14, right of stem)
      [5, 13], [6, 13],
      [5, 14], [6, 14],
    ]},
    // Leaves on right vine
    { name: 'leaves_right', role: 'body', pixels: [
      // Leaf 5 (row 1-2, right of stem)
      [12, 1], [13, 1],
      [12, 2], [13, 2],
      // Leaf 6 (row 5-6, left of stem)
      [8, 5], [9, 5],
      [8, 6], [9, 6],
      // Leaf 7 (row 9-10, right of stem)
      [12, 9], [13, 9],
      [12, 10], [13, 10],
    ]},
    // Leaf highlights
    { name: 'leaf_highlights', role: 'accessory', pixels: [
      [2, 2], [6, 5], [2, 9], [5, 13],
      [12, 1], [8, 5], [12, 9],
    ]},
    // Tendril tips (curling vine ends)
    { name: 'tendrils', role: 'arm', pixels: [
      [3, 15], [4, 15],
      [9, 13], [10, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// POND_16 - Small pond/puddle with lily pad and reflection
// Oval water surface filling lower portion, lily pad accent
// ═══════════════════════════════════════════════════════════════
export const POND_16: SpriteTemplate = {
  name: 'pond_16',
  width: 16,
  height: 16,
  description: 'Small pond/puddle. Oval water surface with lily pad and reflection highlights.',
  regions: [
    // Water surface (main pond body)
    { name: 'water', role: 'body', pixels: [
      // Row 4 - top edge of pond
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      // Row 5
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      // Row 6
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      // Row 7
      [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7],
      // Row 8
      [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
      // Row 9
      [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9],
      // Row 10
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
      // Row 11
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      // Row 12
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ]},
    // Reflection highlights (light streaks on water)
    { name: 'reflections', role: 'eye', pixels: [
      [6, 5], [7, 5],
      [3, 7], [4, 7],
      [10, 9], [11, 9],
      [7, 11], [8, 11],
    ]},
    // Water depth (darker spots)
    { name: 'depth', role: 'leg', pixels: [
      [6, 8], [7, 8],
      [5, 9], [8, 9],
      [6, 10], [7, 10], [8, 10],
    ]},
    // Lily pad (green oval on surface)
    { name: 'lily_pad', role: 'accessory', pixels: [
      [10, 5], [11, 5],
      [9, 6], [10, 6], [11, 6], [12, 6],
      [10, 7], [11, 7],
    ]},
    // Pond edge / bank (ground rim)
    { name: 'bank', role: 'belt', pixels: [
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [2, 5], [13, 5],
      [0, 7], [15, 7],
      [0, 8], [15, 8],
      [0, 9], [15, 9],
      [1, 10], [14, 10],
      [2, 11], [13, 11],
      [4, 12], [11, 12],
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// STUMP_16 - Tree stump with growth rings visible on top
// Cut trunk with ring detail, small sprout growing from side
// ═══════════════════════════════════════════════════════════════
export const STUMP_16: SpriteTemplate = {
  name: 'stump_16',
  width: 16,
  height: 16,
  description: 'Tree stump. Cut trunk with growth rings on top, small sprout from side.',
  regions: [
    // Top face (cut surface with rings visible)
    { name: 'top_face', role: 'head', pixels: [
      // Row 3 - top of stump face
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      // Row 4
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      // Row 5
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      // Row 6 - bottom of visible top face
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
    ]},
    // Growth rings (concentric detail on top face)
    { name: 'rings', role: 'arm', pixels: [
      [6, 3], [9, 3],
      [5, 4], [10, 4],
      [5, 5], [10, 5],
      [6, 6], [9, 6],
    ]},
    // Ring center (heartwood)
    { name: 'heartwood', role: 'accessory', pixels: [
      [7, 4], [8, 4],
      [7, 5], [8, 5],
    ]},
    // Trunk bark (side of stump, rows 7-12)
    { name: 'bark', role: 'body', pixels: [
      // Row 7
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      // Row 8
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      // Row 9
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      // Row 10
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      // Row 11
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      // Row 12
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ]},
    // Bark texture (darker vertical lines)
    { name: 'bark_texture', role: 'leg', pixels: [
      [5, 7], [8, 7], [11, 7],
      [5, 8], [8, 8], [11, 8],
      [5, 9], [8, 9], [11, 9],
      [6, 10], [9, 10],
      [6, 11], [9, 11],
    ]},
    // Small sprout growing from right side
    { name: 'sprout', role: 'eye', pixels: [
      [12, 7], [13, 7],
      [13, 6],
      [13, 5], [14, 5],
    ]},
    // Ground/roots at base
    { name: 'roots', role: 'belt', pixels: [
      [3, 12], [4, 12], [11, 12], [12, 12],
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
    ]},
  ],
};


// ═══════════════════════════════════════════════════════════════
// Color schemes for nature props (DB16 palette)
// Each maps repurposed roles to {shadow, base, highlight}
// ═══════════════════════════════════════════════════════════════

export const FLOWER_COLORS: ColorScheme = {
  name: 'flower_default',
  mapping: {
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },   // red/pink petals
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // bright yellow center
    eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },   // petal highlight
    head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green stem
    leg:       { shadow: '#346524', base: '#346524', highlight: '#6daa2c' },   // darker green leaves
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // ground base
    arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#6daa2c' },   // (unused)
  },
};

export const MUSHROOM_COLORS: ColorScheme = {
  name: 'mushroom_default',
  mapping: {
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },   // red cap
    accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },   // white cap spots
    eye:       { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },   // cap highlight/shine
    head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },   // white stem
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },   // base ring
    arm:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    leg:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const BUSH_COLORS: ColorScheme = {
  name: 'bush_default',
  mapping: {
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green leaf mass
    accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },   // leaf highlights
    leg:       { shadow: '#140c1c', base: '#346524', highlight: '#346524' },   // dark leaf shadow
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // ground shadow
    eye:       { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },   // berry accent
    head:      { shadow: '#346524', base: '#6daa2c', highlight: '#6daa2c' },   // (unused)
    arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#6daa2c' },   // (unused)
  },
};

export const ROCK_COLORS: ColorScheme = {
  name: 'rock_default',
  mapping: {
    body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },   // grey stone
    eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },   // bright highlight
    leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },   // dark shadow
    arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },   // crack lines
    accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // moss patches
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // ground contact
    head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },   // (unused)
  },
};

export const CRYSTAL_COLORS: ColorScheme = {
  name: 'crystal_default',
  mapping: {
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // blue crystal shards
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },   // bright core glow
    accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },   // edge highlight
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // stone base
    head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // (unused)
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#597dce' },   // (unused)
    leg:       { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },   // (unused)
  },
};

export const VINE_COLORS: ColorScheme = {
  name: 'hanging_vine_default',
  mapping: {
    head:      { shadow: '#346524', base: '#346524', highlight: '#6daa2c' },   // dark vine stem
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green leaves
    accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },   // leaf highlights
    arm:       { shadow: '#442434', base: '#346524', highlight: '#346524' },   // tendril tips
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    belt:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    leg:       { shadow: '#140c1c', base: '#346524', highlight: '#346524' },   // (unused)
  },
};

export const POND_COLORS: ColorScheme = {
  name: 'pond_default',
  mapping: {
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // water surface
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },   // reflection highlights
    leg:       { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },   // water depth
    accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green lily pad
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },   // bank/edge
    head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // (unused)
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#597dce' },   // (unused)
  },
};

export const STUMP_COLORS: ColorScheme = {
  name: 'stump_default',
  mapping: {
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },   // cut top face (light wood)
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#854c30' },   // growth ring lines
    accessory: { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },   // heartwood center
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // bark
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },   // bark texture dark
    eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green sprout
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // roots/ground
  },
};


// ═══════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════

export const NATURE_TEMPLATES: Record<string, SpriteTemplate> = {
  flower_16: FLOWER_16,
  mushroom_16: MUSHROOM_16,
  bush_16: BUSH_16,
  rock_16: ROCK_16,
  crystal_16: CRYSTAL_16,
  hanging_vine_16: VINE_16,
  pond_16: POND_16,
  stump_16: STUMP_16,
};

export const NATURE_COLOR_SCHEMES: Record<string, ColorScheme> = {
  flower_default: FLOWER_COLORS,
  mushroom_default: MUSHROOM_COLORS,
  bush_default: BUSH_COLORS,
  rock_default: ROCK_COLORS,
  crystal_default: CRYSTAL_COLORS,
  hanging_vine_default: VINE_COLORS,
  pond_default: POND_COLORS,
  stump_default: STUMP_COLORS,
};
