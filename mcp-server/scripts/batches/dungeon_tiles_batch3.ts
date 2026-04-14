/**
 * Dungeon Tiles batch 3 — 20 natural/terrain tiles (seamless/tileable).
 * Row 0 matches row 15, col 0 matches col 15 for seamless tiling.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'dungeon_tiles',
  exportNames: { templates: 'DUNGEON_TILES_BATCH3_TEMPLATES', schemes: 'DUNGEON_TILES_BATCH3_COLOR_SCHEMES' },
  templates: [

    // 1. dirt_floor_tile_16
    {
      id: 'dirt_floor_tile_16',
      description: 'Tileable packed dirt floor with pebble detail.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBBBHBBBBBBBBBB',
        'BBBBBBBBBBHBBBBB',
        'BHBBBBBBBBBBBBB.',
        'BBBBBBBHBBBBBBBB',
        'BBBBBBBBBBBBBHBB',
        'BBHBBBBBBBBBBBB.',
        'BBBBBHBBBBHBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBHBBBBBB',
        'BHBBBBBBBBBBBBB.',
        'BBBBBHBBBBBHBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBHBBBBBBBBBHBB',
        'BBBBBBBBHBBBBBBB',
        'BBBBBBBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'dirt', role: 'body' },
        H: { name: 'pebble', role: 'head' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
      },
    },

    // 2. cave_floor_tile_16
    {
      id: 'cave_floor_tile_16',
      description: 'Tileable natural cave floor with rough uneven surface.',
      grid: [
        'BBBHBBBBBHBBBBBB',
        'BBBBBBBBBBBBHBBB',
        'BHBBBBHBBBBBBBBB',
        'BBBBBBBBBBBBBHBB',
        'BBHBBBBBBHBBBBBB',
        'BBBBBHBBBBBBBBHB',
        'BBBBBBBBHBBBBBBB',
        'BHBBBBBBBBBHBBBB',
        'BBBBBHBBBBBBBBBB',
        'BBHBBBBBBBBBHBBB',
        'BBBBBBBHBBBBBBBB',
        'BHBBBBBBBBHBBBBB',
        'BBBBHBBBBBBBBBHB',
        'BBBBBBBHBBBBBBBB',
        'BBHBBBBBBBBHBBBB',
        'BBBBBHBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'rock', role: 'body' },
        H: { name: 'shadow', role: 'head' },
      },
      colors: {
        body: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        head: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // 3. grass_tile_16
    {
      id: 'grass_tile_16',
      description: 'Tileable grass surface with blade variation.',
      grid: [
        'BBHBBBBBHBBBBBBB',
        'BBBBBHBBBBBBHBBB',
        'BHBBBBBBBBHBBBBB',
        'BBBBBHBBBBBBBBHB',
        'BBHBBBBBHBBBBBBB',
        'BBBBBBBBBBBHBBBB',
        'BHBBBBHBBBBBBBHB',
        'BBBHBBBBBHBBBBBB',
        'BBBBBBHBBBBBBHBB',
        'BHBBBBBBBHBBBBBB',
        'BBBHBBBBBBBBHBBB',
        'BBBBBBHBBBBBBBBB',
        'BHBBBBBBBHBBBHBB',
        'BBBHBBBBBBBBBBBB',
        'BBBBBBHBBBHBBBBB',
        'BHBBBBBBBBBBBHBB',
      ],
      chars: {
        B: { name: 'grass', role: 'body' },
        H: { name: 'blade', role: 'head' },
      },
      colors: {
        body: { shadow: '#346524', base: '#346524', highlight: '#346524' },
        head: { shadow: '#346524', base: '#6dc2ca', highlight: '#dad45e' },
      },
    },

    // 4. water_tile_16
    {
      id: 'water_tile_16',
      description: 'Tileable water surface with ripple highlights.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBHHBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBHHBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBB.',
        'BBHHBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBHBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBHHBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BHHBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'water', role: 'body' },
        H: { name: 'ripple', role: 'head' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#597dce' },
        head: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // 5. lava_tile_16
    {
      id: 'lava_tile_16',
      description: 'Tileable lava surface with bright hot spots.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBHBBBBBBBB',
        'BBBBBBBHBBBBBBBB',
        'BBBHBBBBBBBBBBBB',
        'BBBHBBBBBBBBHBBB',
        'BBBBBBBBBBBBHBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBB.',
        'BBBBBBHBBBBBBBB.',
        'BBBBBBHBBBBBBBB.',
        'BBBBBBBBBBHBBBBB',
        'BBBBBBBBBHHBBBBB',
        'BBHBBBBBBBBBBBBB',
        'BHHBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'lava', role: 'body' },
        H: { name: 'hotspot', role: 'head' },
      },
      colors: {
        body: { shadow: '#d04648', base: '#d27d2c', highlight: '#d27d2c' },
        head: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // 6. ice_floor_tile_16
    {
      id: 'ice_floor_tile_16',
      description: 'Tileable ice floor with frozen surface cracks.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBBBCBBBBBBBBBB',
        'BBBBCBBBBBBBBBBB',
        'BBBCBBBBBBBBCBBB',
        'BBBBBBBBBBBBCBBB',
        'BBBBBBBBBBBCBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBB.',
        'BCBBBBBBBBBBBBBB',
        'BBCBBBBBBBBBBBBB',
        'BBBCBBBBBBCBBBBB',
        'BBBBBBBBBBCBBBBB',
        'BBBBBBBBBCBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBCBBBBBBBBBB',
        'BBBBCBBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'ice', role: 'body' },
        C: { name: 'crack', role: 'head' },
      },
      colors: {
        body: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        head: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // 7. sand_tile_16
    {
      id: 'sand_tile_16',
      description: 'Tileable desert sand with wind ripple pattern.',
      grid: [
        'BBBBBBBHBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBHBBBBBBHBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBHBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBHBBBBBBBBHBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBHBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBHBBBBBBHBBBB',
      ],
      chars: {
        B: { name: 'sand', role: 'body' },
        H: { name: 'ripple', role: 'head' },
      },
      colors: {
        body: { shadow: '#d27d2c', base: '#d2aa99', highlight: '#deeed6' },
        head: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
      },
    },

    // 8. mud_tile_16
    {
      id: 'mud_tile_16',
      description: 'Tileable muddy floor with puddle highlights.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBWWBBB',
        'BBBBBBBBBBBWWBB.',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BWWBBBBBBBBBBBBB',
        'BWWBBBBBBBBBBBB.',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBB.',
        'BBBBBBBWWBBBBBBB',
        'BBBBBBWWWBBBBBBB',
        'BBBBBBBWBBBBBBB.',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBWBBBBBBBBBBBB',
        'BBBWWBBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'mud', role: 'body' },
        W: { name: 'puddle', role: 'head' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
        head: { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
      },
    },

    // 9. crystal_floor_tile_16
    {
      id: 'crystal_floor_tile_16',
      description: 'Tileable crystal-embedded cave floor.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBCBBBBBBBBBBBB',
        'BBBCCBBBBBBBBBBB',
        'BBBCBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBCBBBBB',
        'BBBBBBBBBCCBBBBB',
        'BBBBBBBBBBCBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBCBB',
        'BBBBBBBBBBBBCCBB',
        'BBBBBBBBBBBBBCBB',
        'BCBBBBBBBBBBBBBB',
        'BCCBBBBBBBBBBBBB',
        'BCBBBBBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'stone', role: 'body' },
        C: { name: 'crystal', role: 'eye' },
      },
      colors: {
        body: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        eye:  { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // 10. gravel_tile_16
    {
      id: 'gravel_tile_16',
      description: 'Tileable gravel ground with mixed stone sizes.',
      grid: [
        'BHBHBBHBBHBHBBHB',
        'BBBBHBBHBBBBHBBB',
        'BHBBBBBBHBBBBBBH',
        'BBBHBHBBBBHBHBBB',
        'HBBBBBHBBBBBBHBB',
        'BBHBHBBHBBHBBBHB',
        'BBBBBBBBBHBBBBBB',
        'HBBHBBHBBBBHBBHB',
        'BBBBBHBBBHBBBBBB',
        'BHBBBBBBHBBHBBHB',
        'BBBHBHBBBBBBBBBB',
        'HBBBBBBHBBHBHBBB',
        'BBHBBHBBBBBBBBHB',
        'BBBBBBBHBBHBBBB.',
        'BHBBHBBBHBBBBHBB',
        'BBBHBBBBBBHBBBBB',
      ],
      chars: {
        B: { name: 'gravel', role: 'body' },
        H: { name: 'pebble', role: 'head' },
      },
      colors: {
        body: { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },
        head: { shadow: '#757161', base: '#8595a1', highlight: '#d2aa99' },
      },
    },

    // 11. swamp_tile_16
    {
      id: 'swamp_tile_16',
      description: 'Tileable swamp surface with murky water and lily pads.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBLBBBBBB',
        'BBBBBBBBLLLBBBB.',
        'BBBBBBBBBLLBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BLLBBBBBBBBBBBBB',
        'BLLLBBBBBBBBBBBB',
        'BBLBBBBBBBBBBBB.',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBLLBBB',
        'BBBBBBBBBBLLLLBB',
        'BBBBBBBBBBBLLBB.',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'water', role: 'body' },
        L: { name: 'lily', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#346524' },
        accessory: { shadow: '#346524', base: '#6dc2ca', highlight: '#dad45e' },
      },
    },

    // 12. mushroom_floor_tile_16
    {
      id: 'mushroom_floor_tile_16',
      description: 'Tileable cave floor with glowing mushroom patches.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBMMBBB',
        'BBBBBBBBBBMMMBB.',
        'BBBBBBBBBBBMPBBB',
        'BBBBBBBBBBBBBBBB',
        'BBMMBBBBBBBBBBBB',
        'BMMMMBBBBBBBBBB.',
        'BBMMPBBBBBBBBBB.',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBMMBBBBBBB',
        'BBBBBBMMMMBBBBB.',
        'BBBBBBBMMBBBBBB.',
        'BBBBBBBPBBBBBBB.',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'stone', role: 'body' },
        M: { name: 'mushroom_cap', role: 'accessory' },
        P: { name: 'stem', role: 'head' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // 13. coral_floor_tile_16
    {
      id: 'coral_floor_tile_16',
      description: 'Tileable underwater coral floor with varied growth.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBCCCBBBBBBBBB.',
        'BBCCCCCBBBBBBBB.',
        'BBBCCCBBBBBBBBB.',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBCCBBBB',
        'BBBBBBBBBCCCBBBB',
        'BBBBBBBBBBCCBBBB',
        'BBBBBBBBBBBBBBBB',
        'BCCBBBBBBBBBBBB.',
        'CCCCBBBBBBBBBBB.',
        'BCCBBBBBBBBCCBB.',
        'BBBBBBBBBBCCCCBB',
        'BBBBBBBBBBBCCBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'seafloor', role: 'body' },
        C: { name: 'coral', role: 'eye' },
      },
      colors: {
        body: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:  { shadow: '#442434', base: '#d04648', highlight: '#d2aa99' },
      },
    },

    // 14. root_floor_tile_16
    {
      id: 'root_floor_tile_16',
      description: 'Tileable forest floor with exposed tree roots.',
      grid: [
        'BBBBBBBBRBBBBBB.',
        'BBBBBBBBRBBBBBBB',
        'BBBBBBBRRBBBBBB.',
        'BBBBBBRBBBBBBBBB',
        'BBBBBRBBBBBBBBB.',
        'BBBBRBBBBBBBBBBB',
        'RRRRBBBBBBBBBBB.',
        'BBBBBBBBBBBRRRRR',
        'BBBBBBBBBBRBBBBB',
        'BBBBBBBBBRBBBBB.',
        'BBBBBBBBRBBBBBB.',
        'BBBBBBBRBBBBBBB.',
        'BBBBBBRBBBBBBBBB',
        'BBBBBRBBBBBBBBB.',
        'BBBBRBBBBBBBBBB.',
        'BBBBBBBBBBBBBBB.',
      ],
      chars: {
        B: { name: 'dirt', role: 'body' },
        R: { name: 'root', role: 'head' },
      },
      colors: {
        body: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head: { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
      },
    },

    // 15. snow_tile_16
    {
      id: 'snow_tile_16',
      description: 'Tileable snow ground with subtle wind patterns.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBBBBHBBBBBBBB.',
        'BBBBBBBBBBBBBHBB',
        'BBHBBBBBBBBBBBBB',
        'BBBBBBBBHBBBBBBB',
        'BBBBBBBBBBBBBBB.',
        'BBBBBBBBBBBBHBBB',
        'BBBHBBBBBBBBBBBB',
        'BBBBBBBBBHBBBBBB',
        'BBBBHBBBBBBBBBB.',
        'BBBBBBBBBBBHBBBB',
        'BHBBBBBBBBBBBBB.',
        'BBBBBHBBBBBBBBBB',
        'BBBBBBBBBHBBBBBB',
        'BBHBBBBBBBBBHBB.',
        'BBBBBBBBBBBBBBB.',
      ],
      chars: {
        B: { name: 'snow', role: 'body' },
        H: { name: 'shadow', role: 'head' },
      },
      colors: {
        body: { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
        head: { shadow: '#597dce', base: '#6dc2ca', highlight: '#d2aa99' },
      },
    },

    // 16. acid_pool_tile_16
    {
      id: 'acid_pool_tile_16',
      description: 'Tileable toxic acid pool with bubbling surface.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBHBBBBBBBBBB.',
        'BBBBBBBBBBBBBBB.',
        'BBBBBBBBBBHBBBBB',
        'BBBBBBBBBBBBBBB.',
        'BHBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBB.',
        'BBBBBBBBBBBBBHBB',
        'BBBBBBHBBBBBBBB.',
        'BBBBBBBBBBBBBBB.',
        'BBBBBBBBBBBBBBBB',
        'BBBHBBBBBBBBBBB.',
        'BBBBBBBBBHBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'acid', role: 'body' },
        H: { name: 'bubble', role: 'head' },
      },
      colors: {
        body: { shadow: '#346524', base: '#346524', highlight: '#6dc2ca' },
        head: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // 17. magma_crust_tile_16
    {
      id: 'magma_crust_tile_16',
      description: 'Tileable cooled magma crust with glowing cracks.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBBBGBBBBBBBBBB',
        'BBBBGGBBBBBBBBBB',
        'BBBGBBBBBBBGBBBB',
        'BBBBBBBBBBGGBBBB',
        'BBBBBBBBBGBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BGBBBBBBBBBBBBBB',
        'BBGBBBBBBBBBBBBB',
        'BBBGBBBBBBBBBBB.',
        'BBBBBBBBBBGBBBBB',
        'BBBBBBBBBGGBBBBB',
        'BBBBBBBBGBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBGBBBBBBBBBB',
        'BBBBGGBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'crust', role: 'body' },
        G: { name: 'glow', role: 'eye' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:  { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // 18. wet_stone_tile_16
    {
      id: 'wet_stone_tile_16',
      description: 'Tileable wet stone floor with moisture sheen.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBWBBBBBBBB',
        'BBBBBBWWBBBBBBB.',
        'BBBBBBBBBBBBBBB.',
        'BWBBBBBBBBBBBBB.',
        'BWWBBBBBBBBBBBB.',
        'BBBBBBBBBBBBBBB.',
        'BBBBBBBBBBBWBBBB',
        'BBBBBBBBBBWWBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBWBBBBBBBBB',
        'BBBBBWWBBBBBBBB.',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBWBB',
        'BBBBBBBBBBBBWWBB',
        'BBBBBBBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'stone', role: 'body' },
        W: { name: 'wet', role: 'head' },
      },
      colors: {
        body: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        head: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#6dc2ca' },
      },
    },

    // 19. moss_carpet_tile_16
    {
      id: 'moss_carpet_tile_16',
      description: 'Tileable thick moss carpet covering dungeon floor.',
      grid: [
        'BBHBBBBHBBBBHBBB',
        'BBBBBHBBBBHBBBBB',
        'BHBBBBBBHBBBBHBB',
        'BBBHBBBBBBHBBBBB',
        'HBBBBBHBBBBBBHBB',
        'BBBHBBBBHBBHBBBB',
        'BHBBBBBBBBBBBBHB',
        'BBBBBHBBHBBBBBBB',
        'HBBBBBBBBBBHBBBB',
        'BBBHBBBHBBBBBBHB',
        'BHBBBBBBBBHBBBBB',
        'BBBBBHBBBBBBHBB.',
        'HBBBBBBBHBBBBBBB',
        'BBBHBBBBBBHBBBHB',
        'BBBBBBHBBBBBBBBB',
        'BHBBBBBBBHBBHBBB',
      ],
      chars: {
        B: { name: 'moss', role: 'body' },
        H: { name: 'highlight', role: 'head' },
      },
      colors: {
        body: { shadow: '#346524', base: '#346524', highlight: '#346524' },
        head: { shadow: '#346524', base: '#6dc2ca', highlight: '#dad45e' },
      },
    },

    // 20. tar_pit_tile_16
    {
      id: 'tar_pit_tile_16',
      description: 'Tileable dark tar pit surface with thick bubbles.',
      grid: [
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBHBBB',
        'BBBHBBBBBBBBHBB.',
        'BBBHBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBB.',
        'BBBBBBBHBBBBBBB.',
        'BBBBBBBHBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBBBBBBBBBBB.',
        'BBHBBBBBBBBBHBBB',
        'BBHBBBBBBBBBHBBB',
        'BBBBBBBBBBBBBBBB',
        'BBBBBHBBBBBBBBBB',
        'BBBBBHBBBBBBBBBB',
        'BBBBBBBBBBBBBBBB',
      ],
      chars: {
        B: { name: 'tar', role: 'body' },
        H: { name: 'bubble', role: 'head' },
      },
      colors: {
        body: { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        head: { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
      },
    },

  ],
};

export default batch;
