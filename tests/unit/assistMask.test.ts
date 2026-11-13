import { describe, expect, it } from 'vitest';
import { buildAssistMask } from '@/lib/ai/assistMask';

describe('buildAssistMask', () => {
  it('builds a single 1px run for a pin', () => {
    expect(buildAssistMask({ kind: 'pin', point: { x: 12, y: 8 } }, 24, 54)).toEqual({
      runs: [{ y: 8, xStart: 12, xEnd: 12 }],
    });
  });

  it('clamps a pin outside the canvas to the nearest edge pixel', () => {
    expect(buildAssistMask({ kind: 'pin', point: { x: 99, y: -3 } }, 24, 54)).toEqual({
      runs: [{ y: 0, xStart: 23, xEnd: 23 }],
    });
  });

  it('builds full-rect runs, one per row, for a rect', () => {
    expect(buildAssistMask({ kind: 'rect', rect: { x: 4, y: 6, w: 10, h: 3 } }, 24, 54)).toEqual({
      runs: [
        { y: 6, xStart: 4, xEnd: 13 },
        { y: 7, xStart: 4, xEnd: 13 },
        { y: 8, xStart: 4, xEnd: 13 },
      ],
    });
  });

  it('clamps a rect that overflows the canvas edges', () => {
    expect(buildAssistMask({ kind: 'rect', rect: { x: 20, y: 50, w: 10, h: 10 } }, 24, 54)).toEqual({
      runs: [
        { y: 50, xStart: 20, xEnd: 23 },
        { y: 51, xStart: 20, xEnd: 23 },
        { y: 52, xStart: 20, xEnd: 23 },
        { y: 53, xStart: 20, xEnd: 23 },
      ],
    });
  });

  it('rejects a rect that lands entirely outside the canvas', () => {
    expect(() =>
      buildAssistMask({ kind: 'rect', rect: { x: 30, y: 60, w: 5, h: 5 } }, 24, 54),
    ).toThrow('empty after clamping');
    expect(() =>
      buildAssistMask({ kind: 'rect', rect: { x: 0, y: 0, w: 0, h: 5 } }, 24, 54),
    ).toThrow('empty after clamping');
  });

  it('builds full-canvas runs for a frame target', () => {
    const mask = buildAssistMask({ kind: 'frame' }, 3, 2);
    expect(mask).toEqual({
      runs: [
        { y: 0, xStart: 0, xEnd: 2 },
        { y: 1, xStart: 0, xEnd: 2 },
      ],
    });
  });

  it('rejects non-positive canvas dimensions', () => {
    expect(() => buildAssistMask({ kind: 'frame' }, 0, 10)).toThrow('positive integer dimensions');
    expect(() => buildAssistMask({ kind: 'frame' }, 10, -1)).toThrow('positive integer dimensions');
  });
});
