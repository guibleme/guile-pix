import type { RGBA } from './color';

export type ToolType = 'brush' | 'eraser' | 'fill' | 'colorPicker' | 'line' | 'rect' | 'select';

export type BrushShape = 'square' | 'circle';
export type FreehandAlgorithm = 'default' | 'pixelPerfect' | 'dots';
export type FreehandTracePolicy = 'accumulate' | 'accumulateUpdateLast';
export type SymmetryMode = 'none' | 'horizontal' | 'vertical' | 'both';
export type PressureMode = 'off' | 'size' | 'opacity' | 'sizeOpacity';

export interface ToolSettings {
  brushSize: number;
  brushShape: BrushShape;
  strokeStabilizer: number;
  freehandAlgorithm: FreehandAlgorithm;
  freehandTracePolicy: FreehandTracePolicy;
  symmetryMode: SymmetryMode;
  symmetryAxisX: number;
  symmetryAxisY: number;
  pressureEnabled: boolean;
  pressureAffectsSize: boolean;
  pressureAffectsOpacity: boolean;
  pressureSizeMinPercent: number;
  pressureOpacityMinPercent: number;
}

export interface ToolContext {
  width: number;
  height: number;
  color: RGBA;
  brushSize: number;
  brushShape: BrushShape;
  freehandAlgorithm: FreehandAlgorithm;
  freehandTracePolicy: FreehandTracePolicy;
  symmetryMode: SymmetryMode;
  symmetryAxisX: number;
  symmetryAxisY: number;
  pressure: number;
  pressureMode: PressureMode;
  pressureSizeMin: number;
  pressureOpacityMin: number;
  getPixel: (x: number, y: number) => RGBA;
  setPixel: (x: number, y: number, color: RGBA) => void;
  getPixelBuffer: () => Uint8ClampedArray;
}

export interface ITool {
  type: ToolType;
  cursor: string;
  onPointerDown(x: number, y: number, ctx: ToolContext): void;
  onPointerMove(x: number, y: number, ctx: ToolContext): void;
  onPointerUp(x: number, y: number, ctx: ToolContext): void;
}

export interface Point {
  x: number;
  y: number;
}
