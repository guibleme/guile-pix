import { create } from 'zustand';
import type { AIGenerationStatus, AIGenerationRequest, AIGenerationResult } from '@/types/ai';

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
}

export const useAIStore = create<AIState>((set) => ({
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
  reset: () => set({ status: 'idle', progress: 0, request: null, result: null, error: null }),
}));
