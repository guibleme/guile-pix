/**
 * 16x16 modern technology templates — 2026 tech items.
 * 20 templates: sleek gadgets, gaming peripherals, smart devices, futuristic tech.
 * DB16 palette, 35-55% density, 1-2px margin.
 */

import { SpriteTemplate, ColorScheme } from './humanoid16.js';

// ── Helpers ──────────────────────────────────────────────────

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

// ── Base color scheme — dark silver/blue tech palette ────────

const TECH_BASE = {
  hair:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  head:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
  face:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  eye:       { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
  hand:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },
  leg:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof TECH_BASE>): ColorScheme {
  return { name, mapping: { ...TECH_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. LAPTOP — Open laptop computer with screen and keyboard.
// ════════════════════════════════════════════════════════════
export const LAPTOP_16: SpriteTemplate = {
  name: 'laptop_16', width: 16, height: 16,
  description: 'Open laptop computer with glowing screen and thin keyboard base.',
  regions: [
    // Screen bezel — thin frame
    { name: 'bezel', role: 'arm', pixels: [
      ...hLine(1, 3, 12),
      ...vLine(3, 2, 8),
      ...vLine(12, 2, 8),
      ...hLine(8, 3, 12),
    ]},
    // Screen — glowing display
    { name: 'screen', role: 'face', pixels: [
      ...rect(4, 2, 11, 7),
    ]},
    // Screen content — UI elements on screen
    { name: 'screen_content', role: 'eye', pixels: [
      [5,3], [6,3], [7,3],
      [5,5], [6,5], [7,5], [8,5],
    ]},
    // Keyboard base — thin wedge
    { name: 'keyboard_base', role: 'body', pixels: [
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
    ]},
    // Keys — small dots on keyboard
    { name: 'keys', role: 'hand', pixels: [
      [3,9], [5,9], [7,9], [9,9], [11,9],
      [4,10], [6,10], [8,10], [10,10], [12,10],
    ]},
    // Trackpad
    { name: 'trackpad', role: 'belt', pixels: [
      [6,11], [7,11], [8,11], [9,11],
    ]},
    // Base front edge
    { name: 'base_edge', role: 'boot', pixels: [
      ...hLine(12, 2, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 2. SMARTPHONE — Modern phone with screen.
// ════════════════════════════════════════════════════════════
export const SMARTPHONE_16: SpriteTemplate = {
  name: 'smartphone_16', width: 16, height: 16,
  description: 'Modern smartphone with edge-to-edge display and camera notch.',
  regions: [
    // Phone frame — rounded rectangle
    { name: 'frame', role: 'arm', pixels: [
      ...hLine(1, 5, 10),
      ...vLine(5, 2, 13),
      ...vLine(10, 2, 13),
      ...hLine(14, 5, 10),
    ]},
    // Screen — bright display
    { name: 'screen', role: 'face', pixels: [
      ...rect(6, 2, 9, 13),
    ]},
    // Camera notch — small dot at top
    { name: 'camera', role: 'boot', pixels: [
      [7,2], [8,2],
    ]},
    // Screen UI elements
    { name: 'ui_icons', role: 'eye', pixels: [
      [7,4], [8,4],
      [7,7], [8,7],
      [7,10], [8,10],
    ]},
    // App grid
    { name: 'apps', role: 'belt', pixels: [
      [6,5], [9,5],
      [6,8], [9,8],
      [6,11], [9,11],
    ]},
    // Home bar — gesture indicator
    { name: 'home_bar', role: 'hand', pixels: [
      [7,13], [8,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 3. GAMING_CONSOLE — PlayStation/Xbox style console.
// ════════════════════════════════════════════════════════════
export const GAMING_CONSOLE_16: SpriteTemplate = {
  name: 'gaming_console_16', width: 16, height: 16,
  description: 'Modern gaming console with sleek angular design and light bar.',
  regions: [
    // Console body — wide angular shape
    { name: 'console_body', role: 'arm', pixels: [
      ...hLine(6, 2, 13),
      ...rect(2, 7, 13, 11),
      ...hLine(12, 3, 12),
    ]},
    // Top vent detail
    { name: 'vent', role: 'body', pixels: [
      [4,7], [6,7], [8,7], [10,7], [12,7],
      [4,8], [6,8], [8,8], [10,8], [12,8],
    ]},
    // Light bar — glowing accent stripe
    { name: 'light_bar', role: 'eye', pixels: [
      ...hLine(6, 5, 10),
    ]},
    // Disc slot
    { name: 'disc_slot', role: 'boot', pixels: [
      ...hLine(10, 4, 11),
    ]},
    // Power button
    { name: 'power_button', role: 'belt', pixels: [
      [7,9], [8,9],
    ]},
    // Stand feet
    { name: 'feet', role: 'head', pixels: [
      [3,12], [4,12],
      [11,12], [12,12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 4. GAME_CONTROLLER — Gamepad with buttons and sticks.
// ════════════════════════════════════════════════════════════
export const GAME_CONTROLLER_16: SpriteTemplate = {
  name: 'game_controller_16', width: 16, height: 16,
  description: 'Modern game controller with analog sticks, D-pad, and face buttons.',
  regions: [
    // Controller body — ergonomic shape
    { name: 'controller_body', role: 'arm', pixels: [
      ...hLine(4, 4, 11),
      ...rect(3, 5, 12, 8),
      ...hLine(9, 4, 11),
      [2,6], [2,7], [2,8], [2,9],
      [13,6], [13,7], [13,8], [13,9],
      [1,8], [1,9], [14,8], [14,9],
    ]},
    // Left analog stick
    { name: 'left_stick', role: 'body', pixels: [
      [4,6], [5,6],
      [4,7], [5,7],
    ]},
    // Right analog stick
    { name: 'right_stick', role: 'body', pixels: [
      [9,7], [10,7],
      [9,8], [10,8],
    ]},
    // D-pad
    { name: 'dpad', role: 'belt', pixels: [
      [4,8], [5,8],
      [4,9], [5,9],
    ]},
    // Face buttons — 4 colored dots
    { name: 'face_buttons', role: 'eye', pixels: [
      [11,5], [10,6], [12,6], [11,7],
    ]},
    // Center buttons — menu/options
    { name: 'center_buttons', role: 'hand', pixels: [
      [7,5], [8,5],
    ]},
    // Triggers — top bumpers
    { name: 'triggers', role: 'head', pixels: [
      [4,4], [5,4],
      [10,4], [11,4],
    ]},
    // LED light bar
    { name: 'led', role: 'accessory', pixels: [
      [7,4], [8,4],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 5. DESKTOP_PC — Tower computer case.
// ════════════════════════════════════════════════════════════
export const DESKTOP_PC_16: SpriteTemplate = {
  name: 'desktop_pc_16', width: 16, height: 16,
  description: 'Desktop PC tower with glass side panel, RGB fans, and cable ports.',
  regions: [
    // Case frame
    { name: 'case_frame', role: 'arm', pixels: [
      ...border(3, 1, 12, 14),
    ]},
    // Glass side panel
    { name: 'glass_panel', role: 'body', pixels: [
      ...rect(4, 2, 11, 9),
    ]},
    // RGB fan — glowing circle
    { name: 'rgb_fan', role: 'eye', pixels: [
      [7,4], [8,4],
      [6,5], [9,5],
      [6,6], [9,6],
      [7,7], [8,7],
    ]},
    // Fan center
    { name: 'fan_center', role: 'belt', pixels: [
      [7,5], [8,5],
      [7,6], [8,6],
    ]},
    // PSU bottom section
    { name: 'psu', role: 'head', pixels: [
      ...rect(4, 10, 11, 13),
    ]},
    // PSU vent grille
    { name: 'psu_vent', role: 'boot', pixels: [
      [5,11], [7,11], [9,11],
      [5,12], [7,12], [9,12],
    ]},
    // Power button
    { name: 'power_btn', role: 'accessory', pixels: [
      [7,2], [8,2],
    ]},
    // IO ports
    { name: 'io_ports', role: 'hand', pixels: [
      [5,3], [6,3],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 6. MONITOR — Widescreen display on stand.
// ════════════════════════════════════════════════════════════
export const MONITOR_16: SpriteTemplate = {
  name: 'monitor_16', width: 16, height: 16,
  description: 'Widescreen monitor with thin bezels, adjustable stand, and ambient glow.',
  regions: [
    // Bezel — thin frame
    { name: 'bezel', role: 'arm', pixels: [
      ...hLine(2, 1, 14),
      ...vLine(1, 3, 10),
      ...vLine(14, 3, 10),
      ...hLine(10, 1, 14),
    ]},
    // Screen — wide bright display
    { name: 'screen', role: 'face', pixels: [
      ...rect(2, 3, 13, 9),
    ]},
    // Screen content — desktop icons
    { name: 'desktop', role: 'eye', pixels: [
      [3,4], [5,4], [7,4],
      ...hLine(8, 4, 11),
    ]},
    // Stand neck
    { name: 'stand_neck', role: 'body', pixels: [
      ...vLine(7, 11, 12),
      ...vLine(8, 11, 12),
    ]},
    // Stand base
    { name: 'stand_base', role: 'head', pixels: [
      ...hLine(13, 4, 11),
      ...hLine(14, 5, 10),
    ]},
    // Power LED
    { name: 'led', role: 'accessory', pixels: [
      [7,10], [8,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 7. HEADPHONES — Over-ear headphones.
// ════════════════════════════════════════════════════════════
export const HEADPHONES_16: SpriteTemplate = {
  name: 'headphones_16', width: 16, height: 16,
  description: 'Over-ear headphones with padded cups, adjustable headband, and cushions.',
  regions: [
    // Headband — arch across top
    { name: 'headband', role: 'arm', pixels: [
      ...hLine(1, 4, 11),
      [3,2], [12,2],
      [3,3], [12,3],
    ]},
    // Headband padding
    { name: 'headband_pad', role: 'body', pixels: [
      ...hLine(2, 5, 10),
    ]},
    // Left slider
    { name: 'left_slider', role: 'head', pixels: [
      ...vLine(3, 4, 6),
    ]},
    // Right slider
    { name: 'right_slider', role: 'head', pixels: [
      ...vLine(12, 4, 6),
    ]},
    // Left ear cup — rounded rectangle
    { name: 'left_cup', role: 'body', pixels: [
      ...rect(1, 7, 5, 12),
    ]},
    // Left cushion
    { name: 'left_cushion', role: 'belt', pixels: [
      ...vLine(1, 8, 11),
      [2,7], [2,12],
    ]},
    // Right ear cup
    { name: 'right_cup', role: 'body', pixels: [
      ...rect(10, 7, 14, 12),
    ]},
    // Right cushion
    { name: 'right_cushion', role: 'belt', pixels: [
      ...vLine(14, 8, 11),
      [13,7], [13,12],
    ]},
    // LED accents on cups
    { name: 'cup_leds', role: 'eye', pixels: [
      [3,9], [3,10],
      [12,9], [12,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 8. VR_HEADSET — VR goggles with strap.
// ════════════════════════════════════════════════════════════
export const VR_HEADSET_16: SpriteTemplate = {
  name: 'vr_headset_16', width: 16, height: 16,
  description: 'Virtual reality headset with dual lenses, head strap, and tracking sensors.',
  regions: [
    // Head strap — curved band
    { name: 'strap', role: 'body', pixels: [
      [1,4], [1,5], [1,6], [1,7],
      [14,4], [14,5], [14,6], [14,7],
      ...hLine(3, 2, 13),
    ]},
    // Headset body — main visor
    { name: 'visor_body', role: 'arm', pixels: [
      ...rect(3, 4, 12, 9),
    ]},
    // Lens left — dark circle
    { name: 'lens_left', role: 'face', pixels: [
      [4,6], [5,6],
      [4,7], [5,7],
    ]},
    // Lens right
    { name: 'lens_right', role: 'face', pixels: [
      [10,6], [11,6],
      [10,7], [11,7],
    ]},
    // Lens divider
    { name: 'nose_bridge', role: 'boot', pixels: [
      [7,6], [8,6],
      [7,7], [8,7],
    ]},
    // Tracking sensors — small LED dots
    { name: 'sensors', role: 'eye', pixels: [
      [4,4], [7,4], [8,4], [11,4],
      [3,5], [12,5],
    ]},
    // Bottom face gasket
    { name: 'gasket', role: 'head', pixels: [
      ...hLine(10, 4, 11),
      ...hLine(11, 5, 10),
    ]},
    // Strap adjuster
    { name: 'adjuster', role: 'belt', pixels: [
      [2,5], [2,6],
      [13,5], [13,6],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 9. DRONE — Flying quadcopter.
// ════════════════════════════════════════════════════════════
export const DRONE_16: SpriteTemplate = {
  name: 'drone_16', width: 16, height: 16,
  description: 'Quadcopter drone with four propeller arms, camera gimbal, and LED indicators.',
  regions: [
    // Propellers — spinning discs at corners
    { name: 'prop_tl', role: 'hand', pixels: [
      [1,2], [2,2], [3,2],
      [2,1], [2,3],
    ]},
    { name: 'prop_tr', role: 'hand', pixels: [
      [12,2], [13,2], [14,2],
      [13,1], [13,3],
    ]},
    { name: 'prop_bl', role: 'hand', pixels: [
      [1,10], [2,10], [3,10],
      [2,9], [2,11],
    ]},
    { name: 'prop_br', role: 'hand', pixels: [
      [12,10], [13,10], [14,10],
      [13,9], [13,11],
    ]},
    // Arms — extending from center
    { name: 'arms', role: 'body', pixels: [
      [3,4], [4,5],
      [12,4], [11,5],
      [3,8], [4,7],
      [12,8], [11,7],
    ]},
    // Center body — compact frame
    { name: 'center_body', role: 'arm', pixels: [
      ...hLine(5, 5, 10),
      ...rect(5, 6, 10, 7),
      ...hLine(8, 5, 10),
    ]},
    // Camera gimbal
    { name: 'camera', role: 'belt', pixels: [
      [7,9], [8,9],
      [7,10], [8,10],
    ]},
    // Camera lens
    { name: 'lens', role: 'eye', pixels: [
      [7,10], [8,10],
    ]},
    // LED indicators
    { name: 'leds', role: 'accessory', pixels: [
      [5,6], [10,6],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 10. SMARTWATCH — Wrist wearable with display.
// ════════════════════════════════════════════════════════════
export const SMARTWATCH_16: SpriteTemplate = {
  name: 'smartwatch_16', width: 16, height: 16,
  description: 'Smartwatch with round display, heart rate sensor, and silicone band.',
  regions: [
    // Upper band
    { name: 'upper_band', role: 'body', pixels: [
      ...vLine(7, 1, 3),
      ...vLine(8, 1, 3),
    ]},
    // Lower band
    { name: 'lower_band', role: 'body', pixels: [
      ...vLine(7, 12, 14),
      ...vLine(8, 12, 14),
    ]},
    // Band holes
    { name: 'band_holes', role: 'boot', pixels: [
      [7,2], [8,2],
      [7,13], [8,13],
    ]},
    // Watch case — rounded square
    { name: 'watch_case', role: 'arm', pixels: [
      ...hLine(4, 5, 10),
      ...vLine(4, 5, 10),
      ...vLine(11, 5, 10),
      ...hLine(11, 5, 10),
      [5,4], [10,4],
      [5,11], [10,11],
    ]},
    // Watch screen — round display
    { name: 'screen', role: 'face', pixels: [
      ...rect(5, 5, 10, 10),
    ]},
    // Watch face content — time display
    { name: 'time_display', role: 'eye', pixels: [
      [6,6], [7,6], [9,6], [10,6],
      [7,7], [8,7],
    ]},
    // Health data dots
    { name: 'health_data', role: 'accessory', pixels: [
      [6,9], [7,9], [8,9], [9,9],
    ]},
    // Crown button — side dial
    { name: 'crown', role: 'head', pixels: [
      [12,7], [12,8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 11. TABLET — Tablet device with stylus.
// ════════════════════════════════════════════════════════════
export const TABLET_16: SpriteTemplate = {
  name: 'tablet_16', width: 16, height: 16,
  description: 'Tablet device with large display, slim bezel, and magnetic stylus.',
  regions: [
    // Frame — thin bezel rectangle
    { name: 'frame', role: 'arm', pixels: [
      ...hLine(1, 2, 13),
      ...vLine(2, 2, 13),
      ...vLine(13, 2, 13),
      ...hLine(14, 2, 13),
    ]},
    // Screen — large display
    { name: 'screen', role: 'face', pixels: [
      ...rect(3, 2, 12, 13),
    ]},
    // Camera
    { name: 'camera', role: 'boot', pixels: [
      [7,2],
    ]},
    // Screen content — drawing app
    { name: 'content', role: 'eye', pixels: [
      [5,4], [6,5], [7,6], [8,7],
      [9,6], [10,5], [11,4],
    ]},
    // App UI bar
    { name: 'ui_bar', role: 'belt', pixels: [
      ...hLine(12, 4, 11),
    ]},
    // Stylus — attached magnetically on side
    { name: 'stylus', role: 'head', pixels: [
      ...vLine(14, 3, 12),
    ]},
    // Stylus tip
    { name: 'stylus_tip', role: 'hand', pixels: [
      [14,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 12. WEBCAM — Camera on adjustable stand.
// ════════════════════════════════════════════════════════════
export const WEBCAM_16: SpriteTemplate = {
  name: 'webcam_16', width: 16, height: 16,
  description: 'HD webcam with ring light, adjustable tilt, and monitor clip mount.',
  regions: [
    // Camera housing — pill shape
    { name: 'housing', role: 'arm', pixels: [
      ...hLine(3, 4, 11),
      ...rect(3, 4, 12, 8),
      ...hLine(9, 4, 11),
    ]},
    // Lens ring — circular
    { name: 'lens_ring', role: 'body', pixels: [
      [6,5], [7,5], [8,5], [9,5],
      [6,8], [7,8], [8,8], [9,8],
      [5,6], [5,7], [10,6], [10,7],
    ]},
    // Lens glass
    { name: 'lens', role: 'face', pixels: [
      [7,6], [8,6],
      [7,7], [8,7],
    ]},
    // Ring light dots
    { name: 'ring_light', role: 'eye', pixels: [
      [6,6], [9,6],
      [6,7], [9,7],
    ]},
    // Status LED
    { name: 'status_led', role: 'accessory', pixels: [
      [11,6],
    ]},
    // Tilt joint
    { name: 'joint', role: 'head', pixels: [
      [7,10], [8,10],
    ]},
    // Stand/clip
    { name: 'stand', role: 'boot', pixels: [
      ...hLine(11, 5, 10),
      ...hLine(12, 4, 11),
      ...hLine(13, 4, 11),
    ]},
    // Clip grip
    { name: 'clip', role: 'belt', pixels: [
      ...vLine(5, 12, 14),
      ...vLine(10, 12, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 13. ROBOT_VACUUM — Round vacuum bot with sensors.
// ════════════════════════════════════════════════════════════
export const ROBOT_VACUUM_16: SpriteTemplate = {
  name: 'robot_vacuum_16', width: 16, height: 16,
  description: 'Circular robot vacuum cleaner with LiDAR turret, bumper, and charging contacts.',
  regions: [
    // LiDAR turret — raised center dome
    { name: 'lidar', role: 'head', pixels: [
      ...hLine(4, 6, 9),
      [5,5], [10,5],
      [5,6], [10,6],
      ...hLine(7, 6, 9),
    ]},
    // Main body — large circle top-down view
    { name: 'body', role: 'arm', pixels: [
      ...hLine(6, 3, 5), ...hLine(6, 10, 12),
      ...hLine(7, 2, 5), ...hLine(7, 10, 13),
      ...hLine(8, 2, 13),
      ...hLine(9, 2, 13),
      ...hLine(10, 2, 13),
      ...hLine(11, 3, 12),
    ]},
    // Bumper ring — front edge
    { name: 'bumper', role: 'body', pixels: [
      ...hLine(5, 4, 5), ...hLine(5, 10, 11),
      [3,7], [3,8], [3,9], [3,10],
      [12,7], [12,8], [12,9], [12,10],
      ...hLine(12, 4, 11),
    ]},
    // Sensor eye
    { name: 'sensor', role: 'eye', pixels: [
      [7,5], [8,5],
    ]},
    // Button panel
    { name: 'buttons', role: 'belt', pixels: [
      [7,8], [8,8],
    ]},
    // Brush window — underside visible slot
    { name: 'brush_slot', role: 'boot', pixels: [
      ...hLine(10, 5, 10),
    ]},
    // Status ring LED
    { name: 'status_led', role: 'accessory', pixels: [
      [6,6], [9,6],
      [4,8], [11,8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 14. WIRELESS_SPEAKER — Bluetooth speaker cylinder.
// ════════════════════════════════════════════════════════════
export const WIRELESS_SPEAKER_16: SpriteTemplate = {
  name: 'wireless_speaker_16', width: 16, height: 16,
  description: 'Portable wireless bluetooth speaker with fabric grille and LED ring.',
  regions: [
    // Top cap — flat top with buttons
    { name: 'top_cap', role: 'head', pixels: [
      ...hLine(2, 4, 11),
      ...hLine(3, 4, 11),
    ]},
    // Control buttons
    { name: 'buttons', role: 'hand', pixels: [
      [5,2], [7,2], [8,2], [10,2],
    ]},
    // LED ring — glowing strip
    { name: 'led_ring', role: 'eye', pixels: [
      ...hLine(4, 4, 11),
    ]},
    // Speaker grille — fabric mesh
    { name: 'grille', role: 'body', pixels: [
      ...rect(4, 5, 11, 11),
    ]},
    // Grille texture dots
    { name: 'grille_holes', role: 'belt', pixels: [
      [5,6], [7,6], [9,6], [11,6],
      [4,8], [6,8], [8,8], [10,8],
      [5,10], [7,10], [9,10], [11,10],
    ]},
    // Base — rubber feet
    { name: 'base', role: 'boot', pixels: [
      ...hLine(12, 4, 11),
      ...hLine(13, 5, 10),
    ]},
    // Side passive radiator
    { name: 'radiator', role: 'arm', pixels: [
      [3,6], [3,7], [3,8], [3,9], [3,10],
      [12,6], [12,7], [12,8], [12,9], [12,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 15. GAMING_KEYBOARD — RGB mechanical keyboard.
// ════════════════════════════════════════════════════════════
export const GAMING_KEYBOARD_16: SpriteTemplate = {
  name: 'gaming_keyboard_16', width: 16, height: 16,
  description: 'Compact mechanical gaming keyboard with RGB backlighting and wrist rest.',
  regions: [
    // Keyboard body — wide rectangle
    { name: 'keyboard_body', role: 'arm', pixels: [
      ...hLine(4, 1, 14),
      ...rect(1, 5, 14, 9),
      ...hLine(10, 1, 14),
    ]},
    // Key rows — individual key tops
    { name: 'key_row1', role: 'body', pixels: [
      [2,5], [4,5], [6,5], [8,5], [10,5], [12,5],
    ]},
    { name: 'key_row2', role: 'body', pixels: [
      [3,7], [5,7], [7,7], [9,7], [11,7], [13,7],
    ]},
    { name: 'key_row3', role: 'body', pixels: [
      [2,9], [4,9], [6,9], [8,9], [10,9], [12,9],
    ]},
    // RGB glow under keys
    { name: 'rgb_glow', role: 'eye', pixels: [
      [3,6], [5,6], [7,6], [9,6], [11,6], [13,6],
      [2,8], [4,8], [6,8], [8,8], [10,8], [12,8],
    ]},
    // WASD highlighted keys
    { name: 'wasd', role: 'accessory', pixels: [
      [5,5], [4,7], [5,7], [6,7],
    ]},
    // Spacebar
    { name: 'spacebar', role: 'hand', pixels: [
      ...hLine(9, 5, 10),
    ]},
    // Wrist rest
    { name: 'wrist_rest', role: 'head', pixels: [
      ...hLine(11, 2, 13),
      ...hLine(12, 2, 13),
    ]},
    // USB cable
    { name: 'cable', role: 'belt', pixels: [
      [7,3], [8,3],
      [7,2], [8,2],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 16. GAMING_MOUSE — Gaming mouse with LED.
// ════════════════════════════════════════════════════════════
export const GAMING_MOUSE_16: SpriteTemplate = {
  name: 'gaming_mouse_16', width: 16, height: 16,
  description: 'Ergonomic gaming mouse with scroll wheel, side buttons, and RGB underglow.',
  regions: [
    // Mouse body — ergonomic shape from top
    { name: 'mouse_body', role: 'arm', pixels: [
      ...hLine(3, 6, 9),
      ...hLine(4, 5, 10),
      ...rect(4, 5, 11, 11),
      ...hLine(12, 5, 10),
      ...hLine(13, 6, 9),
    ]},
    // Left click
    { name: 'left_click', role: 'body', pixels: [
      [5,5], [6,5], [7,5],
      [5,6], [6,6], [7,6],
    ]},
    // Right click
    { name: 'right_click', role: 'body', pixels: [
      [8,5], [9,5], [10,5],
      [8,6], [9,6], [10,6],
    ]},
    // Click divider
    { name: 'divider', role: 'boot', pixels: [
      ...vLine(7, 4, 7),
    ]},
    // Scroll wheel
    { name: 'scroll_wheel', role: 'head', pixels: [
      [7,4], [8,4],
      [7,7], [8,7],
    ]},
    // Side buttons
    { name: 'side_buttons', role: 'belt', pixels: [
      [4,7], [4,8],
      [4,9], [4,10],
    ]},
    // RGB underglow
    { name: 'underglow', role: 'eye', pixels: [
      [5,12], [6,12], [7,12], [8,12], [9,12], [10,12],
      [6,13], [7,13], [8,13], [9,13],
    ]},
    // DPI button
    { name: 'dpi_button', role: 'accessory', pixels: [
      [7,8], [8,8],
    ]},
    // Logo
    { name: 'logo', role: 'hand', pixels: [
      [7,10], [8,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 17. USB_DRIVE — Flash drive with cap.
// ════════════════════════════════════════════════════════════
export const USB_DRIVE_16: SpriteTemplate = {
  name: 'usb_drive_16', width: 16, height: 16,
  description: 'USB flash drive with metallic connector, cap off, and activity LED.',
  regions: [
    // USB connector — metal plug
    { name: 'connector', role: 'hand', pixels: [
      ...rect(2, 6, 4, 9),
    ]},
    // Connector slot holes
    { name: 'connector_holes', role: 'boot', pixels: [
      [3,7], [3,8],
    ]},
    // Drive body — main housing
    { name: 'drive_body', role: 'arm', pixels: [
      ...rect(5, 5, 11, 10),
    ]},
    // Body surface detail
    { name: 'body_surface', role: 'body', pixels: [
      ...rect(6, 6, 10, 9),
    ]},
    // Activity LED
    { name: 'led', role: 'eye', pixels: [
      [9,7], [10,7],
    ]},
    // Brand label
    { name: 'label', role: 'belt', pixels: [
      [6,7], [7,7], [8,7],
      [6,8], [7,8], [8,8],
    ]},
    // Cap — detached nearby
    { name: 'cap', role: 'head', pixels: [
      ...rect(12, 6, 14, 9),
    ]},
    // Lanyard hole
    { name: 'lanyard_hole', role: 'accessory', pixels: [
      [11,5], [11,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 18. POWER_BANK — Portable charger with display.
// ════════════════════════════════════════════════════════════
export const POWER_BANK_16: SpriteTemplate = {
  name: 'power_bank_16', width: 16, height: 16,
  description: 'Portable power bank with digital display, dual USB ports, and capacity LEDs.',
  regions: [
    // Main body — rounded rectangle
    { name: 'body_shell', role: 'arm', pixels: [
      ...hLine(2, 3, 12),
      ...vLine(3, 3, 12),
      ...vLine(12, 3, 12),
      ...hLine(13, 3, 12),
    ]},
    // Body surface
    { name: 'body_surface', role: 'body', pixels: [
      ...rect(4, 3, 11, 12),
    ]},
    // Digital display — shows percentage
    { name: 'display', role: 'face', pixels: [
      ...rect(5, 4, 10, 6),
    ]},
    // Percentage numbers
    { name: 'percentage', role: 'eye', pixels: [
      [6,5], [7,5], [9,5],
    ]},
    // Capacity LED indicators
    { name: 'capacity_leds', role: 'accessory', pixels: [
      [5,8], [7,8], [9,8], [11,8],
    ]},
    // USB-A port
    { name: 'usb_a', role: 'hand', pixels: [
      [5,10], [6,10], [7,10],
    ]},
    // USB-C port
    { name: 'usb_c', role: 'belt', pixels: [
      [9,10], [10,10],
    ]},
    // Power button
    { name: 'power_button', role: 'head', pixels: [
      [8,12],
    ]},
    // Top edge
    { name: 'top_edge', role: 'boot', pixels: [
      ...hLine(2, 4, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 19. SECURITY_CAMERA — Surveillance camera on mount.
// ════════════════════════════════════════════════════════════
export const SECURITY_CAMERA_16: SpriteTemplate = {
  name: 'security_camera_16', width: 16, height: 16,
  description: 'Security surveillance camera with motorized mount, IR LEDs, and weather housing.',
  regions: [
    // Wall mount bracket
    { name: 'bracket', role: 'head', pixels: [
      ...rect(1, 2, 3, 5),
    ]},
    // Pivot joint
    { name: 'pivot', role: 'belt', pixels: [
      [4,4], [4,5],
      [5,5], [5,6],
    ]},
    // Camera housing — cylindrical
    { name: 'housing', role: 'arm', pixels: [
      ...hLine(5, 6, 13),
      ...rect(6, 6, 13, 10),
      ...hLine(11, 6, 13),
    ]},
    // Housing body detail
    { name: 'housing_body', role: 'body', pixels: [
      ...rect(7, 7, 12, 9),
    ]},
    // Lens — circular front
    { name: 'lens', role: 'face', pixels: [
      [13,7], [14,7],
      [13,8], [14,8],
      [13,9], [14,9],
    ]},
    // Lens glass center
    { name: 'lens_glass', role: 'eye', pixels: [
      [14,8],
    ]},
    // IR LED array
    { name: 'ir_leds', role: 'accessory', pixels: [
      [12,7], [12,9],
    ]},
    // Status LED
    { name: 'status_led', role: 'eye', pixels: [
      [7,6],
    ]},
    // Sun shade visor
    { name: 'visor', role: 'boot', pixels: [
      ...hLine(4, 6, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 20. SATELLITE_DISH — Dish antenna with receiver.
// ════════════════════════════════════════════════════════════
export const SATELLITE_DISH_16: SpriteTemplate = {
  name: 'satellite_dish_16', width: 16, height: 16,
  description: 'Satellite dish antenna with parabolic reflector, LNB receiver arm, and tripod mount.',
  regions: [
    // Dish — parabolic reflector curve
    { name: 'dish', role: 'body', pixels: [
      ...hLine(2, 3, 10),
      [2,3], ...hLine(3, 2, 11),
      [1,4], ...hLine(4, 2, 12),
      [1,5], ...hLine(5, 2, 12),
      [1,6], ...hLine(6, 2, 11),
      [2,7], ...hLine(7, 3, 10),
    ]},
    // Dish surface highlight
    { name: 'dish_surface', role: 'hand', pixels: [
      [4,3], [5,3], [6,3],
      [3,4], [4,4], [5,4],
      [3,5], [4,5],
    ]},
    // LNB receiver arm — diagonal support
    { name: 'lnb_arm', role: 'arm', pixels: [
      [10,3], [11,4], [12,5],
      [13,6], [13,7],
    ]},
    // LNB receiver head
    { name: 'lnb_head', role: 'head', pixels: [
      [13,4], [14,4],
      [13,5], [14,5],
    ]},
    // Signal indicator
    { name: 'signal', role: 'eye', pixels: [
      [14,3],
    ]},
    // Mount pole — vertical support
    { name: 'pole', role: 'boot', pixels: [
      ...vLine(7, 8, 13),
      ...vLine(8, 8, 13),
    ]},
    // Tripod base
    { name: 'tripod', role: 'belt', pixels: [
      [5,13], [6,13], [7,13], [8,13], [9,13], [10,13],
      [4,14], [5,14], [10,14], [11,14],
    ]},
    // Dish rim highlight
    { name: 'rim', role: 'accessory', pixels: [
      [3,2], [4,2], [5,2], [6,2], [7,2],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// Color schemes — sleek dark/silver/blue modern tech feel
// ════════════════════════════════════════════════════════════

const LAPTOP_SCHEME = scheme('laptop_default', {
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // dark aluminum frame
  face:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // glowing screen
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },   // bright UI
  body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // warm silver keyboard base
  hand:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // keycaps
  belt:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // trackpad
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // base edge
});

const SMARTPHONE_SCHEME = scheme('smartphone_default', {
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // dark frame
  face:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // display
  eye:       { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },   // UI icons
  belt:      { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },   // app colors
  hand:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // home bar
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // camera
});

const GAMING_CONSOLE_SCHEME = scheme('gaming_console_default', {
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // dark console body
  body:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // vent detail
  eye:       { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // light bar glow
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // disc slot
  belt:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // power button
  head:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // feet
});

const GAME_CONTROLLER_SCHEME = scheme('game_controller_default', {
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // body plastic
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // sticks
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // dpad
  eye:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // face buttons glow
  hand:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // center buttons
  head:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // triggers
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // LED
});

const DESKTOP_PC_SCHEME = scheme('desktop_pc_default', {
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // case frame
  body:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // glass panel tint
  eye:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // RGB fan glow
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // fan center
  head:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // PSU
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // PSU vent
  accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // power button glow
  hand:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // IO ports
});

const MONITOR_SCHEME = scheme('monitor_default', {
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // bezel
  face:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // screen
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },   // desktop icons
  body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // stand neck
  head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // stand base
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // power LED
});

const HEADPHONES_SCHEME = scheme('headphones_default', {
  arm:       { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },   // headband metal
  body:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // ear cups
  head:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // sliders
  belt:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // cushions
  eye:       { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },   // LED accents
});

const VR_HEADSET_SCHEME = scheme('vr_headset_default', {
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // strap
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // visor body
  face:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // lens dark
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // nose bridge
  eye:       { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // sensor LEDs
  head:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },   // gasket
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // adjusters
});

const DRONE_SCHEME = scheme('drone_default', {
  hand:      { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },   // propellers
  body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // arms
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // center body
  belt:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // camera gimbal
  eye:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // camera lens
  accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // LED indicators
});

const SMARTWATCH_SCHEME = scheme('smartwatch_default', {
  body:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },   // band
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },   // band holes
  arm:       { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // watch case
  face:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // screen
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },   // time display
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // health data
  head:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // crown
});

const TABLET_SCHEME = scheme('tablet_default', {
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // frame
  face:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // screen
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // camera
  eye:       { shadow: '#dad45e', base: '#deeed6',  highlight: '#deeed6' },   // content
  belt:      { shadow: '#30346d', base: '#6dc2ca',  highlight: '#deeed6' },   // ui bar
  head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },   // stylus
  hand:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },   // stylus tip
});

const WEBCAM_SCHEME = scheme('webcam_default', {
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // housing
  body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // lens ring
  face:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // lens glass
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },   // ring light
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // status LED
  head:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // joint
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },   // stand
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },   // clip
});

const ROBOT_VACUUM_SCHEME = scheme('robot_vacuum_default', {
  head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // lidar turret
  arm:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },   // main body white
  body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // bumper
  eye:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // sensor
  belt:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // buttons
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // brush slot
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // status ring
});

const WIRELESS_SPEAKER_SCHEME = scheme('wireless_speaker_default', {
  head:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },   // top cap
  hand:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // buttons
  eye:       { shadow: '#30346d', base: '#6dc2ca',  highlight: '#deeed6' },   // LED ring
  body:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // grille
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // grille holes
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },   // base
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // side radiator
});

const GAMING_KEYBOARD_SCHEME = scheme('gaming_keyboard_default', {
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // keyboard body
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // key caps
  eye:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },   // RGB glow (red)
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // WASD highlighted
  hand:      { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },   // spacebar
  head:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // wrist rest
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // cable
});

const GAMING_MOUSE_SCHEME = scheme('gaming_mouse_default', {
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // mouse body
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // click surfaces
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // divider
  head:      { shadow: '#30346d', base: '#6dc2ca',  highlight: '#deeed6' },   // scroll wheel
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#30346d' },   // side buttons
  eye:       { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },   // RGB underglow
  accessory: { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // DPI button
  hand:      { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },   // logo
});

const USB_DRIVE_SCHEME = scheme('usb_drive_default', {
  hand:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },   // metal connector
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },   // connector holes
  arm:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // drive body
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // body surface
  eye:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // activity LED
  belt:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // label
  head:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // cap
  accessory: { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // lanyard hole
});

const POWER_BANK_SCHEME = scheme('power_bank_default', {
  arm:       { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // shell outline
  body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },   // body surface
  face:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // display
  eye:       { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },   // numbers
  accessory: { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },   // capacity LEDs
  hand:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },   // USB-A port
  belt:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },   // USB-C port
  head:      { shadow: '#597dce', base: '#6dc2ca',  highlight: '#deeed6' },   // power button
  boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // top edge
});

const SECURITY_CAMERA_SCHEME = scheme('security_camera_default', {
  head:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },   // bracket
  belt:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },   // pivot
  arm:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },   // housing white
  body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // housing body
  face:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },   // lens
  eye:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // lens glass + status
  accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // IR LEDs
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },   // visor
});

const SATELLITE_DISH_SCHEME = scheme('satellite_dish_default', {
  body:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },   // dish reflector
  hand:      { shadow: '#deeed6', base: '#deeed6',  highlight: '#deeed6' },   // dish highlight
  arm:       { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },   // LNB arm
  head:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },   // LNB head
  eye:       { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },   // signal indicator
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },   // pole
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },   // tripod
  accessory: { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },   // rim highlight
});

// ════════════════════════════════════════════════════════════
// Exports
// ════════════════════════════════════════════════════════════

export const MODERN_TECH_TEMPLATES: Record<string, SpriteTemplate> = {
  laptop:           LAPTOP_16,
  smartphone:       SMARTPHONE_16,
  gaming_console:   GAMING_CONSOLE_16,
  game_controller:  GAME_CONTROLLER_16,
  desktop_pc:       DESKTOP_PC_16,
  monitor:          MONITOR_16,
  headphones:       HEADPHONES_16,
  vr_headset:       VR_HEADSET_16,
  drone:            DRONE_16,
  smartwatch:       SMARTWATCH_16,
  tablet:           TABLET_16,
  webcam:           WEBCAM_16,
  robot_vacuum:     ROBOT_VACUUM_16,
  wireless_speaker: WIRELESS_SPEAKER_16,
  gaming_keyboard:  GAMING_KEYBOARD_16,
  gaming_mouse:     GAMING_MOUSE_16,
  usb_drive:        USB_DRIVE_16,
  power_bank:       POWER_BANK_16,
  security_camera:  SECURITY_CAMERA_16,
  satellite_dish:   SATELLITE_DISH_16,
};

export const MODERN_TECH_COLOR_SCHEMES: Record<string, ColorScheme> = {
  laptop_default:           LAPTOP_SCHEME,
  smartphone_default:       SMARTPHONE_SCHEME,
  gaming_console_default:   GAMING_CONSOLE_SCHEME,
  game_controller_default:  GAME_CONTROLLER_SCHEME,
  desktop_pc_default:       DESKTOP_PC_SCHEME,
  monitor_default:          MONITOR_SCHEME,
  headphones_default:       HEADPHONES_SCHEME,
  vr_headset_default:       VR_HEADSET_SCHEME,
  drone_default:            DRONE_SCHEME,
  smartwatch_default:       SMARTWATCH_SCHEME,
  tablet_default:           TABLET_SCHEME,
  webcam_default:           WEBCAM_SCHEME,
  robot_vacuum_default:     ROBOT_VACUUM_SCHEME,
  wireless_speaker_default: WIRELESS_SPEAKER_SCHEME,
  gaming_keyboard_default:  GAMING_KEYBOARD_SCHEME,
  gaming_mouse_default:     GAMING_MOUSE_SCHEME,
  usb_drive_default:        USB_DRIVE_SCHEME,
  power_bank_default:       POWER_BANK_SCHEME,
  security_camera_default:  SECURITY_CAMERA_SCHEME,
  satellite_dish_default:   SATELLITE_DISH_SCHEME,
};
