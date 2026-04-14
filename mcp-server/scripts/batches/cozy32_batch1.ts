/**
 * Cozy 32x32 Batch 1 — Coffee & Tea Shop
 *
 * 20 templates for a warm, inviting cafe scene.
 * Neo-SNES style (Chrono Trigger + Stardew Valley quality).
 * DB16 palette only, colored selout, 3-4+ roles per template.
 *
 * COORDINATE FORMAT:
 * - spans(CHAR, ROW:COL_START-COL_END, ...)
 * - pixels(CHAR, COL,ROW, COL,ROW, ...) — X first, Y second!
 *
 * Design rules:
 * - Clean silhouette, no isolated pixels
 * - 2-3 tones per material (shadow/base/highlight)
 * - Shadow clusters: 2-4px groups, never single dots
 * - Light from top-left
 * - Centered in 32x32 canvas
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'cozy_32',
  exportNames: { templates: 'COZY32_BATCH1_TEMPLATES', schemes: 'COZY32_BATCH1_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════
    //  1. ESPRESSO CUP — small ceramic cup on saucer
    // ═══════════════════════════════════════════════════════════
    {
      id: 'espresso_cup_32',
      description: 'Small ceramic espresso cup on a matching saucer with dark liquid inside.',
      size: 32,
      draw: [
        // Saucer (wide, flat, rows 22-25)
        'spans(S, 22:8-23, 23:7-24, 24:7-24, 25:9-22)',
        // Saucer shadow: right + bottom
        'spans(s, 22:21-23, 23:22-24, 24:22-24, 25:20-22)',
        // Saucer highlight: top-left
        'pixels(J, 8,22, 9,22, 7,23, 8,23)',

        // Cup body (rows 12-21, centered)
        'spans(B, 12:12-19, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:11-20, 19:12-19, 20:12-19, 21:13-18)',
        // Cup shadow: right side
        'spans(b, 12:18-19, 13:19-20, 14:19-20, 15:19-20, 16:19-20, 17:19-20, 18:19-20, 19:18-19, 20:18-19, 21:17-18)',
        // Cup highlight: left edge
        'pixels(H, 11,13, 11,14, 11,15, 11,16, 11,17, 11,18, 12,12)',

        // Cup rim (lighter ring, row 12)
        'spans(H, 12:12-19)',

        // Handle (right side, rows 14-18)
        'spans(B, 14:21-23, 15:22-24, 16:22-24, 17:22-24, 18:21-23)',
        // Handle shadow
        'pixels(b, 23,15, 24,16, 24,17, 23,18)',
        // Handle highlight
        'pixels(H, 21,14, 22,15)',

        // Liquid (dark coffee surface, rows 13-14)
        'spans(L, 13:12-18, 14:12-18)',
        // Liquid shadow
        'pixels(l, 17,13, 18,13, 17,14, 18,14)',
      ],
      chars: {
        B: { name: 'cup_base', role: 'body' },
        b: { name: 'cup_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'cup_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'saucer_base', role: 'head' },
        s: { name: 'saucer_shadow', role: 'head', tone: 'shadow' },
        J: { name: 'saucer_highlight', role: 'head', tone: 'highlight' },
        L: { name: 'liquid_base', role: 'accessory' },
        l: { name: 'liquid_shadow', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  2. LATTE MUG — wide mug with foam art
    // ═══════════════════════════════════════════════════════════
    {
      id: 'latte_mug_32',
      description: 'Wide latte mug with creamy foam art on top and a sturdy handle.',
      size: 32,
      draw: [
        // Mug body (wide, rows 10-25)
        'spans(B, 10:9-22, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23, 21:8-23, 22:8-23, 23:9-22, 24:9-22, 25:10-21)',
        // Mug shadow: right side + bottom
        'spans(b, 10:20-22, 11:21-23, 12:22-23, 13:22-23, 14:22-23, 15:22-23, 16:22-23, 17:22-23, 18:22-23, 19:22-23, 20:22-23, 21:22-23, 22:22-23, 23:21-22, 24:21-22)',
        'spans(b, 25:10-21)',
        // Mug highlight: left edge + rim
        'pixels(H, 8,11, 8,12, 8,13, 8,14, 8,15, 8,16, 8,17, 8,18, 8,19, 8,20, 8,21, 8,22)',

        // Mug rim (lighter, row 10)
        'spans(H, 10:9-22)',

        // Handle (right side, rows 13-21)
        'spans(B, 13:24-26, 14:25-27, 15:25-27, 16:25-27, 17:25-27, 18:25-27, 19:25-27, 20:25-27, 21:24-26)',
        // Handle shadow
        'pixels(b, 26,14, 27,15, 27,16, 27,17, 27,18, 27,19, 27,20, 26,21)',
        // Handle highlight
        'pixels(H, 24,13, 25,14)',

        // Foam (creamy top, rows 11-14)
        'spans(F, 11:9-21, 12:9-21, 13:9-21, 14:9-21)',
        // Foam art swirl (latte art pattern)
        'spans(f, 12:13-17, 13:11-12, 13:18-19)',
        // Foam highlight
        'pixels(K, 9,11, 10,11, 9,12)',

        // Liquid visible below foam (rows 15-16)
        'spans(L, 15:9-21, 16:9-21)',
        // Liquid shadow
        'pixels(l, 20,15, 21,15, 20,16, 21,16)',
      ],
      chars: {
        B: { name: 'mug_base', role: 'body' },
        b: { name: 'mug_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'mug_highlight', role: 'body', tone: 'highlight' },
        F: { name: 'foam_base', role: 'head' },
        f: { name: 'foam_art', role: 'head', tone: 'shadow' },
        K: { name: 'foam_highlight', role: 'head', tone: 'highlight' },
        L: { name: 'liquid_base', role: 'accessory' },
        l: { name: 'liquid_shadow', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  3. TEA CUP — delicate cup with decorative rim
    // ═══════════════════════════════════════════════════════════
    {
      id: 'tea_cup_32',
      description: 'Delicate tea cup with gold decorative rim on a saucer with amber tea.',
      size: 32,
      draw: [
        // Saucer (rows 23-26)
        'spans(S, 23:7-24, 24:6-25, 25:6-25, 26:8-23)',
        // Saucer shadow
        'spans(s, 23:22-24, 24:23-25, 25:23-25, 26:21-23)',
        // Saucer highlight
        'pixels(J, 7,23, 8,23, 6,24, 7,24)',

        // Cup body (elegant taper, rows 11-22)
        'spans(B, 11:11-20, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:11-20, 20:11-20, 21:12-19, 22:13-18)',
        // Cup shadow: right side
        'spans(b, 11:19-20, 12:20-21, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21, 19:19-20, 20:19-20, 21:18-19, 22:17-18)',
        // Cup highlight: left edge
        'pixels(H, 10,12, 10,13, 10,14, 10,15, 10,16, 10,17, 10,18, 11,11)',

        // Decorative rim (gold accent band, rows 11-12)
        'spans(G, 11:11-20, 12:10-21)',
        // Rim shadow
        'pixels(g, 19,11, 20,11, 20,12, 21,12)',
        // Rim highlight
        'pixels(K, 11,11, 12,11, 10,12)',

        // Handle (right side, delicate, rows 14-19)
        'spans(B, 14:22-23, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:22-23)',
        // Handle shadow
        'pixels(b, 24,16, 24,17, 24,18, 23,19)',

        // Tea liquid (amber, rows 13-15)
        'spans(L, 13:11-19, 14:11-19, 15:11-19)',
        // Liquid shadow
        'pixels(l, 18,13, 19,13, 18,14, 19,14)',

        // Saucer inner rim detail
        'spans(S, 23:9-22)',
      ],
      chars: {
        B: { name: 'cup_base', role: 'body' },
        b: { name: 'cup_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'cup_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'rim_decor', role: 'accessory' },
        g: { name: 'rim_shadow', role: 'accessory', tone: 'shadow' },
        K: { name: 'rim_highlight', role: 'accessory', tone: 'highlight' },
        S: { name: 'saucer_base', role: 'head' },
        s: { name: 'saucer_shadow', role: 'head', tone: 'shadow' },
        J: { name: 'saucer_highlight', role: 'head', tone: 'highlight' },
        L: { name: 'tea_base', role: 'belt' },
        l: { name: 'tea_shadow', role: 'belt', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  4. COFFEE POT — classic drip coffee pot
    // ═══════════════════════════════════════════════════════════
    {
      id: 'coffee_pot_32',
      description: 'Classic glass drip coffee pot with black handle and lid, coffee visible.',
      size: 32,
      draw: [
        // Lid (rows 3-5)
        'spans(D, 3:14-17, 4:13-18, 5:13-18)',
        // Lid knob
        'spans(D, 2:15-16)',
        // Lid shadow
        'pixels(d, 17,3, 18,4, 18,5)',

        // Glass neck (rows 6-9)
        'spans(G, 6:13-18, 7:13-18, 8:12-19, 9:12-19)',
        // Glass shine on neck
        'pixels(E, 13,6, 13,7, 12,8)',

        // Glass body (rows 10-24)
        'spans(G, 10:11-20, 11:10-21, 12:10-21, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:10-21, 21:10-21, 22:11-20, 23:11-20, 24:12-19)',
        // Glass shadow: right side
        'spans(g, 10:19-20, 11:20-21, 12:20-21, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:20-21, 21:20-21, 22:19-20, 23:19-20, 24:18-19)',
        // Glass highlight: left edge
        'pixels(E, 10,10, 9,13, 9,14, 9,15, 9,16, 9,17, 9,18, 9,19, 10,20)',

        // Coffee liquid (inside body, rows 14-23)
        'spans(L, 14:10-20, 15:10-20, 16:10-20, 17:10-20, 18:10-20, 19:10-20, 20:11-20, 21:11-20, 22:12-19, 23:12-19, 24:13-18)',
        // Liquid shadow
        'spans(l, 21:18-20, 22:17-19, 23:17-19, 24:16-18)',
        // Liquid highlight
        'pixels(K, 10,14, 10,15, 10,16)',

        // Handle (left side, rows 10-20)
        'spans(D, 10:6-8, 11:5-7, 12:5-7, 13:5-7, 14:5-7, 15:5-7, 16:5-7, 17:5-7, 18:5-7, 19:5-7, 20:6-8)',
        // Handle shadow
        'pixels(d, 5,12, 5,13, 5,14, 5,15, 5,16, 5,17, 5,18, 5,19)',

        // Base plate (row 25-26)
        'spans(D, 25:10-21, 26:11-20)',
        // Base shadow
        'pixels(d, 20,25, 21,25, 19,26, 20,26)',
      ],
      chars: {
        G: { name: 'glass_base', role: 'body' },
        g: { name: 'glass_shadow', role: 'body', tone: 'shadow' },
        E: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        D: { name: 'plastic_base', role: 'head' },
        d: { name: 'plastic_shadow', role: 'head', tone: 'shadow' },
        L: { name: 'coffee_base', role: 'accessory' },
        l: { name: 'coffee_shadow', role: 'accessory', tone: 'shadow' },
        K: { name: 'coffee_highlight', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  5. FRENCH PRESS — glass body with metal frame
    // ═══════════════════════════════════════════════════════════
    {
      id: 'french_press_32',
      description: 'Glass french press with metal frame, plunger knob, and coffee inside.',
      size: 32,
      draw: [
        // Plunger knob (rows 2-4)
        'spans(M, 2:15-16, 3:14-17, 4:14-17)',
        // Plunger rod (rows 5-10)
        'spans(M, 5:15-16, 6:15-16, 7:15-16, 8:15-16, 9:15-16, 10:15-16)',
        // Plunger shadow
        'pixels(m, 16,5, 16,6, 16,7, 16,8, 16,9)',

        // Metal frame top ring (rows 11-12)
        'spans(M, 11:10-21, 12:10-21)',
        // Frame shadow
        'pixels(m, 20,11, 21,11, 20,12, 21,12)',
        // Frame highlight
        'pixels(J, 10,11, 11,11, 10,12)',

        // Glass body (rows 13-24)
        'spans(G, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:11-20, 19:11-20, 20:11-20, 21:11-20, 22:11-20, 23:11-20, 24:11-20)',
        // Glass shadow: right side
        'spans(g, 13:19-20, 14:19-20, 15:19-20, 16:19-20, 17:19-20, 18:19-20, 19:19-20, 20:19-20, 21:19-20, 22:19-20, 23:19-20, 24:19-20)',
        // Glass shine: left edge
        'pixels(E, 11,13, 11,14, 11,15, 11,16, 11,17, 11,18, 11,19, 11,20, 11,21, 11,22, 11,23, 11,24)',

        // Coffee liquid (rows 16-24)
        'spans(L, 16:12-18, 17:12-18, 18:12-18, 19:12-18, 20:12-18, 21:12-18, 22:12-18, 23:12-18, 24:12-18)',
        // Liquid shadow
        'pixels(l, 17,22, 18,22, 17,23, 18,23, 17,24, 18,24)',

        // Metal frame bottom ring (rows 25-26)
        'spans(M, 25:10-21, 26:10-21)',
        // Bottom shadow
        'pixels(m, 20,25, 21,25, 20,26, 21,26)',
        // Bottom highlight
        'pixels(J, 10,25, 11,25)',

        // Handle (right side, rows 15-22)
        'spans(M, 15:21-23, 16:22-24, 17:22-24, 18:22-24, 19:22-24, 20:22-24, 21:22-24, 22:21-23)',
        // Handle shadow
        'pixels(m, 23,16, 24,17, 24,18, 24,19, 24,20, 24,21, 23,22)',

        // Base (rows 27-28)
        'spans(M, 27:9-22, 28:10-21)',
        // Base shadow
        'pixels(m, 21,27, 22,27, 20,28, 21,28)',
      ],
      chars: {
        M: { name: 'metal_base', role: 'head' },
        m: { name: 'metal_shadow', role: 'head', tone: 'shadow' },
        J: { name: 'metal_highlight', role: 'head', tone: 'highlight' },
        G: { name: 'glass_base', role: 'body' },
        g: { name: 'glass_shadow', role: 'body', tone: 'shadow' },
        E: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        L: { name: 'coffee_base', role: 'accessory' },
        l: { name: 'coffee_shadow', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  6. POUR OVER — ceramic cone on wooden stand
    // ═══════════════════════════════════════════════════════════
    {
      id: 'pour_over_32',
      description: 'Pour-over coffee dripper: ceramic cone with filter on a wooden stand.',
      size: 32,
      draw: [
        // Ceramic cone (rows 4-14, V-shape widening downward then narrowing)
        'spans(C, 4:13-18, 5:12-19, 6:12-19, 7:11-20, 8:11-20, 9:11-20, 10:12-19, 11:12-19, 12:13-18, 13:13-18, 14:14-17)',
        // Cone shadow: right side
        'spans(c, 4:17-18, 5:18-19, 6:18-19, 7:19-20, 8:19-20, 9:19-20, 10:18-19, 11:18-19, 12:17-18, 13:17-18, 14:16-17)',
        // Cone highlight: top-left
        'pixels(H, 13,4, 12,5, 12,6, 11,7, 11,8)',

        // Filter paper (visible inside, rows 5-12)
        'spans(F, 5:13-18, 6:13-18, 7:12-19, 8:12-19, 9:12-19, 10:13-18, 11:13-18, 12:14-17)',
        // Filter shadow
        'pixels(f, 17,5, 18,6, 18,7, 19,8, 19,9)',

        // Drip point (bottom of cone, row 15-16)
        'spans(L, 15:15-16, 16:15-16)',

        // Wooden stand legs (two A-frame legs, rows 15-27)
        'spans(W, 15:10-12, 15:19-21, 16:10-12, 16:19-21, 17:9-11, 17:20-22, 18:9-11, 18:20-22, 19:8-10, 19:21-23, 20:8-10, 20:21-23, 21:7-9, 21:22-24, 22:7-9, 22:22-24, 23:7-9, 23:22-24)',
        // Stand shadow
        'pixels(w, 11,17, 22,17, 11,18, 22,18, 10,19, 23,19, 10,20, 23,20, 9,21, 24,21, 9,22, 24,22, 9,23, 24,23)',

        // Cross bar (rows 19-20)
        'spans(W, 19:10-21, 20:10-21)',
        // Cross bar shadow
        'pixels(w, 20,19, 21,19, 20,20, 21,20)',

        // Stand base (row 24-25)
        'spans(W, 24:6-25, 25:6-25)',
        // Base shadow
        'pixels(w, 24,24, 25,24, 24,25, 25,25)',

        // Glass carafe below (rows 21-27)
        'spans(G, 21:12-19, 22:11-20, 23:11-20, 24:11-20, 25:11-20, 26:12-19, 27:13-18)',
        // Carafe shadow
        'spans(g, 21:18-19, 22:19-20, 23:19-20, 24:19-20, 25:19-20, 26:18-19, 27:17-18)',
        // Carafe shine
        'pixels(E, 11,22, 11,23, 11,24)',
      ],
      chars: {
        C: { name: 'cone_base', role: 'body' },
        c: { name: 'cone_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'cone_highlight', role: 'body', tone: 'highlight' },
        F: { name: 'filter_base', role: 'eye' },
        f: { name: 'filter_shadow', role: 'eye', tone: 'shadow' },
        W: { name: 'stand_base', role: 'leg' },
        w: { name: 'stand_shadow', role: 'leg', tone: 'shadow' },
        G: { name: 'carafe_base', role: 'accessory' },
        g: { name: 'carafe_shadow', role: 'accessory', tone: 'shadow' },
        E: { name: 'carafe_shine', role: 'accessory', tone: 'highlight' },
        L: { name: 'drip', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  7. TEA KETTLE — stovetop kettle
    // ═══════════════════════════════════════════════════════════
    {
      id: 'tea_kettle_32',
      description: 'Stovetop tea kettle with curved spout, arched handle, and round lid.',
      size: 32,
      draw: [
        // Handle arch (rows 3-10)
        'spans(D, 3:13-18, 4:12-13, 4:18-19, 5:11-12, 5:19-20, 6:11-12, 6:19-20, 7:11-12, 7:19-20, 8:11-12, 8:19-20)',
        // Handle shadow
        'pixels(d, 18,3, 19,4, 20,5, 20,6, 20,7, 20,8)',

        // Lid (rows 9-11)
        'spans(M, 9:12-19, 10:11-20, 11:11-20)',
        // Lid knob
        'spans(M, 8:15-16)',
        // Lid shadow
        'pixels(m, 19,9, 20,10, 20,11)',
        // Lid highlight
        'pixels(J, 12,9, 11,10)',

        // Kettle body (rows 12-23)
        'spans(B, 12:10-21, 13:9-22, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:9-22, 21:9-22, 22:10-21, 23:11-20)',
        // Body shadow: right + bottom
        'spans(b, 12:20-21, 13:21-22, 14:22-23, 15:22-23, 16:22-23, 17:22-23, 18:22-23, 19:22-23, 20:21-22, 21:21-22, 22:20-21)',
        'spans(b, 23:11-20)',
        // Body highlight: left edge
        'pixels(H, 10,12, 9,13, 8,14, 8,15, 8,16, 8,17, 8,18, 8,19, 9,20)',

        // Spout (left side, rows 12-16)
        'spans(B, 12:5-8, 13:4-7, 14:4-6, 15:4-6, 16:5-7)',
        // Spout shadow
        'pixels(b, 5,16, 6,16, 7,16)',
        // Spout opening
        'pixels(m, 5,12, 6,12, 7,12, 4,13, 5,13)',

        // Base ring (rows 24-25)
        'spans(M, 24:10-21, 25:11-20)',
        // Base shadow
        'pixels(m, 20,24, 21,24, 19,25, 20,25)',
        // Base highlight
        'pixels(J, 10,24, 11,24)',
      ],
      chars: {
        B: { name: 'kettle_base', role: 'body' },
        b: { name: 'kettle_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'kettle_highlight', role: 'body', tone: 'highlight' },
        M: { name: 'metal_accent', role: 'head' },
        m: { name: 'metal_shadow', role: 'head', tone: 'shadow' },
        J: { name: 'metal_highlight', role: 'head', tone: 'highlight' },
        D: { name: 'handle_base', role: 'accessory' },
        d: { name: 'handle_shadow', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  8. COFFEE GRINDER — manual grinder with crank
    // ═══════════════════════════════════════════════════════════
    {
      id: 'coffee_grinder_32',
      description: 'Manual coffee grinder with wooden body, metal hopper, and crank handle.',
      size: 32,
      draw: [
        // Crank handle (rows 2-6)
        'spans(M, 2:19-23, 3:22-24, 4:22-24, 5:22-24, 6:19-21)',
        // Crank knob
        'spans(W, 2:24-26, 3:25-26)',
        // Crank shadow
        'pixels(m, 23,3, 24,4, 24,5)',

        // Metal hopper (funnel top, rows 5-10)
        'spans(M, 5:11-18, 6:10-21, 7:10-21, 8:11-20, 9:12-19, 10:13-18)',
        // Hopper shadow
        'spans(m, 5:17-18, 6:19-21, 7:19-21, 8:19-20, 9:18-19, 10:17-18)',
        // Hopper highlight
        'pixels(J, 11,5, 10,6, 10,7, 11,8)',

        // Wooden body (box, rows 11-25)
        'spans(B, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:9-22, 22:9-22, 23:9-22, 24:9-22, 25:9-22)',
        // Body shadow: right + bottom
        'spans(b, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:21-22, 21:21-22, 22:21-22, 23:21-22, 24:21-22)',
        'spans(b, 25:9-22)',
        // Body highlight: left edge
        'pixels(H, 9,11, 9,12, 9,13, 9,14, 9,15, 9,16, 9,17, 9,18, 9,19, 9,20, 9,21)',

        // Drawer (front, rows 20-24)
        'spans(D, 20:11-20, 21:11-20, 22:11-20, 23:11-20, 24:11-20)',
        // Drawer shadow
        'spans(d, 24:11-20)',
        // Drawer knob (brass)
        'spans(K, 22:15-16)',
        // Knob highlight
        'pixels(J, 15,22)',
      ],
      chars: {
        B: { name: 'wood_base', role: 'body' },
        b: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        M: { name: 'metal_base', role: 'head' },
        m: { name: 'metal_shadow', role: 'head', tone: 'shadow' },
        J: { name: 'metal_highlight', role: 'head', tone: 'highlight' },
        D: { name: 'drawer_base', role: 'accessory' },
        d: { name: 'drawer_shadow', role: 'accessory', tone: 'shadow' },
        K: { name: 'knob', role: 'belt' },
        W: { name: 'crank_knob', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  9. COFFEE BEANS BAG — burlap sack with beans
    // ═══════════════════════════════════════════════════════════
    {
      id: 'coffee_beans_bag_32',
      description: 'Burlap sack of coffee beans with a rope tie and label tag.',
      size: 32,
      draw: [
        // Rope tie (rows 5-7, gathered top)
        'spans(R, 5:13-18, 6:12-13, 6:18-19, 7:11-12, 7:19-20)',
        // Rope shadow
        'pixels(r, 18,5, 19,6, 20,7)',

        // Bag body top (folded fabric, rows 8-10)
        'spans(B, 8:10-21, 9:9-22, 10:9-22)',
        // Bag body (rows 11-26)
        'spans(B, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24, 20:7-24, 21:7-24, 22:8-23, 23:8-23, 24:9-22, 25:9-22, 26:10-21)',
        // Bag shadow: right side + bottom
        'spans(b, 8:20-21, 9:21-22, 10:21-22, 11:22-23, 12:22-23, 13:22-23, 14:22-23, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:23-24, 20:23-24, 21:23-24, 22:22-23, 23:22-23, 24:21-22, 25:21-22)',
        'spans(b, 26:10-21)',
        // Bag highlight: top-left
        'pixels(H, 10,8, 9,9, 8,11, 8,12, 8,13, 7,15, 7,16, 7,17)',

        // Coffee beans (visible at top, rows 8-10)
        'spans(C, 8:12-19, 9:11-20, 10:11-20)',
        // Bean shadow
        'pixels(c, 18,8, 19,8, 19,9, 20,9)',

        // Label tag (rows 16-22)
        'spans(L, 16:11-20, 17:11-20, 18:11-20, 19:11-20, 20:11-20, 21:11-20, 22:11-20)',
        // Label shadow
        'spans(l, 22:11-20)',
        // Label text lines
        'spans(l, 18:13-18, 20:13-18)',
      ],
      chars: {
        B: { name: 'burlap_base', role: 'body' },
        b: { name: 'burlap_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'burlap_highlight', role: 'body', tone: 'highlight' },
        R: { name: 'rope_base', role: 'belt' },
        r: { name: 'rope_shadow', role: 'belt', tone: 'shadow' },
        C: { name: 'beans_base', role: 'accessory' },
        c: { name: 'beans_shadow', role: 'accessory', tone: 'shadow' },
        L: { name: 'label_base', role: 'head' },
        l: { name: 'label_shadow', role: 'head', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  10. MATCHA BOWL — traditional chawan
    // ═══════════════════════════════════════════════════════════
    {
      id: 'matcha_bowl_32',
      description: 'Traditional matcha tea bowl (chawan) with vibrant green matcha inside.',
      size: 32,
      draw: [
        // Bowl rim (top ellipse, rows 10-12)
        'spans(B, 10:9-22, 11:8-23, 12:8-23)',
        // Rim highlight: top-left
        'pixels(H, 9,10, 10,10, 8,11, 9,11)',
        // Rim shadow
        'pixels(b, 21,10, 22,10, 22,11, 23,11)',

        // Matcha liquid surface (rows 12-14)
        'spans(M, 12:9-22, 13:9-22, 14:10-21)',
        // Matcha foam swirl
        'spans(m, 13:13-18)',
        // Matcha highlight
        'pixels(K, 10,12, 11,12, 10,13)',

        // Bowl body (curving inward, rows 15-24)
        'spans(B, 15:8-23, 16:8-23, 17:9-22, 18:9-22, 19:9-22, 20:10-21, 21:10-21, 22:11-20, 23:12-19, 24:13-18)',
        // Body shadow: right side + bottom
        'spans(b, 15:22-23, 16:22-23, 17:21-22, 18:21-22, 19:21-22, 20:20-21, 21:20-21, 22:19-20, 23:18-19, 24:17-18)',
        'spans(b, 23:12-14, 24:13-15)',
        // Body highlight: left edge
        'pixels(H, 8,15, 8,16, 9,17, 9,18, 9,19, 10,20, 10,21)',

        // Base foot (row 25-26)
        'spans(B, 25:14-17, 26:14-17)',
        // Base shadow
        'pixels(b, 17,25, 16,26, 17,26)',
      ],
      chars: {
        B: { name: 'bowl_base', role: 'body' },
        b: { name: 'bowl_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'bowl_highlight', role: 'body', tone: 'highlight' },
        M: { name: 'matcha_base', role: 'accessory' },
        m: { name: 'matcha_foam', role: 'accessory', tone: 'shadow' },
        K: { name: 'matcha_highlight', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  11. SUGAR BOWL — ceramic with lid
    // ═══════════════════════════════════════════════════════════
    {
      id: 'sugar_bowl_32',
      description: 'Ceramic sugar bowl with a rounded lid, knob handle, and sugar visible.',
      size: 32,
      draw: [
        // Lid knob (rows 5-7)
        'spans(B, 5:15-16, 6:14-17, 7:14-17)',
        // Knob highlight
        'pixels(H, 14,6, 14,5)',
        // Knob shadow
        'pixels(b, 17,7, 16,7)',

        // Lid dome (rows 8-12)
        'spans(B, 8:12-19, 9:11-20, 10:10-21, 11:10-21, 12:10-21)',
        // Lid shadow
        'spans(b, 8:18-19, 9:19-20, 10:20-21, 11:20-21, 12:20-21)',
        // Lid highlight
        'pixels(H, 12,8, 11,9, 10,10, 10,11)',

        // Bowl rim (rows 13-14)
        'spans(R, 13:9-22, 14:9-22)',
        // Rim shadow
        'pixels(r, 21,13, 22,13, 21,14, 22,14)',
        // Rim highlight
        'pixels(K, 9,13, 10,13, 9,14)',

        // Sugar inside (rows 13-14 visible gap)
        'spans(S, 13:11-20, 14:11-20)',

        // Bowl body (rows 15-23)
        'spans(B, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:10-21, 20:10-21, 21:11-20, 22:12-19, 23:13-18)',
        // Body shadow
        'spans(b, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:20-21, 20:20-21, 21:19-20, 22:18-19, 23:17-18)',
        // Body highlight
        'pixels(H, 9,15, 9,16, 9,17, 9,18, 10,19, 10,20)',

        // Base (row 24-25)
        'spans(B, 24:13-18, 25:14-17)',
        'pixels(b, 18,24, 17,25)',
      ],
      chars: {
        B: { name: 'ceramic_base', role: 'body' },
        b: { name: 'ceramic_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'ceramic_highlight', role: 'body', tone: 'highlight' },
        R: { name: 'rim_base', role: 'head' },
        r: { name: 'rim_shadow', role: 'head', tone: 'shadow' },
        K: { name: 'rim_highlight', role: 'head', tone: 'highlight' },
        S: { name: 'sugar_base', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  12. CREAM PITCHER — small milk pitcher
    // ═══════════════════════════════════════════════════════════
    {
      id: 'cream_pitcher_32',
      description: 'Small ceramic cream pitcher with a pouring spout and handle.',
      size: 32,
      draw: [
        // Spout (top left, rows 8-11)
        'spans(B, 8:9-11, 9:8-10, 10:8-10, 11:9-11)',
        // Spout highlight
        'pixels(H, 8,8, 9,8)',

        // Pitcher rim (rows 8-10)
        'spans(B, 8:12-19, 9:11-20, 10:11-20)',
        // Rim highlight
        'pixels(H, 12,8, 11,9)',
        // Rim shadow
        'pixels(b, 18,8, 19,8, 19,9, 20,10)',

        // Cream visible inside (rows 10-12)
        'spans(C, 10:12-19, 11:12-19, 12:12-19)',
        // Cream highlight
        'pixels(K, 12,10, 13,10)',

        // Body (rows 11-23)
        'spans(B, 11:11-20, 12:11-20, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:11-20, 21:11-20, 22:12-19, 23:13-18)',
        // Body shadow: right
        'spans(b, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21, 19:20-21, 20:19-20, 21:19-20, 22:18-19, 23:17-18)',
        // Body highlight: left
        'pixels(H, 10,13, 10,14, 10,15, 10,16, 10,17, 10,18, 10,19)',

        // Handle (right side, rows 13-20)
        'spans(B, 13:22-23, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:23-24, 20:22-23)',
        // Handle shadow
        'pixels(b, 24,15, 24,16, 24,17, 24,18, 24,19, 23,20)',

        // Base (row 24-25)
        'spans(B, 24:13-18, 25:14-17)',
        'pixels(b, 18,24, 17,25)',
      ],
      chars: {
        B: { name: 'pitcher_base', role: 'body' },
        b: { name: 'pitcher_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'pitcher_highlight', role: 'body', tone: 'highlight' },
        C: { name: 'cream_base', role: 'accessory' },
        K: { name: 'cream_highlight', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  13. BISCOTTI PLATE — plate with biscotti cookies
    // ═══════════════════════════════════════════════════════════
    {
      id: 'biscotti_plate_32',
      description: 'Ceramic plate with golden biscotti cookies and scattered crumbs.',
      size: 32,
      draw: [
        // Plate (wide oval, rows 16-26)
        'spans(P, 16:8-23, 17:6-25, 18:5-26, 19:5-26, 20:5-26, 21:5-26, 22:5-26, 23:6-25, 24:7-24, 25:8-23, 26:10-21)',
        // Plate shadow: right + bottom
        'spans(p, 16:21-23, 17:23-25, 18:24-26, 19:25-26, 20:25-26, 21:25-26, 22:25-26, 23:24-25, 24:23-24, 25:22-23)',
        'spans(p, 26:10-21)',
        // Plate highlight: top-left
        'pixels(J, 8,16, 9,16, 6,17, 7,17, 5,18, 6,18)',

        // Plate inner ring
        'spans(p, 18:8-9, 18:22-23, 19:7-8, 22:7-8, 23:8-9)',

        // Biscotti 1 (angled, rows 17-22)
        'spans(B, 17:10-17, 18:10-17, 19:10-17, 20:10-17)',
        // Biscotti shadow
        'spans(b, 20:10-17)',
        // Biscotti highlight
        'pixels(H, 10,17, 11,17, 12,17)',
        // Biscotti texture (almond chips)
        'pixels(A, 12,18, 15,18, 13,19, 16,19)',

        // Biscotti 2 (slightly overlapping, rows 19-23)
        'spans(B, 20:13-20, 21:13-20, 22:13-20, 23:13-20)',
        // Biscotti 2 shadow
        'spans(b, 23:13-20)',
        // Biscotti 2 highlight
        'pixels(H, 13,20, 14,20)',
        // Biscotti 2 texture
        'pixels(A, 15,21, 18,21, 16,22)',

        // Crumbs
        'pixels(b, 10,22, 22,19, 21,22, 8,21)',
      ],
      chars: {
        P: { name: 'plate_base', role: 'head' },
        p: { name: 'plate_shadow', role: 'head', tone: 'shadow' },
        J: { name: 'plate_highlight', role: 'head', tone: 'highlight' },
        B: { name: 'biscotti_base', role: 'body' },
        b: { name: 'biscotti_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'biscotti_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'almond_chips', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  14. CAKE SLICE — layered cake on plate
    // ═══════════════════════════════════════════════════════════
    {
      id: 'cake_slice_32',
      description: 'Slice of layered cake with frosting on a small plate.',
      size: 32,
      draw: [
        // Plate (rows 24-28)
        'spans(P, 24:6-25, 25:5-26, 26:5-26, 27:6-25, 28:8-23)',
        // Plate shadow
        'spans(p, 24:23-25, 25:24-26, 26:24-26, 27:24-25, 28:21-23)',
        // Plate highlight
        'pixels(J, 6,24, 7,24, 5,25, 6,25)',

        // Cake body — triangular slice, front face (rows 9-23)
        'spans(C, 9:14-17, 10:13-18, 11:12-19, 12:11-20, 13:11-20, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:10-21, 21:10-21, 22:10-21, 23:10-21)',
        // Cake shadow: right side
        'spans(c, 9:17-17, 10:18-18, 11:19-19, 12:19-20, 13:19-20, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21, 19:20-21, 20:20-21, 21:20-21, 22:20-21, 23:20-21)',
        // Cake highlight: top-left
        'pixels(K, 14,9, 13,10, 12,11, 11,12, 10,14, 10,15)',

        // Frosting top (rows 8-9)
        'spans(F, 8:13-18, 9:14-17)',
        // Frosting between layers (rows 15, 19)
        'spans(F, 15:11-19, 19:11-19)',
        // Frosting side drip (left visible)
        'pixels(F, 10,16, 10,17, 10,20, 10,21)',
        // Frosting shadow
        'pixels(f, 17,8, 18,8)',
        // Frosting highlight
        'pixels(K, 13,8, 14,8)',

        // Cake layers visible (alternate tone, rows 12-14, 16-18, 20-22)
        'spans(L, 16:11-19, 17:11-19, 18:11-19)',
        // Layer shadow
        'pixels(l, 19,16, 19,17, 19,18)',

        // Cherry on top
        'spans(R, 6:15-16, 7:14-17)',
        // Cherry highlight
        'pixels(K, 14,6)',
        // Cherry stem
        'pixels(c, 15,5)',
      ],
      chars: {
        C: { name: 'cake_base', role: 'body' },
        c: { name: 'cake_shadow', role: 'body', tone: 'shadow' },
        K: { name: 'cake_highlight', role: 'body', tone: 'highlight' },
        F: { name: 'frosting_base', role: 'head' },
        f: { name: 'frosting_shadow', role: 'head', tone: 'shadow' },
        L: { name: 'layer_accent', role: 'accessory' },
        l: { name: 'layer_shadow', role: 'accessory', tone: 'shadow' },
        P: { name: 'plate_base', role: 'leg' },
        p: { name: 'plate_shadow', role: 'leg', tone: 'shadow' },
        J: { name: 'plate_highlight', role: 'leg', tone: 'highlight' },
        R: { name: 'cherry', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        leg:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  15. CINNAMON ROLL — spiral with glaze
    // ═══════════════════════════════════════════════════════════
    {
      id: 'cinnamon_roll_32',
      description: 'Spiral cinnamon roll with icing glaze drizzle, warm and golden.',
      size: 32,
      draw: [
        // Roll body (round, rows 8-24)
        'spans(B, 8:12-19, 9:10-21, 10:9-22, 11:8-23, 12:8-23, 13:8-23, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:8-23, 20:8-23, 21:8-23, 22:9-22, 23:10-21, 24:12-19)',
        // Roll shadow: right + bottom
        'spans(b, 8:18-19, 9:20-21, 10:21-22, 11:22-23, 12:22-23, 13:22-23, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:22-23, 20:22-23, 21:22-23, 22:21-22, 23:20-21)',
        'spans(b, 24:12-19)',
        // Roll highlight: top-left
        'pixels(H, 12,8, 10,9, 9,10, 8,11, 8,12, 7,14, 7,15)',

        // Spiral swirl (cinnamon filling, spiral pattern)
        'spans(S, 11:12-14, 11:18-20, 12:11-12, 12:20-21, 13:11-12, 13:15-17, 13:20-21, 14:14-15, 14:17-18, 15:14-15, 15:17-18, 16:14-15, 16:17-18, 17:14-15, 17:17-18, 18:11-12, 18:15-17, 18:20-21, 19:11-12, 19:20-21, 20:12-14, 20:18-20, 21:14-18)',
        // Spiral shadow
        'pixels(s, 20,11, 21,12, 14,18, 18,13, 20,13)',

        // Icing glaze drizzle (scattered on top)
        'spans(G, 10:12-14, 10:17-19, 12:14-18, 15:10-12, 15:19-22, 17:10-12, 20:14-18)',
        // Glaze highlight
        'pixels(K, 12,10, 14,12, 10,15, 14,20)',
      ],
      chars: {
        B: { name: 'pastry_base', role: 'body' },
        b: { name: 'pastry_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'pastry_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'cinnamon_base', role: 'accessory' },
        s: { name: 'cinnamon_shadow', role: 'accessory', tone: 'shadow' },
        G: { name: 'glaze_base', role: 'head' },
        K: { name: 'glaze_highlight', role: 'head', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  16. CROISSANT — flaky golden pastry
    // ═══════════════════════════════════════════════════════════
    {
      id: 'croissant_32',
      description: 'Flaky golden croissant with visible layered pastry texture.',
      size: 32,
      draw: [
        // Croissant body — crescent shape (rows 10-23)
        // Left horn
        'spans(B, 10:6-9, 11:5-10, 12:5-11, 13:6-12)',
        // Center body (thick)
        'spans(B, 13:12-19, 14:8-22, 15:8-23, 16:8-23, 17:9-23, 18:9-23, 19:10-22, 20:11-22, 21:12-21, 22:13-20, 23:14-19)',
        // Right horn
        'spans(B, 10:22-25, 11:21-26, 12:20-26, 13:19-25)',

        // Body shadow: bottom + right of each section
        'spans(b, 10:9-9, 11:10-10, 12:10-11, 13:11-12)',
        'spans(b, 10:25-25, 11:25-26, 12:25-26, 13:24-25)',
        'spans(b, 19:21-22, 20:21-22, 21:20-21, 22:19-20, 23:18-19)',
        'spans(b, 18:22-23, 17:22-23, 16:22-23, 15:22-23)',

        // Body highlight: top surfaces
        'pixels(H, 6,10, 7,10, 5,11, 22,10, 23,10, 21,11, 8,14, 9,14, 8,15, 10,17)',

        // Layer lines (horizontal, suggest flaky pastry)
        'spans(L, 15:10-21, 17:11-21, 19:12-20, 21:14-19)',
        // Layer shadow
        'pixels(l, 20,15, 21,15, 20,17, 21,17)',

        // Glaze highlight (shiny top)
        'spans(G, 14:10-20, 16:10-21)',
        // Glaze highlight pixels
        'pixels(K, 10,14, 11,14, 10,16, 11,16)',
      ],
      chars: {
        B: { name: 'pastry_base', role: 'body' },
        b: { name: 'pastry_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'pastry_highlight', role: 'body', tone: 'highlight' },
        L: { name: 'layer_lines', role: 'accessory' },
        l: { name: 'layer_shadow', role: 'accessory', tone: 'shadow' },
        G: { name: 'glaze_base', role: 'head' },
        K: { name: 'glaze_highlight', role: 'head', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  17. MENU CHALKBOARD — small standing chalkboard
    // ═══════════════════════════════════════════════════════════
    {
      id: 'menu_chalkboard_32',
      description: 'Small standing cafe chalkboard with wooden frame and chalk menu text.',
      size: 32,
      draw: [
        // Wooden frame outer (rows 3-22)
        'spans(W, 3:7-24, 4:7-24, 5:7-24, 6:7-24, 7:7-24, 8:7-24, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24, 20:7-24, 21:7-24, 22:7-24)',
        // Frame shadow: right + bottom
        'spans(w, 3:23-24, 4:23-24, 5:23-24, 6:23-24, 7:23-24, 8:23-24, 9:23-24, 10:23-24, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:23-24, 20:23-24, 21:23-24)',
        'spans(w, 22:7-24)',
        // Frame highlight: top-left
        'pixels(H, 7,3, 8,3, 9,3, 7,4, 7,5, 7,6)',

        // Chalkboard surface (dark, rows 5-20)
        'spans(D, 5:9-22, 6:9-22, 7:9-22, 8:9-22, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22)',
        // Board shadow
        'spans(d, 5:21-22, 6:21-22, 7:21-22, 8:21-22, 9:21-22, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:21-22)',

        // Chalk text lines (menu items)
        'spans(T, 6:11-19, 8:11-17, 10:11-20, 12:11-16, 14:11-18, 16:11-19, 18:11-15)',
        // Chalk title (bigger)
        'spans(T, 6:11-19)',

        // Easel legs (A-frame, rows 23-29)
        'spans(W, 23:9-11, 23:20-22, 24:8-10, 24:21-23, 25:7-9, 25:22-24, 26:6-8, 26:23-25, 27:5-7, 27:24-26, 28:4-6, 28:25-27, 29:3-5, 29:26-28)',
        // Easel shadow
        'pixels(w, 11,23, 22,23, 10,24, 23,24, 9,25, 24,25, 8,26, 25,26, 7,27, 26,27, 6,28, 27,28, 5,29, 28,29)',

        // Cross bar (row 26)
        'spans(W, 26:9-22)',
        'pixels(w, 21,26, 22,26)',
      ],
      chars: {
        W: { name: 'wood_base', role: 'body' },
        w: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        D: { name: 'board_base', role: 'head' },
        d: { name: 'board_shadow', role: 'head', tone: 'shadow' },
        T: { name: 'chalk_text', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#140c1c', base: '#30346d', highlight: '#4e4a4e' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  18. COFFEE MACHINE — espresso machine
    // ═══════════════════════════════════════════════════════════
    {
      id: 'coffee_machine_32',
      description: 'Espresso machine with group head, drip tray, and control buttons.',
      size: 32,
      draw: [
        // Machine top (rows 3-5)
        'spans(M, 3:8-23, 4:8-23, 5:8-23)',
        // Top shadow
        'spans(m, 3:22-23, 4:22-23, 5:22-23)',
        // Top highlight
        'pixels(J, 8,3, 9,3, 8,4)',

        // Machine body (rows 6-22)
        'spans(M, 6:7-24, 7:7-24, 8:7-24, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24, 20:7-24, 21:7-24, 22:7-24)',
        // Body shadow: right side
        'spans(m, 6:23-24, 7:23-24, 8:23-24, 9:23-24, 10:23-24, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:23-24, 20:23-24, 21:23-24, 22:23-24)',
        // Body highlight: left edge
        'pixels(J, 7,6, 7,7, 7,8, 7,9, 7,10, 7,11)',

        // Group head (metal fixture, rows 14-17)
        'spans(G, 14:11-20, 15:11-20, 16:12-19, 17:13-18)',
        // Group head shadow
        'pixels(g, 19,14, 20,14, 19,15, 20,15, 18,16, 19,16)',
        // Group head highlight
        'pixels(K, 11,14, 12,14, 11,15)',

        // Portafilter handle (rows 17-19)
        'spans(G, 17:14-17, 18:13-14, 18:17-18, 19:12-13)',
        'pixels(g, 17,17, 18,18)',

        // Control buttons (rows 7-9)
        'spans(B, 7:10-12, 8:10-12)',
        'spans(B, 7:14-16, 8:14-16)',
        'spans(B, 7:18-20, 8:18-20)',
        // Button highlights
        'pixels(K, 10,7, 14,7, 18,7)',

        // Pressure gauge (circle, rows 10-12)
        'spans(G, 10:13-18, 11:13-18, 12:13-18)',
        // Gauge needle
        'pixels(m, 15,10, 16,11)',
        // Gauge highlight
        'pixels(K, 13,10, 13,11)',

        // Drip tray (rows 23-25)
        'spans(D, 23:6-25, 24:6-25, 25:6-25)',
        // Tray shadow
        'spans(d, 25:6-25)',
        // Tray grid pattern
        'spans(d, 23:8-8, 23:10-10, 23:12-12, 23:14-14, 23:16-16, 23:18-18, 23:20-20, 23:22-22)',

        // Steam wand (right side, rows 14-20)
        'spans(G, 14:22-22, 15:22-22, 16:22-22, 17:22-22, 18:22-22, 19:22-22, 20:21-22)',
        'pixels(g, 22,20)',
      ],
      chars: {
        M: { name: 'machine_base', role: 'body' },
        m: { name: 'machine_shadow', role: 'body', tone: 'shadow' },
        J: { name: 'machine_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'metal_fixtures', role: 'head' },
        g: { name: 'metal_shadow', role: 'head', tone: 'shadow' },
        K: { name: 'metal_highlight', role: 'head', tone: 'highlight' },
        B: { name: 'buttons', role: 'accessory' },
        D: { name: 'tray_base', role: 'belt' },
        d: { name: 'tray_shadow', role: 'belt', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  19. TIP JAR — glass jar with coins
    // ═══════════════════════════════════════════════════════════
    {
      id: 'tip_jar_32',
      description: 'Glass tip jar with coins inside and a paper label reading TIPS.',
      size: 32,
      draw: [
        // Lid (metal, rows 4-6)
        'spans(M, 4:12-19, 5:11-20, 6:11-20)',
        // Lid shadow
        'pixels(m, 19,4, 20,5, 20,6)',
        // Lid highlight
        'pixels(J, 12,4, 11,5)',

        // Jar glass body (rows 7-25)
        'spans(G, 7:11-20, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:10-21, 21:10-21, 22:10-21, 23:10-21, 24:11-20, 25:11-20)',
        // Glass shadow: right side
        'spans(g, 7:19-20, 8:20-21, 9:20-21, 10:20-21, 11:20-21, 12:20-21, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21, 19:20-21, 20:20-21, 21:20-21, 22:20-21, 23:20-21, 24:19-20, 25:19-20)',
        // Glass shine: left edge
        'pixels(E, 10,8, 10,9, 10,10, 10,11, 10,12, 10,13, 10,14, 10,15, 10,16, 10,17)',

        // Coins (stacked inside, rows 18-24)
        'spans(C, 18:12-19, 19:12-19, 20:11-19, 21:11-19, 22:11-19, 23:11-19, 24:12-19)',
        // Coin shadow
        'spans(c, 22:17-19, 23:17-19, 24:17-19)',
        // Coin highlight
        'pixels(K, 12,18, 13,18, 12,19, 11,20, 11,21)',

        // Label (paper, rows 10-16)
        'spans(L, 10:12-19, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19, 16:12-19)',
        // Label shadow
        'spans(l, 16:12-19)',
        // Label text "TIPS"
        'spans(l, 12:14-17, 14:14-17)',

        // Base (row 26-27)
        'spans(G, 26:11-20, 27:12-19)',
        'pixels(g, 19,26, 20,26, 18,27, 19,27)',
      ],
      chars: {
        G: { name: 'glass_base', role: 'body' },
        g: { name: 'glass_shadow', role: 'body', tone: 'shadow' },
        E: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        M: { name: 'lid_base', role: 'head' },
        m: { name: 'lid_shadow', role: 'head', tone: 'shadow' },
        J: { name: 'lid_highlight', role: 'head', tone: 'highlight' },
        C: { name: 'coins_base', role: 'accessory' },
        c: { name: 'coins_shadow', role: 'accessory', tone: 'shadow' },
        K: { name: 'coins_highlight', role: 'accessory', tone: 'highlight' },
        L: { name: 'label_base', role: 'belt' },
        l: { name: 'label_shadow', role: 'belt', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  20. TAKEOUT CUP — paper cup with sleeve and lid
    // ═══════════════════════════════════════════════════════════
    {
      id: 'takeout_cup_32',
      description: 'Paper takeout coffee cup with cardboard sleeve, plastic lid, and logo area.',
      size: 32,
      draw: [
        // Plastic lid (rows 3-6)
        'spans(P, 3:13-18, 4:12-19, 5:12-19, 6:12-19)',
        // Lid drinking hole
        'spans(p, 4:14-16)',
        // Lid shadow
        'pixels(p, 18,4, 19,5, 19,6)',
        // Lid highlight
        'pixels(K, 13,3, 12,4, 12,5)',

        // Lid rim (row 6-7)
        'spans(P, 6:11-20, 7:11-20)',
        // Rim shadow
        'pixels(p, 19,6, 20,6, 19,7, 20,7)',

        // Cup body (tapered, rows 8-27)
        'spans(B, 8:11-20, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:11-20, 19:12-19, 20:12-19, 21:12-19, 22:12-19, 23:12-19, 24:12-19, 25:13-18, 26:13-18, 27:13-18)',
        // Cup shadow: right side
        'spans(b, 8:19-20, 9:19-20, 10:19-20, 11:19-20, 12:19-20, 13:19-20, 14:19-20, 15:19-20, 16:19-20, 17:19-20, 18:19-20, 19:18-19, 20:18-19, 21:18-19, 22:18-19, 23:18-19, 24:18-19, 25:17-18, 26:17-18, 27:17-18)',
        // Cup highlight: left edge
        'pixels(H, 11,8, 11,9, 11,10, 11,11, 11,12, 11,13, 11,14, 11,15, 12,19, 12,20)',

        // Cardboard sleeve (rows 14-22)
        'spans(S, 14:12-19, 15:12-19, 16:12-19, 17:12-19, 18:12-19, 19:13-18, 20:13-18, 21:13-18, 22:13-18)',
        // Sleeve shadow
        'spans(s, 14:18-19, 15:18-19, 16:18-19, 17:18-19, 18:18-19, 19:17-18, 20:17-18, 21:17-18, 22:17-18)',
        // Sleeve highlight
        'pixels(W, 12,14, 12,15, 12,16, 13,19)',

        // Logo area (on cup, rows 9-13)
        'spans(L, 9:13-18, 10:13-18, 11:13-18, 12:13-18, 13:13-18)',
        // Logo inner circle
        'spans(l, 10:14-17, 11:14-17, 12:14-17)',

        // Cup base (rows 28-29)
        'spans(B, 28:14-17, 29:14-17)',
        'pixels(b, 17,28, 16,29, 17,29)',
      ],
      chars: {
        B: { name: 'cup_base', role: 'body' },
        b: { name: 'cup_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'cup_highlight', role: 'body', tone: 'highlight' },
        P: { name: 'lid_base', role: 'head' },
        p: { name: 'lid_shadow', role: 'head', tone: 'shadow' },
        K: { name: 'lid_highlight', role: 'head', tone: 'highlight' },
        S: { name: 'sleeve_base', role: 'accessory' },
        s: { name: 'sleeve_shadow', role: 'accessory', tone: 'shadow' },
        W: { name: 'sleeve_highlight', role: 'accessory', tone: 'highlight' },
        L: { name: 'logo_base', role: 'belt' },
        l: { name: 'logo_inner', role: 'belt', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

  ],
};

export default batch;
