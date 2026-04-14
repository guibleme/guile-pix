/**
 * 16x16 visual effect templates for pixel art VFX.
 * Designed for game-ready sprite effects: explosions, particles, elemental.
 *
 * Role repurposing for effects:
 * - 'body'      = main effect fill
 * - 'head'      = bright core/center
 * - 'accessory' = outer glow/particles
 * - 'eye'       = brightest highlight point
 * - 'belt'      = mid-tone ring
 * - 'arm'       = thin detail/streak
 * - 'leg'       = darker outer area
 *
 * DB16 palette reference:
 * #140c1c  #442434  #30346d  #4e4a4e  #854c30  #346524
 * #d04648  #757161  #597dce  #d27d2c  #8595a1  #6daa2c
 * #d2aa99  #6dc2ca  #dad45e  #deeed6
 */

import { SpriteRegion, SpriteTemplate, ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// EXPLOSION - Mid-frame blast: white/yellow core, orange ring,
//             red jagged outer edge, scattered debris particles
// ═══════════════════════════════════════════════════════════════
export const EXPLOSION_16: SpriteTemplate = {
  name: 'explosion_16',
  width: 16,
  height: 16,
  description: 'Mid-frame explosion. Bright core, orange mid-ring, red jagged outer edge with debris.',
  regions: [
    // Brightest highlight - absolute center flash (eye = brightest point)
    { name: 'flash_center', role: 'eye', pixels: [
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    // Bright core ring (head = bright core)
    { name: 'core', role: 'head', pixels: [
      [6, 6], [7, 6], [8, 6], [9, 6],
      [6, 7], [9, 7],
      [6, 8], [9, 8],
      [6, 9], [7, 9], [8, 9], [9, 9],
    ]},
    // Mid-tone orange ring (belt = mid-tone)
    { name: 'mid_ring', role: 'belt', pixels: [
      [7, 4], [8, 4],
      [5, 5], [6, 5], [9, 5], [10, 5],
      [5, 6], [10, 6],
      [4, 7], [5, 7], [10, 7], [11, 7],
      [5, 8], [10, 8],
      [5, 9], [6, 9], [9, 9], [10, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
    ]},
    // Main fill - irregular red outer blast (body = main fill)
    { name: 'outer_blast', role: 'body', pixels: [
      [7, 3], [8, 3],
      [5, 4], [6, 4], [9, 4], [10, 4],
      [4, 5], [11, 5],
      [4, 6], [11, 6],
      [3, 7], [12, 7],
      [4, 8], [11, 8],
      [4, 9], [11, 9],
      [5, 10], [10, 10],
      [5, 11], [6, 11], [9, 11], [10, 11],
      [7, 12], [8, 12],
    ]},
    // Darker outer jagged edges (leg = darker outer)
    { name: 'jagged_edge', role: 'leg', pixels: [
      [8, 2],
      [4, 3], [11, 3],
      [3, 5], [12, 5],
      [2, 7], [13, 7],
      [3, 9], [12, 9],
      [6, 12], [9, 12],
      [7, 13], [8, 13],
    ]},
    // Debris particles scattered outside (accessory = particles)
    { name: 'debris', role: 'accessory', pixels: [
      [6, 0], [10, 1],
      [1, 4], [14, 6],
      [1, 8], [14, 10],
      [4, 13], [11, 13],
      [6, 14], [9, 14],
    ]},
    // Thin streaks radiating outward (arm = thin detail)
    { name: 'streaks', role: 'arm', pixels: [
      [7, 1], [9, 1],
      [3, 6], [12, 6],
      [2, 8], [13, 8],
      [3, 10], [12, 10],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// SPARKLE - 4-pointed star: thin cross shape, bright center,
//           rays ~4px each direction, accent dots between rays
// ═══════════════════════════════════════════════════════════════
export const SPARKLE_16: SpriteTemplate = {
  name: 'sparkle_16',
  width: 16,
  height: 16,
  description: '4-pointed star sparkle. Thin cross rays with bright center and accent dots.',
  regions: [
    // Brightest center point (eye)
    { name: 'center_flash', role: 'eye', pixels: [
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    // Bright inner cross (head = bright core)
    { name: 'inner_cross', role: 'head', pixels: [
      [7, 6], [8, 6],
      [6, 7], [9, 7],
      [6, 8], [9, 8],
      [7, 9], [8, 9],
    ]},
    // Main ray arms - vertical (body = main fill), 1px wide rays
    { name: 'ray_vertical', role: 'body', pixels: [
      [7, 4], [8, 4],
      [7, 5], [8, 5],
      [7, 10], [8, 10],
      [7, 11], [8, 11],
    ]},
    // Main ray arms - horizontal (body), 1px tall rays
    { name: 'ray_horizontal', role: 'body', pixels: [
      [4, 7], [5, 7],
      [4, 8], [5, 8],
      [10, 7], [11, 7],
      [10, 8], [11, 8],
    ]},
    // Ray tips - thin single-pixel tapers (arm = thin detail)
    { name: 'ray_tips', role: 'arm', pixels: [
      [7, 3],
      [8, 12],
      [3, 7],
      [12, 8],
    ]},
    // Accent dots between rays (accessory = outer glow)
    { name: 'accent_dots', role: 'accessory', pixels: [
      [5, 5], [10, 5],
      [5, 10], [10, 10],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// SMOKE - Puff cloud: round billowy form, lighter top,
//         darker bottom shading, sparse edges for transparency
// ═══════════════════════════════════════════════════════════════
export const SMOKE_16: SpriteTemplate = {
  name: 'smoke_16',
  width: 16,
  height: 16,
  description: 'Smoke puff cloud. Billowy round form with dark bottom shading and sparse edges.',
  regions: [
    // Bright highlight on upper cloud (eye = brightest point)
    { name: 'highlight_spot', role: 'eye', pixels: [
      [7, 3], [8, 3],
      [7, 4], [8, 4],
    ]},
    // Light upper cloud mass (head = bright core)
    { name: 'upper_cloud', role: 'head', pixels: [
      [6, 2], [9, 2],
      [5, 3], [6, 3], [9, 3], [10, 3],
      [5, 4], [6, 4], [9, 4], [10, 4],
      [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
    ]},
    // Main cloud body fill (body = main fill)
    { name: 'cloud_body', role: 'body', pixels: [
      [7, 2], [8, 2],
      [4, 5], [11, 5],
      [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
    ]},
    // Mid-tone transition band (belt = mid-tone)
    { name: 'mid_band', role: 'belt', pixels: [
      [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
      [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
    ]},
    // Darker bottom shading (leg = darker outer)
    { name: 'bottom_shade', role: 'leg', pixels: [
      [6, 11], [7, 11], [8, 11], [9, 11],
      [7, 12], [8, 12],
    ]},
    // Sparse outer wisp edges (accessory = outer glow/particles)
    { name: 'wisp_edges', role: 'accessory', pixels: [
      [5, 1], [10, 1],
      [4, 2], [11, 2],
      [3, 4], [12, 4],
      [3, 7], [12, 7],
      [3, 9], [12, 9],
      [5, 12], [10, 12],
    ]},
    // Thin curling wisps at top (arm = thin detail)
    { name: 'top_wisps', role: 'arm', pixels: [
      [7, 0],
      [6, 1], [9, 1],
      [4, 3], [11, 3],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// FIRE - Flame shape: narrow base, widens, tapers to flickering
//        tips. Yellow core, orange middle, red outer edges.
// ═══════════════════════════════════════════════════════════════
export const FIRE_16: SpriteTemplate = {
  name: 'fire_16',
  width: 16,
  height: 16,
  description: 'Flame. Narrow base widening then tapering up with yellow core, orange middle, red edges.',
  regions: [
    // Brightest white-hot center (eye = brightest)
    { name: 'hotspot', role: 'eye', pixels: [
      [7, 11], [8, 11],
      [7, 12], [8, 12],
    ]},
    // Yellow inner core (head = bright core)
    { name: 'inner_core', role: 'head', pixels: [
      [7, 8], [8, 8],
      [7, 9], [8, 9],
      [7, 10], [8, 10],
      [6, 11], [9, 11],
      [6, 12], [9, 12],
      [7, 13], [8, 13],
    ]},
    // Orange mid-flame body (body = main fill)
    { name: 'mid_flame', role: 'body', pixels: [
      [7, 6], [8, 6],
      [6, 7], [7, 7], [8, 7], [9, 7],
      [6, 8], [9, 8],
      [5, 9], [6, 9], [9, 9], [10, 9],
      [5, 10], [10, 10],
      [5, 11], [10, 11],
      [6, 13], [9, 13],
    ]},
    // Mid-tone transition zone (belt = mid-tone)
    { name: 'flame_belt', role: 'belt', pixels: [
      [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 6], [9, 6],
      [5, 7], [10, 7],
      [5, 8], [10, 8],
      [7, 14], [8, 14],
    ]},
    // Red outer flame edges (leg = darker outer)
    { name: 'outer_edges', role: 'leg', pixels: [
      [7, 3],
      [6, 4], [9, 4],
      [5, 5], [10, 5],
      [4, 8], [11, 8],
      [4, 9], [11, 9],
      [4, 10], [11, 10],
      [4, 11], [11, 11],
      [4, 12], [11, 12],
      [6, 14], [9, 14],
    ]},
    // Flickering tips at top (arm = thin detail)
    { name: 'flicker_tips', role: 'arm', pixels: [
      [8, 0],
      [7, 1], [8, 1],
      [7, 2], [8, 2],
      [8, 3],
    ]},
    // Sparks / embers floating off (accessory = particles)
    { name: 'sparks', role: 'accessory', pixels: [
      [5, 1], [10, 2],
      [3, 7], [12, 8],
      [5, 13], [10, 13],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// MAGIC ORB - Glowing sphere: bright core, gradient rings
//             outward, small particle dots orbiting
// ═══════════════════════════════════════════════════════════════
export const MAGIC_ORB_16: SpriteTemplate = {
  name: 'magic_orb_16',
  width: 16,
  height: 16,
  description: 'Glowing magic orb. Circular shape with bright core, gradient rings, orbiting particles.',
  regions: [
    // Brightest center flash (eye)
    { name: 'flash', role: 'eye', pixels: [
      [7, 7], [8, 7],
      [7, 8], [8, 8],
    ]},
    // Bright inner glow (head = bright core)
    { name: 'inner_glow', role: 'head', pixels: [
      [7, 6], [8, 6],
      [6, 7], [9, 7],
      [6, 8], [9, 8],
      [7, 9], [8, 9],
    ]},
    // Main orb body fill (body = main fill)
    { name: 'orb_body', role: 'body', pixels: [
      [7, 4], [8, 4],
      [6, 5], [7, 5], [8, 5], [9, 5],
      [5, 6], [6, 6], [9, 6], [10, 6],
      [5, 7], [10, 7],
      [5, 8], [10, 8],
      [5, 9], [6, 9], [9, 9], [10, 9],
      [6, 10], [7, 10], [8, 10], [9, 10],
      [7, 11], [8, 11],
    ]},
    // Mid-tone outer ring (belt = mid-tone ring)
    { name: 'outer_ring', role: 'belt', pixels: [
      [6, 4], [9, 4],
      [5, 5], [10, 5],
      [4, 6], [11, 6],
      [4, 7], [11, 7],
      [4, 8], [11, 8],
      [4, 9], [11, 9],
      [5, 10], [10, 10],
      [6, 11], [9, 11],
    ]},
    // Darker outer haze (leg = darker outer area)
    { name: 'outer_haze', role: 'leg', pixels: [
      [7, 3], [8, 3],
      [5, 4], [10, 4],
      [3, 6], [12, 6],
      [3, 8], [12, 8],
      [5, 11], [10, 11],
      [7, 12], [8, 12],
    ]},
    // Orbiting particles (accessory = outer particles)
    { name: 'particles', role: 'accessory', pixels: [
      [4, 1], [11, 1],
      [2, 5], [13, 5],
      [1, 7], [14, 8],
      [2, 10], [13, 10],
      [4, 13], [11, 13],
    ]},
    // Thin energy streaks (arm = thin detail)
    { name: 'energy_streaks', role: 'arm', pixels: [
      [6, 3], [9, 3],
      [3, 7], [12, 7],
      [3, 9], [12, 9],
      [6, 12], [9, 12],
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════
// LIGHTNING - Jagged bolt from top to bottom: bright white/yellow
//             core, blue glow surrounding edges
// ═══════════════════════════════════════════════════════════════
export const LIGHTNING_16: SpriteTemplate = {
  name: 'lightning_16',
  width: 16,
  height: 16,
  description: 'Lightning bolt. Jagged vertical line with bright core and blue edge glow.',
  regions: [
    // Brightest flash points along bolt (eye = brightest)
    { name: 'flash_points', role: 'eye', pixels: [
      [8, 1],
      [6, 6],
      [9, 10],
    ]},
    // White-hot bolt core - jagged single-pixel path (head = bright core)
    { name: 'bolt_core', role: 'head', pixels: [
      [8, 0],
      [9, 1],
      [8, 2],
      [7, 3],
      [7, 4],
      [6, 5],
      [7, 6],
      [8, 7],
      [9, 8],
      [9, 9],
      [8, 10],
      [7, 11],
      [7, 12],
      [6, 13],
      [7, 14],
      [7, 15],
    ]},
    // Glow adjacent to bolt at key bends (body = main fill)
    { name: 'glow_body', role: 'body', pixels: [
      [7, 0],
      [8, 2],
      [6, 3],
      [6, 5],
      [8, 6],
      [7, 7],
      [8, 8],
      [8, 9],
      [6, 11],
      [6, 12],
      [7, 13],
      [6, 14],
    ]},
    // Blue edge glow at widest points (belt = mid-tone)
    { name: 'glow_edge', role: 'belt', pixels: [
      [10, 1],
      [5, 5],
      [5, 6],
      [10, 8],
      [10, 10],
      [5, 12],
    ]},
    // Darker outer glow fade (leg = darker outer)
    { name: 'outer_glow', role: 'leg', pixels: [
      [4, 5],
      [11, 8],
      [4, 12],
    ]},
    // Scattered spark particles (accessory = particles)
    { name: 'sparks', role: 'accessory', pixels: [
      [5, 2], [11, 3],
      [3, 7], [12, 9],
    ]},
  ],
};


// ═══════════════════════════════════════════════════════════════
// COLOR SCHEMES (DB16 palette)
// ═══════════════════════════════════════════════════════════════

export const EXPLOSION_COLORS: ColorScheme = {
  name: 'explosion_default',
  mapping: {
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, // white-hot flash
    head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // yellow core
    belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // orange mid-ring
    body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' }, // red outer blast
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#d04648' }, // dark jagged edge
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // bright debris
    arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' }, // orange streaks
  },
};

export const SPARKLE_COLORS: ColorScheme = {
  name: 'sparkle_default',
  mapping: {
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, // white center
    head:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, // bright inner cross
    body:      { shadow: '#6dc2ca', base: '#dad45e', highlight: '#deeed6' }, // warm ray body
    arm:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#dad45e' }, // cool-tinted tips
    accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, // accent dots
  },
};

export const SMOKE_COLORS: ColorScheme = {
  name: 'smoke_default',
  mapping: {
    eye:       { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' }, // brightest puff
    head:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' }, // light upper cloud
    body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // main cloud body
    belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' }, // mid transition
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' }, // dark bottom
    accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' }, // wisp edges
    arm:       { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' }, // top wisps
  },
};

export const FIRE_COLORS: ColorScheme = {
  name: 'fire_default',
  mapping: {
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, // white-hot center
    head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // yellow inner core
    body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // orange mid-flame
    belt:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' }, // red-orange transition
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d04648' }, // dark red outer edges
    arm:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' }, // bright flicker tips
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' }, // sparks/embers
  },
};

export const MAGIC_ORB_COLORS: ColorScheme = {
  name: 'magic_orb_default',
  mapping: {
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' }, // white flash center
    head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, // cyan inner glow
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // blue orb body
    belt:      { shadow: '#442434', base: '#30346d', highlight: '#597dce' }, // deep blue ring
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#30346d' }, // dark outer haze
    accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' }, // bright orbiting particles
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // energy streaks
  },
};

export const LIGHTNING_COLORS: ColorScheme = {
  name: 'lightning_default',
  mapping: {
    eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' }, // white flash points
    head:      { shadow: '#6dc2ca', base: '#dad45e', highlight: '#deeed6' }, // white-yellow bolt core
    body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#dad45e' }, // cyan glow body
    belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' }, // blue edge glow
    leg:       { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' }, // dark outer glow
    accessory: { shadow: '#6dc2ca', base: '#dad45e', highlight: '#deeed6' }, // bright sparks
    arm:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#dad45e' }, // N/A for lightning (no arm region used)
  },
};


// ═══════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════

export const EFFECT_TEMPLATES: Record<string, SpriteTemplate> = {
  explosion_16: EXPLOSION_16,
  sparkle_16: SPARKLE_16,
  smoke_16: SMOKE_16,
  fire_16: FIRE_16,
  magic_orb_16: MAGIC_ORB_16,
  lightning_16: LIGHTNING_16,
};

export const EFFECT_COLOR_SCHEMES: Record<string, ColorScheme> = {
  explosion_default: EXPLOSION_COLORS,
  sparkle_default: SPARKLE_COLORS,
  smoke_default: SMOKE_COLORS,
  fire_default: FIRE_COLORS,
  magic_orb_default: MAGIC_ORB_COLORS,
  lightning_default: LIGHTNING_COLORS,
};
