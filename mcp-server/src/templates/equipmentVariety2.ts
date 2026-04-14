/**
 * 16x16 equipment variety batch 2 — 20 NEW armor/accessory/exotic weapon templates.
 * Target density: 28-50%. DB16 palette only. 1-2px margin on edges. Min 2px width for handles/shafts.
 *
 * Templates:
 *  1. chain_mail      - chain armor
 *  2. leather_armor   - leather chest piece
 *  3. wizard_hat      - pointed magic hat
 *  4. crown_gold      - royal crown
 *  5. viking_helmet   - horned helmet
 *  6. ninja_mask      - face covering
 *  7. cape            - flowing cape/cloak
 *  8. gauntlet        - armored glove
 *  9. ring_magic      - enchanted ring
 * 10. amulet          - necklace pendant
 * 11. belt_utility    - adventure belt with pouches
 * 12. boots_winged    - hermes boots
 * 13. scythe          - reaper weapon
 * 14. morning_star    - spiked mace
 * 15. halberd         - pole weapon
 * 16. sai             - three-pronged weapon
 * 17. nunchaku        - ninja weapon
 * 18. blowgun         - tube weapon
 * 19. hand_cannon     - primitive firearm
 * 20. hook_sword      - curved hook blade
 */

import { SpriteTemplate, ColorScheme } from './humanoid16.js';

// ── helpers ──────────────────────────────────────────────────

function hLine(y: number, x0: number, x1: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let x = x0; x <= x1; x++) out.push([x, y]);
  return out;
}

function vLine(x: number, y0: number, y1: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let y = y0; y <= y1; y++) out.push([x, y]);
  return out;
}

function rect(x0: number, y0: number, x1: number, y1: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) out.push([x, y]);
  }
  return out;
}

function border(x0: number, y0: number, x1: number, y1: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let x = x0; x <= x1; x++) { out.push([x, y0]); out.push([x, y1]); }
  for (let y = y0 + 1; y < y1; y++) { out.push([x0, y]); out.push([x1, y]); }
  return out;
}

// ── tone presets (DB16) ──────────────────────────────────────

const EQUIP2_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  face:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof EQUIP2_BASE>): ColorScheme {
  return { name, mapping: { ...EQUIP2_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. CHAIN_MAIL — Chain armor, front-facing torso shape
// ════════════════════════════════════════════════════════════
export const CHAIN_MAIL_16: SpriteTemplate = {
  name: 'chain_mail_16', width: 16, height: 16,
  description: 'Chain mail armor with interlocking ring pattern, shoulder guards, and collar.',
  regions: [
    // Collar / neckline (y2-3)
    { name: 'collar', role: 'head', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 5, 10),
    ]},
    // Shoulder guards (y4-5) — wide pauldrons
    { name: 'shoulders', role: 'accessory', pixels: [
      ...hLine(4, 3, 5), ...hLine(4, 10, 12),
      ...hLine(5, 2, 4), ...hLine(5, 11, 13),
    ]},
    // Chain body — main torso (y4-11)
    { name: 'chain_body', role: 'body', pixels: [
      ...hLine(4, 6, 9),
      ...hLine(5, 5, 10),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 5, 10),
      ...hLine(10, 5, 10),
      ...hLine(11, 5, 10),
    ]},
    // Chain link pattern — highlight dots across body
    { name: 'chain_links', role: 'eye', pixels: [
      [5, 6], [7, 6], [9, 6], [11, 6],
      [4, 8], [6, 8], [8, 8], [10, 8],
      [5, 10], [7, 10], [9, 10],
    ]},
    // Belt / waist binding (y12)
    { name: 'waist_belt', role: 'belt', pixels: [
      ...hLine(12, 5, 10),
    ]},
    // Lower skirt (y13)
    { name: 'mail_skirt', role: 'body', pixels: [
      ...hLine(13, 6, 9),
    ]},
  ],
};

export const CHAIN_MAIL_COLORS = scheme('chain_mail_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Iron chain
  head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },     // Collar steel
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Pauldron metal
  eye:       { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Ring highlights
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Leather belt
});

// ════════════════════════════════════════════════════════════
// 2. LEATHER_ARMOR — Leather chest piece with stitching
// ════════════════════════════════════════════════════════════
export const LEATHER_ARMOR_16: SpriteTemplate = {
  name: 'leather_armor_16', width: 16, height: 16,
  description: 'Leather chest armor with visible stitching, buckle, and reinforced shoulders.',
  regions: [
    // Collar (y2)
    { name: 'collar', role: 'head', pixels: [
      ...hLine(2, 6, 9),
    ]},
    // Shoulder straps (y3-4)
    { name: 'straps', role: 'accessory', pixels: [
      [4, 3], [5, 3], [10, 3], [11, 3],
      [3, 4], [4, 4], [11, 4], [12, 4],
    ]},
    // Chest body (y3-10)
    { name: 'chest', role: 'body', pixels: [
      ...hLine(3, 6, 9),
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 5, 10),
      ...hLine(10, 5, 10),
    ]},
    // Stitching lines — vertical center
    { name: 'stitching', role: 'arm', pixels: [
      [7, 4], [8, 4],
      [7, 6], [8, 6],
      [7, 8], [8, 8],
      [7, 10], [8, 10],
    ]},
    // Buckle — center chest
    { name: 'buckle', role: 'hand', pixels: [
      [7, 5], [8, 5],
    ]},
    // Waist (y11-12)
    { name: 'waist', role: 'belt', pixels: [
      ...hLine(11, 5, 10),
      ...hLine(12, 6, 9),
    ]},
  ],
};

export const LEATHER_ARMOR_COLORS = scheme('leather_armor_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Brown leather
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Collar lighter
  accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Shoulder straps
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark stitching
  hand:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Gold buckle
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark waist belt
});

// ════════════════════════════════════════════════════════════
// 3. WIZARD_HAT — Tall pointed magic hat with star
// ════════════════════════════════════════════════════════════
export const WIZARD_HAT_16: SpriteTemplate = {
  name: 'wizard_hat_16', width: 16, height: 16,
  description: 'Tall pointed wizard hat with star decoration and wide brim.',
  regions: [
    // Point / tip (y1-3) — tapers to 1px
    { name: 'tip', role: 'accessory', pixels: [
      [8, 1],
      [7, 2], [8, 2],
      [7, 3], [8, 3], [9, 3],
    ]},
    // Cone body (y4-8)
    { name: 'cone', role: 'body', pixels: [
      ...hLine(4, 6, 9),
      ...hLine(5, 5, 10),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 4, 11),
    ]},
    // Star decoration
    { name: 'star', role: 'eye', pixels: [
      [7, 5], [8, 5],
      [7, 6], [8, 6],
    ]},
    // Hat band (y9)
    { name: 'band', role: 'belt', pixels: [
      ...hLine(9, 4, 11),
    ]},
    // Brim (y10-11) — wide flat
    { name: 'brim', role: 'head', pixels: [
      ...hLine(10, 2, 13),
      ...hLine(11, 3, 12),
    ]},
  ],
};

export const WIZARD_HAT_COLORS = scheme('wizard_hat_default', {
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue fabric
  head:      { shadow: '#30346d', base: '#442434', highlight: '#597dce' },     // Dark brim
  accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Tip same fabric
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Gold star
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Band
});

// ════════════════════════════════════════════════════════════
// 4. CROWN_GOLD — Royal crown with gems
// ════════════════════════════════════════════════════════════
export const CROWN_GOLD_16: SpriteTemplate = {
  name: 'crown_gold_16', width: 16, height: 16,
  description: 'Golden royal crown with pointed peaks and jeweled insets.',
  regions: [
    // Crown peaks (y3-5) — 5 upward points
    { name: 'peaks', role: 'body', pixels: [
      [3, 3], [7, 3], [12, 3],                    // 3 tall peaks
      [3, 4], [5, 4], [7, 4], [10, 4], [12, 4],   // mid peaks
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
    ]},
    // Peak gems
    { name: 'peak_gems', role: 'eye', pixels: [
      [3, 4], [7, 4], [12, 4],
    ]},
    // Crown band (y6-8) — solid gold
    { name: 'band', role: 'accessory', pixels: [
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
    ]},
    // Band jewels — large center gem + side gems
    { name: 'jewels', role: 'leg', pixels: [
      [7, 7], [8, 7],         // center ruby
      [4, 7], [5, 7],         // left gem
      [10, 7], [11, 7],       // right gem
    ]},
    // Crown base rim (y9)
    { name: 'rim', role: 'head', pixels: [
      ...hLine(9, 3, 12),
    ]},
    // Velvet interior visible (y10-11)
    { name: 'interior', role: 'belt', pixels: [
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
    ]},
  ],
};

export const CROWN_GOLD_COLORS = scheme('crown_gold_default', {
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold peaks
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold band
  head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Gold rim bright
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },     // Peak gem sparkle
  leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Ruby gems
  belt:      { shadow: '#442434', base: '#d04648', highlight: '#854c30' },     // Velvet interior
});

// ════════════════════════════════════════════════════════════
// 5. VIKING_HELMET — Rounded helmet with horns
// ════════════════════════════════════════════════════════════
export const VIKING_HELMET_16: SpriteTemplate = {
  name: 'viking_helmet_16', width: 16, height: 16,
  description: 'Viking-style iron helmet with two curved horns and nose guard.',
  regions: [
    // Left horn (y2-5) — curves outward
    { name: 'horn_left', role: 'arm', pixels: [
      [2, 2], [3, 2],
      [2, 3], [3, 3],
      [3, 4], [4, 4],
      [4, 5],
    ]},
    // Right horn (y2-5) — mirror
    { name: 'horn_right', role: 'arm', pixels: [
      [12, 2], [13, 2],
      [12, 3], [13, 3],
      [11, 4], [12, 4],
      [11, 5],
    ]},
    // Dome (y4-8) — rounded helmet
    { name: 'dome', role: 'body', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
    ]},
    // Dome highlight
    { name: 'dome_shine', role: 'eye', pixels: [
      [6, 5], [7, 5],
      [6, 6],
    ]},
    // Brow band (y9) — decorative
    { name: 'brow_band', role: 'accessory', pixels: [
      ...hLine(9, 3, 12),
    ]},
    // Nose guard — vertical center
    { name: 'nose_guard', role: 'head', pixels: [
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
    ]},
    // Eye openings (y10)
    { name: 'eye_slots', role: 'boot', pixels: [
      [5, 10], [6, 10],
      [9, 10], [10, 10],
    ]},
    // Cheek guards (y10-11)
    { name: 'cheek_guards', role: 'body', pixels: [
      [3, 10], [4, 10], [11, 10], [12, 10],
      [4, 11], [5, 11], [10, 11], [11, 11],
    ]},
  ],
};

export const VIKING_HELMET_COLORS = scheme('viking_helmet_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Iron dome
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Nose guard iron
  arm:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Bone horns
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold brow band
  eye:       { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Dome shine
  boot:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },     // Eye slots dark
});

// ════════════════════════════════════════════════════════════
// 6. NINJA_MASK — Face covering with eye slit
// ════════════════════════════════════════════════════════════
export const NINJA_MASK_16: SpriteTemplate = {
  name: 'ninja_mask_16', width: 16, height: 16,
  description: 'Ninja face mask/hood with narrow eye slit and tied back cloth.',
  regions: [
    // Hood top (y3-4) — rounded
    { name: 'hood_top', role: 'body', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
    ]},
    // Hood sides (y5-7)
    { name: 'hood_sides', role: 'body', pixels: [
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
    ]},
    // Eye slit (y8) — narrow horizontal opening
    { name: 'eye_slit', role: 'boot', pixels: [
      ...hLine(8, 4, 11),
    ]},
    // Eyes visible through slit
    { name: 'eyes', role: 'eye', pixels: [
      [5, 8], [6, 8],
      [9, 8], [10, 8],
    ]},
    // Lower mask (y9-11) — covering mouth/chin
    { name: 'lower_mask', role: 'body', pixels: [
      ...hLine(9, 3, 12),
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
    ]},
    // Tied tails (y5-8) — cloth hanging behind
    { name: 'tails', role: 'head', pixels: [
      [13, 5], [14, 5],
      [13, 6], [14, 6],
      [14, 7],
      [14, 8],
    ]},
    // Chin point (y12)
    { name: 'chin', role: 'body', pixels: [
      [7, 12], [8, 12],
    ]},
  ],
};

export const NINJA_MASK_COLORS = scheme('ninja_mask_default', {
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark fabric
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Tail fabric
  boot:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },     // Eye slit shadow
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },     // Eyes bright
});

// ════════════════════════════════════════════════════════════
// 7. CAPE — Flowing cape / cloak, side view
// ════════════════════════════════════════════════════════════
export const CAPE_16: SpriteTemplate = {
  name: 'cape_16', width: 16, height: 16,
  description: 'Flowing hero cape with clasp, draped from shoulders with wavy bottom edge.',
  regions: [
    // Clasp — brooch at top center
    { name: 'clasp', role: 'accessory', pixels: [
      [7, 1], [8, 1],
      [7, 2], [8, 2],
    ]},
    // Upper cape — draped from shoulders (y3-6)
    { name: 'upper_cape', role: 'body', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 12),
    ]},
    // Cape body (y7-10) — flowing
    { name: 'cape_body', role: 'body', pixels: [
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
    ]},
    // Fold shadows — vertical drape lines
    { name: 'folds', role: 'head', pixels: [
      [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10],
      [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10],
    ]},
    // Cape bottom (y11-12) — wavy edge
    { name: 'cape_bottom', role: 'body', pixels: [
      [2, 11], [3, 11], [4, 11], [6, 11], [7, 11], [8, 11], [9, 11], [11, 11], [12, 11], [13, 11],
      [3, 12], [4, 12], [7, 12], [8, 12], [11, 12], [12, 12],
    ]},
    // Inner lining visible at edges
    { name: 'lining', role: 'leg', pixels: [
      [2, 8], [2, 9], [2, 10],
      [13, 8], [13, 9], [13, 10],
    ]},
  ],
};

export const CAPE_COLORS = scheme('cape_default', {
  body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Red cape
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Fold shadows
  leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold lining
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Gold clasp
});

// ════════════════════════════════════════════════════════════
// 8. GAUNTLET — Armored glove, palm facing viewer
// ════════════════════════════════════════════════════════════
export const GAUNTLET_16: SpriteTemplate = {
  name: 'gauntlet_16', width: 16, height: 16,
  description: 'Armored gauntlet with articulated finger plates and wrist guard.',
  regions: [
    // Finger tips (y2-3) — 4 pointed tips
    { name: 'fingers', role: 'body', pixels: [
      [4, 2], [6, 2], [8, 2], [10, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
    ]},
    // Finger plates (y4-5)
    { name: 'finger_plates', role: 'body', pixels: [
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 11),
    ]},
    // Knuckle ridge (y6) — raised decoration
    { name: 'knuckles', role: 'accessory', pixels: [
      ...hLine(6, 3, 12),
    ]},
    // Palm (y7-9)
    { name: 'palm', role: 'body', pixels: [
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 11),
    ]},
    // Palm highlight
    { name: 'palm_shine', role: 'eye', pixels: [
      [6, 7], [7, 7],
      [6, 8],
    ]},
    // Thumb (y6-9) — left side
    { name: 'thumb', role: 'body', pixels: [
      [2, 6], [2, 7],
      [2, 8], [3, 8],
      [3, 9],
    ]},
    // Wrist guard (y10-12) — flared cuff
    { name: 'wrist_guard', role: 'head', pixels: [
      ...hLine(10, 3, 12),
      ...hLine(11, 2, 13),
      ...hLine(12, 2, 13),
    ]},
    // Wrist strap
    { name: 'strap', role: 'belt', pixels: [
      ...hLine(13, 3, 12),
    ]},
  ],
};

export const GAUNTLET_COLORS = scheme('gauntlet_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Iron plates
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Wrist guard
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold knuckles
  eye:       { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Metal shine
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Leather strap
});

// ════════════════════════════════════════════════════════════
// 9. RING_MAGIC — Enchanted ring with glowing gem
// ════════════════════════════════════════════════════════════
export const RING_MAGIC_16: SpriteTemplate = {
  name: 'ring_magic_16', width: 16, height: 16,
  description: 'Enchanted golden ring with large glowing gemstone and magical aura.',
  regions: [
    // Magical aura — glow particles around gem (y1-6)
    { name: 'aura', role: 'leg', pixels: [
      [7, 1], [8, 1],
      [5, 2], [6, 2], [9, 2], [10, 2],
      [5, 3], [10, 3],
      [5, 5], [10, 5],
      [5, 6], [6, 6], [9, 6], [10, 6],
    ]},
    // Gem — large faceted stone on top (y2-5)
    { name: 'gem', role: 'eye', pixels: [
      [7, 2], [8, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [7, 5], [8, 5],
    ]},
    // Gem setting — prongs and base
    { name: 'setting', role: 'accessory', pixels: [
      [6, 2], [9, 2],
      [5, 4], [10, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Ring band upper (y6-7) — arc
    { name: 'band_upper', role: 'body', pixels: [
      [5, 6], [6, 6], [9, 6], [10, 6],
      [4, 7], [5, 7], [10, 7], [11, 7],
    ]},
    // Ring band sides (y8-10) — widest point, 3px thick
    { name: 'band_sides', role: 'body', pixels: [
      [3, 8], [4, 8], [5, 8], [10, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [5, 9], [10, 9], [11, 9], [12, 9],
      [3, 10], [4, 10], [5, 10], [10, 10], [11, 10], [12, 10],
    ]},
    // Ring band lower (y11-13) — arc closing
    { name: 'band_lower', role: 'body', pixels: [
      [4, 11], [5, 11], [10, 11], [11, 11],
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Inner highlight on band
    { name: 'band_shine', role: 'hand', pixels: [
      [5, 8], [5, 9], [5, 10],
      [10, 8], [10, 9],
    ]},
  ],
};

export const RING_MAGIC_COLORS = scheme('ring_magic_default', {
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold band
  hand:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Band highlight
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Blue gem glow
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold prongs
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Magic aura blue
});

// ════════════════════════════════════════════════════════════
// 10. AMULET — Necklace with pendant
// ════════════════════════════════════════════════════════════
export const AMULET_16: SpriteTemplate = {
  name: 'amulet_16', width: 16, height: 16,
  description: 'Ornate necklace amulet with chain and center gemstone pendant.',
  regions: [
    // Chain upper arc (y1-4)
    { name: 'chain_upper', role: 'body', pixels: [
      ...hLine(1, 6, 9),
      [4, 2], [5, 2], [10, 2], [11, 2],
      [3, 3], [4, 3], [11, 3], [12, 3],
      [3, 4], [12, 4],
    ]},
    // Chain sides (y5-6)
    { name: 'chain_sides', role: 'body', pixels: [
      [3, 5], [4, 5], [11, 5], [12, 5],
      [4, 6], [5, 6], [10, 6], [11, 6],
    ]},
    // Pendant frame (y7-12) — ornate setting
    { name: 'pendant_frame', role: 'accessory', pixels: [
      ...hLine(7, 5, 10),
      [4, 8], [5, 8], [10, 8], [11, 8],
      [4, 9], [5, 9], [10, 9], [11, 9],
      [4, 10], [5, 10], [10, 10], [11, 10],
      ...hLine(11, 5, 10),
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Pendant gem — center stone (larger)
    { name: 'gem', role: 'eye', pixels: [
      ...hLine(8, 6, 9),
      ...hLine(9, 6, 9),
      ...hLine(10, 6, 9),
    ]},
    // Pendant point (y13)
    { name: 'pendant_point', role: 'head', pixels: [
      [7, 13], [8, 13],
    ]},
    // Chain link detail
    { name: 'chain_links', role: 'hand', pixels: [
      [6, 1], [8, 1],
      [5, 2], [10, 2],
      [4, 3], [11, 3],
    ]},
  ],
};

export const AMULET_COLORS = scheme('amulet_default', {
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold chain
  hand:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Chain highlights
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold frame
  eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Emerald gem
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold point
});

// ════════════════════════════════════════════════════════════
// 11. BELT_UTILITY — Adventure belt with pouches
// ════════════════════════════════════════════════════════════
export const BELT_UTILITY_16: SpriteTemplate = {
  name: 'belt_utility_16', width: 16, height: 16,
  description: 'Adventure utility belt with multiple pouches, buckle, and tool loops.',
  regions: [
    // Main belt strap (y6-7)
    { name: 'belt_strap', role: 'body', pixels: [
      ...hLine(6, 1, 14),
      ...hLine(7, 1, 14),
    ]},
    // Belt buckle — center
    { name: 'buckle', role: 'accessory', pixels: [
      [7, 5], [8, 5],
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    // Left pouch (y8-11)
    { name: 'pouch_left', role: 'arm', pixels: [
      ...hLine(8, 2, 5),
      ...hLine(9, 2, 5),
      ...hLine(10, 2, 5),
      ...hLine(11, 2, 5),
    ]},
    // Left pouch flap
    { name: 'flap_left', role: 'head', pixels: [
      ...hLine(8, 2, 5),
    ]},
    // Right pouch (y8-11)
    { name: 'pouch_right', role: 'arm', pixels: [
      ...hLine(8, 10, 13),
      ...hLine(9, 10, 13),
      ...hLine(10, 10, 13),
      ...hLine(11, 10, 13),
    ]},
    // Right pouch flap
    { name: 'flap_right', role: 'head', pixels: [
      ...hLine(8, 10, 13),
    ]},
    // Tool loops — small items hanging
    { name: 'tool_loops', role: 'belt', pixels: [
      [6, 8], [6, 9],
      [9, 8], [9, 9],
    ]},
    // Pouch clasps
    { name: 'clasps', role: 'hand', pixels: [
      [3, 8], [4, 8],
      [11, 8], [12, 8],
    ]},
  ],
};

export const BELT_UTILITY_COLORS = scheme('belt_utility_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Brown leather belt
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Brown pouches
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark flaps
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Gold buckle
  hand:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Brass clasps
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark tool loops
});

// ════════════════════════════════════════════════════════════
// 12. BOOTS_WINGED — Hermes winged boots
// ════════════════════════════════════════════════════════════
export const BOOTS_WINGED_16: SpriteTemplate = {
  name: 'boots_winged_16', width: 16, height: 16,
  description: 'Hermes-style winged boots with small feathered wings at the ankles.',
  regions: [
    // Left wing (y3-6) — feathered, extends out
    { name: 'wing_left', role: 'eye', pixels: [
      [1, 3], [2, 3],
      [1, 4], [2, 4], [3, 4],
      [1, 5], [2, 5],
      [2, 6],
    ]},
    // Right wing (y3-6) — mirror
    { name: 'wing_right', role: 'eye', pixels: [
      [13, 3], [14, 3],
      [12, 4], [13, 4], [14, 4],
      [13, 5], [14, 5],
      [13, 6],
    ]},
    // Boot cuffs / ankle (y4-6) — two boots side by side
    { name: 'cuffs', role: 'head', pixels: [
      ...hLine(4, 3, 6), ...hLine(4, 9, 12),
      ...hLine(5, 3, 6), ...hLine(5, 9, 12),
      ...hLine(6, 3, 6), ...hLine(6, 9, 12),
    ]},
    // Boot body (y7-10) — two boots
    { name: 'boot_body', role: 'body', pixels: [
      ...hLine(7, 3, 6), ...hLine(7, 9, 12),
      ...hLine(8, 3, 6), ...hLine(8, 9, 12),
      ...hLine(9, 3, 6), ...hLine(9, 9, 12),
      ...hLine(10, 3, 6), ...hLine(10, 9, 12),
    ]},
    // Sole (y11-12)
    { name: 'sole', role: 'boot', pixels: [
      ...hLine(11, 2, 7), ...hLine(11, 8, 13),
      ...hLine(12, 2, 7), ...hLine(12, 8, 13),
    ]},
    // Toe detail
    { name: 'toes', role: 'accessory', pixels: [
      [2, 11], [3, 11],
      [8, 11], [9, 11],
    ]},
  ],
};

export const BOOTS_WINGED_COLORS = scheme('boots_winged_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Brown leather
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Lighter cuffs
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // White wings
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark sole
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold toe caps
});

// ════════════════════════════════════════════════════════════
// 13. SCYTHE — Reaper weapon, curved blade on long pole
// ════════════════════════════════════════════════════════════
export const SCYTHE_16: SpriteTemplate = {
  name: 'scythe_16', width: 16, height: 16,
  description: 'Grim reaper scythe with curved blade, long wooden shaft, and metal cap.',
  regions: [
    // Blade tip (y1-2) — sharp point extending left
    { name: 'blade_tip', role: 'body', pixels: [
      [1, 1], [2, 1], [3, 1],
      [1, 2], [2, 2], [3, 2], [4, 2],
    ]},
    // Blade curve (y3-7) — sweeping arc, 4-5px wide
    { name: 'blade_curve', role: 'body', pixels: [
      [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5],
      [5, 6], [6, 6], [7, 6], [8, 6],
      [7, 7], [8, 7],
    ]},
    // Blade inner surface — darker
    { name: 'blade_inner', role: 'head', pixels: [
      [3, 2], [4, 2], [5, 3], [6, 3], [6, 4], [7, 4], [7, 5], [8, 5], [8, 6],
    ]},
    // Blade edge highlight
    { name: 'blade_edge', role: 'eye', pixels: [
      [1, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
    ]},
    // Blade mount — where blade meets shaft (y7-8)
    { name: 'blade_mount', role: 'accessory', pixels: [
      [8, 5], [9, 5], [10, 5],
      [9, 6], [10, 6], [11, 6],
      [9, 7], [10, 7],
    ]},
    // Shaft — long vertical pole (y7-13), 2px wide
    { name: 'shaft', role: 'arm', pixels: [
      [9, 7], [10, 7],
      [9, 8], [10, 8],
      [9, 9], [10, 9],
      [9, 10], [10, 10],
      [9, 11], [10, 11],
      [9, 12], [10, 12],
      [9, 13], [10, 13],
    ]},
    // Shaft wrapping detail
    { name: 'shaft_wrap', role: 'belt', pixels: [
      [9, 8], [10, 9], [9, 10], [10, 11], [9, 12],
    ]},
    // Shaft butt cap (y14)
    { name: 'butt_cap', role: 'accessory', pixels: [
      [8, 14], [9, 14], [10, 14], [11, 14],
    ]},
  ],
};

export const SCYTHE_COLORS = scheme('scythe_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Silver blade
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Edge shine
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Mount iron
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood shaft
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal cap
});

// ════════════════════════════════════════════════════════════
// 14. MORNING_STAR — Spiked ball on chain with handle
// ════════════════════════════════════════════════════════════
export const MORNING_STAR_16: SpriteTemplate = {
  name: 'morning_star_16', width: 16, height: 16,
  description: 'Morning star weapon with spiked iron ball, chain, and wooden handle.',
  regions: [
    // Spikes — radiating from ball
    { name: 'spikes', role: 'head', pixels: [
      [7, 0], [8, 0],             // top spike
      [4, 2], [11, 2],            // upper side spikes
      [3, 4], [12, 4],            // mid side spikes
      [4, 6], [11, 6],            // lower side spikes
      [7, 7], [8, 7],             // bottom spike
    ]},
    // Spiked ball (y1-6) — iron sphere, larger
    { name: 'ball', role: 'body', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 4, 11),
      ...hLine(5, 5, 10),
      ...hLine(6, 6, 9),
    ]},
    // Ball highlight
    { name: 'ball_shine', role: 'eye', pixels: [
      [6, 2], [7, 2],
      [5, 3], [6, 3],
    ]},
    // Chain links (y8-10) — 3 visible links
    { name: 'chain', role: 'accessory', pixels: [
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
    ]},
    // Handle (y11-13) — wooden grip
    { name: 'handle', role: 'arm', pixels: [
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
    ]},
    // Handle pommel (y14)
    { name: 'pommel', role: 'belt', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

export const MORNING_STAR_COLORS = scheme('morning_star_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Iron ball
  head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Sharp spikes
  eye:       { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Metal shine
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Chain iron
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood handle
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal pommel
});

// ════════════════════════════════════════════════════════════
// 15. HALBERD — Pole weapon with axe blade and spear tip
// ════════════════════════════════════════════════════════════
export const HALBERD_16: SpriteTemplate = {
  name: 'halberd_16', width: 16, height: 16,
  description: 'Halberd pole weapon with axe head, spear tip, and back spike.',
  regions: [
    // Spear tip (y1-2)
    { name: 'spear_tip', role: 'body', pixels: [
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
    ]},
    // Axe blade — extends right (y3-7), thicker
    { name: 'axe_blade', role: 'body', pixels: [
      [8, 3], [9, 3], [10, 3], [11, 3],
      [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [9, 7], [10, 7], [11, 7],
    ]},
    // Blade edge highlight
    { name: 'blade_edge', role: 'eye', pixels: [
      [13, 5], [12, 4], [11, 3],
      [12, 6], [11, 7],
    ]},
    // Back spike — extends left (y4-6)
    { name: 'back_spike', role: 'head', pixels: [
      [6, 4], [5, 4], [4, 4],
      [5, 5], [4, 5], [3, 5],
      [5, 6], [4, 6],
    ]},
    // Shaft — long pole (y3-14), 2px wide
    { name: 'shaft', role: 'arm', pixels: [
      [7, 3], [7, 4], [7, 5], [7, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
    ]},
    // Shaft butt (y14)
    { name: 'shaft_butt', role: 'accessory', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

export const HALBERD_COLORS = scheme('halberd_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Steel blade
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Back spike darker
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Edge shine
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood shaft
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal butt
});

// ════════════════════════════════════════════════════════════
// 16. SAI — Three-pronged weapon, vertical
// ════════════════════════════════════════════════════════════
export const SAI_16: SpriteTemplate = {
  name: 'sai_16', width: 16, height: 16,
  description: 'Japanese sai weapon with center blade and two side prongs.',
  regions: [
    // Center blade tip (y1-3) — pointed, 3px wide body
    { name: 'center_blade', role: 'body', pixels: [
      [7, 1], [8, 1],
      [7, 2], [8, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
    ]},
    // Center blade body (y4-6), 3px wide
    { name: 'blade_body', role: 'body', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6],
    ]},
    // Blade edge highlight
    { name: 'blade_edge', role: 'eye', pixels: [
      [8, 1], [8, 2], [9, 3], [9, 4], [9, 5],
    ]},
    // Left prong (y5-8) — curves outward, thicker
    { name: 'prong_left', role: 'head', pixels: [
      [5, 5], [6, 5],
      [4, 6], [5, 6],
      [3, 7], [4, 7],
      [2, 8], [3, 8],
    ]},
    // Right prong (y5-8) — mirror
    { name: 'prong_right', role: 'head', pixels: [
      [9, 5], [10, 5],
      [10, 6], [11, 6],
      [11, 7], [12, 7],
      [12, 8], [13, 8],
    ]},
    // Guard / tsuba (y7-8) — wider
    { name: 'guard', role: 'accessory', pixels: [
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
    ]},
    // Handle (y9-13), 2px wide
    { name: 'handle', role: 'arm', pixels: [
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
    ]},
    // Handle wrap pattern
    { name: 'wrap', role: 'belt', pixels: [
      [7, 9], [8, 10], [7, 11], [8, 12], [7, 13],
    ]},
    // Handle pommel (y14)
    { name: 'pommel', role: 'accessory', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

export const SAI_COLORS = scheme('sai_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Steel blade
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Prongs
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Blade shine
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold guard
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Leather handle
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark wrap
});

// ════════════════════════════════════════════════════════════
// 17. NUNCHAKU — Ninja weapon, two sticks with chain
// ════════════════════════════════════════════════════════════
export const NUNCHAKU_16: SpriteTemplate = {
  name: 'nunchaku_16', width: 16, height: 16,
  description: 'Nunchaku with two wooden sticks connected by a short chain, angled pose.',
  regions: [
    // Left stick (y1-7) — thick angled stick
    { name: 'stick_left', role: 'body', pixels: [
      [1, 1], [2, 1], [3, 1], [4, 1],
      [1, 2], [2, 2], [3, 2], [4, 2],
      [2, 3], [3, 3], [4, 3], [5, 3],
      [3, 4], [4, 4], [5, 4], [6, 4],
      [3, 5], [4, 5], [5, 5], [6, 5],
      [4, 6], [5, 6], [6, 6], [7, 6],
      [5, 7], [6, 7], [7, 7],
    ]},
    // Left stick cap
    { name: 'cap_left', role: 'accessory', pixels: [
      [1, 1], [2, 1],
      [1, 2], [2, 2],
    ]},
    // Chain (y8-9) — links connecting both sticks
    { name: 'chain', role: 'head', pixels: [
      [7, 8], [8, 8],
      [8, 9], [9, 9],
    ]},
    // Right stick (y9-14) — thick angled opposite way
    { name: 'stick_right', role: 'body', pixels: [
      [8, 9], [9, 9], [10, 9], [11, 9],
      [9, 10], [10, 10], [11, 10], [12, 10],
      [10, 11], [11, 11], [12, 11],
      [10, 12], [11, 12], [12, 12], [13, 12],
      [11, 13], [12, 13], [13, 13], [14, 13],
      [12, 14], [13, 14], [14, 14],
    ]},
    // Right stick cap
    { name: 'cap_right', role: 'accessory', pixels: [
      [13, 14], [14, 14],
      [14, 13],
    ]},
    // Handle wrapping on left stick
    { name: 'wrap_left', role: 'belt', pixels: [
      [3, 2], [4, 3], [5, 4], [6, 5], [6, 6],
    ]},
    // Handle wrapping on right stick
    { name: 'wrap_right', role: 'belt', pixels: [
      [10, 10], [11, 11], [12, 12], [13, 13],
    ]},
    // Highlight streaks
    { name: 'shine', role: 'eye', pixels: [
      [2, 1], [3, 3], [5, 5],
      [9, 9], [11, 11], [12, 13],
    ]},
  ],
};

export const NUNCHAKU_COLORS = scheme('nunchaku_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Dark wood sticks
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Iron chain
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal caps
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark wrapping
  eye:       { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },     // Wood shine
});

// ════════════════════════════════════════════════════════════
// 18. BLOWGUN — Long tube weapon, horizontal orientation
// ════════════════════════════════════════════════════════════
export const BLOWGUN_16: SpriteTemplate = {
  name: 'blowgun_16', width: 16, height: 16,
  description: 'Blowgun tube weapon with mouthpiece, dart, and decorative wrapping.',
  regions: [
    // Dart tip — extending from end
    { name: 'dart_tip', role: 'head', pixels: [
      [1, 7], [1, 8],
    ]},
    // Dart fletching
    { name: 'dart_fletch', role: 'leg', pixels: [
      [2, 6], [2, 7], [2, 8], [2, 9],
      [3, 6], [3, 9],
    ]},
    // Tube body — long horizontal (y7-8, x3-12), 3 rows
    { name: 'tube', role: 'body', pixels: [
      ...hLine(6, 4, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 12),
    ]},
    // Tube bore highlight
    { name: 'bore', role: 'eye', pixels: [
      ...hLine(7, 3, 5),
    ]},
    // Decorative wrapping bands
    { name: 'wrap_bands', role: 'accessory', pixels: [
      [5, 5], [5, 10],
      [8, 5], [8, 10],
      [11, 5], [11, 10],
    ]},
    // Mouthpiece (x13-14) — wider flared end
    { name: 'mouthpiece', role: 'arm', pixels: [
      [13, 5], [14, 5],
      [13, 6], [14, 6],
      [13, 7], [14, 7],
      [13, 8], [14, 8],
      [13, 9], [14, 9],
      [13, 10], [14, 10],
    ]},
    // Carried darts — small pouch below
    { name: 'dart_pouch', role: 'belt', pixels: [
      ...hLine(12, 5, 10),
      ...hLine(13, 5, 10),
      ...hLine(14, 6, 9),
    ]},
  ],
};

export const BLOWGUN_COLORS = scheme('blowgun_default', {
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Bamboo green tube
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood mouthpiece
  head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Metal dart tip
  leg:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red fletching
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Bore highlight
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Wrapped bands
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Leather pouch
});

// ════════════════════════════════════════════════════════════
// 19. HAND_CANNON — Primitive firearm, short barrel
// ════════════════════════════════════════════════════════════
export const HAND_CANNON_16: SpriteTemplate = {
  name: 'hand_cannon_16', width: 16, height: 16,
  description: 'Primitive hand cannon with short iron barrel, fuse hole, and wooden stock.',
  regions: [
    // Muzzle flare / smoke (y3-4)
    { name: 'muzzle_flash', role: 'eye', pixels: [
      [2, 3], [3, 3],
      [1, 4], [2, 4], [3, 4],
    ]},
    // Barrel (y5-8, x2-9) — thick iron tube
    { name: 'barrel', role: 'body', pixels: [
      ...hLine(5, 2, 9),
      ...hLine(6, 2, 9),
      ...hLine(7, 2, 9),
      ...hLine(8, 3, 9),
    ]},
    // Barrel bore opening
    { name: 'bore', role: 'boot', pixels: [
      [2, 6], [2, 7],
      [3, 6], [3, 7],
    ]},
    // Barrel bands — reinforcement rings
    { name: 'barrel_bands', role: 'head', pixels: [
      [5, 5], [5, 8],
      [8, 5], [8, 8],
    ]},
    // Fuse hole on top
    { name: 'fuse_hole', role: 'leg', pixels: [
      [7, 4], [8, 4],
    ]},
    // Stock — wooden handle (y6-13)
    { name: 'stock', role: 'arm', pixels: [
      [10, 6], [11, 6],
      [10, 7], [11, 7], [12, 7],
      [11, 8], [12, 8], [13, 8],
      [12, 9], [13, 9],
      [12, 10], [13, 10],
      [12, 11], [13, 11],
      [12, 12], [13, 12],
    ]},
    // Stock butt
    { name: 'stock_butt', role: 'belt', pixels: [
      [11, 13], [12, 13], [13, 13], [14, 13],
    ]},
    // Trigger area
    { name: 'trigger', role: 'accessory', pixels: [
      [10, 8], [10, 9],
      [11, 9],
    ]},
  ],
};

export const HAND_CANNON_COLORS = scheme('hand_cannon_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Iron barrel
  head:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },     // Barrel bands
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark bore
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Muzzle flash
  leg:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Fuse glow
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood stock
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Stock butt dark
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal trigger
});

// ════════════════════════════════════════════════════════════
// 20. HOOK_SWORD — Curved hook blade with crescent guard
// ════════════════════════════════════════════════════════════
export const HOOK_SWORD_16: SpriteTemplate = {
  name: 'hook_sword_16', width: 16, height: 16,
  description: 'Chinese hook sword with hooked blade tip, crescent guard, and dagger pommel.',
  regions: [
    // Hook tip (y1-3) — curves back, 3px thick
    { name: 'hook_tip', role: 'body', pixels: [
      [4, 1], [5, 1], [6, 1],
      [3, 2], [4, 2], [5, 2],
      [4, 3], [5, 3], [6, 3],
    ]},
    // Hook edge highlight
    { name: 'hook_edge', role: 'eye', pixels: [
      [4, 1], [3, 2], [4, 3],
    ]},
    // Blade (y3-8) — straight section, 3px wide
    { name: 'blade', role: 'body', pixels: [
      [7, 3], [8, 3], [9, 3],
      [7, 4], [8, 4], [9, 4],
      [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7], [9, 7],
      [7, 8], [8, 8], [9, 8],
    ]},
    // Crescent guard (y9-10) — curved cross-guard
    { name: 'crescent_guard', role: 'accessory', pixels: [
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [3, 10], [4, 10], [5, 10], [10, 10], [11, 10], [12, 10],
    ]},
    // Guard tips — sharp ends
    { name: 'guard_tips', role: 'head', pixels: [
      [2, 10], [3, 10],
      [12, 10], [13, 10],
    ]},
    // Handle (y11-13), 2px wide
    { name: 'handle', role: 'arm', pixels: [
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
    ]},
    // Handle wrap
    { name: 'handle_wrap', role: 'belt', pixels: [
      [7, 11], [8, 12],
    ]},
    // Dagger pommel (y14) — wider
    { name: 'pommel_blade', role: 'leg', pixels: [
      [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14],
    ]},
  ],
};

export const HOOK_SWORD_COLORS = scheme('hook_sword_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Steel blade
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Edge shine
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Bronze guard
  head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Guard tips bright
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Leather handle
  leg:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Pommel blade steel
});

// ════════════════════════════════════════════════════════════
// EXPORT RECORDS
// ════════════════════════════════════════════════════════════

export const EQUIPMENT_BATCH2_TEMPLATES: Record<string, SpriteTemplate> = {
  chain_mail_16:     CHAIN_MAIL_16,
  leather_armor_16:  LEATHER_ARMOR_16,
  wizard_hat_16:     WIZARD_HAT_16,
  crown_gold_16:     CROWN_GOLD_16,
  viking_helmet_16:  VIKING_HELMET_16,
  ninja_mask_16:     NINJA_MASK_16,
  cape_16:           CAPE_16,
  gauntlet_16:       GAUNTLET_16,
  ring_magic_16:     RING_MAGIC_16,
  amulet_16:         AMULET_16,
  belt_utility_16:   BELT_UTILITY_16,
  boots_winged_16:   BOOTS_WINGED_16,
  scythe_16:         SCYTHE_16,
  morning_star_16:   MORNING_STAR_16,
  halberd_16:        HALBERD_16,
  sai_16:            SAI_16,
  nunchaku_16:       NUNCHAKU_16,
  blowgun_16:        BLOWGUN_16,
  hand_cannon_16:    HAND_CANNON_16,
  hook_sword_16:     HOOK_SWORD_16,
};

export const EQUIPMENT_BATCH2_COLOR_SCHEMES: Record<string, ColorScheme> = {
  chain_mail_default:     CHAIN_MAIL_COLORS,
  leather_armor_default:  LEATHER_ARMOR_COLORS,
  wizard_hat_default:     WIZARD_HAT_COLORS,
  crown_gold_default:     CROWN_GOLD_COLORS,
  viking_helmet_default:  VIKING_HELMET_COLORS,
  ninja_mask_default:     NINJA_MASK_COLORS,
  cape_default:           CAPE_COLORS,
  gauntlet_default:       GAUNTLET_COLORS,
  ring_magic_default:     RING_MAGIC_COLORS,
  amulet_default:         AMULET_COLORS,
  belt_utility_default:   BELT_UTILITY_COLORS,
  boots_winged_default:   BOOTS_WINGED_COLORS,
  scythe_default:         SCYTHE_COLORS,
  morning_star_default:   MORNING_STAR_COLORS,
  halberd_default:        HALBERD_COLORS,
  sai_default:            SAI_COLORS,
  nunchaku_default:       NUNCHAKU_COLORS,
  blowgun_default:        BLOWGUN_COLORS,
  hand_cannon_default:    HAND_CANNON_COLORS,
  hook_sword_default:     HOOK_SWORD_COLORS,
};
