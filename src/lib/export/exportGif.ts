import type { Layer } from '@/types/layer';
import type { Frame } from '@/types/frame';
import { PixelBuffer } from '@/lib/canvas/PixelBuffer';
import { GIFEncoder, quantize, applyPalette } from 'gifenc';

interface ExportGifOptions {
  fps?: number;
  scale?: number;
  outputWidth?: number;
  outputHeight?: number;
  filename?: string;
}

function resolveOutputSize(
  width: number,
  height: number,
  options: ExportGifOptions
): { width: number; height: number } {
  const safeWidth = Math.max(1, Math.round(width));
  const safeHeight = Math.max(1, Math.round(height));

  if (typeof options.outputWidth === 'number' && Number.isFinite(options.outputWidth)) {
    const outWidth = Math.max(1, Math.round(options.outputWidth));
    const ratio = safeHeight / safeWidth;
    return { width: outWidth, height: Math.max(1, Math.round(outWidth * ratio)) };
  }

  if (typeof options.outputHeight === 'number' && Number.isFinite(options.outputHeight)) {
    const outHeight = Math.max(1, Math.round(options.outputHeight));
    const ratio = safeWidth / safeHeight;
    return { width: Math.max(1, Math.round(outHeight * ratio)), height: outHeight };
  }

  const scale = Math.max(1, Math.round(options.scale ?? 1));
  return { width: safeWidth * scale, height: safeHeight * scale };
}

export function exportGif(
  frames: Frame[],
  layers: Layer[],
  width: number,
  height: number,
  options: ExportGifOptions = {}
): void {
  const fps = Math.max(1, Math.round(options.fps ?? 12));
  const { width: sw, height: sh } = resolveOutputSize(width, height, options);
  const filename = options.filename ?? 'animation.gif';
  const gif = GIFEncoder();
  const fallbackDelay = Math.max(1, Math.round(1000 / fps));

  for (const frame of frames) {
    const canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    for (const layer of layers) {
      if (!layer.visible) continue;
      const data = frame.layerData[layer.id];
      if (!data) continue;

      const buffer = new PixelBuffer(width, height, data);
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCtx.putImageData(buffer.toImageData(), 0, 0);

      ctx.globalAlpha = layer.opacity;
      ctx.drawImage(tempCanvas, 0, 0, sw, sh);
    }

    const imageData = ctx.getImageData(0, 0, sw, sh);
    const palette = quantize(imageData.data, 256);
    const index = applyPalette(imageData.data, palette);
    const frameDelay = Math.max(1, Math.round(frame.duration || fallbackDelay));
    gif.writeFrame(index, sw, sh, { palette, delay: frameDelay });
  }

  gif.finish();
  const bytes = gif.bytes();
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'image/gif' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
