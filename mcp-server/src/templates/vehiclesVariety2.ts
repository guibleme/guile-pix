/**
 * 16x16 vehicle templates — batch 2.
 * 20 NEW vehicle/transport templates not present in vehicles.ts or vehiclesVariety.ts.
 * All DB16 palette, 16x16, side-view or 3/4 view.
 */

import { SpriteTemplate, ColorScheme } from './humanoid16.js';

// ─── Helper functions ────────────────────────────────────────

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

// ─── Base color scheme ───────────────────────────────────────

const VEH2_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  head:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  face:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  eye:       { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
  body:      { shadow: '#4e4a4e', base: '#757161',  highlight: '#8595a1' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  hand:      { shadow: '#4e4a4e', base: '#8595a1',  highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  leg:       { shadow: '#140c1c', base: '#4e4a4e',  highlight: '#757161' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#4e4a4e' },
  accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof VEH2_BASE>): ColorScheme {
  return { name, mapping: { ...VEH2_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// STEAM_TRAIN — Side-view locomotive with smokestack and wheels.
// ════════════════════════════════════════════════════════════
export const STEAM_TRAIN_16: SpriteTemplate = {
  name: 'steam_train_16', width: 16, height: 16,
  description: 'Side-view steam locomotive with smokestack, boiler, cabin, and large driving wheels.',
  regions: [
    // Smoke puffs above stack
    { name: 'smoke', role: 'accessory', pixels: [
      [3,0], [4,0],
      [2,1], [3,1], [4,1], [5,1],
      [3,2],
    ]},
    // Smokestack
    { name: 'smokestack', role: 'arm', pixels: [
      ...vLine(4, 3, 5),
      [3,5], [5,5],
    ]},
    // Boiler — long cylindrical body
    { name: 'boiler', role: 'body', pixels: [
      ...hLine(6, 2, 9),
      ...hLine(7, 2, 9),
      ...hLine(8, 2, 9),
      ...hLine(9, 2, 9),
    ]},
    // Boiler bands / trim
    { name: 'bands', role: 'belt', pixels: [
      [4,6], [7,6],
      [4,9], [7,9],
    ]},
    // Cabin — rear box
    { name: 'cabin', role: 'head', pixels: [
      ...rect(10, 4, 13, 9),
    ]},
    // Cabin window
    { name: 'window', role: 'eye', pixels: [
      [11,5], [12,5],
      [11,6], [12,6],
    ]},
    // Cabin roof
    { name: 'roof', role: 'hair', pixels: [
      ...hLine(3, 10, 14),
    ]},
    // Cow catcher / front
    { name: 'cowcatcher', role: 'face', pixels: [
      [1,9], [1,10],
    ]},
    // Chassis / undercarriage
    { name: 'chassis', role: 'leg', pixels: [
      ...hLine(10, 2, 13),
    ]},
    // Driving wheels — two large
    { name: 'wheels', role: 'boot', pixels: [
      [3,11], [4,11], [5,11],
      [2,12], [4,12], [6,12],
      [2,13], [4,13], [6,13],
      [3,14], [4,14], [5,14],
      // Rear wheel
      [9,11], [10,11], [11,11],
      [8,12], [10,12], [12,12],
      [8,13], [10,13], [12,13],
      [9,14], [10,14], [11,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// MOTORCYCLE — Street motorcycle with handlebars and exhaust.
// ════════════════════════════════════════════════════════════
export const MOTORCYCLE_16: SpriteTemplate = {
  name: 'motorcycle_16', width: 16, height: 16,
  description: 'Side-view street motorcycle with handlebars, engine, seat, and two wheels.',
  regions: [
    // Handlebars
    { name: 'handlebars', role: 'arm', pixels: [
      [4,3], [5,3],
      [3,4], [4,4],
    ]},
    // Headlight
    { name: 'headlight', role: 'eye', pixels: [
      [2,5], [3,5],
    ]},
    // Fuel tank
    { name: 'tank', role: 'accessory', pixels: [
      [5,5], [6,5], [7,5],
      [5,6], [6,6], [7,6],
    ]},
    // Seat
    { name: 'seat', role: 'head', pixels: [
      [8,5], [9,5], [10,5],
      [9,6], [10,6],
    ]},
    // Engine block
    { name: 'engine', role: 'body', pixels: [
      [5,7], [6,7], [7,7], [8,7],
      [5,8], [6,8], [7,8], [8,8],
      [6,9], [7,9],
    ]},
    // Exhaust pipe
    { name: 'exhaust', role: 'belt', pixels: [
      [9,8], [10,8], [11,8],
      [11,9], [12,9],
    ]},
    // Frame
    { name: 'frame', role: 'leg', pixels: [
      [4,7], [4,8],
      [9,7],
      [9,9], [10,9],
    ]},
    // Front wheel
    { name: 'front_wheel', role: 'boot', pixels: [
      [2,8], [3,8],
      [1,9], [3,9],
      [1,10], [2,10], [3,10],
      [1,11], [3,11],
      [2,12], [3,12],
    ]},
    // Rear wheel
    { name: 'rear_wheel', role: 'boot', pixels: [
      [10,10], [11,10],
      [9,11], [11,11],
      [9,12], [10,12], [11,12],
      [9,13], [11,13],
      [10,14], [11,14],
    ]},
    // Fender
    { name: 'fender', role: 'hair', pixels: [
      [1,8], [12,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// HOVERCRAFT — Floating vehicle with skirt and propeller.
// ════════════════════════════════════════════════════════════
export const HOVERCRAFT_16: SpriteTemplate = {
  name: 'hovercraft_16', width: 16, height: 16,
  description: 'Side-view hovercraft with inflated skirt, cabin, and rear propeller fan.',
  regions: [
    // Propeller / fan at rear
    { name: 'propeller', role: 'accessory', pixels: [
      [13,3], [14,3],
      [13,4],
      [13,5], [14,5],
    ]},
    // Propeller housing
    { name: 'housing', role: 'arm', pixels: [
      [12,2], [12,3], [12,4], [12,5], [12,6],
    ]},
    // Cabin / cockpit
    { name: 'cabin', role: 'head', pixels: [
      [5,2], [6,2], [7,2],
      [4,3], [5,3], [6,3], [7,3], [8,3],
      [4,4], [5,4], [8,4],
    ]},
    // Windshield
    { name: 'windshield', role: 'eye', pixels: [
      [6,4], [7,4],
    ]},
    // Hull — main body
    { name: 'hull', role: 'body', pixels: [
      ...hLine(5, 3, 11),
      ...hLine(6, 2, 11),
      ...hLine(7, 2, 11),
      ...hLine(8, 3, 11),
    ]},
    // Hull stripe
    { name: 'stripe', role: 'belt', pixels: [
      ...hLine(7, 3, 10),
    ]},
    // Inflated skirt (lower cushion)
    { name: 'skirt', role: 'hair', pixels: [
      ...hLine(9, 2, 12),
      ...hLine(10, 1, 13),
      ...hLine(11, 2, 12),
    ]},
    // Air jet lines under skirt
    { name: 'air_jets', role: 'face', pixels: [
      [3,12], [5,12], [7,12], [9,12], [11,12],
    ]},
    // Water surface
    { name: 'water', role: 'leg', pixels: [
      [1,13], [2,13], [5,13], [6,13], [9,13], [10,13], [13,13],
      [0,14], [3,14], [7,14], [8,14], [11,14], [14,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SKATEBOARD — Simple street skateboard with deck and wheels.
// ════════════════════════════════════════════════════════════
export const SKATEBOARD_16: SpriteTemplate = {
  name: 'skateboard_16', width: 16, height: 16,
  description: 'Side-view skateboard with curved deck, grip tape, trucks, and four wheels.',
  regions: [
    // Deck nose kick (left curve up)
    { name: 'nose', role: 'head', pixels: [
      [2,7], [1,6],
    ]},
    // Deck tail kick (right curve up)
    { name: 'tail', role: 'head', pixels: [
      [13,7], [14,6],
    ]},
    // Deck top surface — grip tape
    { name: 'grip_tape', role: 'body', pixels: [
      ...hLine(7, 3, 12),
    ]},
    // Deck bottom
    { name: 'deck_bottom', role: 'belt', pixels: [
      ...hLine(8, 2, 13),
    ]},
    // Deck graphic / stripe
    { name: 'graphic', role: 'accessory', pixels: [
      [5,8], [6,8], [7,8], [8,8], [9,8], [10,8],
    ]},
    // Front trucks
    { name: 'front_truck', role: 'arm', pixels: [
      [3,9], [4,9], [5,9],
    ]},
    // Rear trucks
    { name: 'rear_truck', role: 'arm', pixels: [
      [10,9], [11,9], [12,9],
    ]},
    // Front wheels
    { name: 'front_wheels', role: 'boot', pixels: [
      [2,10], [3,10],
      [2,11], [3,11],
      [5,10], [6,10],
      [5,11], [6,11],
    ]},
    // Rear wheels
    { name: 'rear_wheels', role: 'boot', pixels: [
      [9,10], [10,10],
      [9,11], [10,11],
      [12,10], [13,10],
      [12,11], [13,11],
    ]},
    // Ground line
    { name: 'ground', role: 'leg', pixels: [
      ...hLine(12, 1, 14),
    ]},
    // Wheel highlight
    { name: 'wheel_shine', role: 'eye', pixels: [
      [2,10], [5,10], [9,10], [12,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// ZEPPELIN — Large rigid airship with gondola.
// ════════════════════════════════════════════════════════════
export const ZEPPELIN_16: SpriteTemplate = {
  name: 'zeppelin_16', width: 16, height: 16,
  description: 'Side-view zeppelin airship with elongated gas envelope, fins, and gondola cabin.',
  regions: [
    // Envelope — large elongated body
    { name: 'envelope', role: 'body', pixels: [
      ...hLine(2, 5, 10),
      ...hLine(3, 3, 12),
      ...hLine(4, 2, 13),
      ...hLine(5, 2, 13),
      ...hLine(6, 3, 12),
      ...hLine(7, 4, 11),
    ]},
    // Envelope highlight stripe
    { name: 'highlight', role: 'face', pixels: [
      ...hLine(3, 5, 10),
    ]},
    // Envelope stripe / band
    { name: 'band', role: 'belt', pixels: [
      ...hLine(5, 4, 11),
    ]},
    // Tail fins
    { name: 'fins', role: 'accessory', pixels: [
      [13,3], [14,3],
      [13,6], [14,6],
      [14,4], [14,5],
    ]},
    // Nose cone
    { name: 'nose', role: 'head', pixels: [
      [1,4], [1,5],
    ]},
    // Gondola support lines
    { name: 'supports', role: 'arm', pixels: [
      [5,8], [10,8],
      [6,9], [9,9],
    ]},
    // Gondola cabin
    { name: 'gondola', role: 'hair', pixels: [
      ...hLine(10, 5, 10),
      ...hLine(11, 5, 10),
      ...hLine(12, 6, 9),
    ]},
    // Gondola windows
    { name: 'windows', role: 'eye', pixels: [
      [6,10], [8,10],
      [6,11], [8,11],
    ]},
    // Clouds below
    { name: 'clouds', role: 'leg', pixels: [
      [1,14], [2,14], [3,14], [11,14], [12,14], [13,14],
      [0,15], [1,15], [2,15], [3,15], [12,15], [13,15], [14,15],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// JET_SKI — Personal watercraft on waves.
// ════════════════════════════════════════════════════════════
export const JET_SKI_16: SpriteTemplate = {
  name: 'jet_ski_16', width: 16, height: 16,
  description: 'Side-view jet ski / personal watercraft cutting through waves with spray.',
  regions: [
    // Handlebar post
    { name: 'handlebar', role: 'arm', pixels: [
      [4,4], [5,4],
      [4,5],
    ]},
    // Windshield
    { name: 'windshield', role: 'eye', pixels: [
      [5,5], [6,5],
    ]},
    // Seat
    { name: 'seat', role: 'head', pixels: [
      [7,5], [8,5], [9,5], [10,5],
      [8,4], [9,4],
    ]},
    // Hull — main body
    { name: 'hull', role: 'body', pixels: [
      ...hLine(6, 3, 11),
      ...hLine(7, 2, 12),
      ...hLine(8, 2, 12),
      ...hLine(9, 3, 11),
    ]},
    // Hull stripe / livery
    { name: 'livery', role: 'accessory', pixels: [
      ...hLine(7, 4, 10),
    ]},
    // Hull bottom / keel
    { name: 'keel', role: 'belt', pixels: [
      ...hLine(9, 4, 10),
    ]},
    // Bow / nose
    { name: 'bow', role: 'face', pixels: [
      [1,7], [1,8],
    ]},
    // Jet nozzle at stern
    { name: 'jet_nozzle', role: 'hair', pixels: [
      [13,7], [13,8],
      [14,8],
    ]},
    // Spray / wake
    { name: 'spray', role: 'hand', pixels: [
      [0,6], [1,5],
      [14,6], [13,5],
    ]},
    // Water surface
    { name: 'water', role: 'leg', pixels: [
      [0,10], [1,10], [4,10], [5,10], [8,10], [9,10], [12,10], [13,10],
      [2,11], [3,11], [6,11], [7,11], [10,11], [11,11], [14,11],
      [0,12], [1,12], [5,12], [8,12], [9,12], [13,12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// RICKSHAW — Hand-pulled two-wheeled cart with canopy.
// ════════════════════════════════════════════════════════════
export const RICKSHAW_16: SpriteTemplate = {
  name: 'rickshaw_16', width: 16, height: 16,
  description: 'Side-view hand-pulled rickshaw with canopy, seat, and two large wheels.',
  regions: [
    // Canopy / shade top
    { name: 'canopy', role: 'accessory', pixels: [
      ...hLine(1, 6, 12),
      ...hLine(2, 5, 13),
      ...hLine(3, 5, 13),
    ]},
    // Canopy support poles
    { name: 'poles', role: 'arm', pixels: [
      [5,4], [5,5],
      [13,4], [13,5],
    ]},
    // Seat back
    { name: 'seat_back', role: 'head', pixels: [
      ...vLine(12, 4, 8),
    ]},
    // Seat cushion
    { name: 'cushion', role: 'body', pixels: [
      ...hLine(6, 6, 11),
      ...hLine(7, 6, 11),
      ...hLine(8, 6, 11),
    ]},
    // Seat trim
    { name: 'trim', role: 'belt', pixels: [
      ...hLine(5, 6, 12),
    ]},
    // Footrest
    { name: 'footrest', role: 'face', pixels: [
      [6,9], [7,9],
    ]},
    // Pull shafts
    { name: 'shafts', role: 'hair', pixels: [
      [1,7], [2,7], [3,7], [4,7], [5,7],
      [1,8], [2,8],
    ]},
    // Shaft handle grips
    { name: 'grips', role: 'eye', pixels: [
      [1,6], [2,6],
    ]},
    // Wheels
    { name: 'wheels', role: 'boot', pixels: [
      [8,9], [9,9], [10,9], [11,9],
      [7,10], [9,10], [12,10],
      [7,11], [9,11], [12,11],
      [7,12], [9,12], [12,12],
      [8,13], [9,13], [10,13], [11,13],
    ]},
    // Wheel hub
    { name: 'hub', role: 'eye', pixels: [
      [9,11],
    ]},
    // Ground
    { name: 'ground', role: 'leg', pixels: [
      ...hLine(14, 1, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// WAR_ELEPHANT — Armored war elephant with howdah.
// ════════════════════════════════════════════════════════════
export const WAR_ELEPHANT_16: SpriteTemplate = {
  name: 'war_elephant_16', width: 16, height: 16,
  description: 'Side-view armored war elephant with tusks, trunk, blanket, and howdah tower on back.',
  regions: [
    // Howdah / battle tower
    { name: 'howdah', role: 'accessory', pixels: [
      ...hLine(1, 7, 10),
      [7,2], [10,2],
      ...hLine(3, 7, 10),
    ]},
    // Howdah interior
    { name: 'howdah_inside', role: 'eye', pixels: [
      [8,2], [9,2],
    ]},
    // Elephant head
    { name: 'head', role: 'head', pixels: [
      [3,3], [4,3], [5,3],
      [2,4], [3,4], [4,4], [5,4],
      [2,5], [3,5], [4,5],
    ]},
    // Eye
    { name: 'eye', role: 'eye', pixels: [
      [3,4],
    ]},
    // Trunk
    { name: 'trunk', role: 'face', pixels: [
      [2,6], [1,7], [1,8], [2,9],
    ]},
    // Tusks
    { name: 'tusks', role: 'hand', pixels: [
      [3,6], [2,7],
    ]},
    // Body — main bulk
    { name: 'body', role: 'body', pixels: [
      ...hLine(4, 6, 10),
      ...hLine(5, 5, 11),
      ...hLine(6, 4, 11),
      ...hLine(7, 4, 12),
      ...hLine(8, 4, 12),
      ...hLine(9, 5, 11),
    ]},
    // Blanket / armor on back
    { name: 'blanket', role: 'belt', pixels: [
      ...hLine(4, 7, 10),
      [6,5], [11,5],
    ]},
    // Legs
    { name: 'legs', role: 'leg', pixels: [
      [4,10], [5,10], [10,10], [11,10],
      [4,11], [5,11], [10,11], [11,11],
      [4,12], [5,12], [10,12], [11,12],
    ]},
    // Feet
    { name: 'feet', role: 'boot', pixels: [
      [4,13], [5,13], [10,13], [11,13],
    ]},
    // Tail
    { name: 'tail', role: 'hair', pixels: [
      [13,7], [14,8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// GONDOLA — Venetian gondola on water with pole.
// ════════════════════════════════════════════════════════════
export const GONDOLA_16: SpriteTemplate = {
  name: 'gondola_16', width: 16, height: 16,
  description: 'Side-view Venetian gondola with curved prow, passenger bench, and long oar pole.',
  regions: [
    // Oar pole — long diagonal
    { name: 'oar', role: 'arm', pixels: [
      [12,1], [12,2], [12,3], [12,4], [12,5], [12,6], [12,7], [12,8],
      [13,9], [13,10],
    ]},
    // Decorative prow (ferro)
    { name: 'ferro', role: 'accessory', pixels: [
      [1,5], [2,5],
      [1,6], [2,6],
      [1,7],
    ]},
    // Gunwale / rim
    { name: 'gunwale', role: 'belt', pixels: [
      ...hLine(7, 3, 13),
    ]},
    // Hull body
    { name: 'hull', role: 'body', pixels: [
      ...hLine(8, 2, 13),
      ...hLine(9, 3, 13),
      ...hLine(10, 4, 12),
    ]},
    // Passenger bench
    { name: 'bench', role: 'head', pixels: [
      [5,6], [6,6], [7,6], [8,6],
      [5,7], [8,7],
    ]},
    // Seat cushion
    { name: 'cushion', role: 'face', pixels: [
      [6,7], [7,7],
    ]},
    // Stern platform
    { name: 'stern', role: 'hair', pixels: [
      [13,6], [14,6], [14,7],
    ]},
    // Keel line
    { name: 'keel', role: 'leg', pixels: [
      ...hLine(11, 5, 11),
    ]},
    // Water
    { name: 'water', role: 'boot', pixels: [
      [1,11], [2,11], [5,11], [6,11], [9,11], [10,11], [13,11], [14,11],
      [0,12], [3,12], [4,12], [7,12], [8,12], [11,12], [12,12],
      [1,13], [2,13], [5,13], [6,13], [9,13], [10,13], [13,13], [14,13],
      [0,14], [3,14], [7,14], [11,14], [14,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// STAGECOACH — Horse-drawn stagecoach with luggage on top.
// ════════════════════════════════════════════════════════════
export const STAGECOACH_16: SpriteTemplate = {
  name: 'stagecoach_16', width: 16, height: 16,
  description: 'Side-view stagecoach with enclosed cabin, luggage rack, and two large wheels.',
  regions: [
    // Luggage on roof
    { name: 'luggage', role: 'accessory', pixels: [
      [5,1], [6,1], [7,1], [8,1], [9,1],
      [5,2], [6,2], [7,2], [8,2], [9,2],
    ]},
    // Roof
    { name: 'roof', role: 'hair', pixels: [
      ...hLine(3, 4, 10),
    ]},
    // Cabin body
    { name: 'cabin', role: 'body', pixels: [
      ...rect(4, 4, 10, 8),
    ]},
    // Windows
    { name: 'windows', role: 'eye', pixels: [
      [5,5], [6,5],
      [5,6], [6,6],
      [8,5], [9,5],
      [8,6], [9,6],
    ]},
    // Door detail
    { name: 'door', role: 'belt', pixels: [
      [7,4], [7,5], [7,6], [7,7], [7,8],
    ]},
    // Door handle
    { name: 'handle', role: 'face', pixels: [
      [6,7],
    ]},
    // Coach step
    { name: 'step', role: 'head', pixels: [
      [4,9], [5,9],
    ]},
    // Undercarriage / springs
    { name: 'undercarriage', role: 'leg', pixels: [
      ...hLine(9, 6, 10),
    ]},
    // Pull bar
    { name: 'pull_bar', role: 'arm', pixels: [
      [1,8], [2,8], [3,8],
      [1,9],
    ]},
    // Front wheel
    { name: 'front_wheel', role: 'boot', pixels: [
      [3,10], [4,10],
      [2,11], [5,11],
      [2,12], [5,12],
      [3,13], [4,13],
    ]},
    // Rear wheel
    { name: 'rear_wheel', role: 'boot', pixels: [
      [9,10], [10,10], [11,10],
      [8,11], [10,11], [12,11],
      [8,12], [10,12], [12,12],
      [9,13], [10,13], [11,13],
    ]},
    // Ground
    { name: 'ground', role: 'leg', pixels: [
      ...hLine(14, 1, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// KAYAK — Slim enclosed kayak with double paddle.
// ════════════════════════════════════════════════════════════
export const KAYAK_16: SpriteTemplate = {
  name: 'kayak_16', width: 16, height: 16,
  description: 'Side-view slim kayak with spray skirt opening and double-bladed paddle.',
  regions: [
    // Paddle blade left
    { name: 'paddle_left', role: 'accessory', pixels: [
      [2,2], [3,2],
      [2,3], [3,3],
    ]},
    // Paddle shaft
    { name: 'shaft', role: 'arm', pixels: [
      [4,4], [5,5], [6,6], [7,6], [8,5], [9,4],
    ]},
    // Paddle blade right
    { name: 'paddle_right', role: 'accessory', pixels: [
      [10,2], [11,2],
      [10,3], [11,3],
    ]},
    // Cockpit rim / spray skirt
    { name: 'cockpit_rim', role: 'belt', pixels: [
      [5,7], [6,7], [7,7], [8,7], [9,7],
    ]},
    // Deck / hull top
    { name: 'deck', role: 'head', pixels: [
      [3,7], [4,7], [10,7], [11,7],
      ...hLine(8, 2, 12),
    ]},
    // Hull body
    { name: 'hull', role: 'body', pixels: [
      ...hLine(9, 2, 13),
      ...hLine(10, 3, 12),
      ...hLine(11, 5, 10),
    ]},
    // Bow point
    { name: 'bow', role: 'face', pixels: [
      [1,8], [1,9],
    ]},
    // Stern point
    { name: 'stern', role: 'face', pixels: [
      [14,8], [14,9],
    ]},
    // Cockpit interior (dark)
    { name: 'cockpit', role: 'eye', pixels: [
      [6,8], [7,8], [8,8],
    ]},
    // Water
    { name: 'water', role: 'leg', pixels: [
      [0,12], [1,12], [4,12], [5,12], [8,12], [9,12], [12,12], [13,12],
      [2,13], [3,13], [6,13], [7,13], [10,13], [11,13], [14,13],
      [0,14], [1,14], [5,14], [8,14], [12,14], [13,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// CATAPULT — Medieval siege weapon with throwing arm.
// ════════════════════════════════════════════════════════════
export const CATAPULT_16: SpriteTemplate = {
  name: 'catapult_16', width: 16, height: 16,
  description: 'Side-view medieval catapult with throwing arm, bucket, frame, and wheels.',
  regions: [
    // Throwing arm — diagonal beam
    { name: 'throwing_arm', role: 'arm', pixels: [
      [3,1], [4,2], [5,3], [6,4], [7,5], [8,6], [9,7],
    ]},
    // Bucket / sling at end
    { name: 'bucket', role: 'accessory', pixels: [
      [2,2], [2,3],
      [1,3], [3,3],
    ]},
    // Projectile
    { name: 'projectile', role: 'eye', pixels: [
      [2,1],
    ]},
    // Axle pivot
    { name: 'pivot', role: 'belt', pixels: [
      [8,5], [9,5],
      [8,6],
    ]},
    // Frame / base structure
    { name: 'frame', role: 'body', pixels: [
      ...hLine(7, 4, 12),
      ...hLine(8, 4, 12),
      ...hLine(9, 4, 12),
      ...hLine(10, 5, 11),
    ]},
    // Frame cross bracing
    { name: 'bracing', role: 'head', pixels: [
      [6,8], [10,8],
      [5,9], [11,9],
    ]},
    // Winch / rope
    { name: 'winch', role: 'hair', pixels: [
      [11,6], [12,6], [12,7],
    ]},
    // Wheels
    { name: 'wheels', role: 'boot', pixels: [
      [4,11], [5,11],
      [3,12], [6,12],
      [3,13], [6,13],
      [4,14], [5,14],
      // Rear wheel
      [10,11], [11,11],
      [9,12], [12,12],
      [9,13], [12,13],
      [10,14], [11,14],
    ]},
    // Ground
    { name: 'ground', role: 'leg', pixels: [
      ...hLine(15, 2, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// PATROL_CAR — Modern police/patrol car, side view.
// ════════════════════════════════════════════════════════════
export const PATROL_CAR_16: SpriteTemplate = {
  name: 'patrol_car_16', width: 16, height: 16,
  description: 'Side-view patrol car with light bar, windows, and two wheels.',
  regions: [
    // Light bar
    { name: 'light_bar', role: 'accessory', pixels: [
      [6,2], [7,2], [8,2], [9,2],
    ]},
    // Roof
    { name: 'roof', role: 'head', pixels: [
      ...hLine(3, 5, 10),
    ]},
    // Windshield / rear window
    { name: 'windshield', role: 'eye', pixels: [
      [4,4], [5,4],
      [4,5], [5,5],
      [10,4], [11,4],
      [10,5], [11,5],
    ]},
    // Cabin pillars
    { name: 'pillars', role: 'hair', pixels: [
      [3,4], [6,4], [9,4], [12,4],
      [3,5], [6,5], [9,5], [12,5],
    ]},
    // Body panels
    { name: 'body', role: 'body', pixels: [
      ...hLine(6, 2, 13),
      ...hLine(7, 1, 14),
      ...hLine(8, 1, 14),
    ]},
    // Stripe / livery
    { name: 'stripe', role: 'belt', pixels: [
      ...hLine(7, 3, 12),
    ]},
    // Headlight
    { name: 'headlight', role: 'face', pixels: [
      [1,7], [14,7],
    ]},
    // Bumpers
    { name: 'bumpers', role: 'arm', pixels: [
      [1,9], [14,9],
    ]},
    // Undercarriage
    { name: 'undercarriage', role: 'leg', pixels: [
      ...hLine(9, 2, 13),
    ]},
    // Front wheel
    { name: 'front_wheel', role: 'boot', pixels: [
      [2,10], [3,10], [4,10],
      [2,11], [3,11], [4,11],
      [2,12], [3,12], [4,12],
    ]},
    // Rear wheel
    { name: 'rear_wheel', role: 'boot', pixels: [
      [11,10], [12,10], [13,10],
      [11,11], [12,11], [13,11],
      [11,12], [12,12], [13,12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// TRIREME — Ancient Greek warship with ram and oars.
// ════════════════════════════════════════════════════════════
export const TRIREME_16: SpriteTemplate = {
  name: 'trireme_16', width: 16, height: 16,
  description: 'Side-view ancient Greek trireme warship with ram bow, oar bank, and single sail.',
  regions: [
    // Sail
    { name: 'sail', role: 'accessory', pixels: [
      [8,0], [9,0],
      ...hLine(1, 7, 10),
      ...hLine(2, 7, 10),
      ...hLine(3, 7, 10),
    ]},
    // Mast
    { name: 'mast', role: 'arm', pixels: [
      ...vLine(7, 0, 8),
    ]},
    // Deck / gunwale
    { name: 'deck', role: 'belt', pixels: [
      ...hLine(7, 2, 13),
    ]},
    // Hull body
    { name: 'hull', role: 'body', pixels: [
      ...hLine(8, 2, 13),
      ...hLine(9, 3, 13),
      ...hLine(10, 4, 12),
    ]},
    // Ram bow
    { name: 'ram', role: 'head', pixels: [
      [1,8], [1,9],
      [0,9],
    ]},
    // Eye decoration on bow
    { name: 'bow_eye', role: 'eye', pixels: [
      [2,8],
    ]},
    // Stern post
    { name: 'stern', role: 'hair', pixels: [
      [14,6], [14,7],
      [13,5], [13,6],
    ]},
    // Oar bank
    { name: 'oars', role: 'face', pixels: [
      [3,9], [5,9], [7,9], [9,9], [11,9],
      [3,10], [5,10], [7,10], [9,10], [11,10],
    ]},
    // Keel
    { name: 'keel', role: 'leg', pixels: [
      ...hLine(11, 5, 11),
    ]},
    // Water
    { name: 'water', role: 'boot', pixels: [
      [1,12], [2,12], [5,12], [6,12], [9,12], [10,12], [13,12],
      [0,13], [3,13], [7,13], [8,13], [11,13], [14,13],
      [1,14], [4,14], [5,14], [9,14], [12,14], [13,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// MINE_TROLLEY — Open mine trolley on tracks (different from cart).
// ════════════════════════════════════════════════════════════
export const MINE_TROLLEY_16: SpriteTemplate = {
  name: 'mine_trolley_16', width: 16, height: 16,
  description: 'Side-view open mine trolley platform with lantern, crates, and rail wheels.',
  regions: [
    // Lantern on pole
    { name: 'lantern', role: 'eye', pixels: [
      [3,2], [4,2],
      [3,3], [4,3],
    ]},
    // Lantern pole
    { name: 'pole', role: 'arm', pixels: [
      ...vLine(3, 4, 7),
    ]},
    // Crates on platform
    { name: 'crates', role: 'accessory', pixels: [
      ...rect(7, 4, 10, 7),
    ]},
    // Crate detail
    { name: 'crate_cross', role: 'belt', pixels: [
      [8,5], [9,5],
      [8,6], [9,6],
    ]},
    // Platform deck
    { name: 'platform', role: 'body', pixels: [
      ...hLine(8, 2, 12),
      ...hLine(9, 2, 12),
    ]},
    // Platform edge
    { name: 'edge', role: 'head', pixels: [
      [2,7], [12,7],
    ]},
    // Axle / truck frame
    { name: 'truck', role: 'hair', pixels: [
      ...hLine(10, 3, 11),
    ]},
    // Wheels
    { name: 'wheels', role: 'boot', pixels: [
      [3,11], [4,11],
      [3,12], [4,12],
      [10,11], [11,11],
      [10,12], [11,12],
    ]},
    // Rails
    { name: 'rails', role: 'leg', pixels: [
      ...hLine(13, 1, 14),
      [2,14], [5,14], [8,14], [11,14], [14,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// HANG_GLIDER — Person hanging from delta wing.
// ════════════════════════════════════════════════════════════
export const HANG_GLIDER_16: SpriteTemplate = {
  name: 'hang_glider_16', width: 16, height: 16,
  description: 'Front-angled view of a hang glider with triangular delta wing and harness.',
  regions: [
    // Wing — large delta triangle
    { name: 'wing', role: 'body', pixels: [
      [7,1], [8,1],
      ...hLine(2, 5, 10),
      ...hLine(3, 4, 11),
      ...hLine(4, 3, 12),
      ...hLine(5, 2, 13),
    ]},
    // Wing leading edge highlight
    { name: 'leading_edge', role: 'face', pixels: [
      [7,1], [8,1],
      [5,2], [10,2],
      [3,4], [12,4],
      [2,5], [13,5],
    ]},
    // Wing stripe
    { name: 'wing_stripe', role: 'accessory', pixels: [
      ...hLine(3, 6, 9),
    ]},
    // Control frame / A-frame bar
    { name: 'control_bar', role: 'arm', pixels: [
      [7,2], [8,2],
      [6,3], [9,3],
      [5,4], [10,4],
      ...hLine(5, 5, 10),
    ]},
    // Harness / hang point
    { name: 'harness', role: 'belt', pixels: [
      [7,6], [8,6],
      [7,7], [8,7],
    ]},
    // Pilot body (hanging below)
    { name: 'pilot', role: 'head', pixels: [
      [7,8], [8,8],
      [7,9], [8,9],
      [7,10], [8,10],
    ]},
    // Pilot legs
    { name: 'legs', role: 'leg', pixels: [
      [7,11], [8,11],
      [7,12],
    ]},
    // Sky / clouds
    { name: 'clouds', role: 'hair', pixels: [
      [1,13], [2,13], [3,13], [12,13], [13,13], [14,13],
      [0,14], [1,14], [13,14], [14,14],
    ]},
    // Wing tip accents
    { name: 'wing_tips', role: 'eye', pixels: [
      [2,5], [13,5],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// DOGSLED — Sled pulled by dog team on snow.
// ════════════════════════════════════════════════════════════
export const DOGSLED_16: SpriteTemplate = {
  name: 'dogsled_16', width: 16, height: 16,
  description: 'Side-view dogsled with runner sled, harness lines, and two sled dogs.',
  regions: [
    // Lead dog
    { name: 'lead_dog', role: 'accessory', pixels: [
      [1,6], [2,6], [3,6],
      [1,7], [2,7], [3,7],
      [1,8], [3,8],
    ]},
    // Dog eye
    { name: 'dog_eye', role: 'eye', pixels: [
      [1,6],
    ]},
    // Second dog
    { name: 'rear_dog', role: 'accessory', pixels: [
      [4,6], [5,6], [6,6],
      [4,7], [5,7], [6,7],
      [4,8], [6,8],
    ]},
    // Harness lines
    { name: 'harness', role: 'arm', pixels: [
      [7,7], [8,7],
    ]},
    // Sled cargo / seat
    { name: 'cargo', role: 'body', pixels: [
      ...hLine(6, 9, 13),
      ...hLine(7, 9, 13),
      ...hLine(8, 9, 13),
    ]},
    // Sled handlebar
    { name: 'handlebar', role: 'head', pixels: [
      [13,4], [13,5],
      [14,4],
    ]},
    // Blanket / cover
    { name: 'blanket', role: 'belt', pixels: [
      ...hLine(6, 10, 12),
    ]},
    // Sled runners
    { name: 'runners', role: 'hair', pixels: [
      ...hLine(9, 8, 14),
      [8,10], [14,10],
    ]},
    // Dog legs
    { name: 'dog_legs', role: 'leg', pixels: [
      [1,9], [3,9], [4,9], [6,9],
    ]},
    // Snow surface
    { name: 'snow', role: 'face', pixels: [
      ...hLine(10, 0, 7),
      ...hLine(11, 0, 14),
      [1,12], [3,12], [6,12], [9,12], [12,12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// CHARIOT_RACER — Lightweight racing chariot with horses.
// ════════════════════════════════════════════════════════════
export const CHARIOT_RACER_16: SpriteTemplate = {
  name: 'chariot_racer_16', width: 16, height: 16,
  description: 'Side-view lightweight Roman racing chariot with single large wheel and horse.',
  regions: [
    // Horse head
    { name: 'horse_head', role: 'head', pixels: [
      [1,3], [2,3],
      [1,4], [2,4], [3,4],
      [1,5], [2,5],
    ]},
    // Horse eye
    { name: 'horse_eye', role: 'eye', pixels: [
      [2,3],
    ]},
    // Horse body
    { name: 'horse_body', role: 'body', pixels: [
      [3,5], [4,5], [5,5],
      [3,6], [4,6], [5,6], [6,6],
      [3,7], [4,7], [5,7], [6,7],
    ]},
    // Horse legs
    { name: 'horse_legs', role: 'leg', pixels: [
      [2,8], [3,8], [5,8], [6,8],
      [2,9], [3,9], [5,9], [6,9],
    ]},
    // Horse hooves
    { name: 'hooves', role: 'boot', pixels: [
      [2,10], [3,10], [5,10], [6,10],
    ]},
    // Harness pole
    { name: 'pole', role: 'arm', pixels: [
      [7,7], [8,7], [9,7],
    ]},
    // Chariot body — light curved shell
    { name: 'chariot', role: 'accessory', pixels: [
      [10,5], [11,5],
      [10,6], [11,6], [12,6],
      [10,7], [11,7], [12,7],
      [10,8], [11,8], [12,8],
    ]},
    // Chariot rim
    { name: 'rim', role: 'belt', pixels: [
      [9,5], [9,6], [9,7], [9,8],
    ]},
    // Chariot wheel — single large wheel
    { name: 'wheel', role: 'hair', pixels: [
      [10,9], [11,9], [12,9],
      [9,10], [11,10], [13,10],
      [9,11], [11,11], [13,11],
      [9,12], [11,12], [13,12],
      [10,13], [11,13], [12,13],
    ]},
    // Wheel hub
    { name: 'hub', role: 'eye', pixels: [
      [11,11],
    ]},
    // Ground
    { name: 'ground', role: 'face', pixels: [
      ...hLine(14, 0, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SNOW_MOBILE — Modern snowmobile with tracks and skis.
// ════════════════════════════════════════════════════════════
export const SNOW_MOBILE_16: SpriteTemplate = {
  name: 'snow_mobile_16', width: 16, height: 16,
  description: 'Side-view snowmobile with windshield, seat, track belt, and front skis.',
  regions: [
    // Windshield
    { name: 'windshield', role: 'eye', pixels: [
      [4,3], [5,3],
      [3,4], [4,4],
    ]},
    // Handlebar
    { name: 'handlebar', role: 'arm', pixels: [
      [5,4], [6,4],
    ]},
    // Hood / cowl
    { name: 'hood', role: 'head', pixels: [
      ...hLine(5, 3, 7),
      ...hLine(6, 2, 7),
    ]},
    // Headlight
    { name: 'headlight', role: 'face', pixels: [
      [2,5], [2,6],
    ]},
    // Seat
    { name: 'seat', role: 'accessory', pixels: [
      [8,4], [9,4], [10,4],
      [8,5], [9,5], [10,5],
    ]},
    // Engine / body
    { name: 'body', role: 'body', pixels: [
      ...hLine(7, 3, 12),
      ...hLine(8, 4, 12),
    ]},
    // Body stripe
    { name: 'stripe', role: 'belt', pixels: [
      [5,7], [6,7], [7,7], [8,7],
    ]},
    // Track belt (rear drive)
    { name: 'track', role: 'boot', pixels: [
      ...hLine(9, 6, 13),
      ...hLine(10, 6, 13),
      ...hLine(11, 7, 12),
    ]},
    // Track treads / cleats
    { name: 'treads', role: 'leg', pixels: [
      [7,10], [9,10], [11,10], [13,10],
    ]},
    // Front ski
    { name: 'ski', role: 'hair', pixels: [
      [1,9], [2,9], [3,9], [4,9], [5,9],
      [1,10],
    ]},
    // Snow surface
    { name: 'snow', role: 'hand', pixels: [
      ...hLine(12, 0, 14),
      [2,13], [5,13], [9,13], [12,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// PHOENIX_MOUNT — Flaming phoenix bird as flying mount.
// ════════════════════════════════════════════════════════════
export const PHOENIX_MOUNT_16: SpriteTemplate = {
  name: 'phoenix_mount_16', width: 16, height: 16,
  description: 'Side-view flying phoenix mount with spread fiery wings and long tail feathers.',
  regions: [
    // Head / beak
    { name: 'head', role: 'head', pixels: [
      [2,4], [3,4],
      [1,5], [2,5], [3,5],
      [1,6],
    ]},
    // Eye
    { name: 'eye', role: 'eye', pixels: [
      [2,4],
    ]},
    // Upper wing — spread upward
    { name: 'upper_wing', role: 'accessory', pixels: [
      [5,0], [6,0], [7,0],
      [4,1], [5,1], [6,1], [7,1], [8,1],
      [4,2], [5,2], [6,2], [7,2], [8,2], [9,2],
      [5,3], [6,3], [7,3], [8,3],
    ]},
    // Body
    { name: 'body', role: 'body', pixels: [
      [4,5], [5,5], [6,5],
      [4,6], [5,6], [6,6], [7,6],
      [5,7], [6,7], [7,7], [8,7],
    ]},
    // Lower wing
    { name: 'lower_wing', role: 'arm', pixels: [
      [3,7], [4,7],
      [2,8], [3,8], [4,8],
      [3,9], [4,9],
    ]},
    // Saddle / riding area
    { name: 'saddle', role: 'belt', pixels: [
      [5,4], [6,4], [7,4],
    ]},
    // Tail feathers — long flowing
    { name: 'tail', role: 'hair', pixels: [
      [9,7], [10,7],
      [10,8], [11,8], [12,8],
      [12,9], [13,9], [14,9],
      [13,10], [14,10],
    ]},
    // Flame particles
    { name: 'flames', role: 'face', pixels: [
      [4,0], [9,1],
      [11,7], [14,8],
      [15,9], [15,10],
    ]},
    // Talons
    { name: 'talons', role: 'leg', pixels: [
      [5,8], [6,8],
      [5,9],
    ]},
    // Sky / embers
    { name: 'embers', role: 'boot', pixels: [
      [1,11], [3,12], [7,11], [10,12], [13,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// FISHING_BOAT — Small fishing vessel with net.
// ════════════════════════════════════════════════════════════
export const FISHING_BOAT_16: SpriteTemplate = {
  name: 'fishing_boat_16', width: 16, height: 16,
  description: 'Side-view small fishing boat with cabin, crane, fishing net, and buoys.',
  regions: [
    // Crane / boom arm
    { name: 'crane', role: 'arm', pixels: [
      [10,1], [11,1],
      [10,2],
      [10,3], [11,3], [12,3],
    ]},
    // Net hanging from crane
    { name: 'net', role: 'face', pixels: [
      [12,4], [13,4],
      [11,5], [12,5], [13,5],
      [12,6],
    ]},
    // Cabin
    { name: 'cabin', role: 'head', pixels: [
      ...rect(3, 2, 6, 5),
    ]},
    // Cabin window
    { name: 'window', role: 'eye', pixels: [
      [4,3], [5,3],
      [4,4], [5,4],
    ]},
    // Cabin roof
    { name: 'roof', role: 'hair', pixels: [
      ...hLine(1, 3, 7),
    ]},
    // Buoys on deck
    { name: 'buoys', role: 'accessory', pixels: [
      [8,5], [9,5],
    ]},
    // Hull deck
    { name: 'deck', role: 'belt', pixels: [
      ...hLine(6, 2, 12),
    ]},
    // Hull body
    { name: 'hull', role: 'body', pixels: [
      ...hLine(7, 2, 13),
      ...hLine(8, 3, 12),
      ...hLine(9, 4, 11),
    ]},
    // Bow
    { name: 'bow', role: 'head', pixels: [
      [1,6], [1,7],
    ]},
    // Keel
    { name: 'keel', role: 'leg', pixels: [
      ...hLine(10, 5, 10),
    ]},
    // Water
    { name: 'water', role: 'boot', pixels: [
      [0,11], [1,11], [4,11], [5,11], [8,11], [9,11], [12,11], [13,11],
      [2,12], [3,12], [6,12], [7,12], [10,12], [11,12], [14,12],
      [0,13], [1,13], [5,13], [8,13], [12,13], [13,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// SPACE_SHUTTLE — Winged spacecraft landing / side view.
// ════════════════════════════════════════════════════════════
export const SPACE_SHUTTLE_16: SpriteTemplate = {
  name: 'space_shuttle_16', width: 16, height: 16,
  description: 'Side-view space shuttle with delta wings, cargo bay, and tail fin.',
  regions: [
    // Nose cone
    { name: 'nose', role: 'head', pixels: [
      [1,7], [2,7],
      [1,8],
    ]},
    // Cockpit windows
    { name: 'cockpit', role: 'eye', pixels: [
      [3,6], [4,6],
      [3,7],
    ]},
    // Fuselage
    { name: 'fuselage', role: 'body', pixels: [
      ...hLine(7, 3, 12),
      ...hLine(8, 2, 12),
      ...hLine(9, 3, 11),
    ]},
    // Fuselage upper
    { name: 'fuselage_top', role: 'face', pixels: [
      ...hLine(6, 5, 11),
    ]},
    // Cargo bay doors
    { name: 'cargo_doors', role: 'belt', pixels: [
      [6,7], [7,7], [8,7], [9,7], [10,7],
    ]},
    // Delta wing — extends below fuselage
    { name: 'wing', role: 'arm', pixels: [
      [5,10], [6,10], [7,10], [8,10], [9,10], [10,10],
      [4,11], [5,11], [6,11], [7,11], [8,11], [9,11], [10,11], [11,11],
    ]},
    // Wing detail
    { name: 'wing_stripe', role: 'accessory', pixels: [
      [5,10], [6,10], [7,10],
    ]},
    // Tail fin — vertical stabilizer
    { name: 'tail_fin', role: 'hair', pixels: [
      [12,3], [13,3],
      [12,4], [13,4],
      [12,5], [13,5],
      [12,6],
    ]},
    // Engine nozzles
    { name: 'engines', role: 'leg', pixels: [
      [13,8], [14,8],
      [13,9], [14,9],
    ]},
    // Engine glow
    { name: 'engine_glow', role: 'boot', pixels: [
      [15,8], [15,9],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// COLOR SCHEMES
// ════════════════════════════════════════════════════════════

export const STEAM_TRAIN_COLORS = scheme('steam_train_default', {
  body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Iron boiler
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Cabin wood
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Roof metal
  belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Brass bands
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Window glass
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Smokestack iron
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark wheels
  accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // White smoke
  face:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Cowcatcher metal
  leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Chassis
});

export const MOTORCYCLE_COLORS = scheme('motorcycle_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Engine metal
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Seat dark leather
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red fuel tank
  arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Chrome handlebars
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Headlight bright
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark rubber tires
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Exhaust pipe
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Fender metal
  leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Frame dark
});

export const HOVERCRAFT_COLORS = scheme('hovercraft_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Light grey hull
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue cabin
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Windshield glass
  arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Housing dark
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Orange propeller
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Hull stripe
  hair:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },     // Tan skirt
  face:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Air jets
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Water blue
});

export const SKATEBOARD_COLORS = scheme('skateboard_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood grip tape
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Nose/tail wood
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Deck bottom dark
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Graphic stripe
  arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Silver trucks
  boot:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Orange wheels
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },     // Wheel shine
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Ground
});

export const ZEPPELIN_COLORS = scheme('zeppelin_default', {
  body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },     // Light grey envelope
  face:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Highlight stripe
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red/orange band
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red tail fins
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Nose cone
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Brown supports
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Gondola wood
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Windows
  leg:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },     // White clouds
});

export const JET_SKI_COLORS = scheme('jet_ski_default', {
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue hull
  head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark seat
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Racing stripe
  arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Chrome handlebar
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Windshield
  belt:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },     // Dark keel
  face:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Bow accent
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Jet nozzle
  hand:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },     // Spray
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Water blue
});

export const RICKSHAW_COLORS = scheme('rickshaw_default', {
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red canopy
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood poles
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Seat back wood
  body:      { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' },     // Red cushion
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Gold trim
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood shafts
  eye:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Metal grips
  face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Footrest wood
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark wheels
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Ground
});

export const WAR_ELEPHANT_COLORS = scheme('war_elephant_default', {
  body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Grey elephant
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Grey head
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red/gold howdah
  eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },     // Dark eyes
  face:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },     // Light trunk
  hand:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // White tusks
  belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },     // Red blanket/armor
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Grey legs
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Dark feet
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Brown tail
});

export const GONDOLA_COLORS = scheme('gondola_default', {
  body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Black hull
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood oar
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood gunwale
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Gold ferro
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood bench
  face:      { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' },     // Red cushion
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Stern wood
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark keel
  boot:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue water
});

export const STAGECOACH_COLORS = scheme('stagecoach_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood cabin
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood roof
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Luggage tan
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Window glass
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Door detail dark
  face:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Brass handle
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal step
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Pull bar wood
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Iron wheels
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Ground/grass
});

export const KAYAK_COLORS = scheme('kayak_default', {
  body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Orange hull
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Orange deck
  belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark rim
  accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Paddle blades
  arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Silver shaft
  face:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Bow/stern
  eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark cockpit
  leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue water
});

export const CATAPULT_COLORS = scheme('catapult_default', {
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood throwing arm
  accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood bucket
  eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Stone projectile
  belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal pivot
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood frame
  head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Cross bracing
  hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Rope/winch
  boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Iron wheels
  leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Ground
});

export const PATROL_CAR_COLORS = scheme('patrol_car_default', {
  body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue body panels
  head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // White roof
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red/amber light bar
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Glass windshield
  hair:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Dark pillars
  belt:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },     // White stripe
  face:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Headlight bright
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Chrome bumper
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark tires
  leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Undercarriage
});

export const TRIREME_COLORS = scheme('trireme_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood hull
  accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // White sail
  arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood mast
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Deck rail
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal ram
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Blue bow eye
  hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Stern post wood
  face:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },     // Light oars
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark keel
  boot:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue water
});

export const MINE_TROLLEY_COLORS = scheme('mine_trolley_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood platform
  eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Lantern glow
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal pole
  accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood crates
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Crate cross
  head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal edge
  hair:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Truck frame
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark wheels
  leg:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Metal rails
});

export const HANG_GLIDER_COLORS = scheme('hang_glider_default', {
  body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Orange wing
  face:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Leading edge
  accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue wing stripe
  arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Aluminum bar
  belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Brown harness
  head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue pilot suit
  leg:       { shadow: '#30346d', base: '#442434', highlight: '#597dce' },     // Pilot legs
  hair:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },     // White clouds
  eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },     // Bright wing tips
});

export const DOGSLED_COLORS = scheme('dogsled_default', {
  accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // White/grey dogs
  eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },     // Dog eyes dark
  arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Harness leather
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood sled/cargo
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Handlebar wood
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red blanket
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal runners
  leg:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },     // Dog legs grey
  face:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },     // White snow
});

export const CHARIOT_RACER_COLORS = scheme('chariot_racer_default', {
  head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Horse head brown
  eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },     // Horse eye dark
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Horse body brown
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Horse legs
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Dark hooves
  arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Metal pole
  accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Gold chariot
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red rim
  hair:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Iron wheel
  face:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },     // Ground
});

export const SNOW_MOBILE_COLORS = scheme('snow_mobile_default', {
  body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Dark body
  head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Hood dark
  eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },     // Windshield
  arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Chrome handlebar
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Red seat
  face:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Headlight bright
  belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Body stripe
  boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },     // Track belt dark
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Track cleats
  hair:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },     // Ski metal
  hand:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },     // Snow
});

export const PHOENIX_MOUNT_COLORS = scheme('phoenix_mount_default', {
  body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Warm orange body
  head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Warm head
  eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },     // Bright eye
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Fiery wings
  arm:       { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },     // Lower wing
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Saddle gold
  hair:      { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },     // Bright tail feathers
  face:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },     // Flame particles
  leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Dark talons
  boot:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },     // Embers
});

export const FISHING_BOAT_COLORS = scheme('fishing_boat_default', {
  body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },     // Wood hull
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // White cabin
  hair:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal roof
  eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },     // Window glass
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Metal crane
  face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },     // Rope net
  accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Orange buoys
  belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },     // Deck trim
  leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },     // Dark keel
  boot:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue water
});

export const SPACE_SHUTTLE_COLORS = scheme('space_shuttle_default', {
  body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // White fuselage
  head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // White nose cone
  eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue cockpit
  face:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },     // Fuselage top
  belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Dark cargo doors
  arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Grey wing
  accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },     // Blue wing stripe
  hair:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },     // Dark tail fin
  leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },     // Engine nozzles
  boot:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },     // Engine glow
});

// ════════════════════════════════════════════════════════════
// EXPORT RECORDS
// ════════════════════════════════════════════════════════════

export const VEHICLE_BATCH2_TEMPLATES: Record<string, SpriteTemplate> = {
  steam_train_16:     STEAM_TRAIN_16,
  motorcycle_16:      MOTORCYCLE_16,
  hovercraft_16:      HOVERCRAFT_16,
  skateboard_16:      SKATEBOARD_16,
  zeppelin_16:        ZEPPELIN_16,
  jet_ski_16:         JET_SKI_16,
  rickshaw_16:        RICKSHAW_16,
  war_elephant_16:    WAR_ELEPHANT_16,
  gondola_16:         GONDOLA_16,
  stagecoach_16:      STAGECOACH_16,
  kayak_16:           KAYAK_16,
  catapult_16:        CATAPULT_16,
  patrol_car_16:      PATROL_CAR_16,
  trireme_16:         TRIREME_16,
  mine_trolley_16:    MINE_TROLLEY_16,
  hang_glider_16:     HANG_GLIDER_16,
  dogsled_16:         DOGSLED_16,
  chariot_racer_16:   CHARIOT_RACER_16,
  snow_mobile_16:     SNOW_MOBILE_16,
  phoenix_mount_16:   PHOENIX_MOUNT_16,
  fishing_boat_16:    FISHING_BOAT_16,
  space_shuttle_16:   SPACE_SHUTTLE_16,
};

export const VEHICLE_BATCH2_COLOR_SCHEMES: Record<string, ColorScheme> = {
  steam_train_default:     STEAM_TRAIN_COLORS,
  motorcycle_default:      MOTORCYCLE_COLORS,
  hovercraft_default:      HOVERCRAFT_COLORS,
  skateboard_default:      SKATEBOARD_COLORS,
  zeppelin_default:        ZEPPELIN_COLORS,
  jet_ski_default:         JET_SKI_COLORS,
  rickshaw_default:        RICKSHAW_COLORS,
  war_elephant_default:    WAR_ELEPHANT_COLORS,
  gondola_default:         GONDOLA_COLORS,
  stagecoach_default:      STAGECOACH_COLORS,
  kayak_default:           KAYAK_COLORS,
  catapult_default:        CATAPULT_COLORS,
  patrol_car_default:      PATROL_CAR_COLORS,
  trireme_default:         TRIREME_COLORS,
  mine_trolley_default:    MINE_TROLLEY_COLORS,
  hang_glider_default:     HANG_GLIDER_COLORS,
  dogsled_default:         DOGSLED_COLORS,
  chariot_racer_default:   CHARIOT_RACER_COLORS,
  snow_mobile_default:     SNOW_MOBILE_COLORS,
  phoenix_mount_default:   PHOENIX_MOUNT_COLORS,
  fishing_boat_default:    FISHING_BOAT_COLORS,
  space_shuttle_default:   SPACE_SHUTTLE_COLORS,
};
