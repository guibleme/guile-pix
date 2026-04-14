'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import type { HSB } from '@/types/color';
import { hsbToRgba } from '@/lib/utils/color';

interface ColorSpectrumProps {
  hsb: HSB;
  onChange: (hsb: HSB) => void;
}

const SV_W = 256;
const HUE_H = 14;
const SV_MIN_H = 80;
const SV_MAX_H = 320;
const SV_DEFAULT_H = 140;
const STORAGE_KEY = 'dogsprite-spectrum-height';

function loadHeight(): number {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v) {
      const n = Number(v);
      if (n >= SV_MIN_H && n <= SV_MAX_H) return n;
    }
  } catch { /* ignore */ }
  return SV_DEFAULT_H;
}

export default function ColorSpectrum({ hsb, onChange }: ColorSpectrumProps) {
  const svCanvasRef = useRef<HTMLCanvasElement>(null);
  const hueCanvasRef = useRef<HTMLCanvasElement>(null);
  const svImgRef = useRef<ImageData | null>(null);
  const lastHueRef = useRef<number>(-1);
  const lastSvHRef = useRef<number>(-1);
  const svDragging = useRef(false);
  const hueDragging = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  // ── Resizable spectrum height ──
  const [svHeight, setSvHeight] = useState(SV_DEFAULT_H);
  const resizeDragging = useRef(false);
  const resizeStartY = useRef(0);
  const resizeStartH = useRef(0);
  const [isResizing, setIsResizing] = useState(false);

  // Load persisted height on mount
  useEffect(() => {
    setSvHeight(loadHeight());
  }, []);

  // Persist height on change (debounced by nature of pointerUp)
  const persistHeight = useCallback((h: number) => {
    try { localStorage.setItem(STORAGE_KEY, String(h)); } catch { /* ignore */ }
  }, []);

  // ── SV Rectangle: render when hue or canvas size changes ──
  useEffect(() => {
    const canvas = svCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const svH = canvas.height;
    const hue = hsb.h;

    // Re-render pixel data when hue or canvas height changes
    if (lastHueRef.current !== hue || lastSvHRef.current !== svH || !svImgRef.current) {
      lastHueRef.current = hue;
      lastSvHRef.current = svH;
      const img = ctx.createImageData(SV_W, svH);
      for (let y = 0; y < svH; y++) {
        const bri = (1 - y / (svH - 1)) * 100;
        for (let x = 0; x < SV_W; x++) {
          const sat = (x / (SV_W - 1)) * 100;
          const c = hsbToRgba({ h: hue, s: sat, b: bri });
          const i = (y * SV_W + x) * 4;
          img.data[i] = c.r;
          img.data[i + 1] = c.g;
          img.data[i + 2] = c.b;
          img.data[i + 3] = 255;
        }
      }
      svImgRef.current = img;
    }
    ctx.putImageData(svImgRef.current, 0, 0);

    // Draw crosshair indicator
    const ix = (hsb.s / 100) * (SV_W - 1);
    const iy = (1 - hsb.b / 100) * (svH - 1);

    ctx.beginPath();
    ctx.arc(ix, iy, 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ix, iy, 5, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [hsb.h, hsb.s, hsb.b, svHeight]);

  // ── Hue bar: render + indicator ──
  useEffect(() => {
    const canvas = hueCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    for (let x = 0; x < w; x++) {
      const hue = (x / (w - 1)) * 360;
      const c = hsbToRgba({ h: hue, s: 100, b: 100 });
      ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
      ctx.fillRect(x, 0, 1, h);
    }

    const hx = (hsb.h / 360) * (w - 1);
    ctx.fillStyle = 'white';
    ctx.fillRect(hx - 2, 0, 4, h);
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(hx - 2.5, 0.5, 5, h - 1);
  }, [hsb.h]);

  // ── SV picking ──
  const pickSV = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = svCanvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const px = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const py = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      onChange({
        h: hsb.h,
        s: Math.round(px * 100),
        b: Math.round((1 - py) * 100),
      });
    },
    [onChange, hsb.h]
  );

  const handleSVDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      svDragging.current = true;
      setIsDragging(true);
      svCanvasRef.current?.setPointerCapture(e.pointerId);
      pickSV(e.clientX, e.clientY);
    },
    [pickSV]
  );

  const handleSVMove = useCallback(
    (e: React.PointerEvent) => {
      if (!svDragging.current) return;
      pickSV(e.clientX, e.clientY);
    },
    [pickSV]
  );

  const handleSVUp = useCallback(() => {
    svDragging.current = false;
    setIsDragging(false);
  }, []);

  // ── Hue picking ──
  const pickHue = useCallback(
    (clientX: number) => {
      const canvas = hueCanvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const px = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      onChange({
        h: Math.round(px * 360),
        s: hsb.s,
        b: hsb.b,
      });
    },
    [onChange, hsb.s, hsb.b]
  );

  const handleHueDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      hueDragging.current = true;
      setIsDragging(true);
      hueCanvasRef.current?.setPointerCapture(e.pointerId);
      pickHue(e.clientX);
    },
    [pickHue]
  );

  const handleHueMove = useCallback(
    (e: React.PointerEvent) => {
      if (!hueDragging.current) return;
      pickHue(e.clientX);
    },
    [pickHue]
  );

  const handleHueUp = useCallback(() => {
    hueDragging.current = false;
    setIsDragging(false);
  }, []);

  const handleLostCapture = useCallback(() => {
    svDragging.current = false;
    hueDragging.current = false;
    setIsDragging(false);
  }, []);

  // ── Resize handle ──
  const handleResizeDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      resizeDragging.current = true;
      resizeStartY.current = e.clientY;
      resizeStartH.current = svHeight;
      setIsResizing(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [svHeight]
  );

  const handleResizeMove = useCallback(
    (e: React.PointerEvent) => {
      if (!resizeDragging.current) return;
      const dy = e.clientY - resizeStartY.current;
      const newH = Math.max(SV_MIN_H, Math.min(SV_MAX_H, resizeStartH.current + dy));
      setSvHeight(newH);
    },
    []
  );

  const handleResizeUp = useCallback(() => {
    if (resizeDragging.current) {
      resizeDragging.current = false;
      setIsResizing(false);
      // Persist final height
      setSvHeight((h) => {
        persistHeight(h);
        return h;
      });
    }
  }, [persistHeight]);

  const handleResizeLost = useCallback(() => {
    resizeDragging.current = false;
    setIsResizing(false);
  }, []);

  return (
    <div className="space-y-0">
      {/* SV Rectangle */}
      <canvas
        ref={svCanvasRef}
        width={SV_W}
        height={Math.round(svHeight)}
        className="w-full rounded-t border border-b-0 border-border"
        style={{
          height: `${svHeight}px`,
          imageRendering: 'auto',
          cursor: isDragging && svDragging.current ? 'grabbing' : 'crosshair',
          touchAction: 'none',
        }}
        onPointerDown={handleSVDown}
        onPointerMove={handleSVMove}
        onPointerUp={handleSVUp}
        onLostPointerCapture={handleLostCapture}
      />

      {/* Resize handle */}
      <div
        className="group flex items-center justify-center h-[10px] border-x border-border bg-surface/80 hover:bg-surface-hover transition-colors select-none"
        style={{
          cursor: isResizing ? 'ns-resize' : 'ns-resize',
          touchAction: 'none',
        }}
        onPointerDown={handleResizeDown}
        onPointerMove={handleResizeMove}
        onPointerUp={handleResizeUp}
        onLostPointerCapture={handleResizeLost}
      >
        {/* Grip dots */}
        <div className="flex gap-[3px]">
          <div className="w-[3px] h-[3px] rounded-full bg-muted/50 group-hover:bg-muted" />
          <div className="w-[3px] h-[3px] rounded-full bg-muted/50 group-hover:bg-muted" />
          <div className="w-[3px] h-[3px] rounded-full bg-muted/50 group-hover:bg-muted" />
          <div className="w-[3px] h-[3px] rounded-full bg-muted/50 group-hover:bg-muted" />
          <div className="w-[3px] h-[3px] rounded-full bg-muted/50 group-hover:bg-muted" />
        </div>
      </div>

      {/* Hue bar */}
      <canvas
        ref={hueCanvasRef}
        width={360}
        height={HUE_H}
        className="w-full rounded-b border border-t-0 border-border"
        style={{
          height: '16px',
          imageRendering: 'auto',
          cursor: isDragging && hueDragging.current ? 'grabbing' : 'pointer',
          touchAction: 'none',
        }}
        onPointerDown={handleHueDown}
        onPointerMove={handleHueMove}
        onPointerUp={handleHueUp}
        onLostPointerCapture={handleLostCapture}
      />
    </div>
  );
}
