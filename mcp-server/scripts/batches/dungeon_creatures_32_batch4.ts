/**
 * Dungeon Creatures — Batch 4: Reptiles, Worms & Plants (32x32 DSL)
 * 10 creatures × 2 frames (base + idle) = 20 templates.
 * Non-humanoid dungeon creatures with idle animation pairs.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'dungeon_creatures',
  exportNames: { templates: 'DUNGEON_CREATURES_32_BATCH4_TEMPLATES', schemes: 'DUNGEON_CREATURES_32_BATCH4_COLOR_SCHEMES' },
  templates: [

    // ═══ 1. CAVE SNAKE ═══
    {
      id: 'cave_snake_32',
      description: 'Coiled cave snake — base frame. Scaled body with forked tongue.',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 27, 9, 2, D)',
        // Coiled body — bottom coil
        'ellipse(15, 23, 8, 3, B)',
        'ellipse(15, 25, 8, 2, D)',
        // Middle coil
        'ellipse(14, 19, 7, 3, B)',
        'ellipse(14, 18, 4, 1, L)',
        // Top coil / head area
        'ellipse(16, 15, 6, 3, B)',
        'ellipse(16, 14, 3, 1, L)',
        // Head
        'ellipse(19, 12, 3, 2, H)',
        'ellipse(19, 11, 2, 1, K)',
        // Eyes
        'pixels(E, 20,11, 21,11)',
        // Forked tongue
        'pixels(T, 23,12, 24,11, 24,13)',
        // Scale pattern
        'pixels(S, 10,19, 13,20, 16,19, 11,23, 14,24, 17,23, 20,15)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        T: { name: 'tongue', role: 'accessory' },
        S: { name: 'scales', role: 'belt' },
      },
      colors: {
        body: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
        head: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
        eye: { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
        belt: { shadow: '#442434', base: '#346524', highlight: '#757161' },
      },
    },
    {
      id: 'cave_snake_idle_32',
      description: 'Cave snake — idle frame (slight coil shift, tongue flick).',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 27, 9, 2, D)',
        // Coiled body — bottom coil shifted
        'ellipse(16, 23, 8, 3, B)',
        'ellipse(16, 25, 8, 2, D)',
        // Middle coil shifted
        'ellipse(13, 19, 7, 3, B)',
        'ellipse(13, 18, 4, 1, L)',
        // Top coil / head area shifted
        'ellipse(17, 15, 6, 3, B)',
        'ellipse(17, 14, 3, 1, L)',
        // Head raised slightly
        'ellipse(20, 11, 3, 2, H)',
        'ellipse(20, 10, 2, 1, K)',
        // Eyes
        'pixels(E, 21,10, 22,10)',
        // Forked tongue extended
        'pixels(T, 24,11, 25,10, 25,12, 26,9, 26,13)',
        // Scale pattern
        'pixels(S, 11,19, 14,20, 17,19, 12,23, 15,24, 18,23, 21,15)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        T: { name: 'tongue', role: 'accessory' },
        S: { name: 'scales', role: 'belt' },
      },
      colors: {
        body: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
        head: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
        eye: { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
        belt: { shadow: '#442434', base: '#346524', highlight: '#757161' },
      },
    },

    // ═══ 2. ROCK WORM ═══
    {
      id: 'rock_worm_32',
      description: 'Rock worm — base frame. Segmented worm emerging from ground.',
      size: 32,
      draw: [
        // Ground / dirt mound
        'ellipse(15, 28, 10, 3, G)',
        'ellipse(15, 27, 8, 2, R)',
        // Body segments emerging upward — bottom
        'circle(15, 24, 4, B)',
        'circle(15, 25, 4, D)',
        // Middle segment
        'circle(14, 19, 4, B)',
        'circle(14, 18, 2, L)',
        // Upper segment
        'circle(16, 14, 4, B)',
        'circle(16, 13, 2, L)',
        // Head segment
        'circle(17, 9, 4, H)',
        'circle(17, 8, 2, K)',
        // Mouth
        'pixels(M, 18,11, 19,11, 20,11, 17,12, 20,12)',
        // Eyes
        'pixels(E, 15,8, 16,8, 19,8, 20,8)',
        // Segment lines
        'pixels(S, 11,22, 12,22, 13,22, 14,22, 15,22, 16,22, 17,22, 18,22, 19,22)',
        'pixels(S, 10,17, 11,17, 12,17, 13,17, 14,17, 15,17, 16,17, 17,17, 18,17)',
        'pixels(S, 12,12, 13,12, 14,12, 15,12, 16,12, 17,12, 18,12, 19,12, 20,12)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        M: { name: 'mouth', role: 'accessory' },
        S: { name: 'segments', role: 'belt' },
        G: { name: 'ground', role: 'leg' },
        R: { name: 'ground_highlight', role: 'leg', tone: 'highlight' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#4e4a4e', base: '#854c30', highlight: '#d2aa99' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        leg: { shadow: '#442434', base: '#854c30', highlight: '#757161' },
      },
    },
    {
      id: 'rock_worm_idle_32',
      description: 'Rock worm — idle frame (segments undulate).',
      size: 32,
      draw: [
        // Ground / dirt mound
        'ellipse(15, 28, 10, 3, G)',
        'ellipse(15, 27, 8, 2, R)',
        // Body segments — undulating curve
        'circle(15, 24, 4, B)',
        'circle(15, 25, 4, D)',
        // Middle segment shifted right
        'circle(16, 19, 4, B)',
        'circle(16, 18, 2, L)',
        // Upper segment shifted left
        'circle(13, 14, 4, B)',
        'circle(13, 13, 2, L)',
        // Head segment shifted + lower
        'circle(16, 9, 4, H)',
        'circle(16, 8, 2, K)',
        // Mouth
        'pixels(M, 17,11, 18,11, 19,11, 16,12, 19,12)',
        // Eyes
        'pixels(E, 14,8, 15,8, 18,8, 19,8)',
        // Segment lines
        'pixels(S, 11,22, 12,22, 13,22, 14,22, 15,22, 16,22, 17,22, 18,22, 19,22)',
        'pixels(S, 12,17, 13,17, 14,17, 15,17, 16,17, 17,17, 18,17, 19,17, 20,17)',
        'pixels(S, 9,12, 10,12, 11,12, 12,12, 13,12, 14,12, 15,12, 16,12, 17,12)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        M: { name: 'mouth', role: 'accessory' },
        S: { name: 'segments', role: 'belt' },
        G: { name: 'ground', role: 'leg' },
        R: { name: 'ground_highlight', role: 'leg', tone: 'highlight' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#4e4a4e', base: '#854c30', highlight: '#d2aa99' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        leg: { shadow: '#442434', base: '#854c30', highlight: '#757161' },
      },
    },

    // ═══ 3. CAVE LIZARD ═══
    {
      id: 'cave_lizard_32',
      description: 'Cave lizard — base frame. Small 4-legged lizard, side view.',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 28, 11, 2, D)',
        // Tail
        'line(2, 20, 7, 20, B)',
        'line(2, 21, 6, 21, D)',
        'pixels(L, 3,19, 5,19)',
        // Body
        'ellipse(14, 20, 7, 4, B)',
        'ellipse(13, 18, 4, 2, L)',
        'ellipse(14, 23, 6, 2, D)',
        // Head
        'ellipse(23, 18, 5, 3, H)',
        'ellipse(23, 17, 3, 1, K)',
        // Snout
        'pixels(H, 27,18, 28,18, 28,19)',
        // Eye
        'pixels(E, 25,17, 26,17)',
        // Front legs
        'line(19, 23, 19, 27, G)',
        'line(21, 23, 22, 27, G)',
        'pixels(F, 18,27, 19,27, 20,27, 21,27, 22,27, 23,27)',
        // Back legs
        'line(9, 23, 8, 27, G)',
        'line(11, 23, 11, 27, G)',
        'pixels(F, 7,27, 8,27, 9,27, 10,27, 11,27, 12,27)',
        // Scale spots
        'pixels(S, 11,19, 14,19, 17,19, 15,21)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
        F: { name: 'feet', role: 'leg', tone: 'shadow' },
        S: { name: 'scales', role: 'belt' },
      },
      colors: {
        body: { shadow: '#442434', base: '#757161', highlight: '#8595a1' },
        head: { shadow: '#442434', base: '#757161', highlight: '#8595a1' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt: { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },
    {
      id: 'cave_lizard_idle_32',
      description: 'Cave lizard — idle frame (slight body bob, leg shift).',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 28, 11, 2, D)',
        // Tail
        'line(2, 19, 7, 19, B)',
        'line(2, 20, 6, 20, D)',
        'pixels(L, 3,18, 5,18)',
        // Body — shifted up 1px
        'ellipse(14, 19, 7, 4, B)',
        'ellipse(13, 17, 4, 2, L)',
        'ellipse(14, 22, 6, 2, D)',
        // Head — shifted up 1px
        'ellipse(23, 17, 5, 3, H)',
        'ellipse(23, 16, 3, 1, K)',
        // Snout
        'pixels(H, 27,17, 28,17, 28,18)',
        // Eye
        'pixels(E, 25,16, 26,16)',
        // Front legs — slightly different stance
        'line(18, 22, 17, 27, G)',
        'line(21, 22, 23, 27, G)',
        'pixels(F, 16,27, 17,27, 18,27, 22,27, 23,27, 24,27)',
        // Back legs — slightly different stance
        'line(9, 22, 7, 27, G)',
        'line(11, 22, 12, 27, G)',
        'pixels(F, 6,27, 7,27, 8,27, 11,27, 12,27, 13,27)',
        // Scale spots
        'pixels(S, 11,18, 14,18, 17,18, 15,20)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
        F: { name: 'feet', role: 'leg', tone: 'shadow' },
        S: { name: 'scales', role: 'belt' },
      },
      colors: {
        body: { shadow: '#442434', base: '#757161', highlight: '#8595a1' },
        head: { shadow: '#442434', base: '#757161', highlight: '#8595a1' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt: { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ═══ 4. POISON MUSHROOM ═══
    {
      id: 'poison_mushroom_32',
      description: 'Poison mushroom — base frame. Walking mushroom with large cap and stubby legs.',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 28, 6, 2, D)',
        // Legs
        'rect(11, 24, 3, 4, G)',
        'rect(17, 24, 3, 4, G)',
        'pixels(F, 10,27, 11,27, 12,27, 13,27, 17,27, 18,27, 19,27, 20,27)',
        // Stem body
        'rect(12, 17, 7, 7, B)',
        'rect(12, 22, 7, 2, D)',
        'rect(13, 17, 5, 2, L)',
        // Mushroom cap
        'ellipse(15, 13, 9, 5, C)',
        'ellipse(15, 11, 6, 3, P)',
        'ellipse(15, 15, 8, 2, W)',
        // Spots on cap
        'pixels(S, 10,11, 11,11, 18,12, 19,12, 14,10, 15,10)',
        // Eyes
        'pixels(E, 13,20, 14,20, 17,20, 18,20)',
        'pixels(E, 13,21, 14,21, 17,21, 18,21)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        C: { name: 'cap', role: 'head' },
        P: { name: 'cap_highlight', role: 'head', tone: 'highlight' },
        W: { name: 'cap_underside', role: 'head', tone: 'shadow' },
        S: { name: 'spots', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
        F: { name: 'feet', role: 'leg', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        eye: { shadow: '#140c1c', base: '#346524', highlight: '#dad45e' },
        leg: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
      },
    },
    {
      id: 'poison_mushroom_idle_32',
      description: 'Poison mushroom — idle frame (cap sways, body bobs).',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 28, 6, 2, D)',
        // Legs — shifted stance
        'rect(10, 24, 3, 4, G)',
        'rect(18, 24, 3, 4, G)',
        'pixels(F, 9,27, 10,27, 11,27, 12,27, 18,27, 19,27, 20,27, 21,27)',
        // Stem body — same height
        'rect(12, 17, 7, 7, B)',
        'rect(12, 22, 7, 2, D)',
        'rect(13, 17, 5, 2, L)',
        // Mushroom cap — shifted left 1px for sway
        'ellipse(14, 12, 9, 5, C)',
        'ellipse(14, 10, 6, 3, P)',
        'ellipse(14, 14, 8, 2, W)',
        // Spots on cap — shifted with cap
        'pixels(S, 9,10, 10,10, 17,11, 18,11, 13,9, 14,9)',
        // Eyes
        'pixels(E, 13,20, 14,20, 17,20, 18,20)',
        'pixels(E, 13,21, 14,21, 17,21, 18,21)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        C: { name: 'cap', role: 'head' },
        P: { name: 'cap_highlight', role: 'head', tone: 'highlight' },
        W: { name: 'cap_underside', role: 'head', tone: 'shadow' },
        S: { name: 'spots', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
        F: { name: 'feet', role: 'leg', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        eye: { shadow: '#140c1c', base: '#346524', highlight: '#dad45e' },
        leg: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
      },
    },

    // ═══ 5. SNAPPING PLANT ═══
    {
      id: 'snapping_plant_32',
      description: 'Snapping plant — base frame. Venus flytrap with large jaw on a thick stem.',
      size: 32,
      draw: [
        // Ground / pot base
        'ellipse(15, 28, 6, 2, P)',
        'rect(10, 26, 11, 2, P)',
        // Stem
        'rect(14, 16, 3, 10, B)',
        'rect(14, 24, 3, 2, D)',
        'pixels(L, 15,16, 15,17, 15,18)',
        // Leaves on stem
        'pixels(F, 11,21, 12,20, 13,20)',
        'pixels(F, 18,23, 19,22, 17,22)',
        // Upper jaw (open)
        'ellipse(15, 11, 7, 4, H)',
        'ellipse(15, 10, 5, 2, K)',
        // Teeth on upper jaw
        'pixels(T, 10,14, 13,14, 17,14, 20,14)',
        // Lower jaw
        'ellipse(15, 17, 6, 2, H)',
        'ellipse(15, 18, 5, 1, W)',
        // Teeth on lower jaw
        'pixels(T, 11,16, 14,16, 17,16, 19,16)',
        // Inside mouth
        'rect(11, 14, 9, 2, M)',
        // Eye
        'pixels(E, 14,10, 15,10, 16,10)',
      ],
      chars: {
        B: { name: 'stem', role: 'body' },
        D: { name: 'stem_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stem_highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        W: { name: 'head_shadow', role: 'head', tone: 'shadow' },
        T: { name: 'teeth', role: 'accessory' },
        M: { name: 'mouth_inside', role: 'belt' },
        E: { name: 'eye', role: 'eye' },
        F: { name: 'leaves', role: 'leg' },
        P: { name: 'pot', role: 'boot' },
      },
      colors: {
        body: { shadow: '#346524', base: '#757161', highlight: '#dad45e' },
        head: { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye: { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        boot: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
      },
    },
    {
      id: 'snapping_plant_idle_32',
      description: 'Snapping plant — idle frame (jaws closing, stem sway).',
      size: 32,
      draw: [
        // Ground / pot base
        'ellipse(15, 28, 6, 2, P)',
        'rect(10, 26, 11, 2, P)',
        // Stem — swayed slightly right
        'rect(15, 16, 3, 10, B)',
        'rect(15, 24, 3, 2, D)',
        'pixels(L, 16,16, 16,17, 16,18)',
        // Leaves on stem
        'pixels(F, 12,21, 13,20, 14,20)',
        'pixels(F, 19,23, 20,22, 18,22)',
        // Upper jaw — lowered (closing)
        'ellipse(16, 13, 7, 3, H)',
        'ellipse(16, 12, 5, 2, K)',
        // Teeth on upper jaw
        'pixels(T, 11,15, 14,15, 18,15, 21,15)',
        // Lower jaw — raised (closing)
        'ellipse(16, 16, 6, 2, H)',
        'ellipse(16, 17, 5, 1, W)',
        // Teeth on lower jaw
        'pixels(T, 12,15, 15,15, 18,15, 20,15)',
        // Narrower mouth inside
        'rect(12, 15, 8, 1, M)',
        // Eye
        'pixels(E, 15,11, 16,11, 17,11)',
      ],
      chars: {
        B: { name: 'stem', role: 'body' },
        D: { name: 'stem_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stem_highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        W: { name: 'head_shadow', role: 'head', tone: 'shadow' },
        T: { name: 'teeth', role: 'accessory' },
        M: { name: 'mouth_inside', role: 'belt' },
        E: { name: 'eye', role: 'eye' },
        F: { name: 'leaves', role: 'leg' },
        P: { name: 'pot', role: 'boot' },
      },
      colors: {
        body: { shadow: '#346524', base: '#757161', highlight: '#dad45e' },
        head: { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye: { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        boot: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
      },
    },

    // ═══ 6. THORN VINE ═══
    {
      id: 'thorn_vine_32',
      description: 'Thorn vine — base frame. Vine creature with central eye and thorny tendrils.',
      size: 32,
      draw: [
        // Central eye body
        'circle(15, 15, 5, B)',
        'circle(14, 13, 2, L)',
        'circle(16, 18, 3, D)',
        // Eye
        'circle(15, 15, 2, E)',
        'pixels(W, 15,15)',
        // Vine tendrils
        'line(15, 20, 8, 27, V)',
        'line(15, 20, 22, 27, V)',
        'line(10, 15, 3, 12, V)',
        'line(20, 15, 27, 12, V)',
        'line(12, 11, 8, 5, V)',
        'line(18, 11, 22, 5, V)',
        // Thorns on vines
        'pixels(T, 6,25, 20,25, 5,13, 25,13, 9,7, 21,7)',
        'pixels(T, 10,24, 18,24, 7,14, 23,14, 10,8, 20,8)',
        // Leaf accents
        'pixels(F, 4,11, 5,11, 26,11, 27,11, 7,4, 8,4, 23,4, 24,4)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        E: { name: 'eye_iris', role: 'eye' },
        W: { name: 'eye_pupil', role: 'belt' },
        V: { name: 'vines', role: 'head' },
        T: { name: 'thorns', role: 'accessory' },
        F: { name: 'leaves', role: 'leg' },
      },
      colors: {
        body: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
        eye: { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        head: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        leg: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
      },
    },
    {
      id: 'thorn_vine_idle_32',
      description: 'Thorn vine — idle frame (tendrils sway, eye shifts).',
      size: 32,
      draw: [
        // Central eye body — slight shift
        'circle(16, 15, 5, B)',
        'circle(15, 13, 2, L)',
        'circle(17, 18, 3, D)',
        // Eye — looking other direction
        'circle(16, 15, 2, E)',
        'pixels(W, 17,15)',
        // Vine tendrils — swayed
        'line(16, 20, 10, 28, V)',
        'line(16, 20, 24, 27, V)',
        'line(11, 15, 4, 13, V)',
        'line(21, 15, 28, 11, V)',
        'line(13, 11, 7, 6, V)',
        'line(19, 11, 24, 4, V)',
        // Thorns shifted
        'pixels(T, 8,26, 22,25, 6,14, 26,12, 8,8, 23,5)',
        'pixels(T, 12,25, 20,24, 8,15, 24,13, 9,9, 22,6)',
        // Leaf accents shifted
        'pixels(F, 3,12, 4,12, 27,10, 28,10, 6,5, 7,5, 25,3, 26,3)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        E: { name: 'eye_iris', role: 'eye' },
        W: { name: 'eye_pupil', role: 'belt' },
        V: { name: 'vines', role: 'head' },
        T: { name: 'thorns', role: 'accessory' },
        F: { name: 'leaves', role: 'leg' },
      },
      colors: {
        body: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
        eye: { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        head: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        leg: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══ 7. CAVE FUNGUS ═══
    {
      id: 'cave_fungus_32',
      description: 'Cave fungus — base frame. Glowing mushroom with spore particles.',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 28, 7, 2, D)',
        // Stem
        'rect(13, 18, 5, 9, B)',
        'rect(13, 25, 5, 2, D)',
        'pixels(L, 14,18, 15,18, 14,19, 15,19)',
        // Mushroom cap — large dome
        'ellipse(15, 14, 8, 5, C)',
        'ellipse(15, 12, 5, 3, K)',
        'ellipse(15, 17, 7, 2, W)',
        // Glow ring on cap
        'pixels(G, 9,13, 10,12, 12,11, 15,10, 18,11, 20,12, 21,13)',
        // Spore particles floating
        'pixels(S, 5,8, 8,5, 12,4, 19,5, 23,7, 25,10)',
        'pixels(S, 4,12, 7,9, 22,6, 26,9, 3,16, 27,14)',
        // Gill lines under cap
        'pixels(A, 10,17, 12,17, 14,17, 16,17, 18,17, 20,17)',
      ],
      chars: {
        B: { name: 'stem', role: 'body' },
        D: { name: 'stem_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stem_highlight', role: 'body', tone: 'highlight' },
        C: { name: 'cap', role: 'head' },
        K: { name: 'cap_highlight', role: 'head', tone: 'highlight' },
        W: { name: 'cap_shadow', role: 'head', tone: 'shadow' },
        G: { name: 'glow', role: 'eye' },
        S: { name: 'spores', role: 'accessory' },
        A: { name: 'gills', role: 'belt' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye: { shadow: '#6dc2ca', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#6dc2ca', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#30346d', base: '#4e4a4e', highlight: '#8595a1' },
      },
    },
    {
      id: 'cave_fungus_idle_32',
      description: 'Cave fungus — idle frame (cap pulses, spores drift).',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 28, 7, 2, D)',
        // Stem
        'rect(13, 18, 5, 9, B)',
        'rect(13, 25, 5, 2, D)',
        'pixels(L, 14,18, 15,18, 14,19, 15,19)',
        // Mushroom cap — slightly expanded (pulse)
        'ellipse(15, 13, 9, 6, C)',
        'ellipse(15, 11, 6, 3, K)',
        'ellipse(15, 17, 8, 2, W)',
        // Glow ring expanded
        'pixels(G, 8,12, 9,11, 11,10, 15,9, 19,10, 21,11, 22,12)',
        // Spore particles — shifted positions
        'pixels(S, 6,7, 9,4, 13,3, 20,4, 24,6, 26,9)',
        'pixels(S, 3,11, 8,8, 23,5, 27,8, 2,15, 28,13)',
        // Gill lines
        'pixels(A, 9,17, 11,17, 13,17, 15,17, 17,17, 19,17, 21,17)',
      ],
      chars: {
        B: { name: 'stem', role: 'body' },
        D: { name: 'stem_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stem_highlight', role: 'body', tone: 'highlight' },
        C: { name: 'cap', role: 'head' },
        K: { name: 'cap_highlight', role: 'head', tone: 'highlight' },
        W: { name: 'cap_shadow', role: 'head', tone: 'shadow' },
        G: { name: 'glow', role: 'eye' },
        S: { name: 'spores', role: 'accessory' },
        A: { name: 'gills', role: 'belt' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye: { shadow: '#6dc2ca', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#6dc2ca', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#30346d', base: '#4e4a4e', highlight: '#8595a1' },
      },
    },

    // ═══ 8. FIRE SALAMANDER ═══
    {
      id: 'fire_salamander_32',
      description: 'Fire salamander — base frame. Side view, dark body with fire markings, 4 legs, long tail.',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 28, 11, 2, D)',
        // Tail
        'line(2, 19, 8, 20, B)',
        'line(2, 20, 8, 21, D)',
        'pixels(F, 3,18, 5,18, 7,19)',
        // Body
        'ellipse(15, 20, 7, 4, B)',
        'ellipse(15, 23, 6, 2, D)',
        'ellipse(14, 18, 4, 1, L)',
        // Head
        'ellipse(24, 18, 4, 3, H)',
        'ellipse(24, 17, 3, 1, K)',
        'pixels(H, 27,18, 28,18)',
        // Eye
        'pixels(E, 25,17, 26,17)',
        // Fire markings on body
        'pixels(F, 10,19, 12,18, 14,19, 16,18, 18,19, 20,18)',
        'pixels(F, 11,20, 13,19, 15,20, 17,19, 19,20)',
        // Front legs
        'line(19, 23, 18, 27, G)',
        'line(22, 22, 23, 27, G)',
        'pixels(X, 17,27, 18,27, 22,27, 23,27, 24,27)',
        // Back legs
        'line(10, 23, 9, 27, G)',
        'line(12, 23, 13, 27, G)',
        'pixels(X, 8,27, 9,27, 12,27, 13,27, 14,27)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        F: { name: 'fire_marks', role: 'accessory' },
        G: { name: 'legs', role: 'leg' },
        X: { name: 'feet', role: 'leg', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },
    {
      id: 'fire_salamander_idle_32',
      description: 'Fire salamander — idle frame (body bobs, legs shift).',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 28, 11, 2, D)',
        // Tail — slight curve change
        'line(2, 20, 8, 19, B)',
        'line(2, 21, 8, 20, D)',
        'pixels(F, 3,19, 5,19, 7,18)',
        // Body — shifted up 1px
        'ellipse(15, 19, 7, 4, B)',
        'ellipse(15, 22, 6, 2, D)',
        'ellipse(14, 17, 4, 1, L)',
        // Head — shifted up 1px
        'ellipse(24, 17, 4, 3, H)',
        'ellipse(24, 16, 3, 1, K)',
        'pixels(H, 27,17, 28,17)',
        // Eye
        'pixels(E, 25,16, 26,16)',
        // Fire markings shifted
        'pixels(F, 10,18, 12,17, 14,18, 16,17, 18,18, 20,17)',
        'pixels(F, 11,19, 13,18, 15,19, 17,18, 19,19)',
        // Front legs — different stance
        'line(18, 22, 17, 27, G)',
        'line(22, 21, 24, 27, G)',
        'pixels(X, 16,27, 17,27, 23,27, 24,27, 25,27)',
        // Back legs — different stance
        'line(10, 22, 8, 27, G)',
        'line(13, 22, 14, 27, G)',
        'pixels(X, 7,27, 8,27, 13,27, 14,27, 15,27)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        F: { name: 'fire_marks', role: 'accessory' },
        G: { name: 'legs', role: 'leg' },
        X: { name: 'feet', role: 'leg', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══ 9. ROCK TURTLE ═══
    {
      id: 'rock_turtle_32',
      description: 'Rock turtle — base frame. Armored turtle with rocky shell, side view.',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 28, 10, 2, D)',
        // Shell — dome
        'ellipse(14, 17, 9, 7, S)',
        'ellipse(14, 14, 6, 4, K)',
        'ellipse(14, 21, 8, 3, W)',
        // Rock pattern on shell
        'pixels(R, 10,15, 13,13, 17,14, 19,16, 12,17, 16,16)',
        'line(9,18, 19,18, R)',
        'line(10,15, 18,15, R)',
        // Head poking out front
        'ellipse(23, 21, 3, 3, H)',
        'ellipse(23, 20, 2, 1, J)',
        'pixels(H, 25,21, 26,21)',
        // Eye
        'pixels(E, 24,20, 25,20)',
        // Front legs
        'rect(19, 24, 3, 4, G)',
        'pixels(F, 18,27, 19,27, 20,27, 21,27)',
        // Back legs
        'rect(8, 24, 3, 4, G)',
        'pixels(F, 7,27, 8,27, 9,27, 10,27)',
        // Tail
        'pixels(B, 4,22, 5,22, 6,23)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        S: { name: 'shell', role: 'head' },
        K: { name: 'shell_highlight', role: 'head', tone: 'highlight' },
        W: { name: 'shell_shadow', role: 'head', tone: 'shadow' },
        R: { name: 'rock_pattern', role: 'belt' },
        H: { name: 'head', role: 'accessory' },
        J: { name: 'head_highlight', role: 'accessory', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
        F: { name: 'feet', role: 'leg', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },
        belt: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#442434', base: '#854c30', highlight: '#757161' },
      },
    },
    {
      id: 'rock_turtle_idle_32',
      description: 'Rock turtle — idle frame (slight leg movement, head retracts a bit).',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 28, 10, 2, D)',
        // Shell — same dome
        'ellipse(14, 17, 9, 7, S)',
        'ellipse(14, 14, 6, 4, K)',
        'ellipse(14, 21, 8, 3, W)',
        // Rock pattern on shell
        'pixels(R, 10,15, 13,13, 17,14, 19,16, 12,17, 16,16)',
        'line(9,18, 19,18, R)',
        'line(10,15, 18,15, R)',
        // Head — slightly retracted
        'ellipse(22, 21, 3, 3, H)',
        'ellipse(22, 20, 2, 1, J)',
        'pixels(H, 24,21, 25,21)',
        // Eye
        'pixels(E, 23,20, 24,20)',
        // Front legs — shifted
        'rect(18, 24, 3, 4, G)',
        'pixels(F, 17,27, 18,27, 19,27, 20,27)',
        // Back legs — shifted
        'rect(9, 24, 3, 4, G)',
        'pixels(F, 8,27, 9,27, 10,27, 11,27)',
        // Tail — same
        'pixels(B, 4,22, 5,22, 6,23)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        S: { name: 'shell', role: 'head' },
        K: { name: 'shell_highlight', role: 'head', tone: 'highlight' },
        W: { name: 'shell_shadow', role: 'head', tone: 'shadow' },
        R: { name: 'rock_pattern', role: 'belt' },
        H: { name: 'head', role: 'accessory' },
        J: { name: 'head_highlight', role: 'accessory', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
        F: { name: 'feet', role: 'leg', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#d2aa99' },
        belt: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#346524', base: '#757161', highlight: '#8595a1' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#442434', base: '#854c30', highlight: '#757161' },
      },
    },

    // ═══ 10. DEATH WORM ═══
    {
      id: 'death_worm_32',
      description: 'Death worm — base frame. Large front-facing fanged worm with open mouth.',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 28, 8, 2, D)',
        // Lower body segments
        'ellipse(15, 25, 7, 3, B)',
        'ellipse(15, 27, 7, 2, D)',
        // Middle body
        'ellipse(15, 20, 8, 4, B)',
        'ellipse(15, 18, 5, 2, L)',
        // Segment lines
        'pixels(S, 8,23, 9,23, 10,23, 11,23, 12,23, 13,23, 14,23, 15,23, 16,23, 17,23, 18,23, 19,23, 20,23, 21,23, 22,23)',
        'pixels(S, 7,18, 8,18, 9,18, 10,18, 11,18, 12,18, 13,18, 14,18, 15,18, 16,18, 17,18, 18,18, 19,18, 20,18, 21,18, 22,18, 23,18)',
        // Upper head
        'ellipse(15, 12, 8, 5, H)',
        'ellipse(15, 10, 5, 3, K)',
        // Open mouth — inside
        'ellipse(15, 15, 5, 3, M)',
        // Upper fangs
        'pixels(T, 11,13, 12,14, 18,14, 19,13)',
        // Lower fangs
        'pixels(T, 12,17, 13,18, 17,18, 18,17)',
        // Eyes
        'pixels(E, 10,10, 11,10, 10,11, 11,11)',
        'pixels(E, 19,10, 20,10, 19,11, 20,11)',
        // Antenna / sensory bumps
        'pixels(A, 11,6, 12,7, 18,7, 19,6)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        M: { name: 'mouth', role: 'belt' },
        T: { name: 'fangs', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
        S: { name: 'segments', role: 'leg' },
        A: { name: 'antenna', role: 'boot' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        belt: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        boot: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },
    {
      id: 'death_worm_idle_32',
      description: 'Death worm — idle frame (segments undulate, mouth pulses).',
      size: 32,
      draw: [
        // Ground shadow
        'ellipse(15, 28, 8, 2, D)',
        // Lower body segments — expanded
        'ellipse(15, 25, 8, 3, B)',
        'ellipse(15, 27, 8, 2, D)',
        // Middle body — contracted
        'ellipse(15, 20, 7, 4, B)',
        'ellipse(15, 18, 4, 2, L)',
        // Segment lines
        'pixels(S, 7,23, 8,23, 9,23, 10,23, 11,23, 12,23, 13,23, 14,23, 15,23, 16,23, 17,23, 18,23, 19,23, 20,23, 21,23, 22,23, 23,23)',
        'pixels(S, 8,18, 9,18, 10,18, 11,18, 12,18, 13,18, 14,18, 15,18, 16,18, 17,18, 18,18, 19,18, 20,18, 21,18, 22,18)',
        // Upper head — slightly raised
        'ellipse(15, 11, 8, 5, H)',
        'ellipse(15, 9, 5, 3, K)',
        // Open mouth — wider
        'ellipse(15, 14, 6, 3, M)',
        // Upper fangs — wider spread
        'pixels(T, 10,12, 11,13, 19,13, 20,12)',
        // Lower fangs
        'pixels(T, 11,16, 12,17, 18,17, 19,16)',
        // Eyes — shifted up
        'pixels(E, 10,9, 11,9, 10,10, 11,10)',
        'pixels(E, 19,9, 20,9, 19,10, 20,10)',
        // Antenna raised
        'pixels(A, 11,5, 12,6, 18,6, 19,5)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        M: { name: 'mouth', role: 'belt' },
        T: { name: 'fangs', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
        S: { name: 'segments', role: 'leg' },
        A: { name: 'antenna', role: 'boot' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        belt: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        boot: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

  ],
};

export default batch;
