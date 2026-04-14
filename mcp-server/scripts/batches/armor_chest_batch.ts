/**
 * Armor Chest batch — 20 distinct chest armor templates.
 * Hand-designed 16x16 pixel art, DB16 palette.
 * Each piece has a unique silhouette and material identity.
 */
import type { BatchDefinition, CompactTemplate } from '../templateGenerator.js';

type Grid = string[][];

function createGrid(): Grid {
  return Array.from({ length: 16 }, () => Array(16).fill('.'));
}

function paintRect(grid: Grid, ch: string, x1: number, y1: number, x2: number, y2: number): void {
  for (let y = y1; y <= y2; y++)
    for (let x = x1; x <= x2; x++)
      if (x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
}

function paintH(grid: Grid, ch: string, y: number, x1: number, x2: number): void {
  for (let x = x1; x <= x2; x++)
    if (x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
}

function paintV(grid: Grid, ch: string, x: number, y1: number, y2: number): void {
  for (let y = y1; y <= y2; y++)
    if (x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
}

function paintPoints(grid: Grid, ch: string, points: Array<[number, number]>): void {
  for (const [x, y] of points)
    if (x >= 0 && x < 16 && y >= 0 && y < 16) grid[y][x] = ch;
}

function toRows(grid: Grid): string[] { return grid.map((row) => row.join('')); }

function makeTemplate(
  id: string, description: string,
  chars: CompactTemplate['chars'], colors: CompactTemplate['colors'],
  draw: (grid: Grid) => void,
): CompactTemplate {
  const grid = createGrid();
  draw(grid);
  return { id, description, grid: toRows(grid), chars, colors };
}

// ─── Color palettes ─────────────────────────────────────────────
const C = {
  iron:        { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  darkIron:    { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  bronze:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  gold:        { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  leather:     { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  darkLeather: { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  wood:        { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  crystal:     { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
  ice:         { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  bone:        { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  dragon:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  mithril:     { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  shadow:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  fire:        { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  holy:        { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  chain:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  red:         { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  green:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  purple:      { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
  brass:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
};

const ARMOR_CHARS = {
  B: { name: 'main_plate', role: 'body' },
  H: { name: 'collar', role: 'head' },
  A: { name: 'decoration', role: 'accessory' },
  R: { name: 'trim', role: 'arm' },
  P: { name: 'belt', role: 'belt' },
};

const templates: CompactTemplate[] = [

  // ── 1. IRON BREASTPLATE ──────────────────────────────────────
  // Standard knight breastplate with flat collar, center ridge, leather belt
  makeTemplate('iron_breastplate_16',
    'Standard iron breastplate with flat collar, center ridge, and leather belt.',
    ARMOR_CHARS,
    { body: C.iron, head: C.darkIron, accessory: C.brass, arm: C.chain, belt: C.leather },
    (g) => {
      // Flat collar
      paintH(g, 'H', 2, 6, 9);
      // Shoulder trim
      paintH(g, 'R', 3, 4, 11);
      // Main plate body (rows 4-8)
      paintRect(g, 'B', 4, 4, 11, 8);
      // Center ridge
      paintV(g, 'A', 7, 4, 8);
      paintV(g, 'A', 8, 4, 8);
      // Side trim
      paintV(g, 'R', 4, 4, 8);
      paintV(g, 'R', 11, 4, 8);
      // Belt
      paintH(g, 'P', 9, 5, 10);
      paintH(g, 'P', 10, 5, 10);
      paintPoints(g, 'A', [[7,9],[8,9]]);
    },
  ),

  // ── 2. BRONZE CUIRASS ────────────────────────────────────────
  // Muscular cuirass with contoured abs, slightly rounded bottom
  makeTemplate('bronze_cuirass_16',
    'Bronze muscular cuirass with contoured abdominal detail and gold trim.',
    ARMOR_CHARS,
    { body: C.bronze, head: C.darkIron, accessory: C.gold, arm: C.brass, belt: C.leather },
    (g) => {
      // Collar
      paintH(g, 'H', 1, 6, 9);
      // Shoulder trim
      paintH(g, 'R', 2, 4, 11);
      // Wide plate body
      paintRect(g, 'B', 4, 3, 11, 9);
      // Pectoral contour
      paintPoints(g, 'A', [[5,4],[6,5],[9,5],[10,4]]);
      // Center ab line
      paintV(g, 'A', 7, 6, 8);
      paintV(g, 'A', 8, 6, 8);
      // Side trim
      paintV(g, 'R', 4, 3, 9);
      paintV(g, 'R', 11, 3, 9);
      // Rounded bottom
      paintH(g, 'R', 10, 5, 10);
      // Belt
      paintH(g, 'P', 11, 6, 9);
    },
  ),

  // ── 3. GOLD ORNATE PLATE ─────────────────────────────────────
  // Wide ceremonial with shoulder flares and center jewel
  makeTemplate('gold_ornate_plate_16',
    'Ornate gold plate with shoulder flares, center ruby, and decorative trim.',
    ARMOR_CHARS,
    { body: C.gold, head: C.darkIron, accessory: C.red, arm: C.brass, belt: C.leather },
    (g) => {
      // Shoulder flares
      paintPoints(g, 'B', [[3,2],[12,2]]);
      paintH(g, 'B', 3, 3, 12);
      // High collar
      paintH(g, 'H', 2, 6, 9);
      // Trim on shoulders
      paintH(g, 'R', 3, 3, 5);
      paintH(g, 'R', 3, 10, 12);
      // Wide plate body
      paintRect(g, 'B', 3, 4, 12, 9);
      // Center ruby
      paintRect(g, 'A', 7, 5, 8, 6);
      // Decorative arcs
      paintPoints(g, 'R', [[5,5],[6,4],[9,4],[10,5]]);
      paintPoints(g, 'R', [[5,8],[6,9],[9,9],[10,8]]);
      // Side trim
      paintV(g, 'R', 3, 4, 9);
      paintV(g, 'R', 12, 4, 9);
      // Belt sash
      paintH(g, 'P', 10, 5, 10);
      paintH(g, 'P', 11, 6, 9);
    },
  ),

  // ── 4. LEATHER VEST ──────────────────────────────────────────
  // Light V-neck vest with front lacing — narrower silhouette
  makeTemplate('leather_vest_16',
    'Light leather vest with V-neck opening, front lacing, and stitched seams.',
    ARMOR_CHARS,
    { body: C.leather, head: C.darkLeather, accessory: C.brass, arm: C.darkLeather, belt: C.darkLeather },
    (g) => {
      // V-neck opening shoulders
      paintPoints(g, 'H', [[5,2],[10,2]]);
      paintPoints(g, 'H', [[6,3],[9,3]]);
      // Narrow body (rows 3-9)
      paintRect(g, 'B', 5, 3, 10, 9);
      // V-neck opening
      paintPoints(g, '.', [[7,3],[8,3]]);
      // Front lacing
      paintPoints(g, 'A', [[7,4],[8,5],[7,6],[8,7],[7,8]]);
      // Seam stitching
      paintV(g, 'R', 5, 3, 9);
      paintV(g, 'R', 10, 3, 9);
      // Belt
      paintH(g, 'P', 10, 6, 9);
      paintPoints(g, 'A', [[7,10]]);
    },
  ),

  // ── 5. CHAINMAIL HAUBERK ─────────────────────────────────────
  // Long chain shirt extends below waist with ring texture
  makeTemplate('chainmail_hauberk_16',
    'Long chainmail hauberk with ring texture, iron collar, and chain skirt.',
    ARMOR_CHARS,
    { body: C.chain, head: C.darkIron, accessory: C.iron, arm: C.darkIron, belt: C.leather },
    (g) => {
      // Iron collar
      paintH(g, 'H', 2, 6, 9);
      // Shoulder trim
      paintH(g, 'R', 3, 4, 11);
      // Chain body (rows 4-11, long!)
      paintRect(g, 'B', 4, 4, 11, 11);
      // Chain texture
      paintPoints(g, 'A', [[5,4],[7,4],[9,4],[11,4]]);
      paintPoints(g, 'A', [[4,6],[6,6],[8,6],[10,6]]);
      paintPoints(g, 'A', [[5,8],[7,8],[9,8],[11,8]]);
      paintPoints(g, 'A', [[4,10],[6,10],[8,10],[10,10]]);
      // Side trim
      paintV(g, 'R', 4, 4, 11);
      paintV(g, 'R', 11, 4, 11);
      // Belt over chain
      paintH(g, 'P', 8, 5, 10);
      // Chain fringe at bottom
      paintPoints(g, 'R', [[5,12],[7,12],[9,12]]);
    },
  ),

  // ── 6. FULL PLATE CUIRASS ────────────────────────────────────
  // Heaviest — widest silhouette with layered shoulder guards
  makeTemplate('full_plate_cuirass_16',
    'Heavy full plate cuirass with wide shoulder guards and gold rivets.',
    ARMOR_CHARS,
    { body: C.iron, head: C.darkIron, accessory: C.gold, arm: C.chain, belt: C.leather },
    (g) => {
      // Wide gorget
      paintH(g, 'H', 1, 5, 10);
      // Extended shoulder guards
      paintH(g, 'B', 2, 2, 13);
      paintH(g, 'R', 2, 2, 4);
      paintH(g, 'R', 2, 11, 13);
      paintH(g, 'B', 3, 3, 12);
      // Wide plate body
      paintRect(g, 'B', 3, 4, 12, 9);
      // Gold rivets
      paintPoints(g, 'A', [[3,3],[12,3],[3,5],[12,5],[3,8],[12,8]]);
      // Center seam
      paintV(g, 'R', 7, 4, 9);
      paintV(g, 'R', 8, 4, 9);
      // Side trim
      paintV(g, 'R', 3, 4, 9);
      paintV(g, 'R', 12, 4, 9);
      // Fauld plates
      paintH(g, 'P', 10, 4, 11);
      paintH(g, 'P', 11, 5, 10);
    },
  ),

  // ── 7. DRAGON SCALE VEST ─────────────────────────────────────
  // Overlapping scale rows visible in staggered pattern
  makeTemplate('dragon_scale_vest_16',
    'Dragon scale chestpiece with overlapping red scales and gold ridge accents.',
    ARMOR_CHARS,
    { body: C.dragon, head: C.darkIron, accessory: C.gold, arm: C.fire, belt: C.leather },
    (g) => {
      // Dark collar
      paintH(g, 'H', 2, 6, 9);
      // Shoulder trim
      paintH(g, 'R', 3, 5, 10);
      // Scale body (rows 3-9)
      paintRect(g, 'B', 4, 3, 11, 9);
      // Scale row edges (staggered gold tips)
      paintPoints(g, 'A', [[5,4],[7,4],[9,4],[11,4]]);
      paintPoints(g, 'A', [[4,6],[6,6],[8,6],[10,6]]);
      paintPoints(g, 'A', [[5,8],[7,8],[9,8],[11,8]]);
      // Side trim
      paintV(g, 'R', 4, 3, 9);
      paintV(g, 'R', 11, 3, 9);
      // Belt
      paintH(g, 'P', 10, 5, 10);
      paintH(g, 'P', 11, 6, 9);
    },
  ),

  // ── 8. CRYSTAL CHEST GUARD ───────────────────────────────────
  // Angular diamond shape with glowing center
  makeTemplate('crystal_chest_guard_16',
    'Angular crystal chest guard with glowing center gem and silver mount frame.',
    ARMOR_CHARS,
    { body: C.crystal, head: C.ice, accessory: C.ice, arm: C.iron, belt: C.mithril },
    (g) => {
      // Angular top point
      paintPoints(g, 'B', [[7,1],[8,1]]);
      paintH(g, 'B', 2, 6, 9);
      // Diamond expansion
      paintH(g, 'B', 3, 5, 10);
      paintH(g, 'B', 4, 4, 11);
      paintH(g, 'B', 5, 3, 12);
      paintH(g, 'B', 6, 3, 12);
      paintH(g, 'B', 7, 4, 11);
      paintH(g, 'B', 8, 5, 10);
      paintH(g, 'B', 9, 6, 9);
      // Center glow
      paintRect(g, 'H', 7, 5, 8, 6);
      // Mount trim
      paintPoints(g, 'R', [[5,3],[10,3],[3,5],[12,5],[3,6],[12,6],[5,8],[10,8]]);
      // Belt mount
      paintH(g, 'P', 10, 7, 8);
    },
  ),

  // ── 9. DARK KNIGHT PLATE ─────────────────────────────────────
  // Wide angular with shoulder wings, menacing glow
  makeTemplate('dark_knight_plate_16',
    'Dark knight plate with angular shoulder wings and purple rune glow.',
    ARMOR_CHARS,
    { body: C.shadow, head: C.darkIron, accessory: C.purple, arm: C.shadow, belt: C.darkLeather },
    (g) => {
      // Angular shoulder wings
      paintPoints(g, 'B', [[2,2],[13,2]]);
      paintH(g, 'B', 3, 2, 13);
      // Dark collar
      paintH(g, 'H', 2, 6, 9);
      // Wide body
      paintRect(g, 'B', 3, 4, 12, 9);
      // Purple rune center
      paintV(g, 'A', 7, 4, 9);
      paintV(g, 'A', 8, 4, 9);
      // Rune accents
      paintPoints(g, 'A', [[4,5],[11,5],[4,8],[11,8]]);
      // Dark trim
      paintV(g, 'R', 3, 4, 9);
      paintV(g, 'R', 12, 4, 9);
      // Belt
      paintH(g, 'P', 10, 4, 11);
      paintH(g, 'P', 11, 5, 10);
    },
  ),

  // ── 10. BONE RIBCAGE ARMOR ───────────────────────────────────
  // Skeletal framework with ribs, gaps between bones
  makeTemplate('bone_ribcage_armor_16',
    'Skeletal bone ribcage armor with curved ribs, spine column, and dark gaps.',
    ARMOR_CHARS,
    { body: C.bone, head: C.shadow, accessory: C.darkIron, arm: C.bone, belt: C.darkLeather },
    (g) => {
      // Spine column
      paintV(g, 'A', 7, 2, 10);
      paintV(g, 'A', 8, 2, 10);
      // Collar bones
      paintH(g, 'B', 2, 4, 11);
      // Rib 1 (left and right of spine)
      paintH(g, 'B', 4, 4, 6); paintH(g, 'B', 4, 9, 11);
      // Gap (visible dark)
      paintPoints(g, 'H', [[5,5],[6,5],[9,5],[10,5]]);
      // Rib 2
      paintH(g, 'B', 6, 4, 6); paintH(g, 'B', 6, 9, 11);
      // Gap
      paintPoints(g, 'H', [[5,7],[6,7],[9,7],[10,7]]);
      // Rib 3 (shorter)
      paintH(g, 'B', 8, 5, 6); paintH(g, 'B', 8, 9, 10);
      // Pelvis/bottom
      paintH(g, 'R', 9, 5, 10);
      // Belt
      paintH(g, 'P', 10, 6, 9);
    },
  ),

  // ── 11. MITHRIL MAIL ─────────────────────────────────────────
  // Elegant tapered with flowing elvish rune lines
  makeTemplate('mithril_mail_16',
    'Elegant mithril mail with tapered silhouette and teal elvish rune inlay.',
    ARMOR_CHARS,
    { body: C.mithril, head: C.darkIron, accessory: C.ice, arm: C.iron, belt: C.mithril },
    (g) => {
      // Collar
      paintH(g, 'H', 2, 6, 9);
      // Shoulder trim
      paintH(g, 'R', 3, 4, 11);
      // Tapered body: wide shoulders → narrow waist
      paintH(g, 'B', 4, 4, 11);
      paintH(g, 'B', 5, 4, 11);
      paintH(g, 'B', 6, 5, 10);
      paintH(g, 'B', 7, 5, 10);
      paintH(g, 'B', 8, 5, 10);
      paintH(g, 'B', 9, 6, 9);
      // Elvish rune S-pattern
      paintPoints(g, 'A', [[6,4],[7,5],[8,6],[7,7],[6,8]]);
      paintPoints(g, 'A', [[9,4],[10,5],[9,6],[10,7],[9,8]]);
      // Trim
      paintV(g, 'R', 4, 4, 5);
      paintV(g, 'R', 11, 4, 5);
      // Belt
      paintH(g, 'P', 10, 6, 9);
    },
  ),

  // ── 12. WOODEN BARK ARMOR ────────────────────────────────────
  // Organic shape with bark texture and vine wrapping
  makeTemplate('wooden_bark_armor_16',
    'Natural bark armor with organic shape, vine wrapping, and wood knot detail.',
    ARMOR_CHARS,
    { body: C.wood, head: C.darkLeather, accessory: C.green, arm: C.darkLeather, belt: C.green },
    (g) => {
      // Irregular top (bark grows unevenly)
      paintPoints(g, 'B', [[5,2],[6,2],[9,2],[10,2]]);
      // Main bark body
      paintH(g, 'B', 3, 4, 11);
      paintRect(g, 'B', 4, 4, 11, 9);
      // Organic bumps at sides
      paintPoints(g, 'B', [[3,5],[3,6],[12,6],[12,7]]);
      // Bark knots (dark)
      paintPoints(g, 'H', [[6,4],[10,5],[5,7],[9,8]]);
      // Vine wrapping accent (diagonal)
      paintPoints(g, 'A', [[4,4],[5,5],[6,6],[7,7],[8,8]]);
      // Trim edges
      paintV(g, 'R', 4, 4, 9);
      paintV(g, 'R', 11, 4, 9);
      // Vine belt
      paintH(g, 'P', 10, 5, 10);
      paintPoints(g, 'A', [[5,10],[10,10]]);
    },
  ),

  // ── 13. SAMURAI DO ───────────────────────────────────────────
  // Wide layered horizontal lames
  makeTemplate('samurai_do_16',
    'Samurai do chest armor with horizontal layered lames and gold lacing.',
    ARMOR_CHARS,
    { body: C.darkIron, head: C.darkIron, accessory: C.gold, arm: C.iron, belt: C.leather },
    (g) => {
      // Munaita (upper plate)
      paintH(g, 'H', 2, 5, 10);
      // Shoulder ties
      paintPoints(g, 'A', [[3,3],[12,3]]);
      // Lame 1
      paintRect(g, 'B', 3, 3, 12, 4);
      // Joint + gold lacing
      paintH(g, 'R', 5, 3, 12);
      paintPoints(g, 'A', [[4,5],[6,5],[8,5],[10,5],[12,5]]);
      // Lame 2
      paintRect(g, 'B', 3, 6, 12, 7);
      // Joint + gold lacing
      paintH(g, 'R', 8, 3, 12);
      paintPoints(g, 'A', [[3,8],[5,8],[7,8],[9,8],[11,8]]);
      // Lame 3
      paintRect(g, 'B', 3, 9, 12, 10);
      // Obi belt
      paintH(g, 'P', 11, 4, 11);
      paintH(g, 'P', 12, 5, 10);
    },
  ),

  // ── 14. GLADIATOR HARNESS ────────────────────────────────────
  // Minimal: crossing straps with center plate, most open space
  makeTemplate('gladiator_harness_16',
    'Minimal gladiator harness with crossing leather straps and brass center boss.',
    ARMOR_CHARS,
    { body: C.leather, head: C.darkLeather, accessory: C.brass, arm: C.darkLeather, belt: C.leather },
    (g) => {
      // Left strap diagonal
      paintPoints(g, 'B', [[4,2],[5,3],[6,4],[7,5]]);
      // Right strap diagonal
      paintPoints(g, 'B', [[11,2],[10,3],[9,4],[8,5]]);
      // Center plate
      paintRect(g, 'H', 6, 5, 9, 8);
      // Brass boss
      paintPoints(g, 'A', [[7,6],[8,6],[7,7],[8,7]]);
      // Lower straps (X continues)
      paintPoints(g, 'B', [[6,9],[5,10],[4,11]]);
      paintPoints(g, 'B', [[9,9],[10,10],[11,11]]);
      // Horizontal strap
      paintH(g, 'R', 9, 5, 10);
      // Belt
      paintH(g, 'P', 10, 4, 11);
    },
  ),

  // ── 15. ROYAL ROBE ARMOR ─────────────────────────────────────
  // Long flowing robe with fur collar, extends to row 13
  makeTemplate('royal_robe_plate_16',
    'Royal armored robe with fur collar, gold inserts, and flowing hem.',
    ARMOR_CHARS,
    { body: C.purple, head: C.bone, accessory: C.gold, arm: C.purple, belt: C.gold },
    (g) => {
      // Fur collar
      paintH(g, 'H', 1, 5, 10);
      paintH(g, 'H', 2, 5, 10);
      // Shoulder line
      paintH(g, 'B', 3, 4, 11);
      // Long robe body (rows 4-13)
      paintRect(g, 'B', 4, 4, 11, 13);
      // Gold chest plate inserts
      paintRect(g, 'A', 6, 4, 9, 6);
      // Belt sash
      paintH(g, 'P', 8, 4, 11);
      // Hem widens at bottom
      paintH(g, 'B', 12, 3, 12);
      paintH(g, 'B', 13, 3, 12);
      // Side trim + front seam
      paintV(g, 'R', 4, 4, 13);
      paintV(g, 'R', 11, 4, 13);
      paintV(g, 'R', 7, 9, 13);
    },
  ),

  // ── 16. RANGER TUNIC ─────────────────────────────────────────
  // Simple tunic, green, moderate size with flared bottom
  makeTemplate('ranger_tunic_16',
    'Simple ranger tunic in forest green with leather belt and leaf clasp.',
    ARMOR_CHARS,
    { body: C.green, head: C.darkLeather, accessory: C.brass, arm: C.darkLeather, belt: C.leather },
    (g) => {
      // Low collar
      paintH(g, 'H', 3, 6, 9);
      // Tunic body (rows 4-10)
      paintRect(g, 'B', 5, 4, 10, 10);
      // Flared bottom
      paintH(g, 'B', 10, 4, 11);
      paintH(g, 'B', 11, 4, 11);
      // Seams
      paintV(g, 'R', 5, 4, 10);
      paintV(g, 'R', 10, 4, 10);
      // Front opening seam
      paintV(g, 'R', 7, 4, 7);
      // Leaf clasp
      paintPoints(g, 'A', [[7,3],[8,3]]);
      // Belt
      paintH(g, 'P', 8, 5, 10);
      paintPoints(g, 'A', [[7,8]]);
    },
  ),

  // ── 17. FIRE FORGED PLATE ────────────────────────────────────
  // Dark iron with branching fire rune veins
  makeTemplate('fire_forged_plate_16',
    'Dark iron plate with branching fire rune veins and ember-hot joints.',
    ARMOR_CHARS,
    { body: C.darkIron, head: C.shadow, accessory: C.fire, arm: C.fire, belt: C.red },
    (g) => {
      // Dark collar
      paintH(g, 'H', 2, 6, 9);
      // Ember shoulder trim
      paintH(g, 'R', 3, 4, 11);
      // Dark iron body
      paintRect(g, 'B', 4, 4, 11, 9);
      // Fire rune veins (branching V pattern)
      paintPoints(g, 'A', [[7,4],[8,4]]);
      paintPoints(g, 'A', [[6,5],[9,5]]);
      paintPoints(g, 'A', [[5,6],[10,6]]);
      paintPoints(g, 'A', [[6,7],[9,7]]);
      paintPoints(g, 'A', [[7,8],[8,8]]);
      // Ember joints
      paintV(g, 'R', 4, 5, 8);
      paintV(g, 'R', 11, 5, 8);
      // Hot belt
      paintH(g, 'P', 10, 5, 10);
    },
  ),

  // ── 18. ICE CRYSTAL CHEST ────────────────────────────────────
  // Jagged ice spikes at shoulders, frosted surface
  makeTemplate('ice_crystal_chest_16',
    'Ice crystal chest armor with jagged shoulder spikes and frost-white surface.',
    ARMOR_CHARS,
    { body: C.ice, head: C.crystal, accessory: C.bone, arm: C.mithril, belt: C.crystal },
    (g) => {
      // Ice spike shoulders
      paintPoints(g, 'B', [[3,2],[12,2]]);
      paintPoints(g, 'H', [[4,1],[11,1]]);
      // Crystal collar
      paintH(g, 'H', 3, 6, 9);
      // Ice body
      paintRect(g, 'B', 4, 4, 11, 9);
      paintH(g, 'B', 3, 4, 5); paintH(g, 'B', 3, 10, 11);
      // Frost highlights
      paintPoints(g, 'A', [[5,5],[10,5],[6,7],[9,7],[7,9],[8,9]]);
      // Crystal trim
      paintV(g, 'R', 4, 4, 9);
      paintV(g, 'R', 11, 4, 9);
      // Jagged bottom
      paintPoints(g, 'B', [[4,10],[6,10],[8,10],[10,10]]);
      // Frozen belt
      paintH(g, 'P', 10, 5, 9);
    },
  ),

  // ── 19. SHADOW CLOAK ARMOR ───────────────────────────────────
  // Flowing hooded cloak, widest silhouette, hidden plate within
  makeTemplate('shadow_cloak_armor_16',
    'Shadow cloak with hood, hidden armor plates, and purple magic trim.',
    ARMOR_CHARS,
    { body: C.shadow, head: C.darkIron, accessory: C.purple, arm: C.shadow, belt: C.darkIron },
    (g) => {
      // Hood
      paintPoints(g, 'B', [[7,0],[8,0]]);
      paintH(g, 'B', 1, 6, 9);
      paintH(g, 'B', 2, 4, 11);
      // Wide cloak body (rows 3-12)
      paintRect(g, 'B', 3, 3, 12, 12);
      // Hidden plate beneath
      paintRect(g, 'H', 5, 5, 10, 8);
      // Purple magic accents
      paintPoints(g, 'A', [[7,5],[8,5],[7,8],[8,8]]);
      paintV(g, 'A', 4, 6, 10);
      paintV(g, 'A', 11, 6, 10);
      // Flowing bottom
      paintH(g, 'B', 13, 2, 13);
      // Trim edges
      paintV(g, 'R', 3, 3, 12);
      paintV(g, 'R', 12, 3, 12);
      // Belt barely visible
      paintH(g, 'P', 9, 5, 10);
    },
  ),

  // ── 20. HOLY KNIGHT CUIRASS ──────────────────────────────────
  // Bright plate with large golden cross emblem
  makeTemplate('holy_knight_cuirass_16',
    'Holy knight cuirass with bright steel and prominent golden cross emblem.',
    ARMOR_CHARS,
    { body: C.iron, head: C.darkIron, accessory: C.holy, arm: C.gold, belt: C.leather },
    (g) => {
      // Gorget collar
      paintH(g, 'H', 2, 5, 10);
      // Gold shoulder trim
      paintH(g, 'R', 3, 4, 11);
      // Bright plate body
      paintRect(g, 'B', 4, 4, 11, 9);
      // Golden cross (prominent)
      paintV(g, 'A', 7, 4, 9);
      paintV(g, 'A', 8, 4, 9);
      paintH(g, 'A', 6, 5, 10);
      paintH(g, 'A', 7, 5, 10);
      // Side trim
      paintV(g, 'R', 4, 4, 9);
      paintV(g, 'R', 11, 4, 9);
      // Belt
      paintH(g, 'P', 10, 5, 10);
      paintH(g, 'P', 11, 6, 9);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'equipment',
  exportNames: {
    templates: 'ARMOR_CHEST_TEMPLATES',
    schemes: 'ARMOR_CHEST_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
