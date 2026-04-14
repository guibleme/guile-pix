/**
 * Weapons, Staffs & Bows batch 5 — Exotic, Fantasy & Unique Weapons.
 * 20 original 16x16 templates — legendary and fantastical weapons.
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
  wood:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  darkWood:   { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  brass:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  gold:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  metal:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  darkMetal:  { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  red:        { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  blue:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  green:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  black:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  ivory:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
  leather:    { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  purple:     { shadow: '#442434', base: '#30346d', highlight: '#597dce' },
  bone:       { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  crystal:    { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
  fire:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  ice:        { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  shadow:     { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  holy:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  blood:      { shadow: '#140c1c', base: '#442434', highlight: '#d04648' },
  venom:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  teal:       { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  phoenix:    { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  dragon:     { shadow: '#346524', base: '#6daa2c', highlight: '#d04648' },
  demon:      { shadow: '#140c1c', base: '#d04648', highlight: '#d27d2c' },
  angel:      { shadow: '#597dce', base: '#deeed6', highlight: '#deeed6' },
  void:       { shadow: '#140c1c', base: '#30346d', highlight: '#442434' },
  star:       { shadow: '#597dce', base: '#dad45e', highlight: '#deeed6' },
  primal:     { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  chaos:      { shadow: '#442434', base: '#d04648', highlight: '#597dce' },
  order:      { shadow: '#30346d', base: '#8595a1', highlight: '#dad45e' },
  ethereal:   { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  cursed:     { shadow: '#140c1c', base: '#442434', highlight: '#d04648' },
  blessed:    { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  titan:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  fae:        { shadow: '#346524', base: '#6dc2ca', highlight: '#dad45e' },
};

const templates: CompactTemplate[] = [
  // ── 1. SOUL REAVER ───────────────────────────────────────────
  makeTemplate(
    'soul_reaver_16',
    'Legendary soul reaver sword with spectral blade, soul-gem guard, and wraithbound grip.',
    {
      B: { name: 'spectral_blade', role: 'body' },
      G: { name: 'soul_gem', role: 'head' },
      D: { name: 'ghost_wisps', role: 'accessory' },
      H: { name: 'wraith_grip', role: 'arm' },
      P: { name: 'soul_pommel', role: 'belt' },
    },
    {
      body: C.ethereal,
      head: C.teal,
      accessory: C.ice,
      arm: C.shadow,
      belt: C.teal,
    },
    (g) => {
      // Spectral blade — translucent feel
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      paintRect(g, 'B', 6, 2, 9, 7);
      // Ghost wisps from blade
      paintPoints(g, 'D', [[5, 2], [10, 3], [5, 5], [10, 6], [4, 4], [11, 5]]);
      // Soul gem in guard
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[7, 9], [8, 9]]);
      // Wraith grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Soul pommel
      paintRect(g, 'P', 6, 13, 9, 14);
    },
  ),

  // ── 2. VOID CLEAVER ──────────────────────────────────────────
  makeTemplate(
    'void_cleaver_16',
    'Dimension-rending void cleaver with space-torn blade, reality-crack guard, and abyssal grip.',
    {
      B: { name: 'torn_blade', role: 'body' },
      V: { name: 'void_cracks', role: 'head' },
      G: { name: 'reality_guard', role: 'accessory' },
      H: { name: 'abyssal_grip', role: 'arm' },
      P: { name: 'void_pommel', role: 'belt' },
    },
    {
      body: C.void,
      head: C.purple,
      accessory: C.darkMetal,
      arm: C.shadow,
      belt: C.void,
    },
    (g) => {
      // Torn blade — wide and jagged
      paintPoints(g, 'B', [[6, 1], [7, 1], [8, 1], [9, 1]]);
      paintRect(g, 'B', 5, 2, 10, 7);
      // Void cracks — energy lines
      paintPoints(g, 'V', [[4, 2], [11, 3], [4, 4], [11, 5], [4, 6], [11, 7]]);
      // Reality guard
      paintH(g, 'G', 8, 2, 13);
      paintPoints(g, 'G', [[2, 9], [13, 9]]);
      // Abyssal grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Void pommel
      paintRect(g, 'P', 6, 13, 9, 14);
    },
  ),

  // ── 3. PHOENIX BLADE ─────────────────────────────────────────
  makeTemplate(
    'phoenix_blade_16',
    'Reborn phoenix blade with flame-wreathed blade, feather guard, and eternal grip.',
    {
      B: { name: 'flame_blade', role: 'body' },
      F: { name: 'fire_wreath', role: 'head' },
      G: { name: 'feather_guard', role: 'accessory' },
      H: { name: 'eternal_grip', role: 'arm' },
      P: { name: 'ember_pommel', role: 'belt' },
    },
    {
      body: C.fire,
      head: C.phoenix,
      accessory: C.gold,
      arm: C.red,
      belt: C.fire,
    },
    (g) => {
      // Flame blade
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      paintRect(g, 'B', 6, 2, 9, 7);
      // Fire wreath — flames licking blade
      paintPoints(g, 'F', [[5, 1], [10, 1], [4, 3], [11, 3], [5, 5], [10, 5]]);
      paintPoints(g, 'F', [[5, 7], [10, 7]]);
      // Feather guard — wing-like
      paintH(g, 'G', 8, 2, 13);
      paintPoints(g, 'G', [[2, 9], [3, 9], [12, 9], [13, 9]]);
      // Eternal grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Ember pommel
      paintPoints(g, 'P', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),

  // ── 4. DRAGON FANG ───────────────────────────────────────────
  makeTemplate(
    'dragon_fang_16',
    'Draconic fang dagger with tooth-shaped blade, scale guard, and claw grip.',
    {
      B: { name: 'fang_blade', role: 'body' },
      T: { name: 'fang_tip', role: 'head' },
      G: { name: 'scale_guard', role: 'accessory' },
      H: { name: 'claw_grip', role: 'arm' },
      S: { name: 'scale_texture', role: 'belt' },
    },
    {
      body: C.ivory,
      head: C.ivory,
      accessory: C.dragon,
      arm: C.dragon,
      belt: C.green,
    },
    (g) => {
      // Fang tip — sharp
      paintPoints(g, 'T', [[7, 1], [8, 1]]);
      // Fang blade — tooth-like, curved
      paintPoints(g, 'B', [[6, 2], [7, 2], [8, 2], [9, 2]]);
      paintPoints(g, 'B', [[6, 3], [7, 3], [8, 3], [9, 3], [10, 3]]);
      paintPoints(g, 'B', [[6, 4], [7, 4], [8, 4], [9, 4]]);
      paintPoints(g, 'B', [[7, 5], [8, 5], [9, 5]]);
      paintPoints(g, 'B', [[7, 6], [8, 6]]);
      // Scale guard — dragon scales
      paintH(g, 'G', 7, 4, 11);
      paintPoints(g, 'G', [[4, 8], [11, 8]]);
      // Claw grip
      paintRect(g, 'H', 7, 8, 8, 12);
      // Scale texture on grip
      paintPoints(g, 'S', [[6, 9], [9, 10], [6, 11], [9, 12]]);
      // Pommel
      paintPoints(g, 'H', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),

  // ── 5. DEMON AXE ─────────────────────────────────────────────
  makeTemplate(
    'demon_axe_16',
    'Infernal demon axe with burning blade, horn-like lugs, and hellfire grip.',
    {
      B: { name: 'burning_blade', role: 'body' },
      H: { name: 'horn_lugs', role: 'head' },
      S: { name: 'hellfire_shaft', role: 'arm' },
      E: { name: 'eye_gem', role: 'accessory' },
      F: { name: 'spike_butt', role: 'belt' },
    },
    {
      body: C.demon,
      head: C.fire,
      arm: C.shadow,
      accessory: C.fire,
      belt: C.darkMetal,
    },
    (g) => {
      // Burning blade — axe head
      paintRect(g, 'B', 8, 1, 13, 5);
      paintPoints(g, 'B', [[13, 1], [14, 2], [14, 3], [14, 4], [13, 5]]);
      // Horn-like lugs
      paintPoints(g, 'H', [[14, 1], [14, 5], [13, 6]]);
      // Eye gem in axe head
      paintPoints(g, 'E', [[10, 3], [11, 3]]);
      // Shaft
      paintV(g, 'S', 7, 2, 13);
      paintV(g, 'S', 8, 6, 13);
      // Spike butt
      paintPoints(g, 'F', [[6, 14], [7, 14], [8, 14], [9, 14]]);
      paintPoints(g, 'F', [[7, 14], [8, 14]]);
    },
  ),

  // ── 6. ANGEL BOW ─────────────────────────────────────────────
  makeTemplate(
    'angel_bow_16',
    'Celestial angel bow with wing-shaped limbs, divine string, and halo grip.',
    {
      L: { name: 'wing_limbs', role: 'body' },
      S: { name: 'divine_string', role: 'head' },
      G: { name: 'halo_grip', role: 'arm' },
      F: { name: 'feather_tips', role: 'accessory' },
      A: { name: 'holy_arrow', role: 'belt' },
    },
    {
      body: C.angel,
      head: C.holy,
      arm: C.gold,
      accessory: C.ivory,
      belt: C.holy,
    },
    (g) => {
      // Upper wing limb
      paintPoints(g, 'L', [[5, 1], [4, 2], [3, 3], [3, 4], [4, 5], [5, 6]]);
      paintPoints(g, 'L', [[4, 3], [4, 4], [5, 5]]);
      // Lower wing limb
      paintPoints(g, 'L', [[5, 10], [4, 11], [3, 12], [3, 13], [4, 14]]);
      paintPoints(g, 'L', [[4, 12], [4, 13], [5, 14]]);
      // Feather tips
      paintPoints(g, 'F', [[2, 2], [2, 3], [2, 13], [2, 14]]);
      paintPoints(g, 'F', [[1, 3], [1, 13]]);
      // Divine string
      paintV(g, 'S', 5, 1, 6);
      paintV(g, 'S', 5, 10, 14);
      // Halo grip
      paintRect(g, 'G', 5, 7, 7, 9);
      // Holy arrow
      paintV(g, 'A', 9, 2, 14);
      paintPoints(g, 'A', [[8, 2], [10, 2]]);
    },
  ),

  // ── 7. LEVIATHAN TRIDENT ─────────────────────────────────────
  makeTemplate(
    'leviathan_trident_16',
    'Deep-sea leviathan trident with three barbed prongs, coral shaft, and pearl accent.',
    {
      P: { name: 'barbed_prongs', role: 'body' },
      B: { name: 'barb_tips', role: 'head' },
      S: { name: 'coral_shaft', role: 'arm' },
      A: { name: 'pearl_accent', role: 'accessory' },
      F: { name: 'sea_base', role: 'belt' },
    },
    {
      body: C.teal,
      head: C.ice,
      arm: C.blue,
      accessory: C.ivory,
      belt: C.teal,
    },
    (g) => {
      // Three barbed prongs
      paintPoints(g, 'P', [[4, 1], [5, 1], [7, 1], [8, 1], [10, 1], [11, 1]]);
      paintPoints(g, 'P', [[4, 2], [5, 2], [7, 2], [8, 2], [10, 2], [11, 2]]);
      paintPoints(g, 'P', [[5, 3], [7, 3], [8, 3], [10, 3]]);
      paintPoints(g, 'P', [[6, 4], [7, 4], [8, 4], [9, 4]]);
      // Barb tips
      paintPoints(g, 'B', [[3, 1], [6, 1], [9, 1], [12, 1]]);
      // Pearl accent
      paintPoints(g, 'A', [[7, 5], [8, 5]]);
      // Coral shaft
      paintV(g, 'S', 7, 6, 13);
      paintV(g, 'S', 8, 6, 13);
      // Sea base
      paintPoints(g, 'F', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 8. TITAN HAMMER ──────────────────────────────────────────
  makeTemplate(
    'titan_hammer_16',
    'Colossal titan hammer with massive stone head, iron bands, and thick grip.',
    {
      H: { name: 'stone_head', role: 'head' },
      B: { name: 'iron_bands', role: 'body' },
      S: { name: 'thick_shaft', role: 'arm' },
      G: { name: 'leather_grip', role: 'accessory' },
      F: { name: 'weighted_base', role: 'belt' },
    },
    {
      head: C.titan,
      body: C.darkMetal,
      arm: C.wood,
      accessory: C.leather,
      belt: C.darkMetal,
    },
    (g) => {
      // Massive stone head
      paintRect(g, 'H', 2, 1, 13, 5);
      // Iron bands
      paintH(g, 'B', 1, 3, 12);
      paintH(g, 'B', 5, 3, 12);
      paintV(g, 'B', 2, 2, 4);
      paintV(g, 'B', 13, 2, 4);
      // Thick shaft
      paintRect(g, 'S', 6, 6, 9, 12);
      // Leather grip
      paintPoints(g, 'G', [[5, 8], [10, 9], [5, 10], [10, 11]]);
      // Weighted base
      paintRect(g, 'F', 5, 13, 10, 14);
    },
  ),

  // ── 9. FAE RAPIER ────────────────────────────────────────────
  makeTemplate(
    'fae_rapier_16',
    'Delicate fae rapier with gossamer blade, butterfly guard, and vine grip.',
    {
      B: { name: 'gossamer_blade', role: 'body' },
      T: { name: 'blade_tip', role: 'head' },
      G: { name: 'butterfly_guard', role: 'accessory' },
      H: { name: 'vine_grip', role: 'arm' },
      P: { name: 'flower_pommel', role: 'belt' },
    },
    {
      body: C.fae,
      head: C.ivory,
      accessory: C.fae,
      arm: C.green,
      belt: C.fae,
    },
    (g) => {
      // Blade tip
      paintPoints(g, 'T', [[7, 1], [8, 1]]);
      // Gossamer blade — thin
      paintV(g, 'B', 7, 2, 7);
      paintV(g, 'B', 8, 2, 7);
      paintPoints(g, 'B', [[9, 3], [9, 5]]);
      // Butterfly guard — wing-like
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[3, 9], [4, 8], [4, 10], [11, 8], [11, 10], [12, 9]]);
      paintPoints(g, 'G', [[2, 9], [13, 9]]);
      // Vine grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Flower pommel
      paintPoints(g, 'P', [[6, 13], [7, 13], [8, 13], [9, 13]]);
      paintPoints(g, 'P', [[7, 14], [8, 14]]);
    },
  ),

  // ── 10. SHADOW SCYTHE ────────────────────────────────────────
  makeTemplate(
    'shadow_scythe_16',
    'Death shadow scythe with spectral blade, wraith shaft, and soul lantern.',
    {
      B: { name: 'spectral_blade', role: 'body' },
      E: { name: 'blade_edge', role: 'head' },
      S: { name: 'wraith_shaft', role: 'arm' },
      L: { name: 'soul_lantern', role: 'accessory' },
      F: { name: 'spike_base', role: 'belt' },
    },
    {
      body: C.shadow,
      head: C.purple,
      arm: C.darkWood,
      accessory: C.teal,
      belt: C.darkMetal,
    },
    (g) => {
      // Spectral blade — large curved
      paintPoints(g, 'B', [[2, 1], [3, 1], [4, 1]]);
      paintPoints(g, 'B', [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2]]);
      paintPoints(g, 'B', [[2, 3], [3, 3], [4, 3], [5, 3], [6, 3]]);
      paintPoints(g, 'B', [[4, 4], [5, 4], [6, 4], [7, 4]]);
      // Blade edge
      paintPoints(g, 'E', [[1, 1], [1, 2], [1, 3], [2, 4], [3, 4]]);
      // Soul lantern
      paintPoints(g, 'L', [[9, 4], [10, 4], [9, 5], [10, 5]]);
      // Wraith shaft
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Spike base
      paintPoints(g, 'F', [[7, 14], [8, 14]]);
      paintPoints(g, 'F', [[6, 13], [9, 13]]);
    },
  ),

  // ── 11. THUNDER LANCE ────────────────────────────────────────
  makeTemplate(
    'thunder_lance_16',
    'Electrified thunder lance with crackling tip, copper shaft, and storm grip.',
    {
      T: { name: 'crackling_tip', role: 'head' },
      S: { name: 'copper_shaft', role: 'body' },
      L: { name: 'lightning_arcs', role: 'accessory' },
      G: { name: 'storm_grip', role: 'arm' },
      B: { name: 'storm_base', role: 'belt' },
    },
    {
      head: C.gold,
      body: C.brass,
      accessory: C.gold,
      arm: C.blue,
      belt: C.darkMetal,
    },
    (g) => {
      // Crackling tip — pointed
      paintPoints(g, 'T', [[7, 1], [8, 1]]);
      paintPoints(g, 'T', [[6, 2], [7, 2], [8, 2], [9, 2]]);
      paintPoints(g, 'T', [[7, 3], [8, 3]]);
      // Lightning arcs
      paintPoints(g, 'L', [[5, 1], [10, 1], [5, 3], [10, 3]]);
      // Copper shaft
      paintV(g, 'S', 7, 4, 13);
      paintV(g, 'S', 8, 4, 13);
      // Storm grip
      paintPoints(g, 'G', [[6, 8], [9, 8], [6, 9], [9, 9], [6, 10], [9, 10]]);
      // Storm base
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 12. ICE GLAIVE ───────────────────────────────────────────
  makeTemplate(
    'ice_glaive_16',
    'Frozen ice glaive with glacial blade, frost shaft, and icicle guard.',
    {
      B: { name: 'glacial_blade', role: 'body' },
      E: { name: 'frost_edge', role: 'head' },
      S: { name: 'frost_shaft', role: 'arm' },
      I: { name: 'icicle_guard', role: 'accessory' },
      F: { name: 'frost_base', role: 'belt' },
    },
    {
      body: C.ice,
      head: C.ivory,
      arm: C.blue,
      accessory: C.ice,
      belt: C.blue,
    },
    (g) => {
      // Glacial blade — large curved
      paintPoints(g, 'B', [[8, 1], [9, 1]]);
      paintRect(g, 'B', 7, 2, 10, 5);
      paintPoints(g, 'B', [[8, 6], [9, 6]]);
      // Frost edge
      paintPoints(g, 'E', [[11, 2], [11, 3], [11, 4], [11, 5], [10, 6]]);
      // Icicle guard — jutting ice
      paintPoints(g, 'I', [[5, 6], [6, 6], [10, 6], [11, 6]]);
      paintPoints(g, 'I', [[4, 7], [11, 7]]);
      // Frost shaft
      paintV(g, 'S', 7, 7, 13);
      paintV(g, 'S', 8, 7, 13);
      // Frost base
      paintPoints(g, 'F', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 13. FIRE WHIP ────────────────────────────────────────────
  makeTemplate(
    'fire_whip_16',
    'Infernal fire whip with burning lash, chain handle, and ember core.',
    {
      L: { name: 'burning_lash', role: 'body' },
      F: { name: 'flame_tips', role: 'head' },
      H: { name: 'chain_handle', role: 'arm' },
      E: { name: 'ember_core', role: 'accessory' },
      B: { name: 'pommel', role: 'belt' },
    },
    {
      body: C.fire,
      head: C.phoenix,
      arm: C.darkMetal,
      accessory: C.fire,
      belt: C.darkMetal,
    },
    (g) => {
      // Burning lash — curved whip
      paintPoints(g, 'L', [[3, 1], [4, 2], [5, 3], [6, 4]]);
      paintPoints(g, 'L', [[4, 1], [5, 2], [6, 3], [7, 4]]);
      paintPoints(g, 'L', [[7, 5], [8, 5], [8, 6], [9, 6]]);
      paintPoints(g, 'L', [[9, 7], [10, 7], [10, 8]]);
      // Flame tips — at end
      paintPoints(g, 'F', [[2, 1], [1, 1], [2, 2], [1, 2]]);
      // Ember core along lash
      paintPoints(g, 'E', [[5, 2], [7, 4], [9, 6]]);
      // Chain handle
      paintRect(g, 'H', 10, 9, 11, 13);
      paintPoints(g, 'H', [[9, 9], [12, 9]]);
      // Pommel
      paintPoints(g, 'B', [[9, 14], [10, 14], [11, 14], [12, 14]]);
    },
  ),

  // ── 14. CHAOS STAFF ──────────────────────────────────────────
  makeTemplate(
    'chaos_staff_16',
    'Reality-warping chaos staff with shifting orb, fractured shaft, and unstable aura.',
    {
      S: { name: 'fractured_shaft', role: 'body' },
      O: { name: 'shifting_orb', role: 'head' },
      A: { name: 'unstable_aura', role: 'accessory' },
      R: { name: 'reality_cracks', role: 'arm' },
      B: { name: 'chaos_base', role: 'belt' },
    },
    {
      body: C.chaos,
      head: C.chaos,
      accessory: C.fire,
      arm: C.purple,
      belt: C.shadow,
    },
    (g) => {
      // Shifting orb — irregular shape
      paintRect(g, 'O', 5, 1, 10, 4);
      paintPoints(g, 'O', [[7, 5], [8, 5]]);
      // Unstable aura
      paintPoints(g, 'A', [[4, 1], [11, 1], [4, 4], [11, 4], [6, 5], [9, 5]]);
      // Fractured shaft — slightly offset
      paintV(g, 'S', 7, 6, 12);
      paintV(g, 'S', 8, 6, 12);
      // Reality cracks
      paintPoints(g, 'R', [[6, 7], [9, 8], [6, 9], [9, 10], [6, 11]]);
      // Chaos base
      paintRect(g, 'B', 5, 13, 10, 14);
    },
  ),

  // ── 15. ORDER SHIELD ─────────────────────────────────────────
  makeTemplate(
    'order_shield_16',
    'Shield of Order with symmetrical design, law runes, and balanced frame.',
    {
      F: { name: 'shield_frame', role: 'body' },
      C: { name: 'center_emblem', role: 'head' },
      R: { name: 'law_runes', role: 'accessory' },
      E: { name: 'edge_trim', role: 'arm' },
      H: { name: 'grip_strap', role: 'belt' },
    },
    {
      body: C.order,
      head: C.gold,
      accessory: C.holy,
      arm: C.metal,
      belt: C.leather,
    },
    (g) => {
      // Shield shape — kite/heater
      paintH(g, 'F', 2, 4, 11);
      paintRect(g, 'F', 3, 3, 12, 11);
      paintH(g, 'F', 12, 5, 10);
      paintH(g, 'F', 13, 6, 9);
      paintPoints(g, 'F', [[7, 14], [8, 14]]);
      // Edge trim
      paintH(g, 'E', 2, 4, 11);
      paintV(g, 'E', 3, 3, 11);
      paintV(g, 'E', 12, 3, 11);
      paintH(g, 'E', 13, 6, 9);
      // Center emblem — balance scales
      paintRect(g, 'C', 6, 5, 9, 9);
      // Law runes
      paintPoints(g, 'R', [[5, 4], [10, 4], [5, 10], [10, 10]]);
      paintPoints(g, 'R', [[4, 7], [11, 7]]);
      // Grip strap — back
      paintPoints(g, 'H', [[6, 11], [9, 11], [7, 12], [8, 12]]);
    },
  ),

  // ── 16. CURSED DAGGER ────────────────────────────────────────
  makeTemplate(
    'cursed_dagger_16',
    'Cursed dagger with bleeding blade, eye pommel, and dark whisper grip.',
    {
      B: { name: 'bleeding_blade', role: 'body' },
      T: { name: 'blade_tip', role: 'head' },
      G: { name: 'dark_guard', role: 'accessory' },
      H: { name: 'whisper_grip', role: 'arm' },
      E: { name: 'eye_pommel', role: 'belt' },
    },
    {
      body: C.cursed,
      head: C.blood,
      accessory: C.shadow,
      arm: C.shadow,
      belt: C.red,
    },
    (g) => {
      // Blade tip
      paintPoints(g, 'T', [[7, 1], [8, 1]]);
      // Bleeding blade
      paintRect(g, 'B', 6, 2, 9, 6);
      // Blood drips
      paintPoints(g, 'T', [[5, 4], [10, 5]]);
      // Dark guard
      paintH(g, 'G', 7, 4, 11);
      // Whisper grip
      paintRect(g, 'H', 7, 8, 8, 12);
      // Eye pommel — watchful eye
      paintRect(g, 'E', 6, 13, 9, 14);
      paintPoints(g, 'E', [[7, 13], [8, 13]]);
    },
  ),

  // ── 17. BLESSED MACE ─────────────────────────────────────────
  makeTemplate(
    'blessed_mace_16',
    'Holy blessed mace with radiant head, golden shaft, and prayer-wrapped grip.',
    {
      H: { name: 'radiant_head', role: 'head' },
      G: { name: 'divine_glow', role: 'body' },
      S: { name: 'golden_shaft', role: 'arm' },
      W: { name: 'prayer_wrap', role: 'accessory' },
      B: { name: 'holy_base', role: 'belt' },
    },
    {
      head: C.blessed,
      body: C.holy,
      arm: C.brass,
      accessory: C.ivory,
      belt: C.gold,
    },
    (g) => {
      // Radiant head — flanged with glow
      paintRect(g, 'H', 5, 1, 10, 5);
      // Divine glow
      paintPoints(g, 'G', [[4, 2], [11, 2], [4, 4], [11, 4]]);
      paintPoints(g, 'G', [[3, 3], [12, 3]]);
      // Flanges
      paintPoints(g, 'H', [[4, 1], [11, 1], [4, 5], [11, 5]]);
      // Golden shaft
      paintV(g, 'S', 7, 6, 12);
      paintV(g, 'S', 8, 6, 12);
      // Prayer wrap
      paintPoints(g, 'W', [[6, 8], [9, 9], [6, 10], [9, 11]]);
      // Holy base
      paintPoints(g, 'B', [[6, 13], [7, 13], [8, 13], [9, 13]]);
      paintPoints(g, 'B', [[7, 14], [8, 14]]);
    },
  ),

  // ── 18. PRIMAL CLUB ──────────────────────────────────────────
  makeTemplate(
    'primal_club_16',
    'Primitive primal club with heavy stone head, rough wood shaft, and bone studs.',
    {
      H: { name: 'stone_head', role: 'head' },
      B: { name: 'bone_studs', role: 'body' },
      S: { name: 'rough_shaft', role: 'arm' },
      W: { name: 'hide_wrap', role: 'accessory' },
      F: { name: 'blunt_end', role: 'belt' },
    },
    {
      head: C.darkMetal,
      body: C.bone,
      arm: C.primal,
      accessory: C.leather,
      belt: C.primal,
    },
    (g) => {
      // Heavy stone head — irregular
      paintRect(g, 'H', 4, 1, 11, 4);
      paintPoints(g, 'H', [[3, 2], [12, 3], [5, 5], [10, 5]]);
      // Bone studs
      paintPoints(g, 'B', [[5, 1], [8, 1], [11, 1]]);
      paintPoints(g, 'B', [[4, 3], [7, 3], [10, 3]]);
      // Rough shaft
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Hide wrap
      paintPoints(g, 'W', [[6, 7], [9, 8], [6, 9], [9, 10]]);
      // Blunt end
      paintPoints(g, 'F', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 19. ETHEREAL BLADE ───────────────────────────────────────
  makeTemplate(
    'ethereal_blade_16',
    'Ghostly ethereal blade with translucent sword, phase guard, and spirit grip.',
    {
      B: { name: 'translucent_blade', role: 'body' },
      P: { name: 'phase_glow', role: 'head' },
      G: { name: 'phase_guard', role: 'accessory' },
      H: { name: 'spirit_grip', role: 'arm' },
      S: { name: 'spirit_pommel', role: 'belt' },
    },
    {
      body: C.ethereal,
      head: C.ivory,
      accessory: C.teal,
      arm: C.blue,
      belt: C.ethereal,
    },
    (g) => {
      // Translucent blade
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      paintRect(g, 'B', 6, 2, 9, 7);
      // Phase glow — shimmering edges
      paintPoints(g, 'P', [[5, 2], [10, 3], [5, 4], [10, 5], [5, 6], [10, 7]]);
      // Phase guard
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[3, 9], [12, 9]]);
      // Spirit grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Spirit pommel
      paintPoints(g, 'S', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),

  // ── 20. STARFALL BOW ─────────────────────────────────────────
  makeTemplate(
    'starfall_bow_16',
    'Celestial starfall bow with constellation limbs, stardust string, and meteor grip.',
    {
      L: { name: 'constellation_limbs', role: 'body' },
      S: { name: 'stardust_string', role: 'head' },
      G: { name: 'meteor_grip', role: 'arm' },
      T: { name: 'star_tips', role: 'accessory' },
      A: { name: 'star_arrow', role: 'belt' },
    },
    {
      body: C.star,
      head: C.gold,
      arm: C.purple,
      accessory: C.star,
      belt: C.gold,
    },
    (g) => {
      // Upper constellation limb
      paintPoints(g, 'L', [[5, 1], [4, 2], [3, 3], [3, 4], [4, 5], [5, 6]]);
      paintPoints(g, 'L', [[4, 3], [4, 4], [5, 5]]);
      // Lower constellation limb
      paintPoints(g, 'L', [[5, 10], [4, 11], [3, 12], [3, 13], [4, 14]]);
      paintPoints(g, 'L', [[4, 12], [4, 13], [5, 14]]);
      // Star tips
      paintPoints(g, 'T', [[2, 1], [6, 1], [2, 14], [6, 14]]);
      paintPoints(g, 'T', [[2, 3], [2, 13]]);
      // Stardust string
      paintV(g, 'S', 5, 1, 6);
      paintV(g, 'S', 5, 10, 14);
      // Meteor grip
      paintRect(g, 'G', 5, 7, 7, 9);
      // Star arrow
      paintV(g, 'A', 9, 2, 14);
      paintPoints(g, 'A', [[8, 2], [10, 2]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'weapons',
  exportNames: {
    templates: 'WEAPON_STAFF_BATCH5_TEMPLATES',
    schemes: 'WEAPON_STAFF_BATCH5_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
