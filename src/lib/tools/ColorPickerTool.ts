import type { ToolType, ToolContext } from '@/types/tool';
import { BaseTool } from './BaseTool';

export type ColorPickCallback = (color: { r: number; g: number; b: number; a: number }) => void;

export class ColorPickerTool extends BaseTool {
  type: ToolType = 'colorPicker';
  cursor = 'crosshair';
  onColorPick: ColorPickCallback | null = null;

  onPointerDown(x: number, y: number, ctx: ToolContext): void {
    if (x < 0 || x >= ctx.width || y < 0 || y >= ctx.height) return;
    const color = ctx.getPixel(x, y);
    if (this.onColorPick) {
      this.onColorPick(color);
    }
  }

  onPointerMove(x: number, y: number, ctx: ToolContext): void {
    if (x < 0 || x >= ctx.width || y < 0 || y >= ctx.height) return;
    const color = ctx.getPixel(x, y);
    if (this.onColorPick) {
      this.onColorPick(color);
    }
  }

  onPointerUp(): void {}
}
