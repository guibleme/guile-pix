/**
 * Characters Variety Batch 1 — 20 NEW characters using the proven humanoid skeleton.
 *
 * RULE: Every character uses the EXACT SAME body/arms/legs/boots from humanoid16.ts.
 * Differentiation comes ONLY from: head decoration + 1-2 small accessories.
 * This ensures readability at 16x16 (chibi proportions, thin limbs, negative space).
 */

import type { SpriteTemplate, ColorScheme } from './humanoid16.js';
import {
  SKEL_HEAD, SKEL_HEAD_TOP, SKEL_HEAD_SIDES,
  SKEL_FACE, SKEL_EYES,
  SKEL_BODY, SKEL_ARMS, SKEL_ARMS_WIDE,
  SKEL_HANDS, SKEL_BELT, SKEL_HIPS, SKEL_LEGS, SKEL_BOOTS,
  SKEL_ROBE_LOWER,
} from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// 1. BARBARIAN — Horned helmet, bare arms, axe
// Identity: 2 horn spikes + wide arms + axe to right
// ═══════════════════════════════════════════════════════════════
const BARBARIAN_16: SpriteTemplate = {
  name: 'barbarian_16',
  width: 16, height: 16,
  description: '3/4 view chibi barbarian. Horned helm, bare muscular arms, battle axe.',
  regions: [
    { name: 'horns', role: 'accessory', pixels: [[5,0],[10,0]] },
    { name: 'helmet', role: 'head', pixels: SKEL_HEAD },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'body', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS_WIDE },
    { name: 'hands', role: 'hand', pixels: [[4,10],[10,10]] },
    { name: 'axe', role: 'accessory', pixels: [[12,7],[12,8],[12,9],[11,8],[13,8]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 2. WIZARD — Star-tipped hat, wand on right
// Identity: star on hat tip + tall hat + wand sparks
// ═══════════════════════════════════════════════════════════════
const WIZARD_16: SpriteTemplate = {
  name: 'wizard_mage_16',
  width: 16, height: 16,
  description: '3/4 view chibi wizard. Star-tipped hat, mystic wand with spark.',
  regions: [
    { name: 'hat_star', role: 'accessory', pixels: [[7,0],[8,0]] },
    { name: 'hat', role: 'head', pixels: [
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],
      [4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],
      [5,4],[10,4],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,4],[7,4],[8,4],[9,4],
      [5,5],[6,5],[7,5],[8,5],[9,5],[10,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6,4],[9,4]] },
    { name: 'robe', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'wand', role: 'accessory', pixels: [
      [12,6],[12,7],[12,8],[12,9],[12,10],
      [11,5],[13,5],
    ]},
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'robe_lower', role: 'leg', pixels: SKEL_ROBE_LOWER },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 3. THIEF — Bandana, mask over mouth, daggers both sides
// Identity: bandana tail + masked face + dual daggers
// ═══════════════════════════════════════════════════════════════
const THIEF_16: SpriteTemplate = {
  name: 'rogue_thief_16',
  width: 16, height: 16,
  description: '3/4 view chibi thief. Bandana with tail, face mask, dual daggers.',
  regions: [
    { name: 'bandana_tail', role: 'accessory', pixels: [[11,2],[12,3]] },
    { name: 'bandana', role: 'head', pixels: [
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],[10,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [7,6],[8,6],
      [7,7],[8,7],
    ]},
    { name: 'mask', role: 'accessory', pixels: [[6,5],[7,5],[8,5],[9,5]] },
    { name: 'eyes', role: 'eye', pixels: [[7,4],[8,4]] },
    { name: 'tunic', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'dagger_l', role: 'accessory', pixels: [[4,9],[4,10],[4,11]] },
    { name: 'dagger_r', role: 'accessory', pixels: [[11,9],[11,10],[11,11]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 4. RANGER — Feathered cap, bow left, quiver right
// Identity: feather on cap + bow arc + quiver
// ═══════════════════════════════════════════════════════════════
const RANGER_16: SpriteTemplate = {
  name: 'ranger_archer_16',
  width: 16, height: 16,
  description: '3/4 view chibi ranger. Feathered cap, longbow, and shoulder quiver.',
  regions: [
    { name: 'feather', role: 'accessory', pixels: [[10,0],[11,1]] },
    { name: 'cap', role: 'head', pixels: [
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6,4],[9,4]] },
    { name: 'tunic', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS_WIDE },
    { name: 'hands', role: 'hand', pixels: [[4,10],[10,10]] },
    { name: 'bow', role: 'accessory', pixels: [
      [2,6],[3,7],[3,8],[3,9],[2,10],
      [4,7],[4,8],[4,9],
    ]},
    { name: 'quiver', role: 'accessory', pixels: [[11,5],[12,5],[11,6],[12,6],[12,7]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 5. PALADIN — Halo above head, heavy armor, hammer right
// Identity: halo circle + wide pauldrons + hammer
// ═══════════════════════════════════════════════════════════════
const PALADIN_16: SpriteTemplate = {
  name: 'paladin_16',
  width: 16, height: 16,
  description: '3/4 view chibi paladin. Holy halo, plate armor, war hammer.',
  regions: [
    { name: 'halo', role: 'accessory', pixels: [[6,0],[7,0],[8,0],[9,0]] },
    { name: 'helmet', role: 'head', pixels: SKEL_HEAD },
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [7,6],[8,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'armor', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS_WIDE },
    { name: 'hands', role: 'hand', pixels: [[4,10],[10,10]] },
    { name: 'hammer', role: 'accessory', pixels: [
      [12,7],[13,7],[12,8],[13,8],[12,9],
    ]},
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: [
      [4,14],[5,14],[6,14],[9,14],[10,14],[11,14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 6. NINJA — Headwrap with trailing scarf, shuriken
// Identity: trailing scarf right + shuriken left
// ═══════════════════════════════════════════════════════════════
const NINJA_16: SpriteTemplate = {
  name: 'ninja_16',
  width: 16, height: 16,
  description: '3/4 view chibi ninja. Wrapped head, trailing scarf, shuriken.',
  regions: [
    { name: 'scarf_trail', role: 'accessory', pixels: [[11,2],[12,3],[13,4]] },
    { name: 'headwrap', role: 'head', pixels: [
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],[10,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [7,6],[8,6],
      [7,7],[8,7],
    ]},
    { name: 'mask', role: 'accessory', pixels: [[6,5],[7,5],[8,5],[9,5],[7,6],[8,6]] },
    { name: 'eyes', role: 'eye', pixels: [[7,4],[8,4]] },
    { name: 'gi', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'shuriken', role: 'accessory', pixels: [[3,8],[4,7],[4,9]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 7. PIRATE — Tricorn hat, eyepatch, cutlass right
// Identity: wide tricorn + eyepatch + cutlass
// ═══════════════════════════════════════════════════════════════
const PIRATE_16: SpriteTemplate = {
  name: 'pirate_16',
  width: 16, height: 16,
  description: '3/4 view chibi pirate. Tricorn hat, eyepatch, cutlass.',
  regions: [
    { name: 'hat', role: 'head', pixels: [
      [7,0],[8,0],
      [6,1],[7,1],[8,1],[9,1],
      [4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyepatch', role: 'accessory', pixels: [[9,4]] },
    { name: 'eyes', role: 'eye', pixels: [[6,4]] },
    { name: 'coat', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'cutlass', role: 'accessory', pixels: [[11,9],[12,8],[13,7]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: [
      [4,14],[5,14],[6,14],[9,14],[10,14],[11,14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 8. DWARF — Flat helmet, massive beard flowing down over body
// Identity: compact helmet + huge beard covering chest
// ═══════════════════════════════════════════════════════════════
const DWARF_16: SpriteTemplate = {
  name: 'dwarf_16',
  width: 16, height: 16,
  description: '3/4 view chibi dwarf. Flat helm, enormous beard, sturdy boots.',
  regions: [
    { name: 'helmet', role: 'head', pixels: [
      [6,1],[7,1],[8,1],[9,1],
      [5,2],[6,2],[7,2],[8,2],[9,2],[10,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
    ]},
    { name: 'beard', role: 'hair', pixels: [
      [6,5],[7,5],[8,5],[9,5],
      [5,6],[6,6],[7,6],[8,6],[9,6],[10,6],
      [6,7],[7,7],[8,7],[9,7],
      [7,8],[8,8],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6,4],[9,4]] },
    { name: 'armor', role: 'body', pixels: [
      [6,8],[9,8],
      [6,9],[7,9],[8,9],[9,9],
    ]},
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS_WIDE },
    { name: 'hands', role: 'hand', pixels: [[4,10],[10,10]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: [
      [4,14],[5,14],[6,14],[9,14],[10,14],[11,14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 9. SAMURAI — Wide kabuto crest, katana at side
// Identity: kabuto crescent on top + katana handle
// ═══════════════════════════════════════════════════════════════
const SAMURAI_16: SpriteTemplate = {
  name: 'samurai_16',
  width: 16, height: 16,
  description: '3/4 view chibi samurai. Kabuto helmet with crescent crest, katana.',
  regions: [
    { name: 'crest', role: 'accessory', pixels: [[6,0],[7,0],[8,0],[9,0]] },
    { name: 'kabuto', role: 'head', pixels: [
      [6,1],[7,1],[8,1],[9,1],
      [5,2],[6,2],[7,2],[8,2],[9,2],[10,2],
      [4,3],[5,3],[10,3],[11,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6,4],[9,4]] },
    { name: 'armor', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'katana', role: 'accessory', pixels: [
      [11,6],[11,7],[11,8],[11,9],[11,10],[11,11],
    ]},
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 10. PRIEST — Tall mitre hat, staff with cross
// Identity: pointed mitre + cross-topped staff
// ═══════════════════════════════════════════════════════════════
const PRIEST_16: SpriteTemplate = {
  name: 'priest_16',
  width: 16, height: 16,
  description: '3/4 view chibi priest. Tall mitre, holy staff, flowing vestments.',
  regions: [
    { name: 'mitre', role: 'head', pixels: [
      [8,0],
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'vestments', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'staff', role: 'accessory', pixels: [
      [12,3],[11,4],[12,4],[13,4],[12,5],
      [12,6],[12,7],[12,8],[12,9],[12,10],
    ]},
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'vestments_lower', role: 'leg', pixels: SKEL_ROBE_LOWER },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 11. FARMER — Wide straw hat, pitchfork on right
// Identity: wide flat brim hat + pitchfork
// ═══════════════════════════════════════════════════════════════
const FARMER_16: SpriteTemplate = {
  name: 'farmer_16',
  width: 16, height: 16,
  description: '3/4 view chibi farmer. Wide straw hat, overalls, pitchfork.',
  regions: [
    { name: 'hat', role: 'head', pixels: [
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],
      [3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6,4],[9,4]] },
    { name: 'overalls', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'pitchfork', role: 'accessory', pixels: [
      [12,4],[13,4],[14,4],
      [13,5],[13,6],[13,7],[13,8],[13,9],[13,10],
    ]},
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 12. WITCH — Crooked hat, broom on left
// Identity: bent hat tip + broom handle
// ═══════════════════════════════════════════════════════════════
const WITCH_16: SpriteTemplate = {
  name: 'witch_16',
  width: 16, height: 16,
  description: '3/4 view chibi witch. Crooked pointy hat, broomstick, dark robes.',
  regions: [
    { name: 'hat', role: 'head', pixels: [
      [9,0],
      [8,1],[9,1],
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],
      [4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6,4],[9,4]] },
    { name: 'robe', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'broom', role: 'accessory', pixels: [
      [3,6],[3,7],[3,8],[3,9],[3,10],[3,11],
      [2,12],[3,12],[4,12],
    ]},
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'robe_lower', role: 'leg', pixels: SKEL_ROBE_LOWER },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 13. CHEF — Tall white toque, frying pan right
// Identity: tall cylinder toque + frying pan
// ═══════════════════════════════════════════════════════════════
const CHEF_16: SpriteTemplate = {
  name: 'chef_16',
  width: 16, height: 16,
  description: '3/4 view chibi chef. Tall toque blanche, frying pan, apron.',
  regions: [
    { name: 'toque', role: 'head', pixels: [
      [6,0],[7,0],[8,0],[9,0],
      [6,1],[7,1],[8,1],[9,1],
      [6,2],[7,2],[8,2],[9,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'apron', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'pan', role: 'accessory', pixels: [
      [12,8],[13,8],[12,9],[13,9],[11,10],
    ]},
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 14. MERCHANT — Turban, money bag on belt
// Identity: round turban + money bag accessory
// ═══════════════════════════════════════════════════════════════
const MERCHANT_16: SpriteTemplate = {
  name: 'merchant_16',
  width: 16, height: 16,
  description: '3/4 view chibi merchant. Turban, fine robes, coin pouch.',
  regions: [
    { name: 'turban', role: 'head', pixels: [
      [7,0],[8,0],
      [6,1],[7,1],[8,1],[9,1],
      [5,2],[6,2],[7,2],[8,2],[9,2],[10,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'jewel', role: 'accessory', pixels: [[7,1]] },
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'robe', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'coinbag', role: 'accessory', pixels: [[11,10],[12,10],[11,11],[12,11]] },
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'robe_lower', role: 'leg', pixels: SKEL_ROBE_LOWER },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 15. NECROMANCER — Skull on hood, floating orbs
// Identity: skull on forehead + dark orbs floating
// ═══════════════════════════════════════════════════════════════
const NECROMANCER_16: SpriteTemplate = {
  name: 'necromancer_16',
  width: 16, height: 16,
  description: '3/4 view chibi necromancer. Skull-marked hood, dark robes, floating orbs.',
  regions: [
    { name: 'hood', role: 'head', pixels: [
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'skull_mark', role: 'accessory', pixels: [[7,2],[8,2]] },
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [7,6],[8,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[7,4],[8,4]] },
    { name: 'robe', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'orbs', role: 'accessory', pixels: [[3,7],[12,7],[2,10],[13,10]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'robe_lower', role: 'leg', pixels: SKEL_ROBE_LOWER },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 16. VIKING — Winged helmet, round shield left, sword right
// Identity: wing-horned helm + round shield + sword
// ═══════════════════════════════════════════════════════════════
const VIKING_16: SpriteTemplate = {
  name: 'viking_16',
  width: 16, height: 16,
  description: '3/4 view chibi viking. Winged helmet, round shield, broadsword.',
  regions: [
    { name: 'wings', role: 'accessory', pixels: [[4,0],[11,0],[4,1],[11,1]] },
    { name: 'helmet', role: 'head', pixels: [
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'armor', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS_WIDE },
    { name: 'hands', role: 'hand', pixels: [[4,10],[10,10]] },
    { name: 'shield', role: 'accessory', pixels: [
      [2,8],[3,8],[2,9],[3,9],[3,10],
    ]},
    { name: 'sword', role: 'accessory', pixels: [[11,8],[11,9],[11,10],[11,11]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: [
      [4,14],[5,14],[6,14],[9,14],[10,14],[11,14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 17. MONK — Bald head, prayer beads, bare feet
// Identity: bald round head + prayer beads on neck
// ═══════════════════════════════════════════════════════════════
const MONK_16: SpriteTemplate = {
  name: 'monk_16',
  width: 16, height: 16,
  description: '3/4 view chibi monk. Bald head, prayer beads, simple robes, bare feet.',
  regions: [
    { name: 'head', role: 'head', pixels: SKEL_HEAD },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'beads', role: 'accessory', pixels: [
      [6,7],[7,7],[8,7],[9,7],
    ]},
    { name: 'robe', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'robe_lower', role: 'leg', pixels: SKEL_ROBE_LOWER },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 18. PRINCESS — Crown with gems, flowing dress
// Identity: 3-point crown + robe dress
// ═══════════════════════════════════════════════════════════════
const PRINCESS_16: SpriteTemplate = {
  name: 'princess_16',
  width: 16, height: 16,
  description: '3/4 view chibi princess. Gem crown, elegant dress, gentle pose.',
  regions: [
    { name: 'crown', role: 'accessory', pixels: [
      [6,0],[8,0],[10,0],
      [6,1],[7,1],[8,1],[9,1],[10,1],
    ]},
    { name: 'hair', role: 'hair', pixels: [
      [5,2],[6,2],[9,2],[10,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
      [5,6],[10,6],
      [5,7],[10,7],
    ]},
    { name: 'face', role: 'face', pixels: [
      [7,2],[8,2],
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6,4],[9,4]] },
    { name: 'dress_top', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'dress_skirt', role: 'leg', pixels: SKEL_ROBE_LOWER },
    { name: 'slippers', role: 'boot', pixels: [[5,14],[6,14],[9,14],[10,14]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 19. ROBOT — Antenna on head, boxy helmet, visor
// Identity: antenna spike + square-ish head + metal colors
// ═══════════════════════════════════════════════════════════════
const ROBOT_16: SpriteTemplate = {
  name: 'robot_npc_16',
  width: 16, height: 16,
  description: '3/4 view chibi robot NPC. Antenna, visor slit, mechanical limbs.',
  regions: [
    { name: 'antenna', role: 'accessory', pixels: [[8,0],[8,1]] },
    { name: 'head', role: 'head', pixels: [
      [6,2],[7,2],[8,2],[9,2],
      [5,3],[6,3],[7,3],[8,3],[9,3],[10,3],
      [5,4],[10,4],
      [5,5],[6,5],[7,5],[8,5],[9,5],[10,5],
    ]},
    { name: 'visor', role: 'face', pixels: [
      [6,4],[7,4],[8,4],[9,4],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6,4],[9,4]] },
    { name: 'chassis', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 20. GUNSLINGER — Cowboy hat, poncho drape, pistol right
// Identity: wide-brim cowboy hat + poncho + pistol
// ═══════════════════════════════════════════════════════════════
const GUNSLINGER_16: SpriteTemplate = {
  name: 'gunslinger_16',
  width: 16, height: 16,
  description: '3/4 view chibi gunslinger. Cowboy hat, poncho, revolver.',
  regions: [
    { name: 'hat', role: 'head', pixels: [
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],
      [3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6,4],[9,4]] },
    { name: 'poncho', role: 'body', pixels: [
      ...SKEL_BODY,
      [4,8],[5,8],[10,8],[11,8],
      [4,9],[11,9],
    ]},
    { name: 'arms', role: 'arm', pixels: [
      [5,9],[10,9],
    ]},
    { name: 'hands', role: 'hand', pixels: [[5,10],[10,10]] },
    { name: 'pistol', role: 'accessory', pixels: [[11,10],[12,10]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: [
      [4,14],[5,14],[6,14],[9,14],[10,14],[11,14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// COLOR SCHEMES — DB16, cool shadows, warm highlights
// ═══════════════════════════════════════════════════════════════

const SKIN = { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' };
const BLACK_EYES = { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' };

const BARBARIAN_COLORS: ColorScheme = {
  name: 'barbarian_default', mapping: {
    head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    face: SKIN, eye: BLACK_EYES, body: SKIN, arm: SKIN, hand: SKIN,
    belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  },
};

const WIZARD_COLORS: ColorScheme = {
  name: 'wizard_mage_default', mapping: {
    head: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
    arm: { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
    belt: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    leg: { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  },
};

const THIEF_COLORS: ColorScheme = {
  name: 'rogue_thief_default', mapping: {
    head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    arm: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    boot: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  },
};

const RANGER_COLORS: ColorScheme = {
  name: 'ranger_archer_default', mapping: {
    head: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    arm: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  },
};

const PALADIN_COLORS: ColorScheme = {
  name: 'paladin_default', mapping: {
    head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    arm: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    belt: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
    leg: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  },
};

const NINJA_COLORS: ColorScheme = {
  name: 'ninja_default', mapping: {
    head: { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
    arm: { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
    belt: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    leg: { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
    boot: { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
    accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  },
};

const PIRATE_COLORS: ColorScheme = {
  name: 'pirate_default', mapping: {
    head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    arm: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    boot: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
    accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  },
};

const DWARF_COLORS: ColorScheme = {
  name: 'dwarf_default', mapping: {
    hair: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    arm: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

const SAMURAI_COLORS: ColorScheme = {
  name: 'samurai_default', mapping: {
    head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    arm: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    boot: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  },
};

const PRIEST_COLORS: ColorScheme = {
  name: 'priest_default', mapping: {
    head: { shadow: '#757161', base: '#deeed6', highlight: '#deeed6' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    arm: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    belt: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
    leg: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  },
};

const FARMER_COLORS: ColorScheme = {
  name: 'farmer_default', mapping: {
    head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
    arm: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
    belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
    boot: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  },
};

const WITCH_COLORS: ColorScheme = {
  name: 'witch_default', mapping: {
    head: { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },
    arm: { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },
    belt: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    leg: { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  },
};

const CHEF_COLORS: ColorScheme = {
  name: 'chef_default', mapping: {
    head: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    arm: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    boot: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  },
};

const MERCHANT_COLORS: ColorScheme = {
  name: 'merchant_default', mapping: {
    head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    arm: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    belt: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
    leg: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  },
};

const NECROMANCER_COLORS: ColorScheme = {
  name: 'necromancer_default', mapping: {
    head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    arm: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    belt: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
    leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  },
};

const VIKING_COLORS: ColorScheme = {
  name: 'viking_default', mapping: {
    head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    arm: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    leg: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  },
};

const MONK_COLORS: ColorScheme = {
  name: 'monk_default', mapping: {
    head: SKIN, face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    arm: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  },
};

const PRINCESS_COLORS: ColorScheme = {
  name: 'princess_default', mapping: {
    hair: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    arm: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    belt: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
    leg: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    boot: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  },
};

const ROBOT_COLORS: ColorScheme = {
  name: 'robot_npc_default', mapping: {
    head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    face: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
    eye: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
    body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    arm: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    hand: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    belt: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    leg: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  },
};

const GUNSLINGER_COLORS: ColorScheme = {
  name: 'gunslinger_default', mapping: {
    head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    face: SKIN, eye: BLACK_EYES, hand: SKIN,
    body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    arm: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    leg: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
    boot: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  },
};


// ═══════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════

export const CHARACTER_BATCH1_TEMPLATES: Record<string, SpriteTemplate> = {
  barbarian_16: BARBARIAN_16,
  wizard_mage_16: WIZARD_16,
  rogue_thief_16: THIEF_16,
  ranger_archer_16: RANGER_16,
  paladin_16: PALADIN_16,
  ninja_16: NINJA_16,
  pirate_16: PIRATE_16,
  dwarf_16: DWARF_16,
  samurai_16: SAMURAI_16,
  priest_16: PRIEST_16,
  farmer_16: FARMER_16,
  witch_16: WITCH_16,
  chef_16: CHEF_16,
  merchant_16: MERCHANT_16,
  necromancer_16: NECROMANCER_16,
  viking_16: VIKING_16,
  monk_16: MONK_16,
  princess_16: PRINCESS_16,
  robot_npc_16: ROBOT_16,
  gunslinger_16: GUNSLINGER_16,
};

export const CHARACTER_BATCH1_COLOR_SCHEMES: Record<string, ColorScheme> = {
  barbarian_default: BARBARIAN_COLORS,
  wizard_mage_default: WIZARD_COLORS,
  rogue_thief_default: THIEF_COLORS,
  ranger_archer_default: RANGER_COLORS,
  paladin_default: PALADIN_COLORS,
  ninja_default: NINJA_COLORS,
  pirate_default: PIRATE_COLORS,
  dwarf_default: DWARF_COLORS,
  samurai_default: SAMURAI_COLORS,
  priest_default: PRIEST_COLORS,
  farmer_default: FARMER_COLORS,
  witch_default: WITCH_COLORS,
  chef_default: CHEF_COLORS,
  merchant_default: MERCHANT_COLORS,
  necromancer_default: NECROMANCER_COLORS,
  viking_default: VIKING_COLORS,
  monk_default: MONK_COLORS,
  princess_default: PRINCESS_COLORS,
  robot_npc_default: ROBOT_COLORS,
  gunslinger_default: GUNSLINGER_COLORS,
};
