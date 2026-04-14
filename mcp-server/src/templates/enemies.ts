/**
 * 16x16 enemy/monster templates for RPG games.
 * Each template defines pixel regions for a distinct enemy archetype.
 * Regions use semantic roles for color-mapping compatibility.
 *
 * DB16 palette reference:
 * #140c1c, #442434, #30346d, #4e4a4e, #854c30, #346524,
 * #d04648, #757161, #597dce, #d27d2c, #8595a1, #6daa2c,
 * #d2aa99, #6dc2ca, #dad45e, #deeed6
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// SPIDER - Giant spider, round body, 8 legs, red eyes, fangs
// ═══════════════════════════════════════════════════════════════
export const SPIDER_16: SpriteTemplate = {
  name: 'spider_16',
  width: 16,
  height: 16,
  description: 'Giant spider. Round body center, 8 thin legs extending outward, 2 red eyes, fangs.',
  regions: [
    // Eyes (row 4) - red, menacing
    { name: 'eyes', role: 'eye', pixels: [
      [6, 4], [9, 4],
    ]},
    // Fangs (rows 5-6) - below head
    { name: 'fangs', role: 'accessory', pixels: [
      [7, 10], [8, 10],
      [7, 11],  [8, 11],
    ]},
    // Head (rows 3-5)
    { name: 'head', role: 'head', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [7, 4], [8, 4], [10, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Abdomen / body (rows 6-9) - large round
    { name: 'abdomen', role: 'body', pixels: [
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ]},
    // Left legs (4 legs, rows spread vertically)
    { name: 'legs_left', role: 'leg', pixels: [
      // Front left leg
      [3, 5], [2, 4], [1, 3],
      // Second left leg
      [3, 6], [2, 6], [1, 7],
      // Third left leg
      [3, 8], [2, 9], [1, 10],
      // Back left leg
      [3, 9], [2, 10], [1, 11],
    ]},
    // Right legs (4 legs, rows spread vertically)
    { name: 'legs_right', role: 'leg', pixels: [
      // Front right leg
      [12, 5], [13, 4], [14, 3],
      // Second right leg
      [12, 6], [13, 6], [14, 7],
      // Third right leg
      [12, 8], [13, 9], [14, 10],
      // Back right leg
      [12, 9], [13, 10], [14, 11],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// WOLF - Aggressive wolf side-view, pointed snout, bushy tail
// ═══════════════════════════════════════════════════════════════
export const WOLF_16: SpriteTemplate = {
  name: 'wolf_16',
  width: 16,
  height: 16,
  description: 'Aggressive wolf side-view. Pointed snout left, ears, arched back, bushy tail, 4 legs.',
  regions: [
    // Ears (rows 2-3)
    { name: 'ears', role: 'hair', pixels: [
      [4, 2], [6, 2],
      [4, 3], [6, 3],
    ]},
    // Head (rows 4-6) - snout pointing left
    { name: 'head', role: 'head', pixels: [
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
      [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6],
    ]},
    // Eye
    { name: 'eye', role: 'eye', pixels: [
      [4, 5],
    ]},
    // Snout / mouth (jaw detail)
    { name: 'mouth', role: 'face', pixels: [
      [1, 7], [2, 7], [3, 7],
    ]},
    // Body (rows 7-10) - arched back
    { name: 'body', role: 'body', pixels: [
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Tail (rows 7-9) - bushy, curving right/up
    { name: 'tail', role: 'accessory', pixels: [
      [11, 7], [12, 7],
      [12, 8], [13, 8],
      [13, 7], [14, 6],
      [13, 9],
    ]},
    // Front legs (rows 11-14)
    { name: 'front_legs', role: 'leg', pixels: [
      [4, 11], [5, 11],
      [4, 12], [5, 12],
      [4, 13], [5, 13],
    ]},
    // Back legs (rows 11-14)
    { name: 'back_legs', role: 'leg', pixels: [
      [9, 11], [10, 11],
      [9, 12], [10, 12],
      [9, 13], [10, 13],
    ]},
    // Paws (row 14-15)
    { name: 'paws', role: 'boot', pixels: [
      [3, 14], [4, 14], [5, 14],
      [3, 15], [4, 15], [5, 15],
      [8, 14], [9, 14], [10, 14],
      [8, 15], [9, 15], [10, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// MIMIC - Treasure chest mimic with teeth, eye, and small legs
// ═══════════════════════════════════════════════════════════════
export const MIMIC_16: SpriteTemplate = {
  name: 'mimic_16',
  width: 16,
  height: 16,
  description: 'Treasure chest mimic. Chest body with sharp teeth along opening, one big eye, small legs.',
  regions: [
    // Lid (rows 1-4) - open at angle
    { name: 'lid', role: 'head', pixels: [
      [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1],
      [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],
      [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
    ]},
    // Eye (on lid)
    { name: 'eye', role: 'eye', pixels: [
      [7, 2], [8, 2],
      [7, 3], [8, 3],
    ]},
    // Lid clasp / trim
    { name: 'lid_trim', role: 'belt', pixels: [
      [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4],
    ]},
    // Teeth (row 5) - sharp jagged line
    { name: 'teeth', role: 'accessory', pixels: [
      [3, 5], [5, 5], [7, 5], [9, 5], [11, 5],
      [4, 6], [6, 6], [8, 6], [10, 6], [12, 6],
    ]},
    // Tongue
    { name: 'tongue', role: 'face', pixels: [
      [7, 6], [8, 6],
    ]},
    // Chest body (rows 7-12)
    { name: 'chest_body', role: 'body', pixels: [
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
      [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11],
    ]},
    // Chest lock / hardware
    { name: 'lock', role: 'accessory', pixels: [
      [7, 9], [8, 9],
    ]},
    // Small legs (rows 12-14) underneath
    { name: 'legs_left', role: 'leg', pixels: [
      [3, 12], [4, 12],
      [3, 13], [4, 13],
    ]},
    { name: 'legs_right', role: 'leg', pixels: [
      [11, 12], [12, 12],
      [11, 13], [12, 13],
    ]},
    // Feet (row 14-15)
    { name: 'feet', role: 'boot', pixels: [
      [2, 14], [3, 14], [4, 14], [5, 14],
      [10, 14], [11, 14], [12, 14], [13, 14],
      [2, 15], [3, 15], [4, 15], [5, 15],
      [10, 15], [11, 15], [12, 15], [13, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// GOLEM - Stone golem front-facing, blocky, glowing eyes, cracks
// ═══════════════════════════════════════════════════════════════
export const GOLEM_16: SpriteTemplate = {
  name: 'golem_16',
  width: 16,
  height: 16,
  description: 'Stone golem front-facing. Blocky humanoid, wide shoulders, glowing eyes, stone cracks, mossy patches.',
  regions: [
    // Head (rows 1-4) - blocky, wide
    { name: 'head', role: 'head', pixels: [
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
    ]},
    // Glowing eyes (row 3)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
    ]},
    // Cracks on head (surface detail)
    { name: 'head_cracks', role: 'face', pixels: [
      [6, 2], [9, 4],
    ]},
    // Mossy patches on head
    { name: 'head_moss', role: 'hair', pixels: [
      [5, 1], [6, 1], [9, 1], [10, 1],
    ]},
    // Shoulders + upper torso (rows 5-7) - very wide
    { name: 'torso_upper', role: 'body', pixels: [
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
    ]},
    // Stone cracks on body
    { name: 'body_cracks', role: 'face', pixels: [
      [5, 6], [8, 7], [10, 6],
    ]},
    // Moss on shoulders
    { name: 'shoulder_moss', role: 'hair', pixels: [
      [3, 5], [4, 5], [11, 5], [12, 5],
    ]},
    // Arms (rows 6-10) - thick stone arms
    { name: 'arm_left', role: 'arm', pixels: [
      [2, 6], [2, 7], [2, 8],
      [1, 7], [1, 8], [1, 9],
    ]},
    { name: 'arm_right', role: 'arm', pixels: [
      [13, 6], [13, 7], [13, 8],
      [14, 7], [14, 8], [14, 9],
    ]},
    // Hands (stone fists)
    { name: 'hands', role: 'hand', pixels: [
      [1, 10], [2, 10],
      [13, 10], [14, 10],
    ]},
    // Lower torso (rows 8-10)
    { name: 'torso_lower', role: 'body', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Belt / seam line
    { name: 'belt', role: 'belt', pixels: [
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Legs (rows 11-13) - thick and blocky
    { name: 'legs', role: 'leg', pixels: [
      [4, 11], [5, 11], [6, 11], [9, 11], [10, 11], [11, 11],
      [4, 12], [5, 12], [6, 12], [9, 12], [10, 12], [11, 12],
      [4, 13], [5, 13], [6, 13], [9, 13], [10, 13], [11, 13],
    ]},
    // Feet (rows 14-15) - big, heavy
    { name: 'feet', role: 'boot', pixels: [
      [3, 14], [4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14], [12, 14],
      [3, 15], [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15], [12, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// ZOMBIE - Undead humanoid, hunched, torn clothing, reaching arm
// ═══════════════════════════════════════════════════════════════
export const ZOMBIE_16: SpriteTemplate = {
  name: 'zombie_16',
  width: 16,
  height: 16,
  description: 'Undead zombie. Hunched humanoid, torn clothing, green skin, one arm reaching forward, messy hair.',
  regions: [
    // Messy hair (rows 1-2)
    { name: 'hair', role: 'hair', pixels: [
      [7, 0], [9, 0], [10, 0],
      [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
    ]},
    // Head (rows 2-4) - slightly tilted/hunched
    { name: 'head', role: 'head', pixels: [
      [7, 2], [8, 2], [9, 2], [10, 2],
      [7, 3], [8, 3], [9, 3], [10, 3],
      [7, 4], [8, 4], [9, 4], [10, 4],
    ]},
    // Eyes (row 3) - uneven, hollow
    { name: 'eyes', role: 'eye', pixels: [
      [8, 3], [10, 3],
    ]},
    // Face details (mouth)
    { name: 'face', role: 'face', pixels: [
      [8, 4], [9, 4],
    ]},
    // Neck (row 5) - hunched offset right
    { name: 'neck', role: 'face', pixels: [
      [8, 5], [9, 5],
    ]},
    // Torso (rows 6-9) - hunched, leaning right
    { name: 'torso', role: 'body', pixels: [
      [7, 6], [8, 6], [9, 6], [10, 6],
      [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Torn clothing patches
    { name: 'torn_cloth', role: 'accessory', pixels: [
      [10, 7], [6, 9], [9, 9],
    ]},
    // Left arm (reaching forward)
    { name: 'arm_reaching', role: 'arm', pixels: [
      [5, 6], [4, 6],
      [3, 7], [4, 7],
      [2, 8], [3, 8],
    ]},
    // Reaching hand
    { name: 'hand_reaching', role: 'hand', pixels: [
      [1, 8], [1, 9],
    ]},
    // Right arm (hanging)
    { name: 'arm_right', role: 'arm', pixels: [
      [11, 7],
      [11, 8],
      [11, 9],
    ]},
    // Right hand
    { name: 'hand_right', role: 'hand', pixels: [
      [11, 10],
    ]},
    // Belt remnants
    { name: 'belt', role: 'belt', pixels: [
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Legs (rows 11-13) - shambling stance
    { name: 'legs', role: 'leg', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
      [5, 12], [6, 12], [8, 12], [9, 12],
      [5, 13], [6, 13], [9, 13], [10, 13],
    ]},
    // Feet (rows 14-15)
    { name: 'feet', role: 'boot', pixels: [
      [4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14],
      [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// WITCH - Evil witch/hag, pointed hat, hunched, holding orb
// ═══════════════════════════════════════════════════════════════
export const WITCH_16: SpriteTemplate = {
  name: 'witch_16',
  width: 16,
  height: 16,
  description: 'Evil witch/hag. Pointed hat, hooked nose, hunched posture, holding glowing orb, dark robes.',
  regions: [
    // Hat point (rows 0-1)
    { name: 'hat_point', role: 'accessory', pixels: [
      [8, 0],
      [7, 1], [8, 1],
    ]},
    // Hat (rows 2-3) - wide brim
    { name: 'hat', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
    ]},
    // Face (rows 4-5) - hooked nose extends left
    { name: 'face', role: 'face', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Hooked nose
    { name: 'nose', role: 'face', pixels: [
      [5, 5],
    ]},
    // Eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7, 4], [9, 4],
    ]},
    // Neck (hunched)
    { name: 'neck', role: 'face', pixels: [
      [7, 6], [8, 6],
    ]},
    // Robe upper (rows 7-9) - hunched
    { name: 'robe_upper', role: 'body', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ]},
    // Left arm (holding orb outward)
    { name: 'arm_left', role: 'arm', pixels: [
      [4, 8],
      [3, 9],
      [2, 10],
    ]},
    // Glowing orb
    { name: 'orb', role: 'accessory', pixels: [
      [1, 9], [2, 9],
      [1, 10],
      [1, 11], [2, 11],
    ]},
    // Right arm
    { name: 'arm_right', role: 'arm', pixels: [
      [11, 8],
      [11, 9],
    ]},
    // Right hand
    { name: 'hand_right', role: 'hand', pixels: [
      [11, 10],
    ]},
    // Left hand (gripping orb)
    { name: 'hand_left', role: 'hand', pixels: [
      [2, 10],
    ]},
    // Robe lower (rows 10-13) - flared
    { name: 'robe_lower', role: 'leg', pixels: [
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
    ]},
    // Boots (barely visible under robes)
    { name: 'boots', role: 'boot', pixels: [
      [5, 14], [6, 14], [9, 14], [10, 14],
      [5, 15], [6, 15], [9, 15], [10, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// ORC - Green-skinned warrior, tusks, leather armor, crude weapon
// ═══════════════════════════════════════════════════════════════
export const ORC_16: SpriteTemplate = {
  name: 'orc_16',
  width: 16,
  height: 16,
  description: 'Orc warrior. Green skin, tusks, leather armor, wielding crude weapon, stocky build.',
  regions: [
    // Head (rows 1-4) - wide, brutish
    { name: 'head', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
    ]},
    // Eyes (row 3) - beady, fierce
    { name: 'eyes', role: 'eye', pixels: [
      [6, 3], [9, 3],
    ]},
    // Tusks (row 5) - protruding upward from jaw
    { name: 'tusks', role: 'face', pixels: [
      [5, 4], [10, 4],
      [6, 5], [9, 5],
    ]},
    // Face / jaw
    { name: 'face', role: 'face', pixels: [
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Neck
    { name: 'neck', role: 'face', pixels: [
      [7, 6], [8, 6],
    ]},
    // Leather armor torso (rows 7-10) - stocky, broad
    { name: 'armor', role: 'body', pixels: [
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Left arm
    { name: 'arm_left', role: 'arm', pixels: [
      [3, 7], [3, 8], [3, 9],
    ]},
    // Right arm (holding weapon up)
    { name: 'arm_right', role: 'arm', pixels: [
      [12, 7], [12, 8],
      [13, 7],
    ]},
    // Crude weapon (club/axe) - right hand
    { name: 'weapon', role: 'accessory', pixels: [
      [13, 3], [14, 3],
      [13, 4], [14, 4],
      [13, 5],
      [13, 6],
    ]},
    // Hands
    { name: 'hands', role: 'hand', pixels: [
      [3, 10],
      [13, 8],
    ]},
    // Belt
    { name: 'belt', role: 'belt', pixels: [
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Legs (rows 11-13) - thick, stocky
    { name: 'legs', role: 'leg', pixels: [
      [5, 11], [6, 11], [9, 11], [10, 11],
      [5, 12], [6, 12], [9, 12], [10, 12],
      [5, 13], [6, 13], [9, 13], [10, 13],
    ]},
    // Boots (rows 14-15) - heavy
    { name: 'boots', role: 'boot', pixels: [
      [4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14],
      [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// RAT - Giant rat, low profile, long tail, whiskers
// ═══════════════════════════════════════════════════════════════
export const RAT_16: SpriteTemplate = {
  name: 'rat_16',
  width: 16,
  height: 16,
  description: 'Giant rat. Low profile side-view, long tail curving behind, whiskers, red beady eyes, pointed snout.',
  regions: [
    // Ear (row 5)
    { name: 'ear', role: 'hair', pixels: [
      [4, 5], [5, 5],
    ]},
    // Head (rows 6-8) - pointed snout left
    { name: 'head', role: 'head', pixels: [
      [3, 6], [4, 6], [5, 6], [6, 6],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
      [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],
    ]},
    // Eye
    { name: 'eye', role: 'eye', pixels: [
      [4, 7],
    ]},
    // Whiskers
    { name: 'whiskers', role: 'face', pixels: [
      [0, 7], [1, 7],
      [0, 9], [1, 9],
    ]},
    // Snout
    { name: 'snout', role: 'face', pixels: [
      [1, 8],
    ]},
    // Body (rows 8-11) - round, low
    { name: 'body', role: 'body', pixels: [
      [6, 8], [7, 8], [8, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
    // Tail (curving right and up) - rows 9-6
    { name: 'tail', role: 'accessory', pixels: [
      [10, 11], [11, 11],
      [11, 10], [12, 10],
      [12, 9], [13, 9],
      [13, 8], [14, 8],
      [14, 7], [15, 7],
    ]},
    // Front legs (rows 12-13)
    { name: 'front_legs', role: 'leg', pixels: [
      [4, 12], [5, 12],
      [4, 13], [5, 13],
    ]},
    // Back legs (rows 12-13)
    { name: 'back_legs', role: 'leg', pixels: [
      [8, 12], [9, 12],
      [8, 13], [9, 13],
    ]},
    // Paws (rows 14-15)
    { name: 'paws', role: 'boot', pixels: [
      [3, 14], [4, 14], [5, 14],
      [3, 15], [4, 15], [5, 15],
      [7, 14], [8, 14], [9, 14],
      [7, 15], [8, 15], [9, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// SNAKE - Coiled serpent, S-curved, wide head with fangs, forked tongue
// ═══════════════════════════════════════════════════════════════
export const SNAKE_16: SpriteTemplate = {
  name: 'snake_16',
  width: 16,
  height: 16,
  description: 'Coiled serpent. Thick S-curved body, wide head with fangs, forked tongue, patterned scales.',
  regions: [
    // Head (rows 0-3) - wide, raised, facing left
    { name: 'head', role: 'head', pixels: [
      [4, 0], [5, 0], [6, 0], [7, 0],
      [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1],
      [3, 2], [4, 2], [6, 2], [7, 2], [8, 2],
      [4, 3], [5, 3], [6, 3], [7, 3],
    ]},
    // Eyes - slit pupils
    { name: 'eyes', role: 'eye', pixels: [
      [5, 2],
    ]},
    // Fangs - visible below jaw
    { name: 'fangs', role: 'face', pixels: [
      [3, 3], [3, 4], [4, 4],
    ]},
    // Forked tongue - extends left from mouth
    { name: 'tongue', role: 'accessory', pixels: [
      [0, 2], [1, 2], [2, 2],
      [0, 3], [2, 3],
    ]},
    // Neck (rows 4-5) - thick, curving right from head
    { name: 'neck', role: 'body', pixels: [
      [5, 4], [6, 4], [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Scale pattern (diamond markings along body)
    { name: 'scales', role: 'hair', pixels: [
      [6, 1], [7, 4], [11, 7], [7, 9], [5, 11], [9, 13],
    ]},
    // Body coil upper (rows 5-7) - thick 3px-wide S-curve going right
    { name: 'body_upper', role: 'body', pixels: [
      [10, 5], [11, 5],
      [9, 6], [10, 6], [11, 6], [12, 6],
      [10, 7], [11, 7], [12, 7], [13, 7],
    ]},
    // Belly / underside visible in coil gaps
    { name: 'belly', role: 'face', pixels: [
      [10, 8], [6, 10], [8, 11],
    ]},
    // Body coil middle (rows 7-10) - thick 3px-wide curve back left
    { name: 'body_middle', role: 'body', pixels: [
      [8, 7], [9, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8],
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9],
      [2, 10], [3, 10], [4, 10], [5, 10],
    ]},
    // Body coil lower (rows 10-14) - thick curve right again, tapering
    { name: 'body_lower', role: 'body', pixels: [
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11],
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
      [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
      [9, 14], [10, 14], [11, 14],
    ]},
    // Tail tip - tapered end
    { name: 'tail', role: 'leg', pixels: [
      [11, 15], [12, 15], [13, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// EYE MONSTER - Beholder-like floating eye, tentacles
// ═══════════════════════════════════════════════════════════════
export const EYE_MONSTER_16: SpriteTemplate = {
  name: 'eye_monster_16',
  width: 16,
  height: 16,
  description: 'Beholder-like floating eye. Large central eye, round body, small tentacles/eye-stalks around edges.',
  regions: [
    // Eye stalks (top) - small tentacles with mini eyes
    { name: 'stalks_top', role: 'accessory', pixels: [
      [4, 0], [7, 0], [11, 0],
      [4, 1], [7, 1], [11, 1],
      [5, 2], [8, 2], [10, 2],
    ]},
    // Stalk eye tips
    { name: 'stalk_eyes', role: 'eye', pixels: [
      [4, 0], [7, 0], [11, 0],
    ]},
    // Main body sphere (rows 3-11) - large round
    { name: 'body', role: 'body', pixels: [
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [3, 7], [4, 7], [5, 7], [6, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Central eye (rows 6-8) - large, prominent
    { name: 'central_eye', role: 'head', pixels: [
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    // Pupil
    { name: 'pupil', role: 'eye', pixels: [
      [7, 6], [8, 6],
      [7, 7], [8, 7],
    ]},
    // Mouth (rows 9-10) - jagged
    { name: 'mouth', role: 'face', pixels: [
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Bottom tentacles (rows 11-14)
    { name: 'tentacles', role: 'leg', pixels: [
      [4, 11], [5, 11], [7, 11], [8, 11], [10, 11], [11, 11],
      [3, 12], [5, 12], [7, 12], [10, 12], [12, 12],
      [3, 13], [5, 13], [7, 13], [10, 13], [12, 13],
      [2, 14], [5, 14], [7, 14], [10, 14], [13, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// WRAITH - Dark wraith/specter, hooded, tattered robes, floating
// ═══════════════════════════════════════════════════════════════
export const WRAITH_16: SpriteTemplate = {
  name: 'wraith_16',
  width: 16,
  height: 16,
  description: 'Dark wraith/specter. Hooded figure, tattered robes, glowing eyes in darkness, floating (no feet).',
  regions: [
    // Hood (rows 1-4) - deep cowl
    { name: 'hood', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
    ]},
    // Glowing eyes in shadow (row 3) - only visible feature
    { name: 'eyes', role: 'eye', pixels: [
      [7, 3], [9, 3],
    ]},
    // Shadow face interior
    { name: 'face_shadow', role: 'face', pixels: [
      [7, 4], [8, 4], [9, 4],
    ]},
    // Upper robes (rows 5-8)
    { name: 'robe_upper', role: 'body', pixels: [
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    ]},
    // Spectral arms (extending outward)
    { name: 'arm_left', role: 'arm', pixels: [
      [4, 6], [3, 7], [2, 8],
    ]},
    { name: 'arm_right', role: 'arm', pixels: [
      [11, 6], [12, 7], [13, 8],
    ]},
    // Ghostly hands
    { name: 'hands', role: 'hand', pixels: [
      [1, 8], [1, 9],
      [14, 8], [14, 9],
    ]},
    // Lower robes - tattered, flowing (rows 9-13)
    { name: 'robe_lower', role: 'leg', pixels: [
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [3, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [12, 11],
      [4, 12], [6, 12], [7, 12], [8, 12], [9, 12], [11, 12],
      [5, 13], [7, 13], [8, 13], [10, 13],
    ]},
    // Wispy trail at bottom (floating effect, no boots)
    { name: 'wisps', role: 'accessory', pixels: [
      [6, 14], [8, 14], [10, 14],
      [7, 15], [9, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// MUSHROOM ENEMY - Hostile mushroom creature, cap head, stubby legs
// ═══════════════════════════════════════════════════════════════
export const MUSHROOM_ENEMY_16: SpriteTemplate = {
  name: 'mushroom_enemy_16',
  width: 16,
  height: 16,
  description: 'Hostile mushroom creature. Mushroom cap as head, angry face, small body with stubby legs, spore particles.',
  regions: [
    // Spore particles (floating above and around)
    { name: 'spores', role: 'accessory', pixels: [
      [3, 0], [10, 0],
      [5, 1], [12, 1],
      [2, 3], [13, 3],
      [1, 6], [14, 5],
    ]},
    // Mushroom cap (rows 2-6) - wide dome
    { name: 'cap', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
    ]},
    // Cap spots (pattern on cap)
    { name: 'cap_spots', role: 'hair', pixels: [
      [6, 3], [9, 3],
      [5, 4], [8, 4], [11, 4],
      [4, 5], [7, 5], [10, 5],
    ]},
    // Face (rows 7-8) - under cap rim
    { name: 'face', role: 'face', pixels: [
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
    ]},
    // Angry eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6, 7], [9, 7],
    ]},
    // Angry mouth
    { name: 'mouth', role: 'face', pixels: [
      [7, 8], [8, 8],
    ]},
    // Stem / body (rows 9-12)
    { name: 'stem', role: 'body', pixels: [
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Small arms (stubby)
    { name: 'arms', role: 'arm', pixels: [
      [5, 10], [10, 10],
      [4, 11], [11, 11],
    ]},
    // Stubby legs (rows 13-14)
    { name: 'legs', role: 'leg', pixels: [
      [5, 13], [6, 13], [9, 13], [10, 13],
      [5, 14], [6, 14], [9, 14], [10, 14],
    ]},
    // Feet (row 15)
    { name: 'feet', role: 'boot', pixels: [
      [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// Color schemes - DB16 palette, 3-tone per region (shadow/base/highlight)
// ═══════════════════════════════════════════════════════════════

export const SPIDER_COLORS: ColorScheme = {
  name: 'spider_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark chitin
    eye:       { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' }, // red menacing
    body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark abdomen
    leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },   // spindly legs
    accessory: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#deeed6' },   // fangs
    face:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    hand:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  },
};

export const WOLF_COLORS: ColorScheme = {
  name: 'wolf_default',
  mapping: {
    hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // ear tips
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // grey fur
    eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // amber
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },   // muzzle
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // grey fur
    leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },   // darker legs
    boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },   // paws
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#deeed6' },   // tail
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  },
};

export const MIMIC_COLORS: ColorScheme = {
  name: 'mimic_default',
  mapping: {
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },   // chest lid (wood)
    eye:       { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' }, // bright surprise
    face:      { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },   // tongue
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // chest body (wood)
    belt:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },   // metal trim
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // small legs
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // feet
    accessory: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },   // teeth + lock
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const GOLEM_COLORS: ColorScheme = {
  name: 'golem_default',
  mapping: {
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // stone
    eye:       { shadow: '#dad45e', base: '#dad45e', highlight: '#deeed6' }, // glowing rune
    face:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },   // cracks (dark)
    hair:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // moss patches
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // stone body
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // stone arms
    hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // stone fists
    belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },   // seam line
    leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // stone legs
    boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },   // heavy feet
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  },
};

export const ZOMBIE_COLORS: ColorScheme = {
  name: 'zombie_default',
  mapping: {
    hair:      { shadow: '#346524', base: '#4e4a4e', highlight: '#757161' },   // messy dark hair
    head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green skin
    eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // sunken
    face:      { shadow: '#346524', base: '#6daa2c', highlight: '#d2aa99' },   // green face
    body:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },   // torn dark clothes
    arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green skin arms
    hand:      { shadow: '#346524', base: '#6daa2c', highlight: '#d2aa99' },   // hands
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // belt remnants
    leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },   // torn pants
    boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },   // ragged boots
    accessory: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },   // torn cloth
  },
};

export const WITCH_COLORS: ColorScheme = {
  name: 'witch_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark hat
    face:      { shadow: '#346524', base: '#6daa2c', highlight: '#d2aa99' },   // greenish skin
    eye:       { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' }, // glowing
    body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark robes
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // robe sleeves
    hand:      { shadow: '#346524', base: '#6daa2c', highlight: '#d2aa99' },   // green hands
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark robe lower
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // hidden boots
    accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // glowing orb + hat accent
    hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  },
};

export const ORC_COLORS: ColorScheme = {
  name: 'orc_default',
  mapping: {
    head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green skin
    eye:       { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' }, // red
    face:      { shadow: '#346524', base: '#6daa2c', highlight: '#deeed6' },   // tusks + face
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // leather armor
    arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green skin
    hand:      { shadow: '#346524', base: '#6daa2c', highlight: '#d2aa99' },   // green hands
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // leather belt
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // leather pants
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // heavy boots
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },   // crude metal weapon
    hair:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  },
};

export const RAT_COLORS: ColorScheme = {
  name: 'rat_default',
  mapping: {
    hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },   // ear
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // brown fur
    eye:       { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' }, // red beady
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },   // whiskers + snout
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // brown fur body
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // legs
    boot:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },   // pink paws
    accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },   // pink tail
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const SNAKE_COLORS: ColorScheme = {
  name: 'snake_default',
  mapping: {
    head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green scales
    eye:       { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' }, // slit
    face:      { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },   // white fangs
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green body
    hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },   // scale pattern
    leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // tail tip
    accessory: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },   // red tongue
    arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    hand:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    belt:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    boot:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  },
};

export const EYE_MONSTER_COLORS: ColorScheme = {
  name: 'eye_monster_default',
  mapping: {
    head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },   // iris around pupil
    eye:       { shadow: '#140c1c', base: '#30346d', highlight: '#deeed6' }, // big stalk eye
    face:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // mouth
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // fleshy body
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },   // tentacles
    accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // eye stalks
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const WRAITH_COLORS: ColorScheme = {
  name: 'wraith_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark hood
    eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, // ghostly blue
    face:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },   // void face
    body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark robes
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // spectral arms
    hand:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // ghostly hands
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // tattered robes
    accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // wisps
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  },
};

export const MUSHROOM_ENEMY_COLORS: ColorScheme = {
  name: 'mushroom_enemy_default',
  mapping: {
    head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },   // mushroom cap (warm red-orange)
    hair:      { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },   // cap spots (white)
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#d04648' }, // angry dots
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },   // face under cap
    body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },   // pale stem
    arm:       { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },   // stubby arms
    leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },   // stubby legs
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // feet
    accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },   // spore particles
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  },
};

// ═══════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════

export const ENEMY_TEMPLATES: Record<string, SpriteTemplate> = {
  spider_16: SPIDER_16,
  wolf_16: WOLF_16,
  mimic_16: MIMIC_16,
  golem_16: GOLEM_16,
  zombie_16: ZOMBIE_16,
  witch_16: WITCH_16,
  orc_16: ORC_16,
  rat_16: RAT_16,
  snake_16: SNAKE_16,
  eye_monster_16: EYE_MONSTER_16,
  wraith_16: WRAITH_16,
  mushroom_enemy_16: MUSHROOM_ENEMY_16,
};

export const ENEMY_COLOR_SCHEMES: Record<string, ColorScheme> = {
  spider_default: SPIDER_COLORS,
  wolf_default: WOLF_COLORS,
  mimic_default: MIMIC_COLORS,
  golem_default: GOLEM_COLORS,
  zombie_default: ZOMBIE_COLORS,
  witch_default: WITCH_COLORS,
  orc_default: ORC_COLORS,
  rat_default: RAT_COLORS,
  snake_default: SNAKE_COLORS,
  eye_monster_default: EYE_MONSTER_COLORS,
  wraith_default: WRAITH_COLORS,
  mushroom_enemy_default: MUSHROOM_ENEMY_COLORS,
};
