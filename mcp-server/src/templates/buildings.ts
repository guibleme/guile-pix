/**
 * 16x16 building and structure templates.
 * Quality pass: cleaner silhouettes, better depth cues, stronger icon readability.
 */
import { SpriteTemplate, ColorScheme } from './humanoid16.js';

type Pixel = [number, number];

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

export const HOUSE_16: SpriteTemplate = {
  name: 'house_16', width: 16, height: 16,
  description: 'Cozy cottage with broad roof, centered door, paired windows, and chimney.',
  regions: [
    { name: 'chimney', role: 'accessory', pixels: [[11, 1], [12, 1], [11, 2], [12, 2], [11, 3], [12, 3]] },
    { name: 'roof', role: 'head', pixels: [
      ...hLine(2, 7, 8),
      ...hLine(3, 6, 9),
      ...hLine(4, 5, 10),
      ...hLine(5, 4, 11),
      ...hLine(6, 3, 12),
      ...hLine(7, 2, 13),
    ]},
    { name: 'walls', role: 'body', pixels: [
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
      ...hLine(10, 3, 12),
      ...hLine(11, 3, 12),
      ...hLine(12, 3, 12),
      ...hLine(13, 3, 12),
    ]},
    { name: 'door', role: 'belt', pixels: [[7, 10], [8, 10], [7, 11], [8, 11], [7, 12], [8, 12], [7, 13], [8, 13]] },
    { name: 'windows', role: 'eye', pixels: [[5, 9], [6, 9], [5, 10], [6, 10], [10, 9], [11, 9], [10, 10], [11, 10]] },
    { name: 'timber_trim', role: 'arm', pixels: [[4, 11], [5, 11], [10, 11], [11, 11], [6, 12], [9, 12]] },
    { name: 'foundation', role: 'boot', pixels: [...hLine(14, 2, 13)] },
  ],
};

export const SHOP_16: SpriteTemplate = {
  name: 'shop_16', width: 16, height: 16,
  description: 'Village shop with hanging sign, striped awning, display window, and front door.',
  regions: [
    { name: 'sign', role: 'accessory', pixels: [[4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2]] },
    { name: 'sign_hook', role: 'arm', pixels: [[7, 3]] },
    { name: 'awning', role: 'head', pixels: [...hLine(4, 2, 13), ...hLine(5, 2, 13), ...hLine(6, 3, 12)] },
    { name: 'awning_stripes', role: 'arm', pixels: [[3, 6], [5, 6], [7, 6], [9, 6], [11, 6], [13, 6], [4, 5], [6, 5], [8, 5], [10, 5], [12, 5]] },
    { name: 'walls', role: 'body', pixels: [
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
      ...hLine(10, 3, 12),
      ...hLine(11, 3, 12),
      ...hLine(12, 3, 12),
      ...hLine(13, 3, 12),
    ]},
    { name: 'display_window', role: 'eye', pixels: [[4, 8], [5, 8], [6, 8], [4, 9], [5, 9], [6, 9], [4, 10], [5, 10], [6, 10]] },
    { name: 'goods_shelf', role: 'accessory', pixels: [[10, 9], [11, 9], [10, 10], [11, 10]] },
    { name: 'door', role: 'belt', pixels: [[8, 10], [9, 10], [8, 11], [9, 11], [8, 12], [9, 12], [8, 13], [9, 13]] },
    { name: 'foundation', role: 'boot', pixels: [...hLine(14, 2, 13)] },
  ],
};

export const TOWER_16: SpriteTemplate = {
  name: 'tower_16', width: 16, height: 16,
  description: 'Stone watchtower with battlements, banner flag, slit window, and heavy plinth.',
  regions: [
    { name: 'flag', role: 'accessory', pixels: [[10, 0], [11, 0], [10, 1], [11, 1]] },
    { name: 'flagpole', role: 'arm', pixels: [[9, 0], [9, 1], [9, 2]] },
    { name: 'crenellations', role: 'head', pixels: [[5, 2], [6, 2], [8, 2], [9, 2], [11, 2], ...hLine(3, 5, 11)] },
    { name: 'tower_body', role: 'body', pixels: [
      ...hLine(4, 5, 11),
      ...hLine(5, 5, 11),
      ...hLine(6, 5, 11),
      ...hLine(7, 5, 11),
      ...hLine(8, 5, 11),
      ...hLine(9, 5, 11),
      ...hLine(10, 5, 11),
      ...hLine(11, 5, 11),
      ...hLine(12, 5, 11),
      ...hLine(13, 5, 11),
    ]},
    { name: 'masonry', role: 'arm', pixels: [[6, 5], [8, 5], [10, 5], [7, 7], [9, 7], [6, 9], [8, 9], [10, 9], [7, 11], [9, 11]] },
    { name: 'arrow_slit', role: 'eye', pixels: [[8, 8]] },
    { name: 'shadow_side', role: 'belt', pixels: [[10, 4], [11, 4], [10, 5], [11, 5], [10, 6], [11, 6], [10, 7], [11, 7], [10, 8], [11, 8], [10, 9], [11, 9], [10, 10], [11, 10], [10, 11], [11, 11], [10, 12], [11, 12], [10, 13], [11, 13]] },
    { name: 'foundation', role: 'boot', pixels: [...hLine(14, 4, 12)] },
  ],
};

export const WINDMILL_16: SpriteTemplate = {
  name: 'windmill_16', width: 16, height: 16,
  description: 'Classic windmill with cross blades, conical roof, tapered shaft, and stone base.',
  regions: [
    { name: 'blades', role: 'accessory', pixels: [
      [8, 0], [8, 1], [8, 2],
      [5, 3], [6, 3], [7, 3],
      [9, 3], [10, 3], [11, 3],
      [8, 4], [8, 5], [8, 6],
      [6, 1], [7, 2], [9, 2], [10, 1],
    ]},
    { name: 'hub', role: 'eye', pixels: [[8, 3]] },
    { name: 'roof_cap', role: 'head', pixels: [[6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [7, 7], [8, 7], [9, 7]] },
    { name: 'tower_body', role: 'body', pixels: [
      ...hLine(8, 6, 10),
      ...hLine(9, 6, 10),
      ...hLine(10, 6, 10),
      ...hLine(11, 7, 9),
      ...hLine(12, 7, 9),
      ...hLine(13, 7, 9),
    ]},
    { name: 'door', role: 'belt', pixels: [[7, 12], [8, 12], [7, 13], [8, 13]] },
    { name: 'window', role: 'eye', pixels: [[8, 9]] },
    { name: 'timber', role: 'arm', pixels: [[6, 10], [9, 10], [7, 11], [8, 11]] },
    { name: 'base', role: 'boot', pixels: [...hLine(14, 4, 11)] },
  ],
};

export const BRIDGE_16: SpriteTemplate = {
  name: 'bridge_16', width: 16, height: 16,
  description: 'Stone-and-wood bridge with rails, plank deck, central arch, and water below.',
  regions: [
    { name: 'railing', role: 'head', pixels: [...hLine(5, 2, 13), [2, 6], [13, 6]] },
    { name: 'deck', role: 'body', pixels: [...hLine(7, 2, 13), ...hLine(8, 2, 13)] },
    { name: 'planks', role: 'arm', pixels: [[3, 7], [5, 7], [7, 7], [9, 7], [11, 7], [13, 7]] },
    { name: 'arch', role: 'belt', pixels: [
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [3, 10], [4, 10], [11, 10], [12, 10],
      [2, 11], [3, 11], [12, 11], [13, 11],
    ]},
    { name: 'supports', role: 'boot', pixels: [...vLine(1, 8, 14), ...vLine(14, 8, 14)] },
    { name: 'water', role: 'eye', pixels: [
      ...hLine(12, 4, 11),
      ...hLine(13, 4, 11),
      ...hLine(14, 5, 10),
    ]},
  ],
};

export const GATE_16: SpriteTemplate = {
  name: 'gate_16', width: 16, height: 16,
  description: 'Castle gate with twin towers, arched entrance, and iron portcullis.',
  regions: [
    { name: 'towers', role: 'body', pixels: [
      ...hLine(2, 2, 4), ...hLine(2, 11, 13),
      ...hLine(3, 2, 4), ...hLine(3, 11, 13),
      ...hLine(4, 2, 4), ...hLine(4, 11, 13),
      ...hLine(5, 2, 4), ...hLine(5, 11, 13),
      ...hLine(6, 2, 4), ...hLine(6, 11, 13),
      ...hLine(7, 2, 4), ...hLine(7, 11, 13),
      ...hLine(8, 2, 4), ...hLine(8, 11, 13),
      ...hLine(9, 2, 4), ...hLine(9, 11, 13),
      ...hLine(10, 2, 4), ...hLine(10, 11, 13),
      ...hLine(11, 2, 4), ...hLine(11, 11, 13),
      ...hLine(12, 2, 4), ...hLine(12, 11, 13),
    ]},
    { name: 'crenellations', role: 'head', pixels: [[2, 1], [3, 1], [11, 1], [12, 1], [2, 2], [4, 2], [11, 2], [13, 2]] },
    { name: 'arch_frame', role: 'arm', pixels: [[5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [5, 5], [10, 5]] },
    { name: 'portcullis', role: 'belt', pixels: [
      ...hLine(6, 6, 9),
      ...hLine(8, 6, 9),
      ...hLine(10, 6, 9),
      ...vLine(6, 6, 10), ...vLine(7, 6, 10), ...vLine(8, 6, 10), ...vLine(9, 6, 10),
    ]},
    { name: 'torches', role: 'eye', pixels: [[5, 7], [10, 7], [5, 8], [10, 8]] },
    { name: 'banners', role: 'accessory', pixels: [[3, 4], [3, 5], [12, 4], [12, 5]] },
    { name: 'foundation', role: 'boot', pixels: [...hLine(13, 1, 14)] },
  ],
};

// Color schemes
const buildingBase = {
  hair: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  face: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  eye:  { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  body: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hand: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg:  { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
};

export const HOUSE_16_COLORS: ColorScheme = {
  name: 'house_default',
  mapping: {
    ...buildingBase,
    head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
    body: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    arm: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  },
};

export const SHOP_16_COLORS: ColorScheme = {
  name: 'shop_default',
  mapping: {
    ...buildingBase,
    head: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    body: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
    accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const TOWER_16_COLORS: ColorScheme = {
  name: 'tower_default',
  mapping: {
    ...buildingBase,
    head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    body: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
    arm: { shadow: '#30346d', base: '#4e4a4e', highlight: '#8595a1' },
    belt: { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  },
};

export const WINDMILL_16_COLORS: ColorScheme = {
  name: 'windmill_default',
  mapping: {
    ...buildingBase,
    head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
    arm: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  },
};

export const BRIDGE_16_COLORS: ColorScheme = {
  name: 'bridge_default',
  mapping: {
    ...buildingBase,
    head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    arm: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    eye: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  },
};

export const GATE_16_COLORS: ColorScheme = {
  name: 'gate_default',
  mapping: {
    ...buildingBase,
    head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    body: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    arm: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    belt: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#8595a1' },
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  },
};

export const BUILDING_TEMPLATES: Record<string, SpriteTemplate> = {
  house_16: HOUSE_16,
  shop_16: SHOP_16,
  tower_16: TOWER_16,
  windmill_16: WINDMILL_16,
  bridge_16: BRIDGE_16,
  gate_16: GATE_16,
};

export const BUILDING_COLOR_SCHEMES: Record<string, ColorScheme> = {
  house_default: HOUSE_16_COLORS,
  shop_default: SHOP_16_COLORS,
  tower_default: TOWER_16_COLORS,
  windmill_default: WINDMILL_16_COLORS,
  bridge_default: BRIDGE_16_COLORS,
  gate_default: GATE_16_COLORS,
};
