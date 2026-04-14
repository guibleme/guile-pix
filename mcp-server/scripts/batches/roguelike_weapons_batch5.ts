/**
 * Roguelike Weapons Bundle — Batch 5: Axes, Hammers, Polearms & Exotic (32x32 DSL)
 * 20 unique templates for roguelike games.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'weapons',
  exportNames: { templates: 'ROGUELIKE_EXOTIC_32_TEMPLATES', schemes: 'ROGUELIKE_EXOTIC_32_COLOR_SCHEMES' },
  templates: [

    // ─── 1. RUSTY HATCHET ───────────────────────────────────────────
    {
      id: 'rusty_hatchet_32',
      description: 'Small rusty hatchet — starter melee weapon for roguelike survivors.',
      size: 32,
      draw: [
        // Axe head (left side of shaft)
        'spans(B, 3:8-15, 4:7-15, 5:6-15, 6:6-15, 7:7-15, 8:8-15, 9:9-15)',
        // Head shadow
        'spans(D, 5:6-7, 6:6-7, 7:7-8)',
        // Head highlight
        'spans(L, 3:14-15, 4:14-15, 5:14-15)',
        // Rust spots
        'pixels(R, 10,5, 12,7, 9,8)',
        // Shaft
        'spans(H, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17)',
        // Cap
        'spans(P, 26:13-18, 27:14-17)',
      ],
      chars: {
        B: { name: 'axe_head', role: 'body' },
        D: { name: 'head_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        R: { name: 'rust', role: 'accessory' },
        H: { name: 'wood_shaft', role: 'belt' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 2. IRON BATTLEAXE ──────────────────────────────────────────
    {
      id: 'iron_battleaxe_32',
      description: 'Double-headed iron battleaxe — high damage, slow swing.',
      size: 32,
      draw: [
        // Left blade
        'spans(B, 3:6-14, 4:5-14, 5:4-14, 6:4-14, 7:5-14, 8:6-14, 9:8-14)',
        // Right blade
        'spans(B, 3:17-25, 4:17-26, 5:17-27, 6:17-27, 7:17-26, 8:17-25, 9:17-23)',
        // Shadow (bottom of heads)
        'spans(D, 7:5-6, 8:6-8, 7:26-26, 8:25-25)',
        // Highlight (top edges)
        'spans(L, 3:6-8, 4:5-6, 3:24-25, 4:26-26)',
        // Shaft
        'spans(H, 3:14-17, 4:14-17, 5:14-17, 6:14-17, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17)',
        // Cap
        'spans(P, 26:13-18, 27:14-17)',
      ],
      chars: {
        B: { name: 'iron_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        H: { name: 'shaft', role: 'belt' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 3. WAR HAMMER ──────────────────────────────────────────────
    {
      id: 'war_hammer_roguelike_32',
      description: 'Heavy war hammer with flat striking face — crushes armor.',
      size: 32,
      draw: [
        // Hammer head (rectangular, wider on strike side)
        'spans(B, 3:8-23, 4:7-24, 5:7-24, 6:7-24, 7:8-23)',
        // Shadow
        'spans(D, 5:7-8, 6:7-8, 7:8-10)',
        // Highlight
        'spans(L, 3:22-23, 4:23-24, 5:23-24)',
        // Shaft
        'spans(H, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17)',
        // Grip wrap
        'spans(G, 19:13-18, 20:13-18, 21:13-18)',
        // Cap
        'spans(P, 25:13-18, 26:14-17)',
      ],
      chars: {
        B: { name: 'hammer_head', role: 'body' },
        D: { name: 'head_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'head_highlight', role: 'body', tone: 'highlight' },
        H: { name: 'shaft', role: 'belt' },
        G: { name: 'grip_wrap', role: 'head' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 4. MORNING STAR ────────────────────────────────────────────
    {
      id: 'morning_star_roguelike_32',
      description: 'Spiked metal ball on a shaft — devastating blunt + pierce damage.',
      size: 32,
      draw: [
        // Spiked ball
        'circle(15,6,4,B)',
        // Spikes
        'pixels(K, 15,1, 16,1, 10,4, 11,4, 20,4, 21,4, 10,8, 11,8, 20,8, 21,8, 15,11, 16,11)',
        // Ball shadow
        'spans(D, 8:13-17, 9:14-16)',
        // Ball highlight
        'pixels(L, 14,4, 15,4)',
        // Shaft
        'spans(H, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17)',
        // Grip
        'spans(G, 21:13-18, 22:13-18)',
        // Cap
        'spans(P, 25:13-18, 26:14-17)',
      ],
      chars: {
        B: { name: 'metal_ball', role: 'body' },
        K: { name: 'spikes', role: 'accessory' },
        D: { name: 'ball_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'ball_highlight', role: 'body', tone: 'highlight' },
        H: { name: 'shaft', role: 'belt' },
        G: { name: 'grip', role: 'head' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 5. CHAIN FLAIL ─────────────────────────────────────────────
    {
      id: 'chain_flail_32',
      description: 'Spiked ball attached by chain — unpredictable swings bypass shields.',
      size: 32,
      draw: [
        // Spiked ball (off-center top)
        'circle(10,6,3,B)',
        'pixels(K, 10,2, 7,4, 13,4, 7,8, 13,8, 10,10)',
        // Chain links (diagonal from ball to shaft)
        'pixels(C, 12,9, 13,10, 14,11, 14,12)',
        // Shaft (handle)
        'spans(H, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17)',
        // Grip
        'spans(G, 21:13-18, 22:13-18)',
        // Cap
        'spans(P, 25:13-18, 26:14-17)',
      ],
      chars: {
        B: { name: 'spiked_ball', role: 'body' },
        K: { name: 'spikes', role: 'body', tone: 'shadow' },
        C: { name: 'chain', role: 'accessory' },
        H: { name: 'handle', role: 'belt' },
        G: { name: 'grip', role: 'head' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 6. IRON HALBERD ────────────────────────────────────────────
    {
      id: 'iron_halberd_32',
      description: 'Polearm with axe blade and spear tip — versatile reach weapon.',
      size: 32,
      draw: [
        // Spear tip
        'spans(B, 1:15-16, 2:14-17, 3:14-17)',
        // Axe blade (one side)
        'spans(A, 4:8-17, 5:7-17, 6:7-17, 7:8-17)',
        // Blade shadow
        'spans(D, 6:7-8, 7:8-9)',
        // Blade highlight
        'spans(L, 4:8-10, 5:7-8)',
        // Back spike
        'spans(A, 5:18-21, 6:18-20)',
        // Shaft
        'spans(H, 4:14-17, 5:14-17, 6:14-17, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17, 26:14-17)',
        // Cap
        'spans(P, 27:13-18, 28:14-17)',
      ],
      chars: {
        B: { name: 'spear_tip', role: 'body' },
        A: { name: 'axe_blade', role: 'accessory' },
        D: { name: 'blade_shadow', role: 'accessory', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'accessory', tone: 'highlight' },
        H: { name: 'shaft', role: 'belt' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 7. HUNTING SPEAR ───────────────────────────────────────────
    {
      id: 'hunting_spear_32',
      description: 'Simple iron-tipped spear — throwable ranged/melee hybrid.',
      size: 32,
      draw: [
        // Spear head
        'spans(B, 1:15-16, 2:14-17, 3:13-18, 4:14-17, 5:14-17)',
        // Head shadow
        'spans(D, 3:18-18, 4:17-17)',
        // Head highlight
        'spans(L, 2:14-14, 3:13-13)',
        // Shaft
        'spans(H, 6:15-16, 7:15-16, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16, 25:15-16, 26:15-16, 27:15-16)',
        // Grip wrap
        'spans(G, 22:14-17, 23:14-17, 24:14-17)',
        // Cap
        'spans(P, 28:14-17, 29:15-16)',
      ],
      chars: {
        B: { name: 'iron_head', role: 'body' },
        D: { name: 'head_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'head_edge', role: 'body', tone: 'highlight' },
        H: { name: 'shaft', role: 'belt' },
        G: { name: 'grip', role: 'head' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 8. TRIDENT ─────────────────────────────────────────────────
    {
      id: 'trident_roguelike_32',
      description: 'Three-pronged trident — extra damage to aquatic enemies.',
      size: 32,
      draw: [
        // Three prongs
        'spans(B, 1:11-12, 1:15-16, 1:19-20, 2:11-12, 2:15-16, 2:19-20, 3:11-12, 3:15-16, 3:19-20, 4:12-13, 4:15-16, 4:18-19, 5:13-14, 5:15-16, 5:17-18)',
        // Cross-bar connecting prongs
        'spans(A, 6:11-20)',
        // Shaft
        'spans(H, 7:15-16, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16, 25:15-16)',
        // Grip
        'spans(G, 22:14-17, 23:14-17)',
        // Cap
        'spans(P, 26:14-17, 27:15-16)',
      ],
      chars: {
        B: { name: 'prongs', role: 'body' },
        A: { name: 'cross_bar', role: 'accessory' },
        H: { name: 'shaft', role: 'belt' },
        G: { name: 'grip', role: 'head' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 9. THROWING AXE ────────────────────────────────────────────
    {
      id: 'throwing_axe_roguelike_32',
      description: 'Compact axe balanced for throwing — returns like a boomerang.',
      size: 32,
      draw: [
        // Axe head (compact, single blade)
        'spans(B, 5:8-16, 6:6-16, 7:5-16, 8:5-16, 9:6-16, 10:8-16)',
        // Shadow
        'spans(D, 8:5-6, 9:6-7)',
        // Highlight
        'spans(L, 5:8-10, 6:6-8)',
        // Short shaft
        'spans(H, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17)',
        // Cap
        'spans(P, 20:13-18, 21:14-17)',
      ],
      chars: {
        B: { name: 'axe_head', role: 'body' },
        D: { name: 'head_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        H: { name: 'shaft', role: 'belt' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 10. GREAT MAUL ─────────────────────────────────────────────
    {
      id: 'great_maul_32',
      description: 'Massive two-handed maul — stuns enemies on hit, destroys walls.',
      size: 32,
      draw: [
        // Huge hammer head
        'spans(B, 1:6-25, 2:5-26, 3:5-26, 4:5-26, 5:5-26, 6:5-26, 7:6-25)',
        // Shadow
        'spans(D, 5:5-8, 6:5-8, 7:6-9)',
        // Highlight
        'spans(L, 1:23-25, 2:24-26, 3:24-26)',
        // Shaft
        'spans(H, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17)',
        // Grip
        'spans(G, 21:13-18, 22:13-18, 23:13-18)',
        // Cap
        'spans(P, 25:13-18, 26:14-17)',
      ],
      chars: {
        B: { name: 'maul_head', role: 'body' },
        D: { name: 'head_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'head_highlight', role: 'body', tone: 'highlight' },
        H: { name: 'shaft', role: 'belt' },
        G: { name: 'grip', role: 'head' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 11. FLAME AXE ──────────────────────────────────────────────
    {
      id: 'flame_axe_32',
      description: 'Axe head wreathed in fire — ignites enemies on hit.',
      size: 32,
      draw: [
        'spans(B, 3:8-15, 4:7-15, 5:6-15, 6:6-15, 7:7-15, 8:8-15, 9:9-15)',
        'spans(D, 5:6-7, 6:6-7)',
        'spans(L, 3:14-15, 4:14-15)',
        // Fire particles
        'pixels(E, 6,3, 4,4, 8,5, 3,6, 7,8)',
        // Shaft
        'spans(H, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        'spans(G, 20:13-18, 21:13-18)',
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        B: { name: 'axe_head', role: 'body' },
        D: { name: 'head_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        E: { name: 'fire', role: 'eye' },
        H: { name: 'shaft', role: 'belt' },
        G: { name: 'grip', role: 'head' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:  { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 12. FROST HAMMER ───────────────────────────────────────────
    {
      id: 'frost_hammer_32',
      description: 'Ice-encrusted hammer that freezes targets in place.',
      size: 32,
      draw: [
        'spans(B, 3:8-23, 4:7-24, 5:7-24, 6:7-24, 7:8-23)',
        'spans(D, 5:7-8, 6:7-8)',
        'spans(L, 3:22-23, 4:23-24)',
        'pixels(E, 6,5, 25,5, 6,8, 25,8)',
        'spans(H, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17)',
        'spans(G, 19:13-18, 20:13-18)',
        'spans(P, 23:13-18, 24:14-17)',
      ],
      chars: {
        B: { name: 'ice_head', role: 'body' },
        D: { name: 'head_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'head_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'ice_crystals', role: 'eye' },
        H: { name: 'shaft', role: 'belt' },
        G: { name: 'grip', role: 'head' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:  { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 13. LIGHTNING SPEAR ────────────────────────────────────────
    {
      id: 'lightning_spear_32',
      description: 'Electrified spear that chains lightning between nearby enemies.',
      size: 32,
      draw: [
        'spans(B, 1:15-16, 2:14-17, 3:13-18, 4:14-17, 5:14-17)',
        'spans(L, 2:14-14, 3:13-13)',
        'spans(H, 6:15-16, 7:15-16, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16)',
        'spans(G, 21:14-17, 22:14-17)',
        'spans(P, 25:14-17, 26:15-16)',
        'pixels(E, 12,2, 19,3, 11,5, 20,6, 12,8)',
      ],
      chars: {
        B: { name: 'spear_head', role: 'body' },
        L: { name: 'head_edge', role: 'body', tone: 'highlight' },
        H: { name: 'shaft', role: 'belt' },
        G: { name: 'grip', role: 'head' },
        P: { name: 'cap', role: 'boot' },
        E: { name: 'lightning', role: 'eye' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:  { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 14. CURSED SCYTHE ──────────────────────────────────────────
    {
      id: 'cursed_scythe_32',
      description: 'Death\'s scythe — massive curved blade, instant-kill chance on low HP enemies.',
      size: 32,
      draw: [
        // Curved blade (scythe head, extends left from shaft top)
        'spans(B, 2:7-16, 3:5-16, 4:4-15, 5:4-14, 6:5-13, 7:6-12)',
        // Shadow
        'spans(D, 5:4-5, 6:5-6, 7:6-7)',
        // Edge highlight
        'spans(L, 2:7-9, 3:5-7)',
        // Shaft
        'spans(H, 3:14-17, 4:14-17, 5:14-17, 6:14-17, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17, 26:14-17)',
        // Curse glow
        'pixels(E, 8,5, 6,7, 9,8)',
        // Cap
        'spans(P, 27:13-18, 28:14-17)',
      ],
      chars: {
        B: { name: 'scythe_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_edge', role: 'body', tone: 'highlight' },
        H: { name: 'shaft', role: 'belt' },
        E: { name: 'curse_glow', role: 'eye' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:  { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 15. BONE FLAIL ─────────────────────────────────────────────
    {
      id: 'bone_flail_32',
      description: 'Flail made from skull and spine — swings unpredictably.',
      size: 32,
      draw: [
        // Skull ball
        'spans(B, 3:9-14, 4:8-15, 5:8-15, 6:8-15, 7:9-14)',
        // Eye sockets
        'pixels(E, 10,5, 11,5, 13,5, 14,5)',
        // Jaw
        'pixels(B, 10,7, 11,7, 13,7, 14,7)',
        // Spine chain
        'pixels(C, 12,9, 13,10, 14,11, 14,12)',
        // Handle
        'spans(H, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        'spans(G, 21:13-18, 22:13-18)',
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        B: { name: 'skull', role: 'body' },
        E: { name: 'sockets', role: 'eye' },
        C: { name: 'spine_chain', role: 'accessory' },
        H: { name: 'handle', role: 'belt' },
        G: { name: 'grip', role: 'head' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 16. DRAGON LANCE ───────────────────────────────────────────
    {
      id: 'dragon_lance_32',
      description: 'Legendary lance forged from dragon tooth — extra damage vs dragons.',
      size: 32,
      draw: [
        // Long diamond tip
        'spans(B, 1:15-16, 2:14-17, 3:13-18, 4:12-19, 5:13-18, 6:14-17)',
        'spans(L, 2:14-14, 3:13-13, 4:12-12)',
        'spans(D, 3:18-18, 4:19-19, 5:18-18)',
        // Wing guards
        'spans(A, 7:10-13, 7:18-21, 8:11-12, 8:19-20)',
        // Shaft
        'spans(H, 7:14-17, 8:14-17, 9:14-17, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16, 25:15-16)',
        // Grip
        'spans(G, 22:14-17, 23:14-17)',
        // Cap
        'spans(P, 26:14-17, 27:15-16)',
      ],
      chars: {
        B: { name: 'dragon_tip', role: 'body' },
        L: { name: 'tip_edge', role: 'body', tone: 'highlight' },
        D: { name: 'tip_shadow', role: 'body', tone: 'shadow' },
        A: { name: 'wing_guards', role: 'accessory' },
        H: { name: 'shaft', role: 'belt' },
        G: { name: 'grip', role: 'head' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 17. RUNIC WARHAMMER ────────────────────────────────────────
    {
      id: 'runic_warhammer_32',
      description: 'Hammer inscribed with glowing runes — each hit triggers a rune effect.',
      size: 32,
      draw: [
        'spans(B, 3:8-23, 4:7-24, 5:7-24, 6:7-24, 7:8-23)',
        'spans(D, 5:7-8, 6:7-8)',
        'spans(L, 3:22-23, 4:23-24)',
        // Rune dots on hammer head
        'pixels(E, 10,4, 14,4, 18,4, 22,4, 10,6, 14,6, 18,6, 22,6)',
        'spans(H, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17)',
        'spans(G, 19:13-18, 20:13-18)',
        'spans(P, 23:13-18, 24:14-17)',
      ],
      chars: {
        B: { name: 'hammer_head', role: 'body' },
        D: { name: 'head_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'head_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'rune_glow', role: 'eye' },
        H: { name: 'shaft', role: 'belt' },
        G: { name: 'grip', role: 'head' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:  { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 18. SHADOW GLAIVE ──────────────────────────────────────────
    {
      id: 'shadow_glaive_32',
      description: 'Dark polearm blade that cuts through shadows — ignores armor.',
      size: 32,
      draw: [
        // Glaive blade (wide curved blade on one side)
        'spans(B, 1:9-16, 2:8-16, 3:7-16, 4:7-16, 5:8-16, 6:9-16, 7:10-16)',
        'spans(D, 3:7-8, 4:7-8, 5:8-9)',
        // Shaft
        'spans(H, 3:14-17, 4:14-17, 5:14-17, 6:14-17, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17)',
        // Shadow wisps
        'pixels(E, 7,3, 5,5, 8,7, 6,9)',
        'spans(P, 26:13-18, 27:14-17)',
      ],
      chars: {
        B: { name: 'dark_blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'shaft', role: 'belt' },
        E: { name: 'shadow_wisps', role: 'eye' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:  { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        boot: { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
      },
    },

    // ─── 19. CELESTIAL MACE ─────────────────────────────────────────
    {
      id: 'celestial_mace_32',
      description: 'Golden holy mace radiating divine light — extra damage vs evil.',
      size: 32,
      draw: [
        // Flanged mace head (star-like profile)
        'spans(B, 2:13-18, 3:12-19, 4:11-20, 5:12-19, 6:13-18)',
        // Flanges
        'pixels(K, 11,4, 20,4, 15,1, 16,1, 15,7, 16,7)',
        // Glow
        'pixels(E, 14,3, 17,3, 14,5, 17,5)',
        // Shaft
        'spans(H, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        'spans(G, 20:13-18, 21:13-18)',
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        B: { name: 'mace_head', role: 'body' },
        K: { name: 'flanges', role: 'accessory' },
        E: { name: 'divine_glow', role: 'eye' },
        H: { name: 'shaft', role: 'belt' },
        G: { name: 'grip', role: 'head' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 20. VOID HALBERD ───────────────────────────────────────────
    {
      id: 'void_halberd_32',
      description: 'Halberd from the void dimension — tears holes in reality with each swing.',
      size: 32,
      draw: [
        // Spear tip
        'spans(B, 1:15-16, 2:14-17, 3:14-17)',
        // Axe blade (void)
        'spans(A, 4:8-17, 5:7-17, 6:7-17, 7:8-17)',
        // Back hook
        'spans(A, 5:18-21, 6:18-20)',
        // Shaft
        'spans(H, 4:14-17, 5:14-17, 6:14-17, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17)',
        // Void particles
        'pixels(E, 6,5, 8,7, 5,9, 22,5, 22,8)',
        'spans(P, 26:13-18, 27:14-17)',
      ],
      chars: {
        B: { name: 'void_tip', role: 'body' },
        A: { name: 'void_blade', role: 'accessory' },
        H: { name: 'shaft', role: 'belt' },
        E: { name: 'void_particles', role: 'eye' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
        accessory: { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
        belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        boot:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

  ],
};

export default batch;
