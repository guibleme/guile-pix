/**
 * Game Icons 32x32 — Batch 2: Status Effect / Buff Icons (20 templates).
 * Neo-SNES style (Chrono Trigger + Sea of Stars quality).
 * DB16 palette only, colored selout, 4-5 roles per template.
 *
 * Design pattern: diamond background + centered symbol.
 * All 20 icons share the SAME diamond silhouette for visual consistency.
 * Symbols are bold (2px+ wide lines), no orphan pixels.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'game_icons_32',
  exportNames: { templates: 'GAME_ICONS_32_BATCH2_TEMPLATES', schemes: 'GAME_ICONS_32_BATCH2_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════════
    //  1. buff_fire_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_fire_icon_32',
      description: 'Fire buff icon with upward flame symbol on a warm red diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBSSBBBb...........', // 8
        '..........HBBBSSSSBBbb..........', // 9
        '.........HBBBSSSSSSBBbb.........', // 10
        '........HBBBSSssssSSBBbb........', // 11
        '.......HBBBBSSssssSSBBBbb.......', // 12
        '......HBBBBSSSssssSSSBBBbb......', // 13
        '.....HBBBBBSSSssssSSSBBBBbb.....', // 14
        '....HBBBBBBSSSSSSSSSSBBBBBbb....', // 15
        '....BBBBBBBSSSSSSSSSSBBBBbbb....', // 16
        '.....BBBBBBBSSSSSSSSBBBBbbb.....', // 17
        '......BBBBBBBSSSSSSBBBBbbb......', // 18
        '.......BBBBBBBSSSSBBBBBbb.......', // 19
        '........BBBBBBBBBBBBBBbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'flame_base', role: 'accessory' },
        s: { name: 'flame_core', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d2aa99' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  2. buff_ice_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_ice_icon_32',
      description: 'Ice buff icon with snowflake asterisk on a cold blue diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBSSBBBb...........', // 8
        '..........HBBBBSSBBBbb..........', // 9
        '.........HBSSBBSSBBSSbb.........', // 10
        '........HBBBSSBSSBSSBBbb........', // 11
        '.......HBBBBBSSSSSSBBBBbb.......', // 12
        '......HBBBBBBBSSSSBBBBBBbb......', // 13
        '.....HBBBBBBBBBSSBBBBBBBBbb.....', // 14
        '....HBBBBSSSSSSSSSSSSSSBBBbb....', // 15
        '....BBBBBSSSSSSSSSSSSSSBBbbb....', // 16
        '.....BBBBBBBBBBSSBBBBBBBbbb.....', // 17
        '......BBBBBBBBSSSSBBBBBbbb......', // 18
        '.......BBBBBSSBSSBSSBBBbb.......', // 19
        '........BBBSSBBSSBBSSBbb........', // 20
        '.........BSSBBBSSBBBSSb.........', // 21
        '..........BBBBBSSBBBbb..........', // 22
        '...........BBBBSSBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'snowflake', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  3. buff_poison_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_poison_icon_32',
      description: 'Poison buff icon with skull symbol on a toxic green diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HBBSSSSSSBbb..........', // 9
        '.........HBBSSSSSSSSBbb.........', // 10
        '........HBBSSssSSssSSBbb........', // 11
        '.......HBBBSSssSSssSSBBbb.......', // 12
        '......HBBBBSSSSSSSSSSBBBbb......', // 13
        '.....HBBBBBBSSSssSSSBBBBBbb.....', // 14
        '....HBBBBBBBSSSSSSSSBBBBBBbb....', // 15
        '....BBBBBBBBBSsSSsSBBBBBBbbb....', // 16
        '.....BBBBBBBBSsSSsSBBBBBbbb.....', // 17
        '......BBBBBBBBBBBBBBBBBbbb......', // 18
        '.......BBBBBBBBBBBBBBBBbb.......', // 19
        '........BBBBBBBBBBBBBBbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'skull_base', role: 'accessory' },
        s: { name: 'skull_detail', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  4. buff_sleep_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_sleep_icon_32',
      description: 'Sleep buff icon with crescent moon symbol on a deep purple diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HBBSSSSSSBbb..........', // 9
        '.........HBSSSSBBBBBBbb.........', // 10
        '........HBSSSSBBBBBBBBbb........', // 11
        '.......HBBSSSSBBBBBBBBBbb.......', // 12
        '......HBBBSSSBBBBBBBBBBBbb......', // 13
        '.....HBBBBSSSBBBBBBBBBBBBbb.....', // 14
        '....HBBBBBSSSBBBBBBBBBBBBBbb....', // 15
        '....BBBBBBSSSBBBBBBBBBBBBbbb....', // 16
        '.....BBBBBSSSSBBBBBBBBBBbbb.....', // 17
        '......BBBBBSSSBBBBBBBBBbbb......', // 18
        '.......BBBBBBSSSSSSBBBBbb.......', // 19
        '........BBBBBBBBBBBBBBbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'moon_base', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#30346d', highlight: '#597dce' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  5. buff_stun_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_stun_icon_32',
      description: 'Stun buff icon with lightning bolt on a golden yellow diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBSSSSS...........', // 8
        '..........HBBBBSSSSSbb..........', // 9
        '.........HBBBBSsssSBBbb.........', // 10
        '........HBBBBSSSSSBBBBbb........', // 11
        '.......HBBBBSSSSSSSSBBBbb.......', // 12
        '......HBBBBBSSSSSSSSBBBBbb......', // 13
        '.....HBBBBBBBBBSSSSSBBBBBbb.....', // 14
        '....HBBBBBBBBBSsssSBBBBBBBbb....', // 15
        '....BBBBBBBBBSSSSSBBBBBBBbbb....', // 16
        '.....BBBBBBBSSSSSBBBBBBBbbb.....', // 17
        '......BBBBBSSSSSBBBBBBBbbb......', // 18
        '.......BBBBBSSSBBBBBBBBbb.......', // 19
        '........BBBBBBBBBBBBBBbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'bolt_base', role: 'accessory' },
        s: { name: 'bolt_core', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  6. buff_bleed_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_bleed_icon_32',
      description: 'Bleed buff icon with blood drop on a dark red diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBSSBBBb...........', // 8
        '..........HBBBSSSSBBbb..........', // 9
        '.........HBBBBSSSSBBBbb.........', // 10
        '........HBBBBSSSSSSBBBbb........', // 11
        '.......HBBBBBSssSSSBBBBbb.......', // 12
        '......HBBBBBSSssSSSSBBBBbb......', // 13
        '.....HBBBBBBSSSSSSSSBBBBBbb.....', // 14
        '....HBBBBBBSSSSSSSSSSBBBBBbb....', // 15
        '....BBBBBBBSSSSSSSSSSBBBBbbb....', // 16
        '.....BBBBBBSSSSSSSSSSBBBbbb.....', // 17
        '......BBBBBBSSSSSSSSBBBbbb......', // 18
        '.......BBBBBBSSSSSSBBBBbb.......', // 19
        '........BBBBBBSSSSBBBBbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'drop_base', role: 'accessory' },
        s: { name: 'drop_highlight', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
        accessory: { shadow: '#d04648', base: '#d04648', highlight: '#d2aa99' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  7. buff_haste_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_haste_icon_32',
      description: 'Haste buff icon with double chevron arrows on a green diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HBBBBBBBBBbb..........', // 9
        '.........HSSBBBBSSBBBbb.........', // 10
        '........HBSSBBBBSSBBBBbb........', // 11
        '.......HBBBBSSBBBBSSBBBbb.......', // 12
        '......HBBBBBSSBBBBSSBBBBbb......', // 13
        '.....HBBBBBBBBSSBBBBSSBBBbb.....', // 14
        '....HBBBBBBBBBSSBBBBSSBBBBbb....', // 15
        '....BBBBBBBBBBSSBBBBSSBBBbbb....', // 16
        '.....BBBBBBBBBSSBBBBSSBBbbb.....', // 17
        '......BBBBBBSSBBBBSSBBBbbb......', // 18
        '.......BBBBBSSBBBBSSBBBbb.......', // 19
        '........BBSSBBBBSSBBBBbb........', // 20
        '.........BSSBBBBSSBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'arrow_base', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  8. buff_slow_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_slow_icon_32',
      description: 'Slow debuff icon with hourglass silhouette on a gray diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HSSSSSSSSSSb..........', // 9
        '.........HBSSSSSSSSSSbb.........', // 10
        '........HBBBSSssssSSBBbb........', // 11
        '.......HBBBBBSSSSSSBBBBbb.......', // 12
        '......HBBBBBBBSSSSBBBBBBbb......', // 13
        '.....HBBBBBBBBBSSBBBBBBBBbb.....', // 14
        '....HBBBBBBBBBBSSBBBBBBBBBbb....', // 15
        '....BBBBBBBBBBBSSBBBBBBBBbbb....', // 16
        '.....BBBBBBBBBBSSBBBBBBBbbb.....', // 17
        '......BBBBBBBBSSSSBBBBBbbb......', // 18
        '.......BBBBBBSssssSBBBBbb.......', // 19
        '........BBBBSSSSSSSSBBbb........', // 20
        '.........BBSSSSSSSSSSbb.........', // 21
        '..........BSSSSSSSSSSb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'glass_base', role: 'accessory' },
        s: { name: 'sand_fill', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  9. buff_strength_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_strength_icon_32',
      description: 'Strength buff icon with bold upward arrow on a red-orange diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBSSBBBb...........', // 8
        '..........HBBBSSSSBBbb..........', // 9
        '.........HBBBSSSSSSBBbb.........', // 10
        '........HBBBSSSSSSSSBBbb........', // 11
        '.......HBBBSSSSSSSSSSBBbb.......', // 12
        '......HBBBSSSSSSSSSSSSBBbb......', // 13
        '.....HBBBBBBBBSssSBBBBBBBbb.....', // 14
        '....HBBBBBBBBBSssSBBBBBBBBbb....', // 15
        '....BBBBBBBBBBSssSBBBBBBBbbb....', // 16
        '.....BBBBBBBBBSssSBBBBBBbbb.....', // 17
        '......BBBBBBBBSssSBBBBBbbb......', // 18
        '.......BBBBBBBSSSSBBBBBbb.......', // 19
        '........BBBBBBSSSSBBBBbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'arrow_base', role: 'accessory' },
        s: { name: 'arrow_highlight', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  10. buff_defense_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_defense_icon_32',
      description: 'Defense buff icon with shield shape on a blue diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HSSSSSSSSSSb..........', // 9
        '.........HBSSSSSSSSSSbb.........', // 10
        '........HBBSSSSSSSSSSBbb........', // 11
        '.......HBBBSSSSssSSSSBBbb.......', // 12
        '......HBBBBSSSssssSSSBBBbb......', // 13
        '.....HBBBBBSSSSssSSSSBBBBbb.....', // 14
        '....HBBBBBBSSSSssSSSSBBBBBbb....', // 15
        '....BBBBBBBBSSSSSSSSBBBBBbbb....', // 16
        '.....BBBBBBBSSSSSSSSBBBBbbb.....', // 17
        '......BBBBBBBSSSSSSBBBBbbb......', // 18
        '.......BBBBBBSSSSSSBBBBbb.......', // 19
        '........BBBBBBSSSSBBBBbb........', // 20
        '.........BBBBBBSSBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'shield_base', role: 'accessory' },
        s: { name: 'shield_emblem', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  11. buff_regen_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_regen_icon_32',
      description: 'Regen buff icon with heart-and-plus symbol on a green diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HSSSSBBSSSSb..........', // 9
        '.........HSSSSSSSSSSSSb.........', // 10
        '........HBSSSSSSSSSSSSbb........', // 11
        '.......HBBSSSSSssSSSSSBbb.......', // 12
        '......HBBBBSSSssssSSSBBBbb......', // 13
        '.....HBBBBBSSSSssSSSSBBBBbb.....', // 14
        '....HBBBBBBBSSSssSSSBBBBBBbb....', // 15
        '....BBBBBBBBSSSSSSSSBBBBBbbb....', // 16
        '.....BBBBBBBBSSSSSSBBBBBbbb.....', // 17
        '......BBBBBBBBSSSSBBBBBbbb......', // 18
        '.......BBBBBBBBSSBBBBBBbb.......', // 19
        '........BBBBBBBBBBBBBBbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'heart_base', role: 'accessory' },
        s: { name: 'plus_base', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        accessory: { shadow: '#d04648', base: '#d04648', highlight: '#d2aa99' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  12. buff_invisibility_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_invisibility_icon_32',
      description: 'Invisibility buff icon with slashed eye on a cyan diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HBBBBBBBBSSb..........', // 9
        '.........HBBBBBBBBSSBbb.........', // 10
        '........HBBBBBBBBSSBBBbb........', // 11
        '.......HBBBBBBBBSSBBBBBbb.......', // 12
        '......HBBBBBSSSSSSSSBBBBbb......', // 13
        '.....HBBBBSSSSssssSSSSBBBbb.....', // 14
        '....HBBBBSSSSssssssSSSSBBBbb....', // 15
        '....BBBBBSSSSssssssSSSSBBbbb....', // 16
        '.....BBBBBSSSSssssSSSSBBbbb.....', // 17
        '......BBBBBBSSSSSSSSBBBbbb......', // 18
        '.......BBBBBBBSSBBBBBBBbb.......', // 19
        '........BBBBBSSBBBBBBBbb........', // 20
        '.........BBBSSBBBBBBBbb.........', // 21
        '..........BSSBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'eye_base', role: 'accessory' },
        s: { name: 'pupil', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  13. buff_berserk_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_berserk_icon_32',
      description: 'Berserk buff icon with angry face on a dark red diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HBBBBBBBBBbb..........', // 9
        '.........HSSSBBBBBBSSSb.........', // 10
        '........HBBSSSBBBBSSSBbb........', // 11
        '.......HBBBBSSSBBSSSBBBbb.......', // 12
        '......HBBBBSSSBBBBSSSBBBbb......', // 13
        '.....HBBBBBSSSBBBBSSSBBBBbb.....', // 14
        '....HBBBBBBBBBBBBBBBBBBBBBbb....', // 15
        '....BBBBBBBBBBBBBBBBBBBBBbbb....', // 16
        '.....BBBBBBBSSSSSSSSBBBBbbb.....', // 17
        '......BBBBBSSssSSssSSBBbbb......', // 18
        '.......BBBBSSSSSSSSSSBBbb.......', // 19
        '........BBBBSSSSSSSSBBbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'face_base', role: 'accessory' },
        s: { name: 'face_detail', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#d04648' },
        accessory: { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  14. buff_curse_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_curse_icon_32',
      description: 'Curse debuff icon with skull on a dark purple diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HBBSSSSSSBbb..........', // 9
        '.........HBBSSSSSSSSBbb.........', // 10
        '........HBBSSssSSssSSBbb........', // 11
        '.......HBBBSSssSSssSSBBbb.......', // 12
        '......HBBBBSSSSSSSSSSBBBbb......', // 13
        '.....HBBBBBBSSSssSSSBBBBBbb.....', // 14
        '....HBBBBBBBSSSSSSSSBBBBBBbb....', // 15
        '....BBBBBBBBBSsSSsSBBBBBBbbb....', // 16
        '.....BBBBBBBBSsSSsSBBBBBbbb.....', // 17
        '......BBBBBBBBBBBBBBBBBbbb......', // 18
        '.......BBBBBBBBBBBBBBBBbb.......', // 19
        '........BBBBBBBBBBBBBBbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'skull_base', role: 'accessory' },
        s: { name: 'skull_detail', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  15. buff_barrier_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_barrier_icon_32',
      description: 'Barrier buff icon with dome arc on a cyan diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HBBBSSSSBBbb..........', // 9
        '.........HBBSSssssSSBbb.........', // 10
        '........HBBSSssssssSSBbb........', // 11
        '.......HBBSSSBBBBBBSSSBbb.......', // 12
        '......HBBBSSSBBBBBBSSSBBbb......', // 13
        '.....HBBBBSSBBBBBBBBSSBBBbb.....', // 14
        '....HBBBBBSSBBBBBBBBSSBBBBbb....', // 15
        '....BBBBBBSSBBBBBBBBSSBBBbbb....', // 16
        '.....BBBBBSSBBBBBBBBSSBBbbb.....', // 17
        '......BBBBSSBBBBBBBBSSBbbb......', // 18
        '.......BBBSSSSSSSSSSSSBbb.......', // 19
        '........BBSSSSSSSSSSSSbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'dome_base', role: 'accessory' },
        s: { name: 'dome_glow', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  16. buff_luck_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_luck_icon_32',
      description: 'Luck buff icon with four-leaf clover on a green-gold diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HBBBSSSSBBbb..........', // 9
        '.........HBBBSSssSSBBbb.........', // 10
        '........HBBBBSSSSSSBBBbb........', // 11
        '.......HBBBBBBSSSSBBBBBbb.......', // 12
        '......HBBBSSSSBSSBSSSSBBbb......', // 13
        '.....HBBBSSssSSSSSSssSSBBbb.....', // 14
        '....HBBBBSSSSSSSSSSSSSSBBBbb....', // 15
        '....BBBBBBSSSSBSSBSSSSBBBbbb....', // 16
        '.....BBBBBBBBBSSSSBBBBBBbbb.....', // 17
        '......BBBBBBBSSssSSBBBBbbb......', // 18
        '.......BBBBBBSSSSSSBBBBbb.......', // 19
        '........BBBBBBSSSSBBBBbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'clover_base', role: 'accessory' },
        s: { name: 'clover_vein', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  17. buff_critical_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_critical_icon_32',
      description: 'Critical buff icon with exclamation mark on a red diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBSSSSBBb...........', // 8
        '..........HBBBSssSBBbb..........', // 9
        '.........HBBBBSssSBBBbb.........', // 10
        '........HBBBBBSssSBBBBbb........', // 11
        '.......HBBBBBBSssSBBBBBbb.......', // 12
        '......HBBBBBBBSssSBBBBBBbb......', // 13
        '.....HBBBBBBBBSssSBBBBBBBbb.....', // 14
        '....HBBBBBBBBBSssSBBBBBBBBbb....', // 15
        '....BBBBBBBBBBSSSSBBBBBBBbbb....', // 16
        '.....BBBBBBBBBSSSSBBBBBBbbb.....', // 17
        '......BBBBBBBBBBBBBBBBBbbb......', // 18
        '.......BBBBBBBSSSSBBBBBbb.......', // 19
        '........BBBBBBSSSSBBBBbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'mark_base', role: 'accessory' },
        s: { name: 'mark_highlight', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  18. buff_reflect_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_reflect_icon_32',
      description: 'Reflect buff icon with opposing arrows on a silver diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HBBBBBBBBBbb..........', // 9
        '.........HBBBBBBBBBBBbb.........', // 10
        '........HBSSBBBBBBBBBBbb........', // 11
        '.......HBSSSSSSSSSSSSSSbb.......', // 12
        '......HBSSSSSSSSSSSSSSSBbb......', // 13
        '.....HBBBSSSSSSBBBBBBBBBBbb.....', // 14
        '....HBBBBBSSBBBBBBBBBBBBBBbb....', // 15
        '....BBBBBBBBBBBBBBBBSSBBBbbb....', // 16
        '.....BBBBBBBBBBBBSSSSSSBbbb.....', // 17
        '......BBBSSSSSSSSSSSSSSSbb......', // 18
        '.......BBSSSSSSSBSSSSSSbb.......', // 19
        '........BBBBBBBBBBBBSSbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'arrow_base', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  19. buff_silence_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_silence_icon_32',
      description: 'Silence debuff icon with crossed speech bubble on a gray-purple diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBBBBBBBb...........', // 8
        '..........HBSSSSSSSSSb..........', // 9
        '.........HBSSSSSSSSSSSb.........', // 10
        '........HBSSssSSSSssSSbb........', // 11
        '.......HBBSSSssSSssSSSBbb.......', // 12
        '......HBBBSSSSssssSSSSBBbb......', // 13
        '.....HBBBBSSSssSSssSSSBBBbb.....', // 14
        '....HBBBBBBSssSSSSssSSBBBBbb....', // 15
        '....BBBBBBBBSSSSSSSSSBBBBbbb....', // 16
        '.....BBBBBBBSSSBBBBBBBBBbbb.....', // 17
        '......BBBBBSSSBBBBBBBBBbbb......', // 18
        '.......BBBBBBBBBBBBBBBBbb.......', // 19
        '........BBBBBBBBBBBBBBbb........', // 20
        '.........BBBBBBBBBBBBbb.........', // 21
        '..........BBBBBBBBBBbb..........', // 22
        '...........BBBBBBBbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'bubble_base', role: 'accessory' },
        s: { name: 'x_mark', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════════
    //  20. buff_heal_over_time_icon_32
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'buff_heal_over_time_icon_32',
      description: 'Heal-over-time buff icon with bold plus cross on a green diamond.',
      size: 32,
      grid: [
        '................................', // 0
        '................................', // 1
        '................................', // 2
        '................................', // 3
        '...............HB...............', // 4
        '..............HBBB..............', // 5
        '.............HBBBBB.............', // 6
        '............HBBBBBBb............', // 7
        '...........HBBSSSSBBb...........', // 8
        '..........HBBBSSSSBBbb..........', // 9
        '.........HBBBBSssSBBBbb.........', // 10
        '........HBBBBBSssSBBBBbb........', // 11
        '.......HBBBBBBSssSBBBBBbb.......', // 12
        '......HBBSSSSSSssSSSSSSBbb......', // 13
        '.....HBBBSSssssSSssssSSBBbb.....', // 14
        '....HBBBBSSssssSSssssSSBBBbb....', // 15
        '....BBBBBSSssssSSssssSSBBbbb....', // 16
        '.....BBBBSSssssSSssssSSBbbb.....', // 17
        '......BBBSSSSSSssSSSSSSbbb......', // 18
        '.......BBBBBBBSssSBBBBBbb.......', // 19
        '........BBBBBBSssSBBBBbb........', // 20
        '.........BBBBBSssSBBBbb.........', // 21
        '..........BBBBSSSSBBbb..........', // 22
        '...........BBBSSSSbbb...........', // 23
        '............BBBBBbbb............', // 24
        '.............BBBbbb.............', // 25
        '..............Bbbb..............', // 26
        '...............bb...............', // 27
        '................................', // 28
        '................................', // 29
        '................................', // 30
        '................................', // 31
      ],
      chars: {
        B: { name: 'diamond_base', role: 'body' },
        b: { name: 'diamond_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'diamond_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'cross_base', role: 'accessory' },
        s: { name: 'cross_highlight', role: 'accessory', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

  ],
};
export default batch;
