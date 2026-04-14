/**
 * Cozy Life-Sim batch 4 — 5 more cozy sprites to hit 100 in bundle.
 * Stardew Valley quality: warm ambers, soft greens, earthy browns.
 * All 16x16, DB16 palette only.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'cozy',
  exportNames: { templates: 'COZY_BATCH4_TEMPLATES', schemes: 'COZY_BATCH4_COLOR_SCHEMES' },
  templates: [

    // ─── 1. KNITTING BASKET ────────────────────────────────────────
    {
      id: 'knitting_basket_16',
      description: 'Woven basket overflowing with colorful yarn balls and knitting needles poking out.',
      grid: [
        '................',
        '......AA.AA.....',
        '.....A..A..A....',
        '....EEEE.EEE....',
        '...EFFFFEFFFE...',
        '..EFFFFFFFHFFE..',
        '..EFFHFFFFFFFE..',
        '.BEFFFFFFFFFFEB.',
        '.BEFFFFFFHFFFEB.',
        '.BBEFFFFFFFFEBB.',
        '..BBBBBBBBBBBB..',
        '..BHXHXHXHXHXB..',
        '..BXHXHXHXHXBB..',
        '..BBBBBBBBBBBB..',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'basket_rim', role: 'head' },
        X: { name: 'basket_weave', role: 'body' },
        H: { name: 'basket_weave_alt', role: 'belt' },
        F: { name: 'yarn_balls', role: 'arm' },
        E: { name: 'yarn_accent', role: 'eye' },
        A: { name: 'needles', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        arm:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 2. RECIPE BOOK ────────────────────────────────────────────
    {
      id: 'recipe_book_16',
      description: 'Open recipe book with handwritten text lines, ingredient doodle, and ribbon bookmark.',
      grid: [
        '................',
        '..BBBBBBBBBBBB..',
        '..BHHHHHHHHHHB..',
        '..BHLLLL.LLLLB..',
        '..BHLLLL.LLLLB..',
        '..BH.....LLLLB..',
        '..BHFFF..LLLLB..',
        '..BHFEF..LLLLB..',
        '..BHFFF......B..',
        '..BHLLLL.LLLLB..',
        '..BHLLLL.LLLLB..',
        '..BHHHHHHHHHHB..',
        '..BBBBBBBBBBBB..',
        '...A............',
        '...A............',
        '................',
      ],
      chars: {
        B: { name: 'cover', role: 'head' },
        H: { name: 'pages', role: 'body' },
        L: { name: 'text_lines', role: 'belt' },
        F: { name: 'ingredient_doodle', role: 'arm' },
        E: { name: 'doodle_center', role: 'eye' },
        A: { name: 'ribbon', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
        arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 3. PICNIC BLANKET ─────────────────────────────────────────
    {
      id: 'picnic_blanket_16',
      description: 'Checkered picnic blanket spread on grass with corner folded up.',
      grid: [
        '................',
        '................',
        '................',
        '..BHBHBHBHBHBB..',
        '..HBHBHBHBHBHB..',
        '..BHBHBHBHBHBB..',
        '..HBHBHBHBHBHB..',
        '..BHBHBHBHBHBB..',
        '..HBHBHBHBHBHB..',
        '..BHBHBHBHBHBB..',
        '..HBHBHBHBHBHB..',
        '..BHBHBHBHBHBB..',
        '..HBHBHBHBHFFE..',
        '..BBBBBBBBFFFE..',
        '.............E..',
        '................',
      ],
      chars: {
        B: { name: 'check_dark', role: 'body' },
        H: { name: 'check_light', role: 'head' },
        F: { name: 'fold_underside', role: 'arm' },
        E: { name: 'fold_shadow', role: 'belt' },
      },
      colors: {
        body:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:  { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        arm:   { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
        belt:  { shadow: '#442434', base: '#442434', highlight: '#854c30' },
      },
    },

    // ─── 4. WALL CLOCK ─────────────────────────────────────────────
    {
      id: 'wall_clock_cozy_16',
      description: 'Round wall clock with wooden frame, white face, hour/minute hands, and pendulum.',
      grid: [
        '................',
        '.....BBBBBB.....',
        '....BBHHHHBB....',
        '...BHHHHHHHHB...',
        '...BHHH.HHHHB...',
        '...BHHHEHHHFB...',
        '...BHHHEHHHHB...',
        '...BHHHEEAHHB...',
        '...BHHHHHHHHB...',
        '....BBHHHHBB....',
        '.....BBBBBB.....',
        '.......HH.......',
        '......HLLH......',
        '.......LL.......',
        '......HLLH......',
        '................',
      ],
      chars: {
        B: { name: 'frame', role: 'head' },
        H: { name: 'clock_face', role: 'body' },
        E: { name: 'hour_hand', role: 'eye' },
        A: { name: 'minute_hand', role: 'arm' },
        F: { name: 'hour_mark', role: 'accessory' },
        L: { name: 'pendulum', role: 'belt' },
      },
      colors: {
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 5. FLOWER VASE ────────────────────────────────────────────
    {
      id: 'flower_vase_16',
      description: 'Ceramic vase with colorful flower bouquet — tulips, daisies, and leaves.',
      grid: [
        '................',
        '.....FF.EE......',
        '....FFF.EEE.....',
        '...AFFAFEEAL....',
        '...ALLAFLEAL....',
        '....ALL.LEAL....',
        '.....LL.LL......',
        '.....BBBBBB.....',
        '....BBHHHHBB....',
        '....BHHHHHBB....',
        '....BHHXHHHB....',
        '....BHHHHHBB....',
        '....BBHHHHBB....',
        '.....BBBBBB.....',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'vase_rim', role: 'head' },
        H: { name: 'vase_body', role: 'body' },
        X: { name: 'vase_pattern', role: 'belt' },
        F: { name: 'flower_red', role: 'arm' },
        E: { name: 'flower_yellow', role: 'eye' },
        L: { name: 'leaves', role: 'accessory' },
        A: { name: 'leaf_dark', role: 'leg' },
      },
      colors: {
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        arm:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        leg:       { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },
      },
    },
  ],
};

export default batch;
