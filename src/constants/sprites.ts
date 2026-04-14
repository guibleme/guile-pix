import type { SpriteSize } from '@/types/project';

export const SPRITE_SIZES: { value: SpriteSize; label: string }[] = [
  { value: 8, label: '8 x 8' },
  { value: 16, label: '16 x 16' },
  { value: 32, label: '32 x 32' },
  { value: 64, label: '64 x 64' },
  { value: 128, label: '128 x 128' },
];

export const DEFAULT_SPRITE_SIZE: SpriteSize = 32;
