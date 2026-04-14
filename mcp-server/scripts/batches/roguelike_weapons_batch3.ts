/**
 * Roguelike Weapons Bundle — Batch 3: Bows & Ranged (32x32 DSL)
 * 20 unique ranged weapon templates for roguelike games.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'weapons',
  exportNames: { templates: 'ROGUELIKE_BOWS_32_TEMPLATES', schemes: 'ROGUELIKE_BOWS_32_COLOR_SCHEMES' },
  templates: [

    // ─── 1. HUNTING SHORTBOW ────────────────────────────────────────
    {
      id: 'hunting_shortbow_32',
      description: 'Simple wooden shortbow — reliable starter ranged weapon.',
      size: 32,
      draw: [
        // Bow limb (curved arc, left side)
        'spans(B, 3:10-12, 4:9-11, 5:8-10, 6:8-10, 7:8-10, 8:8-10, 9:9-10, 10:9-11, 11:10-11, 12:10-12, 13:11-12, 14:11-13, 15:11-13, 16:11-12, 17:10-12, 18:10-11, 19:9-11, 20:9-10, 21:8-10, 22:8-10, 23:8-10, 24:8-10, 25:9-11, 26:10-12)',
        // Bow shadow (inner edge)
        'spans(D, 5:10-10, 6:10-10, 7:10-10, 8:10-10, 22:10-10, 23:10-10, 24:10-10, 25:11-11)',
        // Bow highlight (outer edge)
        'spans(L, 5:8-8, 6:8-8, 7:8-8, 21:8-8, 22:8-8, 23:8-8)',
        // Bowstring
        'spans(S, 3:13-13, 4:13-13, 5:13-13, 6:13-13, 7:13-13, 8:13-13, 9:13-13, 10:13-13, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:14-14, 18:13-13, 19:13-13, 20:13-13, 21:13-13, 22:13-13, 23:13-13, 24:13-13, 25:13-13, 26:13-13)',
        // Grip (center of bow)
        'spans(H, 13:10-13, 14:10-14, 15:10-14, 16:10-13)',
        // Arrow nocked
        'spans(A, 14:14-24)',
        'pixels(A, 25,14, 26,13, 26,15)',
      ],
      chars: {
        B: { name: 'wood_limb', role: 'body' },
        D: { name: 'limb_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'limb_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'bowstring', role: 'head' },
        H: { name: 'leather_grip', role: 'belt' },
        A: { name: 'arrow', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 2. OAK LONGBOW ────────────────────────────────────────────
    {
      id: 'oak_longbow_32',
      description: 'Tall oak longbow with deep draw — longer range than shortbow.',
      size: 32,
      draw: [
        // Tall bow limb
        'spans(B, 1:10-12, 2:9-11, 3:8-10, 4:8-10, 5:7-9, 6:7-9, 7:7-9, 8:7-9, 9:8-9, 10:8-10, 11:8-10, 12:9-10, 13:9-11, 14:9-11, 15:9-11, 16:9-11, 17:9-10, 18:8-10, 19:8-10, 20:8-9, 21:7-9, 22:7-9, 23:7-9, 24:7-9, 25:8-10, 26:8-10, 27:9-11, 28:10-12)',
        // Shadow
        'spans(D, 3:10-10, 4:10-10, 5:9-9, 6:9-9, 25:10-10, 26:10-10, 27:11-11)',
        // Highlight
        'spans(L, 5:7-7, 6:7-7, 7:7-7, 22:7-7, 23:7-7, 24:7-7)',
        // String
        'spans(S, 1:13-13, 2:13-13, 3:13-13, 4:12-12, 5:12-12, 6:12-12, 7:12-12, 8:12-12, 9:12-12, 10:12-12, 11:13-13, 12:13-13, 13:13-13, 14:14-14, 15:14-14, 16:13-13, 17:13-13, 18:13-13, 19:12-12, 20:12-12, 21:12-12, 22:12-12, 23:12-12, 24:12-12, 25:12-12, 26:13-13, 27:13-13, 28:13-13)',
        // Grip
        'spans(H, 13:9-14, 14:9-14, 15:9-14, 16:9-14)',
      ],
      chars: {
        B: { name: 'oak_limb', role: 'body' },
        D: { name: 'limb_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'limb_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'bowstring', role: 'head' },
        H: { name: 'grip', role: 'belt' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 3. RECURVE WAR BOW ─────────────────────────────────────────
    {
      id: 'recurve_war_bow_32',
      description: 'Military recurve bow with bone-tipped limbs — increased power.',
      size: 32,
      draw: [
        // Recurve limbs (tips curve outward)
        'spans(B, 2:12-14, 3:10-12, 4:9-11, 5:8-10, 6:8-10, 7:8-10, 8:9-10, 9:9-11, 10:10-11, 11:10-12, 12:10-12, 13:10-12, 14:10-12, 15:10-12, 16:10-12, 17:10-11, 18:9-11, 19:9-10, 20:8-10, 21:8-10, 22:8-10, 23:9-11, 24:10-12, 25:12-14)',
        // Recurve tips (bone)
        'spans(T, 1:13-15, 2:14-15, 26:14-15, 25:14-15)',
        // Shadow
        'spans(D, 4:11-11, 5:10-10, 6:10-10, 21:10-10, 22:10-10, 23:11-11)',
        // Highlight
        'spans(L, 5:8-8, 6:8-8, 20:8-8, 21:8-8)',
        // String
        'spans(S, 2:15-15, 3:15-15, 4:14-14, 5:14-14, 6:14-14, 7:13-13, 8:13-13, 9:13-13, 10:14-14, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:14-14, 18:13-13, 19:13-13, 20:13-13, 21:14-14, 22:14-14, 23:14-14, 24:15-15, 25:15-15)',
        // Grip
        'spans(H, 12:10-14, 13:10-14, 14:10-14, 15:10-14)',
      ],
      chars: {
        B: { name: 'bow_limb', role: 'body' },
        T: { name: 'bone_tips', role: 'accessory' },
        D: { name: 'limb_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'limb_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'bowstring', role: 'head' },
        H: { name: 'war_grip', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ─── 4. LIGHT CROSSBOW ──────────────────────────────────────────
    {
      id: 'light_crossbow_32',
      description: 'Compact crossbow for quick reloads — ideal for dungeon corridors.',
      size: 32,
      draw: [
        // Stock (horizontal)
        'spans(B, 15:12-24, 16:12-24, 17:13-23)',
        // Stock shadow
        'spans(D, 17:22-23)',
        // Bow prod (vertical)
        'spans(P, 7:11-13, 8:11-13, 9:11-13, 10:11-13, 11:11-13, 12:11-13, 13:11-13, 14:11-13, 15:11-13, 16:11-13, 17:11-13, 18:11-13, 19:11-13, 20:11-13, 21:11-13, 22:11-13, 23:11-13)',
        // Prod shadow
        'spans(W, 7:13-13, 8:13-13, 9:13-13, 10:13-13, 22:13-13, 23:13-13)',
        // Prod highlight
        'spans(V, 7:11-11, 8:11-11, 9:11-11)',
        // String
        'spans(S, 7:14-14, 8:14-14, 9:14-14, 10:14-14, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:14-14, 18:14-14, 19:14-14, 20:14-14, 21:14-14, 22:14-14, 23:14-14)',
        // Trigger mechanism
        'spans(G, 17:17-19, 18:17-18, 19:17-17)',
        // Bolt loaded
        'spans(A, 15:14-26, 16:14-14)',
        'pixels(A, 27,15, 28,14, 28,16)',
      ],
      chars: {
        B: { name: 'stock', role: 'body' },
        D: { name: 'stock_shadow', role: 'body', tone: 'shadow' },
        P: { name: 'bow_prod', role: 'head' },
        W: { name: 'prod_shadow', role: 'head', tone: 'shadow' },
        V: { name: 'prod_highlight', role: 'head', tone: 'highlight' },
        S: { name: 'string', role: 'belt' },
        G: { name: 'trigger', role: 'accessory' },
        A: { name: 'bolt', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 5. HEAVY CROSSBOW ──────────────────────────────────────────
    {
      id: 'heavy_crossbow_32',
      description: 'Massive siege crossbow with steel prod — devastating damage, slow reload.',
      size: 32,
      draw: [
        // Heavy stock
        'spans(B, 14:10-26, 15:10-26, 16:10-26, 17:11-25, 18:12-24)',
        // Stock shadow
        'spans(D, 17:24-25, 18:23-24)',
        // Steel prod (wide)
        'spans(P, 5:9-13, 6:9-13, 7:9-13, 8:9-13, 9:9-13, 10:9-13, 11:9-13, 12:9-13, 13:9-13, 14:9-13, 15:9-13, 16:9-13, 17:9-13, 18:9-13, 19:9-13, 20:9-13, 21:9-13, 22:9-13, 23:9-13, 24:9-13, 25:9-13)',
        // Prod highlight
        'spans(V, 5:9-9, 6:9-9, 7:9-9, 8:9-9)',
        // String
        'spans(S, 5:14-14, 6:14-14, 7:14-14, 8:14-14, 9:14-14, 10:14-14, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 16:14-14, 17:14-14, 18:14-14, 19:14-14, 20:14-14, 21:14-14, 22:14-14, 23:14-14, 24:14-14, 25:14-14)',
        // Trigger
        'spans(G, 18:16-18, 19:16-17, 20:16-16)',
        // Bolt
        'spans(A, 15:14-28)',
        'pixels(A, 29,15, 29,14, 30,15)',
      ],
      chars: {
        B: { name: 'heavy_stock', role: 'body' },
        D: { name: 'stock_shadow', role: 'body', tone: 'shadow' },
        P: { name: 'steel_prod', role: 'head' },
        V: { name: 'prod_highlight', role: 'head', tone: 'highlight' },
        S: { name: 'string', role: 'belt' },
        G: { name: 'mechanism', role: 'accessory' },
        A: { name: 'bolt', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        boot:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 6. FLAME BOW ───────────────────────────────────────────────
    {
      id: 'flame_bow_32',
      description: 'Enchanted bow that ignites arrows on release — sets enemies ablaze.',
      size: 32,
      draw: [
        // Bow limb
        'spans(B, 3:10-12, 4:9-11, 5:8-10, 6:8-10, 7:8-10, 8:9-10, 9:9-11, 10:10-11, 11:10-12, 12:10-12, 13:10-12, 14:10-12, 15:10-12, 16:10-12, 17:10-11, 18:9-11, 19:9-10, 20:8-10, 21:8-10, 22:8-10, 23:9-11, 24:10-12)',
        // Shadow
        'spans(D, 5:10-10, 6:10-10, 21:10-10, 22:10-10)',
        // String
        'spans(S, 3:13-13, 4:13-13, 5:13-13, 6:13-13, 7:12-12, 8:12-12, 9:13-13, 10:13-13, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:13-13, 18:13-13, 19:12-12, 20:12-12, 21:13-13, 22:13-13, 23:13-13, 24:13-13)',
        // Grip
        'spans(H, 12:10-14, 13:10-14, 14:10-14, 15:10-14)',
        // Fire particles
        'pixels(E, 7,7, 5,6, 9,8, 20,7, 22,6, 18,8, 13,4, 14,25)',
      ],
      chars: {
        B: { name: 'fire_limb', role: 'body' },
        D: { name: 'limb_shadow', role: 'body', tone: 'shadow' },
        S: { name: 'string', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        E: { name: 'fire_sparks', role: 'eye' },
      },
      colors: {
        body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:  { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 7. FROST BOW ───────────────────────────────────────────────
    {
      id: 'frost_bow_32',
      description: 'Ice-encrusted bow that slows targets with frozen arrows.',
      size: 32,
      draw: [
        'spans(B, 3:10-12, 4:9-11, 5:8-10, 6:8-10, 7:8-10, 8:9-10, 9:9-11, 10:10-11, 11:10-12, 12:10-12, 13:10-12, 14:10-12, 15:10-12, 16:10-12, 17:10-11, 18:9-11, 19:9-10, 20:8-10, 21:8-10, 22:8-10, 23:9-11, 24:10-12)',
        'spans(D, 5:10-10, 6:10-10, 21:10-10, 22:10-10)',
        'spans(S, 3:13-13, 4:13-13, 5:13-13, 6:12-12, 7:12-12, 8:12-12, 9:13-13, 10:13-13, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:13-13, 18:13-13, 19:12-12, 20:12-12, 21:12-12, 22:13-13, 23:13-13, 24:13-13)',
        'spans(H, 12:10-14, 13:10-14, 14:10-14, 15:10-14)',
        // Ice crystals on limbs
        'pixels(E, 7,7, 5,9, 22,7, 24,9, 9,5, 18,5)',
      ],
      chars: {
        B: { name: 'ice_limb', role: 'body' },
        D: { name: 'limb_shadow', role: 'body', tone: 'shadow' },
        S: { name: 'string', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        E: { name: 'ice_crystals', role: 'eye' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:  { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 8. POISON BOW ──────────────────────────────────────────────
    {
      id: 'poison_bow_32',
      description: 'Venomous bow dripping with toxic sap — poisons on hit.',
      size: 32,
      draw: [
        'spans(B, 3:10-12, 4:9-11, 5:8-10, 6:8-10, 7:8-10, 8:9-10, 9:9-11, 10:10-11, 11:10-12, 12:10-12, 13:10-12, 14:10-12, 15:10-12, 16:10-12, 17:10-11, 18:9-11, 19:9-10, 20:8-10, 21:8-10, 22:8-10, 23:9-11, 24:10-12)',
        'spans(D, 5:10-10, 6:10-10, 21:10-10, 22:10-10)',
        'spans(S, 3:13-13, 4:13-13, 5:13-13, 6:12-12, 7:12-12, 8:12-12, 9:13-13, 10:13-13, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:13-13, 18:13-13, 19:12-12, 20:12-12, 21:12-12, 22:13-13, 23:13-13, 24:13-13)',
        'spans(H, 12:10-14, 13:10-14, 14:10-14, 15:10-14)',
        // Poison drips
        'pixels(E, 8,11, 6,12, 22,11, 24,12, 10,26, 17,3)',
      ],
      chars: {
        B: { name: 'toxic_limb', role: 'body' },
        D: { name: 'limb_shadow', role: 'body', tone: 'shadow' },
        S: { name: 'string', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        E: { name: 'poison_drips', role: 'eye' },
      },
      colors: {
        body: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:  { shadow: '#346524', base: '#dad45e', highlight: '#dad45e' },
      },
    },

    // ─── 9. SHADOW BOW ──────────────────────────────────────────────
    {
      id: 'shadow_bow_32',
      description: 'Dark bow that fires silent arrows — critical hit from stealth.',
      size: 32,
      draw: [
        'spans(B, 3:10-12, 4:9-11, 5:8-10, 6:8-10, 7:8-10, 8:9-10, 9:9-11, 10:10-11, 11:10-12, 12:10-12, 13:10-12, 14:10-12, 15:10-12, 16:10-12, 17:10-11, 18:9-11, 19:9-10, 20:8-10, 21:8-10, 22:8-10, 23:9-11, 24:10-12)',
        'spans(S, 3:13-13, 4:13-13, 5:12-12, 6:12-12, 7:12-12, 8:12-12, 9:13-13, 10:13-13, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:13-13, 18:13-13, 19:12-12, 20:12-12, 21:12-12, 22:12-12, 23:13-13, 24:13-13)',
        'spans(H, 12:10-14, 13:10-14, 14:10-14, 15:10-14)',
        'pixels(E, 5,7, 22,7, 14,4, 14,24)',
      ],
      chars: {
        B: { name: 'dark_limb', role: 'body' },
        S: { name: 'string', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        E: { name: 'shadow_wisps', role: 'eye' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head: { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:  { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
      },
    },

    // ─── 10. ELVEN GREATBOW ─────────────────────────────────────────
    {
      id: 'elven_greatbow_32',
      description: 'Ornate elven bow with golden filigree — extreme range and accuracy.',
      size: 32,
      draw: [
        // Elegant tall bow
        'spans(B, 1:10-12, 2:9-11, 3:8-10, 4:8-10, 5:7-9, 6:7-9, 7:7-9, 8:8-9, 9:8-10, 10:9-10, 11:9-11, 12:9-11, 13:9-11, 14:9-11, 15:9-11, 16:9-11, 17:9-10, 18:8-10, 19:8-9, 20:7-9, 21:7-9, 22:7-9, 23:8-10, 24:8-10, 25:9-11, 26:10-12)',
        'spans(L, 5:7-7, 6:7-7, 7:7-7, 21:7-7, 22:7-7)',
        // Gold filigree on limbs
        'pixels(A, 9,4, 10,5, 8,7, 9,22, 10,23, 8,21)',
        // String
        'spans(S, 1:13-13, 2:13-13, 3:12-12, 4:12-12, 5:12-12, 6:12-12, 7:12-12, 8:12-12, 9:13-13, 10:13-13, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:13-13, 18:13-13, 19:12-12, 20:12-12, 21:12-12, 22:12-12, 23:12-12, 24:13-13, 25:13-13, 26:13-13)',
        // Grip
        'spans(H, 12:9-14, 13:9-14, 14:9-14, 15:9-14)',
      ],
      chars: {
        B: { name: 'elven_limb', role: 'body' },
        L: { name: 'limb_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'gold_filigree', role: 'accessory' },
        S: { name: 'string', role: 'head' },
        H: { name: 'silk_grip', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ─── 11. BONE CROSSBOW ──────────────────────────────────────────
    {
      id: 'bone_crossbow_32',
      description: 'Crossbow assembled from bones and sinew — undead dungeon loot.',
      size: 32,
      draw: [
        // Bone stock
        'spans(B, 15:12-24, 16:12-24, 17:13-23)',
        // Bone prod
        'spans(P, 7:11-13, 8:11-13, 9:11-13, 10:11-13, 11:11-13, 12:11-13, 13:11-13, 14:11-13, 15:11-13, 16:11-13, 17:11-13, 18:11-13, 19:11-13, 20:11-13, 21:11-13, 22:11-13, 23:11-13)',
        // Sinew string
        'spans(S, 7:14-14, 8:14-14, 9:14-14, 10:14-14, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:14-14, 18:14-14, 19:14-14, 20:14-14, 21:14-14, 22:14-14, 23:14-14)',
        // Trigger (bone)
        'spans(G, 17:17-19, 18:17-18)',
        // Bone bolt
        'spans(A, 15:14-26)',
        'pixels(A, 27,15)',
      ],
      chars: {
        B: { name: 'bone_stock', role: 'body' },
        P: { name: 'bone_prod', role: 'head' },
        S: { name: 'sinew_string', role: 'belt' },
        G: { name: 'trigger', role: 'accessory' },
        A: { name: 'bone_bolt', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#d2aa99' },
        boot:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── 12. CRYSTAL BOW ────────────────────────────────────────────
    {
      id: 'crystal_bow_roguelike_32',
      description: 'Transparent crystalline bow that fires shards of pure magic.',
      size: 32,
      draw: [
        'spans(B, 3:10-12, 4:9-11, 5:8-10, 6:8-10, 7:8-10, 8:9-10, 9:9-11, 10:10-11, 11:10-12, 12:10-12, 13:10-12, 14:10-12, 15:10-12, 16:10-12, 17:10-11, 18:9-11, 19:9-10, 20:8-10, 21:8-10, 22:8-10, 23:9-11, 24:10-12)',
        'spans(L, 3:10-10, 4:9-9, 5:8-8, 6:8-8, 22:8-8, 23:9-9, 24:10-10)',
        'spans(S, 3:13-13, 4:13-13, 5:12-12, 6:12-12, 7:12-12, 8:12-12, 9:13-13, 10:13-13, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:13-13, 18:13-13, 19:12-12, 20:12-12, 21:12-12, 22:12-12, 23:13-13, 24:13-13)',
        'spans(H, 12:10-14, 13:10-14, 14:10-14, 15:10-14)',
        'pixels(E, 6,7, 9,5, 19,5, 22,7)',
      ],
      chars: {
        B: { name: 'crystal_limb', role: 'body' },
        L: { name: 'crystal_glow', role: 'body', tone: 'highlight' },
        S: { name: 'energy_string', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        E: { name: 'sparkles', role: 'eye' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        head: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        belt: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:  { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 13. STORM BOW ──────────────────────────────────────────────
    {
      id: 'storm_bow_roguelike_32',
      description: 'Lightning-charged bow with crackling string — chain lightning arrows.',
      size: 32,
      draw: [
        'spans(B, 3:10-12, 4:9-11, 5:8-10, 6:8-10, 7:8-10, 8:9-10, 9:9-11, 10:10-11, 11:10-12, 12:10-12, 13:10-12, 14:10-12, 15:10-12, 16:10-12, 17:10-11, 18:9-11, 19:9-10, 20:8-10, 21:8-10, 22:8-10, 23:9-11, 24:10-12)',
        'spans(S, 3:13-13, 4:13-13, 5:12-12, 6:12-12, 7:12-12, 8:12-12, 9:13-13, 10:13-13, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:13-13, 18:13-13, 19:12-12, 20:12-12, 21:12-12, 22:12-12, 23:13-13, 24:13-13)',
        'spans(H, 12:10-14, 13:10-14, 14:10-14, 15:10-14)',
        // Lightning sparks
        'pixels(E, 5,7, 7,5, 21,5, 23,7, 3,14, 24,14, 13,2, 14,26)',
      ],
      chars: {
        B: { name: 'storm_limb', role: 'body' },
        S: { name: 'crackling_string', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        E: { name: 'lightning', role: 'eye' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:  { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 14. VOID CROSSBOW ──────────────────────────────────────────
    {
      id: 'void_crossbow_32',
      description: 'Crossbow infused with void energy — bolts phase through walls.',
      size: 32,
      draw: [
        'spans(B, 15:12-24, 16:12-24, 17:13-23)',
        'spans(P, 7:11-13, 8:11-13, 9:11-13, 10:11-13, 11:11-13, 12:11-13, 13:11-13, 14:11-13, 15:11-13, 16:11-13, 17:11-13, 18:11-13, 19:11-13, 20:11-13, 21:11-13, 22:11-13, 23:11-13)',
        'spans(S, 7:14-14, 8:14-14, 9:14-14, 10:14-14, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:14-14, 18:14-14, 19:14-14, 20:14-14, 21:14-14, 22:14-14, 23:14-14)',
        'spans(G, 17:17-19, 18:17-18)',
        'pixels(E, 9,10, 21,10, 15,7, 15,23, 20,16, 10,16)',
      ],
      chars: {
        B: { name: 'void_stock', role: 'body' },
        P: { name: 'void_prod', role: 'head' },
        S: { name: 'energy_string', role: 'belt' },
        G: { name: 'trigger', role: 'accessory' },
        E: { name: 'void_glow', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },
        belt:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 15. MECHANICAL REPEATER ────────────────────────────────────
    {
      id: 'mechanical_repeater_32',
      description: 'Steampunk repeating crossbow with gear mechanism — rapid fire.',
      size: 32,
      draw: [
        // Stock
        'spans(B, 14:10-24, 15:10-24, 16:10-24, 17:11-23)',
        // Prod
        'spans(P, 8:9-13, 9:9-13, 10:9-13, 11:9-13, 12:9-13, 13:9-13, 14:9-13, 16:9-13, 17:9-13, 18:9-13, 19:9-13, 20:9-13, 21:9-13, 22:9-13)',
        // String
        'spans(S, 8:14-14, 9:14-14, 10:14-14, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 16:14-14, 17:14-14, 18:14-14, 19:14-14, 20:14-14, 21:14-14, 22:14-14)',
        // Gear mechanism (center)
        'circle(11,15,2,G)',
        'pixels(E, 11,15)',
        // Bolt magazine (top of stock)
        'spans(A, 12:15-22, 13:15-22)',
        // Trigger
        'spans(G, 18:16-18, 19:16-17)',
      ],
      chars: {
        B: { name: 'wood_stock', role: 'body' },
        P: { name: 'steel_prod', role: 'head' },
        S: { name: 'string', role: 'belt' },
        G: { name: 'gears', role: 'accessory' },
        E: { name: 'gear_shine', role: 'eye' },
        A: { name: 'magazine', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 16. RUNIC BOW ──────────────────────────────────────────────
    {
      id: 'runic_bow_roguelike_32',
      description: 'Ancient bow inscribed with glowing runes — arrows seek targets.',
      size: 32,
      draw: [
        'spans(B, 3:10-12, 4:9-11, 5:8-10, 6:8-10, 7:8-10, 8:9-10, 9:9-11, 10:10-11, 11:10-12, 12:10-12, 13:10-12, 14:10-12, 15:10-12, 16:10-12, 17:10-11, 18:9-11, 19:9-10, 20:8-10, 21:8-10, 22:8-10, 23:9-11, 24:10-12)',
        'spans(S, 3:13-13, 4:13-13, 5:12-12, 6:12-12, 7:12-12, 8:12-12, 9:13-13, 10:13-13, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:13-13, 18:13-13, 19:12-12, 20:12-12, 21:12-12, 22:12-12, 23:13-13, 24:13-13)',
        'spans(H, 12:10-14, 13:10-14, 14:10-14, 15:10-14)',
        // Rune dots on limbs
        'pixels(E, 9,5, 10,7, 9,9, 10,19, 9,21, 10,23)',
      ],
      chars: {
        B: { name: 'runic_limb', role: 'body' },
        S: { name: 'string', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        E: { name: 'rune_glow', role: 'eye' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:  { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 17. ANCIENT BALLISTA BOW ───────────────────────────────────
    {
      id: 'ancient_ballista_bow_32',
      description: 'Massive bow resembling a hand-held ballista — devastating single shots.',
      size: 32,
      draw: [
        // Extra wide limbs
        'spans(B, 2:9-13, 3:8-12, 4:7-11, 5:7-11, 6:7-10, 7:7-10, 8:8-10, 9:8-11, 10:9-11, 11:9-12, 12:10-12, 13:10-12, 14:10-12, 15:10-12, 16:10-12, 17:10-12, 18:9-11, 19:9-11, 20:8-10, 21:7-10, 22:7-10, 23:7-11, 24:8-12, 25:9-13)',
        // Shadow
        'spans(D, 4:11-11, 5:11-11, 6:10-10, 22:10-10, 23:11-11, 24:12-12)',
        // Highlight
        'spans(L, 4:7-7, 5:7-7, 6:7-7, 21:7-7, 22:7-7)',
        // String
        'spans(S, 2:14-14, 3:14-14, 4:14-14, 5:13-13, 6:13-13, 7:13-13, 8:13-13, 9:13-13, 10:14-14, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:14-14, 18:13-13, 19:13-13, 20:13-13, 21:13-13, 22:13-13, 23:14-14, 24:14-14, 25:14-14)',
        // Grip
        'spans(H, 12:10-14, 13:10-14, 14:10-14, 15:10-14)',
        // Ballista bolt
        'spans(A, 14:14-28)',
        'pixels(A, 29,14, 30,13, 30,15)',
      ],
      chars: {
        B: { name: 'heavy_limb', role: 'body' },
        D: { name: 'limb_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'limb_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'string', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        A: { name: 'ballista_bolt', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 18. VINE BOW ───────────────────────────────────────────────
    {
      id: 'vine_bow_roguelike_32',
      description: 'Living bow grown from enchanted vines — regenerates durability over time.',
      size: 32,
      draw: [
        'spans(B, 3:10-12, 4:9-11, 5:8-10, 6:8-10, 7:8-10, 8:9-10, 9:9-11, 10:10-11, 11:10-12, 12:10-12, 13:10-12, 14:10-12, 15:10-12, 16:10-12, 17:10-11, 18:9-11, 19:9-10, 20:8-10, 21:8-10, 22:8-10, 23:9-11, 24:10-12)',
        'spans(S, 3:13-13, 4:13-13, 5:12-12, 6:12-12, 7:12-12, 8:12-12, 9:13-13, 10:13-13, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:13-13, 18:13-13, 19:12-12, 20:12-12, 21:12-12, 22:12-12, 23:13-13, 24:13-13)',
        'spans(H, 12:10-14, 13:10-14, 14:10-14, 15:10-14)',
        // Vine tendrils
        'pixels(V, 7,7, 6,6, 21,7, 22,6, 5,14, 24,14)',
        // Flower buds
        'pixels(E, 6,5, 22,5)',
      ],
      chars: {
        B: { name: 'vine_limb', role: 'body' },
        S: { name: 'vine_string', role: 'head' },
        H: { name: 'bark_grip', role: 'belt' },
        V: { name: 'tendrils', role: 'accessory' },
        E: { name: 'flower_buds', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#346524', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#346524', base: '#346524', highlight: '#854c30' },
        eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 19. DEMON BOW ──────────────────────────────────────────────
    {
      id: 'demon_bow_32',
      description: 'Hellish bow forged from demon horns — arrows explode on impact.',
      size: 32,
      draw: [
        'spans(B, 3:10-12, 4:9-11, 5:8-10, 6:8-10, 7:8-10, 8:9-10, 9:9-11, 10:10-11, 11:10-12, 12:10-12, 13:10-12, 14:10-12, 15:10-12, 16:10-12, 17:10-11, 18:9-11, 19:9-10, 20:8-10, 21:8-10, 22:8-10, 23:9-11, 24:10-12)',
        // Horn-like tips
        'spans(T, 1:11-13, 2:10-12, 25:10-12, 26:11-13)',
        'spans(S, 3:13-13, 4:13-13, 5:12-12, 6:12-12, 7:12-12, 8:12-12, 9:13-13, 10:13-13, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:13-13, 18:13-13, 19:12-12, 20:12-12, 21:12-12, 22:12-12, 23:13-13, 24:13-13)',
        'spans(H, 12:10-14, 13:10-14, 14:10-14, 15:10-14)',
        'pixels(E, 5,7, 22,7, 13,2, 14,26)',
      ],
      chars: {
        B: { name: 'demon_limb', role: 'body' },
        T: { name: 'horn_tips', role: 'accessory' },
        S: { name: 'sinew_string', role: 'head' },
        H: { name: 'flesh_grip', role: 'belt' },
        E: { name: 'hellfire', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 20. CELESTIAL BOW ──────────────────────────────────────────
    {
      id: 'celestial_bow_32',
      description: 'Holy bow of divine light — arrows smite undead and demons.',
      size: 32,
      draw: [
        'spans(B, 3:10-12, 4:9-11, 5:8-10, 6:8-10, 7:8-10, 8:9-10, 9:9-11, 10:10-11, 11:10-12, 12:10-12, 13:10-12, 14:10-12, 15:10-12, 16:10-12, 17:10-11, 18:9-11, 19:9-10, 20:8-10, 21:8-10, 22:8-10, 23:9-11, 24:10-12)',
        'spans(L, 3:10-10, 4:9-9, 5:8-8, 6:8-8, 22:8-8, 23:9-9, 24:10-10)',
        'spans(S, 3:13-13, 4:13-13, 5:12-12, 6:12-12, 7:12-12, 8:12-12, 9:13-13, 10:13-13, 11:14-14, 12:14-14, 13:14-14, 14:14-14, 15:14-14, 16:14-14, 17:13-13, 18:13-13, 19:12-12, 20:12-12, 21:12-12, 22:12-12, 23:13-13, 24:13-13)',
        'spans(H, 12:10-14, 13:10-14, 14:10-14, 15:10-14)',
        // Divine rays
        'pixels(E, 5,6, 7,4, 22,6, 20,4, 3,14, 24,14, 13,1, 14,27)',
      ],
      chars: {
        B: { name: 'divine_limb', role: 'body' },
        L: { name: 'divine_glow', role: 'body', tone: 'highlight' },
        S: { name: 'holy_string', role: 'head' },
        H: { name: 'silk_grip', role: 'belt' },
        E: { name: 'divine_rays', role: 'eye' },
      },
      colors: {
        body: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:  { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
