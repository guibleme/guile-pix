/**
 * Dungeon Creatures — Batch 3: Flying Creatures & Eyes (32x32 DSL)
 * 10 creatures x 2 frames (base + idle) = 20 templates.
 * Bats, wisps, floating eyes, and moths with idle animation pairs.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'dungeon_creatures',
  exportNames: { templates: 'DUNGEON_CREATURES_32_BATCH3_TEMPLATES', schemes: 'DUNGEON_CREATURES_32_BATCH3_COLOR_SCHEMES' },
  templates: [

    // ═══ 1. DUNGEON BAT — wings spread ═══
    {
      id: 'dungeon_bat_32',
      description: 'Brown dungeon bat — base frame. Wings spread wide, small furry body.',
      size: 32,
      draw: [
        // body — small oval center
        'ellipse(15, 15, 3, 4, B)',
        // shadow under body
        'ellipse(15, 17, 3, 2, D)',
        // highlight on head
        'pixels(L, 14,12, 15,12, 16,12)',
        // left wing — spread up-left
        'ellipse(8, 12, 5, 2, W)',
        'ellipse(6, 11, 3, 1, W)',
        'line(11, 13, 13, 14, W)',
        // right wing — spread up-right
        'ellipse(22, 12, 5, 2, W)',
        'ellipse(24, 11, 3, 1, W)',
        'line(19, 13, 17, 14, W)',
        // wing shadow accents
        'pixels(S, 7,13, 8,13, 22,13, 23,13)',
        // ears
        'pixels(B, 13,10, 17,10, 13,11, 17,11)',
        // eyes — red glow
        'pixels(E, 14,14, 16,14)',
        // feet
        'pixels(F, 14,19, 15,19, 16,19)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        W: { name: 'wings', role: 'head' },
        S: { name: 'wing_shadow', role: 'head', tone: 'shadow' },
        E: { name: 'eyes', role: 'eye' },
        F: { name: 'feet', role: 'accessory' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
      },
    },
    {
      id: 'dungeon_bat_idle_32',
      description: 'Dungeon bat — idle frame. Wings folded down.',
      size: 32,
      draw: [
        // body — small oval center, slightly lower
        'ellipse(15, 16, 3, 4, B)',
        'ellipse(15, 18, 3, 2, D)',
        'pixels(L, 14,13, 15,13, 16,13)',
        // left wing — folded down
        'ellipse(9, 17, 4, 3, W)',
        'line(12, 16, 13, 15, W)',
        // right wing — folded down
        'ellipse(21, 17, 4, 3, W)',
        'line(18, 16, 17, 15, W)',
        // wing shadow accents
        'pixels(S, 8,19, 9,19, 21,19, 22,19)',
        // ears
        'pixels(B, 13,11, 17,11, 13,12, 17,12)',
        // eyes
        'pixels(E, 14,15, 16,15)',
        // feet
        'pixels(F, 14,20, 15,20, 16,20)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        W: { name: 'wings', role: 'head' },
        S: { name: 'wing_shadow', role: 'head', tone: 'shadow' },
        E: { name: 'eyes', role: 'eye' },
        F: { name: 'feet', role: 'accessory' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ═══ 2. VAMPIRE BAT — larger, red eyes ═══
    {
      id: 'vampire_bat_32',
      description: 'Vampire bat — base frame. Larger dark bat with glowing red eyes and fangs.',
      size: 32,
      draw: [
        // body — larger than dungeon bat
        'ellipse(15, 15, 4, 5, B)',
        'ellipse(15, 18, 4, 2, D)',
        'pixels(L, 14,11, 15,11, 16,11)',
        // left wing — broad spread
        'ellipse(6, 11, 6, 3, W)',
        'ellipse(3, 10, 3, 2, W)',
        'line(10, 13, 12, 14, W)',
        'pixels(S, 5,13, 6,14, 7,14)',
        // right wing — broad spread
        'ellipse(24, 11, 6, 3, W)',
        'ellipse(27, 10, 3, 2, W)',
        'line(20, 13, 18, 14, W)',
        'pixels(S, 23,14, 24,14, 25,13)',
        // pointed ears
        'pixels(B, 12,9, 11,8, 18,9, 19,8)',
        // eyes — bright red glow
        'pixels(E, 13,14, 14,14, 17,14, 18,14)',
        // fangs
        'pixels(F, 14,18, 16,18)',
        // feet/claws
        'pixels(A, 13,20, 14,20, 16,20, 17,20)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        W: { name: 'wings', role: 'head' },
        S: { name: 'wing_shadow', role: 'head', tone: 'shadow' },
        E: { name: 'eyes', role: 'eye' },
        F: { name: 'fangs', role: 'accessory' },
        A: { name: 'claws', role: 'belt' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },
    {
      id: 'vampire_bat_idle_32',
      description: 'Vampire bat — idle frame. Wings partially folded, hovering.',
      size: 32,
      draw: [
        // body slightly lower
        'ellipse(15, 16, 4, 5, B)',
        'ellipse(15, 19, 4, 2, D)',
        'pixels(L, 14,12, 15,12, 16,12)',
        // left wing — folded
        'ellipse(8, 17, 5, 4, W)',
        'line(12, 15, 13, 14, W)',
        'pixels(S, 6,20, 7,20, 8,20)',
        // right wing — folded
        'ellipse(22, 17, 5, 4, W)',
        'line(18, 15, 17, 14, W)',
        'pixels(S, 22,20, 23,20, 24,20)',
        // pointed ears
        'pixels(B, 12,10, 11,9, 18,10, 19,9)',
        // eyes
        'pixels(E, 13,15, 14,15, 17,15, 18,15)',
        // fangs
        'pixels(F, 14,19, 16,19)',
        // feet
        'pixels(A, 13,21, 14,21, 16,21, 17,21)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        W: { name: 'wings', role: 'head' },
        S: { name: 'wing_shadow', role: 'head', tone: 'shadow' },
        E: { name: 'eyes', role: 'eye' },
        F: { name: 'fangs', role: 'accessory' },
        A: { name: 'claws', role: 'belt' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        belt: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══ 3. FIRE WISP — floating flame orb ═══
    {
      id: 'fire_wisp_32',
      description: 'Fire wisp — base frame. Floating flame orb, no solid body, all glow.',
      size: 32,
      draw: [
        // outer glow — large warm aura
        'circle(15, 16, 7, G)',
        // core flame body
        'circle(15, 15, 4, B)',
        // hot inner core
        'circle(15, 14, 2, L)',
        // bright center pixel
        'pixels(H, 15,13, 15,14)',
        // flame tips rising upward
        'pixels(B, 15,9, 14,10, 16,10, 13,11, 17,11)',
        'pixels(G, 12,10, 18,10, 11,12, 19,12)',
        // trailing sparks below
        'pixels(S, 13,22, 17,23, 11,24, 19,22, 15,25)',
        // flickering side wisps
        'pixels(G, 9,15, 21,14, 8,17, 22,17)',
      ],
      chars: {
        B: { name: 'flame_body', role: 'body' },
        L: { name: 'flame_core', role: 'body', tone: 'highlight' },
        G: { name: 'outer_glow', role: 'head' },
        H: { name: 'hot_center', role: 'eye' },
        S: { name: 'sparks', role: 'accessory' },
      },
      colors: {
        body: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
        eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },
    {
      id: 'fire_wisp_idle_32',
      description: 'Fire wisp — idle frame. Flame shape shifts, sparks reposition.',
      size: 32,
      draw: [
        // outer glow — shifted shape
        'circle(15, 17, 7, G)',
        // core flame body — slightly higher
        'circle(15, 16, 4, B)',
        // hot inner core
        'circle(15, 15, 2, L)',
        // bright center
        'pixels(H, 15,14, 15,15)',
        // flame tips — different positions
        'pixels(B, 14,10, 16,11, 15,10, 13,12, 17,12)',
        'pixels(G, 11,11, 19,11, 10,13, 20,13)',
        // trailing sparks — shifted
        'pixels(S, 14,23, 16,24, 12,22, 18,24, 15,26)',
        // side wisps — shifted
        'pixels(G, 8,16, 22,15, 9,18, 21,18)',
      ],
      chars: {
        B: { name: 'flame_body', role: 'body' },
        L: { name: 'flame_core', role: 'body', tone: 'highlight' },
        G: { name: 'outer_glow', role: 'head' },
        H: { name: 'hot_center', role: 'eye' },
        S: { name: 'sparks', role: 'accessory' },
      },
      colors: {
        body: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
        eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══ 4. ICE WISP — angular crystal glow ═══
    {
      id: 'ice_wisp_32',
      description: 'Ice wisp — base frame. Floating angular ice crystal with cold glow.',
      size: 32,
      draw: [
        // cold aura glow
        'circle(15, 15, 7, G)',
        // crystal body — diamond shape using lines
        'line(15, 8, 20, 15, B)',
        'line(20, 15, 15, 22, B)',
        'line(15, 22, 10, 15, B)',
        'line(10, 15, 15, 8, B)',
        // fill crystal interior
        'ellipse(15, 15, 4, 5, B)',
        // inner bright facet
        'ellipse(14, 13, 2, 2, L)',
        // bright core
        'pixels(H, 15,14, 14,15, 15,15)',
        // ice shard particles
        'pixels(S, 8,10, 22,10, 7,18, 23,18, 10,23, 20,23)',
        // frost trails
        'pixels(G, 6,14, 24,14, 15,24, 15,25)',
      ],
      chars: {
        B: { name: 'crystal_body', role: 'body' },
        L: { name: 'crystal_facet', role: 'body', tone: 'highlight' },
        G: { name: 'cold_glow', role: 'head' },
        H: { name: 'bright_core', role: 'eye' },
        S: { name: 'ice_particles', role: 'accessory' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
        eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },
    {
      id: 'ice_wisp_idle_32',
      description: 'Ice wisp — idle frame. Crystal rotated slightly, particles shift.',
      size: 32,
      draw: [
        // cold aura — shifted
        'circle(15, 16, 7, G)',
        // crystal body — slightly rotated diamond
        'line(14, 9, 21, 14, B)',
        'line(21, 14, 16, 22, B)',
        'line(16, 22, 9, 16, B)',
        'line(9, 16, 14, 9, B)',
        // fill interior
        'ellipse(15, 15, 4, 5, B)',
        // inner facet — shifted
        'ellipse(16, 13, 2, 2, L)',
        // bright core
        'pixels(H, 15,15, 16,14, 15,14)',
        // ice shards — repositioned
        'pixels(S, 9,9, 21,11, 8,19, 22,17, 11,24, 19,24)',
        // frost trails
        'pixels(G, 7,15, 23,15, 15,25, 15,26)',
      ],
      chars: {
        B: { name: 'crystal_body', role: 'body' },
        L: { name: 'crystal_facet', role: 'body', tone: 'highlight' },
        G: { name: 'cold_glow', role: 'head' },
        H: { name: 'bright_core', role: 'eye' },
        S: { name: 'ice_particles', role: 'accessory' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
        eye: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ═══ 5. SHADOW WISP — dark floating orb ═══
    {
      id: 'shadow_wisp_32',
      description: 'Shadow wisp — base frame. Dark floating orb with purple-black tendrils.',
      size: 32,
      draw: [
        // dark aura
        'circle(15, 15, 8, G)',
        // shadow body
        'circle(15, 15, 5, B)',
        // darker inner void
        'circle(15, 15, 3, D)',
        // faint purple highlight on top
        'pixels(L, 13,11, 14,11, 15,11, 16,11, 17,11)',
        // glowing purple eyes inside
        'pixels(E, 13,14, 14,14, 16,14, 17,14)',
        // tendrils trailing down
        'line(12, 20, 10, 25, T)',
        'line(15, 21, 15, 26, T)',
        'line(18, 20, 20, 25, T)',
        // wispy particles around
        'pixels(G, 6,13, 24,13, 7,18, 23,18, 9,22, 21,22)',
      ],
      chars: {
        B: { name: 'shadow_body', role: 'body' },
        D: { name: 'inner_void', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'dark_aura', role: 'head' },
        E: { name: 'eyes', role: 'eye' },
        T: { name: 'tendrils', role: 'accessory' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },
      },
    },
    {
      id: 'shadow_wisp_idle_32',
      description: 'Shadow wisp — idle frame. Orb pulses, tendrils shift position.',
      size: 32,
      draw: [
        // dark aura — slightly larger pulse
        'circle(15, 15, 9, G)',
        // shadow body — same size
        'circle(15, 15, 5, B)',
        // darker inner void
        'circle(15, 15, 2, D)',
        // highlight shift
        'pixels(L, 12,11, 13,10, 14,10, 15,10, 16,10, 17,10, 18,11)',
        // eyes — shifted gaze
        'pixels(E, 13,15, 14,15, 16,15, 17,15)',
        // tendrils — shifted
        'line(11, 20, 8, 26, T)',
        'line(15, 21, 14, 27, T)',
        'line(19, 20, 22, 26, T)',
        // wispy particles — moved
        'pixels(G, 5,14, 25,14, 6,19, 24,19, 8,23, 22,23)',
      ],
      chars: {
        B: { name: 'shadow_body', role: 'body' },
        D: { name: 'inner_void', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'dark_aura', role: 'head' },
        E: { name: 'eyes', role: 'eye' },
        T: { name: 'tendrils', role: 'accessory' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },
      },
    },

    // ═══ 6. FLOATING EYE — single large eyeball ═══
    {
      id: 'floating_eye_32',
      description: 'Floating eye — base frame. Single large eyeball with iris and bloodshot veins.',
      size: 32,
      draw: [
        // eyeball body — large circle
        'circle(15, 15, 9, B)',
        // shadow on bottom
        'ellipse(15, 20, 8, 3, D)',
        // highlight on top
        'ellipse(14, 10, 4, 2, L)',
        // iris — colored circle
        'circle(15, 15, 4, I)',
        // pupil — dark center
        'circle(15, 15, 2, P)',
        // pupil glint
        'pixels(H, 13,13, 14,13)',
        // bloodshot veins radiating from iris
        'line(10, 13, 7, 11, V)',
        'line(10, 17, 7, 19, V)',
        'line(20, 13, 23, 11, V)',
        'line(20, 17, 23, 19, V)',
        'line(15, 8, 15, 6, V)',
        'line(15, 22, 15, 24, V)',
      ],
      chars: {
        B: { name: 'eyeball', role: 'body' },
        D: { name: 'eyeball_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'eyeball_highlight', role: 'body', tone: 'highlight' },
        I: { name: 'iris', role: 'head' },
        P: { name: 'pupil', role: 'belt' },
        H: { name: 'glint', role: 'eye' },
        V: { name: 'veins', role: 'accessory' },
      },
      colors: {
        body: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head: { shadow: '#346524', base: '#6dc2ca', highlight: '#dad45e' },
        belt: { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
      },
    },
    {
      id: 'floating_eye_idle_32',
      description: 'Floating eye — idle frame. Pupil looks right, slight squint.',
      size: 32,
      draw: [
        // eyeball body
        'circle(15, 15, 9, B)',
        // shadow on bottom
        'ellipse(15, 21, 8, 2, D)',
        // highlight on top
        'ellipse(14, 10, 4, 2, L)',
        // iris — shifted right
        'circle(17, 15, 4, I)',
        // pupil — shifted right
        'circle(17, 15, 2, P)',
        // pupil glint — shifted
        'pixels(H, 15,13, 16,13)',
        // bloodshot veins
        'line(10, 13, 7, 12, V)',
        'line(10, 17, 7, 18, V)',
        'line(22, 13, 24, 11, V)',
        'line(22, 17, 24, 19, V)',
        'line(15, 8, 15, 6, V)',
        'line(15, 22, 15, 24, V)',
        // half-lid hint on top (squinting)
        'pixels(D, 8,10, 9,9, 10,9, 20,9, 21,9, 22,10)',
      ],
      chars: {
        B: { name: 'eyeball', role: 'body' },
        D: { name: 'eyeball_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'eyeball_highlight', role: 'body', tone: 'highlight' },
        I: { name: 'iris', role: 'head' },
        P: { name: 'pupil', role: 'belt' },
        H: { name: 'glint', role: 'eye' },
        V: { name: 'veins', role: 'accessory' },
      },
      colors: {
        body: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head: { shadow: '#346524', base: '#6dc2ca', highlight: '#dad45e' },
        belt: { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══ 7. EVIL EYE — beholder-like with tentacles ═══
    {
      id: 'evil_eye_32',
      description: 'Evil eye — base frame. Beholder-like creature with central eye and tentacle stalks.',
      size: 32,
      draw: [
        // main body — large oval
        'ellipse(15, 14, 8, 7, B)',
        'ellipse(15, 18, 7, 3, D)',
        'ellipse(14, 9, 4, 2, L)',
        // central eye
        'circle(15, 13, 4, I)',
        'circle(15, 13, 2, P)',
        'pixels(H, 13,12, 14,11)',
        // mouth — wide grin below eye
        'line(11, 18, 19, 18, M)',
        'pixels(M, 12,19, 18,19)',
        // eye stalks rising from top
        'line(10, 7, 8, 3, T)',
        'line(15, 7, 15, 2, T)',
        'line(20, 7, 22, 3, T)',
        // small eyes on stalk tips
        'pixels(E, 8,2, 7,3, 15,1, 14,2, 22,2, 23,3)',
        // tentacles below
        'line(11, 21, 9, 27, T)',
        'line(15, 21, 15, 28, T)',
        'line(19, 21, 21, 27, T)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        I: { name: 'iris', role: 'head' },
        P: { name: 'pupil', role: 'belt' },
        H: { name: 'glint', role: 'eye' },
        T: { name: 'tentacles', role: 'accessory' },
        M: { name: 'mouth', role: 'leg' },
        E: { name: 'stalk_eyes', role: 'arm' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        belt: { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        leg: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        arm: { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
      },
    },
    {
      id: 'evil_eye_idle_32',
      description: 'Evil eye — idle frame. Pupil shifts, tentacles sway.',
      size: 32,
      draw: [
        // main body — slight bob up
        'ellipse(15, 13, 8, 7, B)',
        'ellipse(15, 17, 7, 3, D)',
        'ellipse(14, 8, 4, 2, L)',
        // central eye — pupil shifted left
        'circle(14, 12, 4, I)',
        'circle(13, 12, 2, P)',
        'pixels(H, 12,11, 12,10)',
        // mouth
        'line(11, 17, 19, 17, M)',
        'pixels(M, 12,18, 18,18)',
        // eye stalks — different positions
        'line(10, 6, 7, 2, T)',
        'line(15, 6, 14, 1, T)',
        'line(20, 6, 23, 2, T)',
        // stalk tip eyes
        'pixels(E, 7,1, 6,2, 14,0, 13,1, 23,1, 24,2)',
        // tentacles — swayed
        'line(11, 20, 8, 26, T)',
        'line(15, 20, 16, 27, T)',
        'line(19, 20, 22, 26, T)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        I: { name: 'iris', role: 'head' },
        P: { name: 'pupil', role: 'belt' },
        H: { name: 'glint', role: 'eye' },
        T: { name: 'tentacles', role: 'accessory' },
        M: { name: 'mouth', role: 'leg' },
        E: { name: 'stalk_eyes', role: 'arm' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        belt: { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        leg: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        arm: { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══ 8. WILL-O-WISP — green-yellow glow ═══
    {
      id: 'will_o_wisp_32',
      description: 'Will-o-wisp — base frame. Eerie green-yellow glowing orb with trailing particles.',
      size: 32,
      draw: [
        // outer eerie glow
        'circle(15, 14, 7, G)',
        // main orb body
        'circle(15, 14, 4, B)',
        // bright inner core
        'circle(15, 13, 2, L)',
        // hot white center
        'pixels(H, 15,13, 14,13)',
        // trailing particles below — ghostly trail
        'pixels(S, 14,22, 16,23, 13,24, 17,25, 15,26, 12,27, 18,27)',
        'pixels(S, 11,25, 19,24, 10,28, 20,28)',
        // wispy tendrils connecting orb to trail
        'line(14, 19, 14, 22, T)',
        'line(16, 19, 16, 23, T)',
        'line(15, 20, 15, 25, T)',
        // ambient glow dots
        'pixels(G, 7,12, 23,12, 8,17, 22,16, 6,15, 24,14)',
      ],
      chars: {
        B: { name: 'orb_body', role: 'body' },
        L: { name: 'orb_core', role: 'body', tone: 'highlight' },
        G: { name: 'outer_glow', role: 'head' },
        H: { name: 'hot_center', role: 'eye' },
        S: { name: 'trail_particles', role: 'accessory' },
        T: { name: 'tendrils', role: 'belt' },
      },
      colors: {
        body: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        head: { shadow: '#346524', base: '#6dc2ca', highlight: '#dad45e' },
        eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#346524', base: '#dad45e', highlight: '#6dc2ca' },
        belt: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
      },
    },
    {
      id: 'will_o_wisp_idle_32',
      description: 'Will-o-wisp — idle frame. Glow shape shifts, particles reposition.',
      size: 32,
      draw: [
        // outer glow — shifted up slightly
        'circle(15, 13, 7, G)',
        // main orb
        'circle(15, 13, 4, B)',
        // inner core
        'circle(15, 12, 2, L)',
        // hot center
        'pixels(H, 15,12, 16,12)',
        // trail — repositioned
        'pixels(S, 15,21, 13,23, 17,22, 14,25, 16,26, 11,26, 19,25)',
        'pixels(S, 12,24, 18,23, 10,27, 20,27)',
        // tendrils
        'line(14, 18, 13, 22, T)',
        'line(16, 18, 17, 22, T)',
        'line(15, 19, 15, 24, T)',
        // ambient glow — moved
        'pixels(G, 8,11, 22,11, 7,16, 23,15, 6,14, 24,13)',
      ],
      chars: {
        B: { name: 'orb_body', role: 'body' },
        L: { name: 'orb_core', role: 'body', tone: 'highlight' },
        G: { name: 'outer_glow', role: 'head' },
        H: { name: 'hot_center', role: 'eye' },
        S: { name: 'trail_particles', role: 'accessory' },
        T: { name: 'tendrils', role: 'belt' },
      },
      colors: {
        body: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        head: { shadow: '#346524', base: '#6dc2ca', highlight: '#dad45e' },
        eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#346524', base: '#dad45e', highlight: '#6dc2ca' },
        belt: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══ 9. CAVE MOTH — large moth with wing patterns ═══
    {
      id: 'cave_moth_32',
      description: 'Cave moth — base frame. Large moth with detailed wing patterns and feathered antennae.',
      size: 32,
      draw: [
        // body — elongated oval center
        'ellipse(15, 15, 2, 5, B)',
        'ellipse(15, 18, 2, 2, D)',
        'pixels(L, 14,11, 15,11, 16,11)',
        // left wing — spread wide
        'ellipse(8, 14, 6, 5, W)',
        // left wing pattern spots
        'circle(7, 13, 2, P)',
        'pixels(P, 5,15, 10,16)',
        // left wing edge
        'pixels(S, 3,12, 2,14, 3,16, 4,18, 6,19)',
        // right wing — spread wide
        'ellipse(22, 14, 6, 5, W)',
        // right wing pattern spots
        'circle(23, 13, 2, P)',
        'pixels(P, 25,15, 20,16)',
        // right wing edge
        'pixels(S, 27,12, 28,14, 27,16, 26,18, 24,19)',
        // antennae — feathered
        'line(14, 10, 10, 5, A)',
        'line(16, 10, 20, 5, A)',
        'pixels(A, 9,4, 8,5, 11,6, 21,4, 22,5, 19,6)',
        // eyes — compound
        'pixels(E, 14,13, 16,13)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        W: { name: 'wings', role: 'head' },
        S: { name: 'wing_edge', role: 'head', tone: 'shadow' },
        P: { name: 'wing_pattern', role: 'accessory' },
        A: { name: 'antennae', role: 'belt' },
        E: { name: 'eyes', role: 'eye' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },
    {
      id: 'cave_moth_idle_32',
      description: 'Cave moth — idle frame. Wings angled differently, slight body bob.',
      size: 32,
      draw: [
        // body — slightly lower
        'ellipse(15, 16, 2, 5, B)',
        'ellipse(15, 19, 2, 2, D)',
        'pixels(L, 14,12, 15,12, 16,12)',
        // left wing — angled more down
        'ellipse(9, 16, 5, 4, W)',
        // left wing spots
        'circle(8, 15, 2, P)',
        'pixels(P, 6,17, 11,18)',
        // left wing edge
        'pixels(S, 4,14, 3,16, 4,18, 5,20, 7,21)',
        // right wing — angled more down
        'ellipse(21, 16, 5, 4, W)',
        // right wing spots
        'circle(22, 15, 2, P)',
        'pixels(P, 24,17, 19,18)',
        // right wing edge
        'pixels(S, 26,14, 27,16, 26,18, 25,20, 23,21)',
        // antennae — slight shift
        'line(14, 11, 11, 6, A)',
        'line(16, 11, 19, 6, A)',
        'pixels(A, 10,5, 9,6, 12,7, 20,5, 21,6, 18,7)',
        // eyes
        'pixels(E, 14,14, 16,14)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        W: { name: 'wings', role: 'head' },
        S: { name: 'wing_edge', role: 'head', tone: 'shadow' },
        P: { name: 'wing_pattern', role: 'accessory' },
        A: { name: 'antennae', role: 'belt' },
        E: { name: 'eyes', role: 'eye' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══ 10. PHANTOM EYE — ghostly translucent eye ═══
    {
      id: 'phantom_eye_32',
      description: 'Phantom eye — base frame. Ghostly translucent floating eye with spectral trail.',
      size: 32,
      draw: [
        // spectral aura — faint ring
        'ring(15, 13, 10, 8, G)',
        // eyeball — semi-transparent feel via lighter colors
        'circle(15, 13, 7, B)',
        'ellipse(15, 17, 6, 2, D)',
        'ellipse(14, 9, 3, 2, L)',
        // iris — ethereal cyan
        'circle(15, 13, 3, I)',
        // pupil — dark slit
        'ellipse(15, 13, 1, 2, P)',
        // glint
        'pixels(H, 13,11, 14,11)',
        // spectral trail flowing down
        'line(12, 20, 10, 27, T)',
        'line(15, 20, 15, 28, T)',
        'line(18, 20, 20, 27, T)',
        'pixels(T, 9,28, 11,29, 14,29, 16,29, 19,28, 21,29)',
        // ghostly particles
        'pixels(G, 5,11, 25,11, 6,16, 24,16, 7,20, 23,20)',
      ],
      chars: {
        B: { name: 'ghost_eye', role: 'body' },
        D: { name: 'eye_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'eye_highlight', role: 'body', tone: 'highlight' },
        I: { name: 'iris', role: 'head' },
        P: { name: 'pupil', role: 'belt' },
        H: { name: 'glint', role: 'eye' },
        G: { name: 'spectral_aura', role: 'accessory' },
        T: { name: 'spectral_trail', role: 'leg' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#6dc2ca', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
        eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
        leg: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },
    {
      id: 'phantom_eye_idle_32',
      description: 'Phantom eye — idle frame. Pupil shifts, spectral trail sways.',
      size: 32,
      draw: [
        // spectral aura — shifted
        'ring(15, 14, 10, 8, G)',
        // eyeball — slightly lower
        'circle(15, 14, 7, B)',
        'ellipse(15, 18, 6, 2, D)',
        'ellipse(14, 10, 3, 2, L)',
        // iris — shifted left
        'circle(14, 14, 3, I)',
        // pupil — shifted
        'ellipse(14, 14, 1, 2, P)',
        // glint
        'pixels(H, 12,12, 13,12)',
        // spectral trail — swayed
        'line(11, 21, 8, 28, T)',
        'line(15, 21, 14, 29, T)',
        'line(19, 21, 22, 28, T)',
        'pixels(T, 7,29, 10,30, 13,30, 15,30, 21,29, 23,29)',
        // ghostly particles — moved
        'pixels(G, 4,12, 26,12, 5,17, 25,17, 8,21, 22,21)',
      ],
      chars: {
        B: { name: 'ghost_eye', role: 'body' },
        D: { name: 'eye_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'eye_highlight', role: 'body', tone: 'highlight' },
        I: { name: 'iris', role: 'head' },
        P: { name: 'pupil', role: 'belt' },
        H: { name: 'glint', role: 'eye' },
        G: { name: 'spectral_aura', role: 'accessory' },
        T: { name: 'spectral_trail', role: 'leg' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head: { shadow: '#6dc2ca', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
        eye: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
        leg: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

  ],
};

export default batch;
