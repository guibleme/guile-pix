import { PNG } from 'pngjs';
import type { McpProject } from './project.js';
import { PixelBuffer, type RGBA } from './lib/pixelBuffer.js';

/**
 * Composite all visible layers bottom-up into a single PixelBuffer.
 * Uses simple alpha-over compositing.
 */
export function compositeProject(project: McpProject): PixelBuffer {
  const result = new PixelBuffer(project.width, project.height);

  for (const layer of project.layers) {
    if (!layer.visible || layer.opacity <= 0) continue;

    for (let y = 0; y < project.height; y++) {
      for (let x = 0; x < project.width; x++) {
        const src = layer.buffer.getPixel(x, y);
        if (src.a === 0) continue;

        const srcAlpha = (src.a / 255) * layer.opacity;
        if (srcAlpha <= 0) continue;

        const dst = result.getPixel(x, y);
        const dstAlpha = dst.a / 255;

        const outAlpha = srcAlpha + dstAlpha * (1 - srcAlpha);
        if (outAlpha <= 0) continue;

        const outR = Math.round((src.r * srcAlpha + dst.r * dstAlpha * (1 - srcAlpha)) / outAlpha);
        const outG = Math.round((src.g * srcAlpha + dst.g * dstAlpha * (1 - srcAlpha)) / outAlpha);
        const outB = Math.round((src.b * srcAlpha + dst.b * dstAlpha * (1 - srcAlpha)) / outAlpha);
        const outA = Math.round(outAlpha * 255);

        result.setPixel(x, y, { r: outR, g: outG, b: outB, a: outA });
      }
    }
  }

  return result;
}

/**
 * Render a PixelBuffer to PNG with nearest-neighbor upscaling.
 */
export function renderToPng(buffer: PixelBuffer, scale: number): Buffer {
  const outWidth = buffer.width * scale;
  const outHeight = buffer.height * scale;
  const png = new PNG({ width: outWidth, height: outHeight });

  for (let y = 0; y < outHeight; y++) {
    for (let x = 0; x < outWidth; x++) {
      const srcX = Math.floor(x / scale);
      const srcY = Math.floor(y / scale);
      const pixel = buffer.getPixel(srcX, srcY);

      const idx = (y * outWidth + x) * 4;
      png.data[idx] = pixel.r;
      png.data[idx + 1] = pixel.g;
      png.data[idx + 2] = pixel.b;
      png.data[idx + 3] = pixel.a;
    }
  }

  return PNG.sync.write(png);
}

/**
 * Render a single layer to PNG.
 */
export function renderLayerToPng(buffer: PixelBuffer, scale: number): Buffer {
  return renderToPng(buffer, scale);
}

/**
 * Render the full project (composited) to PNG buffer.
 */
export function renderProjectToPng(project: McpProject, scale: number): Buffer {
  const composited = compositeProject(project);
  return renderToPng(composited, scale);
}
