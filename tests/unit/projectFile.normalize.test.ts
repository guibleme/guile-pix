import { normalizeProjectFile, PROJECT_FILE_LIMITS } from '../../src/lib/export/projectFile';
import { describe, expect, it } from 'vitest';

interface RawLayer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay';
}

interface RawFrame {
  id: string;
  index: number;
  duration: number;
  layerData: Record<string, number[]>;
}

interface RawProject {
  version: 1;
  project: {
    id: string;
    name: string;
    width: number;
    height: number;
    createdAt: number;
    updatedAt: number;
  };
  layers: RawLayer[];
  activeLayerId: string;
  frames: RawFrame[];
  fps: number;
}

function createBaseRawProject(): RawProject {
  const layerId = 'layer-1';
  return {
    version: 1,
    project: {
      id: 'project-1',
      name: 'Test',
      width: 1,
      height: 1,
      createdAt: 1,
      updatedAt: 1,
    },
    layers: [
      {
        id: layerId,
        name: 'Layer 1',
        visible: true,
        locked: false,
        opacity: 1,
        blendMode: 'normal',
      },
    ],
    activeLayerId: layerId,
    frames: [
      {
        id: 'frame-1',
        index: 0,
        duration: 100,
        layerData: {
          [layerId]: [0, 0, 0, 255],
        },
      },
    ],
    fps: 12,
  };
}

describe('normalizeProjectFile limits', () => {
  it('normalizes a valid project', () => {
    const normalized = normalizeProjectFile(createBaseRawProject());
    expect(normalized).not.toBeNull();
    expect(normalized?.project.width).toBe(1);
    expect(normalized?.frames).toHaveLength(1);
  });

  it('rejects an explicit version 2 document instead of flattening it as version 1', () => {
    const raw = createBaseRawProject() as unknown as Record<string, unknown>;
    raw.version = 2;

    expect(normalizeProjectFile(raw)).toBeNull();
  });

  it('rejects projects with too many layers', () => {
    const raw = createBaseRawProject();
    raw.layers = Array.from({ length: PROJECT_FILE_LIMITS.maxLayers + 1 }, (_, index) => ({
      id: `layer-${index + 1}`,
      name: `Layer ${index + 1}`,
      visible: true,
      locked: false,
      opacity: 1,
      blendMode: 'normal',
    }));
    raw.activeLayerId = raw.layers[0].id;

    const normalized = normalizeProjectFile(raw);
    expect(normalized).toBeNull();
  });

  it('rejects projects with too many frames', () => {
    const raw = createBaseRawProject();
    raw.frames = Array.from({ length: PROJECT_FILE_LIMITS.maxFrames + 1 }, (_, index) => ({
      id: `frame-${index + 1}`,
      index,
      duration: 100,
      layerData: {
        [raw.activeLayerId]: [0, 0, 0, 255],
      },
    }));

    const normalized = normalizeProjectFile(raw);
    expect(normalized).toBeNull();
  });

  it('fills missing active layer data with transparent pixels', () => {
    const raw = createBaseRawProject();
    raw.project.width = 2;
    raw.project.height = 2;
    raw.frames = [
      {
        id: 'frame-1',
        index: 0,
        duration: 100,
        layerData: {},
      },
    ];

    const normalized = normalizeProjectFile(raw);
    expect(normalized).not.toBeNull();
    expect(normalized?.frames[0].layerData[raw.activeLayerId]).toHaveLength(16);
  });
});
