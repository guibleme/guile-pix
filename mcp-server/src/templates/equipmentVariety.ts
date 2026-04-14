/**
 * 16x16 equipment variety templates — 20 NEW weapons/equipment.
 * Target density: 28-50% (weapons/items are thinner than characters).
 * DB16 palette only. 1-2px margin on edges. Min 2px width for handles/shafts.
 *
 * Templates:
 *  1. katana           - curved japanese sword
 *  2. crossbow_heavy   - heavy crossbow with bolt
 *  3. flail            - ball and chain weapon
 *  4. trident          - three-pronged spear
 *  5. laser_gun        - sci-fi beam weapon
 *  6. throwing_star    - shuriken
 *  7. war_hammer       - heavy two-handed hammer
 *  8. poison_dagger    - dripping dagger
 *  9. ice_staff        - frost magic staff
 * 10. plasma_rifle     - sci-fi rifle
 * 11. whip             - long leather whip
 * 12. boomerang        - returning weapon
 * 13. gatling_gun      - rotating barrel gun
 * 14. fire_sword       - flaming blade
 * 15. tower_shield     - large defensive shield
 * 16. magic_orb        - spell focus orb
 * 17. anchor           - heavy naval weapon
 * 18. chakram          - circular throwing blade
 * 19. energy_shield    - sci-fi shield
 * 20. grappling_hook   - hook with rope
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

const EQUIP_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  face:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
  body:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  hand:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof EQUIP_BASE>): ColorScheme {
  return { name, mapping: { ...EQUIP_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. KATANA — Curved japanese sword, diagonal blade
// ════════════════════════════════════════════════════════════
export const KATANA_16: SpriteTemplate = {
  name: 'katana_16', width: 16, height: 16,
  description: 'Curved Japanese katana with long blade, circular tsuba guard, and wrapped handle.',
  regions: [
    // Blade tip (y1-2) — pointed, slight curve
    { name: 'blade_tip', role: 'body', pixels: [
      [8, 1],
      [7, 2], [8, 2],
    ]},
    // Blade upper (y3-6) — 3px wide curved
    { name: 'blade_upper', role: 'body', pixels: [
      [7, 3], [8, 3], [9, 3],
      [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5],
      [6, 6], [7, 6], [8, 6],
    ]},
    // Blade edge highlight — curved right edge
    { name: 'blade_edge', role: 'eye', pixels: [
      [9, 3], [9, 4], [9, 5], [9, 6],
    ]},
    // Blade lower (y7-8)
    { name: 'blade_lower', role: 'body', pixels: [
      [6, 7], [7, 7], [8, 7],
      [6, 8], [7, 8], [8, 8],
    ]},
    // Tsuba — circular guard (y9)
    { name: 'tsuba', role: 'accessory', pixels: [
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    ]},
    // Handle / tsuka (y10-13) — wrapped
    { name: 'tsuka', role: 'belt', pixels: [
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
    ]},
    // Handle wrap pattern
    { name: 'wrap_pattern', role: 'arm', pixels: [
      [6, 10], [9, 11], [6, 12], [9, 13],
    ]},
    // Kashira — pommel cap
    { name: 'kashira', role: 'head', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 2. CROSSBOW_HEAVY — Heavy crossbow with bolt and stirrup
// ════════════════════════════════════════════════════════════
export const CROSSBOW_HEAVY_16: SpriteTemplate = {
  name: 'crossbow_heavy_16', width: 16, height: 16,
  description: 'Heavy crossbow with wide limbs, taut string, bolt loaded, and stirrup foot rest.',
  regions: [
    // Bolt tip
    { name: 'bolt_tip', role: 'eye', pixels: [
      [7, 2], [8, 2],
    ]},
    // Bolt shaft
    { name: 'bolt_shaft', role: 'head', pixels: [
      [7, 3], [8, 3], [7, 4], [8, 4], [7, 5], [8, 5],
    ]},
    // Limbs — wide curved arms
    { name: 'limbs', role: 'arm', pixels: [
      [2, 5], [3, 5], [4, 5], [5, 5], [10, 5], [11, 5], [12, 5], [13, 5],
      [2, 6], [3, 6], [12, 6], [13, 6],
    ]},
    // String
    { name: 'string', role: 'face', pixels: [
      [4, 6], [5, 6], [6, 6], [9, 6], [10, 6], [11, 6],
    ]},
    // Stock / tiller (y6-11) — 3px wide
    { name: 'stock', role: 'body', pixels: [
      [7, 6], [8, 6],
      [7, 7], [8, 7], [9, 7],
      [7, 8], [8, 8], [9, 8],
      [7, 9], [8, 9], [9, 9],
      [7, 10], [8, 10], [9, 10],
    ]},
    // Trigger mechanism
    { name: 'trigger', role: 'accessory', pixels: [
      [10, 8], [10, 9],
    ]},
    // Grip
    { name: 'grip', role: 'belt', pixels: [
      [7, 11], [8, 11], [9, 11],
      [8, 12], [9, 12],
    ]},
    // Stirrup — foot brace at bottom
    { name: 'stirrup', role: 'boot', pixels: [
      [6, 13], [7, 13], [8, 13], [9, 13],
      [6, 14], [9, 14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 3. FLAIL — Ball and chain weapon
// ════════════════════════════════════════════════════════════
export const FLAIL_16: SpriteTemplate = {
  name: 'flail_16', width: 16, height: 16,
  description: 'Spiked flail with heavy metal ball, chain links, and wooden handle.',
  regions: [
    // Spiked ball — 4x4 with corner spikes
    { name: 'ball', role: 'body', pixels: [
      ...rect(3, 1, 6, 4),
    ]},
    // Spikes — protruding from ball
    { name: 'spikes', role: 'eye', pixels: [
      [4, 0], [5, 0],       // top
      [2, 2], [2, 3],       // left
      [7, 2], [7, 3],       // right
      [4, 5], [5, 5],       // bottom
    ]},
    // Chain links (y5-8) — diagonal from ball to handle
    { name: 'chain', role: 'accessory', pixels: [
      [6, 5], [7, 6], [7, 7], [8, 7], [8, 8],
    ]},
    // Handle shaft (y9-13) — 2px wide
    { name: 'handle', role: 'arm', pixels: [
      [8, 9], [9, 9],
      [8, 10], [9, 10],
      [8, 11], [9, 11],
      [8, 12], [9, 12],
      [8, 13], [9, 13],
    ]},
    // Grip wrap
    { name: 'grip_wrap', role: 'belt', pixels: [
      [7, 10], [10, 11], [7, 12], [10, 13],
    ]},
    // Pommel
    { name: 'pommel', role: 'head', pixels: [
      [7, 14], [8, 14], [9, 14], [10, 14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 4. TRIDENT — Three-pronged spear
// ════════════════════════════════════════════════════════════
export const TRIDENT_16: SpriteTemplate = {
  name: 'trident_16', width: 16, height: 16,
  description: 'Three-pronged trident with barbed tips and long shaft.',
  regions: [
    // Three prong tips (y0-2)
    { name: 'prong_tips', role: 'body', pixels: [
      [5, 0], [8, 0], [11, 0],     // tip points
      [5, 1], [8, 1], [11, 1],     // upper prongs
      [5, 2], [8, 2], [11, 2],     // lower prongs
    ]},
    // Prong edge highlights
    { name: 'prong_edges', role: 'eye', pixels: [
      [4, 1], [7, 1], [10, 1],     // left barbs
      [6, 1], [9, 1], [12, 1],     // right barbs
    ]},
    // Prong connector — horizontal crossbar (y3)
    { name: 'crossbar', role: 'head', pixels: [
      ...hLine(3, 5, 11),
    ]},
    // Socket — where prongs meet shaft (y4)
    { name: 'socket', role: 'head', pixels: [
      [7, 4], [8, 4], [9, 4],
    ]},
    // Shaft (y5-13) — 2px wide
    { name: 'shaft', role: 'arm', pixels: [
      ...vLine(8, 5, 13),
      ...vLine(7, 5, 13),
    ]},
    // Shaft wrap bands
    { name: 'shaft_wraps', role: 'belt', pixels: [
      [6, 7], [9, 7],
      [6, 11], [9, 11],
    ]},
    // Butt cap
    { name: 'butt_cap', role: 'boot', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 5. LASER_GUN — Sci-fi beam weapon
// ════════════════════════════════════════════════════════════
export const LASER_GUN_16: SpriteTemplate = {
  name: 'laser_gun_16', width: 16, height: 16,
  description: 'Sci-fi laser pistol with barrel emitter, energy cell, and ergonomic grip.',
  regions: [
    // Barrel — horizontal emitter (y5-6)
    { name: 'barrel', role: 'body', pixels: [
      ...hLine(5, 2, 8),
      ...hLine(6, 2, 8),
    ]},
    // Emitter tip — glowing end
    { name: 'emitter', role: 'eye', pixels: [
      [1, 5], [1, 6],
      [2, 4], [2, 7],
    ]},
    // Receiver / body (y7-9)
    { name: 'receiver', role: 'head', pixels: [
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
    ]},
    // Energy cell — blue glowing
    { name: 'energy_cell', role: 'accessory', pixels: [
      [5, 7], [6, 7], [7, 7],
      [5, 8], [6, 8], [7, 8],
    ]},
    // Grip (y9-12) — angled down
    { name: 'grip', role: 'arm', pixels: [
      [9, 9], [10, 9],
      [9, 10], [10, 10],
      [10, 11], [11, 11],
      [10, 12], [11, 12],
    ]},
    // Trigger guard
    { name: 'trigger_guard', role: 'belt', pixels: [
      [8, 9], [8, 10], [9, 11],
    ]},
    // Sights
    { name: 'sights', role: 'face', pixels: [
      [3, 4], [7, 4],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 6. THROWING_STAR — Shuriken
// ════════════════════════════════════════════════════════════
export const THROWING_STAR_16: SpriteTemplate = {
  name: 'throwing_star_16', width: 16, height: 16,
  description: 'Four-pointed throwing star (shuriken) with sharp edges and center hole.',
  regions: [
    // Top blade
    { name: 'blade_top', role: 'body', pixels: [
      [7, 1], [8, 1],
      [7, 2], [8, 2],
      [6, 3], [7, 3], [8, 3], [9, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    // Right blade
    { name: 'blade_right', role: 'body', pixels: [
      [10, 6], [11, 6], [12, 7], [13, 7],
      [10, 7], [11, 7],
      [10, 8], [11, 8], [12, 8], [13, 8],
      [10, 9], [11, 9],
    ]},
    // Bottom blade
    { name: 'blade_bottom', role: 'body', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [7, 13], [8, 13],
      [7, 14], [8, 14],
    ]},
    // Left blade
    { name: 'blade_left', role: 'body', pixels: [
      [2, 7], [3, 7], [4, 6], [5, 6],
      [4, 7], [5, 7],
      [2, 8], [3, 8], [4, 8], [5, 8],
      [4, 9], [5, 9],
    ]},
    // Center hub
    { name: 'center', role: 'head', pixels: [
      ...rect(6, 5, 9, 10),
    ]},
    // Center hole
    { name: 'center_hole', role: 'boot', pixels: [
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    // Edge highlights
    { name: 'edge_shine', role: 'eye', pixels: [
      [7, 1], [13, 7], [8, 14], [2, 8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 7. WAR_HAMMER — Heavy two-handed hammer
// ════════════════════════════════════════════════════════════
export const WAR_HAMMER_16: SpriteTemplate = {
  name: 'war_hammer_16', width: 16, height: 16,
  description: 'Heavy war hammer with square head, spike back, and long leather-wrapped handle.',
  regions: [
    // Hammer head — square front face (y1-4)
    { name: 'hammer_head', role: 'body', pixels: [
      ...rect(3, 1, 7, 4),
    ]},
    // Spike — back of head (y2-3)
    { name: 'spike', role: 'head', pixels: [
      [8, 2], [9, 2], [10, 2],
      [8, 3], [9, 3], [10, 3], [11, 3],
    ]},
    // Head highlight
    { name: 'head_shine', role: 'eye', pixels: [
      [4, 1], [5, 1], [4, 2],
    ]},
    // Shaft (y5-13) — 2px wide
    { name: 'shaft', role: 'arm', pixels: [
      ...vLine(7, 5, 13),
      ...vLine(8, 5, 13),
    ]},
    // Grip wraps
    { name: 'grip_wraps', role: 'belt', pixels: [
      [6, 8], [9, 8],
      [6, 10], [9, 10],
      [6, 12], [9, 12],
    ]},
    // Pommel
    { name: 'pommel', role: 'boot', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 8. POISON_DAGGER — Dripping dagger with poison
// ════════════════════════════════════════════════════════════
export const POISON_DAGGER_16: SpriteTemplate = {
  name: 'poison_dagger_16', width: 16, height: 16,
  description: 'Short dagger coated in dripping poison, with green droplets and dark blade.',
  regions: [
    // Blade tip (y1-2)
    { name: 'blade_tip', role: 'body', pixels: [
      [8, 1],
      [7, 2], [8, 2], [9, 2],
    ]},
    // Blade body (y3-7) — 3px wide
    { name: 'blade', role: 'body', pixels: [
      [7, 3], [8, 3], [9, 3],
      [7, 4], [8, 4], [9, 4],
      [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6], [9, 6],
      [7, 7], [8, 7], [9, 7],
    ]},
    // Poison drips — hanging from blade
    { name: 'poison_drips', role: 'accessory', pixels: [
      [6, 4], [6, 6],          // left drips
      [10, 3], [10, 5], [10, 7], // right drips
      [6, 8], [10, 8],         // bottom drips
    ]},
    // Poison glow on blade
    { name: 'poison_sheen', role: 'eye', pixels: [
      [8, 2], [9, 4], [8, 6],
    ]},
    // Guard (y8)
    { name: 'guard', role: 'head', pixels: [
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
    ]},
    // Handle (y9-12)
    { name: 'handle', role: 'belt', pixels: [
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ]},
    // Pommel
    { name: 'pommel', role: 'boot', pixels: [
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 9. ICE_STAFF — Frost magic staff with crystal top
// ════════════════════════════════════════════════════════════
export const ICE_STAFF_16: SpriteTemplate = {
  name: 'ice_staff_16', width: 16, height: 16,
  description: 'Frost magic staff with icicle crystal crown and frozen shaft.',
  regions: [
    // Ice crystal crown (y0-3) — spiky top
    { name: 'crystal_crown', role: 'accessory', pixels: [
      [8, 0],                       // center spike
      [6, 1], [8, 1], [10, 1],     // three spikes
      [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [7, 3], [8, 3], [9, 3],
    ]},
    // Crystal glow — bright highlights
    { name: 'crystal_glow', role: 'eye', pixels: [
      [8, 0], [8, 1], [7, 2],
    ]},
    // Setting / crown base (y4)
    { name: 'setting', role: 'head', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
    ]},
    // Shaft upper (y5-8) — 2px wide
    { name: 'shaft_upper', role: 'body', pixels: [
      ...vLine(7, 5, 8),
      ...vLine(8, 5, 8),
    ]},
    // Frost rings on shaft
    { name: 'frost_rings', role: 'face', pixels: [
      [6, 6], [9, 6],
      [6, 9], [9, 9],
    ]},
    // Shaft lower (y9-13) — 2px wide
    { name: 'shaft_lower', role: 'body', pixels: [
      ...vLine(7, 9, 13),
      ...vLine(8, 9, 13),
    ]},
    // Grip wrap
    { name: 'grip_wrap', role: 'belt', pixels: [
      [6, 11], [9, 11],
      [6, 12], [9, 12],
    ]},
    // Ferrule — base cap
    { name: 'ferrule', role: 'boot', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 10. PLASMA_RIFLE — Sci-fi long rifle
// ════════════════════════════════════════════════════════════
export const PLASMA_RIFLE_16: SpriteTemplate = {
  name: 'plasma_rifle_16', width: 16, height: 16,
  description: 'Sci-fi plasma rifle with long barrel, glowing power core, and folding stock.',
  regions: [
    // Barrel (y6-7) — long horizontal
    { name: 'barrel', role: 'body', pixels: [
      ...hLine(6, 1, 6),
      ...hLine(7, 1, 6),
    ]},
    // Muzzle glow
    { name: 'muzzle', role: 'eye', pixels: [
      [1, 5], [1, 8],
    ]},
    // Receiver body (y5-8)
    { name: 'receiver', role: 'head', pixels: [
      ...hLine(5, 7, 12),
      ...hLine(6, 7, 12),
      ...hLine(7, 7, 12),
      ...hLine(8, 7, 12),
    ]},
    // Power core — glowing center
    { name: 'power_core', role: 'accessory', pixels: [
      [9, 6], [10, 6],
      [9, 7], [10, 7],
    ]},
    // Grip (y9-11)
    { name: 'grip', role: 'arm', pixels: [
      [9, 9], [10, 9],
      [9, 10], [10, 10],
      [9, 11], [10, 11],
    ]},
    // Trigger guard
    { name: 'trigger_guard', role: 'belt', pixels: [
      [8, 9], [8, 10], [11, 9],
    ]},
    // Stock — folding back
    { name: 'stock', role: 'body', pixels: [
      [12, 5], [13, 5],
      [13, 6], [14, 6],
      [13, 7], [14, 7],
      [12, 8], [13, 8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 11. WHIP — Long leather whip, coiled at end
// ════════════════════════════════════════════════════════════
export const WHIP_16: SpriteTemplate = {
  name: 'whip_16', width: 16, height: 16,
  description: 'Coiled leather whip with cracker tip and braided handle.',
  regions: [
    // Cracker tip (y1-2)
    { name: 'cracker', role: 'eye', pixels: [
      [2, 1], [3, 1],
      [3, 2],
    ]},
    // Whip thong — curving body (y2-9)
    { name: 'thong', role: 'body', pixels: [
      [4, 2], [5, 3], [6, 3],
      [6, 4], [7, 4],
      [7, 5], [8, 5],
      [7, 6], [8, 6],
      [6, 7], [7, 7],
      [5, 8], [6, 8],
      [5, 9], [6, 9],
    ]},
    // Whip fall — wider mid section
    { name: 'fall', role: 'arm', pixels: [
      [4, 3], [5, 4],
      [8, 7], [7, 8],
    ]},
    // Handle keeper — where whip meets handle
    { name: 'keeper', role: 'accessory', pixels: [
      [7, 9], [8, 9],
      [7, 10], [8, 10],
    ]},
    // Handle (y11-14) — braided
    { name: 'handle', role: 'belt', pixels: [
      [7, 11], [8, 11],
      [7, 12], [8, 12],
      [7, 13], [8, 13],
    ]},
    // Handle knot / pommel
    { name: 'pommel', role: 'head', pixels: [
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 12. BOOMERANG — Returning curved weapon
// ════════════════════════════════════════════════════════════
export const BOOMERANG_16: SpriteTemplate = {
  name: 'boomerang_16', width: 16, height: 16,
  description: 'Curved returning boomerang with painted markings and aerodynamic profile.',
  regions: [
    // Upper arm — curves up-right
    { name: 'arm_upper', role: 'body', pixels: [
      [11, 2], [12, 2],
      [10, 3], [11, 3],
      [9, 4], [10, 4],
      [8, 5], [9, 5],
    ]},
    // Elbow — curved center
    { name: 'elbow', role: 'body', pixels: [
      [7, 6], [8, 6],
      [6, 7], [7, 7],
      [6, 8], [7, 8],
    ]},
    // Lower arm — curves down-left
    { name: 'arm_lower', role: 'body', pixels: [
      [5, 9], [6, 9],
      [4, 10], [5, 10],
      [3, 11], [4, 11],
      [2, 12], [3, 12],
    ]},
    // Paint markings — tribal
    { name: 'markings', role: 'accessory', pixels: [
      [11, 2], [9, 4], [7, 7], [5, 9], [3, 11],
    ]},
    // Edge highlights
    { name: 'edge_shine', role: 'eye', pixels: [
      [12, 2], [10, 3], [8, 6],
      [4, 10], [2, 12],
    ]},
    // Grip texture at center
    { name: 'grip', role: 'belt', pixels: [
      [8, 5], [7, 6], [6, 7],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 13. GATLING_GUN — Multi-barrel rotating gun
// ════════════════════════════════════════════════════════════
export const GATLING_GUN_16: SpriteTemplate = {
  name: 'gatling_gun_16', width: 16, height: 16,
  description: 'Multi-barrel gatling gun with rotating barrel cluster, ammo feed, and crank handle.',
  regions: [
    // Barrel cluster — 3 barrels horizontal (y5-9)
    { name: 'barrels', role: 'body', pixels: [
      ...hLine(5, 1, 8),
      ...hLine(7, 1, 8),
      ...hLine(9, 1, 8),
    ]},
    // Barrel shroud — connecting ring
    { name: 'shroud', role: 'head', pixels: [
      ...vLine(5, 4, 10),
      ...vLine(8, 4, 10),
    ]},
    // Muzzle flash points
    { name: 'muzzle', role: 'eye', pixels: [
      [1, 4], [1, 6], [1, 8], [1, 10],
    ]},
    // Receiver (y4-10)
    { name: 'receiver', role: 'body', pixels: [
      ...rect(9, 5, 11, 9),
    ]},
    // Ammo box / feed
    { name: 'ammo_box', role: 'accessory', pixels: [
      ...rect(9, 10, 12, 13),
    ]},
    // Crank handle
    { name: 'crank', role: 'arm', pixels: [
      [12, 5], [13, 5], [13, 6], [14, 6], [14, 7], [13, 8], [12, 8],
    ]},
    // Grip
    { name: 'grip', role: 'belt', pixels: [
      [12, 6], [12, 7],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 14. FIRE_SWORD — Flaming blade
// ════════════════════════════════════════════════════════════
export const FIRE_SWORD_16: SpriteTemplate = {
  name: 'fire_sword_16', width: 16, height: 16,
  description: 'Enchanted sword with blade wreathed in magical flames.',
  regions: [
    // Flame crown — fire above blade tip
    { name: 'flame_outer', role: 'accessory', pixels: [
      [7, 0], [9, 0],
      [6, 1], [10, 1],
    ]},
    // Blade tip (y1-2)
    { name: 'blade_tip', role: 'body', pixels: [
      [7, 1], [8, 1], [9, 1],
      [7, 2], [8, 2], [9, 2],
    ]},
    // Blade body (y3-8) — 3px wide
    { name: 'blade', role: 'body', pixels: [
      ...rect(7, 3, 9, 8),
    ]},
    // Flame tongues — licking sides of blade
    { name: 'flames', role: 'arm', pixels: [
      [6, 2], [10, 3],
      [6, 4], [10, 5],
      [6, 6], [10, 7],
      [6, 8],
    ]},
    // Fire glow on blade — bright center
    { name: 'fire_glow', role: 'eye', pixels: [
      [8, 1], [8, 3], [8, 5], [8, 7],
    ]},
    // Guard (y9) — ornate
    { name: 'guard', role: 'head', pixels: [
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
    ]},
    // Handle (y10-13)
    { name: 'handle', role: 'belt', pixels: [
      [7, 10], [8, 10],
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ]},
    // Pommel
    { name: 'pommel', role: 'boot', pixels: [
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 15. TOWER_SHIELD — Large defensive shield
// ════════════════════════════════════════════════════════════
export const TOWER_SHIELD_16: SpriteTemplate = {
  name: 'tower_shield_16', width: 16, height: 16,
  description: 'Tall tower shield with metal rivets, heraldic cross, and reinforced border.',
  regions: [
    // Border — outer frame
    { name: 'border', role: 'head', pixels: [
      ...hLine(1, 4, 11),
      ...hLine(14, 5, 10),
      ...vLine(3, 2, 13),
      ...vLine(12, 2, 13),
      [4, 14], [11, 14],
    ]},
    // Shield face — main field
    { name: 'field', role: 'body', pixels: [
      ...rect(4, 2, 11, 13),
    ]},
    // Heraldic emblem — cross pattern
    { name: 'emblem', role: 'accessory', pixels: [
      ...vLine(7, 4, 11),
      ...vLine(8, 4, 11),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
    ]},
    // Rivets — corner dots
    { name: 'rivets', role: 'eye', pixels: [
      [5, 3], [10, 3],
      [5, 12], [10, 12],
      [4, 7], [11, 7],
      [4, 8], [11, 8],
    ]},
    // Handle strap (back, visible at edges)
    { name: 'strap', role: 'belt', pixels: [
      [5, 6], [6, 6], [9, 6], [10, 6],
      [5, 9], [6, 9], [9, 9], [10, 9],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 16. MAGIC_ORB — Spell focus orb on pedestal
// ════════════════════════════════════════════════════════════
export const MAGIC_ORB_16: SpriteTemplate = {
  name: 'magic_orb_16', width: 16, height: 16,
  description: 'Glowing magic orb with swirling energy inside, resting on a claw pedestal.',
  regions: [
    // Orb glow — outer aura
    { name: 'aura', role: 'eye', pixels: [
      [7, 1], [8, 1],
      [5, 2], [10, 2],
      [4, 4], [11, 4],
      [4, 7], [11, 7],
      [5, 9], [10, 9],
    ]},
    // Orb body — main sphere (y2-8)
    { name: 'orb_body', role: 'accessory', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
    ]},
    // Energy swirl inside
    { name: 'energy_swirl', role: 'body', pixels: [
      [7, 3], [8, 4], [9, 5],
      [6, 6], [7, 7],
    ]},
    // Highlight — top-left shine
    { name: 'highlight', role: 'face', pixels: [
      [6, 3], [7, 3],
      [6, 4],
    ]},
    // Pedestal claws (y9-10)
    { name: 'claws', role: 'head', pixels: [
      [5, 9], [6, 9], [9, 9], [10, 9],
      [4, 10], [5, 10], [10, 10], [11, 10],
    ]},
    // Pedestal base (y11-12)
    { name: 'pedestal_base', role: 'arm', pixels: [
      ...hLine(11, 5, 10),
      ...hLine(12, 4, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 17. ANCHOR — Heavy naval anchor
// ════════════════════════════════════════════════════════════
export const ANCHOR_16: SpriteTemplate = {
  name: 'anchor_16', width: 16, height: 16,
  description: 'Heavy ship anchor with ring, shank, and curved flukes.',
  regions: [
    // Ring — top loop (y1-3)
    { name: 'ring', role: 'head', pixels: [
      [7, 1], [8, 1],
      [6, 2], [9, 2],
      [7, 3], [8, 3],
    ]},
    // Cross bar / stock (y4)
    { name: 'stock', role: 'accessory', pixels: [
      ...hLine(4, 4, 11),
    ]},
    // Shank — vertical bar (y5-10)
    { name: 'shank', role: 'body', pixels: [
      ...vLine(7, 5, 10),
      ...vLine(8, 5, 10),
    ]},
    // Crown — where arms meet shank (y11)
    { name: 'crown', role: 'body', pixels: [
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Left fluke — curved arm
    { name: 'fluke_left', role: 'arm', pixels: [
      [4, 11], [3, 12], [4, 12],
      [2, 13], [3, 13],
      [2, 14], [3, 14],
    ]},
    // Right fluke — curved arm
    { name: 'fluke_right', role: 'arm', pixels: [
      [11, 11], [11, 12], [12, 12],
      [12, 13], [13, 13],
      [12, 14], [13, 14],
    ]},
    // Fluke tips — sharp points
    { name: 'fluke_tips', role: 'eye', pixels: [
      [1, 13], [14, 13],
    ]},
    // Shank highlight
    { name: 'shank_shine', role: 'face', pixels: [
      [7, 6], [7, 8], [7, 10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 18. CHAKRAM — Circular throwing blade
// ════════════════════════════════════════════════════════════
export const CHAKRAM_16: SpriteTemplate = {
  name: 'chakram_16', width: 16, height: 16,
  description: 'Circular throwing disc with razor outer edge and hand grip center.',
  regions: [
    // Outer blade ring
    { name: 'outer_edge', role: 'body', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 4, 5), ...hLine(3, 10, 11),
      [3, 4], [12, 4],
      ...vLine(2, 5, 10), ...vLine(13, 5, 10),
      [3, 11], [12, 11],
      ...hLine(12, 4, 5), ...hLine(12, 10, 11),
      ...hLine(13, 6, 9),
    ]},
    // Inner ring
    { name: 'inner_ring', role: 'head', pixels: [
      ...hLine(4, 6, 9),
      [4, 5], [4, 6], [11, 5], [11, 6],
      [4, 9], [4, 10], [11, 9], [11, 10],
      ...hLine(11, 6, 9),
      ...vLine(4, 7, 8), ...vLine(11, 7, 8),
    ]},
    // Center grip area
    { name: 'grip', role: 'belt', pixels: [
      ...rect(5, 5, 10, 10),
    ]},
    // Center hole
    { name: 'center_hole', role: 'boot', pixels: [
      ...rect(6, 6, 9, 9),
    ]},
    // Edge highlights — cardinal points
    { name: 'edge_shine', role: 'eye', pixels: [
      [7, 2], [13, 7], [8, 13], [2, 8],
    ]},
    // Decorative etching
    { name: 'etching', role: 'accessory', pixels: [
      [5, 5], [10, 5], [5, 10], [10, 10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 19. ENERGY_SHIELD — Sci-fi shield projector
// ════════════════════════════════════════════════════════════
export const ENERGY_SHIELD_16: SpriteTemplate = {
  name: 'energy_shield_16', width: 16, height: 16,
  description: 'Sci-fi wrist-mounted energy shield with hexagonal barrier projection.',
  regions: [
    // Energy barrier — hexagonal field (y1-7)
    { name: 'barrier', role: 'accessory', pixels: [
      ...hLine(1, 5, 10),
      [4, 2], [11, 2],
      [3, 3], [12, 3],
      [3, 4], [12, 4],
      [3, 5], [12, 5],
      [4, 6], [11, 6],
      ...hLine(7, 5, 10),
    ]},
    // Barrier fill — interior glow
    { name: 'barrier_fill', role: 'body', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 11),
      ...hLine(6, 5, 10),
    ]},
    // Hex pattern inside
    { name: 'hex_pattern', role: 'eye', pixels: [
      [7, 3], [8, 3],
      [6, 4], [9, 4],
      [7, 5], [8, 5],
    ]},
    // Emitter device (y8-10) — wrist-mounted
    { name: 'emitter', role: 'head', pixels: [
      ...hLine(8, 5, 10),
      ...hLine(9, 5, 10),
      ...hLine(10, 6, 9),
    ]},
    // Power core on emitter
    { name: 'power_core', role: 'face', pixels: [
      [7, 9], [8, 9],
    ]},
    // Arm strap (y11-13)
    { name: 'arm_strap', role: 'belt', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [7, 13], [8, 13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 20. GRAPPLING_HOOK — Hook with rope
// ════════════════════════════════════════════════════════════
export const GRAPPLING_HOOK_16: SpriteTemplate = {
  name: 'grappling_hook_16', width: 16, height: 16,
  description: 'Three-pronged grappling hook with trailing rope coil.',
  regions: [
    // Center hook prong — pointing up
    { name: 'center_prong', role: 'body', pixels: [
      [7, 1], [8, 1],
      [7, 2], [8, 2],
      [7, 3], [8, 3],
    ]},
    // Left hook prong — curved
    { name: 'left_prong', role: 'body', pixels: [
      [4, 2], [5, 2],
      [4, 3], [5, 3],
      [5, 4], [6, 4],
    ]},
    // Right hook prong — curved
    { name: 'right_prong', role: 'body', pixels: [
      [10, 2], [11, 2],
      [10, 3], [11, 3],
      [9, 4], [10, 4],
    ]},
    // Prong tips — sharp
    { name: 'prong_tips', role: 'eye', pixels: [
      [7, 1], [4, 2], [11, 2],
    ]},
    // Hook hub — where prongs meet shaft (y4-5)
    { name: 'hub', role: 'head', pixels: [
      [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
    ]},
    // Shaft (y6-8)
    { name: 'shaft', role: 'body', pixels: [
      [7, 6], [8, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    // Rope attachment ring
    { name: 'ring_attachment', role: 'accessory', pixels: [
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Rope coil (y10-14) — coiled below
    { name: 'rope_coil', role: 'belt', pixels: [
      [5, 10], [6, 10], [9, 10], [10, 10],
      [4, 11], [5, 11], [10, 11], [11, 11],
      [4, 12], [5, 12], [10, 12], [11, 12],
      [5, 13], [6, 13], [9, 13], [10, 13],
      [6, 14], [7, 14], [8, 14], [9, 14],
    ]},
  ],
};


// ── Color Schemes ────────────────────────────────────────────

export const KATANA_COLORS = scheme('katana_default', {
  body: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },  // silver blade
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // edge glint
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // gold tsuba
  belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // dark wrap
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // brown wrap pattern
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // gold kashira
});

export const CROSSBOW_HEAVY_COLORS = scheme('crossbow_heavy_default', {
  body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wood stock
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // bolt shaft
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // bolt tip glint
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wood limbs
  face: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // string
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // trigger
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },  // leather grip
  boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // iron stirrup
});

export const FLAIL_COLORS = scheme('flail_default', {
  body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // metal ball
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // spike glint
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // chain
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wood handle
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },  // leather wrap
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // iron pommel
});

export const TRIDENT_COLORS = scheme('trident_default', {
  body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // metal prongs
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // tip highlights
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // crossbar
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wooden shaft
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },  // wrap bands
  boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // butt cap
});

export const LASER_GUN_COLORS = scheme('laser_gun_default', {
  body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // gun body
  eye:  { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },  // emitter glow
  head: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // dark receiver
  accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // blue energy cell
  arm:  { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // dark grip
  belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // trigger guard
  face: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // sights
});

export const THROWING_STAR_COLORS = scheme('throwing_star_default', {
  body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // steel blades
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // center hub
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // edge glint
  boot: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // center hole
});

export const WAR_HAMMER_COLORS = scheme('war_hammer_default', {
  body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // steel head
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // spike back
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // shine
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wood shaft
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },  // leather wraps
  boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // iron pommel
});

export const POISON_DAGGER_COLORS = scheme('poison_dagger_default', {
  body: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // dark blade
  eye:  { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },  // poison glow
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },  // poison drips
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // guard
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // handle
  boot: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // pommel
});

export const ICE_STAFF_COLORS = scheme('ice_staff_default', {
  accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // ice crystal
  eye:  { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },  // crystal glow
  head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // metal setting
  body: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },  // frost shaft
  face: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },  // frost rings
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },  // leather grip
  boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // iron ferrule
});

export const PLASMA_RIFLE_COLORS = scheme('plasma_rifle_default', {
  body: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // dark metal
  eye:  { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },  // muzzle flash
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // receiver
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },  // green power core
  arm:  { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },  // dark grip
  belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // trigger guard
});

export const WHIP_COLORS = scheme('whip_default', {
  body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // leather thong
  eye:  { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },  // cracker tip flash
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },  // fall section
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // metal keeper
  belt: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },  // dark handle
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // gold pommel
});

export const BOOMERANG_COLORS = scheme('boomerang_default', {
  body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wood body
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },  // painted markings
  eye:  { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },  // edge highlights
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },  // grip
});

export const GATLING_GUN_COLORS = scheme('gatling_gun_default', {
  body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // gunmetal
  head: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // dark shroud
  eye:  { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },  // muzzle flash
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // brass ammo box
  arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wood crank
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },  // grip
});

export const FIRE_SWORD_COLORS = scheme('fire_sword_default', {
  body: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },  // steel blade
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },  // outer flames
  arm:  { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },  // flame tongues
  eye:  { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },  // fire glow
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // gold guard
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // leather handle
  boot: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // gold pommel
});

export const TOWER_SHIELD_COLORS = scheme('tower_shield_default', {
  body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // blue field
  head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // silver border
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // gold emblem
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // rivet glint
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },  // leather strap
});

export const MAGIC_ORB_COLORS = scheme('magic_orb_default', {
  accessory: { shadow: '#442434', base: '#597dce', highlight: '#6dc2ca' },  // orb body
  eye:  { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },  // glow aura
  body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // energy swirl
  face: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },  // highlight
  head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // gold claws
  arm:  { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // stone pedestal
});

export const ANCHOR_COLORS = scheme('anchor_default', {
  body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // iron body
  head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // ring
  accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },  // wood stock
  arm:  { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // iron flukes
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // tip glint
  face: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // shank shine
});

export const CHAKRAM_COLORS = scheme('chakram_default', {
  body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // steel outer ring
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // inner ring
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // edge shine
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },  // leather grip
  boot: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // center hole
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // gold etching
});

export const ENERGY_SHIELD_COLORS = scheme('energy_shield_default', {
  accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },  // barrier frame
  body: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },  // barrier fill
  eye:  { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },  // hex glow
  head: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },  // dark emitter
  face: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },  // green power core
  belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // metal strap
});

export const GRAPPLING_HOOK_COLORS = scheme('grappling_hook_default', {
  body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },  // metal prongs/shaft
  eye:  { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },  // tip glint
  head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },  // iron hub
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },  // gold ring
  belt: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },  // rope coil
});


// ── Exports ──────────────────────────────────────────────────

export const EQUIPMENT_VARIETY_TEMPLATES: Record<string, SpriteTemplate> = {
  katana_16: KATANA_16,
  crossbow_heavy_16: CROSSBOW_HEAVY_16,
  flail_16: FLAIL_16,
  trident_16: TRIDENT_16,
  laser_gun_16: LASER_GUN_16,
  throwing_star_16: THROWING_STAR_16,
  war_hammer_16: WAR_HAMMER_16,
  poison_dagger_16: POISON_DAGGER_16,
  ice_staff_16: ICE_STAFF_16,
  plasma_rifle_16: PLASMA_RIFLE_16,
  whip_16: WHIP_16,
  boomerang_16: BOOMERANG_16,
  gatling_gun_16: GATLING_GUN_16,
  fire_sword_16: FIRE_SWORD_16,
  tower_shield_16: TOWER_SHIELD_16,
  magic_orb_16: MAGIC_ORB_16,
  anchor_16: ANCHOR_16,
  chakram_16: CHAKRAM_16,
  energy_shield_16: ENERGY_SHIELD_16,
  grappling_hook_16: GRAPPLING_HOOK_16,
};

export const EQUIPMENT_VARIETY_COLOR_SCHEMES: Record<string, ColorScheme> = {
  katana_default: KATANA_COLORS,
  crossbow_heavy_default: CROSSBOW_HEAVY_COLORS,
  flail_default: FLAIL_COLORS,
  trident_default: TRIDENT_COLORS,
  laser_gun_default: LASER_GUN_COLORS,
  throwing_star_default: THROWING_STAR_COLORS,
  war_hammer_default: WAR_HAMMER_COLORS,
  poison_dagger_default: POISON_DAGGER_COLORS,
  ice_staff_default: ICE_STAFF_COLORS,
  plasma_rifle_default: PLASMA_RIFLE_COLORS,
  whip_default: WHIP_COLORS,
  boomerang_default: BOOMERANG_COLORS,
  gatling_gun_default: GATLING_GUN_COLORS,
  fire_sword_default: FIRE_SWORD_COLORS,
  tower_shield_default: TOWER_SHIELD_COLORS,
  magic_orb_default: MAGIC_ORB_COLORS,
  anchor_default: ANCHOR_COLORS,
  chakram_default: CHAKRAM_COLORS,
  energy_shield_default: ENERGY_SHIELD_COLORS,
  grappling_hook_default: GRAPPLING_HOOK_COLORS,
};
