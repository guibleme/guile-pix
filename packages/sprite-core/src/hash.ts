import { canonicalJson } from './document.js';
import { compositeFrame } from './composite.js';
import type { SpriteDocumentV2 } from './types.js';

function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function sha256Hex(value: string | Uint8Array): Promise<string> {
  if (!globalThis.crypto?.subtle) throw new Error('Web Crypto SHA-256 is unavailable');
  const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value;
  const digestInput = new Uint8Array(bytes.byteLength);
  digestInput.set(bytes);
  return toHex(await globalThis.crypto.subtle.digest('SHA-256', digestInput.buffer));
}

export function semanticProjection(document: SpriteDocumentV2): unknown {
  return {
    version: document.version,
    project: {
      id: document.project.id,
      name: document.project.name,
      width: document.project.width,
      height: document.project.height,
    },
    layers: document.layers,
    cels: document.cels,
    frames: document.frames,
    clip: document.clip,
    clips: document.clips,
    activeClipId: document.activeClipId,
    production: document.production,
    palette: document.palette,
    pivotPx: document.pivotPx,
    source: document.source ?? null,
  };
}

export async function hashDocumentSemantic(document: SpriteDocumentV2): Promise<string> {
  return sha256Hex(canonicalJson(semanticProjection(document)));
}

export async function hashDocumentPixels(document: SpriteDocumentV2): Promise<string> {
  const projection = {
    width: document.project.width,
    height: document.project.height,
    frames: document.frames.map((frame) => ({
      id: frame.id,
      pixels: Array.from(compositeFrame(document, frame.id)),
    })),
  };
  return sha256Hex(canonicalJson(projection));
}
