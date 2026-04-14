import { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'consumables',
  exportNames: {
    templates: 'COZY_BOOKS_32_TEMPLATES',
    schemes: 'COZY_BOOKS_32_COLOR_SCHEMES',
  },
  templates: [
    // ── 1. Red Leather Book ──
    {
      id: 'red_leather_book_32',
      description: 'Thick red leather-bound book with gold clasp',
      size: 32,
      draw: [
        // Spine (left edge)
        'spans(S, 8:8-10, 9:7-10, 10:7-9, 11:7-9, 12:7-9, 13:7-9, 14:7-9, 15:7-9, 16:7-9, 17:7-9, 18:7-9, 19:7-9, 20:7-9, 21:7-9, 22:8-10)',
        // Cover body
        'spans(B, 8:11-22, 9:11-23, 10:10-23, 11:10-23, 12:10-23, 13:10-23, 14:10-23, 15:10-23, 16:10-23, 17:10-23, 18:10-23, 19:10-23, 20:10-23, 21:10-23, 22:11-22)',
        // Cover shadow (bottom)
        'spans(D, 20:11-22, 21:11-22, 22:12-21)',
        // Cover highlight (top)
        'spans(H, 8:12-21, 9:12-15)',
        // Gold clasp
        'spans(G, 14:23-24, 15:23-25, 16:23-24)',
        // Pages (visible from side)
        'spans(P, 10:24-25, 11:24-25, 12:24-25, 13:24-25, 14:24-25, 15:24-25, 16:24-25, 17:24-25, 18:24-25, 19:24-25, 20:24-25)',
        // Title decoration
        'spans(G, 12:13-19, 13:13-19, 17:13-19, 18:13-19)',
      ],
      chars: {
        B: { name: 'cover', role: 'body' },
        S: { name: 'cover', role: 'body', tone: 'shadow' },
        D: { name: 'cover', role: 'body', tone: 'shadow' },
        H: { name: 'cover', role: 'body', tone: 'highlight' },
        G: { name: 'clasp', role: 'accent' },
        P: { name: 'pages', role: 'trim' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 2. Blue Spellbook ──
    {
      id: 'blue_spellbook_32',
      description: 'Blue magical spellbook with arcane symbol on cover',
      size: 32,
      draw: [
        // Spine
        'spans(S, 8:8-10, 9:7-10, 10:7-9, 11:7-9, 12:7-9, 13:7-9, 14:7-9, 15:7-9, 16:7-9, 17:7-9, 18:7-9, 19:7-9, 20:7-9, 21:7-9, 22:8-10)',
        // Cover
        'spans(B, 8:11-22, 9:11-23, 10:10-23, 11:10-23, 12:10-23, 13:10-23, 14:10-23, 15:10-23, 16:10-23, 17:10-23, 18:10-23, 19:10-23, 20:10-23, 21:10-23, 22:11-22)',
        // Shadow
        'spans(D, 20:11-22, 21:11-22, 22:12-21)',
        // Highlight
        'spans(H, 8:12-21, 9:12-15)',
        // Arcane symbol (diamond shape)
        'pixels(G, 15,11, 14,12, 16,12, 13,13, 17,13, 12,14, 18,14, 13,15, 17,15, 14,16, 16,16, 15,17)',
        // Corner accents
        'pixels(G, 10,10, 10,22, 21,10, 21,22)',
        // Pages
        'spans(P, 10:24-25, 11:24-25, 12:24-25, 13:24-25, 14:24-25, 15:24-25, 16:24-25, 17:24-25, 18:24-25, 19:24-25, 20:24-25)',
      ],
      chars: {
        B: { name: 'cover', role: 'body' },
        S: { name: 'cover', role: 'body', tone: 'shadow' },
        D: { name: 'cover', role: 'body', tone: 'shadow' },
        H: { name: 'cover', role: 'body', tone: 'highlight' },
        G: { name: 'symbol', role: 'accent' },
        P: { name: 'pages', role: 'trim' },
      },
      colors: {
        body: { base: '#597dce', shadow: '#30346d', highlight: '#8595a1' },
        accent: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 3. Green Herbalist Journal ──
    {
      id: 'green_herbalist_journal_32',
      description: 'Green journal with leaf emblem for herbalist notes',
      size: 32,
      draw: [
        // Spine
        'spans(S, 9:9-11, 10:8-11, 11:8-10, 12:8-10, 13:8-10, 14:8-10, 15:8-10, 16:8-10, 17:8-10, 18:8-10, 19:8-10, 20:8-10, 21:9-11)',
        // Cover
        'spans(B, 9:12-22, 10:12-22, 11:11-22, 12:11-22, 13:11-22, 14:11-22, 15:11-22, 16:11-22, 17:11-22, 18:11-22, 19:11-22, 20:11-22, 21:12-22)',
        // Shadow
        'spans(D, 19:12-21, 20:12-21, 21:13-21)',
        // Highlight
        'spans(H, 9:13-20, 10:13-15)',
        // Leaf emblem
        'spans(L, 13:15-17, 14:14-18, 15:14-18, 16:15-17)',
        'pixels(L, 17,16, 12,16)',
        // Binding cord
        'spans(C, 9:11, 10:11, 11:11, 12:11, 13:11, 14:11, 15:11, 16:11, 17:11, 18:11, 19:11, 20:11, 21:11)',
        // Pages
        'spans(P, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:23-24)',
      ],
      chars: {
        B: { name: 'cover', role: 'body' },
        S: { name: 'cover', role: 'body', tone: 'shadow' },
        D: { name: 'cover', role: 'body', tone: 'shadow' },
        H: { name: 'cover', role: 'body', tone: 'highlight' },
        L: { name: 'emblem', role: 'accent' },
        C: { name: 'cord', role: 'belt' },
        P: { name: 'pages', role: 'trim' },
      },
      colors: {
        body: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        accent: { base: '#dad45e', shadow: '#346524', highlight: '#deeed6' },
        belt: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 4. Ancient Scroll ──
    {
      id: 'ancient_scroll_32',
      description: 'Rolled parchment scroll with wooden dowels',
      size: 32,
      draw: [
        // Top dowel
        'spans(W, 9:8-23, 10:8-23)',
        'pixels(K, 9,7, 10,7, 9,24, 10,24)',
        // Bottom dowel
        'spans(W, 21:8-23, 22:8-23)',
        'pixels(K, 21,7, 22,7, 21,24, 22,24)',
        // Parchment body
        'spans(B, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22)',
        // Parchment shadow
        'spans(D, 11:9-10, 12:9-10, 13:9-10, 14:9-10, 15:9-10, 16:9-10, 17:9-10, 18:9-10, 19:9-10, 20:9-10)',
        // Parchment highlight
        'spans(H, 11:20-22, 12:20-22, 13:20-22, 14:20-22, 15:20-22, 16:20-22, 17:20-22, 18:20-22, 19:20-22, 20:20-22)',
        // Text lines
        'spans(T, 12:12-19, 14:12-18, 16:12-20, 18:12-17)',
      ],
      chars: {
        B: { name: 'parchment', role: 'body' },
        D: { name: 'parchment', role: 'body', tone: 'shadow' },
        H: { name: 'parchment', role: 'body', tone: 'highlight' },
        W: { name: 'dowel', role: 'trim' },
        K: { name: 'dowel_cap', role: 'trim', tone: 'shadow' },
        T: { name: 'text', role: 'accent' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#442434', shadow: '#140c1c', highlight: '#4e4a4e' },
      },
    },
    // ── 5. Magic Tome ──
    {
      id: 'magic_tome_32',
      description: 'Thick purple tome with glowing eye symbol',
      size: 32,
      draw: [
        // Spine
        'spans(S, 7:8-10, 8:7-10, 9:7-9, 10:7-9, 11:7-9, 12:7-9, 13:7-9, 14:7-9, 15:7-9, 16:7-9, 17:7-9, 18:7-9, 19:7-9, 20:7-9, 21:7-9, 22:7-9, 23:8-10)',
        // Cover
        'spans(B, 7:11-22, 8:11-23, 9:10-23, 10:10-23, 11:10-23, 12:10-23, 13:10-23, 14:10-23, 15:10-23, 16:10-23, 17:10-23, 18:10-23, 19:10-23, 20:10-23, 21:10-23, 22:10-23, 23:11-22)',
        // Shadow
        'spans(D, 21:11-22, 22:11-22, 23:12-21)',
        // Highlight
        'spans(H, 7:12-21, 8:12-15)',
        // Eye symbol
        'spans(G, 13:14-18, 14:13-19, 15:12-20, 16:13-19, 17:14-18)',
        'spans(E, 14:15-17, 15:14-18, 16:15-17)',
        'pixels(E, 15,16)',
        // Corner metal
        'pixels(M, 9,10, 9,22, 22,10, 22,22, 9,11, 9,21, 22,11, 22,21)',
        // Pages
        'spans(P, 10:24-25, 11:24-25, 12:24-25, 13:24-25, 14:24-25, 15:24-25, 16:24-25, 17:24-25, 18:24-25, 19:24-25, 20:24-25, 21:24-25)',
      ],
      chars: {
        B: { name: 'cover', role: 'body' },
        S: { name: 'cover', role: 'body', tone: 'shadow' },
        D: { name: 'cover', role: 'body', tone: 'shadow' },
        H: { name: 'cover', role: 'body', tone: 'highlight' },
        G: { name: 'eye_outer', role: 'accent' },
        E: { name: 'eye_inner', role: 'eye' },
        M: { name: 'metal', role: 'trim' },
        P: { name: 'pages', role: 'belt' },
      },
      colors: {
        body: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
        accent: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        eye: { base: '#6dc2ca', shadow: '#597dce', highlight: '#deeed6' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        belt: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 6. Open Book ──
    {
      id: 'open_book_32',
      description: 'Open book laying flat showing two pages of text',
      size: 32,
      draw: [
        // Spine (center)
        'spans(S, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16)',
        // Left page
        'spans(P, 10:7-14, 11:6-14, 12:6-14, 13:6-14, 14:6-14, 15:6-14, 16:6-14, 17:6-14, 18:6-14, 19:6-14, 20:6-14, 21:7-14)',
        // Right page
        'spans(P, 10:17-24, 11:17-25, 12:17-25, 13:17-25, 14:17-25, 15:17-25, 16:17-25, 17:17-25, 18:17-25, 19:17-25, 20:17-25, 21:17-24)',
        // Page shadow (inner edges)
        'spans(D, 10:13-14, 11:13-14, 12:13-14, 13:13-14, 14:13-14, 15:13-14, 16:13-14, 17:13-14, 18:13-14, 19:13-14, 20:13-14, 21:13-14)',
        'spans(D, 10:17-18, 11:17-18, 12:17-18, 13:17-18, 14:17-18, 15:17-18, 16:17-18, 17:17-18, 18:17-18, 19:17-18, 20:17-18, 21:17-18)',
        // Text lines left page
        'spans(T, 12:8-12, 14:8-11, 16:8-13, 18:8-10)',
        // Text lines right page
        'spans(T, 12:19-24, 14:19-23, 16:19-24, 18:19-22)',
        // Cover edges visible
        'spans(B, 9:6-7, 9:24-25, 22:6-7, 22:24-25)',
        'spans(B, 10:6, 11:5, 12:5, 13:5, 14:5, 15:5, 16:5, 17:5, 18:5, 19:5, 20:5, 21:6)',
        'spans(B, 10:25, 11:26, 12:26, 13:26, 14:26, 15:26, 16:26, 17:26, 18:26, 19:26, 20:26, 21:25)',
      ],
      chars: {
        P: { name: 'pages', role: 'body' },
        D: { name: 'pages', role: 'body', tone: 'shadow' },
        S: { name: 'spine', role: 'trim' },
        T: { name: 'text', role: 'accent' },
        B: { name: 'cover', role: 'belt' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        belt: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },
    // ── 7. Sealed Letter ──
    {
      id: 'sealed_letter_32',
      description: 'Folded parchment letter with red wax seal',
      size: 32,
      draw: [
        // Envelope body
        'spans(B, 11:8-23, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24, 20:7-24, 21:8-23)',
        // Shadow bottom
        'spans(D, 19:8-23, 20:8-23, 21:9-22)',
        // Highlight top
        'spans(H, 11:9-22, 12:8-12)',
        // Flap triangle
        'spans(F, 11:13-18, 12:14-17, 13:15-16)',
        // Wax seal
        'spans(W, 14:14-17, 15:13-18, 16:13-18, 17:14-17)',
        'pixels(G, 15,15, 15,16, 16,15, 16,16)',
      ],
      chars: {
        B: { name: 'paper', role: 'body' },
        D: { name: 'paper', role: 'body', tone: 'shadow' },
        H: { name: 'paper', role: 'body', tone: 'highlight' },
        F: { name: 'flap', role: 'trim' },
        W: { name: 'seal', role: 'accent' },
        G: { name: 'seal_stamp', role: 'accent', tone: 'highlight' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        trim: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        accent: { base: '#d04648', shadow: '#442434', highlight: '#d27d2c' },
      },
    },
    // ── 8. Treasure Map ──
    {
      id: 'treasure_map_32',
      description: 'Weathered treasure map with X marks the spot',
      size: 32,
      draw: [
        // Map body (slightly irregular edges)
        'spans(B, 8:8-22, 9:7-23, 10:7-24, 11:6-24, 12:6-24, 13:6-24, 14:6-24, 15:6-24, 16:6-24, 17:6-24, 18:6-24, 19:6-24, 20:7-24, 21:7-23, 22:8-22)',
        // Aged shadow
        'spans(D, 8:8-10, 9:7-9, 20:22-24, 21:21-23, 22:20-22)',
        // Highlight
        'spans(H, 10:20-23, 11:21-23, 12:22-23)',
        // Path lines
        'spans(T, 12:10-14, 13:14-16, 14:16-18, 15:17-18, 16:16-18, 17:14-16, 18:12-14)',
        // X mark
        'pixels(X, 11,10, 12,11, 13,12, 11,12, 12,11, 13,10)',
        'pixels(X, 11,11, 13,11)',
        // Compass rose dots
        'pixels(G, 18,20, 16,19, 16,21, 17,20, 19,20)',
        // Torn edges
        'pixels(D, 8,9, 22,21, 11,6, 19,24)',
      ],
      chars: {
        B: { name: 'parchment', role: 'body' },
        D: { name: 'parchment', role: 'body', tone: 'shadow' },
        H: { name: 'parchment', role: 'body', tone: 'highlight' },
        T: { name: 'path', role: 'trim' },
        X: { name: 'xmark', role: 'accent' },
        G: { name: 'compass', role: 'belt' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#d04648', shadow: '#442434', highlight: '#d27d2c' },
        belt: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },
    // ── 9. Diary with Lock ──
    {
      id: 'locked_diary_32',
      description: 'Small personal diary with a heart-shaped lock',
      size: 32,
      draw: [
        // Spine
        'spans(S, 9:9-11, 10:8-11, 11:8-10, 12:8-10, 13:8-10, 14:8-10, 15:8-10, 16:8-10, 17:8-10, 18:8-10, 19:8-10, 20:8-10, 21:9-11)',
        // Cover
        'spans(B, 9:12-21, 10:12-22, 11:11-22, 12:11-22, 13:11-22, 14:11-22, 15:11-22, 16:11-22, 17:11-22, 18:11-22, 19:11-22, 20:11-22, 21:12-21)',
        // Shadow
        'spans(D, 19:12-21, 20:12-21, 21:13-20)',
        // Highlight
        'spans(H, 9:13-20, 10:13-15)',
        // Heart lock
        'pixels(G, 14,16, 14,18, 15,15, 15,17, 15,19, 16,16, 16,18, 17,17)',
        // Strap
        'spans(G, 14:22-23, 15:22-23, 16:22-23)',
        // Pages
        'spans(P, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:23-24)',
      ],
      chars: {
        B: { name: 'cover', role: 'body' },
        S: { name: 'cover', role: 'body', tone: 'shadow' },
        D: { name: 'cover', role: 'body', tone: 'shadow' },
        H: { name: 'cover', role: 'body', tone: 'highlight' },
        G: { name: 'lock', role: 'accent' },
        P: { name: 'pages', role: 'trim' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 10. Quill and Ink ──
    {
      id: 'quill_and_ink_32',
      description: 'Feather quill pen resting in an ink pot',
      size: 32,
      draw: [
        // Ink pot body
        'spans(B, 17:12-19, 18:11-20, 19:11-20, 20:11-20, 21:11-20, 22:12-19)',
        // Ink pot shadow
        'spans(D, 21:12-19, 22:13-18)',
        // Ink pot highlight
        'spans(H, 17:13-15, 18:12-14)',
        // Ink surface
        'spans(I, 17:16-18, 18:15-19)',
        // Pot rim
        'spans(R, 16:11-20)',
        // Quill shaft (diagonal)
        'pixels(Q, 15,16, 14,17, 13,18, 12,19, 11,20, 10,21, 9,22, 8,23)',
        // Quill tip
        'pixels(T, 16,15, 17,15)',
        // Feather barbs
        'pixels(F, 8,22, 7,22, 7,23, 9,21, 10,20, 8,24, 7,24)',
        'pixels(F, 9,23, 10,22, 11,21)',
      ],
      chars: {
        B: { name: 'pot', role: 'body' },
        D: { name: 'pot', role: 'body', tone: 'shadow' },
        H: { name: 'pot', role: 'body', tone: 'highlight' },
        I: { name: 'ink', role: 'accent' },
        R: { name: 'rim', role: 'trim' },
        Q: { name: 'shaft', role: 'belt' },
        T: { name: 'tip', role: 'accent', tone: 'shadow' },
        F: { name: 'feather', role: 'trim', tone: 'highlight' },
      },
      colors: {
        body: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        accent: { base: '#30346d', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        belt: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },
    // ── 11. Recipe Book ──
    {
      id: 'recipe_book_32',
      description: 'Stained cooking recipe book with bookmark ribbon',
      size: 32,
      draw: [
        // Spine
        'spans(S, 9:9-11, 10:8-11, 11:8-10, 12:8-10, 13:8-10, 14:8-10, 15:8-10, 16:8-10, 17:8-10, 18:8-10, 19:8-10, 20:8-10, 21:9-11)',
        // Cover
        'spans(B, 9:12-22, 10:12-22, 11:11-22, 12:11-22, 13:11-22, 14:11-22, 15:11-22, 16:11-22, 17:11-22, 18:11-22, 19:11-22, 20:11-22, 21:12-22)',
        // Shadow
        'spans(D, 19:12-21, 20:12-21, 21:13-21)',
        // Highlight
        'spans(H, 9:13-20, 10:13-15)',
        // Fork & spoon icon
        'pixels(G, 13,15, 14,15, 15,15, 16,15, 17,15, 13,17, 14,17, 15,17, 16,17, 17,17)',
        'pixels(G, 12,15, 12,17, 18,16)',
        // Bookmark ribbon
        'spans(R, 7:18-19, 8:18-19, 9:18-19)',
        'pixels(R, 10,18, 10,19)',
        // Pages
        'spans(P, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:23-24)',
      ],
      chars: {
        B: { name: 'cover', role: 'body' },
        S: { name: 'cover', role: 'body', tone: 'shadow' },
        D: { name: 'cover', role: 'body', tone: 'shadow' },
        H: { name: 'cover', role: 'body', tone: 'highlight' },
        G: { name: 'icon', role: 'accent' },
        R: { name: 'ribbon', role: 'belt' },
        P: { name: 'pages', role: 'trim' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        accent: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        belt: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 12. Necromancy Grimoire ──
    {
      id: 'necromancy_grimoire_32',
      description: 'Dark grimoire with skull emblem and chain binding',
      size: 32,
      draw: [
        // Spine
        'spans(S, 8:8-10, 9:7-10, 10:7-9, 11:7-9, 12:7-9, 13:7-9, 14:7-9, 15:7-9, 16:7-9, 17:7-9, 18:7-9, 19:7-9, 20:7-9, 21:7-9, 22:8-10)',
        // Cover
        'spans(B, 8:11-22, 9:11-23, 10:10-23, 11:10-23, 12:10-23, 13:10-23, 14:10-23, 15:10-23, 16:10-23, 17:10-23, 18:10-23, 19:10-23, 20:10-23, 21:10-23, 22:11-22)',
        // Shadow
        'spans(D, 20:11-22, 21:11-22, 22:12-21)',
        // Skull emblem
        'spans(K, 12:14-18, 13:13-19, 14:13-19, 15:14-18)',
        'pixels(E, 13,15, 13,17, 14,15, 14,17)',
        'pixels(K, 16,15, 16,16, 16,17)',
        // Chain binding
        'pixels(C, 10,10, 12,10, 14,10, 16,10, 18,10, 20,10)',
        'pixels(C, 10,23, 12,23, 14,23, 16,23, 18,23, 20,23)',
        // Pages
        'spans(P, 10:24-25, 11:24-25, 12:24-25, 13:24-25, 14:24-25, 15:24-25, 16:24-25, 17:24-25, 18:24-25, 19:24-25, 20:24-25)',
      ],
      chars: {
        B: { name: 'cover', role: 'body' },
        S: { name: 'cover', role: 'body', tone: 'shadow' },
        D: { name: 'cover', role: 'body', tone: 'shadow' },
        K: { name: 'skull', role: 'accent' },
        E: { name: 'eyes', role: 'eye' },
        C: { name: 'chain', role: 'trim' },
        P: { name: 'pages', role: 'belt' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        accent: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        eye: { base: '#d04648', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        belt: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
      },
    },
    // ── 13. Bookshelf Stack ──
    {
      id: 'book_stack_32',
      description: 'Stack of three books piled horizontally',
      size: 32,
      draw: [
        // Bottom book (green, widest)
        'spans(G, 17:6-25, 18:6-25, 19:6-25, 20:6-25, 21:6-25)',
        'spans(V, 17:6-7, 18:6-7, 19:6-7, 20:6-7, 21:6-7)',
        'spans(X, 21:7-24)',
        // Middle book (blue)
        'spans(B, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23)',
        'spans(S, 12:8-9, 13:8-9, 14:8-9, 15:8-9, 16:8-9)',
        'spans(D, 16:10-22)',
        // Top book (red, smallest)
        'spans(R, 8:9-22, 9:9-22, 10:9-22, 11:9-22)',
        'spans(T, 8:9-10, 9:9-10, 10:9-10, 11:9-10)',
        'spans(U, 8:11-21)',
        // Page edges visible
        'spans(P, 17:24-25, 18:24-25, 19:24-25, 20:24-25)',
        'spans(P, 12:22-23, 13:22-23, 14:22-23, 15:22-23)',
        'spans(P, 8:21-22, 9:21-22, 10:21-22)',
      ],
      chars: {
        G: { name: 'book3', role: 'body' },
        V: { name: 'book3', role: 'body', tone: 'shadow' },
        X: { name: 'book3', role: 'body', tone: 'shadow' },
        B: { name: 'book2', role: 'accent' },
        S: { name: 'book2', role: 'accent', tone: 'shadow' },
        D: { name: 'book2', role: 'accent', tone: 'shadow' },
        R: { name: 'book1', role: 'trim' },
        T: { name: 'book1', role: 'trim', tone: 'shadow' },
        U: { name: 'book1', role: 'trim', tone: 'highlight' },
        P: { name: 'pages', role: 'belt' },
      },
      colors: {
        body: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        accent: { base: '#597dce', shadow: '#30346d', highlight: '#8595a1' },
        trim: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        belt: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 14. Scroll Case ──
    {
      id: 'scroll_case_32',
      description: 'Cylindrical leather scroll case with cap',
      size: 32,
      draw: [
        // Case body
        'spans(B, 8:13-18, 9:12-19, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:11-20, 19:11-20, 20:11-20, 21:12-19, 22:13-18)',
        // Shadow (right side)
        'spans(D, 8:17-18, 9:18-19, 10:19-20, 11:19-20, 12:19-20, 13:19-20, 14:19-20, 15:19-20, 16:19-20, 17:19-20, 18:19-20, 19:19-20, 20:19-20, 21:18-19, 22:17-18)',
        // Highlight (left side)
        'spans(H, 9:12-13, 10:11-12, 11:11-12, 12:11-12, 13:11-12, 14:11-12, 15:11-12, 16:11-12, 17:11-12, 18:11-12, 19:11-12, 20:11-12)',
        // Cap (top)
        'spans(C, 7:13-18, 8:12-19)',
        'spans(L, 7:14-17)',
        // Cap (bottom)
        'spans(C, 22:12-19, 23:13-18)',
        // Strap decoration
        'spans(G, 12:12-19, 18:12-19)',
        // Strap buckle
        'pixels(G, 15,11, 15,20)',
      ],
      chars: {
        B: { name: 'leather', role: 'body' },
        D: { name: 'leather', role: 'body', tone: 'shadow' },
        H: { name: 'leather', role: 'body', tone: 'highlight' },
        C: { name: 'cap', role: 'trim' },
        L: { name: 'cap', role: 'trim', tone: 'highlight' },
        G: { name: 'strap', role: 'accent' },
      },
      colors: {
        body: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
      },
    },
    // ── 15. Blank Journal ──
    {
      id: 'blank_journal_32',
      description: 'Simple brown leather journal with string tie',
      size: 32,
      draw: [
        // Spine
        'spans(S, 9:9-11, 10:8-11, 11:8-10, 12:8-10, 13:8-10, 14:8-10, 15:8-10, 16:8-10, 17:8-10, 18:8-10, 19:8-10, 20:8-10, 21:9-11)',
        // Cover
        'spans(B, 9:12-22, 10:12-22, 11:11-22, 12:11-22, 13:11-22, 14:11-22, 15:11-22, 16:11-22, 17:11-22, 18:11-22, 19:11-22, 20:11-22, 21:12-22)',
        // Shadow
        'spans(D, 19:12-21, 20:12-21, 21:13-21)',
        // Highlight
        'spans(H, 9:13-20, 10:13-15)',
        // String wrap
        'spans(T, 9:17, 10:17, 11:17, 12:17, 13:17, 14:17, 15:17, 16:17, 17:17, 18:17, 19:17, 20:17, 21:17)',
        'spans(T, 14:17-22, 15:22, 16:22)',
        // Pages
        'spans(P, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:23-24)',
      ],
      chars: {
        B: { name: 'cover', role: 'body' },
        S: { name: 'cover', role: 'body', tone: 'shadow' },
        D: { name: 'cover', role: 'body', tone: 'shadow' },
        H: { name: 'cover', role: 'body', tone: 'highlight' },
        T: { name: 'string', role: 'accent' },
        P: { name: 'pages', role: 'trim' },
      },
      colors: {
        body: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 16. Music Sheet ──
    {
      id: 'music_sheet_32',
      description: 'Sheet music with musical notes on staff lines',
      size: 32,
      draw: [
        // Paper
        'spans(B, 8:7-24, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24, 20:7-24, 21:7-24, 22:7-24, 23:7-24)',
        // Shadow
        'spans(D, 22:8-23, 23:8-23)',
        // Staff lines
        'spans(T, 10:9-22, 12:9-22, 14:9-22, 16:9-22, 18:9-22)',
        // Notes
        'pixels(N, 10,11, 10,12, 12,15, 12,16, 14,10, 14,11, 16,18, 16,19, 18,13, 18,14)',
        // Note stems
        'pixels(T, 9,12, 8,12, 11,16, 10,16, 13,11, 12,11, 15,19, 14,19, 17,14, 16,14)',
        // Treble clef area
        'spans(N, 10:9-10, 11:9, 12:9-10, 13:10, 14:9-10)',
      ],
      chars: {
        B: { name: 'paper', role: 'body' },
        D: { name: 'paper', role: 'body', tone: 'shadow' },
        T: { name: 'staff', role: 'trim' },
        N: { name: 'notes', role: 'accent' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#140c1c', shadow: '#140c1c', highlight: '#4e4a4e' },
      },
    },
    // ── 17. Wanted Poster ──
    {
      id: 'wanted_poster_32',
      description: 'Tattered wanted poster with reward text',
      size: 32,
      draw: [
        // Poster body
        'spans(B, 7:8-23, 8:7-24, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24, 20:7-24, 21:7-24, 22:8-23)',
        // Shadow
        'spans(D, 21:8-23, 22:9-22)',
        // WANTED text
        'spans(T, 8:10-21)',
        // Portrait frame
        'spans(F, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20)',
        // Portrait silhouette
        'spans(P, 11:14-17, 12:13-18, 13:13-18, 14:14-17, 15:13-18, 16:13-18)',
        // Reward text lines
        'spans(T, 18:10-21, 20:12-19)',
        // Nail
        'pixels(N, 7,15, 7,16, 6,15, 6,16)',
      ],
      chars: {
        B: { name: 'paper', role: 'body' },
        D: { name: 'paper', role: 'body', tone: 'shadow' },
        T: { name: 'text', role: 'accent' },
        F: { name: 'frame', role: 'trim' },
        P: { name: 'portrait', role: 'belt' },
        N: { name: 'nail', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        accent: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        belt: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },
    // ── 18. Spell Scroll (Glowing) ──
    {
      id: 'spell_scroll_glowing_32',
      description: 'Magical scroll with glowing runes and aura',
      size: 32,
      draw: [
        // Glow aura
        'pixels(A, 8,10, 8,21, 23,10, 23,21, 11,5, 11,26, 20,5, 20,26)',
        // Top dowel
        'spans(W, 9:8-23, 10:8-23)',
        'pixels(K, 9,7, 10,7, 9,24, 10,24)',
        // Bottom dowel
        'spans(W, 21:8-23, 22:8-23)',
        'pixels(K, 21,7, 22,7, 21,24, 22,24)',
        // Parchment
        'spans(B, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22)',
        // Glowing runes
        'spans(G, 12:11-13, 14:16-19, 16:11-14, 18:15-20)',
        'pixels(G, 13,14, 15,12, 17,18, 19,11)',
        // Rune glow
        'pixels(L, 12,10, 14,15, 16,10, 18,14, 12,14, 14,20, 16,15, 18,21)',
      ],
      chars: {
        B: { name: 'parchment', role: 'body' },
        W: { name: 'dowel', role: 'trim' },
        K: { name: 'dowel_cap', role: 'trim', tone: 'shadow' },
        G: { name: 'runes', role: 'accent' },
        L: { name: 'glow', role: 'accent', tone: 'highlight' },
        A: { name: 'aura', role: 'eye' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#6dc2ca', shadow: '#597dce', highlight: '#deeed6' },
        eye: { base: '#597dce', shadow: '#30346d', highlight: '#6dc2ca' },
      },
    },
    // ── 19. Bookmark ──
    {
      id: 'ornate_bookmark_32',
      description: 'Decorated leather bookmark with tassel',
      size: 32,
      draw: [
        // Main strip
        'spans(B, 5:14-17, 6:14-17, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17)',
        // Shadow edge
        'spans(D, 5:17, 6:17, 7:17, 8:17, 9:17, 10:17, 11:17, 12:17, 13:17, 14:17, 15:17, 16:17, 17:17, 18:17, 19:17, 20:17)',
        // Highlight edge
        'spans(H, 5:14, 6:14, 7:14, 8:14, 9:14, 10:14, 11:14, 12:14, 13:14, 14:14, 15:14)',
        // Pointed bottom
        'spans(B, 21:14-17, 22:15-16)',
        'pixels(B, 23,15)',
        // Top ornament
        'spans(G, 4:14-17, 5:13-18)',
        'pixels(G, 3,15, 3,16)',
        // Decorative pattern
        'pixels(G, 8,15, 8,16, 12,15, 12,16, 16,15, 16,16)',
        // Tassel threads
        'pixels(T, 24,14, 24,15, 24,16, 24,17, 25,14, 25,17, 26,14, 26,17)',
      ],
      chars: {
        B: { name: 'leather', role: 'body' },
        D: { name: 'leather', role: 'body', tone: 'shadow' },
        H: { name: 'leather', role: 'body', tone: 'highlight' },
        G: { name: 'ornament', role: 'accent' },
        T: { name: 'tassel', role: 'trim' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
    // ── 20. Newspaper ──
    {
      id: 'daily_newspaper_32',
      description: 'Folded newspaper with headline and columns',
      size: 32,
      draw: [
        // Paper body (folded)
        'spans(B, 8:6-25, 9:6-25, 10:6-25, 11:6-25, 12:6-25, 13:6-25, 14:6-25, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:6-25, 20:6-25, 21:6-25, 22:6-25)',
        // Shadow (fold & bottom)
        'spans(D, 14:7-24, 21:7-24, 22:7-24)',
        // Headline
        'spans(T, 9:8-23)',
        // Subheading line
        'spans(T, 10:8-18)',
        // Left column text
        'spans(L, 12:8-14, 13:8-14, 15:8-14, 16:8-14, 17:8-14, 18:8-14, 19:8-14, 20:8-14)',
        // Right column text
        'spans(L, 12:16-23, 13:16-23, 15:16-23, 16:16-23, 17:16-23, 18:16-23, 19:16-23, 20:16-23)',
        // Fold crease
        'spans(F, 14:6-25)',
      ],
      chars: {
        B: { name: 'paper', role: 'body' },
        D: { name: 'paper', role: 'body', tone: 'shadow' },
        T: { name: 'headline', role: 'accent' },
        L: { name: 'text', role: 'trim' },
        F: { name: 'fold', role: 'belt' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        accent: { base: '#140c1c', shadow: '#140c1c', highlight: '#4e4a4e' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        belt: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
      },
    },
  ],
};

export default batch;
