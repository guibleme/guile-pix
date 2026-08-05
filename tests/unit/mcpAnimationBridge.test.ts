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
  it('preserves existing output sentinels unless overwrite is explicitly true and clears masks on reload', async () => {
    const outputDir = temporaryDirectory();
    const bridge = new AnimationBridge({ outputDir });
    const created = structured(await bridge.createSprite({ width: 2, height: 2, name: 'overwrite' }));
    const projectId = created.projectId as string;
    const savePath = path.join(outputDir, 'sentinel.dogsprite');
    fs.writeFileSync(savePath, 'USER_SENTINEL');
    expect((await bridge.saveProject({ projectId, expectedRevision: 0, outputPath: savePath })).isError).toBe(true);
    expect(fs.readFileSync(savePath, 'utf8')).toBe('USER_SENTINEL');
    expect((await bridge.saveProject({ projectId, expectedRevision: 0, outputPath: savePath, overwrite: true })).isError).not.toBe(true);
    await bridge.defineMask({ projectId, name: 'temporary', mask: { runs: [{ y: 0, xStart: 0, xEnd: 0 }] } });

    const previewPath = path.join(outputDir, 'sentinel.png');
    fs.writeFileSync(previewPath, 'PREVIEW_SENTINEL');
    expect((await bridge.exportAnimationPreview({ projectId, expectedRevision: 0, outputPath: previewPath })).isError).toBe(true);
    expect(fs.readFileSync(previewPath, 'utf8')).toBe('PREVIEW_SENTINEL');
    expect((await bridge.exportAnimationPreview({ projectId, expectedRevision: 0, outputPath: previewPath, overwrite: true })).isError).not.toBe(true);

    expect((await bridge.loadProject({ filePath: savePath })).isError).not.toBe(true);
    expect((await bridge.getMask({ projectId, name: 'temporary' })).isError).toBe(true);
  });

  it('fails unsupported or inexact animated preview formats without substituting output', async () => {
    const bridge = new AnimationBridge({ outputDir: temporaryDirectory() });
    const created = structured(await bridge.createSprite({ width: 2, height: 2, name: 'formats' }));
    const projectId = created.projectId as string;
    await bridge.setFrameDuration({ projectId, expectedRevision: 0, durationMs: 105 });
    const gif = await bridge.exportAnimationPreview({ projectId, expectedRevision: 1, format: 'gif' });
    expect(gif.isError).toBe(true);
    expect(structured(gif)).toEqual(expect.objectContaining({ code: 'VALIDATION_FAILED', correctiveAction: 'Use format "apng" for exact millisecond timing.' }));
    const webp = await bridge.exportAnimationPreview({ projectId, expectedRevision: 1, format: 'webp' });
    expect(webp.isError).toBe(true);
    expect(structured(webp).correctiveAction).toContain('format "apng"');
  });

  it('preserves cross-frame cel links while duplicating a range', async () => {
    const outputDir = temporaryDirectory();
    const source = makeGoldenWalkDocument();
    source.frames[1].celRefs.base = source.frames[0].celRefs.base;
    const bridge = new AnimationBridge({ outputDir });
    const loaded = structured(await bridge.loadProject({ filePath: writeDocument(outputDir, 'range-links.dogsprite', source) }));
    const projectId = loaded.projectId as string;
    const duplicated = await bridge.duplicateFrameRange({ projectId, expectedRevision: 0, sourceFrameIds: ['frame-0', 'frame-1'], targetFrameIds: ['copy-0', 'copy-1'] });
    expect(duplicated.isError).not.toBe(true);
    const document = bridge.getDocument(projectId)!;
    expect(document.frames.find((frame) => frame.id === 'copy-0')!.celRefs.base).toBe(document.frames.find((frame) => frame.id === 'copy-1')!.celRefs.base);
  });

  it('preserves anchored connectivity and fails closed on rigid-region collisions', async () => {
    const bridge = new AnimationBridge({ outputDir: temporaryDirectory() });
    const created = structured(await bridge.createSprite({ width: 5, height: 1, name: 'Transform' }));
    const projectId = created.projectId as string;
    await bridge.setPixels({ projectId, expectedRevision: 0, pixels: [0, 1, 2, 4].map((x) => ({ x, y: 0, color: '#ffffffff' })) });
    const bridged = structured(await bridge.transformRegion({ projectId, expectedRevision: 1, mask: { runs: [{ y: 0, xStart: 1, xEnd: 2 }] }, pivotPx: { x: 1, y: 0 }, translatePx: { x: 1, y: 0 }, fillMode: 'bridge', anchoredRegions: [{ name: 'root', mask: { runs: [{ y: 0, xStart: 0, xEnd: 0 }] } }] }));
    expect(bridged).toEqual(expect.objectContaining({ bridgePixelsRetained: 2, anchoredRegions: [{ name: 'root', connectedBefore: true, connectedAfter: true }] }));
    const connected = bridge.getDocument(projectId)!;
    expect([0, 1, 2, 3].every((x) => connected.cels[connected.frames[0].celRefs['layer-1']].data[x * 4 + 3] === 255)).toBe(true);
    const before = canonicalJson(connected);
    const collision = await bridge.transformRegion({ projectId, expectedRevision: 2, mask: { runs: [{ y: 0, xStart: 2, xEnd: 3 }] }, pivotPx: { x: 2, y: 0 }, translatePx: { x: 1, y: 0 }, fillMode: 'transparent', preservePixelMass: true });
    expect(collision.isError).toBe(true);
    expect(canonicalJson(bridge.getDocument(projectId))).toBe(before);
  });

  it('supports the revisioned production authoring, inspection, preview, grid, and generic runtime loop', async () => {
    const outputDir = temporaryDirectory();
    const bridge = new AnimationBridge({ outputDir });
    const created = structured(await bridge.createSprite({ width: 4, height: 4, name: 'Generic', palette: 'gameboy' }));
    const projectId = created.projectId as string;
    expect(created).toEqual(expect.objectContaining({ pivotPx: { x: 2, y: 3 } }));
    expect((created.palette as { colors: string[] }).colors).toHaveLength(4);

    await bridge.setProjectMetadata({ projectId, expectedRevision: 0, pivotPx: { x: 1, y: 3 }, groundLineY: 3, facing: 'right', rootMotion: { mode: 'none' } });
    await bridge.createFrame({ projectId, expectedRevision: 1, frameId: 'frame-1', durationMs: 150 });
    await bridge.setPixels({ projectId, expectedRevision: 2, frameId: 'frame-0', pixels: [{ x: 0, y: 0, color: '#ff0000ff' }] });
    await bridge.drawPrimitives({ projectId, expectedRevision: 3, frameId: 'frame-1', operations: [{ kind: 'line', color: '#00ff00ff', x1: 0, y1: 0, x2: 1, y2: 0 }] });
    await bridge.defineMask({ projectId, name: 'tip', mask: { runs: [{ y: 0, xStart: 0, xEnd: 0 }] } });
    await bridge.applyMask({ projectId, expectedRevision: 4, name: 'tip', frameId: 'frame-0', action: 'copy', translatePx: { x: 1, y: 0 } });
    const transformed = structured(await bridge.transformRegion({ projectId, expectedRevision: 5, frameId: 'frame-0', mask: { runs: [{ y: 0, xStart: 1, xEnd: 1 }] }, pivotPx: { x: 1, y: 0 }, translatePx: { x: 0, y: 1 }, fillMode: 'transparent', preservePixelMass: true }));
    expect(transformed).toEqual(expect.objectContaining({ collisions: 0, outOfBounds: 0, pixelMassBefore: 2, pixelMassAfter: 2 }));
    await bridge.reorderFrames({ projectId, expectedRevision: 6, frameIds: ['frame-1', 'frame-0'] });
    await bridge.createLayer({ projectId, expectedRevision: 7, layerId: 'fx', name: 'FX' });
    await bridge.linkCels({ projectId, expectedRevision: 8, source: { frameId: 'frame-1', layerId: 'fx' }, targets: [{ frameId: 'frame-0', layerId: 'fx' }] });
    await bridge.unlinkCel({ projectId, expectedRevision: 9, frameId: 'frame-0', layerId: 'fx' });
    await bridge.createClip({ projectId, expectedRevision: 10, clipId: 'run', name: 'run', frameIds: ['frame-1', 'frame-0'], loop: 'linear' });
    await bridge.setClipMetadata({ projectId, expectedRevision: 11, clipId: 'run', direction: 'reverse' });

    const snapshot = structured(await bridge.getProjectSnapshot({ projectId, includePixels: true, region: { x: 0, y: 0, width: 2, height: 2 } }));
    expect(snapshot).toEqual(expect.objectContaining({ revision: 12, activeClipId: 'run' }));
    expect(snapshot.pixelCels).toBeTruthy();

    const previewResult = await bridge.exportAnimationPreview({ projectId, expectedRevision: 12, scale: 2, repeat: 3 });
    const preview = structured(previewResult);
    expect(preview).toEqual(expect.objectContaining({ mimeType: 'image/apng', frameDurationsMs: [150, 100], totalDurationMs: 250, repeat: 3 }));
    expect(previewResult.content.some((item) => item.type === 'image' && item.mimeType === 'image/apng')).toBe(true);
    const previewBytes = fs.readFileSync(preview.outputPath as string);
    expect(previewBytes.includes(Buffer.from('acTL'))).toBe(true);
    const animationControl = previewBytes.indexOf(Buffer.from('acTL'));
    expect(previewBytes.readUInt32BE(animationControl + 8)).toBe(3);
    const delays: Array<[number, number]> = [];
    let offset = 0;
    while ((offset = previewBytes.indexOf(Buffer.from('fcTL'), offset)) >= 0) {
      delays.push([previewBytes.readUInt16BE(offset + 24), previewBytes.readUInt16BE(offset + 26)]);
      offset += 4;
    }
    expect(delays).toEqual([[150, 1000], [100, 1000]]);
    const gif = await bridge.exportAnimationPreview({ projectId, expectedRevision: 12, format: 'gif' });
    expect(gif.isError).not.toBe(true);
    expect((gif.structuredContent as Record<string, unknown>)).toEqual(expect.objectContaining({ format: 'gif', mimeType: 'image/gif' }));
    const gifBytes = fs.readFileSync((gif.structuredContent as Record<string, unknown>).outputPath as string);
    expect(gifBytes.subarray(0, 6).toString('ascii')).toBe('GIF89a');
    const gifDelays: number[] = [];
    for (let index = 0; index < gifBytes.length - 5; index += 1) if (gifBytes[index] === 0x21 && gifBytes[index + 1] === 0xf9 && gifBytes[index + 2] === 0x04) gifDelays.push(gifBytes.readUInt16LE(index + 4));
    expect(gifDelays).toEqual([15, 10]);
    expect((await bridge.exportAnimationPreview({ projectId, expectedRevision: 12, format: 'webp' })).isError).toBe(true);

    const review = structured(await bridge.getAnimationReview({ projectId, scale: 2, columns: 1 }));
    expect(review.layout).toEqual(expect.objectContaining({ columns: 1, rows: 2 }));
    expect(review).toEqual(expect.objectContaining({ frameOrderChanged: true, currentFrameOrder: ['frame-1', 'frame-0'] }));

    const bundle = structured(await bridge.exportAnimationBundle({ projectId, expectedRevision: 12 }));
    expect(bundle).toEqual(expect.objectContaining({ bundleKind: 'generic_v2', frameCount: 2, artisticApproval: 'pending_human_review' }));
    const manifest = JSON.parse(fs.readFileSync(bundle.manifestPath as string, 'utf8')) as { frames: Array<{ duration: number }>; meta: { guile_pix: { facing: string; artisticApproval: string } } };
    expect(manifest.frames.map((frame) => frame.duration)).toEqual([150, 100]);
    expect(manifest.meta.guile_pix).toEqual(expect.objectContaining({ facing: 'right', artisticApproval: 'pending_human_review' }));
  });

  it('rotates a multi-pixel cannon barrel around its anchored grip and fails atomically on an invalid sway', async () => {
    const bridge = new AnimationBridge({ outputDir: temporaryDirectory() });
    const created = structured(await bridge.createSprite({ width: 9, height: 7, name: 'cannon-sway' }));
    const projectId = created.projectId as string;
    await bridge.setPixels({
      projectId,
      expectedRevision: 0,
      pixels: [
        { x: 2, y: 3, color: '#ffffffff' },
        { x: 3, y: 3, color: '#ffffffff' },
        { x: 4, y: 3, color: '#ffffffff' },
        { x: 5, y: 3, color: '#ffffffff' },
      ],
    });

    const cannon = structured(await bridge.transformRegion({
      projectId,
      expectedRevision: 1,
      mask: { runs: [{ y: 3, xStart: 2, xEnd: 5 }] },
      pivotPx: { x: 2, y: 3 },
      rotateDegrees: 90,
      fillMode: 'transparent',
      preservePixelMass: true,
      anchoredRegions: [{ name: 'grip', mask: { runs: [{ y: 3, xStart: 2, xEnd: 2 }] } }],
    }));
    const selected = cannon.selectedRegion as { massBefore: number; massAfter: number; localBoundsBefore: { width: number; height: number }; localBoundsAfter: { width: number; height: number }; componentsBefore: number; componentsAfter: number };
    expect(cannon).toEqual(expect.objectContaining({ selectedOpaquePixels: 3, writtenOpaquePixels: 3, collisions: 0, holes: 0, outOfBounds: 0, pixelMassBefore: 4, pixelMassAfter: 4 }));
    expect(selected).toEqual(expect.objectContaining({
      massBefore: 3,
      massAfter: 3,
      localBoundsBefore: { x: 3, y: 3, width: 3, height: 1 },
      localBoundsAfter: { x: 2, y: 4, width: 1, height: 3 },
      componentsBefore: 1,
      componentsAfter: 1,
    }));
    expect(selected.localBoundsBefore.width * selected.localBoundsBefore.height).toBe(3);
    expect(selected.localBoundsAfter.width * selected.localBoundsAfter.height).toBe(3);
    expect(cannon.anchoredRegions).toEqual([{ name: 'grip', connectedBefore: true, connectedAfter: true }]);

    const committed = canonicalJson(bridge.getDocument(projectId));
    const invalidSway = await bridge.transformRegion({
      projectId,
      expectedRevision: 2,
      mask: { runs: [{ y: 3, xStart: 2, xEnd: 2 }, { y: 4, xStart: 2, xEnd: 2 }, { y: 5, xStart: 2, xEnd: 2 }, { y: 6, xStart: 2, xEnd: 2 }] },
      pivotPx: { x: 2, y: 3 },
      rotateDegrees: 90,
      fillMode: 'transparent',
      preservePixelMass: true,
      anchoredRegions: [{ name: 'grip', mask: { runs: [{ y: 3, xStart: 2, xEnd: 2 }] } }],
    });
    expect(invalidSway.isError).toBe(true);
    expect(structured(invalidSway)).toEqual(expect.objectContaining({ code: 'VALIDATION_FAILED', target: expect.objectContaining({ collisions: 0, holes: 0, outOfBounds: 1 }) }));
    expect(canonicalJson(bridge.getDocument(projectId))).toBe(committed);
  });

  it('reports every caller-declared diagnostic category without scoring', async () => {
    const bridge = new AnimationBridge({ outputDir: temporaryDirectory() });
    const created = structured(await bridge.createSprite({ width: 6, height: 3, name: 'diagnostics' }));
    const projectId = created.projectId as string;
    await bridge.setPixels({ projectId, expectedRevision: 0, pixels: [{ x: 1, y: 1, color: '#ffffffff' }, { x: 2, y: 1, color: '#ffffffff' }] });
    await bridge.duplicateFrame({ projectId, expectedRevision: 1, frameId: 'frame-1' });
    await bridge.setFrameDuration({ projectId, expectedRevision: 2, frameId: 'frame-1', durationMs: 120 });
    const mask = { runs: [{ y: 1, xStart: 0, xEnd: 4 }] };
    const validated = structured(await bridge.validateAnimation({ projectId, diagnostics: { minDurationMs: 90, maxDurationMs: 130, includeLoopDiscontinuity: true, detectDuplicateFrames: true, componentRegions: [{ name: 'body', layerId: 'layer-1', mask }], trackedRegions: [{ name: 'foot', layerId: 'layer-1', mask }], rigidRegions: [{ name: 'cannon', layerId: 'layer-1', mask }], phaseSequence: { expected: ['contact', 'passing'], observed: [{ frameId: 'frame-0', phase: 'contact' }] }, movingRegions: [{ fromFrameId: 'frame-0', toFrameId: 'frame-1', mask: { runs: [{ y: 1, xStart: 1, xEnd: 3 }] } }], symmetryPairs: [{ frameIdA: 'frame-0', frameIdB: 'frame-1' }] } }));
    const codes = (validated.diagnostics as Array<{ code: string }>).map((entry) => entry.code);
    expect(codes).toEqual(expect.arrayContaining(['DECLARED_COMPONENT_SEAM_METRICS', 'DECLARED_PIVOT_FOOT_DRIFT', 'DECLARED_RIGID_REGION_METRICS', 'DECLARED_PHASE_SEQUENCE', 'CHANGES_OUTSIDE_DECLARED_MOVING_REGION', 'DECLARED_TIMING_SYMMETRY', 'LAST_TO_FIRST_RAW_CHANGE']));
    expect(validated).not.toHaveProperty('score');
    expect(validated).not.toHaveProperty('artisticApproval');
  });

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

  it('preserves frame order, fresh duplicate cels, aliases, durations, linked propagation, and bounded undo/redo', async () => {
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
    expect((await bridge.undo({ projectId, expectedRevision: 5 })).isError).not.toBe(true);
    expect((await bridge.redo({ projectId, expectedRevision: 6 })).isError).not.toBe(true);
    expect((await bridge.redo({ projectId, expectedRevision: 7 })).isError).not.toBe(true);
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
