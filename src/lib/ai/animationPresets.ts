import type { AnimationType } from '@/types/animation';
import { shiftPixels, scalePixels, mirrorPixelsH } from './pixelTransforms';

export interface TransformStep {
  dx: number;
  dy: number;
  scaleY?: number;
  mirror?: boolean;
}

export const PRESET_TRANSFORMS: Partial<Record<AnimationType, TransformStep[]>> = {
  idle: [
    { dx: 0, dy: 0 },
    { dx: 0, dy: -1, scaleY: 1.02 },
    { dx: 0, dy: 0 },
    { dx: 0, dy: 1, scaleY: 0.98 },
  ],
  walk: [
    { dx: 0, dy: 0 },
    { dx: 1, dy: -1 },
    { dx: 2, dy: 0 },
    { dx: 1, dy: 0, mirror: true },
    { dx: -1, dy: -1 },
    { dx: 0, dy: 0 },
  ],
  attack: [
    { dx: 0, dy: 0 },
    { dx: -2, dy: 0 },
    { dx: 3, dy: -1 },
    { dx: 4, dy: 0 },
    { dx: 1, dy: 0 },
  ],
  custom: [
    { dx: 0, dy: 0 },
  ],
};

export function applyTransformStep(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  step: TransformStep
): Uint8ClampedArray {
  let result = shiftPixels(data, width, height, step.dx, step.dy);
  if (step.scaleY && step.scaleY !== 1) {
    result = scalePixels(result, width, height, 1, step.scaleY);
  }
  if (step.mirror) {
    result = mirrorPixelsH(result, width, height);
  }
  return result;
}
