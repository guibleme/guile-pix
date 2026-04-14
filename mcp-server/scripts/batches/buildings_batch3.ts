/**
 * Buildings batch 3 — 14 new building/structure templates to reach 100.
 * Genre diversity: RPG, horror, racing, puzzle, survival, steampunk
 */
import type { BatchDefinition, CompactTemplate } from '../templateGenerator.js';

type Grid = string[][];
function createGrid(): Grid { return Array.from({ length: 16 }, () => Array(16).fill('.')); }
function paintRect(g: Grid, ch: string, x1: number, y1: number, x2: number, y2: number): void {
  for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++) if (x >= 0 && x < 16 && y >= 0 && y < 16) g[y][x] = ch;
}
function paintH(g: Grid, ch: string, y: number, x1: number, x2: number): void {
  for (let x = x1; x <= x2; x++) if (x >= 0 && x < 16 && y >= 0 && y < 16) g[y][x] = ch;
}
function paintV(g: Grid, ch: string, x: number, y1: number, y2: number): void {
  for (let y = y1; y <= y2; y++) if (x >= 0 && x < 16 && y >= 0 && y < 16) g[y][x] = ch;
}
function paintPoints(g: Grid, ch: string, pts: [number, number][]): void {
  for (const [x, y] of pts) if (x >= 0 && x < 16 && y >= 0 && y < 16) g[y][x] = ch;
}
function toRows(g: Grid): string[] { return g.map(r => r.join('')); }
function makeTemplate(
  id: string, description: string,
  chars: CompactTemplate['chars'], colors: CompactTemplate['colors'],
  draw: (g: Grid) => void,
): CompactTemplate {
  const g = createGrid(); draw(g); return { id, description, grid: toRows(g), chars, colors };
}

const C = {
  stone:     { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  darkStone: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  wood:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
  redRoof:   { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  blueRoof:  { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  gold:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
  glass:     { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  door:      { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  dark:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  sand:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  nature:    { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  red:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  purple:    { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
  neon:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  iron:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  bone:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  ice:       { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  copper:    { shadow: '#854c30', base: '#d27d2c', highlight: '#d2aa99' },
  cloud:     { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  thatch:    { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
};

const templates: CompactTemplate[] = [

  // ─── 1. CRYPT ────────────────────────────────────────────────
  makeTemplate('crypt_16', 'Stone crypt with iron gate and cross on top.',
    { B: { name: 'stone_walls', role: 'body' }, H: { name: 'peaked_roof', role: 'head' },
      A: { name: 'cross', role: 'accessory' }, X: { name: 'iron_gate', role: 'eye' } },
    { body: C.darkStone, head: C.stone, accessory: C.stone, eye: C.iron },
    g => {
      // Cross on top
      paintV(g, 'A', 7, 0, 2); paintH(g, 'A', 1, 6, 8);
      // Peaked roof
      paintH(g, 'H', 3, 5, 10); paintH(g, 'H', 4, 4, 11); paintH(g, 'H', 5, 3, 12);
      // Stone walls
      paintRect(g, 'B', 3, 6, 12, 13);
      // Iron gate entrance
      paintRect(g, 'X', 6, 8, 9, 13);
      // Base
      paintH(g, 'B', 14, 2, 13);
    }),

  // ─── 2. WINDMILL COTTAGE ─────────────────────────────────────
  makeTemplate('windmill_cottage_16', 'Round-bodied windmill with spinning blades and door.',
    { B: { name: 'stone_body', role: 'body' }, H: { name: 'cap', role: 'head' },
      A: { name: 'blades', role: 'accessory' }, G: { name: 'door', role: 'belt' },
      X: { name: 'window', role: 'eye' } },
    { body: C.stone, head: C.redRoof, accessory: C.wood, belt: C.door, eye: C.glass },
    g => {
      // Cap
      paintH(g, 'H', 2, 6, 9); paintH(g, 'H', 3, 5, 10);
      // Blades (cross extending from cap)
      paintH(g, 'A', 2, 1, 5); paintH(g, 'A', 2, 10, 14);
      paintV(g, 'A', 7, 0, 1); paintV(g, 'A', 8, 0, 1);
      // Round body
      paintRect(g, 'B', 5, 4, 10, 13);
      paintH(g, 'B', 5, 5, 10); paintH(g, 'B', 13, 5, 10);
      // Window
      paintRect(g, 'X', 7, 6, 8, 8);
      // Door
      paintRect(g, 'G', 7, 11, 8, 13);
      // Base
      paintH(g, 'B', 14, 4, 11);
    }),

  // ─── 3. RACING GARAGE ───────────────────────────────────────
  makeTemplate('racing_garage_16', 'Wide low garage with roll-up door and checkered flag.',
    { B: { name: 'metal_walls', role: 'body' }, H: { name: 'roof', role: 'head' },
      A: { name: 'flag', role: 'accessory' }, G: { name: 'roll_door', role: 'belt' },
      X: { name: 'stripe', role: 'eye' } },
    { body: C.iron, head: C.darkStone, accessory: C.red, belt: C.dark, eye: C.red },
    g => {
      // Flag pole + flag
      paintV(g, 'A', 13, 0, 4); paintRect(g, 'A', 14, 0, 15, 2);
      // Roof
      paintH(g, 'H', 4, 1, 13); paintH(g, 'H', 5, 1, 13);
      // Racing stripe on roof
      paintH(g, 'X', 4, 5, 9);
      // Walls
      paintRect(g, 'B', 1, 6, 13, 12);
      // Large roll-up door
      paintRect(g, 'G', 3, 7, 11, 12);
      // Base/floor
      paintH(g, 'B', 13, 0, 14);
    }),

  // ─── 4. PUZZLE TEMPLE ───────────────────────────────────────
  makeTemplate('puzzle_temple_16', 'Symmetrical temple with glowing gem and staircase.',
    { B: { name: 'temple_stone', role: 'body' }, H: { name: 'pediment', role: 'head' },
      A: { name: 'gem_glow', role: 'accessory' }, X: { name: 'columns', role: 'eye' } },
    { body: C.sand, head: C.gold, accessory: C.nature, eye: C.stone },
    g => {
      // Pediment (triangle)
      paintH(g, 'H', 2, 6, 9); paintH(g, 'H', 3, 5, 10);
      paintH(g, 'H', 4, 4, 11); paintH(g, 'H', 5, 3, 12);
      // Gem in pediment center
      paintRect(g, 'A', 7, 3, 8, 4);
      // Columns
      paintV(g, 'X', 4, 6, 12); paintV(g, 'X', 5, 6, 12);
      paintV(g, 'X', 10, 6, 12); paintV(g, 'X', 11, 6, 12);
      // Interior
      paintRect(g, 'B', 6, 6, 9, 12);
      // Stairs
      paintH(g, 'B', 13, 3, 12);
      paintH(g, 'B', 14, 2, 13);
    }),

  // ─── 5. SURVIVAL SHELTER ────────────────────────────────────
  makeTemplate('survival_shelter_16', 'Makeshift lean-to shelter with tarp and campfire spot.',
    { B: { name: 'branches', role: 'body' }, H: { name: 'tarp', role: 'head' },
      A: { name: 'campfire', role: 'accessory' }, X: { name: 'rope_lash', role: 'eye' } },
    { body: C.wood, head: C.nature, accessory: C.neon, eye: C.thatch },
    g => {
      // Tarp (angled lean-to)
      paintH(g, 'H', 3, 2, 4); paintH(g, 'H', 4, 2, 5);
      paintH(g, 'H', 5, 2, 6); paintH(g, 'H', 6, 2, 7);
      paintH(g, 'H', 7, 2, 8); paintH(g, 'H', 8, 2, 9);
      paintH(g, 'H', 9, 2, 10);
      // Support pole
      paintV(g, 'B', 2, 3, 12);
      paintV(g, 'B', 10, 7, 12);
      // Rope lashing
      paintPoints(g, 'X', [[3,4],[4,5],[5,6],[6,7],[7,8]]);
      // Ground
      paintH(g, 'B', 13, 1, 14);
      // Campfire
      paintPoints(g, 'A', [[12,11],[13,11],[12,12],[13,12]]);
      paintPoints(g, 'A', [[12,10],[13,10]]);
    }),

  // ─── 6. STEAMPUNK FACTORY ───────────────────────────────────
  makeTemplate('steampunk_factory_16', 'Industrial factory with smokestacks and gear emblem.',
    { B: { name: 'brick', role: 'body' }, H: { name: 'smokestacks', role: 'head' },
      A: { name: 'gear_emblem', role: 'accessory' }, G: { name: 'door', role: 'belt' },
      X: { name: 'windows', role: 'eye' } },
    { body: C.darkStone, head: C.iron, accessory: C.copper, belt: C.dark, eye: C.neon },
    g => {
      // Two smokestacks
      paintRect(g, 'H', 3, 0, 4, 5);
      paintRect(g, 'H', 11, 0, 12, 5);
      // Main building
      paintRect(g, 'B', 2, 5, 13, 13);
      // Gear emblem on front
      paintRect(g, 'A', 6, 7, 9, 10);
      paintPoints(g, 'A', [[7,6],[8,6],[7,11],[8,11],[5,8],[5,9],[10,8],[10,9]]);
      // Windows
      paintRect(g, 'X', 3, 7, 4, 8);
      paintRect(g, 'X', 11, 7, 12, 8);
      // Door
      paintRect(g, 'G', 7, 12, 8, 13);
      // Base
      paintH(g, 'B', 14, 1, 14);
    }),

  // ─── 7. WITCH HUT ──────────────────────────────────────────
  makeTemplate('witch_hut_16', 'Crooked witch hut with tall chimney and hanging herbs.',
    { B: { name: 'wood_walls', role: 'body' }, H: { name: 'crooked_roof', role: 'head' },
      A: { name: 'herbs', role: 'accessory' }, X: { name: 'window_glow', role: 'eye' },
      G: { name: 'door', role: 'belt' } },
    { body: C.wood, head: C.purple, accessory: C.nature, eye: C.neon, belt: C.dark },
    g => {
      // Crooked roof (asymmetric)
      paintH(g, 'H', 2, 8, 9);
      paintH(g, 'H', 3, 6, 11);
      paintH(g, 'H', 4, 4, 12);
      paintH(g, 'H', 5, 3, 13);
      paintH(g, 'H', 6, 2, 14);
      // Hanging herbs from eave
      paintPoints(g, 'A', [[3,7],[4,7],[13,7],[14,7]]);
      // Walls
      paintRect(g, 'B', 3, 7, 13, 13);
      // Glowing window
      paintRect(g, 'X', 5, 8, 7, 10);
      // Door
      paintRect(g, 'G', 10, 10, 11, 13);
      // Chicken leg posts (witch hut!)
      paintV(g, 'B', 5, 13, 14);
      paintV(g, 'B', 11, 13, 14);
    }),

  // ─── 8. VIKING LONGHOUSE ────────────────────────────────────
  makeTemplate('viking_longhouse_16', 'Long Viking hall with curved roof and dragon prow.',
    { B: { name: 'log_walls', role: 'body' }, H: { name: 'turf_roof', role: 'head' },
      A: { name: 'dragon_prow', role: 'accessory' }, G: { name: 'door', role: 'belt' } },
    { body: C.wood, head: C.nature, accessory: C.gold, belt: C.door },
    g => {
      // Dragon prow on right
      paintPoints(g, 'A', [[14,2],[15,3],[14,3],[14,4]]);
      // Curved turf roof (long and low)
      paintH(g, 'H', 4, 3, 14);
      paintH(g, 'H', 5, 2, 14);
      paintH(g, 'H', 6, 1, 14);
      // Log walls
      paintRect(g, 'B', 1, 7, 14, 12);
      // Door
      paintRect(g, 'G', 4, 10, 5, 12);
      // Base
      paintH(g, 'B', 13, 0, 15);
    }),

  // ─── 9. FLOATING ISLAND HUT ─────────────────────────────────
  makeTemplate('floating_island_hut_16', 'Small hut on a floating earth island chunk.',
    { B: { name: 'hut_walls', role: 'body' }, H: { name: 'roof', role: 'head' },
      A: { name: 'island_earth', role: 'accessory' }, X: { name: 'grass_top', role: 'eye' } },
    { body: C.wood, head: C.redRoof, accessory: C.sand, eye: C.nature },
    g => {
      // Hut roof
      paintH(g, 'H', 2, 5, 10); paintH(g, 'H', 3, 4, 11); paintH(g, 'H', 4, 3, 12);
      // Hut walls
      paintRect(g, 'B', 4, 5, 11, 8);
      // Door
      paintRect(g, 'B', 7, 7, 8, 8);
      // Grass layer
      paintH(g, 'X', 9, 2, 13);
      // Floating island chunk (tapers down)
      paintH(g, 'A', 10, 3, 12);
      paintH(g, 'A', 11, 4, 11);
      paintH(g, 'A', 12, 5, 10);
      paintH(g, 'A', 13, 6, 9);
      paintH(g, 'A', 14, 7, 8);
    }),

  // ─── 10. PRISON TOWER ──────────────────────────────────────
  makeTemplate('prison_tower_16', 'Dark stone prison tower with barred window and chains.',
    { B: { name: 'dark_stone', role: 'body' }, H: { name: 'watchtower_top', role: 'head' },
      X: { name: 'barred_window', role: 'eye' }, A: { name: 'chains', role: 'accessory' } },
    { body: C.darkStone, head: C.stone, eye: C.iron, accessory: C.iron },
    g => {
      // Watchtower top (wider than shaft)
      paintH(g, 'H', 1, 3, 12); paintH(g, 'H', 2, 3, 12);
      paintPoints(g, 'H', [[3,0],[5,0],[7,0],[9,0],[11,0],[12,0]]);
      // Tower shaft
      paintRect(g, 'B', 4, 3, 11, 14);
      // Barred window
      paintRect(g, 'X', 6, 5, 9, 8);
      // Chain hanging from window
      paintV(g, 'A', 7, 9, 12); paintV(g, 'A', 8, 9, 11);
    }),

  // ─── 11. TREEHOUSE PLATFORM ─────────────────────────────────
  makeTemplate('treehouse_platform_16', 'Wooden platform treehouse with ladder and rope bridge.',
    { B: { name: 'platform', role: 'body' }, H: { name: 'canopy_roof', role: 'head' },
      A: { name: 'tree_trunk', role: 'accessory' }, X: { name: 'ladder', role: 'eye' } },
    { body: C.wood, head: C.nature, accessory: C.wood, eye: C.thatch },
    g => {
      // Canopy/roof
      paintH(g, 'H', 1, 4, 11); paintH(g, 'H', 2, 3, 12);
      // Railing walls
      paintRect(g, 'B', 3, 3, 12, 5);
      // Platform floor
      paintH(g, 'B', 6, 2, 13); paintH(g, 'B', 7, 2, 13);
      // Tree trunk (center, going down)
      paintV(g, 'A', 7, 8, 14); paintV(g, 'A', 8, 8, 14);
      // Ladder on right
      paintV(g, 'X', 12, 7, 14);
      paintPoints(g, 'X', [[11,8],[13,8],[11,10],[13,10],[11,12],[13,12]]);
    }),

  // ─── 12. BELL TOWER ────────────────────────────────────────
  makeTemplate('bell_tower_16', 'Tall narrow bell tower with bell visible in belfry.',
    { B: { name: 'stone_shaft', role: 'body' }, H: { name: 'spire', role: 'head' },
      A: { name: 'bell', role: 'accessory' }, X: { name: 'arches', role: 'eye' } },
    { body: C.stone, head: C.redRoof, accessory: C.gold, eye: C.darkStone },
    g => {
      // Spire
      paintH(g, 'H', 0, 7, 8); paintH(g, 'H', 1, 6, 9);
      paintH(g, 'H', 2, 5, 10);
      // Belfry (open arches)
      paintRect(g, 'B', 5, 3, 10, 5);
      paintRect(g, 'X', 6, 4, 9, 5); // arch openings
      // Bell
      paintH(g, 'A', 4, 7, 8); paintRect(g, 'A', 6, 5, 9, 5);
      // Tower shaft
      paintRect(g, 'B', 5, 6, 10, 13);
      // Clock face / window
      paintRect(g, 'X', 7, 9, 8, 10);
      // Base
      paintH(g, 'B', 14, 4, 11);
    }),

  // ─── 13. BUNKER ENTRANCE ────────────────────────────────────
  makeTemplate('bunker_entrance_16', 'Half-buried military bunker with blast door and antenna.',
    { B: { name: 'concrete', role: 'body' }, H: { name: 'earth_mound', role: 'head' },
      A: { name: 'antenna', role: 'accessory' }, G: { name: 'blast_door', role: 'belt' } },
    { body: C.stone, head: C.sand, accessory: C.iron, belt: C.darkStone },
    g => {
      // Antenna
      paintV(g, 'A', 12, 1, 5);
      paintH(g, 'A', 1, 11, 13);
      // Earth mound over bunker
      paintH(g, 'H', 5, 4, 11);
      paintH(g, 'H', 6, 3, 12);
      paintH(g, 'H', 7, 2, 13);
      // Concrete face
      paintRect(g, 'B', 2, 8, 13, 12);
      // Blast door
      paintRect(g, 'G', 5, 9, 10, 12);
      // Ground level
      paintH(g, 'H', 13, 1, 14);
      paintH(g, 'H', 14, 0, 15);
    }),

  // ─── 14. PAGODA TOWER ──────────────────────────────────────
  makeTemplate('pagoda_tower_16', 'Multi-tiered pagoda with layered roofs and finial.',
    { B: { name: 'walls', role: 'body' }, H: { name: 'tiered_roofs', role: 'head' },
      A: { name: 'finial', role: 'accessory' }, X: { name: 'windows', role: 'eye' } },
    { body: C.bone, head: C.red, accessory: C.gold, eye: C.dark },
    g => {
      // Finial at top
      paintH(g, 'A', 0, 7, 8);
      // Top tier roof
      paintH(g, 'H', 1, 5, 10);
      // Top tier wall
      paintRect(g, 'B', 6, 2, 9, 4);
      paintPoints(g, 'X', [[7,3],[8,3]]);
      // Middle tier roof
      paintH(g, 'H', 5, 3, 12);
      // Middle wall
      paintRect(g, 'B', 4, 6, 11, 8);
      paintPoints(g, 'X', [[5,7],[6,7],[9,7],[10,7]]);
      // Bottom tier roof
      paintH(g, 'H', 9, 2, 13);
      // Bottom wall
      paintRect(g, 'B', 3, 10, 12, 13);
      paintPoints(g, 'X', [[5,11],[6,11],[9,11],[10,11]]);
      // Base
      paintH(g, 'B', 14, 2, 13);
    }),

];

const batch: BatchDefinition = {
  category: 'buildings',
  exportNames: { templates: 'BUILDING_BATCH5_TEMPLATES', schemes: 'BUILDING_BATCH5_COLOR_SCHEMES' },
  templates,
};

export default batch;
