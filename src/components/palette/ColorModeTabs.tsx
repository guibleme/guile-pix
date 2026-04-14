'use client';

import React from 'react';

export type ColorMode = 'RGB' | 'HSB' | 'Gray';

interface ColorModeTabsProps {
  mode: ColorMode;
  onChange: (mode: ColorMode) => void;
}

const MODES: ColorMode[] = ['RGB', 'HSB', 'Gray'];

export default function ColorModeTabs({ mode, onChange }: ColorModeTabsProps) {
  return (
    <div className="flex border-b border-border">
      {MODES.map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`flex-1 text-[11px] py-1.5 transition-colors ${
            mode === m
              ? 'border-b-2 border-accent text-foreground font-medium'
              : 'text-muted hover:text-foreground'
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
