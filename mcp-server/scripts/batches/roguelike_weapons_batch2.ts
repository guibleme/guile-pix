/**
 * Roguelike Weapons Bundle — Batch 2: Shields & Defensive (32x32 DSL)
 * 20 unique shield templates for roguelike games.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'weapons',
  exportNames: { templates: 'ROGUELIKE_SHIELDS_32_TEMPLATES', schemes: 'ROGUELIKE_SHIELDS_32_COLOR_SCHEMES' },
  templates: [

    // ─── 1. WOODEN BUCKLER ──────────────────────────────────────────
    {
      id: 'wooden_buckler_32',
      description: 'Small round wooden buckler with iron rim — starter shield for any roguelike.',
      size: 32,
      draw: [
        // Shield face (circle)
        'circle(15,15,10,B)',
        // Iron rim
        'ring(15,15,11,9,R)',
        // Rim shadow (bottom-right arc)
        'spans(D, 24:12-19, 25:13-17, 23:18-21)',
        // Shield highlight (top-left area)
        'spans(L, 7:13-17, 8:11-14, 9:10-12)',
        // Center boss
        'circle(15,15,3,S)',
        // Boss highlight
        'pixels(E, 14,14)',
        // Wood grain lines
        'spans(G, 12:12-13, 14:11-12, 16:18-19, 18:17-18)',
      ],
      chars: {
        B: { name: 'wood_face', role: 'body' },
        R: { name: 'iron_rim', role: 'head' },
        D: { name: 'rim_shadow', role: 'head', tone: 'shadow' },
        L: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'center_boss', role: 'accessory' },
        E: { name: 'boss_shine', role: 'eye' },
        G: { name: 'wood_grain', role: 'body', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 2. IRON ROUND SHIELD ───────────────────────────────────────
    {
      id: 'iron_round_shield_32',
      description: 'Sturdy iron round shield with reinforced boss and riveted rim.',
      size: 32,
      draw: [
        'circle(15,15,11,B)',
        'ring(15,15,12,10,R)',
        // Shadow (bottom-right)
        'spans(D, 24:11-19, 25:13-17, 26:14-16)',
        // Highlight (top-left)
        'spans(L, 5:13-17, 6:11-15, 7:10-13)',
        // Center boss
        'circle(15,15,3,S)',
        'pixels(E, 14,14, 15,14)',
        // Rivet dots around rim
        'pixels(V, 15,4, 21,6, 25,10, 26,15, 25,20, 21,24, 15,26, 9,24, 5,20, 4,15, 5,10, 9,6)',
      ],
      chars: {
        B: { name: 'iron_face', role: 'body' },
        R: { name: 'rim', role: 'head' },
        D: { name: 'shield_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'shield_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'boss', role: 'accessory' },
        E: { name: 'boss_shine', role: 'eye' },
        V: { name: 'rivets', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 3. KITE SHIELD ────────────────────────────────────────────
    {
      id: 'kite_shield_roguelike_32',
      description: 'Classic kite shield with pointed bottom — reliable mid-tier defense.',
      size: 32,
      draw: [
        // Kite shape (wide top, pointed bottom)
        'spans(B, 3:11-20, 4:10-21, 5:9-22, 6:9-22, 7:9-22, 8:9-22, 9:9-22, 10:9-22, 11:10-21, 12:10-21, 13:10-21, 14:11-20, 15:11-20, 16:11-20, 17:12-19, 18:12-19, 19:13-18, 20:13-18, 21:14-17, 22:14-17, 23:15-16)',
        // Shadow (right half darker)
        'spans(D, 5:20-22, 6:20-22, 7:20-22, 8:20-22, 9:20-22, 10:20-22, 11:20-21, 12:20-21, 13:20-21, 14:19-20, 15:19-20, 16:19-20, 17:18-19, 18:18-19)',
        // Highlight (top-left)
        'spans(L, 3:11-14, 4:10-13, 5:9-12, 6:9-11)',
        // Rim
        'spans(R, 3:11-11, 3:20-20, 4:10-10, 4:21-21, 5:9-9, 5:22-22, 6:9-9, 6:22-22, 7:9-9, 7:22-22, 8:9-9, 8:22-22, 9:9-9, 9:22-22, 10:9-9, 10:22-22, 23:15-16)',
        // Center cross emblem
        'spans(A, 10:15-16, 11:15-16, 12:13-18, 13:15-16, 14:15-16, 15:15-16)',
      ],
      chars: {
        B: { name: 'shield_face', role: 'body' },
        D: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        R: { name: 'rim', role: 'head' },
        A: { name: 'cross_emblem', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 4. TOWER SHIELD ────────────────────────────────────────────
    {
      id: 'tower_shield_roguelike_32',
      description: 'Massive tower shield covering most of the body — heavy but protective.',
      size: 32,
      draw: [
        // Tall rectangle with rounded top
        'spans(B, 2:10-21, 3:9-22, 4:8-23, 5:8-23, 6:8-23, 7:8-23, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23, 21:8-23, 22:8-23, 23:8-23, 24:8-23, 25:9-22, 26:10-21)',
        // Shadow (right side)
        'spans(D, 4:22-23, 5:22-23, 6:22-23, 7:22-23, 8:22-23, 9:22-23, 10:22-23, 11:22-23, 12:22-23, 13:22-23, 14:22-23, 15:22-23, 16:22-23, 17:22-23, 18:22-23, 19:22-23, 20:22-23, 21:22-23, 22:22-23, 23:22-23, 24:22-23)',
        // Highlight (top-left)
        'spans(L, 2:10-14, 3:9-12, 4:8-10, 5:8-9)',
        // Horizontal band
        'spans(A, 13:8-23, 14:8-23)',
        // Boss in center
        'circle(15,8,2,S)',
        'pixels(E, 15,7)',
      ],
      chars: {
        B: { name: 'steel_face', role: 'body' },
        D: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'band', role: 'head' },
        S: { name: 'center_boss', role: 'accessory' },
        E: { name: 'boss_shine', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 5. SPIKED SHIELD ──────────────────────────────────────────
    {
      id: 'spiked_shield_32',
      description: 'Aggressive round shield with protruding iron spikes for offense.',
      size: 32,
      draw: [
        'circle(15,15,9,B)',
        'ring(15,15,10,8,R)',
        // Shadow
        'spans(D, 22:12-18, 23:13-17, 24:14-16)',
        // Highlight
        'spans(L, 7:13-17, 8:11-14)',
        // Center boss
        'circle(15,15,2,S)',
        // Spikes (4 cardinal + 4 diagonal)
        'spans(K, 1:15-16, 2:15-16, 3:15-16)',
        'spans(K, 27:15-16, 28:15-16, 29:15-16)',
        'spans(K, 15:1-3, 15:27-29)',
        'spans(K, 16:1-3, 16:27-29)',
        'pixels(K, 5,5, 6,6, 25,5, 24,6, 5,25, 6,24, 25,25, 24,24)',
      ],
      chars: {
        B: { name: 'shield_face', role: 'body' },
        R: { name: 'rim', role: 'head' },
        D: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'boss', role: 'accessory' },
        K: { name: 'spikes', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 6. MAGIC BARRIER ───────────────────────────────────────────
    {
      id: 'magic_barrier_32',
      description: 'Translucent arcane energy shield — floats before the wielder.',
      size: 32,
      draw: [
        // Hexagonal barrier shape
        'spans(B, 4:12-19, 5:10-21, 6:9-22, 7:8-23, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23, 21:9-22, 22:10-21, 23:12-19)',
        // Shadow
        'spans(D, 19:22-23, 20:22-23, 21:21-22, 22:20-21)',
        // Highlight
        'spans(L, 4:12-15, 5:10-13, 6:9-11, 7:8-9)',
        // Arcane rune pattern (center)
        'circle(15,13,3,A)',
        'pixels(E, 15,10, 12,13, 18,13, 15,16)',
        // Energy lines
        'pixels(E, 10,8, 21,8, 10,20, 21,20)',
      ],
      chars: {
        B: { name: 'barrier_field', role: 'body' },
        D: { name: 'field_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'field_glow', role: 'body', tone: 'highlight' },
        A: { name: 'rune_core', role: 'accessory' },
        E: { name: 'energy_nodes', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 7. BONE SHIELD ────────────────────────────────────────────
    {
      id: 'bone_shield_32',
      description: 'Shield assembled from interlocking bones — necromancer dungeon reward.',
      size: 32,
      draw: [
        'circle(15,15,10,B)',
        'ring(15,15,11,9,R)',
        // Shadow
        'spans(D, 23:12-18, 24:13-17)',
        // Highlight
        'spans(L, 6:13-17, 7:11-14)',
        // Skull center
        'spans(S, 12:13-18, 13:12-19, 14:12-19, 15:12-19, 16:13-18, 17:14-17)',
        // Eye sockets
        'pixels(E, 13,14, 14,14, 17,14, 18,14)',
        // Bone cracks
        'pixels(K, 14,9, 10,13, 20,17, 16,21)',
      ],
      chars: {
        B: { name: 'bone_surface', role: 'body' },
        R: { name: 'bone_rim', role: 'head' },
        D: { name: 'bone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'bone_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'skull_center', role: 'accessory' },
        E: { name: 'eye_sockets', role: 'belt' },
        K: { name: 'bone_cracks', role: 'body', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#d2aa99' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
      },
    },

    // ─── 8. DRAGON SCALE SHIELD ─────────────────────────────────────
    {
      id: 'dragon_scale_shield_32',
      description: 'Shield forged from overlapping dragon scales — fire-resistant.',
      size: 32,
      draw: [
        'circle(15,15,10,B)',
        'ring(15,15,11,9,R)',
        // Shadow
        'spans(D, 23:12-18, 24:13-17, 25:14-16)',
        // Highlight
        'spans(L, 6:13-17, 7:11-15, 8:10-13)',
        // Scale pattern (overlapping arcs)
        'spans(S, 9:13-17, 10:12-14, 10:16-18, 12:10-14, 12:16-20, 14:11-13, 14:17-19, 16:12-14, 16:16-18, 18:13-17, 20:14-16)',
        // Center boss (dragon eye)
        'circle(15,15,2,A)',
        'pixels(E, 15,15)',
      ],
      chars: {
        B: { name: 'scale_surface', role: 'body' },
        R: { name: 'metal_rim', role: 'head' },
        D: { name: 'scale_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'scale_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'scale_pattern', role: 'accessory' },
        A: { name: 'dragon_eye', role: 'belt' },
        E: { name: 'eye_shine', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d04648' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 9. MIRROR SHIELD ──────────────────────────────────────────
    {
      id: 'mirror_shield_32',
      description: 'Polished reflective shield that bounces projectiles — rare drop.',
      size: 32,
      draw: [
        // Oval shield
        'ellipse(15,14,10,11,B)',
        // Rim
        'ring(15,14,11,9,R)',
        // Strong highlight (mirror reflection)
        'spans(L, 6:13-17, 7:11-18, 8:10-16, 9:10-14, 10:11-13)',
        // Shadow
        'spans(D, 22:12-18, 23:13-17, 24:14-16)',
        // Reflection streak
        'spans(E, 9:14-16, 10:15-17, 11:16-18, 12:17-18)',
        // Center boss
        'circle(15,14,2,S)',
      ],
      chars: {
        B: { name: 'mirror_face', role: 'body' },
        R: { name: 'silver_rim', role: 'head' },
        L: { name: 'mirror_glare', role: 'body', tone: 'highlight' },
        D: { name: 'mirror_shadow', role: 'body', tone: 'shadow' },
        E: { name: 'reflection', role: 'eye' },
        S: { name: 'boss', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#597dce', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 10. CURSED AEGIS ──────────────────────────────────────────
    {
      id: 'cursed_aegis_32',
      description: 'Dark shield radiating malevolent energy — high defense but drains HP.',
      size: 32,
      draw: [
        'circle(15,15,10,B)',
        'ring(15,15,11,9,R)',
        // Dark shadow (almost entire lower half)
        'spans(D, 16:8-22, 17:8-22, 18:9-21, 19:9-21, 20:10-20, 21:11-19, 22:12-18, 23:13-17, 24:14-16)',
        // Curse eye (center)
        'spans(S, 13:13-18, 14:12-19, 15:12-19, 16:13-18)',
        'pixels(E, 14,14, 15,14, 16,14, 17,14, 15,15, 16,15)',
        // Curse glow
        'pixels(A, 10,8, 20,8, 8,13, 22,13, 8,18, 22,18, 10,22, 20,22)',
      ],
      chars: {
        B: { name: 'dark_face', role: 'body' },
        R: { name: 'dark_rim', role: 'head' },
        D: { name: 'abyss_shadow', role: 'body', tone: 'shadow' },
        S: { name: 'curse_eye', role: 'accessory' },
        E: { name: 'eye_pupil', role: 'eye' },
        A: { name: 'curse_glow', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 11. CRYSTAL WARD ──────────────────────────────────────────
    {
      id: 'crystal_ward_32',
      description: 'Crystalline shield that absorbs magic damage — shatters after 3 hits.',
      size: 32,
      draw: [
        // Crystal hexagon shape
        'spans(B, 4:12-19, 5:10-21, 6:9-22, 7:8-23, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:9-22, 21:10-21, 22:12-19)',
        // Crystal facet lines
        'spans(F, 8:15-16, 9:14-14, 9:17-17, 10:13-13, 10:18-18, 11:12-12, 11:19-19, 12:11-11, 12:20-20)',
        // Shadow
        'spans(D, 18:22-23, 19:21-22, 20:20-22, 21:19-21)',
        // Highlight
        'spans(L, 5:10-14, 6:9-12, 7:8-10)',
        // Inner glow
        'pixels(E, 13,12, 17,12, 15,15, 12,18, 18,18)',
      ],
      chars: {
        B: { name: 'crystal_face', role: 'body' },
        F: { name: 'facet_lines', role: 'body', tone: 'shadow' },
        D: { name: 'crystal_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'crystal_glow', role: 'body', tone: 'highlight' },
        E: { name: 'inner_light', role: 'eye' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        eye:  { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 12. FLAME GUARD ───────────────────────────────────────────
    {
      id: 'flame_guard_32',
      description: 'Shield wreathed in perpetual flame — burns attackers on contact.',
      size: 32,
      draw: [
        'circle(15,15,9,B)',
        'ring(15,15,10,8,R)',
        // Shadow
        'spans(D, 22:12-18, 23:13-17)',
        // Flame emblem center
        'spans(A, 11:14-16, 12:13-17, 13:13-18, 14:12-18, 15:13-17, 16:14-16, 17:15-15)',
        // Fire particles around edges
        'pixels(E, 14,3, 17,4, 22,7, 24,12, 23,18, 20,22, 14,24, 8,21, 5,16, 5,11, 8,7, 11,4)',
        // Highlight
        'spans(L, 7:13-17, 8:12-14)',
      ],
      chars: {
        B: { name: 'shield_face', role: 'body' },
        R: { name: 'rim', role: 'head' },
        D: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'flame_emblem', role: 'accessory' },
        E: { name: 'fire_particles', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 13. FROST BULWARK ─────────────────────────────────────────
    {
      id: 'frost_bulwark_32',
      description: 'Frozen shield carved from glacial ice — slows nearby enemies.',
      size: 32,
      draw: [
        'circle(15,15,10,B)',
        'ring(15,15,11,9,R)',
        // Large ice highlight
        'spans(L, 6:13-17, 7:11-18, 8:10-17, 9:10-15, 10:11-14)',
        // Shadow
        'spans(D, 22:12-18, 23:13-17, 24:14-16)',
        // Ice crystal pattern (snowflake center)
        'spans(A, 15:10-20)',
        'spans(A, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16)',
        // Frost sparkles
        'pixels(E, 11,11, 19,11, 11,19, 19,19)',
      ],
      chars: {
        B: { name: 'ice_face', role: 'body' },
        R: { name: 'frost_rim', role: 'head' },
        L: { name: 'ice_glare', role: 'body', tone: 'highlight' },
        D: { name: 'ice_shadow', role: 'body', tone: 'shadow' },
        A: { name: 'crystal_pattern', role: 'accessory' },
        E: { name: 'frost_sparkles', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 14. VINE BUCKLER ──────────────────────────────────────────
    {
      id: 'vine_buckler_32',
      description: 'Living buckler woven from enchanted vines — regenerates over time.',
      size: 32,
      draw: [
        'circle(15,15,9,B)',
        'ring(15,15,10,8,R)',
        // Shadow
        'spans(D, 22:12-18, 23:13-17)',
        // Highlight
        'spans(L, 7:13-17, 8:12-15)',
        // Vine tendrils (extending beyond shield)
        'spans(V, 3:14-15, 4:13-14, 4:17-18, 25:12-13, 25:18-19, 26:11-12, 26:19-20)',
        // Flower center
        'circle(15,15,2,A)',
        'pixels(E, 15,15)',
        // Leaf accents
        'pixels(A, 10,10, 20,10, 10,20, 20,20)',
      ],
      chars: {
        B: { name: 'vine_face', role: 'body' },
        R: { name: 'vine_rim', role: 'head' },
        D: { name: 'vine_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'vine_highlight', role: 'body', tone: 'highlight' },
        V: { name: 'tendrils', role: 'belt' },
        A: { name: 'flower', role: 'accessory' },
        E: { name: 'pollen', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#346524', base: '#346524', highlight: '#854c30' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 15. ROYAL CREST SHIELD ─────────────────────────────────────
    {
      id: 'royal_crest_shield_32',
      description: 'Ornate royal shield bearing the kingdom\'s golden crest — elite guard issue.',
      size: 32,
      draw: [
        // Heater shield shape
        'spans(B, 3:10-21, 4:9-22, 5:8-23, 6:8-23, 7:8-23, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:9-22, 15:9-22, 16:10-21, 17:10-21, 18:11-20, 19:11-20, 20:12-19, 21:13-18, 22:14-17, 23:15-16)',
        // Shadow
        'spans(D, 5:22-23, 6:22-23, 7:22-23, 8:22-23, 9:22-23, 10:22-23, 11:22-23, 12:22-23, 13:22-23)',
        // Highlight
        'spans(L, 3:10-14, 4:9-12, 5:8-10)',
        // Gold rim
        'spans(R, 3:10-10, 3:21-21, 4:9-9, 4:22-22, 5:8-8, 5:23-23, 23:15-16, 22:14-14, 22:17-17)',
        // Royal crest (crown shape center)
        'spans(A, 10:13-18, 11:12-19, 12:13-14, 12:17-18, 13:13-18, 14:14-17, 15:14-17)',
        // Crown gems
        'pixels(E, 14,11, 16,11, 18,11)',
      ],
      chars: {
        B: { name: 'shield_face', role: 'body' },
        D: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        R: { name: 'gold_rim', role: 'head' },
        A: { name: 'royal_crest', role: 'accessory' },
        E: { name: 'crown_gems', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 16. SHADOW BARRIER ─────────────────────────────────────────
    {
      id: 'shadow_barrier_32',
      description: 'Semi-transparent shadow shield that phases in and out — chance to negate damage.',
      size: 32,
      draw: [
        'circle(15,15,10,B)',
        'ring(15,15,11,9,R)',
        // Heavy shadow (most of shield is dark)
        'spans(D, 10:8-22, 11:7-23, 12:7-23, 13:7-23, 14:7-23, 15:7-23, 16:7-23, 17:8-22, 18:9-21, 19:10-20, 20:11-19, 21:12-18, 22:13-17)',
        // Wispy highlight
        'spans(L, 7:13-17, 8:11-15)',
        // Shadow wisps
        'pixels(E, 7,7, 23,7, 7,23, 23,23, 4,15, 26,15, 15,4, 15,26)',
      ],
      chars: {
        B: { name: 'shadow_face', role: 'body' },
        R: { name: 'shadow_rim', role: 'head' },
        D: { name: 'deep_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'ghost_light', role: 'body', tone: 'highlight' },
        E: { name: 'shadow_wisps', role: 'eye' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head: { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
        eye:  { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
      },
    },

    // ─── 17. RUNIC GUARD ────────────────────────────────────────────
    {
      id: 'runic_guard_32',
      description: 'Shield inscribed with glowing runic wards that pulse with protective magic.',
      size: 32,
      draw: [
        'circle(15,15,10,B)',
        'ring(15,15,11,9,R)',
        // Shadow
        'spans(D, 22:12-18, 23:13-17, 24:14-16)',
        // Highlight
        'spans(L, 7:13-17, 8:11-15, 9:10-13)',
        // Rune circle (ring of glowing dots)
        'pixels(E, 15,8, 19,9, 22,12, 22,18, 19,21, 15,22, 11,21, 8,18, 8,12, 11,9)',
        // Center rune
        'spans(A, 13:14-17, 14:13-14, 14:17-18, 15:14-17, 16:13-14, 16:17-18, 17:14-17)',
      ],
      chars: {
        B: { name: 'steel_face', role: 'body' },
        R: { name: 'rim', role: 'head' },
        D: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'rune_glow', role: 'eye' },
        A: { name: 'center_rune', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 18. STORM SHIELD ──────────────────────────────────────────
    {
      id: 'storm_shield_32',
      description: 'Electrified shield crackling with lightning — stuns attackers.',
      size: 32,
      draw: [
        'circle(15,15,10,B)',
        'ring(15,15,11,9,R)',
        // Shadow
        'spans(D, 22:12-18, 23:13-17)',
        // Highlight
        'spans(L, 7:13-17, 8:11-15)',
        // Lightning bolt emblem (center)
        'spans(A, 9:16-18, 10:15-17, 11:14-16, 12:13-17, 13:14-16, 14:15-17, 15:14-16, 16:13-15, 17:14-16)',
        // Electric sparks
        'pixels(E, 6,10, 24,10, 6,20, 24,20, 3,15, 27,15)',
      ],
      chars: {
        B: { name: 'shield_face', role: 'body' },
        R: { name: 'rim', role: 'head' },
        D: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'lightning_emblem', role: 'accessory' },
        E: { name: 'electric_sparks', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 19. CORRUPTION SHIELD ──────────────────────────────────────
    {
      id: 'corruption_shield_32',
      description: 'Once-holy shield now corrupted by dark magic — cracks ooze purple ichor.',
      size: 32,
      draw: [
        // Heater shield shape
        'spans(B, 3:10-21, 4:9-22, 5:8-23, 6:8-23, 7:8-23, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:9-22, 15:9-22, 16:10-21, 17:10-21, 18:11-20, 19:12-19, 20:13-18, 21:14-17, 22:15-16)',
        // Shadow
        'spans(D, 5:22-23, 6:22-23, 7:22-23, 8:22-23, 9:22-23, 10:22-23)',
        // Highlight
        'spans(L, 3:10-14, 4:9-12)',
        // Corruption cracks
        'pixels(A, 15,6, 16,7, 14,8, 13,10, 17,11, 18,13, 12,14, 11,16, 16,17, 17,19)',
        // Oozing ichor
        'pixels(E, 15,7, 13,11, 17,12, 12,15, 16,18)',
        // Faded cross (original holy symbol, barely visible)
        'spans(F, 8:15-16, 9:15-16, 10:13-18, 11:15-16, 12:15-16)',
      ],
      chars: {
        B: { name: 'shield_face', role: 'body' },
        D: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'cracks', role: 'accessory' },
        E: { name: 'ichor', role: 'eye' },
        F: { name: 'faded_cross', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        eye:       { shadow: '#442434', base: '#30346d', highlight: '#597dce' },
        belt:      { shadow: '#757161', base: '#8595a1', highlight: '#8595a1' },
      },
    },

    // ─── 20. CELESTIAL AEGIS ────────────────────────────────────────
    {
      id: 'celestial_aegis_32',
      description: 'Holy shield radiating divine light — ultimate defensive artifact.',
      size: 32,
      draw: [
        'circle(15,15,10,B)',
        'ring(15,15,11,9,R)',
        // Strong highlight (divine radiance)
        'spans(L, 5:13-17, 6:11-19, 7:10-18, 8:10-16, 9:10-14, 10:11-13)',
        // Shadow
        'spans(D, 22:12-18, 23:13-17)',
        // Star emblem (8-pointed)
        'spans(A, 12:15-16, 13:14-17, 14:12-19, 15:11-20, 16:12-19, 17:14-17, 18:15-16)',
        'spans(A, 15:15-16)',
        // Divine glow rays
        'pixels(E, 15,3, 24,6, 27,15, 24,24, 15,27, 6,24, 3,15, 6,6)',
      ],
      chars: {
        B: { name: 'divine_face', role: 'body' },
        R: { name: 'gold_rim', role: 'head' },
        L: { name: 'divine_glow', role: 'body', tone: 'highlight' },
        D: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        A: { name: 'star_emblem', role: 'accessory' },
        E: { name: 'divine_rays', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
