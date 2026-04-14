/**
 * 16x16 UI element templates for game interfaces.
 * Repurposed character roles for UI semantics:
 * - 'body'      = main fill / background
 * - 'head'      = secondary / border
 * - 'accessory' = accent / decoration
 * - 'eye'       = special highlight
 * - 'belt'      = divider / edge
 * - 'arm'       = thin detail line
 *
 * Each template defines pixel regions for a recognizable UI element.
 * Regions are arrays of [x, y] coordinates within a 16x16 grid (0-15).
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// HEALTH_BAR_16 - Horizontal health bar with border frame,
// red fill, and small depleted section at the right end
// ═══════════════════════════════════════════════════════════════
export const HEALTH_BAR_16: SpriteTemplate = {
  name: 'health_bar_16',
  width: 16,
  height: 16,
  description: 'Horizontal health bar. 2px thick border frame, red fill interior, small dark depleted section at right.',
  regions: [
    // Outer border frame (2px thick rectangle from row 4 to row 11)
    // Top border: rows 4-5, full width
    // Bottom border: rows 10-11, full width
    // Left border: col 0-1, rows 6-9
    // Right border: col 14-15, rows 6-9
    { name: 'border', role: 'head', pixels: [
      // Top edge row 4
      [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
      [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4],
      // Top edge row 5
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
      // Bottom edge row 10
      [0, 10], [1, 10], [14, 10], [15, 10],
      // Bottom edge row 11
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11],
      [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11],
    ]},
    // Health fill (red) - interior rows 6-9, cols 2-10
    { name: 'health_fill', role: 'body', pixels: [
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
    ]},
    // Health highlight strip (top of fill, row 6 lighter)
    { name: 'health_highlight', role: 'eye', pixels: [
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
    ]},
    // Depleted section (dark, right portion of interior) cols 11-13 rows 6-9
    { name: 'depleted', role: 'belt', pixels: [
      [11, 6], [12, 6], [13, 6],
      [11, 7], [12, 7], [13, 7],
      [11, 8], [12, 8], [13, 8],
      [11, 9], [12, 9], [13, 9],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BUTTON_16 - Rounded push button with highlight and shadow
// ═══════════════════════════════════════════════════════════════
export const BUTTON_16: SpriteTemplate = {
  name: 'button_16',
  width: 16,
  height: 16,
  description: 'Rounded push button. Top highlight strip, bottom shadow, center fill for text area.',
  regions: [
    // Button border / outline (rounded rectangle rows 3-12)
    { name: 'border', role: 'head', pixels: [
      // Top rounded edge row 3 (inset corners)
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      // Left edge rows 4-11
      [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11],
      // Right edge rows 4-11
      [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11],
      // Bottom rounded edge row 12
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
    ]},
    // Top highlight strip (row 4, bright)
    { name: 'highlight', role: 'eye', pixels: [
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
    ]},
    // Main button fill / center text area (rows 5-10)
    { name: 'fill', role: 'body', pixels: [
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
    ]},
    // Bottom shadow strip (row 11, darker)
    { name: 'shadow', role: 'belt', pixels: [
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
    ]},
    // Inner text detail (tiny marks to suggest text, row 7-8 center)
    { name: 'text_detail', role: 'arm', pixels: [
      [5, 7], [6, 7], [7, 7], [9, 7], [10, 7],
      [5, 8], [7, 8], [8, 8], [10, 8],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CURSOR_16 - Classic arrow cursor pointing upper-left
// ═══════════════════════════════════════════════════════════════
export const CURSOR_16: SpriteTemplate = {
  name: 'cursor_16',
  width: 16,
  height: 16,
  description: 'Classic arrow cursor pointing upper-left. White fill with black outline.',
  regions: [
    // Cursor outline (black border of the arrow shape)
    { name: 'outline', role: 'head', pixels: [
      [1, 0],
      [1, 1], [2, 1],
      [1, 2], [3, 2],
      [1, 3], [4, 3],
      [1, 4], [5, 4],
      [1, 5], [6, 5],
      [1, 6], [7, 6],
      [1, 7], [8, 7],
      [1, 8], [9, 8],
      [1, 9], [10, 9],
      [1, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [1, 11], [2, 11], [3, 11], [4, 11], [5, 11],
      [3, 12], [6, 12],
      [3, 13], [7, 13],
      [4, 14], [7, 14],
      [5, 15], [7, 15],
    ]},
    // Cursor fill (white interior of the arrow)
    { name: 'fill', role: 'body', pixels: [
      [2, 2],
      [2, 3], [3, 3],
      [2, 4], [3, 4], [4, 4],
      [2, 5], [3, 5], [4, 5], [5, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9],
      [2, 10], [3, 10], [4, 10],
      [2, 11],
    ]},
    // Highlight on upper-left edge of cursor (small bright accent)
    { name: 'highlight', role: 'eye', pixels: [
      [2, 3], [2, 4], [2, 5],
    ]},
    // Shadow on bottom-right inside edge
    { name: 'inner_shadow', role: 'arm', pixels: [
      [4, 12], [5, 12],
      [4, 13], [5, 13], [6, 13],
      [5, 14], [6, 14],
      [6, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// SPEECH_BUBBLE_16 - Rounded rectangle with triangular tail
// at bottom-left
// ═══════════════════════════════════════════════════════════════
export const SPEECH_BUBBLE_16: SpriteTemplate = {
  name: 'speech_bubble_16',
  width: 16,
  height: 16,
  description: 'Speech bubble. Rounded white rectangle body with small triangular tail at bottom-left.',
  regions: [
    // Bubble border (rounded rectangle rows 1-9)
    { name: 'border', role: 'head', pixels: [
      // Top edge row 1 (rounded corners inset by 1)
      [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1],
      // Left edge rows 2-8
      [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
      // Right edge rows 2-8
      [14, 2], [14, 3], [14, 4], [14, 5], [14, 6], [14, 7], [14, 8],
      // Bottom edge row 9 (rounded corners inset by 1)
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
    ]},
    // Bubble fill (white interior rows 2-8, cols 2-13)
    { name: 'fill', role: 'body', pixels: [
      [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2],
      [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3],
      [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4],
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
    ]},
    // Tail (triangle pointing down-left from bottom of bubble)
    { name: 'tail_outline', role: 'head', pixels: [
      [3, 10], [5, 10],
      [2, 11], [5, 11],
      [1, 12], [4, 12],
      [1, 13], [2, 13], [3, 13],
    ]},
    { name: 'tail_fill', role: 'body', pixels: [
      [4, 10],
      [3, 11], [4, 11],
      [2, 12], [3, 12],
    ]},
    // Text dots (decorative ellipsis inside bubble, row 5)
    { name: 'text_dots', role: 'accessory', pixels: [
      [4, 5], [5, 5], [7, 5], [8, 5], [10, 5], [11, 5],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// COIN_ICON_16 - Circular gold coin with inner detail
// ═══════════════════════════════════════════════════════════════
export const COIN_ICON_16: SpriteTemplate = {
  name: 'coin_icon_16',
  width: 16,
  height: 16,
  description: 'Circular gold coin. Outer rim, inner circle, cross/symbol detail in center.',
  regions: [
    // Outer rim / border (circle outline)
    { name: 'rim', role: 'head', pixels: [
      // Top arc
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [3, 2], [4, 2], [11, 2], [12, 2],
      // Left side
      [2, 3], [2, 4],
      [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],
      [2, 11], [2, 12],
      // Right side
      [13, 3], [13, 4],
      [14, 5], [14, 6], [14, 7], [14, 8], [14, 9], [14, 10],
      [13, 11], [13, 12],
      // Bottom arc
      [3, 13], [4, 13], [11, 13], [12, 13],
      [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14],
    ]},
    // Main coin body (gold fill)
    { name: 'coin_face', role: 'body', pixels: [
      // Row 2 inner
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      // Row 3
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      // Row 4
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      // Row 5
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      // Row 6
      [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
      // Row 7
      [2, 7], [3, 7], [4, 7], [11, 7], [12, 7], [13, 7],
      // Row 8
      [2, 8], [3, 8], [4, 8], [11, 8], [12, 8], [13, 8],
      // Row 9
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      // Row 10
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
      // Row 11
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      // Row 12
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
      // Row 13 inner
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
    // Inner cross / symbol detail
    { name: 'cross_symbol', role: 'accessory', pixels: [
      // Vertical bar of cross
      [7, 5], [8, 5],
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      // Horizontal bar of cross
      [5, 7], [6, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [9, 8], [10, 8],
    ]},
    // Highlight (upper-left coin shine)
    { name: 'shine', role: 'eye', pixels: [
      [5, 3], [6, 3],
      [4, 4], [5, 4],
      [3, 5], [4, 5],
      [3, 6],
    ]},
    // Shadow edge (bottom-right darkening)
    { name: 'shadow_edge', role: 'belt', pixels: [
      [12, 10], [13, 10],
      [11, 11], [12, 11],
      [10, 12], [11, 12],
      [9, 13], [10, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// STAR_ICON_16 - 5-pointed star centered in the grid
// ═══════════════════════════════════════════════════════════════
export const STAR_ICON_16: SpriteTemplate = {
  name: 'star_icon_16',
  width: 16,
  height: 16,
  description: '5-pointed star shape centered in 16x16 grid. Highlight on upper-left facet.',
  regions: [
    // Star outline
    { name: 'outline', role: 'head', pixels: [
      // Top point
      [7, 0], [8, 0],
      [7, 1], [8, 1],
      [6, 2], [9, 2],
      // Upper slopes
      [5, 3], [10, 3],
      [4, 4], [11, 4],
      // Upper-left arm
      [0, 5], [1, 5], [2, 5], [3, 5],
      [1, 6], [2, 6],
      // Upper-right arm
      [12, 5], [13, 5], [14, 5], [15, 5],
      [13, 6], [14, 6],
      // Lower slopes to valley
      [3, 7],
      [2, 8],
      [12, 7],
      [13, 8],
      // Lower-left leg
      [2, 9],
      [1, 10], [2, 10],
      [1, 11],
      [0, 12], [1, 12],
      [0, 13],
      // Lower-right leg
      [13, 9],
      [13, 10], [14, 10],
      [14, 11],
      [14, 12], [15, 12],
      [15, 13],
      // Bottom
      [1, 13], [2, 13], [3, 13],
      [12, 13], [13, 13], [14, 13],
      [3, 14], [4, 14],
      [11, 14], [12, 14],
      [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15],
      [5, 14], [10, 14],
    ]},
    // Star main fill
    { name: 'fill', role: 'body', pixels: [
      // Top inner section
      [7, 2], [8, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      // Middle wide section (arms)
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      // Narrowing center
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      // Lower inner section
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11],
      [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12],
      [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
    // Highlight on upper-left facet
    { name: 'highlight', role: 'eye', pixels: [
      [6, 3], [7, 3],
      [5, 4], [6, 4],
      [4, 5], [5, 5],
      [3, 6], [4, 6],
    ]},
    // Shadow on lower-right facet
    { name: 'shadow', role: 'belt', pixels: [
      [11, 9], [12, 9],
      [12, 10], [12, 11],
      [12, 12], [13, 12],
      [11, 13],
    ]},
    // Center accent detail
    { name: 'center_accent', role: 'accessory', pixels: [
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// COZY_CALENDAR_16 - Wall calendar icon for life sim UI
// ═══════════════════════════════════════════════════════════════
export const COZY_CALENDAR_16: SpriteTemplate = {
  name: 'cozy_calendar_16',
  width: 16,
  height: 16,
  description: 'Cozy wall calendar icon with wood frame, soft paper sheet, date dots, and heart-marked day.',
  regions: [
    { name: 'frame', role: 'head', pixels: [
      [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1],
      [2, 2], [13, 2], [2, 3], [13, 3], [2, 4], [13, 4], [2, 5], [13, 5], [2, 6], [13, 6], [2, 7], [13, 7],
      [2, 8], [13, 8], [2, 9], [13, 9], [2, 10], [13, 10], [2, 11], [13, 11], [2, 12], [13, 12], [2, 13], [13, 13],
      [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
    ]},
    { name: 'paper', role: 'body', pixels: [
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
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
    ]},
    { name: 'header_strip', role: 'accessory', pixels: [
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      [4, 2], [5, 2], [10, 2], [11, 2],
    ]},
    { name: 'date_dots', role: 'arm', pixels: [
      [5, 6], [7, 6], [9, 6], [11, 6],
      [5, 8], [7, 8], [9, 8], [11, 8],
      [5, 10], [7, 10], [9, 10], [11, 10],
    ]},
    { name: 'special_day_heart', role: 'eye', pixels: [[8, 12], [9, 12], [8, 13], [9, 13]] },
    { name: 'pins', role: 'belt', pixels: [[4, 1], [11, 1]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// RECIPE_CARD_16 - Cozy crafting/recipe notebook card
// ═══════════════════════════════════════════════════════════════
export const RECIPE_CARD_16: SpriteTemplate = {
  name: 'recipe_card_16',
  width: 16,
  height: 16,
  description: 'Recipe card with stitched border, title ribbon, ingredient lines, and checked step marker.',
  regions: [
    { name: 'card_border', role: 'head', pixels: [
      [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2],
      [2, 3], [13, 3], [2, 4], [13, 4], [2, 5], [13, 5], [2, 6], [13, 6], [2, 7], [13, 7], [2, 8], [13, 8],
      [2, 9], [13, 9], [2, 10], [13, 10], [2, 11], [13, 11], [2, 12], [13, 12], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13],
    ]},
    { name: 'card_fill', role: 'body', pixels: [
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
    { name: 'title_ribbon', role: 'accessory', pixels: [[4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4]] },
    { name: 'ingredient_lines', role: 'arm', pixels: [
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
    { name: 'checkmark', role: 'eye', pixels: [[4, 11], [4, 12], [5, 12]] },
    { name: 'drop_shadow', role: 'belt', pixels: [[4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// TEA_CUP_ICON_16 - Warm cozy drink icon
// ═══════════════════════════════════════════════════════════════
export const TEA_CUP_ICON_16: SpriteTemplate = {
  name: 'tea_cup_icon_16',
  width: 16,
  height: 16,
  description: 'Cozy tea cup icon with steam wisps, warm liquid surface, and saucer shadow.',
  regions: [
    { name: 'cup_rim', role: 'head', pixels: [[4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6]] },
    { name: 'cup_body', role: 'body', pixels: [
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    { name: 'tea_surface', role: 'belt', pixels: [[5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7]] },
    { name: 'handle', role: 'accessory', pixels: [[12, 7], [13, 7], [13, 8], [13, 9], [12, 10]] },
    { name: 'steam', role: 'arm', pixels: [[5, 2], [5, 3], [6, 4], [8, 2], [8, 3], [9, 4], [10, 1], [10, 2], [11, 3]] },
    { name: 'sparkle', role: 'eye', pixels: [[6, 8], [7, 8]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// KNITTING_ICON_16 - Yarn and needles icon for cozy crafting UI
// ═══════════════════════════════════════════════════════════════
export const KNITTING_ICON_16: SpriteTemplate = {
  name: 'knitting_icon_16',
  width: 16,
  height: 16,
  description: 'Knitting icon with yarn ball, crossed needles, thread detail, and soft floor shadow.',
  regions: [
    { name: 'yarn_ball', role: 'body', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    { name: 'thread_lines', role: 'head', pixels: [[6, 5], [8, 5], [10, 6], [5, 7], [7, 7], [9, 7], [6, 8], [8, 8]] },
    { name: 'needles', role: 'accessory', pixels: [[3, 3], [4, 4], [5, 5], [10, 10], [11, 11], [12, 12], [12, 3], [11, 4], [10, 5], [5, 10], [4, 11], [3, 12]] },
    { name: 'shine', role: 'eye', pixels: [[6, 6], [7, 6], [6, 7]] },
    { name: 'shadow', role: 'belt', pixels: [[5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10]] },
    { name: 'stitch', role: 'arm', pixels: [[12, 12], [13, 12], [13, 13]] },
  ],
};


// ═══════════════════════════════════════════════════════════════
// Color schemes for UI elements (DB16 palette)
// Each maps repurposed roles to {shadow, base, highlight}
// ═══════════════════════════════════════════════════════════════

export const HEALTH_BAR_COLORS: ColorScheme = {
  name: 'health_bar_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },   // border frame
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },   // red health fill
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // bright highlight strip
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // depleted dark section
    arm:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const BUTTON_COLORS: ColorScheme = {
  name: 'button_default',
  mapping: {
    head:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },   // border
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },   // blue button fill
    eye:       { shadow: '#8595a1', base: '#6dc2ca', highlight: '#deeed6' },   // top highlight
    belt:      { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },   // bottom shadow
    arm:       { shadow: '#140c1c', base: '#deeed6', highlight: '#deeed6' },   // text detail
    accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const CURSOR_COLORS: ColorScheme = {
  name: 'cursor_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#4e4a4e' },   // black outline
    body:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },   // white fill
    eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },   // bright highlight
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // inner shadow
    belt:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const SPEECH_BUBBLE_COLORS: ColorScheme = {
  name: 'speech_bubble_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },   // border
    body:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },   // white fill
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // text dots
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    belt:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
    arm:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const COIN_ICON_COLORS: ColorScheme = {
  name: 'coin_icon_default',
  mapping: {
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },   // gold rim
    body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // gold face
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },   // cross detail
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },   // upper-left shine
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // shadow edge
    arm:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const STAR_ICON_COLORS: ColorScheme = {
  name: 'star_icon_default',
  mapping: {
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },   // star outline
    body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // star fill (gold/yellow)
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },   // upper-left highlight
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // lower-right shadow
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },   // center accent
    arm:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },   // (unused)
  },
};

export const COZY_CALENDAR_COLORS: ColorScheme = {
  name: 'cozy_calendar_default',
  mapping: {
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    arm:       { shadow: '#757161', base: '#4e4a4e', highlight: '#8595a1' },
    eye:       { shadow: '#d04648', base: '#d04648', highlight: '#deeed6' },
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  },
};

export const RECIPE_CARD_COLORS: ColorScheme = {
  name: 'recipe_card_default',
  mapping: {
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    arm:       { shadow: '#757161', base: '#4e4a4e', highlight: '#8595a1' },
    eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  },
};

export const TEA_CUP_ICON_COLORS: ColorScheme = {
  name: 'tea_cup_icon_default',
  mapping: {
    head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    body:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
    arm:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  },
};

export const KNITTING_ICON_COLORS: ColorScheme = {
  name: 'knitting_icon_default',
  mapping: {
    body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    head:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
    arm:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  },
};


// ═══════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════

export const UI_TEMPLATES: Record<string, SpriteTemplate> = {
  health_bar_16: HEALTH_BAR_16,
  button_16: BUTTON_16,
  cursor_16: CURSOR_16,
  speech_bubble_16: SPEECH_BUBBLE_16,
  coin_icon_16: COIN_ICON_16,
  star_icon_16: STAR_ICON_16,
  cozy_calendar_16: COZY_CALENDAR_16,
  recipe_card_16: RECIPE_CARD_16,
  tea_cup_icon_16: TEA_CUP_ICON_16,
  knitting_icon_16: KNITTING_ICON_16,
};

export const UI_COLOR_SCHEMES: Record<string, ColorScheme> = {
  health_bar_default: HEALTH_BAR_COLORS,
  button_default: BUTTON_COLORS,
  cursor_default: CURSOR_COLORS,
  speech_bubble_default: SPEECH_BUBBLE_COLORS,
  coin_icon_default: COIN_ICON_COLORS,
  star_icon_default: STAR_ICON_COLORS,
  cozy_calendar_default: COZY_CALENDAR_COLORS,
  recipe_card_default: RECIPE_CARD_COLORS,
  tea_cup_icon_default: TEA_CUP_ICON_COLORS,
  knitting_icon_default: KNITTING_ICON_COLORS,
};
