import { PixelBuffer, type RGBA } from './pixelBuffer.js';
import { rgbaEqual } from './colorUtils.js';

export function floodFill(
  buffer: PixelBuffer,
  startX: number,
  startY: number,
  fillColor: RGBA
): void {
  if (startX < 0 || startX >= buffer.width || startY < 0 || startY >= buffer.height) return;

  const targetColor = buffer.getPixel(startX, startY);
  if (rgbaEqual(targetColor, fillColor)) return;

  const stack: Array<[number, number]> = [[startX, startY]];
  const visited = new Set<number>();

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!;
    const key = cy * buffer.width + cx;

    if (visited.has(key)) continue;
    if (cx < 0 || cx >= buffer.width || cy < 0 || cy >= buffer.height) continue;

    const current = buffer.getPixel(cx, cy);
    if (!rgbaEqual(current, targetColor)) continue;

    visited.add(key);
    buffer.setPixel(cx, cy, fillColor);

    stack.push([cx + 1, cy]);
    stack.push([cx - 1, cy]);
    stack.push([cx, cy + 1]);
    stack.push([cx, cy - 1]);
  }
}
