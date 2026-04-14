/**
 * Weapons, Staffs & Bows batch 4 — Polearms, Hammers & Heavy Weapons.
 * 20 original 16x16 templates — diverse heavy melee weapons from historical and fantasy sources.
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
  wood:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  darkWood:  { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  brass:     { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  gold:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  metal:     { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  darkMetal: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  red:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  blue:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  green:     { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  black:     { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  ivory:     { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  leather:   { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  bone:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  silver:    { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  iron:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  steel:     { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  bamboo:    { shadow: '#346524', base: '#6daa2c', highlight: '#d27d2c' },
  jade:      { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
  cherry:    { shadow: '#442434', base: '#d04648', highlight: '#d2aa99' },
  bronze:    { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
};

const templates: CompactTemplate[] = [
  // ── 1. BARDICHE ──────────────────────────────────────────────
  makeTemplate(
    'bardiche_16',
    'Eastern European bardiche with long cleaver blade attached to pole.',
    {
      B: { name: 'cleaver_blade', role: 'body' },
      E: { name: 'blade_edge', role: 'head' },
      S: { name: 'pole_shaft', role: 'arm' },
      R: { name: 'rivets', role: 'accessory' },
      F: { name: 'foot_cap', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.ivory,
      arm: C.wood,
      accessory: C.darkMetal,
      belt: C.iron,
    },
    (g) => {
      // Long cleaver blade — extends from shaft
      paintRect(g, 'B', 8, 1, 12, 7);
      paintPoints(g, 'B', [[12, 1], [13, 2], [13, 3], [13, 4], [13, 5], [12, 6]]);
      // Blade edge
      paintPoints(g, 'E', [[13, 1], [14, 2], [14, 3], [14, 4], [14, 5], [13, 6]]);
      // Rivets connecting blade to shaft
      paintPoints(g, 'R', [[8, 2], [8, 4], [8, 6]]);
      // Pole shaft
      paintV(g, 'S', 7, 1, 14);
      paintV(g, 'S', 8, 7, 14);
      // Foot cap
      paintPoints(g, 'F', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 2. GLAIVE ────────────────────────────────────────────────
  makeTemplate(
    'glaive_16',
    'French glaive with single-edged curved blade, langets, and long shaft.',
    {
      B: { name: 'curved_blade', role: 'body' },
      E: { name: 'cutting_edge', role: 'head' },
      S: { name: 'long_shaft', role: 'arm' },
      L: { name: 'langets', role: 'accessory' },
      F: { name: 'butt_spike', role: 'belt' },
    },
    {
      body: C.steel,
      head: C.ivory,
      arm: C.wood,
      accessory: C.metal,
      belt: C.iron,
    },
    (g) => {
      // Curved blade — like a large knife
      paintPoints(g, 'B', [[8, 1], [9, 1]]);
      paintPoints(g, 'B', [[7, 2], [8, 2], [9, 2], [10, 2]]);
      paintRect(g, 'B', 7, 3, 10, 5);
      paintPoints(g, 'B', [[8, 6], [9, 6]]);
      // Cutting edge
      paintPoints(g, 'E', [[10, 1], [11, 2], [11, 3], [11, 4], [10, 5]]);
      // Langets
      paintPoints(g, 'L', [[6, 6], [9, 6], [6, 7], [9, 7]]);
      // Shaft
      paintV(g, 'S', 7, 7, 13);
      paintV(g, 'S', 8, 7, 13);
      // Butt spike
      paintPoints(g, 'F', [[7, 14], [8, 14]]);
    },
  ),

  // ── 3. VOULGE ────────────────────────────────────────────────
  makeTemplate(
    'voulge_16',
    'Medieval voulge with broad cleaving blade, back spike, and reinforced shaft.',
    {
      B: { name: 'broad_blade', role: 'body' },
      K: { name: 'back_spike', role: 'head' },
      S: { name: 'reinforced_shaft', role: 'arm' },
      R: { name: 'metal_straps', role: 'accessory' },
      F: { name: 'foot_cap', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.steel,
      arm: C.darkWood,
      accessory: C.iron,
      belt: C.iron,
    },
    (g) => {
      // Broad cleaving blade
      paintRect(g, 'B', 8, 1, 12, 5);
      paintPoints(g, 'B', [[13, 2], [13, 3], [13, 4]]);
      // Back spike
      paintPoints(g, 'K', [[5, 2], [6, 2], [5, 3], [6, 3]]);
      // Metal straps
      paintPoints(g, 'R', [[8, 5], [8, 6], [6, 7], [9, 7]]);
      // Shaft
      paintV(g, 'S', 7, 3, 13);
      paintV(g, 'S', 8, 7, 13);
      // Foot cap
      paintPoints(g, 'F', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 4. PARTISAN ──────────────────────────────────────────────
  makeTemplate(
    'partisan_16',
    'Renaissance partisan with wide spear blade, wing-like lugs, and tassel.',
    {
      B: { name: 'spear_blade', role: 'body' },
      W: { name: 'wing_lugs', role: 'head' },
      S: { name: 'shaft', role: 'arm' },
      T: { name: 'tassel', role: 'accessory' },
      F: { name: 'foot_cap', role: 'belt' },
    },
    {
      body: C.steel,
      head: C.metal,
      arm: C.wood,
      accessory: C.red,
      belt: C.iron,
    },
    (g) => {
      // Spear blade — pointed leaf shape
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      paintPoints(g, 'B', [[6, 2], [7, 2], [8, 2], [9, 2]]);
      paintRect(g, 'B', 6, 3, 9, 5);
      paintPoints(g, 'B', [[7, 6], [8, 6]]);
      // Wing lugs — side projections
      paintPoints(g, 'W', [[4, 5], [5, 5], [10, 5], [11, 5]]);
      paintPoints(g, 'W', [[3, 6], [4, 6], [11, 6], [12, 6]]);
      // Tassel
      paintPoints(g, 'T', [[6, 7], [7, 7], [8, 7], [9, 7]]);
      paintPoints(g, 'T', [[6, 8], [9, 8]]);
      // Shaft
      paintV(g, 'S', 7, 8, 13);
      paintV(g, 'S', 8, 8, 13);
      // Foot cap
      paintPoints(g, 'F', [[7, 14], [8, 14]]);
    },
  ),

  // ── 5. WAR PICK ──────────────────────────────────────────────
  makeTemplate(
    'war_pick_16',
    'Armor-piercing war pick with long spike head, counterweight, and leather grip.',
    {
      H: { name: 'spike_head', role: 'head' },
      W: { name: 'counterweight', role: 'body' },
      S: { name: 'shaft', role: 'arm' },
      G: { name: 'leather_grip', role: 'accessory' },
      B: { name: 'butt_cap', role: 'belt' },
    },
    {
      head: C.steel,
      body: C.metal,
      arm: C.wood,
      accessory: C.leather,
      belt: C.iron,
    },
    (g) => {
      // Long spike — extending right
      paintH(g, 'H', 4, 8, 14);
      paintH(g, 'H', 5, 9, 13);
      // Counterweight — hammer back left
      paintRect(g, 'W', 3, 3, 6, 6);
      // Shaft
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Leather grip
      paintPoints(g, 'G', [[6, 8], [9, 9], [6, 10], [9, 11]]);
      // Butt cap
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 6. LUCERNE HAMMER ────────────────────────────────────────
  makeTemplate(
    'lucerne_hammer_16',
    'Swiss lucerne hammer with hammer face, spike top, and beak fluke.',
    {
      H: { name: 'hammer_face', role: 'head' },
      T: { name: 'top_spike', role: 'body' },
      K: { name: 'beak_fluke', role: 'accessory' },
      S: { name: 'shaft', role: 'arm' },
      B: { name: 'butt_cap', role: 'belt' },
    },
    {
      head: C.metal,
      body: C.steel,
      accessory: C.metal,
      arm: C.wood,
      belt: C.iron,
    },
    (g) => {
      // Top spike
      paintPoints(g, 'T', [[7, 1], [8, 1], [7, 2], [8, 2]]);
      // Hammer face — right
      paintRect(g, 'H', 9, 3, 12, 5);
      // Beak fluke — left
      paintPoints(g, 'K', [[3, 3], [4, 3], [5, 4], [3, 4], [4, 4]]);
      paintPoints(g, 'K', [[3, 5], [4, 5], [5, 5]]);
      // Shaft
      paintV(g, 'S', 7, 3, 13);
      paintV(g, 'S', 8, 3, 13);
      // Butt cap
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 7. MAUL ──────────────────────────────────────────────────
  makeTemplate(
    'maul_16',
    'Massive two-handed maul with enormous stone head and reinforced shaft.',
    {
      H: { name: 'stone_head', role: 'head' },
      R: { name: 'metal_bands', role: 'accessory' },
      S: { name: 'reinforced_shaft', role: 'body' },
      G: { name: 'leather_grip', role: 'arm' },
      B: { name: 'butt_cap', role: 'belt' },
    },
    {
      head: C.darkMetal,
      accessory: C.iron,
      body: C.wood,
      arm: C.leather,
      belt: C.iron,
    },
    (g) => {
      // Enormous stone head
      paintRect(g, 'H', 3, 1, 12, 5);
      // Metal bands on head
      paintH(g, 'R', 1, 4, 11);
      paintH(g, 'R', 5, 4, 11);
      // Shaft
      paintV(g, 'S', 7, 6, 13);
      paintV(g, 'S', 8, 6, 13);
      // Leather grip
      paintPoints(g, 'G', [[6, 8], [9, 9], [6, 10], [9, 11]]);
      // Butt cap
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 8. GREAT MACE ───────────────────────────────────────────
  makeTemplate(
    'great_mace_16',
    'Heavy great mace with flanged head, reinforced shaft, and spiked top.',
    {
      H: { name: 'flanged_head', role: 'head' },
      T: { name: 'top_spike', role: 'body' },
      S: { name: 'shaft', role: 'arm' },
      F: { name: 'flanges', role: 'accessory' },
      B: { name: 'butt_cap', role: 'belt' },
    },
    {
      head: C.metal,
      body: C.steel,
      arm: C.darkWood,
      accessory: C.steel,
      belt: C.iron,
    },
    (g) => {
      // Top spike
      paintPoints(g, 'T', [[7, 1], [8, 1]]);
      // Flanged head
      paintRect(g, 'H', 5, 2, 10, 5);
      // Flanges — protruding
      paintPoints(g, 'F', [[4, 3], [11, 3], [4, 4], [11, 4]]);
      paintPoints(g, 'F', [[3, 3], [12, 4]]);
      // Shaft
      paintV(g, 'S', 7, 6, 13);
      paintV(g, 'S', 8, 6, 13);
      // Butt cap
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 9. METEOR HAMMER ─────────────────────────────────────────
  makeTemplate(
    'meteor_hammer_16',
    'Chinese meteor hammer with heavy iron ball, chain, and ring handle.',
    {
      B: { name: 'iron_ball', role: 'body' },
      C: { name: 'chain_links', role: 'head' },
      R: { name: 'ring_handle', role: 'arm' },
      S: { name: 'spikes', role: 'accessory' },
      W: { name: 'cord_wrap', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.iron,
      arm: C.metal,
      accessory: C.steel,
      belt: C.leather,
    },
    (g) => {
      // Heavy iron ball
      paintRect(g, 'B', 2, 1, 6, 5);
      paintPoints(g, 'B', [[3, 6], [4, 6], [5, 6]]);
      // Spikes on ball
      paintPoints(g, 'S', [[1, 2], [7, 2], [1, 4], [7, 4], [3, 0], [4, 0]]);
      // Chain links
      paintPoints(g, 'C', [[6, 5], [7, 6], [8, 7], [9, 8]]);
      paintPoints(g, 'C', [[7, 5], [8, 6], [9, 7], [10, 8]]);
      // Ring handle
      paintRect(g, 'R', 10, 9, 13, 12);
      paintRect(g, 'W', 11, 10, 12, 11);  // inner space
      // Cord wrap
      paintPoints(g, 'W', [[10, 13], [13, 13]]);
    },
  ),

  // ── 10. TETSUBO ──────────────────────────────────────────────
  makeTemplate(
    'tetsubo_16',
    'Japanese tetsubo iron-studded club with heavy head and long grip.',
    {
      B: { name: 'club_body', role: 'body' },
      S: { name: 'iron_studs', role: 'head' },
      G: { name: 'grip_wrap', role: 'arm' },
      R: { name: 'iron_rings', role: 'accessory' },
      F: { name: 'foot_end', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.iron,
      arm: C.leather,
      accessory: C.darkMetal,
      belt: C.darkWood,
    },
    (g) => {
      // Club body — tapers from thick top to thin bottom
      paintRect(g, 'B', 4, 1, 11, 4);
      paintRect(g, 'B', 5, 5, 10, 6);
      paintRect(g, 'B', 6, 7, 9, 8);
      // Iron studs
      paintPoints(g, 'S', [[5, 1], [7, 1], [9, 1], [11, 1]]);
      paintPoints(g, 'S', [[4, 3], [6, 3], [8, 3], [10, 3]]);
      paintPoints(g, 'S', [[5, 5], [7, 5], [9, 5]]);
      // Iron rings
      paintPoints(g, 'R', [[6, 7], [9, 7]]);
      // Shaft / grip
      paintV(g, 'G', 7, 9, 13);
      paintV(g, 'G', 8, 9, 13);
      // Foot end
      paintPoints(g, 'F', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 11. BATTLE STAFF ─────────────────────────────────────────
  makeTemplate(
    'battle_staff_16',
    'Reinforced battle staff with iron-capped ends, leather grip, and metal bands.',
    {
      S: { name: 'hardwood_shaft', role: 'body' },
      T: { name: 'top_cap', role: 'head' },
      B: { name: 'bottom_cap', role: 'belt' },
      G: { name: 'center_grip', role: 'arm' },
      M: { name: 'metal_bands', role: 'accessory' },
    },
    {
      body: C.wood,
      head: C.iron,
      belt: C.iron,
      arm: C.leather,
      accessory: C.metal,
    },
    (g) => {
      // Top iron cap
      paintPoints(g, 'T', [[6, 1], [7, 1], [8, 1], [9, 1]]);
      paintPoints(g, 'T', [[7, 2], [8, 2]]);
      // Hardwood shaft
      paintV(g, 'S', 7, 3, 12);
      paintV(g, 'S', 8, 3, 12);
      // Metal bands
      paintPoints(g, 'M', [[6, 4], [9, 4], [6, 11], [9, 11]]);
      // Center grip
      paintPoints(g, 'G', [[6, 7], [9, 7], [6, 8], [9, 8]]);
      paintPoints(g, 'G', [[6, 6], [9, 6], [6, 9], [9, 9]]);
      // Bottom iron cap
      paintPoints(g, 'B', [[7, 13], [8, 13]]);
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 12. BO STAFF ─────────────────────────────────────────────
  makeTemplate(
    'bo_staff_16',
    'Japanese bo staff — smooth tapered hardwood, long and elegant.',
    {
      S: { name: 'hardwood_shaft', role: 'body' },
      T: { name: 'tapered_tip', role: 'head' },
      B: { name: 'tapered_butt', role: 'belt' },
      G: { name: 'center_wrap', role: 'arm' },
      L: { name: 'lacquer_shine', role: 'accessory' },
    },
    {
      body: C.wood,
      head: C.wood,
      belt: C.wood,
      arm: C.darkWood,
      accessory: C.brass,
    },
    (g) => {
      // Tapered tip
      paintPoints(g, 'T', [[7, 1], [8, 1]]);
      // Main shaft
      paintV(g, 'S', 7, 2, 13);
      paintV(g, 'S', 8, 2, 13);
      // Lacquer shine — highlights
      paintPoints(g, 'L', [[9, 3], [9, 5], [9, 7], [9, 9], [9, 11]]);
      // Center wrap
      paintPoints(g, 'G', [[6, 7], [9, 7], [6, 8], [9, 8]]);
      // Tapered butt
      paintPoints(g, 'B', [[7, 14], [8, 14]]);
    },
  ),

  // ── 13. TONFA ────────────────────────────────────────────────
  makeTemplate(
    'tonfa_16',
    'Okinawan tonfa with side handle, cylindrical body, and rounded tip.',
    {
      B: { name: 'tonfa_body', role: 'body' },
      H: { name: 'side_handle', role: 'head' },
      T: { name: 'rounded_tip', role: 'arm' },
      G: { name: 'handle_grip', role: 'accessory' },
      E: { name: 'butt_end', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.wood,
      arm: C.darkWood,
      accessory: C.leather,
      belt: C.darkWood,
    },
    (g) => {
      // Main body — horizontal/vertical
      paintV(g, 'B', 7, 1, 14);
      paintV(g, 'B', 8, 1, 14);
      // Rounded tip
      paintPoints(g, 'T', [[6, 1], [9, 1], [7, 1], [8, 1]]);
      // Side handle — perpendicular
      paintH(g, 'H', 6, 9, 12);
      paintH(g, 'H', 7, 10, 13);
      // Handle grip
      paintPoints(g, 'G', [[11, 5], [12, 5], [11, 8], [12, 8]]);
      // Butt end
      paintPoints(g, 'E', [[6, 14], [9, 14]]);
    },
  ),

  // ── 14. KAMA ─────────────────────────────────────────────────
  makeTemplate(
    'kama_16',
    'Okinawan kama sickle weapon with curved blade, short handle, and tang.',
    {
      B: { name: 'curved_blade', role: 'body' },
      E: { name: 'blade_edge', role: 'head' },
      S: { name: 'short_handle', role: 'arm' },
      T: { name: 'tang_collar', role: 'accessory' },
      G: { name: 'grip_wrap', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.ivory,
      arm: C.wood,
      accessory: C.iron,
      belt: C.leather,
    },
    (g) => {
      // Curved blade — sickle shape
      paintPoints(g, 'B', [[11, 1], [12, 1]]);
      paintPoints(g, 'B', [[10, 2], [11, 2]]);
      paintPoints(g, 'B', [[9, 3], [10, 3]]);
      paintPoints(g, 'B', [[8, 4], [9, 4]]);
      paintPoints(g, 'B', [[7, 5], [8, 5]]);
      // Blade edge
      paintPoints(g, 'E', [[13, 1], [12, 2], [11, 3], [10, 4], [9, 5]]);
      // Tang collar
      paintPoints(g, 'T', [[6, 5], [7, 5], [6, 6], [9, 6]]);
      // Short handle
      paintV(g, 'S', 7, 6, 13);
      paintV(g, 'S', 8, 6, 13);
      // Grip wrap
      paintPoints(g, 'G', [[6, 9], [9, 10], [6, 11], [9, 12]]);
      // Handle end
      paintPoints(g, 'S', [[7, 14], [8, 14]]);
    },
  ),

  // ── 15. NAGAMAKI ─────────────────────────────────────────────
  makeTemplate(
    'nagamaki_16',
    'Japanese nagamaki with long blade, extra-long wrapped grip, equal proportions.',
    {
      B: { name: 'long_blade', role: 'body' },
      E: { name: 'blade_edge', role: 'head' },
      G: { name: 'tsuba_guard', role: 'accessory' },
      H: { name: 'long_grip', role: 'arm' },
      P: { name: 'kashira_cap', role: 'belt' },
    },
    {
      body: C.steel,
      head: C.ivory,
      accessory: C.brass,
      arm: C.darkWood,
      belt: C.brass,
    },
    (g) => {
      // Blade tip
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      // Long blade
      paintRect(g, 'B', 6, 2, 9, 6);
      // Blade edge
      paintPoints(g, 'E', [[10, 2], [10, 3], [10, 4], [10, 5], [10, 6]]);
      // Tsuba guard — round
      paintH(g, 'G', 7, 4, 11);
      paintPoints(g, 'G', [[4, 8], [11, 8]]);
      // Extra-long grip — equal to blade length
      paintRect(g, 'H', 7, 8, 8, 13);
      // Kashira cap
      paintPoints(g, 'P', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 16. GUANDAO ──────────────────────────────────────────────
  makeTemplate(
    'guandao_16',
    'Chinese guandao (Green Dragon Crescent Blade) with large curved blade and long shaft.',
    {
      B: { name: 'crescent_blade', role: 'body' },
      E: { name: 'blade_edge', role: 'head' },
      S: { name: 'long_shaft', role: 'arm' },
      T: { name: 'tassel', role: 'accessory' },
      F: { name: 'spike_butt', role: 'belt' },
    },
    {
      body: C.steel,
      head: C.ivory,
      arm: C.cherry,
      accessory: C.red,
      belt: C.iron,
    },
    (g) => {
      // Large crescent blade
      paintPoints(g, 'B', [[9, 1], [10, 1], [11, 1]]);
      paintRect(g, 'B', 8, 2, 12, 4);
      paintPoints(g, 'B', [[8, 5], [9, 5], [10, 5]]);
      // Blade edge — outer curve
      paintPoints(g, 'E', [[12, 1], [13, 2], [13, 3], [13, 4], [12, 5], [11, 5]]);
      // Tassel
      paintPoints(g, 'T', [[6, 6], [5, 7], [6, 7], [5, 8]]);
      // Shaft
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Spike butt
      paintPoints(g, 'F', [[7, 14], [8, 14]]);
    },
  ),

  // ── 17. JI HALBERD ───────────────────────────────────────────
  makeTemplate(
    'ji_halberd_16',
    'Chinese ji halberd with dagger-axe blade, spear tip, and tasseled shaft.',
    {
      T: { name: 'spear_tip', role: 'head' },
      B: { name: 'axe_blade', role: 'body' },
      S: { name: 'shaft', role: 'arm' },
      A: { name: 'tassel', role: 'accessory' },
      F: { name: 'butt_cap', role: 'belt' },
    },
    {
      head: C.steel,
      body: C.metal,
      arm: C.cherry,
      accessory: C.red,
      belt: C.iron,
    },
    (g) => {
      // Spear tip
      paintPoints(g, 'T', [[7, 1], [8, 1]]);
      paintPoints(g, 'T', [[6, 2], [7, 2], [8, 2], [9, 2]]);
      paintPoints(g, 'T', [[7, 3], [8, 3]]);
      // Axe blade — side projection
      paintPoints(g, 'B', [[9, 4], [10, 4], [11, 4]]);
      paintPoints(g, 'B', [[9, 5], [10, 5], [11, 5], [12, 5]]);
      paintPoints(g, 'B', [[9, 6], [10, 6], [11, 6]]);
      // Tassel
      paintPoints(g, 'A', [[5, 6], [6, 6], [5, 7], [6, 7]]);
      // Shaft
      paintV(g, 'S', 7, 4, 13);
      paintV(g, 'S', 8, 4, 13);
      // Butt cap
      paintPoints(g, 'F', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 18. NAGINATA ─────────────────────────────────────────────
  makeTemplate(
    'naginata_16',
    'Japanese naginata with curved blade, hand guard collar, and lacquered shaft.',
    {
      B: { name: 'curved_blade', role: 'body' },
      E: { name: 'blade_edge', role: 'head' },
      S: { name: 'lacquered_shaft', role: 'arm' },
      C: { name: 'collar_guard', role: 'accessory' },
      F: { name: 'ishizuki_cap', role: 'belt' },
    },
    {
      body: C.steel,
      head: C.ivory,
      arm: C.darkWood,
      accessory: C.brass,
      belt: C.brass,
    },
    (g) => {
      // Curved blade
      paintPoints(g, 'B', [[8, 1], [9, 1]]);
      paintPoints(g, 'B', [[7, 2], [8, 2], [9, 2]]);
      paintRect(g, 'B', 7, 3, 9, 5);
      paintPoints(g, 'B', [[7, 6], [8, 6]]);
      // Blade edge — curved
      paintPoints(g, 'E', [[10, 1], [10, 2], [10, 3], [10, 4], [9, 5]]);
      // Collar guard
      paintH(g, 'C', 7, 5, 10);
      // Shaft
      paintV(g, 'S', 7, 7, 13);
      paintV(g, 'S', 8, 7, 13);
      // Ishizuki cap
      paintPoints(g, 'F', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 19. WOLDO ────────────────────────────────────────────────
  makeTemplate(
    'woldo_16',
    'Korean woldo with large crescent blade, decorative ring, and long pole.',
    {
      B: { name: 'crescent_blade', role: 'body' },
      E: { name: 'blade_edge', role: 'head' },
      R: { name: 'decorative_ring', role: 'accessory' },
      S: { name: 'long_pole', role: 'arm' },
      F: { name: 'butt_cap', role: 'belt' },
    },
    {
      body: C.steel,
      head: C.ivory,
      accessory: C.gold,
      arm: C.wood,
      belt: C.iron,
    },
    (g) => {
      // Large crescent blade
      paintPoints(g, 'B', [[8, 1], [9, 1], [10, 1]]);
      paintRect(g, 'B', 8, 2, 11, 4);
      paintPoints(g, 'B', [[8, 5], [9, 5]]);
      // Blade edge
      paintPoints(g, 'E', [[11, 1], [12, 2], [12, 3], [12, 4], [10, 5]]);
      // Decorative ring
      paintPoints(g, 'R', [[6, 5], [5, 6], [6, 6], [5, 7], [6, 7]]);
      // Long pole
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 6, 13);
      // Butt cap
      paintPoints(g, 'F', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 20. MONK SPADE ───────────────────────────────────────────
  makeTemplate(
    'monk_spade_16',
    'Chinese monk spade with crescent blade on one end and flat spade on the other.',
    {
      C: { name: 'crescent_top', role: 'head' },
      P: { name: 'spade_bottom', role: 'body' },
      S: { name: 'shaft', role: 'arm' },
      R: { name: 'metal_rings', role: 'accessory' },
      G: { name: 'center_grip', role: 'belt' },
    },
    {
      head: C.steel,
      body: C.metal,
      arm: C.wood,
      accessory: C.brass,
      belt: C.leather,
    },
    (g) => {
      // Crescent top — moon blade
      paintPoints(g, 'C', [[4, 1], [5, 1], [10, 1], [11, 1]]);
      paintPoints(g, 'C', [[3, 2], [4, 2], [11, 2], [12, 2]]);
      paintPoints(g, 'C', [[4, 3], [5, 3], [6, 3], [9, 3], [10, 3], [11, 3]]);
      paintPoints(g, 'C', [[7, 3], [8, 3]]);
      // Shaft
      paintV(g, 'S', 7, 4, 11);
      paintV(g, 'S', 8, 4, 11);
      // Metal rings
      paintPoints(g, 'R', [[6, 5], [9, 5], [6, 10], [9, 10]]);
      // Center grip
      paintPoints(g, 'G', [[6, 7], [9, 7], [6, 8], [9, 8]]);
      // Flat spade bottom
      paintRect(g, 'P', 4, 12, 11, 13);
      paintPoints(g, 'P', [[5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'weapons',
  exportNames: {
    templates: 'WEAPON_STAFF_BATCH4_TEMPLATES',
    schemes: 'WEAPON_STAFF_BATCH4_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
