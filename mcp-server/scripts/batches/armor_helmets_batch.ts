/**
 * Armor Helmets batch — 20 distinct helmet/headgear templates.
 * Hand-designed 16x16 pixel art, DB16 palette.
 * Each helmet has a unique, recognizable silhouette.
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
  iron:       { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  darkIron:   { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  bronze:     { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  gold:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  leather:    { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  darkLeather:{ shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
  wood:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  crystal:    { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
  ice:        { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  bone:       { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  dragon:     { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  mithril:    { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  shadow:     { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  fire:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  holy:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  chain:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  red:        { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  green:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  purple:     { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
  brass:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
};

// Standard roles for ALL armor:
// B = main_plate (body), H = opening/visor (head), A = decoration (accessory),
// R = trim/band (arm), P = padding/lining (belt)
const ARMOR_CHARS = {
  B: { name: 'main_plate', role: 'body' },
  H: { name: 'opening', role: 'head' },
  A: { name: 'decoration', role: 'accessory' },
  R: { name: 'trim', role: 'arm' },
  P: { name: 'padding', role: 'belt' },
};

const templates: CompactTemplate[] = [

  // ── 1. IRON CLOSED HELM ─────────────────────────────────────
  // Classic knight helm: rounded dome, horizontal visor slit, cheek guards
  makeTemplate('iron_closed_helm_16',
    'Classic iron closed helm with rounded dome and horizontal visor slit.',
    ARMOR_CHARS,
    { body: C.iron, head: C.darkIron, accessory: C.brass, arm: C.chain, belt: C.leather },
    (g) => {
      // Crest rivet
      paintPoints(g, 'A', [[7,1],[8,1]]);
      // Dome (rows 2-5)
      paintH(g, 'B', 2, 6, 9);
      paintH(g, 'B', 3, 5, 10);
      paintH(g, 'B', 4, 4, 11);
      paintH(g, 'B', 5, 4, 11);
      // Face plate + visor (rows 6-8)
      paintH(g, 'B', 6, 4, 11);
      paintH(g, 'H', 7, 5, 10);  // visor slit
      paintPoints(g, 'B', [[4,7],[11,7]]);  // side walls
      paintH(g, 'B', 8, 4, 11);
      // Chin trim band
      paintH(g, 'R', 9, 5, 10);
      // Padding visible at bottom
      paintH(g, 'P', 10, 6, 9);
    },
  ),

  // ── 2. BRONZE BARBUTE ───────────────────────────────────────
  // Barbute: tall dome, T-shaped face opening
  makeTemplate('bronze_barbute_16',
    'Bronze barbute helmet with tall dome and T-shaped face opening.',
    ARMOR_CHARS,
    { body: C.bronze, head: C.darkIron, accessory: C.gold, arm: C.brass, belt: C.leather },
    (g) => {
      // Tall dome
      paintH(g, 'B', 1, 7, 8);
      paintH(g, 'B', 2, 6, 9);
      paintH(g, 'B', 3, 5, 10);
      paintH(g, 'B', 4, 4, 11);
      paintH(g, 'B', 5, 4, 11);
      // T-shaped face opening (rows 6-9)
      paintH(g, 'B', 6, 4, 5); paintH(g, 'H', 6, 6, 9); paintH(g, 'B', 6, 10, 11);
      paintH(g, 'B', 7, 4, 5); paintPoints(g, 'H', [[7,7],[8,7]]); paintH(g, 'B', 7, 9, 11);
      paintPoints(g, 'B', [[6,7],[9,7]]); // nose bridge sides
      paintH(g, 'B', 8, 4, 6); paintPoints(g, 'H', [[7,8],[8,8]]); paintH(g, 'B', 8, 9, 11);
      paintH(g, 'B', 9, 4, 11);
      // Gold accent band
      paintH(g, 'A', 10, 5, 10);
      // Padding
      paintH(g, 'P', 11, 6, 9);
    },
  ),

  // ── 3. GOLD CROWN HELM ──────────────────────────────────────
  // Helm with 3 crown points rising from the dome
  makeTemplate('gold_crown_helm_16',
    'Gold crown helmet with three ornamental spikes and jeweled band.',
    ARMOR_CHARS,
    { body: C.gold, head: C.darkIron, accessory: C.red, arm: C.brass, belt: C.leather },
    (g) => {
      // Crown points (3 spikes)
      paintPoints(g, 'B', [[5,1],[8,0],[10,1]]);
      paintPoints(g, 'B', [[5,2],[8,1],[10,2]]);
      // Crown band with jewels
      paintH(g, 'B', 3, 4, 11);
      paintPoints(g, 'A', [[5,3],[8,3],[10,3]]); // jewels
      // Dome below crown
      paintH(g, 'B', 4, 4, 11);
      paintH(g, 'B', 5, 4, 11);
      paintH(g, 'B', 6, 4, 11);
      // Visor slit
      paintH(g, 'H', 7, 5, 10);
      paintPoints(g, 'B', [[4,7],[11,7]]);
      // Cheek guards
      paintH(g, 'B', 8, 4, 11);
      paintH(g, 'R', 9, 5, 10);
      paintH(g, 'P', 10, 6, 9);
    },
  ),

  // ── 4. LEATHER ADVENTURER CAP ───────────────────────────────
  // Soft rounded leather cap with brim and ear flaps
  makeTemplate('leather_adventurer_cap_16',
    'Soft leather adventurer cap with short brim and ear flaps.',
    ARMOR_CHARS,
    { body: C.leather, head: C.darkLeather, accessory: C.brass, arm: C.wood, belt: C.darkLeather },
    (g) => {
      // Rounded top
      paintH(g, 'B', 2, 6, 9);
      paintH(g, 'B', 3, 5, 10);
      paintH(g, 'B', 4, 4, 11);
      paintH(g, 'B', 5, 4, 11);
      // Brim extending forward
      paintH(g, 'R', 6, 3, 12);
      // Buckle on side
      paintPoints(g, 'A', [[3,6],[12,6]]);
      // Ear flaps hanging down
      paintV(g, 'B', 4, 7, 9);
      paintV(g, 'B', 5, 7, 8);
      paintV(g, 'B', 10, 7, 8);
      paintV(g, 'B', 11, 7, 9);
      // Open face area
      paintRect(g, 'H', 6, 7, 9, 9);
      // Stitching line
      paintH(g, 'P', 10, 5, 10);
    },
  ),

  // ── 5. CRYSTAL CIRCLET ──────────────────────────────────────
  // Thin elegant circlet with 3 crystal spikes
  makeTemplate('crystal_circlet_16',
    'Elegant crystal circlet with three luminous crystal spikes.',
    ARMOR_CHARS,
    { body: C.iron, head: C.crystal, accessory: C.ice, arm: C.mithril, belt: C.crystal },
    (g) => {
      // Crystal spikes
      paintPoints(g, 'H', [[5,2],[8,1],[10,2]]);
      paintPoints(g, 'H', [[5,3],[8,2],[10,3]]);
      // Glow accents
      paintPoints(g, 'A', [[4,3],[7,1],[11,3]]);
      // Circlet band
      paintH(g, 'B', 4, 4, 11);
      paintH(g, 'R', 5, 4, 11);
      // Thin frame wrapping down sides
      paintPoints(g, 'B', [[4,5],[4,6],[11,5],[11,6]]);
      // Face opening (empty — it's a circlet)
      paintH(g, 'P', 6, 5, 10);
    },
  ),

  // ── 6. VIKING HORN HELM ─────────────────────────────────────
  // Round bowl helm with two curving horns
  makeTemplate('viking_horn_helm_16',
    'Viking iron helm with two curving horns and nose guard.',
    ARMOR_CHARS,
    { body: C.iron, head: C.darkIron, accessory: C.bone, arm: C.chain, belt: C.leather },
    (g) => {
      // Horns curving outward
      paintPoints(g, 'A', [[2,2],[3,3],[13,2],[12,3]]);
      paintPoints(g, 'A', [[1,1],[14,1]]);  // horn tips
      // Dome
      paintH(g, 'B', 3, 5, 10);
      paintH(g, 'B', 4, 4, 11);
      paintH(g, 'B', 5, 4, 11);
      paintH(g, 'B', 6, 4, 11);
      // Nose guard descending
      paintPoints(g, 'R', [[7,7],[8,7],[7,8],[8,8]]);
      // Face opening on sides
      paintPoints(g, 'H', [[5,7],[6,7],[9,7],[10,7]]);
      paintPoints(g, 'H', [[5,8],[6,8],[9,8],[10,8]]);
      // Side walls
      paintPoints(g, 'B', [[4,7],[11,7],[4,8],[11,8]]);
      // Rim band
      paintH(g, 'R', 9, 5, 10);
      // Padding
      paintH(g, 'P', 10, 6, 9);
    },
  ),

  // ── 7. STEEL GREAT HELM ─────────────────────────────────────
  // Tall flat-topped helm with cross-shaped visor slit
  makeTemplate('steel_great_helm_16',
    'Imposing steel great helm with flat top and cross visor.',
    ARMOR_CHARS,
    { body: C.iron, head: C.darkIron, accessory: C.gold, arm: C.chain, belt: C.leather },
    (g) => {
      // Flat top
      paintH(g, 'R', 1, 5, 10);
      // Tall rectangular body
      paintRect(g, 'B', 4, 2, 11, 9);
      // Cross visor (horizontal + vertical slit)
      paintH(g, 'H', 6, 5, 10);  // horizontal slit
      paintV(g, 'H', 7, 5, 8);   // vertical slit left
      paintV(g, 'H', 8, 5, 8);   // vertical slit right
      // Gold rivets at corners
      paintPoints(g, 'A', [[4,2],[11,2],[4,9],[11,9]]);
      // Chin trim
      paintH(g, 'R', 10, 5, 10);
      // Padding
      paintH(g, 'P', 11, 6, 9);
    },
  ),

  // ── 8. BARBARIAN HEADBAND ───────────────────────────────────
  // Wide leather headband with metal studs across forehead
  makeTemplate('barbarian_headband_16',
    'Thick leather headband with bronze studs and fur trim.',
    ARMOR_CHARS,
    { body: C.leather, head: C.darkLeather, accessory: C.brass, arm: C.bone, belt: C.darkLeather },
    (g) => {
      // Fur trim on top
      paintPoints(g, 'R', [[4,3],[6,2],[8,3],[10,2],[12,3]]);
      // Thick headband (3px tall)
      paintH(g, 'B', 4, 3, 12);
      paintH(g, 'B', 5, 3, 12);
      paintH(g, 'B', 6, 3, 12);
      // Metal studs across center
      paintPoints(g, 'A', [[4,5],[6,5],[8,5],[10,5],[12,5]]);
      // Ties hanging down on sides
      paintV(g, 'H', 3, 7, 9);
      paintV(g, 'H', 12, 7, 9);
      // Knot detail
      paintPoints(g, 'P', [[3,10],[12,10]]);
    },
  ),

  // ── 9. MAGE WIZARD HAT ─────────────────────────────────────
  // Pointed wizard hat with buckled band
  makeTemplate('mage_wizard_hat_16',
    'Pointed mage hat with star buckle and wide brim.',
    ARMOR_CHARS,
    { body: C.purple, head: C.shadow, accessory: C.gold, arm: C.mithril, belt: C.purple },
    (g) => {
      // Point at top
      paintPoints(g, 'B', [[8,0],[8,1]]);
      // Cone narrowing from top
      paintH(g, 'B', 2, 7, 9);
      paintH(g, 'B', 3, 7, 9);
      paintH(g, 'B', 4, 6, 10);
      paintH(g, 'B', 5, 6, 10);
      paintH(g, 'B', 6, 5, 11);
      paintH(g, 'B', 7, 5, 11);
      // Band with star buckle
      paintH(g, 'R', 8, 5, 11);
      paintPoints(g, 'A', [[8,8]]);  // star buckle
      // Wide brim
      paintH(g, 'H', 9, 3, 13);
      paintH(g, 'H', 10, 4, 12);
      // Shadow under brim
      paintH(g, 'P', 11, 5, 11);
    },
  ),

  // ── 10. BONE SKULL HELM ─────────────────────────────────────
  // Skull-shaped helmet made of bone, hollow eye sockets
  makeTemplate('bone_skull_helm_16',
    'Menacing bone skull helm with hollow eye sockets and jaw guard.',
    ARMOR_CHARS,
    { body: C.bone, head: C.shadow, accessory: C.darkIron, arm: C.bone, belt: C.darkLeather },
    (g) => {
      // Skull dome
      paintH(g, 'B', 1, 6, 9);
      paintH(g, 'B', 2, 5, 10);
      paintH(g, 'B', 3, 4, 11);
      paintH(g, 'B', 4, 4, 11);
      // Brow ridge
      paintH(g, 'A', 5, 4, 11);
      // Eye sockets (hollow)
      paintPoints(g, 'H', [[5,6],[6,6],[9,6],[10,6]]);
      paintPoints(g, 'B', [[7,6],[8,6]]);  // nose bridge
      paintPoints(g, 'B', [[4,6],[11,6]]); // side walls
      // Nose hole
      paintH(g, 'B', 7, 4, 11);
      paintPoints(g, 'H', [[7,7],[8,7]]);
      // Jaw / teeth
      paintH(g, 'B', 8, 4, 11);
      paintH(g, 'R', 9, 5, 10); // teeth ridge
      paintPoints(g, 'H', [[6,9],[8,9],[10,9]]); // tooth gaps
      paintH(g, 'P', 10, 6, 9);
    },
  ),

  // ── 11. DRAGON SCALE HELM ───────────────────────────────────
  // Helm covered in overlapping dragon scales with horn crest
  makeTemplate('dragon_scale_helm_16',
    'Dragon scale helmet with ridge crest and overlapping red scales.',
    ARMOR_CHARS,
    { body: C.dragon, head: C.darkIron, accessory: C.gold, arm: C.fire, belt: C.leather },
    (g) => {
      // Ridge crest (3 small spikes)
      paintPoints(g, 'A', [[7,0],[8,0],[7,1],[8,1]]);
      // Scaled dome
      paintH(g, 'B', 2, 6, 9);
      paintH(g, 'B', 3, 5, 10);
      // Scale pattern (staggered)
      paintH(g, 'B', 4, 4, 11);
      paintPoints(g, 'R', [[5,4],[7,4],[9,4],[11,4]]); // scale edges
      paintH(g, 'B', 5, 4, 11);
      paintPoints(g, 'R', [[4,5],[6,5],[8,5],[10,5]]); // offset row
      paintH(g, 'B', 6, 4, 11);
      // Visor slit
      paintH(g, 'H', 7, 5, 10);
      paintPoints(g, 'B', [[4,7],[11,7]]);
      // Jaw guard
      paintH(g, 'B', 8, 4, 11);
      paintH(g, 'B', 9, 5, 10);
      paintH(g, 'P', 10, 6, 9);
    },
  ),

  // ── 12. DARK KNIGHT HELM ────────────────────────────────────
  // Angular, menacing helm with glowing purple visor
  makeTemplate('dark_knight_helm_16',
    'Angular dark knight helm with menacing purple visor glow.',
    ARMOR_CHARS,
    { body: C.shadow, head: C.purple, accessory: C.darkIron, arm: C.shadow, belt: C.darkLeather },
    (g) => {
      // Angular peak
      paintPoints(g, 'B', [[7,1],[8,1]]);
      paintH(g, 'B', 2, 6, 9);
      // Angular dome (wider at bottom)
      paintH(g, 'B', 3, 5, 10);
      paintH(g, 'B', 4, 4, 11);
      paintH(g, 'B', 5, 3, 12);
      paintH(g, 'B', 6, 3, 12);
      // Glowing visor — narrow angular slit
      paintH(g, 'H', 7, 4, 11);
      paintPoints(g, 'B', [[3,7],[12,7]]);
      // Jaw plate (angular inward)
      paintH(g, 'B', 8, 4, 11);
      paintH(g, 'B', 9, 5, 10);
      // Dark rivets
      paintPoints(g, 'A', [[3,5],[12,5],[3,6],[12,6]]);
      // Neck guard
      paintH(g, 'R', 10, 5, 10);
      paintH(g, 'P', 11, 6, 9);
    },
  ),

  // ── 13. SAMURAI KABUTO ──────────────────────────────────────
  // Wide helmet with shikoro (neck flaps) and maedate (front crest)
  makeTemplate('samurai_kabuto_16',
    'Samurai kabuto with wide shikoro neck guard and golden maedate crest.',
    ARMOR_CHARS,
    { body: C.darkIron, head: C.shadow, accessory: C.gold, arm: C.iron, belt: C.leather },
    (g) => {
      // Maedate (front crest) — crescent moon shape
      paintPoints(g, 'A', [[6,0],[7,1],[8,1],[9,0]]);
      // Bowl
      paintH(g, 'B', 2, 5, 10);
      paintH(g, 'B', 3, 4, 11);
      paintH(g, 'B', 4, 4, 11);
      // Hachimanza (top plate seam)
      paintH(g, 'R', 3, 5, 10);
      // Face opening
      paintH(g, 'B', 5, 4, 11);
      paintH(g, 'H', 6, 5, 10);
      paintPoints(g, 'B', [[4,6],[11,6]]);
      // Wide shikoro (neck guard flaps) — extends beyond helmet
      paintH(g, 'B', 7, 3, 12);
      paintH(g, 'B', 8, 2, 13);
      paintH(g, 'B', 9, 2, 13);
      // Shikoro lacing detail
      paintPoints(g, 'A', [[3,8],[5,8],[7,8],[9,8],[11,8],[13,8]]);
      // Padding
      paintH(g, 'P', 10, 4, 11);
    },
  ),

  // ── 14. ROMAN GALEA ─────────────────────────────────────────
  // Round helmet with red crest plume on top, cheek guards
  makeTemplate('roman_galea_16',
    'Roman galea helmet with red horsehair crest and cheek guards.',
    ARMOR_CHARS,
    { body: C.bronze, head: C.darkIron, accessory: C.red, arm: C.brass, belt: C.leather },
    (g) => {
      // Red crest plume (tall, narrow, center)
      paintV(g, 'A', 7, 0, 3);
      paintV(g, 'A', 8, 0, 3);
      // Dome
      paintH(g, 'B', 4, 5, 10);
      paintH(g, 'B', 5, 4, 11);
      paintH(g, 'B', 6, 4, 11);
      // Brow band
      paintH(g, 'R', 7, 4, 11);
      // Cheek guards hanging down
      paintPoints(g, 'B', [[4,8],[5,8],[10,8],[11,8]]);
      paintPoints(g, 'B', [[4,9],[5,9],[10,9],[11,9]]);
      // Face opening between cheek guards
      paintRect(g, 'H', 6, 8, 9, 9);
      // Chin strap
      paintH(g, 'P', 10, 5, 10);
    },
  ),

  // ── 15. ROYAL JEWELED CROWN ─────────────────────────────────
  // Wide ornate crown with jewels — not a helmet, a crown
  makeTemplate('royal_jeweled_crown_16',
    'Ornate royal crown with ruby and sapphire jewels on golden frame.',
    ARMOR_CHARS,
    { body: C.gold, head: C.red, accessory: C.crystal, arm: C.brass, belt: C.gold },
    (g) => {
      // Crown points (5 spikes)
      paintPoints(g, 'B', [[3,2],[5,1],[8,0],[10,1],[12,2]]);
      paintPoints(g, 'B', [[3,3],[5,2],[8,1],[10,2],[12,3]]);
      // Crown body band
      paintH(g, 'B', 4, 3, 12);
      paintH(g, 'B', 5, 3, 12);
      paintH(g, 'B', 6, 3, 12);
      // Jewels inset in band
      paintPoints(g, 'H', [[5,5],[8,5]]);   // rubies
      paintPoints(g, 'A', [[11,5]]);         // sapphire
      // Lower rim band
      paintH(g, 'R', 7, 3, 12);
      // Velvet lining visible inside
      paintH(g, 'P', 8, 4, 11);
      paintH(g, 'P', 9, 5, 10);
    },
  ),

  // ── 16. CHAINMAIL COIF ──────────────────────────────────────
  // Chainmail hood that covers head and drapes to shoulders
  makeTemplate('chainmail_coif_16',
    'Chainmail coif hood with rings texture draping to shoulders.',
    ARMOR_CHARS,
    { body: C.chain, head: C.darkIron, accessory: C.iron, arm: C.chain, belt: C.darkIron },
    (g) => {
      // Rounded top
      paintH(g, 'B', 2, 6, 9);
      paintH(g, 'B', 3, 5, 10);
      paintH(g, 'B', 4, 4, 11);
      paintH(g, 'B', 5, 4, 11);
      // Chain texture (alternating dots)
      paintPoints(g, 'A', [[5,3],[7,3],[9,3],[5,5],[7,5],[9,5]]);
      // Face opening
      paintH(g, 'B', 6, 4, 5); paintRect(g, 'H', 6, 6, 9, 8); paintH(g, 'B', 6, 10, 11);
      paintH(g, 'B', 7, 4, 5); paintH(g, 'B', 7, 10, 11);
      paintH(g, 'B', 8, 4, 5); paintH(g, 'B', 8, 10, 11);
      // Draping to shoulders (wider)
      paintH(g, 'B', 9, 3, 12);
      paintH(g, 'R', 10, 2, 13);
      // Bottom fringe
      paintPoints(g, 'P', [[3,11],[5,11],[7,11],[9,11],[11,11]]);
    },
  ),

  // ── 17. MITHRIL WINGED HELM ─────────────────────────────────
  // Sleek elvish helm with wing decorations on sides
  makeTemplate('mithril_winged_helm_16',
    'Sleek mithril helm with silver wing decorations and teal glow.',
    ARMOR_CHARS,
    { body: C.mithril, head: C.darkIron, accessory: C.ice, arm: C.iron, belt: C.mithril },
    (g) => {
      // Wing decorations (left and right)
      paintPoints(g, 'A', [[2,3],[3,2],[13,2],[12,3]]);
      paintPoints(g, 'A', [[1,4],[2,4],[13,4],[14,4]]);
      // Sleek dome (narrower, elegant)
      paintH(g, 'B', 2, 6, 9);
      paintH(g, 'B', 3, 5, 10);
      paintH(g, 'B', 4, 4, 11);
      paintH(g, 'B', 5, 4, 11);
      paintH(g, 'B', 6, 4, 11);
      // Narrow visor
      paintH(g, 'H', 7, 5, 10);
      paintPoints(g, 'B', [[4,7],[11,7]]);
      // Smooth chin
      paintH(g, 'B', 8, 5, 10);
      // Elegant trim
      paintH(g, 'R', 9, 5, 10);
      paintH(g, 'P', 10, 6, 9);
    },
  ),

  // ── 18. WOODEN TRIBAL MASK ──────────────────────────────────
  // Rectangular carved wood mask with painted marks and eye holes
  makeTemplate('wooden_tribal_mask_16',
    'Carved wooden tribal mask with war paint marks and hollow eyes.',
    ARMOR_CHARS,
    { body: C.wood, head: C.shadow, accessory: C.red, arm: C.darkLeather, belt: C.green },
    (g) => {
      // Rectangular mask shape
      paintRect(g, 'B', 4, 1, 11, 10);
      // Eye holes (2x2 each)
      paintRect(g, 'H', 5, 4, 6, 5);
      paintRect(g, 'H', 9, 4, 10, 5);
      // War paint stripes
      paintV(g, 'A', 4, 3, 7);   // left stripe
      paintV(g, 'A', 11, 3, 7);  // right stripe
      // Mouth carving
      paintH(g, 'H', 8, 6, 9);
      // Forehead marking
      paintPoints(g, 'A', [[7,2],[8,2]]);
      // Chin detail
      paintH(g, 'R', 9, 5, 10);
      // Hanging ties at bottom
      paintPoints(g, 'P', [[5,11],[6,11],[9,11],[10,11]]);
      paintPoints(g, 'P', [[5,12],[10,12]]);
    },
  ),

  // ── 19. ICE FROST CROWN ─────────────────────────────────────
  // Jagged ice crown with frozen icicle spikes
  makeTemplate('ice_frost_crown_16',
    'Jagged ice crown with frozen icicle spikes and cold blue glow.',
    ARMOR_CHARS,
    { body: C.ice, head: C.crystal, accessory: C.iron, arm: C.ice, belt: C.mithril },
    (g) => {
      // Icicle spikes (irregular heights)
      paintPoints(g, 'B', [[4,3],[6,1],[8,0],[10,1],[12,2]]);
      paintPoints(g, 'B', [[4,4],[6,2],[8,1],[10,2],[12,3]]);
      paintPoints(g, 'H', [[6,3],[8,2],[10,3]]); // crystal core
      // Crown band
      paintH(g, 'B', 5, 3, 12);
      paintH(g, 'B', 6, 3, 12);
      // Frost detail
      paintPoints(g, 'A', [[3,5],[13,5]]); // frost accents
      // Lower band
      paintH(g, 'R', 7, 4, 11);
      // Interior frost
      paintH(g, 'P', 8, 5, 10);
      paintH(g, 'P', 9, 6, 9);
    },
  ),

  // ── 20. FIRE BLAZING HELM ───────────────────────────────────
  // Dark iron helm with flame crest erupting from top
  makeTemplate('fire_blazing_helm_16',
    'Dark iron helm with blazing fire crest erupting from the crown.',
    ARMOR_CHARS,
    { body: C.darkIron, head: C.shadow, accessory: C.fire, arm: C.chain, belt: C.leather },
    (g) => {
      // Flame crest (flickering shape)
      paintPoints(g, 'A', [[7,0],[8,0]]);
      paintPoints(g, 'A', [[6,1],[7,1],[8,1],[9,1]]);
      paintPoints(g, 'A', [[6,2],[7,2],[8,2],[9,2]]);
      // Dome
      paintH(g, 'B', 3, 5, 10);
      paintH(g, 'B', 4, 4, 11);
      paintH(g, 'B', 5, 4, 11);
      paintH(g, 'B', 6, 4, 11);
      // Visor slit (narrow, menacing)
      paintH(g, 'H', 7, 5, 10);
      paintPoints(g, 'B', [[4,7],[11,7]]);
      // Face plate
      paintH(g, 'B', 8, 4, 11);
      // Chin guard with ember accents
      paintH(g, 'R', 9, 5, 10);
      paintPoints(g, 'A', [[5,9],[10,9]]); // ember dots
      // Padding
      paintH(g, 'P', 10, 6, 9);
    },
  ),
];

const batch: BatchDefinition = {
  category: 'equipment',
  exportNames: {
    templates: 'ARMOR_HELMETS_TEMPLATES',
    schemes: 'ARMOR_HELMETS_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
