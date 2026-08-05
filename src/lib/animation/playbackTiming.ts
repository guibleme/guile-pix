export interface PlaybackFrameTiming {
  duration?: number;
}

export interface LoopingFrameAdvance {
  frameIndex: number;
  remainderMs: number;
  advancedFrames: number;
}

export function resolveFrameDurationMs(
  durationMs: number | undefined,
  fallbackFps: number
): number {
  if (typeof durationMs === 'number' && Number.isFinite(durationMs) && durationMs > 0) {
    return Math.max(1, Math.round(durationMs));
  }

  const fps = Number.isFinite(fallbackFps) ? Math.max(1, Math.round(fallbackFps)) : 1;
  return Math.max(1, Math.round(1000 / fps));
}

export function advanceLoopingFrames(
  frames: PlaybackFrameTiming[],
  currentFrameIndex: number,
  accumulatedMs: number,
  fallbackFps: number
): LoopingFrameAdvance {
  if (frames.length === 0) {
    return { frameIndex: 0, remainderMs: 0, advancedFrames: 0 };
  }

  let frameIndex = Math.max(0, Math.min(Math.trunc(currentFrameIndex), frames.length - 1));
  let remainderMs = Number.isFinite(accumulatedMs) ? Math.max(0, accumulatedMs) : 0;
  const durations = frames.map((frame) => resolveFrameDurationMs(frame.duration, fallbackFps));
  const cycleDuration = durations.reduce((sum, duration) => sum + duration, 0);
  let advancedFrames = 0;

  if (remainderMs >= cycleDuration) {
    const completeCycles = Math.floor(remainderMs / cycleDuration);
    remainderMs -= completeCycles * cycleDuration;
    advancedFrames += completeCycles * frames.length;
  }

  while (remainderMs >= durations[frameIndex]) {
    remainderMs -= durations[frameIndex];
    frameIndex = (frameIndex + 1) % frames.length;
    advancedFrames += 1;
  }

  return { frameIndex, remainderMs, advancedFrames };
}
