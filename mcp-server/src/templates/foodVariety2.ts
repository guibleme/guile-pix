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

const FOOD2_BASE = {
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

function scheme(name: string, overrides: Partial<typeof FOOD2_BASE>): ColorScheme {
  return { name, mapping: { ...FOOD2_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// RAMEN_BOWL — Japanese ramen with noodles and egg, chopsticks.
// ════════════════════════════════════════════════════════════
export const RAMEN_BOWL_16: SpriteTemplate = {
  name: 'ramen_bowl_16', width: 16, height: 16,
  description: 'Japanese ramen bowl with noodles, soft-boiled egg, and chopsticks.',
  regions: [
    // Chopsticks — two diagonal sticks sticking out above bowl
    { name: 'chopsticks', role: 'accessory', pixels: [
      [4,1], [5,2], [3,2], [4,3], [2,3],
      [11,1], [12,2], [10,2], [11,3], [9,3],
    ]},
    // Bowl rim — wide ellipse top
    { name: 'rim', role: 'head', pixels: [
      ...hLine(4, 3, 12),
      [2,5], [3,5], [12,5], [13,5],
    ]},
    // Broth surface — orange-brown base inside rim
    { name: 'broth', role: 'body', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
    ]},
    // Noodles — wavy lines across broth
    { name: 'noodles', role: 'belt', pixels: [
      [4,6], [5,6], [7,6], [8,6], [10,6], [11,6],
      [3,7], [5,7], [6,7], [8,7], [9,7], [11,7],
    ]},
    // Egg — small half-circle on right side
    { name: 'egg', role: 'eye', pixels: [
      [9,5], [10,5],
      [9,6], [10,6],
    ]},
    // Bowl body — wide rounded sides
    { name: 'bowl_body', role: 'hair', pixels: [
      [2,6], [2,7], [2,8], [2,9],
      [13,6], [13,7], [13,8], [13,9],
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
    ]},
    // Bowl base — narrow curved bottom
    { name: 'bowl_base', role: 'boot', pixels: [
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
      ...hLine(12, 6, 9),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// COFFEE_CUP — Hot coffee mug with handle and steam lines.
// ════════════════════════════════════════════════════════════
export const COFFEE_CUP_16: SpriteTemplate = {
  name: 'coffee_cup_16', width: 16, height: 16,
  description: 'Hot coffee mug with handle and rising steam curls.',
  regions: [
    // Steam — two wavy lines above cup
    { name: 'steam', role: 'eye', pixels: [
      [5,1], [6,2], [5,3],
      [9,1], [10,2], [9,3],
    ]},
    // Mug rim
    { name: 'rim', role: 'head', pixels: [
      ...hLine(4, 3, 12),
    ]},
    // Coffee surface inside
    { name: 'coffee', role: 'hair', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
    ]},
    // Mug body
    { name: 'mug_body', role: 'body', pixels: [
      ...vLine(3, 5, 12),
      ...vLine(12, 5, 12),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
      ...hLine(11, 4, 11),
    ]},
    // Handle — C-shape on right side
    { name: 'handle', role: 'accessory', pixels: [
      [13,6], [14,6],
      [14,7], [14,8],
      [13,9], [14,9],
    ]},
    // Mug bottom
    { name: 'mug_bottom', role: 'boot', pixels: [
      ...hLine(12, 3, 12),
    ]},
    // Saucer
    { name: 'saucer', role: 'belt', pixels: [
      ...hLine(13, 2, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// PIZZA_SLICE — Triangular pizza slice with sauce, cheese, toppings.
// ════════════════════════════════════════════════════════════
export const PIZZA_SLICE_16: SpriteTemplate = {
  name: 'pizza_slice_16', width: 16, height: 16,
  description: 'Triangular pizza slice with tomato sauce, melted cheese and pepperoni.',
  regions: [
    // Crust (thick back edge of triangle)
    { name: 'crust', role: 'head', pixels: [
      ...hLine(2, 3, 12),
      ...hLine(3, 3, 12),
    ]},
    // Cheese — large golden triangle body
    { name: 'cheese', role: 'body', pixels: [
      ...hLine(4, 4, 11),
      ...hLine(5, 5, 10),
      ...hLine(6, 5, 10),
      ...hLine(7, 6, 9),
      ...hLine(8, 6, 9),
      ...hLine(9, 7, 8),
      ...hLine(10, 7, 8),
    ]},
    // Tomato sauce peeking at edges
    { name: 'sauce', role: 'leg', pixels: [
      [4,4], [11,4],
      [5,5], [10,5],
    ]},
    // Pepperoni rounds
    { name: 'pepperoni', role: 'accessory', pixels: [
      [6,4], [7,4],
      [9,5], [10,5],
      [7,7], [8,7],
    ]},
    // Tip highlight
    { name: 'tip_shine', role: 'eye', pixels: [
      [7,10], [8,10],
    ]},
    // Triangle tip
    { name: 'tip', role: 'belt', pixels: [
      [7,11], [8,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SUSHI_ROLL — Maki sushi piece, circular cross-section with nori.
// ════════════════════════════════════════════════════════════
export const SUSHI_ROLL_16: SpriteTemplate = {
  name: 'sushi_roll_16', width: 16, height: 16,
  description: 'Maki sushi roll cross-section with nori wrapper, rice and filling.',
  regions: [
    // Nori outer ring (dark seaweed wrap)
    { name: 'nori', role: 'boot', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      [3,5], [3,6], [3,7], [3,8], [3,9], [3,10],
      [12,5], [12,6], [12,7], [12,8], [12,9], [12,10],
      ...hLine(11, 4, 11),
      ...hLine(12, 5, 10),
    ]},
    // Rice ring (white band inside nori)
    { name: 'rice', role: 'eye', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 4, 11),
      [4,6], [4,7], [4,8], [4,9], [4,10],
      [11,6], [11,7], [11,8], [11,9], [11,10],
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
    ]},
    // Filling center (tuna/salmon)
    { name: 'filling', role: 'leg', pixels: [
      ...hLine(6, 6, 9),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
      ...hLine(9, 6, 9),
    ]},
    // Center highlight
    { name: 'highlight', role: 'accessory', pixels: [
      [7,7], [8,7],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// TACO — Mexican taco with folded shell and colorful fillings.
// ════════════════════════════════════════════════════════════
export const TACO_16: SpriteTemplate = {
  name: 'taco_16', width: 16, height: 16,
  description: 'Mexican taco with crispy folded shell, meat, lettuce and tomato.',
  regions: [
    // Shell — large U-shape / taco fold
    { name: 'shell', role: 'head', pixels: [
      ...hLine(4, 3, 12),
      [3,5], [12,5],
      [3,6], [12,6],
      [3,7], [12,7],
      [3,8], [12,8],
      [3,9], [4,9], [11,9], [12,9],
      [4,10], [5,10], [10,10], [11,10],
      [5,11], [6,11], [9,11], [10,11],
      [6,12], [7,12], [8,12], [9,12],
    ]},
    // Meat filling (brown center)
    { name: 'meat', role: 'body', pixels: [
      ...hLine(5, 6, 9),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
    ]},
    // Lettuce (green, top of filling)
    { name: 'lettuce', role: 'arm', pixels: [
      [5,4], [6,4], [7,4], [8,4], [9,4], [10,4],
    ]},
    // Tomato chunks
    { name: 'tomato', role: 'leg', pixels: [
      [6,5], [9,5],
      [7,8], [8,8],
    ]},
    // Shell shadow/depth
    { name: 'shell_shadow', role: 'boot', pixels: [
      [4,5], [11,5],
      [4,6], [11,6],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// CROISSANT — French crescent pastry, layered golden exterior.
// ════════════════════════════════════════════════════════════
export const CROISSANT_16: SpriteTemplate = {
  name: 'croissant_16', width: 16, height: 16,
  description: 'French croissant with curved crescent shape and flaky layered crust.',
  regions: [
    // Left horn
    { name: 'left_horn', role: 'head', pixels: [
      [2,5], [3,5],
      [1,6], [2,6], [3,6], [4,6],
      [1,7], [2,7], [3,7], [4,7],
      [2,8], [3,8], [4,8],
      [3,9], [4,9], [5,9],
    ]},
    // Right horn
    { name: 'right_horn', role: 'head', pixels: [
      [12,5], [13,5],
      [11,6], [12,6], [13,6], [14,6],
      [11,7], [12,7], [13,7], [14,7],
      [11,8], [12,8], [13,8],
      [10,9], [11,9], [12,9],
    ]},
    // Center body (main arc)
    { name: 'body', role: 'body', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 5, 10),
      ...hLine(8, 6, 9),
    ]},
    // Layer highlights (flaky lines)
    { name: 'layers', role: 'accessory', pixels: [
      [6,4], [7,4], [9,4], [10,4],
      [5,5], [10,5],
      [6,7], [9,7],
    ]},
    // Golden crust highlight
    { name: 'crust_shine', role: 'eye', pixels: [
      [7,5], [8,5],
    ]},
    // Shadow underside
    { name: 'shadow', role: 'boot', pixels: [
      [5,8], [6,8], [7,8], [8,8], [9,8], [10,8],
      [6,9], [7,9], [8,9], [9,9],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// ICE_CREAM_CONE — Waffle cone with two scoops, small highlight.
// ════════════════════════════════════════════════════════════
export const ICE_CREAM_CONE_16: SpriteTemplate = {
  name: 'ice_cream_cone_16', width: 16, height: 16,
  description: 'Waffle cone with two ice cream scoops and a highlight dot.',
  regions: [
    // Top scoop
    { name: 'scoop_top', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 4, 11),
    ]},
    // Bottom scoop
    { name: 'scoop_bottom', role: 'body', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
    ]},
    // Scoop highlight
    { name: 'highlight', role: 'eye', pixels: [
      [7,2], [8,2],
      [7,3],
    ]},
    // Cone upper rim
    { name: 'cone_rim', role: 'accessory', pixels: [
      ...hLine(8, 4, 11),
    ]},
    // Cone body with waffle grid
    { name: 'cone_body', role: 'hair', pixels: [
      [5,9], [6,9], [7,9], [8,9], [9,9], [10,9],
      [5,10], [7,10], [9,10],
      [6,10], [8,10], [10,10],
      [6,11], [7,11], [8,11], [9,11],
      [6,12], [8,12],
      [7,12], [9,12],
      [7,13], [8,13],
    ]},
    // Cone tip
    { name: 'cone_tip', role: 'boot', pixels: [
      [7,14], [8,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// HAMBURGER — Stacked burger: bun, patty, lettuce, tomato, cheese.
// ════════════════════════════════════════════════════════════
export const HAMBURGER_16: SpriteTemplate = {
  name: 'hamburger_16', width: 16, height: 16,
  description: 'Classic hamburger with sesame bun, patty, lettuce, cheese and tomato.',
  regions: [
    // Top bun (dome shape)
    { name: 'bun_top', role: 'head', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 4, 11),
      ...hLine(4, 3, 12),
      ...hLine(5, 3, 12),
    ]},
    // Sesame seeds on bun
    { name: 'seeds', role: 'eye', pixels: [
      [6,3], [9,3],
      [7,4], [10,4],
    ]},
    // Lettuce (jagged green layer)
    { name: 'lettuce', role: 'arm', pixels: [
      ...hLine(6, 3, 12),
    ]},
    // Cheese slice
    { name: 'cheese', role: 'accessory', pixels: [
      ...hLine(7, 3, 12),
    ]},
    // Tomato
    { name: 'tomato', role: 'leg', pixels: [
      ...hLine(8, 4, 11),
    ]},
    // Patty
    { name: 'patty', role: 'body', pixels: [
      ...hLine(9, 3, 12),
      ...hLine(10, 3, 12),
    ]},
    // Bottom bun
    { name: 'bun_bottom', role: 'belt', pixels: [
      ...hLine(11, 3, 12),
      ...hLine(12, 4, 11),
      ...hLine(13, 5, 10),
    ]},
    // Shadow under bun
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(14, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// CUPCAKE — Decorated cupcake with swirled frosting and sprinkles.
// ════════════════════════════════════════════════════════════
export const CUPCAKE_16: SpriteTemplate = {
  name: 'cupcake_16', width: 16, height: 16,
  description: 'Cupcake with swirled frosting, a cherry on top, and colorful sprinkles.',
  regions: [
    // Cherry
    { name: 'cherry', role: 'leg', pixels: [
      [7,1], [8,1],
    ]},
    // Cherry stem
    { name: 'cherry_stem', role: 'arm', pixels: [
      [7,2],
    ]},
    // Frosting swirl (top dome)
    { name: 'frosting', role: 'head', pixels: [
      ...hLine(3, 6, 9),
      ...hLine(4, 5, 10),
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      [5,7], [6,7], [7,7], [8,7], [9,7], [10,7],
    ]},
    // Frosting highlight
    { name: 'frosting_shine', role: 'eye', pixels: [
      [7,4], [8,4],
      [6,5],
    ]},
    // Sprinkles
    { name: 'sprinkles', role: 'accessory', pixels: [
      [6,4], [10,5],
      [5,6], [11,6],
      [6,6], [10,6],
    ]},
    // Cupcake liner
    { name: 'liner', role: 'body', pixels: [
      ...hLine(8, 4, 11),
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
    ]},
    // Liner ridges / pattern
    { name: 'liner_ridges', role: 'belt', pixels: [
      [5,8], [7,8], [9,8], [11,8],
      [5,9], [7,9], [9,9], [11,9],
    ]},
    // Liner base
    { name: 'liner_base', role: 'boot', pixels: [
      ...hLine(11, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// TEA_POT — Decorative ceramic teapot with spout and handle.
// ════════════════════════════════════════════════════════════
export const TEA_POT_16: SpriteTemplate = {
  name: 'tea_pot_16', width: 16, height: 16,
  description: 'Ceramic teapot with curved spout, handle, lid knob and decorative band.',
  regions: [
    // Lid knob
    { name: 'knob', role: 'accessory', pixels: [
      [7,2], [8,2],
    ]},
    // Lid
    { name: 'lid', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
    ]},
    // Spout — curves left and outward
    { name: 'spout', role: 'arm', pixels: [
      [2,7], [3,7],
      [1,8], [2,8],
      [1,9],
    ]},
    // Pot body — rounded oval
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 11),
    ]},
    // Decorative band
    { name: 'band', role: 'belt', pixels: [
      ...hLine(7, 4, 11),
    ]},
    // Handle — curves right
    { name: 'handle', role: 'hair', pixels: [
      [13,6], [14,6],
      [14,7], [14,8],
      [13,9], [14,9],
    ]},
    // Body highlight
    { name: 'highlight', role: 'eye', pixels: [
      [5,5], [6,5],
    ]},
    // Base
    { name: 'base', role: 'boot', pixels: [
      ...hLine(10, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// BAGUETTE — Long French baguette bread, diagonal layout.
// ════════════════════════════════════════════════════════════
export const BAGUETTE_16: SpriteTemplate = {
  name: 'baguette_16', width: 16, height: 16,
  description: 'Long French baguette lying diagonally with score cuts on the crust.',
  regions: [
    // Crust top edge
    { name: 'crust_top', role: 'head', pixels: [
      [2,3], [3,3],
      [3,4], [4,4], [5,4],
      [4,5], [5,5], [6,5], [7,5],
      [6,6], [7,6], [8,6], [9,6],
      [8,7], [9,7], [10,7], [11,7],
      [10,8], [11,8], [12,8], [13,8],
      [12,9], [13,9],
    ]},
    // Bread interior (golden crumb)
    { name: 'crumb', role: 'body', pixels: [
      [3,5], [4,6], [5,7], [6,8], [7,9], [8,10], [9,11], [10,12],
      [2,4], [3,5], [4,6], [5,7], [6,8], [7,9], [8,10], [9,11],
      [4,5], [5,6], [6,7], [7,8], [8,9], [9,10], [10,11], [11,12],
      [5,5], [6,6], [7,7], [8,8], [9,9], [10,10], [11,11], [12,12],
    ]},
    // Score cuts (diagonal slashes)
    { name: 'scores', role: 'accessory', pixels: [
      [5,4], [4,5],
      [7,6], [6,7],
      [9,8], [8,9],
      [11,10], [10,11],
    ]},
    // Crust bottom edge
    { name: 'crust_bottom', role: 'boot', pixels: [
      [2,5], [3,6],
      [3,7], [4,7],
      [5,8], [6,9],
      [7,10], [8,11],
      [9,12], [10,13],
      [11,13], [12,13],
      [13,12], [13,11],
    ]},
    // Highlight on top
    { name: 'shine', role: 'eye', pixels: [
      [4,4], [7,6], [10,8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// DUMPLING — Asian steamed dumpling (jiaozi) with pleated top.
// ════════════════════════════════════════════════════════════
export const DUMPLING_16: SpriteTemplate = {
  name: 'dumpling_16', width: 16, height: 16,
  description: 'Steamed Asian dumpling with pleated pinched top and round body.',
  regions: [
    // Pleated top (pinched folds)
    { name: 'pleats', role: 'head', pixels: [
      [6,3], [7,3], [8,3], [9,3],
      [5,4], [6,4], [8,4], [9,4], [10,4],
      [6,5], [7,5], [8,5], [9,5],
    ]},
    // Pleat detail lines
    { name: 'pleat_lines', role: 'accessory', pixels: [
      [7,4], [10,4],
    ]},
    // Dumpling body (round pouch)
    { name: 'body', role: 'body', pixels: [
      ...hLine(6, 4, 11),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 11),
    ]},
    // Body highlight
    { name: 'highlight', role: 'eye', pixels: [
      [6,6], [7,6],
      [5,7],
    ]},
    // Bottom shadow
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(10, 5, 10),
      [5,9], [10,9],
    ]},
    // Dipping sauce pool
    { name: 'sauce_shadow', role: 'belt', pixels: [
      ...hLine(11, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// PANCAKE_STACK — Stack of three pancakes with syrup dripping.
// ════════════════════════════════════════════════════════════
export const PANCAKE_STACK_16: SpriteTemplate = {
  name: 'pancake_stack_16', width: 16, height: 16,
  description: 'Stack of three fluffy pancakes with golden-brown edges and maple syrup drip.',
  regions: [
    // Syrup drip
    { name: 'syrup', role: 'accessory', pixels: [
      [10,3], [11,4], [11,5], [12,6], [12,7],
    ]},
    // Top pancake
    { name: 'pancake_top', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 11),
    ]},
    // Middle pancake
    { name: 'pancake_mid', role: 'body', pixels: [
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
    ]},
    // Bottom pancake
    { name: 'pancake_bot', role: 'hair', pixels: [
      ...hLine(9, 3, 12),
      ...hLine(10, 3, 12),
      ...hLine(11, 3, 12),
    ]},
    // Brown crispy edge highlights on each pancake
    { name: 'edges', role: 'eye', pixels: [
      [4,3], [11,3],
      [3,6], [12,6],
      [3,9], [12,9],
    ]},
    // Plate
    { name: 'plate', role: 'boot', pixels: [
      ...hLine(12, 3, 12),
      ...hLine(13, 4, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SODA_CAN — Aluminum soda can with pull tab and brand band.
// ════════════════════════════════════════════════════════════
export const SODA_CAN_16: SpriteTemplate = {
  name: 'soda_can_16', width: 16, height: 16,
  description: 'Aluminum soda can with lid, pull tab, and central color band.',
  regions: [
    // Pull tab
    { name: 'pull_tab', role: 'accessory', pixels: [
      [8,2], [9,2],
      [9,3], [10,3],
    ]},
    // Can top lid (ellipse rim)
    { name: 'lid', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
    ]},
    // Upper can body
    { name: 'can_top', role: 'face', pixels: [
      ...vLine(4, 5, 7),
      ...vLine(11, 5, 7),
      ...hLine(5, 5, 10),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
    ]},
    // Center color band
    { name: 'band', role: 'body', pixels: [
      ...hLine(8, 4, 11),
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
    ]},
    // Lower can body
    { name: 'can_bot', role: 'belt', pixels: [
      ...hLine(11, 5, 10),
      ...hLine(12, 5, 10),
    ]},
    // Can bottom rim
    { name: 'base', role: 'boot', pixels: [
      ...hLine(13, 4, 11),
      ...hLine(14, 5, 10),
    ]},
    // Highlight vertical strip
    { name: 'highlight', role: 'eye', pixels: [
      ...vLine(5, 5, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// POTION_BOTTLE — RPG flask with colored liquid, cork stopper.
// ════════════════════════════════════════════════════════════
export const POTION_BOTTLE_16: SpriteTemplate = {
  name: 'potion_bottle_16', width: 16, height: 16,
  description: 'RPG potion flask with red liquid, cork stopper, and glass shine.',
  regions: [
    // Cork stopper
    { name: 'cork', role: 'hair', pixels: [
      [7,2], [8,2],
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Bottle neck
    { name: 'neck', role: 'head', pixels: [
      [6,4], [7,4], [8,4], [9,4],
      [6,5], [7,5], [8,5], [9,5],
      [5,6], [6,6], [7,6], [8,6], [9,6], [10,6],
    ]},
    // Liquid fill (bright magic liquid)
    { name: 'liquid', role: 'leg', pixels: [
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 4, 11),
      ...hLine(10, 5, 10),
    ]},
    // Bottle body glass
    { name: 'bottle_body', role: 'body', pixels: [
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
    ]},
    // Glass shine
    { name: 'shine', role: 'eye', pixels: [
      [5,7], [6,7],
      [5,8],
    ]},
    // Bottle base
    { name: 'base', role: 'boot', pixels: [
      ...hLine(12, 5, 10),
    ]},
    // Liquid surface line
    { name: 'liquid_surface', role: 'accessory', pixels: [
      ...hLine(8, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// COOKIE — Round chocolate chip cookie with chips visible.
// ════════════════════════════════════════════════════════════
export const COOKIE_16: SpriteTemplate = {
  name: 'cookie_16', width: 16, height: 16,
  description: 'Round chocolate chip cookie with visible chips and golden baked surface.',
  regions: [
    // Cookie body (round disc)
    { name: 'cookie_body', role: 'body', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 11),
      ...hLine(10, 5, 10),
    ]},
    // Outer crust edge
    { name: 'crust', role: 'head', pixels: [
      [5,3], [10,3],
      [4,4], [11,4],
      [3,5], [12,5],
      [3,9], [12,9],
      [4,10], [11,10],
      [5,11], [10,11],
    ]},
    // Chocolate chips
    { name: 'chips', role: 'boot', pixels: [
      [6,4], [9,4],
      [5,6], [8,6], [11,6],
      [6,8], [9,8],
      [7,5], [10,7],
    ]},
    // Surface highlight (where it's slightly lighter/golden)
    { name: 'highlight', role: 'eye', pixels: [
      [6,5], [7,5],
      [5,7],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// ONIGIRI — Japanese rice ball with nori band, triangular shape.
// ════════════════════════════════════════════════════════════
export const ONIGIRI_16: SpriteTemplate = {
  name: 'onigiri_16', width: 16, height: 16,
  description: 'Japanese onigiri rice ball with triangular shape and dark nori band.',
  regions: [
    // Rice body (white triangle)
    { name: 'rice', role: 'eye', pixels: [
      ...hLine(2, 7, 8),
      ...hLine(3, 6, 9),
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
    ]},
    // Nori band (dark horizontal band across middle)
    { name: 'nori', role: 'boot', pixels: [
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
    ]},
    // Base (flat bottom edge)
    { name: 'base', role: 'body', pixels: [
      ...hLine(10, 3, 12),
      ...hLine(11, 4, 11),
    ]},
    // Rice texture dots
    { name: 'texture', role: 'accessory', pixels: [
      [6,5], [9,5],
      [5,8], [10,8],
    ]},
    // Shadow
    { name: 'shadow', role: 'hair', pixels: [
      ...hLine(12, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// WAFFLE — Belgian waffle with grid pattern and syrup.
// ════════════════════════════════════════════════════════════
export const WAFFLE_16: SpriteTemplate = {
  name: 'waffle_16', width: 16, height: 16,
  description: 'Belgian waffle with characteristic deep grid pattern and syrup gloss.',
  regions: [
    // Waffle outer body (rounded square)
    { name: 'waffle_body', role: 'body', pixels: [
      ...hLine(3, 3, 12),
      ...hLine(4, 2, 13),
      ...hLine(5, 2, 13),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
      ...hLine(12, 3, 12),
    ]},
    // Grid lines horizontal
    { name: 'grid_h', role: 'boot', pixels: [
      ...hLine(5, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(11, 3, 12),
    ]},
    // Grid lines vertical
    { name: 'grid_v', role: 'boot', pixels: [
      ...vLine(5, 3, 12),
      ...vLine(8, 3, 12),
      ...vLine(11, 3, 12),
    ]},
    // Syrup pools in squares
    { name: 'syrup', role: 'accessory', pixels: [
      [4,4], [5,4],
      [9,6], [10,6],
      [4,9], [5,9],
      [9,10], [10,10],
    ]},
    // Waffle highlight
    { name: 'highlight', role: 'eye', pixels: [
      [3,3], [4,3],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// BURRITO — Wrapped burrito with visible filling at both ends.
// ════════════════════════════════════════════════════════════
export const BURRITO_16: SpriteTemplate = {
  name: 'burrito_16', width: 16, height: 16,
  description: 'Wrapped flour tortilla burrito with folded ends and filling peeking out.',
  regions: [
    // Tortilla wrap body
    { name: 'wrap', role: 'body', pixels: [
      ...hLine(5, 2, 4),
      ...hLine(6, 2, 13),
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 4),
    ]},
    // Left sealed end
    { name: 'left_end', role: 'head', pixels: [
      [2,6], [2,7], [2,8], [2,9],
      [3,5], [3,10],
    ]},
    // Right sealed end
    { name: 'right_end', role: 'head', pixels: [
      [13,6], [13,7], [13,8], [13,9],
      [12,5], [12,10],
    ]},
    // Filling visible at top end
    { name: 'filling_top', role: 'accessory', pixels: [
      [3,6], [4,6],
      [3,7], [4,7],
    ]},
    // Filling visible at bottom end
    { name: 'filling_bot', role: 'leg', pixels: [
      [11,6], [12,6],
      [11,7], [12,7],
    ]},
    // Fold lines on wrap
    { name: 'fold_lines', role: 'arm', pixels: [
      ...vLine(5, 6, 9),
      ...vLine(10, 6, 9),
    ]},
    // Wrap highlight
    { name: 'highlight', role: 'eye', pixels: [
      [4,6], [5,6], [6,6], [7,6],
    ]},
    // Shadow underside
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(10, 3, 12),
      ...hLine(11, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// BUBBLE_TEA — Boba tea cup with dome lid, straw, and pearls.
// ════════════════════════════════════════════════════════════
export const BUBBLE_TEA_16: SpriteTemplate = {
  name: 'bubble_tea_16', width: 16, height: 16,
  description: 'Boba bubble tea cup with dome lid, fat straw, and tapioca pearls visible.',
  regions: [
    // Straw (sticking up above dome lid)
    { name: 'straw', role: 'accessory', pixels: [
      ...vLine(9, 1, 5),
    ]},
    // Dome lid
    { name: 'dome', role: 'head', pixels: [
      ...hLine(3, 6, 9),
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
    ]},
    // Cup body (tall trapezoid)
    { name: 'cup_body', role: 'body', pixels: [
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
      ...hLine(9, 5, 10),
      ...hLine(10, 6, 9),
    ]},
    // Tea liquid color (pastel tea inside cup)
    { name: 'tea', role: 'belt', pixels: [
      ...hLine(6, 6, 9),
      ...hLine(7, 6, 9),
      ...hLine(8, 6, 9),
    ]},
    // Tapioca pearls (dark circles at bottom)
    { name: 'pearls', role: 'boot', pixels: [
      [6,9], [7,9], [8,9], [9,9],
      [6,10], [8,10],
    ]},
    // Cup lower section (narrowing)
    { name: 'cup_base_body', role: 'hair', pixels: [
      ...hLine(11, 6, 9),
      ...hLine(12, 6, 9),
    ]},
    // Cup base
    { name: 'cup_base', role: 'leg', pixels: [
      ...hLine(13, 6, 9),
      ...hLine(14, 7, 8),
    ]},
    // Highlight on cup
    { name: 'highlight', role: 'eye', pixels: [
      [5,6], [5,7],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// COLOR SCHEMES
// ════════════════════════════════════════════════════════════

export const RAMEN_BOWL_COLORS = scheme('ramen_bowl_default', {
  head:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },     // Bowl rim ceramic
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Broth warm orange
  belt:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Noodles pale
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Egg yolk
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Bowl sides brown
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Bowl base shadow
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Chopsticks green
});

export const COFFEE_CUP_COLORS = scheme('coffee_cup_default', {
  head:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },     // Rim dark ceramic
  body:      { shadow: '#442434', base: '#757161', highlight: '#8595a1' },     // Mug grey ceramic
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Coffee dark brown
  eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },     // Steam white
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Handle
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Saucer
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Bottom shadow
});

export const PIZZA_SLICE_COLORS = scheme('pizza_slice_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Crust golden
  body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Cheese yellow
  leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Tomato sauce red
  accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Pepperoni red
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Tip shine
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Slice tip
});

export const SUSHI_ROLL_COLORS = scheme('sushi_roll_default', {
  boot:      { shadow: '#140c1c', base: '#346524', highlight: '#4e4a4e' },     // Nori dark green
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Rice white
  leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Tuna red filling
  accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Center highlight
});

export const TACO_COLORS = scheme('taco_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Shell golden-tan
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Meat brown
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Lettuce green
  leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Tomato red
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Shell depth
});

export const CROISSANT_COLORS = scheme('croissant_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Horn tips golden
  body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#dad45e' },     // Croissant body
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Layer highlights
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Shine
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Shadow underside
});

export const ICE_CREAM_CONE_COLORS = scheme('ice_cream_cone_default', {
  head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Top scoop light blue
  body:      { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' },     // Bottom scoop cream
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },     // Highlight white
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Cone rim
  hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Waffle cone body
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Cone tip
});

export const HAMBURGER_COLORS = scheme('hamburger_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Top bun golden
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Sesame seeds
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Lettuce green
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Cheese yellow
  leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Tomato red
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },     // Patty brown
  belt:      { shadow: '#854c30', base: '#d2aa99', highlight: '#dad45e' },     // Bottom bun
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Shadow
});

export const CUPCAKE_COLORS = scheme('cupcake_default', {
  leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Cherry red
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Stem green
  head:      { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' },     // Frosting pink-cream
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },     // Frosting shine
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Sprinkles colorful
  body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Liner yellow
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Liner ridges
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Base
});

export const TEA_POT_COLORS = scheme('tea_pot_default', {
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Knob gold
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Lid blue ceramic
  arm:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },     // Spout dark
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Pot body blue
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Decorative band orange
  hair:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },     // Handle
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Highlight
  boot:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },     // Base shadow
});

export const BAGUETTE_COLORS = scheme('baguette_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Crust top golden
  body:      { shadow: '#d2aa99', base: '#dad45e', highlight: '#deeed6' },     // Crumb interior
  accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Score cuts
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Crust bottom
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Highlight
});

export const DUMPLING_COLORS = scheme('dumpling_default', {
  head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Pleats white
  accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Pleat detail
  body:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Body white
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },     // Highlight
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Shadow
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Sauce shadow
});

export const PANCAKE_STACK_COLORS = scheme('pancake_stack_default', {
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Syrup golden
  head:      { shadow: '#d2aa99', base: '#dad45e', highlight: '#deeed6' },     // Top pancake pale
  body:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#dad45e' },     // Middle pancake
  hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Bottom pancake darker
  eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Crispy edges
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },     // Plate
});

export const SODA_CAN_COLORS = scheme('soda_can_default', {
  accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },     // Pull tab silver
  head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },     // Lid silver
  face:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Upper body silver
  body:      { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },     // Color band red
  belt:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Lower body silver
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Base
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },     // Highlight
});

export const POTION_BOTTLE_COLORS = scheme('potion_bottle_default', {
  hair:      { shadow: '#854c30', base: '#d2aa99', highlight: '#dad45e' },     // Cork brown
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Neck glass gray
  leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Red liquid
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Bottle glass
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Glass shine
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Base shadow
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Liquid surface line
});

export const COOKIE_COLORS = scheme('cookie_default', {
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Cookie dough golden
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Baked crust edge
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },     // Chocolate chips dark
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Surface highlight
});

export const ONIGIRI_COLORS = scheme('onigiri_default', {
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Rice white
  boot:      { shadow: '#140c1c', base: '#346524', highlight: '#4e4a4e' },     // Nori dark
  body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Base rice
  accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Texture dots
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Shadow underside
});

export const WAFFLE_COLORS = scheme('waffle_default', {
  body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#dad45e' },     // Waffle batter golden
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Grid lines darker
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Syrup amber
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Highlight corner
});

export const BURRITO_COLORS = scheme('burrito_default', {
  body:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Tortilla white
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Sealed ends
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Green filling (guac)
  leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Red filling (salsa/bean)
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Fold lines
  eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Wrap highlight
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Shadow underside
  hair:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },     // Wrap base
});

export const BUBBLE_TEA_COLORS = scheme('bubble_tea_default', {
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Straw blue
  head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Dome lid clear
  body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Cup body clear
  belt:      { shadow: '#d04648', base: '#d2aa99', highlight: '#dad45e' },     // Tea liquid pastel
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Tapioca pearls dark
  hair:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Cup lower
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Cup base
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Cup highlight
});

// ════════════════════════════════════════════════════════════
// EXPORT RECORDS
// ════════════════════════════════════════════════════════════

export const FOOD_BATCH2_TEMPLATES: Record<string, SpriteTemplate> = {
  ramen_bowl_16:     RAMEN_BOWL_16,
  coffee_cup_16:     COFFEE_CUP_16,
  pizza_slice_16:    PIZZA_SLICE_16,
  sushi_roll_16:     SUSHI_ROLL_16,
  taco_16:           TACO_16,
  croissant_16:      CROISSANT_16,
  ice_cream_cone_16: ICE_CREAM_CONE_16,
  hamburger_16:      HAMBURGER_16,
  cupcake_16:        CUPCAKE_16,
  tea_pot_16:        TEA_POT_16,
  baguette_16:       BAGUETTE_16,
  dumpling_16:       DUMPLING_16,
  pancake_stack_16:  PANCAKE_STACK_16,
  soda_can_16:       SODA_CAN_16,
  potion_bottle_16:  POTION_BOTTLE_16,
  cookie_16:         COOKIE_16,
  onigiri_16:        ONIGIRI_16,
  waffle_16:         WAFFLE_16,
  burrito_16:        BURRITO_16,
  bubble_tea_16:     BUBBLE_TEA_16,
};

export const FOOD_BATCH2_COLOR_SCHEMES: Record<string, ColorScheme> = {
  ramen_bowl_default:     RAMEN_BOWL_COLORS,
  coffee_cup_default:     COFFEE_CUP_COLORS,
  pizza_slice_default:    PIZZA_SLICE_COLORS,
  sushi_roll_default:     SUSHI_ROLL_COLORS,
  taco_default:           TACO_COLORS,
  croissant_default:      CROISSANT_COLORS,
  ice_cream_cone_default: ICE_CREAM_CONE_COLORS,
  hamburger_default:      HAMBURGER_COLORS,
  cupcake_default:        CUPCAKE_COLORS,
  tea_pot_default:        TEA_POT_COLORS,
  baguette_default:       BAGUETTE_COLORS,
  dumpling_default:       DUMPLING_COLORS,
  pancake_stack_default:  PANCAKE_STACK_COLORS,
  soda_can_default:       SODA_CAN_COLORS,
  potion_bottle_default:  POTION_BOTTLE_COLORS,
  cookie_default:         COOKIE_COLORS,
  onigiri_default:        ONIGIRI_COLORS,
  waffle_default:         WAFFLE_COLORS,
  burrito_default:        BURRITO_COLORS,
  bubble_tea_default:     BUBBLE_TEA_COLORS,
};
