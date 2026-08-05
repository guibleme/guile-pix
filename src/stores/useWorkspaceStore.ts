import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { ProjectSettings } from '@/types/project';
import type { Layer } from '@/types/layer';
import type { Frame } from '@/types/frame';
import type { HistoryEntry, HistoryLayerStateSnapshot } from '@/types/history';
import { deserializeProject, serializeProject } from '@/lib/export/projectFile';
import { useProjectStore } from '@/stores/useProjectStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useHistoryStore } from '@/stores/useHistoryStore';
import { usePersistenceStore } from '@/stores/usePersistenceStore';
import { useCanvasStore } from '@/stores/useCanvasStore';
import { useAIStore } from '@/stores/useAIStore';
import { loadWorkspaceSession } from '@/lib/project/workspaceSessionStorage';
import { appendCopySuffix } from '@/lib/i18nRuntime';

const MAX_CLOSED_DOCUMENTS = 12;

interface WorkspaceDocumentData {
  project: ProjectSettings;
  layers: Layer[];
  activeLayerId: string;
  frames: Frame[];
  activeFrameIndex: number;
  fps: number;
  undoStack: HistoryEntry[];
  redoStack: HistoryEntry[];
  baselineSignature: string;
  isDirty: boolean;
}

export interface WorkspaceDocument extends WorkspaceDocumentData {
  id: string;
}

interface CreateWorkspaceDocumentInput {
  project: ProjectSettings;
  layers: Layer[];
  activeLayerId: string;
  frames: Frame[];
  fps: number;
  activeFrameIndex?: number;
}

interface WorkspaceState {
  initialized: boolean;
  documents: WorkspaceDocument[];
  closedDocuments: WorkspaceDocument[];
  activeDocumentId: string | null;
  initializeFromCurrentStores: () => void;
  syncActiveDocumentFromStores: () => void;
  switchToDocument: (id: string) => boolean;
  closeDocument: (id: string) => boolean;
  closeOtherDocuments: (keepId: string) => boolean;
  reopenLastClosedDocument: (options?: { setActive?: boolean }) => string | null;
  duplicateDocument: (id: string, options?: { setActive?: boolean }) => string | null;
  createDocument: (input: CreateWorkspaceDocumentInput, options?: { setActive?: boolean }) => string;
  openProjectFileAsDocument: (file: unknown, options?: { setActive?: boolean }) => string;
}

function pushClosedDocuments(
  existing: WorkspaceDocument[],
  nextClosed: WorkspaceDocument | WorkspaceDocument[]
): WorkspaceDocument[] {
  const incoming = Array.isArray(nextClosed) ? nextClosed : [nextClosed];
  const merged = [...incoming, ...existing];
  const deduped: WorkspaceDocument[] = [];
  for (const doc of merged) {
    if (deduped.some((item) => item.id === doc.id)) continue;
    deduped.push(doc);
    if (deduped.length >= MAX_CLOSED_DOCUMENTS) break;
  }
  return deduped;
}

function cloneLayerState(snapshot: HistoryLayerStateSnapshot | undefined): HistoryLayerStateSnapshot | undefined {
  if (!snapshot) return undefined;
  return {
    layers: snapshot.layers.map((layer) => ({ ...layer })),
    activeLayerId: snapshot.activeLayerId,
  };
}

function cloneHistoryEntries(entries: HistoryEntry[]): HistoryEntry[] {
  return entries.map((entry) => ({
    ...entry,
    changes: entry.changes.map((change) => ({
      ...change,
      previousPixelData: change.previousPixelData ? new Uint8ClampedArray(change.previousPixelData) : null,
      pixelData: change.pixelData ? new Uint8ClampedArray(change.pixelData) : null,
    })),
    beforeLayerState: cloneLayerState(entry.beforeLayerState),
    afterLayerState: cloneLayerState(entry.afterLayerState),
  }));
}

function cloneFrames(frames: Frame[]): Frame[] {
  return frames.map((frame, index) => ({
    id: frame.id,
    index,
    duration: frame.duration,
    layerData: Object.fromEntries(
      Object.entries(frame.layerData).map(([layerId, data]) => [layerId, new Uint8ClampedArray(data)])
    ),
  }));
}

function getSignatureFromData(data: {
  project: ProjectSettings;
  layers: Layer[];
  activeLayerId: string;
  frames: Frame[];
  fps: number;
}): string {
  const normalizedFrames = cloneFrames(data.frames);
  const file = serializeProject(
    { ...data.project },
    data.layers.map((layer) => ({ ...layer })),
    data.activeLayerId,
    normalizedFrames,
    data.fps
  );
  return JSON.stringify(file);
}

function captureCurrentDocumentData(): WorkspaceDocumentData {
  const project = useProjectStore.getState().project;
  const { layers, activeLayerId } = useLayerStore.getState();
  const { frames, activeFrameIndex, fps } = useTimelineStore.getState();
  const { undoStack, redoStack } = useHistoryStore.getState();
  const persistence = usePersistenceStore.getState();
  const normalizedFrames = cloneFrames(frames);
  const baselineSignature = persistence.baselineSignature || getSignatureFromData({
    project,
    layers,
    activeLayerId,
    frames: normalizedFrames,
    fps,
  });

  return {
    project: { ...project },
    layers: layers.map((layer) => ({ ...layer })),
    activeLayerId,
    frames: normalizedFrames,
    activeFrameIndex: Math.max(0, Math.min(activeFrameIndex, Math.max(0, normalizedFrames.length - 1))),
    fps,
    undoStack: cloneHistoryEntries(undoStack),
    redoStack: cloneHistoryEntries(redoStack),
    baselineSignature,
    isDirty: persistence.isDirty,
  };
}

function applyDocumentToStores(doc: WorkspaceDocumentData): void {
  const timeline = useTimelineStore.getState();

  useProjectStore.setState({ project: { ...doc.project } });
  useLayerStore.setState({
    layers: doc.layers.map((layer) => ({ ...layer })),
    activeLayerId: doc.activeLayerId,
  });
  useTimelineStore.setState({
    frames: cloneFrames(doc.frames),
    activeFrameIndex: Math.max(0, Math.min(doc.activeFrameIndex, Math.max(0, doc.frames.length - 1))),
    fps: doc.fps,
    isPlaying: false,
    loop: timeline.loop,
  });
  useHistoryStore.setState({
    undoStack: cloneHistoryEntries(doc.undoStack),
    redoStack: cloneHistoryEntries(doc.redoStack),
  });
  usePersistenceStore.setState({
    baselineSignature: doc.baselineSignature,
    isDirty: doc.isDirty,
  });

  useCanvasStore.getState().resetView();
  useAIStore.getState().reset();
}

function createDocumentDataFromInput(input: CreateWorkspaceDocumentInput): WorkspaceDocumentData {
  const frames = cloneFrames(input.frames);
  const activeFrameIndex = Math.max(0, Math.min(input.activeFrameIndex ?? 0, Math.max(0, frames.length - 1)));
  const project = { ...input.project };
  const layers = input.layers.map((layer) => ({ ...layer }));
  const baselineSignature = getSignatureFromData({
    project,
    layers,
    activeLayerId: input.activeLayerId,
    frames,
    fps: input.fps,
  });

  return {
    project,
    layers,
    activeLayerId: input.activeLayerId,
    frames,
    activeFrameIndex,
    fps: input.fps,
    undoStack: [],
    redoStack: [],
    baselineSignature,
    isDirty: false,
  };
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  initialized: false,
  documents: [],
  closedDocuments: [],
  activeDocumentId: null,

  initializeFromCurrentStores: () => {
    if (get().initialized) return;

    const restored = loadWorkspaceSession();
    if (restored && restored.documents.length > 0) {
      const documents = restored.documents.map((entry) => {
        const normalized = createDocumentDataFromInput({
          project: entry.project,
          layers: entry.layers,
          activeLayerId: entry.activeLayerId,
          frames: entry.frames,
          fps: entry.fps,
          activeFrameIndex: entry.activeFrameIndex,
        });

        return {
          id: entry.id,
          ...normalized,
          baselineSignature: entry.baselineSignature || normalized.baselineSignature,
          isDirty: entry.isDirty,
        };
      });

      const activeDocumentId = documents.some((doc) => doc.id === restored.activeDocumentId)
        ? restored.activeDocumentId
        : documents[0].id;
      const activeDocument = documents.find((doc) => doc.id === activeDocumentId) ?? documents[0];

      set({
        initialized: true,
        documents,
        activeDocumentId,
        closedDocuments: [],
      });
      applyDocumentToStores(activeDocument);
      return;
    }

    const initial = captureCurrentDocumentData();
    const id = nanoid();
    set({
      initialized: true,
      documents: [{ id, ...initial }],
      activeDocumentId: id,
    });
  },

  syncActiveDocumentFromStores: () => {
    const { activeDocumentId, documents } = get();
    if (!activeDocumentId || documents.length === 0) return;
    const snapshot = captureCurrentDocumentData();
    set({
      documents: documents.map((doc) =>
        doc.id === activeDocumentId
          ? { id: doc.id, ...snapshot }
          : doc
      ),
    });
  },

  switchToDocument: (id) => {
    const state = get();
    if (!state.initialized || state.activeDocumentId === id) return true;

    const target = state.documents.find((doc) => doc.id === id);
    if (!target) return false;

    const snapshot = state.activeDocumentId ? captureCurrentDocumentData() : null;
    const nextDocuments = state.documents.map((doc) => {
      if (doc.id !== state.activeDocumentId || !snapshot) return doc;
      return { id: doc.id, ...snapshot };
    });

    set({
      documents: nextDocuments,
      activeDocumentId: id,
    });

    applyDocumentToStores(target);
    return true;
  },

  closeDocument: (id) => {
    const state = get();
    if (!state.initialized || state.documents.length <= 1) return false;

    if (state.activeDocumentId !== id) {
      const closedDoc = state.documents.find((doc) => doc.id === id);
      if (!closedDoc) return false;

      set({
        documents: state.documents.filter((doc) => doc.id !== id),
        closedDocuments: pushClosedDocuments(state.closedDocuments, closedDoc),
      });
      return true;
    }

    const snapshot = captureCurrentDocumentData();
    const currentIndex = state.documents.findIndex((doc) => doc.id === id);
    if (currentIndex === -1) return false;

    const capturedDocuments = state.documents.map((doc) =>
      doc.id === id
        ? { id: doc.id, ...snapshot }
        : doc
    );
    const closingDocument = capturedDocuments[currentIndex];
    const nextDocuments = capturedDocuments.filter((doc) => doc.id !== id);
    const fallback = nextDocuments[Math.min(currentIndex, nextDocuments.length - 1)];
    if (!fallback) return false;

    set({
      documents: nextDocuments,
      activeDocumentId: fallback.id,
      closedDocuments: pushClosedDocuments(state.closedDocuments, closingDocument),
    });

    applyDocumentToStores(fallback);
    return true;
  },

  closeOtherDocuments: (keepId) => {
    const state = get();
    if (!state.initialized || state.documents.length <= 1) return false;
    if (!state.documents.some((doc) => doc.id === keepId)) return false;

    const snapshot = state.activeDocumentId ? captureCurrentDocumentData() : null;
    const currentDocuments = state.documents.map((doc) => {
      if (doc.id !== state.activeDocumentId || !snapshot) return doc;
      return { id: doc.id, ...snapshot };
    });
    const keepDocument = currentDocuments.find((doc) => doc.id === keepId);
    if (!keepDocument) return false;

    const closed = currentDocuments.filter((doc) => doc.id !== keepId);
    set({
      documents: [keepDocument],
      activeDocumentId: keepId,
      closedDocuments: pushClosedDocuments(state.closedDocuments, closed),
    });

    if (state.activeDocumentId !== keepId) {
      applyDocumentToStores(keepDocument);
    }
    return true;
  },

  reopenLastClosedDocument: (options) => {
    const state = get();
    if (!state.initialized || state.closedDocuments.length === 0) return null;

    const setActive = options?.setActive ?? true;
    const closed = state.closedDocuments[0];
    const reopened: WorkspaceDocument = {
      id: nanoid(),
      project: { ...closed.project },
      layers: closed.layers.map((layer) => ({ ...layer })),
      activeLayerId: closed.activeLayerId,
      frames: cloneFrames(closed.frames),
      activeFrameIndex: closed.activeFrameIndex,
      fps: closed.fps,
      undoStack: cloneHistoryEntries(closed.undoStack),
      redoStack: cloneHistoryEntries(closed.redoStack),
      baselineSignature: closed.baselineSignature,
      isDirty: closed.isDirty,
    };

    const snapshot = state.activeDocumentId ? captureCurrentDocumentData() : null;
    const nextDocuments = state.documents.map((doc) => {
      if (doc.id !== state.activeDocumentId || !snapshot) return doc;
      return { id: doc.id, ...snapshot };
    });
    nextDocuments.push(reopened);

    set({
      documents: nextDocuments,
      activeDocumentId: setActive ? reopened.id : state.activeDocumentId,
      closedDocuments: state.closedDocuments.slice(1),
    });

    if (setActive) {
      applyDocumentToStores(reopened);
    }

    return reopened.id;
  },

  duplicateDocument: (id, options) => {
    const state = get();
    if (!state.initialized) return null;

    const snapshot = state.activeDocumentId ? captureCurrentDocumentData() : null;
    const currentDocuments = state.documents.map((doc) => {
      if (doc.id !== state.activeDocumentId || !snapshot) return doc;
      return { id: doc.id, ...snapshot };
    });
    const source = currentDocuments.find((doc) => doc.id === id);
    if (!source) return null;

    const nextProjectName = appendCopySuffix(source.project.name);

    return get().createDocument({
      project: {
        ...source.project,
        id: nanoid(),
        name: nextProjectName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      layers: source.layers.map((layer) => ({ ...layer })),
      activeLayerId: source.activeLayerId,
      frames: cloneFrames(source.frames),
      fps: source.fps,
      activeFrameIndex: source.activeFrameIndex,
    }, { setActive: options?.setActive ?? true });
  },

  createDocument: (input, options) => {
    const setActive = options?.setActive ?? true;
    const state = get();
    const data = createDocumentDataFromInput(input);
    const id = nanoid();
    const created: WorkspaceDocument = { id, ...data };

    const snapshot = state.activeDocumentId ? captureCurrentDocumentData() : null;
    const nextDocuments = state.documents.map((doc) => {
      if (doc.id !== state.activeDocumentId || !snapshot) return doc;
      return { id: doc.id, ...snapshot };
    });
    nextDocuments.push(created);

    set({
      initialized: true,
      documents: nextDocuments,
      activeDocumentId: setActive ? id : state.activeDocumentId,
    });

    if (setActive) {
      applyDocumentToStores(created);
    }

    return id;
  },

  openProjectFileAsDocument: (file, options) => {
    const parsed = deserializeProject(file);
    return get().createDocument({
      project: parsed.project,
      layers: parsed.layers,
      activeLayerId: parsed.activeLayerId,
      frames: parsed.frames,
      fps: parsed.fps,
      activeFrameIndex: parsed.activeFrameIndex,
    }, options);
  },
}));
