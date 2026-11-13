import { create } from 'zustand';

export interface PendingRemoteChange {
  documentId: string;
  projectId: string;
  remoteRevision: number;
  remoteHash: string;
}

export type SidecarStatus = 'unknown' | 'reachable' | 'unreachable';

interface DiskSyncUiState {
  /** A remote change the user must decide on (editor has unsaved edits). */
  pending: PendingRemoteChange | null;
  sidecarStatus: SidecarStatus;
  setPending: (pending: PendingRemoteChange | null) => void;
  setSidecarStatus: (status: SidecarStatus) => void;
}

export const useDiskSyncStore = create<DiskSyncUiState>((set) => ({
  pending: null,
  sidecarStatus: 'unknown',
  setPending: (pending) => set({ pending }),
  setSidecarStatus: (sidecarStatus) => set({ sidecarStatus }),
}));
