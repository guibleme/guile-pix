import { SpriteTemplate, ColorScheme } from './humanoid16.js';

type Tone = { shadow: string; base: string; highlight: string };

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

const WOOD: Tone = { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' };
const WOOD_LIGHT: Tone = { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' };
const METAL: Tone = { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' };
const IRON: Tone = { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' };
const LEATHER: Tone = { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' };
const GOLD: Tone = { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' };
const CLOTH: Tone = { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' };
const GREEN: Tone = { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' };
const RED: Tone = { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' };
const FIRE: Tone = { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' };
const PAPER: Tone = { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' };

const BASE_MAPPING = {
  hair: WOOD,
  head: METAL,
  face: PAPER,
  eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  body: WOOD,
  arm: IRON,
  hand: LEATHER,
  belt: LEATHER,
  leg: CLOTH,
  boot: IRON,
  accessory: GOLD,
};

function makeScheme(name: string, overrides: Partial<typeof BASE_MAPPING>): ColorScheme {
  return { name, mapping: { ...BASE_MAPPING, ...overrides } };
}

export const WOODEN_CHAIR_16: SpriteTemplate = {
  name: 'wooden_chair_16', width: 16, height: 16,
  description: 'Simple wooden chair with backrest slats and padded seat.',
  regions: [
    { name: 'backrest', role: 'head', pixels: [...rect(5, 2, 9, 4)] },
    { name: 'seat', role: 'body', pixels: [...rect(4, 5, 10, 6)] },
    { name: 'legs', role: 'belt', pixels: [[4, 7], [5, 7], [9, 7], [10, 7], [4, 8], [10, 8]] },
    { name: 'cushion', role: 'accessory', pixels: [[5, 5], [6, 5], [7, 5], [8, 5], [9, 5]] },
    { name: 'shine', role: 'eye', pixels: [[6, 3], [7, 3]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(9, 3, 11)] },
  ],
};

export const ROUND_TABLE_16: SpriteTemplate = {
  name: 'round_table_16', width: 16, height: 16,
  description: 'Round tavern table with cloth top and central leg.',
  regions: [
    { name: 'table_top', role: 'head', pixels: [...hLine(3, 5, 10), ...hLine(4, 4, 11), ...hLine(5, 4, 11)] },
    { name: 'cloth', role: 'body', pixels: [...hLine(6, 5, 10)] },
    { name: 'decor', role: 'accessory', pixels: [[7, 4], [8, 4]] },
    { name: 'leg', role: 'belt', pixels: [...vLine(7, 6, 9), ...vLine(8, 6, 9)] },
    { name: 'glint', role: 'eye', pixels: [[6, 4]] },
    { name: 'base_shadow', role: 'boot', pixels: [...hLine(10, 5, 10)] },
  ],
};

export const COZY_LANTERN_16: SpriteTemplate = {
  name: 'cozy_lantern_16', width: 16, height: 16,
  description: 'Portable lantern with warm core and loop handle.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...hLine(4, 6, 9), ...vLine(6, 5, 11), ...vLine(9, 5, 11), ...hLine(11, 6, 9)] },
    { name: 'glass', role: 'body', pixels: [...rect(7, 6, 8, 10)] },
    { name: 'flame', role: 'accessory', pixels: [[7, 7], [8, 7], [7, 8], [8, 8]] },
    { name: 'core', role: 'eye', pixels: [[7, 8]] },
    { name: 'handle', role: 'arm', pixels: [[7, 2], [8, 2], [6, 3], [9, 3]] },
    { name: 'foot', role: 'boot', pixels: [...hLine(12, 6, 9)] },
  ],
};

export const PICNIC_BASKET_16: SpriteTemplate = {
  name: 'picnic_basket_16', width: 16, height: 16,
  description: 'Woven picnic basket with clasp and curved handle.',
  regions: [
    { name: 'lid', role: 'head', pixels: [...hLine(4, 4, 11), ...hLine(5, 4, 11)] },
    { name: 'basket_body', role: 'body', pixels: [...rect(4, 6, 11, 10)] },
    { name: 'weave', role: 'arm', pixels: [[5, 7], [7, 7], [9, 7], [11, 7], [6, 9], [8, 9], [10, 9]] },
    { name: 'clasp', role: 'eye', pixels: [[7, 6], [8, 6]] },
    { name: 'handle', role: 'accessory', pixels: [[6, 2], [7, 2], [8, 2], [9, 2], [5, 3], [10, 3]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(11, 4, 11)] },
  ],
};

export const WATERING_CAN_16: SpriteTemplate = {
  name: 'watering_can_16', width: 16, height: 16,
  description: 'Garden watering can with side handle and perforated spout.',
  regions: [
    { name: 'tank', role: 'head', pixels: [...rect(5, 6, 10, 10)] },
    { name: 'spout', role: 'arm', pixels: [[10, 7], [11, 7], [12, 7], [13, 7], [12, 8], [13, 8]] },
    { name: 'water_holes', role: 'eye', pixels: [[13, 7], [13, 8]] },
    { name: 'handle', role: 'accessory', pixels: [[4, 7], [4, 8], [4, 9], [5, 10]] },
    { name: 'shine', role: 'body', pixels: [[6, 7], [6, 8]] },
    { name: 'base', role: 'boot', pixels: [...hLine(11, 5, 10)] },
  ],
};

export const IRON_SHOVEL_16: SpriteTemplate = {
  name: 'iron_shovel_16', width: 16, height: 16,
  description: 'Iron shovel with broad scoop blade and wooden shaft.',
  regions: [
    { name: 'blade', role: 'head', pixels: [...hLine(2, 6, 9), ...hLine(3, 5, 10), ...hLine(4, 6, 9), ...hLine(5, 7, 8)] },
    { name: 'edge', role: 'eye', pixels: [[6, 2], [7, 2], [8, 2]] },
    { name: 'shaft', role: 'body', pixels: [...vLine(7, 6, 12), ...vLine(8, 6, 12)] },
    { name: 'grip', role: 'belt', pixels: [[6, 13], [7, 13], [8, 13], [9, 13], [6, 14], [9, 14]] },
    { name: 'socket', role: 'arm', pixels: [[7, 5], [8, 5]] },
    { name: 'shadow', role: 'boot', pixels: [[7, 15], [8, 15]] },
  ],
};

export const FISHING_ROD_16: SpriteTemplate = {
  name: 'fishing_rod_16', width: 16, height: 16,
  description: 'Fishing rod with reel, line, and hook lure.',
  regions: [
    { name: 'rod', role: 'body', pixels: [[3, 13], [4, 12], [5, 11], [6, 10], [7, 9], [8, 8], [9, 7], [10, 6], [11, 5], [12, 4]] },
    { name: 'line', role: 'arm', pixels: [[12, 5], [12, 6], [12, 7], [12, 8], [12, 9]] },
    { name: 'hook', role: 'eye', pixels: [[11, 10], [12, 10]] },
    { name: 'reel', role: 'accessory', pixels: [[5, 12], [6, 12], [5, 13], [6, 13]] },
    { name: 'grip', role: 'belt', pixels: [[2, 14], [3, 14], [4, 13]] },
    { name: 'tip', role: 'boot', pixels: [[13, 3]] },
  ],
};

export const BLACKSMITH_HAMMER_16: SpriteTemplate = {
  name: 'blacksmith_hammer_16', width: 16, height: 16,
  description: 'Heavy forge hammer with square head and wrapped handle.',
  regions: [
    { name: 'hammer_head', role: 'head', pixels: [...rect(5, 3, 10, 5)] },
    { name: 'head_shine', role: 'eye', pixels: [[6, 4], [7, 4], [8, 4]] },
    { name: 'shaft', role: 'body', pixels: [...vLine(7, 6, 12), ...vLine(8, 6, 12)] },
    { name: 'wrap', role: 'belt', pixels: [[7, 10], [8, 10], [7, 11], [8, 11]] },
    { name: 'pommel', role: 'boot', pixels: [[6, 13], [7, 13], [8, 13], [9, 13]] },
    { name: 'peen', role: 'arm', pixels: [[4, 4], [11, 4]] },
  ],
};

export const HAND_SAW_16: SpriteTemplate = {
  name: 'hand_saw_16', width: 16, height: 16,
  description: 'Carpenter hand saw with toothed blade and wooden grip.',
  regions: [
    { name: 'blade', role: 'head', pixels: [[3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7]] },
    { name: 'teeth', role: 'eye', pixels: [[4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8]] },
    { name: 'spine', role: 'arm', pixels: [[4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6]] },
    { name: 'handle', role: 'body', pixels: [[11, 6], [12, 6], [12, 7], [13, 7], [12, 8], [11, 8]] },
    { name: 'grip_hole', role: 'belt', pixels: [[12, 7]] },
    { name: 'shadow', role: 'boot', pixels: [[6, 9], [7, 9], [8, 9], [9, 9], [10, 9]] },
  ],
};

export const SPEAR_16: SpriteTemplate = {
  name: 'spear_16', width: 16, height: 16,
  description: 'Long spear with leaf-shaped tip and leather hand wrap.',
  regions: [
    { name: 'tip', role: 'head', pixels: [[8, 0], [7, 1], [8, 1], [9, 1], [7, 2], [8, 2], [9, 2], [8, 3]] },
    { name: 'tip_edge', role: 'eye', pixels: [[8, 1], [8, 2]] },
    { name: 'shaft', role: 'body', pixels: [...vLine(8, 4, 13)] },
    { name: 'wrap', role: 'belt', pixels: [[7, 10], [8, 10], [9, 10]] },
    { name: 'butt', role: 'boot', pixels: [[7, 14], [8, 14], [9, 14]] },
    { name: 'counterweight', role: 'accessory', pixels: [[8, 15]] },
  ],
};

export const DAGGER_16: SpriteTemplate = {
  name: 'dagger_16', width: 16, height: 16,
  description: 'Compact dagger with short steel blade and crossguard.',
  regions: [
    { name: 'blade', role: 'head', pixels: [[8, 2], [7, 3], [8, 3], [9, 3], [7, 4], [8, 4], [9, 4], [8, 5]] },
    { name: 'edge', role: 'eye', pixels: [[8, 3], [8, 4]] },
    { name: 'guard', role: 'accessory', pixels: [[6, 6], [7, 6], [8, 6], [9, 6], [10, 6]] },
    { name: 'grip', role: 'body', pixels: [[7, 7], [8, 7], [7, 8], [8, 8], [7, 9], [8, 9]] },
    { name: 'wrap', role: 'belt', pixels: [[7, 8], [8, 8]] },
    { name: 'pommel', role: 'boot', pixels: [[7, 10], [8, 10]] },
  ],
};

export const WIZARD_STAFF_16: SpriteTemplate = {
  name: 'wizard_staff_16', width: 16, height: 16,
  description: 'Arcane staff with crystal orb and carved wooden shaft.',
  regions: [
    { name: 'orb', role: 'eye', pixels: [[7, 1], [8, 1], [7, 2], [8, 2]] },
    { name: 'crown', role: 'accessory', pixels: [[6, 2], [9, 2], [7, 3], [8, 3]] },
    { name: 'shaft', role: 'body', pixels: [...vLine(7, 4, 13), ...vLine(8, 4, 13)] },
    { name: 'carving', role: 'arm', pixels: [[7, 6], [8, 8], [7, 10], [8, 12]] },
    { name: 'wrap', role: 'belt', pixels: [[7, 11], [8, 11]] },
    { name: 'cap', role: 'boot', pixels: [[7, 14], [8, 14]] },
  ],
};

export const MAGIC_WAND_16: SpriteTemplate = {
  name: 'magic_wand_16', width: 16, height: 16,
  description: 'Short magic wand with gem tip and tiny spell sparkles.',
  regions: [
    { name: 'shaft', role: 'body', pixels: [[5, 11], [6, 10], [7, 9], [8, 8], [9, 7], [10, 6]] },
    { name: 'grip', role: 'belt', pixels: [[5, 11], [4, 12]] },
    { name: 'gem', role: 'eye', pixels: [[10, 5], [11, 5], [10, 6]] },
    { name: 'sparkles', role: 'accessory', pixels: [[12, 4], [13, 5], [11, 3]] },
    { name: 'core', role: 'arm', pixels: [[9, 7], [8, 8]] },
    { name: 'shadow', role: 'boot', pixels: [[6, 12], [7, 11], [8, 10]] },
  ],
};

export const CROSSBOW_16: SpriteTemplate = {
  name: 'crossbow_16', width: 16, height: 16,
  description: 'Loaded crossbow with broad limbs and central bolt.',
  regions: [
    { name: 'limbs', role: 'head', pixels: [[3, 6], [4, 6], [5, 7], [6, 7], [10, 7], [11, 7], [12, 6], [13, 6]] },
    { name: 'stock', role: 'body', pixels: [[7, 7], [8, 7], [9, 7], [7, 8], [8, 8], [9, 8], [8, 9], [8, 10], [8, 11]] },
    { name: 'string', role: 'arm', pixels: [[4, 7], [5, 7], [6, 8], [10, 8], [11, 7], [12, 7]] },
    { name: 'bolt', role: 'eye', pixels: [[8, 5], [8, 6], [8, 7]] },
    { name: 'grip', role: 'belt', pixels: [[7, 10], [7, 11]] },
    { name: 'trigger', role: 'accessory', pixels: [[9, 10]] },
  ],
};

export const IRON_HELMET_16: SpriteTemplate = {
  name: 'iron_helmet_16', width: 16, height: 16,
  description: 'Rounded iron helmet with visor slit and cheek guards.',
  regions: [
    { name: 'shell', role: 'head', pixels: [...hLine(3, 6, 9), ...hLine(4, 5, 10), ...hLine(5, 4, 11), ...hLine(6, 4, 11)] },
    { name: 'visor', role: 'body', pixels: [[5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [6, 8], [7, 8], [8, 8], [9, 8]] },
    { name: 'slit', role: 'eye', pixels: [[7, 7], [8, 7]] },
    { name: 'trim', role: 'belt', pixels: [[5, 6], [10, 6], [5, 7], [10, 7]] },
    { name: 'crest', role: 'accessory', pixels: [[7, 2], [8, 2]] },
    { name: 'shadow', role: 'boot', pixels: [[6, 9], [7, 9], [8, 9], [9, 9]] },
  ],
};

export const PLATE_ARMOR_16: SpriteTemplate = {
  name: 'plate_armor_16', width: 16, height: 16,
  description: 'Plate chest armor icon with pauldrons and center emblem.',
  regions: [
    { name: 'pauldrons', role: 'accessory', pixels: [[4, 4], [5, 4], [10, 4], [11, 4], [4, 5], [11, 5]] },
    { name: 'torso', role: 'head', pixels: [...rect(5, 5, 10, 10)] },
    { name: 'midplate', role: 'body', pixels: [...rect(6, 6, 9, 10)] },
    { name: 'straps', role: 'belt', pixels: [[5, 7], [10, 7], [6, 9], [9, 9]] },
    { name: 'rivet', role: 'eye', pixels: [[7, 7], [8, 7]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(11, 5, 10)] },
  ],
};

export const TRAVEL_BOOTS_16: SpriteTemplate = {
  name: 'travel_boots_16', width: 16, height: 16,
  description: 'Pair of sturdy travel boots with cuffs and reinforced soles.',
  regions: [
    { name: 'uppers', role: 'body', pixels: [...rect(4, 6, 6, 10), ...rect(9, 6, 11, 10)] },
    { name: 'cuffs', role: 'head', pixels: [...hLine(6, 4, 6), ...hLine(6, 9, 11)] },
    { name: 'laces', role: 'arm', pixels: [[5, 7], [5, 8], [10, 7], [10, 8]] },
    { name: 'buckles', role: 'eye', pixels: [[6, 8], [11, 8]] },
    { name: 'soles', role: 'boot', pixels: [...hLine(11, 3, 7), ...hLine(11, 8, 12)] },
    { name: 'ground', role: 'belt', pixels: [[3, 12], [4, 12], [10, 12], [11, 12], [12, 12]] },
  ],
};

export const LEATHER_GLOVES_16: SpriteTemplate = {
  name: 'leather_gloves_16', width: 16, height: 16,
  description: 'Pair of leather gloves with stitched seams and cuff bands.',
  regions: [
    { name: 'gloves', role: 'body', pixels: [...rect(4, 6, 6, 10), ...rect(9, 6, 11, 10)] },
    { name: 'cuffs', role: 'head', pixels: [...hLine(10, 4, 6), ...hLine(10, 9, 11)] },
    { name: 'seams', role: 'arm', pixels: [[5, 7], [5, 8], [10, 7], [10, 8]] },
    { name: 'studs', role: 'eye', pixels: [[6, 7], [11, 7]] },
    { name: 'strap', role: 'belt', pixels: [[4, 9], [6, 9], [9, 9], [11, 9]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(11, 3, 7), ...hLine(11, 8, 12)] },
  ],
};

export const APPLE_ITEM_16: SpriteTemplate = {
  name: 'apple_item_16', width: 16, height: 16,
  description: 'Red apple with short stem and small leaf.',
  regions: [
    { name: 'fruit', role: 'accessory', pixels: [...hLine(4, 6, 9), ...hLine(5, 5, 10), ...hLine(6, 5, 10), ...hLine(7, 5, 10), ...hLine(8, 6, 9)] },
    { name: 'stem', role: 'belt', pixels: [[7, 2], [7, 3]] },
    { name: 'leaf', role: 'body', pixels: [[8, 3], [9, 3], [9, 4]] },
    { name: 'shine', role: 'eye', pixels: [[6, 5], [6, 6]] },
    { name: 'core_shadow', role: 'arm', pixels: [[8, 7], [9, 7]] },
    { name: 'ground', role: 'boot', pixels: [[6, 9], [7, 9], [8, 9], [9, 9]] },
  ],
};

export const BREAD_LOAF_16: SpriteTemplate = {
  name: 'bread_loaf_16', width: 16, height: 16,
  description: 'Crusty bread loaf with score cuts and warm baked crust.',
  regions: [
    { name: 'crust', role: 'head', pixels: [...hLine(5, 4, 11), ...hLine(6, 3, 12), ...hLine(7, 3, 12), ...hLine(8, 4, 11)] },
    { name: 'crumb', role: 'body', pixels: [...hLine(6, 4, 11), ...hLine(7, 4, 11)] },
    { name: 'scores', role: 'arm', pixels: [[6, 6], [8, 6], [10, 6]] },
    { name: 'shine', role: 'eye', pixels: [[5, 6], [6, 6]] },
    { name: 'base', role: 'belt', pixels: [...hLine(8, 4, 11)] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(9, 4, 11)] },
  ],
};

export const CHEESE_WEDGE_16: SpriteTemplate = {
  name: 'cheese_wedge_16', width: 16, height: 16,
  description: 'Triangular cheese wedge with rind edge and holes.',
  regions: [
    { name: 'rind', role: 'head', pixels: [[4, 9], [5, 8], [6, 7], [7, 6], [8, 5], [9, 4], [10, 4], [11, 4]] },
    { name: 'body', role: 'body', pixels: [...hLine(5, 8, 11), ...hLine(6, 7, 11), ...hLine(7, 6, 11), ...hLine(8, 5, 11), ...hLine(9, 4, 11)] },
    { name: 'holes', role: 'eye', pixels: [[8, 6], [9, 7], [7, 8]] },
    { name: 'edge', role: 'belt', pixels: [[4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9]] },
    { name: 'crumb', role: 'arm', pixels: [[10, 6], [10, 7], [10, 8]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(10, 5, 11)] },
  ],
};

export const CARROT_ITEM_16: SpriteTemplate = {
  name: 'carrot_item_16', width: 16, height: 16,
  description: 'Fresh carrot with leafy top and segmented root.',
  regions: [
    { name: 'leaves', role: 'accessory', pixels: [[7, 2], [8, 2], [6, 3], [7, 3], [8, 3], [9, 3], [6, 4], [9, 4]] },
    { name: 'root', role: 'body', pixels: [[7, 5], [8, 5], [7, 6], [8, 6], [7, 7], [8, 7], [7, 8], [8, 8], [7, 9], [8, 9], [7, 10], [8, 10], [7, 11], [8, 11]] },
    { name: 'ridges', role: 'arm', pixels: [[7, 6], [8, 7], [7, 8], [8, 9]] },
    { name: 'shine', role: 'eye', pixels: [[7, 6], [7, 7]] },
    { name: 'tip', role: 'belt', pixels: [[7, 12], [8, 12]] },
    { name: 'shadow', role: 'boot', pixels: [[7, 13], [8, 13]] },
  ],
};

export const TORCH_ITEM_16: SpriteTemplate = {
  name: 'torch_item_16', width: 16, height: 16,
  description: 'Hand torch with wrapped grip and animated flame crown.',
  regions: [
    { name: 'flame_outer', role: 'accessory', pixels: [[8, 1], [7, 2], [8, 2], [9, 2], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [7, 4], [8, 4], [9, 4]] },
    { name: 'flame_core', role: 'eye', pixels: [[8, 2], [8, 3], [7, 3]] },
    { name: 'shaft', role: 'body', pixels: [...vLine(8, 5, 12), ...vLine(7, 7, 11)] },
    { name: 'wrap', role: 'belt', pixels: [[7, 8], [8, 8], [7, 10], [8, 10]] },
    { name: 'embers', role: 'arm', pixels: [[6, 4], [10, 4]] },
    { name: 'butt', role: 'boot', pixels: [[7, 13], [8, 13]] },
  ],
};

export const COMPASS_16: SpriteTemplate = {
  name: 'compass_16', width: 16, height: 16,
  description: 'Explorer compass with metallic ring and dual-color needle.',
  regions: [
    { name: 'ring', role: 'head', pixels: [...hLine(3, 6, 9), ...hLine(4, 5, 10), ...hLine(5, 4, 11), ...hLine(6, 4, 11), ...hLine(7, 4, 11), ...hLine(8, 4, 11), ...hLine(9, 5, 10), ...hLine(10, 6, 9)] },
    { name: 'face', role: 'body', pixels: [...hLine(5, 6, 9), ...hLine(6, 5, 10), ...hLine(7, 5, 10), ...hLine(8, 5, 10)] },
    { name: 'needle', role: 'accessory', pixels: [[7, 6], [8, 6], [8, 7], [9, 7], [7, 8], [6, 8]] },
    { name: 'pivot', role: 'eye', pixels: [[8, 7]] },
    { name: 'ticks', role: 'arm', pixels: [[8, 4], [5, 7], [11, 7], [8, 10]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(11, 6, 9)] },
  ],
};

export const MAP_PARCHMENT_16: SpriteTemplate = {
  name: 'map_parchment_16', width: 16, height: 16,
  description: 'Folded parchment map with route markings and pinned corner.',
  regions: [
    { name: 'paper', role: 'body', pixels: [...rect(4, 4, 11, 11)] },
    { name: 'border', role: 'head', pixels: [...hLine(4, 4, 11), ...hLine(11, 4, 11), ...vLine(4, 5, 10), ...vLine(11, 5, 10)] },
    { name: 'marks', role: 'arm', pixels: [[6, 6], [7, 6], [9, 6], [6, 8], [8, 8], [10, 8], [7, 10], [9, 10]] },
    { name: 'route', role: 'eye', pixels: [[6, 9], [7, 9], [8, 9], [9, 9]] },
    { name: 'ribbon', role: 'accessory', pixels: [[10, 11], [11, 11], [10, 12]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(12, 4, 11)] },
  ],
};

export const TEA_KETTLE_16: SpriteTemplate = {
  name: 'tea_kettle_16', width: 16, height: 16,
  description: 'Cozy tea kettle with curved handle, spout, and lid knob.',
  regions: [
    { name: 'body', role: 'head', pixels: [...hLine(5, 6, 9), ...hLine(6, 5, 10), ...hLine(7, 4, 11), ...hLine(8, 4, 11), ...hLine(9, 5, 10), ...hLine(10, 6, 9)] },
    { name: 'lid', role: 'belt', pixels: [[7, 4], [8, 4], [9, 4], [8, 3]] },
    { name: 'spout', role: 'arm', pixels: [[10, 7], [11, 7], [12, 6], [13, 6]] },
    { name: 'handle', role: 'accessory', pixels: [[4, 6], [3, 7], [3, 8], [4, 9]] },
    { name: 'shine', role: 'eye', pixels: [[6, 7], [6, 8]] },
    { name: 'base', role: 'boot', pixels: [...hLine(11, 6, 9)] },
  ],
};

export const WOODEN_CHAIR_COLORS = makeScheme('wooden_chair_default', { head: WOOD, body: WOOD_LIGHT, belt: WOOD, accessory: CLOTH, eye: GOLD, boot: IRON });
export const ROUND_TABLE_COLORS = makeScheme('round_table_default', { head: WOOD, body: WOOD_LIGHT, belt: WOOD, accessory: PAPER, eye: GOLD, boot: IRON });
export const COZY_LANTERN_COLORS = makeScheme('cozy_lantern_default', { head: IRON, body: METAL, accessory: FIRE, eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, arm: METAL, boot: IRON });
export const PICNIC_BASKET_COLORS = makeScheme('picnic_basket_default', { head: WOOD_LIGHT, body: WOOD, arm: LEATHER, accessory: LEATHER, eye: GOLD, boot: IRON });
export const WATERING_CAN_COLORS = makeScheme('watering_can_default', { head: METAL, body: METAL, arm: METAL, accessory: METAL, eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, boot: IRON });
export const IRON_SHOVEL_COLORS = makeScheme('iron_shovel_default', { head: METAL, body: WOOD, belt: LEATHER, eye: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, boot: IRON });
export const FISHING_ROD_COLORS = makeScheme('fishing_rod_default', { body: WOOD, arm: METAL, accessory: IRON, eye: GOLD, belt: LEATHER, boot: IRON });
export const BLACKSMITH_HAMMER_COLORS = makeScheme('blacksmith_hammer_default', { head: IRON, body: WOOD, arm: METAL, belt: LEATHER, eye: METAL, boot: IRON });
export const HAND_SAW_COLORS = makeScheme('hand_saw_default', { head: METAL, body: WOOD, arm: IRON, belt: LEATHER, eye: GOLD, boot: IRON });
export const SPEAR_COLORS = makeScheme('spear_default', { head: METAL, body: WOOD, belt: LEATHER, eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, accessory: GOLD, boot: IRON });
export const DAGGER_COLORS = makeScheme('dagger_default', { head: METAL, body: LEATHER, accessory: GOLD, belt: LEATHER, eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, boot: IRON });
export const WIZARD_STAFF_COLORS = makeScheme('wizard_staff_default', { head: METAL, body: WOOD, accessory: CLOTH, eye: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' }, belt: GOLD, boot: IRON });
export const MAGIC_WAND_COLORS = makeScheme('magic_wand_default', { body: WOOD, belt: LEATHER, eye: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' }, accessory: FIRE, arm: GOLD, boot: IRON });
export const CROSSBOW_COLORS = makeScheme('crossbow_default', { head: WOOD, body: WOOD_LIGHT, arm: METAL, eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, belt: LEATHER, accessory: IRON, boot: IRON });
export const IRON_HELMET_COLORS = makeScheme('iron_helmet_default', { head: METAL, body: IRON, belt: IRON, accessory: RED, eye: { shadow: '#140c1c', base: '#deeed6', highlight: '#deeed6' }, boot: IRON });
export const PLATE_ARMOR_COLORS = makeScheme('plate_armor_default', { head: METAL, body: IRON, accessory: METAL, belt: LEATHER, eye: GOLD, boot: IRON });
export const TRAVEL_BOOTS_COLORS = makeScheme('travel_boots_default', { head: LEATHER, body: WOOD, arm: LEATHER, eye: GOLD, boot: IRON, belt: WOOD });
export const LEATHER_GLOVES_COLORS = makeScheme('leather_gloves_default', { head: LEATHER, body: WOOD, arm: LEATHER, eye: GOLD, belt: WOOD, boot: IRON });
export const APPLE_ITEM_COLORS = makeScheme('apple_item_default', { accessory: RED, body: GREEN, belt: WOOD, eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, arm: RED, boot: IRON });
export const BREAD_LOAF_COLORS = makeScheme('bread_loaf_default', { head: WOOD, body: WOOD_LIGHT, arm: WOOD, eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, belt: WOOD, boot: IRON });
export const CHEESE_WEDGE_COLORS = makeScheme('cheese_wedge_default', { head: GOLD, body: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, eye: WOOD, belt: WOOD, arm: GOLD, boot: IRON });
export const CARROT_ITEM_COLORS = makeScheme('carrot_item_default', { accessory: GREEN, body: FIRE, arm: WOOD, eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, belt: FIRE, boot: WOOD });
export const TORCH_ITEM_COLORS = makeScheme('torch_item_default', { accessory: FIRE, eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, body: WOOD, belt: LEATHER, arm: RED, boot: IRON });
export const COMPASS_COLORS = makeScheme('compass_default', { head: METAL, body: PAPER, accessory: RED, eye: GOLD, arm: IRON, boot: IRON });
export const MAP_PARCHMENT_COLORS = makeScheme('map_parchment_default', { head: PAPER, body: PAPER, arm: WOOD, eye: RED, accessory: RED, boot: IRON });
export const TEA_KETTLE_COLORS = makeScheme('tea_kettle_default', { head: METAL, body: METAL, arm: METAL, accessory: WOOD, eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, belt: GOLD, boot: IRON });

export const ITEM_VARIETY_TEMPLATES: Record<string, SpriteTemplate> = {
  wooden_chair_16: WOODEN_CHAIR_16,
  round_table_16: ROUND_TABLE_16,
  cozy_lantern_16: COZY_LANTERN_16,
  picnic_basket_16: PICNIC_BASKET_16,
  watering_can_16: WATERING_CAN_16,
  iron_shovel_16: IRON_SHOVEL_16,
  fishing_rod_16: FISHING_ROD_16,
  blacksmith_hammer_16: BLACKSMITH_HAMMER_16,
  hand_saw_16: HAND_SAW_16,
  spear_16: SPEAR_16,
  dagger_16: DAGGER_16,
  wizard_staff_16: WIZARD_STAFF_16,
  magic_wand_16: MAGIC_WAND_16,
  crossbow_16: CROSSBOW_16,
  iron_helmet_16: IRON_HELMET_16,
  plate_armor_16: PLATE_ARMOR_16,
  travel_boots_16: TRAVEL_BOOTS_16,
  leather_gloves_16: LEATHER_GLOVES_16,
  apple_item_16: APPLE_ITEM_16,
  bread_loaf_16: BREAD_LOAF_16,
  cheese_wedge_16: CHEESE_WEDGE_16,
  carrot_item_16: CARROT_ITEM_16,
  torch_item_16: TORCH_ITEM_16,
  compass_16: COMPASS_16,
  map_parchment_16: MAP_PARCHMENT_16,
  tea_kettle_16: TEA_KETTLE_16,
};

export const ITEM_VARIETY_COLOR_SCHEMES: Record<string, ColorScheme> = {
  wooden_chair_default: WOODEN_CHAIR_COLORS,
  round_table_default: ROUND_TABLE_COLORS,
  cozy_lantern_default: COZY_LANTERN_COLORS,
  picnic_basket_default: PICNIC_BASKET_COLORS,
  watering_can_default: WATERING_CAN_COLORS,
  iron_shovel_default: IRON_SHOVEL_COLORS,
  fishing_rod_default: FISHING_ROD_COLORS,
  blacksmith_hammer_default: BLACKSMITH_HAMMER_COLORS,
  hand_saw_default: HAND_SAW_COLORS,
  spear_default: SPEAR_COLORS,
  dagger_default: DAGGER_COLORS,
  wizard_staff_default: WIZARD_STAFF_COLORS,
  magic_wand_default: MAGIC_WAND_COLORS,
  crossbow_default: CROSSBOW_COLORS,
  iron_helmet_default: IRON_HELMET_COLORS,
  plate_armor_default: PLATE_ARMOR_COLORS,
  travel_boots_default: TRAVEL_BOOTS_COLORS,
  leather_gloves_default: LEATHER_GLOVES_COLORS,
  apple_item_default: APPLE_ITEM_COLORS,
  bread_loaf_default: BREAD_LOAF_COLORS,
  cheese_wedge_default: CHEESE_WEDGE_COLORS,
  carrot_item_default: CARROT_ITEM_COLORS,
  torch_item_default: TORCH_ITEM_COLORS,
  compass_default: COMPASS_COLORS,
  map_parchment_default: MAP_PARCHMENT_COLORS,
  tea_kettle_default: TEA_KETTLE_COLORS,
};
