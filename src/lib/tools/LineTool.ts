import type { ToolType, ToolContext, Point } from '@/types/tool';
import { BaseTool } from './BaseTool';

export class LineTool extends BaseTool {
  type: ToolType = 'line';
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
    // Restore original buffer
    const buf = ctx.getPixelBuffer();
    buf.set(this.previewBuffer);
    // Draw preview line
    this.interpolateLine(this.startPoint.x, this.startPoint.y, x, y, ctx, ctx.color);
  }

  onPointerUp(x: number, y: number, ctx: ToolContext): void {
    if (!this.startPoint || !this.previewBuffer) {
      this.isDrawing = false;
      return;
    }
    // Restore and draw final
    const buf = ctx.getPixelBuffer();
    buf.set(this.previewBuffer);
    this.interpolateLine(this.startPoint.x, this.startPoint.y, x, y, ctx, ctx.color);
    this.startPoint = null;
    this.previewBuffer = null;
    this.isDrawing = false;
  }
}
