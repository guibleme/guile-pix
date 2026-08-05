import { nanoid } from 'nanoid';
import type { ProjectSettings } from '@/types/project';
import type { Layer } from '@/types/layer';
import type { Frame } from '@/types/frame';
import { normalizeProjectFile, serializeProject, type ProjectFile } from '@/lib/export/projectFile';
import type { SpriteDocumentV2 } from '@guile-pix/sprite-core';

export type RecoveryReason =
  | 'autosave'
  | 'manual-save'
  | 'manual-load'
  | 'new-project'
  | 'session-open';

export interface RecoverySnapshotMeta {
  id: string;
  projectId: string;
  name: string;
  width: number;
  height: number;
  createdAt: number;
  reason: RecoveryReason;
  thumbnailDataUrl?: string;
}

export interface RecentProjectEntry {
  projectId: string;
  name: string;
  width: number;
  height: number;
  updatedAt: number;
  snapshotId: string;
  thumbnailDataUrl?: string;
}

const RECOVERY_INDEX_KEY = 'dogsprite-recovery-index-v1';
const LEGACY_RECOVERY_INDEX_KEY = 'spritedog-recovery-index-v1';
const RECOVERY_KEY_PREFIX = 'dogsprite-recovery-v1:';
const LEGACY_RECOVERY_KEY_PREFIX = 'spritedog-recovery-v1:';
const RECENT_PROJECTS_KEY = 'dogsprite-recent-projects-v1';
const LEGACY_RECENT_PROJECTS_KEY = 'spritedog-recent-projects-v1';
const MAX_RECOVERY_SNAPSHOTS = 12;
const MAX_RECENT_PROJECTS = 10;
const THUMBNAIL_MAX_SIZE = 72;

function recoveryKey(id: string): string {
  return `${RECOVERY_KEY_PREFIX}${id}`;
}

function recoveryLegacyKey(id: string): string {
  return `${LEGACY_RECOVERY_KEY_PREFIX}${id}`;
}

function readFirstStorageValue(keys: string[]): string | null {
  for (const key of keys) {
    const value = localStorage.getItem(key);
    if (value) return value;
  }
  return null;
}

function writeStorageValue(primaryKey: string, legacyKeys: string[], value: string): void {
  localStorage.setItem(primaryKey, value);
  for (const key of legacyKeys) {
    localStorage.removeItem(key);
  }
}

function removeStorageKeys(keys: string[]): void {
  for (const key of keys) {
    localStorage.removeItem(key);
  }
}

function hasRecoverySnapshotData(snapshotId: string): boolean {
  return Boolean(localStorage.getItem(recoveryKey(snapshotId)) || localStorage.getItem(recoveryLegacyKey(snapshotId)));
}

function readRecoverySnapshotRaw(snapshotId: string): string | null {
  const primary = localStorage.getItem(recoveryKey(snapshotId));
  if (primary) return primary;

  const legacy = localStorage.getItem(recoveryLegacyKey(snapshotId));
  if (!legacy) return null;

  localStorage.setItem(recoveryKey(snapshotId), legacy);
  localStorage.removeItem(recoveryLegacyKey(snapshotId));
  return legacy;
}

function makeCanvas(width: number, height: number): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
}

function drawProjectToCanvas(
  width: number,
  height: number,
  layers: Array<{ id: string; visible: boolean; opacity: number }>,
  frameLayerData: Record<string, number[] | Uint8ClampedArray>
): HTMLCanvasElement | null {
  const mainCanvas = makeCanvas(width, height);
  const tempCanvas = makeCanvas(width, height);
  if (!mainCanvas || !tempCanvas) return null;

  const mainCtx = mainCanvas.getContext('2d');
  const tempCtx = tempCanvas.getContext('2d');
  if (!mainCtx || !tempCtx) return null;

  mainCtx.imageSmoothingEnabled = false;
  tempCtx.imageSmoothingEnabled = false;

  for (const layer of layers) {
    if (!layer.visible) continue;
    const raw = frameLayerData[layer.id];
    if (!raw) continue;

    const data = raw instanceof Uint8ClampedArray ? raw : new Uint8ClampedArray(raw);
    if (data.length !== width * height * 4) continue;
    const rgba = new Uint8ClampedArray(data.length);
    rgba.set(data);

    tempCtx.clearRect(0, 0, width, height);
    tempCtx.putImageData(new ImageData(rgba, width, height), 0, 0);
    mainCtx.globalAlpha = Math.max(0, Math.min(1, layer.opacity));
    mainCtx.drawImage(tempCanvas, 0, 0, width, height);
  }

  return mainCanvas;
}

function resizeToThumbnail(canvas: HTMLCanvasElement): string | null {
  const srcW = canvas.width;
  const srcH = canvas.height;
  if (srcW <= 0 || srcH <= 0) return null;

  const maxDim = Math.max(srcW, srcH);
  const scale = maxDim <= THUMBNAIL_MAX_SIZE
    ? Math.max(1, Math.floor(THUMBNAIL_MAX_SIZE / maxDim))
    : THUMBNAIL_MAX_SIZE / maxDim;
  const dstW = Math.max(1, Math.round(srcW * scale));
  const dstH = Math.max(1, Math.round(srcH * scale));

  const thumbCanvas = makeCanvas(dstW, dstH);
  if (!thumbCanvas) return null;
  const thumbCtx = thumbCanvas.getContext('2d');
  if (!thumbCtx) return null;
  thumbCtx.imageSmoothingEnabled = false;
  thumbCtx.drawImage(canvas, 0, 0, dstW, dstH);

  try {
    return thumbCanvas.toDataURL('image/png');
  } catch {
    return null;
  }
}

function generateThumbnailFromRuntimeData(
  project: ProjectSettings,
  layers: Layer[],
  frames: Frame[]
): string | null {
  const firstFrame = frames[0];
  if (!firstFrame) return null;
  const composed = drawProjectToCanvas(project.width, project.height, layers, firstFrame.layerData);
  if (!composed) return null;
  return resizeToThumbnail(composed);
}

function generateThumbnailFromProjectFile(file: ProjectFile): string | null {
  const firstFrame = file.frames[0];
  if (!firstFrame) return null;
  const composed = drawProjectToCanvas(
    file.project.width,
    file.project.height,
    file.layers,
    firstFrame.layerData
  );
  if (!composed) return null;
  return resizeToThumbnail(composed);
}

function readRecoveryIndex(): RecoverySnapshotMeta[] {
  try {
    const raw = readFirstStorageValue([RECOVERY_INDEX_KEY, LEGACY_RECOVERY_INDEX_KEY]);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry): entry is RecoverySnapshotMeta => {
      if (!entry || typeof entry !== 'object') return false;
      const e = entry as Record<string, unknown>;
      return (
        typeof e.id === 'string' &&
        typeof e.projectId === 'string' &&
        typeof e.name === 'string' &&
        typeof e.width === 'number' &&
        typeof e.height === 'number' &&
        typeof e.createdAt === 'number' &&
        typeof e.reason === 'string' &&
        (typeof e.thumbnailDataUrl === 'undefined' || typeof e.thumbnailDataUrl === 'string')
      );
    });
  } catch {
    return [];
  }
}

function writeRecoveryIndex(entries: RecoverySnapshotMeta[]): void {
  writeStorageValue(RECOVERY_INDEX_KEY, [LEGACY_RECOVERY_INDEX_KEY], JSON.stringify(entries));
}

function readRecentProjects(): RecentProjectEntry[] {
  try {
    const raw = readFirstStorageValue([RECENT_PROJECTS_KEY, LEGACY_RECENT_PROJECTS_KEY]);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry): entry is RecentProjectEntry => {
      if (!entry || typeof entry !== 'object') return false;
      const e = entry as Record<string, unknown>;
      return (
        typeof e.projectId === 'string' &&
        typeof e.name === 'string' &&
        typeof e.width === 'number' &&
        typeof e.height === 'number' &&
        typeof e.updatedAt === 'number' &&
        typeof e.snapshotId === 'string' &&
        (typeof e.thumbnailDataUrl === 'undefined' || typeof e.thumbnailDataUrl === 'string')
      );
    });
  } catch {
    return [];
  }
}

function writeRecentProjects(entries: RecentProjectEntry[]): void {
  writeStorageValue(RECENT_PROJECTS_KEY, [LEGACY_RECENT_PROJECTS_KEY], JSON.stringify(entries));
}

function trimRecoveryEntries(entries: RecoverySnapshotMeta[]): RecoverySnapshotMeta[] {
  const unique = entries.filter((entry, index, arr) => arr.findIndex((i) => i.id === entry.id) === index);
  const sorted = [...unique].sort((a, b) => b.createdAt - a.createdAt);
  return sorted.slice(0, MAX_RECOVERY_SNAPSHOTS);
}

export function saveRecoverySnapshot(
  project: ProjectSettings,
  layers: Layer[],
  activeLayerId: string,
  frames: Frame[],
  fps: number,
  reason: RecoveryReason,
  canonicalDocumentV2?: SpriteDocumentV2,
): string | null {
  const snapshotId = nanoid(10);
  const snapshot = canonicalDocumentV2 ?? serializeProject(project, layers, activeLayerId, frames, fps);
  const snapshotRaw = JSON.stringify(snapshot);
  const thumbnailDataUrl = generateThumbnailFromRuntimeData(project, layers, frames) ?? undefined;
  const meta: RecoverySnapshotMeta = {
    id: snapshotId,
    projectId: project.id,
    name: project.name,
    width: project.width,
    height: project.height,
    createdAt: Date.now(),
    reason,
    thumbnailDataUrl,
  };

  let nextEntries = trimRecoveryEntries([meta, ...readRecoveryIndex()]);

  for (;;) {
    try {
      localStorage.setItem(recoveryKey(snapshotId), snapshotRaw);
      localStorage.removeItem(recoveryLegacyKey(snapshotId));
      writeRecoveryIndex(nextEntries);
      return snapshotId;
    } catch {
      const oldest = nextEntries[nextEntries.length - 1];
      if (!oldest || oldest.id === snapshotId) {
        removeStorageKeys([recoveryKey(snapshotId), recoveryLegacyKey(snapshotId)]);
        return null;
      }
      nextEntries = nextEntries.slice(0, -1);
      removeStorageKeys([recoveryKey(oldest.id), recoveryLegacyKey(oldest.id)]);
    }
  }
}

export function listRecoverySnapshots(): RecoverySnapshotMeta[] {
  const rawEntries = readRecoveryIndex();
  const entries = rawEntries.filter((entry) => hasRecoverySnapshotData(entry.id));
  let changed = entries.length !== rawEntries.length;
  const hydrated = entries.map((entry) => {
    if (entry.thumbnailDataUrl) return entry;
    const snapshot = loadRecoverySnapshot(entry.id);
    if (!snapshot) return entry;
    const thumbnailDataUrl = generateThumbnailFromProjectFile(snapshot) ?? undefined;
    if (!thumbnailDataUrl) return entry;
    changed = true;
    return { ...entry, thumbnailDataUrl };
  });
  if (changed) {
    writeRecoveryIndex(hydrated);
  }
  return hydrated;
}

export function loadRecoverySnapshot(snapshotId: string): ProjectFile | null {
  try {
    const raw = readRecoverySnapshotRaw(snapshotId);
    if (!raw) return null;
    return normalizeProjectFile(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function deleteRecoverySnapshot(snapshotId: string): void {
  const entries = readRecoveryIndex().filter((entry) => entry.id !== snapshotId);
  writeRecoveryIndex(entries);
  removeStorageKeys([recoveryKey(snapshotId), recoveryLegacyKey(snapshotId)]);
}

export function clearRecoverySnapshots(): void {
  const entries = readRecoveryIndex();
  for (const entry of entries) {
    removeStorageKeys([recoveryKey(entry.id), recoveryLegacyKey(entry.id)]);
  }
  removeStorageKeys([RECOVERY_INDEX_KEY, LEGACY_RECOVERY_INDEX_KEY]);
}

export function addRecentProject(entry: RecentProjectEntry): void {
  const existing = readRecentProjects();
  const deduped = existing.filter((item) => item.projectId !== entry.projectId);
  const next = [entry, ...deduped].slice(0, MAX_RECENT_PROJECTS);
  writeRecentProjects(next);
}

export function listRecentProjects(): RecentProjectEntry[] {
  const entries = readRecentProjects();
  const snapshots = listRecoverySnapshots();
  const thumbBySnapshot = new Map(snapshots.map((snapshot) => [snapshot.id, snapshot.thumbnailDataUrl]));
  const existing = entries.filter((entry) => hasRecoverySnapshotData(entry.snapshotId));
  const hydrated = existing.map((entry) => {
    if (entry.thumbnailDataUrl) return entry;
    const thumbnailDataUrl = thumbBySnapshot.get(entry.snapshotId);
    if (!thumbnailDataUrl) return entry;
    return { ...entry, thumbnailDataUrl };
  });
  if (hydrated.length !== entries.length || hydrated.some((entry, i) => entry !== existing[i])) {
    writeRecentProjects(hydrated);
  }
  return hydrated;
}

export function getRecoverySnapshotMeta(snapshotId: string): RecoverySnapshotMeta | null {
  const snapshot = listRecoverySnapshots().find((entry) => entry.id === snapshotId);
  return snapshot ?? null;
}

export function removeRecentProject(projectId: string): void {
  const entries = readRecentProjects().filter((entry) => entry.projectId !== projectId);
  writeRecentProjects(entries);
}

export function clearRecentProjects(): void {
  removeStorageKeys([RECENT_PROJECTS_KEY, LEGACY_RECENT_PROJECTS_KEY]);
}
