/**
 * Dungeon Props Bundle — Batch 3: Pickups & Consumables (32x32 DSL)
 * 20 unique pickup templates for dungeon/roguelike games.
 * Neo-SNES style, DB16 palette, 5-value shading via tone chars.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'props',
  exportNames: { templates: 'DUNGEON_PICKUPS_32_TEMPLATES', schemes: 'DUNGEON_PICKUPS_32_COLOR_SCHEMES' },
  templates: [

    // ─── 1. HEALTH POTION ─────────────────────────────────────────
    {
      id: 'health_potion_32',
      description: 'Red healing potion in a round glass flask — classic roguelike pickup.',
      size: 32,
      draw: [
        // Cork
        'spans(C, 6:14-17, 7:14-17)',
        // Cork highlight
        'spans(L, 6:15-16)',
        // Neck
        'spans(G, 8:14-17, 9:14-17, 10:14-17)',
        // Neck highlight
        'pixels(H, 14,9)',
        // Shoulder
        'spans(G, 11:12-19)',
        // Body
        'spans(B, 12:11-20, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:11-20)',
        // Body shadow
        'spans(D, 14:19-21, 15:19-21, 16:19-21, 17:19-20)',
        // Body highlight
        'spans(H, 13:11-12, 14:10-11, 15:10-11)',
        // Liquid shine
        'pixels(H, 12,13, 11,14)',
        // Base
        'spans(G, 18:11-20, 19:12-19)',
        // Label
        'spans(A, 14:14-17, 15:14-17)',
        // Cross on label
        'pixels(E, 15,14, 16,14, 15,15, 14,15, 16,15, 17,15)',
      ],
      chars: {
        B: { name: 'liquid', role: 'body' },
        D: { name: 'liquid_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'glass_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'glass', role: 'head' },
        C: { name: 'cork', role: 'belt' },
        L: { name: 'cork_highlight', role: 'belt', tone: 'highlight' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'cross_symbol', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#deeed6' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        leg:       { shadow: '#d04648', base: '#d04648', highlight: '#d04648' },
      },
    },

    // ─── 2. MANA POTION ──────────────────────────────────────────
    {
      id: 'mana_potion_32',
      description: 'Blue mana potion in a tall flask — restores magical energy.',
      size: 32,
      draw: [
        // Cork
        'spans(C, 5:15-16, 6:15-16)',
        // Neck
        'spans(G, 7:15-16, 8:15-16, 9:14-17)',
        // Shoulder
        'spans(G, 10:13-18)',
        // Body
        'spans(B, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19, 16:12-19, 17:12-19)',
        // Body shadow
        'spans(D, 14:18-19, 15:18-19, 16:18-19, 17:18-19)',
        // Body highlight
        'spans(H, 11:12-13, 12:12-13, 13:12-13)',
        // Swirl effect
        'pixels(A, 14,14, 15,15, 16,16, 17,15, 16,14)',
        // Base
        'spans(G, 18:12-19, 19:13-18)',
        // Star symbol
        'pixels(E, 15,12, 16,12, 15,13, 17,13, 16,13)',
      ],
      chars: {
        B: { name: 'mana_liquid', role: 'body' },
        D: { name: 'mana_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        G: { name: 'glass', role: 'head' },
        C: { name: 'cork', role: 'belt' },
        A: { name: 'mana_swirl', role: 'accessory' },
        E: { name: 'star_symbol', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        leg:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 3. GOLD KEY ──────────────────────────────────────────────
    {
      id: 'gold_key_32',
      description: 'Ornate golden key — unlocks treasure chests and locked doors.',
      size: 32,
      draw: [
        // Bow (handle ring)
        'spans(B, 6:12-19, 7:11-13, 7:18-20, 8:10-12, 8:19-21, 9:10-12, 9:19-21, 10:11-13, 10:18-20, 11:12-19)',
        // Bow highlight
        'spans(L, 6:14-17, 7:11-12, 8:10-11)',
        // Bow shadow
        'spans(D, 9:20-21, 10:19-20)',
        // Inner hole
        'spans(H, 8:14-17, 9:14-17)',
        // Shaft
        'spans(B, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16)',
        // Shaft shadow
        'spans(D, 13:16-16, 14:16-16, 15:16-16, 16:16-16, 17:16-16, 18:16-16, 19:16-16)',
        // Teeth
        'spans(B, 20:15-19, 21:15-16, 21:18-19, 22:15-19)',
        // Teeth shadow
        'spans(D, 22:18-19)',
        // Gem on bow
        'pixels(A, 15,8, 16,8)',
      ],
      chars: {
        B: { name: 'gold', role: 'body' },
        D: { name: 'gold_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'gold_highlight', role: 'body', tone: 'highlight' },
        H: { name: 'key_hole', role: 'head' },
        A: { name: 'gem', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 4. ANCIENT SCROLL ────────────────────────────────────────
    {
      id: 'ancient_scroll_32',
      description: 'Rolled parchment scroll with wax seal — contains spells or lore.',
      size: 32,
      draw: [
        // Top roll
        'spans(B, 8:9-22, 9:9-22, 10:9-22)',
        // Roll highlight
        'spans(L, 8:11-20)',
        // Roll shadow
        'spans(D, 10:9-10, 10:21-22)',
        // Parchment body (unrolled section)
        'spans(A, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21)',
        // Parchment shadow
        'spans(D, 15:20-21, 16:20-21, 17:20-21)',
        // Text lines
        'spans(G, 12:12-19, 13:12-17, 14:12-19, 15:12-15, 16:12-18)',
        // Bottom roll
        'spans(B, 18:9-22, 19:9-22, 20:9-22)',
        // Bottom roll shadow
        'spans(D, 20:9-10, 20:21-22)',
        // Bottom roll highlight
        'spans(L, 18:11-20)',
        // Wax seal
        'spans(E, 14:22-24, 15:22-24, 16:22-24)',
        // Seal stamp
        'pixels(F, 23,15)',
        // Ribbon
        'spans(E, 12:22-23, 13:23-24)',
      ],
      chars: {
        B: { name: 'parchment_roll', role: 'body' },
        D: { name: 'parchment_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'parchment_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'parchment_face', role: 'accessory' },
        G: { name: 'ink_text', role: 'head' },
        E: { name: 'wax_seal', role: 'belt' },
        F: { name: 'seal_emblem', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#dad45e' },
      },
    },

    // ─── 5. GEM CLUSTER ───────────────────────────────────────────
    {
      id: 'gem_cluster_32',
      description: 'Cluster of colorful gems — ruby, sapphire, emerald mixed together.',
      size: 32,
      draw: [
        // Ruby (large, center)
        'spans(B, 8:13-18, 9:12-19, 10:12-19, 11:13-18)',
        // Ruby facet highlight
        'spans(L, 8:14-16, 9:12-14)',
        // Ruby shadow
        'spans(D, 10:18-19, 11:17-18)',
        // Sapphire (left)
        'spans(A, 10:8-11, 11:8-12, 12:8-12, 13:9-11)',
        // Sapphire highlight
        'pixels(H, 9,10, 9,11)',
        // Emerald (right)
        'spans(E, 10:20-23, 11:19-23, 12:19-23, 13:20-22)',
        // Emerald highlight
        'pixels(F, 21,10, 22,10)',
        // Small diamond (top)
        'spans(G, 5:15-16, 6:14-17, 7:15-16)',
        // Diamond shine
        'pixels(K, 15,6)',
        // Base rock
        'spans(R, 14:10-21, 15:11-20, 16:12-19)',
      ],
      chars: {
        B: { name: 'ruby', role: 'body' },
        D: { name: 'ruby_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'ruby_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'sapphire', role: 'accessory' },
        H: { name: 'sapphire_shine', role: 'accessory', tone: 'highlight' },
        E: { name: 'emerald', role: 'belt' },
        F: { name: 'emerald_shine', role: 'belt', tone: 'highlight' },
        G: { name: 'diamond', role: 'leg' },
        K: { name: 'diamond_shine', role: 'leg', tone: 'highlight' },
        R: { name: 'rock_base', role: 'head' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        leg:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 6. COIN STACK ────────────────────────────────────────────
    {
      id: 'coin_stack_32',
      description: 'Neat stack of gold coins — dungeon currency pickup.',
      size: 32,
      draw: [
        // Top coin face
        'spans(L, 10:13-18, 11:12-19)',
        // Coin emblem
        'pixels(B, 15,10, 16,10, 14,11, 17,11)',
        // Stack layers
        'spans(B, 12:12-19, 13:12-19)',
        'spans(B, 14:12-19, 15:12-19)',
        'spans(B, 16:12-19, 17:12-19)',
        'spans(B, 18:12-19, 19:12-19)',
        // Stack shadow (right edge each layer)
        'spans(D, 12:19-19, 13:19-19, 14:19-19, 15:19-19, 16:19-19, 17:19-19, 18:19-19, 19:19-19)',
        // Stack shadow (bottom)
        'spans(D, 18:12-19, 19:12-19)',
        // Stack highlight (left edge)
        'spans(L, 12:12-12, 13:12-12, 14:12-12, 15:12-12, 16:12-12)',
        // Edge line between coins
        'spans(D, 13:13-18, 15:13-18, 17:13-18)',
        // Scattered loose coin
        'spans(B, 19:21-23, 20:20-24, 21:21-23)',
        'pixels(L, 22,20)',
      ],
      chars: {
        B: { name: 'gold', role: 'body' },
        D: { name: 'gold_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'gold_shine', role: 'body', tone: 'highlight' },
      },
      colors: {
        body: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 7. MAGIC TOME ────────────────────────────────────────────
    {
      id: 'magic_tome_32',
      description: 'Thick spellbook with glowing rune on the cover — contains magic.',
      size: 32,
      draw: [
        // Spine
        'spans(G, 7:9-10, 8:9-10, 9:9-10, 10:9-10, 11:9-10, 12:9-10, 13:9-10, 14:9-10, 15:9-10, 16:9-10, 17:9-10, 18:9-10, 19:9-10, 20:9-10)',
        // Cover
        'spans(B, 7:11-22, 8:11-22, 9:11-22, 10:11-22, 11:11-22, 12:11-22, 13:11-22, 14:11-22, 15:11-22, 16:11-22, 17:11-22, 18:11-22, 19:11-22, 20:11-22)',
        // Cover shadow
        'spans(D, 17:20-22, 18:20-22, 19:20-22, 20:11-22)',
        // Cover highlight
        'spans(L, 7:12-20, 8:11-13)',
        // Glowing rune (pentagram-like)
        'spans(A, 11:15-17, 12:14-18, 13:13-19, 14:13-19, 15:14-18, 16:15-17)',
        // Rune bright center
        'pixels(E, 16,13, 16,14)',
        // Corner clasps
        'spans(C, 7:11-12, 7:21-22, 20:11-12, 20:21-22)',
        // Page edges (bottom)
        'spans(P, 21:10-22)',
        // Page edge lines
        'pixels(P, 11,21, 11,19, 11,17)',
      ],
      chars: {
        B: { name: 'leather_cover', role: 'body' },
        D: { name: 'cover_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'cover_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'spine', role: 'head' },
        A: { name: 'rune_glow', role: 'accessory' },
        E: { name: 'rune_bright', role: 'accessory', tone: 'highlight' },
        C: { name: 'metal_clasp', role: 'belt' },
        P: { name: 'pages', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 8. POISON VIAL ───────────────────────────────────────────
    {
      id: 'poison_vial_32',
      description: 'Small vial of green poison with skull label — throwable weapon.',
      size: 32,
      draw: [
        // Cork
        'spans(C, 7:15-16, 8:15-16)',
        // Neck
        'spans(G, 9:15-16, 10:15-16)',
        // Body
        'spans(B, 11:13-18, 12:13-18, 13:13-18, 14:13-18, 15:13-18, 16:13-18, 17:13-18)',
        // Body shadow
        'spans(D, 15:17-18, 16:17-18, 17:17-18)',
        // Body highlight
        'spans(H, 11:13-14, 12:13-14, 13:13-14)',
        // Bubble
        'pixels(A, 16,15, 15,16)',
        // Base
        'spans(G, 18:13-18, 19:14-17)',
        // Skull label
        'pixels(E, 15,14, 16,14, 15,15)',
      ],
      chars: {
        B: { name: 'poison', role: 'body' },
        D: { name: 'poison_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        G: { name: 'glass', role: 'head' },
        C: { name: 'cork', role: 'belt' },
        A: { name: 'bubbles', role: 'accessory' },
        E: { name: 'skull_mark', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#deeed6' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        leg:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 9. IRON KEY ──────────────────────────────────────────────
    {
      id: 'iron_key_32',
      description: 'Simple iron key for basic dungeon doors — common pickup.',
      size: 32,
      draw: [
        // Bow (handle)
        'spans(B, 7:12-19, 8:11-13, 8:18-20, 9:11-12, 9:19-20, 10:11-13, 10:18-20, 11:12-19)',
        // Bow highlight
        'spans(L, 7:14-17, 8:11-12)',
        // Bow shadow
        'spans(D, 10:19-20)',
        // Shaft
        'spans(B, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16)',
        // Shaft shadow
        'spans(D, 12:16-16, 13:16-16, 14:16-16, 15:16-16, 16:16-16, 17:16-16, 18:16-16)',
        // Teeth
        'spans(B, 19:15-18, 20:15-16, 21:15-18)',
      ],
      chars: {
        B: { name: 'iron', role: 'body' },
        D: { name: 'iron_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'iron_highlight', role: 'body', tone: 'highlight' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 10. HEART CRYSTAL ────────────────────────────────────────
    {
      id: 'heart_crystal_32',
      description: 'Crystallized heart-shaped health pickup — glows with life energy.',
      size: 32,
      draw: [
        // Heart top lobes
        'spans(B, 7:9-13, 7:18-22, 8:8-14, 8:17-23, 9:8-23)',
        // Heart body
        'spans(B, 10:9-22, 11:10-21, 12:11-20, 13:12-19, 14:13-18, 15:14-17, 16:15-16)',
        // Heart highlight (left lobe)
        'spans(L, 7:10-11, 8:8-10, 9:8-10)',
        // Heart shadow
        'spans(D, 12:19-20, 13:18-19, 14:17-18)',
        // Inner glow
        'pixels(H, 12,11, 13,12, 11,13, 14,11)',
        // Sparkle
        'pixels(H, 10,6, 24,8, 7,12)',
        // Glow aura
        'pixels(A, 7,8, 8,7, 23,7, 24,8, 7,11, 24,11, 10,14, 21,14, 13,16, 18,16)',
      ],
      chars: {
        B: { name: 'crystal', role: 'body' },
        D: { name: 'crystal_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'crystal_highlight', role: 'body', tone: 'highlight' },
        H: { name: 'inner_glow', role: 'accessory' },
        A: { name: 'glow_aura', role: 'head' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#deeed6' },
        head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 11. RUNE STONE ───────────────────────────────────────────
    {
      id: 'rune_stone_32',
      description: 'Ancient carved rune stone — grants a random ability when touched.',
      size: 32,
      draw: [
        // Stone body
        'spans(B, 7:12-19, 8:11-20, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:11-20, 17:12-19)',
        // Stone shadow
        'spans(D, 14:19-21, 15:19-21, 16:19-20, 17:18-19)',
        // Stone highlight
        'spans(L, 7:14-17, 8:11-14, 9:10-12)',
        // Carved rune (glowing)
        'spans(A, 10:14-17, 11:13-14, 11:17-18, 12:13-13, 12:18-18, 13:14-17, 14:13-13, 14:18-18, 15:14-17)',
        // Rune bright
        'pixels(E, 15,11, 16,11, 15,14, 16,14)',
        // Ground shadow
        'spans(D, 18:11-20)',
      ],
      chars: {
        B: { name: 'stone', role: 'body' },
        D: { name: 'stone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stone_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'rune_carving', role: 'accessory' },
        E: { name: 'rune_glow', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 12. BOMB ─────────────────────────────────────────────────
    {
      id: 'dungeon_bomb_32',
      description: 'Round black bomb with lit fuse — throwable explosive.',
      size: 32,
      draw: [
        // Fuse spark
        'pixels(F, 18,3, 19,4, 17,4)',
        // Fuse
        'spans(A, 5:18-19, 6:17-18, 7:17-17)',
        // Bomb body
        'spans(B, 8:12-19, 9:11-20, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:11-20, 15:12-19)',
        // Body shadow
        'spans(D, 13:19-21, 14:19-20, 15:18-19)',
        // Body highlight
        'spans(L, 8:14-16, 9:11-14, 10:10-12)',
        // Highlight spot
        'pixels(H, 12,10, 13,10)',
        // Band around top
        'spans(G, 7:14-17, 8:13-13, 8:18-18)',
      ],
      chars: {
        B: { name: 'bomb_body', role: 'body' },
        D: { name: 'bomb_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'bomb_highlight', role: 'body', tone: 'highlight' },
        H: { name: 'specular', role: 'accessory' },
        G: { name: 'metal_cap', role: 'head' },
        A: { name: 'fuse', role: 'belt' },
        F: { name: 'spark', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 13. SPEED POTION ─────────────────────────────────────────
    {
      id: 'speed_potion_32',
      description: 'Yellow speed potion with lightning bolt label — increases movement.',
      size: 32,
      draw: [
        // Cork
        'spans(C, 7:15-16, 8:15-16)',
        // Neck
        'spans(G, 9:14-17, 10:14-17)',
        // Body
        'spans(B, 11:12-19, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:12-19)',
        // Body shadow
        'spans(D, 14:19-20, 15:19-20, 16:18-19)',
        // Body highlight
        'spans(H, 11:12-13, 12:11-12, 13:11-12)',
        // Lightning bolt label
        'pixels(A, 16,13, 15,14, 16,14, 14,15, 15,15, 16,16, 15,17)',
        // Base
        'spans(G, 17:12-19, 18:13-18)',
        // Speed lines
        'pixels(E, 10,12, 9,14, 10,16, 9,18)',
      ],
      chars: {
        B: { name: 'liquid', role: 'body' },
        D: { name: 'liquid_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        G: { name: 'glass', role: 'head' },
        C: { name: 'cork', role: 'belt' },
        A: { name: 'bolt_label', role: 'accessory' },
        E: { name: 'speed_lines', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d27d2c', base: '#deeed6', highlight: '#deeed6' },
        leg:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 14. SKELETON KEY ─────────────────────────────────────────
    {
      id: 'skeleton_key_32',
      description: 'Bone-carved master key — opens any lock in the dungeon.',
      size: 32,
      draw: [
        // Skull bow
        'spans(B, 6:12-19, 7:11-20, 8:11-20, 9:12-19)',
        // Skull highlight
        'spans(L, 6:14-17, 7:11-13)',
        // Eye sockets
        'spans(E, 7:14-15, 7:17-18)',
        // Nose
        'pixels(E, 15,8, 16,8)',
        // Teeth
        'spans(B, 9:13-14, 9:17-18)',
        // Shaft (bone)
        'spans(B, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16)',
        // Shaft shadow
        'spans(D, 10:16-16, 11:16-16, 12:16-16, 13:16-16, 14:16-16, 15:16-16, 16:16-16, 17:16-16, 18:16-16)',
        // Joint bumps
        'pixels(B, 14,13, 17,13)',
        // Teeth (key)
        'spans(B, 19:15-19, 20:15-16, 20:18-19, 21:15-19)',
        // Teeth shadow
        'spans(D, 21:18-19)',
      ],
      chars: {
        B: { name: 'bone', role: 'body' },
        D: { name: 'bone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'bone_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'void', role: 'eye' },
      },
      colors: {
        body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:  { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ─── 15. FIRE SCROLL ──────────────────────────────────────────
    {
      id: 'fire_scroll_32',
      description: 'Scroll of fireball — single-use fire magic spell.',
      size: 32,
      draw: [
        // Fire effect above
        'spans(F, 5:13-18, 6:12-19, 7:13-18)',
        // Fire core
        'pixels(C, 15,6, 16,6)',
        // Top roll
        'spans(B, 8:10-21, 9:10-21)',
        // Roll highlight
        'spans(L, 8:12-19)',
        // Parchment
        'spans(A, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20)',
        // Fire rune on parchment
        'spans(E, 11:14-17, 12:13-14, 12:17-18, 13:14-17, 14:15-16)',
        // Bottom roll
        'spans(B, 16:10-21, 17:10-21)',
        // Bottom shadow
        'spans(D, 17:10-12, 17:19-21)',
      ],
      chars: {
        B: { name: 'parchment', role: 'body' },
        D: { name: 'parchment_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'parchment_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'parchment_face', role: 'accessory' },
        E: { name: 'fire_rune', role: 'belt' },
        F: { name: 'fire_effect', role: 'head' },
        C: { name: 'fire_core', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 16. FOOD RATION ──────────────────────────────────────────
    {
      id: 'food_ration_32',
      description: 'Wrapped food ration — restores hunger in survival roguelikes.',
      size: 32,
      draw: [
        // Cloth wrapping
        'spans(B, 9:10-21, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:10-21)',
        // Wrapping shadow
        'spans(D, 13:20-22, 14:20-22, 15:19-21)',
        // Wrapping highlight
        'spans(L, 9:12-19, 10:9-11)',
        // Tie string
        'spans(G, 12:8-9, 12:22-23)',
        // Tie knot
        'spans(G, 11:7-8, 13:7-8)',
        // Bread peeking out
        'spans(A, 11:13-18, 12:12-19, 13:12-19)',
        // Bread crust
        'spans(E, 11:14-17)',
        // Cloth fold lines
        'pixels(D, 13,11, 15,14, 18,11, 20,14)',
      ],
      chars: {
        B: { name: 'cloth_wrap', role: 'body' },
        D: { name: 'cloth_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'cloth_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'string_tie', role: 'head' },
        A: { name: 'bread', role: 'accessory' },
        E: { name: 'bread_crust', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
      },
    },

    // ─── 17. SHIELD POTION ────────────────────────────────────────
    {
      id: 'shield_potion_32',
      description: 'Glowing silver potion — grants temporary damage resistance.',
      size: 32,
      draw: [
        // Cork
        'spans(C, 7:15-16, 8:15-16)',
        // Neck
        'spans(G, 9:14-17, 10:14-17)',
        // Body
        'spans(B, 11:12-19, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:12-19)',
        // Body shadow
        'spans(D, 14:19-20, 15:19-20, 16:18-19)',
        // Body highlight
        'spans(H, 11:12-13, 12:11-12, 13:11-12)',
        // Shield icon on label
        'spans(A, 12:14-17, 13:14-17, 14:14-17, 15:15-16)',
        // Shield highlight
        'pixels(E, 15,13, 16,13)',
        // Base
        'spans(G, 17:12-19, 18:13-18)',
      ],
      chars: {
        B: { name: 'silver_liquid', role: 'body' },
        D: { name: 'liquid_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        G: { name: 'glass', role: 'head' },
        C: { name: 'cork', role: 'belt' },
        A: { name: 'shield_icon', role: 'accessory' },
        E: { name: 'shield_shine', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 18. ARROW QUIVER ─────────────────────────────────────────
    {
      id: 'arrow_quiver_32',
      description: 'Leather quiver full of arrows — ranged ammo pickup.',
      size: 32,
      draw: [
        // Arrow tips sticking out
        'pixels(G, 14,4, 15,5, 16,3, 17,6)',
        // Arrow shafts
        'spans(A, 5:14-14, 5:16-16, 6:14-17, 7:14-17)',
        // Quiver body
        'spans(B, 8:13-18, 9:13-18, 10:13-18, 11:13-18, 12:13-18, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:15-16)',
        // Body shadow
        'spans(D, 10:17-18, 11:17-18, 12:17-18, 13:17-17, 14:17-17, 15:17-17, 16:17-17, 17:17-17)',
        // Body highlight
        'spans(L, 8:13-14, 9:13-14, 10:13-14, 11:13-14)',
        // Strap
        'spans(E, 8:11-12, 9:10-11, 10:10-10, 11:10-10, 12:11-12, 13:12-13)',
        // Belt buckle
        'pixels(F, 12,11)',
        // Decorative band
        'spans(G, 12:13-18)',
      ],
      chars: {
        B: { name: 'leather', role: 'body' },
        D: { name: 'leather_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'leather_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'metal_detail', role: 'head' },
        A: { name: 'arrow_shafts', role: 'accessory' },
        E: { name: 'strap', role: 'belt' },
        F: { name: 'buckle', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 19. XP ORB ───────────────────────────────────────────────
    {
      id: 'xp_orb_32',
      description: 'Floating experience orb — glows green with absorbed souls.',
      size: 32,
      draw: [
        // Outer glow
        'spans(A, 8:12-19, 9:10-21, 10:9-22, 11:9-22, 12:9-22, 13:10-21, 14:12-19)',
        // Orb body
        'spans(B, 9:13-18, 10:12-19, 11:12-19, 12:12-19, 13:13-18)',
        // Orb highlight
        'spans(L, 9:14-16, 10:12-14)',
        // Orb shadow
        'spans(D, 12:18-19, 13:17-18)',
        // Inner spark
        'pixels(H, 14,11, 15,11)',
        // Floating particles
        'pixels(A, 14,6, 18,7, 10,7, 21,10, 8,14, 22,13, 12,16, 19,16)',
      ],
      chars: {
        B: { name: 'orb', role: 'body' },
        D: { name: 'orb_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'orb_highlight', role: 'body', tone: 'highlight' },
        H: { name: 'orb_core', role: 'accessory' },
        A: { name: 'glow', role: 'head' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ─── 20. DUNGEON MAP ──────────────────────────────────────────
    {
      id: 'dungeon_map_32',
      description: 'Tattered dungeon floor map — reveals nearby rooms when picked up.',
      size: 32,
      draw: [
        // Parchment body
        'spans(B, 7:8-23, 8:7-24, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:8-23)',
        // Parchment shadow
        'spans(D, 17:22-24, 18:22-24, 19:22-23)',
        // Parchment highlight
        'spans(L, 7:10-21, 8:7-9)',
        // Torn edge (right)
        'pixels(D, 24,10, 24,13, 24,16)',
        // Map room shapes
        'spans(G, 10:10-14, 11:10-14, 12:10-14)',
        'spans(G, 10:17-21, 11:17-21)',
        'spans(G, 14:10-13, 15:10-13, 16:10-13)',
        'spans(G, 14:16-21, 15:16-21, 16:16-21, 17:16-21)',
        // Corridors connecting rooms
        'spans(G, 11:14-17, 15:13-16)',
        // X marks the spot
        'pixels(A, 18,15, 20,15, 19,16, 18,17, 20,17)',
        // Compass rose
        'pixels(A, 10,9, 9,10, 11,10, 10,11)',
      ],
      chars: {
        B: { name: 'parchment', role: 'body' },
        D: { name: 'parchment_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'parchment_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'ink_rooms', role: 'head' },
        A: { name: 'ink_mark', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

  ],
};

export default batch;
