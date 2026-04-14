/**
 * RPG Test batch — 32x32 DSL templates for quality validation.
 * Categories: Weapons, Chests/Coins, Characters, Creatures.
 *
 * Usage: cd mcp-server && npx tsx scripts/templateGenerator.ts scripts/batches/_rpg_test_batch.ts 2>/dev/null > src/templates/_rpgTest.ts
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'rpg_test',
  exportNames: { templates: 'RPG_TEST_TEMPLATES', schemes: 'RPG_TEST_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════
    //  WEAPONS
    // ═══════════════════════════════════════════════════════════

    // ─── BROADSWORD ──────────────────────────────────────────
    {
      id: 'broadsword_32',
      description: 'Steel broadsword with golden crossguard and leather grip.',
      size: 32,
      draw: [
        // Blade (tapers from 4px at base to 2px at tip)
        'spans(B, 1:15-16, 2:14-17, 3:14-17, 4:14-17, 5:14-17, 6:14-17, 7:14-17, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16)',
        // Blade highlight (left edge catch)
        'pixels(H, 14,2, 14,3, 14,4, 14,5, 14,6, 14,7, 15,1)',
        // Blade tip point
        'pixels(B, 15,0, 16,0)',
        // Crossguard
        'spans(G, 18:11-20, 19:12-19)',
        // Crossguard gems
        'pixels(E, 11,18, 20,18)',
        // Grip (leather wrap)
        'spans(L, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16, 25:15-16)',
        // Grip wrap pattern
        'pixels(W, 15,20, 16,21, 15,22, 16,23, 15,24)',
        // Pommel
        'spans(G, 26:14-17, 27:15-16)',
      ],
      chars: {
        B: { name: 'blade', role: 'body' },
        H: { name: 'blade_highlight', role: 'eye' },
        G: { name: 'crossguard', role: 'accessory' },
        E: { name: 'gems', role: 'belt' },
        L: { name: 'grip_leather', role: 'leg' },
        W: { name: 'grip_wrap', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        leg:       { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        boot:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── BATTLE AXE ──────────────────────────────────────────
    {
      id: 'battle_axe_32',
      description: 'Double-headed battle axe with oak shaft.',
      size: 32,
      draw: [
        // Shaft (vertical, 2px wide)
        'spans(S, 4:15-16, 5:15-16, 6:15-16, 7:15-16, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16, 25:15-16, 26:15-16, 27:15-16)',
        // Left axe head
        'spans(B, 4:10-14, 5:9-14, 6:8-14, 7:8-14, 8:9-14, 9:10-14)',
        // Right axe head
        'spans(B, 4:17-21, 5:17-22, 6:17-23, 7:17-23, 8:17-22, 9:17-21)',
        // Axe head highlights
        'pixels(H, 10,5, 9,6, 22,5, 22,6)',
        // Axe edge (sharp)
        'pixels(E, 8,4, 8,5, 8,6, 8,7, 8,8, 8,9, 23,4, 23,5, 23,6, 23,7, 23,8, 23,9)',
        // Shaft wrap near head
        'spans(W, 10:14-17, 11:14-17)',
        // Pommel knob
        'spans(B, 28:14-17, 29:15-16)',
      ],
      chars: {
        B: { name: 'axe_head', role: 'body' },
        H: { name: 'metal_highlight', role: 'eye' },
        E: { name: 'sharp_edge', role: 'accessory' },
        S: { name: 'shaft', role: 'leg' },
        W: { name: 'shaft_wrap', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── MAGIC STAFF ─────────────────────────────────────────
    {
      id: 'magic_staff_32',
      description: 'Arcane staff with glowing crystal orb at top.',
      size: 32,
      draw: [
        // Crystal orb
        'ellipse(16,4,4,3,C)',
        // Orb inner glow
        'pixels(G, 15,3, 16,3, 15,4, 16,4)',
        // Orb highlight
        'pixels(H, 14,3)',
        // Staff cradle (holds orb)
        'spans(M, 7:13-14, 7:18-19, 8:14-15, 8:17-18)',
        // Staff shaft
        'spans(S, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16, 25:15-16, 26:15-16, 27:15-16)',
        // Shaft rune markings
        'pixels(R, 15,12, 16,14, 15,16, 16,18, 15,20)',
        // Bottom cap
        'spans(M, 28:14-17, 29:15-16)',
      ],
      chars: {
        C: { name: 'crystal', role: 'accessory' },
        G: { name: 'crystal_glow', role: 'eye' },
        H: { name: 'crystal_highlight', role: 'eye' },
        M: { name: 'metal_fittings', role: 'belt' },
        S: { name: 'staff_wood', role: 'body' },
        R: { name: 'rune_marks', role: 'head' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── WAR BOW ─────────────────────────────────────────────
    {
      id: 'war_bow_32',
      description: 'Recurve war bow with arrow nocked.',
      size: 32,
      draw: [
        // Bow limb - top curve (using individual pixels for curve)
        'pixels(B, 18,2, 17,3, 16,4, 15,5, 15,6, 14,7, 14,8, 14,9, 14,10, 14,11, 14,12, 14,13, 14,14, 14,15)',
        // Bow limb - bottom curve
        'pixels(B, 14,16, 14,17, 14,18, 14,19, 14,20, 14,21, 14,22, 14,23, 15,24, 15,25, 16,26, 17,27, 18,28)',
        // Bow grip (wider, center)
        'spans(G, 14:13-16, 15:13-16, 16:13-16, 17:13-16)',
        // Bowstring
        'pixels(S, 18,3, 18,4, 17,5, 17,6, 17,7, 16,8, 16,9, 16,10, 16,11, 16,12, 15,13, 15,14, 15,15, 15,16, 15,17, 16,18, 16,19, 16,20, 16,21, 16,22, 17,23, 17,24, 17,25, 18,26, 18,27)',
        // Arrow shaft
        'spans(A, 15:15-16, 15:17-18, 15:19-20, 15:21-22, 15:23-24, 15:25-26, 15:27-28, 15:29-30)',
        // Arrow head
        'pixels(H, 14,14, 15,13, 15,14, 16,14)',
        // Arrow fletching
        'pixels(F, 14,29, 15,29, 16,29, 14,30, 16,30)',
      ],
      chars: {
        B: { name: 'bow_limb', role: 'body' },
        G: { name: 'grip', role: 'belt' },
        S: { name: 'bowstring', role: 'accessory' },
        A: { name: 'arrow_shaft', role: 'leg' },
        H: { name: 'arrow_head', role: 'head' },
        F: { name: 'fletching', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        boot:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  CHESTS & COINS
    // ═══════════════════════════════════════════════════════════

    // ─── TREASURE CHEST (CLOSED) ─────────────────────────────
    {
      id: 'chest_closed_32',
      description: 'Wooden treasure chest with iron bands and lock, closed.',
      size: 32,
      draw: [
        // Chest body (wooden box)
        'rect(5,14,22,12,W)',
        // Chest lid (rounded top)
        'spans(L, 10:6-25, 11:5-26, 12:5-26, 13:5-26)',
        // Iron bands (horizontal)
        'spans(I, 14:5-26, 18:5-26, 22:5-26)',
        // Iron bands (vertical edges)
        'spans(I, 10:5-6, 10:25-26, 11:5-5, 11:26-26, 15:5-5, 15:26-26, 16:5-5, 16:26-26, 17:5-5, 17:26-26, 19:5-5, 19:26-26, 20:5-5, 20:26-26, 21:5-5, 21:26-26, 23:5-5, 23:26-26, 24:5-5, 24:26-26, 25:5-6, 25:25-26)',
        // Lock plate
        'rect(14,19,4,4,P)',
        // Keyhole
        'pixels(K, 15,20, 16,20, 15,21, 16,21)',
        // Lid highlight
        'spans(H, 11:7-24, 12:7-10)',
        // Base shadow
        'spans(S, 26:6-25)',
      ],
      chars: {
        W: { name: 'wood', role: 'body' },
        L: { name: 'lid_wood', role: 'body' },
        I: { name: 'iron_bands', role: 'head' },
        P: { name: 'lock_plate', role: 'accessory' },
        K: { name: 'keyhole', role: 'eye' },
        H: { name: 'wood_highlight', role: 'belt' },
        S: { name: 'base_shadow', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── TREASURE CHEST (OPEN) ───────────────────────────────
    {
      id: 'chest_open_32',
      description: 'Open treasure chest showing gold coins inside.',
      size: 32,
      draw: [
        // Chest body
        'rect(5,16,22,10,W)',
        // Open lid (tilted back)
        'spans(L, 6:5-26, 7:5-26, 8:5-26, 9:6-25)',
        // Lid inner surface
        'spans(D, 10:6-25, 11:7-24, 12:8-23)',
        // Iron bands on lid
        'spans(I, 7:5-5, 7:26-26, 8:5-5, 8:26-26)',
        // Iron bands on body
        'spans(I, 16:5-26, 20:5-26, 25:5-26)',
        // Body side bands
        'spans(I, 17:5-5, 17:26-26, 18:5-5, 18:26-26, 19:5-5, 19:26-26, 21:5-5, 21:26-26, 22:5-5, 22:26-26, 23:5-5, 23:26-26, 24:5-5, 24:26-26)',
        // Gold coins visible inside
        'spans(G, 13:9-22, 14:8-23, 15:7-24)',
        // Gold coin highlights
        'pixels(H, 10,14, 12,14, 14,14, 11,15, 13,15, 9,13, 13,13, 17,13, 21,13)',
        // Lid highlight
        'spans(E, 6:7-24)',
        // Base shadow
        'spans(S, 26:6-25)',
      ],
      chars: {
        W: { name: 'wood', role: 'body' },
        L: { name: 'lid_outer', role: 'body' },
        D: { name: 'lid_inner', role: 'leg' },
        I: { name: 'iron_bands', role: 'head' },
        G: { name: 'gold_coins', role: 'accessory' },
        H: { name: 'gold_highlight', role: 'eye' },
        E: { name: 'lid_highlight', role: 'belt' },
        S: { name: 'base_shadow', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        leg:       { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ─── GOLD COIN ───────────────────────────────────────────
    {
      id: 'gold_coin_32',
      description: 'Large gold coin with embossed star design.',
      size: 32,
      draw: [
        // Coin body (circle)
        'circle(16,16,12,C)',
        // Coin rim
        'ring(16,16,12,10,R)',
        // Inner embossed ring
        'ring(16,16,8,7,R)',
        // Star design (center emboss)
        'pixels(S, 16,10, 16,11, 15,12, 16,12, 17,12, 14,13, 15,13, 16,13, 17,13, 18,13, 13,14, 14,14, 15,14, 16,14, 17,14, 18,14, 19,14)',
        'pixels(S, 16,15, 15,15, 17,15, 14,16, 15,16, 16,16, 17,16, 18,16)',
        'pixels(S, 13,17, 14,17, 15,17, 16,17, 17,17, 18,17, 19,17)',
        'pixels(S, 14,18, 15,18, 16,18, 17,18, 18,18, 15,19, 16,19, 17,19, 16,20, 16,21)',
        // Coin highlight (top-left crescent)
        'pixels(H, 10,12, 11,11, 12,10, 13,9, 14,9, 15,9, 16,9, 11,12, 10,13, 10,14)',
        // Coin shadow (bottom-right)
        'pixels(D, 22,18, 21,19, 20,20, 19,21, 18,22, 17,22, 21,18, 22,17)',
      ],
      chars: {
        C: { name: 'coin_face', role: 'body' },
        R: { name: 'coin_rim', role: 'head' },
        S: { name: 'star_emboss', role: 'accessory' },
        H: { name: 'gold_highlight', role: 'eye' },
        D: { name: 'coin_shadow', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        boot:      { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
      },
    },

    // ─── COIN STACK ──────────────────────────────────────────
    {
      id: 'coin_stack_32',
      description: 'Stack of gold coins with scattered coins at base.',
      size: 32,
      draw: [
        // Bottom scattered coins (ellipses)
        'ellipse(10,26,5,2,C)',
        'ellipse(22,27,4,2,C)',
        // Main stack (layered ellipses, bottom to top)
        'rect(12,14,8,12,C)',      // stack body fill
        'ellipse(16,25,5,2,R)',    // bottom rim
        'ellipse(16,22,5,2,R)',    // mid rim
        'ellipse(16,19,5,2,R)',    // upper rim
        'ellipse(16,16,5,2,R)',    // near-top rim
        'ellipse(16,14,5,2,T)',    // top coin face
        // Stack highlight (left edge)
        'pixels(H, 12,15, 12,17, 12,19, 12,21, 12,23, 12,25)',
        // Top coin detail
        'pixels(H, 15,13, 16,13)',
        // Scattered coin highlights
        'pixels(H, 9,25, 21,26)',
      ],
      chars: {
        C: { name: 'coin_body', role: 'body' },
        R: { name: 'coin_rims', role: 'head' },
        T: { name: 'top_coin', role: 'accessory' },
        H: { name: 'gold_highlight', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  CHARACTERS
    // ═══════════════════════════════════════════════════════════

    // ─── MAGE ────────────────────────────────────────────────
    {
      id: 'mage_32',
      description: '32x32 arcane mage with pointed hat, robe and staff.',
      size: 32,
      draw: [
        // ── POINTED HAT ──
        'pixels(T, 15,0, 16,0)',
        'spans(T, 1:14-17, 2:13-18, 3:12-19, 4:11-20)',
        // Hat brim
        'spans(T, 5:9-22)',
        // Hat band
        'spans(A, 4:12-19)',

        // ── HEAD / FACE ──
        'spans(H, 6:12-19, 7:12-19, 8:13-18, 9:14-17)',
        // Face area
        'spans(F, 6:13-18, 7:14-17)',
        // Eyes
        'pixels(E, 14,6, 15,6, 17,6, 18,6)',
        'pixels(W, 14,6, 17,6)', // highlights

        // ── BEARD ──
        'spans(B, 8:14-17, 9:15-16, 10:15-16)',

        // ── NECK ──
        'spans(F, 10:14-17)',

        // ── ROBE (flowing, wide) ──
        'spans(R, 11:11-20, 12:10-21, 13:10-21, 14:10-21, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22)',
        'spans(R, 21:9-22, 22:9-22, 23:8-23, 24:8-23, 25:7-24, 26:7-24)',
        // Robe collar
        'spans(A, 11:13-18)',
        // Robe belt/sash
        'spans(A, 17:11-20)',
        // Robe center stripe
        'pixels(A, 15,14, 16,14, 15,16, 16,16, 15,19, 16,19, 15,21, 16,21, 15,23, 16,23, 15,25, 16,25)',

        // ── HANDS (poking out of sleeves) ──
        'spans(F, 18:8-9, 18:22-23)',

        // ── BOOTS (visible below robe) ──
        'spans(O, 27:9-13, 27:18-22, 28:8-13, 28:18-23, 29:8-13, 29:18-23)',

        // ── STAFF (held in left hand, to the left) ──
        'pixels(S, 7,2, 7,3, 7,4, 7,5, 7,6, 7,7, 7,8, 7,9, 7,10, 7,11, 7,12, 7,13, 7,14, 7,15, 7,16, 7,17, 7,18, 7,19, 7,20, 7,21, 7,22, 7,23, 7,24, 7,25, 7,26)',
        // Staff orb
        'pixels(G, 6,1, 7,1, 8,1, 6,2, 8,2)',
        'pixels(W, 7,0)',
      ],
      chars: {
        T: { name: 'hat', role: 'head' },
        A: { name: 'hat_band_accents', role: 'accessory' },
        H: { name: 'head_skin', role: 'arm' },
        F: { name: 'face_skin', role: 'hand' },
        E: { name: 'eyes', role: 'eye' },
        W: { name: 'highlights', role: 'eye' },
        B: { name: 'beard', role: 'hair' },
        R: { name: 'robe', role: 'body' },
        O: { name: 'boots', role: 'boot' },
        S: { name: 'staff_wood', role: 'leg' },
        G: { name: 'staff_gem', role: 'belt' },
      },
      colors: {
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#deeed6', highlight: '#deeed6' },
        hair:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── KNIGHT ──────────────────────────────────────────────
    {
      id: 'knight_32',
      description: '32x32 armored knight with full plate and cape.',
      size: 32,
      draw: [
        // ── HELMET ──
        'spans(M, 1:13-18, 2:12-19, 3:12-19, 4:12-19, 5:12-19, 6:13-18)',
        // Visor slit
        'pixels(E, 14,4, 15,4, 16,4, 17,4)',
        // Helmet crest
        'pixels(C, 15,0, 16,0, 15,1, 16,1)',
        // Helmet highlight
        'pixels(H, 13,2, 13,3, 14,2)',

        // ── NECK / GORGET ──
        'spans(M, 7:14-17)',

        // ── PAULDRONS (wide armored shoulders) ──
        'spans(M, 8:9-12, 8:19-22, 9:8-12, 9:19-23, 10:8-11, 10:20-23)',
        // Pauldron rivets
        'pixels(H, 10,9, 10,10, 21,9, 22,9)',

        // ── CAPE (behind body, sides visible) ──
        'spans(P, 9:7-8, 9:23-24, 10:6-8, 10:23-25, 11:6-7, 11:24-25, 12:5-7, 12:24-26, 13:5-6, 13:25-26, 14:5-6, 14:25-26, 15:4-6, 15:25-27, 16:4-5, 16:26-27, 17:4-5, 17:26-27, 18:4-5, 18:26-27, 19:4-5, 19:26-27, 20:5-6, 20:25-26)',

        // ── TORSO (plate armor) ──
        'spans(M, 8:13-18, 9:13-18, 10:12-19, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:12-19)',
        // Chest plate detail
        'spans(A, 12:14-17, 13:14-17)',
        // Belt
        'spans(B, 17:11-20, 18:12-19)',
        // Buckle
        'pixels(H, 15,17, 16,17)',

        // ── ARMS (armored) ──
        'spans(M, 11:8-10, 11:21-23, 12:8-10, 12:21-23, 13:8-10, 13:21-23, 14:8-10, 14:21-23, 15:9-10, 15:21-22)',
        // Gauntlets
        'spans(G, 16:8-10, 16:21-23, 17:8-10, 17:21-23)',

        // ── LEGS (armored) ──
        'spans(L, 19:12-15, 19:17-20, 20:12-15, 20:17-20, 21:12-15, 21:17-20, 22:12-14, 22:18-20, 23:12-14, 23:18-20)',

        // ── SABATONS (armored boots) ──
        'spans(M, 24:11-15, 24:17-21, 25:10-15, 25:17-22, 26:10-15, 26:17-22)',
      ],
      chars: {
        M: { name: 'plate_armor', role: 'body' },
        H: { name: 'metal_highlight', role: 'eye' },
        C: { name: 'crest', role: 'hair' },
        E: { name: 'visor_slit', role: 'eye' },
        A: { name: 'chest_emblem', role: 'accessory' },
        B: { name: 'belt', role: 'belt' },
        P: { name: 'cape', role: 'head' },
        G: { name: 'gauntlets', role: 'arm' },
        L: { name: 'leg_armor', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#deeed6', highlight: '#deeed6' },
        hair:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        arm:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── ARCHER ──────────────────────────────────────────────
    {
      id: 'archer_32',
      description: '32x32 ranger archer with hooded cloak and quiver.',
      size: 32,
      draw: [
        // ── HOOD ──
        'spans(K, 1:13-18, 2:12-19, 3:11-20, 4:11-20, 5:11-12, 5:19-20)',
        // Hood point
        'pixels(K, 15,0, 16,0)',

        // ── FACE ──
        'spans(F, 5:13-18, 6:13-18, 7:13-18, 8:14-17)',
        // Eyes
        'pixels(E, 14,6, 15,6, 17,6, 18,6)',
        'pixels(W, 14,6, 17,6)',

        // ── NECK ──
        'spans(F, 9:15-16)',

        // ── CLOAK + TORSO ──
        'spans(K, 10:10-21, 11:10-21, 12:10-21, 13:9-22, 14:9-22)',
        // Tunic visible underneath
        'spans(T, 10:13-18, 11:13-18, 12:13-18, 13:13-18, 14:13-18)',
        // Belt
        'spans(B, 15:10-21)',
        // Belt buckle
        'pixels(W, 15,15, 16,15)',

        // ── ARMS ──
        'spans(K, 12:8-9, 13:7-9, 14:7-9, 15:7-9, 16:7-8)',
        'spans(K, 12:22-23, 13:22-24, 14:22-24, 15:22-24, 16:23-24)',
        // Hands
        'spans(F, 17:7-8, 17:23-24)',

        // ── QUIVER (on back, right side) ──
        'pixels(Q, 23,4, 24,4, 23,5, 24,5, 23,6, 24,6, 23,7, 24,7, 23,8, 24,8, 23,9, 24,9, 23,10, 24,10, 23,11, 24,11, 23,12, 24,12)',
        // Arrow tips in quiver
        'pixels(H, 23,3, 24,3, 23,2)',

        // ── LEGS ──
        'spans(L, 16:12-15, 16:17-20, 17:12-15, 17:17-20, 18:12-15, 18:17-20, 19:12-14, 19:18-20, 20:12-14, 20:18-20, 21:13-14, 21:18-19)',

        // ── BOOTS ──
        'spans(O, 22:12-15, 22:17-20, 23:11-15, 23:17-21, 24:11-15, 24:17-21)',
      ],
      chars: {
        K: { name: 'cloak', role: 'body' },
        F: { name: 'skin', role: 'hand' },
        E: { name: 'eyes', role: 'eye' },
        W: { name: 'highlights', role: 'eye' },
        T: { name: 'tunic', role: 'head' },
        B: { name: 'belt', role: 'belt' },
        Q: { name: 'quiver', role: 'accessory' },
        H: { name: 'arrow_tips', role: 'arm' },
        L: { name: 'pants', role: 'leg' },
        O: { name: 'boots', role: 'boot' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#346524', highlight: '#6daa2c' },
        hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        arm:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    //  CREATURES
    // ═══════════════════════════════════════════════════════════

    // ─── SLIME ───────────────────────────────────────────────
    {
      id: 'slime_32',
      description: '32x32 green jelly slime with cute face, classic RPG enemy.',
      size: 32,
      draw: [
        // Body (blobby dome shape)
        'spans(B, 8:13-18, 9:11-20, 10:10-21, 11:9-22, 12:8-23, 13:7-24, 14:7-24, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:6-25, 20:7-24, 21:7-24, 22:8-23, 23:9-22)',
        // Base (spreads out)
        'spans(B, 24:8-23, 25:7-24, 26:7-24)',
        // Eyes (large, cute, 3x3 each)
        'spans(E, 14:11-13, 14:18-20, 15:11-13, 15:18-20, 16:11-13, 16:18-20)',
        // Eye highlights
        'pixels(H, 11,14, 18,14)',
        // Pupils
        'pixels(P, 12,15, 13,15, 19,15, 20,15, 12,16, 13,16, 19,16, 20,16)',
        // Mouth (smile)
        'pixels(M, 14,19, 15,20, 16,20, 17,20, 18,19)',
        // Body highlight (top-left sheen)
        'spans(S, 10:12-14, 11:11-13, 12:10-12)',
        // Drip (left side)
        'pixels(B, 7,25, 7,26, 7,27)',
      ],
      chars: {
        B: { name: 'slime_body', role: 'body' },
        E: { name: 'eye_white', role: 'eye' },
        H: { name: 'eye_highlight', role: 'eye' },
        P: { name: 'pupils', role: 'head' },
        M: { name: 'mouth', role: 'head' },
        S: { name: 'body_sheen', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#346524', highlight: '#346524' },
        accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── SKELETON ────────────────────────────────────────────
    {
      id: 'skeleton_32',
      description: '32x32 undead skeleton warrior with rusty sword.',
      size: 32,
      draw: [
        // ── SKULL ──
        'spans(B, 2:13-18, 3:12-19, 4:12-19, 5:12-19, 6:13-18, 7:14-17)',
        // Eye sockets (dark)
        'pixels(E, 13,4, 14,4, 17,4, 18,4, 13,5, 14,5, 17,5, 18,5)',
        // Nose
        'pixels(E, 15,5, 16,5)',
        // Jaw
        'spans(B, 8:14-17)',
        // Teeth
        'pixels(T, 14,7, 15,7, 16,7, 17,7)',

        // ── NECK (spine) ──
        'pixels(B, 15,9, 16,9)',

        // ── RIBCAGE ──
        'spans(B, 10:12-19, 11:11-12, 11:14-17, 11:19-20)',
        'spans(B, 12:11-12, 12:14-17, 12:19-20)',
        'spans(B, 13:11-12, 13:14-17, 13:19-20)',
        'spans(B, 14:12-13, 14:14-17, 14:18-19)',
        'spans(B, 15:13-18)',

        // ── SPINE ──
        'pixels(B, 15,16, 16,16, 15,17, 16,17)',

        // ── ARMS (bony, thin) ──
        'pixels(B, 10,10, 9,10, 10,9, 9,9, 8,11, 8,12, 8,13, 8,14, 8,15, 8,16, 8,17)',
        'pixels(B, 21,10, 22,10, 21,9, 22,9, 23,11, 23,12, 23,13, 23,14, 23,15, 23,16, 23,17)',
        // Hands (3 finger bones)
        'pixels(B, 7,17, 7,18, 8,18, 9,18)',
        'pixels(B, 24,17, 24,18, 23,18, 22,18)',

        // ── PELVIS ──
        'spans(B, 18:13-18, 19:13-14, 19:17-18)',

        // ── LEGS (bony) ──
        'pixels(B, 13,20, 14,20, 13,21, 14,21, 13,22, 14,22, 13,23, 14,23, 13,24, 14,24)',
        'pixels(B, 17,20, 18,20, 17,21, 18,21, 17,22, 18,22, 17,23, 18,23, 17,24, 18,24)',

        // ── FEET ──
        'spans(B, 25:12-15, 25:16-19, 26:11-15, 26:16-20)',

        // ── RUSTY SWORD (right hand) ──
        'pixels(S, 24,2, 24,3, 24,4, 24,5, 24,6, 24,7, 24,8, 24,9, 24,10, 24,11, 24,12, 24,13, 24,14, 24,15, 24,16)',
        // Sword guard
        'spans(S, 17:23-26)',
      ],
      chars: {
        B: { name: 'bone', role: 'body' },
        E: { name: 'eye_socket', role: 'eye' },
        T: { name: 'teeth', role: 'accessory' },
        S: { name: 'rusty_sword', role: 'head' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#757161' },
      },
    },

    // ─── BABY DRAGON ─────────────────────────────────────────
    {
      id: 'baby_dragon_32',
      description: '32x32 cute baby dragon with small wings and fire breath.',
      size: 32,
      draw: [
        // ── HORNS ──
        'pixels(H, 11,3, 12,2, 12,3, 20,3, 19,2, 19,3)',

        // ── HEAD (large, cute proportions) ──
        'spans(B, 4:12-19, 5:11-20, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:11-20, 11:12-19)',

        // ── EYES (big, expressive) ──
        'spans(E, 6:12-14, 6:17-19, 7:12-14, 7:17-19, 8:12-14, 8:17-19)',
        // Pupils (colored, dragon eyes!)
        'pixels(P, 13,7, 14,7, 18,7, 19,7, 13,8, 14,8, 18,8, 19,8)',
        // Eye highlights
        'pixels(W, 12,6, 17,6)',

        // ── SNOUT ──
        'spans(S, 9:13-18, 10:14-17)',
        // Nostrils
        'pixels(N, 14,9, 17,9)',

        // ── NECK ──
        'spans(B, 12:13-18, 13:14-17)',

        // ── BODY (chubby) ──
        'spans(B, 14:11-20, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:11-20)',

        // ── BELLY (lighter underbelly) ──
        'spans(V, 15:13-18, 16:13-18, 17:13-18, 18:13-18, 19:14-17)',

        // ── WINGS (small, stubby) ──
        'spans(G, 13:6-9, 14:5-9, 15:4-9, 16:5-8)',
        'spans(G, 13:22-25, 14:22-26, 15:22-27, 16:23-26)',
        // Wing membrane
        'spans(M, 14:6-8, 15:5-8)',
        'spans(M, 14:23-25, 15:23-26)',

        // ── LEGS (stubby) ──
        'spans(B, 21:11-14, 21:17-20, 22:11-14, 22:17-20, 23:10-14, 23:17-21)',
        // Claws
        'pixels(C, 10,24, 11,24, 13,24, 14,24, 17,24, 18,24, 20,24, 21,24)',

        // ── TAIL ──
        'pixels(B, 22,21, 22,22, 23,22, 23,23, 24,23, 24,24, 25,24, 25,25, 26,25)',
        // Tail tip
        'pixels(T, 26,26, 27,25, 27,26)',

        // ── FIRE BREATH (small puff) ──
        'pixels(F, 8,22, 8,23, 7,23, 7,24, 6,24, 9,23)',
      ],
      chars: {
        B: { name: 'scales', role: 'body' },
        H: { name: 'horns', role: 'head' },
        E: { name: 'eye_white', role: 'eye' },
        P: { name: 'pupils', role: 'accessory' },
        W: { name: 'eye_highlight', role: 'eye' },
        S: { name: 'snout', role: 'arm' },
        N: { name: 'nostrils', role: 'belt' },
        V: { name: 'belly', role: 'hand' },
        G: { name: 'wing_bone', role: 'leg' },
        M: { name: 'wing_membrane', role: 'boot' },
        C: { name: 'claws', role: 'belt' },
        T: { name: 'tail_tip', role: 'hair' },
        F: { name: 'fire', role: 'hair' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#d2aa99' },
        hand:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        boot:      { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        hair:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── BAT ─────────────────────────────────────────────────
    {
      id: 'bat_32',
      description: '32x32 cave bat with spread wings and red eyes.',
      size: 32,
      draw: [
        // ── BODY (small, furry) ──
        'spans(B, 12:14-17, 13:13-18, 14:13-18, 15:13-18, 16:14-17)',

        // ── HEAD ──
        'spans(B, 10:14-17, 11:13-18)',
        // Ears (pointy)
        'pixels(B, 13,8, 13,9, 14,9, 18,8, 18,9, 17,9)',
        // Red eyes
        'pixels(E, 14,10, 15,10, 17,10, 18,10)',
        // Fangs
        'pixels(F, 15,12, 16,12)',

        // ── WINGS (spread wide) ──
        // Left wing
        'spans(W, 10:5-13, 11:4-12, 12:3-13, 13:3-12, 14:2-12, 15:3-12, 16:4-13)',
        // Right wing
        'spans(W, 10:18-26, 11:19-27, 12:18-28, 13:19-28, 14:19-29, 15:19-28, 16:18-27)',
        // Wing fingers (bone lines)
        'pixels(G, 5,11, 6,11, 7,11, 8,11, 3,13, 4,13, 5,13, 2,15, 3,15, 4,15)',
        'pixels(G, 26,11, 25,11, 24,11, 23,11, 28,13, 27,13, 26,13, 29,15, 28,15, 27,15)',
        // Wing membrane highlight
        'pixels(H, 6,12, 8,14, 25,12, 23,14)',

        // ── FEET (tiny, dangling) ──
        'pixels(B, 14,17, 15,17, 16,17, 17,17)',
        'pixels(F, 14,18, 15,18, 16,18, 17,18)',
      ],
      chars: {
        B: { name: 'body_fur', role: 'body' },
        E: { name: 'red_eyes', role: 'eye' },
        F: { name: 'fangs_claws', role: 'accessory' },
        W: { name: 'wing_membrane', role: 'head' },
        G: { name: 'wing_bone', role: 'leg' },
        H: { name: 'wing_highlight', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#4e4a4e' },
        leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
      },
    },

  ],
};

export default batch;
