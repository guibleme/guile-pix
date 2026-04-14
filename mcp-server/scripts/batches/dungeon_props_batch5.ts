/**
 * Dungeon Props Bundle — Batch 5: Decorative & Atmospheric (32x32 DSL)
 * 20 unique decorative prop templates for dungeon/roguelike games.
 * Neo-SNES style, DB16 palette, 5-value shading via tone chars.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'props',
  exportNames: { templates: 'DUNGEON_DECOR_32_TEMPLATES', schemes: 'DUNGEON_DECOR_32_COLOR_SCHEMES' },
  templates: [

    // ─── 1. STONE ALTAR ───────────────────────────────────────────
    {
      id: 'stone_altar_32',
      description: 'Ancient sacrificial altar with blood stains and candle holders.',
      size: 32,
      draw: [
        // Candle left
        'spans(A, 4:9-10, 5:9-10, 6:9-10)',
        // Candle flame left
        'pixels(F, 9,3, 10,3)',
        // Candle right
        'spans(A, 4:21-22, 5:21-22, 6:21-22)',
        // Candle flame right
        'pixels(F, 21,3, 22,3)',
        // Table top
        'spans(B, 7:8-23, 8:8-23, 9:8-23)',
        // Top highlight
        'spans(L, 7:10-21)',
        // Top shadow
        'spans(D, 9:8-10, 9:21-23)',
        // Blood stain on top
        'spans(R, 8:14-17, 9:13-18)',
        // Carved front face
        'spans(B, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23)',
        // Face shadow
        'spans(D, 13:21-23, 14:21-23)',
        // Face highlight
        'spans(L, 10:8-9, 11:8-9)',
        // Carved symbol
        'spans(G, 11:13-18, 12:12-13, 12:18-19, 13:13-18)',
        // Base
        'spans(B, 15:7-24, 16:7-24)',
        // Base shadow
        'spans(D, 16:7-10, 16:21-24)',
      ],
      chars: {
        B: { name: 'stone', role: 'body' },
        D: { name: 'stone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stone_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'carved_symbol', role: 'head' },
        A: { name: 'candle_wax', role: 'accessory' },
        F: { name: 'candle_flame', role: 'belt' },
        R: { name: 'blood_stain', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#597dce' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#442434', base: '#d04648', highlight: '#d04648' },
      },
    },

    // ─── 2. GARGOYLE STATUE ───────────────────────────────────────
    {
      id: 'gargoyle_statue_32',
      description: 'Menacing stone gargoyle perched on a pedestal — may come alive.',
      size: 32,
      draw: [
        // Horn left
        'spans(B, 3:11-12, 4:12-12)',
        // Horn right
        'spans(B, 3:19-20, 4:19-19)',
        // Head
        'spans(B, 4:13-18, 5:12-19, 6:12-19)',
        // Head highlight
        'spans(L, 4:14-17, 5:12-14)',
        // Eyes (glowing)
        'pixels(E, 14,5, 17,5)',
        // Mouth
        'spans(D, 6:14-17)',
        // Neck
        'spans(B, 7:13-18)',
        // Wings spread
        'spans(B, 8:7-12, 8:19-24, 9:6-11, 9:20-25)',
        // Wing shadow
        'spans(D, 9:6-8, 9:23-25)',
        // Body
        'spans(B, 8:13-18, 9:12-19, 10:12-19, 11:12-19, 12:13-18)',
        // Body shadow
        'spans(D, 10:18-19, 11:18-19, 12:17-18)',
        // Claws
        'spans(B, 13:11-13, 13:18-20)',
        // Tail
        'spans(B, 12:19-22, 13:21-23)',
        // Pedestal top
        'spans(G, 14:10-21, 15:10-21)',
        // Pedestal shaft
        'spans(G, 16:11-20, 17:11-20)',
        // Pedestal base
        'spans(G, 18:10-21, 19:9-22)',
        // Pedestal shadow
        'spans(D, 19:9-11, 19:20-22)',
      ],
      chars: {
        B: { name: 'stone_body', role: 'body' },
        D: { name: 'stone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stone_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'glowing_eyes', role: 'eye' },
        G: { name: 'pedestal', role: 'head' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:  { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 3. TOMBSTONE ─────────────────────────────────────────────
    {
      id: 'dungeon_tombstone_32',
      description: 'Weathered tombstone with carved inscription — dungeon graveyard.',
      size: 32,
      draw: [
        // Rounded top
        'spans(B, 5:13-18, 6:12-19, 7:11-20)',
        // Top highlight
        'spans(L, 5:14-17, 6:12-14)',
        // Body
        'spans(B, 8:11-20, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20)',
        // Body shadow
        'spans(D, 12:19-20, 13:19-20, 14:19-20, 15:19-20, 16:19-20)',
        // Body highlight
        'spans(L, 8:11-12, 9:11-12, 10:11-12)',
        // Inscription text lines
        'spans(G, 9:13-18, 10:13-16, 11:13-18, 12:13-15)',
        // Crack
        'pixels(D, 17,14, 18,15, 19,14)',
        // Cross carving
        'spans(G, 6:15-16, 7:14-17, 8:15-16)',
        // Ground mound
        'spans(A, 17:10-21, 18:9-22)',
        // Ground shadow
        'spans(D, 18:9-11, 18:20-22)',
        // Moss patches
        'pixels(M, 11,16, 13,15, 20,16)',
      ],
      chars: {
        B: { name: 'stone', role: 'body' },
        D: { name: 'stone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stone_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'inscription', role: 'head' },
        A: { name: 'dirt_mound', role: 'accessory' },
        M: { name: 'moss', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#346524', base: '#346524', highlight: '#346524' },
      },
    },

    // ─── 4. SKULL PILE ────────────────────────────────────────────
    {
      id: 'skull_pile_32',
      description: 'Heap of skulls and bones — gruesome dungeon decoration.',
      size: 32,
      draw: [
        // Top skull
        'spans(B, 6:13-18, 7:12-19, 8:12-19, 9:13-18)',
        // Top skull eyes
        'pixels(E, 14,7, 17,7)',
        // Top skull highlight
        'spans(L, 6:14-17, 7:12-14)',
        // Left skull
        'spans(B, 9:8-13, 10:8-14, 11:8-14, 12:9-13)',
        // Left skull eyes
        'pixels(E, 10,10, 12,10)',
        // Right skull
        'spans(B, 9:18-23, 10:17-23, 11:17-23, 12:18-22)',
        // Right skull eyes
        'pixels(E, 19,10, 21,10)',
        // Bone pile base
        'spans(A, 13:8-23, 14:7-24, 15:8-23)',
        // Scattered bone details
        'pixels(B, 10,14, 14,14, 20,14, 12,15, 18,15)',
        // Shadow
        'spans(D, 15:8-10, 15:21-23)',
      ],
      chars: {
        B: { name: 'bone', role: 'body' },
        D: { name: 'bone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'bone_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'eye_sockets', role: 'eye' },
        A: { name: 'bone_pile', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── 5. COBWEB LARGE ──────────────────────────────────────────
    {
      id: 'cobweb_large_32',
      description: 'Large corner cobweb with spider — abandoned dungeon atmosphere.',
      size: 32,
      draw: [
        // Main web strands (radial from top-left corner)
        'pixels(B, 4,4, 5,5, 6,6, 7,7, 8,8, 9,9, 10,10, 11,11, 12,12)',
        'pixels(B, 4,8, 5,9, 6,10, 7,11, 8,12)',
        'pixels(B, 8,4, 9,5, 10,6, 11,7, 12,8)',
        'pixels(B, 4,12, 5,12, 6,12, 7,12)',
        'pixels(B, 12,4, 12,5, 12,6, 12,7)',
        // Cross strands (connecting arcs)
        'spans(B, 6:5-7, 8:5-5, 8:7-9, 10:7-7, 10:9-11)',
        // Web highlight
        'pixels(L, 6,6, 8,8, 10,10)',
        // Spider body
        'spans(A, 9:13-14, 10:13-14)',
        // Spider legs
        'pixels(A, 12,9, 11,10, 15,9, 16,10, 12,11, 15,11)',
        // Spider eyes
        'pixels(E, 13,9)',
      ],
      chars: {
        B: { name: 'web_strand', role: 'body' },
        L: { name: 'web_shine', role: 'body', tone: 'highlight' },
        A: { name: 'spider', role: 'accessory' },
        E: { name: 'spider_eyes', role: 'head' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#d04648', base: '#d04648', highlight: '#d04648' },
      },
    },

    // ─── 6. HANGING BANNER ────────────────────────────────────────
    {
      id: 'hanging_banner_32',
      description: 'Tattered hanging banner with faded crest — dungeon faction mark.',
      size: 32,
      draw: [
        // Rod
        'spans(G, 4:8-23, 5:8-23)',
        // Rod end caps
        'spans(G, 3:8-9, 3:22-23, 6:8-9, 6:22-23)',
        // Banner fabric
        'spans(B, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:11-20, 18:12-19)',
        // Banner shadow
        'spans(D, 12:19-21, 13:19-21, 14:19-21, 15:19-21, 16:19-21, 17:19-20)',
        // Banner highlight
        'spans(L, 6:10-12, 7:10-12, 8:10-12, 9:10-12)',
        // Crest (shield shape)
        'spans(A, 9:13-18, 10:13-18, 11:13-18, 12:13-18, 13:14-17, 14:15-16)',
        // Crest highlight
        'pixels(E, 15,10, 16,10)',
        // Torn edges
        'pixels(D, 21,17, 20,16, 10,18, 19,18)',
        // Banner point
        'spans(B, 19:14-17, 20:15-16)',
      ],
      chars: {
        B: { name: 'fabric', role: 'body' },
        D: { name: 'fabric_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'fabric_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'iron_rod', role: 'head' },
        A: { name: 'crest', role: 'accessory' },
        E: { name: 'crest_detail', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 7. BROKEN PILLAR ─────────────────────────────────────────
    {
      id: 'broken_pillar_32',
      description: 'Crumbled stone pillar — ruined dungeon architecture.',
      size: 32,
      draw: [
        // Broken top (jagged)
        'spans(B, 5:12-18, 6:12-19, 7:12-17)',
        // Top highlight
        'spans(L, 5:13-16)',
        // Pillar shaft
        'spans(B, 8:12-19, 9:12-19, 10:12-19, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19)',
        // Shaft shadow
        'spans(D, 8:18-19, 9:18-19, 10:18-19, 11:18-19, 12:18-19, 13:18-19, 14:18-19, 15:18-19)',
        // Shaft highlight
        'spans(L, 8:12-13, 9:12-13, 10:12-13, 11:12-13)',
        // Crack lines
        'pixels(D, 14,10, 15,11, 16,10, 14,13, 16,14)',
        // Base
        'spans(B, 16:10-21, 17:10-21, 18:10-21)',
        // Base shadow
        'spans(D, 18:10-12, 18:19-21)',
        // Rubble pieces
        'spans(A, 19:8-11, 19:20-23, 20:7-10, 20:21-24)',
        // Rubble shadow
        'spans(D, 20:7-8, 20:23-24)',
      ],
      chars: {
        B: { name: 'stone', role: 'body' },
        D: { name: 'stone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stone_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'rubble', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },
      },
    },

    // ─── 8. SARCOPHAGUS ───────────────────────────────────────────
    {
      id: 'dungeon_sarcophagus_32',
      description: 'Ornate stone sarcophagus with carved face on lid — undead inside.',
      size: 32,
      draw: [
        // Lid top
        'spans(L, 6:8-23, 7:8-23)',
        // Lid front
        'spans(B, 8:8-23, 9:8-23, 10:8-23)',
        // Face carving on lid
        'spans(G, 8:13-18, 9:12-19, 10:13-18)',
        // Face eyes
        'pixels(E, 14,9, 17,9)',
        // Face mouth
        'spans(G, 10:14-17)',
        // Body
        'spans(B, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24)',
        // Body shadow
        'spans(D, 15:22-24, 16:22-24, 17:7-24)',
        // Body highlight
        'spans(L, 11:7-8, 12:7-8, 13:7-8)',
        // Decorative band
        'spans(A, 13:8-23, 14:8-23)',
        // Base
        'spans(B, 18:7-24, 19:7-24)',
        // Base shadow
        'spans(D, 19:7-10, 19:21-24)',
      ],
      chars: {
        B: { name: 'stone', role: 'body' },
        D: { name: 'stone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stone_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'face_carving', role: 'head' },
        E: { name: 'face_eyes', role: 'eye' },
        A: { name: 'decorative_band', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 9. WALL PAINTING ─────────────────────────────────────────
    {
      id: 'wall_painting_32',
      description: 'Faded dungeon wall painting — ancient mural with mysterious scene.',
      size: 32,
      draw: [
        // Frame
        'spans(G, 5:8-23, 6:8-8, 6:23-23, 7:8-8, 7:23-23, 8:8-8, 8:23-23, 9:8-8, 9:23-23, 10:8-8, 10:23-23, 11:8-8, 11:23-23, 12:8-8, 12:23-23, 13:8-8, 13:23-23, 14:8-8, 14:23-23, 15:8-8, 15:23-23, 16:8-8, 16:23-23, 17:8-23)',
        // Canvas background
        'spans(B, 6:9-22, 7:9-22, 8:9-22, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22)',
        // Mountain scene
        'spans(A, 8:12-14, 9:11-15, 10:10-16)',
        // Sun/moon
        'spans(E, 7:18-19, 8:18-19)',
        // Tree silhouette
        'spans(A, 12:18-19, 13:17-20, 14:18-19, 15:18-19, 16:18-19)',
        // Faded/damaged areas
        'pixels(D, 13,7, 18,10, 10,13, 20,15)',
        // Canvas shadow
        'spans(D, 16:9-22)',
      ],
      chars: {
        B: { name: 'canvas', role: 'body' },
        D: { name: 'faded_area', role: 'body', tone: 'shadow' },
        G: { name: 'frame', role: 'head' },
        A: { name: 'paint_dark', role: 'accessory' },
        E: { name: 'paint_bright', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 10. TORTURE RACK ─────────────────────────────────────────
    {
      id: 'torture_rack_32',
      description: 'Medieval stretching rack — dark dungeon torture device.',
      size: 32,
      draw: [
        // Frame uprights
        'spans(B, 5:8-10, 5:21-23, 6:8-10, 6:21-23, 7:8-10, 7:21-23, 8:8-10, 8:21-23, 9:8-10, 9:21-23, 10:8-10, 10:21-23, 11:8-10, 11:21-23, 12:8-10, 12:21-23)',
        // Top cross bar
        'spans(B, 5:10-21)',
        // Bottom cross bar
        'spans(B, 12:10-21)',
        // Frame shadow
        'spans(D, 5:8-8, 6:8-8, 7:8-8, 8:8-8, 9:8-8, 10:8-8, 11:8-8, 12:8-8)',
        // Bed planks
        'spans(G, 6:11-20, 7:11-20, 8:11-20, 9:11-20, 10:11-20, 11:11-20)',
        // Plank shadow
        'spans(D, 10:18-20, 11:18-20)',
        // Chain/rope left
        'spans(A, 7:10-11, 8:10-10)',
        // Chain/rope right
        'spans(A, 7:20-21, 8:21-21)',
        // Crank wheel
        'spans(A, 6:22-24, 7:22-24, 8:22-24)',
        // Crank shadow
        'pixels(D, 24,8)',
        // Shackles
        'pixels(E, 11,7, 20,7)',
        // Base feet
        'spans(B, 13:8-10, 13:21-23)',
      ],
      chars: {
        B: { name: 'dark_wood', role: 'body' },
        D: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'bed_planks', role: 'head' },
        A: { name: 'rope_chain', role: 'accessory' },
        E: { name: 'iron_shackles', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 11. IRON MAIDEN ──────────────────────────────────────────
    {
      id: 'iron_maiden_32',
      description: 'Upright iron maiden torture device — spikes visible inside.',
      size: 32,
      draw: [
        // Top dome
        'spans(B, 3:12-19, 4:11-20, 5:11-20)',
        // Top highlight
        'spans(L, 3:14-17, 4:11-14)',
        // Body
        'spans(B, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21)',
        // Body shadow
        'spans(D, 12:20-21, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21)',
        // Body highlight
        'spans(L, 6:10-11, 7:10-11, 8:10-11, 9:10-11)',
        // Door seam (vertical)
        'spans(D, 6:15-16, 7:15-16, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16)',
        // Face viewport
        'spans(A, 7:13-14, 7:17-18, 8:13-18, 9:13-14, 9:17-18)',
        // Hinges
        'spans(G, 7:10-10, 12:10-10, 17:10-10)',
        // Spikes visible inside viewport
        'pixels(E, 14,8, 16,8, 18,8)',
        // Base
        'spans(B, 19:10-21, 20:9-22)',
        // Base shadow
        'spans(D, 20:9-11, 20:20-22)',
      ],
      chars: {
        B: { name: 'iron_body', role: 'body' },
        D: { name: 'iron_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'iron_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'hinges', role: 'head' },
        A: { name: 'viewport', role: 'accessory' },
        E: { name: 'spikes', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        belt:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── 12. DUNGEON FOUNTAIN ─────────────────────────────────────
    {
      id: 'dungeon_fountain_32',
      description: 'Stone fountain with green-tinted water — drink at your risk.',
      size: 32,
      draw: [
        // Water spout
        'pixels(W, 15,3, 16,3, 15,4, 16,4, 14,5, 17,5)',
        // Spout top
        'spans(G, 5:14-17, 6:14-17)',
        // Spout shaft
        'spans(G, 7:15-16, 8:15-16, 9:15-16)',
        // Bowl rim
        'spans(G, 10:10-21)',
        // Water surface
        'spans(W, 10:12-19, 11:11-20)',
        // Bowl body
        'spans(B, 11:10-11, 11:20-21, 12:10-11, 12:20-21, 13:11-20)',
        // Bowl shadow
        'spans(D, 13:18-20)',
        // Bowl highlight
        'spans(L, 11:10-10, 12:10-10)',
        // Pedestal
        'spans(G, 14:13-18, 15:13-18, 16:13-18, 17:13-18)',
        // Pedestal shadow
        'spans(D, 14:17-18, 15:17-18, 16:17-18, 17:17-18)',
        // Base
        'spans(G, 18:10-21, 19:9-22)',
        // Base shadow
        'spans(D, 19:9-11, 19:20-22)',
        // Drip
        'pixels(W, 16,6, 17,7)',
      ],
      chars: {
        B: { name: 'stone_bowl', role: 'body' },
        D: { name: 'stone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stone_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'stone_structure', role: 'head' },
        W: { name: 'water', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#346524', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 13. MUSHROOM CLUSTER ─────────────────────────────────────
    {
      id: 'mushroom_cluster_32',
      description: 'Cluster of small dungeon mushrooms — decorative floor detail.',
      size: 32,
      draw: [
        // Big mushroom cap
        'spans(B, 7:13-18, 8:12-19, 9:13-18)',
        // Big cap highlight
        'spans(L, 7:14-17, 8:12-14)',
        // Big stem
        'spans(A, 10:14-17, 11:14-17, 12:15-16)',
        // Medium mushroom cap (left)
        'spans(B, 10:8-12, 11:9-11)',
        // Medium cap highlight
        'pixels(L, 9,10, 10,10)',
        // Medium stem
        'spans(A, 12:9-11, 13:10-10)',
        // Small mushroom (right)
        'spans(B, 11:20-22, 12:21-21)',
        // Small stem
        'spans(A, 13:21-21, 14:21-21)',
        // Tiny mushroom (far left)
        'spans(B, 12:7-8)',
        'pixels(A, 7,13)',
        // Ground
        'spans(G, 14:7-24, 15:8-23)',
        // Ground shadow
        'spans(D, 15:8-10, 15:21-23)',
        // Spore particles
        'pixels(E, 16,6, 20,8, 8,9, 22,11)',
      ],
      chars: {
        B: { name: 'mushroom_cap', role: 'body' },
        L: { name: 'cap_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'stem', role: 'accessory' },
        G: { name: 'ground', role: 'head' },
        D: { name: 'ground_shadow', role: 'head', tone: 'shadow' },
        E: { name: 'spores', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
        belt:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 14. BOOKSHELF ────────────────────────────────────────────
    {
      id: 'dungeon_bookshelf_32',
      description: 'Tall wooden bookshelf filled with dusty tomes — dungeon library.',
      size: 32,
      draw: [
        // Frame
        'spans(G, 3:8-23, 4:8-8, 4:23-23, 5:8-8, 5:23-23, 6:8-8, 6:23-23, 7:8-8, 7:23-23, 8:8-23, 9:8-8, 9:23-23, 10:8-8, 10:23-23, 11:8-8, 11:23-23, 12:8-8, 12:23-23, 13:8-23, 14:8-8, 14:23-23, 15:8-8, 15:23-23, 16:8-8, 16:23-23, 17:8-8, 17:23-23, 18:8-23)',
        // Shelf boards
        'spans(G, 8:8-23, 13:8-23, 18:8-23)',
        // Books row 1 (top shelf)
        'spans(B, 4:10-12, 4:14-16, 4:18-22)',
        'spans(B, 5:10-12, 5:14-16, 5:18-22)',
        'spans(B, 6:10-12, 6:14-16, 6:18-22)',
        'spans(B, 7:10-12, 7:14-16, 7:18-22)',
        // Books row 2 (middle)
        'spans(A, 9:10-13, 9:15-18, 9:20-22)',
        'spans(A, 10:10-13, 10:15-18, 10:20-22)',
        'spans(A, 11:10-13, 11:15-18, 11:20-22)',
        'spans(A, 12:10-13, 12:15-18, 12:20-22)',
        // Books row 3 (bottom)
        'spans(E, 14:10-14, 14:16-20)',
        'spans(E, 15:10-14, 15:16-20)',
        'spans(E, 16:10-14, 16:16-20)',
        'spans(E, 17:10-14, 17:16-20)',
        // Book gap
        'pixels(D, 13,5, 13,6, 13,7, 19,10, 19,11, 15,15, 15,16)',
      ],
      chars: {
        B: { name: 'books_red', role: 'body' },
        D: { name: 'gap_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'wood_frame', role: 'head' },
        A: { name: 'books_blue', role: 'accessory' },
        E: { name: 'books_brown', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 15. CRYSTAL FORMATION ────────────────────────────────────
    {
      id: 'crystal_formation_32',
      description: 'Purple amethyst crystal formation growing from cave wall.',
      size: 32,
      draw: [
        // Tall crystal
        'spans(B, 3:15-17, 4:14-18, 5:14-18, 6:14-18, 7:14-18, 8:15-17)',
        // Tall crystal highlight
        'spans(L, 3:15-16, 4:14-15, 5:14-15)',
        // Tall crystal shadow
        'spans(D, 6:17-18, 7:17-18)',
        // Medium crystal left
        'spans(B, 6:10-12, 7:9-13, 8:9-13, 9:10-12)',
        // Medium highlight
        'spans(L, 6:10-10, 7:9-10)',
        // Short crystal right
        'spans(B, 7:20-22, 8:19-22, 9:20-22)',
        // Short highlight
        'pixels(L, 20,7)',
        // Tiny crystal
        'spans(B, 8:24-25, 9:24-25)',
        // Rock base
        'spans(G, 9:8-23, 10:8-23, 11:8-23, 12:9-22)',
        // Rock shadow
        'spans(D, 11:8-10, 11:21-23, 12:9-11, 12:20-22)',
        // Rock highlight
        'spans(L, 9:9-11)',
        // Glow particles
        'pixels(A, 12,4, 8,7, 23,6, 7,10)',
      ],
      chars: {
        B: { name: 'amethyst', role: 'body' },
        D: { name: 'crystal_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'crystal_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'rock', role: 'head' },
        A: { name: 'glow', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 16. ALCHEMY STATION ──────────────────────────────────────
    {
      id: 'alchemy_station_32',
      description: 'Alchemy workbench with bubbling potions and ingredients.',
      size: 32,
      draw: [
        // Bubbles rising
        'pixels(A, 12,3, 14,4, 18,3)',
        // Flask left (bubbling)
        'spans(B, 5:10-13, 6:10-13, 7:11-12)',
        // Flask right (tall)
        'spans(E, 4:18-20, 5:18-20, 6:18-20, 7:19-19)',
        // Table top
        'spans(G, 8:7-24, 9:7-24)',
        // Table highlight
        'spans(L, 8:9-22)',
        // Ingredients on table
        'pixels(A, 15,8, 16,8, 22,8, 23,8)',
        // Open book
        'spans(F, 8:13-17, 9:13-17)',
        // Table legs
        'spans(G, 10:8-9, 10:22-23, 11:8-9, 11:22-23, 12:8-9, 12:22-23, 13:8-9, 13:22-23, 14:8-9, 14:22-23)',
        // Leg shadow
        'spans(D, 13:8-8, 14:8-8, 13:22-22, 14:22-22)',
        // Shelf below
        'spans(G, 12:9-22)',
        // Bottles on shelf
        'spans(A, 10:12-13, 11:12-13, 10:17-18, 11:17-18)',
      ],
      chars: {
        G: { name: 'wood_table', role: 'head' },
        D: { name: 'wood_shadow', role: 'head', tone: 'shadow' },
        L: { name: 'wood_highlight', role: 'head', tone: 'highlight' },
        B: { name: 'green_flask', role: 'body' },
        E: { name: 'blue_flask', role: 'accessory' },
        A: { name: 'ingredients', role: 'belt' },
        F: { name: 'book', role: 'leg' },
      },
      colors: {
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── 17. MOSS WALL ────────────────────────────────────────────
    {
      id: 'moss_wall_section_32',
      description: 'Dungeon wall section with creeping moss and water stains.',
      size: 32,
      draw: [
        // Stone wall
        'spans(B, 3:5-26, 4:5-26, 5:5-26, 6:5-26, 7:5-26, 8:5-26, 9:5-26, 10:5-26, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26)',
        // Mortar lines (horizontal)
        'spans(D, 6:5-26, 10:5-26, 14:5-26)',
        // Mortar lines (vertical offset)
        'spans(D, 3:15-15, 4:15-15, 5:15-15, 7:10-10, 8:10-10, 9:10-10, 7:20-20, 8:20-20, 9:20-20, 11:15-15, 12:15-15, 13:15-15)',
        // Wall highlight
        'spans(L, 3:6-13, 4:6-8, 7:6-8)',
        // Moss patches
        'spans(A, 8:6-9, 9:6-10, 10:7-9, 12:18-22, 13:17-23, 14:19-22)',
        // Water stain
        'spans(E, 5:20-22, 6:21-22, 7:21-21, 8:21-21)',
        // Crack
        'pixels(D, 18,4, 19,5, 18,6)',
      ],
      chars: {
        B: { name: 'stone_wall', role: 'body' },
        D: { name: 'mortar_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stone_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'moss', role: 'accessory' },
        E: { name: 'water_stain', role: 'head' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#597dce' },
      },
    },

    // ─── 18. TREASURE MAP TABLE ───────────────────────────────────
    {
      id: 'treasure_map_table_32',
      description: 'Wooden table with spread-out treasure map and compass.',
      size: 32,
      draw: [
        // Map on table
        'spans(A, 6:10-21, 7:9-22, 8:9-22, 9:10-21)',
        // Map highlight
        'spans(L, 6:12-19)',
        // Map marks
        'pixels(E, 15,7, 16,7, 18,8, 13,8, 20,7)',
        // X mark
        'pixels(F, 17,8, 19,8, 18,9)',
        // Compass (small)
        'spans(G, 6:22-24, 7:22-24, 8:22-24)',
        // Table top
        'spans(B, 10:8-23, 11:8-23)',
        // Table shadow
        'spans(D, 11:8-10, 11:21-23)',
        // Table legs
        'spans(B, 12:9-10, 12:21-22, 13:9-10, 13:21-22, 14:9-10, 14:21-22, 15:9-10, 15:21-22)',
        // Leg shadow
        'spans(D, 14:9-9, 15:9-9, 14:21-21, 15:21-21)',
      ],
      chars: {
        B: { name: 'wood_table', role: 'body' },
        D: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        A: { name: 'map_parchment', role: 'accessory' },
        L: { name: 'map_highlight', role: 'accessory', tone: 'highlight' },
        E: { name: 'map_marks', role: 'head' },
        F: { name: 'x_mark', role: 'belt' },
        G: { name: 'compass', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 19. BLOOD POOL ───────────────────────────────────────────
    {
      id: 'blood_pool_32',
      description: 'Dark blood pool on dungeon floor — ominous decoration.',
      size: 32,
      draw: [
        // Blood pool main
        'spans(B, 8:12-19, 9:10-21, 10:9-22, 11:9-22, 12:10-21, 13:12-19)',
        // Blood darker areas
        'spans(D, 10:19-22, 11:19-22, 12:19-21)',
        // Blood highlight (wet shine)
        'spans(L, 8:14-17, 9:11-14)',
        // Blood splatter
        'pixels(B, 14,7, 7,10, 23,11, 14,14, 8,13)',
        // Floor context
        'spans(G, 6:7-24, 7:7-24, 14:7-24, 15:7-24)',
        // Floor shadow
        'spans(D, 15:7-9, 15:22-24)',
      ],
      chars: {
        B: { name: 'blood', role: 'body' },
        D: { name: 'blood_dark', role: 'body', tone: 'shadow' },
        L: { name: 'blood_shine', role: 'body', tone: 'highlight' },
        G: { name: 'stone_floor', role: 'head' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#d04648' },
        head: { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },
      },
    },

    // ─── 20. DUNGEON THRONE ───────────────────────────────────────
    {
      id: 'dungeon_throne_32',
      description: 'Dark throne of the dungeon boss — ornate with skull motif.',
      size: 32,
      draw: [
        // Back rest top (tall, pointed)
        'spans(B, 2:12-19, 3:11-20, 4:11-20, 5:11-20, 6:11-20, 7:11-20, 8:11-20, 9:11-20)',
        // Back highlight
        'spans(L, 2:14-17, 3:11-14, 4:11-12)',
        // Back shadow
        'spans(D, 5:19-20, 6:19-20, 7:19-20, 8:19-20, 9:19-20)',
        // Skull motif at top
        'spans(A, 4:14-17, 5:13-18, 6:14-17)',
        // Skull eyes
        'pixels(E, 15,5, 17,5)',
        // Armrest left
        'spans(G, 10:8-12, 11:8-12, 12:8-12)',
        // Armrest right
        'spans(G, 10:19-23, 11:19-23, 12:19-23)',
        // Armrest shadow
        'spans(D, 12:8-9, 12:22-23)',
        // Seat
        'spans(B, 10:12-19, 11:12-19, 12:12-19)',
        // Seat cushion
        'spans(C, 10:13-18, 11:13-18)',
        // Seat shadow
        'spans(D, 12:17-19)',
        // Front legs
        'spans(G, 13:8-10, 13:21-23, 14:8-10, 14:21-23, 15:8-10, 15:21-23, 16:8-10, 16:21-23)',
        // Leg shadow
        'spans(D, 15:8-8, 16:8-8, 15:21-21, 16:21-21)',
        // Foot decorations
        'spans(G, 17:7-11, 17:20-24)',
      ],
      chars: {
        B: { name: 'dark_wood', role: 'body' },
        D: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'armrest_legs', role: 'head' },
        A: { name: 'skull_motif', role: 'accessory' },
        E: { name: 'skull_eyes', role: 'eye' },
        C: { name: 'cushion', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

  ],
};

export default batch;
