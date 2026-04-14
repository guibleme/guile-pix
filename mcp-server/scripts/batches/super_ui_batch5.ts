/**
 * Super UI/UX Pack — Batch 5: Mobile/Casual/Roguelike/Puzzle UI (20 templates)
 * Genre coverage: mobile/gacha, casual/puzzle, roguelike/roguelite, idle games
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'ui',
  exportNames: { templates: 'SUPER_UI_BATCH5_TEMPLATES', schemes: 'SUPER_UI_BATCH5_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════
    // 1. ENERGY TIMER — Stamina/energy regen countdown
    // ═══════════════════════════════════════════════════════════
    {
      id: 'energy_timer_16',
      description: 'Mobile energy timer with lightning bolt and countdown display.',
      grid: [
        '................',
        '...AA...........',
        '..AA............',
        '.AAAA...........',
        '...AA...........',
        '....A...........',
        '.HHHHHHHHHHHH...',
        '.HBBBBBBBBBBHH..',
        '.HBBBBBBBBBB.H..',
        '.HBBBBBBBBBB.H..',
        '.HHHHHHHHHHHH...',
        '...EEEEEEEE.....',
        '...EEEEEEEE.....',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'bolt_icon', role: 'accessory' },
        H: { name: 'timer_frame', role: 'head' },
        B: { name: 'time_display', role: 'body' },
        E: { name: 'energy_pips', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 2. DAILY REWARD BOX — Login bonus chest
    // ═══════════════════════════════════════════════════════════
    {
      id: 'daily_reward_box_16',
      description: 'Daily reward gift box with ribbon bow and sparkle accent.',
      grid: [
        '......AA........',
        '.....AAAA.......',
        '....AA..AA......',
        '.HHHHHHHHHHHH...',
        '.HBBBBEEBBBBH...',
        '.HBBBBEEBBBBH...',
        '.HBBBBEEBBBBH...',
        '.HBBBBEEBBBBH...',
        '.HBBBBEEBBBBH...',
        '.HBBBBEEBBBBH...',
        '.HBBBBEEBBBBH...',
        '.HHHHHHHHHHHH...',
        '...........FF...',
        '..........FF....',
        '...........F....',
        '................',
      ],
      chars: {
        A: { name: 'ribbon_bow', role: 'accessory' },
        H: { name: 'box_frame', role: 'head' },
        B: { name: 'box_surface', role: 'body' },
        E: { name: 'ribbon_stripe', role: 'eye' },
        F: { name: 'sparkle', role: 'belt' },
      },
      colors: {
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 3. GACHA BUTTON — Summon/pull action
    // ═══════════════════════════════════════════════════════════
    {
      id: 'gacha_button_16',
      description: 'Gacha summon button with crystal icon and glowing pulse border.',
      grid: [
        '................',
        '..AAAAAAAAAA....',
        '.AAHHHHHHHHHAA..',
        '.AHBBBBBBBBHHA..',
        '.AHBBBBBBBBH.A..',
        '.AHBBBEEBBBH.A..',
        '.AHBBBEEBBBB.A..',
        '.AHBBBEEBBB..A..',
        '.AHBBBBBBBBB.A..',
        '.AHBBBBBBBBH.A..',
        '.AHHHHHHHHHHHA..',
        '..AAAAAAAAAA....',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'glow_border', role: 'accessory' },
        H: { name: 'button_frame', role: 'head' },
        B: { name: 'button_fill', role: 'body' },
        E: { name: 'crystal_icon', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 4. SHOP GEM ICON — Premium currency
    // ═══════════════════════════════════════════════════════════
    {
      id: 'shop_gem_icon_16',
      description: 'Premium gem currency icon with faceted crystal shape and sparkle.',
      grid: [
        '................',
        '................',
        '.....HHHH.......',
        '....HHHHHH......',
        '...HBBBBBBH.....',
        '..HBBBBBBBBH....',
        '..HBBBEEBBBH....',
        '.HBBBEAAEBBBH...',
        '.HBBBEAAEBBBH...',
        '..HBBBEEBBBH....',
        '..HBBBBBBBBH....',
        '...HBBBBBBH.....',
        '....HHHHHH......',
        '.....AA.........',
        '......A.........',
        '................',
      ],
      chars: {
        H: { name: 'gem_facets', role: 'head' },
        B: { name: 'gem_body', role: 'body' },
        E: { name: 'gem_highlight', role: 'eye' },
        A: { name: 'gem_core', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 5. VIP CROWN — Premium status badge
    // ═══════════════════════════════════════════════════════════
    {
      id: 'vip_crown_16',
      description: 'VIP crown badge with jeweled crown and premium status label.',
      grid: [
        '................',
        '.E...E...E......',
        '.EH.EHH.EH......',
        '.EHHEHHHEEH.....',
        '.HHHHHHHHH......',
        '.HHBBBBBBHH.....',
        '.HHBBBBBBHH.....',
        '.HHHHHHHHH......',
        '................',
        '.AAAAAAAAAAAA...',
        '.AAAAAAAAAAAA...',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'crown_gems', role: 'eye' },
        H: { name: 'crown_gold', role: 'head' },
        B: { name: 'crown_band', role: 'body' },
        A: { name: 'vip_label', role: 'accessory' },
      },
      colors: {
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 6. STAR RATING 3 — Three-star score
    // ═══════════════════════════════════════════════════════════
    {
      id: 'star_rating_3_16',
      description: 'Three-star level completion rating with filled stars on dark bg.',
      grid: [
        '................',
        '...A....A....A..',
        '..AAA..AAA..AAA.',
        '..AEA..AEA..AEA.',
        '..AAA..AAA..AAA.',
        '...A....A....A..',
        '................',
        '................',
        '................',
        '.HHHHHHHHHHHHHH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'stars', role: 'accessory' },
        E: { name: 'star_sparkle', role: 'eye' },
        H: { name: 'score_frame', role: 'head' },
        B: { name: 'score_bar', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 7. HINT LIGHTBULB — Puzzle hint icon
    // ═══════════════════════════════════════════════════════════
    {
      id: 'hint_lightbulb_16',
      description: 'Hint lightbulb icon with glowing filament and screw base.',
      grid: [
        '................',
        '.....HHHH.......',
        '....HBBBBH......',
        '...HBBBBBBH.....',
        '...HBBAAABH.....',
        '...HBBAAABH.....',
        '...HBBBBBBH.....',
        '....HBBBBH......',
        '.....HBBH.......',
        '.....EEEE.......',
        '.....EEEE.......',
        '.....EEEE.......',
        '......EE........',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'glass_bulb', role: 'head' },
        B: { name: 'glow_fill', role: 'body' },
        A: { name: 'filament', role: 'accessory' },
        E: { name: 'screw_base', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 8. LEVEL NODE — Map progression node
    // ═══════════════════════════════════════════════════════════
    {
      id: 'level_node_16',
      description: 'Level select map node with number display and connection path dots.',
      grid: [
        '......BB........',
        '......BB........',
        '......BB........',
        '....HHHHHH......',
        '...HBBBBBBH.....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '...HBBBBBBH.....',
        '....HHHHHH......',
        '......AA........',
        '................',
        '......AA........',
        '................',
        '......AA........',
      ],
      chars: {
        B: { name: 'node_fill', role: 'body' },
        H: { name: 'node_frame', role: 'head' },
        A: { name: 'path_dots', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 9. CHAIN COMBO — Puzzle match multiplier
    // ═══════════════════════════════════════════════════════════
    {
      id: 'chain_combo_16',
      description: 'Puzzle chain combo multiplier with linked rings and number display.',
      grid: [
        '................',
        '..HHH...........',
        '.HAAAH..........',
        '.HA.AH..........',
        '.HAAAHHHH.......',
        '..HHHAAAH.......',
        '....HA.AH.......',
        '....HAAAHHHH....',
        '.....HHHBBBBH...',
        '........BBBBHH..',
        '........BBBBBH..',
        '........BBBB.H..',
        '.........HHHH...',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'link_border', role: 'head' },
        A: { name: 'link_fill', role: 'accessory' },
        B: { name: 'number_area', role: 'body' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 10. MOVE COUNTER — Remaining moves display
    // ═══════════════════════════════════════════════════════════
    {
      id: 'move_counter_16',
      description: 'Move counter with hand/tap icon and remaining moves number.',
      grid: [
        '................',
        '....AA..........',
        '...AAAA.........',
        '...AAAA.........',
        '...AAAA.........',
        '..AAAAAA........',
        '..AAAAAA........',
        '..AAAAAA........',
        '...AAAA.........',
        '................',
        '.HHHHHHHHHHH....',
        '.HBBBBBBBBBHH...',
        '.HBBBBBBBBB.H...',
        '.HHHHHHHHHHH....',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'hand_icon', role: 'accessory' },
        H: { name: 'counter_frame', role: 'head' },
        B: { name: 'number_area', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 11. FLOOR COUNTER — Dungeon depth display
    // ═══════════════════════════════════════════════════════════
    {
      id: 'floor_counter_16',
      description: 'Roguelike floor/depth counter with stairs icon and floor number.',
      grid: [
        '................',
        '.AAA............',
        '.AAAA...........',
        '..AAAA..........',
        '..AAAAA.........',
        '...AAAAA........',
        '...AAAAAA.......',
        '....AAAAAA......',
        '................',
        '.HHHHHHHHHHHH...',
        '.HBBBBBBBBBHH...',
        '.HBBBBBBBBBBH...',
        '.HBBBBBBBBB.H...',
        '.HHHHHHHHHHHH...',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'stairs_icon', role: 'accessory' },
        H: { name: 'counter_frame', role: 'head' },
        B: { name: 'floor_number', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#757161' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 12. SEED DISPLAY — Run seed identifier
    // ═══════════════════════════════════════════════════════════
    {
      id: 'seed_display_16',
      description: 'Run seed display with DNA helix icon and alphanumeric seed text.',
      grid: [
        '................',
        '.....AA.AA......',
        '......EEE.......',
        '.....AA.AA......',
        '......EEE.......',
        '.....AA.AA......',
        '......EEE.......',
        '................',
        '.HHHHHHHHHHHHHH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'dna_strand', role: 'accessory' },
        E: { name: 'dna_cross', role: 'eye' },
        H: { name: 'display_frame', role: 'head' },
        B: { name: 'seed_text', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        eye:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 13. RUN TIMER — Speedrun/elapsed time
    // ═══════════════════════════════════════════════════════════
    {
      id: 'run_timer_16',
      description: 'Run timer display with stopwatch icon and elapsed time readout.',
      grid: [
        '......AA........',
        '.....HHHH.......',
        '....HBBBBH......',
        '...HBBBBBBH.....',
        '...HBB.BBBH.....',
        '...HBB.BBBH.....',
        '...HBBBBBBH.....',
        '....HBBBBH......',
        '.....HHHH.......',
        '................',
        '.HHHHHHHHHHHHH..',
        '.HEEEEEEEEEEHH..',
        '.HEEEEEEEEEE.H..',
        '.HHHHHHHHHHHHH..',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'crown_button', role: 'accessory' },
        H: { name: 'watch_frame', role: 'head' },
        B: { name: 'watch_face', role: 'body' },
        E: { name: 'time_readout', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 14. DEATH FRAME — Game over screen border
    // ═══════════════════════════════════════════════════════════
    {
      id: 'death_frame_16',
      description: 'Game over death screen frame with skull and crossbones accent.',
      grid: [
        'HHHHHHHHHHHHHHHH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBB.AAA.BBBBBH',
        'HBBB.AAAAA.BBBBH',
        'HBBB.AE.EA.BBBBH',
        'HBBBB.AAA.BBBBBH',
        'HBBBB..A..BBBBBH',
        'HBBBB.AAA.BBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HHHHHHHHHHHHHHHH',
        '................',
      ],
      chars: {
        H: { name: 'death_border', role: 'head' },
        B: { name: 'dark_bg', role: 'body' },
        A: { name: 'skull', role: 'accessory' },
        E: { name: 'skull_eyes', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        body:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 15. ITEM RARITY BORDER — Tiered glow frame
    // ═══════════════════════════════════════════════════════════
    {
      id: 'item_rarity_border_16',
      description: 'Item rarity border with pulsing glow and gem corner accents.',
      grid: [
        'EHHHHHHHHHHHHHE.',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'EHHHHHHHHHHHHHE.',
        '................',
      ],
      chars: {
        E: { name: 'corner_gems', role: 'eye' },
        H: { name: 'glow_border', role: 'head' },
        B: { name: 'item_bg', role: 'body' },
      },
      colors: {
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 16. PITY METER — empty (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'pity_meter_empty_16',
      description: 'Gacha pity meter at 0% — clover icon, dark interior, gold frame.',
      grid: [
        '................',
        '..AA.AA.........',
        '.AAAAAAA........',
        '.AAAAAAA........',
        '..AAAAA.........',
        '...AAA..........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'clover_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_sparkle', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 17. PITY METER — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'pity_meter_full_16',
      description: 'Gacha pity meter at 100% — clover icon, bright gold fill, gold frame.',
      grid: [
        '................',
        '..AA.AA.........',
        '.AAAAAAA........',
        '.AAAAAAA........',
        '..AAAAA.........',
        '...AAA..........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'clover_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_sparkle', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 18. BANNER RIBBON — Decorative header
    // ═══════════════════════════════════════════════════════════
    {
      id: 'banner_ribbon_16',
      description: 'Decorative banner ribbon for headers with folded ends and text area.',
      grid: [
        '................',
        '................',
        '................',
        '................',
        'AA.HHHHHHHH.AA..',
        'AAHBBBBBBBBHAA..',
        'AAHBBBBBBBBHAA..',
        '.AHBBBBBBBBHA...',
        '.AHBBBBBBBBHA...',
        '.AHBBBBBBBBHA...',
        '..HBBBBBBBBH....',
        '..HHHHHHHHHH....',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'ribbon_ends', role: 'accessory' },
        H: { name: 'ribbon_border', role: 'head' },
        B: { name: 'text_area', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 19. NOTIFICATION DOT — Alert badge
    // ═══════════════════════════════════════════════════════════
    {
      id: 'notification_dot_16',
      description: 'Notification alert dot with number badge and bell icon base.',
      grid: [
        '................',
        '......HH........',
        '.....HBBH.......',
        '....HBBBBH......',
        '....HBBBBH......',
        '...HBBBBBBH.....',
        '...HBBBBBBH.....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HHHHHHHHHH....',
        '.....HBBH.......',
        '..........AAAA..',
        '.........AAEEAA.',
        '.........AAEEAA.',
        '..........AAAA..',
        '................',
      ],
      chars: {
        H: { name: 'bell_body', role: 'head' },
        B: { name: 'bell_fill', role: 'body' },
        A: { name: 'notif_circle', role: 'accessory' },
        E: { name: 'notif_number', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 20. LEADERBOARD ROW — Ranking list entry
    // ═══════════════════════════════════════════════════════════
    {
      id: 'leaderboard_row_16',
      description: 'Leaderboard ranking row with position number, avatar, and score.',
      grid: [
        '................',
        '................',
        '................',
        '................',
        'HHHHHHHHHHHHHHHH',
        'HAAHBBBHEEEEEEEH',
        'HAAHBBBHEEEEEEEH',
        'HAAHBBBHEEEEEEEH',
        'HAAHBBBHEEEEEEEH',
        'HHHHHHHHHHHHHHHH',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'row_frame', role: 'head' },
        A: { name: 'rank_number', role: 'accessory' },
        B: { name: 'avatar_area', role: 'body' },
        E: { name: 'name_score', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
