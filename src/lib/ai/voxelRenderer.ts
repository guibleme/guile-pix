// ─── Voxel Renderer — Orthographic DDA Raycasting ──────────────────────
// Renders a voxel grid from 8 standard viewing angles using
// orthographic projection and Digital Differential Analyzer (DDA)
// ray marching through the 3D grid.
//
// For each output pixel (u, v):
//   1. Compute the ray origin in 3D space based on the viewing angle
//   2. March the ray through the voxel grid (step-by-step)
//   3. Return the first solid voxel's color
//
// Post-processing:
//   - Outline detection: darken pixels adjacent to transparent
//   - Palette constraining: snap colors to nearest palette entry
//
// All math is pure linear algebra — rotation matrices and vector ops.

import type { VoxelGrid, RotationAngle } from '@/types/rotation3d';
import type { RGBA } from '@/types/color';

/**
 * Direction vectors for each viewing angle.
 * forward = direction the camera looks (into the scene)
 * right = camera's right vector (horizontal axis)
 * up is always (0, -1, 0) — Y increases downward in pixel art
 *
 * The 8 compass directions correspond to rotations around the Y axis:
 *   N (front) = looking along -Z
 *   E = looking along +X
 *   S (back) = looking along +Z
 *   W = looking along -X
 *   NE, SE, SW, NW = 45° diagonals
 */
function getViewVectors(angle: RotationAngle): {
  forward: [number, number, number];
  right: [number, number, number];
} {
  const S2 = Math.SQRT1_2; // 1/√2 ≈ 0.7071

  switch (angle) {
    case 'N':  return { forward: [0, 0, -1],     right: [1, 0, 0] };
    case 'NE': return { forward: [S2, 0, -S2],   right: [S2, 0, S2] };
    case 'E':  return { forward: [1, 0, 0],      right: [0, 0, 1] };
    case 'SE': return { forward: [S2, 0, S2],    right: [-S2, 0, S2] };
    case 'S':  return { forward: [0, 0, 1],      right: [-1, 0, 0] };
    case 'SW': return { forward: [-S2, 0, S2],   right: [-S2, 0, -S2] };
    case 'W':  return { forward: [-1, 0, 0],     right: [0, 0, -1] };
    case 'NW': return { forward: [-S2, 0, -S2],  right: [S2, 0, -S2] };
  }
}

/**
 * Render the voxel grid from a given viewing angle.
 *
 * Uses orthographic projection with DDA ray marching:
 *
 * For each output pixel (u, v):
 *   ray_origin = center + right × (u - w/2) + up × (v - h/2) - forward × maxDepth
 *   March along forward direction, one grid cell at a time.
 *   First solid voxel hit → write its color to output.
 *
 * The output dimensions match the input sprite dimensions (sizeX × sizeY).
 */
export function renderVoxelView(
  grid: VoxelGrid,
  angle: RotationAngle,
  palette?: RGBA[]
): Uint8ClampedArray {
  const { sizeX, sizeY, sizeZ } = grid;

  // For diagonal views, the output may need to be wider to fit the rotated volume
  const isDiagonal = angle === 'NE' || angle === 'SE' || angle === 'SW' || angle === 'NW';
  const isSide = angle === 'E' || angle === 'W';

  // Compute output dimensions based on viewing angle
  let outW: number, outH: number;
  if (isSide) {
    outW = sizeZ; // side view: width = depth
    outH = sizeY;
  } else if (isDiagonal) {
    // Diagonal view: projection of sizeX × sizeZ onto the viewing plane
    const projW = Math.ceil((sizeX + sizeZ) * Math.SQRT1_2);
    outW = projW;
    outH = sizeY;
  } else {
    // N or S: front/back view
    outW = sizeX;
    outH = sizeY;
  }

  const output = new Uint8ClampedArray(outW * outH * 4);
  const { forward, right } = getViewVectors(angle);
  const up: [number, number, number] = [0, 1, 0]; // Y-down

  // Center of the voxel grid
  const cx = sizeX / 2;
  const cy = sizeY / 2;
  const cz = sizeZ / 2;

  // Maximum ray march distance
  const maxSteps = sizeX + sizeY + sizeZ;

  for (let v = 0; v < outH; v++) {
    for (let u = 0; u < outW; u++) {
      // Compute ray origin in 3D space
      const ru = u - outW / 2;
      const rv = v - outH / 2;

      // Start position: far back along -forward direction
      let ox = cx + right[0] * ru + up[0] * rv - forward[0] * maxSteps * 0.5;
      let oy = cy + right[1] * ru + up[1] * rv - forward[1] * maxSteps * 0.5;
      let oz = cz + right[2] * ru + up[2] * rv - forward[2] * maxSteps * 0.5;

      // March ray through the grid
      let hitColor: [number, number, number, number] | null = null;
      let hitX = 0, hitY = 0, hitZ = 0;

      for (let step = 0; step < maxSteps; step++) {
        // Current voxel coordinates (integer grid position)
        const gx = Math.round(ox);
        const gy = Math.round(oy);
        const gz = Math.round(oz);

        // Check bounds and voxel occupancy
        if (
          gx >= 0 && gx < sizeX &&
          gy >= 0 && gy < sizeY &&
          gz >= 0 && gz < sizeZ
        ) {
          const voxelIdx = gz * sizeY * sizeX + gy * sizeX + gx;
          if (grid.voxels[voxelIdx] !== 0) {
            const ci = voxelIdx * 4;
            hitColor = [
              grid.colors[ci],
              grid.colors[ci + 1],
              grid.colors[ci + 2],
              grid.colors[ci + 3],
            ];
            hitX = gx; hitY = gy; hitZ = gz;
            break;
          }
        }

        // Advance along forward direction
        ox += forward[0];
        oy += forward[1];
        oz += forward[2];
      }

      // Write pixel with normal-based shading
      const outIdx = (v * outW + u) * 4;
      if (hitColor) {
        const shade = computeVoxelShading(grid, hitX, hitY, hitZ);
        output[outIdx] = Math.round(Math.min(255, hitColor[0] * shade));
        output[outIdx + 1] = Math.round(Math.min(255, hitColor[1] * shade));
        output[outIdx + 2] = Math.round(Math.min(255, hitColor[2] * shade));
        output[outIdx + 3] = hitColor[3];
      }
      // else: transparent (0,0,0,0) — already initialized
    }
  }

  // Post-processing: edge outline darkening
  applyOutline(output, outW, outH);

  // Palette constraining
  if (palette && palette.length > 0) {
    constrainToPalette(output, outW, outH, palette);
  }

  return output;
}

/**
 * Compute shading for a surface voxel using surface normals.
 * Estimates the normal by checking 6-connected neighbors:
 * empty neighbors indicate the surface faces that direction.
 * Applies directional light from top-left-front for pixel art look.
 */
function computeVoxelShading(
  grid: VoxelGrid,
  x: number, y: number, z: number
): number {
  const { sizeX, sizeY, sizeZ, voxels } = grid;

  const isSolid = (gx: number, gy: number, gz: number) => {
    if (gx < 0 || gx >= sizeX || gy < 0 || gy >= sizeY || gz < 0 || gz >= sizeZ) return false;
    return voxels[gz * sizeY * sizeX + gy * sizeX + gx] !== 0;
  };

  // Accumulate surface normal from empty neighbors
  let nx = 0, ny = 0, nz = 0;
  if (!isSolid(x - 1, y, z)) nx -= 1;
  if (!isSolid(x + 1, y, z)) nx += 1;
  if (!isSolid(x, y - 1, z)) ny -= 1;
  if (!isSolid(x, y + 1, z)) ny += 1;
  if (!isSolid(x, y, z - 1)) nz -= 1;
  if (!isSolid(x, y, z + 1)) nz += 1;

  const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
  if (len < 0.001) return 1.0; // interior voxel, no shading

  // Normalize
  nx /= len; ny /= len; nz /= len;

  // Light from top-left-front (typical pixel art highlight direction)
  const LIGHT_X = -0.4;
  const LIGHT_Y = -0.6;
  const LIGHT_Z = 0.7;
  const lLen = Math.sqrt(LIGHT_X * LIGHT_X + LIGHT_Y * LIGHT_Y + LIGHT_Z * LIGHT_Z);
  const lx = LIGHT_X / lLen, ly = LIGHT_Y / lLen, lz = LIGHT_Z / lLen;

  // Lambertian dot product: clamp [0, 1]
  const dot = Math.max(0, nx * lx + ny * ly + nz * lz);

  // Ambient + diffuse: range [0.65, 1.1] to keep pixel art readable
  return 0.65 + dot * 0.45;
}

/**
 * Edge outline: darken pixels that border transparent areas.
 * Creates a natural outline effect on the rotated views.
 *
 * For each opaque pixel, check 4 neighbors. If any neighbor is
 * transparent, darken this pixel by 20%.
 */
function applyOutline(
  pixels: Uint8ClampedArray,
  width: number,
  height: number
): void {
  const DARKEN = 0.8; // 20% darker

  // Work on a copy to avoid cascading darkening
  const original = new Uint8ClampedArray(pixels);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (original[idx + 3] === 0) continue;

      // Check 4-connected neighbors
      let hasTransparentNeighbor = false;
      const neighbors = [
        [x - 1, y], [x + 1, y],
        [x, y - 1], [x, y + 1],
      ];

      for (const [nx, ny] of neighbors) {
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
          hasTransparentNeighbor = true;
          break;
        }
        if (original[(ny * width + nx) * 4 + 3] === 0) {
          hasTransparentNeighbor = true;
          break;
        }
      }

      if (hasTransparentNeighbor) {
        pixels[idx] = Math.round(pixels[idx] * DARKEN);
        pixels[idx + 1] = Math.round(pixels[idx + 1] * DARKEN);
        pixels[idx + 2] = Math.round(pixels[idx + 2] * DARKEN);
      }
    }
  }
}

/**
 * Snap each pixel's color to the nearest palette color.
 * Uses Euclidean distance in RGB space: sqrt(dr² + dg² + db²)
 */
function constrainToPalette(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: RGBA[]
): void {
  for (let i = 0; i < width * height * 4; i += 4) {
    if (pixels[i + 3] === 0) continue;

    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    let bestDist = Infinity;
    let bestColor: RGBA = { r, g, b, a: 255 };

    for (const pc of palette) {
      const dr = r - pc.r;
      const dg = g - pc.g;
      const db = b - pc.b;
      const dist = dr * dr + dg * dg + db * db; // skip sqrt for performance
      if (dist < bestDist) {
        bestDist = dist;
        bestColor = pc;
      }
    }

    pixels[i] = bestColor.r;
    pixels[i + 1] = bestColor.g;
    pixels[i + 2] = bestColor.b;
  }
}

/**
 * Get the output dimensions for a rendered view at a given angle.
 */
export function getViewDimensions(
  grid: VoxelGrid,
  angle: RotationAngle
): { width: number; height: number } {
  const isDiagonal = angle === 'NE' || angle === 'SE' || angle === 'SW' || angle === 'NW';
  const isSide = angle === 'E' || angle === 'W';

  if (isSide) {
    return { width: grid.sizeZ, height: grid.sizeY };
  } else if (isDiagonal) {
    return {
      width: Math.ceil((grid.sizeX + grid.sizeZ) * Math.SQRT1_2),
      height: grid.sizeY,
    };
  } else {
    return { width: grid.sizeX, height: grid.sizeY };
  }
}
