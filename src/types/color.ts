export interface RGBA {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
  a: number; // 0-255
}

export interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export interface HSB {
  h: number; // 0-360
  s: number; // 0-100
  b: number; // 0-100
}

export interface ColorSwatch {
  color: RGBA;
  name?: string;
}

export interface Palette {
  id: string;
  name: string;
  colors: RGBA[];
}
