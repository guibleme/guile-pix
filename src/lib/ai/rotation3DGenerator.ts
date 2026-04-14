// ─── 3D Rotation Generator — Orchestrator ──────────────────────────────
// Ties together: depth estimation → voxel building → multi-angle rendering.
// Pure computational geometry pipeline, zero ML dependencies.

import type {
  DepthMap,
  DepthEstimationMethod,
  RotationAngle,
  RotationGenerationResult,
  RotationView,
} from '@/types/rotation3d';
import type { RGBA } from '@/types/color';
import { estimateDepth, estimateDepthEdgeBased } from './depthEstimation';
import { buildVoxelGrid } from './voxelBuilder';
import { renderVoxelView, getViewDimensions } from './voxelRenderer';

const ALL_ANGLES: RotationAngle[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

/**
 * Generate rotated views of a 2D sprite.
 *
 * Pipeline:
 * 1. Estimate depth map from source sprite
 * 2. Build 3D voxel grid via depth-based extrusion
 * 3. Render each requested angle via orthographic DDA raycasting
 * 4. (Optional) Constrain output colors to a palette
 *
 * @param pixels - Source sprite RGBA data
 * @param width - Sprite width
 * @param height - Sprite height
 * @param options - Configuration for the generation pipeline
 * @returns Generated views and the intermediate voxel grid
 */
export async function generate3DRotation(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  options: {
    angles?: RotationAngle[];
    depthMethod?: DepthEstimationMethod;
    depthMap?: DepthMap; // pre-computed/user-edited depth map
    maxDepthLayers?: number;
    palette?: RGBA[];
    paletteConstrain?: boolean;
    onProgress?: (progress: number) => void;
  } = {}
): Promise<RotationGenerationResult> {
  const {
    angles = ALL_ANGLES,
    depthMethod = 'heuristic',
    maxDepthLayers = 16,
    palette,
    paletteConstrain = false,
    onProgress,
  } = options;

  const totalSteps = angles.length + 2; // depth + voxels + N renders
  let currentStep = 0;

  const reportProgress = () => {
    currentStep++;
    onProgress?.(Math.round((currentStep / totalSteps) * 100));
  };

  // Step 1: Estimate depth (or use provided depth map)
  let depthMap: DepthMap;
  if (options.depthMap) {
    depthMap = options.depthMap;
  } else {
    depthMap = depthMethod === 'edgeBased'
      ? estimateDepthEdgeBased(pixels, width, height)
      : estimateDepth(pixels, width, height);
  }
  reportProgress();

  // Step 2: Build voxel grid
  const voxelGrid = buildVoxelGrid(pixels, width, height, depthMap, maxDepthLayers);
  reportProgress();

  // Step 3: Render each angle
  const views: RotationView[] = [];
  const effectivePalette = paletteConstrain && palette ? palette : undefined;

  for (const angle of angles) {
    // Yield to main thread to keep UI responsive
    await new Promise<void>(resolve => setTimeout(resolve, 0));

    const rendered = renderVoxelView(voxelGrid, angle, effectivePalette);
    const dims = getViewDimensions(voxelGrid, angle);

    views.push({
      angle,
      pixels: rendered,
      width: dims.width,
      height: dims.height,
    });

    reportProgress();
  }

  return { views, voxelGrid };
}

/**
 * Re-render a single angle from an existing voxel grid.
 * Useful when the user wants to preview a specific angle quickly.
 */
export function renderSingleView(
  grid: import('@/types/rotation3d').VoxelGrid,
  angle: RotationAngle,
  palette?: RGBA[]
): RotationView {
  const rendered = renderVoxelView(grid, angle, palette);
  const dims = getViewDimensions(grid, angle);
  return { angle, pixels: rendered, width: dims.width, height: dims.height };
}
