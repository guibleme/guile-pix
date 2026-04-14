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

const FX_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c'  },
  head:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161'  },
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6'  },
  eye:       { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6'  },
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca'  },
  arm:       { shadow: '#442434', base: '#4e4a4e',  highlight: '#757161'  },
  hand:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6'  },
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c'  },
  leg:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e'  },
  boot:      { shadow: '#442434', base: '#4e4a4e',  highlight: '#757161'  },
  accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e'  },
};

function scheme(name: string, overrides: Partial<typeof FX_BASE>): ColorScheme {
  return { name, mapping: { ...FX_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. plasma_beam_16 — sci-fi horizontal laser beam
// ════════════════════════════════════════════════════════════
export const PLASMA_BEAM_16: SpriteTemplate = {
  name: 'plasma_beam_16', width: 16, height: 16,
  description: 'Sci-fi laser beam — bright hot core, wide energy field, edge glow scatter.',
  regions: [
    { name: 'core',       role: 'eye',       pixels: [...hLine(7, 0, 15), ...hLine(8, 0, 15)] },
    { name: 'beam_body',  role: 'body',      pixels: [...hLine(6, 1, 14), ...hLine(9, 1, 14)] },
    { name: 'beam_edge',  role: 'head',      pixels: [...hLine(5, 2, 13), ...hLine(10, 2, 13)] },
    { name: 'scatter',    role: 'accessory', pixels: [[0,5],[1,4],[2,5],[14,4],[15,5],[0,10],[1,11],[2,10],[13,11],[15,10]] },
    { name: 'sparks',     role: 'arm',       pixels: [[3,3],[5,4],[7,3],[9,4],[11,3],[13,4],[4,12],[6,11],[8,12],[10,11],[12,12]] },
    { name: 'flare_tip',  role: 'belt',      pixels: [[0,6],[0,7],[0,8],[0,9],[15,6],[15,7],[15,8],[15,9]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 2. blood_splatter_16 — red impact splash
// ════════════════════════════════════════════════════════════
export const BLOOD_SPLATTER_16: SpriteTemplate = {
  name: 'blood_splatter_16', width: 16, height: 16,
  description: 'Red impact splash — central puddle, radiating drops and streak lines.',
  regions: [
    { name: 'puddle',     role: 'body',      pixels: [...rect(5, 7, 10, 9), ...hLine(10, 6, 10), ...hLine(6, 5, 10)] },
    { name: 'drops',      role: 'head',      pixels: [[3,4],[2,5],[4,3],[11,3],[13,4],[12,5],[14,6],[2,11],[4,12],[13,11],[12,13],[6,13],[8,14],[10,13]] },
    { name: 'streaks',    role: 'arm',       pixels: [[5,5],[4,6],[3,7],[2,8],[1,9],[14,8],[13,7],[12,6],[11,5],[10,4]] },
    { name: 'core_dark',  role: 'belt',      pixels: [...rect(6, 7, 9, 9)] },
    { name: 'highlight',  role: 'eye',       pixels: [[6,7],[7,7]] },
    { name: 'micro_drop', role: 'accessory', pixels: [[1,3],[3,2],[14,3],[15,5],[1,13],[3,14],[14,14],[15,12]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 3. frost_nova_16 — circular ice burst ring
// ════════════════════════════════════════════════════════════
export const FROST_NOVA_16: SpriteTemplate = {
  name: 'frost_nova_16', width: 16, height: 16,
  description: 'Circular ice burst — expanding ring with crystal spikes at cardinal and diagonal points.',
  regions: [
    { name: 'ring',       role: 'body',      pixels: [
        ...hLine(3, 5, 10),
        ...hLine(4, 4, 5), ...hLine(4, 10, 11),
        ...hLine(5, 3, 4), ...hLine(5, 11, 12),
        ...hLine(6, 3, 3), ...hLine(6, 12, 12),
        ...hLine(7, 3, 3), ...hLine(7, 12, 12),
        ...hLine(8, 3, 3), ...hLine(8, 12, 12),
        ...hLine(9, 3, 4), ...hLine(9, 11, 12),
        ...hLine(10, 4, 5), ...hLine(10, 10, 11),
        ...hLine(11, 5, 10),
      ]
    },
    { name: 'spikes',     role: 'head',      pixels: [
        [7,1],[8,1],[7,2],[8,2],
        [7,13],[8,13],[7,14],[8,14],
        [1,7],[1,8],[2,7],[2,8],
        [13,7],[13,8],[14,7],[14,8],
        [3,3],[4,3],[3,4],
        [12,3],[11,3],[12,4],
        [3,12],[4,12],[3,11],
        [12,12],[11,12],[12,11],
      ]
    },
    { name: 'core',       role: 'eye',       pixels: [...rect(6, 6, 9, 9)] },
    { name: 'ice_glint',  role: 'accessory', pixels: [[6,6],[9,6],[6,9],[9,9]] },
    { name: 'shard_tips', role: 'arm',       pixels: [[7,0],[8,0],[0,7],[0,8],[15,7],[15,8],[7,15],[8,15]] },
    { name: 'frost_edge', role: 'belt',      pixels: [[4,4],[11,4],[4,11],[11,11]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 4. electric_shock_16 — jagged zap lines
// ════════════════════════════════════════════════════════════
export const ELECTRIC_SHOCK_16: SpriteTemplate = {
  name: 'electric_shock_16', width: 16, height: 16,
  description: 'Electric zap — jagged bolt paths from top-left to bottom-right with spark nodes.',
  regions: [
    { name: 'main_bolt',  role: 'eye',       pixels: [[2,1],[3,2],[4,2],[5,3],[6,4],[7,4],[8,5],[9,6],[10,6],[11,7],[12,8],[13,9],[13,10],[14,11],[14,12],[13,13]] },
    { name: 'branch_a',   role: 'body',      pixels: [[6,4],[7,5],[8,6],[9,6],[9,7]] },
    { name: 'branch_b',   role: 'body',      pixels: [[10,6],[11,7],[12,7],[12,8],[11,9]] },
    { name: 'glow',       role: 'head',      pixels: [[2,0],[3,1],[4,1],[5,2],[7,3],[8,4],[10,5],[11,6],[12,7],[13,8],[14,9],[15,11]] },
    { name: 'sparks',     role: 'accessory', pixels: [[1,2],[6,5],[9,5],[11,8],[15,12],[0,0],[15,14]] },
    { name: 'arc_nodes',  role: 'arm',       pixels: [[3,2],[7,4],[11,7],[13,10]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 5. leaf_swirl_16 — nature magic spiral leaves
// ════════════════════════════════════════════════════════════
export const LEAF_SWIRL_16: SpriteTemplate = {
  name: 'leaf_swirl_16', width: 16, height: 16,
  description: 'Nature magic leaf swirl — curved arcs of leaves spiraling around a glowing center.',
  regions: [
    { name: 'leaves_a',   role: 'body',      pixels: [[7,2],[8,2],[9,3],[10,3],[11,4],[11,5],[10,6],[9,7]] },
    { name: 'leaves_b',   role: 'body',      pixels: [[13,7],[13,8],[12,9],[11,10],[10,11],[9,11],[8,12],[7,12]] },
    { name: 'leaves_c',   role: 'leg',       pixels: [[5,12],[4,12],[3,11],[3,10],[4,9],[5,8],[6,8],[7,8]] },
    { name: 'leaves_d',   role: 'leg',       pixels: [[3,5],[3,4],[4,3],[5,3],[6,4],[7,5],[7,6],[7,7]] },
    { name: 'center',     role: 'eye',       pixels: [...rect(7, 7, 9, 9)] },
    { name: 'leaf_tips',  role: 'accessory', pixels: [[10,2],[12,4],[14,6],[14,10],[12,12],[10,13],[6,13],[4,11],[2,9],[2,6],[4,4],[6,2]] },
    { name: 'stem_curl',  role: 'arm',       pixels: [[8,4],[9,5],[10,7],[9,9],[8,10],[7,10],[6,9],[6,7],[7,5],[8,5]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 6. shadow_mist_16 — dark creeping fog tendrils
// ════════════════════════════════════════════════════════════
export const SHADOW_MIST_16: SpriteTemplate = {
  name: 'shadow_mist_16', width: 16, height: 16,
  description: 'Dark creeping fog — wispy tendrils rising from bottom with a shadowed void core.',
  regions: [
    { name: 'mist_base',  role: 'body',      pixels: [...hLine(13, 2, 13), ...hLine(12, 3, 12), ...hLine(11, 4, 11), ...hLine(14, 1, 14)] },
    { name: 'tendrils',   role: 'head',      pixels: [
        [4,10],[4,9],[5,8],[5,7],[4,6],
        [7,10],[7,9],[8,8],[8,7],[7,6],[7,5],
        [11,10],[11,9],[10,8],[10,7],[11,6],[12,5],
        [2,11],[2,10],[3,9],
        [13,11],[14,10],[14,9],
      ]
    },
    { name: 'void_core',  role: 'belt',      pixels: [...rect(6, 11, 10, 13)] },
    { name: 'dark_wisps', role: 'arm',       pixels: [[6,5],[9,4],[12,4],[3,7],[13,8],[5,12],[10,12]] },
    { name: 'eye_glow',   role: 'eye',       pixels: [[7,12],[8,12],[7,11],[9,11]] },
    { name: 'mist_edge',  role: 'accessory', pixels: [[1,14],[2,15],[5,15],[8,15],[11,15],[14,15],[15,14],[0,13]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 7. fire_rain_16 — falling fire drops
// ════════════════════════════════════════════════════════════
export const FIRE_RAIN_16: SpriteTemplate = {
  name: 'fire_rain_16', width: 16, height: 16,
  description: 'Falling fire rain — multiple teardrop ember projectiles descending at staggered heights.',
  regions: [
    { name: 'drops',      role: 'body',      pixels: [
        [2,2],[2,3],[3,3],
        [6,5],[6,6],[7,6],
        [10,1],[10,2],[11,2],
        [13,6],[13,7],[14,7],
        [4,9],[4,10],[5,10],
        [8,12],[8,13],[9,13],
        [12,10],[12,11],[13,11],
      ]
    },
    { name: 'tips',       role: 'eye',       pixels: [[2,2],[6,5],[10,1],[13,6],[4,9],[8,12],[12,10]] },
    { name: 'tails',      role: 'head',      pixels: [
        [3,4],[3,5],
        [7,7],[7,8],
        [11,3],[11,4],
        [14,8],[14,9],
        [5,11],[5,12],
        [9,14],[9,15],
        [13,12],[13,13],
      ]
    },
    { name: 'glow_halo',  role: 'accessory', pixels: [[1,3],[4,3],[5,6],[8,6],[9,2],[12,2],[12,7],[15,7],[3,10],[6,10],[7,13],[10,13],[11,11],[14,11]] },
    { name: 'impact',     role: 'arm',       pixels: [[1,15],[2,15],[3,15],[7,15],[8,15],[14,15],[15,15]] },
    { name: 'ember_core', role: 'belt',      pixels: [[2,3],[6,6],[10,2],[13,7],[4,10],[8,13],[12,11]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 8. bubble_pop_16 — water/soap bubble cluster
// ════════════════════════════════════════════════════════════
export const BUBBLE_POP_16: SpriteTemplate = {
  name: 'bubble_pop_16', width: 16, height: 16,
  description: 'Water bubble pop — cluster of soap bubbles with rim highlights and burst fragments.',
  regions: [
    { name: 'bubble_rims', role: 'head',     pixels: [
        ...hLine(4, 5, 9), ...hLine(8, 5, 9),
        ...vLine(5, 4, 8), ...vLine(9, 4, 8),
        ...hLine(10, 2, 5), ...hLine(13, 2, 5),
        ...vLine(2, 10, 13), ...vLine(5, 10, 13),
        ...hLine(10, 10, 13), ...hLine(13, 10, 13),
        ...vLine(10, 10, 13), ...vLine(13, 10, 13),
      ]
    },
    { name: 'bubble_fill', role: 'body',     pixels: [...rect(6, 5, 8, 7), ...rect(3, 11, 4, 12), ...rect(11, 11, 12, 12)] },
    { name: 'highlights',  role: 'eye',      pixels: [[5,4],[6,4],[5,5],[10,9],[11,9],[10,10]] },
    { name: 'pop_burst',   role: 'accessory',pixels: [[3,3],[10,3],[4,9],[11,9],[1,7],[14,6],[7,1],[7,14],[1,12],[14,11]] },
    { name: 'droplets',    role: 'arm',      pixels: [[2,2],[1,5],[2,8],[1,11],[13,2],[15,4],[13,7],[15,9],[6,1],[10,1],[6,14],[10,14]] },
    { name: 'sheen',       role: 'belt',     pixels: [[6,5],[7,5],[6,6]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 9. confetti_burst_16 — celebration particle scatter
// ════════════════════════════════════════════════════════════
export const CONFETTI_BURST_16: SpriteTemplate = {
  name: 'confetti_burst_16', width: 16, height: 16,
  description: 'Celebration confetti burst — multicolor rectangular shards exploding outward from center.',
  regions: [
    { name: 'pieces_warm',  role: 'accessory', pixels: [
        [7,7],[8,7],[7,8],
        [2,3],[3,3],[2,4],
        [11,2],[12,2],[11,3],
        [4,12],[5,12],[4,13],
        [12,11],[13,11],[12,12],
        [1,9],[2,9],
        [13,6],[14,6],
      ]
    },
    { name: 'pieces_cool',  role: 'body',      pixels: [
        [9,6],[10,6],[9,7],
        [3,6],[4,6],[3,7],
        [5,2],[6,2],[5,3],
        [9,12],[10,12],[9,13],
        [2,13],[3,13],[2,14],
        [13,13],[14,13],[13,14],
        [13,3],[14,3],[14,4],
      ]
    },
    { name: 'pieces_bright',role: 'eye',       pixels: [
        [6,9],[7,9],
        [11,5],[12,5],
        [4,10],[5,10],
        [10,14],[11,14],
        [1,6],[2,6],
        [14,10],[15,10],
        [7,1],[8,1],
      ]
    },
    { name: 'streamers',    role: 'arm',       pixels: [
        [5,5],[4,4],[3,3],[2,2],
        [10,5],[11,4],[12,3],[13,2],
        [5,10],[4,11],[3,12],[2,13],
        [10,10],[11,11],[12,12],[13,13],
      ]
    },
    { name: 'core_flash',   role: 'head',      pixels: [...rect(7, 7, 9, 9)] },
    { name: 'sparkle_tips', role: 'belt',      pixels: [[7,0],[8,0],[0,7],[0,8],[15,7],[15,8],[7,15],[8,15],[0,0],[15,0],[0,15],[15,15]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 10. dust_cloud_16 — ground impact dust puff
// ════════════════════════════════════════════════════════════
export const DUST_CLOUD_16: SpriteTemplate = {
  name: 'dust_cloud_16', width: 16, height: 16,
  description: 'Ground impact dust cloud — low spreading puff with particles billowing sideways.',
  regions: [
    { name: 'cloud_body',  role: 'body',      pixels: [
        ...hLine(11, 3, 12),
        ...hLine(10, 2, 13),
        ...hLine(9,  2, 13),
        ...hLine(8,  3, 12),
        ...hLine(7,  4, 11),
        ...hLine(6,  5, 10),
      ]
    },
    { name: 'cloud_edge',  role: 'head',      pixels: [
        ...hLine(12, 2, 13),
        [1, 10],[2, 10],[0,11],[1,11],[14,10],[15,10],[14,11],[15,11],
        ...hLine(5,  3, 4), ...hLine(5, 11, 12),
      ]
    },
    { name: 'impact_core', role: 'belt',      pixels: [...rect(6, 9, 9, 11)] },
    { name: 'particles',   role: 'accessory', pixels: [[2,8],[1,9],[0,10],[3,6],[4,5],[13,8],[14,7],[15,9],[12,6],[11,5],[7,4],[8,4]] },
    { name: 'ground_line', role: 'arm',       pixels: [...hLine(13, 1, 14)] },
    { name: 'highlights',  role: 'eye',       pixels: [[5,8],[6,7],[7,6],[8,6],[9,7],[10,8]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 11. energy_wave_16 — expanding concentric ring pulse
// ════════════════════════════════════════════════════════════
export const ENERGY_WAVE_16: SpriteTemplate = {
  name: 'energy_wave_16', width: 16, height: 16,
  description: 'Expanding energy wave — two concentric rings with a bright center origin point.',
  regions: [
    { name: 'outer_ring',  role: 'head',      pixels: [
        ...hLine(1,  5, 10),
        ...hLine(14, 5, 10),
        ...vLine(1,  5, 10),
        ...vLine(14, 5, 10),
        [2,2],[3,2],[2,3],[12,2],[13,2],[13,3],[2,12],[3,13],[2,13],[12,13],[13,12],[13,13],
      ]
    },
    { name: 'inner_ring',  role: 'body',      pixels: [
        ...hLine(4,  5, 10),
        ...hLine(11, 5, 10),
        ...vLine(4,  5, 10),
        ...vLine(11, 5, 10),
        [5,5],[5,10],[10,5],[10,10],
      ]
    },
    { name: 'core',        role: 'eye',       pixels: [...rect(7, 7, 8, 8)] },
    { name: 'inner_glow',  role: 'accessory', pixels: [...hLine(6, 5, 10), ...hLine(9, 5, 10), ...vLine(5, 6, 9), ...vLine(10, 6, 9)] },
    { name: 'wave_gap',    role: 'arm',       pixels: [[3,4],[4,3],[11,3],[12,4],[3,11],[4,12],[11,12],[12,11]] },
    { name: 'origin_ring', role: 'belt',      pixels: [[6,7],[9,7],[7,6],[8,6],[7,9],[8,9],[6,8],[9,8]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 12. meteor_strike_16 — falling flaming space rock
// ════════════════════════════════════════════════════════════
export const METEOR_STRIKE_16: SpriteTemplate = {
  name: 'meteor_strike_16', width: 16, height: 16,
  description: 'Falling meteor — rocky silhouette on diagonal descent with flame trail and impact glow.',
  regions: [
    { name: 'rock',        role: 'head',      pixels: [...rect(8, 5, 12, 9), [7,6],[7,7],[13,6],[13,7],[8,4],[9,4],[11,10],[12,10]] },
    { name: 'rock_shadow', role: 'belt',      pixels: [[12,7],[12,8],[11,9],[12,9],[13,8]] },
    { name: 'flame_trail', role: 'body',      pixels: [
        [7,4],[6,4],[5,3],[4,3],[3,2],[2,2],[1,1],
        [6,5],[5,5],[4,4],[3,4],[2,3],[1,2],[0,2],
        [7,6],[6,7],[5,7],[4,6],[3,5],[2,4],[1,3],
      ]
    },
    { name: 'flame_core',  role: 'eye',       pixels: [[6,4],[5,4],[4,5],[3,5],[2,4]] },
    { name: 'impact_glow', role: 'accessory', pixels: [[9,11],[10,11],[11,11],[8,12],[12,12],[7,13],[13,13],[6,14],[14,14],[5,15],[15,15]] },
    { name: 'sparks',      role: 'arm',       pixels: [[4,7],[3,8],[2,9],[5,9],[6,10],[5,11],[4,12],[7,14],[9,14],[11,14],[13,15]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 13. acid_drip_16 — toxic green dripping drops
// ════════════════════════════════════════════════════════════
export const ACID_DRIP_16: SpriteTemplate = {
  name: 'acid_drip_16', width: 16, height: 16,
  description: 'Acid drip — toxic green drops falling from a corrosive pool with bubbling surface.',
  regions: [
    { name: 'pool',        role: 'body',      pixels: [...hLine(2, 3, 12), ...hLine(3, 2, 13), ...hLine(4, 2, 13), ...hLine(5, 3, 12)] },
    { name: 'bubbles',     role: 'eye',       pixels: [[4,3],[6,3],[9,3],[11,3],[5,4],[8,4],[11,4],[7,3]] },
    { name: 'drips',       role: 'head',      pixels: [
        [5,5],[5,6],[5,7],[5,8],[6,9],[5,9],
        [8,5],[8,6],[8,7],[9,7],[9,8],[8,8],[9,9],
        [11,5],[11,6],[11,7],[12,7],[12,8],[11,8],[11,9],[12,9],
      ]
    },
    { name: 'drop_tips',   role: 'accessory', pixels: [[5,10],[6,10],[8,10],[9,10],[10,9],[11,10],[12,10],[13,9]] },
    { name: 'splash',      role: 'arm',       pixels: [[4,11],[5,11],[3,12],[6,12],[7,12],[7,11],[8,11],[9,11],[10,11],[11,11],[12,11],[10,12],[13,12],[14,11]] },
    { name: 'corrosion',   role: 'belt',      pixels: [[3,3],[3,4],[4,2],[12,2],[13,3],[13,4],[12,5],[3,5]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 14. holy_cross_16 — divine radiant cross beam
// ════════════════════════════════════════════════════════════
export const HOLY_CROSS_16: SpriteTemplate = {
  name: 'holy_cross_16', width: 16, height: 16,
  description: 'Divine holy cross — bright vertical and horizontal beams with a radiant center halo.',
  regions: [
    { name: 'cross_v',     role: 'eye',       pixels: [...vLine(7, 1, 14), ...vLine(8, 1, 14)] },
    { name: 'cross_h',     role: 'eye',       pixels: [...hLine(7, 1, 14), ...hLine(8, 1, 14)] },
    { name: 'cross_glow',  role: 'body',      pixels: [
        ...vLine(6, 2, 13), ...vLine(9, 2, 13),
        ...hLine(6, 2, 13), ...hLine(9, 2, 13),
      ]
    },
    { name: 'halo',        role: 'head',      pixels: [
        ...hLine(4, 5, 10), ...hLine(11, 5, 10),
        ...vLine(4, 5, 10), ...vLine(11, 5, 10),
      ]
    },
    { name: 'rays',        role: 'accessory', pixels: [
        [4,4],[3,3],[2,2],[11,4],[12,3],[13,2],
        [4,11],[3,12],[2,13],[11,11],[12,12],[13,13],
      ]
    },
    { name: 'center_core', role: 'belt',      pixels: [...rect(6, 6, 9, 9)] },
  ],
};

// ════════════════════════════════════════════════════════════
// 15. wind_slash_16 — air blade cutting arc
// ════════════════════════════════════════════════════════════
export const WIND_SLASH_16: SpriteTemplate = {
  name: 'wind_slash_16', width: 16, height: 16,
  description: 'Wind slash — curved air blade arc sweeping diagonally with turbulence streaks.',
  regions: [
    { name: 'blade_edge',  role: 'eye',       pixels: [[1,12],[2,10],[3,8],[4,7],[5,5],[6,4],[7,3],[8,2],[9,1],[10,1],[11,2],[12,2],[13,3]] },
    { name: 'blade_body',  role: 'body',      pixels: [[2,13],[3,11],[4,9],[5,8],[6,6],[7,5],[8,4],[9,3],[10,2],[11,3],[12,3],[13,4],[14,4]] },
    { name: 'blade_trail', role: 'head',      pixels: [[3,14],[4,12],[5,10],[6,9],[7,7],[8,6],[9,5],[10,4],[11,4],[12,5],[13,5],[14,5],[14,6]] },
    { name: 'turbulence',  role: 'arm',       pixels: [
        [0,14],[1,15],[4,15],[7,15],[10,15],[13,15],
        [1,11],[2,9],[3,7],[4,6],
        [5,3],[6,2],[7,1],[8,0],
      ]
    },
    { name: 'cut_lines',   role: 'accessory', pixels: [[6,13],[7,12],[8,11],[9,10],[10,9],[11,8],[12,7],[13,6],[14,7],[15,6]] },
    { name: 'air_wisps',   role: 'belt',      pixels: [[0,10],[0,11],[1,9],[15,3],[15,4],[14,2]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 16. chain_lightning_16 — branching arc sparks
// ════════════════════════════════════════════════════════════
export const CHAIN_LIGHTNING_16: SpriteTemplate = {
  name: 'chain_lightning_16', width: 16, height: 16,
  description: 'Chain lightning — primary bolt with two branching arcs and spread arc nodes.',
  regions: [
    { name: 'primary',     role: 'eye',       pixels: [[1,0],[2,1],[3,1],[4,2],[5,3],[6,3],[7,4],[8,5],[9,5],[10,6],[11,7],[12,7],[13,8],[14,9],[15,9]] },
    { name: 'branch_1',    role: 'body',      pixels: [[6,3],[7,5],[8,6],[8,7],[7,8],[6,9],[5,10]] },
    { name: 'branch_2',    role: 'body',      pixels: [[10,6],[11,8],[12,9],[11,10],[10,11],[9,12]] },
    { name: 'arc_glow',    role: 'head',      pixels: [
        [1,1],[2,0],[3,2],[4,1],[5,2],[6,2],[7,3],[8,4],[9,4],[10,5],[11,6],[12,6],[13,7],[14,8],[15,8],
        [2,2],[4,3],[7,6],[10,7],[13,9],
      ]
    },
    { name: 'spark_nodes', role: 'accessory', pixels: [[3,1],[7,4],[11,7],[15,9],[6,9],[9,12],[4,10]] },
    { name: 'micro_arcs',  role: 'arm',       pixels: [[5,4],[6,5],[9,6],[12,8],[4,9],[8,8],[11,9],[10,12]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 17. black_hole_16 — void suction vortex
// ════════════════════════════════════════════════════════════
export const BLACK_HOLE_16: SpriteTemplate = {
  name: 'black_hole_16', width: 16, height: 16,
  description: 'Black hole vortex — dark void core with spiraling event horizon and suction streaks.',
  regions: [
    { name: 'void_core',   role: 'belt',      pixels: [...rect(6, 6, 9, 9)] },
    { name: 'event_ring',  role: 'head',      pixels: [
        ...hLine(4, 5, 10), ...hLine(11, 5, 10),
        ...vLine(4, 5, 10), ...vLine(11, 5, 10),
        [5,4],[10,4],[5,11],[10,11],
      ]
    },
    { name: 'accretion',   role: 'body',      pixels: [
        ...hLine(3, 4, 11), ...hLine(12, 4, 11),
        ...vLine(3, 4, 11), ...vLine(12, 4, 11),
        [4,3],[11,3],[4,12],[11,12],
      ]
    },
    { name: 'distortion',  role: 'eye',       pixels: [[6,5],[9,5],[5,6],[10,6],[5,9],[10,9],[6,10],[9,10]] },
    { name: 'suction',     role: 'arm',       pixels: [
        [0,7],[1,7],[2,6],[2,8],[3,5],[3,9],
        [13,7],[14,7],[15,6],[15,8],[13,5],[13,9],[12,5],[12,9],
        [6,0],[9,0],[6,15],[9,15],[5,1],[10,1],[5,14],[10,14],
      ]
    },
    { name: 'warp_glow',   role: 'accessory', pixels: [[5,5],[10,5],[5,10],[10,10],[7,3],[8,3],[7,12],[8,12],[3,7],[3,8],[12,7],[12,8]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 18. petal_shower_16 — cherry blossom petal cascade
// ════════════════════════════════════════════════════════════
export const PETAL_SHOWER_16: SpriteTemplate = {
  name: 'petal_shower_16', width: 16, height: 16,
  description: 'Cherry blossom petal shower — drifting oval petals at varied rotations and heights.',
  regions: [
    { name: 'petals_main', role: 'body',      pixels: [
        [2,2],[3,2],[3,3],[4,3],
        [7,1],[8,1],[8,2],[9,2],
        [12,3],[13,3],[13,4],[14,4],
        [1,7],[2,7],[2,8],[3,8],
        [6,6],[7,6],[7,7],[8,7],
        [10,5],[11,5],[11,6],[12,6],
        [3,12],[4,12],[4,13],[5,13],
        [8,11],[9,11],[9,12],[10,12],
        [13,10],[14,10],[14,11],[15,11],
        [0,14],[1,14],[1,15],[2,15],
        [5,15],[6,15],[6,14],[7,14],
        [11,14],[12,14],[12,15],[13,15],
      ]
    },
    { name: 'petal_tips',  role: 'accessory', pixels: [[2,2],[7,1],[12,3],[1,7],[6,6],[10,5],[3,12],[8,11],[13,10],[0,14],[5,15],[11,14]] },
    { name: 'centers',     role: 'eye',       pixels: [[3,3],[8,2],[13,4],[2,8],[7,7],[11,6],[4,13],[9,12],[14,11],[1,15],[6,14],[12,15]] },
    { name: 'stem_tips',   role: 'arm',       pixels: [[4,4],[9,3],[14,5],[3,9],[8,8],[12,7],[5,14],[10,13],[15,12],[2,15],[7,13],[13,13]] },
    { name: 'wind_drift',  role: 'head',      pixels: [[5,2],[10,1],[15,4],[4,8],[9,6],[14,8],[6,13],[11,12],[2,13],[0,8],[4,15],[14,14]] },
    { name: 'blush',       role: 'belt',      pixels: [[3,2],[8,1],[13,3],[2,7],[7,6],[11,5],[4,12],[9,11],[14,10],[1,14],[6,15],[12,14]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 19. steam_vent_16 — rising industrial steam jets
// ════════════════════════════════════════════════════════════
export const STEAM_VENT_16: SpriteTemplate = {
  name: 'steam_vent_16', width: 16, height: 16,
  description: 'Steam vent — two rising steam jets from grate vents with billowing cloud tops.',
  regions: [
    { name: 'grate',       role: 'belt',      pixels: [...hLine(14, 2, 6), ...hLine(14, 9, 13), ...hLine(15, 2, 6), ...hLine(15, 9, 13), [3,14],[5,14],[10,14],[12,14]] },
    { name: 'jet_left',    role: 'body',      pixels: [...vLine(4, 7, 13), ...vLine(5, 7, 13), ...vLine(3, 9, 13), ...vLine(6, 9, 13)] },
    { name: 'jet_right',   role: 'body',      pixels: [...vLine(10, 7, 13), ...vLine(11, 7, 13), ...vLine(9, 9, 13), ...vLine(12, 9, 13)] },
    { name: 'cloud_left',  role: 'head',      pixels: [...hLine(6, 2, 7), ...hLine(5, 2, 7), ...hLine(4, 3, 6), ...hLine(3, 3, 6), ...hLine(2, 4, 5)] },
    { name: 'cloud_right', role: 'head',      pixels: [...hLine(6, 8, 13), ...hLine(5, 8, 13), ...hLine(4, 9, 12), ...hLine(3, 9, 12), ...hLine(2, 10, 11)] },
    { name: 'highlights',  role: 'eye',       pixels: [[3,5],[4,4],[5,3],[3,3],[9,5],[10,4],[11,3],[9,3]] },
    { name: 'wisps',       role: 'arm',       pixels: [[2,3],[1,4],[0,5],[1,6],[2,6],[13,3],[14,4],[15,5],[14,6],[13,6],[6,2],[7,2],[8,1],[8,2]] },
  ],
};

// ════════════════════════════════════════════════════════════
// 20. soul_orb_16 — floating ghost wisp cluster
// ════════════════════════════════════════════════════════════
export const SOUL_ORB_16: SpriteTemplate = {
  name: 'soul_orb_16', width: 16, height: 16,
  description: 'Soul orb — a central spectral orb with smaller ghost wisps orbiting and drifting away.',
  regions: [
    { name: 'orb_core',    role: 'eye',       pixels: [...rect(6, 6, 9, 9)] },
    { name: 'orb_body',    role: 'body',      pixels: [
        ...hLine(5, 5, 10), ...hLine(10, 5, 10),
        ...vLine(5, 5, 10), ...vLine(10, 5, 10),
        ...hLine(6, 4, 11), ...hLine(9, 4, 11),
        ...vLine(4, 6, 9),  ...vLine(11, 6, 9),
      ]
    },
    { name: 'orb_glow',    role: 'head',      pixels: [
        ...hLine(4, 5, 10), ...hLine(11, 5, 10),
        ...vLine(4, 5, 10), ...vLine(11, 5, 10),
        [5,3],[6,3],[9,3],[10,3],[3,5],[3,6],[3,9],[3,10],[12,5],[12,6],[12,9],[12,10],[5,12],[6,12],[9,12],[10,12],
      ]
    },
    { name: 'wisps',       role: 'accessory', pixels: [
        [2,2],[3,2],[2,3],
        [12,2],[13,2],[13,3],
        [2,12],[3,13],[2,13],
        [12,13],[13,12],[13,13],
        [7,1],[8,1],[7,2],
        [7,13],[8,13],[7,14],
        [1,7],[1,8],[2,8],
        [13,7],[14,7],[14,8],
      ]
    },
    { name: 'wisp_trails', role: 'arm',       pixels: [
        [1,1],[0,2],[1,3],[0,4],
        [14,1],[15,2],[14,3],[15,4],
        [0,11],[1,12],[0,13],[1,14],
        [14,11],[15,12],[14,13],[15,14],
      ]
    },
    { name: 'spirit_motes',role: 'belt',      pixels: [[5,1],[10,2],[14,5],[15,9],[11,14],[6,15],[2,11],[1,6]] },
  ],
};

// ════════════════════════════════════════════════════════════
// COLOR SCHEMES
// ════════════════════════════════════════════════════════════

export const PLASMA_BEAM_COLORS       = scheme('plasma_beam_default',       { eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, head: { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' }, accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, belt: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' } });
export const BLOOD_SPLATTER_COLORS    = scheme('blood_splatter_default',     { body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, head: { shadow: '#140c1c', base: '#442434', highlight: '#d04648' }, belt: { shadow: '#140c1c', base: '#442434', highlight: '#442434' }, eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, accessory: { shadow: '#442434', base: '#d04648', highlight: '#d04648' } });
export const FROST_NOVA_COLORS        = scheme('frost_nova_default',         { body: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, belt: { shadow: '#4e4a4e', base: '#597dce', highlight: '#6dc2ca' } });
export const ELECTRIC_SHOCK_COLORS    = scheme('electric_shock_default',     { eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, head: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' } });
export const LEAF_SWIRL_COLORS        = scheme('leaf_swirl_default',         { body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, leg: { shadow: '#557a23', base: '#6daa2c', highlight: '#dad45e' }, eye: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' }, accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, arm: { shadow: '#346524', base: '#557a23', highlight: '#6daa2c' } });
export const SHADOW_MIST_COLORS       = scheme('shadow_mist_default',        { body: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, head: { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' }, belt: { shadow: '#140c1c', base: '#140c1c', highlight: '#30346d' }, arm: { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' }, eye: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' } });
export const FIRE_RAIN_COLORS         = scheme('fire_rain_default',          { body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, belt: { shadow: '#140c1c', base: '#442434', highlight: '#d04648' } });
export const BUBBLE_POP_COLORS        = scheme('bubble_pop_default',         { head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, body: { shadow: '#6dc2ca', base: '#8595a1', highlight: '#deeed6' }, eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, arm: { shadow: '#4e4a4e', base: '#6dc2ca', highlight: '#deeed6' } });
export const CONFETTI_BURST_COLORS    = scheme('confetti_burst_default',     { accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, arm: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, head: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, belt: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' } });
export const DUST_CLOUD_COLORS        = scheme('dust_cloud_default',         { body: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, eye: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' } });
export const ENERGY_WAVE_COLORS       = scheme('energy_wave_default',        { head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, body: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, belt: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, arm: { shadow: '#4e4a4e', base: '#597dce', highlight: '#6dc2ca' } });
export const METEOR_STRIKE_COLORS     = scheme('meteor_strike_default',      { head: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, arm: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' } });
export const ACID_DRIP_COLORS         = scheme('acid_drip_default',          { body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, eye: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' }, head: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' }, belt: { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' } });
export const HOLY_CROSS_COLORS        = scheme('holy_cross_default',         { eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, body: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, belt: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' } });
export const WIND_SLASH_COLORS        = scheme('wind_slash_default',         { eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, body: { shadow: '#30346d', base: '#8595a1', highlight: '#deeed6' }, head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, arm: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, belt: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' } });
export const CHAIN_LIGHTNING_COLORS   = scheme('chain_lightning_default',    { eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, head: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, arm: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' } });
export const BLACK_HOLE_COLORS        = scheme('black_hole_default',         { belt: { shadow: '#140c1c', base: '#140c1c', highlight: '#30346d' }, head: { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' }, body: { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' }, eye: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, arm: { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' }, accessory: { shadow: '#4e4a4e', base: '#597dce', highlight: '#6dc2ca' } });
export const PETAL_SHOWER_COLORS      = scheme('petal_shower_default',       { body: { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' }, accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, arm: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, head: { shadow: '#4e4a4e', base: '#d2aa99', highlight: '#deeed6' }, belt: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' } });
export const STEAM_VENT_COLORS        = scheme('steam_vent_default',         { belt: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, body: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, head: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, arm: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' } });
export const SOUL_ORB_COLORS          = scheme('soul_orb_default',           { eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, head: { shadow: '#4e4a4e', base: '#30346d', highlight: '#597dce' }, accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, arm: { shadow: '#30346d', base: '#4e4a4e', highlight: '#597dce' }, belt: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' } });

// ════════════════════════════════════════════════════════════
// EXPORTS
// ════════════════════════════════════════════════════════════

export const EFFECT_BATCH2_TEMPLATES: Record<string, SpriteTemplate> = {
  plasma_beam_16:     PLASMA_BEAM_16,
  blood_splatter_16:  BLOOD_SPLATTER_16,
  frost_nova_16:      FROST_NOVA_16,
  electric_shock_16:  ELECTRIC_SHOCK_16,
  leaf_swirl_16:      LEAF_SWIRL_16,
  shadow_mist_16:     SHADOW_MIST_16,
  fire_rain_16:       FIRE_RAIN_16,
  bubble_pop_16:      BUBBLE_POP_16,
  confetti_burst_16:  CONFETTI_BURST_16,
  dust_cloud_16:      DUST_CLOUD_16,
  energy_wave_16:     ENERGY_WAVE_16,
  meteor_strike_16:   METEOR_STRIKE_16,
  acid_drip_16:       ACID_DRIP_16,
  holy_cross_16:      HOLY_CROSS_16,
  wind_slash_16:      WIND_SLASH_16,
  chain_lightning_16: CHAIN_LIGHTNING_16,
  black_hole_16:      BLACK_HOLE_16,
  petal_shower_16:    PETAL_SHOWER_16,
  steam_vent_16:      STEAM_VENT_16,
  soul_orb_16:        SOUL_ORB_16,
};

export const EFFECT_BATCH2_COLOR_SCHEMES: Record<string, ColorScheme> = {
  plasma_beam_default:     PLASMA_BEAM_COLORS,
  blood_splatter_default:  BLOOD_SPLATTER_COLORS,
  frost_nova_default:      FROST_NOVA_COLORS,
  electric_shock_default:  ELECTRIC_SHOCK_COLORS,
  leaf_swirl_default:      LEAF_SWIRL_COLORS,
  shadow_mist_default:     SHADOW_MIST_COLORS,
  fire_rain_default:       FIRE_RAIN_COLORS,
  bubble_pop_default:      BUBBLE_POP_COLORS,
  confetti_burst_default:  CONFETTI_BURST_COLORS,
  dust_cloud_default:      DUST_CLOUD_COLORS,
  energy_wave_default:     ENERGY_WAVE_COLORS,
  meteor_strike_default:   METEOR_STRIKE_COLORS,
  acid_drip_default:       ACID_DRIP_COLORS,
  holy_cross_default:      HOLY_CROSS_COLORS,
  wind_slash_default:      WIND_SLASH_COLORS,
  chain_lightning_default: CHAIN_LIGHTNING_COLORS,
  black_hole_default:      BLACK_HOLE_COLORS,
  petal_shower_default:    PETAL_SHOWER_COLORS,
  steam_vent_default:      STEAM_VENT_COLORS,
  soul_orb_default:        SOUL_ORB_COLORS,
};
