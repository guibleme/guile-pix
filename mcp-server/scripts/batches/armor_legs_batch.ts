/**
 * Armor Legs batch — 20 distinct boots/greaves/leg armor templates.
 * Hand-designed 16x16 pixel art, DB16 palette.
 * Side-view boots with varied shaft heights, toe shapes, and proportions.
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

// Standard roles for all boots/leg armor:
// B = main_material (body), H = detail/toe (head), A = buckle/decoration (accessory),
// R = strap/trim (arm), P = sole (belt)
const BOOT_CHARS = {
  B: { name: 'main_material', role: 'body' },
  H: { name: 'detail', role: 'head' },
  A: { name: 'buckle', role: 'accessory' },
  R: { name: 'strap', role: 'arm' },
  P: { name: 'sole', role: 'belt' },
};

const templates: CompactTemplate[] = [

  // ── 1. IRON PLATE BOOTS ──────────────────────────────────────
  // Medium armored boot, side view: shaft(4-8), ankle(9-10), foot(11-12), sole(13)
  makeTemplate('iron_boots_16',
    'Iron plate boots with armored shin, strap buckle, and dark leather sole.',
    BOOT_CHARS,
    { body: C.iron, head: C.darkIron, accessory: C.brass, arm: C.leather, belt: C.darkIron },
    (g) => {
      // Shaft (rows 3-8, 4px wide)
      paintRect(g, 'B', 6, 3, 9, 8);
      // Cuff trim at top
      paintH(g, 'R', 3, 6, 9);
      // Buckle strap across shin
      paintH(g, 'R', 6, 6, 9);
      paintPoints(g, 'A', [[9,6]]);
      // Ankle widens
      paintRect(g, 'B', 5, 9, 10, 10);
      // Foot extends forward
      paintRect(g, 'B', 4, 11, 11, 12);
      // Toe cap
      paintPoints(g, 'H', [[11,11],[11,12]]);
      // Heel at back
      paintPoints(g, 'H', [[4,11],[4,12]]);
      // Sole
      paintH(g, 'P', 13, 4, 11);
    },
  ),

  // ── 2. BRONZE GREAVES ────────────────────────────────────────
  // Tall greaves from rows 1-10 with knee cap bulge, extends to shin
  makeTemplate('bronze_greaves_16',
    'Tall bronze greaves with knee guard, gold trim bands, and armored sole.',
    BOOT_CHARS,
    { body: C.bronze, head: C.darkIron, accessory: C.gold, arm: C.leather, belt: C.darkIron },
    (g) => {
      // Thigh cuff (rows 1-2)
      paintRect(g, 'B', 6, 1, 9, 2);
      paintH(g, 'R', 1, 6, 9);
      // Knee guard (rows 3-4, wider)
      paintRect(g, 'B', 5, 3, 10, 4);
      paintPoints(g, 'A', [[5,3],[10,3]]); // gold rivets
      // Shin plate (rows 5-8)
      paintRect(g, 'B', 6, 5, 9, 8);
      // Gold trim band
      paintH(g, 'A', 5, 6, 9);
      // Ankle
      paintRect(g, 'B', 5, 9, 10, 10);
      // Foot
      paintRect(g, 'B', 4, 11, 11, 12);
      // Toe and heel
      paintPoints(g, 'H', [[4,11],[4,12],[11,11],[11,12]]);
      // Sole
      paintH(g, 'P', 13, 4, 11);
    },
  ),

  // ── 3. GOLD SABATONS ─────────────────────────────────────────
  // Short shaft, wide articulated foot with 3 toe plates — ornate
  makeTemplate('gold_sabatons_16',
    'Articulated gold sabatons with segmented toe plates and jeweled ankle.',
    BOOT_CHARS,
    { body: C.gold, head: C.brass, accessory: C.red, arm: C.darkIron, belt: C.brass },
    (g) => {
      // Short shaft (rows 5-7)
      paintRect(g, 'B', 5, 5, 9, 7);
      paintH(g, 'R', 5, 5, 9); // cuff
      // Jeweled ankle
      paintPoints(g, 'A', [[7,6]]);
      // Wide ankle
      paintRect(g, 'B', 4, 8, 10, 9);
      // Articulated foot — 3 toe segments
      paintRect(g, 'B', 3, 10, 12, 11);
      paintH(g, 'R', 10, 3, 12); // joint line
      paintRect(g, 'B', 3, 12, 13, 12);
      paintH(g, 'R', 12, 3, 13); // joint line
      // Toe tips
      paintH(g, 'H', 13, 3, 13);
      // Heel
      paintPoints(g, 'H', [[3,10],[3,11]]);
      // Sole
      paintH(g, 'P', 14, 3, 13);
    },
  ),

  // ── 4. LEATHER ADVENTURE BOOTS ───────────────────────────────
  // Medium with fold-down cuff and lace holes
  makeTemplate('leather_boots_16',
    'Leather adventure boots with fold cuff, lace holes, and dark stitching.',
    BOOT_CHARS,
    { body: C.leather, head: C.darkLeather, accessory: C.brass, arm: C.darkLeather, belt: C.darkIron },
    (g) => {
      // Fold-down cuff (rows 3-4)
      paintRect(g, 'H', 5, 3, 10, 4);
      // Shaft (rows 5-9)
      paintRect(g, 'B', 6, 5, 9, 9);
      // Lace holes down front
      paintPoints(g, 'A', [[9,5],[9,6],[9,7],[9,8]]);
      // Stitching on back
      paintV(g, 'R', 6, 5, 9);
      // Ankle
      paintRect(g, 'B', 5, 10, 10, 10);
      // Foot
      paintRect(g, 'B', 4, 11, 11, 12);
      // Rounded toe
      paintPoints(g, 'B', [[12,11],[12,12]]);
      // Heel
      paintPoints(g, 'H', [[4,11],[4,12]]);
      // Sole
      paintH(g, 'P', 13, 4, 12);
    },
  ),

  // ── 5. FULL PLATE GREAVES ────────────────────────────────────
  // Tallest — full leg coverage from thigh to foot, articulated knee
  makeTemplate('plate_greaves_16',
    'Full plate greaves with thigh guard, articulated knee joint, and steel sole.',
    BOOT_CHARS,
    { body: C.iron, head: C.darkIron, accessory: C.gold, arm: C.chain, belt: C.darkIron },
    (g) => {
      // Thigh plate (rows 0-3)
      paintRect(g, 'B', 6, 0, 9, 3);
      paintH(g, 'R', 0, 6, 9); // top cuff
      // Knee joint (row 4, articulated gap)
      paintH(g, 'H', 4, 5, 10);
      paintPoints(g, 'A', [[7,4]]); // gold rivet
      // Shin plate (rows 5-8)
      paintRect(g, 'B', 5, 5, 10, 8);
      // Gold trim
      paintH(g, 'A', 5, 5, 10);
      // Ankle (rows 9-10)
      paintRect(g, 'B', 5, 9, 10, 10);
      // Foot (rows 11-12)
      paintRect(g, 'B', 4, 11, 11, 12);
      // Toe and heel caps
      paintPoints(g, 'H', [[4,11],[4,12],[11,11],[11,12]]);
      // Sole
      paintH(g, 'P', 13, 4, 11);
    },
  ),

  // ── 6. CHAINMAIL LEGGINGS ────────────────────────────────────
  // Wider, loose-fitting chain with texture dots
  makeTemplate('chain_leggings_16',
    'Chainmail leggings with loose-fit chain texture and iron ankle cuff.',
    BOOT_CHARS,
    { body: C.chain, head: C.darkIron, accessory: C.iron, arm: C.darkIron, belt: C.darkIron },
    (g) => {
      // Wide shaft (5px wide, rows 2-8)
      paintRect(g, 'B', 5, 2, 10, 8);
      // Top cuff
      paintH(g, 'R', 2, 5, 10);
      // Chain texture (checkerboard dots)
      paintPoints(g, 'A', [[6,3],[8,3],[10,3]]);
      paintPoints(g, 'A', [[5,5],[7,5],[9,5]]);
      paintPoints(g, 'A', [[6,7],[8,7],[10,7]]);
      // Iron ankle cuff
      paintRect(g, 'H', 5, 9, 10, 10);
      // Foot
      paintRect(g, 'B', 4, 11, 11, 12);
      // Simple leather sole
      paintH(g, 'P', 13, 4, 11);
    },
  ),

  // ── 7. CRYSTAL BOOTS ─────────────────────────────────────────
  // Angular with pointed toe, crystal spikes at ankle
  makeTemplate('crystal_boots_16',
    'Crystal boots with angular pointed toe, ankle spikes, and frost shimmer.',
    BOOT_CHARS,
    { body: C.crystal, head: C.ice, accessory: C.bone, arm: C.mithril, belt: C.darkIron },
    (g) => {
      // Crystal spikes at ankle
      paintPoints(g, 'H', [[4,4],[11,3]]);
      // Medium shaft (rows 4-8)
      paintRect(g, 'B', 5, 4, 10, 8);
      // Trim
      paintH(g, 'R', 4, 5, 10);
      // Frost shimmer
      paintPoints(g, 'A', [[7,5],[9,7]]);
      // Ankle
      paintRect(g, 'B', 4, 9, 10, 10);
      // Pointed foot (extends far forward)
      paintRect(g, 'B', 4, 11, 11, 11);
      paintRect(g, 'B', 4, 12, 12, 12);
      paintPoints(g, 'B', [[13,12]]); // pointed tip
      // Heel
      paintPoints(g, 'H', [[4,11],[4,12]]);
      // Sole
      paintH(g, 'P', 13, 4, 13);
    },
  ),

  // ── 8. DARK KNIGHT BOOTS ─────────────────────────────────────
  // Angular with back spikes at heel, menacing purple glow
  makeTemplate('dark_boots_16',
    'Dark knight boots with spiked heel, angular shape, and purple glow trim.',
    BOOT_CHARS,
    { body: C.shadow, head: C.darkIron, accessory: C.purple, arm: C.shadow, belt: C.darkIron },
    (g) => {
      // Shaft (rows 3-8)
      paintRect(g, 'B', 5, 3, 9, 8);
      // Purple glow trim at cuff
      paintH(g, 'A', 3, 5, 9);
      // Purple accents
      paintPoints(g, 'A', [[5,6],[9,6]]);
      // Ankle
      paintRect(g, 'B', 4, 9, 10, 10);
      // Foot — angular squared toe
      paintRect(g, 'B', 4, 11, 11, 12);
      // Spiked heel (extends back and up)
      paintPoints(g, 'H', [[3,10],[3,11],[2,9]]);
      // Dark toe cap
      paintPoints(g, 'H', [[11,11],[11,12]]);
      // Sole
      paintH(g, 'P', 13, 3, 11);
      // Spike at heel sole
      paintPoints(g, 'P', [[2,13]]);
    },
  ),

  // ── 9. BONE SHIN GUARDS ──────────────────────────────────────
  // Bone plates strapped on, visible straps between plates
  makeTemplate('bone_shin_guards_16',
    'Bone shin guard plates with visible leather straps and skeletal knee cap.',
    BOOT_CHARS,
    { body: C.bone, head: C.shadow, accessory: C.darkIron, arm: C.leather, belt: C.darkLeather },
    (g) => {
      // Skeletal knee cap (rows 2-3)
      paintRect(g, 'B', 5, 2, 10, 3);
      paintPoints(g, 'A', [[7,2],[8,2]]); // dark eye holes
      // Strap
      paintH(g, 'R', 4, 5, 10);
      // Upper shin plate (rows 5-6)
      paintRect(g, 'B', 6, 5, 9, 6);
      // Strap
      paintH(g, 'R', 7, 5, 10);
      // Lower shin plate (rows 8-9)
      paintRect(g, 'B', 6, 8, 9, 9);
      // Ankle
      paintRect(g, 'B', 5, 10, 10, 10);
      // Foot — bone colored
      paintRect(g, 'B', 4, 11, 11, 12);
      // Dark gaps/joints
      paintPoints(g, 'H', [[4,11],[4,12],[11,11],[11,12]]);
      // Sole
      paintH(g, 'P', 13, 4, 11);
    },
  ),

  // ── 10. DRAGON SCALE BOOTS ───────────────────────────────────
  // Claw-like toe tips, scale texture on shaft
  makeTemplate('dragon_scale_boots_16',
    'Dragon scale boots with claw toe tips and overlapping red scale texture.',
    BOOT_CHARS,
    { body: C.dragon, head: C.darkIron, accessory: C.gold, arm: C.fire, belt: C.darkIron },
    (g) => {
      // Shaft (rows 3-8)
      paintRect(g, 'B', 5, 3, 9, 8);
      // Cuff trim
      paintH(g, 'R', 3, 5, 9);
      // Scale texture (staggered tips)
      paintPoints(g, 'A', [[6,4],[8,4]]);
      paintPoints(g, 'A', [[5,6],[7,6],[9,6]]);
      paintPoints(g, 'A', [[6,8],[8,8]]);
      // Ankle
      paintRect(g, 'B', 4, 9, 10, 10);
      // Foot
      paintRect(g, 'B', 4, 11, 11, 11);
      paintRect(g, 'B', 4, 12, 12, 12);
      // Claw tips at toe (extend forward + down)
      paintPoints(g, 'H', [[12,12],[13,13]]);
      paintPoints(g, 'H', [[11,13]]);
      // Heel
      paintPoints(g, 'H', [[4,12],[3,13]]);
      // Sole
      paintH(g, 'P', 13, 4, 12);
    },
  ),

  // ── 11. MITHRIL GREAVES ──────────────────────────────────────
  // Sleek narrow elegant — only 3px wide shaft, swooping curves
  makeTemplate('mithril_greaves_16',
    'Sleek mithril greaves with narrow elegant profile and teal rune glow.',
    BOOT_CHARS,
    { body: C.mithril, head: C.darkIron, accessory: C.ice, arm: C.iron, belt: C.darkIron },
    (g) => {
      // Narrow shaft (3px wide, rows 2-8)
      paintRect(g, 'B', 6, 2, 9, 8);
      // Elegant flared cuff
      paintH(g, 'R', 2, 5, 10);
      // Teal rune glow
      paintPoints(g, 'A', [[7,4],[8,4],[7,7],[8,7]]);
      // Swooping guard at shin front
      paintPoints(g, 'B', [[10,5],[10,6],[10,7]]);
      // Ankle
      paintRect(g, 'B', 5, 9, 10, 10);
      // Foot
      paintRect(g, 'B', 4, 11, 11, 12);
      // Elegant pointed toe
      paintPoints(g, 'B', [[12,12]]);
      // Heel
      paintPoints(g, 'H', [[4,11],[4,12]]);
      // Sole
      paintH(g, 'P', 13, 4, 12);
    },
  ),

  // ── 12. WOODEN SANDALS ───────────────────────────────────────
  // Minimalist — flat wooden sole + straps going up, NO shaft
  makeTemplate('wooden_sandals_16',
    'Wooden geta sandals with flat platform sole and leather toe strap.',
    BOOT_CHARS,
    { body: C.wood, head: C.darkLeather, accessory: C.leather, arm: C.leather, belt: C.darkIron },
    (g) => {
      // Leather straps up shin (just straps, no solid shaft)
      paintPoints(g, 'R', [[7,4],[8,4]]);
      paintPoints(g, 'R', [[6,5],[9,5]]);
      paintPoints(g, 'R', [[7,6],[8,6]]);
      paintPoints(g, 'R', [[6,7],[9,7]]);
      paintPoints(g, 'R', [[7,8],[8,8]]);
      // Toe strap (horizontal over forefoot)
      paintH(g, 'A', 10, 6, 11);
      // Wooden platform foot
      paintRect(g, 'B', 4, 10, 12, 12);
      // Heel elevated platform
      paintRect(g, 'H', 4, 10, 5, 12);
      // Front edge
      paintPoints(g, 'H', [[12,10],[12,11]]);
      // Dark sole
      paintH(g, 'P', 13, 4, 12);
      // Platform teeth (geta style)
      paintRect(g, 'P', 5, 13, 6, 14);
      paintRect(g, 'P', 9, 13, 10, 14);
    },
  ),

  // ── 13. SAMURAI SUNEATE ──────────────────────────────────────
  // Horizontal plate layers strapped over cloth wrapping
  makeTemplate('samurai_suneate_16',
    'Samurai suneate shin guards with horizontal iron lames and gold lacing.',
    BOOT_CHARS,
    { body: C.darkIron, head: C.iron, accessory: C.gold, arm: C.leather, belt: C.darkIron },
    (g) => {
      // Cloth wrapping base (visible between plates)
      paintRect(g, 'R', 6, 2, 9, 9);
      // Plate lame 1 (top)
      paintRect(g, 'B', 5, 2, 10, 3);
      // Gold lacing
      paintPoints(g, 'A', [[5,4],[10,4]]);
      // Plate lame 2
      paintRect(g, 'B', 5, 5, 10, 6);
      // Gold lacing
      paintPoints(g, 'A', [[5,7],[10,7]]);
      // Plate lame 3
      paintRect(g, 'B', 5, 8, 10, 9);
      // Ankle
      paintRect(g, 'H', 5, 10, 10, 10);
      // Foot (tabi-style)
      paintRect(g, 'B', 4, 11, 11, 12);
      // Split toe (tabi)
      paintPoints(g, 'H', [[8,12]]);
      // Sole
      paintH(g, 'P', 13, 4, 11);
    },
  ),

  // ── 14. GLADIATOR SANDALS ────────────────────────────────────
  // Open-toe, criss-cross straps up calf — minimal coverage
  makeTemplate('gladiator_sandals_16',
    'Gladiator laced sandals with criss-cross leather straps and brass studs.',
    BOOT_CHARS,
    { body: C.leather, head: C.darkLeather, accessory: C.brass, arm: C.red, belt: C.darkIron },
    (g) => {
      // Criss-cross straps up calf
      paintPoints(g, 'B', [[6,2],[9,2]]);
      paintPoints(g, 'B', [[7,3],[8,3]]);
      paintPoints(g, 'B', [[6,4],[9,4]]);
      paintPoints(g, 'B', [[7,5],[8,5]]);
      paintPoints(g, 'B', [[6,6],[9,6]]);
      paintPoints(g, 'B', [[7,7],[8,7]]);
      // Brass studs at strap crossings
      paintPoints(g, 'A', [[7,3],[8,5],[7,7]]);
      // Red cloth accent strap
      paintH(g, 'R', 8, 5, 10);
      // Ankle guard (small)
      paintRect(g, 'B', 5, 9, 10, 10);
      // Open-toe foot (sole + sides, toe area empty)
      paintH(g, 'B', 11, 4, 9);
      paintRect(g, 'B', 4, 11, 5, 12);
      paintH(g, 'H', 12, 4, 11);
      // Toe strap
      paintH(g, 'B', 11, 9, 11);
      // Sole
      paintH(g, 'P', 13, 4, 11);
    },
  ),

  // ── 15. ROYAL BOOTS ──────────────────────────────────────────
  // Medium-tall, ornate gold with jewel at ankle, pointed toe
  makeTemplate('royal_boots_16',
    'Royal gold boots with jeweled ankle clasp and elegant pointed toe.',
    BOOT_CHARS,
    { body: C.gold, head: C.brass, accessory: C.red, arm: C.darkIron, belt: C.brass },
    (g) => {
      // Tall shaft (rows 2-8)
      paintRect(g, 'B', 6, 2, 9, 8);
      // Ornate cuff flare
      paintH(g, 'R', 2, 5, 10);
      paintH(g, 'B', 3, 5, 10);
      // Jewel at ankle
      paintPoints(g, 'A', [[7,8],[8,8]]);
      // Decorative trim lines
      paintPoints(g, 'H', [[9,4],[9,6]]);
      // Ankle
      paintRect(g, 'B', 5, 9, 10, 10);
      // Pointed toe foot
      paintRect(g, 'B', 4, 11, 11, 11);
      paintRect(g, 'B', 4, 12, 12, 12);
      paintPoints(g, 'B', [[13,12]]);
      // Low heel
      paintPoints(g, 'H', [[4,12]]);
      // Sole
      paintH(g, 'P', 13, 4, 13);
    },
  ),

  // ── 16. RANGER SOFT BOOTS ────────────────────────────────────
  // Rounded soft profile, quiet leather, no hard edges
  makeTemplate('ranger_boots_16',
    'Ranger soft leather boots with rounded toe, quiet sole, and forest lacing.',
    BOOT_CHARS,
    { body: C.green, head: C.darkLeather, accessory: C.brass, arm: C.darkLeather, belt: C.darkLeather },
    (g) => {
      // Soft fold cuff (rows 4-5)
      paintH(g, 'H', 4, 6, 9);
      paintH(g, 'H', 5, 6, 9);
      // Medium shaft (rows 6-9)
      paintRect(g, 'B', 6, 6, 9, 9);
      // Forest lacing on front
      paintPoints(g, 'A', [[9,6],[9,7],[9,8]]);
      // Stitching
      paintV(g, 'R', 6, 6, 9);
      // Ankle (rounded)
      paintH(g, 'B', 10, 5, 10);
      // Foot (rounded, no harsh toe)
      paintRect(g, 'B', 4, 11, 11, 11);
      paintH(g, 'B', 12, 5, 10);
      // Quiet padded sole (thin)
      paintH(g, 'P', 12, 4, 11);
      paintH(g, 'P', 13, 5, 10);
    },
  ),

  // ── 17. FIRE BOOTS ───────────────────────────────────────────
  // Dark iron with flame wisps above the shaft opening
  makeTemplate('fire_boots_16',
    'Fire-enchanted boots with dark iron body and flame wisps at the cuff.',
    BOOT_CHARS,
    { body: C.darkIron, head: C.fire, accessory: C.fire, arm: C.red, belt: C.darkIron },
    (g) => {
      // Flame wisps above shaft (flickering)
      paintPoints(g, 'H', [[6,1],[8,0],[10,1]]);
      paintPoints(g, 'A', [[7,2],[9,2]]);
      // Shaft (rows 3-8)
      paintRect(g, 'B', 6, 3, 9, 8);
      // Fire strap trim
      paintH(g, 'R', 3, 6, 9);
      paintH(g, 'R', 6, 6, 9);
      // Ember accents on shaft
      paintPoints(g, 'A', [[6,5],[9,5]]);
      // Ankle
      paintRect(g, 'B', 5, 9, 10, 10);
      // Foot
      paintRect(g, 'B', 4, 11, 11, 12);
      // Toe and heel
      paintPoints(g, 'H', [[4,11],[4,12],[11,11]]);
      // Sole (ember glow)
      paintH(g, 'P', 13, 4, 11);
    },
  ),

  // ── 18. ICE BOOTS ────────────────────────────────────────────
  // Frost spikes around ankle, icy surface
  makeTemplate('ice_boots_16',
    'Ice crystal boots with frost spikes at ankle and frozen blue surface.',
    BOOT_CHARS,
    { body: C.ice, head: C.crystal, accessory: C.bone, arm: C.mithril, belt: C.darkIron },
    (g) => {
      // Shaft (rows 3-7)
      paintRect(g, 'B', 6, 3, 9, 7);
      // Crystal cuff
      paintH(g, 'R', 3, 6, 9);
      // Frost shimmer
      paintPoints(g, 'A', [[7,5],[8,5]]);
      // Ankle with frost spikes radiating outward
      paintRect(g, 'B', 5, 8, 10, 9);
      paintPoints(g, 'H', [[4,7],[11,7],[3,8],[12,8]]); // spikes
      // Foot
      paintRect(g, 'B', 4, 10, 11, 12);
      // Icy toe
      paintPoints(g, 'H', [[11,10],[12,11]]);
      // Frost on heel
      paintPoints(g, 'H', [[4,10],[3,11]]);
      // Sole
      paintH(g, 'P', 13, 3, 12);
    },
  ),

  // ── 19. SHADOW BOOTS ─────────────────────────────────────────
  // Very sleek narrow, dagger-like pointed toe, low profile
  makeTemplate('shadow_boots_16',
    'Shadow assassin boots with ultra-sleek profile and dagger-pointed toe.',
    BOOT_CHARS,
    { body: C.shadow, head: C.darkIron, accessory: C.purple, arm: C.shadow, belt: C.darkIron },
    (g) => {
      // Thin shaft (3px wide, rows 5-9)
      paintRect(g, 'B', 6, 5, 8, 9);
      // Purple trim at cuff
      paintH(g, 'A', 5, 6, 8);
      // Sleek stitch line
      paintV(g, 'H', 7, 6, 9);
      // Narrow ankle
      paintH(g, 'B', 10, 5, 9);
      // Foot — dagger-pointed
      paintRect(g, 'B', 4, 11, 10, 11);
      paintH(g, 'B', 12, 4, 11);
      paintH(g, 'B', 12, 12, 13);
      paintPoints(g, 'B', [[14,12]]); // dagger tip
      // Heel (minimal)
      paintPoints(g, 'H', [[4,11],[4,12]]);
      // Thin sole
      paintH(g, 'P', 13, 4, 14);
    },
  ),

  // ── 20. HOLY GREAVES ─────────────────────────────────────────
  // Tall bright steel with gold cross on shin plate
  makeTemplate('holy_greaves_16',
    'Holy knight greaves with bright steel, gold cross on shin, and blessed sole.',
    BOOT_CHARS,
    { body: C.iron, head: C.gold, accessory: C.holy, arm: C.gold, belt: C.darkIron },
    (g) => {
      // Tall shaft (rows 1-8)
      paintRect(g, 'B', 5, 1, 10, 8);
      // Top cuff
      paintH(g, 'R', 1, 5, 10);
      // Gold cross on shin
      paintV(g, 'H', 7, 3, 7);
      paintV(g, 'H', 8, 3, 7);
      paintH(g, 'H', 5, 6, 9);
      // Holy glow accents
      paintPoints(g, 'A', [[5,4],[10,4],[5,7],[10,7]]);
      // Ankle
      paintRect(g, 'B', 4, 9, 10, 10);
      // Foot
      paintRect(g, 'B', 4, 11, 11, 12);
      // Toe and heel
      paintPoints(g, 'H', [[4,11],[4,12],[11,11],[11,12]]);
      // Sole
      paintH(g, 'P', 13, 4, 11);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'equipment',
  exportNames: {
    templates: 'ARMOR_LEGS_TEMPLATES',
    schemes: 'ARMOR_LEGS_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
