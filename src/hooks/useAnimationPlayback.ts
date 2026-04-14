'use client';

import { useEffect, useRef } from 'react';
import { useTimelineStore } from '@/stores/useTimelineStore';

function resolveFrameDurationMs(
  durationMs: number | undefined,
  fallbackFps: number
): number {
  if (typeof durationMs === 'number' && Number.isFinite(durationMs) && durationMs > 0) {
    return Math.max(1, Math.round(durationMs));
  }
  const fps = Math.max(1, Math.round(fallbackFps));
  return Math.max(1, Math.round(1000 / fps));
}

export function useAnimationPlayback() {
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const accumulatorRef = useRef(0);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    const tick = (timestamp: number) => {
      const state = useTimelineStore.getState();
      if (!state.isPlaying) {
        lastTimeRef.current = 0;
        accumulatorRef.current = 0;
        return;
      }

      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }

      const delta = Math.max(0, timestamp - lastTimeRef.current);
      lastTimeRef.current = timestamp;
      accumulatorRef.current += delta;

      let guard = 0;
      while (guard < 16) {
        const current = useTimelineStore.getState();
        if (!current.isPlaying) {
          accumulatorRef.current = 0;
          break;
        }

        const frame = current.frames[current.activeFrameIndex];
        const frameDuration = resolveFrameDurationMs(frame?.duration, current.fps);
        if (accumulatorRef.current < frameDuration) break;

        accumulatorRef.current -= frameDuration;

        if (!current.loop && current.activeFrameIndex >= current.frames.length - 1) {
          current.pause();
          accumulatorRef.current = 0;
          break;
        }

        current.nextFrame();
        guard += 1;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
      accumulatorRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
      accumulatorRef.current = 0;
    };

    const unsubscribe = useTimelineStore.subscribe((state) => {
      const nowPlaying = state.isPlaying;
      if (nowPlaying && !wasPlayingRef.current) {
        startLoop();
      } else if (!nowPlaying && wasPlayingRef.current) {
        stopLoop();
      }
      wasPlayingRef.current = nowPlaying;
    });

    wasPlayingRef.current = useTimelineStore.getState().isPlaying;
    if (wasPlayingRef.current) {
      startLoop();
    }

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);
}
