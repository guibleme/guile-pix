'use client';

import React from 'react';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  label?: string;
  onChange: (value: number) => void;
}

export default function Slider({ value, min, max, step = 1, label, onChange }: SliderProps) {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-xs text-muted w-16 shrink-0">{label}</span>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent"
      />
      <span className="text-xs text-muted w-10 text-right">{value}</span>
    </div>
  );
}
