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

const RPG_BASE = {
  hair: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  face: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  hand: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof RPG_BASE>): ColorScheme {
  return { name, mapping: { ...RPG_BASE, ...overrides } };
}

export const PARTY_STATUS_PANEL_16: SpriteTemplate = {
  name: 'party_status_panel_16', width: 16, height: 16,
  description: 'RPG party panel with 3 portraits and mini HP bars.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...rect(1, 3, 14, 12)] },
    { name: 'panel_bg', role: 'body', pixels: [...rect(2, 4, 13, 11)] },
    { name: 'portraits', role: 'face', pixels: [...rect(3, 5, 5, 7), ...rect(7, 5, 9, 7), ...rect(11, 5, 13, 7)] },
    { name: 'hp_bars', role: 'leg', pixels: [...hLine(9, 3, 5), ...hLine(9, 7, 9), ...hLine(9, 11, 13)] },
    { name: 'mana_dots', role: 'eye', pixels: [[4, 10], [8, 10], [12, 10]] },
    { name: 'dividers', role: 'arm', pixels: [...vLine(6, 5, 10), ...vLine(10, 5, 10)] },
  ],
};

export const SKILL_NODE_UI_16: SpriteTemplate = {
  name: 'skill_node_ui_16', width: 16, height: 16,
  description: 'Skill tree node with ring, center rune, and branch links.',
  regions: [
    { name: 'ring', role: 'head', pixels: [...hLine(3, 6, 9), ...hLine(4, 5, 10), ...hLine(5, 4, 11), ...hLine(6, 4, 11), ...hLine(7, 4, 11), ...hLine(8, 4, 11), ...hLine(9, 5, 10), ...hLine(10, 6, 9)] },
    { name: 'core', role: 'body', pixels: [...rect(6, 5, 9, 8)] },
    { name: 'rune', role: 'eye', pixels: [[7, 6], [8, 6], [7, 7]] },
    { name: 'links', role: 'arm', pixels: [[2, 7], [3, 7], [4, 7], [11, 7], [12, 7], [13, 7], [7, 2], [7, 3], [7, 4], [7, 10], [7, 11], [7, 12]] },
    { name: 'active_glow', role: 'accessory', pixels: [[6, 4], [9, 4], [6, 9], [9, 9]] },
    { name: 'shadow', role: 'boot', pixels: [[6, 11], [7, 11], [8, 11], [9, 11]] },
  ],
};

export const CAST_BAR_UI_16: SpriteTemplate = {
  name: 'cast_bar_ui_16', width: 16, height: 16,
  description: 'Spell cast bar with progress fill and rune marker.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...hLine(5, 1, 14), ...hLine(10, 1, 14), ...vLine(1, 6, 9), ...vLine(14, 6, 9)] },
    { name: 'fill', role: 'body', pixels: [...rect(2, 6, 10, 9)] },
    { name: 'depleted', role: 'belt', pixels: [...rect(11, 6, 13, 9)] },
    { name: 'spark', role: 'eye', pixels: [[10, 6], [10, 7], [11, 7]] },
    { name: 'runes', role: 'arm', pixels: [[3, 8], [5, 8], [7, 8], [9, 8], [11, 8], [13, 8]] },
    { name: 'channel_icon', role: 'accessory', pixels: [[0, 6], [0, 7], [0, 8], [0, 9]] },
  ],
};

export const COMBO_PIPS_UI_16: SpriteTemplate = {
  name: 'combo_pips_ui_16', width: 16, height: 16,
  description: 'Combo meter with five pips where first three are lit.',
  regions: [
    { name: 'track', role: 'head', pixels: [...hLine(7, 2, 13), ...hLine(8, 2, 13)] },
    { name: 'lit_pips', role: 'accessory', pixels: [[3, 7], [5, 7], [7, 7], [3, 8], [5, 8], [7, 8]] },
    { name: 'dark_pips', role: 'belt', pixels: [[9, 7], [11, 7], [9, 8], [11, 8]] },
    { name: 'pip_glow', role: 'eye', pixels: [[3, 7], [5, 7]] },
    { name: 'slash', role: 'arm', pixels: [[12, 5], [13, 4], [14, 3]] },
    { name: 'base', role: 'boot', pixels: [...hLine(9, 2, 13)] },
  ],
};

export const BOSS_WARNING_BANNER_16: SpriteTemplate = {
  name: 'boss_warning_banner_16', width: 16, height: 16,
  description: 'Boss warning banner with danger icon and title strip.',
  regions: [
    { name: 'banner', role: 'head', pixels: [...rect(1, 4, 14, 10)] },
    { name: 'fill', role: 'body', pixels: [...rect(2, 5, 13, 9)] },
    { name: 'text', role: 'accessory', pixels: [[4, 7], [5, 7], [6, 7], [8, 7], [9, 7], [10, 7], [11, 7]] },
    { name: 'danger_icon', role: 'eye', pixels: [[3, 6], [3, 7], [3, 8], [4, 8]] },
    { name: 'tails', role: 'belt', pixels: [[1, 11], [2, 11], [13, 11], [14, 11]] },
    { name: 'trim', role: 'arm', pixels: [...hLine(5, 2, 13), ...hLine(9, 2, 13)] },
  ],
};

export const LOOT_POPUP_UI_16: SpriteTemplate = {
  name: 'loot_popup_ui_16', width: 16, height: 16,
  description: 'Loot popup panel with item icon, rarity star, and amount.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...rect(2, 3, 13, 11)] },
    { name: 'popup_bg', role: 'body', pixels: [...rect(3, 4, 12, 10)] },
    { name: 'item_slot', role: 'face', pixels: [...rect(4, 5, 7, 8)] },
    { name: 'rarity', role: 'accessory', pixels: [[10, 5], [11, 5], [10, 6], [11, 6], [10, 7], [11, 7]] },
    { name: 'amount', role: 'eye', pixels: [[8, 9], [9, 9], [10, 9]] },
    { name: 'shine', role: 'arm', pixels: [[4, 4], [5, 4], [6, 4]] },
  ],
};

export const QUEST_PIN_UI_16: SpriteTemplate = {
  name: 'quest_pin_ui_16', width: 16, height: 16,
  description: 'Quest map pin with parchment badge and exclamation mark.',
  regions: [
    { name: 'pin_head', role: 'accessory', pixels: [...hLine(2, 6, 9), ...hLine(3, 5, 10), ...hLine(4, 5, 10), ...hLine(5, 6, 9)] },
    { name: 'badge', role: 'face', pixels: [...rect(6, 6, 9, 8)] },
    { name: 'mark', role: 'eye', pixels: [[7, 6], [7, 7], [7, 8]] },
    { name: 'pin_tail', role: 'belt', pixels: [[7, 9], [8, 9], [7, 10], [8, 10], [7, 11], [8, 11], [7, 12]] },
    { name: 'ring', role: 'head', pixels: [[6, 4], [7, 4], [8, 4], [9, 4]] },
    { name: 'shadow', role: 'boot', pixels: [[6, 13], [7, 13], [8, 13]] },
  ],
};

export const MINIMAP_MARKER_UI_16: SpriteTemplate = {
  name: 'minimap_marker_ui_16', width: 16, height: 16,
  description: 'Minimap marker stack with player arrow and point of interest dots.',
  regions: [
    { name: 'map_disc', role: 'head', pixels: [...hLine(3, 5, 10), ...hLine(4, 4, 11), ...hLine(5, 3, 12), ...hLine(6, 3, 12), ...hLine(7, 3, 12), ...hLine(8, 4, 11), ...hLine(9, 5, 10)] },
    { name: 'map_fill', role: 'body', pixels: [...hLine(4, 5, 10), ...hLine(5, 4, 11), ...hLine(6, 4, 11), ...hLine(7, 4, 11)] },
    { name: 'player_arrow', role: 'eye', pixels: [[7, 5], [8, 5], [7, 4]] },
    { name: 'poi_dots', role: 'accessory', pixels: [[5, 7], [9, 7], [8, 8]] },
    { name: 'grid', role: 'arm', pixels: [[6, 6], [8, 6], [7, 7]] },
    { name: 'shadow', role: 'boot', pixels: [[6, 10], [7, 10], [8, 10], [9, 10]] },
  ],
};

export const LEVELUP_BURST_UI_16: SpriteTemplate = {
  name: 'levelup_burst_ui_16', width: 16, height: 16,
  description: 'Level-up burst with star center and radial rays.',
  regions: [
    { name: 'rays', role: 'accessory', pixels: [[7, 1], [8, 1], [7, 2], [8, 2], [3, 4], [4, 4], [11, 4], [12, 4], [2, 8], [3, 8], [12, 8], [13, 8], [4, 12], [5, 12], [10, 12], [11, 12]] },
    { name: 'core', role: 'body', pixels: [...rect(5, 5, 10, 10)] },
    { name: 'star', role: 'eye', pixels: [[7, 6], [8, 6], [6, 7], [7, 7], [8, 7], [9, 7], [7, 8], [8, 8]] },
    { name: 'ring', role: 'head', pixels: [...hLine(4, 5, 10), ...hLine(11, 5, 10), ...vLine(5, 5, 10), ...vLine(10, 5, 10)] },
    { name: 'confetti', role: 'arm', pixels: [[2, 3], [13, 3], [1, 10], [14, 10], [6, 13], [9, 13]] },
    { name: 'shadow', role: 'boot', pixels: [[6, 11], [7, 11], [8, 11], [9, 11]] },
  ],
};

export const RUNE_HOTBAR_UI_16: SpriteTemplate = {
  name: 'rune_hotbar_ui_16', width: 16, height: 16,
  description: 'Rune hotbar with three slots and active magical selection.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...rect(1, 5, 14, 11)] },
    { name: 'slots', role: 'body', pixels: [...rect(2, 6, 13, 10)] },
    { name: 'slot_dividers', role: 'arm', pixels: [...vLine(6, 6, 10), ...vLine(9, 6, 10)] },
    { name: 'runes', role: 'accessory', pixels: [[4, 8], [7, 8], [10, 8], [12, 8]] },
    { name: 'active', role: 'eye', pixels: [[10, 6], [11, 6], [12, 6], [10, 7], [12, 7], [10, 8], [12, 8], [10, 9], [11, 9], [12, 9]] },
    { name: 'cooldown', role: 'belt', pixels: [[2, 9], [3, 9], [4, 9], [2, 10], [3, 10], [4, 10]] },
  ],
};

export const AFFINITY_METER_UI_16: SpriteTemplate = {
  name: 'affinity_meter_ui_16', width: 16, height: 16,
  description: 'Faction affinity meter with crest and segmented progress.',
  regions: [
    { name: 'crest', role: 'accessory', pixels: [[7, 2], [8, 2], [6, 3], [7, 3], [8, 3], [9, 3], [7, 4], [8, 4]] },
    { name: 'track', role: 'head', pixels: [...hLine(7, 2, 13), ...hLine(10, 2, 13)] },
    { name: 'fill', role: 'body', pixels: [...rect(3, 8, 10, 9)] },
    { name: 'segments', role: 'arm', pixels: [[4, 8], [6, 8], [8, 8], [10, 8], [12, 8]] },
    { name: 'marker', role: 'eye', pixels: [[10, 7], [10, 8], [10, 9], [11, 8]] },
    { name: 'base', role: 'boot', pixels: [...hLine(11, 2, 13)] },
  ],
};

export const DIALOGUE_PORTRAIT_FRAME_16: SpriteTemplate = {
  name: 'dialogue_portrait_frame_16', width: 16, height: 16,
  description: 'Dialogue portrait frame with ornate corners and text strip.',
  regions: [
    { name: 'outer_frame', role: 'head', pixels: [...rect(1, 1, 14, 12)] },
    { name: 'portrait_area', role: 'face', pixels: [...rect(2, 2, 13, 9)] },
    { name: 'text_strip', role: 'body', pixels: [...rect(2, 10, 13, 11)] },
    { name: 'corner_gems', role: 'accessory', pixels: [[1, 1], [14, 1], [1, 12], [14, 12]] },
    { name: 'name_text', role: 'arm', pixels: [[4, 10], [5, 10], [6, 10], [8, 10], [9, 10], [10, 10]] },
    { name: 'highlight', role: 'eye', pixels: [[3, 2], [4, 2], [3, 3]] },
  ],
};

export const PARTY_STATUS_PANEL_COLORS = scheme('party_status_panel_default', { head: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, body: { shadow: '#30346d', base: '#442434', highlight: '#597dce' }, face: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, leg: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' } });
export const SKILL_NODE_UI_COLORS = scheme('skill_node_ui_default', { head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, body: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' } });
export const CAST_BAR_UI_COLORS = scheme('cast_bar_ui_default', { body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' } });
export const COMBO_PIPS_UI_COLORS = scheme('combo_pips_ui_default', { accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, belt: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' } });
export const BOSS_WARNING_BANNER_COLORS = scheme('boss_warning_banner_default', { head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, body: { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' }, accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' } });
export const LOOT_POPUP_UI_COLORS = scheme('loot_popup_ui_default', { head: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, body: { shadow: '#30346d', base: '#442434', highlight: '#597dce' }, face: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' } });
export const QUEST_PIN_UI_COLORS = scheme('quest_pin_ui_default', { accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, face: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' }, belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' } });
export const MINIMAP_MARKER_UI_COLORS = scheme('minimap_marker_ui_default', { head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' } });
export const LEVELUP_BURST_UI_COLORS = scheme('levelup_burst_ui_default', { accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, body: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' } });
export const RUNE_HOTBAR_UI_COLORS = scheme('rune_hotbar_ui_default', { head: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, body: { shadow: '#30346d', base: '#442434', highlight: '#597dce' }, accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' } });
export const AFFINITY_METER_UI_COLORS = scheme('affinity_meter_ui_default', { accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, head: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' } });
export const DIALOGUE_PORTRAIT_FRAME_COLORS = scheme('dialogue_portrait_frame_default', { head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, face: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' }, accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' } });

export const RPG_UI_VARIETY_TEMPLATES: Record<string, SpriteTemplate> = {
  party_status_panel_16: PARTY_STATUS_PANEL_16,
  skill_node_ui_16: SKILL_NODE_UI_16,
  cast_bar_ui_16: CAST_BAR_UI_16,
  combo_pips_ui_16: COMBO_PIPS_UI_16,
  boss_warning_banner_16: BOSS_WARNING_BANNER_16,
  loot_popup_ui_16: LOOT_POPUP_UI_16,
  quest_pin_ui_16: QUEST_PIN_UI_16,
  minimap_marker_ui_16: MINIMAP_MARKER_UI_16,
  levelup_burst_ui_16: LEVELUP_BURST_UI_16,
  rune_hotbar_ui_16: RUNE_HOTBAR_UI_16,
  affinity_meter_ui_16: AFFINITY_METER_UI_16,
  dialogue_portrait_frame_16: DIALOGUE_PORTRAIT_FRAME_16,
};

export const RPG_UI_VARIETY_COLOR_SCHEMES: Record<string, ColorScheme> = {
  party_status_panel_default: PARTY_STATUS_PANEL_COLORS,
  skill_node_ui_default: SKILL_NODE_UI_COLORS,
  cast_bar_ui_default: CAST_BAR_UI_COLORS,
  combo_pips_ui_default: COMBO_PIPS_UI_COLORS,
  boss_warning_banner_default: BOSS_WARNING_BANNER_COLORS,
  loot_popup_ui_default: LOOT_POPUP_UI_COLORS,
  quest_pin_ui_default: QUEST_PIN_UI_COLORS,
  minimap_marker_ui_default: MINIMAP_MARKER_UI_COLORS,
  levelup_burst_ui_default: LEVELUP_BURST_UI_COLORS,
  rune_hotbar_ui_default: RUNE_HOTBAR_UI_COLORS,
  affinity_meter_ui_default: AFFINITY_METER_UI_COLORS,
  dialogue_portrait_frame_default: DIALOGUE_PORTRAIT_FRAME_COLORS,
};
