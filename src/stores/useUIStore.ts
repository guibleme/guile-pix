import { create } from 'zustand';

export type UnsavedChangesDecision = 'save' | 'discard' | 'cancel';
export type ThemeMode = 'light' | 'dark';

interface UIState {
  showToolPanel: boolean;
  showPalettePanel: boolean;
  showLayersPanel: boolean;
  showTimelinePanel: boolean;
  showAIPanel: boolean;
  showSpriteLibraryPanel: boolean;
  showExportDialog: boolean;
  showNewProjectDialog: boolean;
  showSessionDialog: boolean;
  showShortcutHelpDialog: boolean;
  showUnsavedChangesDialog: boolean;
  showResizeCanvasDialog: boolean;
  showImportImageDialog: boolean;
  showRotation3DDialog: boolean;
  showAboutDialog: boolean;
  importImageData: ImageData | null;
  importImageSourceName: string;
  theme: ThemeMode;
  unsavedChangesActionLabel: string;
  unsavedChangesResolver: ((decision: UnsavedChangesDecision) => void) | null;
  showMenuBar: boolean;
  togglePanel: (panel: string) => void;
  setExportDialog: (show: boolean) => void;
  setNewProjectDialog: (show: boolean) => void;
  setSessionDialog: (show: boolean) => void;
  setShortcutHelpDialog: (show: boolean) => void;
  setResizeCanvasDialog: (show: boolean) => void;
  setImportImageDialog: (show: boolean, imageData?: ImageData, sourceName?: string) => void;
  setRotation3DDialog: (show: boolean) => void;
  setAboutDialog: (show: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  promptUnsavedChanges: (actionLabel: string) => Promise<UnsavedChangesDecision>;
  resolveUnsavedChanges: (decision: UnsavedChangesDecision) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  showToolPanel: true,
  showPalettePanel: true,
  showLayersPanel: true,
  showTimelinePanel: true,
  showAIPanel: true,
  showSpriteLibraryPanel: false,
  showExportDialog: false,
  showNewProjectDialog: false,
  showSessionDialog: false,
  showShortcutHelpDialog: false,
  showUnsavedChangesDialog: false,
  showResizeCanvasDialog: false,
  showImportImageDialog: false,
  showRotation3DDialog: false,
  showAboutDialog: false,
  importImageData: null,
  importImageSourceName: '',
  theme: 'dark',
  unsavedChangesActionLabel: '',
  unsavedChangesResolver: null,
  showMenuBar: true,

  togglePanel: (panel) =>
    set((s) => {
      const key = `show${panel.charAt(0).toUpperCase() + panel.slice(1)}Panel` as keyof UIState;
      if (typeof s[key] === 'boolean') {
        return { [key]: !s[key] } as Partial<UIState>;
      }
      return {};
    }),

  setExportDialog: (show) => set({ showExportDialog: show }),
  setNewProjectDialog: (show) => set({ showNewProjectDialog: show }),
  setSessionDialog: (show) => set({ showSessionDialog: show }),
  setShortcutHelpDialog: (show) => set({ showShortcutHelpDialog: show }),
  setResizeCanvasDialog: (show: boolean) => set({ showResizeCanvasDialog: show }),
  setImportImageDialog: (show: boolean, imageData?: ImageData, sourceName?: string) => set({
    showImportImageDialog: show,
    importImageData: imageData || null,
    importImageSourceName: sourceName || '',
  }),
  setRotation3DDialog: (show: boolean) => set({ showRotation3DDialog: show }),
  setAboutDialog: (show: boolean) => set({ showAboutDialog: show }),
  setTheme: (theme: ThemeMode) => set({ theme }),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
  promptUnsavedChanges: (actionLabel) =>
    new Promise<UnsavedChangesDecision>((resolve) => {
      const previousResolver = get().unsavedChangesResolver;
      if (previousResolver) {
        previousResolver('cancel');
      }
      set({
        showUnsavedChangesDialog: true,
        unsavedChangesActionLabel: actionLabel,
        unsavedChangesResolver: resolve,
      });
    }),
  resolveUnsavedChanges: (decision) => {
    const resolver = get().unsavedChangesResolver;
    if (resolver) {
      resolver(decision);
    }
    set({
      showUnsavedChangesDialog: false,
      unsavedChangesActionLabel: '',
      unsavedChangesResolver: null,
    });
  },
}));
