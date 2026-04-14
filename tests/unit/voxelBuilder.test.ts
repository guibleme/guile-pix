import { describe, expect, it } from 'vitest';
import { buildVoxelGrid, getVoxel, getVoxelColor } from '@/lib/ai/voxelBuilder';
import type { DepthMap } from '@/types/rotation3d';

describe('voxelBuilder', () => {
  it('creates a grid with correct dimensions', () => {
    const w = 4, h = 4, layers = 8;
    const px = new Uint8ClampedArray(w * h * 4);
    const dm: DepthMap = { width: w, height: h, data: new Float32Array(w * h) };

    const grid = buildVoxelGrid(px, w, h, dm, layers);
    expect(grid.sizeX).toBe(w);
    expect(grid.sizeY).toBe(h);
    expect(grid.sizeZ).toBe(layers);
    expect(grid.voxels.length).toBe(w * h * layers);
    expect(grid.colors.length).toBe(w * h * layers * 4);
  });

  it('fills no voxels for fully transparent sprite', () => {
    const w = 4, h = 4, layers = 8;
    const px = new Uint8ClampedArray(w * h * 4); // all transparent
    const dm: DepthMap = { width: w, height: h, data: new Float32Array(w * h) };

    const grid = buildVoxelGrid(px, w, h, dm, layers);
    for (let i = 0; i < grid.voxels.length; i++) {
      expect(grid.voxels[i]).toBe(0);
    }
  });

  it('fills voxel column based on depth', () => {
    const w = 1, h = 1, layers = 8;
    const px = new Uint8ClampedArray(4);
    px[0] = 255; px[1] = 128; px[2] = 64; px[3] = 255; // opaque red-ish

    // Depth = 0.5 → zFront = round(0.5 * 7) = 4
    const depthData = new Float32Array(1);
    depthData[0] = 0.5;
    const dm: DepthMap = { width: w, height: h, data: depthData };

    const grid = buildVoxelGrid(px, w, h, dm, layers);

    // Voxels at z=0..4 should be filled
    for (let z = 0; z <= 4; z++) {
      expect(getVoxel(grid, 0, 0, z)).toBe(true);
    }
    // Voxels at z=5..7 should be empty
    for (let z = 5; z < layers; z++) {
      expect(getVoxel(grid, 0, 0, z)).toBe(false);
    }
  });

  it('preserves pixel color in voxels', () => {
    const w = 1, h = 1, layers = 4;
    const px = new Uint8ClampedArray([100, 150, 200, 255]);
    const dm: DepthMap = { width: 1, height: 1, data: new Float32Array([1.0]) };

    const grid = buildVoxelGrid(px, w, h, dm, layers);

    const color = getVoxelColor(grid, 0, 0, 0);
    expect(color).not.toBeNull();
    expect(color![0]).toBe(100);
    expect(color![1]).toBe(150);
    expect(color![2]).toBe(200);
    expect(color![3]).toBe(255);
  });

  it('getVoxel returns false for out-of-bounds', () => {
    const w = 2, h = 2, layers = 4;
    const px = new Uint8ClampedArray(w * h * 4);
    const dm: DepthMap = { width: w, height: h, data: new Float32Array(w * h) };
    const grid = buildVoxelGrid(px, w, h, dm, layers);

    expect(getVoxel(grid, -1, 0, 0)).toBe(false);
    expect(getVoxel(grid, 0, -1, 0)).toBe(false);
    expect(getVoxel(grid, 0, 0, -1)).toBe(false);
    expect(getVoxel(grid, w, 0, 0)).toBe(false);
    expect(getVoxel(grid, 0, h, 0)).toBe(false);
    expect(getVoxel(grid, 0, 0, layers)).toBe(false);
  });

  it('front view reproduces original sprite', () => {
    // If depth = max (1.0) for all pixels, all Z layers are filled.
    // A front view (N) should hit z=maxLayers-1 first (the front) and get the original color.
    const w = 4, h = 4, layers = 8;
    const px = new Uint8ClampedArray(w * h * 4);
    const depthData = new Float32Array(w * h);

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        px[idx] = x * 60;     // R varies with x
        px[idx + 1] = y * 60; // G varies with y
        px[idx + 2] = 128;
        px[idx + 3] = 255;
        depthData[y * w + x] = 0.8; // high depth
      }
    }

    const dm: DepthMap = { width: w, height: h, data: depthData };
    const grid = buildVoxelGrid(px, w, h, dm, layers);

    // The front-most voxel at (x, y) should have the original pixel color
    const zFront = Math.round(0.8 * (layers - 1)); // = 6
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const color = getVoxelColor(grid, x, y, zFront);
        expect(color).not.toBeNull();
        expect(color![0]).toBe(x * 60);
        expect(color![1]).toBe(y * 60);
      }
    }
  });
});
