/**
 * Armor Arms batch — 20 shoulder/gauntlet/bracer templates.
 * 16x16 pixel art, DB16 palette.
 */
import type { BatchDefinition, CompactTemplate } from '../templateGenerator.js';

type Grid = string[][];

function createGrid(): Grid {
  return Array.from({ length: 16 }, () => Array(16).fill('.'));
}

function paintRect(grid: Grid, ch: string, x1: number, y1: number, x2: number, y2: number): void {
  for (let y = y1; y <= y2; y++) {
    for (let x = x1; x <= x2; x++) {
      if (x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
    }
  }
}

function paintH(grid: Grid, ch: string, y: number, x1: number, x2: number): void {
  for (let x = x1; x <= x2; x++) {
    if (x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
  }
}

function paintV(grid: Grid, ch: string, x: number, y1: number, y2: number): void {
  for (let y = y1; y <= y2; y++) {
    if (x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
  }
}

function paintPoints(grid: Grid, ch: string, points: Array<[number, number]>): void {
  for (const [x, y] of points) {
    if (x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
  }
}

function toRows(grid: Grid): string[] {
  return grid.map((row) => row.join(''));
}

function makeTemplate(
  id: string,
  description: string,
  chars: CompactTemplate['chars'],
  colors: CompactTemplate['colors'],
  draw: (grid: Grid) => void,
): CompactTemplate {
  const grid = createGrid();
  draw(grid);
  return { id, description, grid: toRows(grid), chars, colors };
}

// ─── Color palettes ─────────────────────────────────────────────
const C = {
  iron:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  darkIron:  { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  bronze:    { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  gold:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  leather:   { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  crystal:   { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
  ice:       { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  bone:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  dragonRed: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  shadow:    { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  fire:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  holy:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  chain:     { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  wood:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  red:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  purple:    { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
  mithril:   { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  green:     { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  darkMetal: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  brass:     { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
};

const templates: CompactTemplate[] = [
  // ── 1. IRON PAULDRON ─────────────────────────────────────────
  makeTemplate(
    'iron_pauldron_16',
    'Iron shoulder pauldron, rounded dome with dark rim and rivet accents.',
    {
      B: { name: 'iron_plate', role: 'body' },
      R: { name: 'dark_rim', role: 'arm' },
      A: { name: 'rivets', role: 'accessory' },
      P: { name: 'padding', role: 'belt' },
      H: { name: 'shoulder_cap', role: 'head' },
    },
    {
      body: C.iron,
      arm: C.darkIron,
      accessory: C.brass,
      belt: C.leather,
      head: C.iron,
    },
    (g) => {
      // Shoulder cap — dome top
      paintH(g, 'H', 2, 5, 10);
      paintH(g, 'H', 3, 4, 11);
      // Main iron plate — body of pauldron
      paintRect(g, 'B', 3, 4, 12, 8);
      paintRect(g, 'B', 4, 9, 11, 10);
      // Dark rim — bottom edge
      paintH(g, 'R', 11, 5, 10);
      paintH(g, 'R', 10, 4, 4);
      paintH(g, 'R', 10, 11, 11);
      // Rivets along top
      paintPoints(g, 'A', [[5, 4], [8, 4], [11, 4]]);
      paintPoints(g, 'A', [[4, 7], [12, 7]]);
      // Leather padding underneath
      paintH(g, 'P', 12, 6, 9);
      paintH(g, 'P', 13, 7, 8);
    },
  ),

  // ── 2. BRONZE SHOULDER ───────────────────────────────────────
  makeTemplate(
    'bronze_shoulder_16',
    'Bronze shoulder guard with edge spike, bone spike, and leather strap.',
    {
      B: { name: 'bronze_plate', role: 'body' },
      H: { name: 'spike', role: 'head' },
      A: { name: 'edge_trim', role: 'accessory' },
      R: { name: 'strap', role: 'arm' },
      P: { name: 'lining', role: 'belt' },
    },
    {
      body: C.bronze,
      head: C.bone,
      accessory: C.gold,
      arm: C.leather,
      belt: C.leather,
    },
    (g) => {
      // Spike on top
      paintPoints(g, 'H', [[7, 1], [8, 1]]);
      paintPoints(g, 'H', [[7, 2], [8, 2]]);
      paintPoints(g, 'H', [[6, 3], [7, 3], [8, 3], [9, 3]]);
      // Bronze plate
      paintRect(g, 'B', 4, 4, 11, 8);
      paintH(g, 'B', 9, 5, 10);
      // Gold edge trim
      paintH(g, 'A', 4, 4, 11);
      paintPoints(g, 'A', [[4, 5], [11, 5], [4, 8], [11, 8]]);
      // Leather strap hanging down
      paintV(g, 'R', 6, 10, 13);
      paintV(g, 'R', 9, 10, 13);
      // Padding/lining
      paintH(g, 'P', 10, 5, 10);
      paintH(g, 'P', 11, 6, 9);
      // Reinforced inner pad
      paintPoints(g, 'P', [[7, 12], [8, 12], [7, 13], [8, 13]]);
    },
  ),

  // ── 3. GOLD EPAULETTE ────────────────────────────────────────
  makeTemplate(
    'gold_epaulette_16',
    'Gold ornate shoulder piece with fringe tassels and red inlay.',
    {
      B: { name: 'gold_plate', role: 'body' },
      H: { name: 'crest', role: 'head' },
      A: { name: 'fringe', role: 'accessory' },
      R: { name: 'red_inlay', role: 'arm' },
      P: { name: 'padding', role: 'belt' },
    },
    {
      body: C.gold,
      head: C.gold,
      accessory: C.brass,
      arm: C.red,
      belt: C.leather,
    },
    (g) => {
      // Crest on top
      paintH(g, 'H', 2, 6, 9);
      paintH(g, 'H', 3, 5, 10);
      // Gold plate body
      paintRect(g, 'B', 4, 4, 11, 7);
      paintH(g, 'B', 8, 5, 10);
      // Red inlay — center decorative strip
      paintPoints(g, 'R', [[7, 5], [8, 5], [7, 6], [8, 6]]);
      paintPoints(g, 'R', [[7, 7], [8, 7]]);
      // Fringe tassels hanging from bottom
      paintPoints(g, 'A', [[4, 9], [5, 9], [6, 9], [8, 9], [9, 9], [10, 9]]);
      paintPoints(g, 'A', [[4, 10], [6, 10], [8, 10], [10, 10]]);
      paintPoints(g, 'A', [[4, 11], [6, 11], [8, 11], [10, 11]]);
      paintPoints(g, 'A', [[5, 12], [7, 12], [9, 12], [11, 12]]);
      // Padding below
      paintH(g, 'P', 13, 6, 9);
      paintH(g, 'P', 14, 7, 8);
    },
  ),

  // ── 4. LEATHER BRACER ────────────────────────────────────────
  makeTemplate(
    'leather_bracer_16',
    'Leather forearm bracer with brass buckle and dark stitching.',
    {
      B: { name: 'leather_body', role: 'body' },
      H: { name: 'buckle', role: 'head' },
      A: { name: 'stitching', role: 'accessory' },
      R: { name: 'strap', role: 'arm' },
      P: { name: 'lining', role: 'belt' },
    },
    {
      body: C.leather,
      head: C.brass,
      accessory: C.darkIron,
      arm: C.wood,
      belt: C.bone,
    },
    (g) => {
      // Top opening rim
      paintH(g, 'R', 2, 5, 10);
      // Main leather body — cylindrical bracer
      paintRect(g, 'B', 4, 3, 11, 12);
      // Buckle
      paintRect(g, 'H', 5, 5, 6, 7);
      // Stitching lines along bracer
      paintPoints(g, 'A', [[8, 3], [8, 5], [8, 7], [8, 9], [8, 11]]);
      paintPoints(g, 'A', [[4, 6], [11, 6], [4, 9], [11, 9]]);
      // Strap wrapping
      paintH(g, 'R', 4, 4, 11);
      paintH(g, 'R', 8, 4, 11);
      // Inner lining at top and bottom
      paintH(g, 'P', 3, 5, 10);
      paintH(g, 'P', 13, 5, 10);
    },
  ),

  // ── 5. IRON GAUNTLET ─────────────────────────────────────────
  makeTemplate(
    'iron_gauntlet_16',
    'Iron plate gauntlet with articulated fingers, dark joints, and leather palm.',
    {
      B: { name: 'iron_plate', role: 'body' },
      H: { name: 'finger_plates', role: 'head' },
      A: { name: 'knuckle_guard', role: 'accessory' },
      R: { name: 'joints', role: 'arm' },
      P: { name: 'palm_leather', role: 'belt' },
    },
    {
      body: C.iron,
      head: C.iron,
      accessory: C.darkIron,
      arm: C.darkMetal,
      belt: C.leather,
    },
    (g) => {
      // Wrist cuff — top
      paintRect(g, 'B', 5, 2, 10, 3);
      // Joint line at wrist
      paintH(g, 'R', 4, 5, 10);
      // Main gauntlet hand body
      paintRect(g, 'B', 4, 5, 11, 8);
      // Knuckle guard ridge
      paintH(g, 'A', 9, 4, 11);
      // Joint lines between segments
      paintH(g, 'R', 7, 4, 11);
      // Finger plates — three articulated
      paintRect(g, 'H', 4, 10, 6, 13);
      paintRect(g, 'H', 7, 10, 9, 14);
      paintRect(g, 'H', 10, 10, 12, 13);
      // Finger joint lines
      paintPoints(g, 'R', [[4, 12], [7, 12], [10, 12]]);
      // Palm leather visible on side
      paintPoints(g, 'P', [[5, 6], [5, 7], [5, 8]]);
      paintPoints(g, 'P', [[4, 9], [5, 9]]);
    },
  ),

  // ── 6. PLATE GAUNTLET ────────────────────────────────────────
  makeTemplate(
    'plate_gauntlet_16',
    'Heavy plate mail gauntlet with gold knuckle plate, bright steel, and dark padding.',
    {
      B: { name: 'steel_plate', role: 'body' },
      H: { name: 'knuckle_plate', role: 'head' },
      A: { name: 'gold_trim', role: 'accessory' },
      R: { name: 'segmented_joints', role: 'arm' },
      P: { name: 'padding', role: 'belt' },
    },
    {
      body: C.iron,
      head: C.gold,
      accessory: C.brass,
      arm: C.darkIron,
      belt: C.leather,
    },
    (g) => {
      // Flared cuff top
      paintRect(g, 'B', 4, 2, 11, 3);
      paintPoints(g, 'A', [[4, 2], [11, 2]]);
      // Gold trim on cuff edge
      paintH(g, 'A', 1, 5, 10);
      // Joint line
      paintH(g, 'R', 4, 5, 10);
      // Main hand plate
      paintRect(g, 'B', 5, 5, 10, 8);
      // Gold knuckle plate
      paintRect(g, 'H', 5, 9, 10, 10);
      // Segmented finger plates
      paintRect(g, 'B', 5, 11, 6, 14);
      paintRect(g, 'B', 7, 11, 9, 14);
      paintRect(g, 'B', 10, 11, 11, 13);
      // Finger joint lines
      paintH(g, 'R', 12, 5, 11);
      paintH(g, 'R', 7, 5, 10);
      // Padding visible inside
      paintPoints(g, 'P', [[6, 6], [6, 7]]);
      paintPoints(g, 'P', [[9, 6], [9, 7]]);
    },
  ),

  // ── 7. CRYSTAL BRACER ────────────────────────────────────────
  makeTemplate(
    'crystal_bracer_16',
    'Crystal arm bracer with blue crystal inlay, white glow, and silver mount.',
    {
      B: { name: 'silver_frame', role: 'body' },
      H: { name: 'crystal_inlay', role: 'head' },
      A: { name: 'glow_aura', role: 'accessory' },
      R: { name: 'mount_bands', role: 'arm' },
      P: { name: 'padding', role: 'belt' },
    },
    {
      body: C.iron,
      head: C.crystal,
      accessory: C.ice,
      arm: C.darkIron,
      belt: C.leather,
    },
    (g) => {
      // Top band
      paintH(g, 'R', 2, 5, 10);
      // Silver frame body
      paintRect(g, 'B', 4, 3, 11, 12);
      // Crystal inlay — large center gem
      paintRect(g, 'H', 6, 5, 9, 10);
      // Glow aura around crystal
      paintPoints(g, 'A', [[5, 5], [10, 5], [5, 10], [10, 10]]);
      paintPoints(g, 'A', [[5, 7], [10, 7], [5, 8], [10, 8]]);
      // Mount bands top and bottom
      paintH(g, 'R', 4, 4, 11);
      paintH(g, 'R', 11, 4, 11);
      // Padding lining
      paintH(g, 'P', 3, 5, 10);
      paintH(g, 'P', 12, 5, 10);
      paintH(g, 'P', 13, 6, 9);
    },
  ),

  // ── 8. DARK GAUNTLET ─────────────────────────────────────────
  makeTemplate(
    'dark_gauntlet_16',
    'Dark knight gauntlet with spikes, shadow plate, and purple glow.',
    {
      B: { name: 'shadow_plate', role: 'body' },
      H: { name: 'spikes', role: 'head' },
      A: { name: 'purple_glow', role: 'accessory' },
      R: { name: 'dark_joints', role: 'arm' },
      P: { name: 'cursed_lining', role: 'belt' },
    },
    {
      body: C.shadow,
      head: C.darkIron,
      accessory: C.purple,
      arm: C.darkMetal,
      belt: C.purple,
    },
    (g) => {
      // Spikes on top of cuff
      paintPoints(g, 'H', [[5, 1], [8, 1], [11, 1]]);
      paintPoints(g, 'H', [[5, 2], [8, 2], [11, 2]]);
      // Wrist cuff
      paintRect(g, 'B', 4, 3, 12, 4);
      // Purple glow lines
      paintPoints(g, 'A', [[6, 3], [9, 3], [12, 3]]);
      // Joint
      paintH(g, 'R', 5, 4, 12);
      // Main hand plate
      paintRect(g, 'B', 4, 6, 11, 8);
      // Knuckle spike ridge
      paintH(g, 'H', 9, 4, 11);
      paintPoints(g, 'H', [[5, 9], [8, 9], [11, 9]]);
      // Finger plates
      paintRect(g, 'B', 4, 10, 6, 13);
      paintRect(g, 'B', 7, 10, 9, 14);
      paintRect(g, 'B', 10, 10, 12, 13);
      // Joint lines
      paintPoints(g, 'R', [[4, 12], [7, 12], [10, 12]]);
      // Cursed glow on fingers
      paintPoints(g, 'P', [[5, 13], [8, 14], [11, 13]]);
    },
  ),

  // ── 9. BONE ARM GUARD ────────────────────────────────────────
  makeTemplate(
    'bone_arm_guard_16',
    'Bone forearm guard with skeletal plate design, dark gaps, and leather wrap.',
    {
      B: { name: 'bone_plate', role: 'body' },
      H: { name: 'bone_ridge', role: 'head' },
      A: { name: 'gaps', role: 'accessory' },
      R: { name: 'leather_wrap', role: 'arm' },
      P: { name: 'inner_lining', role: 'belt' },
    },
    {
      body: C.bone,
      head: C.bone,
      accessory: C.shadow,
      arm: C.leather,
      belt: C.darkIron,
    },
    (g) => {
      // Top rim
      paintH(g, 'R', 2, 5, 10);
      // Bone plate body
      paintRect(g, 'B', 4, 3, 11, 12);
      // Bone ridges — horizontal ribs
      paintH(g, 'H', 4, 4, 11);
      paintH(g, 'H', 7, 4, 11);
      paintH(g, 'H', 10, 4, 11);
      // Dark gaps between ribs
      paintPoints(g, 'A', [[5, 5], [8, 5], [10, 5]]);
      paintPoints(g, 'A', [[6, 8], [9, 8]]);
      paintPoints(g, 'A', [[5, 11], [8, 11], [10, 11]]);
      // Leather wrap bands
      paintH(g, 'R', 3, 5, 10);
      paintH(g, 'R', 6, 4, 11);
      paintH(g, 'R', 9, 4, 11);
      paintH(g, 'R', 12, 4, 11);
      // Inner lining
      paintH(g, 'P', 13, 5, 10);
    },
  ),

  // ── 10. DRAGON CLAW GAUNTLET ─────────────────────────────────
  makeTemplate(
    'dragon_claw_gauntlet_16',
    'Dragon claw gauntlet with red scales, dark claws, and gold trim.',
    {
      B: { name: 'red_scales', role: 'body' },
      H: { name: 'claws', role: 'head' },
      A: { name: 'gold_trim', role: 'accessory' },
      R: { name: 'scale_joints', role: 'arm' },
      P: { name: 'padding', role: 'belt' },
    },
    {
      body: C.dragonRed,
      head: C.darkIron,
      accessory: C.gold,
      arm: C.red,
      belt: C.leather,
    },
    (g) => {
      // Wrist cuff with gold trim
      paintRect(g, 'B', 5, 2, 10, 3);
      paintH(g, 'A', 2, 5, 10);
      // Scale joint
      paintH(g, 'R', 4, 5, 10);
      // Main hand scales
      paintRect(g, 'B', 4, 5, 11, 8);
      // Gold knuckle trim
      paintH(g, 'A', 9, 4, 11);
      // Claw fingers — curved talons
      paintRect(g, 'B', 4, 10, 6, 12);
      paintRect(g, 'B', 7, 10, 9, 13);
      paintRect(g, 'B', 10, 10, 12, 12);
      // Dark claws at tips
      paintPoints(g, 'H', [[4, 13], [5, 13]]);
      paintPoints(g, 'H', [[7, 14], [8, 14]]);
      paintPoints(g, 'H', [[10, 13], [11, 13]]);
      // Scale joint lines
      paintPoints(g, 'R', [[4, 12], [7, 12], [10, 12]]);
      // Padding
      paintPoints(g, 'P', [[5, 6], [5, 7], [6, 8]]);
    },
  ),

  // ── 11. MITHRIL VAMBRACE ─────────────────────────────────────
  makeTemplate(
    'mithril_vambrace_16',
    'Mithril elvish vambrace with sleek curve, teal rune inlay, and elegant design.',
    {
      B: { name: 'mithril_plate', role: 'body' },
      H: { name: 'rune_inlay', role: 'head' },
      A: { name: 'elven_trim', role: 'accessory' },
      R: { name: 'edge_bands', role: 'arm' },
      P: { name: 'silk_lining', role: 'belt' },
    },
    {
      body: C.mithril,
      head: C.ice,
      accessory: C.gold,
      arm: C.darkIron,
      belt: C.bone,
    },
    (g) => {
      // Top edge band
      paintH(g, 'R', 2, 5, 10);
      // Mithril plate body — slightly curved
      paintRect(g, 'B', 4, 3, 11, 12);
      paintPoints(g, 'B', [[3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10]]);
      // Teal rune inlay — elvish pattern
      paintPoints(g, 'H', [[7, 4], [8, 4]]);
      paintPoints(g, 'H', [[6, 5], [9, 5]]);
      paintPoints(g, 'H', [[7, 6], [8, 6]]);
      paintPoints(g, 'H', [[6, 7], [9, 7]]);
      paintPoints(g, 'H', [[7, 8], [8, 8]]);
      paintPoints(g, 'H', [[6, 9], [9, 9]]);
      paintPoints(g, 'H', [[7, 10], [8, 10]]);
      // Elven gold trim on edges
      paintPoints(g, 'A', [[4, 3], [11, 3], [4, 12], [11, 12]]);
      paintPoints(g, 'A', [[3, 7], [12, 7]]);
      // Bottom edge band
      paintH(g, 'R', 12, 4, 11);
      // Silk lining
      paintH(g, 'P', 3, 5, 10);
      paintH(g, 'P', 13, 5, 10);
    },
  ),

  // ── 12. CHAIN GLOVES ─────────────────────────────────────────
  makeTemplate(
    'chain_gloves_16',
    'Chainmail gloves with gray chain links, dark interior, and iron cuff.',
    {
      B: { name: 'chain_links', role: 'body' },
      H: { name: 'iron_cuff', role: 'head' },
      A: { name: 'link_highlights', role: 'accessory' },
      R: { name: 'dark_gaps', role: 'arm' },
      P: { name: 'inner_cloth', role: 'belt' },
    },
    {
      body: C.chain,
      head: C.iron,
      accessory: C.iron,
      arm: C.darkIron,
      belt: C.leather,
    },
    (g) => {
      // Iron wrist cuff
      paintRect(g, 'H', 5, 2, 10, 3);
      // Chain body — hand
      paintRect(g, 'B', 4, 4, 11, 8);
      // Chain texture — checkerboard highlights
      paintPoints(g, 'A', [[5, 4], [7, 4], [9, 4], [11, 4]]);
      paintPoints(g, 'A', [[4, 6], [6, 6], [8, 6], [10, 6]]);
      paintPoints(g, 'A', [[5, 8], [7, 8], [9, 8], [11, 8]]);
      // Dark gaps in chain
      paintPoints(g, 'R', [[6, 5], [8, 5], [10, 5]]);
      paintPoints(g, 'R', [[5, 7], [7, 7], [9, 7]]);
      // Chain fingers
      paintRect(g, 'B', 4, 9, 6, 12);
      paintRect(g, 'B', 7, 9, 9, 13);
      paintRect(g, 'B', 10, 9, 12, 12);
      // Finger highlights
      paintPoints(g, 'A', [[5, 10], [8, 10], [11, 10]]);
      paintPoints(g, 'A', [[5, 12], [8, 12], [11, 12]]);
      // Inner cloth visible
      paintPoints(g, 'P', [[5, 5], [5, 6], [5, 7]]);
    },
  ),

  // ── 13. WOODEN ARM GUARD ─────────────────────────────────────
  makeTemplate(
    'wooden_arm_guard_16',
    'Wooden arm guard with bark texture, green vine wrapping, and leather ties.',
    {
      B: { name: 'wood_planks', role: 'body' },
      H: { name: 'bark_texture', role: 'head' },
      A: { name: 'vine_wrapping', role: 'accessory' },
      R: { name: 'leather_ties', role: 'arm' },
      P: { name: 'cloth_lining', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.leather,
      accessory: C.green,
      arm: C.leather,
      belt: C.bone,
    },
    (g) => {
      // Top rim leather tie
      paintH(g, 'R', 2, 5, 10);
      // Wood plank body
      paintRect(g, 'B', 4, 3, 11, 12);
      // Bark texture — dark knots/grain
      paintPoints(g, 'H', [[5, 4], [10, 4]]);
      paintPoints(g, 'H', [[7, 6], [9, 6]]);
      paintPoints(g, 'H', [[5, 8], [10, 8]]);
      paintPoints(g, 'H', [[6, 10], [8, 10]]);
      // Green vine wrapping diagonally
      paintPoints(g, 'A', [[4, 4], [5, 5], [6, 5], [7, 5]]);
      paintPoints(g, 'A', [[8, 7], [9, 7], [10, 7], [11, 7]]);
      paintPoints(g, 'A', [[4, 9], [5, 9], [6, 9], [7, 9]]);
      paintPoints(g, 'A', [[8, 11], [9, 11], [10, 11], [11, 11]]);
      // Leather tie bands
      paintH(g, 'R', 6, 4, 11);
      paintH(g, 'R', 10, 4, 11);
      // Cloth lining
      paintH(g, 'P', 3, 5, 10);
      paintH(g, 'P', 13, 5, 10);
    },
  ),

  // ── 14. SPIKED PAULDRON ──────────────────────────────────────
  makeTemplate(
    'spiked_pauldron_16',
    'Spiked shoulder pauldron with metal spikes, dark iron body, and blood red accent.',
    {
      B: { name: 'dark_iron_plate', role: 'body' },
      H: { name: 'spikes', role: 'head' },
      A: { name: 'spike_tips', role: 'accessory' },
      R: { name: 'blood_accent', role: 'arm' },
      P: { name: 'padding', role: 'belt' },
    },
    {
      body: C.darkIron,
      head: C.darkMetal,
      accessory: C.iron,
      arm: C.red,
      belt: C.leather,
    },
    (g) => {
      // Spike tips — bright points
      paintPoints(g, 'A', [[3, 1], [7, 1], [12, 1]]);
      // Spikes — triangular
      paintPoints(g, 'H', [[3, 2], [4, 2], [7, 2], [11, 2], [12, 2]]);
      paintPoints(g, 'H', [[4, 3], [7, 3], [8, 3], [11, 3]]);
      // Main dark iron plate — dome
      paintRect(g, 'B', 3, 4, 12, 8);
      paintH(g, 'B', 3, 5, 10);
      paintH(g, 'B', 9, 4, 11);
      // Blood red accent stripe
      paintH(g, 'R', 6, 3, 12);
      paintPoints(g, 'R', [[4, 7], [12, 7]]);
      // Lower padding
      paintH(g, 'P', 10, 5, 10);
      paintH(g, 'P', 11, 6, 9);
      paintH(g, 'P', 12, 7, 8);
    },
  ),

  // ── 15. ROYAL GAUNTLET ───────────────────────────────────────
  makeTemplate(
    'royal_gauntlet_16',
    'Royal jeweled gauntlet with gold plate, red jewel, and bright highlights.',
    {
      B: { name: 'gold_plate', role: 'body' },
      H: { name: 'red_jewel', role: 'head' },
      A: { name: 'filigree', role: 'accessory' },
      R: { name: 'articulated_joints', role: 'arm' },
      P: { name: 'velvet_lining', role: 'belt' },
    },
    {
      body: C.gold,
      head: C.red,
      accessory: C.brass,
      arm: C.darkIron,
      belt: C.purple,
    },
    (g) => {
      // Flared wrist cuff
      paintRect(g, 'B', 4, 2, 11, 3);
      // Filigree on cuff
      paintPoints(g, 'A', [[5, 2], [7, 2], [9, 2], [11, 2]]);
      // Joint
      paintH(g, 'R', 4, 5, 10);
      // Main gold hand plate
      paintRect(g, 'B', 5, 5, 10, 8);
      // Red jewel on back of hand
      paintRect(g, 'H', 6, 6, 9, 7);
      // Knuckle joint
      paintH(g, 'R', 9, 5, 10);
      // Gold finger plates
      paintRect(g, 'B', 5, 10, 6, 13);
      paintRect(g, 'B', 7, 10, 9, 14);
      paintRect(g, 'B', 10, 10, 11, 13);
      // Finger joints
      paintPoints(g, 'R', [[5, 12], [7, 12], [10, 12]]);
      // Velvet lining
      paintPoints(g, 'P', [[6, 6], [6, 7], [9, 6], [9, 7]]);
    },
  ),

  // ── 16. FIRE GAUNTLET ────────────────────────────────────────
  makeTemplate(
    'fire_gauntlet_16',
    'Fire-enchanted gauntlet with dark iron base, fire runes, and ember glow.',
    {
      B: { name: 'dark_iron_plate', role: 'body' },
      H: { name: 'fire_runes', role: 'head' },
      A: { name: 'ember_glow', role: 'accessory' },
      R: { name: 'charred_joints', role: 'arm' },
      P: { name: 'heat_lining', role: 'belt' },
    },
    {
      body: C.darkIron,
      head: C.fire,
      accessory: C.gold,
      arm: C.shadow,
      belt: C.red,
    },
    (g) => {
      // Wrist cuff
      paintRect(g, 'B', 5, 2, 10, 3);
      // Fire rune on cuff
      paintPoints(g, 'H', [[6, 2], [7, 2], [8, 2], [9, 2]]);
      // Charred joint
      paintH(g, 'R', 4, 5, 10);
      // Main hand
      paintRect(g, 'B', 4, 5, 11, 8);
      // Ember glow — bright spots
      paintPoints(g, 'A', [[5, 5], [10, 5], [5, 7], [10, 7]]);
      // Fire rune on hand
      paintPoints(g, 'H', [[6, 6], [9, 6], [7, 7], [8, 7]]);
      // Knuckle joint
      paintH(g, 'R', 9, 4, 11);
      // Finger plates
      paintRect(g, 'B', 4, 10, 6, 13);
      paintRect(g, 'B', 7, 10, 9, 14);
      paintRect(g, 'B', 10, 10, 12, 13);
      // Heat glow at fingertips
      paintPoints(g, 'P', [[5, 13], [8, 14], [11, 13]]);
    },
  ),

  // ── 17. ICE BRACER ───────────────────────────────────────────
  makeTemplate(
    'ice_bracer_16',
    'Ice crystal bracer with frozen structure, white frost, and icy blue glow.',
    {
      B: { name: 'ice_plate', role: 'body' },
      H: { name: 'frost_crystals', role: 'head' },
      A: { name: 'white_frost', role: 'accessory' },
      R: { name: 'frozen_bands', role: 'arm' },
      P: { name: 'cold_lining', role: 'belt' },
    },
    {
      body: C.ice,
      head: C.crystal,
      accessory: C.bone,
      arm: C.mithril,
      belt: C.iron,
    },
    (g) => {
      // Frost crystal spikes on top
      paintPoints(g, 'H', [[6, 1], [9, 1]]);
      paintPoints(g, 'H', [[5, 2], [7, 2], [8, 2], [10, 2]]);
      // Top frozen band
      paintH(g, 'R', 3, 4, 11);
      // Ice plate body
      paintRect(g, 'B', 4, 4, 11, 12);
      // White frost patches
      paintPoints(g, 'A', [[5, 5], [10, 5]]);
      paintPoints(g, 'A', [[7, 7], [8, 7]]);
      paintPoints(g, 'A', [[5, 9], [10, 9]]);
      paintPoints(g, 'A', [[7, 11], [8, 11]]);
      // Crystal formations growing outward
      paintPoints(g, 'H', [[3, 6], [12, 6]]);
      paintPoints(g, 'H', [[3, 9], [12, 9]]);
      // Frozen bands
      paintH(g, 'R', 7, 4, 11);
      paintH(g, 'R', 10, 4, 11);
      // Cold lining
      paintH(g, 'P', 13, 5, 10);
      paintH(g, 'P', 12, 4, 4);
      paintH(g, 'P', 12, 11, 11);
    },
  ),

  // ── 18. SHADOW GLOVES ────────────────────────────────────────
  makeTemplate(
    'shadow_gloves_16',
    'Shadow assassin gloves with dark leather, purple trim, and sleek design.',
    {
      B: { name: 'dark_leather', role: 'body' },
      H: { name: 'finger_tips', role: 'head' },
      A: { name: 'purple_trim', role: 'accessory' },
      R: { name: 'shadow_detail', role: 'arm' },
      P: { name: 'inner_silk', role: 'belt' },
    },
    {
      body: C.shadow,
      head: C.darkIron,
      accessory: C.purple,
      arm: C.darkMetal,
      belt: C.leather,
    },
    (g) => {
      // Wrist cuff — sleek
      paintRect(g, 'B', 5, 1, 10, 3);
      // Purple trim on cuff
      paintH(g, 'A', 1, 5, 10);
      // Shadow detail — stitching
      paintPoints(g, 'R', [[7, 2], [8, 2]]);
      // Main hand
      paintRect(g, 'B', 4, 4, 11, 7);
      // Purple trim on knuckles
      paintH(g, 'A', 8, 4, 11);
      // Shadow detail lines
      paintPoints(g, 'R', [[5, 5], [10, 5]]);
      paintPoints(g, 'R', [[5, 7], [10, 7]]);
      // Sleek fingers
      paintRect(g, 'B', 4, 9, 5, 12);
      paintRect(g, 'B', 6, 9, 7, 13);
      paintRect(g, 'B', 8, 9, 9, 13);
      paintRect(g, 'B', 10, 9, 11, 12);
      // Dark finger tips
      paintPoints(g, 'H', [[4, 13], [5, 13]]);
      paintPoints(g, 'H', [[6, 14], [7, 14]]);
      paintPoints(g, 'H', [[8, 14], [9, 14]]);
      paintPoints(g, 'H', [[10, 13], [11, 13]]);
      // Inner silk
      paintPoints(g, 'P', [[5, 5], [6, 5], [9, 5], [10, 5]]);
    },
  ),

  // ── 19. GLADIATOR ARM WRAP ───────────────────────────────────
  makeTemplate(
    'gladiator_arm_wrap_16',
    'Gladiator leather arm wrapping with brass studs and red cloth band.',
    {
      B: { name: 'leather_wrap', role: 'body' },
      H: { name: 'brass_studs', role: 'head' },
      A: { name: 'red_cloth', role: 'accessory' },
      R: { name: 'binding_cord', role: 'arm' },
      P: { name: 'inner_pad', role: 'belt' },
    },
    {
      body: C.leather,
      head: C.brass,
      accessory: C.red,
      arm: C.wood,
      belt: C.bone,
    },
    (g) => {
      // Top opening
      paintH(g, 'R', 2, 5, 10);
      // Leather wrap body
      paintRect(g, 'B', 4, 3, 11, 13);
      // Red cloth band wrapping diagonally
      paintPoints(g, 'A', [[4, 4], [5, 4], [6, 4]]);
      paintPoints(g, 'A', [[6, 5], [7, 5], [8, 5]]);
      paintPoints(g, 'A', [[8, 6], [9, 6], [10, 6]]);
      paintPoints(g, 'A', [[4, 8], [5, 8], [6, 8]]);
      paintPoints(g, 'A', [[6, 9], [7, 9], [8, 9]]);
      paintPoints(g, 'A', [[8, 10], [9, 10], [10, 10]]);
      // Brass studs
      paintPoints(g, 'H', [[5, 3], [10, 3]]);
      paintPoints(g, 'H', [[5, 7], [10, 7]]);
      paintPoints(g, 'H', [[5, 11], [10, 11]]);
      paintPoints(g, 'H', [[7, 13], [8, 13]]);
      // Binding cord across
      paintH(g, 'R', 6, 4, 11);
      paintH(g, 'R', 12, 4, 11);
      // Inner pad
      paintH(g, 'P', 3, 5, 10);
      paintH(g, 'P', 14, 5, 10);
    },
  ),

  // ── 20. HOLY VAMBRACE ────────────────────────────────────────
  makeTemplate(
    'holy_vambrace_16',
    'Holy knight vambrace with bright steel, gold cross emblem, and holy glow.',
    {
      B: { name: 'bright_steel', role: 'body' },
      H: { name: 'gold_cross', role: 'head' },
      A: { name: 'holy_glow', role: 'accessory' },
      R: { name: 'edge_bands', role: 'arm' },
      P: { name: 'blessed_lining', role: 'belt' },
    },
    {
      body: C.iron,
      head: C.gold,
      accessory: C.holy,
      arm: C.darkIron,
      belt: C.bone,
    },
    (g) => {
      // Top edge band
      paintH(g, 'R', 2, 5, 10);
      // Steel plate body
      paintRect(g, 'B', 4, 3, 11, 12);
      // Gold cross emblem — center
      paintV(g, 'H', 7, 5, 10);
      paintV(g, 'H', 8, 5, 10);
      paintH(g, 'H', 7, 5, 10);
      paintH(g, 'H', 8, 5, 10);
      // Holy glow emanating from cross
      paintPoints(g, 'A', [[5, 6], [10, 6], [5, 9], [10, 9]]);
      paintPoints(g, 'A', [[6, 5], [9, 5], [6, 10], [9, 10]]);
      paintPoints(g, 'A', [[4, 7], [4, 8], [11, 7], [11, 8]]);
      // Edge bands
      paintH(g, 'R', 4, 4, 11);
      paintH(g, 'R', 11, 4, 11);
      // Blessed lining
      paintH(g, 'P', 3, 5, 10);
      paintH(g, 'P', 13, 5, 10);
      paintH(g, 'P', 12, 4, 4);
      paintH(g, 'P', 12, 11, 11);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'equipment',
  exportNames: {
    templates: 'ARMOR_ARMS_TEMPLATES',
    schemes: 'ARMOR_ARMS_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
