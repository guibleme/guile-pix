/**
 * Game Icons 32x32 — Batch 4: Achievement & Social Icons (20 templates).
 * Neo-SNES style, DB16 palette, colored selout, 4-5 roles per template.
 *
 * All rows built via r() helper to guarantee exact 32-char width.
 * '.' = transparent, letters = colored pixels.
 */
import type { BatchDefinition } from '../templateGenerator.js';

/** Build a 32-char row from (col, content) segment pairs. Later segments overwrite. */
function r(...segs: [number, string][]): string {
  const buf = '.'.repeat(32).split('');
  for (const [col, s] of segs) {
    for (let i = 0; i < s.length; i++) buf[col + i] = s[i];
  }
  return buf.join('');
}

// ── Shared trophy grid (gold/silver/bronze share same shape) ─────
const TROPHY: string[] = [
  r(),                                                     // 0
  r(),                                                     // 1
  r(),                                                     // 2
  r([7, 'HHHHHHHHHHHHHHHHHH']),                            // 3  rim
  r([7, 'HHBBBBBBBBBBBBBBbb']),                            // 4
  r([7, 'HHBBBBBBBBBBBBBBbb']),                            // 5
  r([7, 'HHBBBBBBBBBBBBBBbb']),                            // 6
  r([5, 'TT'], [7, 'HHBBBBBBBBBBBBbb'], [23, 'TT']),     // 7  handles
  r([4, 'TT'], [8, 'HHBBBBBBBBBBBBbb'], [24, 'TT']),     // 8
  r([4, 'TT'], [9, 'HHBBBBBBBBBBbb'], [23, 'tt']),       // 9  narrowing
  r([5, 'TT'], [8, 'HHBBBBBBBBBBbb'], [22, 'tt']),       // 10
  r([6, 'TT'], [9, 'HHBBBBBBBBBBbb'], [23, 'tt']),       // 11
  r([7, 'TT'], [9, 'HHBBBBBBBBBBbb'], [23, 'tt']),       // 12
  r([9, 'HHBBBBBBBBBBbb']),                                // 13
  r([10, 'HHBBBBBBBBbb']),                                 // 14
  r([11, 'HHBBBBBBbb']),                                   // 15
  r([13, 'HHBBbb']),                                       // 16 stem
  r([13, 'HHBBbb']),                                       // 17
  r([13, 'HHBBbb']),                                       // 18
  r([13, 'HHBBbb']),                                       // 19
  r([12, 'HHBBBBbb']),                                     // 20 base
  r([11, 'HHBBBBBBbb']),                                   // 21
  r([10, 'HHBBBBBBBBbb']),                                 // 22
  r([9, 'HHBBBBBBBBBBbb']),                                // 23
  r([9, 'HHBBBBBBBBBBbb']),                                // 24
  r(), r(), r(), r(), r(), r(), r(),                        // 25-31
];

const batch: BatchDefinition = {
  category: 'game_icons_32',
  exportNames: { templates: 'GAME_ICONS_32_BATCH4_TEMPLATES', schemes: 'GAME_ICONS_32_BATCH4_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════════
    //  1. TROPHY GOLD
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'trophy_gold_icon_32',
      description: 'Golden trophy cup with two handles, narrow stem, and wide base.',
      size: 32,
      grid: [...TROPHY],
      chars: {
        B: { name: 'cup_base', role: 'body' },
        b: { name: 'cup_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'cup_highlight', role: 'body', tone: 'highlight' },
        T: { name: 'handle_base', role: 'accessory' },
        t: { name: 'handle_shadow', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  2. TROPHY SILVER
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'trophy_silver_icon_32',
      description: 'Silver trophy cup with two handles, narrow stem, and wide base.',
      size: 32,
      grid: [...TROPHY],
      chars: {
        B: { name: 'cup_base', role: 'body' },
        b: { name: 'cup_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'cup_highlight', role: 'body', tone: 'highlight' },
        T: { name: 'handle_base', role: 'accessory' },
        t: { name: 'handle_shadow', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  3. TROPHY BRONZE
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'trophy_bronze_icon_32',
      description: 'Bronze trophy cup with two handles, narrow stem, and wide base.',
      size: 32,
      grid: [...TROPHY],
      chars: {
        B: { name: 'cup_base', role: 'body' },
        b: { name: 'cup_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'cup_highlight', role: 'body', tone: 'highlight' },
        T: { name: 'handle_base', role: 'accessory' },
        t: { name: 'handle_shadow', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  4. MEDAL — round gold medal on V-shaped ribbon
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'medal_icon_32',
      description: 'Gold medal hanging from a V-shaped red ribbon.',
      size: 32,
      grid: [
        r(), r(),                                           // 0-1
        r([6, 'RRRR'], [22, 'RRRR']),                      // 2  ribbon top
        r([7, 'RRRR'], [21, 'RRRR']),                      // 3
        r([8, 'RRRR'], [20, 'RRRR']),                      // 4
        r([9, 'RRRR'], [19, 'RRRR']),                      // 5
        r([10, 'RRRR'], [18, 'RRRR']),                     // 6
        r([11, 'RRRR'], [17, 'RRRR']),                     // 7
        r([12, 'RRRRRRRR']),                                // 8
        r([13, 'RRRRRR']),                                  // 9
        r([10, 'HHHHHHHHHHHH']),                            // 10 medal top
        r([9, 'HHBBBBBBBBBBbb']),                          // 11
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 12
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 13
        r([7, 'HHBBBBSSSSBBBBBBbb']),                      // 14 star
        r([7, 'HHBBBSSSSSSBBBBBbb']),                      // 15
        r([7, 'HHBBSSSSSSSSBBBBbb']),                      // 16
        r([7, 'HHBBBSSSSSSBBBBBbb']),                      // 17
        r([7, 'HHBBBBSSSSBBBBBBbb']),                      // 18
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 19
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 20
        r([9, 'HHBBBBBBBBBBbb']),                          // 21
        r([10, 'HHBBBBBBBBbb']),                           // 22
        r([11, 'HHBBBBBBbb']),                             // 23
        r(), r(), r(), r(), r(), r(), r(), r(),             // 24-31
      ],
      chars: {
        B: { name: 'medal_base', role: 'body' },
        b: { name: 'medal_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'medal_highlight', role: 'body', tone: 'highlight' },
        R: { name: 'ribbon_base', role: 'accessory' },
        S: { name: 'star_base', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d2aa99' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  5. CROWN — 3 peaks, band, gems
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'crown_icon_32',
      description: 'Royal crown with three pointed peaks and colored gems.',
      size: 32,
      grid: [
        r(), r(), r(), r(),                                 // 0-3
        r([15, 'HH']),                                      // 4  center peak
        r([14, 'HHBB']),                                    // 5
        r([13, 'HHBBbb']),                                  // 6
        r([9, 'HH'], [12, 'HHBBBBbb'], [22, 'HH']),       // 7  side peaks
        r([8, 'HHBB'], [12, 'HBBBBBBb'], [22, 'BBbb']),   // 8
        r([7, 'HHBBBBBBBBBBBBBBBBbb']),                    // 9  band merged
        r([7, 'HHBBBBBBBBBBBBBBBBbb']),                    // 10
        r([7, 'HHBBBBBBBBBBBBBBBBbb']),                    // 11
        r([7, 'HHBBBBGGBBBBGGBBBBbb']),                    // 12 gems
        r([7, 'HHBBBBGGBBBBGGBBBBbb']),                    // 13
        r([7, 'HHBBBBBBBBBBBBBBBBbb']),                    // 14
        r([7, 'HHBBBBBBBBBBBBBBBBbb']),                    // 15
        r([7, 'bbbbbbbbbbbbbbbbbbbb']),                     // 16 shadow rim
        r(), r(), r(), r(), r(), r(), r(),                  // 17-23
        r(), r(), r(), r(), r(), r(), r(), r(),             // 24-31
      ],
      chars: {
        B: { name: 'crown_base', role: 'body' },
        b: { name: 'crown_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'crown_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'gem_base', role: 'eye' },
      },
      colors: {
        body: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:  { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  6. RIBBON ROSETTE — circle + ribbon tails
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'ribbon_icon_32',
      description: 'Award rosette with central circle and two ribbon tails.',
      size: 32,
      grid: [
        r(), r(), r(), r(),                                 // 0-3
        r([11, 'HHHHHHHHHH']),                              // 4
        r([9, 'HHBBBBBBBBBBbb']),                          // 5
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 6
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 7
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 8
        r([7, 'HHBBBBAAAAAABBBBbb']),                      // 9  center
        r([7, 'HHBBBBAAAAAABBBBbb']),                      // 10
        r([7, 'HHBBBBAAAAAABBBBbb']),                      // 11
        r([7, 'HHBBBBAAAAAABBBBbb']),                      // 12
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 13
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 14
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 15
        r([9, 'HHBBBBBBBBBBbb']),                          // 16
        r([11, 'bbbbbbbbbb']),                              // 17
        r([9, 'BBBB'], [19, 'BBBB']),                      // 18 tails
        r([8, 'BBBB'], [20, 'BBBB']),                      // 19
        r([7, 'BBBB'], [21, 'BBBB']),                      // 20
        r([6, 'BBBB'], [22, 'BBBB']),                      // 21
        r([5, 'BBbb'], [23, 'BBbb']),                      // 22
        r([5, 'bb'], [25, 'bb']),                          // 23
        r(), r(), r(), r(), r(), r(), r(), r(),             // 24-31
      ],
      chars: {
        B: { name: 'ribbon_base', role: 'body' },
        b: { name: 'ribbon_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'ribbon_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'center_base', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  7. SKULL — front-view skull
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'skull_icon_32',
      description: 'Front-view skull with round cranium, eye sockets, nose, and jaw.',
      size: 32,
      grid: [
        r(), r(), r(),                                      // 0-2
        r([10, 'HHHHHHHHHHHH']),                            // 3
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 4
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 5
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 6
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 7
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 8
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 9
        r([6, 'HHBB'], [10, 'EEE'], [13, 'BBBBBB'], [19, 'EEE'], [22, 'BBbb']),   // 10 eyes
        r([6, 'HHBB'], [10, 'EEE'], [13, 'BBBBBB'], [19, 'EEE'], [22, 'BBbb']),   // 11
        r([6, 'HHBB'], [10, 'EEE'], [13, 'BBBBBB'], [19, 'EEE'], [22, 'BBbb']),   // 12
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 13
        r([7, 'HHBBBBBBB'], [15, 'EE'], [17, 'BBBBBbb']),  // 14 nose
        r([7, 'HHBBBBBBB'], [15, 'EE'], [17, 'BBBBBbb']),  // 15
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 16
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 17 jaw
        r([9, 'BBBBBBBBBBBBBB']),                           // 18
        r([9, 'BBHHBBHHBBHHBB']),                           // 19 teeth
        r([9, 'BBHHBBHHBBHHBB']),                           // 20
        r([10, 'BBBBBBBBBBbb']),                           // 21 chin
        r([11, 'BBBBBBBBbb']),                             // 22
        r([12, 'BBBBBBbb']),                               // 23
        r([13, 'bbbbbb']),                                 // 24
        r(), r(), r(), r(), r(), r(), r(),                  // 25-31
      ],
      chars: {
        B: { name: 'bone_base', role: 'body' },
        b: { name: 'bone_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'bone_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'socket_base', role: 'eye' },
      },
      colors: {
        body: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:  { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  8. EMOTE HAPPY — yellow circle, dot eyes, smile
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'emote_happy_icon_32',
      description: 'Happy yellow face with dot eyes and curved smile.',
      size: 32,
      grid: [
        r(), r(), r(), r(),                                 // 0-3
        r([11, 'HHHHHHHHHH']),                              // 4
        r([9, 'HHBBBBBBBBBBbb']),                          // 5
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 6
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 7
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 8
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 9
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 10
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 11
        r([5, 'HHBBB'], [10, 'EE'], [12, 'BBBBBB'], [18, 'EE'], [20, 'BBBbb']),   // 12 eyes
        r([5, 'HHBBB'], [10, 'EE'], [12, 'BBBBBB'], [18, 'EE'], [20, 'BBBbb']),   // 13
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 14
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 15
        r([5, 'HHBBBB'], [11, 'EEEEEEEEEE'], [21, 'BBbb']),  // 16 smile
        r([5, 'HHBBBBB'], [12, 'EEEEEEEE'], [20, 'BBBbb']),  // 17
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 18
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 19
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 20
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 21
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 22
        r([9, 'HHBBBBBBBBBBbb']),                          // 23
        r([11, 'bbbbbbbbbb']),                              // 24
        r(), r(), r(), r(), r(), r(), r(),                  // 25-31
      ],
      chars: {
        B: { name: 'face_base', role: 'body' },
        b: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'feature_base', role: 'eye' },
      },
      colors: {
        body: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:  { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  9. EMOTE SAD — blue circle, dot eyes, frown
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'emote_sad_icon_32',
      description: 'Sad blue face with dot eyes and curved frown.',
      size: 32,
      grid: [
        r(), r(), r(), r(),                                 // 0-3
        r([11, 'HHHHHHHHHH']),                              // 4
        r([9, 'HHBBBBBBBBBBbb']),                          // 5
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 6
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 7
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 8
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 9
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 10
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 11
        r([5, 'HHBBB'], [10, 'EE'], [12, 'BBBBBB'], [18, 'EE'], [20, 'BBBbb']),   // 12 eyes
        r([5, 'HHBBB'], [10, 'EE'], [12, 'BBBBBB'], [18, 'EE'], [20, 'BBBbb']),   // 13
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 14
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 15
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 16
        r([5, 'HHBBBBB'], [12, 'EEEEEEEE'], [20, 'BBBbb']),  // 17 frown top (inverted arc)
        r([5, 'HHBBBB'], [11, 'EEEEEEEEEE'], [21, 'BBbb']),  // 18 frown bottom
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 19
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 20
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 21
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 22
        r([9, 'HHBBBBBBBBBBbb']),                          // 23
        r([11, 'bbbbbbbbbb']),                              // 24
        r(), r(), r(), r(), r(), r(), r(),                  // 25-31
      ],
      chars: {
        B: { name: 'face_base', role: 'body' },
        b: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'feature_base', role: 'eye' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
        eye:  { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  10. EMOTE ANGRY — red circle, angled brows, jagged mouth
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'emote_angry_icon_32',
      description: 'Angry red face with angled eyebrows and jagged mouth.',
      size: 32,
      grid: [
        r(), r(), r(), r(),                                 // 0-3
        r([11, 'HHHHHHHHHH']),                              // 4
        r([9, 'HHBBBBBBBBBBbb']),                          // 5
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 6
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 7
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 8
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 9
        r([5, 'HHBB'], [9, 'EE'], [11, 'BBBBBBBB'], [19, 'EE'], [21, 'BBbb']),    // 10 brows /\
        r([5, 'HHBBB'], [10, 'EE'], [12, 'BBBBBB'], [18, 'EE'], [20, 'BBBbb']),   // 11 brows inner
        r([5, 'HHBBB'], [10, 'EE'], [12, 'BBBBBB'], [18, 'EE'], [20, 'BBBbb']),   // 12 eyes
        r([5, 'HHBBB'], [10, 'EE'], [12, 'BBBBBB'], [18, 'EE'], [20, 'BBBbb']),   // 13
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 14
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 15
        r([5, 'HHBBB'], [10, 'EEEEEEEEEEEE'], [22, 'Bbb']),  // 16 mouth
        r([5, 'HHBBBB'], [11, 'EE'], [13, 'BB'], [15, 'EE'], [17, 'BB'], [19, 'EE'], [21, 'BBbb']),  // 17 jagged
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 18
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 19
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 20
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 21
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 22
        r([9, 'HHBBBBBBBBBBbb']),                          // 23
        r([11, 'bbbbbbbbbb']),                              // 24
        r(), r(), r(), r(), r(), r(), r(),                  // 25-31
      ],
      chars: {
        B: { name: 'face_base', role: 'body' },
        b: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'feature_base', role: 'eye' },
      },
      colors: {
        body: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:  { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  11. EMOTE LOVE — pink circle, heart eyes, smile
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'emote_love_icon_32',
      description: 'Love pink face with heart-shaped eyes and small smile.',
      size: 32,
      grid: [
        r(), r(), r(), r(),                                 // 0-3
        r([11, 'HHHHHHHHHH']),                              // 4
        r([9, 'HHBBBBBBBBBBbb']),                          // 5
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 6
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 7
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 8
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 9
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 10
        r([5, 'HHB'], [8, 'EE'], [10, 'EE'], [12, 'BBBBBB'], [18, 'EE'], [20, 'EE'], [22, 'Bbb']),  // 11 hearts top
        r([5, 'HHB'], [8, 'EEEE'], [12, 'BBBBBB'], [18, 'EEEE'], [22, 'Bbb']),   // 12 hearts wide
        r([5, 'HHBB'], [9, 'EE'], [11, 'BBBBBBBB'], [19, 'EE'], [21, 'BBbb']),    // 13 hearts bottom
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 14
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 15
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 16
        r([5, 'HHBBBBB'], [12, 'EEEEEEEE'], [20, 'BBBbb']),  // 17 smile
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 18
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 19
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 20
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 21
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 22
        r([9, 'HHBBBBBBBBBBbb']),                          // 23
        r([11, 'bbbbbbbbbb']),                              // 24
        r(), r(), r(), r(), r(), r(), r(),                  // 25-31
      ],
      chars: {
        B: { name: 'face_base', role: 'body' },
        b: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'feature_base', role: 'eye' },
      },
      colors: {
        body: { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
        eye:  { shadow: '#442434', base: '#d04648', highlight: '#d04648' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  12. EMOTE SURPRISE — yellow circle, big eyes, O mouth
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'emote_surprise_icon_32',
      description: 'Surprised yellow face with large round eyes and O-shaped mouth.',
      size: 32,
      grid: [
        r(), r(), r(), r(),                                 // 0-3
        r([11, 'HHHHHHHHHH']),                              // 4
        r([9, 'HHBBBBBBBBBBbb']),                          // 5
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 6
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 7
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 8
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 9
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 10
        r([5, 'HHBB'], [9, 'EEE'], [12, 'BBBBBB'], [18, 'EEE'], [21, 'BBbb']),    // 11 big eyes
        r([5, 'HHBB'], [9, 'EEE'], [12, 'BBBBBB'], [18, 'EEE'], [21, 'BBbb']),    // 12
        r([5, 'HHBB'], [9, 'EEE'], [12, 'BBBBBB'], [18, 'EEE'], [21, 'BBbb']),    // 13
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 14
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 15
        r([5, 'HHBBBBB'], [12, 'EEEEEE'], [18, 'BBBBBbb']),  // 16 O top
        r([5, 'HHBBBBB'], [12, 'EE'], [14, 'BB'], [16, 'EE'], [18, 'BBBBBbb']),   // 17 O sides
        r([5, 'HHBBBBB'], [12, 'EE'], [14, 'BB'], [16, 'EE'], [18, 'BBBBBbb']),   // 18
        r([5, 'HHBBBBB'], [12, 'EEEEEE'], [18, 'BBBBBbb']),  // 19 O bottom
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 20
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 21
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 22
        r([9, 'HHBBBBBBBBBBbb']),                          // 23
        r([11, 'bbbbbbbbbb']),                              // 24
        r(), r(), r(), r(), r(), r(), r(),                  // 25-31
      ],
      chars: {
        B: { name: 'face_base', role: 'body' },
        b: { name: 'face_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'face_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'feature_base', role: 'eye' },
      },
      colors: {
        body: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:  { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  13. FLAG — vertical pole + triangular pennant
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'flag_icon_32',
      description: 'Vertical pole with a triangular pennant flag.',
      size: 32,
      grid: [
        r(), r(),                                           // 0-1
        r([7, 'PP']),                                       // 2  pole top
        r([7, 'PP'], [9, 'HHHHHHHHHHHHHH']),               // 3  flag start 14px
        r([7, 'PP'], [9, 'HHBBBBBBBBBBBBbb']),            // 4  16px
        r([7, 'PP'], [9, 'HHBBBBBBBBBBBBbb']),            // 5
        r([7, 'PP'], [9, 'HHBBBBBBBBBBbb']),              // 6  14px
        r([7, 'PP'], [9, 'HHBBBBBBBBBBbb']),              // 7
        r([7, 'PP'], [9, 'HHBBBBBBBBbb']),                // 8  12px
        r([7, 'PP'], [9, 'HHBBBBBBBBbb']),                // 9
        r([7, 'PP'], [9, 'HHBBBBBBbb']),                  // 10  10px
        r([7, 'PP'], [9, 'HHBBBBBBbb']),                  // 11
        r([7, 'PP'], [9, 'HHBBBBbb']),                    // 12  8px
        r([7, 'PP'], [9, 'HHBBBBbb']),                    // 13
        r([7, 'PP'], [9, 'HHBBbb']),                      // 14  6px
        r([7, 'PP'], [9, 'bbbb']),                         // 15  flag tip
        r([7, 'PP']),                                       // 16
        r([7, 'PP']),                                       // 17
        r([7, 'PP']),                                       // 18
        r([7, 'PP']),                                       // 19
        r([7, 'PP']),                                       // 20
        r([7, 'PP']),                                       // 21
        r([7, 'PP']),                                       // 22
        r([7, 'PP']),                                       // 23
        r([7, 'PP']),                                       // 24
        r([7, 'PP']),                                       // 25
        r([7, 'PP']),                                       // 26
        r([7, 'PP']),                                       // 27
        r([6, 'PPPP']),                                     // 28 base
        r([6, 'PPPP']),                                     // 29
        r(), r(),                                           // 30-31
      ],
      chars: {
        B: { name: 'flag_base', role: 'body' },
        b: { name: 'flag_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'flag_highlight', role: 'body', tone: 'highlight' },
        P: { name: 'pole_base', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d2aa99' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  14. BANNER — horizontal rod + hanging forked banner
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'banner_small_icon_32',
      description: 'Horizontal rod with rectangular forked banner hanging down.',
      size: 32,
      grid: [
        r(), r(), r(),                                      // 0-2
        r([6, 'PPPPPPPPPPPPPPPPPPPP']),                     // 3  rod (20px)
        r([6, 'PPPPPPPPPPPPPPPPPPPP']),                     // 4
        r([8, 'HHHHHHHHHHHHHHHH']),                         // 5  banner top (16px)
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 6
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 7
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 8
        r([8, 'HHBBBBTTTTBBBBbb']),                        // 9  trim
        r([8, 'HHBBBBTTTTBBBBbb']),                        // 10
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 11
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 12
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 13
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 14
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 15
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 16
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 17
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 18
        r([8, 'HHBB'], [14, 'BB'], [18, 'BBBBbb']),       // 19 fork
        r([8, 'HHB'], [13, 'BB'], [19, 'BBBbb']),         // 20
        r([8, 'HH'], [12, 'bb'], [20, 'BBbb']),           // 21
        r([9, 'bb'], [12, 'bb'], [21, 'bbb']),            // 22
        r([9, 'bb'], [22, 'bb']),                          // 23
        r(), r(), r(), r(), r(), r(), r(), r(),             // 24-31
      ],
      chars: {
        B: { name: 'banner_base', role: 'body' },
        b: { name: 'banner_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'banner_highlight', role: 'body', tone: 'highlight' },
        P: { name: 'rod_base', role: 'accessory' },
        T: { name: 'trim_base', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  15. HOURGLASS — two chambers + frame + sand
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'hourglass_icon_32',
      description: 'Hourglass with two chambers, wooden frame, and sand.',
      size: 32,
      grid: [
        r(), r(), r(),                                      // 0-2
        r([7, 'FFFFFFFFFFFFFFFFFFFF']),                     // 3  top bar (20px, c7-26)
        r([7, 'FFFFFFFFFFFFFFFFFFFF']),                     // 4
        r([8, 'FFGGGGGGGGGGGGGGFF']),                      // 5  glass top (18px c8-25)
        r([8, 'FFGGGGGGGGGGGGGGFF']),                      // 6
        r([9, 'FFGGSSSSSSSSGGFF']),                        // 7  sand in top (16px c9-24)
        r([9, 'FFGGSSSSSSSSGGFF']),                        // 8
        r([10, 'FFGGSSSSSSGGFF']),                         // 9  narrowing (14px c10-23)
        r([10, 'FFGGSSSSSSGGFF']),                         // 10
        r([11, 'FFGGSSSSGFF']),                            // 11  (11px c11-21) — wait needs even count
        r([11, 'FFGGSSSSGGFF']),                           // 12  (12px c11-22)
        r([12, 'FFGGSSGGFF']),                             // 13  (10px c12-21)
        r([13, 'FFGGSSFF']),                               // 14  waist (8px c13-20)
        r([13, 'FFSSSSFF']),                               // 15  waist narrowest
        r([13, 'FFGGSSFF']),                               // 16  waist expands
        r([12, 'FFGGSSGGFF']),                             // 17
        r([11, 'FFGGSSSSGGFF']),                           // 18
        r([11, 'FFGGSSSSGGFF']),                           // 19
        r([10, 'FFGGSSSSSSGGFF']),                         // 20
        r([10, 'FFGGSSSSSSGGFF']),                         // 21
        r([9, 'FFGGSSSSSSSSGGFF']),                        // 22
        r([9, 'FFGGGGGGGGGGGGFF']),                        // 23
        r([8, 'FFGGGGGGGGGGGGGGFF']),                      // 24
        r([8, 'FFGGGGGGGGGGGGGGFF']),                      // 25
        r([7, 'FFFFFFFFFFFFFFFFFFFF']),                     // 26 bottom bar
        r([7, 'FFFFFFFFFFFFFFFFFFFF']),                     // 27
        r(), r(), r(), r(),                                 // 28-31
      ],
      chars: {
        F: { name: 'frame_base', role: 'body' },
        G: { name: 'glass_base', role: 'accessory' },
        S: { name: 'sand_base', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  16. DICE — isometric cube with pips on front face
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'dice_icon_32',
      description: 'Isometric dice cube with pips on the front face.',
      size: 32,
      grid: [
        r(), r(), r(),                                      // 0-2
        r([10, 'TTTTTTTTTTTTTT']),                          // 3  top face (14px)
        r([9, 'TTTTTTTTTTTTTTTT']),                         // 4  (16px)
        r([8, 'TTTTTTTTTTTTTTTTTT']),                       // 5  (18px)
        r([7, 'AATTTTTTTTTTTTTTAABB']),                     // 6  top-to-side transition (20px)
        r([7, 'AAHHHHHHHHHHHHHHHABB']),                     // 7  front face starts
        r([7, 'AAHHBBBBBBBBBBBbbABB']),                    // 8
        r([7, 'AAHHBBBBBBBBBBBbbABB']),                    // 9
        r([7, 'AAHHBBEEBBBBBBBbbABB']),                    // 10 pip top-left
        r([7, 'AAHHBBEEBBBBBBBbbABB']),                    // 11
        r([7, 'AAHHBBBBBBBBBBBbbABB']),                    // 12
        r([7, 'AAHHBBBBBBEEBBBbbABB']),                    // 13 pip center
        r([7, 'AAHHBBBBBBEEBBBbbABB']),                    // 14
        r([7, 'AAHHBBBBBBBBBBBbbABB']),                    // 15
        r([7, 'AAHHBBBBBBBBEEBbbABB']),                    // 16 pip bottom-right
        r([7, 'AAHHBBBBBBBBEEBbbABB']),                    // 17
        r([7, 'AAHHBBBBBBBBBBBbbABB']),                    // 18
        r([7, 'AAHHBBBBBBBBBBBbbABB']),                    // 19
        r([7, 'AAHHbbbbbbbbbbbbbABB']),                     // 20 front bottom
        r([7, 'AABBBBBBBBBBBBBBBABB']),                    // 21
        r([7, 'AABBBBBBBBBBBBBBBABB']),                    // 22
        r([7, 'AABBBBBBBBBBBBBBBBBB']),                    // 23
        r([7, 'AABBBBBBBBBBBBBBBBBB']),                    // 24
        r(), r(), r(), r(), r(), r(), r(),                  // 25-31
      ],
      chars: {
        B: { name: 'die_base', role: 'body' },
        b: { name: 'die_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'die_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'pip_base', role: 'eye' },
        T: { name: 'top_base', role: 'accessory' },
        A: { name: 'side_base', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  17. MUSIC NOTE — two beamed eighth notes
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'music_note_icon_32',
      description: 'Two beamed eighth notes with stems and noteheads.',
      size: 32,
      grid: [
        r(), r(), r(), r(),                                 // 0-3
        r([11, 'BBBBBBBBBBBB']),                            // 4  beam top (12px c11-22)
        r([11, 'BBBBBBBBBBbb']),                            // 5  beam bottom
        r([11, 'BB'], [21, 'BB']),                          // 6  stems start
        r([11, 'BB'], [21, 'BB']),                          // 7
        r([11, 'BB'], [21, 'BB']),                          // 8
        r([11, 'BB'], [21, 'BB']),                          // 9
        r([11, 'BB'], [21, 'BB']),                          // 10
        r([11, 'BB'], [21, 'BB']),                          // 11
        r([11, 'BB'], [21, 'BB']),                          // 12
        r([11, 'BB'], [21, 'BB']),                          // 13
        r([11, 'BB'], [21, 'BB']),                          // 14
        r([11, 'BB'], [21, 'BB']),                          // 15
        r([11, 'BB'], [21, 'BB']),                          // 16
        r([11, 'BB'], [21, 'BB']),                          // 17
        r([11, 'BB'], [21, 'BB']),                          // 18
        r([11, 'BB'], [21, 'BB']),                          // 19
        r([7, 'HHHHHH'], [11, 'BB'], [17, 'HHHHHH'], [21, 'BB']),  // 20 noteheads
        r([7, 'HHBBbb'], [11, 'BB'], [17, 'HHBBbb'], [21, 'BB']),  // 21
        r([7, 'HHBBbb'], [17, 'HHBBbb']),                 // 22
        r([7, 'HHBBbb'], [17, 'HHBBbb']),                 // 23
        r([8, 'bbbb'], [18, 'bbbb']),                      // 24 notehead bottom
        r(), r(), r(), r(), r(), r(), r(),                  // 25-31
      ],
      chars: {
        B: { name: 'note_base', role: 'body' },
        b: { name: 'note_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'note_highlight', role: 'body', tone: 'highlight' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  18. CHAT BUBBLE — rounded rectangle + tail + dots
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'chat_icon_32',
      description: 'Speech bubble with tail and three dots inside.',
      size: 32,
      grid: [
        r(), r(), r(), r(),                                 // 0-3
        r([7, 'TTTTTTTTTTTTTTTTTT']),                       // 4  border top (18px c7-24)
        r([6, 'TTHHHHHHHHHHHHHHHTT']),                      // 5  (20px c6-25) — wait 2+16+2=20
        r([5, 'TTHHBBBBBBBBBBBBBBbbTT']),                  // 6  22px c5-26
        r([5, 'TTHHBBBBBBBBBBBBBBbbTT']),                  // 7
        r([5, 'TTHHBBBBBBBBBBBBBBbbTT']),                  // 8
        r([5, 'TTHHBBBBBBBBBBBBBBbbTT']),                  // 9
        r([5, 'TTHH'], [9, 'BB'], [11, 'EE'], [13, 'BBB'], [16, 'EE'], [18, 'BBB'], [21, 'EE'], [23, 'bbTT']),  // 10 dots
        r([5, 'TTHH'], [9, 'BB'], [11, 'EE'], [13, 'BBB'], [16, 'EE'], [18, 'BBB'], [21, 'EE'], [23, 'bbTT']),  // 11
        r([5, 'TTHHBBBBBBBBBBBBBBbbTT']),                  // 12
        r([5, 'TTHHBBBBBBBBBBBBBBbbTT']),                  // 13
        r([5, 'TTHHBBBBBBBBBBBBBBbbTT']),                  // 14
        r([6, 'TTbbbbbbbbbbbbbbbbTT']),                     // 15 border bottom
        r([7, 'TTTTTTTTTTTTTTTTTT']),                       // 16
        r([7, 'TTTT']),                                     // 17 tail
        r([6, 'TTTT']),                                     // 18
        r([5, 'TTbb']),                                     // 19
        r(), r(), r(), r(), r(), r(), r(),                  // 20-26
        r(), r(), r(), r(), r(),                            // 27-31
      ],
      chars: {
        B: { name: 'bubble_base', role: 'body' },
        b: { name: 'bubble_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'bubble_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'dot_base', role: 'eye' },
        T: { name: 'border_base', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  19. MAIL — envelope with V-fold and wax seal
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'mail_icon_32',
      description: 'Envelope with V-shaped fold lines and red wax seal.',
      size: 32,
      grid: [
        r(), r(), r(), r(), r(),                            // 0-4
        r([5, 'HHHHHHHHHHHHHHHHHHHHHH']),                   // 5  top (22px c5-26)
        r([5, 'HHFFBBBBBBBBBBBBBBFFBB']),                   // 6  V-fold start — wait needs flap 'F'
        r([5, 'HHBB'], [9, 'FF'], [11, 'BBBBBBBB'], [19, 'FF'], [21, 'BBBBBB']),  // 7
        r([5, 'HHBBBB'], [11, 'FF'], [13, 'BBBB'], [17, 'FF'], [19, 'BBBBbb']),   // 8
        r([5, 'HHBBBBB'], [12, 'FF'], [14, 'BB'], [16, 'FF'], [18, 'BBBBBbb']),   // 9
        r([5, 'HHBBBBBB'], [13, 'FFFF'], [17, 'BBBBBBbb']),  // 10 V point
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 11
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 12
        r([5, 'HHBBBBBB'], [13, 'SSSS'], [17, 'BBBBBBbb']),  // 13 seal
        r([5, 'HHBBBBBB'], [13, 'SSSS'], [17, 'BBBBBBbb']),  // 14
        r([5, 'HHBBBBBB'], [13, 'SSSS'], [17, 'BBBBBBbb']),  // 15
        r([5, 'HHBBBBBB'], [13, 'SSSS'], [17, 'BBBBBBbb']),  // 16
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 17
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 18
        r([5, 'bbbbbbbbbbbbbbbbbbbbbb']),                   // 19 bottom
        r(), r(), r(), r(), r(), r(), r(),                  // 20-26
        r(), r(), r(), r(), r(),                            // 27-31
      ],
      chars: {
        B: { name: 'envelope_base', role: 'body' },
        b: { name: 'envelope_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'envelope_highlight', role: 'body', tone: 'highlight' },
        F: { name: 'fold_base', role: 'accessory' },
        S: { name: 'seal_base', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#8595a1', base: '#d2aa99', highlight: '#d2aa99' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d04648' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  20. BELL — bell curve with clapper
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'bell_icon_32',
      description: 'Classic bell with curved body and hanging clapper.',
      size: 32,
      grid: [
        r(), r(), r(),                                      // 0-2
        r([14, 'CCCC']),                                    // 3  ring (4px c14-17)
        r([14, 'CCCC']),                                    // 4
        r([14, 'HHHH']),                                    // 5  bell top (4px)
        r([13, 'HHBBBB']),                                  // 6  (6px)
        r([12, 'HHBBBBbb']),                                // 7  (8px)
        r([12, 'HHBBBBbb']),                                // 8
        r([11, 'HHBBBBBBbb']),                              // 9  (10px)
        r([11, 'HHBBBBBBbb']),                              // 10
        r([10, 'HHBBBBBBBBbb']),                            // 11  (12px)
        r([10, 'HHBBBBBBBBbb']),                            // 12
        r([9, 'HHBBBBBBBBBBbb']),                          // 13  (14px)
        r([9, 'HHBBBBBBBBBBbb']),                          // 14
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 15  (16px)
        r([8, 'HHBBBBBBBBBBBBbb']),                        // 16
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 17  (18px)
        r([7, 'HHBBBBBBBBBBBBBBbb']),                      // 18
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 19  (20px)
        r([6, 'HHBBBBBBBBBBBBBBBBbb']),                    // 20
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 21  (22px) flare
        r([5, 'HHBBBBBBBBBBBBBBBBBBbb']),                  // 22
        r([4, 'bbbbbbbbbbbbbbbbbbbbbbbb']),                 // 23  rim shadow (24px)
        r([4, 'bbbbbbbbbbbbbbbbbbbbbbbb']),                 // 24
        r([14, 'CCCC']),                                    // 25  clapper
        r([14, 'CCCC']),                                    // 26
        r([15, 'CC']),                                      // 27
        r(), r(), r(), r(),                                 // 28-31
      ],
      chars: {
        B: { name: 'bell_base', role: 'body' },
        b: { name: 'bell_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'bell_highlight', role: 'body', tone: 'highlight' },
        C: { name: 'clapper_base', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },
  ],
};
export default batch;
