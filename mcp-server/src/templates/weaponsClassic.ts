/**
 * 16x16 classic fantasy/medieval weapon and shield templates — 20 NEW items.
 * Target density: 28-50% (weapons are thinner than characters).
 * DB16 palette only. 1-2px margin on edges. Min 2px width for handles/shafts.
 *
 * Templates:
 *  1.  broadsword         - wide two-handed sword
 *  2.  rapier             - thin elegant fencing sword
 *  3.  claymore           - massive highland sword
 *  4.  scimitar           - curved desert blade
 *  5.  gladius            - roman short sword
 *  6.  zweihander         - huge german two-handed sword
 *  7.  kite_shield        - tall pointed shield
 *  8.  buckler            - small round shield
 *  9.  heater_shield      - classic knight shield with emblem
 * 10.  tower_shield_wood  - large wooden shield
 * 11.  longbow            - tall bow
 * 12.  recurve_bow        - curved bow
 * 13.  battle_axe_double  - double-headed axe
 * 14.  throwing_axe       - small tomahawk
 * 15.  lance              - jousting lance
 * 16.  pike               - long pole weapon
 * 17.  mace_flanged       - flanged mace
 * 18.  quarterstaff       - wooden staff
 * 19.  war_fan            - bladed fan weapon
 * 20.  kusarigama         - chain-sickle weapon
 */

import { SpriteTemplate, ColorScheme } from './humanoid16.js';

// ── helpers ──────────────────────────────────────────────────

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

function border(x0: number, y0: number, x1: number, y1: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let x = x0; x <= x1; x++) { out.push([x, y0]); out.push([x, y1]); }
  for (let y = y0 + 1; y < y1; y++) { out.push([x0, y]); out.push([x1, y]); }
  return out;
}

// ── tone presets (DB16) ──────────────────────────────────────

const WC_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // Wood dark
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },   // Metal dark
  face:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },   // Metal light
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },   // Bright highlight
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },   // Blade steel
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // Handle wood/leather
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // Gold/brass
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },   // Leather wrap
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // Lower wood
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },   // Base/tip dark
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // Gold accent
};

function scheme(name: string, overrides: Partial<typeof WC_BASE>): ColorScheme {
  return { name, mapping: { ...WC_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. BROADSWORD — Wide two-handed sword
// Density: ~34% (blade 5px wide, long grip, ornate guard)
// ════════════════════════════════════════════════════════════
export const BROADSWORD_16: SpriteTemplate = {
  name: 'broadsword_16', width: 16, height: 16,
  description: 'Wide two-handed broadsword with broad blade, cross guard, and long grip.',
  regions: [
    // Blade tip (y1) — pointed
    { name: 'blade_tip', role: 'eye', pixels: [
      [7, 1], [8, 1],
    ]},
    // Blade (y2-7) — 5px wide filled
    { name: 'blade', role: 'body', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
    ]},
    // Blade fuller (center groove highlight)
    { name: 'blade_fuller', role: 'face', pixels: [
      ...vLine(7, 2, 7), ...vLine(8, 2, 7),
    ]},
    // Cross guard (y8) — wide horizontal with ends
    { name: 'guard', role: 'accessory', pixels: [
      ...hLine(8, 2, 13),
      [2, 9], [13, 9],
    ]},
    // Grip (y9-12) — 3px wide wrapped
    { name: 'grip', role: 'belt', pixels: [
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Grip wrap pattern
    { name: 'wrap', role: 'arm', pixels: [
      [5, 9], [10, 10], [5, 11], [10, 12],
    ]},
    // Pommel (y13-14) — large round
    { name: 'pommel', role: 'hand', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

export const BROADSWORD_COLORS = scheme('broadsword_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  face:      { shadow: '#8595a1', base: '#d2aa99',  highlight: '#deeed6' },
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  arm:       { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  eye:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 2. RAPIER — Thin elegant fencing sword
// Density: ~29% (thin blade, large swept hilt, knuckle bow)
// ════════════════════════════════════════════════════════════
export const RAPIER_16: SpriteTemplate = {
  name: 'rapier_16', width: 16, height: 16,
  description: 'Thin elegant rapier with narrow blade, swept hilt guard, and wrapped grip.',
  regions: [
    // Blade tip (y1)
    { name: 'blade_tip', role: 'eye', pixels: [
      [7, 1], [8, 1],
    ]},
    // Thin blade (y2-7) — 3px wide for visibility
    { name: 'blade', role: 'body', pixels: [
      [7, 2], [8, 2], [9, 2],
      [7, 3], [8, 3], [9, 3],
      [7, 4], [8, 4], [9, 4],
      [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7], [9, 7],
    ]},
    // Blade edge highlight
    { name: 'blade_edge', role: 'face', pixels: [
      [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7],
    ]},
    // Swept hilt — elegant curved guard (y8-9)
    { name: 'swept_hilt', role: 'accessory', pixels: [
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      [3, 9], [4, 9], [11, 9], [12, 9],
    ]},
    // Knuckle bow — curved guard arm (y9-12)
    { name: 'knuckle_bow', role: 'hand', pixels: [
      [4, 10], [4, 11], [4, 12],
      [5, 12],
    ]},
    // Grip (y9-12) — 3px wide
    { name: 'grip', role: 'belt', pixels: [
      [7, 9], [8, 9], [9, 9],
      [7, 10], [8, 10], [9, 10],
      [7, 11], [8, 11], [9, 11],
      [7, 12], [8, 12], [9, 12],
    ]},
    // Pommel (y13)
    { name: 'pommel', role: 'hand', pixels: [
      [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
  ],
};

export const RAPIER_COLORS = scheme('rapier_default', {
  body:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },
  face:      { shadow: '#8595a1', base: '#deeed6',  highlight: '#deeed6' },
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 3. CLAYMORE — Massive highland sword
// Density: ~34% (4px wide blade, V-guard, big pommel)
// ════════════════════════════════════════════════════════════
export const CLAYMORE_16: SpriteTemplate = {
  name: 'claymore_16', width: 16, height: 16,
  description: 'Massive Scottish claymore with long blade, V-angled guard, and large pommel.',
  regions: [
    // Blade tip (y0-1) — sharp point
    { name: 'blade_tip', role: 'eye', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
    ]},
    // Blade (y2-7) — 4px wide heavy
    { name: 'blade', role: 'body', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
    ]},
    // Fuller
    { name: 'fuller', role: 'face', pixels: [
      ...vLine(7, 2, 7), ...vLine(8, 2, 7),
    ]},
    // V-angled guard (y8-9) — wide with angled tips
    { name: 'guard', role: 'accessory', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      [3, 9], [4, 9], [11, 9], [12, 9],
    ]},
    // Ricasso (y9)
    { name: 'ricasso', role: 'head', pixels: [
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Grip (y10-12) — long for two hands
    { name: 'grip', role: 'belt', pixels: [
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Pommel (y13-14) — large wheel pommel
    { name: 'pommel', role: 'hand', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

export const CLAYMORE_COLORS = scheme('claymore_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },
  face:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },
  accessory: { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  hand:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 4. SCIMITAR — Curved desert blade
// Density: ~31% (wide curved blade, ornate guard, decorated grip)
// ════════════════════════════════════════════════════════════
export const SCIMITAR_16: SpriteTemplate = {
  name: 'scimitar_16', width: 16, height: 16,
  description: 'Curved desert scimitar with sweeping blade, brass guard, and ivory grip.',
  regions: [
    // Blade tip — curved top (y1-2)
    { name: 'blade_tip', role: 'eye', pixels: [
      [11, 1],
      [10, 2], [11, 2],
    ]},
    // Curved blade (y3-8) — sweeping wide curve
    { name: 'blade', role: 'body', pixels: [
      [9, 3], [10, 3], [11, 3],
      [8, 4], [9, 4], [10, 4], [11, 4],
      [7, 5], [8, 5], [9, 5], [10, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [5, 7], [6, 7], [7, 7], [8, 7],
      [5, 8], [6, 8], [7, 8], [8, 8],
    ]},
    // Blade edge highlight — outer curve
    { name: 'blade_edge', role: 'face', pixels: [
      [11, 3], [11, 4], [10, 5], [9, 6], [8, 7], [8, 8],
    ]},
    // Guard — curved brass (y9)
    { name: 'guard', role: 'accessory', pixels: [
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ]},
    // Guard filigree
    { name: 'guard_detail', role: 'hand', pixels: [
      [4, 10], [9, 10],
    ]},
    // Grip (y10-12) — 3px wide
    { name: 'grip', role: 'belt', pixels: [
      [6, 10], [7, 10], [8, 10],
      [6, 11], [7, 11], [8, 11],
      [6, 12], [7, 12], [8, 12],
    ]},
    // Pommel (y13)
    { name: 'pommel', role: 'hand', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
  ],
};

export const SCIMITAR_COLORS = scheme('scimitar_default', {
  body:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },
  face:      { shadow: '#8595a1', base: '#d2aa99',  highlight: '#deeed6' },
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  belt:      { shadow: '#757161', base: '#d2aa99',  highlight: '#deeed6' },
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 5. GLADIUS — Roman short sword
// Density: ~30% (leaf-shaped blade, wide guard, decorated pommel)
// ════════════════════════════════════════════════════════════
export const GLADIUS_16: SpriteTemplate = {
  name: 'gladius_16', width: 16, height: 16,
  description: 'Roman gladius with leaf-shaped blade, wooden grip, and round pommel.',
  regions: [
    // Blade tip (y1) — pointed
    { name: 'blade_tip', role: 'eye', pixels: [
      [7, 1], [8, 1],
    ]},
    // Blade — leaf-shaped (y2-7) — widens then narrows
    { name: 'blade', role: 'body', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    // Fuller / center line
    { name: 'fuller', role: 'face', pixels: [
      [7, 3], [8, 3],
      [7, 4], [8, 4],
      [7, 5], [8, 5],
    ]},
    // Guard (y8) — block guard
    { name: 'guard', role: 'accessory', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
    ]},
    // Grip (y9-12) — 3px wide
    { name: 'grip', role: 'arm', pixels: [
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Round pommel (y13-14)
    { name: 'pommel', role: 'hand', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

export const GLADIUS_COLORS = scheme('gladius_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  face:      { shadow: '#8595a1', base: '#d2aa99',  highlight: '#deeed6' },
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 6. ZWEIHANDER — Huge German two-handed sword
// Density: ~34% (5px wavy blade, parierhaken, long ricasso)
// ════════════════════════════════════════════════════════════
export const ZWEIHANDER_16: SpriteTemplate = {
  name: 'zweihander_16', width: 16, height: 16,
  description: 'Massive German zweihander with wavy blade, parierhaken lugs, and long ricasso.',
  regions: [
    // Blade tip (y0) — sharp point
    { name: 'blade_tip', role: 'eye', pixels: [
      [7, 0], [8, 0],
    ]},
    // Wavy blade (y1-6) — 5px wide with wavy edges
    { name: 'blade', role: 'body', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
    ]},
    // Blade center line
    { name: 'fuller', role: 'face', pixels: [
      ...vLine(7, 1, 6), ...vLine(8, 1, 6),
    ]},
    // Parierhaken — side lugs (y7)
    { name: 'parierhaken', role: 'head', pixels: [
      [3, 7], [4, 7], [5, 7], [10, 7], [11, 7], [12, 7],
    ]},
    // Cross guard (y7)
    { name: 'guard', role: 'accessory', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    // Ricasso — unsharpened portion (y8-9) — wider
    { name: 'ricasso', role: 'head', pixels: [
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Grip (y10-13) — very long, 3px wide
    { name: 'grip', role: 'belt', pixels: [
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Pommel (y14) — wide
    { name: 'pommel', role: 'hand', pixels: [
      [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14],
    ]},
  ],
};

export const ZWEIHANDER_COLORS = scheme('zweihander_default', {
  body:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  face:      { shadow: '#757161', base: '#8595a1',  highlight: '#d2aa99' },
  head:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  accessory: { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  hand:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  eye:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 7. KITE_SHIELD — Tall pointed shield
// Density: ~40% (large filled shield body, central boss)
// ════════════════════════════════════════════════════════════
export const KITE_SHIELD_16: SpriteTemplate = {
  name: 'kite_shield_16', width: 16, height: 16,
  description: 'Tall kite shield with rounded top and pointed bottom, central boss, and rim.',
  regions: [
    // Shield rim — outer border
    { name: 'rim', role: 'head', pixels: [
      ...hLine(1, 5, 10),
      [4, 2], [11, 2],
      [3, 3], [12, 3],
      [3, 4], [12, 4],
      [3, 5], [12, 5],
      [3, 6], [12, 6],
      [3, 7], [12, 7],
      [4, 8], [11, 8],
      [4, 9], [11, 9],
      [5, 10], [10, 10],
      [5, 11], [10, 11],
      [6, 12], [9, 12],
      [7, 13], [8, 13],
    ]},
    // Shield face — main surface
    { name: 'shield_face', role: 'body', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 5, 10),
      ...hLine(9, 5, 10),
      ...hLine(10, 6, 9),
      ...hLine(11, 6, 9),
      [7, 12], [8, 12],
    ]},
    // Central boss — raised center
    { name: 'boss', role: 'accessory', pixels: [
      [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7],
    ]},
    // Boss highlight
    { name: 'boss_highlight', role: 'eye', pixels: [
      [7, 5], [8, 5],
    ]},
  ],
};

export const KITE_SHIELD_COLORS = scheme('kite_shield_default', {
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  eye:       { shadow: '#dad45e', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 8. BUCKLER — Small round shield
// Density: ~30% (round shield with decorative rivets and bands)
// ════════════════════════════════════════════════════════════
export const BUCKLER_16: SpriteTemplate = {
  name: 'buckler_16', width: 16, height: 16,
  description: 'Small round buckler shield with central boss and riveted rim.',
  regions: [
    // Rim — circular border
    { name: 'rim', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      [4, 3], [11, 3],
      [3, 4], [12, 4],
      [3, 5], [12, 5],
      [3, 6], [12, 6],
      [3, 7], [12, 7],
      [3, 8], [12, 8],
      [3, 9], [12, 9],
      [4, 10], [11, 10],
      ...hLine(11, 5, 10),
    ]},
    // Shield face — interior
    { name: 'shield_face', role: 'body', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 4, 11),
      ...hLine(10, 5, 10),
    ]},
    // Central boss — larger
    { name: 'boss', role: 'accessory', pixels: [
      [7, 5], [8, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      [7, 8], [8, 8],
    ]},
    // Boss highlight
    { name: 'boss_gleam', role: 'eye', pixels: [
      [7, 6], [8, 6],
    ]},
    // Rivets — decorative points on rim
    { name: 'rivets', role: 'hand', pixels: [
      [7, 2], [8, 2],
      [3, 6], [3, 7],
      [12, 6], [12, 7],
      [7, 11], [8, 11],
    ]},
    // Cross band decoration
    { name: 'bands', role: 'arm', pixels: [
      ...vLine(7, 3, 10), ...vLine(8, 3, 10),
    ]},
  ],
};

export const BUCKLER_COLORS = scheme('buckler_default', {
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#d2aa99' },
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  arm:       { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 9. HEATER_SHIELD — Classic knight shield with emblem
// Density: ~36% (wide shield, heraldic cross, decorated rim)
// ════════════════════════════════════════════════════════════
export const HEATER_SHIELD_16: SpriteTemplate = {
  name: 'heater_shield_16', width: 16, height: 16,
  description: 'Classic heater shield with heraldic cross emblem, iron rim, and leather straps.',
  regions: [
    // Shield rim — outer edge
    { name: 'rim', role: 'head', pixels: [
      ...hLine(2, 4, 11),
      [3, 3], [12, 3],
      [3, 4], [12, 4],
      [3, 5], [12, 5],
      [3, 6], [12, 6],
      [3, 7], [12, 7],
      [4, 8], [11, 8],
      [4, 9], [11, 9],
      [5, 10], [10, 10],
      [6, 11], [9, 11],
      [7, 12], [8, 12],
    ]},
    // Shield face — main surface
    { name: 'shield_face', role: 'body', pixels: [
      ...hLine(3, 4, 11),
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 5, 10),
      ...hLine(9, 5, 10),
      ...hLine(10, 6, 9),
      [7, 11], [8, 11],
    ]},
    // Heraldic cross emblem
    { name: 'cross', role: 'accessory', pixels: [
      [7, 3], [8, 3],
      [7, 4], [8, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
    ]},
    // Cross highlight
    { name: 'cross_gleam', role: 'eye', pixels: [
      [7, 5], [8, 5],
    ]},
  ],
};

export const HEATER_SHIELD_COLORS = scheme('heater_shield_default', {
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  body:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  accessory: { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 10. TOWER_SHIELD_WOOD — Large wooden shield
// Density: ~48% (fills most of the grid, wood planks + iron bands)
// ════════════════════════════════════════════════════════════
export const TOWER_SHIELD_WOOD_16: SpriteTemplate = {
  name: 'tower_shield_wood_16', width: 16, height: 16,
  description: 'Large rectangular wooden tower shield with iron bands, handle, and scutum shape.',
  regions: [
    // Iron top band (y1)
    { name: 'top_band', role: 'head', pixels: [
      ...hLine(1, 3, 12),
    ]},
    // Wood planks — main body (y2-12)
    { name: 'wood_body', role: 'body', pixels: [
      ...rect(3, 2, 12, 12),
    ]},
    // Plank lines — vertical grain
    { name: 'plank_lines', role: 'arm', pixels: [
      ...vLine(5, 2, 12),
      ...vLine(8, 2, 12),
      ...vLine(11, 2, 12),
    ]},
    // Iron center band (horizontal)
    { name: 'center_band', role: 'head', pixels: [
      ...hLine(7, 3, 12),
    ]},
    // Iron bottom band (y13)
    { name: 'bottom_band', role: 'head', pixels: [
      ...hLine(13, 3, 12),
    ]},
    // Central boss
    { name: 'boss', role: 'accessory', pixels: [
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    // Boss gleam
    { name: 'boss_gleam', role: 'eye', pixels: [
      [7, 7],
    ]},
  ],
};

export const TOWER_SHIELD_WOOD_COLORS = scheme('tower_shield_wood_default', {
  head:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  arm:       { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  accessory: { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  eye:       { shadow: '#8595a1', base: '#d2aa99',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 11. LONGBOW — Tall bow
// Density: ~28% (thick limbs, arrow, bowstring, leather grip)
// ════════════════════════════════════════════════════════════
export const LONGBOW_16: SpriteTemplate = {
  name: 'longbow_16', width: 16, height: 16,
  description: 'Tall English longbow with thick limbs, nocked arrow, taut string, and leather grip.',
  regions: [
    // Arrow tip
    { name: 'arrow_tip', role: 'eye', pixels: [
      [5, 1], [6, 1],
    ]},
    // Arrow shaft
    { name: 'arrow_shaft', role: 'face', pixels: [
      [5, 2], [6, 2],
      [5, 3], [6, 3],
      [5, 4], [6, 4],
      [5, 5], [6, 5],
      [5, 6], [6, 6],
      [5, 7], [6, 7],
    ]},
    // Arrow fletching
    { name: 'arrow_fletch', role: 'leg', pixels: [
      [4, 7], [7, 7],
      [4, 8], [7, 8],
    ]},
    // Bow upper tip (y1)
    { name: 'upper_tip', role: 'boot', pixels: [
      [10, 1], [11, 1],
    ]},
    // Upper limb (y2-5) — thick 2-3px
    { name: 'upper_limb', role: 'body', pixels: [
      [10, 2], [11, 2], [12, 2],
      [11, 3], [12, 3], [13, 3],
      [11, 4], [12, 4], [13, 4],
      [12, 5], [13, 5],
    ]},
    // Grip (y6-9) — center, wrapped
    { name: 'grip', role: 'arm', pixels: [
      [12, 6], [13, 6],
      [12, 7], [13, 7],
      [12, 8], [13, 8],
      [12, 9], [13, 9],
    ]},
    // Grip wrap accent
    { name: 'grip_wrap', role: 'belt', pixels: [
      [11, 7], [14, 8],
    ]},
    // Lower limb (y10-13) — thick 2-3px
    { name: 'lower_limb', role: 'body', pixels: [
      [12, 10], [13, 10],
      [11, 11], [12, 11], [13, 11],
      [10, 12], [11, 12], [12, 12],
      [10, 13], [11, 13],
    ]},
    // Lower tip (y14)
    { name: 'lower_tip', role: 'boot', pixels: [
      [10, 14], [11, 14],
    ]},
    // Bowstring (y1-14)
    { name: 'bowstring', role: 'face', pixels: [
      ...vLine(9, 1, 14),
    ]},
  ],
};

export const LONGBOW_COLORS = scheme('longbow_default', {
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  arm:       { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  face:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
  leg:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  eye:       { shadow: '#8595a1', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 12. RECURVE_BOW — Curved bow with recurved tips
// Density: ~28% (thicker limbs, arrow, recurved ends)
// ════════════════════════════════════════════════════════════
export const RECURVE_BOW_16: SpriteTemplate = {
  name: 'recurve_bow_16', width: 16, height: 16,
  description: 'Recurve bow with forward-curved tips, compact body, and sinew string.',
  regions: [
    // Upper recurve tip (y1-2) — curves forward
    { name: 'upper_tip', role: 'accessory', pixels: [
      [7, 1], [8, 1], [9, 1],
      [9, 2], [10, 2],
    ]},
    // Upper limb (y2-4) — thick
    { name: 'upper_limb', role: 'body', pixels: [
      [10, 2], [11, 2], [12, 2],
      [11, 3], [12, 3], [13, 3],
      [12, 4], [13, 4],
    ]},
    // Grip (y5-9) — center section, wide
    { name: 'grip', role: 'arm', pixels: [
      [12, 5], [13, 5], [14, 5],
      [12, 6], [13, 6], [14, 6],
      [12, 7], [13, 7], [14, 7],
      [12, 8], [13, 8], [14, 8],
      [12, 9], [13, 9], [14, 9],
    ]},
    // Arrow rest
    { name: 'arrow_rest', role: 'hand', pixels: [
      [11, 7], [11, 8],
    ]},
    // Sight window
    { name: 'sight', role: 'belt', pixels: [
      [11, 5], [11, 6],
    ]},
    // Lower limb (y10-12) — thick
    { name: 'lower_limb', role: 'body', pixels: [
      [12, 10], [13, 10],
      [11, 11], [12, 11], [13, 11],
      [10, 12], [11, 12], [12, 12],
    ]},
    // Lower recurve tip (y13-14) — curves forward
    { name: 'lower_tip', role: 'accessory', pixels: [
      [9, 13], [10, 13],
      [7, 14], [8, 14], [9, 14],
    ]},
    // Bowstring (y1-14)
    { name: 'bowstring', role: 'face', pixels: [
      ...vLine(8, 2, 13),
    ]},
  ],
};

export const RECURVE_BOW_COLORS = scheme('recurve_bow_default', {
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  arm:       { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },
  accessory: { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  face:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 13. BATTLE_AXE_DOUBLE — Double-headed axe
// Density: ~33% (two wide blade heads, thick shaft)
// ════════════════════════════════════════════════════════════
export const BATTLE_AXE_DOUBLE_16: SpriteTemplate = {
  name: 'battle_axe_double_16', width: 16, height: 16,
  description: 'Double-headed battle axe with two wide blades, reinforced shaft, and leather grip.',
  regions: [
    // Left blade (y2-6) — curved axe head
    { name: 'left_blade', role: 'body', pixels: [
      [3, 2], [4, 2],
      [2, 3], [3, 3], [4, 3],
      [1, 4], [2, 4], [3, 4], [4, 4],
      [2, 5], [3, 5], [4, 5],
      [3, 6], [4, 6],
    ]},
    // Right blade (y2-6) — mirror
    { name: 'right_blade', role: 'body', pixels: [
      [11, 2], [12, 2],
      [11, 3], [12, 3], [13, 3],
      [11, 4], [12, 4], [13, 4], [14, 4],
      [11, 5], [12, 5], [13, 5],
      [11, 6], [12, 6],
    ]},
    // Blade edge highlights
    { name: 'edge_gleam', role: 'eye', pixels: [
      [1, 4], [14, 4],
    ]},
    // Axe head center — connects blades to shaft (y2-6)
    { name: 'axe_head', role: 'head', pixels: [
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
    ]},
    // Shaft (y7-12) — 3px wide
    { name: 'shaft', role: 'arm', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [7, 12], [8, 12],
    ]},
    // Grip wrap
    { name: 'grip_wrap', role: 'belt', pixels: [
      [5, 8], [10, 9], [5, 10], [10, 11],
    ]},
    // Butt cap (y13)
    { name: 'butt_cap', role: 'boot', pixels: [
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
  ],
};

export const BATTLE_AXE_DOUBLE_COLORS = scheme('battle_axe_double_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  belt:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 14. THROWING_AXE — Small tomahawk
// Density: ~29% (compact wide head, decorated handle)
// ════════════════════════════════════════════════════════════
export const THROWING_AXE_16: SpriteTemplate = {
  name: 'throwing_axe_16', width: 16, height: 16,
  description: 'Small throwing axe (tomahawk) with compact head and short handle.',
  regions: [
    // Axe blade — wider head (y1-6)
    { name: 'blade', role: 'body', pixels: [
      [4, 1], [5, 1], [6, 1],
      [3, 2], [4, 2], [5, 2], [6, 2],
      [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
      [2, 4], [3, 4], [4, 4], [5, 4], [6, 4],
      [2, 5], [3, 5], [4, 5], [5, 5], [6, 5],
      [3, 6], [4, 6], [5, 6], [6, 6],
    ]},
    // Edge gleam
    { name: 'edge_gleam', role: 'eye', pixels: [
      [2, 3], [2, 4], [2, 5],
    ]},
    // Head socket — where blade meets shaft (y2-6)
    { name: 'socket', role: 'head', pixels: [
      [7, 2], [8, 2],
      [7, 3], [8, 3],
      [7, 4], [8, 4],
      [7, 5], [8, 5],
      [7, 6], [8, 6],
    ]},
    // Handle (y7-12) — 2px wide
    { name: 'handle', role: 'arm', pixels: [
      [7, 7], [8, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ]},
    // Grip wrap — decorated
    { name: 'grip_wrap', role: 'belt', pixels: [
      [6, 8], [9, 9], [6, 10], [9, 11],
    ]},
    // Butt (y13)
    { name: 'butt', role: 'boot', pixels: [
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
  ],
};

export const THROWING_AXE_COLORS = scheme('throwing_axe_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  head:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  belt:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },
  boot:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 15. LANCE — Jousting lance
// Density: ~29% (wide conical head, vamplate, thick shaft)
// ════════════════════════════════════════════════════════════
export const LANCE_16: SpriteTemplate = {
  name: 'lance_16', width: 16, height: 16,
  description: 'Jousting lance with steel tip, fluted vamplate guard, and long wooden shaft.',
  regions: [
    // Lance tip — sharp point (y0-1)
    { name: 'tip', role: 'eye', pixels: [
      [7, 0], [8, 0],
      [6, 1], [7, 1], [8, 1], [9, 1],
    ]},
    // Lance head — conical (y2-4)
    { name: 'lance_head', role: 'body', pixels: [
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    // Vamplate — hand guard disc (y5-6)
    { name: 'vamplate', role: 'accessory', pixels: [
      [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
    ]},
    // Shaft upper (y7-9) — 3px wide
    { name: 'shaft_upper', role: 'arm', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Grip area (y10-11)
    { name: 'grip', role: 'belt', pixels: [
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
    ]},
    // Shaft lower (y12-14) — 2px wide
    { name: 'shaft_lower', role: 'leg', pixels: [
      [7, 12], [8, 12],
      [7, 13], [8, 13],
      [7, 14], [8, 14],
    ]},
  ],
};

export const LANCE_COLORS = scheme('lance_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  accessory: { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  belt:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  eye:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 16. PIKE — Long pole weapon
// Density: ~28% (large spearhead, thick langets, wide shaft)
// ════════════════════════════════════════════════════════════
export const PIKE_16: SpriteTemplate = {
  name: 'pike_16', width: 16, height: 16,
  description: 'Long pike with leaf-shaped spearhead, metal langets, and ash shaft.',
  regions: [
    // Spearhead tip (y0)
    { name: 'spear_tip', role: 'eye', pixels: [
      [7, 0], [8, 0],
    ]},
    // Spearhead — leaf-shaped (y1-4)
    { name: 'spearhead', role: 'body', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    // Spearhead center
    { name: 'spear_center', role: 'face', pixels: [
      [7, 1], [8, 1],
      [7, 2], [8, 2],
      [7, 3], [8, 3],
    ]},
    // Langets — metal cheek pieces (y5-6)
    { name: 'langets', role: 'head', pixels: [
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
    ]},
    // Shaft (y7-13) — 3px wide
    { name: 'shaft', role: 'arm', pixels: [
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
    ]},
    // Butt spike (y14)
    { name: 'butt_spike', role: 'boot', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

export const PIKE_COLORS = scheme('pike_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  face:      { shadow: '#8595a1', base: '#d2aa99',  highlight: '#deeed6' },
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  eye:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 17. MACE_FLANGED — Flanged mace
// Density: ~30% (wide flanges, large head, thick shaft)
// ════════════════════════════════════════════════════════════
export const MACE_FLANGED_16: SpriteTemplate = {
  name: 'mace_flanged_16', width: 16, height: 16,
  description: 'Flanged mace with protruding metal flanges, round head, and leather grip.',
  regions: [
    // Top spike
    { name: 'top_spike', role: 'eye', pixels: [
      [7, 0], [8, 0],
    ]},
    // Flanges — protruding blades around head (y1-6)
    { name: 'flanges', role: 'body', pixels: [
      // Top flange
      [6, 1], [7, 1], [8, 1], [9, 1],
      // Left flange
      [3, 3], [4, 3], [5, 3],
      [3, 4], [4, 4], [5, 4],
      // Right flange
      [10, 3], [11, 3], [12, 3],
      [10, 4], [11, 4], [12, 4],
      // Bottom flange
      [6, 6], [7, 6], [8, 6], [9, 6],
    ]},
    // Mace head — central mass (y2-5)
    { name: 'mace_head', role: 'head', pixels: [
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
    ]},
    // Head highlight
    { name: 'head_gleam', role: 'face', pixels: [
      [7, 3], [8, 3],
      [7, 4], [8, 4],
    ]},
    // Neck (y7) — transition to shaft
    { name: 'neck', role: 'head', pixels: [
      [7, 7], [8, 7],
    ]},
    // Shaft (y8-12) — 3px wide
    { name: 'shaft', role: 'arm', pixels: [
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [7, 12], [8, 12],
    ]},
    // Grip wrap
    { name: 'grip_wrap', role: 'belt', pixels: [
      [5, 9], [10, 10], [5, 11],
    ]},
    // Pommel (y13)
    { name: 'pommel', role: 'accessory', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
    ]},
  ],
};

export const MACE_FLANGED_COLORS = scheme('mace_flanged_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  face:      { shadow: '#8595a1', base: '#d2aa99',  highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  belt:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 18. QUARTERSTAFF — Wooden staff
// Density: ~29% (thick 3px staff, wide iron caps, decorated center)
// ════════════════════════════════════════════════════════════
export const QUARTERSTAFF_16: SpriteTemplate = {
  name: 'quarterstaff_16', width: 16, height: 16,
  description: 'Simple wooden quarterstaff with iron-shod ends and leather grip.',
  regions: [
    // Top iron cap (y1)
    { name: 'top_cap', role: 'head', pixels: [
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
    ]},
    // Iron ferrule
    { name: 'ferrule_top', role: 'boot', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
    ]},
    // Upper shaft (y3-5) — 3px wide
    { name: 'upper_shaft', role: 'body', pixels: [
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Grip section (y6-9) — leather wrapped center
    { name: 'grip', role: 'belt', pixels: [
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Grip pattern
    { name: 'grip_pattern', role: 'arm', pixels: [
      [5, 6], [10, 7], [5, 8], [10, 9],
    ]},
    // Lower shaft (y10-12) — 3px wide
    { name: 'lower_shaft', role: 'body', pixels: [
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Iron ferrule bottom
    { name: 'ferrule_bottom', role: 'boot', pixels: [
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Bottom iron cap (y14)
    { name: 'bottom_cap', role: 'head', pixels: [
      [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14],
    ]},
  ],
};

export const QUARTERSTAFF_COLORS = scheme('quarterstaff_default', {
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  head:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  arm:       { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
});

// ════════════════════════════════════════════════════════════
// 19. WAR_FAN — Bladed fan weapon (tessen)
// Density: ~33% (wide fan surface, sharp edges, handle)
// ════════════════════════════════════════════════════════════
export const WAR_FAN_16: SpriteTemplate = {
  name: 'war_fan_16', width: 16, height: 16,
  description: 'Japanese war fan (tessen) with sharp metal ribs and decorative surface.',
  regions: [
    // Fan blades — spread arc (y1-8)
    { name: 'fan_surface', role: 'body', pixels: [
      ...hLine(1, 5, 10),
      ...hLine(2, 4, 11),
      ...hLine(3, 3, 12),
      ...hLine(4, 3, 12),
      ...hLine(5, 3, 12),
      ...hLine(6, 4, 11),
      ...hLine(7, 5, 10),
      ...hLine(8, 6, 9),
    ]},
    // Metal ribs — radial lines
    { name: 'ribs', role: 'head', pixels: [
      [5, 1], [4, 3], [3, 5],
      [7, 1], [7, 3], [7, 5], [7, 7],
      [8, 1], [8, 3], [8, 5], [8, 7],
      [10, 1], [11, 3], [12, 5],
    ]},
    // Edge blades — sharp outer rim
    { name: 'edge_blades', role: 'accessory', pixels: [
      [3, 3], [3, 4], [3, 5],
      [12, 3], [12, 4], [12, 5],
      ...hLine(1, 5, 10),
    ]},
    // Edge gleam
    { name: 'edge_gleam', role: 'eye', pixels: [
      [3, 4], [12, 4], [7, 1], [8, 1],
    ]},
    // Decorative pattern
    { name: 'pattern', role: 'face', pixels: [
      [6, 3], [9, 3],
      [5, 5], [10, 5],
      [7, 4], [8, 4],
    ]},
    // Pivot / handle (y9-13)
    { name: 'handle', role: 'arm', pixels: [
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ]},
    // Grip wrap
    { name: 'handle_wrap', role: 'belt', pixels: [
      [6, 10], [9, 11],
    ]},
    // End cap (y13)
    { name: 'end_cap', role: 'hand', pixels: [
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
  ],
};

export const WAR_FAN_COLORS = scheme('war_fan_default', {
  body:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  head:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  accessory: { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  face:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  arm:       { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  belt:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// 20. KUSARIGAMA — Chain-sickle weapon
// Density: ~28% (wide sickle, chain trail, weighted end)
// ════════════════════════════════════════════════════════════
export const KUSARIGAMA_16: SpriteTemplate = {
  name: 'kusarigama_16', width: 16, height: 16,
  description: 'Japanese kusarigama with curved sickle blade, chain, and weighted end.',
  regions: [
    // Sickle blade — curved (y1-5)
    { name: 'sickle_blade', role: 'body', pixels: [
      [3, 1], [4, 1], [5, 1],
      [2, 2], [3, 2], [4, 2],
      [1, 3], [2, 3], [3, 3],
      [1, 4], [2, 4], [3, 4],
      [2, 5], [3, 5],
    ]},
    // Blade edge highlight
    { name: 'blade_edge', role: 'eye', pixels: [
      [3, 1], [2, 2], [1, 3], [1, 4],
    ]},
    // Sickle head — where blade meets handle (y4-6)
    { name: 'sickle_head', role: 'head', pixels: [
      [4, 3], [5, 3],
      [4, 4], [5, 4],
      [4, 5], [5, 5],
      [5, 6], [6, 6],
    ]},
    // Handle (y6-9) — 2-3px wide
    { name: 'handle', role: 'arm', pixels: [
      [6, 7], [7, 7],
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
    ]},
    // Handle wrap
    { name: 'handle_wrap', role: 'belt', pixels: [
      [5, 7], [8, 7],
      [6, 8], [9, 9],
    ]},
    // Chain attachment point
    { name: 'chain_ring', role: 'accessory', pixels: [
      [8, 11], [9, 11],
    ]},
    // Chain links — diagonal (y11-13)
    { name: 'chain', role: 'face', pixels: [
      [9, 12], [10, 12],
      [10, 13], [11, 13],
      [11, 12],
    ]},
    // Weighted end (fundo) — iron weight, larger
    { name: 'weight', role: 'head', pixels: [
      [12, 12], [13, 12],
      [11, 13], [12, 13], [13, 13],
      [12, 14], [13, 14],
    ]},
  ],
};

export const KUSARIGAMA_COLORS = scheme('kusarigama_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  head:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  belt:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },
  accessory: { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  face:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
});

// ════════════════════════════════════════════════════════════
// EXPORT RECORDS
// ════════════════════════════════════════════════════════════

export const WEAPONS_CLASSIC_TEMPLATES: Record<string, SpriteTemplate> = {
  broadsword_16:          BROADSWORD_16,
  rapier_16:              RAPIER_16,
  claymore_16:            CLAYMORE_16,
  scimitar_16:            SCIMITAR_16,
  gladius_16:             GLADIUS_16,
  zweihander_16:          ZWEIHANDER_16,
  kite_shield_16:         KITE_SHIELD_16,
  buckler_16:             BUCKLER_16,
  heater_shield_16:       HEATER_SHIELD_16,
  tower_shield_wood_16:   TOWER_SHIELD_WOOD_16,
  longbow_16:             LONGBOW_16,
  recurve_bow_16:         RECURVE_BOW_16,
  battle_axe_double_16:   BATTLE_AXE_DOUBLE_16,
  throwing_axe_16:        THROWING_AXE_16,
  lance_16:               LANCE_16,
  pike_16:                PIKE_16,
  mace_flanged_16:        MACE_FLANGED_16,
  quarterstaff_16:        QUARTERSTAFF_16,
  war_fan_16:             WAR_FAN_16,
  kusarigama_16:          KUSARIGAMA_16,
};

export const WEAPONS_CLASSIC_COLOR_SCHEMES: Record<string, ColorScheme> = {
  broadsword_default:          BROADSWORD_COLORS,
  rapier_default:              RAPIER_COLORS,
  claymore_default:            CLAYMORE_COLORS,
  scimitar_default:            SCIMITAR_COLORS,
  gladius_default:             GLADIUS_COLORS,
  zweihander_default:          ZWEIHANDER_COLORS,
  kite_shield_default:         KITE_SHIELD_COLORS,
  buckler_default:             BUCKLER_COLORS,
  heater_shield_default:       HEATER_SHIELD_COLORS,
  tower_shield_wood_default:   TOWER_SHIELD_WOOD_COLORS,
  longbow_default:             LONGBOW_COLORS,
  recurve_bow_default:         RECURVE_BOW_COLORS,
  battle_axe_double_default:   BATTLE_AXE_DOUBLE_COLORS,
  throwing_axe_default:        THROWING_AXE_COLORS,
  lance_default:               LANCE_COLORS,
  pike_default:                PIKE_COLORS,
  mace_flanged_default:        MACE_FLANGED_COLORS,
  quarterstaff_default:        QUARTERSTAFF_COLORS,
  war_fan_default:             WAR_FAN_COLORS,
  kusarigama_default:          KUSARIGAMA_COLORS,
};
