/**
 * Weapons, Staffs & Bows batch 1 — Staffs & Magical Weapons.
 * 20 original 16x16 templates — diverse magical staffs, scepters, wands, and rods.
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
  purple:    { shadow: '#442434', base: '#30346d', highlight: '#597dce' },
  teal:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  bone:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  crystal:   { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
  fire:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  ice:       { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  poison:    { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  shadow:    { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  holy:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  blood:     { shadow: '#140c1c', base: '#442434', highlight: '#d04648' },
  coral:     { shadow: '#854c30', base: '#d2aa99', highlight: '#6dc2ca' },
  ember:     { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
  storm:     { shadow: '#4e4a4e', base: '#597dce', highlight: '#dad45e' },
};

const templates: CompactTemplate[] = [
  // ── 1. NATURE STAFF ──────────────────────────────────────────
  makeTemplate(
    'nature_staff_16',
    'Druidic nature staff with living branch top, leaf crown, and wooden shaft.',
    {
      S: { name: 'wooden_shaft', role: 'body' },
      T: { name: 'branch_top', role: 'head' },
      L: { name: 'leaves', role: 'accessory' },
      W: { name: 'vine_wrap', role: 'arm' },
      R: { name: 'root_base', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.darkWood,
      accessory: C.green,
      arm: C.green,
      belt: C.darkWood,
    },
    (g) => {
      // Branch top — forked
      paintPoints(g, 'T', [[6, 1], [9, 1], [5, 2], [7, 2], [8, 2], [10, 2]]);
      paintPoints(g, 'T', [[6, 3], [9, 3]]);
      // Leaves
      paintPoints(g, 'L', [[5, 1], [10, 1], [4, 2], [11, 2], [5, 3], [10, 3]]);
      paintPoints(g, 'L', [[7, 3], [8, 3]]);
      // Shaft
      paintV(g, 'S', 7, 4, 13);
      paintV(g, 'S', 8, 4, 13);
      // Vine wrap
      paintPoints(g, 'W', [[6, 6], [9, 7], [6, 8], [9, 9]]);
      // Root base
      paintPoints(g, 'R', [[6, 14], [7, 14], [8, 14], [9, 14]]);
      paintPoints(g, 'R', [[5, 13], [10, 13]]);
    },
  ),

  // ── 2. THUNDER STAFF ─────────────────────────────────────────
  makeTemplate(
    'thunder_staff_16',
    'Storm staff with lightning bolt crystal top, metal bands, and dark shaft.',
    {
      S: { name: 'dark_shaft', role: 'body' },
      C: { name: 'lightning_crystal', role: 'head' },
      B: { name: 'metal_bands', role: 'accessory' },
      G: { name: 'glow_aura', role: 'arm' },
      F: { name: 'foot_cap', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.storm,
      accessory: C.metal,
      arm: C.blue,
      belt: C.metal,
    },
    (g) => {
      // Lightning crystal top
      paintPoints(g, 'C', [[8, 1], [7, 2], [8, 2], [9, 2]]);
      paintPoints(g, 'C', [[6, 3], [7, 3], [8, 3], [9, 3], [10, 3]]);
      paintPoints(g, 'C', [[7, 4], [8, 4], [9, 4]]);
      // Glow aura around crystal
      paintPoints(g, 'G', [[5, 2], [11, 2], [5, 4], [11, 3]]);
      // Shaft
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Metal bands
      paintPoints(g, 'B', [[6, 5], [9, 5], [6, 8], [9, 8], [6, 11], [9, 11]]);
      // Foot cap
      paintPoints(g, 'F', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 3. NECRO STAFF ───────────────────────────────────────────
  makeTemplate(
    'necro_staff_16',
    'Necromancer staff topped with a skull, dark bone shaft, and cursed wrappings.',
    {
      S: { name: 'bone_shaft', role: 'body' },
      K: { name: 'skull_top', role: 'head' },
      E: { name: 'skull_eyes', role: 'accessory' },
      W: { name: 'dark_wrapping', role: 'arm' },
      B: { name: 'base_spike', role: 'belt' },
    },
    {
      body: C.bone,
      head: C.ivory,
      accessory: C.purple,
      arm: C.shadow,
      belt: C.darkMetal,
    },
    (g) => {
      // Skull top
      paintRect(g, 'K', 6, 1, 9, 3);
      paintPoints(g, 'K', [[7, 4], [8, 4]]);
      // Skull eyes
      paintPoints(g, 'E', [[6, 2], [9, 2]]);
      // Skull jaw
      paintPoints(g, 'K', [[7, 5], [8, 5]]);
      // Shaft
      paintV(g, 'S', 7, 6, 12);
      paintV(g, 'S', 8, 6, 12);
      // Dark wrapping
      paintPoints(g, 'W', [[6, 7], [9, 8], [6, 9], [9, 10], [6, 11]]);
      // Base spike
      paintPoints(g, 'B', [[7, 13], [8, 13], [7, 14], [8, 14]]);
      paintPoints(g, 'B', [[6, 13], [9, 13]]);
    },
  ),

  // ── 4. CRYSTAL STAFF ─────────────────────────────────────────
  makeTemplate(
    'crystal_staff_16',
    'Elegant crystal staff with a faceted gem top, silver shaft, and prong setting.',
    {
      S: { name: 'silver_shaft', role: 'body' },
      G: { name: 'crystal_gem', role: 'head' },
      P: { name: 'prong_setting', role: 'accessory' },
      R: { name: 'silver_rings', role: 'arm' },
      B: { name: 'crystal_base', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.crystal,
      accessory: C.metal,
      arm: C.brass,
      belt: C.crystal,
    },
    (g) => {
      // Crystal gem — faceted diamond shape
      paintPoints(g, 'G', [[7, 1], [8, 1]]);
      paintPoints(g, 'G', [[6, 2], [7, 2], [8, 2], [9, 2]]);
      paintPoints(g, 'G', [[6, 3], [7, 3], [8, 3], [9, 3]]);
      paintPoints(g, 'G', [[7, 4], [8, 4]]);
      // Prong setting
      paintPoints(g, 'P', [[5, 3], [10, 3], [5, 4], [10, 4], [6, 5], [9, 5]]);
      // Silver shaft
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Silver rings
      paintPoints(g, 'R', [[6, 7], [9, 7], [6, 10], [9, 10]]);
      // Crystal base cap
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 5. FIRE STAFF ────────────────────────────────────────────
  makeTemplate(
    'fire_staff_16',
    'Blazing fire staff with flame orb top, charred shaft, and ember wraps.',
    {
      S: { name: 'charred_shaft', role: 'body' },
      F: { name: 'flame_orb', role: 'head' },
      E: { name: 'ember_sparks', role: 'accessory' },
      W: { name: 'ember_wraps', role: 'arm' },
      B: { name: 'ash_base', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.fire,
      accessory: C.gold,
      arm: C.ember,
      belt: C.darkMetal,
    },
    (g) => {
      // Flame orb top — flickering fire shape
      paintPoints(g, 'F', [[7, 1], [8, 1]]);
      paintPoints(g, 'F', [[6, 2], [7, 2], [8, 2], [9, 2]]);
      paintPoints(g, 'F', [[6, 3], [7, 3], [8, 3], [9, 3]]);
      paintPoints(g, 'F', [[7, 4], [8, 4]]);
      // Ember sparks
      paintPoints(g, 'E', [[5, 1], [10, 1], [5, 3], [10, 2]]);
      // Shaft
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Ember wraps
      paintPoints(g, 'W', [[6, 6], [9, 7], [6, 8], [9, 9]]);
      // Ash base
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 6. SHADOW STAFF ──────────────────────────────────────────
  makeTemplate(
    'shadow_staff_16',
    'Dark shadow staff with void orb, smoky tendrils, and obsidian shaft.',
    {
      S: { name: 'obsidian_shaft', role: 'body' },
      V: { name: 'void_orb', role: 'head' },
      T: { name: 'tendrils', role: 'accessory' },
      R: { name: 'dark_rings', role: 'arm' },
      B: { name: 'spike_base', role: 'belt' },
    },
    {
      body: C.shadow,
      head: C.purple,
      accessory: C.shadow,
      arm: C.darkMetal,
      belt: C.black,
    },
    (g) => {
      // Void orb
      paintRect(g, 'V', 6, 1, 9, 4);
      // Tendrils from orb
      paintPoints(g, 'T', [[5, 2], [10, 2], [4, 3], [11, 3], [5, 4], [10, 4]]);
      // Shaft
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Dark rings
      paintPoints(g, 'R', [[6, 5], [9, 5], [6, 9], [9, 9]]);
      // Spike base
      paintPoints(g, 'B', [[7, 14], [8, 14]]);
      paintPoints(g, 'B', [[6, 13], [9, 13]]);
    },
  ),

  // ── 7. HOLY STAFF ────────────────────────────────────────────
  makeTemplate(
    'holy_staff_16',
    'Radiant holy staff with sunburst top, gilded shaft, and divine glow.',
    {
      S: { name: 'gilded_shaft', role: 'body' },
      U: { name: 'sunburst', role: 'head' },
      R: { name: 'rays', role: 'accessory' },
      G: { name: 'gold_bands', role: 'arm' },
      B: { name: 'holy_base', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.holy,
      accessory: C.gold,
      arm: C.gold,
      belt: C.brass,
    },
    (g) => {
      // Sunburst center
      paintRect(g, 'U', 6, 2, 9, 4);
      paintPoints(g, 'U', [[7, 1], [8, 1]]);
      // Rays extending outward
      paintPoints(g, 'R', [[5, 1], [10, 1], [4, 3], [11, 3], [5, 5], [10, 5]]);
      paintPoints(g, 'R', [[7, 5], [8, 5]]);
      // Shaft
      paintV(g, 'S', 7, 6, 13);
      paintV(g, 'S', 8, 6, 13);
      // Gold bands
      paintPoints(g, 'G', [[6, 7], [9, 7], [6, 10], [9, 10]]);
      // Holy base
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 8. POISON STAFF ──────────────────────────────────────────
  makeTemplate(
    'poison_staff_16',
    'Venomous staff with toxic orb, dripping venom, and gnarled shaft.',
    {
      S: { name: 'gnarled_shaft', role: 'body' },
      O: { name: 'toxic_orb', role: 'head' },
      D: { name: 'venom_drips', role: 'accessory' },
      W: { name: 'fungus_growth', role: 'arm' },
      B: { name: 'root_base', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.poison,
      accessory: C.green,
      arm: C.poison,
      belt: C.darkWood,
    },
    (g) => {
      // Toxic orb
      paintRect(g, 'O', 6, 1, 9, 3);
      paintPoints(g, 'O', [[7, 4], [8, 4]]);
      // Venom drips
      paintPoints(g, 'D', [[5, 3], [10, 3], [6, 5], [9, 5]]);
      paintPoints(g, 'D', [[5, 4], [10, 4]]);
      // Shaft
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Fungus growth
      paintPoints(g, 'W', [[6, 7], [9, 8], [6, 10], [9, 11]]);
      // Root base
      paintPoints(g, 'B', [[5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14]]);
    },
  ),

  // ── 9. WIND STAFF ────────────────────────────────────────────
  makeTemplate(
    'wind_staff_16',
    'Aeromancer wind staff with swirl crest, feathered shaft, and light frame.',
    {
      S: { name: 'light_shaft', role: 'body' },
      W: { name: 'swirl_crest', role: 'head' },
      F: { name: 'feathers', role: 'accessory' },
      R: { name: 'ribbon_wrap', role: 'arm' },
      B: { name: 'tapered_base', role: 'belt' },
    },
    {
      body: C.ivory,
      head: C.teal,
      accessory: C.blue,
      arm: C.teal,
      belt: C.metal,
    },
    (g) => {
      // Swirl crest — spiral wind shape
      paintPoints(g, 'W', [[8, 1], [9, 1], [10, 2]]);
      paintPoints(g, 'W', [[6, 2], [7, 2], [8, 2], [9, 2]]);
      paintPoints(g, 'W', [[6, 3], [7, 3], [8, 3]]);
      paintPoints(g, 'W', [[7, 4], [8, 4]]);
      // Feathers
      paintPoints(g, 'F', [[5, 1], [11, 1], [5, 3], [10, 3]]);
      // Shaft
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Ribbon wrap
      paintPoints(g, 'R', [[6, 6], [9, 7], [6, 8], [9, 9]]);
      // Tapered base
      paintPoints(g, 'B', [[7, 14], [8, 14]]);
    },
  ),

  // ── 10. BLOOD STAFF ──────────────────────────────────────────
  makeTemplate(
    'blood_staff_16',
    'Hemomancer blood staff with crimson gem, veined shaft, and dark thorns.',
    {
      S: { name: 'veined_shaft', role: 'body' },
      G: { name: 'crimson_gem', role: 'head' },
      T: { name: 'thorns', role: 'accessory' },
      V: { name: 'vein_lines', role: 'arm' },
      B: { name: 'dark_base', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.red,
      accessory: C.blood,
      arm: C.red,
      belt: C.black,
    },
    (g) => {
      // Crimson gem — teardrop shape
      paintPoints(g, 'G', [[7, 1], [8, 1]]);
      paintRect(g, 'G', 6, 2, 9, 4);
      paintPoints(g, 'G', [[7, 5], [8, 5]]);
      // Thorns around gem
      paintPoints(g, 'T', [[5, 2], [10, 2], [5, 4], [10, 4]]);
      // Shaft
      paintV(g, 'S', 7, 6, 13);
      paintV(g, 'S', 8, 6, 13);
      // Vein lines
      paintPoints(g, 'V', [[6, 7], [9, 8], [6, 10], [9, 11]]);
      // Dark base
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 11. ARCANE SCEPTER ───────────────────────────────────────
  makeTemplate(
    'arcane_scepter_16',
    'Ornate arcane scepter with floating rune gem, gold filigree, and jeweled grip.',
    {
      S: { name: 'gold_shaft', role: 'body' },
      G: { name: 'rune_gem', role: 'head' },
      F: { name: 'filigree', role: 'accessory' },
      J: { name: 'jeweled_grip', role: 'arm' },
      B: { name: 'ornate_base', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.purple,
      accessory: C.gold,
      arm: C.red,
      belt: C.gold,
    },
    (g) => {
      // Rune gem — hovering above
      paintRect(g, 'G', 6, 1, 9, 3);
      // Filigree prongs holding gem
      paintPoints(g, 'F', [[5, 3], [10, 3], [6, 4], [9, 4]]);
      paintPoints(g, 'F', [[5, 5], [10, 5]]);
      // Shaft
      paintV(g, 'S', 7, 5, 12);
      paintV(g, 'S', 8, 5, 12);
      // Jeweled grip
      paintPoints(g, 'J', [[6, 8], [9, 8], [6, 10], [9, 10]]);
      // Ornate base — wider pommel
      paintRect(g, 'B', 5, 13, 10, 14);
    },
  ),

  // ── 12. DRUID BRANCH ─────────────────────────────────────────
  makeTemplate(
    'druid_branch_16',
    'Gnarled druid branch with living blossoms, moss patches, and twisted wood.',
    {
      S: { name: 'twisted_wood', role: 'body' },
      B: { name: 'blossoms', role: 'head' },
      M: { name: 'moss_patches', role: 'accessory' },
      K: { name: 'bark_knots', role: 'arm' },
      R: { name: 'root_end', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.green,
      accessory: C.poison,
      arm: C.darkWood,
      belt: C.darkWood,
    },
    (g) => {
      // Blossoms at top — spreading branches
      paintPoints(g, 'B', [[5, 1], [8, 1], [10, 1]]);
      paintPoints(g, 'B', [[4, 2], [6, 2], [9, 2], [11, 2]]);
      paintPoints(g, 'B', [[5, 3], [7, 3], [10, 3]]);
      // Branching wood
      paintPoints(g, 'S', [[6, 3], [8, 3], [9, 3]]);
      paintPoints(g, 'S', [[7, 4], [8, 4]]);
      // Main shaft — slightly crooked
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Moss patches
      paintPoints(g, 'M', [[6, 6], [9, 7], [6, 9]]);
      // Bark knots
      paintPoints(g, 'K', [[6, 5], [9, 10], [6, 12]]);
      // Root end
      paintPoints(g, 'R', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 13. RUNIC ROD ────────────────────────────────────────────
  makeTemplate(
    'runic_rod_16',
    'Short runic rod with glowing runes etched along the shaft and crystal tip.',
    {
      S: { name: 'stone_shaft', role: 'body' },
      T: { name: 'crystal_tip', role: 'head' },
      R: { name: 'glowing_runes', role: 'accessory' },
      B: { name: 'metal_bands', role: 'arm' },
      C: { name: 'cap_base', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.crystal,
      accessory: C.teal,
      arm: C.darkMetal,
      belt: C.darkMetal,
    },
    (g) => {
      // Crystal tip
      paintPoints(g, 'T', [[7, 1], [8, 1]]);
      paintPoints(g, 'T', [[6, 2], [7, 2], [8, 2], [9, 2]]);
      paintPoints(g, 'T', [[7, 3], [8, 3]]);
      // Metal band below tip
      paintPoints(g, 'B', [[6, 4], [7, 4], [8, 4], [9, 4]]);
      // Stone shaft
      paintV(g, 'S', 7, 5, 12);
      paintV(g, 'S', 8, 5, 12);
      // Glowing runes along shaft
      paintPoints(g, 'R', [[6, 6], [9, 7], [6, 8], [9, 9], [6, 10], [9, 11]]);
      // Cap base
      paintPoints(g, 'C', [[6, 13], [7, 13], [8, 13], [9, 13]]);
      paintPoints(g, 'C', [[7, 14], [8, 14]]);
    },
  ),

  // ── 14. VOID WAND ────────────────────────────────────────────
  makeTemplate(
    'void_wand_16',
    'Short void wand with dark energy tip, sleek handle, and anti-magic aura.',
    {
      S: { name: 'sleek_handle', role: 'body' },
      V: { name: 'void_tip', role: 'head' },
      A: { name: 'anti_aura', role: 'accessory' },
      G: { name: 'grip_wrap', role: 'arm' },
      B: { name: 'pommel_cap', role: 'belt' },
    },
    {
      body: C.darkMetal,
      head: C.purple,
      accessory: C.shadow,
      arm: C.leather,
      belt: C.metal,
    },
    (g) => {
      // Void tip — small dark orb
      paintPoints(g, 'V', [[7, 2], [8, 2]]);
      paintPoints(g, 'V', [[7, 3], [8, 3]]);
      // Anti-magic aura
      paintPoints(g, 'A', [[6, 1], [9, 1], [5, 3], [10, 3], [6, 4], [9, 4]]);
      // Handle shaft — shorter than staff
      paintV(g, 'S', 7, 4, 12);
      paintV(g, 'S', 8, 4, 12);
      // Grip wrap
      paintPoints(g, 'G', [[6, 8], [9, 8], [6, 9], [9, 9], [6, 10], [9, 10]]);
      // Pommel cap
      paintPoints(g, 'B', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),

  // ── 15. SUN SCEPTER ──────────────────────────────────────────
  makeTemplate(
    'sun_scepter_16',
    'Radiant sun scepter with solar disc top, gilded shaft, and warm glow.',
    {
      S: { name: 'gilded_shaft', role: 'body' },
      D: { name: 'solar_disc', role: 'head' },
      R: { name: 'sun_rays', role: 'accessory' },
      G: { name: 'gold_grip', role: 'arm' },
      B: { name: 'jewel_base', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.gold,
      accessory: C.fire,
      arm: C.gold,
      belt: C.red,
    },
    (g) => {
      // Solar disc — circular
      paintRect(g, 'D', 6, 2, 9, 4);
      paintPoints(g, 'D', [[7, 1], [8, 1], [7, 5], [8, 5]]);
      // Sun rays
      paintPoints(g, 'R', [[5, 1], [10, 1], [4, 3], [11, 3], [5, 5], [10, 5]]);
      // Shaft
      paintV(g, 'S', 7, 6, 12);
      paintV(g, 'S', 8, 6, 12);
      // Gold grip
      paintPoints(g, 'G', [[6, 8], [9, 8], [6, 9], [9, 9], [6, 10], [9, 10]]);
      // Jewel base
      paintPoints(g, 'B', [[6, 13], [7, 13], [8, 13], [9, 13]]);
      paintPoints(g, 'B', [[7, 14], [8, 14]]);
    },
  ),

  // ── 16. MOON ROD ─────────────────────────────────────────────
  makeTemplate(
    'moon_rod_16',
    'Crescent moon rod with lunar crescent top, silver shaft, and star accent.',
    {
      S: { name: 'silver_shaft', role: 'body' },
      M: { name: 'moon_crescent', role: 'head' },
      T: { name: 'star_accent', role: 'accessory' },
      R: { name: 'moonstone_rings', role: 'arm' },
      B: { name: 'silver_base', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.ice,
      accessory: C.gold,
      arm: C.teal,
      belt: C.metal,
    },
    (g) => {
      // Moon crescent — C shape
      paintPoints(g, 'M', [[7, 1], [8, 1], [9, 1]]);
      paintPoints(g, 'M', [[6, 2], [10, 2]]);
      paintPoints(g, 'M', [[6, 3], [10, 3]]);
      paintPoints(g, 'M', [[7, 4], [8, 4], [9, 4]]);
      // Star accent inside crescent
      paintPoints(g, 'T', [[8, 2], [9, 3]]);
      // Shaft
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Moonstone rings
      paintPoints(g, 'R', [[6, 6], [9, 6], [6, 10], [9, 10]]);
      // Silver base
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 17. BONE STAFF ───────────────────────────────────────────
  makeTemplate(
    'bone_staff_16',
    'Tribal bone staff with animal skull cap, vertebrae shaft, and sinew wraps.',
    {
      S: { name: 'vertebrae_shaft', role: 'body' },
      K: { name: 'animal_skull', role: 'head' },
      H: { name: 'horns', role: 'accessory' },
      W: { name: 'sinew_wraps', role: 'arm' },
      B: { name: 'bone_foot', role: 'belt' },
    },
    {
      body: C.bone,
      head: C.ivory,
      accessory: C.bone,
      arm: C.leather,
      belt: C.bone,
    },
    (g) => {
      // Horns
      paintPoints(g, 'H', [[4, 1], [11, 1], [5, 2], [10, 2]]);
      // Animal skull
      paintRect(g, 'K', 6, 2, 9, 4);
      paintPoints(g, 'K', [[7, 5], [8, 5]]);
      // Skull eye sockets
      paintPoints(g, 'K', [[6, 3], [9, 3]]);
      // Vertebrae shaft
      paintV(g, 'S', 7, 6, 13);
      paintV(g, 'S', 8, 6, 13);
      // Vertebrae bumps
      paintPoints(g, 'S', [[6, 7], [9, 8], [6, 9], [9, 10], [6, 11], [9, 12]]);
      // Sinew wraps
      paintPoints(g, 'W', [[6, 6], [9, 6]]);
      // Bone foot
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
    },
  ),

  // ── 18. CORAL STAFF ──────────────────────────────────────────
  makeTemplate(
    'coral_staff_16',
    'Oceanic coral staff with branching coral top, pearl accent, and driftwood shaft.',
    {
      S: { name: 'driftwood_shaft', role: 'body' },
      C: { name: 'coral_branches', role: 'head' },
      P: { name: 'pearl_accent', role: 'accessory' },
      W: { name: 'seaweed_wrap', role: 'arm' },
      B: { name: 'shell_base', role: 'belt' },
    },
    {
      body: C.wood,
      head: C.coral,
      accessory: C.ivory,
      arm: C.green,
      belt: C.bone,
    },
    (g) => {
      // Coral branches — forking top
      paintPoints(g, 'C', [[5, 1], [7, 1], [10, 1]]);
      paintPoints(g, 'C', [[5, 2], [6, 2], [7, 2], [9, 2], [10, 2]]);
      paintPoints(g, 'C', [[6, 3], [7, 3], [8, 3], [9, 3]]);
      paintPoints(g, 'C', [[7, 4], [8, 4]]);
      // Pearl accent
      paintPoints(g, 'P', [[8, 2]]);
      // Shaft
      paintV(g, 'S', 7, 5, 13);
      paintV(g, 'S', 8, 5, 13);
      // Seaweed wrap
      paintPoints(g, 'W', [[6, 7], [9, 8], [6, 9], [9, 10]]);
      // Shell base
      paintPoints(g, 'B', [[6, 14], [7, 14], [8, 14], [9, 14]]);
      paintPoints(g, 'B', [[5, 13], [10, 13]]);
    },
  ),

  // ── 19. EMBER WAND ───────────────────────────────────────────
  makeTemplate(
    'ember_wand_16',
    'Short ember wand with smoldering tip, carved handle, and heat shimmer.',
    {
      S: { name: 'carved_handle', role: 'body' },
      E: { name: 'ember_tip', role: 'head' },
      H: { name: 'heat_shimmer', role: 'accessory' },
      G: { name: 'grip_leather', role: 'arm' },
      B: { name: 'cap_end', role: 'belt' },
    },
    {
      body: C.darkWood,
      head: C.ember,
      accessory: C.fire,
      arm: C.leather,
      belt: C.darkMetal,
    },
    (g) => {
      // Ember tip — glowing
      paintPoints(g, 'E', [[7, 2], [8, 2]]);
      paintPoints(g, 'E', [[7, 3], [8, 3]]);
      // Heat shimmer
      paintPoints(g, 'H', [[6, 1], [9, 1], [6, 3], [9, 3]]);
      // Handle shaft
      paintV(g, 'S', 7, 4, 12);
      paintV(g, 'S', 8, 4, 12);
      // Grip leather
      paintPoints(g, 'G', [[6, 8], [9, 8], [6, 9], [9, 9], [6, 10], [9, 10]]);
      // Cap end
      paintPoints(g, 'B', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),

  // ── 20. STORM SCEPTER ────────────────────────────────────────
  makeTemplate(
    'storm_scepter_16',
    'Electrified storm scepter with crackling orb, copper shaft, and storm runes.',
    {
      S: { name: 'copper_shaft', role: 'body' },
      O: { name: 'crackling_orb', role: 'head' },
      L: { name: 'lightning_arcs', role: 'accessory' },
      R: { name: 'storm_runes', role: 'arm' },
      B: { name: 'weighted_base', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.storm,
      accessory: C.gold,
      arm: C.blue,
      belt: C.darkMetal,
    },
    (g) => {
      // Crackling orb
      paintRect(g, 'O', 6, 1, 9, 4);
      // Lightning arcs
      paintPoints(g, 'L', [[5, 1], [10, 1], [4, 3], [11, 3], [5, 5], [10, 5]]);
      // Shaft
      paintV(g, 'S', 7, 5, 12);
      paintV(g, 'S', 8, 5, 12);
      // Storm runes
      paintPoints(g, 'R', [[6, 6], [9, 7], [6, 8], [9, 9], [6, 10], [9, 11]]);
      // Weighted base
      paintRect(g, 'B', 5, 13, 10, 14);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'weapons',
  exportNames: {
    templates: 'WEAPON_STAFF_BATCH1_TEMPLATES',
    schemes: 'WEAPON_STAFF_BATCH1_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
