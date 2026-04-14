import type { AIGenerationResult, LightDirection } from '@/types/ai';

const DIRECTION_OFFSETS: Record<LightDirection, [number, number]> = {
  'top-left': [-1, -1],
  'top': [0, -1],
  'top-right': [1, -1],
  'left': [-1, 0],
  'right': [1, 0],
  'bottom-left': [-1, 1],
  'bottom': [0, 1],
  'bottom-right': [1, 1],
};

export async function generateShading(
  sourcePixels: Uint8ClampedArray,
  width: number,
  height: number,
  lightDirection: LightDirection,
  onProgress?: (progress: number) => void
): Promise<AIGenerationResult> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (onProgress) onProgress(30);

  const result = new Uint8ClampedArray(sourcePixels);
  const [ldx, ldy] = DIRECTION_OFFSETS[lightDirection];

  // Simple edge-detection based shading
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      if (sourcePixels[i + 3] === 0) continue;

      // Check if pixel is on an edge facing the light
      const lightSideX = x + ldx;
      const lightSideY = y + ldy;
      const shadowSideX = x - ldx;
      const shadowSideY = y - ldy;

      if (lightSideX >= 0 && lightSideX < width && lightSideY >= 0 && lightSideY < height) {
        const li = (lightSideY * width + lightSideX) * 4;
        if (sourcePixels[li + 3] === 0) {
          // Edge facing light - add highlight
          result[i] = Math.min(255, sourcePixels[i] + 40);
          result[i + 1] = Math.min(255, sourcePixels[i + 1] + 40);
          result[i + 2] = Math.min(255, sourcePixels[i + 2] + 40);
          continue;
        }
      }

      if (shadowSideX >= 0 && shadowSideX < width && shadowSideY >= 0 && shadowSideY < height) {
        const si = (shadowSideY * width + shadowSideX) * 4;
        if (sourcePixels[si + 3] === 0) {
          // Edge facing shadow - add shadow
          result[i] = Math.max(0, sourcePixels[i] - 40);
          result[i + 1] = Math.max(0, sourcePixels[i + 1] - 40);
          result[i + 2] = Math.max(0, sourcePixels[i + 2] - 40);
        }
      }
    }
  }

  if (onProgress) onProgress(100);

  return {
    frames: [{ pixels: result, width, height }],
    status: 'preview',
  };
}
