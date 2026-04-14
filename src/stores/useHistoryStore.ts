import { create } from 'zustand';
import type { HistoryEntry, HistoryLayerStateSnapshot, HistoryPixelChange } from '@/types/history';
import { nanoid } from 'nanoid';

const MAX_HISTORY = 50;

interface HistoryState {
  undoStack: HistoryEntry[];
  redoStack: HistoryEntry[];
  pushEntry: (
    label: string,
    frameId: string,
    layerId: string,
    prevData: Uint8ClampedArray,
    newData: Uint8ClampedArray
  ) => void;
  pushTransaction: (
    label: string,
    changes: HistoryPixelChange[],
    options?: {
      beforeLayerState?: HistoryLayerStateSnapshot;
      afterLayerState?: HistoryLayerStateSnapshot;
    }
  ) => void;
  undo: () => HistoryEntry | null;
  redo: () => HistoryEntry | null;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clear: () => void;
}

function clonePixelData(data: Uint8ClampedArray | null): Uint8ClampedArray | null {
  return data ? new Uint8ClampedArray(data) : null;
}

function cloneChanges(changes: HistoryPixelChange[]): HistoryPixelChange[] {
  return changes.map((change) => ({
    frameId: change.frameId,
    layerId: change.layerId,
    pixelData: clonePixelData(change.pixelData),
    previousPixelData: clonePixelData(change.previousPixelData),
  }));
}

function cloneLayerState(snapshot: HistoryLayerStateSnapshot | undefined): HistoryLayerStateSnapshot | undefined {
  if (!snapshot) return undefined;
  return {
    layers: snapshot.layers.map((layer) => ({ ...layer })),
    activeLayerId: snapshot.activeLayerId,
  };
}

function hasLayerStateDifference(
  beforeLayerState: HistoryLayerStateSnapshot | undefined,
  afterLayerState: HistoryLayerStateSnapshot | undefined
): boolean {
  if (!beforeLayerState && !afterLayerState) return false;
  if (!beforeLayerState || !afterLayerState) return true;
  if (beforeLayerState.activeLayerId !== afterLayerState.activeLayerId) return true;
  if (beforeLayerState.layers.length !== afterLayerState.layers.length) return true;
  for (let i = 0; i < beforeLayerState.layers.length; i += 1) {
    const before = beforeLayerState.layers[i];
    const after = afterLayerState.layers[i];
    if (!after) return true;
    if (
      before.id !== after.id ||
      before.name !== after.name ||
      before.visible !== after.visible ||
      before.locked !== after.locked ||
      before.opacity !== after.opacity ||
      before.blendMode !== after.blendMode
    ) {
      return true;
    }
  }
  return false;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  undoStack: [],
  redoStack: [],

  pushEntry: (label, frameId, layerId, prevData, newData) => {
    get().pushTransaction(label, [
      {
        frameId,
        layerId,
        previousPixelData: prevData,
        pixelData: newData,
      },
    ]);
  },

  pushTransaction: (label, changes, options) => {
    const sanitizedChanges = cloneChanges(changes);
    const beforeLayerState = cloneLayerState(options?.beforeLayerState);
    const afterLayerState = cloneLayerState(options?.afterLayerState);

    if (sanitizedChanges.length === 0 && !hasLayerStateDifference(beforeLayerState, afterLayerState)) {
      return;
    }

    const entry: HistoryEntry = {
      id: nanoid(),
      label,
      timestamp: Date.now(),
      changes: sanitizedChanges,
      beforeLayerState,
      afterLayerState,
    };

    set((s) => ({
      undoStack: [...s.undoStack.slice(-MAX_HISTORY + 1), entry],
      redoStack: [],
    }));
  },

  undo: () => {
    const { undoStack } = get();
    if (undoStack.length === 0) return null;
    const entry = undoStack[undoStack.length - 1];
    set((s) => ({
      undoStack: s.undoStack.slice(0, -1),
      redoStack: [...s.redoStack, entry],
    }));
    return entry;
  },

  redo: () => {
    const { redoStack } = get();
    if (redoStack.length === 0) return null;
    const entry = redoStack[redoStack.length - 1];
    set((s) => ({
      redoStack: s.redoStack.slice(0, -1),
      undoStack: [...s.undoStack, entry],
    }));
    return entry;
  },

  canUndo: () => get().undoStack.length > 0,
  canRedo: () => get().redoStack.length > 0,
  clear: () => set({ undoStack: [], redoStack: [] }),
}));
