import { create } from 'zustand';
import type {
  DepthMap,
  DepthEstimationMethod,
  DepthPaintMode,
  Rotation3DStatus,
  RotationAngle,
  RotationGenerationResult,
  VoxelGrid,
} from '@/types/rotation3d';
const ALL_ANGLES: RotationAngle[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

interface Rotation3DState {
  status: Rotation3DStatus;
  progress: number;

  depthMap: DepthMap | null;
  depthPaintMode: DepthPaintMode;
  depthBrushValue: number;

  voxelGrid: VoxelGrid | null;
  selectedAngles: RotationAngle[];
  maxDepthLayers: number;
  paletteConstrain: boolean;
  depthEstimationMethod: DepthEstimationMethod;

  result: RotationGenerationResult | null;
  previewAngle: RotationAngle;

  // Actions
  setStatus: (status: Rotation3DStatus) => void;
  setProgress: (progress: number) => void;
  setDepthMap: (map: DepthMap | null) => void;
  setDepthPaintMode: (mode: DepthPaintMode) => void;
  setDepthBrushValue: (value: number) => void;
  paintDepth: (x: number, y: number, radius: number) => void;
  toggleAngle: (angle: RotationAngle) => void;
  setSelectedAngles: (angles: RotationAngle[]) => void;
  setMaxDepthLayers: (layers: number) => void;
  setPaletteConstrain: (constrain: boolean) => void;
  setDepthEstimationMethod: (method: DepthEstimationMethod) => void;
  setVoxelGrid: (grid: VoxelGrid | null) => void;
  setResult: (result: RotationGenerationResult | null) => void;
  setPreviewAngle: (angle: RotationAngle) => void;
  reset: () => void;
}

export const useRotation3DStore = create<Rotation3DState>((set, get) => ({
  status: 'idle',
  progress: 0,

  depthMap: null,
  depthPaintMode: 'brush',
  depthBrushValue: 0.5,

  voxelGrid: null,
  selectedAngles: [...ALL_ANGLES],
  maxDepthLayers: 16,
  paletteConstrain: false,
  depthEstimationMethod: 'heuristic',

  result: null,
  previewAngle: 'N',

  setStatus: (status) => set({ status }),
  setProgress: (progress) => set({ progress }),
  setDepthMap: (map) => set({ depthMap: map }),
  setDepthPaintMode: (mode) => set({ depthPaintMode: mode }),
  setDepthBrushValue: (value) => set({ depthBrushValue: value }),

  paintDepth: (x, y, radius) => {
    const { depthMap, depthBrushValue } = get();
    if (!depthMap) return;

    const newData = new Float32Array(depthMap.data);
    const { width, height } = depthMap;

    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const px = x + dx;
        const py = y + dy;
        if (px < 0 || px >= width || py < 0 || py >= height) continue;

        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > radius) continue;

        // Falloff: strength decreases with distance from center
        const strength = 1 - dist / radius;
        const idx = py * width + px;
        newData[idx] = newData[idx] * (1 - strength) + depthBrushValue * strength;
      }
    }

    set({ depthMap: { ...depthMap, data: newData } });
  },

  toggleAngle: (angle) => {
    const { selectedAngles } = get();
    if (selectedAngles.includes(angle)) {
      set({ selectedAngles: selectedAngles.filter(a => a !== angle) });
    } else {
      set({ selectedAngles: [...selectedAngles, angle] });
    }
  },

  setSelectedAngles: (angles) => set({ selectedAngles: angles }),
  setMaxDepthLayers: (layers) => set({ maxDepthLayers: layers }),
  setPaletteConstrain: (constrain) => set({ paletteConstrain: constrain }),
  setDepthEstimationMethod: (method) => set({ depthEstimationMethod: method }),
  setVoxelGrid: (grid) => set({ voxelGrid: grid }),
  setResult: (result) => set({ result }),
  setPreviewAngle: (angle) => set({ previewAngle: angle }),

  reset: () => set({
    status: 'idle',
    progress: 0,
    depthMap: null,
    voxelGrid: null,
    result: null,
    previewAngle: 'N',
  }),
}));
