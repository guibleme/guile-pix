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
  saveProjectToFile,
  type ProjectFile,
} from '@/lib/export/projectFile';
import {
  addRecentProject,
  getRecoverySnapshotMeta,
  loadRecoverySnapshot,
  saveRecoverySnapshot,
  type RecoveryReason,
} from '@/lib/project/sessionStorage';

function getCurrentProjectSnapshot(): string {
  const { project } = useProjectStore.getState();
  const { layers, activeLayerId } = useLayerStore.getState();
  const { frames, fps } = useTimelineStore.getState();
  const file = serializeProject(project, layers, activeLayerId, frames, fps);
  return JSON.stringify(file);
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
  return saveRecoverySnapshot(project, layers, activeLayerId, frames, fps, reason);
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

  saveProjectToFile(project, layers, activeLayerId, frames, fps);
  markCurrentProjectAsSavedBaseline();
  const snapshotId = captureRecoverySnapshot('manual-save');
  rememberCurrentProject(snapshotId);
}

export function applyProjectFile(file: ProjectFile | unknown, reason: RecoveryReason = 'manual-load'): void {
  const { project, layers, activeLayerId, frames, fps, activeFrameIndex, loop } = deserializeProject(file);

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
