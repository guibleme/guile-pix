/**
 * Armor Shields & Accessories batch — 20 shield/belt/accessory templates.
 * 16x16 pixel art, DB16 palette.
 */
import type { BatchDefinition, CompactTemplate } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'equipment',
  exportNames: {
    templates: 'ARMOR_SHIELDS_TEMPLATES',
    schemes: 'ARMOR_SHIELDS_COLOR_SCHEMES',
  },
  templates: [

    // ═══════════════════════════════════════════════════════════
    // 1. IRON ROUND SHIELD
    // ═══════════════════════════════════════════════════════════
    {
      id: 'iron_round_shield_16',
      description: 'Round iron shield with central boss, dark rim, and leather strap.',
      grid: [
        '................',
        '................',
        '......RRRR......',
        '....RRBBBBRR....',
        '...RRBBBBBBRR...',
        '...RBBBBBBBBR...',
        '..RRBBBHHBBBRR..',
        '..RBBBHHHHBBBR..',
        '..RBBBHPPHBBBR..',
        '..RBBBHPPHBBBR..',
        '..RBBBHHHHBBBR..',
        '..RRBBBHHBBBRR..',
        '...RBBBBBBBBR...',
        '...RRBBBBBBRR...',
        '....RRBBBBRR....',
        '......RRRR......',
      ],
      chars: {
        B: { name: 'iron_face', role: 'body' },
        H: { name: 'steel_boss', role: 'head' },
        R: { name: 'dark_rim', role: 'arm' },
        P: { name: 'leather_strap', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 2. BRONZE KITE SHIELD
    // ═══════════════════════════════════════════════════════════
    {
      id: 'bronze_kite_shield_16',
      description: 'Bronze kite shield with central emblem, dark border, and leather grip.',
      grid: [
        '................',
        '......RRRR......',
        '.....RBBBBR.....',
        '....RBBBBBBR....',
        '...RBBBBBBBBR...',
        '...RBBBAABBBR...',
        '...RBBBAABBBR...',
        '...RBBBBBBBBR...',
        '...RBBBBBBBBR...',
        '....RBBBBBBR....',
        '.....RBBBBR.....',
        '.....RBBBBR.....',
        '......RBBR......',
        '.......RR.......',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'bronze_face', role: 'body' },
        A: { name: 'gold_emblem', role: 'accessory' },
        R: { name: 'dark_border', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 3. GOLD TOWER SHIELD
    // ═══════════════════════════════════════════════════════════
    {
      id: 'gold_tower_shield_16',
      description: 'Golden tower shield with red lion emblem, bright border, and gold trim.',
      grid: [
        '................',
        '..RRRRRRRRRRRR..',
        '..RBBBBBBBBBBR..',
        '..RBBBBBBBBBBR..',
        '..RBBBAAABBBBR..',
        '..RBBAAAABBBBR..',
        '..RBBAAABBBBBR..',
        '..RBBBAAABBBBR..',
        '..RBBBBBBBBBBR..',
        '..RBBBBBBBBBBR..',
        '..RBBBBBBBBBBR..',
        '..RBBBBBBBBBBR..',
        '..RBBBBBBBBBBR..',
        '..RRRRRRRRRRRR..',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'gold_face', role: 'body' },
        A: { name: 'lion_emblem', role: 'accessory' },
        R: { name: 'bright_border', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 4. WOODEN BUCKLER
    // ═══════════════════════════════════════════════════════════
    {
      id: 'wooden_buckler_16',
      description: 'Small wooden buckler with iron boss, dark rim, and leather strap.',
      grid: [
        '................',
        '......RRRR......',
        '....RRBBBBRR....',
        '...RRBBBBBBRR...',
        '...RBBBBBBBBR...',
        '..RRBBBHHBBBRR..',
        '..RBBBHPPHBBBR..',
        '..RBBBHPPHBBBR..',
        '..RRBBBHHBBBRR..',
        '...RBBBBBBBBR...',
        '...RRBBBBBBRR...',
        '....RRBBBBRR....',
        '.....RBBBBR.....',
        '......RRRR......',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'wood_face', role: 'body' },
        H: { name: 'iron_boss', role: 'head' },
        R: { name: 'dark_rim', role: 'arm' },
        P: { name: 'leather_strap', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 5. CRYSTAL BARRIER
    // ═══════════════════════════════════════════════════════════
    {
      id: 'crystal_barrier_16',
      description: 'Crystal magic shield/barrier with blue crystal, white core, and silver frame.',
      grid: [
        '................',
        '......RRRR......',
        '.....RBBBBR.....',
        '....RBBBBBBR....',
        '...RBBBBBBBBR...',
        '...RBBBAABBBR...',
        '...RBBBAABBBR...',
        '...RBBBHHHBBR...',
        '...RBBBAABBBR...',
        '...RBBBAABBBR...',
        '...RBBBBBBBBR...',
        '....RBBBBBBR....',
        '.....RBBBBR.....',
        '......RRRR......',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'crystal_face', role: 'body' },
        H: { name: 'white_core', role: 'head' },
        A: { name: 'teal_glow', role: 'accessory' },
        R: { name: 'silver_frame', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
        head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 6. DARK SHIELD
    // ═══════════════════════════════════════════════════════════
    {
      id: 'dark_shield_16',
      description: 'Dark knight kite shield with purple emblem, shadow rim, and dark strap.',
      grid: [
        '................',
        '.....RRRRRR.....',
        '....RBBBBBBR....',
        '...RBBBBBBBBR...',
        '...RBBBBBBBBR...',
        '...RBBBAAABBR...',
        '...RBBAAAABBR...',
        '...RBBBAAABBR...',
        '....RBBBBBBR....',
        '....RBBBBBBR....',
        '.....RBBBBR.....',
        '......RBBR......',
        '.......RR.......',
        '................',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'shadow_face', role: 'body' },
        A: { name: 'purple_emblem', role: 'accessory' },
        R: { name: 'dark_rim', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
        arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 7. BONE SHIELD
    // ═══════════════════════════════════════════════════════════
    {
      id: 'bone_shield_16',
      description: 'Bone/skull round shield with dark skull emblem, bone rim, and leather strap.',
      grid: [
        '................',
        '................',
        '......RRRR......',
        '....RRBBBBRR....',
        '...RRBBBBBBRR...',
        '...RBBBAABBBR...',
        '..RRBBAAAABBRR..',
        '..RBBBAPPABBBR..',
        '..RBBBAPPABBBR..',
        '..RRBBAAAABBRR..',
        '...RBBBAABBBR...',
        '...RRBBBBBBRR...',
        '....RRBBBBRR....',
        '.....RBBBBR.....',
        '......RRRR......',
        '................',
      ],
      chars: {
        B: { name: 'bone_face', role: 'body' },
        A: { name: 'skull_emblem', role: 'accessory' },
        R: { name: 'bone_rim', role: 'arm' },
        P: { name: 'leather_strap', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 8. DRAGON SCALE SHIELD
    // ═══════════════════════════════════════════════════════════
    {
      id: 'dragon_scale_shield_16',
      description: 'Dragon scale shield with gold dragon emblem, dark rim, and fire accent.',
      grid: [
        '................',
        '....RRRRRRRR....',
        '...RBBBBBBBBR...',
        '...RBBBBBBBBR...',
        '...RBBAAABBBR...',
        '...RBAAAABBBR...',
        '...RBAAABBBBR...',
        '...RBBAAABBBR...',
        '...RBBBBBBBBR...',
        '....RBBBBBBR....',
        '.....RBBBBR.....',
        '......RBHBR.....',
        '.......RHR......',
        '........H.......',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'scale_face', role: 'body' },
        A: { name: 'dragon_emblem', role: 'accessory' },
        R: { name: 'dark_rim', role: 'arm' },
        H: { name: 'fire_accent', role: 'head' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        arm:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 9. MITHRIL SHIELD
    // ═══════════════════════════════════════════════════════════
    {
      id: 'mithril_shield_16',
      description: 'Mithril elvish shield with teal leaf emblem, elegant silver rim.',
      grid: [
        '................',
        '.....RRRRRR.....',
        '....RBBBBBBR....',
        '...RBBBBBBBBR...',
        '...RBBBBBBBBR...',
        '...RBBBAAABBR...',
        '...RBBAAAAABR...',
        '...RBBBAAABBR...',
        '....RBBBBBBR....',
        '....RBBBBBBR....',
        '.....RBBBBR.....',
        '.....RBBBBR.....',
        '......RBBR......',
        '.......RR.......',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'mithril_face', role: 'body' },
        A: { name: 'leaf_emblem', role: 'accessory' },
        R: { name: 'silver_rim', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 10. IRON WAR BELT
    // ═══════════════════════════════════════════════════════════
    {
      id: 'iron_war_belt_16',
      description: 'Iron warrior belt with pouches, brass rivets, and leather band.',
      grid: [
        '................',
        '................',
        '................',
        '................',
        'BBBBBBBBBBBBBBBB',
        'BPPHBBBBBBBBHPPB',
        'BPPHAABBBBBBHPPB',
        'BPPHAABBBBBBHPPB',
        'BPPHBBBBBBBBHPPB',
        'BPPHBBBBBBBBHPPB',
        'BBBBBBBBBBBBBBBB',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'leather_band', role: 'body' },
        H: { name: 'iron_buckle', role: 'head' },
        A: { name: 'brass_rivets', role: 'accessory' },
        P: { name: 'dark_pouch', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 11. LEATHER BELT
    // ═══════════════════════════════════════════════════════════
    {
      id: 'leather_belt_16',
      description: 'Leather adventure belt with brass buckle, dark stitching, and side pouch.',
      grid: [
        '................',
        '................',
        '................',
        '.BBBBBBBBBBBBBBB',
        '.BBBBBBBBBBBBBBB',
        '.BSSBBHHBBBBBBB.',
        '.BSSBBHHBBPPPBB.',
        '.BSSBBHHBBPPPBB.',
        '.BSSBBBBBBPPPBB.',
        '.BBBBBBBBBBBBBBB',
        '.BBBBBBBBBBBBBBB',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'leather_band', role: 'body' },
        H: { name: 'brass_buckle', role: 'head' },
        S: { name: 'dark_stitch', role: 'arm' },
        P: { name: 'side_pouch', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 12. GOLD BELT
    // ═══════════════════════════════════════════════════════════
    {
      id: 'gold_belt_16',
      description: 'Golden ornate belt with red jewels, bright chain links, and gold frame.',
      grid: [
        '................',
        '................',
        '................',
        '.HHBBBBBBBBBBHH.',
        '.HHBBBBBBBBBBHH.',
        '.HABBCCBBCCBAHH.',
        '.HABBCCBBCCBAHH.',
        '.HABBCCBBCCBAHH.',
        '.HHBBBBBBBBBBHH.',
        '.HHBBBBBBBBBBHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'gold_frame', role: 'body' },
        A: { name: 'red_jewels', role: 'accessory' },
        C: { name: 'chain_links', role: 'arm' },
        H: { name: 'gold_clasp', role: 'head' },
      },
      colors: {
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 13. CAPE RED
    // ═══════════════════════════════════════════════════════════
    {
      id: 'cape_red_16',
      description: 'Red warrior cape, flowing, with gold clasp, dark lining, and bright edge.',
      grid: [
        '................',
        '......AAAA......',
        '.....ABBBBA.....',
        '....ABBBBBBA....',
        '...ABBBBBBBBA...',
        '...RBBBBBBBBR...',
        '..RBBBBBBBBBBR..',
        '..RBBBBBBBBBBR..',
        '..RBBBBBBBBBBR..',
        '..RBBBBBBBBBBR..',
        '..RBBBBBBBBBBR..',
        '...RBBBBBBBBR...',
        '...RRBBBBBBRR...',
        '....RRBBBBRR....',
        '.....RRRRRR.....',
        '................',
      ],
      chars: {
        B: { name: 'red_cloth', role: 'body' },
        A: { name: 'gold_clasp', role: 'accessory' },
        R: { name: 'dark_lining', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 14. CAPE ROYAL
    // ═══════════════════════════════════════════════════════════
    {
      id: 'cape_royal_16',
      description: 'Royal purple cape with white fur trim, gold brooch, and dark lining.',
      grid: [
        '................',
        '......AAAA......',
        '.....FFBBFF.....',
        '....FFBBBBFF....',
        '...FFBBBBBBFF...',
        '...RBBBBBBBBR...',
        '..RBBBBBBBBBBR..',
        '..RBBBBBBBBBBR..',
        '..RBBBBBBBBBBR..',
        '..RRBBBBBBBBRR..',
        '...RBBBBBBBBR...',
        '...RBBBBBBBBR...',
        '....RRBBBBRR....',
        '.....RRRRRR.....',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'purple_cloth', role: 'body' },
        F: { name: 'fur_trim', role: 'head' },
        A: { name: 'gold_brooch', role: 'accessory' },
        R: { name: 'dark_lining', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
        head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 15. AMULET PROTECTION
    // ═══════════════════════════════════════════════════════════
    {
      id: 'amulet_protection_16',
      description: 'Protective amulet on chain with blue gem, silver setting, and magic glow.',
      grid: [
        '................',
        '....CCCCCCCC....',
        '...CC......CC...',
        '...C........C...',
        '....C......C....',
        '.....RRRRRR.....',
        '....RRBBBBRRR...',
        '...RRBBGGBBRR...',
        '...RRBBGGBBRR...',
        '....RRBBBBRRR...',
        '.....RRRRRR.....',
        '......AAAA......',
        '.....AAAAAA.....',
        '......AAAA......',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'silver_setting', role: 'body' },
        G: { name: 'blue_gem', role: 'head' },
        C: { name: 'gold_chain', role: 'accessory' },
        R: { name: 'setting_rim', role: 'arm' },
        A: { name: 'magic_glow', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 16. RING POWER
    // ═══════════════════════════════════════════════════════════
    {
      id: 'ring_power_16',
      description: 'Ring of power with red gem, gold band, bright gleam, and shadow.',
      grid: [
        '................',
        '................',
        '....BBBBBBBB....',
        '...BBBBBBBBBB...',
        '..BBBBBGBBBBBB..',
        '..BBBBGGGBBBBB..',
        '..BBB.GGG..BBB..',
        '..BBB.GGG..BBB..',
        '..BBB.AAA..BBB..',
        '..BBBBAAABBBBB..',
        '..BBBBBABBBBBB..',
        '...BBBBBBBBBB...',
        '....BBBBBBBB....',
        '................',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'gold_band', role: 'body' },
        G: { name: 'red_gem', role: 'head' },
        A: { name: 'gleam_accent', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 17. SHOULDER CAPE
    // ═══════════════════════════════════════════════════════════
    {
      id: 'shoulder_cape_16',
      description: 'Half cape / shoulder cloak, green cloth with brown clasp and dark interior.',
      grid: [
        '................',
        '..AABB..........',
        '..ABBBR.........',
        '..BBBBBR........',
        '.BBBBBBBR.......',
        '.BBBBBBBR.......',
        '.BBBBBBBBR......',
        '.BBBBBBBBR......',
        '.BBBBBBBBBR.....',
        '..BBBBBBBBBR....',
        '..BBBBBBBBBR....',
        '...RBBBBBBR.....',
        '....RRBBBR......',
        '.....RRRR.......',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'green_cloth', role: 'body' },
        A: { name: 'brown_clasp', role: 'accessory' },
        R: { name: 'dark_interior', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 18. WAR BANNER
    // ═══════════════════════════════════════════════════════════
    {
      id: 'war_banner_16',
      description: 'War banner/standard on iron pole with red banner, gold trim, and cloth tassel.',
      grid: [
        '................',
        '.PPPPPPPPPPPP...',
        '.PBBBBBBBBBAP...',
        '.PBBBBBBBBBAP...',
        '.PBBBBAAABBAP...',
        '.PBBBAAAAABAP...',
        '.PBBBBAAABBAP...',
        '.PBBBBBBBBBAP...',
        '.PBBBBBBBBBAP...',
        '.PPPPPPPPPPP....',
        '.......P........',
        '.......P........',
        '.......P........',
        '.......P........',
        '......HHH.......',
        '................',
      ],
      chars: {
        B: { name: 'red_banner', role: 'body' },
        A: { name: 'gold_trim', role: 'accessory' },
        P: { name: 'iron_pole', role: 'arm' },
        H: { name: 'pole_base', role: 'head' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 19. HOLY SHIELD
    // ═══════════════════════════════════════════════════════════
    {
      id: 'holy_shield_16',
      description: 'Holy knight shield with gold cross, holy glow, and bright steel face.',
      grid: [
        '................',
        '....HHRRRRHH....',
        '...HRBBBBBBRH...',
        '...RBBBBBBBBR...',
        '...RBBBAAABBR...',
        '...RBBBAAABBR...',
        '...RBAAAAAABR...',
        '...RBBBAAABBR...',
        '...RBBBAAABBR...',
        '...RBBBBBBBBR...',
        '....RBBBBBBR....',
        '....RBBBBBBR....',
        '.....RBBBBR.....',
        '......RRRR......',
        '.......HH.......',
        '................',
      ],
      chars: {
        B: { name: 'steel_face', role: 'body' },
        A: { name: 'gold_cross', role: 'accessory' },
        R: { name: 'steel_rim', role: 'arm' },
        H: { name: 'holy_glow', role: 'head' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 20. FIRE SHIELD
    // ═══════════════════════════════════════════════════════════
    {
      id: 'fire_shield_16',
      description: 'Fire-enchanted round shield with fire emblem, ember rim, and flame accents.',
      grid: [
        '................',
        '......RRRR......',
        '....RRBBBBRR....',
        '...RRBBBBBBRR...',
        '..RBBBAAAABBBR..',
        '..RRBBAAAABBRR..',
        '..RBBBBAABBBBR..',
        '..RBBBBBBBBBBR..',
        '...RBBBBBBBBR...',
        '...RRBBBBBBRR...',
        '....RRBBBBRR....',
        '......RRRR......',
        '......HHHH......',
        '.....HHHHHH.....',
        '......HHHH......',
        '................',
      ],
      chars: {
        B: { name: 'dark_iron', role: 'body' },
        A: { name: 'fire_emblem', role: 'accessory' },
        R: { name: 'ember_rim', role: 'arm' },
        H: { name: 'flame_accent', role: 'head' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

  ],
};

export default batch;
