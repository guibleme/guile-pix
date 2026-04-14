import type { AnimationType } from './animation';

export type AIGenerationStatus = 'idle' | 'generating' | 'preview' | 'error';

export type LightDirection = 'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';
export type AnimationFacing = 'right' | 'left';

export interface AIGenerationRequest {
  type: 'animation' | 'inbetween' | 'shading';
  animationType?: AnimationType;
  facing?: AnimationFacing;
  frameCount?: number;
  lightDirection?: LightDirection;
  sourceFrameIds?: string[];
}

export interface AIGenerationResult {
  frames: Array<{
    pixels: Uint8ClampedArray;
    width: number;
    height: number;
  }>;
  status: AIGenerationStatus;
  error?: string;
}
