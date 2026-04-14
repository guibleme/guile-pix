'use client';

import { useCallback, useRef } from 'react';
import { useToolStore } from '@/stores/useToolStore';
import { useCanvasStore } from '@/stores/useCanvasStore';
import { usePaletteStore } from '@/stores/usePaletteStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useHistoryStore } from '@/stores/useHistoryStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { toolRegistry } from '@/lib/tools/ToolRegistry';
import { CanvasEngine } from '@/lib/canvas/CanvasEngine';
import { PixelBuffer } from '@/lib/canvas/PixelBuffer';
import type { ToolContext } from '@/types/tool';

export function useCanvasInteraction(engine: CanvasEngine | null) {
  const isDrawingRef = useRef(false);
  const snapshotRef = useRef<Uint8ClampedArray | null>(null);

  const getToolContext = useCallback((): ToolContext | null => {
    const { width, height } = useProjectStore.getState().project;
    const { foreground } = usePaletteStore.getState();
    const {
      brushSize,
      brushShape,
      freehandAlgorithm,
      freehandTracePolicy,
      symmetryMode,
      symmetryAxisX,
      symmetryAxisY,
    } = useToolStore.getState();
    const { activeLayerId, layers } = useLayerStore.getState();
    const frame = useTimelineStore.getState().getActiveFrame();

    const activeLayer = layers.find(l => l.id === activeLayerId);
    if (!activeLayer || activeLayer.locked) return null;

    if (!frame.layerData[activeLayerId]) {
      useTimelineStore.getState().initFrameLayer(frame.id, activeLayerId, width, height);
    }

    const pixelData = useTimelineStore.getState().getActiveFrame().layerData[activeLayerId];
    if (!pixelData) return null;

    const buffer = new PixelBuffer(width, height, pixelData);

    const resolvedAxisX = Math.max(
      0,
      Math.min(width, symmetryAxisX ?? Math.floor(width / 2))
    );
    const resolvedAxisY = Math.max(
      0,
      Math.min(height, symmetryAxisY ?? Math.floor(height / 2))
    );

    return {
      width,
      height,
      color: foreground,
      brushSize,
      brushShape,
      freehandAlgorithm,
      freehandTracePolicy,
      symmetryMode,
      symmetryAxisX: resolvedAxisX,
      symmetryAxisY: resolvedAxisY,
      pressure: 1,
      pressureMode: 'off',
      pressureSizeMin: 1,
      pressureOpacityMin: 1,
      getPixel: (x, y) => buffer.getPixel(x, y),
      setPixel: (x, y, color) => {
        buffer.setPixel(x, y, color);
        const i = (y * width + x) * 4;
        if (i >= 0 && i + 3 < pixelData.length) {
          pixelData[i] = color.r;
          pixelData[i + 1] = color.g;
          pixelData[i + 2] = color.b;
          pixelData[i + 3] = color.a;
        }
      },
      getPixelBuffer: () => pixelData,
    };
  }, []);

  const handlePointerDown = useCallback((screenX: number, screenY: number) => {
    if (!engine) return;
    const { activeTool } = useToolStore.getState();
    const tool = toolRegistry.getTool(activeTool);
    const pixel = engine.screenToPixel(screenX, screenY);
    const ctx = getToolContext();
    if (!ctx) return;

    snapshotRef.current = new Uint8ClampedArray(ctx.getPixelBuffer());
    isDrawingRef.current = true;

    if (activeTool === 'colorPicker') {
      const cpTool = toolRegistry.getColorPickerTool();
      cpTool.onColorPick = (color) => {
        usePaletteStore.getState().setForeground(color);
      };
    }

    tool.onPointerDown(pixel.x, pixel.y, ctx);
  }, [engine, getToolContext]);

  const handlePointerMove = useCallback((screenX: number, screenY: number) => {
    if (!engine || !isDrawingRef.current) return;
    const { activeTool } = useToolStore.getState();
    const tool = toolRegistry.getTool(activeTool);
    const pixel = engine.screenToPixel(screenX, screenY);
    const ctx = getToolContext();
    if (!ctx) return;

    tool.onPointerMove(pixel.x, pixel.y, ctx);
  }, [engine, getToolContext]);

  const handlePointerUp = useCallback((screenX: number, screenY: number) => {
    if (!engine || !isDrawingRef.current) return;
    const { activeTool } = useToolStore.getState();
    const tool = toolRegistry.getTool(activeTool);
    const pixel = engine.screenToPixel(screenX, screenY);
    const ctx = getToolContext();
    if (!ctx) return;

    tool.onPointerUp(pixel.x, pixel.y, ctx);
    isDrawingRef.current = false;

    if (snapshotRef.current && activeTool !== 'colorPicker') {
      const frame = useTimelineStore.getState().getActiveFrame();
      const { activeLayerId } = useLayerStore.getState();
      const currentData = ctx.getPixelBuffer();
      useHistoryStore.getState().pushEntry(
        activeTool,
        frame.id,
        activeLayerId,
        snapshotRef.current,
        currentData
      );
      useTimelineStore.getState().setFrameLayerData(frame.id, activeLayerId, currentData);
    }
    snapshotRef.current = null;
  }, [engine, getToolContext]);

  return { handlePointerDown, handlePointerMove, handlePointerUp };
}
