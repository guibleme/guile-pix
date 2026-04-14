import type { Point, SymmetryMode } from '@/types/tool';

interface SymmetryParams {
  symmetryMode: SymmetryMode;
  symmetryAxisX: number;
  symmetryAxisY: number;
  brushSize: number;
}

function reflectCoordinate(value: number, axis: number, adjust: number): number {
  // LibreSprite parity: reflected = axis - (value - axis + adjust)
  return Math.round(axis - (value - axis + adjust));
}

export function getSymmetryPoints(x: number, y: number, params: SymmetryParams): Point[] {
  const points = new Map<string, Point>();
  const push = (px: number, py: number) => {
    points.set(`${px},${py}`, { x: px, y: py });
  };

  push(x, y);

  const safeBrushSize = Math.max(1, Math.round(params.brushSize));
  const adjustX = safeBrushSize % 2;
  const adjustY = safeBrushSize % 2;
  const reflectX = reflectCoordinate(x, params.symmetryAxisX, adjustX);
  const reflectY = reflectCoordinate(y, params.symmetryAxisY, adjustY);

  if (params.symmetryMode === 'horizontal' || params.symmetryMode === 'both') {
    push(reflectX, y);
  }
  if (params.symmetryMode === 'vertical' || params.symmetryMode === 'both') {
    push(x, reflectY);
  }
  if (params.symmetryMode === 'both') {
    push(reflectX, reflectY);
  }

  return [...points.values()];
}
