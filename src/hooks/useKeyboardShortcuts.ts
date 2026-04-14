'use client';

import { useEffect } from 'react';
import { useToolStore } from '@/stores/useToolStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { usePaletteStore } from '@/stores/usePaletteStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { useUIStore } from '@/stores/useUIStore';
import { runEditorCommand } from '@/lib/editor/editorCommands';
import type { SymmetryMode, ToolType } from '@/types/tool';
import { MAX_STROKE_STABILIZER, MIN_STROKE_STABILIZER } from '@/constants/tools';

function toggleHorizontalSymmetry(mode: SymmetryMode): SymmetryMode {
  switch (mode) {
    case 'none': return 'horizontal';
    case 'horizontal': return 'none';
    case 'vertical': return 'both';
    case 'both': return 'vertical';
  }
}

function toggleVerticalSymmetry(mode: SymmetryMode): SymmetryMode {
  switch (mode) {
    case 'none': return 'vertical';
    case 'vertical': return 'none';
    case 'horizontal': return 'both';
    case 'both': return 'horizontal';
  }
}

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      const key = e.key.toLowerCase();

      if (ctrl && key === 'z' && !shift) {
        e.preventDefault();
        void runEditorCommand('edit.undo');
        return;
      }
      if (ctrl && key === 'z' && shift) {
        e.preventDefault();
        void runEditorCommand('edit.redo');
        return;
      }
      if (ctrl && key === 's') {
        e.preventDefault();
        void runEditorCommand('file.saveProject');
        return;
      }
      if (ctrl && shift && key === 'o') {
        e.preventDefault();
        void runEditorCommand('file.loadProject').then((result) => {
          if (!result.ok && result.error && !result.error.startsWith('Command disabled')) {
            window.alert(result.error);
          }
        });
        return;
      }
      if (ctrl && shift && key === 't') {
        e.preventDefault();
        useWorkspaceStore.getState().reopenLastClosedDocument({ setActive: true });
        return;
      }
      if (ctrl && shift && key === 'l') {
        e.preventDefault();
        useUIStore.getState().togglePanel('spriteLibrary');
        return;
      }
      if (!ctrl && key === '?') {
        e.preventDefault();
        void runEditorCommand('help.shortcuts');
        return;
      }
      if (key === 'f1') {
        e.preventDefault();
        void runEditorCommand('help.shortcuts');
        return;
      }

      if (ctrl && (key === '=' || key === '+')) { e.preventDefault(); void runEditorCommand('view.zoomIn'); return; }
      if (ctrl && key === '-') { e.preventDefault(); void runEditorCommand('view.zoomOut'); return; }
      if (ctrl && shift && key === 'g') { e.preventDefault(); void runEditorCommand('view.toggleTileGrid'); return; }
      if (ctrl && key === 'g') { e.preventDefault(); void runEditorCommand('view.toggleGrid'); return; }
      if (ctrl && key === 'o') { e.preventDefault(); void runEditorCommand('view.toggleGhostFrames'); return; }

      if (key === 'x' && !ctrl) { usePaletteStore.getState().swapColors(); return; }

      if (!ctrl && !shift && !e.altKey && key === 'p') {
        useToolStore.getState().togglePixelPerfectMode();
        return;
      }

      if (!ctrl && !shift && !e.altKey && key === 't') {
        useToolStore.getState().toggleFreehandTracePolicy();
        return;
      }

      if (!ctrl && !shift && !e.altKey && key === 'h') {
        const store = useToolStore.getState();
        store.setSymmetryMode(toggleHorizontalSymmetry(store.symmetryMode));
        return;
      }

      if (!ctrl && !shift && !e.altKey && key === 'v') {
        const store = useToolStore.getState();
        store.setSymmetryMode(toggleVerticalSymmetry(store.symmetryMode));
        return;
      }

      if (!ctrl && e.altKey && key.startsWith('arrow')) {
        const { width, height } = useProjectStore.getState().project;
        const store = useToolStore.getState();
        const mode = store.symmetryMode;
        const usesAxisX = mode === 'horizontal' || mode === 'both';
        const usesAxisY = mode === 'vertical' || mode === 'both';
        const axisX = Math.max(0, Math.min(width, store.symmetryAxisX ?? Math.floor(width / 2)));
        const axisY = Math.max(0, Math.min(height, store.symmetryAxisY ?? Math.floor(height / 2)));

        if ((key === 'arrowleft' || key === 'arrowright') && usesAxisX) {
          e.preventDefault();
          const delta = key === 'arrowright' ? 1 : -1;
          const nextAxis = Math.max(0, Math.min(width, axisX + delta));
          if (nextAxis !== axisX) {
            store.setSymmetryAxisX(nextAxis);
          }
          return;
        }

        if ((key === 'arrowup' || key === 'arrowdown') && usesAxisY) {
          e.preventDefault();
          const delta = key === 'arrowdown' ? 1 : -1;
          const nextAxis = Math.max(0, Math.min(height, axisY + delta));
          if (nextAxis !== axisY) {
            store.setSymmetryAxisY(nextAxis);
          }
          return;
        }
      }

      if (!ctrl && !shift && !e.altKey && (e.code === 'BracketLeft' || e.code === 'BracketRight')) {
        const store = useToolStore.getState();
        const delta = e.code === 'BracketRight' ? 1 : -1;
        const nextValue = Math.max(
          MIN_STROKE_STABILIZER,
          Math.min(MAX_STROKE_STABILIZER, store.strokeStabilizer + delta)
        );
        if (nextValue !== store.strokeStabilizer) {
          store.setStrokeStabilizer(nextValue);
        }
        return;
      }

      if (!ctrl && !shift && !e.altKey) {
        const toolMap: Record<string, ToolType> = {
          m: 'select', b: 'brush', e: 'eraser', g: 'fill', i: 'colorPicker', l: 'line', r: 'rect',
        };
        if (toolMap[key]) {
          useToolStore.getState().setTool(toolMap[key]);
          return;
        }
      }

      if (key === ' ' && !ctrl) {
        e.preventDefault();
        const ts = useTimelineStore.getState();
        if (ts.isPlaying) { ts.pause(); } else { ts.play(); }
        return;
      }
      if (key === '.' && !ctrl) { useTimelineStore.getState().nextFrame(); return; }
      if (key === ',' && !ctrl) { useTimelineStore.getState().prevFrame(); return; }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
