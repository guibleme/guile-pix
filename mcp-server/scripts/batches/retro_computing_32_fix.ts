/**
 * Retro Computing — FIX batch: 7 redesigned templates with pixel-perfect grids.
 * Replaces: nintendo_64_32, nes_cartridge_32, dreamcast_32, keyboard_90s_32,
 *           mechanical_keyboard_32, ps1_controller_32, playstation_1_32
 * Uses grid format for maximum visual precision.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'retro_tech',
  exportNames: { templates: 'RETRO_COMPUTING_32_FIX_TEMPLATES', schemes: 'RETRO_COMPUTING_32_FIX_COLOR_SCHEMES' },
  templates: [

    // ─── 1. NINTENDO 64 — top 3/4 view ─────────────────────────────
    // Dark charcoal body, curved front, cart slot back, 4 ports, red N logo
    {
      id: 'nintendo_64_32',
      description: 'Nintendo 64 console with curved design, cartridge slot, and four controller ports.',
      size: 32,
      grid: [
        //0123456789012345678901234567890 1
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '................................', // 5
        '..........SSSSSSSSSSS...........', // 6  cart slot opening
        '.....BBBBBBSSSSSSSSSBBBBBB......', // 7  top edge with slot
        '....LLLLLLLLLLLLLLLLLLLLLLLL....', // 8  top surface highlight
        '....BBBBBBBBBBBBBBBBBBBBBBBB....', // 9
        '...BBBBBBBBBBBBBBBBBBBBBBBBB....', // 10
        '...BBBBBBBBBBBBBBBBBBBBBBBBBB...', // 11
        '...BBAAABBBBBBBBBBBBBBBBBBBBB...', // 12 power+reset buttons
        '...BBBBBBBBBBBBBBBBBBBBBBBDBB...', // 13
        '...BBBBBBBBBEEEEBBBBBBBBBBDBB...', // 14 red N64 logo center
        '...BBBBBBBBBEEEEBBBBBBBBBBDBB...', // 15
        '...BBBBBBBBBBBBBBBBBBBBBBBDBB...', // 16
        '...DDBBBBBBBBBBBBBBBBBBBDDDBB...', // 17 vent grilles
        '...DDBBBBBBBBBBBBBBBBBBBDDDBB...', // 18
        '...DDDDDDDDDDDDDDDDDDDDDDDD.....', // 19 shadow base
        '....DDDDDDDDDDDDDDDDDDDDDD......', // 20
        '.....GGG..GGG..GGG..GGG.........', // 21 4 controller ports
        '................................', // 22
        '................................', // 23
        '................................', // 24
        '................................', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'cart_slot', role: 'head' },
        A: { name: 'buttons', role: 'accessory' },
        G: { name: 'controller_ports', role: 'belt' },
        E: { name: 'n64_logo', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 2. NES CARTRIDGE — front view ──────────────────────────────
    // Gray body, label in upper half, gold connector pins at bottom
    {
      id: 'nes_cartridge_32',
      description: 'Classic NES game cartridge with art label and gold edge connector.',
      size: 32,
      grid: [
        //0123456789012345678901234567890 1
        '................................', // 0
        '................................', // 1
        '........SSBBBBBBBBBBBBSS........', // 2  top with notches
        '........BBBBBBBBBBBBBBBB........', // 3
        '........BLLLLLLLLLLLLLLB........', // 4  highlight edge
        '........BBBBBBBBBBBBBBBB........', // 5
        '........B.AAAAAAAAAAAA.B........', // 6  label top
        '........B.AAAAAAAAAAAA.B........', // 7
        '........B.AAAEEEEEAAAA.B........', // 8  label art
        '........B.AAEEEEEEEAAA.B........', // 9
        '........B.AAAEEEEEAAAA.B........', // 10
        '........B.AAAAAAAAAAAA.B........', // 11
        '........B.AAEEEEEEEEAA.B........', // 12 label title text
        '........B.AAAAAAAAAAAA.B........', // 13 label bottom
        '........BBBBBBBBBBBBBBBB........', // 14
        '........BBBBBBBBBBBBBBBB........', // 15
        '........BBBBBBBBBBBBDDBB........', // 16
        '........BBBBBBBBBBBBDDBB........', // 17
        '........BBBBBBBBBBBBDDBB........', // 18
        '........DDDDDDDDDDDDDDBB........', // 19 shadow
        '........DD.GGGGGGGGGG.DDB.......', // 20 connector top
        '..........GGLGGLGGLGGL..........', // 21 gold pins
        '..........GGGGGGGGGGGG..........', // 22 connector base
        '................................', // 23
        '................................', // 24
        '................................', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'cart_shell', role: 'body' },
        D: { name: 'shell_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'shell_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'label_art', role: 'eye' },
        G: { name: 'gold_connector', role: 'belt' },
        S: { name: 'top_notches', role: 'head' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
      },
    },

    // ─── 3. DREAMCAST — top 3/4 view ────────────────────────────────
    // White/cream body, large circular disc lid, orange swirl, 4 ports
    {
      id: 'dreamcast_32',
      description: 'Sega Dreamcast console with circular disc lid and swirl logo.',
      size: 32,
      grid: [
        //0123456789012345678901234567890 1
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '....LLLLLLLLLLLLLLLLLLLLLL......', // 5  top highlight
        '...BBBBBBBBBBBBBBBBBBBBBBBBB....', // 6
        '...BBBA.BBBBBBBBBBBBBBBBBDBB....', // 7  open button
        '...BBB.BBBSSSSSSSSSSSBBBBBDBB...', // 8  disc lid top
        '...BBBBBSSSSSSSSSSSSSSSBBBDBB...', // 9
        '...BBBBSSSSSSSSSSSSSSSSBBBDBB...', // 10
        '...BBBBSSSSSSGGGGSSSSSSBBDBB....', // 11 center ring
        '...BBBSSSSSSGGEEGGSSSSSSBDBB....', // 12 swirl logo
        '...BBBSSSSSSGGEEGGSSSSSSBDBB....', // 13
        '...BBBBSSSSSSGGGGSSSSSSBBDBB....', // 14
        '...BBBBSSSSSSSSSSSSSSSSBBBDBB...', // 15
        '...BBBBBSSSSSSSSSSSSSSBBBBDBB...', // 16
        '...BBBBBBBSSSSSSSSSSBBBBBBDBB...', // 17
        '..AABB.BBBBBBBBBBBBBBBBBDDDBB...', // 18 power btn
        '...DDDDDDDDDDDDDDDDDDDDDDDBB....', // 19 shadow base
        '....GGG..GGG..GGG...............', // 20 3 controller ports
        '................................', // 21
        '................................', // 22
        '................................', // 23
        '................................', // 24
        '................................', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'disc_lid', role: 'head' },
        G: { name: 'center_ring', role: 'belt' },
        E: { name: 'swirl_logo', role: 'eye' },
        A: { name: 'power_button', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#d27d2c', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 4. 90s KEYBOARD — 3/4 top view ─────────────────────────────
    // Beige body, visible individual key rows, function keys, numpad
    {
      id: 'keyboard_90s_32',
      description: 'Beige 90s keyboard with individual keycaps, function row, and numpad.',
      size: 32,
      grid: [
        //0123456789012345678901234567890 1
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '................................', // 5
        '................................', // 6
        '................................', // 7
        '................................', // 8
        '..LLLLLLLLLLLLLLLLLLLLLLLLLLLL..', // 9  top highlight edge
        '..BBBBBBBBBBBBBBBBBBBBBBBBBBBB..', // 10
        '..B.EG.GG.GG.GG..GG.GG.GG.DB....', // 11 F-keys (Esc red + F1-F12)
        '..BBBBBBBBBBBBBBBBBBBBBBBBBBBB..', // 12
        '..B.GGGGGGGGGGGGGG.G.GG.GG.DB...', // 13 number row + numpad
        '..B.GGGGGGGGGGGGGG.G.GG.GG.DB...', // 14 QWERTY row
        '..B.GGGGGGGGGGGAGG.G.GG.GG.DB...', // 15 ASDF row (Enter=A)
        '..B.GGGGGGGGGGGGGG.G.GG.GG.DB...', // 16 ZXCV row
        '..B.GG.AAAAAAAAAA.GG.G..GG.DB...', // 17 spacebar row
        '..BDDDDDDDDDDDDDDDDDDDDDDDDBB...', // 18 bottom shadow
        '..BBBBBBBBBBBBBBBBBBBBBBBBBBBBB.', // 19
        '................................', // 20
        '................................', // 21
        '................................', // 22
        '................................', // 23
        '................................', // 24
        '................................', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'keyboard_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'keycaps', role: 'head' },
        A: { name: 'special_keys', role: 'accessory' },
        E: { name: 'escape_key', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 5. MECHANICAL KEYBOARD — 3/4 top view ──────────────────────
    // Black body, individual RGB keycaps, compact layout
    {
      id: 'mechanical_keyboard_32',
      description: 'Modern mechanical keyboard with RGB-lit individual keycaps.',
      size: 32,
      grid: [
        //0123456789012345678901234567890 1
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '................................', // 5
        '................................', // 6
        '................................', // 7
        '................................', // 8
        '...LLLLLLLLLLLLLLLLLLLLLLLLLL...', // 9  top highlight
        '...BBBBBBBBBBBBBBBBBBBBBBBBBB...', // 10
        '...B.EAA.AA.AA.AA.AA.AA.AA.B....', // 11 F-keys (Esc=E, F=A)
        '...BBBBBBBBBBBBBBBBBBBBBBBBBB...', // 12 gap row
        '...B.GGGGGGGGGGGGGGGG.GG.GG.B...', // 13 number row
        '...B.GGGGGGGGGGGGGGGG.GG.GG.B...', // 14 QWERTY
        '...B.GGGGGGGGGGGGGAGG.GG.GG.B...', // 15 home row (A=enter)
        '...B.GGGGGGGGGGGGGGGG.GG.GGDB...', // 16 bottom row
        '...B.GG.AAAAAAAAAA.GG.GGGGGDB...', // 17 spacebar + arrows
        '...BDDDDDDDDDDDDDDDDDDDDDDDB....', // 18 shadow
        '...BBBBBBBBBBBBBBBBBBBBBBBBBBB..', // 19
        '................................', // 20
        '................................', // 21
        '................................', // 22
        '................................', // 23
        '................................', // 24
        '................................', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'keyboard_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'keycaps', role: 'head' },
        A: { name: 'accent_keys', role: 'accessory' },
        E: { name: 'escape_key', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 6. PS1 CONTROLLER — top-down view ──────────────────────────
    // Gray body, dual grips, D-pad left, shape buttons right, analog sticks
    {
      id: 'ps1_controller_32',
      description: 'PlayStation DualShock controller with D-pad, shape buttons, and analog sticks.',
      size: 32,
      grid: [
        //0123456789012345678901234567890 1
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '................................', // 5
        '..........BBBBBBBBBBB...........', // 6  cable
        '.......LLLLLLLLLLLLLLLLL........', // 7  top highlight
        '......BBBDDBBBBBBBBDDBBBB.......', // 8  shoulder bumps L1/R1
        '.....BBBBBBBBBBBBBBBBBBBBB......', // 9  main body top
        '....BBBBBBBBBBBBBBBBBBBBBBBB....', // 10
        '...BBBBB.GGG.BBBBB.AF.BBBBB.....', // 11 Dpad + Triangle(A) Circle(F)
        '..BBBBB.GBBBG.BBB.FBBBAB.BBB....', // 12 Dpad sides + Square(F) Cross(A)
        '..BBBBBB.GGG.BBBBB.AF.BBBBBB....', // 13 Dpad + bottom
        '..BBBBBBBBBBBBBBBBBBBBBBBBBBB...', // 14
        '..BBBBBBBBB.EE..EE.BBBBBBBBB....', // 15 Select + Start
        '..BBBBBBBBBBBBBBBBBBBBBBBBBBB...', // 16
        '..BBBBB.SS.BBBBBBB.SS.BBBBB.....', // 17 analog sticks
        '..BBBBB.SS.BBBBBBB.SS.BBBBB.....', // 18
        '...BBBBBBBBBBBBBBBBBBBBBBBBB....', // 19
        '...BBBBDDBBBBBBBBBBBBDDBBBB.....', // 20 grip start
        '....BBBDDBB..........DDBBB......', // 21 grips
        '....BBBDDB............DDBB......', // 22
        '.....BBDD..............DDB......', // 23
        '......BBD...............DB......', // 24
        '................................', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'controller_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'dpad', role: 'head' },
        A: { name: 'triangle_cross', role: 'accessory' },
        F: { name: 'circle_square', role: 'belt' },
        E: { name: 'start_select', role: 'eye' },
        S: { name: 'analog_sticks', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        leg:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ─── 7. PLAYSTATION 1 — top 3/4 view ────────────────────────────
    // Gray body, large circular disc lid, buttons left, ports front
    {
      id: 'playstation_1_32',
      description: 'Sony PlayStation 1 console with circular disc lid and controller ports.',
      size: 32,
      grid: [
        //0123456789012345678901234567890 1
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '...LLLLLLLLLLLLLLLLLLLLLLLLL....', // 5  top surface highlight
        '..BBBBBBBBBBBBBBBBBBBBBBBBBBB...', // 6
        '..BA.BBBBBBBBBBBBBBBBBBBBBDBB...', // 7  open button
        '..BB.BBBBSSSSSSSSSSSBBBBBDDDBB..', // 8  disc lid
        '..BBBBBSSSSSSSSSSSSSSBBBBDDDBB..', // 9
        '..BBBSSSSSSSSSSSSSSSSSBBBBDBB...', // 10
        '..BBBSSSSSSSGGGGSSSSSSBBBDBB....', // 11 center ring
        '..BBBSSSSSSGBBBBGSSSSSBBBDBB....', // 12 hub
        '..BBBSSSSSSGBBBBGSSSSSBBBDBB....', // 13
        '..BBBSSSSSSSGGGGSSSSSSBBBDBB....', // 14
        '..BBBSSSSSSSSSSSSSSSSSBBBBDB....', // 15
        '..BBBBSSSSSSSSSSSSSSSBBBBBDB....', // 16
        '..BBBBBBBSSSSSSSSSBBBBBBBDDB....', // 17
        '..BA.BA.BBBBBBBBBBBBAAABDDDBB...', // 18 pwr+reset + logo
        '..BDDDDDDDDDDDDDDDDDDDDDDDB.....', // 19 shadow
        '..BBBBBBBBBBBBBBBBBBBBBBBBBBB...', // 20
        '....GGG.GGG....EEE.EEE..........', // 21 ctrl ports + mem slots
        '................................', // 22
        '................................', // 23
        '................................', // 24
        '................................', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'disc_lid', role: 'head' },
        G: { name: 'controller_ports', role: 'belt' },
        A: { name: 'buttons_logo', role: 'accessory' },
        E: { name: 'memory_slots', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#deeed6' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      },
    },

  ],
};

export default batch;
