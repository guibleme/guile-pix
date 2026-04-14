// ─── Voxel Builder ──────────────────────────────────────────────────────
// Converts a 2D sprite + depth map into a 3D voxel grid.
//
// Algorithm: Depth-based extrusion
// For each non-transparent pixel at (x, y):
//   1. Read depth value d ∈ [0, 1] from the depth map
//   2. Compute front z-index: zFront = round(d × (maxLayers - 1))
//   3. Fill voxels from z = 0 to z = zFront in column (x, y)
//   4. Assign the pixel's RGBA color to all voxels in that column
//
// The resulting 3D grid has the property that the front view (N)
// exactly reproduces the original sprite. Side views reveal the
// depth profile.

import type { DepthMap, VoxelGrid } from '@/types/rotation3d';

/**
 * Build a voxel grid from a 2D sprite and its depth map.
 *
 * The grid is indexed as: voxels[z * sizeY * sizeX + y * sizeX + x]
 * Colors are stored as: colors[(z * sizeY * sizeX + y * sizeX + x) * 4 + channel]
 *
 * @param pixels - Source sprite RGBA data
 * @param width - Sprite width
 * @param height - Sprite height
 * @param depthMap - Per-pixel depth values [0, 1]
 * @param maxDepthLayers - Z resolution of the voxel grid (e.g., 8, 16, 32)
 */
export function buildVoxelGrid(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  depthMap: DepthMap,
  maxDepthLayers: number
): VoxelGrid {
  const sizeX = width;
  const sizeY = height;
  const sizeZ = maxDepthLayers;
  const totalVoxels = sizeX * sizeY * sizeZ;

  const voxels = new Uint8Array(totalVoxels);
  const colors = new Uint8ClampedArray(totalVoxels * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIdx = (y * width + x) * 4;
      const alpha = pixels[pixelIdx + 3];

      if (alpha === 0) continue; // skip transparent pixels

      // Read depth value and compute front z-index
      const depth = depthMap.data[y * width + x];
      const zFront = Math.round(depth * (maxDepthLayers - 1));

      // Read pixel color
      const r = pixels[pixelIdx];
      const g = pixels[pixelIdx + 1];
      const b = pixels[pixelIdx + 2];

      // Fill voxel column from z=0 (back) to z=zFront (front)
      for (let z = 0; z <= zFront; z++) {
        const voxelIdx = z * sizeY * sizeX + y * sizeX + x;
        voxels[voxelIdx] = 1;

        const colorIdx = voxelIdx * 4;
        colors[colorIdx] = r;
        colors[colorIdx + 1] = g;
        colors[colorIdx + 2] = b;
        colors[colorIdx + 3] = alpha;
      }
    }
  }

  return { sizeX, sizeY, sizeZ, voxels, colors };
}

/**
 * Get voxel value at (x, y, z) with bounds checking.
 */
export function getVoxel(grid: VoxelGrid, x: number, y: number, z: number): boolean {
  if (x < 0 || x >= grid.sizeX || y < 0 || y >= grid.sizeY || z < 0 || z >= grid.sizeZ) {
    return false;
  }
  return grid.voxels[z * grid.sizeY * grid.sizeX + y * grid.sizeX + x] !== 0;
}

/**
 * Get voxel color at (x, y, z).
 * Returns [r, g, b, a] or null if empty.
 */
export function getVoxelColor(
  grid: VoxelGrid,
  x: number, y: number, z: number
): [number, number, number, number] | null {
  if (x < 0 || x >= grid.sizeX || y < 0 || y >= grid.sizeY || z < 0 || z >= grid.sizeZ) {
    return null;
  }
  const idx = z * grid.sizeY * grid.sizeX + y * grid.sizeX + x;
  if (grid.voxels[idx] === 0) return null;
  const ci = idx * 4;
  return [grid.colors[ci], grid.colors[ci + 1], grid.colors[ci + 2], grid.colors[ci + 3]];
}
