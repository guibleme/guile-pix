/**
 * 16x16 retro/vintage technology templates — nostalgic 80s-90s tech items.
 * 20 templates: CRT TVs, floppy disks, cassettes, rotary phones, etc.
 * DB16 palette, 35-55% density, 1-2px margin, warm beige/tan/gray retro feel.
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

// ── Base color scheme — warm beige/tan retro palette ─────────

const RETRO_BASE = {
  hair:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
  face:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  eye:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
  body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
  arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  hand:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
  belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
  leg:       { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
};

function scheme(name: string, overrides: Partial<typeof RETRO_BASE>): ColorScheme {
  return { name, mapping: { ...RETRO_BASE, ...overrides } };
}

// ════════════════════════════════════════════════════════════
// 1. CRT_TV — Old CRT television with rabbit-ear antenna
// ════════════════════════════════════════════════════════════
export const CRT_TV_16: SpriteTemplate = {
  name: 'crt_tv_16', width: 16, height: 16,
  description: 'Old CRT television set with rabbit-ear antenna and chunky beige casing.',
  regions: [
    // Antenna — two V-shaped rabbit ears
    { name: 'antenna', role: 'accessory', pixels: [
      [5,1], [10,1],
      [6,2], [9,2],
      [7,3], [8,3],
    ]},
    // TV casing top
    { name: 'casing_top', role: 'body', pixels: [
      ...hLine(4, 2, 13),
    ]},
    // Screen — dark blue/teal inner rectangle
    { name: 'screen', role: 'face', pixels: [
      ...rect(3, 5, 10, 10),
    ]},
    // Screen glare
    { name: 'screen_glare', role: 'eye', pixels: [
      [4,6], [5,6],
      [4,7],
    ]},
    // TV casing sides
    { name: 'casing_sides', role: 'body', pixels: [
      ...vLine(2, 5, 11),
      ...vLine(13, 5, 11),
    ]},
    // Control panel — knobs on right side
    { name: 'controls', role: 'belt', pixels: [
      [11,6], [12,6],
      [11,8], [12,8],
      [11,10], [12,10],
    ]},
    // TV casing bottom
    { name: 'casing_bottom', role: 'body', pixels: [
      ...hLine(11, 2, 13),
    ]},
    // Stand / feet
    { name: 'stand', role: 'boot', pixels: [
      [3,12], [4,12], [11,12], [12,12],
      [3,13], [4,13], [11,13], [12,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 2. RETRO_PC — Beige 90s desktop with CRT monitor
// ════════════════════════════════════════════════════════════
export const RETRO_PC_16: SpriteTemplate = {
  name: 'retro_pc_16', width: 16, height: 16,
  description: 'Beige 90s desktop computer with CRT monitor and keyboard.',
  regions: [
    // Monitor casing
    { name: 'monitor_case', role: 'body', pixels: [
      ...hLine(1, 3, 12),
      ...vLine(3, 2, 8),
      ...vLine(12, 2, 8),
      ...hLine(8, 3, 12),
    ]},
    // Screen
    { name: 'screen', role: 'face', pixels: [
      ...rect(4, 2, 11, 7),
    ]},
    // Screen glare
    { name: 'screen_glare', role: 'eye', pixels: [
      [5,3], [6,3],
      [5,4],
    ]},
    // Monitor stand
    { name: 'stand', role: 'arm', pixels: [
      [6,9], [7,9], [8,9], [9,9],
    ]},
    // System unit (horizontal box below monitor)
    { name: 'system_unit', role: 'head', pixels: [
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
      ...hLine(12, 2, 13),
    ]},
    // Floppy slot on system unit
    { name: 'floppy_slot', role: 'boot', pixels: [
      [4,11], [5,11], [6,11], [7,11],
    ]},
    // Keyboard
    { name: 'keyboard', role: 'belt', pixels: [
      ...hLine(14, 2, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 3. GAME_BOY — Classic handheld game console
// ════════════════════════════════════════════════════════════
export const GAME_BOY_16: SpriteTemplate = {
  name: 'game_boy_16', width: 16, height: 16,
  description: 'Classic handheld game console with dot-matrix screen and d-pad.',
  regions: [
    // Shell body
    { name: 'shell', role: 'body', pixels: [
      ...hLine(1, 4, 11),
      ...vLine(4, 2, 13),
      ...vLine(11, 2, 13),
      ...hLine(14, 5, 10),
      // Fill interior shell area
      ...hLine(8, 5, 10),
      ...hLine(13, 5, 10),
    ]},
    // Screen bezel
    { name: 'bezel', role: 'arm', pixels: [
      ...border(5, 2, 10, 7),
    ]},
    // Screen
    { name: 'screen', role: 'face', pixels: [
      ...rect(6, 3, 9, 6),
    ]},
    // Screen detail
    { name: 'screen_glow', role: 'eye', pixels: [
      [7,4], [8,4],
      [7,5],
    ]},
    // D-pad
    { name: 'dpad', role: 'boot', pixels: [
      [6,9], [6,10], [6,11],
      [5,10], [7,10],
      [5,9], [7,9],
    ]},
    // A/B buttons
    { name: 'buttons', role: 'accessory', pixels: [
      [9,10], [10,9],
      [10,10], [9,11],
    ]},
    // Start/Select
    { name: 'start_select', role: 'belt', pixels: [
      [7,12], [8,12],
      [6,12], [9,12],
    ]},
    // Speaker grill
    { name: 'speaker', role: 'head', pixels: [
      [9,12], [10,12],
      [9,13], [10,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 4. FLOPPY_DISK — 3.5" floppy diskette
// ════════════════════════════════════════════════════════════
export const FLOPPY_DISK_16: SpriteTemplate = {
  name: 'floppy_disk_16', width: 16, height: 16,
  description: '3.5-inch floppy diskette with metal slider and label.',
  regions: [
    // Disk body
    { name: 'disk_body', role: 'body', pixels: [
      ...hLine(2, 3, 12),
      ...vLine(3, 3, 13),
      ...vLine(12, 3, 13),
      ...hLine(13, 3, 12),
      ...rect(4, 7, 11, 12),
    ]},
    // Metal slider
    { name: 'slider', role: 'arm', pixels: [
      ...rect(5, 2, 10, 4),
    ]},
    // Slider window (gap in slider)
    { name: 'slider_window', role: 'boot', pixels: [
      [7,3], [8,3],
      [7,4], [8,4],
    ]},
    // Label
    { name: 'label', role: 'head', pixels: [
      ...rect(4, 8, 11, 11),
    ]},
    // Label text lines
    { name: 'label_text', role: 'belt', pixels: [
      ...hLine(9, 5, 10),
      ...hLine(10, 5, 8),
    ]},
    // Write protect tab (corner notch)
    { name: 'write_protect', role: 'accessory', pixels: [
      [11,13], [12,13],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 5. CASSETTE_TAPE — Music cassette
// ════════════════════════════════════════════════════════════
export const CASSETTE_TAPE_16: SpriteTemplate = {
  name: 'cassette_tape_16', width: 16, height: 16,
  description: 'Music cassette tape with tape reels visible through window.',
  regions: [
    // Cassette shell
    { name: 'shell', role: 'body', pixels: [
      ...hLine(3, 2, 13),
      ...vLine(2, 4, 12),
      ...vLine(13, 4, 12),
      ...hLine(12, 2, 13),
    ]},
    // Tape window (see-through section)
    { name: 'window', role: 'arm', pixels: [
      ...border(4, 5, 11, 9),
    ]},
    // Left reel
    { name: 'left_reel', role: 'boot', pixels: [
      [5,6], [6,6], [7,6],
      [5,7], [6,7], [7,7],
      [5,8], [6,8], [7,8],
    ]},
    // Right reel
    { name: 'right_reel', role: 'boot', pixels: [
      [8,6], [9,6], [10,6],
      [8,7], [9,7], [10,7],
      [8,8], [9,8], [10,8],
    ]},
    // Reel hubs (centers)
    { name: 'reel_hubs', role: 'head', pixels: [
      [6,7],
      [9,7],
    ]},
    // Label area
    { name: 'label', role: 'belt', pixels: [
      ...hLine(4, 3, 12),
      ...hLine(10, 3, 12),
      ...hLine(11, 3, 12),
    ]},
    // Label accent stripe
    { name: 'label_stripe', role: 'accessory', pixels: [
      ...hLine(4, 4, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 6. VHS_TAPE — VHS video tape
// ════════════════════════════════════════════════════════════
export const VHS_TAPE_16: SpriteTemplate = {
  name: 'vhs_tape_16', width: 16, height: 16,
  description: 'VHS video cassette tape with label and tape window.',
  regions: [
    // Tape shell body
    { name: 'shell', role: 'body', pixels: [
      ...hLine(3, 1, 14),
      ...vLine(1, 4, 12),
      ...vLine(14, 4, 12),
      ...hLine(12, 1, 14),
    ]},
    // Top label area
    { name: 'label', role: 'head', pixels: [
      ...rect(2, 4, 13, 7),
    ]},
    // Label text
    { name: 'label_text', role: 'belt', pixels: [
      ...hLine(5, 3, 12),
      ...hLine(6, 3, 10),
    ]},
    // Tape window
    { name: 'window', role: 'arm', pixels: [
      ...border(3, 8, 12, 11),
    ]},
    // Tape reels visible
    { name: 'reels', role: 'boot', pixels: [
      [5,9], [6,9], [5,10], [6,10],
      [9,9], [10,9], [9,10], [10,10],
    ]},
    // Reel hubs
    { name: 'reel_hubs', role: 'accessory', pixels: [
      [5,9], [10,9],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 7. ROTARY_PHONE — Old dial telephone
// ════════════════════════════════════════════════════════════
export const ROTARY_PHONE_16: SpriteTemplate = {
  name: 'rotary_phone_16', width: 16, height: 16,
  description: 'Old rotary dial telephone with handset and curly cord.',
  regions: [
    // Handset (resting on top)
    { name: 'handset', role: 'boot', pixels: [
      [2,2], [3,2], [4,2],
      [3,3],
      [3,4],
      [3,5],
      [11,2], [12,2], [13,2],
      [12,3],
      [12,4],
      [12,5],
    ]},
    // Handset cradle bar
    { name: 'cradle', role: 'arm', pixels: [
      ...hLine(5, 4, 11),
    ]},
    // Phone body
    { name: 'phone_body', role: 'body', pixels: [
      ...hLine(6, 2, 13),
      ...vLine(2, 7, 12),
      ...vLine(13, 7, 12),
      ...hLine(7, 3, 12),
      ...hLine(12, 3, 12),
      ...hLine(13, 3, 12),
    ]},
    // Dial circle (outer ring)
    { name: 'dial_ring', role: 'head', pixels: [
      [6,8], [7,8], [8,8], [9,8],
      [5,9], [10,9],
      [5,10], [10,10],
      [6,11], [7,11], [8,11], [9,11],
    ]},
    // Dial center
    { name: 'dial_center', role: 'belt', pixels: [
      [7,9], [8,9],
      [7,10], [8,10],
    ]},
    // Dial holes
    { name: 'dial_holes', role: 'face', pixels: [
      [6,9], [9,9],
      [6,10], [9,10],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 8. TYPEWRITER — Mechanical typewriter
// ════════════════════════════════════════════════════════════
export const TYPEWRITER_16: SpriteTemplate = {
  name: 'typewriter_16', width: 16, height: 16,
  description: 'Mechanical typewriter with paper feed, keys, and carriage.',
  regions: [
    // Paper sticking up
    { name: 'paper', role: 'eye', pixels: [
      ...rect(5, 1, 10, 4),
    ]},
    // Paper text lines
    { name: 'paper_text', role: 'arm', pixels: [
      ...hLine(2, 6, 9),
      ...hLine(3, 6, 8),
    ]},
    // Carriage / platen roller
    { name: 'carriage', role: 'boot', pixels: [
      ...hLine(5, 2, 13),
    ]},
    // Body top
    { name: 'body_top', role: 'body', pixels: [
      ...hLine(6, 1, 14),
      ...hLine(7, 1, 14),
    ]},
    // Keys row 1
    { name: 'keys_row1', role: 'head', pixels: [
      [3,8], [5,8], [7,8], [9,8], [11,8],
    ]},
    // Keys row 2
    { name: 'keys_row2', role: 'head', pixels: [
      [2,9], [4,9], [6,9], [8,9], [10,9], [12,9],
    ]},
    // Keys row 3
    { name: 'keys_row3', role: 'head', pixels: [
      [3,10], [5,10], [7,10], [9,10], [11,10],
    ]},
    // Spacebar
    { name: 'spacebar', role: 'belt', pixels: [
      ...hLine(11, 4, 11),
    ]},
    // Base
    { name: 'base', role: 'arm', pixels: [
      ...hLine(12, 1, 14),
      ...hLine(13, 1, 14),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 9. VINYL_RECORD — LP record
// ════════════════════════════════════════════════════════════
export const VINYL_RECORD_16: SpriteTemplate = {
  name: 'vinyl_record_16', width: 16, height: 16,
  description: 'Vinyl LP record with grooves, label center, and spindle hole.',
  regions: [
    // Outer edge of record (circle outline)
    { name: 'outer_edge', role: 'boot', pixels: [
      ...hLine(1, 5, 10),
      ...hLine(2, 3, 4), ...hLine(2, 11, 12),
      [2,3], [13,3], [2,12], [13,12],
      [1,4], [14,4], [1,11], [14,11],
      ...vLine(1, 5, 10),
      ...vLine(14, 5, 10),
      ...hLine(13, 3, 4), ...hLine(13, 11, 12),
      ...hLine(14, 5, 10),
    ]},
    // Vinyl grooves (dark rings)
    { name: 'grooves', role: 'arm', pixels: [
      ...hLine(3, 5, 10),
      [3,4], [12,4], [3,11], [12,11],
      ...vLine(2, 5, 10),
      ...vLine(13, 5, 10),
      ...hLine(12, 5, 10),
      ...hLine(4, 4, 11),
      ...hLine(11, 4, 11),
      ...vLine(4, 5, 10),
      ...vLine(11, 5, 10),
    ]},
    // Record label (center circle)
    { name: 'label', role: 'accessory', pixels: [
      ...hLine(5, 6, 9),
      ...rect(5, 6, 10, 9),
      ...hLine(10, 6, 9),
    ]},
    // Spindle hole
    { name: 'spindle', role: 'head', pixels: [
      [7,7], [8,7],
      [7,8], [8,8],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 10. BOOMBOX — Portable stereo
// ════════════════════════════════════════════════════════════
export const BOOMBOX_16: SpriteTemplate = {
  name: 'boombox_16', width: 16, height: 16,
  description: 'Portable boombox stereo with two speakers and cassette deck.',
  regions: [
    // Handle on top
    { name: 'handle', role: 'boot', pixels: [
      ...hLine(2, 5, 10),
      [5,3], [10,3],
    ]},
    // Main body casing
    { name: 'casing', role: 'body', pixels: [
      ...hLine(4, 1, 14),
      ...vLine(1, 5, 12),
      ...vLine(14, 5, 12),
      ...hLine(12, 1, 14),
    ]},
    // Left speaker (circle)
    { name: 'left_speaker', role: 'head', pixels: [
      [3,6], [4,6],
      [2,7], [3,7], [4,7], [5,7],
      [2,8], [3,8], [4,8], [5,8],
      [3,9], [4,9],
    ]},
    // Right speaker (circle)
    { name: 'right_speaker', role: 'head', pixels: [
      [11,6], [12,6],
      [10,7], [11,7], [12,7], [13,7],
      [10,8], [11,8], [12,8], [13,8],
      [11,9], [12,9],
    ]},
    // Speaker cones
    { name: 'speaker_cones', role: 'arm', pixels: [
      [3,7], [4,7], [3,8], [4,8],
      [11,7], [12,7], [11,8], [12,8],
    ]},
    // Cassette deck (center)
    { name: 'cassette_deck', role: 'belt', pixels: [
      ...rect(6, 6, 9, 9),
    ]},
    // Deck window
    { name: 'deck_window', role: 'face', pixels: [
      [7,7], [8,7],
      [7,8], [8,8],
    ]},
    // Controls below
    { name: 'controls', role: 'accessory', pixels: [
      [4,11], [6,11], [8,11], [10,11],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 11. ARCADE_CABINET — Standing arcade machine
// ════════════════════════════════════════════════════════════
export const ARCADE_CABINET_16: SpriteTemplate = {
  name: 'arcade_cabinet_16', width: 16, height: 16,
  description: 'Standing arcade cabinet with marquee, screen, controls and coin slot.',
  regions: [
    // Marquee header
    { name: 'marquee', role: 'accessory', pixels: [
      ...rect(4, 1, 11, 2),
    ]},
    // Cabinet frame top
    { name: 'frame_top', role: 'body', pixels: [
      ...hLine(3, 3, 12),
      ...vLine(3, 3, 14),
      ...vLine(12, 3, 14),
    ]},
    // Screen
    { name: 'screen', role: 'face', pixels: [
      ...rect(4, 4, 11, 8),
    ]},
    // Screen content
    { name: 'screen_detail', role: 'eye', pixels: [
      [6,5], [7,5], [8,5],
      [6,7], [9,7],
    ]},
    // Control panel (angled area)
    { name: 'control_panel', role: 'head', pixels: [
      ...hLine(9, 4, 11),
      ...hLine(10, 4, 11),
    ]},
    // Joystick
    { name: 'joystick', role: 'boot', pixels: [
      [5,9], [6,9],
      [5,10],
    ]},
    // Buttons
    { name: 'buttons', role: 'belt', pixels: [
      [8,9], [9,9], [10,9],
    ]},
    // Cabinet body below controls
    { name: 'cabinet_body', role: 'body', pixels: [
      ...hLine(11, 4, 11),
      ...hLine(12, 4, 11),
    ]},
    // Coin slot
    { name: 'coin_slot', role: 'arm', pixels: [
      [7,12], [8,12],
    ]},
    // Base / feet
    { name: 'base', role: 'boot', pixels: [
      ...hLine(13, 4, 11),
      ...hLine(14, 3, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 12. NES_CARTRIDGE — Game cartridge
// ════════════════════════════════════════════════════════════
export const NES_CARTRIDGE_16: SpriteTemplate = {
  name: 'nes_cartridge_16', width: 16, height: 16,
  description: 'NES-style game cartridge with label and connector pins.',
  regions: [
    // Cartridge body
    { name: 'cart_body', role: 'body', pixels: [
      ...hLine(1, 3, 12),
      ...vLine(3, 2, 12),
      ...vLine(12, 2, 12),
      ...hLine(12, 3, 12),
    ]},
    // Top grip notch
    { name: 'top_grip', role: 'arm', pixels: [
      [5,2], [6,2], [9,2], [10,2],
    ]},
    // Label area
    { name: 'label', role: 'head', pixels: [
      ...rect(4, 3, 11, 8),
    ]},
    // Label art (simplified icon on label)
    { name: 'label_art', role: 'accessory', pixels: [
      [6,4], [7,4], [8,4],
      [6,5], [9,5],
      [6,6], [7,6], [8,6],
      [6,7], [9,7],
    ]},
    // Label title text
    { name: 'label_title', role: 'belt', pixels: [
      ...hLine(8, 5, 10),
    ]},
    // Lower body
    { name: 'lower_body', role: 'body', pixels: [
      ...rect(4, 9, 11, 11),
    ]},
    // Connector pins at bottom
    { name: 'pins', role: 'boot', pixels: [
      ...hLine(13, 4, 11),
      ...hLine(14, 4, 11),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 13. WALKMAN — Portable cassette player
// ════════════════════════════════════════════════════════════
export const WALKMAN_16: SpriteTemplate = {
  name: 'walkman_16', width: 16, height: 16,
  description: 'Portable cassette Walkman with headphone jack and buttons.',
  regions: [
    // Headphone cord coming out top
    { name: 'cord', role: 'boot', pixels: [
      [7,1], [8,1],
      [7,2], [8,2],
    ]},
    // Player body
    { name: 'player_body', role: 'body', pixels: [
      ...hLine(3, 4, 11),
      ...vLine(4, 4, 13),
      ...vLine(11, 4, 13),
      ...hLine(13, 4, 11),
      // Fill body interior
      ...hLine(9, 5, 10),
      ...hLine(11, 5, 10),
      ...hLine(12, 5, 10),
    ]},
    // Cassette window
    { name: 'window', role: 'arm', pixels: [
      ...border(5, 4, 10, 8),
    ]},
    // Tape reels visible
    { name: 'reels', role: 'head', pixels: [
      [6,5], [7,5], [6,6], [7,6], [6,7], [7,7],
      [8,5], [9,5], [8,6], [9,6], [8,7], [9,7],
    ]},
    // Reel hubs
    { name: 'reel_centers', role: 'belt', pixels: [
      [6,6], [9,6],
    ]},
    // Play/stop/ff buttons
    { name: 'play_btn', role: 'accessory', pixels: [
      [5,10], [6,10],
    ]},
    { name: 'stop_btn', role: 'belt', pixels: [
      [7,10], [8,10],
    ]},
    { name: 'ff_btn', role: 'accessory', pixels: [
      [9,10], [10,10],
    ]},
    // Volume slider
    { name: 'volume', role: 'face', pixels: [
      [5,12], [6,12], [7,12], [8,12],
    ]},
    // Belt clip on side
    { name: 'belt_clip', role: 'arm', pixels: [
      [12,5], [12,6], [12,7], [12,8], [12,9],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 14. OLD_CAMERA — Film camera with flash
// ════════════════════════════════════════════════════════════
export const OLD_CAMERA_16: SpriteTemplate = {
  name: 'old_camera_16', width: 16, height: 16,
  description: 'Vintage film camera with pop-up flash, viewfinder and lens.',
  regions: [
    // Flash unit on top
    { name: 'flash', role: 'eye', pixels: [
      ...rect(2, 1, 5, 3),
    ]},
    // Viewfinder hump
    { name: 'viewfinder', role: 'arm', pixels: [
      [9,2], [10,2], [11,2],
      [9,3], [10,3], [11,3],
    ]},
    // Camera body
    { name: 'camera_body', role: 'body', pixels: [
      ...hLine(4, 1, 14),
      ...vLine(1, 5, 10),
      ...vLine(14, 5, 10),
      ...hLine(10, 1, 14),
      ...hLine(5, 2, 13),
    ]},
    // Lens (circle, centered)
    { name: 'lens_outer', role: 'head', pixels: [
      [7,6], [8,6],
      [6,7], [9,7],
      [6,8], [9,8],
      [7,9], [8,9],
    ]},
    // Lens glass
    { name: 'lens_glass', role: 'face', pixels: [
      [7,7], [8,7],
      [7,8], [8,8],
    ]},
    // Shutter button
    { name: 'shutter', role: 'accessory', pixels: [
      [12,5], [13,5],
    ]},
    // Film advance
    { name: 'film_advance', role: 'belt', pixels: [
      [3,5], [4,5],
    ]},
    // Grip / bottom
    { name: 'grip', role: 'boot', pixels: [
      ...hLine(11, 2, 13),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 15. PAGER — 90s beeper
// ════════════════════════════════════════════════════════════
export const PAGER_16: SpriteTemplate = {
  name: 'pager_16', width: 16, height: 16,
  description: '90s pager/beeper with small LCD screen and clip.',
  regions: [
    // Pager body (tall narrow rectangle)
    { name: 'pager_body', role: 'body', pixels: [
      ...hLine(2, 4, 11),
      ...vLine(4, 3, 13),
      ...vLine(11, 3, 13),
      ...hLine(13, 4, 11),
      // Fill interior body
      ...hLine(7, 5, 10),
      ...hLine(9, 5, 10),
      ...hLine(11, 5, 10),
    ]},
    // LCD screen
    { name: 'screen', role: 'face', pixels: [
      ...rect(5, 3, 10, 6),
    ]},
    // Screen text / number display
    { name: 'screen_text', role: 'eye', pixels: [
      [6,4], [7,4], [8,4], [9,4],
      [6,5], [8,5], [9,5],
    ]},
    // Buttons
    { name: 'buttons', role: 'head', pixels: [
      [5,8], [6,8], [7,8], [8,8], [9,8], [10,8],
      [5,10], [6,10], [7,10], [8,10], [9,10], [10,10],
    ]},
    // Belt clip
    { name: 'clip', role: 'arm', pixels: [
      [12,4], [12,5], [12,6], [12,7], [12,8],
      [13,5], [13,6], [13,7],
    ]},
    // Speaker holes at bottom
    { name: 'speaker', role: 'belt', pixels: [
      [6,12], [7,12], [8,12], [9,12], [10,12],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 16. CRT_MONITOR — Old computer screen with green text
// ════════════════════════════════════════════════════════════
export const CRT_MONITOR_16: SpriteTemplate = {
  name: 'crt_monitor_16', width: 16, height: 16,
  description: 'Old CRT computer monitor showing green monochrome terminal text.',
  regions: [
    // Monitor bezel
    { name: 'bezel', role: 'body', pixels: [
      ...hLine(1, 2, 13),
      ...vLine(2, 2, 10),
      ...vLine(13, 2, 10),
      ...hLine(10, 2, 13),
    ]},
    // Screen (dark background)
    { name: 'screen', role: 'boot', pixels: [
      ...rect(3, 2, 12, 9),
    ]},
    // Green text lines on screen
    { name: 'text_lines', role: 'eye', pixels: [
      ...hLine(3, 4, 9),
      ...hLine(4, 4, 11),
      ...hLine(5, 4, 8),
      ...hLine(6, 4, 10),
    ]},
    // Cursor blink
    { name: 'cursor', role: 'accessory', pixels: [
      [8,7],
    ]},
    // Stand neck
    { name: 'stand_neck', role: 'arm', pixels: [
      [6,11], [7,11], [8,11], [9,11],
    ]},
    // Stand base
    { name: 'stand_base', role: 'head', pixels: [
      ...hLine(12, 4, 11),
      ...hLine(13, 5, 10),
    ]},
    // Power LED
    { name: 'power_led', role: 'accessory', pixels: [
      [12,9],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 17. RADIO — Vintage tube radio
// ════════════════════════════════════════════════════════════
export const RADIO_16: SpriteTemplate = {
  name: 'radio_16', width: 16, height: 16,
  description: 'Vintage tube radio with speaker grille, tuning dial and knobs.',
  regions: [
    // Radio body / casing
    { name: 'casing', role: 'body', pixels: [
      ...hLine(2, 2, 13),
      ...vLine(2, 3, 13),
      ...vLine(13, 3, 13),
      ...hLine(13, 2, 13),
    ]},
    // Speaker grille (horizontal lines)
    { name: 'grille', role: 'head', pixels: [
      ...hLine(3, 3, 8),
      ...hLine(5, 3, 8),
      ...hLine(7, 3, 8),
      ...hLine(9, 3, 8),
    ]},
    // Grille gaps
    { name: 'grille_gaps', role: 'arm', pixels: [
      ...hLine(4, 3, 8),
      ...hLine(6, 3, 8),
      ...hLine(8, 3, 8),
    ]},
    // Tuning dial (right side)
    { name: 'tuning_dial', role: 'face', pixels: [
      ...rect(9, 3, 12, 7),
    ]},
    // Dial pointer
    { name: 'dial_pointer', role: 'accessory', pixels: [
      [10,5], [11,5],
    ]},
    // Frequency numbers
    { name: 'freq_marks', role: 'belt', pixels: [
      [10,4], [11,4], [10,6], [11,6],
    ]},
    // Knobs at bottom
    { name: 'knobs', role: 'boot', pixels: [
      [4,11], [5,11],
      [10,11], [11,11],
    ]},
    // Bottom panel
    { name: 'bottom_panel', role: 'belt', pixels: [
      ...hLine(10, 3, 12),
      ...hLine(12, 3, 12),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 18. CALCULATOR — Pocket calculator
// ════════════════════════════════════════════════════════════
export const CALCULATOR_16: SpriteTemplate = {
  name: 'calculator_16', width: 16, height: 16,
  description: 'Pocket calculator with LCD display and number buttons.',
  regions: [
    // Calculator body
    { name: 'calc_body', role: 'body', pixels: [
      ...hLine(1, 4, 11),
      ...vLine(4, 2, 14),
      ...vLine(11, 2, 14),
      ...hLine(14, 4, 11),
      // Fill body interior gaps
      ...hLine(13, 5, 10),
    ]},
    // LCD display
    { name: 'display', role: 'face', pixels: [
      ...rect(5, 2, 10, 4),
    ]},
    // Display digits
    { name: 'digits', role: 'eye', pixels: [
      [6,3], [7,3], [8,3], [9,3], [10,3],
    ]},
    // Button rows (4x4 grid with filled 2px buttons)
    { name: 'buttons_row1', role: 'head', pixels: [
      [5,6], [6,6], [7,6], [8,6], [9,6],
    ]},
    { name: 'buttons_row2', role: 'head', pixels: [
      [5,8], [6,8], [7,8], [8,8], [9,8],
    ]},
    { name: 'buttons_row3', role: 'head', pixels: [
      [5,10], [6,10], [7,10], [8,10], [9,10],
    ]},
    { name: 'buttons_row4', role: 'head', pixels: [
      [5,12], [6,12], [7,12], [8,12], [9,12],
    ]},
    // Operator buttons (right column)
    { name: 'operators', role: 'accessory', pixels: [
      [10,6], [10,7], [10,8], [10,9], [10,10], [10,11], [10,12],
    ]},
    // Solar panel
    { name: 'solar', role: 'arm', pixels: [
      ...hLine(5, 5, 10),
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 19. JOYSTICK — Classic Atari-style joystick
// ════════════════════════════════════════════════════════════
export const JOYSTICK_16: SpriteTemplate = {
  name: 'joystick_16', width: 16, height: 16,
  description: 'Classic Atari-style joystick with stick, base and fire button.',
  regions: [
    // Stick top ball grip
    { name: 'stick_ball', role: 'accessory', pixels: [
      [7,1], [8,1],
      [6,2], [7,2], [8,2], [9,2],
      [7,3], [8,3],
    ]},
    // Stick shaft
    { name: 'stick_shaft', role: 'boot', pixels: [
      [7,4], [8,4],
      [7,5], [8,5],
      [7,6], [8,6],
      [7,7], [8,7],
    ]},
    // Base top surface
    { name: 'base_top', role: 'body', pixels: [
      ...hLine(8, 2, 13),
      ...hLine(9, 1, 14),
    ]},
    // Base sides
    { name: 'base_sides', role: 'arm', pixels: [
      ...vLine(1, 10, 12),
      ...vLine(14, 10, 12),
    ]},
    // Base front
    { name: 'base_front', role: 'body', pixels: [
      ...hLine(10, 2, 13),
      ...hLine(11, 2, 13),
      ...hLine(12, 2, 13),
    ]},
    // Fire button
    { name: 'fire_button', role: 'belt', pixels: [
      [11,9], [12,9],
      [11,10], [12,10],
    ]},
    // Base bottom
    { name: 'base_bottom', role: 'head', pixels: [
      ...hLine(13, 1, 14),
    ]},
    // Cable
    { name: 'cable', role: 'boot', pixels: [
      [7,13], [8,13], [7,14],
    ]},
  ],
};

// ════════════════════════════════════════════════════════════
// 20. TAPE_RECORDER — Reel-to-reel tape deck
// ════════════════════════════════════════════════════════════
export const TAPE_RECORDER_16: SpriteTemplate = {
  name: 'tape_recorder_16', width: 16, height: 16,
  description: 'Reel-to-reel tape recorder with two large reels and VU meters.',
  regions: [
    // Machine body
    { name: 'machine_body', role: 'body', pixels: [
      ...hLine(2, 1, 14),
      ...vLine(1, 3, 13),
      ...vLine(14, 3, 13),
      ...hLine(13, 1, 14),
    ]},
    // Left reel (larger circle)
    { name: 'left_reel', role: 'head', pixels: [
      [4,3], [5,3],
      [3,4], [4,4], [5,4], [6,4],
      [3,5], [4,5], [5,5], [6,5],
      [3,6], [4,6], [5,6], [6,6],
      [4,7], [5,7],
    ]},
    // Right reel (larger circle)
    { name: 'right_reel', role: 'head', pixels: [
      [10,3], [11,3],
      [9,4], [10,4], [11,4], [12,4],
      [9,5], [10,5], [11,5], [12,5],
      [9,6], [10,6], [11,6], [12,6],
      [10,7], [11,7],
    ]},
    // Reel hubs (center dots)
    { name: 'reel_hubs', role: 'boot', pixels: [
      [4,5], [5,5],
      [10,5], [11,5],
    ]},
    // Tape running between reels
    { name: 'tape_path', role: 'belt', pixels: [
      [7,5], [8,5],
      [7,7], [8,7],
    ]},
    // Tape head assembly
    { name: 'tape_heads', role: 'arm', pixels: [
      [6,8], [7,8], [8,8], [9,8],
    ]},
    // VU meters
    { name: 'vu_meters', role: 'face', pixels: [
      [3,9], [4,9], [5,9],
      [10,9], [11,9], [12,9],
    ]},
    // VU meter needles
    { name: 'vu_needles', role: 'accessory', pixels: [
      [4,9], [11,9],
    ]},
    // Control buttons row
    { name: 'controls', role: 'belt', pixels: [
      [3,11], [5,11], [7,11], [9,11], [11,11],
    ]},
    // Bottom panel
    { name: 'bottom_panel', role: 'arm', pixels: [
      ...hLine(12, 2, 13),
    ]},
  ],
};


// ════════════════════════════════════════════════════════════
// EXPORT REGISTRIES
// ════════════════════════════════════════════════════════════

export const RETRO_TECH_TEMPLATES: Record<string, SpriteTemplate> = {
  crt_tv: CRT_TV_16,
  retro_pc: RETRO_PC_16,
  game_boy: GAME_BOY_16,
  floppy_disk: FLOPPY_DISK_16,
  cassette_tape: CASSETTE_TAPE_16,
  vhs_tape: VHS_TAPE_16,
  rotary_phone: ROTARY_PHONE_16,
  typewriter: TYPEWRITER_16,
  vinyl_record: VINYL_RECORD_16,
  boombox: BOOMBOX_16,
  arcade_cabinet: ARCADE_CABINET_16,
  nes_cartridge: NES_CARTRIDGE_16,
  walkman: WALKMAN_16,
  old_camera: OLD_CAMERA_16,
  pager: PAGER_16,
  crt_monitor: CRT_MONITOR_16,
  radio: RADIO_16,
  calculator: CALCULATOR_16,
  joystick: JOYSTICK_16,
  tape_recorder: TAPE_RECORDER_16,
};

// ── Color Schemes ────────────────────────────────────────────

export const RETRO_TECH_COLOR_SCHEMES: Record<string, ColorScheme> = {
  crt_tv_default: scheme('CRT TV', {
    body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    face:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
    eye:       { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },
    accessory: { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    boot:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  }),
  retro_pc_default: scheme('Retro PC', {
    body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    face:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
    eye:       { shadow: '#6dc2ca', base: '#deeed6',  highlight: '#deeed6' },
    arm:       { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  }),
  game_boy_default: scheme('Game Boy', {
    body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    face:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
    eye:       { shadow: '#6daa2c', base: '#dad45e',  highlight: '#deeed6' },
    arm:       { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
    belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    head:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  }),
  floppy_disk_default: scheme('Floppy Disk', {
    body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
    arm:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
    boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
    head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    accessory: { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  }),
  cassette_tape_default: scheme('Cassette Tape', {
    body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    boot:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    head:      { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
    belt:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  }),
  vhs_tape_default: scheme('VHS Tape', {
    body:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
    boot:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  }),
  rotary_phone_default: scheme('Rotary Phone', {
    body:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
    head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    belt:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
    face:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  }),
  typewriter_default: scheme('Typewriter', {
    body:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    eye:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
    arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
    boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  }),
  vinyl_record_default: scheme('Vinyl Record', {
    boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    arm:       { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
    head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
  }),
  boombox_default: scheme('Boombox', {
    body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    head:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    arm:       { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    belt:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    face:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
    accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  }),
  arcade_cabinet_default: scheme('Arcade Cabinet', {
    body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
    accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
    face:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
    eye:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
    head:      { shadow: '#442434', base: '#d04648',  highlight: '#d27d2c' },
    boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    belt:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
    arm:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  }),
  nes_cartridge_default: scheme('NES Cartridge', {
    body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    arm:       { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    accessory: { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
    belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    boot:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
  }),
  walkman_default: scheme('Walkman', {
    body:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
    arm:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
    boot:      { shadow: '#140c1c', base: '#30346d',  highlight: '#597dce' },
    head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
    belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
    face:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
  }),
  old_camera_default: scheme('Old Camera', {
    body:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    eye:       { shadow: '#d2aa99', base: '#deeed6',  highlight: '#deeed6' },
    arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
    head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    face:      { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
    accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
    belt:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
    boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  }),
  pager_default: scheme('Pager', {
    body:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
    face:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
    eye:       { shadow: '#6daa2c', base: '#dad45e',  highlight: '#deeed6' },
    head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    arm:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
    belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  }),
  crt_monitor_default: scheme('CRT Monitor', {
    body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    eye:       { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
    accessory: { shadow: '#6daa2c', base: '#dad45e',  highlight: '#deeed6' },
    arm:       { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
  }),
  radio_default: scheme('Radio', {
    body:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    head:      { shadow: '#854c30', base: '#d27d2c',  highlight: '#dad45e' },
    arm:       { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    face:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
    belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
  }),
  calculator_default: scheme('Calculator', {
    body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    face:      { shadow: '#346524', base: '#6daa2c',  highlight: '#dad45e' },
    eye:       { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    head:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
    arm:       { shadow: '#30346d', base: '#597dce',  highlight: '#6dc2ca' },
  }),
  joystick_default: scheme('Joystick', {
    accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
    boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    arm:       { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    belt:      { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
    head:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
  }),
  tape_recorder_default: scheme('Tape Recorder', {
    body:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    head:      { shadow: '#442434', base: '#854c30',  highlight: '#d2aa99' },
    boot:      { shadow: '#140c1c', base: '#442434',  highlight: '#854c30' },
    belt:      { shadow: '#442434', base: '#854c30',  highlight: '#d27d2c' },
    arm:       { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    face:      { shadow: '#854c30', base: '#d2aa99',  highlight: '#deeed6' },
    accessory: { shadow: '#d04648', base: '#d27d2c',  highlight: '#dad45e' },
  }),
};
