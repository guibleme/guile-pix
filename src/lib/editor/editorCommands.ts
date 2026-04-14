import { useCanvasStore } from '@/stores/useCanvasStore';
import { useHistoryStore } from '@/stores/useHistoryStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useUIStore } from '@/stores/useUIStore';
import { loadProjectFromFile, importImageFile, isImageFile } from '@/lib/export/projectFile';
import { saveCurrentProjectToDisk } from '@/lib/project/projectPersistence';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { usePlayerStatsStore } from '@/stores/usePlayerStatsStore';

export type EditorCommandId =
  | 'file.newProject'
  | 'file.saveProject'
  | 'file.loadProject'
  | 'file.importImage'
  | 'file.openSession'
  | 'file.openExport'
  | 'help.shortcuts'
  | 'help.about'
  | 'edit.undo'
  | 'edit.redo'
  | 'view.toggleGrid'
  | 'view.toggleTileGrid'
  | 'view.tileGrid8'
  | 'view.tileGrid16'
  | 'view.tileGrid32'
  | 'view.tileGrid64'
  | 'view.toggleGhostFrames'
  | 'view.zoomIn'
  | 'view.zoomOut'
  | 'view.resetZoom'
  | 'canvas.resize'
  | 'view.toggleSpriteLibrary';

interface EditorCommand {
  isEnabled?: () => boolean;
  execute: () => void | Promise<void>;
}

export interface EditorCommandResult {
  ok: boolean;
  error?: string;
}

const editorCommands: Record<EditorCommandId, EditorCommand> = {
  'file.newProject': {
    execute: () => {
      useUIStore.getState().setNewProjectDialog(true);
    },
  },
  'file.saveProject': {
    execute: () => {
      saveCurrentProjectToDisk();
      usePlayerStatsStore.getState().addExp(5);
    },
  },
  'file.loadProject': {
    execute: async () => {
      const file = await loadProjectFromFile();
      useWorkspaceStore.getState().openProjectFileAsDocument(file, { setActive: true });
    },
  },
  'file.importImage': {
    execute: async () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.png';
      
      const file = await new Promise<File | null>((resolve) => {
        input.onchange = () => {
          resolve(input.files?.[0] ?? null);
        };
        input.click();
      });
      
      if (!file) return;
      
      // Read image and show import dialog
      const imageData = await new Promise<ImageData>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Failed to get canvas context'));
              return;
            }
            ctx.drawImage(img, 0, 0);
            resolve(ctx.getImageData(0, 0, img.width, img.height));
          };
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = e.target?.result as string;
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
      
      useUIStore.getState().setImportImageDialog(true, imageData, file.name);
    },
  },
  'file.openSession': {
    execute: () => {
      useUIStore.getState().setSessionDialog(true);
    },
  },
  'file.openExport': {
    execute: () => {
      useUIStore.getState().setExportDialog(true);
      usePlayerStatsStore.getState().addExp(3);
    },
  },
  'help.shortcuts': {
    execute: () => {
      useUIStore.getState().setShortcutHelpDialog(true);
    },
  },
  'help.about': {
    execute: () => {
      useUIStore.getState().setAboutDialog(true);
    },
  },
  'edit.undo': {
    isEnabled: () => useHistoryStore.getState().canUndo(),
    execute: () => {
      const entry = useHistoryStore.getState().undo();
      if (!entry) return;
      if (entry.beforeLayerState) {
        useLayerStore.setState({
          layers: entry.beforeLayerState.layers.map((layer) => ({ ...layer })),
          activeLayerId: entry.beforeLayerState.activeLayerId,
        });
      }
      const undoChanges = [...entry.changes].reverse().map((change) => ({
        frameId: change.frameId,
        layerId: change.layerId,
        data: change.previousPixelData,
      }));
      useTimelineStore.getState().applyFrameLayerChanges(undoChanges);
    },
  },
  'edit.redo': {
    isEnabled: () => useHistoryStore.getState().canRedo(),
    execute: () => {
      const entry = useHistoryStore.getState().redo();
      if (!entry) return;
      if (entry.afterLayerState) {
        useLayerStore.setState({
          layers: entry.afterLayerState.layers.map((layer) => ({ ...layer })),
          activeLayerId: entry.afterLayerState.activeLayerId,
        });
      }
      const redoChanges = entry.changes.map((change) => ({
        frameId: change.frameId,
        layerId: change.layerId,
        data: change.pixelData,
      }));
      useTimelineStore.getState().applyFrameLayerChanges(redoChanges);
    },
  },
  'view.toggleGrid': {
    execute: () => {
      useCanvasStore.getState().toggleGrid();
    },
  },
  'view.toggleTileGrid': {
    execute: () => {
      useCanvasStore.getState().toggleTileGrid();
    },
  },
  'view.tileGrid8': {
    execute: () => {
      const s = useCanvasStore.getState();
      s.setTileGridSize(8, 8);
      if (!s.showTileGrid) s.toggleTileGrid();
    },
  },
  'view.tileGrid16': {
    execute: () => {
      const s = useCanvasStore.getState();
      s.setTileGridSize(16, 16);
      if (!s.showTileGrid) s.toggleTileGrid();
    },
  },
  'view.tileGrid32': {
    execute: () => {
      const s = useCanvasStore.getState();
      s.setTileGridSize(32, 32);
      if (!s.showTileGrid) s.toggleTileGrid();
    },
  },
  'view.tileGrid64': {
    execute: () => {
      const s = useCanvasStore.getState();
      s.setTileGridSize(64, 64);
      if (!s.showTileGrid) s.toggleTileGrid();
    },
  },
  'view.toggleGhostFrames': {
    execute: () => {
      useCanvasStore.getState().toggleOnionSkin();
    },
  },
  'view.zoomIn': {
    execute: () => {
      useCanvasStore.getState().zoomIn();
    },
  },
  'view.zoomOut': {
    execute: () => {
      useCanvasStore.getState().zoomOut();
    },
  },
  'view.resetZoom': {
    execute: () => {
      useCanvasStore.getState().resetView();
    },
  },
  'canvas.resize': {
    execute: () => {
      useUIStore.getState().setResizeCanvasDialog(true);
    },
  },
  'view.toggleSpriteLibrary': {
    execute: () => {
      useUIStore.getState().togglePanel('spriteLibrary');
    },
  },
};

export function isEditorCommandEnabled(commandId: EditorCommandId): boolean {
  const command = editorCommands[commandId];
  if (!command) return false;
  if (!command.isEnabled) return true;
  return command.isEnabled();
}

export async function runEditorCommand(commandId: EditorCommandId): Promise<EditorCommandResult> {
  const command = editorCommands[commandId];
  if (!command) {
    return { ok: false, error: `Unknown command: ${commandId}` };
  }

  if (!isEditorCommandEnabled(commandId)) {
    return { ok: false, error: `Command disabled: ${commandId}` };
  }

  try {
    await command.execute();
    return { ok: true };
  } catch (error) {
    if (error instanceof Error && error.message === 'No file selected') {
      return { ok: true };
    }

    return {
      ok: false,
      error: error instanceof Error ? error.message : `Command failed: ${commandId}`,
    };
  }
}
