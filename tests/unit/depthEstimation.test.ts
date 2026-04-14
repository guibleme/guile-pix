import { describe, expect, it } from 'vitest';
import { estimateDepth, estimateDepthEdgeBased } from '@/lib/ai/depthEstimation';

function makeSprite(w: number, h: number, fillFn: (x: number, y: number) => [number, number, number, number]): Uint8ClampedArray {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const [r, g, b, a] = fillFn(x, y);
      const idx = (y * w + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = a;
    }
  }
  return data;
}

describe('depthEstimation', () => {
  describe('estimateDepth (heuristic)', () => {
    it('returns correct dimensions', () => {
      const w = 16, h = 16;
      const px = makeSprite(w, h, () => [128, 128, 128, 255]);
      const dm = estimateDepth(px, w, h);
      expect(dm.width).toBe(w);
      expect(dm.height).toBe(h);
      expect(dm.data.length).toBe(w * h);
    });

    it('assigns zero depth to transparent pixels', () => {
      const w = 8, h = 8;
      const px = makeSprite(w, h, () => [0, 0, 0, 0]); // all transparent
      const dm = estimateDepth(px, w, h);
      for (const d of dm.data) {
        expect(d).toBe(0);
      }
    });

    it('assigns higher depth to interior pixels than edge pixels', () => {
      // 8x8 filled square
      const w = 8, h = 8;
      const px = makeSprite(w, h, (x, y) => {
        // Leave a 1px transparent border
        if (x === 0 || x === w - 1 || y === 0 || y === h - 1) return [0, 0, 0, 0];
        return [128, 128, 128, 255];
      });

      const dm = estimateDepth(px, w, h);

      // Center pixel should have higher depth than edge pixel
      const centerDepth = dm.data[4 * w + 4]; // (4, 4) = center
      const edgeDepth = dm.data[1 * w + 1];   // (1, 1) = corner of filled area
      expect(centerDepth).toBeGreaterThan(edgeDepth);
    });

    it('produces a convex depth profile for a circle', () => {
      const w = 16, h = 16;
      const cx = 8, cy = 8, r = 6;
      const px = makeSprite(w, h, (x, y) => {
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (dist <= r) return [128, 128, 128, 255];
        return [0, 0, 0, 0];
      });

      const dm = estimateDepth(px, w, h);

      // Center should have maximum depth
      const centerDepth = dm.data[cy * w + cx];
      expect(centerDepth).toBeGreaterThan(0);

      // Depth should decrease toward edges
      const nearEdgeDepth = dm.data[cy * w + (cx + r - 1)];
      expect(centerDepth).toBeGreaterThan(nearEdgeDepth);
    });

    it('detects and enforces symmetry for symmetric sprites', () => {
      const w = 16, h = 16;
      // Create a horizontally symmetric sprite
      const px = makeSprite(w, h, (x, y) => {
        const mx = Math.abs(x - 7.5);
        if (mx <= 4 && y >= 4 && y <= 12) return [128, 128, 128, 255];
        return [0, 0, 0, 0];
      });

      const dm = estimateDepth(px, w, h);

      // Depth at symmetric positions should be equal (or very close)
      for (let y = 4; y <= 12; y++) {
        const leftDepth = dm.data[y * w + 5];
        const rightDepth = dm.data[y * w + 10];
        expect(Math.abs(leftDepth - rightDepth)).toBeLessThan(0.1);
      }
    });
  });

  describe('estimateDepthEdgeBased', () => {
    it('returns valid depth map', () => {
      const w = 16, h = 16;
      const px = makeSprite(w, h, () => [128, 128, 128, 255]);
      const dm = estimateDepthEdgeBased(px, w, h);
      expect(dm.width).toBe(w);
      expect(dm.height).toBe(h);

      for (let i = 0; i < dm.data.length; i++) {
        expect(dm.data[i]).toBeGreaterThanOrEqual(0);
        expect(dm.data[i]).toBeLessThanOrEqual(1);
      }
    });
  });
});
