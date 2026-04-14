/**
 * 16x16 animation frame templates – walk cycles for core characters.
 *
 * Each character has 4 walk frames based on their standing template:
 *   frame 1: right contact  (right leg forward, left back, arms swap, body +1 down)
 *   frame 2: passing high   (legs together, body neutral, arms neutral)
 *   frame 3: left contact   (left leg forward, right back, arms swap opposite, body +1 down)
 *   frame 4: passing low    (same as frame 2 - completes the cycle)
 *
 * Changes per frame vs standing pose:
 *   - Legs shift ±1px horizontally or forward/back
 *   - Arms swing (opposite arm forward with opposite leg)
 *   - Body bobs ±1px vertically on contact frames
 *   - Head stays stable (only shifts on bob frames)
 *
 * DB16 palette. Density target: 50-60%.
 */

import { SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// KNIGHT WALK CYCLE - 4 frames
// Base: knight_16 standing pose (rows 0-15)
// ═══════════════════════════════════════════════════════════════

export const KNIGHT_WALK_1: SpriteTemplate = {
  name: 'knight_walk_1',
  width: 16,
  height: 16,
  description: 'Knight walk frame 1: right leg forward, left arm forward, body down 1px.',
  regions: [
    // Helmet crest (row 1 - shifted down 1 from bob)
    { name: 'crest', role: 'accessory', pixels: [
      [7, 1], [8, 1],
    ]},
    // Helmet (rows 2-6, shifted down 1)
    { name: 'helmet', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [10, 5], [11, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
    ]},
    // Face (rows 4-8, down 1)
    { name: 'face', role: 'face', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
    ]},
    { name: 'eyes', role: 'eye', pixels: [
      [6, 4], [9, 4],
    ]},
    // Body (rows 9-11, down 1)
    { name: 'armor', role: 'body', pixels: [
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Left arm forward (reaching), right arm back
    { name: 'arms', role: 'arm', pixels: [
      [3, 9], [4, 9], [3, 10], [4, 10],   // left arm forward
      [11, 10], [12, 10],                   // right arm back (higher)
    ]},
    // Shield on right arm (pulled back)
    { name: 'shield', role: 'accessory', pixels: [
      [12, 11], [13, 11],
    ]},
    // Belt (row 12)
    { name: 'belt', role: 'belt', pixels: [
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ]},
    // Right leg forward, left leg back
    { name: 'legs', role: 'leg', pixels: [
      // right leg forward (+1px)
      [9, 13], [10, 13], [11, 13],
      [9, 14], [10, 14], [11, 14],
      // left leg back (-1px)
      [4, 13], [5, 13], [6, 13],
      [4, 14], [5, 14], [6, 14],
    ]},
    // Boots
    { name: 'boots', role: 'boot', pixels: [
      [3, 15], [4, 15], [5, 15],     // left boot back
      [10, 15], [11, 15], [12, 15],  // right boot forward
    ]},
  ],
};

export const KNIGHT_WALK_2: SpriteTemplate = {
  name: 'knight_walk_2',
  width: 16,
  height: 16,
  description: 'Knight walk frame 2: passing pose, legs together, neutral arms.',
  regions: [
    { name: 'crest', role: 'accessory', pixels: [
      [7, 0], [8, 0],
    ]},
    { name: 'helmet', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
      [4, 3], [5, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [
      [6, 3], [9, 3],
    ]},
    { name: 'armor', role: 'body', pixels: [
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    { name: 'arms', role: 'arm', pixels: [
      [3, 8], [4, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [11, 9], [12, 9],
    ]},
    { name: 'shield', role: 'accessory', pixels: [
      [11, 10], [12, 10],
      [11, 11], [12, 11],
    ]},
    { name: 'belt', role: 'belt', pixels: [
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Legs together (passing)
    { name: 'legs', role: 'leg', pixels: [
      [6, 12], [7, 12], [8, 12], [9, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    { name: 'boots', role: 'boot', pixels: [
      [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14],
      [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15],
    ]},
  ],
};

export const KNIGHT_WALK_3: SpriteTemplate = {
  name: 'knight_walk_3',
  width: 16,
  height: 16,
  description: 'Knight walk frame 3: left leg forward, right arm forward, body down 1px.',
  regions: [
    { name: 'crest', role: 'accessory', pixels: [
      [7, 1], [8, 1],
    ]},
    { name: 'helmet', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [10, 5], [11, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
    ]},
    { name: 'eyes', role: 'eye', pixels: [
      [6, 4], [9, 4],
    ]},
    { name: 'armor', role: 'body', pixels: [
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Right arm forward, left arm back
    { name: 'arms', role: 'arm', pixels: [
      [11, 9], [12, 9], [11, 10], [12, 10],   // right arm forward
      [3, 10], [4, 10],                         // left arm back
    ]},
    { name: 'shield', role: 'accessory', pixels: [
      [12, 10], [13, 10],
      [12, 11], [13, 11],
    ]},
    { name: 'belt', role: 'belt', pixels: [
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
    ]},
    // Left leg forward, right leg back
    { name: 'legs', role: 'leg', pixels: [
      [4, 13], [5, 13], [6, 13],     // left leg forward
      [4, 14], [5, 14], [6, 14],
      [9, 13], [10, 13], [11, 13],   // right leg back
      [9, 14], [10, 14], [11, 14],
    ]},
    { name: 'boots', role: 'boot', pixels: [
      [3, 15], [4, 15], [5, 15],     // left boot forward
      [10, 15], [11, 15], [12, 15],  // right boot back
    ]},
  ],
};

export const KNIGHT_WALK_4: SpriteTemplate = {
  name: 'knight_walk_4',
  width: 16,
  height: 16,
  description: 'Knight walk frame 4: passing pose (same as frame 2, completes cycle).',
  regions: [...KNIGHT_WALK_2.regions],
};

// ═══════════════════════════════════════════════════════════════
// MAGE WALK CYCLE - 4 frames
// Robe sway replaces leg movement. Staff bobs with body.
// ═══════════════════════════════════════════════════════════════

export const MAGE_WALK_1: SpriteTemplate = {
  name: 'mage_walk_1',
  width: 16,
  height: 16,
  description: 'Mage walk frame 1: robe sways right, body down 1px.',
  regions: [
    { name: 'hat_point', role: 'accessory', pixels: [
      [8, 1],
      [7, 2], [8, 2],
    ]},
    { name: 'hat', role: 'head', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
    ]},
    { name: 'face', role: 'face', pixels: [
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    ]},
    { name: 'eyes', role: 'eye', pixels: [
      [6, 6], [9, 6],
    ]},
    { name: 'robe_upper', role: 'body', pixels: [
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    { name: 'arms', role: 'arm', pixels: [
      [3, 9], [4, 9], [11, 9], [12, 9],
      [3, 10], [4, 10], [11, 10], [12, 10],
    ]},
    { name: 'sash', role: 'belt', pixels: [
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
    ]},
    // Robe sways right
    { name: 'robe_lower', role: 'leg', pixels: [
      [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
      [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
      [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
    ]},
    { name: 'boots', role: 'boot', pixels: [
      [5, 15], [6, 15], [7, 15],   [10, 15], [11, 15], [12, 15],
    ]},
  ],
};

export const MAGE_WALK_2: SpriteTemplate = {
  name: 'mage_walk_2',
  width: 16,
  height: 16,
  description: 'Mage walk frame 2: robe centered, body neutral.',
  regions: [
    { name: 'hat_point', role: 'accessory', pixels: [
      [8, 0],
      [7, 1], [8, 1],
    ]},
    { name: 'hat', role: 'head', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
    ]},
    { name: 'face', role: 'face', pixels: [
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [
      [6, 5], [9, 5],
    ]},
    { name: 'robe_upper', role: 'body', pixels: [
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ]},
    { name: 'arms', role: 'arm', pixels: [
      [3, 8], [4, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [11, 9], [12, 9],
    ]},
    { name: 'sash', role: 'belt', pixels: [
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
    ]},
    { name: 'robe_lower', role: 'leg', pixels: [
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
      [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12],
      [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13],
    ]},
    { name: 'boots', role: 'boot', pixels: [
      [4, 14], [5, 14], [6, 14],   [9, 14], [10, 14], [11, 14],
    ]},
  ],
};

export const MAGE_WALK_3: SpriteTemplate = {
  name: 'mage_walk_3',
  width: 16,
  height: 16,
  description: 'Mage walk frame 3: robe sways left, body down 1px.',
  regions: [
    { name: 'hat_point', role: 'accessory', pixels: [
      [8, 1],
      [7, 2], [8, 2],
    ]},
    { name: 'hat', role: 'head', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
    ]},
    { name: 'face', role: 'face', pixels: [
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    ]},
    { name: 'eyes', role: 'eye', pixels: [
      [6, 6], [9, 6],
    ]},
    { name: 'robe_upper', role: 'body', pixels: [
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    { name: 'arms', role: 'arm', pixels: [
      [3, 9], [4, 9], [11, 9], [12, 9],
      [3, 10], [4, 10], [11, 10], [12, 10],
    ]},
    { name: 'sash', role: 'belt', pixels: [
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
    ]},
    // Robe sways left
    { name: 'robe_lower', role: 'leg', pixels: [
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12],
      [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
      [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14],
    ]},
    { name: 'boots', role: 'boot', pixels: [
      [3, 15], [4, 15], [5, 15],   [8, 15], [9, 15], [10, 15],
    ]},
  ],
};

export const MAGE_WALK_4: SpriteTemplate = {
  name: 'mage_walk_4',
  width: 16,
  height: 16,
  description: 'Mage walk frame 4: passing pose (same as frame 2, completes cycle).',
  regions: [...MAGE_WALK_2.regions],
};

// ═══════════════════════════════════════════════════════════════
// ROGUE WALK CYCLE - 4 frames
// Stealthy crouch-walk. Cape flows. Daggers follow arm swing.
// ═══════════════════════════════════════════════════════════════

export const ROGUE_WALK_1: SpriteTemplate = {
  name: 'rogue_walk_1',
  width: 16,
  height: 16,
  description: 'Rogue walk frame 1: right leg forward, left arm forward with dagger, cape flows right.',
  regions: [
    { name: 'hood', role: 'head', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [4, 3], [5, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [10, 5], [11, 5],
      [5, 6], [6, 6], [9, 6], [10, 6],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6],
    ]},
    { name: 'eyes', role: 'eye', pixels: [
      [6, 4], [9, 4],
    ]},
    { name: 'chin', role: 'face', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    { name: 'tunic', role: 'body', pixels: [
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Left arm forward, right arm back
    { name: 'arms', role: 'arm', pixels: [
      [3, 8], [4, 8], [3, 9], [4, 9],   // left forward
      [11, 9], [12, 9],                   // right back
    ]},
    // Cape flows right with movement
    { name: 'cape', role: 'accessory', pixels: [
      [12, 7], [13, 7],
      [12, 8], [13, 8], [14, 8],
      [13, 9], [14, 9],
      [13, 10], [14, 10],
      [14, 11],
    ]},
    { name: 'daggers', role: 'accessory', pixels: [
      [2, 9], [2, 10],  // left dagger (forward)
    ]},
    { name: 'belt', role: 'belt', pixels: [
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Right leg forward, left leg back
    { name: 'legs', role: 'leg', pixels: [
      [9, 12], [10, 12], [11, 12],
      [9, 13], [10, 13], [11, 13],
      [4, 12], [5, 12], [6, 12],
      [4, 13], [5, 13], [6, 13],
    ]},
    { name: 'boots', role: 'boot', pixels: [
      [3, 14], [4, 14], [5, 14],     // left back
      [3, 15], [4, 15], [5, 15],
      [10, 14], [11, 14], [12, 14],  // right forward
      [10, 15], [11, 15], [12, 15],
    ]},
  ],
};

export const ROGUE_WALK_2: SpriteTemplate = {
  name: 'rogue_walk_2',
  width: 16,
  height: 16,
  description: 'Rogue walk frame 2: passing pose, legs together, cape settling.',
  regions: [
    { name: 'hood', role: 'head', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [4, 3], [5, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [10, 5], [11, 5],
      [5, 6], [6, 6], [9, 6], [10, 6],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6],
    ]},
    { name: 'eyes', role: 'eye', pixels: [
      [6, 4], [9, 4],
    ]},
    { name: 'chin', role: 'face', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    { name: 'tunic', role: 'body', pixels: [
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    { name: 'arms', role: 'arm', pixels: [
      [3, 8], [4, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [11, 9], [12, 9],
    ]},
    { name: 'cape', role: 'accessory', pixels: [
      [12, 7], [13, 7],
      [12, 8], [13, 8],
      [12, 9], [13, 9],
      [12, 10], [13, 10],
      [13, 11],
    ]},
    { name: 'daggers', role: 'accessory', pixels: [
      [2, 9], [2, 10],
    ]},
    { name: 'belt', role: 'belt', pixels: [
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    { name: 'legs', role: 'leg', pixels: [
      [6, 12], [7, 12], [8, 12], [9, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    { name: 'boots', role: 'boot', pixels: [
      [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14],
      [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15],
    ]},
  ],
};

export const ROGUE_WALK_3: SpriteTemplate = {
  name: 'rogue_walk_3',
  width: 16,
  height: 16,
  description: 'Rogue walk frame 3: left leg forward, right arm forward, cape flows left.',
  regions: [
    { name: 'hood', role: 'head', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [4, 3], [5, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [10, 4], [11, 4],
      [4, 5], [5, 5], [10, 5], [11, 5],
      [5, 6], [6, 6], [9, 6], [10, 6],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6],
    ]},
    { name: 'eyes', role: 'eye', pixels: [
      [6, 4], [9, 4],
    ]},
    { name: 'chin', role: 'face', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    { name: 'tunic', role: 'body', pixels: [
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Right arm forward, left arm back
    { name: 'arms', role: 'arm', pixels: [
      [11, 8], [12, 8], [11, 9], [12, 9],  // right forward
      [3, 9], [4, 9],                        // left back
    ]},
    // Cape flows left
    { name: 'cape', role: 'accessory', pixels: [
      [12, 7], [13, 7],
      [12, 8], [13, 8],
      [11, 9], [12, 9],
      [11, 10], [12, 10],
      [11, 11],
    ]},
    { name: 'daggers', role: 'accessory', pixels: [
      [13, 9], [13, 10],  // right dagger (forward)
    ]},
    { name: 'belt', role: 'belt', pixels: [
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Left leg forward, right leg back
    { name: 'legs', role: 'leg', pixels: [
      [4, 12], [5, 12], [6, 12],
      [4, 13], [5, 13], [6, 13],
      [9, 12], [10, 12], [11, 12],
      [9, 13], [10, 13], [11, 13],
    ]},
    { name: 'boots', role: 'boot', pixels: [
      [3, 14], [4, 14], [5, 14],     // left forward
      [3, 15], [4, 15], [5, 15],
      [10, 14], [11, 14], [12, 14],  // right back
      [10, 15], [11, 15], [12, 15],
    ]},
  ],
};

export const ROGUE_WALK_4: SpriteTemplate = {
  name: 'rogue_walk_4',
  width: 16,
  height: 16,
  description: 'Rogue walk frame 4: passing pose (same as frame 2, completes cycle).',
  regions: [...ROGUE_WALK_2.regions],
};

// ═══════════════════════════════════════════════════════════════
// VILLAGER WALK CYCLE - 4 frames
// NPC-friendly neutral walk for town crowds and ambient motion.
// ═══════════════════════════════════════════════════════════════

export const VILLAGER_WALK_1: SpriteTemplate = {
  name: 'villager_walk_1',
  width: 16,
  height: 16,
  description: 'Villager walk frame 1: right leg forward, left arm forward.',
  regions: [
    { name: 'hat', role: 'accessory', pixels: [
      [7, 0], [8, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
    ]},
    { name: 'head', role: 'head', pixels: [
      [4, 3], [5, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [10, 4], [11, 4],
      [5, 5], [10, 5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6, 4], [9, 4]] },
    { name: 'body', role: 'body', pixels: [
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    { name: 'arms', role: 'arm', pixels: [
      [3, 8], [4, 8], [3, 9], [4, 9], [3, 10],
      [11, 9], [12, 9],
    ]},
    { name: 'hands', role: 'hand', pixels: [[3, 10], [12, 10]] },
    { name: 'belt', role: 'belt', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
    { name: 'legs', role: 'leg', pixels: [
      [5, 12], [6, 12], [5, 13], [6, 13],
      [9, 12], [10, 12], [11, 12], [9, 13], [10, 13], [11, 13],
    ]},
    { name: 'boots', role: 'boot', pixels: [
      [4, 14], [5, 14], [4, 15], [5, 15],
      [10, 14], [11, 14], [12, 14], [10, 15], [11, 15], [12, 15],
    ]},
  ],
};

export const VILLAGER_WALK_2: SpriteTemplate = {
  name: 'villager_walk_2',
  width: 16,
  height: 16,
  description: 'Villager walk frame 2: passing pose with neutral arms and centered legs.',
  regions: [
    { name: 'hat', role: 'accessory', pixels: [
      [7, 0], [8, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
    ]},
    { name: 'head', role: 'head', pixels: [
      [4, 3], [5, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [10, 4], [11, 4],
      [5, 5], [10, 5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6, 4], [9, 4]] },
    { name: 'body', role: 'body', pixels: [
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    { name: 'arms', role: 'arm', pixels: [
      [3, 8], [4, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [11, 9], [12, 9],
    ]},
    { name: 'hands', role: 'hand', pixels: [[3, 10], [12, 10]] },
    { name: 'belt', role: 'belt', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
    { name: 'legs', role: 'leg', pixels: [
      [6, 12], [7, 12], [8, 12], [9, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    { name: 'boots', role: 'boot', pixels: [
      [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14],
      [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15],
    ]},
  ],
};

export const VILLAGER_WALK_3: SpriteTemplate = {
  name: 'villager_walk_3',
  width: 16,
  height: 16,
  description: 'Villager walk frame 3: left leg forward, right arm forward.',
  regions: [
    { name: 'hat', role: 'accessory', pixels: [
      [7, 0], [8, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
    ]},
    { name: 'head', role: 'head', pixels: [
      [4, 3], [5, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [10, 4], [11, 4],
      [5, 5], [10, 5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6, 4], [9, 4]] },
    { name: 'body', role: 'body', pixels: [
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    { name: 'arms', role: 'arm', pixels: [
      [3, 9], [4, 9],
      [11, 8], [12, 8], [11, 9], [12, 9], [12, 10],
    ]},
    { name: 'hands', role: 'hand', pixels: [[3, 10], [12, 10]] },
    { name: 'belt', role: 'belt', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
    { name: 'legs', role: 'leg', pixels: [
      [5, 12], [6, 12], [7, 12], [5, 13], [6, 13], [7, 13],
      [10, 12], [11, 12], [10, 13], [11, 13],
    ]},
    { name: 'boots', role: 'boot', pixels: [
      [4, 14], [5, 14], [6, 14], [4, 15], [5, 15], [6, 15],
      [10, 14], [11, 14], [12, 14], [10, 15], [11, 15], [12, 15],
    ]},
  ],
};

export const VILLAGER_WALK_4: SpriteTemplate = {
  name: 'villager_walk_4',
  width: 16,
  height: 16,
  description: 'Villager walk frame 4: passing pose (same as frame 2, completes cycle).',
  regions: [...VILLAGER_WALK_2.regions],
};


// ═══════════════════════════════════════════════════════════════
// Color schemes - reuse existing character palettes
// ═══════════════════════════════════════════════════════════════

// Knight walk frames use knight_default palette (defined in humanoid16.ts)
// Mage walk frames use mage_default palette
// Rogue walk frames use rogue_default palette
// No new color schemes needed - templateTools resolves by stripping _walk_N suffix

// ═══════════════════════════════════════════════════════════════
// Export registries
// ═══════════════════════════════════════════════════════════════

export const ANIMATION_16_TEMPLATES: Record<string, SpriteTemplate> = {
  knight_walk_1: KNIGHT_WALK_1,
  knight_walk_2: KNIGHT_WALK_2,
  knight_walk_3: KNIGHT_WALK_3,
  knight_walk_4: KNIGHT_WALK_4,
  mage_walk_1: MAGE_WALK_1,
  mage_walk_2: MAGE_WALK_2,
  mage_walk_3: MAGE_WALK_3,
  mage_walk_4: MAGE_WALK_4,
  rogue_walk_1: ROGUE_WALK_1,
  rogue_walk_2: ROGUE_WALK_2,
  rogue_walk_3: ROGUE_WALK_3,
  rogue_walk_4: ROGUE_WALK_4,
  villager_walk_1: VILLAGER_WALK_1,
  villager_walk_2: VILLAGER_WALK_2,
  villager_walk_3: VILLAGER_WALK_3,
  villager_walk_4: VILLAGER_WALK_4,
};

// Walk frames inherit base character color schemes
export const ANIMATION_16_COLOR_SCHEMES: Record<string, ColorScheme> = {};
