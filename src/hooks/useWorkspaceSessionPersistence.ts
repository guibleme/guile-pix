'use client';

import { useEffect } from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { saveWorkspaceSession } from '@/lib/project/workspaceSessionStorage';
import { useProjectStore } from '@/stores/useProjectStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useHistoryStore } from '@/stores/useHistoryStore';
import { usePersistenceStore } from '@/stores/usePersistenceStore';

function persistWorkspaceSession(): void {
  const workspace = useWorkspaceStore.getState();
  if (!workspace.initialized) return;

  workspace.syncActiveDocumentFromStores();
  const synced = useWorkspaceStore.getState();
  saveWorkspaceSession(synced.documents, synced.activeDocumentId);
}

export function useWorkspaceSessionPersistence() {
  useEffect(() => {
    useWorkspaceStore.getState().initializeFromCurrentStores();

    let persistTimer = 0;
    const schedulePersist = () => {
      window.clearTimeout(persistTimer);
      persistTimer = window.setTimeout(() => {
        persistWorkspaceSession();
      }, 900);
    };

    const unsubs = [
      useProjectStore.subscribe(schedulePersist),
      useLayerStore.subscribe(schedulePersist),
      useTimelineStore.subscribe(schedulePersist),
      useHistoryStore.subscribe(schedulePersist),
      usePersistenceStore.subscribe(schedulePersist),
    ];

    const handleBeforeUnload = () => {
      window.clearTimeout(persistTimer);
      persistWorkspaceSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    schedulePersist();

    return () => {
      window.clearTimeout(persistTimer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      unsubs.forEach((unsubscribe) => unsubscribe());
    };
  }, []);
}
