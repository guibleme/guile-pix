import { describe, expect, it } from 'vitest';
import { snapshotEditorDocumentV2 } from '../../src/lib/project/editorSpriteDocumentAdapter';
import type { Frame } from '../../src/types/frame';
import { deserializeProject } from '../../src/lib/export/projectFile';
import { hashDocumentPixels, hashDocumentSemantic, type SpriteDocumentV2 } from '../../packages/sprite-core/src';

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
  it('round-trips a 96x112 12-frame canonical v2 idle with metadata, linked and unreferenced cels losslessly', async () => {
    const width = 96;
    const height = 112;
    const frameIds = Array.from({ length: 12 }, (_, index) => `idle-${index}`);
    const linkedPixels = new Array(width * height * 4).fill(0);
    linkedPixels.splice(0, 4, 1, 2, 3, 255);
    const retainedPixels = new Array(width * height * 4).fill(0);
    retainedPixels.splice(4, 4, 9, 9, 9, 255);
    const source: SpriteDocumentV2 = {
      version: 2,
      project: { id: 'roundtrip', name: 'Round trip', width, height, createdAt: 1, updatedAt: 2 },
      layers: [{ id: 'base', name: 'Base', visible: true, locked: false, opacity: 1, blendMode: 'normal' }],
      cels: { linked: { id: 'linked', data: linkedPixels }, retained: { id: 'retained', data: retainedPixels } },
      frames: frameIds.map((id, index) => ({ id, durationMs: index % 2 ? 83 : 41, celRefs: { base: 'linked' } })),
      clip: { id: 'idle', name: 'idle', frameIds, loop: 'ping_pong', direction: 'reverse' },
      clips: [{ id: 'idle', name: 'idle', frameIds, loop: 'ping_pong', direction: 'reverse' }],
      activeClipId: 'idle',
      palette: ['#010203'], pivotPx: { x: 48, y: 111 }, production: { paletteId: 'custom', groundLineY: 111, facing: 'left', rootMotion: { mode: 'none' } },
      activeLayerId: 'base', activeFrameId: frameIds.at(-1)!, revision: 7,
      source: { artifactId: 'fixture', sha256: 'a'.repeat(64), paletteId: 'source-palette', renderProcedure: 'test' },
    };
    const editor = deserializeProject(source);
    const result = snapshotEditorDocumentV2({ ...editor, activeLayerId: editor.activeLayerId, activeFrameIndex: editor.activeFrameIndex, sourceDocument: source });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.cels.retained).toEqual(source.cels.retained);
    expect(result.value.frames[0].celRefs.base).toBe(result.value.frames[1].celRefs.base);
    expect(await hashDocumentSemantic(result.value)).toBe(await hashDocumentSemantic(source));
    expect(await hashDocumentPixels(result.value)).toBe(await hashDocumentPixels(source));
  });

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

  it('preserves shared frame-layer identity as a linked v2 cel without mutating editor state', () => {
    const input = makeInput();
    const shared = input.frames[0].layerData.base;
    input.frames[1].layerData.base = shared;
    const before = Array.from(shared);

    const result = snapshotEditorDocumentV2(input);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.frames[0].celRefs.base).toBe(result.value.frames[1].celRefs.base);
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
