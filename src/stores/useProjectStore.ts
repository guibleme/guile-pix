import { create } from 'zustand';
import type { ProjectSettings } from '@/types/project';
import { nanoid } from 'nanoid';
import { getDefaultProjectName } from '@/lib/i18nRuntime';

interface ProjectState {
  project: ProjectSettings;
  createProject: (name: string, width: number, height: number) => void;
  updateProject: (updates: Partial<ProjectSettings>) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: {
    id: nanoid(),
    name: getDefaultProjectName(),
    width: 32,
    height: 32,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  createProject: (name, width, height) =>
    set({
      project: {
        id: nanoid(),
        name,
        width,
        height,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    }),
  updateProject: (updates) =>
    set((state) => ({
      project: { ...state.project, ...updates, updatedAt: Date.now() },
    })),
}));
