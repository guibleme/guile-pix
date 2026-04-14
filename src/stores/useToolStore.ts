import { create } from 'zustand';
import type { ToolType, BrushShape, FreehandAlgorithm, FreehandTracePolicy, SymmetryMode } from '@/types/tool';
import {
  DEFAULT_BRUSH_SIZE,
  DEFAULT_BRUSH_SHAPE,
  DEFAULT_FREEHAND_ALGORITHM,
  DEFAULT_FREEHAND_TRACE_POLICY,
  DEFAULT_PRESSURE_AFFECTS_OPACITY,
  DEFAULT_PRESSURE_AFFECTS_SIZE,
  DEFAULT_PRESSURE_ENABLED,
  DEFAULT_PRESSURE_OPACITY_MIN_PERCENT,
  DEFAULT_PRESSURE_SIZE_MIN_PERCENT,
  DEFAULT_SYMMETRY_MODE,
  DEFAULT_STROKE_STABILIZER,
  MAX_PRESSURE_OPACITY_MIN_PERCENT,
  MAX_PRESSURE_SIZE_MIN_PERCENT,
  MAX_BRUSH_SIZE,
  MAX_STROKE_STABILIZER,
  MIN_PRESSURE_OPACITY_MIN_PERCENT,
  MIN_PRESSURE_SIZE_MIN_PERCENT,
  MIN_STROKE_STABILIZER,
} from '@/constants/tools';
import { clamp } from '@/lib/utils/math';

interface ToolState {
  activeTool: ToolType;
  brushSize: number;
  brushShape: BrushShape;
  strokeStabilizer: number;
  freehandAlgorithm: FreehandAlgorithm;
  freehandTracePolicy: FreehandTracePolicy;
  symmetryMode: SymmetryMode;
  symmetryAxisX: number | null;
  symmetryAxisY: number | null;
  pressureEnabled: boolean;
  pressureAffectsSize: boolean;
  pressureAffectsOpacity: boolean;
  pressureSizeMinPercent: number;
  pressureOpacityMinPercent: number;
  setTool: (tool: ToolType) => void;
  setBrushSize: (size: number) => void;
  setBrushShape: (shape: BrushShape) => void;
  setStrokeStabilizer: (value: number) => void;
  setFreehandAlgorithm: (value: FreehandAlgorithm) => void;
  setFreehandTracePolicy: (value: FreehandTracePolicy) => void;
  toggleFreehandTracePolicy: () => void;
  togglePixelPerfectMode: () => void;
  setSymmetryMode: (value: SymmetryMode) => void;
  setSymmetryAxisX: (value: number) => void;
  setSymmetryAxisY: (value: number) => void;
  setPressureEnabled: (value: boolean) => void;
  setPressureAffectsSize: (value: boolean) => void;
  setPressureAffectsOpacity: (value: boolean) => void;
  setPressureSizeMinPercent: (value: number) => void;
  setPressureOpacityMinPercent: (value: number) => void;
}

export const useToolStore = create<ToolState>((set) => ({
  activeTool: 'brush',
  brushSize: DEFAULT_BRUSH_SIZE,
  brushShape: DEFAULT_BRUSH_SHAPE,
  strokeStabilizer: DEFAULT_STROKE_STABILIZER,
  freehandAlgorithm: DEFAULT_FREEHAND_ALGORITHM,
  freehandTracePolicy: DEFAULT_FREEHAND_TRACE_POLICY,
  symmetryMode: DEFAULT_SYMMETRY_MODE,
  symmetryAxisX: null,
  symmetryAxisY: null,
  pressureEnabled: DEFAULT_PRESSURE_ENABLED,
  pressureAffectsSize: DEFAULT_PRESSURE_AFFECTS_SIZE,
  pressureAffectsOpacity: DEFAULT_PRESSURE_AFFECTS_OPACITY,
  pressureSizeMinPercent: DEFAULT_PRESSURE_SIZE_MIN_PERCENT,
  pressureOpacityMinPercent: DEFAULT_PRESSURE_OPACITY_MIN_PERCENT,
  setTool: (tool) => set({ activeTool: tool }),
  setBrushSize: (size) => set({ brushSize: clamp(size, 1, MAX_BRUSH_SIZE) }),
  setBrushShape: (shape) => set({ brushShape: shape }),
  setStrokeStabilizer: (value) =>
    set({ strokeStabilizer: clamp(value, MIN_STROKE_STABILIZER, MAX_STROKE_STABILIZER) }),
  setFreehandAlgorithm: (value) => set({ freehandAlgorithm: value }),
  setFreehandTracePolicy: (value) => set({ freehandTracePolicy: value }),
  toggleFreehandTracePolicy: () => set((state) => ({
    freehandTracePolicy:
      state.freehandTracePolicy === 'accumulate' ? 'accumulateUpdateLast' : 'accumulate',
  })),
  togglePixelPerfectMode: () => set((state) => ({
    freehandAlgorithm: state.freehandAlgorithm === 'pixelPerfect' ? 'default' : 'pixelPerfect',
  })),
  setSymmetryMode: (value) => set({ symmetryMode: value }),
  setSymmetryAxisX: (value) => set({ symmetryAxisX: Math.max(0, Math.round(value)) }),
  setSymmetryAxisY: (value) => set({ symmetryAxisY: Math.max(0, Math.round(value)) }),
  setPressureEnabled: (value) => set({ pressureEnabled: value }),
  setPressureAffectsSize: (value) => set({ pressureAffectsSize: value }),
  setPressureAffectsOpacity: (value) => set({ pressureAffectsOpacity: value }),
  setPressureSizeMinPercent: (value) =>
    set({ pressureSizeMinPercent: clamp(value, MIN_PRESSURE_SIZE_MIN_PERCENT, MAX_PRESSURE_SIZE_MIN_PERCENT) }),
  setPressureOpacityMinPercent: (value) =>
    set({ pressureOpacityMinPercent: clamp(value, MIN_PRESSURE_OPACITY_MIN_PERCENT, MAX_PRESSURE_OPACITY_MIN_PERCENT) }),
}));
