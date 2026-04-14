/**
 * 16x16 dungeon/roguelike tile templates.
 * Designed for top-down or front-facing dungeon crawler environments.
 *
 * Role mapping for dungeon tiles:
 * - 'body'      = main surface / fill
 * - 'head'      = secondary structural element
 * - 'accessory' = detail / decoration
 * - 'eye'       = bright accent (light source, glow)
 * - 'belt'      = border / mortar / frame
 * - 'leg'       = darker base / bottom
 * - 'arm'       = thin detail line
 * - 'boot'      = ground / base
 *
 * DB16 palette reference:
 * #140c1c  #442434  #30346d  #4e4a4e
 * #854c30  #346524  #d04648  #757161
 * #597dce  #d27d2c  #8595a1  #6daa2c
 * #d2aa99  #6dc2ca  #dad45e  #deeed6
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// DUNGEON_WALL_16 - Dark stone dungeon wall with mortar lines
// Irregular stone pattern, tiles seamlessly on all edges.
// ═══════════════════════════════════════════════════════════════
export const DUNGEON_WALL_16: SpriteTemplate = {
  name: 'dungeon_wall_16',
  width: 16,
  height: 16,
  description: 'Dark stone dungeon wall. Irregular stones with thin mortar lines. Tileable.',
  regions: [
    // Main stone fill - large stone blocks
    { name: 'stone_fill', role: 'body', pixels: [
      // Row 0: full row minus mortar
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],          [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0],
      // Row 1
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],          [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1],
      // Row 2
      [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],          [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2],
      // Row 3: horizontal mortar line (mostly mortar, some stone)
      [1, 3], [2, 3],                   [6, 3], [7, 3],                            [11, 3], [12, 3],                   [15, 3],
      // Row 4
      [0, 4], [1, 4], [2, 4], [3, 4],          [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],          [12, 4], [13, 4], [14, 4], [15, 4],
      // Row 5
      [0, 5], [1, 5], [2, 5], [3, 5],          [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],          [12, 5], [13, 5], [14, 5], [15, 5],
      // Row 6
      [0, 6], [1, 6], [2, 6], [3, 6],          [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],          [12, 6], [13, 6], [14, 6], [15, 6],
      // Row 7: horizontal mortar line
      [0, 7],          [3, 7], [4, 7],                   [8, 7], [9, 7],                   [13, 7], [14, 7],
      // Row 8
      [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],          [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],          [14, 8], [15, 8],
      // Row 9
      [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9],          [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],          [14, 9], [15, 9],
      // Row 10
      [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10],          [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],          [14, 10], [15, 10],
      // Row 11: horizontal mortar line
      [1, 11], [2, 11],                   [6, 11], [7, 11],                            [11, 11], [12, 11],                   [15, 11],
      // Row 12
      [0, 12], [1, 12], [2, 12], [3, 12],          [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],          [12, 12], [13, 12], [14, 12], [15, 12],
      // Row 13
      [0, 13], [1, 13], [2, 13], [3, 13],          [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],          [12, 13], [13, 13], [14, 13], [15, 13],
      // Row 14
      [0, 14], [1, 14], [2, 14], [3, 14],          [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14],          [12, 14], [13, 14], [14, 14], [15, 14],
      // Row 15: horizontal mortar line (partial, to tile into row 0)
      [0, 15],          [3, 15], [4, 15],                   [8, 15], [9, 15],                   [13, 15], [14, 15],
    ]},
    // Mortar lines between stones
    { name: 'mortar_h', role: 'belt', pixels: [
      // Horizontal mortar - row 3
      [0, 3], [3, 3], [4, 3], [5, 3], [8, 3], [9, 3], [10, 3], [13, 3], [14, 3],
      // Horizontal mortar - row 7
      [1, 7], [2, 7], [5, 7], [6, 7], [7, 7], [10, 7], [11, 7], [12, 7], [15, 7],
      // Horizontal mortar - row 11
      [0, 11], [3, 11], [4, 11], [5, 11], [8, 11], [9, 11], [10, 11], [13, 11], [14, 11],
      // Horizontal mortar - row 15
      [1, 15], [2, 15], [5, 15], [6, 15], [7, 15], [10, 15], [11, 15], [12, 15], [15, 15],
    ]},
    // Vertical mortar joints
    { name: 'mortar_v', role: 'belt', pixels: [
      // Vertical mortar between rows 0-2 (at x=7)
      [7, 0], [7, 1], [7, 2],
      // Vertical mortar between rows 4-6 (at x=4, x=11)
      [4, 4], [4, 5], [4, 6], [11, 4], [11, 5], [11, 6],
      // Vertical mortar between rows 8-10 (at x=6, x=13)
      [6, 8], [6, 9], [6, 10], [13, 8], [13, 9], [13, 10],
      // Vertical mortar between rows 12-14 (at x=4, x=11)
      [4, 12], [4, 13], [4, 14], [11, 12], [11, 13], [11, 14],
    ]},
    // Stone surface highlights (subtle variation on some blocks)
    { name: 'stone_highlight', role: 'head', pixels: [
      [2, 1], [10, 1],
      [2, 5], [8, 5],
      [3, 9], [10, 9],
      [2, 13], [8, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// DUNGEON_FLOOR_16 - Stone dungeon floor tile
// Lighter than walls, cracked stone with subtle variation.
// ═══════════════════════════════════════════════════════════════
export const DUNGEON_FLOOR_16: SpriteTemplate = {
  name: 'dungeon_floor_16',
  width: 16,
  height: 16,
  description: 'Stone dungeon floor tile. Lighter stones, cracked pattern, subtle variation. Tileable.',
  regions: [
    // Main floor surface - nearly full coverage
    { name: 'floor_fill', role: 'body', pixels: [
      // Row 0
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0],
      // Row 1
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1],
      // Row 2
      [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [15, 2],
      // Row 3
      [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], [15, 3],
      // Row 4
      [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4],
      // Row 5
      [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5],
      // Row 6
      [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6],
      // Row 7
      [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7],
      // Row 8
      [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8],
      // Row 9
      [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9],
      // Row 10
      [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10],
      // Row 11
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11],
      // Row 12
      [0, 12], [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12],
      // Row 13
      [0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13], [15, 13],
      // Row 14
      [0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14],
      // Row 15
      [0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15],
    ]},
    // Crack lines across the floor (thin dark lines)
    { name: 'cracks', role: 'arm', pixels: [
      // Diagonal crack top-left to mid
      [3, 2], [4, 3], [5, 4], [5, 5],
      // Crack mid-right area
      [11, 6], [12, 7], [12, 8],
      // Crack bottom area
      [6, 11], [7, 12], [8, 12], [8, 13],
      // Small crack top-right
      [13, 1], [14, 2],
    ]},
    // Stone edge highlights (lighter spots on surface)
    { name: 'stone_light', role: 'head', pixels: [
      [1, 1], [7, 0], [14, 3],
      [2, 6], [9, 5], [13, 7],
      [4, 10], [10, 9], [15, 11],
      [1, 13], [8, 14], [12, 15],
    ]},
    // Darker grout/shadow spots
    { name: 'grout', role: 'leg', pixels: [
      [0, 4], [7, 3], [15, 1],
      [3, 8], [8, 7], [14, 6],
      [1, 11], [9, 10], [15, 9],
      [5, 14], [11, 13], [14, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// DOOR_16 - Wooden door, front-facing
// Vertical planks, iron hinges, arched top, keyhole.
// ═══════════════════════════════════════════════════════════════
export const DOOR_16: SpriteTemplate = {
  name: 'door_16',
  width: 16,
  height: 16,
  description: 'Front-facing wooden door. Vertical planks, iron hinges, arched top, keyhole.',
  regions: [
    // Stone frame / doorframe (sides and top arch)
    { name: 'frame', role: 'belt', pixels: [
      // Top arch
                        [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0],
                  [4, 1],                                           [11, 1],
            [3, 2],                                                       [12, 2],
      // Left frame
      [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [3, 11], [3, 12], [3, 13], [3, 14], [3, 15],
      // Right frame
      [12, 3], [12, 4], [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12], [12, 13], [12, 14], [12, 15],
    ]},
    // Wooden planks (main door body)
    { name: 'planks', role: 'body', pixels: [
      // Under the arch (rows 1-2 partial fill)
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
      // Full rows 3-15
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12],
      [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
      [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14],
      [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15],
    ]},
    // Plank division lines (vertical grain between boards)
    { name: 'plank_lines', role: 'arm', pixels: [
      // Plank seam at x=6
      [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [6, 15],
      // Plank seam at x=9
      [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10], [9, 11], [9, 12], [9, 13], [9, 14], [9, 15],
    ]},
    // Iron hinges (left side)
    { name: 'hinges', role: 'accessory', pixels: [
      // Top hinge
      [4, 4], [5, 4],
      // Bottom hinge
      [4, 12], [5, 12],
    ]},
    // Iron handle and keyhole (right-center area)
    { name: 'handle', role: 'accessory', pixels: [
      [10, 7], [10, 8],
    ]},
    // Keyhole
    { name: 'keyhole', role: 'eye', pixels: [
      [10, 9],
    ]},
    // Threshold (bottom ground line)
    { name: 'threshold', role: 'boot', pixels: [
      [3, 15], [12, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// STAIRS_DOWN_16 - Descending stairs viewed from top
// 4-5 steps going down, each progressively darker, side walls.
// ═══════════════════════════════════════════════════════════════
export const STAIRS_DOWN_16: SpriteTemplate = {
  name: 'stairs_down_16',
  width: 16,
  height: 16,
  description: 'Descending stairs viewed from top. 4-5 steps going down, side walls visible.',
  regions: [
    // Side walls (left and right columns)
    { name: 'wall_left', role: 'belt', pixels: [
      [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13], [2, 14], [2, 15],
      [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [3, 11], [3, 12], [3, 13], [3, 14], [3, 15],
    ]},
    { name: 'wall_right', role: 'belt', pixels: [
      [12, 0], [12, 1], [12, 2], [12, 3], [12, 4], [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12], [12, 13], [12, 14], [12, 15],
      [13, 0], [13, 1], [13, 2], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12], [13, 13], [13, 14], [13, 15],
    ]},
    // Top landing (floor level) - rows 0-2
    { name: 'landing', role: 'body', pixels: [
      [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0],
      [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1],
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
    ]},
    // Step 1 edge (rows 3)
    { name: 'step1_edge', role: 'head', pixels: [
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
    ]},
    // Step 1 surface (rows 4-5) - slightly darker
    { name: 'step1', role: 'body', pixels: [
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
    ]},
    // Step 2 edge (row 6)
    { name: 'step2_edge', role: 'head', pixels: [
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
    ]},
    // Step 2 surface (rows 7-8) - darker
    { name: 'step2', role: 'leg', pixels: [
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
    ]},
    // Step 3 edge (row 9)
    { name: 'step3_edge', role: 'head', pixels: [
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
    ]},
    // Step 3 surface (rows 10-11) - even darker
    { name: 'step3', role: 'leg', pixels: [
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
    ]},
    // Step 4 edge (row 12)
    { name: 'step4_edge', role: 'head', pixels: [
      [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12],
    ]},
    // Step 4 surface into darkness (rows 13-15) - darkest
    { name: 'step4_abyss', role: 'boot', pixels: [
      [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
      [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14],
      [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15],
    ]},
    // Outer darkness (columns 0-1 and 14-15)
    { name: 'outer_dark', role: 'boot', pixels: [
      [0, 0], [1, 0], [14, 0], [15, 0],
      [0, 1], [1, 1], [14, 1], [15, 1],
      [0, 2], [1, 2], [14, 2], [15, 2],
      [0, 3], [1, 3], [14, 3], [15, 3],
      [0, 4], [1, 4], [14, 4], [15, 4],
      [0, 5], [1, 5], [14, 5], [15, 5],
      [0, 6], [1, 6], [14, 6], [15, 6],
      [0, 7], [1, 7], [14, 7], [15, 7],
      [0, 8], [1, 8], [14, 8], [15, 8],
      [0, 9], [1, 9], [14, 9], [15, 9],
      [0, 10], [1, 10], [14, 10], [15, 10],
      [0, 11], [1, 11], [14, 11], [15, 11],
      [0, 12], [1, 12], [14, 12], [15, 12],
      [0, 13], [1, 13], [14, 13], [15, 13],
      [0, 14], [1, 14], [14, 14], [15, 14],
      [0, 15], [1, 15], [14, 15], [15, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// TORCH_16 - Wall-mounted torch
// Metal bracket on left, wooden handle, flame at top.
// ═══════════════════════════════════════════════════════════════
export const TORCH_16: SpriteTemplate = {
  name: 'torch_16',
  width: 16,
  height: 16,
  description: 'Wall-mounted torch. Metal bracket/holder, wooden handle, flame at top.',
  regions: [
    // Flame outer glow (red/orange tips)
    { name: 'flame_outer', role: 'accessory', pixels: [
      [7, 0], [9, 0],
      [6, 1], [10, 1],
      [6, 2], [10, 2],
      [7, 3], [9, 3],
    ]},
    // Flame core (bright yellow/white center)
    { name: 'flame_core', role: 'eye', pixels: [
      [8, 0],
      [7, 1], [8, 1], [9, 1],
      [7, 2], [8, 2], [9, 2],
      [8, 3],
    ]},
    // Flame base (where fire meets handle)
    { name: 'flame_base', role: 'accessory', pixels: [
      [7, 4], [8, 4], [9, 4],
    ]},
    // Wooden handle (vertical stick)
    { name: 'handle', role: 'body', pixels: [
      [8, 5],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 9],
      [8, 10],
    ]},
    // Metal bracket / wall mount (left side)
    { name: 'bracket', role: 'head', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8],
      [4, 9], [5, 9],
      [4, 10],
    ]},
    // Bracket screws / wall anchor
    { name: 'bracket_screws', role: 'arm', pixels: [
      [3, 8], [3, 10],
    ]},
    // Glow halo (faint light around flame)
    { name: 'glow', role: 'eye', pixels: [
      [6, 0], [10, 0],
      [5, 1], [11, 1],
      [5, 2], [11, 2],
      [6, 3], [10, 3],
      [6, 4], [10, 4],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BARREL_16 - Wooden barrel, front-facing
// Round body, horizontal bands/hoops, vertical stave lines.
// ═══════════════════════════════════════════════════════════════
export const BARREL_16: SpriteTemplate = {
  name: 'dungeon_barrel_16',
  width: 16,
  height: 16,
  description: 'Front-facing wooden barrel. Round body, metal hoops, vertical stave lines.',
  regions: [
    // Barrel top rim
    { name: 'top_rim', role: 'head', pixels: [
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
    ]},
    // Barrel body (wooden staves - main fill)
    { name: 'body', role: 'body', pixels: [
      // Row 3 (just below rim)
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      // Row 4
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      // Row 5 (hoop row - body pixels around hoop)
      [4, 5], [5, 5],                                     [10, 5], [11, 5],
      // Row 6 - widest
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      // Row 7
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      // Row 8
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      // Row 9
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      // Row 10 (hoop row - body pixels around hoop)
      [4, 10], [5, 10],                                    [10, 10], [11, 10],
      // Row 11
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      // Row 12
      [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12],
    ]},
    // Metal hoops (horizontal bands)
    { name: 'hoops', role: 'accessory', pixels: [
      // Upper hoop at row 5
      [6, 5], [7, 5], [8, 5], [9, 5],
      // Lower hoop at row 10
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Stave division lines (vertical grain)
    { name: 'stave_lines', role: 'arm', pixels: [
      // Stave line at x=6
      [6, 3], [6, 4], [6, 6], [6, 7], [6, 8], [6, 9], [6, 11], [6, 12],
      // Stave line at x=9
      [9, 3], [9, 4], [9, 6], [9, 7], [9, 8], [9, 9], [9, 11], [9, 12],
    ]},
    // Bottom rim
    { name: 'bottom_rim', role: 'head', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
    // Ground shadow
    { name: 'shadow', role: 'boot', pixels: [
      [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CRATE_16 - Wooden crate/box
// Square shape, wooden planks, cross-brace, nails at corners.
// ═══════════════════════════════════════════════════════════════
export const CRATE_16: SpriteTemplate = {
  name: 'dungeon_crate_16',
  width: 16,
  height: 16,
  description: 'Wooden crate/box. Square shape, planks with cross-brace pattern, corner nails.',
  regions: [
    // Crate frame (border edges)
    { name: 'frame', role: 'belt', pixels: [
      // Top edge
      [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2],
      // Bottom edge
      [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13],
      // Left edge
      [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12],
      // Right edge
      [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12],
    ]},
    // Main wood planks (fill)
    { name: 'planks', role: 'body', pixels: [
      // Rows 3-12, columns 3-12 (minus cross-brace and nails)
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [3, 7], [4, 7], [5, 7], [6, 7],                   [9, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8],                   [9, 8], [10, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
    ]},
    // Cross-brace (X pattern on front face)
    { name: 'cross_brace', role: 'head', pixels: [
      // Diagonal top-left to bottom-right
      [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 12],
      // Diagonal top-right to bottom-left
      [12, 3], [11, 4], [10, 5], [9, 6], [8, 7], [7, 8], [6, 9], [5, 10], [4, 11], [3, 12],
    ]},
    // Corner nails (metal dots)
    { name: 'nails', role: 'accessory', pixels: [
      [3, 3], [12, 3], [3, 12], [12, 12],
      [7, 7], [8, 7], [7, 8], [8, 8],  // center plate
    ]},
    // Plank horizontal lines (subtle grain)
    { name: 'plank_lines', role: 'arm', pixels: [
      // Horizontal grain
      [4, 5], [5, 5], [6, 5], [9, 5], [10, 5], [11, 5],
      [4, 10], [5, 10], [6, 10], [9, 10], [10, 10], [11, 10],
    ]},
    // Ground shadow
    { name: 'shadow', role: 'boot', pixels: [
      [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// TRAP_SPIKES_16 - Floor spike trap
// Stone floor base with metal spikes in grid pattern.
// ═══════════════════════════════════════════════════════════════
export const TRAP_SPIKES_16: SpriteTemplate = {
  name: 'trap_spikes_16',
  width: 16,
  height: 16,
  description: 'Floor spike trap. Stone floor base with metal spikes poking up in a grid pattern.',
  regions: [
    // Stone floor base (bottom half and edges)
    { name: 'floor_base', role: 'body', pixels: [
      // Full rows 0-1 (floor surface)
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0],
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1],
      // Full rows 12-15 (trap base plate)
      [0, 12], [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12],
      [0, 13], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13], [15, 13],
      [0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14],
      [0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15],
    ]},
    // Trap slot opening in floor (dark gap around spikes)
    { name: 'trap_slot', role: 'leg', pixels: [
      // Row 2 - slot border
      [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2],
      // Row 11 - slot border
      [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11],
      // Side borders
      [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],
      [14, 3], [14, 4], [14, 5], [14, 6], [14, 7], [14, 8], [14, 9], [14, 10],
    ]},
    // Metal spike tips (bright, sharp points)
    { name: 'spike_tips', role: 'accessory', pixels: [
      // Row of spike tips at row 3
      [3, 3], [6, 3], [9, 3], [12, 3],
    ]},
    // Metal spike shafts
    { name: 'spike_shafts', role: 'head', pixels: [
      // Spike columns - each spike is 1px wide, 6-7px tall
      [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10],
      [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10],
      [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10],
      [12, 4], [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10],
    ]},
    // Dark space between spikes (void below)
    { name: 'void', role: 'boot', pixels: [
      [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10],
      [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
      [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10],
      [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10],
      [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10],
      [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10],
      [11, 3], [11, 4], [11, 5], [11, 6], [11, 7], [11, 8], [11, 9], [11, 10],
      [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10],
    ]},
    // Floor edge pixels (left/right border at floor level)
    { name: 'floor_edge', role: 'belt', pixels: [
      [0, 2], [15, 2],
      [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10],
      [15, 3], [15, 4], [15, 5], [15, 6], [15, 7], [15, 8], [15, 9], [15, 10],
      [0, 11], [15, 11],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// PILLAR_16 - Stone column
// Narrow vertical column, wider base and capital, crack details.
// ═══════════════════════════════════════════════════════════════
export const PILLAR_16: SpriteTemplate = {
  name: 'pillar_16',
  width: 16,
  height: 16,
  description: 'Stone column/pillar. Narrow vertical shaft with wider base and capital, crack details.',
  regions: [
    // Capital (decorative top) - rows 0-2
    { name: 'capital', role: 'head', pixels: [
      [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0],
      [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
    ]},
    // Column shaft (rows 3-12) - narrow center
    { name: 'shaft', role: 'body', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Cracks on shaft
    { name: 'cracks', role: 'arm', pixels: [
      [7, 5], [8, 6],
      [7, 9], [8, 10],
    ]},
    // Base (wider bottom) - rows 13-15
    { name: 'base', role: 'leg', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
      [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14],
      [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15],
    ]},
    // Highlight edge (light hitting left side of shaft)
    { name: 'highlight', role: 'accessory', pixels: [
      [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11], [6, 12],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CHEST_OPEN_16 - Open treasure chest
// Lid open at top, gold coins visible inside.
// ═══════════════════════════════════════════════════════════════
export const CHEST_OPEN_16: SpriteTemplate = {
  name: 'chest_open_16',
  width: 16,
  height: 16,
  description: 'Open treasure chest. Lid hinged open, gold coins visible inside.',
  regions: [
    // Open lid (tilted back, rows 0-4)
    { name: 'lid_outer', role: 'body', pixels: [
      // Lid top edge (arched slightly)
                  [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0],
            [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1],
            [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],
    ]},
    // Lid inner surface (visible when open)
    { name: 'lid_inner', role: 'leg', pixels: [
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
    ]},
    // Lid metal band/trim
    { name: 'lid_trim', role: 'belt', pixels: [
      [3, 3], [12, 3],
      [3, 4], [12, 4],
    ]},
    // Gold coins visible inside (rows 5-6, heaped)
    { name: 'gold_coins', role: 'eye', pixels: [
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
    ]},
    // Coin highlights (shinier spots)
    { name: 'coin_highlights', role: 'accessory', pixels: [
      [6, 5], [9, 5],
      [5, 6], [8, 6], [11, 6],
    ]},
    // Chest body front (rows 7-12)
    { name: 'chest_body', role: 'body', pixels: [
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
    ]},
    // Chest metal band (horizontal strap across front)
    { name: 'chest_band', role: 'head', pixels: [
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
    ]},
    // Lock plate (center of band)
    { name: 'lock', role: 'accessory', pixels: [
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
    ]},
    // Chest side edges (darker border)
    { name: 'chest_edges', role: 'belt', pixels: [
      [3, 7], [3, 8], [3, 9], [3, 10], [3, 11], [3, 12],
      [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12],
    ]},
    // Base / feet
    { name: 'base', role: 'boot', pixels: [
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
      [4, 14], [5, 14],                                                 [10, 14], [11, 14],
    ]},
  ],
};


// ═══════════════════════════════════════════════════════════════
// Color Schemes - Dark moody dungeon palette (DB16-based)
// ═══════════════════════════════════════════════════════════════

export const DUNGEON_WALL_COLORS: ColorScheme = {
  name: 'dungeon_wall_default',
  mapping: {
    body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // dark stone
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // lighter stone highlight
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // mortar lines
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // thin lines
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // (unused)
    leg:       { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },  // dark base
    boot:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },  // ground
    face:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // (fallback)
    hand:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // (fallback)
    hair:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // (fallback)
  },
};

export const DUNGEON_FLOOR_COLORS: ColorScheme = {
  name: 'dungeon_floor_default',
  mapping: {
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // medium stone
    head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },  // light stone highlights
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // crack lines
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // darker grout
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // (fallback)
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (unused)
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // (fallback)
    face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (fallback)
    hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (fallback)
    hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (fallback)
  },
};

export const DOOR_COLORS: ColorScheme = {
  name: 'door_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wooden planks
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // stone frame
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },  // plank lines
    accessory: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#8595a1' },  // iron hinges/handle
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#4e4a4e' },  // keyhole
    boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // threshold
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
  },
};

export const STAIRS_DOWN_COLORS: ColorScheme = {
  name: 'stairs_down_default',
  mapping: {
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // landing / step surface
    head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // step edges (bright)
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // side walls
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // deeper steps
    boot:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },  // abyss / darkness
    arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // (fallback)
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    accessory: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // (unused)
    face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (fallback)
    hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (fallback)
    hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (fallback)
  },
};

export const TORCH_COLORS: ColorScheme = {
  name: 'torch_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wooden handle
    head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // metal bracket
    arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#8595a1' },  // bracket screws
    accessory: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },  // flame outer (red/orange)
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // flame core + glow (bright)
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // (fallback)
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    boot:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },  // (fallback)
    face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // (fallback)
    hand:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // (fallback)
    hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // (fallback)
  },
};

export const BARREL_COLORS: ColorScheme = {
  name: 'dungeon_barrel_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wooden staves
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // top/bottom rims
    accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // metal hoops
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },  // stave lines
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // ground shadow
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
  },
};

export const CRATE_COLORS: ColorScheme = {
  name: 'dungeon_crate_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wooden planks
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // cross-brace (lighter wood)
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },  // frame edges
    accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // nails (metal)
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },  // plank grain lines
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // ground shadow
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
  },
};

export const TRAP_SPIKES_COLORS: ColorScheme = {
  name: 'trap_spikes_default',
  mapping: {
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // stone floor
    head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // spike shafts (metal)
    accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // spike tips (bright metal)
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // trap slot border
    boot:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },  // void below
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // floor edge
    arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // (fallback)
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (fallback)
    hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (fallback)
    hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (fallback)
  },
};

export const PILLAR_COLORS: ColorScheme = {
  name: 'pillar_default',
  mapping: {
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // shaft stone
    head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },  // capital (lighter)
    leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // base (darker)
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // cracks
    accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },  // highlight edge
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // (fallback)
    boot:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },  // (fallback)
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // (unused)
    face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (fallback)
    hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (fallback)
    hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // (fallback)
  },
};

export const CHEST_OPEN_COLORS: ColorScheme = {
  name: 'chest_open_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wooden chest
    head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // metal band
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // side edges / lid trim
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },  // lid inner (dark wood)
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // gold coins (bright)
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // coin highlights
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },  // (fallback)
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // base/feet
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
    hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // (fallback)
  },
};


// ═══════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════

export const DUNGEON_TEMPLATES: Record<string, SpriteTemplate> = {
  dungeon_wall_16: DUNGEON_WALL_16,
  dungeon_floor_16: DUNGEON_FLOOR_16,
  door_16: DOOR_16,
  stairs_down_16: STAIRS_DOWN_16,
  torch_16: TORCH_16,
  dungeon_barrel_16: BARREL_16,
  dungeon_crate_16: CRATE_16,
  trap_spikes_16: TRAP_SPIKES_16,
  pillar_16: PILLAR_16,
  chest_open_16: CHEST_OPEN_16,
};

export const DUNGEON_COLOR_SCHEMES: Record<string, ColorScheme> = {
  dungeon_wall_default: DUNGEON_WALL_COLORS,
  dungeon_floor_default: DUNGEON_FLOOR_COLORS,
  door_default: DOOR_COLORS,
  stairs_down_default: STAIRS_DOWN_COLORS,
  torch_default: TORCH_COLORS,
  dungeon_barrel_default: BARREL_COLORS,
  dungeon_crate_default: CRATE_COLORS,
  trap_spikes_default: TRAP_SPIKES_COLORS,
  pillar_default: PILLAR_COLORS,
  chest_open_default: CHEST_OPEN_COLORS,
};
