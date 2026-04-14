/**
 * DSL Demo batch — shows both 16x16 and 32x32 templates using DSL draw commands.
 * This is a TEST file to validate the DSL pipeline works.
 *
 * Token comparison (approximate):
 *   Classic grid 16x16:  ~700 tokens per template
 *   DSL 16x16:           ~200 tokens per template  (70% savings)
 *   Classic grid 32x32:  ~1400 tokens per template
 *   DSL 32x32:           ~300 tokens per template  (78% savings)
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'items',
  exportNames: { templates: 'DSL_DEMO_TEMPLATES', schemes: 'DSL_DEMO_COLOR_SCHEMES' },
  templates: [

    // ─── 1. ROUND SHIELD (16x16 DSL) ─────────────────────────────
    // Compare: ~200 tokens (DSL) vs ~700 tokens (grid)
    {
      id: 'round_shield_16',
      description: 'Small round wooden shield with iron rim and center boss.',
      size: 16,
      draw: [
        'circle(7,8,6,B)',           // shield face
        'ring(7,8,7,5,R)',           // iron rim
        'circle(7,8,2,S)',           // center boss
        'pixel(7,7,E)',              // boss highlight
        'outline(R,O)',              // dark outline around rim
      ],
      chars: {
        B: { name: 'shield_face', role: 'body' },
        R: { name: 'iron_rim', role: 'head' },
        S: { name: 'center_boss', role: 'accessory' },
        E: { name: 'boss_highlight', role: 'eye' },
        O: { name: 'outline', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── 2. ROUND SHIELD (16x16 CLASSIC GRID — same sprite) ──────
    // Compare: ~700 tokens for the same visual result
    {
      id: 'round_shield_classic_16',
      description: 'Same round shield using classic grid format for comparison.',
      grid: [
        '................',
        '....OOOOOOO.....',
        '...ORRRRRRRO....',
        '..ORRBBBBBRROO..',
        '..ORBBBBBBBRO...',
        '.ORBBBBBBBBBRO..',
        '.ORBBBBBBBBBROO.',
        '.ORBBBSSSBBBROO.',
        '.ORBBBSESBBBRO..',
        '.ORBBBSSSBBBROO.',
        '.ORBBBBBBBBBROO.',
        '.ORBBBBBBBBBRO..',
        '..ORBBBBBBBRO...',
        '..ORRBBBBBRROO..',
        '...ORRRRRRRO....',
        '....OOOOOOO.....',
      ],
      chars: {
        B: { name: 'shield_face', role: 'body' },
        R: { name: 'iron_rim', role: 'head' },
        S: { name: 'center_boss', role: 'accessory' },
        E: { name: 'boss_highlight', role: 'eye' },
        O: { name: 'outline', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── 3. POTION BOTTLE (32x32 DSL) ────────────────────────────
    // A 32x32 sprite that would cost ~1400 tokens as grid, only ~300 as DSL
    {
      id: 'health_potion_32',
      description: 'Glass health potion bottle with red liquid and cork stopper.',
      size: 32,
      draw: [
        // Cork stopper
        'rect(13,2,6,3,K)',
        // Bottle neck
        'rect(14,5,4,4,G)',
        // Bottle body (glass)
        'ellipse(16,18,8,10,G)',
        // Liquid inside (slightly smaller)
        'ellipse(16,20,6,7,L)',
        // Highlight on glass
        'line(10,14,10,22,E)',
        'pixel(11,13,E)',
        'pixel(11,23,E)',
        // Label band
        'rect(10,16,12,3,A)',
        // Base shadow
        'line(10,28,22,28,S)',
      ],
      chars: {
        K: { name: 'cork', role: 'head' },
        G: { name: 'glass', role: 'body' },
        L: { name: 'red_liquid', role: 'accessory' },
        E: { name: 'glass_shine', role: 'eye' },
        A: { name: 'label', role: 'belt' },
        S: { name: 'base_shadow', role: 'boot' },
      },
      colors: {
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        boot:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ─── 4. WARRIOR v3 (32x32 DSL — refined SNES anatomy) ──────
    // Chrono Trigger / Sea of Stars proportions.
    // 3-head ratio. Organic taper. Clipped corners. Detail pixels.
    {
      id: 'warrior_32',
      description: '32x32 warrior in Neo-SNES style with organic proportions.',
      size: 32,
      draw: [
        // ── HAIR (spiky top, extends 2px beyond head, personality silhouette) ──
        'spans(R, 1:14-17, 2:13-18, 3:12-19, 4:12-13, 4:18-19)',
        'pixels(R, 13,1, 18,1, 15,0, 16,0)',  // spiky tufts

        // ── HEAD / SKIN (tapered: wide at row5-7, narrowing at jaw) ──
        'spans(H, 4:14-17, 5:12-19, 6:12-19, 7:12-19, 8:13-18, 9:14-17)',

        // ── FACE (overwrite inner head area for distinct skin tone) ──
        'spans(F, 5:13-18, 6:13-18, 7:14-17, 8:14-17)',

        // ── EYES (2x2 blocks with pupil highlight — key to expression) ──
        'pixels(E, 14,5, 15,5, 14,6, 15,6, 17,5, 18,5, 17,6, 18,6)',
        // Eye highlight (1px bright dot in each eye)
        'pixels(W, 14,5, 17,5)',

        // ── NECK (narrow bridge, visible anatomy) ──
        'spans(F, 10:14-17)',

        // ── SHOULDERS (wide, rounded corners — not a rectangle) ──
        'spans(B, 11:11-20, 12:10-21, 13:9-22)',
        // Clip corners for roundness
        'clear(B)',
        'spans(B, 11:12-19, 12:10-21, 13:9-22)',

        // ── ARMS (2px wide, extend from shoulder line, elbow bend hint) ──
        // Left arm
        'spans(A, 12:7-8, 13:7-8, 14:7-8, 15:8-9, 16:8-9, 17:8-9)',
        // Right arm (holding sword)
        'spans(A, 12:23-24, 13:23-24, 14:23-24, 15:22-23, 16:22-23, 17:22-23)',
        // Hands
        'spans(D, 18:7-9, 18:22-24)',

        // ── TORSO (gradual taper from shoulders to waist) ──
        'spans(B, 14:10-21, 15:10-21, 16:11-20, 17:11-20, 18:12-19)',

        // ── ARMOR DETAIL (chest plate accent line + collar) ──
        'spans(G, 11:14-17)',  // collar
        'pixels(G, 14,14, 17,14, 14,16, 17,16)',  // armor rivets

        // ── BELT (leather with buckle) ──
        'spans(T, 19:11-20, 20:11-20)',
        'pixels(W, 15,19, 16,19)',  // buckle shine

        // ── LEGS (thighs wider, calves narrower, natural taper) ──
        'spans(L, 21:12-15, 21:17-20, 22:12-15, 22:17-20)',
        'spans(L, 23:12-15, 23:17-20, 24:12-14, 24:18-20)',
        'spans(L, 25:13-14, 25:18-19, 26:13-14, 26:18-19)',

        // ── BOOTS (wider than calves, slight forward point, grounding) ──
        'spans(O, 27:12-16, 27:17-21, 28:11-16, 28:17-22, 29:11-16, 29:17-22)',

        // ── SWORD (held in right hand, blade, guard, grip visible) ──
        // Blade (tapered: wide at tip, narrow at guard)
        'spans(S, 1:24-26, 2:24-26, 3:24-26, 4:25-26, 5:25-26, 6:25-26, 7:25-26, 8:25-25, 9:25-25, 10:25-25, 11:25-25, 12:25-25, 13:25-25, 14:25-25, 15:25-25, 16:25-25)',
        // Guard (cross-piece)
        'spans(T, 17:23-27)',
        // Blade highlight (x=24..25, y=2..6)
        'pixels(W, 24,2, 24,4, 25,6)',
      ],
      chars: {
        R: { name: 'hair', role: 'hair' },
        H: { name: 'head_skin', role: 'head' },
        F: { name: 'face', role: 'face' },
        E: { name: 'eyes', role: 'eye' },
        W: { name: 'highlight_dots', role: 'eye' },
        B: { name: 'armor_chest', role: 'body' },
        A: { name: 'arms', role: 'arm' },
        D: { name: 'hands', role: 'hand' },
        G: { name: 'armor_detail', role: 'accessory' },
        T: { name: 'belt_guard', role: 'belt' },
        L: { name: 'legs', role: 'leg' },
        O: { name: 'boots', role: 'boot' },
        S: { name: 'sword_blade', role: 'accessory' },
      },
      colors: {
        hair:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#deeed6', highlight: '#deeed6' },
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        leg:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
