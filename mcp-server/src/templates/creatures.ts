/**
 * 16x16 creature/monster templates for common RPG enemies.
 * Based on classic pixel art conventions:
 * - Silhouettes are distinct and instantly recognizable at 16x16
 * - Centered in 16x16 canvas
 * - All coordinates in 0-15 range
 *
 * Uses the same region/template/color interfaces from humanoid16.
 * Creature anatomy maps to humanoid roles:
 *   body parts -> 'body', wings/horns/tails -> 'accessory',
 *   eyes -> 'eye', main shape -> 'head' or 'body', limbs -> 'leg'/'arm'
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// SLIME - Classic RPG blob. Dome top, flat bottom, 2 eyes.
// Iconic jelly creature - simple shape, high readability.
// ═══════════════════════════════════════════════════════════════
export const SLIME_16: SpriteTemplate = {
  name: 'slime_16',
  width: 16,
  height: 16,
  description: 'Front-facing RPG slime. Dome-shaped body, flat bottom, two dot eyes, top-left highlight.',
  regions: [
    // Highlight / shine (top-left of dome, rows 4-5)
    { name: 'highlight', role: 'accessory', pixels: [
      [6, 4],
      [5, 5], [6, 5],
    ]},
    // Dome top (rows 3-6)
    { name: 'body_upper', role: 'head', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [4, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
    ]},
    // Eyes (row 7, symmetric)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 7], [9, 7],
    ]},
    // Mouth (row 9, small smile)
    { name: 'mouth', role: 'face', pixels: [
      [7, 9], [8, 9],
    ]},
    // Body middle (rows 7-9) - widest part around eyes
    { name: 'body_middle', role: 'body', pixels: [
      [3, 7], [4, 7], [5, 7], [7, 7], [8, 7], [10, 7], [11, 7], [12, 7],
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [5, 9], [6, 9], [9, 9], [10, 9], [11, 9], [12, 9],
    ]},
    // Body lower (rows 10-12) - tapers slightly then flat bottom
    { name: 'body_lower', role: 'body', pixels: [
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
      [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// SKELETON - Undead warrior. Skull head, ribcage, thin limbs.
// Bony silhouette with weapon accessory.
// ═══════════════════════════════════════════════════════════════
export const SKELETON_16: SpriteTemplate = {
  name: 'skeleton_16',
  width: 16,
  height: 16,
  description: 'Front-facing skeleton warrior. Skull, ribcage, thin 1px limbs, bone club weapon.',
  regions: [
    // Skull (rows 0-3) - rounded
    { name: 'skull', role: 'head', pixels: [
      [6, 0], [7, 0], [8, 0], [9, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
    ]},
    // Eye sockets (row 2) - dark hollow dots
    { name: 'eye_sockets', role: 'eye', pixels: [
      [6, 2], [9, 2],
    ]},
    // Jaw / face detail (row 3)
    { name: 'jaw', role: 'face', pixels: [
      [7, 4], [8, 4],
    ]},
    // Spine / neck (row 5)
    { name: 'spine_neck', role: 'body', pixels: [
      [7, 5], [8, 5],
    ]},
    // Ribcage (rows 6-9) - horizontal bone lines with gaps
    { name: 'ribcage', role: 'body', pixels: [
      // Shoulders
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      // Rib row 1
      [6, 7], [7, 7], [8, 7], [9, 7],
      // Rib row 2
      [6, 8], [7, 8], [8, 8], [9, 8],
      // Rib row 3
      [7, 9], [8, 9],
    ]},
    // Arms (1px wide, thin bone arms)
    { name: 'arms', role: 'arm', pixels: [
      [4, 6], [11, 6],
      [4, 7], [11, 7],
      [4, 8], [11, 8],
      [4, 9],
    ]},
    // Left hand
    { name: 'hand_left', role: 'hand', pixels: [
      [4, 10],
    ]},
    // Weapon - bone club in right hand (extends right+down)
    { name: 'weapon', role: 'accessory', pixels: [
      [12, 7],
      [12, 8], [13, 8],
      [12, 9], [13, 9], [14, 9],
      [12, 10], [13, 10],
    ]},
    // Pelvis (row 10)
    { name: 'pelvis', role: 'belt', pixels: [
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Legs (thin 1px bone legs, 2px gap)
    { name: 'legs', role: 'leg', pixels: [
      [6, 11], [9, 11],
      [6, 12], [9, 12],
      [6, 13], [9, 13],
    ]},
    // Feet (small bone feet)
    { name: 'feet', role: 'boot', pixels: [
      [5, 14], [6, 14], [9, 14], [10, 14],
      [5, 15], [6, 15], [9, 15], [10, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// BAT - Flying bat creature. Wings spread wide, small body.
// Distinctive wing silhouette dominates the frame.
// ═══════════════════════════════════════════════════════════════
export const BAT_16: SpriteTemplate = {
  name: 'bat_16',
  width: 16,
  height: 16,
  description: 'Front-facing bat. Wide spread wings, small body, red dot eyes, pointed wing tips.',
  regions: [
    // Ears (row 3, above head)
    { name: 'ears', role: 'accessory', pixels: [
      [6, 3], [9, 3],
    ]},
    // Head (rows 4-5, small)
    { name: 'head', role: 'head', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Eyes (row 4, red dots, separated for two-eye read)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 4], [9, 4],
    ]},
    // Body (rows 6-8, small/compact)
    { name: 'body', role: 'body', pixels: [
      [6, 6], [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    // Left wing (rows 4-10, spreads wide left with pointed tips)
    { name: 'wing_left', role: 'arm', pixels: [
      // Wing arm
      [5, 5], [4, 5],
      [5, 6], [4, 6], [3, 6],
      [5, 7], [4, 7], [3, 7], [2, 7],
      // Wing membrane
      [5, 8], [4, 8], [3, 8], [2, 8], [1, 8],
      // Wing fingers / pointed tips
      [0, 5], [1, 5],
      [0, 6], [1, 6],
      [0, 7], [1, 7],
      // Lower wing edge
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9],
      [3, 10], [4, 10], [5, 10], [6, 10],
    ]},
    // Right wing (rows 4-10, spreads wide right with pointed tips)
    { name: 'wing_right', role: 'arm', pixels: [
      // Wing arm
      [10, 5], [11, 5],
      [10, 6], [11, 6], [12, 6],
      [10, 7], [11, 7], [12, 7], [13, 7],
      // Wing membrane
      [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
      // Wing fingers / pointed tips
      [14, 5], [15, 5],
      [14, 6], [15, 6],
      [14, 7], [15, 7],
      // Lower wing edge
      [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      [9, 10], [10, 10], [11, 10], [12, 10],
    ]},
    // Feet (rows 9-10, small claws dangling)
    { name: 'feet', role: 'leg', pixels: [
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [6, 11], [7, 11],
      [8, 11], [9, 11],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// GHOST - Floating spirit. Rounded dome top, wavy trailing bottom.
// Hollow eyes give it the classic haunted look.
// ═══════════════════════════════════════════════════════════════
export const GHOST_16: SpriteTemplate = {
  name: 'ghost_16',
  width: 16,
  height: 16,
  description: 'Floating ghost/spirit. Round dome top, hollow circle eyes, wavy trailing bottom edge.',
  regions: [
    // Head dome (rows 1-4)
    { name: 'head', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
    ]},
    // Hollow eyes (rows 5-6) - circles with dark center
    // Left eye outline + hollow
    { name: 'eye_left', role: 'eye', pixels: [
      [5, 5], [6, 5],
      [5, 6], [6, 6],
    ]},
    // Right eye outline + hollow
    { name: 'eye_right', role: 'eye', pixels: [
      [9, 5], [10, 5],
      [9, 6], [10, 6],
    ]},
    // Mouth (row 7, small "o" shape)
    { name: 'mouth', role: 'face', pixels: [
      [7, 7], [8, 7],
    ]},
    // Upper body (rows 5-7, around eyes/mouth)
    { name: 'body_upper', role: 'body', pixels: [
      [4, 5], [7, 5], [8, 5], [11, 5],
      [4, 6], [7, 6], [8, 6], [11, 6],
      [4, 7], [5, 7], [6, 7], [9, 7], [10, 7], [11, 7],
    ]},
    // Lower body (rows 8-10, slight taper)
    { name: 'body_lower', role: 'body', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Wavy tail / trailing bottom (rows 11-13) - uneven, ghostly
    { name: 'tail', role: 'leg', pixels: [
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
      [5, 12], [6, 12], [9, 12], [10, 12],
      [4, 13], [5, 13], [10, 13], [11, 13],
    ]},
    // Arms / wisps extending from sides (rows 6-9)
    { name: 'arms', role: 'arm', pixels: [
      [3, 6], [12, 6],
      [3, 7], [12, 7],
      [3, 8], [12, 8],
      [2, 9], [13, 9],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// DRAGON - Small dragon/wyvern. Horns, wings, stocky body, tail.
// Compact and powerful silhouette.
// ═══════════════════════════════════════════════════════════════
export const DRAGON_16: SpriteTemplate = {
  name: 'dragon_16',
  width: 16,
  height: 16,
  description: 'Front-facing small dragon. Horns, stocky body, small wings, tail, short legs.',
  regions: [
    // Horns (rows 0-1)
    { name: 'horns', role: 'accessory', pixels: [
      [5, 0], [10, 0],
      [5, 1], [10, 1],
    ]},
    // Head (rows 1-4) - broad reptilian head
    { name: 'head', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    // Eyes (row 3)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 3], [9, 3],
    ]},
    // Snout / jaw detail (row 4)
    { name: 'snout', role: 'face', pixels: [
      [7, 5], [8, 5],
    ]},
    // Neck (row 5)
    { name: 'neck', role: 'body', pixels: [
      [6, 5], [9, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
    ]},
    // Body / torso (rows 7-10) - stocky
    { name: 'body', role: 'body', pixels: [
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Belly (lighter underbelly, center of body)
    { name: 'belly', role: 'belt', pixels: [
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
    ]},
    // Wings left (rows 5-9, small stubby wings)
    { name: 'wing_left', role: 'arm', pixels: [
      [3, 5], [4, 5],
      [2, 6], [3, 6], [4, 6],
      [1, 7], [2, 7], [3, 7], [4, 7],
      [2, 8], [3, 8], [4, 8],
      [3, 9], [4, 9],
    ]},
    // Wings right (rows 5-9, small stubby wings)
    { name: 'wing_right', role: 'arm', pixels: [
      [11, 5], [12, 5],
      [11, 6], [12, 6], [13, 6],
      [11, 7], [12, 7], [13, 7], [14, 7],
      [11, 8], [12, 8], [13, 8],
      [11, 9], [12, 9],
    ]},
    // Tail (curls to one side, rows 10-13)
    { name: 'tail', role: 'accessory', pixels: [
      [10, 10], [11, 10],
      [11, 11], [12, 11],
      [12, 12], [13, 12],
      [12, 13],
    ]},
    // Legs (rows 11-13, short stubby)
    { name: 'legs', role: 'leg', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
      [5, 12], [6, 12], [9, 12], [10, 12],
      [5, 13], [6, 13], [9, 13], [10, 13],
    ]},
    // Clawed feet (rows 14-15)
    { name: 'feet', role: 'boot', pixels: [
      [4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14],
      [4, 15], [5, 15], [6, 15], [9, 15], [10, 15], [11, 15],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// GOBLIN - Small green humanoid. Big ears, hunched, crude weapon.
// Classic low-level RPG enemy.
// ═══════════════════════════════════════════════════════════════
export const GOBLIN_16: SpriteTemplate = {
  name: 'goblin_16',
  width: 16,
  height: 16,
  description: 'Front-facing goblin. Big pointy ears, hunched posture, crude wooden club.',
  regions: [
    // Ears (rows 2-3, stick out wide past head)
    { name: 'ears', role: 'accessory', pixels: [
      [3, 2], [4, 2], [11, 2], [12, 2],
      [3, 3], [12, 3],
    ]},
    // Head (rows 1-4) - slightly oversized for body
    { name: 'head', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    // Face detail (nose, mouth area)
    { name: 'face', role: 'face', pixels: [
      [7, 4], [8, 4],
      [7, 5], [8, 5],
    ]},
    // Eyes (row 3, beady)
    { name: 'eyes', role: 'eye', pixels: [
      [6, 3], [9, 3],
    ]},
    // Neck (row 5, thin)
    { name: 'neck', role: 'face', pixels: [
      [7, 6], [8, 6],
    ]},
    // Body / torso (rows 7-10) - small, hunched
    { name: 'body', role: 'body', pixels: [
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Left arm (1px, reaching down)
    { name: 'arm_left', role: 'arm', pixels: [
      [4, 7],
      [4, 8],
      [4, 9],
    ]},
    // Left hand
    { name: 'hand_left', role: 'hand', pixels: [
      [4, 10],
    ]},
    // Right arm (1px, holding weapon up)
    { name: 'arm_right', role: 'arm', pixels: [
      [11, 7],
      [11, 8],
    ]},
    // Weapon - crude wooden club (right side, rows 4-9)
    { name: 'weapon', role: 'accessory', pixels: [
      [12, 4], [13, 4],
      [12, 5], [13, 5],
      [12, 6],
      [12, 7],
      [12, 8],
      [12, 9],
    ]},
    // Belt / loincloth
    { name: 'belt', role: 'belt', pixels: [
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Legs (rows 11-13, short and thin)
    { name: 'legs', role: 'leg', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [6, 13], [9, 13],
    ]},
    // Feet (rows 14-15, bare/clawed)
    { name: 'feet', role: 'boot', pixels: [
      [5, 14], [6, 14], [9, 14], [10, 14],
      [5, 15], [6, 15], [9, 15], [10, 15],
    ]},
  ],
};


// ═══════════════════════════════════════════════════════════════
// Color schemes for creatures (DB16 palette)
// Each role uses 3 colors: shadow / base / highlight
// with proper hue-shifting for depth
// ═══════════════════════════════════════════════════════════════

export const SLIME_COLORS: ColorScheme = {
  name: 'slime_default',
  mapping: {
    head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // green dome
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // green body
    face:      { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' }, // mouth / lighter
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    accessory: { shadow: '#6dc2ca', base: '#dad45e', highlight: '#deeed6' }, // top shine highlight
    arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // unused fallback
    hand:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // unused fallback
    belt:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // unused fallback
    leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // unused fallback
    boot:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // unused fallback
  },
};

export const SKELETON_COLORS: ColorScheme = {
  name: 'skeleton_default',
  mapping: {
    head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' }, // bone skull
    face:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' }, // jaw bone
    eye:       { shadow: '#140c1c', base: '#442434', highlight: '#140c1c' }, // hollow dark sockets
    body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' }, // bone ribs/spine
    arm:       { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' }, // bone arms
    hand:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' }, // bone hands
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // pelvis (darker bone)
    leg:       { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' }, // bone legs
    boot:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' }, // bone feet
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // bone club (warm brown)
  },
};

export const BAT_COLORS: ColorScheme = {
  name: 'bat_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // dark purple head
    body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // dark purple body
    eye:       { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' }, // red glowing
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#30346d' }, // dark wing membrane
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // small feet/claws
    accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // ears
    face:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // unused fallback
    hand:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // unused fallback
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // unused fallback
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // unused fallback
  },
};

export const GHOST_COLORS: ColorScheme = {
  name: 'ghost_default',
  mapping: {
    head:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, // pale white dome
    body:      { shadow: '#8595a1', base: '#6dc2ca', highlight: '#deeed6' }, // translucent blue-white
    face:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' }, // mouth detail
    eye:       { shadow: '#140c1c', base: '#30346d', highlight: '#442434' }, // hollow dark
    arm:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, // wispy arms
    leg:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#8595a1' }, // wavy trailing tail
    accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, // unused fallback
    hand:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, // unused fallback
    belt:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, // unused fallback
    boot:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, // unused fallback
  },
};

export const DRAGON_COLORS: ColorScheme = {
  name: 'dragon_default',
  mapping: {
    head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // red-crimson head
    face:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // snout
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // bright yellow
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // red body
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d04648' }, // dark wing membrane
    belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // orange/yellow belly
    leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // red legs
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // dark clawed feet
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // horns + tail (warm orange)
    hand:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // unused fallback
  },
};

export const GOBLIN_COLORS: ColorScheme = {
  name: 'goblin_default',
  mapping: {
    head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // green skin
    face:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // green face
    eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // orange-red beady
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // brown leather armor
    arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // green skin arms
    hand:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // green hands
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // leather belt
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // brown pants
    boot:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // bare green feet
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // ears (green-gray) + club (wood)
  },
};


// ═══════════════════════════════════════════════════════════════
// Exports - indexed by template/scheme name
// ═══════════════════════════════════════════════════════════════

export const CREATURE_TEMPLATES: Record<string, SpriteTemplate> = {
  slime_16: SLIME_16,
  skeleton_16: SKELETON_16,
  bat_16: BAT_16,
  ghost_16: GHOST_16,
  dragon_16: DRAGON_16,
  goblin_16: GOBLIN_16,
};

export const CREATURE_COLOR_SCHEMES: Record<string, ColorScheme> = {
  slime_default: SLIME_COLORS,
  skeleton_default: SKELETON_COLORS,
  bat_default: BAT_COLORS,
  ghost_default: GHOST_COLORS,
  dragon_default: DRAGON_COLORS,
  goblin_default: GOBLIN_COLORS,
};
