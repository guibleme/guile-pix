/**
 * 16x16 character variants in 3/4 RPG view (Earthbound/Stardew style).
 *
 * This file intentionally reuses the humanoid16 skeleton so every variant
 * keeps consistent proportions and animation friendliness.
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

const EYE_BLACK: Tone = { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' };

const BASE_MAPPING: Record<Role, Tone> = {
  hair: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  face: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  eye: EYE_BLACK,
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

export const BARBARIAN_16: SpriteTemplate = {
  name: 'barbarian_16',
  width: 16,
  height: 16,
  description: '3/4 barbarian with wild mane, bare chest, heavy forearms, and fur belt.',
  regions: [
    { name: 'hair', role: 'hair', pixels: [
      [6, 0], [8, 0],
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [5, 2], [6, 2], [9, 2], [10, 2],
      [4, 3], [5, 3], [10, 3], [11, 3],
    ]},
    { name: 'head', role: 'head', pixels: [...SKEL_HEAD_TOP, ...SKEL_HEAD_SIDES] },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'torso', role: 'body', pixels: [...SKEL_BODY, [6, 10], [7, 10], [8, 10], [9, 10]] },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS_WIDE },
    { name: 'hands', role: 'hand', pixels: [[4, 10], [5, 10], [10, 10], [11, 10]] },
    { name: 'fur_belt', role: 'belt', pixels: [[5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11]] },
    { name: 'legs', role: 'leg', pixels: [...BASE_LEGS, [5, 12], [10, 12]] },
    { name: 'boots', role: 'boot', pixels: [[4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14]] },
    { name: 'wristbands', role: 'accessory', pixels: [[4, 9], [11, 9]] },
  ],
};

export const PALADIN_16: SpriteTemplate = {
  name: 'paladin_16',
  width: 16,
  height: 16,
  description: '3/4 paladin with holy crest, plate armor, left cape drape, and right shield.',
  regions: [
    { name: 'helm_mark', role: 'accessory', pixels: [[7, 0], [8, 0], [7, 2], [8, 2]] },
    { name: 'helmet', role: 'head', pixels: [...SKEL_HEAD_TOP, ...SKEL_HEAD_SIDES, [6, 5], [9, 5]] },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'armor', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS_WIDE },
    { name: 'hands', role: 'hand', pixels: [[4, 10], [11, 10]] },
    { name: 'gold_belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: BASE_LEGS },
    { name: 'boots', role: 'boot', pixels: [[4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14]] },
    { name: 'cape_and_shield', role: 'accessory', pixels: [
      [3, 7], [2, 8], [2, 9], [2, 10], [2, 11], [3, 12],
      [11, 9], [12, 9], [11, 10], [12, 10], [12, 11],
    ]},
  ],
};

export const NECROMANCER_16: SpriteTemplate = {
  name: 'necromancer_16',
  width: 16,
  height: 16,
  description: '3/4 necromancer with severe cowl, hollow stare, and drifting ritual robe.',
  regions: [
    { name: 'cowl', role: 'head', pixels: [
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
    { name: 'robe_upper', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'robe_lower', role: 'leg', pixels: SKEL_ROBE_LOWER },
    { name: 'boots', role: 'boot', pixels: [[5, 14], [6, 14], [9, 14], [10, 14]] },
    { name: 'pendant_mist', role: 'accessory', pixels: [[7, 9], [8, 9], [6, 12], [9, 12]] },
  ],
};

export const BARD_16: SpriteTemplate = {
  name: 'bard_16',
  width: 16,
  height: 16,
  description: '3/4 bard with feathered cap, hanging lute, and light traveling mantle.',
  regions: [
    { name: 'plume', role: 'accessory', pixels: [[10, 0], [11, 0], [10, 1]] },
    { name: 'cap', role: 'hair', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
    ]},
    { name: 'head', role: 'head', pixels: SKEL_HEAD_SIDES },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'tunic', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: BASE_LEGS },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
    { name: 'lute_and_cape', role: 'accessory', pixels: [
      [11, 6], [12, 6], [11, 7], [12, 7], [12, 8], [11, 9], [12, 9],
      [4, 8], [4, 9], [4, 10],
    ]},
  ],
};

export const MONK_16: SpriteTemplate = {
  name: 'monk_16',
  width: 16,
  height: 16,
  description: '3/4 monk with shaved head, wrapped fists, and grounded combat posture.',
  regions: [
    { name: 'head', role: 'head', pixels: [...SKEL_HEAD, [7, 0], [8, 0]] },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'robe_upper', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: [
      [4, 8], [5, 8], [10, 8], [11, 8],
      [4, 9], [5, 9], [10, 9], [11, 9],
    ]},
    { name: 'hands', role: 'hand', pixels: [[3, 10], [4, 10], [11, 10], [12, 10]] },
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'pants', role: 'leg', pixels: BASE_LEGS },
    { name: 'sandals', role: 'boot', pixels: SKEL_BOOTS },
    { name: 'wraps', role: 'accessory', pixels: [[3, 10], [12, 10], [7, 11]] },
  ],
};

export const ELF_16: SpriteTemplate = {
  name: 'elf_16',
  width: 16,
  height: 16,
  description: '3/4 elf with circlet, pointed ears, and a light asymmetrical cloak.',
  regions: [
    { name: 'circlet', role: 'accessory', pixels: [[7, 0], [8, 0], [6, 1], [9, 1]] },
    { name: 'hair', role: 'hair', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [10, 3],
      [5, 4], [10, 4],
    ]},
    { name: 'ears', role: 'head', pixels: [...SKEL_HEAD_SIDES, [4, 4], [11, 4]] },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'tunic', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: BASE_LEGS },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
    { name: 'cloak', role: 'accessory', pixels: [[11, 7], [12, 8], [12, 9], [11, 10], [11, 11]] },
  ],
};

export const DWARF_16: SpriteTemplate = {
  name: 'dwarf_16',
  width: 16,
  height: 16,
  description: '3/4 dwarf with horned helm, stout beard block, and compact heavy stance.',
  regions: [
    { name: 'horns', role: 'accessory', pixels: [[4, 1], [11, 1], [4, 2], [11, 2]] },
    { name: 'helmet', role: 'head', pixels: [
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [10, 3],
      [5, 4], [10, 4],
      [5, 5], [10, 5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'beard', role: 'hair', pixels: [
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    { name: 'armor', role: 'body', pixels: [...SKEL_BODY, [5, 9], [10, 9]] },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS_WIDE },
    { name: 'hands', role: 'hand', pixels: [[4, 10], [11, 10]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...BASE_LEGS, [5, 12], [10, 12]] },
    { name: 'boots', role: 'boot', pixels: [[4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14]] },
  ],
};

export const ORC_BRUTE_16: SpriteTemplate = {
  name: 'orc_brute_16',
  width: 16,
  height: 16,
  description: '3/4 orc brute with tusks, brutal paint marks, and blocky shoulder armor.',
  regions: [
    { name: 'head', role: 'head', pixels: [
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [9, 3], [10, 3],
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
    { name: 'armor', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS_WIDE },
    { name: 'hands', role: 'hand', pixels: [[4, 10], [11, 10]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...BASE_LEGS, [5, 12], [10, 12]] },
    { name: 'boots', role: 'boot', pixels: [[4, 14], [5, 14], [6, 14], [9, 14], [10, 14], [11, 14]] },
    { name: 'warpaint_tusks_spikes', role: 'accessory', pixels: [
      [6, 0], [9, 0],
      [6, 5], [9, 5],
      [6, 7], [9, 7],
      [4, 8], [11, 8],
    ]},
  ],
};

export const BARBARIAN_COLORS: ColorScheme = scheme('barbarian_default', {
  hair: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  body: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  arm: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  hand: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const PALADIN_COLORS: ColorScheme = scheme('paladin_default', {
  head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  arm: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  hand: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  belt: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  leg: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
});

export const NECROMANCER_COLORS: ColorScheme = scheme('necromancer_default', {
  head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  face: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  arm: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  boot: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory: { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
});

export const BARD_COLORS: ColorScheme = scheme('bard_default', {
  hair: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  head: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt: { shadow: '#346524', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
});

export const MONK_COLORS: ColorScheme = scheme('monk_default', {
  head: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  body: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  arm: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  hand: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  belt: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  leg: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
});

export const ELF_COLORS: ColorScheme = scheme('elf_default', {
  hair: { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
  head: { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
  body: { shadow: '#346524', base: '#597dce', highlight: '#6dc2ca' },
  arm: { shadow: '#346524', base: '#597dce', highlight: '#6dc2ca' },
  belt: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
});

export const DWARF_COLORS: ColorScheme = scheme('dwarf_default', {
  hair: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  arm: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  leg: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
});

export const ORC_BRUTE_COLORS: ColorScheme = scheme('orc_brute_default', {
  head: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
  face: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
  body: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  arm: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
  hand: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
});

export const CHARACTER_VARIANT_TEMPLATES: Record<string, SpriteTemplate> = {
  barbarian_16: BARBARIAN_16,
  paladin_16: PALADIN_16,
  necromancer_16: NECROMANCER_16,
  bard_16: BARD_16,
  monk_16: MONK_16,
  elf_16: ELF_16,
  dwarf_16: DWARF_16,
  orc_brute_16: ORC_BRUTE_16,
};

export const CHARACTER_VARIANT_COLOR_SCHEMES: Record<string, ColorScheme> = {
  barbarian_default: BARBARIAN_COLORS,
  paladin_default: PALADIN_COLORS,
  necromancer_default: NECROMANCER_COLORS,
  bard_default: BARD_COLORS,
  monk_default: MONK_COLORS,
  elf_default: ELF_COLORS,
  dwarf_default: DWARF_COLORS,
  orc_brute_default: ORC_BRUTE_COLORS,
};
