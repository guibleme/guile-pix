/**
 * Super UI/UX Pack — Batch 1: RPG/MMORPG Advanced UI (20 templates)
 * Genre coverage: RPG, MMORPG, character sheets, guild systems, auction house, talent trees
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'ui',
  exportNames: { templates: 'SUPER_UI_BATCH1_TEMPLATES', schemes: 'SUPER_UI_BATCH1_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════
    // 1. CHARACTER SHEET PANEL — Stat display frame
    // ═══════════════════════════════════════════════════════════
    {
      id: 'character_sheet_panel_16',
      description: 'RPG character sheet panel with portrait area, stat lines, and decorative frame.',
      grid: [
        'HHHHHHHHHHHHHHHH',
        'HBBBBH.EEEEEEEHH',
        'HBBBBH.EEEEEEE.H',
        'HBBBBH.EEEEEEE.H',
        'HBBBBH.EEEEEEE.H',
        'HHHHHH.........H',
        'H.AAAAAAAAAAAAFH',
        'H.AAAAAAAAAAAAFH',
        'H..............H',
        'H.AAAAAAAAAAAAFH',
        'H.AAAAAAAAAAAAFH',
        'H..............H',
        'H.AAAAAAAAAAAAFH',
        'H.AAAAAAAAAAAAFH',
        'HHHHHHHHHHHHHHHH',
        '................',
      ],
      chars: {
        H: { name: 'frame', role: 'head' },
        B: { name: 'portrait_area', role: 'body' },
        E: { name: 'name_plate', role: 'eye' },
        A: { name: 'stat_bars', role: 'arm' },
        F: { name: 'stat_icons', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 2. STAT COMPARISON — Side-by-side compare widget
    // ═══════════════════════════════════════════════════════════
    {
      id: 'stat_comparison_16',
      description: 'Side-by-side stat comparison widget with up/down arrows for equip preview.',
      grid: [
        '................',
        '.HHHHHHHHHHHHHH.',
        '.HBBBB.AAAAAAHH.',
        '.HBBBB.AAAAAA.H.',
        '.HHHHHHHHHHHHHH.',
        '.HEEEE.FFFFFFHH.',
        '.HEEEE.FFFFFF.H.',
        '.HHHHHHHHHHHHHH.',
        '.HBBBB.AAAAAAHH.',
        '.HBBBB.AAAAAA.H.',
        '.HHHHHHHHHHHHHH.',
        '.HEEEE.FFFFFFHH.',
        '.HEEEE.FFFFFF.H.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'frame', role: 'head' },
        B: { name: 'old_stat', role: 'body' },
        A: { name: 'new_stat', role: 'arm' },
        E: { name: 'increase', role: 'eye' },
        F: { name: 'decrease', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 3. ENCHANT SLOT — Gem/enchantment socket
    // ═══════════════════════════════════════════════════════════
    {
      id: 'enchant_slot_16',
      description: 'Enchantment socket slot with glowing gem insert and ornate metal border.',
      grid: [
        '................',
        '................',
        '....HHHHHH......',
        '...HBBBBBBH.....',
        '..HBBBEEBBBH....',
        '..HBBEAAEBHH....',
        '..HBEAAAAEBBH...',
        '..HBEAAAAEBBH...',
        '..HBBEAAEBB.H...',
        '..HBBBEEBB..H...',
        '...HBBBBBB..H...',
        '....HHHHHH.H....',
        '.....HHHHH......',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'socket_frame', role: 'head' },
        B: { name: 'socket_bg', role: 'body' },
        E: { name: 'gem_outer', role: 'eye' },
        A: { name: 'gem_core', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 4. CRAFTING PROGRESS BAR — empty (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'crafting_progress_empty_16',
      description: 'Crafting progress bar at 0% — anvil icon, dark empty interior, copper frame.',
      grid: [
        '................',
        '..AAA...........',
        '.AAAAA..........',
        'AAAAAAA.........',
        '..AAA...........',
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
        A: { name: 'anvil_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_rivet', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 5. CRAFTING PROGRESS BAR — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'crafting_progress_full_16',
      description: 'Crafting progress bar at 100% — anvil icon, bright orange fill, copper frame.',
      grid: [
        '................',
        '..AAA...........',
        '.AAAAA..........',
        'AAAAAAA.........',
        '..AAA...........',
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
        A: { name: 'anvil_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_rivet', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 6. CLASS ICON FRAME — Circular class emblem border
    // ═══════════════════════════════════════════════════════════
    {
      id: 'class_icon_frame_16',
      description: 'Circular ornate frame for class/job icons with inner glow and metal trim.',
      grid: [
        '................',
        '.....HHHH.......',
        '...HHBBBBHH.....',
        '..HBBBBBBBBH....',
        '..HBBBEEBBBH....',
        '.HBBBEAAEBBBH...',
        '.HBBBEAAEBBBH...',
        '.HBBBEAAEBB.H...',
        '.HBBBEAAEBB.H...',
        '.HBBBEAAEBBBH...',
        '..HBBBEEBBBH....',
        '..HBBBBBBBBH....',
        '...HHBBBBHH.....',
        '.....HHHH.......',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'frame_ring', role: 'head' },
        B: { name: 'bg_fill', role: 'body' },
        E: { name: 'icon_border', role: 'eye' },
        A: { name: 'icon_core', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 7. GUILD EMBLEM FRAME — Heraldic shield border
    // ═══════════════════════════════════════════════════════════
    {
      id: 'guild_emblem_frame_16',
      description: 'Heraldic guild emblem frame shaped like a shield with banner accent.',
      grid: [
        '................',
        '..HHHHHHHHHH....',
        '..HBBBBBBBBH....',
        '.HHBBBBBBBBHH...',
        '.HBBBBEEBBBBBH..',
        '.HBBBEAAEBBB.H..',
        '.HBBBEAAEBBB.H..',
        '.HBBBBEEBBBBBH..',
        '..HBBBBBBBBHH...',
        '..HHBBBBBBHH....',
        '...HHBBBBHH.....',
        '....HHBBHH......',
        '.....HHHH.......',
        '......HH........',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'shield_border', role: 'head' },
        B: { name: 'shield_fill', role: 'body' },
        E: { name: 'emblem_outer', role: 'eye' },
        A: { name: 'emblem_core', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 8. AUCTION SLOT — Marketplace item listing frame
    // ═══════════════════════════════════════════════════════════
    {
      id: 'auction_slot_16',
      description: 'Auction house item slot with price tag area and gold coin accent.',
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
        'HBBBBBBBBBBBBBBH',
        'HHHHHHHHHHHHHHHH',
        'HEEEEEEEEEE.AAH.',
        'HEEEEEEEEEE.AAH.',
        'HHHHHHHHHHHHHHHH',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'slot_frame', role: 'head' },
        B: { name: 'item_bg', role: 'body' },
        E: { name: 'price_text', role: 'eye' },
        A: { name: 'gold_coin', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
        eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 9. MAIL ICON — Envelope notification icon
    // ═══════════════════════════════════════════════════════════
    {
      id: 'mail_icon_16',
      description: 'Mail/message envelope icon with wax seal and notification badge.',
      grid: [
        '................',
        '................',
        '..HHHHHHHHHH....',
        '..HBHBBBBHBH....',
        '..HBBHBBHBBH....',
        '..HBBBHHBBBH....',
        '..HBBBBBBBBH....',
        '..HBBBBBBBBH....',
        '..HBBBEEBBBH....',
        '..HBBBEEBBBH....',
        '..HHHHHHHHHH....',
        '.........AAA....',
        '........AAAAA...',
        '.........AAA....',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'envelope', role: 'head' },
        B: { name: 'paper', role: 'body' },
        E: { name: 'wax_seal', role: 'eye' },
        A: { name: 'notif_badge', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 10. PARTY FRAME — Group member HP portrait
    // ═══════════════════════════════════════════════════════════
    {
      id: 'party_frame_16',
      description: 'Party member frame with portrait square, HP bar, and role icon area.',
      grid: [
        'HHHHHHHHHHHHHHHH',
        'HBBBBBHEEEEEEEHH',
        'HBBBBBHEEEEEEEHH',
        'HBBBBBHEEEEEEEHH',
        'HBBBBBHEEEEEEEHH',
        'HBBBBBHHHHHHHHHH',
        'HAAAAAAAAAAAAAAH',
        'HAAAAAAAAAAAAAAH',
        'HHHHHHHHHHHHHHHH',
        'HFFFFFFFFFFFFFFH',
        'HFFFFFFFFFFFFFFH',
        'HHHHHHHHHHHHHHHH',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'frame', role: 'head' },
        B: { name: 'portrait', role: 'body' },
        E: { name: 'name_plate', role: 'eye' },
        A: { name: 'hp_bar', role: 'arm' },
        F: { name: 'mp_bar', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        arm:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 11. RAID HP BAR — empty (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'raid_hp_bar_empty_16',
      description: 'Raid boss HP bar at 0% — skull icon, dark empty interior, heavy metal frame.',
      grid: [
        '................',
        '..AHA...........',
        '.AAAAA..........',
        '.AEEEA..........',
        '..AAA...........',
        '.HHHHHHHHHHHHHH.',
        '.HFBBBBBBBBBBFH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HFBBBBBBBBBBFH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'skull_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'skull_eyes', role: 'eye' },
        F: { name: 'frame_bolts', role: 'belt' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 12. RAID HP BAR — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'raid_hp_bar_full_16',
      description: 'Raid boss HP bar at 100% — skull icon, bright red fill, heavy metal frame.',
      grid: [
        '................',
        '..AHA...........',
        '.AAAAA..........',
        '.AEEEA..........',
        '..AAA...........',
        '.HHHHHHHHHHHHHH.',
        '.HFBBBBBBBBBBFH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HFBBBBBBBBBBFH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'skull_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'skull_eyes', role: 'eye' },
        F: { name: 'frame_bolts', role: 'belt' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 13. THREAT METER — Aggro gauge
    // ═══════════════════════════════════════════════════════════
    {
      id: 'threat_meter_16',
      description: 'Threat/aggro meter with exclamation icon and graduated fill segments.',
      grid: [
        '................',
        '......AA........',
        '......AA........',
        '......AA........',
        '................',
        '......AA........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBFFAAAAAABBB.',
        '.BBBFFAAAAAABBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'threat_fill', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_dot', role: 'eye' },
        B: { name: 'bg', role: 'body' },
        F: { name: 'low_zone', role: 'belt' },
      },
      colors: {
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 14. DPS METER — Damage output gauge
    // ═══════════════════════════════════════════════════════════
    {
      id: 'dps_meter_16',
      description: 'DPS meter with sword icon and segmented fill bar for damage tracking.',
      grid: [
        '................',
        '.....A..........',
        '....AAA.........',
        '...AAAAA........',
        '....AEA.........',
        '....AEA.........',
        'HHHHHHHHHHHHHHHH',
        'HFBBBBBBBBBBBBFH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HFBBBBBBBBBBBBFH',
        'HHHHHHHHHHHHHHHH',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'sword_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'sword_grip', role: 'eye' },
        F: { name: 'frame_accent', role: 'belt' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 15. CHAT TAB — Messaging channel tab
    // ═══════════════════════════════════════════════════════════
    {
      id: 'chat_tab_16',
      description: 'Chat channel tab with speech bubble icon and unread badge.',
      grid: [
        '................',
        '.HHHHHHHHHH.....',
        '.HBBBBBBBBH.....',
        '.HBBBBBBBBH.....',
        '.HBBBBBBBBH.....',
        '.HHHHHHHHHHH....',
        '.HAAAAAAAAAH....',
        '.HAAAAAAAAAH....',
        '.HAAAAAAAAAH....',
        '.HAAAAAAAAAH....',
        '.HAAAAAAAAAH....',
        '.HAAAAAAAAAH....',
        '.HHHHHHHHHHH....',
        '........EEE.....',
        '.......EEEEE....',
        '........EEE.....',
      ],
      chars: {
        H: { name: 'tab_frame', role: 'head' },
        B: { name: 'tab_label', role: 'body' },
        A: { name: 'message_area', role: 'arm' },
        E: { name: 'notif_badge', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 16. TALENT TREE NODE — Skill tree socket
    // ═══════════════════════════════════════════════════════════
    {
      id: 'talent_tree_node_16',
      description: 'Talent/skill tree node with connecting branches and activation glow.',
      grid: [
        '.......BB.......',
        '.......BB.......',
        '.......BB.......',
        '....HHHHHH......',
        '...HEEEEEHH.....',
        '..HEEAAEEE.H....',
        '..HEEAAEEE.H....',
        'BBHEEEEEEE.HBB..',
        'BBHEEEEEEE.HBB..',
        '..HEEEEEEEHH....',
        '...HEEEEEHH.....',
        '....HHHHHH......',
        '.......BB.......',
        '.......BB.......',
        '.......BB.......',
        '................',
      ],
      chars: {
        H: { name: 'node_frame', role: 'head' },
        E: { name: 'node_bg', role: 'eye' },
        A: { name: 'icon_glow', role: 'accessory' },
        B: { name: 'branch_lines', role: 'body' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 17. REPUTATION BAR — empty (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'reputation_bar_empty_16',
      description: 'Reputation/faction bar at 0% — crown icon, dark interior, gold frame.',
      grid: [
        '................',
        '.A.A.A..........',
        '.AAAAA..........',
        '..AAA...........',
        '..EEE...........',
        '.HHHHHHHHHHHHHH.',
        '.HFBBBBBBBBBBFH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HFBBBBBBBBBBFH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'crown_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'crown_base', role: 'eye' },
        F: { name: 'frame_gem', role: 'belt' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 18. REPUTATION BAR — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'reputation_bar_full_16',
      description: 'Reputation/faction bar at 100% — crown icon, bright gold fill, gold frame.',
      grid: [
        '................',
        '.A.A.A..........',
        '.AAAAA..........',
        '..AAA...........',
        '..EEE...........',
        '.HHHHHHHHHHHHHH.',
        '.HFBBBBBBBBBBFH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HFBBBBBBBBBBFH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'crown_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'crown_base', role: 'eye' },
        F: { name: 'frame_gem', role: 'belt' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 19. DURABILITY BAR — empty (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'durability_bar_empty_16',
      description: 'Durability bar at 0% — hammer icon, dark empty interior, steel frame.',
      grid: [
        '................',
        '..AAAA..........',
        '..AAAA..........',
        '...EE...........',
        '...EE...........',
        '.HHHHHHHHHHHHHH.',
        '.HFBBBBBBBBBBFH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HFBBBBBBBBBBFH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'hammer_head', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'hammer_shaft', role: 'eye' },
        F: { name: 'frame_rivet', role: 'belt' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 20. DURABILITY BAR — full (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'durability_bar_full_16',
      description: 'Durability bar at 100% — hammer icon, bright steel fill, steel frame.',
      grid: [
        '................',
        '..AAAA..........',
        '..AAAA..........',
        '...EE...........',
        '...EE...........',
        '.HHHHHHHHHHHHHH.',
        '.HFBBBBBBBBBBFH.',
        '.HBBBBBBBBBBBBH.',
        '.HBBBBBBBBBBBBH.',
        '.HFBBBBBBBBBBFH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'hammer_head', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'hammer_shaft', role: 'eye' },
        F: { name: 'frame_rivet', role: 'belt' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
