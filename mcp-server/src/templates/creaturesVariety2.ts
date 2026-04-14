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

const CREATURE_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#d2aa99' },
  face:      { shadow: '#757161', base: '#d2aa99',  highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },
  body:      { shadow: '#442434', base: '#757161',  highlight: '#8595a1' },
  arm:       { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  hand:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  leg:       { shadow: '#30346d', base: '#4e4a4e',  highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof CREATURE_BASE>): ColorScheme {
  return { name, mapping: { ...CREATURE_BASE, ...overrides } };
}

// ─────────────────────────────────────────────────────────────
// 1. UNICORN — majestic horse with horn and flowing mane
// ─────────────────────────────────────────────────────────────
export const UNICORN_16: SpriteTemplate = {
  name: 'unicorn_16', width: 16, height: 16,
  description: 'Majestic fantasy horse with a spiraling horn and flowing mane.',
  regions: [
    { name: 'horn',    role: 'accessory', pixels: [[8,1],[8,2],[9,2]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(3,7,10),...hLine(4,6,11),...hLine(5,7,10)] },
    { name: 'eye',     role: 'eye',       pixels: [[9,4]] },
    { name: 'mane',    role: 'hair',      pixels: [[6,3],[6,4],[5,5],[5,6],[6,7]] },
    { name: 'neck',    role: 'body',      pixels: [...hLine(6,8,10),...hLine(7,7,11)] },
    { name: 'body',    role: 'body',      pixels: [...hLine(8,5,12),...hLine(9,4,12),...hLine(10,5,12),...hLine(11,5,11)] },
    { name: 'tail',    role: 'hair',      pixels: [[13,8],[14,9],[14,10],[13,11]] },
    { name: 'legs',    role: 'leg',       pixels: [...vLine(6,12,14),...vLine(8,12,14),...vLine(10,12,14),...vLine(12,12,14)] },
    { name: 'hooves',  role: 'boot',      pixels: [[6,15],[7,15],[8,15],[9,15],[10,15],[11,15],[12,15],[13,15]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 2. DIRE WOLF — large menacing wolf with heavy frame
// ─────────────────────────────────────────────────────────────
export const DIRE_WOLF_16: SpriteTemplate = {
  name: 'dire_wolf_16', width: 16, height: 16,
  description: 'Large menacing wolf with a heavy frame, bared fangs and thick fur.',
  regions: [
    { name: 'head',    role: 'head',      pixels: [...hLine(2,5,9),...hLine(3,4,10),...hLine(4,4,10),...hLine(5,5,9)] },
    { name: 'snout',   role: 'face',      pixels: [...hLine(5,6,9),...hLine(6,5,10)] },
    { name: 'eye',     role: 'eye',       pixels: [[5,3],[9,3]] },
    { name: 'ears',    role: 'accessory', pixels: [[4,1],[5,2],[9,2],[10,1]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(7,3,12),...hLine(8,3,12),...hLine(9,4,11),...hLine(10,5,11)] },
    { name: 'tail',    role: 'hair',      pixels: [[13,6],[14,5],[14,4],[13,4]] },
    { name: 'legs',    role: 'leg',       pixels: [...vLine(4,11,14),...vLine(6,11,14),...vLine(10,11,14),...vLine(12,11,14)] },
    { name: 'paws',    role: 'boot',      pixels: [[3,15],[4,15],[5,15],[6,15],[9,15],[10,15],[11,15],[12,15]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 3. SEA SERPENT — coiled ocean snake breaking the surface
// ─────────────────────────────────────────────────────────────
export const SEA_SERPENT_16: SpriteTemplate = {
  name: 'sea_serpent_16', width: 16, height: 16,
  description: 'Coiled sea serpent rising from waves with fanged jaws.',
  regions: [
    { name: 'head',    role: 'head',      pixels: [...hLine(1,9,13),...hLine(2,8,14),...hLine(3,9,13)] },
    { name: 'jaws',    role: 'face',      pixels: [...hLine(4,9,13),...hLine(5,10,13)] },
    { name: 'eye',     role: 'eye',       pixels: [[10,2],[11,2]] },
    { name: 'fangs',   role: 'accessory', pixels: [[10,5],[12,5]] },
    { name: 'neck',    role: 'body',      pixels: [...vLine(8,4,7),...vLine(9,3,7)] },
    { name: 'coil1',   role: 'body',      pixels: [...hLine(8,5,12),...hLine(9,5,12)] },
    { name: 'coil2',   role: 'belt',      pixels: [...hLine(10,3,9),...hLine(11,3,11),...hLine(12,4,11)] },
    { name: 'tail',    role: 'leg',       pixels: [...hLine(13,6,10),...hLine(14,7,9)] },
    { name: 'spines',  role: 'hair',      pixels: [[7,5],[7,6],[7,7],[8,8]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 4. GRIFFIN — eagle head + lion body mythical beast
// ─────────────────────────────────────────────────────────────
export const GRIFFIN_16: SpriteTemplate = {
  name: 'griffin_16', width: 16, height: 16,
  description: 'Mythical griffin with eagle head and beak, lion hindquarters, and proud wings.',
  regions: [
    { name: 'head',    role: 'head',      pixels: [...hLine(1,6,10),...hLine(2,5,11),...hLine(3,5,11),...hLine(4,6,10)] },
    { name: 'beak',    role: 'face',      pixels: [[7,4],[8,4],[7,5],[8,5],[7,6]] },
    { name: 'eye',     role: 'eye',       pixels: [[6,2],[9,2]] },
    { name: 'wing_l',  role: 'accessory', pixels: [...hLine(5,2,5),...hLine(6,1,5),...hLine(7,2,4)] },
    { name: 'wing_r',  role: 'accessory', pixels: [...hLine(5,11,14),...hLine(6,11,15),...hLine(7,12,14)] },
    { name: 'body',    role: 'body',      pixels: [...hLine(7,5,11),...hLine(8,4,12),...hLine(9,5,11),...hLine(10,5,11)] },
    { name: 'tail',    role: 'hair',      pixels: [[13,9],[14,10],[14,11],[13,12]] },
    { name: 'legs',    role: 'leg',       pixels: [...vLine(6,11,13),...vLine(9,11,13)] },
    { name: 'claws',   role: 'boot',      pixels: [[5,14],[6,14],[7,14],[8,14],[9,14],[10,14],[11,14]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 5. PEGASUS — winged horse soaring in profile
// ─────────────────────────────────────────────────────────────
export const PEGASUS_16: SpriteTemplate = {
  name: 'pegasus_16', width: 16, height: 16,
  description: 'Winged horse with feathered wings spread wide in flight.',
  regions: [
    { name: 'head',    role: 'head',      pixels: [...hLine(3,7,10),...hLine(4,6,11),...hLine(5,7,10)] },
    { name: 'eye',     role: 'eye',       pixels: [[9,4]] },
    { name: 'mane',    role: 'hair',      pixels: [[6,3],[5,4],[5,5],[6,6]] },
    { name: 'wing_up', role: 'accessory', pixels: [...hLine(1,4,11),...hLine(2,3,12),...hLine(3,3,6),...hLine(4,2,4)] },
    { name: 'wing_dn', role: 'accessory', pixels: [...hLine(8,2,5),...hLine(9,1,4),...hLine(10,2,4)] },
    { name: 'body',    role: 'body',      pixels: [...hLine(6,7,12),...hLine(7,7,12),...hLine(8,6,12),...hLine(9,7,11)] },
    { name: 'tail',    role: 'hair',      pixels: [[13,7],[14,8],[14,9],[13,10]] },
    { name: 'legs',    role: 'leg',       pixels: [...vLine(8,10,12),...vLine(11,10,12)] },
    { name: 'hooves',  role: 'boot',      pixels: [[7,13],[8,13],[10,13],[11,13],[12,13]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 6. GIANT RAT — oversized dungeon rat, hunched posture
// ─────────────────────────────────────────────────────────────
export const GIANT_RAT_16: SpriteTemplate = {
  name: 'giant_rat_16', width: 16, height: 16,
  description: 'Oversized dungeon rat with beady eyes, long tail, and scruffy fur.',
  regions: [
    { name: 'head',    role: 'head',      pixels: [...hLine(5,4,8),...hLine(6,3,9),...hLine(7,4,9)] },
    { name: 'snout',   role: 'face',      pixels: [[3,7],[4,7],[3,8],[4,8]] },
    { name: 'eye',     role: 'eye',       pixels: [[5,6],[8,6]] },
    { name: 'ears',    role: 'accessory', pixels: [[4,4],[5,3],[6,3],[8,3],[9,4]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(8,5,12),...hLine(9,5,12),...hLine(10,6,11),...hLine(11,7,10)] },
    { name: 'tail',    role: 'belt',      pixels: [[13,8],[14,9],[15,10],[15,11],[14,12]] },
    { name: 'legs',    role: 'leg',       pixels: [[5,12],[6,12],[5,13],[9,12],[10,12],[9,13]] },
    { name: 'claws',   role: 'boot',      pixels: [[4,14],[5,14],[6,14],[8,14],[9,14],[10,14]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 7. FIRE SALAMANDER — flame-backed lizard on hot rock
// ─────────────────────────────────────────────────────────────
export const FIRE_SALAMANDER_16: SpriteTemplate = {
  name: 'fire_salamander_16', width: 16, height: 16,
  description: 'Elemental fire salamander with flame dorsal fins and ember-bright eyes.',
  regions: [
    { name: 'flames',  role: 'accessory', pixels: [[6,1],[7,1],[8,2],[9,1],[10,2],[11,1],[8,3],[10,3]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(4,5,9),...hLine(5,4,10),...hLine(6,5,10)] },
    { name: 'eye',     role: 'eye',       pixels: [[6,5],[9,5]] },
    { name: 'tongue',  role: 'face',      pixels: [[4,7],[3,8]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(7,5,12),...hLine(8,5,12),...hLine(9,6,11),...hLine(10,7,11)] },
    { name: 'spots',   role: 'belt',      pixels: [[7,8],[9,8],[11,8],[8,9],[10,9]] },
    { name: 'legs',    role: 'leg',       pixels: [[4,8],[5,8],[4,9],[12,8],[13,8],[12,9]] },
    { name: 'tail',    role: 'leg',       pixels: [[12,10],[13,11],[13,12],[12,13]] },
    { name: 'feet',    role: 'boot',      pixels: [[3,10],[4,10],[5,10],[12,10],[13,10]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 8. SHADOW CAT — dark spectral cat with ghostly wisps
// ─────────────────────────────────────────────────────────────
export const SHADOW_CAT_16: SpriteTemplate = {
  name: 'shadow_cat_16', width: 16, height: 16,
  description: 'Dark spectral cat with glowing eyes, dissolving tail, and wispy outline.',
  regions: [
    { name: 'wisps',   role: 'accessory', pixels: [[2,3],[2,4],[14,4],[14,5],[8,1]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(3,6,10),...hLine(4,5,11),...hLine(5,5,11),...hLine(6,6,10)] },
    { name: 'ears',    role: 'hair',      pixels: [[5,2],[6,2],[5,3],[9,2],[10,2],[10,3]] },
    { name: 'eye',     role: 'eye',       pixels: [[6,5],[7,5],[9,5],[10,5]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(7,5,11),...hLine(8,4,12),...hLine(9,5,11),...hLine(10,6,10)] },
    { name: 'tail',    role: 'belt',      pixels: [[12,8],[13,7],[14,6],[14,7],[13,8]] },
    { name: 'legs',    role: 'leg',       pixels: [[5,11],[6,11],[5,12],[9,11],[10,11],[10,12]] },
    { name: 'paws',    role: 'boot',      pixels: [[4,13],[5,13],[6,13],[9,13],[10,13],[11,13]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 9. MECHANICAL SPIDER — steampunk clockwork spider
// ─────────────────────────────────────────────────────────────
export const MECHANICAL_SPIDER_16: SpriteTemplate = {
  name: 'mechanical_spider_16', width: 16, height: 16,
  description: 'Steampunk mechanical spider with gear-driven legs and a lens eye.',
  regions: [
    { name: 'body',    role: 'body',      pixels: [...rect(5,5,10,9)] },
    { name: 'head',    role: 'head',      pixels: [...rect(6,3,9,5)] },
    { name: 'eye',     role: 'eye',       pixels: [[7,4],[8,4]] },
    { name: 'gears',   role: 'accessory', pixels: [[5,5],[10,5],[5,9],[10,9]] },
    { name: 'legs_l',  role: 'leg',       pixels: [[4,5],[3,4],[2,3],[4,7],[3,7],[2,7],[4,9],[3,10],[2,11],[4,10],[3,11]] },
    { name: 'legs_r',  role: 'leg',       pixels: [[11,5],[12,4],[13,3],[11,7],[12,7],[13,7],[11,9],[12,10],[13,11],[11,10],[12,11]] },
    { name: 'rivets',  role: 'belt',      pixels: [[6,6],[9,6],[6,8],[9,8],[7,7]] },
    { name: 'exhaust', role: 'hair',      pixels: [[7,2],[8,2],[7,1]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 10. CRYSTAL BUTTERFLY — glowing translucent butterfly
// ─────────────────────────────────────────────────────────────
export const CRYSTAL_BUTTERFLY_16: SpriteTemplate = {
  name: 'crystal_butterfly_16', width: 16, height: 16,
  description: 'Glowing crystal butterfly with iridescent wing facets and delicate antennae.',
  regions: [
    { name: 'antennae', role: 'hair',     pixels: [[6,1],[5,2],[10,1],[11,2]] },
    { name: 'body',     role: 'body',     pixels: [...vLine(8,3,12)] },
    { name: 'head',     role: 'head',     pixels: [[7,3],[8,3],[9,3],[7,4],[9,4]] },
    { name: 'eye',      role: 'eye',      pixels: [[8,4]] },
    { name: 'wing_tl',  role: 'accessory',pixels: [...hLine(4,4,7),...hLine(5,3,7),...hLine(6,3,7),...hLine(7,4,7)] },
    { name: 'wing_tr',  role: 'accessory',pixels: [...hLine(4,9,12),...hLine(5,9,13),...hLine(6,9,13),...hLine(7,9,12)] },
    { name: 'wing_bl',  role: 'belt',     pixels: [...hLine(9,4,7),...hLine(10,5,7),...hLine(11,5,7),...hLine(12,6,7)] },
    { name: 'wing_br',  role: 'belt',     pixels: [...hLine(9,9,12),...hLine(10,9,11),...hLine(11,9,11),...hLine(12,9,10)] },
    { name: 'facets',   role: 'face',     pixels: [[5,5],[6,6],[11,5],[10,6]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 11. SAND WORM — desert burrower emerging from the ground
// ─────────────────────────────────────────────────────────────
export const SAND_WORM_16: SpriteTemplate = {
  name: 'sand_worm_16', width: 16, height: 16,
  description: 'Massive desert burrowing worm erupting from the sand with a ringed maw.',
  regions: [
    { name: 'maw',     role: 'face',      pixels: [...hLine(1,5,10),...hLine(2,4,11),...hLine(3,4,11),...hLine(4,5,10)] },
    { name: 'teeth',   role: 'accessory', pixels: [[5,2],[7,1],[9,1],[11,2],[5,4],[7,4],[9,4],[11,4]] },
    { name: 'eye_l',   role: 'eye',       pixels: [[5,3],[6,3]] },
    { name: 'eye_r',   role: 'eye',       pixels: [[9,3],[10,3]] },
    { name: 'ring1',   role: 'head',      pixels: [...hLine(5,5,10),...hLine(6,5,10)] },
    { name: 'ring2',   role: 'body',      pixels: [...hLine(7,5,10),...hLine(8,6,9)] },
    { name: 'ring3',   role: 'belt',      pixels: [...hLine(9,5,10),...hLine(10,5,10)] },
    { name: 'body',    role: 'body',      pixels: [...hLine(11,5,10),...hLine(12,5,10),...hLine(13,6,9)] },
    { name: 'sand',    role: 'leg',       pixels: [...hLine(14,3,12)] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 12. ELECTRIC EEL — sparking bioluminescent water creature
// ─────────────────────────────────────────────────────────────
export const ELECTRIC_EEL_16: SpriteTemplate = {
  name: 'electric_eel_16', width: 16, height: 16,
  description: 'Sparking electric eel coiled in water with crackling discharge nodes.',
  regions: [
    { name: 'head',    role: 'head',      pixels: [...hLine(2,10,14),...hLine(3,9,15),...hLine(4,10,14)] },
    { name: 'eye',     role: 'eye',       pixels: [[11,3],[12,3]] },
    { name: 'sparks',  role: 'accessory', pixels: [[15,3],[15,4],[14,2],[13,1],[15,5]] },
    { name: 'body1',   role: 'body',      pixels: [...hLine(5,7,13),...hLine(6,7,13)] },
    { name: 'body2',   role: 'body',      pixels: [...hLine(7,4,11),...hLine(8,4,11)] },
    { name: 'body3',   role: 'belt',      pixels: [...hLine(9,2,9),...hLine(10,2,9)] },
    { name: 'tail',    role: 'leg',       pixels: [...hLine(11,1,6),...hLine(12,2,5),...hLine(13,3,4)] },
    { name: 'nodes',   role: 'face',      pixels: [[9,6],[8,7],[10,8],[6,10],[8,11]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 13. ICE FOX — frost-covered fox with icicle fur tips
// ─────────────────────────────────────────────────────────────
export const ICE_FOX_16: SpriteTemplate = {
  name: 'ice_fox_16', width: 16, height: 16,
  description: 'Frost-covered arctic fox with crystalline fur tips and icy blue eyes.',
  regions: [
    { name: 'head',    role: 'head',      pixels: [...hLine(3,5,9),...hLine(4,4,10),...hLine(5,5,9)] },
    { name: 'snout',   role: 'face',      pixels: [[4,5],[4,6],[5,6],[3,7],[4,7]] },
    { name: 'eye',     role: 'eye',       pixels: [[6,4],[9,4]] },
    { name: 'ears',    role: 'hair',      pixels: [[4,2],[5,1],[5,2],[8,2],[9,1],[10,2]] },
    { name: 'frost',   role: 'accessory', pixels: [[4,1],[5,0],[6,0],[8,0],[9,0],[10,1]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(6,7,12),...hLine(7,7,12),...hLine(8,7,12),...hLine(9,8,11)] },
    { name: 'tail',    role: 'belt',      pixels: [...hLine(7,13,15),...hLine(8,13,15),...hLine(9,12,14)] },
    { name: 'legs',    role: 'leg',       pixels: [...vLine(7,10,12),...vLine(9,10,12),...vLine(11,10,12)] },
    { name: 'paws',    role: 'boot',      pixels: [[6,13],[7,13],[8,13],[9,13],[10,13],[11,13],[12,13]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 14. PLAGUE RAT — sickly green glowing diseased rat
// ─────────────────────────────────────────────────────────────
export const PLAGUE_RAT_16: SpriteTemplate = {
  name: 'plague_rat_16', width: 16, height: 16,
  description: 'Sickly diseased rat with glowing green pustules and a mangy scabrous hide.',
  regions: [
    { name: 'head',    role: 'head',      pixels: [...hLine(4,4,8),...hLine(5,3,9),...hLine(6,4,9)] },
    { name: 'snout',   role: 'face',      pixels: [[3,6],[4,6],[3,7],[4,7]] },
    { name: 'eye',     role: 'eye',       pixels: [[5,5],[8,5]] },
    { name: 'ears',    role: 'accessory', pixels: [[4,3],[5,2],[8,2],[9,3]] },
    { name: 'pustules',role: 'hand',      pixels: [[7,6],[6,8],[9,8],[8,10],[10,9]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(7,5,11),...hLine(8,5,11),...hLine(9,6,10),...hLine(10,7,10)] },
    { name: 'tail',    role: 'belt',      pixels: [[12,7],[13,8],[14,9],[14,10],[13,11],[12,12]] },
    { name: 'legs',    role: 'leg',       pixels: [[4,11],[5,11],[4,12],[9,11],[10,11],[9,12]] },
    { name: 'claws',   role: 'boot',      pixels: [[3,13],[4,13],[5,13],[8,13],[9,13],[10,13]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 15. LAVA SLUG — molten slug leaving a scorching trail
// ─────────────────────────────────────────────────────────────
export const LAVA_SLUG_16: SpriteTemplate = {
  name: 'lava_slug_16', width: 16, height: 16,
  description: 'Molten lava slug with a glowing underbelly and cracked magma shell.',
  regions: [
    { name: 'head',    role: 'head',      pixels: [...hLine(5,3,8),...hLine(6,2,9),...hLine(7,3,9)] },
    { name: 'eye',     role: 'eye',       pixels: [[4,5],[5,5]] },
    { name: 'eyestalk',role: 'hair',      pixels: [...vLine(4,3,5),...vLine(5,2,4)] },
    { name: 'body',    role: 'body',      pixels: [...hLine(8,3,11),...hLine(9,3,12),...hLine(10,4,12),...hLine(11,5,11)] },
    { name: 'cracks',  role: 'accessory', pixels: [[5,9],[7,8],[9,9],[11,8],[6,10],[10,10]] },
    { name: 'underbelly',role:'belt',     pixels: [...hLine(12,4,10)] },
    { name: 'trail',   role: 'leg',       pixels: [...hLine(13,5,9),...hLine(14,6,8)] },
    { name: 'glow',    role: 'face',      pixels: [[5,10],[8,9],[11,9],[6,11],[9,11]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 16. SPIRIT DEER — ethereal antlered deer glowing with life energy
// ─────────────────────────────────────────────────────────────
export const SPIRIT_DEER_16: SpriteTemplate = {
  name: 'spirit_deer_16', width: 16, height: 16,
  description: 'Ethereal spirit deer with branching antlers and a glow emanating from within.',
  regions: [
    { name: 'antler_l',role: 'accessory', pixels: [[5,1],[4,2],[3,1],[5,2],[6,2],[5,3]] },
    { name: 'antler_r',role: 'accessory', pixels: [[10,1],[11,2],[12,1],[10,2],[9,2],[10,3]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(4,6,10),...hLine(5,5,11),...hLine(6,6,10)] },
    { name: 'eye',     role: 'eye',       pixels: [[6,5],[10,5]] },
    { name: 'neck',    role: 'body',      pixels: [...hLine(7,7,9),...hLine(8,7,10)] },
    { name: 'body',    role: 'body',      pixels: [...hLine(9,5,12),...hLine(10,5,12),...hLine(11,6,11)] },
    { name: 'glow',    role: 'face',      pixels: [[7,9],[9,9],[8,10],[6,10],[11,10],[7,11],[10,11]] },
    { name: 'tail',    role: 'hair',      pixels: [[13,9],[14,10],[13,11]] },
    { name: 'legs',    role: 'leg',       pixels: [...vLine(6,12,14),...vLine(8,12,14),...vLine(10,12,14),...vLine(12,12,14)] },
    { name: 'hooves',  role: 'boot',      pixels: [[6,15],[7,15],[8,15],[9,15],[10,15],[11,15],[12,15]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 17. ROCK CRAB — stone-armored crab with boulder claws
// ─────────────────────────────────────────────────────────────
export const ROCK_CRAB_16: SpriteTemplate = {
  name: 'rock_crab_16', width: 16, height: 16,
  description: 'Stone-armored crab with massive boulder claws and mossy shell texture.',
  regions: [
    { name: 'shell',   role: 'body',      pixels: [...hLine(5,4,11),...hLine(6,3,12),...hLine(7,3,12),...hLine(8,4,11),...hLine(9,5,10)] },
    { name: 'head',    role: 'head',      pixels: [...hLine(5,6,9),...hLine(6,5,10)] },
    { name: 'eye',     role: 'eye',       pixels: [[6,5],[9,5]] },
    { name: 'claw_l',  role: 'arm',       pixels: [...hLine(7,0,3),...hLine(8,0,3),...hLine(9,1,3),[0,7],[1,8],[0,9]] },
    { name: 'claw_r',  role: 'arm',       pixels: [...hLine(7,12,15),...hLine(8,12,15),...hLine(9,12,14),[15,7],[14,8],[15,9]] },
    { name: 'legs',    role: 'leg',       pixels: [[3,9],[3,10],[2,11],[12,9],[12,10],[13,11],[4,10],[4,11],[11,10],[11,11]] },
    { name: 'moss',    role: 'accessory', pixels: [[5,4],[7,3],[10,3],[11,5],[6,8],[9,8]] },
    { name: 'belly',   role: 'face',      pixels: [...hLine(10,5,10)] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 18. EMBER MOTH — fire-winged moth drawn to flames
// ─────────────────────────────────────────────────────────────
export const EMBER_MOTH_16: SpriteTemplate = {
  name: 'ember_moth_16', width: 16, height: 16,
  description: 'Flame-winged moth with burning wing patterns and ember-tipped antennae.',
  regions: [
    { name: 'antennae',role: 'hair',      pixels: [[5,1],[4,2],[5,2],[10,1],[11,2],[10,2]] },
    { name: 'embers',  role: 'accessory', pixels: [[3,2],[4,1],[11,1],[12,2]] },
    { name: 'body',    role: 'body',      pixels: [...vLine(8,3,13)] },
    { name: 'head',    role: 'head',      pixels: [[7,3],[8,3],[9,3],[7,4],[9,4]] },
    { name: 'eye',     role: 'eye',       pixels: [[8,4]] },
    { name: 'wing_tl', role: 'belt',      pixels: [...hLine(4,3,7),...hLine(5,2,7),...hLine(6,2,7),...hLine(7,3,7)] },
    { name: 'wing_tr', role: 'belt',      pixels: [...hLine(4,9,13),...hLine(5,9,14),...hLine(6,9,14),...hLine(7,9,13)] },
    { name: 'wing_bl', role: 'face',      pixels: [...hLine(9,4,7),...hLine(10,5,7),...hLine(11,6,7),...hLine(12,7,7)] },
    { name: 'wing_br', role: 'face',      pixels: [...hLine(9,9,12),...hLine(10,9,11),...hLine(11,9,10),...hLine(12,9,9)] },
    { name: 'hotspot', role: 'eye',       pixels: [[5,5],[11,5],[6,10],[10,10]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 19. VOID TENTACLE — eldritch tentacle rising from darkness
// ─────────────────────────────────────────────────────────────
export const VOID_TENTACLE_16: SpriteTemplate = {
  name: 'void_tentacle_16', width: 16, height: 16,
  description: 'Eldritch void tentacle with pulsing suckers, rising from an inky portal.',
  regions: [
    { name: 'portal',  role: 'body',      pixels: [...hLine(13,3,12),...hLine(14,2,13),...hLine(15,3,12)] },
    { name: 'base',    role: 'leg',       pixels: [...hLine(11,5,10),...hLine(12,5,10)] },
    { name: 'mid',     role: 'belt',      pixels: [...hLine(8,6,11),...hLine(9,5,10),...hLine(10,4,9)] },
    { name: 'tip',     role: 'head',      pixels: [...hLine(5,8,10),...hLine(6,7,10),...hLine(7,8,9)] },
    { name: 'tip_end', role: 'face',      pixels: [...hLine(3,9,11),...hLine(4,8,11)] },
    { name: 'eye',     role: 'eye',       pixels: [[10,4],[11,4],[10,5],[11,5]] },
    { name: 'suckers', role: 'accessory', pixels: [[7,9],[9,9],[6,11],[8,11],[10,11],[7,13],[9,13]] },
    { name: 'glow',    role: 'hair',      pixels: [[10,3],[12,5],[11,7],[9,9],[8,12]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 20. CORAL SEAHORSE — colorful ocean seahorse
// ─────────────────────────────────────────────────────────────
export const CORAL_SEAHORSE_16: SpriteTemplate = {
  name: 'coral_seahorse_16', width: 16, height: 16,
  description: 'Colorful coral reef seahorse with bony armor plates and dorsal fin.',
  regions: [
    { name: 'snout',   role: 'face',      pixels: [...hLine(2,8,12),...hLine(3,7,11)] },
    { name: 'head',    role: 'head',      pixels: [...hLine(4,6,10),...hLine(5,5,10),...hLine(6,6,9)] },
    { name: 'crown',   role: 'hair',      pixels: [[6,2],[7,1],[8,2],[7,3],[8,3]] },
    { name: 'eye',     role: 'eye',       pixels: [[7,5],[8,5]] },
    { name: 'dorsal',  role: 'accessory', pixels: [[4,5],[4,6],[4,7],[3,7],[3,8],[4,8]] },
    { name: 'neck',    role: 'body',      pixels: [...hLine(7,7,9),...hLine(8,7,9)] },
    { name: 'body',    role: 'body',      pixels: [...hLine(9,7,9),...hLine(10,7,10),...hLine(11,8,10),...hLine(12,9,10)] },
    { name: 'plates',  role: 'belt',      pixels: [[8,10],[9,10],[7,11],[8,11],[7,12],[8,12],[8,13]] },
    { name: 'tail',    role: 'leg',       pixels: [[10,12],[11,13],[11,14],[10,14],[9,14],[9,13]] },
    { name: 'fin',     role: 'arm',       pixels: [[5,8],[5,9],[5,10],[6,10]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// COLOR SCHEMES
// ─────────────────────────────────────────────────────────────
export const UNICORN_COLORS = scheme('unicorn_default', {
  head:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  hair:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  body:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  leg:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  eye:       { shadow: '#6dc2ca', base: '#6dc2ca', highlight: '#deeed6' },
});

export const DIRE_WOLF_COLORS = scheme('dire_wolf_default', {
  head:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  face:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  hair:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
});

export const SEA_SERPENT_COLORS = scheme('sea_serpent_default', {
  head:      { shadow: '#30346d', base: '#346524', highlight: '#6daa2c' },
  face:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  body:      { shadow: '#30346d', base: '#346524', highlight: '#6daa2c' },
  belt:      { shadow: '#140c1c', base: '#30346d', highlight: '#346524' },
  leg:       { shadow: '#4e4a4e', base: '#30346d', highlight: '#597dce' },
  hair:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  eye:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
  accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
});

export const GRIFFIN_COLORS = scheme('griffin_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  face:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
});

export const PEGASUS_COLORS = scheme('pegasus_default', {
  head:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  hair:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  leg:       { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#6dc2ca', base: '#6dc2ca', highlight: '#deeed6' },
});

export const GIANT_RAT_COLORS = scheme('giant_rat_default', {
  head:      { shadow: '#442434', base: '#757161', highlight: '#8595a1' },
  face:      { shadow: '#442434', base: '#d2aa99', highlight: '#deeed6' },
  body:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#442434', base: '#757161', highlight: '#8595a1' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
});

export const FIRE_SALAMANDER_COLORS = scheme('fire_salamander_default', {
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  face:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
});

export const SHADOW_CAT_COLORS = scheme('shadow_cat_default', {
  head:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  body:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  leg:       { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
});

export const MECHANICAL_SPIDER_COLORS = scheme('mechanical_spider_default', {
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  body:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  hair:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
});

export const CRYSTAL_BUTTERFLY_COLORS = scheme('crystal_butterfly_default', {
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  hair:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  face:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
});

export const SAND_WORM_COLORS = scheme('sand_worm_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg:       { shadow: '#757161', base: '#d27d2c', highlight: '#dad45e' },
  face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
});

export const ELECTRIC_EEL_COLORS = scheme('electric_eel_default', {
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
  leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  face:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
});

export const ICE_FOX_COLORS = scheme('ice_fox_default', {
  head:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  face:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  hair:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#597dce', base: '#8595a1', highlight: '#deeed6' },
  leg:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
});

export const PLAGUE_RAT_COLORS = scheme('plague_rat_default', {
  head:      { shadow: '#346524', base: '#4e4a4e', highlight: '#757161' },
  face:      { shadow: '#442434', base: '#757161', highlight: '#d2aa99' },
  body:      { shadow: '#346524', base: '#4e4a4e', highlight: '#757161' },
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  leg:       { shadow: '#346524', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  hand:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
});

export const LAVA_SLUG_COLORS = scheme('lava_slug_default', {
  head:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
  face:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  hair:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d04648' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  leg:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
});

export const SPIRIT_DEER_COLORS = scheme('spirit_deer_default', {
  head:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  face:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  hair:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  boot:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
  accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
});

export const ROCK_CRAB_COLORS = scheme('rock_crab_default', {
  head:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  face:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
});

export const EMBER_MOTH_COLORS = scheme('ember_moth_default', {
  head:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
});

export const VOID_TENTACLE_COLORS = scheme('void_tentacle_default', {
  head:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
  face:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
  hair:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  body:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  leg:       { shadow: '#140c1c', base: '#140c1c', highlight: '#30346d' },
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
});

export const CORAL_SEAHORSE_COLORS = scheme('coral_seahorse_default', {
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  face:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  hair:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#d2aa99' },
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
});

// ─────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────
export const CREATURE_BATCH2_TEMPLATES: Record<string, SpriteTemplate> = {
  unicorn_16:            UNICORN_16,
  dire_wolf_16:          DIRE_WOLF_16,
  sea_serpent_16:        SEA_SERPENT_16,
  griffin_16:            GRIFFIN_16,
  pegasus_16:            PEGASUS_16,
  giant_rat_16:          GIANT_RAT_16,
  fire_salamander_16:    FIRE_SALAMANDER_16,
  shadow_cat_16:         SHADOW_CAT_16,
  mechanical_spider_16:  MECHANICAL_SPIDER_16,
  crystal_butterfly_16:  CRYSTAL_BUTTERFLY_16,
  sand_worm_16:          SAND_WORM_16,
  electric_eel_16:       ELECTRIC_EEL_16,
  ice_fox_16:            ICE_FOX_16,
  plague_rat_16:         PLAGUE_RAT_16,
  lava_slug_16:          LAVA_SLUG_16,
  spirit_deer_16:        SPIRIT_DEER_16,
  rock_crab_16:          ROCK_CRAB_16,
  ember_moth_16:         EMBER_MOTH_16,
  void_tentacle_16:      VOID_TENTACLE_16,
  coral_seahorse_16:     CORAL_SEAHORSE_16,
};

export const CREATURE_BATCH2_COLOR_SCHEMES: Record<string, ColorScheme> = {
  unicorn_default:            UNICORN_COLORS,
  dire_wolf_default:          DIRE_WOLF_COLORS,
  sea_serpent_default:        SEA_SERPENT_COLORS,
  griffin_default:            GRIFFIN_COLORS,
  pegasus_default:            PEGASUS_COLORS,
  giant_rat_default:          GIANT_RAT_COLORS,
  fire_salamander_default:    FIRE_SALAMANDER_COLORS,
  shadow_cat_default:         SHADOW_CAT_COLORS,
  mechanical_spider_default:  MECHANICAL_SPIDER_COLORS,
  crystal_butterfly_default:  CRYSTAL_BUTTERFLY_COLORS,
  sand_worm_default:          SAND_WORM_COLORS,
  electric_eel_default:       ELECTRIC_EEL_COLORS,
  ice_fox_default:            ICE_FOX_COLORS,
  plague_rat_default:         PLAGUE_RAT_COLORS,
  lava_slug_default:          LAVA_SLUG_COLORS,
  spirit_deer_default:        SPIRIT_DEER_COLORS,
  rock_crab_default:          ROCK_CRAB_COLORS,
  ember_moth_default:         EMBER_MOTH_COLORS,
  void_tentacle_default:      VOID_TENTACLE_COLORS,
  coral_seahorse_default:     CORAL_SEAHORSE_COLORS,
};
