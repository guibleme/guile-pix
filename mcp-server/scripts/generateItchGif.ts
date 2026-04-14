/**
 * Generate animated GIF for itch.io listing.
 * Shows sprites filling a grid progressively, then cycles through category labels.
 * Uses gifenc for encoding.
 */
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import gifenc from 'gifenc';
const { GIFEncoder, quantize, applyPalette } = gifenc;

const bundlesDir = path.resolve(import.meta.dirname, '..', 'output', 'bundles');
const outDir = path.resolve(import.meta.dirname, '..', 'output', 'itch-images');
fs.mkdirSync(outDir, { recursive: true });

// ─── Load all 1x sprites ────────────────────────────────────────

interface SpriteEntry { name: string; pack: string; png: PNG }

const packSprites: Record<string, SpriteEntry[]> = {};
const allSprites: SpriteEntry[] = [];

const bundleDirs = fs.readdirSync(bundlesDir).filter(d => {
  const full = path.join(bundlesDir, d);
  return fs.statSync(full).isDirectory() && d !== '_MEGA-BUNDLE';
});

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

// Seeded random
let seed = 77;
function rng() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// ─── Pixel font (same as cover script) ──────────────────────────

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

// ─── Frame buffer (RGBA Uint8Array) ─────────────────────────────

const W = 640, H = 360; // Compact GIF size for web
const frameSize = W * H * 4;

function createFrame(bg = { r: 0x14, g: 0x0c, b: 0x1c }): Uint8Array {
  const data = new Uint8Array(frameSize);
  for (let i = 0; i < frameSize; i += 4) {
    data[i] = bg.r; data[i + 1] = bg.g; data[i + 2] = bg.b; data[i + 3] = 0xff;
  }
  return data;
}

function blitSpriteToFrame(frame: Uint8Array, src: PNG, ox: number, oy: number, targetSize: number) {
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
      if (dx < 0 || dx >= W || dy < 0 || dy >= H) continue;
      const di = (dy * W + dx) * 4;
      const alpha = a / 255;
      frame[di]     = Math.round(src.data[si] * alpha + frame[di] * (1 - alpha));
      frame[di + 1] = Math.round(src.data[si + 1] * alpha + frame[di + 1] * (1 - alpha));
      frame[di + 2] = Math.round(src.data[si + 2] * alpha + frame[di + 2] * (1 - alpha));
    }
  }
}

function drawCheckerToFrame(frame: Uint8Array, ox: number, oy: number, size: number) {
  const step = Math.max(3, Math.floor(size / 4));
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = ox + x;
      const dy = oy + y;
      if (dx >= W || dy >= H) continue;
      const checker = ((Math.floor(x / step) + Math.floor(y / step)) % 2 === 0) ? 0x1e : 0x18;
      const di = (dy * W + dx) * 4;
      frame[di] = checker; frame[di + 1] = checker; frame[di + 2] = checker + 0x10; frame[di + 3] = 0xff;
    }
  }
}

function drawRectToFrame(frame: Uint8Array, x: number, y: number, w: number, h: number, r: number, g: number, b: number, a = 255) {
  for (let dy = y; dy < y + h && dy < H; dy++) {
    for (let dx = x; dx < x + w && dx < W; dx++) {
      if (dx < 0 || dy < 0) continue;
      const di = (dy * W + dx) * 4;
      if (a === 255) {
        frame[di] = r; frame[di + 1] = g; frame[di + 2] = b; frame[di + 3] = 0xff;
      } else {
        const alpha = a / 255;
        frame[di]     = Math.round(r * alpha + frame[di] * (1 - alpha));
        frame[di + 1] = Math.round(g * alpha + frame[di + 1] * (1 - alpha));
        frame[di + 2] = Math.round(b * alpha + frame[di + 2] * (1 - alpha));
      }
    }
  }
}

function drawTextToFrame(frame: Uint8Array, text: string, startX: number, startY: number, scale: number, r: number, g: number, b: number) {
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
              if (dx >= 0 && dx < W && dy >= 0 && dy < H) {
                const di = (dy * W + dx) * 4;
                frame[di] = r; frame[di + 1] = g; frame[di + 2] = b; frame[di + 3] = 0xff;
              }
            }
          }
        }
      }
    }
    cx += (glyph[0].length + 1) * scale;
  }
}

function drawTextCenteredToFrame(frame: Uint8Array, text: string, y: number, scale: number, r: number, g: number, b: number) {
  const w = textWidth(text, scale);
  drawTextToFrame(frame, text, Math.floor((W - w) / 2), y, scale, r, g, b);
}

// ─── Category showcase data ─────────────────────────────────────

const categories = [
  { label: 'RPG WEAPONS', packs: ['rpg-weapons-gear-pack', 'weapons-staffs-bows-pack', 'pixel-arsenal-pack'] },
  { label: 'FOOD AND BAKERY', packs: ['food-consumables-pack', 'bakery-pastry-shop-pack', 'fruits-vegetables-farm-pack'] },
  { label: 'WORLD BUILDING', packs: ['world-builder-pack', 'botanical-plants-pack', 'vehicle-transport-pack'] },
  { label: 'UI AND TECH', packs: ['ui-toolkit', 'super-ui-ux-pack', 'modern-tech-pack', 'retro-tech-pack'] },
  { label: 'TOKYO AND COZY', packs: ['tokyo-life-pack', 'yatai-simulator-pack', 'cozy-life-sim-pack', 'lofi-study-cofi-pack'] },
  { label: 'DUNGEON AND ARMOR', packs: ['dungeon-adventure-toolkit', 'armor-equipment-pack', 'crafting-workshop-pack'] },
  { label: 'MUSIC AND LIBRARY', packs: ['music-instruments-pack', 'library-cozy-pack', 'mangaka-simulator-pack', 'medieval-scholars-pack'] },
  { label: 'VFX AND MAGIC', packs: ['vfx-magic-pack'] },
];

// ─── Generate GIF ───────────────────────────────────────────────

const spriteSize = 28;
const pad = 2;
const cols = Math.floor((W - pad) / (spriteSize + pad));
const rows = Math.floor((H - pad) / (spriteSize + pad));
const totalCells = cols * rows;

const gif = GIFEncoder();

// Phase 1: Progressive fill — sprites appear in batches (8 frames)
console.log('Generating fill animation...');
const fillSprites = shuffle(allSprites).slice(0, totalCells);
const batchSize = Math.ceil(totalCells / 8);

for (let step = 0; step < 8; step++) {
  const frame = createFrame();
  const showCount = Math.min((step + 1) * batchSize, fillSprites.length);

  for (let i = 0; i < showCount; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const ox = pad + col * (spriteSize + pad);
    const oy = pad + row * (spriteSize + pad);
    drawCheckerToFrame(frame, ox, oy, spriteSize);
    blitSpriteToFrame(frame, fillSprites[i].png, ox, oy, spriteSize);
  }

  // Counter text
  drawRectToFrame(frame, 0, H - 28, W, 28, 0x14, 0x0c, 0x1c, 200);
  const countText = `${showCount} / 2,655 SPRITES`;
  drawTextCenteredToFrame(frame, countText, H - 22, 2, 0xda, 0xd4, 0x5e);

  const palette = quantize(frame, 128);
  const indexed = applyPalette(frame, palette);
  gif.writeFrame(indexed, W, H, { palette, delay: step < 7 ? 150 : 500 });
  console.log(`  Fill frame ${step + 1}/8: ${showCount} sprites`);
}

// Phase 2: Category showcase — each category fills the grid (8 frames)
console.log('Generating category showcase...');
for (const cat of categories) {
  const frame = createFrame();
  const catSprites: SpriteEntry[] = [];
  for (const pack of cat.packs) {
    catSprites.push(...(packSprites[pack] || []));
  }
  const picked = shuffle(catSprites).slice(0, totalCells);

  for (let i = 0; i < picked.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const ox = pad + col * (spriteSize + pad);
    const oy = pad + row * (spriteSize + pad);
    drawCheckerToFrame(frame, ox, oy, spriteSize);
    blitSpriteToFrame(frame, picked[i].png, ox, oy, spriteSize);
  }

  // Category label banner
  drawRectToFrame(frame, 0, Math.floor(H / 2) - 22, W, 44, 0x14, 0x0c, 0x1c, 190);
  drawTextCenteredToFrame(frame, cat.label, Math.floor(H / 2) - 14, 3, 0xda, 0xd4, 0x5e);
  drawRectToFrame(frame, 0, H - 24, W, 24, 0x14, 0x0c, 0x1c, 200);
  const subText = `${picked.length} SPRITES`;
  drawTextCenteredToFrame(frame, subText, H - 18, 2, 0x85, 0x95, 0xa1);

  const palette = quantize(frame, 128);
  const indexed = applyPalette(frame, palette);
  gif.writeFrame(indexed, W, H, { palette, delay: 800 });
  console.log(`  Category: ${cat.label} (${picked.length} sprites)`);
}

// Phase 3: Final frame — title card (holds longer)
{
  const frame = createFrame();
  const finalSprites = shuffle(allSprites).slice(0, totalCells);
  for (let i = 0; i < finalSprites.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const ox = pad + col * (spriteSize + pad);
    const oy = pad + row * (spriteSize + pad);
    drawCheckerToFrame(frame, ox, oy, spriteSize);
    blitSpriteToFrame(frame, finalSprites[i].png, ox, oy, spriteSize);
  }

  // Dark overlay
  for (let y = Math.floor(H / 2) - 50; y < Math.floor(H / 2) + 50; y++) {
    for (let x = 0; x < W; x++) {
      const di = (y * W + x) * 4;
      const dist = Math.abs(y - H / 2);
      const alpha = dist > 40 ? 0.4 : 0.75;
      frame[di]     = Math.round(0x14 * alpha + frame[di] * (1 - alpha));
      frame[di + 1] = Math.round(0x0c * alpha + frame[di + 1] * (1 - alpha));
      frame[di + 2] = Math.round(0x1c * alpha + frame[di + 2] * (1 - alpha));
    }
  }

  drawTextCenteredToFrame(frame, '2,655+ SPRITES', Math.floor(H / 2) - 30, 4, 0xda, 0xd4, 0x5e);
  drawTextCenteredToFrame(frame, '25 PACKS  $6.99', Math.floor(H / 2) + 10, 3, 0xde, 0xee, 0xd6);

  const palette = quantize(frame, 128);
  const indexed = applyPalette(frame, palette);
  gif.writeFrame(indexed, W, H, { palette, delay: 2000 });
  console.log('  Final title card');
}

gif.finish();

const outPath = path.join(outDir, 'showcase.gif');
fs.writeFileSync(outPath, Buffer.from(gif.bytes()));
const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(1);
console.log(`\n✓ GIF saved: ${outPath} (${sizeMB} MB)`);
console.log('  8 fill frames + 8 category frames + 1 title card = 17 frames');
