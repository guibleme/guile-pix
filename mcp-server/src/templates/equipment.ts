/**
 * 16x16 RPG equipment templates (weapons and armor) — REBUILT for density.
 * Target density: 28-45% per template (handles 3px wide, blades filled).
 *
 * Role mapping for equipment:
 * - 'body'      = main material (blade, wood, metal plate)
 * - 'head'      = secondary material (guard, trim, visor)
 * - 'accessory' = decoration/detail (gems, engravings)
 * - 'eye'       = bright highlight/gem
 * - 'belt'      = binding/strap
 * - 'arm'       = handle/shaft
 * - 'leg'       = lower section
 * - 'boot'      = base/tip
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// =================================================================
// BOW - Curved bow with bowstring and nocked arrow
// Rebuilt: 3px-wide limbs, 3px grip, thicker arrow
// =================================================================
export const BOW_16: SpriteTemplate = {
  name: 'bow_16',
  width: 16,
  height: 16,
  description: 'Curved bow with taut bowstring and nocked arrow. C-shaped wood frame, vertical orientation.',
  regions: [
    // Bow limb upper tip (y1-2)
    { name: 'limb_upper_tip', role: 'body', pixels: [
      [9, 1], [10, 1], [11, 1],
      [10, 2], [11, 2], [12, 2],
    ]},
    // Bow limb upper curve (y3-5)
    { name: 'limb_upper', role: 'body', pixels: [
      [11, 3], [12, 3], [13, 3],
      [12, 4], [13, 4],
      [12, 5], [13, 5], [14, 5],
    ]},
    // Bow grip / handle (y6-9) — 3px wide
    { name: 'grip', role: 'arm', pixels: [
      [12, 6], [13, 6], [14, 6],
      [12, 7], [13, 7], [14, 7],
      [12, 8], [13, 8], [14, 8],
      [12, 9], [13, 9], [14, 9],
    ]},
    // Bow limb lower curve (y10-12)
    { name: 'limb_lower', role: 'body', pixels: [
      [12, 10], [13, 10], [14, 10],
      [12, 11], [13, 11],
      [11, 12], [12, 12], [13, 12],
    ]},
    // Bow limb lower tip (y13-14)
    { name: 'limb_lower_tip', role: 'body', pixels: [
      [10, 13], [11, 13], [12, 13],
      [9, 14], [10, 14], [11, 14],
    ]},
    // Bowstring (left side, y1-14)
    { name: 'bowstring', role: 'belt', pixels: [
      [8, 1],
      [8, 2], [9, 2],
      [8, 3], [9, 3],
      [8, 4], [9, 4],
      [8, 5],
      [8, 6],
      [8, 9],
      [8, 10],
      [8, 11], [9, 11],
      [8, 12], [9, 12],
      [8, 13],
      [8, 14],
    ]},
    // Arrow shaft (horizontal, y7-8)
    { name: 'arrow_shaft', role: 'head', pixels: [
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8],
    ]},
    // Arrow tip (left end, wider head)
    { name: 'arrow_tip', role: 'accessory', pixels: [
      [2, 6],
      [1, 7], [2, 7],
      [1, 8], [2, 8],
      [2, 9],
    ]},
    // Arrow fletching (right, near nock)
    { name: 'fletching', role: 'accessory', pixels: [
      [9, 7], [10, 7],
      [9, 8], [10, 8],
    ]},
  ],
};

// =================================================================
// STAFF - Magic staff, vertical orientation
// Rebuilt: 3px shaft, bigger orb, wider bindings + ferrule
// =================================================================
export const STAFF_16: SpriteTemplate = {
  name: 'staff_16',
  width: 16,
  height: 16,
  description: 'Vertical magic staff with glowing crystal orb at top and rune detail on shaft.',
  regions: [
    // Crystal orb glow (y0-1)
    { name: 'orb_glow', role: 'eye', pixels: [
      [6, 0], [7, 0], [8, 0], [9, 0],
      [5, 1], [10, 1],
    ]},
    // Crystal orb body (y1-3) — bigger
    { name: 'orb', role: 'accessory', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
    ]},
    // Staff head / setting (y3-4)
    { name: 'setting', role: 'head', pixels: [
      [5, 3], [10, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
    ]},
    // Shaft upper (y5-7) — 3px wide
    { name: 'shaft_upper', role: 'body', pixels: [
      [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7], [9, 7],
    ]},
    // Rune detail on shaft (y8-9)
    { name: 'rune', role: 'accessory', pixels: [
      [6, 8], [7, 8],
      [6, 9], [9, 9], [10, 9],
    ]},
    // Shaft mid (y8-9) — around rune
    { name: 'shaft_mid', role: 'body', pixels: [
      [8, 8], [9, 8], [10, 8],
      [7, 9], [8, 9],
    ]},
    // Shaft lower (y10-13) — 3px wide
    { name: 'shaft_lower', role: 'body', pixels: [
      [7, 10], [8, 10], [9, 10],
      [7, 11], [8, 11], [9, 11],
      [7, 12], [8, 12], [9, 12],
      [7, 13], [8, 13], [9, 13],
    ]},
    // Staff ferrule (y14-15) — wider 4px cap
    { name: 'ferrule', role: 'boot', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
      [6, 15], [7, 15], [8, 15], [9, 15],
    ]},
    // Binding wraps on shaft (y5, y10) — wider
    { name: 'bindings', role: 'belt', pixels: [
      [5, 5], [6, 5], [10, 5], [11, 5],
      [5, 10], [6, 10], [10, 10], [11, 10],
    ]},
    // Shaft accent details
    { name: 'shaft_accent', role: 'belt', pixels: [
      [6, 6], [10, 6],
      [6, 12], [10, 12],
    ]},
  ],
};

// =================================================================
// AXE - Battle axe, vertical orientation
// Rebuilt: 2px handle, wider head back, bigger pommel
// =================================================================
export const AXE_16: SpriteTemplate = {
  name: 'axe_16',
  width: 16,
  height: 16,
  description: 'Battle axe with wide curved metal head and vertical wooden handle.',
  regions: [
    // Axe head top edge (y1)
    { name: 'head_top', role: 'body', pixels: [
      [4, 1], [5, 1], [6, 1], [7, 1],
    ]},
    // Axe head main blade (y2-5)
    { name: 'blade', role: 'body', pixels: [
      [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
      [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
      [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
    ]},
    // Axe cutting edge highlight (left side)
    { name: 'edge', role: 'eye', pixels: [
      [3, 1],
      [2, 2],
      [1, 3],
      [1, 4],
      [2, 5],
    ]},
    // Axe head back — 3px wide (where handle passes through)
    { name: 'head_back', role: 'head', pixels: [
      [8, 2], [9, 2], [10, 2],
      [8, 3], [9, 3], [10, 3],
      [8, 4], [9, 4], [10, 4],
      [8, 5], [9, 5], [10, 5],
    ]},
    // Handle upper (y6-8) — 2px wide
    { name: 'handle_upper', role: 'arm', pixels: [
      [8, 6], [9, 6],
      [8, 7], [9, 7],
      [8, 8], [9, 8],
    ]},
    // Handle binding (y9) — wider
    { name: 'binding', role: 'belt', pixels: [
      [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
    ]},
    // Handle lower (y10-13) — 2px wide
    { name: 'handle_lower', role: 'arm', pixels: [
      [8, 10], [9, 10],
      [8, 11], [9, 11],
      [8, 12], [9, 12],
      [8, 13], [9, 13],
    ]},
    // Handle wraps detail
    { name: 'handle_wraps', role: 'belt', pixels: [
      [7, 7], [10, 7],
      [7, 11], [10, 11],
    ]},
    // Handle pommel (y14-15) — bigger
    { name: 'pommel', role: 'boot', pixels: [
      [7, 14], [8, 14], [9, 14], [10, 14],
      [7, 15], [8, 15], [9, 15], [10, 15],
    ]},
  ],
};

// =================================================================
// DAGGER - Short dagger with crossguard and leather grip
// Rebuilt: 3px blade, 2-row guard, 3px grip, bigger pommel
// =================================================================
export const DAGGER_16: SpriteTemplate = {
  name: 'dagger_16',
  width: 16,
  height: 16,
  description: 'Short dagger with pointed blade, crossguard, and leather-wrapped grip. Compact and centered.',
  regions: [
    // Blade tip (y1-2) — pointed
    { name: 'blade_tip', role: 'body', pixels: [
      [7, 1], [8, 1],
      [7, 2], [8, 2],
    ]},
    // Blade upper (y3-5) — 3px wide
    { name: 'blade_upper', role: 'body', pixels: [
      [7, 3], [8, 3], [9, 3],
      [7, 4], [8, 4], [9, 4],
      [7, 5], [8, 5], [9, 5],
    ]},
    // Blade lower (y6-7) — 3px wide
    { name: 'blade_lower', role: 'body', pixels: [
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    // Blade edge highlight
    { name: 'blade_highlight', role: 'eye', pixels: [
      [8, 1],
      [9, 2],
      [10, 4],
      [10, 6],
    ]},
    // Crossguard (y8-9) — 2 rows for chunky look
    { name: 'crossguard', role: 'head', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [5, 9], [6, 9], [9, 9], [10, 9],
    ]},
    // Grip binding (y10-12) — 3px wide
    { name: 'grip', role: 'belt', pixels: [
      [7, 10], [8, 10], [9, 10],
      [7, 11], [8, 11], [9, 11],
      [7, 12], [8, 12], [9, 12],
    ]},
    // Pommel (y13-14) — bigger rounded bottom
    { name: 'pommel', role: 'boot', pixels: [
      [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
      [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

// =================================================================
// SPEAR - Long spear, vertical orientation
// Rebuilt: 3px shaft, wider tip, bigger crosspiece
// =================================================================
export const SPEAR_16: SpriteTemplate = {
  name: 'spear_16',
  width: 16,
  height: 16,
  description: 'Long spear with pointed metal tip, small crosspiece, and wooden shaft.',
  regions: [
    // Spear tip (y0-2) — bigger triangular point
    { name: 'spear_tip', role: 'body', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
    ]},
    // Spear tip highlight
    { name: 'tip_highlight', role: 'eye', pixels: [
      [9, 0],
      [10, 1],
      [11, 2],
    ]},
    // Socket (y3-4) — 3px wide
    { name: 'socket', role: 'head', pixels: [
      [7, 3], [8, 3], [9, 3],
      [7, 4], [8, 4], [9, 4],
    ]},
    // Crosspiece (y5) — wider lugs
    { name: 'crosspiece', role: 'accessory', pixels: [
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
    ]},
    // Shaft upper (y6-9) — 3px wide
    { name: 'shaft_upper', role: 'arm', pixels: [
      [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7], [9, 7],
      [7, 8], [8, 8], [9, 8],
      [7, 9], [8, 9], [9, 9],
    ]},
    // Shaft lower (y10-13) — 3px wide
    { name: 'shaft_lower', role: 'arm', pixels: [
      [7, 10], [8, 10], [9, 10],
      [7, 11], [8, 11], [9, 11],
      [7, 12], [8, 12], [9, 12],
      [7, 13], [8, 13], [9, 13],
    ]},
    // Shaft wraps
    { name: 'shaft_wraps', role: 'belt', pixels: [
      [6, 7], [10, 7],
      [6, 11], [10, 11],
    ]},
    // Butt spike (y14-15) — wider
    { name: 'butt_spike', role: 'boot', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
      [7, 15], [8, 15],
    ]},
  ],
};

// =================================================================
// HELMET - Knight helmet, front-facing
// Minor improvements: slightly denser cheek guards
// =================================================================
export const HELMET_16: SpriteTemplate = {
  name: 'helmet_16',
  width: 16,
  height: 16,
  description: 'Front-facing knight helmet with T-shaped visor opening, round dome, cheek guards, and plume crest.',
  regions: [
    // Plume / crest (y0-2) — wider
    { name: 'plume', role: 'accessory', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
    ]},
    // Dome top (y3)
    { name: 'dome_top', role: 'body', pixels: [
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
    ]},
    // Dome sides (y4-5)
    { name: 'dome', role: 'body', pixels: [
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
    ]},
    // Brow ridge (y6)
    { name: 'brow_ridge', role: 'head', pixels: [
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
    ]},
    // T-visor opening (y7-9)
    { name: 'visor_opening', role: 'eye', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
    ]},
    // Helmet face plate (y7-9) — around visor
    { name: 'face_plate', role: 'body', pixels: [
      [3, 7], [4, 7], [5, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [5, 9], [6, 9], [9, 9], [10, 9], [11, 9], [12, 9],
    ]},
    // Cheek guards (y10-11) — filled
    { name: 'cheek_guards', role: 'body', pixels: [
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [5, 11], [6, 11], [9, 11], [10, 11],
    ]},
    // Chin guard (y11 center)
    { name: 'chin_guard', role: 'head', pixels: [
      [7, 11], [8, 11],
    ]},
    // Neck guard (y12)
    { name: 'neck_guard', role: 'leg', pixels: [
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ]},
  ],
};

// =================================================================
// CHESTPLATE - Armor chestplate, front-facing
// Minor improvements: wider pauldrons, filled gaps
// =================================================================
export const CHESTPLATE_16: SpriteTemplate = {
  name: 'chestplate_16',
  width: 16,
  height: 16,
  description: 'Front-facing armor chestplate with shoulder pauldrons and central emblem detail.',
  regions: [
    // Left pauldron (y1-3) — slightly wider
    { name: 'pauldron_left', role: 'body', pixels: [
      [1, 1], [2, 1], [3, 1], [4, 1],
      [1, 2], [2, 2], [3, 2], [4, 2],
      [2, 3], [3, 3], [4, 3],
    ]},
    // Right pauldron (y1-3)
    { name: 'pauldron_right', role: 'body', pixels: [
      [11, 1], [12, 1], [13, 1], [14, 1],
      [11, 2], [12, 2], [13, 2], [14, 2],
      [11, 3], [12, 3], [13, 3],
    ]},
    // Pauldron trim
    { name: 'pauldron_trim', role: 'head', pixels: [
      [1, 3], [14, 3],
    ]},
    // Collar / gorget (y1-2 center)
    { name: 'collar', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [9, 2], [10, 2],
    ]},
    // Chest plate upper (y3-5)
    { name: 'chest_upper', role: 'body', pixels: [
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
    ]},
    // Central emblem (y6-7)
    { name: 'emblem', role: 'accessory', pixels: [
      [7, 6], [8, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    // Chest plate mid (y6-8)
    { name: 'chest_mid', role: 'body', pixels: [
      [4, 6], [5, 6], [6, 6], [9, 6], [10, 6], [11, 6],
      [4, 7], [5, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
    ]},
    // Waist band (y9)
    { name: 'waist_band', role: 'belt', pixels: [
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
    ]},
    // Fauld / skirt (y10-11)
    { name: 'fauld', role: 'leg', pixels: [
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Fauld trim (y12)
    { name: 'fauld_trim', role: 'head', pixels: [
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ]},
    // Emblem gem
    { name: 'emblem_gem', role: 'eye', pixels: [
      [7, 7], [8, 7],
    ]},
  ],
};

// =================================================================
// BOOTS - Pair of armored boots side by side
// Minor improvements: thicker greaves
// =================================================================
export const BOOTS_16: SpriteTemplate = {
  name: 'boots_16',
  width: 16,
  height: 16,
  description: 'Pair of armored boots side by side with metal greaves and buckle details.',
  regions: [
    // Left boot greave (y3-6)
    { name: 'left_greave', role: 'body', pixels: [
      [2, 3], [3, 3], [4, 3], [5, 3],
      [2, 4], [3, 4], [4, 4], [5, 4],
      [2, 5], [3, 5], [4, 5], [5, 5],
      [2, 6], [3, 6], [4, 6], [5, 6],
    ]},
    // Right boot greave (y3-6)
    { name: 'right_greave', role: 'body', pixels: [
      [10, 3], [11, 3], [12, 3], [13, 3],
      [10, 4], [11, 4], [12, 4], [13, 4],
      [10, 5], [11, 5], [12, 5], [13, 5],
      [10, 6], [11, 6], [12, 6], [13, 6],
    ]},
    // Buckles
    { name: 'left_buckle', role: 'accessory', pixels: [
      [4, 4], [4, 5],
    ]},
    { name: 'right_buckle', role: 'accessory', pixels: [
      [11, 4], [11, 5],
    ]},
    // Greave trim (y7)
    { name: 'left_trim', role: 'head', pixels: [
      [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
    ]},
    { name: 'right_trim', role: 'head', pixels: [
      [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7],
    ]},
    // Ankle (y8)
    { name: 'left_ankle', role: 'belt', pixels: [
      [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8],
    ]},
    { name: 'right_ankle', role: 'belt', pixels: [
      [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
    ]},
    // Foot (y9-10)
    { name: 'left_foot', role: 'leg', pixels: [
      [1, 9], [2, 9], [3, 9], [4, 9], [5, 9],
      [1, 10], [2, 10], [3, 10], [4, 10], [5, 10],
    ]},
    { name: 'right_foot', role: 'leg', pixels: [
      [10, 9], [11, 9], [12, 9], [13, 9], [14, 9],
      [10, 10], [11, 10], [12, 10], [13, 10], [14, 10],
    ]},
    // Sole (y11)
    { name: 'left_sole', role: 'boot', pixels: [
      [1, 11], [2, 11], [3, 11], [4, 11], [5, 11],
    ]},
    { name: 'right_sole', role: 'boot', pixels: [
      [10, 11], [11, 11], [12, 11], [13, 11], [14, 11],
    ]},
    // Shine highlights
    { name: 'shine', role: 'eye', pixels: [
      [2, 3], [13, 3],
    ]},
  ],
};

// =================================================================
// RING - Magic ring with gem/stone on top
// Improved: thicker band
// =================================================================
export const RING_16: SpriteTemplate = {
  name: 'ring_16',
  width: 16,
  height: 16,
  description: 'Magic ring with circular gold band and a gem/stone set at the top. Small and centered.',
  regions: [
    // Gem (y4-5)
    { name: 'gem', role: 'accessory', pixels: [
      [7, 3], [8, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Gem highlight
    { name: 'gem_highlight', role: 'eye', pixels: [
      [7, 3],
      [6, 4],
    ]},
    // Setting / prongs (y6)
    { name: 'setting', role: 'head', pixels: [
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
    ]},
    // Band upper (y7-8) — thicker
    { name: 'band_upper', role: 'body', pixels: [
      [4, 7], [5, 7], [6, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [10, 8], [11, 8],
    ]},
    // Band sides (y9-10)
    { name: 'band_sides', role: 'body', pixels: [
      [4, 9], [5, 9], [10, 9], [11, 9],
      [4, 10], [5, 10], [10, 10], [11, 10],
    ]},
    // Band lower (y11-12) — thicker
    { name: 'band_lower', role: 'body', pixels: [
      [5, 11], [6, 11], [9, 11], [10, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
  ],
};

// =================================================================
// SCROLL - Rolled scroll, partially unrolled
// Improved: filled parchment interior
// =================================================================
export const SCROLL_16: SpriteTemplate = {
  name: 'scroll_16',
  width: 16,
  height: 16,
  description: 'Partially unrolled scroll with wooden rollers at top and bottom. Text lines visible on parchment.',
  regions: [
    // Top roller (y2)
    { name: 'roller_top', role: 'arm', pixels: [
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
    ]},
    // Top roller knobs
    { name: 'knob_top', role: 'head', pixels: [
      [3, 2], [12, 2],
    ]},
    // Parchment body (y3-10) — FILLED interior
    { name: 'parchment', role: 'body', pixels: [
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
    ]},
    // Text lines (y4-8) — visible writing
    { name: 'text_lines', role: 'accessory', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [7, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
    ]},
    // Bottom roller (y11)
    { name: 'roller_bottom', role: 'arm', pixels: [
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
    ]},
    // Bottom roller knobs
    { name: 'knob_bottom', role: 'head', pixels: [
      [3, 11], [12, 11],
    ]},
    // Parchment curl edges (y3, y10)
    { name: 'curl_edges', role: 'belt', pixels: [
      [3, 3], [12, 3],
      [3, 10], [12, 10],
    ]},
  ],
};


// =================================================================
// COLOR SCHEMES - DB16 palette, 3 tones per role (shadow/base/highlight)
// =================================================================

export const BOW_COLORS: ColorScheme = {
  name: 'bow_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const STAFF_COLORS: ColorScheme = {
  name: 'staff_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const AXE_COLORS: ColorScheme = {
  name: 'axe_default',
  mapping: {
    body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
    boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    face:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const DAGGER_COLORS: ColorScheme = {
  name: 'dagger_default',
  mapping: {
    body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    face:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    arm:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    hand:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    leg:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  },
};

export const SPEAR_COLORS: ColorScheme = {
  name: 'spear_default',
  mapping: {
    body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    face:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const HELMET_COLORS: ColorScheme = {
  name: 'helmet_default',
  mapping: {
    body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#30346d' },
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    face:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    hand:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    boot:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  },
};

export const CHESTPLATE_COLORS: ColorScheme = {
  name: 'chestplate_default',
  mapping: {
    body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    face:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    hand:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    boot:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  },
};

export const BOOTS_COLORS: ColorScheme = {
  name: 'boots_default',
  mapping: {
    body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    face:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    hand:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  },
};

export const RING_COLORS: ColorScheme = {
  name: 'ring_default',
  mapping: {
    body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    hand:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  },
};

export const SCROLL_COLORS: ColorScheme = {
  name: 'scroll_default',
  mapping: {
    body:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    accessory: { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
    belt:      { shadow: '#854c30', base: '#d2aa99', highlight: '#d2aa99' },
    eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
    face:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
    hand:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
    leg:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
    boot:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  },
};


// =================================================================
// Exports - aggregate records
// =================================================================

export const EQUIPMENT_TEMPLATES: Record<string, SpriteTemplate> = {
  bow_16: BOW_16,
  staff_16: STAFF_16,
  axe_16: AXE_16,
  dagger_16: DAGGER_16,
  spear_16: SPEAR_16,
  helmet_16: HELMET_16,
  chestplate_16: CHESTPLATE_16,
  boots_16: BOOTS_16,
  ring_16: RING_16,
  scroll_16: SCROLL_16,
};

export const EQUIPMENT_COLOR_SCHEMES: Record<string, ColorScheme> = {
  bow_default: BOW_COLORS,
  staff_default: STAFF_COLORS,
  axe_default: AXE_COLORS,
  dagger_default: DAGGER_COLORS,
  spear_default: SPEAR_COLORS,
  helmet_default: HELMET_COLORS,
  chestplate_default: CHESTPLATE_COLORS,
  boots_default: BOOTS_COLORS,
  ring_default: RING_COLORS,
  scroll_default: SCROLL_COLORS,
};
