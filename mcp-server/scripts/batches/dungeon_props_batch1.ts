/**
 * Dungeon Props Bundle — Batch 1: Storage Containers (32x32 DSL)
 * 20 unique storage prop templates for dungeon/roguelike games.
 * Neo-SNES style, DB16 palette, 5-value shading via tone chars.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'props',
  exportNames: { templates: 'DUNGEON_STORAGE_32_TEMPLATES', schemes: 'DUNGEON_STORAGE_32_COLOR_SCHEMES' },
  templates: [

    // ─── 1. WOODEN CHEST CLOSED ───────────────────────────────────
    {
      id: 'wooden_chest_closed_32',
      description: 'Classic wooden treasure chest with iron fittings — closed and locked.',
      size: 32,
      draw: [
        // Lid top
        'spans(B, 8:8-23, 9:7-24, 10:7-24)',
        // Lid shadow
        'spans(D, 10:7-8, 10:23-24)',
        // Lid highlight
        'spans(L, 8:10-21)',
        // Iron bands on lid
        'spans(G, 9:9-10, 9:21-22, 10:9-10, 10:21-22)',
        // Lock plate
        'spans(G, 11:14-17)',
        // Keyhole
        'pixels(K, 15,11, 16,11)',
        // Body front
        'spans(B, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24)',
        // Body shadow (bottom + right)
        'spans(D, 18:7-24, 19:7-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24)',
        // Body highlight (top-left)
        'spans(L, 12:7-8, 13:7-8, 14:7-8)',
        // Iron corner brackets
        'spans(G, 11:7-9, 11:22-24, 19:7-9, 19:22-24)',
        // Iron bands body
        'spans(G, 15:7-8, 15:23-24, 16:7-8, 16:23-24)',
        // Base/feet
        'spans(F, 20:8-10, 20:21-23)',
      ],
      chars: {
        B: { name: 'wood_body', role: 'body' },
        D: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'iron_fittings', role: 'head' },
        K: { name: 'keyhole', role: 'eye' },
        F: { name: 'iron_feet', role: 'boot' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:  { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 2. TREASURE CHEST OPEN ───────────────────────────────────
    {
      id: 'treasure_chest_open_32',
      description: 'Open treasure chest overflowing with gold coins and gems.',
      size: 32,
      draw: [
        // Open lid (raised back)
        'spans(B, 4:8-23, 5:7-24, 6:7-24, 7:7-24)',
        // Lid shadow
        'spans(D, 7:7-8, 7:23-24)',
        // Lid highlight
        'spans(L, 4:10-21)',
        // Lid iron bands
        'spans(G, 5:9-10, 5:21-22, 6:9-10, 6:21-22)',
        // Hinge
        'spans(G, 8:8-9, 8:22-23)',
        // Gold coins spilling out top
        'spans(A, 8:12-19, 9:10-21, 10:11-20)',
        // Gold highlight
        'pixels(E, 13,9, 17,9, 15,8)',
        // Body front
        'spans(B, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24)',
        // Body shadow
        'spans(D, 18:7-24, 19:7-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24)',
        // Body highlight
        'spans(L, 12:7-8, 13:7-8)',
        // Iron brackets
        'spans(G, 11:7-9, 11:22-24, 19:7-9, 19:22-24)',
        // Base feet
        'spans(F, 20:8-10, 20:21-23)',
      ],
      chars: {
        B: { name: 'wood_body', role: 'body' },
        D: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'iron_fittings', role: 'head' },
        A: { name: 'gold_coins', role: 'accessory' },
        E: { name: 'gold_shine', role: 'accessory', tone: 'highlight' },
        F: { name: 'iron_feet', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 3. IRON BARREL ───────────────────────────────────────────
    {
      id: 'iron_barrel_32',
      description: 'Reinforced iron barrel with riveted bands — stores dungeon supplies.',
      size: 32,
      draw: [
        // Barrel top ellipse
        'spans(B, 6:12-19, 7:10-21, 8:9-22)',
        // Top highlight
        'spans(L, 6:14-17)',
        // Iron band top
        'spans(G, 9:9-22)',
        // Barrel body
        'spans(B, 10:9-22, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23, 21:9-22)',
        // Body shadow (right side)
        'spans(D, 11:21-23, 12:21-23, 13:21-23, 14:21-23, 15:21-23, 16:21-23, 17:21-23, 18:21-23, 19:21-23, 20:21-23)',
        // Body shadow (bottom)
        'spans(D, 20:9-22, 21:9-22)',
        // Body highlight (left side)
        'spans(L, 11:8-9, 12:8-9, 13:8-9, 14:8-9, 15:8-9, 16:8-9)',
        // Iron band middle
        'spans(G, 15:8-23)',
        // Iron band bottom
        'spans(G, 21:9-22)',
        // Rivets
        'pixels(R, 10,9, 12,15, 18,15, 14,21, 20,9)',
      ],
      chars: {
        B: { name: 'iron_body', role: 'body' },
        D: { name: 'iron_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'iron_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'reinforced_bands', role: 'head' },
        R: { name: 'rivets', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 4. WOODEN BARREL ─────────────────────────────────────────
    {
      id: 'wooden_barrel_32',
      description: 'Classic oak barrel with iron hoops — common dungeon container.',
      size: 32,
      draw: [
        // Barrel top ellipse
        'spans(B, 6:12-19, 7:10-21, 8:9-22)',
        // Top highlight
        'spans(L, 6:14-17)',
        // Iron hoop top
        'spans(G, 9:9-22)',
        // Barrel staves
        'spans(B, 10:9-22, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23, 21:9-22)',
        // Stave shadow (right)
        'spans(D, 11:21-23, 12:21-23, 13:21-23, 14:21-23, 15:21-23, 16:21-23, 17:21-23, 18:21-23, 19:21-23, 20:21-23)',
        // Stave shadow (bottom)
        'spans(D, 20:9-20, 21:9-22)',
        // Stave highlight (left)
        'spans(L, 11:8-9, 12:8-9, 13:8-9, 14:8-9, 15:8-9)',
        // Stave lines (grain texture)
        'spans(D, 12:12-12, 14:16-16, 16:12-12, 18:16-16, 12:20-20, 16:20-20)',
        // Iron hoop middle
        'spans(G, 15:8-23)',
        // Iron hoop bottom
        'spans(G, 21:9-22)',
      ],
      chars: {
        B: { name: 'oak_staves', role: 'body' },
        D: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'iron_hoops', role: 'head' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 5. SUPPLY CRATE ──────────────────────────────────────────
    {
      id: 'supply_crate_32',
      description: 'Sturdy wooden supply crate with cross bracing and iron nails.',
      size: 32,
      draw: [
        // Crate top face (perspective)
        'spans(L, 7:8-23, 8:8-23, 9:8-23)',
        // Main body
        'spans(B, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23)',
        // Shadow right
        'spans(D, 10:22-23, 11:22-23, 12:22-23, 13:22-23, 14:22-23, 15:22-23, 16:22-23, 17:22-23, 18:22-23, 19:22-23, 20:22-23)',
        // Shadow bottom
        'spans(D, 19:8-23, 20:8-23)',
        // Cross brace diagonal (\ direction)
        'pixels(G, 8,11, 9,12, 11,12, 12,13, 13,14, 14,15, 15,16, 16,17, 17,18, 18,19, 19,20)',
        // Cross brace diagonal (/ direction)
        'pixels(G, 8,20, 9,19, 11,19, 12,18, 13,17, 14,16, 15,15, 16,14, 17,13, 18,12, 19,11)',
        // Corner brackets
        'spans(G, 10:8-9, 10:22-23, 20:8-9, 20:22-23)',
        // Nail heads
        'pixels(N, 8,10, 8,22, 20,10, 20,22)',
      ],
      chars: {
        B: { name: 'wood_planks', role: 'body' },
        D: { name: 'plank_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'plank_top', role: 'body', tone: 'highlight' },
        G: { name: 'cross_brace', role: 'head' },
        N: { name: 'iron_nails', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 6. CLAY URN ──────────────────────────────────────────────
    {
      id: 'clay_urn_32',
      description: 'Fragile clay urn with painted decorative band — smash for loot.',
      size: 32,
      draw: [
        // Neck/rim
        'spans(B, 6:13-18, 7:12-19)',
        // Rim highlight
        'spans(L, 6:14-17)',
        // Rim lip
        'spans(G, 7:12-19)',
        // Neck narrow
        'spans(B, 8:13-18, 9:12-19)',
        // Body widens
        'spans(B, 10:11-20, 11:10-21, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:10-21, 18:11-20)',
        // Body shadow (right)
        'spans(D, 12:20-22, 13:20-22, 14:20-22, 15:20-22, 16:20-22, 17:20-21)',
        // Body shadow (bottom)
        'spans(D, 17:10-21, 18:11-20)',
        // Body highlight (left)
        'spans(L, 11:10-11, 12:9-10, 13:9-10, 14:9-10)',
        // Decorative band
        'spans(A, 13:10-21, 14:10-21)',
        // Decorative pattern on band
        'pixels(E, 12,13, 16,13, 20,13, 12,14, 16,14, 20,14)',
        // Base
        'spans(B, 19:12-19, 20:13-18)',
        // Base shadow
        'spans(D, 20:13-18)',
      ],
      chars: {
        B: { name: 'clay_body', role: 'body' },
        D: { name: 'clay_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'clay_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'rim', role: 'head' },
        A: { name: 'decorative_band', role: 'accessory' },
        E: { name: 'pattern_detail', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 7. MIMIC CHEST ──────────────────────────────────────────
    {
      id: 'mimic_chest_32',
      description: 'Monstrous mimic disguised as a treasure chest — teeth and tongue visible.',
      size: 32,
      draw: [
        // Lid (open at angle, like a jaw)
        'spans(B, 5:8-23, 6:7-24, 7:7-24, 8:7-24)',
        // Lid shadow
        'spans(D, 8:7-8, 8:23-24)',
        // Lid highlight
        'spans(L, 5:10-21)',
        // Iron fittings on lid
        'spans(G, 6:9-10, 6:21-22)',
        // Upper teeth row
        'spans(T, 9:9-11, 9:13-15, 9:17-19, 9:21-22)',
        // Tongue
        'spans(A, 10:13-18, 11:14-17)',
        // Lower teeth row
        'spans(T, 12:9-11, 12:13-15, 12:17-19, 12:21-22)',
        // Body front
        'spans(B, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24)',
        // Body shadow
        'spans(D, 18:7-24, 19:7-24, 15:23-24, 16:23-24, 17:23-24)',
        // Body highlight
        'spans(L, 14:7-8, 15:7-8)',
        // Iron brackets
        'spans(G, 13:7-9, 13:22-24, 19:7-9, 19:22-24)',
        // Evil eye (left)
        'pixels(E, 11,10, 12,10)',
        // Evil eye (right)
        'pixels(E, 20,10, 21,10)',
        // Base feet
        'spans(F, 20:8-10, 20:21-23)',
      ],
      chars: {
        B: { name: 'wood_body', role: 'body' },
        D: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'iron_fittings', role: 'head' },
        T: { name: 'teeth', role: 'eye' },
        A: { name: 'tongue', role: 'accessory' },
        E: { name: 'evil_eyes', role: 'belt' },
        F: { name: 'iron_feet', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 8. GOLD PILE ─────────────────────────────────────────────
    {
      id: 'gold_pile_32',
      description: 'Scattered pile of gold coins, gems and a crown piece.',
      size: 32,
      draw: [
        // Crown piece sticking up
        'spans(C, 10:14-17, 11:13-18, 12:14-14, 12:17-17)',
        // Crown jewel
        'pixels(J, 15,11)',
        // Gold coins upper layer
        'spans(B, 13:10-21, 14:9-22, 15:8-23)',
        // Gold coins middle
        'spans(B, 16:7-24, 17:7-24, 18:8-23)',
        // Gold shadow
        'spans(D, 17:7-8, 17:23-24, 18:8-10, 18:21-23)',
        // Gold highlight (individual coin glints)
        'pixels(L, 11,14, 15,14, 19,14, 13,16, 17,16, 21,16, 10,18, 14,18, 18,18)',
        // Gem accents
        'pixels(J, 12,15, 20,15, 16,17)',
        // Base spread
        'spans(D, 19:9-22, 20:11-20)',
      ],
      chars: {
        B: { name: 'gold_coins', role: 'body' },
        D: { name: 'gold_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'gold_glint', role: 'body', tone: 'highlight' },
        C: { name: 'crown', role: 'head' },
        J: { name: 'gem_accent', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 9. SACK OF GOODS ────────────────────────────────────────
    {
      id: 'sack_of_goods_32',
      description: 'Burlap sack tied with rope — bulging with supplies.',
      size: 32,
      draw: [
        // Rope tie knot
        'spans(R, 7:14-17, 8:13-14, 8:17-18)',
        // Rope tie
        'spans(R, 9:15-16)',
        // Neck gathered
        'spans(B, 9:13-14, 9:17-18, 10:12-19)',
        // Body widens
        'spans(B, 11:10-21, 12:9-22, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:9-22, 19:10-21)',
        // Body shadow (right)
        'spans(D, 13:21-23, 14:21-23, 15:21-23, 16:21-23, 17:21-23, 18:21-22)',
        // Body shadow (bottom)
        'spans(D, 18:9-22, 19:10-21)',
        // Body highlight (top-left)
        'spans(L, 12:9-10, 13:8-9, 14:8-9)',
        // Cloth wrinkle lines
        'pixels(D, 14,13, 15,15, 16,12, 17,17, 16,19)',
        // Base
        'spans(D, 20:12-19)',
      ],
      chars: {
        B: { name: 'burlap', role: 'body' },
        D: { name: 'burlap_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'burlap_highlight', role: 'body', tone: 'highlight' },
        R: { name: 'rope_tie', role: 'head' },
      },
      colors: {
        body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 10. CURSED CHEST ─────────────────────────────────────────
    {
      id: 'cursed_chest_32',
      description: 'Dark enchanted chest with purple runes glowing on its surface.',
      size: 32,
      draw: [
        // Lid
        'spans(B, 8:8-23, 9:7-24, 10:7-24)',
        // Lid shadow
        'spans(D, 10:7-8, 10:23-24)',
        // Lid rune glow
        'pixels(A, 12,9, 16,9, 20,9)',
        // Lock plate (cursed)
        'spans(A, 11:14-17)',
        // Body
        'spans(B, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24)',
        // Body shadow
        'spans(D, 18:7-24, 19:7-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24)',
        // Rune symbols on body
        'pixels(A, 10,13, 14,13, 21,13, 10,16, 14,16, 21,16)',
        // Rune glow highlight
        'pixels(E, 11,13, 15,13, 11,16, 15,16)',
        // Iron brackets (dark)
        'spans(G, 11:7-9, 11:22-24, 19:7-9, 19:22-24)',
        // Chain wrapped
        'spans(G, 14:7-24, 15:7-24)',
        // Base
        'spans(F, 20:8-10, 20:21-23)',
      ],
      chars: {
        B: { name: 'dark_wood', role: 'body' },
        D: { name: 'dark_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'dark_iron', role: 'head' },
        A: { name: 'rune_glow', role: 'accessory' },
        E: { name: 'rune_bright', role: 'accessory', tone: 'highlight' },
        F: { name: 'iron_feet', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ─── 11. EXPLOSIVE BARREL ─────────────────────────────────────
    {
      id: 'explosive_barrel_32',
      description: 'Barrel marked with danger symbol — explodes when hit.',
      size: 32,
      draw: [
        // Fuse on top
        'pixels(F, 16,4, 16,5)',
        // Fuse spark
        'pixels(S, 15,3, 17,3, 16,3)',
        // Barrel top
        'spans(B, 6:12-19, 7:10-21, 8:9-22)',
        // Top highlight
        'spans(L, 6:14-17)',
        // Band top
        'spans(G, 9:9-22)',
        // Barrel body
        'spans(B, 10:9-22, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23, 21:9-22)',
        // Body shadow
        'spans(D, 11:21-23, 12:21-23, 13:21-23, 14:21-23, 15:21-23, 16:21-23, 17:21-23, 18:21-23, 19:21-23, 20:21-23, 20:8-10, 21:9-22)',
        // Body highlight
        'spans(L, 11:8-9, 12:8-9, 13:8-9, 14:8-9)',
        // Danger skull symbol
        'spans(A, 13:13-18, 14:12-19, 15:13-18)',
        // Skull eyes
        'pixels(E, 14,14, 17,14)',
        // Band middle
        'spans(G, 16:8-23)',
        // Band bottom
        'spans(G, 21:9-22)',
      ],
      chars: {
        B: { name: 'barrel_body', role: 'body' },
        D: { name: 'barrel_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'barrel_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'iron_bands', role: 'head' },
        A: { name: 'danger_symbol', role: 'accessory' },
        E: { name: 'skull_eyes', role: 'eye' },
        F: { name: 'fuse', role: 'belt' },
        S: { name: 'spark', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 12. STONE COFFER ─────────────────────────────────────────
    {
      id: 'stone_coffer_32',
      description: 'Ancient stone coffer with carved lid — holds ancient relics.',
      size: 32,
      draw: [
        // Lid top (carved stone)
        'spans(L, 8:8-23, 9:8-23)',
        // Lid front face
        'spans(B, 10:8-23, 11:8-23)',
        // Lid carved pattern
        'spans(A, 10:12-14, 10:17-19, 11:12-14, 11:17-19)',
        // Body
        'spans(B, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24)',
        // Body shadow (right)
        'spans(D, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:23-24)',
        // Body shadow (bottom)
        'spans(D, 18:7-24, 19:7-24)',
        // Body highlight (left)
        'spans(L, 13:7-8, 14:7-8, 15:7-8)',
        // Stone texture dots
        'pixels(D, 14,11, 15,16, 17,13, 16,20)',
        // Base trim
        'spans(G, 20:7-24)',
      ],
      chars: {
        B: { name: 'stone', role: 'body' },
        D: { name: 'stone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stone_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'carved_pattern', role: 'accessory' },
        G: { name: 'base_trim', role: 'head' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 13. POISON BARREL ────────────────────────────────────────
    {
      id: 'poison_barrel_32',
      description: 'Barrel of toxic sludge — green ooze drips from cracks.',
      size: 32,
      draw: [
        // Ooze drip top
        'pixels(A, 14,5, 15,6, 16,7)',
        // Barrel top
        'spans(B, 6:12-19, 7:10-21, 8:9-22)',
        // Green ooze on top
        'spans(A, 6:13-18, 7:11-20)',
        // Band top
        'spans(G, 9:9-22)',
        // Barrel body
        'spans(B, 10:9-22, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23, 21:9-22)',
        // Body shadow
        'spans(D, 11:21-23, 12:21-23, 13:21-23, 14:21-23, 15:21-23, 16:21-23, 17:21-23, 18:21-23, 19:21-23, 20:21-23, 20:8-10, 21:9-22)',
        // Body highlight
        'spans(L, 11:8-9, 12:8-9, 13:8-9)',
        // Ooze drips on body
        'spans(A, 10:14-15, 11:14-14, 12:14-14, 10:19-19, 11:19-19)',
        // Skull warning
        'pixels(E, 14,15, 17,15, 15,17)',
        // Band middle
        'spans(G, 15:8-23)',
        // Band bottom
        'spans(G, 21:9-22)',
        // Puddle base
        'spans(A, 22:10-21, 23:12-19)',
      ],
      chars: {
        B: { name: 'barrel', role: 'body' },
        D: { name: 'barrel_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'barrel_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'iron_bands', role: 'head' },
        A: { name: 'poison_ooze', role: 'accessory' },
        E: { name: 'warning_mark', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 14. TREASURE BAG ─────────────────────────────────────────
    {
      id: 'treasure_bag_32',
      description: 'Velvet drawstring bag with gold embroidery — contains coins.',
      size: 32,
      draw: [
        // Drawstring loops
        'spans(G, 7:13-14, 7:17-18)',
        // Drawstring tie
        'spans(G, 8:15-16)',
        // Gathered top
        'spans(B, 9:12-19, 10:11-20)',
        // Body
        'spans(B, 11:10-21, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:10-21, 17:11-20)',
        // Body shadow (right)
        'spans(D, 12:20-22, 13:20-22, 14:20-22, 15:20-22, 16:20-21)',
        // Body shadow (bottom)
        'spans(D, 16:10-21, 17:11-20)',
        // Body highlight (left)
        'spans(L, 11:10-11, 12:9-10, 13:9-10)',
        // Gold embroidery dollar sign
        'spans(A, 12:14-17, 13:13-14, 14:14-17, 15:17-18, 16:14-17)',
        // Coins spilling bottom
        'pixels(A, 13,18, 16,18, 12,19, 15,19, 18,19)',
        // Base
        'spans(D, 18:12-19)',
      ],
      chars: {
        B: { name: 'velvet', role: 'body' },
        D: { name: 'velvet_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'velvet_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'drawstring', role: 'head' },
        A: { name: 'gold_detail', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 15. ANCIENT VAULT ────────────────────────────────────────
    {
      id: 'ancient_vault_32',
      description: 'Massive stone vault with magical seal — requires key to open.',
      size: 32,
      draw: [
        // Top arch
        'spans(B, 5:12-19, 6:10-21, 7:9-22, 8:8-23)',
        // Arch highlight
        'spans(L, 5:14-17, 6:11-13)',
        // Walls
        'spans(B, 9:8-11, 9:20-23, 10:8-11, 10:20-23, 11:8-11, 11:20-23, 12:8-11, 12:20-23, 13:8-11, 13:20-23, 14:8-11, 14:20-23, 15:8-11, 15:20-23, 16:8-11, 16:20-23, 17:8-11, 17:20-23, 18:8-11, 18:20-23, 19:8-23)',
        // Wall shadow
        'spans(D, 9:8-8, 10:8-8, 11:8-8, 12:8-8, 13:8-8, 14:8-8, 15:8-8, 16:8-8, 17:8-8, 18:8-8, 19:8-10)',
        // Door face (recessed)
        'spans(D, 9:12-19, 10:12-19, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19, 16:12-19, 17:12-19, 18:12-19)',
        // Magic seal (circle)
        'spans(A, 11:14-17, 12:13-18, 13:13-18, 14:13-18, 15:14-17)',
        // Seal center
        'pixels(E, 15,13, 16,13)',
        // Seal glow
        'pixels(E, 14,12, 17,12, 14,15, 17,15)',
        // Base stones
        'spans(G, 20:8-23, 21:8-23)',
      ],
      chars: {
        B: { name: 'stone', role: 'body' },
        D: { name: 'stone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stone_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'magic_seal', role: 'accessory' },
        E: { name: 'seal_glow', role: 'accessory', tone: 'highlight' },
        G: { name: 'base_stone', role: 'head' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ─── 16. LOOT SATCHEL ─────────────────────────────────────────
    {
      id: 'loot_satchel_32',
      description: 'Leather adventurer satchel with buckle — holds dungeon loot.',
      size: 32,
      draw: [
        // Flap
        'spans(B, 8:10-21, 9:9-22, 10:9-22, 11:9-22)',
        // Flap highlight
        'spans(L, 8:12-19)',
        // Buckle
        'spans(G, 11:14-17)',
        // Buckle center
        'pixels(A, 15,11, 16,11)',
        // Strap
        'spans(G, 7:14-17, 6:15-16)',
        // Body
        'spans(B, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:10-21)',
        // Body shadow
        'spans(D, 17:20-22, 18:20-22, 19:19-21, 18:9-10, 19:10-11)',
        // Body highlight
        'spans(L, 12:9-10, 13:9-10)',
        // Pocket
        'spans(D, 15:12-19, 16:12-19, 17:12-19)',
        // Pocket stitch
        'pixels(G, 12,15, 19,15, 12,17, 19,17)',
        // Base
        'spans(D, 20:11-20)',
      ],
      chars: {
        B: { name: 'leather', role: 'body' },
        D: { name: 'leather_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'leather_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'buckle_metal', role: 'head' },
        A: { name: 'buckle_pin', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 17. ICE CHEST ────────────────────────────────────────────
    {
      id: 'ice_chest_32',
      description: 'Frozen treasure chest encased in magical ice crystals.',
      size: 32,
      draw: [
        // Ice crystals growing up
        'spans(A, 4:11-12, 5:11-13, 6:11-13)',
        'spans(A, 4:20-21, 5:19-21, 6:19-21)',
        // Crystal highlight
        'pixels(E, 12,5, 20,5)',
        // Lid (icy)
        'spans(B, 8:8-23, 9:7-24, 10:7-24)',
        // Lid highlight
        'spans(L, 8:10-21)',
        // Frost pattern on lid
        'pixels(E, 12,9, 16,9, 20,9)',
        // Lock (frozen over)
        'spans(A, 11:14-17)',
        // Body
        'spans(B, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24)',
        // Body shadow
        'spans(D, 18:7-24, 19:7-24, 15:23-24, 16:23-24, 17:23-24)',
        // Ice patches on body
        'spans(A, 13:8-10, 16:20-22)',
        // Iron brackets
        'spans(G, 11:7-9, 11:22-24, 19:7-9, 19:22-24)',
        // Icicles hanging
        'pixels(A, 9,20, 10,20, 10,21)',
        // Base
        'spans(G, 20:8-10, 20:21-23)',
      ],
      chars: {
        B: { name: 'frozen_wood', role: 'body' },
        D: { name: 'frozen_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'frozen_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'iron_fittings', role: 'head' },
        A: { name: 'ice_crystal', role: 'accessory' },
        E: { name: 'ice_glint', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 18. BONE CAGE ────────────────────────────────────────────
    {
      id: 'bone_cage_32',
      description: 'Hanging cage made of fused bones — contains imprisoned souls.',
      size: 32,
      draw: [
        // Chain
        'spans(G, 2:15-16, 3:15-16, 4:15-16, 5:15-16)',
        // Hook
        'spans(G, 5:14-17)',
        // Top dome (bone)
        'spans(B, 6:12-19, 7:10-21, 8:9-22)',
        // Bone highlight
        'spans(L, 6:14-17)',
        // Vertical bone bars
        'spans(B, 9:10-10, 9:15-16, 9:21-21, 10:10-10, 10:15-16, 10:21-21, 11:10-10, 11:15-16, 11:21-21, 12:10-10, 12:15-16, 12:21-21, 13:10-10, 13:15-16, 13:21-21, 14:10-10, 14:15-16, 14:21-21, 15:10-10, 15:15-16, 15:21-21, 16:10-10, 16:15-16, 16:21-21)',
        // Joint knobs
        'pixels(A, 10,9, 10,11, 15,9, 15,11, 21,9, 21,11, 10,16, 10,17, 15,16, 15,17, 21,16, 21,17)',
        // Soul glow inside
        'pixels(S, 13,12, 15,13, 18,12, 14,14, 17,14)',
        // Bottom dome
        'spans(B, 17:9-22, 18:10-21, 19:12-19)',
        // Bottom shadow
        'spans(D, 18:10-12, 18:19-21, 19:12-19)',
      ],
      chars: {
        B: { name: 'bone', role: 'body' },
        D: { name: 'bone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'bone_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'chain', role: 'head' },
        A: { name: 'joint_knobs', role: 'accessory' },
        S: { name: 'soul_glow', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 19. WEAPON RACK ──────────────────────────────────────────
    {
      id: 'weapon_rack_32',
      description: 'Wooden weapon display rack with pegs — holds swords and shields.',
      size: 32,
      draw: [
        // Back board
        'spans(B, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21)',
        // Back shadow
        'spans(D, 6:10-11, 7:10-11, 8:10-11, 9:10-11, 10:10-11, 11:10-11, 12:10-11, 13:10-11, 14:10-11, 15:10-11, 16:10-11, 17:10-11, 18:10-11)',
        // Back highlight (right)
        'spans(L, 6:20-21, 7:20-21, 8:20-21, 9:20-21)',
        // Horizontal pegs
        'spans(G, 9:8-9, 9:22-23, 13:8-9, 13:22-23, 17:8-9, 17:22-23)',
        // Vertical frame
        'spans(G, 5:10-11, 5:20-21, 19:10-11, 19:20-21)',
        // Top cross bar
        'spans(G, 5:10-21)',
        // Bottom cross bar
        'spans(G, 19:10-21)',
        // Sword hanging (simple silhouette)
        'spans(A, 7:14-15, 8:14-15, 9:14-15, 10:14-15, 11:13-16, 12:14-15, 13:14-15, 14:14-15, 15:14-15)',
        // Shield hanging (simple circle)
        'spans(A, 15:17-18, 16:16-19, 17:16-19, 18:17-18)',
      ],
      chars: {
        B: { name: 'back_board', role: 'body' },
        D: { name: 'board_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'board_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'frame', role: 'head' },
        A: { name: 'displayed_weapons', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 20. DUNGEON SAFE ─────────────────────────────────────────
    {
      id: 'dungeon_safe_32',
      description: 'Heavy iron safe with combination dial — the strongest storage.',
      size: 32,
      draw: [
        // Top
        'spans(L, 7:8-23, 8:8-23)',
        // Body
        'spans(B, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23)',
        // Shadow right
        'spans(D, 9:22-23, 10:22-23, 11:22-23, 12:22-23, 13:22-23, 14:22-23, 15:22-23, 16:22-23, 17:22-23, 18:22-23, 19:22-23, 20:22-23)',
        // Shadow bottom
        'spans(D, 19:8-23, 20:8-23)',
        // Highlight left edge
        'spans(L, 9:8-9, 10:8-9, 11:8-9, 12:8-9)',
        // Door frame
        'spans(G, 9:10-21, 20:10-21)',
        'spans(G, 10:10-10, 10:21-21, 11:10-10, 11:21-21, 12:10-10, 12:21-21, 13:10-10, 13:21-21, 14:10-10, 14:21-21, 15:10-10, 15:21-21, 16:10-10, 16:21-21, 17:10-10, 17:21-21, 18:10-10, 18:21-21, 19:10-10, 19:21-21)',
        // Combination dial
        'spans(A, 13:14-17, 14:13-18, 15:13-18, 16:14-17)',
        // Dial center
        'pixels(E, 15,14, 16,14)',
        // Handle
        'spans(G, 13:20-20, 14:20-20, 15:20-20, 16:20-20)',
        // Hinges
        'spans(G, 11:8-8, 15:8-8, 19:8-8)',
        // Bolts
        'pixels(R, 10,10, 10,21, 20,10, 20,21)',
        // Feet
        'spans(F, 21:9-10, 21:21-22)',
      ],
      chars: {
        B: { name: 'iron_body', role: 'body' },
        D: { name: 'iron_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'iron_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'frame_detail', role: 'head' },
        A: { name: 'dial', role: 'accessory' },
        E: { name: 'dial_center', role: 'eye' },
        R: { name: 'bolts', role: 'belt' },
        F: { name: 'feet', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

  ],
};

export default batch;
