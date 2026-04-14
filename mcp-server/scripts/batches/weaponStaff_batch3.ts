/**
 * Weapons, Staffs & Bows batch 3 — Bows & Ranged Weapons.
 * 20 original 16x16 templates — diverse bows, thrown weapons, and ranged arms.
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
  crystal:   { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
  fire:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  ice:       { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  vine:      { shadow: '#346524', base: '#6daa2c', highlight: '#854c30' },
  silver:    { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
  copper:    { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  elven:     { shadow: '#346524', base: '#6daa2c', highlight: '#deeed6' },
  dark:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  rope:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
};

const templates: CompactTemplate[] = [
  // ── 1. COMPOSITE BOW ─────────────────────────────────────────
  makeTemplate(
    'composite_bow_16',
    'Layered composite bow with recurved limbs, sinew string, and leather grip.',
    {
      L: { name: 'bow_limbs', role: 'body' },
      S: { name: 'sinew_string', role: 'head' },
      G: { name: 'leather_grip', role: 'arm' },
      T: { name: 'limb_tips', role: 'accessory' },
      A: { name: 'arrow', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.ivory,
      arm: C.leather,
      accessory: C.brass,
      belt: C.metal,
    },
    (g) => {
      // Upper limb — curved
      paintPoints(g, 'L', [[4, 1], [3, 2], [3, 3], [3, 4], [4, 5], [5, 6]]);
      paintPoints(g, 'L', [[5, 1], [4, 2], [4, 3], [4, 4], [5, 5], [6, 6]]);
      // Lower limb — curved
      paintPoints(g, 'L', [[5, 10], [4, 11], [3, 12], [3, 13], [4, 14]]);
      paintPoints(g, 'L', [[6, 10], [5, 11], [4, 12], [4, 13], [5, 14]]);
      // Limb tips
      paintPoints(g, 'T', [[3, 1], [5, 14], [4, 14]]);
      // String
      paintV(g, 'S', 5, 1, 6);
      paintV(g, 'S', 5, 10, 14);
      // Grip
      paintRect(g, 'G', 5, 7, 7, 9);
      // Arrow
      paintV(g, 'A', 9, 2, 14);
      paintPoints(g, 'A', [[8, 2], [10, 2]]);
    },
  ),

  // ── 2. WAR BOW ───────────────────────────────────────────────
  makeTemplate(
    'war_bow_16',
    'Heavy war bow with thick reinforced limbs, heavy string, and metal-capped tips.',
    {
      L: { name: 'thick_limbs', role: 'body' },
      S: { name: 'heavy_string', role: 'head' },
      G: { name: 'wrapped_grip', role: 'arm' },
      T: { name: 'metal_caps', role: 'accessory' },
      A: { name: 'war_arrow', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.rope,
      arm: C.leather,
      accessory: C.metal,
      belt: C.metal,
    },
    (g) => {
      // Upper limb — thick
      paintPoints(g, 'L', [[4, 1], [3, 2], [3, 3], [3, 4], [4, 5], [5, 6]]);
      paintPoints(g, 'L', [[5, 1], [4, 2], [4, 3], [4, 4], [5, 5], [6, 6]]);
      paintPoints(g, 'L', [[5, 2], [5, 3], [5, 4]]);
      // Lower limb — thick
      paintPoints(g, 'L', [[5, 10], [4, 11], [3, 12], [3, 13], [4, 14]]);
      paintPoints(g, 'L', [[6, 10], [5, 11], [4, 12], [4, 13], [5, 14]]);
      paintPoints(g, 'L', [[5, 11], [5, 12], [5, 13]]);
      // Metal caps
      paintPoints(g, 'T', [[3, 1], [4, 1], [3, 14], [4, 14]]);
      // String
      paintV(g, 'S', 6, 1, 6);
      paintV(g, 'S', 6, 10, 14);
      // Grip
      paintRect(g, 'G', 5, 7, 7, 9);
      // War arrow
      paintV(g, 'A', 10, 3, 13);
      paintPoints(g, 'A', [[9, 3], [11, 3]]);
    },
  ),

  // ── 3. ELVEN BOW ─────────────────────────────────────────────
  makeTemplate(
    'elven_bow_16',
    'Graceful elven bow with slender limbs, leaf motifs, and silk string.',
    {
      L: { name: 'slender_limbs', role: 'body' },
      S: { name: 'silk_string', role: 'head' },
      G: { name: 'vine_grip', role: 'arm' },
      M: { name: 'leaf_motifs', role: 'accessory' },
      A: { name: 'elven_arrow', role: 'belt' },
    },
    {
      body: C.elven,
      head: C.ivory,
      arm: C.vine,
      accessory: C.green,
      belt: C.silver,
    },
    (g) => {
      // Upper limb — elegant curve
      paintPoints(g, 'L', [[5, 1], [4, 2], [3, 3], [3, 4], [4, 5], [5, 6]]);
      paintPoints(g, 'L', [[4, 2], [4, 3], [4, 4], [5, 5]]);
      // Lower limb
      paintPoints(g, 'L', [[5, 10], [4, 11], [3, 12], [3, 13], [4, 14], [5, 14]]);
      paintPoints(g, 'L', [[4, 11], [4, 12], [4, 13]]);
      // Leaf motifs
      paintPoints(g, 'M', [[2, 3], [2, 4], [2, 12], [2, 13]]);
      // Silk string
      paintV(g, 'S', 5, 1, 6);
      paintV(g, 'S', 5, 10, 14);
      // Vine grip
      paintRect(g, 'G', 5, 7, 6, 9);
      // Elven arrow
      paintV(g, 'A', 9, 2, 14);
      paintPoints(g, 'A', [[8, 2], [10, 2]]);
    },
  ),

  // ── 4. DARK BOW ──────────────────────────────────────────────
  makeTemplate(
    'dark_bow_16',
    'Sinister dark bow with blackened limbs, shadow string, and skull nocks.',
    {
      L: { name: 'blackened_limbs', role: 'body' },
      S: { name: 'shadow_string', role: 'head' },
      G: { name: 'dark_grip', role: 'arm' },
      N: { name: 'skull_nocks', role: 'accessory' },
      A: { name: 'dark_arrow', role: 'belt' },
    },
    {
      body: C.dark,
      head: C.darkMetal,
      arm: C.darkWood,
      accessory: C.bone,
      belt: C.darkMetal,
    },
    (g) => {
      // Upper limb
      paintPoints(g, 'L', [[4, 1], [3, 2], [3, 3], [3, 4], [4, 5], [5, 6]]);
      paintPoints(g, 'L', [[5, 1], [4, 2], [4, 3], [4, 4], [5, 5], [6, 6]]);
      // Lower limb
      paintPoints(g, 'L', [[5, 10], [4, 11], [3, 12], [3, 13], [4, 14]]);
      paintPoints(g, 'L', [[6, 10], [5, 11], [4, 12], [4, 13], [5, 14]]);
      // Skull nocks
      paintPoints(g, 'N', [[3, 1], [4, 1], [3, 14], [4, 14]]);
      // Shadow string
      paintV(g, 'S', 5, 1, 6);
      paintV(g, 'S', 5, 10, 14);
      // Dark grip
      paintRect(g, 'G', 5, 7, 7, 9);
      // Dark arrow
      paintV(g, 'A', 10, 3, 13);
      paintPoints(g, 'A', [[9, 3], [11, 3]]);
    },
  ),

  // ── 5. BONE BOW ──────────────────────────────────────────────
  makeTemplate(
    'bone_bow_16',
    'Skeletal bone bow with rib-like limbs, sinew string, and joint grip.',
    {
      L: { name: 'rib_limbs', role: 'body' },
      S: { name: 'sinew_string', role: 'head' },
      G: { name: 'joint_grip', role: 'arm' },
      K: { name: 'bone_knobs', role: 'accessory' },
      A: { name: 'bone_arrow', role: 'belt' },
    },
    {
      body: C.bone,
      head: C.ivory,
      arm: C.bone,
      accessory: C.ivory,
      belt: C.bone,
    },
    (g) => {
      // Upper limb — rib-like
      paintPoints(g, 'L', [[5, 1], [4, 2], [3, 3], [3, 4], [4, 5], [5, 6]]);
      paintPoints(g, 'L', [[4, 3], [4, 4], [5, 5]]);
      // Lower limb
      paintPoints(g, 'L', [[5, 10], [4, 11], [3, 12], [3, 13], [4, 14]]);
      paintPoints(g, 'L', [[4, 12], [4, 13], [5, 14]]);
      // Bone knobs — joint bumps
      paintPoints(g, 'K', [[3, 2], [5, 1], [3, 14], [5, 14]]);
      // Sinew string
      paintV(g, 'S', 5, 1, 6);
      paintV(g, 'S', 5, 10, 14);
      // Joint grip
      paintRect(g, 'G', 5, 7, 7, 9);
      // Bone arrow
      paintV(g, 'A', 9, 3, 13);
      paintPoints(g, 'A', [[8, 3], [10, 3]]);
    },
  ),

  // ── 6. CRYSTAL BOW ───────────────────────────────────────────
  makeTemplate(
    'crystal_bow_16',
    'Translucent crystal bow with prismatic limbs, light string, and gem grip.',
    {
      L: { name: 'prismatic_limbs', role: 'body' },
      S: { name: 'light_string', role: 'head' },
      G: { name: 'gem_grip', role: 'arm' },
      P: { name: 'prism_tips', role: 'accessory' },
      A: { name: 'crystal_arrow', role: 'belt' },
    },
    {
      body: C.crystal,
      head: C.ivory,
      arm: C.crystal,
      accessory: C.ice,
      belt: C.crystal,
    },
    (g) => {
      // Upper limb — angular crystal
      paintPoints(g, 'L', [[5, 1], [4, 2], [3, 3], [3, 4], [4, 5], [5, 6]]);
      paintPoints(g, 'L', [[4, 3], [4, 4], [5, 5]]);
      // Lower limb
      paintPoints(g, 'L', [[5, 10], [4, 11], [3, 12], [3, 13], [4, 14]]);
      paintPoints(g, 'L', [[4, 12], [4, 13], [5, 14]]);
      // Prism tips
      paintPoints(g, 'P', [[4, 1], [6, 1], [3, 14], [5, 14]]);
      // Light string
      paintV(g, 'S', 5, 1, 6);
      paintV(g, 'S', 5, 10, 14);
      // Gem grip
      paintRect(g, 'G', 5, 7, 7, 9);
      // Crystal arrow
      paintV(g, 'A', 9, 3, 13);
      paintPoints(g, 'A', [[8, 3], [10, 3]]);
    },
  ),

  // ── 7. FIRE BOW ──────────────────────────────────────────────
  makeTemplate(
    'fire_bow_16',
    'Blazing fire bow with ember-wrapped limbs, flame string, and charred grip.',
    {
      L: { name: 'ember_limbs', role: 'body' },
      S: { name: 'flame_string', role: 'head' },
      G: { name: 'charred_grip', role: 'arm' },
      F: { name: 'flame_tips', role: 'accessory' },
      A: { name: 'fire_arrow', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.fire,
      arm: C.darkWood,
      accessory: C.fire,
      belt: C.fire,
    },
    (g) => {
      // Upper limb
      paintPoints(g, 'L', [[4, 1], [3, 2], [3, 3], [3, 4], [4, 5], [5, 6]]);
      paintPoints(g, 'L', [[4, 2], [4, 3], [4, 4], [5, 5]]);
      // Lower limb
      paintPoints(g, 'L', [[5, 10], [4, 11], [3, 12], [3, 13], [4, 14]]);
      paintPoints(g, 'L', [[4, 11], [4, 12], [4, 13]]);
      // Flame tips
      paintPoints(g, 'F', [[3, 1], [2, 1], [5, 1], [3, 14], [2, 14], [5, 14]]);
      // Flame string
      paintV(g, 'S', 5, 1, 6);
      paintV(g, 'S', 5, 10, 14);
      // Charred grip
      paintRect(g, 'G', 5, 7, 7, 9);
      // Fire arrow
      paintV(g, 'A', 9, 3, 13);
      paintPoints(g, 'A', [[8, 3], [10, 3], [8, 2], [9, 2], [10, 2]]);
    },
  ),

  // ── 8. ICE BOW ───────────────────────────────────────────────
  makeTemplate(
    'ice_bow_16',
    'Frozen ice bow with icicle limbs, frost string, and glacial grip.',
    {
      L: { name: 'icicle_limbs', role: 'body' },
      S: { name: 'frost_string', role: 'head' },
      G: { name: 'glacial_grip', role: 'arm' },
      I: { name: 'ice_shards', role: 'accessory' },
      A: { name: 'ice_arrow', role: 'belt' },
    },
    {
      body: C.ice,
      head: C.ivory,
      arm: C.blue,
      accessory: C.ice,
      belt: C.ice,
    },
    (g) => {
      // Upper limb — icy
      paintPoints(g, 'L', [[5, 1], [4, 2], [3, 3], [3, 4], [4, 5], [5, 6]]);
      paintPoints(g, 'L', [[4, 3], [4, 4], [5, 5]]);
      // Lower limb
      paintPoints(g, 'L', [[5, 10], [4, 11], [3, 12], [3, 13], [4, 14]]);
      paintPoints(g, 'L', [[4, 12], [4, 13], [5, 14]]);
      // Ice shards jutting out
      paintPoints(g, 'I', [[2, 3], [2, 4], [2, 12], [2, 13]]);
      // Frost string
      paintV(g, 'S', 5, 1, 6);
      paintV(g, 'S', 5, 10, 14);
      // Glacial grip
      paintRect(g, 'G', 5, 7, 7, 9);
      // Ice arrow
      paintV(g, 'A', 9, 3, 13);
      paintPoints(g, 'A', [[8, 3], [10, 3]]);
    },
  ),

  // ── 9. THUNDER BOW ───────────────────────────────────────────
  makeTemplate(
    'thunder_bow_16',
    'Electrified thunder bow with charged limbs, spark string, and copper grip.',
    {
      L: { name: 'charged_limbs', role: 'body' },
      S: { name: 'spark_string', role: 'head' },
      G: { name: 'copper_grip', role: 'arm' },
      E: { name: 'electric_arcs', role: 'accessory' },
      A: { name: 'thunder_arrow', role: 'belt' },
    },
    {
      body: C.copper,
      head: C.gold,
      arm: C.copper,
      accessory: C.gold,
      belt: C.metal,
    },
    (g) => {
      // Upper limb
      paintPoints(g, 'L', [[5, 1], [4, 2], [3, 3], [3, 4], [4, 5], [5, 6]]);
      paintPoints(g, 'L', [[4, 3], [4, 4], [5, 5]]);
      // Lower limb
      paintPoints(g, 'L', [[5, 10], [4, 11], [3, 12], [3, 13], [4, 14]]);
      paintPoints(g, 'L', [[4, 12], [4, 13], [5, 14]]);
      // Electric arcs
      paintPoints(g, 'E', [[2, 2], [2, 4], [2, 12], [2, 14]]);
      // Spark string
      paintV(g, 'S', 5, 1, 6);
      paintV(g, 'S', 5, 10, 14);
      // Copper grip
      paintRect(g, 'G', 5, 7, 7, 9);
      // Thunder arrow
      paintV(g, 'A', 9, 3, 13);
      paintPoints(g, 'A', [[8, 3], [10, 3]]);
    },
  ),

  // ── 10. VINE BOW ─────────────────────────────────────────────
  makeTemplate(
    'vine_bow_16',
    'Living vine bow with thorny limbs, tendril string, and flower grip.',
    {
      L: { name: 'thorny_limbs', role: 'body' },
      S: { name: 'tendril_string', role: 'head' },
      G: { name: 'flower_grip', role: 'arm' },
      T: { name: 'thorns', role: 'accessory' },
      A: { name: 'thorn_arrow', role: 'belt' },
    },
    {
      body: C.vine,
      head: C.green,
      arm: C.red,
      accessory: C.green,
      belt: C.wood,
    },
    (g) => {
      // Upper limb — vine-like
      paintPoints(g, 'L', [[5, 1], [4, 2], [3, 3], [3, 4], [4, 5], [5, 6]]);
      paintPoints(g, 'L', [[4, 3], [4, 4], [5, 5]]);
      // Lower limb
      paintPoints(g, 'L', [[5, 10], [4, 11], [3, 12], [3, 13], [4, 14]]);
      paintPoints(g, 'L', [[4, 12], [4, 13], [5, 14]]);
      // Thorns
      paintPoints(g, 'T', [[2, 2], [2, 4], [2, 12], [2, 14], [5, 3], [5, 13]]);
      // Tendril string
      paintV(g, 'S', 5, 1, 6);
      paintV(g, 'S', 5, 10, 14);
      // Flower grip
      paintRect(g, 'G', 5, 7, 7, 9);
      // Thorn arrow
      paintV(g, 'A', 9, 3, 13);
      paintPoints(g, 'A', [[8, 3], [10, 3]]);
    },
  ),

  // ── 11. SLING ────────────────────────────────────────────────
  makeTemplate(
    'sling_16',
    'Simple sling with leather pouch, braided cords, and stone projectile.',
    {
      P: { name: 'leather_pouch', role: 'body' },
      C: { name: 'braided_cords', role: 'head' },
      S: { name: 'stone_ammo', role: 'accessory' },
      G: { name: 'finger_loop', role: 'arm' },
      K: { name: 'knots', role: 'belt' },
    },
    {
      body: C.leather,
      head: C.rope,
      accessory: C.darkMetal,
      arm: C.leather,
      belt: C.darkWood,
    },
    (g) => {
      // Leather pouch — center
      paintRect(g, 'P', 6, 6, 9, 9);
      // Stone in pouch
      paintPoints(g, 'S', [[7, 7], [8, 7], [7, 8], [8, 8]]);
      // Upper cord
      paintPoints(g, 'C', [[6, 5], [5, 4], [4, 3], [3, 2], [2, 1]]);
      paintPoints(g, 'C', [[7, 5], [6, 4], [5, 3], [4, 2], [3, 1]]);
      // Lower cord
      paintPoints(g, 'C', [[6, 10], [5, 11], [4, 12], [3, 13]]);
      paintPoints(g, 'C', [[7, 10], [6, 11], [5, 12], [4, 13]]);
      // Finger loop
      paintPoints(g, 'G', [[1, 1], [2, 1], [1, 2]]);
      // Knots
      paintPoints(g, 'K', [[5, 5], [5, 10]]);
    },
  ),

  // ── 12. JAVELIN ──────────────────────────────────────────────
  makeTemplate(
    'javelin_16',
    'Light throwing javelin with leaf-blade head, slim shaft, and cord grip.',
    {
      S: { name: 'slim_shaft', role: 'body' },
      H: { name: 'leaf_head', role: 'head' },
      G: { name: 'cord_grip', role: 'arm' },
      T: { name: 'head_tip', role: 'accessory' },
      B: { name: 'butt_cap', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.metal,
      arm: C.leather,
      accessory: C.ivory,
      belt: C.darkMetal,
    },
    (g) => {
      // Leaf-blade head — pointed
      paintPoints(g, 'T', [[7, 1], [8, 1]]);
      paintPoints(g, 'H', [[6, 2], [7, 2], [8, 2], [9, 2]]);
      paintPoints(g, 'H', [[7, 3], [8, 3]]);
      // Slim shaft
      paintV(g, 'S', 7, 4, 13);
      paintV(g, 'S', 8, 4, 13);
      // Cord grip
      paintPoints(g, 'G', [[6, 9], [9, 10], [6, 11]]);
      // Butt cap
      paintPoints(g, 'B', [[7, 14], [8, 14]]);
    },
  ),

  // ── 13. THROWING KNIFE ───────────────────────────────────────
  makeTemplate(
    'throwing_knife_16',
    'Balanced throwing knife with narrow blade, weighted tang, and no guard.',
    {
      B: { name: 'narrow_blade', role: 'body' },
      T: { name: 'blade_tip', role: 'head' },
      H: { name: 'weighted_tang', role: 'arm' },
      W: { name: 'wrap', role: 'accessory' },
      E: { name: 'edge', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.ivory,
      arm: C.darkMetal,
      accessory: C.leather,
      belt: C.silver,
    },
    (g) => {
      // Blade tip
      paintPoints(g, 'T', [[7, 1], [8, 1]]);
      // Narrow blade
      paintRect(g, 'B', 7, 2, 8, 7);
      // Edge highlight
      paintPoints(g, 'E', [[6, 3], [6, 4], [6, 5], [6, 6]]);
      // Weighted tang handle
      paintRect(g, 'H', 6, 8, 9, 13);
      // Leather wrap
      paintPoints(g, 'W', [[6, 9], [9, 10], [6, 11], [9, 12]]);
      // Butt end
      paintPoints(g, 'H', [[7, 14], [8, 14]]);
    },
  ),

  // ── 14. KUNAI ────────────────────────────────────────────────
  makeTemplate(
    'kunai_16',
    'Ninja kunai with diamond blade, ring pommel, and wrapped handle.',
    {
      B: { name: 'diamond_blade', role: 'body' },
      T: { name: 'blade_tip', role: 'head' },
      H: { name: 'handle', role: 'arm' },
      R: { name: 'ring_pommel', role: 'accessory' },
      W: { name: 'cloth_wrap', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.ivory,
      arm: C.darkMetal,
      accessory: C.metal,
      belt: C.red,
    },
    (g) => {
      // Diamond blade tip
      paintPoints(g, 'T', [[7, 1], [8, 1]]);
      // Diamond blade — wider in middle
      paintPoints(g, 'B', [[6, 2], [7, 2], [8, 2], [9, 2]]);
      paintPoints(g, 'B', [[5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3]]);
      paintPoints(g, 'B', [[5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4]]);
      paintPoints(g, 'B', [[6, 5], [7, 5], [8, 5], [9, 5]]);
      paintPoints(g, 'B', [[7, 6], [8, 6]]);
      // Handle
      paintRect(g, 'H', 7, 7, 8, 11);
      // Cloth wrap
      paintPoints(g, 'W', [[6, 8], [9, 9], [6, 10]]);
      // Ring pommel
      paintPoints(g, 'R', [[6, 12], [7, 12], [8, 12], [9, 12]]);
      paintPoints(g, 'R', [[6, 13], [9, 13]]);
      paintPoints(g, 'R', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 15. DART BLOWPIPE ────────────────────────────────────────
  makeTemplate(
    'dart_blowpipe_16',
    'Long blowpipe with bamboo tube, dart pouch, and mouthpiece.',
    {
      T: { name: 'bamboo_tube', role: 'body' },
      M: { name: 'mouthpiece', role: 'head' },
      D: { name: 'dart_pouch', role: 'accessory' },
      B: { name: 'band_wraps', role: 'arm' },
      P: { name: 'dart_tip', role: 'belt' },
    },
    {
      body: C.green,
      head: C.wood,
      accessory: C.leather,
      arm: C.rope,
      belt: C.metal,
    },
    (g) => {
      // Long bamboo tube — horizontal
      paintH(g, 'T', 7, 1, 14);
      paintH(g, 'T', 8, 1, 14);
      // Mouthpiece — left end
      paintRect(g, 'M', 1, 6, 2, 9);
      // Band wraps
      paintPoints(g, 'B', [[4, 6], [4, 9], [8, 6], [8, 9], [12, 6], [12, 9]]);
      // Dart tip at exit
      paintPoints(g, 'P', [[14, 7], [14, 8]]);
      // Dart pouch — below
      paintRect(g, 'D', 5, 10, 9, 12);
      paintPoints(g, 'D', [[6, 13], [7, 13], [8, 13]]);
    },
  ),

  // ── 16. HAND CROSSBOW ────────────────────────────────────────
  makeTemplate(
    'hand_crossbow_16',
    'Compact hand crossbow with small prod, trigger mechanism, and bolt.',
    {
      B: { name: 'crossbow_body', role: 'body' },
      P: { name: 'prod_limbs', role: 'head' },
      S: { name: 'string', role: 'accessory' },
      T: { name: 'trigger_grip', role: 'arm' },
      A: { name: 'bolt', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.metal,
      accessory: C.rope,
      arm: C.leather,
      belt: C.metal,
    },
    (g) => {
      // Prod limbs — horizontal at top
      paintH(g, 'P', 3, 2, 13);
      paintH(g, 'P', 4, 3, 12);
      // String
      paintPoints(g, 'S', [[2, 4], [3, 5], [4, 5], [11, 5], [12, 5], [13, 4]]);
      // Body — stock
      paintRect(g, 'B', 6, 5, 9, 9);
      paintPoints(g, 'B', [[7, 4], [8, 4]]);
      // Bolt
      paintV(g, 'A', 7, 1, 4);
      paintV(g, 'A', 8, 1, 4);
      // Trigger grip — angled down
      paintRect(g, 'T', 6, 10, 9, 13);
      paintPoints(g, 'T', [[7, 14], [8, 14]]);
    },
  ),

  // ── 17. ARBALEST ─────────────────────────────────────────────
  makeTemplate(
    'arbalest_16',
    'Heavy arbalest crossbow with steel prod, windlass crank, and thick bolt.',
    {
      B: { name: 'heavy_stock', role: 'body' },
      P: { name: 'steel_prod', role: 'head' },
      W: { name: 'windlass_crank', role: 'accessory' },
      S: { name: 'heavy_string', role: 'arm' },
      A: { name: 'thick_bolt', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.metal,
      accessory: C.brass,
      arm: C.rope,
      belt: C.metal,
    },
    (g) => {
      // Steel prod — wide
      paintH(g, 'P', 3, 1, 14);
      paintH(g, 'P', 4, 2, 13);
      // Heavy string
      paintPoints(g, 'S', [[1, 4], [2, 5], [3, 5], [12, 5], [13, 5], [14, 4]]);
      // Stock
      paintRect(g, 'B', 6, 5, 9, 10);
      paintPoints(g, 'B', [[7, 4], [8, 4]]);
      // Thick bolt
      paintV(g, 'A', 7, 1, 4);
      paintV(g, 'A', 8, 1, 4);
      // Windlass crank
      paintRect(g, 'W', 10, 6, 12, 8);
      paintPoints(g, 'W', [[13, 7]]);
      // Butt stock
      paintRect(g, 'B', 6, 11, 9, 14);
    },
  ),

  // ── 18. BOLA ─────────────────────────────────────────────────
  makeTemplate(
    'bola_16',
    'Throwing bola with three weighted stones, braided cords, and leather center.',
    {
      S: { name: 'weighted_stones', role: 'body' },
      C: { name: 'braided_cords', role: 'head' },
      L: { name: 'leather_center', role: 'arm' },
      W: { name: 'cord_wraps', role: 'accessory' },
    },
    {
      body: C.darkMetal,
      head: C.rope,
      arm: C.leather,
      accessory: C.darkWood,
    },
    (g) => {
      // Three weighted stones
      paintRect(g, 'S', 1, 1, 3, 3);
      paintRect(g, 'S', 12, 1, 14, 3);
      paintRect(g, 'S', 6, 12, 9, 14);
      // Cords from center to stones
      paintPoints(g, 'C', [[4, 3], [5, 4], [6, 5]]);
      paintPoints(g, 'C', [[11, 3], [10, 4], [9, 5]]);
      paintPoints(g, 'C', [[7, 9], [7, 10], [7, 11]]);
      paintPoints(g, 'C', [[8, 9], [8, 10], [8, 11]]);
      // Leather center knot
      paintRect(g, 'L', 6, 6, 9, 8);
      // Cord wraps
      paintPoints(g, 'W', [[4, 4], [11, 4], [6, 11], [9, 11]]);
    },
  ),

  // ── 19. ATLATL ───────────────────────────────────────────────
  makeTemplate(
    'atlatl_16',
    'Primitive atlatl spear-thrower with carved hook, shaft, and dart.',
    {
      S: { name: 'atlatl_shaft', role: 'body' },
      H: { name: 'hook_end', role: 'head' },
      G: { name: 'grip', role: 'arm' },
      D: { name: 'dart_spear', role: 'accessory' },
      C: { name: 'carved_detail', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.bone,
      arm: C.leather,
      accessory: C.metal,
      belt: C.darkWood,
    },
    (g) => {
      // Hook end — top, cradles dart
      paintPoints(g, 'H', [[7, 3], [8, 3], [9, 3]]);
      paintPoints(g, 'H', [[9, 2]]);
      // Shaft — angled
      paintV(g, 'S', 7, 4, 13);
      paintV(g, 'S', 8, 4, 13);
      // Carved detail
      paintPoints(g, 'C', [[6, 6], [9, 7], [6, 8]]);
      // Grip — bottom
      paintRect(g, 'G', 6, 11, 9, 14);
      // Dart spear — resting on atlatl
      paintV(g, 'D', 11, 1, 8);
      paintPoints(g, 'D', [[10, 1], [12, 1]]);
    },
  ),

  // ── 20. THROWING NET ─────────────────────────────────────────
  makeTemplate(
    'net_throwing_16',
    'Weighted throwing net with mesh pattern, lead weights, and gathered handle.',
    {
      N: { name: 'mesh_net', role: 'body' },
      W: { name: 'lead_weights', role: 'head' },
      H: { name: 'gathered_handle', role: 'arm' },
      R: { name: 'rope_edge', role: 'accessory' },
      K: { name: 'knots', role: 'belt' },
    },
    {
      body: C.rope,
      head: C.darkMetal,
      arm: C.leather,
      accessory: C.rope,
      belt: C.darkWood,
    },
    (g) => {
      // Handle — gathered at top
      paintRect(g, 'H', 6, 1, 9, 3);
      // Net mesh spreading down — diamond pattern
      paintPoints(g, 'N', [[5, 4], [7, 4], [9, 4], [11, 4]]);
      paintPoints(g, 'N', [[4, 5], [6, 5], [8, 5], [10, 5], [12, 5]]);
      paintPoints(g, 'N', [[3, 6], [5, 6], [7, 6], [9, 6], [11, 6], [13, 6]]);
      paintPoints(g, 'N', [[3, 7], [5, 7], [7, 7], [9, 7], [11, 7], [13, 7]]);
      paintPoints(g, 'N', [[2, 8], [4, 8], [6, 8], [8, 8], [10, 8], [12, 8]]);
      paintPoints(g, 'N', [[2, 9], [4, 9], [6, 9], [8, 9], [10, 9], [12, 9]]);
      paintPoints(g, 'N', [[2, 10], [4, 10], [6, 10], [8, 10], [10, 10], [12, 10]]);
      paintPoints(g, 'N', [[3, 11], [5, 11], [7, 11], [9, 11], [11, 11]]);
      // Rope edge
      paintH(g, 'R', 12, 3, 12);
      // Lead weights on edge
      paintPoints(g, 'W', [[3, 12], [5, 12], [7, 12], [9, 12], [11, 12]]);
      paintPoints(g, 'W', [[4, 13], [6, 13], [8, 13], [10, 13]]);
      // Knots
      paintPoints(g, 'K', [[6, 3], [9, 3]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'weapons',
  exportNames: {
    templates: 'WEAPON_STAFF_BATCH3_TEMPLATES',
    schemes: 'WEAPON_STAFF_BATCH3_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
