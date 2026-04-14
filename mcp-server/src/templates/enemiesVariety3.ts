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

const ENEMY3_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  eye:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  body:      { shadow: '#442434', base: '#4e4a4e',  highlight: '#757161' },
  arm:       { shadow: '#442434', base: '#4e4a4e',  highlight: '#757161' },
  hand:      { shadow: '#757161', base: '#8595a1',  highlight: '#deeed6' },
  belt:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  leg:       { shadow: '#442434', base: '#4e4a4e',  highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  accessory: { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof ENEMY3_BASE>): ColorScheme {
  return { name, mapping: { ...ENEMY3_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// FROST_WITCH — Ice magic caster with frozen staff and icy robes.
// ════════════════════════════════════════════════════════════
export const FROST_WITCH_16: SpriteTemplate = {
  name: 'frost_witch_16', width: 16, height: 16,
  description: 'Frost witch with pointed hat, icy staff, flowing frozen robes, glowing blue eyes.',
  regions: [
    // Pointed hat
    { name: 'hat', role: 'hair', pixels: [
      [7,0], [8,0],
      [6,1], [7,1], [8,1], [9,1],
      [5,2], [6,2], [7,2], [8,2], [9,2], [10,2],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      [6,3], [7,3], [8,3], [9,3],
      [6,4], [9,4],
      [6,5], [7,5], [8,5], [9,5],
    ]},
    // Glowing icy eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7,3], [8,3],
      [7,4], [8,4],
    ]},
    // Body / robes
    { name: 'body', role: 'body', pixels: [
      [7,6], [8,6],
      [6,7], [7,7], [8,7], [9,7],
      [5,8], [6,8], [7,8], [8,8], [9,8], [10,8],
      [5,9], [6,9], [7,9], [8,9], [9,9], [10,9],
      [4,10], [5,10], [6,10], [7,10], [8,10], [9,10], [10,10], [11,10],
    ]},
    // Arms holding staff
    { name: 'arms', role: 'arm', pixels: [
      [4,7], [5,7], [10,7], [11,7],
      [3,8], [4,8], [11,8], [12,8],
    ]},
    // Ice staff
    { name: 'staff', role: 'accessory', pixels: [
      [3,3], [3,4], [3,5], [3,6], [3,7],
      [2,3], [4,3],
      [2,2], [4,2],
    ]},
    // Robe hem
    { name: 'robe_hem', role: 'leg', pixels: [
      ...hLine(11, 4, 11),
      ...hLine(12, 5, 10),
    ]},
    // Feet
    { name: 'feet', role: 'boot', pixels: [
      [6,13], [7,13], [8,13], [9,13],
    ]},
    // Ice crystals floating
    { name: 'crystals', role: 'belt', pixels: [
      [13,5], [14,6], [13,7],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SAND_GOLEM — Desert rock creature with sandy texture.
// ════════════════════════════════════════════════════════════
export const SAND_GOLEM_16: SpriteTemplate = {
  name: 'sand_golem_16', width: 16, height: 16,
  description: 'Massive sand golem with rocky head, broad shoulders, cracked sandy body.',
  regions: [
    // Head (blocky rock)
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 5, 10),
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
      [5,4], [6,4], [9,4], [10,4],
    ]},
    // Glowing amber eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,2], [7,2],
      [8,2], [9,2],
    ]},
    // Jaw cracks
    { name: 'jaw', role: 'face', pixels: [
      [7,3], [8,3],
      [7,4], [8,4],
    ]},
    // Torso (wide rocky)
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 11),
    ]},
    // Arms (thick stone)
    { name: 'arms', role: 'arm', pixels: [
      [1,5], [2,5], [2,6], [1,6], [1,7], [2,7],
      [13,5], [14,5], [13,6], [14,6], [13,7], [14,7],
    ]},
    // Fists
    { name: 'fists', role: 'hand', pixels: [
      [1,8], [2,8],
      [13,8], [14,8],
    ]},
    // Sand cracks (detail)
    { name: 'cracks', role: 'accessory', pixels: [
      [5,6], [8,7], [10,6], [6,8],
    ]},
    // Legs (thick pillars)
    { name: 'legs', role: 'leg', pixels: [
      [4,10], [5,10], [6,10], [9,10], [10,10], [11,10],
      [4,11], [5,11], [6,11], [9,11], [10,11], [11,11],
      [4,12], [5,12], [6,12], [9,12], [10,12], [11,12],
    ]},
    // Feet
    { name: 'feet', role: 'boot', pixels: [
      [3,13], [4,13], [5,13], [6,13], [7,13],
      [8,13], [9,13], [10,13], [11,13], [12,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// TOXIC_FROG — Poisonous amphibian with bulging eyes.
// ════════════════════════════════════════════════════════════
export const TOXIC_FROG_16: SpriteTemplate = {
  name: 'toxic_frog_16', width: 16, height: 16,
  description: 'Large toxic frog with bulging eyes, wide mouth, spotted back, poison dripping.',
  regions: [
    // Bulging eyes (on top)
    { name: 'eyes', role: 'eye', pixels: [
      [4,2], [5,2], [10,2], [11,2],
      [4,3], [5,3], [10,3], [11,3],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      ...hLine(4, 3, 12),
      ...hLine(5, 3, 12),
    ]},
    // Mouth
    { name: 'mouth', role: 'face', pixels: [
      ...hLine(6, 4, 11),
    ]},
    // Body (wide squat)
    { name: 'body', role: 'body', pixels: [
      ...hLine(7, 2, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 3, 12),
    ]},
    // Poison spots
    { name: 'spots', role: 'accessory', pixels: [
      [4,8], [7,7], [11,8], [9,9], [5,10],
    ]},
    // Front legs
    { name: 'front_legs', role: 'arm', pixels: [
      [2,10], [3,10], [12,10], [13,10],
      [1,11], [2,11], [13,11], [14,11],
    ]},
    // Back legs (folded)
    { name: 'back_legs', role: 'leg', pixels: [
      [3,11], [4,11], [5,11], [10,11], [11,11], [12,11],
      [3,12], [4,12], [11,12], [12,12],
    ]},
    // Feet / toes
    { name: 'feet', role: 'boot', pixels: [
      [1,12], [2,12], [13,12], [14,12],
      [2,13], [3,13], [4,13], [11,13], [12,13], [13,13],
    ]},
    // Poison drip
    { name: 'drip', role: 'belt', pixels: [
      [6,11], [7,12], [9,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// CAVE_SPIDER — Underground spider with pale body and many legs.
// ════════════════════════════════════════════════════════════
export const CAVE_SPIDER_16: SpriteTemplate = {
  name: 'cave_spider_16', width: 16, height: 16,
  description: 'Pale cave spider with many red eyes, fangs, long thin legs, web spinnerets.',
  regions: [
    // Multiple eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3], [8,3], [9,3],
      [6,4], [9,4],
    ]},
    // Head / cephalothorax
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 6, 9),
      [5,3], [10,3],
      [5,4], [7,4], [8,4], [10,4],
      ...hLine(5, 5, 10),
    ]},
    // Fangs
    { name: 'fangs', role: 'face', pixels: [
      [7,6], [8,6],
    ]},
    // Abdomen (large round)
    { name: 'abdomen', role: 'body', pixels: [
      ...hLine(6, 5, 10),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 5, 10),
      ...hLine(10, 6, 9),
    ]},
    // Web pattern on abdomen
    { name: 'pattern', role: 'accessory', pixels: [
      [7,7], [8,7], [6,8], [9,8],
    ]},
    // Left legs (4)
    { name: 'left_legs', role: 'arm', pixels: [
      [3,5], [2,4], [1,3],
      [3,6], [2,6], [1,7],
      [3,8], [2,9],
      [3,10], [2,11],
    ]},
    // Right legs (4)
    { name: 'right_legs', role: 'leg', pixels: [
      [12,5], [13,4], [14,3],
      [12,6], [13,6], [14,7],
      [12,8], [13,9],
      [12,10], [13,11],
    ]},
    // Spinnerets / web strand
    { name: 'spinnerets', role: 'belt', pixels: [
      [7,11], [8,11], [7,12], [8,12],
    ]},
    // Leg tips
    { name: 'leg_tips', role: 'boot', pixels: [
      [1,2], [1,8], [2,10], [2,12],
      [14,2], [14,8], [13,10], [13,12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// PIRATE_SKELETON — Undead pirate with hat, cutlass, and peg leg.
// ════════════════════════════════════════════════════════════
export const PIRATE_SKELETON_16: SpriteTemplate = {
  name: 'pirate_skeleton_16', width: 16, height: 16,
  description: 'Skeletal pirate with tricorn hat, cutlass, tattered coat, peg leg.',
  regions: [
    // Tricorn hat
    { name: 'hat', role: 'hair', pixels: [
      [6,0], [7,0], [8,0], [9,0],
      [5,1], [6,1], [7,1], [8,1], [9,1], [10,1],
      [4,2], [5,2], [10,2], [11,2],
    ]},
    // Skull
    { name: 'skull', role: 'head', pixels: [
      [6,2], [7,2], [8,2], [9,2],
      [6,3], [9,3],
      [6,4], [7,4], [8,4], [9,4],
    ]},
    // Glowing eye sockets
    { name: 'eyes', role: 'eye', pixels: [
      [7,3], [8,3],
    ]},
    // Jaw
    { name: 'jaw', role: 'face', pixels: [
      [7,5], [8,5],
    ]},
    // Tattered coat / body
    { name: 'body', role: 'body', pixels: [
      [6,6], [7,6], [8,6], [9,6],
      [5,7], [6,7], [7,7], [8,7], [9,7], [10,7],
      [5,8], [6,8], [7,8], [8,8], [9,8], [10,8],
    ]},
    // Belt with buckle
    { name: 'belt', role: 'belt', pixels: [
      ...hLine(9, 5, 10),
    ]},
    // Arms (bony)
    { name: 'arms', role: 'arm', pixels: [
      [4,6], [4,7], [3,7], [3,8],
      [11,6], [11,7], [12,7],
    ]},
    // Cutlass
    { name: 'cutlass', role: 'accessory', pixels: [
      [12,5], [13,5], [13,6], [14,6], [14,7],
    ]},
    // Legs (one normal, one peg)
    { name: 'legs', role: 'leg', pixels: [
      [6,10], [7,10], [6,11], [7,11],
      [6,12], [7,12],
      [9,10], [9,11], [9,12],
    ]},
    // Boots / peg
    { name: 'boots', role: 'boot', pixels: [
      [5,13], [6,13], [7,13],
      [9,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// LAVA_BEETLE — Fire insect with glowing carapace.
// ════════════════════════════════════════════════════════════
export const LAVA_BEETLE_16: SpriteTemplate = {
  name: 'lava_beetle_16', width: 16, height: 16,
  description: 'Armored lava beetle with glowing cracks in its shell, pincers, and fiery legs.',
  regions: [
    // Antennae
    { name: 'antennae', role: 'hair', pixels: [
      [5,1], [10,1],
      [6,2], [9,2],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
    ]},
    // Eyes (glowing orange)
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Pincers
    { name: 'pincers', role: 'face', pixels: [
      [4,5], [5,5], [10,5], [11,5],
    ]},
    // Shell / carapace
    { name: 'shell', role: 'body', pixels: [
      ...hLine(5, 6, 9),
      ...hLine(6, 4, 11),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 11),
      ...hLine(10, 5, 10),
    ]},
    // Lava cracks on shell
    { name: 'cracks', role: 'accessory', pixels: [
      [6,7], [8,6], [10,7], [7,9], [9,8],
    ]},
    // Legs (3 pairs)
    { name: 'left_legs', role: 'arm', pixels: [
      [2,6], [1,7],
      [2,8], [1,9],
      [3,10], [2,11],
    ]},
    { name: 'right_legs', role: 'leg', pixels: [
      [13,6], [14,7],
      [13,8], [14,9],
      [12,10], [13,11],
    ]},
    // Belly (underside)
    { name: 'belly', role: 'belt', pixels: [
      ...hLine(11, 5, 10),
    ]},
    // Leg tips
    { name: 'feet', role: 'boot', pixels: [
      [1,8], [1,10], [2,12],
      [14,8], [14,10], [13,12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SWAMP_HAG — Bog witch with gnarled staff and mossy robes.
// ════════════════════════════════════════════════════════════
export const SWAMP_HAG_16: SpriteTemplate = {
  name: 'swamp_hag_16', width: 16, height: 16,
  description: 'Hunched swamp hag with tangled hair, glowing green eyes, mossy tattered robes.',
  regions: [
    // Tangled hair
    { name: 'hair', role: 'hair', pixels: [
      [7,0], [8,0],
      [5,1], [6,1], [7,1], [8,1], [9,1], [10,1],
      [4,2], [5,2], [10,2], [11,2],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      [6,2], [7,2], [8,2], [9,2],
      [6,3], [9,3],
      [6,4], [7,4], [8,4], [9,4],
    ]},
    // Glowing green eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7,2], [8,2],
      [7,3], [8,3],
    ]},
    // Crooked nose / chin
    { name: 'face', role: 'face', pixels: [
      [8,4], [7,5],
    ]},
    // Body (hunched)
    { name: 'body', role: 'body', pixels: [
      [7,5], [8,5],
      [6,6], [7,6], [8,6], [9,6],
      [5,7], [6,7], [7,7], [8,7], [9,7], [10,7],
      [5,8], [6,8], [7,8], [8,8], [9,8], [10,8],
    ]},
    // Arms
    { name: 'arms', role: 'arm', pixels: [
      [4,6], [3,7], [3,8],
      [11,6], [12,7],
    ]},
    // Gnarled staff
    { name: 'staff', role: 'accessory', pixels: [
      [13,2], [13,3], [13,4], [13,5], [13,6], [12,7], [12,8],
      [12,2], [14,2],
    ]},
    // Tattered robe bottom
    { name: 'robe', role: 'leg', pixels: [
      [4,9], [5,9], [6,9], [7,9], [8,9], [9,9], [10,9], [11,9],
      [5,10], [6,10], [7,10], [8,10], [9,10], [10,10],
      [5,11], [6,11], [9,11], [10,11],
    ]},
    // Feet
    { name: 'feet', role: 'boot', pixels: [
      [5,12], [6,12], [9,12], [10,12],
    ]},
    // Moss / swamp drip
    { name: 'moss', role: 'belt', pixels: [
      [4,10], [11,10], [7,11], [8,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// CRYSTAL_SENTINEL — Gem guardian with faceted crystalline body.
// ════════════════════════════════════════════════════════════
export const CRYSTAL_SENTINEL_16: SpriteTemplate = {
  name: 'crystal_sentinel_16', width: 16, height: 16,
  description: 'Crystalline sentinel with faceted gem body, floating crystal shards, prismatic eyes.',
  regions: [
    // Crystal crown / top facets
    { name: 'crown', role: 'hair', pixels: [
      [7,0], [8,0],
      [6,1], [7,1], [8,1], [9,1],
    ]},
    // Head (crystal faceted)
    { name: 'head', role: 'head', pixels: [
      [5,2], [6,2], [7,2], [8,2], [9,2], [10,2],
      [5,3], [6,3], [9,3], [10,3],
      [5,4], [6,4], [7,4], [8,4], [9,4], [10,4],
    ]},
    // Prismatic eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3],
      [8,3], [9,3],
    ]},
    // Core body
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 5, 10),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 5, 10),
    ]},
    // Inner glow facets
    { name: 'facets', role: 'accessory', pixels: [
      [6,6], [9,6], [7,8], [8,8],
      [5,7], [10,7],
    ]},
    // Crystal arms
    { name: 'arms', role: 'arm', pixels: [
      [2,5], [3,5], [3,6], [2,7],
      [12,5], [13,5], [12,6], [13,7],
    ]},
    // Floating crystal shards
    { name: 'shards', role: 'belt', pixels: [
      [1,4], [2,3],
      [14,4], [13,3],
    ]},
    // Legs (crystal pillars)
    { name: 'legs', role: 'leg', pixels: [
      [5,10], [6,10], [7,10], [8,10], [9,10], [10,10],
      [5,11], [6,11], [9,11], [10,11],
      [5,12], [6,12], [9,12], [10,12],
    ]},
    // Base
    { name: 'base', role: 'boot', pixels: [
      [4,13], [5,13], [6,13], [7,13],
      [8,13], [9,13], [10,13], [11,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SMOKE_DEMON — Dark cloud entity with shifting form.
// ════════════════════════════════════════════════════════════
export const SMOKE_DEMON_16: SpriteTemplate = {
  name: 'smoke_demon_16', width: 16, height: 16,
  description: 'Amorphous smoke demon with glowing eyes, wispy tendrils, dark billowing form.',
  regions: [
    // Smoke wisps above
    { name: 'wisps_top', role: 'hair', pixels: [
      [6,0], [9,0],
      [5,1], [7,1], [8,1], [10,1],
    ]},
    // Head form
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      [4,4], [5,4], [10,4], [11,4],
    ]},
    // Glowing eyes
    { name: 'eyes', role: 'eye', pixels: [
      [5,3], [6,3],
      [9,3], [10,3],
    ]},
    // Dark mouth / void
    { name: 'mouth', role: 'face', pixels: [
      [7,4], [8,4],
    ]},
    // Body mass (billowing)
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 12),
      ...hLine(7, 2, 13),
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
    ]},
    // Inner glow
    { name: 'glow', role: 'accessory', pixels: [
      [6,6], [9,6], [7,7], [8,7],
    ]},
    // Tendrils left
    { name: 'tendril_left', role: 'arm', pixels: [
      [1,6], [2,6], [1,7], [1,8], [2,9],
    ]},
    // Tendrils right
    { name: 'tendril_right', role: 'arm', pixels: [
      [13,6], [14,6], [14,7], [14,8], [13,9],
    ]},
    // Lower wisp tail
    { name: 'tail', role: 'leg', pixels: [
      ...hLine(10, 4, 11),
      [5,11], [6,11], [9,11], [10,11],
      [6,12], [7,12], [8,12], [9,12],
    ]},
    // Smoke dissipation
    { name: 'dissipate', role: 'boot', pixels: [
      [5,13], [7,13], [8,13], [10,13],
    ]},
    // Embers
    { name: 'embers', role: 'belt', pixels: [
      [4,5], [11,5], [5,8], [10,8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// CYBER_DRONE — Robot enemy with sensor eye and weapon arm.
// ════════════════════════════════════════════════════════════
export const CYBER_DRONE_16: SpriteTemplate = {
  name: 'cyber_drone_16', width: 16, height: 16,
  description: 'Hovering cyber drone with sensor eye, antenna, blaster arm, metallic plating.',
  regions: [
    // Antenna
    { name: 'antenna', role: 'hair', pixels: [
      [7,0], [8,0],
      [7,1], [8,1],
    ]},
    // Head / sensor dome
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 4, 11),
      ...hLine(5, 5, 10),
    ]},
    // Sensor eye (large, glowing)
    { name: 'eye', role: 'eye', pixels: [
      [6,3], [7,3], [8,3], [9,3],
      [6,4], [7,4], [8,4], [9,4],
    ]},
    // Face plate
    { name: 'faceplate', role: 'face', pixels: [
      [5,3], [10,3], [5,4], [10,4],
    ]},
    // Body (mechanical torso)
    { name: 'body', role: 'body', pixels: [
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
    ]},
    // Panel detail
    { name: 'panel', role: 'accessory', pixels: [
      [6,7], [7,7], [8,7], [9,7],
    ]},
    // Left arm (claw)
    { name: 'arm_left', role: 'arm', pixels: [
      [3,6], [4,6], [3,7], [2,8], [3,8],
    ]},
    // Right arm (blaster)
    { name: 'arm_right', role: 'arm', pixels: [
      [11,6], [12,6], [12,7], [13,7], [14,7],
    ]},
    // Hover jets
    { name: 'jets', role: 'belt', pixels: [
      [6,9], [7,9], [8,9], [9,9],
    ]},
    // Exhaust
    { name: 'exhaust', role: 'leg', pixels: [
      [6,10], [7,10], [8,10], [9,10],
      [7,11], [8,11],
    ]},
    // Thruster glow
    { name: 'thruster', role: 'boot', pixels: [
      [7,12], [8,12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// VINE_CREEPER — Plant monster with tangled vines and thorns.
// ════════════════════════════════════════════════════════════
export const VINE_CREEPER_16: SpriteTemplate = {
  name: 'vine_creeper_16', width: 16, height: 16,
  description: 'Tangled vine monster with thorns, flower-like head, crawling root legs.',
  regions: [
    // Flower petals (head)
    { name: 'petals', role: 'hair', pixels: [
      [7,0], [8,0],
      [5,1], [6,1], [9,1], [10,1],
      [5,2], [10,2],
    ]},
    // Head (center)
    { name: 'head', role: 'head', pixels: [
      [6,2], [7,2], [8,2], [9,2],
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Eyes (glowing yellow)
    { name: 'eyes', role: 'eye', pixels: [
      [7,2], [8,2],
    ]},
    // Maw
    { name: 'maw', role: 'face', pixels: [
      [7,3], [8,3],
    ]},
    // Vine body (tangled mass)
    { name: 'body', role: 'body', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 5, 10),
    ]},
    // Thorns
    { name: 'thorns', role: 'accessory', pixels: [
      [3,5], [12,5], [3,7], [12,7],
      [5,4], [10,4],
    ]},
    // Vine tendrils (left)
    { name: 'vines_left', role: 'arm', pixels: [
      [2,4], [1,5], [1,6], [2,7], [2,8],
    ]},
    // Vine tendrils (right)
    { name: 'vines_right', role: 'arm', pixels: [
      [13,4], [14,5], [14,6], [13,7], [13,8],
    ]},
    // Root legs
    { name: 'roots', role: 'leg', pixels: [
      [4,9], [5,9], [6,9], [9,9], [10,9], [11,9],
      [3,10], [4,10], [5,10], [10,10], [11,10], [12,10],
      [3,11], [4,11], [11,11], [12,11],
    ]},
    // Root tips
    { name: 'root_tips', role: 'boot', pixels: [
      [2,12], [3,12], [4,12], [11,12], [12,12], [13,12],
    ]},
    // Berries / buds
    { name: 'buds', role: 'belt', pixels: [
      [5,6], [10,6], [7,5], [8,5],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// BLOOD_KNIGHT — Cursed warrior in crimson armor.
// ════════════════════════════════════════════════════════════
export const BLOOD_KNIGHT_16: SpriteTemplate = {
  name: 'blood_knight_16', width: 16, height: 16,
  description: 'Cursed blood knight in crimson plate armor, horned helm, glowing red eyes, blood sword.',
  regions: [
    // Horned helm
    { name: 'helm', role: 'hair', pixels: [
      [4,0], [5,0], [10,0], [11,0],
      [5,1], [6,1], [7,1], [8,1], [9,1], [10,1],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      [6,2], [7,2], [8,2], [9,2],
      [6,3], [9,3],
      [6,4], [7,4], [8,4], [9,4],
    ]},
    // Glowing eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7,2], [8,2],
      [7,3], [8,3],
    ]},
    // Visor slit
    { name: 'visor', role: 'face', pixels: [
      [7,4], [8,4],
    ]},
    // Armor body
    { name: 'body', role: 'body', pixels: [
      [6,5], [7,5], [8,5], [9,5],
      [5,6], [6,6], [7,6], [8,6], [9,6], [10,6],
      [5,7], [6,7], [7,7], [8,7], [9,7], [10,7],
      [5,8], [6,8], [7,8], [8,8], [9,8], [10,8],
    ]},
    // Belt
    { name: 'belt', role: 'belt', pixels: [
      ...hLine(9, 5, 10),
    ]},
    // Arms (pauldrons)
    { name: 'arms', role: 'arm', pixels: [
      [3,5], [4,5], [4,6], [3,7],
      [11,5], [12,5], [11,6], [12,6],
    ]},
    // Blood sword
    { name: 'sword', role: 'accessory', pixels: [
      [2,4], [2,5], [2,6], [2,7], [2,8], [2,9],
      [1,4], [3,4],
    ]},
    // Legs (armored)
    { name: 'legs', role: 'leg', pixels: [
      [5,10], [6,10], [7,10], [8,10], [9,10], [10,10],
      [5,11], [6,11], [9,11], [10,11],
      [5,12], [6,12], [9,12], [10,12],
    ]},
    // Sabatons
    { name: 'boots', role: 'boot', pixels: [
      [4,13], [5,13], [6,13], [9,13], [10,13], [11,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// FROST_WORM — Ice tunnel worm with segmented frozen body.
// ════════════════════════════════════════════════════════════
export const FROST_WORM_16: SpriteTemplate = {
  name: 'frost_worm_16', width: 16, height: 16,
  description: 'Segmented frost worm emerging from ground, icy mandibles, frozen segments.',
  regions: [
    // Head / mandibles
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
    ]},
    // Mandibles
    { name: 'mandibles', role: 'face', pixels: [
      [4,2], [5,3], [10,3], [11,2],
      [4,3], [11,3],
    ]},
    // Eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Ice crown spikes
    { name: 'spikes', role: 'hair', pixels: [
      [6,0], [8,0], [10,0],
      [7,0], [9,0],
    ]},
    // Body segment 1
    { name: 'segment1', role: 'body', pixels: [
      ...hLine(4, 5, 10),
      ...hLine(5, 5, 10),
      ...hLine(6, 6, 9),
    ]},
    // Body segment 2
    { name: 'segment2', role: 'arm', pixels: [
      ...hLine(7, 6, 9),
      ...hLine(8, 5, 10),
    ]},
    // Body segment 3
    { name: 'segment3', role: 'leg', pixels: [
      ...hLine(9, 5, 10),
      ...hLine(10, 6, 9),
    ]},
    // Ice crystals on body
    { name: 'crystals', role: 'accessory', pixels: [
      [4,5], [11,5], [4,8], [11,8],
      [5,7], [10,7],
    ]},
    // Segment rings
    { name: 'rings', role: 'belt', pixels: [
      ...hLine(6, 5, 10),
      ...hLine(9, 5, 10),
    ]},
    // Tail / ground emergence
    { name: 'ground', role: 'boot', pixels: [
      ...hLine(11, 5, 10),
      ...hLine(12, 4, 11),
      ...hLine(13, 3, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// PHANTOM_THIEF — Ghostly rogue with translucent cloak.
// ════════════════════════════════════════════════════════════
export const PHANTOM_THIEF_16: SpriteTemplate = {
  name: 'phantom_thief_16', width: 16, height: 16,
  description: 'Ghostly thief with translucent hood, glowing eyes, spectral daggers, wispy form.',
  regions: [
    // Hood
    { name: 'hood', role: 'hair', pixels: [
      [6,0], [7,0], [8,0], [9,0],
      [5,1], [6,1], [7,1], [8,1], [9,1], [10,1],
      [5,2], [10,2],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      [6,2], [7,2], [8,2], [9,2],
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Glowing eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7,2], [8,2],
    ]},
    // Mask lower
    { name: 'mask', role: 'face', pixels: [
      [7,3], [8,3],
    ]},
    // Body (spectral cloak)
    { name: 'body', role: 'body', pixels: [
      [7,4], [8,4],
      [6,5], [7,5], [8,5], [9,5],
      [5,6], [6,6], [7,6], [8,6], [9,6], [10,6],
      [5,7], [6,7], [7,7], [8,7], [9,7], [10,7],
    ]},
    // Arms with daggers
    { name: 'arms', role: 'arm', pixels: [
      [3,5], [4,5], [4,6], [3,6],
      [11,5], [12,5], [11,6], [12,6],
    ]},
    // Spectral daggers
    { name: 'daggers', role: 'accessory', pixels: [
      [2,4], [2,5], [1,5],
      [13,4], [13,5], [14,5],
    ]},
    // Belt / sash
    { name: 'sash', role: 'belt', pixels: [
      ...hLine(8, 5, 10),
    ]},
    // Wispy lower form
    { name: 'wisps', role: 'leg', pixels: [
      [5,9], [6,9], [7,9], [8,9], [9,9], [10,9],
      [6,10], [7,10], [8,10], [9,10],
      [6,11], [8,11], [9,11],
    ]},
    // Trail
    { name: 'trail', role: 'boot', pixels: [
      [7,12], [8,12],
      [7,13], [9,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// MAGMA_CRAB — Lava crustacean with hardened shell.
// ════════════════════════════════════════════════════════════
export const MAGMA_CRAB_16: SpriteTemplate = {
  name: 'magma_crab_16', width: 16, height: 16,
  description: 'Armored magma crab with glowing shell cracks, large pincers, lava drip.',
  regions: [
    // Eye stalks
    { name: 'stalks', role: 'hair', pixels: [
      [5,1], [6,1], [9,1], [10,1],
    ]},
    // Eyes
    { name: 'eyes', role: 'eye', pixels: [
      [5,2], [6,2], [9,2], [10,2],
    ]},
    // Head / face
    { name: 'head', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
    ]},
    // Mouth
    { name: 'mouth', role: 'face', pixels: [
      [7,4], [8,4],
    ]},
    // Shell (wide, armored)
    { name: 'shell', role: 'body', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 4, 11),
    ]},
    // Magma cracks
    { name: 'cracks', role: 'accessory', pixels: [
      [5,6], [8,5], [10,6], [6,7], [9,7],
    ]},
    // Left pincer
    { name: 'pincer_left', role: 'arm', pixels: [
      [1,4], [2,4], [1,5], [2,5], [3,5],
      [1,6], [2,6],
    ]},
    // Right pincer
    { name: 'pincer_right', role: 'arm', pixels: [
      [13,4], [14,4], [12,5], [13,5], [14,5],
      [13,6], [14,6],
    ]},
    // Legs (3 pairs)
    { name: 'legs', role: 'leg', pixels: [
      [3,9], [4,9], [5,9], [10,9], [11,9], [12,9],
      [2,10], [3,10], [4,10], [11,10], [12,10], [13,10],
    ]},
    // Leg tips
    { name: 'leg_tips', role: 'boot', pixels: [
      [1,11], [2,11], [3,11], [12,11], [13,11], [14,11],
    ]},
    // Lava drip below
    { name: 'lava_drip', role: 'belt', pixels: [
      [6,9], [7,9], [8,9], [9,9],
      [7,10], [8,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// THUNDER_HAWK — Electric bird enemy with lightning wings.
// ════════════════════════════════════════════════════════════
export const THUNDER_HAWK_16: SpriteTemplate = {
  name: 'thunder_hawk_16', width: 16, height: 16,
  description: 'Electric raptor with spread lightning-charged wings, sharp beak, crackling talons.',
  regions: [
    // Head crest
    { name: 'crest', role: 'hair', pixels: [
      [7,0], [8,0],
      [6,1], [7,1], [8,1], [9,1],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      [6,2], [7,2], [8,2], [9,2],
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Eyes (electric)
    { name: 'eyes', role: 'eye', pixels: [
      [7,2], [8,2],
    ]},
    // Beak
    { name: 'beak', role: 'face', pixels: [
      [7,4], [8,4], [9,4],
    ]},
    // Body
    { name: 'body', role: 'body', pixels: [
      [6,4], [7,4], [8,4],
      [6,5], [7,5], [8,5], [9,5],
      [6,6], [7,6], [8,6], [9,6],
      [7,7], [8,7],
    ]},
    // Left wing (spread)
    { name: 'wing_left', role: 'arm', pixels: [
      [1,3], [2,3], [3,3], [4,3],
      [1,4], [2,4], [3,4], [4,4], [5,4],
      [2,5], [3,5], [4,5], [5,5],
      [3,6], [4,6], [5,6],
    ]},
    // Right wing (spread)
    { name: 'wing_right', role: 'arm', pixels: [
      [11,3], [12,3], [13,3], [14,3],
      [10,4], [11,4], [12,4], [13,4], [14,4],
      [10,5], [11,5], [12,5], [13,5],
      [10,6], [11,6], [12,6],
    ]},
    // Lightning sparks on wings
    { name: 'sparks', role: 'accessory', pixels: [
      [1,2], [14,2], [2,5], [13,5],
      [4,6], [11,6],
    ]},
    // Tail feathers
    { name: 'tail', role: 'leg', pixels: [
      [6,7], [9,7],
      [5,8], [6,8], [9,8], [10,8],
      [5,9], [10,9],
    ]},
    // Talons
    { name: 'talons', role: 'boot', pixels: [
      [6,9], [7,9], [8,9], [9,9],
      [5,10], [6,10], [9,10], [10,10],
    ]},
    // Lightning trail
    { name: 'lightning', role: 'belt', pixels: [
      [7,10], [8,10], [7,11], [8,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// PUPPET_SOLDIER — Wooden puppet with strings and weapon.
// ════════════════════════════════════════════════════════════
export const PUPPET_SOLDIER_16: SpriteTemplate = {
  name: 'puppet_soldier_16', width: 16, height: 16,
  description: 'Wooden puppet soldier with visible strings, painted face, sword arm, jointed limbs.',
  regions: [
    // Strings
    { name: 'strings', role: 'belt', pixels: [
      [5,0], [7,0], [8,0], [10,0],
      [5,1], [10,1],
    ]},
    // Head (round wooden)
    { name: 'head', role: 'head', pixels: [
      [6,1], [7,1], [8,1], [9,1],
      [5,2], [6,2], [7,2], [8,2], [9,2], [10,2],
      [5,3], [6,3], [9,3], [10,3],
      [6,4], [7,4], [8,4], [9,4],
    ]},
    // Painted eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7,2], [8,2],
      [7,3], [8,3],
    ]},
    // Mouth (painted)
    { name: 'mouth', role: 'face', pixels: [
      [7,4], [8,4],
    ]},
    // Body (wooden torso)
    { name: 'body', role: 'body', pixels: [
      [6,5], [7,5], [8,5], [9,5],
      [6,6], [7,6], [8,6], [9,6],
      [6,7], [7,7], [8,7], [9,7],
      [6,8], [7,8], [8,8], [9,8],
    ]},
    // Arms (jointed)
    { name: 'arms', role: 'arm', pixels: [
      [4,5], [5,5], [5,6], [4,7],
      [10,5], [11,5], [10,6], [11,7],
    ]},
    // Hands
    { name: 'hands', role: 'hand', pixels: [
      [3,7], [4,8],
      [12,7],
    ]},
    // Sword
    { name: 'sword', role: 'accessory', pixels: [
      [12,4], [12,5], [12,6], [12,7], [12,8],
      [11,4], [13,4],
    ]},
    // Joint markers
    { name: 'joints', role: 'hair', pixels: [
      [5,5], [10,5], [6,9], [9,9],
    ]},
    // Legs (jointed)
    { name: 'legs', role: 'leg', pixels: [
      [5,9], [6,9], [9,9], [10,9],
      [5,10], [6,10], [9,10], [10,10],
      [5,11], [6,11], [9,11], [10,11],
    ]},
    // Shoes
    { name: 'shoes', role: 'boot', pixels: [
      [4,12], [5,12], [6,12], [7,12],
      [8,12], [9,12], [10,12], [11,12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// ACID_BLOB — Corrosive slime with dissolving droplets.
// ════════════════════════════════════════════════════════════
export const ACID_BLOB_16: SpriteTemplate = {
  name: 'acid_blob_16', width: 16, height: 16,
  description: 'Bubbling acid blob with corrosive drips, toxic eyes, dissolving surface texture.',
  regions: [
    // Acid bubbles on top
    { name: 'bubbles', role: 'accessory', pixels: [
      [6,1], [9,1],
      [5,2], [7,2], [10,2],
    ]},
    // Eyes
    { name: 'eyes', role: 'eye', pixels: [
      [5,4], [6,4],
      [9,4], [10,4],
    ]},
    // Head / top dome
    { name: 'head', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      [4,4], [7,4], [8,4], [11,4],
    ]},
    // Mouth
    { name: 'mouth', role: 'face', pixels: [
      [7,5], [8,5],
    ]},
    // Main blob body
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(6, 3, 12),
      ...hLine(7, 3, 12),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
    ]},
    // Dissolving drops
    { name: 'drops', role: 'arm', pixels: [
      [2,7], [2,8], [13,7], [13,8],
      [1,9], [14,9],
    ]},
    // Inner bubbles
    { name: 'inner_bubbles', role: 'belt', pixels: [
      [5,7], [8,6], [10,8], [6,9],
    ]},
    // Puddle base
    { name: 'puddle', role: 'leg', pixels: [
      ...hLine(11, 3, 12),
      ...hLine(12, 4, 11),
    ]},
    // Acid trail
    { name: 'trail', role: 'boot', pixels: [
      [5,13], [6,13], [9,13], [10,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// BONE_SPIDER — Skeletal arachnid with bony legs and skull head.
// ════════════════════════════════════════════════════════════
export const BONE_SPIDER_16: SpriteTemplate = {
  name: 'bone_spider_16', width: 16, height: 16,
  description: 'Skeletal spider with skull-like head, bone legs, ribcage abdomen, green soul fire eyes.',
  regions: [
    // Soul fire eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Skull head
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      [5,2], [10,2],
      ...hLine(3, 5, 10),
    ]},
    // Fangs
    { name: 'fangs', role: 'face', pixels: [
      [7,4], [8,4],
    ]},
    // Ribcage abdomen
    { name: 'abdomen', role: 'body', pixels: [
      ...hLine(5, 5, 10),
      [5,6], [6,6], [9,6], [10,6],
      ...hLine(7, 5, 10),
      [5,8], [6,8], [9,8], [10,8],
      ...hLine(9, 6, 9),
    ]},
    // Spine
    { name: 'spine', role: 'accessory', pixels: [
      [7,5], [8,5], [7,6], [8,6], [7,7], [8,7], [7,8], [8,8],
    ]},
    // Left bone legs
    { name: 'left_legs', role: 'arm', pixels: [
      [4,4], [3,3], [2,2],
      [4,5], [3,6], [2,7],
      [4,7], [3,8], [2,9],
      [4,9], [3,10], [2,11],
    ]},
    // Right bone legs
    { name: 'right_legs', role: 'leg', pixels: [
      [11,4], [12,3], [13,2],
      [11,5], [12,6], [13,7],
      [11,7], [12,8], [13,9],
      [11,9], [12,10], [13,11],
    ]},
    // Leg tips (claws)
    { name: 'claws', role: 'boot', pixels: [
      [1,1], [1,7], [1,9], [1,12],
      [14,1], [14,7], [14,9], [14,12],
    ]},
    // Silk thread
    { name: 'silk', role: 'belt', pixels: [
      [7,10], [8,10], [7,11], [8,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// VOID_HOUND — Dark dimension dog with shadow aura.
// ════════════════════════════════════════════════════════════
export const VOID_HOUND_16: SpriteTemplate = {
  name: 'void_hound_16', width: 16, height: 16,
  description: 'Otherworldly hound from the void, glowing purple eyes, shadow tendrils, sleek dark body.',
  regions: [
    // Ears
    { name: 'ears', role: 'hair', pixels: [
      [4,1], [5,1], [10,1], [11,1],
      [5,2], [10,2],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      [6,2], [7,2], [8,2], [9,2],
      [5,3], [6,3], [7,3], [8,3], [9,3], [10,3],
      [5,4], [6,4], [9,4], [10,4],
    ]},
    // Glowing void eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3],
      [8,3], [9,3],
    ]},
    // Snout / fangs
    { name: 'snout', role: 'face', pixels: [
      [7,4], [8,4],
      [7,5], [8,5],
    ]},
    // Body
    { name: 'body', role: 'body', pixels: [
      [4,5], [5,5], [6,5], [9,5], [10,5], [11,5],
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 5, 10),
    ]},
    // Shadow tendrils
    { name: 'tendrils', role: 'accessory', pixels: [
      [3,4], [12,4], [3,6], [12,6],
      [2,5], [13,5],
    ]},
    // Tail (shadow wisp)
    { name: 'tail', role: 'belt', pixels: [
      [12,7], [13,7], [13,8], [14,8], [14,9],
    ]},
    // Front legs
    { name: 'front_legs', role: 'arm', pixels: [
      [4,9], [5,9], [10,9], [11,9],
      [4,10], [5,10], [10,10], [11,10],
    ]},
    // Back legs
    { name: 'back_legs', role: 'leg', pixels: [
      [4,11], [5,11], [10,11], [11,11],
    ]},
    // Paws
    { name: 'paws', role: 'boot', pixels: [
      [3,12], [4,12], [5,12], [6,12],
      [9,12], [10,12], [11,12], [12,12],
    ]},
    // Shadow aura
    { name: 'aura', role: 'leg', pixels: [
      [3,7], [12,8], [2,8], [13,6],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// COLOR SCHEMES
// ════════════════════════════════════════════════════════════

export const FROST_WITCH_COLORS = scheme('frost_witch_default', {
  hair:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Icy hat
  head:      { shadow: '#597dce', base: '#8595a1', highlight: '#d2aa99' },     // Pale skin
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Glowing ice eyes
  face:      { shadow: '#597dce', base: '#8595a1', highlight: '#deeed6' },     // Pale face
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Frozen robes
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },     // Robe sleeves
  accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Ice staff glow
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Robe hem
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },     // Dark boots
  belt:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Ice crystals
});

export const SAND_GOLEM_COLORS = scheme('sand_golem_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Sandy rock head
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Amber glow eyes
  face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Jaw cracks
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Sandy body
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Stone arms
  hand:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },     // Sand fists
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Glowing cracks
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Darker legs
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Stone feet
});

export const TOXIC_FROG_COLORS = scheme('toxic_frog_default', {
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Green head
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Orange-red eyes
  face:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark mouth
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Toxic green body
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Warning spots
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#8595a1' },     // Front legs
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Back legs
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Toes
  belt:      { shadow: '#442434', base: '#6daa2c', highlight: '#dad45e' },     // Poison drip
});

export const CAVE_SPIDER_COLORS = scheme('cave_spider_default', {
  head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },     // Pale chitin
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red many-eyes
  face:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // White fangs
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Pale abdomen
  accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Web pattern
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Left legs
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Right legs
  belt:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Spinnerets
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },     // Leg tips
});

export const PIRATE_SKELETON_COLORS = scheme('pirate_skeleton_default', {
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark tricorn
  head:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },     // Bone skull
  eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Green soul eyes
  face:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },     // Bone jaw
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Tattered coat
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold buckle
  arm:       { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },     // Bone arms
  accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Steel cutlass
  leg:       { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },     // Bone legs
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Boot + peg
});

export const LAVA_BEETLE_COLORS = scheme('lava_beetle_default', {
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Antennae
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Dark chitin head
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Glowing orange eyes
  face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Pincers
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark shell
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Lava cracks glow
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Left legs
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Right legs
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Hot belly
  boot:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Glowing tips
});

export const SWAMP_HAG_COLORS = scheme('swamp_hag_default', {
  hair:      { shadow: '#346524', base: '#6daa2c', highlight: '#854c30' },     // Mossy tangled hair
  head:      { shadow: '#346524', base: '#854c30', highlight: '#d2aa99' },     // Greenish skin
  eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Glowing green eyes
  face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },     // Pale nose/chin
  body:      { shadow: '#346524', base: '#854c30', highlight: '#757161' },     // Tattered mossy robes
  arm:       { shadow: '#346524', base: '#854c30', highlight: '#d2aa99' },     // Thin arms
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gnarled staff
  leg:       { shadow: '#140c1c', base: '#346524', highlight: '#854c30' },     // Robe bottom
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark feet
  belt:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Hanging moss
});

export const CRYSTAL_SENTINEL_COLORS = scheme('crystal_sentinel_default', {
  hair:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Crystal crown
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Crystal head
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Prismatic eyes
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Crystal body
  accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Inner glow
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },     // Crystal arms
  belt:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Floating shards
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Crystal legs
  boot:      { shadow: '#442434', base: '#30346d', highlight: '#597dce' },     // Crystal base
});

export const SMOKE_DEMON_COLORS = scheme('smoke_demon_default', {
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark wisps
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#757161' },     // Smoke head
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Glowing ember eyes
  face:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Glowing maw
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark smoke body
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Inner ember glow
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Tendrils
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Embers
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Lower wisp
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },     // Dissipation
});

export const CYBER_DRONE_COLORS = scheme('cyber_drone_default', {
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Antenna metal
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Sensor dome metal
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red sensor glow
  face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Face plate
  body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },     // Light metal body
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Blue panel lights
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal arms
  belt:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Jet glow
  leg:       { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Exhaust
  boot:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Thruster glow
});

export const VINE_CREEPER_COLORS = scheme('vine_creeper_default', {
  hair:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red-orange petals
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Green head
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Yellow glow eyes
  face:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark maw
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#854c30' },     // Green vine mass
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Brown thorns
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Vine tendrils
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Brown roots
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },     // Root tips
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Berry buds
});

export const BLOOD_KNIGHT_COLORS = scheme('blood_knight_default', {
  hair:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Crimson horned helm
  head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Crimson helm
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Burning red eyes
  face:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark visor slit
  body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Crimson armor
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold belt
  arm:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Crimson pauldrons
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Blood sword glow
  leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Crimson greaves
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark sabatons
});

export const FROST_WORM_COLORS = scheme('frost_worm_default', {
  hair:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Ice crown spikes
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Icy head
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Ice blue eyes
  face:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Pale mandibles
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Frozen segments
  arm:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Ice segment 2
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },     // Ice segment 3
  accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Ice crystals
  belt:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Segment rings
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Ground emergence
});

export const PHANTOM_THIEF_COLORS = scheme('phantom_thief_default', {
  hair:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },     // Spectral hood
  head:      { shadow: '#597dce', base: '#8595a1', highlight: '#d2aa99' },     // Ghostly head
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // White glowing eyes
  face:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },     // Dark mask
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },     // Spectral cloak
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Ghost arms
  accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Silver daggers
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Leather sash
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },     // Wispy form
  boot:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Spectral trail
});

export const MAGMA_CRAB_COLORS = scheme('magma_crab_default', {
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Eye stalks
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Orange glowing eyes
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark head plate
  face:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Hot mouth
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark shell
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Magma cracks glow
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Pincers
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Walking legs
  boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Leg tips
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Lava drip
});

export const THUNDER_HAWK_COLORS = scheme('thunder_hawk_default', {
  hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Golden crest
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Brown head
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Electric white eyes
  face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Yellow beak
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Brown body
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Golden wings
  accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Lightning sparks
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Tail feathers
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Steel talons
  belt:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Lightning trail
});

export const PUPPET_SOLDIER_COLORS = scheme('puppet_soldier_default', {
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal joints
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Wooden head
  eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue painted eyes
  face:      { shadow: '#d04648', base: '#d27d2c', highlight: '#d2aa99' },     // Red painted mouth
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Wooden torso
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Wooden arms
  hand:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },     // Pale hands
  accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Steel sword
  belt:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // White strings
  leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Wooden legs
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Brown shoes
});

export const ACID_BLOB_COLORS = scheme('acid_blob_default', {
  accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },     // Acid bubbles
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Toxic eyes
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Green dome
  face:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark mouth
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Green acid body
  arm:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },     // Dissolving drops
  belt:      { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },     // Inner bubbles
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Puddle base
  boot:      { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },     // Acid trail
});

export const BONE_SPIDER_COLORS = scheme('bone_spider_default', {
  head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },     // Skull bone
  eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Green soul fire
  face:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // White fangs
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Ribcage bone
  accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Spine highlight
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Left bone legs
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Right bone legs
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },     // Claw tips
  belt:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Silk thread
});

export const VOID_HOUND_COLORS = scheme('void_hound_default', {
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark ears
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark head
  eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Void purple-blue eyes
  face:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },     // Pale snout/fangs
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark body
  accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Shadow tendrils glow
  belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Shadow tail wisp
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark front legs
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark back legs + aura
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },     // Paws
});

// ════════════════════════════════════════════════════════════
// EXPORT RECORDS
// ════════════════════════════════════════════════════════════

export const ENEMY_BATCH3_TEMPLATES: Record<string, SpriteTemplate> = {
  frost_witch_16:        FROST_WITCH_16,
  sand_golem_16:         SAND_GOLEM_16,
  toxic_frog_16:         TOXIC_FROG_16,
  cave_spider_16:        CAVE_SPIDER_16,
  pirate_skeleton_16:    PIRATE_SKELETON_16,
  lava_beetle_16:        LAVA_BEETLE_16,
  swamp_hag_16:          SWAMP_HAG_16,
  crystal_sentinel_16:   CRYSTAL_SENTINEL_16,
  smoke_demon_16:        SMOKE_DEMON_16,
  cyber_drone_16:        CYBER_DRONE_16,
  vine_creeper_16:       VINE_CREEPER_16,
  blood_knight_16:       BLOOD_KNIGHT_16,
  frost_worm_16:         FROST_WORM_16,
  phantom_thief_16:      PHANTOM_THIEF_16,
  magma_crab_16:         MAGMA_CRAB_16,
  thunder_hawk_16:       THUNDER_HAWK_16,
  puppet_soldier_16:     PUPPET_SOLDIER_16,
  acid_blob_16:          ACID_BLOB_16,
  bone_spider_16:        BONE_SPIDER_16,
  void_hound_16:         VOID_HOUND_16,
};

export const ENEMY_BATCH3_COLOR_SCHEMES: Record<string, ColorScheme> = {
  frost_witch_default:        FROST_WITCH_COLORS,
  sand_golem_default:         SAND_GOLEM_COLORS,
  toxic_frog_default:         TOXIC_FROG_COLORS,
  cave_spider_default:        CAVE_SPIDER_COLORS,
  pirate_skeleton_default:    PIRATE_SKELETON_COLORS,
  lava_beetle_default:        LAVA_BEETLE_COLORS,
  swamp_hag_default:          SWAMP_HAG_COLORS,
  crystal_sentinel_default:   CRYSTAL_SENTINEL_COLORS,
  smoke_demon_default:        SMOKE_DEMON_COLORS,
  cyber_drone_default:        CYBER_DRONE_COLORS,
  vine_creeper_default:       VINE_CREEPER_COLORS,
  blood_knight_default:       BLOOD_KNIGHT_COLORS,
  frost_worm_default:         FROST_WORM_COLORS,
  phantom_thief_default:      PHANTOM_THIEF_COLORS,
  magma_crab_default:         MAGMA_CRAB_COLORS,
  thunder_hawk_default:       THUNDER_HAWK_COLORS,
  puppet_soldier_default:     PUPPET_SOLDIER_COLORS,
  acid_blob_default:          ACID_BLOB_COLORS,
  bone_spider_default:        BONE_SPIDER_COLORS,
  void_hound_default:         VOID_HOUND_COLORS,
};