/**
 * Dungeon Props Bundle — Batch 4: Interactive Elements (32x32 DSL)
 * 20 unique interactive prop templates for dungeon/roguelike games.
 * Neo-SNES style, DB16 palette, 5-value shading via tone chars.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'props',
  exportNames: { templates: 'DUNGEON_INTERACTIVE_32_TEMPLATES', schemes: 'DUNGEON_INTERACTIVE_32_COLOR_SCHEMES' },
  templates: [

    // ─── 1. SPIKE TRAP ────────────────────────────────────────────
    {
      id: 'spike_trap_32',
      description: 'Floor spike trap in triggered state — deadly dungeon hazard.',
      size: 32,
      draw: [
        // Spike tips
        'pixels(B, 10,6, 14,4, 18,5, 22,6, 12,7, 16,6, 20,7)',
        // Spike shafts
        'spans(B, 7:10-10, 7:14-14, 7:18-18, 7:22-22, 8:10-10, 8:14-14, 8:18-18, 8:22-22, 8:12-12, 8:16-16, 8:20-20)',
        'spans(B, 9:10-10, 9:12-12, 9:14-14, 9:16-16, 9:18-18, 9:20-20, 9:22-22)',
        'spans(B, 10:10-10, 10:12-12, 10:14-14, 10:16-16, 10:18-18, 10:20-20, 10:22-22)',
        // Spike highlight (tips)
        'pixels(L, 10,7, 14,5, 18,6, 22,7)',
        // Spike shadow
        'pixels(D, 11,10, 13,10, 15,10, 17,10, 19,10, 21,10, 23,10)',
        // Floor plate
        'spans(G, 11:8-23, 12:8-23, 13:8-23)',
        // Plate shadow
        'spans(D, 13:8-10, 13:21-23)',
        // Plate gap (hole)
        'spans(A, 11:10-11, 11:13-14, 11:16-17, 11:19-20, 11:22-23)',
        // Blood
        'pixels(R, 12,9, 18,12, 22,11)',
      ],
      chars: {
        B: { name: 'iron_spike', role: 'body' },
        D: { name: 'spike_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'spike_tip', role: 'body', tone: 'highlight' },
        G: { name: 'floor_plate', role: 'head' },
        A: { name: 'gaps', role: 'accessory' },
        R: { name: 'blood', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d04648' },
      },
    },

    // ─── 2. WOODEN DOOR ───────────────────────────────────────────
    {
      id: 'wooden_door_32',
      description: 'Heavy oak dungeon door with iron hinges and ring handle.',
      size: 32,
      draw: [
        // Door frame top
        'spans(G, 3:8-23, 4:8-23)',
        // Door frame sides
        'spans(G, 5:8-10, 5:21-23, 6:8-10, 6:21-23, 7:8-10, 7:21-23, 8:8-10, 8:21-23, 9:8-10, 9:21-23, 10:8-10, 10:21-23, 11:8-10, 11:21-23, 12:8-10, 12:21-23, 13:8-10, 13:21-23, 14:8-10, 14:21-23, 15:8-10, 15:21-23, 16:8-10, 16:21-23, 17:8-10, 17:21-23, 18:8-10, 18:21-23, 19:8-10, 19:21-23, 20:8-23)',
        // Door planks
        'spans(B, 5:11-20, 6:11-20, 7:11-20, 8:11-20, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:11-20, 19:11-20)',
        // Plank shadow
        'spans(D, 16:18-20, 17:18-20, 18:18-20, 19:18-20)',
        // Plank highlight
        'spans(L, 5:11-13, 6:11-13, 7:11-13)',
        // Plank divider lines
        'spans(D, 5:15-15, 6:15-15, 7:15-15, 8:15-15, 9:15-15, 10:15-15, 11:15-15, 12:15-15, 13:15-15, 14:15-15, 15:15-15, 16:15-15, 17:15-15, 18:15-15, 19:15-15)',
        // Iron hinges
        'spans(A, 6:10-12, 7:10-12, 14:10-12, 15:10-12)',
        // Ring handle
        'spans(A, 11:17-19, 12:17-17, 12:19-19, 13:17-19)',
        // Hinge bolts
        'pixels(E, 11,6, 11,7, 11,14, 11,15)',
      ],
      chars: {
        B: { name: 'oak_planks', role: 'body' },
        D: { name: 'plank_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'plank_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'stone_frame', role: 'head' },
        A: { name: 'iron_hardware', role: 'accessory' },
        E: { name: 'hinge_bolts', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 3. WALL LEVER ────────────────────────────────────────────
    {
      id: 'wall_lever_32',
      description: 'Stone-mounted wall lever — activates dungeon mechanisms.',
      size: 32,
      draw: [
        // Wall plate
        'spans(G, 6:11-20, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:11-20)',
        // Plate shadow
        'spans(D, 14:19-21, 15:19-21, 16:19-20)',
        // Plate highlight
        'spans(L, 6:13-18, 7:10-12)',
        // Lever arm (angled up-right)
        'spans(B, 6:17-18, 7:16-17, 8:15-16, 9:15-16)',
        // Lever shadow
        'spans(D, 8:16-16, 9:16-16)',
        // Lever ball handle
        'spans(A, 4:17-19, 5:16-20, 6:17-19)',
        // Handle highlight
        'pixels(H, 18,5)',
        // Pivot joint
        'spans(B, 10:14-17, 11:14-17)',
        // Pivot bolt
        'pixels(E, 15,10, 16,10)',
        // Slot guide
        'spans(G, 12:14-17, 13:14-17, 14:14-17)',
      ],
      chars: {
        B: { name: 'iron_lever', role: 'body' },
        D: { name: 'iron_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'stone_plate', role: 'head' },
        L: { name: 'stone_highlight', role: 'head', tone: 'highlight' },
        A: { name: 'handle_ball', role: 'accessory' },
        H: { name: 'handle_shine', role: 'accessory', tone: 'highlight' },
        E: { name: 'pivot_bolt', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 4. PRESSURE PLATE ────────────────────────────────────────
    {
      id: 'pressure_plate_32',
      description: 'Stone floor pressure plate — triggers traps or opens doors.',
      size: 32,
      draw: [
        // Floor context
        'spans(G, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24)',
        // Plate recessed outline
        'spans(D, 10:9-22, 15:9-22, 11:9-9, 11:22-22, 12:9-9, 12:22-22, 13:9-9, 13:22-22, 14:9-9, 14:22-22)',
        // Plate surface
        'spans(B, 11:10-21, 12:10-21, 13:10-21, 14:10-21)',
        // Plate highlight
        'spans(L, 11:11-20, 12:10-12)',
        // Plate shadow
        'spans(D, 14:19-21)',
        // Center mark
        'spans(A, 12:14-17, 13:14-17)',
        // Corner details
        'pixels(A, 11,11, 20,11, 11,14, 20,14)',
      ],
      chars: {
        B: { name: 'plate', role: 'body' },
        D: { name: 'plate_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'plate_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'floor', role: 'head' },
        A: { name: 'carved_mark', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },
      },
    },

    // ─── 5. MAGIC PORTAL ──────────────────────────────────────────
    {
      id: 'magic_portal_32',
      description: 'Swirling arcane portal — teleports to another dungeon floor.',
      size: 32,
      draw: [
        // Outer ring
        'spans(G, 4:12-19, 5:10-12, 5:19-21, 6:9-10, 6:21-22, 7:8-9, 7:22-23, 8:8-9, 8:22-23, 9:8-9, 9:22-23, 10:8-9, 10:22-23, 11:9-10, 11:21-22, 12:10-12, 12:19-21, 13:12-19)',
        // Portal swirl
        'spans(B, 5:13-18, 6:11-20, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:11-20, 12:13-18)',
        // Swirl pattern
        'spans(A, 6:14-17, 7:12-14, 8:13-15, 9:16-19, 10:14-17, 11:13-16)',
        // Portal core (bright)
        'spans(L, 8:15-17, 9:14-17, 10:15-16)',
        // Sparkle particles
        'pixels(E, 13,5, 18,6, 10,8, 22,9, 12,12, 20,11)',
        // Base stones
        'spans(G, 14:10-21, 15:10-21)',
        // Base shadow
        'spans(D, 15:10-12, 15:19-21)',
      ],
      chars: {
        B: { name: 'portal_swirl', role: 'body' },
        L: { name: 'portal_core', role: 'body', tone: 'highlight' },
        A: { name: 'swirl_band', role: 'accessory' },
        G: { name: 'stone_frame', role: 'head' },
        D: { name: 'stone_shadow', role: 'head', tone: 'shadow' },
        E: { name: 'sparkles', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#442434', base: '#597dce', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 6. IRON GATE ─────────────────────────────────────────────
    {
      id: 'iron_gate_32',
      description: 'Portcullis-style iron gate — blocks passage until mechanism is triggered.',
      size: 32,
      draw: [
        // Top bar
        'spans(G, 3:7-24, 4:7-24)',
        // Vertical bars
        'spans(B, 5:9-10, 5:13-14, 5:17-18, 5:21-22, 6:9-10, 6:13-14, 6:17-18, 6:21-22, 7:9-10, 7:13-14, 7:17-18, 7:21-22, 8:9-10, 8:13-14, 8:17-18, 8:21-22, 9:9-10, 9:13-14, 9:17-18, 9:21-22, 10:9-10, 10:13-14, 10:17-18, 10:21-22, 11:9-10, 11:13-14, 11:17-18, 11:21-22, 12:9-10, 12:13-14, 12:17-18, 12:21-22, 13:9-10, 13:13-14, 13:17-18, 13:21-22, 14:9-10, 14:13-14, 14:17-18, 14:21-22, 15:9-10, 15:13-14, 15:17-18, 15:21-22, 16:9-10, 16:13-14, 16:17-18, 16:21-22, 17:9-10, 17:13-14, 17:17-18, 17:21-22, 18:9-10, 18:13-14, 18:17-18, 18:21-22, 19:9-10, 19:13-14, 19:17-18, 19:21-22)',
        // Bar shadow
        'spans(D, 5:10-10, 6:10-10, 7:10-10, 8:10-10, 9:10-10, 10:10-10, 11:10-10, 12:10-10, 13:10-10, 14:10-10, 15:10-10, 16:10-10, 17:10-10, 18:10-10, 19:10-10)',
        // Horizontal cross bars
        'spans(G, 8:9-22, 14:9-22)',
        // Spike tips (bottom)
        'pixels(A, 9,20, 13,20, 17,20, 21,20)',
        // Frame sides
        'spans(G, 5:7-8, 6:7-8, 7:7-8, 8:7-8, 9:7-8, 10:7-8, 11:7-8, 12:7-8, 13:7-8, 14:7-8, 15:7-8, 16:7-8, 17:7-8, 18:7-8, 19:7-8, 5:23-24, 6:23-24, 7:23-24, 8:23-24, 9:23-24, 10:23-24, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:23-24)',
      ],
      chars: {
        B: { name: 'iron_bars', role: 'body' },
        D: { name: 'bar_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'frame', role: 'head' },
        A: { name: 'spike_tips', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 7. DART TRAP ─────────────────────────────────────────────
    {
      id: 'dart_trap_32',
      description: 'Wall-mounted dart trap — fires poison darts at passing adventurers.',
      size: 32,
      draw: [
        // Wall surface
        'spans(G, 6:8-14, 7:8-14, 8:8-14, 9:8-14, 10:8-14, 11:8-14, 12:8-14, 13:8-14, 14:8-14, 15:8-14, 16:8-14)',
        // Wall shadow
        'spans(D, 14:8-10, 15:8-10, 16:8-14)',
        // Dart hole
        'spans(A, 10:13-14, 11:13-14, 12:13-14)',
        // Mechanism visible inside hole
        'pixels(E, 13,11)',
        // Dart in flight
        'spans(B, 11:15-22)',
        // Dart tip
        'pixels(L, 22,11, 23,11)',
        // Dart feathers
        'spans(F, 11:15-16)',
        // Dart shadow
        'pixels(D, 15,12, 17,12, 19,12, 21,12)',
        // Stone frame around hole
        'spans(G, 9:12-14, 13:12-14, 10:12-12, 12:12-12)',
      ],
      chars: {
        B: { name: 'dart_shaft', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'dart_tip', role: 'body', tone: 'highlight' },
        G: { name: 'stone_wall', role: 'head' },
        A: { name: 'trap_hole', role: 'accessory' },
        E: { name: 'mechanism', role: 'belt' },
        F: { name: 'feathers', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },
        leg:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ─── 8. ROLLING BOULDER ───────────────────────────────────────
    {
      id: 'rolling_boulder_32',
      description: 'Giant rolling boulder trap — Indiana Jones style hazard.',
      size: 32,
      draw: [
        // Boulder body (circle)
        'spans(B, 5:13-18, 6:11-20, 7:10-21, 8:9-22, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:10-21, 14:11-20, 15:13-18)',
        // Shadow (bottom-right)
        'spans(D, 12:20-22, 13:19-21, 14:19-20, 15:17-18)',
        // Highlight (top-left)
        'spans(L, 5:14-17, 6:11-14, 7:10-12, 8:9-10)',
        // Specular
        'pixels(H, 12,7, 13,7)',
        // Crack lines
        'pixels(D, 15,9, 16,10, 17,11, 15,13, 18,12)',
        // Dust cloud behind
        'pixels(A, 8,16, 7,17, 9,17, 6,18, 8,18, 10,18)',
        // Ground shadow
        'spans(D, 16:10-21, 17:12-19)',
      ],
      chars: {
        B: { name: 'rock', role: 'body' },
        D: { name: 'rock_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'rock_highlight', role: 'body', tone: 'highlight' },
        H: { name: 'specular', role: 'accessory' },
        A: { name: 'dust', role: 'head' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── 9. LAVA PIT ──────────────────────────────────────────────
    {
      id: 'lava_pit_32',
      description: 'Bubbling lava floor pit — instant death dungeon hazard.',
      size: 32,
      draw: [
        // Stone rim back
        'spans(G, 6:9-22, 7:8-23)',
        // Rim shadow
        'spans(D, 6:9-10, 7:8-9)',
        // Lava surface
        'spans(B, 8:9-22, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22)',
        // Hot spots
        'spans(L, 9:13-16, 10:11-14, 11:16-19, 12:12-15)',
        // Bubbles
        'pixels(H, 14,9, 18,10, 12,12, 20,12, 15,13)',
        // Dark cooled spots
        'spans(D, 10:19-21, 12:9-10, 13:18-21)',
        // Stone rim front
        'spans(G, 14:9-22, 15:10-21)',
        // Rim front highlight
        'spans(L, 14:11-20)',
        // Rim front shadow
        'spans(D, 15:19-21)',
        // Heat shimmer particles
        'pixels(A, 12,5, 16,4, 20,5, 14,3)',
      ],
      chars: {
        B: { name: 'lava', role: 'body' },
        D: { name: 'cooled_lava', role: 'body', tone: 'shadow' },
        L: { name: 'hot_lava', role: 'body', tone: 'highlight' },
        H: { name: 'bubble', role: 'accessory' },
        G: { name: 'stone_rim', role: 'head' },
        A: { name: 'heat_shimmer', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 10. WATER WELL ───────────────────────────────────────────
    {
      id: 'dungeon_well_32',
      description: 'Stone water well with rope and bucket — drink to restore HP.',
      size: 32,
      draw: [
        // Roof top
        'spans(B, 3:13-18, 4:11-20, 5:10-21)',
        // Roof shadow
        'spans(D, 5:19-21)',
        // Support posts
        'spans(G, 6:11-12, 6:19-20, 7:11-12, 7:19-20, 8:11-12, 8:19-20, 9:11-12, 9:19-20)',
        // Rope + bucket
        'pixels(A, 15,6, 15,7, 15,8, 15,9, 15,10)',
        // Bucket
        'spans(A, 11:14-17, 12:14-17)',
        // Crank handle
        'spans(G, 7:20-22, 8:22-22)',
        // Well rim (oval)
        'spans(G, 10:10-21, 11:9-22)',
        // Water inside
        'spans(W, 10:12-19)',
        // Well wall
        'spans(G, 12:9-11, 12:20-22, 13:9-11, 13:20-22, 14:10-22)',
        // Wall shadow
        'spans(D, 13:20-22, 14:20-22)',
      ],
      chars: {
        B: { name: 'wood_roof', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        G: { name: 'stone', role: 'head' },
        A: { name: 'rope_bucket', role: 'accessory' },
        W: { name: 'water', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 11. CHAIN WALL ───────────────────────────────────────────
    {
      id: 'chain_wall_32',
      description: 'Wall shackles with dangling chains — dungeon atmosphere prop.',
      size: 32,
      draw: [
        // Wall anchor left
        'spans(G, 5:9-12, 6:9-12)',
        // Wall anchor right
        'spans(G, 5:19-22, 6:19-22)',
        // Chain links left
        'spans(B, 7:10-11, 8:10-11, 9:10-11, 10:10-11, 11:10-11, 12:10-11, 13:10-11, 14:10-11, 15:10-11)',
        // Chain links right
        'spans(B, 7:20-21, 8:20-21, 9:20-21, 10:20-21, 11:20-21, 12:20-21, 13:20-21)',
        // Chain highlight
        'pixels(L, 10,8, 10,10, 10,12, 20,8, 20,10, 20,12)',
        // Chain shadow
        'pixels(D, 11,9, 11,11, 11,13, 21,9, 21,11)',
        // Left shackle (open)
        'spans(A, 16:8-13, 17:8-9, 17:12-13, 18:8-13)',
        // Right shackle (open)
        'spans(A, 14:18-23, 15:18-19, 15:22-23, 16:18-23)',
        // Shackle hinge
        'pixels(E, 8,16, 13,16, 18,14, 23,14)',
      ],
      chars: {
        B: { name: 'chain', role: 'body' },
        D: { name: 'chain_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'chain_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'wall_anchor', role: 'head' },
        A: { name: 'shackle', role: 'accessory' },
        E: { name: 'hinge', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },
      },
    },

    // ─── 12. FLOOR SWITCH ─────────────────────────────────────────
    {
      id: 'floor_switch_32',
      description: 'Glowing floor switch button — step on to activate mechanism.',
      size: 32,
      draw: [
        // Floor context
        'spans(G, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23)',
        // Switch recess
        'spans(D, 9:11-20, 14:11-20, 10:11-11, 10:20-20, 11:11-11, 11:20-20, 12:11-11, 12:20-20, 13:11-11, 13:20-20)',
        // Button surface
        'spans(B, 10:12-19, 11:12-19, 12:12-19, 13:12-19)',
        // Button highlight
        'spans(L, 10:13-18, 11:12-14)',
        // Glow rune on button
        'spans(A, 11:14-17, 12:14-17)',
        // Rune bright
        'pixels(E, 15,11, 16,11, 15,12, 16,12)',
      ],
      chars: {
        B: { name: 'button', role: 'body' },
        D: { name: 'recess_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'button_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'floor', role: 'head' },
        A: { name: 'rune_glow', role: 'accessory' },
        E: { name: 'rune_bright', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 13. BRIDGE SECTION ───────────────────────────────────────
    {
      id: 'bridge_section_32',
      description: 'Wooden bridge plank section with rope rails — crosses chasms.',
      size: 32,
      draw: [
        // Rope rails
        'spans(A, 5:8-8, 5:23-23, 6:8-8, 6:23-23, 7:8-8, 7:23-23, 8:8-8, 8:23-23, 9:8-8, 9:23-23)',
        // Rope supports
        'spans(A, 9:9-10, 9:21-22, 10:9-10, 10:21-22)',
        // Planks
        'spans(B, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23)',
        // Plank shadow
        'spans(D, 14:8-10, 14:21-23, 15:8-23)',
        // Plank highlight
        'spans(L, 11:9-22, 12:8-10)',
        // Plank gaps
        'spans(G, 12:15-16, 14:11-12, 14:19-20)',
        // Rope detail (twist)
        'pixels(D, 8,6, 8,8, 23,6, 23,8)',
      ],
      chars: {
        B: { name: 'wood_plank', role: 'body' },
        D: { name: 'plank_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'plank_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'rope', role: 'head' },
        G: { name: 'gap_void', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },
      },
    },

    // ─── 14. TELEPORT RUNE ────────────────────────────────────────
    {
      id: 'teleport_rune_32',
      description: 'Glowing floor teleportation circle — step on to warp.',
      size: 32,
      draw: [
        // Outer circle
        'spans(A, 5:13-18, 6:11-12, 6:19-20, 7:10-10, 7:21-21, 8:9-9, 8:22-22, 9:9-9, 9:22-22, 10:9-9, 10:22-22, 11:10-10, 11:21-21, 12:11-12, 12:19-20, 13:13-18)',
        // Inner glow fill
        'spans(B, 6:13-18, 7:11-20, 8:10-21, 9:10-21, 10:10-21, 11:11-20, 12:13-18)',
        // Inner bright core
        'spans(L, 8:14-17, 9:13-18, 10:14-17)',
        // Rune symbol (diamond in center)
        'pixels(E, 15,8, 14,9, 16,9, 13,10, 17,10, 14,11, 16,11, 15,12)',
        // Sparkle particles floating
        'pixels(E, 13,4, 18,5, 10,7, 22,8, 11,13, 20,12)',
      ],
      chars: {
        B: { name: 'rune_field', role: 'body' },
        L: { name: 'rune_bright', role: 'body', tone: 'highlight' },
        A: { name: 'outer_ring', role: 'head' },
        E: { name: 'sparkle', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 15. FIRE TRAP ────────────────────────────────────────────
    {
      id: 'fire_trap_32',
      description: 'Floor vent fire trap — shoots flames upward periodically.',
      size: 32,
      draw: [
        // Flame burst
        'spans(F, 2:13-18, 3:12-19, 4:11-20, 5:12-19, 6:13-18)',
        // Flame core
        'spans(C, 3:14-17, 4:13-18, 5:14-17)',
        // Flame tip
        'pixels(H, 15,2, 16,2)',
        // Floor vent grate
        'spans(G, 7:10-21, 8:10-21, 9:10-21)',
        // Grate bars
        'spans(D, 8:12-12, 8:15-15, 8:18-18)',
        // Grate glow from heat
        'spans(A, 7:12-19)',
        // Floor context
        'spans(G, 10:8-23, 11:8-23)',
        // Floor shadow
        'spans(D, 11:8-10, 11:21-23)',
      ],
      chars: {
        G: { name: 'stone_grate', role: 'head' },
        D: { name: 'stone_shadow', role: 'head', tone: 'shadow' },
        F: { name: 'fire', role: 'accessory' },
        C: { name: 'fire_core', role: 'belt' },
        H: { name: 'fire_tip', role: 'belt', tone: 'highlight' },
        A: { name: 'heat_glow', role: 'leg' },
      },
      colors: {
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 16. TREASURE PEDESTAL ────────────────────────────────────
    {
      id: 'treasure_pedestal_32',
      description: 'Stone pedestal displaying a treasure item — boss room reward.',
      size: 32,
      draw: [
        // Floating item glow
        'spans(A, 4:13-18, 5:12-19, 6:12-19, 7:13-18)',
        // Item silhouette (gem)
        'spans(B, 5:14-17, 6:14-17)',
        // Item sparkle
        'pixels(L, 15,5, 17,5)',
        // Top plate
        'spans(G, 8:10-21, 9:10-21)',
        // Top highlight
        'spans(L, 8:12-19)',
        // Pillar
        'spans(G, 10:12-19, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19, 16:12-19, 17:12-19)',
        // Pillar shadow
        'spans(D, 10:18-19, 11:18-19, 12:18-19, 13:18-19, 14:18-19, 15:18-19, 16:18-19, 17:18-19)',
        // Pillar highlight
        'spans(L, 10:12-13, 11:12-13, 12:12-13)',
        // Base
        'spans(G, 18:10-21, 19:9-22, 20:9-22)',
        // Base shadow
        'spans(D, 20:9-12, 20:19-22)',
      ],
      chars: {
        B: { name: 'treasure_item', role: 'body' },
        L: { name: 'item_sparkle', role: 'body', tone: 'highlight' },
        G: { name: 'stone', role: 'head' },
        D: { name: 'stone_shadow', role: 'head', tone: 'shadow' },
        A: { name: 'glow_aura', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 17. CAGE TRAP ────────────────────────────────────────────
    {
      id: 'cage_trap_32',
      description: 'Dropping cage trap — springs down from ceiling to trap player.',
      size: 32,
      draw: [
        // Chain
        'spans(G, 2:15-16, 3:15-16)',
        // Top frame
        'spans(G, 4:9-22, 5:9-22)',
        // Vertical bars
        'spans(B, 6:9-10, 6:15-16, 6:21-22, 7:9-10, 7:15-16, 7:21-22, 8:9-10, 8:15-16, 8:21-22, 9:9-10, 9:15-16, 9:21-22, 10:9-10, 10:15-16, 10:21-22, 11:9-10, 11:15-16, 11:21-22, 12:9-10, 12:15-16, 12:21-22, 13:9-10, 13:15-16, 13:21-22, 14:9-10, 14:15-16, 14:21-22, 15:9-10, 15:15-16, 15:21-22, 16:9-10, 16:15-16, 16:21-22, 17:9-10, 17:15-16, 17:21-22)',
        // Bar shadow
        'spans(D, 6:10-10, 7:10-10, 8:10-10, 9:10-10, 10:10-10, 11:10-10, 12:10-10, 13:10-10, 14:10-10, 15:10-10, 16:10-10, 17:10-10)',
        // Cross bar
        'spans(G, 11:9-22)',
        // Bottom frame
        'spans(G, 18:9-22)',
      ],
      chars: {
        B: { name: 'iron_bars', role: 'body' },
        D: { name: 'bar_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'frame', role: 'head' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head: { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ─── 18. ENCHANTING TABLE ─────────────────────────────────────
    {
      id: 'enchanting_table_32',
      description: 'Magic enchanting table with floating runes — upgrade equipment.',
      size: 32,
      draw: [
        // Floating rune particles
        'pixels(A, 12,3, 16,2, 20,4, 10,5, 22,5)',
        // Table top
        'spans(B, 7:8-23, 8:8-23, 9:8-23)',
        // Table highlight
        'spans(L, 7:10-21)',
        // Table shadow
        'spans(D, 9:8-10, 9:21-23)',
        // Glowing book on table
        'spans(E, 7:13-18, 8:13-18)',
        // Book glow
        'pixels(A, 14,7, 17,7, 15,8, 16,8)',
        // Legs
        'spans(G, 10:9-11, 10:20-22, 11:9-11, 11:20-22, 12:9-11, 12:20-22, 13:9-11, 13:20-22, 14:9-11, 14:20-22, 15:9-11, 15:20-22)',
        // Leg shadow
        'spans(D, 14:9-9, 14:20-20, 15:9-9, 15:20-20)',
        // Cross brace
        'spans(G, 12:11-20)',
        // Rune circle on floor
        'spans(A, 16:11-20, 17:10-11, 17:20-21)',
      ],
      chars: {
        B: { name: 'dark_wood', role: 'body' },
        D: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'legs', role: 'head' },
        E: { name: 'magic_book', role: 'belt' },
        A: { name: 'magic_glow', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 19. LADDER ───────────────────────────────────────────────
    {
      id: 'dungeon_ladder_32',
      description: 'Wooden ladder for climbing between dungeon levels.',
      size: 32,
      draw: [
        // Left rail
        'spans(B, 3:10-11, 4:10-11, 5:10-11, 6:10-11, 7:10-11, 8:10-11, 9:10-11, 10:10-11, 11:10-11, 12:10-11, 13:10-11, 14:10-11, 15:10-11, 16:10-11, 17:10-11, 18:10-11, 19:10-11, 20:10-11)',
        // Right rail
        'spans(B, 3:20-21, 4:20-21, 5:20-21, 6:20-21, 7:20-21, 8:20-21, 9:20-21, 10:20-21, 11:20-21, 12:20-21, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21, 19:20-21, 20:20-21)',
        // Rail shadow
        'spans(D, 3:11-11, 4:11-11, 5:11-11, 6:11-11, 7:11-11, 8:11-11, 9:11-11, 10:11-11, 11:11-11, 12:11-11, 13:11-11, 14:11-11, 15:11-11, 16:11-11, 17:11-11, 18:11-11, 19:11-11, 20:11-11)',
        // Rungs
        'spans(G, 5:11-20, 8:11-20, 11:11-20, 14:11-20, 17:11-20)',
        // Rung shadow
        'spans(D, 6:12-19, 9:12-19, 12:12-19, 15:12-19, 18:12-19)',
      ],
      chars: {
        B: { name: 'wood_rail', role: 'body' },
        D: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'rungs', role: 'head' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 20. ACID POOL ────────────────────────────────────────────
    {
      id: 'acid_pool_32',
      description: 'Bubbling green acid pool — dissolves anything that touches it.',
      size: 32,
      draw: [
        // Fume wisps
        'pixels(A, 13,4, 17,3, 15,5, 20,5)',
        // Pool surface
        'spans(B, 7:11-20, 8:9-22, 9:8-23, 10:8-23, 11:8-23, 12:9-22, 13:11-20)',
        // Bright spots
        'spans(L, 8:13-17, 9:11-14, 10:16-19)',
        // Dark acid
        'spans(D, 11:20-23, 12:20-22, 13:18-20)',
        // Bubbles
        'pixels(H, 14,8, 18,9, 12,11, 20,10, 15,12)',
        // Stone rim back
        'spans(G, 6:10-21)',
        // Stone rim front
        'spans(G, 14:9-22, 15:10-21)',
        // Rim shadow
        'spans(D, 15:19-21)',
        // Rim highlight
        'spans(L, 14:11-20)',
        // Dissolved item (bone sticking out)
        'pixels(E, 11,10, 11,11, 12,10)',
      ],
      chars: {
        B: { name: 'acid', role: 'body' },
        D: { name: 'acid_dark', role: 'body', tone: 'shadow' },
        L: { name: 'acid_bright', role: 'body', tone: 'highlight' },
        H: { name: 'bubble', role: 'accessory' },
        G: { name: 'stone_rim', role: 'head' },
        A: { name: 'fumes', role: 'belt' },
        E: { name: 'bone_fragment', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        leg:       { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
