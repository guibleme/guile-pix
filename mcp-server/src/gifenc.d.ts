declare module 'gifenc' {
  interface Encoder {
    writeFrame(index: Uint8Array, width: number, height: number, opts?: { palette?: number[][]; delay?: number; repeat?: number; transparent?: boolean; transparentIndex?: number }): void;
    finish(): void;
    bytes(): Uint8Array;
  }

  interface Gifenc {
    GIFEncoder(): Encoder;
    quantize(rgba: Uint8ClampedArray | number[], maxColors: number, opts?: Record<string, unknown>): number[][];
    applyPalette(rgba: Uint8ClampedArray | number[], palette: number[][], format?: string): Uint8Array;
  }

  const gifenc: Gifenc;
  export const GIFEncoder: Gifenc['GIFEncoder'];
  export const quantize: Gifenc['quantize'];
  export const applyPalette: Gifenc['applyPalette'];
  export default gifenc;
}
