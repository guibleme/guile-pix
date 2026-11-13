import { create } from 'zustand';
import type {
  AIGenerationRequest,
  AIGenerationResult,
  AIGenerationStatus,
  AssistPickMode,
  AssistRequest,
  AssistRequestCreateInput,
  AssistStatus,
  AssistTarget,
} from '@/types/ai';
import {
  getAssistRequest,
  listAssistRequests,
  patchAssistRequest,
  submitAssistRequest,
} from '@/lib/diskSync/assistClient';
import { SidecarHttpError } from '@/lib/diskSync/sidecarClient';

/** Shown when the sidecar cannot be reached at all (down or not started). */
export const ASSIST_SIDECAR_DOWN_MESSAGE = 'Start the MCP server with GUILE_PIX_SIDECAR=1';

export const ASSIST_HISTORY_LIMIT = 5;

export const ASSIST_TERMINAL_STATUSES: AssistStatus[] = ['done', 'failed', 'cancelled'];

export function isAssistTerminal(status: AssistStatus): boolean {
  return ASSIST_TERMINAL_STATUSES.includes(status);
}

function assistErrorMessage(error: unknown): string {
  if (error instanceof SidecarHttpError) return error.message;
  if (error instanceof TypeError || (error instanceof Error && error.name === 'TimeoutError')) {
    return ASSIST_SIDECAR_DOWN_MESSAGE;
  }
  return error instanceof Error ? error.message : String(error);
}

interface AIState {
  status: AIGenerationStatus;
  progress: number;
  request: AIGenerationRequest | null;
  result: AIGenerationResult | null;
  error: string | null;
  startGeneration: (request: AIGenerationRequest) => void;
  setProgress: (progress: number) => void;
  setResult: (result: AIGenerationResult) => void;
  setError: (error: string) => void;
  acceptResult: () => void;
  rejectResult: () => void;
  reset: () => void;

  // Assist queue slice (see docs/assist-box.md). Kept separate from the
  // generation state machine: a queued request is not idle/generating/preview.
  pickMode: AssistPickMode | null;
  pickedTarget: AssistTarget | null;
  activeRequest: AssistRequest | null;
  assistHistory: AssistRequest[];
  assistError: string | null;
  assistSubmitting: boolean;
  armPick: (mode: AssistPickMode) => void;
  cancelPick: () => void;
  setPickedTarget: (target: AssistTarget) => void;
  clearPickedTarget: () => void;
  setAssistError: (error: string | null) => void;
  submitAssist: (input: AssistRequestCreateInput) => Promise<boolean>;
  refreshActiveAssist: () => Promise<void>;
  reattachAssist: (projectId: string) => Promise<void>;
  cancelActiveAssist: () => Promise<void>;
  selectAssistFromHistory: (id: string) => Promise<void>;
  resetAssist: () => void;
}

export const useAIStore = create<AIState>((set, get) => {
  const loadHistory = async (projectId: string): Promise<void> => {
    try {
      const requests = await listAssistRequests({ projectId });
      set({ assistHistory: requests.slice(0, ASSIST_HISTORY_LIMIT) });
    } catch {
      // Silent: polling retries; the disk-sync loop behaves the same.
    }
  };

  return {
    status: 'idle',
    progress: 0,
    request: null,
    result: null,
    error: null,

    startGeneration: (request) => set({ status: 'generating', progress: 0, request, result: null, error: null }),
    setProgress: (progress) => set({ progress }),
    setResult: (result) => set({ status: 'preview', result, progress: 100 }),
    setError: (error) => set({ status: 'error', error }),
    acceptResult: () => set({ status: 'idle', result: null, request: null, progress: 0 }),
    rejectResult: () => set({ status: 'idle', result: null, request: null, progress: 0 }),
    // reset() runs on document load/tab switch: drop the canvas-tied pick
    // state, but keep the queue state — the polling hook re-attaches it per
    // project, and the requests themselves live on the server.
    reset: () => set({
      status: 'idle', progress: 0, request: null, result: null, error: null,
      pickMode: null, pickedTarget: null,
    }),

    pickMode: null,
    pickedTarget: null,
    activeRequest: null,
    assistHistory: [],
    assistError: null,
    assistSubmitting: false,

    armPick: (mode) => set({ pickMode: mode, pickedTarget: null, assistError: null }),
    cancelPick: () => set({ pickMode: null }),
    setPickedTarget: (target) => set({ pickedTarget: target, pickMode: null }),
    clearPickedTarget: () => set({ pickedTarget: null }),
    setAssistError: (error) => set({ assistError: error }),

    submitAssist: async (input) => {
      set({ assistSubmitting: true, assistError: null });
      try {
        const { id } = await submitAssistRequest(input);
        const request = await getAssistRequest(id);
        set({
          activeRequest: request ?? {
            ...input,
            id,
            version: 1,
            createdAt: new Date().toISOString(),
            status: 'pending',
            claimedBy: null,
            note: null,
          },
          pickedTarget: null,
          pickMode: null,
          assistSubmitting: false,
        });
        await loadHistory(input.projectId);
        return true;
      } catch (error) {
        set({ assistSubmitting: false, assistError: assistErrorMessage(error) });
        return false;
      }
    },

    refreshActiveAssist: async () => {
      const active = get().activeRequest;
      if (!active || isAssistTerminal(active.status)) return;
      try {
        const fresh = await getAssistRequest(active.id);
        if (!fresh) {
          // Gone from disk: drop it and let the next tick re-attach.
          set({ activeRequest: null });
          return;
        }
        set({ activeRequest: fresh });
        if (isAssistTerminal(fresh.status)) await loadHistory(fresh.projectId);
      } catch {
        // Silent: polling retries.
      }
    },

    reattachAssist: async (projectId) => {
      try {
        const requests = await listAssistRequests({ projectId });
        const history = requests.slice(0, ASSIST_HISTORY_LIMIT);
        const active = get().activeRequest;
        if (!active || active.projectId !== projectId) {
          const outstanding = requests.find(
            (entry) => entry.status === 'pending' || entry.status === 'claimed',
          );
          set({ activeRequest: outstanding ?? null, assistHistory: history });
        } else {
          set({ assistHistory: history });
        }
      } catch {
        // Silent: polling retries.
      }
    },

    cancelActiveAssist: async () => {
      const active = get().activeRequest;
      if (!active || active.status !== 'pending') return;
      try {
        const updated = await patchAssistRequest(active.id, { status: 'cancelled' });
        set({ activeRequest: updated });
        await loadHistory(active.projectId);
      } catch (error) {
        set({ assistError: assistErrorMessage(error) });
      }
    },

    selectAssistFromHistory: async (id) => {
      try {
        const request = await getAssistRequest(id);
        if (request) set({ activeRequest: request, assistError: null });
      } catch (error) {
        set({ assistError: assistErrorMessage(error) });
      }
    },

    resetAssist: () => set({
      activeRequest: null, pickedTarget: null, pickMode: null,
      assistError: null, assistSubmitting: false,
    }),
  };
});
