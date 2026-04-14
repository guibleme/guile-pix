/**
 * 16x16 vehicle and transport templates for RPG/adventure games.
 * Each template defines pixel regions by functional part, repurposing
 * humanoid roles for vehicle anatomy:
 *
 *   'body'      = hull / main structure
 *   'accessory' = sail / decoration / flag
 *   'belt'      = trim / edge / railing
 *   'arm'       = mast / structural beam
 *   'boot'      = wheels / base / keel
 *   'eye'       = windows / lights / portholes
 *   'leg'       = supports / rails / water
 *   'head'      = cabin / upper structure
 *   'face'      = floor / deck
 *   'hand'      = rigging / rope / detail
 *
 * All coordinates are within the [0, 15] range for 16x16 sprites.
 * Vehicles fill roughly 10-14px of canvas width, centered.
 * DB16 palette used throughout.
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// =================================================================
// BOAT_16 - Small rowboat/sailboat. Hull sits low in water,
//           single mast with triangular sail. ~70 pixels.
// =================================================================
export const BOAT_16: SpriteTemplate = {
  name: 'boat_16',
  width: 16,
  height: 16,
  description: 'Small sailboat with wooden hull, single mast, and triangular sail on gentle water.',
  regions: [
    // Sail (rows 1-7) - triangular, attached to mast
    { name: 'sail', role: 'accessory', pixels: [
      [8, 1],
      [8, 2], [9, 2],
      [8, 3], [9, 3], [10, 3],
      [8, 4], [9, 4], [10, 4], [11, 4],
      [8, 5], [9, 5], [10, 5], [11, 5],
      [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
    ]},
    // Mast (rows 1-9) - vertical pole
    { name: 'mast', role: 'arm', pixels: [
      [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9],
    ]},
    // Flag at mast top (row 0)
    { name: 'flag', role: 'eye', pixels: [
      [7, 0], [6, 0], [5, 0],
    ]},
    // Hull upper / gunwale (row 8) - wide rim of boat
    { name: 'gunwale', role: 'belt', pixels: [
      [3, 8], [4, 8], [5, 8], [6, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
    ]},
    // Hull body (rows 9-11) - wooden planked hull
    { name: 'hull', role: 'body', pixels: [
      // Row 9
      [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9],
      // Row 10 - slightly narrower
      [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      // Row 11 - keel area
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Bow point (rows 8-9) - front of boat
    { name: 'bow', role: 'head', pixels: [
      [2, 8], [2, 9],
    ]},
    // Stern (rows 8-9) - back of boat
    { name: 'stern', role: 'head', pixels: [
      [13, 8], [13, 9],
    ]},
    // Keel (row 12) - bottom of hull
    { name: 'keel', role: 'boot', pixels: [
      [6, 12], [7, 12], [8, 12], [9, 12],
    ]},
    // Water surface (rows 13-15)
    { name: 'water', role: 'leg', pixels: [
      [1, 13], [2, 13], [3, 13], [5, 13], [6, 13], [10, 13], [11, 13], [13, 13], [14, 13],
      [0, 14], [3, 14], [4, 14], [7, 14], [8, 14], [11, 14], [12, 14], [15, 14],
      [1, 15], [2, 15], [5, 15], [6, 15], [9, 15], [10, 15], [13, 15], [14, 15],
    ]},
  ],
};

// =================================================================
// CART_16 - Wooden cart with two wheels. Side view, open top,
//           flat bed with side rails. ~65 pixels.
// =================================================================
export const CART_16: SpriteTemplate = {
  name: 'cart_16',
  width: 16,
  height: 16,
  description: 'Wooden cart with flat bed, side rails, and two spoked wheels. Side view.',
  regions: [
    // Handle / pull bar (rows 5-7) - extends left
    { name: 'handle', role: 'arm', pixels: [
      [1, 6], [2, 6], [3, 6],
      [1, 7],
    ]},
    // Side rail top (row 3-4) - raised edges
    { name: 'rail_top', role: 'belt', pixels: [
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],
      [4, 4], [12, 4],
    ]},
    // Cart bed / platform (rows 5-7) - flat planked surface
    { name: 'bed', role: 'body', pixels: [
      // Row 5 - side wall
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
      // Row 6 - floor
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      // Row 7 - underside
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
    ]},
    // Cargo hint on cart (rows 4-5) - stacked goods
    { name: 'cargo', role: 'accessory', pixels: [
      [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
      [7, 4], [8, 4], [9, 4],
    ]},
    // Axle (row 8) - horizontal beam connecting wheels
    { name: 'axle', role: 'head', pixels: [
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
    ]},
    // Left wheel (rows 9-13) - spoked circle
    { name: 'wheel_left', role: 'boot', pixels: [
      [4, 9], [5, 9], [6, 9],
      [3, 10], [5, 10], [7, 10],
      [3, 11], [5, 11], [7, 11],
      [3, 12], [5, 12], [7, 12],
      [4, 13], [5, 13], [6, 13],
    ]},
    // Right wheel (rows 9-13) - spoked circle
    { name: 'wheel_right', role: 'boot', pixels: [
      [10, 9], [11, 9], [12, 9],
      [9, 10], [11, 10], [13, 10],
      [9, 11], [11, 11], [13, 11],
      [9, 12], [11, 12], [13, 12],
      [10, 13], [11, 13], [12, 13],
    ]},
    // Wheel hub / center
    { name: 'hub', role: 'eye', pixels: [
      [5, 11], [11, 11],
    ]},
    // Ground line (row 14)
    { name: 'ground', role: 'leg', pixels: [
      [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
    ]},
  ],
};

// =================================================================
// RAFT_16 - Wooden raft on water. Flat platform of lashed logs,
//           small pole/flag. ~65 pixels.
// =================================================================
export const RAFT_16: SpriteTemplate = {
  name: 'raft_16',
  width: 16,
  height: 16,
  description: 'Flat wooden raft made of lashed logs floating on water, with a small pole and flag.',
  regions: [
    // Pole / flag (rows 1-6) - vertical pole with pennant
    { name: 'pole', role: 'arm', pixels: [
      [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6],
    ]},
    // Flag / pennant (rows 1-3)
    { name: 'flag', role: 'accessory', pixels: [
      [11, 1], [12, 1], [13, 1],
      [11, 2], [12, 2],
      [11, 3],
    ]},
    // Raft platform - logs (rows 7-10) - flat surface
    { name: 'logs', role: 'body', pixels: [
      // Row 7 - top surface
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
      // Row 8 - log detail
      [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      // Row 9 - underside
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      // Row 10 - bottom edge visible
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
    ]},
    // Lashing / rope bindings (rows 8-9) - cross ties
    { name: 'lashing', role: 'belt', pixels: [
      [4, 8], [8, 8], [12, 8],
      [4, 9], [8, 9], [12, 9],
    ]},
    // Crate on raft (rows 5-6)
    { name: 'crate', role: 'head', pixels: [
      [4, 5], [5, 5], [6, 5],
      [4, 6], [5, 6], [6, 6],
    ]},
    // Crate detail
    { name: 'crate_detail', role: 'eye', pixels: [
      [5, 5],
    ]},
    // Water surface (rows 11-15)
    { name: 'water', role: 'leg', pixels: [
      [1, 11], [2, 11], [5, 11], [6, 11], [9, 11], [10, 11], [13, 11], [14, 11],
      [0, 12], [3, 12], [4, 12], [7, 12], [8, 12], [11, 12], [12, 12], [15, 12],
      [1, 13], [2, 13], [5, 13], [6, 13], [9, 13], [10, 13], [13, 13], [14, 13],
      [0, 14], [3, 14], [7, 14], [8, 14], [11, 14], [15, 14],
      [1, 15], [5, 15], [6, 15], [9, 15], [10, 15], [14, 15],
    ]},
  ],
};

// =================================================================
// MINECART_16 - Mine cart on rails. Trapezoidal body, two wheels
//               on rail track. ~60 pixels.
// =================================================================
export const MINECART_16: SpriteTemplate = {
  name: 'minecart_16',
  width: 16,
  height: 16,
  description: 'Mine cart with trapezoidal iron body on rail track, two small wheels, loaded with ore.',
  regions: [
    // Ore / cargo in cart (rows 3-5) - heaped above rim
    { name: 'ore', role: 'accessory', pixels: [
      [7, 3], [8, 3],
      [6, 4], [7, 4], [8, 4], [9, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
    ]},
    // Cart rim (row 6) - top edge
    { name: 'rim', role: 'belt', pixels: [
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
    ]},
    // Cart body (rows 7-10) - trapezoidal shape, narrowing toward bottom
    { name: 'cart_body', role: 'body', pixels: [
      // Row 7 - widest
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      // Row 8
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      // Row 9
      [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      // Row 10 - narrowest
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Cart rivet / detail
    { name: 'rivets', role: 'eye', pixels: [
      [4, 7], [11, 7],
      [5, 9], [10, 9],
    ]},
    // Axle (row 11)
    { name: 'axle', role: 'head', pixels: [
      [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11],
    ]},
    // Left wheel (rows 11-13)
    { name: 'wheel_left', role: 'boot', pixels: [
      [3, 11], [4, 11],
      [3, 12], [4, 12],
      [3, 13], [4, 13],
    ]},
    // Right wheel (rows 11-13)
    { name: 'wheel_right', role: 'boot', pixels: [
      [11, 11], [12, 11],
      [11, 12], [12, 12],
      [11, 13], [12, 13],
    ]},
    // Rails (row 14-15) - two parallel rails with ties
    { name: 'rails', role: 'leg', pixels: [
      // Rail ties
      [2, 14], [5, 14], [8, 14], [11, 14], [14, 14],
      // Left rail
      [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15],
      // Right rail
      [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15],
    ]},
  ],
};

// =================================================================
// CANOE_16 - Slim canoe. Long narrow hull, paddle resting across,
//            centered on water. ~55 pixels.
// =================================================================
export const CANOE_16: SpriteTemplate = {
  name: 'canoe_16',
  width: 16,
  height: 16,
  description: 'Slim canoe with curved hull and paddle resting across it, floating on water.',
  regions: [
    // Paddle blade (rows 4-6) - angled across canoe
    { name: 'paddle_blade', role: 'accessory', pixels: [
      [3, 4], [4, 4],
      [3, 5], [4, 5],
      [4, 6],
    ]},
    // Paddle shaft (rows 6-8) - diagonal line
    { name: 'paddle_shaft', role: 'arm', pixels: [
      [5, 6], [6, 7], [7, 7], [8, 7], [9, 8], [10, 8],
    ]},
    // Paddle grip
    { name: 'paddle_grip', role: 'eye', pixels: [
      [11, 8], [12, 8],
    ]},
    // Canoe bow (left pointed end)
    { name: 'bow', role: 'head', pixels: [
      [1, 8], [1, 9],
      [2, 8],
    ]},
    // Canoe hull (rows 8-11) - long slim shape
    { name: 'hull', role: 'body', pixels: [
      // Row 8 - upper gunwale
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
      // Row 9 - hull body
      [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
      // Row 10 - lower hull
      [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
      // Row 11 - keel
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
    ]},
    // Gunwale trim (row 8) - top edge highlight
    { name: 'gunwale', role: 'belt', pixels: [
      [3, 8], [5, 8], [7, 8], [9, 8], [11, 8],
    ]},
    // Canoe stern (right pointed end)
    { name: 'stern', role: 'head', pixels: [
      [13, 8], [14, 8],
      [14, 9],
    ]},
    // Seat / thwart inside canoe
    { name: 'seat', role: 'face', pixels: [
      [6, 9], [7, 9], [9, 9], [10, 9],
    ]},
    // Water (rows 12-15)
    { name: 'water', role: 'leg', pixels: [
      [1, 12], [2, 12], [5, 12], [6, 12], [9, 12], [10, 12], [13, 12], [14, 12],
      [0, 13], [3, 13], [4, 13], [7, 13], [8, 13], [11, 13], [12, 13], [15, 13],
      [1, 14], [2, 14], [5, 14], [6, 14], [9, 14], [10, 14], [13, 14], [14, 14],
      [0, 15], [3, 15], [7, 15], [8, 15], [11, 15], [15, 15],
    ]},
  ],
};

// =================================================================
// WAGON_16 - Covered wagon. Wooden body with canvas canopy,
//            two large wheels. Side view. ~80 pixels.
// =================================================================
export const WAGON_16: SpriteTemplate = {
  name: 'wagon_16',
  width: 16,
  height: 16,
  description: 'Covered wagon with arched canvas canopy, wooden body, and two large wheels. Side view.',
  regions: [
    // Canvas canopy (rows 1-5) - arched cover
    { name: 'canopy', role: 'accessory', pixels: [
      // Row 1 - top arch
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      // Row 2
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
      // Row 3
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      // Row 4
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      // Row 5
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
    ]},
    // Canvas support hoops (visible ribs)
    { name: 'hoops', role: 'arm', pixels: [
      [4, 2], [4, 3], [4, 4], [4, 5],
      [8, 1], [8, 2],
      [11, 2], [11, 3], [11, 4], [11, 5],
    ]},
    // Opening at back (visible dark interior)
    { name: 'opening', role: 'eye', pixels: [
      [5, 3], [6, 3],
      [5, 4], [6, 4],
    ]},
    // Wagon body / bed (rows 6-8) - wooden planks
    { name: 'body', role: 'body', pixels: [
      // Row 6
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
      // Row 7
      [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],
      // Row 8
      [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],
    ]},
    // Tongue / pull bar (rows 7-8)
    { name: 'tongue', role: 'head', pixels: [
      [1, 7], [2, 7],
      [1, 8], [2, 8],
    ]},
    // Wagon bed trim (row 6 top edge)
    { name: 'bed_trim', role: 'belt', pixels: [
      [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
    ]},
    // Left wheel (rows 9-13)
    { name: 'wheel_left', role: 'boot', pixels: [
      [3, 9], [4, 9], [5, 9],
      [2, 10], [4, 10], [6, 10],
      [2, 11], [4, 11], [6, 11],
      [2, 12], [4, 12], [6, 12],
      [3, 13], [4, 13], [5, 13],
    ]},
    // Right wheel (rows 9-13)
    { name: 'wheel_right', role: 'boot', pixels: [
      [9, 9], [10, 9], [11, 9],
      [8, 10], [10, 10], [12, 10],
      [8, 11], [10, 11], [12, 11],
      [8, 12], [10, 12], [12, 12],
      [9, 13], [10, 13], [11, 13],
    ]},
    // Ground line (row 14)
    { name: 'ground', role: 'leg', pixels: [
      [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
    ]},
  ],
};

// =================================================================
// BALLOON_16 - Hot air balloon. Large round envelope at top,
//              basket hanging below by ropes. ~75 pixels.
// =================================================================
export const BALLOON_16: SpriteTemplate = {
  name: 'balloon_16',
  width: 16,
  height: 16,
  description: 'Hot air balloon with large round envelope, decorative stripe, ropes, and wicker basket.',
  regions: [
    // Envelope top (rows 0-2) - dome shape
    { name: 'envelope_top', role: 'accessory', pixels: [
      // Row 0 - peak
      [6, 0], [7, 0], [8, 0], [9, 0],
      // Row 1 - widens
      [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],
      // Row 2 - widest
      [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
    ]},
    // Envelope stripe (rows 3-4) - decorative band
    { name: 'stripe', role: 'belt', pixels: [
      [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
    ]},
    // Envelope lower (rows 5-7) - tapering bottom
    { name: 'envelope_lower', role: 'body', pixels: [
      // Row 5 - still wide
      [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      // Row 6 - narrowing
      [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6],
      // Row 7 - mouth
      [6, 7], [7, 7], [8, 7], [9, 7],
    ]},
    // Flame / burner (row 8)
    { name: 'flame', role: 'eye', pixels: [
      [7, 8], [8, 8],
    ]},
    // Ropes (rows 8-10) - connecting envelope to basket
    { name: 'ropes', role: 'arm', pixels: [
      [6, 8], [9, 8],
      [6, 9], [9, 9],
      [6, 10], [9, 10],
    ]},
    // Basket (rows 11-13) - wicker gondola
    { name: 'basket', role: 'head', pixels: [
      // Row 11 - basket rim
      [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
      // Row 12 - basket body
      [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12],
      // Row 13 - basket bottom
      [6, 13], [7, 13], [8, 13], [9, 13],
    ]},
    // Sky / clouds (rows 14-15) - faint cloud hints below
    { name: 'clouds', role: 'leg', pixels: [
      [2, 14], [3, 14], [4, 14], [11, 14], [12, 14], [13, 14],
      [1, 15], [2, 15], [3, 15], [12, 15], [13, 15], [14, 15],
    ]},
  ],
};

// =================================================================
// SHIP_16 - Larger ship/galleon. Multi-mast with sails, deep hull,
//           portholes, stern cabin. Side view. ~90 pixels.
// =================================================================
export const SHIP_16: SpriteTemplate = {
  name: 'ship_16',
  width: 16,
  height: 16,
  description: 'Side-view galleon with two masts, square sails, portholes, raised stern, and deep hull on water.',
  regions: [
    // Main mast (rows 0-8)
    { name: 'main_mast', role: 'arm', pixels: [
      [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
    ]},
    // Foremast (rows 1-7)
    { name: 'foremast', role: 'arm', pixels: [
      [11, 1], [11, 2], [11, 3], [11, 4], [11, 5], [11, 6], [11, 7],
    ]},
    // Main sail (rows 1-5)
    { name: 'main_sail', role: 'accessory', pixels: [
      [7, 1], [8, 1], [9, 1],
      [7, 2], [8, 2], [9, 2],
      [7, 3], [8, 3], [9, 3],
      [7, 4], [8, 4], [9, 4],
      [7, 5], [8, 5], [9, 5],
    ]},
    // Fore sail (rows 2-5)
    { name: 'fore_sail', role: 'accessory', pixels: [
      [12, 2], [13, 2],
      [12, 3], [13, 3],
      [12, 4], [13, 4],
      [12, 5], [13, 5],
    ]},
    // Crow's nest / flag
    { name: 'flag', role: 'eye', pixels: [
      [4, 0], [5, 0],
    ]},
    // Stern cabin (rows 6-8) - raised back
    { name: 'cabin', role: 'head', pixels: [
      [2, 6], [3, 6], [4, 6],
      [1, 7], [2, 7], [3, 7], [4, 7],
      [1, 8], [2, 8], [3, 8], [4, 8],
    ]},
    // Cabin window
    { name: 'cabin_window', role: 'eye', pixels: [
      [2, 7], [3, 7],
    ]},
    // Deck (row 8) - main level
    { name: 'deck', role: 'face', pixels: [
      [5, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
    ]},
    // Hull upper (row 9) - gunwale / stripe
    { name: 'hull_stripe', role: 'belt', pixels: [
      [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9],
    ]},
    // Hull body (rows 10-11)
    { name: 'hull', role: 'body', pixels: [
      // Row 10
      [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10],
      // Row 11 - narrows
      [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
    ]},
    // Portholes on hull
    { name: 'portholes', role: 'eye', pixels: [
      [4, 10], [6, 10], [8, 10], [10, 10], [12, 10],
    ]},
    // Bow point (rows 9-10)
    { name: 'bow', role: 'head', pixels: [
      [14, 8], [15, 8],
      [14, 10],
    ]},
    // Keel (row 12)
    { name: 'keel', role: 'boot', pixels: [
      [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12],
    ]},
    // Water (rows 13-15)
    { name: 'water', role: 'leg', pixels: [
      [0, 13], [1, 13], [3, 13], [4, 13], [7, 13], [8, 13], [11, 13], [12, 13], [14, 13], [15, 13],
      [2, 14], [3, 14], [5, 14], [6, 14], [9, 14], [10, 14], [13, 14], [14, 14],
      [0, 15], [1, 15], [4, 15], [5, 15], [7, 15], [8, 15], [11, 15], [12, 15], [14, 15], [15, 15],
    ]},
  ],
};


// =================================================================
// COLOR SCHEMES - DB16 palette, 3 tones per role (shadow/base/highlight)
// =================================================================

/**
 * DB16 palette reference:
 * #140c1c  black          #d04648  red
 * #442434  dark purple    #757161  olive grey
 * #30346d  navy           #597dce  blue
 * #4e4a4e  dark grey      #d27d2c  orange
 * #854c30  brown          #8595a1  light grey
 * #346524  forest green   #6dc2ca  teal
 * #dad45e  yellow         #deeed6  cream/white
 * #d2aa99  peach/skin     #6daa2c  lime green
 */

export const BOAT_COLORS: ColorScheme = {
  name: 'boat_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // warm wood hull
    accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' }, // white/cream sail
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wooden mast
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // gunwale trim
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // bow/stern wood
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' }, // dark keel
    eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // flag accent
    leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // blue water
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const CART_COLORS: ColorScheme = {
  name: 'cart_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wood cart bed
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // rail top trim
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // pull handle
    boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // iron/dark wheels
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // iron axle
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // bright wheel hub
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // cargo
    leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // ground / grass
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const RAFT_COLORS: ColorScheme = {
  name: 'raft_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // log wood
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // rope lashing
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // pole
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // flag pennant
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // crate wood
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // crate detail
    leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // blue water
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const MINECART_COLORS: ColorScheme = {
  name: 'minecart_default',
  mapping: {
    body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // dark iron body
    belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // iron rim
    head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // iron axle
    boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // dark wheels
    eye:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, // bright rivets
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // gold/brown ore
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wooden rail ties
    arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
    face:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
    hand:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  },
};

export const CANOE_COLORS: ColorScheme = {
  name: 'canoe_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wood hull
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // gunwale highlight
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // bow/stern points
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // paddle shaft
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // paddle blade
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // paddle grip
    face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // seat / thwart
    leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // blue water
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const WAGON_COLORS: ColorScheme = {
  name: 'wagon_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wooden wagon body
    accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' }, // cream canvas canopy
    arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // support hoops
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // bed trim
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // pull tongue
    boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' }, // iron/dark wheels
    eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // dark interior
    leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' }, // ground / grass
    face:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const BALLOON_COLORS: ColorScheme = {
  name: 'balloon_default',
  mapping: {
    body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // warm orange/red envelope lower
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // orange/red envelope top
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // decorative stripe
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // brown ropes
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wicker basket
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // bright flame
    leg:       { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' }, // white clouds
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    face:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};

export const SHIP_COLORS: ColorScheme = {
  name: 'ship_default',
  mapping: {
    body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wooden hull
    accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' }, // white/cream sails
    arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // wooden masts
    belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // hull stripe / gunwale
    head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' }, // cabin + bow wood
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' }, // dark keel
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // portholes / lights / flag
    face:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' }, // deck planks
    leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // blue water
    hand:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  },
};


// =================================================================
// Exports - aggregate records
// =================================================================

export const VEHICLE_TEMPLATES: Record<string, SpriteTemplate> = {
  boat_16: BOAT_16,
  cart_16: CART_16,
  raft_16: RAFT_16,
  minecart_16: MINECART_16,
  canoe_16: CANOE_16,
  wagon_16: WAGON_16,
  balloon_16: BALLOON_16,
  ship_16: SHIP_16,
};

export const VEHICLE_COLOR_SCHEMES: Record<string, ColorScheme> = {
  boat_default: BOAT_COLORS,
  cart_default: CART_COLORS,
  raft_default: RAFT_COLORS,
  minecart_default: MINECART_COLORS,
  canoe_default: CANOE_COLORS,
  wagon_default: WAGON_COLORS,
  balloon_default: BALLOON_COLORS,
  ship_default: SHIP_COLORS,
};
