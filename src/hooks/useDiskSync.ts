'use client';

import { useEffect } from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { usePersistenceStore } from '@/stores/usePersistenceStore';
import { useDiskSyncStore } from '@/stores/useDiskSyncStore';
import { applyProjectFile } from '@/lib/project/projectPersistence';
import {
  fetchSidecarProjectFile,
  getSidecarRevision,
  hasRemoteChange,
  listSidecarProjects,
} from '@/lib/diskSync/sidecarClient';

const POLL_INTERVAL_MS = 2000;

/**
 * Disk -> editor sync loop (V1: polling).
 *
 * Every tick, for the ACTIVE document only:
 * - Without disk identity: ask the sidecar whether it knows a .dogsprite file
 *   with this project's id. If it does and the disk revision is at or behind
 *   the revision the editor opened, baseline silently. If the disk is ahead,
 *   handle it as a remote change (below).
 * - With disk identity: compare the disk revision/hash with the last seen
 *   state. On change:
 *   - editor clean  -> reload from disk via applyProjectFile (never loses work)
 *   - editor dirty  -> raise the banner (useDiskSyncStore.pending) and let the
 *     user decide. Local edits are NEVER overwritten silently.
 *
 * A vanished project (404) drops the disk identity so discovery runs again.
 * Sidecar outages are silent: the status flips to 'unreachable' and the loop
 * keeps retrying; the editor works normally without a sidecar.
 */
export function useDiskSync(): void {
  useEffect(() => {
    let cancelled = false;
    let inFlight = false;

    const handleRemoteChange = async (
      documentId: string,
      projectId: string,
      remoteRevision: number,
      remoteHash: string,
    ): Promise<void> => {
      if (useWorkspaceStore.getState().activeDocumentId !== documentId) return;
      if (!usePersistenceStore.getState().isDirty) {
        try {
          const file = await fetchSidecarProjectFile(projectId);
          if (cancelled || useWorkspaceStore.getState().activeDocumentId !== documentId) return;
          applyProjectFile(file, 'disk-sync');
        } catch (error) {
          // Leave the last-seen state untouched: the next tick retries.
          console.error('Disk sync reload failed, will retry:', error);
          return;
        }
        useWorkspaceStore.getState().setActiveDiskSync({
          projectId,
          lastSeenRevision: remoteRevision,
          lastSeenHash: remoteHash,
        });
        return;
      }
      useDiskSyncStore.getState().setPending({ documentId, projectId, remoteRevision, remoteHash });
    };

    const tick = async (): Promise<void> => {
      if (cancelled || inFlight) return;
      const workspace = useWorkspaceStore.getState();
      const activeDoc = workspace.documents.find((doc) => doc.id === workspace.activeDocumentId);
      if (!activeDoc) return;
      const projectId = useProjectStore.getState().project.id;
      inFlight = true;
      try {
        if (!activeDoc.diskSync) {
          const projects = await listSidecarProjects();
          if (cancelled) return;
          useDiskSyncStore.getState().setSidecarStatus('reachable');
          const entry = projects.find((project) => project.id === projectId);
          if (!entry) return;
          const sourceRevision = activeDoc.sourceDocumentV2?.revision ?? -1;
          if (entry.revision <= sourceRevision) {
            useWorkspaceStore.getState().setActiveDiskSync({
              projectId,
              lastSeenRevision: entry.revision,
              lastSeenHash: entry.sha256,
            });
            return;
          }
          await handleRemoteChange(activeDoc.id, projectId, entry.revision, entry.sha256);
          return;
        }

        const remote = await getSidecarRevision(activeDoc.diskSync.projectId);
        if (cancelled) return;
        useDiskSyncStore.getState().setSidecarStatus('reachable');
        if (!remote) {
          useWorkspaceStore.getState().setActiveDiskSync(undefined);
          return;
        }
        if (!hasRemoteChange({ revision: activeDoc.diskSync.lastSeenRevision, sha256: activeDoc.diskSync.lastSeenHash }, remote)) return;
        await handleRemoteChange(activeDoc.id, activeDoc.diskSync.projectId, remote.revision, remote.sha256);
      } catch {
        if (!cancelled) useDiskSyncStore.getState().setSidecarStatus('unreachable');
      } finally {
        inFlight = false;
      }
    };

    void tick();
    const timer = window.setInterval(() => {
      void tick();
    }, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);
}
