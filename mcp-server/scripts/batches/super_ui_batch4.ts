/**
 * Super UI/UX Pack — Batch 4: Racing/Sports/BR/Survival UI (20 templates)
 * Genre coverage: racing, sports, battle royale, survival horror, survival crafting
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'ui',
  exportNames: { templates: 'SUPER_UI_BATCH4_TEMPLATES', schemes: 'SUPER_UI_BATCH4_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════
    // 1. SPEEDOMETER GAUGE — Vehicle speed dial
    // ═══════════════════════════════════════════════════════════
    {
      id: 'speedometer_gauge_16',
      description: 'Speedometer circular gauge with needle indicator and speed markings.',
      grid: [
        '................',
        '.....HHHH.......',
        '...HHBBBBHH.....',
        '..HBBBBBBBBH....',
        '..HBB.BB.BBH....',
        '.HBBB.BB.BBBH...',
        '.HBB..BB..BBH...',
        '.HBB.BBBB.BBH...',
        '.HBBBBAABBBBH...',
        '..HBBBAAABBH....',
        '..HBBBBBBBBH....',
        '...HHBBBBHH.....',
        '.....HHHH.......',
        '......EE........',
        '......EE........',
        '................',
      ],
      chars: {
        H: { name: 'dial_frame', role: 'head' },
        B: { name: 'dial_face', role: 'body' },
        A: { name: 'needle', role: 'accessory' },
        E: { name: 'readout', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 2. POSITION BADGE — Race placement indicator
    // ═══════════════════════════════════════════════════════════
    {
      id: 'position_badge_16',
      description: 'Race position badge with large ordinal number and podium accent.',
      grid: [
        '................',
        '....HHHHHHH.....',
        '...HBBBBBBBH....',
        '..HBBBBBBBBBH...',
        '..HBBBBBBBBBH...',
        '..HBBBBBBBBBH...',
        '..HBBBBBBBBBH...',
        '..HBBBBBBBBBH...',
        '...HBBBBBBBH....',
        '....HHHHHHH.....',
        '................',
        '...AAAAAAAAA....',
        '..AAAEEEAAAA....',
        '..AAAEEEAAAA....',
        '..AAAAAAAAA.....',
        '................',
      ],
      chars: {
        H: { name: 'badge_border', role: 'head' },
        B: { name: 'number_area', role: 'body' },
        A: { name: 'ribbon', role: 'accessory' },
        E: { name: 'ribbon_stripe', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 3. NITRO METER — empty (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'nitro_meter_empty_16',
      description: 'Nitro boost meter at 0% — flame icon, dark interior, chrome frame.',
      grid: [
        '................',
        '...A............',
        '..AAA...........',
        '..AAA...........',
        '.AAAAA..........',
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
        '................',
      ],
      chars: {
        A: { name: 'flame_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_glow', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 4. NITRO METER — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'nitro_meter_full_16',
      description: 'Nitro boost meter at 100% — flame icon, bright cyan fill, chrome frame.',
      grid: [
        '................',
        '...A............',
        '..AAA...........',
        '..AAA...........',
        '.AAAAA..........',
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
        '................',
      ],
      chars: {
        A: { name: 'flame_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_glow', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        body:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 5. LAP TIMER — Race lap display
    // ═══════════════════════════════════════════════════════════
    {
      id: 'lap_timer_16',
      description: 'Lap timer display with clock face and current/total lap numbers.',
      grid: [
        '....HHHHHH......',
        '...HBBBBBBH.....',
        '..HBBBBBBBBH....',
        '..HBB.BB.BBH....',
        '..HBB.BBBBBH....',
        '..HBBBBBBBBH....',
        '...HBBBBBBH.....',
        '....HHHHHH......',
        '................',
        '.HHHHHHHHHHHH...',
        '.HAAAAAEEEEEEH..',
        '.HAAAAAEEEEEEH..',
        '.HHHHHHHHHHHH...',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'frame', role: 'head' },
        B: { name: 'clock_face', role: 'body' },
        A: { name: 'current_lap', role: 'accessory' },
        E: { name: 'time_display', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 6. RACE MINIMAP — Track overview
    // ═══════════════════════════════════════════════════════════
    {
      id: 'race_minimap_16',
      description: 'Race minimap with track outline and player position dot.',
      grid: [
        '................',
        '.HHHHHHHHHHHHHH.',
        '.H............H.',
        '.H..BBBBBBBB..H.',
        '.H.BB......BB.H.',
        '.H.B........B.H.',
        '.H.B........B.H.',
        '.H.BB......BB.H.',
        '.H..BBB..BBB..H.',
        '.H.....BB.....H.',
        '.H..BBBBBBBB..H.',
        '.H.BB.AA...BB.H.',
        '.H.B..AA....B.H.',
        '.H..BBBBBBBB..H.',
        '.HHHHHHHHHHHHHH.',
        '................',
      ],
      chars: {
        H: { name: 'map_frame', role: 'head' },
        B: { name: 'track_line', role: 'body' },
        A: { name: 'player_dot', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 7. SCOREBOARD PANEL — Sports score display
    // ═══════════════════════════════════════════════════════════
    {
      id: 'scoreboard_panel_16',
      description: 'Sports scoreboard with two team scores and timer area.',
      grid: [
        '................',
        '.HHHHHHHHHHHHHH.',
        '.HBBBBBHEEEEEEH.',
        '.HBBBBBHEEEEEEH.',
        '.HBBBBBHEEEEEEH.',
        '.HBBBBBHEEEEEEH.',
        '.HHHHHHHHHHHHHH.',
        '.HAAAAAAAAAAAAH.',
        '.HAAAAAAAAAAAAH.',
        '.HAAAAAAAAAAAAH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'frame', role: 'head' },
        B: { name: 'home_score', role: 'body' },
        E: { name: 'away_score', role: 'eye' },
        A: { name: 'timer', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 8. SHOT CLOCK — Basketball/sports timer
    // ═══════════════════════════════════════════════════════════
    {
      id: 'shot_clock_16',
      description: 'Shot clock countdown display with large seconds number.',
      grid: [
        '................',
        '....HHHHHH......',
        '...HBBBBBBH.....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '...HBBBBBBH.....',
        '....HHHHHH......',
        '.....AAAA.......',
        '.....AAAA.......',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'clock_frame', role: 'head' },
        B: { name: 'time_display', role: 'body' },
        A: { name: 'mount_bracket', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 9. PLAYER CARD — Sports player info
    // ═══════════════════════════════════════════════════════════
    {
      id: 'player_card_16',
      description: 'Sports player card with portrait area, name plate, and stat display.',
      grid: [
        '.HHHHHHHHHHHHHH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HHHHHHHHHHHHHH.',
        '.HAAAAAAAAAAAAH.',
        '.HHHHHHHHHHHHHH.',
        '.HEEE.EEE.EEEEH.',
        '.HEEE.EEE.EEEEH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'card_border', role: 'head' },
        B: { name: 'portrait', role: 'body' },
        A: { name: 'name_bar', role: 'accessory' },
        E: { name: 'stat_values', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 10. WHISTLE ICON — Referee/pause signal
    // ═══════════════════════════════════════════════════════════
    {
      id: 'whistle_icon_16',
      description: 'Referee whistle icon with metal body and lanyard accent.',
      grid: [
        '................',
        '........AA......',
        '.......AA.......',
        '......AA........',
        '.....AA.........',
        '....HHHHHH......',
        '...HBBBBBBH.....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HBBBBEEBBH....',
        '..HBBBBEEBBH....',
        '...HBBBBBBH.....',
        '....HHHHHH......',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'lanyard', role: 'accessory' },
        H: { name: 'whistle_body', role: 'head' },
        B: { name: 'whistle_surface', role: 'body' },
        E: { name: 'mouth_hole', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 11. PLAYER COUNT BADGE — BR alive counter
    // ═══════════════════════════════════════════════════════════
    {
      id: 'player_count_badge_16',
      description: 'Battle royale players alive counter with person silhouette and number.',
      grid: [
        '................',
        '....AAA.........',
        '...AAAAA........',
        '....AAA.........',
        '...BBBBB........',
        '...BBBBB........',
        '...BBBBB........',
        '................',
        '.HHHHHHHHHHHH...',
        '.HEEEEEEEEEHH...',
        '.HEEEEEEEEE.H...',
        '.HEEEEEEEEE.H...',
        '.HHHHHHHHHHHH...',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'person_head', role: 'accessory' },
        B: { name: 'person_body', role: 'body' },
        H: { name: 'counter_frame', role: 'head' },
        E: { name: 'count_number', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 12. ZONE TIMER — Shrinking circle countdown
    // ═══════════════════════════════════════════════════════════
    {
      id: 'zone_timer_16',
      description: 'Battle royale zone shrink timer with concentric ring and countdown.',
      grid: [
        '................',
        '......AAAA......',
        '....AA....AA....',
        '...A........A...',
        '..A..HHHHHH..A..',
        '..A.HBBBBBBH.A..',
        '.A..HBBBBBBH..A.',
        '.A..HBBBBBBH..A.',
        '.A..HBBBBBBH..A.',
        '..A.HBBBBBBH.A..',
        '..A..HHHHHH..A..',
        '...A........A...',
        '....AA....AA....',
        '......AAAA......',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'zone_ring', role: 'accessory' },
        H: { name: 'timer_frame', role: 'head' },
        B: { name: 'countdown', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 13. LOOT RARITY FRAME — Item tier border
    // ═══════════════════════════════════════════════════════════
    {
      id: 'loot_rarity_frame_16',
      description: 'Loot rarity item frame with glowing tier border and item area.',
      grid: [
        '................',
        '.AAAAAAAAAAAAAA.',
        '.AHHHHHHHHHHHHA.',
        '.AHBBBBBBBBBBHA.',
        '.AHBBBBBBBBBBHA.',
        '.AHBBBBBBBBBBHA.',
        '.AHBBBBBBBBBBHA.',
        '.AHBBBBBBBBBBHA.',
        '.AHBBBBBBBBBBHA.',
        '.AHBBBBBBBBBBHA.',
        '.AHBBBBBBBBBBHA.',
        '.AHBBBBBBBBBBHA.',
        '.AHBBBBBBBBBBHA.',
        '.AHHHHHHHHHHHHA.',
        '.AAAAAAAAAAAAAA.',
        '................',
      ],
      chars: {
        A: { name: 'rarity_glow', role: 'accessory' },
        H: { name: 'inner_frame', role: 'head' },
        B: { name: 'item_bg', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 14. KILL FEED LINE — Elimination event row
    // ═══════════════════════════════════════════════════════════
    {
      id: 'kill_feed_line_16',
      description: 'Kill feed notification row with attacker, weapon icon, and victim areas.',
      grid: [
        '................',
        '................',
        '................',
        '................',
        '................',
        '.HHHHHHHHHHHHHH.',
        '.HBBBBHAAHEEEEH.',
        '.HBBBB.AA.EEEEH.',
        '.HBBBB.AA.EEEEH.',
        '.HBBBBHAAHEEEEH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'row_frame', role: 'head' },
        B: { name: 'attacker_name', role: 'body' },
        A: { name: 'weapon_icon', role: 'accessory' },
        E: { name: 'victim_name', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 15. SANITY METER — empty (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'sanity_meter_empty_16',
      description: 'Sanity meter at 0% — brain icon, dark interior, purple frame.',
      grid: [
        '................',
        '..AAAA..........',
        '.AAAAAA.........',
        '.AAA.AAA........',
        '.AAAAAA.........',
        '..AAAA..........',
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
        A: { name: 'brain_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_glow', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 16. SANITY METER — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'sanity_meter_full_16',
      description: 'Sanity meter at 100% — brain icon, bright purple fill, purple frame.',
      grid: [
        '................',
        '..AAAA..........',
        '.AAAAAA.........',
        '.AAA.AAA........',
        '.AAAAAA.........',
        '..AAAA..........',
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
        A: { name: 'brain_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_glow', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 17. HEARTBEAT LINE — Vital signs monitor
    // ═══════════════════════════════════════════════════════════
    {
      id: 'heartbeat_line_16',
      description: 'Heartbeat vital signs line with ECG wave and monitor frame.',
      grid: [
        '................',
        '.HHHHHHHHHHHHHH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBABBH.',
        '.HBBBBBBBB.ABBH.',
        '.HBBBBBBB.A.BBH.',
        '.HAABBB.AA..BBH.',
        '.HB.AABB.A.BBBH.',
        '.HB.AAA.ABBBBBH.',
        '.HBB.AAA.BBBBBH.',
        '.HBBB...BBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'monitor_frame', role: 'head' },
        B: { name: 'screen_bg', role: 'body' },
        A: { name: 'ecg_wave', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 18. INFECTION BAR — empty (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'infection_bar_empty_16',
      description: 'Infection/poison bar at 0% — biohazard icon, dark interior, toxic green frame.',
      grid: [
        '................',
        '..AAA...........',
        '.AA.AA..........',
        '.A.E.A..........',
        '.AA.AA..........',
        '..AAA...........',
        '.HHHHHHHHHHHHHH.',
        '.FBBBBBBBBBBBBF.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.FBBBBBBBBBBBBF.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'biohazard', role: 'accessory' },
        E: { name: 'hazard_center', role: 'eye' },
        H: { name: 'frame', role: 'head' },
        F: { name: 'frame_glow', role: 'belt' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        eye:       { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },
        head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        belt:      { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#140c1c', base: '#346524', highlight: '#346524' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 19. INFECTION BAR — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'infection_bar_full_16',
      description: 'Infection/poison bar at 100% — biohazard icon, bright green fill, toxic frame.',
      grid: [
        '................',
        '..AAA...........',
        '.AA.AA..........',
        '.A.E.A..........',
        '.AA.AA..........',
        '..AAA...........',
        '.HHHHHHHHHHHHHH.',
        '.FBBBBBBBBBBBBF.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.FBBBBBBBBBBBBF.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'biohazard', role: 'accessory' },
        E: { name: 'hazard_center', role: 'eye' },
        H: { name: 'frame', role: 'head' },
        F: { name: 'frame_glow', role: 'belt' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        eye:       { shadow: '#140c1c', base: '#346524', highlight: '#6daa2c' },
        head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        belt:      { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 20. OXYGEN BAR — empty (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'oxygen_bar_empty_16',
      description: 'Oxygen/air bar at 0% — bubble icon, dark interior, cyan frame.',
      grid: [
        '................',
        '..AAAA..........',
        '.AAAAAA.........',
        '.AA..AA.........',
        '.AAAAAA.........',
        '..AAAA..........',
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
        A: { name: 'bubble_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_glow', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 21. OXYGEN BAR — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'oxygen_bar_full_16',
      description: 'Oxygen/air bar at 100% — bubble icon, bright cyan fill, cyan frame.',
      grid: [
        '................',
        '..AAAA..........',
        '.AAAAAA.........',
        '.AA..AA.........',
        '.AAAAAA.........',
        '..AAAA..........',
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
        A: { name: 'bubble_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_glow', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        body:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
