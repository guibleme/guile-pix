/**
 * Super UI/UX Pack — Batch 3: Strategy/Tycoon/TD/Card UI (20 templates)
 * Genre coverage: RTS, tower defense, tycoon/management, card games, 4X strategy
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'ui',
  exportNames: { templates: 'SUPER_UI_BATCH3_TEMPLATES', schemes: 'SUPER_UI_BATCH3_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════
    // 1. RESOURCE WOOD ICON — Timber resource
    // ═══════════════════════════════════════════════════════════
    {
      id: 'resource_wood_icon_16',
      description: 'Wood/timber resource icon with stacked logs and axe mark accent.',
      grid: [
        '................',
        '................',
        '..HHHHHHHH......',
        '..HBBBBBBHH.....',
        '..HBBBBBB.H.....',
        '..HHHHHHHH......',
        '...HBBBBBBHH....',
        '...HBBBBBB.H....',
        '...HHHHHHHH.....',
        '....HBBBBBBHH...',
        '....HBBBBBB.H...',
        '....HHHHHHHH....',
        '......AA........',
        '.....AAAA.......',
        '......AE........',
        '................',
      ],
      chars: {
        H: { name: 'bark', role: 'head' },
        B: { name: 'wood_interior', role: 'body' },
        A: { name: 'axe_head', role: 'accessory' },
        E: { name: 'axe_handle', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 2. RESOURCE GOLD ICON — Gold coin pile
    // ═══════════════════════════════════════════════════════════
    {
      id: 'resource_gold_icon_16',
      description: 'Gold resource icon with stacked coins and shine accent.',
      grid: [
        '................',
        '................',
        '................',
        '......HHHH......',
        '.....HBBBHH.....',
        '.....HBBBBH.....',
        '...HHHHHHHHH....',
        '..HBBBBBBBBHH...',
        '..HBBBBBBBB.H...',
        '.HHHHHHHHHHHH...',
        'HBBBBBBBBBBBBH..',
        'HBBBBBBBBBBBBH..',
        'HHHHHHHHHHHHHHH.',
        '........AA......',
        '.........A......',
        '................',
      ],
      chars: {
        H: { name: 'coin_edge', role: 'head' },
        B: { name: 'coin_face', role: 'body' },
        A: { name: 'shine', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 3. RESOURCE FOOD ICON — Wheat sheaf
    // ═══════════════════════════════════════════════════════════
    {
      id: 'resource_food_icon_16',
      description: 'Food resource icon with wheat sheaf bundle and tie ribbon.',
      grid: [
        '................',
        '...B..BB..B.....',
        '..BBB.BB.BBB....',
        '..BBBBBBBBB.....',
        '...BBBBBBB......',
        '....BBBBB.......',
        '....EEEEE.......',
        '...EAAAAAE......',
        '...EAAAAAE......',
        '....EEEEE.......',
        '....BBBBB.......',
        '.....BBB........',
        '.....BBB........',
        '......B.........',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'wheat_stalks', role: 'body' },
        E: { name: 'tie_ribbon', role: 'eye' },
        A: { name: 'ribbon_bow', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 4. UNIT COUNT BADGE — Army size indicator
    // ═══════════════════════════════════════════════════════════
    {
      id: 'unit_count_badge_16',
      description: 'Unit count badge with shield shape, number area, and faction color accent.',
      grid: [
        '................',
        '..HHHHHHHHHH....',
        '.HHBBBBBBBBHH...',
        '.HBBBBBBBBBBH...',
        '.HBBBBBBBBBBH...',
        '.HBBBBBBBBBBH...',
        '.HBBBBBBBBBBH...',
        '..HBBBBBBBBH....',
        '..HHBBBBBBHH....',
        '...HHBBBBHH.....',
        '....HHBBHH......',
        '.....HHHH.......',
        '......HH........',
        '......AA........',
        '.....AAAA.......',
        '......AA........',
      ],
      chars: {
        H: { name: 'shield_border', role: 'head' },
        B: { name: 'number_area', role: 'body' },
        A: { name: 'faction_pip', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        body:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 5. BUILD QUEUE SLOT — Construction queue item
    // ═══════════════════════════════════════════════════════════
    {
      id: 'build_queue_slot_16',
      description: 'Build queue slot with building icon area, progress bar, and timer overlay.',
      grid: [
        'HHHHHHHHHHHHHHHH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HHHHHHHHHHHHHHHH',
        'HAAAAAAAAAAAEEEH',
        'HAAAAAAAAAAAEEEH',
        'HHHHHHHHHHHHHHHH',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'slot_frame', role: 'head' },
        B: { name: 'icon_area', role: 'body' },
        A: { name: 'progress_fill', role: 'arm' },
        E: { name: 'timer_text', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
        arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 6. TECH TREE NODE — Research node
    // ═══════════════════════════════════════════════════════════
    {
      id: 'tech_tree_node_16',
      description: 'Technology research tree node with gear icon and branch connections.',
      grid: [
        '.......BB.......',
        '.......BB.......',
        '....HHHHHH......',
        '...HEEEEEHH.....',
        '..HEEAAAEEE.H...',
        '..HEAAAAAE..H...',
        'BBHEAAAAAE.HBB..',
        'BBHEAAAAAE.HBB..',
        '..HEAAAAAE..H...',
        '..HEEAAAEEE.H...',
        '...HEEEEEHH.....',
        '....HHHHHH......',
        '.......BB.......',
        '.......BB.......',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'node_border', role: 'head' },
        E: { name: 'node_bg', role: 'eye' },
        A: { name: 'gear_icon', role: 'accessory' },
        B: { name: 'branch_lines', role: 'body' },
      },
      colors: {
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 7. WAVE COUNTER — TD wave indicator
    // ═══════════════════════════════════════════════════════════
    {
      id: 'wave_counter_16',
      description: 'Tower defense wave counter with skull icon and wave number display.',
      grid: [
        '................',
        '..AAAA..........',
        '.AAAAAA.........',
        '.AA.A.AA........',
        '.AAAAAA.........',
        '..AAAA..........',
        '...AA...........',
        '.HHHHHHHHHHHH...',
        '.HBBBBBBBBBBHH..',
        '.HBBBBBBBBBB.H..',
        '.HBBBBBBBBBB.H..',
        '.HBBBBBBBBBB.H..',
        '.HHHHHHHHHHHHH..',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'skull_icon', role: 'accessory' },
        H: { name: 'panel_frame', role: 'head' },
        B: { name: 'number_area', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 8. TOWER RANGE RING — Defensive radius
    // ═══════════════════════════════════════════════════════════
    {
      id: 'tower_range_ring_16',
      description: 'Tower defense range indicator ring with center tower mark.',
      grid: [
        '................',
        '.....BBBBBB.....',
        '...BB......BB...',
        '..B..........B..',
        '.B............B.',
        '.B....HHHH....B.',
        'B....HEEHH.....B',
        'B....HEEEH.....B',
        'B....HEEEH.....B',
        'B....HHHHH.....B',
        '.B....HHHH....B.',
        '.B............B.',
        '..B..........B..',
        '...BB......BB...',
        '.....BBBBBB.....',
        '................',
      ],
      chars: {
        B: { name: 'range_circle', role: 'body' },
        H: { name: 'tower_base', role: 'head' },
        E: { name: 'tower_top', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 9. UPGRADE PATH ARROW — TD upgrade direction
    // ═══════════════════════════════════════════════════════════
    {
      id: 'upgrade_path_arrow_16',
      description: 'Upgrade path directional arrow with glow trail for tower defense.',
      grid: [
        '......BB........',
        '.....BBBB.......',
        '....BBBBBB......',
        '...BBBBBBBB.....',
        '..AAAHBBHAAAA...',
        '.....HBBH.......',
        '.....HBBH.......',
        '.....HBBH.......',
        '.....HBBH.......',
        '.....HBBH.......',
        '.....HBBH.......',
        '.....HBBH.......',
        '.....HBBH.......',
        '......EE........',
        '......EE........',
        '................',
      ],
      chars: {
        B: { name: 'arrow_fill', role: 'body' },
        A: { name: 'arrow_wings', role: 'accessory' },
        H: { name: 'shaft_border', role: 'head' },
        E: { name: 'trail_glow', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 10. ENEMY PATH MARKER — Pathing waypoint
    // ═══════════════════════════════════════════════════════════
    {
      id: 'enemy_path_marker_16',
      description: 'Enemy path waypoint marker with directional chevron and alert color.',
      grid: [
        '................',
        '................',
        '......BB........',
        '.....BBBB.......',
        '....BB..BB......',
        '...BB.HH.BB.....',
        '..BB..HH..BB....',
        '.BB...HH...BB...',
        '......HH........',
        '......HH........',
        '......HH........',
        '......AA........',
        '.....AAAA.......',
        '....AAAAAA......',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'chevron_arrow', role: 'body' },
        H: { name: 'path_line', role: 'head' },
        A: { name: 'base_marker', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 11. CARD FRAME — Playing card border
    // ═══════════════════════════════════════════════════════════
    {
      id: 'card_frame_16',
      description: 'Playing card frame with ornate border, art area, and text box.',
      grid: [
        '.HHHHHHHHHHHHHH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HHHHHHHHHHHHHH.',
        '.HEEEEEEEEEEEHH.',
        '.HEEEEEEEEEEE.H.',
        '.HEEEEEEEEEEE.H.',
        '.HHHHHHHHHHHHHH.',
        '..AAAAAAAAAA....',
        '................',
      ],
      chars: {
        H: { name: 'card_border', role: 'head' },
        B: { name: 'card_art', role: 'body' },
        E: { name: 'text_box', role: 'eye' },
        A: { name: 'cost_bar', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 12. DECK COUNTER — Cards remaining
    // ═══════════════════════════════════════════════════════════
    {
      id: 'deck_counter_16',
      description: 'Deck counter with stacked cards icon and remaining count display.',
      grid: [
        '................',
        '...HHHHHHH......',
        '..HHHHHHHHH.....',
        '..HBBBBBBHH.....',
        '..HBBBBBBHH.....',
        '..HBBBBBBHH.....',
        '..HBBBBBB.H.....',
        '..HBBBBBB.H.....',
        '..HBBBBBB.H.....',
        '..HHHHHHHHH.....',
        '...HHHHHH.......',
        '................',
        '...AAAAAAA......',
        '...AEEEEEA......',
        '...AAAAAAA......',
        '................',
      ],
      chars: {
        H: { name: 'card_stack', role: 'head' },
        B: { name: 'top_card', role: 'body' },
        A: { name: 'counter_frame', role: 'accessory' },
        E: { name: 'count_number', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 13. TURN INDICATOR — Whose turn display
    // ═══════════════════════════════════════════════════════════
    {
      id: 'turn_indicator_16',
      description: 'Turn indicator with hourglass icon and player highlight glow.',
      grid: [
        '................',
        '.....AAAAA......',
        '......AAA.......',
        '......ABA.......',
        '......ABA.......',
        '.......B........',
        '......ABA.......',
        '......ABA.......',
        '......AAA.......',
        '.....AAAAA......',
        '................',
        '.HHHHHHHHHHHHHH.',
        '.HEEEEEEEEEEEEH.',
        '.HEEEEEEEEEEEEH.',
        '.HHHHHHHHHHHHHH.',
        '................',
      ],
      chars: {
        A: { name: 'hourglass_frame', role: 'accessory' },
        B: { name: 'sand_flow', role: 'body' },
        H: { name: 'indicator_frame', role: 'head' },
        E: { name: 'player_label', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 14. CARD SLOT EMPTY — Empty hand position
    // ═══════════════════════════════════════════════════════════
    {
      id: 'card_slot_empty_16',
      description: 'Empty card slot with dashed border and plus icon for drawing.',
      grid: [
        '................',
        '.HH.HH.HH.HH....',
        '.H..........H...',
        '............H...',
        '.H..........H...',
        '.H....BB....H...',
        '......BB........',
        '.H..BBBBBB..H...',
        '.H..BBBBBB..H...',
        '......BB........',
        '.H....BB....H...',
        '.H..........H...',
        '............H...',
        '.H..........H...',
        '.HH.HH.HH.HH....',
        '................',
      ],
      chars: {
        H: { name: 'dashed_border', role: 'head' },
        B: { name: 'plus_icon', role: 'body' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 15. MONEY COUNTER — Cash/currency display
    // ═══════════════════════════════════════════════════════════
    {
      id: 'money_counter_16',
      description: 'Tycoon money counter with dollar sign icon and scrolling number area.',
      grid: [
        '................',
        '................',
        '.HHHHHHHHHHHHHH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '.AA.............',
        'AAAA............',
        'AA..............',
        'AAAA............',
        '.AAA............',
        'AAAA............',
        '.AA.............',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'display_frame', role: 'head' },
        B: { name: 'number_area', role: 'body' },
        A: { name: 'dollar_sign', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 16. SATISFACTION METER — empty (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'satisfaction_empty_16',
      description: 'Customer satisfaction meter at 0% — smiley icon, dark interior.',
      grid: [
        '................',
        '..AAAA..........',
        '.AAEAEAA........',
        '.AA..AAA........',
        '.AAEAEAA........',
        '..AAAA..........',
        'HHHHHHHHHHHHHHHH',
        'HEBBBBBBBBBBBBEH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HEBBBBBBBBBBBBEH',
        'HHHHHHHHHHHHHHHH',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'face_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_dot', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 17. SATISFACTION METER — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'satisfaction_full_16',
      description: 'Customer satisfaction meter at 100% — smiley icon, bright green fill.',
      grid: [
        '................',
        '..AAAA..........',
        '.AAEAEAA........',
        '.AA..AAA........',
        '.AAEAEAA........',
        '..AAAA..........',
        'HHHHHHHHHHHHHHHH',
        'HEBBBBBBBBBBBBEH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HEBBBBBBBBBBBBEH',
        'HHHHHHHHHHHHHHHH',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'face_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_dot', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 18. POPULATION COUNTER — Citizen count
    // ═══════════════════════════════════════════════════════════
    {
      id: 'population_counter_16',
      description: 'Population counter with person icon silhouette and number display.',
      grid: [
        '................',
        '....AAA.........',
        '...AAAAA........',
        '....AAA.........',
        '...BBBBB........',
        '...BBBBB........',
        '...BBBBB........',
        '....B.B.........',
        '................',
        '.HHHHHHHHHHHHHH.',
        '.HEEEEEEEEEEEEH.',
        '.HEEEEEEEEEEEEH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'person_head', role: 'accessory' },
        B: { name: 'person_body', role: 'body' },
        H: { name: 'counter_frame', role: 'head' },
        E: { name: 'number_area', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 18b. POPULATION COUNTER — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'population_counter_full_16',
      description: 'Population counter at capacity — person icon, bright green number display.',
      grid: [
        '................',
        '....AAA.........',
        '...AAAAA........',
        '....AAA.........',
        '...BBBBB........',
        '...BBBBB........',
        '...BBBBB........',
        '....B.B.........',
        '................',
        '.HHHHHHHHHHHHHH.',
        '.HEEEEEEEEEEEEH.',
        '.HEEEEEEEEEEEEH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'person_head', role: 'accessory' },
        B: { name: 'person_body', role: 'body' },
        H: { name: 'counter_frame', role: 'head' },
        E: { name: 'number_area', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 19. BLUEPRINT FRAME — Construction plan
    // ═══════════════════════════════════════════════════════════
    {
      id: 'blueprint_frame_16',
      description: 'Blueprint/schematic frame with grid lines and dimension markers.',
      grid: [
        'HHHHHHHHHHHHHHHH',
        'HBBBBBBBBBBBBBBH',
        'HBBBB.BBBB.BBB.H',
        'HBBBB.BBBB.BBB.H',
        'HB.BB.B.BB.B..BH',
        'HBBBB.BBBB.BBB.H',
        'HBBBB.BBBB.BBB.H',
        'HB.BB.B.BB.B..BH',
        'HBBBB.BBBB.BBB.H',
        'HBBBB.BBBB.BBB.H',
        'HB.BB.B.BB.B..BH',
        'HBBBB.BBBB.BBB.H',
        'HBBBB.BBBB.BBB.H',
        'HBBBBBBBBBBBBBBH',
        'HHHHHHHHHHHHHHHH',
        '..AAAA..AAAA....',
      ],
      chars: {
        H: { name: 'frame_border', role: 'head' },
        B: { name: 'blueprint_bg', role: 'body' },
        A: { name: 'dimension_marks', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 20. PRODUCTION GEAR — Factory output icon
    // ═══════════════════════════════════════════════════════════
    {
      id: 'production_gear_16',
      description: 'Production/factory gear icon with spinning cog and output arrow.',
      grid: [
        '................',
        '.....BB.BB......',
        '.....BBBBB......',
        '..BB.BBBBB.BB...',
        '..BBBBBBBBBBB...',
        '..BBBBB.BBBBB...',
        '...BBBBBBBBB....',
        '.BBBB.HHH.BBBB..',
        '.BBBB.HHH.BBBB..',
        '...BBBBBBBBB....',
        '..BBBBB.BBBBB...',
        '..BBBBBBBBBBB...',
        '..BB.BBBBB.BB...',
        '.....BBBBB......',
        '.....BB.BB......',
        '................',
      ],
      chars: {
        B: { name: 'gear_teeth', role: 'body' },
        H: { name: 'center_hub', role: 'head' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

  ],
};

export default batch;
