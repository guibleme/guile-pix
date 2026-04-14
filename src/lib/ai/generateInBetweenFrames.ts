import type { AIGenerationResult } from '@/types/ai';
import { lerpPixelData } from './pixelTransforms';

export async function generateInBetweenFrames(
  frameA: Uint8ClampedArray,
  frameB: Uint8ClampedArray,
  count: number,
  width: number,
  height: number,
  onProgress?: (progress: number) => void
): Promise<AIGenerationResult> {
  const frames: AIGenerationResult['frames'] = [];

  for (let i = 0; i < count; i++) {
    await new Promise((resolve) => setTimeout(resolve, 150));

    const t = (i + 1) / (count + 1);
    const pixels = lerpPixelData(frameA, frameB, t);
    frames.push({ pixels, width, height });

    if (onProgress) {
      onProgress(Math.round(((i + 1) / count) * 100));
    }
  }

  return { frames, status: 'preview' };
}
