/**
 * Roguelike Weapons Bundle — Batch 1: Swords & Blades (32x32 DSL)
 * 20 unique sword templates for roguelike games.
 * Neo-SNES style, DB16 palette, 5-value shading via tone chars.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'weapons',
  exportNames: { templates: 'ROGUELIKE_SWORDS_32_TEMPLATES', schemes: 'ROGUELIKE_SWORDS_32_COLOR_SCHEMES' },
  templates: [

    // ─── 1. RUSTY SHORTSWORD ────────────────────────────────────────
    {
      id: 'rusty_shortsword_32',
      description: 'Worn iron shortsword with rust patches — the classic roguelike starter weapon.',
      size: 32,
      draw: [
        // Blade
        'spans(B, 6:15-16, 7:14-17, 8:13-18, 9:13-18, 10:13-18, 11:13-18, 12:13-18, 13:13-18, 14:13-18, 15:13-18, 16:13-18, 17:13-18)',
        // Blade shadow (right edge)
        'spans(D, 8:18-18, 9:18-18, 10:18-18, 11:18-18, 12:18-18, 13:18-18, 14:18-18, 15:18-18, 16:18-18, 17:18-18)',
        // Blade highlight (left edge)
        'spans(L, 8:13-13, 9:13-13, 10:13-13, 11:13-13, 12:13-13)',
        // Rust spots
        'pixels(R, 16,9, 14,12, 17,15)',
        // Guard
        'spans(G, 18:10-21, 19:11-20)',
        // Grip
        'spans(H, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17)',
        // Pommel
        'spans(P, 26:13-18, 27:14-17)',
      ],
      chars: {
        B: { name: 'blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        R: { name: 'rust_spots', role: 'accessory' },
        G: { name: 'crossguard', role: 'head' },
        H: { name: 'leather_grip', role: 'belt' },
        P: { name: 'iron_pommel', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 2. IRON LONGSWORD ──────────────────────────────────────────
    {
      id: 'iron_longsword_32',
      description: 'Reliable iron longsword with a straight blade and leather-wrapped grip.',
      size: 32,
      draw: [
        // Blade
        'spans(B, 2:15-16, 3:14-17, 4:13-18, 5:13-18, 6:13-18, 7:13-18, 8:13-18, 9:13-18, 10:13-18, 11:13-18, 12:13-18, 13:13-18, 14:13-18, 15:13-18, 16:13-18, 17:13-18)',
        // Blade shadow
        'spans(D, 4:18-18, 5:18-18, 6:18-18, 7:18-18, 8:18-18, 9:18-18, 10:18-18, 11:18-18, 12:18-18, 13:18-18, 14:18-18, 15:18-18, 16:18-18, 17:18-18)',
        // Blade highlight
        'spans(L, 4:13-13, 5:13-13, 6:13-13, 7:13-13, 8:13-13, 9:13-13, 10:13-13)',
        // Fuller (center groove)
        'spans(F, 5:15-16, 6:15-16, 7:15-16, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16)',
        // Guard
        'spans(G, 18:9-22, 19:10-21)',
        // Grip
        'spans(H, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17, 26:14-17)',
        // Pommel
        'spans(P, 27:13-18, 28:14-17)',
      ],
      chars: {
        B: { name: 'blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        F: { name: 'fuller', role: 'body', tone: 'shadow' },
        G: { name: 'crossguard', role: 'head' },
        H: { name: 'leather_grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 3. ENCHANTED RAPIER ────────────────────────────────────────
    {
      id: 'enchanted_rapier_32',
      description: 'Elegant thin rapier infused with arcane energy, trailing blue sparkles.',
      size: 32,
      draw: [
        // Thin blade
        'spans(B, 2:15-16, 3:15-16, 4:15-16, 5:15-16, 6:15-16, 7:15-16, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16)',
        // Blade highlight (left pixel)
        'spans(L, 3:15-15, 4:15-15, 5:15-15, 6:15-15, 7:15-15, 8:15-15)',
        // Ornate guard (swept hilt)
        'spans(G, 18:10-21, 19:9-11, 19:20-22)',
        'spans(J, 19:9-9, 19:22-22)',
        // Grip
        'spans(H, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16)',
        // Pommel gem
        'spans(P, 25:14-17, 26:15-16)',
        // Blue magic sparkles
        'pixels(E, 12,4, 19,7, 11,10, 20,13, 12,16)',
      ],
      chars: {
        B: { name: 'blade', role: 'body' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        G: { name: 'swept_guard', role: 'head' },
        J: { name: 'guard_shadow', role: 'head', tone: 'shadow' },
        H: { name: 'wrapped_grip', role: 'belt' },
        P: { name: 'gem_pommel', role: 'accessory' },
        E: { name: 'magic_sparkles', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 4. CURSED GREATSWORD ───────────────────────────────────────
    {
      id: 'cursed_greatsword_32',
      description: 'Massive dark greatsword pulsing with cursed red energy.',
      size: 32,
      draw: [
        // Wide blade
        'spans(B, 1:15-16, 2:14-17, 3:13-18, 4:12-19, 5:12-19, 6:12-19, 7:12-19, 8:12-19, 9:12-19, 10:12-19, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19, 16:12-19, 17:12-19)',
        // Blade shadow (right + bottom)
        'spans(D, 4:19-19, 5:19-19, 6:19-19, 7:19-19, 8:19-19, 9:19-19, 10:19-19, 11:19-19, 12:19-19, 13:19-19, 14:19-19, 15:19-19, 16:12-19, 17:12-19)',
        // Blade highlight (left edge)
        'spans(L, 4:12-12, 5:12-12, 6:12-12, 7:12-12, 8:12-12, 9:12-12, 10:12-12)',
        // Cursed glow veins
        'pixels(E, 15,5, 16,8, 14,11, 17,14, 15,17)',
        // Guard (heavy cross)
        'spans(G, 18:8-23, 19:9-22, 20:10-21)',
        // Long grip
        'spans(H, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17, 26:14-17, 27:14-17)',
        // Pommel
        'spans(P, 28:13-18, 29:14-17)',
      ],
      chars: {
        B: { name: 'dark_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        E: { name: 'curse_veins', role: 'eye' },
        G: { name: 'heavy_guard', role: 'head' },
        H: { name: 'dark_grip', role: 'belt' },
        P: { name: 'skull_pommel', role: 'boot' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:  { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        boot: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── 5. FLAME CLEAVER ───────────────────────────────────────────
    {
      id: 'flame_cleaver_32',
      description: 'Wide meat-cleaver blade wreathed in magical flames.',
      size: 32,
      draw: [
        // Wide blade (single-edge, flat left, angled right)
        'spans(B, 3:16-18, 4:15-19, 5:14-20, 6:13-20, 7:13-20, 8:13-20, 9:13-20, 10:13-20, 11:13-20, 12:13-20, 13:13-20, 14:13-20, 15:13-20, 16:13-20)',
        // Blade shadow
        'spans(D, 6:20-20, 7:20-20, 8:20-20, 9:20-20, 10:20-20, 11:20-20, 12:20-20, 13:20-20, 14:20-20, 15:20-20, 16:13-14)',
        // Blade highlight (left edge)
        'spans(L, 6:13-13, 7:13-13, 8:13-13, 9:13-13, 10:13-13, 11:13-13)',
        // Fire particles
        'pixels(E, 12,2, 21,4, 11,5, 22,7, 13,3)',
        // Guard (simple)
        'spans(G, 17:11-20, 18:12-19)',
        // Grip
        'spans(H, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16)',
        // Pommel
        'spans(P, 25:14-17, 26:15-16)',
      ],
      chars: {
        B: { name: 'blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        E: { name: 'fire_sparks', role: 'eye' },
        G: { name: 'guard', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:  { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 6. FROST KATANA ────────────────────────────────────────────
    {
      id: 'frost_katana_32',
      description: 'Curved ice-blue katana that freezes enemies on contact.',
      size: 32,
      draw: [
        // Curved blade (shifts left toward top)
        'spans(B, 2:13-14, 3:13-15, 4:13-16, 5:14-16, 6:14-17, 7:14-17, 8:14-17, 9:15-17, 10:15-17, 11:15-17, 12:15-18, 13:15-18, 14:15-18, 15:15-18, 16:15-18)',
        // Blade shadow (right)
        'spans(D, 6:17-17, 7:17-17, 8:17-17, 9:17-17, 10:17-17, 12:18-18, 13:18-18, 14:18-18, 15:18-18, 16:18-18)',
        // Blade highlight (left)
        'spans(L, 2:13-13, 3:13-13, 4:13-13, 5:14-14, 6:14-14, 7:14-14, 8:14-14)',
        // Ice crystals
        'pixels(E, 11,3, 19,6, 12,9, 20,12)',
        // Tsuba (round guard)
        'circle(16,17,2,G)',
        // Grip (tsuka)
        'spans(H, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16, 25:15-16)',
        // Kashira (pommel cap)
        'spans(P, 26:14-17, 27:15-16)',
      ],
      chars: {
        B: { name: 'ice_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        E: { name: 'ice_crystals', role: 'eye' },
        G: { name: 'tsuba', role: 'head' },
        H: { name: 'tsuka_grip', role: 'belt' },
        P: { name: 'kashira', role: 'boot' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:  { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 7. LIGHTNING FALCHION ──────────────────────────────────────
    {
      id: 'lightning_falchion_32',
      description: 'Single-edged falchion crackling with electric charge.',
      size: 32,
      draw: [
        // Curved wide blade (wider near tip)
        'spans(B, 3:14-16, 4:13-17, 5:12-18, 6:12-19, 7:12-19, 8:12-18, 9:13-18, 10:13-18, 11:13-18, 12:13-18, 13:13-17, 14:14-17, 15:14-17, 16:14-17)',
        // Blade shadow
        'spans(D, 6:19-19, 7:19-19, 8:18-18, 9:18-18, 10:18-18, 11:18-18, 12:18-18)',
        // Blade highlight
        'spans(L, 5:12-12, 6:12-12, 7:12-12, 8:12-12, 9:13-13, 10:13-13)',
        // Lightning sparks
        'pixels(E, 10,4, 20,6, 11,8, 21,11, 12,14)',
        // Guard
        'spans(G, 17:11-20, 18:12-19)',
        // Grip
        'spans(H, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        // Pommel
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        B: { name: 'blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        E: { name: 'lightning_sparks', role: 'eye' },
        G: { name: 'guard', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:  { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 8. VOID BLADE ──────────────────────────────────────────────
    {
      id: 'void_blade_32',
      description: 'Ethereal dark sword pulled from the void — light bends around its edge.',
      size: 32,
      draw: [
        // Narrow blade
        'spans(B, 2:15-16, 3:14-17, 4:14-17, 5:14-17, 6:14-17, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17)',
        // Blade shadow (entire right half darker)
        'spans(D, 3:17-17, 4:17-17, 5:17-17, 6:17-17, 7:17-17, 8:17-17, 9:17-17, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17, 17:17-17)',
        // Void aura (purple glow pixels around blade)
        'pixels(E, 12,3, 19,5, 12,7, 19,9, 12,11, 19,13, 12,15)',
        // Guard
        'spans(G, 18:10-21, 19:11-20)',
        // Grip
        'spans(H, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17)',
        // Pommel
        'spans(P, 26:13-18, 27:14-17)',
      ],
      chars: {
        B: { name: 'void_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        E: { name: 'void_aura', role: 'eye' },
        G: { name: 'guard', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
        eye:  { shadow: '#442434', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        boot: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 9. CRYSTAL SWORD ───────────────────────────────────────────
    {
      id: 'crystal_sword_32',
      description: 'Translucent crystalline blade that refracts light into prismatic shards.',
      size: 32,
      draw: [
        // Faceted blade (irregular edges for crystal look)
        'spans(B, 3:15-16, 4:14-17, 5:13-18, 6:13-18, 7:12-18, 8:13-18, 9:13-19, 10:12-18, 11:13-18, 12:13-19, 13:12-18, 14:13-18, 15:13-18, 16:13-18)',
        // Crystal shadow
        'spans(D, 7:12-12, 9:19-19, 10:12-12, 12:19-19, 13:12-12)',
        // Crystal highlight (facet reflections)
        'spans(L, 5:14-14, 6:14-14, 8:15-15, 10:14-14, 12:15-15, 14:14-14)',
        // Inner glow
        'pixels(E, 15,6, 16,10, 15,14)',
        // Guard
        'spans(G, 17:10-21, 18:11-20)',
        // Grip
        'spans(H, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        // Pommel
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        B: { name: 'crystal_blade', role: 'body' },
        D: { name: 'crystal_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'crystal_facet', role: 'body', tone: 'highlight' },
        E: { name: 'inner_glow', role: 'eye' },
        G: { name: 'silver_guard', role: 'head' },
        H: { name: 'silk_grip', role: 'belt' },
        P: { name: 'crystal_pommel', role: 'boot' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        eye:  { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        boot: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 10. BONE SCIMITAR ──────────────────────────────────────────
    {
      id: 'bone_scimitar_32',
      description: 'Curved blade carved from a giant creature\'s rib — undead dungeon drop.',
      size: 32,
      draw: [
        // Curved bone blade (wider near tip, curves right)
        'spans(B, 3:14-16, 4:15-17, 5:15-18, 6:16-19, 7:16-19, 8:16-19, 9:15-18, 10:15-18, 11:15-18, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17)',
        // Bone shadow
        'spans(D, 5:18-18, 6:19-19, 7:19-19, 8:19-19, 9:18-18, 10:18-18)',
        // Bone highlight
        'spans(L, 3:14-14, 4:15-15, 5:15-15, 12:14-14, 13:14-14, 14:14-14)',
        // Tooth-like guard
        'spans(G, 17:12-19, 18:13-18)',
        'pixels(A, 12,17, 19,17)',
        // Wrapped grip
        'spans(H, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17)',
        // Pommel (small skull)
        'spans(P, 25:13-18, 26:14-17, 27:15-16)',
      ],
      chars: {
        B: { name: 'bone_blade', role: 'body' },
        D: { name: 'bone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'bone_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'tooth_guard', role: 'head' },
        A: { name: 'fang_tips', role: 'accessory' },
        H: { name: 'sinew_grip', role: 'belt' },
        P: { name: 'skull_pommel', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#d2aa99' },
      },
    },

    // ─── 11. BLOOD EDGE ─────────────────────────────────────────────
    {
      id: 'blood_edge_32',
      description: 'Crimson-stained blade that drains life force — blood drips from the tip.',
      size: 32,
      draw: [
        // Blade
        'spans(B, 4:15-16, 5:14-17, 6:13-18, 7:13-18, 8:13-18, 9:13-18, 10:13-18, 11:13-18, 12:13-18, 13:13-18, 14:13-18, 15:13-18, 16:13-18, 17:13-18)',
        // Blade shadow
        'spans(D, 6:18-18, 7:18-18, 8:18-18, 9:18-18, 10:18-18, 11:18-18, 12:18-18, 13:18-18, 14:18-18, 15:18-18, 16:18-18, 17:13-14)',
        // Blade highlight
        'spans(L, 6:13-13, 7:13-13, 8:13-13, 9:13-13, 10:13-13)',
        // Blood stains on blade
        'pixels(R, 15,6, 16,8, 14,10, 17,12, 15,15)',
        // Blood drip from tip
        'pixels(R, 15,1, 16,2, 15,3)',
        // Guard
        'spans(G, 18:10-21, 19:11-20)',
        // Grip
        'spans(H, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17)',
        // Pommel
        'spans(P, 26:13-18, 27:14-17)',
      ],
      chars: {
        B: { name: 'blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        R: { name: 'blood_stains', role: 'eye' },
        G: { name: 'guard', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        boot: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── 12. ROYAL CLAYMORE ─────────────────────────────────────────
    {
      id: 'royal_claymore_32',
      description: 'Ornate two-handed claymore with gold filigree and a ruby pommel.',
      size: 32,
      draw: [
        // Wide blade
        'spans(B, 1:15-16, 2:14-17, 3:13-18, 4:12-19, 5:12-19, 6:12-19, 7:12-19, 8:12-19, 9:12-19, 10:12-19, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19)',
        // Blade shadow
        'spans(D, 4:19-19, 5:19-19, 6:19-19, 7:19-19, 8:19-19, 9:19-19, 10:19-19, 11:19-19, 12:19-19, 13:19-19, 14:19-19, 15:12-13)',
        // Blade highlight
        'spans(L, 4:12-12, 5:12-12, 6:12-12, 7:12-12, 8:12-12, 9:12-12)',
        // Gold filigree on blade
        'pixels(A, 15,5, 16,8, 15,11, 16,14)',
        // Ornate guard (gold)
        'spans(G, 16:8-23, 17:9-22, 18:10-21)',
        // Long grip
        'spans(H, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17)',
        // Ruby pommel
        'spans(P, 26:13-18, 27:14-17, 28:15-16)',
        // Ruby gem in pommel
        'pixels(E, 15,27, 16,27)',
      ],
      chars: {
        B: { name: 'steel_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        A: { name: 'gold_filigree', role: 'accessory' },
        G: { name: 'gold_guard', role: 'head' },
        H: { name: 'royal_grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
        E: { name: 'ruby_gem', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 13. SERPENT KRIS ───────────────────────────────────────────
    {
      id: 'serpent_kris_32',
      description: 'Wavy-bladed kris dagger coated in serpent venom.',
      size: 32,
      draw: [
        // Wavy blade (zigzag pattern)
        'spans(B, 4:14-16, 5:15-18, 6:14-17, 7:12-15, 8:13-16, 9:15-18, 10:14-17, 11:12-15, 12:13-16, 13:15-18, 14:14-17, 15:13-16, 16:14-17)',
        // Blade shadow (bottom of waves)
        'pixels(D, 18,5, 15,7, 18,9, 15,11, 18,13)',
        // Blade highlight (top of waves)
        'pixels(L, 14,4, 12,7, 15,9, 12,11, 14,14)',
        // Poison drip
        'pixels(E, 14,2, 15,3)',
        // Guard (serpent head shape)
        'spans(G, 17:11-20, 18:12-19)',
        // Grip
        'spans(H, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        // Pommel
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        B: { name: 'wavy_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        E: { name: 'venom_drip', role: 'eye' },
        G: { name: 'serpent_guard', role: 'head' },
        H: { name: 'snakeskin_grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:  { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        belt: { shadow: '#346524', base: '#346524', highlight: '#854c30' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 14. SHADOW STILETTO ────────────────────────────────────────
    {
      id: 'shadow_stiletto_32',
      description: 'Thin dark assassin\'s blade that strikes from the shadows.',
      size: 32,
      draw: [
        // Thin blade
        'spans(B, 3:15-16, 4:15-16, 5:15-16, 6:15-16, 7:15-16, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16)',
        // Blade shadow (right pixel)
        'spans(D, 3:16-16, 4:16-16, 5:16-16, 6:16-16, 7:16-16, 8:16-16, 9:16-16, 10:16-16, 11:16-16, 12:16-16, 13:16-16, 14:16-16)',
        // Small guard
        'spans(G, 17:13-18, 18:14-17)',
        // Grip
        'spans(H, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16)',
        // Pommel
        'spans(P, 24:14-17, 25:15-16)',
        // Shadow wisps
        'pixels(E, 13,5, 18,8, 13,11, 18,14)',
      ],
      chars: {
        B: { name: 'dark_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'guard', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
        E: { name: 'shadow_wisps', role: 'eye' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:  { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
        head: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        boot: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── 15. RUNIC GLADIUS ──────────────────────────────────────────
    {
      id: 'runic_gladius_32',
      description: 'Short Roman gladius inscribed with glowing ancient runes.',
      size: 32,
      draw: [
        // Short wide blade
        'spans(B, 6:14-17, 7:13-18, 8:13-18, 9:13-18, 10:13-18, 11:13-18, 12:13-18, 13:13-18, 14:13-18, 15:13-18, 16:13-18)',
        // Blade shadow
        'spans(D, 7:18-18, 8:18-18, 9:18-18, 10:18-18, 11:18-18, 12:18-18, 13:18-18, 14:18-18, 15:18-18, 16:18-18)',
        // Blade highlight
        'spans(L, 7:13-13, 8:13-13, 9:13-13, 10:13-13, 11:13-13)',
        // Glowing runes (dots on blade)
        'pixels(E, 15,8, 16,10, 15,12, 16,14)',
        // Guard
        'spans(G, 17:11-20, 18:12-19)',
        // Grip
        'spans(H, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        // Pommel
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        B: { name: 'steel_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        E: { name: 'rune_glow', role: 'eye' },
        G: { name: 'guard', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:  { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 16. MITHRIL SABER ──────────────────────────────────────────
    {
      id: 'mithril_saber_32',
      description: 'Lightweight curved saber forged from rare mithril alloy — gleams white.',
      size: 32,
      draw: [
        // Curved bright blade
        'spans(B, 2:14-15, 3:14-16, 4:13-17, 5:13-17, 6:14-17, 7:14-18, 8:14-18, 9:14-18, 10:15-18, 11:15-18, 12:15-17, 13:15-17, 14:15-17, 15:15-17, 16:15-17)',
        // Blade shadow
        'spans(D, 7:18-18, 8:18-18, 9:18-18, 10:18-18, 11:18-18)',
        // Blade highlight (left/top)
        'spans(L, 2:14-14, 3:14-14, 4:13-13, 5:13-13, 6:14-14, 7:14-14, 8:14-14)',
        // Guard (elegant curve)
        'spans(G, 17:11-20, 18:12-19)',
        // Grip
        'spans(H, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16)',
        // Pommel
        'spans(P, 25:14-17, 26:15-16)',
      ],
      chars: {
        B: { name: 'mithril_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        G: { name: 'silver_guard', role: 'head' },
        H: { name: 'silk_grip', role: 'belt' },
        P: { name: 'silver_pommel', role: 'boot' },
      },
      colors: {
        body: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        boot: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 17. THORN BLADE ────────────────────────────────────────────
    {
      id: 'thorn_blade_32',
      description: 'Living blade grown from enchanted bramble — thorns sprout from the edge.',
      size: 32,
      draw: [
        // Organic blade
        'spans(B, 4:14-17, 5:14-17, 6:13-18, 7:13-18, 8:13-18, 9:13-18, 10:13-18, 11:13-18, 12:13-18, 13:13-18, 14:14-17, 15:14-17, 16:14-17)',
        // Thorns protruding from sides
        'pixels(T, 11,6, 20,8, 11,10, 20,12, 11,14)',
        'pixels(T, 12,6, 19,8, 12,10, 19,12, 12,14)',
        // Blade shadow
        'spans(D, 6:18-18, 7:18-18, 8:18-18, 9:18-18, 10:18-18, 11:18-18, 12:18-18)',
        // Blade highlight
        'spans(L, 6:13-13, 7:13-13, 8:13-13, 9:13-13)',
        // Guard (vine-wrapped)
        'spans(G, 17:11-20, 18:12-19)',
        // Grip
        'spans(H, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        // Pommel
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        B: { name: 'bramble_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        T: { name: 'thorns', role: 'accessory' },
        G: { name: 'vine_guard', role: 'head' },
        H: { name: 'bark_grip', role: 'belt' },
        P: { name: 'root_pommel', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 18. DEMON FANG ─────────────────────────────────────────────
    {
      id: 'demon_fang_32',
      description: 'Organic demonic blade shaped like a massive fang — pulsates with hellfire.',
      size: 32,
      draw: [
        // Organic curved blade (fang shape: narrow tip, wide base)
        'spans(B, 2:15-16, 3:15-16, 4:14-17, 5:14-17, 6:13-18, 7:13-18, 8:12-19, 9:12-19, 10:12-19, 11:11-20, 12:11-20, 13:11-20, 14:12-19, 15:12-19, 16:13-18)',
        // Blade shadow
        'spans(D, 8:19-19, 9:19-19, 10:19-19, 11:20-20, 12:20-20, 13:20-20, 14:19-19, 15:19-19)',
        // Blade highlight
        'spans(L, 6:13-13, 7:13-13, 8:12-12, 9:12-12, 10:12-12)',
        // Hellfire veins
        'pixels(E, 15,6, 14,9, 16,12, 13,15)',
        // Organic guard (bone ridges)
        'spans(G, 17:10-21, 18:11-20)',
        // Fleshy grip
        'spans(H, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        // Pommel (eye)
        'spans(P, 24:13-18, 25:14-17)',
        'pixels(W, 15,25, 16,25)',
      ],
      chars: {
        B: { name: 'demon_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        E: { name: 'hellfire', role: 'eye' },
        G: { name: 'bone_guard', role: 'head' },
        H: { name: 'fleshy_grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
        W: { name: 'demon_eye', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        boot:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 19. GOLDEN KHOPESH ─────────────────────────────────────────
    {
      id: 'golden_khopesh_32',
      description: 'Ancient Egyptian sickle-sword cast in gold — curves forward at the tip.',
      size: 32,
      draw: [
        // Curved sickle tip (forward hook)
        'spans(B, 3:18-20, 4:17-21, 5:16-21, 6:15-20, 7:15-19)',
        // Straight lower blade
        'spans(B, 8:14-18, 9:14-18, 10:14-18, 11:14-18, 12:14-18, 13:14-18, 14:14-18, 15:14-18, 16:14-18)',
        // Blade shadow
        'spans(D, 4:21-21, 5:21-21, 6:20-20, 8:18-18, 9:18-18, 10:18-18, 11:18-18, 12:18-18, 13:18-18, 14:18-18, 15:18-18, 16:18-18)',
        // Blade highlight
        'spans(L, 3:18-18, 4:17-17, 5:16-16, 6:15-15, 7:15-15, 8:14-14, 9:14-14, 10:14-14)',
        // Guard (lotus motif)
        'spans(G, 17:11-20, 18:12-19)',
        // Grip
        'spans(H, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        // Pommel
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        B: { name: 'gold_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        G: { name: 'lotus_guard', role: 'head' },
        H: { name: 'linen_grip', role: 'belt' },
        P: { name: 'scarab_pommel', role: 'boot' },
      },
      colors: {
        body: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        boot: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 20. BROKEN HERO BLADE ──────────────────────────────────────
    {
      id: 'broken_hero_blade_32',
      description: 'Shattered legendary sword — the top half is missing but it still radiates power.',
      size: 32,
      draw: [
        // Broken blade (jagged top edge, only lower half remains)
        'spans(B, 7:14-17, 8:13-18, 9:12-16, 10:13-18, 11:12-17, 12:13-18, 13:13-18, 14:13-18, 15:13-18, 16:13-18)',
        // Blade shadow
        'spans(D, 8:18-18, 10:18-18, 12:18-18, 13:18-18, 14:18-18, 15:18-18, 16:18-18)',
        // Blade highlight
        'spans(L, 8:13-13, 10:13-13, 12:13-13, 13:13-13)',
        // Power glow (residual energy at break point)
        'pixels(E, 14,7, 16,7, 12,9, 17,9, 12,11)',
        // Guard (ornate but damaged)
        'spans(G, 17:10-21, 18:11-20)',
        // Grip
        'spans(H, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17)',
        // Pommel
        'spans(P, 25:13-18, 26:14-17)',
      ],
      chars: {
        B: { name: 'broken_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        E: { name: 'residual_glow', role: 'eye' },
        G: { name: 'guard', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:  { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        head: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
