'use client';

import { useEffect } from 'react';
import { autoSave, loadAutoSave } from '@/lib/export/projectFile';
import {
  applyProjectFile,
  captureRecoverySnapshot,
  markCurrentProjectAsSavedBaseline,
  refreshUnsavedChangesState,
} from '@/lib/project/projectPersistence';
import { useLayerStore } from '@/stores/useLayerStore';
import { usePersistenceStore } from '@/stores/usePersistenceStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useTimelineStore } from '@/stores/useTimelineStore';

function persistSnapshot(): void {
  const { project } = useProjectStore.getState();
  const { layers, activeLayerId } = useLayerStore.getState();
  const { frames, fps } = useTimelineStore.getState();
  autoSave(project, layers, activeLayerId, frames, fps);
}

export function useProjectAutoSave() {
  useEffect(() => {
    const saved = loadAutoSave();
    if (saved) {
      try {
        applyProjectFile(saved, 'session-open');
      } catch {
        // Ignore invalid autosave payloads.
      }
    } else {
      markCurrentProjectAsSavedBaseline();
    }

    let saveTimer = 0;
    let dirtyTimer = 0;
    let recoveryTimer = 0;
    let lastRecoveryAt = 0;
    const scheduleSave = () => {
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        persistSnapshot();
      }, 300);
    };
    const scheduleDirtyCheck = () => {
      window.clearTimeout(dirtyTimer);
      dirtyTimer = window.setTimeout(() => {
        refreshUnsavedChangesState();
      }, 120);
    };
    const scheduleRecoverySnapshot = () => {
      window.clearTimeout(recoveryTimer);
      recoveryTimer = window.setTimeout(() => {
        const now = Date.now();
        if (now - lastRecoveryAt < 15000) return;
        const snapshotId = captureRecoverySnapshot('autosave');
        if (snapshotId) {
          lastRecoveryAt = now;
        }
      }, 1200);
    };
    const handleStateChange = () => {
      scheduleSave();
      scheduleDirtyCheck();
      scheduleRecoverySnapshot();
    };

    const unsubs = [
      useProjectStore.subscribe(handleStateChange),
      useLayerStore.subscribe(handleStateChange),
      useTimelineStore.subscribe(handleStateChange),
    ];

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      window.clearTimeout(saveTimer);
      window.clearTimeout(dirtyTimer);
      window.clearTimeout(recoveryTimer);
      persistSnapshot();
      captureRecoverySnapshot('autosave');
      if (usePersistenceStore.getState().isDirty) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Ensure an initial snapshot exists for fresh sessions.
    handleStateChange();

    return () => {
      window.clearTimeout(saveTimer);
      window.clearTimeout(dirtyTimer);
      window.clearTimeout(recoveryTimer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      unsubs.forEach((unsubscribe) => unsubscribe());
    };
  }, []);
}
