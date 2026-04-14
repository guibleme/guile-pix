/**
 * Medieval Scholar's Collection — Batch 3: Rhetoric (1) + Arithmetic (15) + Geometry (4) = 20 templates.
 * All 16x16, DB16 palette only.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'liberal_arts',
  exportNames: { templates: 'LIBERAL_ARTS_BATCH3_TEMPLATES', schemes: 'LIBERAL_ARTS_BATCH3_COLOR_SCHEMES' },
  templates: [

    // ─── 1. ORNATE QUILL (RHETORIC) ─────────────────────────────
    {
      id: 'ornate_quill_16',
      description: 'Luxury peacock-feather quill with gold nib and elaborate plumage.',
      //             0123456789012345
      grid: [
        '..............BB', // 0
        '.............BBB', // 1
        '............BGHB', // 2
        '...........BGHHB', // 3
        '..........BGHH..', // 4
        '.........BGHH...', // 5
        '........BGGH....', // 6
        '.......BGGH.....', // 7
        '......BGG.......', // 8
        '.....BGG........', // 9
        '....BBG.........', // 10
        '...AA...........', // 11
        '..AAA...........', // 12
        '.AAA............', // 13
        '.AA.............', // 14
        'AA..............', // 15
      ],
      chars: {
        B: { name: 'feather_vane', role: 'body' },
        G: { name: 'plume_detail', role: 'head' },
        H: { name: 'feather_eye', role: 'accessory' },
        A: { name: 'gold_nib', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        accessory: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 2. ABACUS (ARITHMETIC) ─────────────────────────────────
    {
      id: 'abacus_16',
      description: 'Counting frame with horizontal rods, colored beads, and divider bar.',
      //             0123456789012345
      grid: [
        '................', // 0
        '..FFFFFFFFFFFF..', // 1
        '..FHH......CCF..', // 2
        '..F.HH....CC.F..', // 3
        '..F..HH..CC..F..', // 4
        '..FFFFFFFFFFFF..', // 5
        '..FDDDDDDDDDDF..', // 6
        '..FFFFFFFFFFFF..', // 7
        '..FCC......HHF..', // 8
        '..F.CC....HH.F..', // 9
        '..F..CC..HH..F..', // 10
        '..F..CC...HH.F..', // 11
        '..FFFFFFFFFFFF..', // 12
        '..FF........FF..', // 13
        '..FF........FF..', // 14
        '................', // 15
      ],
      chars: {
        F: { name: 'wood_frame', role: 'body' },
        H: { name: 'upper_beads', role: 'head' },
        C: { name: 'lower_beads', role: 'arm' },
        D: { name: 'divider_bar', role: 'belt' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        arm:  { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 3. COUNTING BOARD (ARITHMETIC) ─────────────────────────
    {
      id: 'counting_board_16',
      description: 'Flat board with grid lines and scattered counting tokens.',
      //             0123456789012345
      grid: [
        '................', // 0
        '.BBBBBBBBBBBBBB.', // 1
        '.BLLLLLLLLLLLLB.', // 2
        '.BLAALLAALLAALB.', // 3
        '.BLLLLLLLLLLLLB.', // 4
        '.BLLALLALLALLBB.', // 5
        '.BLLLLLLLLLLLLB.', // 6
        '.BLLAALLAALLLBB.', // 7
        '.BLLLLLLLLLLLLB.', // 8
        '.BLLALLAALLALBB.', // 9
        '.BLLLLLLLLLLLLB.', // 10
        '.BLAALLALLALLBB.', // 11
        '.BLLLLLLLLLLLLB.', // 12
        '.BBBBBBBBBBBBBB.', // 13
        '................', // 14
        '................', // 15
      ],
      chars: {
        B: { name: 'board_rim', role: 'belt' },
        L: { name: 'board_lines', role: 'head' },
        A: { name: 'tokens', role: 'arm' },
      },
      colors: {
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        arm:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 4. GOLD COINS STACK (ARITHMETIC) ───────────────────────
    {
      id: 'gold_coins_stack_16',
      description: 'Pile of gold coins in 3/4 view with embossed detail on top coin.',
      //             0123456789012345
      grid: [
        '................', // 0
        '................', // 1
        '................', // 2
        '.....CCCCCC.....', // 3
        '....CCHHHHCC....', // 4
        '....CCCCCCCC....', // 5
        '...AACCCCCCAA...', // 6
        '...AACCHHCCAA...', // 7
        '...AACCCCCCAA...', // 8
        '..AAACCCCCCAAA..', // 9
        '..AAACCCCCCAAA..', // 10
        '..AAACCCCCCAAA..', // 11
        '..AAAAEEEEAAAA..', // 12
        '...AAAAAAAAAA...', // 13
        '................', // 14
        '................', // 15
      ],
      chars: {
        C: { name: 'coin_face', role: 'body' },
        H: { name: 'coin_emboss', role: 'head' },
        A: { name: 'coin_edge', role: 'arm' },
        E: { name: 'glint', role: 'eye' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        arm:  { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:  { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── 5. MERCHANTS SCALE (ARITHMETIC) ────────────────────────
    {
      id: 'merchants_scale_16',
      description: 'Small portable merchant balance for weighing coins.',
      //             0123456789012345
      grid: [
        '................', // 0
        '......BBBB......', // 1
        '.......BB.......', // 2
        '....HH.BB.HH....',
        '...HH..BB..HH...',
        '..HH...BB...HH..',
        '.HH....BB....HH.',
        'AAAA...BB..DDDD.', // 7
        'ACCA...BB..DDDD.', // 8
        'AAAA...BB..DDDD.', // 9
        '.......BB.......', // 10
        '.......BB.......', // 11
        '.......BB.......', // 12
        '......BBBB......', // 13
        '.....BBBBBB.....', // 14
        '................', // 15
      ],
      chars: {
        B: { name: 'beam_stand', role: 'body' },
        H: { name: 'chains', role: 'head' },
        A: { name: 'left_pan', role: 'arm' },
        C: { name: 'coins_in_pan', role: 'accessory' },
        D: { name: 'weights', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 6. TALLY STICKS (ARITHMETIC) ───────────────────────────
    {
      id: 'tally_sticks_16',
      description: 'Bundle of 3-4 tally sticks with notch marks, tied together.',
      //             0123456789012345
      grid: [
        '................', // 0
        '................', // 1
        '...BB.BB.BB.....', // 2
        '...BH.BH.BH.....', // 3
        '...BB.BB.BB.....', // 4
        '...BH.BH.BH.....', // 5
        '...BB.BB.BB.....', // 6
        '..CCCCCCCCCC....', // 7
        '..CCCCCCCCCC....', // 8
        '...BB.BB.BB.....', // 9
        '...BH.BH.BH.....', // 10
        '...BB.BB.BB.....', // 11
        '...BH.BH.BH.....', // 12
        '...BB.BB.BB.....', // 13
        '................', // 14
        '................', // 15
      ],
      chars: {
        B: { name: 'sticks', role: 'body' },
        H: { name: 'notches', role: 'head' },
        C: { name: 'binding_cord', role: 'arm' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 7. ROMAN NUMERAL PLAQUE (ARITHMETIC) ───────────────────
    {
      id: 'roman_numeral_plaque_16',
      description: 'Stone plaque with carved Roman numerals and decorative border.',
      //             0123456789012345
      grid: [
        '................', // 0
        '..AAAAAAAAAAAA..', // 1
        '..ABBBBBBBBBBA..', // 2
        '..ABBBBBBBBBBA..', // 3
        '..AB.HH..H.BBA..', // 4
        '..AB..HH.H.BBA..', // 5
        '..AB..HH.H.BBA..', // 6
        '..AB...H.H.BBA..', // 7
        '..AB..HH.H.BBA..', // 8
        '..AB.HH..H.BBA..', // 9
        '..AB.HH.HH.BBA..', // 10
        '..ABBBBBBBBBBA..', // 11
        '..ABBBBBBBBBBA..', // 12
        '..AAAAAAAAAAAA..', // 13
        '................', // 14
        '................', // 15
      ],
      chars: {
        A: { name: 'border', role: 'arm' },
        B: { name: 'stone_face', role: 'body' },
        H: { name: 'numerals', role: 'head' },
      },
      colors: {
        arm:  { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── 8. LEDGER BOOK (ARITHMETIC) ────────────────────────────
    {
      id: 'ledger_book_16',
      description: 'Open accounting ledger with column lines and leather spine.',
      //             0123456789012345
      grid: [
        '................', // 0
        '.AAPPPPPPPPPPAA.', // 1
        '.AAPHPPHPPHPPAA.', // 2
        '.AAPPPPPPPPPPAA.', // 3
        '.AAPHPPHPPHPPAA.', // 4
        '.AAPPPPPPPPPPAA.', // 5
        '.AAPHPPHPPPPPAA.', // 6
        '.AAPPPPPPPPPPAA.', // 7
        '.AAPHPPHPPHPPAA.', // 8
        '.AAPPPPPPPPPPAA.', // 9
        '.AAPHPPHPPHPPAA.', // 10
        '.AAPPPPPPPPPPAA.', // 11
        '.AAPHPPHPPPPPAA.', // 12
        '.AAPPPPPPPPPPAA.', // 13
        '.AAAAAAAAAAAAAA.', // 14
        '................', // 15
      ],
      chars: {
        A: { name: 'cover_spine', role: 'arm' },
        P: { name: 'pages', role: 'body' },
        H: { name: 'lines_numbers', role: 'head' },
      },
      colors: {
        arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 9. MONEY POUCH (ARITHMETIC) ────────────────────────────
    {
      id: 'money_pouch_16',
      description: 'Drawstring coin purse with coins spilling out.',
      //             0123456789012345
      grid: [
        '................', // 0
        '................', // 1
        '......HHHH......', // 2
        '....HH....HH....', // 3
        '....HBBBBBBH....', // 4
        '...BBBBBBBBBB...', // 5
        '...BBBBBBBBBB...', // 6
        '..BBBBBBBBBBBB..', // 7
        '..BBBBBBBBBBBB..', // 8
        '..BBBBBBBBBBBB..', // 9
        '...BBBBBBBBBB...', // 10
        '....BBBBBBBB....', // 11
        '.....AABBBB.....', // 12
        '....AA.AAA......', // 13
        '...AA...........', // 14
        '................', // 15
      ],
      chars: {
        B: { name: 'pouch_body', role: 'body' },
        H: { name: 'drawstring', role: 'head' },
        A: { name: 'spilled_coins', role: 'arm' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 10. GOLD INGOT (ARITHMETIC) ────────────────────────────
    {
      id: 'gold_ingot_16',
      description: 'Trapezoidal gold bar in 3/4 view with stamp on top face.',
      //             0123456789012345
      grid: [
        '................', // 0
        '................', // 1
        '................', // 2
        '................', // 3
        '....BBBBBBBB....', // 4
        '...BBHHHHHBBB...', // 5
        '...BBHHHHHBBB...', // 6
        '..AABBBBBBBBAA..', // 7
        '..AABBBBBBBBAA..', // 8
        '..AAABBBBBBAAAA.', // 9
        '..AAABBBBBBAAAA.', // 10
        '.AAAABBBBBBAAAA.', // 11
        '.AAAAAAAAAAAAAAA', // 12
        '..AAAAAAAAAAAAA.', // 13
        '................', // 14
        '................', // 15
      ],
      chars: {
        B: { name: 'ingot_top', role: 'body' },
        H: { name: 'stamp_mark', role: 'head' },
        A: { name: 'ingot_sides', role: 'arm' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 11. ARITHMETIC SLATE (ARITHMETIC) ──────────────────────
    {
      id: 'arithmetic_slate_16',
      description: 'Chalk slate with arithmetic equation and wooden frame.',
      //             0123456789012345
      grid: [
        '................', // 0
        '.HHHHHHHHHHHHHH.', // 1
        '.HBBBBBBBBBBBBH.', // 2
        '.HBBBBBBBBBBBBH.', // 3
        '.HBB.AA.A.AABBH.', // 4
        '.HBBBBBBBBBBBBH.', // 5
        '.HBBAA.AAABBBBH.', // 6
        '.HBBBBBBBBBBBBH.', // 7
        '.HBB.AA.AABABBH.', // 8
        '.HBBBBBBBBBBBBH.', // 9
        '.HBBBBBBBBBBBBH.', // 10
        '.HBBBBBBBBBBBBH.', // 11
        '.HBBBBBBBBBBBBH.', // 12
        '.HHHHHHHHHHHHHH.', // 13
        '................', // 14
        '................', // 15
      ],
      chars: {
        H: { name: 'wood_frame', role: 'head' },
        B: { name: 'slate_surface', role: 'body' },
        A: { name: 'chalk_marks', role: 'arm' },
      },
      colors: {
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:  { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── 12. DICE PAIR (ARITHMETIC) ─────────────────────────────
    {
      id: 'dice_pair_16',
      description: 'Two cubic dice in 3/4 view, slightly overlapping.',
      //             0123456789012345
      grid: [
        '................', // 0
        '................', // 1
        '................', // 2
        '..BBBBBBB.......', // 3
        '..BHHBHBB.......', // 4
        '..BBBBBBB.......', // 5
        '..BHBBHBB.BBBBB.', // 6
        '..BBBBBBB.BHBBB.', // 7
        '..BBBBBBB.BBBBB.', // 8
        '..AAAAAAA.BBBHB.', // 9
        '...AAAA...BHBBB.', // 10
        '..........BBBBB.', // 11
        '..........AAAAA.', // 12
        '...........AAA..', // 13
        '................', // 14
        '................', // 15
      ],
      chars: {
        B: { name: 'dice_faces', role: 'body' },
        H: { name: 'pips', role: 'head' },
        A: { name: 'dice_shadow', role: 'arm' },
      },
      colors: {
        body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:  { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 13. COUNTING TOKENS (ARITHMETIC) ───────────────────────
    {
      id: 'counting_tokens_16',
      description: 'Collection of scattered counting tokens and jettons.',
      //             0123456789012345
      grid: [
        '................', // 0
        '................', // 1
        '................', // 2
        '.....BB.........', // 3
        '....BHBB........', // 4
        '....BBBB........', // 5
        '.........BB.....', // 6
        '..BB....BHBB....', // 7
        '.BHBB...BBBB....', // 8
        '.BBBB...........', // 9
        '..........BB....', // 10
        '.......BBBHBB...', // 11
        '......BHBBBBBB..', // 12
        '......BBBBAAAA..', // 13
        '.......AAAAAAA..', // 14
        '................', // 15
      ],
      chars: {
        B: { name: 'token_faces', role: 'body' },
        H: { name: 'token_stamps', role: 'head' },
        A: { name: 'stacked_edges', role: 'arm' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:  { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 14. MATHEMATICAL SCROLL (ARITHMETIC) ───────────────────
    {
      id: 'mathematical_scroll_16',
      description: 'Open scroll with geometric diagrams and mathematical symbols.',
      //             0123456789012345
      grid: [
        '................', // 0
        '..AAA......AAA..', // 1
        '..AAPPPPPPPPAA..', // 2
        '..AAPPPPPPPPAA..', // 3
        '..AAPHHPPPPPAA..', // 4
        '...PPHHPPPPP....', // 5
        '...PPPPPHPPP....', // 6
        '...PPHHHHHPP....', // 7
        '...PPPPPHPPP....', // 8
        '...PPEEPPPPP....', // 9
        '...PPEPPEPPP....', // 10
        '..AAPPPEPPPPAA..', // 11
        '..AAPPPPPPPPAA..', // 12
        '..AAPPPPPPPPAA..', // 13
        '..AAA......AAA..', // 14
        '................', // 15
      ],
      chars: {
        A: { name: 'scroll_rolls', role: 'arm' },
        P: { name: 'parchment', role: 'body' },
        H: { name: 'diagrams', role: 'head' },
        E: { name: 'symbols', role: 'eye' },
      },
      colors: {
        arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:  { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── 15. TREASURE CHEST COINS (ARITHMETIC) ─────────────────
    {
      id: 'treasure_chest_coins_16',
      description: 'Small open chest overflowing with gold coins.',
      //             0123456789012345
      grid: [
        '................', // 0
        '...HHHHHHHH.....', // 1
        '..HHHHHHHHHH....', // 2
        '..HH......HH....', // 3
        '..BBAAAAAABB....', // 4
        '..BAAAAAAABB....', // 5
        '..BBAAAAAABB....', // 6
        '..DBBBBBBBBDD...', // 7
        '..DBBBBBBBBDD...', // 8
        '..DBBBBDBBDDD...', // 9
        '..DBBBBBBBBDD...', // 10
        '..DBBBBDBBDDD...', // 11
        '..DBBBBBBBBDD...', // 12
        '..DDDDDDDDDD....', // 13
        '................', // 14
        '................', // 15
      ],
      chars: {
        H: { name: 'lid', role: 'head' },
        B: { name: 'chest_body', role: 'body' },
        A: { name: 'gold_coins', role: 'arm' },
        D: { name: 'brackets_trim', role: 'belt' },
      },
      colors: {
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        arm:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 16. WEIGHT SET (ARITHMETIC) ────────────────────────────
    {
      id: 'weight_set_16',
      description: 'Set of brass weights of decreasing size in a row.',
      //             0123456789012345
      grid: [
        '................', // 0
        '................', // 1
        '................', // 2
        '................', // 3
        '................', // 4
        '................', // 5
        '......HH........', // 6
        '....HHHHH..HH...', // 7
        '...HBBBBH.HBH...', // 8
        '..HBBBBBH.HBH...', // 9
        '..HBBBBBHHBBHH..', // 10
        '..BBBBBBBBBBBBH.', // 11
        '..BBBBBBBBBBBBB.', // 12
        '.AAAAAAAAAAAAAAA', // 13
        '.AAAAAAAAAAAAAAA', // 14
        '................', // 15
      ],
      chars: {
        B: { name: 'weight_bodies', role: 'body' },
        H: { name: 'handles_knobs', role: 'head' },
        A: { name: 'base_plate', role: 'arm' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        arm:  { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── 17. DRAFTING COMPASS (GEOMETRY) ────────────────────────
    {
      id: 'drafting_compass_16',
      description: 'Two-legged drawing compass in V-shape with gold pivot.',
      //             0123456789012345
      grid: [
        '................', // 0
        '.......HH.......', // 1
        '......HBBH......', // 2
        '......B..B......', // 3
        '.....B....B.....', // 4
        '.....B....B.....', // 5
        '....B......B....', // 6
        '....B......B....', // 7
        '...B........B...', // 8
        '...B........B...', // 9
        '..B..........B..', // 10
        '..B..........B..', // 11
        '.B............A.', // 12
        '.B............AA', // 13
        'DD..............', // 14
        '................', // 15
      ],
      chars: {
        B: { name: 'compass_legs', role: 'body' },
        H: { name: 'pivot_joint', role: 'head' },
        A: { name: 'pencil_tip', role: 'arm' },
        D: { name: 'needle_point', role: 'eye' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:  { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 18. RULERS CROSS (GEOMETRY) ────────────────────────────
    {
      id: 'rulers_cross_16',
      description: 'Crossed ruler and set square with measurement marks.',
      //             0123456789012345
      grid: [
        '...............H', // 0
        '..............HH', // 1
        '.............HH.', // 2
        '............HAH.', // 3
        '...........HAH..', // 4
        '..........HAH...', // 5
        '.........HHH....', // 6
        'BABABABABHHBABAB', // 7
        '........HHH.....', // 8
        '.......HAH......', // 9
        '......HAH.......', // 10
        '.....HAH........', // 11
        '....HH..........', // 12
        '...HH...........', // 13
        '..HH............', // 14
        '.H..............', // 15
      ],
      chars: {
        B: { name: 'ruler_body', role: 'body' },
        A: { name: 'ruler_marks', role: 'arm' },
        H: { name: 'set_square', role: 'head' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        arm:  { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 19. SET SQUARE (GEOMETRY) ──────────────────────────────
    {
      id: 'set_square_16',
      description: 'Right-angle triangle set square with measurement marks.',
      //             0123456789012345
      grid: [
        '................', // 0
        'BB..............', // 1
        'BAB.............', // 2
        'B..B............', // 3
        'BA..B...........', // 4
        'B....B..........', // 5
        'BA....B.........', // 6
        'B..A...B........', // 7
        'BA......B.......', // 8
        'B...A....B......', // 9
        'BA........B.....', // 10
        'B..A..A....B....', // 11
        'BA..........B...', // 12
        'BABABABABABAB...', // 13
        '................', // 14
        '................', // 15
      ],
      chars: {
        B: { name: 'frame_edge', role: 'body' },
        A: { name: 'tick_marks', role: 'arm' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        arm:  { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── 20. GEOMETRIC CRYSTAL (GEOMETRY) ───────────────────────
    {
      id: 'geometric_crystal_16',
      description: 'Multi-faceted geometric crystal with visible facets and bright highlight.',
      //             0123456789012345
      grid: [
        '................', // 0
        '......BBBB......', // 1
        '.....BBHHBB.....', // 2
        '....BBHHHHBB....', // 3
        '...BBHHAAHHBB...', // 4
        '..BBHHAAAAHBBB..', // 5
        '..BHHAAAAAAHBB..', // 6
        '.BBHHAAAAAAHHBB.', // 7
        '.BBHHAAAAAHBBB..', // 8
        '..BBHAAAAHBBBD..', // 9
        '..BBHHAAHHBBDD..', // 10
        '...BBHHHHBBDD...', // 11
        '....BBHHBBDD....', // 12
        '.....BBBBDD.....', // 13
        '......DDDD......', // 14
        '................', // 15
      ],
      chars: {
        B: { name: 'crystal_body', role: 'body' },
        H: { name: 'facet_lines', role: 'head' },
        A: { name: 'highlight_core', role: 'arm' },
        D: { name: 'base_shadow', role: 'eye' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
        arm:  { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:  { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
