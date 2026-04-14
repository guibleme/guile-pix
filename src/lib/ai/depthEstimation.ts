// ─── Depth Estimation from 2D Sprite ────────────────────────────────────
// Pure computational geometry — no ML models.
//
// Algorithm overview:
// 1. Euclidean Distance Transform (Meijster et al.) — O(w×h)
//    Maps each pixel to its distance from the nearest transparent pixel.
//    Interior pixels get higher depth values (they're "deeper" into the shape).
//
// 2. Luminance Adjustment
//    Pixel art convention: brighter highlights = closer to viewer.
//    Nudge depth forward for high-luminance pixels.
//
// 3. Symmetry Detection
//    If the sprite is horizontally symmetric (common for front-facing),
//    enforce symmetric depth map for cleaner 3D rotation.
//
// References:
//   - Meijster, Roerdink, Hesselink (2000): "A General Algorithm for
//     Computing Distance Transforms in Linear Time"

import type { DepthMap } from '@/types/rotation3d';

/**
 * Euclidean Distance Transform (EDT) using Meijster's algorithm.
 *
 * Phase 1 (column scan):
 *   For each column x, compute G[y][x] = min distance to transparent pixel
 *   in that column. Uses two passes (top-down, bottom-up).
 *
 * Phase 2 (row scan):
 *   For each row y, compute the true EDT using the parabola envelope
 *   technique. This gives exact Euclidean distances.
 *
 * Total complexity: O(w × h) — optimal.
 */
function euclideanDistanceTransform(
  width: number,
  height: number,
  isOpaque: (x: number, y: number) => boolean
): Float32Array {
  const INF = width + height;
  const dist = new Float32Array(width * height);

  // Phase 1: Column-wise distance (vertical)
  const g = new Float32Array(width * height);

  for (let x = 0; x < width; x++) {
    // Forward pass (top to bottom)
    if (isOpaque(x, 0)) {
      g[0 * width + x] = INF;
    } else {
      g[0 * width + x] = 0;
    }

    for (let y = 1; y < height; y++) {
      if (isOpaque(x, y)) {
        g[y * width + x] = g[(y - 1) * width + x] + 1;
      } else {
        g[y * width + x] = 0;
      }
    }

    // Backward pass (bottom to top)
    for (let y = height - 2; y >= 0; y--) {
      const fromBelow = g[(y + 1) * width + x] + 1;
      if (fromBelow < g[y * width + x]) {
        g[y * width + x] = fromBelow;
      }
    }
  }

  // Phase 2: Row-wise EDT using parabola envelope
  // For each row y, compute the lower envelope of parabolas
  // f_x(u) = (u - x)² + g[y][x]²

  const s = new Float32Array(width); // parabola intersection points
  const t = new Int32Array(width);   // parabola indices
  const dt = new Float32Array(width); // row distance buffer

  for (let y = 0; y < height; y++) {
    // Build lower envelope
    let q = 0;
    t[0] = 0;
    s[0] = -INF;

    for (let x = 1; x < width; x++) {
      const gx = g[y * width + x];
      const fx = gx * gx; // squared vertical distance at column x

      while (q >= 0) {
        const tx = t[q];
        const gtx = g[y * width + tx];
        const ftx = gtx * gtx;

        // Intersection of parabola at tx and parabola at x
        // sep = ((fx + x²) - (ftx + tx²)) / (2(x - tx))
        const sep = ((fx + x * x) - (ftx + tx * tx)) / (2 * (x - tx));

        if (sep > s[q]) {
          break;
        }
        q--;
      }

      q++;
      t[q] = x;
      s[q] = q === 0 ? -INF :
        ((fx + x * x) - (g[y * width + t[q - 1]] ** 2 + t[q - 1] ** 2)) /
        (2 * (x - t[q - 1]));
    }

    // Scan row and evaluate the lower envelope
    for (let x = width - 1; x >= 0; x--) {
      while (s[q] > x && q > 0) q--;
      const dx = x - t[q];
      const gy = g[y * width + t[q]];
      dt[x] = Math.sqrt(dx * dx + gy * gy);
    }

    // Copy to output
    for (let x = 0; x < width; x++) {
      dist[y * width + x] = dt[x];
    }
  }

  return dist;
}

/**
 * Compute luminance from RGB using the standard Rec. 709 formula:
 *   L = 0.2126·R + 0.7152·G + 0.0722·B
 * Returns value in [0, 1].
 */
function pixelLuminance(r: number, g: number, b: number): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/**
 * Detect horizontal symmetry of a sprite.
 * Returns a score in [0, 1] where 1 = perfectly symmetric.
 *
 * Compares each pixel with its horizontally mirrored counterpart.
 * Uses color distance (Euclidean in RGB space) as the similarity metric.
 */
function detectHorizontalSymmetry(
  pixels: Uint8ClampedArray,
  width: number,
  height: number
): number {
  let matchCount = 0;
  let totalCount = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < Math.floor(width / 2); x++) {
      const mx = width - 1 - x;
      const idx1 = (y * width + x) * 4;
      const idx2 = (y * width + mx) * 4;

      const a1 = pixels[idx1 + 3];
      const a2 = pixels[idx2 + 3];

      // Both transparent or both opaque counts as match
      if (a1 === 0 && a2 === 0) continue;
      if (a1 === 0 || a2 === 0) {
        totalCount++;
        continue;
      }

      totalCount++;
      const dr = pixels[idx1] - pixels[idx2];
      const dg = pixels[idx1 + 1] - pixels[idx2 + 1];
      const db = pixels[idx1 + 2] - pixels[idx2 + 2];
      const colorDist = Math.sqrt(dr * dr + dg * dg + db * db);

      // Threshold: colors within distance 30 are "same enough"
      if (colorDist < 30) matchCount++;
    }
  }

  return totalCount === 0 ? 0 : matchCount / totalCount;
}

/**
 * Estimate depth map from a 2D sprite using pure algorithmic methods.
 *
 * Pipeline:
 * 1. EDT → raw distance values
 * 2. Normalize to [0, 1]
 * 3. Luminance bias (brighter = closer)
 * 4. Symmetry enforcement (if sprite is symmetric)
 * 5. Gaussian-like smoothing for natural depth gradients
 */
export function estimateDepth(
  pixels: Uint8ClampedArray,
  width: number,
  height: number
): DepthMap {
  // 1. Compute EDT (distance to nearest transparent pixel)
  const isOpaque = (x: number, y: number) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    return pixels[(y * width + x) * 4 + 3] > 0;
  };

  const rawDist = euclideanDistanceTransform(width, height, isOpaque);

  // 2. Find max distance for normalization
  let maxDist = 0;
  for (let i = 0; i < rawDist.length; i++) {
    if (rawDist[i] > maxDist) maxDist = rawDist[i];
  }

  // 3. Normalize to [0, 1] and apply luminance bias
  const LUMINANCE_WEIGHT = 0.15; // how much luminance affects depth
  const depthData = new Float32Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const pIdx = idx * 4;

      if (pixels[pIdx + 3] === 0) {
        depthData[idx] = 0; // transparent = no depth
        continue;
      }

      // Normalized distance (0 = edge, 1 = deepest interior)
      const normalizedDist = maxDist > 0 ? rawDist[idx] / maxDist : 0;

      // Luminance bias: brighter pixels are pushed forward
      const lum = pixelLuminance(pixels[pIdx], pixels[pIdx + 1], pixels[pIdx + 2]);
      const luminanceBias = lum * LUMINANCE_WEIGHT;

      depthData[idx] = Math.min(1, normalizedDist + luminanceBias);
    }
  }

  // 4. Detect and enforce symmetry if applicable
  const symmetryScore = detectHorizontalSymmetry(pixels, width, height);
  if (symmetryScore > 0.75) {
    // Average depth with its mirror for symmetric sprites
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < Math.floor(width / 2); x++) {
        const mx = width - 1 - x;
        const idx1 = y * width + x;
        const idx2 = y * width + mx;
        const avg = (depthData[idx1] + depthData[idx2]) / 2;
        depthData[idx1] = avg;
        depthData[idx2] = avg;
      }
    }
  }

  // 5. Multi-pass 3x3 box blur for smoother depth gradients
  // More passes = smoother transitions, better 3D look
  const BLUR_PASSES = 3;
  let current = depthData;
  let next = new Float32Array(width * height);

  for (let pass = 0; pass < BLUR_PASSES; pass++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (pixels[idx * 4 + 3] === 0) {
          next[idx] = 0;
          continue;
        }

        let sum = 0;
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const nIdx = ny * width + nx;
              if (pixels[nIdx * 4 + 3] > 0) {
                sum += current[nIdx];
                count++;
              }
            }
          }
        }
        next[idx] = count > 0 ? sum / count : current[idx];
      }
    }
    // Swap buffers for next pass
    const tmp = current;
    current = next;
    next = tmp;
  }

  return { width, height, data: current };
}

/**
 * Edge-based depth estimation variant.
 * Uses Sobel gradient magnitude to create depth relief.
 * Edges (high gradient) are treated as surface features (medium depth),
 * while flat interior regions get maximum depth.
 */
export function estimateDepthEdgeBased(
  pixels: Uint8ClampedArray,
  width: number,
  height: number
): DepthMap {
  // Start with the standard EDT-based depth
  const baseDepth = estimateDepth(pixels, width, height);

  // Compute Sobel edge detection
  const edgeMagnitude = new Float32Array(width * height);
  let maxEdge = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      if (pixels[idx * 4 + 3] === 0) continue;

      // Sobel kernels applied to luminance
      // Gx = [-1 0 1; -2 0 2; -1 0 1]
      // Gy = [-1 -2 -1; 0 0 0; 1 2 1]
      const getLum = (dx: number, dy: number) => {
        const i = ((y + dy) * width + (x + dx)) * 4;
        if (pixels[i + 3] === 0) return 0;
        return pixelLuminance(pixels[i], pixels[i + 1], pixels[i + 2]);
      };

      const gx =
        -getLum(-1, -1) + getLum(1, -1)
        - 2 * getLum(-1, 0) + 2 * getLum(1, 0)
        - getLum(-1, 1) + getLum(1, 1);

      const gy =
        -getLum(-1, -1) - 2 * getLum(0, -1) - getLum(1, -1)
        + getLum(-1, 1) + 2 * getLum(0, 1) + getLum(1, 1);

      const mag = Math.sqrt(gx * gx + gy * gy);
      edgeMagnitude[idx] = mag;
      if (mag > maxEdge) maxEdge = mag;
    }
  }

  // Blend edge information into depth
  // Edges create depth variation (surface detail)
  const EDGE_WEIGHT = 0.2;
  const result = new Float32Array(width * height);

  for (let i = 0; i < width * height; i++) {
    if (pixels[i * 4 + 3] === 0) {
      result[i] = 0;
      continue;
    }

    const edgeNorm = maxEdge > 0 ? edgeMagnitude[i] / maxEdge : 0;
    // Edges reduce depth slightly (they're surface detail, not deep interior)
    result[i] = Math.max(0, baseDepth.data[i] - edgeNorm * EDGE_WEIGHT);
  }

  return { width, height, data: result };
}
