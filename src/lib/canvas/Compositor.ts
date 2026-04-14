import type { Layer } from '@/types/layer';
import { LayerRenderer } from './LayerRenderer';
import { PixelBuffer } from './PixelBuffer';

export class Compositor {
  private width: number;
  private height: number;
  private renderers: Map<string, LayerRenderer> = new Map();
  private checkerPatternTheme: string | null = null;
  private checkerPattern: CanvasPattern | null = null;
  private offscreen: OffscreenCanvas | HTMLCanvasElement | null = null;
  private offscreenCtx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null = null;

  private getCheckerPattern(ctx: CanvasRenderingContext2D): CanvasPattern | null {
    const theme = typeof document !== 'undefined'
      ? (document.documentElement.getAttribute('data-theme') ?? 'dark')
      : 'dark';

    if (this.checkerPattern && this.checkerPatternTheme === theme) {
      return this.checkerPattern;
    }

    if (typeof document === 'undefined') {
      return null;
    }

    const style = window.getComputedStyle(document.documentElement);
    const defaultA = theme === 'light' ? '#f0e8f4' : '#1a1430';
    const defaultB = theme === 'light' ? '#ffffff' : '#110e18';
    const colorA = style.getPropertyValue('--ui-checker-a').trim() || defaultA;
    const colorB = style.getPropertyValue('--ui-checker-b').trim() || defaultB;

    const tile = document.createElement('canvas');
    tile.width = 16;
    tile.height = 16;
    const tileCtx = tile.getContext('2d');
    if (!tileCtx) return null;

    tileCtx.fillStyle = colorA;
    tileCtx.fillRect(0, 0, 16, 16);
    tileCtx.fillStyle = colorB;
    tileCtx.fillRect(0, 0, 8, 8);
    tileCtx.fillRect(8, 8, 8, 8);

    this.checkerPattern = ctx.createPattern(tile, 'repeat');
    this.checkerPatternTheme = theme;
    return this.checkerPattern;
  }

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getRenderer(layerId: string): LayerRenderer {
    let renderer = this.renderers.get(layerId);
    if (!renderer) {
      renderer = new LayerRenderer(this.width, this.height);
      this.renderers.set(layerId, renderer);
    }
    return renderer;
  }

  private ensureOffscreen(w: number, h: number): { canvas: OffscreenCanvas | HTMLCanvasElement; ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D } {
    if (this.offscreen && this.offscreenCtx) {
      if (this.offscreen.width !== w || this.offscreen.height !== h) {
        this.offscreen.width = w;
        this.offscreen.height = h;
      }
      return { canvas: this.offscreen, ctx: this.offscreenCtx };
    }
    if (typeof OffscreenCanvas !== 'undefined') {
      this.offscreen = new OffscreenCanvas(w, h);
    } else {
      this.offscreen = document.createElement('canvas');
      this.offscreen.width = w;
      this.offscreen.height = h;
    }
    this.offscreenCtx = this.offscreen.getContext('2d')!;
    return { canvas: this.offscreen, ctx: this.offscreenCtx };
  }

  composite(
    ctx: CanvasRenderingContext2D,
    layers: Layer[],
    layerBuffers: Map<string, PixelBuffer>,
    zoom: number,
    offsetX: number,
    offsetY: number
  ): void {
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;

    // Double-buffer: render everything to an offscreen canvas first,
    // then blit in one operation to avoid visible clearing/flicker.
    const { canvas: offCanvas, ctx: off } = this.ensureOffscreen(cw, ch);
    off.clearRect(0, 0, cw, ch);
    off.imageSmoothingEnabled = false;

    const checkerPattern = this.getCheckerPattern(ctx);
    if (checkerPattern) {
      off.save();
      off.translate(offsetX, offsetY);
      off.fillStyle = checkerPattern;
      off.fillRect(0, 0, this.width * zoom, this.height * zoom);
      off.restore();
    }

    for (const layer of layers) {
      if (!layer.visible || layer.opacity === 0) continue;

      const buffer = layerBuffers.get(layer.id);
      if (!buffer) continue;

      const renderer = this.getRenderer(layer.id);
      renderer.render(buffer);

      off.save();
      off.globalAlpha = layer.opacity;
      off.drawImage(
        renderer.getCanvas() as CanvasImageSource,
        0, 0, this.width, this.height,
        offsetX, offsetY,
        this.width * zoom, this.height * zoom
      );
      off.restore();
    }

    // Fill visible canvas with theme background first, then blit offscreen on top.
    // This avoids a transparent flash between clearRect and drawImage.
    const theme = typeof document !== 'undefined'
      ? (document.documentElement.getAttribute('data-theme') ?? 'dark')
      : 'dark';
    ctx.fillStyle = theme === 'light' ? '#f0e8f4' : '#1a1430';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(offCanvas as CanvasImageSource, 0, 0);
  }

  removeRenderer(layerId: string): void {
    this.renderers.delete(layerId);
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.renderers.clear();
    this.offscreen = null;
    this.offscreenCtx = null;
  }
}
