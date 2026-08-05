import { describe, expect, it } from 'vitest';
import { snapshotEditorDocumentV2 } from '../../src/lib/project/editorSpriteDocumentAdapter';
import type { Frame } from '../../src/types/frame';

function makeInput() {
  const frames: Frame[] = [
    {
      id: 'frame-0',
      index: 0,
      duration: 50,
      layerData: { base: new Uint8ClampedArray([255, 0, 0, 255]) },
    },
    {
      id: 'frame-1',
      index: 1,
      duration: 200,
      layerData: { base: new Uint8ClampedArray([0, 0, 255, 255]) },
    },
  ];

  return {
    project: {
      id: 'project-1',
      name: 'Adapter fixture',
      width: 1,
      height: 1,
      createdAt: 1,
      updatedAt: 2,
    },
    layers: [{
      id: 'base',
      name: 'Base',
      visible: true,
      locked: false,
      opacity: 1,
      blendMode: 'normal' as const,
    }],
    activeLayerId: 'base',
    frames,
    activeFrameIndex: 1,
    fps: 12,
    loop: false,
    migration: {
      clipId: 'clip-1',
      clipName: 'walk_right',
      palette: ['#000000', '#ffffff'],
      pivotPx: { x: 0, y: 0 },
    },
  };
}

describe('snapshotEditorDocumentV2', () => {
  it('preserves editor order, pixels, durations, active frame, and loop mode', () => {
    const input = makeInput();
    const firstPixels = input.frames[0].layerData.base;
    const secondPixels = input.frames[1].layerData.base;
    const result = snapshotEditorDocumentV2(input);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.layers.map((layer) => layer.id)).toEqual(['base']);
    expect(result.value.frames.map((frame) => frame.id)).toEqual(['frame-0', 'frame-1']);
    expect(result.value.frames.map((frame) => frame.durationMs)).toEqual([50, 200]);
    expect(result.value.cels['cel:frame-0:base'].data).toEqual([255, 0, 0, 255]);
    expect(result.value.cels['cel:frame-1:base'].data).toEqual([0, 0, 255, 255]);
    expect(result.value.activeFrameId).toBe('frame-1');
    expect(result.value.clip.loop).toBe('once');
    expect(input.frames[0].layerData.base).toBe(firstPixels);
    expect(input.frames[1].layerData.base).toBe(secondPixels);
    expect(Array.from(firstPixels)).toEqual([255, 0, 0, 255]);
    expect(Array.from(secondPixels)).toEqual([0, 0, 255, 255]);
  });

  it('rejects shared frame-layer identity without mutating editor state', () => {
    const input = makeInput();
    const shared = input.frames[0].layerData.base;
    input.frames[1].layerData.base = shared;
    const before = Array.from(shared);

    const result = snapshotEditorDocumentV2(input);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues[0].code).toBe('UNSUPPORTED_LINK_SEMANTICS');
    expect(input.frames[0].layerData.base).toBe(shared);
    expect(input.frames[1].layerData.base).toBe(shared);
    expect(Array.from(shared)).toEqual(before);
  });

  it('rejects an invalid active frame without mutation', () => {
    const input = makeInput();
    const frameIds = input.frames.map((frame) => frame.id);
    input.activeFrameIndex = 4;

    const result = snapshotEditorDocumentV2(input);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues[0].code).toBe('INVALID_ACTIVE_TARGET');
    expect(input.frames.map((frame) => frame.id)).toEqual(frameIds);
  });
});
