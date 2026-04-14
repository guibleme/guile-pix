/**
 * Super UI/UX Pack — Batch 2: Action/Fighter/Stealth/Rhythm UI (20 templates)
 * Genre coverage: fighting games, beat-em-ups, stealth, rhythm, action games
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'ui',
  exportNames: { templates: 'SUPER_UI_BATCH2_TEMPLATES', schemes: 'SUPER_UI_BATCH2_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════
    // 1. COMBO COUNTER — Hit chain display
    // ═══════════════════════════════════════════════════════════
    {
      id: 'combo_counter_16',
      description: 'Combo hit counter with large number display area and chain spark accent.',
      grid: [
        '................',
        '...HHHHHHHHH....',
        '..HBBBBBBBBHH...',
        '..HBBBBBBBB.H...',
        '..HBBBBBBBB.H...',
        '..HBBBBBBBB.H...',
        '..HBBBBBBBB.H...',
        '..HHHHHHHHHHH...',
        '..HEEEEEEEEH....',
        '..HHHHHHHHHHH...',
        '...........AA...',
        '..........AAAA..',
        '...........AA...',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'frame', role: 'head' },
        B: { name: 'number_display', role: 'body' },
        E: { name: 'label_bar', role: 'eye' },
        A: { name: 'spark_accent', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 2. SPECIAL MOVE METER — empty (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'special_move_empty_16',
      description: 'Special move meter at 0% — fist icon, dark interior, red metal frame.',
      grid: [
        '................',
        '..AAAA..........',
        '.AAAAAA.........',
        '.AAAAAA.........',
        '..AAAA..........',
        '.HHHHHHHHHHHHHH.',
        '.HEBBBBBBBBBBEH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HEBBBBBBBBBBEH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'fist_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_glow', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 3. SPECIAL MOVE METER — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'special_move_full_16',
      description: 'Special move meter at 100% — fist icon, bright yellow fill, red metal frame.',
      grid: [
        '................',
        '..AAAA..........',
        '.AAAAAA.........',
        '.AAAAAA.........',
        '..AAAA..........',
        '.HHHHHHHHHHHHHH.',
        '.HEBBBBBBBBBBEH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HEBBBBBBBBBBEH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'fist_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_glow', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 4. LIVES COUNTER — Heart-based life display
    // ═══════════════════════════════════════════════════════════
    {
      id: 'lives_counter_16',
      description: 'Lives counter with three heart slots and number indicator.',
      grid: [
        '................',
        '................',
        '................',
        '.AA.AA.AA.AA....',
        'AAAAAAAAAAAA....',
        'AAAAAAAAAAAA....',
        '.AAAA.AAAA.A....',
        '..AA...AA.......',
        '................',
        '.HHHHHHHHHH.....',
        '.HBBBBBBBBH.....',
        '.HBBBBBBBBH.....',
        '.HHHHHHHHHH.....',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'hearts', role: 'accessory' },
        H: { name: 'counter_frame', role: 'head' },
        B: { name: 'number_area', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 5. POWER UP TIMER — Timed buff countdown
    // ═══════════════════════════════════════════════════════════
    {
      id: 'power_up_timer_16',
      description: 'Power-up timer with star icon and circular countdown ring.',
      grid: [
        '................',
        '....HHHHHH......',
        '...HBBBBBBH.....',
        '..HBBBBBBBBH....',
        '..HBBB..BBBH....',
        '.HBBBB..BBBBH...',
        '.HBBBBBBBBBBH...',
        '.HBBBBBBBBBBH...',
        '.HBBBBBBBBBBH...',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '...HBBBBBBH.....',
        '....HHHHHH......',
        '......AAA.......',
        '.....AAAAA......',
        '......AAA.......',
      ],
      chars: {
        H: { name: 'timer_ring', role: 'head' },
        B: { name: 'timer_fill', role: 'body' },
        A: { name: 'buff_icon', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 6. CHECKPOINT FLAG — Save point marker
    // ═══════════════════════════════════════════════════════════
    {
      id: 'checkpoint_flag_16',
      description: 'Checkpoint flag icon with triangular pennant and pole.',
      grid: [
        '................',
        '.AAAAAAA.E......',
        '.AAAAAAA.E......',
        '.AAABBBA.E......',
        '.AAABBBA.E......',
        '.AAAAAAA.E......',
        '.AAAAAAA.E......',
        '.........E......',
        '.........E......',
        '.........E......',
        '.........E......',
        '.........E......',
        '.........E......',
        '........HHH.....',
        '.......HHHHH....',
        '................',
      ],
      chars: {
        A: { name: 'flag_cloth', role: 'accessory' },
        B: { name: 'flag_emblem', role: 'body' },
        E: { name: 'pole', role: 'eye' },
        H: { name: 'base', role: 'head' },
      },
      colors: {
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 7. KO TEXT BANNER — Knockout announcement
    // ═══════════════════════════════════════════════════════════
    {
      id: 'ko_text_banner_16',
      description: 'KO knockout text banner with explosive star burst background.',
      grid: [
        '...........A....',
        '....A......A....',
        '....A.....A.....',
        '.....HHHHH......',
        'A...HBBBBHH.....',
        'AA.HBBBBBB.H..AA',
        '.AAHBBBBBB.HAA..',
        '..AHBBBBBB.HA...',
        '..AHBBBBBB.HA...',
        '.AAHBBBBBB.HAA..',
        'AA.HBBBBBB.H..AA',
        'A...HBBBBHH.....',
        '.....HHHHH......',
        '....A.....A.....',
        '....A......A....',
        '...........A....',
      ],
      chars: {
        H: { name: 'text_border', role: 'head' },
        B: { name: 'text_fill', role: 'body' },
        A: { name: 'burst_rays', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 8. ROUND COUNTER — Fight round indicator
    // ═══════════════════════════════════════════════════════════
    {
      id: 'round_counter_16',
      description: 'Round counter with large central number and side win-pip indicators.',
      grid: [
        '................',
        '................',
        '..HHHHHHHHHH....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HHHHHHHHHH....',
        '................',
        '..AA.EE.AA.EE...',
        '..AA.EE.AA.EE...',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'frame', role: 'head' },
        B: { name: 'number_bg', role: 'body' },
        A: { name: 'win_pip_on', role: 'accessory' },
        E: { name: 'win_pip_off', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 9. SUPER METER — empty (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'super_meter_empty_16',
      description: 'Super/ultimate meter at 0% — lightning bolt icon, dark interior, chrome frame.',
      grid: [
        '................',
        '...AA...........',
        '..AA............',
        '.AAAA...........',
        '...AA...........',
        '.HHHHHHHHHHHHHH.',
        '.HEBBBBBBBBBBEH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HEBBBBBBBBBBEH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'bolt_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_glow', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 10. SUPER METER — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'super_meter_full_16',
      description: 'Super/ultimate meter at 100% — lightning bolt icon, bright purple fill, chrome frame.',
      grid: [
        '................',
        '...AA...........',
        '..AA............',
        '.AAAA...........',
        '...AA...........',
        '.HHHHHHHHHHHHHH.',
        '.HEBBBBBBBBBBEH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HEBBBBBBBBBBEH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'bolt_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_glow', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 11. VS SCREEN FRAME — Versus battle splash
    // ═══════════════════════════════════════════════════════════
    {
      id: 'vs_screen_frame_16',
      description: 'VS battle badge — blue and red halves split by bright diagonal divider.',
      grid: [
        '................',
        '..HHHHHHHHHHHH..',
        '..HBBBBBAAAAAH..',
        '..HBBBBEEAAAAH..',
        '..HBBBEEEEAAAH..',
        '..HBBEEEEEEAAH..',
        '..HBBBEEEEAAAH..',
        '..HBBBBEEAAAAH..',
        '..HBBBBBAAAAAH..',
        '..HHHHHHHHHHHH..',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'left_bg', role: 'body' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'vs_divider', role: 'eye' },
        A: { name: 'right_bg', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 12. CHARACTER SELECT FRAME — Roster pick box
    // ═══════════════════════════════════════════════════════════
    {
      id: 'character_select_frame_16',
      description: 'Character select screen roster box with portrait area and selection highlight.',
      grid: [
        'AAAAAAAAAAAAAAAA',
        'AHHHHHHHHHHHHHHA',
        'AHBBBBBBBBBBBBHA',
        'AHBBBBBBBBBBBBHA',
        'AHBBBBBBBBBBBBHA',
        'AHBBBBBBBBBBBBHA',
        'AHBBBBBBBBBBBBHA',
        'AHBBBBBBBBBBBBHA',
        'AHBBBBBBBBBBBBHA',
        'AHBBBBBBBBBBBBHA',
        'AHBBBBBBBBBBBBHA',
        'AHBBBBBBBBBBBBHA',
        'AHHHHHHHHHHHHHHA',
        'AHEEEEEEEEEEEEHA',
        'AHHHHHHHHHHHHHHA',
        'AAAAAAAAAAAAAAAA',
      ],
      chars: {
        A: { name: 'selection_glow', role: 'accessory' },
        H: { name: 'slot_frame', role: 'head' },
        B: { name: 'portrait_bg', role: 'body' },
        E: { name: 'name_label', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 13. DETECTION METER — Stealth eye gauge
    // ═══════════════════════════════════════════════════════════
    {
      id: 'detection_meter_16',
      description: 'Stealth detection meter with eye icon and graduated threat fill.',
      grid: [
        '................',
        '..HHHHHHHH......',
        '.HBBBBBBBHH.....',
        'HBBAAAAAAB.H....',
        'HBAAAEAAAB.H....',
        'HBBAAAAAAB.H....',
        '.HBBBBBBBHH.....',
        '..HHHHHHHH......',
        '................',
        'HHHHHHHHHHHHHHHH',
        'HFBBBBBBBBBBBBFH',
        'HBBBBBBBBBBBBBBH',
        'HFBBBBBBBBBBBBFH',
        'HHHHHHHHHHHHHHHH',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'frame', role: 'head' },
        B: { name: 'eye_white', role: 'body' },
        A: { name: 'iris', role: 'arm' },
        E: { name: 'pupil', role: 'eye' },
        F: { name: 'frame_tick', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 14. ALERT ICON — Stealth alarm state
    // ═══════════════════════════════════════════════════════════
    {
      id: 'alert_icon_16',
      description: 'Alert/alarm exclamation icon with triangular warning shape.',
      grid: [
        '................',
        '.......HH.......',
        '......HHHH......',
        '.....HH..HH.....',
        '....HH.BB.HH....',
        '....H..BB..H....',
        '...HH..BB..HH...',
        '...H...BB...H...',
        '..HH...BB...HH..',
        '..H....BB....H..',
        '.HH..........HH.',
        '.H.....AA.....H.',
        'HH.....AA.....HH',
        'HHHHHHHHHHHHHHHH',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'triangle_border', role: 'head' },
        B: { name: 'exclamation_mark', role: 'body' },
        A: { name: 'exclamation_dot', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 15. NOISE RADIUS — Sound detection ring
    // ═══════════════════════════════════════════════════════════
    {
      id: 'noise_radius_16',
      description: 'Noise/sound radius indicator with concentric rings expanding outward.',
      grid: [
        '................',
        '.....AAAAAA.....',
        '...AA......AA...',
        '..A..BBBBBB..A..',
        '.A..B......B..A.',
        '.A.B..HHHH..B.A.',
        'A..B.H....H.B..A',
        'A..B.H.EE.H.B..A',
        'A..B.H.EE.H.B..A',
        'A..B.H....H.B..A',
        '.A.B..HHHH..B.A.',
        '.A..B......B..A.',
        '..A..BBBBBB..A..',
        '...AA......AA...',
        '.....AAAAAA.....',
        '................',
      ],
      chars: {
        A: { name: 'outer_ring', role: 'accessory' },
        B: { name: 'mid_ring', role: 'body' },
        H: { name: 'inner_ring', role: 'head' },
        E: { name: 'source_dot', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        head:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 16. ENEMY AWARENESS EYE — Suspicion state icon
    // ═══════════════════════════════════════════════════════════
    {
      id: 'enemy_awareness_eye_16',
      description: 'Suspicion state eye icon — partially open eye for stealth awareness display.',
      grid: [
        '................',
        '................',
        '................',
        '....HHHHHH......',
        '..HHBBBBBBHH....',
        '.HBBBBBBBBBH....',
        'HBBBAAEAABBBH...',
        'HBBBAAEEAABBBH..',
        'HBBBAAEAABBBH...',
        '.HBBBBBBBBBH....',
        '..HHBBBBBBHH....',
        '....HHHHHH......',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'eyelid', role: 'head' },
        B: { name: 'eye_white', role: 'body' },
        A: { name: 'iris', role: 'arm' },
        E: { name: 'pupil', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 17. NOTE HIGHWAY BAR — Rhythm game lane
    // ═══════════════════════════════════════════════════════════
    {
      id: 'note_highway_bar_16',
      description: 'Rhythm game note highway with colored lane markers and hit zone.',
      grid: [
        'HB..HB..HB..HB..',
        'HB..HB..HB..HB..',
        'HB..HB..HB..HB..',
        'HB..HB..HB..HB..',
        'HB..HB..HB..HB..',
        'HB..HB..HB..HB..',
        'HB..HB..HB..HB..',
        'HB..HB..HB..HB..',
        'HB..HB..HB..HB..',
        'HB..HB..HB..HB..',
        'HB..HB..HB..HB..',
        'AAAAAAAAAAAAAAAA',
        'AEEEAEEEAEEEAEEE',
        'AAAAAAAAAAAAAAAA',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'lane_divider', role: 'head' },
        B: { name: 'lane_fill', role: 'body' },
        A: { name: 'hit_zone', role: 'accessory' },
        E: { name: 'hit_buttons', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 18. ACCURACY RING — Hit precision display
    // ═══════════════════════════════════════════════════════════
    {
      id: 'accuracy_ring_16',
      description: 'Accuracy/precision display ring with concentric target circles.',
      grid: [
        '................',
        '.....HHHH.......',
        '...HHBBBBHH.....',
        '..HBBBBBBBBH....',
        '..HBB.EE.BBH....',
        '.HBBB.EE.BBBH...',
        '.HBB.EAAE.BBH...',
        '.HBB.EAAE.BBH...',
        '.HBBB.EE.BBBH...',
        '..HBB.EE.BBH....',
        '..HBBBBBBBBH....',
        '...HHBBBBHH.....',
        '.....HHHH.......',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'outer_ring', role: 'head' },
        B: { name: 'mid_zone', role: 'body' },
        E: { name: 'inner_zone', role: 'eye' },
        A: { name: 'bullseye', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 19. STREAK COUNTER — Consecutive success chain
    // ═══════════════════════════════════════════════════════════
    {
      id: 'streak_counter_16',
      description: 'Streak counter with flame accent and multiplier number area.',
      grid: [
        '................',
        '.......A........',
        '......AAA.......',
        '.....AAAAA......',
        '....AAABBAA.....',
        '.....AABBA......',
        '......ABB.......',
        '................',
        '.HHHHHHHHHHHHHH.',
        '.HEEEEEEEEEEEEH.',
        '.HEEEEEEEEEEEEH.',
        '.HEEEEEEEEEEEEH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'flame_outer', role: 'accessory' },
        B: { name: 'flame_core', role: 'body' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'number_bg', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 20. DODGE INDICATOR — Evasion prompt icon
    // ═══════════════════════════════════════════════════════════
    {
      id: 'dodge_indicator_16',
      description: 'Dodge/evade indicator with directional arrow and action ring.',
      grid: [
        '................',
        '.....HHHH.......',
        '...HHBBBBHH.....',
        '..HBBBBBBBBH....',
        '..HBB.AA.BBH....',
        '.HBBB.AA.BBBH...',
        '.HBBAAAAAAABH...',
        '.HBBAAAAAAABH...',
        '.HBBB.AA.BBBH...',
        '..HBB.AA.BBH....',
        '..HBBBBBBBBH....',
        '...HHBBBBHH.....',
        '.....HHHH.......',
        '......EE........',
        '......EE........',
        '................',
      ],
      chars: {
        H: { name: 'ring_frame', role: 'head' },
        B: { name: 'ring_fill', role: 'body' },
        A: { name: 'arrow', role: 'accessory' },
        E: { name: 'trigger_hint', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        body:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

  ],
};

export default batch;
