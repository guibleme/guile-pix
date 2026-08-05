'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';

interface GradientSliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  renderGradient: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  onChange: (value: number) => void;
}

export default function GradientSlider({
  label,
  min,
  max,
  value,
  renderGradient,
  onChange,
}: GradientSliderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  // Re-render gradient track
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    renderGradient(ctx, w, h);
  }, [renderGradient]);

  const pickValue = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const t = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      onChange(Math.round(min + t * (max - min)));
    },
    [onChange, min, max]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      draggingRef.current = true;
      setIsDragging(true);
      trackRef.current?.setPointerCapture(e.pointerId);
      pickValue(e.clientX);
    },
    [pickValue]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      pickValue(e.clientX);
    },
    [pickValue]
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleLostCapture = useCallback(() => {
    draggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      if (Number.isFinite(v)) {
        onChange(Math.max(min, Math.min(max, Math.round(v))));
      }
    },
    [onChange, min, max]
  );

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex items-center gap-1.5 h-[22px]">
      <span className="text-[11px] text-muted w-3 text-right shrink-0 select-none font-medium">
        {label}
      </span>
      <div
        ref={trackRef}
        className="relative flex-1 h-[18px] rounded-sm overflow-hidden border border-border/50"
        style={{
          cursor: isDragging ? 'grabbing' : 'pointer',
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onLostPointerCapture={handleLostCapture}
      >
        <canvas
          ref={canvasRef}
          width={256}
          height={18}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ imageRendering: 'auto' }}
        />
        {/* Visible thumb */}
        <div
          className="absolute top-0 h-full pointer-events-none"
          style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
        >
          <div
            className="w-[6px] h-full rounded-sm border shadow-sm"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(220,220,220,0.9))',
              borderColor: 'rgba(0,0,0,0.4)',
            }}
          />
        </div>
      </div>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        className="w-10 h-[22px] px-1 text-[11px] text-center bg-background border border-border rounded text-foreground tabular-nums"
      />
    </div>
  );
}
