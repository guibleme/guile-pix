import { PNG } from 'pngjs';
import type { AnimationBundle } from '@guile-pix/sprite-core';

export function encodeAnimationAtlas(bundle: AnimationBundle): Buffer {
  const png = new PNG({
    width: bundle.atlasWidth,
    height: bundle.atlasHeight,
    colorType: 6,
    inputColorType: 6,
    bitDepth: 8,
    inputHasAlpha: true,
    fill: false,
  });
  png.data = Buffer.from(bundle.atlasRgba);
  return PNG.sync.write(png, {
    colorType: 6,
    inputColorType: 6,
    bitDepth: 8,
    inputHasAlpha: true,
    deflateChunkSize: 32 * 1024,
    deflateLevel: 9,
    deflateStrategy: 3,
    filterType: 4,
  });
}
