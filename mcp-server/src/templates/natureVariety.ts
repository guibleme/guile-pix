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

const NATURE_BASE = {
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  face:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  hand:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof NATURE_BASE>): ColorScheme {
  return { name, mapping: { ...NATURE_BASE, ...overrides } };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. WATERFALL_16 — cascading water falling over a ledge
// ─────────────────────────────────────────────────────────────────────────────
export const WATERFALL_16: SpriteTemplate = {
  name: 'waterfall_16', width: 16, height: 16,
  description: 'Cascading waterfall with foam top, streaking water column, and splash base.',
  regions: [
    { name: 'ledge', role: 'head', pixels: [...hLine(1, 3, 12), ...hLine(2, 3, 12)] },
    { name: 'water_column', role: 'body', pixels: [
      ...rect(5, 3, 10, 11),
    ]},
    { name: 'foam_top', role: 'eye', pixels: [...hLine(2, 4, 11), [5, 3], [6, 3], [9, 3], [10, 3]] },
    { name: 'streaks', role: 'arm', pixels: [
      ...vLine(6, 4, 10), ...vLine(9, 4, 10),
    ]},
    { name: 'splash_pool', role: 'belt', pixels: [
      ...hLine(12, 3, 12), ...hLine(13, 4, 11),
    ]},
    { name: 'mist', role: 'accessory', pixels: [
      [3, 12], [4, 12], [11, 12], [12, 12],
      [3, 13], [12, 13],
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. STALAGMITE_16 — cave floor spike rising from the ground
// ─────────────────────────────────────────────────────────────────────────────
export const STALAGMITE_16: SpriteTemplate = {
  name: 'stalagmite_16', width: 16, height: 16,
  description: 'Cave stalagmite — a tapered stone spike rising from the dungeon floor.',
  regions: [
    { name: 'spike', role: 'body', pixels: [
      [7, 3], [8, 3],
      [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
    ]},
    { name: 'tip_highlight', role: 'eye', pixels: [[7, 3], [7, 4], [6, 5]] },
    { name: 'shadow_side', role: 'leg', pixels: [
      [9, 5], [10, 7], [10, 8], [11, 9], [11, 10],
    ]},
    { name: 'base', role: 'belt', pixels: [...hLine(11, 3, 12), ...hLine(12, 3, 12)] },
    { name: 'crack', role: 'arm', pixels: [[7, 6], [8, 7], [8, 8], [7, 9]] },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. DEAD_TREE_16 — leafless gnarled tree
// ─────────────────────────────────────────────────────────────────────────────
export const DEAD_TREE_16: SpriteTemplate = {
  name: 'dead_tree_16', width: 16, height: 16,
  description: 'Leafless gnarled dead tree with twisted trunk and bare branching limbs.',
  regions: [
    { name: 'trunk', role: 'body', pixels: [
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [6, 11], [7, 11], [8, 11], [9, 11],
      [6, 12], [7, 12], [8, 12], [9, 12],
      [7, 13], [8, 13],
    ]},
    { name: 'main_branches', role: 'head', pixels: [
      [7, 5], [8, 5], [7, 6], [8, 6], [7, 7], [8, 7],
      [4, 5], [5, 5], [6, 5],
      [9, 5], [10, 5], [11, 5],
    ]},
    { name: 'small_branches', role: 'arm', pixels: [
      [2, 4], [3, 4], [3, 5],
      [12, 4], [12, 5], [13, 4],
      [4, 3], [4, 4],
      [11, 3], [11, 4],
      [6, 3], [6, 4],
      [9, 3], [9, 4],
      [7, 2], [7, 3], [8, 3], [8, 2],
    ]},
    { name: 'bark_texture', role: 'leg', pixels: [
      [7, 9], [8, 10], [6, 11], [9, 12],
    ]},
    { name: 'roots', role: 'belt', pixels: [
      [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14],
      [4, 13], [11, 13],
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. LILY_PAD_16 — floating pond lily pad with flower bud
// ─────────────────────────────────────────────────────────────────────────────
export const LILY_PAD_16: SpriteTemplate = {
  name: 'lily_pad_16', width: 16, height: 16,
  description: 'Floating lily pad on water with a small flower bud and a V-notch cut.',
  regions: [
    { name: 'water', role: 'body', pixels: [
      ...hLine(7, 1, 14), ...hLine(8, 1, 14), ...hLine(9, 1, 14),
      ...hLine(10, 2, 13), ...hLine(11, 3, 12),
    ]},
    { name: 'pad', role: 'head', pixels: [
      ...hLine(7, 3, 12),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 3, 12),
      ...hLine(11, 4, 11),
    ]},
    { name: 'pad_notch', role: 'leg', pixels: [[7, 8], [8, 8]] },
    { name: 'pad_highlight', role: 'accessory', pixels: [
      [4, 7], [5, 7], [4, 8], [5, 8],
    ]},
    { name: 'flower', role: 'eye', pixels: [
      [7, 5], [8, 5], [9, 5],
      [7, 6], [8, 6], [9, 6],
    ]},
    { name: 'reflection', role: 'arm', pixels: [
      [3, 10], [4, 10], [12, 10], [13, 10],
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. BAMBOO_STALK_16 — tall bamboo pole with nodes and leaves
// ─────────────────────────────────────────────────────────────────────────────
export const BAMBOO_STALK_16: SpriteTemplate = {
  name: 'bamboo_stalk_16', width: 16, height: 16,
  description: 'Tall bamboo pole with segmented nodes and side leaf sprigs.',
  regions: [
    { name: 'stalk', role: 'body', pixels: [
      ...vLine(7, 1, 14), ...vLine(8, 1, 14),
    ]},
    { name: 'nodes', role: 'head', pixels: [
      ...hLine(4, 6, 9), ...hLine(5, 6, 9),
      ...hLine(9, 6, 9), ...hLine(10, 6, 9),
    ]},
    { name: 'stalk_highlight', role: 'eye', pixels: [...vLine(7, 1, 14)] },
    { name: 'left_leaf', role: 'leg', pixels: [
      [4, 3], [5, 3], [6, 3],
      [3, 4], [4, 4], [5, 4],
    ]},
    { name: 'right_leaf', role: 'accessory', pixels: [
      [9, 7], [10, 7], [11, 7],
      [10, 8], [11, 8], [12, 8],
    ]},
    { name: 'ground', role: 'belt', pixels: [...hLine(15, 5, 10)] },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. CORAL_BRANCH_16 — ocean coral branching formation
// ─────────────────────────────────────────────────────────────────────────────
export const CORAL_BRANCH_16: SpriteTemplate = {
  name: 'coral_branch_16', width: 16, height: 16,
  description: 'Ocean coral branch with main trunk, curving arms, and bulbous tips.',
  regions: [
    { name: 'trunk', role: 'body', pixels: [
      ...vLine(7, 8, 13), ...vLine(8, 8, 13),
      [6, 9], [9, 9],
      [6, 10], [9, 10],
    ]},
    { name: 'left_arm', role: 'head', pixels: [
      [4, 4], [5, 4], [6, 5], [6, 6], [6, 7], [6, 8],
      [3, 3], [4, 3],
    ]},
    { name: 'right_arm', role: 'head', pixels: [
      [9, 5], [10, 5], [10, 4], [11, 4],
      [9, 6], [9, 7], [9, 8],
      [11, 3], [12, 3],
    ]},
    { name: 'tips', role: 'eye', pixels: [
      [3, 2], [4, 2], [3, 3],
      [11, 2], [12, 2], [12, 3],
      [7, 1], [8, 1], [7, 2],
    ]},
    { name: 'base', role: 'belt', pixels: [
      [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14],
    ]},
    { name: 'texture', role: 'arm', pixels: [
      [7, 9], [8, 10], [7, 11], [8, 12],
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. SPIDER_WEB_16 — corner spider web
// ─────────────────────────────────────────────────────────────────────────────
export const SPIDER_WEB_16: SpriteTemplate = {
  name: 'spider_web_16', width: 16, height: 16,
  description: 'Corner spider web with radiating silk threads and a small spider.',
  regions: [
    { name: 'radial_threads', role: 'body', pixels: [
      [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5],
      [0, 2], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
      [0, 5], [1, 5], [2, 5], [3, 6], [4, 7],
      [2, 0], [2, 1], [3, 2], [4, 3], [5, 4], [6, 5],
      [5, 0], [5, 1], [5, 2], [5, 3], [6, 4], [7, 5],
    ]},
    { name: 'web_rings', role: 'head', pixels: [
      [2, 1], [3, 1], [1, 2], [1, 3], [2, 4], [4, 2], [3, 3],
      [4, 1], [5, 2], [2, 5], [1, 4], [3, 5], [5, 3],
    ]},
    { name: 'spider', role: 'eye', pixels: [
      [6, 6], [7, 6], [6, 7], [7, 7],
    ]},
    { name: 'spider_legs', role: 'arm', pixels: [
      [5, 6], [8, 6], [5, 7], [8, 7],
      [6, 5], [7, 5], [6, 8], [7, 8],
    ]},
    { name: 'anchor_threads', role: 'accessory', pixels: [
      [8, 3], [9, 4], [10, 5],
      [3, 8], [4, 9], [5, 10],
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. ICE_CRYSTAL_16 — frozen ice spike formation
// ─────────────────────────────────────────────────────────────────────────────
export const ICE_CRYSTAL_16: SpriteTemplate = {
  name: 'ice_crystal_16', width: 16, height: 16,
  description: 'Frozen ice spike cluster with central tall spike and two shorter flanking shards.',
  regions: [
    { name: 'center_spike', role: 'body', pixels: [
      [7, 2], [8, 2],
      [7, 3], [8, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [6, 6], [7, 6], [8, 6], [9, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    ]},
    { name: 'left_shard', role: 'head', pixels: [
      [4, 5], [5, 5],
      [3, 6], [4, 6], [5, 6],
      [3, 7], [4, 7],
      [3, 8], [4, 8],
    ]},
    { name: 'right_shard', role: 'head', pixels: [
      [10, 6], [11, 6],
      [10, 7], [11, 7], [12, 7],
      [11, 8], [12, 8],
    ]},
    { name: 'ice_glow', role: 'eye', pixels: [
      [7, 2], [7, 3], [6, 4], [6, 5],
      [4, 5], [3, 6],
    ]},
    { name: 'facets', role: 'accessory', pixels: [
      [8, 4], [9, 5], [9, 6], [10, 7],
      [5, 6], [4, 7],
    ]},
    { name: 'base', role: 'belt', pixels: [
      ...hLine(9, 3, 12), ...hLine(10, 3, 12),
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. LAVA_ROCK_16 — cooling lava rock with glowing cracks
// ─────────────────────────────────────────────────────────────────────────────
export const LAVA_ROCK_16: SpriteTemplate = {
  name: 'lava_rock_16', width: 16, height: 16,
  description: 'Dark volcanic rock with glowing orange/red lava cracks still cooling.',
  regions: [
    { name: 'rock_body', role: 'body', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 3, 12),
      ...hLine(5, 2, 13),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 3, 12),
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
    ]},
    { name: 'lava_cracks', role: 'eye', pixels: [
      [6, 4], [7, 5], [7, 6], [8, 7], [8, 8],
      [10, 5], [10, 6], [9, 7],
      [5, 7], [5, 8], [6, 9],
    ]},
    { name: 'glow_halo', role: 'accessory', pixels: [
      [6, 3], [8, 4], [9, 5], [11, 6],
      [4, 8], [6, 10], [9, 10],
    ]},
    { name: 'dark_shadow', role: 'leg', pixels: [
      [11, 7], [12, 7], [12, 8], [12, 9], [11, 10], [10, 11],
    ]},
    { name: 'highlight', role: 'arm', pixels: [
      [3, 4], [4, 3], [5, 2], [4, 5],
    ]},
    { name: 'ground', role: 'belt', pixels: [...hLine(12, 4, 11)] },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. MAGIC_FOUNTAIN_16 — enchanted water fountain
// ─────────────────────────────────────────────────────────────────────────────
export const MAGIC_FOUNTAIN_16: SpriteTemplate = {
  name: 'magic_fountain_16', width: 16, height: 16,
  description: 'Stone fountain basin with glowing magical water arc and sparkle droplets.',
  regions: [
    { name: 'basin', role: 'body', pixels: [
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
      ...hLine(12, 3, 12),
      [2, 10], [13, 10], [2, 11], [13, 11],
    ]},
    { name: 'pedestal', role: 'head', pixels: [
      [6, 8], [7, 8], [8, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    { name: 'water_arc', role: 'eye', pixels: [
      [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 6], [6, 6], [9, 6], [10, 6],
      [4, 7], [5, 7], [10, 7], [11, 7],
      [4, 8], [11, 8],
      [4, 9], [11, 9],
    ]},
    { name: 'sparkles', role: 'accessory', pixels: [
      [7, 2], [8, 3], [6, 3],
      [3, 7], [12, 7],
    ]},
    { name: 'basin_water', role: 'belt', pixels: [
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
    ]},
    { name: 'base_shadow', role: 'leg', pixels: [...hLine(13, 3, 12)] },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. GRAVE_STONE_16 — cemetery headstone
// ─────────────────────────────────────────────────────────────────────────────
export const GRAVE_STONE_16: SpriteTemplate = {
  name: 'grave_stone_16', width: 16, height: 16,
  description: 'Cemetery headstone with rounded top arch, engraved cross, and grass base.',
  regions: [
    { name: 'stone', role: 'body', pixels: [
      [6, 2], [7, 2], [8, 2], [9, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      ...rect(4, 4, 11, 11),
    ]},
    { name: 'arch_top', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [10, 2],
    ]},
    { name: 'cross', role: 'eye', pixels: [
      [7, 5], [8, 5], [7, 6], [8, 6],
      [6, 6], [9, 6],
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    { name: 'stone_texture', role: 'arm', pixels: [
      [5, 4], [11, 4], [4, 8], [11, 8], [5, 11], [10, 11],
    ]},
    { name: 'grass', role: 'leg', pixels: [
      [3, 12], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12],
      [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13],
    ]},
    { name: 'shadow', role: 'belt', pixels: [...hLine(12, 4, 11)] },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. BONE_THRONE_16 — throne made of bones
// ─────────────────────────────────────────────────────────────────────────────
export const BONE_THRONE_16: SpriteTemplate = {
  name: 'bone_throne_16', width: 16, height: 16,
  description: 'Dark throne assembled from bones with skull finials and rib-cage back.',
  regions: [
    { name: 'back_frame', role: 'body', pixels: [
      ...vLine(3, 2, 11), ...vLine(4, 2, 11),
      ...vLine(11, 2, 11), ...vLine(12, 2, 11),
      ...hLine(2, 3, 12), ...hLine(3, 3, 12),
    ]},
    { name: 'ribs', role: 'head', pixels: [
      ...hLine(5, 5, 10), ...hLine(7, 5, 10), ...hLine(9, 5, 10),
    ]},
    { name: 'skull_finials', role: 'eye', pixels: [
      [3, 1], [4, 1], [3, 2], [4, 2],
      [11, 1], [12, 1], [11, 2], [12, 2],
    ]},
    { name: 'seat', role: 'accessory', pixels: [
      ...rect(3, 11, 12, 12),
    ]},
    { name: 'legs', role: 'leg', pixels: [
      ...vLine(3, 13, 14), ...vLine(4, 13, 14),
      ...vLine(11, 13, 14), ...vLine(12, 13, 14),
    ]},
    { name: 'bone_detail', role: 'arm', pixels: [
      [4, 4], [11, 4], [4, 10], [11, 10],
      [5, 3], [10, 3],
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 13. DUNGEON_CHAIN_16 — hanging wall chain
// ─────────────────────────────────────────────────────────────────────────────
export const DUNGEON_CHAIN_16: SpriteTemplate = {
  name: 'dungeon_chain_16', width: 16, height: 16,
  description: 'Rusty chain hanging from a dungeon wall anchor with heavy iron links.',
  regions: [
    { name: 'wall_anchor', role: 'head', pixels: [
      ...hLine(1, 5, 10), ...hLine(2, 5, 10),
      [5, 3], [6, 3], [9, 3], [10, 3],
      [5, 4], [10, 4],
    ]},
    { name: 'chain_links', role: 'body', pixels: [
      [7, 3], [8, 3], [7, 4], [8, 4],
      [6, 5], [9, 5], [6, 6], [9, 6],
      [7, 7], [8, 7], [7, 8], [8, 8],
      [6, 9], [9, 9], [6, 10], [9, 10],
      [7, 11], [8, 11], [7, 12], [8, 12],
    ]},
    { name: 'link_highlight', role: 'eye', pixels: [
      [7, 3], [7, 7], [7, 11],
      [6, 5], [6, 9],
    ]},
    { name: 'rust', role: 'accessory', pixels: [
      [8, 4], [9, 6], [8, 8], [9, 10],
    ]},
    { name: 'bottom_shackle', role: 'belt', pixels: [
      [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13],
      [5, 14], [10, 14],
    ]},
    { name: 'shadow', role: 'leg', pixels: [
      [9, 5], [9, 7], [8, 9], [9, 11],
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 14. PRESSURE_PLATE_16 — floor pressure plate trap
// ─────────────────────────────────────────────────────────────────────────────
export const PRESSURE_PLATE_16: SpriteTemplate = {
  name: 'pressure_plate_16', width: 16, height: 16,
  description: 'Floor pressure plate trap with recessed stone slab and warning rune.',
  regions: [
    { name: 'floor_surround', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'plate', role: 'head', pixels: [
      ...rect(3, 4, 12, 11),
    ]},
    { name: 'plate_recess', role: 'leg', pixels: [
      ...rect(4, 5, 11, 10),
    ]},
    { name: 'warning_rune', role: 'eye', pixels: [
      [7, 6], [8, 6], [7, 7], [8, 7],
      [6, 7], [9, 7],
      [7, 8], [8, 8], [6, 8], [9, 8],
      [7, 9], [8, 9],
    ]},
    { name: 'plate_edge', role: 'arm', pixels: [
      ...hLine(4, 3, 12), ...hLine(11, 3, 12),
      ...vLine(3, 4, 11), ...vLine(12, 4, 11),
    ]},
    { name: 'shadow', role: 'belt', pixels: [
      ...hLine(12, 3, 12), ...vLine(13, 4, 11),
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 15. MAGIC_RUNE_16 — glowing floor rune circle
// ─────────────────────────────────────────────────────────────────────────────
export const MAGIC_RUNE_16: SpriteTemplate = {
  name: 'magic_rune_16', width: 16, height: 16,
  description: 'Glowing magical floor rune circle with outer ring and inner sigil.',
  regions: [
    { name: 'outer_ring', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 3, 4), ...hLine(3, 11, 12),
      ...hLine(4, 2, 3), ...hLine(4, 12, 13),
      ...vLine(2, 5, 10),
      ...vLine(13, 5, 10),
      ...hLine(11, 2, 3), ...hLine(11, 12, 13),
      ...hLine(12, 3, 4), ...hLine(12, 11, 12),
      ...hLine(13, 5, 10),
    ]},
    { name: 'inner_ring', role: 'body', pixels: [
      ...hLine(4, 6, 9),
      ...hLine(5, 5, 10),
      ...hLine(10, 5, 10),
      ...hLine(11, 6, 9),
      ...vLine(5, 5, 10),
      ...vLine(10, 5, 10),
    ]},
    { name: 'rune_glyph', role: 'eye', pixels: [
      [7, 6], [8, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      [7, 8], [8, 8],
      [6, 8], [9, 8],
      [7, 9], [8, 9],
    ]},
    { name: 'glow_nodes', role: 'accessory', pixels: [
      [7, 2], [8, 2],
      [2, 7], [2, 8],
      [13, 7], [13, 8],
      [7, 13], [8, 13],
    ]},
    { name: 'rune_dots', role: 'arm', pixels: [
      [4, 4], [11, 4], [4, 11], [11, 11],
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 16. MOSS_WALL_16 — dungeon wall covered in moss
// ─────────────────────────────────────────────────────────────────────────────
export const MOSS_WALL_16: SpriteTemplate = {
  name: 'moss_wall_16', width: 16, height: 16,
  description: 'Dungeon stone wall with thick moss patches growing over the mortar lines.',
  regions: [
    { name: 'stone_blocks', role: 'body', pixels: [
      ...rect(0, 0, 15, 15),
    ]},
    { name: 'mortar_lines', role: 'arm', pixels: [
      ...hLine(4, 0, 15), ...hLine(9, 0, 15),
      ...vLine(7, 0, 4), ...vLine(3, 5, 9), ...vLine(11, 5, 9), ...vLine(6, 10, 15),
    ]},
    { name: 'moss_patch_main', role: 'head', pixels: [
      [1, 1], [2, 1], [3, 1], [4, 1],
      [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
      [2, 3], [3, 3], [4, 3],
      [8, 5], [9, 5], [10, 5], [11, 5],
      [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [9, 7], [10, 7], [11, 7],
      [1, 10], [2, 10], [3, 10],
      [1, 11], [2, 11], [3, 11], [4, 11],
      [2, 12], [3, 12],
    ]},
    { name: 'moss_highlight', role: 'leg', pixels: [
      [2, 1], [1, 2], [9, 5], [9, 6], [2, 10], [2, 11],
    ]},
    { name: 'moisture', role: 'eye', pixels: [
      [6, 3], [6, 4],
      [13, 7], [13, 8],
      [5, 12], [5, 13],
    ]},
    { name: 'shadow', role: 'belt', pixels: [
      ...hLine(15, 0, 15),
      [15, 0], [15, 1], [15, 2], [15, 3], [15, 4],
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 17. ACID_POOL_16 — green bubbling acid pool
// ─────────────────────────────────────────────────────────────────────────────
export const ACID_POOL_16: SpriteTemplate = {
  name: 'acid_pool_16', width: 16, height: 16,
  description: 'Bubbling green acid pool with foam rim and toxic vapour wisps.',
  regions: [
    { name: 'pool_body', role: 'body', pixels: [
      ...hLine(4, 4, 11),
      ...hLine(5, 2, 13),
      ...hLine(6, 2, 13),
      ...hLine(7, 1, 14),
      ...hLine(8, 1, 14),
      ...hLine(9, 1, 14),
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
      ...hLine(12, 4, 11),
    ]},
    { name: 'foam_rim', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      [3, 5], [12, 5], [2, 6], [13, 6], [2, 7], [13, 7],
      [2, 10], [13, 10], [3, 11], [12, 11],
    ]},
    { name: 'bubbles', role: 'eye', pixels: [
      [6, 6], [7, 6],
      [10, 7], [11, 7],
      [5, 9], [6, 9],
      [9, 10], [10, 10],
      [7, 8],
    ]},
    { name: 'vapour', role: 'accessory', pixels: [
      [5, 2], [8, 1], [11, 2],
      [4, 3], [12, 3],
    ]},
    { name: 'depth', role: 'leg', pixels: [
      [7, 8], [8, 8], [7, 9], [8, 9],
      [6, 10], [9, 10],
    ]},
    { name: 'ground_edge', role: 'belt', pixels: [
      ...hLine(13, 4, 11),
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 18. FIRE_PIT_16 — burning fire pit
// ─────────────────────────────────────────────────────────────────────────────
export const FIRE_PIT_16: SpriteTemplate = {
  name: 'fire_pit_16', width: 16, height: 16,
  description: 'Stone-rimmed fire pit with layered flame and glowing ember base.',
  regions: [
    { name: 'stone_rim', role: 'body', pixels: [
      ...hLine(10, 2, 13), ...hLine(11, 2, 13),
      ...hLine(12, 3, 12), ...hLine(13, 4, 11),
      [2, 10], [13, 10], [2, 11], [13, 11],
    ]},
    { name: 'embers', role: 'belt', pixels: [
      ...hLine(10, 3, 12), [3, 11], [4, 11], [11, 11], [12, 11],
    ]},
    { name: 'inner_flame', role: 'eye', pixels: [
      [7, 3], [8, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7],
      [6, 8], [7, 8], [8, 8], [9, 8],
    ]},
    { name: 'outer_flame', role: 'accessory', pixels: [
      [7, 2], [8, 2],
      [5, 4], [10, 4],
      [5, 5], [10, 5],
      [4, 6], [11, 6],
      [4, 7], [11, 7],
      [5, 8], [10, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    { name: 'smoke', role: 'head', pixels: [
      [7, 1], [8, 1],
      [6, 2], [9, 2],
    ]},
    { name: 'stone_shadow', role: 'leg', pixels: [
      [13, 10], [13, 11], [12, 12], [4, 12], [11, 12],
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 19. ANCIENT_STATUE_16 — weathered stone statue
// ─────────────────────────────────────────────────────────────────────────────
export const ANCIENT_STATUE_16: SpriteTemplate = {
  name: 'ancient_statue_16', width: 16, height: 16,
  description: 'Weathered stone idol statue with cracked body, hollow eyes, and mossy plinth.',
  regions: [
    { name: 'head', role: 'head', pixels: [
      [6, 1], [7, 1], [8, 1], [9, 1],
      [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
      [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
    ]},
    { name: 'body_torso', role: 'body', pixels: [
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    ]},
    { name: 'hollow_eyes', role: 'eye', pixels: [
      [6, 2], [7, 2],
      [9, 2], [10, 2],
    ]},
    { name: 'cracks', role: 'arm', pixels: [
      [7, 3], [8, 4], [8, 5], [7, 6],
      [5, 7], [5, 8], [6, 9],
      [10, 6], [11, 7],
    ]},
    { name: 'plinth', role: 'belt', pixels: [
      ...rect(3, 9, 12, 11),
    ]},
    { name: 'moss_on_plinth', role: 'leg', pixels: [
      [4, 9], [5, 9], [9, 9], [10, 9],
      [3, 10], [12, 10],
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 20. PORTAL_FRAME_16 — dimensional portal doorway
// ─────────────────────────────────────────────────────────────────────────────
export const PORTAL_FRAME_16: SpriteTemplate = {
  name: 'portal_frame_16', width: 16, height: 16,
  description: 'Dimensional portal doorway with stone arch frame and swirling void interior.',
  regions: [
    { name: 'arch_frame', role: 'body', pixels: [
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      [4, 2], [11, 2],
      [3, 3], [12, 3],
      [3, 4], [12, 4],
      ...vLine(2, 5, 12), ...vLine(13, 5, 12),
      ...vLine(3, 5, 12), ...vLine(12, 5, 12),
      ...hLine(13, 3, 12),
    ]},
    { name: 'portal_void', role: 'leg', pixels: [
      ...rect(4, 2, 11, 12),
    ]},
    { name: 'swirl_inner', role: 'eye', pixels: [
      [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [6, 6], [9, 6],
      [7, 7], [8, 7],
      [6, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
      [7, 10], [8, 10],
    ]},
    { name: 'swirl_outer', role: 'accessory', pixels: [
      [5, 4], [10, 4],
      [5, 5], [10, 5],
      [5, 6], [10, 6],
      [5, 9], [10, 9],
      [5, 10], [10, 10],
      [5, 11], [10, 11],
    ]},
    { name: 'arch_gems', role: 'head', pixels: [
      [6, 1], [9, 1],
      [3, 4], [12, 4],
    ]},
    { name: 'base', role: 'belt', pixels: [
      ...hLine(13, 2, 13), ...hLine(14, 3, 12),
    ]},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COLOR SCHEMES
// ─────────────────────────────────────────────────────────────────────────────

export const WATERFALL_COLORS = scheme('waterfall_default', {
  head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
});

export const STALAGMITE_COLORS = scheme('stalagmite_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
  belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
});

export const DEAD_TREE_COLORS = scheme('dead_tree_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
  belt:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
});

export const LILY_PAD_COLORS = scheme('lily_pad_default', {
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  leg:       { shadow: '#140c1c', base: '#346524', highlight: '#346524' },
  accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#d27d2c', base: '#d04648', highlight: '#d27d2c' },
  arm:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
});

export const BAMBOO_STALK_COLORS = scheme('bamboo_stalk_default', {
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  head:      { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
});

export const CORAL_BRANCH_COLORS = scheme('coral_branch_default', {
  body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#d2aa99' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  arm:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
});

export const SPIDER_WEB_COLORS = scheme('spider_web_default', {
  body:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  eye:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
});

export const ICE_CRYSTAL_COLORS = scheme('ice_crystal_default', {
  body:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#597dce', base: '#8595a1', highlight: '#deeed6' },
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
});

export const LAVA_ROCK_COLORS = scheme('lava_rock_default', {
  body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  arm:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
});

export const MAGIC_FOUNTAIN_COLORS = scheme('magic_fountain_default', {
  body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
});

export const GRAVE_STONE_COLORS = scheme('grave_stone_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
});

export const BONE_THRONE_COLORS = scheme('bone_throne_default', {
  body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  eye:       { shadow: '#757161', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#8595a1' },
});

export const DUNGEON_CHAIN_COLORS = scheme('dungeon_chain_default', {
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#d2aa99' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
});

export const PRESSURE_PLATE_COLORS = scheme('pressure_plate_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
});

export const MAGIC_RUNE_COLORS = scheme('magic_rune_default', {
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
});

export const MOSS_WALL_COLORS = scheme('moss_wall_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  leg:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
});

export const ACID_POOL_COLORS = scheme('acid_pool_default', {
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  head:      { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  leg:       { shadow: '#140c1c', base: '#346524', highlight: '#346524' },
  belt:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
});

export const FIRE_PIT_COLORS = scheme('fire_pit_default', {
  body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
});

export const ANCIENT_STATUE_COLORS = scheme('ancient_statue_default', {
  head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#4e4a4e' },
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
});

export const PORTAL_FRAME_COLORS = scheme('portal_frame_default', {
  body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  leg:       { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
  eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
});

export const NATURE_VARIETY_TEMPLATES: Record<string, SpriteTemplate> = {
  waterfall_16:     WATERFALL_16,
  stalagmite_16:    STALAGMITE_16,
  dead_tree_16:     DEAD_TREE_16,
  lily_pad_16:      LILY_PAD_16,
  bamboo_stalk_16:  BAMBOO_STALK_16,
  coral_branch_16:  CORAL_BRANCH_16,
  spider_web_16:    SPIDER_WEB_16,
  ice_crystal_16:   ICE_CRYSTAL_16,
  lava_rock_16:     LAVA_ROCK_16,
  magic_fountain_16: MAGIC_FOUNTAIN_16,
  grave_stone_16:   GRAVE_STONE_16,
  bone_throne_16:   BONE_THRONE_16,
  dungeon_chain_16: DUNGEON_CHAIN_16,
  pressure_plate_16: PRESSURE_PLATE_16,
  magic_rune_16:    MAGIC_RUNE_16,
  moss_wall_16:     MOSS_WALL_16,
  acid_pool_16:     ACID_POOL_16,
  fire_pit_16:      FIRE_PIT_16,
  ancient_statue_16: ANCIENT_STATUE_16,
  portal_frame_16:  PORTAL_FRAME_16,
};

export const NATURE_VARIETY_COLOR_SCHEMES: Record<string, ColorScheme> = {
  waterfall_default:     WATERFALL_COLORS,
  stalagmite_default:    STALAGMITE_COLORS,
  dead_tree_default:     DEAD_TREE_COLORS,
  lily_pad_default:      LILY_PAD_COLORS,
  bamboo_stalk_default:  BAMBOO_STALK_COLORS,
  coral_branch_default:  CORAL_BRANCH_COLORS,
  spider_web_default:    SPIDER_WEB_COLORS,
  ice_crystal_default:   ICE_CRYSTAL_COLORS,
  lava_rock_default:     LAVA_ROCK_COLORS,
  magic_fountain_default: MAGIC_FOUNTAIN_COLORS,
  grave_stone_default:   GRAVE_STONE_COLORS,
  bone_throne_default:   BONE_THRONE_COLORS,
  dungeon_chain_default: DUNGEON_CHAIN_COLORS,
  pressure_plate_default: PRESSURE_PLATE_COLORS,
  magic_rune_default:    MAGIC_RUNE_COLORS,
  moss_wall_default:     MOSS_WALL_COLORS,
  acid_pool_default:     ACID_POOL_COLORS,
  fire_pit_default:      FIRE_PIT_COLORS,
  ancient_statue_default: ANCIENT_STATUE_COLORS,
  portal_frame_default:  PORTAL_FRAME_COLORS,
};
