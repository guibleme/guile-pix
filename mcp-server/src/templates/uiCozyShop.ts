import { SpriteTemplate, ColorScheme } from './humanoid16.js';

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

const COZY_BASE = {
  hair: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  face: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hand: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  belt: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  leg: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof COZY_BASE>): ColorScheme {
  return { name, mapping: { ...COZY_BASE, ...overrides } };
}

export const STORE_SIGN_UI_16: SpriteTemplate = {
  name: 'store_sign_ui_16', width: 16, height: 16,
  description: 'Cozy game store hanging sign with frame and glowing lettering.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...hLine(3, 2, 13), ...hLine(10, 2, 13), ...vLine(2, 4, 9), ...vLine(13, 4, 9)] },
    { name: 'board', role: 'body', pixels: [...rect(3, 4, 12, 9)] },
    { name: 'letters', role: 'eye', pixels: [[4, 6], [5, 6], [7, 6], [8, 6], [10, 6], [11, 6], [6, 7], [9, 7]] },
    { name: 'hooks', role: 'arm', pixels: [[4, 2], [11, 2], [4, 1], [11, 1]] },
    { name: 'ornaments', role: 'accessory', pixels: [[3, 3], [12, 3], [3, 10], [12, 10]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(11, 3, 12)] },
  ],
};

export const CHECKOUT_REGISTER_UI_16: SpriteTemplate = {
  name: 'checkout_register_ui_16', width: 16, height: 16,
  description: 'Cash register UI icon with screen, keypad, and receipt roll.',
  regions: [
    { name: 'body', role: 'head', pixels: [...rect(3, 6, 12, 11)] },
    { name: 'screen', role: 'body', pixels: [...rect(4, 4, 8, 6)] },
    { name: 'keypad', role: 'arm', pixels: [[9, 8], [10, 8], [11, 8], [9, 9], [10, 9], [11, 9], [9, 10], [10, 10], [11, 10]] },
    { name: 'display_glow', role: 'eye', pixels: [[5, 5], [6, 5], [7, 5]] },
    { name: 'receipt_roll', role: 'accessory', pixels: [[9, 4], [10, 4], [11, 4], [10, 5], [11, 5], [11, 6]] },
    { name: 'base_shadow', role: 'boot', pixels: [...hLine(12, 3, 12)] },
  ],
};

export const RECEIPT_UI_16: SpriteTemplate = {
  name: 'receipt_ui_16', width: 16, height: 16,
  description: 'Receipt slip with totals and approval stamp.',
  regions: [
    { name: 'paper', role: 'face', pixels: [...rect(5, 2, 10, 12)] },
    { name: 'paper_edge', role: 'head', pixels: [...hLine(2, 5, 10), ...vLine(5, 3, 12), ...vLine(10, 3, 12), ...hLine(12, 5, 10)] },
    { name: 'text_rows', role: 'arm', pixels: [[6, 4], [7, 4], [8, 4], [6, 6], [7, 6], [8, 6], [6, 8], [7, 8], [8, 8], [6, 10], [7, 10]] },
    { name: 'stamp', role: 'accessory', pixels: [[8, 11], [9, 11], [8, 12], [9, 12]] },
    { name: 'shine', role: 'eye', pixels: [[6, 3], [6, 5]] },
    { name: 'shadow', role: 'boot', pixels: [[6, 13], [7, 13], [8, 13], [9, 13]] },
  ],
};

export const SHELF_GRID_UI_16: SpriteTemplate = {
  name: 'shelf_grid_ui_16', width: 16, height: 16,
  description: 'Shelf inventory grid for boxed games in a cozy store sim.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...hLine(3, 2, 13), ...hLine(12, 2, 13), ...vLine(2, 4, 11), ...vLine(13, 4, 11)] },
    { name: 'slots', role: 'body', pixels: [...rect(3, 4, 12, 11)] },
    { name: 'dividers', role: 'arm', pixels: [...vLine(6, 4, 11), ...vLine(9, 4, 11), ...hLine(7, 3, 12)] },
    { name: 'labels', role: 'accessory', pixels: [[4, 5], [7, 5], [10, 5], [4, 9], [7, 9], [10, 9]] },
    { name: 'active', role: 'eye', pixels: [[10, 8], [11, 8], [10, 9], [11, 9]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(13, 3, 12)] },
  ],
};

export const PRICE_TAG_UI_16: SpriteTemplate = {
  name: 'price_tag_ui_16', width: 16, height: 16,
  description: 'Price tag icon with punched hole and discount stripe.',
  regions: [
    { name: 'tag_body', role: 'body', pixels: [...rect(4, 5, 11, 10)] },
    { name: 'outline', role: 'head', pixels: [...hLine(4, 4, 11), ...hLine(10, 4, 11), ...vLine(4, 6, 9), ...vLine(11, 6, 9)] },
    { name: 'stripe', role: 'accessory', pixels: [[5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7]] },
    { name: 'hole', role: 'belt', pixels: [[5, 5]] },
    { name: 'numbers', role: 'eye', pixels: [[8, 8], [9, 8], [8, 9]] },
    { name: 'string', role: 'arm', pixels: [[3, 4], [4, 4]] },
  ],
};

export const SALE_BADGE_UI_16: SpriteTemplate = {
  name: 'sale_badge_ui_16', width: 16, height: 16,
  description: 'Sale burst badge with center text and ribbon tails.',
  regions: [
    { name: 'burst', role: 'accessory', pixels: [[7, 1], [8, 1], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [4, 3], [11, 3], [3, 4], [12, 4], [3, 5], [12, 5], [4, 6], [11, 6], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7]] },
    { name: 'center', role: 'body', pixels: [...rect(5, 3, 10, 6)] },
    { name: 'text', role: 'eye', pixels: [[6, 4], [7, 4], [8, 4], [9, 4], [7, 5], [8, 5]] },
    { name: 'ribbon', role: 'belt', pixels: [[6, 8], [7, 8], [8, 8], [9, 8], [7, 9], [8, 9]] },
    { name: 'shine', role: 'arm', pixels: [[5, 3], [6, 3], [5, 4]] },
    { name: 'shadow', role: 'boot', pixels: [[6, 10], [7, 10], [8, 10], [9, 10]] },
  ],
};

export const CUSTOMER_PATIENCE_UI_16: SpriteTemplate = {
  name: 'customer_patience_ui_16', width: 16, height: 16,
  description: 'Customer patience meter with heart and time bar.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...hLine(5, 2, 13), ...hLine(10, 2, 13), ...vLine(2, 6, 9), ...vLine(13, 6, 9)] },
    { name: 'bar_fill', role: 'body', pixels: [...rect(3, 6, 10, 9)] },
    { name: 'depleted', role: 'belt', pixels: [...rect(11, 6, 12, 9)] },
    { name: 'heart', role: 'accessory', pixels: [[4, 3], [5, 3], [6, 3], [4, 4], [5, 4], [6, 4], [5, 5]] },
    { name: 'pulse', role: 'eye', pixels: [[7, 7], [8, 7], [9, 7]] },
    { name: 'ticks', role: 'arm', pixels: [[5, 9], [8, 9], [11, 9]] },
  ],
};

export const RESTOCK_CRATE_UI_16: SpriteTemplate = {
  name: 'restock_crate_ui_16', width: 16, height: 16,
  description: 'Restock crate with arrow marker and item slots.',
  regions: [
    { name: 'crate', role: 'head', pixels: [...rect(3, 5, 12, 12)] },
    { name: 'inside', role: 'body', pixels: [...rect(4, 6, 11, 11)] },
    { name: 'slats', role: 'arm', pixels: [...vLine(6, 6, 11), ...vLine(9, 6, 11), ...hLine(8, 4, 11)] },
    { name: 'arrow', role: 'eye', pixels: [[7, 3], [8, 3], [9, 3], [8, 2], [8, 4]] },
    { name: 'label', role: 'accessory', pixels: [[4, 11], [5, 11], [6, 11]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(13, 3, 12)] },
  ],
};

export const GAME_BOX_UI_16: SpriteTemplate = {
  name: 'game_box_ui_16', width: 16, height: 16,
  description: 'Boxed game case icon with spine and cover art block.',
  regions: [
    { name: 'case', role: 'head', pixels: [...rect(4, 3, 11, 12)] },
    { name: 'cover', role: 'body', pixels: [...rect(5, 4, 10, 11)] },
    { name: 'spine', role: 'belt', pixels: [...vLine(4, 4, 11)] },
    { name: 'art', role: 'accessory', pixels: [[6, 6], [7, 6], [8, 6], [6, 7], [8, 7], [7, 8]] },
    { name: 'logo', role: 'eye', pixels: [[6, 5], [7, 5]] },
    { name: 'gloss', role: 'arm', pixels: [[9, 4], [10, 5], [10, 6]] },
  ],
};

export const CARTRIDGE_UI_16: SpriteTemplate = {
  name: 'cartridge_ui_16', width: 16, height: 16,
  description: 'Retro cartridge icon with label area and notch.',
  regions: [
    { name: 'shell', role: 'head', pixels: [...rect(4, 4, 11, 11)] },
    { name: 'label', role: 'body', pixels: [...rect(5, 5, 10, 8)] },
    { name: 'label_mark', role: 'accessory', pixels: [[6, 6], [7, 6], [8, 6], [9, 6]] },
    { name: 'notch', role: 'belt', pixels: [[7, 11], [8, 11]] },
    { name: 'shine', role: 'eye', pixels: [[6, 5], [6, 6]] },
    { name: 'pins', role: 'arm', pixels: [[5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10]] },
  ],
};

export const CONTROLLER_UI_16: SpriteTemplate = {
  name: 'controller_ui_16', width: 16, height: 16,
  description: 'Gamepad icon with d-pad and colorful face buttons.',
  regions: [
    { name: 'shell', role: 'head', pixels: [...hLine(5, 4, 11), ...hLine(6, 3, 12), ...hLine(7, 2, 13), ...hLine(8, 2, 13), ...hLine(9, 3, 12)] },
    { name: 'grips', role: 'body', pixels: [[3, 8], [4, 8], [11, 8], [12, 8], [3, 9], [4, 9], [11, 9], [12, 9], [4, 10], [11, 10]] },
    { name: 'dpad', role: 'belt', pixels: [[5, 7], [6, 7], [7, 7], [6, 6], [6, 8]] },
    { name: 'buttons', role: 'accessory', pixels: [[9, 6], [10, 7], [9, 8], [8, 7]] },
    { name: 'lights', role: 'eye', pixels: [[8, 7], [9, 6]] },
    { name: 'sticks', role: 'arm', pixels: [[6, 9], [9, 9]] },
  ],
};

export const LOYALTY_CARD_UI_16: SpriteTemplate = {
  name: 'loyalty_card_ui_16', width: 16, height: 16,
  description: 'Membership/loyalty card with chip, name line, and star points.',
  regions: [
    { name: 'card', role: 'head', pixels: [...rect(3, 4, 12, 11)] },
    { name: 'fill', role: 'body', pixels: [...rect(4, 5, 11, 10)] },
    { name: 'chip', role: 'belt', pixels: [[5, 6], [6, 6], [5, 7], [6, 7]] },
    { name: 'name_line', role: 'arm', pixels: [[7, 6], [8, 6], [9, 6], [10, 6], [7, 8], [8, 8], [9, 8]] },
    { name: 'stars', role: 'accessory', pixels: [[6, 10], [8, 10], [10, 10]] },
    { name: 'shine', role: 'eye', pixels: [[4, 5], [5, 5]] },
  ],
};

export const DAILY_GOAL_UI_16: SpriteTemplate = {
  name: 'daily_goal_ui_16', width: 16, height: 16,
  description: 'Daily goal board with checklist rows and reward star.',
  regions: [
    { name: 'board', role: 'head', pixels: [...rect(3, 2, 12, 13)] },
    { name: 'paper', role: 'face', pixels: [...rect(4, 3, 11, 12)] },
    { name: 'rows', role: 'arm', pixels: [[6, 5], [7, 5], [8, 5], [6, 7], [7, 7], [8, 7], [6, 9], [7, 9], [8, 9]] },
    { name: 'checks', role: 'leg', pixels: [[5, 5], [5, 7], [5, 9]] },
    { name: 'reward_star', role: 'accessory', pixels: [[8, 11], [7, 12], [8, 12], [9, 12], [8, 13]] },
    { name: 'pin', role: 'eye', pixels: [[7, 2], [8, 2]] },
  ],
};

export const STORE_SIGN_UI_COLORS = scheme('store_sign_ui_default', { head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' } });
export const CHECKOUT_REGISTER_UI_COLORS = scheme('checkout_register_ui_default', { head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, arm: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' } });
export const RECEIPT_UI_COLORS = scheme('receipt_ui_default', { face: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' }, head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' } });
export const SHELF_GRID_UI_COLORS = scheme('shelf_grid_ui_default', { head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' } });
export const PRICE_TAG_UI_COLORS = scheme('price_tag_ui_default', { body: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' }, head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, eye: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' } });
export const SALE_BADGE_UI_COLORS = scheme('sale_badge_ui_default', { accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, body: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' } });
export const CUSTOMER_PATIENCE_UI_COLORS = scheme('customer_patience_ui_default', { body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, belt: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' } });
export const RESTOCK_CRATE_UI_COLORS = scheme('restock_crate_ui_default', { head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, body: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' }, eye: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' } });
export const GAME_BOX_UI_COLORS = scheme('game_box_ui_default', { head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' } });
export const CARTRIDGE_UI_COLORS = scheme('cartridge_ui_default', { head: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' } });
export const CONTROLLER_UI_COLORS = scheme('controller_ui_default', { head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, body: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' } });
export const LOYALTY_CARD_UI_COLORS = scheme('loyalty_card_ui_default', { head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' }, accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' } });
export const DAILY_GOAL_UI_COLORS = scheme('daily_goal_ui_default', { head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, face: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' }, accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, leg: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' } });

export const COZY_SHOP_UI_TEMPLATES: Record<string, SpriteTemplate> = {
  store_sign_ui_16: STORE_SIGN_UI_16,
  checkout_register_ui_16: CHECKOUT_REGISTER_UI_16,
  receipt_ui_16: RECEIPT_UI_16,
  shelf_grid_ui_16: SHELF_GRID_UI_16,
  price_tag_ui_16: PRICE_TAG_UI_16,
  sale_badge_ui_16: SALE_BADGE_UI_16,
  customer_patience_ui_16: CUSTOMER_PATIENCE_UI_16,
  restock_crate_ui_16: RESTOCK_CRATE_UI_16,
  game_box_ui_16: GAME_BOX_UI_16,
  cartridge_ui_16: CARTRIDGE_UI_16,
  controller_ui_16: CONTROLLER_UI_16,
  loyalty_card_ui_16: LOYALTY_CARD_UI_16,
  daily_goal_ui_16: DAILY_GOAL_UI_16,
};

export const COZY_SHOP_UI_COLOR_SCHEMES: Record<string, ColorScheme> = {
  store_sign_ui_default: STORE_SIGN_UI_COLORS,
  checkout_register_ui_default: CHECKOUT_REGISTER_UI_COLORS,
  receipt_ui_default: RECEIPT_UI_COLORS,
  shelf_grid_ui_default: SHELF_GRID_UI_COLORS,
  price_tag_ui_default: PRICE_TAG_UI_COLORS,
  sale_badge_ui_default: SALE_BADGE_UI_COLORS,
  customer_patience_ui_default: CUSTOMER_PATIENCE_UI_COLORS,
  restock_crate_ui_default: RESTOCK_CRATE_UI_COLORS,
  game_box_ui_default: GAME_BOX_UI_COLORS,
  cartridge_ui_default: CARTRIDGE_UI_COLORS,
  controller_ui_default: CONTROLLER_UI_COLORS,
  loyalty_card_ui_default: LOYALTY_CARD_UI_COLORS,
  daily_goal_ui_default: DAILY_GOAL_UI_COLORS,
};
