import type { ToolType, ToolContext } from '@/types/tool';
import type { RGBA } from '@/types/color';
import { BaseTool } from './BaseTool';
import { rgbaEqual } from '@/lib/utils/color';

export class FillTool extends BaseTool {
  type: ToolType = 'fill';
  cursor = 'crosshair';

  onPointerDown(x: number, y: number, ctx: ToolContext): void {
    if (x < 0 || x >= ctx.width || y < 0 || y >= ctx.height) return;

    const targetColor = ctx.getPixel(x, y);
    const fillColor = ctx.color;

    if (rgbaEqual(targetColor, fillColor)) return;

    this.scanlineFill(x, y, targetColor, fillColor, ctx);
  }

  onPointerMove(): void {}
  onPointerUp(): void {}

  private scanlineFill(startX: number, startY: number, target: RGBA, fill: RGBA, ctx: ToolContext): void {
    const stack: Array<[number, number]> = [[startX, startY]];
    const visited = new Set<string>();

    while (stack.length > 0) {
      const [cx, cy] = stack.pop()!;
      const key = `${cx},${cy}`;

      if (visited.has(key)) continue;
      if (cx < 0 || cx >= ctx.width || cy < 0 || cy >= ctx.height) continue;

      const current = ctx.getPixel(cx, cy);
      if (!rgbaEqual(current, target)) continue;

      visited.add(key);
      ctx.setPixel(cx, cy, fill);

      stack.push([cx + 1, cy]);
      stack.push([cx - 1, cy]);
      stack.push([cx, cy + 1]);
      stack.push([cx, cy - 1]);
    }
  }
}
