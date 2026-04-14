import { create } from 'zustand';
import type { RGBA } from '@/types/color';
import { BLACK, WHITE, DEFAULT_PALETTE } from '@/lib/utils/color';
import { PALETTES } from '@/constants/palettes';

const MAX_PALETTE_COLORS = 512;

function clampByte(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(255, Math.round(value)));
}

function sanitizeColor(color: RGBA): RGBA {
  return {
    r: clampByte(color.r),
    g: clampByte(color.g),
    b: clampByte(color.b),
    a: clampByte(color.a),
  };
}

function rgbaKey(color: RGBA): string {
  const c = sanitizeColor(color);
  return `${c.r},${c.g},${c.b},${c.a}`;
}

function sanitizePalette(colors: RGBA[]): RGBA[] {
  const out: RGBA[] = [];
  const seen = new Set<string>();
  for (const color of colors) {
    const normalized = sanitizeColor(color);
    const key = rgbaKey(normalized);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(normalized);
    if (out.length >= MAX_PALETTE_COLORS) break;
  }
  return out;
}

interface PaletteState {
  foreground: RGBA;
  background: RGBA;
  palette: RGBA[];
  activePaletteId: string;
  setForeground: (color: RGBA) => void;
  setBackground: (color: RGBA) => void;
  swapColors: () => void;
  addColor: (color: RGBA) => void;
  addColors: (colors: RGBA[]) => void;
  removeColor: (index: number) => void;
  setPalette: (colors: RGBA[], paletteId?: string) => void;
  applyPreset: (paletteId: string) => void;
}

export const usePaletteStore = create<PaletteState>((set) => ({
  foreground: BLACK,
  background: WHITE,
  palette: sanitizePalette(DEFAULT_PALETTE),
  activePaletteId: 'default',
  setForeground: (color) => set({ foreground: sanitizeColor(color) }),
  setBackground: (color) => set({ background: sanitizeColor(color) }),
  swapColors: () => set((s) => ({ foreground: s.background, background: s.foreground })),
  addColor: (color) =>
    set((s) => {
      const nextPalette = sanitizePalette([...s.palette, color]);
      return { palette: nextPalette, activePaletteId: 'custom' };
    }),
  addColors: (colors) =>
    set((s) => {
      const nextPalette = sanitizePalette([...s.palette, ...colors]);
      return { palette: nextPalette, activePaletteId: 'custom' };
    }),
  removeColor: (index) =>
    set((s) => {
      if (s.palette.length <= 1) return s;
      const nextPalette = s.palette.filter((_, i) => i !== index);
      return { palette: nextPalette, activePaletteId: 'custom' };
    }),
  setPalette: (colors, paletteId = 'custom') =>
    set({
      palette: sanitizePalette(colors),
      activePaletteId: paletteId,
    }),
  applyPreset: (paletteId) =>
    set((s) => {
      const preset = PALETTES.find((p) => p.id === paletteId);
      if (!preset) return s;
      return {
        palette: sanitizePalette(preset.colors),
        activePaletteId: preset.id,
      };
    }),
}));
