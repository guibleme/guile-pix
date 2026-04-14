/**
 * Dungeon Creatures — Batch 2: Insects & Arachnids (32x32 DSL)
 * 10 creatures × 2 frames (base + idle) = 20 templates.
 * Non-humanoid dungeon creatures with idle animation pairs.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'dungeon_creatures',
  exportNames: { templates: 'DUNGEON_CREATURES_32_BATCH2_TEMPLATES', schemes: 'DUNGEON_CREATURES_32_BATCH2_COLOR_SCHEMES' },
  templates: [

    // ═══ 1. GIANT SPIDER ═══
    {
      id: 'giant_spider_32',
      description: 'Giant spider — base frame. Fat round abdomen, small head, 8 sprawling legs.',
      size: 32,
      draw: [
        // abdomen (large round body)
        'circle(16, 17, 7, B)',
        'circle(14, 14, 3, L)',
        // head (smaller)
        'circle(16, 8, 4, H)',
        'circle(15, 6, 2, K)',
        // eyes — 4 red eyes on face
        'pixels(E, 14,7, 15,7, 17,7, 18,7)',
        'pixels(E, 14,6, 18,6)',
        // fangs
        'pixels(F, 15,12, 17,12, 15,13, 17,13)',
        // shadow under abdomen
        'ellipse(16, 25, 8, 2, D)',
        // 8 legs — 4 on each side
        'line(9, 13, 3, 8, G)',
        'line(3, 8, 1, 12, G)',
        'line(9, 16, 4, 14, G)',
        'line(4, 14, 2, 18, G)',
        'line(9, 19, 4, 21, G)',
        'line(4, 21, 2, 25, G)',
        'line(9, 22, 5, 26, G)',
        'line(5, 26, 4, 30, G)',
        'line(23, 13, 29, 8, G)',
        'line(29, 8, 31, 12, G)',
        'line(23, 16, 28, 14, G)',
        'line(28, 14, 30, 18, G)',
        'line(23, 19, 28, 21, G)',
        'line(28, 21, 30, 25, G)',
        'line(23, 22, 27, 26, G)',
        'line(27, 26, 28, 30, G)',
      ],
      chars: {
        B: { name: 'abdomen', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        F: { name: 'fangs', role: 'accessory' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        head: { shadow: '#442434', base: '#4e4a4e', highlight: '#8595a1' },
        eye: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },
    {
      id: 'giant_spider_idle_32',
      description: 'Giant spider — idle frame (legs shift positions slightly).',
      size: 32,
      draw: [
        'circle(16, 17, 7, B)',
        'circle(14, 14, 3, L)',
        'circle(16, 8, 4, H)',
        'circle(15, 6, 2, K)',
        'pixels(E, 14,7, 15,7, 17,7, 18,7)',
        'pixels(E, 14,6, 18,6)',
        'pixels(F, 15,12, 17,12, 15,13, 17,13)',
        'ellipse(16, 25, 8, 2, D)',
        // legs shifted 1px from base
        'line(9, 13, 4, 7, G)',
        'line(4, 7, 1, 11, G)',
        'line(9, 16, 3, 15, G)',
        'line(3, 15, 1, 19, G)',
        'line(9, 19, 5, 22, G)',
        'line(5, 22, 3, 26, G)',
        'line(9, 22, 6, 27, G)',
        'line(6, 27, 5, 31, G)',
        'line(23, 13, 28, 7, G)',
        'line(28, 7, 31, 11, G)',
        'line(23, 16, 29, 15, G)',
        'line(29, 15, 31, 19, G)',
        'line(23, 19, 27, 22, G)',
        'line(27, 22, 29, 26, G)',
        'line(23, 22, 26, 27, G)',
        'line(26, 27, 27, 31, G)',
      ],
      chars: {
        B: { name: 'abdomen', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        F: { name: 'fangs', role: 'accessory' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        head: { shadow: '#442434', base: '#4e4a4e', highlight: '#8595a1' },
        eye: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══ 2. CAVE BEETLE ═══
    {
      id: 'cave_beetle_32',
      description: 'Cave beetle — base frame. Armored beetle with hard shell and small horns.',
      size: 32,
      draw: [
        // ground shadow
        'ellipse(16, 27, 9, 2, D)',
        // shell body — wide oval
        'ellipse(16, 18, 9, 7, B)',
        // shell highlight
        'ellipse(14, 14, 4, 2, L)',
        // shell center seam
        'line(16, 11, 16, 25, S)',
        // head plate
        'ellipse(16, 9, 5, 3, H)',
        // horns
        'line(13, 7, 11, 3, A)',
        'line(19, 7, 21, 3, A)',
        // eyes
        'pixels(E, 14,9, 18,9)',
        // 6 legs — 3 per side
        'line(8, 15, 4, 13, G)',
        'line(7, 18, 3, 18, G)',
        'line(8, 21, 4, 24, G)',
        'line(24, 15, 28, 13, G)',
        'line(25, 18, 29, 18, G)',
        'line(24, 21, 28, 24, G)',
      ],
      chars: {
        B: { name: 'shell', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        S: { name: 'seam', role: 'belt' },
        H: { name: 'head', role: 'head' },
        A: { name: 'horns', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },
    {
      id: 'cave_beetle_idle_32',
      description: 'Cave beetle — idle frame (antennae/horns twitch, legs shift).',
      size: 32,
      draw: [
        'ellipse(16, 27, 9, 2, D)',
        'ellipse(16, 18, 9, 7, B)',
        'ellipse(14, 14, 4, 2, L)',
        'line(16, 11, 16, 25, S)',
        'ellipse(16, 9, 5, 3, H)',
        // horns twitch — shifted 1px outward
        'line(13, 7, 10, 3, A)',
        'line(19, 7, 22, 3, A)',
        // eyes
        'pixels(E, 14,9, 18,9)',
        // legs shifted slightly
        'line(8, 15, 4, 12, G)',
        'line(7, 18, 3, 17, G)',
        'line(8, 21, 4, 25, G)',
        'line(24, 15, 28, 12, G)',
        'line(25, 18, 29, 17, G)',
        'line(24, 21, 28, 25, G)',
      ],
      chars: {
        B: { name: 'shell', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        S: { name: 'seam', role: 'belt' },
        H: { name: 'head', role: 'head' },
        A: { name: 'horns', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══ 3. DUNGEON SCORPION ═══
    {
      id: 'dungeon_scorpion_32',
      description: 'Dungeon scorpion — base frame. Pincers forward, curved tail with stinger above.',
      size: 32,
      draw: [
        // ground shadow
        'ellipse(16, 27, 10, 2, D)',
        // body segments
        'ellipse(16, 20, 6, 4, B)',
        'ellipse(15, 18, 3, 2, L)',
        // head
        'ellipse(16, 15, 4, 3, H)',
        // pincers — left
        'line(12, 14, 6, 10, P)',
        'line(6, 10, 4, 11, P)',
        'line(6, 10, 4, 9, P)',
        // pincers — right
        'line(20, 14, 26, 10, P)',
        'line(26, 10, 28, 11, P)',
        'line(26, 10, 28, 9, P)',
        // tail segments curving up and forward
        'ellipse(16, 24, 3, 2, T)',
        'circle(16, 27, 2, T)',
        'line(18, 26, 21, 22, T)',
        'line(21, 22, 22, 17, T)',
        'line(22, 17, 21, 12, T)',
        // stinger
        'pixels(S, 21,11, 21,10, 20,9)',
        // eyes
        'pixels(E, 14,14, 18,14)',
        // 8 legs — 4 per side
        'line(10, 18, 6, 16, G)',
        'line(10, 20, 5, 20, G)',
        'line(10, 22, 6, 25, G)',
        'line(11, 23, 7, 28, G)',
        'line(22, 18, 26, 16, G)',
        'line(22, 20, 27, 20, G)',
        'line(22, 22, 26, 25, G)',
        'line(21, 23, 25, 28, G)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        P: { name: 'pincers', role: 'arm' },
        T: { name: 'tail', role: 'belt' },
        S: { name: 'stinger', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        arm: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        eye: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },
    {
      id: 'dungeon_scorpion_idle_32',
      description: 'Dungeon scorpion — idle frame (tail sways, pincers shift).',
      size: 32,
      draw: [
        'ellipse(16, 27, 10, 2, D)',
        'ellipse(16, 20, 6, 4, B)',
        'ellipse(15, 18, 3, 2, L)',
        'ellipse(16, 15, 4, 3, H)',
        // pincers shifted slightly open
        'line(12, 14, 5, 9, P)',
        'line(5, 9, 3, 10, P)',
        'line(5, 9, 3, 8, P)',
        'line(20, 14, 27, 9, P)',
        'line(27, 9, 29, 10, P)',
        'line(27, 9, 29, 8, P)',
        // tail sways left
        'ellipse(16, 24, 3, 2, T)',
        'circle(15, 27, 2, T)',
        'line(17, 26, 19, 22, T)',
        'line(19, 22, 19, 17, T)',
        'line(19, 17, 18, 12, T)',
        // stinger shifted
        'pixels(S, 18,11, 18,10, 17,9)',
        'pixels(E, 14,14, 18,14)',
        'line(10, 18, 6, 15, G)',
        'line(10, 20, 5, 19, G)',
        'line(10, 22, 6, 26, G)',
        'line(11, 23, 7, 29, G)',
        'line(22, 18, 26, 15, G)',
        'line(22, 20, 27, 19, G)',
        'line(22, 22, 26, 26, G)',
        'line(21, 23, 25, 29, G)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        P: { name: 'pincers', role: 'arm' },
        T: { name: 'tail', role: 'belt' },
        S: { name: 'stinger', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        arm: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        eye: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },

    // ═══ 4. GIANT CENTIPEDE ═══
    {
      id: 'giant_centipede_32',
      description: 'Giant centipede — base frame. Long segmented worm-like body with many tiny legs.',
      size: 32,
      draw: [
        // head segment
        'circle(6, 8, 3, H)',
        'pixels(E, 5,7, 7,7)',
        // antennae
        'line(5, 5, 3, 2, A)',
        'line(7, 5, 9, 2, A)',
        // body segments — curving S-shape across canvas
        'circle(9, 10, 2, B)',
        'circle(12, 12, 2, B)',
        'circle(15, 14, 2, B)',
        'circle(18, 15, 2, B)',
        'circle(21, 16, 2, B)',
        'circle(24, 18, 2, B)',
        'circle(26, 20, 2, B)',
        'circle(27, 23, 2, B)',
        // highlight on top segments
        'pixels(L, 9,9, 12,11, 15,13, 18,14, 21,15, 24,17, 26,19, 27,22)',
        // shadow under segments
        'pixels(D, 9,12, 12,14, 15,16, 18,17, 21,18, 24,20, 26,22, 27,25)',
        // many tiny legs — 2 per segment
        'pixels(G, 7,11, 11,11, 10,13, 14,13, 13,15, 17,15, 16,16, 20,16, 19,17, 23,17, 22,19, 26,19, 24,21, 28,21, 25,24, 29,24)',
        // mandibles
        'pixels(F, 4,9, 8,9)',
      ],
      chars: {
        B: { name: 'segments', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        A: { name: 'antennae', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
        F: { name: 'mandibles', role: 'arm' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        arm: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },
    {
      id: 'giant_centipede_idle_32',
      description: 'Giant centipede — idle frame (body undulates, segments shift).',
      size: 32,
      draw: [
        // head shifts up 1
        'circle(6, 7, 3, H)',
        'pixels(E, 5,6, 7,6)',
        'line(5, 4, 3, 1, A)',
        'line(7, 4, 9, 1, A)',
        // body undulates — alternating segments shift
        'circle(9, 9, 2, B)',
        'circle(12, 11, 2, B)',
        'circle(15, 14, 2, B)',
        'circle(18, 16, 2, B)',
        'circle(21, 17, 2, B)',
        'circle(24, 19, 2, B)',
        'circle(26, 21, 2, B)',
        'circle(27, 24, 2, B)',
        'pixels(L, 9,8, 12,10, 15,13, 18,15, 21,16, 24,18, 26,20, 27,23)',
        'pixels(D, 9,11, 12,13, 15,16, 18,18, 21,19, 24,21, 26,23, 27,26)',
        // legs shift with segments
        'pixels(G, 7,10, 11,10, 10,12, 14,12, 13,15, 17,15, 16,17, 20,17, 19,18, 23,18, 22,20, 26,20, 24,22, 28,22, 25,25, 29,25)',
        'pixels(F, 4,8, 8,8)',
      ],
      chars: {
        B: { name: 'segments', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        H: { name: 'head', role: 'head' },
        A: { name: 'antennae', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
        F: { name: 'mandibles', role: 'arm' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        arm: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },

    // ═══ 5. FIRE ANT ═══
    {
      id: 'fire_ant_32',
      description: 'Fire ant — base frame. Red ant with 3 body segments (head, thorax, abdomen) and 6 legs.',
      size: 32,
      draw: [
        // ground shadow
        'ellipse(16, 27, 8, 2, D)',
        // abdomen (large rear segment)
        'ellipse(20, 20, 5, 4, B)',
        'ellipse(19, 18, 2, 2, L)',
        // thorax (middle segment)
        'ellipse(14, 17, 3, 2, T)',
        // head
        'circle(9, 14, 3, H)',
        // antennae
        'line(8, 11, 6, 7, A)',
        'line(10, 11, 12, 7, A)',
        // mandibles
        'pixels(M, 7,15, 6,16, 11,15, 12,16)',
        // eyes
        'pixels(E, 8,13, 10,13)',
        // 6 legs — 3 per side
        'line(12, 18, 8, 22, G)',
        'line(8, 22, 6, 26, G)',
        'line(14, 19, 11, 24, G)',
        'line(11, 24, 10, 28, G)',
        'line(17, 19, 15, 24, G)',
        'line(15, 24, 14, 28, G)',
        'line(16, 16, 20, 12, G)',
        'line(20, 12, 23, 9, G)',
        'line(22, 18, 26, 22, G)',
        'line(26, 22, 28, 26, G)',
        'line(23, 20, 27, 24, G)',
        'line(27, 24, 28, 28, G)',
      ],
      chars: {
        B: { name: 'abdomen', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        T: { name: 'thorax', role: 'belt' },
        H: { name: 'head', role: 'head' },
        A: { name: 'antennae', role: 'accessory' },
        M: { name: 'mandibles', role: 'arm' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
        head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        arm: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },
    {
      id: 'fire_ant_idle_32',
      description: 'Fire ant — idle frame (antennae twitch, legs shift).',
      size: 32,
      draw: [
        'ellipse(16, 27, 8, 2, D)',
        'ellipse(20, 20, 5, 4, B)',
        'ellipse(19, 18, 2, 2, L)',
        'ellipse(14, 17, 3, 2, T)',
        'circle(9, 14, 3, H)',
        // antennae twitch — different angles
        'line(8, 11, 5, 8, A)',
        'line(10, 11, 13, 8, A)',
        'pixels(M, 7,15, 6,16, 11,15, 12,16)',
        'pixels(E, 8,13, 10,13)',
        // legs shift slightly
        'line(12, 18, 7, 22, G)',
        'line(7, 22, 5, 26, G)',
        'line(14, 19, 10, 24, G)',
        'line(10, 24, 9, 28, G)',
        'line(17, 19, 14, 24, G)',
        'line(14, 24, 13, 28, G)',
        'line(16, 16, 19, 12, G)',
        'line(19, 12, 22, 9, G)',
        'line(22, 18, 27, 22, G)',
        'line(27, 22, 29, 26, G)',
        'line(23, 20, 28, 24, G)',
        'line(28, 24, 29, 28, G)',
      ],
      chars: {
        B: { name: 'abdomen', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        T: { name: 'thorax', role: 'belt' },
        H: { name: 'head', role: 'head' },
        A: { name: 'antennae', role: 'accessory' },
        M: { name: 'mandibles', role: 'arm' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt: { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
        head: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        arm: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },

    // ═══ 6. SCARAB BEETLE ═══
    {
      id: 'scarab_beetle_32',
      description: 'Scarab beetle — base frame. Ornate golden scarab with wing covers and horns.',
      size: 32,
      draw: [
        // ground shadow
        'ellipse(16, 27, 8, 2, D)',
        // wing covers — large oval shell
        'ellipse(16, 18, 8, 7, B)',
        'ellipse(14, 14, 4, 3, L)',
        // wing cover split line
        'line(16, 11, 16, 25, S)',
        // gold filigree on wings
        'pixels(F, 12,16, 13,18, 14,20, 18,16, 19,18, 20,20)',
        'pixels(F, 11,18, 21,18, 12,22, 20,22)',
        // head
        'ellipse(16, 9, 4, 3, H)',
        // horn — central
        'line(16, 6, 16, 2, A)',
        'pixels(A, 15,4, 17,4)',
        // eyes
        'pixels(E, 14,9, 18,9)',
        // 6 legs
        'line(8, 15, 4, 13, G)',
        'line(7, 18, 3, 18, G)',
        'line(8, 22, 4, 25, G)',
        'line(24, 15, 28, 13, G)',
        'line(25, 18, 29, 18, G)',
        'line(24, 22, 28, 25, G)',
      ],
      chars: {
        B: { name: 'wing_covers', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        S: { name: 'seam', role: 'belt' },
        F: { name: 'filigree', role: 'accessory' },
        H: { name: 'head', role: 'head' },
        A: { name: 'horn', role: 'arm' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },
    {
      id: 'scarab_beetle_idle_32',
      description: 'Scarab beetle — idle frame (antennae twitch, filigree shimmer shift).',
      size: 32,
      draw: [
        'ellipse(16, 27, 8, 2, D)',
        'ellipse(16, 18, 8, 7, B)',
        'ellipse(13, 14, 4, 3, L)',
        'line(16, 11, 16, 25, S)',
        // filigree shifted for shimmer effect
        'pixels(F, 13,16, 14,18, 15,20, 19,16, 20,18, 21,20)',
        'pixels(F, 12,18, 22,18, 13,22, 21,22)',
        'ellipse(16, 9, 4, 3, H)',
        // horn same
        'line(16, 6, 16, 2, A)',
        'pixels(A, 15,4, 17,4)',
        'pixels(E, 14,9, 18,9)',
        // legs shift
        'line(8, 15, 4, 12, G)',
        'line(7, 18, 3, 17, G)',
        'line(8, 22, 4, 26, G)',
        'line(24, 15, 28, 12, G)',
        'line(25, 18, 29, 17, G)',
        'line(24, 22, 28, 26, G)',
      ],
      chars: {
        B: { name: 'wing_covers', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        S: { name: 'seam', role: 'belt' },
        F: { name: 'filigree', role: 'accessory' },
        H: { name: 'head', role: 'head' },
        A: { name: 'horn', role: 'arm' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt: { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        leg: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══ 7. CAVE TICK ═══
    {
      id: 'cave_tick_32',
      description: 'Cave tick — base frame. Round bloated tick with short stubby legs.',
      size: 32,
      draw: [
        // ground shadow
        'ellipse(16, 27, 7, 2, D)',
        // bloated round body
        'circle(16, 17, 8, B)',
        'circle(13, 13, 4, L)',
        // dark back markings
        'ellipse(16, 19, 4, 3, M)',
        // tiny head
        'ellipse(16, 8, 3, 2, H)',
        // eyes
        'pixels(E, 15,8, 17,8)',
        // mouthparts
        'pixels(A, 16,10, 15,11, 17,11)',
        // 8 short stubby legs
        'line(9, 14, 6, 12, G)',
        'line(8, 17, 5, 16, G)',
        'line(8, 20, 5, 21, G)',
        'line(9, 23, 6, 25, G)',
        'line(23, 14, 26, 12, G)',
        'line(24, 17, 27, 16, G)',
        'line(24, 20, 27, 21, G)',
        'line(23, 23, 26, 25, G)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        M: { name: 'markings', role: 'belt' },
        H: { name: 'head', role: 'head' },
        A: { name: 'mouthparts', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#757161', highlight: '#8595a1' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        eye: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },
    {
      id: 'cave_tick_idle_32',
      description: 'Cave tick — idle frame (body pulses slightly larger, legs twitch).',
      size: 32,
      draw: [
        'ellipse(16, 28, 8, 2, D)',
        // body slightly larger — bloating pulse
        'circle(16, 17, 9, B)',
        'circle(13, 12, 4, L)',
        'ellipse(16, 19, 5, 3, M)',
        'ellipse(16, 7, 3, 2, H)',
        'pixels(E, 15,7, 17,7)',
        'pixels(A, 16,9, 15,10, 17,10)',
        // legs twitch outward
        'line(8, 14, 5, 11, G)',
        'line(7, 17, 4, 15, G)',
        'line(7, 20, 4, 22, G)',
        'line(8, 23, 5, 26, G)',
        'line(24, 14, 27, 11, G)',
        'line(25, 17, 28, 15, G)',
        'line(25, 20, 28, 22, G)',
        'line(24, 23, 27, 26, G)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        M: { name: 'markings', role: 'belt' },
        H: { name: 'head', role: 'head' },
        A: { name: 'mouthparts', role: 'accessory' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#757161', highlight: '#8595a1' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        eye: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══ 8. DUNGEON WASP ═══
    {
      id: 'dungeon_wasp_32',
      description: 'Dungeon wasp — base frame. Wasp with spread wings, narrow waist, stinger.',
      size: 32,
      draw: [
        // wings — spread wide (drawn first, behind body)
        'ellipse(7, 12, 6, 3, W)',
        'ellipse(25, 12, 6, 3, W)',
        // wing highlight
        'pixels(K, 5,11, 6,11, 7,11, 25,11, 26,11, 27,11)',
        // abdomen with stripes
        'ellipse(16, 22, 5, 4, B)',
        // yellow stripes on abdomen
        'line(12, 21, 20, 21, S)',
        'line(13, 23, 19, 23, S)',
        // narrow waist
        'rect(15, 17, 2, 2, B)',
        // thorax
        'ellipse(16, 14, 4, 3, T)',
        // head
        'circle(16, 9, 3, H)',
        // antennae
        'line(14, 6, 12, 2, A)',
        'line(18, 6, 20, 2, A)',
        // eyes
        'pixels(E, 14,8, 15,8, 17,8, 18,8)',
        // stinger
        'pixels(R, 16,26, 16,27, 16,28)',
        // 6 legs
        'line(13, 16, 10, 20, G)',
        'line(14, 17, 11, 22, G)',
        'line(15, 18, 13, 24, G)',
        'line(19, 16, 22, 20, G)',
        'line(18, 17, 21, 22, G)',
        'line(17, 18, 19, 24, G)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        W: { name: 'wings', role: 'arm' },
        K: { name: 'wing_highlight', role: 'arm', tone: 'highlight' },
        S: { name: 'stripes', role: 'accessory' },
        T: { name: 'thorax', role: 'belt' },
        H: { name: 'head', role: 'head' },
        A: { name: 'antennae', role: 'head', tone: 'shadow' },
        E: { name: 'eyes', role: 'eye' },
        R: { name: 'stinger', role: 'boot' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        arm: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        head: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#8595a1' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        boot: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },
    {
      id: 'dungeon_wasp_idle_32',
      description: 'Dungeon wasp — idle frame (wings flutter up, legs shift).',
      size: 32,
      draw: [
        // wings flutter — angled higher
        'ellipse(7, 10, 6, 3, W)',
        'ellipse(25, 10, 6, 3, W)',
        'pixels(K, 5,9, 6,9, 7,9, 25,9, 26,9, 27,9)',
        'ellipse(16, 22, 5, 4, B)',
        'line(12, 21, 20, 21, S)',
        'line(13, 23, 19, 23, S)',
        'rect(15, 17, 2, 2, B)',
        'ellipse(16, 14, 4, 3, T)',
        'circle(16, 9, 3, H)',
        // antennae shift
        'line(14, 6, 11, 2, A)',
        'line(18, 6, 21, 2, A)',
        'pixels(E, 14,8, 15,8, 17,8, 18,8)',
        'pixels(R, 16,26, 16,27, 16,28)',
        // legs shift
        'line(13, 16, 9, 20, G)',
        'line(14, 17, 10, 22, G)',
        'line(15, 18, 12, 24, G)',
        'line(19, 16, 23, 20, G)',
        'line(18, 17, 22, 22, G)',
        'line(17, 18, 20, 24, G)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        W: { name: 'wings', role: 'arm' },
        K: { name: 'wing_highlight', role: 'arm', tone: 'highlight' },
        S: { name: 'stripes', role: 'accessory' },
        T: { name: 'thorax', role: 'belt' },
        H: { name: 'head', role: 'head' },
        A: { name: 'antennae', role: 'head', tone: 'shadow' },
        E: { name: 'eyes', role: 'eye' },
        R: { name: 'stinger', role: 'boot' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        arm: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        head: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#8595a1' },
        eye: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        boot: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══ 9. SILK SPIDER ═══
    {
      id: 'silk_spider_32',
      description: 'Silk spider — base frame. Smaller spider with web strands around it.',
      size: 32,
      draw: [
        // web strands in background
        'line(0, 0, 16, 14, W)',
        'line(31, 0, 16, 14, W)',
        'line(0, 31, 14, 18, W)',
        'line(31, 31, 18, 18, W)',
        'line(16, 0, 16, 10, W)',
        'line(0, 16, 10, 16, W)',
        'line(31, 16, 22, 16, W)',
        // abdomen
        'ellipse(16, 19, 5, 4, B)',
        'ellipse(14, 17, 2, 2, L)',
        // silk pattern on abdomen
        'pixels(P, 14,20, 16,18, 18,20, 15,21, 17,21)',
        // cephalothorax
        'circle(16, 13, 3, H)',
        'pixels(K, 15,11, 16,11)',
        // eyes — 6 small eyes
        'pixels(E, 14,12, 15,12, 17,12, 18,12, 15,13, 17,13)',
        // fangs
        'pixels(F, 15,16, 17,16)',
        // 8 legs
        'line(13, 14, 8, 10, G)',
        'line(8, 10, 5, 6, G)',
        'line(13, 15, 7, 14, G)',
        'line(7, 14, 4, 17, G)',
        'line(12, 18, 7, 22, G)',
        'line(7, 22, 5, 27, G)',
        'line(13, 20, 9, 25, G)',
        'line(9, 25, 8, 30, G)',
        'line(19, 14, 24, 10, G)',
        'line(24, 10, 27, 6, G)',
        'line(19, 15, 25, 14, G)',
        'line(25, 14, 28, 17, G)',
        'line(20, 18, 25, 22, G)',
        'line(25, 22, 27, 27, G)',
        'line(19, 20, 23, 25, G)',
        'line(23, 25, 24, 30, G)',
      ],
      chars: {
        B: { name: 'abdomen', role: 'body' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        P: { name: 'silk_pattern', role: 'accessory' },
        H: { name: 'cephalothorax', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        F: { name: 'fangs', role: 'arm' },
        G: { name: 'legs', role: 'leg' },
        W: { name: 'web', role: 'belt' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        arm: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
        leg: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },
    {
      id: 'silk_spider_idle_32',
      description: 'Silk spider — idle frame (legs shift, web strands wobble).',
      size: 32,
      draw: [
        // web strands slightly shifted
        'line(1, 0, 16, 14, W)',
        'line(30, 0, 16, 14, W)',
        'line(1, 31, 14, 18, W)',
        'line(30, 31, 18, 18, W)',
        'line(16, 0, 16, 10, W)',
        'line(0, 15, 10, 16, W)',
        'line(31, 15, 22, 16, W)',
        'ellipse(16, 19, 5, 4, B)',
        'ellipse(14, 17, 2, 2, L)',
        'pixels(P, 14,20, 16,18, 18,20, 15,21, 17,21)',
        'circle(16, 13, 3, H)',
        'pixels(K, 15,11, 16,11)',
        'pixels(E, 14,12, 15,12, 17,12, 18,12, 15,13, 17,13)',
        'pixels(F, 15,16, 17,16)',
        // legs shifted
        'line(13, 14, 7, 10, G)',
        'line(7, 10, 4, 6, G)',
        'line(13, 15, 6, 14, G)',
        'line(6, 14, 3, 17, G)',
        'line(12, 18, 6, 22, G)',
        'line(6, 22, 4, 27, G)',
        'line(13, 20, 8, 25, G)',
        'line(8, 25, 7, 30, G)',
        'line(19, 14, 25, 10, G)',
        'line(25, 10, 28, 6, G)',
        'line(19, 15, 26, 14, G)',
        'line(26, 14, 29, 17, G)',
        'line(20, 18, 26, 22, G)',
        'line(26, 22, 28, 27, G)',
        'line(19, 20, 24, 25, G)',
        'line(24, 25, 25, 30, G)',
      ],
      chars: {
        B: { name: 'abdomen', role: 'body' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        P: { name: 'silk_pattern', role: 'accessory' },
        H: { name: 'cephalothorax', role: 'head' },
        K: { name: 'head_highlight', role: 'head', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        F: { name: 'fangs', role: 'arm' },
        G: { name: 'legs', role: 'leg' },
        W: { name: 'web', role: 'belt' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        head: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        arm: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
        leg: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══ 10. STAG BEETLE ═══
    {
      id: 'stag_beetle_32',
      description: 'Stag beetle — base frame. Large beetle with massive mandibles extending forward.',
      size: 32,
      draw: [
        // ground shadow
        'ellipse(16, 28, 8, 2, D)',
        // wing covers — large oval
        'ellipse(16, 20, 8, 7, B)',
        'ellipse(14, 16, 4, 3, L)',
        // shell seam
        'line(16, 13, 16, 27, S)',
        // head plate
        'ellipse(16, 11, 5, 3, H)',
        // massive mandibles — left
        'line(12, 10, 8, 6, M)',
        'line(8, 6, 6, 4, M)',
        'line(6, 4, 5, 2, M)',
        'pixels(M, 7,5, 6,3)',
        // massive mandibles — right
        'line(20, 10, 24, 6, M)',
        'line(24, 6, 26, 4, M)',
        'line(26, 4, 27, 2, M)',
        'pixels(M, 25,5, 26,3)',
        // eyes
        'pixels(E, 14,10, 18,10)',
        // 6 legs
        'line(9, 17, 4, 14, G)',
        'line(8, 20, 3, 20, G)',
        'line(9, 23, 4, 27, G)',
        'line(23, 17, 28, 14, G)',
        'line(24, 20, 29, 20, G)',
        'line(23, 23, 28, 27, G)',
      ],
      chars: {
        B: { name: 'wing_covers', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        S: { name: 'seam', role: 'belt' },
        H: { name: 'head', role: 'head' },
        M: { name: 'mandibles', role: 'arm' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        arm: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },
    {
      id: 'stag_beetle_idle_32',
      description: 'Stag beetle — idle frame (mandibles open wider, legs shift).',
      size: 32,
      draw: [
        'ellipse(16, 28, 8, 2, D)',
        'ellipse(16, 20, 8, 7, B)',
        'ellipse(14, 16, 4, 3, L)',
        'line(16, 13, 16, 27, S)',
        'ellipse(16, 11, 5, 3, H)',
        // mandibles open wider
        'line(12, 10, 7, 6, M)',
        'line(7, 6, 4, 4, M)',
        'line(4, 4, 3, 2, M)',
        'pixels(M, 5,5, 4,3)',
        'line(20, 10, 25, 6, M)',
        'line(25, 6, 28, 4, M)',
        'line(28, 4, 29, 2, M)',
        'pixels(M, 27,5, 28,3)',
        'pixels(E, 14,10, 18,10)',
        // legs shift
        'line(9, 17, 4, 13, G)',
        'line(8, 20, 3, 19, G)',
        'line(9, 23, 4, 28, G)',
        'line(23, 17, 28, 13, G)',
        'line(24, 20, 29, 19, G)',
        'line(23, 23, 28, 28, G)',
      ],
      chars: {
        B: { name: 'wing_covers', role: 'body' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
        L: { name: 'highlight', role: 'body', tone: 'highlight' },
        S: { name: 'seam', role: 'belt' },
        H: { name: 'head', role: 'head' },
        M: { name: 'mandibles', role: 'arm' },
        E: { name: 'eyes', role: 'eye' },
        G: { name: 'legs', role: 'leg' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        belt: { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        arm: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },

  ],
};

export default batch;
