'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { usePaletteStore } from '@/stores/usePaletteStore';
import { rgbaToHsb, hsbToRgba, rgbaToHex } from '@/lib/utils/color';
import type { RGBA, HSB } from '@/types/color';
import ColorSpectrum from './ColorSpectrum';
import ColorModeTabs, { type ColorMode } from './ColorModeTabs';
import ColorSliders from './ColorSliders';
import HexColorInput from './HexColorInput';

export default function ColorSelector() {
  const foreground = usePaletteStore((s) => s.foreground);
  const setForeground = usePaletteStore((s) => s.setForeground);

  const [mode, setMode] = useState<ColorMode>('HSB');
  const hsbRef = useRef<HSB>(rgbaToHsb(foreground));
  const isInternalRef = useRef(false);

  // Sync from external store changes (swatch clicks, color picker tool, swap)
  useEffect(() => {
    if (isInternalRef.current) {
      isInternalRef.current = false;
      return;
    }
    const newHsb = rgbaToHsb(foreground);
    // Preserve hue when color is achromatic (S=0 or B=0)
    if (foreground.r === foreground.g && foreground.g === foreground.b) {
      hsbRef.current = { ...hsbRef.current, s: newHsb.s, b: newHsb.b };
    } else {
      hsbRef.current = newHsb;
    }
  }, [foreground]);

  const commitColor = useCallback(
    (rgba: RGBA) => {
      isInternalRef.current = true;
      setForeground(rgba);
    },
    [setForeground]
  );

  const handleSpectrumChange = useCallback(
    (hsb: HSB) => {
      hsbRef.current = hsb;
      commitColor(hsbToRgba(hsb, foreground.a));
    },
    [commitColor, foreground.a]
  );

  const handleHsbChange = useCallback(
    (hsb: HSB) => {
      hsbRef.current = hsb;
      commitColor(hsbToRgba(hsb, foreground.a));
    },
    [commitColor, foreground.a]
  );

  const handleRgbaChange = useCallback(
    (rgba: RGBA) => {
      const newHsb = rgbaToHsb(rgba);
      // Preserve hue for achromatic
      if (rgba.r === rgba.g && rgba.g === rgba.b) {
        hsbRef.current = { ...hsbRef.current, s: newHsb.s, b: newHsb.b };
      } else {
        hsbRef.current = newHsb;
      }
      commitColor(rgba);
    },
    [commitColor]
  );

  const handleAlphaChange = useCallback(
    (a: number) => {
      commitColor({ ...foreground, a });
    },
    [commitColor, foreground]
  );

  const handleHexChange = useCallback(
    (rgba: RGBA) => {
      const newHsb = rgbaToHsb(rgba);
      if (rgba.r === rgba.g && rgba.g === rgba.b) {
        hsbRef.current = { ...hsbRef.current, s: newHsb.s, b: newHsb.b };
      } else {
        hsbRef.current = newHsb;
      }
      commitColor(rgba);
    },
    [commitColor]
  );

  // Current display HSB: use ref for hue preservation
  const displayHsb: HSB = {
    h: hsbRef.current.h,
    s: hsbRef.current.s,
    b: hsbRef.current.b,
  };

  return (
    <div className="space-y-2">
      <ColorSpectrum hsb={displayHsb} onChange={handleSpectrumChange} />
      <ColorModeTabs mode={mode} onChange={setMode} />
      <ColorSliders
        mode={mode}
        rgba={foreground}
        hsb={displayHsb}
        onChangeRgba={handleRgbaChange}
        onChangeHsb={handleHsbChange}
        onChangeAlpha={handleAlphaChange}
      />
      <HexColorInput color={foreground} onChange={handleHexChange} />
    </div>
  );
}
