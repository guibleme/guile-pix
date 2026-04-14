'use client';

import React, { useRef, useEffect } from 'react';
import type { SpriteTemplate, ColorScheme } from '@/lib/sprites/types';
import { renderTemplate } from '@/lib/sprites/templateRenderer';

interface SpritePreviewCanvasProps {
  template: SpriteTemplate;
  scheme: ColorScheme | null;
  customColors?: Record<string, { shadow: string; base: string; highlight: string }>;
  scale?: number;
  className?: string;
}

export default function SpritePreviewCanvas({
  template,
  scheme,
  customColors,
  scale = 8,
  className = '',
}: SpritePreviewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = renderTemplate(template, scheme, customColors);
    const w = template.width * scale;
    const h = template.height * scale;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw checkerboard background
    const checkSize = scale;
    for (let y = 0; y < h; y += checkSize) {
      for (let x = 0; x < w; x += checkSize) {
        const isLight = ((x / checkSize) + (y / checkSize)) % 2 === 0;
        ctx.fillStyle = isLight ? '#2a2a3e' : '#232336';
        ctx.fillRect(x, y, checkSize, checkSize);
      }
    }

    // Draw sprite with nearest-neighbor upscale
    ctx.imageSmoothingEnabled = false;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = template.width;
    tempCanvas.height = template.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) {
      tempCtx.putImageData(imageData, 0, 0);
      ctx.drawImage(tempCanvas, 0, 0, w, h);
    }
  }, [template, scheme, customColors, scale]);

  return (
    <canvas
      ref={canvasRef}
      className={`image-rendering-pixelated rounded-lg ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
