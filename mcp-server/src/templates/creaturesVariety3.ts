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

const CREATURE3_BASE = {
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

function scheme(name: string, overrides: Partial<typeof CREATURE3_BASE>): ColorScheme {
  return { name, mapping: { ...CREATURE3_BASE, ...overrides } };
}

// ─────────────────────────────────────────────────────────────
// 1. HAMSTER — tiny round pet with stubby legs and cheek pouches
// ─────────────────────────────────────────────────────────────
export const HAMSTER_16: SpriteTemplate = {
  name: 'hamster_16', width: 16, height: 16,
  description: 'Tiny round hamster pet with puffy cheek pouches, stubby legs, and a nubby tail.',
  regions: [
    { name: 'ears',    role: 'accessory', pixels: [[5,3],[6,3],[9,3],[10,3]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(4,5,10),...hLine(5,4,11),...hLine(6,4,11)] },
    { name: 'eyes',    role: 'eye',       pixels: [[6,5],[9,5]] },
    { name: 'cheeks',  role: 'face',      pixels: [[4,6],[5,6],[10,6],[11,6]] },
    { name: 'nose',    role: 'belt',      pixels: [[7,6],[8,6]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(7,4,11),...hLine(8,4,11),...hLine(9,5,10),...hLine(10,5,10)] },
    { name: 'belly',   role: 'face',      pixels: [[7,8],[8,8],[7,9],[8,9]] },
    { name: 'legs',    role: 'leg',       pixels: [[5,11],[6,11],[9,11],[10,11]] },
    { name: 'paws',    role: 'boot',      pixels: [[5,12],[6,12],[9,12],[10,12]] },
    { name: 'tail',    role: 'hair',      pixels: [[12,9],[13,8]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 2. PARROT — colorful tropical bird with curved beak
// ─────────────────────────────────────────────────────────────
export const PARROT_16: SpriteTemplate = {
  name: 'parrot_16', width: 16, height: 16,
  description: 'Colorful tropical parrot perched sideways with curved beak and long tail feathers.',
  regions: [
    { name: 'crest',   role: 'accessory', pixels: [[8,1],[9,1],[10,1],[9,2]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(2,7,10),...hLine(3,6,11),...hLine(4,6,11)] },
    { name: 'eyes',    role: 'eye',       pixels: [[8,3],[10,3]] },
    { name: 'beak',    role: 'belt',      pixels: [[5,4],[5,5],[6,5]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(5,7,11),...hLine(6,7,11),...hLine(7,7,11),...hLine(8,7,10)] },
    { name: 'wing',    role: 'arm',       pixels: [...hLine(6,11,13),...hLine(7,11,13),...hLine(8,10,12)] },
    { name: 'belly',   role: 'face',      pixels: [[7,7],[7,8],[8,7],[8,8]] },
    { name: 'tail',    role: 'hair',      pixels: [...hLine(9,8,10),...hLine(10,9,10),...hLine(11,9,11),...hLine(12,10,11)] },
    { name: 'legs',    role: 'leg',       pixels: [[7,9],[8,9],[7,10],[8,10]] },
    { name: 'perch',   role: 'boot',      pixels: [...hLine(11,5,9)] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 3. PANDA — round bear with distinctive black and white markings
// ─────────────────────────────────────────────────────────────
export const PANDA_16: SpriteTemplate = {
  name: 'panda_16', width: 16, height: 16,
  description: 'Cute round panda bear sitting with black eye patches and round ears.',
  regions: [
    { name: 'ears',    role: 'accessory', pixels: [[4,1],[5,1],[10,1],[11,1]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(2,5,10),...hLine(3,4,11),...hLine(4,4,11),...hLine(5,5,10)] },
    { name: 'eye_patches', role: 'body',  pixels: [[5,3],[6,3],[5,4],[6,4],[9,3],[10,3],[9,4],[10,4]] },
    { name: 'eyes',    role: 'eye',       pixels: [[6,3],[9,3]] },
    { name: 'nose',    role: 'belt',      pixels: [[7,5],[8,5]] },
    { name: 'body',    role: 'head',      pixels: [...hLine(6,5,10),...hLine(7,4,11),...hLine(8,4,11),...hLine(9,5,10)] },
    { name: 'arms',    role: 'body',      pixels: [[3,7],[3,8],[4,7],[12,7],[12,8],[11,7]] },
    { name: 'belly',   role: 'face',      pixels: [[7,7],[8,7],[7,8],[8,8]] },
    { name: 'legs',    role: 'body',      pixels: [[5,10],[6,10],[9,10],[10,10],[5,11],[6,11],[9,11],[10,11]] },
    { name: 'paws',    role: 'boot',      pixels: [[5,12],[6,12],[9,12],[10,12]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 4. CHAMELEON — color-changing lizard on a branch with curled tail
// ─────────────────────────────────────────────────────────────
export const CHAMELEON_16: SpriteTemplate = {
  name: 'chameleon_16', width: 16, height: 16,
  description: 'Color-changing chameleon on a branch with a curled tail and swiveling eye dome.',
  regions: [
    { name: 'crest',   role: 'accessory', pixels: [[3,3],[4,2],[5,2],[4,3]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(4,3,7),...hLine(5,3,8),...hLine(6,3,7)] },
    { name: 'eyes',    role: 'eye',       pixels: [[4,4],[7,4]] },
    { name: 'tongue',  role: 'face',      pixels: [[2,6],[1,6]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(7,5,11),...hLine(8,5,12),...hLine(9,6,12)] },
    { name: 'stripe',  role: 'belt',      pixels: [[6,7],[8,7],[10,7],[7,8],[9,8],[11,8]] },
    { name: 'legs_f',  role: 'leg',       pixels: [[5,10],[6,10],[5,11],[6,11]] },
    { name: 'legs_b',  role: 'leg',       pixels: [[11,10],[12,10],[11,11],[12,11]] },
    { name: 'tail',    role: 'hair',      pixels: [[13,8],[14,7],[14,6],[13,5],[12,5],[12,6]] },
    { name: 'branch',  role: 'boot',      pixels: [...hLine(12,3,13)] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 5. AXOLOTL — pink aquatic creature with frilly gills
// ─────────────────────────────────────────────────────────────
export const AXOLOTL_16: SpriteTemplate = {
  name: 'axolotl_16', width: 16, height: 16,
  description: 'Cute pink axolotl with frilly external gills, wide smile, and paddle tail.',
  regions: [
    { name: 'gills_l', role: 'accessory', pixels: [[2,2],[3,2],[2,3],[3,3],[1,3],[2,4]] },
    { name: 'gills_r', role: 'accessory', pixels: [[12,2],[13,2],[12,3],[13,3],[14,3],[13,4]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(3,4,11),...hLine(4,4,11),...hLine(5,5,10)] },
    { name: 'eyes',    role: 'eye',       pixels: [[5,4],[10,4]] },
    { name: 'mouth',   role: 'face',      pixels: [[7,5],[8,5]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(6,5,10),...hLine(7,5,10),...hLine(8,6,9)] },
    { name: 'belly',   role: 'face',      pixels: [[7,7],[8,7],[7,8],[8,8]] },
    { name: 'legs_f',  role: 'leg',       pixels: [[4,7],[4,8],[5,8],[11,7],[11,8],[10,8]] },
    { name: 'legs_b',  role: 'leg',       pixels: [[5,9],[5,10],[10,9],[10,10]] },
    { name: 'tail',    role: 'hair',      pixels: [...hLine(9,7,9),...hLine(10,7,10),...hLine(11,8,10),...hLine(12,9,10)] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 6. RACCOON — masked critter with ringed tail
// ─────────────────────────────────────────────────────────────
export const RACCOON_16: SpriteTemplate = {
  name: 'raccoon_16', width: 16, height: 16,
  description: 'Scruffy raccoon with black mask markings, striped bushy tail, and nimble paws.',
  regions: [
    { name: 'ears',    role: 'hair',      pixels: [[4,2],[5,2],[10,2],[11,2]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(3,5,10),...hLine(4,4,11),...hLine(5,5,10)] },
    { name: 'mask',    role: 'body',      pixels: [[5,4],[6,4],[9,4],[10,4]] },
    { name: 'eyes',    role: 'eye',       pixels: [[6,4],[9,4]] },
    { name: 'nose',    role: 'belt',      pixels: [[7,5],[8,5]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(6,5,10),...hLine(7,5,10),...hLine(8,5,10),...hLine(9,6,9)] },
    { name: 'belly',   role: 'face',      pixels: [[7,7],[8,7],[7,8],[8,8]] },
    { name: 'arms',    role: 'arm',       pixels: [[4,7],[4,8],[11,7],[11,8]] },
    { name: 'paws',    role: 'hand',      pixels: [[4,9],[11,9]] },
    { name: 'legs',    role: 'leg',       pixels: [[5,10],[6,10],[9,10],[10,10],[5,11],[6,11],[9,11],[10,11]] },
    { name: 'tail',    role: 'hair',      pixels: [[12,6],[13,5],[13,6],[14,5],[14,6],[13,7],[14,7]] },
    { name: 'stripes', role: 'boot',      pixels: [[13,5],[14,6]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 7. HEDGEHOG — spiny little ball with pointy snout
// ─────────────────────────────────────────────────────────────
export const HEDGEHOG_16: SpriteTemplate = {
  name: 'hedgehog_16', width: 16, height: 16,
  description: 'Cute round hedgehog with spiky back, pointy snout, and tiny legs.',
  regions: [
    { name: 'spines',  role: 'hair',      pixels: [
      [6,2],[7,2],[8,2],[9,2],[10,2],
      [5,3],[11,3],[4,4],[12,4],
      [4,5],[12,5],[5,6],[11,6],
    ]},
    { name: 'head',    role: 'head',      pixels: [...hLine(5,5,8),...hLine(6,4,8)] },
    { name: 'eyes',    role: 'eye',       pixels: [[5,5],[7,5]] },
    { name: 'nose',    role: 'belt',      pixels: [[3,6],[4,6]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(3,6,11),...hLine(4,5,11),...hLine(5,9,11),...hLine(6,9,11)] },
    { name: 'belly',   role: 'face',      pixels: [...hLine(7,5,10),...hLine(8,5,10),...hLine(9,6,9)] },
    { name: 'legs',    role: 'leg',       pixels: [[5,10],[6,10],[9,10],[10,10]] },
    { name: 'paws',    role: 'boot',      pixels: [[5,11],[6,11],[9,11],[10,11]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 8. PENGUIN — arctic bird with tuxedo markings
// ─────────────────────────────────────────────────────────────
export const PENGUIN_16: SpriteTemplate = {
  name: 'penguin_16', width: 16, height: 16,
  description: 'Adorable penguin with tuxedo markings, orange beak, and flipper wings.',
  regions: [
    { name: 'head',    role: 'head',      pixels: [...hLine(2,6,9),...hLine(3,5,10),...hLine(4,5,10),...hLine(5,6,9)] },
    { name: 'eyes',    role: 'eye',       pixels: [[6,4],[9,4]] },
    { name: 'beak',    role: 'belt',      pixels: [[7,5],[8,5]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(6,5,10),...hLine(7,5,10),...hLine(8,5,10),...hLine(9,6,9)] },
    { name: 'belly',   role: 'face',      pixels: [[7,6],[8,6],[7,7],[8,7],[7,8],[8,8],[7,9],[8,9]] },
    { name: 'flippers',role: 'arm',       pixels: [[4,6],[4,7],[4,8],[11,6],[11,7],[11,8]] },
    { name: 'legs',    role: 'leg',       pixels: [[6,10],[7,10],[8,10],[9,10]] },
    { name: 'feet',    role: 'accessory', pixels: [[5,11],[6,11],[7,11],[8,11],[9,11],[10,11]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 9. RED_PANDA — fluffy red panda with bushy striped tail
// ─────────────────────────────────────────────────────────────
export const RED_PANDA_16: SpriteTemplate = {
  name: 'red_panda_16', width: 16, height: 16,
  description: 'Fluffy red panda with bushy striped tail, white face markings, and round ears.',
  regions: [
    { name: 'ears',    role: 'hair',      pixels: [[4,1],[5,1],[10,1],[11,1],[4,2],[11,2]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(2,5,10),...hLine(3,4,11),...hLine(4,5,10)] },
    { name: 'face_marks', role: 'face',   pixels: [[5,3],[6,3],[9,3],[10,3]] },
    { name: 'eyes',    role: 'eye',       pixels: [[6,3],[9,3]] },
    { name: 'nose',    role: 'belt',      pixels: [[7,4],[8,4]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(5,5,10),...hLine(6,5,10),...hLine(7,5,10),...hLine(8,6,9)] },
    { name: 'belly',   role: 'face',      pixels: [[7,6],[8,6],[7,7],[8,7]] },
    { name: 'legs',    role: 'leg',       pixels: [[5,9],[6,9],[9,9],[10,9],[5,10],[6,10],[9,10],[10,10]] },
    { name: 'paws',    role: 'boot',      pixels: [[5,11],[6,11],[9,11],[10,11]] },
    { name: 'tail',    role: 'hair',      pixels: [[11,6],[12,5],[13,5],[12,6],[13,6],[14,6],[13,7],[14,7]] },
    { name: 'tail_rings', role: 'accessory', pixels: [[12,5],[13,6],[14,7]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 10. KOI_FISH — ornamental fish with flowing fins
// ─────────────────────────────────────────────────────────────
export const KOI_FISH_16: SpriteTemplate = {
  name: 'koi_fish_16', width: 16, height: 16,
  description: 'Elegant koi fish with flowing tail fin, decorative color patches, and whiskers.',
  regions: [
    { name: 'head',    role: 'head',      pixels: [...hLine(5,2,5),...hLine(6,1,6),...hLine(7,1,6),...hLine(8,2,5)] },
    { name: 'eyes',    role: 'eye',       pixels: [[3,6]] },
    { name: 'whiskers',role: 'face',      pixels: [[1,8],[1,5]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(5,6,10),...hLine(6,7,11),...hLine(7,7,11),...hLine(8,6,10)] },
    { name: 'patches', role: 'accessory', pixels: [[8,6],[9,6],[8,7],[10,7],[9,8]] },
    { name: 'dorsal',  role: 'hair',      pixels: [[7,4],[8,4],[9,4],[10,3]] },
    { name: 'ventral', role: 'belt',      pixels: [[5,9],[6,9],[7,9]] },
    { name: 'tail',    role: 'arm',       pixels: [...hLine(5,11,14),...hLine(6,12,14),...hLine(7,12,14),...hLine(8,11,14)] },
    { name: 'tail_tip',role: 'leg',       pixels: [[14,4],[15,5],[14,5],[14,8],[15,8],[14,9]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 11. BABY_DRAGON — small dragon hatchling breaking from egg
// ─────────────────────────────────────────────────────────────
export const BABY_DRAGON_16: SpriteTemplate = {
  name: 'baby_dragon_16', width: 16, height: 16,
  description: 'Adorable baby dragon hatchling with oversized head, tiny wings, and egg shell remnants.',
  regions: [
    { name: 'horns',   role: 'accessory', pixels: [[5,1],[10,1]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(2,5,10),...hLine(3,4,11),...hLine(4,4,11),...hLine(5,5,10)] },
    { name: 'eyes',    role: 'eye',       pixels: [[6,3],[9,3]] },
    { name: 'snout',   role: 'face',      pixels: [[7,5],[8,5]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(6,6,9),...hLine(7,5,10),...hLine(8,5,10)] },
    { name: 'belly',   role: 'belt',      pixels: [[7,7],[8,7],[7,8],[8,8]] },
    { name: 'wings',   role: 'arm',       pixels: [[3,5],[3,6],[4,6],[11,5],[12,5],[12,6]] },
    { name: 'legs',    role: 'leg',       pixels: [[5,9],[6,9],[9,9],[10,9]] },
    { name: 'paws',    role: 'boot',      pixels: [[5,10],[6,10],[9,10],[10,10]] },
    { name: 'egg_l',   role: 'hand',      pixels: [[3,9],[4,9],[3,10],[4,10],[3,11]] },
    { name: 'egg_r',   role: 'hand',      pixels: [[11,9],[12,9],[11,10],[12,10],[12,11]] },
    { name: 'tail',    role: 'hair',      pixels: [[11,8],[12,7],[13,7]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 12. FOX_SPIRIT — mystical multi-tailed spirit fox
// ─────────────────────────────────────────────────────────────
export const FOX_SPIRIT_16: SpriteTemplate = {
  name: 'fox_spirit_16', width: 16, height: 16,
  description: 'Mystical spirit fox with glowing markings, multiple flowing tails, and ethereal wisps.',
  regions: [
    { name: 'ears',    role: 'hair',      pixels: [[4,1],[5,1],[5,2],[10,1],[11,1],[10,2]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(2,6,9),...hLine(3,5,10),...hLine(4,5,10)] },
    { name: 'eyes',    role: 'eye',       pixels: [[6,3],[9,3]] },
    { name: 'markings',role: 'face',      pixels: [[7,4],[8,4],[7,2],[8,2]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(5,6,9),...hLine(6,5,10),...hLine(7,5,10),...hLine(8,6,9)] },
    { name: 'wisps',   role: 'accessory', pixels: [[4,5],[4,6],[11,5],[11,6],[3,7],[12,7]] },
    { name: 'legs',    role: 'leg',       pixels: [[5,9],[6,9],[9,9],[10,9],[5,10],[10,10]] },
    { name: 'paws',    role: 'boot',      pixels: [[5,11],[6,11],[9,11],[10,11]] },
    { name: 'tail_1',  role: 'hair',      pixels: [[11,7],[12,6],[13,5],[14,4]] },
    { name: 'tail_2',  role: 'hair',      pixels: [[12,8],[13,7],[14,6]] },
    { name: 'tail_3',  role: 'hair',      pixels: [[11,9],[12,9],[13,8]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 13. THUNDER_BIRD — electric bird with crackling feathers
// ─────────────────────────────────────────────────────────────
export const THUNDER_BIRD_16: SpriteTemplate = {
  name: 'thunder_bird_16', width: 16, height: 16,
  description: 'Electric thunderbird with crackling wing tips, jagged crest, and lightning discharge.',
  regions: [
    { name: 'crest',   role: 'accessory', pixels: [[7,1],[8,1],[6,2],[9,2]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(2,7,8),...hLine(3,6,9),...hLine(4,6,9)] },
    { name: 'eyes',    role: 'eye',       pixels: [[7,3],[9,3]] },
    { name: 'beak',    role: 'belt',      pixels: [[5,4],[5,5]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(5,6,9),...hLine(6,6,9),...hLine(7,7,8)] },
    { name: 'wing_l',  role: 'arm',       pixels: [...hLine(4,2,5),...hLine(5,1,5),...hLine(6,1,5),...hLine(7,2,6)] },
    { name: 'wing_r',  role: 'arm',       pixels: [...hLine(4,10,13),...hLine(5,10,14),...hLine(6,10,14),...hLine(7,9,13)] },
    { name: 'sparks',  role: 'face',      pixels: [[1,4],[14,4],[2,7],[13,7],[1,8],[14,8]] },
    { name: 'tail',    role: 'hair',      pixels: [...hLine(8,6,9),...hLine(9,6,10),...hLine(10,7,10)] },
    { name: 'claws',   role: 'leg',       pixels: [[6,8],[7,9],[8,9],[9,8]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 14. ICE_WOLF — frost wolf with icy crystalline fur
// ─────────────────────────────────────────────────────────────
export const ICE_WOLF_16: SpriteTemplate = {
  name: 'ice_wolf_16', width: 16, height: 16,
  description: 'Frost wolf with crystalline ice fur, glowing blue eyes, and frozen breath wisps.',
  regions: [
    { name: 'ears',    role: 'accessory', pixels: [[4,1],[5,2],[10,1],[11,2]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(2,5,10),...hLine(3,4,11),...hLine(4,5,10)] },
    { name: 'eyes',    role: 'eye',       pixels: [[6,3],[9,3]] },
    { name: 'snout',   role: 'face',      pixels: [[6,4],[7,4],[8,4],[9,4],...hLine(5,5,10)] },
    { name: 'breath',  role: 'hand',      pixels: [[3,4],[2,5],[3,5]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(6,4,11),...hLine(7,4,11),...hLine(8,5,10)] },
    { name: 'frost',   role: 'face',      pixels: [[5,6],[11,6],[4,7],[12,7]] },
    { name: 'legs',    role: 'leg',       pixels: [...vLine(5,9,12),...vLine(7,9,12),...vLine(9,9,12),...vLine(11,9,12)] },
    { name: 'paws',    role: 'boot',      pixels: [[4,13],[5,13],[6,13],[7,13],[8,13],[9,13],[10,13],[11,13]] },
    { name: 'tail',    role: 'hair',      pixels: [[12,6],[13,5],[14,4],[14,5],[13,6]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 15. FIRE_CAT — flaming feline with ember paws
// ─────────────────────────────────────────────────────────────
export const FIRE_CAT_16: SpriteTemplate = {
  name: 'fire_cat_16', width: 16, height: 16,
  description: 'Fiery cat with flame-tipped ears, ember paws, and a blazing tail.',
  regions: [
    { name: 'flames',  role: 'accessory', pixels: [[4,1],[5,0],[5,1],[10,0],[11,1],[10,1]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(2,5,10),...hLine(3,4,11),...hLine(4,5,10)] },
    { name: 'ears',    role: 'hair',      pixels: [[4,2],[5,2],[10,2],[11,2]] },
    { name: 'eyes',    role: 'eye',       pixels: [[6,3],[9,3]] },
    { name: 'nose',    role: 'face',      pixels: [[7,4],[8,4]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(5,5,10),...hLine(6,5,10),...hLine(7,5,10),...hLine(8,6,9)] },
    { name: 'belly',   role: 'belt',      pixels: [[7,6],[8,6],[7,7],[8,7]] },
    { name: 'legs',    role: 'leg',       pixels: [[5,9],[6,9],[9,9],[10,9],[5,10],[6,10],[9,10],[10,10]] },
    { name: 'ember_paws', role: 'face',   pixels: [[5,11],[6,11],[9,11],[10,11]] },
    { name: 'tail',    role: 'hair',      pixels: [[11,7],[12,6],[13,5],[13,4],[12,3]] },
    { name: 'tail_flame', role: 'accessory', pixels: [[13,3],[14,3],[14,2]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 16. MOSS_GOLEM — plant golem covered in moss and vines
// ─────────────────────────────────────────────────────────────
export const MOSS_GOLEM_16: SpriteTemplate = {
  name: 'moss_golem_16', width: 16, height: 16,
  description: 'Small plant golem with a mossy stone body, vine arms, and glowing nature core.',
  regions: [
    { name: 'sprout',  role: 'hand',      pixels: [[7,1],[8,1],[7,2],[8,2]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(3,5,10),...hLine(4,5,10),...hLine(5,6,9)] },
    { name: 'eyes',    role: 'eye',       pixels: [[6,4],[9,4]] },
    { name: 'moss_top',role: 'hair',      pixels: [[5,3],[10,3],[4,4],[11,4]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(6,5,10),...hLine(7,4,11),...hLine(8,4,11),...hLine(9,5,10)] },
    { name: 'core',    role: 'accessory', pixels: [[7,7],[8,7],[7,8],[8,8]] },
    { name: 'vine_l',  role: 'arm',       pixels: [[3,6],[3,7],[2,8],[2,9]] },
    { name: 'vine_r',  role: 'arm',       pixels: [[12,6],[12,7],[13,8],[13,9]] },
    { name: 'legs',    role: 'leg',       pixels: [[5,10],[6,10],[7,10],[8,10],[9,10],[10,10]] },
    { name: 'roots',   role: 'boot',      pixels: [[4,11],[5,11],[6,11],[9,11],[10,11],[11,11]] },
    { name: 'moss',    role: 'hand',      pixels: [[5,7],[10,7],[4,9],[11,9]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 17. CLOUD_SHEEP — fluffy sky sheep floating on clouds
// ─────────────────────────────────────────────────────────────
export const CLOUD_SHEEP_16: SpriteTemplate = {
  name: 'cloud_sheep_16', width: 16, height: 16,
  description: 'Fluffy cloud sheep floating in the sky with cotton-candy wool and tiny wings.',
  regions: [
    { name: 'wool_top',role: 'face',      pixels: [...hLine(2,5,10),...hLine(3,4,11)] },
    { name: 'head',    role: 'head',      pixels: [...hLine(4,4,11),...hLine(5,5,10)] },
    { name: 'eyes',    role: 'eye',       pixels: [[6,4],[9,4]] },
    { name: 'nose',    role: 'belt',      pixels: [[7,5],[8,5]] },
    { name: 'wool',    role: 'face',      pixels: [...hLine(6,4,11),...hLine(7,4,11),...hLine(8,5,10)] },
    { name: 'body',    role: 'body',      pixels: [...hLine(5,5,10)] },
    { name: 'wings',   role: 'accessory', pixels: [[3,5],[3,6],[2,6],[12,5],[12,6],[13,6]] },
    { name: 'legs',    role: 'leg',       pixels: [[5,9],[6,9],[9,9],[10,9]] },
    { name: 'hooves',  role: 'boot',      pixels: [[5,10],[6,10],[9,10],[10,10]] },
    { name: 'cloud',   role: 'hand',      pixels: [...hLine(12,3,12),...hLine(13,2,13),...hLine(14,3,12)] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 18. STAR_JELLYFISH — cosmic jellyfish with glowing bell
// ─────────────────────────────────────────────────────────────
export const STAR_JELLYFISH_16: SpriteTemplate = {
  name: 'star_jellyfish_16', width: 16, height: 16,
  description: 'Cosmic star jellyfish with a translucent glowing bell, trailing starlight tentacles.',
  regions: [
    { name: 'bell',    role: 'head',      pixels: [...hLine(2,5,10),...hLine(3,4,11),...hLine(4,4,11),...hLine(5,5,10)] },
    { name: 'stars',   role: 'eye',       pixels: [[6,3],[9,3],[7,4],[8,4]] },
    { name: 'glow',    role: 'face',      pixels: [[5,3],[10,3],[5,4],[10,4]] },
    { name: 'rim',     role: 'accessory', pixels: [...hLine(6,4,11)] },
    { name: 'body',    role: 'body',      pixels: [...hLine(7,5,10),...hLine(8,6,9)] },
    { name: 'tentacle_1', role: 'arm',    pixels: [...vLine(5,7,12)] },
    { name: 'tentacle_2', role: 'arm',    pixels: [...vLine(7,9,13)] },
    { name: 'tentacle_3', role: 'arm',    pixels: [...vLine(9,9,13)] },
    { name: 'tentacle_4', role: 'arm',    pixels: [...vLine(11,7,12)] },
    { name: 'sparkles',role: 'hand',      pixels: [[4,9],[6,11],[8,12],[10,11],[12,9]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 19. BLOOD_BAT — vampire bat with red glowing markings
// ─────────────────────────────────────────────────────────────
export const BLOOD_BAT_16: SpriteTemplate = {
  name: 'blood_bat_16', width: 16, height: 16,
  description: 'Sinister vampire bat with crimson vein markings, fangs, and wide leathery wings.',
  regions: [
    { name: 'ears',    role: 'accessory', pixels: [[6,2],[9,2]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(3,6,9),...hLine(4,6,9)] },
    { name: 'eyes',    role: 'eye',       pixels: [[6,3],[9,3]] },
    { name: 'fangs',   role: 'face',      pixels: [[7,5],[8,5]] },
    { name: 'body',    role: 'body',      pixels: [...hLine(5,6,9),...hLine(6,7,8)] },
    { name: 'veins',   role: 'belt',      pixels: [[4,6],[3,7],[11,6],[12,7]] },
    { name: 'wing_l',  role: 'arm',       pixels: [
      ...hLine(4,2,5),...hLine(5,1,5),...hLine(6,1,6),...hLine(7,2,6),
      [1,4],[1,5],
    ]},
    { name: 'wing_r',  role: 'arm',       pixels: [
      ...hLine(4,10,13),...hLine(5,10,14),...hLine(6,9,14),...hLine(7,9,13),
      [14,4],[14,5],
    ]},
    { name: 'feet',    role: 'leg',       pixels: [[7,7],[8,7],[6,8],[7,8],[8,8],[9,8]] },
    { name: 'claws',   role: 'boot',      pixels: [[6,9],[9,9]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// 20. CRYSTAL_SNAIL — gem-shelled snail with prismatic shell
// ─────────────────────────────────────────────────────────────
export const CRYSTAL_SNAIL_16: SpriteTemplate = {
  name: 'crystal_snail_16', width: 16, height: 16,
  description: 'Gem-shelled snail with a prismatic crystalline spiral shell and glowing eye stalks.',
  regions: [
    { name: 'shell',   role: 'body',      pixels: [
      ...hLine(2,7,11),...hLine(3,6,12),...hLine(4,6,12),
      ...hLine(5,6,12),...hLine(6,7,11),...hLine(7,8,10),
    ]},
    { name: 'facets',  role: 'accessory', pixels: [[8,3],[10,3],[7,4],[9,4],[11,4],[8,5],[10,5]] },
    { name: 'spiral',  role: 'belt',      pixels: [[9,3],[9,4],[9,5],[8,6],[9,6]] },
    { name: 'eye_stalks', role: 'hair',   pixels: [[3,4],[4,3],[5,3],[4,4]] },
    { name: 'eyes',    role: 'eye',       pixels: [[3,3],[5,2]] },
    { name: 'head',    role: 'head',      pixels: [...hLine(5,3,5),...hLine(6,3,6),...hLine(7,3,7)] },
    { name: 'body',    role: 'face',      pixels: [...hLine(8,3,10),...hLine(9,3,10),...hLine(10,4,9)] },
    { name: 'foot',    role: 'leg',       pixels: [...hLine(11,3,9),...hLine(12,4,8)] },
    { name: 'slime',   role: 'hand',      pixels: [[2,12],[3,12],[10,12],[11,11]] },
  ],
};

// ─────────────────────────────────────────────────────────────
// COLOR SCHEMES
// ─────────────────────────────────────────────────────────────

export const HAMSTER_COLORS = scheme('hamster_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  face:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  eye:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
});

export const PARROT_COLORS = scheme('parrot_default', {
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  face:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  hair:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
});

export const PANDA_COLORS = scheme('panda_default', {
  head:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  face:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
});

export const CHAMELEON_COLORS = scheme('chameleon_default', {
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  face:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#346524', base: '#6daa2c', highlight: '#6dc2ca' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
});

export const AXOLOTL_COLORS = scheme('axolotl_default', {
  head:      { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' },
  face:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' },
  leg:       { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' },
  hair:      { shadow: '#d04648', base: '#d27d2c', highlight: '#d2aa99' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#140c1c', base: '#442434', highlight: '#d04648' },
});

export const RACCOON_COLORS = scheme('raccoon_default', {
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  face:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
});

export const HEDGEHOG_COLORS = scheme('hedgehog_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  face:      { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  eye:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
});

export const PENGUIN_COLORS = scheme('penguin_default', {
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  face:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
});

export const RED_PANDA_COLORS = scheme('red_panda_default', {
  head:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
  face:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  hair:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
});

export const KOI_FISH_COLORS = scheme('koi_fish_default', {
  head:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  face:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  body:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  arm:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  belt:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  hair:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  leg:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#140c1c', base: '#442434', highlight: '#d04648' },
});

export const BABY_DRAGON_COLORS = scheme('baby_dragon_default', {
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  face:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  belt:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  boot:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  hair:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  hand:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
});

export const FOX_SPIRIT_COLORS = scheme('fox_spirit_default', {
  head:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  face:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  leg:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  boot:      { shadow: '#597dce', base: '#8595a1', highlight: '#deeed6' },
  hair:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
});

export const THUNDER_BIRD_COLORS = scheme('thunder_bird_default', {
  head:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
  face:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  hair:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
});

export const ICE_WOLF_COLORS = scheme('ice_wolf_default', {
  head:      { shadow: '#597dce', base: '#8595a1', highlight: '#deeed6' },
  face:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#597dce', base: '#8595a1', highlight: '#deeed6' },
  hand:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
  boot:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
  hair:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
});

export const FIRE_CAT_COLORS = scheme('fire_cat_default', {
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  face:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
});

export const MOSS_GOLEM_COLORS = scheme('moss_golem_default', {
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  face:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  hand:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  leg:       { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
  boot:      { shadow: '#346524', base: '#854c30', highlight: '#d27d2c' },
  hair:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
});

export const CLOUD_SHEEP_COLORS = scheme('cloud_sheep_default', {
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  face:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  belt:      { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' },
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  hand:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
});

export const STAR_JELLYFISH_COLORS = scheme('star_jellyfish_default', {
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  face:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  body:      { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  hand:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
});

export const BLOOD_BAT_COLORS = scheme('blood_bat_default', {
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  face:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
});

export const CRYSTAL_SNAIL_COLORS = scheme('crystal_snail_default', {
  head:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  belt:      { shadow: '#442434', base: '#597dce', highlight: '#6dc2ca' },
  leg:       { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  hair:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  hand:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
});

// ─────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────
export const CREATURE_BATCH3_TEMPLATES: Record<string, SpriteTemplate> = {
  hamster_16:          HAMSTER_16,
  parrot_16:           PARROT_16,
  panda_16:            PANDA_16,
  chameleon_16:        CHAMELEON_16,
  axolotl_16:          AXOLOTL_16,
  raccoon_16:          RACCOON_16,
  hedgehog_16:         HEDGEHOG_16,
  penguin_16:          PENGUIN_16,
  red_panda_16:        RED_PANDA_16,
  koi_fish_16:         KOI_FISH_16,
  baby_dragon_16:      BABY_DRAGON_16,
  fox_spirit_16:       FOX_SPIRIT_16,
  thunder_bird_16:     THUNDER_BIRD_16,
  ice_wolf_16:         ICE_WOLF_16,
  fire_cat_16:         FIRE_CAT_16,
  moss_golem_16:       MOSS_GOLEM_16,
  cloud_sheep_16:      CLOUD_SHEEP_16,
  star_jellyfish_16:   STAR_JELLYFISH_16,
  blood_bat_16:        BLOOD_BAT_16,
  crystal_snail_16:    CRYSTAL_SNAIL_16,
};

export const CREATURE_BATCH3_COLOR_SCHEMES: Record<string, ColorScheme> = {
  hamster_default:         HAMSTER_COLORS,
  parrot_default:          PARROT_COLORS,
  panda_default:           PANDA_COLORS,
  chameleon_default:       CHAMELEON_COLORS,
  axolotl_default:         AXOLOTL_COLORS,
  raccoon_default:         RACCOON_COLORS,
  hedgehog_default:        HEDGEHOG_COLORS,
  penguin_default:         PENGUIN_COLORS,
  red_panda_default:       RED_PANDA_COLORS,
  koi_fish_default:        KOI_FISH_COLORS,
  baby_dragon_default:     BABY_DRAGON_COLORS,
  fox_spirit_default:      FOX_SPIRIT_COLORS,
  thunder_bird_default:    THUNDER_BIRD_COLORS,
  ice_wolf_default:        ICE_WOLF_COLORS,
  fire_cat_default:        FIRE_CAT_COLORS,
  moss_golem_default:      MOSS_GOLEM_COLORS,
  cloud_sheep_default:     CLOUD_SHEEP_COLORS,
  star_jellyfish_default:  STAR_JELLYFISH_COLORS,
  blood_bat_default:       BLOOD_BAT_COLORS,
  crystal_snail_default:   CRYSTAL_SNAIL_COLORS,
};
