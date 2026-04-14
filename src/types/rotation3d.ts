// ─── 3D Rotation from 2D Sprite Types ───────────────────────────────────
// Euclidean Distance Transform, voxelization, orthographic DDA raycasting.
// Pure computational geometry — zero ML dependencies.

export interface DepthMap {
  width: number;
  height: number;
  data: Float32Array; // depth values 0.0 (surface/far) to 1.0 (front/near), per pixel
}

export interface VoxelGrid {
  sizeX: number; // same as sprite width
  sizeY: number; // same as sprite height
  sizeZ: number; // depth resolution (e.g., 8, 16, 32)
  // Flattened 3D arrays indexed as [z * sizeY * sizeX + y * sizeX + x]
  voxels: Uint8Array; // 1 = filled, 0 = empty
  colors: Uint8ClampedArray; // RGBA per voxel (length = sizeX * sizeY * sizeZ * 4)
}

export type RotationAngle = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export interface RotationView {
  angle: RotationAngle;
  pixels: Uint8ClampedArray;
  width: number;
  height: number;
}

export interface RotationGenerationRequest {
  angles: RotationAngle[];
  depthMap: DepthMap;
  maxDepthLayers: number; // voxel depth resolution
  paletteConstrain: boolean; // snap colors to current palette
}

export interface RotationGenerationResult {
  views: RotationView[];
  voxelGrid: VoxelGrid;
}

export type DepthPaintMode = 'brush' | 'gradient' | 'symmetricDepth';
export type DepthEstimationMethod = 'heuristic' | 'edgeBased';

export type Rotation3DStatus =
  | 'idle'
  | 'estimatingDepth'
  | 'buildingVoxels'
  | 'rendering'
  | 'preview'
  | 'error';
