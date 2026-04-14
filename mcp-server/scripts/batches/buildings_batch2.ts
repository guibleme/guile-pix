/**
 * Buildings batch 2 — 20 new building/structure templates.
 * Genre diversity: RPG, sci-fi, horror, farming, survival, Japanese, cyberpunk
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

// ─── Shared color palettes ──────────────────────────────────────
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
  ice:       { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  nature:    { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  red:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  purple:    { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
  neon:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
  cloud:     { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
  thatch:    { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  bone:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  iron:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  water:     { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
};

const BLDG = {
  B: { name: 'walls', role: 'body' },
  H: { name: 'roof', role: 'head' },
  A: { name: 'accent', role: 'accessory' },
  X: { name: 'windows', role: 'eye' },
  G: { name: 'door', role: 'belt' },
};

const templates: CompactTemplate[] = [

  // ─── 1. CATHEDRAL ────────────────────────────────────────────
  makeTemplate('cathedral_16', 'Gothic cathedral with pointed spire and rose window.',
    { ...BLDG, A: { name: 'spire_cross', role: 'accessory' }, X: { name: 'stained_glass', role: 'eye' } },
    { body: C.stone, head: C.redRoof, accessory: C.gold, eye: C.glass, belt: C.door },
    g => {
      // Spire cross
      paintH(g, 'A', 0, 7, 8);
      paintPoints(g, 'A', [[6,1],[9,1]]);
      paintH(g, 'H', 1, 7, 8);
      // Pitched roof expanding
      paintH(g, 'H', 2, 5, 10);
      paintH(g, 'H', 3, 4, 11);
      paintH(g, 'H', 4, 3, 12);
      // Walls
      paintRect(g, 'B', 5, 5, 12, 13);
      // Rose window (diamond shape)
      paintPoints(g, 'X', [[7,6],[8,6],[7,9],[8,9]]);  // top/bottom
      paintPoints(g, 'X', [[6,7],[9,7],[6,8],[9,8]]);  // left/right
      paintRect(g, 'X', 7, 7, 8, 8);                   // center
      // Door
      paintRect(g, 'G', 7, 11, 8, 13);
    }),

  // ─── 2. GRANARY ──────────────────────────────────────────────
  makeTemplate('granary_16', 'Cylindrical grain silo with dome cap and iron bands.',
    { B: { name: 'silo_walls', role: 'body' }, H: { name: 'dome', role: 'head' },
      X: { name: 'iron_bands', role: 'eye' }, G: { name: 'hatch', role: 'belt' },
      A: { name: 'base_ring', role: 'accessory' } },
    { body: C.wood, head: C.thatch, eye: C.iron, belt: C.dark, accessory: C.stone },
    g => {
      // Dome
      paintH(g, 'H', 1, 6, 9);
      paintH(g, 'H', 2, 5, 10);
      paintH(g, 'H', 3, 4, 11);
      // Silo body
      paintRect(g, 'B', 4, 4, 11, 12);
      // Iron bands
      paintH(g, 'X', 6, 4, 11);
      paintH(g, 'X', 9, 4, 11);
      // Hatch door
      paintRect(g, 'G', 7, 11, 8, 12);
      // Base
      paintH(g, 'A', 13, 4, 11);
    }),

  // ─── 3. GUILD HALL ───────────────────────────────────────────
  makeTemplate('guild_hall_16', 'Wide stone guild hall with banner and large entrance.',
    { B: { name: 'stone_walls', role: 'body' }, H: { name: 'slate_roof', role: 'head' },
      A: { name: 'banner', role: 'accessory' }, X: { name: 'windows', role: 'eye' },
      G: { name: 'entrance', role: 'belt' } },
    { body: C.stone, head: C.blueRoof, accessory: C.red, eye: C.glass, belt: C.door },
    g => {
      // Banner flag on pole
      paintV(g, 'A', 12, 0, 3);
      paintRect(g, 'A', 13, 0, 14, 2);
      // Roof
      paintH(g, 'H', 3, 2, 13);
      paintH(g, 'H', 4, 1, 14);
      // Walls
      paintRect(g, 'B', 1, 5, 14, 12);
      // Windows
      paintRect(g, 'X', 2, 7, 3, 8);
      paintRect(g, 'X', 11, 7, 12, 8);
      // Large entrance
      paintRect(g, 'G', 6, 10, 9, 12);
      // Base
      paintH(g, 'B', 13, 1, 14);
    }),

  // ─── 4. MAGIC PORTAL ────────────────────────────────────────
  makeTemplate('magic_portal_16', 'Freestanding stone arch gateway with glowing magical center.',
    { B: { name: 'stone_arch', role: 'body' }, A: { name: 'rune_glow', role: 'accessory' },
      X: { name: 'portal_energy', role: 'eye' }, H: { name: 'keystone', role: 'head' } },
    { body: C.stone, accessory: C.purple, eye: C.glass, head: C.gold },
    g => {
      // Arch pillars
      paintRect(g, 'B', 3, 2, 5, 13);   // left pillar
      paintRect(g, 'B', 10, 2, 12, 13);  // right pillar
      // Arch top
      paintH(g, 'B', 2, 5, 10);
      paintH(g, 'B', 1, 6, 9);
      // Keystone
      paintH(g, 'H', 0, 7, 8);
      paintH(g, 'H', 1, 7, 8);
      // Portal energy inside
      paintRect(g, 'X', 6, 3, 9, 13);
      // Rune accents on pillars
      paintPoints(g, 'A', [[4,5],[4,8],[4,11],[11,5],[11,8],[11,11]]);
      // Base stones
      paintH(g, 'B', 14, 3, 12);
    }),

  // ─── 5. FISHING HUT ─────────────────────────────────────────
  makeTemplate('fishing_hut_16', 'Small wooden hut on stilts over water.',
    { B: { name: 'wood_walls', role: 'body' }, H: { name: 'thatch_roof', role: 'head' },
      G: { name: 'door', role: 'belt' }, A: { name: 'stilts', role: 'accessory' },
      X: { name: 'water', role: 'eye' } },
    { body: C.wood, head: C.thatch, belt: C.door, accessory: C.darkStone, eye: C.water },
    g => {
      // Thatch roof
      paintH(g, 'H', 2, 5, 12);
      paintH(g, 'H', 3, 4, 13);
      paintH(g, 'H', 4, 3, 14);
      // Walls
      paintRect(g, 'B', 4, 5, 13, 9);
      // Door
      paintRect(g, 'G', 8, 7, 9, 9);
      // Platform
      paintH(g, 'B', 10, 3, 14);
      // Stilts
      paintV(g, 'A', 4, 11, 14);
      paintV(g, 'A', 7, 11, 14);
      paintV(g, 'A', 10, 11, 14);
      paintV(g, 'A', 13, 11, 14);
      // Water line
      paintH(g, 'X', 13, 2, 14);
      paintH(g, 'X', 14, 1, 15);
    }),

  // ─── 6. POTION SHOP ─────────────────────────────────────────
  makeTemplate('potion_shop_16', 'Narrow tall potion shop with chimney and bottle window.',
    { B: { name: 'brick_walls', role: 'body' }, H: { name: 'roof', role: 'head' },
      A: { name: 'chimney_smoke', role: 'accessory' }, X: { name: 'bottle_window', role: 'eye' },
      G: { name: 'door', role: 'belt' } },
    { body: C.stone, head: C.redRoof, accessory: C.iron, eye: C.nature, belt: C.door },
    g => {
      // Chimney + smoke
      paintRect(g, 'A', 3, 0, 4, 3);
      paintPoints(g, 'A', [[3,0],[4,0]]);  // smoke wisps at very top
      // Roof
      paintH(g, 'H', 3, 4, 13);
      paintH(g, 'H', 4, 3, 14);
      paintH(g, 'H', 5, 2, 14);
      // Walls
      paintRect(g, 'B', 4, 6, 13, 13);
      // Bottle-shaped window
      paintPoints(g, 'X', [[8,7],[9,7],[8,8],[9,8],[8,9],[9,9]]);
      paintPoints(g, 'X', [[8,10],[9,10]]);
      // Door
      paintRect(g, 'G', 11, 11, 12, 13);
      // Base
      paintH(g, 'B', 14, 3, 13);
    }),

  // ─── 7. GUARD POST ──────────────────────────────────────────
  makeTemplate('guard_post_16', 'Small military guard booth with striped barrier arm.',
    { B: { name: 'booth', role: 'body' }, H: { name: 'roof', role: 'head' },
      A: { name: 'barrier_arm', role: 'accessory' }, X: { name: 'window', role: 'eye' },
      G: { name: 'post_base', role: 'belt' } },
    { body: C.wood, head: C.redRoof, accessory: C.red, eye: C.glass, belt: C.stone },
    g => {
      // Booth roof
      paintH(g, 'H', 4, 3, 8);
      paintH(g, 'H', 5, 2, 9);
      // Booth walls
      paintRect(g, 'B', 3, 6, 8, 12);
      // Window
      paintRect(g, 'X', 4, 7, 7, 9);
      // Barrier arm (horizontal striped bar)
      paintH(g, 'A', 8, 9, 14);
      paintH(g, 'B', 9, 9, 14);  // alternating stripe
      // Barrier post
      paintV(g, 'G', 9, 9, 13);
      // Booth base
      paintH(g, 'G', 13, 2, 9);
    }),

  // ─── 8. DARK TOWER ──────────────────────────────────────────
  makeTemplate('dark_tower_16', 'Ominous dark sorcerer tower with skull window and spire.',
    { B: { name: 'dark_stone', role: 'body' }, H: { name: 'spire', role: 'head' },
      A: { name: 'skull_glow', role: 'accessory' }, X: { name: 'skull_eyes', role: 'eye' } },
    { body: C.darkStone, head: C.purple, accessory: C.dark, eye: C.red },
    g => {
      // Spire
      paintH(g, 'H', 0, 7, 8);
      paintH(g, 'H', 1, 6, 9);
      paintH(g, 'H', 2, 6, 9);
      // Tower body (narrow tall)
      paintRect(g, 'B', 5, 3, 10, 14);
      // Skull window
      paintRect(g, 'A', 6, 6, 9, 9);
      paintPoints(g, 'X', [[7,7],[8,7]]);  // skull eye sockets
      paintPoints(g, 'A', [[7,9],[8,9]]);  // jaw
      // Battlement rim
      paintH(g, 'B', 3, 4, 11);
      paintPoints(g, 'B', [[4,3],[6,3],[8,3],[10,3],[11,3]]);  // merlons
      paintPoints(g, 'B', [[5,3],[7,3],[9,3]]);
    }),

  // ─── 9. DESERT OUTPOST ───────────────────────────────────────
  makeTemplate('desert_outpost_16', 'Flat-roofed desert fortress with crenellations and archway.',
    { B: { name: 'sandstone', role: 'body' }, H: { name: 'battlements', role: 'head' },
      A: { name: 'awning', role: 'accessory' }, G: { name: 'archway', role: 'belt' },
      X: { name: 'slit_windows', role: 'eye' } },
    { body: C.sand, head: C.sand, accessory: C.red, belt: C.dark, eye: C.darkStone },
    g => {
      // Battlements (flat roof with merlons)
      paintH(g, 'H', 3, 2, 13);
      paintPoints(g, 'H', [[2,2],[4,2],[6,2],[8,2],[10,2],[12,2],[13,2]]);
      // Main walls
      paintRect(g, 'B', 2, 4, 13, 13);
      // Arrow slits
      paintV(g, 'X', 4, 6, 8);
      paintV(g, 'X', 11, 6, 8);
      // Archway entrance
      paintRect(g, 'G', 7, 10, 8, 13);
      paintH(g, 'G', 9, 7, 8);
      // Awning over door
      paintH(g, 'A', 9, 5, 10);
      // Base
      paintH(g, 'B', 14, 1, 14);
    }),

  // ─── 10. TORII GATE ──────────────────────────────────────────
  makeTemplate('torii_gate_16', 'Traditional Japanese torii gate with curved crossbars.',
    { B: { name: 'pillars', role: 'body' }, H: { name: 'top_beam', role: 'head' },
      A: { name: 'lower_beam', role: 'accessory' }, X: { name: 'ornament', role: 'eye' } },
    { body: C.red, head: C.red, accessory: C.red, eye: C.dark },
    g => {
      // Top curved beam (kasagi)
      paintH(g, 'H', 2, 1, 14);
      paintH(g, 'H', 3, 2, 13);
      // Ornament at top center
      paintH(g, 'X', 1, 7, 8);
      // Lower beam (nuki)
      paintH(g, 'A', 5, 3, 12);
      paintH(g, 'A', 6, 4, 11);
      // Left pillar
      paintV(g, 'B', 4, 3, 14);
      paintV(g, 'B', 5, 3, 14);
      // Right pillar
      paintV(g, 'B', 10, 3, 14);
      paintV(g, 'B', 11, 3, 14);
    }),

  // ─── 11. NEON ARCADE ─────────────────────────────────────────
  makeTemplate('neon_arcade_16', 'Cyberpunk arcade building with glowing neon sign on roof.',
    { B: { name: 'concrete', role: 'body' }, H: { name: 'neon_sign', role: 'head' },
      A: { name: 'trim_lights', role: 'accessory' }, X: { name: 'screen_glow', role: 'eye' },
      G: { name: 'entrance', role: 'belt' } },
    { body: C.darkStone, head: C.neon, accessory: C.purple, eye: C.glass, belt: C.dark },
    g => {
      // Neon sign on roof
      paintRect(g, 'H', 4, 1, 11, 3);
      // Roof edge
      paintH(g, 'A', 4, 1, 14);
      // Walls
      paintRect(g, 'B', 1, 5, 14, 13);
      // Arcade screen windows
      paintRect(g, 'X', 2, 6, 4, 8);
      paintRect(g, 'X', 6, 6, 8, 8);
      paintRect(g, 'X', 10, 6, 12, 8);
      // Neon trim strip
      paintH(g, 'A', 10, 1, 14);
      // Entrance
      paintRect(g, 'G', 6, 11, 9, 13);
      // Base
      paintH(g, 'B', 14, 1, 14);
    }),

  // ─── 12. WATER TOWER ────────────────────────────────────────
  makeTemplate('water_tower_16', 'Elevated water tank on thin support legs.',
    { B: { name: 'tank', role: 'body' }, H: { name: 'tank_cap', role: 'head' },
      A: { name: 'support_legs', role: 'accessory' }, X: { name: 'water_band', role: 'eye' } },
    { body: C.iron, head: C.stone, accessory: C.wood, eye: C.water },
    g => {
      // Cap/lid
      paintH(g, 'H', 1, 4, 11);
      paintH(g, 'H', 2, 3, 12);
      // Tank body (wide barrel)
      paintRect(g, 'B', 3, 3, 12, 8);
      // Water level band
      paintH(g, 'X', 5, 3, 12);
      paintH(g, 'X', 6, 3, 12);
      // Tank bottom
      paintH(g, 'B', 9, 4, 11);
      // Support legs (4 angled)
      paintV(g, 'A', 4, 10, 14);
      paintV(g, 'A', 7, 10, 14);
      paintV(g, 'A', 8, 10, 14);
      paintV(g, 'A', 11, 10, 14);
      // Cross brace
      paintH(g, 'A', 12, 5, 10);
    }),

  // ─── 13. AMPHITHEATER ───────────────────────────────────────
  makeTemplate('amphitheater_16', 'Open-air tiered amphitheater with stage area.',
    { B: { name: 'stone_tiers', role: 'body' }, H: { name: 'back_wall', role: 'head' },
      A: { name: 'stage', role: 'accessory' }, X: { name: 'columns', role: 'eye' } },
    { body: C.stone, head: C.stone, accessory: C.wood, eye: C.gold },
    g => {
      // Back wall
      paintH(g, 'H', 3, 2, 13);
      paintH(g, 'H', 4, 2, 13);
      // Columns on back wall
      paintPoints(g, 'X', [[3,3],[5,3],[7,3],[8,3],[10,3],[12,3]]);
      // Tiered seating (wider each row)
      paintH(g, 'B', 5, 2, 13);
      paintH(g, 'B', 6, 2, 13);
      paintH(g, 'B', 7, 1, 14);
      paintH(g, 'B', 8, 1, 14);
      paintH(g, 'B', 9, 0, 15);
      paintH(g, 'B', 10, 0, 15);
      // Stage floor
      paintH(g, 'A', 11, 3, 12);
      paintH(g, 'A', 12, 3, 12);
      paintH(g, 'A', 13, 4, 11);
    }),

  // ─── 14. MANOR HOUSE ────────────────────────────────────────
  makeTemplate('manor_house_16', 'Tall three-story manor with dormers and balcony.',
    { B: { name: 'brick_walls', role: 'body' }, H: { name: 'slate_roof', role: 'head' },
      A: { name: 'balcony_railing', role: 'accessory' }, X: { name: 'windows', role: 'eye' },
      G: { name: 'door', role: 'belt' } },
    { body: C.bone, head: C.blueRoof, accessory: C.iron, eye: C.glass, belt: C.door },
    g => {
      // Roof with dormers
      paintH(g, 'H', 0, 3, 12);
      paintH(g, 'H', 1, 2, 13);
      paintH(g, 'H', 2, 1, 14);
      // Dormer windows
      paintPoints(g, 'X', [[5,0],[10,0]]);
      // 3rd floor walls
      paintRect(g, 'B', 1, 3, 14, 5);
      paintRect(g, 'X', 4, 4, 5, 4); paintRect(g, 'X', 10, 4, 11, 4);
      // 2nd floor
      paintRect(g, 'B', 1, 6, 14, 9);
      paintRect(g, 'X', 3, 7, 4, 8); paintRect(g, 'X', 7, 7, 8, 8); paintRect(g, 'X', 11, 7, 12, 8);
      // Balcony railing
      paintH(g, 'A', 9, 1, 14);
      // 1st floor
      paintRect(g, 'B', 1, 10, 14, 13);
      paintRect(g, 'X', 3, 11, 4, 12); paintRect(g, 'X', 11, 11, 12, 12);
      // Door
      paintRect(g, 'G', 7, 11, 8, 13);
    }),

  // ─── 15. CHICKEN COOP ───────────────────────────────────────
  makeTemplate('chicken_coop_16', 'Small farm chicken coop with fenced yard area.',
    { B: { name: 'wood_walls', role: 'body' }, H: { name: 'tin_roof', role: 'head' },
      A: { name: 'fence', role: 'accessory' }, G: { name: 'coop_door', role: 'belt' },
      X: { name: 'nesting_box', role: 'eye' } },
    { body: C.wood, head: C.iron, accessory: C.wood, eye: C.thatch, belt: C.door },
    g => {
      // Roof (low building, left side)
      paintH(g, 'H', 5, 1, 8);
      paintH(g, 'H', 6, 1, 8);
      // Coop walls
      paintRect(g, 'B', 1, 7, 8, 11);
      // Nesting box (bump on side)
      paintRect(g, 'X', 1, 9, 2, 11);
      // Coop door
      paintRect(g, 'G', 6, 10, 7, 11);
      // Ground
      paintH(g, 'B', 12, 1, 14);
      // Fence yard (right side)
      paintV(g, 'A', 9, 7, 11);
      paintV(g, 'A', 14, 7, 11);
      paintH(g, 'A', 7, 9, 14);
      paintH(g, 'A', 11, 9, 14);
      // Fence posts
      paintPoints(g, 'A', [[11,9],[11,11]]);
    }),

  // ─── 16. SEWER DRAIN ────────────────────────────────────────
  makeTemplate('sewer_drain_16', 'Underground sewer entrance with grate and dripping pipe.',
    { B: { name: 'stone_frame', role: 'body' }, H: { name: 'grate_bars', role: 'head' },
      A: { name: 'pipe', role: 'accessory' }, X: { name: 'darkness', role: 'eye' } },
    { body: C.stone, head: C.iron, accessory: C.darkStone, eye: C.dark },
    g => {
      // Ground surface
      paintRect(g, 'B', 1, 4, 14, 6);
      // Drain opening arch
      paintH(g, 'B', 6, 3, 12);
      paintH(g, 'B', 7, 2, 13);
      // Grate bars
      paintV(g, 'H', 4, 7, 12);
      paintV(g, 'H', 6, 7, 12);
      paintV(g, 'H', 8, 7, 12);
      paintV(g, 'H', 10, 7, 12);
      paintV(g, 'H', 12, 7, 11);
      // Darkness behind bars
      paintRect(g, 'X', 3, 8, 11, 13);
      // Pipe dripping from left
      paintH(g, 'A', 3, 0, 3);
      paintV(g, 'A', 3, 3, 7);
      // Frame edges
      paintV(g, 'B', 2, 7, 13);
      paintV(g, 'B', 13, 7, 13);
      paintH(g, 'B', 14, 2, 13);
    }),

  // ─── 17. LOG CABIN ──────────────────────────────────────────
  makeTemplate('log_cabin_16', 'Rustic log cabin with stone chimney and wood texture.',
    { B: { name: 'log_walls', role: 'body' }, H: { name: 'roof_shingles', role: 'head' },
      A: { name: 'chimney', role: 'accessory' }, X: { name: 'window', role: 'eye' },
      G: { name: 'door', role: 'belt' } },
    { body: C.wood, head: C.thatch, accessory: C.stone, eye: C.glass, belt: C.door },
    g => {
      // Chimney
      paintRect(g, 'A', 11, 0, 12, 4);
      // Roof
      paintH(g, 'H', 2, 6, 10);
      paintH(g, 'H', 3, 5, 13);
      paintH(g, 'H', 4, 3, 14);
      paintH(g, 'H', 5, 2, 14);
      // Log walls (with horizontal log lines built into body)
      paintRect(g, 'B', 2, 6, 13, 13);
      // Window
      paintRect(g, 'X', 4, 8, 6, 10);
      // Door
      paintRect(g, 'G', 10, 10, 11, 13);
      // Log ends sticking out sides
      paintPoints(g, 'B', [[1,7],[1,9],[1,11],[1,13],[14,7],[14,9],[14,11],[14,13]]);
    }),

  // ─── 18. CLOUD CASTLE ───────────────────────────────────────
  makeTemplate('cloud_castle_16', 'Tiny fairy-tale castle floating on a cloud.',
    { B: { name: 'castle_walls', role: 'body' }, H: { name: 'turrets', role: 'head' },
      A: { name: 'flag', role: 'accessory' }, X: { name: 'windows', role: 'eye' },
      G: { name: 'cloud', role: 'belt' } },
    { body: C.stone, head: C.blueRoof, accessory: C.red, eye: C.glass, belt: C.cloud },
    g => {
      // Flag
      paintPoints(g, 'A', [[8,0],[9,0]]);
      paintV(g, 'H', 8, 1, 2);
      // Left turret
      paintH(g, 'H', 1, 4, 5);
      paintRect(g, 'B', 4, 2, 5, 7);
      // Right turret (taller)
      paintH(g, 'H', 1, 10, 11);
      paintRect(g, 'B', 10, 2, 11, 7);
      // Central wall
      paintRect(g, 'B', 5, 3, 10, 8);
      // Windows
      paintPoints(g, 'X', [[4,5],[5,5],[10,5],[11,5]]);
      paintRect(g, 'X', 7, 6, 8, 7);
      // Castle base
      paintH(g, 'B', 9, 3, 12);
      // Cloud
      paintH(g, 'G', 10, 2, 13);
      paintH(g, 'G', 11, 1, 14);
      paintH(g, 'G', 12, 3, 12);
    }),

  // ─── 19. ANT COLONY ─────────────────────────────────────────
  makeTemplate('ant_colony_16', 'Organic ant mound with visible tunnel entrance.',
    { B: { name: 'dirt_mound', role: 'body' }, H: { name: 'grass_top', role: 'head' },
      A: { name: 'tunnel_rim', role: 'accessory' }, X: { name: 'tunnel_dark', role: 'eye' } },
    { body: C.sand, head: C.nature, accessory: C.wood, eye: C.dark },
    g => {
      // Grass top
      paintH(g, 'H', 3, 7, 8);
      paintH(g, 'H', 4, 5, 10);
      paintPoints(g, 'H', [[6,2],[9,2],[12,3]]);
      // Mound (dome shape)
      paintH(g, 'B', 5, 4, 11);
      paintH(g, 'B', 6, 3, 12);
      paintH(g, 'B', 7, 2, 13);
      paintH(g, 'B', 8, 2, 13);
      paintH(g, 'B', 9, 1, 14);
      paintH(g, 'B', 10, 1, 14);
      paintH(g, 'B', 11, 2, 13);
      paintH(g, 'B', 12, 3, 12);
      paintH(g, 'B', 13, 4, 11);
      // Tunnel entrance
      paintRect(g, 'A', 7, 10, 8, 11);
      paintRect(g, 'X', 7, 12, 8, 13);
    }),

  // ─── 20. AIRSHIP DOCK ───────────────────────────────────────
  makeTemplate('airship_dock_16', 'Tall docking tower with mooring arm and platform.',
    { B: { name: 'tower_stone', role: 'body' }, H: { name: 'platform', role: 'head' },
      A: { name: 'mooring_arm', role: 'accessory' }, X: { name: 'beacon_light', role: 'eye' },
      G: { name: 'door', role: 'belt' } },
    { body: C.stone, head: C.wood, accessory: C.iron, eye: C.neon, belt: C.door },
    g => {
      // Beacon light at very top
      paintH(g, 'X', 0, 6, 7);
      // Platform (wide horizontal)
      paintH(g, 'H', 1, 2, 13);
      paintH(g, 'H', 2, 2, 13);
      // Mooring arm extending right
      paintH(g, 'A', 3, 9, 14);
      paintV(g, 'A', 14, 3, 5);  // hook
      // Tower body (narrow tall)
      paintRect(g, 'B', 5, 3, 8, 13);
      // Small windows
      paintPoints(g, 'X', [[6,6],[7,6],[6,10],[7,10]]);
      // Door at base
      paintRect(g, 'G', 6, 12, 7, 13);
      // Tower base (wider)
      paintH(g, 'B', 14, 4, 9);
    }),

];

const batch: BatchDefinition = {
  category: 'buildings',
  exportNames: { templates: 'BUILDING_BATCH4_TEMPLATES', schemes: 'BUILDING_BATCH4_COLOR_SCHEMES' },
  templates,
};

export default batch;
