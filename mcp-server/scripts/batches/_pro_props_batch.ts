/**
 * PRO PROPS — Clean 32x32 prop/asset templates.
 *
 * GOLDEN RULE: Each template is ONLY the item. No sparks, no effects,
 * no floating decorations. Just the object, well-made.
 *
 * COORDINATE FORMAT:
 * - spans(CHAR, ROW:COL_START-COL_END, ...)
 * - pixels(CHAR, COL,ROW, COL,ROW, ...) ← X first, Y second!
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
  category: 'pro_props',
  exportNames: { templates: 'PRO_PROPS_TEMPLATES', schemes: 'PRO_PROPS_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════
    //  BROADSWORD — just blade + guard + grip + pommel
    // ═══════════════════════════════════════════════════════════
    {
      id: 'clean_sword_32',
      description: '32x32 broadsword — clean, no effects.',
      size: 32,
      draw: [
        // Blade tip (row 2, cols 15-16)
        'pixels(B, 15,2, 16,2)',
        // Blade body (4px wide, rows 3-13, cols 14-17)
        'spans(B, 3:14-17, 4:14-17, 5:14-17, 6:14-17, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17)',
        // Blade narrows to tang (2px, rows 14-16, cols 15-16)
        'spans(B, 14:15-16, 15:15-16, 16:15-16)',
        // Blade highlight: left edge col 14 (polished steel catch)
        'pixels(H, 14,3, 14,4, 14,5, 14,6, 14,7, 14,8, 14,9, 14,10, 14,11, 14,12, 14,13)',
        // Blade fuller (center groove, col 15)
        'pixels(b, 15,4, 15,5, 15,6, 15,7, 15,8, 15,9, 15,10, 15,11, 15,12)',
        // Blade shadow: right edge col 17
        'pixels(b, 17,3, 17,4, 17,5, 17,6, 17,7, 17,8, 17,9, 17,10, 17,11, 17,12, 17,13)',

        // Cross-guard (row 17: cols 11-20, row 18: cols 12-19)
        'spans(G, 17:11-20, 18:12-19)',
        // Guard shadow: right edge
        'pixels(g, 19,17, 20,17, 18,18, 19,18)',
        // Guard highlight: left edge
        'pixels(J, 11,17, 12,17, 12,18)',

        // Grip (2px wide cols 15-16, rows 19-24)
        'spans(L, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16)',
        // Wrap highlights (diagonal, left edge col 15)
        'pixels(W, 15,19, 15,21, 15,23)',
        // Grip shadow (right edge col 16)
        'pixels(l, 16,19, 16,20, 16,21, 16,22, 16,23, 16,24)',

        // Pommel (row 25: cols 14-17, row 26: cols 15-16)
        'spans(G, 25:14-17, 26:15-16)',
        // Pommel shadow: right edge
        'pixels(g, 17,25, 16,26)',
        // Pommel highlight: left edge
        'pixels(J, 14,25)',
      ],
      chars: {
        B: { name: 'blade_base', role: 'body' },
        b: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'blade_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'guard_base', role: 'accessory' },
        g: { name: 'guard_shadow', role: 'accessory', tone: 'shadow' },
        J: { name: 'guard_highlight', role: 'accessory', tone: 'highlight' },
        L: { name: 'grip_base', role: 'leg' },
        l: { name: 'grip_shadow', role: 'leg', tone: 'shadow' },
        W: { name: 'grip_highlight', role: 'leg', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  BATTLE AXE — single-headed, just axe head + shaft
    // ═══════════════════════════════════════════════════════════
    {
      id: 'clean_axe_32',
      description: '32x32 battle axe — clean single-headed.',
      size: 32,
      draw: [
        // Axe head (crescent blade, rows 4-11, left side)
        'spans(B, 4:10-15, 5:8-15, 6:7-15, 7:6-15, 8:6-15, 9:7-15, 10:8-15, 11:10-15)',
        // Head highlight: left cutting edge
        'pixels(H, 10,4, 8,5, 7,6, 6,7, 6,8, 7,9, 8,10, 10,11)',
        // Head shadow: right side cols 14-15
        'spans(b, 4:14-15, 5:14-15, 6:14-15, 7:14-15, 8:14-15, 9:14-15, 10:14-15, 11:14-15)',
        // Head shadow: bottom curve
        'pixels(b, 10,10, 9,9)',

        // Shaft (2px wide cols 15-16, full length rows 2-26)
        'spans(S, 2:15-16, 3:15-16, 4:15-16, 5:15-16, 6:15-16, 7:15-16, 8:15-16, 9:15-16, 10:15-16, 11:15-16)',
        'spans(S, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16)',
        'spans(S, 21:15-16, 22:15-16, 23:15-16, 24:15-16, 25:15-16, 26:15-16)',
        // Shaft shadow: right edge col 16 (continuous)
        'pixels(s, 16,4, 16,5, 16,6, 16,7, 16,8, 16,9, 16,10, 16,13, 16,14, 16,15, 16,16, 16,17, 16,18, 16,19, 16,20, 16,21, 16,22, 16,23, 16,24, 16,25, 16,26)',

        // Shaft binding (wrapping near head, cols 14-17)
        'spans(L, 3:14-17, 11:14-17, 12:14-17)',
        // Binding shadow: right edge col 17
        'pixels(l, 17,3, 17,11, 17,12)',

        // Shaft end cap (row 27, cols 14-17)
        'spans(L, 27:14-17)',
        // End cap shadow: right edge
        'pixels(l, 17,27)',
      ],
      chars: {
        B: { name: 'blade_base', role: 'body' },
        b: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'blade_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'shaft_base', role: 'leg' },
        s: { name: 'shaft_shadow', role: 'leg', tone: 'shadow' },
        L: { name: 'binding_base', role: 'accessory' },
        l: { name: 'binding_shadow', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  ROUND SHIELD — wooden face + iron rim + iron boss
    // ═══════════════════════════════════════════════════════════
    {
      id: 'clean_shield_32',
      description: '32x32 round shield — wood + iron rim.',
      size: 32,
      draw: [
        // Shield body (round, using elliptical curve)
        'spans(W, 5:13-18, 6:11-20, 7:10-21, 8:9-22, 9:8-23, 10:7-24, 11:7-24, 12:6-25, 13:6-25, 14:6-25, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:7-24, 20:7-24, 21:8-23, 22:9-22, 23:10-21, 24:11-20, 25:13-18)',
        // Shadow: right side + bottom (follows curve)
        'spans(w, 8:21-22, 9:22-23, 10:23-24, 11:23-24, 12:24-25, 13:24-25, 14:24-25, 15:24-25, 16:24-25, 17:24-25, 18:24-25, 19:23-24, 20:23-24, 21:22-23, 22:21-22, 23:20-21, 24:19-20)',
        'spans(w, 23:10-12, 24:11-13, 25:13-15)',
        // Highlight: top-left (follows curve)
        'pixels(H, 13,5, 14,5, 11,6, 12,6, 10,7, 9,8, 8,9, 7,10, 7,11, 6,12, 6,13)',

        // Iron rim (1px border, follows curve)
        'spans(I, 4:13-18, 5:11-12, 5:19-20, 6:10-10, 6:21-21, 7:9-9, 7:22-22, 8:8-8, 8:23-23, 9:7-7, 9:24-24, 10:6-6, 10:25-25, 11:6-6, 11:25-25)',
        'spans(I, 19:6-6, 19:25-25, 20:6-6, 20:25-25, 21:7-7, 21:24-24, 22:8-8, 22:23-23, 23:9-9, 23:22-22, 24:10-10, 24:21-21, 25:11-12, 25:19-20, 26:13-18)',
        // Rim shadow: right + bottom edge (col,row format!)
        'pixels(i, 19,5, 20,5, 21,6, 22,7, 23,8, 24,9, 25,10, 25,11, 25,19, 25,20, 24,21, 23,22, 22,23, 21,24, 19,25, 20,25, 16,26, 17,26, 18,26)',
        // Rim highlight: top-left edge
        'pixels(J, 13,4, 14,4, 11,5, 10,6, 9,7, 8,8, 7,9, 6,10, 6,11)',

        // Center boss (iron circle, rows 13-17)
        'spans(I, 13:14-17, 14:13-18, 15:13-18, 16:13-18, 17:14-17)',
        // Boss shadow: right + bottom
        'pixels(i, 17,14, 18,14, 18,15, 17,16, 18,16, 16,17, 17,17)',
        // Boss highlight: top-left
        'pixels(J, 14,13, 13,14, 13,15)',

        // Wood grain (subtle scattered dots)
        'pixels(w, 10,10, 12,11, 14,10, 18,12, 20,11)',
        'pixels(w, 11,19, 14,21, 17,20, 20,18)',
      ],
      chars: {
        W: { name: 'wood_base', role: 'body' },
        w: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        I: { name: 'iron_base', role: 'head' },
        i: { name: 'iron_shadow', role: 'head', tone: 'shadow' },
        J: { name: 'iron_highlight', role: 'head', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  HEALTH POTION — simple glass bottle with red liquid
    // ═══════════════════════════════════════════════════════════
    {
      id: 'clean_potion_32',
      description: '32x32 health potion — simple clean bottle.',
      size: 32,
      draw: [
        // Cork (rows 6-7, cols 14-17)
        'spans(C, 6:14-17, 7:14-17)',
        // Cork shadow: right edge
        'pixels(c, 17,6, 16,7, 17,7)',
        // Cork highlight: left edge
        'pixels(K, 14,6)',

        // Neck (rows 8-9, cols 14-17)
        'spans(L, 8:14-17, 9:14-17)',
        // Neck shadow: right edge col 17
        'pixels(l, 17,8, 17,9)',
        // Neck highlight: left edge col 14
        'pixels(W, 14,8, 14,9)',

        // Body (rounded, rows 10-21)
        'spans(L, 10:13-18, 11:12-19, 12:11-20, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:11-20, 20:12-19, 21:13-18)',
        // Shadow: right side (clean 2-col cluster)
        'spans(l, 10:17-18, 11:18-19, 12:19-20, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21, 19:19-20, 20:18-19, 21:17-18)',
        // Shadow: bottom
        'pixels(l, 12,20, 13,20, 14,21, 15,21)',
        // Highlight: left edge
        'pixels(W, 12,11, 11,12, 10,13, 10,14, 10,15, 10,16, 10,17, 10,18, 11,19, 12,20)',
        // Specular: small bright dot (glass reflection)
        'pixels(W, 12,12, 11,13)',
      ],
      chars: {
        C: { name: 'cork_base', role: 'accessory' },
        c: { name: 'cork_shadow', role: 'accessory', tone: 'shadow' },
        K: { name: 'cork_highlight', role: 'accessory', tone: 'highlight' },
        L: { name: 'liquid_base', role: 'body' },
        l: { name: 'liquid_shadow', role: 'body', tone: 'shadow' },
        W: { name: 'liquid_highlight', role: 'body', tone: 'highlight' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  TREASURE CHEST — connected lid, clean structure
    // ═══════════════════════════════════════════════════════════
    {
      id: 'clean_chest_32',
      description: '32x32 treasure chest — solid, no floating parts.',
      size: 32,
      draw: [
        // Lid (rounded top, rows 8-12)
        'spans(W, 8:11-20, 9:9-22, 10:8-23, 11:8-23, 12:8-23)',
        // Lid shadow: right side
        'spans(w, 8:19-20, 9:21-22, 10:22-23, 11:22-23, 12:22-23)',
        // Lid highlight: top-left
        'pixels(H, 11,8, 12,8, 9,9, 10,9, 8,10)',

        // Hinge band (iron, row 13, connects lid to body)
        'spans(I, 13:8-23)',
        // Hinge shadow: right edge
        'pixels(i, 22,13, 23,13)',
        // Hinge highlight: left edge
        'pixels(J, 8,13, 9,13)',

        // Body (rows 14-23)
        'spans(W, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23, 21:8-23, 22:8-23, 23:8-23)',
        // Body shadow: right + bottom
        'spans(w, 14:22-23, 15:22-23, 16:22-23, 17:22-23, 18:22-23, 19:22-23, 20:22-23, 21:22-23, 22:22-23)',
        'spans(w, 23:8-23)',
        // Body highlight: left edge col 8
        'pixels(H, 8,14, 8,15, 8,16, 8,17, 8,18, 8,19, 8,20, 8,21, 8,22)',

        // Iron bands (2 horizontal)
        'spans(I, 18:8-23)',
        'pixels(i, 22,18, 23,18)',
        'pixels(J, 8,18, 9,18)',

        'spans(I, 23:8-23)',
        'pixels(i, 22,23, 23,23)',
        'pixels(J, 8,23, 9,23)',

        // Side strips (col 8 and col 23)
        'spans(I, 14:8-8, 15:8-8, 16:8-8, 17:8-8, 19:8-8, 20:8-8, 21:8-8, 22:8-8)',
        'spans(I, 14:23-23, 15:23-23, 16:23-23, 17:23-23, 19:23-23, 20:23-23, 21:23-23, 22:23-23)',

        // Lock plate (gold, centered, rows 15-17, cols 14-17)
        'spans(G, 15:14-17, 16:14-17, 17:14-17)',
        'pixels(g, 17,15, 17,16, 16,17, 17,17)',
        // Keyhole
        'pixels(K, 15,15, 15,16, 16,16)',
      ],
      chars: {
        W: { name: 'wood_base', role: 'body' },
        w: { name: 'wood_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'wood_highlight', role: 'body', tone: 'highlight' },
        I: { name: 'iron_base', role: 'head' },
        i: { name: 'iron_shadow', role: 'head', tone: 'shadow' },
        J: { name: 'iron_highlight', role: 'head', tone: 'highlight' },
        G: { name: 'gold_base', role: 'accessory' },
        g: { name: 'gold_shadow', role: 'accessory', tone: 'shadow' },
        K: { name: 'keyhole', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  GOLDEN KEY — handle + shaft + teeth
    // ═══════════════════════════════════════════════════════════
    {
      id: 'clean_key_32',
      description: '32x32 golden key — simple and clean.',
      size: 32,
      draw: [
        // Handle (hollow ring — draw only the rim)
        'spans(G, 4:13-18)',
        'spans(G, 5:11-12, 5:19-20)',
        'spans(G, 6:10-11, 6:20-21)',
        'spans(G, 7:10-11, 7:20-21)',
        'spans(G, 8:10-11, 8:20-21)',
        'spans(G, 9:10-11, 9:20-21)',
        'spans(G, 10:11-12, 10:19-20)',
        'spans(G, 11:13-18)',
        // Handle shadow: right side
        'pixels(g, 17,4, 18,4, 19,5, 20,5, 20,6, 21,6, 21,7, 21,8, 20,9, 21,9, 19,10, 20,10, 17,11, 18,11)',
        // Handle highlight: left side
        'pixels(J, 13,4, 11,5, 10,6, 10,7, 10,8, 10,9, 11,10, 13,11)',

        // Shaft (2px wide cols 15-16, rows 12-21)
        'spans(G, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16)',
        // Shaft shadow: right edge col 16
        'pixels(g, 16,12, 16,13, 16,14, 16,15, 16,16, 16,17, 16,18, 16,19, 16,20, 16,21)',
        // Shaft highlight: left edge col 15
        'pixels(J, 15,12, 15,13)',

        // Teeth (right side, rows 22-26)
        'spans(G, 22:15-20, 23:15-16, 24:15-20, 25:15-16, 26:15-18)',
        // Teeth shadow: right edge
        'pixels(g, 19,22, 20,22, 19,24, 20,24, 17,26, 18,26)',
        // Teeth highlight: left edge col 15
        'pixels(J, 15,22, 15,24, 15,26)',
      ],
      chars: {
        G: { name: 'gold_base', role: 'body' },
        g: { name: 'gold_shadow', role: 'body', tone: 'shadow' },
        J: { name: 'gold_highlight', role: 'body', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  MAGIC BOOK — closed, front view
    // ═══════════════════════════════════════════════════════════
    {
      id: 'clean_book_32',
      description: '32x32 closed book — leather cover, visible pages.',
      size: 32,
      draw: [
        // Spine (left edge cols 8-10, rows 6-24)
        'spans(L, 6:8-10, 7:8-10, 8:8-10, 9:8-10, 10:8-10, 11:8-10, 12:8-10, 13:8-10, 14:8-10, 15:8-10, 16:8-10, 17:8-10, 18:8-10, 19:8-10, 20:8-10, 21:8-10, 22:8-10, 23:8-10, 24:8-10)',
        // Spine shadow: right edge col 10
        'pixels(l, 10,6, 10,7, 10,8, 10,9, 10,10, 10,11, 10,12, 10,13, 10,14, 10,15, 10,16, 10,17, 10,18, 10,19, 10,20, 10,21, 10,22, 10,23, 10,24)',

        // Front cover (cols 11-22, rows 6-24)
        'spans(B, 6:11-22, 7:11-22, 8:11-22, 9:11-22, 10:11-22, 11:11-22, 12:11-22, 13:11-22, 14:11-22, 15:11-22, 16:11-22, 17:11-22, 18:11-22, 19:11-22, 20:11-22, 21:11-22, 22:11-22, 23:11-22, 24:11-22)',
        // Cover shadow: right edge cols 21-22 + bottom row 24
        'spans(b, 6:21-22, 7:21-22, 8:21-22, 9:21-22, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:21-22, 21:21-22, 22:21-22, 23:21-22)',
        'spans(b, 24:11-22)',
        // Cover highlight: top-left
        'pixels(H, 11,6, 12,6, 11,7)',

        // Pages (visible at right edge col 23, rows 7-23)
        'spans(P, 7:23-23, 8:23-23, 9:23-23, 10:23-23, 11:23-23, 12:23-23, 13:23-23, 14:23-23, 15:23-23, 16:23-23, 17:23-23, 18:23-23, 19:23-23, 20:23-23, 21:23-23, 22:23-23, 23:23-23)',
        // Pages bottom edge (row 25, cols 9-23)
        'spans(P, 25:9-23)',
        // Pages shadow: bottom-right
        'pixels(p, 22,25, 23,25)',

        // Cover decoration (centered emblem, rows 13-16, cols 14-17)
        'spans(G, 13:14-17, 14:14-17, 15:14-17, 16:14-17)',
        // Emblem shadow: right + bottom
        'pixels(g, 17,14, 17,15, 16,16, 17,16)',
        // Emblem highlight: top-left
        'pixels(J, 14,13, 14,14)',

        // Cover border lines (embossed frame)
        'spans(b, 8:12-20, 22:12-20)',
        // Left border (col 12, rows 9-21)
        'pixels(b, 12,9, 12,10, 12,11, 12,12, 12,13, 12,14, 12,15, 12,16, 12,17, 12,18, 12,19, 12,20, 12,21)',
        // Right border (col 20, rows 9-21)
        'pixels(b, 20,9, 20,10, 20,11, 20,12, 20,13, 20,14, 20,15, 20,16, 20,17, 20,18, 20,19, 20,20, 20,21)',
      ],
      chars: {
        B: { name: 'cover_base', role: 'body' },
        b: { name: 'cover_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'cover_highlight', role: 'body', tone: 'highlight' },
        L: { name: 'spine_base', role: 'leg' },
        l: { name: 'spine_shadow', role: 'leg', tone: 'shadow' },
        P: { name: 'pages_base', role: 'eye' },
        p: { name: 'pages_shadow', role: 'eye', tone: 'shadow' },
        G: { name: 'emblem_base', role: 'accessory' },
        g: { name: 'emblem_shadow', role: 'accessory', tone: 'shadow' },
        J: { name: 'emblem_highlight', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        leg:       { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
        eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  SCROLL — rolled parchment, horizontal
    // ═══════════════════════════════════════════════════════════
    {
      id: 'clean_scroll_32',
      description: '32x32 rolled scroll — parchment with wooden rods.',
      size: 32,
      draw: [
        // Left rod (wooden, round, rows 8-22, cols 6-10)
        'spans(R, 8:7-9, 9:6-10, 10:6-10, 11:6-10, 12:6-10, 13:6-10, 14:6-10, 15:6-10, 16:6-10, 17:6-10, 18:6-10, 19:6-10, 20:6-10, 21:6-10, 22:7-9)',
        // Rod shadow: right edge col 10
        'pixels(r, 9,9, 10,9, 10,10, 10,11, 10,12, 10,13, 10,14, 10,15, 10,16, 10,17, 10,18, 10,19, 10,20, 10,21)',
        // Rod highlight: left edge col 6
        'pixels(D, 6,9, 6,10, 6,11, 6,12, 6,13, 6,14, 6,15, 6,16, 6,17, 6,18, 6,19, 6,20, 6,21)',
        // Left rod caps (rows 7 and 23)
        'spans(G, 7:7-9, 23:7-9)',
        // Cap shadow: right edge col 9
        'pixels(g, 9,7, 9,23)',

        // Parchment body (unrolled center, rows 10-20, cols 11-20)
        'spans(P, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:11-20, 19:11-20, 20:11-20)',
        // Parchment shadow: bottom + right
        'spans(p, 11:19-20, 12:19-20, 13:19-20, 14:19-20, 15:19-20, 16:19-20, 17:19-20, 18:19-20, 19:19-20, 20:11-20)',
        // Parchment highlight: top-left
        'pixels(Q, 11,10, 12,10, 11,11)',

        // Right rod (wooden, round, rows 8-22, cols 21-25)
        'spans(R, 8:22-24, 9:21-25, 10:21-25, 11:21-25, 12:21-25, 13:21-25, 14:21-25, 15:21-25, 16:21-25, 17:21-25, 18:21-25, 19:21-25, 20:21-25, 21:21-25, 22:22-24)',
        // Rod shadow: right edge col 25
        'pixels(r, 24,9, 25,9, 25,10, 25,11, 25,12, 25,13, 25,14, 25,15, 25,16, 25,17, 25,18, 25,19, 25,20, 25,21)',
        // Rod highlight: left edge col 21
        'pixels(D, 21,9, 21,10, 21,11, 21,12, 21,13, 21,14, 21,15, 21,16, 21,17, 21,18, 21,19, 21,20, 21,21)',
        // Right rod caps (rows 7 and 23)
        'spans(G, 7:22-24, 23:22-24)',
        // Cap shadow: right edge col 24
        'pixels(g, 24,7, 24,23)',

        // Text lines (subtle marks on parchment)
        'spans(p, 12:13-17, 14:12-18, 16:13-17, 18:12-16)',
      ],
      chars: {
        R: { name: 'rod_base', role: 'leg' },
        r: { name: 'rod_shadow', role: 'leg', tone: 'shadow' },
        D: { name: 'rod_highlight', role: 'leg', tone: 'highlight' },
        G: { name: 'cap_base', role: 'accessory' },
        g: { name: 'cap_shadow', role: 'accessory', tone: 'shadow' },
        P: { name: 'parchment_base', role: 'body' },
        p: { name: 'parchment_shadow', role: 'body', tone: 'shadow' },
        Q: { name: 'parchment_highlight', role: 'body', tone: 'highlight' },
      },
      colors: {
        leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
