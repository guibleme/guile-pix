import type { ToolType, BrushShape, FreehandAlgorithm, FreehandTracePolicy, SymmetryMode } from '@/types/tool';

export const TOOL_LIST: { type: ToolType; label: string; shortcut: string; icon: string }[] = [
  { type: 'select', label: 'Select', shortcut: 'M', icon: 'select' },
  { type: 'brush', label: 'Brush', shortcut: 'B', icon: 'brush' },
  { type: 'eraser', label: 'Eraser', shortcut: 'E', icon: 'eraser' },
  { type: 'fill', label: 'Fill', shortcut: 'G', icon: 'fill' },
  { type: 'colorPicker', label: 'Color Picker', shortcut: 'I', icon: 'eyedropper' },
  { type: 'line', label: 'Line', shortcut: 'L', icon: 'line' },
  { type: 'rect', label: 'Rectangle', shortcut: 'R', icon: 'rect' },
];

export const DEFAULT_BRUSH_SIZE = 1;
export const MAX_BRUSH_SIZE = 32;
export const DEFAULT_BRUSH_SHAPE: BrushShape = 'square';
export const DEFAULT_STROKE_STABILIZER = 2;
export const MIN_STROKE_STABILIZER = 0;
export const MAX_STROKE_STABILIZER = 20;
export const DEFAULT_FREEHAND_ALGORITHM: FreehandAlgorithm = 'default';
export const FREEHAND_ALGORITHM_LIST: Array<{ value: FreehandAlgorithm; label: string; shortLabel: string }> = [
  { value: 'default', label: 'Default', shortLabel: 'DF' },
  { value: 'pixelPerfect', label: 'Pixel Perfect', shortLabel: 'PP' },
  { value: 'dots', label: 'Dots', shortLabel: 'DT' },
];
export const DEFAULT_FREEHAND_TRACE_POLICY: FreehandTracePolicy = 'accumulate';
export const FREEHAND_TRACE_POLICY_LIST: Array<{ value: FreehandTracePolicy; label: string; shortLabel: string }> = [
  { value: 'accumulate', label: 'Accumulate', shortLabel: 'AC' },
  { value: 'accumulateUpdateLast', label: 'Update Last', shortLabel: 'UL' },
];
export const DEFAULT_SYMMETRY_MODE: SymmetryMode = 'none';
export const DEFAULT_PRESSURE_ENABLED = true;
export const DEFAULT_PRESSURE_AFFECTS_SIZE = true;
export const DEFAULT_PRESSURE_AFFECTS_OPACITY = false;
export const MIN_PRESSURE_SIZE_MIN_PERCENT = 10;
export const MAX_PRESSURE_SIZE_MIN_PERCENT = 100;
export const DEFAULT_PRESSURE_SIZE_MIN_PERCENT = 35;
export const MIN_PRESSURE_OPACITY_MIN_PERCENT = 0;
export const MAX_PRESSURE_OPACITY_MIN_PERCENT = 100;
export const DEFAULT_PRESSURE_OPACITY_MIN_PERCENT = 20;
