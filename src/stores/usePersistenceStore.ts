import { create } from 'zustand';

interface PersistenceState {
  baselineSignature: string;
  isDirty: boolean;
  setBaselineSignature: (signature: string) => void;
  setDirty: (dirty: boolean) => void;
  reset: () => void;
}

export const usePersistenceStore = create<PersistenceState>((set) => ({
  baselineSignature: '',
  isDirty: false,
  setBaselineSignature: (signature) => set({ baselineSignature: signature, isDirty: false }),
  setDirty: (dirty) => set({ isDirty: dirty }),
  reset: () => set({ baselineSignature: '', isDirty: false }),
}));
