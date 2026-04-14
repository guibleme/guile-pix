/**
 * Medieval Scholar's Collection -- 32x32 Batch 2: Rhetoric (10) + Arithmetic (10)
 *
 * 20 templates for the Liberal Arts bundle at 32x32 resolution.
 * Neo-SNES style (Chrono Trigger + Sea of Stars quality).
 * DB16 palette only, colored selout, 4-8 roles per template.
 *
 * Design rules:
 * - Clean silhouette, no isolated pixels
 * - 2-3 tones per material (shadow/base/highlight)
 * - Shadow clusters: 2-4px groups, never single dots
 * - Light from top-left, shadows bottom-right
 * - Centered in 32x32 canvas, 1px transparent border on 2+ sides
 * - Fill 35-65% of canvas
 *
 * Row format: exactly 32 characters per row, exactly 32 rows per grid.
 * '.' = transparent pixel.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'liberal_arts',
  exportNames: { templates: 'LIBERAL_ARTS_32_BATCH2_TEMPLATES', schemes: 'LIBERAL_ARTS_32_BATCH2_COLOR_SCHEMES' },
  templates: [

    // ===============================================================
    // RHETORIC -- Debate, Oratory, Persuasion (10)
    // ===============================================================

    // --- 1. DEBATE PODIUM ---
    {
      id: 'debate_podium_32',
      description: 'Wooden debate podium with angled top surface and scroll holder at front.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '................................', // 02
        '.......HHHHHHHHHHHHHHH..........', // 03
        '......HHHHHHHHHHHHHHHH..........', // 04
        '.....HHPPPPPPPPPPPPPHH..........', // 05
        '....HHPPPPPPPPPPPPPPPHH.........', // 06
        '...HHPPPPPPPPPPPPPPPPHH.........', // 07
        '...HHPPPPPPPPPPPPPPPPHH.........', // 08
        '....BBBBBBBBBBBBBBBBBBB.........', // 09
        '....BBBBBBBBBBBBBBBBBBB.........', // 10
        '....BBFFFFFFFFFFFFFFFFFBB.......',// 11
        '....BBFFFFFFFFFFFFFFFFFBB.......',// 12
        '....BBFFFFFFFFFFFFFFFFFBB.......',// 13
        '....BBFFFFFFFFFFFFFFFFFBB.......',// 14
        '....BBFFFFFFFFFFFFFFFFFBB.......',// 15
        '....BBFFFFFFFFFFFFFFFFFBB.......',// 16
        '....BBFFFFFGGGGGGFFFFFBB........',// 17
        '....BBFFFFFGGGGGGFFFFFBB........',// 18
        '....BBFFFFFFFFFFFFFFFFFBB.......',// 19
        '....BBFFFFFFFFFFFFFFFFFBB.......',// 20
        '....BBBBBBBBBBBBBBBBBBBBB.......',// 21
        '....BBBBBBBBBBBBBBBBBBBBB.......',// 22
        '........BBBBBBBBBBBB............', // 23
        '........BBBBBBBBBBBB............', // 24
        '........BBBBBBBBBBBB............', // 25
        '........BBBBBBBBBBBB............', // 26
        '......SSSSSSSSSSSSSSSS..........', // 27
        '......SSSSSSSSSSSSSSSS..........', // 28
        '.....SSSSSSSSSSSSSSSSSS.........', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'podium_body', role: 'body' },
        H: { name: 'top_surface', role: 'head' },
        P: { name: 'parchment_rest', role: 'arm' },
        F: { name: 'front_panel', role: 'belt' },
        G: { name: 'scroll_holder', role: 'eye' },
        S: { name: 'base_platform', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        arm:       { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // --- 2. HERALD TRUMPET ---
    {
      id: 'herald_trumpet_32',
      description: 'Long medieval herald trumpet with flared bell and hanging cloth banner.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '...MM...........................', // 02
        '....MMM.........................', // 03
        '.....TMMM.......................', // 04
        '......TTMMM.....................', // 05
        '.......TTTMMM...................', // 06
        '........TTTTMMM.................', // 07
        '.........TTTTTTT................', // 08
        '..........TTTTTTT...............', // 09
        '...........TTTTTBBB.............', // 10
        '............TTTTBBBBB...........', // 11
        '.............TTTBBBBBBBB........', // 12
        '..............TTBBBBBBBBB.......', // 13
        '...............TBBBBBBBBBB......', // 14
        '...........CCCCCBBBBBBBBBB......', // 15
        '...........CCCCC.BBBBBBBB.......',// 16
        '...........CCCCC................', // 17
        '...........CCRRCC...............', // 18
        '...........CCRRRCC..............', // 19
        '...........CCRRRRCC.............', // 20
        '...........CCRRRRRCC............', // 21
        '...........CCRRRRRRCC...........', // 22
        '...........CCRRRRRRRCC..........', // 23
        '............CCRRRRRCC...........', // 24
        '.............CCRRCC.............', // 25
        '..............CCC...............', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        T: { name: 'trumpet_body', role: 'body' },
        B: { name: 'bell_end', role: 'head' },
        M: { name: 'mouthpiece', role: 'arm' },
        R: { name: 'banner_cloth', role: 'eye' },
        C: { name: 'cord_fringe', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // --- 3. WAX SEAL STAMP ---
    {
      id: 'wax_seal_stamp_32',
      description: 'Wax seal stamp with turned wooden handle and engraved metal stamp face.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '................................', // 02
        '...........WWWWWW...............', // 03
        '..........WWWWWWWW..............', // 04
        '..........WWWWWWWW..............', // 05
        '...........WWWWWW...............', // 06
        '...........WWWWWW...............', // 07
        '...........WWWWWW...............', // 08
        '...........WWWWWW...............', // 09
        '...........WWWWWW...............', // 10
        '..........WWWWWWWW..............', // 11
        '..........WWWWWWWW..............', // 12
        '..........GGGGGGGG..............', // 13
        '.........GGGGGGGGGG.............', // 14
        '.........GGGGGGGGGG.............', // 15
        '........SSSSSSSSSSSS............', // 16
        '........SSSSSSSSSSSS............', // 17
        '........SSSSSSSSSSSS............', // 18
        '........SSSSSSSSSSSS............', // 19
        '........SSSSEEEESSSS............', // 20
        '........SSSEEEEEESSS............', // 21
        '........SSSSEEEESSSS............', // 22
        '........SSSSSSSSSSSS............', // 23
        '........SSSSSSSSSSSS............', // 24
        '................................', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        W: { name: 'handle', role: 'body' },
        G: { name: 'grip_ring', role: 'eye' },
        S: { name: 'stamp_face', role: 'head' },
        E: { name: 'engraved_seal', role: 'arm' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        arm:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // --- 4. PROCLAMATION SCROLL ---
    {
      id: 'proclamation_scroll_32',
      description: 'Royal proclamation scroll unfurled with visible text lines and wax seal.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '...RRRRRRRRRRRRRRRRRRRRRR.......',// 02
        '..RKPPPPPPPPPPPPPPPPPPPPKR......',// 03
        '..RKPPPPPPPPPPPPPPPPPPPPKR......',// 04
        '...PPTTTPPTTTPPPTTTPPPPPP.......',// 05
        '...PPPPPPPPPPPPPPPPPPPPPP.......',// 06
        '...PPTTTPPPTTTPPTTTPPPPPP.......',// 07
        '...PPPPPPPPPPPPPPPPPPPPPP.......',// 08
        '...PPTTTPPTTTPPPTTTPPPPPP.......',// 09
        '...PPPPPPPPPPPPPPPPPPPPPP.......',// 10
        '...PPTTTPPPTTTPPTTTPPPPPP.......',// 11
        '...PPPPPPPPPPPPPPPPPPPPPP.......',// 12
        '...PPTTTPPTTTPPPTTTPPPPPP.......',// 13
        '...PPPPPPPPPPPPPPPPPPPPPP.......',// 14
        '...PPPPPPPPPPPPPPPPPPPPPP.......',// 15
        '...PPPPPPPPPPPPPWWWWPPPP........',// 16
        '...PPPPPPPPPPPPWWWWWWPPP........',// 17
        '...PPPPPPPPPPPPWWWWWWPPP........',// 18
        '...PPPPPPPPPPPPPWWWWPPPP........',// 19
        '...PPPPPPPPPPPPPPPPPPPPPP.......',// 20
        '..RKPPPPPPPPPPPPPPPPPPPPKR......',// 21
        '..RKPPPPPPPPPPPPPPPPPPPPKR......',// 22
        '...RRRRRRRRRRRRRRRRRRRRRR.......',// 23
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
        R: { name: 'rollers', role: 'arm' },
        K: { name: 'knobs', role: 'eye' },
        P: { name: 'parchment', role: 'body' },
        T: { name: 'text_lines', role: 'head' },
        W: { name: 'wax_seal', role: 'accessory' },
      },
      colors: {
        arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // --- 5. ORATORS MASK ---
    {
      id: 'orators_mask_32',
      description: 'Classical theatrical comedy mask with open mouth and decorative gold trim.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '................................', // 02
        '..........GGGGGGGGGG............', // 03
        '.........GGGGGGGGGGGG...........', // 04
        '........GGGGGGGGGGGGGG..........', // 05
        '.......MMMMMMMMMMMMMMMM.........', // 06
        '......MMMMMMMMMMMMMMMMMM........', // 07
        '.....MMMMMMMMMMMMMMMMMMMM.......',// 08
        '.....MMMMMMMMMMMMMMMMMMMM.......',// 09
        '.....MMEEEMMMMMMEEEEMMMM........',// 10
        '.....MMEEEMMMMMMEEEEMMMM........',// 11
        '.....MMMMMMMMMMMMMMMMMMMM.......',// 12
        '.....MMMMMMMMMMMMMMMMMMMM.......',// 13
        '.....MMMMMCCCCCCMMMMMMM.........',// 14
        '......MMMCCCCCCCCMMMMM..........',// 15
        '......MMMMCCCCCCMMMMMMM.........',// 16
        '.......MMMMMMMMMMMMMMMM.........',// 17
        '........MMMMRRMMMMMMM...........',// 18
        '.........MMMRRMMMMM.............', // 19
        '..........MMMMMMMM..............', // 20
        '...........MMMMMM...............', // 21
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
        M: { name: 'mask_face', role: 'body' },
        E: { name: 'eye_holes', role: 'head' },
        C: { name: 'mouth_opening', role: 'arm' },
        G: { name: 'gold_crown_trim', role: 'eye' },
        R: { name: 'cheek_marks', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // --- 6. DEBATE GAVEL ---
    {
      id: 'debate_gavel_32',
      description: 'Wooden debate gavel resting on a stone sound block with gold band.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '................................', // 02
        '................................', // 03
        '................................', // 04
        '....HHHHHHHHHHHHHHHH............', // 05
        '....HGGHHHHHHHHHHGGH............', // 06
        '....HGGHHHHHHHHHHGGH............', // 07
        '....HHHHHHHHHHHHHHHH............', // 08
        '............HH..................', // 09
        '............HH..................', // 10
        '............HH..................', // 11
        '............HH..................', // 12
        '............HH..................', // 13
        '............HH..................', // 14
        '............HH..................', // 15
        '............HH..................', // 16
        '............HH..................', // 17
        '............HH..................', // 18
        '................................', // 19
        '................................', // 20
        '......SSSSSSSSSSSSSSSS..........', // 21
        '......SSSSSSSSSSSSSSSS..........', // 22
        '......SSSSSSSSSSSSSSSS..........', // 23
        '.....SSSSSSSSSSSSSSSSSS.........', // 24
        '.....SSSSSSSSSSSSSSSSSS.........', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        H: { name: 'gavel_head_handle', role: 'body' },
        G: { name: 'metal_bands', role: 'eye' },
        S: { name: 'sound_block', role: 'arm' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:  { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // --- 7. LAUREL WREATH ---
    {
      id: 'laurel_wreath_32',
      description: 'Classical laurel victory wreath with green leaves, red berries, and gold ribbon.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '................................', // 02
        '..........LLLLLLLL..............', // 03
        '........LLLLLLLLLLLL............', // 04
        '.......LLLBBBBBBBLLL............', // 05
        '......LLLBB.....BBLLL..........', // 06
        '.....LLBB.........BBLL.........', // 07
        '.....LLB...........BLL.........', // 08
        '....LLB.............BLL........', // 09
        '....LLB.............BLL........', // 10
        '....LLB.............BLL........', // 11
        '....LLB.............BLL........', // 12
        '....LLB.............BLL........', // 13
        '....LLB.............BLL........', // 14
        '.....LLB...........BLL.........', // 15
        '.....LLBB.........BBLL.........', // 16
        '......LLLBB.....BBLLL..........', // 17
        '.......LLLBBRRRRBBLL...........', // 18
        '........LLLLRRRRLLLL............', // 19
        '..........LLGGGGLL..............', // 20
        '...........GGGGGG...............', // 21
        '...........GGGGGG...............', // 22
        '............GGGG................', // 23
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
        L: { name: 'leaves', role: 'body' },
        B: { name: 'branches', role: 'head' },
        R: { name: 'berries', role: 'eye' },
        G: { name: 'ribbon_tails', role: 'arm' },
      },
      colors: {
        body: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        arm:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // --- 8. RHETORIC SCROLL ---
    {
      id: 'rhetoric_scroll_32',
      description: 'Ornate rhetoric teaching scroll with decorative gold border and visible text.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '...RRRRRRRRRRRRRRRRRRRRRR.......',// 02
        '..RRKKKKKKKKKKKKKKKKKKRR........',// 03
        '..RRKGGGGGGGGGGGGGGGGKRR.......',// 04
        '...KKGPPPPPPPPPPPPPPGKK.........',// 05
        '...KKGPPPPPPPPPPPPPPGKK.........',// 06
        '...KKGPPTTTPPTTTPPPPGKK.........',// 07
        '...KKGPPPPPPPPPPPPPPGKK.........',// 08
        '...KKGPPTTTPPPTTTPPGKK..........',// 09
        '...KKGPPPPPPPPPPPPPPGKK.........',// 10
        '...KKGPPTTTPPTTTPPPPGKK.........',// 11
        '...KKGPPPPPPPPPPPPPPGKK.........',// 12
        '...KKGPPTTTPPPTTTPPGKK..........',// 13
        '...KKGPPPPPPPPPPPPPPGKK.........',// 14
        '...KKGPPTTTPPTTTPPPPGKK.........',// 15
        '...KKGPPPPPPPPPPPPPPGKK.........',// 16
        '...KKGPPPPPPPPPPPPPPGKK.........',// 17
        '..RRKGGGGGGGGGGGGGGGGKRR.......',// 18
        '..RRKKKKKKKKKKKKKKKKKKRR........',// 19
        '...RRRRRRRRRRRRRRRRRRRRRR.......',// 20
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
        R: { name: 'rollers', role: 'arm' },
        K: { name: 'parchment_edge', role: 'body' },
        G: { name: 'gold_border', role: 'eye' },
        P: { name: 'parchment', role: 'head' },
        T: { name: 'text_lines', role: 'accessory' },
      },
      colors: {
        arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // --- 9. SPEECH BANNER ---
    {
      id: 'speech_banner_32',
      description: 'Medieval speech banner on a wooden pole with gold finial and text.',
      size: 32,
      grid: [
        '................................', // 00
        '..........GGG...................', // 01
        '.........GGGGG..................', // 02
        '..........PPP...................', // 03
        '..........PPP...................', // 04
        '..........PPP...................', // 05
        '.....RRRRRPPPRRRRRR.............', // 06
        '....RRRRRRRPPRRRRRRR............', // 07
        '....RRRRRRRPPRRRRRRR............', // 08
        '....RRTTTRRPPRTTTRRR............', // 09
        '....RRRRRRRRPRRRRRRR............', // 10
        '....RRTTRRRPPRTTRRRR............', // 11
        '....RRRRRRRRPRRRRRRR............', // 12
        '....RRTTTRRPPRTTTRRR............', // 13
        '....RRRRRRRRPRRRRRRR............', // 14
        '....RRTTRRRPPRTTRRRR............', // 15
        '....RRRRRRRRPRRRRRRR............', // 16
        '....RRRRRRRRPRRRRRRR............', // 17
        '.....RRRRRRRPRRRRRRR............', // 18
        '......RRRRRPPRRRRR..............', // 19
        '.......RRRRPPRRRR...............', // 20
        '........RRRPPRRR................', // 21
        '.........RRPPRR.................', // 22
        '..........RPPR..................', // 23
        '...........PP...................', // 24
        '...........PP...................', // 25
        '...........PP...................', // 26
        '...........PP...................', // 27
        '...........PP...................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        P: { name: 'pole', role: 'arm' },
        G: { name: 'finial', role: 'eye' },
        R: { name: 'banner_cloth', role: 'body' },
        T: { name: 'text_lines', role: 'head' },
      },
      colors: {
        arm:  { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // --- 10. AMPHORA INK ---
    {
      id: 'amphora_ink_32',
      description: 'Decorative Greek-style amphora vessel used as an ink container with handles.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '................................', // 02
        '...........NNNNNN...............', // 03
        '..........NNNNNNNN..............', // 04
        '..........NNIIIINN..............', // 05
        '..........NNIIIINN..............', // 06
        '...........NNNNNNNN.............', // 07
        '..........GGGGGGGGGG............', // 08
        '........HHBBBBBBBBBBHH..........', // 09
        '.......HHHBBBBBBBBBBHHH.........', // 10
        '......HH..BBBBBBBBBB..HH.......', // 11
        '......HH..BBBBBBBBBB..HH.......', // 12
        '.......HH.BBBBBBBBBB.HH........', // 13
        '........HHBBBBBBBBBBHH..........', // 14
        '..........BBBBBBBBBB............', // 15
        '..........BBBBBBBBBB............', // 16
        '.........BBBBBBBBBBBB...........', // 17
        '.........BBBBBBBBBBBB...........', // 18
        '..........BBBBBBBBBB............', // 19
        '..........BBBBBBBBBB............', // 20
        '...........BBBBBBBB.............', // 21
        '...........BBBBBBBB.............', // 22
        '..........FFFFFFFFFF............', // 23
        '..........FFFFFFFFFF............', // 24
        '.........FFFFFFFFFFFF...........', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        N: { name: 'neck_rim', role: 'head' },
        I: { name: 'ink_surface', role: 'eye' },
        G: { name: 'gold_band', role: 'accessory' },
        B: { name: 'vessel_body', role: 'body' },
        H: { name: 'handles', role: 'arm' },
        F: { name: 'base_foot', role: 'belt' },
      },
      colors: {
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ===============================================================
    // ARITHMETIC -- Counting, Commerce, Numbers (10)
    // ===============================================================

    // --- 11. ABACUS ---
    {
      id: 'abacus_32',
      description: 'Wooden abacus with horizontal rods, red upper beads, blue lower beads, and gold divider.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '....FFFFFFFFFFFFFFFFFFFF........', // 02
        '....FFFFFFFFFFFFFFFFFFFF........', // 03
        '....FFRR.....RRRRR...FF........', // 04
        '....FF.RR....RRRRR...FF........', // 05
        '....FF..RR...RRRRR...FF........', // 06
        '....FFDDDDDDDDDDDDDDFF........', // 07
        '....FFDDDDDDDDDDDDDDFF........', // 08
        '....FF....BBBBB..BB..FF........', // 09
        '....FF....BBBBB...BB.FF........', // 10
        '....FF....BBBBB....BBFF........', // 11
        '....FFFFFFFFFFFFFFFFFFFF........', // 12
        '....FFRR.....RRRRR...FF........', // 13
        '....FF.RR....RRRRR...FF........', // 14
        '....FF..RR...RRRRR...FF........', // 15
        '....FFDDDDDDDDDDDDDDFF........', // 16
        '....FFDDDDDDDDDDDDDDFF........', // 17
        '....FF....BBBBB..BB..FF........', // 18
        '....FF....BBBBB...BB.FF........', // 19
        '....FF....BBBBB....BBFF........', // 20
        '....FFFFFFFFFFFFFFFFFFFF........', // 21
        '....FFFFFFFFFFFFFFFFFFFF........', // 22
        '....FF..................FF......', // 23
        '....FF..................FF......', // 24
        '....FF..................FF......', // 25
        '....FF..................FF......', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        F: { name: 'frame', role: 'body' },
        R: { name: 'beads_upper', role: 'head' },
        B: { name: 'beads_lower', role: 'arm' },
        D: { name: 'divider_bar', role: 'eye' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        arm:  { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // --- 12. COUNTING BOARD ---
    {
      id: 'counting_board_32',
      description: 'Medieval counting board with grid lines and gold and silver tokens.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '....BBBBBBBBBBBBBBBBBBBB........', // 02
        '....BBBBBBBBBBBBBBBBBBBB........', // 03
        '....BBLLLLLLLLLLLLLLLLBB........', // 04
        '....BBLLLLLLLLLLLLLLLLBB........', // 05
        '....BBLLGGLLLLLLSSLLLLBB........', // 06
        '....BBLLLLLLLLLLLLLLLLBB........', // 07
        '....BBLLLLSSLLLLGGLLLLBB........', // 08
        '....BBLLLLLLLLLLLLLLLLBB........', // 09
        '....BBLLGGLLLLLLLLSSLLBB........', // 10
        '....BBLLLLLLLLLLLLLLLLBB........', // 11
        '....BBLLLLSSLLGGLLLLLLBB........', // 12
        '....BBLLLLLLLLLLLLLLLLBB........', // 13
        '....BBLLGGLLLLLLSSLLLLBB........', // 14
        '....BBLLLLLLLLLLLLLLLLBB........', // 15
        '....BBLLLLGGLLLLLLSSLLBB........', // 16
        '....BBLLLLLLLLLLLLLLLLBB........', // 17
        '....BBLLSSLLLLLLGGLLLLBB........', // 18
        '....BBLLLLLLLLLLLLLLLLBB........', // 19
        '....BBLLLLLLLLLLLLLLLLBB........', // 20
        '....BBBBBBBBBBBBBBBBBBBB........', // 21
        '....BBBBBBBBBBBBBBBBBBBB........', // 22
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
        B: { name: 'board_frame', role: 'body' },
        L: { name: 'grid_lines', role: 'head' },
        G: { name: 'gold_tokens', role: 'eye' },
        S: { name: 'silver_tokens', role: 'arm' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        eye:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:  { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // --- 13. COIN STACK ---
    {
      id: 'coin_stack_32',
      description: 'Stacked columns of gold and silver coins in 3/4 view with embossed detail.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '................................', // 02
        '................................', // 03
        '................................', // 04
        '................................', // 05
        '................................', // 06
        '..........GGGGGG................', // 07
        '.........GGHHHHGG...............', // 08
        '.........GGGGGGGG...............', // 09
        '.........GGGGGGGG...SSSSSS.....', // 10
        '.........GGGGGGGG..SSSSSSSS....', // 11
        '........GGGGGGGGGGSSSSSSSSSS...', // 12
        '........GGHHHHHGGGSSSSSSSSSS...', // 13
        '........GGGGGGGGGGSSSSSSSSSS...', // 14
        '........GGGGGGGGGGSSSSSSSSSS...', // 15
        '........GGGGGGGGGGSSSSSSSSSS...', // 16
        '........GGHHHHHGGGSSSSSSSSSS...', // 17
        '........GGGGGGGGGGSSSSSSSSSS...', // 18
        '.......EEGGGGGGGGGEESSSSSSSS...', // 19
        '.......EEEEEEEEEEEEESSSSSS.....', // 20
        '........EEEEEEEEEEE.............', // 21
        '........EEEEEEEEEEE.............', // 22
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
        G: { name: 'gold_coins', role: 'body' },
        H: { name: 'coin_emboss', role: 'head' },
        S: { name: 'silver_coins', role: 'arm' },
        E: { name: 'coin_edges', role: 'eye' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        arm:  { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:  { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // --- 14. MERCHANTS LEDGER ---
    {
      id: 'merchants_ledger_32',
      description: 'Open merchant ledger book with column entries and leather binding.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '...CCPPPPPPPPSSPPPPPPPPCC.......',// 02
        '...CCPPPPPPPPSSPPPPPPPPCC.......',// 03
        '...CCPPTPPTTPSSRPPRPPPPCC.......',// 04
        '...CCPPPPPPPPSSPPPPPPPPCC.......',// 05
        '...CCPPTPPTTPSSRPPRPPPPCC.......',// 06
        '...CCPPPPPPPPSSPPPPPPPPCC.......',// 07
        '...CCPPTPPTTPSSRPPRPPPPCC.......',// 08
        '...CCPPPPPPPPSSPPPPPPPPCC.......',// 09
        '...CCPPTPPTTPSSRPPRPPPPCC.......',// 10
        '...CCPPPPPPPPSSPPPPPPPPCC.......',// 11
        '...CCPPTPPTTPSSRPPRPPPPCC.......',// 12
        '...CCPPPPPPPPSSPPPPPPPPCC.......',// 13
        '...CCPPTPPTTPSSRPPRPPPPCC.......',// 14
        '...CCPPPPPPPPSSPPPPPPPPCC.......',// 15
        '...CCPPTPPTTPSSRPPRPPPPCC.......',// 16
        '...CCPPPPPPPPSSPPPPPPPPCC.......',// 17
        '...CCPPTPPTTPSSRPPRPPPPCC.......',// 18
        '...CCPPPPPPPPSSPPPPPPPPCC.......',// 19
        '...CCPPPPPPPPSSPPPPPPPPCC.......',// 20
        '...CCCCCCCCCCCCCCCCCCCCCC.......',// 21
        '...CCCCCCCCCCCCCCCCCCCCCC.......',// 22
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
        C: { name: 'cover_binding', role: 'body' },
        P: { name: 'pages', role: 'head' },
        S: { name: 'spine', role: 'belt' },
        T: { name: 'text_entries', role: 'arm' },
        R: { name: 'red_entries', role: 'eye' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:  { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // --- 15. ROMAN NUMERALS ---
    {
      id: 'roman_numerals_32',
      description: 'Stone tablet with carved Roman numeral inscription and decorative gold corners.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '................................', // 02
        '.....GGBBBBBBBBBBBBBBGG.........', // 03
        '.....GBBBBBBBBBBBBBBBG..........', // 04
        '.....BBBBBBBBBBBBBBBBB..........', // 05
        '.....BBBBBBBBBBBBBBBBB..........', // 06
        '.....BBBBTTBBTBBTTTBBB..........', // 07
        '.....BBBBBBBBBBBBBBBBB..........', // 08
        '.....BBBTTTTTBBBTTTBBB..........', // 09
        '.....BBBBBBBBBBBBBBBBB..........', // 10
        '.....BBBBTBBBTBBBTBBBB..........', // 11
        '.....BBBBBBBBBBBBBBBBB..........', // 12
        '.....BBBBBBBTTTTBBBBBB..........', // 13
        '.....BBBBBBBBBBBBBBBBB..........', // 14
        '.....BBBBTTTBBTTTBBBBB..........', // 15
        '.....BBBBBBBBBBBBBBBBB..........', // 16
        '.....BBBBBBBBBBBBBBBBB..........', // 17
        '.....BBBBBBBBBBBBBBBBB..........', // 18
        '.....BBBBBBBBBBBBBBBBB..........', // 19
        '.....GBBBBBBBBBBBBBBBG..........', // 20
        '.....GGBBBBBBBBBBBBBBGG.........', // 21
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
        B: { name: 'tablet_stone', role: 'body' },
        T: { name: 'carved_text', role: 'head' },
        G: { name: 'corner_detail', role: 'eye' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // --- 16. CALCULATION SLATE ---
    {
      id: 'calculation_slate_32',
      description: 'Chalk calculation slate in wooden frame with chalk marks and handle.',
      size: 32,
      grid: [
        '................................', // 00
        '......HH........................', // 01
        '......HH........................', // 02
        '....FFFFFFFFFFFFFFFFFF..........', // 03
        '....FFFFFFFFFFFFFFFFFF..........', // 04
        '....FFSSSSSSSSSSSSSSFF..........', // 05
        '....FFSSSSSSSSSSSSSSFF..........', // 06
        '....FFSSCCSCCSSSCCSSFF..........', // 07
        '....FFSSSSSSSSSSSSSSFF..........', // 08
        '....FFSSCCCCSSSSCCSSFF..........', // 09
        '....FFSSSSSSSSSSSSSSFF..........', // 10
        '....FFSSSSSCCCCSSSSSFF..........', // 11
        '....FFSSSSSSSSSSSSSSFF..........', // 12
        '....FFSSCCSSCCSSCCSSFF..........', // 13
        '....FFSSSSSSSSSSSSSSFF..........', // 14
        '....FFSSSSCCCCCSSSSSFF..........', // 15
        '....FFSSSSSSSSSSSSSSFF..........', // 16
        '....FFSSSSSSSSSSSSSSFF..........', // 17
        '....FFSSSSSSSSSSSSSSFF..........', // 18
        '....FFFFFFFFFFFFFFFFFF..........', // 19
        '....FFFFFFFFFFFFFFFFFF..........', // 20
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
        F: { name: 'frame', role: 'body' },
        S: { name: 'slate_surface', role: 'head' },
        C: { name: 'chalk_marks', role: 'arm' },
        H: { name: 'handle', role: 'eye' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:  { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:  { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // --- 17. MONEY POUCH ---
    {
      id: 'money_pouch_32',
      description: 'Round leather money pouch with drawstring and gold coins spilling out.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '................................', // 02
        '................................', // 03
        '..........DDDD..................', // 04
        '.........DD..DD.................', // 05
        '........DD....DD................', // 06
        '.......DDBBBBBBD................', // 07
        '......BBBBBBBBBBBB..............', // 08
        '.....BBBBBBBBBBBBBB.............', // 09
        '.....BBBBBBBBBBBBBB.............', // 10
        '....BBBBBBBBBBBBBBBB............', // 11
        '....BBBBBBBBBBBBBBBB............', // 12
        '....BBBBBBBBBBBBBBBB............', // 13
        '....BBBBBBBBBBBBBBBB............', // 14
        '.....BBBBBBBBBBBBBB.............', // 15
        '.....BBBBBBBBBBBBBB.............', // 16
        '......BBBBBBBBBBBB..............', // 17
        '.......BBBBBBBBBB...............', // 18
        '........BBBBBBBBB...............', // 19
        '.........BGGBBBB................', // 20
        '........GGGGGBB.................', // 21
        '.......GG.GGGG..................', // 22
        '......GG..GG....................', // 23
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
        B: { name: 'pouch_body', role: 'body' },
        D: { name: 'drawstring', role: 'head' },
        G: { name: 'spilled_coins', role: 'eye' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // --- 18. TALLY STICKS ---
    {
      id: 'tally_sticks_32',
      description: 'Bundle of medieval tally sticks with carved notch marks tied with red cord.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '................................', // 02
        '......SS.SS.SS.SS...............', // 03
        '......SS.SS.SS.SS...............', // 04
        '......SN.SN.SN.SN...............', // 05
        '......SS.SS.SS.SS...............', // 06
        '......SN.SN.SN.SN...............', // 07
        '......SS.SS.SS.SS...............', // 08
        '......SS.SS.SS.SS...............', // 09
        '......SN.SN.SN.SN...............', // 10
        '......SS.SS.SS.SS...............', // 11
        '.....RRRRRRRRRRRRRR.............', // 12
        '.....RRRRRRRRRRRRRR.............', // 13
        '.....RRRRRRRRRRRRRR.............', // 14
        '......SS.SS.SS.SS...............', // 15
        '......SN.SN.SN.SN...............', // 16
        '......SS.SS.SS.SS...............', // 17
        '......SN.SN.SN.SN...............', // 18
        '......SS.SS.SS.SS...............', // 19
        '......SN.SN.SN.SN...............', // 20
        '......SS.SS.SS.SS...............', // 21
        '......SS.SS.SS.SS...............', // 22
        '......SN.SN.SN.SN...............', // 23
        '......SS.SS.SS.SS...............', // 24
        '......SS.SS.SS.SS...............', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        S: { name: 'sticks', role: 'body' },
        N: { name: 'notch_marks', role: 'head' },
        R: { name: 'binding_cord', role: 'eye' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // --- 19. ARITHMETIC TABLE ---
    {
      id: 'arithmetic_table_32',
      description: 'Medieval multiplication table chart on parchment with ink grid and gold header.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '................................', // 02
        '....PPPPPPPPPPPPPPPPPPPP........', // 03
        '....PPGGGGGGGGGGGGGGPPPP........', // 04
        '....PPGGGGGGGGGGGGGGPPPP........', // 05
        '....PPPPPPPPPPPPPPPPPPPP........', // 06
        '....PPLLTTLLTTLLTTLLPP..........', // 07
        '....PPLLLLLLLLLLLLLLPP..........', // 08
        '....PPLLTTLLTTLLTTLLPP..........', // 09
        '....PPLLLLLLLLLLLLLLPP..........', // 10
        '....PPLLTTLLTTLLTTLLPP..........', // 11
        '....PPLLLLLLLLLLLLLLPP..........', // 12
        '....PPLLTTLLTTLLTTLLPP..........', // 13
        '....PPLLLLLLLLLLLLLLPP..........', // 14
        '....PPLLTTLLTTLLTTLLPP..........', // 15
        '....PPLLLLLLLLLLLLLLPP..........', // 16
        '....PPLLTTLLTTLLTTLLPP..........', // 17
        '....PPLLLLLLLLLLLLLLPP..........', // 18
        '....PPLLTTLLTTLLTTLLPP..........', // 19
        '....PPLLLLLLLLLLLLLLPP..........', // 20
        '....PPPPPPPPPPPPPPPPPPPP........', // 21
        '....PPPPPPPPPPPPPPPPPPPP........', // 22
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
        P: { name: 'parchment_border', role: 'body' },
        G: { name: 'header_row', role: 'eye' },
        L: { name: 'grid_lines', role: 'head' },
        T: { name: 'number_entries', role: 'arm' },
      },
      colors: {
        body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        arm:  { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // --- 20. GOLDEN RATIO ---
    {
      id: 'golden_ratio_32',
      description: 'Golden ratio spiral diagram on parchment with grid lines and center marker.',
      size: 32,
      grid: [
        '................................', // 00
        '................................', // 01
        '...PPPPPPPPPPPPPPPPPPPPPP.......',// 02
        '...PLLLLLLLLLLLLLLLLLLLLP.......',// 03
        '...PLLLLLLLLLLLLLLLLLLLLP.......',// 04
        '...PLLLLLLLLLGGGGGGLLLLLP.......',// 05
        '...PLLLLLLLLGGGGGGGGLLLLP.......',// 06
        '...PLLLLLLLGG......GGLLPP.......',// 07
        '...PLLLLLLGG........GGLPP.......',// 08
        '...PLLLLLGG..........GLLP.......',// 09
        '...PLLLLLGG..........GLLP.......',// 10
        '...PLLLLLGG....RR....GLLP.......',// 11
        '...PLLLLLGG....RR....GLLP.......',// 12
        '...PLLLLLGG..........GLLP.......',// 13
        '...PLLLLLGG..........GLLP.......',// 14
        '...PLLLLLLGG........GGLPP.......',// 15
        '...PLLLLLLLGG......GGLLPP.......',// 16
        '...PLLLLLLLLGGGGGGGGLLLLP.......',// 17
        '...PLLLLLLLLLGGGGGGLLLLLP.......',// 18
        '...PLLLLLLLLLLLLLLLLLLLLP.......',// 19
        '...PLLLLLLLLLLLLLLLLLLLLP.......',// 20
        '...PPPPPPPPPPPPPPPPPPPPPP.......',// 21
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
        P: { name: 'parchment_border', role: 'body' },
        L: { name: 'grid_background', role: 'head' },
        G: { name: 'golden_spiral', role: 'eye' },
        R: { name: 'center_point', role: 'arm' },
      },
      colors: {
        body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:  { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

  ],
};

export default batch;
