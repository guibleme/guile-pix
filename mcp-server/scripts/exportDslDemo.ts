/**
 * Quick standalone export of DSL demo templates to PNG.
 * Does NOT require registering templates in templateTools.ts.
 *
 * Usage: cd mcp-server && npx tsx scripts/exportDslDemo.ts
 * Output: mcp-server/output/dsl-demo/
 */

import * as fs from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';

// Import generated templates directly
import {
  DSL_DEMO_TEMPLATES,
  DSL_DEMO_COLOR_SCHEMES,
} from '../src/templates/_dslDemo.js';
import {
  RPG_TEST_TEMPLATES,
  RPG_TEST_COLOR_SCHEMES,
} from '../src/templates/_rpgTest.js';
import {
  PRO_SHOWCASE_TEMPLATES,
  PRO_SHOWCASE_COLOR_SCHEMES,
} from '../src/templates/_proShowcase.js';
import {
  PRO_PROPS_TEMPLATES,
  PRO_PROPS_COLOR_SCHEMES,
} from '../src/templates/_proProps.js';

// ─── Types ──────────────────────────────────────────────────

interface RGBA { r: number; g: number; b: number; a: number; }
interface SpriteRegion {
  name: string;
  role: string;
  tone?: 'shadow' | 'base' | 'highlight';
  pixels: [number, number][];
}
interface SpriteTemplate {
  name: string;
  width: number;
  height: number;
  description: string;
  regions: SpriteRegion[];
}
interface ColorScheme {
  name: string;
  mapping: Record<string, { shadow: string; base: string; highlight: string }>;
}

// ─── Color Math Helpers ──────────────────────────────────────

function hexToRgba(hex: string): RGBA {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
    a: 255,
  };
}

// ── HSV conversion for professional hue shifting ──
interface HSV { h: number; s: number; v: number; }

function rgbToHsv(c: RGBA): HSV {
  const r = c.r / 255, g = c.g / 255, b = c.b / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d > 0) {
    if (max === r) h = ((g - b) / d + 6) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  const s = max > 0 ? d / max : 0;
  return { h, s, v: max };
}

function hsvToRgba(hsv: HSV): RGBA {
  const { h, s, v } = hsv;
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return {
    r: Math.round(Math.min(245, Math.max(12, (r + m) * 255))),
    g: Math.round(Math.min(245, Math.max(12, (g + m) * 255))),
    b: Math.round(Math.min(245, Math.max(12, (b + m) * 255))),
    a: 255,
  };
}

// ── Professional hue-shifted outline colors ──
// Shadows shift toward blue (H→240), highlights shift toward yellow (H→60)
function hueShiftShadow(c: RGBA, darkness: number): RGBA {
  const hsv = rgbToHsv(c);
  // Shift hue 20° toward blue (240°)
  const hDiff = ((240 - hsv.h + 540) % 360) - 180;  // shortest path to 240
  hsv.h = (hsv.h + hDiff * 0.15 + 360) % 360;
  // Darken value
  hsv.v = Math.max(0.05, hsv.v * darkness);
  // Boost saturation slightly in shadows
  hsv.s = Math.min(1, hsv.s * 1.1);
  return hsvToRgba(hsv);
}

function hueShiftHighlight(c: RGBA, brightness: number): RGBA {
  const hsv = rgbToHsv(c);
  // Shift hue 20° toward yellow (60°)
  const hDiff = ((60 - hsv.h + 540) % 360) - 180;
  hsv.h = (hsv.h + hDiff * 0.15 + 360) % 360;
  // Brighten value
  hsv.v = Math.min(0.96, hsv.v + (1 - hsv.v) * brightness);
  // Desaturate highlights slightly
  hsv.s = Math.max(0, hsv.s * 0.85);
  return hsvToRgba(hsv);
}

function lerpColor(a: RGBA, b: RGBA, t: number): RGBA {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
    a: 255,
  };
}

function colorEquals(a: RGBA, b: RGBA): boolean {
  return a.r === b.r && a.g === b.g && a.b === b.b;
}

// ─── Render template to pixel buffer ────────────────────────

function renderTemplate(
  template: SpriteTemplate,
  scheme: ColorScheme | null,
  options: { autoOutline?: boolean; autoShade?: boolean; autoHighlight?: boolean } = {}
): RGBA[][] {
  const w = template.width;
  const h = template.height;

  // Create RGBA buffer
  const buf: RGBA[][] = Array.from({ length: h }, () =>
    Array.from({ length: w }, () => ({ r: 0, g: 0, b: 0, a: 0 }))
  );

  // Track which pixels are opaque and their roles
  const opaqueSet = new Set<string>();
  const roleMap = new Map<string, string>();

  // Check if this template uses explicit multi-tone shading
  const hasExplicitTones = template.regions.some(r => r.tone === 'shadow' || r.tone === 'highlight');

  // Draw colors (using explicit tone if present, else base)
  for (const region of template.regions) {
    let color: RGBA = { r: 128, g: 128, b: 128, a: 255 }; // fallback gray

    if (scheme?.mapping[region.role]) {
      const triad = scheme.mapping[region.role];
      const tone = region.tone || 'base';
      color = hexToRgba(triad[tone]);
    }

    for (const [x, y] of region.pixels) {
      if (x >= 0 && x < w && y >= 0 && y < h) {
        buf[y][x] = { ...color };
        opaqueSet.add(`${x},${y}`);
        roleMap.set(`${x},${y}`, region.role);
      }
    }
  }

  // ── Edge-distance map via BFS (per-role) ──────────────────
  // For each opaque pixel, compute distance to nearest transparent neighbor.
  // This gives us form-following shading instead of flat diagonal gradients.
  const edgeDist = Array.from({ length: h }, () => new Float32Array(w));
  const maxDistPerRole = new Map<string, number>();

  if ((options.autoShade || options.autoHighlight) && scheme) {
    // BFS from all edge pixels simultaneously
    const queue: [number, number][] = [];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!opaqueSet.has(`${x},${y}`)) continue;
        // Is this pixel on the edge of its region?
        const dirs: [number, number][] = [[-1,0],[1,0],[0,-1],[0,1]];
        let isEdge = false;
        for (const [dx, dy] of dirs) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || nx >= w || ny < 0 || ny >= h || !opaqueSet.has(`${nx},${ny}`)) {
            isEdge = true; break;
          }
        }
        if (isEdge) {
          edgeDist[y][x] = 0;
          queue.push([x, y]);
        } else {
          edgeDist[y][x] = -1; // unvisited
        }
      }
    }

    // BFS flood
    let qi = 0;
    while (qi < queue.length) {
      const [cx, cy] = queue[qi++];
      const cd = edgeDist[cy][cx];
      const dirs: [number, number][] = [[-1,0],[1,0],[0,-1],[0,1]];
      for (const [dx, dy] of dirs) {
        const nx = cx + dx, ny = cy + dy;
        if (nx >= 0 && nx < w && ny >= 0 && ny < h && edgeDist[ny][nx] === -1) {
          edgeDist[ny][nx] = cd + 1;
          queue.push([nx, ny]);
        }
      }
    }

    // Compute max distance per role for normalization
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const role = roleMap.get(`${x},${y}`);
        if (!role) continue;
        const d = edgeDist[y][x];
        if (d > (maxDistPerRole.get(role) ?? 0)) {
          maxDistPerRole.set(role, d);
        }
      }
    }
  }

  // ── Form-following shading (edge distance + light direction) ──
  // Skip if template has explicit tone placement (artist-controlled shading)
  if (options.autoShade && scheme && !hasExplicitTones) {
    // Light comes from top-left
    const lightX = -0.6, lightY = -0.8;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const key = `${x},${y}`;
        if (!opaqueSet.has(key)) continue;
        const role = roleMap.get(key);
        if (!role || !scheme.mapping[role]) continue;

        const shadowColor = hexToRgba(scheme.mapping[role].shadow);
        const baseColor = hexToRgba(scheme.mapping[role].base);

        // Normalize edge distance for this role (0 = edge, 1 = deepest interior)
        const maxD = maxDistPerRole.get(role) ?? 1;
        const edgeNorm = maxD > 0 ? edgeDist[y][x] / maxD : 0;

        // Directional light component (0..1, higher = more in shadow)
        const normX = w > 1 ? x / (w - 1) : 0;
        const normY = h > 1 ? y / (h - 1) : 0;
        const lightDot = Math.max(0, normX * (-lightX) + normY * (-lightY));

        // Combined: edges get shadow, light-away areas get shadow
        // Interior pixels stay at base color
        const shadowStrength = Math.max(0, lightDot * 0.55 + (1 - edgeNorm) * 0.35 - 0.3);

        if (shadowStrength > 0.05) {
          const t = Math.min(1, shadowStrength);
          buf[y][x] = {
            r: Math.round(baseColor.r + (shadowColor.r - baseColor.r) * t),
            g: Math.round(baseColor.g + (shadowColor.g - baseColor.g) * t),
            b: Math.round(baseColor.b + (shadowColor.b - baseColor.b) * t),
            a: 255,
          };
        }
      }
    }
  }

  // ── Form-following highlights (edge distance + light direction) ──
  if (options.autoHighlight && scheme && !hasExplicitTones) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const key = `${x},${y}`;
        if (!opaqueSet.has(key)) continue;
        const role = roleMap.get(key);
        if (!role || !scheme.mapping[role]) continue;

        const highlightColor = hexToRgba(scheme.mapping[role].highlight);

        const maxD = maxDistPerRole.get(role) ?? 1;
        const edgeNorm = maxD > 0 ? edgeDist[y][x] / maxD : 0;

        // Light from top-left: highlight pixels closer to light + slightly interior
        const normX = w > 1 ? x / (w - 1) : 0;
        const normY = h > 1 ? y / (h - 1) : 0;
        const lightFacing = Math.max(0, (1 - normX) * 0.6 + (1 - normY) * 0.4);

        // Highlights appear on light-facing edges and slightly interior
        const hlStrength = Math.max(0, lightFacing * 0.7 + edgeNorm * 0.15 - 0.55);

        if (hlStrength > 0.05) {
          const t = Math.min(1, hlStrength * 0.8);
          const current = buf[y][x];
          buf[y][x] = {
            r: Math.round(current.r + (highlightColor.r - current.r) * t),
            g: Math.round(current.g + (highlightColor.g - current.g) * t),
            b: Math.round(current.b + (highlightColor.b - current.b) * t),
            a: 255,
          };
        }
      }
    }
  }

  // ── PASS: Dithering at tone boundaries ─────────────────────
  // For templates with explicit tones, add 1-row checkerboard dithering
  // between shadow/base and base/highlight zones of the same role.
  if (hasExplicitTones && scheme) {
    const toneMap = new Map<string, string>(); // "x,y" → tone
    for (const region of template.regions) {
      for (const [x, y] of region.pixels) {
        if (x >= 0 && x < w && y >= 0 && y < h) {
          toneMap.set(`${x},${y}`, region.tone || 'base');
        }
      }
    }

    const ditherPixels: { x: number; y: number; color: RGBA }[] = [];
    const dirs4: [number, number][] = [[-1,0],[1,0],[0,-1],[0,1]];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const key = `${x},${y}`;
        if (!opaqueSet.has(key)) continue;
        const myTone = toneMap.get(key) || 'base';
        const myRole = roleMap.get(key);
        if (!myRole || !scheme.mapping[myRole]) continue;

        // Check if adjacent to a different tone of the same role
        for (const [dx, dy] of dirs4) {
          const nx = x + dx, ny = y + dy;
          const nKey = `${nx},${ny}`;
          if (!opaqueSet.has(nKey)) continue;
          const nRole = roleMap.get(nKey);
          const nTone = toneMap.get(nKey) || 'base';
          if (nRole !== myRole || nTone === myTone) continue;

          // Found adjacent different tone of same role → subtle checkerboard blend
          // Only apply on every other pixel with VERY subtle blending (0.15)
          if ((x + y) % 2 === 0) {
            const triad = scheme.mapping[myRole];
            const neighborColor = hexToRgba(triad[nTone as keyof typeof triad]);
            const myColor = buf[y][x];
            ditherPixels.push({ x, y, color: lerpColor(myColor, neighborColor, 0.15) });
          }
          break; // only apply once per pixel
        }
      }
    }
    for (const { x, y, color } of ditherPixels) {
      buf[y][x] = color;
    }
  }

  // ── PASS: Cluster cleanup (remove orphan shade pixels) ────
  // Orphan = opaque pixel with no same-color orthogonal neighbor.
  // Only clean up auto-shaded results (explicit tones are intentional).
  if (!hasExplicitTones) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!opaqueSet.has(`${x},${y}`)) continue;
        const myColor = buf[y][x];
        const dirs4: [number, number][] = [[-1,0],[1,0],[0,-1],[0,1]];
        let hasSameNeighbor = false;
        for (const [dx, dy] of dirs4) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < w && ny >= 0 && ny < h && opaqueSet.has(`${nx},${ny}`)) {
            const nc = buf[ny][nx];
            if (Math.abs(nc.r - myColor.r) < 15 && Math.abs(nc.g - myColor.g) < 15 && Math.abs(nc.b - myColor.b) < 15) {
              hasSameNeighbor = true;
              break;
            }
          }
        }
        if (!hasSameNeighbor) {
          // Replace with average of neighbors
          let sumR = 0, sumG = 0, sumB = 0, count = 0;
          for (const [dx, dy] of dirs4) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < w && ny >= 0 && ny < h && opaqueSet.has(`${nx},${ny}`)) {
              sumR += buf[ny][nx].r; sumG += buf[ny][nx].g; sumB += buf[ny][nx].b;
              count++;
            }
          }
          if (count > 0) {
            buf[y][x] = { r: Math.round(sumR/count), g: Math.round(sumG/count), b: Math.round(sumB/count), a: 255 };
          }
        }
      }
    }
  }

  // ── PASS: Role-boundary ambient occlusion ─────────────────
  // Darken pixels adjacent to different roles → depth at joints
  {
    const aoPixels: { x: number; y: number; color: RGBA }[] = [];
    const aoDirs: [number, number][] = [[-1,0],[1,0],[0,-1],[0,1]];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!opaqueSet.has(`${x},${y}`)) continue;
        const myRole = roleMap.get(`${x},${y}`);
        if (!myRole) continue;

        let diffCount = 0;
        for (const [dx, dy] of aoDirs) {
          const nx = x + dx, ny = y + dy;
          if (opaqueSet.has(`${nx},${ny}`)) {
            const nRole = roleMap.get(`${nx},${ny}`);
            if (nRole && nRole !== myRole) diffCount++;
          }
        }

        if (diffCount > 0) {
          const strength = diffCount * 0.04;
          const c = buf[y][x];
          aoPixels.push({ x, y, color: {
            r: Math.max(12, Math.round(c.r * (1 - strength))),
            g: Math.max(12, Math.round(c.g * (1 - strength))),
            b: Math.max(12, Math.round(c.b * (1 - strength))),
            a: 255,
          }});
        }
      }
    }
    for (const { x, y, color } of aoPixels) { buf[y][x] = color; }
  }

  // ── PASS: Professional sel-out outline ─────────────────────
  // Hue-shifted colored outlines:
  // - Shadow edges (bottom-right): dark + blue-shifted
  // - Light edges (top-left): lighter + warm-shifted, or NO outline
  // - Interior boundaries between roles: suppressed (lighter)
  if (options.autoOutline) {
    const outlinePixels: { x: number; y: number; color: RGBA }[] = [];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!opaqueSet.has(`${x},${y}`)) continue;

        const neighbors: [number, number][] = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
        for (const [nx, ny] of neighbors) {
          if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
          if (opaqueSet.has(`${nx},${ny}`)) continue;

          const role = roleMap.get(`${x},${y}`);
          const srcColor = buf[y][x];

          // Determine if this outline pixel is light-facing or shadow-facing
          // Light from top-left → outline at top/left = light-facing
          const dx = nx - x, dy = ny - y;
          const lightScore = (-dx * 0.6) + (-dy * 0.8); // positive = light-facing

          let outlineColor: RGBA;

          // Sel-out: outline color derived from SOURCE PIXEL, not scheme shadow.
          // This keeps outlines proportional to surface brightness → brighter overall.
          if (lightScore > 0.3) {
            // LIGHT-FACING edge: gently darkened surface color
            outlineColor = hueShiftShadow(srcColor, 0.75);
          } else if (lightScore < -0.3) {
            // SHADOW-FACING edge: more darkened surface color
            outlineColor = hueShiftShadow(srcColor, 0.5);
          } else {
            // NEUTRAL edge: medium darkened
            outlineColor = hueShiftShadow(srcColor, 0.6);
          }

          outlinePixels.push({ x: nx, y: ny, color: outlineColor });
        }
      }
    }

    const placedOutline = new Set<string>();
    for (const { x, y, color } of outlinePixels) {
      if (buf[y][x].a === 0) {
        buf[y][x] = color;
        placedOutline.add(`${x},${y}`);
      }
    }

    // ── Cleanup: remove outline pixels not touching the body ──
    // An outline pixel is valid ONLY if at least one orthogonal neighbor
    // is a BODY pixel (i.e., opaque AND not itself an outline pixel).
    // This prevents floating outline clusters at shape corners.
    for (const key of placedOutline) {
      const [px, py] = key.split(',').map(Number);
      let bodyNeighbors = 0;
      const dirs: [number, number][] = [[-1,0],[1,0],[0,-1],[0,1]];
      for (const [dx, dy] of dirs) {
        const nx = px + dx, ny = py + dy;
        if (nx >= 0 && nx < w && ny >= 0 && ny < h && buf[ny][nx].a > 0) {
          if (!placedOutline.has(`${nx},${ny}`)) bodyNeighbors++;
        }
      }
      if (bodyNeighbors === 0) buf[py][px] = { r: 0, g: 0, b: 0, a: 0 };
    }
    // Second pass: remove any remaining outline pixel with < 2 opaque neighbors
    for (const key of placedOutline) {
      const [px, py] = key.split(',').map(Number);
      if (buf[py][px].a === 0) continue; // already removed
      let n = 0;
      if (px > 0 && buf[py][px - 1].a > 0) n++;
      if (px < w - 1 && buf[py][px + 1].a > 0) n++;
      if (py > 0 && buf[py - 1][px].a > 0) n++;
      if (py < h - 1 && buf[py + 1][px].a > 0) n++;
      if (n < 2) buf[py][px] = { r: 0, g: 0, b: 0, a: 0 };
    }
  }

  return buf;
}

// ─── Render buffer to PNG ───────────────────────────────────

function bufferToPng(buf: RGBA[][], scale: number): Buffer {
  const h = buf.length;
  const w = buf[0].length;
  const outW = w * scale;
  const outH = h * scale;
  const png = new PNG({ width: outW, height: outH });

  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      const srcX = Math.floor(x / scale);
      const srcY = Math.floor(y / scale);
      const pixel = buf[srcY][srcX];
      const idx = (y * outW + x) * 4;
      png.data[idx] = pixel.r;
      png.data[idx + 1] = pixel.g;
      png.data[idx + 2] = pixel.b;
      png.data[idx + 3] = pixel.a;
    }
  }

  return PNG.sync.write(png);
}

// ─── Main ──────────────────────────────────────────────────

const SCALE = 8;
const outDir = path.resolve(import.meta.dirname, '..', 'output', 'dsl-demo');
if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

const templates = {
  ...DSL_DEMO_TEMPLATES as Record<string, SpriteTemplate>,
  ...RPG_TEST_TEMPLATES as Record<string, SpriteTemplate>,
  ...PRO_SHOWCASE_TEMPLATES as Record<string, SpriteTemplate>,
  ...PRO_PROPS_TEMPLATES as Record<string, SpriteTemplate>,
};
const schemes = {
  ...DSL_DEMO_COLOR_SCHEMES as Record<string, ColorScheme>,
  ...RPG_TEST_COLOR_SCHEMES as Record<string, ColorScheme>,
  ...PRO_SHOWCASE_COLOR_SCHEMES as Record<string, ColorScheme>,
  ...PRO_PROPS_COLOR_SCHEMES as Record<string, ColorScheme>,
};

const gallery: { name: string; file: string; size: string; mode: string; desc: string }[] = [];

for (const [name, template] of Object.entries(templates)) {
  const sizeStr = `${template.width}x${template.height}`;
  const mode = name.includes('classic') ? 'GRID' : 'DSL';

  // Find matching color scheme
  const schemeName = name.replace(/_\d+$/, '') + '_default';
  const scheme = schemes[schemeName] ?? null;

  console.log(`Rendering: ${name} (${sizeStr}, ${mode})...`);

  const buf = renderTemplate(template, scheme, {
    autoOutline: true,
    autoShade: true,
    autoHighlight: true,
  });

  const pngData = bufferToPng(buf, SCALE);
  const outFile = path.join(outDir, `${name}.png`);
  fs.writeFileSync(outFile, pngData);

  gallery.push({ name, file: `${name}.png`, size: sizeStr, mode, desc: template.description });
  console.log(`  ✓ ${outFile}`);
}

// Generate comparison HTML
const cards = gallery.map(g => `
  <div class="card ${g.size === '32x32' ? 'large' : ''}">
    <img src="${g.file}" alt="${g.name}">
    <div class="info">
      <span class="name">${g.name}</span>
      <span class="badge ${g.mode.toLowerCase()}">${g.mode}</span>
      <span class="badge size">${g.size}</span>
    </div>
    <span class="desc">${g.desc}</span>
  </div>`).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DSL Demo — Template Quality Comparison</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #1a1a2e; color: #e0e0e0; font-family: system-ui, sans-serif; padding: 2rem; }
    h1 { text-align: center; margin-bottom: 0.5rem; color: #f0c040; }
    .subtitle { text-align: center; margin-bottom: 2rem; color: #888; }
    .grid { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; }
    .card {
      background: #252540;
      border: 1px solid #333;
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      width: 200px;
    }
    .card.large { width: 320px; }
    .card:hover { border-color: #f0c040; }
    .card img {
      image-rendering: pixelated;
      width: 128px; height: 128px;
      object-fit: contain;
      background: repeating-conic-gradient(#333 0% 25%, #2a2a2a 0% 50%) 50% / 16px 16px;
      border-radius: 6px;
    }
    .card.large img { width: 256px; height: 256px; }
    .info { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; justify-content: center; }
    .name { font-size: 0.8rem; font-weight: 700; }
    .badge {
      font-size: 0.65rem; font-weight: 600;
      padding: 2px 6px; border-radius: 4px;
    }
    .badge.dsl { background: #2a5a2a; color: #6daa2c; }
    .badge.grid { background: #5a2a2a; color: #d04648; }
    .badge.size { background: #2a2a5a; color: #597dce; }
    .desc { font-size: 0.7rem; color: #888; text-align: center; }
  </style>
</head>
<body>
  <h1>DSL Demo — Quality Comparison</h1>
  <p class="subtitle">
    Comparing DSL draw commands vs classic ASCII grid — same output quality, ~70% fewer tokens
  </p>
  <div class="grid">${cards}
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, 'index.html'), html);

console.log(`\n✅ Exported ${gallery.length} templates to ${outDir}`);
console.log(`Open: ${path.join(outDir, 'index.html')}`);
