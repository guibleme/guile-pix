'use client';

import type { ITool, ToolContext } from '@/types/tool';

// Selection behavior is orchestrated in CanvasViewport because it needs
// direct access to canvas overlays and drag state across frames/layers.
export class SelectTool implements ITool {
  type = 'select' as const;
  cursor = 'crosshair';

  onPointerDown(_x: number, _y: number, _ctx: ToolContext): void {}
  onPointerMove(_x: number, _y: number, _ctx: ToolContext): void {}
  onPointerUp(_x: number, _y: number, _ctx: ToolContext): void {}
}
