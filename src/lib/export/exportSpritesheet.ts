import type { Layer } from '@/types/layer';
import type { Frame } from '@/types/frame';
import { PixelBuffer } from '@/lib/canvas/PixelBuffer';

type AsepriteDataFormat = 'json-array' | 'json-hash';

interface ExportSpritesheetOptions {
  columns?: number;
  scale?: number;
  filename?: string;
  asepriteDataFormat?: AsepriteDataFormat | null;
  dataFilename?: string;
  appName?: string;
}

interface AsepriteFrameRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface AsepriteFrameEntry {
  filename: string;
  frame: AsepriteFrameRect;
  rotated: false;
  trimmed: false;
  spriteSourceSize: AsepriteFrameRect;
  sourceSize: { w: number; h: number };
  duration: number;
}

function buildAsepriteMetadata(
  frames: Frame[],
  layers: Layer[],
  width: number,
  height: number,
  columns: number,
  scale: number,
  sheetWidth: number,
  sheetHeight: number,
  imageFilename: string,
  appName: string,
  format: AsepriteDataFormat
) {
  const frameW = width * scale;
  const frameH = height * scale;

  const frameEntries = frames.map((frame, i) => {
    const col = i % columns;
    const row = Math.floor(i / columns);
    const rect: AsepriteFrameRect = {
      x: col * frameW,
      y: row * frameH,
      w: frameW,
      h: frameH,
    };
    const filename = `${imageFilename.replace(/\.png$/i, '')} ${i}.png`;

    return {
      filename,
      frame: rect,
      rotated: false as const,
      trimmed: false as const,
      spriteSourceSize: { x: 0, y: 0, w: frameW, h: frameH },
      sourceSize: { w: frameW, h: frameH },
      duration: Math.max(1, Math.round(frame.duration)),
    };
  });

  const framesPayload = format === 'json-hash'
    ? Object.fromEntries(frameEntries.map((entry) => [entry.filename, entry]))
    : frameEntries;

  return {
    frames: framesPayload,
    meta: {
      app: appName,
      version: '1.0',
      image: imageFilename,
      format: 'RGBA8888',
      size: { w: sheetWidth, h: sheetHeight },
      scale: String(scale),
      frameTags: [
        {
          name: 'default',
          from: 0,
          to: Math.max(0, frames.length - 1),
          direction: 'forward',
        },
      ],
      layers: layers.map((layer) => ({
        name: layer.name,
        opacity: Math.round(layer.opacity * 255),
        blendMode: layer.blendMode,
      })),
      slices: [] as unknown[],
    },
  };
}

function downloadTextAsJson(text: string, filename: string): void {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportSpritesheet(
  frames: Frame[],
  layers: Layer[],
  width: number,
  height: number,
  options: ExportSpritesheetOptions = {}
): void {
  const columns = Math.max(1, Math.round(options.columns ?? 4));
  const scale = Math.max(1, Math.round(options.scale ?? 1));
  const filename = options.filename ?? 'spritesheet.png';
  const dataFilename = options.dataFilename ?? filename.replace(/\.png$/i, '.json');
  const appName = options.appName ?? 'https://github.com/Seto92/DogSprite';
  const asepriteDataFormat = options.asepriteDataFormat ?? null;
  const rows = Math.ceil(frames.length / columns);
  const canvas = document.createElement('canvas');
  canvas.width = columns * width * scale;
  canvas.height = rows * height * scale;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  frames.forEach((frame, i) => {
    const col = i % columns;
    const row = Math.floor(i / columns);
    const offsetX = col * width * scale;
    const offsetY = row * height * scale;

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
      ctx.drawImage(tempCanvas, offsetX, offsetY, width * scale, height * scale);
    }
  });

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    if (asepriteDataFormat) {
      const metadata = buildAsepriteMetadata(
        frames,
        layers,
        width,
        height,
        columns,
        scale,
        canvas.width,
        canvas.height,
        filename,
        appName,
        asepriteDataFormat
      );
      downloadTextAsJson(JSON.stringify(metadata, null, 2), dataFilename);
    }
  }, 'image/png');
}
