import type { ITool, ToolType, ToolContext, Point } from '@/types/tool';
import { bresenhamLine } from '@/lib/utils/math';

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.max(0, Math.min(1, value));
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

export abstract class BaseTool implements ITool {
  abstract type: ToolType;
  abstract cursor: string;

  protected lastPoint: Point | null = null;
  protected isDrawing = false;

  abstract onPointerDown(x: number, y: number, ctx: ToolContext): void;
  abstract onPointerMove(x: number, y: number, ctx: ToolContext): void;
  abstract onPointerUp(x: number, y: number, ctx: ToolContext): void;

  protected resolvePressureValue(ctx: ToolContext): number {
    return clamp01(ctx.pressure);
  }

  protected resolvePressureFlow(ctx: ToolContext): number {
    if (ctx.pressureMode !== 'opacity' && ctx.pressureMode !== 'sizeOpacity') {
      return 1;
    }

    const pressure = this.resolvePressureValue(ctx);
    return clamp01(lerp(ctx.pressureOpacityMin, 1, pressure));
  }

  protected resolvePressureBrushSize(ctx: ToolContext): number {
    if (ctx.pressureMode !== 'size' && ctx.pressureMode !== 'sizeOpacity') {
      return ctx.brushSize;
    }

    const pressure = this.resolvePressureValue(ctx);
    const factor = clamp01(lerp(ctx.pressureSizeMin, 1, pressure));
    return Math.max(1, Math.round(ctx.brushSize * factor));
  }

  protected applyPaintWithFlow(
    x: number,
    y: number,
    color: { r: number; g: number; b: number; a: number },
    flow: number,
    ctx: ToolContext
  ): void {
    if (x < 0 || x >= ctx.width || y < 0 || y >= ctx.height) return;

    const resolvedFlow = clamp01(flow);
    if (resolvedFlow <= 0) return;

    if (resolvedFlow >= 0.999 && color.a >= 255) {
      ctx.setPixel(x, y, color);
      return;
    }

    const source = ctx.getPixel(x, y);

    // Transparent target color represents erasing; scale alpha by flow.
    if (color.a === 0) {
      const nextAlpha = Math.round(source.a * (1 - resolvedFlow));
      if (nextAlpha <= 0) {
        ctx.setPixel(x, y, { r: 0, g: 0, b: 0, a: 0 });
      } else {
        ctx.setPixel(x, y, { r: source.r, g: source.g, b: source.b, a: nextAlpha });
      }
      return;
    }

    const sourceAlpha = source.a / 255;
    const paintAlpha = (color.a / 255) * resolvedFlow;
    if (paintAlpha <= 0) return;

    const outAlpha = paintAlpha + sourceAlpha * (1 - paintAlpha);
    if (outAlpha <= 0) {
      ctx.setPixel(x, y, { r: 0, g: 0, b: 0, a: 0 });
      return;
    }

    const outR = Math.round((color.r * paintAlpha + source.r * sourceAlpha * (1 - paintAlpha)) / outAlpha);
    const outG = Math.round((color.g * paintAlpha + source.g * sourceAlpha * (1 - paintAlpha)) / outAlpha);
    const outB = Math.round((color.b * paintAlpha + source.b * sourceAlpha * (1 - paintAlpha)) / outAlpha);
    const outA = Math.round(outAlpha * 255);
    ctx.setPixel(x, y, { r: outR, g: outG, b: outB, a: outA });
  }

  protected drawBrush(x: number, y: number, ctx: ToolContext, color: { r: number; g: number; b: number; a: number }): void {
    const size = this.resolvePressureBrushSize(ctx);
    const flow = this.resolvePressureFlow(ctx);
    const half = Math.floor(size / 2);

    if (ctx.brushShape === 'square') {
      for (let dy = 0; dy < size; dy++) {
        for (let dx = 0; dx < size; dx++) {
          const px = x - half + dx;
          const py = y - half + dy;
          this.applyPaintWithFlow(px, py, color, flow, ctx);
        }
      }
    } else {
      const radius = size / 2;
      for (let dy = -Math.ceil(radius); dy <= Math.ceil(radius); dy++) {
        for (let dx = -Math.ceil(radius); dx <= Math.ceil(radius); dx++) {
          if (dx * dx + dy * dy <= radius * radius) {
            const px = x + dx;
            const py = y + dy;
            this.applyPaintWithFlow(px, py, color, flow, ctx);
          }
        }
      }
    }
  }

  protected interpolateLine(x0: number, y0: number, x1: number, y1: number, ctx: ToolContext, color: { r: number; g: number; b: number; a: number }): void {
    const points = bresenhamLine(x0, y0, x1, y1);
    for (const p of points) {
      this.drawBrush(p.x, p.y, ctx, color);
    }
  }
}
