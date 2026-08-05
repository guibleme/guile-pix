import type { ProjectSettings } from '@/types/project';
import type { Layer } from '@/types/layer';
import type { Frame } from '@/types/frame';
import { deserializeProject, serializeProject, type ProjectFile } from '@/lib/export/projectFile';
import { snapshotEditorDocumentV2 } from '@/lib/project/editorSpriteDocumentAdapter';
import type { SpriteDocumentV2 } from '@guile-pix/sprite-core';

const WORKSPACE_SESSION_KEY = 'dogsprite-workspace-session-v1';
const LEGACY_WORKSPACE_SESSION_KEY = 'spritedog-workspace-session-v1';
const MAX_WORKSPACE_DOCS = 8;

export interface WorkspaceSessionDocumentData {
  id: string;
  project: ProjectSettings;
  layers: Layer[];
  activeLayerId: string;
  frames: Frame[];
  fps: number;
  activeFrameIndex: number;
  baselineSignature: string;
  isDirty: boolean;
  sourceDocumentV2?: SpriteDocumentV2;
}

interface WorkspaceSessionRecord {
  id: string;
  file: ProjectFile | SpriteDocumentV2;
  activeFrameIndex: number;
  baselineSignature: string;
  isDirty: boolean;
}

interface WorkspaceSessionPayload {
  version: 1;
  activeDocumentId: string;
  savedAt: number;
  documents: WorkspaceSessionRecord[];
}

function readRawPayload(): string | null {
  const primary = localStorage.getItem(WORKSPACE_SESSION_KEY);
  if (primary) return primary;

  const legacy = localStorage.getItem(LEGACY_WORKSPACE_SESSION_KEY);
  if (!legacy) return null;
  localStorage.setItem(WORKSPACE_SESSION_KEY, legacy);
  localStorage.removeItem(LEGACY_WORKSPACE_SESSION_KEY);
  return legacy;
}

export function clearWorkspaceSession(): void {
  localStorage.removeItem(WORKSPACE_SESSION_KEY);
  localStorage.removeItem(LEGACY_WORKSPACE_SESSION_KEY);
}

export function saveWorkspaceSession(
  documents: WorkspaceSessionDocumentData[],
  activeDocumentId: string | null
): void {
  if (!activeDocumentId) {
    clearWorkspaceSession();
    return;
  }

  const trimmed = documents.slice(-MAX_WORKSPACE_DOCS);
  const records: WorkspaceSessionRecord[] = trimmed.map((doc) => {
    const canonical = snapshotEditorDocumentV2({ project: doc.project, layers: doc.layers, activeLayerId: doc.activeLayerId, frames: doc.frames, activeFrameIndex: doc.activeFrameIndex, fps: doc.fps, loop: doc.sourceDocumentV2?.clip.loop !== 'once', sourceDocument: doc.sourceDocumentV2 });
    return {
      id: doc.id,
      file: canonical.ok ? canonical.value : serializeProject(doc.project, doc.layers, doc.activeLayerId, doc.frames, doc.fps),
      activeFrameIndex: doc.activeFrameIndex,
      baselineSignature: doc.baselineSignature,
      isDirty: doc.isDirty,
    };
  });

  const activeId = records.some((record) => record.id === activeDocumentId)
    ? activeDocumentId
    : records[records.length - 1]?.id;

  if (!activeId) {
    clearWorkspaceSession();
    return;
  }

  const payload: WorkspaceSessionPayload = {
    version: 1,
    activeDocumentId: activeId,
    savedAt: Date.now(),
    documents: records,
  };

  try {
    localStorage.setItem(WORKSPACE_SESSION_KEY, JSON.stringify(payload));
    localStorage.removeItem(LEGACY_WORKSPACE_SESSION_KEY);
  } catch {
    // Ignore quota/storage errors.
  }
}

export function loadWorkspaceSession(): {
  activeDocumentId: string;
  documents: WorkspaceSessionDocumentData[];
} | null {
  try {
    const raw = readRawPayload();
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    const payload = parsed as Partial<WorkspaceSessionPayload>;
    if (!Array.isArray(payload.documents) || typeof payload.activeDocumentId !== 'string') {
      return null;
    }

    const documents: WorkspaceSessionDocumentData[] = [];
    for (const recordRaw of payload.documents) {
      if (!recordRaw || typeof recordRaw !== 'object') continue;
      const record = recordRaw as Partial<WorkspaceSessionRecord>;
      if (typeof record.id !== 'string') continue;
      if (!record.file) continue;

      try {
        const parsed = deserializeProject(record.file);
        documents.push({
          id: record.id,
          project: parsed.project,
          layers: parsed.layers,
          activeLayerId: parsed.activeLayerId,
          frames: parsed.frames,
          fps: parsed.fps,
          activeFrameIndex: typeof record.activeFrameIndex === 'number' ? record.activeFrameIndex : 0,
          baselineSignature: typeof record.baselineSignature === 'string'
            ? record.baselineSignature
            : JSON.stringify(record.file),
          isDirty: Boolean(record.isDirty),
          sourceDocumentV2: parsed.sourceDocumentV2,
        });
      } catch {
        // Skip invalid records.
      }
    }

    if (documents.length === 0) return null;

    const activeDocumentId = documents.some((doc) => doc.id === payload.activeDocumentId)
      ? payload.activeDocumentId
      : documents[documents.length - 1].id;

    return {
      activeDocumentId,
      documents,
    };
  } catch {
    return null;
  }
}
