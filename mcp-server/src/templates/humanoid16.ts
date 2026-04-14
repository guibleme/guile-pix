/**
 * 16x16 humanoid character templates – 3/4 RPG VIEW (Earthbound/Stardew).
 *
 * Base skeleton derived from Body Base v4 reference.
 * 3/4 top-down perspective: camera is slightly above and in front.
 * You see the TOP of the head and the character faces toward the viewer.
 *
 * SKELETON (3/4 RPG view — all characters share this grid):
 *
 *      0 1 2 3 4 5 6 7 8 9 A B C D E F
 *  0   . . . . . . . . . . . . . . . .   reserved (hats/crowns)
 *  1   . . . . . . . H H . . . . . . .   hair/top (2px, crown visible from above)
 *  2   . . . . . . H H H H . . . . . .   head (4px)
 *  3   . . . . . H F F F F H . . . . .   head frame + face (6px)
 *  4   . . . . . H E F F E H . . . . .   head frame + eyes + face
 *  5   . . . . . H F F F F H . . . . .   head frame + face
 *  6   . . . . . . F F F F . . . . . .   jaw (4px)
 *  7   . . . . . . . F F . . . . . . .   chin (2px)
 *  8   . . . . . A B B B B A . . . . .   arms (1px) + body (4px)
 *  9   . . . . . A B B B B A . . . . .   arms + body
 * 10   . . . . . h T T T T h . . . . .   hands + belt
 * 11   . . . . . . L L L L . . . . . .   hips (4px)
 * 12   . . . . . . L . . L . . . . . .   legs (1px each, 2px gap)
 * 13   . . . . . . L . . L . . . . . .   legs
 * 14   . . . . . B B . . B B . . . . .   boots (2px each)
 * 15   . . . . . . . . . . . . . . . .   ground
 *
 * Design rules:
 * - Head = rows 1-7 (visible from 3/4 above), centered at x7.5
 * - Head max width = 6px (x5-x10), curve: 2-4-6-6-6-4-2
 * - Body = 4px wide (x6-x9), NOT 6-8px — thinner = more air = more readable
 * - Arms = 1px base (x5, x10); warriors/tanks can extend to 2px
 * - Legs = 1px each (x6, x9); 2px gap between
 * - Boots = 2px each (x5-6, x9-10); wider than legs for grounding
 * - Each character differs ONLY in head decoration + accessories
 * - Density: 25-40% base (accessories add 5-15%)
 * - DB16 palette only, no pure black/white
 */

export interface SpriteRegion {
  name: string;
  role: 'hair' | 'head' | 'face' | 'eye' | 'body' | 'arm' | 'hand' | 'belt' | 'leg' | 'boot' | 'accessory' | 'accent' | 'trim';
  tone?: 'shadow' | 'base' | 'highlight';
  pixels: Array<[number, number]>;
}

export interface SpriteTemplate {
  name: string;
  width: number;
  height: number;
  description: string;
  regions: SpriteRegion[];
}

export interface ColorScheme {
  name: string;
  mapping: Record<string, { shadow: string; base: string; highlight: string }>;
}

// ═══════════════════════════════════════════════════════════════
// SHARED SKELETON — every humanoid reuses these exact coordinates
// ═══════════════════════════════════════════════════════════════

/** Top of head visible from 3/4 above (rows 1-2) */
export const SKEL_HEAD_TOP: [number, number][] = [
  [7,1],[8,1],
  [6,2],[7,2],[8,2],[9,2],
];

/** Head frame sides (rows 3-5, border around face) */
export const SKEL_HEAD_SIDES: [number, number][] = [
  [5,3],[10,3],
  [5,4],[10,4],
  [5,5],[10,5],
];

/** Full round head (top + sides combined) */
export const SKEL_HEAD: [number, number][] = [
  ...SKEL_HEAD_TOP,
  ...SKEL_HEAD_SIDES,
];

/** Face (rows 3-7, inside head frame) */
export const SKEL_FACE: [number, number][] = [
  [6,3],[7,3],[8,3],[9,3],
  [6,4],[7,4],[8,4],[9,4],
  [6,5],[7,5],[8,5],[9,5],
  [6,6],[7,6],[8,6],[9,6],
  [7,7],[8,7],
];

/** Eyes (row 4, inside face — overlaps with face pixels) */
export const SKEL_EYES: [number, number][] = [[6,4],[9,4]];

/** Body core (rows 8-9, 4px wide) */
export const SKEL_BODY: [number, number][] = [
  [6,8],[7,8],[8,8],[9,8],
  [6,9],[7,9],[8,9],[9,9],
];

/** Arms — 1px stubs each side (rows 8-9) */
export const SKEL_ARMS: [number, number][] = [
  [5,8],[10,8],
  [5,9],[10,9],
];

/** Arms — 2px wide each side (for armored/muscular characters) */
export const SKEL_ARMS_WIDE: [number, number][] = [
  [4,8],[5,8],[10,8],[11,8],
  [4,9],[5,9],[10,9],[11,9],
];

/** Hands (row 10) */
export const SKEL_HANDS: [number, number][] = [[5,10],[10,10]];

/** Belt/waist (row 10, 4px) */
export const SKEL_BELT: [number, number][] = [
  [6,10],[7,10],[8,10],[9,10],
];

/** Hips (row 11, 4px) */
export const SKEL_HIPS: [number, number][] = [
  [6,11],[7,11],[8,11],[9,11],
];

/** Legs (rows 12-13, 1px each with 2px gap) */
export const SKEL_LEGS: [number, number][] = [
  [6,12],[9,12],
  [6,13],[9,13],
];

/** Boots (row 14, 2px each — wider than legs for grounding) */
export const SKEL_BOOTS: [number, number][] = [
  [5,14],[6,14],[9,14],[10,14],
];

/** Robe flare (replaces hips+legs+boots for robed characters, rows 11-14) */
export const SKEL_ROBE_LOWER: [number, number][] = [
  [5,11],[6,11],[7,11],[8,11],[9,11],[10,11],
  [4,12],[5,12],[6,12],[7,12],[8,12],[9,12],[10,12],[11,12],
  [4,13],[5,13],[6,13],[7,13],[8,13],[9,13],[10,13],[11,13],
  [5,14],[6,14],[9,14],[10,14],
];


// ═══════════════════════════════════════════════════════════════
// KNIGHT — Helmet with crest, visor slit, armored body, shield
// Identity: helmet crest + visor + wide armored arms + shield
// ═══════════════════════════════════════════════════════════════
export const KNIGHT_16: SpriteTemplate = {
  name: 'knight_16',
  width: 16,
  height: 16,
  description: '3/4 view chibi knight. Reinforced visor helmet, broad pauldrons, and compact kite shield.',
  regions: [
    { name: 'crest', role: 'accessory', pixels: [[7,0],[8,0],[7,1]] },
    { name: 'helmet', role: 'head', pixels: [
      ...SKEL_HEAD,
      [6,5],[9,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [7,6],[8,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[7,4],[8,4]] },
    { name: 'armor', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS_WIDE },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'shield', role: 'accessory', pixels: [
      [11,9],[12,9],
      [11,10],[12,10],
      [12,11],
    ]},
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: [
      [4,14],[5,14],[6,14],[9,14],[10,14],[11,14],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// MAGE — Tall pointed hat, open face, A-line robe
// Identity: pointed hat + wide brim + robe flare
// ═══════════════════════════════════════════════════════════════
export const MAGE_16: SpriteTemplate = {
  name: 'mage_16',
  width: 16,
  height: 16,
  description: '3/4 view chibi mage. Tall brimmed hat, staff accent, and layered robe flare.',
  regions: [
    { name: 'hat_point', role: 'accessory', pixels: [[8,0]] },
    { name: 'hat', role: 'head', pixels: [
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],
      [4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],
      [5,4],[10,4],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,4],[7,4],[8,4],[9,4],
      [5,5],[6,5],[7,5],[8,5],[9,5],[10,5],
      [6,6],[7,6],[8,6],[9,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6,4],[9,4]] },
    { name: 'robe_upper', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: [[5,10],[10,10]] },
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'robe_lower', role: 'leg', pixels: SKEL_ROBE_LOWER },
    { name: 'staff', role: 'accessory', pixels: [
      [11,4],[11,5],[11,6],[11,7],[11,8],[11,9],[11,10],[11,11],[11,12],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// ROGUE — Deep hood, cape, dagger hint
// Identity: deep hood shadow + bright eyes + cape on one side
// ═══════════════════════════════════════════════════════════════
export const ROGUE_16: SpriteTemplate = {
  name: 'rogue_16',
  width: 16,
  height: 16,
  description: '3/4 view chibi rogue. Tight hood, masked face slit, short cape, and hidden dagger.',
  regions: [
    { name: 'hood', role: 'head', pixels: [
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [7,6],[8,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[7,4],[8,4]] },
    { name: 'tunic', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'cape', role: 'accessory', pixels: [
      [11,7],
      [12,8],
      [12,9],
      [11,10],
    ]},
    { name: 'dagger', role: 'accessory', pixels: [[4,9],[4,10],[4,11]] },
    { name: 'mask', role: 'accessory', pixels: [[7,5],[8,5]] },
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
  ],
};

// ═══════════════════════════════════════════════════════════════
// ARCHER — Hood, bow on left side, quiver on back
// Identity: hood + bow arc + quiver arrows
// ═══════════════════════════════════════════════════════════════
export const ARCHER_16: SpriteTemplate = {
  name: 'archer_16',
  width: 16,
  height: 16,
  description: '3/4 view chibi archer. Forest hood, clear bow silhouette, and shoulder quiver.',
  regions: [
    { name: 'hood', role: 'head', pixels: [
      [7,1],[8,1],
      [6,2],[7,2],[8,2],[9,2],
      [5,3],[10,3],
      [5,4],[10,4],
      [5,5],[10,5],
    ]},
    { name: 'face', role: 'face', pixels: [
      [6,3],[7,3],[8,3],[9,3],
      [6,4],[7,4],[8,4],[9,4],
      [6,5],[7,5],[8,5],[9,5],
      [7,6],[8,6],
      [7,7],[8,7],
    ]},
    { name: 'eyes', role: 'eye', pixels: [[6,4],[9,4]] },
    { name: 'tunic', role: 'body', pixels: SKEL_BODY },
    { name: 'arms', role: 'arm', pixels: [
      [4,8],[5,8],[10,8],[11,8],
      [4,9],[5,9],[10,9],[11,9],
    ]},
    { name: 'hands', role: 'hand', pixels: [[4,10],[10,10]] },
    { name: 'bow', role: 'accessory', pixels: [
      [2,6],
      [3,7],
      [3,8],
      [3,9],
      [2,10],
      [4,7],[4,8],[4,9],
    ]},
    { name: 'quiver', role: 'accessory', pixels: [
      [11,5],[12,5],
      [11,6],[12,6],
      [12,7],
    ]},
    { name: 'belt', role: 'belt', pixels: SKEL_BELT },
    { name: 'legs', role: 'leg', pixels: [...SKEL_HIPS, ...SKEL_LEGS] },
    { name: 'boots', role: 'boot', pixels: SKEL_BOOTS },
  ],
};

// ═══════════════════════════════════════════════════════════════
// CLERIC — Golden headpiece, open face, white robes, holy emblem
// Identity: golden headband + holy emblem + robe
// ═══════════════════════════════════════════════════════════════
export const CLERIC_16: SpriteTemplate = {
  name: 'cleric_16',
  width: 16,
  height: 16,
  description: '3/4 view chibi cleric. Blessed circlet, ceremonial stole, and flowing temple robe.',
  regions: [
    { name: 'headpiece', role: 'hair', pixels: [
      [7,0],[8,0],
      [6,1],[7,1],[8,1],[9,1],
    ]},
    { name: 'head', role: 'head', pixels: SKEL_HEAD },
    { name: 'face', role: 'face', pixels: SKEL_FACE },
    { name: 'eyes', role: 'eye', pixels: SKEL_EYES },
    { name: 'robe', role: 'body', pixels: SKEL_BODY },
    { name: 'emblem', role: 'accessory', pixels: [[7,8],[8,8]] },
    { name: 'arms', role: 'arm', pixels: SKEL_ARMS },
    { name: 'hands', role: 'hand', pixels: SKEL_HANDS },
    { name: 'stole', role: 'accessory', pixels: [[7,8],[8,8],[7,9],[8,9]] },
    { name: 'sash', role: 'belt', pixels: SKEL_BELT },
    { name: 'robe_lower', role: 'leg', pixels: SKEL_ROBE_LOWER },
    { name: 'boots', role: 'boot', pixels: [[5,14],[6,14],[9,14],[10,14]] },
  ],
};


// ═══════════════════════════════════════════════════════════════
// Color Schemes — DB16, cool shadows, warm highlights
// ═══════════════════════════════════════════════════════════════

export const KNIGHT_COLORS: ColorScheme = {
  name: 'knight_default',
  mapping: {
    head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  },
};

export const MAGE_COLORS: ColorScheme = {
  name: 'mage_default',
  mapping: {
    head:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
    arm:       { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    leg:       { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  },
};

export const ROGUE_COLORS: ColorScheme = {
  name: 'rogue_default',
  mapping: {
    head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    accessory: { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },
  },
};

export const ARCHER_COLORS: ColorScheme = {
  name: 'archer_default',
  mapping: {
    hair:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  },
};

export const CLERIC_COLORS: ColorScheme = {
  name: 'cleric_default',
  mapping: {
    hair:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
    head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' }, // black eyes
    body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    arm:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
    leg:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  },
};


// ═══════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════

export const TEMPLATES: Record<string, SpriteTemplate> = {
  knight_16: KNIGHT_16,
  mage_16: MAGE_16,
  rogue_16: ROGUE_16,
  archer_16: ARCHER_16,
  cleric_16: CLERIC_16,
};

export const COLOR_SCHEMES: Record<string, ColorScheme> = {
  knight_default: KNIGHT_COLORS,
  mage_default: MAGE_COLORS,
  rogue_default: ROGUE_COLORS,
  archer_default: ARCHER_COLORS,
  cleric_default: CLERIC_COLORS,
};
