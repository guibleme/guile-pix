import type { Layer } from '@/types/layer';
import type { Frame } from '@/types/frame';
import { PixelBuffer } from '@/lib/canvas/PixelBuffer';

interface ExportPngOptions {
  scale?: number;
  filename?: string;
}

function renderFrameToCanvas(
  frame: Frame,
  layers: Layer[],
  width: number,
  height: number,
  scale: number
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  // Composite layers bottom-up
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
    ctx.drawImage(tempCanvas, 0, 0, width * scale, height * scale);
  }

  return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to export PNG'));
        return;
      }
      resolve(blob);
    }, 'image/png');
  });
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportPng(
  frame: Frame,
  layers: Layer[],
  width: number,
  height: number,
  options: ExportPngOptions = {}
): void {
  const scale = Math.max(1, Math.round(options.scale ?? 1));
  const filename = options.filename ?? 'sprite.png';
  const canvas = renderFrameToCanvas(frame, layers, width, height, scale);

  void canvasToBlob(canvas).then((blob) => {
    downloadBlob(blob, filename);
  }).catch(() => {
    // Fail silently; export UI handles async errors for batch mode.
  });
}

export async function exportPngMultipleSizes(
  frame: Frame,
  layers: Layer[],
  width: number,
  height: number,
  scales: number[],
  baseName = 'sprite'
): Promise<void> {
  const uniqueScales = [...new Set(scales.map((scale) => Math.max(1, Math.round(scale))))]
    .sort((a, b) => a - b);

  for (const scale of uniqueScales) {
    const canvas = renderFrameToCanvas(frame, layers, width, height, scale);
    const blob = await canvasToBlob(canvas);
    const filename = `${baseName}-${width * scale}x${height * scale}.png`;
    downloadBlob(blob, filename);

    // Small gap gives browsers time to queue each download reliably.
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 50);
    });
  }
}
