import type { RGBA, HSL, HSB } from '@/types/color';

export function rgbaToHex(c: RGBA): string {
  const r = c.r.toString(16).padStart(2, '0');
  const g = c.g.toString(16).padStart(2, '0');
  const b = c.b.toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

export function hexToRgba(hex: string, a = 255): RGBA {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
    a,
  };
}

export function rgbaToString(c: RGBA): string {
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a / 255})`;
}

export function rgbaEqual(a: RGBA, b: RGBA): boolean {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
}

export function rgbaToHsl(c: RGBA): HSL {
  const r = c.r / 255;
  const g = c.g / 255;
  const b = c.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function rgbaToHsb(c: RGBA): HSB {
  const r = c.r / 255;
  const g = c.g / 255;
  const b = c.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : (d / max) * 100;
  const br = max * 100;

  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      default: h = ((r - g) / d + 4) * 60; break;
    }
  }

  return { h: Math.round(h), s: Math.round(s), b: Math.round(br) };
}

export function hsbToRgba(hsb: HSB, a = 255): RGBA {
  const s = hsb.s / 100;
  const v = hsb.b / 100;
  const h = ((hsb.h % 360) + 360) % 360;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a,
  };
}

export function rgbaToGray(c: RGBA): number {
  return Math.round(0.299 * c.r + 0.587 * c.g + 0.114 * c.b);
}

export function grayToRgba(v: number, a = 255): RGBA {
  const clamped = Math.max(0, Math.min(255, Math.round(v)));
  return { r: clamped, g: clamped, b: clamped, a };
}

export function lerpRgba(a: RGBA, b: RGBA, t: number): RGBA {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
    a: Math.round(a.a + (b.a - a.a) * t),
  };
}

export const TRANSPARENT: RGBA = { r: 0, g: 0, b: 0, a: 0 };
export const BLACK: RGBA = { r: 0, g: 0, b: 0, a: 255 };
export const WHITE: RGBA = { r: 255, g: 255, b: 255, a: 255 };

export const DEFAULT_PALETTE: RGBA[] = [
  { r: 0, g: 0, b: 0, a: 255 },
  { r: 255, g: 255, b: 255, a: 255 },
  { r: 255, g: 0, b: 0, a: 255 },
  { r: 0, g: 255, b: 0, a: 255 },
  { r: 0, g: 0, b: 255, a: 255 },
  { r: 255, g: 255, b: 0, a: 255 },
  { r: 255, g: 0, b: 255, a: 255 },
  { r: 0, g: 255, b: 255, a: 255 },
  { r: 128, g: 128, b: 128, a: 255 },
  { r: 192, g: 192, b: 192, a: 255 },
  { r: 128, g: 0, b: 0, a: 255 },
  { r: 128, g: 128, b: 0, a: 255 },
  { r: 0, g: 128, b: 0, a: 255 },
  { r: 0, g: 128, b: 128, a: 255 },
  { r: 0, g: 0, b: 128, a: 255 },
  { r: 128, g: 0, b: 128, a: 255 },
  { r: 255, g: 165, b: 0, a: 255 },
  { r: 255, g: 192, b: 203, a: 255 },
  { r: 165, g: 42, b: 42, a: 255 },
  { r: 245, g: 222, b: 179, a: 255 },
  { r: 46, g: 139, b: 87, a: 255 },
  { r: 70, g: 130, b: 180, a: 255 },
  { r: 238, g: 130, b: 238, a: 255 },
  { r: 210, g: 180, b: 140, a: 255 },
];
