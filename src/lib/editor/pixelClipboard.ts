export interface PixelClipboardPayload {
  pixels: Uint8ClampedArray;
  width: number;
  height: number;
  sourceRect?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  origin: 'selection' | 'layer';
}

let pixelClipboard: PixelClipboardPayload | null = null;

export function setPixelClipboard(payload: PixelClipboardPayload): void {
  pixelClipboard = {
    ...payload,
    pixels: new Uint8ClampedArray(payload.pixels),
    sourceRect: payload.sourceRect ? { ...payload.sourceRect } : undefined,
  };
}

export function getPixelClipboard(): PixelClipboardPayload | null {
  if (!pixelClipboard) return null;
  return {
    ...pixelClipboard,
    pixels: new Uint8ClampedArray(pixelClipboard.pixels),
    sourceRect: pixelClipboard.sourceRect ? { ...pixelClipboard.sourceRect } : undefined,
  };
}

export function hasPixelClipboard(): boolean {
  return Boolean(pixelClipboard);
}

export function clearPixelClipboard(): void {
  pixelClipboard = null;
}
