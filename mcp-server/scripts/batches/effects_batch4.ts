/**
 * Effects batch 4 — 20 new VFX templates to reach 100 in VFX bundle.
 * Status effects, weapon trails, environmental FX, UI particles.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'effects',
  exportNames: { templates: 'EFFECT_BATCH4_TEMPLATES', schemes: 'EFFECT_BATCH4_COLOR_SCHEMES' },
  templates: [

    // ─── 1. POISON CLOUD ───────────────────────────────────
    {
      id: 'poison_cloud_16',
      description: 'Toxic poison gas cloud.',
      grid: [
        '................',
        '.......BB.......',
        '......BBBB......',
        '.....BBBBBB.....',
        '....BBBBBBBB....',
        '...BBEBBBBBB....',
        '..BBBBBBBBBBBB..',
        '..BBBBBBEBBBB...',
        '..BBBBBBBBBBBB..',
        '...BBBBBBBBBB...',
        '....BBBBBBBB....',
        '.....BBBBBB.....',
        '......BBBB......',
        '................',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'gas', role: 'body' },
        E: { name: 'bubble', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 2. HEAL AURA ──────────────────────────────────────
    {
      id: 'heal_aura_16',
      description: 'Green healing aura ring.',
      grid: [
        '................',
        '...HHHHHHHH.....',
        '..HH......HH....',
        '.HH........HH...',
        '.HEEEEEEEEEEH...',
        '.HEE......EEH...',
        '.HEE......EEH...',
        '.HEE......EEH...',
        '.HEE......EEH...',
        '.HEEEEEEEEEEH...',
        '.HH........HH...',
        '..HH......HH....',
        '...HHHHHHHH.....',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'outer_ring', role: 'head' },
        E: { name: 'inner_ring', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        eye:       { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 3. SWORD SLASH ────────────────────────────────────
    {
      id: 'sword_slash_16',
      description: 'Arcing sword slash trail effect.',
      grid: [
        '..........EEEE..',
        '.........EEEE...',
        '........EEEE....',
        '.......EEEEE....',
        '......EEEEE.....',
        '.....EEEEE......',
        '....EEEEE.......',
        '...EEEEE........',
        '..EEEEE.........',
        '.EEEEE..........',
        '.EEEE...........',
        '..EE............',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'slash', role: 'eye' },
      },
      colors: {
        eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 4. FIRE PILLAR ────────────────────────────────────
    {
      id: 'fire_pillar_16',
      description: 'Vertical column of fire.',
      grid: [
        '.....HHHH.......',
        '....HHHHH.......',
        '....HHHHHH......',
        '...HHHBBHH......',
        '...HHBBBBHH.....',
        '...HHBBBBHH.....',
        '...HBBBBBH......',
        '...HBBEBBH......',
        '...HBBEBBH......',
        '...HBBBBBH......',
        '...HHBBBBHH.....',
        '...HHBBBBHH.....',
        '....HHHHHH......',
        '....HHHHH.......',
        '.....HHHH.......',
        '......HH........',
      ],
      chars: {
        H: { name: 'outer_flame', role: 'head' },
        B: { name: 'inner_flame', role: 'body' },
        E: { name: 'core', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 5. ICE CRYSTAL ────────────────────────────────────
    {
      id: 'ice_crystal_fx_16',
      description: 'Freezing ice crystal formation.',
      grid: [
        '.......B........',
        '......BBB.......',
        '.......B........',
        '.......B........',
        '...B..BBB..B....',
        '....BBBEBBB.....',
        '.....BEEEB......',
        '..BBBEEEEEBBB...',
        '.....BEEEB......',
        '....BBBEBBB.....',
        '...B..BBB..B....',
        '.......B........',
        '.......B........',
        '......BBB.......',
        '.......B........',
        '................',
      ],
      chars: {
        B: { name: 'crystal', role: 'body' },
        E: { name: 'core', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 6. ELECTRIC BOLT ──────────────────────────────────
    {
      id: 'electric_bolt_16',
      description: 'Jagged electric bolt / chain lightning.',
      grid: [
        '.....EEE........',
        '....EEE.........',
        '.....EEE........',
        '.....EEEE.......',
        '......EEE.......',
        '.....EEE........',
        '....EEEE........',
        '....EEE.........',
        '.....EEE........',
        '.....EEEEE......',
        '......EEE.......',
        '.....EEE........',
        '....EEEE........',
        '....EEE.........',
        '.....EEE........',
        '................',
      ],
      chars: {
        E: { name: 'bolt', role: 'eye' },
      },
      colors: {
        eye:       { shadow: '#597dce', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 7. BLOOD SPLATTER ─────────────────────────────────
    {
      id: 'blood_splatter_16',
      description: 'Impact blood splatter effect.',
      grid: [
        '................',
        '.....B..........',
        '....BBB...B.....',
        '...BBBBB.BB.....',
        '...BBBBBBB......',
        '..BBBBBBBB......',
        '..BBBBBBBBB.....',
        '.BBBBBBBBBBB....',
        '..BBBBBBBBB.....',
        '..BBBBBBBBB.....',
        '...BBBBBBB......',
        '....BBBBB.......',
        '.....BBB........',
        '......B.........',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'blood', role: 'body' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#d04648' },
      },
    },

    // ─── 8. SHIELD BUBBLE ──────────────────────────────────
    {
      id: 'shield_bubble_16',
      description: 'Protective shield bubble / barrier.',
      grid: [
        '....EEEEEEEE....',
        '..EE........EE..',
        '.E............E.',
        '.E............E.',
        'E..............E',
        'E..............E',
        'E..............E',
        'E..............E',
        'E..............E',
        'E..............E',
        'E..............E',
        '.E............E.',
        '.E............E.',
        '..EE........EE..',
        '....EEEEEEEE....',
        '................',
      ],
      chars: {
        E: { name: 'barrier', role: 'eye' },
      },
      colors: {
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 9. STAR BURST ─────────────────────────────────────
    {
      id: 'star_burst_16',
      description: 'Radial star burst / collect effect.',
      grid: [
        '.......E........',
        '......EEE.......',
        '.......E........',
        '..E....E....E...',
        '...EE.EEE.EE....',
        '....EEEEEEE.....',
        '..EEEEEEEEEEE...',
        '....EEEEEEE.....',
        '...EE.EEE.EE....',
        '..E....E....E...',
        '.......E........',
        '......EEE.......',
        '.......E........',
        '................',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'ray', role: 'eye' },
      },
      colors: {
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 10. DARK AURA ─────────────────────────────────────
    {
      id: 'dark_aura_16',
      description: 'Dark/shadow aura emanation.',
      grid: [
        '...B........B...',
        '..BB........BB..',
        '..BBB......BBB..',
        '..BBBB....BBBB..',
        '...BBBB..BBBB...',
        '....BBBBBBBB....',
        '.....BBBBBB.....',
        '......BBBB......',
        '.....BBBBBB.....',
        '....BBBBBBBB....',
        '...BBBB..BBBB...',
        '..BBBB....BBBB..',
        '..BBB......BBB..',
        '..BB........BB..',
        '...B........B...',
        '................',
      ],
      chars: {
        B: { name: 'shadow', role: 'body' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#30346d' },
      },
    },

    // ─── 11. SPEED LINES ───────────────────────────────────
    {
      id: 'speed_lines_16',
      description: 'Horizontal speed / dash lines.',
      grid: [
        '................',
        '................',
        '.EEEEEE.........',
        '................',
        '...EEEEEEEE.....',
        '................',
        'EEEEEEEEEEE.....',
        '................',
        '..EEEEEEEEE.....',
        '................',
        '....EEEEEEE.....',
        '................',
        '.EEEEEE.........',
        '................',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'line', role: 'eye' },
      },
      colors: {
        eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 12. CONFETTI ──────────────────────────────────────
    {
      id: 'confetti_16',
      description: 'Celebration confetti particles.',
      grid: [
        '..BB...EE..HH...',
        '...HH...BB......',
        '.EE...BB.....HH.',
        '.....HH...EE....',
        '..BB....HH...BB.',
        '....EE......EE..',
        '.HH....BB.......',
        '......EE..HH....',
        '...BB.....EE....',
        '.EE...HH.....BB.',
        '.....BB...EE....',
        '..HH......BB....',
        '....EE..HH......',
        '..BB......EE....',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'red_conf', role: 'body' },
        E: { name: 'gold_conf', role: 'eye' },
        H: { name: 'blue_conf', role: 'head' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 13. WATER SPLASH ──────────────────────────────────
    {
      id: 'water_splash_16',
      description: 'Water splash impact effect.',
      grid: [
        '..E..........E..',
        '..EE........EE..',
        '...EE......EE...',
        '....E......E....',
        '.....BBBB.E.....',
        '....BBBBBB......',
        '...BBBBBBBB.....',
        '..BBBBBBBBBB....',
        '..BBBBBBBBBB....',
        '...BBBBBBBB.....',
        '....BBBBBB......',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'water', role: 'body' },
        E: { name: 'droplet', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 14. SOUL ORB ──────────────────────────────────────
    {
      id: 'soul_orb_16',
      description: 'Floating soul / spirit orb.',
      grid: [
        '................',
        '................',
        '.....HHHHHH.....',
        '....HHHHHHHH....',
        '...HHBBBBBBHH...',
        '...HHBBEEBHH....',
        '...HHBBEEBHH....',
        '...HHBBBBBBHH...',
        '....HHHHHHHH....',
        '.....HHHHHH.....',
        '......HHHH......',
        '.......HH.......',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'glow', role: 'head' },
        B: { name: 'core', role: 'body' },
        E: { name: 'eye', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 15. TORNADO ───────────────────────────────────────
    {
      id: 'tornado_fx_16',
      description: 'Spinning tornado / whirlwind.',
      grid: [
        '.......BB.......',
        '......BBBB......',
        '.....BBBBBB.....',
        '....BBBBBBB.....',
        '...BBBBBBBB.....',
        '....BBBBBBB.....',
        '.....BBBBBB.....',
        '......BBBBB.....',
        '.....BBBBBB.....',
        '....BBBBBBB.....',
        '...BBBBBBBBBB...',
        '..BBBBBBBBBBB...',
        '.BBBBBBBBBBBB...',
        'BBBBBBBBBBBBBBB.',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'wind', role: 'body' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 16. SPELL CIRCLE ──────────────────────────────────
    {
      id: 'spell_circle_16',
      description: 'Magic spell circle / sigil on ground.',
      grid: [
        '................',
        '................',
        '................',
        '................',
        '....EEEEEE......',
        '...EE....EE.....',
        '..EE.BBBB.EE....',
        '..E..BEEB..E....',
        '..E..BEEB..E....',
        '..EE.BBBB.EE....',
        '...EE....EE.....',
        '....EEEEEE......',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'circle', role: 'eye' },
        B: { name: 'sigil', role: 'body' },
      },
      colors: {
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 17. LASER BEAM ────────────────────────────────────
    {
      id: 'laser_beam_16',
      description: 'Horizontal laser beam.',
      grid: [
        '................',
        '................',
        '................',
        '................',
        '................',
        'HHHHHHHHHHHHHHHH',
        'EEEEEEEEEEEEEEEE',
        'BBBBBBBBBBBBBBB.',
        'EEEEEEEEEEEEEEEE',
        'HHHHHHHHHHHHHHHH',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'glow', role: 'head' },
        E: { name: 'beam_edge', role: 'eye' },
        B: { name: 'beam_core', role: 'body' },
      },
      colors: {
        head:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 18. GRAVITY WAVE ──────────────────────────────────
    {
      id: 'gravity_wave_16',
      description: 'Expanding gravity distortion wave.',
      grid: [
        '................',
        '....EEEEEEEE....',
        '..EE........EE..',
        '.E..........EE..',
        'E............E..',
        'E............E..',
        'E............E..',
        'E............E..',
        'E............E..',
        'E............E..',
        '.E..........E...',
        '..EE........EE..',
        '....EEEEEEEE....',
        '................',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'wave', role: 'eye' },
      },
      colors: {
        eye:       { shadow: '#442434', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 19. SPARKLE TRAIL ─────────────────────────────────
    {
      id: 'sparkle_trail_16',
      description: 'Sparkling magic trail / fairy dust.',
      grid: [
        '............EEEE',
        '...........EEEE.',
        '.........EEEEE..',
        '........EEEEE...',
        '.......EEEEE....',
        '......EEBE......',
        '.....EEBE.......',
        '....EEBE........',
        '...EEBE.........',
        '..EEBE..........',
        '.EEBE...........',
        'EEEE............',
        'EEE.............',
        'EE..............',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'trail', role: 'eye' },
        B: { name: 'sparkle', role: 'body' },
      },
      colors: {
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 20. SHOCKWAVE ─────────────────────────────────────
    {
      id: 'shockwave_16',
      description: 'Radial shockwave / ground pound.',
      grid: [
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
        '.EEEE..EEEEE....',
        'EE..EEEEE...EE..',
        'E............EE.',
        '..EE.......EE...',
        '....EEEEEE......',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'wave', role: 'eye' },
      },
      colors: {
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
