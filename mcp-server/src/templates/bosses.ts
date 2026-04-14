/**
 * 16x16 boss monster templates for RPG games.
 * Bosses fill most of the canvas to feel imposing even at small size.
 * Strong silhouettes, dramatic proportions, high pixel density.
 *
 * DB16 palette reference:
 * #140c1c #442434 #30346d #4e4a4e #854c30 #346524 #d04648 #757161
 * #597dce #d27d2c #8595a1 #6daa2c #d2aa99 #6dc2ca #dad45e #deeed6
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// BOSS_DEMON_16 - Demon lord with curved horns, spread wings,
// muscular torso, glowing eyes, clawed hands. ~120 pixels.
// ═══════════════════════════════════════════════════════════════
export const BOSS_DEMON_16: SpriteTemplate = {
  name: 'boss_demon_16',
  width: 16,
  height: 16,
  description: 'Demon lord. Large curved horns, muscular red torso, spread wings, glowing yellow eyes, clawed hands.',
  regions: [
    // Horns - big curved horns rising from head (rows 0-3)
    { name: 'horns', role: 'accessory', pixels: [
      [3, 0], [12, 0],
      [3, 1], [4, 1], [11, 1], [12, 1],
      [4, 2], [5, 2], [10, 2], [11, 2],
      [5, 3], [10, 3],
    ]},
    // Head (rows 2-5) - large demonic skull
    { name: 'head', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Glowing eyes (row 4)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 4], [9, 4],
    ]},
    // Face / jaw detail
    { name: 'jaw', role: 'face', pixels: [
      [7, 5], [8, 5],
    ]},
    // Wings spread wide behind (rows 4-10)
    { name: 'wings', role: 'accessory', pixels: [
      [0, 4], [1, 4], [14, 4], [15, 4],
      [0, 5], [1, 5], [2, 5], [13, 5], [14, 5], [15, 5],
      [0, 6], [1, 6], [2, 6], [13, 6], [14, 6], [15, 6],
      [0, 7], [1, 7], [2, 7], [13, 7], [14, 7], [15, 7],
      [1, 8], [2, 8], [13, 8], [14, 8],
      [1, 9], [2, 9], [13, 9], [14, 9],
      [2, 10], [13, 10],
    ]},
    // Neck (row 6)
    { name: 'neck', role: 'body', pixels: [
      [7, 6], [8, 6],
    ]},
    // Muscular torso (rows 7-10) - wide, imposing
    { name: 'torso', role: 'body', pixels: [
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Arms (rows 7-10) - muscular
    { name: 'arms', role: 'arm', pixels: [
      [3, 7], [12, 7],
      [3, 8], [12, 8],
      [3, 9], [12, 9],
      [3, 10], [12, 10],
    ]},
    // Clawed hands (row 11)
    { name: 'claws', role: 'hand', pixels: [
      [2, 11], [3, 11], [12, 11], [13, 11],
    ]},
    // Belt / waist (row 11)
    { name: 'belt', role: 'belt', pixels: [
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Legs (rows 12-13) - powerful
    { name: 'legs', role: 'leg', pixels: [
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
      [5, 13], [6, 13], [9, 13], [10, 13],
    ]},
    // Hooves / boots (rows 14-15)
    { name: 'hooves', role: 'boot', pixels: [
      [4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14],
      [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BOSS_DRAGON_16 - Elder dragon front-facing head shot.
// Massive head filling upper half, open jaw, one visible eye,
// neck scales, wings at sides. ~130 pixels.
// ═══════════════════════════════════════════════════════════════
export const BOSS_DRAGON_16: SpriteTemplate = {
  name: 'boss_dragon_16',
  width: 16,
  height: 16,
  description: 'Elder dragon head. Massive jaw, horns, one glowing eye, neck scales, wing hints at sides.',
  regions: [
    // Horns (rows 0-2) - curved back
    { name: 'horns', role: 'accessory', pixels: [
      [2, 0], [3, 0], [12, 0], [13, 0],
      [3, 1], [4, 1], [11, 1], [12, 1],
      [4, 2], [11, 2],
    ]},
    // Head / skull (rows 2-6) - massive, fills width
    { name: 'skull', role: 'head', pixels: [
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
    ]},
    // Eye - single large glowing eye (rows 4-5)
    { name: 'eye', role: 'eye', pixels: [
      [6, 4], [7, 4],
      [6, 5], [7, 5],
    ]},
    // Nostril / snout ridge
    { name: 'snout', role: 'face', pixels: [
      [10, 5], [11, 5],
      [9, 6], [10, 6],
    ]},
    // Open jaw - upper teeth (row 7)
    { name: 'upper_jaw', role: 'head', pixels: [
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
    ]},
    // Teeth (rows 7-8)
    { name: 'teeth', role: 'accessory', pixels: [
      [4, 8], [6, 8], [8, 8], [10, 8], [12, 8],
      [3, 9], [5, 9], [7, 9], [9, 9], [11, 9],
    ]},
    // Lower jaw (rows 9-10)
    { name: 'lower_jaw', role: 'head', pixels: [
      [2, 9], [4, 9], [6, 9], [8, 9], [10, 9], [12, 9], [13, 9],
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
    ]},
    // Neck scales (rows 11-13)
    { name: 'neck', role: 'body', pixels: [
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
    // Wing hints at sides (rows 3-8)
    { name: 'wings', role: 'arm', pixels: [
      [0, 3], [1, 3], [14, 3], [15, 3],
      [0, 4], [1, 4], [2, 4], [13, 4], [14, 4], [15, 4],
      [0, 5], [1, 5], [2, 5], [13, 5], [14, 5], [15, 5],
      [0, 6], [1, 6], [13, 6], [14, 6],
      [0, 7], [1, 7], [14, 7], [15, 7],
      [1, 8], [14, 8],
    ]},
    // Chest scales visible below neck (rows 14-15)
    { name: 'chest_scales', role: 'body', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
      [6, 15], [7, 15], [8, 15], [9, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BOSS_LICH_16 - Undead lich king. Skull face with crown,
// flowing dark robes, glowing cyan eye sockets, staff/orb. ~110 pixels.
// ═══════════════════════════════════════════════════════════════
export const BOSS_LICH_16: SpriteTemplate = {
  name: 'boss_lich_16',
  width: 16,
  height: 16,
  description: 'Lich king. Skull face, crown, flowing dark robes, glowing eye sockets, skeletal hands with staff.',
  regions: [
    // Crown (rows 0-1)
    { name: 'crown', role: 'accessory', pixels: [
      [5, 0], [7, 0], [9, 0], [11, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1],
    ]},
    // Skull (rows 2-5) - gaunt, hollow
    { name: 'skull', role: 'head', pixels: [
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
    ]},
    // Glowing eye sockets (row 3)
    { name: 'eyes', role: 'eye', pixels: [
      [7, 3], [10, 3],
    ]},
    // Jaw / teeth
    { name: 'jaw', role: 'face', pixels: [
      [7, 5], [8, 5], [9, 5],
    ]},
    // Staff on left side (rows 1-14) - tall vertical
    { name: 'staff', role: 'accessory', pixels: [
      [2, 1], [3, 1],
      [2, 2], [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [3, 8],
      [3, 9],
      [3, 10],
      [3, 11],
      [3, 12],
      [3, 13],
      [3, 14],
    ]},
    // Orb at top of staff (rows 0-2)
    { name: 'orb', role: 'accessory', pixels: [
      [2, 0], [3, 0],
    ]},
    // Collar / neck (row 6)
    { name: 'collar', role: 'body', pixels: [
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
    ]},
    // Robes upper (rows 7-9) - wide, flowing
    { name: 'robe_upper', role: 'body', pixels: [
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
    ]},
    // Skeletal hands (row 8-9) - one gripping staff
    { name: 'hands', role: 'hand', pixels: [
      [4, 8], [13, 8],
      [4, 9], [13, 9],
    ]},
    // Belt / sash
    { name: 'sash', role: 'belt', pixels: [
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
    ]},
    // Robes lower - flared wide (rows 11-14)
    { name: 'robe_lower', role: 'leg', pixels: [
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12],
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13],
      [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
    ]},
    // Robe hem (row 15)
    { name: 'hem', role: 'boot', pixels: [
      [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BOSS_TITAN_16 - Giant stone colossus. Massive blocky humanoid
// filling the entire frame, glowing rune on chest, cracks. ~140 pixels.
// ═══════════════════════════════════════════════════════════════
export const BOSS_TITAN_16: SpriteTemplate = {
  name: 'boss_titan_16',
  width: 16,
  height: 16,
  description: 'Stone titan/colossus. Massive blocky frame filling canvas, glowing chest rune, cracks, small glowing eyes.',
  regions: [
    // Head (rows 0-3) - blocky, squat, wide
    { name: 'head', role: 'head', pixels: [
      [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0],
      [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1],
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
    ]},
    // Small glowing eyes (row 2)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 2], [9, 2],
    ]},
    // Face cracks
    { name: 'face_cracks', role: 'face', pixels: [
      [7, 1], [8, 3],
    ]},
    // Shoulders (row 4) - massive, wider than head
    { name: 'shoulders', role: 'body', pixels: [
      [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4],
    ]},
    // Upper torso (rows 5-7) - enormous
    { name: 'torso_upper', role: 'body', pixels: [
      [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5],
      [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6],
      [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7],
    ]},
    // Chest rune - glowing symbol (rows 6-7 center)
    { name: 'rune', role: 'accessory', pixels: [
      [7, 6], [8, 6],
      [7, 7], [8, 7],
    ]},
    // Arms (rows 5-9) - thick, 2px wide each side
    { name: 'arms', role: 'arm', pixels: [
      [0, 5], [15, 5],
      [0, 6], [15, 6],
      [0, 7], [15, 7],
      [0, 8], [15, 8],
      [0, 9], [15, 9],
    ]},
    // Fists (rows 10-11)
    { name: 'fists', role: 'hand', pixels: [
      [0, 10], [1, 10], [14, 10], [15, 10],
      [0, 11], [1, 11], [14, 11], [15, 11],
    ]},
    // Lower torso (rows 8-9) - still very wide
    { name: 'torso_lower', role: 'body', pixels: [
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
    ]},
    // Belt / waist seam (row 10)
    { name: 'waist', role: 'belt', pixels: [
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
    ]},
    // Legs (rows 11-13) - thick pillars
    { name: 'legs', role: 'leg', pixels: [
      [3, 11], [4, 11], [5, 11], [6, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [9, 12], [10, 12], [11, 12], [12, 12],
      [3, 13], [4, 13], [5, 13], [6, 13], [9, 13], [10, 13], [11, 13], [12, 13],
    ]},
    // Feet (rows 14-15) - heavy stone blocks
    { name: 'feet', role: 'boot', pixels: [
      [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
      [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BOSS_HYDRA_16 - Multi-headed hydra. 3 snake heads at top,
// thick necks converging to a body, scales, fanged mouths. ~115 pixels.
// ═══════════════════════════════════════════════════════════════
export const BOSS_HYDRA_16: SpriteTemplate = {
  name: 'boss_hydra_16',
  width: 16,
  height: 16,
  description: 'Multi-headed hydra. 3 snake heads (left/center/right), converging necks, scaly body, fanged mouths.',
  regions: [
    // Left head (rows 0-3)
    { name: 'head_left', role: 'head', pixels: [
      [1, 0], [2, 0],
      [0, 1], [1, 1], [2, 1], [3, 1],
      [0, 2], [1, 2], [2, 2], [3, 2],
      [1, 3], [2, 3],
    ]},
    // Center head (rows 0-3) - slightly higher/bigger
    { name: 'head_center', role: 'head', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [7, 3], [8, 3],
    ]},
    // Right head (rows 0-3)
    { name: 'head_right', role: 'head', pixels: [
      [13, 0], [14, 0],
      [12, 1], [13, 1], [14, 1], [15, 1],
      [12, 2], [13, 2], [14, 2], [15, 2],
      [13, 3], [14, 3],
    ]},
    // Eyes - one per head (row 1)
    { name: 'eyes', role: 'eye', pixels: [
      [1, 1], [7, 1], [14, 1],
    ]},
    // Mouths / fangs (row 2-3) - open jaws
    { name: 'fangs', role: 'face', pixels: [
      [0, 3], [3, 3],   // left head fangs
      [6, 3], [9, 3],   // center head fangs
      [12, 3], [15, 3], // right head fangs
    ]},
    // Left neck (rows 4-7)
    { name: 'neck_left', role: 'arm', pixels: [
      [2, 4], [3, 4],
      [3, 5], [4, 5],
      [4, 6], [5, 6],
      [5, 7], [6, 7],
    ]},
    // Center neck (rows 4-7)
    { name: 'neck_center', role: 'body', pixels: [
      [7, 4], [8, 4],
      [7, 5], [8, 5],
      [7, 6], [8, 6],
      [7, 7], [8, 7],
    ]},
    // Right neck (rows 4-7)
    { name: 'neck_right', role: 'arm', pixels: [
      [12, 4], [13, 4],
      [11, 5], [12, 5],
      [10, 6], [11, 6],
      [9, 7], [10, 7],
    ]},
    // Body - where necks converge (rows 8-12) - thick, scaly
    { name: 'body', role: 'body', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12],
    ]},
    // Scale ridge detail (belly)
    { name: 'belly_scales', role: 'belt', pixels: [
      [7, 10], [8, 10],
      [7, 11], [8, 11],
    ]},
    // Legs / clawed feet (rows 13-15) - stubby but wide
    { name: 'legs', role: 'leg', pixels: [
      [4, 13], [5, 13], [6, 13], [9, 13], [10, 13], [11, 13],
      [4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14],
    ]},
    // Clawed feet
    { name: 'feet', role: 'boot', pixels: [
      [3, 15], [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15], [12, 15],
    ]},
    // Tail hint (rows 12-14, right side)
    { name: 'tail', role: 'accessory', pixels: [
      [12, 11], [13, 11],
      [13, 12], [14, 12],
      [14, 13], [15, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BOSS_NECROMANCER_16 - Dark necromancer. Tall hooded figure,
// skull staff, flowing robes, purple/dark aura particles. ~105 pixels.
// ═══════════════════════════════════════════════════════════════
export const BOSS_NECROMANCER_16: SpriteTemplate = {
  name: 'boss_necromancer_16',
  width: 16,
  height: 16,
  description: 'Dark necromancer. Tall hooded figure, skull staff, flowing dark robes, magic aura particles, glowing eyes.',
  regions: [
    // Staff skull topper (rows 0-2) - left side
    { name: 'staff_skull', role: 'accessory', pixels: [
      [1, 0], [2, 0],
      [1, 1], [2, 1],
      [2, 2],
    ]},
    // Staff shaft (rows 3-15) - tall
    { name: 'staff_shaft', role: 'accessory', pixels: [
      [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10],
      [2, 11], [2, 12], [2, 13], [2, 14], [2, 15],
    ]},
    // Hood peak (rows 0-1)
    { name: 'hood_peak', role: 'head', pixels: [
      [8, 0], [9, 0],
      [7, 1], [8, 1], [9, 1], [10, 1],
    ]},
    // Hood (rows 2-4) - deep, shadowed
    { name: 'hood', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
      [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
    ]},
    // Glowing eyes under hood (row 3)
    { name: 'eyes', role: 'eye', pixels: [
      [8, 3], [10, 3],
    ]},
    // Shadow face (row 4)
    { name: 'face_shadow', role: 'face', pixels: [
      [8, 4], [9, 4],
    ]},
    // Neck / collar (row 5)
    { name: 'collar', role: 'body', pixels: [
      [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
    ]},
    // Robe upper (rows 6-8) - broad shoulders
    { name: 'robe_upper', role: 'body', pixels: [
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
    ]},
    // Arms (row 7-9) - extended, one toward staff
    { name: 'arms', role: 'arm', pixels: [
      [3, 7], [4, 7], [13, 7],
      [3, 8], [13, 8],
      [3, 9], [13, 9],
    ]},
    // Skeletal hands
    { name: 'hands', role: 'hand', pixels: [
      [3, 10], [13, 10],
    ]},
    // Belt (row 9)
    { name: 'sash', role: 'belt', pixels: [
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
    ]},
    // Robe lower - wide, flowing (rows 10-14)
    { name: 'robe_lower', role: 'leg', pixels: [
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12],
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13],
      [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
    ]},
    // Robe hem (row 15)
    { name: 'hem', role: 'boot', pixels: [
      [3, 15], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15],
    ]},
    // Magic aura particles - scattered around figure
    { name: 'aura', role: 'accessory', pixels: [
      [0, 2], [14, 1],
      [0, 6], [15, 5],
      [1, 10], [14, 9],
      [0, 13], [15, 12],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BOSS_KRAKEN_16 - Sea monster. Large central eye, multiple
// tentacles spreading outward, suction cup details. ~120 pixels.
// ═══════════════════════════════════════════════════════════════
export const BOSS_KRAKEN_16: SpriteTemplate = {
  name: 'boss_kraken_16',
  width: 16,
  height: 16,
  description: 'Sea kraken. Large central eye, bulbous head, multiple tentacles spreading outward with suction cups.',
  regions: [
    // Head / mantle (rows 0-6) - bulbous, large
    { name: 'mantle', role: 'head', pixels: [
      [6, 0], [7, 0], [8, 0], [9, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
    ]},
    // Large central eye (rows 3-5) - glowing, imposing
    { name: 'eye_outer', role: 'face', pixels: [
      [7, 3], [8, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [7, 5], [8, 5],
    ]},
    // Eye pupil
    { name: 'eye_pupil', role: 'eye', pixels: [
      [7, 4], [8, 4],
    ]},
    // Beak / mouth (row 7)
    { name: 'beak', role: 'face', pixels: [
      [7, 7], [8, 7],
    ]},
    // Tentacle base (row 7-8) - where they emerge
    { name: 'tentacle_base', role: 'body', pixels: [
      [3, 7], [4, 7], [5, 7], [6, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
    ]},
    // Left tentacles (rows 8-15) - spreading left
    { name: 'tentacles_left', role: 'arm', pixels: [
      [2, 8], [2, 9],
      [1, 9], [1, 10],
      [0, 10], [0, 11],
      [0, 12], [1, 12],
      [3, 9], [3, 10],
      [2, 10], [2, 11],
      [1, 13], [0, 14],
      [2, 12], [1, 14],
      [0, 15], [1, 15],
    ]},
    // Right tentacles (rows 8-15) - spreading right
    { name: 'tentacles_right', role: 'arm', pixels: [
      [13, 8], [13, 9],
      [14, 9], [14, 10],
      [15, 10], [15, 11],
      [15, 12], [14, 12],
      [12, 9], [12, 10],
      [13, 10], [13, 11],
      [14, 13], [15, 14],
      [13, 12], [14, 14],
      [15, 15], [14, 15],
    ]},
    // Center tentacles (rows 9-15) - hanging down
    { name: 'tentacles_center', role: 'leg', pixels: [
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [9, 10], [10, 10],
      [4, 11], [5, 11], [6, 11], [9, 11], [10, 11], [11, 11],
      [4, 12], [5, 12], [10, 12], [11, 12],
      [4, 13], [5, 13], [10, 13], [11, 13],
      [3, 14], [4, 14], [11, 14], [12, 14],
      [3, 15], [4, 15], [11, 15], [12, 15],
    ]},
    // Suction cups (dots on tentacles)
    { name: 'suction_cups', role: 'accessory', pixels: [
      [7, 10], [8, 10],
      [7, 12], [8, 12],
      [6, 12], [9, 12],
      [6, 14], [9, 14],
      [7, 14], [8, 14],
    ]},
    // Tentacle tips (curling)
    { name: 'tentacle_tips', role: 'boot', pixels: [
      [5, 15], [6, 15], [9, 15], [10, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BOSS_DEATH_16 - Grim Reaper / Death. Hooded skeleton,
// large scythe blade curving across top, tattered robes. ~110 pixels.
// ═══════════════════════════════════════════════════════════════
export const BOSS_DEATH_16: SpriteTemplate = {
  name: 'boss_death_16',
  width: 16,
  height: 16,
  description: 'Grim Reaper. Hooded skeleton, large scythe curving across top, flowing tattered black robes, glowing eye.',
  regions: [
    // Scythe blade (rows 0-3) - large, curved across top-right
    { name: 'scythe_blade', role: 'accessory', pixels: [
      [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0],
      [7, 1], [8, 1], [13, 1], [14, 1],
      [6, 2], [7, 2], [14, 2],
      [6, 3], [15, 2],
    ]},
    // Scythe handle (rows 3-14) - diagonal then vertical
    { name: 'scythe_handle', role: 'accessory', pixels: [
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [5, 8],
      [5, 9],
      [5, 10],
      [5, 11],
      [5, 12],
      [5, 13],
      [5, 14],
      [5, 15],
    ]},
    // Hood (rows 1-4) - deep, ominous
    { name: 'hood', role: 'head', pixels: [
      [9, 1], [10, 1],
      [8, 2], [9, 2], [10, 2], [11, 2],
      [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
    ]},
    // Glowing eye (row 4) - single visible eye
    { name: 'eye', role: 'eye', pixels: [
      [9, 4], [10, 4],
    ]},
    // Skull jaw (row 5)
    { name: 'jaw', role: 'face', pixels: [
      [8, 5], [9, 5], [10, 5], [11, 5],
    ]},
    // Neck (row 6)
    { name: 'neck', role: 'body', pixels: [
      [9, 6], [10, 6],
    ]},
    // Robe upper (rows 7-9) - draped, flowing
    { name: 'robe_upper', role: 'body', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
    ]},
    // Skeletal hand gripping scythe (rows 7-8)
    { name: 'hand_left', role: 'hand', pixels: [
      [4, 7], [5, 7],
      [4, 8],
    ]},
    // Right hand (row 9)
    { name: 'hand_right', role: 'hand', pixels: [
      [13, 8], [14, 8],
    ]},
    // Belt / sash
    { name: 'sash', role: 'belt', pixels: [
      [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
    ]},
    // Robe lower - wide, tattered (rows 11-14)
    { name: 'robe_lower', role: 'leg', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11],
      [4, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12],
      [3, 13], [4, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13],
      [3, 14], [4, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14],
    ]},
    // Tattered hem (row 15) - ragged edges
    { name: 'tattered_hem', role: 'boot', pixels: [
      [3, 15], [4, 15], [7, 15], [8, 15], [9, 15], [10, 15], [12, 15], [13, 15], [14, 15],
    ]},
    // Robe tatters / wisps floating off
    { name: 'tatters', role: 'arm', pixels: [
      [2, 13], [15, 12],
      [2, 14], [15, 13],
      [1, 15], [2, 15], [15, 14], [15, 15],
    ]},
  ],
};


// ═══════════════════════════════════════════════════════════════
// Color Schemes - dramatic, dark palettes with accent colors
// DB16 palette: #140c1c, #442434, #30346d, #4e4a4e, #854c30,
// #346524, #d04648, #757161, #597dce, #d27d2c, #8595a1, #6daa2c,
// #d2aa99, #6dc2ca, #dad45e, #deeed6
// ═══════════════════════════════════════════════════════════════

export const BOSS_DEMON_COLORS: ColorScheme = {
  name: 'boss_demon_default',
  mapping: {
    head:      { shadow: '#442434', base: '#d04648', highlight: '#d2aa99' },   // dark red skull
    face:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },   // red jaw
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // glowing yellow
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },   // muscular red torso
    arm:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },   // red arms
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // dark claws
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark waistband
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d04648' },   // dark red legs
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark hooves
    accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark wings/horns
    hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // unused fallback
  },
};

export const BOSS_DRAGON_COLORS: ColorScheme = {
  name: 'boss_dragon_default',
  mapping: {
    head:      { shadow: '#346524', base: '#4e4a4e', highlight: '#757161' },   // dark green/gray scales
    face:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // snout ridges
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // golden
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green neck/chest scales
    arm:       { shadow: '#140c1c', base: '#346524', highlight: '#4e4a4e' },   // dark wing membrane
    hand:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // unused
    belt:      { shadow: '#140c1c', base: '#346524', highlight: '#4e4a4e' },   // unused
    leg:       { shadow: '#140c1c', base: '#346524', highlight: '#4e4a4e' },   // unused
    boot:      { shadow: '#140c1c', base: '#346524', highlight: '#4e4a4e' },   // unused
    accessory: { shadow: '#854c30', base: '#deeed6', highlight: '#deeed6' },   // teeth (bone white) + horns
    hair:      { shadow: '#140c1c', base: '#346524', highlight: '#4e4a4e' },   // unused fallback
  },
};

export const BOSS_LICH_COLORS: ColorScheme = {
  name: 'boss_lich_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark skull
    face:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },   // bone jaw
    eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, // cyan glow
    body:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },   // dark purple/blue robes
    arm:       { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },   // robe sleeves
    hand:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },   // skeletal bone
    belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // enchanted sash
    leg:       { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },   // dark robe lower
    boot:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },   // robe hem
    accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },   // crown/staff/orb glow
    hair:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },   // unused fallback
  },
};

export const BOSS_TITAN_COLORS: ColorScheme = {
  name: 'boss_titan_default',
  mapping: {
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // stone gray
    face:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // crack glow (orange)
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // orange glow
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // stone body
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // stone arms
    hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // stone fists
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // waist seam
    leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // stone legs
    boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },   // darker feet
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // glowing rune (orange/yellow)
    hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // unused fallback
  },
};

export const BOSS_HYDRA_COLORS: ColorScheme = {
  name: 'boss_hydra_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },   // dark green heads
    face:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },   // red mouths/fangs
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // yellow reptile
    body:      { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },   // dark green body
    arm:       { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },   // neck stalks
    hand:      { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },   // unused
    belt:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // belly scales (lighter)
    leg:       { shadow: '#140c1c', base: '#346524', highlight: '#4e4a4e' },   // legs
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // clawed feet
    accessory: { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },   // tail
    hair:      { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },   // unused fallback
  },
};

export const BOSS_NECROMANCER_COLORS: ColorScheme = {
  name: 'boss_necromancer_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },   // dark hood
    face:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // shadowed face
    eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // green glow
    body:      { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },   // dark robes
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },   // robe sleeves
    hand:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },   // skeletal hands
    belt:      { shadow: '#30346d', base: '#442434', highlight: '#597dce' },   // enchanted belt
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },   // dark robe lower
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },   // robe hem
    accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green magic glow + staff skull
    hair:      { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },   // unused fallback
  },
};

export const BOSS_KRAKEN_COLORS: ColorScheme = {
  name: 'boss_kraken_default',
  mapping: {
    head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // deep blue/teal mantle
    face:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },   // eye socket area
    eye:       { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' }, // red
    body:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },   // tentacle base
    arm:       { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },   // side tentacles
    hand:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },   // unused
    belt:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },   // unused
    leg:       { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },   // center tentacles
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },   // tentacle tips
    accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },   // suction cups (pale)
    hair:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // unused fallback
  },
};

export const BOSS_DEATH_COLORS: ColorScheme = {
  name: 'boss_death_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // deep black hood
    face:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },   // skull jaw (bone)
    eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, // cyan glow
    body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // black robes
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // tattered wisps
    hand:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },   // skeletal hands (bone)
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },   // sash
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark robe lower
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // ragged hem
    accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },   // scythe blade glow (cyan)
    hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // unused fallback
  },
};


// ═══════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════

export const BOSS_TEMPLATES: Record<string, SpriteTemplate> = {
  boss_demon_16: BOSS_DEMON_16,
  boss_dragon_16: BOSS_DRAGON_16,
  boss_lich_16: BOSS_LICH_16,
  boss_titan_16: BOSS_TITAN_16,
  boss_hydra_16: BOSS_HYDRA_16,
  boss_necromancer_16: BOSS_NECROMANCER_16,
  boss_kraken_16: BOSS_KRAKEN_16,
  boss_death_16: BOSS_DEATH_16,
};

export const BOSS_COLOR_SCHEMES: Record<string, ColorScheme> = {
  boss_demon_default: BOSS_DEMON_COLORS,
  boss_dragon_default: BOSS_DRAGON_COLORS,
  boss_lich_default: BOSS_LICH_COLORS,
  boss_titan_default: BOSS_TITAN_COLORS,
  boss_hydra_default: BOSS_HYDRA_COLORS,
  boss_necromancer_default: BOSS_NECROMANCER_COLORS,
  boss_kraken_default: BOSS_KRAKEN_COLORS,
  boss_death_default: BOSS_DEATH_COLORS,
};
