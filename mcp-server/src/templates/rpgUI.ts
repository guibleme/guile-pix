/**
 * 16x16 advanced RPG UI element templates.
 * Repurposed character roles for UI semantics:
 * - 'body'      = main fill / background
 * - 'head'      = secondary / border / frame
 * - 'accessory' = accent / decoration
 * - 'eye'       = special highlight / bright accent
 * - 'belt'      = divider / edge / secondary fill
 * - 'arm'       = thin detail line
 * - 'leg'       = darker/unfilled area
 *
 * Each template defines pixel regions for a recognizable RPG UI element.
 * Regions are arrays of [x, y] coordinates within a 16x16 grid (0-15).
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
 * - INVENTORY_SLOT_16   Empty inventory slot with beveled border
 * - MANA_BAR_16         Mana/MP bar with blue fill
 * - XP_BAR_16           Experience bar with green/yellow fill (75%)
 * - TOOLTIP_BOX_16      Tooltip frame with triangle pointer
 * - DAMAGE_NUMBER_16    Floating damage number "42"
 * - STATUS_POISON_16    Poison status icon
 * - STATUS_FIRE_16      Fire/burn status icon
 * - MINIMAP_FRAME_16    Ornate minimap border frame
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// INVENTORY_SLOT_16 - Empty inventory slot with beveled inset border
// Dark inset square: light top-left edge, dark bottom-right edge
// ═══════════════════════════════════════════════════════════════
export const INVENTORY_SLOT_16: SpriteTemplate = {
  name: 'inventory_slot_16',
  width: 16,
  height: 16,
  description: 'Empty inventory slot. Dark inset square with beveled border (light top-left, dark bottom-right).',
  regions: [
    // Outer highlight edge - top and left (light bevel)
    { name: 'bevel_light', role: 'eye', pixels: [
      // Top edge row 1
      [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1],
      // Left edge rows 2-14
      [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [1, 13], [1, 14],
    ]},
    // Outer shadow edge - bottom and right (dark bevel)
    { name: 'bevel_dark', role: 'belt', pixels: [
      // Right edge rows 2-14
      [14, 2], [14, 3], [14, 4], [14, 5], [14, 6], [14, 7], [14, 8], [14, 9], [14, 10], [14, 11], [14, 12], [14, 13], [14, 14],
      // Bottom edge row 14
      [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
    ]},
    // Inner border frame (1px inside the bevel)
    { name: 'inner_frame', role: 'head', pixels: [
      // Top inner row 2
      [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2],
      // Left inner col 2, rows 3-12
      [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12],
      // Right inner col 13, rows 3-12
      [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12],
      // Bottom inner row 13
      [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13],
    ]},
    // Slot interior (dark empty space)
    { name: 'slot_bg', role: 'body', pixels: [
      // Rows 3-12, cols 3-12 = 10x10 interior
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
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
  ],
};

// ═══════════════════════════════════════════════════════════════
// MANA_BAR_16 - Horizontal mana/MP bar with blue fill
// Similar structure to health bar but blue-themed
// ═══════════════════════════════════════════════════════════════
export const MANA_BAR_16: SpriteTemplate = {
  name: 'mana_bar_16',
  width: 16,
  height: 16,
  description: 'Horizontal mana/MP bar. 2px border frame, blue fill, bright highlight strip, depleted section.',
  regions: [
    // Outer border frame (rows 4-11, 2px thick)
    { name: 'border', role: 'head', pixels: [
      // Top edge row 4
      [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
      [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4],
      // Top edge row 5 (sides only)
      [0, 5], [1, 5], [14, 5], [15, 5],
      // Left wall rows 6-9
      [0, 6], [1, 6],
      [0, 7], [1, 7],
      [0, 8], [1, 8],
      [0, 9], [1, 9],
      // Right wall rows 6-9
      [14, 6], [15, 6],
      [14, 7], [15, 7],
      [14, 8], [15, 8],
      [14, 9], [15, 9],
      // Bottom edge row 10 (sides only)
      [0, 10], [1, 10], [14, 10], [15, 10],
      // Bottom edge row 11
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11],
      [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11],
    ]},
    // Mana fill (blue) - interior rows 6-9, cols 2-11
    { name: 'mana_fill', role: 'body', pixels: [
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
    ]},
    // Mana highlight strip (top of fill, row 6)
    { name: 'mana_highlight', role: 'eye', pixels: [
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
    ]},
    // Depleted section (dark, right portion) cols 12-13 rows 6-9
    { name: 'depleted', role: 'belt', pixels: [
      [12, 6], [13, 6],
      [12, 7], [13, 7],
      [12, 8], [13, 8],
      [12, 9], [13, 9],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// XP_BAR_16 - Experience bar, green/yellow fill ~75% full
// Outer frame, green fill progressing left-to-right, dark unfilled
// ═══════════════════════════════════════════════════════════════
export const XP_BAR_16: SpriteTemplate = {
  name: 'xp_bar_16',
  width: 16,
  height: 16,
  description: 'Horizontal XP bar. Outer frame, green/yellow fill 75% full, dark unfilled section at right.',
  regions: [
    // Outer border frame (rows 4-11)
    { name: 'border', role: 'head', pixels: [
      // Top edge row 4
      [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
      [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4],
      // Top edge row 5 (sides only)
      [0, 5], [1, 5], [14, 5], [15, 5],
      // Left wall rows 6-9
      [0, 6], [1, 6],
      [0, 7], [1, 7],
      [0, 8], [1, 8],
      [0, 9], [1, 9],
      // Right wall rows 6-9
      [14, 6], [15, 6],
      [14, 7], [15, 7],
      [14, 8], [15, 8],
      [14, 9], [15, 9],
      // Bottom edge row 10 (sides only)
      [0, 10], [1, 10], [14, 10], [15, 10],
      // Bottom edge row 11
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11],
      [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11],
    ]},
    // XP fill (green/yellow) - 75% filled, cols 2-10
    { name: 'xp_fill', role: 'body', pixels: [
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // XP highlight strip (top of fill, row 6)
    { name: 'xp_highlight', role: 'eye', pixels: [
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
    ]},
    // Unfilled / depleted section (dark, right 25%) cols 11-13 rows 5-10
    { name: 'unfilled', role: 'belt', pixels: [
      [11, 5], [12, 5], [13, 5],
      [11, 6], [12, 6], [13, 6],
      [11, 7], [12, 7], [13, 7],
      [11, 8], [12, 8], [13, 8],
      [11, 9], [12, 9], [13, 9],
      [11, 10], [12, 10], [13, 10],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// TOOLTIP_BOX_16 - Tooltip frame with dark bg and triangle pointer
// Dark background, thin light border, small triangle at bottom center
// ═══════════════════════════════════════════════════════════════
export const TOOLTIP_BOX_16: SpriteTemplate = {
  name: 'tooltip_box_16',
  width: 16,
  height: 16,
  description: 'Tooltip frame. Dark semi-transparent background, light thin border, small triangle pointer at bottom center.',
  regions: [
    // Outer border (thin 1px frame, rows 1-10)
    { name: 'border', role: 'accessory', pixels: [
      // Top edge row 1
      [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1],
      // Left edge rows 2-9
      [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9],
      // Right edge rows 2-9
      [14, 2], [14, 3], [14, 4], [14, 5], [14, 6], [14, 7], [14, 8], [14, 9],
      // Bottom edge row 10
      [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10],
    ]},
    // Dark background fill (rows 2-9, cols 2-13)
    { name: 'bg_fill', role: 'body', pixels: [
      [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2],
      [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3],
      [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4],
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
    ]},
    // Triangle pointer at bottom center (rows 11-13)
    { name: 'pointer_outline', role: 'accessory', pixels: [
      [6, 11], [9, 11],
      [7, 12], [8, 12],
    ]},
    { name: 'pointer_fill', role: 'body', pixels: [
      [7, 11], [8, 11],
    ]},
    // Decorative text hint dots inside (row 5, suggesting content)
    { name: 'text_hint', role: 'arm', pixels: [
      [4, 5], [5, 5], [6, 5], [8, 5], [9, 5], [10, 5], [11, 5],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// DAMAGE_NUMBER_16 - Floating damage number "42"
// Red/orange digits on transparent background, motion trail below
// ═══════════════════════════════════════════════════════════════
export const DAMAGE_NUMBER_16: SpriteTemplate = {
  name: 'damage_number_16',
  width: 16,
  height: 16,
  description: 'Floating damage number "42". Red/orange digits with slight motion blur trail below.',
  regions: [
    // Digit "4" (cols 2-6, rows 3-9) - pixel font
    { name: 'digit_4', role: 'body', pixels: [
      // Vertical left stroke of 4
      [2, 3], [2, 4], [2, 5], [2, 6],
      // Horizontal bar of 4 (row 6)
      [3, 6], [4, 6], [5, 6],
      // Vertical right stroke of 4 (full height)
      [5, 3], [5, 4], [5, 5], [5, 7], [5, 8], [5, 9],
    ]},
    // Digit "2" (cols 8-12, rows 3-9) - pixel font
    { name: 'digit_2', role: 'body', pixels: [
      // Top bar of 2
      [8, 3], [9, 3], [10, 3], [11, 3],
      // Right stroke down
      [11, 4], [11, 5],
      // Middle bar of 2
      [8, 6], [9, 6], [10, 6], [11, 6],
      // Left stroke down
      [8, 7], [8, 8],
      // Bottom bar of 2
      [8, 9], [9, 9], [10, 9], [11, 9],
    ]},
    // Bright highlight on digits (top-left accent)
    { name: 'digit_highlight', role: 'eye', pixels: [
      [2, 3], [5, 3],
      [8, 3], [9, 3],
    ]},
    // Motion blur trail below digits (rows 11-13)
    { name: 'trail', role: 'arm', pixels: [
      [3, 11], [5, 11], [9, 11], [11, 11],
      [4, 12], [10, 12],
      [4, 13], [10, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// STATUS_POISON_16 - Poison status icon: green droplet on dark circle
// ═══════════════════════════════════════════════════════════════
export const STATUS_POISON_16: SpriteTemplate = {
  name: 'status_poison_16',
  width: 16,
  height: 16,
  description: 'Poison status icon. Green droplet shape on dark circular background.',
  regions: [
    // Dark background circle (rows 2-13)
    { name: 'bg_circle', role: 'belt', pixels: [
      // Row 2
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      // Row 3
      [4, 3], [5, 3], [6, 3], [9, 3], [10, 3], [11, 3],
      // Row 4
      [3, 4], [4, 4], [5, 4], [10, 4], [11, 4], [12, 4],
      // Row 5
      [3, 5], [4, 5], [11, 5], [12, 5],
      // Row 6
      [2, 6], [3, 6], [12, 6], [13, 6],
      // Row 7
      [2, 7], [3, 7], [12, 7], [13, 7],
      // Row 8
      [2, 8], [3, 8], [12, 8], [13, 8],
      // Row 9
      [2, 9], [3, 9], [12, 9], [13, 9],
      // Row 10
      [3, 10], [4, 10], [11, 10], [12, 10],
      // Row 11
      [3, 11], [4, 11], [5, 11], [10, 11], [11, 11], [12, 11],
      // Row 12
      [4, 12], [5, 12], [6, 12], [9, 12], [10, 12], [11, 12],
      // Row 13
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
    // Droplet body (green) - teardrop shape
    { name: 'droplet_body', role: 'body', pixels: [
      // Droplet tip (row 3)
      [7, 3], [8, 3],
      // Widening (rows 4-5)
      [6, 4], [7, 4], [8, 4], [9, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      // Full width (rows 6-9)
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      // Narrowing bottom (rows 10-11)
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
    // Droplet highlight (bright spot)
    { name: 'droplet_highlight', role: 'eye', pixels: [
      [5, 6], [6, 6],
      [5, 7],
    ]},
    // Droplet dark detail (skull-like eyes/marks inside)
    { name: 'droplet_detail', role: 'head', pixels: [
      [6, 7], [9, 7],
      [7, 9], [8, 9],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// STATUS_FIRE_16 - Fire/burn status icon: flame on dark circle
// ═══════════════════════════════════════════════════════════════
export const STATUS_FIRE_16: SpriteTemplate = {
  name: 'status_fire_16',
  width: 16,
  height: 16,
  description: 'Fire/burn status icon. Small flame shape on dark circular background.',
  regions: [
    // Dark background circle (rows 2-13)
    { name: 'bg_circle', role: 'belt', pixels: [
      // Row 2
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      // Row 3
      [4, 3], [5, 3], [10, 3], [11, 3],
      // Row 4
      [3, 4], [4, 4], [11, 4], [12, 4],
      // Row 5
      [3, 5], [4, 5], [11, 5], [12, 5],
      // Row 6
      [2, 6], [3, 6], [12, 6], [13, 6],
      // Row 7
      [2, 7], [3, 7], [12, 7], [13, 7],
      // Row 8
      [2, 8], [3, 8], [12, 8], [13, 8],
      // Row 9
      [2, 9], [3, 9], [12, 9], [13, 9],
      // Row 10
      [3, 10], [4, 10], [11, 10], [12, 10],
      // Row 11
      [3, 11], [4, 11], [11, 11], [12, 11],
      // Row 12
      [4, 12], [5, 12], [10, 12], [11, 12],
      // Row 13
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
    // Flame outer body (red/orange)
    { name: 'flame_outer', role: 'body', pixels: [
      // Flame tip (row 3)
      [7, 3],
      // Upper flame (rows 4-5)
      [6, 4], [7, 4], [8, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
      // Middle flame (rows 6-8) with lick on right
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [4, 7], [5, 7], [6, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [9, 8], [10, 8], [11, 8],
      // Lower flame (rows 9-11)
      [5, 9], [6, 9], [9, 9], [10, 9], [11, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
      // Base (row 12)
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Flame inner core (bright yellow/orange)
    { name: 'flame_core', role: 'accessory', pixels: [
      [7, 5], [8, 5],
      [6, 6], [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
    ]},
    // Flame hot center (brightest)
    { name: 'flame_hotspot', role: 'eye', pixels: [
      [7, 7], [8, 7],
      [7, 8],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// MINIMAP_FRAME_16 - Ornate minimap border frame
// Decorative square frame with corner ornaments, transparent center
// ═══════════════════════════════════════════════════════════════
export const MINIMAP_FRAME_16: SpriteTemplate = {
  name: 'minimap_frame_16',
  width: 16,
  height: 16,
  description: 'Ornate minimap border frame. Decorative square frame with corner decorations, transparent center.',
  regions: [
    // Main frame border (outer ring)
    { name: 'frame_outer', role: 'head', pixels: [
      // Top edge (row 0)
      [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0],
      // Top edge (row 1)
      [1, 1], [2, 1], [13, 1], [14, 1],
      // Left edge (rows 2-13)
      [0, 2], [1, 2],
      [0, 3], [1, 3],
      [0, 4], [1, 4],
      [0, 5], [1, 5],
      [0, 6], [1, 6],
      [0, 7], [1, 7],
      [0, 8], [1, 8],
      [0, 9], [1, 9],
      [0, 10], [1, 10],
      [0, 11], [1, 11],
      [0, 12], [1, 12],
      [0, 13], [1, 13],
      // Right edge (rows 2-13)
      [14, 2], [15, 2],
      [14, 3], [15, 3],
      [14, 4], [15, 4],
      [14, 5], [15, 5],
      [14, 6], [15, 6],
      [14, 7], [15, 7],
      [14, 8], [15, 8],
      [14, 9], [15, 9],
      [14, 10], [15, 10],
      [14, 11], [15, 11],
      [14, 12], [15, 12],
      [14, 13], [15, 13],
      // Bottom edge (row 14)
      [1, 14], [2, 14], [13, 14], [14, 14],
      // Bottom edge (row 15)
      [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15],
    ]},
    // Corner decorations (ornate corner pieces)
    { name: 'corner_tl', role: 'accessory', pixels: [
      [0, 0], [1, 0],
      [0, 1],
    ]},
    { name: 'corner_tr', role: 'accessory', pixels: [
      [14, 0], [15, 0],
      [15, 1],
    ]},
    { name: 'corner_bl', role: 'accessory', pixels: [
      [0, 14],
      [0, 15], [1, 15],
    ]},
    { name: 'corner_br', role: 'accessory', pixels: [
      [15, 14],
      [14, 15], [15, 15],
    ]},
    // Inner border trim (1px inside the frame, decorative edge)
    { name: 'inner_trim', role: 'arm', pixels: [
      // Top inner trim row 2
      [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2],
      // Left inner trim col 2
      [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12],
      // Right inner trim col 13
      [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12],
      // Bottom inner trim row 13
      [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13],
    ]},
    // Frame highlight (top-left inner glow)
    { name: 'frame_highlight', role: 'eye', pixels: [
      [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// QUEST_LOG_PANEL_16 - Quest journal window with title tab
// Parchment-like panel, text rows, and completion marker.
// ═══════════════════════════════════════════════════════════════
export const QUEST_LOG_PANEL_16: SpriteTemplate = {
  name: 'quest_log_panel_16',
  width: 16,
  height: 16,
  description: 'Quest log panel with framed parchment body, header tab, list rows, and completed quest marker.',
  regions: [
    { name: 'frame', role: 'head', pixels: [
      [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1],
      [1, 2], [14, 2], [1, 3], [14, 3], [1, 4], [14, 4], [1, 5], [14, 5], [1, 6], [14, 6], [1, 7], [14, 7],
      [1, 8], [14, 8], [1, 9], [14, 9], [1, 10], [14, 10], [1, 11], [14, 11], [1, 12], [14, 12], [1, 13], [14, 13],
      [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14],
    ]},
    { name: 'paper', role: 'body', pixels: [
      [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2],
      [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3],
      [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4],
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
      [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11],
      [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12],
      [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13],
    ]},
    { name: 'title_tab', role: 'accessory', pixels: [
      [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0],
      [4, 1], [10, 1],
    ]},
    { name: 'list_lines', role: 'arm', pixels: [
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    { name: 'check_done', role: 'eye', pixels: [[3, 8], [3, 9], [4, 9], [5, 8]] },
    { name: 'wax_stamp', role: 'belt', pixels: [[11, 12], [12, 12], [11, 13], [12, 13]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// DIALOG_CHOICE_BOX_16 - Two-option dialogue picker
// Includes a pointer arrow for selected option.
// ═══════════════════════════════════════════════════════════════
export const DIALOG_CHOICE_BOX_16: SpriteTemplate = {
  name: 'dialog_choice_box_16',
  width: 16,
  height: 16,
  description: 'Dialogue choice UI with framed panel, two rows of text, and selection arrow.',
  regions: [
    { name: 'box_frame', role: 'head', pixels: [
      [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4],
      [1, 5], [14, 5], [1, 6], [14, 6], [1, 7], [14, 7], [1, 8], [14, 8], [1, 9], [14, 9], [1, 10], [14, 10], [1, 11], [14, 11], [1, 12], [14, 12],
      [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13],
    ]},
    { name: 'box_fill', role: 'body', pixels: [
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
      [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11],
      [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12],
    ]},
    { name: 'choice_divider', role: 'belt', pixels: [
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
    ]},
    { name: 'choice_lines', role: 'arm', pixels: [
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    { name: 'selector', role: 'eye', pixels: [[3, 7], [4, 7], [3, 8]] },
    { name: 'corners', role: 'accessory', pixels: [[2, 5], [13, 5], [2, 12], [13, 12]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// QUICKSLOT_STRIP_16 - Four-slot action bar with active slot
// ═══════════════════════════════════════════════════════════════
export const QUICKSLOT_STRIP_16: SpriteTemplate = {
  name: 'quickslot_strip_16',
  width: 16,
  height: 16,
  description: 'Compact four-slot action bar with separators, active highlight, and cooldown overlay.',
  regions: [
    { name: 'strip_frame', role: 'head', pixels: [
      [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5],
      [0, 6], [15, 6], [0, 7], [15, 7], [0, 8], [15, 8], [0, 9], [15, 9], [0, 10], [15, 10],
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11],
    ]},
    { name: 'slots_fill', role: 'body', pixels: [
      [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6],
      [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7],
      [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
      [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9],
      [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10],
    ]},
    { name: 'slot_separators', role: 'arm', pixels: [
      [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
      [8, 6], [8, 7], [8, 8], [8, 9], [8, 10],
      [12, 6], [12, 7], [12, 8], [12, 9], [12, 10],
    ]},
    { name: 'active_slot', role: 'eye', pixels: [
      [9, 6], [10, 6], [11, 6],
      [9, 7], [11, 7],
      [9, 8], [11, 8],
      [9, 9], [11, 9],
      [9, 10], [10, 10], [11, 10],
    ]},
    { name: 'cooldown', role: 'belt', pixels: [[1, 8], [2, 8], [3, 8], [1, 9], [2, 9], [3, 9], [1, 10], [2, 10], [3, 10]] },
    { name: 'key_markers', role: 'accessory', pixels: [[2, 6], [6, 6], [10, 6], [14, 6]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// BUFF_TIMER_RING_16 - Circular buff icon with timer wedge
// ═══════════════════════════════════════════════════════════════
export const BUFF_TIMER_RING_16: SpriteTemplate = {
  name: 'buff_timer_ring_16',
  width: 16,
  height: 16,
  description: 'Circular buff icon ring with glowing core and countdown wedge segment.',
  regions: [
    { name: 'ring_outer', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [4, 2], [5, 2], [10, 2], [11, 2],
      [3, 3], [12, 3],
      [2, 4], [13, 4],
      [2, 5], [13, 5],
      [1, 6], [14, 6], [1, 7], [14, 7], [1, 8], [14, 8], [1, 9], [14, 9],
      [2, 10], [13, 10], [2, 11], [13, 11],
      [3, 12], [12, 12],
      [4, 13], [5, 13], [10, 13], [11, 13],
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
    { name: 'ring_fill', role: 'body', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    { name: 'timer_wedge', role: 'belt', pixels: [
      [9, 2], [10, 2], [11, 2], [11, 3], [12, 3], [12, 4], [13, 4], [13, 5], [13, 6], [13, 7],
    ]},
    { name: 'core_icon', role: 'accessory', pixels: [
      [7, 6], [8, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [7, 9], [8, 9],
    ]},
    { name: 'core_glint', role: 'eye', pixels: [[7, 6], [6, 7], [7, 7]] },
    { name: 'tick_marks', role: 'arm', pixels: [[7, 2], [8, 2], [3, 7], [3, 8], [7, 13], [8, 13], [12, 7], [12, 8]] },
  ],
};


// ═══════════════════════════════════════════════════════════════
// Color schemes for RPG UI elements (DB16 palette)
// Each maps repurposed roles to {shadow, base, highlight}
// ═══════════════════════════════════════════════════════════════

export const INVENTORY_SLOT_COLORS: ColorScheme = {
  name: 'inventory_slot_default',
  mapping: {
    body:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },   // dark slot interior
    head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },   // inner border frame
    eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },   // light bevel top-left
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark bevel bottom-right
    arm:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const MANA_BAR_COLORS: ColorScheme = {
  name: 'mana_bar_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },   // border frame
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // blue mana fill
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },   // bright highlight strip
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // depleted dark section
    arm:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const XP_BAR_COLORS: ColorScheme = {
  name: 'xp_bar_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },   // border frame
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green/yellow XP fill
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },   // bright highlight strip
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // unfilled dark section
    arm:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const TOOLTIP_BOX_COLORS: ColorScheme = {
  name: 'tooltip_box_default',
  mapping: {
    body:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },   // dark tooltip background
    accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },   // light border + pointer
    arm:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },   // text hint dots
    head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },   // (unused)
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    belt:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const DAMAGE_NUMBER_COLORS: ColorScheme = {
  name: 'damage_number_default',
  mapping: {
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },   // red/orange digits
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // bright digit highlight
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d04648' },   // motion trail
    head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    belt:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const STATUS_POISON_COLORS: ColorScheme = {
  name: 'status_poison_default',
  mapping: {
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green droplet body
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark bg circle
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },   // bright highlight
    head:      { shadow: '#140c1c', base: '#442434', highlight: '#140c1c' },   // skull detail marks
    accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    arm:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const STATUS_FIRE_COLORS: ColorScheme = {
  name: 'status_fire_default',
  mapping: {
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },   // red/orange flame outer
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark bg circle
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },   // flame inner core
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },   // flame hotspot
    head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    arm:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const MINIMAP_FRAME_COLORS: ColorScheme = {
  name: 'minimap_frame_default',
  mapping: {
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // main frame border
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },   // gold corner decorations
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // inner trim line
    eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },   // top-left highlight
    body:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused - transparent center)
    belt:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const QUEST_LOG_PANEL_COLORS: ColorScheme = {
  name: 'quest_log_panel_default',
  mapping: {
    head:      { shadow: '#442434', base: '#757161', highlight: '#8595a1' },
    body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  },
};

export const DIALOG_CHOICE_BOX_COLORS: ColorScheme = {
  name: 'dialog_choice_box_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
    body:      { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
    belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
    arm:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
    accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  },
};

export const QUICKSLOT_STRIP_COLORS: ColorScheme = {
  name: 'quickslot_strip_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
    body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  },
};

export const BUFF_TIMER_RING_COLORS: ColorScheme = {
  name: 'buff_timer_ring_default',
  mapping: {
    head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    body:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#8595a1' },
    belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  },
};


// ═══════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════

export const RPG_UI_TEMPLATES: Record<string, SpriteTemplate> = {
  inventory_slot_16: INVENTORY_SLOT_16,
  mana_bar_16: MANA_BAR_16,
  xp_bar_16: XP_BAR_16,
  tooltip_box_16: TOOLTIP_BOX_16,
  damage_number_16: DAMAGE_NUMBER_16,
  status_poison_16: STATUS_POISON_16,
  status_fire_16: STATUS_FIRE_16,
  minimap_frame_16: MINIMAP_FRAME_16,
  quest_log_panel_16: QUEST_LOG_PANEL_16,
  dialog_choice_box_16: DIALOG_CHOICE_BOX_16,
  quickslot_strip_16: QUICKSLOT_STRIP_16,
  buff_timer_ring_16: BUFF_TIMER_RING_16,
};

export const RPG_UI_COLOR_SCHEMES: Record<string, ColorScheme> = {
  inventory_slot_default: INVENTORY_SLOT_COLORS,
  mana_bar_default: MANA_BAR_COLORS,
  xp_bar_default: XP_BAR_COLORS,
  tooltip_box_default: TOOLTIP_BOX_COLORS,
  damage_number_default: DAMAGE_NUMBER_COLORS,
  status_poison_default: STATUS_POISON_COLORS,
  status_fire_default: STATUS_FIRE_COLORS,
  minimap_frame_default: MINIMAP_FRAME_COLORS,
  quest_log_panel_default: QUEST_LOG_PANEL_COLORS,
  dialog_choice_box_default: DIALOG_CHOICE_BOX_COLORS,
  quickslot_strip_default: QUICKSLOT_STRIP_COLORS,
  buff_timer_ring_default: BUFF_TIMER_RING_COLORS,
};
