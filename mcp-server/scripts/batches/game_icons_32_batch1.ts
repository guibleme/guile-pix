/**
 * Game Icons 32x32 Batch 1 — Item / Inventory Icons (ASCII Grid)
 *
 * 20 recognizable RPG inventory icons at 32x32.
 * Neo-SNES style, DB16 palette only, colored selout, 4-5 roles per template.
 *
 * All templates use ASCII grid format (32 rows x 32 chars).
 * '.' = transparent, letters = colored pixels.
 *
 * Shading convention: light from top-left.
 *   H/highlight = top-left edges
 *   B/base = main body fill
 *   b/shadow = bottom-right edges
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'game_icons_32',
  exportNames: { templates: 'GAME_ICONS_32_BATCH1_TEMPLATES', schemes: 'GAME_ICONS_32_BATCH1_COLOR_SCHEMES' },
  templates: [

    // =====================================================================
    //  1. BACKPACK — adventurer's leather backpack
    //  Cols: 0         1         2         3
    //        0123456789012345678901234567890123
    // =====================================================================
    {
      id: 'backpack_icon_32',
      description: 'Adventurer leather backpack with front flap, buckle, and shoulder straps.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '.........FFFFFFFFFFF............', // r3
        '........FHHHHHHHHHHHF...........',// r4
        '........FHHHHHHHHHHHF...........',// r5
        '........FFFFFFFFFFFFFF..........',// r6
        '.......FFHBBBBBBBBBBFF..........',// r7
        '......TTBBBBBBBBBBBBBBTT........',// r8
        '......TTBBBBBBBBBBBBBBTT........',// r9
        '......TTHBBBBBBBBBBBBBTT........',// r10
        '......TTHBBBBBBBBBBBBBTT........',// r11
        '......TTHBBBBMMMBBBBBFTT........',// r12
        '......TTHBBBBMMMBBBBBFTT........',// r13
        '......TTHBBBBBBBBBBBBBTT........',// r14
        '......TTHBBBBBBBBBBBBFTT........',// r15
        '......TTHBBBBBBBBBBBBFTT........',// r16
        '......TTHBBBBBBBBBBBBFTT........',// r17
        '......TTHBBBBBBBBBBBBFTT........',// r18
        '......TTHBBBBBBBBBBBBFTT........',// r19
        '......TTHBBBBBBBBBBBBFTT........',// r20
        '......TTBBBBBBBBBBBBBBTT........',// r21
        '......TTBBBBBBBBBBBBBBTT........',// r22
        '.......TffffffffffffffT.........',// r23
        '.......TFFFFFFFFFFFFFFT.........',// r24
        '........TTTTTTTTTTTTTT..........',// r25
        '................................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'body_base', role: 'body' },
        f: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        F: { name: 'flap_base', role: 'head' },
        M: { name: 'buckle_base', role: 'accessory' },
        T: { name: 'strap_base', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // =====================================================================
    //  2. SATCHEL — messenger bag with curved flap
    // =====================================================================
    {
      id: 'satchel_icon_32',
      description: 'Leather messenger satchel with curved flap and single strap.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '..............TT................', // r3
        '.............TTTT...............', // r4
        '............TT..TT..............', // r5
        '...........TT....TT.............', // r6
        '..........TT......TT............', // r7
        '.......FFFFFFFFFFFFFFFFFFF......', // r8
        '......FHHHHHHHHHHHHHHHHHHFF.....',// r9
        '......FHHHHHHHHHHHHHHHHHHFF.....',// r10
        '.....FFFFFFFFFFFFFFFFFFFFFF.....',// r11
        '.....FHBBBBBBBBBBBBBBBBBBFF.....',// r12
        '.....FHBBBBBBBBBBBBBBBBBBFF.....',// r13
        '......HBBBBBBBBBBBBBBBBBBBF.....',// r14
        '......HBBBBBBMMMBBBBBBBBBFF.....',// r15
        '......HBBBBBBMMMBBBBBBBBBFF.....',// r16
        '......HBBBBBBBBBBBBBBBBBBBF.....',// r17
        '......HBBBBBBBBBBBBBBBBBBBF.....',// r18
        '......HBBBBBBBBBBBBBBBBBBBF.....',// r19
        '......HBBBBBBBBBBBBBBBBBBbF.....',// r20
        '......fBBBBBBBBBBBBBBBBBBbF.....',// r21
        '.......fffffffffffffffffff......', // r22
        '.......TTTTTTTTTTTTTTTTTTT......', // r23
        '................................', // r24
        '................................', // r25
        '................................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'body_base', role: 'body' },
        b: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        f: { name: 'body_dark', role: 'body', tone: 'shadow' },
        F: { name: 'flap_base', role: 'head' },
        M: { name: 'buckle_base', role: 'accessory' },
        T: { name: 'strap_base', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // =====================================================================
    //  3. BOOK — closed hardcover book
    // =====================================================================
    {
      id: 'book_icon_32',
      description: 'Closed hardcover book with visible spine and page edges.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '................................', // r3
        '.......SSHHHHHHHHHHHHHHHH.......', // r4
        '.......SSHHHHHHHHHHHHHHHH.......', // r5
        '.......SSBBBBBBBBBBBBBBBH.......', // r6
        '.......SSBBBBBBBBBBBBBBBH.......', // r7
        '.......SSBBBBBBBBBBBBBBBH.......', // r8
        '.......SSBBBBBBBBBBBBBBBH.......', // r9
        '.......SSBBBBBBBBBBBBBBBH.......', // r10
        '.......SSBBBBBBBBBBBBBBBH.......', // r11
        '.......SSBBBBBBBBBBBBBBBH.......', // r12
        '.......SSBBBBBBBBBBBBBBBH.......', // r13
        '.......SSBBBBBBBBBBBBBBBH.......', // r14
        '.......SSBBBBBBBBBBBBBBBH.......', // r15
        '.......SSBBBBBBBBBBBBBBBH.......', // r16
        '.......SSBBBBBBBBBBBBBBBH.......', // r17
        '.......SSBBBBBBBBBBBBBBBH.......', // r18
        '.......SSBBBBBBBBBBBBBBBH.......', // r19
        '.......SSBBBBBBBBBBBBBBBH.......', // r20
        '.......SSBBBBBBBBBBBBBBBH.......', // r21
        '.......SSBBBBBBBBBBBBBBBH.......', // r22
        '.......SSBBBBBBBBBBBBBBBH.......', // r23
        '.......SSbbbbbbbbbbbbbPPb.......', // r24
        '.......SSbbbbbbbbbbbbbPPb.......', // r25
        '.......SSbbbbbbbbbbbbbPPb.......', // r26
        '.......SSbbbbbbbbbbbbbbbb.......', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'cover_base', role: 'body' },
        b: { name: 'cover_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'cover_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'spine_base', role: 'accessory' },
        P: { name: 'pages_base', role: 'head' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // =====================================================================
    //  4. SPELLBOOK — book with glowing rune on cover
    // =====================================================================
    {
      id: 'spellbook_icon_32',
      description: 'Arcane spellbook with glowing rune on purple cover and metal corners.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '................................', // r3
        '.......CCHHHHHHHHHHHHHHCC.......', // r4
        '.......SSHHHHHHHHHHHHHHHH.......', // r5
        '.......SSBBBBBBBBBBBBBBBH.......', // r6
        '.......SSBBBBBBBBBBBBBBBH.......', // r7
        '.......SSBBBBBBBBBBBBBBBH.......', // r8
        '.......SSBBBBBRRRBBBBBBBH.......', // r9
        '.......SSBBBBRRRRRBBBBBHH.......', // r10
        '.......SSBBBBRRRRRBBBBBHH.......', // r11
        '.......SSBBBRRRRRRRBBBBBH.......', // r12
        '.......SSBBBRRRRRRRBBBBBH.......', // r13
        '.......SSBBBBRRRRRBBBBBHH.......', // r14
        '.......SSBBBBRRRRRBBBBBHH.......', // r15
        '.......SSBBBBBRRRBBBBBBBH.......', // r16
        '.......SSBBBBBBBBBBBBBBBH.......', // r17
        '.......SSBBBBBBBBBBBBBBBH.......', // r18
        '.......SSBBBBBBBBBBBBBBBH.......', // r19
        '.......SSBBBBBBBBBBBBBBBH.......', // r20
        '.......SSBBBBBBBBBBBBBBBH.......', // r21
        '.......SSBBBBBBBBBBBBBBBH.......', // r22
        '.......SSBBBBBBBBBBBBBBBH.......', // r23
        '.......SSbbbbbbbbbbbPPbbb.......', // r24
        '.......SSbbbbbbbbbbbPPbbb.......', // r25
        '.......SSbbbbbbbbbbbPPbbb.......', // r26
        '.......CCbbbbbbbbbbbbbbCC.......', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'cover_base', role: 'body' },
        b: { name: 'cover_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'cover_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'spine_base', role: 'accessory' },
        R: { name: 'rune_glow', role: 'eye' },
        P: { name: 'pages_base', role: 'head' },
        C: { name: 'corner_metal', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        accessory: { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
        eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        head:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // =====================================================================
    //  5. SCROLL — rolled parchment scroll with ribbon
    // =====================================================================
    {
      id: 'scroll_icon_32',
      description: 'Rolled parchment scroll with decorative ribbon tie.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '.........HHBBBBBBBBBBHH.........', // r3
        '........HHBBBBBBBBBBBBhh........', // r4
        '.......HHBBBBBBBBBBBBBBhh.......', // r5
        '.......HhBBBBBBBBBBBBBBhh.......', // r6
        '........hBBBBBBBBBBBBBBh........', // r7
        '.........BBBBBBBBBBBBBB.........', // r8
        '.........BBBBBBBBBBBBBB.........', // r9
        '.........BBBBBBBBBBBBBB.........', // r10
        '.........BBBBBBBBBBBBBB.........', // r11
        '.........BBRRRRRRRRBBB..........', // r12
        '.........BBRRRRRRRRBBB..........', // r13
        '.........BBBBBBBBBBBBBB.........', // r14
        '.........BBBBBBBBBBBBBB.........', // r15
        '.........BBBBBBBBBBBBBB.........', // r16
        '.........BBBBBBBBBBBBBB.........', // r17
        '.........BBBBBBBBBBBBBB.........', // r18
        '.........BBBBBBBBBBBBBB.........', // r19
        '.........BBBBBBBBBBBBBB.........', // r20
        '.........BBBBBBBBBBBBBB.........', // r21
        '.........BBBBBBBBBBBBBB.........', // r22
        '.........BBBBBBBBBBBBBB.........', // r23
        '........hBBBBBBBBBBBBBBh........', // r24
        '.......HhBBBBBBBBBBBBBBhh.......', // r25
        '.......HHBBBBBBBBBBBBBBhh.......', // r26
        '........HHBBBBBBBBBBBBhh........', // r27
        '.........hhBBBBBBBBBBhh.........', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'parchment_base', role: 'body' },
        H: { name: 'parchment_highlight', role: 'body', tone: 'highlight' },
        h: { name: 'parchment_shadow', role: 'body', tone: 'shadow' },
        R: { name: 'ribbon_base', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // =====================================================================
    //  6. KEY — ornate golden key
    // =====================================================================
    {
      id: 'key_icon_32',
      description: 'Ornate golden key with circular bow and toothed bit.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '...........HHHHHHHH.............', // r3
        '..........HHBBBBBBhh............', // r4
        '.........HBBB....BBBh...........', // r5
        '.........HBB......BBh...........', // r6
        '.........HBB......BBh...........', // r7
        '.........HBB......BBh...........', // r8
        '.........HBBB....BBBh...........', // r9
        '..........HHBBBBBBhh............', // r10
        '...........HHBBBBhh.............', // r11
        '.............BBB................', // r12
        '.............BBB................', // r13
        '.............BBB................', // r14
        '.............BBB................', // r15
        '.............BBB................', // r16
        '.............BBB................', // r17
        '.............BBB................', // r18
        '.............BBB................', // r19
        '.............BBBhh..............', // r20
        '.............BBBBBhh............', // r21
        '.............BBBhh..............', // r22
        '.............BBBhh..............', // r23
        '.............BBBBBhh............', // r24
        '.............BBBhh..............', // r25
        '..............hh................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'metal_base', role: 'body' },
        H: { name: 'metal_highlight', role: 'body', tone: 'highlight' },
        h: { name: 'metal_shadow', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // =====================================================================
    //  7. LOCKPICK — thin metal lockpick tool
    // =====================================================================
    {
      id: 'lockpick_icon_32',
      description: 'Thin steel lockpick with textured handle grip.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '.........HHH...................', // r3
        '..........BHH..................', // r4
        '...........BBH.................', // r5
        '............BBH................', // r6
        '.............BBH...............', // r7
        '..............BB...............', // r8
        '...............BB..............', // r9
        '................BB.............', // r10
        '.................BB............', // r11
        '..................BB...........', // r12
        '...................BB..........', // r13
        '....................BB.........', // r14
        '.....................BB........', // r15
        '......................BB.......', // r16
        '.......................BB......', // r17
        '........................GG.....', // r18
        '........................GGG....', // r19
        '.........................GGG...', // r20
        '.........................GGG...', // r21
        '..........................GGG..', // r22
        '..........................GGG..', // r23
        '..........................GGG..', // r24
        '...........................GG..', // r25
        '................................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'pick_base', role: 'body' },
        H: { name: 'pick_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'grip_base', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // =====================================================================
    //  8. GEM — faceted gemstone
    // =====================================================================
    {
      id: 'gem_icon_32',
      description: 'Faceted blue gemstone with brilliant highlights.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '................................', // r3
        '................................', // r4
        '...........HHHHHHHHH...........', // r5
        '..........HHHHHHHHHHb..........', // r6
        '.........HHHBBBBBBBBbb.........', // r7
        '........HHBBBBBBBBBBBbb........', // r8
        '.......HHBBBBBBBBBBBBBbb.......', // r9
        '......HHBBBBBBBBBBBBBBBbb......', // r10
        '.....HHBBBBBBBBBBBBBBBBBbb.....', // r11
        '....HHBBBBBBBBBBBBBBBBBBBbb....', // r12
        '....HBBBBBBBBBBBBBBBBBBBBBb....', // r13
        '.....HBBBBBBBBBBBBBBBBBBBbb....', // r14
        '......HBBBBBBBBBBBBBBBBBbb.....', // r15
        '.......hBBBBBBBBBBBBBBBbb......', // r16
        '........hBBBBBBBBBBBBBbb.......', // r17
        '.........hBBBBBBBBBBBbb........', // r18
        '..........hBBBBBBBBBbb.........', // r19
        '...........hBBBBBBBbb..........', // r20
        '............hBBBBBbb...........', // r21
        '.............hBBBbb............', // r22
        '..............hBbb.............', // r23
        '................................', // r24
        '................................', // r25
        '................................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'gem_base', role: 'body' },
        H: { name: 'gem_highlight', role: 'body', tone: 'highlight' },
        h: { name: 'gem_dark', role: 'body', tone: 'shadow' },
        b: { name: 'gem_shadow', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
      },
    },

    // =====================================================================
    //  9. RING — golden ring with gemstone
    // =====================================================================
    {
      id: 'ring_icon_32',
      description: 'Golden ring with a small gemstone set on top.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '................................', // r3
        '................................', // r4
        '................................', // r5
        '.............GGGGG..............', // r6
        '............GGGGGGG.............', // r7
        '............GGGGGGG.............', // r8
        '.............GGGGG..............', // r9
        '..........HHHHHHHHHH............', // r10
        '........HHBBBBBBBBBBhh..........', // r11
        '.......HBBBBBBBBBBBBBBh.........', // r12
        '.......HBB..........BBh.........', // r13
        '.......HBB..........BBh.........', // r14
        '.......HBB..........BBh.........', // r15
        '.......HBB..........BBh.........', // r16
        '.......HBBb........bBBh.........', // r17
        '........HBBb......bBBh..........', // r18
        '.........HBBBBBBBBBBh...........', // r19
        '..........hhhhhhhhhh............', // r20
        '................................', // r21
        '................................', // r22
        '................................', // r23
        '................................', // r24
        '................................', // r25
        '................................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'band_base', role: 'body' },
        H: { name: 'band_highlight', role: 'body', tone: 'highlight' },
        h: { name: 'band_shadow', role: 'body', tone: 'shadow' },
        b: { name: 'band_dark', role: 'body', tone: 'shadow' },
        G: { name: 'gem_base', role: 'eye' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:  { shadow: '#30346d', base: '#d04648', highlight: '#dad45e' },
      },
    },

    // =====================================================================
    //  10. POTION — round flask with cork
    // =====================================================================
    {
      id: 'potion_icon_32',
      description: 'Round glass potion flask with cork stopper and colored liquid.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '..............CCC...............', // r3
        '..............CCC...............', // r4
        '.............BNNNNB.............', // r5
        '.............BNNNNB.............', // r6
        '............BBNNNNBB............', // r7
        '...........HBBBBBBBBG...........', // r8
        '..........HHBBBBBBBBGg..........', // r9
        '.........HHBBBBBBBBBBGg.........', // r10
        '........HHBBBBBBBBBBBBGg........', // r11
        '.......HHBBBBBBBBBBBBBBGg.......', // r12
        '.......HBBBBBBBBBBBBBBBBGg......', // r13
        '......HLLLLLLLLLLLLLLLLLGg......', // r14
        '......HLLLLLLLLLLLLLLLLLGg......', // r15
        '......HLLLLLLLLLLLLLLLLLGg......', // r16
        '......HLLLLLLLLLLLLLLLLLlg......', // r17
        '......HLLLLLLLLLLLLLLLLLlg......', // r18
        '......HLLLLLLLLLLLLLLLLLlg......', // r19
        '.......HLLLLLLLLLLLLLLLlGg......', // r20
        '.......HLLLLLLLLLLLLLLLlg.......', // r21
        '........HLLLLLLLLLLLLLlg........', // r22
        '.........HLLLLLLLLLLLlg.........', // r23
        '..........gglllllllggg..........', // r24
        '...........gggggggggg...........', // r25
        '................................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'glass_base', role: 'body' },
        H: { name: 'glass_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'glass_shadow', role: 'body', tone: 'shadow' },
        g: { name: 'glass_dark', role: 'belt' },
        L: { name: 'liquid_base', role: 'head' },
        l: { name: 'liquid_shadow', role: 'head', tone: 'shadow' },
        N: { name: 'neck_base', role: 'accessory' },
        C: { name: 'cork_base', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        arm:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // =====================================================================
    //  11. FOOD PLATE — plate with drumstick
    // =====================================================================
    {
      id: 'food_plate_icon_32',
      description: 'Oval plate with a roasted drumstick and bone.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '................................', // r3
        '................................', // r4
        '................................', // r5
        '..........MMMMMM...............', // r6
        '.........MHHHHHHMm..............', // r7
        '........MHHHHHHHHMm.............', // r8
        '........MHHHHHHHHHMm............', // r9
        '........MHHHHHHHBBBm............', // r10
        '.........MMMMHHBBBBm............', // r11
        '.............BBBBB..............', // r12
        '.......PPPPPPPPPPPPPPPP.........', // r13
        '......PHHHHHHHHHHHHHHHHP........', // r14
        '.....PHHHHHHHHHHHHHHHHHp.......', // r15
        '....PHHHHHHHHHHHHHHHHHHHp......', // r16
        '....PHHHHHHHHHHHHHHHHHHHp......', // r17
        '....PHHHHHHHHHHHHHHHHHHHp......', // r18
        '....PHHHHHHHHHHHHHHHHHHpp......', // r19
        '.....PHHHHHHHHHHHHHHHHpp.......', // r20
        '.....PPHHHHHHHHHHHHHHpp........', // r21
        '......PPHHHHHHHHHHHPPp.........', // r22
        '.......PPPPPPPPPPPPPp..........', // r23
        '........pppppppppppp...........', // r24
        '................................', // r25
        '................................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        P: { name: 'plate_base', role: 'body' },
        p: { name: 'plate_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'plate_highlight', role: 'body', tone: 'highlight' },
        M: { name: 'meat_base', role: 'head' },
        m: { name: 'meat_shadow', role: 'head', tone: 'shadow' },
        B: { name: 'bone_base', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // =====================================================================
    //  12. MAP — treasure map with X mark
    // =====================================================================
    {
      id: 'map_icon_32',
      description: 'Rolled-out treasure map with X mark and dotted path.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '.....CCCCCCCCCCCCCCCCCCCC.......', // r3
        '....CHHHHHHHHHHHHHHHHHHHHC......', // r4
        '....CHBBBBBBBBBBBBBBBBBBBC......', // r5
        '....CHBBBBBBBBBBBBBBBBBBBC......', // r6
        '....CHBBBDDBBBBBBBBBBBBBC......', // r7
        '....CHBBBBDDBBBBBBBBBBHBC......', // r8
        '....CHBBBBBDDBBBBBBBBBBBC......', // r9
        '....CHBBBBBBDDBBBBBBBBHBC......', // r10
        '....CHBBBBBBBDDBBBBBBBBBC......', // r11
        '....CHBBBBBBBBDDBBXXBBHBC......', // r12
        '....CHBBBBBBBBBDDXXXXBBBC......', // r13
        '....CHBBBBBBBBBBDDXXBBHBC......', // r14
        '....CHBBBBBBBBBBBBBBBBBBBC......', // r15
        '....CHBBBBBBBBBBBBBBBBBBBC......', // r16
        '....CHBBBBBBBBBBBBBBBBBBBC......', // r17
        '....CHBBBBBBBBBBBBBBBBBBBC......', // r18
        '....CHBBBBBBBBBBBBBBBBBBBC......', // r19
        '....CHBBBBBBBBBBBBBBBBBBBC......', // r20
        '....CHBBBBBBBBBBBBBBBBBbbc......', // r21
        '....CHBBBBBBBBBBBBBBBBBbbc......', // r22
        '....CHBBBBBBBBBBBBBBBBBbbc......', // r23
        '.....CHBBBBBBBBBBBBBBBBbC......', // r24
        '......ccccccccccccccccccc.......', // r25
        '................................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'parchment_base', role: 'body' },
        b: { name: 'parchment_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'parchment_highlight', role: 'body', tone: 'highlight' },
        C: { name: 'edge_base', role: 'accessory' },
        c: { name: 'edge_shadow', role: 'accessory', tone: 'shadow' },
        D: { name: 'path_ink', role: 'belt' },
        X: { name: 'mark_base', role: 'eye' },
        x: { name: 'mark_detail', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // =====================================================================
    //  13. COMPASS — navigation compass with needle
    // =====================================================================
    {
      id: 'compass_icon_32',
      description: 'Navigation compass with bronze frame, cream face, and red needle.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '................................', // r3
        '..........FFFFFFFFFFF..........', // r4
        '........FFHHHHHHHHHHHff........', // r5
        '.......FHHHHHHHHHHHHHHHf.......', // r6
        '......FHHBBBBBBBBBBBBBHhf......', // r7
        '.....FHBBBBBBBBBBBBBBBBBhf.....', // r8
        '.....FHBBBBBBBNBBBBBBBBBBF.....', // r9
        '....FHBBBBBBBNNBBBBBBBBBBhf....', // r10
        '....FHBBBBBBBNNBBBBBBBBBBhf....', // r11
        '....FHBBBBBBBNBBBBBBBBBBB.f....', // r12
        '....FHBBBBBBBBBBBBBBBBBBB.f....', // r13
        '....FHBBBBBBBBBBBBBBBBBBBBhf...', // r14
        '....FHBBBBBBBBBBBBBBBBBBBBhf...', // r15
        '....FHBBBBBBBBBBBBBBBBBBB.f....', // r16
        '....FHBBBBBBBnBBBBBBBBBBBhf....', // r17
        '.....FHBBBBBBnnBBBBBBBBBhf.....', // r18
        '.....FHBBBBBBnnBBBBBBBBhhf.....', // r19
        '.....FHBBBBBBBnBBBBBBBBhf......', // r20
        '......FHBBBBBBBBBBBBBBBhf......', // r21
        '......FHHBBBBBBBBBBBBBhhf......', // r22
        '.......FHHHBBBBBBBBBHHhf.......', // r23
        '........FFHHHHHHHHHHHhf........', // r24
        '.........fffffffffff.ff........', // r25
        '..........fffffffffff..........', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        F: { name: 'frame_base', role: 'accessory' },
        f: { name: 'frame_shadow', role: 'accessory', tone: 'shadow' },
        H: { name: 'frame_highlight', role: 'accessory', tone: 'highlight' },
        B: { name: 'face_base', role: 'body' },
        h: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        N: { name: 'needle_north', role: 'eye' },
        n: { name: 'needle_south', role: 'belt' },
      },
      colors: {
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        body:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // =====================================================================
    //  14. TORCH — wooden torch with flame
    // =====================================================================
    {
      id: 'torch_icon_32',
      description: 'Wooden torch with flickering flame on top.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '..............FF................', // r2
        '.............FFFF...............', // r3
        '............FFFFFF..............', // r4
        '...........FFFFFFFF.............', // r5
        '...........FFRRRRRFF............', // r6
        '..........FFRRRRRRRF............', // r7
        '..........FFRRRRRRFF............', // r8
        '...........FRRRRRRFF............', // r9
        '...........FFRRRRFF.............', // r10
        '............FFFFFFF.............', // r11
        '.............FFFFF..............', // r12
        '..............BBB...............', // r13
        '..............BHB...............', // r14
        '..............BHB...............', // r15
        '..............BHB...............', // r16
        '..............BBb...............', // r17
        '..............BBb...............', // r18
        '..............BBb...............', // r19
        '..............BBb...............', // r20
        '..............BBb...............', // r21
        '..............BBb...............', // r22
        '..............BBb...............', // r23
        '..............BBb...............', // r24
        '..............BBb...............', // r25
        '..............bbb...............', // r26
        '...............bb...............', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        F: { name: 'flame_outer', role: 'head' },
        R: { name: 'flame_inner', role: 'eye' },
        B: { name: 'handle_base', role: 'body' },
        H: { name: 'handle_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'handle_shadow', role: 'body', tone: 'shadow' },
      },
      colors: {
        head: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:  { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
      },
    },

    // =====================================================================
    //  15. LANTERN — hanging lantern with glow
    // =====================================================================
    {
      id: 'lantern_icon_32',
      description: 'Metal lantern with glass panels showing warm glow inside.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '..............TTT...............', // r2
        '.............TTTTT..............', // r3
        '..............TTT...............', // r4
        '............FFFFFFF.............', // r5
        '...........FFFFFFFFF............', // r6
        '...........FFGGGGGFF............', // r7
        '...........FFGGGGGFF............', // r8
        '...........FFGGGGGFF............', // r9
        '...........FFGGGGGFF............', // r10
        '...........FFGGgGGFF............', // r11
        '...........FFGGgGGFF............', // r12
        '...........FFGGgGGFF............', // r13
        '...........FFGGgGGFF............', // r14
        '...........FFGGgGGFF............', // r15
        '...........FFGGgGGFF............', // r16
        '...........FFGGgGGFF............', // r17
        '...........FFGGGGGFF............', // r18
        '...........FFGGGGGFF............', // r19
        '...........FFGGGGGFF............', // r20
        '...........FFFFFFFFF............', // r21
        '............FBBBBBf.............', // r22
        '............FBBBBBf.............', // r23
        '.............FBBBf..............', // r24
        '..............fff...............', // r25
        '................................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        F: { name: 'frame_base', role: 'body' },
        f: { name: 'frame_shadow', role: 'body', tone: 'shadow' },
        T: { name: 'handle_base', role: 'accessory' },
        G: { name: 'glow_base', role: 'eye' },
        g: { name: 'glow_bright', role: 'head' },
        B: { name: 'base_plate', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // =====================================================================
    //  16. ROPE — coiled rope
    // =====================================================================
    {
      id: 'rope_icon_32',
      description: 'Neatly coiled rope bundle.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '................................', // r3
        '................................', // r4
        '................................', // r5
        '.........HHHHHHHHHH.............', // r6
        '........HBBBBBBBBBBh............', // r7
        '.......HBBBBBBBBBBBBh...........', // r8
        '......HBBBbbbbbbBBBBBh..........', // r9
        '......HBBb......bBBBBh..........', // r10
        '.....HBBb........bBBBBh.........', // r11
        '.....HBBb........bBBBBh.........', // r12
        '.....HBBb........bBBBBh.........', // r13
        '.....HBBb........bBBBBh.........', // r14
        '......HBBb......bBBBBh..........', // r15
        '......HBBBbbbbbbBBBBBh..........', // r16
        '.......HBBBBBBBBBBBBh...........', // r17
        '........HBBBBBBBBBBh............', // r18
        '.........HHHHHHHHHH.............', // r19
        '........HBBBBBBBBBBh............', // r20
        '.......HBBBBBBBBBBBBh...........', // r21
        '......HBBBbbbbbbBBBBBh..........', // r22
        '......HBBBBBBBBBBBBBBh..........', // r23
        '.......HBBBBBBBBBBBBh...........', // r24
        '........hhhhhhhhhhhh............', // r25
        '................................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'rope_base', role: 'body' },
        H: { name: 'rope_highlight', role: 'body', tone: 'highlight' },
        h: { name: 'rope_shadow', role: 'body', tone: 'shadow' },
        b: { name: 'rope_inner', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // =====================================================================
    //  17. PICKAXE — mining pickaxe
    // =====================================================================
    {
      id: 'pickaxe_icon_32',
      description: 'Mining pickaxe with wooden handle and steel head.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '................................', // r2
        '....MMM..............MMM........', // r3
        '.....MMHH..........HMM.........', // r4
        '......MMHH........HMM..........', // r5
        '.......MMHH......HMM...........', // r6
        '........MMHHHHHHMM.............', // r7
        '.........MMHHHHMM..............', // r8
        '..........MMHHMM...............', // r9
        '...........MHHM................', // r10
        '............HHH.................', // r11
        '............HHH.................', // r12
        '............HHH.................', // r13
        '............HHh.................', // r14
        '............HHh.................', // r15
        '............HHh.................', // r16
        '............HHh.................', // r17
        '............HHh.................', // r18
        '............HHh.................', // r19
        '............HHh.................', // r20
        '............BBh.................', // r21
        '............BBh.................', // r22
        '............BBh.................', // r23
        '............BBb.................', // r24
        '............BBb.................', // r25
        '.............bb.................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        M: { name: 'metal_base', role: 'head' },
        H: { name: 'handle_base', role: 'body' },
        h: { name: 'handle_shadow', role: 'body', tone: 'shadow' },
        B: { name: 'handle_grip', role: 'accessory' },
        b: { name: 'handle_tip', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        accessory: { shadow: '#140c1c', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // =====================================================================
    //  18. FISHING ROD — rod with line and hook
    // =====================================================================
    {
      id: 'fishing_rod_icon_32',
      description: 'Fishing rod angled diagonally with reel and dangling hook.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '....................BBB.........', // r2
        '...................BBB..........', // r3
        '..................BBh...........', // r4
        '.................BBh............', // r5
        '................BBh.............', // r6
        '...............BBh..............', // r7
        '..............BBh...............', // r8
        '.............BBh................', // r9
        '............BBh.................', // r10
        '...........BBh..................', // r11
        '..........BBh...................', // r12
        '.........BBh....................', // r13
        '........BBh.....................', // r14
        '.......BBh......................', // r15
        '......BRRh......................', // r16
        '.....BRRR..............LL......', // r17
        '......BRh..............LL......', // r18
        '.......Bh.............LL.......', // r19
        '........h............LL........', // r20
        '.....................LL.........', // r21
        '....................LL..........', // r22
        '....................LL..........', // r23
        '...................LL...........', // r24
        '...................LL...........', // r25
        '...................HH...........', // r26
        '..................HHH...........', // r27
        '...................HH...........', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'rod_base', role: 'body' },
        h: { name: 'rod_shadow', role: 'body', tone: 'shadow' },
        R: { name: 'reel_base', role: 'accessory' },
        L: { name: 'line_base', role: 'head' },
        H: { name: 'hook_base', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // =====================================================================
    //  19. QUIVER — leather quiver with arrows
    // =====================================================================
    {
      id: 'quiver_icon_32',
      description: 'Leather quiver with three arrows sticking out the top.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '...........AA.AA.AA.............', // r2
        '...........AA.AA.AA.............', // r3
        '...........FFAFFAFF.............', // r4
        '............AAFFAA..............', // r5
        '............AAAAAA..............', // r6
        '............AAAAAA..............', // r7
        '............AAAAAA..............', // r8
        '...........HBBBBBBBB............', // r9
        '...........HBBBBBBBB............', // r10
        '...........HBBBBBBBb............', // r11
        '...........HBBBBBBBb............', // r12
        '...........HBBBBBBBb............', // r13
        '...........HBBBBBBBb............', // r14
        '...........HBBBBBBBb............', // r15
        '...........HBBBBBBBb............', // r16
        '...........HBBBBBBBb............', // r17
        '...........HBBBBBBBb............', // r18
        '...........HBBBBBBBb............', // r19
        '...........HBBBBBBBb............', // r20
        '...........HBBBBBBBb............', // r21
        '...........HBBBBBBBb............', // r22
        '............HBBBBBb.............', // r23
        '............HBBBBBb.............', // r24
        '.............HBBBb..............', // r25
        '..............bbb...............', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'quiver_base', role: 'body' },
        H: { name: 'quiver_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'quiver_shadow', role: 'body', tone: 'shadow' },
        A: { name: 'arrow_shaft', role: 'head' },
        F: { name: 'feather_base', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // =====================================================================
    //  20. BOMB — round bomb with lit fuse
    // =====================================================================
    {
      id: 'bomb_icon_32',
      description: 'Round bomb with short lit fuse and spark.',
      size: 32,
      grid: [
        '................................', // r0
        '................................', // r1
        '..............SSS...............', // r2
        '..............SSS...............', // r3
        '.............FF.................', // r4
        '............FF..................', // r5
        '...........FF...................', // r6
        '..........FF....................', // r7
        '.........HHHHHHHHH..............', // r8
        '........HHBBBBBBBBBb............', // r9
        '.......HBBBBBBBBBBBBBb..........', // r10
        '......HHBBBBBBBBBBBBBBb.........', // r11
        '......HBBBBBBBBBBBBBBBBb........', // r12
        '.....HHBBBBBBBBBBBBBBBBBb.......', // r13
        '.....HBBBBBBBBBBBBBBBBBBb.......', // r14
        '.....HBBBBBBBBBBBBBBBBBBBb......', // r15
        '.....HBBBBBBBBBBBBBBBBBBBb......', // r16
        '.....HBBBBBBBBBBBBBBBBBBBb......', // r17
        '.....HBBBBBBBBBBBBBBBBBBBb......', // r18
        '.....HBBBBBBBBBBBBBBBBBBb.......', // r19
        '......HBBBBBBBBBBBBBBBBb........', // r20
        '......HBBBBBBBBBBBBBBBBb........', // r21
        '.......HBBBBBBBBBBBBBBb.........', // r22
        '........HBBBBBBBBBBBBb..........', // r23
        '.........bbbbbbbbbbbbb..........', // r24
        '..........bbbbbbbbbbb...........', // r25
        '................................', // r26
        '................................', // r27
        '................................', // r28
        '................................', // r29
        '................................', // r30
        '................................', // r31
      ],
      chars: {
        B: { name: 'bomb_base', role: 'body' },
        H: { name: 'bomb_highlight', role: 'body', tone: 'highlight' },
        b: { name: 'bomb_shadow', role: 'body', tone: 'shadow' },
        F: { name: 'fuse_base', role: 'accessory' },
        S: { name: 'spark_base', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
