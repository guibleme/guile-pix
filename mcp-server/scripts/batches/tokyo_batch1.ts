/**
 * Tokyo City batch 1 — 100 original city-focused templates.
 * Constraint: strict left/right symmetry for every template silhouette.
 */
import type { BatchDefinition, CompactTemplate } from '../templateGenerator.js';

type Grid = string[][];
type Triad = { shadow: string; base: string; highlight: string };
type Kind = 'transit' | 'machine' | 'building' | 'street' | 'culture';

interface TokyoSpec {
  id: string;
  description: string;
  kind: Kind;
}

function createGrid(): Grid {
  return Array.from({ length: 16 }, () => Array(16).fill('.'));
}

function setSym(grid: Grid, ch: string, x: number, y: number): void {
  if (x < 0 || x > 7 || y < 0 || y > 15) return;
  grid[y][x] = ch;
  grid[y][15 - x] = ch;
}

function rectSym(grid: Grid, ch: string, x1: number, y1: number, x2: number, y2: number): void {
  for (let y = y1; y <= y2; y++) {
    for (let x = x1; x <= x2; x++) {
      setSym(grid, ch, x, y);
    }
  }
}

function hSym(grid: Grid, ch: string, y: number, x1: number, x2: number): void {
  for (let x = x1; x <= x2; x++) {
    setSym(grid, ch, x, y);
  }
}

function pointsSym(grid: Grid, ch: string, points: Array<[number, number]>): void {
  for (const [x, y] of points) setSym(grid, ch, x, y);
}

function toRows(grid: Grid): string[] {
  return grid.map((r) => r.join(''));
}

function pick<T>(arr: T[], idx: number): T {
  return arr[((idx % arr.length) + arr.length) % arr.length];
}

const TRIADS = {
  deep: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
  steel: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
  asphalt: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
  concrete: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
  blueGlass: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
  tealGlass: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
  vermilion: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
  amber: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  wood: { shadow: '#442434', base: '#854c30', highlight: '#d2aa99' },
  paper: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
  green: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  neonPink: { shadow: '#442434', base: '#d04648', highlight: '#dad45e' },
  neonBlue: { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
  neonCyan: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
};

function charsFor(kind: Kind): CompactTemplate['chars'] {
  if (kind === 'transit') {
    return {
      F: { name: 'vehicle_frame', role: 'arm' },
      B: { name: 'vehicle_hull', role: 'body' },
      W: { name: 'windshield', role: 'head' },
      A: { name: 'route_lights', role: 'accessory' },
      D: { name: 'front_detail', role: 'belt' },
    };
  }
  if (kind === 'machine') {
    return {
      F: { name: 'machine_frame', role: 'arm' },
      C: { name: 'machine_body', role: 'body' },
      P: { name: 'display_panel', role: 'head' },
      N: { name: 'neon_badge', role: 'accessory' },
      S: { name: 'service_slot', role: 'belt' },
    };
  }
  if (kind === 'building') {
    return {
      F: { name: 'facade_frame', role: 'arm' },
      S: { name: 'structure_body', role: 'body' },
      W: { name: 'window_grid', role: 'head' },
      N: { name: 'roof_sign', role: 'accessory' },
      D: { name: 'entry_door', role: 'belt' },
    };
  }
  if (kind === 'street') {
    return {
      B: { name: 'support_base', role: 'arm' },
      P: { name: 'pole_body', role: 'body' },
      T: { name: 'top_module', role: 'head' },
      A: { name: 'signal_accent', role: 'accessory' },
      L: { name: 'light_or_label', role: 'belt' },
    };
  }
  return {
    F: { name: 'cultural_frame', role: 'arm' },
    G: { name: 'cultural_body', role: 'body' },
    O: { name: 'ornament_core', role: 'head' },
    L: { name: 'lantern_or_emblem', role: 'accessory' },
    D: { name: 'decor_detail', role: 'belt' },
  };
}

function colorsFor(kind: Kind, style: number): CompactTemplate['colors'] {
  if (kind === 'transit') {
    const bodies = [TRIADS.steel, TRIADS.concrete, TRIADS.blueGlass, TRIADS.deep, TRIADS.tealGlass];
    const heads = [TRIADS.blueGlass, TRIADS.tealGlass, TRIADS.paper];
    const accents = [TRIADS.amber, TRIADS.neonBlue, TRIADS.neonPink, TRIADS.green];
    return {
      body: pick(bodies, style),
      head: pick(heads, style + 1),
      accessory: pick(accents, style + 2),
      arm: TRIADS.asphalt,
      belt: TRIADS.deep,
    };
  }
  if (kind === 'machine') {
    const bodies = [TRIADS.steel, TRIADS.concrete, TRIADS.paper, TRIADS.blueGlass, TRIADS.deep];
    const heads = [TRIADS.neonBlue, TRIADS.neonCyan, TRIADS.paper, TRIADS.amber];
    const accents = [TRIADS.neonPink, TRIADS.neonBlue, TRIADS.neonCyan, TRIADS.amber, TRIADS.green];
    return {
      body: pick(bodies, style),
      head: pick(heads, style),
      accessory: pick(accents, style + 1),
      arm: TRIADS.asphalt,
      belt: TRIADS.deep,
    };
  }
  if (kind === 'building') {
    const bodies = [TRIADS.concrete, TRIADS.steel, TRIADS.deep, TRIADS.blueGlass, TRIADS.wood];
    const heads = [TRIADS.blueGlass, TRIADS.tealGlass, TRIADS.paper];
    const accents = [TRIADS.neonPink, TRIADS.neonBlue, TRIADS.amber, TRIADS.vermilion, TRIADS.green];
    return {
      body: pick(bodies, style),
      head: pick(heads, style),
      accessory: pick(accents, style + 2),
      arm: TRIADS.asphalt,
      belt: TRIADS.deep,
    };
  }
  if (kind === 'street') {
    const bodies = [TRIADS.asphalt, TRIADS.steel, TRIADS.wood, TRIADS.deep];
    const heads = [TRIADS.paper, TRIADS.blueGlass, TRIADS.amber, TRIADS.green];
    const accents = [TRIADS.vermilion, TRIADS.amber, TRIADS.neonBlue, TRIADS.neonPink, TRIADS.green];
    return {
      body: pick(bodies, style),
      head: pick(heads, style + 1),
      accessory: pick(accents, style + 2),
      arm: TRIADS.concrete,
      belt: TRIADS.deep,
    };
  }
  const bodies = [TRIADS.vermilion, TRIADS.wood, TRIADS.deep, TRIADS.paper, TRIADS.green];
  const heads = [TRIADS.amber, TRIADS.paper, TRIADS.neonCyan, TRIADS.green];
  const accents = [TRIADS.amber, TRIADS.neonPink, TRIADS.neonBlue, TRIADS.green, TRIADS.tealGlass];
  return {
    body: pick(bodies, style),
    head: pick(heads, style),
    accessory: pick(accents, style + 1),
    arm: TRIADS.asphalt,
    belt: TRIADS.deep,
  };
}

function vSym(grid: Grid, ch: string, x: number, y1: number, y2: number): void {
  for (let y = y1; y <= y2; y++) setSym(grid, ch, x, y);
}

function bandSym(grid: Grid, ch: string, y1: number, y2: number, x1: number, x2: number): void {
  for (let y = y1; y <= y2; y++) hSym(grid, ch, y, x1, x2);
}

function drawTransit(grid: Grid, style: number): void {
  const phase = Math.floor(style / 5);
  const variant = style % 5;

  if (phase === 0) {
    const roof = [4, 3, 2, 3, 1][variant];
    const mid = [3, 2, 3, 2, 2][variant];
    const base = [4, 3, 2, 3, 5][variant];
    for (let y = 2; y <= 12; y++) {
      const inset = y <= 4 ? roof : y >= 10 ? base : mid;
      hSym(grid, 'F', y, inset, 6);
    }
    rectSym(grid, 'B', 3, 5, 5, 10);
    if (variant === 0 || variant === 1 || variant === 3) bandSym(grid, 'W', 5, 6, 3, 5);
    if (variant === 2) {
      bandSym(grid, 'W', 6, 7, 3, 5);
      hSym(grid, 'W', 5, 4, 5);
    }
    if (variant === 4) {
      pointsSym(grid, 'W', [[4, 5], [5, 6], [4, 7]]);
      pointsSym(grid, 'D', [[4, 8], [5, 9], [4, 10]]);
    }
    hSym(grid, 'D', 9, 3, 5);
    pointsSym(grid, 'A', [[2, 8], [2, 10], [6, 5]]);
    if (variant === 1 || variant === 4) hSym(grid, 'A', 3, 4, 5);
    return;
  }

  if (phase === 1) {
    if (variant === 0) {
      rectSym(grid, 'F', 1, 5, 6, 13);
      rectSym(grid, 'B', 2, 6, 3, 11);
      rectSym(grid, 'B', 5, 6, 5, 11);
      rectSym(grid, 'W', 3, 7, 4, 9);
      hSym(grid, 'A', 4, 2, 5);
      hSym(grid, 'D', 12, 2, 5);
      return;
    }
    if (variant === 1) {
      rectSym(grid, 'F', 2, 4, 5, 13);
      bandSym(grid, 'B', 5, 11, 3, 4);
      bandSym(grid, 'W', 6, 7, 3, 4);
      pointsSym(grid, 'A', [[2, 5], [5, 5], [2, 10], [5, 10]]);
      rectSym(grid, 'D', 2, 12, 5, 12);
      return;
    }
    if (variant === 2) {
      rectSym(grid, 'F', 2, 2, 5, 13);
      rectSym(grid, 'B', 3, 3, 4, 12);
      hSym(grid, 'W', 4, 2, 5);
      hSym(grid, 'W', 5, 3, 4);
      pointsSym(grid, 'A', [[2, 3], [2, 6], [5, 8], [5, 11]]);
      rectSym(grid, 'D', 3, 10, 4, 11);
      return;
    }
    if (variant === 3) {
      rectSym(grid, 'F', 1, 3, 6, 12);
      rectSym(grid, 'B', 2, 4, 5, 11);
      pointsSym(grid, 'W', [[3, 4], [4, 4], [3, 5], [4, 5]]);
      vSym(grid, 'F', 3, 2, 3);
      pointsSym(grid, 'A', [[2, 8], [5, 8], [2, 10], [5, 10]]);
      rectSym(grid, 'D', 3, 11, 4, 12);
      return;
    }
    rectSym(grid, 'F', 1, 2, 6, 13);
    rectSym(grid, 'B', 2, 3, 5, 12);
    bandSym(grid, 'W', 5, 7, 2, 5);
    pointsSym(grid, 'A', [[2, 4], [2, 8], [2, 10], [5, 4], [5, 8], [5, 10]]);
    rectSym(grid, 'D', 3, 10, 4, 12);
    return;
  }

  if (phase === 2) {
    if (variant === 0) {
      rectSym(grid, 'F', 2, 3, 5, 12);
      rectSym(grid, 'B', 3, 5, 4, 10);
      bandSym(grid, 'W', 5, 6, 2, 5);
      pointsSym(grid, 'A', [[2, 8], [2, 9], [5, 8], [5, 9]]);
      hSym(grid, 'D', 11, 3, 4);
      return;
    }
    if (variant === 1) {
      rectSym(grid, 'F', 3, 2, 4, 13);
      rectSym(grid, 'B', 2, 4, 5, 6);
      rectSym(grid, 'W', 2, 7, 5, 9);
      pointsSym(grid, 'A', [[3, 3], [4, 3], [2, 5], [5, 5]]);
      hSym(grid, 'D', 11, 2, 5);
      return;
    }
    if (variant === 2) {
      rectSym(grid, 'F', 2, 5, 5, 12);
      rectSym(grid, 'B', 3, 6, 4, 10);
      pointsSym(grid, 'W', [[3, 5], [4, 5], [2, 6], [5, 6]]);
      hSym(grid, 'A', 4, 3, 4);
      pointsSym(grid, 'D', [[3, 11], [4, 11], [2, 10], [5, 10]]);
      return;
    }
    if (variant === 3) {
      rectSym(grid, 'F', 2, 3, 5, 13);
      rectSym(grid, 'B', 3, 4, 4, 11);
      bandSym(grid, 'W', 5, 6, 3, 4);
      pointsSym(grid, 'A', [[2, 5], [5, 5], [2, 9], [5, 9]]);
      hSym(grid, 'D', 12, 2, 5);
      return;
    }
    rectSym(grid, 'F', 2, 4, 5, 12);
    rectSym(grid, 'B', 3, 5, 4, 10);
    pointsSym(grid, 'W', [[2, 6], [2, 7], [5, 6], [5, 7], [3, 5], [4, 5]]);
    pointsSym(grid, 'A', [[2, 9], [5, 9], [3, 11], [4, 11]]);
    hSym(grid, 'D', 12, 3, 4);
    return;
  }

  if (variant === 0) {
    rectSym(grid, 'F', 1, 6, 6, 13);
    rectSym(grid, 'B', 2, 7, 5, 12);
    vSym(grid, 'W', 3, 8, 11);
    pointsSym(grid, 'A', [[5, 8], [5, 10], [5, 12]]);
    hSym(grid, 'D', 13, 2, 5);
    return;
  }
  if (variant === 1) {
    rectSym(grid, 'F', 1, 2, 6, 13);
    rectSym(grid, 'B', 2, 3, 5, 12);
    bandSym(grid, 'W', 5, 10, 3, 4);
    pointsSym(grid, 'A', [[2, 4], [2, 7], [2, 10], [5, 4], [5, 7], [5, 10]]);
    rectSym(grid, 'D', 3, 11, 4, 12);
    return;
  }
  if (variant === 2) {
    rectSym(grid, 'F', 2, 3, 5, 13);
    rectSym(grid, 'B', 3, 4, 4, 12);
    pointsSym(grid, 'W', [[3, 6], [4, 6], [3, 8], [4, 8], [3, 10], [4, 10]]);
    pointsSym(grid, 'A', [[2, 4], [5, 4], [2, 11], [5, 11]]);
    hSym(grid, 'D', 12, 3, 4);
    return;
  }
  if (variant === 3) {
    rectSym(grid, 'F', 2, 4, 5, 13);
    rectSym(grid, 'B', 3, 5, 4, 12);
    hSym(grid, 'W', 7, 3, 4);
    hSym(grid, 'W', 8, 2, 5);
    pointsSym(grid, 'A', [[2, 6], [5, 6], [2, 10], [5, 10]]);
    hSym(grid, 'D', 12, 2, 5);
    return;
  }
  rectSym(grid, 'F', 1, 3, 6, 13);
  rectSym(grid, 'B', 2, 4, 5, 12);
  rectSym(grid, 'W', 3, 5, 4, 6);
  pointsSym(grid, 'A', [[2, 7], [2, 9], [5, 7], [5, 9], [3, 3], [4, 3]]);
  rectSym(grid, 'D', 3, 10, 4, 12);
}

function drawMachine(grid: Grid, style: number): void {
  const phase = Math.floor(style / 5);
  const variant = style % 5;

  if (phase === 0) {
    rectSym(grid, 'F', 1, 2, 6, 13);
    rectSym(grid, 'C', 2, 3, 5, 12);
    if (variant === 0) bandSym(grid, 'N', 1, 2, 2, 5);
    if (variant === 1) {
      hSym(grid, 'N', 1, 1, 6);
      pointsSym(grid, 'N', [[2, 2], [3, 2], [4, 2], [5, 2]]);
    }
    if (variant === 2) {
      pointsSym(grid, 'N', [[3, 1], [4, 1], [2, 2], [5, 2]]);
      hSym(grid, 'N', 3, 3, 4);
    }
    if (variant === 3) {
      rectSym(grid, 'N', 3, 1, 4, 3);
      pointsSym(grid, 'N', [[2, 2], [5, 2]]);
    }
    if (variant === 4) {
      hSym(grid, 'N', 2, 2, 5);
      pointsSym(grid, 'N', [[2, 1], [5, 1], [3, 3], [4, 3]]);
    }
    bandSym(grid, 'P', 5, 9, 3, 4);
    if (variant === 1 || variant === 3) hSym(grid, 'P', 7, 2, 5);
    pointsSym(grid, 'S', [[3, 11], [4, 11], [3, 12], [4, 12]]);
    pointsSym(grid, 'N', [[2, 6], [2, 8], [5, 10]]);
    return;
  }

  if (phase === 1) {
    if (variant <= 2) {
      rectSym(grid, 'F', 2, 2, 5, 13);
      rectSym(grid, 'C', 3, 3, 4, 12);
      pointsSym(grid, 'N', [[2, 4], [5, 4], [2, 8], [5, 8], [3, 2], [4, 2]]);
      bandSym(grid, 'P', 5, 9, 3, 4);
      rectSym(grid, 'S', 3, 11, 4, 12);
      if (variant === 0) pointsSym(grid, 'P', [[2, 6], [5, 6], [2, 10], [5, 10]]);
      if (variant === 1) hSym(grid, 'N', 6, 2, 5);
      if (variant === 2) hSym(grid, 'N', 9, 2, 5);
      return;
    }
    rectSym(grid, 'F', 1, 3, 6, 13);
    rectSym(grid, 'C', 2, 4, 5, 12);
    bandSym(grid, 'P', 5, 8, 3, 4);
    pointsSym(grid, 'S', [[3, 10], [4, 10], [3, 11], [4, 11]]);
    if (variant === 3) {
      hSym(grid, 'N', 2, 2, 5);
      pointsSym(grid, 'N', [[2, 5], [5, 5], [2, 9], [5, 9]]);
    } else {
      hSym(grid, 'N', 2, 1, 6);
      hSym(grid, 'N', 3, 2, 5);
      pointsSym(grid, 'N', [[2, 7], [5, 7]]);
    }
    return;
  }

  if (phase === 2) {
    rectSym(grid, 'F', 1, 2, 6, 13);
    rectSym(grid, 'C', 2, 3, 5, 12);
    rectSym(grid, 'P', 3, 4, 4, 9);
    rectSym(grid, 'S', 3, 10, 4, 12);
    if (variant === 0) {
      pointsSym(grid, 'N', [[2, 2], [5, 2], [3, 1], [4, 1], [2, 8], [5, 8]]);
    } else if (variant === 1) {
      hSym(grid, 'N', 1, 2, 5);
      pointsSym(grid, 'N', [[2, 5], [5, 5], [2, 9], [5, 9], [3, 11], [4, 11]]);
    } else if (variant === 2) {
      rectSym(grid, 'N', 2, 1, 5, 2);
      pointsSym(grid, 'N', [[2, 6], [5, 6], [2, 10], [5, 10]]);
    } else if (variant === 3) {
      pointsSym(grid, 'N', [[2, 2], [5, 2], [2, 4], [5, 4], [3, 1], [4, 1], [3, 10], [4, 10]]);
    } else {
      hSym(grid, 'N', 1, 1, 6);
      pointsSym(grid, 'N', [[2, 3], [5, 3], [2, 6], [5, 6], [2, 9], [5, 9]]);
    }
    return;
  }

  rectSym(grid, 'F', 2, 2, 5, 13);
  rectSym(grid, 'C', 3, 3, 4, 12);
  if (variant === 0) {
    bandSym(grid, 'N', 1, 2, 2, 5);
    bandSym(grid, 'P', 5, 6, 3, 4);
    rectSym(grid, 'S', 3, 9, 4, 12);
    pointsSym(grid, 'N', [[2, 7], [5, 7]]);
    return;
  }
  if (variant === 1) {
    hSym(grid, 'N', 1, 2, 5);
    pointsSym(grid, 'N', [[2, 2], [5, 2], [3, 8], [4, 8]]);
    bandSym(grid, 'P', 5, 7, 3, 4);
    rectSym(grid, 'S', 3, 10, 4, 12);
    return;
  }
  if (variant === 2) {
    hSym(grid, 'N', 2, 2, 5);
    rectSym(grid, 'P', 3, 5, 4, 6);
    pointsSym(grid, 'S', [[3, 8], [4, 8], [3, 10], [4, 10], [3, 12], [4, 12]]);
    pointsSym(grid, 'N', [[2, 6], [5, 6], [2, 11], [5, 11]]);
    return;
  }
  if (variant === 3) {
    bandSym(grid, 'N', 1, 2, 2, 5);
    bandSym(grid, 'P', 4, 7, 3, 4);
    rectSym(grid, 'S', 3, 9, 4, 12);
    pointsSym(grid, 'N', [[2, 8], [5, 8]]);
    return;
  }
  hSym(grid, 'N', 1, 1, 6);
  hSym(grid, 'N', 2, 2, 5);
  rectSym(grid, 'P', 3, 5, 4, 8);
  rectSym(grid, 'S', 3, 10, 4, 12);
  pointsSym(grid, 'N', [[2, 6], [5, 6], [2, 9], [5, 9]]);
}

function drawBuilding(grid: Grid, style: number): void {
  const phase = Math.floor(style / 5);
  const variant = style % 5;

  if (phase === 0) {
    if (variant === 0) {
      for (let y = 2; y <= 13; y++) hSym(grid, 'F', y, Math.max(1, 6 - Math.floor((y - 2) / 2)), 6);
      bandSym(grid, 'S', 4, 12, 3, 4);
      pointsSym(grid, 'W', [[3, 6], [4, 6], [3, 8], [4, 8], [3, 10], [4, 10]]);
      hSym(grid, 'N', 1, 3, 4);
      pointsSym(grid, 'D', [[2, 12], [5, 12]]);
      return;
    }
    if (variant === 1) {
      rectSym(grid, 'F', 2, 1, 5, 13);
      rectSym(grid, 'S', 3, 3, 4, 12);
      pointsSym(grid, 'W', [[3, 4], [4, 4], [3, 6], [4, 6], [3, 8], [4, 8], [3, 10], [4, 10]]);
      hSym(grid, 'N', 2, 2, 5);
      hSym(grid, 'D', 12, 2, 5);
      return;
    }
    if (variant === 2) {
      bandSym(grid, 'F', 3, 13, 1, 6);
      hSym(grid, 'F', 2, 2, 5);
      hSym(grid, 'F', 1, 3, 4);
      bandSym(grid, 'S', 4, 12, 2, 5);
      hSym(grid, 'W', 6, 3, 4);
      hSym(grid, 'W', 8, 3, 4);
      hSym(grid, 'W', 10, 3, 4);
      rectSym(grid, 'D', 3, 11, 4, 13);
      return;
    }
    if (variant === 3) {
      hSym(grid, 'F', 2, 1, 6);
      vSym(grid, 'F', 2, 3, 13);
      vSym(grid, 'F', 5, 3, 13);
      bandSym(grid, 'S', 4, 12, 2, 5);
      hSym(grid, 'N', 3, 2, 5);
      hSym(grid, 'W', 6, 3, 4);
      hSym(grid, 'W', 8, 3, 4);
      rectSym(grid, 'D', 3, 11, 4, 12);
      return;
    }
    rectSym(grid, 'F', 1, 3, 6, 13);
    bandSym(grid, 'S', 4, 12, 2, 5);
    hSym(grid, 'W', 5, 3, 4);
    hSym(grid, 'W', 7, 3, 4);
    hSym(grid, 'W', 9, 3, 4);
    pointsSym(grid, 'N', [[2, 3], [5, 3], [3, 2], [4, 2]]);
    pointsSym(grid, 'D', [[2, 12], [5, 12], [3, 11], [4, 11]]);
    return;
  }

  if (phase === 1) {
    if (variant === 0) {
      hSym(grid, 'F', 1, 1, 6);
      hSym(grid, 'F', 2, 2, 5);
      rectSym(grid, 'F', 2, 3, 5, 14);
      rectSym(grid, 'S', 3, 4, 4, 13);
      pointsSym(grid, 'W', [[3, 6], [4, 6], [3, 8], [4, 8], [3, 10], [4, 10], [3, 12], [4, 12]]);
      hSym(grid, 'N', 3, 2, 5);
      pointsSym(grid, 'D', [[2, 13], [5, 13], [3, 14], [4, 14]]);
      return;
    }
    if (variant === 1) {
      rectSym(grid, 'F', 2, 2, 5, 14);
      rectSym(grid, 'S', 3, 3, 4, 13);
      pointsSym(grid, 'F', [[1, 6], [1, 8], [1, 10], [1, 12], [6, 6], [6, 8], [6, 10], [6, 12]]);
      pointsSym(grid, 'W', [[3, 5], [4, 5], [3, 7], [4, 7], [3, 9], [4, 9], [3, 11], [4, 11]]);
      hSym(grid, 'N', 2, 2, 5);
      rectSym(grid, 'D', 3, 12, 4, 14);
      return;
    }
    if (variant === 2) {
      rectSym(grid, 'F', 3, 1, 4, 14);
      hSym(grid, 'F', 3, 2, 5);
      hSym(grid, 'F', 4, 2, 5);
      rectSym(grid, 'S', 3, 2, 4, 13);
      pointsSym(grid, 'W', [[3, 4], [4, 4], [3, 6], [4, 6], [3, 8], [4, 8], [3, 10], [4, 10], [3, 12], [4, 12]]);
      pointsSym(grid, 'N', [[3, 0], [4, 0], [3, 2], [4, 2]]);
      hSym(grid, 'D', 14, 2, 5);
      return;
    }
    if (variant === 3) {
      rectSym(grid, 'F', 2, 2, 5, 14);
      pointsSym(grid, 'F', [[1, 4], [1, 5], [6, 4], [6, 5], [1, 12], [6, 12]]);
      hSym(grid, 'F', 1, 3, 4);
      rectSym(grid, 'S', 3, 4, 4, 13);
      bandSym(grid, 'W', 5, 10, 3, 4);
      hSym(grid, 'N', 3, 2, 5);
      rectSym(grid, 'D', 3, 12, 4, 14);
      return;
    }
    rectSym(grid, 'F', 1, 4, 6, 14);
    hSym(grid, 'F', 3, 2, 5);
    hSym(grid, 'F', 2, 3, 4);
    rectSym(grid, 'S', 2, 5, 5, 13);
    pointsSym(grid, 'W', [[3, 6], [4, 6], [3, 8], [4, 8], [3, 10], [4, 10], [2, 12], [5, 12]]);
    hSym(grid, 'N', 2, 2, 5);
    pointsSym(grid, 'D', [[3, 13], [4, 13], [2, 11], [5, 11]]);
    return;
  }

  if (phase === 2) {
    if (variant === 0) {
      rectSym(grid, 'F', 2, 2, 5, 14);
      bandSym(grid, 'S', 3, 13, 3, 4);
      pointsSym(grid, 'W', [[3, 4], [4, 4], [3, 6], [4, 6], [3, 8], [4, 8], [3, 10], [4, 10]]);
      hSym(grid, 'N', 2, 2, 5);
      rectSym(grid, 'D', 3, 12, 4, 13);
      return;
    }
    if (variant === 1) {
      rectSym(grid, 'F', 2, 3, 5, 14);
      bandSym(grid, 'S', 4, 13, 3, 4);
      hSym(grid, 'N', 3, 2, 5);
      pointsSym(grid, 'W', [[3, 6], [4, 6], [3, 8], [4, 8], [3, 10], [4, 10], [3, 12], [4, 12]]);
      hSym(grid, 'D', 14, 2, 5);
      return;
    }
    if (variant === 2) {
      rectSym(grid, 'F', 1, 5, 6, 12);
      rectSym(grid, 'S', 2, 6, 5, 11);
      hSym(grid, 'N', 4, 2, 5);
      hSym(grid, 'W', 8, 3, 4);
      hSym(grid, 'D', 11, 2, 5);
      pointsSym(grid, 'N', [[2, 5], [5, 5]]);
      return;
    }
    if (variant === 3) {
      rectSym(grid, 'F', 1, 6, 6, 13);
      rectSym(grid, 'S', 2, 7, 5, 12);
      hSym(grid, 'N', 5, 2, 5);
      hSym(grid, 'W', 9, 3, 4);
      pointsSym(grid, 'D', [[3, 12], [4, 12], [2, 11], [5, 11]]);
      return;
    }
    rectSym(grid, 'F', 1, 3, 6, 14);
    rectSym(grid, 'S', 2, 4, 5, 13);
    hSym(grid, 'N', 2, 2, 5);
    pointsSym(grid, 'W', [[3, 5], [4, 5], [3, 7], [4, 7], [3, 9], [4, 9], [3, 11], [4, 11]]);
    rectSym(grid, 'D', 3, 12, 4, 13);
    return;
  }

  if (variant === 0) {
    rectSym(grid, 'F', 1, 3, 6, 14);
    hSym(grid, 'F', 2, 1, 6);
    rectSym(grid, 'S', 2, 4, 5, 13);
    bandSym(grid, 'W', 6, 10, 2, 5);
    hSym(grid, 'N', 4, 2, 5);
    rectSym(grid, 'D', 3, 11, 4, 14);
    return;
  }
  if (variant === 1) {
    rectSym(grid, 'F', 1, 5, 6, 13);
    hSym(grid, 'F', 3, 1, 6);
    hSym(grid, 'F', 4, 2, 5);
    rectSym(grid, 'S', 2, 6, 5, 12);
    bandSym(grid, 'W', 7, 10, 3, 4);
    hSym(grid, 'N', 4, 2, 5);
    pointsSym(grid, 'D', [[2, 12], [5, 12], [3, 13], [4, 13]]);
    return;
  }
  if (variant === 2) {
    rectSym(grid, 'F', 2, 5, 5, 13);
    hSym(grid, 'F', 4, 2, 5);
    rectSym(grid, 'S', 3, 6, 4, 12);
    pointsSym(grid, 'W', [[3, 7], [4, 7], [3, 9], [4, 9], [2, 8], [5, 8]]);
    pointsSym(grid, 'N', [[2, 4], [5, 4], [3, 3], [4, 3]]);
    pointsSym(grid, 'D', [[2, 11], [5, 11], [3, 13], [4, 13]]);
    return;
  }
  if (variant === 3) {
    rectSym(grid, 'F', 2, 3, 5, 14);
    pointsSym(grid, 'F', [[1, 5], [1, 6], [6, 5], [6, 6], [1, 12], [6, 12]]);
    hSym(grid, 'F', 2, 3, 4);
    rectSym(grid, 'S', 3, 4, 4, 13);
    pointsSym(grid, 'W', [[2, 7], [5, 7], [3, 9], [4, 9], [2, 11], [5, 11]]);
    hSym(grid, 'N', 3, 2, 5);
    rectSym(grid, 'D', 3, 12, 4, 14);
    return;
  }
  rectSym(grid, 'F', 3, 5, 4, 14);
  rectSym(grid, 'S', 3, 6, 4, 13);
  hSym(grid, 'F', 4, 1, 6);
  hSym(grid, 'F', 3, 2, 5);
  hSym(grid, 'N', 2, 2, 5);
  rectSym(grid, 'W', 2, 2, 5, 3);
  pointsSym(grid, 'W', [[3, 8], [4, 8], [3, 10], [4, 10], [3, 12], [4, 12]]);
  pointsSym(grid, 'D', [[2, 13], [5, 13], [3, 14], [4, 14]]);
}

function drawStreet(grid: Grid, style: number): void {
  const phase = Math.floor(style / 5);
  const variant = style % 5;

  if (phase === 0) {
    if (variant === 0) {
      rectSym(grid, 'P', 3, 3, 4, 12);
      hSym(grid, 'T', 2, 2, 5);
      hSym(grid, 'L', 5, 2, 5);
      rectSym(grid, 'B', 2, 13, 5, 14);
      pointsSym(grid, 'A', [[2, 4], [5, 4], [2, 6], [5, 6]]);
      return;
    }
    if (variant === 1) {
      rectSym(grid, 'P', 3, 3, 4, 12);
      pointsSym(grid, 'T', [[2, 2], [3, 1], [4, 1], [5, 2]]);
      pointsSym(grid, 'L', [[2, 4], [5, 4]]);
      rectSym(grid, 'B', 2, 13, 5, 14);
      pointsSym(grid, 'A', [[3, 6], [4, 6], [3, 8], [4, 8]]);
      return;
    }
    if (variant === 2) {
      rectSym(grid, 'P', 3, 3, 4, 12);
      rectSym(grid, 'T', 2, 2, 5, 5);
      pointsSym(grid, 'L', [[3, 3], [4, 3], [3, 4], [4, 4]]);
      rectSym(grid, 'B', 2, 13, 5, 14);
      pointsSym(grid, 'A', [[2, 6], [5, 6], [2, 8], [5, 8]]);
      return;
    }
    if (variant === 3) {
      rectSym(grid, 'P', 3, 3, 4, 12);
      rectSym(grid, 'T', 2, 2, 5, 4);
      pointsSym(grid, 'L', [[3, 5], [4, 5], [3, 7], [4, 7], [3, 9], [4, 9]]);
      rectSym(grid, 'B', 2, 13, 5, 14);
      pointsSym(grid, 'A', [[2, 6], [5, 6]]);
      return;
    }
    rectSym(grid, 'P', 2, 4, 5, 11);
    pointsSym(grid, 'T', [[2, 3], [5, 3], [3, 2], [4, 2]]);
    hSym(grid, 'L', 6, 3, 4);
    rectSym(grid, 'B', 2, 12, 5, 14);
    pointsSym(grid, 'A', [[2, 8], [5, 8], [3, 10], [4, 10]]);
    return;
  }

  if (phase === 1) {
    if (variant === 0) {
      rectSym(grid, 'B', 2, 5, 5, 11);
      pointsSym(grid, 'T', [[3, 5], [4, 5], [2, 6], [5, 6]]);
      pointsSym(grid, 'L', [[3, 7], [4, 7], [3, 9], [4, 9]]);
      pointsSym(grid, 'A', [[2, 8], [5, 8]]);
      rectSym(grid, 'P', 3, 12, 4, 13);
      return;
    }
    if (variant === 1) {
      rectSym(grid, 'P', 3, 3, 4, 13);
      rectSym(grid, 'T', 2, 4, 5, 8);
      pointsSym(grid, 'L', [[3, 5], [4, 5], [3, 7], [4, 7]]);
      rectSym(grid, 'B', 2, 12, 5, 14);
      pointsSym(grid, 'A', [[2, 9], [5, 9]]);
      return;
    }
    if (variant === 2) {
      rectSym(grid, 'B', 2, 6, 5, 13);
      rectSym(grid, 'P', 3, 7, 4, 12);
      hSym(grid, 'T', 5, 2, 5);
      pointsSym(grid, 'L', [[3, 8], [4, 8], [3, 10], [4, 10]]);
      pointsSym(grid, 'A', [[2, 9], [5, 9], [2, 11], [5, 11]]);
      return;
    }
    if (variant === 3) {
      rectSym(grid, 'B', 2, 4, 5, 12);
      rectSym(grid, 'P', 3, 5, 4, 11);
      hSym(grid, 'T', 3, 2, 5);
      pointsSym(grid, 'L', [[3, 6], [4, 6], [3, 8], [4, 8]]);
      pointsSym(grid, 'A', [[2, 7], [5, 7], [2, 10], [5, 10]]);
      return;
    }
    rectSym(grid, 'P', 3, 4, 4, 12);
    rectSym(grid, 'B', 2, 5, 5, 13);
    hSym(grid, 'T', 3, 2, 5);
    pointsSym(grid, 'L', [[3, 7], [4, 7], [3, 9], [4, 9]]);
    pointsSym(grid, 'A', [[2, 10], [5, 10], [3, 11], [4, 11]]);
    return;
  }

  if (phase === 2) {
    if (variant === 0) {
      rectSym(grid, 'P', 3, 5, 4, 12);
      rectSym(grid, 'T', 2, 4, 5, 6);
      rectSym(grid, 'B', 2, 13, 5, 14);
      pointsSym(grid, 'L', [[3, 7], [4, 7], [3, 9], [4, 9]]);
      pointsSym(grid, 'A', [[2, 6], [5, 6]]);
      return;
    }
    if (variant === 1) {
      rectSym(grid, 'P', 3, 2, 4, 13);
      pointsSym(grid, 'T', [[2, 3], [5, 3], [2, 5], [5, 5], [2, 7], [5, 7]]);
      pointsSym(grid, 'L', [[3, 8], [4, 8], [3, 10], [4, 10]]);
      rectSym(grid, 'B', 2, 13, 5, 14);
      pointsSym(grid, 'A', [[2, 9], [5, 9]]);
      return;
    }
    if (variant === 2) {
      rectSym(grid, 'P', 3, 4, 4, 13);
      rectSym(grid, 'T', 2, 3, 5, 5);
      pointsSym(grid, 'L', [[3, 6], [4, 6], [3, 8], [4, 8]]);
      rectSym(grid, 'B', 2, 13, 5, 14);
      pointsSym(grid, 'A', [[2, 10], [5, 10]]);
      return;
    }
    if (variant === 3) {
      rectSym(grid, 'P', 2, 6, 5, 11);
      pointsSym(grid, 'T', [[2, 5], [5, 5], [3, 4], [4, 4]]);
      pointsSym(grid, 'L', [[3, 7], [4, 7], [3, 9], [4, 9]]);
      rectSym(grid, 'B', 2, 12, 5, 13);
      pointsSym(grid, 'A', [[2, 8], [5, 8]]);
      return;
    }
    rectSym(grid, 'P', 2, 5, 5, 12);
    rectSym(grid, 'T', 2, 4, 5, 5);
    pointsSym(grid, 'L', [[3, 7], [4, 7], [3, 9], [4, 9], [3, 11], [4, 11]]);
    rectSym(grid, 'B', 2, 13, 5, 14);
    pointsSym(grid, 'A', [[2, 6], [5, 6]]);
    return;
  }

  if (variant === 0) {
    rectSym(grid, 'P', 3, 3, 4, 13);
    rectSym(grid, 'T', 2, 2, 5, 4);
    pointsSym(grid, 'L', [[3, 6], [4, 6], [3, 8], [4, 8]]);
    rectSym(grid, 'B', 2, 13, 5, 14);
    pointsSym(grid, 'A', [[2, 10], [5, 10]]);
    return;
  }
  if (variant === 1) {
    rectSym(grid, 'P', 2, 3, 5, 13);
    hSym(grid, 'T', 2, 2, 5);
    pointsSym(grid, 'L', [[3, 5], [4, 5], [3, 7], [4, 7], [3, 9], [4, 9]]);
    rectSym(grid, 'B', 2, 13, 5, 14);
    pointsSym(grid, 'A', [[2, 11], [5, 11]]);
    return;
  }
  if (variant === 2) {
    pointsSym(grid, 'B', [[3, 5], [4, 5], [2, 6], [5, 6], [3, 7], [4, 7], [2, 8], [5, 8], [3, 9], [4, 9], [2, 10], [5, 10]]);
    pointsSym(grid, 'T', [[3, 4], [4, 4]]);
    pointsSym(grid, 'P', [[3, 11], [4, 11], [3, 12], [4, 12]]);
    pointsSym(grid, 'L', [[3, 6], [4, 6], [3, 8], [4, 8]]);
    pointsSym(grid, 'A', [[2, 7], [5, 7]]);
    return;
  }
  if (variant === 3) {
    rectSym(grid, 'P', 3, 5, 4, 12);
    rectSym(grid, 'T', 2, 4, 5, 6);
    pointsSym(grid, 'L', [[3, 8], [4, 8], [3, 10], [4, 10]]);
    rectSym(grid, 'B', 2, 12, 5, 13);
    pointsSym(grid, 'A', [[2, 9], [5, 9]]);
    return;
  }
  rectSym(grid, 'P', 2, 6, 5, 11);
  hSym(grid, 'T', 5, 2, 5);
  hSym(grid, 'A', 8, 2, 5);
  hSym(grid, 'L', 9, 3, 4);
  rectSym(grid, 'B', 2, 12, 5, 13);
  pointsSym(grid, 'A', [[2, 10], [5, 10]]);
}

function drawCulture(grid: Grid, style: number): void {
  const phase = Math.floor(style / 5);
  const variant = style % 5;

  if (phase === 0) {
    if (variant === 0 || variant === 1) {
      pointsSym(grid, 'F', [[3, 2], [4, 2], [2, 3], [5, 3], [2, 8], [5, 8], [3, 9], [4, 9]]);
      rectSym(grid, 'G', 3, 3, 4, 8);
      rectSym(grid, 'O', 3, 5, 4, 6);
      rectSym(grid, 'D', 3, 10, 4, 12);
      pointsSym(grid, 'L', [[2, 5], [5, 5], [2, 7], [5, 7]]);
      if (variant === 1) hSym(grid, 'L', 6, 3, 4);
      return;
    }
    if (variant === 2) {
      rectSym(grid, 'F', 1, 4, 6, 13);
      rectSym(grid, 'G', 2, 5, 5, 12);
      rectSym(grid, 'O', 3, 7, 4, 8);
      hSym(grid, 'L', 4, 2, 5);
      pointsSym(grid, 'D', [[2, 11], [5, 11], [3, 12], [4, 12]]);
      return;
    }
    if (variant === 3) {
      rectSym(grid, 'F', 1, 5, 6, 13);
      rectSym(grid, 'G', 2, 6, 5, 11);
      rectSym(grid, 'O', 3, 7, 4, 8);
      hSym(grid, 'L', 5, 1, 6);
      pointsSym(grid, 'D', [[3, 12], [4, 12], [2, 11], [5, 11]]);
      return;
    }
    rectSym(grid, 'F', 2, 5, 5, 13);
    rectSym(grid, 'G', 3, 6, 4, 12);
    pointsSym(grid, 'O', [[3, 7], [4, 7], [3, 8], [4, 8]]);
    hSym(grid, 'L', 5, 2, 5);
    pointsSym(grid, 'D', [[2, 10], [5, 10], [3, 12], [4, 12]]);
    return;
  }

  if (phase === 1) {
    if (variant === 0) {
      rectSym(grid, 'F', 2, 4, 5, 12);
      rectSym(grid, 'G', 3, 5, 4, 11);
      pointsSym(grid, 'O', [[3, 6], [4, 6], [3, 8], [4, 8]]);
      hSym(grid, 'L', 4, 2, 5);
      rectSym(grid, 'D', 3, 12, 4, 13);
      return;
    }
    if (variant === 1) {
      rectSym(grid, 'F', 2, 4, 5, 13);
      rectSym(grid, 'G', 3, 5, 4, 12);
      pointsSym(grid, 'O', [[3, 6], [4, 6], [3, 7], [4, 7]]);
      hSym(grid, 'L', 5, 2, 5);
      rectSym(grid, 'D', 3, 11, 4, 13);
      return;
    }
    if (variant === 2) {
      rectSym(grid, 'F', 1, 3, 6, 13);
      rectSym(grid, 'G', 2, 4, 5, 12);
      rectSym(grid, 'O', 3, 6, 4, 8);
      pointsSym(grid, 'L', [[2, 5], [5, 5], [3, 4], [4, 4]]);
      rectSym(grid, 'D', 3, 11, 4, 12);
      return;
    }
    if (variant === 3) {
      rectSym(grid, 'F', 1, 5, 6, 13);
      rectSym(grid, 'G', 2, 6, 5, 12);
      pointsSym(grid, 'O', [[3, 7], [4, 7], [3, 8], [4, 8]]);
      hSym(grid, 'L', 4, 2, 5);
      pointsSym(grid, 'D', [[2, 11], [5, 11], [3, 12], [4, 12]]);
      return;
    }
    rectSym(grid, 'F', 1, 4, 6, 13);
    rectSym(grid, 'G', 2, 5, 5, 12);
    rectSym(grid, 'O', 3, 7, 4, 8);
    pointsSym(grid, 'L', [[2, 6], [5, 6], [2, 8], [5, 8]]);
    rectSym(grid, 'D', 3, 11, 4, 12);
    return;
  }

  if (phase === 2) {
    if (variant === 0) {
      rectSym(grid, 'F', 2, 3, 5, 12);
      rectSym(grid, 'G', 3, 4, 4, 11);
      pointsSym(grid, 'O', [[3, 5], [4, 5], [3, 7], [4, 7]]);
      hSym(grid, 'L', 2, 2, 5);
      rectSym(grid, 'D', 3, 10, 4, 12);
      return;
    }
    if (variant === 1) {
      hSym(grid, 'F', 3, 1, 6);
      vSym(grid, 'F', 1, 4, 10);
      vSym(grid, 'F', 6, 4, 10);
      rectSym(grid, 'G', 2, 4, 5, 10);
      rectSym(grid, 'O', 3, 5, 4, 7);
      hSym(grid, 'L', 3, 2, 5);
      pointsSym(grid, 'D', [[3, 9], [4, 9], [3, 10], [4, 10]]);
      return;
    }
    if (variant === 2) {
      rectSym(grid, 'F', 2, 4, 5, 13);
      rectSym(grid, 'G', 3, 5, 4, 12);
      pointsSym(grid, 'O', [[3, 6], [4, 6], [3, 8], [4, 8]]);
      pointsSym(grid, 'L', [[2, 10], [5, 10], [2, 12], [5, 12]]);
      rectSym(grid, 'D', 3, 11, 4, 13);
      return;
    }
    if (variant === 3) {
      rectSym(grid, 'F', 1, 4, 6, 13);
      rectSym(grid, 'G', 2, 5, 5, 12);
      hSym(grid, 'O', 7, 3, 4);
      pointsSym(grid, 'L', [[2, 6], [5, 6], [2, 8], [5, 8], [2, 10], [5, 10]]);
      rectSym(grid, 'D', 3, 11, 4, 12);
      return;
    }
    rectSym(grid, 'F', 2, 4, 5, 13);
    rectSym(grid, 'G', 3, 5, 4, 12);
    rectSym(grid, 'O', 3, 6, 4, 8);
    pointsSym(grid, 'L', [[2, 5], [5, 5], [2, 9], [5, 9]]);
    rectSym(grid, 'D', 3, 11, 4, 13);
    return;
  }

  if (variant === 0) {
    rectSym(grid, 'F', 1, 3, 6, 13);
    rectSym(grid, 'G', 2, 4, 5, 12);
    pointsSym(grid, 'O', [[3, 5], [4, 5], [3, 7], [4, 7], [3, 9], [4, 9]]);
    rectSym(grid, 'L', 3, 2, 4, 3);
    rectSym(grid, 'D', 3, 11, 4, 12);
    return;
  }
  if (variant === 1) {
    rectSym(grid, 'F', 1, 2, 6, 13);
    rectSym(grid, 'G', 2, 3, 5, 12);
    bandSym(grid, 'O', 5, 8, 3, 4);
    pointsSym(grid, 'L', [[2, 4], [5, 4], [2, 9], [5, 9]]);
    rectSym(grid, 'D', 3, 11, 4, 13);
    return;
  }
  if (variant === 2) {
    rectSym(grid, 'F', 2, 4, 5, 13);
    rectSym(grid, 'G', 3, 5, 4, 12);
    pointsSym(grid, 'O', [[3, 6], [4, 6], [3, 8], [4, 8], [3, 10], [4, 10]]);
    pointsSym(grid, 'L', [[2, 7], [5, 7], [2, 11], [5, 11]]);
    rectSym(grid, 'D', 3, 12, 4, 13);
    return;
  }
  if (variant === 3) {
    rectSym(grid, 'F', 1, 4, 6, 13);
    rectSym(grid, 'G', 2, 5, 5, 12);
    pointsSym(grid, 'O', [[3, 6], [4, 6], [3, 8], [4, 8]]);
    pointsSym(grid, 'L', [[2, 5], [5, 5], [2, 9], [5, 9], [3, 4], [4, 4]]);
    rectSym(grid, 'D', 3, 11, 4, 12);
    return;
  }
  pointsSym(grid, 'F', [[3, 2], [4, 2], [2, 3], [5, 3], [1, 4], [6, 4], [2, 5], [5, 5], [3, 6], [4, 6], [2, 7], [5, 7], [1, 8], [6, 8], [2, 9], [5, 9], [3, 10], [4, 10], [3, 11], [4, 11]]);
  rectSym(grid, 'G', 3, 4, 4, 9);
  rectSym(grid, 'O', 3, 6, 4, 7);
  pointsSym(grid, 'L', [[2, 6], [5, 6], [2, 8], [5, 8]]);
  pointsSym(grid, 'D', [[3, 12], [4, 12], [3, 13], [4, 13]]);
}

function kindSeed(kind: Kind, style: number): number {
  if (kind === 'transit') return style;
  if (kind === 'machine') return 20 + style;
  if (kind === 'building') return 40 + style;
  if (kind === 'street') return 60 + style;
  return 80 + style;
}

function applyTokyoSignature(grid: Grid, kind: Kind, style: number): void {
  const seed = kindSeed(kind, style);
  const pairs: Array<[number, number]> = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [1, 3], [1, 4], [1, 5],
    [2, 3], [2, 4], [2, 5],
    [3, 4], [3, 5],
    [4, 5],
  ];
  const pair = pairs[seed % pairs.length];
  const topX = Math.floor(seed / pairs.length);
  const marker = kind === 'street' ? 'L' : kind === 'machine' ? 'S' : 'D';
  const sideY1 = 3 + (seed % 9);
  const sideY2 = 4 + ((seed * 7) % 8);

  setSym(grid, marker, pair[0], 15);
  setSym(grid, marker, pair[1], 15);
  setSym(grid, marker, topX, 0);
  setSym(grid, marker, 0, sideY1);
  setSym(grid, marker, 0, sideY2);
  if ((seed & 1) === 1) setSym(grid, marker, 1, sideY1);
  if (((seed >> 1) & 1) === 1) setSym(grid, marker, 1, sideY2);
}

function makeTemplate(spec: TokyoSpec, style: number): CompactTemplate {
  const grid = createGrid();
  if (spec.kind === 'transit') drawTransit(grid, style);
  if (spec.kind === 'machine') drawMachine(grid, style);
  if (spec.kind === 'building') drawBuilding(grid, style);
  if (spec.kind === 'street') drawStreet(grid, style);
  if (spec.kind === 'culture') drawCulture(grid, style);
  applyTokyoSignature(grid, spec.kind, style);
  return {
    id: spec.id,
    description: spec.description,
    grid: toRows(grid),
    chars: charsFor(spec.kind),
    colors: colorsFor(spec.kind, style),
  };
}

const TRANSIT_SPECS: TokyoSpec[] = [
  { id: 'yamanote_train_front_tk_16', description: 'Tokyo commuter train front inspired by Yamanote-style city loops.', kind: 'transit' },
  { id: 'chuo_train_front_tk_16', description: 'Orange-line commuter train front for dense urban station traffic.', kind: 'transit' },
  { id: 'ginza_line_front_tk_16', description: 'Metro front icon with compact city-subway proportions.', kind: 'transit' },
  { id: 'asakusa_line_front_tk_16', description: 'Subway line front marker for inner-ward rapid transit.', kind: 'transit' },
  { id: 'shinkansen_nose_tk_16', description: 'Bullet-train inspired front silhouette for high-speed travel.', kind: 'transit' },
  { id: 'station_ticket_gate_tk_16', description: 'Rail station ticket gate pair with central passage lane.', kind: 'transit' },
  { id: 'station_ic_gate_tk_16', description: 'IC card rail gate icon with illuminated entry pads.', kind: 'transit' },
  { id: 'subway_entrance_sign_tk_16', description: 'Subway entrance marker for dense Tokyo underground networks.', kind: 'transit' },
  { id: 'station_platform_clock_tk_16', description: 'Platform clock and frame used across commuter stations.', kind: 'transit' },
  { id: 'station_route_board_tk_16', description: 'Rail route board panel with centered station map field.', kind: 'transit' },
  { id: 'bus_front_tokyo_tk_16', description: 'Tokyo city bus front icon with route display and lights.', kind: 'transit' },
  { id: 'city_bus_stop_sign_tk_16', description: 'Urban bus stop sign pillar with route label area.', kind: 'transit' },
  { id: 'taxi_roof_sign_tk_16', description: 'Tokyo taxi roof sign icon with compact illuminated cap.', kind: 'transit' },
  { id: 'taxi_front_tokyo_tk_16', description: 'Frontal taxi icon for urban transport menus.', kind: 'transit' },
  { id: 'kei_car_front_tk_16', description: 'Compact city kei-car front with rounded micro-car profile.', kind: 'transit' },
  { id: 'delivery_van_front_tk_16', description: 'Local delivery van front used in dense alley logistics.', kind: 'transit' },
  { id: 'bicycle_dock_tk_16', description: 'Bike-share dock terminal icon for station exits.', kind: 'transit' },
  { id: 'metro_map_panel_tk_16', description: 'Metro map panel frame with route light strip.', kind: 'transit' },
  { id: 'escalator_entry_tk_16', description: 'Underground escalator entry symbol for station halls.', kind: 'transit' },
  { id: 'railway_crossing_signal_tk_16', description: 'Rail crossing signal face used on city-side tracks.', kind: 'transit' },
];

const MACHINE_SPECS: TokyoSpec[] = [
  { id: 'vending_machine_soda_tk_16', description: 'Soda vending machine common on Tokyo sidewalks.', kind: 'machine' },
  { id: 'vending_machine_coffee_tk_16', description: 'Hot-can coffee vending machine with lit control panel.', kind: 'machine' },
  { id: 'vending_machine_icecream_tk_16', description: 'Frozen dessert vending machine with bright marquee.', kind: 'machine' },
  { id: 'gacha_machine_blue_tk_16', description: 'Blue capsule toy gacha machine for arcade corners.', kind: 'machine' },
  { id: 'gacha_machine_pink_tk_16', description: 'Pink capsule toy machine with rounded display window.', kind: 'machine' },
  { id: 'claw_arcade_cabinet_tk_16', description: 'Arcade claw cabinet front with prize chamber panel.', kind: 'machine' },
  { id: 'rhythm_arcade_cabinet_tk_16', description: 'Rhythm arcade cabinet front with dual play fields.', kind: 'machine' },
  { id: 'pachinko_machine_front_tk_16', description: 'Pachinko machine facade with illuminated center reel.', kind: 'machine' },
  { id: 'konbini_sign_tk_16', description: 'Convenience-store sign panel seen in dense neighborhoods.', kind: 'machine' },
  { id: 'ramen_noren_sign_tk_16', description: 'Ramen storefront sign with noren-style center strip.', kind: 'machine' },
  { id: 'izakaya_lantern_sign_tk_16', description: 'Izakaya lantern sign fixture for evening street scenes.', kind: 'machine' },
  { id: 'sushi_shop_sign_tk_16', description: 'Sushi counter sign icon for restaurant map overlays.', kind: 'machine' },
  { id: 'karaoke_neon_sign_tk_16', description: 'Karaoke neon sign block with glowing top header.', kind: 'machine' },
  { id: 'pharmacy_sign_cross_tk_16', description: 'Pharmacy sign kiosk with bright cross marker.', kind: 'machine' },
  { id: 'electronics_store_sign_tk_16', description: 'Electronics district sign totem with ad panel slots.', kind: 'machine' },
  { id: 'camera_store_sign_tk_16', description: 'Camera store sign cabinet inspired by Akihabara displays.', kind: 'machine' },
  { id: 'capsule_hotel_sign_tk_16', description: 'Capsule hotel sign pylon with booking indicator.', kind: 'machine' },
  { id: 'coin_locker_unit_tk_16', description: 'Coin locker machine block for station concourse props.', kind: 'machine' },
  { id: 'atm_kiosk_tk_16', description: 'ATM kiosk unit with transaction screen and slot area.', kind: 'machine' },
  { id: 'ticket_kiosk_tk_16', description: 'Ticket kiosk panel used for local rail and events.', kind: 'machine' },
];

const BUILDING_SPECS: TokyoSpec[] = [
  { id: 'tokyo_tower_mini_tk_16', description: 'Tokyo Tower inspired landmark silhouette for skyline sets.', kind: 'building' },
  { id: 'skytree_mini_tk_16', description: 'Tokyo Skytree inspired broadcast tower profile.', kind: 'building' },
  { id: 'pagoda_facade_tk_16', description: 'Pagoda-style front elevation with layered roof tiers.', kind: 'building' },
  { id: 'shrine_gate_torii_tk_16', description: 'Urban shrine torii facade module for path entrances.', kind: 'building' },
  { id: 'shrine_hall_facade_tk_16', description: 'Shrine hall front with centered sacred doorway.', kind: 'building' },
  { id: 'temple_lantern_stand_tk_16', description: 'Temple lantern stand architecture ornament.', kind: 'building' },
  { id: 'apartment_block_small_tk_16', description: 'Small apartment block facade with stacked windows.', kind: 'building' },
  { id: 'apartment_block_tall_tk_16', description: 'Tall apartment facade for high-density residential blocks.', kind: 'building' },
  { id: 'office_tower_glass_tk_16', description: 'Glass office tower frontage for business district maps.', kind: 'building' },
  { id: 'office_tower_neon_tk_16', description: 'Night-lit office tower with rooftop branding strip.', kind: 'building' },
  { id: 'capsule_hotel_facade_tk_16', description: 'Capsule hotel facade with compact modular slots.', kind: 'building' },
  { id: 'narrow_urban_house_tk_16', description: 'Narrow multi-floor Tokyo townhouse front.', kind: 'building' },
  { id: 'crosswalk_overpass_tk_16', description: 'Pedestrian overpass entrance structure for arterial roads.', kind: 'building' },
  { id: 'canal_bridge_arch_tk_16', description: 'Canal-side bridge arch front icon for district maps.', kind: 'building' },
  { id: 'train_station_facade_tk_16', description: 'Rail station frontage with centered hall entrance.', kind: 'building' },
  { id: 'department_store_facade_tk_16', description: 'Department store facade with illuminated ad crown.', kind: 'building' },
  { id: 'convenience_store_facade_tk_16', description: 'Convenience store frontage with bright canopy band.', kind: 'building' },
  { id: 'ramen_shop_facade_tk_16', description: 'Ramen shop frontage with door and sign header.', kind: 'building' },
  { id: 'arcade_building_facade_tk_16', description: 'Arcade building front with stacked neon bays.', kind: 'building' },
  { id: 'rooftop_billboard_tk_16', description: 'Rooftop billboard structure for city skyline overlays.', kind: 'building' },
];

const STREET_SPECS: TokyoSpec[] = [
  { id: 'tokyo_street_lamp_tk_16', description: 'Single street lamp fixture for Tokyo avenue scenes.', kind: 'street' },
  { id: 'double_street_lamp_tk_16', description: 'Double-arm street lamp with mirrored light heads.', kind: 'street' },
  { id: 'pedestrian_signal_tk_16', description: 'Pedestrian crossing signal module with top box.', kind: 'street' },
  { id: 'traffic_signal_tk_16', description: 'Road traffic signal stack for city intersections.', kind: 'street' },
  { id: 'street_name_plate_tk_16', description: 'Street-name sign post with central title board.', kind: 'street' },
  { id: 'manhole_cover_tokyo_tk_16', description: 'Decorative Tokyo manhole cover icon from street utility art.', kind: 'street' },
  { id: 'mail_box_japan_tk_16', description: 'Japanese mail box post for neighborhood props.', kind: 'street' },
  { id: 'recycle_bin_pair_tk_16', description: 'Paired recycle bins commonly seen near stations.', kind: 'street' },
  { id: 'public_phone_booth_tk_16', description: 'Public phone booth front for retro-modern streets.', kind: 'street' },
  { id: 'police_koban_front_tk_16', description: 'Koban police post front icon for civic corners.', kind: 'street' },
  { id: 'fire_hydrant_jp_tk_16', description: 'Japanese fire-hydrant style street safety prop.', kind: 'street' },
  { id: 'utility_pole_lines_tk_16', description: 'Utility pole with cable tiers for urban backstreets.', kind: 'street' },
  { id: 'parking_meter_jp_tk_16', description: 'Urban parking meter unit for curbside management.', kind: 'street' },
  { id: 'bike_parking_rack_tk_16', description: 'Bike parking rack module for station approach lanes.', kind: 'street' },
  { id: 'bench_station_modern_tk_16', description: 'Modern station bench with supported center frame.', kind: 'street' },
  { id: 'timetable_post_tk_16', description: 'Timetable post with service board and base stand.', kind: 'street' },
  { id: 'bus_shelter_front_tk_16', description: 'Bus shelter front section with sign and bench zone.', kind: 'street' },
  { id: 'wayfinding_pillar_tk_16', description: 'Wayfinding pillar sign for district navigation maps.', kind: 'street' },
  { id: 'warning_cone_pair_tk_16', description: 'Road warning cone pair for street-work scenes.', kind: 'street' },
  { id: 'street_barrier_gate_tk_16', description: 'Street barrier gate used in narrow lane closures.', kind: 'street' },
];

const CULTURE_SPECS: TokyoSpec[] = [
  { id: 'paper_lantern_red_tk_16', description: 'Red paper lantern icon used in evening alleys.', kind: 'culture' },
  { id: 'paper_lantern_gold_tk_16', description: 'Warm gold lantern for festival and izakaya scenes.', kind: 'culture' },
  { id: 'festival_yagura_tk_16', description: 'Festival yagura stage front for matsuri areas.', kind: 'culture' },
  { id: 'matsuri_stall_front_tk_16', description: 'Matsuri stall front with centered serving bay.', kind: 'culture' },
  { id: 'taiko_stage_front_tk_16', description: 'Taiko performance stage front with drum focus area.', kind: 'culture' },
  { id: 'ema_prayer_board_tk_16', description: 'Ema prayer board stand for shrine grounds.', kind: 'culture' },
  { id: 'omikuji_stand_tk_16', description: 'Omikuji draw stand used near shrine entrances.', kind: 'culture' },
  { id: 'shrine_bell_frame_tk_16', description: 'Shrine bell frame icon with hanging center bell.', kind: 'culture' },
  { id: 'stone_komainu_front_tk_16', description: 'Komainu-inspired stone guardian front silhouette.', kind: 'culture' },
  { id: 'bamboo_fountain_tk_16', description: 'Temple garden bamboo fountain front motif.', kind: 'culture' },
  { id: 'sakura_street_banner_tk_16', description: 'Sakura season street banner and support frame.', kind: 'culture' },
  { id: 'neon_gate_arch_tk_16', description: 'Neon gate arch inspired by entertainment districts.', kind: 'culture' },
  { id: 'rainy_umbrella_stand_tk_16', description: 'Umbrella stand front icon for rainy city entries.', kind: 'culture' },
  { id: 'noren_entrance_curtain_tk_16', description: 'Noren entrance curtain frame for small eateries.', kind: 'culture' },
  { id: 'anime_poster_board_tk_16', description: 'Anime poster board stand for station passages.', kind: 'culture' },
  { id: 'idol_live_poster_tk_16', description: 'Idol live event poster frame with marquee top.', kind: 'culture' },
  { id: 'city_night_billboard_tk_16', description: 'Night billboard sign for neon-heavy downtown strips.', kind: 'culture' },
  { id: 'river_lantern_float_tk_16', description: 'River lantern float icon for ceremonial evenings.', kind: 'culture' },
  { id: 'torii_lantern_path_tk_16', description: 'Torii path marker with paired lantern emphasis.', kind: 'culture' },
  { id: 'tokyo_city_emblem_tk_16', description: 'Tokyo city emblem-style crest for UI and maps.', kind: 'culture' },
];

const templates: CompactTemplate[] = [
  ...TRANSIT_SPECS.map((s, i) => makeTemplate(s, i)),
  ...MACHINE_SPECS.map((s, i) => makeTemplate(s, i)),
  ...BUILDING_SPECS.map((s, i) => makeTemplate(s, i)),
  ...STREET_SPECS.map((s, i) => makeTemplate(s, i)),
  ...CULTURE_SPECS.map((s, i) => makeTemplate(s, i)),
];

function silhouetteSet(template: CompactTemplate): Set<number> {
  const set = new Set<number>();
  for (let y = 0; y < template.grid.length; y++) {
    const row = template.grid[y] ?? '';
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== '.') set.add(y * 16 + x);
    }
  }
  return set;
}

function jaccard(a: Set<number>, b: Set<number>): number {
  let intersection = 0;
  for (const v of a) {
    if (b.has(v)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function validateTokyoBatch(input: CompactTemplate[]): void {
  const failures: string[] = [];

  for (const t of input) {
    const usedChars = new Set<string>();
    for (let y = 0; y < 16; y++) {
      const row = t.grid[y] ?? '';
      for (let x = 0; x < 8; x++) {
        const l = row[x] ?? '.';
        const r = row[15 - x] ?? '.';
        if ((l !== '.') !== (r !== '.')) {
          failures.push(`${t.id}: silhouette symmetry break at (${x},${y})`);
          break;
        }
      }
      for (let x = 0; x < 16; x++) {
        const ch = row[x] ?? '.';
        if (ch !== '.') usedChars.add(ch);
      }
    }
    if (usedChars.size < 3) {
      failures.push(`${t.id}: uses only ${usedChars.size} visible roles`);
    }
  }

  const masks = input.map((t) => ({ id: t.id, mask: silhouetteSet(t) }));
  for (let i = 0; i < masks.length; i++) {
    for (let j = i + 1; j < masks.length; j++) {
      const sim = jaccard(masks[i].mask, masks[j].mask);
      if (sim >= 0.965) {
        failures.push(`${masks[i].id} vs ${masks[j].id}: silhouette similarity ${(sim * 100).toFixed(1)}%`);
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(`Tokyo batch quality gate failed (${failures.length} issues). First issue: ${failures[0]}`);
  }
}

validateTokyoBatch(templates);

const batch: BatchDefinition = {
  category: 'buildings',
  exportNames: {
    templates: 'TOKYO_BATCH1_TEMPLATES',
    schemes: 'TOKYO_BATCH1_COLOR_SCHEMES',
  },
  templates,
};

export default batch;
