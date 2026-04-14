/**
 * Dungeon Props Bundle — Batch 2: Light Sources (32x32 DSL)
 * 20 unique light source templates for dungeon/roguelike games.
 * Neo-SNES style, DB16 palette, 5-value shading via tone chars.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'props',
  exportNames: { templates: 'DUNGEON_LIGHTS_32_TEMPLATES', schemes: 'DUNGEON_LIGHTS_32_COLOR_SCHEMES' },
  templates: [

    // ─── 1. WALL TORCH ────────────────────────────────────────────
    {
      id: 'wall_torch_32',
      description: 'Iron wall-mounted torch with flickering flame and warm glow.',
      size: 32,
      draw: [
        // Flame tip
        'spans(F, 4:14-17, 5:13-18)',
        // Flame body
        'spans(F, 6:13-18, 7:14-17)',
        // Flame core (bright)
        'pixels(C, 15,5, 16,5, 15,6, 16,6)',
        // Flame highlight
        'pixels(H, 15,4, 16,4)',
        // Torch head
        'spans(B, 8:14-17, 9:14-17)',
        // Shaft
        'spans(B, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16)',
        // Shaft shadow
        'spans(D, 10:16-16, 11:16-16, 12:16-16, 13:16-16, 14:16-16, 15:16-16, 16:16-16)',
        // Shaft highlight
        'spans(L, 10:15-15, 11:15-15, 12:15-15)',
        // Wall bracket
        'spans(G, 16:12-14, 17:12-14, 16:17-19, 17:17-19)',
        // Wall bracket back plate
        'spans(G, 18:13-18, 19:13-18, 20:13-18)',
        // Bracket shadow
        'spans(D, 20:13-14)',
        // Glow effect
        'pixels(A, 12,6, 19,6, 13,3, 18,3)',
      ],
      chars: {
        B: { name: 'torch_head', role: 'body' },
        D: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        F: { name: 'flame', role: 'accessory' },
        C: { name: 'flame_core', role: 'leg' },
        H: { name: 'flame_tip', role: 'leg', tone: 'highlight' },
        G: { name: 'iron_bracket', role: 'head' },
        A: { name: 'glow_particles', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 2. STANDING BRAZIER ──────────────────────────────────────
    {
      id: 'standing_brazier_32',
      description: 'Tall iron brazier with roaring fire — main dungeon light source.',
      size: 32,
      draw: [
        // Fire top
        'spans(F, 3:13-18, 4:12-19, 5:12-19, 6:13-18)',
        // Fire core
        'pixels(C, 14,4, 17,4, 15,5, 16,5)',
        // Fire highlight
        'pixels(H, 15,3, 16,3)',
        // Bowl rim
        'spans(G, 7:10-21, 8:10-21)',
        // Bowl interior
        'spans(A, 7:12-19)',
        // Bowl body
        'spans(G, 9:11-20, 10:12-19, 11:13-18)',
        // Bowl shadow
        'spans(D, 10:18-19, 11:17-18)',
        // Central shaft
        'spans(B, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17)',
        // Shaft shadow
        'spans(D, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17, 17:17-17, 18:17-17)',
        // Shaft highlight
        'spans(L, 12:14-14, 13:14-14, 14:14-14)',
        // Decorative rings
        'spans(G, 14:13-18, 18:13-18)',
        // Base tripod
        'spans(B, 19:12-19, 20:10-12, 20:19-21, 21:9-11, 21:20-22)',
        // Base shadow
        'spans(D, 21:9-11, 21:20-22)',
        // Embers
        'pixels(F, 10,7, 20,7, 11,5, 20,5)',
      ],
      chars: {
        B: { name: 'iron_shaft', role: 'body' },
        D: { name: 'iron_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'iron_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'iron_bowl', role: 'head' },
        F: { name: 'fire', role: 'accessory' },
        C: { name: 'fire_core', role: 'leg' },
        H: { name: 'fire_tip', role: 'leg', tone: 'highlight' },
        A: { name: 'coal_bed', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 3. HANGING LANTERN ───────────────────────────────────────
    {
      id: 'hanging_lantern_32',
      description: 'Chain-hung iron lantern with warm candle glow inside.',
      size: 32,
      draw: [
        // Chain
        'spans(G, 2:15-16, 3:15-16, 4:15-16)',
        // Top cap
        'spans(G, 5:13-18, 6:12-19)',
        // Roof
        'spans(G, 7:11-20)',
        // Glass panels (left)
        'spans(A, 8:11-13, 9:11-13, 10:11-13, 11:11-13, 12:11-13, 13:11-13)',
        // Glass panels (right)
        'spans(A, 8:18-20, 9:18-20, 10:18-20, 11:18-20, 12:18-20, 13:18-20)',
        // Glass center glow
        'spans(F, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17)',
        // Flame inside
        'spans(C, 9:15-16, 10:15-16, 11:15-16)',
        // Flame bright
        'pixels(H, 15,10, 16,10)',
        // Frame bars
        'spans(G, 8:14-14, 8:17-17, 13:14-14, 13:17-17)',
        // Bottom
        'spans(G, 14:12-19, 15:13-18)',
        // Bottom finial
        'spans(G, 16:14-17, 17:15-16)',
      ],
      chars: {
        B: { name: 'frame', role: 'body' },
        D: { name: 'frame_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'iron_frame', role: 'head' },
        A: { name: 'glass_panel', role: 'accessory' },
        F: { name: 'glow', role: 'belt' },
        C: { name: 'flame', role: 'leg' },
        H: { name: 'flame_bright', role: 'leg', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 4. GLOWING CRYSTAL ───────────────────────────────────────
    {
      id: 'glowing_crystal_32',
      description: 'Large luminous crystal formation growing from dungeon floor.',
      size: 32,
      draw: [
        // Main crystal (tall, center)
        'spans(B, 4:14-17, 5:13-18, 6:13-18, 7:13-18, 8:13-18, 9:13-18, 10:14-17)',
        // Crystal highlight (left facet)
        'spans(L, 5:13-14, 6:13-14, 7:13-14, 8:13-14)',
        // Crystal shadow (right facet)
        'spans(D, 6:17-18, 7:17-18, 8:17-18, 9:17-18)',
        // Crystal bright core
        'pixels(H, 15,6, 16,6, 15,7)',
        // Left crystal (shorter)
        'spans(B, 8:9-11, 9:9-12, 10:9-12, 11:10-12, 12:10-11)',
        // Left crystal highlight
        'spans(L, 8:9-9, 9:9-9, 10:9-9)',
        // Right crystal (medium)
        'spans(B, 6:20-22, 7:19-22, 8:19-22, 9:19-22, 10:20-22, 11:20-21)',
        // Right crystal shadow
        'spans(D, 7:22-22, 8:22-22, 9:22-22)',
        // Small crystal (front)
        'spans(B, 10:16-17, 11:15-18, 12:15-18, 13:16-17)',
        // Base rock
        'spans(G, 11:8-23, 12:8-23, 13:8-23, 14:8-23)',
        // Rock shadow
        'spans(D, 13:8-10, 13:21-23, 14:8-23)',
        // Rock highlight
        'spans(L, 11:9-10)',
        // Glow particles
        'pixels(A, 12,5, 21,4, 8,8, 23,7, 14,3)',
      ],
      chars: {
        B: { name: 'crystal', role: 'body' },
        D: { name: 'crystal_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'crystal_highlight', role: 'body', tone: 'highlight' },
        H: { name: 'crystal_core', role: 'accessory' },
        G: { name: 'rock_base', role: 'head' },
        A: { name: 'glow_particles', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 5. CANDELABRA ────────────────────────────────────────────
    {
      id: 'candelabra_32',
      description: 'Ornate three-armed candelabra with dripping wax candles.',
      size: 32,
      draw: [
        // Left flame
        'spans(F, 4:8-9, 5:8-10, 6:9-9)',
        // Center flame
        'spans(F, 2:15-16, 3:14-17, 4:15-16)',
        // Right flame
        'spans(F, 4:22-23, 5:21-23, 6:22-22)',
        // Flame cores
        'pixels(C, 9,5, 15,3, 22,5)',
        // Left candle
        'spans(A, 7:8-10, 8:8-10, 9:8-10, 10:8-10)',
        // Center candle
        'spans(A, 5:14-17, 6:14-17, 7:14-17, 8:14-17)',
        // Right candle
        'spans(A, 7:21-23, 8:21-23, 9:21-23, 10:21-23)',
        // Wax drips
        'pixels(A, 10,11, 9,13, 8,18, 10,20)',
        // Arms (left)
        'spans(G, 11:8-14)',
        // Arms (right)
        'spans(G, 11:17-23)',
        // Arm curve up left
        'spans(G, 10:8-9)',
        // Arm curve up right
        'spans(G, 10:22-23)',
        // Central shaft
        'spans(G, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:15-16, 17:15-16, 18:15-16)',
        // Shaft detail ring
        'spans(G, 13:13-18)',
        // Base
        'spans(G, 19:12-19, 20:11-20, 21:12-19)',
        // Base shadow
        'spans(D, 21:12-19)',
      ],
      chars: {
        B: { name: 'metal_body', role: 'body' },
        D: { name: 'metal_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'brass_frame', role: 'head' },
        A: { name: 'wax_candle', role: 'accessory' },
        F: { name: 'flame', role: 'belt' },
        C: { name: 'flame_core', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 6. MAGIC ORB PEDESTAL ────────────────────────────────────
    {
      id: 'magic_orb_pedestal_32',
      description: 'Stone pedestal holding a glowing arcane orb — emits blue light.',
      size: 32,
      draw: [
        // Orb glow halo
        'spans(A, 4:12-19, 5:11-20, 6:10-21, 7:10-21, 8:10-21, 9:11-20, 10:12-19)',
        // Orb body
        'spans(B, 5:13-18, 6:12-19, 7:12-19, 8:12-19, 9:13-18)',
        // Orb highlight
        'pixels(L, 14,6, 15,6, 14,7)',
        // Orb shadow
        'spans(D, 8:18-19, 9:16-18)',
        // Pedestal top (cradle)
        'spans(G, 11:11-12, 11:19-20, 12:10-11, 12:20-21)',
        // Pedestal cup
        'spans(G, 13:10-21)',
        // Shaft
        'spans(G, 14:13-18, 15:13-18, 16:13-18, 17:13-18)',
        // Shaft shadow
        'spans(D, 14:17-18, 15:17-18, 16:17-18, 17:17-18)',
        // Decorative ring
        'spans(G, 15:12-19)',
        // Base
        'spans(G, 18:11-20, 19:10-21, 20:10-21, 21:9-22)',
        // Base shadow
        'spans(D, 20:10-12, 20:19-21, 21:9-12, 21:19-22)',
        // Base highlight
        'spans(L, 18:12-15)',
      ],
      chars: {
        B: { name: 'orb', role: 'body' },
        D: { name: 'orb_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'orb_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'stone_pedestal', role: 'head' },
        A: { name: 'magic_glow', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 7. FIRE PIT ──────────────────────────────────────────────
    {
      id: 'fire_pit_32',
      description: 'Stone-ringed campfire pit with crackling flames and smoke.',
      size: 32,
      draw: [
        // Smoke wisps
        'pixels(S, 14,2, 17,3, 15,4)',
        // Fire top
        'spans(F, 5:13-18, 6:12-19, 7:12-19, 8:13-18)',
        // Fire core
        'spans(C, 6:14-17, 7:14-17)',
        // Fire highlight
        'pixels(H, 15,6, 16,6)',
        // Ember sparks
        'pixels(F, 10,6, 21,7, 11,4)',
        // Logs
        'spans(B, 9:10-13, 9:18-21, 10:10-14, 10:17-21)',
        // Log cross
        'spans(B, 11:12-19)',
        // Stone ring back
        'spans(G, 8:10-11, 8:20-21, 9:9-10, 9:21-22)',
        // Stone ring sides
        'spans(G, 10:8-9, 10:22-23, 11:8-9, 11:22-23, 12:8-9, 12:22-23)',
        // Stone ring front
        'spans(G, 13:9-10, 13:21-22, 14:10-21)',
        // Stone shadow
        'spans(D, 14:10-12, 14:19-21, 13:21-22)',
        // Ash/coal bed
        'spans(A, 12:10-21, 13:11-20)',
      ],
      chars: {
        B: { name: 'logs', role: 'body' },
        F: { name: 'fire', role: 'accessory' },
        C: { name: 'fire_core', role: 'leg' },
        H: { name: 'fire_bright', role: 'leg', tone: 'highlight' },
        G: { name: 'stone_ring', role: 'head' },
        D: { name: 'stone_shadow', role: 'head', tone: 'shadow' },
        A: { name: 'coal_bed', role: 'belt' },
        S: { name: 'smoke', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        arm:       { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
      },
    },

    // ─── 8. SKULL TORCH ───────────────────────────────────────────
    {
      id: 'skull_torch_32',
      description: 'Macabre torch mounted in a skull — fire burns from the cranium.',
      size: 32,
      draw: [
        // Flame
        'spans(F, 2:14-17, 3:13-18, 4:13-18, 5:14-17)',
        // Flame core
        'pixels(C, 15,3, 16,3, 15,4)',
        // Skull cranium
        'spans(B, 6:12-19, 7:11-20, 8:11-20, 9:11-20)',
        // Skull highlight
        'spans(L, 6:13-16, 7:11-13)',
        // Eye sockets
        'spans(E, 8:13-14, 8:17-18)',
        // Nose
        'pixels(E, 15,9, 16,9)',
        // Teeth
        'spans(B, 10:13-18)',
        // Jaw
        'spans(D, 11:12-19)',
        // Shaft
        'spans(G, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17)',
        // Shaft shadow
        'spans(D, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17, 17:17-17, 18:17-17)',
        // Shaft wrapping
        'spans(A, 15:13-14, 15:17-18, 18:13-14, 18:17-18)',
        // Base spike
        'spans(G, 21:15-16)',
      ],
      chars: {
        B: { name: 'bone', role: 'body' },
        D: { name: 'bone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'bone_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'eye_sockets', role: 'eye' },
        G: { name: 'iron_shaft', role: 'head' },
        F: { name: 'flame', role: 'accessory' },
        C: { name: 'flame_core', role: 'leg' },
        A: { name: 'leather_wrap', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 9. MUSHROOM LAMP ─────────────────────────────────────────
    {
      id: 'mushroom_lamp_32',
      description: 'Bioluminescent giant mushroom — natural dungeon light source.',
      size: 32,
      draw: [
        // Cap top
        'spans(B, 5:12-19, 6:10-21, 7:9-22, 8:9-22, 9:10-21, 10:11-20)',
        // Cap highlight (glow)
        'spans(L, 5:14-17, 6:11-14, 7:9-11)',
        // Cap shadow
        'spans(D, 8:20-22, 9:19-21, 10:18-20)',
        // Glow spots
        'pixels(A, 12,7, 18,7, 10,8, 20,8, 14,9)',
        // Cap underside (gills)
        'spans(D, 11:12-19)',
        // Stem
        'spans(B, 12:14-17, 13:14-17, 14:13-18, 15:13-18, 16:13-18, 17:14-17, 18:14-17)',
        // Stem shadow
        'spans(D, 14:17-18, 15:17-18, 16:17-18, 17:17-17)',
        // Stem highlight
        'spans(L, 14:13-13, 15:13-13, 16:13-13)',
        // Stem ring
        'spans(G, 13:13-18)',
        // Root base
        'spans(B, 19:12-19, 20:13-18)',
        // Root shadow
        'spans(D, 20:13-18)',
        // Spore particles
        'pixels(A, 8,11, 22,10, 7,13, 24,12)',
      ],
      chars: {
        B: { name: 'mushroom', role: 'body' },
        D: { name: 'mushroom_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'mushroom_glow', role: 'body', tone: 'highlight' },
        G: { name: 'stem_ring', role: 'head' },
        A: { name: 'spore_glow', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#6dc2ca', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 10. LAVA LAMP ROCK ───────────────────────────────────────
    {
      id: 'lava_lamp_rock_32',
      description: 'Volcanic rock formation with glowing magma veins — natural light.',
      size: 32,
      draw: [
        // Rock formation
        'spans(B, 6:13-18, 7:11-20, 8:10-21, 9:10-21, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:10-21, 15:10-21, 16:11-20)',
        // Rock shadow
        'spans(D, 12:20-22, 13:20-22, 14:20-21, 15:20-21, 16:19-20)',
        // Rock highlight
        'spans(L, 7:12-14, 8:10-12, 9:10-11)',
        // Lava veins
        'spans(A, 8:15-16, 9:14-14, 10:13-14, 11:12-13, 12:13-14, 13:14-16, 14:15-16)',
        // Lava bright
        'pixels(E, 15,8, 14,10, 13,12, 14,13, 15,14)',
        // Lava pool base
        'spans(A, 17:12-19, 18:13-18)',
        // Smoke wisps
        'pixels(S, 14,4, 17,5, 13,3)',
      ],
      chars: {
        B: { name: 'dark_rock', role: 'body' },
        D: { name: 'rock_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'rock_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'lava_vein', role: 'accessory' },
        E: { name: 'lava_bright', role: 'accessory', tone: 'highlight' },
        S: { name: 'smoke', role: 'head' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
      },
    },

    // ─── 11. GREEN TORCH ──────────────────────────────────────────
    {
      id: 'green_torch_32',
      description: 'Eerie green-flamed wall torch — necromancer dungeon lighting.',
      size: 32,
      draw: [
        // Flame
        'spans(F, 4:14-17, 5:13-18, 6:13-18, 7:14-17)',
        // Flame core
        'pixels(C, 15,5, 16,5, 15,6)',
        // Flame tip
        'pixels(H, 15,4, 16,4)',
        // Torch head
        'spans(B, 8:14-17, 9:14-17)',
        // Shaft
        'spans(B, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16)',
        // Shaft shadow
        'spans(D, 10:16-16, 11:16-16, 12:16-16, 13:16-16, 14:16-16, 15:16-16)',
        // Bracket
        'spans(G, 16:12-14, 17:12-14, 16:17-19, 17:17-19)',
        // Back plate
        'spans(G, 18:13-18, 19:13-18, 20:13-18)',
        // Drip glow
        'pixels(F, 8,13, 9,19, 7,12)',
      ],
      chars: {
        B: { name: 'dark_iron', role: 'body' },
        D: { name: 'iron_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'bracket', role: 'head' },
        F: { name: 'green_flame', role: 'accessory' },
        C: { name: 'flame_core', role: 'belt' },
        H: { name: 'flame_tip', role: 'belt', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        belt:      { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 12. FLOATING WISP ────────────────────────────────────────
    {
      id: 'floating_wisp_32',
      description: 'Ghostly floating light wisp — ambient dungeon illumination.',
      size: 32,
      draw: [
        // Outer glow
        'spans(A, 8:12-19, 9:10-21, 10:9-22, 11:9-22, 12:9-22, 13:10-21, 14:12-19)',
        // Inner glow
        'spans(B, 9:13-18, 10:12-19, 11:12-19, 12:12-19, 13:13-18)',
        // Core bright
        'spans(L, 10:14-17, 11:14-17, 12:14-17)',
        // Core center
        'pixels(H, 15,11, 16,11)',
        // Trail particles below
        'pixels(A, 15,16, 13,17, 18,17, 14,19, 17,19, 16,21)',
        // Sparkle particles
        'pixels(H, 11,8, 20,9, 9,13, 22,12, 14,6)',
      ],
      chars: {
        B: { name: 'wisp_body', role: 'body' },
        L: { name: 'wisp_bright', role: 'body', tone: 'highlight' },
        H: { name: 'wisp_core', role: 'accessory' },
        A: { name: 'glow_aura', role: 'head' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 13. CHANDELIER ───────────────────────────────────────────
    {
      id: 'dungeon_chandelier_32',
      description: 'Wrought iron dungeon chandelier with four candles.',
      size: 32,
      draw: [
        // Chain
        'spans(G, 2:15-16, 3:15-16)',
        // Center hub
        'spans(G, 4:14-17, 5:14-17)',
        // Left arm
        'spans(G, 6:8-14, 7:7-8)',
        // Right arm
        'spans(G, 6:17-23, 7:23-24)',
        // Left candle cup
        'spans(G, 7:7-10)',
        // Right candle cup
        'spans(G, 7:21-24)',
        // Left candle
        'spans(A, 4:8-9, 5:8-9, 6:8-9)',
        // Right candle
        'spans(A, 4:22-23, 5:22-23, 6:22-23)',
        // Inner left candle
        'spans(A, 5:12-13, 6:12-13)',
        // Inner right candle
        'spans(A, 5:18-19, 6:18-19)',
        // Flames
        'spans(F, 3:8-9, 3:22-23, 4:12-13, 4:18-19)',
        // Flame cores
        'pixels(C, 8,3, 22,3, 12,4, 18,4)',
        // Inner arm supports
        'spans(G, 6:12-13, 6:18-19)',
        // Decorative curl
        'pixels(G, 8:8-8, 8:23-23)',
      ],
      chars: {
        G: { name: 'iron_frame', role: 'head' },
        A: { name: 'wax_candle', role: 'accessory' },
        F: { name: 'flame', role: 'belt' },
        C: { name: 'flame_bright', role: 'leg' },
      },
      colors: {
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 14. SOUL LANTERN ─────────────────────────────────────────
    {
      id: 'soul_lantern_32',
      description: 'Haunted lantern with trapped soul swirling inside — purple glow.',
      size: 32,
      draw: [
        // Handle
        'spans(G, 3:14-17, 4:13-14, 4:17-18)',
        // Top cap
        'spans(G, 5:12-19, 6:11-20)',
        // Glass body
        'spans(A, 7:11-20, 8:11-20, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:11-20)',
        // Soul swirl
        'spans(B, 8:14-17, 9:13-15, 10:15-18, 11:14-16, 12:16-18)',
        // Soul bright
        'pixels(L, 15,9, 17,10, 14,11, 16,12)',
        // Frame bars
        'spans(G, 7:11-11, 7:20-20, 13:11-11, 13:20-20)',
        // Bottom cap
        'spans(G, 14:11-20, 15:12-19)',
        // Bottom point
        'spans(G, 16:13-18, 17:14-17, 18:15-16)',
      ],
      chars: {
        G: { name: 'iron_frame', role: 'head' },
        A: { name: 'glass', role: 'accessory' },
        B: { name: 'soul_swirl', role: 'body' },
        L: { name: 'soul_bright', role: 'body', tone: 'highlight' },
      },
      colors: {
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
        body:      { shadow: '#442434', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 15. EMBER BOWL ───────────────────────────────────────────
    {
      id: 'ember_bowl_32',
      description: 'Low stone bowl filled with glowing embers — floor-level light.',
      size: 32,
      draw: [
        // Ember sparks floating
        'pixels(F, 14,7, 18,6, 16,5, 12,8)',
        // Embers surface
        'spans(A, 9:12-19, 10:11-20, 11:11-20)',
        // Ember hot spots
        'pixels(C, 14,10, 17,10, 13,11, 16,11, 19,11)',
        // Bowl rim
        'spans(G, 8:10-21)',
        // Bowl exterior
        'spans(B, 9:9-11, 9:20-22, 10:9-10, 10:21-22, 11:9-10, 11:21-22, 12:9-10, 12:21-22, 13:10-11, 13:20-21, 14:11-20)',
        // Bowl shadow
        'spans(D, 13:20-21, 14:18-20)',
        // Bowl highlight
        'spans(L, 9:9-9, 10:9-9, 11:9-9)',
        // Ash pile under
        'spans(D, 15:12-19)',
      ],
      chars: {
        B: { name: 'stone_bowl', role: 'body' },
        D: { name: 'stone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stone_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'rim', role: 'head' },
        A: { name: 'ember_bed', role: 'accessory' },
        C: { name: 'hot_spots', role: 'belt' },
        F: { name: 'sparks', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 16. RUNIC PILLAR LIGHT ───────────────────────────────────
    {
      id: 'runic_pillar_light_32',
      description: 'Stone pillar with carved runes that glow with arcane energy.',
      size: 32,
      draw: [
        // Capital top
        'spans(B, 4:10-21, 5:10-21)',
        // Capital highlight
        'spans(L, 4:11-14)',
        // Pillar shaft
        'spans(B, 6:12-19, 7:12-19, 8:12-19, 9:12-19, 10:12-19, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19, 16:12-19, 17:12-19, 18:12-19)',
        // Shaft shadow (right)
        'spans(D, 6:18-19, 7:18-19, 8:18-19, 9:18-19, 10:18-19, 11:18-19, 12:18-19, 13:18-19, 14:18-19, 15:18-19, 16:18-19, 17:18-19, 18:18-19)',
        // Shaft highlight (left)
        'spans(L, 6:12-13, 7:12-13, 8:12-13, 9:12-13)',
        // Glowing runes
        'pixels(A, 14,8, 17,8, 14,11, 17,11, 14,14, 17,14, 14,17, 17,17)',
        // Rune glow bright
        'pixels(E, 15,8, 15,11, 15,14, 15,17)',
        // Base
        'spans(B, 19:10-21, 20:10-21)',
        // Base shadow
        'spans(D, 20:10-21)',
      ],
      chars: {
        B: { name: 'stone', role: 'body' },
        D: { name: 'stone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stone_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'rune_glow', role: 'accessory' },
        E: { name: 'rune_bright', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 17. TORCH STAND ──────────────────────────────────────────
    {
      id: 'torch_stand_32',
      description: 'Free-standing iron torch holder with oil-soaked flame.',
      size: 32,
      draw: [
        // Flame
        'spans(F, 3:14-17, 4:13-18, 5:13-18, 6:14-17)',
        // Flame core
        'pixels(C, 15,4, 16,4, 15,5)',
        // Torch cup
        'spans(G, 7:12-19, 8:13-18)',
        // Oil drip
        'pixels(D, 13,9, 18,9)',
        // Shaft upper
        'spans(B, 9:15-16, 10:15-16, 11:15-16, 12:15-16)',
        // Decorative joint
        'spans(G, 13:14-17)',
        // Shaft lower
        'spans(B, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16)',
        // Shaft shadow
        'spans(D, 9:16-16, 10:16-16, 11:16-16, 12:16-16, 14:16-16, 15:16-16, 16:16-16, 17:16-16, 18:16-16)',
        // Base spread
        'spans(G, 19:12-19, 20:11-20, 21:10-21)',
        // Base shadow
        'spans(D, 21:10-13, 21:18-21)',
      ],
      chars: {
        B: { name: 'iron_shaft', role: 'body' },
        D: { name: 'iron_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'iron_detail', role: 'head' },
        F: { name: 'flame', role: 'accessory' },
        C: { name: 'flame_core', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 18. FAIRY LIGHT CLUSTER ──────────────────────────────────
    {
      id: 'fairy_light_cluster_32',
      description: 'Cluster of tiny floating fairy lights — magical ambient glow.',
      size: 32,
      draw: [
        // Individual fairy lights (scattered)
        'pixels(B, 10,6, 14,4, 18,5, 22,7, 8,9, 16,8, 20,10, 12,11, 24,9)',
        // Bright cores
        'pixels(L, 10,6, 14,4, 18,5, 22,7, 16,8)',
        // Glow halos (around each light)
        'pixels(A, 9,6, 11,6, 10,5, 10,7)',
        'pixels(A, 13,4, 15,4, 14,3, 14,5)',
        'pixels(A, 17,5, 19,5, 18,4, 18,6)',
        'pixels(A, 21,7, 23,7, 22,6, 22,8)',
        'pixels(A, 7,9, 9,9, 8,8, 8,10)',
        'pixels(A, 15,8, 17,8, 16,7, 16,9)',
        'pixels(A, 19,10, 21,10, 20,9, 20,11)',
        'pixels(A, 11,11, 13,11, 12,10, 12,12)',
        // Trail sparkles
        'pixels(A, 11,13, 17,12, 21,13, 14,14, 19,15)',
      ],
      chars: {
        B: { name: 'fairy_body', role: 'body' },
        L: { name: 'fairy_bright', role: 'body', tone: 'highlight' },
        A: { name: 'glow_halo', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 19. BLOOD TORCH ──────────────────────────────────────────
    {
      id: 'blood_torch_32',
      description: 'Crimson-flamed torch fueled by dark magic — vampire dungeon light.',
      size: 32,
      draw: [
        // Flame
        'spans(F, 4:14-17, 5:13-18, 6:13-18, 7:14-17)',
        // Flame core (dark red center)
        'pixels(C, 15,5, 16,5, 15,6)',
        // Flame drips
        'pixels(F, 13,8, 18,8)',
        // Torch head
        'spans(B, 8:14-17, 9:14-17)',
        // Shaft (bone)
        'spans(G, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16)',
        // Shaft shadow
        'spans(D, 10:16-16, 11:16-16, 12:16-16, 13:16-16, 14:16-16, 15:16-16, 16:16-16)',
        // Bone joint knobs
        'pixels(G, 14,12, 17,12)',
        // Bracket
        'spans(B, 16:12-14, 17:12-14, 16:17-19, 17:17-19)',
        // Back plate
        'spans(B, 18:13-18, 19:13-18, 20:13-18)',
        // Blood drip on wall
        'pixels(A, 15,20, 15,21, 16,21)',
      ],
      chars: {
        B: { name: 'dark_metal', role: 'body' },
        D: { name: 'metal_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'bone_shaft', role: 'head' },
        F: { name: 'blood_flame', role: 'accessory' },
        C: { name: 'flame_dark_core', role: 'belt' },
        A: { name: 'blood_drip', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#442434', highlight: '#d04648' },
        leg:       { shadow: '#442434', base: '#d04648', highlight: '#d04648' },
      },
    },

    // ─── 20. LIGHTNING CRYSTAL ────────────────────────────────────
    {
      id: 'lightning_crystal_32',
      description: 'Charged crystal emitting electrical arcs — storm dungeon light.',
      size: 32,
      draw: [
        // Lightning arcs (top)
        'pixels(A, 14,2, 13,3, 15,4, 18,3, 19,2)',
        // Main crystal
        'spans(B, 5:14-17, 6:13-18, 7:13-18, 8:13-18, 9:13-18, 10:14-17)',
        // Crystal highlight
        'spans(L, 5:15-16, 6:13-14, 7:13-14)',
        // Crystal shadow
        'spans(D, 8:17-18, 9:17-18)',
        // Crystal core spark
        'pixels(H, 15,7, 16,7)',
        // Side crystals
        'spans(B, 8:9-11, 9:9-11, 10:10-11)',
        'spans(B, 8:20-22, 9:20-22, 10:20-21)',
        // Lightning arc left
        'pixels(A, 9,8, 8,7, 7,8, 6,7)',
        // Lightning arc right
        'pixels(A, 22,8, 23,7, 24,8, 25,7)',
        // Base rock
        'spans(G, 11:9-22, 12:9-22, 13:10-21, 14:11-20)',
        // Rock shadow
        'spans(D, 13:19-21, 14:18-20)',
      ],
      chars: {
        B: { name: 'crystal', role: 'body' },
        D: { name: 'crystal_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'crystal_highlight', role: 'body', tone: 'highlight' },
        H: { name: 'crystal_spark', role: 'accessory' },
        A: { name: 'lightning', role: 'belt' },
        G: { name: 'rock_base', role: 'head' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#dad45e' },
        accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#597dce', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

  ],
};

export default batch;
