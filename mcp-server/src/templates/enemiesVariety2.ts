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

const ENEMY2_BASE = {
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

function scheme(name: string, overrides: Partial<typeof ENEMY2_BASE>): ColorScheme {
  return { name, mapping: { ...ENEMY2_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// SKELETON_ARCHER — Undead archer with bow, bony frame, glowing eyes.
// ════════════════════════════════════════════════════════════
export const SKELETON_ARCHER_16: SpriteTemplate = {
  name: 'skeleton_archer_16', width: 16, height: 16,
  description: 'Skeletal archer with drawn bow, bony limbs, and glowing red eye sockets.',
  regions: [
    // Skull
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      [5,3], [6,3], [9,3], [10,3],
      ...hLine(4, 6, 9),
    ]},
    // Glowing eye sockets
    { name: 'eyes', role: 'eye', pixels: [
      [7,2], [8,2],
      [7,3], [8,3],
    ]},
    // Jaw
    { name: 'jaw', role: 'face', pixels: [
      [7,4], [8,4],
    ]},
    // Ribcage / spine
    { name: 'body', role: 'body', pixels: [
      [7,5], [8,5],
      [6,6], [7,6], [8,6], [9,6],
      [7,7], [8,7],
      [6,8], [7,8], [8,8], [9,8],
    ]},
    // Left arm holding bow
    { name: 'arms', role: 'arm', pixels: [
      [4,5], [5,5], [5,6],
      [4,6], [3,7], [4,7],
      [10,5], [11,5], [10,6],
    ]},
    // Bow (held in left hand)
    { name: 'bow', role: 'accessory', pixels: [
      [2,3], [2,4], [2,5], [2,6], [2,7], [2,8], [2,9],
      [3,3], [3,9],
    ]},
    // Arrow
    { name: 'arrow', role: 'belt', pixels: [
      [3,6], [4,6], [11,6], [12,6], [13,6],
    ]},
    // Pelvis
    { name: 'pelvis', role: 'belt', pixels: [
      ...hLine(9, 6, 9),
    ]},
    // Leg bones
    { name: 'legs', role: 'leg', pixels: [
      [6,10], [7,10], [8,10], [9,10],
      [5,11], [6,11], [9,11], [10,11],
      [5,12], [6,12], [9,12], [10,12],
    ]},
    // Feet bones
    { name: 'feet', role: 'boot', pixels: [
      [4,13], [5,13], [6,13], [9,13], [10,13], [11,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SLIME_KING — Large crowned slime with regal bearing.
// ════════════════════════════════════════════════════════════
export const SLIME_KING_16: SpriteTemplate = {
  name: 'slime_king_16', width: 16, height: 16,
  description: 'Massive royal slime with golden crown, wide grinning face, glistening body.',
  regions: [
    // Crown
    { name: 'crown', role: 'accessory', pixels: [
      [5,1], [7,1], [9,1],
      [5,2], [6,2], [7,2], [8,2], [9,2],
      ...hLine(3, 4, 10),
    ]},
    // Eyes (big goofy slime eyes)
    { name: 'eyes', role: 'eye', pixels: [
      [5,5], [6,5],
      [9,5], [10,5],
    ]},
    // Mouth
    { name: 'mouth', role: 'face', pixels: [
      [6,7], [7,7], [8,7], [9,7],
    ]},
    // Slime body (big dome)
    { name: 'body', role: 'body', pixels: [
      ...hLine(4, 4, 11),
      [3,5], [4,5], [7,5], [8,5], [11,5], [12,5],
      ...hLine(6, 3, 12),
      [3,7], [4,7], [5,7], [10,7], [11,7], [12,7],
      ...hLine(8, 3, 12),
      ...hLine(9, 3, 12),
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
    ]},
    // Slime drip left
    { name: 'drip_left', role: 'arm', pixels: [
      [2,8], [2,9], [2,10],
    ]},
    // Slime drip right
    { name: 'drip_right', role: 'arm', pixels: [
      [13,8], [13,9], [13,10],
    ]},
    // Base puddle
    { name: 'puddle', role: 'boot', pixels: [
      ...hLine(12, 4, 11),
      ...hLine(13, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// FIRE_BAT — Flaming bat with spread wings and burning aura.
// ════════════════════════════════════════════════════════════
export const FIRE_BAT_16: SpriteTemplate = {
  name: 'fire_bat_16', width: 16, height: 16,
  description: 'Bat wreathed in flames, wings spread wide, burning orange eyes.',
  regions: [
    // Flame tips above
    { name: 'flames', role: 'accessory', pixels: [
      [4,1], [7,1], [11,1],
      [3,2], [5,2], [8,2], [10,2], [12,2],
    ]},
    // Wings (wide spread)
    { name: 'wings', role: 'body', pixels: [
      [1,4], [2,4], [3,4], [12,4], [13,4], [14,4],
      [1,5], [2,5], [3,5], [4,5], [11,5], [12,5], [13,5], [14,5],
      [2,6], [3,6], [4,6], [5,6], [10,6], [11,6], [12,6], [13,6],
      [3,7], [4,7], [5,7], [10,7], [11,7], [12,7],
      [4,8], [5,8], [10,8], [11,8],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      ...hLine(3, 6, 9),
      [5,4], [6,4], [9,4], [10,4],
      ...hLine(5, 6, 9),
    ]},
    // Glowing eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,4], [7,4], [8,4], [9,4],
    ]},
    // Ears
    { name: 'ears', role: 'hair', pixels: [
      [5,3], [10,3],
    ]},
    // Fangs
    { name: 'fangs', role: 'face', pixels: [
      [7,5], [8,5],
    ]},
    // Body (small torso)
    { name: 'torso', role: 'body', pixels: [
      ...hLine(6, 6, 9),
      ...hLine(7, 6, 9),
      [7,8], [8,8],
    ]},
    // Feet / claws
    { name: 'feet', role: 'boot', pixels: [
      [6,9], [7,9], [8,9], [9,9],
    ]},
    // Fire trail below
    { name: 'fire_trail', role: 'leg', pixels: [
      [7,10], [8,10],
      [6,11], [9,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// ICE_GOLEM — Frozen golem with crystalline body, icy blue glow.
// ════════════════════════════════════════════════════════════
export const ICE_GOLEM_16: SpriteTemplate = {
  name: 'ice_golem_16', width: 16, height: 16,
  description: 'Massive ice golem with crystalline body, frost aura, glowing cyan eyes.',
  regions: [
    // Crystal spikes on top
    { name: 'spikes', role: 'accessory', pixels: [
      [7,0], [8,0],
      [5,1], [10,1],
    ]},
    // Head (angular ice block)
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
      ...hLine(4, 6, 9),
    ]},
    // Glowing eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Torso (wide icy body)
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 5, 10),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 5, 10),
    ]},
    // Arms (thick blocky)
    { name: 'arms', role: 'arm', pixels: [
      [2,6], [3,6], [12,6], [13,6],
      [2,7], [3,7], [12,7], [13,7],
      [2,8], [3,8], [12,8], [13,8],
      [3,9], [12,9],
    ]},
    // Fist crystals
    { name: 'fists', role: 'hand', pixels: [
      [1,8], [1,9], [2,9],
      [14,8], [14,9], [13,9],
    ]},
    // Ice belt / crack
    { name: 'ice_crack', role: 'belt', pixels: [
      ...hLine(10, 5, 10),
    ]},
    // Legs (thick columns)
    { name: 'legs', role: 'leg', pixels: [
      [5,11], [6,11], [9,11], [10,11],
      [5,12], [6,12], [9,12], [10,12],
      [5,13], [6,13], [9,13], [10,13],
    ]},
    // Feet (wide frozen blocks)
    { name: 'feet', role: 'boot', pixels: [
      [4,14], [5,14], [6,14], [7,14],
      [8,14], [9,14], [10,14], [11,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SAND_SCORPION — Desert scorpion with pincers and raised tail.
// ════════════════════════════════════════════════════════════
export const SAND_SCORPION_16: SpriteTemplate = {
  name: 'sand_scorpion_16', width: 16, height: 16,
  description: 'Giant desert scorpion with snapping pincers, segmented tail, and venom stinger.',
  regions: [
    // Stinger tip (raised)
    { name: 'stinger', role: 'accessory', pixels: [
      [13,1], [14,1],
      [13,2],
    ]},
    // Tail (curved upward segments)
    { name: 'tail', role: 'hair', pixels: [
      [12,3], [13,3],
      [11,4], [12,4],
      [10,5], [11,5],
      [10,6], [11,6],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      [3,5], [4,5], [5,5], [6,5],
      [3,6], [4,6], [5,6], [6,6],
    ]},
    // Eyes
    { name: 'eyes', role: 'eye', pixels: [
      [4,5], [5,5],
    ]},
    // Left pincer
    { name: 'pincer_left', role: 'arm', pixels: [
      [1,3], [2,3],
      [1,4], [3,4],
      [2,4],
    ]},
    // Right pincer
    { name: 'pincer_right', role: 'arm', pixels: [
      [5,3], [6,3],
      [5,4], [7,4],
      [6,4],
    ]},
    // Body segments (wide center)
    { name: 'body', role: 'body', pixels: [
      ...hLine(7, 3, 10),
      ...hLine(8, 3, 10),
      ...hLine(9, 4, 9),
    ]},
    // Legs (4 pairs)
    { name: 'legs', role: 'leg', pixels: [
      [2,8], [2,9], [3,9],
      [4,10], [5,10],
      [7,10], [8,10],
      [10,9], [11,9], [11,8],
    ]},
    // Belly segments
    { name: 'belly', role: 'belt', pixels: [
      [5,8], [6,8], [7,8], [8,8],
    ]},
    // Ground shadow
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(11, 3, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// PLAGUE_DOCTOR — Dark plague doctor with beak mask and lantern.
// ════════════════════════════════════════════════════════════
export const PLAGUE_DOCTOR_16: SpriteTemplate = {
  name: 'plague_doctor_16', width: 16, height: 16,
  description: 'Sinister plague doctor with bird beak mask, wide-brim hat, and swinging lantern.',
  regions: [
    // Hat brim
    { name: 'hat_brim', role: 'hair', pixels: [
      ...hLine(2, 4, 11),
    ]},
    // Hat top
    { name: 'hat_top', role: 'hair', pixels: [
      ...hLine(0, 6, 9),
      ...hLine(1, 5, 10),
    ]},
    // Head / mask
    { name: 'head', role: 'head', pixels: [
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
    ]},
    // Glowing eye (single, through mask lens)
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3],
    ]},
    // Beak (protruding)
    { name: 'beak', role: 'face', pixels: [
      [5,5], [6,5], [7,5],
      [4,5],
    ]},
    // Cloak body
    { name: 'body', role: 'body', pixels: [
      ...hLine(6, 5, 10),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
    ]},
    // Left arm (carrying lantern)
    { name: 'arm_left', role: 'arm', pixels: [
      [3,7], [3,8], [3,9],
    ]},
    // Lantern
    { name: 'lantern', role: 'accessory', pixels: [
      [2,9], [3,9],
      [1,10], [2,10], [3,10], [4,10],
      [2,11], [3,11],
    ]},
    // Lantern glow
    { name: 'lantern_glow', role: 'belt', pixels: [
      [2,10], [3,10],
    ]},
    // Cloak bottom / legs hidden
    { name: 'cloak_bottom', role: 'leg', pixels: [
      ...hLine(12, 5, 10),
      ...hLine(13, 6, 9),
    ]},
    // Boots peeking
    { name: 'boots', role: 'boot', pixels: [
      [6,14], [7,14], [8,14], [9,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// CRYSTAL_SPIDER — Crystalline spider with gem-like body.
// ════════════════════════════════════════════════════════════
export const CRYSTAL_SPIDER_16: SpriteTemplate = {
  name: 'crystal_spider_16', width: 16, height: 16,
  description: 'Spider made of living crystal, refracting light, with sharp gem legs.',
  regions: [
    // Crystal eyes (glowing)
    { name: 'eyes', role: 'eye', pixels: [
      [6,4], [9,4],
    ]},
    // Head (angular crystal)
    { name: 'head', role: 'head', pixels: [
      [7,3], [8,3],
      [6,3], [9,3],
      [6,5], [7,5], [8,5], [9,5],
    ]},
    // Body (large gem-shaped abdomen)
    { name: 'body', role: 'body', pixels: [
      [7,4], [8,4],
      ...hLine(6, 5, 10),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 5, 10),
    ]},
    // Crystal facets (inner detail)
    { name: 'facets', role: 'accessory', pixels: [
      [6,7], [9,7],
      [5,8], [10,8],
      [7,8], [8,8],
    ]},
    // Legs left (4 crystal spikes)
    { name: 'legs_left', role: 'leg', pixels: [
      [3,5], [2,4],
      [3,6], [2,6], [1,5],
      [3,8], [2,9],
      [3,9], [2,10],
    ]},
    // Legs right (4 crystal spikes)
    { name: 'legs_right', role: 'leg', pixels: [
      [12,5], [13,4],
      [12,6], [13,6], [14,5],
      [12,8], [13,9],
      [12,9], [13,10],
    ]},
    // Fangs
    { name: 'fangs', role: 'arm', pixels: [
      [7,5], [8,5],
    ]},
    // Crystal glow beneath
    { name: 'glow', role: 'belt', pixels: [
      ...hLine(10, 6, 9),
      [7,11], [8,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// MUMMY — Wrapped undead mummy with trailing bandages.
// ════════════════════════════════════════════════════════════
export const MUMMY_16: SpriteTemplate = {
  name: 'mummy_16', width: 16, height: 16,
  description: 'Ancient mummy wrapped in tattered bandages, glowing golden eyes, arms outstretched.',
  regions: [
    // Head wrapped
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
      ...hLine(4, 6, 9),
    ]},
    // Eyes (glowing through wrappings)
    { name: 'eyes', role: 'eye', pixels: [
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Bandage strips on face
    { name: 'bandage_face', role: 'face', pixels: [
      [6,3], [9,3],
      [7,4], [8,4],
    ]},
    // Body wrapped
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 6, 9),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
      ...hLine(9, 6, 9),
    ]},
    // Bandage strips on body
    { name: 'wrappings', role: 'belt', pixels: [
      [6,6], [8,6],
      [7,7], [9,7],
      [6,8], [8,8],
    ]},
    // Arms outstretched
    { name: 'arms', role: 'arm', pixels: [
      [3,6], [4,6], [11,6], [12,6],
      [2,7], [3,7], [4,7], [11,7], [12,7], [13,7],
      [2,8], [3,8], [12,8], [13,8],
    ]},
    // Trailing bandage strips
    { name: 'trailing_bandage', role: 'hair', pixels: [
      [1,8], [1,9],
      [14,8], [14,9],
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      [6,10], [7,10], [8,10], [9,10],
      [5,11], [6,11], [9,11], [10,11],
      [5,12], [6,12], [9,12], [10,12],
    ]},
    // Feet
    { name: 'feet', role: 'boot', pixels: [
      [5,13], [6,13], [9,13], [10,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// DARK_KNIGHT — Evil armored knight with dark sword and shield.
// ════════════════════════════════════════════════════════════
export const DARK_KNIGHT_16: SpriteTemplate = {
  name: 'dark_knight_16', width: 16, height: 16,
  description: 'Evil knight in black armor with horned helm, dark sword, and spiked shield.',
  regions: [
    // Horned helmet
    { name: 'helm', role: 'head', pixels: [
      [5,0], [10,0],
      [5,1], [6,1], [7,1], [8,1], [9,1], [10,1],
      ...hLine(2, 5, 10),
      ...hLine(3, 6, 9),
    ]},
    // Visor slit (glowing)
    { name: 'eyes', role: 'eye', pixels: [
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Neck / gorget
    { name: 'gorget', role: 'face', pixels: [
      [7,4], [8,4],
    ]},
    // Chest armor
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 6, 9),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
    ]},
    // Shoulder pauldrons
    { name: 'pauldrons', role: 'arm', pixels: [
      [3,5], [4,5], [11,5], [12,5],
      [3,6], [4,6], [11,6], [12,6],
    ]},
    // Shield (left)
    { name: 'shield', role: 'accessory', pixels: [
      [1,6], [2,6],
      [1,7], [2,7], [3,7],
      [1,8], [2,8], [3,8],
      [2,9], [3,9],
    ]},
    // Sword (right)
    { name: 'sword', role: 'hair', pixels: [
      [13,2], [13,3], [13,4],
      [13,5], [13,6], [13,7],
      [12,8], [13,8],
    ]},
    // Waist armor
    { name: 'waist', role: 'belt', pixels: [
      ...hLine(9, 5, 10),
    ]},
    // Leg armor
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
// EYE_BEAST — Floating eye monster with tentacles beneath.
// ════════════════════════════════════════════════════════════
export const EYE_BEAST_16: SpriteTemplate = {
  name: 'eye_beast_16', width: 16, height: 16,
  description: 'Giant floating eyeball with bloodshot iris, writhing tentacles below.',
  regions: [
    // Outer eye (large sphere)
    { name: 'body', role: 'body', pixels: [
      ...hLine(1, 5, 10),
      ...hLine(2, 3, 12),
      ...hLine(3, 2, 13),
      ...hLine(4, 2, 13),
      ...hLine(5, 2, 13),
      ...hLine(6, 2, 13),
      ...hLine(7, 3, 12),
      ...hLine(8, 4, 11),
    ]},
    // Iris (large center ring)
    { name: 'iris', role: 'head', pixels: [
      [6,3], [7,3], [8,3], [9,3],
      [5,4], [10,4],
      [5,5], [10,5],
      [6,6], [7,6], [8,6], [9,6],
    ]},
    // Pupil (dark center)
    { name: 'pupil', role: 'hair', pixels: [
      [7,4], [8,4],
      [7,5], [8,5],
    ]},
    // Eye highlight
    { name: 'eyes', role: 'eye', pixels: [
      [6,4], [9,4],
    ]},
    // Bloodshot veins
    { name: 'veins', role: 'face', pixels: [
      [3,3], [4,4],
      [12,3], [11,4],
      [3,6], [4,5],
    ]},
    // Tentacles (dangling below)
    { name: 'tentacles', role: 'arm', pixels: [
      [4,9], [5,9], [6,9], [9,9], [10,9], [11,9],
      [3,10], [5,10], [7,10], [8,10], [10,10], [12,10],
      [3,11], [5,11], [7,11], [8,11], [10,11], [12,11],
      [4,12], [6,12], [9,12], [11,12],
    ]},
    // Tentacle tips
    { name: 'tentacle_tips', role: 'accessory', pixels: [
      [4,13], [6,13], [9,13], [11,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// ACID_SLIME — Toxic green slime dripping acid.
// ════════════════════════════════════════════════════════════
export const ACID_SLIME_16: SpriteTemplate = {
  name: 'acid_slime_16', width: 16, height: 16,
  description: 'Toxic green slime oozing acid droplets, bubbling surface, menacing eyes.',
  regions: [
    // Acid bubbles (popping on top)
    { name: 'bubbles', role: 'accessory', pixels: [
      [6,2], [9,3],
      [5,3],
    ]},
    // Eyes
    { name: 'eyes', role: 'eye', pixels: [
      [5,5], [6,5],
      [9,5], [10,5],
    ]},
    // Mouth
    { name: 'mouth', role: 'face', pixels: [
      [7,7], [8,7],
    ]},
    // Slime body (dome shaped)
    { name: 'body', role: 'body', pixels: [
      ...hLine(3, 6, 9),
      ...hLine(4, 4, 11),
      [4,5], [7,5], [8,5], [11,5],
      ...hLine(6, 4, 11),
      [4,7], [5,7], [6,7], [9,7], [10,7], [11,7],
      ...hLine(8, 4, 11),
      ...hLine(9, 5, 10),
    ]},
    // Acid drips (falling from body)
    { name: 'drips', role: 'arm', pixels: [
      [3,9], [3,10],
      [12,9], [12,10],
      [7,10], [7,11],
    ]},
    // Acid puddle base
    { name: 'puddle', role: 'leg', pixels: [
      ...hLine(10, 4, 11),
      ...hLine(11, 3, 12),
      ...hLine(12, 5, 10),
    ]},
    // Surface bubbles / texture
    { name: 'surface', role: 'belt', pixels: [
      [6,6], [9,6],
      [5,8], [10,8],
    ]},
    // Ground shadow
    { name: 'shadow', role: 'boot', pixels: [
      ...hLine(13, 4, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// GHOST — Floating spectral ghost with wavering tail.
// ════════════════════════════════════════════════════════════
export const GHOST_16: SpriteTemplate = {
  name: 'ghost_16', width: 16, height: 16,
  description: 'Spectral ghost floating with hollow eyes, wavering translucent body fading to wisps.',
  regions: [
    // Head (rounded top)
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 4, 11),
    ]},
    // Hollow eyes (dark void)
    { name: 'eyes', role: 'eye', pixels: [
      [5,3], [6,3],
      [9,3], [10,3],
    ]},
    // Mouth (open wail)
    { name: 'mouth', role: 'face', pixels: [
      [7,5], [8,5],
      [7,6], [8,6],
    ]},
    // Body (fading torso)
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 4, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 5, 10),
    ]},
    // Arms (wispy)
    { name: 'arms', role: 'arm', pixels: [
      [2,5], [3,5], [12,5], [13,5],
      [2,6], [3,6], [12,6], [13,6],
      [1,7], [2,7], [13,7], [14,7],
    ]},
    // Wisp tail (wavy bottom)
    { name: 'tail', role: 'leg', pixels: [
      [5,9], [6,9], [7,9], [8,9], [9,9], [10,9],
      [4,10], [6,10], [7,10], [8,10], [9,10], [11,10],
      [5,11], [7,11], [8,11], [10,11],
    ]},
    // Trail wisps
    { name: 'wisps', role: 'belt', pixels: [
      [5,12], [8,12], [10,12],
      [6,13], [9,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// HELLHOUND — Flaming demon dog with fiery mane.
// ════════════════════════════════════════════════════════════
export const HELLHOUND_16: SpriteTemplate = {
  name: 'hellhound_16', width: 16, height: 16,
  description: 'Demonic dog wreathed in hellfire, burning mane, glowing red eyes, fanged snarl.',
  regions: [
    // Fire mane (above head)
    { name: 'mane', role: 'hair', pixels: [
      [3,1], [4,1], [5,1],
      [2,2], [3,2], [4,2], [5,2], [6,2],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      [3,3], [4,3], [5,3], [6,3],
      [2,4], [3,4], [4,4], [5,4], [6,4],
      [2,5], [3,5], [4,5], [5,5],
    ]},
    // Glowing eyes
    { name: 'eyes', role: 'eye', pixels: [
      [3,3], [5,3],
    ]},
    // Snout / fangs
    { name: 'snout', role: 'face', pixels: [
      [1,5], [2,5],
      [1,6], [2,6],
    ]},
    // Body (muscular dog frame, side view)
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 6, 11),
      ...hLine(6, 5, 12),
      ...hLine(7, 5, 12),
      ...hLine(8, 5, 11),
    ]},
    // Tail (flaming upward)
    { name: 'tail', role: 'accessory', pixels: [
      [13,5], [14,4],
      [13,4], [14,3],
    ]},
    // Flame aura along back
    { name: 'back_flames', role: 'belt', pixels: [
      [7,4], [8,4], [9,4], [10,4], [11,4],
    ]},
    // Front legs
    { name: 'front_legs', role: 'leg', pixels: [
      [5,9], [6,9],
      [5,10], [6,10],
      [5,11], [6,11],
    ]},
    // Rear legs
    { name: 'rear_legs', role: 'leg', pixels: [
      [10,9], [11,9],
      [10,10], [11,10],
      [10,11], [11,11],
    ]},
    // Paws
    { name: 'paws', role: 'boot', pixels: [
      [4,12], [5,12], [6,12],
      [10,12], [11,12], [12,12],
    ]},
    // Arms (not used for dog, but adding fire drip)
    { name: 'fire_drip', role: 'arm', pixels: [
      [7,9], [8,9],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// STORM_ELEMENTAL — Lightning elemental crackling with energy.
// ════════════════════════════════════════════════════════════
export const STORM_ELEMENTAL_16: SpriteTemplate = {
  name: 'storm_elemental_16', width: 16, height: 16,
  description: 'Humanoid lightning elemental with crackling electric body and arcing bolts.',
  regions: [
    // Lightning bolts above (arcing from head)
    { name: 'lightning_top', role: 'accessory', pixels: [
      [5,0], [10,0],
      [6,0], [9,0],
      [7,1], [8,1],
    ]},
    // Head (energy sphere)
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 5, 10),
      ...hLine(4, 6, 9),
    ]},
    // Eyes (white-hot)
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [9,3],
    ]},
    // Energy core face
    { name: 'core', role: 'face', pixels: [
      [7,3], [8,3],
    ]},
    // Torso (electric body)
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 6, 9),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 6, 9),
    ]},
    // Arms (arcing lightning)
    { name: 'arms', role: 'arm', pixels: [
      [3,6], [4,6], [11,6], [12,6],
      [2,7], [3,7], [12,7], [13,7],
      [1,8], [2,8], [13,8], [14,8],
    ]},
    // Electric sparks at hands
    { name: 'sparks', role: 'belt', pixels: [
      [1,7], [14,7],
      [0,8], [15,8],
    ]},
    // Legs (electric trails)
    { name: 'legs', role: 'leg', pixels: [
      [6,9], [7,9], [8,9], [9,9],
      [5,10], [6,10], [9,10], [10,10],
      [5,11], [6,11], [9,11], [10,11],
    ]},
    // Ground sparks
    { name: 'ground_sparks', role: 'boot', pixels: [
      [4,12], [5,12], [6,12], [9,12], [10,12], [11,12],
    ]},
    // Body inner glow
    { name: 'inner_glow', role: 'hair', pixels: [
      [7,6], [8,6],
      [7,7], [8,7],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// BONE_DRAGON — Skeletal dragon with wings and tail.
// ════════════════════════════════════════════════════════════
export const BONE_DRAGON_16: SpriteTemplate = {
  name: 'bone_dragon_16', width: 16, height: 16,
  description: 'Skeletal dragon with bony wings, long neck, glowing eye sockets, whipping tail.',
  regions: [
    // Skull (angular dragon skull)
    { name: 'skull', role: 'head', pixels: [
      [1,3], [2,3], [3,3], [4,3],
      [1,4], [2,4], [3,4], [4,4], [5,4],
    ]},
    // Eye socket glow
    { name: 'eyes', role: 'eye', pixels: [
      [2,3], [3,3],
    ]},
    // Jaw
    { name: 'jaw', role: 'face', pixels: [
      [1,5], [2,5], [3,5],
    ]},
    // Neck vertebrae
    { name: 'neck', role: 'hair', pixels: [
      [5,3], [6,3],
      [6,4], [7,4],
    ]},
    // Ribcage / body
    { name: 'body', role: 'body', pixels: [
      [7,5], [8,5], [9,5],
      [7,6], [8,6], [9,6], [10,6],
      [7,7], [8,7], [9,7], [10,7],
      [8,8], [9,8], [10,8],
    ]},
    // Wing bones left
    { name: 'wing_left', role: 'arm', pixels: [
      [6,1], [7,1],
      [7,2], [8,2],
      [8,3], [9,3],
      [9,4], [10,4],
    ]},
    // Wing bones right
    { name: 'wing_right', role: 'arm', pixels: [
      [10,2], [11,2],
      [11,3], [12,3],
      [12,4], [13,4],
      [11,1], [12,1],
    ]},
    // Wing membrane
    { name: 'wing_membrane', role: 'belt', pixels: [
      [8,1], [9,1], [10,1],
      [9,2], [10,2],
      [10,3], [11,3],
    ]},
    // Tail (long whipping)
    { name: 'tail', role: 'leg', pixels: [
      [11,7], [12,7],
      [12,8], [13,8],
      [13,9], [14,9],
      [14,10],
    ]},
    // Tail spike
    { name: 'tail_spike', role: 'accessory', pixels: [
      [14,11], [15,10],
    ]},
    // Legs (bone legs)
    { name: 'legs', role: 'leg', pixels: [
      [7,8], [7,9],
      [8,9], [8,10],
      [10,9], [10,10],
    ]},
    // Claws
    { name: 'claws', role: 'boot', pixels: [
      [6,10], [7,10], [8,11],
      [10,11], [11,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SHADOW_ASSASSIN — Stealthy dark figure with daggers.
// ════════════════════════════════════════════════════════════
export const SHADOW_ASSASSIN_16: SpriteTemplate = {
  name: 'shadow_assassin_16', width: 16, height: 16,
  description: 'Stealthy shadow assassin with dark hood, twin daggers, and smoke wisps.',
  regions: [
    // Hood
    { name: 'hood', role: 'hair', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      [5,3], [6,3], [9,3], [10,3],
    ]},
    // Face (dark, only eyes visible)
    { name: 'head', role: 'head', pixels: [
      [7,3], [8,3],
      [6,4], [7,4], [8,4], [9,4],
    ]},
    // Glowing eyes
    { name: 'eyes', role: 'eye', pixels: [
      [7,3], [8,3],
    ]},
    // Scarf / mask
    { name: 'mask', role: 'face', pixels: [
      [7,4], [8,4],
    ]},
    // Body (slim dark torso)
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 6, 9),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 6, 9),
    ]},
    // Arms
    { name: 'arms', role: 'arm', pixels: [
      [3,6], [4,6], [11,6], [12,6],
      [3,7], [4,7], [11,7], [12,7],
    ]},
    // Daggers
    { name: 'daggers', role: 'accessory', pixels: [
      [2,7], [2,8], [2,9],
      [13,7], [13,8], [13,9],
    ]},
    // Belt
    { name: 'belt', role: 'belt', pixels: [
      ...hLine(9, 5, 10),
    ]},
    // Legs (agile stance)
    { name: 'legs', role: 'leg', pixels: [
      [5,10], [6,10], [9,10], [10,10],
      [5,11], [6,11], [9,11], [10,11],
      [4,12], [5,12], [10,12], [11,12],
    ]},
    // Boots
    { name: 'boots', role: 'boot', pixels: [
      [4,13], [5,13], [10,13], [11,13],
    ]},
    // Smoke wisps
    { name: 'smoke', role: 'hand', pixels: [
      [3,10], [12,10],
      [2,11], [13,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// MUSHROOM_ZOMBIE — Fungal infected zombie with mushroom growths.
// ════════════════════════════════════════════════════════════
export const MUSHROOM_ZOMBIE_16: SpriteTemplate = {
  name: 'mushroom_zombie_16', width: 16, height: 16,
  description: 'Zombie infected with parasitic mushrooms growing from head and body.',
  regions: [
    // Mushroom caps (sprouting from head)
    { name: 'mushroom_caps', role: 'accessory', pixels: [
      [5,0], [6,0], [7,0],
      [9,0], [10,0],
      [4,1], [5,1], [6,1], [7,1],
      [9,1], [10,1], [11,1],
    ]},
    // Mushroom stems
    { name: 'mushroom_stems', role: 'belt', pixels: [
      [6,2], [10,2],
    ]},
    // Head (decayed)
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 7, 9),
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
    ]},
    // Eyes (one glowing, one dark)
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [9,3],
    ]},
    // Exposed jaw
    { name: 'jaw', role: 'face', pixels: [
      [7,4], [8,4],
    ]},
    // Body (rotting)
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 6, 9),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
    ]},
    // Body mushroom growths
    { name: 'body_fungi', role: 'hair', pixels: [
      [4,6], [4,7],
      [11,7], [11,8],
    ]},
    // Arms (stiff zombie arms)
    { name: 'arms', role: 'arm', pixels: [
      [3,6], [3,7], [3,8],
      [12,6], [12,7], [12,8],
    ]},
    // Waist
    { name: 'waist', role: 'belt', pixels: [
      ...hLine(9, 5, 10),
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      [5,10], [6,10], [9,10], [10,10],
      [5,11], [6,11], [9,11], [10,11],
      [5,12], [6,12], [9,12], [10,12],
    ]},
    // Feet (shuffling)
    { name: 'feet', role: 'boot', pixels: [
      [4,13], [5,13], [6,13], [9,13], [10,13], [11,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// CLOCKWORK_SOLDIER — Mechanical wind-up soldier with gears.
// ════════════════════════════════════════════════════════════
export const CLOCKWORK_SOLDIER_16: SpriteTemplate = {
  name: 'clockwork_soldier_16', width: 16, height: 16,
  description: 'Mechanical wind-up soldier with brass body, exposed gears, and clockwork key on back.',
  regions: [
    // Wind-up key (on top)
    { name: 'key', role: 'accessory', pixels: [
      [7,0], [8,0],
      [6,0], [9,0],
      [7,1], [8,1],
    ]},
    // Head (boxy mechanical)
    { name: 'head', role: 'head', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
      ...hLine(4, 5, 10),
    ]},
    // Eyes (glowing lens)
    { name: 'eyes', role: 'eye', pixels: [
      [6,3], [7,3], [8,3], [9,3],
    ]},
    // Mouth grille
    { name: 'grille', role: 'face', pixels: [
      [6,4], [7,4], [8,4], [9,4],
    ]},
    // Body (cylindrical torso)
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 5, 10),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 5, 10),
    ]},
    // Gear exposed on torso
    { name: 'gear', role: 'belt', pixels: [
      [7,6], [8,6],
      [6,7], [9,7],
      [7,7], [8,7],
    ]},
    // Arms (piston-style)
    { name: 'arms', role: 'arm', pixels: [
      [3,5], [4,5], [11,5], [12,5],
      [3,6], [4,6], [11,6], [12,6],
      [3,7], [4,7], [11,7], [12,7],
    ]},
    // Hands (clamp/claw)
    { name: 'hands', role: 'hand', pixels: [
      [2,8], [3,8], [4,8],
      [11,8], [12,8], [13,8],
    ]},
    // Hip joint
    { name: 'hip', role: 'belt', pixels: [
      ...hLine(9, 6, 9),
    ]},
    // Legs (piston legs)
    { name: 'legs', role: 'leg', pixels: [
      [5,10], [6,10], [9,10], [10,10],
      [5,11], [6,11], [9,11], [10,11],
      [5,12], [6,12], [9,12], [10,12],
    ]},
    // Feet (flat platforms)
    { name: 'feet', role: 'boot', pixels: [
      [4,13], [5,13], [6,13], [7,13],
      [8,13], [9,13], [10,13], [11,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SEA_WITCH — Ocean magic caster with tentacle hair and staff.
// ════════════════════════════════════════════════════════════
export const SEA_WITCH_16: SpriteTemplate = {
  name: 'sea_witch_16', width: 16, height: 16,
  description: 'Ocean witch with tentacle hair, shell necklace, coral staff, and flowing dress.',
  regions: [
    // Tentacle hair
    { name: 'hair', role: 'hair', pixels: [
      [5,0], [6,0], [9,0], [10,0],
      [4,1], [5,1], [10,1], [11,1],
      [4,2], [11,2],
    ]},
    // Head
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
    ]},
    // Eyes (sea green glow)
    { name: 'eyes', role: 'eye', pixels: [
      [6,2], [9,2],
    ]},
    // Face
    { name: 'face', role: 'face', pixels: [
      [7,3], [8,3],
    ]},
    // Shell necklace
    { name: 'necklace', role: 'accessory', pixels: [
      [6,4], [7,4], [8,4], [9,4],
    ]},
    // Body (dress)
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 6, 9),
      ...hLine(6, 5, 10),
      ...hLine(7, 5, 10),
      ...hLine(8, 4, 11),
    ]},
    // Coral staff (held in right hand)
    { name: 'staff', role: 'belt', pixels: [
      ...vLine(13, 1, 10),
    ]},
    // Staff orb
    { name: 'staff_orb', role: 'eye', pixels: [
      [12,0], [13,0], [14,0],
      [12,1], [14,1],
    ]},
    // Arms
    { name: 'arms', role: 'arm', pixels: [
      [3,6], [4,6], [11,6], [12,6],
      [3,7], [12,7],
    ]},
    // Flowing dress bottom
    { name: 'dress', role: 'leg', pixels: [
      ...hLine(9, 4, 11),
      ...hLine(10, 3, 12),
      ...hLine(11, 3, 12),
      ...hLine(12, 4, 11),
    ]},
    // Dress frills
    { name: 'frills', role: 'boot', pixels: [
      [3,13], [5,13], [7,13], [8,13], [10,13], [12,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// LAVA_GOLEM — Molten rock golem with glowing magma cracks.
// ════════════════════════════════════════════════════════════
export const LAVA_GOLEM_16: SpriteTemplate = {
  name: 'lava_golem_16', width: 16, height: 16,
  description: 'Massive golem of cooled rock with glowing lava cracks, smoldering eyes, magma drips.',
  regions: [
    // Smoke above
    { name: 'smoke', role: 'hair', pixels: [
      [6,0], [9,0],
      [7,0], [8,0],
    ]},
    // Head (craggy rock)
    { name: 'head', role: 'head', pixels: [
      ...hLine(1, 6, 9),
      ...hLine(2, 5, 10),
      ...hLine(3, 5, 10),
      ...hLine(4, 6, 9),
    ]},
    // Glowing eyes
    { name: 'eyes', role: 'eye', pixels: [
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Lava cracks on face
    { name: 'face_cracks', role: 'face', pixels: [
      [7,3], [8,3],
    ]},
    // Torso (massive rock body)
    { name: 'body', role: 'body', pixels: [
      ...hLine(5, 5, 10),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 11),
      ...hLine(8, 4, 11),
      ...hLine(9, 5, 10),
    ]},
    // Magma cracks on body (glowing lines)
    { name: 'lava_cracks', role: 'accessory', pixels: [
      [6,6], [8,6], [10,6],
      [5,7], [7,7], [9,7],
      [6,8], [8,8], [10,8],
    ]},
    // Arms (thick rocky)
    { name: 'arms', role: 'arm', pixels: [
      [2,6], [3,6], [12,6], [13,6],
      [2,7], [3,7], [12,7], [13,7],
      [2,8], [3,8], [12,8], [13,8],
    ]},
    // Fists (magma dripping)
    { name: 'fists', role: 'hand', pixels: [
      [1,9], [2,9], [3,9],
      [12,9], [13,9], [14,9],
    ]},
    // Legs (pillar-like)
    { name: 'legs', role: 'leg', pixels: [
      [5,10], [6,10], [9,10], [10,10],
      [5,11], [6,11], [9,11], [10,11],
      [5,12], [6,12], [9,12], [10,12],
    ]},
    // Lava drip from legs
    { name: 'lava_drip', role: 'belt', pixels: [
      [4,11], [11,11],
    ]},
    // Feet (molten base)
    { name: 'feet', role: 'boot', pixels: [
      [4,13], [5,13], [6,13], [7,13],
      [8,13], [9,13], [10,13], [11,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// COLOR SCHEMES
// ════════════════════════════════════════════════════════════

export const SKELETON_ARCHER_COLORS = scheme('skeleton_archer_default', {
  head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },     // Bone skull
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Glowing red eyes
  face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Jaw bone
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Ribcage bone
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#d2aa99' },     // Arm bones
  accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Bow wood
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Arrow/pelvis
  leg:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },     // Leg bones
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },     // Feet bones
});

export const SLIME_KING_COLORS = scheme('slime_king_default', {
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Golden crown
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Big bright eyes
  face:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Mouth
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Slime body green
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#6dc2ca' },     // Drips
  boot:      { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },     // Puddle
});

export const FIRE_BAT_COLORS = scheme('fire_bat_default', {
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Flame tips
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wing/body leather
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d04648' },     // Head dark
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Burning eyes
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d04648' },     // Ears
  face:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Fangs
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Feet claws
  leg:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Fire trail
});

export const ICE_GOLEM_COLORS = scheme('ice_golem_default', {
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Crystal spikes
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Ice head
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Glowing cyan eyes
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Ice body
  arm:       { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },     // Ice arms
  hand:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Fist crystals
  belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Ice crack
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },     // Ice legs
  boot:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },     // Frozen feet
});

export const SAND_SCORPION_COLORS = scheme('sand_scorpion_default', {
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Stinger venom
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Tail segments
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Carapace head
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red eyes
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Pincers
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Body carapace
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Legs
  belt:      { shadow: '#854c30', base: '#d2aa99', highlight: '#dad45e' },     // Belly segments
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Ground shadow
});

export const PLAGUE_DOCTOR_COLORS = scheme('plague_doctor_default', {
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Black hat
  head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Dark mask
  eye:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },     // Glowing lens
  face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Beak
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark cloak
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Cloak arm
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Lantern brass
  belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Lantern glow
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Cloak bottom
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Boots
});

export const CRYSTAL_SPIDER_COLORS = scheme('crystal_spider_default', {
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Glowing crystal eyes
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Crystal head
  body:      { shadow: '#442434', base: '#597dce', highlight: '#6dc2ca' },     // Crystal body
  accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Facets shine
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },     // Crystal legs
  arm:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Fangs
  belt:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Crystal glow
});

export const MUMMY_COLORS = scheme('mummy_default', {
  head:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },     // Bandage head
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Golden glow eyes
  face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Exposed skin
  body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },     // Bandage body
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Darker wrapping
  arm:       { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },     // Bandage arms
  hair:      { shadow: '#854c30', base: '#d2aa99', highlight: '#dad45e' },     // Trailing bandages
  leg:       { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },     // Wrapped legs
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Feet wrappings
});

export const DARK_KNIGHT_COLORS = scheme('dark_knight_default', {
  head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Dark helm
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Glowing visor
  face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Gorget
  body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Dark armor
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Pauldrons
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Shield steel
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Sword blade
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Waist leather
  leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Leg armor
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Sabatons
});

export const EYE_BEAST_COLORS = scheme('eye_beast_default', {
  body:      { shadow: '#442434', base: '#d04648', highlight: '#d2aa99' },     // Bloodshot white
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Iris blue
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Pupil dark
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#deeed6' },     // Eye highlight
  face:      { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },     // Blood veins
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Tentacles
  accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Tentacle tips
});

export const ACID_SLIME_COLORS = scheme('acid_slime_default', {
  accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },     // Acid bubbles
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Toxic eyes
  face:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark mouth
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Green slime body
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#6dc2ca' },     // Acid drips
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Acid puddle
  belt:      { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },     // Surface bubbles
  boot:      { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },     // Ground shadow
});

export const GHOST_COLORS = scheme('ghost_default', {
  head:      { shadow: '#597dce', base: '#8595a1', highlight: '#deeed6' },     // Spectral head
  eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Hollow eyes glow
  face:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },     // Open mouth
  body:      { shadow: '#597dce', base: '#8595a1', highlight: '#deeed6' },     // Spectral body
  arm:       { shadow: '#597dce', base: '#8595a1', highlight: '#d2aa99' },     // Wispy arms
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },     // Tail wisps
  belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Trail wisps
});

export const HELLHOUND_COLORS = scheme('hellhound_default', {
  hair:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Fire mane
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark head
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red glowing eyes
  face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },     // Fangs
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark body
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Burning tail
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Back flames
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark legs
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Paws
  arm:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Fire drip
});

export const STORM_ELEMENTAL_COLORS = scheme('storm_elemental_default', {
  accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Lightning bolts white
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Energy head
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // White-hot eyes
  face:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Core
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Electric body
  arm:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#dad45e' },     // Lightning arms
  belt:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Electric sparks
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Electric legs
  boot:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Ground sparks
  hair:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Inner glow
});

export const BONE_DRAGON_COLORS = scheme('bone_dragon_default', {
  head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },     // Skull bone
  eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Green soul fire
  face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Jaw bone
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Neck vertebrae
  body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },     // Ribcage
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Wing bones
  belt:      { shadow: '#346524', base: '#6daa2c', highlight: '#6dc2ca' },     // Wing membrane
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Tail + legs
  accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },     // Tail spike
  boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },     // Claws
});

export const SHADOW_ASSASSIN_COLORS = scheme('shadow_assassin_default', {
  hair:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark hood
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark face
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Glowing eyes
  face:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Mask
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark body
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark arms
  accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Steel daggers
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Leather belt
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark legs
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Silent boots
  hand:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Smoke wisps
});

export const MUSHROOM_ZOMBIE_COLORS = scheme('mushroom_zombie_default', {
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Mushroom caps red/orange
  belt:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },     // Mushroom stems/waist
  head:      { shadow: '#346524', base: '#6daa2c', highlight: '#757161' },     // Decayed green head
  eye:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },     // Glowing spore eye
  face:      { shadow: '#346524', base: '#6daa2c', highlight: '#854c30' },     // Exposed jaw
  body:      { shadow: '#346524', base: '#6daa2c', highlight: '#757161' },     // Rotting body
  hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Body fungi
  arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#854c30' },     // Stiff arms
  leg:       { shadow: '#346524', base: '#854c30', highlight: '#757161' },     // Decayed legs
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Shuffling feet
});

export const CLOCKWORK_SOLDIER_COLORS = scheme('clockwork_soldier_default', {
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Brass key
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Brass head
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Glowing lens
  face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Grille
  body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Brass body
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Gear steel
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Brass arms
  hand:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Steel hands
  leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Brass legs
  boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Steel feet
});

export const SEA_WITCH_COLORS = scheme('sea_witch_default', {
  hair:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Tentacle hair blue
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },     // Skin
  eye:       { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },     // Sea green eyes
  face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },     // Face skin
  accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Shell necklace
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue dress
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Coral staff brown
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },     // Skin arms
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Flowing dress
  boot:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Dress frills
});

export const LAVA_GOLEM_COLORS = scheme('lava_golem_default', {
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Smoke
  head:      { shadow: '#442434', base: '#854c30', highlight: '#4e4a4e' },     // Rock head
  eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Magma eyes
  face:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Lava cracks face
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark rock body
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Magma cracks glow
  arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Rock arms
  hand:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },     // Magma fists
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Rock legs
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Lava drip
  boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Molten feet
});

// ════════════════════════════════════════════════════════════
// EXPORT RECORDS
// ════════════════════════════════════════════════════════════

export const ENEMY_BATCH2_TEMPLATES: Record<string, SpriteTemplate> = {
  skeleton_archer_16:     SKELETON_ARCHER_16,
  slime_king_16:          SLIME_KING_16,
  fire_bat_16:            FIRE_BAT_16,
  ice_golem_16:           ICE_GOLEM_16,
  sand_scorpion_16:       SAND_SCORPION_16,
  plague_doctor_16:       PLAGUE_DOCTOR_16,
  crystal_spider_16:      CRYSTAL_SPIDER_16,
  mummy_16:               MUMMY_16,
  dark_knight_16:         DARK_KNIGHT_16,
  eye_beast_16:           EYE_BEAST_16,
  acid_slime_16:          ACID_SLIME_16,
  ghost_16:               GHOST_16,
  hellhound_16:           HELLHOUND_16,
  storm_elemental_16:     STORM_ELEMENTAL_16,
  bone_dragon_16:         BONE_DRAGON_16,
  shadow_assassin_16:     SHADOW_ASSASSIN_16,
  mushroom_zombie_16:     MUSHROOM_ZOMBIE_16,
  clockwork_soldier_16:   CLOCKWORK_SOLDIER_16,
  sea_witch_16:           SEA_WITCH_16,
  lava_golem_16:          LAVA_GOLEM_16,
};

export const ENEMY_BATCH2_COLOR_SCHEMES: Record<string, ColorScheme> = {
  skeleton_archer_default:     SKELETON_ARCHER_COLORS,
  slime_king_default:          SLIME_KING_COLORS,
  fire_bat_default:            FIRE_BAT_COLORS,
  ice_golem_default:           ICE_GOLEM_COLORS,
  sand_scorpion_default:       SAND_SCORPION_COLORS,
  plague_doctor_default:       PLAGUE_DOCTOR_COLORS,
  crystal_spider_default:      CRYSTAL_SPIDER_COLORS,
  mummy_default:               MUMMY_COLORS,
  dark_knight_default:         DARK_KNIGHT_COLORS,
  eye_beast_default:           EYE_BEAST_COLORS,
  acid_slime_default:          ACID_SLIME_COLORS,
  ghost_default:               GHOST_COLORS,
  hellhound_default:           HELLHOUND_COLORS,
  storm_elemental_default:     STORM_ELEMENTAL_COLORS,
  bone_dragon_default:         BONE_DRAGON_COLORS,
  shadow_assassin_default:     SHADOW_ASSASSIN_COLORS,
  mushroom_zombie_default:     MUSHROOM_ZOMBIE_COLORS,
  clockwork_soldier_default:   CLOCKWORK_SOLDIER_COLORS,
  sea_witch_default:           SEA_WITCH_COLORS,
  lava_golem_default:          LAVA_GOLEM_COLORS,
};
