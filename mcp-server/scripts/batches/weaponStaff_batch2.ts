/**
 * Weapons, Staffs & Bows batch 2 — Swords & Blades.
 * 20 original 16x16 templates — diverse swords from historical and fantasy genres.
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
  obsidian:  { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  holy:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  shadow:    { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  frost:     { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
  venom:     { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  runic:     { shadow: '#30346d', base: '#597dce', highlight: '#dad45e' },
  moon:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#6dc2ca' },
  sun:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
};

const templates: CompactTemplate[] = [
  // ── 1. FALCHION ──────────────────────────────────────────────
  makeTemplate(
    'falchion_16',
    'Heavy single-edged falchion with wide curved blade, cross guard, and leather grip.',
    {
      B: { name: 'curved_blade', role: 'body' },
      E: { name: 'blade_edge', role: 'head' },
      G: { name: 'cross_guard', role: 'accessory' },
      H: { name: 'leather_grip', role: 'arm' },
      P: { name: 'pommel', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.ivory,
      accessory: C.brass,
      arm: C.leather,
      belt: C.brass,
    },
    (g) => {
      // Blade tip — wide and curved
      paintPoints(g, 'B', [[6, 1], [7, 1], [8, 1]]);
      paintPoints(g, 'B', [[5, 2], [6, 2], [7, 2], [8, 2], [9, 2]]);
      paintRect(g, 'B', 5, 3, 10, 7);
      // Blade edge highlight
      paintPoints(g, 'E', [[10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7]]);
      // Cross guard
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[3, 9], [12, 9]]);
      // Leather grip
      paintRect(g, 'H', 6, 9, 9, 12);
      // Pommel
      paintRect(g, 'P', 6, 13, 9, 14);
    },
  ),

  // ── 2. CUTLASS ───────────────────────────────────────────────
  makeTemplate(
    'cutlass_16',
    'Pirate cutlass with curved blade, basket hilt guard, and wrapped grip.',
    {
      B: { name: 'curved_blade', role: 'body' },
      T: { name: 'blade_tip', role: 'head' },
      G: { name: 'basket_hilt', role: 'accessory' },
      H: { name: 'wrapped_grip', role: 'arm' },
      P: { name: 'pommel', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.ivory,
      accessory: C.brass,
      arm: C.darkWood,
      belt: C.brass,
    },
    (g) => {
      // Blade tip
      paintPoints(g, 'T', [[9, 1], [10, 1]]);
      // Curved blade
      paintPoints(g, 'B', [[8, 2], [9, 2], [10, 2]]);
      paintPoints(g, 'B', [[7, 3], [8, 3], [9, 3], [10, 3]]);
      paintPoints(g, 'B', [[7, 4], [8, 4], [9, 4]]);
      paintPoints(g, 'B', [[6, 5], [7, 5], [8, 5], [9, 5]]);
      paintPoints(g, 'B', [[6, 6], [7, 6], [8, 6]]);
      paintPoints(g, 'B', [[6, 7], [7, 7], [8, 7]]);
      // Basket hilt — curved guard
      paintH(g, 'G', 8, 4, 10);
      paintPoints(g, 'G', [[4, 9], [4, 10], [5, 8], [10, 9]]);
      paintPoints(g, 'G', [[5, 10], [5, 11]]);
      // Grip
      paintRect(g, 'H', 6, 9, 8, 12);
      // Pommel
      paintPoints(g, 'P', [[6, 13], [7, 13], [8, 13]]);
    },
  ),

  // ── 3. MACHETE ───────────────────────────────────────────────
  makeTemplate(
    'machete_16',
    'Broad machete with wide chopping blade, simple riveted handle, and leather sheath accent.',
    {
      B: { name: 'broad_blade', role: 'body' },
      E: { name: 'sharp_edge', role: 'head' },
      H: { name: 'wood_handle', role: 'arm' },
      R: { name: 'rivets', role: 'accessory' },
      T: { name: 'tang', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.ivory,
      arm: C.wood,
      accessory: C.darkMetal,
      belt: C.darkMetal,
    },
    (g) => {
      // Wide blade — rectangular
      paintRect(g, 'B', 5, 1, 10, 7);
      // Sharp edge
      paintPoints(g, 'E', [[10, 1], [11, 2], [11, 3], [11, 4], [11, 5], [11, 6], [10, 7]]);
      // Tang
      paintRect(g, 'T', 7, 8, 8, 8);
      // Wood handle
      paintRect(g, 'H', 6, 9, 9, 13);
      // Rivets
      paintPoints(g, 'R', [[6, 10], [9, 10], [6, 12], [9, 12]]);
      // Handle end
      paintPoints(g, 'H', [[7, 14], [8, 14]]);
    },
  ),

  // ── 4. SABRE (CAVALRY) ──────────────────────────────────────
  makeTemplate(
    'sabre_cavalry_16',
    'Elegant cavalry sabre with curved blade, knuckle bow guard, and wrapped grip.',
    {
      B: { name: 'curved_blade', role: 'body' },
      E: { name: 'blade_edge', role: 'head' },
      G: { name: 'knuckle_bow', role: 'accessory' },
      H: { name: 'grip', role: 'arm' },
      P: { name: 'pommel', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.ivory,
      accessory: C.gold,
      arm: C.leather,
      belt: C.gold,
    },
    (g) => {
      // Blade — elegantly curved
      paintPoints(g, 'B', [[9, 1], [10, 1]]);
      paintPoints(g, 'B', [[8, 2], [9, 2], [10, 2]]);
      paintPoints(g, 'B', [[8, 3], [9, 3]]);
      paintPoints(g, 'B', [[7, 4], [8, 4], [9, 4]]);
      paintPoints(g, 'B', [[7, 5], [8, 5]]);
      paintPoints(g, 'B', [[6, 6], [7, 6], [8, 6]]);
      paintPoints(g, 'B', [[6, 7], [7, 7], [8, 7]]);
      // Blade edge
      paintPoints(g, 'E', [[10, 2], [10, 3], [9, 5], [9, 6], [8, 7]]);
      // Knuckle bow guard
      paintH(g, 'G', 8, 4, 10);
      paintV(g, 'G', 4, 9, 12);
      paintPoints(g, 'G', [[5, 8], [5, 12]]);
      // Grip
      paintRect(g, 'H', 6, 9, 8, 12);
      // Pommel
      paintPoints(g, 'P', [[5, 13], [6, 13], [7, 13], [8, 13]]);
    },
  ),

  // ── 5. ESTOC ─────────────────────────────────────────────────
  makeTemplate(
    'estoc_16',
    'Long thrusting estoc with diamond-section blade, cruciform guard, and long grip.',
    {
      B: { name: 'diamond_blade', role: 'body' },
      T: { name: 'blade_tip', role: 'head' },
      G: { name: 'cruciform_guard', role: 'accessory' },
      H: { name: 'long_grip', role: 'arm' },
      P: { name: 'pommel', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.ivory,
      accessory: C.brass,
      arm: C.darkWood,
      belt: C.brass,
    },
    (g) => {
      // Blade tip — sharp point
      paintPoints(g, 'T', [[7, 1], [8, 1]]);
      // Diamond-section blade — narrow and long
      paintRect(g, 'B', 7, 2, 8, 7);
      paintPoints(g, 'B', [[6, 3], [9, 3], [6, 5], [9, 5]]);
      // Cruciform guard — straight cross
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[3, 9], [12, 9]]);
      // Long grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Pommel — flat disc
      paintH(g, 'P', 13, 6, 9);
      paintPoints(g, 'P', [[7, 14], [8, 14]]);
    },
  ),

  // ── 6. FLAMBERGE ─────────────────────────────────────────────
  makeTemplate(
    'flamberge_16',
    'Wavy-bladed flamberge with undulating edges, large guard, and two-handed grip.',
    {
      B: { name: 'wavy_blade', role: 'body' },
      W: { name: 'wave_edges', role: 'head' },
      G: { name: 'large_guard', role: 'accessory' },
      H: { name: 'two_hand_grip', role: 'arm' },
      P: { name: 'pommel', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.ivory,
      accessory: C.gold,
      arm: C.leather,
      belt: C.gold,
    },
    (g) => {
      // Blade tip
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      // Wavy blade — zigzag edges
      paintRect(g, 'B', 6, 2, 9, 7);
      // Wave edges — alternating bumps
      paintPoints(g, 'W', [[5, 2], [10, 3], [5, 4], [10, 5], [5, 6], [10, 7]]);
      paintPoints(g, 'W', [[10, 2], [5, 3], [10, 4], [5, 5], [10, 6], [5, 7]]);
      // Large guard
      paintH(g, 'G', 8, 2, 13);
      paintPoints(g, 'G', [[2, 9], [13, 9]]);
      // Two-hand grip
      paintRect(g, 'H', 6, 9, 9, 12);
      // Pommel
      paintRect(g, 'P', 6, 13, 9, 14);
    },
  ),

  // ── 7. KHOPESH ───────────────────────────────────────────────
  makeTemplate(
    'khopesh_16',
    'Egyptian khopesh with sickle-shaped blade, straight base, and bronze fittings.',
    {
      B: { name: 'sickle_blade', role: 'body' },
      E: { name: 'cutting_edge', role: 'head' },
      G: { name: 'bronze_guard', role: 'accessory' },
      H: { name: 'grip', role: 'arm' },
      P: { name: 'pommel', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.gold,
      accessory: C.brass,
      arm: C.leather,
      belt: C.brass,
    },
    (g) => {
      // Sickle blade — curved hook shape
      paintPoints(g, 'B', [[10, 1], [11, 1]]);
      paintPoints(g, 'B', [[9, 2], [10, 2], [11, 2]]);
      paintPoints(g, 'B', [[8, 3], [9, 3], [10, 3]]);
      paintPoints(g, 'B', [[7, 4], [8, 4], [9, 4]]);
      paintPoints(g, 'B', [[7, 5], [8, 5]]);
      paintPoints(g, 'B', [[7, 6], [8, 6]]);
      paintPoints(g, 'B', [[7, 7], [8, 7]]);
      // Cutting edge
      paintPoints(g, 'E', [[12, 1], [12, 2], [11, 3], [10, 4], [9, 5]]);
      // Guard
      paintH(g, 'G', 8, 5, 10);
      // Grip — straight
      paintRect(g, 'H', 7, 9, 8, 12);
      // Pommel
      paintPoints(g, 'P', [[6, 13], [7, 13], [8, 13], [9, 13]]);
      paintPoints(g, 'P', [[7, 14], [8, 14]]);
    },
  ),

  // ── 8. DAO SWORD ─────────────────────────────────────────────
  makeTemplate(
    'dao_sword_16',
    'Chinese dao with single-edged curved blade, ring pommel, and cord-wrapped grip.',
    {
      B: { name: 'curved_blade', role: 'body' },
      E: { name: 'blade_spine', role: 'head' },
      G: { name: 'disc_guard', role: 'accessory' },
      H: { name: 'cord_grip', role: 'arm' },
      R: { name: 'ring_pommel', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.darkMetal,
      accessory: C.brass,
      arm: C.red,
      belt: C.brass,
    },
    (g) => {
      // Blade tip — flared
      paintPoints(g, 'B', [[6, 1], [7, 1], [8, 1], [9, 1]]);
      // Curved blade
      paintPoints(g, 'B', [[7, 2], [8, 2], [9, 2]]);
      paintRect(g, 'B', 7, 3, 9, 7);
      // Blade spine
      paintPoints(g, 'E', [[6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7]]);
      // Disc guard
      paintH(g, 'G', 8, 4, 11);
      // Cord grip
      paintRect(g, 'H', 7, 9, 8, 12);
      paintPoints(g, 'H', [[6, 10], [9, 11]]);
      // Ring pommel
      paintPoints(g, 'R', [[6, 13], [7, 13], [8, 13], [9, 13]]);
      paintPoints(g, 'R', [[6, 14], [9, 14]]);
      paintPoints(g, 'R', [[7, 14], [8, 14]]);
    },
  ),

  // ── 9. TULWAR ────────────────────────────────────────────────
  makeTemplate(
    'tulwar_16',
    'Indian tulwar with heavily curved blade, disc hilt, and ornate cross guard.',
    {
      B: { name: 'heavy_blade', role: 'body' },
      E: { name: 'edge_bevel', role: 'head' },
      G: { name: 'disc_hilt', role: 'accessory' },
      H: { name: 'grip', role: 'arm' },
      P: { name: 'pommel_disc', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.ivory,
      accessory: C.gold,
      arm: C.leather,
      belt: C.gold,
    },
    (g) => {
      // Heavily curved blade
      paintPoints(g, 'B', [[10, 1], [11, 1]]);
      paintPoints(g, 'B', [[9, 2], [10, 2]]);
      paintPoints(g, 'B', [[8, 3], [9, 3], [10, 3]]);
      paintPoints(g, 'B', [[7, 4], [8, 4], [9, 4]]);
      paintPoints(g, 'B', [[6, 5], [7, 5], [8, 5], [9, 5]]);
      paintPoints(g, 'B', [[6, 6], [7, 6], [8, 6]]);
      paintPoints(g, 'B', [[6, 7], [7, 7], [8, 7]]);
      // Edge bevel
      paintPoints(g, 'E', [[11, 2], [10, 4], [9, 6]]);
      // Disc hilt
      paintH(g, 'G', 8, 4, 10);
      paintPoints(g, 'G', [[4, 9], [10, 9]]);
      // Grip
      paintRect(g, 'H', 6, 9, 8, 12);
      // Pommel disc
      paintRect(g, 'P', 5, 13, 9, 14);
    },
  ),

  // ── 10. BASTARD SWORD ────────────────────────────────────────
  makeTemplate(
    'bastard_sword_16',
    'Versatile bastard sword (hand-and-a-half) with medium blade, cross guard, and extended grip.',
    {
      B: { name: 'medium_blade', role: 'body' },
      F: { name: 'fuller', role: 'head' },
      G: { name: 'cross_guard', role: 'accessory' },
      H: { name: 'extended_grip', role: 'arm' },
      P: { name: 'wheel_pommel', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.ivory,
      accessory: C.brass,
      arm: C.leather,
      belt: C.brass,
    },
    (g) => {
      // Blade tip
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      // Medium blade
      paintRect(g, 'B', 6, 2, 9, 7);
      // Fuller — central groove
      paintV(g, 'F', 7, 2, 7);
      paintV(g, 'F', 8, 2, 7);
      // Cross guard
      paintH(g, 'G', 8, 3, 12);
      // Extended grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Wheel pommel
      paintRect(g, 'P', 6, 13, 9, 14);
    },
  ),

  // ── 11. CRYSTAL BLADE ────────────────────────────────────────
  makeTemplate(
    'crystal_blade_16',
    'Translucent crystal blade with faceted edges, silver guard, and arcane grip.',
    {
      B: { name: 'crystal_blade', role: 'body' },
      F: { name: 'faceted_core', role: 'head' },
      G: { name: 'silver_guard', role: 'accessory' },
      H: { name: 'arcane_grip', role: 'arm' },
      P: { name: 'gem_pommel', role: 'belt' },
    },
    {
      body: C.crystal,
      head: C.ice,
      accessory: C.metal,
      arm: C.purple,
      belt: C.crystal,
    },
    (g) => {
      // Crystal blade — faceted shape
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      paintRect(g, 'B', 6, 2, 9, 7);
      // Faceted core — lighter inner
      paintV(g, 'F', 7, 2, 6);
      paintV(g, 'F', 8, 2, 6);
      // Silver guard
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[3, 9], [12, 9]]);
      // Arcane grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Gem pommel
      paintPoints(g, 'P', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),

  // ── 12. SHADOW BLADE ─────────────────────────────────────────
  makeTemplate(
    'shadow_blade_16',
    'Dark shadow blade with smoky edges, void guard, and wrapped handle.',
    {
      B: { name: 'dark_blade', role: 'body' },
      S: { name: 'smoke_edges', role: 'head' },
      G: { name: 'void_guard', role: 'accessory' },
      H: { name: 'dark_wrap', role: 'arm' },
      P: { name: 'onyx_pommel', role: 'belt' },
    },
    {
      body: C.shadow,
      head: C.purple,
      accessory: C.darkMetal,
      arm: C.shadow,
      belt: C.obsidian,
    },
    (g) => {
      // Dark blade
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      paintRect(g, 'B', 6, 2, 9, 7);
      // Smoke edges — wispy
      paintPoints(g, 'S', [[5, 2], [10, 3], [5, 4], [10, 5], [5, 6], [10, 7]]);
      // Void guard
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[3, 9], [12, 9]]);
      // Dark wrap
      paintRect(g, 'H', 7, 9, 8, 12);
      // Onyx pommel
      paintPoints(g, 'P', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),

  // ── 13. HOLY SWORD ───────────────────────────────────────────
  makeTemplate(
    'holy_sword_16',
    'Blessed holy sword with radiant blade, golden cross guard, and divine grip.',
    {
      B: { name: 'radiant_blade', role: 'body' },
      R: { name: 'divine_glow', role: 'head' },
      G: { name: 'golden_guard', role: 'accessory' },
      H: { name: 'divine_grip', role: 'arm' },
      P: { name: 'holy_pommel', role: 'belt' },
    },
    {
      body: C.ivory,
      head: C.holy,
      accessory: C.gold,
      arm: C.blue,
      belt: C.gold,
    },
    (g) => {
      // Radiant blade
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      paintRect(g, 'B', 6, 2, 9, 7);
      // Divine glow — highlights along blade
      paintV(g, 'R', 7, 2, 7);
      paintV(g, 'R', 8, 2, 7);
      // Golden guard — ornate
      paintH(g, 'G', 8, 2, 13);
      paintPoints(g, 'G', [[2, 9], [13, 9]]);
      // Divine grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Holy pommel
      paintRect(g, 'P', 6, 13, 9, 14);
    },
  ),

  // ── 14. FROST BLADE ──────────────────────────────────────────
  makeTemplate(
    'frost_blade_16',
    'Ice-encrusted frost blade with frozen edge, icicle guard, and cold grip.',
    {
      B: { name: 'frozen_blade', role: 'body' },
      I: { name: 'ice_crystals', role: 'head' },
      G: { name: 'icicle_guard', role: 'accessory' },
      H: { name: 'cold_grip', role: 'arm' },
      P: { name: 'frost_pommel', role: 'belt' },
    },
    {
      body: C.ice,
      head: C.frost,
      accessory: C.crystal,
      arm: C.blue,
      belt: C.ice,
    },
    (g) => {
      // Frost blade
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      paintRect(g, 'B', 6, 2, 9, 7);
      // Ice crystals — jutting from blade
      paintPoints(g, 'I', [[5, 2], [10, 3], [5, 5], [10, 6]]);
      paintPoints(g, 'I', [[4, 3], [11, 5]]);
      // Icicle guard
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[3, 9], [12, 9]]);
      // Cold grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Frost pommel
      paintPoints(g, 'P', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),

  // ── 15. THUNDER SWORD ────────────────────────────────────────
  makeTemplate(
    'thunder_sword_16',
    'Lightning-charged thunder sword with crackling blade, storm guard, and electrified grip.',
    {
      B: { name: 'crackling_blade', role: 'body' },
      L: { name: 'lightning_arcs', role: 'head' },
      G: { name: 'storm_guard', role: 'accessory' },
      H: { name: 'electrified_grip', role: 'arm' },
      P: { name: 'storm_pommel', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.gold,
      accessory: C.blue,
      arm: C.darkMetal,
      belt: C.blue,
    },
    (g) => {
      // Crackling blade
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      paintRect(g, 'B', 6, 2, 9, 7);
      // Lightning arcs from blade
      paintPoints(g, 'L', [[5, 1], [10, 2], [5, 4], [10, 5], [5, 7]]);
      paintPoints(g, 'L', [[4, 2], [11, 4]]);
      // Storm guard
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[3, 9], [12, 9]]);
      // Electrified grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Storm pommel
      paintPoints(g, 'P', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),

  // ── 16. VENOM BLADE ──────────────────────────────────────────
  makeTemplate(
    'venom_blade_16',
    'Poison-dripping venom blade with toxic edge, fang guard, and scaled grip.',
    {
      B: { name: 'toxic_blade', role: 'body' },
      D: { name: 'venom_drips', role: 'head' },
      G: { name: 'fang_guard', role: 'accessory' },
      H: { name: 'scaled_grip', role: 'arm' },
      P: { name: 'serpent_pommel', role: 'belt' },
    },
    {
      body: C.venom,
      head: C.green,
      accessory: C.darkMetal,
      arm: C.green,
      belt: C.darkMetal,
    },
    (g) => {
      // Toxic blade
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      paintRect(g, 'B', 6, 2, 9, 7);
      // Venom drips
      paintPoints(g, 'D', [[5, 3], [10, 4], [5, 6], [10, 7]]);
      paintPoints(g, 'D', [[4, 4], [11, 5]]);
      // Fang guard — pointed ends
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[3, 7], [12, 7]]);
      // Scaled grip
      paintRect(g, 'H', 7, 9, 8, 12);
      paintPoints(g, 'H', [[6, 10], [9, 11]]);
      // Serpent pommel
      paintPoints(g, 'P', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),

  // ── 17. RUNIC SWORD ──────────────────────────────────────────
  makeTemplate(
    'runic_sword_16',
    'Ancient runic sword with glowing runes etched in blade, ornate guard, and rune-wrapped grip.',
    {
      B: { name: 'rune_blade', role: 'body' },
      R: { name: 'glowing_runes', role: 'head' },
      G: { name: 'ornate_guard', role: 'accessory' },
      H: { name: 'rune_grip', role: 'arm' },
      P: { name: 'rune_pommel', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.runic,
      accessory: C.brass,
      arm: C.leather,
      belt: C.brass,
    },
    (g) => {
      // Rune blade
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      paintRect(g, 'B', 6, 2, 9, 7);
      // Glowing runes etched in blade
      paintPoints(g, 'R', [[7, 2], [8, 3], [7, 4], [8, 5], [7, 6]]);
      // Ornate guard
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[3, 9], [12, 9]]);
      // Rune grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Rune pommel
      paintPoints(g, 'P', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),

  // ── 18. MOON SWORD ───────────────────────────────────────────
  makeTemplate(
    'moon_sword_16',
    'Silvery moon sword with crescent-tipped blade, lunar guard, and moonstone grip.',
    {
      B: { name: 'silver_blade', role: 'body' },
      M: { name: 'crescent_tip', role: 'head' },
      G: { name: 'lunar_guard', role: 'accessory' },
      H: { name: 'moonstone_grip', role: 'arm' },
      P: { name: 'moon_pommel', role: 'belt' },
    },
    {
      body: C.metal,
      head: C.moon,
      accessory: C.ice,
      arm: C.blue,
      belt: C.moon,
    },
    (g) => {
      // Crescent tip — curved at top
      paintPoints(g, 'M', [[5, 1], [6, 1], [9, 1], [10, 1]]);
      paintPoints(g, 'M', [[5, 2], [10, 2]]);
      // Silver blade
      paintRect(g, 'B', 6, 2, 9, 7);
      // Lunar guard — curved
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[3, 9], [12, 9]]);
      // Moonstone grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Moon pommel
      paintPoints(g, 'P', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),

  // ── 19. SUN BLADE ────────────────────────────────────────────
  makeTemplate(
    'sun_blade_16',
    'Radiant sun blade with flared golden tip, solar guard, and warm grip.',
    {
      B: { name: 'golden_blade', role: 'body' },
      T: { name: 'flared_tip', role: 'head' },
      G: { name: 'solar_guard', role: 'accessory' },
      H: { name: 'warm_grip', role: 'arm' },
      P: { name: 'sun_pommel', role: 'belt' },
    },
    {
      body: C.brass,
      head: C.sun,
      accessory: C.gold,
      arm: C.red,
      belt: C.gold,
    },
    (g) => {
      // Flared tip — sunburst
      paintPoints(g, 'T', [[6, 1], [7, 1], [8, 1], [9, 1]]);
      paintPoints(g, 'T', [[5, 2], [10, 2]]);
      // Golden blade
      paintRect(g, 'B', 6, 2, 9, 7);
      // Solar guard — ornate
      paintH(g, 'G', 8, 2, 13);
      paintPoints(g, 'G', [[2, 9], [13, 9]]);
      // Warm grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Sun pommel
      paintRect(g, 'P', 6, 13, 9, 14);
    },
  ),

  // ── 20. OBSIDIAN SWORD ───────────────────────────────────────
  makeTemplate(
    'obsidian_sword_16',
    'Volcanic obsidian sword with glass-like blade, bone guard, and leather grip.',
    {
      B: { name: 'obsidian_blade', role: 'body' },
      E: { name: 'glass_edge', role: 'head' },
      G: { name: 'bone_guard', role: 'accessory' },
      H: { name: 'leather_grip', role: 'arm' },
      P: { name: 'obsidian_pommel', role: 'belt' },
    },
    {
      body: C.obsidian,
      head: C.darkMetal,
      accessory: C.bone,
      arm: C.leather,
      belt: C.obsidian,
    },
    (g) => {
      // Obsidian blade — angular
      paintPoints(g, 'B', [[7, 1], [8, 1]]);
      paintRect(g, 'B', 5, 2, 10, 7);
      // Glass edge — sharp highlights
      paintPoints(g, 'E', [[5, 2], [10, 3], [5, 5], [10, 6]]);
      // Bone guard
      paintH(g, 'G', 8, 3, 12);
      paintPoints(g, 'G', [[3, 9], [12, 9]]);
      // Leather grip
      paintRect(g, 'H', 7, 9, 8, 12);
      // Obsidian pommel
      paintPoints(g, 'P', [[6, 13], [7, 13], [8, 13], [9, 13]]);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'weapons',
  exportNames: {
    templates: 'WEAPON_STAFF_BATCH2_TEMPLATES',
    schemes: 'WEAPON_STAFF_BATCH2_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
