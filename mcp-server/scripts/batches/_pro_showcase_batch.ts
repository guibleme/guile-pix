/**
 * PRO SHOWCASE v3 — Professional 32x32 templates with hand-placed shading.
 *
 * Key improvements over v2:
 * 1. Clean shadow CLUSTERS (2-4px groups, no isolated dots)
 * 2. Smooth curves (consistent 1px offsets per row)
 * 3. Chest lid CONNECTS to body (no floating)
 * 4. Slime eyes enlarged (4x4) with white sclera
 * 5. Mage robe without fold dot noise
 * 6. Light from top-left everywhere
 * 7. Material-specific shading: metal=sharp specular, cloth=soft gradient
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'pro_showcase',
  exportNames: { templates: 'PRO_SHOWCASE_TEMPLATES', schemes: 'PRO_SHOWCASE_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════
    //  PRO KNIGHT v3 — Armored paladin with sword and cape
    //  Height: ~27px (rows 1-27), width: ~20px centered
    //  Light: top-left. Metal = sharp specular. Cape = soft.
    // ═══════════════════════════════════════════════════════════
    {
      id: 'pro_knight_32',
      description: '32x32 armored knight — clean hand-placed shading.',
      size: 32,
      draw: [
        // ── PLUME (red feather atop helmet) ──
        'pixels(P, 15,1, 16,1)',
        'spans(P, 2:14-17)',
        'pixels(p, 16,1, 17,2)',

        // ── HELMET DOME (smooth curve: 3→5→7→7→7→5→3) ──
        'spans(M, 3:14-16, 4:13-17, 5:12-18, 6:12-18, 7:12-18, 8:13-17, 9:14-16)',
        // Shadow: right curve (clean cluster)
        'pixels(m, 16,3, 17,4, 17,5, 18,5, 17,6, 18,6, 17,7, 18,7, 17,8)',
        // Highlight: top-left specular (2-3px sharp = metal!)
        'pixels(V, 14,3, 13,4, 12,5)',
        // Visor slit (dark)
        'pixels(E, 13,7, 14,7, 16,7, 17,7)',

        // ── GORGET (narrow neck) ──
        'spans(m, 10:14-16)',
        'pixels(V, 14,10)',

        // ── LEFT PAULDRON (light side) ──
        'spans(M, 11:8-12, 12:7-12, 13:8-11)',
        'pixels(V, 11,8, 11,9, 12,7)',
        'pixels(m, 13,10, 13,11)',

        // ── RIGHT PAULDRON (shadow side — all dark) ──
        'spans(m, 11:18-22, 12:18-23, 13:19-22)',
        'pixels(M, 11,18, 12,18)',

        // ── BREASTPLATE ──
        'spans(M, 11:13-17, 12:13-18, 13:12-18, 14:11-19, 15:11-19, 16:11-19, 17:11-19)',
        // Shadow: right + bottom clusters
        'spans(m, 14:18-19, 15:18-19, 16:18-19, 17:18-19)',
        'pixels(m, 17,11, 17,12)',
        // Highlight: upper-left 2x2
        'pixels(V, 13,12, 13,13, 14,12, 14,13)',
        // Gold chest emblem
        'pixels(G, 15,15, 16,14, 16,15, 16,16)',
        'pixels(g, 16,16)',

        // ── ARMS ──
        // Left arm (light side)
        'spans(M, 14:9-10, 15:9-10, 16:8-10)',
        'pixels(V, 14,9, 15,9)',
        'pixels(m, 15,10, 16,10)',
        // Left hand
        'pixels(F, 17,8, 17,9)',
        'pixels(f, 17,9)',

        // Right arm (shadow side)
        'spans(m, 14:20-21, 15:20-21, 16:20-22)',
        'pixels(M, 14,20)',
        // Right hand
        'pixels(F, 17,21, 17,22)',

        // ── BELT ──
        'spans(B, 18:12-18)',
        'pixels(b, 18,17, 18,18)',
        'pixels(G, 18,15)',

        // ── FAULD (armored skirt) ──
        'spans(M, 19:11-19, 20:12-18)',
        'pixels(m, 19,18, 19,19, 20,17, 20,18)',
        'pixels(V, 19,11, 20,12)',

        // ── CAPE (behind character, both sides) ──
        // Left cape (light side)
        'spans(C, 12:5-6, 13:4-6, 14:4-5, 15:3-5, 16:3-5, 17:3-4, 18:3-4, 19:4-5, 20:4-5)',
        'pixels(K, 13,4, 15,3, 17,3)',
        // Right cape (shadow = all dark)
        'spans(c, 12:24-25, 13:25-26, 14:25-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27, 19:25-26, 20:25-26)',
        // Cape bottom
        'pixels(C, 21,4, 21,5)',
        'pixels(c, 21,25, 21,26)',

        // ── LEGS ──
        // Left leg (light side)
        'spans(L, 21:12-14, 22:12-14, 23:12-14, 24:12-13)',
        'pixels(W, 21,12, 22,12, 23,12)',
        'pixels(l, 21,14, 22,14, 23,14)',

        // Right leg (shadow side)
        'spans(L, 21:16-18, 22:16-18, 23:16-18, 24:17-18)',
        'pixels(l, 21,18, 22,18, 23,18, 24,18)',
        'pixels(l, 21,16, 22,16)',

        // Gap shadow between legs
        'pixels(m, 21,15, 22,15, 23,15)',

        // ── BOOTS (sabatons — wider than legs) ──
        'spans(M, 25:11-14, 26:10-14, 27:10-14)',
        'pixels(V, 25,11, 26,10)',
        'pixels(m, 26,13, 26,14, 27,13, 27,14)',
        // Right boot
        'spans(M, 25:16-19, 26:16-20, 27:16-20)',
        'pixels(m, 25,19, 26,19, 26,20, 27,19, 27,20)',

        // ── SWORD (alongside right side) ──
        // Blade (tapered, tip at top)
        'pixels(S, 25,1)',
        'spans(S, 2:24-25, 3:24-25, 4:24-25, 5:24-25, 6:24-25, 7:24-25, 8:24-25, 9:24-25, 10:24-24, 11:24-24, 12:24-24, 13:24-24)',
        'pixels(X, 24,2, 24,3, 24,4, 24,5, 24,6)',
        'pixels(s, 25,3, 25,4, 25,5, 25,6, 25,7, 25,8)',
        // Cross-guard (gold)
        'spans(G, 14:22-27)',
        'pixels(g, 14,26, 14,27)',
      ],
      chars: {
        M: { name: 'plate_base', role: 'body' },
        m: { name: 'plate_shadow', role: 'body', tone: 'shadow' },
        V: { name: 'plate_highlight', role: 'body', tone: 'highlight' },
        P: { name: 'plume_base', role: 'hair' },
        p: { name: 'plume_shadow', role: 'hair', tone: 'shadow' },
        E: { name: 'visor', role: 'eye' },
        C: { name: 'cape_base', role: 'head' },
        c: { name: 'cape_shadow', role: 'head', tone: 'shadow' },
        K: { name: 'cape_highlight', role: 'head', tone: 'highlight' },
        G: { name: 'gold_base', role: 'accessory' },
        g: { name: 'gold_shadow', role: 'accessory', tone: 'shadow' },
        B: { name: 'belt_base', role: 'belt' },
        b: { name: 'belt_shadow', role: 'belt', tone: 'shadow' },
        L: { name: 'legs_base', role: 'leg' },
        l: { name: 'legs_shadow', role: 'leg', tone: 'shadow' },
        W: { name: 'legs_highlight', role: 'leg', tone: 'highlight' },
        F: { name: 'skin_base', role: 'hand' },
        f: { name: 'skin_shadow', role: 'hand', tone: 'shadow' },
        S: { name: 'blade_base', role: 'arm' },
        s: { name: 'blade_shadow', role: 'arm', tone: 'shadow' },
        X: { name: 'blade_highlight', role: 'arm', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        hair:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },
        head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        arm:       { shadow: '#597dce', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  PRO MAGE v3 — Wizard with pointed hat, flowing robe, staff
    //  NO fold dot noise. Clean robe shadow = right-side cluster.
    // ═══════════════════════════════════════════════════════════
    {
      id: 'pro_mage_32',
      description: '32x32 arcane mage — clean robe shading, no noise.',
      size: 32,
      draw: [
        // ── POINTED HAT ──
        'pixels(R, 15,1, 16,1)',
        'spans(R, 2:14-17, 3:13-18, 4:12-19)',
        // Hat brim (wide)
        'spans(R, 5:9-22)',
        // Shadow: right side of hat
        'pixels(r, 16,1, 17,2, 18,3, 19,4)',
        'spans(r, 5:19-22)',
        // Highlight: left edge
        'pixels(Z, 14,1, 13,2, 12,3, 12,4, 9,5, 10,5)',
        // Hat band (gold trim)
        'spans(G, 4:13-18)',
        'pixels(g, 4,17, 4,18)',

        // ── FACE ──
        'spans(F, 6:12-19, 7:12-19, 8:13-18, 9:14-17)',
        // Shadow: right side
        'spans(f, 6:18-19, 7:18-19, 8:17-18)',
        // Highlight: left cheek
        'pixels(H, 6,12, 6,13, 7,12)',
        // Eyes (black, 2px each)
        'pixels(E, 14,7, 15,7, 17,7, 18,7)',
        // Eye highlights
        'pixels(W, 14,7, 17,7)',

        // ── BEARD ──
        'spans(D, 9:14-17, 10:14-17, 11:15-16)',
        'pixels(d, 10,17, 11,16)',

        // ── ROBE (clean shadow = right-side cluster, NO dot patterns) ──
        'spans(R, 10:11-13, 10:18-20)',
        'spans(R, 11:10-14, 11:17-21)',
        'spans(R, 12:10-21, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22)',
        'spans(R, 21:8-23, 22:8-23, 23:7-24, 24:7-24, 25:6-25, 26:6-25)',
        // Shadow: right 3 columns (clean cluster, NO isolated dots)
        'spans(r, 13:20-22, 14:20-22, 15:20-22, 16:20-22, 17:20-22, 18:20-22, 19:20-22, 20:20-22)',
        'spans(r, 21:21-23, 22:21-23, 23:22-24, 24:22-24, 25:23-25, 26:23-25)',
        // Highlight: left edge (clean vertical strip)
        'pixels(Z, 13,9, 14,9, 15,9, 16,9, 17,9, 18,9, 19,9, 21,8, 22,8, 23,7, 24,7, 25,6, 26,6)',
        // Robe collar
        'spans(Z, 10:12-13, 10:18-19)',
        // Robe fold shadow (2px-wide vertical crease below sash — adds form without noise)
        'spans(r, 18:14-15, 19:14-15, 20:14-15, 21:14-15, 22:14-15, 23:14-15, 24:14-15)',
        // Sash (gold belt)
        'spans(G, 16:11-20)',
        'pixels(g, 16,19, 16,20)',

        // ── HANDS ──
        'pixels(F, 18,7, 18,8)',
        'pixels(F, 18,23, 18,24)',
        'pixels(f, 18,24)',

        // ── BOOTS (peek below robe) ──
        'spans(O, 27:8-12, 27:20-24)',
        'spans(O, 28:7-12, 28:20-25)',
        'pixels(o, 28,11, 28,12, 28,24, 28,25)',
        'pixels(Q, 27,8, 28,7)',

        // ── STAFF (2px wide, wood with crystal) ──
        'spans(T, 3:6-7, 4:6-7, 5:6-7, 6:6-7, 7:6-7, 8:6-7, 9:6-7, 10:6-7)',
        'spans(T, 11:6-7, 12:6-7, 13:6-7, 14:6-7, 15:6-7, 16:6-7, 17:6-7, 18:6-7)',
        'spans(T, 19:6-7, 20:6-7, 21:6-7, 22:6-7, 23:6-7, 24:6-7, 25:6-7, 26:6-7)',
        // Staff shadow (right edge)
        'pixels(t, 7,4, 7,6, 7,8, 7,10, 7,12, 7,14, 7,16, 7,18, 7,20, 7,22, 7,24, 7,26)',
        // Crystal orb (3x3 at top)
        'spans(C, 0:5-7, 1:5-7, 2:5-7)',
        'pixels(W, 5,0, 5,1)',
        'pixels(c, 7,1, 7,2)',
      ],
      chars: {
        R: { name: 'robe_base', role: 'body' },
        r: { name: 'robe_shadow', role: 'body', tone: 'shadow' },
        Z: { name: 'robe_highlight', role: 'body', tone: 'highlight' },
        F: { name: 'skin_base', role: 'hand' },
        f: { name: 'skin_shadow', role: 'hand', tone: 'shadow' },
        H: { name: 'skin_highlight', role: 'hand', tone: 'highlight' },
        E: { name: 'eyes', role: 'eye' },
        W: { name: 'specular', role: 'eye', tone: 'highlight' },
        D: { name: 'beard_base', role: 'head' },
        d: { name: 'beard_shadow', role: 'head', tone: 'shadow' },
        G: { name: 'gold_base', role: 'accessory' },
        g: { name: 'gold_shadow', role: 'accessory', tone: 'shadow' },
        C: { name: 'crystal_base', role: 'belt' },
        c: { name: 'crystal_shadow', role: 'belt', tone: 'shadow' },
        O: { name: 'boot_base', role: 'boot' },
        o: { name: 'boot_shadow', role: 'boot', tone: 'shadow' },
        Q: { name: 'boot_highlight', role: 'boot', tone: 'highlight' },
        T: { name: 'staff_base', role: 'leg' },
        t: { name: 'staff_shadow', role: 'leg', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  PRO SLIME v3 — Large cute eyes with white sclera
    //  Eyes: 4x4 each, white background, dark pupils, highlight dots
    //  Gel: large specular highlight cluster (not just 2px)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'pro_slime_32',
      description: '32x32 green slime — large visible eyes, gel specular.',
      size: 32,
      draw: [
        // ── BODY DOME (organic ellipse) ──
        'spans(B, 8:13-18, 9:11-20, 10:10-21, 11:9-22, 12:8-23, 13:7-24, 14:7-24, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:6-25, 20:7-24, 21:7-24, 22:8-23, 23:9-22)',
        // Base spread
        'spans(B, 24:8-23, 25:7-24, 26:7-24)',

        // Shadow: right side (clean wide cluster)
        'spans(b, 10:20-21, 11:21-22, 12:22-23, 13:23-24, 14:23-24, 15:24-25, 16:24-25, 17:24-25, 18:24-25, 19:24-25, 20:23-24, 21:23-24, 22:22-23, 23:21-22)',
        // Shadow: bottom spread
        'spans(b, 24:20-23, 25:21-24, 26:21-24)',
        // Deep shadow: base contact
        'spans(D, 25:8-10, 26:8-10, 25:21-24, 26:21-24)',

        // Highlight: top-left (LARGE specular = gel look)
        'spans(H, 9:12-14, 10:11-13, 11:10-12)',
        'pixels(H, 12,9, 13,8)',
        // Bright specular dots (white-ish, 2x2)
        'pixels(W, 10,11, 10,12, 11,10, 11,11)',

        // ── EYES (4x4 each, WHITE sclera = high contrast vs green) ──
        // Left eye white (4x4)
        'spans(E, 14:9-12, 15:9-12, 16:9-12, 17:9-12)',
        // Right eye white (4x4)
        'spans(E, 14:18-21, 15:18-21, 16:18-21, 17:18-21)',
        // Left pupil (2x2, offset bottom-right)
        'pixels(P, 11,16, 12,16, 11,17, 12,17)',
        // Right pupil (2x2, offset bottom-right)
        'pixels(P, 20,16, 21,16, 20,17, 21,17)',
        // Eye highlights (1px each, top-left)
        'pixels(W, 9,14, 18,14)',

        // ── MOUTH (happy U-curve) ──
        'pixels(P, 13,20, 18,20)',
        'spans(P, 21:14-17)',

        // ── CHEEK BLUSH (pink) ──
        'pixels(K, 8,18, 9,18, 22,18, 23,18)',

        // ── DRIPS (gel detail at base) ──
        'pixels(B, 7,25, 7,26)',
        'pixels(b, 7,26)',
        'pixels(B, 24,25, 24,26)',
        'pixels(b, 24,26)',
      ],
      chars: {
        B: { name: 'body_base', role: 'body' },
        b: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        D: { name: 'deep_shadow', role: 'boot', tone: 'shadow' },
        H: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'eye_white', role: 'eye' },
        P: { name: 'pupil', role: 'head' },
        W: { name: 'specular', role: 'eye', tone: 'highlight' },
        K: { name: 'cheek', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        eye:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },
        accessory: { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },
        boot:      { shadow: '#140c1c', base: '#346524', highlight: '#346524' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  PRO CHEST v3 — Lid CONNECTED to body, clean iron bands
    //  No floating lid. Simplified band pattern. Large lock plate.
    // ═══════════════════════════════════════════════════════════
    {
      id: 'pro_chest_32',
      description: '32x32 treasure chest — connected lid, clean bands.',
      size: 32,
      draw: [
        // ── LID (rounded top, connected to body) ──
        'spans(W, 9:10-21, 10:8-23, 11:7-24, 12:7-24, 13:7-24)',
        // Lid shadow: right + lower right
        'spans(w, 9:19-21, 10:21-23, 11:22-24, 12:22-24, 13:22-24)',
        // Lid highlight: top-left
        'pixels(H, 9,10, 9,11, 10,8, 10,9, 11,7)',
        // Wood grain on lid (just 2-3 subtle dots, NOT a pattern)
        'pixels(w, 11,11, 14,12, 19,11)',

        // ── HINGE BAND (iron, connects lid to body) ──
        'spans(I, 14:7-24)',
        'pixels(i, 14,22, 14,23, 14,24)',
        'pixels(J, 14,7, 14,8)',

        // ── BODY (box, same width as lid bottom) ──
        'spans(W, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24, 20:7-24, 21:7-24, 22:7-24, 23:7-24, 24:7-24)',
        // Body shadow: right + bottom
        'spans(w, 15:22-24, 16:22-24, 17:22-24, 18:22-24, 19:22-24, 20:22-24, 21:22-24, 22:22-24, 23:22-24, 24:7-24)',
        // Body highlight: left edge
        'pixels(H, 15,7, 16,7, 17,7, 18,7, 19,7, 20,7, 21,7, 22,7, 23,7)',
        // Wood grain on body (subtle, NOT a grid)
        'pixels(w, 10,17, 16,16, 12,20, 18,19)',

        // ── IRON BANDS (2 horizontal, clean 1px lines) ──
        'spans(I, 19:7-24)',
        'pixels(i, 19,22, 19,23, 19,24)',
        'pixels(J, 19,7, 19,8)',

        'spans(I, 24:7-24)',
        'pixels(i, 24,22, 24,23, 24,24)',
        'pixels(J, 24,7, 24,8)',

        // ── VERTICAL EDGE BANDS (iron strips on sides) ──
        'spans(I, 9:10-10, 10:8-8, 11:7-7, 12:7-7, 13:7-7)',
        'spans(I, 9:21-21, 10:23-23, 11:24-24, 12:24-24, 13:24-24)',
        'spans(I, 15:7-7, 16:7-7, 17:7-7, 18:7-7, 20:7-7, 21:7-7, 22:7-7, 23:7-7)',
        'spans(I, 15:24-24, 16:24-24, 17:24-24, 18:24-24, 20:24-24, 21:24-24, 22:24-24, 23:24-24)',

        // ── LOCK PLATE (gold, 4x4 centered) ──
        'rect(14,16,4,4,G)',
        'pixels(g, 17,17, 17,18, 16,18, 18,17, 18,18)',
        // Keyhole
        'pixels(K, 15,17, 16,17, 16,18)',

        // ── CORNER RIVETS ──
        'pixels(J, 8,10, 23,10, 8,14, 23,14)',

        // ── GROUND SHADOW ──
        'spans(N, 25:8-23)',
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
        N: { name: 'ground_shadow', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  PRO SWORD (same as v2 with minor cleanup)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'pro_sword_32',
      description: '32x32 broadsword — metallic shading, clean blade.',
      size: 32,
      draw: [
        // ── BLADE ──
        'pixels(B, 15,0, 16,0)',
        'spans(B, 1:14-17, 2:14-17, 3:14-17, 4:14-17, 5:14-17, 6:14-17, 7:14-17, 8:14-17)',
        'spans(B, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16)',
        // Highlight: left edge (sharp = polished steel)
        'pixels(H, 14,1, 14,2, 14,3, 14,4, 14,5, 14,6, 14,7, 14,8, 15,9, 15,10, 15,11)',
        // Center fuller (groove)
        'pixels(b, 15,2, 15,3, 15,4, 15,5, 15,6, 15,7, 15,8)',
        // Shadow: right edge
        'pixels(b, 17,1, 17,2, 17,3, 17,4, 17,5, 17,6, 17,7, 17,8, 16,9, 16,10, 16,11, 16,12)',

        // ── CROSSGUARD (gold) ──
        'spans(G, 18:10-21, 19:11-20)',
        'pixels(g, 19,18, 19,19, 19,20, 18,20, 18,21)',
        'pixels(J, 18,10, 18,11, 19,11)',
        // Guard gems (red, at each end)
        'pixels(E, 15,18, 16,18)',

        // ── GRIP (leather wrapped) ──
        'spans(L, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16, 25:15-16)',
        'pixels(W, 15,20, 16,21, 15,22, 16,23, 15,24)',
        'pixels(l, 16,20, 16,22, 16,24, 16,25)',

        // ── POMMEL ──
        'spans(G, 26:14-17, 27:15-16)',
        'pixels(g, 27,16, 26,17)',
        'pixels(J, 26,14)',
      ],
      chars: {
        B: { name: 'blade_base', role: 'body' },
        b: { name: 'blade_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'blade_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'guard_base', role: 'accessory' },
        g: { name: 'guard_shadow', role: 'accessory', tone: 'shadow' },
        J: { name: 'guard_highlight', role: 'accessory', tone: 'highlight' },
        E: { name: 'gems', role: 'eye' },
        L: { name: 'grip_base', role: 'leg' },
        l: { name: 'grip_shadow', role: 'leg', tone: 'shadow' },
        W: { name: 'grip_wrap', role: 'leg', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        leg:       { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
      },
    },

  ],
};

export default batch;
