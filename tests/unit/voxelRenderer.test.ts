import { describe, expect, it } from 'vitest';
import { renderVoxelView, getViewDimensions } from '@/lib/ai/voxelRenderer';
import { buildVoxelGrid } from '@/lib/ai/voxelBuilder';
import type { DepthMap, VoxelGrid } from '@/types/rotation3d';

function makeFilledGrid(w: number, h: number, depth: number, color: [number, number, number, number] = [255, 0, 0, 255]): {
  grid: VoxelGrid;
  px: Uint8ClampedArray;
} {
  const px = new Uint8ClampedArray(w * h * 4);
  const depthData = new Float32Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      px[idx] = color[0];
      px[idx + 1] = color[1];
      px[idx + 2] = color[2];
      px[idx + 3] = color[3];
      depthData[y * w + x] = 0.8;
    }
  }

  const dm: DepthMap = { width: w, height: h, data: depthData };
  const grid = buildVoxelGrid(px, w, h, dm, depth);
  return { grid, px };
}

describe('voxelRenderer', () => {
  describe('getViewDimensions', () => {
    it('returns sprite size for N view', () => {
      const { grid } = makeFilledGrid(8, 8, 16);
      const dims = getViewDimensions(grid, 'N');
      expect(dims.width).toBe(8);
      expect(dims.height).toBe(8);
    });

    it('returns sprite size for S view', () => {
      const { grid } = makeFilledGrid(8, 8, 16);
      const dims = getViewDimensions(grid, 'S');
      expect(dims.width).toBe(8);
      expect(dims.height).toBe(8);
    });

    it('returns depth × height for E view', () => {
      const { grid } = makeFilledGrid(8, 8, 16);
      const dims = getViewDimensions(grid, 'E');
      expect(dims.width).toBe(16); // sizeZ
      expect(dims.height).toBe(8); // sizeY
    });

    it('returns correct diagonal dimensions', () => {
      const { grid } = makeFilledGrid(8, 8, 16);
      const dims = getViewDimensions(grid, 'NE');
      expect(dims.width).toBeGreaterThan(8);
      expect(dims.height).toBe(8);
    });
  });

  describe('renderVoxelView', () => {
    it('renders front view (N) with opaque pixels', () => {
      const { grid } = makeFilledGrid(4, 4, 8, [255, 0, 0, 255]);
      const output = renderVoxelView(grid, 'N');
      const dims = getViewDimensions(grid, 'N');

      expect(output.length).toBe(dims.width * dims.height * 4);

      // At least some pixels should be opaque
      let opaqueCount = 0;
      for (let i = 3; i < output.length; i += 4) {
        if (output[i] > 0) opaqueCount++;
      }
      expect(opaqueCount).toBeGreaterThan(0);
    });

    it('renders side view (E) with opaque pixels', () => {
      const { grid } = makeFilledGrid(4, 4, 8, [0, 255, 0, 255]);
      const output = renderVoxelView(grid, 'E');
      const dims = getViewDimensions(grid, 'E');

      expect(output.length).toBe(dims.width * dims.height * 4);

      let opaqueCount = 0;
      for (let i = 3; i < output.length; i += 4) {
        if (output[i] > 0) opaqueCount++;
      }
      expect(opaqueCount).toBeGreaterThan(0);
    });

    it('renders back view (S)', () => {
      const { grid } = makeFilledGrid(4, 4, 8);
      const output = renderVoxelView(grid, 'S');
      expect(output.length).toBeGreaterThan(0);
    });

    it('renders diagonal view (NE)', () => {
      const { grid } = makeFilledGrid(4, 4, 8);
      const output = renderVoxelView(grid, 'NE');
      const dims = getViewDimensions(grid, 'NE');
      expect(output.length).toBe(dims.width * dims.height * 4);
    });

    it('renders empty output for empty grid', () => {
      const w = 4, h = 4, layers = 8;
      const px = new Uint8ClampedArray(w * h * 4); // all transparent
      const dm: DepthMap = { width: w, height: h, data: new Float32Array(w * h) };
      const grid = buildVoxelGrid(px, w, h, dm, layers);

      const output = renderVoxelView(grid, 'N');
      // All pixels should be transparent
      for (let i = 3; i < output.length; i += 4) {
        expect(output[i]).toBe(0);
      }
    });

    it('applies palette constraining when provided', () => {
      const { grid } = makeFilledGrid(4, 4, 8, [100, 150, 200, 255]);
      const palette = [
        { r: 255, g: 0, b: 0, a: 255 },
        { r: 0, g: 255, b: 0, a: 255 },
        { r: 0, g: 0, b: 255, a: 255 },
      ];

      const output = renderVoxelView(grid, 'N', palette);

      // All opaque pixels should match one of the palette colors
      for (let i = 0; i < output.length; i += 4) {
        if (output[i + 3] === 0) continue;
        const r = output[i], g = output[i + 1], b = output[i + 2];
        const matchesPalette = palette.some(
          (pc) => r === pc.r && g === pc.g && b === pc.b
        );
        expect(matchesPalette).toBe(true);
      }
    });
  });
});
