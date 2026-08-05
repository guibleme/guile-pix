import { useCanvasStore } from '@/stores/useCanvasStore';
import { useHistoryStore } from '@/stores/useHistoryStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useAIStore } from '@/stores/useAIStore';
import { usePersistenceStore } from '@/stores/usePersistenceStore';
import {
  serializeProject,
  deserializeProject,
  loadProjectFromFile,
  saveSpriteDocumentV2ToFile,
  type ProjectFile,
} from '@/lib/export/projectFile';
import {
  addRecentProject,
  getRecoverySnapshotMeta,
  loadRecoverySnapshot,
  saveRecoverySnapshot,
  type RecoveryReason,
} from '@/lib/project/sessionStorage';
import { snapshotEditorDocumentV2 } from '@/lib/project/editorSpriteDocumentAdapter';
import type { SpriteDocumentV2 } from '@guile-pix/sprite-core';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

function getActiveSourceDocumentV2(): SpriteDocumentV2 | undefined {
  const workspace = useWorkspaceStore.getState();
  return workspace.documents.find((document) => document.id === workspace.activeDocumentId)?.sourceDocumentV2;
}

function getCurrentProjectSnapshot(): string {
  const { project } = useProjectStore.getState();
  const { layers, activeLayerId } = useLayerStore.getState();
  const { frames, fps } = useTimelineStore.getState();
  const { activeFrameIndex, loop } = useTimelineStore.getState();
  const snapshot = snapshotEditorDocumentV2({ project, layers, activeLayerId, frames, activeFrameIndex, fps, loop, sourceDocument: getActiveSourceDocumentV2() });
  return snapshot.ok ? JSON.stringify(snapshot.value) : JSON.stringify(serializeProject(project, layers, activeLayerId, frames, fps));
}

function getCurrentProjectData() {
  const { project } = useProjectStore.getState();
  const { layers, activeLayerId } = useLayerStore.getState();
  const { frames, fps } = useTimelineStore.getState();
  return { project, layers, activeLayerId, frames, fps };
}

export function markCurrentProjectAsSavedBaseline(): void {
  const signature = getCurrentProjectSnapshot();
  usePersistenceStore.getState().setBaselineSignature(signature);
}

export function refreshUnsavedChangesState(): void {
  const signature = getCurrentProjectSnapshot();
  const { baselineSignature, setBaselineSignature, setDirty } = usePersistenceStore.getState();

  if (!baselineSignature) {
    setBaselineSignature(signature);
    return;
  }

  setDirty(signature !== baselineSignature);
}

export function captureRecoverySnapshot(reason: RecoveryReason): string | null {
  const { project, layers, activeLayerId, frames, fps } = getCurrentProjectData();
  const { activeFrameIndex, loop } = useTimelineStore.getState();
  const canonical = snapshotEditorDocumentV2({ project, layers, activeLayerId, frames, activeFrameIndex, fps, loop, sourceDocument: getActiveSourceDocumentV2() });
  return saveRecoverySnapshot(project, layers, activeLayerId, frames, fps, reason, canonical.ok ? canonical.value : undefined);
}

export function rememberCurrentProject(snapshotId: string | null): void {
  if (!snapshotId) return;
  const { project } = useProjectStore.getState();
  const snapshotMeta = getRecoverySnapshotMeta(snapshotId);
  addRecentProject({
    projectId: project.id,
    name: project.name,
    width: project.width,
    height: project.height,
    updatedAt: Date.now(),
    snapshotId,
    thumbnailDataUrl: snapshotMeta?.thumbnailDataUrl,
  });
}

export function openRecoverySnapshot(snapshotId: string): boolean {
  const snapshot = loadRecoverySnapshot(snapshotId);
  if (!snapshot) return false;
  applyProjectFile(snapshot, 'session-open');
  return true;
}

export function saveCurrentProjectToDisk(): void {
  const { project, layers, activeLayerId, frames, fps } = getCurrentProjectData();
  const { activeFrameIndex, loop } = useTimelineStore.getState();
  const snapshot = snapshotEditorDocumentV2({ project, layers, activeLayerId, frames, activeFrameIndex, fps, loop, sourceDocument: getActiveSourceDocumentV2() });
  if (!snapshot.ok) throw new Error(snapshot.issues[0]?.message ?? 'Could not create canonical v2 project');
  saveSpriteDocumentV2ToFile(snapshot.value);
  useWorkspaceStore.getState().setActiveSourceDocumentV2(snapshot.value);
  markCurrentProjectAsSavedBaseline();
  const snapshotId = captureRecoverySnapshot('manual-save');
  rememberCurrentProject(snapshotId);
}

export function applyProjectFile(file: ProjectFile | unknown, reason: RecoveryReason = 'manual-load'): void {
  const { project, layers, activeLayerId, frames, fps, activeFrameIndex, loop, sourceDocumentV2 } = deserializeProject(file);
  if (sourceDocumentV2) useWorkspaceStore.getState().setActiveSourceDocumentV2(sourceDocumentV2);

  useProjectStore.setState({ project });
  useLayerStore.setState({ layers, activeLayerId });
  useTimelineStore.setState({
    frames: frames.map((frame, index) => ({ ...frame, index })),
    activeFrameIndex,
    fps,
    isPlaying: false,
    loop,
  });

  useHistoryStore.getState().clear();
  useCanvasStore.getState().resetView();
  useAIStore.getState().reset();
  markCurrentProjectAsSavedBaseline();
  const snapshotId = captureRecoverySnapshot(reason);
  rememberCurrentProject(snapshotId);
}

export async function loadProjectFromDisk(): Promise<void> {
  const file = await loadProjectFromFile();
  applyProjectFile(file, 'manual-load');
}
