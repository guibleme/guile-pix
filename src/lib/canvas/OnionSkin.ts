import { PixelBuffer } from './PixelBuffer';
import { ONION_SKIN_OPACITY } from '@/constants/canvas';

export class OnionSkin {
  draw(
    ctx: CanvasRenderingContext2D,
    prevBuffer: PixelBuffer | null,
    nextBuffer: PixelBuffer | null,
    zoom: number,
    offsetX: number,
    offsetY: number
  ): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.imageSmoothingEnabled = false;

    if (prevBuffer) {
      this.drawGhost(ctx, prevBuffer, zoom, offsetX, offsetY, ONION_SKIN_OPACITY, [1, 0, 0]);
    }
    if (nextBuffer) {
      this.drawGhost(ctx, nextBuffer, zoom, offsetX, offsetY, ONION_SKIN_OPACITY, [0, 0, 1]);
    }
  }

  private drawGhost(
    ctx: CanvasRenderingContext2D,
    buffer: PixelBuffer,
    zoom: number,
    offsetX: number,
    offsetY: number,
    opacity: number,
    tint: [number, number, number]
  ): void {
    const tinted = buffer.clone();
    for (let i = 0; i < tinted.data.length; i += 4) {
      if (tinted.data[i + 3] > 0) {
        tinted.data[i] = Math.round(tinted.data[i] * (1 - 0.5) + tint[0] * 255 * 0.5);
        tinted.data[i + 1] = Math.round(tinted.data[i + 1] * (1 - 0.5) + tint[1] * 255 * 0.5);
        tinted.data[i + 2] = Math.round(tinted.data[i + 2] * (1 - 0.5) + tint[2] * 255 * 0.5);
      }
    }

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = buffer.width;
    tempCanvas.height = buffer.height;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.putImageData(tinted.toImageData(), 0, 0);

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.drawImage(
      tempCanvas,
      0, 0, buffer.width, buffer.height,
      offsetX, offsetY,
      buffer.width * zoom, buffer.height * zoom
    );
    ctx.restore();
  }

  clear(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
