import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { canonicalJson, type ProjectFileV1, type SpriteDocumentV2 } from '../../packages/sprite-core/src';
import { AnimationBridge } from '../../mcp-server/src/animationBridge';
import { analyzeFrameChanges } from '../../mcp-server/src/review';
import { cloneFixture, makeGoldenWalkDocument } from '../fixtures/sprite-core/fixtures';

const temporaryDirectories: string[] = [];

function temporaryDirectory(): string {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-mcp-'));
  temporaryDirectories.push(directory);
  return directory;
}

function structured(result: Awaited<ReturnType<AnimationBridge['createSprite']>>): Record<string, unknown> {
  return result.structuredContent as Record<string, unknown>;
}

function writeDocument(directory: string, name: string, document: unknown): string {
  const filePath = path.join(directory, name);
  fs.writeFileSync(filePath, JSON.stringify(document));
  return filePath;
}

afterEach(() => {
  while (temporaryDirectories.length > 0) {
    const directory = temporaryDirectories.pop()!;
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

describe('AnimationBridge service contract', () => {
  it('commits once and leaves document, undo, baseline, and files untouched on stale or invalid calls', async () => {
    const outputDir = temporaryDirectory();
    const bridge = new AnimationBridge({ outputDir });
    const created = structured(await bridge.createSprite({ width: 16, height: 16, name: 'Atomic' }));
    const projectId = created.projectId as string;

    const success = structured(await bridge.setPixels({
      projectId,
      expectedRevision: 0,
      pixels: [{ x: 1, y: 2, color: '#ff0000' }],
    }));
    expect(success.revision).toBe(1);
    const committed = canonicalJson(bridge.getDocument(projectId));

    const stale = await bridge.setPixels({
      projectId,
      expectedRevision: 0,
      pixels: [{ x: 2, y: 2, color: '#00ff00' }],
    });
    expect(stale.isError).toBe(true);
    expect(structured(stale).code).toBe('STALE_REVISION');
    expect(canonicalJson(bridge.getDocument(projectId))).toBe(committed);

    const invalid = await bridge.setPixels({
      projectId,
      expectedRevision: 1,
      pixels: [
        { x: 3, y: 3, color: '#ffffff' },
        { x: 99, y: 3, color: '#ffffff' },
      ],
    });
    expect(invalid.isError).toBe(true);
    expect(structured(invalid).code).toBe('VALIDATION_FAILED');
    expect(canonicalJson(bridge.getDocument(projectId))).toBe(committed);

    const stalePath = path.join(outputDir, 'stale.dogsprite');
    const staleSave = await bridge.saveProject({ projectId, expectedRevision: 0, outputPath: stalePath });
    expect(staleSave.isError).toBe(true);
    expect(fs.existsSync(stalePath)).toBe(false);

    const undo = structured(await bridge.undo({ projectId, expectedRevision: 1 }));
    expect(undo.revision).toBe(2);
    expect(bridge.getDocument(projectId)?.cels['cel:frame-0:layer-1'].data.every((byte) => byte === 0)).toBe(true);
    const secondUndo = await bridge.undo({ projectId, expectedRevision: 2 });
    expect(secondUndo.isError).toBe(true);
  });

  it('preserves frame order, fresh duplicate cels, aliases, durations, linked propagation, and latest-only undo', async () => {
    const outputDir = temporaryDirectory();
    const document = cloneFixture(makeGoldenWalkDocument());
    document.frames[1].celRefs.base = document.frames[0].celRefs.base;
    document.layers.push({
      id: 'overlay',
      name: 'Overlay',
      visible: true,
      locked: false,
      opacity: 1,
      blendMode: 'normal',
    });
    document.frames.forEach((frame) => { frame.celRefs.overlay = frame.celRefs.base; });
    const sourcePath = writeDocument(outputDir, 'linked.dogsprite', document);
    const bridge = new AnimationBridge({ outputDir });
    const loaded = structured(await bridge.loadProject({ filePath: sourcePath }));
    const projectId = loaded.projectId as string;

    await bridge.setPixels({ projectId, expectedRevision: 0, frameId: 'frame-0', layer: 'base', pixels: [{ x: 0, y: 0, color: '#ffffff' }] });
    const linked = bridge.getDocument(projectId)!;
    expect(linked.frames[0].celRefs.base).toBe(linked.frames[1].celRefs.base);
    expect(linked.cels[linked.frames[1].celRefs.base].data.slice(0, 4)).toEqual([255, 255, 255, 255]);

    const created = structured(await bridge.createFrame({ projectId, expectedRevision: 1, frameId: 'frame-new', afterFrameId: 'frame-1', durationMs: 120 }));
    expect(created.frameOrder).toEqual(['frame-0', 'frame-1', 'frame-new', 'frame-2', 'frame-3']);

    const duplicated = structured(await bridge.duplicateFrame({ projectId, expectedRevision: 2, sourceFrameId: 'frame-0', frameId: 'frame-copy', afterFrameId: 'frame-new' }));
    expect(duplicated.frameOrder).toEqual(['frame-0', 'frame-1', 'frame-new', 'frame-copy', 'frame-2', 'frame-3']);
    const afterDuplicate = bridge.getDocument(projectId)!;
    const sourceRefs = afterDuplicate.frames.find((frame) => frame.id === 'frame-0')!.celRefs;
    const duplicateRefs = afterDuplicate.frames.find((frame) => frame.id === 'frame-copy')!.celRefs;
    expect(duplicateRefs.base).not.toBe(sourceRefs.base);
    expect(duplicateRefs.base).toBe(duplicateRefs.overlay);

    const duration = structured(await bridge.setFrameDuration({ projectId, expectedRevision: 3, frameId: 'frame-copy', durationMs: 175 }));
    expect(duration.revision).toBe(4);
    expect(bridge.getDocument(projectId)?.frames.find((frame) => frame.id === 'frame-copy')?.durationMs).toBe(175);

    const undo = structured(await bridge.undo({ projectId, expectedRevision: 4 }));
    expect(undo.revision).toBe(5);
    expect(bridge.getDocument(projectId)?.frames.find((frame) => frame.id === 'frame-copy')?.durationMs).toBe(100);
    expect((await bridge.undo({ projectId, expectedRevision: 5 })).isError).toBe(true);
  });

  it('loads v1/v2, saves v2 losslessly, and produces atomic review PNGs with exact bounds', async () => {
    const outputDir = temporaryDirectory();
    const golden = makeGoldenWalkDocument();
    const v1: ProjectFileV1 = {
      version: 1,
      project: golden.project,
      layers: golden.layers,
      activeLayerId: golden.activeLayerId,
      frames: golden.frames.map((frame, index) => ({
        id: frame.id,
        index,
        duration: frame.durationMs,
        layerData: Object.fromEntries(Object.entries(frame.celRefs).map(([layerId, celId]) => [layerId, golden.cels[celId].data])),
      })),
      fps: 10,
    };
    const v1Path = writeDocument(outputDir, 'source-v1.dogsprite', v1);
    const bridge = new AnimationBridge({ outputDir });
    const loaded = structured(await bridge.loadProject({ filePath: v1Path }));
    const projectId = loaded.projectId as string;
    expect(loaded.version).toBe(2);
    expect(loaded.frameCount).toBe(4);

    await bridge.setPixels({ projectId, expectedRevision: 0, frameId: 'frame-0', layer: 'base', pixels: [{ x: 0, y: 0, color: '#ffffff' }] });
    const review = await bridge.getAnimationReview({ projectId, scale: 4 });
    const reviewData = structured(review);
    const changedFrames = reviewData.changedFrames as Array<{ frameId: string; changedBounds: unknown }>;
    expect(changedFrames).toContainEqual(expect.objectContaining({ frameId: 'frame-0', changedBounds: { x: 0, y: 0, width: 1, height: 1 } }));
    const artifacts = reviewData.artifacts as Record<string, string>;
    expect(Object.keys(artifacts).sort()).toEqual(['baseline1x', 'baseline4x', 'current1x', 'current4x', 'diff1x', 'diff4x']);
    for (const artifact of Object.values(artifacts)) {
      expect(fs.readFileSync(artifact).subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    }
    const image = review.content.find((item) => item.type === 'image');
    expect(image?.type).toBe('image');
    if (image?.type === 'image') expect(Buffer.from(image.data, 'base64').subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));

    const savePath = path.join(outputDir, 'saved-v2.dogsprite');
    const saved = structured(await bridge.saveProject({ projectId, expectedRevision: 1, outputPath: savePath }));
    expect(saved.revision).toBe(1);
    const persisted = JSON.parse(fs.readFileSync(savePath, 'utf8')) as SpriteDocumentV2;
    expect(persisted.version).toBe(2);
    expect(canonicalJson(persisted)).toBe(canonicalJson(bridge.getDocument(projectId)));

    const reloadedBridge = new AnimationBridge({ outputDir });
    await reloadedBridge.loadProject({ filePath: savePath });
    expect(canonicalJson(reloadedBridge.getDocument(projectId))).toBe(canonicalJson(persisted));
  });

  it('returns structured failure when loading an oversized v1 project', async () => {
    const outputDir = temporaryDirectory();
    const source = makeGoldenWalkDocument();
    const oversized = {
      version: 1,
      project: { ...source.project, width: 1025 },
      layers: source.layers,
      activeLayerId: source.activeLayerId,
      frames: [{ id: 'frame-0', index: 0, duration: 100, layerData: {} }],
      fps: 10,
    };
    const bridge = new AnimationBridge({ outputDir });
    const result = await bridge.loadProject({ filePath: writeDocument(outputDir, 'oversized-v1.dogsprite', oversized) });

    expect(result.isError).toBe(true);
    expect(structured(result)).toEqual(expect.objectContaining({
      ok: false,
      code: 'VALIDATION_FAILED',
      message: 'Project validation failed',
    }));
  });

  it('rejects oversized contact sheets before PNG or review-directory allocation', async () => {
    const outputDir = temporaryDirectory();
    const bridge = new AnimationBridge({ outputDir });
    const created = structured(await bridge.createSprite({ width: 1024, height: 1024, name: 'Oversized Review' }));
    const result = await bridge.getAnimationReview({ projectId: created.projectId as string, scale: 32 });

    expect(result.isError).toBe(true);
    expect(structured(result)).toEqual(expect.objectContaining({
      ok: false,
      code: 'VALIDATION_FAILED',
    }));
    expect((structured(result).message as string)).toContain('RGBA bytes');
    expect(fs.existsSync(path.join(outputDir, 'reviews'))).toBe(false);
  });

  it('returns structured failure when a file blocks the review root', async () => {
    const outputDir = temporaryDirectory();
    const bridge = new AnimationBridge({ outputDir });
    const created = structured(await bridge.createSprite({ width: 16, height: 16, name: 'Blocked Review' }));
    fs.writeFileSync(path.join(outputDir, 'reviews'), 'not a directory');

    const result = await bridge.getAnimationReview({ projectId: created.projectId as string, scale: 4 });
    expect(result.isError).toBe(true);
    expect(structured(result)).toEqual(expect.objectContaining({
      ok: false,
      code: 'VALIDATION_FAILED',
    }));
    expect((structured(result).message as string)).toContain('Review generation failed');
  });

  it('numbers inserted frames in current clip order before baseline-only frames', async () => {
    const outputDir = temporaryDirectory();
    const baseline = makeGoldenWalkDocument();
    const bridge = new AnimationBridge({ outputDir });
    const loaded = structured(await bridge.loadProject({
      filePath: writeDocument(outputDir, 'ordered.dogsprite', baseline),
    }));
    const projectId = loaded.projectId as string;
    await bridge.createFrame({ projectId, expectedRevision: 0, frameId: 'frame-middle', afterFrameId: 'frame-0', durationMs: 125 });
    const current = bridge.getDocument(projectId)!;

    expect(analyzeFrameChanges(baseline, current).map((change) => [change.frameId, change.frameNumber])).toEqual([
      ['frame-0', 1],
      ['frame-middle', 2],
      ['frame-1', 3],
      ['frame-2', 4],
      ['frame-3', 5],
    ]);
    const review = structured(await bridge.getAnimationReview({ projectId, scale: 4 }));
    expect(review.changedFrames).toContainEqual(expect.objectContaining({ frameId: 'frame-middle', frameNumber: 2 }));
  });
});
