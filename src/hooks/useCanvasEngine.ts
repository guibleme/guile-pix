'use client';

import { useRef, useCallback } from 'react';
import { CanvasEngine } from '@/lib/canvas/CanvasEngine';
import { PixelBuffer } from '@/lib/canvas/PixelBuffer';
import { useProjectStore } from '@/stores/useProjectStore';
import { useCanvasStore } from '@/stores/useCanvasStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useTimelineStore } from '@/stores/useTimelineStore';

export function useCanvasEngine() {
  const engineRef = useRef<CanvasEngine | null>(null);

  const initEngine = useCallback((
    displayCanvas: HTMLCanvasElement,
    gridCanvas: HTMLCanvasElement,
    onionCanvas: HTMLCanvasElement
  ) => {
    const { width, height } = useProjectStore.getState().project;
    const engine = new CanvasEngine(width, height);
    engine.setDisplayCanvas(displayCanvas);
    engine.setGridCanvas(gridCanvas);
    engine.setOnionCanvas(onionCanvas);
    engineRef.current = engine;
    return engine;
  }, []);

  const render = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const { zoom, showGrid, showOnionSkin, panX, panY } = useCanvasStore.getState();
    const { layers } = useLayerStore.getState();
    const { width, height } = useProjectStore.getState().project;
    const frame = useTimelineStore.getState().getActiveFrame();
    const { frames, activeFrameIndex } = useTimelineStore.getState();

    engine.setZoom(zoom);
    engine.setPan(panX, panY);

    const layerBuffers = new Map<string, PixelBuffer>();
    for (const layer of layers) {
      const data = frame.layerData[layer.id];
      if (data) {
        layerBuffers.set(layer.id, new PixelBuffer(width, height, data));
      } else {
        layerBuffers.set(layer.id, new PixelBuffer(width, height));
      }
    }

    engine.render(layers, layerBuffers, showGrid);

    if (showOnionSkin) {
      const prevFrame = activeFrameIndex > 0 ? frames[activeFrameIndex - 1] : null;
      const nextFrameData = activeFrameIndex < frames.length - 1 ? frames[activeFrameIndex + 1] : null;

      let prevBuffer: PixelBuffer | null = null;
      let nextBuffer: PixelBuffer | null = null;

      if (prevFrame) {
        prevBuffer = new PixelBuffer(width, height);
        for (const layer of layers) {
          if (!layer.visible) continue;
          const data = prevFrame.layerData[layer.id];
          if (data) {
            for (let i = 0; i < data.length; i += 4) {
              if (data[i + 3] > 0) {
                prevBuffer.data[i] = data[i];
                prevBuffer.data[i + 1] = data[i + 1];
                prevBuffer.data[i + 2] = data[i + 2];
                prevBuffer.data[i + 3] = data[i + 3];
              }
            }
          }
        }
      }

      if (nextFrameData) {
        nextBuffer = new PixelBuffer(width, height);
        for (const layer of layers) {
          if (!layer.visible) continue;
          const data = nextFrameData.layerData[layer.id];
          if (data) {
            for (let i = 0; i < data.length; i += 4) {
              if (data[i + 3] > 0) {
                nextBuffer.data[i] = data[i];
                nextBuffer.data[i + 1] = data[i + 1];
                nextBuffer.data[i + 2] = data[i + 2];
                nextBuffer.data[i + 3] = data[i + 3];
              }
            }
          }
        }
      }

      engine.renderOnionSkin(prevBuffer, nextBuffer);
    } else {
      engine.clearOnionSkin();
    }
  }, []);

  return { engineRef, initEngine, render };
}
