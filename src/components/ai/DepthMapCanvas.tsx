'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import type { DepthMap } from '@/types/rotation3d';

interface DepthMapCanvasProps {
  depthMap: DepthMap | null;
  sourcePixels: Uint8ClampedArray;
  width: number;
  height: number;
  onPaintDepth?: (x: number, y: number, radius: number) => void;
}

/**
 * Canvas that visualizes the depth map as a color gradient overlay:
 *   Blue (far/surface) → Red (near/front)
 * Also shows the original sprite underneath for reference.
 */
export default function DepthMapCanvas({
  depthMap,
  sourcePixels,
  width,
  height,
  onPaintDepth,
}: DepthMapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPainting = useRef(false);

  const DISPLAY_SCALE = Math.min(4, Math.max(1, Math.floor(200 / Math.max(width, height))));

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dw = width * DISPLAY_SCALE;
    const dh = height * DISPLAY_SCALE;

    ctx.clearRect(0, 0, dw, dh);

    // Draw source sprite (dimmed)
    const imgData = ctx.createImageData(width, height);
    for (let i = 0; i < width * height * 4; i += 4) {
      imgData.data[i] = sourcePixels[i];
      imgData.data[i + 1] = sourcePixels[i + 1];
      imgData.data[i + 2] = sourcePixels[i + 2];
      imgData.data[i + 3] = Math.round(sourcePixels[i + 3] * 0.3);
    }

    // Use a temp canvas for scaling
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.putImageData(imgData, 0, 0);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, dw, dh);

    // Draw depth overlay
    if (depthMap) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const d = depthMap.data[y * width + x];
          if (d === 0 && sourcePixels[(y * width + x) * 4 + 3] === 0) continue;

          // Depth color: blue (0) → cyan (0.33) → yellow (0.66) → red (1)
          const r = Math.round(d * 255);
          const b = Math.round((1 - d) * 255);
          const g = Math.round(Math.sin(d * Math.PI) * 200);

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
          ctx.fillRect(x * DISPLAY_SCALE, y * DISPLAY_SCALE, DISPLAY_SCALE, DISPLAY_SCALE);
        }
      }
    }
  }, [depthMap, sourcePixels, width, height, DISPLAY_SCALE]);

  useEffect(() => {
    draw();
  }, [draw]);

  const getPixelCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / DISPLAY_SCALE);
    const y = Math.floor((e.clientY - rect.top) / DISPLAY_SCALE);
    if (x < 0 || x >= width || y < 0 || y >= height) return null;
    return { x, y };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isPainting.current = true;
    const coords = getPixelCoords(e);
    if (coords && onPaintDepth) {
      onPaintDepth(coords.x, coords.y, 2);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPainting.current) return;
    const coords = getPixelCoords(e);
    if (coords && onPaintDepth) {
      onPaintDepth(coords.x, coords.y, 2);
    }
  };

  const handlePointerUp = () => {
    isPainting.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      width={width * DISPLAY_SCALE}
      height={height * DISPLAY_SCALE}
      className="border border-border rounded cursor-crosshair"
      style={{ imageRendering: 'pixelated' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    />
  );
}
