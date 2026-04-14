/**
 * Generate itch.io Banner (960x480) and Background tile for the page theme.
 */
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

const bundlesDir = path.resolve(import.meta.dirname, '..', 'output', 'bundles');
const outDir = path.resolve(import.meta.dirname, '..', 'output', 'itch-images');
fs.mkdirSync(outDir, { recursive: true });

// ─── Helpers ─────────────────────────────────────────────────────

function createPng(w: number, h: number, r: number, g: number, b: number): PNG {
  const png = new PNG({ width: w, height: h });
  for (let i = 0; i < w * h * 4; i += 4) {
    png.data[i] = r; png.data[i + 1] = g; png.data[i + 2] = b; png.data[i + 3] = 0xff;
  }
  return png;
}

function blitScaled(dst: PNG, src: PNG, ox: number, oy: number, targetSize: number, opacity = 1.0) {
  const ratio = targetSize / src.width;
  for (let y = 0; y < targetSize; y++) {
    for (let x = 0; x < targetSize; x++) {
      const sx = Math.floor(x / ratio);
      const sy = Math.floor(y / ratio);
      if (sx >= src.width || sy >= src.height) continue;
      const si = (sy * src.width + sx) * 4;
      const a = src.data[si + 3];
      if (a === 0) continue;
      const dx = ox + x;
      const dy = oy + y;
      if (dx < 0 || dx >= dst.width || dy < 0 || dy >= dst.height) continue;
      const di = (dy * dst.width + dx) * 4;
      const alpha = (a / 255) * opacity;
      dst.data[di]     = Math.round(src.data[si] * alpha + dst.data[di] * (1 - alpha));
      dst.data[di + 1] = Math.round(src.data[si + 1] * alpha + dst.data[di + 1] * (1 - alpha));
      dst.data[di + 2] = Math.round(src.data[si + 2] * alpha + dst.data[di + 2] * (1 - alpha));
    }
  }
}

function drawCheckerCell(dst: PNG, ox: number, oy: number, size: number) {
  const step = Math.max(3, Math.floor(size / 4));
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = ox + x;
      const dy = oy + y;
      if (dx >= dst.width || dy >= dst.height) continue;
      const checker = ((Math.floor(x / step) + Math.floor(y / step)) % 2 === 0) ? 0x1e : 0x18;
      const di = (dy * dst.width + dx) * 4;
      dst.data[di] = checker; dst.data[di + 1] = checker; dst.data[di + 2] = checker + 0x10; dst.data[di + 3] = 0xff;
    }
  }
}

// Pixel font
const PIXEL_FONT: Record<string, string[]> = {
  '0': ['01110','10001','10011','10101','11001','10001','01110'],
  '1': ['00100','01100','00100','00100','00100','00100','01110'],
  '2': ['01110','10001','00001','00110','01000','10000','11111'],
  '3': ['01110','10001','00001','00110','00001','10001','01110'],
  '4': ['00010','00110','01010','10010','11111','00010','00010'],
  '5': ['11111','10000','11110','00001','00001','10001','01110'],
  '6': ['01110','10001','10000','11110','10001','10001','01110'],
  '7': ['11111','00001','00010','00100','01000','01000','01000'],
  '8': ['01110','10001','10001','01110','10001','10001','01110'],
  '9': ['01110','10001','10001','01111','00001','10001','01110'],
  ',': ['00000','00000','00000','00000','00000','01100','01000'],
  '+': ['00000','00100','00100','11111','00100','00100','00000'],
  ' ': ['00000','00000','00000','00000','00000','00000','00000'],
  'A': ['01110','10001','10001','11111','10001','10001','10001'],
  'B': ['11110','10001','10001','11110','10001','10001','11110'],
  'C': ['01110','10001','10000','10000','10000','10001','01110'],
  'D': ['11110','10001','10001','10001','10001','10001','11110'],
  'E': ['11111','10000','10000','11110','10000','10000','11111'],
  'F': ['11111','10000','10000','11110','10000','10000','10000'],
  'G': ['01110','10001','10000','10111','10001','10001','01110'],
  'H': ['10001','10001','10001','11111','10001','10001','10001'],
  'I': ['01110','00100','00100','00100','00100','00100','01110'],
  'K': ['10001','10010','10100','11000','10100','10010','10001'],
  'L': ['10000','10000','10000','10000','10000','10000','11111'],
  'M': ['10001','11011','10101','10101','10001','10001','10001'],
  'N': ['10001','11001','10101','10011','10001','10001','10001'],
  'O': ['01110','10001','10001','10001','10001','10001','01110'],
  'P': ['11110','10001','10001','11110','10000','10000','10000'],
  'R': ['11110','10001','10001','11110','10100','10010','10001'],
  'S': ['01110','10001','10000','01110','00001','10001','01110'],
  'T': ['11111','00100','00100','00100','00100','00100','00100'],
  'U': ['10001','10001','10001','10001','10001','10001','01110'],
  'V': ['10001','10001','10001','10001','01010','01010','00100'],
  'W': ['10001','10001','10001','10101','10101','11011','10001'],
  'X': ['10001','10001','01010','00100','01010','10001','10001'],
  'Y': ['10001','10001','01010','00100','00100','00100','00100'],
  'Z': ['11111','00001','00010','00100','01000','10000','11111'],
  '.': ['00000','00000','00000','00000','00000','01100','01100'],
  '-': ['00000','00000','00000','11111','00000','00000','00000'],
  '|': ['00100','00100','00100','00100','00100','00100','00100'],
  '/': ['00001','00010','00010','00100','01000','01000','10000'],
  ':': ['00000','01100','01100','00000','01100','01100','00000'],
  '$': ['00100','01111','10100','01110','00101','11110','00100'],
  'x': ['00000','00000','10001','01010','00100','01010','10001'],
  '!': ['00100','00100','00100','00100','00100','00000','00100'],
};

function textWidth(text: string, scale: number): number {
  let w = 0;
  for (const ch of text) {
    const glyph = PIXEL_FONT[ch] || PIXEL_FONT[' '];
    w += (glyph[0].length + 1) * scale;
  }
  return w - scale;
}

function drawText(dst: PNG, text: string, startX: number, startY: number, scale: number, r: number, g: number, b: number) {
  let cx = startX;
  for (const ch of text) {
    const glyph = PIXEL_FONT[ch] || PIXEL_FONT[' '];
    for (let gy = 0; gy < glyph.length; gy++) {
      for (let gx = 0; gx < glyph[gy].length; gx++) {
        if (glyph[gy][gx] === '1') {
          for (let sy = 0; sy < scale; sy++) {
            for (let sx = 0; sx < scale; sx++) {
              const dx = cx + gx * scale + sx;
              const dy = startY + gy * scale + sy;
              if (dx >= 0 && dx < dst.width && dy >= 0 && dy < dst.height) {
                const di = (dy * dst.width + dx) * 4;
                dst.data[di] = r; dst.data[di + 1] = g; dst.data[di + 2] = b; dst.data[di + 3] = 0xff;
              }
            }
          }
        }
      }
    }
    cx += (glyph[0].length + 1) * scale;
  }
}

function drawTextCentered(dst: PNG, text: string, y: number, scale: number, r: number, g: number, b: number) {
  const w = textWidth(text, scale);
  drawText(dst, text, Math.floor((dst.width - w) / 2), y, scale, r, g, b);
}

// ─── Load sprites ───────────────────────────────────────────────

interface SpriteEntry { png: PNG }

const allSprites: SpriteEntry[] = [];

const bundleFolders = fs.readdirSync(bundlesDir).filter(d => {
  const full = path.join(bundlesDir, d);
  return fs.statSync(full).isDirectory() && d !== '_MEGA-BUNDLE';
});

for (const dir of bundleFolders) {
  const dir1x = path.join(bundlesDir, dir, 'sprites-1x');
  if (!fs.existsSync(dir1x)) continue;
  const files = fs.readdirSync(dir1x).filter(f => f.endsWith('.png'));
  for (const file of files) {
    try {
      const buffer = fs.readFileSync(path.join(dir1x, file));
      allSprites.push({ png: PNG.sync.read(buffer) });
    } catch { /* skip */ }
  }
}

console.log(`Loaded ${allSprites.length} sprites`);

// Seeded shuffle
let seed = 99;
function rng() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// ─── 1. BANNER (960x480) ────────────────────────────────────────

function generateBanner() {
  const W = 960, H = 480;
  const img = createPng(W, H, 0x14, 0x0c, 0x1c);

  // Dense sprite mosaic background
  const spriteSize = 32;
  const pad = 2;
  const cols = Math.floor((W - pad) / (spriteSize + pad));
  const rows = Math.floor((H - pad) / (spriteSize + pad));
  const total = cols * rows;
  const picked = shuffle(allSprites).slice(0, total);

  for (let i = 0; i < picked.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const ox = pad + col * (spriteSize + pad);
    const oy = pad + row * (spriteSize + pad);
    drawCheckerCell(img, ox, oy, spriteSize);
    blitScaled(img, picked[i].png, ox, oy, spriteSize);
  }

  // Gradient overlay from edges (vignette effect)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const di = (y * W + x) * 4;
      // Top/bottom vignette
      let vignette = 0;
      if (y < 60) vignette = Math.max(vignette, (60 - y) / 60 * 0.6);
      if (y > H - 60) vignette = Math.max(vignette, (y - (H - 60)) / 60 * 0.6);
      // Left/right vignette
      if (x < 80) vignette = Math.max(vignette, (80 - x) / 80 * 0.4);
      if (x > W - 80) vignette = Math.max(vignette, (x - (W - 80)) / 80 * 0.4);

      if (vignette > 0) {
        img.data[di]     = Math.round(img.data[di] * (1 - vignette) + 0x14 * vignette);
        img.data[di + 1] = Math.round(img.data[di + 1] * (1 - vignette) + 0x0c * vignette);
        img.data[di + 2] = Math.round(img.data[di + 2] * (1 - vignette) + 0x1c * vignette);
      }
    }
  }

  // Center text overlay band
  const bandTop = Math.floor(H / 2) - 80;
  const bandBot = Math.floor(H / 2) + 80;
  for (let y = bandTop; y < bandBot; y++) {
    for (let x = 0; x < W; x++) {
      const di = (y * W + x) * 4;
      const dist = Math.min(Math.abs(y - bandTop), Math.abs(y - bandBot));
      const alpha = dist < 15 ? (dist / 15) * 0.8 : 0.8;
      img.data[di]     = Math.round(0x14 * alpha + img.data[di] * (1 - alpha));
      img.data[di + 1] = Math.round(0x0c * alpha + img.data[di + 1] * (1 - alpha));
      img.data[di + 2] = Math.round(0x1c * alpha + img.data[di + 2] * (1 - alpha));
    }
  }

  // Title text
  drawTextCentered(img, '2,655+', Math.floor(H / 2) - 60, 10, 0xda, 0xd4, 0x5e);
  drawTextCentered(img, 'PIXEL ART SPRITES', Math.floor(H / 2) + 15, 5, 0xde, 0xee, 0xd6);
  drawTextCentered(img, '25 THEMED PACKS  16x16  DB16', Math.floor(H / 2) + 55, 2, 0x85, 0x95, 0xa1);

  const out = path.join(outDir, 'banner-960x480.png');
  fs.writeFileSync(out, PNG.sync.write(img));
  console.log(`✓ Banner: ${out}`);
}

// ─── 2. BACKGROUND (tileable pattern, 400x400) ─────────────────

function generateBackground() {
  const W = 400, H = 400;
  const img = createPng(W, H, 0x12, 0x0a, 0x18);

  // Sparse faded sprites as subtle background pattern
  const spriteSize = 24;
  const pad = 8;
  const cols = Math.floor((W - pad) / (spriteSize + pad));
  const rows = Math.floor((H - pad) / (spriteSize + pad));
  const total = cols * rows;
  const picked = shuffle(allSprites).slice(0, total);

  for (let i = 0; i < picked.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    // Offset odd rows for brick pattern
    const offsetX = (row % 2 === 1) ? Math.floor((spriteSize + pad) / 2) : 0;
    const ox = pad + col * (spriteSize + pad) + offsetX;
    const oy = pad + row * (spriteSize + pad);

    // Very faded sprites (15% opacity)
    blitScaled(img, picked[i].png, ox, oy, spriteSize, 0.12);
  }

  const out = path.join(outDir, 'background-400x400.png');
  fs.writeFileSync(out, PNG.sync.write(img));
  console.log(`✓ Background: ${out}`);
}

// ─── Generate ───────────────────────────────────────────────────

generateBanner();
generateBackground();

console.log(`\n✓ Theme images saved to ${outDir}`);
console.log('  banner-960x480.png    → Upload as Banner');
console.log('  background-400x400.png → Upload as Background');
console.log('\n  Recommended theme colors:');
console.log('  BG:   #140c1c');
console.log('  BG 2: #1a1a2e');
console.log('  Text: #deeed6');
console.log('  Link: #dad45e');
