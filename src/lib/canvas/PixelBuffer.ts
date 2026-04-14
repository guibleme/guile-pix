import type { RGBA } from '@/types/color';

export class PixelBuffer {
  readonly width: number;
  readonly height: number;
  readonly data: Uint8ClampedArray;

  constructor(width: number, height: number, data?: Uint8ClampedArray) {
    this.width = width;
    this.height = height;
    const expectedLength = Math.max(0, width * height * 4);
    if (!data) {
      this.data = new Uint8ClampedArray(expectedLength);
      return;
    }

    if (data.length === expectedLength) {
      this.data = new Uint8ClampedArray(data);
      return;
    }

    // Guard against transient size mismatches while stores are being synchronized.
    this.data = new Uint8ClampedArray(expectedLength);
    this.data.set(data.subarray(0, Math.min(data.length, expectedLength)));
  }

  getPixel(x: number, y: number): RGBA {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return { r: 0, g: 0, b: 0, a: 0 };
    }
    const i = (y * this.width + x) * 4;
    return { r: this.data[i], g: this.data[i + 1], b: this.data[i + 2], a: this.data[i + 3] };
  }

  setPixel(x: number, y: number, color: RGBA): void {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    const i = (y * this.width + x) * 4;
    this.data[i] = color.r;
    this.data[i + 1] = color.g;
    this.data[i + 2] = color.b;
    this.data[i + 3] = color.a;
  }

  clear(): void {
    this.data.fill(0);
  }

  clone(): PixelBuffer {
    return new PixelBuffer(this.width, this.height, this.data);
  }

  toImageData(): ImageData {
    return new ImageData(new Uint8ClampedArray(this.data), this.width, this.height);
  }

  static fromImageData(imageData: ImageData): PixelBuffer {
    return new PixelBuffer(imageData.width, imageData.height, imageData.data);
  }
}
