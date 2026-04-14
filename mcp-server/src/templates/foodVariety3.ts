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

const FOOD3_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
  hand:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },
  belt:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  leg:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof FOOD3_BASE>): ColorScheme {
  return { name, mapping: { ...FOOD3_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// STEAK — Grilled meat steak with grill marks and herb garnish.
// ════════════════════════════════════════════════════════════
export const STEAK_16: SpriteTemplate = {
  name: 'steak_16', width: 16, height: 16,
  description: 'Grilled meat steak with charred grill marks and herb garnish.',
  regions: [
    // Herb garnish — small green sprig at top-right
    { name: 'garnish', role: 'accessory', pixels: [
      [11,3], [12,3],
      [10,4], [11,4],
    ]},
    // Steak body — thick oval slab of meat
    { name: 'steak_body', role: 'body', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
    ]},
    // Grill marks — diagonal char lines across steak
    { name: 'grill_marks', role: 'belt', pixels: [
      [5,6], [7,6], [9,6], [11,6],
      [4,8], [6,8], [8,8], [10,8],
      [5,10], [7,10], [9,10],
    ]},
    // Highlight — sizzle shine on surface
    { name: 'highlight', role: 'eye', pixels: [
      [5,5], [6,5],
      [4,6],
    ]},
    // Shadow — darker underside
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(12, 6, 9),
    ]},
    // Fat marbling — lighter streaks
    { name: 'marbling', role: 'head', pixels: [
      [6,7], [8,7], [10,7],
      [5,9], [7,9], [9,9],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SALAD — Bowl of mixed greens with tomato and dressing.
// ════════════════════════════════════════════════════════════
export const SALAD_16: SpriteTemplate = {
  name: 'salad_16', width: 16, height: 16,
  description: 'Bowl of fresh salad greens with tomato wedges and dressing drizzle.',
  regions: [
    // Leafy greens — piled above the bowl rim
    { name: 'greens', role: 'arm', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 12),
    ]},
    // Tomato slices — red bits on top
    { name: 'tomato', role: 'leg', pixels: [
      [5,4], [6,4],
      [9,3], [10,3],
      [8,5],
    ]},
    // Dressing drizzle — pale yellow highlights
    { name: 'dressing', role: 'eye', pixels: [
      [6,5], [7,5],
      [10,6],
    ]},
    // Bowl rim — ceramic edge
    { name: 'rim', role: 'head', pixels: [
      [2,7], ...hLine(7, 3, 12), [13,7],
    ]},
    // Bowl body — white ceramic
    { name: 'bowl', role: 'body', pixels: [
      [2,8], [13,8],
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
    ]},
    // Bowl base — bottom shadow
    { name: 'base', role: 'boot', pixels: [
      ...hLine(12, 6, 9),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SANDWICH — Layered bread sandwich with filling visible.
// ════════════════════════════════════════════════════════════
export const SANDWICH_16: SpriteTemplate = {
  name: 'sandwich_16', width: 16, height: 16,
  description: 'Layered sandwich with bread, lettuce, meat, and cheese visible from the side.',
  regions: [
    // Top bread slice — rounded crust
    { name: 'top_bread', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(5, 3, 12),
    ]},
    // Lettuce layer — wavy green strip
    { name: 'lettuce', role: 'arm', pixels: [
      [3,6], [4,6], [5,6], [7,6], [8,6], [10,6], [11,6], [12,6],
    ]},
    // Cheese layer — yellow strip
    { name: 'cheese', role: 'accessory', pixels: [
      ...hLine(7, 3, 12),
    ]},
    // Meat layer — thick brown filling
    { name: 'meat', role: 'body', pixels: [
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
    ]},
    // Bottom bread slice — flat base
    { name: 'bottom_bread', role: 'belt', pixels: [
      ...hLine(10, 3, 12),
      ...hLine(11, 4, 11),
    ]},
    // Highlight on top bread
    { name: 'highlight', role: 'eye', pixels: [
      [6,3], [7,3],
      [5,4],
    ]},
    // Shadow underneath
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(12, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// ICE_CREAM_SUNDAE — Glass with scoops, whipped cream, cherry.
// ════════════════════════════════════════════════════════════
export const ICE_CREAM_SUNDAE_16: SpriteTemplate = {
  name: 'ice_cream_sundae_16', width: 16, height: 16,
  description: 'Glass sundae with two scoops of ice cream, whipped cream top, and cherry.',
  regions: [
    // Cherry on top
    { name: 'cherry', role: 'leg', pixels: [
      [7,1], [8,1],
      [7,2], [8,2],
    ]},
    // Cherry stem
    { name: 'stem', role: 'arm', pixels: [
      [8,0],
    ]},
    // Whipped cream — white mound
    { name: 'cream', role: 'eye', pixels: [
      [6,3], [7,3], [8,3], [9,3],
      [5,4], [6,4], [7,4], [8,4], [9,4], [10,4],
    ]},
    // Scoops — two rounded bulges
    { name: 'scoops', role: 'head', pixels: [
      [4,5], [5,5], [6,5], [7,5], [8,5], [9,5], [10,5], [11,5],
      [5,6], [6,6], [7,6], [8,6], [9,6], [10,6],
    ]},
    // Glass body — tapered vessel
    { name: 'glass', role: 'body', pixels: [
      [5,7], [6,7], [7,7], [8,7], [9,7], [10,7],
      [5,8], [6,8], [7,8], [8,8], [9,8], [10,8],
      [6,9], [7,9], [8,9], [9,9],
      [6,10], [7,10], [8,10], [9,10],
      [7,11], [8,11],
    ]},
    // Glass base — flat foot
    { name: 'glass_base', role: 'boot', pixels: [
      [6,12], [7,12], [8,12], [9,12],
      ...hLine(13, 5, 10),
    ]},
    // Glass highlight
    { name: 'glass_shine', role: 'accessory', pixels: [
      [5,7], [5,8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// FRIED_EGG — Sunny side up egg with runny yolk.
// ════════════════════════════════════════════════════════════
export const FRIED_EGG_16: SpriteTemplate = {
  name: 'fried_egg_16', width: 16, height: 16,
  description: 'Sunny-side-up fried egg with bright yellow yolk and irregular white edges.',
  regions: [
    // Egg white — irregular blob shape
    { name: 'egg_white', role: 'body', pixels: [
      ...hLine(3, 6, 9),
      ...hLine(4, 4, 11),
      ...hLine(5, 3, 12),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 3, 12),
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
      ...hLine(12, 6, 9),
    ]},
    // Yolk — round golden center
    { name: 'yolk', role: 'head', pixels: [
      ...hLine(6, 6, 9),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
      ...hLine(9, 6, 9),
    ]},
    // Yolk highlight — shiny spot
    { name: 'yolk_highlight', role: 'eye', pixels: [
      [6,6], [7,6],
      [6,7],
    ]},
    // Crispy edges — darker browned rim
    { name: 'crispy_edge', role: 'accessory', pixels: [
      [6,3], [9,3],
      [4,4], [11,4],
      [3,5], [12,5],
      [2,6], [2,7], [2,8],
      [13,6], [13,7], [13,8],
      [3,9], [12,9],
      [4,10], [11,10],
      [5,11], [10,11],
    ]},
    // Shadow underneath
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(13, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// CORN — Corn on the cob with husk leaves.
// ════════════════════════════════════════════════════════════
export const CORN_16: SpriteTemplate = {
  name: 'corn_16', width: 16, height: 16,
  description: 'Corn on the cob with yellow kernels and green husk leaves pulled back.',
  regions: [
    // Husk leaves — green leaves pulled back at base
    { name: 'husk', role: 'arm', pixels: [
      [6,11], [7,11], [8,11], [9,11],
      [5,12], [6,12], [9,12], [10,12],
      [4,13], [5,13], [10,13], [11,13],
    ]},
    // Corn kernels — yellow rows
    { name: 'kernels', role: 'head', pixels: [
      ...hLine(2, 7, 8),
      ...hLine(3, 6, 9),
      ...hLine(4, 6, 9),
      ...hLine(5, 6, 9),
      ...hLine(6, 6, 9),
      ...hLine(7, 6, 9),
      ...hLine(8, 6, 9),
      ...hLine(9, 6, 9),
      ...hLine(10, 7, 8),
    ]},
    // Kernel row lines — darker vertical divisions
    { name: 'kernel_lines', role: 'body', pixels: [
      ...vLine(7, 3, 9),
      ...vLine(9, 3, 9),
    ]},
    // Highlight — shiny top
    { name: 'highlight', role: 'eye', pixels: [
      [7,2], [8,2],
      [6,3],
    ]},
    // Shadow — darker side
    { name: 'shadow', role: 'boot', pixels: [
      [9,4], [9,5], [9,6], [9,7], [9,8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// PINEAPPLE — Tropical pineapple with crown leaves.
// ════════════════════════════════════════════════════════════
export const PINEAPPLE_16: SpriteTemplate = {
  name: 'pineapple_16', width: 16, height: 16,
  description: 'Tropical pineapple fruit with green crown leaves and textured diamond skin.',
  regions: [
    // Crown leaves — spiky green top
    { name: 'crown', role: 'arm', pixels: [
      [7,0], [8,0],
      [6,1], [7,1], [8,1], [9,1],
      [5,2], [6,2], [7,2], [8,2], [9,2], [10,2],
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Pineapple body — oval with diamond texture
    { name: 'pineapple_body', role: 'head', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 4, 11),
      ...hLine(10, 5, 10),
      ...hLine(11, 5, 10),
      ...hLine(12, 6, 9),
    ]},
    // Diamond texture pattern — darker lines forming grid
    { name: 'texture', role: 'body', pixels: [
      [6,5], [8,5], [10,5],
      [5,7], [7,7], [9,7], [11,7],
      [6,9], [8,9], [10,9],
      [7,11], [9,11],
    ]},
    // Highlight — bright spot on upper left
    { name: 'highlight', role: 'eye', pixels: [
      [5,5], [6,4],
      [5,6],
    ]},
    // Shadow — bottom darker area
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(13, 7, 8),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// CHERRY — Pair of cherries on connected stems.
// ════════════════════════════════════════════════════════════
export const CHERRY_16: SpriteTemplate = {
  name: 'cherry_16', width: 16, height: 16,
  description: 'Pair of red cherries connected by green stems with a small leaf.',
  regions: [
    // Leaf — small green leaf at junction
    { name: 'leaf', role: 'arm', pixels: [
      [8,2], [9,2],
      [8,3],
    ]},
    // Stems — two curved lines from junction
    { name: 'stems', role: 'accessory', pixels: [
      [7,3], [7,4],
      [6,5],
      [9,3], [10,4],
      [11,5],
    ]},
    // Left cherry — round red fruit
    { name: 'left_cherry', role: 'body', pixels: [
      [4,6], [5,6], [6,6],
      [3,7], [4,7], [5,7], [6,7], [7,7],
      [3,8], [4,8], [5,8], [6,8], [7,8],
      [3,9], [4,9], [5,9], [6,9], [7,9],
      [4,10], [5,10], [6,10],
    ]},
    // Right cherry — round red fruit
    { name: 'right_cherry', role: 'body', pixels: [
      [9,6], [10,6], [11,6],
      [8,7], [9,7], [10,7], [11,7], [12,7],
      [8,8], [9,8], [10,8], [11,8], [12,8],
      [8,9], [9,9], [10,9], [11,9], [12,9],
      [9,10], [10,10], [11,10],
    ]},
    // Highlights — shine spots on each cherry
    { name: 'highlight', role: 'eye', pixels: [
      [4,6], [5,6],
      [4,7],
      [9,6], [10,6],
      [9,7],
    ]},
    // Shadows — dark underside on each
    { name: 'shadow', role: 'boot', pixels: [
      [5,10], [6,10],
      [10,10], [11,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// HOT_DOG — Sausage in a bun with mustard line.
// ════════════════════════════════════════════════════════════
export const HOT_DOG_16: SpriteTemplate = {
  name: 'hot_dog_16', width: 16, height: 16,
  description: 'Hot dog sausage in a split bun with a zigzag mustard line on top.',
  regions: [
    // Mustard — zigzag yellow line on top
    { name: 'mustard', role: 'accessory', pixels: [
      [4,5], [5,6], [6,5], [7,6], [8,5], [9,6], [10,5], [11,6],
    ]},
    // Top bun half — upper bread curve
    { name: 'top_bun', role: 'head', pixels: [
      ...hLine(4, 4, 11),
      [3,5], [4,5], [11,5], [12,5],
      [3,6], [12,6],
    ]},
    // Sausage — red/brown meat visible between bun halves
    { name: 'sausage', role: 'leg', pixels: [
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
    ]},
    // Bottom bun half — lower bread
    { name: 'bottom_bun', role: 'body', pixels: [
      [3,9], [12,9],
      [3,10], [4,10], [11,10], [12,10],
      ...hLine(9, 4, 11),
      ...hLine(10, 5, 10),
      ...hLine(11, 5, 10),
    ]},
    // Bun highlight — shine on top bread
    { name: 'bun_highlight', role: 'eye', pixels: [
      [5,4], [6,4],
    ]},
    // Shadow underneath
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(12, 6, 9),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// MOCHI — Japanese rice cake, round and soft.
// ════════════════════════════════════════════════════════════
export const MOCHI_16: SpriteTemplate = {
  name: 'mochi_16', width: 16, height: 16,
  description: 'Japanese mochi rice cake, soft round shape with dusted surface.',
  regions: [
    // Mochi body — soft rounded blob
    { name: 'mochi_body', role: 'body', pixels: [
      ...hLine(5, 6, 9),
      ...hLine(6, 5, 10),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 4, 11),
      ...hLine(10, 5, 10),
      ...hLine(11, 6, 9),
    ]},
    // Filling peek — darker center visible through translucent skin
    { name: 'filling', role: 'leg', pixels: [
      [7,7], [8,7],
      [6,8], [7,8], [8,8], [9,8],
      [7,9], [8,9],
    ]},
    // Dust — starch dusting on top
    { name: 'dust', role: 'eye', pixels: [
      [6,5], [8,5],
      [5,6], [7,6], [10,6],
    ]},
    // Highlight — soft light on upper surface
    { name: 'highlight', role: 'accessory', pixels: [
      [7,5], [9,5],
      [6,6],
    ]},
    // Shadow plate — subtle surface shadow
    { name: 'plate', role: 'boot', pixels: [
      ...hLine(12, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// KEBAB — Meat and vegetables on a wooden skewer stick.
// ════════════════════════════════════════════════════════════
export const KEBAB_16: SpriteTemplate = {
  name: 'kebab_16', width: 16, height: 16,
  description: 'Kebab with alternating meat chunks and vegetables on a vertical skewer.',
  regions: [
    // Skewer stick — vertical wooden stick
    { name: 'skewer', role: 'accessory', pixels: [
      ...vLine(7, 1, 14),
    ]},
    // Top meat chunk
    { name: 'meat_top', role: 'body', pixels: [
      [6,2], [7,2], [8,2],
      [6,3], [7,3], [8,3],
    ]},
    // Onion/pepper chunk
    { name: 'veggie_1', role: 'arm', pixels: [
      [6,4], [7,4], [8,4],
      [6,5], [7,5], [8,5],
    ]},
    // Middle meat chunk
    { name: 'meat_mid', role: 'body', pixels: [
      [6,6], [7,6], [8,6],
      [6,7], [7,7], [8,7],
    ]},
    // Tomato chunk
    { name: 'veggie_2', role: 'leg', pixels: [
      [6,8], [7,8], [8,8],
      [6,9], [7,9], [8,9],
    ]},
    // Bottom meat chunk
    { name: 'meat_bot', role: 'body', pixels: [
      [6,10], [7,10], [8,10],
      [6,11], [7,11], [8,11],
    ]},
    // Meat highlights
    { name: 'highlight', role: 'eye', pixels: [
      [6,2], [6,6], [6,10],
    ]},
    // Meat char marks
    { name: 'char', role: 'boot', pixels: [
      [8,3], [8,7], [8,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// CHOCOLATE_BAR — Wrapped chocolate bar with foil visible.
// ════════════════════════════════════════════════════════════
export const CHOCOLATE_BAR_16: SpriteTemplate = {
  name: 'chocolate_bar_16', width: 16, height: 16,
  description: 'Chocolate bar partially unwrapped, showing chocolate squares and foil wrapper.',
  regions: [
    // Wrapper — foil covering left half
    { name: 'wrapper', role: 'belt', pixels: [
      ...rect(2, 4, 5, 11),
    ]},
    // Wrapper fold — crinkled edge
    { name: 'wrapper_fold', role: 'accessory', pixels: [
      [2,3], [3,3], [4,3], [5,3],
      [2,12], [3,12], [4,12], [5,12],
    ]},
    // Chocolate body — exposed brown squares
    { name: 'chocolate', role: 'body', pixels: [
      ...rect(6, 4, 13, 11),
    ]},
    // Square grid lines — molded divisions
    { name: 'grid_lines', role: 'boot', pixels: [
      ...vLine(8, 4, 11),
      ...vLine(11, 4, 11),
      ...hLine(6, 6, 13),
      ...hLine(9, 6, 13),
    ]},
    // Chocolate highlight — sheen on surface
    { name: 'highlight', role: 'eye', pixels: [
      [7,4], [7,5],
      [10,4], [10,5],
    ]},
    // Wrapper highlight — foil shine
    { name: 'foil_shine', role: 'head', pixels: [
      [3,5], [4,5],
      [3,6],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// COCONUT — Split coconut showing white interior.
// ════════════════════════════════════════════════════════════
export const COCONUT_16: SpriteTemplate = {
  name: 'coconut_16', width: 16, height: 16,
  description: 'Split coconut half showing white flesh interior and brown hairy shell.',
  regions: [
    // Shell exterior — brown hairy outer shell
    { name: 'shell', role: 'body', pixels: [
      ...hLine(4, 5, 10),
      [4,5], ...hLine(5, 4, 11),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      [3,8], [4,8], [11,8], [12,8],
    ]},
    // White flesh interior — exposed coconut meat
    { name: 'flesh', role: 'head', pixels: [
      ...hLine(8, 5, 10),
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
      ...hLine(12, 6, 9),
    ]},
    // Coconut water — dark center pool
    { name: 'water', role: 'belt', pixels: [
      [7,9], [8,9],
      [6,10], [7,10], [8,10], [9,10],
      [7,11], [8,11],
    ]},
    // Shell texture — rough hairy bits
    { name: 'shell_hair', role: 'accessory', pixels: [
      [5,4], [8,4], [10,4],
      [4,6], [7,6], [10,6],
      [5,7], [8,7],
    ]},
    // Highlight — shine on white flesh
    { name: 'highlight', role: 'eye', pixels: [
      [5,8], [6,8],
      [5,9],
    ]},
    // Shadow base
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(13, 6, 9),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// LASAGNA — Layered pasta dish in a baking tray.
// ════════════════════════════════════════════════════════════
export const LASAGNA_16: SpriteTemplate = {
  name: 'lasagna_16', width: 16, height: 16,
  description: 'Lasagna slice showing layers of pasta, meat sauce, and melted cheese on top.',
  regions: [
    // Melted cheese top — bubbly golden surface
    { name: 'cheese_top', role: 'head', pixels: [
      ...hLine(3, 4, 11),
      ...hLine(4, 3, 12),
      ...hLine(5, 3, 12),
    ]},
    // Cheese bubbles — highlight spots
    { name: 'bubbles', role: 'eye', pixels: [
      [5,3], [8,3], [11,3],
      [4,4], [7,4], [10,4],
    ]},
    // Pasta layers — alternating pasta sheets and sauce
    { name: 'pasta', role: 'body', pixels: [
      ...hLine(6, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(10, 3, 12),
    ]},
    // Sauce layers — red meat sauce between pasta
    { name: 'sauce', role: 'leg', pixels: [
      ...hLine(7, 3, 12),
      ...hLine(9, 3, 12),
    ]},
    // Tray sides — baking dish walls
    { name: 'tray', role: 'belt', pixels: [
      [2,4], [2,5], [2,6], [2,7], [2,8], [2,9], [2,10], [2,11],
      [13,4], [13,5], [13,6], [13,7], [13,8], [13,9], [13,10], [13,11],
      ...hLine(11, 3, 12),
    ]},
    // Tray base shadow
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(12, 3, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// LOLLIPOP — Round candy on a stick with swirl pattern.
// ════════════════════════════════════════════════════════════
export const LOLLIPOP_16: SpriteTemplate = {
  name: 'lollipop_16', width: 16, height: 16,
  description: 'Round lollipop candy with colorful swirl pattern on a white stick.',
  regions: [
    // Candy disc — round colorful head
    { name: 'candy', role: 'body', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 5, 10),
      ...hLine(8, 6, 9),
    ]},
    // Swirl pattern — spiral stripe on candy
    { name: 'swirl', role: 'leg', pixels: [
      [7,2], [9,2],
      [5,3], [8,3],
      [4,4], [7,4],
      [5,5], [9,5],
      [7,6], [10,6],
      [8,7], [6,7],
      [7,8],
    ]},
    // Candy highlight — shiny spot
    { name: 'highlight', role: 'eye', pixels: [
      [6,2], [6,3],
      [5,3],
    ]},
    // Stick — white vertical stick below candy
    { name: 'stick', role: 'head', pixels: [
      ...vLine(7, 9, 14),
    ]},
    // Stick shadow
    { name: 'stick_shadow', role: 'boot', pixels: [
      [8,9], [8,10], [8,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SPRING_ROLL — Crispy fried spring roll with dipping sauce.
// ════════════════════════════════════════════════════════════
export const SPRING_ROLL_16: SpriteTemplate = {
  name: 'spring_roll_16', width: 16, height: 16,
  description: 'Golden fried spring roll laid diagonally with a small dipping sauce bowl.',
  regions: [
    // Spring roll body — elongated golden cylinder
    { name: 'roll_body', role: 'body', pixels: [
      [3,4], [4,4],
      [3,5], [4,5], [5,5], [6,5],
      [4,6], [5,6], [6,6], [7,6],
      [5,7], [6,7], [7,7], [8,7],
      [6,8], [7,8], [8,8], [9,8],
      [7,9], [8,9], [9,9], [10,9],
      [8,10], [9,10], [10,10],
    ]},
    // Crispy texture — darker fry lines
    { name: 'crispy', role: 'head', pixels: [
      [3,5], [5,6], [7,7], [9,9],
    ]},
    // Filling visible at cut end — vegetables peeking
    { name: 'filling', role: 'arm', pixels: [
      [3,4], [4,4],
      [3,5],
    ]},
    // Highlight — fried shine
    { name: 'highlight', role: 'eye', pixels: [
      [4,5], [5,5],
      [6,7],
    ]},
    // Sauce bowl — small round bowl at bottom-right
    { name: 'sauce_bowl', role: 'belt', pixels: [
      ...hLine(10, 11, 13),
      [11,11], [12,11], [13,11],
      [11,12], [12,12], [13,12],
      ...hLine(13, 11, 13),
    ]},
    // Sauce — dark dipping sauce inside bowl
    { name: 'sauce', role: 'boot', pixels: [
      [12,11], [13,11],
      [12,12],
    ]},
    // Shadow under roll
    { name: 'shadow', role: 'accessory', pixels: [
      [9,10], [10,10],
      [9,11], [10,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// POMEGRANATE — Cut pomegranate showing ruby seeds inside.
// ════════════════════════════════════════════════════════════
export const POMEGRANATE_16: SpriteTemplate = {
  name: 'pomegranate_16', width: 16, height: 16,
  description: 'Cut pomegranate half revealing clusters of ruby-red seeds inside.',
  regions: [
    // Crown — small crown tip at top
    { name: 'crown', role: 'accessory', pixels: [
      [7,2], [8,2],
      [7,3],
    ]},
    // Rind exterior — thick pinkish-red skin
    { name: 'rind', role: 'body', pixels: [
      ...hLine(3, 6, 9),
      [5,4], [6,4], [9,4], [10,4],
      [4,5], [5,5], [10,5], [11,5],
      [4,6], [11,6],
      [4,7], [11,7],
      [4,8], [11,8],
      [4,9], [11,9],
      [5,10], [10,10],
      [5,11], [6,11], [9,11], [10,11],
      ...hLine(12, 6, 9),
    ]},
    // Seeds interior — small ruby dots in clusters
    { name: 'seeds', role: 'leg', pixels: [
      [7,4], [8,4],
      [6,5], [7,5], [8,5], [9,5],
      [5,6], [6,6], [7,6], [8,6], [9,6], [10,6],
      [5,7], [6,7], [7,7], [8,7], [9,7], [10,7],
      [5,8], [6,8], [7,8], [8,8], [9,8], [10,8],
      [5,9], [6,9], [7,9], [8,9], [9,9], [10,9],
      [6,10], [7,10], [8,10], [9,10],
      [7,11], [8,11],
    ]},
    // Seed highlights — bright spots on individual seeds
    { name: 'seed_highlight', role: 'eye', pixels: [
      [6,5], [8,5],
      [5,7], [7,7], [9,7],
      [6,9], [8,9],
    ]},
    // Membrane lines — white dividers between seed clusters
    { name: 'membrane', role: 'head', pixels: [
      [7,5], [8,6],
      [7,8], [8,7],
      [7,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// MACARON — French macaron cookie with cream filling.
// ════════════════════════════════════════════════════════════
export const MACARON_16: SpriteTemplate = {
  name: 'macaron_16', width: 16, height: 16,
  description: 'French macaron with smooth domed top, ruffled foot, and cream filling.',
  regions: [
    // Top shell — smooth domed top half
    { name: 'top_shell', role: 'body', pixels: [
      ...hLine(4, 6, 9),
      ...hLine(5, 5, 10),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
    ]},
    // Top highlight — smooth sheen
    { name: 'highlight', role: 'eye', pixels: [
      [6,4], [7,4],
      [5,5], [6,5],
    ]},
    // Ruffle foot — textured rim where shells meet filling
    { name: 'ruffle', role: 'head', pixels: [
      [3,8], [4,8], [5,8], [6,8], [7,8], [8,8], [9,8], [10,8], [11,8], [12,8],
    ]},
    // Cream filling — visible cream layer between shells
    { name: 'filling', role: 'accessory', pixels: [
      ...hLine(9, 4, 11),
    ]},
    // Bottom shell — smooth domed bottom half
    { name: 'bottom_shell', role: 'belt', pixels: [
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
      ...hLine(12, 6, 9),
    ]},
    // Shadow underneath
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(13, 6, 9),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// ENERGY_DRINK — Tall slim can with lightning bolt design.
// ════════════════════════════════════════════════════════════
export const ENERGY_DRINK_16: SpriteTemplate = {
  name: 'energy_drink_16', width: 16, height: 16,
  description: 'Tall slim energy drink can with a lightning bolt logo and metallic finish.',
  regions: [
    // Pull tab — small tab on top
    { name: 'pull_tab', role: 'accessory', pixels: [
      [8,1], [9,1],
    ]},
    // Lid — metallic top
    { name: 'lid', role: 'head', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 6, 9),
    ]},
    // Can body upper — dark background
    { name: 'can_upper', role: 'body', pixels: [
      ...rect(6, 4, 9, 7),
    ]},
    // Lightning bolt logo — bright design element
    { name: 'lightning', role: 'eye', pixels: [
      [8,4], [7,5], [8,5], [7,6], [6,7],
    ]},
    // Can body lower — contrasting color section
    { name: 'can_lower', role: 'belt', pixels: [
      ...rect(6, 8, 9, 11),
    ]},
    // Base — metallic bottom rim
    { name: 'base', role: 'boot', pixels: [
      ...hLine(12, 6, 9),
    ]},
    // Can highlight — metallic reflection stripe
    { name: 'can_shine', role: 'leg', pixels: [
      ...vLine(6, 4, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// DIM_SUM — Bamboo steamer basket with dumplings inside.
// ════════════════════════════════════════════════════════════
export const DIM_SUM_16: SpriteTemplate = {
  name: 'dim_sum_16', width: 16, height: 16,
  description: 'Round bamboo steamer basket with lid slightly open and dumplings visible inside.',
  regions: [
    // Steamer lid handle — knob on top
    { name: 'lid_handle', role: 'accessory', pixels: [
      [7,1], [8,1],
    ]},
    // Steamer lid — rounded bamboo lid
    { name: 'lid', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 3, 12),
      ...hLine(5, 3, 12),
    ]},
    // Lid weave texture — horizontal bamboo lines
    { name: 'lid_weave', role: 'arm', pixels: [
      [5,3], [7,3], [9,3], [11,3],
      [4,4], [6,4], [8,4], [10,4], [12,4],
    ]},
    // Steam wisps — small clouds escaping from gap
    { name: 'steam', role: 'eye', pixels: [
      [3,4], [13,4],
      [2,5], [14,5],
    ]},
    // Basket body — round bamboo container
    { name: 'basket', role: 'body', pixels: [
      [2,6], [3,6], [12,6], [13,6],
      [2,7], [13,7],
      [2,8], [13,8],
      [2,9], [13,9],
      [3,10], [12,10],
      ...hLine(10, 4, 11),
    ]},
    // Dumplings visible — white rounds inside basket
    { name: 'dumplings', role: 'belt', pixels: [
      [4,6], [5,6], [6,6], [7,6],
      [4,7], [5,7], [6,7], [7,7],
      [8,6], [9,6], [10,6], [11,6],
      [8,7], [9,7], [10,7], [11,7],
      [5,8], [6,8], [7,8], [8,8], [9,8], [10,8],
      [6,9], [7,9], [8,9], [9,9],
    ]},
    // Basket weave — horizontal texture lines on sides
    { name: 'basket_weave', role: 'boot', pixels: [
      [3,7], [3,9],
      [12,7], [12,9],
    ]},
    // Basket base shadow
    { name: 'base_shadow', role: 'hair', pixels: [
      ...hLine(11, 4, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// COLOR SCHEMES
// ════════════════════════════════════════════════════════════

export const STEAK_COLORS = scheme('steak_default', {
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },     // Cooked meat brown
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },     // Charred grill marks
  eye:       { shadow: '#d27d2c', base: '#d2aa99',  highlight: '#deeed6' },     // Sizzle shine
  head:      { shadow: '#d27d2c', base: '#d2aa99',  highlight: '#deeed6' },     // Fat marbling light
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },     // Herb garnish
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },     // Shadow
});

export const SALAD_COLORS = scheme('salad_default', {
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },     // Green leafy greens
  leg:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },     // Red tomato
  eye:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },     // Yellow dressing
  head:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },     // Ceramic rim
  body:      { shadow: '#8595a1', base: '#d2aa99',  highlight: '#deeed6' },     // White ceramic bowl
  boot:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },     // Shadow
});

export const SANDWICH_COLORS = scheme('sandwich_default', {
  head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },     // Top bread golden
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },     // Lettuce green
  accessory: { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },     // Cheese yellow
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },     // Meat brown
  belt:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },     // Bottom bread
  eye:       { shadow: '#dad45e', base: '#deeed6',  highlight: '#deeed6' },     // Bread highlight
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },     // Shadow
});

export const ICE_CREAM_SUNDAE_COLORS = scheme('ice_cream_sundae_default', {
  leg:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },     // Red cherry
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },     // Green stem
  eye:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },     // White whipped cream
  head:      { shadow: '#d04648', base: '#d2aa99',  highlight: '#deeed6' },     // Pink/cream scoops
  body:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },     // Glass vessel blue-clear
  boot:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },     // Glass base
  accessory: { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },     // Glass shine
});

export const FRIED_EGG_COLORS = scheme('fried_egg_default', {
  body:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },     // White egg white
  head:      { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },     // Yellow yolk
  eye:       { shadow: '#dad45e', base: '#deeed6',  highlight: '#deeed6' },     // Yolk highlight
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },     // Crispy brown edges
  boot:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },     // Shadow
});

export const CORN_COLORS = scheme('corn_default', {
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },     // Green husk leaves
  head:      { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },     // Yellow kernels
  body:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },     // Kernel row dividers
  eye:       { shadow: '#dad45e', base: '#deeed6',  highlight: '#deeed6' },     // Kernel highlight
  boot:      { shadow: '#854c30', base: '#854c30',  highlight: '#d27d2c' },     // Darker shadow side
});

export const PINEAPPLE_COLORS = scheme('pineapple_default', {
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },     // Green crown leaves
  head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },     // Orange-yellow body
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },     // Diamond texture dark
  eye:       { shadow: '#dad45e', base: '#deeed6',  highlight: '#deeed6' },     // Highlight shine
  boot:      { shadow: '#442434', base: '#854c30',  highlight: '#854c30' },     // Bottom shadow
});

export const CHERRY_COLORS = scheme('cherry_default', {
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },     // Green leaf
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },     // Green stems
  body:      { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },     // Red cherry fruit
  eye:       { shadow: '#d04648', base: '#d2aa99',  highlight: '#deeed6' },     // Shine highlights
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#442434' },     // Dark shadow
});

export const HOT_DOG_COLORS = scheme('hot_dog_default', {
  accessory: { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },     // Mustard yellow
  head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },     // Top bun golden
  leg:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },     // Red sausage
  body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#dad45e' },     // Bottom bun light
  eye:       { shadow: '#dad45e', base: '#deeed6',  highlight: '#deeed6' },     // Bun highlight
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },     // Shadow
});

export const MOCHI_COLORS = scheme('mochi_default', {
  body:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },     // White rice skin
  leg:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },     // Red bean filling
  eye:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },     // Starch dust white
  accessory: { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },     // Pure white highlight
  boot:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },     // Plate shadow
});

export const KEBAB_COLORS = scheme('kebab_default', {
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },     // Wooden skewer
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },     // Meat chunks brown
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },     // Green pepper/onion
  leg:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },     // Red tomato chunk
  eye:       { shadow: '#d27d2c', base: '#d2aa99',  highlight: '#deeed6' },     // Meat highlight
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },     // Char marks
});

export const CHOCOLATE_BAR_COLORS = scheme('chocolate_bar_default', {
  belt:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },     // Blue/purple foil wrapper
  accessory: { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },     // Wrapper fold edges
  body:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },     // Dark chocolate
  boot:      { shadow: '#140c1c', base: '#140c1c',  highlight: '#442434' },     // Grid line grooves
  eye:       { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },     // Chocolate sheen
  head:      { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },     // Foil shine
});

export const COCONUT_COLORS = scheme('coconut_default', {
  body:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },     // Brown shell exterior
  head:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },     // White flesh interior
  belt:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },     // Coconut water pale blue
  accessory: { shadow: '#442434', base: '#442434',  highlight: '#854c30' },     // Shell hair texture
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },     // Flesh highlight
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },     // Base shadow
});

export const LASAGNA_COLORS = scheme('lasagna_default', {
  head:      { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },     // Melted cheese golden
  eye:       { shadow: '#dad45e', base: '#deeed6',  highlight: '#deeed6' },     // Cheese bubble highlights
  body:      { shadow: '#d27d2c', base: '#d2aa99',  highlight: '#deeed6' },     // Pasta sheets pale
  leg:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },     // Red meat sauce
  belt:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },     // Tray metal/ceramic
  boot:      { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },     // Tray base shadow
});

export const LOLLIPOP_COLORS = scheme('lollipop_default', {
  body:      { shadow: '#442434', base: '#d04648',  highlight: '#d2aa99' },     // Red candy base
  leg:       { shadow: '#d27d2c', base: '#dad45e',  highlight: '#deeed6' },     // Yellow swirl stripe
  eye:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },     // Candy highlight
  head:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },     // White stick
  boot:      { shadow: '#8595a1', base: '#d2aa99',  highlight: '#deeed6' },     // Stick shadow
});

export const SPRING_ROLL_COLORS = scheme('spring_roll_default', {
  body:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },     // Golden fried wrapper
  head:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },     // Crispy darker bits
  arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },     // Green filling
  eye:       { shadow: '#dad45e', base: '#deeed6',  highlight: '#deeed6' },     // Fried shine
  belt:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },     // Ceramic sauce bowl
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },     // Dark dipping sauce
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },     // Shadow under roll
});

export const POMEGRANATE_COLORS = scheme('pomegranate_default', {
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },     // Crown tip tan
  body:      { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },     // Red rind exterior
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#d04648' },     // Ruby red seeds
  eye:       { shadow: '#d04648', base: '#d2aa99',  highlight: '#deeed6' },     // Bright seed highlights
  head:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },     // White membrane
});

export const MACARON_COLORS = scheme('macaron_default', {
  body:      { shadow: '#d04648', base: '#d2aa99',  highlight: '#deeed6' },     // Pastel pink shell
  eye:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },     // Smooth highlight
  head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },     // Ruffled foot
  accessory: { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },     // White cream filling
  belt:      { shadow: '#d04648', base: '#d04648',  highlight: '#d2aa99' },     // Bottom shell deeper
  boot:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },     // Shadow
});

export const ENERGY_DRINK_COLORS = scheme('energy_drink_default', {
  accessory: { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },     // Silver pull tab
  head:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },     // Silver lid
  body:      { shadow: '#140c1c', base: '#30346d',  highlight: '#4e4a4e' },     // Dark blue/black can
  eye:       { shadow: '#dad45e', base: '#deeed6',  highlight: '#deeed6' },     // Lightning bolt yellow
  belt:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },     // Green lower section
  boot:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },     // Metallic base rim
  leg:       { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },     // Highlight reflection
});

export const DIM_SUM_COLORS = scheme('dim_sum_default', {
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },     // Bamboo lid handle
  head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },     // Bamboo lid body
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },     // Lid weave texture
  eye:       { shadow: '#8595a1', base: '#deeed6',  highlight: '#deeed6' },     // Steam wisps
  body:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#d2aa99' },     // Bamboo basket walls
  belt:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },     // White dumplings
  boot:      { shadow: '#442434', base: '#854c30',  highlight: '#854c30' },     // Basket weave details
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },     // Base shadow
});

// ════════════════════════════════════════════════════════════
// EXPORT RECORDS
// ════════════════════════════════════════════════════════════

export const FOOD_BATCH3_TEMPLATES: Record<string, SpriteTemplate> = {
  steak_16:              STEAK_16,
  salad_16:              SALAD_16,
  sandwich_16:           SANDWICH_16,
  ice_cream_sundae_16:   ICE_CREAM_SUNDAE_16,
  fried_egg_16:          FRIED_EGG_16,
  corn_16:               CORN_16,
  pineapple_16:          PINEAPPLE_16,
  cherry_16:             CHERRY_16,
  hot_dog_16:            HOT_DOG_16,
  mochi_16:              MOCHI_16,
  kebab_16:              KEBAB_16,
  chocolate_bar_16:      CHOCOLATE_BAR_16,
  coconut_16:            COCONUT_16,
  lasagna_16:            LASAGNA_16,
  lollipop_16:           LOLLIPOP_16,
  spring_roll_16:        SPRING_ROLL_16,
  pomegranate_16:        POMEGRANATE_16,
  macaron_16:            MACARON_16,
  energy_drink_16:       ENERGY_DRINK_16,
  dim_sum_16:            DIM_SUM_16,
};

export const FOOD_BATCH3_COLOR_SCHEMES: Record<string, ColorScheme> = {
  steak_default:              STEAK_COLORS,
  salad_default:              SALAD_COLORS,
  sandwich_default:           SANDWICH_COLORS,
  ice_cream_sundae_default:   ICE_CREAM_SUNDAE_COLORS,
  fried_egg_default:          FRIED_EGG_COLORS,
  corn_default:               CORN_COLORS,
  pineapple_default:          PINEAPPLE_COLORS,
  cherry_default:             CHERRY_COLORS,
  hot_dog_default:            HOT_DOG_COLORS,
  mochi_default:              MOCHI_COLORS,
  kebab_default:              KEBAB_COLORS,
  chocolate_bar_default:      CHOCOLATE_BAR_COLORS,
  coconut_default:            COCONUT_COLORS,
  lasagna_default:            LASAGNA_COLORS,
  lollipop_default:           LOLLIPOP_COLORS,
  spring_roll_default:        SPRING_ROLL_COLORS,
  pomegranate_default:        POMEGRANATE_COLORS,
  macaron_default:            MACARON_COLORS,
  energy_drink_default:       ENERGY_DRINK_COLORS,
  dim_sum_default:            DIM_SUM_COLORS,
};
