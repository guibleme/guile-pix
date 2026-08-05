import { deserializeProject, normalizeProjectFile, PROJECT_FILE_LIMITS } from '../../src/lib/export/projectFile';
import { importSpriteDocumentV2 } from '../../src/lib/project/spriteDocumentV2Import';
import type { SpriteDocumentV2 } from '../../packages/sprite-core/src';
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

function createBaseV2Document(): SpriteDocumentV2 {
  return {
    version: 2,
    project: {
      id: 'project-v2',
      name: 'MCP Project',
      width: 1,
      height: 1,
      createdAt: 1,
      updatedAt: 2,
    },
    layers: [{
      id: 'layer-1',
      name: 'Layer 1',
      visible: true,
      locked: false,
      opacity: 1,
      blendMode: 'normal',
    }],
    cels: {
      'cel-1': { id: 'cel-1', data: [255, 0, 0, 255] },
      'cel-2': { id: 'cel-2', data: [0, 0, 255, 255] },
    },
    frames: [
      { id: 'frame-1', durationMs: 100, celRefs: { 'layer-1': 'cel-1' } },
      { id: 'frame-2', durationMs: 100, celRefs: { 'layer-1': 'cel-2' } },
    ],
    clip: {
      id: 'clip-default',
      name: 'default',
      frameIds: ['frame-1', 'frame-2'],
      loop: 'linear',
    },
    palette: ['#ff0000', '#0000ff'],
    pivotPx: { x: 0, y: 0 },
    activeLayerId: 'layer-1',
    activeFrameId: 'frame-2',
    revision: 3,
  };
}

describe('normalizeProjectFile limits', () => {
  it('normalizes a valid project', () => {
    const normalized = normalizeProjectFile(createBaseRawProject());
    expect(normalized).not.toBeNull();
    expect(normalized?.project.width).toBe(1);
    expect(normalized?.frames).toHaveLength(1);
  });

  it('imports a valid version 2 document with frame order, timing, pixels, and active frame intact', () => {
    const normalized = normalizeProjectFile(createBaseV2Document());
    const deserialized = deserializeProject(createBaseV2Document());

    expect(normalized).toEqual(expect.objectContaining({
      version: 1,
      activeFrameId: 'frame-2',
      loop: true,
      fps: 10,
    }));
    expect(normalized?.frames.map((frame) => [frame.id, frame.duration])).toEqual([
      ['frame-1', 100],
      ['frame-2', 100],
    ]);
    expect(normalized?.frames[1].layerData['layer-1']).toEqual([0, 0, 255, 255]);
    expect(deserialized.activeFrameIndex).toBe(1);
    expect(deserialized.loop).toBe(true);
  });

  it('fails closed when version 2 linked cels cannot be preserved by the editor', () => {
    const linked = createBaseV2Document();
    linked.frames[1].celRefs['layer-1'] = 'cel-1';
    delete linked.cels['cel-2'];

    expect(importSpriteDocumentV2(linked, PROJECT_FILE_LIMITS.maxProjectPixelBytes)).toEqual(expect.objectContaining({
      ok: false,
      code: 'UNSUPPORTED_LINKED_CELS',
    }));
    expect(normalizeProjectFile(linked)).toBeNull();
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
