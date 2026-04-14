/**
 * 16x16 NPC templates aligned to the shared 3/4 humanoid skeleton.
 *
 * Goal: town cast that reads clearly in one tile while staying animation-ready
 * with the same proportions used by humanoid16 and character variants.
 */

import {
  SpriteRegion,
  SpriteTemplate,
  ColorScheme,
  SKEL_HEAD,
  SKEL_HEAD_TOP,
  SKEL_HEAD_SIDES,
  SKEL_FACE,
  SKEL_EYES,
  SKEL_BODY,
  SKEL_ARMS,
  SKEL_ARMS_WIDE,
  SKEL_HANDS,
  SKEL_BELT,
  SKEL_HIPS,
  SKEL_LEGS,
  SKEL_BOOTS,
  SKEL_ROBE_LOWER,
} from './humanoid16.js';

type Role = SpriteRegion['role'];
type Tone = { shadow: string; base: string; highlight: string };

const BASE_LEGS: [number, number][] = [...SKEL_HIPS, ...SKEL_LEGS];

const BASE_MAPPING: Record<Role, Tone> = {
  hair: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  face: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  eye: { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },
  body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  hand: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg: { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
  boot: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  accent: { shadow: '#442434', base: '#d04648', highlight: '#d2aa99' },
  trim: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
};

function scheme(name: string, overrides: Partial<Record<Role, Tone>>): ColorScheme {
  return { name, mapping: { ...BASE_MAPPING, ...overrides } };
}

export const SHOPKEEPER_16: SpriteTemplate = {
  name: 'shopkeeper_16',
  width: 16,
  height: 16,
  description: 'Friendly merchant with balding crown, apron, and thick mustache.',
  regions: [
    { name: 'scalp', role: 'head', pixels: [...SKEL_HEAD_TOP, [6, 2], [7, 2], [8, 2], [9, 2], [5, 3], [10, 3]] },
    { name: 'side_hair', role: 'hair', pixels: [[5, 2], [10, 2], [5, 3], [10, 3], [5, 4], [10, 4], [5, 5], [10, 5]] },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'shirt', role: 'body', pixels: [...SKEL_BODY, [5, 8], [10, 8], [5, 9], [10, 9]] },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS_WIDE },
    { name: 'hands', role: 'hand', pixels: [[4, 10], [5, 10], [10, 10], [11, 10]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: BASE_LEGS },
    { name: 'boots', role: 'boot', pixels: [[4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14]] },
    { name: 'mustache_apron', role: 'accessory', pixels: [
      [7, 6], [8, 6],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [5, 9], [10, 9],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
  ],
};

export const VILLAGER_16: SpriteTemplate = {
  name: 'villager_16',
  width: 16,
  height: 16,
  description: 'Simple villager with broad straw hat and neutral peasant clothing.',
  regions: [
    { name: 'hat', role: 'accessory', pixels: [
      [7, 0], [8, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
    ]},
    { name: 'head', role: 'head', pixels: SKEL_HEAD_SIDES },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'body', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: BASE_LEGS },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
  ],
};

export const GUARD_16: SpriteTemplate = {
  name: 'guard_16',
  width: 16,
  height: 16,
  description: 'Town guard with open helmet, upright spear, and disciplined stance.',
  regions: [
    { name: 'helmet', role: 'head', pixels: [...SKEL_HEAD_TOP, ...SKEL_HEAD_SIDES, [6, 5], [9, 5]] },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'body', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: BASE_LEGS },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
    { name: 'crest_and_spear', role: 'accessory', pixels: [
      [7, 0], [8, 0],
      [13, 0],
      [13, 1], [13, 2], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7],
      [13, 8], [13, 9], [13, 10], [13, 11], [13, 12], [13, 13], [13, 14], [13, 15],
    ]},
  ],
};

export const BLACKSMITH_16: SpriteTemplate = {
  name: 'blacksmith_16',
  width: 16,
  height: 16,
  description: 'Blacksmith with headband, broad arms, apron chest, and side hammer.',
  regions: [
    { name: 'head', role: 'head', pixels: SKEL_HEAD },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'body', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS_WIDE },
    { name: 'hands', role: 'hand', pixels: [[4, 10], [11, 10]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: BASE_LEGS },
    { name: 'boots', role: 'boot', pixels: [[4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14]] },
    { name: 'headband_apron_hammer', role: 'accessory', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [7, 11], [8, 11],
      [12, 7], [13, 7], [12, 8], [13, 8], [12, 9],
    ]},
  ],
};

export const PRIEST_16: SpriteTemplate = {
  name: 'priest_16',
  width: 16,
  height: 16,
  description: 'Priest with mitre hat, robe flare, and clasped prayer pose.',
  regions: [
    { name: 'mitre', role: 'accessory', pixels: [[7, 0], [8, 0], [6, 1], [7, 1], [8, 1], [9, 1]] },
    { name: 'head', role: 'head', pixels: SKEL_HEAD },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'robe_upper', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: [[7, 10], [8, 10]] },
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'robe_lower', role: 'leg', pixels: SKEL_ROBE_LOWER },
    { name: 'boots', role: 'boot', pixels: [[5, 14], [6, 14], [9, 14], [10, 14]] },
    { name: 'holy_symbol', role: 'accessory', pixels: [[7, 8], [8, 8]] },
  ],
};

export const TOWN_BARD_16: SpriteTemplate = {
  name: 'town_bard_16',
  width: 16,
  height: 16,
  description: 'Town minstrel with feather cap, compact lute, and bright layered tunic.',
  regions: [
    { name: 'cap', role: 'hair', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
    ]},
    { name: 'head', role: 'head', pixels: SKEL_HEAD_SIDES },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'body', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: BASE_LEGS },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
    { name: 'feather_lute', role: 'accessory', pixels: [
      [10, 0], [11, 0], [10, 1],
      [11, 6], [12, 6], [11, 7], [12, 7], [12, 8], [11, 9], [12, 9],
      [4, 8], [3, 9], [3, 10],
    ]},
  ],
};

export const THIEF_16: SpriteTemplate = {
  name: 'thief_16',
  width: 16,
  height: 16,
  description: 'Stealth thief with deep hood, face wrap, dagger, and trailing cloak edge.',
  regions: [
    { name: 'hood', role: 'head', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [10, 3],
      [5, 4], [10, 4],
      [5, 5], [10, 5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[7, 4], [8, 4]] },
    { name: 'cloak_body', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: BASE_LEGS },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
    { name: 'mask_dagger_cape', role: 'accessory', pixels: [
      [7, 6], [8, 6],
      [4, 9], [4, 10], [4, 11],
      [11, 7], [12, 8], [12, 9], [11, 10],
    ]},
  ],
};

export const PRINCESS_16: SpriteTemplate = {
  name: 'princess_16',
  width: 16,
  height: 16,
  description: 'Princess with tiara, long hair framing the face, and elegant robe skirt.',
  regions: [
    { name: 'tiara', role: 'accessory', pixels: [[6, 0], [8, 0], [10, 0]] },
    { name: 'hair', role: 'hair', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [9, 2], [10, 2],
      [5, 3], [10, 3],
      [5, 4], [10, 4],
      [5, 5], [10, 5],
      [6, 6], [9, 6],
    ]},
    { name: 'head', role: 'head', pixels: SKEL_HEAD_SIDES },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'bodice', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'gown', role: 'leg', pixels: [...SKEL_ROBE_LOWER, [4, 13], [11, 13]] },
    { name: 'hem', role: 'boot', pixels: [[4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15]] },
    { name: 'pendant', role: 'accessory', pixels: [[7, 8], [8, 8]] },
  ],
};

export const KING_16: SpriteTemplate = {
  name: 'king_16',
  width: 16,
  height: 16,
  description: 'King with ornate crown, trimmed beard, royal mantle, and ceremonial scepter.',
  regions: [
    { name: 'crown', role: 'accessory', pixels: [[5, 0], [7, 0], [8, 0], [10, 0], [6, 1], [7, 1], [8, 1], [9, 1]] },
    { name: 'head', role: 'head', pixels: SKEL_HEAD },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'beard', role: 'hair', pixels: [[7, 6], [8, 6], [7, 7], [8, 7]] },
    { name: 'robe_upper', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'royal_belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'robe_lower', role: 'leg', pixels: [
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [6, 13], [9, 13],
    ]},
    { name: 'hem', role: 'boot', pixels: SKEL_BOOTS },
    { name: 'scepter_and_fur', role: 'accessory', pixels: [
      [1, 2], [2, 2],
      [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13], [2, 14],
      [5, 8], [10, 8],
      [4, 11], [11, 11], [5, 12], [10, 12],
    ]},
  ],
};

export const OLD_SAGE_16: SpriteTemplate = {
  name: 'old_sage_16',
  width: 16,
  height: 16,
  description: 'Old sage with pointed hat, long beard, and walking staff support.',
  regions: [
    { name: 'hat', role: 'head', pixels: [
      [8, 0],
      [7, 1], [8, 1], [9, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [9, 3], [10, 3],
      [5, 4], [10, 4],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[7, 4], [8, 4]] },
    { name: 'beard', role: 'hair', pixels: [
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
    ]},
    { name: 'robe_upper', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'robe_lower', role: 'leg', pixels: [
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
      [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
    ]},
    { name: 'boots', role: 'boot', pixels: [[5, 14], [6, 14], [9, 14], [10, 14]] },
    { name: 'staff', role: 'accessory', pixels: [[3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [3, 11], [3, 12], [3, 13], [3, 14], [3, 15]] },
  ],
};

export const SHOPKEEPER_COLORS: ColorScheme = scheme('shopkeeper_default', {
  hair: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  head: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  face: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  arm: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
});

export const VILLAGER_COLORS: ColorScheme = scheme('villager_default', {
  body: { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
  arm: { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
  leg: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
});

export const GUARD_COLORS: ColorScheme = scheme('guard_default', {
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  leg: { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
});

export const BLACKSMITH_COLORS: ColorScheme = scheme('blacksmith_default', {
  body: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  arm: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  hand: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  leg: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
});

export const PRIEST_COLORS: ColorScheme = scheme('priest_default', {
  hair: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  head: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  body: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  arm: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  leg: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
});

export const TOWN_BARD_COLORS: ColorScheme = scheme('town_bard_default', {
  hair: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  head: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt: { shadow: '#346524', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
});

export const THIEF_COLORS: ColorScheme = scheme('thief_default', {
  hair: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  arm: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  boot: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
});

export const PRINCESS_COLORS: ColorScheme = scheme('princess_default', {
  hair: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  head: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  leg: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  boot: { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
});

export const KING_COLORS: ColorScheme = scheme('king_default', {
  hair: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  arm: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  leg: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  boot: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  belt: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
});

export const OLD_SAGE_COLORS: ColorScheme = scheme('old_sage_default', {
  hair: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  leg: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
});

export const NPC_TEMPLATES: Record<string, SpriteTemplate> = {
  shopkeeper_16: SHOPKEEPER_16,
  villager_16: VILLAGER_16,
  guard_16: GUARD_16,
  blacksmith_16: BLACKSMITH_16,
  priest_16: PRIEST_16,
  town_bard_16: TOWN_BARD_16,
  thief_16: THIEF_16,
  princess_16: PRINCESS_16,
  king_16: KING_16,
  old_sage_16: OLD_SAGE_16,
};

export const NPC_COLOR_SCHEMES: Record<string, ColorScheme> = {
  shopkeeper_default: SHOPKEEPER_COLORS,
  villager_default: VILLAGER_COLORS,
  guard_default: GUARD_COLORS,
  blacksmith_default: BLACKSMITH_COLORS,
  priest_default: PRIEST_COLORS,
  town_bard_default: TOWN_BARD_COLORS,
  thief_default: THIEF_COLORS,
  princess_default: PRINCESS_COLORS,
  king_default: KING_COLORS,
  old_sage_default: OLD_SAGE_COLORS,
};
