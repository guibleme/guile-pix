import type { BlendMode, SpriteDocumentV2 } from './types.js';

function blendChannel(backdrop: number, source: number, mode: BlendMode): number {
  if (mode === 'multiply') return backdrop * source;
  if (mode === 'screen') return backdrop + source - backdrop * source;
  if (mode === 'overlay') return backdrop <= 0.5
    ? 2 * backdrop * source
    : 1 - 2 * (1 - backdrop) * (1 - source);
  return source;
}

function compositePixel(
  output: Uint8ClampedArray,
  source: number[],
  offset: number,
  opacity: number,
  mode: BlendMode,
): void {
  const sourceAlpha = (source[offset + 3] / 255) * opacity;
  if (sourceAlpha <= 0) return;
  const backdropAlpha = output[offset + 3] / 255;
  const outputAlpha = sourceAlpha + backdropAlpha * (1 - sourceAlpha);

  for (let channel = 0; channel < 3; channel += 1) {
    const sourceColor = source[offset + channel] / 255;
    const backdropColor = output[offset + channel] / 255;
    const blended = blendChannel(backdropColor, sourceColor, mode);
    const premultiplied =
      sourceAlpha * (1 - backdropAlpha) * sourceColor
      + backdropAlpha * (1 - sourceAlpha) * backdropColor
      + sourceAlpha * backdropAlpha * blended;
    output[offset + channel] = Math.round((premultiplied / outputAlpha) * 255);
  }
  output[offset + 3] = Math.round(outputAlpha * 255);
}

export function compositeFrame(document: SpriteDocumentV2, frameId: string): Uint8ClampedArray {
  const frame = document.frames.find((candidate) => candidate.id === frameId);
  if (!frame) throw new Error(`Frame not found: ${frameId}`);
  const output = new Uint8ClampedArray(document.project.width * document.project.height * 4);

  for (const layer of document.layers) {
    if (!layer.visible || layer.opacity <= 0) continue;
    const celId = frame.celRefs[layer.id];
    const cel = document.cels[celId];
    if (!cel) throw new Error(`Cel not found: ${celId}`);
    for (let offset = 0; offset < cel.data.length; offset += 4) {
      compositePixel(output, cel.data, offset, layer.opacity, layer.blendMode);
    }
  }
  return output;
}
