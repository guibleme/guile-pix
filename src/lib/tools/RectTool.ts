import type { ToolType, ToolContext, Point } from '@/types/tool';
import { BaseTool } from './BaseTool';

export class RectTool extends BaseTool {
  type: ToolType = 'rect';
  cursor = 'crosshair';
  private startPoint: Point | null = null;
  private previewBuffer: Uint8ClampedArray | null = null;

  onPointerDown(x: number, y: number, ctx: ToolContext): void {
    this.startPoint = { x, y };
    this.previewBuffer = new Uint8ClampedArray(ctx.getPixelBuffer());
    this.isDrawing = true;
  }

  onPointerMove(x: number, y: number, ctx: ToolContext): void {
    if (!this.isDrawing || !this.startPoint || !this.previewBuffer) return;
    const buf = ctx.getPixelBuffer();
    buf.set(this.previewBuffer);
    this.drawRect(this.startPoint.x, this.startPoint.y, x, y, ctx);
  }

  onPointerUp(x: number, y: number, ctx: ToolContext): void {
    if (!this.startPoint || !this.previewBuffer) {
      this.isDrawing = false;
      return;
    }
    const buf = ctx.getPixelBuffer();
    buf.set(this.previewBuffer);
    this.drawRect(this.startPoint.x, this.startPoint.y, x, y, ctx);
    this.startPoint = null;
    this.previewBuffer = null;
    this.isDrawing = false;
  }

  private drawRect(x0: number, y0: number, x1: number, y1: number, ctx: ToolContext): void {
    const minX = Math.min(x0, x1);
    const maxX = Math.max(x0, x1);
    const minY = Math.min(y0, y1);
    const maxY = Math.max(y0, y1);

    // Top and bottom edges
    for (let x = minX; x <= maxX; x++) {
      this.drawBrush(x, minY, ctx, ctx.color);
      this.drawBrush(x, maxY, ctx, ctx.color);
    }
    // Left and right edges
    for (let y = minY; y <= maxY; y++) {
      this.drawBrush(minX, y, ctx, ctx.color);
      this.drawBrush(maxX, y, ctx, ctx.color);
    }
  }
}
