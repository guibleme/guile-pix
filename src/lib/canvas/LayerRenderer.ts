import { PixelBuffer } from './PixelBuffer';

export class LayerRenderer {
  private canvas: HTMLCanvasElement | OffscreenCanvas;
  private ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    // Use regular canvas for maximum compatibility
    if (typeof document !== 'undefined') {
      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx = this.canvas.getContext('2d')!;
    } else {
      this.canvas = new OffscreenCanvas(width, height);
      this.ctx = this.canvas.getContext('2d')!;
    }
    this.ctx.imageSmoothingEnabled = false;
  }

  render(buffer: PixelBuffer): void {
    const imageData = buffer.toImageData();
    this.ctx.putImageData(imageData, 0, 0);
  }

  getCanvas(): HTMLCanvasElement | OffscreenCanvas {
    return this.canvas;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
