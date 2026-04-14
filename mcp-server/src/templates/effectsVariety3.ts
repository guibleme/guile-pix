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

function border(x0: number, y0: number, x1: number, y1: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let x = x0; x <= x1; x++) { out.push([x, y0]); out.push([x, y1]); }
  for (let y = y0 + 1; y < y1; y++) { out.push([x0, y]); out.push([x1, y]); }
  return out;
}

const FX3_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c'  },
  head:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161'  },
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6'  },
  eye:       { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6'  },
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca'  },
  arm:       { shadow: '#442434', base: '#4e4a4e',  highlight: '#757161'  },
  hand:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6'  },
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c'  },
  leg:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e'  },
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161'  },
  accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e'  },
};

function scheme(name: string, overrides: Partial<typeof FX3_BASE>): ColorScheme {
  return { name, mapping: { ...FX3_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. gravity_well_16 — pulling force field vortex
// ════════════════════════════════════════════════════════════
export const GRAVITY_WELL_16: SpriteTemplate = {
  name: 'gravity_well_16', width: 16, height: 16,
  description: 'Gravity well — dark pulling vortex with spiraling debris and energy convergence lines.',
  regions: [
    { name: 'void_center', role: 'belt', pixels: [...rect(6, 6, 9, 9)] },
    { name: 'spiral_ring', role: 'body', pixels: [
        ...hLine(4, 5, 10), ...hLine(11, 5, 10),
        ...vLine(4, 5, 10), ...vLine(11, 5, 10),
        [5, 4], [10, 4], [5, 11], [10, 11],
      ]
    },
    { name: 'pull_lines', role: 'arm', pixels: [
        [2, 2], [3, 3], [3, 4],
        [13, 2], [12, 3], [12, 4],
        [2, 13], [3, 12], [3, 11],
        [13, 13], [12, 12], [12, 11],
        [0, 7], [1, 7], [2, 7],
        [13, 8], [14, 8], [15, 8],
        [7, 0], [7, 1], [7, 2],
        [8, 13], [8, 14], [8, 15],
      ]
    },
    { name: 'debris', role: 'accessory', pixels: [
        [1, 4], [4, 1], [14, 4], [11, 1],
        [1, 11], [4, 14], [14, 11], [11, 14],
      ]
    },
    { name: 'core_glow', role: 'eye', pixels: [[7, 7], [8, 7], [7, 8], [8, 8]] },
    { name: 'distortion', role: 'head', pixels: [
        [5, 5], [10, 5], [5, 10], [10, 10],
        [6, 4], [9, 4], [4, 6], [11, 6],
        [4, 9], [11, 9], [6, 11], [9, 11],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 2. time_freeze_16 — clock/frozen time effect
// ════════════════════════════════════════════════════════════
export const TIME_FREEZE_16: SpriteTemplate = {
  name: 'time_freeze_16', width: 16, height: 16,
  description: 'Time freeze — clock face outline with frozen hands and scattered ice-crystal particles.',
  regions: [
    { name: 'clock_ring', role: 'body', pixels: [
        ...hLine(2, 5, 10), ...hLine(13, 5, 10),
        ...vLine(2, 5, 10), ...vLine(13, 5, 10),
        [3, 3], [4, 3], [3, 4],
        [12, 3], [11, 3], [12, 4],
        [3, 12], [4, 12], [3, 11],
        [12, 12], [11, 12], [12, 11],
      ]
    },
    { name: 'clock_face', role: 'head', pixels: [...rect(5, 5, 10, 10)] },
    { name: 'clock_hands', role: 'eye', pixels: [
        [7, 7], [8, 7], [7, 8], [8, 8],
        [7, 5], [8, 5],
        [10, 7], [10, 8],
      ]
    },
    { name: 'hour_marks', role: 'arm', pixels: [
        [7, 3], [8, 3], [7, 12], [8, 12],
        [3, 7], [3, 8], [12, 7], [12, 8],
      ]
    },
    { name: 'frost_particles', role: 'accessory', pixels: [
        [0, 0], [1, 1], [15, 0], [14, 1],
        [0, 15], [1, 14], [15, 15], [14, 14],
        [0, 7], [15, 8], [7, 0], [8, 15],
      ]
    },
    { name: 'freeze_glow', role: 'belt', pixels: [
        [4, 4], [11, 4], [4, 11], [11, 11],
        [5, 3], [10, 3], [3, 5], [12, 5],
        [3, 10], [12, 10], [5, 12], [10, 12],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 3. blood_slash_16 — red combat slash arc
// ════════════════════════════════════════════════════════════
export const BLOOD_SLASH_16: SpriteTemplate = {
  name: 'blood_slash_16', width: 16, height: 16,
  description: 'Blood slash — curved red combat arc with droplet spray and bright impact core.',
  regions: [
    { name: 'slash_arc', role: 'body', pixels: [
        [2, 12], [3, 11], [4, 10], [5, 9], [6, 8],
        [7, 7], [8, 6], [9, 5], [10, 4], [11, 3], [12, 2],
        [3, 12], [4, 11], [5, 10], [6, 9],
        [7, 8], [8, 7], [9, 6], [10, 5], [11, 4], [12, 3],
      ]
    },
    { name: 'slash_core', role: 'eye', pixels: [
        [7, 7], [8, 6], [9, 5], [8, 7], [9, 6],
      ]
    },
    { name: 'droplets', role: 'head', pixels: [
        [1, 13], [0, 14], [5, 12], [4, 13],
        [13, 1], [14, 0], [12, 4], [13, 3],
        [10, 2], [3, 9], [6, 11],
      ]
    },
    { name: 'spray', role: 'accessory', pixels: [
        [0, 15], [2, 14], [6, 13], [14, 2], [15, 1],
        [1, 10], [11, 1], [13, 5],
      ]
    },
    { name: 'trail_fade', role: 'arm', pixels: [
        [1, 11], [2, 10], [3, 10], [11, 2], [10, 3], [10, 2],
      ]
    },
    { name: 'impact_glow', role: 'belt', pixels: [
        [6, 7], [7, 6], [5, 8], [10, 3],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 4. smoke_bomb_16 — expanding smoke cloud
// ════════════════════════════════════════════════════════════
export const SMOKE_BOMB_16: SpriteTemplate = {
  name: 'smoke_bomb_16', width: 16, height: 16,
  description: 'Smoke bomb — expanding cloud burst from center with dense inner core and wispy edges.',
  regions: [
    { name: 'dense_core', role: 'belt', pixels: [...rect(5, 6, 10, 10)] },
    { name: 'cloud_mid', role: 'body', pixels: [
        ...hLine(5, 4, 11), ...hLine(11, 4, 11),
        ...vLine(4, 6, 10), ...vLine(11, 6, 10),
        [4, 5], [5, 4], [5, 5], [10, 4], [11, 5], [10, 5],
        [4, 11], [5, 12], [5, 11], [10, 11], [11, 11], [10, 12],
      ]
    },
    { name: 'wispy_edges', role: 'head', pixels: [
        [3, 5], [3, 6], [3, 10], [3, 11],
        [12, 5], [12, 6], [12, 10], [12, 11],
        [5, 3], [6, 3], [10, 3], [9, 3],
        [5, 13], [6, 13], [9, 13], [10, 13],
      ]
    },
    { name: 'outer_wisps', role: 'accessory', pixels: [
        [2, 4], [2, 7], [2, 12], [13, 4], [13, 8], [13, 12],
        [4, 2], [7, 2], [11, 2], [4, 14], [8, 14], [11, 14],
      ]
    },
    { name: 'spark_center', role: 'eye', pixels: [[7, 7], [8, 7], [7, 8], [8, 8]] },
    { name: 'rising_tendrils', role: 'arm', pixels: [
        [6, 1], [7, 1], [8, 0], [9, 1],
        [5, 2], [10, 2], [4, 3], [11, 3],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 5. laser_beam_16 — focused sci-fi beam
// ════════════════════════════════════════════════════════════
export const LASER_BEAM_16: SpriteTemplate = {
  name: 'laser_beam_16', width: 16, height: 16,
  description: 'Laser beam — tight focused beam with bright core, edge glow, and muzzle flare.',
  regions: [
    { name: 'beam_core', role: 'eye', pixels: [...hLine(7, 0, 15), ...hLine(8, 0, 15)] },
    { name: 'beam_glow', role: 'body', pixels: [...hLine(6, 1, 14), ...hLine(9, 1, 14)] },
    { name: 'beam_haze', role: 'head', pixels: [...hLine(5, 3, 12), ...hLine(10, 3, 12)] },
    { name: 'muzzle_flare', role: 'accessory', pixels: [
        [0, 5], [0, 6], [0, 9], [0, 10],
        [1, 4], [1, 11],
        [2, 5], [2, 10],
      ]
    },
    { name: 'impact_flare', role: 'belt', pixels: [
        [15, 5], [15, 6], [15, 9], [15, 10],
        [14, 4], [14, 11],
        [13, 5], [13, 10],
      ]
    },
    { name: 'scatter_sparks', role: 'arm', pixels: [
        [3, 4], [5, 3], [7, 4], [9, 3], [11, 4], [13, 3],
        [4, 11], [6, 12], [8, 11], [10, 12], [12, 11],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 6. rain_drops_16 — falling rain pattern
// ════════════════════════════════════════════════════════════
export const RAIN_DROPS_16: SpriteTemplate = {
  name: 'rain_drops_16', width: 16, height: 16,
  description: 'Rain drops — staggered falling rain streaks with splash impact and subtle highlights.',
  regions: [
    { name: 'rain_streaks', role: 'body', pixels: [
        [2, 0], [2, 1], [2, 2],
        [5, 2], [5, 3], [5, 4],
        [9, 1], [9, 2], [9, 3],
        [12, 3], [12, 4], [12, 5],
        [0, 5], [0, 6], [0, 7],
        [7, 6], [7, 7], [7, 8],
        [14, 5], [14, 6], [14, 7],
        [3, 8], [3, 9], [3, 10],
        [10, 9], [10, 10], [10, 11],
        [6, 11], [6, 12], [6, 13],
        [13, 10], [13, 11], [13, 12],
        [1, 12], [1, 13], [1, 14],
      ]
    },
    { name: 'drop_tips', role: 'eye', pixels: [
        [2, 2], [5, 4], [9, 3], [12, 5], [0, 7],
        [7, 8], [14, 7], [3, 10], [10, 11], [6, 13],
        [13, 12], [1, 14],
      ]
    },
    { name: 'splashes', role: 'head', pixels: [
        [1, 15], [2, 15], [3, 15],
        [5, 15], [6, 14], [7, 15],
        [9, 14], [10, 15], [11, 14],
        [13, 15], [14, 14],
      ]
    },
    { name: 'splash_drops', role: 'accessory', pixels: [
        [0, 14], [4, 14], [8, 13], [12, 13], [15, 14],
      ]
    },
    { name: 'highlight_tips', role: 'arm', pixels: [
        [2, 0], [5, 2], [9, 1], [12, 3], [0, 5],
        [7, 6], [14, 5], [3, 8], [10, 9], [6, 11],
      ]
    },
    { name: 'puddle', role: 'belt', pixels: [...hLine(15, 0, 15)] },
  ],
};

// ════════════════════════════════════════════════════════════
// 7. snow_flurry_16 — swirling snowflake particles
// ════════════════════════════════════════════════════════════
export const SNOW_FLURRY_16: SpriteTemplate = {
  name: 'snow_flurry_16', width: 16, height: 16,
  description: 'Snow flurry — scattered snowflakes at various sizes with wind drift and ground accumulation.',
  regions: [
    { name: 'large_flakes', role: 'eye', pixels: [
        [3, 2], [4, 2], [3, 3], [4, 3],
        [10, 5], [11, 5], [10, 6], [11, 6],
        [6, 9], [7, 9], [6, 10], [7, 10],
      ]
    },
    { name: 'medium_flakes', role: 'body', pixels: [
        [7, 1], [13, 3], [1, 6], [14, 8],
        [4, 7], [9, 11], [2, 12], [12, 10],
      ]
    },
    { name: 'small_flakes', role: 'head', pixels: [
        [0, 1], [6, 0], [11, 2], [15, 4],
        [8, 4], [2, 5], [13, 7], [0, 9],
        [5, 8], [15, 10], [3, 11], [11, 13],
        [8, 12], [14, 12], [1, 14],
      ]
    },
    { name: 'drift_trails', role: 'arm', pixels: [
        [5, 2], [12, 5], [8, 9], [3, 10],
        [11, 11], [7, 13], [14, 13],
      ]
    },
    { name: 'ground_snow', role: 'accessory', pixels: [
        ...hLine(15, 0, 15),
        [0, 14], [1, 14], [4, 14], [5, 14],
        [9, 14], [10, 14], [14, 14], [15, 14],
      ]
    },
    { name: 'sparkle', role: 'belt', pixels: [
        [4, 2], [11, 5], [7, 9], [3, 3], [10, 6],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 8. sand_storm_16 — swirling sand cloud
// ════════════════════════════════════════════════════════════
export const SAND_STORM_16: SpriteTemplate = {
  name: 'sand_storm_16', width: 16, height: 16,
  description: 'Sand storm — dense swirling sand cloud with horizontal streaks and scattered particles.',
  regions: [
    { name: 'dense_cloud', role: 'body', pixels: [
        ...hLine(6, 2, 13), ...hLine(7, 1, 14),
        ...hLine(8, 1, 14), ...hLine(9, 2, 13),
        ...hLine(10, 3, 12),
      ]
    },
    { name: 'upper_wisps', role: 'head', pixels: [
        ...hLine(4, 4, 11), ...hLine(5, 3, 12),
        [5, 3], [6, 3], [9, 3], [10, 3],
      ]
    },
    { name: 'lower_wisps', role: 'head', pixels: [
        ...hLine(11, 4, 11),
        [5, 12], [6, 12], [9, 12], [10, 12],
      ]
    },
    { name: 'streaks', role: 'arm', pixels: [
        [0, 6], [0, 7], [15, 7], [15, 8],
        [0, 9], [15, 10],
        [1, 5], [14, 5], [1, 11], [14, 11],
      ]
    },
    { name: 'particles', role: 'accessory', pixels: [
        [2, 3], [5, 2], [8, 1], [12, 2], [14, 4],
        [1, 12], [4, 13], [7, 14], [11, 13], [14, 12],
      ]
    },
    { name: 'bright_spots', role: 'eye', pixels: [
        [5, 7], [8, 6], [11, 8], [4, 9], [9, 7], [13, 7],
      ]
    },
    { name: 'dark_core', role: 'belt', pixels: [
        [6, 7], [7, 7], [8, 7], [9, 7],
        [6, 8], [7, 8], [8, 8], [9, 8],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 9. vine_growth_16 — growing vine tendrils
// ════════════════════════════════════════════════════════════
export const VINE_GROWTH_16: SpriteTemplate = {
  name: 'vine_growth_16', width: 16, height: 16,
  description: 'Vine growth — twisting vine tendrils growing upward with leaves and budding flowers.',
  regions: [
    { name: 'main_vine', role: 'body', pixels: [
        [7, 15], [7, 14], [7, 13], [7, 12], [8, 11],
        [8, 10], [7, 9], [7, 8], [6, 7], [6, 6],
        [7, 5], [7, 4], [8, 3], [8, 2], [7, 1],
      ]
    },
    { name: 'branch_left', role: 'body', pixels: [
        [6, 12], [5, 11], [4, 11], [3, 10],
        [5, 7], [4, 6], [3, 5],
      ]
    },
    { name: 'branch_right', role: 'body', pixels: [
        [9, 10], [10, 9], [11, 9], [12, 8],
        [9, 5], [10, 4], [11, 3],
      ]
    },
    { name: 'leaves', role: 'head', pixels: [
        [2, 10], [3, 9], [2, 9],
        [2, 5], [3, 4], [2, 4],
        [12, 7], [13, 7], [13, 8],
        [11, 2], [12, 2], [12, 3],
      ]
    },
    { name: 'leaf_tips', role: 'accessory', pixels: [
        [1, 10], [1, 5], [14, 7], [13, 2],
        [1, 9], [1, 4], [14, 8], [13, 3],
      ]
    },
    { name: 'buds', role: 'eye', pixels: [
        [6, 0], [7, 0], [8, 0],
        [3, 3], [2, 3],
        [13, 6], [14, 6],
      ]
    },
    { name: 'roots', role: 'belt', pixels: [
        [5, 15], [6, 15], [8, 15], [9, 15],
        [6, 14], [8, 14], [9, 14],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 10. sonic_wave_16 — sound blast ring
// ════════════════════════════════════════════════════════════
export const SONIC_WAVE_16: SpriteTemplate = {
  name: 'sonic_wave_16', width: 16, height: 16,
  description: 'Sonic wave — expanding sound blast with concentric arcs and vibration distortion lines.',
  regions: [
    { name: 'blast_source', role: 'eye', pixels: [
        [1, 6], [1, 7], [1, 8], [1, 9],
        [2, 7], [2, 8],
      ]
    },
    { name: 'wave_1', role: 'body', pixels: [
        [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11],
        [5, 3], [5, 12],
      ]
    },
    { name: 'wave_2', role: 'head', pixels: [
        [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10], [7, 11], [7, 12], [7, 13],
        [8, 1], [8, 14],
      ]
    },
    { name: 'wave_3', role: 'arm', pixels: [
        [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6],
        [10, 9], [10, 10], [10, 11], [10, 12], [10, 13], [10, 14],
        [11, 0], [11, 15],
      ]
    },
    { name: 'wave_4', role: 'accessory', pixels: [
        [13, 0], [13, 1], [13, 2], [13, 3], [13, 4],
        [13, 11], [13, 12], [13, 13], [13, 14], [13, 15],
        [14, 0], [14, 15],
      ]
    },
    { name: 'distortion', role: 'belt', pixels: [
        [3, 6], [3, 9], [6, 4], [6, 11],
        [9, 3], [9, 12], [12, 2], [12, 13],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 11. pixel_glitch_16 — digital distortion effect
// ════════════════════════════════════════════════════════════
export const PIXEL_GLITCH_16: SpriteTemplate = {
  name: 'pixel_glitch_16', width: 16, height: 16,
  description: 'Pixel glitch — digital distortion with offset scan lines, color shift blocks, and static noise.',
  regions: [
    { name: 'scan_lines', role: 'body', pixels: [
        ...hLine(2, 0, 12),
        ...hLine(5, 3, 15),
        ...hLine(8, 0, 11),
        ...hLine(11, 4, 15),
        ...hLine(14, 0, 10),
      ]
    },
    { name: 'glitch_blocks', role: 'eye', pixels: [
        ...rect(1, 3, 4, 4),
        ...rect(10, 6, 13, 7),
        ...rect(5, 9, 8, 10),
        ...rect(11, 12, 14, 13),
      ]
    },
    { name: 'color_shift_r', role: 'head', pixels: [
        ...hLine(3, 2, 6),
        ...hLine(6, 5, 9),
        ...hLine(9, 1, 5),
        ...hLine(12, 6, 10),
      ]
    },
    { name: 'color_shift_b', role: 'accessory', pixels: [
        ...hLine(3, 6, 10),
        ...hLine(6, 9, 13),
        ...hLine(9, 5, 9),
        ...hLine(12, 10, 14),
      ]
    },
    { name: 'static_noise', role: 'arm', pixels: [
        [0, 0], [3, 1], [7, 0], [11, 1], [14, 0],
        [1, 7], [5, 6], [14, 8],
        [2, 13], [6, 15], [9, 14], [13, 15], [15, 13],
      ]
    },
    { name: 'corruption', role: 'belt', pixels: [
        [0, 4], [15, 4], [0, 10], [15, 10],
        [7, 1], [8, 1], [7, 15], [8, 15],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 12. ember_trail_16 — floating embers rising
// ════════════════════════════════════════════════════════════
export const EMBER_TRAIL_16: SpriteTemplate = {
  name: 'ember_trail_16', width: 16, height: 16,
  description: 'Ember trail — glowing embers drifting upward with hot cores, warm halos, and ash particles.',
  regions: [
    { name: 'hot_embers', role: 'eye', pixels: [
        [3, 12], [4, 12],
        [7, 9], [8, 9],
        [11, 10], [12, 10],
        [5, 6], [6, 6],
        [10, 5], [11, 5],
        [3, 3], [4, 3],
        [8, 2], [9, 2],
        [13, 4],
      ]
    },
    { name: 'ember_glow', role: 'body', pixels: [
        [2, 12], [5, 12], [2, 13], [5, 13],
        [6, 9], [9, 9], [6, 10], [9, 10],
        [10, 10], [13, 10], [10, 11], [13, 11],
        [4, 6], [7, 6], [4, 7], [7, 7],
        [9, 5], [12, 5], [9, 6], [12, 6],
        [2, 3], [5, 3], [2, 4], [5, 4],
        [7, 2], [10, 2], [7, 3], [10, 3],
      ]
    },
    { name: 'warm_halo', role: 'head', pixels: [
        [1, 11], [6, 11], [1, 14], [6, 14],
        [5, 8], [10, 8], [5, 11], [10, 11],
        [9, 9], [14, 9], [9, 12], [14, 12],
        [3, 5], [8, 5], [3, 8], [8, 8],
      ]
    },
    { name: 'ash_particles', role: 'arm', pixels: [
        [1, 15], [4, 14], [8, 14], [12, 13],
        [0, 8], [14, 7], [2, 2], [13, 1],
        [6, 1], [11, 0], [0, 4], [15, 3],
      ]
    },
    { name: 'smoke_wisps', role: 'accessory', pixels: [
        [3, 1], [4, 0], [5, 1],
        [8, 0], [9, 1], [10, 0],
        [12, 2], [13, 3], [14, 2],
      ]
    },
    { name: 'heat_distortion', role: 'belt', pixels: [
        [3, 13], [4, 13], [7, 10], [8, 10],
        [11, 11], [12, 11], [5, 7], [6, 7],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 13. ink_splash_16 — dark ink splatter
// ════════════════════════════════════════════════════════════
export const INK_SPLASH_16: SpriteTemplate = {
  name: 'ink_splash_16', width: 16, height: 16,
  description: 'Ink splash — dark splatter with central pool, radiating blots, and drip streaks.',
  regions: [
    { name: 'central_pool', role: 'belt', pixels: [...rect(5, 6, 10, 10)] },
    { name: 'pool_edge', role: 'body', pixels: [
        ...hLine(5, 4, 11), ...hLine(11, 4, 11),
        [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
        [11, 6], [11, 7], [11, 8], [11, 9], [11, 10],
        [3, 7], [3, 8], [12, 7], [12, 8],
      ]
    },
    { name: 'splatter_blots', role: 'head', pixels: [
        [2, 4], [3, 4], [3, 5],
        [12, 4], [13, 4], [12, 5],
        [2, 12], [3, 12], [3, 11],
        [12, 12], [13, 12], [12, 11],
      ]
    },
    { name: 'drip_streaks', role: 'arm', pixels: [
        [5, 12], [5, 13], [5, 14],
        [8, 12], [8, 13], [8, 14], [8, 15],
        [10, 12], [10, 13],
      ]
    },
    { name: 'flying_drops', role: 'accessory', pixels: [
        [1, 3], [5, 2], [7, 1], [10, 2], [14, 3],
        [0, 6], [15, 6], [1, 10], [14, 10],
      ]
    },
    { name: 'highlights', role: 'eye', pixels: [
        [6, 7], [7, 7], [6, 8],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 14. rainbow_arc_16 — colorful arc
// ════════════════════════════════════════════════════════════
export const RAINBOW_ARC_16: SpriteTemplate = {
  name: 'rainbow_arc_16', width: 16, height: 16,
  description: 'Rainbow arc — multi-layered curved bands from corner to corner with sparkle highlights.',
  regions: [
    { name: 'band_outer', role: 'body', pixels: [
        [0, 12], [1, 10], [2, 9], [3, 8], [4, 7],
        [5, 6], [6, 5], [7, 4], [8, 4], [9, 3],
        [10, 3], [11, 2], [12, 2], [13, 1], [14, 1], [15, 0],
      ]
    },
    { name: 'band_mid_1', role: 'head', pixels: [
        [0, 13], [1, 11], [2, 10], [3, 9], [4, 8],
        [5, 7], [6, 6], [7, 5], [8, 5], [9, 4],
        [10, 4], [11, 3], [12, 3], [13, 2], [14, 2], [15, 1],
      ]
    },
    { name: 'band_mid_2', role: 'eye', pixels: [
        [0, 14], [1, 12], [2, 11], [3, 10], [4, 9],
        [5, 8], [6, 7], [7, 6], [8, 6], [9, 5],
        [10, 5], [11, 4], [12, 4], [13, 3], [14, 3], [15, 2],
      ]
    },
    { name: 'band_mid_3', role: 'accessory', pixels: [
        [0, 15], [1, 13], [2, 12], [3, 11], [4, 10],
        [5, 9], [6, 8], [7, 7], [8, 7], [9, 6],
        [10, 6], [11, 5], [12, 5], [13, 4], [14, 4], [15, 3],
      ]
    },
    { name: 'band_inner', role: 'belt', pixels: [
        [1, 14], [2, 13], [3, 12], [4, 11],
        [5, 10], [6, 9], [7, 8], [8, 8], [9, 7],
        [10, 7], [11, 6], [12, 6], [13, 5], [14, 5], [15, 4],
      ]
    },
    { name: 'sparkles', role: 'arm', pixels: [
        [3, 7], [6, 4], [10, 2], [14, 0],
        [0, 11], [2, 8], [8, 3], [12, 1],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 15. mirror_shield_16 — reflective barrier
// ════════════════════════════════════════════════════════════
export const MIRROR_SHIELD_16: SpriteTemplate = {
  name: 'mirror_shield_16', width: 16, height: 16,
  description: 'Mirror shield — tall reflective barrier with gleaming surface, frame border, and shine lines.',
  regions: [
    { name: 'shield_frame', role: 'belt', pixels: [
        ...border(4, 1, 11, 14),
      ]
    },
    { name: 'shield_surface', role: 'body', pixels: [
        ...rect(5, 2, 10, 13),
      ]
    },
    { name: 'reflection_bright', role: 'eye', pixels: [
        [6, 3], [7, 3], [6, 4], [7, 4],
        [6, 5], [7, 5],
      ]
    },
    { name: 'reflection_mid', role: 'head', pixels: [
        [8, 4], [9, 5], [8, 6], [9, 7],
        [8, 8], [9, 9], [8, 10],
      ]
    },
    { name: 'shine_lines', role: 'accessory', pixels: [
        [3, 2], [3, 3], [12, 2], [12, 3],
        [3, 12], [3, 13], [12, 12], [12, 13],
        [2, 7], [2, 8], [13, 7], [13, 8],
      ]
    },
    { name: 'sparkle_points', role: 'arm', pixels: [
        [1, 1], [14, 1], [1, 14], [14, 14],
        [7, 0], [8, 0], [7, 15], [8, 15],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 16. warp_portal_16 — dimensional rip/tear
// ════════════════════════════════════════════════════════════
export const WARP_PORTAL_16: SpriteTemplate = {
  name: 'warp_portal_16', width: 16, height: 16,
  description: 'Warp portal — vertical dimensional tear with swirling energy edges and void center.',
  regions: [
    { name: 'void_center', role: 'belt', pixels: [
        [7, 3], [8, 3], [7, 4], [8, 4],
        [7, 5], [8, 5], [7, 6], [8, 6],
        [7, 7], [8, 7], [7, 8], [8, 8],
        [7, 9], [8, 9], [7, 10], [8, 10],
        [7, 11], [8, 11], [7, 12], [8, 12],
      ]
    },
    { name: 'tear_edge_left', role: 'body', pixels: [
        [6, 2], [5, 3], [5, 4], [4, 5], [4, 6],
        [5, 7], [5, 8], [4, 9], [4, 10],
        [5, 11], [6, 12], [6, 13],
      ]
    },
    { name: 'tear_edge_right', role: 'body', pixels: [
        [9, 2], [10, 3], [10, 4], [11, 5], [11, 6],
        [10, 7], [10, 8], [11, 9], [11, 10],
        [10, 11], [9, 12], [9, 13],
      ]
    },
    { name: 'energy_swirl', role: 'head', pixels: [
        [3, 4], [3, 5], [3, 8], [3, 9],
        [12, 4], [12, 5], [12, 8], [12, 9],
        [5, 1], [6, 1], [9, 1], [10, 1],
        [5, 14], [6, 14], [9, 14], [10, 14],
      ]
    },
    { name: 'lightning_arcs', role: 'eye', pixels: [
        [2, 6], [2, 7], [13, 6], [13, 7],
        [7, 1], [8, 1], [7, 14], [8, 14],
      ]
    },
    { name: 'particle_scatter', role: 'accessory', pixels: [
        [1, 5], [1, 10], [14, 5], [14, 10],
        [4, 0], [11, 0], [4, 15], [11, 15],
        [0, 7], [0, 8], [15, 7], [15, 8],
      ]
    },
    { name: 'distortion', role: 'arm', pixels: [
        [2, 3], [13, 3], [2, 12], [13, 12],
        [6, 0], [9, 0], [6, 15], [9, 15],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 17. drain_life_16 — life steal effect
// ════════════════════════════════════════════════════════════
export const DRAIN_LIFE_16: SpriteTemplate = {
  name: 'drain_life_16', width: 16, height: 16,
  description: 'Drain life — spiraling dark tendrils converging on a glowing stolen-energy core.',
  regions: [
    { name: 'energy_core', role: 'eye', pixels: [
        [7, 7], [8, 7], [7, 8], [8, 8],
      ]
    },
    { name: 'core_glow', role: 'body', pixels: [
        [6, 6], [7, 6], [8, 6], [9, 6],
        [6, 7], [9, 7],
        [6, 8], [9, 8],
        [6, 9], [7, 9], [8, 9], [9, 9],
      ]
    },
    { name: 'tendril_1', role: 'head', pixels: [
        [5, 5], [4, 4], [3, 3], [2, 2], [1, 1],
        [5, 4], [4, 3], [3, 2],
      ]
    },
    { name: 'tendril_2', role: 'head', pixels: [
        [10, 5], [11, 4], [12, 3], [13, 2], [14, 1],
        [10, 4], [11, 3], [12, 2],
      ]
    },
    { name: 'tendril_3', role: 'head', pixels: [
        [5, 10], [4, 11], [3, 12], [2, 13], [1, 14],
        [5, 11], [4, 12], [3, 13],
      ]
    },
    { name: 'tendril_4', role: 'head', pixels: [
        [10, 10], [11, 11], [12, 12], [13, 13], [14, 14],
        [10, 11], [11, 12], [12, 13],
      ]
    },
    { name: 'stolen_particles', role: 'accessory', pixels: [
        [0, 0], [15, 0], [0, 15], [15, 15],
        [0, 7], [15, 8], [7, 0], [8, 15],
      ]
    },
    { name: 'dark_aura', role: 'belt', pixels: [
        [5, 6], [10, 6], [5, 9], [10, 9],
        [6, 5], [9, 5], [6, 10], [9, 10],
      ]
    },
    { name: 'energy_motes', role: 'arm', pixels: [
        [2, 4], [4, 2], [13, 4], [11, 2],
        [2, 11], [4, 13], [13, 11], [11, 13],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 18. ice_prison_16 — frozen cage effect
// ════════════════════════════════════════════════════════════
export const ICE_PRISON_16: SpriteTemplate = {
  name: 'ice_prison_16', width: 16, height: 16,
  description: 'Ice prison — frozen cage with crystalline bars, icy base, frosted top, and glint highlights.',
  regions: [
    { name: 'ice_bars', role: 'body', pixels: [
        ...vLine(3, 2, 13), ...vLine(6, 2, 13),
        ...vLine(9, 2, 13), ...vLine(12, 2, 13),
      ]
    },
    { name: 'ice_base', role: 'belt', pixels: [
        ...hLine(14, 2, 13), ...hLine(15, 3, 12),
      ]
    },
    { name: 'ice_top', role: 'head', pixels: [
        ...hLine(1, 3, 12), ...hLine(0, 4, 11),
      ]
    },
    { name: 'crystal_points', role: 'accessory', pixels: [
        [2, 0], [5, 0], [10, 0], [13, 0],
        [1, 1], [7, 0], [8, 0], [14, 1],
      ]
    },
    { name: 'glint', role: 'eye', pixels: [
        [3, 3], [6, 4], [9, 3], [12, 4],
        [3, 8], [9, 9],
      ]
    },
    { name: 'frost_fill', role: 'arm', pixels: [
        [4, 4], [5, 5], [7, 4], [8, 5],
        [10, 4], [11, 5], [4, 8], [5, 9],
        [7, 8], [8, 9], [10, 8], [11, 9],
      ]
    },
    { name: 'crack_lines', role: 'leg', pixels: [
        [4, 11], [5, 12], [7, 11], [8, 12],
        [10, 11], [11, 12],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 19. solar_flare_16 — sun burst effect
// ════════════════════════════════════════════════════════════
export const SOLAR_FLARE_16: SpriteTemplate = {
  name: 'solar_flare_16', width: 16, height: 16,
  description: 'Solar flare — bright sun core with radiating flame tendrils and corona glow.',
  regions: [
    { name: 'sun_core', role: 'eye', pixels: [...rect(6, 6, 9, 9)] },
    { name: 'inner_corona', role: 'body', pixels: [
        ...hLine(5, 5, 10), ...hLine(10, 5, 10),
        ...vLine(5, 5, 10), ...vLine(10, 5, 10),
      ]
    },
    { name: 'flare_n', role: 'head', pixels: [
        [7, 4], [8, 4], [7, 3], [8, 3], [7, 2], [8, 1],
      ]
    },
    { name: 'flare_s', role: 'head', pixels: [
        [7, 11], [8, 11], [7, 12], [8, 12], [7, 13], [8, 14],
      ]
    },
    { name: 'flare_e', role: 'head', pixels: [
        [11, 7], [11, 8], [12, 7], [12, 8], [13, 7], [14, 8],
      ]
    },
    { name: 'flare_w', role: 'head', pixels: [
        [4, 7], [4, 8], [3, 7], [3, 8], [2, 7], [1, 8],
      ]
    },
    { name: 'diagonal_flares', role: 'accessory', pixels: [
        [4, 4], [3, 3], [2, 2],
        [11, 4], [12, 3], [13, 2],
        [4, 11], [3, 12], [2, 13],
        [11, 11], [12, 12], [13, 13],
      ]
    },
    { name: 'corona_glow', role: 'belt', pixels: [
        [5, 4], [10, 4], [4, 5], [11, 5],
        [4, 10], [11, 10], [5, 11], [10, 11],
      ]
    },
    { name: 'far_rays', role: 'arm', pixels: [
        [7, 0], [8, 0], [0, 7], [0, 8],
        [15, 7], [15, 8], [7, 15], [8, 15],
        [1, 1], [14, 1], [1, 14], [14, 14],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// 20. spore_cloud_16 — mushroom spore burst
// ════════════════════════════════════════════════════════════
export const SPORE_CLOUD_16: SpriteTemplate = {
  name: 'spore_cloud_16', width: 16, height: 16,
  description: 'Spore cloud — mushroom spore burst with dense center puff, drifting spore particles, and haze.',
  regions: [
    { name: 'dense_center', role: 'body', pixels: [
        ...rect(5, 5, 10, 10),
      ]
    },
    { name: 'puff_edge', role: 'head', pixels: [
        ...hLine(4, 5, 10), ...hLine(11, 5, 10),
        [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
        [11, 5], [11, 6], [11, 7], [11, 8], [11, 9], [11, 10],
      ]
    },
    { name: 'spore_particles', role: 'accessory', pixels: [
        [2, 3], [5, 2], [8, 1], [11, 2], [13, 3],
        [1, 6], [14, 6], [1, 10], [14, 10],
        [2, 13], [5, 14], [8, 14], [11, 14], [13, 13],
      ]
    },
    { name: 'floating_spores', role: 'arm', pixels: [
        [3, 1], [7, 0], [12, 1],
        [0, 4], [15, 4], [0, 11], [15, 11],
        [3, 15], [7, 15], [12, 15],
      ]
    },
    { name: 'bright_core', role: 'eye', pixels: [
        [7, 7], [8, 7], [7, 8], [8, 8],
      ]
    },
    { name: 'haze_ring', role: 'belt', pixels: [
        [3, 4], [12, 4], [3, 11], [12, 11],
        [4, 3], [11, 3], [4, 12], [11, 12],
        [3, 7], [3, 8], [12, 7], [12, 8],
      ]
    },
    { name: 'mushroom_cap', role: 'leg', pixels: [
        [6, 12], [7, 12], [8, 12], [9, 12],
        [7, 13], [8, 13],
        [7, 14], [8, 14],
      ]
    },
  ],
};

// ════════════════════════════════════════════════════════════
// COLOR SCHEMES
// ════════════════════════════════════════════════════════════

export const GRAVITY_WELL_COLORS       = scheme('gravity_well_default',       { belt: { shadow: '#140c1c', base: '#140c1c', highlight: '#30346d' }, body: { shadow: '#30346d', base: '#4e4a4e', highlight: '#597dce' }, arm: { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' }, accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, head: { shadow: '#442434', base: '#597dce', highlight: '#6dc2ca' } });
export const TIME_FREEZE_COLORS        = scheme('time_freeze_default',        { body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, head: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, arm: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, belt: { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' } });
export const BLOOD_SLASH_COLORS        = scheme('blood_slash_default',        { body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, head: { shadow: '#140c1c', base: '#442434', highlight: '#d04648' }, accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, arm: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' }, belt: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' } });
export const SMOKE_BOMB_COLORS         = scheme('smoke_bomb_default',         { belt: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, head: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' }, accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, arm: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' } });
export const LASER_BEAM_COLORS         = scheme('laser_beam_default',         { eye: { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' }, body: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, belt: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, arm: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' } });
export const RAIN_DROPS_COLORS         = scheme('rain_drops_default',         { body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, head: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, arm: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, belt: { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' } });
export const SNOW_FLURRY_COLORS        = scheme('snow_flurry_default',        { eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, body: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, head: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' }, arm: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, accessory: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, belt: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' } });
export const SAND_STORM_COLORS         = scheme('sand_storm_default',         { body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, head: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, arm: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' } });
export const VINE_GROWTH_COLORS        = scheme('vine_growth_default',        { body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, head: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' }, accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, arm: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' } });
export const SONIC_WAVE_COLORS         = scheme('sonic_wave_default',         { eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, body: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, arm: { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' }, accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#30346d' }, belt: { shadow: '#4e4a4e', base: '#597dce', highlight: '#6dc2ca' } });
export const PIXEL_GLITCH_COLORS       = scheme('pixel_glitch_default',       { body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, eye: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' }, head: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, arm: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, belt: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' } });
export const EMBER_TRAIL_COLORS        = scheme('ember_trail_default',        { eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, body: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' }, head: { shadow: '#442434', base: '#854c30', highlight: '#d04648' }, arm: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, accessory: { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' }, belt: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' } });
export const INK_SPLASH_COLORS         = scheme('ink_splash_default',         { belt: { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' }, body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, head: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, arm: { shadow: '#140c1c', base: '#30346d', highlight: '#442434' }, accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, eye: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' } });
export const RAINBOW_ARC_COLORS        = scheme('rainbow_arc_default',        { body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, eye: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, belt: { shadow: '#442434', base: '#30346d', highlight: '#597dce' }, arm: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' } });
export const MIRROR_SHIELD_COLORS      = scheme('mirror_shield_default',      { belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, body: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, head: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, arm: { shadow: '#6dc2ca', base: '#dad45e', highlight: '#deeed6' } });
export const WARP_PORTAL_COLORS        = scheme('warp_portal_default',        { belt: { shadow: '#140c1c', base: '#30346d', highlight: '#442434' }, body: { shadow: '#442434', base: '#597dce', highlight: '#6dc2ca' }, head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, arm: { shadow: '#4e4a4e', base: '#597dce', highlight: '#6dc2ca' } });
export const DRAIN_LIFE_COLORS         = scheme('drain_life_default',         { eye: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' }, body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, belt: { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' }, arm: { shadow: '#442434', base: '#d04648', highlight: '#6daa2c' } });
export const ICE_PRISON_COLORS         = scheme('ice_prison_default',         { body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, belt: { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' }, head: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' }, arm: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#6dc2ca' }, leg: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#597dce' } });
export const SOLAR_FLARE_COLORS        = scheme('solar_flare_default',        { eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, body: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, head: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, accessory: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' }, belt: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, arm: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' } });
export const SPORE_CLOUD_COLORS        = scheme('spore_cloud_default',        { body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, head: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' }, accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, arm: { shadow: '#442434', base: '#346524', highlight: '#6daa2c' }, eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, belt: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, leg: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' } });

// ════════════════════════════════════════════════════════════
// EXPORTS
// ════════════════════════════════════════════════════════════

export const EFFECT_BATCH3_TEMPLATES: Record<string, SpriteTemplate> = {
  gravity_well_16:   GRAVITY_WELL_16,
  time_freeze_16:    TIME_FREEZE_16,
  blood_slash_16:    BLOOD_SLASH_16,
  smoke_bomb_16:     SMOKE_BOMB_16,
  laser_beam_16:     LASER_BEAM_16,
  rain_drops_16:     RAIN_DROPS_16,
  snow_flurry_16:    SNOW_FLURRY_16,
  sand_storm_16:     SAND_STORM_16,
  vine_growth_16:    VINE_GROWTH_16,
  sonic_wave_16:     SONIC_WAVE_16,
  pixel_glitch_16:   PIXEL_GLITCH_16,
  ember_trail_16:    EMBER_TRAIL_16,
  ink_splash_16:     INK_SPLASH_16,
  rainbow_arc_16:    RAINBOW_ARC_16,
  mirror_shield_16:  MIRROR_SHIELD_16,
  warp_portal_16:    WARP_PORTAL_16,
  drain_life_16:     DRAIN_LIFE_16,
  ice_prison_16:     ICE_PRISON_16,
  solar_flare_16:    SOLAR_FLARE_16,
  spore_cloud_16:    SPORE_CLOUD_16,
};

export const EFFECT_BATCH3_COLOR_SCHEMES: Record<string, ColorScheme> = {
  gravity_well_default:   GRAVITY_WELL_COLORS,
  time_freeze_default:    TIME_FREEZE_COLORS,
  blood_slash_default:    BLOOD_SLASH_COLORS,
  smoke_bomb_default:     SMOKE_BOMB_COLORS,
  laser_beam_default:     LASER_BEAM_COLORS,
  rain_drops_default:     RAIN_DROPS_COLORS,
  snow_flurry_default:    SNOW_FLURRY_COLORS,
  sand_storm_default:     SAND_STORM_COLORS,
  vine_growth_default:    VINE_GROWTH_COLORS,
  sonic_wave_default:     SONIC_WAVE_COLORS,
  pixel_glitch_default:   PIXEL_GLITCH_COLORS,
  ember_trail_default:    EMBER_TRAIL_COLORS,
  ink_splash_default:     INK_SPLASH_COLORS,
  rainbow_arc_default:    RAINBOW_ARC_COLORS,
  mirror_shield_default:  MIRROR_SHIELD_COLORS,
  warp_portal_default:    WARP_PORTAL_COLORS,
  drain_life_default:     DRAIN_LIFE_COLORS,
  ice_prison_default:     ICE_PRISON_COLORS,
  solar_flare_default:    SOLAR_FLARE_COLORS,
  spore_cloud_default:    SPORE_CLOUD_COLORS,
};
