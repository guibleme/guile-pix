/**
 * Dungeon Creatures — Batch 5: Mimics, Elementals & Magical (32x32 DSL)
 * 10 creatures × 2 frames (base + idle) = 20 templates.
 * Non-humanoid dungeon creatures with idle animation pairs.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'dungeon_creatures',
  exportNames: { templates: 'DUNGEON_CREATURES_32_BATCH5_TEMPLATES', schemes: 'DUNGEON_CREATURES_32_BATCH5_COLOR_SCHEMES' },
  templates: [

    // ═══ 1. MIMIC CHEST ═══
    {
      id: 'mimic_chest_32',
      description: 'Treasure chest mimic — base frame. Open lid with teeth, tongue, and single eye.',
      size: 32,
      draw: [
        // ground shadow
        'ellipse(15, 28, 10, 2, D)',
        // chest body
        'rect(6, 18, 20, 10, B)',
        'rect(6, 18, 20, 3, S)',
        // lid (open, tilted back)
        'rect(6, 10, 20, 8, B)',
        'rect(6, 10, 20, 2, S)',
        // metal trim bands
        'rect(6, 17, 20, 1, M)',
        'rect(6, 27, 20, 1, M)',
        'rect(6, 12, 20, 1, M)',
        // lock/clasp
        'rect(14, 16, 4, 2, M)',
        // teeth along mouth opening (jagged row)
        'pixels(T, 7,13, 9,13, 11,13, 13,13, 15,13, 17,13, 19,13, 21,13, 23,13, 25,13)',
        'pixels(T, 8,17, 10,17, 12,17, 14,17, 16,17, 18,17, 20,17, 22,17, 24,17)',
        // tongue
        'ellipse(15, 15, 3, 1, G)',
        'pixels(G, 15,16, 16,16)',
        // single eye on lid interior
        'pixels(E, 15,11, 16,11)',
        'pixels(P, 14,11)',
      ],
      chars: {
        B: { name: 'wood', role: 'body' },
        S: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        D: { name: 'ground_shadow', role: 'body', tone: 'shadow' },
        M: { name: 'metal_trim', role: 'belt' },
        T: { name: 'teeth', role: 'accessory' },
        G: { name: 'tongue', role: 'head' },
        E: { name: 'eye_iris', role: 'eye' },
        P: { name: 'eye_pupil', role: 'eye', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
        belt: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye: { shadow: '#140c1c', base: '#dad45e', highlight: '#deeed6' },
      },
    },
    {
      id: 'mimic_chest_idle_32',
      description: 'Treasure chest mimic — idle frame. Teeth shift, tongue wiggles, eye moves.',
      size: 32,
      draw: [
        'ellipse(15, 28, 10, 2, D)',
        // chest body
        'rect(6, 18, 20, 10, B)',
        'rect(6, 18, 20, 3, S)',
        // lid slightly more open
        'rect(6, 9, 20, 9, B)',
        'rect(6, 9, 20, 2, S)',
        // metal trim bands
        'rect(6, 17, 20, 1, M)',
        'rect(6, 27, 20, 1, M)',
        'rect(6, 11, 20, 1, M)',
        'rect(14, 16, 4, 2, M)',
        // teeth offset by 1px
        'pixels(T, 8,13, 10,13, 12,13, 14,13, 16,13, 18,13, 20,13, 22,13, 24,13)',
        'pixels(T, 7,17, 9,17, 11,17, 13,17, 15,17, 17,17, 19,17, 21,17, 23,17, 25,17)',
        // tongue shifted right
        'ellipse(16, 15, 3, 1, G)',
        'pixels(G, 17,16, 16,16)',
        // eye shifted
        'pixels(E, 16,10, 17,10)',
        'pixels(P, 15,10)',
      ],
      chars: {
        B: { name: 'wood', role: 'body' },
        S: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        D: { name: 'ground_shadow', role: 'body', tone: 'shadow' },
        M: { name: 'metal_trim', role: 'belt' },
        T: { name: 'teeth', role: 'accessory' },
        G: { name: 'tongue', role: 'head' },
        E: { name: 'eye_iris', role: 'eye' },
        P: { name: 'eye_pupil', role: 'eye', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
        belt: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye: { shadow: '#140c1c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══ 2. FIRE ELEMENTAL ═══
    {
      id: 'fire_elemental_32',
      description: 'Fire elemental — base frame. Living flame creature, no solid form.',
      size: 32,
      draw: [
        // ground glow
        'ellipse(15, 28, 8, 2, G)',
        // outer flame body
        'ellipse(15, 20, 8, 8, B)',
        'ellipse(15, 14, 6, 6, B)',
        'ellipse(15, 9, 4, 4, B)',
        // inner hot core
        'ellipse(15, 20, 5, 5, L)',
        'ellipse(15, 14, 3, 3, L)',
        // flame tips
        'tri(B, 15,3, 13,9, 17,9)',
        'tri(B, 9,10, 7,16, 11,14)',
        'tri(B, 21,10, 19,14, 23,16)',
        // white-hot center
        'ellipse(15, 19, 2, 3, H)',
        // eyes
        'pixels(E, 12,17, 13,17)',
        'pixels(E, 17,17, 18,17)',
      ],
      chars: {
        B: { name: 'flame_outer', role: 'body' },
        L: { name: 'flame_inner', role: 'body', tone: 'highlight' },
        H: { name: 'flame_core', role: 'head' },
        G: { name: 'ground_glow', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
        head: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },
    {
      id: 'fire_elemental_idle_32',
      description: 'Fire elemental — idle frame. Flames morph and flicker.',
      size: 32,
      draw: [
        'ellipse(15, 28, 9, 2, G)',
        // slightly different flame shape
        'ellipse(15, 21, 9, 7, B)',
        'ellipse(15, 15, 7, 6, B)',
        'ellipse(15, 10, 3, 3, B)',
        // inner core shifted
        'ellipse(15, 21, 6, 4, L)',
        'ellipse(15, 15, 4, 3, L)',
        // flame tips different positions
        'tri(B, 14,4, 12,10, 16,10)',
        'tri(B, 7,12, 6,18, 10,15)',
        'tri(B, 23,12, 20,15, 24,18)',
        // white-hot center
        'ellipse(15, 20, 2, 3, H)',
        // eyes shifted down
        'pixels(E, 12,18, 13,18)',
        'pixels(E, 17,18, 18,18)',
      ],
      chars: {
        B: { name: 'flame_outer', role: 'body' },
        L: { name: 'flame_inner', role: 'body', tone: 'highlight' },
        H: { name: 'flame_core', role: 'head' },
        G: { name: 'ground_glow', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
        head: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },

    // ═══ 3. ICE ELEMENTAL ═══
    {
      id: 'ice_elemental_32',
      description: 'Ice elemental — base frame. Angular crystalline body shape.',
      size: 32,
      draw: [
        // ground frost
        'ellipse(15, 28, 9, 2, F)',
        // main crystalline body — angular overlapping shapes
        'tri(B, 15,4, 6,24, 24,24)',
        'rect(8, 20, 16, 6, B)',
        // crystal facets (lighter shards)
        'tri(L, 15,6, 10,18, 20,18)',
        'tri(L, 11,12, 8,22, 14,22)',
        'tri(L, 19,12, 16,22, 22,22)',
        // dark facet edges
        'line(15,4, 6,24, D)',
        'line(15,4, 24,24, D)',
        'line(10,18, 20,18, D)',
        // highlight shard
        'tri(H, 15,8, 13,14, 17,14)',
        // eyes
        'pixels(E, 12,16, 13,16)',
        'pixels(E, 17,16, 18,16)',
      ],
      chars: {
        B: { name: 'ice_body', role: 'body' },
        D: { name: 'ice_edge', role: 'body', tone: 'shadow' },
        L: { name: 'ice_facet', role: 'body', tone: 'highlight' },
        H: { name: 'ice_highlight', role: 'head' },
        F: { name: 'frost', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
        eye: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },
    {
      id: 'ice_elemental_idle_32',
      description: 'Ice elemental — idle frame. Facets shift and rotate slightly.',
      size: 32,
      draw: [
        'ellipse(15, 28, 10, 2, F)',
        // body slightly wider, shorter
        'tri(B, 15,5, 5,25, 25,25)',
        'rect(7, 21, 18, 5, B)',
        // facets shifted
        'tri(L, 15,7, 9,19, 21,19)',
        'tri(L, 10,13, 7,23, 13,23)',
        'tri(L, 20,13, 17,23, 23,23)',
        // dark edges
        'line(15,5, 5,25, D)',
        'line(15,5, 25,25, D)',
        'line(9,19, 21,19, D)',
        // highlight shard shifted
        'tri(H, 15,9, 12,15, 18,15)',
        // eyes shifted
        'pixels(E, 11,17, 12,17)',
        'pixels(E, 18,17, 19,17)',
      ],
      chars: {
        B: { name: 'ice_body', role: 'body' },
        D: { name: 'ice_edge', role: 'body', tone: 'shadow' },
        L: { name: 'ice_facet', role: 'body', tone: 'highlight' },
        H: { name: 'ice_highlight', role: 'head' },
        F: { name: 'frost', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
        eye: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══ 4. SHADOW ELEMENTAL ═══
    {
      id: 'shadow_elemental_32',
      description: 'Shadow elemental — base frame. Dark amorphous shape with glowing eyes.',
      size: 32,
      draw: [
        // ground shadow pool
        'ellipse(15, 28, 11, 3, D)',
        // amorphous dark body
        'ellipse(15, 20, 10, 8, B)',
        'ellipse(13, 14, 6, 5, B)',
        'ellipse(18, 12, 5, 4, B)',
        // wispy tendrils
        'tri(B, 6,22, 3,28, 9,26)',
        'tri(B, 24,22, 21,26, 27,28)',
        'tri(B, 12,10, 10,6, 14,8)',
        // darker interior
        'ellipse(15, 20, 6, 5, D)',
        // glowing eyes
        'pixels(E, 11,17, 12,17, 11,18, 12,18)',
        'pixels(E, 18,17, 19,17, 18,18, 19,18)',
        // eye glow aura
        'pixels(G, 10,17, 13,17, 10,18, 13,18)',
        'pixels(G, 17,17, 20,17, 17,18, 20,18)',
      ],
      chars: {
        B: { name: 'shadow_body', role: 'body' },
        D: { name: 'shadow_dark', role: 'body', tone: 'shadow' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'eye_glow', role: 'head' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d04648' },
      },
    },
    {
      id: 'shadow_elemental_idle_32',
      description: 'Shadow elemental — idle frame. Shape morphs, tendrils shift.',
      size: 32,
      draw: [
        'ellipse(15, 28, 12, 3, D)',
        // body morphed wider, lower
        'ellipse(15, 21, 11, 7, B)',
        'ellipse(14, 15, 7, 5, B)',
        'ellipse(19, 13, 4, 4, B)',
        // tendrils shifted
        'tri(B, 5,23, 2,29, 8,27)',
        'tri(B, 25,21, 22,25, 28,27)',
        'tri(B, 11,11, 9,7, 13,9)',
        // darker interior
        'ellipse(15, 21, 7, 4, D)',
        // eyes shifted down
        'pixels(E, 11,18, 12,18, 11,19, 12,19)',
        'pixels(E, 18,18, 19,18, 18,19, 19,19)',
        // eye glow
        'pixels(G, 10,18, 13,18, 10,19, 13,19)',
        'pixels(G, 17,18, 20,18, 17,19, 20,19)',
      ],
      chars: {
        B: { name: 'shadow_body', role: 'body' },
        D: { name: 'shadow_dark', role: 'body', tone: 'shadow' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'eye_glow', role: 'head' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d04648' },
      },
    },

    // ═══ 5. LIVING CRYSTAL ═══
    {
      id: 'living_crystal_32',
      description: 'Living crystal — base frame. Geometric faceted golem creature.',
      size: 32,
      draw: [
        // ground shadow
        'ellipse(15, 28, 8, 2, D)',
        // lower body (wide base)
        'rect(8, 20, 16, 8, B)',
        // upper body (narrower)
        'rect(10, 14, 12, 6, B)',
        // head crystal
        'tri(B, 15, 5, 10, 14, 20, 14)',
        // facet highlights
        'tri(L, 15, 7, 12, 13, 18, 13)',
        'rect(10, 15, 5, 4, L)',
        'rect(19, 21, 4, 3, L)',
        // facet shadows
        'rect(17, 15, 5, 4, D)',
        'rect(9, 21, 4, 5, D)',
        // crystal arm-like protrusions
        'tri(A, 5, 18, 8, 15, 8, 22)',
        'tri(A, 25, 18, 22, 15, 22, 22)',
        // glowing energy lines
        'line(12, 16, 12, 26, G)',
        'line(18, 16, 18, 26, G)',
        'line(12, 22, 18, 22, G)',
        // eyes
        'pixels(E, 13,11, 14,11)',
        'pixels(E, 16,11, 17,11)',
      ],
      chars: {
        B: { name: 'crystal_body', role: 'body' },
        D: { name: 'crystal_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'crystal_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'crystal_arms', role: 'accessory' },
        G: { name: 'energy_lines', role: 'head' },
        E: { name: 'eyes', role: 'eye' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#597dce', base: '#dad45e', highlight: '#deeed6' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },
    {
      id: 'living_crystal_idle_32',
      description: 'Living crystal — idle frame. Facets shift, energy pulses.',
      size: 32,
      draw: [
        'ellipse(15, 28, 8, 2, D)',
        // body slightly compressed
        'rect(8, 21, 16, 7, B)',
        'rect(10, 15, 12, 6, B)',
        // head crystal wobble
        'tri(B, 14, 6, 9, 15, 19, 15)',
        // facets rotated
        'tri(L, 14, 8, 11, 14, 17, 14)',
        'rect(11, 16, 5, 4, L)',
        'rect(18, 22, 4, 3, L)',
        // facet shadows shifted
        'rect(16, 16, 5, 4, D)',
        'rect(9, 22, 4, 4, D)',
        // arms shifted
        'tri(A, 4, 19, 8, 16, 8, 23)',
        'tri(A, 26, 19, 22, 16, 22, 23)',
        // energy lines shifted
        'line(11, 17, 11, 26, G)',
        'line(19, 17, 19, 26, G)',
        'line(11, 23, 19, 23, G)',
        // eyes
        'pixels(E, 12,12, 13,12)',
        'pixels(E, 15,12, 16,12)',
      ],
      chars: {
        B: { name: 'crystal_body', role: 'body' },
        D: { name: 'crystal_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'crystal_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'crystal_arms', role: 'accessory' },
        G: { name: 'energy_lines', role: 'head' },
        E: { name: 'eyes', role: 'eye' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#597dce', base: '#dad45e', highlight: '#deeed6' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══ 6. FLOATING SKULL ═══
    {
      id: 'floating_skull_32',
      description: 'Floating skull — base frame. Skull with flame aura orbiting it.',
      size: 32,
      draw: [
        // flame aura (behind skull)
        'ellipse(15, 14, 12, 10, F)',
        'tri(F, 15,2, 10,10, 20,10)',
        'tri(F, 5,10, 3,18, 8,14)',
        'tri(F, 25,10, 22,14, 27,18)',
        // skull shape
        'circle(15, 15, 8, B)',
        // skull shading
        'ellipse(13, 12, 3, 2, L)',
        // jaw
        'rect(10, 22, 12, 4, B)',
        'rect(10, 22, 12, 1, D)',
        // eye sockets (dark)
        'ellipse(11, 14, 2, 2, S)',
        'ellipse(19, 14, 2, 2, S)',
        // glowing eyes inside sockets
        'pixels(E, 11,14, 12,14)',
        'pixels(E, 18,14, 19,14)',
        // nose hole
        'pixels(S, 15,17, 14,18, 15,18, 16,18)',
        // teeth
        'pixels(T, 11,23, 12,23, 13,23, 14,23, 16,23, 17,23, 18,23, 19,23)',
        'pixels(T, 11,24, 13,24, 15,24, 17,24, 19,24)',
      ],
      chars: {
        B: { name: 'bone', role: 'body' },
        D: { name: 'bone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'bone_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'socket', role: 'belt' },
        F: { name: 'flame_aura', role: 'head' },
        E: { name: 'eyes', role: 'eye' },
        T: { name: 'teeth', role: 'accessory' },
      },
      colors: {
        body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
      },
    },
    {
      id: 'floating_skull_idle_32',
      description: 'Floating skull — idle frame. Flame aura flickers, skull bobs up.',
      size: 32,
      draw: [
        // flame aura flickered
        'ellipse(15, 13, 13, 11, F)',
        'tri(F, 14,1, 9,9, 19,9)',
        'tri(F, 4,11, 2,19, 7,15)',
        'tri(F, 26,11, 23,15, 28,19)',
        // skull bobbed up 1px
        'circle(15, 14, 8, B)',
        'ellipse(13, 11, 3, 2, L)',
        // jaw
        'rect(10, 21, 12, 4, B)',
        'rect(10, 21, 12, 1, D)',
        // eye sockets
        'ellipse(11, 13, 2, 2, S)',
        'ellipse(19, 13, 2, 2, S)',
        // eyes
        'pixels(E, 11,13, 12,13)',
        'pixels(E, 18,13, 19,13)',
        // nose
        'pixels(S, 15,16, 14,17, 15,17, 16,17)',
        // teeth
        'pixels(T, 11,22, 12,22, 13,22, 14,22, 16,22, 17,22, 18,22, 19,22)',
        'pixels(T, 11,23, 13,23, 15,23, 17,23, 19,23)',
      ],
      chars: {
        B: { name: 'bone', role: 'body' },
        D: { name: 'bone_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'bone_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'socket', role: 'belt' },
        F: { name: 'flame_aura', role: 'head' },
        E: { name: 'eyes', role: 'eye' },
        T: { name: 'teeth', role: 'accessory' },
      },
      colors: {
        body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ═══ 7. BONE SERPENT ═══
    {
      id: 'bone_serpent_32',
      description: 'Bone serpent — base frame. Snake made of bones with segmented spine.',
      size: 32,
      draw: [
        // ground shadow
        'ellipse(15, 28, 12, 2, D)',
        // serpent body — S-curve of bone segments
        'circle(8, 24, 3, B)',
        'circle(12, 21, 3, B)',
        'circle(16, 18, 3, B)',
        'circle(20, 15, 3, B)',
        'circle(18, 11, 3, B)',
        'circle(14, 8, 3, B)',
        // skull head
        'circle(10, 6, 4, B)',
        'ellipse(9, 5, 2, 1, L)',
        // rib-like details on segments
        'pixels(R, 6,23, 10,23, 10,20, 14,20, 14,17, 18,17, 22,14, 18,14, 20,10, 16,10)',
        'pixels(R, 5,25, 9,22, 13,19, 17,16, 21,13, 19,9, 15,7)',
        // spine line connecting segments
        'line(8,24, 12,21, S)',
        'line(12,21, 16,18, S)',
        'line(16,18, 20,15, S)',
        'line(20,15, 18,11, S)',
        'line(18,11, 14,8, S)',
        'line(14,8, 10,6, S)',
        // eyes
        'pixels(E, 8,5, 9,5)',
        'pixels(E, 11,5, 12,5)',
        // jaw teeth
        'pixels(T, 8,9, 9,9, 10,9, 11,9, 12,9)',
      ],
      chars: {
        B: { name: 'bone', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'bone_highlight', role: 'body', tone: 'highlight' },
        R: { name: 'ribs', role: 'accessory' },
        S: { name: 'spine', role: 'belt' },
        E: { name: 'eyes', role: 'eye' },
        T: { name: 'teeth', role: 'head' },
      },
      colors: {
        body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },
        belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
      },
    },
    {
      id: 'bone_serpent_idle_32',
      description: 'Bone serpent — idle frame. Body slithers, segments shift positions.',
      size: 32,
      draw: [
        'ellipse(15, 28, 12, 2, D)',
        // serpent body — shifted S-curve
        'circle(9, 25, 3, B)',
        'circle(13, 22, 3, B)',
        'circle(17, 19, 3, B)',
        'circle(19, 15, 3, B)',
        'circle(16, 11, 3, B)',
        'circle(12, 8, 3, B)',
        // skull head shifted
        'circle(9, 5, 4, B)',
        'ellipse(8, 4, 2, 1, L)',
        // ribs shifted
        'pixels(R, 7,24, 11,24, 11,21, 15,21, 15,18, 17,18, 21,14, 17,14, 18,10, 14,10)',
        'pixels(R, 6,26, 10,23, 14,20, 18,17, 20,13, 17,9, 13,7)',
        // spine
        'line(9,25, 13,22, S)',
        'line(13,22, 17,19, S)',
        'line(17,19, 19,15, S)',
        'line(19,15, 16,11, S)',
        'line(16,11, 12,8, S)',
        'line(12,8, 9,5, S)',
        // eyes
        'pixels(E, 7,4, 8,4)',
        'pixels(E, 10,4, 11,4)',
        // teeth
        'pixels(T, 7,8, 8,8, 9,8, 10,8, 11,8)',
      ],
      chars: {
        B: { name: 'bone', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'bone_highlight', role: 'body', tone: 'highlight' },
        R: { name: 'ribs', role: 'accessory' },
        S: { name: 'spine', role: 'belt' },
        E: { name: 'eyes', role: 'eye' },
        T: { name: 'teeth', role: 'head' },
      },
      colors: {
        body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },
        belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══ 8. ANIMATED SWORD ═══
    {
      id: 'animated_sword_32',
      description: 'Animated sword — base frame. Enchanted flying sword with magical glow.',
      size: 32,
      draw: [
        // magical glow aura
        'ellipse(15, 15, 6, 12, G)',
        // blade
        'rect(14, 3, 4, 18, B)',
        'tri(B, 15, 1, 13, 5, 18, 5)',
        // blade highlight (left edge)
        'rect(14, 3, 1, 18, L)',
        // blade shadow (right edge)
        'rect(17, 3, 1, 18, D)',
        // crossguard
        'rect(8, 21, 16, 3, C)',
        'rect(8, 21, 16, 1, H)',
        // grip
        'rect(14, 24, 4, 4, W)',
        // pommel
        'circle(15, 29, 2, P)',
        // magic sparkles
        'pixels(S, 8,8, 22,12, 6,18, 24,6, 10,3, 20,20)',
        // eye on blade
        'pixels(E, 15,12, 16,12, 15,13, 16,13)',
      ],
      chars: {
        B: { name: 'blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_highlight', role: 'body', tone: 'highlight' },
        C: { name: 'crossguard', role: 'belt' },
        H: { name: 'guard_highlight', role: 'belt', tone: 'highlight' },
        W: { name: 'grip', role: 'accessory' },
        P: { name: 'pommel', role: 'belt' },
        G: { name: 'magic_glow', role: 'head' },
        S: { name: 'sparkles', role: 'head', tone: 'highlight' },
        E: { name: 'eye', role: 'eye' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },
    {
      id: 'animated_sword_idle_32',
      description: 'Animated sword — idle frame. Glow pulses, slight tilt.',
      size: 32,
      draw: [
        // glow expanded
        'ellipse(15, 15, 7, 13, G)',
        // blade tilted slightly (shifted 1px)
        'rect(13, 4, 4, 18, B)',
        'tri(B, 14, 2, 12, 6, 17, 6)',
        // highlight
        'rect(13, 4, 1, 18, L)',
        // shadow
        'rect(16, 4, 1, 18, D)',
        // crossguard shifted
        'rect(7, 22, 16, 3, C)',
        'rect(7, 22, 16, 1, H)',
        // grip
        'rect(13, 25, 4, 4, W)',
        // pommel
        'circle(14, 30, 2, P)',
        // sparkles shifted
        'pixels(S, 9,10, 21,7, 7,16, 23,14, 11,4, 19,22)',
        // eye
        'pixels(E, 14,13, 15,13, 14,14, 15,14)',
      ],
      chars: {
        B: { name: 'blade', role: 'body' },
        D: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'blade_highlight', role: 'body', tone: 'highlight' },
        C: { name: 'crossguard', role: 'belt' },
        H: { name: 'guard_highlight', role: 'belt', tone: 'highlight' },
        W: { name: 'grip', role: 'accessory' },
        P: { name: 'pommel', role: 'belt' },
        G: { name: 'magic_glow', role: 'head' },
        S: { name: 'sparkles', role: 'head', tone: 'highlight' },
        E: { name: 'eye', role: 'eye' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══ 9. ARCANE ORB ═══
    {
      id: 'arcane_orb_32',
      description: 'Arcane orb — base frame. Magical sphere with runic patterns orbiting it.',
      size: 32,
      draw: [
        // outer magic aura
        'ring(G, 15, 15, 14, 12)',
        // main sphere
        'circle(15, 15, 9, B)',
        // sphere highlight
        'ellipse(12, 11, 3, 2, L)',
        // sphere shadow
        'ellipse(18, 20, 4, 3, D)',
        // inner energy swirl
        'ellipse(15, 15, 4, 4, E)',
        'ellipse(15, 15, 2, 2, C)',
        // orbiting runes (4 cardinal points)
        'pixels(R, 15,1, 16,1, 15,2, 16,2)',
        'pixels(R, 15,28, 16,28, 15,29, 16,29)',
        'pixels(R, 1,15, 2,15, 1,16, 2,16)',
        'pixels(R, 28,15, 29,15, 28,16, 29,16)',
        // rune trail sparkles
        'pixels(S, 4,5, 26,5, 4,25, 26,25)',
      ],
      chars: {
        B: { name: 'orb_body', role: 'body' },
        D: { name: 'orb_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'orb_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'aura_ring', role: 'head' },
        E: { name: 'energy_swirl', role: 'eye' },
        C: { name: 'energy_core', role: 'eye', tone: 'highlight' },
        R: { name: 'runes', role: 'accessory' },
        S: { name: 'sparkles', role: 'head', tone: 'highlight' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#442434', base: '#30346d', highlight: '#597dce' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },
    {
      id: 'arcane_orb_idle_32',
      description: 'Arcane orb — idle frame. Runes orbit to different positions, energy pulses.',
      size: 32,
      draw: [
        // aura ring pulses wider
        'ring(G, 15, 15, 15, 13)',
        // sphere
        'circle(15, 15, 9, B)',
        'ellipse(12, 11, 3, 2, L)',
        'ellipse(18, 20, 4, 3, D)',
        // energy swirl shifted
        'ellipse(16, 14, 4, 4, E)',
        'ellipse(16, 14, 2, 2, C)',
        // runes rotated to diagonal positions
        'pixels(R, 5,3, 6,3, 5,4, 6,4)',
        'pixels(R, 25,27, 26,27, 25,28, 26,28)',
        'pixels(R, 3,25, 4,25, 3,26, 4,26)',
        'pixels(R, 26,3, 27,3, 26,4, 27,4)',
        // sparkle trail shifted
        'pixels(S, 8,2, 22,28, 2,22, 28,8)',
      ],
      chars: {
        B: { name: 'orb_body', role: 'body' },
        D: { name: 'orb_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'orb_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'aura_ring', role: 'head' },
        E: { name: 'energy_swirl', role: 'eye' },
        C: { name: 'energy_core', role: 'eye', tone: 'highlight' },
        R: { name: 'runes', role: 'accessory' },
        S: { name: 'sparkles', role: 'head', tone: 'highlight' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#442434', base: '#30346d', highlight: '#597dce' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══ 10. MIMIC BARREL ═══
    {
      id: 'mimic_barrel_32',
      description: 'Barrel mimic — base frame. Barrel with teeth, tongue, and single eye.',
      size: 32,
      draw: [
        // ground shadow
        'ellipse(15, 28, 9, 2, D)',
        // barrel body (rounded rectangle shape)
        'ellipse(15, 20, 9, 9, B)',
        'rect(7, 14, 18, 14, B)',
        // barrel top ellipse (lid)
        'ellipse(15, 11, 9, 4, B)',
        'ellipse(13, 10, 4, 2, L)',
        // metal bands
        'rect(6, 15, 20, 1, M)',
        'rect(6, 22, 20, 1, M)',
        'rect(6, 27, 20, 1, M)',
        // stave lines
        'line(9, 11, 9, 27, D)',
        'line(15, 11, 15, 27, D)',
        'line(21, 11, 21, 27, D)',
        // mouth opening (horizontal split)
        'rect(6, 17, 20, 4, S)',
        // teeth top row
        'pixels(T, 7,17, 9,17, 11,17, 13,17, 15,17, 17,17, 19,17, 21,17, 23,17, 25,17)',
        // teeth bottom row
        'pixels(T, 8,20, 10,20, 12,20, 14,20, 16,20, 18,20, 20,20, 22,20, 24,20)',
        // tongue
        'ellipse(15, 18, 3, 1, G)',
        'pixels(G, 15,19, 16,19)',
        // single eye
        'pixels(E, 15,13, 16,13)',
        'pixels(P, 14,13)',
      ],
      chars: {
        B: { name: 'wood', role: 'body' },
        D: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        M: { name: 'metal_band', role: 'belt' },
        S: { name: 'mouth_interior', role: 'belt', tone: 'shadow' },
        T: { name: 'teeth', role: 'accessory' },
        G: { name: 'tongue', role: 'head' },
        E: { name: 'eye_iris', role: 'eye' },
        P: { name: 'eye_pupil', role: 'eye', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
        belt: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#8595a1' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye: { shadow: '#140c1c', base: '#dad45e', highlight: '#deeed6' },
      },
    },
    {
      id: 'mimic_barrel_idle_32',
      description: 'Barrel mimic — idle frame. Teeth shift, tongue wiggles, eye moves.',
      size: 32,
      draw: [
        'ellipse(15, 28, 9, 2, D)',
        // barrel body
        'ellipse(15, 20, 9, 9, B)',
        'rect(7, 14, 18, 14, B)',
        // lid opened wider (tilted)
        'ellipse(15, 10, 9, 4, B)',
        'ellipse(13, 9, 4, 2, L)',
        // metal bands
        'rect(6, 15, 20, 1, M)',
        'rect(6, 22, 20, 1, M)',
        'rect(6, 27, 20, 1, M)',
        // stave lines
        'line(9, 10, 9, 27, D)',
        'line(15, 10, 15, 27, D)',
        'line(21, 10, 21, 27, D)',
        // mouth wider
        'rect(6, 16, 20, 5, S)',
        // teeth shifted
        'pixels(T, 8,16, 10,16, 12,16, 14,16, 16,16, 18,16, 20,16, 22,16, 24,16)',
        'pixels(T, 7,20, 9,20, 11,20, 13,20, 15,20, 17,20, 19,20, 21,20, 23,20, 25,20)',
        // tongue shifted
        'ellipse(16, 18, 3, 1, G)',
        'pixels(G, 17,19, 16,19)',
        // eye shifted
        'pixels(E, 16,12, 17,12)',
        'pixels(P, 15,12)',
      ],
      chars: {
        B: { name: 'wood', role: 'body' },
        D: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        M: { name: 'metal_band', role: 'belt' },
        S: { name: 'mouth_interior', role: 'belt', tone: 'shadow' },
        T: { name: 'teeth', role: 'accessory' },
        G: { name: 'tongue', role: 'head' },
        E: { name: 'eye_iris', role: 'eye' },
        P: { name: 'eye_pupil', role: 'eye', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
        belt: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#8595a1' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye: { shadow: '#140c1c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
