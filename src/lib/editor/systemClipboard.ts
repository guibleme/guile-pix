import type { PixelClipboardPayload } from '@/lib/editor/pixelClipboard';

interface DecodedPixelImage {
  pixels: Uint8ClampedArray;
  width: number;
  height: number;
}

async function decodeImageBlob(blob: Blob): Promise<DecodedPixelImage | null> {
  if (typeof document === 'undefined') return null;

  try {
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close();
      return null;
    }

    ctx.clearRect(0, 0, bitmap.width, bitmap.height);
    ctx.drawImage(bitmap, 0, 0);
    const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height);
    bitmap.close();

    return {
      pixels: new Uint8ClampedArray(imageData.data),
      width: imageData.width,
      height: imageData.height,
    };
  } catch {
    return null;
  }
}

async function encodeImageBlob(payload: PixelClipboardPayload): Promise<Blob | null> {
  if (typeof document === 'undefined') return null;
  if (payload.width <= 0 || payload.height <= 0) return null;

  const canvas = document.createElement('canvas');
  canvas.width = payload.width;
  canvas.height = payload.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const imageData = new ImageData(new Uint8ClampedArray(payload.pixels), payload.width, payload.height);
  ctx.putImageData(imageData, 0, 0);

  return await new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}

export async function writePixelsToSystemClipboard(payload: PixelClipboardPayload): Promise<boolean> {
  if (typeof navigator === 'undefined') return false;
  if (!navigator.clipboard || typeof navigator.clipboard.write !== 'function') return false;
  if (typeof ClipboardItem === 'undefined') return false;

  const blob = await encodeImageBlob(payload);
  if (!blob) return false;

  try {
    const item = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([item]);
    return true;
  } catch {
    return false;
  }
}

export async function readPixelsFromPasteEvent(data: DataTransfer): Promise<PixelClipboardPayload | null> {
  const items = Array.from(data.items ?? []);
  for (const item of items) {
    if (item.kind !== 'file') continue;
    if (!item.type.startsWith('image/')) continue;
    const file = item.getAsFile();
    if (!file) continue;

    const decoded = await decodeImageBlob(file);
    if (!decoded) continue;

    return {
      pixels: decoded.pixels,
      width: decoded.width,
      height: decoded.height,
      origin: 'layer',
    };
  }

  const files = Array.from(data.files ?? []);
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue;
    const decoded = await decodeImageBlob(file);
    if (!decoded) continue;

    return {
      pixels: decoded.pixels,
      width: decoded.width,
      height: decoded.height,
      origin: 'layer',
    };
  }

  return null;
}

export async function readPixelsFromSystemClipboard(): Promise<PixelClipboardPayload | null> {
  if (typeof navigator === 'undefined') return null;
  if (!navigator.clipboard || typeof navigator.clipboard.read !== 'function') return null;

  try {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      const imageType = item.types.find((type) => type.startsWith('image/'));
      if (!imageType) continue;

      const blob = await item.getType(imageType);
      const decoded = await decodeImageBlob(blob);
      if (!decoded) continue;

      return {
        pixels: decoded.pixels,
        width: decoded.width,
        height: decoded.height,
        origin: 'layer',
      };
    }
  } catch {
    return null;
  }

  return null;
}
