/**
 * Game-inspired character templates.
 * Each template captures the visual DNA of iconic game art styles:
 *
 * - Final Fantasy (SNES): Warm/muted, chibi (50% head), thick outlines
 * - Castlevania: Dark/cool, more realistic proportions, gothic mood
 * - Dragon Quest: Bright/saturated, extreme chibi, Toriyama-inspired
 *
 * These use the same SpriteRegion/SpriteTemplate/ColorScheme interfaces
 * as the generic humanoid templates.
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// FINAL FANTASY - BLACK MAGE 16x16
// THE most iconic pixel art character ever.
// Yellow pointed hat, blue robe, pitch-black face with glowing eyes.
// Extreme chibi: hat+face = 50% of sprite height.
// ═══════════════════════════════════════════════════════════════
export const FF_BLACKMAGE_16: SpriteTemplate = {
  name: 'ff_blackmage_16',
  width: 16,
  height: 16,
  description: 'Final Fantasy Black Mage. Tall pointed hat, featureless dark face with glowing eyes, blue robes.',
  regions: [
    // Hat tip (row 0)
    { name: 'hat_tip', role: 'accessory', pixels: [
      [8, 0],
    ]},
    // Hat upper (rows 1-2)
    { name: 'hat_upper', role: 'head', pixels: [
      [7, 1], [8, 1], [9, 1],
      [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
    ]},
    // Hat lower (rows 3-4) - widening
    { name: 'hat_lower', role: 'head', pixels: [
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
    ]},
    // Hat brim (row 4) - widest part
    { name: 'hat_brim', role: 'head', pixels: [
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
    ]},
    // Face - pitch black void (rows 5-6), excluding eye positions
    { name: 'face_void', role: 'face', pixels: [
      [5, 5], [7, 5], [8, 5], [10, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
    ]},
    // Eyes - glowing dots in the darkness
    { name: 'eyes', role: 'eye', pixels: [
      [6, 5], [9, 5],
    ]},
    // Robe collar (row 7)
    { name: 'robe_collar', role: 'body', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    // Robe upper (rows 8-9)
    { name: 'robe_upper', role: 'body', pixels: [
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ]},
    // Arms (hidden in robe sleeves, 1px)
    { name: 'arms', role: 'arm', pixels: [
      [4, 9], [11, 9],
      [4, 10], [11, 10],
    ]},
    // Hands (peek from sleeves)
    { name: 'hands', role: 'hand', pixels: [
      [3, 10], [12, 10],
    ]},
    // Robe sash (row 10)
    { name: 'sash', role: 'belt', pixels: [
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Robe lower - flares out like mage (rows 11-13)
    { name: 'robe_lower', role: 'leg', pixels: [
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
    ]},
    // Boot tips
    { name: 'boots', role: 'boot', pixels: [
      [5, 14], [6, 14], [9, 14], [10, 14],
      [5, 15], [6, 15], [9, 15], [10, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// FINAL FANTASY - WARRIOR/FIGHTER 16x16
// Red armor, horned helmet, broad build.
// Warm muted palette. Chibi proportions.
// ═══════════════════════════════════════════════════════════════
export const FF_WARRIOR_16: SpriteTemplate = {
  name: 'ff_warrior_16',
  width: 16,
  height: 16,
  description: 'Final Fantasy Warrior/Fighter. Horned helmet, red armor, broad heroic build.',
  regions: [
    // Helmet horns (row 0) - signature silhouette
    { name: 'horns', role: 'accessory', pixels: [
      [5, 0], [10, 0],
    ]},
    // Helmet (rows 1-3)
    { name: 'helmet', role: 'head', pixels: [
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
    ]},
    // Face (rows 4-5)
    { name: 'face', role: 'face', pixels: [
      [5, 4], [7, 4], [8, 4], [10, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6, 4], [9, 4],
    ]},
    // Neck
    { name: 'neck', role: 'face', pixels: [
      [7, 6], [8, 6],
    ]},
    // Shoulder armor (row 7) - extra wide
    { name: 'pauldrons', role: 'body', pixels: [
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
    ]},
    // Chest armor (rows 8-9)
    { name: 'armor', role: 'body', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ]},
    // Arms (1px each)
    { name: 'arms', role: 'arm', pixels: [
      [3, 8], [12, 8],
      [3, 9], [12, 9],
    ]},
    // Gauntlets
    { name: 'gauntlets', role: 'hand', pixels: [
      [3, 10], [12, 10],
    ]},
    // Shield (left hand - asymmetric)
    { name: 'shield', role: 'accessory', pixels: [
      [1, 8], [2, 8],
      [1, 9], [2, 9],
      [1, 10], [2, 10],
    ]},
    // Belt
    { name: 'belt', role: 'belt', pixels: [
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      [5, 11], [6, 11], [9, 11], [10, 11],
      [5, 12], [6, 12], [9, 12], [10, 12],
      [5, 13], [6, 13], [9, 13], [10, 13],
    ]},
    // Boots
    { name: 'boots', role: 'boot', pixels: [
      [4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14],
      [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// FINAL FANTASY - WHITE MAGE 16x16
// White hooded robe, red triangle trim, staff.
// Warm whites with red accents.
// ═══════════════════════════════════════════════════════════════
export const FF_WHITEMAGE_16: SpriteTemplate = {
  name: 'ff_whitemage_16',
  width: 16,
  height: 16,
  description: 'Final Fantasy White Mage. White hooded robe, red triangle trim, healing staff.',
  regions: [
    // Hood (rows 0-3) - rounded top
    { name: 'hood', role: 'head', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
    ]},
    // Face (rows 4-5)
    { name: 'face', role: 'face', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Eyes (separated for clear two-eye read)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 4], [9, 4],
    ]},
    // Neck
    { name: 'neck', role: 'face', pixels: [
      [7, 6], [8, 6],
    ]},
    // Robe upper (rows 7-9) - white
    { name: 'robe_upper', role: 'body', pixels: [
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ]},
    // Arms
    { name: 'arms', role: 'arm', pixels: [
      [4, 8], [11, 8],
      [4, 9], [11, 9],
    ]},
    // Hands
    { name: 'hands', role: 'hand', pixels: [
      [4, 10], [11, 10],
    ]},
    // Staff (right side)
    { name: 'staff', role: 'accessory', pixels: [
      [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11],
      [11, 5], [13, 5], // staff head cross
    ]},
    // Red trim / sash (row 10) - signature FF white mage detail
    { name: 'trim', role: 'belt', pixels: [
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Robe lower - flared, with red triangle pattern on hem
    { name: 'robe_lower', role: 'leg', pixels: [
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
    ]},
    // Boots
    { name: 'boots', role: 'boot', pixels: [
      [5, 14], [6, 14], [9, 14], [10, 14],
      [5, 15], [6, 15], [9, 15], [10, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// CASTLEVANIA - BELMONT 16x16
// Gothic hero. Dark leather, broader build, heavy dark outlines.
// Cool muted palette. Prominent whip coiling to one side.
// ═══════════════════════════════════════════════════════════════
export const CV_BELMONT_16: SpriteTemplate = {
  name: 'cv_belmont_16',
  width: 16,
  height: 16,
  description: 'Castlevania Belmont. Gothic vampire hunter, leather armor, prominent whip. Dark cool palette.',
  regions: [
    // Hair (rows 0-1) - flowing, slightly wider
    { name: 'hair', role: 'hair', pixels: [
      [6, 0], [7, 0], [8, 0], [9, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
    ]},
    // Head (rows 2-3)
    { name: 'head', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
    ]},
    // Face (row 4)
    { name: 'face', role: 'face', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    // Eyes (separated for clear two-eye read)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 3], [9, 3],
    ]},
    // Neck
    { name: 'neck', role: 'face', pixels: [
      [7, 5], [8, 5],
    ]},
    // Shoulders (row 6) - wider, 7px pauldrons
    { name: 'shoulders', role: 'body', pixels: [
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
    ]},
    // Leather armor torso (rows 7-9) - broader build
    { name: 'armor', role: 'body', pixels: [
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ]},
    // Arms - thicker
    { name: 'arms', role: 'arm', pixels: [
      [3, 7], [3, 8],
      [12, 7], [12, 8],
    ]},
    // Hands
    { name: 'hands', role: 'hand', pixels: [
      [3, 9], [12, 9],
    ]},
    // Whip extending right (iconic weapon) - larger, coiling diagonal
    { name: 'whip', role: 'accessory', pixels: [
      [13, 8], [14, 7], [15, 6],
      [13, 9], [14, 8],
      [15, 5],
    ]},
    // Belt with buckle detail
    { name: 'belt', role: 'belt', pixels: [
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Legs (longer proportion - less chibi, wider)
    { name: 'legs', role: 'leg', pixels: [
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
      [5, 12], [6, 12], [9, 12], [10, 12],
      [5, 13], [6, 13], [9, 13], [10, 13],
    ]},
    // Boots - heavier, wider
    { name: 'boots', role: 'boot', pixels: [
      [4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14],
      [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// DRAGON QUEST - HERO 16x16
// Extreme chibi, bright saturated colors, Toriyama-style spiky hair.
// Blue tunic, golden shield, vivid palette.
// ═══════════════════════════════════════════════════════════════
export const DQ_HERO_16: SpriteTemplate = {
  name: 'dq_hero_16',
  width: 16,
  height: 16,
  description: 'Dragon Quest Hero. Spiky hair, blue tunic, golden shield. Bright chibi Toriyama-style.',
  regions: [
    // Spiky hair (rows 0-1) - Toriyama signature
    { name: 'hair_spikes', role: 'hair', pixels: [
      [5, 0], [7, 0], [8, 0], [10, 0],       // spiky points
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
    ]},
    // Head (rows 2-3) - big chibi head
    { name: 'head', role: 'head', pixels: [
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [9, 3], [10, 3],
    ]},
    // Face (rows 3-4)
    { name: 'face', role: 'face', pixels: [
      [7, 3], [8, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
    ]},
    // Eyes - big, expressive (Toriyama-style)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 3], [9, 3],
    ]},
    // Mouth hint
    { name: 'mouth', role: 'face', pixels: [
      [7, 5], [8, 5],
    ]},
    // Neck
    { name: 'neck', role: 'face', pixels: [
      [7, 6], [8, 6],
    ]},
    // Tunic (rows 7-9) - vivid blue
    { name: 'tunic', role: 'body', pixels: [
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ]},
    // Arms
    { name: 'arms', role: 'arm', pixels: [
      [4, 8], [11, 8],
      [4, 9], [11, 9],
    ]},
    // Hands
    { name: 'hands', role: 'hand', pixels: [
      [4, 10], [11, 10],
    ]},
    // Golden shield (left side)
    { name: 'shield', role: 'accessory', pixels: [
      [2, 8], [3, 8],
      [2, 9], [3, 9],
      [2, 10], [3, 10],
    ]},
    // Belt
    { name: 'belt', role: 'belt', pixels: [
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Boots
    { name: 'boots', role: 'boot', pixels: [
      [5, 13], [6, 13], [9, 13], [10, 13],
      [5, 14], [6, 14], [9, 14], [10, 14],
      [5, 15], [6, 15], [9, 15], [10, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// FINAL FANTASY - DRAGOON 16x16
// Winged/horned helmet, lance-ready, blue-purple armor.
// ═══════════════════════════════════════════════════════════════
export const FF_DRAGOON_16: SpriteTemplate = {
  name: 'ff_dragoon_16',
  width: 16,
  height: 16,
  description: 'Final Fantasy Dragoon/Dragon Knight. Winged helmet, lance, blue-purple armor.',
  regions: [
    // Helmet wings (row 0) - wide, iconic
    { name: 'helmet_wings', role: 'accessory', pixels: [
      [4, 0], [11, 0],
      [4, 1], [11, 1],
    ]},
    // Helmet (rows 1-3) - pointed visor
    { name: 'helmet', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
    ]},
    // Visor (row 4) - narrow slit
    { name: 'visor', role: 'face', pixels: [
      [5, 4], [10, 4],
    ]},
    // Visor slit (eyes visible through)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    // Chin guard (row 5)
    { name: 'chin_guard', role: 'head', pixels: [
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Neck
    { name: 'neck', role: 'face', pixels: [
      [7, 6], [8, 6],
    ]},
    // Armor shoulders (row 7) - spiked
    { name: 'armor_shoulders', role: 'body', pixels: [
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
    ]},
    // Chest armor (rows 8-9)
    { name: 'armor_chest', role: 'body', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ]},
    // Arms
    { name: 'arms', role: 'arm', pixels: [
      [3, 8], [12, 8],
      [3, 9], [12, 9],
    ]},
    // Gauntlets
    { name: 'gauntlets', role: 'hand', pixels: [
      [3, 10], [12, 10],
    ]},
    // Lance (right side - tall, extends above head)
    { name: 'lance', role: 'accessory', pixels: [
      [13, 0], [13, 1], [13, 2], [13, 3], [13, 4],
      [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10],
      [14, 0], // lance tip widening
    ]},
    // Belt
    { name: 'belt', role: 'belt', pixels: [
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Legs (armored)
    { name: 'legs', role: 'leg', pixels: [
      [5, 11], [6, 11], [9, 11], [10, 11],
      [5, 12], [6, 12], [9, 12], [10, 12],
      [5, 13], [6, 13], [9, 13], [10, 13],
    ]},
    // Boots - armored, heavy
    { name: 'boots', role: 'boot', pixels: [
      [4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14],
      [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// ZELDA - LINK 16x16 (top-down SNES style)
// Green tunic, pointed hat, shield+sword, iconic silhouette.
// ═══════════════════════════════════════════════════════════════
export const ZELDA_LINK_16: SpriteTemplate = {
  name: 'zelda_link_16',
  width: 16,
  height: 16,
  description: 'Zelda-style Link. Green tunic, pointed cap, shield and sword. Top-down SNES inspired.',
  regions: [
    // Hat point (row 0)
    { name: 'hat_point', role: 'head', pixels: [
      [8, 0], [9, 0],
    ]},
    // Hat (rows 1-2) - side-hanging cap
    { name: 'hat', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1],
      [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],
    ]},
    // Hair (peeks from under hat)
    { name: 'hair', role: 'hair', pixels: [
      [5, 2], [5, 3],
    ]},
    // Face (rows 3-4)
    { name: 'face', role: 'face', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    // Eyes (separated for clear two-eye read)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 3], [9, 3],
    ]},
    // Neck
    { name: 'neck', role: 'face', pixels: [
      [7, 5], [8, 5],
    ]},
    // Tunic (rows 6-9) - green
    { name: 'tunic', role: 'body', pixels: [
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Arms
    { name: 'arms', role: 'arm', pixels: [
      [4, 7], [11, 7],
      [4, 8], [11, 8],
    ]},
    // Shield (left hand)
    { name: 'shield', role: 'accessory', pixels: [
      [2, 7], [3, 7],
      [2, 8], [3, 8],
      [3, 9],
    ]},
    // Sword (right hand)
    { name: 'sword', role: 'accessory', pixels: [
      [12, 6], [12, 7], [12, 8],
      [12, 5], // blade extends up
    ]},
    // Belt
    { name: 'belt', role: 'belt', pixels: [
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Boots
    { name: 'boots', role: 'boot', pixels: [
      [5, 13], [6, 13], [9, 13], [10, 13],
      [5, 14], [6, 14], [9, 14], [10, 14],
      [5, 15], [6, 15], [9, 15], [10, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// MEGA MAN 16x16
// Blue armor, helmet with visor, arm cannon, chibi proportions.
// ═══════════════════════════════════════════════════════════════
export const MEGAMAN_16: SpriteTemplate = {
  name: 'megaman_16',
  width: 16,
  height: 16,
  description: 'Mega Man style. Blue armor, helmet, arm cannon. Classic NES chibi proportions.',
  regions: [
    // Helmet (rows 0-3) - large, rounded with ear covers
    { name: 'helmet', role: 'head', pixels: [
      [6, 0], [7, 0], [8, 0], [9, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [9, 3], [10, 3],
    ]},
    // Face (rows 3-5)
    { name: 'face', role: 'face', pixels: [
      [7, 3], [8, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Eyes - big expressive
    { name: 'eyes', role: 'eye', pixels: [
      [6, 4], [9, 4],
    ]},
    // Neck
    { name: 'neck', role: 'face', pixels: [
      [7, 6], [8, 6],
    ]},
    // Body armor (rows 7-9)
    { name: 'armor', role: 'body', pixels: [
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Left arm (normal)
    { name: 'arm_left', role: 'arm', pixels: [
      [4, 7], [4, 8],
    ]},
    // Right arm - ARM CANNON (wider, iconic)
    { name: 'arm_cannon', role: 'accessory', pixels: [
      [11, 7], [12, 7],
      [11, 8], [12, 8], [13, 8],
      [11, 9], [12, 9], [13, 9],
    ]},
    // Hands
    { name: 'hand_left', role: 'hand', pixels: [
      [4, 9],
    ]},
    // Belt / waist
    { name: 'belt', role: 'belt', pixels: [
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Legs (armored)
    { name: 'legs', role: 'leg', pixels: [
      [5, 11], [6, 11], [9, 11], [10, 11],
      [5, 12], [6, 12], [9, 12], [10, 12],
    ]},
    // Boots - large, armored
    { name: 'boots', role: 'boot', pixels: [
      [4, 13], [5, 13], [6, 13], [9, 13], [10, 13], [11, 13],
      [4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14],
      [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// UNDERTALE STYLE 16x16
// Simple geometric, limited detail, expressive eyes.
// Muted retro palette, deliberate pixel constraints.
// Slightly wider with small arms and shirt stripe detail.
// ═══════════════════════════════════════════════════════════════
export const UT_CHARACTER_16: SpriteTemplate = {
  name: 'ut_character_16',
  width: 16,
  height: 16,
  description: 'Undertale-style character. Simple geometric shapes, expressive, striped shirt, muted retro palette.',
  regions: [
    // Hair (rows 0-2) - simple rounded
    { name: 'hair', role: 'hair', pixels: [
      [6, 0], [7, 0], [8, 0], [9, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [5, 2], [10, 2],
    ]},
    // Head (rows 2-4) - round
    { name: 'head', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    // Face - mouth hint
    { name: 'face', role: 'face', pixels: [
      [7, 5], [8, 5],
    ]},
    // Eyes - large, expressive (Undertale-style dots)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 3], [9, 3],
    ]},
    // Body (rows 6-10) - slightly wider rectangle (5px)
    { name: 'body', role: 'body', pixels: [
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Shirt stripes - horizontal lines for striped shirt detail
    { name: 'shirt_stripes', role: 'belt', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Arms - extending outward 2-3px each side
    { name: 'arms', role: 'arm', pixels: [
      [3, 7], [4, 7],
      [3, 8], [4, 8],
      [11, 7], [12, 7],
      [11, 8], [12, 8],
    ]},
    // Hands
    { name: 'hands', role: 'hand', pixels: [
      [3, 9], [12, 9],
    ]},
    // Heart locket (accessory - iconic Undertale heart)
    { name: 'locket', role: 'accessory', pixels: [
      [7, 6], [8, 6],
    ]},
    // Legs - simple, slightly separated
    { name: 'legs', role: 'leg', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Feet - simple
    { name: 'boots', role: 'boot', pixels: [
      [5, 13], [6, 13], [9, 13], [10, 13],
      [5, 14], [6, 14], [9, 14], [10, 14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// METROID - SAMUS 16x16
// Power suit, large helmet visor, arm cannon, tall proportions.
// Orange/red power suit with green visor.
// ═══════════════════════════════════════════════════════════════
export const METROID_SAMUS_16: SpriteTemplate = {
  name: 'metroid_samus_16',
  width: 16,
  height: 16,
  description: 'Metroid Samus Aran. Power suit, large visor, arm cannon. Orange/green iconic colors.',
  regions: [
    // Helmet top (rows 0-1)
    { name: 'helmet_top', role: 'head', pixels: [
      [6, 0], [7, 0], [8, 0], [9, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
    ]},
    // Visor (rows 2-3) - green T-shaped
    { name: 'visor', role: 'eye', pixels: [
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
    ]},
    // Helmet chin (rows 4-5)
    { name: 'helmet_chin', role: 'head', pixels: [
      [5, 3], [10, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [7, 5], [8, 5],
    ]},
    // Neck
    { name: 'neck', role: 'body', pixels: [
      [7, 5], [8, 5],
    ]},
    // Shoulder pads (row 6) - bulbous, iconic
    { name: 'shoulders', role: 'body', pixels: [
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
    ]},
    // Torso armor (rows 7-9)
    { name: 'armor', role: 'body', pixels: [
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Left arm
    { name: 'arm_left', role: 'arm', pixels: [
      [4, 7], [4, 8],
    ]},
    // Right arm - ARM CANNON (Samus signature)
    { name: 'arm_cannon', role: 'accessory', pixels: [
      [11, 7], [12, 7],
      [11, 8], [12, 8], [13, 8],
      [13, 7], // cannon barrel
    ]},
    // Waist
    { name: 'waist', role: 'belt', pixels: [
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Legs (armored)
    { name: 'legs', role: 'leg', pixels: [
      [5, 11], [6, 11], [9, 11], [10, 11],
      [5, 12], [6, 12], [9, 12], [10, 12],
      [5, 13], [6, 13], [9, 13], [10, 13],
    ]},
    // Boots - heavy armored
    { name: 'boots', role: 'boot', pixels: [
      [4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14],
      [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// Color schemes - tuned to each game's visual DNA
// ═══════════════════════════════════════════════════════════════

// FF Black Mage: golden hat, black face, blue robes
export const FF_BLACKMAGE_COLORS: ColorScheme = {
  name: 'ff_blackmage_default',
  mapping: {
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // golden hat
    face:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },  // pitch black void
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // blue robe
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },  // skin peek
    belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },  // red/gold sash
    leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // robe continues
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // hat tip gold
    hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  },
};

// FF Warrior: red armor, silver helmet, warm muted
export const FF_WARRIOR_COLORS: ColorScheme = {
  name: 'ff_warrior_default',
  mapping: {
    head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },  // steel helmet
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },  // red armor
    arm:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    hand:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },  // steel gauntlets
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },  // dark pants
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // gold horns + shield
    hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  },
};

// FF White Mage: white robes, red trim, holy
export const FF_WHITEMAGE_COLORS: ColorScheme = {
  name: 'ff_whitemage_default',
  mapping: {
    head:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // white hood
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // white robe
    arm:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },  // red trim!
    leg:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // white robe
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // golden staff
    hair:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  },
};

// Castlevania Belmont: dark leather, gothic cool palette
export const CV_BELMONT_COLORS: ColorScheme = {
  name: 'cv_belmont_default',
  mapping: {
    hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // brown hair
    head:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // dark leather
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // leather gloves
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },  // dark blue pants
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // dark boots
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // chain whip (metal)
  },
};

// Dragon Quest Hero: bright vivid blue, gold, saturated
export const DQ_HERO_COLORS: ColorScheme = {
  name: 'dq_hero_default',
  mapping: {
    hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // spiky golden-brown
    head:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // vivid blue tunic
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // golden belt
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // brown pants
    boot:      { shadow: '#442434', base: '#d27d2c', highlight: '#dad45e' },  // golden boots
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // golden shield
  },
};

// Zelda Link: green tunic, brown leather, golden accents
export const ZELDA_LINK_COLORS: ColorScheme = {
  name: 'zelda_link_default',
  mapping: {
    hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // golden-brown hair
    head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },  // green cap
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },  // green tunic
    arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // white tights
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // brown boots
    accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },  // silver sword + shield
  },
};

// Mega Man: bright blue armor, skin face
export const MEGAMAN_COLORS: ColorScheme = {
  name: 'megaman_default',
  mapping: {
    head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // blue helmet
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // blue armor
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    hand:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    belt:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },  // dark waist
    leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // blue legs
    boot:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // blue boots
    accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#6dc2ca' },  // arm cannon (lighter blue)
    hair:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  },
};

// Undertale: simple, muted retro with blue/purple tones
export const UT_CHARACTER_COLORS: ColorScheme = {
  name: 'ut_character_default',
  mapping: {
    hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // brown hair
    head:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // blue/purple shirt
    arm:       { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },  // skin arms
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },  // dark pants
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // brown shoes
    accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

// Metroid Samus: orange power suit, green visor
export const METROID_SAMUS_COLORS: ColorScheme = {
  name: 'metroid_samus_default',
  mapping: {
    head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },  // orange helmet
    face:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },  // helmet chin
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },  // orange suit
    arm:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    hand:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },  // red waist
    leg:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },  // orange legs
    boot:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },  // orange boots
    accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#6dc2ca' },  // green arm cannon
  },
};

// FF Dragoon: blue-purple armor, silver lance
export const FF_DRAGOON_COLORS: ColorScheme = {
  name: 'ff_dragoon_default',
  mapping: {
    head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // blue helmet
    face:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },  // visor sides
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // blue armor
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    hand:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },  // steel gauntlets
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },  // dark armored legs
    boot:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // blue armored boots
    accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },  // silver lance + wings
  },
};

// ═══════════════════════════════════════════════════════════════
// Export registries
// ═══════════════════════════════════════════════════════════════

export const GAME_TEMPLATES: Record<string, SpriteTemplate> = {
  ff_blackmage_16: FF_BLACKMAGE_16,
  ff_warrior_16: FF_WARRIOR_16,
  ff_whitemage_16: FF_WHITEMAGE_16,
  ff_dragoon_16: FF_DRAGOON_16,
  cv_belmont_16: CV_BELMONT_16,
  dq_hero_16: DQ_HERO_16,
  zelda_link_16: ZELDA_LINK_16,
  megaman_16: MEGAMAN_16,
  ut_character_16: UT_CHARACTER_16,
  metroid_samus_16: METROID_SAMUS_16,
};

export const GAME_COLOR_SCHEMES: Record<string, ColorScheme> = {
  ff_blackmage_default: FF_BLACKMAGE_COLORS,
  ff_warrior_default: FF_WARRIOR_COLORS,
  ff_whitemage_default: FF_WHITEMAGE_COLORS,
  ff_dragoon_default: FF_DRAGOON_COLORS,
  cv_belmont_default: CV_BELMONT_COLORS,
  dq_hero_default: DQ_HERO_COLORS,
  zelda_link_default: ZELDA_LINK_COLORS,
  megaman_default: MEGAMAN_COLORS,
  ut_character_default: UT_CHARACTER_COLORS,
  metroid_samus_default: METROID_SAMUS_COLORS,
};
