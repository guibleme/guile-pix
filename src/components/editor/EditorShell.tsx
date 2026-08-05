'use client';

import React, { useEffect, useState } from 'react';
import { Group as PanelGroup, Panel as ResizablePanel, useDefaultLayout } from 'react-resizable-panels';
import MenuBar from './MenuBar';
import StatusBar from './StatusBar';
import ToolPanel from '@/components/tools/ToolPanel';
import PalettePanel from '@/components/palette/PalettePanel';
import LayersPanel from '@/components/layers/LayersPanel';
import TimelinePanel from '@/components/timeline/TimelinePanel';
import AIPanel from '@/components/ai/AIPanel';
import Rotation3DDialog from '@/components/ai/Rotation3DDialog';
import SpriteLibraryPanel from '@/components/library/SpriteLibraryPanel';
import CanvasViewport from '@/components/canvas/CanvasViewport';
import ExportDialog from '@/components/export/ExportDialog';
import NewProjectDialog from './NewProjectDialog';
import SessionManagerDialog from './SessionManagerDialog';
import UnsavedChangesDialog from './UnsavedChangesDialog';
import ShortcutHelpDialog from './ShortcutHelpDialog';
import AboutDialog from './AboutDialog';
import ResizeCanvasDialog from './ResizeCanvasDialog';
import ImportImageDialog from './ImportImageDialog';
import FloatingPreview from './FloatingPreview';
import DungeonPanel from '@/components/dungeon/DungeonPanel';
import QuickActionsBar from './QuickActionsBar';
import DocumentTabs from './DocumentTabs';
import ResizeHandle from '@/components/ui/ResizeHandle';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useAnimationPlayback } from '@/hooks/useAnimationPlayback';
import { useProjectAutoSave } from '@/hooks/useProjectAutoSave';
import { useWorkspaceSessionPersistence } from '@/hooks/useWorkspaceSessionPersistence';
import { installRuntimeErrorHandlers } from '@/lib/observability/runtimeErrors';
import { useUIStore } from '@/stores/useUIStore';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { nanoid } from 'nanoid';
import { DEFAULT_FPS, DEFAULT_FRAME_DURATION } from '@/constants/animation';
import useI18n from '@/hooks/useI18n';

// Wrapper component for ImportImageDialog to connect with store
function ImportImageDialogWrapper() {
  const { t } = useI18n();
  const { showImportImageDialog, importImageData, importImageSourceName, setImportImageDialog } = useUIStore();
  const { createDocument } = useWorkspaceStore();
  const { project } = useProjectStore();
  const { layers, activeLayerId } = useLayerStore();
  const { frames, activeFrameIndex, setFrameLayerData } = useTimelineStore();

  if (!showImportImageDialog || !importImageData) return null;

  const handleImport = (imageData: ImageData, importMode: 'new-project' | 'current-project') => {
    if (importMode === 'new-project') {
      // Create new project with the imported image
      const layerId = nanoid();
      const frameId = nanoid();
      const projectId = nanoid();
      
        createDocument({
          project: {
            id: projectId,
            name: t('import.importedProjectName', 'Imported Image'),
            width: imageData.width,
            height: imageData.height,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
          layers: [{
            id: layerId,
            name: t('newProject.layer1', 'Layer 1'),
            visible: true,
            locked: false,
            opacity: 1,
          blendMode: 'normal' as const,
        }],
        activeLayerId: layerId,
        frames: [{
          id: frameId,
          index: 0,
          duration: DEFAULT_FRAME_DURATION,
          layerData: {
            [layerId]: new Uint8ClampedArray(imageData.data),
          },
        }],
        fps: DEFAULT_FPS,
        activeFrameIndex: 0,
      }, { setActive: true });
    } else {
      // Import to current project
      const activeLayer = layers.find(l => l.id === activeLayerId);
      if (!activeLayer) return;

      const activeFrame = frames[activeFrameIndex];
      if (!activeFrame) return;

      // Center the image on the canvas
      const offsetX = Math.floor((project.width - imageData.width) / 2);
      const offsetY = Math.floor((project.height - imageData.height) / 2);

      // Get existing data or create new
      const existingData = activeFrame.layerData[activeLayerId];
      const canvas = document.createElement('canvas');
      canvas.width = project.width;
      canvas.height = project.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw existing content if any
      if (existingData) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = project.width;
        tempCanvas.height = project.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          const imageDataObj = new ImageData(
            new Uint8ClampedArray(existingData),
            project.width,
            project.height
          );
          tempCtx.putImageData(imageDataObj, 0, 0);
          ctx.drawImage(tempCanvas, 0, 0);
        }
      }

      // Draw imported image centered
      const importedImageData = new ImageData(
        new Uint8ClampedArray(imageData.data),
        imageData.width,
        imageData.height
      );
      ctx.putImageData(importedImageData, offsetX, offsetY);

      // Update frame data
      const newData = ctx.getImageData(0, 0, project.width, project.height);
      setFrameLayerData(activeFrame.id, activeLayerId, new Uint8ClampedArray(newData.data));
    }

    setImportImageDialog(false);
  };

  return (
    <ImportImageDialog
      imageData={importImageData}
      sourceName={importImageSourceName}
      onImport={handleImport}
      onCancel={() => setImportImageDialog(false)}
    />
  );
}

function AboutDialogWrapper() {
  const isOpen = useUIStore((s) => s.showAboutDialog);
  const setOpen = useUIStore((s) => s.setAboutDialog);
  return <AboutDialog open={isOpen} onClose={() => setOpen(false)} />;
}

function RightLayersLayout() {
  const rightV = useDefaultLayout({ id: 'dogsprite-right-v' });
  return (
    <PanelGroup orientation="vertical" className="h-full" defaultLayout={rightV.defaultLayout} onLayoutChanged={rightV.onLayoutChanged}>
      <ResizablePanel id="right-layers" className="h-full" defaultSize="60%" minSize="20%">
        <div className="h-full overflow-auto">
          <LayersPanel />
        </div>
      </ResizablePanel>
      <ResizeHandle direction="vertical" />
      <ResizablePanel id="right-ai" className="h-full" defaultSize="40%" minSize="15%" collapsible>
        <div className="h-full overflow-auto">
          <AIPanel />
        </div>
      </ResizablePanel>
    </PanelGroup>
  );
}

type RightTab = 'layers' | 'library';

function RightDock() {
  const [activeTab, setActiveTab] = useState<RightTab>(() =>
    useUIStore.getState().showSpriteLibraryPanel ? 'library' : 'layers'
  );

  useEffect(() => {
    return useUIStore.subscribe((state, previousState) => {
      if (state.showSpriteLibraryPanel && !previousState.showSpriteLibraryPanel) {
        setActiveTab('library');
      }
    });
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-border rounded-t-2xl overflow-hidden bg-surface/95 shrink-0" style={{ backgroundImage: 'var(--ui-panel-header-gradient)' }}>
        <button
          type="button"
          onClick={() => setActiveTab('layers')}
          className={`flex-1 px-3 py-1.5 text-[11px] font-medium transition-colors ${
            activeTab === 'layers'
              ? 'text-foreground border-b-2 border-accent'
              : 'text-muted hover:text-foreground'
          }`}
        >
          Layers
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('library')}
          className={`flex-1 px-3 py-1.5 text-[11px] font-medium transition-colors ${
            activeTab === 'library'
              ? 'text-foreground border-b-2 border-accent'
              : 'text-muted hover:text-foreground'
          }`}
        >
          Sprite Library
        </button>
      </div>

      {/* Tab content */}
      <div className="flex-1 min-h-0">
        {activeTab === 'layers' ? (
          <RightLayersLayout />
        ) : (
          <div className="h-full overflow-auto">
            <SpriteLibraryPanel />
          </div>
        )}
      </div>
    </div>
  );
}

function LeftDockLayout() {
  const leftV = useDefaultLayout({ id: 'dogsprite-left-v' });
  return (
    <PanelGroup orientation="vertical" className="h-full" defaultLayout={leftV.defaultLayout} onLayoutChanged={leftV.onLayoutChanged}>
      <ResizablePanel id="left-tools" className="h-full" defaultSize="35%" minSize="15%" collapsible>
        <div className="h-full overflow-auto">
          <ToolPanel />
        </div>
      </ResizablePanel>
      <ResizeHandle direction="vertical" />
      <ResizablePanel id="left-palette" className="h-full" defaultSize="65%" minSize="20%">
        <div className="h-full overflow-auto">
          <PalettePanel />
        </div>
      </ResizablePanel>
    </PanelGroup>
  );
}

function CenterLayout() {
  const centerV = useDefaultLayout({ id: 'dogsprite-center-v' });
  return (
    <PanelGroup orientation="vertical" className="h-full" defaultLayout={centerV.defaultLayout} onLayoutChanged={centerV.onLayoutChanged}>
      <ResizablePanel id="center-canvas" className="h-full" defaultSize="75%" minSize="20%">
        <div className="flex flex-col h-full min-w-0 overflow-hidden rounded-xl border border-border bg-surface/35">
          <CanvasViewport />
        </div>
      </ResizablePanel>
      <ResizeHandle direction="vertical" />
      <ResizablePanel id="center-timeline" className="h-full" defaultSize="25%" minSize="8%" collapsible>
        <div className="h-full overflow-hidden border-t border-border p-2 bg-surface/35 rounded-b-xl">
          <TimelinePanel />
        </div>
      </ResizablePanel>
    </PanelGroup>
  );
}

function EditorLayout() {
  const editorH = useDefaultLayout({ id: 'dogsprite-editor-h' });
  return (
    <div className="flex-1 min-h-0 overflow-hidden p-2">
      <PanelGroup orientation="horizontal" defaultLayout={editorH.defaultLayout} onLayoutChanged={editorH.onLayoutChanged} style={{ height: '100%' }}>
        {/* Left Dock */}
        <ResizablePanel id="left-dock" className="h-full" defaultSize="18%" minSize="8%" maxSize="35%" collapsible>
          <LeftDockLayout />
        </ResizablePanel>

        <ResizeHandle direction="horizontal" />

        {/* Center Workspace */}
        <ResizablePanel id="center" className="h-full" defaultSize="52%" minSize="25%">
          <CenterLayout />
        </ResizablePanel>

        <ResizeHandle direction="horizontal" />

        {/* Right Dock */}
        <ResizablePanel id="right-dock" className="h-full" defaultSize="30%" minSize="10%" maxSize="40%" collapsible>
          <RightDock />
        </ResizablePanel>
      </PanelGroup>
    </div>
  );
}

const THEME_KEY = 'dogsprite-theme-mode';
const LEGACY_THEME_KEY = 'spritedog-theme-mode';

export default function EditorShell() {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);
  useKeyboardShortcuts();
  useAnimationPlayback();
  useProjectAutoSave();
  useWorkspaceSessionPersistence();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(THEME_KEY) ?? window.localStorage.getItem(LEGACY_THEME_KEY);
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      return;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, [setTheme]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  useEffect(() => {
    return installRuntimeErrorHandlers();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-foreground">
      <MenuBar />
      <QuickActionsBar />
      <DocumentTabs />

      <EditorLayout />

      <StatusBar />

      {/* Dialogs */}
      <ExportDialog />
      <NewProjectDialog />
      <SessionManagerDialog />
      <UnsavedChangesDialog />
      <ShortcutHelpDialog />
      <AboutDialogWrapper />
      <ResizeCanvasDialog />
      <ImportImageDialogWrapper />
      <Rotation3DDialog />

      {/* Floating Preview */}
      <FloatingPreview />
      <DungeonPanel />
    </div>
  );
}
