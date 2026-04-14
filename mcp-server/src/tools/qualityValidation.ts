/**
 * validate_sprite_quality tool — 7 automated quality checks with scoring.
 */

import {
  getProject,
  type McpProject, type McpLayer,
} from '../project.js';
import { type RGBA } from '../lib/pixelBuffer.js';
import { rgbaToHex } from '../lib/colorUtils.js';

// DB16 palette in RGBA
const DB16_HEX = [
  '#140c1c', '#442434', '#30346d', '#4e4a4e', '#854c30', '#346524',
  '#d04648', '#757161', '#597dce', '#d27d2c', '#8595a1', '#6dc2ca',
  '#dad45e', '#deeed6', '#d2aa99',
];

interface CheckResult {
  name: string;
  pass: boolean;
  score: number; // 0-100
  details: string;
  fixSuggestions: string[];
}

// Category density targets: [min%, max%]
const DENSITY_TARGETS: Record<string, [number, number]> = {
  character: [50, 65],
  creature: [45, 60],
  prop: [35, 55],
  weapon: [28, 45],
  ui_panel: [40, 80],
  tile: [90, 100],
  food: [35, 55],
  vehicle: [45, 65],
  building: [55, 80],
  effect: [25, 50],
};

function getMergedPixels(project: McpProject, layerId?: string): RGBA[][] {
  const w = project.width;
  const h = project.height;
  const result: RGBA[][] = [];
  for (let y = 0; y < h; y++) {
    result[y] = [];
    for (let x = 0; x < w; x++) {
      result[y][x] = { r: 0, g: 0, b: 0, a: 0 };
    }
  }

  if (layerId && layerId !== 'all') {
    const layer = project.layers.find(l => l.id === layerId);
    if (!layer) return result;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        result[y][x] = layer.buffer.getPixel(x, y);
      }
    }
  } else {
    // Merge all visible layers bottom-up
    for (const layer of project.layers) {
      if (!layer.visible) continue;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const px = layer.buffer.getPixel(x, y);
          if (px.a > 0) {
            result[y][x] = px;
          }
        }
      }
    }
  }

  return result;
}

function isOpaque(px: RGBA): boolean {
  return px.a > 0;
}

function sameColor(a: RGBA, b: RGBA): boolean {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
}

// Check 1: Orphan pixels
function checkOrphanPixels(pixels: RGBA[][], w: number, h: number): CheckResult {
  const orphans: Array<[number, number]> = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = pixels[y][x];
      if (!isOpaque(px)) continue;

      // Check orthogonal neighbors for same color
      const neighbors = [
        y > 0 ? pixels[y - 1][x] : null,
        y < h - 1 ? pixels[y + 1][x] : null,
        x > 0 ? pixels[y][x - 1] : null,
        x < w - 1 ? pixels[y][x + 1] : null,
      ];

      const hasSameColorNeighbor = neighbors.some(
        n => n && isOpaque(n) && sameColor(px, n)
      );

      if (!hasSameColorNeighbor) {
        // Also check if it has ANY opaque neighbor (part of outline is OK)
        const hasAnyOpaqueNeighbor = neighbors.some(n => n && isOpaque(n));
        if (!hasAnyOpaqueNeighbor) {
          orphans.push([x, y]);
        }
      }
    }
  }

  const maxOrphans = Math.max(1, Math.floor(w * h * 0.005));
  const score = orphans.length === 0 ? 100 : Math.max(0, 100 - (orphans.length / maxOrphans) * 100);

  return {
    name: 'Orphan Pixels',
    pass: orphans.length <= 2,
    score: Math.round(score),
    details: orphans.length === 0
      ? 'No orphan pixels found.'
      : `Found ${orphans.length} orphan pixel(s) with no opaque neighbors: ${orphans.slice(0, 10).map(([x, y]) => `(${x},${y})`).join(', ')}${orphans.length > 10 ? '...' : ''}`,
    fixSuggestions: orphans.length > 0
      ? ['Remove isolated pixels or connect them to adjacent forms with set_pixels.']
      : [],
  };
}

// Check 2: Structural width
function checkStructuralWidth(pixels: RGBA[][], w: number, h: number): CheckResult {
  const thinSpans: Array<{ orientation: string; x: number; y: number; length: number }> = [];

  // Check vertical 1px-wide spans
  for (let x = 0; x < w; x++) {
    let spanStart = -1;
    let spanLen = 0;
    for (let y = 0; y <= h; y++) {
      const px = y < h ? pixels[y][x] : { r: 0, g: 0, b: 0, a: 0 };
      const leftEmpty = x === 0 || !isOpaque(pixels[Math.min(y, h - 1)][x - 1]);
      const rightEmpty = x === w - 1 || !isOpaque(pixels[Math.min(y, h - 1)][x + 1]);

      if (y < h && isOpaque(px) && leftEmpty && rightEmpty) {
        if (spanStart < 0) spanStart = y;
        spanLen++;
      } else {
        if (spanLen > 3) {
          thinSpans.push({ orientation: 'vertical', x, y: spanStart, length: spanLen });
        }
        spanStart = -1;
        spanLen = 0;
      }
    }
  }

  // Check horizontal 1px-wide spans
  for (let y = 0; y < h; y++) {
    let spanStart = -1;
    let spanLen = 0;
    for (let x = 0; x <= w; x++) {
      const px = x < w ? pixels[y][x] : { r: 0, g: 0, b: 0, a: 0 };
      const topEmpty = y === 0 || !isOpaque(pixels[y - 1][Math.min(x, w - 1)]);
      const bottomEmpty = y === h - 1 || !isOpaque(pixels[y + 1][Math.min(x, w - 1)]);

      if (x < w && isOpaque(px) && topEmpty && bottomEmpty) {
        if (spanStart < 0) spanStart = x;
        spanLen++;
      } else {
        if (spanLen > 3) {
          thinSpans.push({ orientation: 'horizontal', x: spanStart, y, length: spanLen });
        }
        spanStart = -1;
        spanLen = 0;
      }
    }
  }

  const score = thinSpans.length === 0 ? 100 : Math.max(0, 100 - thinSpans.length * 15);

  return {
    name: 'Structural Width',
    pass: thinSpans.length === 0,
    score: Math.round(score),
    details: thinSpans.length === 0
      ? 'No problematic 1px-wide spans found.'
      : `Found ${thinSpans.length} thin span(s): ${thinSpans.slice(0, 5).map(s => `${s.orientation} at (${s.x},${s.y}) len=${s.length}`).join('; ')}`,
    fixSuggestions: thinSpans.length > 0
      ? ['Widen 1px structural elements to at least 2px. Use set_pixels to add adjacent pixels.']
      : [],
  };
}

// Check 3: Density
function checkDensity(pixels: RGBA[][], w: number, h: number, category?: string): CheckResult {
  let filled = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (isOpaque(pixels[y][x])) filled++;
    }
  }

  const density = (filled / (w * h)) * 100;
  const [minTarget, maxTarget] = DENSITY_TARGETS[category ?? 'prop'] ?? [30, 70];

  const inRange = density >= minTarget && density <= maxTarget;
  let score = 100;
  if (density < minTarget) {
    score = Math.max(0, 100 - ((minTarget - density) / minTarget) * 100);
  } else if (density > maxTarget) {
    score = Math.max(0, 100 - ((density - maxTarget) / (100 - maxTarget)) * 100);
  }

  return {
    name: 'Density',
    pass: inRange,
    score: Math.round(score),
    details: `Fill density: ${density.toFixed(1)}% (target: ${minTarget}-${maxTarget}% for ${category ?? 'prop'}).`,
    fixSuggestions: !inRange
      ? [density < minTarget
        ? `Sprite is too sparse (${density.toFixed(1)}%). Add more detail or increase the sprite size.`
        : `Sprite is too dense (${density.toFixed(1)}%). Consider removing background fill or reducing clutter.`]
      : [],
  };
}

// Check 4: Palette compliance
function checkPaletteCompliance(pixels: RGBA[][], w: number, h: number): CheckResult {
  const violations: Array<{ x: number; y: number; color: string }> = [];
  const db16Set = new Set(DB16_HEX.map(h => h.toLowerCase()));

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = pixels[y][x];
      if (!isOpaque(px)) continue;

      const hex = rgbaToHex(px).toLowerCase();
      if (!db16Set.has(hex)) {
        // Check pure black/white
        if (px.r === 0 && px.g === 0 && px.b === 0) {
          violations.push({ x, y, color: '#000000 (pure black — use #140c1c instead)' });
        } else if (px.r === 255 && px.g === 255 && px.b === 255) {
          violations.push({ x, y, color: '#ffffff (pure white — use #deeed6 instead)' });
        } else {
          violations.push({ x, y, color: hex });
        }
      }
    }
  }

  const score = violations.length === 0 ? 100 : Math.max(0, 100 - violations.length * 5);

  return {
    name: 'Palette Compliance (DB16)',
    pass: violations.length === 0,
    score: Math.round(Math.max(0, score)),
    details: violations.length === 0
      ? 'All pixels use DB16 palette colors.'
      : `Found ${violations.length} non-DB16 pixel(s): ${violations.slice(0, 8).map(v => `(${v.x},${v.y})=${v.color}`).join(', ')}${violations.length > 8 ? '...' : ''}`,
    fixSuggestions: violations.length > 0
      ? ['Replace non-DB16 colors with the nearest DB16 equivalent using replace_color or set_pixels.']
      : [],
  };
}

// Check 5: Color count
function checkColorCount(pixels: RGBA[][], w: number, h: number): CheckResult {
  const colors = new Set<string>();
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = pixels[y][x];
      if (isOpaque(px)) {
        colors.add(`${px.r},${px.g},${px.b}`);
      }
    }
  }

  const count = colors.size;
  const maxSize = Math.max(w, h);
  const [minColors, maxColors] = maxSize >= 32 ? [6, 16] : [4, 12];

  const inRange = count >= minColors && count <= maxColors;
  let score = 100;
  if (count < minColors) {
    score = Math.max(0, (count / minColors) * 100);
  } else if (count > maxColors) {
    score = Math.max(0, 100 - ((count - maxColors) / 6) * 50);
  }

  return {
    name: 'Color Count',
    pass: inRange,
    score: Math.round(score),
    details: `${count} unique colors (target: ${minColors}-${maxColors} for ${maxSize}x${maxSize}).`,
    fixSuggestions: !inRange
      ? [count < minColors
        ? 'Too few colors — add shading (shadow + highlight variants) for visual depth.'
        : 'Too many colors — simplify using palette_reduce or replace similar colors.']
      : [],
  };
}

// Check 6: Shading direction
function checkShadingDirection(pixels: RGBA[][], w: number, h: number): CheckResult {
  // Compute brightness-weighted centroid for dark and light pixels
  let darkSumX = 0, darkSumY = 0, darkCount = 0;
  let lightSumX = 0, lightSumY = 0, lightCount = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = pixels[y][x];
      if (!isOpaque(px)) continue;

      const brightness = (px.r + px.g + px.b) / 3;
      if (brightness < 80) {
        darkSumX += x; darkSumY += y; darkCount++;
      } else if (brightness > 180) {
        lightSumX += x; lightSumY += y; lightCount++;
      }
    }
  }

  if (darkCount < 3 || lightCount < 3) {
    return {
      name: 'Shading Direction',
      pass: true,
      score: 50,
      details: 'Insufficient dark/light pixels to determine shading direction. Add more shading for depth.',
      fixSuggestions: ['Add shadow pixels (bottom-right) and highlight pixels (top-left) for volume.'],
    };
  }

  const darkCenterX = darkSumX / darkCount;
  const darkCenterY = darkSumY / darkCount;
  const lightCenterX = lightSumX / lightCount;
  const lightCenterY = lightSumY / lightCount;

  // Expect: shadows bottom-right (higher x,y), highlights top-left (lower x,y)
  const shadowOK = darkCenterX >= w * 0.4 || darkCenterY >= h * 0.4;
  const highlightOK = lightCenterX <= w * 0.6 || lightCenterY <= h * 0.6;

  const pass = shadowOK && highlightOK;
  const score = pass ? 100 : 50;

  return {
    name: 'Shading Direction',
    pass,
    score,
    details: `Shadow centroid: (${darkCenterX.toFixed(1)}, ${darkCenterY.toFixed(1)}). Highlight centroid: (${lightCenterX.toFixed(1)}, ${lightCenterY.toFixed(1)}). Expected: shadows bottom-right, highlights top-left.`,
    fixSuggestions: !pass
      ? ['Adjust shading to follow top-left light: darken bottom-right surfaces, brighten top-left surfaces.']
      : [],
  };
}

// Check 7: Bounding box utilization
function checkBoundingBox(pixels: RGBA[][], w: number, h: number): CheckResult {
  let minX = w, maxX = 0, minY = h, maxY = 0;
  let hasPixels = false;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (isOpaque(pixels[y][x])) {
        hasPixels = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!hasPixels) {
    return {
      name: 'Bounding Box Utilization',
      pass: false,
      score: 0,
      details: 'Canvas is empty — no opaque pixels found.',
      fixSuggestions: ['Start drawing! Use set_pixels or draw_template to add content.'],
    };
  }

  const bboxW = maxX - minX + 1;
  const bboxH = maxY - minY + 1;
  const utilization = Math.max(bboxW / w, bboxH / h) * 100;

  const pass = utilization >= 60;
  const score = Math.min(100, Math.round(utilization * 1.3));

  return {
    name: 'Bounding Box Utilization',
    pass,
    score,
    details: `Sprite bounds: ${bboxW}x${bboxH} (${utilization.toFixed(1)}% of ${w}x${h} canvas). Target: >=60%.`,
    fixSuggestions: !pass
      ? [`Sprite only uses ${utilization.toFixed(1)}% of canvas. Scale up or add detail to fill at least 60%.`]
      : [],
  };
}

export function handleValidateSpriteQuality(args: {
  projectId: string;
  layer?: string;
  targetCategory?: string;
}) {
  const project = getProject(args.projectId);
  if (!project) {
    return {
      content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found.` }],
    };
  }

  const w = project.width;
  const h = project.height;
  const pixels = getMergedPixels(project, args.layer);

  const checks: CheckResult[] = [
    checkOrphanPixels(pixels, w, h),
    checkStructuralWidth(pixels, w, h),
    checkDensity(pixels, w, h, args.targetCategory),
    checkPaletteCompliance(pixels, w, h),
    checkColorCount(pixels, w, h),
    checkShadingDirection(pixels, w, h),
    checkBoundingBox(pixels, w, h),
  ];

  const overallScore = Math.round(
    checks.reduce((sum, c) => sum + c.score, 0) / checks.length
  );

  const allFixes = checks.flatMap(c => c.fixSuggestions);

  const lines = [
    `# Sprite Quality Report`,
    `**Overall Score: ${overallScore}/100** | ${checks.filter(c => c.pass).length}/${checks.length} checks passed`,
    `Canvas: ${w}x${h} | Category: ${args.targetCategory ?? 'general'}`,
    '',
  ];

  for (const check of checks) {
    const icon = check.pass ? 'PASS' : 'FAIL';
    lines.push(`## [${icon}] ${check.name} (${check.score}/100)`);
    lines.push(check.details);
    if (check.fixSuggestions.length > 0) {
      lines.push('Fix: ' + check.fixSuggestions.join(' '));
    }
    lines.push('');
  }

  if (allFixes.length > 0) {
    lines.push('## Summary — Suggested Fixes');
    allFixes.forEach((f, i) => lines.push(`${i + 1}. ${f}`));
  }

  return {
    content: [{ type: 'text' as const, text: lines.join('\n') }],
  };
}
