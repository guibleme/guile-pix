/**
 * 16x16 furniture and interior prop templates for RPG/roguelike games.
 * Each template defines pixel regions by functional part, repurposing
 * humanoid roles for furniture anatomy:
 *
 *   'body'      = main surface / material
 *   'head'      = top section / shelf
 *   'accessory' = detail / decoration
 *   'eye'       = bright accent
 *   'belt'      = middle section / shelf
 *   'leg'       = legs / support
 *   'arm'       = thin structural element
 *   'boot'      = base
 *
 * All coordinates are within the [0, 15] range for 16x16 sprites.
 * Pixel counts noted per template for density reference.
 * DB16 palette used throughout.
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// TABLE_16 - Wooden table, front view. Flat tabletop, 2 legs,
//            plate/cup hint on surface. ~65 pixels.
// ═══════════════════════════════════════════════════════════════
export const TABLE_16: SpriteTemplate = {
  name: 'table_16',
  width: 16,
  height: 16,
  description: 'Front-facing wooden table with flat tabletop, 2 visible legs, plate and cup detail on top.',
  regions: [
    // Items on table surface - plate (left) and cup (right)
    { name: 'plate', role: 'accessory', pixels: [
      [4, 5], [5, 5], [6, 5],
      [4, 6], [5, 6], [6, 6],
    ]},
    { name: 'cup', role: 'eye', pixels: [
      [10, 5],
      [10, 6],
    ]},
    // Tabletop front edge (rows 7-8) - main surface
    { name: 'tabletop', role: 'body', pixels: [
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
    ]},
    // Top surface visible depth (row 9) - front apron
    { name: 'apron', role: 'belt', pixels: [
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
    ]},
    // Left leg (rows 10-15)
    { name: 'leg_left', role: 'leg', pixels: [
      [3, 10], [4, 10],
      [3, 11], [4, 11],
      [3, 12], [4, 12],
      [3, 13], [4, 13],
      [3, 14], [4, 14],
      [3, 15], [4, 15],
    ]},
    // Right leg (rows 10-15)
    { name: 'leg_right', role: 'leg', pixels: [
      [11, 10], [12, 10],
      [11, 11], [12, 11],
      [11, 12], [12, 12],
      [11, 13], [12, 13],
      [11, 14], [12, 14],
      [11, 15], [12, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CHAIR_16 - Wooden chair, front/slight-side view.
//            Backrest, seat, 2 visible legs. ~45 pixels.
// ═══════════════════════════════════════════════════════════════
export const CHAIR_16: SpriteTemplate = {
  name: 'chair_16',
  width: 16,
  height: 16,
  description: 'Front-facing wooden chair with tall backrest, flat seat, and 2 visible legs.',
  regions: [
    // Backrest top finial
    { name: 'finial', role: 'accessory', pixels: [
      [6, 1], [9, 1],
    ]},
    // Backrest uprights (rows 2-6)
    { name: 'backrest_frame', role: 'arm', pixels: [
      [6, 2], [9, 2],
      [6, 3], [9, 3],
      [6, 4], [9, 4],
      [6, 5], [9, 5],
      [6, 6], [9, 6],
    ]},
    // Backrest fill (rows 2-6)
    { name: 'backrest', role: 'head', pixels: [
      [7, 2], [8, 2],
      [7, 3], [8, 3],
      [7, 4], [8, 4],
      [7, 5], [8, 5],
      [7, 6], [8, 6],
    ]},
    // Seat (rows 7-8) - wider than backrest
    { name: 'seat', role: 'body', pixels: [
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    ]},
    // Seat front edge
    { name: 'seat_edge', role: 'belt', pixels: [
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ]},
    // Left leg (rows 10-15) — 2px wide
    { name: 'leg_left', role: 'leg', pixels: [
      [5, 10], [6, 10], [5, 11], [6, 11], [5, 12], [6, 12],
      [5, 13], [6, 13], [5, 14], [6, 14], [5, 15], [6, 15],
    ]},
    // Right leg (rows 10-15) — 2px wide
    { name: 'leg_right', role: 'leg', pixels: [
      [9, 10], [10, 10], [9, 11], [10, 11], [9, 12], [10, 12],
      [9, 13], [10, 13], [9, 14], [10, 14], [9, 15], [10, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BED_16 - Simple bed, top-ish perspective. Wooden frame,
//          pillow at head, blanket covering body. ~95 pixels.
// ═══════════════════════════════════════════════════════════════
export const BED_16: SpriteTemplate = {
  name: 'bed_16',
  width: 16,
  height: 16,
  description: 'Top-down bed with wooden frame, white/cream pillow at head, colored blanket over body.',
  regions: [
    // Headboard (rows 0-1)
    { name: 'headboard', role: 'head', pixels: [
      [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0],
      [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1],
    ]},
    // Pillow (rows 2-3)
    { name: 'pillow', role: 'eye', pixels: [
      [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
    ]},
    // Blanket (rows 4-12) - main body area
    { name: 'blanket', role: 'body', pixels: [
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
    ]},
    // Blanket fold accent (row 5, decorative line)
    { name: 'blanket_fold', role: 'accessory', pixels: [
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
    ]},
    // Bed frame sides (rows 0-13)
    { name: 'frame_left', role: 'arm', pixels: [
      [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13],
    ]},
    { name: 'frame_right', role: 'arm', pixels: [
      [13, 2], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12], [13, 13],
    ]},
    // Footboard (rows 10-11)
    { name: 'footboard', role: 'belt', pixels: [
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
    ]},
    // Feet/legs at corners (rows 12-13)
    { name: 'feet', role: 'leg', pixels: [
      [2, 14], [3, 14], [12, 14], [13, 14],
      [2, 15], [3, 15], [12, 15], [13, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BOOKSHELF_16 - Tall bookshelf, front view. 3 shelves of
//                colorful book spines in a wooden frame. ~115 pixels.
// ═══════════════════════════════════════════════════════════════
export const BOOKSHELF_16: SpriteTemplate = {
  name: 'bookshelf_16',
  width: 16,
  height: 16,
  description: 'Front-facing tall bookshelf with 3 shelves of colorful book spines in a wooden frame.',
  regions: [
    // Top cap (row 0)
    { name: 'top_cap', role: 'head', pixels: [
      [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0],
    ]},
    // Left frame side
    { name: 'frame_left', role: 'arm', pixels: [
      [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13], [2, 14],
    ]},
    // Right frame side
    { name: 'frame_right', role: 'arm', pixels: [
      [13, 1], [13, 2], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12], [13, 13], [13, 14],
    ]},
    // Top shelf books (rows 1-3) - book spines as main surface
    { name: 'books_top', role: 'body', pixels: [
      [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1],
      [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
    ]},
    // Shelf divider 1 (row 4)
    { name: 'shelf_1', role: 'belt', pixels: [
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
    ]},
    // Middle shelf books (rows 5-8)
    { name: 'books_mid', role: 'body', pixels: [
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
    ]},
    // Shelf divider 2 (row 9)
    { name: 'shelf_2', role: 'belt', pixels: [
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
    ]},
    // Bottom shelf books (rows 10-13)
    { name: 'books_bottom', role: 'body', pixels: [
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
    ]},
    // Book spine accents (scattered bright spines for color variety)
    { name: 'spine_accents', role: 'eye', pixels: [
      [5, 1], [9, 1], [5, 2], [9, 2], [5, 3], [9, 3],
      [4, 6], [8, 6], [12, 6], [4, 7], [8, 7], [12, 7],
      [6, 11], [10, 11], [6, 12], [10, 12],
    ]},
    // Base (row 14-15)
    { name: 'base', role: 'boot', pixels: [
      [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
      [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CAULDRON_16 - Iron cauldron with bubbling green liquid.
//               Round pot on small tripod, steam wisps. ~65 pixels.
// ═══════════════════════════════════════════════════════════════
export const CAULDRON_16: SpriteTemplate = {
  name: 'cauldron_16',
  width: 16,
  height: 16,
  description: 'Iron cauldron with bubbling green liquid on small tripod feet, steam wisps rising.',
  regions: [
    // Steam wisps (rows 0-2) - thin rising lines
    { name: 'steam', role: 'accessory', pixels: [
      [6, 0], [10, 0],
      [7, 1], [9, 1],
      [6, 2], [8, 2], [10, 2],
    ]},
    // Bubbling liquid surface (rows 3-4)
    { name: 'liquid_surface', role: 'eye', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
    ]},
    // Bubble accents
    { name: 'bubbles', role: 'accessory', pixels: [
      [7, 3], [9, 4],
    ]},
    // Cauldron rim (row 5)
    { name: 'rim', role: 'head', pixels: [
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
    ]},
    // Cauldron body (rows 6-10) - round pot shape
    { name: 'pot_body', role: 'body', pixels: [
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Pot belly highlight band (row 7)
    { name: 'highlight_band', role: 'belt', pixels: [
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
    ]},
    // Handle lugs
    { name: 'handles', role: 'arm', pixels: [
      [2, 6], [13, 6],
      [2, 7], [13, 7],
    ]},
    // Tripod feet (rows 11-13)
    { name: 'tripod', role: 'leg', pixels: [
      [5, 11], [8, 11], [10, 11],
      [4, 12], [8, 12], [11, 12],
      [4, 13], [7, 13], [8, 13], [11, 13],
    ]},
    // Ground shadow (row 14)
    { name: 'ground', role: 'boot', pixels: [
      [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// ANVIL_16 - Blacksmith anvil. Classic T-shape profile,
//            dark iron with working-surface highlight. ~55 pixels.
// ═══════════════════════════════════════════════════════════════
export const ANVIL_16: SpriteTemplate = {
  name: 'anvil_16',
  width: 16,
  height: 16,
  description: 'Classic T-shaped blacksmith anvil with dark iron body and bright working-surface highlight.',
  regions: [
    // Horn tip (left extension, row 5)
    { name: 'horn', role: 'accessory', pixels: [
      [2, 5], [3, 5],
      [2, 6], [3, 6],
    ]},
    // Working surface / face (rows 4-6) - top flat area with highlight
    { name: 'face_highlight', role: 'eye', pixels: [
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
    ]},
    { name: 'face', role: 'head', pixels: [
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
    ]},
    // Heel (right extension, row 5-6)
    { name: 'heel', role: 'accessory', pixels: [
      [13, 5], [13, 6],
    ]},
    // Waist / neck (rows 7-8) - narrow section
    { name: 'waist', role: 'belt', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    ]},
    // Body / base column (rows 9-12)
    { name: 'body', role: 'body', pixels: [
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12],
    ]},
    // Feet / base spread (rows 13-14)
    { name: 'base', role: 'boot', pixels: [
      [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
      [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// SIGNPOST_16 - Wooden signpost. Vertical post with horizontal
//               sign board, scratches on board. ~45 pixels.
// ═══════════════════════════════════════════════════════════════
export const SIGNPOST_16: SpriteTemplate = {
  name: 'signpost_16',
  width: 16,
  height: 16,
  description: 'Wooden signpost with vertical post and horizontal sign board with text scratches.',
  regions: [
    // Sign board (rows 2-6) - horizontal plank
    { name: 'board', role: 'body', pixels: [
      [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
    ]},
    // Text scratches on board (decorative detail)
    { name: 'text', role: 'accessory', pixels: [
      [5, 3], [6, 3], [8, 3], [9, 3], [10, 3],
      [5, 4], [7, 4], [9, 4],
    ]},
    // Board edge highlight (top)
    { name: 'board_edge', role: 'head', pixels: [
      [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1],
    ]},
    // Post (rows 6-14) - centered vertical pole
    { name: 'post', role: 'arm', pixels: [
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
      [7, 14], [8, 14],
    ]},
    // Ground base (row 15) - small mound
    { name: 'ground', role: 'boot', pixels: [
      [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// GRAVESTONE_16 - Stone gravestone. Rounded top, text/cross
//                 carving, grass at base. ~55 pixels.
// ═══════════════════════════════════════════════════════════════
export const GRAVESTONE_16: SpriteTemplate = {
  name: 'gravestone_16',
  width: 16,
  height: 16,
  description: 'Stone gravestone with rounded top, cross carving, and grass at the base.',
  regions: [
    // Rounded top (rows 2-3)
    { name: 'stone_top', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
    ]},
    // Stone body (rows 4-11) - rectangular slab
    { name: 'stone_body', role: 'body', pixels: [
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Cross carving (rows 4-8)
    { name: 'cross', role: 'accessory', pixels: [
      [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    // Text lines (rows 9-10) - scratched text hint
    { name: 'text_lines', role: 'eye', pixels: [
      [6, 9], [7, 9], [8, 9], [9, 9],
      [7, 10], [8, 10],
    ]},
    // Stone base (row 12)
    { name: 'stone_base', role: 'belt', pixels: [
      [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12],
    ]},
    // Ground / dirt (row 13)
    { name: 'ground', role: 'boot', pixels: [
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
    ]},
    // Grass tufts (rows 14-15)
    { name: 'grass', role: 'leg', pixels: [
      [2, 14], [4, 14], [5, 14], [8, 14], [11, 14], [13, 14],
      [1, 15], [3, 15], [5, 15], [7, 15], [9, 15], [10, 15], [12, 15], [14, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// FOUNTAIN_16 - Small stone fountain. Basin at base, tiered
//               center pillar, water streaming. ~75 pixels.
// ═══════════════════════════════════════════════════════════════
export const FOUNTAIN_16: SpriteTemplate = {
  name: 'fountain_16',
  width: 16,
  height: 16,
  description: 'Small stone fountain with tiered center pillar, water streams, and wide basin at base.',
  regions: [
    // Water spray top (rows 0-1) - splash at peak
    { name: 'spray', role: 'eye', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
    ]},
    // Upper tier / spout (rows 2-3)
    { name: 'upper_tier', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
    ]},
    // Water streams falling (rows 4-5) - thin lines on sides
    { name: 'water_streams', role: 'accessory', pixels: [
      [5, 4], [10, 4],
      [4, 5], [11, 5],
    ]},
    // Center pillar (rows 4-7)
    { name: 'pillar', role: 'arm', pixels: [
      [7, 4], [8, 4],
      [7, 5], [8, 5],
      [7, 6], [8, 6],
      [7, 7], [8, 7],
    ]},
    // Mid basin / catch ring (rows 6-7)
    { name: 'mid_basin', role: 'belt', pixels: [
      [4, 6], [5, 6], [6, 6], [9, 6], [10, 6], [11, 6],
      [4, 7], [5, 7], [6, 7], [9, 7], [10, 7], [11, 7],
    ]},
    // Water in mid basin
    { name: 'mid_water', role: 'eye', pixels: [
      [5, 7], [6, 7], [9, 7], [10, 7],
    ]},
    // Lower pillar (rows 8-9)
    { name: 'lower_pillar', role: 'arm', pixels: [
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Main basin (rows 10-13) - wide stone bowl
    { name: 'basin', role: 'body', pixels: [
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
      [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
      [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
    ]},
    // Base / ground (rows 14-15)
    { name: 'base', role: 'boot', pixels: [
      [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14],
      [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CAMPFIRE_16 - Campfire with logs. Stone circle at base,
//               crossed logs, flames rising. ~65 pixels.
// ═══════════════════════════════════════════════════════════════
export const CAMPFIRE_16: SpriteTemplate = {
  name: 'campfire_16',
  width: 16,
  height: 16,
  description: 'Campfire with stone ring, crossed logs, and rising flames with ember sparks.',
  regions: [
    // Flame tip / sparks (rows 1-2)
    { name: 'sparks', role: 'accessory', pixels: [
      [7, 1], [9, 1],
      [8, 0],
    ]},
    // Flame upper (rows 2-4) - bright yellow core
    { name: 'flame_core', role: 'eye', pixels: [
      [7, 2], [8, 2],
      [7, 3], [8, 3],
      [7, 4], [8, 4],
    ]},
    // Flame outer (rows 3-7) - orange/red body
    { name: 'flame_body', role: 'head', pixels: [
      [6, 3], [9, 3],
      [5, 4], [6, 4], [9, 4], [10, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    // Ember glow base (row 8)
    { name: 'embers', role: 'belt', pixels: [
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    ]},
    // Crossed logs (rows 9-11)
    { name: 'logs', role: 'body', pixels: [
      // Log going left-to-right diagonal
      [3, 9], [4, 9], [5, 9], [6, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Log cross highlight
    { name: 'log_highlight', role: 'accessory', pixels: [
      [7, 9], [8, 9],
    ]},
    // Stone ring (rows 12-13) - circle of stones around fire
    { name: 'stones', role: 'leg', pixels: [
      [4, 12], [5, 12], [6, 12], [9, 12], [10, 12], [11, 12],
      [3, 13], [4, 13], [7, 13], [8, 13], [11, 13], [12, 13],
    ]},
    // Ground (rows 14-15) - dirt/ash around fire
    { name: 'ground', role: 'boot', pixels: [
      [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14],
      [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15],
    ]},
  ],
};


// ═══════════════════════════════════════════════════════════════
// Color schemes (DB16 palette)
// Each uses 3-tone ramps: shadow / base / highlight
// ═══════════════════════════════════════════════════════════════

export const TABLE_COLORS: ColorScheme = {
  name: 'table_default',
  mapping: {
    body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // warm wood surface
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // darker wood apron
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wood legs
    accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' }, // plate - light ceramic
    eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // cup - warm accent
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // (unused but required)
    arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // (unused)
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};

export const CHAIR_COLORS: ColorScheme = {
  name: 'chair_default',
  mapping: {
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // backrest fill
    body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // seat surface
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // seat edge
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // backrest uprights
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // chair legs
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // finial accent
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // (unused)
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};

export const BED_COLORS: ColorScheme = {
  name: 'bed_default',
  mapping: {
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // headboard wood
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // blue blanket
    eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' }, // white pillow
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // footboard wood
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // frame sides
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // feet
    accessory: { shadow: '#30346d', base: '#442434', highlight: '#597dce' }, // blanket fold
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};

export const BOOKSHELF_COLORS: ColorScheme = {
  name: 'bookshelf_default',
  mapping: {
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // top cap wood
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // book spines (base wood)
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // shelf dividers
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // frame sides
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // base
    eye:       { shadow: '#30346d', base: '#d04648', highlight: '#6dc2ca' }, // colorful accent spines
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // (unused)
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};

export const CAULDRON_COLORS: ColorScheme = {
  name: 'cauldron_default',
  mapping: {
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // iron rim
    body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // dark iron pot
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // highlight band
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // handle lugs
    eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // bubbling green liquid
    accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, // steam wisps
    leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // tripod
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // ground shadow
  },
};

export const ANVIL_COLORS: ColorScheme = {
  name: 'anvil_default',
  mapping: {
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // face surface
    body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // dark iron body
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // waist
    eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, // working surface highlight
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // horn + heel
    boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // base
    arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // (unused)
    leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // (unused)
  },
};

export const SIGNPOST_COLORS: ColorScheme = {
  name: 'signpost_default',
  mapping: {
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // board edge top
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // sign board
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // post
    accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // text scratches
    boot:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // grass/ground mound
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // (unused)
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};

export const GRAVESTONE_COLORS: ColorScheme = {
  name: 'gravestone_default',
  mapping: {
    head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' }, // stone top
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // stone body
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // stone base
    accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, // cross carving
    eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // text lines
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // ground/dirt
    leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // grass tufts
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // (unused)
  },
};

export const FOUNTAIN_COLORS: ColorScheme = {
  name: 'fountain_default',
  mapping: {
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // upper tier stone
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // main basin stone
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // mid basin stone
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // pillar
    eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, // water / spray
    accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, // water streams
    boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // base stone
    leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // (unused)
  },
};

export const CAMPFIRE_COLORS: ColorScheme = {
  name: 'campfire_default',
  mapping: {
    head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // outer flame (red-orange)
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // logs (wood)
    belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // embers
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // flame core (yellow-white)
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // sparks + log highlight
    leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // stone ring
    boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, // ground/ash
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // (unused)
  },
};


// ═══════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════

export const FURNITURE_TEMPLATES: Record<string, SpriteTemplate> = {
  table_16: TABLE_16,
  chair_16: CHAIR_16,
  bed_16: BED_16,
  bookshelf_16: BOOKSHELF_16,
  cauldron_16: CAULDRON_16,
  anvil_16: ANVIL_16,
  signpost_16: SIGNPOST_16,
  gravestone_16: GRAVESTONE_16,
  fountain_16: FOUNTAIN_16,
  campfire_16: CAMPFIRE_16,
};

export const FURNITURE_COLOR_SCHEMES: Record<string, ColorScheme> = {
  table_default: TABLE_COLORS,
  chair_default: CHAIR_COLORS,
  bed_default: BED_COLORS,
  bookshelf_default: BOOKSHELF_COLORS,
  cauldron_default: CAULDRON_COLORS,
  anvil_default: ANVIL_COLORS,
  signpost_default: SIGNPOST_COLORS,
  gravestone_default: GRAVESTONE_COLORS,
  fountain_default: FOUNTAIN_COLORS,
  campfire_default: CAMPFIRE_COLORS,
};
