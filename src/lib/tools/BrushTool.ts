import type { ToolType, ToolContext, Point } from '@/types/tool';
import type { RGBA } from '@/types/color';
import { BaseTool } from './BaseTool';
import { bresenhamLine } from '@/lib/utils/math';
import { getSymmetryPoints } from './symmetry';

export class BrushTool extends BaseTool {
  type: ToolType = 'brush';
  cursor = 'crosshair';

  private pixelPerfectStroke: Point[] = [];
  private pixelPerfectTouched = new Map<string, Point>();
  private traceStroke: Point[] = [];
  private traceTouched = new Map<string, Point>();
  private originalPixels = new Map<string, RGBA>();

  private canUsePixelPerfect(ctx: ToolContext): boolean {
    return ctx.freehandAlgorithm === 'pixelPerfect' && ctx.brushSize === 1 && ctx.brushShape === 'square';
  }

  private canUseAccumulateUpdateLast(ctx: ToolContext): boolean {
    return ctx.freehandTracePolicy === 'accumulateUpdateLast' && !this.canUsePixelPerfect(ctx);
  }

  private isDotsMode(ctx: ToolContext): boolean {
    return ctx.freehandAlgorithm === 'dots';
  }

  private pointKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  private saveOriginalPixel(x: number, y: number, ctx: ToolContext): void {
    const key = this.pointKey(x, y);
    if (this.originalPixels.has(key)) return;
    const pixel = ctx.getPixel(x, y);
    this.originalPixels.set(key, { ...pixel });
  }

  private paintPoint(x: number, y: number, ctx: ToolContext): void {
    const symmetryPoints = getSymmetryPoints(x, y, ctx);
    for (const point of symmetryPoints) {
      this.saveOriginalPixel(point.x, point.y, ctx);
      this.drawBrush(point.x, point.y, ctx, ctx.color);
    }
  }

  private paintPointTracked(
    x: number,
    y: number,
    ctx: ToolContext,
    touched: Map<string, Point>
  ): void {
    this.paintPoint(x, y, ctx);
    touched.set(this.pointKey(x, y), { x, y });
  }

  private restorePoint(x: number, y: number, ctx: ToolContext): void {
    const symmetryPoints = getSymmetryPoints(x, y, ctx);
    for (const point of symmetryPoints) {
      const key = this.pointKey(point.x, point.y);
      const color = this.originalPixels.get(key);
      if (!color) continue;
      ctx.setPixel(point.x, point.y, color);
    }
  }

  private drawSymmetricBrush(x: number, y: number, ctx: ToolContext): void {
    const symmetryPoints = getSymmetryPoints(x, y, ctx);
    for (const point of symmetryPoints) {
      this.drawBrush(point.x, point.y, ctx, ctx.color);
    }
  }

  private interpolateSymmetricLine(x0: number, y0: number, x1: number, y1: number, ctx: ToolContext): void {
    const points = bresenhamLine(x0, y0, x1, y1);
    for (const point of points) {
      this.drawSymmetricBrush(point.x, point.y, ctx);
    }
  }

  private resetStrokeState(): void {
    this.pixelPerfectStroke = [];
    this.pixelPerfectTouched.clear();
    this.traceStroke = [];
    this.traceTouched.clear();
    this.originalPixels.clear();
  }

  private appendPoint(stroke: Point[], x: number, y: number): void {
    const last = stroke[stroke.length - 1];
    if (last && last.x === x && last.y === y) return;
    stroke.push({ x, y });
  }

  private appendSegment(stroke: Point[], from: Point, to: Point): void {
    const points = bresenhamLine(from.x, from.y, to.x, to.y);
    for (const point of points) {
      this.appendPoint(stroke, point.x, point.y);
    }
  }

  private isPixelPerfectCorner(prev: Point, mid: Point, next: Point): boolean {
    return (
      (prev.x === mid.x || prev.y === mid.y) &&
      (next.x === mid.x || next.y === mid.y) &&
      prev.x !== next.x &&
      prev.y !== next.y
    );
  }

  private restoreTouched(touched: Map<string, Point>, ctx: ToolContext): void {
    for (const point of touched.values()) {
      this.restorePoint(point.x, point.y, ctx);
    }
    touched.clear();
  }

  private renderPixelPerfectStroke(ctx: ToolContext): void {
    this.restoreTouched(this.pixelPerfectTouched, ctx);

    for (let i = 0; i < this.pixelPerfectStroke.length; i += 1) {
      const prev = this.pixelPerfectStroke[i - 1];
      const current = this.pixelPerfectStroke[i];
      const next = this.pixelPerfectStroke[i + 1];

      if (prev && next && this.isPixelPerfectCorner(prev, current, next)) {
        i += 1;
        if (i >= this.pixelPerfectStroke.length) break;
      }

      const point = this.pixelPerfectStroke[i];
      this.paintPointTracked(point.x, point.y, ctx, this.pixelPerfectTouched);
    }
  }

  private renderAccumulateUpdateLastStroke(ctx: ToolContext): void {
    this.restoreTouched(this.traceTouched, ctx);
    if (this.traceStroke.length === 0) return;

    if (this.isDotsMode(ctx)) {
      for (const point of this.traceStroke) {
        this.paintPointTracked(point.x, point.y, ctx, this.traceTouched);
      }
      return;
    }

    const first = this.traceStroke[0];
    this.paintPointTracked(first.x, first.y, ctx, this.traceTouched);

    for (let i = 1; i < this.traceStroke.length; i += 1) {
      const prev = this.traceStroke[i - 1];
      const current = this.traceStroke[i];
      const segment = bresenhamLine(prev.x, prev.y, current.x, current.y);
      for (const point of segment) {
        this.paintPointTracked(point.x, point.y, ctx, this.traceTouched);
      }
    }
  }

  onPointerDown(x: number, y: number, ctx: ToolContext): void {
    this.isDrawing = true;
    this.lastPoint = { x, y };
    this.resetStrokeState();

    if (this.canUsePixelPerfect(ctx)) {
      this.appendPoint(this.pixelPerfectStroke, x, y);
      this.renderPixelPerfectStroke(ctx);
      return;
    }

    if (this.canUseAccumulateUpdateLast(ctx)) {
      this.appendPoint(this.traceStroke, x, y);
      this.renderAccumulateUpdateLastStroke(ctx);
      return;
    }

    this.drawSymmetricBrush(x, y, ctx);
  }

  onPointerMove(x: number, y: number, ctx: ToolContext): void {
    if (!this.isDrawing || !this.lastPoint) return;

    if (this.canUsePixelPerfect(ctx)) {
      this.appendSegment(this.pixelPerfectStroke, this.lastPoint, { x, y });
      this.renderPixelPerfectStroke(ctx);
      this.lastPoint = { x, y };
      return;
    }

    if (this.canUseAccumulateUpdateLast(ctx)) {
      this.appendSegment(this.traceStroke, this.lastPoint, { x, y });
      this.renderAccumulateUpdateLastStroke(ctx);
      this.lastPoint = { x, y };
      return;
    }

    if (this.isDotsMode(ctx)) {
      this.drawSymmetricBrush(x, y, ctx);
      this.lastPoint = { x, y };
      return;
    }

    this.interpolateSymmetricLine(this.lastPoint.x, this.lastPoint.y, x, y, ctx);
    this.lastPoint = { x, y };
  }

  onPointerUp(): void {
    this.isDrawing = false;
    this.lastPoint = null;
    this.resetStrokeState();
  }
}
