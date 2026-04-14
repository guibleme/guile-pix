import { create } from 'zustand';
import type { Frame } from '@/types/frame';
import { nanoid } from 'nanoid';
import {
  DEFAULT_FPS,
  DEFAULT_FRAME_DURATION,
  MIN_FRAME_DURATION,
  MAX_FRAME_DURATION,
} from '@/constants/animation';

interface TimelineState {
  frames: Frame[];
  activeFrameIndex: number;
  fps: number;
  isPlaying: boolean;
  loop: boolean;
  addFrame: () => string;
  addLinkedFrame: (sourceIndex: number) => string;
  duplicateFrame: (index: number) => void;
  linkFrameTo: (targetIndex: number, sourceIndex: number) => void;
  unlinkFrame: (index: number) => void;
  removeFrame: (index: number) => void;
  setActiveFrame: (index: number) => void;
  setFps: (fps: number) => void;
  setFrameDuration: (frameId: string, durationMs: number) => void;
  setAllFrameDurations: (durationMs: number) => void;
  setFrameDurationsFrom: (startIndex: number, durationMs: number) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  toggleLoop: () => void;
  nextFrame: () => void;
  prevFrame: () => void;
  getActiveFrame: () => Frame;
  setFrameLayerData: (frameId: string, layerId: string, data: Uint8ClampedArray) => void;
  removeFrameLayerData: (frameId: string, layerId: string) => void;
  applyFrameLayerChanges: (
    changes: Array<{ frameId: string; layerId: string; data: Uint8ClampedArray | null }>
  ) => void;
  initFrameLayer: (frameId: string, layerId: string, width: number, height: number) => void;
}

function createFrame(index: number): Frame {
  return {
    id: nanoid(),
    index,
    duration: DEFAULT_FRAME_DURATION,
    layerData: {},
  };
}

const firstFrame = createFrame(0);

function clampFrameDuration(durationMs: number): number {
  const rounded = Math.round(durationMs);
  return Math.max(MIN_FRAME_DURATION, Math.min(MAX_FRAME_DURATION, rounded));
}

function applyLayerDataChanges(
  frames: Frame[],
  changes: Array<{ frameId: string; layerId: string; data: Uint8ClampedArray | null }>
): Frame[] {
  if (changes.length === 0) return frames;

  const byFrame = new Map<string, Array<{ layerId: string; data: Uint8ClampedArray | null }>>();
  for (const change of changes) {
    const frameChanges = byFrame.get(change.frameId) ?? [];
    frameChanges.push({ layerId: change.layerId, data: change.data });
    byFrame.set(change.frameId, frameChanges);
  }

  return frames.map((frame) => {
    const frameChanges = byFrame.get(frame.id);
    if (!frameChanges) return frame;

    const nextLayerData: Record<string, Uint8ClampedArray> = { ...frame.layerData };
    for (const frameChange of frameChanges) {
      if (frameChange.data) {
        nextLayerData[frameChange.layerId] = new Uint8ClampedArray(frameChange.data);
      } else {
        delete nextLayerData[frameChange.layerId];
      }
    }

    return { ...frame, layerData: nextLayerData };
  });
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  frames: [firstFrame],
  activeFrameIndex: 0,
  fps: DEFAULT_FPS,
  isPlaying: false,
  loop: true,

  addFrame: () => {
    const frame = createFrame(get().frames.length);
    set((s) => ({
      frames: [...s.frames, frame],
      activeFrameIndex: s.frames.length,
    }));
    return frame.id;
  },

  addLinkedFrame: (sourceIndex) => {
    const src = get().frames[sourceIndex];
    if (!src) return '';
    const newFrame: Frame = {
      id: nanoid(),
      index: get().frames.length,
      duration: src.duration,
      layerData: { ...src.layerData },
    };
    set((s) => ({
      frames: [...s.frames, newFrame],
      activeFrameIndex: s.frames.length,
    }));
    return newFrame.id;
  },

  duplicateFrame: (index) => {
    const src = get().frames[index];
    if (!src) return;
    const newFrame: Frame = {
      id: nanoid(),
      index: get().frames.length,
      duration: src.duration,
      layerData: Object.fromEntries(
        Object.entries(src.layerData).map(([k, v]) => [k, new Uint8ClampedArray(v)])
      ),
    };
    set((s) => ({
      frames: [...s.frames, newFrame],
      activeFrameIndex: s.frames.length,
    }));
  },

  linkFrameTo: (targetIndex, sourceIndex) => {
    set((s) => {
      if (targetIndex < 0 || targetIndex >= s.frames.length) return s;
      if (sourceIndex < 0 || sourceIndex >= s.frames.length) return s;
      if (targetIndex === sourceIndex) return s;
      const source = s.frames[sourceIndex];
      return {
        frames: s.frames.map((frame, index) =>
          index === targetIndex
            ? {
                ...frame,
                duration: source.duration,
                layerData: { ...source.layerData },
              }
            : frame
        ),
      };
    });
  },

  unlinkFrame: (index) => {
    set((s) => {
      if (index < 0 || index >= s.frames.length) return s;
      const frame = s.frames[index];
      const detachedLayerData = Object.fromEntries(
        Object.entries(frame.layerData).map(([layerId, data]) => [layerId, new Uint8ClampedArray(data)])
      );
      return {
        frames: s.frames.map((item, i) =>
          i === index
            ? { ...item, layerData: detachedLayerData }
            : item
        ),
      };
    });
  },

  removeFrame: (index) => {
    if (get().frames.length <= 1) return;
    set((s) => {
      const frames = s.frames.filter((_, i) => i !== index);
      frames.forEach((f, i) => (f.index = i));
      return {
        frames,
        activeFrameIndex: Math.min(s.activeFrameIndex, frames.length - 1),
      };
    });
  },

  setActiveFrame: (index) => set({ activeFrameIndex: index }),
  setFps: (fps) => set({ fps }),
  setFrameDuration: (frameId, durationMs) =>
    set((s) => ({
      frames: s.frames.map((f) =>
        f.id === frameId ? { ...f, duration: clampFrameDuration(durationMs) } : f
      ),
    })),
  setAllFrameDurations: (durationMs) => {
    const next = clampFrameDuration(durationMs);
    set((s) => ({
      frames: s.frames.map((frame) => ({ ...frame, duration: next })),
    }));
  },
  setFrameDurationsFrom: (startIndex, durationMs) => {
    const next = clampFrameDuration(durationMs);
    set((s) => ({
      frames: s.frames.map((frame, index) =>
        index >= startIndex ? { ...frame, duration: next } : frame
      ),
    }));
  },
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  stop: () => set({ isPlaying: false, activeFrameIndex: 0 }),
  toggleLoop: () => set((s) => ({ loop: !s.loop })),

  nextFrame: () =>
    set((s) => ({
      activeFrameIndex: s.loop
        ? (s.activeFrameIndex + 1) % s.frames.length
        : Math.min(s.activeFrameIndex + 1, s.frames.length - 1),
    })),

  prevFrame: () =>
    set((s) => ({
      activeFrameIndex: s.loop
        ? (s.activeFrameIndex - 1 + s.frames.length) % s.frames.length
        : Math.max(s.activeFrameIndex - 1, 0),
    })),

  getActiveFrame: () => {
    const { frames, activeFrameIndex } = get();
    return frames[activeFrameIndex];
  },

  setFrameLayerData: (frameId, layerId, data) =>
    set((s) => ({
      frames: s.frames.map((f) =>
        f.id === frameId
          ? { ...f, layerData: { ...f.layerData, [layerId]: new Uint8ClampedArray(data) } }
          : f
      ),
    })),

  removeFrameLayerData: (frameId, layerId) =>
    set((s) => ({
      frames: s.frames.map((f) => {
        if (f.id !== frameId || !f.layerData[layerId]) return f;
        const nextLayerData = { ...f.layerData };
        delete nextLayerData[layerId];
        return { ...f, layerData: nextLayerData };
      }),
    })),

  applyFrameLayerChanges: (changes) =>
    set((s) => ({
      frames: applyLayerDataChanges(s.frames, changes),
    })),

  initFrameLayer: (frameId, layerId, width, height) => {
    const frame = get().frames.find((f) => f.id === frameId);
    if (frame && !frame.layerData[layerId]) {
      set((s) => ({
        frames: s.frames.map((f) =>
          f.id === frameId
            ? { ...f, layerData: { ...f.layerData, [layerId]: new Uint8ClampedArray(width * height * 4) } }
            : f
        ),
      }));
    }
  },
}));
