'use client';

import { useEffect } from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { usePersistenceStore } from '@/stores/usePersistenceStore';
import { useDiskSyncStore } from '@/stores/useDiskSyncStore';
import { applyProjectFile } from '@/lib/project/projectPersistence';
import { deserializeProject } from '@/lib/export/projectFile';
import {
  fetchSidecarProjectFile,
  getSidecarRevision,
  hasRemoteChange,
  listSidecarProjects,
  sidecarEventsUrl,
} from '@/lib/diskSync/sidecarClient';

const POLL_INTERVAL_MS = 2000;
const SAFETY_POLL_MS = 10_000;

/**
 * Disk -> editor sync loop (V2: SSE push with polling as fallback).
 *
 * For the ACTIVE document only:
 * - Without disk identity: discovery via GET /projects (match by project id).
 *   Disk at or behind the opened revision -> baseline silently; disk ahead ->
 *   remote change (below).
 * - With disk identity: an EventSource streams `revision` events from the
 *   sidecar. Polling stays as the fallback: every 2 s while SSE is not
 *   connected, and every 10 s as a safety net while it is (fs.watch is
 *   best-effort, and the net catches anything the stream misses).
 * - On a remote change (revision or content hash moved):
 *   - editor clean  -> reload from disk via applyProjectFile (never loses work)
 *   - editor dirty  -> raise the banner (useDiskSyncStore.pending) and let the
 *     user decide. Local edits are NEVER overwritten silently.
 *
 * A vanished project (404) drops the disk identity so discovery runs again.
 * Sidecar outages are silent: the loop keeps retrying and the editor works
 * normally without a sidecar.
 */
export function useDiskSync(): void {
  useEffect(() => {
    let cancelled = false;
    let inFlight = false;
    let reloadInFlight = false;
    let eventSource: EventSource | null = null;
    let eventSourceKey: string | null = null;
    let sseConnected = false;
    let lastPollCheckAt = 0;

    const closeEventSource = (): void => {
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
      eventSourceKey = null;
      sseConnected = false;
    };

    const handleRemoteChange = async (
      documentId: string,
      projectId: string,
      remoteRevision: number,
      remoteHash: string,
    ): Promise<void> => {
      if (useWorkspaceStore.getState().activeDocumentId !== documentId) return;
      if (!usePersistenceStore.getState().isDirty) {
        if (reloadInFlight) return;
        reloadInFlight = true;
        try {
          const file = await fetchSidecarProjectFile(projectId);
          if (cancelled || useWorkspaceStore.getState().activeDocumentId !== documentId) return;
          applyProjectFile(file, 'disk-sync');
        } catch (error) {
          // Leave the last-seen state untouched: the next tick retries.
          console.error('Disk sync reload failed, will retry:', error);
          return;
        } finally {
          reloadInFlight = false;
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

    const ensureEventSource = (documentId: string, projectId: string): void => {
      const key = `${documentId}:${projectId}`;
      if (eventSource && eventSourceKey === key) return;
      closeEventSource();
      let source: EventSource;
      try {
        source = new EventSource(sidecarEventsUrl(projectId));
      } catch (error) {
        console.error('Disk sync could not open the event stream, polling instead:', error);
        return;
      }
      eventSource = source;
      eventSourceKey = key;
      source.onopen = () => {
        sseConnected = true;
        useDiskSyncStore.getState().setSidecarStatus('reachable');
      };
      source.onerror = () => {
        // EventSource reconnects on its own; polling covers the gap.
        sseConnected = false;
      };
      source.addEventListener('revision', (event) => {
        let payload: { projectId?: unknown; revision?: unknown; sha256?: unknown };
        try {
          payload = JSON.parse((event as MessageEvent).data) as typeof payload;
        } catch {
          return;
        }
        if (payload.projectId !== projectId || typeof payload.revision !== 'number' || typeof payload.sha256 !== 'string') return;
        const workspace = useWorkspaceStore.getState();
        const doc = workspace.documents.find((entry) => entry.id === documentId);
        if (!doc?.diskSync || workspace.activeDocumentId !== documentId) return;
        if (!hasRemoteChange(
          { revision: doc.diskSync.lastSeenRevision, sha256: doc.diskSync.lastSeenHash },
          { revision: payload.revision, sha256: payload.sha256 },
        )) return;
        void handleRemoteChange(documentId, projectId, payload.revision, payload.sha256);
      });
    };

    const tick = async (): Promise<void> => {
      if (cancelled || inFlight) return;
      const workspace = useWorkspaceStore.getState();
      const activeDoc = workspace.documents.find((doc) => doc.id === workspace.activeDocumentId);
      if (!activeDoc) {
        closeEventSource();
        return;
      }
      const projectId = useProjectStore.getState().project.id;
      inFlight = true;
      try {
        if (!activeDoc.diskSync) {
          closeEventSource();
          const projects = await listSidecarProjects();
          if (cancelled) return;
          useDiskSyncStore.getState().setSidecarStatus('reachable');
          const entry = projects.find((project) => project.id === projectId);
          if (!entry) return;
          const sourceRevision = activeDoc.sourceDocumentV2?.revision ?? -1;
          if (entry.revision <= sourceRevision) {
            // The disk may have changed between the file read and this first
            // tick (same revision — the editor preserves it on save — but
            // different bytes). Compare the loaded document against the disk
            // file so a change in that window is a remote change, not a
            // silent baseline. Comparing the LOADED doc (not live editor
            // state) means local edits made in the window don't false-trip.
            const loaded = activeDoc.sourceDocumentV2;
            if (loaded) {
              let diskDoc;
              try {
                const diskFile = await fetchSidecarProjectFile(projectId);
                if (cancelled) return;
                diskDoc = deserializeProject(diskFile).sourceDocumentV2;
              } catch {
                return; // don't baseline on a failed read; retry next tick
              }
              if (!diskDoc || JSON.stringify(diskDoc) !== JSON.stringify(loaded)) {
                await handleRemoteChange(activeDoc.id, projectId, entry.revision, entry.sha256);
                return;
              }
            }
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

        ensureEventSource(activeDoc.id, activeDoc.diskSync.projectId);
        // While SSE is connected, poll only as a slow safety net.
        if (sseConnected && Date.now() - lastPollCheckAt < SAFETY_POLL_MS) return;
        const remote = await getSidecarRevision(activeDoc.diskSync.projectId);
        if (cancelled) return;
        lastPollCheckAt = Date.now();
        useDiskSyncStore.getState().setSidecarStatus('reachable');
        if (!remote) {
          useWorkspaceStore.getState().setActiveDiskSync(undefined);
          return;
        }
        if (!hasRemoteChange(
          { revision: activeDoc.diskSync.lastSeenRevision, sha256: activeDoc.diskSync.lastSeenHash },
          remote,
        )) return;
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
      closeEventSource();
    };
  }, []);
}
