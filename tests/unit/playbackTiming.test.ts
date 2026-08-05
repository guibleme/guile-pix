import { describe, expect, it } from 'vitest';
import { ticksToDurationsMs } from '../../packages/sprite-core/src';
import { advanceLoopingFrames, resolveFrameDurationMs } from '../../src/lib/animation/playbackTiming';

describe('playback timing', () => {
  it('holds unequal frames for their exact durations and preserves remainder', () => {
    const frames = [{ duration: 50 }, { duration: 200 }, { duration: 80 }];

    expect(advanceLoopingFrames(frames, 0, 49, 12)).toEqual({
      frameIndex: 0,
      remainderMs: 49,
      advancedFrames: 0,
    });
    expect(advanceLoopingFrames(frames, 0, 50, 12)).toEqual({
      frameIndex: 1,
      remainderMs: 0,
      advancedFrames: 1,
    });
    expect(advanceLoopingFrames(frames, 1, 199, 12)).toEqual({
      frameIndex: 1,
      remainderMs: 199,
      advancedFrames: 0,
    });
  });

  it('consumes large deltas across cycles without discarding remainder', () => {
    const frames = [{ duration: 50 }, { duration: 200 }, { duration: 80 }];

    expect(advanceLoopingFrames(frames, 0, 745, 12)).toEqual({
      frameIndex: 1,
      remainderMs: 35,
      advancedFrames: 7,
    });
  });

  it('uses FPS only as the fallback for missing or invalid duration', () => {
    expect(resolveFrameDurationMs(75, 10)).toBe(75);
    expect(resolveFrameDurationMs(undefined, 10)).toBe(100);
    expect(resolveFrameDurationMs(Number.NaN, 20)).toBe(50);
  });

  it('converts timeline ticks with cumulative boundaries and exact total duration', () => {
    const durations = ticksToDurationsMs([8, 4, 4, 8, 4, 4, 8, 8], 24);
    expect(durations.every((duration) => duration > 0)).toBe(true);
    expect(durations.reduce((sum, duration) => sum + duration, 0)).toBe(2000);
  });
});
