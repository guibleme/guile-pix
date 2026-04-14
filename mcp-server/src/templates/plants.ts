/**
 * 16x16 plant and flora templates.
 * Quality pass: stronger silhouettes and clearer material separation.
 */
import { SpriteTemplate, ColorScheme } from './humanoid16.js';

type Pixel = [number, number];

function rect(x0: number, y0: number, x1: number, y1: number): Pixel[] {
  const out: Pixel[] = [];
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) out.push([x, y]);
  }
  return out;
}

function hLine(y: number, x0: number, x1: number): Pixel[] {
  const out: Pixel[] = [];
  for (let x = x0; x <= x1; x++) out.push([x, y]);
  return out;
}

function vLine(x: number, y0: number, y1: number): Pixel[] {
  const out: Pixel[] = [];
  for (let y = y0; y <= y1; y++) out.push([x, y]);
  return out;
}

export const HERB_16: SpriteTemplate = {
  name: 'herb_16', width: 16, height: 16,
  description: 'Leafy herb cluster with tiny buds and a compact root base.',
  regions: [
    { name: 'flower_buds', role: 'accessory', pixels: [[7, 3], [9, 3], [8, 4]] },
    { name: 'leaves', role: 'body', pixels: [
      ...hLine(5, 6, 10),
      ...hLine(6, 5, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 10),
      ...hLine(9, 5, 10),
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    { name: 'leaf_shade', role: 'leg', pixels: [[5, 7], [10, 8], [7, 9], [9, 9]] },
    { name: 'stem', role: 'arm', pixels: [[8, 11], [8, 12], [8, 13]] },
    { name: 'roots', role: 'belt', pixels: [[7, 14], [8, 14], [9, 14]] },
    { name: 'soil', role: 'boot', pixels: [[6, 15], [7, 15], [8, 15], [9, 15], [10, 15]] },
  ],
};

export const CACTUS_16: SpriteTemplate = {
  name: 'cactus_16', width: 16, height: 16,
  description: 'Rounded desert cactus with two arms, bloom, and clay pot.',
  regions: [
    { name: 'flower', role: 'eye', pixels: [[7, 1], [8, 1], [7, 2]] },
    { name: 'main_body', role: 'body', pixels: [
      ...hLine(2, 7, 8),
      ...hLine(3, 6, 9),
      ...hLine(4, 6, 9),
      ...hLine(5, 6, 9),
      ...hLine(6, 6, 9),
      ...hLine(7, 6, 9),
      ...hLine(8, 6, 9),
      ...hLine(9, 6, 9),
      ...hLine(10, 6, 9),
      ...hLine(11, 6, 9),
    ]},
    { name: 'left_arm', role: 'body', pixels: [[4, 6], [5, 6], [4, 7], [5, 7], [5, 8], [6, 8]] },
    { name: 'right_arm', role: 'body', pixels: [[10, 8], [11, 8], [10, 9], [11, 9], [9, 10], [10, 10]] },
    { name: 'ribs', role: 'arm', pixels: [...vLine(7, 3, 11), ...vLine(8, 3, 11)] },
    { name: 'spines', role: 'accessory', pixels: [[6, 4], [9, 4], [3, 7], [12, 9], [6, 11], [9, 11]] },
    { name: 'pot', role: 'belt', pixels: [...hLine(12, 5, 10), ...hLine(13, 5, 10)] },
    { name: 'pot_base', role: 'boot', pixels: [...hLine(14, 5, 10), ...hLine(15, 6, 9)] },
  ],
};

export const WHEAT_16: SpriteTemplate = {
  name: 'wheat_16', width: 16, height: 16,
  description: 'Three ripe wheat stalks with grain heads and crossed leaves.',
  regions: [
    { name: 'grain_heads', role: 'accessory', pixels: [
      [4, 2], [5, 2], [4, 3], [5, 3], [5, 4],
      [7, 1], [8, 1], [7, 2], [8, 2], [7, 3], [8, 3], [8, 4],
      [10, 2], [11, 2], [10, 3], [11, 3], [10, 4],
    ]},
    { name: 'stalks', role: 'body', pixels: [
      ...vLine(5, 5, 11),
      ...vLine(7, 5, 11), ...vLine(8, 5, 11),
      ...vLine(10, 5, 11),
    ]},
    { name: 'leaves', role: 'arm', pixels: [[4, 7], [6, 8], [9, 7], [11, 8], [6, 10], [9, 10]] },
    { name: 'nodes', role: 'eye', pixels: [[5, 6], [8, 7], [10, 8]] },
    { name: 'ground', role: 'belt', pixels: [...hLine(12, 3, 12)] },
    { name: 'soil', role: 'boot', pixels: [...hLine(13, 3, 12)] },
  ],
};

export const SUNFLOWER_16: SpriteTemplate = {
  name: 'sunflower_16', width: 16, height: 16,
  description: 'Large sunflower head with dense seed center and heavy stem.',
  regions: [
    { name: 'petals', role: 'accessory', pixels: [
      ...hLine(0, 6, 9),
      [5, 1], [6, 1], [9, 1], [10, 1],
      [4, 2], [5, 2], [10, 2], [11, 2],
      [4, 3], [11, 3], [4, 4], [11, 4],
      [4, 5], [5, 5], [10, 5], [11, 5],
      [5, 6], [10, 6],
      ...hLine(7, 6, 9),
    ]},
    { name: 'center', role: 'eye', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 6, 9),
      ...hLine(4, 6, 9),
      ...hLine(5, 6, 9),
    ]},
    { name: 'stem', role: 'body', pixels: [...vLine(7, 8, 12), ...vLine(8, 8, 12)] },
    { name: 'leaves', role: 'head', pixels: [[5, 9], [6, 9], [9, 10], [10, 10], [6, 11], [9, 11]] },
    { name: 'head_shadow', role: 'leg', pixels: [[6, 6], [9, 6], [7, 7], [8, 7]] },
    { name: 'ground', role: 'boot', pixels: [...hLine(13, 5, 10)] },
  ],
};

export const ROSE_16: SpriteTemplate = {
  name: 'rose_16', width: 16, height: 16,
  description: 'Layered rose bloom with thorned stem and side leaves.',
  regions: [
    { name: 'petals', role: 'accessory', pixels: [
      [7, 1], [8, 1],
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    { name: 'petal_shadow', role: 'leg', pixels: [[6, 4], [9, 4], [7, 5], [8, 5]] },
    { name: 'petal_center', role: 'eye', pixels: [[7, 3], [8, 3]] },
    { name: 'stem', role: 'body', pixels: [[7, 6], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10], [8, 11], [8, 12]] },
    { name: 'thorns', role: 'arm', pixels: [[7, 7], [9, 8], [7, 10], [9, 11]] },
    { name: 'leaves', role: 'head', pixels: [[5, 8], [6, 8], [6, 9], [10, 9], [10, 10], [11, 10]] },
    { name: 'ground', role: 'boot', pixels: [...hLine(13, 6, 10)] },
  ],
};

export const FERN_16: SpriteTemplate = {
  name: 'fern_16', width: 16, height: 16,
  description: 'Dense fern with layered fronds and dark central rib.',
  regions: [
    { name: 'fronds', role: 'body', pixels: [
      ...hLine(2, 7, 8),
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 12),
      ...hLine(7, 4, 11),
      ...hLine(8, 5, 10),
      ...hLine(9, 6, 9),
    ]},
    { name: 'frond_tips', role: 'accessory', pixels: [[2, 5], [13, 5], [2, 6], [13, 6], [3, 7], [12, 7]] },
    { name: 'center_rib', role: 'arm', pixels: [[7, 3], [7, 4], [7, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10], [8, 11]] },
    { name: 'shadow', role: 'leg', pixels: [[6, 8], [9, 8], [7, 9], [9, 9]] },
    { name: 'ground', role: 'boot', pixels: [...hLine(12, 5, 10)] },
  ],
};

export const VINE_16: SpriteTemplate = {
  name: 'vine_16', width: 16, height: 16,
  description: 'Climbing vine strand with alternating leaves and curled tendrils.',
  regions: [
    { name: 'main_vine', role: 'body', pixels: [[7, 0], [8, 0], [8, 1], [9, 1], [9, 2], [8, 3], [7, 4], [7, 5], [8, 6], [8, 7], [7, 8], [7, 9], [8, 10], [8, 11], [7, 12], [7, 13], [8, 14]] },
    { name: 'leaves', role: 'head', pixels: [[5, 1], [6, 1], [6, 2], [10, 3], [11, 3], [11, 4], [4, 5], [5, 5], [5, 6], [10, 7], [11, 7], [10, 8], [5, 9], [6, 9], [5, 10], [10, 11], [11, 11], [10, 12], [5, 13], [6, 13]] },
    { name: 'tendrils', role: 'arm', pixels: [[10, 1], [4, 4], [11, 6], [4, 8], [11, 10], [4, 12]] },
    { name: 'flowers', role: 'eye', pixels: [[5, 2], [11, 5], [4, 9]] },
    { name: 'anchor', role: 'belt', pixels: [[7, 15], [8, 15], [9, 15]] },
  ],
};

export const SAPLING_16: SpriteTemplate = {
  name: 'sapling_16', width: 16, height: 16,
  description: 'Young tree with rounded canopy, slim trunk, and root flare.',
  regions: [
    { name: 'canopy', role: 'body', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 11),
      ...hLine(6, 5, 10),
      ...hLine(7, 6, 9),
    ]},
    { name: 'canopy_light', role: 'accessory', pixels: [[7, 3], [8, 3], [6, 5], [9, 5], [7, 6]] },
    { name: 'trunk', role: 'head', pixels: [[7, 8], [8, 8], [7, 9], [8, 9], [7, 10], [8, 10], [7, 11], [8, 11]] },
    { name: 'branches', role: 'arm', pixels: [[6, 9], [9, 9], [6, 10], [9, 10]] },
    { name: 'roots', role: 'belt', pixels: [[6, 12], [7, 12], [8, 12], [9, 12]] },
    { name: 'ground', role: 'boot', pixels: [...hLine(13, 5, 10)] },
  ],
};

export const CORN_16: SpriteTemplate = {
  name: 'corn_16', width: 16, height: 16,
  description: 'Tall corn stalk with tassel, wrapped ear, and broad leaves.',
  regions: [
    { name: 'tassel', role: 'accessory', pixels: [[7, 0], [8, 0], [6, 1], [7, 1], [8, 1], [9, 1]] },
    { name: 'stalk', role: 'head', pixels: [...vLine(7, 2, 12), ...vLine(8, 2, 12)] },
    { name: 'leaves', role: 'body', pixels: [[5, 4], [6, 4], [5, 5], [6, 5], [9, 8], [10, 8], [5, 9], [6, 9], [9, 10], [10, 10]] },
    { name: 'corn_ear', role: 'eye', pixels: [[9, 5], [10, 5], [9, 6], [10, 6], [11, 6], [9, 7], [10, 7], [11, 7], [9, 8], [10, 8]] },
    { name: 'husk', role: 'arm', pixels: [[11, 5], [12, 5], [12, 6], [12, 7], [11, 8]] },
    { name: 'ground', role: 'boot', pixels: [...hLine(13, 5, 10)] },
  ],
};

export const IVY_16: SpriteTemplate = {
  name: 'ivy_16', width: 16, height: 16,
  description: 'Wall ivy patch with overlapping leaves and berry accents.',
  regions: [
    { name: 'leaves', role: 'body', pixels: [
      [3, 1], [4, 1], [9, 0], [10, 0], [12, 1], [13, 1],
      [2, 2], [3, 2], [4, 2], [5, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],
      [1, 3], [2, 3], [3, 3], [6, 3], [7, 3], [8, 3], [10, 3], [11, 3], [13, 3],
      [1, 4], [2, 4], [4, 4], [5, 4], [6, 4], [9, 4], [10, 4], [12, 4], [13, 4],
      [2, 5], [3, 5], [5, 5], [6, 5], [7, 5], [8, 5], [10, 5], [11, 5],
      [1, 6], [2, 6], [4, 6], [5, 6], [7, 6], [8, 6], [9, 6], [11, 6], [12, 6],
      [2, 7], [3, 7], [6, 7], [7, 7], [9, 7], [10, 7], [12, 7], [13, 7],
      [1, 8], [2, 8], [5, 8], [6, 8], [8, 8], [9, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [7, 9], [8, 9], [10, 9], [11, 9],
      [2, 10], [3, 10], [6, 10], [7, 10], [9, 10], [12, 10],
    ]},
    { name: 'vines', role: 'arm', pixels: [[4, 0], [3, 3], [7, 4], [11, 5], [3, 6], [8, 7], [4, 8], [10, 8]] },
    { name: 'berries', role: 'accessory', pixels: [[5, 3], [9, 5], [3, 8], [11, 9]] },
    { name: 'dew', role: 'eye', pixels: [[6, 4], [10, 2], [2, 6]] },
  ],
};

// Color schemes
const greenPlant = {
  hair: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  head: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  face: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  eye:  { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  arm:  { shadow: '#346524', base: '#346524', highlight: '#6daa2c' },
  hand: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg:  { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
};

export const HERB_16_COLORS: ColorScheme = {
  name: 'herb_default',
  mapping: {
    ...greenPlant,
    accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    leg: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  },
};

export const CACTUS_16_COLORS: ColorScheme = {
  name: 'cactus_default',
  mapping: {
    ...greenPlant,
    body: { shadow: '#346524', base: '#6daa2c', highlight: '#deeed6' },
    belt: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    boot: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#deeed6' },
  },
};

export const WHEAT_16_COLORS: ColorScheme = {
  name: 'wheat_default',
  mapping: {
    ...greenPlant,
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  },
};

export const SUNFLOWER_16_COLORS: ColorScheme = {
  name: 'sunflower_default',
  mapping: {
    ...greenPlant,
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
    eye: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  },
};

export const ROSE_16_COLORS: ColorScheme = {
  name: 'rose_default',
  mapping: {
    ...greenPlant,
    accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    leg: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  },
};

export const FERN_16_COLORS: ColorScheme = {
  name: 'fern_default',
  mapping: {
    ...greenPlant,
    arm: { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },
    leg: { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },
  },
};

export const VINE_16_COLORS: ColorScheme = {
  name: 'vine_default',
  mapping: {
    ...greenPlant,
    head: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#deeed6' },
  },
};

export const SAPLING_16_COLORS: ColorScheme = {
  name: 'sapling_default',
  mapping: {
    ...greenPlant,
    head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
  },
};

export const CORN_16_COLORS: ColorScheme = {
  name: 'corn_default',
  mapping: {
    ...greenPlant,
    head: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  },
};

export const IVY_16_COLORS: ColorScheme = {
  name: 'ivy_default',
  mapping: {
    ...greenPlant,
    body: { shadow: '#346524', base: '#6daa2c', highlight: '#deeed6' },
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  },
};

export const PLANT_TEMPLATES: Record<string, SpriteTemplate> = {
  herb_16: HERB_16,
  cactus_16: CACTUS_16,
  wheat_16: WHEAT_16,
  sunflower_16: SUNFLOWER_16,
  rose_16: ROSE_16,
  fern_16: FERN_16,
  vine_16: VINE_16,
  sapling_16: SAPLING_16,
  corn_16: CORN_16,
  ivy_16: IVY_16,
};

export const PLANT_COLOR_SCHEMES: Record<string, ColorScheme> = {
  herb_default: HERB_16_COLORS,
  cactus_default: CACTUS_16_COLORS,
  wheat_default: WHEAT_16_COLORS,
  sunflower_default: SUNFLOWER_16_COLORS,
  rose_default: ROSE_16_COLORS,
  fern_default: FERN_16_COLORS,
  vine_default: VINE_16_COLORS,
  sapling_default: SAPLING_16_COLORS,
  corn_default: CORN_16_COLORS,
  ivy_default: IVY_16_COLORS,
};
