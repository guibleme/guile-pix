import { compositeFrame, type SpriteDocumentV2 } from '@guile-pix/sprite-core';
import { PNG } from 'pngjs';

export interface ChangedBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FrameChange {
  frameId: string;
  frameNumber: number;
  baselineDurationMs: number | null;
  currentDurationMs: number | null;
  pixelsChanged: boolean;
  durationChanged: boolean;
  changedBounds: ChangedBounds | null;
}

type SheetKind = 'baseline' | 'current' | 'diff';

/** Hard ceiling for one decoded contact-sheet RGBA buffer (64 MiB). */
export const MAX_CONTACT_SHEET_RGBA_BYTES = 64 * 1024 * 1024;

interface ContactSheetLayout {
  ids: string[];
  labels: string[];
  fontScale: number;
  headerHeight: number;
  spriteWidth: number;
  spriteHeight: number;
  cellWidth: number;
  gap: number;
  width: number;
  height: number;
}

const FONT: Record<string, string[]> = {
  '0': ['111', '101', '101', '101', '111'],
  '1': ['010', '110', '010', '010', '111'],
  '2': ['111', '001', '111', '100', '111'],
  '3': ['111', '001', '111', '001', '111'],
  '4': ['101', '101', '111', '001', '001'],
  '5': ['111', '100', '111', '001', '111'],
  '6': ['111', '100', '111', '101', '111'],
  '7': ['111', '001', '010', '010', '010'],
  '8': ['111', '101', '111', '101', '111'],
  '9': ['111', '101', '111', '001', '111'],
  ':': ['000', '010', '000', '010', '000'],
  '-': ['000', '000', '111', '000', '000'],
};

function frameOrder(baseline: SpriteDocumentV2, current: SpriteDocumentV2): string[] {
  const ids = [...current.clip.frameIds];
  const seen = new Set(ids);
  for (const frameId of baseline.clip.frameIds) {
    if (!seen.has(frameId)) {
      ids.push(frameId);
      seen.add(frameId);
    }
  }
  return ids;
}

function contactSheetLayout(
  kind: SheetKind,
  baseline: SpriteDocumentV2,
  current: SpriteDocumentV2,
  scale: number,
): ContactSheetLayout {
  if (!Number.isSafeInteger(scale) || scale < 1) throw new Error('Contact-sheet scale must be a positive safe integer');
  const ids = frameOrder(baseline, current);
  const fontScale = Math.max(1, Math.min(2, scale));
  const headerHeight = 5 * fontScale + 2;
  const labels = ids.map((frameId, index) => {
    const frame = (kind === 'baseline' ? baseline : current).frames.find((candidate) => candidate.id === frameId);
    return `${String(index + 1).padStart(2, '0')}:${frame?.durationMs ?? 0}`;
  });
  const labelWidth = Math.max(...labels.map((label) => label.length)) * 4 * fontScale;
  const spriteWidth = current.project.width * scale;
  const spriteHeight = current.project.height * scale;
  const cellWidth = Math.max(spriteWidth, labelWidth);
  const gap = Math.max(1, scale);
  const width = ids.length * cellWidth + Math.max(0, ids.length - 1) * gap;
  const height = headerHeight + spriteHeight;
  const pixels = width * height;
  const rgbaBytes = pixels * 4;
  if (
    !Number.isSafeInteger(spriteWidth)
    || !Number.isSafeInteger(spriteHeight)
    || !Number.isSafeInteger(width)
    || !Number.isSafeInteger(height)
    || !Number.isSafeInteger(pixels)
    || !Number.isSafeInteger(rgbaBytes)
    || width < 1
    || height < 1
  ) {
    throw new Error('Contact-sheet dimensions exceed safe integer limits');
  }
  if (rgbaBytes > MAX_CONTACT_SHEET_RGBA_BYTES) {
    throw new Error(`Contact sheet requires ${rgbaBytes} RGBA bytes; limit is ${MAX_CONTACT_SHEET_RGBA_BYTES}`);
  }
  return { ids, labels, fontScale, headerHeight, spriteWidth, spriteHeight, cellWidth, gap, width, height };
}

export function assertContactSheetSize(
  kind: SheetKind,
  baseline: SpriteDocumentV2,
  current: SpriteDocumentV2,
  scale: number,
): void {
  contactSheetLayout(kind, baseline, current, scale);
}

function framePixels(document: SpriteDocumentV2, frameId: string): Uint8ClampedArray | null {
  return document.frames.some((frame) => frame.id === frameId)
    ? compositeFrame(document, frameId)
    : null;
}

function changedBounds(
  before: Uint8ClampedArray | null,
  after: Uint8ClampedArray | null,
  width: number,
  height: number,
): ChangedBounds | null {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      let differs = false;
      for (let channel = 0; channel < 4; channel += 1) {
        if ((before?.[offset + channel] ?? 0) !== (after?.[offset + channel] ?? 0)) {
          differs = true;
          break;
        }
      }
      if (!differs) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  return maxX < 0 ? null : { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

export function analyzeFrameChanges(
  baseline: SpriteDocumentV2,
  current: SpriteDocumentV2,
): FrameChange[] {
  const width = current.project.width;
  const height = current.project.height;
  return frameOrder(baseline, current).map((frameId, index) => {
    const baselineFrame = baseline.frames.find((frame) => frame.id === frameId);
    const currentFrame = current.frames.find((frame) => frame.id === frameId);
    const bounds = changedBounds(
      framePixels(baseline, frameId),
      framePixels(current, frameId),
      width,
      height,
    );
    return {
      frameId,
      frameNumber: index + 1,
      baselineDurationMs: baselineFrame?.durationMs ?? null,
      currentDurationMs: currentFrame?.durationMs ?? null,
      pixelsChanged: bounds !== null,
      durationChanged: baselineFrame?.durationMs !== currentFrame?.durationMs,
      changedBounds: bounds,
    };
  });
}

function setPixel(png: PNG, x: number, y: number, rgba: readonly number[]): void {
  if (x < 0 || y < 0 || x >= png.width || y >= png.height) return;
  const offset = (y * png.width + x) * 4;
  png.data[offset] = rgba[0];
  png.data[offset + 1] = rgba[1];
  png.data[offset + 2] = rgba[2];
  png.data[offset + 3] = rgba[3];
}

function fillRect(png: PNG, x: number, y: number, width: number, height: number, rgba: readonly number[]): void {
  for (let py = y; py < y + height; py += 1) {
    for (let px = x; px < x + width; px += 1) setPixel(png, px, py, rgba);
  }
}

function drawText(png: PNG, text: string, x: number, y: number, scale: number): void {
  let cursor = x;
  for (const character of text) {
    const glyph = FONT[character] ?? FONT['-'];
    glyph.forEach((row, rowIndex) => {
      [...row].forEach((bit, columnIndex) => {
        if (bit === '1') fillRect(
          png,
          cursor + columnIndex * scale,
          y + rowIndex * scale,
          scale,
          scale,
          [235, 235, 235, 255],
        );
      });
    });
    cursor += 4 * scale;
  }
}

function drawScaledPixels(
  png: PNG,
  pixels: Uint8ClampedArray | null,
  originX: number,
  originY: number,
  width: number,
  height: number,
  scale: number,
): void {
  if (!pixels) return;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      fillRect(png, originX + x * scale, originY + y * scale, scale, scale, [
        pixels[offset], pixels[offset + 1], pixels[offset + 2], pixels[offset + 3],
      ]);
    }
  }
}

function drawOverlay(
  png: PNG,
  originX: number,
  originY: number,
  document: SpriteDocumentV2,
  scale: number,
  bounds: ChangedBounds | null,
): void {
  const groundY = originY + document.pivotPx.y * scale + scale - 1;
  for (let x = 0; x < document.project.width * scale; x += 2) {
    setPixel(png, originX + x, groundY, [0, 220, 255, 255]);
  }
  const pivotX = originX + document.pivotPx.x * scale + Math.floor(scale / 2);
  const pivotY = originY + document.pivotPx.y * scale + Math.floor(scale / 2);
  setPixel(png, pivotX, pivotY, [255, 0, 255, 255]);
  setPixel(png, pivotX - 1, pivotY, [255, 0, 255, 255]);
  setPixel(png, pivotX + 1, pivotY, [255, 0, 255, 255]);
  setPixel(png, pivotX, pivotY - 1, [255, 0, 255, 255]);
  setPixel(png, pivotX, pivotY + 1, [255, 0, 255, 255]);
  if (!bounds) return;
  const left = originX + bounds.x * scale;
  const top = originY + bounds.y * scale;
  const right = left + bounds.width * scale - 1;
  const bottom = top + bounds.height * scale - 1;
  for (let x = left; x <= right; x += 1) {
    setPixel(png, x, top, [255, 220, 0, 255]);
    setPixel(png, x, bottom, [255, 220, 0, 255]);
  }
  for (let y = top; y <= bottom; y += 1) {
    setPixel(png, left, y, [255, 220, 0, 255]);
    setPixel(png, right, y, [255, 220, 0, 255]);
  }
}

function diffPixels(
  before: Uint8ClampedArray | null,
  after: Uint8ClampedArray | null,
  width: number,
  height: number,
): Uint8ClampedArray {
  const output = new Uint8ClampedArray(width * height * 4);
  for (let offset = 0; offset < output.length; offset += 4) {
    const differs = [0, 1, 2, 3].some((channel) =>
      (before?.[offset + channel] ?? 0) !== (after?.[offset + channel] ?? 0));
    if (!differs) continue;
    const alpha = after?.[offset + 3] ?? 0;
    if (alpha > 0) {
      output.set(after!.subarray(offset, offset + 4), offset);
    } else {
      output.set([255, 64, 64, 255], offset);
    }
  }
  return output;
}

export function renderContactSheet(
  kind: SheetKind,
  baseline: SpriteDocumentV2,
  current: SpriteDocumentV2,
  scale: number,
  changes: FrameChange[],
): Buffer {
  const layout = contactSheetLayout(kind, baseline, current, scale);
  const { ids, labels, fontScale, headerHeight, spriteWidth, cellWidth, gap } = layout;
  const png = new PNG({
    width: layout.width,
    height: layout.height,
  });

  fillRect(png, 0, 0, png.width, png.height, [24, 24, 30, 255]);
  ids.forEach((frameId, index) => {
    const baselineFrame = baseline.frames.find((frame) => frame.id === frameId);
    const currentFrame = current.frames.find((frame) => frame.id === frameId);
    const before = framePixels(baseline, frameId);
    const after = framePixels(current, frameId);
    const pixels = kind === 'baseline'
      ? before
      : kind === 'current'
        ? after
        : diffPixels(before, after, current.project.width, current.project.height);
    const duration = kind === 'baseline'
      ? baselineFrame?.durationMs
      : currentFrame?.durationMs;
    const originX = index * (cellWidth + gap);
    const spriteX = originX + Math.floor((cellWidth - spriteWidth) / 2);
    drawText(png, labels[index] ?? `${String(index + 1).padStart(2, '0')}:${duration ?? 0}`, originX, 0, fontScale);
    drawScaledPixels(
      png,
      pixels,
      spriteX,
      headerHeight,
      current.project.width,
      current.project.height,
      scale,
    );
    drawOverlay(
      png,
      spriteX,
      headerHeight,
      current,
      scale,
      kind === 'diff' ? changes[index]?.changedBounds ?? null : null,
    );
  });
  return PNG.sync.write(png);
}
