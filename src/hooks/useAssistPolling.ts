'use client';

import { useEffect } from 'react';
import { useAIStore } from '@/stores/useAIStore';
import { useProjectStore } from '@/stores/useProjectStore';

const POLL_INTERVAL_MS = 2000;

/**
 * Assist-queue polling loop (same 2 s cadence as the disk-sync tick).
 *
 * - On mount and when the active project changes, re-attaches to any
 *   outstanding request for that project (and refreshes the history).
 * - While the active request is pending or claimed, polls its status.
 * - Terminal requests stay displayed until the user starts a new request.
 *
 * Sidecar outages are silent: the loop keeps retrying and the editor works
 * normally without a sidecar (same as the disk-sync loop).
 */
export function useAssistPolling(): void {
  useEffect(() => {
    let cancelled = false;
    let inFlight = false;

    const tick = async (): Promise<void> => {
      if (cancelled || inFlight) return;
      inFlight = true;
      try {
        const state = useAIStore.getState();
        const projectId = useProjectStore.getState().project.id;
        const active = state.activeRequest;
        if (!active || active.projectId !== projectId) {
          await state.reattachAssist(projectId);
        } else if (active.status === 'pending' || active.status === 'claimed') {
          await state.refreshActiveAssist();
        }
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
