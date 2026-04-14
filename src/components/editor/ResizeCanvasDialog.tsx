'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useLayerStore } from '@/stores/useLayerStore';
import Dialog from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import { clamp } from '@/lib/utils/math';
import useI18n from '@/hooks/useI18n';

const MIN_DIMENSION = 1;
const MAX_DIMENSION = 1024;

function parseDimensionInput(value: string): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return MIN_DIMENSION;
  return clamp(Math.round(parsed), MIN_DIMENSION, MAX_DIMENSION);
}

function resizePixelData(
  data: Uint8ClampedArray,
  oldWidth: number,
  oldHeight: number,
  newWidth: number,
  newHeight: number,
  anchor: 'center' | 'topleft'
): Uint8ClampedArray {
  const newData = new Uint8ClampedArray(newWidth * newHeight * 4);
  
  // Calculate offset based on anchor
  let offsetX = 0;
  let offsetY = 0;
  
  if (anchor === 'center') {
    offsetX = Math.floor((newWidth - oldWidth) / 2);
    offsetY = Math.floor((newHeight - oldHeight) / 2);
  }
  
  // Copy pixels
  for (let y = 0; y < oldHeight; y++) {
    for (let x = 0; x < oldWidth; x++) {
      const newX = x + offsetX;
      const newY = y + offsetY;
      
      // Only copy if within new bounds
      if (newX >= 0 && newX < newWidth && newY >= 0 && newY < newHeight) {
        const oldIdx = (y * oldWidth + x) * 4;
        const newIdx = (newY * newWidth + newX) * 4;
        
        newData[newIdx] = data[oldIdx];
        newData[newIdx + 1] = data[oldIdx + 1];
        newData[newIdx + 2] = data[oldIdx + 2];
        newData[newIdx + 3] = data[oldIdx + 3];
      }
    }
  }
  
  return newData;
}

export default function ResizeCanvasDialog() {
  const { t } = useI18n();
  const { showResizeCanvasDialog, setResizeCanvasDialog } = useUIStore();
  const { project, updateProject } = useProjectStore();
  const { frames, setFrameLayerData } = useTimelineStore();
  const { layers } = useLayerStore();
  
  const [width, setWidth] = useState(project.width);
  const [height, setHeight] = useState(project.height);
  const [anchor, setAnchor] = useState<'center' | 'topleft'>('center');

  const normalizedWidth = clamp(Math.round(width), MIN_DIMENSION, MAX_DIMENSION);
  const normalizedHeight = clamp(Math.round(height), MIN_DIMENSION, MAX_DIMENSION);

  const handleResize = () => {
    const oldWidth = project.width;
    const oldHeight = project.height;
    const newWidth = normalizedWidth;
    const newHeight = normalizedHeight;
    
    if (oldWidth === newWidth && oldHeight === newHeight) {
      setResizeCanvasDialog(false);
      return;
    }
    
    // Resize all layer data in all frames
    frames.forEach((frame) => {
      layers.forEach((layer) => {
        const data = frame.layerData[layer.id];
        if (data) {
          const resizedData = resizePixelData(data, oldWidth, oldHeight, newWidth, newHeight, anchor);
          setFrameLayerData(frame.id, layer.id, resizedData);
        } else {
          // Initialize empty layer data if doesn't exist
          setFrameLayerData(frame.id, layer.id, new Uint8ClampedArray(newWidth * newHeight * 4));
        }
      });
    });
    
    // Update project dimensions
    updateProject({ width: newWidth, height: newHeight });
    
    setResizeCanvasDialog(false);
  };

  return (
    <Dialog open={showResizeCanvasDialog} onClose={() => setResizeCanvasDialog(false)} title={t('resize.title', 'Resize Canvas')}>
      <div className="space-y-4">
        <p className="text-xs text-muted">
          {t('resize.currentSize', 'Current size:')} {project.width} × {project.height}
        </p>
        
        <div>
          <label className="text-xs text-muted block mb-1">{t('resize.newDimensions', 'New Dimensions')}</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-muted block mb-1">{t('resize.width', 'Width')}</label>
              <input
                type="number"
                min={MIN_DIMENSION}
                max={MAX_DIMENSION}
                value={normalizedWidth}
                onChange={(e) => setWidth(parseDimensionInput(e.target.value))}
                data-dialog-autofocus="true"
                className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted block mb-1">{t('resize.height', 'Height')}</label>
              <input
                type="number"
                min={MIN_DIMENSION}
                max={MAX_DIMENSION}
                value={normalizedHeight}
                onChange={(e) => setHeight(parseDimensionInput(e.target.value))}
                className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
              />
            </div>
          </div>
          <p className="text-[10px] text-muted mt-1">
            {t('resize.range', 'Range: {min} - {max}px', { min: MIN_DIMENSION, max: MAX_DIMENSION })}
          </p>
        </div>

        <div>
          <label className="text-xs text-muted block mb-1">{t('resize.anchorPoint', 'Anchor Point')}</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setAnchor('center')}
              className={`px-3 py-2 text-xs rounded border transition-colors
                ${anchor === 'center' ? 'border-accent bg-accent/20 text-foreground' : 'border-border text-muted hover:border-border-light'}`}
            >
              {t('resize.center', 'Center')}
            </button>
            <button
              type="button"
              onClick={() => setAnchor('topleft')}
              className={`px-3 py-2 text-xs rounded border transition-colors
                ${anchor === 'topleft' ? 'border-accent bg-accent/20 text-foreground' : 'border-border text-muted hover:border-border-light'}`}
            >
              {t('resize.topLeft', 'Top-Left')}
            </button>
          </div>
          <p className="text-[10px] text-muted mt-1">
            {anchor === 'center'
              ? t('resize.anchorCenterHint', 'Content will be centered in the new canvas')
              : t('resize.anchorTopLeftHint', 'Content will stay at top-left corner')}
          </p>
        </div>

        <Button data-dialog-default="true" onClick={handleResize} className="w-full">
          {t('resize.resizeButton', 'Resize Canvas')}
        </Button>
      </div>
    </Dialog>
  );
}
