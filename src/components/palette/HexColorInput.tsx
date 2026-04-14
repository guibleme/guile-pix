'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { RGBA } from '@/types/color';
import { rgbaToHex, hexToRgba } from '@/lib/utils/color';

interface HexColorInputProps {
  color: RGBA;
  onChange: (color: RGBA) => void;
}

export default function HexColorInput({ color, onChange }: HexColorInputProps) {
  const [text, setText] = useState(rgbaToHex(color));
  const focusedRef = useRef(false);

  useEffect(() => {
    if (!focusedRef.current) {
      setText(rgbaToHex(color));
    }
  }, [color]);

  const commit = useCallback(
    (raw: string) => {
      let hex = raw.trim();
      if (!hex.startsWith('#')) hex = '#' + hex;
      hex = hex.replace(/[^#0-9a-fA-F]/g, '');
      const digits = hex.slice(1);
      const padded = digits.padEnd(6, '0').slice(0, 6);
      const final = '#' + padded;
      setText(final);
      onChange(hexToRgba(final, color.a));
    },
    [onChange, color.a]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setText(v);
      if (/^#[0-9a-fA-F]{6}$/.test(v)) {
        onChange(hexToRgba(v, color.a));
      }
    },
    [onChange, color.a]
  );

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11px] text-muted shrink-0 select-none font-medium">#</span>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onFocus={() => { focusedRef.current = true; }}
        onBlur={(e) => {
          focusedRef.current = false;
          commit(e.target.value);
        }}
        className="flex-1 h-[22px] px-1.5 text-[11px] bg-background border border-border rounded text-foreground font-mono"
        placeholder="#000000"
      />
      {/* Color preview chip */}
      <div
        className="w-[22px] h-[22px] rounded border border-border shrink-0"
        style={{ backgroundColor: rgbaToHex(color) }}
      />
    </div>
  );
}
