import type { RGBA } from '@/types/color';

export function createPixelData(width: number, height: number): Uint8ClampedArray {
  return new Uint8ClampedArray(width * height * 4);
}

export function copyPixelData(src: Uint8ClampedArray): Uint8ClampedArray {
  return new Uint8ClampedArray(src);
}

export function getPixelAt(data: Uint8ClampedArray, x: number, y: number, width: number): RGBA {
  const i = (y * width + x) * 4;
  return { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] };
}

export function setPixelAt(data: Uint8ClampedArray, x: number, y: number, width: number, color: RGBA): void {
  const i = (y * width + x) * 4;
  data[i] = color.r;
  data[i + 1] = color.g;
  data[i + 2] = color.b;
  data[i + 3] = color.a;
}

export function clearPixelData(data: Uint8ClampedArray): void {
  data.fill(0);
}

export function pixelDataToImageData(data: Uint8ClampedArray, width: number, height: number): ImageData {
  return new ImageData(new Uint8ClampedArray(data), width, height);
}
