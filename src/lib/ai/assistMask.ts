/**
 * Pure mask builder for AI assist requests.
 *
 * Turns an assist target into the MCP `mask` schema (`runs: [{y, xStart,
 * xEnd}]`, inclusive) so the agent can pass it straight to
 * define_mask/apply_mask/transform_region:
 * - pin   -> a single 1px run; the agent may expand it (e.g. flood fill
 *            from the point) and define its own mask.
 * - rect  -> full-rect runs, one per row.
 * - frame -> full-canvas runs, one per row.
 *
 * Everything is clamped to the canvas bounds; a rect that lands entirely
 * outside the canvas is rejected (an empty mask is not a valid request).
 */
import type { AssistMaskRun, AssistTarget } from '@/types/ai';

export interface AssistMask {
  runs: AssistMaskRun[];
}

function clampCoordinate(value: number, max: number): number {
  return Math.max(0, Math.min(max - 1, value));
}

function fullRowRuns(xStart: number, xEnd: number, yStart: number, yEnd: number): AssistMaskRun[] {
  const runs: AssistMaskRun[] = [];
  for (let y = yStart; y <= yEnd; y++) {
    runs.push({ y, xStart, xEnd });
  }
  return runs;
}

export function buildAssistMask(target: AssistTarget, width: number, height: number): AssistMask {
  if (!Number.isInteger(width) || width <= 0 || !Number.isInteger(height) || height <= 0) {
    throw new Error('Canvas must have positive integer dimensions');
  }
  switch (target.kind) {
    case 'pin': {
      const x = clampCoordinate(target.point.x, width);
      const y = clampCoordinate(target.point.y, height);
      return { runs: [{ y, xStart: x, xEnd: x }] };
    }
    case 'rect': {
      const x0 = Math.max(0, target.rect.x);
      const y0 = Math.max(0, target.rect.y);
      const x1 = Math.min(width - 1, target.rect.x + target.rect.w - 1);
      const y1 = Math.min(height - 1, target.rect.y + target.rect.h - 1);
      if (x1 < x0 || y1 < y0) {
        throw new Error('Target rect is empty after clamping to the canvas');
      }
      return { runs: fullRowRuns(x0, x1, y0, y1) };
    }
    case 'frame':
      return { runs: fullRowRuns(0, width - 1, 0, height - 1) };
  }
}
