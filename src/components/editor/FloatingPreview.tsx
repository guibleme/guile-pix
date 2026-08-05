'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { PixelBuffer } from '@/lib/canvas/PixelBuffer';
import { advanceLoopingFrames } from '@/lib/animation/playbackTiming';
import PixelIcon from '@/components/ui/PixelIcon';
import useI18n from '@/hooks/useI18n';

export default function FloatingPreview() {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const frameIndexRef = useRef(0);
  const lastFrameTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [displayFrameIndex, setDisplayFrameIndex] = React.useState(0);
  
  const { frames, fps } = useTimelineStore();
  const { layers } = useLayerStore();
  const { project } = useProjectStore();
  
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const frame = frames[frameIndex];
    if (!frame) return;
    
    // Composite all visible layers
    const width = project.width;
    const height = project.height;
    
    // Create a temporary canvas for compositing
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d')!;
    
    layers.forEach((layer) => {
      if (!layer.visible) return;
      const data = frame.layerData[layer.id];
      if (!data) return;
      
      const buffer = new PixelBuffer(width, height, data);
      const imageData = buffer.toImageData();
      tempCtx.putImageData(imageData, 0, 0);
      
      // Apply opacity
      if (layer.opacity < 1) {
        tempCtx.globalCompositeOperation = 'destination-in';
        tempCtx.fillStyle = `rgba(0, 0, 0, ${layer.opacity})`;
        tempCtx.fillRect(0, 0, width, height);
        tempCtx.globalCompositeOperation = 'source-over';
      }
    });
    
    // Scale to preview size (max 200px)
    const scale = Math.min(200 / width, 200 / height, 4);
    const previewWidth = width * scale;
    const previewHeight = height * scale;
    
    canvas.width = previewWidth;
    canvas.height = previewHeight;
    
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, previewWidth, previewHeight);
    ctx.drawImage(tempCanvas, 0, 0, previewWidth, previewHeight);
  }, [frames, layers, project]);
  
  useEffect(() => {
    if (!isOpen || !isPlaying || frames.length === 0) return;
    
    const animate = (timestamp: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
      } else {
        accumulatedTimeRef.current += Math.max(0, timestamp - lastFrameTimeRef.current);
        lastFrameTimeRef.current = timestamp;

        const advance = advanceLoopingFrames(
          frames,
          frameIndexRef.current,
          accumulatedTimeRef.current,
          fps,
        );
        frameIndexRef.current = advance.frameIndex;
        accumulatedTimeRef.current = advance.remainderMs;

        if (advance.advancedFrames > 0) {
          drawFrame(frameIndexRef.current);
          setDisplayFrameIndex(frameIndexRef.current);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lastFrameTimeRef.current = null;
      accumulatedTimeRef.current = 0;
    };
  }, [isOpen, isPlaying, fps, frames, drawFrame]);
  
  // Update when frames change
  useEffect(() => {
    if (isOpen && !isPlaying) {
      drawFrame(frameIndexRef.current);
      setDisplayFrameIndex(frameIndexRef.current);
    }
  }, [frames, isOpen, isPlaying, drawFrame]);

  useEffect(() => {
    if (!isOpen || frames.length === 0) return;
    frameIndexRef.current = Math.max(0, Math.min(frameIndexRef.current, frames.length - 1));
    drawFrame(frameIndexRef.current);
    setDisplayFrameIndex(frameIndexRef.current);
  }, [drawFrame, frames.length, isOpen]);
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 p-2 rounded-full bg-accent/90 text-white shadow-lg hover:bg-accent transition-colors"
        title={t('preview.open', 'Open animation preview')}
      >
        <PixelIcon name="play" size={20} />
      </button>
    );
  }
  
  return (
    <div className="fixed bottom-20 right-4 z-50 bg-surface border border-border rounded-lg shadow-xl p-3">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium">{t('preview.title', 'Preview')}</span>
        <div className="flex gap-1">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded hover:bg-surface-hover"
            title={isPlaying ? t('preview.pause', 'Pause') : t('preview.play', 'Play')}
          >
            {isPlaying ? <PixelIcon name="pause" size={14} /> : <PixelIcon name="play" size={14} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded hover:bg-surface-hover"
            title={t('preview.close', 'Close')}
          >
            <PixelIcon name="close" size={14} />
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="border border-border rounded bg-background"
        style={{ imageRendering: 'pixelated' }}
      />
      <div className="text-[10px] text-muted mt-1 text-center">
        {t('preview.frame', 'Frame {current} / {total}', { current: displayFrameIndex + 1, total: frames.length })}
      </div>
    </div>
  );
}
