import type { Layer } from '@/types/layer';
import { PixelBuffer } from './PixelBuffer';
import { ViewTransform } from './ViewTransform';
import { Compositor } from './Compositor';
import { GridRenderer, type TileGridOptions } from './GridRenderer';
import { OnionSkin } from './OnionSkin';

export class CanvasEngine {
  private compositor: Compositor;
  private gridRenderer: GridRenderer;
  private onionSkin: OnionSkin;
  private viewTransform: ViewTransform;
  private spriteWidth: number;
  private spriteHeight: number;

  private displayCtx: CanvasRenderingContext2D | null = null;
  private gridCtx: CanvasRenderingContext2D | null = null;
  private onionCtx: CanvasRenderingContext2D | null = null;

  constructor(width: number, height: number) {
    this.spriteWidth = width;
    this.spriteHeight = height;
    this.compositor = new Compositor(width, height);
    this.gridRenderer = new GridRenderer();
    this.onionSkin = new OnionSkin();
    this.viewTransform = new ViewTransform();
  }

  setDisplayCanvas(canvas: HTMLCanvasElement): void {
    this.displayCtx = canvas.getContext('2d')!;
    this.displayCtx.imageSmoothingEnabled = false;
  }

  setGridCanvas(canvas: HTMLCanvasElement): void {
    this.gridCtx = canvas.getContext('2d')!;
  }

  setOnionCanvas(canvas: HTMLCanvasElement): void {
    this.onionCtx = canvas.getContext('2d')!;
  }

  get transform(): ViewTransform {
    return this.viewTransform;
  }

  setZoom(zoom: number): void {
    this.viewTransform.zoom = zoom;
  }

  setPan(x: number, y: number): void {
    this.viewTransform.panX = x;
    this.viewTransform.panY = y;
  }

  screenToPixel(screenX: number, screenY: number): { x: number; y: number } {
    if (!this.displayCtx) return { x: 0, y: 0 };
    return this.viewTransform.screenToPixel(
      screenX, screenY,
      this.displayCtx.canvas.width, this.displayCtx.canvas.height,
      this.spriteWidth, this.spriteHeight
    );
  }

  render(layers: Layer[], layerBuffers: Map<string, PixelBuffer>, showGrid: boolean, tileGrid?: TileGridOptions): void {
    if (!this.displayCtx) return;

    const { x: offsetX, y: offsetY } = this.viewTransform.getOffset(
      this.displayCtx.canvas.width, this.displayCtx.canvas.height,
      this.spriteWidth, this.spriteHeight
    );

    this.compositor.composite(
      this.displayCtx, layers, layerBuffers,
      this.viewTransform.zoom, offsetX, offsetY
    );

    if ((showGrid || tileGrid) && this.gridCtx) {
      this.gridRenderer.draw(
        this.gridCtx, this.spriteWidth, this.spriteHeight,
        this.viewTransform.zoom, offsetX, offsetY,
        showGrid, tileGrid
      );
    } else if (this.gridCtx) {
      this.gridRenderer.clear(this.gridCtx);
    }
  }

  renderOnionSkin(prev: PixelBuffer | null, next: PixelBuffer | null): void {
    if (!this.onionCtx) return;

    const { x: offsetX, y: offsetY } = this.viewTransform.getOffset(
      this.onionCtx.canvas.width, this.onionCtx.canvas.height,
      this.spriteWidth, this.spriteHeight
    );

    this.onionSkin.draw(
      this.onionCtx, prev, next,
      this.viewTransform.zoom, offsetX, offsetY
    );
  }

  clearOnionSkin(): void {
    if (this.onionCtx) {
      this.onionSkin.clear(this.onionCtx);
    }
  }

  resize(width: number, height: number): void {
    this.spriteWidth = width;
    this.spriteHeight = height;
    this.compositor.resize(width, height);
  }

  getCompositor(): Compositor {
    return this.compositor;
  }
}
