/**
 * Effects batch 5 — 15 more VFX to push past 100 in VFX bundle.
 * Environmental, combat, and status effects.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'effects',
  exportNames: { templates: 'EFFECT_BATCH5_TEMPLATES', schemes: 'EFFECT_BATCH5_COLOR_SCHEMES' },
  templates: [

    // ─── 1. DUST CLOUD ─────────────────────────────────────
    {
      id: 'dust_cloud_16',
      description: 'Rising dust cloud from impact.',
      grid: [
        '................',
        '......BBB.......',
        '.....BBBBB......',
        '....BBBBBBB.....',
        '...BBBBBBBBB....',
        '..BBBBBBBBBBB...',
        '..BBBBBBBBBBB...',
        '.BBBBBBBBBBBBB..',
        '.BBBBBBBBBBBBB..',
        '..BBBBBBBBBBB...',
        '...BBBBBBBBB....',
        '....BBBBBBB.....',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'dust', role: 'body' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── 2. FLAME TRAIL ────────────────────────────────────
    {
      id: 'flame_trail_16',
      description: 'Horizontal flame trail / fire wake.',
      grid: [
        '................',
        '................',
        '................',
        '................',
        '......EEBB......',
        '.....EEEBBBB....',
        'HHHEEEEEBBBBBB..',
        'HHHEEEEEEBBBBBB.',
        'HHHEEEEEBBBBBB..',
        '.....EEEBBBB....',
        '......EEBB......',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'tail', role: 'head' },
        E: { name: 'mid_flame', role: 'eye' },
        B: { name: 'hot_core', role: 'body' },
      },
      colors: {
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d04648' },
        eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 3. LEVEL UP ───────────────────────────────────────
    {
      id: 'level_up_fx_16',
      description: 'Level up ascending sparkle column.',
      grid: [
        '......EE........',
        '.....E..E.......',
        '....E....E......',
        '...E..BB..E.....',
        '..E..BBBB..E....',
        '..E..BBBB..E....',
        '..E..BBBB..E....',
        '...E.BBBB.E.....',
        '...E.BBBB.E.....',
        '....EBBBBE......',
        '....EBBBBE......',
        '.....BBBB.......',
        '.....BBBB.......',
        '......BB........',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'sparkle', role: 'eye' },
        B: { name: 'beam', role: 'body' },
      },
      colors: {
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 4. RAIN DROP ──────────────────────────────────────
    {
      id: 'rain_drops_16',
      description: 'Falling rain drop particles.',
      grid: [
        '..E......E......',
        '..E......E......',
        '..E......E......',
        '................',
        '......E......E..',
        '......E......E..',
        '......E......E..',
        '................',
        '..E......E......',
        '..E......E......',
        '..E......E......',
        '................',
        '......E......E..',
        '......E......E..',
        '......E......E..',
        '................',
      ],
      chars: {
        E: { name: 'drop', role: 'eye' },
      },
      colors: {
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 5. SNOW FALL ──────────────────────────────────────
    {
      id: 'snowfall_16',
      description: 'Falling snowflake particles.',
      grid: [
        '..E.....E...E...',
        '.......E........',
        '....E.......E...',
        'E.........E.....',
        '...E....E.......',
        '.......E...E....',
        '.E...........E..',
        '........E.......',
        '...E........E...',
        'E......E........',
        '....E......E....',
        '.........E......',
        '..E...E.....E...',
        '.......E........',
        '....E.........E.',
        '................',
      ],
      chars: {
        E: { name: 'flake', role: 'eye' },
      },
      colors: {
        eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 6. IMPACT STAR ────────────────────────────────────
    {
      id: 'impact_star_16',
      description: 'Comic-style impact star / hit marker.',
      grid: [
        '................',
        '.......EE.......',
        '......EEEE......',
        '.......EE.......',
        '....E.EEEE.E....',
        '...EEEEEEEEEE...',
        '...EEEEBBEEE....',
        '..EEEEEBBEEEE...',
        '..EEEEEBBEEEE...',
        '...EEEEBBEEE....',
        '...EEEEEEEEEE...',
        '....E.EEEE.E....',
        '.......EE.......',
        '......EEEE......',
        '.......EE.......',
        '................',
      ],
      chars: {
        E: { name: 'star', role: 'eye' },
        B: { name: 'center', role: 'body' },
      },
      colors: {
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 7. SMOKE RING ─────────────────────────────────────
    {
      id: 'smoke_ring_16',
      description: 'Expanding smoke ring.',
      grid: [
        '................',
        '....BBBBBB......',
        '..BBB....BBB....',
        '.BB........BB...',
        '.B..........B...',
        'B............B..',
        'B............B..',
        'B............B..',
        'B............B..',
        '.B..........B...',
        '.BB........BB...',
        '..BBB....BBB....',
        '....BBBBBB......',
        '................',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'smoke', role: 'body' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
      },
    },

    // ─── 8. ARROW TRAIL ────────────────────────────────────
    {
      id: 'arrow_trail_16',
      description: 'Arrow projectile with speed trail.',
      grid: [
        '................',
        '................',
        '................',
        '................',
        '................',
        '...........BB...',
        'HHHHEEEEEBBBB...',
        'HHHHEEEEEBBBBEE.',
        'HHHHEEEEEBBBB...',
        '...........BB...',
        '................',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'trail', role: 'head' },
        E: { name: 'shaft', role: 'eye' },
        B: { name: 'head', role: 'body' },
      },
      colors: {
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
      },
    },

    // ─── 9. MAGIC RUNE ─────────────────────────────────────
    {
      id: 'magic_rune_16',
      description: 'Glowing magical rune symbol.',
      grid: [
        '................',
        '...EEEE.EEEE....',
        '..EE..E.E..EE...',
        '..E...EEE...E...',
        '..E....E....E...',
        '..EE...E...EE...',
        '...EEEEEEEE.....',
        '.......E........',
        '...EEEEEEEE.....',
        '..EE...E...EE...',
        '..E....E....E...',
        '..E...EEE...E...',
        '..EE..E.E..EE...',
        '...EEEE.EEEE....',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'rune', role: 'eye' },
      },
      colors: {
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 10. BUBBLE POP ────────────────────────────────────
    {
      id: 'bubble_pop_16',
      description: 'Bursting bubble / pop effect.',
      grid: [
        '................',
        '..E...E...E.....',
        '.EE..EE..EE.....',
        '..E...E...E.....',
        '................',
        '.....EEEE.......',
        '...EE....EE.....',
        '..E........E....',
        '..E........E....',
        '..E........E....',
        '...EE....EE.....',
        '.....EEEE.......',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'bubble', role: 'eye' },
      },
      colors: {
        eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 11. ENERGY WAVE ───────────────────────────────────
    {
      id: 'energy_wave_16',
      description: 'Expanding energy wave / pulse.',
      grid: [
        '................',
        '................',
        '...EEEE.........',
        '..EE..EEEE......',
        '.EE......EEE....',
        '.E.........EE...',
        'E...........EE..',
        'E............E..',
        'E............E..',
        '.E..........E...',
        '.EE........EE...',
        '..EE.....EE.....',
        '...EEEEEE.......',
        '................',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'wave', role: 'eye' },
      },
      colors: {
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 12. CRYSTAL SHATTER ───────────────────────────────
    {
      id: 'crystal_shatter_16',
      description: 'Shattering crystal / glass fragments.',
      grid: [
        '..B.........B...',
        '..BB.......BB...',
        '...BB.....BB....',
        '....BB.E.BB.....',
        '.....BBEEBB.....',
        '..E..BBEEBB.E...',
        '.....BBBBBB.....',
        '...BBBBBBBBB....',
        '.....BBBBBB.....',
        '..E..BBEEBB.E...',
        '.....BBEEBB.....',
        '....BB.E.BB.....',
        '...BB.....BB....',
        '..BB.......BB...',
        '..B.........B...',
        '................',
      ],
      chars: {
        B: { name: 'shard', role: 'body' },
        E: { name: 'sparkle', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 13. PORTAL SWIRL ──────────────────────────────────
    {
      id: 'portal_swirl_16',
      description: 'Swirling portal vortex.',
      grid: [
        '................',
        '.....EEEE.......',
        '...EEE..EEE.....',
        '..EE.BBBB.EE....',
        '..E.BBBBBB.E....',
        '.E.BBBHHBBB.E...',
        '.E.BBBHHBBB.E...',
        '.E.BBBHHBBB.E...',
        '.E.BBBHHBBB.E...',
        '..E.BBBBBB.E....',
        '..EE.BBBB.EE....',
        '...EEE..EEE.....',
        '.....EEEE.......',
        '................',
        '................',
        '................',
      ],
      chars: {
        E: { name: 'outer_ring', role: 'eye' },
        B: { name: 'inner_swirl', role: 'body' },
        H: { name: 'center', role: 'head' },
      },
      colors: {
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#d04648' },
      },
    },

    // ─── 14. DEATH SKULL ───────────────────────────────────
    {
      id: 'death_skull_fx_16',
      description: 'Death / KO skull icon effect.',
      grid: [
        '................',
        '.....BBBBBB.....',
        '....BBBBBBBB....',
        '...BBBBBBBBBB...',
        '..BBEEBB.EEBB...',
        '..BBEEBB.EEBB...',
        '..BBBBBBBBBB....',
        '...BBBBBBBB.....',
        '....BBBBBB......',
        '...BBEBBEBB.....',
        '...BBBBBBBB.....',
        '....BBBBBB......',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        B: { name: 'skull', role: 'body' },
        E: { name: 'socket', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
      },
    },

    // ─── 15. HOLY LIGHT ────────────────────────────────────
    {
      id: 'holy_light_16',
      description: 'Divine holy light beam from above.',
      grid: [
        '......EEEE......',
        '.....EEEEEE.....',
        '.....EEEEEE.....',
        '....EEEEEEEE....',
        '....EEEEEEEE....',
        '...EEEEEEEEEE...',
        '...EEEEEEEEEE...',
        '..EEEEEEEEEEEE..',
        '..EEEEEEEEEEEE..',
        '..EEEEEEEEEEEE..',
        '..EEEEBBEEEEEE..',
        '..EEEBBBBEEEE...',
        '...EEEBBEEEE....',
        '....EEEEEE......',
        '.....EEEE.......',
        '................',
      ],
      chars: {
        E: { name: 'light', role: 'eye' },
        B: { name: 'core', role: 'body' },
      },
      colors: {
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
