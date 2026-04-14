/**
 * Medieval Scholar's Collection — 32x32 Batch 3: Geometry (10) + Music (10) = 20 templates.
 * Neo-SNES style (Chrono Trigger + Sea of Stars quality).
 * DB16 palette only, colored selout, 4-8 roles per template.
 *
 * All grids: 32 rows x 32 characters, ASCII format.
 * Light from top-left, shadows bottom-right.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'liberal_arts',
  exportNames: { templates: 'LIBERAL_ARTS_32_BATCH3_TEMPLATES', schemes: 'LIBERAL_ARTS_32_BATCH3_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════
    // GEOMETRY — Drafting Tools, Patterns, Architecture (10)
    // ═══════════════════════════════════════════════════════════

    // ─── 1. DRAFTING COMPASS ─────────────────────────────────
    {
      id: 'drafting_compass_32',
      description: 'Large drafting compass with A-shape legs, gold pivot joint, and ink-tipped pencil tip.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '..............SS................',  // 3
        '.............SGGS...............',  // 4
        '............SGGGS...............',  // 5
        '...........SS.PSS...............',  // 6
        '..........SS...SS...............',  // 7
        '.........SS.....SS..............',  // 8
        '........LL.......LL.............',  // 9
        '.......LL.........LL............',  // 10
        '......LL...........LL...........',  // 11
        '.....LL.............LL..........',  // 12
        '....LL...............LL.........',  // 13
        '...LL.................LL........',  // 14
        '..LL...................LL.......',  // 15
        '..LL...................LL.......',  // 16
        '..LL...................LL.......',  // 17
        '..LL...................LL.......',  // 18
        '..LL...................LL.......',  // 19
        '..LL...................LL.......',  // 20
        '..LL...................LL.......',  // 21
        '..LL...................LL.......',  // 22
        '..LL...................LL.......',  // 23
        '..LL...................LL.......',  // 24
        '..LL...................LL.......',  // 25
        '..LL...................LL.......',  // 26
        '..LL...................LL.......',  // 27
        '..TT...................LL.......',  // 28
        '..TT...................LL.......',  // 29
        '..II............................',  // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        L: { name: 'legs', role: 'body' },
        G: { name: 'pivot_joint', role: 'eye' },
        T: { name: 'pencil_tip', role: 'arm' },
        S: { name: 'adjustment_screw', role: 'head' },
        P: { name: 'pivot_pin', role: 'accessory' },
        I: { name: 'ink_tip', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
      },
    },

    // ─── 2. SET SQUARE ───────────────────────────────────────
    {
      id: 'set_square_32',
      description: 'Right-angle set square triangle ruler with graduated markings and gold corner brace.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '..BB............................',  // 3
        '..BBBB..........................',  // 4
        '..BWWBB.........................',  // 5
        '..BWMMWBB.......................',  // 6
        '..BW..MMWBB.....................',  // 7
        '..BW....MMWBB...................',  // 8
        '..BW..E...MWBB..................',  // 9
        '..BW........MWBB................',  // 10
        '..BW..E......MWBB...............',  // 11
        '..BW..........MWBB..............',  // 12
        '..BW..E........MWBB.............',  // 13
        '..BW............MWBB............',  // 14
        '..BW..E..........MWBB...........',  // 15
        '..BW..............MWBB..........',  // 16
        '..BW..E............MWBB.........',  // 17
        '..BW................MWBB........',  // 18
        '..BW..E..............MWBB.......',  // 19
        '..BW..................MWBB......',  // 20
        '..BW..E................MWBB.....',  // 21
        '..BW....................MWBB....',  // 22
        '..BW..E..................MWB....',  // 23
        '..BWMMMMMMMMMMMMMMMMMMMMMMWB....',  // 24
        '..BWWWWWWWWWWWWWWWWWWWWWWWWB....',  // 25
        '..GGBBBBBBBBBBBBBBBBBBBBBBBB....',  // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        M: { name: 'markings', role: 'head' },
        W: { name: 'edge_ruler', role: 'arm' },
        G: { name: 'corner_brace', role: 'eye' },
        E: { name: 'tick_marks', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── 3. PROTRACTOR ───────────────────────────────────────
    {
      id: 'protractor_32',
      description: 'Semicircular protractor with degree markings, center mark, and steel edge.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '................................', // 5
        '................................', // 6
        '................................', // 7
        '................................', // 8
        '................................', // 9
        '................................', // 10
        '..........EEEEEEEEEEEE..........',  // 11
        '.......EEEPPPPPPPPPPPEEE........',  // 12
        '......EEPPMMMPPPPMMMPPEEE.......',  // 13
        '.....EEPPPPPPPPPPPPPPPPEE.......',  // 14
        '....EEPPMPPPPPPPPPPPMPPEE.......',  // 15
        '...EEPPPPPPPPPPPPPPPPPPEE.......',  // 16
        '..EEPPMPPPPPPPPPPPPPMPPEE.......',  // 17
        '..EPPPPPPPPPPPPPPPPPPPPEE.......',  // 18
        '..EPPMPPPPPPPPPPPPPMPPEE........',  // 19
        '..EPPPPPPPPPPCRPPPPPPEE.........',  // 20
        '..EPPPPPPPPPPPPPPPPPPEE.........',  // 21
        '..EPPMPPPPPPPPPPPPMPEE..........',  // 22
        '..EPPPPPPPPPPPPPPPPEE...........',  // 23
        '..EEPPPPPPPPPPPPPPEE............',  // 24
        '...EEEEEEEEEEEEEEEE.............',  // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        P: { name: 'body', role: 'body' },
        M: { name: 'degree_marks', role: 'head' },
        C: { name: 'center_mark', role: 'eye' },
        E: { name: 'edge', role: 'arm' },
        R: { name: 'red_marker', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 4. ARCHITECTURAL PLAN ───────────────────────────────
    {
      id: 'architectural_plan_32',
      description: 'Partially unrolled architectural floor plan on parchment with blueprint lines and wood rollers.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '...RRRRRRRRRRRRRRRRRRRRRRRR.....',  // 3
        '...RPPPPPPPPPPPPPPPPPPPPPPR.....',  // 4
        '...RPPLLLPPLLLPPPPPPPPPPPPR.....',  // 5
        '...RPPLLLPPLLLPPPPPPPPPPPPR.....',  // 6
        '...RPPLLLPPLLLPPPPPPPPPPPPR.....',  // 7
        '...RPPPPPPPPPPLLLPPPPPPPPPR.....',  // 8
        '...RPPPPPTTTTTLLLPPPPPPPPPR.....',  // 9
        '...RPPPPPTTTTTTTTPPPPPPPPPR.....',  // 10
        '...RPPLLLPPPPPPPPPPPLLLPPPR.....',  // 11
        '...RPPLLLPPPPPPPPPPPLLLPPPR.....',  // 12
        '...RPPLLLPPPPPPPPPPPLLLPPPR.....',  // 13
        '...RPPPPPPPPPPPPPPPPPPPPPPR.....',  // 14
        '...RPPLLLPPPPPPPPPPLLLPPPPR.....',  // 15
        '...RPPLLLPPPPPPPPPPLLLPPPPR.....',  // 16
        '...RPPLLLPPPPPPPPPPLLLPPPPR.....',  // 17
        '...RPPPPPPPPPPPPPPPPPPPPPPR.....',  // 18
        '...RPPPPPPPPPLLLLPPPPPPPPPR.....',  // 19
        '...RPPPPPTTTTTTTTTPPPPPPPPR.....',  // 20
        '...RPPPPPPPPPPPPPPPPPPPPPPR.....',  // 21
        '...RPPLLLPPPPPPPPPPPLLLPPPR.....',  // 22
        '...RPPLLLPPPPPPPPPPPLLLPPPR.....',  // 23
        '...RPPPPPPPPPPPPPPPPPPPPPPR.....',  // 24
        '...RPPPPPPPPPPPPPPPPPPPPPPR.....',  // 25
        '...RRRRRRRRRRRRRRRRRRRRRRRR.....',  // 26
        '.....WWWWWWWWWWWWWWWWWWWW.......',  // 27
        '.....WWWWWWWWWWWWWWWWWWWW.......',  // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        P: { name: 'parchment', role: 'body' },
        L: { name: 'blueprint_lines', role: 'head' },
        T: { name: 'text_labels', role: 'arm' },
        R: { name: 'roller_edge', role: 'belt' },
        W: { name: 'wood_roller', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 5. MOSAIC TILE ──────────────────────────────────────
    {
      id: 'mosaic_tile_32',
      description: 'Decorative geometric mosaic tile with star pattern, warm and cool glass, and gold accents.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '...SSSSSSSSSSSSSSSSSSSSSSSS.....',  // 3
        '...SGGGGGGGGGGGGGGGGGGGGGGS.....',  // 4
        '...SGBBBBBBBBBBBBBBBBBBBBGS.....',  // 5
        '...SGBBBBBBWWWWBBBBBBBBBBGS.....',  // 6
        '...SGBBBBBWWCCWWBBBBBBBBBGS.....',  // 7
        '...SGBBBBWWCCCCWWBBBBBBBBGS.....',  // 8
        '...SGBBBWWCCRRCCWWBBBBBBBGS.....',  // 9
        '...SGBBWWCCRRRRCCWWBBBBBBGS.....',  // 10
        '...SGBWWCCRRRRRRCCCWWBBBBGS.....',  // 11
        '...SGWWCCRRRRRRRRCCWWBBBBGS.....',  // 12
        '...SGWCCRRRRRRRRRRCCCWBBBGS.....',  // 13
        '...SGWWCCRRRRRRRRCCWWBBBBGS.....',  // 14
        '...SGBWWCCRRRRRRCCCWWBBBBGS.....',  // 15
        '...SGBBWWCCRRRRCCWWBBBBBBGS.....',  // 16
        '...SGBBBWWCCRRCCWWBBBBBBBGS.....',  // 17
        '...SGBBBBWWCCCCWWBBBBBBBBGS.....',  // 18
        '...SGBBBBBWWCCWWBBBBBBBBBGS.....',  // 19
        '...SGBBBBBBWWWWBBBBBBBBBBGS.....',  // 20
        '...SGBBBBBBBBBBBBBBBBBBBBGS.....',  // 21
        '...SGGGGGGGGGGGGGGGGGGGGGGS.....',  // 22
        '...SSSSSSSSSSSSSSSSSSSSSSSS.....',  // 23
        '................................', // 24
        '................................', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        S: { name: 'tile_base', role: 'body' },
        R: { name: 'pattern_warm', role: 'head' },
        C: { name: 'pattern_cool', role: 'arm' },
        G: { name: 'grout_lines', role: 'eye' },
        W: { name: 'gold_accent', role: 'accessory' },
        B: { name: 'background_stone', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── 6. GEOMETRIC ROSE WINDOW ────────────────────────────
    {
      id: 'geometric_rose_32',
      description: 'Gothic geometric rose window design with stone frame, warm/cool stained glass, and gold center.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '..........SSSSSSSSS.............',  // 4
        '........SSSFFFFFFFSSS...........',  // 5
        '.......SSFFRRFFCCFFSS...........',  // 6
        '......SSFRRRRFFCCCCSSS..........',  // 7
        '.....SSFRRRRRFFCCCCCSS..........',  // 8
        '....SSFRRRRRGGGCCCCCFSS.........',  // 9
        '...SSFRRRRRGGGGCCCCCCFSS........',  // 10
        '...SFRRRRRGGTTTGCCCCCFSS........',  // 11
        '..SSFRRRRGTTTTTTTGCCCCFSS.......',  // 12
        '..SSFRRRGTTTTTTTTGCCCCFSS.......',  // 13
        '..SSFRRRGTTTAATTTGCCCCFSS.......',  // 14
        '..SSFRRRGTTTAATTTGCCCCFSS.......',  // 15
        '..SSFRRRGTTTTTTTTGCCCCFSS.......',  // 16
        '..SSFRRRRGTTTTTTTGCCCCFSS.......',  // 17
        '...SFRRRRRGGTTTGCCCCCFSS........',  // 18
        '...SSFRRRRRGGGGCCCCCCFSS........',  // 19
        '....SSFRRRRRGGGCCCCCFSS.........',  // 20
        '.....SSFRRRRRFFCCCCCSS..........',  // 21
        '......SSFRRRRFFCCCCSSS..........',  // 22
        '.......SSFFRRFFCCFFSS...........',  // 23
        '........SSSFFFFFFFSSS...........',  // 24
        '..........SSSSSSSSS.............',  // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        S: { name: 'stone_frame', role: 'body' },
        R: { name: 'warm_glass', role: 'head' },
        C: { name: 'cool_glass', role: 'arm' },
        G: { name: 'tracery', role: 'eye' },
        A: { name: 'center_hub', role: 'accessory' },
        F: { name: 'frame_fill', role: 'belt' },
        T: { name: 'inner_glass', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        boot:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ─── 7. RULER ────────────────────────────────────────────
    {
      id: 'ruler_32',
      description: 'Long straight wooden ruler with graduated markings, steel edges, and gold end caps.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '................................', // 5
        '................................', // 6
        '................................', // 7
        '................................', // 8
        '................................', // 9
        '................................', // 10
        '................................', // 11
        '................................', // 12
        '.GEEEEEEEEEEEEEEEEEEEEEEEEEG....',  // 13
        '.GBBMBMBBBMBMBBBMBMBBBMBBBBBG...',  // 14
        '.GBBBBBBBBBBBBBBBBBBBBBBBBBBG...',  // 15
        '.GBBBBBBBBBBBBBBBBBBBBBBBBBBG...',  // 16
        '.GBBMBMBBBMBMBBBMBMBBBMBBBBBG...',  // 17
        '.GEEEEEEEEEEEEEEEEEEEEEEEEEG....',  // 18
        '................................', // 19
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
        '................................', // 32
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        M: { name: 'marks', role: 'head' },
        E: { name: 'edge', role: 'arm' },
        G: { name: 'end_cap', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 8. DIVIDERS ─────────────────────────────────────────
    {
      id: 'dividers_32',
      description: 'Pair of pointed dividers for measuring distances, with steel legs, gold hinge, and sharp tips.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '.............HH.................',  // 3
        '............HGGH................',  // 4
        '...........HGGGH................',  // 5
        '..........HH.HHH................',  // 6
        '.........HH...HH................',  // 7
        '........LL.....LL...............',  // 8
        '.......LL.......LL..............',  // 9
        '......LL.........LL.............',  // 10
        '.....LL...........LL............',  // 11
        '....LL.............LL...........',  // 12
        '...LL...............LL..........',  // 13
        '..LL.................LL.........',  // 14
        '..LL...................LL.......',  // 15
        '..LL...................LL.......',  // 16
        '..LL...................LL.......',  // 17
        '..LL...................LL.......',  // 18
        '..LL...................LL.......',  // 19
        '..LL...................LL.......',  // 20
        '..LL...................LL.......',  // 21
        '..LL...................LL.......',  // 22
        '..LL...................LL.......',  // 23
        '..LL...................LL.......',  // 24
        '..LL...................LL.......',  // 25
        '..LL...................LL.......',  // 26
        '..LL...................LL.......',  // 27
        '..TT...................TT.......',  // 28
        '..PP...................PP.......',  // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        L: { name: 'legs', role: 'body' },
        T: { name: 'points', role: 'head' },
        G: { name: 'hinge', role: 'eye' },
        H: { name: 'handle', role: 'arm' },
        P: { name: 'tips', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── 9. FLOOR PLAN ───────────────────────────────────────
    {
      id: 'floor_plan_32',
      description: 'Small building floor plan diagram showing rooms, walls, doorways, and labels from top-down view.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '..WWWWWWWWWWWWWWWWWWWWWWWWWW....',  // 3
        '..WRRRRRRRWRRRRRRRRRRRRRRW......',  // 4
        '..WRRRRRRRWRRRRRRRLRRRRRW.......',  // 5
        '..WRRRRRRRWRRRRRRRRRRRRRRW......',  // 6
        '..WRRRRRRRWRRRRRRRRRRRRRRW......',  // 7
        '..WRRRRRRRDRRRRRRRRRRRRRW.......',  // 8
        '..WRRRRRRRWRRRRRRRRRRRRRRW......',  // 9
        '..WWWWWDWWWWWWWDWWWWWWWWWW......',  // 10
        '..WRRRRRRRRRRRRWRRRRRRRRRRW.....',  // 11
        '..WRRRRRRRRRRRRWRRRRRRRRRRW.....',  // 12
        '..WRRRRLRRRRRRRDRRRRLRRRRRW.....',  // 13
        '..WRRRRRRRRRRRRWRRRRRRRRRRW.....',  // 14
        '..WRRRRRRRRRRRRWRRRRRRRRRRW.....',  // 15
        '..WRRRRRRRRRRRRWRRRRRRRRRRW.....',  // 16
        '..WWWWWWWWDWWWWWWWWWWWWWWWW.....',  // 17
        '..WRRRRRRRRRRRRRRRRRRRRRRRW.....',  // 18
        '..WRRRRLRRRRRRRRRRRRRLRRRRW.....',  // 19
        '..WRRRRRRRRRRRRRRRRRRRRRRRW.....',  // 20
        '..WRRRRRRRRRRRRRRRRRRRRRRRW.....',  // 21
        '..WRRRRRRRRRRRRRRRRRRRRRRRW.....',  // 22
        '..WWWWWWWWWWWWWWWWWWWWWWWWWW....',  // 23
        '................................', // 24
        '................................', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        W: { name: 'walls', role: 'body' },
        R: { name: 'rooms', role: 'head' },
        D: { name: 'doorways', role: 'arm' },
        L: { name: 'labels', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 10. PLATONIC SOLID ──────────────────────────────────
    {
      id: 'platonic_solid_32',
      description: '3D wireframe icosahedron with visible steel edges, blue glass faces, gold vertices, and hidden edges.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '..............VV................',  // 4
        '.............VEEV...............',  // 5
        '............VE..EV..............',  // 6
        '...........VE....EV.............',  // 7
        '..........VE......EV............',  // 8
        '.........VE........EV...........',  // 9
        '........VE..........EV..........',  // 10
        '.......VE....FFFF....EV.........',  // 11
        '......VE...FFFFFFFF...EV........',  // 12
        '.....VE..FFFFFFFFFFFF..EV.......',  // 13
        '....VEEFFFFFFFFFFFFFFFEEEV......',  // 14
        '...VV.HHFFFFFFFFFFFFFHH.VV......',  // 15
        '..VE...HHFFFFFFFFFFFHH...EV.....',  // 16
        '..VE....HHFFFFFFFFFHH....EV.....',  // 17
        '..VE.....HHFFFFFFFHH.....EV.....',  // 18
        '..VE......HHFFFFFHH......EV.....',  // 19
        '...VE......HHFFFHH......EV......',  // 20
        '....VE......HHFHH......EV.......',  // 21
        '.....VE......HHH......EV........',  // 22
        '......VE.....HHH.....EV.........',  // 23
        '.......VE....HHH....EV..........',  // 24
        '........VE...HHH...EV...........',  // 25
        '.........VE..HHH..EV............',  // 26
        '..........VE.HHH.EV.............',  // 27
        '...........VEHHHEV..............',  // 28
        '............VVVVV...............',  // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        E: { name: 'edges', role: 'body' },
        F: { name: 'faces_visible', role: 'head' },
        V: { name: 'vertices', role: 'eye' },
        H: { name: 'hidden_edges', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // MUSIC — Medieval Instruments, Notation (10)
    // ═══════════════════════════════════════════════════════════

    // ─── 11. MEDIEVAL LUTE ───────────────────────────────────
    {
      id: 'medieval_lute_32',
      description: 'Teardrop-bodied medieval lute with long neck, gold strings, dark soundhole, and decorated headstock.',
      size: 32,
      grid: [
        '................................', // 1
        '.....GG.........................',  // 2
        '....GNNG........................',  // 3
        '....GNNG........................',  // 4
        '.....NN.........................',  // 5
        '.....NS.........................',  // 6
        '.....NS.........................',  // 7
        '.....NS.........................',  // 8
        '.....NS.........................',  // 9
        '.....NS.........................',  // 10
        '.....NS.........................',  // 11
        '.....NS.........................',  // 12
        '.....NS.........................',  // 13
        '....BNNSB.......................',  // 14
        '...BBNNSBB......................',  // 15
        '..BBBNNSBBB.....................',  // 16
        '..BBBNNSBBB.....................',  // 17
        '.BBBBNNSBBBBB...................',  // 18
        '.BBBBDDDBBBBB...................',  // 19
        '.BBBDDDDDBBBBB..................',  // 20
        '.BBBDDDDDBBBBB..................',  // 21
        '.BBBBDDDBBBBB...................',  // 22
        '.BBBBNNSBBBBB...................',  // 23
        '..BBBNNSBBB.....................',  // 24
        '..BBBNNSBBB.....................',  // 25
        '...BBNNSBB......................',  // 26
        '....BNNSB.......................',  // 27
        '.....BBB........................',  // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'soundhole', role: 'head' },
        S: { name: 'strings', role: 'arm' },
        N: { name: 'neck', role: 'belt' },
        G: { name: 'headstock', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 12. CELTIC HARP ─────────────────────────────────────
    {
      id: 'celtic_harp_32',
      description: 'Triangular Celtic harp with curved wooden frame, gold strings, and ornamental column.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '.....FFFFFFFFFFFF...............',  // 3
        '....FF..........FF..............',  // 4
        '...FF............FF.............',  // 5
        '..FF.S.S.S.S.S.S.FF.............',  // 6
        '..FCS.S.S.S.S.S.S.FF............',  // 7
        '..FC.S.S.S.S.S.S...FF...........',  // 8
        '..FC.S.S.S.S.S.S....F...........',  // 9
        '..FC.S.S.S.S.S.S....F...........',  // 10
        '..FC.S.S.S.S.S......F...........',  // 11
        '..FC.S.S.S.S.S......F...........',  // 12
        '..FC.S.S.S.S........F...........',  // 13
        '..FC.S.S.S.S........F...........',  // 14
        '..FC.S.S.S..........F...........',  // 15
        '..FC.S.S.S..........F...........',  // 16
        '..FC.S.S.............F..........',  // 17
        '..FC.S.S.............F..........',  // 18
        '..FC.S...............F..........',  // 19
        '..FC.S...............F..........',  // 20
        '..FC..................F.........',  // 21
        '..FC..................F.........',  // 22
        '..FCC.................F.........',  // 23
        '...FCC...............FF.........',  // 24
        '....FCC.............FF..........',  // 25
        '.....FCCCCCCCCCCCCCF............',  // 26
        '......BBBBBBBBBBBFF.............',  // 27
        '.......BBBBBBBBBBF..............',  // 28
        '........FFFFFFFFFF..............',  // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        F: { name: 'frame', role: 'body' },
        S: { name: 'strings', role: 'head' },
        B: { name: 'soundbox', role: 'arm' },
        C: { name: 'column_decor', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 13. CHURCH ORGAN ────────────────────────────────────
    {
      id: 'church_organ_32',
      description: 'Small church pipe organ front with graduated steel pipes, wood frame, parchment keyboard, and gold trim.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '.........DDDDDDDDDDDD...........',  // 3
        '........DDDDDDDDDDDDDD..........',  // 4
        '........DFPPPPPPPPPPFD..........',  // 5
        '.......DFPPPPPPPPPPPFD..........',  // 6
        '.......DFP.PP.PP.PP.PFD.........',  // 7
        '.......DFP.PP.PP.PP.PFD.........',  // 8
        '......DFP..PP.PP.PP..PFD........',  // 9
        '......DFP..PP.PP.PP..PFD........',  // 10
        '.....DFPP..PP.PP.PP..PPFD.......',  // 11
        '.....DFPP..PP.PP.PP..PPFD.......',  // 12
        '.....DFPP..PP.PP.PP..PPFD.......',  // 13
        '....DFPPP..PP.PP.PP..PPPFD......',  // 14
        '....DFPPP..PP.PP.PP..PPPFD......',  // 15
        '....DFPPP..PP.PP.PP..PPPFD......',  // 16
        '....DFPPP..PP.PP.PP..PPPFD......',  // 17
        '...DFPPPP..PP.PP.PP..PPPPFD.....',  // 18
        '...DFPPPP..PP.PP.PP..PPPPFD.....',  // 19
        '...DFPPPP..PP.PP.PP..PPPPFD.....',  // 20
        '...DFFFFFFFFFFFFFFFFFFFFFFD.....',  // 21
        '...DFKKKKKKKKKKKKKKKKKKKKFD.....',  // 22
        '...DFKKKKKKKKKKKKKKKKKKKKFD.....',  // 23
        '...DFKKKKKKKKKKKKKKKKKKKKFD.....',  // 24
        '...DFFFFFFFFFFFFFFFFFFFFFFD.....',  // 25
        '...DDDDDDDDDDDDDDDDDDDDDDDD.....',  // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        P: { name: 'pipes', role: 'body' },
        F: { name: 'frame', role: 'arm' },
        K: { name: 'keyboard', role: 'eye' },
        D: { name: 'decorative', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 14. TAMBOURINE ──────────────────────────────────────
    {
      id: 'tambourine_32',
      description: 'Circular tambourine with wooden frame, parchment skin, gold jingles, and red ribbon.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '..........FFFFFFFFFFF...........',  // 5
        '........FFFFSSSSSSSFFFF.........',  // 6
        '......FFSSSSSSSSSSSSSSFF........',  // 7
        '.....FFSSSSSSSSSSSSSSSFF........',  // 8
        '....FFSSSSSSSSSSSSSSSSSSFF......',  // 9
        '...FFJSSSSSSSSSSSSSSSSJFF.......',  // 10
        '..FFSSSSSSSSSSSSSSSSSSSFF.......',  // 11
        '..FFSSSSSSSSSSSSSSSSSSSSFF......',  // 12
        '..FFSSSSSSSSSSSSSSSSSSSSFF......',  // 13
        '.FFSSSSSSSSSSSSSSSSSSSSSSFF.....',  // 14
        '.FFSSSSSSSSSSSSSSSSSSSSSSFF.....',  // 15
        '.FFSSSSSSSSSSSSSSSSSSSSSSFF.....',  // 16
        '.FFJSSSSSSSSSSSSSSSSSSJSSFF.....',  // 17
        '..FFSSSSSSSSSSSSSSSSSSSSFF......',  // 18
        '..FFSSSSSSSSSSSSSSSSSSSSFF......',  // 19
        '..FFSSSSSSSSSSSSSSSSSSSFF.......',  // 20
        '...FFJSSSSSSSSSSSSSSSSJFF.......',  // 21
        '....FFSSSSSSSSSSSSSSSSSSFF......',  // 22
        '.....FFSSSSSSSSSSSSSSSFF........',  // 23
        '......FFSSSSSSSSSSSSSSFF........',  // 24
        '........FFFFSSSSSSSFFFF.........',  // 25
        '..........FRRRRRRRF.............',  // 26
        '...........RRRRRRR..............',  // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        F: { name: 'frame', role: 'body' },
        S: { name: 'skin', role: 'head' },
        J: { name: 'jingles', role: 'eye' },
        R: { name: 'ribbon', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 15. CHURCH BELL ─────────────────────────────────────
    {
      id: 'church_bell_32',
      description: 'Large church bell with gold body, steel clapper, steel crown mounting, and thick rim.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '...........CCCCCC...............',  // 3
        '..........CCCCCCCC..............',  // 4
        '.........CCC....CCC.............',  // 5
        '.........CCC....CCC.............',  // 6
        '..........CC....CC..............',  // 7
        '...........BBBB.................',  // 8
        '..........BBBBBB................',  // 9
        '.........BBBBBBBB...............',  // 10
        '.........BBBBBBBB...............',  // 11
        '........BBBBBBBBBB..............',  // 12
        '........BBBBBBBBBB..............',  // 13
        '........BBBBBBBBBB..............',  // 14
        '........BBBBBBBBBB..............',  // 15
        '.......BBBBBBBBBBBB.............',  // 16
        '.......BBBBBBBBBBBB.............',  // 17
        '.......BBBBBBBBBBBB.............',  // 18
        '......BBBBBBBBBBBBBB............',  // 19
        '......BBBBBBBBBBBBBB............',  // 20
        '.....BBBBBBBKKKBBBBBB...........',  // 21
        '.....BBBBBBKKKKKBBBBB...........',  // 22
        '....BBBBBBBKKKKKBBBBBB..........',  // 23
        '....BBBBBBBBBKKKBBBBBBB.........',  // 24
        '...BBBBBBBBBBBKBBBBBBBB.........',  // 25
        '...RRRRRRRRRRRRRRRRRRRRRR.......',  // 26
        '...RRRRRRRRRRRRRRRRRRRRRR.......',  // 27
        '....RRRRRRRRRRRRRRRRRRRR........',  // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        B: { name: 'bell_body', role: 'body' },
        K: { name: 'clapper', role: 'head' },
        C: { name: 'crown', role: 'arm' },
        R: { name: 'rim', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 16. MONOCHORD ───────────────────────────────────────
    {
      id: 'monochord_32',
      description: 'Single-string medieval measurement instrument with wooden body, gold string, steel bridge, and ink markings.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '................................', // 5
        '................................', // 6
        '................................', // 7
        '................................', // 8
        '................................', // 9
        '................................', // 10
        '................................', // 11
        '.EEBBBBBBBBBBBBBBBBBBBBBBBBEE...',  // 12
        '.EBBSSSSSSSSSSSSSSSSSSSSSSBE....',  // 13
        '.EBBMBBBBGBBBMBBBBGBBBBMBBE.....',  // 14
        '.EBBBBBBBBBBBBBBBBBBBBBBBBE.....',  // 15
        '.EBBBBBBBBBBBBBBBBBBBBBBBBE.....',  // 16
        '.EBBBBBBBBBBBBBBBBBBBBBBBBE.....',  // 17
        '.EBBBBBBBBBBBBBBBBBBBBBBBBE.....',  // 18
        '.EBBBBBBBBBBBBBBBBBBBBBBBBE.....',  // 19
        '.EEEEEEEEEEEEEEEEEEEEEEEEEEE....',  // 20
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
        '................................', // 32
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        S: { name: 'string', role: 'head' },
        G: { name: 'bridge', role: 'arm' },
        M: { name: 'markings', role: 'eye' },
        E: { name: 'edge_trim', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 17. HURDY GURDY ─────────────────────────────────────
    {
      id: 'hurdy_gurdy_32',
      description: 'Medieval hurdy-gurdy with boxy wooden body, wheel cover, parchment keys, steel crank, and gold strings.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '................................', // 5
        '.....BBBBBBBBBBBBBBBBB..........',  // 6
        '....BBBBBBBBBBBBBBBBBB..........',  // 7
        '....BBBBBWWWWWBBBBBBBB..........',  // 8
        '....BBBWWWWWWWWWBBBBBBB.........',  // 9
        '....BBBWWWWWWWWWBBBBBBB.........',  // 10
        '....BBBWWWWWWWWWBBBBBBB.........',  // 11
        '....BBBWWWWWWWWWBBBBBBB.........',  // 12
        '....BBBBBWWWWWBBBBBBBB..........',  // 13
        '....BBBSSSSSSSSSBBBBB...........',  // 14
        '....BBBBBBBBBBBBBBBBBB..........',  // 15
        '...BKKBBBBBBBBBBBBBBBBBB........',  // 16
        '...BKKBBBBBBBBBBBBBBBBBB........',  // 17
        '...BKKBBBBBBBBBBBBBBBBBB........',  // 18
        '...BKKBBBBBBBBBBBBBBBBBBC.......',  // 19
        '...BKKBBBBBBBBBBBBBBBBBC........',  // 20
        '....BBBBBBBBBBBBBBBBBCC.........',  // 21
        '....BBBBBBBBBBBBBBBBBC..........',  // 22
        '....BBBBBBBBBBBBBBBBB...........',  // 23
        '.....BBBBBBBBBBBBBBB............',  // 24
        '................................', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        W: { name: 'wheel_cover', role: 'head' },
        K: { name: 'keys', role: 'arm' },
        C: { name: 'crank', role: 'eye' },
        S: { name: 'strings', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 18. PAN FLUTE ───────────────────────────────────────
    {
      id: 'pan_flute_32',
      description: 'Set of graduated pan pipes bound together with gold bindings and dark openings.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '.....PP.PP.PP.PP.PP.PP.PP.......',  // 5
        '.....PP.PP.PP.PP.PP.PP.PP.......',  // 6
        '.....PP.PP.PP.PP.PP.PP.PP.......',  // 7
        '.....PP.PP.PP.PP.PP.PP.PP.......',  // 8
        '.....GGWGGWGGWGGWGGWGGWGG.......',  // 9
        '.....PP.PP.PP.PP.PP.PP.PP.......',  // 10
        '.....PP.PP.PP.PP.PP.PP.PP.......',  // 11
        '.....PP.PP.PP.PP.PP.PP.PP.......',  // 12
        '.....PP.PP.PP.PP.PP.PP..........',  // 13
        '.....PP.PP.PP.PP.PP.PP..........',  // 14
        '.....GGWGGWGGWGGWGGWGG..........',  // 15
        '.....PP.PP.PP.PP.PP.PP..........',  // 16
        '.....PP.PP.PP.PP.PP.............',  // 17
        '.....PP.PP.PP.PP.PP.............',  // 18
        '.....PP.PP.PP.PP................',  // 19
        '.....PP.PP.PP.PP................',  // 20
        '.....GGWGGWGGWGG................',  // 21
        '.....PP.PP.PP...................',  // 22
        '.....PP.PP.PP...................',  // 23
        '.....PP.PP......................',  // 24
        '.....PP.PP......................',  // 25
        '.....PP.........................',  // 26
        '.....PP.........................',  // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        P: { name: 'pipes', role: 'body' },
        G: { name: 'bindings', role: 'head' },
        W: { name: 'openings', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── 19. RECORDER ────────────────────────────────────────
    {
      id: 'recorder_32',
      description: 'Wooden recorder flute instrument with parchment mouthpiece, dark finger holes, and gold rings.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '..............MM................',  // 3
        '..............MM................',  // 4
        '..............MM................',  // 5
        '..............BB................',  // 6
        '..............BB................',  // 7
        '..............BB................',  // 8
        '..............BH................',  // 9
        '..............BB................',  // 10
        '..............BB................',  // 11
        '..............BH................',  // 12
        '..............BB................',  // 13
        '..............GG................',  // 14
        '..............BH................',  // 15
        '..............BB................',  // 16
        '..............BB................',  // 17
        '..............BH................',  // 18
        '..............BB................',  // 19
        '..............GG................',  // 20
        '..............BH................',  // 21
        '..............BB................',  // 22
        '..............BB................',  // 23
        '.............BBB................',  // 24
        '.............BBB................',  // 25
        '............BBBB................',  // 26
        '............BBBB................',  // 27
        '...........BBBBBB...............',  // 28
        '..........BBBBBBB...............',  // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        M: { name: 'mouthpiece', role: 'head' },
        H: { name: 'finger_holes', role: 'arm' },
        G: { name: 'rings', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 20. SHEET MUSIC ─────────────────────────────────────
    {
      id: 'sheet_music_32',
      description: 'Page of medieval musical notation (neumes) on parchment with staff lines, notes, red clef, and gold title.',
      size: 32,
      grid: [
        '................................', // 1
        '................................', // 2
        '...PPPPPPPPPPPPPPPPPPPPPPPP.....',  // 3
        '...PPGGGGGGGGGGGGGGGGGGGGPP.....',  // 4
        '...PPPPPPPPPPPPPPPPPPPPPPPP.....',  // 5
        '...PPLLLLLLLLLLLLLLLLLLLLPP.....',  // 6
        '...PPPPNPPNPPPNPPNPPPNPPPP......',  // 7
        '...PPLLLLLLLLLLLLLLLLLLLLPP.....',  // 8
        '...PPPPPPPPPPPPPPPPPPPPPPPP.....',  // 9
        '...PPLLLLLLLLLLLLLLLLLLLLPP.....',  // 10
        '...PPNPPPNPPNPPPPPNPPNPPPP......',  // 11
        '...PPLLLLLLLLLLLLLLLLLLLLPP.....',  // 12
        '...PPPPPPPPPPPPPPPPPPPPPPPP.....',  // 13
        '...PPLLLLLLLLLLLLLLLLLLLLPP.....',  // 14
        '...PPPPNPPPNPPNPPPPNPPPPPP......',  // 15
        '...PPLLLLLLLLLLLLLLLLLLLLPP.....',  // 16
        '...PPPPPPPPPPPPPPPPPPPPPPPP.....',  // 17
        '...PPCPLLLLLLLLLLLLLLLLLLPP.....',  // 18
        '...PPCPNPPNPPPPNPPNPPPPPP.......',  // 19
        '...PPCPLLLLLLLLLLLLLLLLLLPP.....',  // 20
        '...PPPPPPPPPPPPPPPPPPPPPPPP.....',  // 21
        '...PPLLLLLLLLLLLLLLLLLLLLPP.....',  // 22
        '...PPPPNPPNPPPNPPNPPPNPPPP......',  // 23
        '...PPLLLLLLLLLLLLLLLLLLLLPP.....',  // 24
        '...PPPPPPPPPPPPPPPPPPPPPPPP.....',  // 25
        '...PPLLLLLLLLLLLLLLLLLLLLPP.....',  // 26
        '...PPNPPPPNPPPNPPPPNPPPPPP......',  // 27
        '...PPLLLLLLLLLLLLLLLLLLLLPP.....',  // 28
        '...PPPPPPPPPPPPPPPPPPPPPPPP.....',  // 29
        '................................', // 30
        '................................', // 31
        '................................', // 32
      ],
      chars: {
        P: { name: 'parchment', role: 'body' },
        L: { name: 'staff_lines', role: 'head' },
        N: { name: 'notes', role: 'arm' },
        C: { name: 'clef', role: 'eye' },
        G: { name: 'title', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

  ],
};
export default batch;
