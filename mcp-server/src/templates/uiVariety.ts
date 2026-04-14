/**
 * UI Variety — 53 NEW UI element templates to reach 100 total.
 * Covers: RPG, action, platformer, puzzle, racing, survival, mobile, strategy, horror, sports.
 *
 * Role mapping for UI:
 * - head = border/frame
 * - body = main fill/background
 * - face = secondary panel/portrait area
 * - eye = special highlight/glow
 * - accessory = accent/decoration
 * - arm = thin detail/divider
 * - belt = edge/separator
 * - leg = progress fill
 * - boot = shadow/base
 * - hand = icon/marker
 * - hair = title/header
 */

import { SpriteTemplate, ColorScheme } from './humanoid16.js';

// ─── Helpers ─────────────────────────────────────────────────

function hLine(y: number, x0: number, x1: number): [number, number][] {
  const out: [number, number][] = [];
  for (let x = x0; x <= x1; x++) out.push([x, y]);
  return out;
}
function vLine(x: number, y0: number, y1: number): [number, number][] {
  const out: [number, number][] = [];
  for (let y = y0; y <= y1; y++) out.push([x, y]);
  return out;
}
function rect(x0: number, y0: number, x1: number, y1: number): [number, number][] {
  const out: [number, number][] = [];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) out.push([x, y]);
  return out;
}
function border(x0: number, y0: number, x1: number, y1: number): [number, number][] {
  const out: [number, number][] = [];
  for (let x = x0; x <= x1; x++) { out.push([x, y0]); out.push([x, y1]); }
  for (let y = y0 + 1; y < y1; y++) { out.push([x0, y]); out.push([x1, y]); }
  return out;
}

// ─── Color helpers ───────────────────────────────────────────

const UI_BASE = {
  hair: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  face: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  hand: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof UI_BASE>): ColorScheme {
  return { name, mapping: { ...UI_BASE, ...overrides } };
}

// ═══════════════════════════════════════════════════════════════
// 1. STAMINA_BAR — Action/RPG stamina/endurance bar (green)
// ═══════════════════════════════════════════════════════════════
const STAMINA_BAR_16: SpriteTemplate = {
  name: 'stamina_bar_ui_16', width: 16, height: 16,
  description: 'Horizontal stamina bar with green fill and depleted section.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...hLine(5, 1, 14), ...hLine(10, 1, 14), ...vLine(1, 6, 9), ...vLine(14, 6, 9)] },
    { name: 'fill', role: 'leg', pixels: [...rect(2, 6, 10, 9)] },
    { name: 'depleted', role: 'belt', pixels: [...rect(11, 6, 13, 9)] },
    { name: 'highlight', role: 'eye', pixels: [...hLine(6, 3, 9)] },
    { name: 'icon', role: 'accessory', pixels: [[7, 3], [8, 3], [7, 4], [8, 4]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 2. ARMOR_ICON — Equipment stat icon (shield shape)
// ═══════════════════════════════════════════════════════════════
const ARMOR_ICON_16: SpriteTemplate = {
  name: 'armor_icon_ui_16', width: 16, height: 16,
  description: 'Shield-shaped armor stat icon with defense value.',
  regions: [
    { name: 'shield_border', role: 'head', pixels: [...hLine(2, 4, 11), ...vLine(4, 3, 10), ...vLine(11, 3, 10), [5, 11], [6, 12], [7, 13], [8, 13], [9, 12], [10, 11]] },
    { name: 'shield_fill', role: 'body', pixels: [...rect(5, 3, 10, 10)] },
    { name: 'emblem', role: 'accessory', pixels: [[7, 5], [8, 5], [7, 6], [8, 6], [7, 7], [8, 7]] },
    { name: 'highlight', role: 'eye', pixels: [[5, 3], [6, 3], [5, 4]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 3. SWORD_ICON — Attack stat icon
// ═══════════════════════════════════════════════════════════════
const SWORD_ICON_16: SpriteTemplate = {
  name: 'sword_icon_ui_16', width: 16, height: 16,
  description: 'Crossed sword attack stat icon.',
  regions: [
    { name: 'blade1', role: 'body', pixels: [[3, 12], [4, 11], [5, 10], [6, 9], [7, 8], [8, 7], [9, 6], [10, 5], [11, 4], [12, 3]] },
    { name: 'blade2', role: 'body', pixels: [[12, 12], [11, 11], [10, 10], [9, 9], [8, 8], [7, 7], [6, 6], [5, 5], [4, 4], [3, 3]] },
    { name: 'guard1', role: 'head', pixels: [[6, 8], [7, 9], [9, 7], [8, 6]] },
    { name: 'guard2', role: 'head', pixels: [[6, 7], [7, 6], [9, 8], [8, 9]] },
    { name: 'hilts', role: 'accessory', pixels: [[2, 13], [13, 13], [2, 2], [13, 2]] },
    { name: 'glow', role: 'eye', pixels: [[12, 3], [3, 3]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 4. MAGIC_ICON — Magic/spell power stat icon
// ═══════════════════════════════════════════════════════════════
const MAGIC_ICON_16: SpriteTemplate = {
  name: 'magic_icon_ui_16', width: 16, height: 16,
  description: 'Magic power icon with pentagram star shape.',
  regions: [
    { name: 'star', role: 'accessory', pixels: [
      [7, 2], [8, 2], [7, 3], [8, 3],
      [5, 5], [6, 5], [9, 5], [10, 5],
      [4, 6], [11, 6],
      [5, 8], [6, 8], [9, 8], [10, 8],
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    { name: 'core', role: 'eye', pixels: [...rect(6, 5, 9, 8)] },
    { name: 'rays', role: 'body', pixels: [[7, 1], [8, 1], [3, 6], [12, 6], [5, 11], [10, 11]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(13, 5, 10)] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 5. TIMER_CLOCK — Countdown/timer icon
// ═══════════════════════════════════════════════════════════════
const TIMER_CLOCK_16: SpriteTemplate = {
  name: 'timer_clock_ui_16', width: 16, height: 16,
  description: 'Round timer clock with hands and tick marks.',
  regions: [
    { name: 'rim', role: 'head', pixels: [
      ...hLine(3, 5, 10), ...hLine(12, 5, 10),
      ...vLine(4, 4, 11), ...vLine(11, 4, 11),
      [3, 5], [3, 6], [12, 5], [12, 6], [3, 9], [3, 10], [12, 9], [12, 10],
    ]},
    { name: 'face', role: 'body', pixels: [...rect(5, 4, 10, 11)] },
    { name: 'hands', role: 'arm', pixels: [[7, 5], [7, 6], [7, 7], [8, 7], [9, 7], [10, 7]] },
    { name: 'center', role: 'eye', pixels: [[7, 7], [8, 7]] },
    { name: 'ticks', role: 'accessory', pixels: [[7, 4], [8, 4], [7, 11], [8, 11], [5, 7], [10, 7]] },
    { name: 'top_knob', role: 'belt', pixels: [[7, 2], [8, 2]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 6. SCORE_COUNTER — Arcade score display
// ═══════════════════════════════════════════════════════════════
const SCORE_COUNTER_16: SpriteTemplate = {
  name: 'score_counter_ui_16', width: 16, height: 16,
  description: 'Arcade-style score counter with digit slots.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...border(1, 4, 14, 11)] },
    { name: 'bg', role: 'body', pixels: [...rect(2, 5, 13, 10)] },
    { name: 'digits', role: 'eye', pixels: [
      ...rect(3, 6, 4, 9), ...rect(6, 6, 7, 9), ...rect(9, 6, 10, 9), ...rect(12, 6, 13, 9),
    ]},
    { name: 'label', role: 'accessory', pixels: [...hLine(3, 3, 8)] },
    { name: 'dividers', role: 'arm', pixels: [...vLine(5, 6, 9), ...vLine(8, 6, 9), ...vLine(11, 6, 9)] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 7. LIFE_HEART — Platformer/zelda life heart
// ═══════════════════════════════════════════════════════════════
const LIFE_HEART_16: SpriteTemplate = {
  name: 'life_heart_ui_16', width: 16, height: 16,
  description: 'Pixel heart life icon like Zelda hearts.',
  regions: [
    { name: 'heart', role: 'body', pixels: [
      [4, 4], [5, 4], [6, 4], [9, 4], [10, 4], [11, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [7, 10], [8, 10],
    ]},
    { name: 'highlight', role: 'eye', pixels: [[4, 4], [5, 4], [4, 5], [5, 5]] },
    { name: 'outline', role: 'head', pixels: [
      [4, 3], [5, 3], [6, 3], [9, 3], [10, 3], [11, 3],
      [3, 4], [7, 4], [8, 4], [12, 4], [2, 5], [13, 5], [2, 6], [13, 6],
      [3, 7], [12, 7], [4, 8], [11, 8], [5, 9], [10, 9], [6, 10], [9, 10], [7, 11], [8, 11],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 8. KEY_ICON — Collected key item indicator
// ═══════════════════════════════════════════════════════════════
const KEY_ICON_16: SpriteTemplate = {
  name: 'key_icon_ui_16', width: 16, height: 16,
  description: 'Key item icon for dungeon/puzzle games.',
  regions: [
    { name: 'ring', role: 'accessory', pixels: [
      [5, 3], [6, 3], [7, 3], [8, 3],
      [4, 4], [9, 4], [4, 5], [9, 5],
      [5, 6], [6, 6], [7, 6], [8, 6],
    ]},
    { name: 'shaft', role: 'body', pixels: [[7, 7], [7, 8], [7, 9], [7, 10], [7, 11]] },
    { name: 'teeth', role: 'head', pixels: [[8, 9], [9, 9], [8, 11], [9, 11]] },
    { name: 'shine', role: 'eye', pixels: [[5, 3], [5, 4]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 9. MAP_COMPASS — Navigation compass icon
// ═══════════════════════════════════════════════════════════════
const MAP_COMPASS_16: SpriteTemplate = {
  name: 'map_compass_ui_16', width: 16, height: 16,
  description: 'Navigation compass with cardinal directions.',
  regions: [
    { name: 'ring', role: 'head', pixels: [
      ...hLine(2, 5, 10), ...hLine(13, 5, 10),
      ...vLine(4, 3, 12), ...vLine(11, 3, 12),
      [3, 4], [3, 5], [12, 4], [12, 5], [3, 10], [3, 11], [12, 10], [12, 11],
    ]},
    { name: 'face', role: 'body', pixels: [...rect(5, 3, 10, 12)] },
    { name: 'needle_n', role: 'accessory', pixels: [[7, 4], [8, 4], [7, 5], [8, 5], [7, 6], [8, 6]] },
    { name: 'needle_s', role: 'arm', pixels: [[7, 9], [8, 9], [7, 10], [8, 10], [7, 11], [8, 11]] },
    { name: 'center', role: 'eye', pixels: [[7, 7], [8, 7], [7, 8], [8, 8]] },
    { name: 'cardinal', role: 'belt', pixels: [[7, 3], [7, 12], [5, 7], [10, 8]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 10. INVENTORY_GRID — 2x2 inventory grid panel
// ═══════════════════════════════════════════════════════════════
const INVENTORY_GRID_16: SpriteTemplate = {
  name: 'inventory_grid_ui_16', width: 16, height: 16,
  description: '2x2 inventory grid with item slots and highlight.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...border(1, 1, 14, 14)] },
    { name: 'slots', role: 'body', pixels: [...rect(2, 2, 7, 7), ...rect(8, 2, 13, 7), ...rect(2, 8, 7, 13), ...rect(8, 8, 13, 13)] },
    { name: 'dividers', role: 'arm', pixels: [...vLine(7, 2, 13), ...hLine(7, 2, 13)] },
    { name: 'active_slot', role: 'eye', pixels: [...border(2, 2, 7, 7)] },
    { name: 'item1', role: 'accessory', pixels: [...rect(3, 3, 6, 6)] },
    { name: 'item2', role: 'belt', pixels: [...rect(9, 9, 12, 12)] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 11. AMMO_COUNTER — Shooter ammo display
// ═══════════════════════════════════════════════════════════════
const AMMO_COUNTER_16: SpriteTemplate = {
  name: 'ammo_counter_ui_16', width: 16, height: 16,
  description: 'Ammo counter with bullet icons and magazine indicator.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...border(1, 4, 14, 12)] },
    { name: 'bg', role: 'body', pixels: [...rect(2, 5, 13, 11)] },
    { name: 'bullets', role: 'accessory', pixels: [
      ...vLine(3, 6, 10), ...vLine(5, 6, 10), ...vLine(7, 6, 10), ...vLine(9, 6, 10),
    ]},
    { name: 'spent', role: 'belt', pixels: [...vLine(11, 6, 10), ...vLine(13, 6, 10)] },
    { name: 'tips', role: 'eye', pixels: [[3, 6], [5, 6], [7, 6], [9, 6]] },
    { name: 'magazine', role: 'arm', pixels: [...hLine(3, 2, 13)] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 12. CROSSHAIR — FPS/shooter crosshair
// ═══════════════════════════════════════════════════════════════
const CROSSHAIR_16: SpriteTemplate = {
  name: 'crosshair_ui_16', width: 16, height: 16,
  description: 'FPS crosshair reticle with center dot and lines.',
  regions: [
    { name: 'h_lines', role: 'body', pixels: [...hLine(7, 1, 5), ...hLine(7, 10, 14), ...hLine(8, 1, 5), ...hLine(8, 10, 14)] },
    { name: 'v_lines', role: 'body', pixels: [...vLine(7, 1, 5), ...vLine(7, 10, 14), ...vLine(8, 1, 5), ...vLine(8, 10, 14)] },
    { name: 'center', role: 'eye', pixels: [[7, 7], [8, 7], [7, 8], [8, 8]] },
    { name: 'ticks', role: 'accessory', pixels: [[6, 7], [9, 8], [7, 6], [8, 9]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 13. RADAR_SWEEP — Radar/minimap with sweep line
// ═══════════════════════════════════════════════════════════════
const RADAR_SWEEP_16: SpriteTemplate = {
  name: 'radar_sweep_ui_16', width: 16, height: 16,
  description: 'Circular radar with sweep line and blips.',
  regions: [
    { name: 'ring', role: 'head', pixels: [
      ...hLine(2, 5, 10), ...hLine(13, 5, 10),
      ...vLine(4, 3, 12), ...vLine(11, 3, 12),
      [3, 4], [12, 4], [3, 11], [12, 11],
    ]},
    { name: 'bg', role: 'body', pixels: [...rect(5, 3, 10, 12)] },
    { name: 'sweep', role: 'leg', pixels: [[7, 4], [7, 5], [7, 6], [8, 5], [8, 6], [9, 6]] },
    { name: 'blips', role: 'accessory', pixels: [[6, 5], [9, 9], [5, 8]] },
    { name: 'center', role: 'eye', pixels: [[7, 7], [8, 7], [7, 8], [8, 8]] },
    { name: 'grid', role: 'arm', pixels: [[7, 3], [7, 12], [5, 7], [10, 8]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 14. SPEED_GAUGE — Racing speedometer
// ═══════════════════════════════════════════════════════════════
const SPEED_GAUGE_16: SpriteTemplate = {
  name: 'speed_gauge_ui_16', width: 16, height: 16,
  description: 'Semi-circular speedometer gauge for racing games.',
  regions: [
    { name: 'arc', role: 'head', pixels: [
      ...hLine(4, 4, 11), [3, 5], [12, 5], [2, 6], [13, 6],
      [2, 7], [13, 7], [2, 8], [13, 8], [2, 9], [13, 9],
      ...hLine(10, 2, 13),
    ]},
    { name: 'fill', role: 'body', pixels: [...rect(3, 5, 12, 9)] },
    { name: 'needle', role: 'accessory', pixels: [[10, 5], [9, 6], [8, 7], [7, 8], [7, 9]] },
    { name: 'ticks', role: 'arm', pixels: [[4, 5], [5, 5], [7, 4], [8, 4], [10, 5], [11, 5]] },
    { name: 'redzone', role: 'belt', pixels: [[11, 6], [12, 6], [11, 7], [12, 7], [11, 8], [12, 8]] },
    { name: 'center', role: 'eye', pixels: [[7, 9], [8, 9]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 15. LAP_COUNTER — Racing lap display
// ═══════════════════════════════════════════════════════════════
const LAP_COUNTER_16: SpriteTemplate = {
  name: 'lap_counter_ui_16', width: 16, height: 16,
  description: 'Racing lap counter with current/total display.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...border(2, 3, 13, 12)] },
    { name: 'bg', role: 'body', pixels: [...rect(3, 4, 12, 11)] },
    { name: 'current_lap', role: 'eye', pixels: [...rect(4, 5, 7, 8)] },
    { name: 'total_laps', role: 'arm', pixels: [...rect(9, 5, 11, 8)] },
    { name: 'slash', role: 'accessory', pixels: [[8, 5], [8, 6], [8, 7], [8, 8]] },
    { name: 'flag', role: 'belt', pixels: [[5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 16. GEM_COUNTER — Puzzle game gem/currency counter
// ═══════════════════════════════════════════════════════════════
const GEM_COUNTER_16: SpriteTemplate = {
  name: 'gem_counter_ui_16', width: 16, height: 16,
  description: 'Gem counter icon with diamond shape and amount display.',
  regions: [
    { name: 'gem', role: 'accessory', pixels: [
      [4, 4], [5, 4], [6, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
      [4, 6], [5, 6], [6, 6],
      [5, 7],
    ]},
    { name: 'gem_highlight', role: 'eye', pixels: [[4, 4], [5, 4], [4, 5]] },
    { name: 'amount_bg', role: 'body', pixels: [...rect(9, 4, 13, 8)] },
    { name: 'amount_frame', role: 'head', pixels: [...border(8, 3, 14, 9)] },
    { name: 'digits', role: 'arm', pixels: [[10, 5], [11, 5], [12, 5], [10, 7], [11, 7], [12, 7]] },
    { name: 'x_mark', role: 'belt', pixels: [[8, 6], [9, 5], [9, 7]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 17. PUZZLE_PIECE — Puzzle game piece icon
// ═══════════════════════════════════════════════════════════════
const PUZZLE_PIECE_16: SpriteTemplate = {
  name: 'puzzle_piece_ui_16', width: 16, height: 16,
  description: 'Jigsaw puzzle piece icon with tabs and blanks.',
  regions: [
    { name: 'piece', role: 'body', pixels: [
      ...rect(3, 5, 12, 10),
      [7, 3], [8, 3], [7, 4], [8, 4], // top tab
      [13, 7], [13, 8], // right tab
    ]},
    { name: 'outline', role: 'head', pixels: [
      ...hLine(5, 3, 6), ...hLine(5, 9, 12),
      ...hLine(10, 3, 12),
      ...vLine(3, 5, 10), ...vLine(12, 5, 6), ...vLine(12, 9, 10),
      [6, 3], [9, 3], [6, 4], [9, 4],
      [14, 7], [14, 8], [12, 7], [12, 8],
    ]},
    { name: 'highlight', role: 'eye', pixels: [[4, 6], [5, 6], [4, 7]] },
    { name: 'pattern', role: 'accessory', pixels: [[7, 7], [8, 7], [7, 8], [8, 8]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 18. HUNGER_BAR — Survival game hunger meter
// ═══════════════════════════════════════════════════════════════
const HUNGER_BAR_16: SpriteTemplate = {
  name: 'hunger_bar_ui_16', width: 16, height: 16,
  description: 'Survival hunger bar with drumstick icon.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...border(1, 6, 14, 11)] },
    { name: 'fill', role: 'leg', pixels: [...rect(2, 7, 9, 10)] },
    { name: 'depleted', role: 'belt', pixels: [...rect(10, 7, 13, 10)] },
    { name: 'icon', role: 'accessory', pixels: [
      [5, 2], [6, 2], [7, 2],
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3],
      [5, 4], [6, 4], [7, 4],
      [7, 5],
    ]},
    { name: 'bone', role: 'arm', pixels: [[8, 4], [9, 5]] },
    { name: 'highlight', role: 'eye', pixels: [...hLine(7, 3, 8)] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 19. TEMPERATURE — Survival temperature gauge
// ═══════════════════════════════════════════════════════════════
const TEMPERATURE_16: SpriteTemplate = {
  name: 'temperature_ui_16', width: 16, height: 16,
  description: 'Thermometer temperature gauge for survival games.',
  regions: [
    { name: 'tube', role: 'head', pixels: [...vLine(7, 2, 10), ...vLine(8, 2, 10)] },
    { name: 'bulb', role: 'body', pixels: [[6, 11], [7, 11], [8, 11], [9, 11], [6, 12], [7, 12], [8, 12], [9, 12]] },
    { name: 'mercury', role: 'accessory', pixels: [...vLine(7, 6, 10), ...vLine(8, 6, 10), [7, 11], [8, 11]] },
    { name: 'ticks', role: 'arm', pixels: [[9, 3], [9, 5], [9, 7], [9, 9]] },
    { name: 'hot', role: 'eye', pixels: [[7, 12], [8, 12]] },
    { name: 'frame', role: 'belt', pixels: [[6, 2], [9, 2], [5, 11], [10, 11], [5, 12], [10, 12]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 20. SHIELD_ICON — Active shield/barrier indicator
// ═══════════════════════════════════════════════════════════════
const SHIELD_INDICATOR_16: SpriteTemplate = {
  name: 'shield_indicator_ui_16', width: 16, height: 16,
  description: 'Active shield/barrier status indicator with charge.',
  regions: [
    { name: 'dome', role: 'body', pixels: [
      ...hLine(3, 5, 10), ...hLine(4, 4, 11),
      ...rect(3, 5, 12, 9), ...hLine(10, 4, 11), ...hLine(11, 5, 10),
    ]},
    { name: 'rim', role: 'head', pixels: [
      ...hLine(2, 5, 10), [4, 3], [11, 3], [3, 4], [12, 4],
      [2, 5], [13, 5], [2, 6], [13, 6], [2, 7], [13, 7],
      [2, 8], [13, 8], [2, 9], [13, 9], [3, 10], [12, 10],
      [4, 11], [11, 11], ...hLine(12, 5, 10),
    ]},
    { name: 'charge', role: 'eye', pixels: [[5, 4], [6, 4], [7, 4], [5, 5], [6, 5]] },
    { name: 'energy_lines', role: 'arm', pixels: [[6, 7], [9, 6], [7, 9], [10, 8]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 21. POTION_ICON — Consumable potion quick-slot icon
// ═══════════════════════════════════════════════════════════════
const POTION_ICON_16: SpriteTemplate = {
  name: 'potion_icon_ui_16', width: 16, height: 16,
  description: 'Potion bottle icon for quick-slot UI.',
  regions: [
    { name: 'bottle', role: 'body', pixels: [
      ...rect(5, 7, 10, 12),
    ]},
    { name: 'neck', role: 'head', pixels: [[7, 4], [8, 4], [7, 5], [8, 5], [6, 6], [9, 6]] },
    { name: 'cork', role: 'belt', pixels: [[7, 3], [8, 3]] },
    { name: 'liquid', role: 'accessory', pixels: [...rect(6, 8, 9, 11)] },
    { name: 'highlight', role: 'eye', pixels: [[6, 8], [6, 9]] },
    { name: 'outline', role: 'arm', pixels: [
      [5, 6], [10, 6], [4, 7], [11, 7], [4, 12], [11, 12],
      ...hLine(13, 5, 10),
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// 22. NOTIFICATION_BADGE — Alert/notification bubble
// ═══════════════════════════════════════════════════════════════
const NOTIFICATION_BADGE_16: SpriteTemplate = {
  name: 'notification_badge_ui_16', width: 16, height: 16,
  description: 'Round notification badge with number.',
  regions: [
    { name: 'circle', role: 'body', pixels: [
      ...hLine(4, 5, 10), ...rect(4, 5, 11, 10), ...hLine(11, 5, 10),
    ]},
    { name: 'rim', role: 'head', pixels: [
      ...hLine(3, 5, 10), ...hLine(12, 5, 10),
      [4, 4], [11, 4], [3, 5], [12, 5],
      [3, 10], [12, 10], [4, 11], [11, 11],
    ]},
    { name: 'number', role: 'eye', pixels: [[7, 6], [8, 6], [7, 7], [8, 7], [7, 8], [8, 8], [7, 9], [8, 9]] },
    { name: 'shine', role: 'accessory', pixels: [[5, 5], [6, 5]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 23. CHAT_BUBBLE — Multiplayer chat indicator
// ═══════════════════════════════════════════════════════════════
const CHAT_BUBBLE_16: SpriteTemplate = {
  name: 'chat_bubble_ui_16', width: 16, height: 16,
  description: 'Chat bubble with typing dots indicator.',
  regions: [
    { name: 'bubble', role: 'body', pixels: [...rect(2, 2, 13, 9)] },
    { name: 'frame', role: 'head', pixels: [...border(1, 1, 14, 10)] },
    { name: 'tail', role: 'arm', pixels: [[3, 11], [4, 11], [2, 12]] },
    { name: 'dots', role: 'eye', pixels: [[5, 6], [7, 6], [9, 6]] },
    { name: 'ellipsis', role: 'accessory', pixels: [[5, 5], [7, 5], [9, 5], [11, 5]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 24. SETTINGS_GEAR — Settings/options icon
// ═══════════════════════════════════════════════════════════════
const SETTINGS_GEAR_16: SpriteTemplate = {
  name: 'settings_gear_ui_16', width: 16, height: 16,
  description: 'Gear/cog icon for settings menu.',
  regions: [
    { name: 'teeth', role: 'head', pixels: [
      [7, 1], [8, 1], [7, 14], [8, 14],
      [1, 7], [1, 8], [14, 7], [14, 8],
      [3, 3], [4, 3], [3, 4], [11, 3], [12, 3], [12, 4],
      [3, 11], [3, 12], [4, 12], [12, 11], [11, 12], [12, 12],
    ]},
    { name: 'ring', role: 'body', pixels: [
      ...hLine(4, 5, 10), ...hLine(11, 5, 10),
      ...vLine(4, 5, 10), ...vLine(11, 5, 10),
      ...rect(5, 5, 10, 10),
    ]},
    { name: 'center', role: 'accessory', pixels: [...rect(6, 6, 9, 9)] },
    { name: 'hole', role: 'eye', pixels: [[7, 7], [8, 7], [7, 8], [8, 8]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 25. MUSIC_NOTE — Audio/music toggle icon
// ═══════════════════════════════════════════════════════════════
const MUSIC_NOTE_16: SpriteTemplate = {
  name: 'music_note_ui_16', width: 16, height: 16,
  description: 'Music note icon for audio settings.',
  regions: [
    { name: 'note_head1', role: 'body', pixels: [[4, 10], [5, 10], [6, 10], [4, 11], [5, 11], [6, 11], [5, 12], [6, 12]] },
    { name: 'note_head2', role: 'body', pixels: [[9, 9], [10, 9], [11, 9], [9, 10], [10, 10], [11, 10], [10, 11], [11, 11]] },
    { name: 'stems', role: 'head', pixels: [...vLine(6, 4, 10), ...vLine(11, 3, 9)] },
    { name: 'beam', role: 'accessory', pixels: [[7, 4], [8, 4], [9, 3], [10, 3]] },
    { name: 'dots', role: 'eye', pixels: [[8, 6], [13, 5]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 26. VOLUME_SPEAKER — Volume control icon
// ═══════════════════════════════════════════════════════════════
const VOLUME_SPEAKER_16: SpriteTemplate = {
  name: 'volume_speaker_ui_16', width: 16, height: 16,
  description: 'Speaker volume icon with sound waves.',
  regions: [
    { name: 'speaker', role: 'body', pixels: [...rect(3, 6, 6, 9), [7, 5], [7, 6], [7, 9], [7, 10], [8, 4], [8, 11]] },
    { name: 'cone', role: 'head', pixels: [[2, 6], [2, 7], [2, 8], [2, 9]] },
    { name: 'wave1', role: 'accessory', pixels: [[10, 6], [10, 7], [10, 8], [10, 9]] },
    { name: 'wave2', role: 'arm', pixels: [[12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10]] },
    { name: 'dots', role: 'eye', pixels: [[10, 7], [12, 7]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 27. PAUSE_BUTTON — Pause game icon
// ═══════════════════════════════════════════════════════════════
const PAUSE_BUTTON_16: SpriteTemplate = {
  name: 'pause_button_ui_16', width: 16, height: 16,
  description: 'Pause button with two vertical bars in circle.',
  regions: [
    { name: 'circle', role: 'head', pixels: [
      ...hLine(2, 5, 10), ...hLine(13, 5, 10),
      [4, 3], [11, 3], [3, 4], [12, 4],
      [2, 5], [13, 5], [2, 10], [13, 10],
      [3, 11], [12, 11], [4, 12], [11, 12],
      ...vLine(2, 6, 9), ...vLine(13, 6, 9),
    ]},
    { name: 'bg', role: 'body', pixels: [...rect(5, 3, 10, 12), ...rect(3, 5, 12, 10), [4, 4], [11, 4], [4, 11], [11, 11]] },
    { name: 'bar_l', role: 'accessory', pixels: [...rect(5, 5, 6, 10)] },
    { name: 'bar_r', role: 'accessory', pixels: [...rect(9, 5, 10, 10)] },
    { name: 'highlight', role: 'eye', pixels: [[5, 5], [9, 5]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 28. PLAY_BUTTON — Play/resume icon
// ═══════════════════════════════════════════════════════════════
const PLAY_BUTTON_16: SpriteTemplate = {
  name: 'play_button_ui_16', width: 16, height: 16,
  description: 'Play triangle button in circle.',
  regions: [
    { name: 'circle', role: 'head', pixels: [
      ...hLine(2, 5, 10), ...hLine(13, 5, 10),
      [4, 3], [11, 3], [3, 4], [12, 4],
      [2, 5], [13, 5], [2, 10], [13, 10],
      [3, 11], [12, 11], [4, 12], [11, 12],
      ...vLine(2, 6, 9), ...vLine(13, 6, 9),
    ]},
    { name: 'bg', role: 'body', pixels: [...rect(5, 3, 10, 12), ...rect(3, 5, 12, 10), [4, 4], [11, 4], [4, 11], [11, 11]] },
    { name: 'triangle', role: 'accessory', pixels: [
      [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10],
      [7, 6], [7, 7], [7, 8], [7, 9],
      [8, 7], [8, 8],
      [9, 7], [9, 8],
      [10, 7], [10, 8],
    ]},
    { name: 'highlight', role: 'eye', pixels: [[6, 5], [6, 6]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 29. TROPHY — Achievement/trophy icon
// ═══════════════════════════════════════════════════════════════
const TROPHY_16: SpriteTemplate = {
  name: 'trophy_ui_16', width: 16, height: 16,
  description: 'Trophy/achievement cup icon.',
  regions: [
    { name: 'cup', role: 'accessory', pixels: [
      ...rect(4, 3, 11, 4), ...rect(5, 5, 10, 7), ...rect(6, 8, 9, 8),
    ]},
    { name: 'handles', role: 'head', pixels: [[3, 4], [12, 4], [3, 5], [12, 5], [3, 6], [12, 6], [4, 7], [11, 7]] },
    { name: 'stem', role: 'body', pixels: [[7, 9], [8, 9], [7, 10], [8, 10]] },
    { name: 'base', role: 'belt', pixels: [...hLine(11, 5, 10), ...hLine(12, 4, 11)] },
    { name: 'star', role: 'eye', pixels: [[7, 5], [8, 5], [7, 6], [8, 6]] },
    { name: 'shine', role: 'arm', pixels: [[5, 3], [5, 4]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 30. MEDAL — Ranking medal icon
// ═══════════════════════════════════════════════════════════════
const MEDAL_16: SpriteTemplate = {
  name: 'medal_ui_16', width: 16, height: 16,
  description: 'Medal/ribbon achievement icon.',
  regions: [
    { name: 'ribbon_l', role: 'accessory', pixels: [[5, 2], [4, 3], [3, 4], [4, 5], [5, 5]] },
    { name: 'ribbon_r', role: 'accessory', pixels: [[10, 2], [11, 3], [12, 4], [11, 5], [10, 5]] },
    { name: 'medal', role: 'body', pixels: [
      ...hLine(6, 5, 10), ...rect(4, 7, 11, 10), ...hLine(11, 5, 10),
    ]},
    { name: 'rim', role: 'head', pixels: [
      [4, 6], [11, 6], [3, 7], [12, 7], [3, 10], [12, 10], [4, 11], [11, 11],
    ]},
    { name: 'star', role: 'eye', pixels: [[7, 8], [8, 8], [7, 9], [8, 9]] },
    { name: 'shine', role: 'arm', pixels: [[5, 7], [6, 7]] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 31-53: Additional UI templates for diverse game genres
// ═══════════════════════════════════════════════════════════════

// 31. LOADING_SPINNER
const LOADING_SPINNER_16: SpriteTemplate = {
  name: 'loading_spinner_ui_16', width: 16, height: 16,
  description: 'Circular loading spinner with progress segments.',
  regions: [
    { name: 'ring', role: 'head', pixels: [
      ...hLine(3, 6, 9), ...hLine(12, 6, 9),
      [5, 4], [10, 4], [4, 5], [11, 5],
      [4, 10], [11, 10], [5, 11], [10, 11],
      ...vLine(3, 6, 9), ...vLine(12, 6, 9),
    ]},
    { name: 'active', role: 'eye', pixels: [[6, 3], [7, 3], [8, 3], [9, 3], [10, 4], [11, 5], [12, 6]] },
    { name: 'inactive', role: 'body', pixels: [[12, 7], [12, 8], [12, 9], [11, 10], [10, 11], [9, 12], [8, 12], [7, 12], [6, 12], [5, 11], [4, 10], [3, 9], [3, 8], [3, 7], [3, 6], [4, 5], [5, 4]] },
    { name: 'center', role: 'accessory', pixels: [[7, 7], [8, 7], [7, 8], [8, 8]] },
  ],
};

// 32. CHECKBOX
const CHECKBOX_16: SpriteTemplate = {
  name: 'checkbox_ui_16', width: 16, height: 16,
  description: 'Checkbox UI element with checkmark.',
  regions: [
    { name: 'box', role: 'head', pixels: [...border(3, 3, 12, 12)] },
    { name: 'fill', role: 'body', pixels: [...rect(4, 4, 11, 11)] },
    { name: 'check', role: 'eye', pixels: [[5, 8], [6, 9], [7, 10], [8, 9], [9, 8], [10, 7], [11, 6]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(13, 4, 13)] },
  ],
};

// 33. SLIDER_BAR
const SLIDER_BAR_16: SpriteTemplate = {
  name: 'slider_bar_ui_16', width: 16, height: 16,
  description: 'Horizontal slider control with knob.',
  regions: [
    { name: 'track', role: 'head', pixels: [...hLine(7, 2, 13), ...hLine(8, 2, 13)] },
    { name: 'fill', role: 'leg', pixels: [...hLine(7, 2, 8), ...hLine(8, 2, 8)] },
    { name: 'empty', role: 'belt', pixels: [...hLine(7, 9, 13), ...hLine(8, 9, 13)] },
    { name: 'knob', role: 'body', pixels: [[7, 5], [8, 5], [9, 5], [7, 6], [8, 6], [9, 6], [7, 7], [8, 7], [9, 7], [7, 8], [8, 8], [9, 8], [7, 9], [8, 9], [9, 9]] },
    { name: 'knob_rim', role: 'arm', pixels: [[8, 4], [6, 6], [10, 6], [6, 8], [10, 8], [8, 10]] },
    { name: 'highlight', role: 'eye', pixels: [[7, 5], [8, 5]] },
  ],
};

// 34. TOGGLE_SWITCH
const TOGGLE_SWITCH_16: SpriteTemplate = {
  name: 'toggle_switch_ui_16', width: 16, height: 16,
  description: 'On/off toggle switch UI element.',
  regions: [
    { name: 'track', role: 'body', pixels: [...rect(2, 5, 13, 10)] },
    { name: 'frame', role: 'head', pixels: [...border(1, 4, 14, 11)] },
    { name: 'knob', role: 'eye', pixels: [...rect(9, 5, 13, 10)] },
    { name: 'on_indicator', role: 'accessory', pixels: [[4, 7], [5, 7], [6, 7], [4, 8], [5, 8], [6, 8]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(12, 2, 13)] },
  ],
};

// 35. DROPDOWN
const DROPDOWN_16: SpriteTemplate = {
  name: 'dropdown_ui_16', width: 16, height: 16,
  description: 'Dropdown menu selector with arrow.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...border(1, 3, 14, 8)] },
    { name: 'fill', role: 'body', pixels: [...rect(2, 4, 13, 7)] },
    { name: 'text', role: 'arm', pixels: [[3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [3, 6], [4, 6], [5, 6]] },
    { name: 'arrow', role: 'accessory', pixels: [[11, 5], [12, 5], [11, 6], [12, 6], [10, 5], [13, 5]] },
    { name: 'options', role: 'belt', pixels: [...rect(2, 9, 13, 13)] },
    { name: 'selected', role: 'eye', pixels: [...hLine(10, 2, 13)] },
  ],
};

// 36. PROGRESS_BAR_XP
const PROGRESS_BAR_XP_16: SpriteTemplate = {
  name: 'progress_bar_xp_ui_16', width: 16, height: 16,
  description: 'XP progress bar with level indicator.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...border(0, 5, 15, 10)] },
    { name: 'fill', role: 'leg', pixels: [...rect(1, 6, 10, 9)] },
    { name: 'empty', role: 'belt', pixels: [...rect(11, 6, 14, 9)] },
    { name: 'level', role: 'eye', pixels: [...rect(6, 2, 9, 4)] },
    { name: 'level_frame', role: 'arm', pixels: [...border(5, 1, 10, 5)] },
    { name: 'sparkle', role: 'accessory', pixels: [[10, 6], [10, 7]] },
  ],
};

// 37. MINIMAP_SQUARE
const MINIMAP_SQUARE_16: SpriteTemplate = {
  name: 'minimap_square_ui_16', width: 16, height: 16,
  description: 'Square minimap with player marker and terrain.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...border(1, 1, 14, 14)] },
    { name: 'terrain', role: 'body', pixels: [...rect(2, 2, 13, 13)] },
    { name: 'path', role: 'arm', pixels: [[4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11]] },
    { name: 'player', role: 'eye', pixels: [[7, 7], [8, 7], [7, 8], [8, 8]] },
    { name: 'pois', role: 'accessory', pixels: [[4, 10], [11, 4], [3, 6]] },
    { name: 'buildings', role: 'belt', pixels: [...rect(10, 3, 12, 5), ...rect(3, 10, 5, 12)] },
  ],
};

// 38. DIALOG_BOX
const DIALOG_BOX_16: SpriteTemplate = {
  name: 'dialog_box_ui_16', width: 16, height: 16,
  description: 'Text dialog box with decorative corners.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...border(0, 3, 15, 13)] },
    { name: 'fill', role: 'body', pixels: [...rect(1, 4, 14, 12)] },
    { name: 'text_lines', role: 'arm', pixels: [
      ...hLine(5, 2, 13), ...hLine(7, 2, 13), ...hLine(9, 2, 10),
    ]},
    { name: 'corners', role: 'accessory', pixels: [[0, 3], [15, 3], [0, 13], [15, 13]] },
    { name: 'cursor', role: 'eye', pixels: [[13, 11], [14, 11], [13, 12]] },
    { name: 'name_tag', role: 'belt', pixels: [...hLine(2, 1, 6)] },
  ],
};

// 39. ENERGY_ORB
const ENERGY_ORB_16: SpriteTemplate = {
  name: 'energy_orb_ui_16', width: 16, height: 16,
  description: 'Circular energy/mana orb with fill level.',
  regions: [
    { name: 'rim', role: 'head', pixels: [
      ...hLine(2, 5, 10), ...hLine(13, 5, 10),
      [4, 3], [11, 3], [3, 4], [12, 4],
      ...vLine(2, 5, 10), ...vLine(13, 5, 10),
      [3, 11], [12, 11], [4, 12], [11, 12],
    ]},
    { name: 'empty', role: 'body', pixels: [...rect(5, 3, 10, 7), [4, 4], [11, 4], [3, 5], [12, 5], [3, 6], [12, 6], [3, 7], [12, 7]] },
    { name: 'filled', role: 'leg', pixels: [...rect(3, 8, 12, 10), ...rect(5, 11, 10, 12), [4, 11], [11, 11]] },
    { name: 'highlight', role: 'eye', pixels: [[5, 4], [6, 4], [5, 5]] },
    { name: 'bubbles', role: 'accessory', pixels: [[5, 8], [9, 9], [7, 10]] },
  ],
};

// 40. WEAPON_SLOT
const WEAPON_SLOT_16: SpriteTemplate = {
  name: 'weapon_slot_ui_16', width: 16, height: 16,
  description: 'Equipped weapon slot with border highlight.',
  regions: [
    { name: 'outer', role: 'head', pixels: [...border(1, 1, 14, 14)] },
    { name: 'inner', role: 'body', pixels: [...rect(2, 2, 13, 13)] },
    { name: 'weapon_silhouette', role: 'arm', pixels: [
      [5, 12], [6, 11], [7, 10], [8, 9], [9, 8], [10, 7], [11, 6], [10, 5], [9, 4],
      [8, 3], [9, 3], [10, 4], [11, 5],
    ]},
    { name: 'active_border', role: 'eye', pixels: [
      ...hLine(1, 2, 13), ...hLine(14, 2, 13), ...vLine(1, 2, 13), ...vLine(14, 2, 13),
    ]},
    { name: 'rarity_gem', role: 'accessory', pixels: [[12, 2], [13, 2], [12, 3], [13, 3]] },
  ],
};

// 41. SKILL_COOLDOWN
const SKILL_COOLDOWN_16: SpriteTemplate = {
  name: 'skill_cooldown_ui_16', width: 16, height: 16,
  description: 'Skill slot with cooldown sweep overlay.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...border(2, 2, 13, 13)] },
    { name: 'icon_bg', role: 'body', pixels: [...rect(3, 3, 12, 12)] },
    { name: 'cooldown_overlay', role: 'belt', pixels: [...rect(3, 3, 12, 7)] },
    { name: 'icon', role: 'accessory', pixels: [...rect(5, 5, 10, 10)] },
    { name: 'timer', role: 'eye', pixels: [[7, 8], [8, 8], [7, 9], [8, 9]] },
    { name: 'ready_glow', role: 'arm', pixels: [
      [3, 2], [4, 2], [11, 2], [12, 2],
    ]},
  ],
};

// 42. MAP_ICON
const MAP_ICON_16: SpriteTemplate = {
  name: 'map_icon_ui_16', width: 16, height: 16,
  description: 'Folded treasure map icon.',
  regions: [
    { name: 'paper', role: 'body', pixels: [...rect(2, 3, 13, 12)] },
    { name: 'frame', role: 'head', pixels: [...border(1, 2, 14, 13)] },
    { name: 'fold', role: 'arm', pixels: [[10, 3], [11, 4], [12, 5]] },
    { name: 'x_mark', role: 'accessory', pixels: [[9, 7], [10, 8], [11, 9], [11, 7], [9, 9]] },
    { name: 'path', role: 'belt', pixels: [[4, 6], [5, 7], [6, 7], [7, 8], [8, 8]] },
    { name: 'compass_dot', role: 'eye', pixels: [[4, 4], [5, 4]] },
  ],
};

// 43. QUEST_EXCLAMATION
const QUEST_EXCLAMATION_16: SpriteTemplate = {
  name: 'quest_exclamation_ui_16', width: 16, height: 16,
  description: 'Quest available exclamation mark icon.',
  regions: [
    { name: 'mark', role: 'accessory', pixels: [
      ...rect(6, 2, 9, 3), ...rect(6, 4, 9, 8), [7, 9], [8, 9],
    ]},
    { name: 'dot', role: 'eye', pixels: [[7, 11], [8, 11], [7, 12], [8, 12]] },
    { name: 'glow', role: 'body', pixels: [
      [5, 3], [10, 3], [5, 7], [10, 7], [5, 5], [10, 5],
    ]},
    { name: 'shadow', role: 'boot', pixels: [[6, 13], [7, 13], [8, 13], [9, 13]] },
  ],
};

// 44. QUEST_QUESTION
const QUEST_QUESTION_16: SpriteTemplate = {
  name: 'quest_question_ui_16', width: 16, height: 16,
  description: 'Quest turn-in question mark icon.',
  regions: [
    { name: 'mark', role: 'accessory', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [10, 3], [10, 4], [9, 5], [8, 6], [8, 7], [8, 8],
    ]},
    { name: 'dot', role: 'eye', pixels: [[8, 10], [8, 11]] },
    { name: 'glow', role: 'body', pixels: [[4, 3], [11, 3], [7, 9], [9, 9]] },
    { name: 'shadow', role: 'boot', pixels: [[6, 13], [7, 13], [8, 13], [9, 13]] },
  ],
};

// 45. SAVE_ICON
const SAVE_ICON_16: SpriteTemplate = {
  name: 'save_icon_ui_16', width: 16, height: 16,
  description: 'Floppy disk save icon.',
  regions: [
    { name: 'disk', role: 'body', pixels: [...rect(2, 2, 13, 13)] },
    { name: 'frame', role: 'head', pixels: [...border(1, 1, 14, 14)] },
    { name: 'label', role: 'arm', pixels: [...rect(4, 3, 11, 5)] },
    { name: 'shutter', role: 'belt', pixels: [...rect(5, 8, 10, 12)] },
    { name: 'slider', role: 'eye', pixels: [[9, 8], [10, 8], [9, 9], [10, 9]] },
    { name: 'corner', role: 'accessory', pixels: [[12, 2], [13, 2], [13, 3]] },
  ],
};

// 46. LOCK_ICON
const LOCK_ICON_16: SpriteTemplate = {
  name: 'lock_icon_ui_16', width: 16, height: 16,
  description: 'Padlock icon for locked content.',
  regions: [
    { name: 'shackle', role: 'head', pixels: [
      [6, 3], [9, 3], [5, 4], [10, 4], [5, 5], [10, 5], [5, 6], [10, 6],
    ]},
    { name: 'body', role: 'body', pixels: [...rect(4, 7, 11, 12)] },
    { name: 'frame', role: 'arm', pixels: [...border(3, 6, 12, 13)] },
    { name: 'keyhole', role: 'eye', pixels: [[7, 9], [8, 9], [7, 10], [8, 10], [7, 11]] },
    { name: 'shine', role: 'accessory', pixels: [[5, 7], [5, 8]] },
  ],
};

// 47. CROWN_ICON
const CROWN_ICON_16: SpriteTemplate = {
  name: 'crown_icon_ui_16', width: 16, height: 16,
  description: 'Crown/royalty rank icon.',
  regions: [
    { name: 'crown', role: 'accessory', pixels: [
      [3, 4], [7, 3], [8, 3], [12, 4],
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      ...rect(3, 6, 12, 8),
    ]},
    { name: 'points', role: 'head', pixels: [[3, 3], [7, 2], [8, 2], [12, 3], [5, 4], [10, 4]] },
    { name: 'gems', role: 'eye', pixels: [[5, 7], [7, 7], [8, 7], [10, 7]] },
    { name: 'band', role: 'belt', pixels: [...hLine(9, 3, 12)] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(10, 4, 11)] },
  ],
};

// 48. SKULL_ICON (death/danger)
const SKULL_ICON_16: SpriteTemplate = {
  name: 'skull_icon_ui_16', width: 16, height: 16,
  description: 'Skull danger/death icon.',
  regions: [
    { name: 'skull', role: 'body', pixels: [
      ...hLine(3, 5, 10), ...rect(4, 4, 11, 9), ...hLine(10, 5, 10),
    ]},
    { name: 'outline', role: 'head', pixels: [
      ...hLine(2, 5, 10), [4, 3], [11, 3], [3, 4], [12, 4],
      [3, 9], [12, 9], [4, 10], [11, 10],
    ]},
    { name: 'eyes', role: 'arm', pixels: [[5, 5], [6, 5], [9, 5], [10, 5], [5, 6], [6, 6], [9, 6], [10, 6]] },
    { name: 'nose', role: 'belt', pixels: [[7, 7], [8, 7]] },
    { name: 'teeth', role: 'eye', pixels: [[6, 9], [7, 9], [8, 9], [9, 9]] },
    { name: 'jaw', role: 'accessory', pixels: [...hLine(11, 5, 10), [6, 12], [9, 12]] },
  ],
};

// 49. ARROW_UP
const ARROW_UP_16: SpriteTemplate = {
  name: 'arrow_up_ui_16', width: 16, height: 16,
  description: 'Up arrow indicator / stat increase icon.',
  regions: [
    { name: 'arrow', role: 'accessory', pixels: [
      [7, 3], [8, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
    ]},
    { name: 'shaft', role: 'body', pixels: [...rect(6, 7, 9, 12)] },
    { name: 'highlight', role: 'eye', pixels: [[7, 3], [6, 4], [5, 5], [4, 6]] },
    { name: 'shadow', role: 'boot', pixels: [...hLine(13, 6, 9)] },
  ],
};

// 50. SHIELD_HEALTH (combined health + armor display)
const SHIELD_HEALTH_16: SpriteTemplate = {
  name: 'shield_health_ui_16', width: 16, height: 16,
  description: 'Combined health and shield bar display.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...border(0, 3, 15, 7), ...border(0, 8, 15, 12)] },
    { name: 'health_fill', role: 'body', pixels: [...rect(1, 4, 11, 6)] },
    { name: 'health_empty', role: 'belt', pixels: [...rect(12, 4, 14, 6)] },
    { name: 'shield_fill', role: 'leg', pixels: [...rect(1, 9, 8, 11)] },
    { name: 'shield_empty', role: 'arm', pixels: [...rect(9, 9, 14, 11)] },
    { name: 'health_icon', role: 'accessory', pixels: [[1, 1], [2, 1], [1, 2], [2, 2]] },
    { name: 'shield_icon', role: 'eye', pixels: [[1, 13], [2, 13]] },
  ],
};

// 51. MINIMAP_DUNGEON
const MINIMAP_DUNGEON_16: SpriteTemplate = {
  name: 'minimap_dungeon_ui_16', width: 16, height: 16,
  description: 'Dungeon minimap with rooms and corridors.',
  regions: [
    { name: 'frame', role: 'head', pixels: [...border(0, 0, 15, 15)] },
    { name: 'bg', role: 'body', pixels: [...rect(1, 1, 14, 14)] },
    { name: 'rooms', role: 'arm', pixels: [
      ...rect(2, 2, 5, 4), ...rect(9, 2, 12, 5),
      ...rect(2, 9, 6, 13), ...rect(10, 10, 13, 13),
    ]},
    { name: 'corridors', role: 'belt', pixels: [
      ...hLine(3, 6, 8), ...vLine(11, 6, 9), ...hLine(11, 7, 9),
    ]},
    { name: 'player', role: 'eye', pixels: [[3, 3], [4, 3]] },
    { name: 'unexplored', role: 'boot', pixels: [...rect(7, 6, 9, 9)] },
  ],
};

// 52. STATUS_BAR_GROUP (HP + MP + Stamina stacked)
const STATUS_BAR_GROUP_16: SpriteTemplate = {
  name: 'status_bar_group_ui_16', width: 16, height: 16,
  description: 'Stacked status bars: HP, MP, and stamina.',
  regions: [
    { name: 'frames', role: 'head', pixels: [
      ...border(1, 1, 14, 4), ...border(1, 5, 14, 8), ...border(1, 9, 14, 12),
    ]},
    { name: 'hp_fill', role: 'body', pixels: [...rect(2, 2, 10, 3)] },
    { name: 'mp_fill', role: 'leg', pixels: [...rect(2, 6, 8, 7)] },
    { name: 'stamina_fill', role: 'accessory', pixels: [...rect(2, 10, 12, 11)] },
    { name: 'hp_empty', role: 'belt', pixels: [...rect(11, 2, 13, 3)] },
    { name: 'icons', role: 'eye', pixels: [[0, 2], [0, 6], [0, 10]] },
  ],
};

// 53. TOOLTIP_PANEL
const TOOLTIP_PANEL_16: SpriteTemplate = {
  name: 'tooltip_panel_ui_16', width: 16, height: 16,
  description: 'Item tooltip panel with stats and rarity border.',
  regions: [
    { name: 'frame', role: 'accessory', pixels: [...border(1, 0, 14, 14)] },
    { name: 'bg', role: 'body', pixels: [...rect(2, 1, 13, 13)] },
    { name: 'title', role: 'arm', pixels: [...hLine(2, 3, 12)] },
    { name: 'divider', role: 'belt', pixels: [...hLine(4, 2, 13)] },
    { name: 'stats', role: 'head', pixels: [
      ...hLine(6, 3, 8), ...hLine(8, 3, 10), ...hLine(10, 3, 7),
    ]},
    { name: 'icon_slot', role: 'eye', pixels: [...rect(10, 6, 12, 8)] },
    { name: 'flavor', role: 'arm', pixels: [...hLine(12, 3, 11)] },
  ],
};


// ═══════════════════════════════════════════════════════════════
// COLOR SCHEMES
// ═══════════════════════════════════════════════════════════════

const STAMINA_BAR_COLORS = scheme('stamina_bar_ui_default', { leg: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' } });
const ARMOR_ICON_COLORS = scheme('armor_icon_ui_default', { body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' }, accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' } });
const SWORD_ICON_COLORS = scheme('sword_icon_ui_default', { body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' }, accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' } });
const MAGIC_ICON_COLORS = scheme('magic_icon_ui_default', { accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, body: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' } });
const TIMER_CLOCK_COLORS = scheme('timer_clock_ui_default', { body: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' } });
const SCORE_COUNTER_COLORS = scheme('score_counter_ui_default', { eye: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' } });
const LIFE_HEART_COLORS = scheme('life_heart_ui_default', { body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' } });
const KEY_ICON_COLORS = scheme('key_icon_ui_default', { accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' } });
const MAP_COMPASS_COLORS = scheme('map_compass_ui_default', { body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' }, accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' } });
const INVENTORY_GRID_COLORS = scheme('inventory_grid_ui_default', { body: { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' } });
const AMMO_COUNTER_COLORS = scheme('ammo_counter_ui_default', { accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, belt: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' } });
const CROSSHAIR_COLORS = scheme('crosshair_ui_default', { body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' } });
const RADAR_SWEEP_COLORS = scheme('radar_sweep_ui_default', { body: { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' }, leg: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' } });
const SPEED_GAUGE_COLORS = scheme('speed_gauge_ui_default', { body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, belt: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' } });
const LAP_COUNTER_COLORS = scheme('lap_counter_ui_default', { eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, belt: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' } });
const GEM_COUNTER_COLORS = scheme('gem_counter_ui_default', { accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' } });
const PUZZLE_PIECE_COLORS = scheme('puzzle_piece_ui_default', { body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' } });
const HUNGER_BAR_COLORS = scheme('hunger_bar_ui_default', { leg: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' } });
const TEMPERATURE_COLORS = scheme('temperature_ui_default', { body: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' } });
const SHIELD_INDICATOR_COLORS = scheme('shield_indicator_ui_default', { body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' } });
const POTION_ICON_COLORS = scheme('potion_icon_ui_default', { body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' }, accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' } });
const NOTIFICATION_BADGE_COLORS = scheme('notification_badge_ui_default', { body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' } });
const CHAT_BUBBLE_COLORS = scheme('chat_bubble_ui_default', { body: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' } });
const SETTINGS_GEAR_COLORS = scheme('settings_gear_ui_default', { body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, accessory: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' } });
const MUSIC_NOTE_COLORS = scheme('music_note_ui_default', { body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' } });
const VOLUME_SPEAKER_COLORS = scheme('volume_speaker_ui_default', { body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' } });
const PAUSE_BUTTON_COLORS = scheme('pause_button_ui_default', { body: { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' }, accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' } });
const PLAY_BUTTON_COLORS = scheme('play_button_ui_default', { body: { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' }, accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' } });
const TROPHY_COLORS = scheme('trophy_ui_default', { accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' } });
const MEDAL_COLORS = scheme('medal_ui_default', { body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' } });
const LOADING_SPINNER_COLORS = scheme('loading_spinner_ui_default', { eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' } });
const CHECKBOX_COLORS = scheme('checkbox_ui_default', { body: { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' }, eye: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' } });
const SLIDER_BAR_COLORS = scheme('slider_bar_ui_default', { leg: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, body: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' } });
const TOGGLE_SWITCH_COLORS = scheme('toggle_switch_ui_default', { body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, eye: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' } });
const DROPDOWN_COLORS = scheme('dropdown_ui_default', { body: { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' } });
const PROGRESS_BAR_XP_COLORS = scheme('progress_bar_xp_ui_default', { leg: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' } });
const MINIMAP_SQUARE_COLORS = scheme('minimap_square_ui_default', { body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, belt: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' } });
const DIALOG_BOX_COLORS = scheme('dialog_box_ui_default', { body: { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' }, accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' } });
const ENERGY_ORB_COLORS = scheme('energy_orb_ui_default', { body: { shadow: '#140c1c', base: '#30346d', highlight: '#442434' }, leg: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' } });
const WEAPON_SLOT_COLORS = scheme('weapon_slot_ui_default', { body: { shadow: '#140c1c', base: '#30346d', highlight: '#442434' }, eye: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' } });
const SKILL_COOLDOWN_COLORS = scheme('skill_cooldown_ui_default', { body: { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' }, belt: { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' }, accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' } });
const MAP_ICON_COLORS = scheme('map_icon_ui_default', { body: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' }, accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' } });
const QUEST_EXCLAMATION_COLORS = scheme('quest_exclamation_ui_default', { accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' } });
const QUEST_QUESTION_COLORS = scheme('quest_question_ui_default', { accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' } });
const SAVE_ICON_COLORS = scheme('save_icon_ui_default', { body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' } });
const LOCK_ICON_COLORS = scheme('lock_icon_ui_default', { body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' } });
const CROWN_ICON_COLORS = scheme('crown_icon_ui_default', { accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#deeed6' } });
const SKULL_ICON_COLORS = scheme('skull_icon_ui_default', { body: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' } });
const ARROW_UP_COLORS = scheme('arrow_up_ui_default', { accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' } });
const SHIELD_HEALTH_COLORS = scheme('shield_health_ui_default', { body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, leg: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' } });
const MINIMAP_DUNGEON_COLORS = scheme('minimap_dungeon_ui_default', { body: { shadow: '#140c1c', base: '#30346d', highlight: '#442434' }, arm: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, boot: { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' } });
const STATUS_BAR_GROUP_COLORS = scheme('status_bar_group_ui_default', { body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, leg: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' } });
const TOOLTIP_PANEL_COLORS = scheme('tooltip_panel_ui_default', { accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, body: { shadow: '#140c1c', base: '#30346d', highlight: '#442434' }, eye: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' } });

// ═══════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════

export const UI_VARIETY_TEMPLATES: Record<string, SpriteTemplate> = {
  stamina_bar_ui_16: STAMINA_BAR_16,
  armor_icon_ui_16: ARMOR_ICON_16,
  sword_icon_ui_16: SWORD_ICON_16,
  magic_icon_ui_16: MAGIC_ICON_16,
  timer_clock_ui_16: TIMER_CLOCK_16,
  score_counter_ui_16: SCORE_COUNTER_16,
  life_heart_ui_16: LIFE_HEART_16,
  key_icon_ui_16: KEY_ICON_16,
  map_compass_ui_16: MAP_COMPASS_16,
  inventory_grid_ui_16: INVENTORY_GRID_16,
  ammo_counter_ui_16: AMMO_COUNTER_16,
  crosshair_ui_16: CROSSHAIR_16,
  radar_sweep_ui_16: RADAR_SWEEP_16,
  speed_gauge_ui_16: SPEED_GAUGE_16,
  lap_counter_ui_16: LAP_COUNTER_16,
  gem_counter_ui_16: GEM_COUNTER_16,
  puzzle_piece_ui_16: PUZZLE_PIECE_16,
  hunger_bar_ui_16: HUNGER_BAR_16,
  temperature_ui_16: TEMPERATURE_16,
  shield_indicator_ui_16: SHIELD_INDICATOR_16,
  potion_icon_ui_16: POTION_ICON_16,
  notification_badge_ui_16: NOTIFICATION_BADGE_16,
  chat_bubble_ui_16: CHAT_BUBBLE_16,
  settings_gear_ui_16: SETTINGS_GEAR_16,
  music_note_ui_16: MUSIC_NOTE_16,
  volume_speaker_ui_16: VOLUME_SPEAKER_16,
  pause_button_ui_16: PAUSE_BUTTON_16,
  play_button_ui_16: PLAY_BUTTON_16,
  trophy_ui_16: TROPHY_16,
  medal_ui_16: MEDAL_16,
  loading_spinner_ui_16: LOADING_SPINNER_16,
  checkbox_ui_16: CHECKBOX_16,
  slider_bar_ui_16: SLIDER_BAR_16,
  toggle_switch_ui_16: TOGGLE_SWITCH_16,
  dropdown_ui_16: DROPDOWN_16,
  progress_bar_xp_ui_16: PROGRESS_BAR_XP_16,
  minimap_square_ui_16: MINIMAP_SQUARE_16,
  dialog_box_ui_16: DIALOG_BOX_16,
  energy_orb_ui_16: ENERGY_ORB_16,
  weapon_slot_ui_16: WEAPON_SLOT_16,
  skill_cooldown_ui_16: SKILL_COOLDOWN_16,
  map_icon_ui_16: MAP_ICON_16,
  quest_exclamation_ui_16: QUEST_EXCLAMATION_16,
  quest_question_ui_16: QUEST_QUESTION_16,
  save_icon_ui_16: SAVE_ICON_16,
  lock_icon_ui_16: LOCK_ICON_16,
  crown_icon_ui_16: CROWN_ICON_16,
  skull_icon_ui_16: SKULL_ICON_16,
  arrow_up_ui_16: ARROW_UP_16,
  shield_health_ui_16: SHIELD_HEALTH_16,
  minimap_dungeon_ui_16: MINIMAP_DUNGEON_16,
  status_bar_group_ui_16: STATUS_BAR_GROUP_16,
  tooltip_panel_ui_16: TOOLTIP_PANEL_16,
};

export const UI_VARIETY_COLOR_SCHEMES: Record<string, ColorScheme> = {
  stamina_bar_ui_default: STAMINA_BAR_COLORS,
  armor_icon_ui_default: ARMOR_ICON_COLORS,
  sword_icon_ui_default: SWORD_ICON_COLORS,
  magic_icon_ui_default: MAGIC_ICON_COLORS,
  timer_clock_ui_default: TIMER_CLOCK_COLORS,
  score_counter_ui_default: SCORE_COUNTER_COLORS,
  life_heart_ui_default: LIFE_HEART_COLORS,
  key_icon_ui_default: KEY_ICON_COLORS,
  map_compass_ui_default: MAP_COMPASS_COLORS,
  inventory_grid_ui_default: INVENTORY_GRID_COLORS,
  ammo_counter_ui_default: AMMO_COUNTER_COLORS,
  crosshair_ui_default: CROSSHAIR_COLORS,
  radar_sweep_ui_default: RADAR_SWEEP_COLORS,
  speed_gauge_ui_default: SPEED_GAUGE_COLORS,
  lap_counter_ui_default: LAP_COUNTER_COLORS,
  gem_counter_ui_default: GEM_COUNTER_COLORS,
  puzzle_piece_ui_default: PUZZLE_PIECE_COLORS,
  hunger_bar_ui_default: HUNGER_BAR_COLORS,
  temperature_ui_default: TEMPERATURE_COLORS,
  shield_indicator_ui_default: SHIELD_INDICATOR_COLORS,
  potion_icon_ui_default: POTION_ICON_COLORS,
  notification_badge_ui_default: NOTIFICATION_BADGE_COLORS,
  chat_bubble_ui_default: CHAT_BUBBLE_COLORS,
  settings_gear_ui_default: SETTINGS_GEAR_COLORS,
  music_note_ui_default: MUSIC_NOTE_COLORS,
  volume_speaker_ui_default: VOLUME_SPEAKER_COLORS,
  pause_button_ui_default: PAUSE_BUTTON_COLORS,
  play_button_ui_default: PLAY_BUTTON_COLORS,
  trophy_ui_default: TROPHY_COLORS,
  medal_ui_default: MEDAL_COLORS,
  loading_spinner_ui_default: LOADING_SPINNER_COLORS,
  checkbox_ui_default: CHECKBOX_COLORS,
  slider_bar_ui_default: SLIDER_BAR_COLORS,
  toggle_switch_ui_default: TOGGLE_SWITCH_COLORS,
  dropdown_ui_default: DROPDOWN_COLORS,
  progress_bar_xp_ui_default: PROGRESS_BAR_XP_COLORS,
  minimap_square_ui_default: MINIMAP_SQUARE_COLORS,
  dialog_box_ui_default: DIALOG_BOX_COLORS,
  energy_orb_ui_default: ENERGY_ORB_COLORS,
  weapon_slot_ui_default: WEAPON_SLOT_COLORS,
  skill_cooldown_ui_default: SKILL_COOLDOWN_COLORS,
  map_icon_ui_default: MAP_ICON_COLORS,
  quest_exclamation_ui_default: QUEST_EXCLAMATION_COLORS,
  quest_question_ui_default: QUEST_QUESTION_COLORS,
  save_icon_ui_default: SAVE_ICON_COLORS,
  lock_icon_ui_default: LOCK_ICON_COLORS,
  crown_icon_ui_default: CROWN_ICON_COLORS,
  skull_icon_ui_default: SKULL_ICON_COLORS,
  arrow_up_ui_default: ARROW_UP_COLORS,
  shield_health_ui_default: SHIELD_HEALTH_COLORS,
  minimap_dungeon_ui_default: MINIMAP_DUNGEON_COLORS,
  status_bar_group_ui_default: STATUS_BAR_GROUP_COLORS,
  tooltip_panel_ui_default: TOOLTIP_PANEL_COLORS,
};
