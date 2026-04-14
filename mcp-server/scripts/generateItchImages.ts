/**
 * Generate itch.io cover image (630x500) and screenshots for the MEGA bundle.
 * Dense mosaic style — tiny sprites filling every pixel of the image.
 */
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

const bundlesDir = path.resolve(import.meta.dirname, '..', 'output', 'bundles');
const outDir = path.resolve(import.meta.dirname, '..', 'output', 'itch-images');
fs.mkdirSync(outDir, { recursive: true });

// ─── Helpers ─────────────────────────────────────────────────────

const BG_DARK = { r: 0x14, g: 0x0c, b: 0x1c }; // DB16 darkest

function createPng(w: number, h: number, bg = BG_DARK): PNG {
  const png = new PNG({ width: w, height: h });
  for (let i = 0; i < w * h * 4; i += 4) {
    png.data[i] = bg.r;
    png.data[i + 1] = bg.g;
    png.data[i + 2] = bg.b;
    png.data[i + 3] = 0xff;
  }
  return png;
}

function blitScaled(dst: PNG, src: PNG, ox: number, oy: number, targetSize: number) {
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
      const alpha = a / 255;
      dst.data[di]     = Math.round(src.data[si] * alpha + dst.data[di] * (1 - alpha));
      dst.data[di + 1] = Math.round(src.data[si + 1] * alpha + dst.data[di + 1] * (1 - alpha));
      dst.data[di + 2] = Math.round(src.data[si + 2] * alpha + dst.data[di + 2] * (1 - alpha));
    }
  }
}

function drawCheckerCell(dst: PNG, ox: number, oy: number, size: number) {
  const step = Math.max(4, Math.floor(size / 4));
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = ox + x;
      const dy = oy + y;
      if (dx >= dst.width || dy >= dst.height) continue;
      const checker = ((Math.floor(x / step) + Math.floor(y / step)) % 2 === 0) ? 0x1e : 0x18;
      const di = (dy * dst.width + dx) * 4;
      dst.data[di] = checker;
      dst.data[di + 1] = checker;
      dst.data[di + 2] = checker + 0x10;
      dst.data[di + 3] = 0xff;
    }
  }
}

function drawRect(dst: PNG, x: number, y: number, w: number, h: number, r: number, g: number, b: number, a = 0xff) {
  for (let dy = y; dy < y + h && dy < dst.height; dy++) {
    for (let dx = x; dx < x + w && dx < dst.width; dx++) {
      if (dx < 0 || dy < 0) continue;
      const di = (dy * dst.width + dx) * 4;
      if (a === 0xff) {
        dst.data[di] = r; dst.data[di + 1] = g; dst.data[di + 2] = b; dst.data[di + 3] = 0xff;
      } else {
        const alpha = a / 255;
        dst.data[di]     = Math.round(r * alpha + dst.data[di] * (1 - alpha));
        dst.data[di + 1] = Math.round(g * alpha + dst.data[di + 1] * (1 - alpha));
        dst.data[di + 2] = Math.round(b * alpha + dst.data[di + 2] * (1 - alpha));
      }
    }
  }
}

// Simple 5x7 pixel font
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

function textWidth(text: string, scale: number): number {
  let w = 0;
  for (const ch of text) {
    const glyph = PIXEL_FONT[ch] || PIXEL_FONT[' '];
    w += (glyph[0].length + 1) * scale;
  }
  return w - scale;
}

function drawTextCentered(dst: PNG, text: string, y: number, scale: number, r: number, g: number, b: number) {
  const w = textWidth(text, scale);
  drawText(dst, text, Math.floor((dst.width - w) / 2), y, scale, r, g, b);
}

// ─── Load ALL sprites from ALL bundles (1x for density) ─────────

interface SpriteEntry { name: string; pack: string; png: PNG }

const allSprites: SpriteEntry[] = [];
const packSprites: Record<string, SpriteEntry[]> = {};

const bundleDirs = fs.readdirSync(bundlesDir).filter(d => {
  const full = path.join(bundlesDir, d);
  return fs.statSync(full).isDirectory() && d !== '_MEGA-BUNDLE';
});

// Load 1x sprites (16x16) for maximum density
for (const dir of bundleDirs) {
  const dir1x = path.join(bundlesDir, dir, 'sprites-1x');
  if (!fs.existsSync(dir1x)) continue;

  const files = fs.readdirSync(dir1x).filter(f => f.endsWith('.png'));
  packSprites[dir] = [];

  for (const file of files) {
    try {
      const buffer = fs.readFileSync(path.join(dir1x, file));
      const png = PNG.sync.read(buffer);
      const entry: SpriteEntry = { name: file.replace('.png', ''), pack: dir, png };
      allSprites.push(entry);
      packSprites[dir].push(entry);
    } catch { /* skip */ }
  }
}

console.log(`Loaded ${allSprites.length} sprites from ${bundleDirs.length} packs`);

// Seeded random for reproducible output
let seed = 42;
function rng() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// ─── Dense mosaic: fill image edge-to-edge with sprites ─────────

function fillMosaic(img: PNG, sprites: SpriteEntry[], spriteSize: number, pad: number, startY: number, endY: number) {
  const cols = Math.floor((img.width - pad) / (spriteSize + pad));
  const rows = Math.floor((endY - startY - pad) / (spriteSize + pad));
  const total = cols * rows;
  const picked = shuffle(sprites).slice(0, total);

  // If we need more sprites than available, repeat
  while (picked.length < total && sprites.length > 0) {
    picked.push(...shuffle(sprites).slice(0, total - picked.length));
  }

  for (let i = 0; i < Math.min(picked.length, total); i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const ox = pad + col * (spriteSize + pad);
    const oy = startY + pad + row * (spriteSize + pad);

    drawCheckerCell(img, ox, oy, spriteSize);
    blitScaled(img, picked[i].png, ox, oy, spriteSize);
  }
  return total;
}

// ─── 1. COVER IMAGE (630x500) — DENSE MOSAIC ───────────────────

function generateCover() {
  const W = 630, H = 500;
  const img = createPng(W, H);

  // Fill ENTIRE image with dense sprite mosaic (32px per sprite = 2x scale)
  const spriteSize = 32;
  const pad = 2;
  fillMosaic(img, allSprites, spriteSize, pad, 0, H);

  // Dark overlay band for text (semi-transparent)
  for (let y = 130; y < 340; y++) {
    for (let x = 0; x < W; x++) {
      const di = (y * W + x) * 4;
      const alpha = y < 145 || y > 325 ? 0.5 : 0.75; // fade edges
      img.data[di]     = Math.round(0x14 * alpha + img.data[di] * (1 - alpha));
      img.data[di + 1] = Math.round(0x0c * alpha + img.data[di + 1] * (1 - alpha));
      img.data[di + 2] = Math.round(0x1c * alpha + img.data[di + 2] * (1 - alpha));
    }
  }

  // Big title: "2,655+"
  drawTextCentered(img, '2,655+', 155, 8, 0xda, 0xd4, 0x5e);

  // Subtitle: "PIXEL ART SPRITES"
  drawTextCentered(img, 'PIXEL ART SPRITES', 225, 4, 0xde, 0xee, 0xd6);

  // Info: "25 PACKS | 16x16 | DB16"
  drawTextCentered(img, '25 PACKS | 16x16 | DB16', 265, 3, 0x85, 0x95, 0xa1);

  // Price badge
  drawTextCentered(img, '$6.99', 300, 4, 0x6d, 0xc2, 0xca);

  const out = path.join(outDir, 'cover-630x500.png');
  fs.writeFileSync(out, PNG.sync.write(img));
  console.log(`✓ Cover: ${out}`);
}

// ─── 2. SCREENSHOTS (1280x720) — DENSE + LABELED ───────────────

function generateScreenshot(
  title: string,
  subtitle: string,
  filename: string,
  packs: string[],
) {
  const W = 1280, H = 720;
  const img = createPng(W, H);

  // Collect sprites from specified packs
  const sprites: SpriteEntry[] = [];
  for (const pack of packs) {
    sprites.push(...(packSprites[pack] || []));
  }

  // Fill with dense mosaic (40px sprites = 2.5x, tight padding)
  const spriteSize = 40;
  const pad = 2;
  fillMosaic(img, sprites, spriteSize, pad, 0, H);

  // Top banner overlay
  for (let y = 0; y < 70; y++) {
    for (let x = 0; x < W; x++) {
      const di = (y * W + x) * 4;
      const alpha = y > 55 ? 0.5 : 0.8;
      img.data[di]     = Math.round(0x14 * alpha + img.data[di] * (1 - alpha));
      img.data[di + 1] = Math.round(0x0c * alpha + img.data[di + 1] * (1 - alpha));
      img.data[di + 2] = Math.round(0x1c * alpha + img.data[di + 2] * (1 - alpha));
    }
  }

  // Title
  drawTextCentered(img, title, 10, 4, 0xda, 0xd4, 0x5e);
  drawTextCentered(img, subtitle, 45, 2, 0x85, 0x95, 0xa1);

  // Bottom info strip
  for (let y = H - 30; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const di = (y * W + x) * 4;
      img.data[di]     = Math.round(0x14 * 0.8 + img.data[di] * 0.2);
      img.data[di + 1] = Math.round(0x0c * 0.8 + img.data[di + 1] * 0.2);
      img.data[di + 2] = Math.round(0x1c * 0.8 + img.data[di + 2] * 0.2);
    }
  }
  drawText(img, 'DOGSPRITE.ORG', 10, H - 22, 2, 0x59, 0x7d, 0xce);
  const countText = `${sprites.length} SPRITES`;
  drawText(img, countText, W - textWidth(countText, 2) - 10, H - 22, 2, 0x85, 0x95, 0xa1);

  const out = path.join(outDir, filename);
  fs.writeFileSync(out, PNG.sync.write(img));
  console.log(`✓ Screenshot: ${out} (${sprites.length} sprites from ${packs.length} packs)`);
}

// ─── 3. ALL-SPRITES OVERVIEW (1280x720) — every single sprite ───

function generateOverview() {
  const W = 1280, H = 720;
  const img = createPng(W, H);

  // Use all 2655 sprites — tiny! 24px each
  const spriteSize = 24;
  const pad = 1;
  const cols = Math.floor((W - pad) / (spriteSize + pad)); // ~51
  const rows = Math.floor((H - pad) / (spriteSize + pad)); // ~28
  const total = cols * rows; // ~1428

  const picked = shuffle(allSprites).slice(0, total);

  for (let i = 0; i < picked.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const ox = pad + col * (spriteSize + pad);
    const oy = pad + row * (spriteSize + pad);

    drawCheckerCell(img, ox, oy, spriteSize);
    blitScaled(img, picked[i].png, ox, oy, spriteSize);
  }

  // Overlay text band
  for (let y = Math.floor(H / 2) - 35; y < Math.floor(H / 2) + 35; y++) {
    for (let x = 0; x < W; x++) {
      const di = (y * W + x) * 4;
      const dist = Math.abs(y - H / 2);
      const alpha = dist > 25 ? 0.4 : 0.75;
      img.data[di]     = Math.round(0x14 * alpha + img.data[di] * (1 - alpha));
      img.data[di + 1] = Math.round(0x0c * alpha + img.data[di + 1] * (1 - alpha));
      img.data[di + 2] = Math.round(0x1c * alpha + img.data[di + 2] * (1 - alpha));
    }
  }

  drawTextCentered(img, '2,655+ SPRITES IN ONE PACK', Math.floor(H / 2) - 20, 4, 0xda, 0xd4, 0x5e);
  drawTextCentered(img, '25 THEMED COLLECTIONS | $6.99', Math.floor(H / 2) + 10, 2, 0xde, 0xee, 0xd6);

  const out = path.join(outDir, 'screenshot-0-overview.png');
  fs.writeFileSync(out, PNG.sync.write(img));
  console.log(`✓ Overview: ${out} (${picked.length} sprites shown)`);
}

// ─── Generate all ────────────────────────────────────────────────

generateCover();
generateOverview();

generateScreenshot(
  'RPG WEAPONS  ARMOR  FOOD  DUNGEON',
  'Swords, shields, potions, armor, treasure and more',
  'screenshot-1-rpg.png',
  ['rpg-weapons-gear-pack', 'food-consumables-pack', 'armor-equipment-pack', 'dungeon-adventure-toolkit', 'crafting-workshop-pack', 'weapons-staffs-bows-pack', 'pixel-arsenal-pack'],
);

generateScreenshot(
  'WORLD BUILDING  NATURE  VEHICLES',
  'Buildings, plants, terrain, vehicles, VFX and environments',
  'screenshot-2-world.png',
  ['world-builder-pack', 'vehicle-transport-pack', 'botanical-plants-pack', 'fruits-vegetables-farm-pack', 'vfx-magic-pack'],
);

generateScreenshot(
  'UI  TECH  MUSIC  LIBRARY',
  'Modern and retro tech, UI elements, instruments, books',
  'screenshot-3-modern.png',
  ['ui-toolkit', 'super-ui-ux-pack', 'modern-tech-pack', 'retro-tech-pack', 'music-instruments-pack', 'library-cozy-pack', 'medieval-scholars-pack'],
);

generateScreenshot(
  'TOKYO  BAKERY  YATAI  COZY  LOFI',
  'Japanese street food, pastries, cozy items, manga, study vibes',
  'screenshot-4-lifestyle.png',
  ['tokyo-life-pack', 'bakery-pastry-shop-pack', 'yatai-simulator-pack', 'cozy-life-sim-pack', 'lofi-study-cofi-pack', 'mangaka-simulator-pack'],
);

console.log(`\n✓ All images in: ${outDir}`);
console.log('  cover-630x500.png          → Upload as Cover Image');
console.log('  screenshot-0-overview.png  → Screenshot 1 (all sprites overview)');
console.log('  screenshot-1-rpg.png       → Screenshot 2');
console.log('  screenshot-2-world.png     → Screenshot 3');
console.log('  screenshot-3-modern.png    → Screenshot 4');
console.log('  screenshot-4-lifestyle.png → Screenshot 5');
