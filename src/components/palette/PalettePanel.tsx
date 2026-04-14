'use client';

import React, { useState } from 'react';
import { usePaletteStore } from '@/stores/usePaletteStore';
import { rgbaToHex, lerpRgba } from '@/lib/utils/color';
import Panel from '@/components/ui/Panel';
import PixelIcon from '@/components/ui/PixelIcon';
import type { RGBA } from '@/types/color';
import { PALETTES } from '@/constants/palettes';
import useI18n from '@/hooks/useI18n';
import ColorSelector from './ColorSelector';

export default function PalettePanel() {
  const { t } = useI18n();
  const {
    foreground,
    background,
    palette,
    activePaletteId,
    setForeground,
    setBackground,
    swapColors,
    addColor,
    addColors,
    removeColor,
    applyPreset,
  } = usePaletteStore();
  const [rampSteps, setRampSteps] = useState(6);

  const handleSwatchClick = (index: number, color: RGBA, e: React.MouseEvent) => {
    if (e.altKey || e.button === 1) {
      removeColor(index);
      return;
    }

    if (e.button === 2) {
      e.preventDefault();
      setBackground(color);
    } else {
      setForeground(color);
    }
  };

  const handleApplyPreset = (presetId: string) => {
    if (presetId === 'custom') return;
    applyPreset(presetId);
  };

  const handleAddCurrentColor = () => {
    addColor(foreground);
  };

  const handleAddRamp = () => {
    const steps = Math.max(2, Math.min(16, rampSteps));
    const generated: RGBA[] = [];
    for (let i = 0; i < steps; i += 1) {
      const t = i / (steps - 1);
      generated.push(lerpRgba(background, foreground, t));
    }
    addColors(generated);
  };

  return (
    <Panel title={t('palette.panelTitle', 'Colors')} className="h-full">
      <div className="p-3">
        <div className="mb-3 space-y-2">
          <div className="text-[11px] text-muted">{t('palette.presets', 'Palette Presets')}</div>
          <select
            value={activePaletteId}
            onChange={(e) => handleApplyPreset(e.target.value)}
            className="w-full h-8 px-2 text-xs rounded border border-border bg-background text-foreground"
          >
            <option value="custom">{t('palette.custom', 'Custom Palette')}</option>
            {PALETTES.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name} ({preset.colors.length})
              </option>
            ))}
          </select>
        </div>

        {/* FG/BG display */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative w-12 h-12">
            <div
              className="absolute top-0 left-0 w-8 h-8 rounded border border-border shadow-sm z-10 cursor-pointer"
              style={{ backgroundColor: rgbaToHex(foreground) }}
              title={t('palette.fg', 'Foreground color')}
            />
            <div
              className="absolute bottom-0 right-0 w-8 h-8 rounded border border-border shadow-sm cursor-pointer"
              style={{ backgroundColor: rgbaToHex(background) }}
              title={t('palette.bg', 'Background color')}
            />
          </div>
          <button
            onClick={swapColors}
            className="text-muted hover:text-foreground transition-colors"
            title={t('palette.swap', 'Swap colors (X)')}
          >
            <PixelIcon name="swapColors" size={14} />
          </button>
        </div>

        {/* Color selector (spectrum + sliders + hex) */}
        <div className="mb-3">
          <ColorSelector />
        </div>

        <div className="mb-3 space-y-2">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={handleAddCurrentColor}
              className="h-7 px-2 rounded border border-border bg-background text-xs text-foreground hover:bg-surface-hover inline-flex items-center justify-center gap-1"
              title={t('palette.addColorTitle', 'Add foreground color to palette')}
            >
              <PixelIcon name="plus" size={12} />
              <span>{t('palette.addColor', 'Add Color')}</span>
            </button>
            <button
              type="button"
              onClick={handleAddRamp}
              className="h-7 px-2 rounded border border-border bg-background text-xs text-foreground hover:bg-surface-hover inline-flex items-center justify-center gap-1"
              title={t('palette.addRampTitle', 'Generate color ramp from background to foreground')}
            >
              <PixelIcon name="wand" size={12} />
              <span>{t('palette.addRamp', 'Add Ramp')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[11px] text-muted whitespace-nowrap">{t('palette.rampSteps', 'Ramp Steps')}</label>
            <select
              value={rampSteps}
              onChange={(e) => setRampSteps(Number(e.target.value))}
              className="h-7 px-2 text-xs rounded border border-border bg-background text-foreground"
            >
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
            <span className="ml-auto text-[11px] text-muted">{palette.length}/512</span>
          </div>
        </div>

        {/* Palette grid */}
        <div className="grid grid-cols-8 gap-1">
          {palette.map((color, index) => (
            <button
              key={index}
              className="w-6 h-6 rounded-sm border border-border/60 hover:border-foreground transition-colors"
              style={{ backgroundColor: rgbaToHex(color) }}
              onClick={(e) => handleSwatchClick(index, color, e)}
              onAuxClick={(e) => handleSwatchClick(index, color, e)}
              onContextMenu={(e) => handleSwatchClick(index, color, e)}
              title={t('palette.swatchTitle', '{color} | click FG | right click BG | alt/middle remove', {
                color: rgbaToHex(color),
              })}
            />
          ))}
        </div>
      </div>
    </Panel>
  );
}
