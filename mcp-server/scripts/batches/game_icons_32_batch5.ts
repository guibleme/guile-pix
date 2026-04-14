/**
 * Game Icons 32x32 — Batch 5: System & Navigation Icons (20 templates).
 * Functional UI icons for game menus, inventory, and system screens.
 *
 * ASCII grid format — exactly 32 rows x 32 chars each.
 * '.' = transparent, letters = colored pixels.
 * DB16 palette only, 4-5 roles per template, colored selout.
 * Light from top-left, shadows bottom-right.
 * No orphan pixels — every pixel has orthogonal neighbor of same role.
 * Minimum 2px wide for structural lines.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'game_icons_32',
  exportNames: { templates: 'GAME_ICONS_32_BATCH5_TEMPLATES', schemes: 'GAME_ICONS_32_BATCH5_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════════
    //  1. GEAR SETTINGS — cog wheel with 8 teeth and center bore
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'gear_settings_icon_32',
      description: 'Metallic cog wheel with 8 evenly-spaced teeth around a central bore hole.',
      size: 32,
      //        01234567890123456789012345678901
      grid: [

        '................................', // 0
        '................................', // 1
        '..............BBBB..............', // 2
        '..............BBBB..............', // 3
        '..............BBBB..............', // 4
        '........HHBBBBBBBBBBBBB.........', // 5
        '.......HHBBBBBBBBBBBBBBBB.......', // 6
        '.BBB..HHBBBBBBBBBBBBBBBBBB......',
        '.BBB..HBBBBBBBBBBBBBBBBBBBB.BBB.',
        '.BBB..HBBBBBBBBBBBBBBBBBBB..BBB.',
        '.BBB.HBBBBBBB......BBBBBBB.BBB..',
        '......HBBBBBB........BBBBBBb....',
        '......HBBBBB..........BBBBBb....',
        '......HBBBBB..........BBBBBb....',
        '......HBBBBBB........BBBBBBb....',
        '......HBBBBBBB......BBBBBBBb....',
        '......BBBBBBBBBBBBBBBBBBBBBB....',
        '.BBB..BBBBBBBBBBBBBBBBBBBB..BBB.',
        '.BBB..BBBBBBBBBBBBBBBBBBBb..BBB.',
        '.BBB...BBBBBBBBBBBBBBBBbb..BBB..',
        '.......BBBBBBBBBBBBBBBBbb.......',
        '........BBBBBBBBBBBBBBbb........',
        '..........BBBBBBBBBBbb..........',
        '..............BBBBbb............',
        '..............BBBBbb............',
        '..............BBBBbb............',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        B: { name: 'gear_body', role: 'body' },
        H: { name: 'gear_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'gear_shadow', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  2. SAVE — floppy disk with label and slider
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'save_icon_32',
      description: 'Classic 3.5-inch floppy disk with metal slider notch and cream label area.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '......HHBBBBBBBBBBBBBBBB........', // 3
        '......HHBBBTTTTTTTBBBBBB........', // 4
        '......HHBBBTTTTTTTBBBBBB........', // 5
        '......HBBBBTTTMMTTBBBBBB........', // 6
        '......HBBBBTTTMMTTBBBBBBB.......',
        '......HBBBBTTTTTTTBBBBBBB.......',
        '......HBBBBTTTTTTTBBBBBBB.......',
        '......HBBBBBBBBBBBBBBBBBb.......',
        '......HBBBBBBBBBBBBBBBBBb.......',
        '......HBBBBBBBBBBBBBBBBBb.......',
        '......HBBBBBBBBBBBBBBBBBb.......',
        '......HBBBBBBBBBBBBBBBBBb.......',
        '......HBBBBBBBBBBBBBBBBBb.......',
        '......HBBBBBBBBBBBBBBBBBb.......',
        '......HBBBBBBBBBBBBBBBBBb.......',
        '......HBBLLLLLLLLLLLLBBb........',
        '......HBBLLLLLLLLLLLLBBb........',
        '......HBBLLllllllllLLBBb........',
        '......HBBLLLLLLLLLLLLBBb........',
        '......HBBLLllllllllLLBBb........',
        '......HBBLLLLLLLLLLLLBBb........',
        '......HBBLLllllllLLLLBBb........',
        '......HBBLLLLLLLLLLLLBBb........',
        '......BBBBBBBBBBBBBBBBBbb.......',
        '......BBBBBBBBBBBBBBBBBbb.......',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        B: { name: 'disk_body', role: 'body' },
        H: { name: 'disk_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'disk_shadow', role: 'body', tone: 'shadow' },
        T: { name: 'slider_area', role: 'head' },
        M: { name: 'slider_metal', role: 'accessory' },
        L: { name: 'label_area', role: 'belt' },
        l: { name: 'label_text', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        leg:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  3. LOAD — folder with upward arrow
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'load_icon_32',
      description: 'Open file folder with upward green arrow indicating load/import action.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '......HHHHHHHH..................', // 5
        '......HHHHHHHH..................', // 6
        '......HHFFFFFFFFFFFFFFFFFFFF....', // 7
        '......HFFFFFFFFFFFFFFFFFFFFFb...', // 8
        '......HFFFFF...AAAA...FFFFFb....',
        '......HFFFF...AAAAAA...FFFFb....',
        '......HFFF...AAAAAAAA...FFFb....',
        '......HFF...AAAAAAAAAA...FFb....',
        '......HFF.....AAAAAA.....FFb....',
        '......HFFFFFF.AAAAAA.FFFFFFb....',
        '......HFFFFFF.AAAAAA.FFFFFFb....',
        '......HFFFFFF.AAAAAA.FFFFFFb....',
        '......HFFFFFF.AAAAAA.FFFFFFb....',
        '......HFFFFFF.AAAAAA.FFFFFFb....',
        '......HFFFFFF.AAAAAA.FFFFFFb....',
        '......HFFFFFF.AAAAAA.FFFFFFb....',
        '......HFFFFFFFFFFFFFFFFFFFFFb...', // 21
        '......HFFFFFFFFFFFFFFFFFFFFFb...', // 22
        '......FFFFFFFFFFFFFFFFFFFFFFb...', // 23
        '......FFFFFFFFFFFFFFFFFFFFFbb...', // 24
        '.......bbbbbbbbbbbbbbbbbbbbb....', // 25
        '................................', // 26
        '................................', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        F: { name: 'folder_body', role: 'body' },
        H: { name: 'folder_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'folder_shadow', role: 'body', tone: 'shadow' },
        A: { name: 'arrow', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  4. VOLUME ON — speaker with sound wave arcs
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'volume_on_icon_32',
      description: 'Speaker cone facing right with two curved sound wave arcs emanating outward.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '................................', // 5
        '................................', // 6
        '............BB..........WW......', // 7
        '...........BBB......WW..WW......',
        '..........BBBB....WW....WW......',
        '.........BBBBB..WW...WW..WW.....',
        '......HHBBBBBB..WW..WW....WW....',
        '......HHBBBBBB.WW..WW.....WW....',
        '......HHBBBBBB.....WW......WW...',
        '......HHBBBBBB.....WW......WW...',
        '......BBBBBBBB.....WW......WW...',
        '......BBBBBBBb.....WW......WW...',
        '......BBBBBBBb.....WW......WW...',
        '......BBBBBBBb.WW..WW.....WW....',
        '......bbBBBBBb..WW..WW....WW....',
        '.........BBBbb..WW...WW..WW.....',
        '..........BBbb....WW....WW......',
        '...........Bbb......WW..WW......',
        '............bb..........WW......',
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
        B: { name: 'speaker_body', role: 'body' },
        H: { name: 'speaker_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'speaker_shadow', role: 'body', tone: 'shadow' },
        W: { name: 'sound_waves', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  5. VOLUME OFF — speaker with X mark
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'volume_off_icon_32',
      description: 'Speaker cone facing right with a red X overlaid indicating muted audio.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '................................', // 5
        '................................', // 6
        '............BB....XX....XX......', // 7
        '...........BBB....XX...XX.......',
        '..........BBBB.....XX.XX........',
        '.........BBBBB......XXX.........',
        '......HHBBBBBB......XXX.........',
        '......HHBBBBBB.....XX.XX........',
        '......HHBBBBBB....XX...XX.......',
        '......HHBBBBBB...XX.....XX......',
        '......BBBBBBBB...XX.....XX......',
        '......BBBBBBBb..................', // 16
        '......BBBBBBBb..................', // 17
        '......BBBBBBBb..................', // 18
        '......bbBBBBBb..................', // 19
        '.........BBBbb..................', // 20
        '..........BBbb..................', // 21
        '...........Bbb..................', // 22
        '............bb..................', // 23
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
        B: { name: 'speaker_body', role: 'body' },
        H: { name: 'speaker_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'speaker_shadow', role: 'body', tone: 'shadow' },
        X: { name: 'mute_x', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  6. BRIGHTNESS — sun with 8 rays
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'brightness_icon_32',
      description: 'Golden sun disc with eight radiating rays for brightness/gamma control.',
      size: 32,
      grid: [

        '................................', // 0
        '..............RR................', // 1
        '..............RR................', // 2
        '..............RR................', // 3
        '.......RR.....RR.....RR.........', // 4
        '........RR............RR........', // 5
        '.........RR..........RR.........', // 6
        '..........RHHHHHHHRR............',
        '..........HHBBBBBBBB............',
        '..........HBBBBBBBBBB...........',
        '...RRR...HBBBBBBBBBBBB...RRR....',
        '...RRR...HBBBBBBBBBBBBB..RRR....',
        '...RRR...HBBBBBBBBBBBBB..RRR....',
        '..........HBBBBBBBBBBBBB........',
        '..........HBBBBBBBBBBBB.........',
        '...........BBBBBBBBBBbb.........',
        '...........BBBBBBBBBbbb.........',
        '..........RR.BBBBBbb..RR........',
        '.........RR...bbbbb....RR.......',
        '........RR..............RR......',
        '.......RR.....RR.....RR.........', // 20
        '..............RR................', // 21
        '..............RR................', // 22
        '..............RR................', // 23
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
        B: { name: 'sun_body', role: 'body' },
        H: { name: 'sun_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'sun_shadow', role: 'body', tone: 'shadow' },
        R: { name: 'sun_rays', role: 'head' },
      },
      colors: {
        body: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  7. EXIT DOOR — open door with arrow pointing out
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'exit_door_icon_32',
      description: 'Wooden door slightly ajar in stone frame with green exit arrow pointing right.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '.....FFFFFFFFFFFFFFFFFFF........', // 2
        '.....FFFFFFFFFFFFFFFFFFF........', // 3
        '.....FFHHDDDDDDDDDDDDFF.........', // 4
        '.....FFHHDDDDDDDDDDDDFF.........', // 5
        '.....FFHHDDDDDDDDDDDDFF.........', // 6
        '.....FFHHDDDDDDDDDDDDFF.........', // 7
        '.....FFHHDDDDDDDDDDDDFF.........', // 8
        '.....FFHHDDDDDDDDDDDDFF.........', // 9
        '.....FFHHDDDDDDDDDDDDFF..AA.....', // 10
        '.....FFHHDDDDDDDDDDDDFF..AA.....', // 11
        '.....FFHHDDDDDMMDDDDFF..AAAA....', // 12
        '.....FFHHDDDDDMMDDDDFF..AAAA....',
        '.....FFHHDDDDDDDDDbDFFAAAAAAA...',
        '.....FFHHDDDDDDDDDFFAAAAAAAAA...',
        '.....FFHHDDDDDDDDbbFFAAAAAAA....',
        '.....FFHHDDDDDDDDDFF..AAAA......',
        '.....FFHHDDDDDDDDDDFF..AAAA.....',
        '.....FFHHDDDDDDDDDDFF...AA......',
        '.....FFHHDDDDDDDDDDFF...AA......',
        '.....FFHHDDDDDDDDDDFF...........',
        '.....FFHHDDDDDDDDDDFF...........',
        '.....FFHHDDDDDDDDDDbFF..........',
        '.....FFHHDDDDDDDDDDbFF..........',
        '.....FFHHDDDDDDDDDbbFF..........',
        '.....FFHHDDDDDDDDbbFF...........',
        '.....FFFFFFFFFFFFFFFFFFF........',
        '.....FFFFFFFFFFFFFFFFFFF........',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        F: { name: 'door_frame', role: 'head' },
        D: { name: 'door_panel', role: 'body' },
        H: { name: 'door_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'door_shadow', role: 'body', tone: 'shadow' },
        M: { name: 'door_knob', role: 'accessory' },
        A: { name: 'exit_arrow', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  8. STAIRS UP — ascending steps with up arrow
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'stairs_up_icon_32',
      description: 'Three ascending stone steps with an upward green arrow.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '.....................AA.........',
        '.....................AA.........',
        '....................AAAA........',
        '...................AAAAAA.......',
        '................HHHHAAHHHH......',
        '................HBBBAABBBB......',
        '................HBBBAABBBB......',
        '................HBBBAABBbB......',
        '................HBBBAABBbb......',
        '.........HHHHHHHBBBBAAHHHHHHH...',
        '.........HBBBBBBBBBBAABBBBBBH...',
        '.........HBBBBBBBBBBAABBBBBBH...',
        '.........HBBBBBBBBBbAABBBBbbH...',
        '.........HBBBBBBBBBbAABBBBbbH...',
        '..HHHHHHHHHBBBBBBBBBBBBBBBBBH...',
        '..HBBBBBBBBBBBBBBBBBBBBBBBBBH...',
        '..HBBBBBBBBBBBBBBBBBBBBBBBBBH...',
        '..HBBBBBBBBBBBBBBBBBBBBBBbbH....',
        '..HBBBBBBBBBBBBBBBBBBBBBBbbH....',
        '..HHHHHHHHHHHHHHHHHHHHHHHHHH....',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        B: { name: 'step_body', role: 'body' },
        H: { name: 'step_edge', role: 'head' },
        b: { name: 'step_shadow', role: 'body', tone: 'shadow' },
        A: { name: 'up_arrow', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  9. STAIRS DOWN — descending steps with down arrow
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'stairs_down_icon_32',
      description: 'Three descending stone steps with a downward red arrow.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '................................', // 5
        '................................', // 6
        '................................', // 7
        '................................', // 8
        '..HHHHHHHHHHHHHHHHHHHHHHHHHH....', // 9
        '..HBBBBBBBBBBBBBBBBBBBBBBBBBH...', // 10
        '..HBBBBBBBBBBBBBBBBBBBBBBBBBH...', // 11
        '..HBBBBBBBBBBBBBBBBBBBBBBbbH....', // 12
        '..HBBBBBBBBBBBBBBBBBBBBBBbbH....', // 13
        '.........HHHHHHHHBBBAAABBBBBH...', // 14
        '.........HBBBBBBBBBBAAABBBBHH...', // 15
        '.........HBBBBBBBBBbAAABBBbH....',
        '.........HBBBBBBBBBbAAABBBbH....',
        '................HHHHAAABBBHH....',
        '................HBBBAAABBbH.....',
        '................HBBBAAABBbH.....',
        '................HBBBAAABbbH.....',
        '................HBBBAABBbbH.....',
        '...................AAAAAA.......',
        '....................AAAA........',
        '.....................AA.........',
        '.....................AA.........',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        B: { name: 'step_body', role: 'body' },
        H: { name: 'step_edge', role: 'head' },
        b: { name: 'step_shadow', role: 'body', tone: 'shadow' },
        A: { name: 'down_arrow', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d2aa99' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  10. CHEST — treasure chest slightly open with gold glow
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'chest_icon_32',
      description: 'Wooden treasure chest with arched lid slightly open, metal bands, gold glow.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '.........BBBBBBBBBBBBBB.........', // 5
        '........HHBBBBBBBBBBBBBB........',
        '.......HHBBBBMMBBBBBBBBBB.......',
        '......HHBBBBBMMBBBBBBBBBBBB.....',
        '......HHBBBBBMMBBBBBBBBBBBBB....',
        '......HHBBBBBMMBBBBBBBBBBbbb....',
        '......GGGGGGGGGGGGGGGGGGGGGG....',
        '......GGGGGGGGGGGGGGGGGGGGGG....',
        '......TTHHDDDDMMDDDDDDDDTT......',
        '......TTHHDDDDMMDDDDDDDDTT......',
        '......TTHHDDDDDMMDDDDDDbbTT.....',
        '......TTHHDDDDDEEDDDDDDTT.......',
        '......TTHHDDDDDEEDDDDDDTT.......',
        '......TTHHDDDDDMMDDDDDDbbTT.....',
        '......TTDDDDDDDMMDDDDDDbbTT.....',
        '......TTDDDDDDDMMDDDDDDbbTT.....',
        '......TTDDDDDDDMMDDDDDDDTT.....',
        '......TTDDDDDDDDDDDDDDDDTT.....',
        '......TTDDDDDDDDDDDDDDDDTT.....',
        '......TTTTTTTTTTTTTTTTTTTTTT....',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        D: { name: 'wood_body', role: 'body' },
        H: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        B: { name: 'lid_wood', role: 'body' },
        T: { name: 'metal_bands', role: 'head' },
        M: { name: 'metal_clasp', role: 'accessory' },
        G: { name: 'gold_glow', role: 'belt' },
        E: { name: 'keyhole', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  11. LOCKED CHEST — closed chest with padlock
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'locked_chest_icon_32',
      description: 'Wooden treasure chest locked shut with prominent metal padlock.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '.........BBBBBBBBBBBBBB.........', // 4
        '........HHBBBBBBBBBBBBBB........',
        '.......HHBBBBMMBBBBBBBBBB.......',
        '......HHBBBBBMMBBBBBBBBBBBB.....',
        '......HHBBBBBMMBBBBBBBBBBBBB....',
        '......HHBBBBBMMBBBBBBBBBBbbb....',
        '......TTTTTTTTTTTTTTTTTTTTTT....',
        '......TTHHDDDDMMDDDDDDDDDTT.....',
        '......TTHHDDDDMMDDDDDDDDDTT.....',
        '......TTHHDDDDDMMDDDDDDDbbTT....',
        '......TTHHDDDLLLLDDDDDDbbTT.....',
        '......TTHHDDLLLLLLLLDDDDTT......',
        '......TTHHDDLLLLLLLLDDbbTT......',
        '......TTHHDDLLEELLLLDDbbTT......',
        '......TTHHDDLLEELLLLDDbbTT......',
        '......TTDDDDLLLLLLLLDDbbTT......',
        '......TTDDDDDDDDDDDDDDbbTT......',
        '......TTDDDDDDDDDDDDDDbbTT......',
        '......TTDDDDDDDDDDDDDDDDTT......',
        '......TTTTTTTTTTTTTTTTTTTTTT....',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        D: { name: 'wood_body', role: 'body' },
        H: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        B: { name: 'lid_wood', role: 'body' },
        T: { name: 'metal_bands', role: 'head' },
        M: { name: 'center_clasp', role: 'head' },
        L: { name: 'padlock', role: 'accessory' },
        E: { name: 'keyhole', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#757161', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  12. WAYPOINT — map pin marker (inverted teardrop)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'waypoint_icon_32',
      description: 'Map waypoint pin with red teardrop head and pointed bottom spike.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '...........HHHHHHHH.............', // 3
        '..........HHBBBBBBBB............',
        '.........HHBBBBBBBBBBB..........',
        '........HHBBBBBBBBBBBBBB........',
        '........HHBBBBEEBBBBBBB.........',
        '........HHBBBBEEBBBBBBBB........',
        '........HHBBBBEEBBBBBBBBB.......',
        '........HHBBBBEEBBBBBBBB........',
        '........HHBBBBBBBBBBBBBB........',
        '.........HHBBBBBBBBBBB..........',
        '.........HHBBBBBBBBBbb..........',
        '..........HHBBBBBBBbb...........',
        '...........HHBBBBBbb............',
        '............HBBBBbb.............',
        '.............BBBbb..............',
        '..............BBb...............', // 18
        '..............PP................',
        '..............PP................',
        '..............PP................',
        '..............PP................',
        '..............PP................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        B: { name: 'pin_head', role: 'body' },
        H: { name: 'pin_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'pin_shadow', role: 'body', tone: 'shadow' },
        E: { name: 'center_dot', role: 'accessory' },
        P: { name: 'pin_spike', role: 'head' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d2aa99' },
        accessory: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  13. MAGNIFY — magnifying glass with handle
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'magnify_icon_32',
      description: 'Magnifying glass with glass lens, metallic rim, and wooden handle.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '.........RRRRRRRRRR.............', // 3
        '........RRHHHHHHHHRR............',
        '.......RRHHLLLLLLLHRR...........',
        '......RRHLLLLLLLLLLLRR..........',
        '......RHLLLGGLLLLLLLRR..........',
        '......RHLLGGLLLLLLLLRR..........',
        '......RHLLLLLLLLLLLLRR..........',
        '......RHLLLLLLLLLLLRR...........',
        '.......RRLLLLLLLLLRR............',
        '........RRLLLLLLLRR.............',
        '.........RRRRRRRRRR.............',
        '...............RRRBB............',
        '................RBBBB...........',
        '.................BBBBB..........',
        '..................BBBBb.........',
        '...................BBBbb........',
        '....................BBbb........',
        '.....................bbb........',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        L: { name: 'glass_lens', role: 'head' },
        G: { name: 'glass_glare', role: 'head', tone: 'highlight' },
        H: { name: 'rim_highlight', role: 'accessory', tone: 'highlight' },
        R: { name: 'metal_rim', role: 'accessory' },
        B: { name: 'handle', role: 'body' },
        b: { name: 'handle_shadow', role: 'body', tone: 'shadow' },
      },
      colors: {
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  14. FILTER — funnel shape tapering to narrow spout
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'filter_icon_32',
      description: 'Metallic funnel wide at the top tapering to a narrow spout at the bottom.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '.....HHHHHHHHHHHHHHHHHHHHH......', // 3
        '.....HBBBBBBBBBBBBBBBBBBBb......',
        '.....HBBBBBBBBBBBBBBBBBBbb......',
        '......HBBBBBBBBBBBBBBBBbb.......',
        '.......HBBBBBBBBBBBBBBbb........',
        '........HBBBBBBBBBBBBbb.........',
        '.........HBBBBBBBBBBbb..........',
        '..........HBBBBBBBBbb...........',
        '...........HBBBBBBbb............',
        '............HBBBBbb.............',
        '.............HBBBb..............',
        '.............HBBBb..............',
        '.............HBBBb..............',
        '.............HBBBb..............',
        '.............HBBBb..............',
        '.............HBBBb..............',
        '.............HBBBb..............',
        '.............HBBBb..............',
        '.............HBBBb..............',
        '.............HBBBb..............',
        '.............HBBBb..............',
        '.............HBBBb..............',
        '..............BBbb..............',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        B: { name: 'funnel_body', role: 'body' },
        H: { name: 'funnel_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'funnel_shadow', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  15. SORT — three lines with up/down arrows
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'sort_icon_32',
      description: 'Three horizontal lines of decreasing width with up/down arrows on the right.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '................................', // 5
        '.......................AA.......',
        '.......................AA.......',
        '......................AAAA......',
        '.....................AAAAAA.....',
        '................................',
        '..LLLLLLLLLLLLLLLLLL............',
        '..LLLLLLLLLLLLLLLLLL............',
        '................................',
        '................................',
        '..LLLLLLLLLLLLLL................',
        '..LLLLLLLLLLLLLL................',
        '................................',
        '................................',
        '..LLLLLLLLLL....................',
        '..LLLLLLLLLL....................',
        '................................',
        '.....................AAAAAA.....',
        '......................AAAA......',
        '.......................AA.......',
        '.......................AA.......',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        L: { name: 'sort_lines', role: 'body' },
        A: { name: 'arrows', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  16. TRASH — trash can with lid and ribs
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'trash_icon_32',
      description: 'Metal trash can with wider lid, handle, and vertical rib lines on body.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '...............LLLL.............',
        '...............LLLL.............',
        '..........LLLLLLLLLLLLLL........',
        '..........LLLLLLLLLLLLLL........',
        '..........HHLLLLLLLLLLLL........',
        '...........HBBBBBBBBBBBB........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '...........HBBRRBBRRBBBb........',
        '............HBBBBBBBBBb.........',
        '............HBBBBBBBBBb.........',
        '.............HBBBBBBBb..........',
        '.............HBBBBBBBB..........',
        '.............bbbbbbbbbb.........',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        B: { name: 'can_body', role: 'body' },
        H: { name: 'can_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'can_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'lid', role: 'head' },
        R: { name: 'rib_lines', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  17. UNDO — curved arrow pointing left
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'undo_icon_32',
      description: 'Curved counter-clockwise arrow looping left, representing undo action.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '................................', // 4
        '...........AA...................',
        '..........AAAA..................',
        '.........AAAAAA.................',
        '........AAAAAAAA................',
        '...........AAHHHHHHHHHH.........',
        '...........AAHHBBBBBBBBHH.......',
        '.............HHBBBBBBBBBBHH.....',
        '.............HHBB......BBHH.....',
        '..............HBB......BBHH.....',
        '...............BB......BBHH.....',
        '...............BB......BBBb.....',
        '...............BB......BBBb.....',
        '...............BB......BBbb.....',
        '...............BB......BBbb.....',
        '...............BB......BBbb.....',
        '...............BBBBBBBBBBbb.....',
        '................BBBBBBBBbbb.....',
        '.................BBBBBBbb.......',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        B: { name: 'arrow_body', role: 'body' },
        H: { name: 'arrow_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'arrow_shadow', role: 'body', tone: 'shadow' },
        A: { name: 'arrow_head', role: 'body' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  18. HOME — house with roof, window, and door
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'home_icon_32',
      description: 'Simple house with triangular red roof, walls, yellow window and brown door.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '...............RR...............',
        '..............RRRR..............',
        '.............RRRRRR.............',
        '............RRHHHHRRR...........',
        '...........RRHHHHHHHRRR.........',
        '..........RRHHHHHHHHHRR.........',
        '.........RRHHHHHHHHHHHRRR.......',
        '........RRHHHHHHHHHHHHHRR.......',
        '.......RRHHHHHHHHHHHHHHHRRR.....',
        '......RRHHHHHHHHHHHHHHHHHRRR....',
        '......RRRRRRRRRRRRRRRRRRRRRR....',
        '........HHWWWWWWWWWWWWWWBB......',
        '........HHWWWWWWWWWWWWWWBB......',
        '........HHWWYYYYYYWWDDDDBB......',
        '........HHWWYYYYYYWWDDDDBB......',
        '........HHWWYYYYYYWWDDDDBB......',
        '........HHWWYYYYYYWWDDDDBB......',
        '........HHWWWWWWWWWWDDDDBB......',
        '........HHWWWWWWWWWWDDDDBB......',
        '........HHWWWWWWWWWWDDDDBB......',
        '........HHWWWWWWWWWWDDDDBB......',
        '........BBWWWWWWWWWWDDDDBB......',
        '........BBBBBBBBBBBBBBBBbb......',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        W: { name: 'walls', role: 'body' },
        H: { name: 'wall_highlight', role: 'body', tone: 'highlight' },
        B: { name: 'wall_shadow', role: 'body', tone: 'shadow' },
        b: { name: 'wall_dark', role: 'body', tone: 'shadow' },
        R: { name: 'roof', role: 'head' },
        Y: { name: 'window_glass', role: 'belt' },
        D: { name: 'door', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  19. PARTY — two person silhouettes side by side
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'party_icon_32',
      description: 'Two overlapping character silhouettes representing a party or group.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '................................', // 2
        '.........AAAA.......BBBB........',
        '........AAAAAA.....BBBBBB.......',
        '........AAAAAA.....BBBBBB.......',
        '........AAAAAA.....BBBBBB.......',
        '.........AAAA.......BBBB........',
        '...........AA.........BB........',
        '......AAAAAAAAAA..BBBBBBBBB.....',
        '.....AAAAAAAAAAAA.BBBBBBBBBB....',
        '.....AAAAAAAAAAAAABBBBBBBBBBB...',
        '....AAAAAAAAAAAAAABBBBBBBBBBBB..',
        '....AAAAAAAAAAAAAAABBBBBBBBBBBB.',
        '....AAAAAAAAAAAAAABBBBBBBBBBBBb.',
        '....AAAAAAAAAAAAAABBBBBBBBBBBBb.',
        '....AAAAAAAAAAAAABBBBBBBBBBBBBb.',
        '.....AAAAAAAAAABBBBBBBBBBBBBB...',
        '.....AAAAAAAAABBBBBBBBBBBBB.....',
        '......AAAAAAAABBBBBBBBBBBb......',
        '.......AAAAAAABBBBBBBBBbb.......',
        '........AAAAAABBBBBBBbb.........',
        '.........AAAAABBBBBbb...........',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        A: { name: 'person_left', role: 'body' },
        B: { name: 'person_right', role: 'accessory' },
        b: { name: 'person_right_shadow', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  20. JOURNAL — open book with text lines and bookmark
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'journal_icon_32',
      description: 'Open leather-bound journal with two pages, text lines, and ribbon bookmark.',
      size: 32,
      grid: [

        '................................', // 0
        '................................', // 1
        '....CCCCCCCCCCCCCCCCCCCCCCCC....',
        '....CHHPPPPPPPPSSSPPPPPPPPPBC...',
        '....CHHPPPPPPPPSSSPPPPPPPPPBC...',
        '....CHPPPPPPPPPSSSPPPPPPPPPBC...',
        '....CHPPTTTTTPPSSRRRPPPPPPBC...',
        '....CHPPPPPPPPPSSRRRPTTTTPBC...',
        '....CHPPTTTTTTTSSRRRPPPPPPBC...',
        '....CHPPPPPPPPPSSSPPPPPPPPPBC...',
        '....CHPPTTTTTPPSSPPPTTTTTPPBC...',
        '....CHPPPPPPPPPSSSPPPPPPPPPBC...',
        '....CHPPTTTTTTTSSPPPTTTTTPPBC...',
        '....CHPPPPPPPPPSSSPPPPPPPPPBC...',
        '....CHPPTTTTTPPSSPPPPPPPPPPBC...',
        '....CHPPPPPPPPPSSSPPTTTTTPPBC...',
        '....CHPPTTTTTPPSSPPPPPPPPPPBC...',
        '....CHPPPPPPPPPSSSPPPPPPPPPBC...',
        '....CHPPTTTTTTTSSPPPTTTTTPPBC...',
        '....CHPPPPPPPPPSSSPPPPPPPPPBC...',
        '....CHPPTTTTTPPSSPPPPPPPPPPBC...',
        '....CHPPPPPPPPPSSSPPPPPPPPPBC...',
        '....CHPPPPPPPPPSSSPPTTTTTPPBC...',
        '....CHPPPPPPPPPSSSPPPPPPPPPBC...',
        '....CBPPPPPPPPPSSSPPPPPPPPPBC...',
        '....CBBPPPPPPPPSSSPPPPPPPBBC....',
        '....CCCCCCCCCCCCCCCCCCCCCCCC....',
        '....CCCCCCCCCCCCCCCCCCCCCCCC....',
        '................................',
        '................................',
        '................................',
        '................................',
      ],
      chars: {
        P: { name: 'pages', role: 'head' },
        H: { name: 'page_highlight', role: 'head', tone: 'highlight' },
        B: { name: 'page_shadow', role: 'head', tone: 'shadow' },
        S: { name: 'spine', role: 'body' },
        C: { name: 'cover_edges', role: 'accessory' },
        T: { name: 'text_lines', role: 'belt' },
        R: { name: 'bookmark', role: 'leg' },
      },
      colors: {
        head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#8595a1' },
        leg:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

  ],
};

export default batch;
