import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { AnimationBridge } from '../../mcp-server/src/animationBridge';
import { encodeAnimationAtlas } from '../../mcp-server/src/animationBundle';
import {
  buildAnimationBundle,
  buildBundleReviewSidecar,
  compositeFrame,
  validateAsepriteManifestSubset,
  type AsepriteAnimationManifest,
} from '../../packages/sprite-core/src';
import { cloneFixture, makeGoldenWalkDocument } from '../fixtures/sprite-core/fixtures';

const { PNG } = createRequire(import.meta.url)('../../mcp-server/node_modules/pngjs') as {
  PNG: { sync: { read(buffer: Buffer): { width: number; height: number; colorType: number; data: Buffer } } };
};

const temporaryDirectories: string[] = [];

afterEach(() => {
  while (temporaryDirectories.length > 0) fs.rmSync(temporaryDirectories.pop()!, { recursive: true, force: true });
});

function cloneManifest(manifest: AsepriteAnimationManifest): AsepriteAnimationManifest {
  return JSON.parse(JSON.stringify(manifest)) as AsepriteAnimationManifest;
}

function structured(result: Awaited<ReturnType<AnimationBridge['exportAnimationBundle']>>): Record<string, unknown> {
  return result.structuredContent as Record<string, unknown>;
}

describe('deterministic animation bundle', () => {
  it('builds byte-identical canonical data and reconstructs every composited frame from the PNG', async () => {
    const document = makeGoldenWalkDocument();
    const first = await buildAnimationBundle(document);
    const second = await buildAnimationBundle(document);
    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
    if (!first.ok || !second.ok) return;

    expect(first.value.atlasRgba).toEqual(second.value.atlasRgba);
    expect(first.value.manifestJson).toBe(second.value.manifestJson);
    expect(first.value.bundleHash).toBe(second.value.bundleHash);
    const firstPng = encodeAnimationAtlas(first.value);
    const secondPng = encodeAnimationAtlas(second.value);
    expect(firstPng).toEqual(secondPng);

    const decoded = PNG.sync.read(firstPng);
    expect({ width: decoded.width, height: decoded.height, colorType: decoded.colorType }).toEqual({ width: 64, height: 16, colorType: 6 });
    document.frames.forEach((frame, frameIndex) => {
      const reconstructed = new Uint8Array(16 * 16 * 4);
      for (let y = 0; y < 16; y += 1) {
        const sourceStart = (y * 64 + frameIndex * 16) * 4;
        reconstructed.set(decoded.data.subarray(sourceStart, sourceStart + 16 * 4), y * 16 * 4);
      }
      expect(reconstructed).toEqual(new Uint8Array(compositeFrame(document, frame.id)));
    });
  });

  it.each([
    ['rectangle', (manifest: AsepriteAnimationManifest) => { manifest.frames[2].frame.x = 31; }],
    ['tag', (manifest: AsepriteAnimationManifest) => { manifest.meta.frameTags[0].name = 'idle' as 'walk_right'; }],
    ['timing', (manifest: AsepriteAnimationManifest) => { manifest.frames[1].duration = 101; }],
    ['pivot', (manifest: AsepriteAnimationManifest) => { manifest.meta.slices[0].keys[0].pivot.y = 14 as 15; }],
  ])('standalone validator rejects mutated %s metadata', async (_, mutate) => {
    const built = await buildAnimationBundle(makeGoldenWalkDocument());
    expect(built.ok).toBe(true);
    if (!built.ok) return;
    const manifest = cloneManifest(built.value.manifest);
    mutate(manifest);
    expect((await validateAsepriteManifestSubset(manifest)).ok).toBe(false);
  });

  it('fails closed when the canonical source pixels change', async () => {
    const document = cloneFixture(makeGoldenWalkDocument());
    document.cels['cel-0'].data.splice(0, 4, 255, 255, 255, 255);
    const result = await buildAnimationBundle(document);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toContainEqual(expect.objectContaining({ code: 'SOURCE_PIXEL_MISMATCH' }));
  });

  it('exports atomically without revision changes and keeps review status outside deterministic runtime bytes', async () => {
    const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-bundle-'));
    temporaryDirectories.push(outputDir);
    const sourcePath = path.join(outputDir, 'golden.dogsprite');
    fs.writeFileSync(sourcePath, JSON.stringify(makeGoldenWalkDocument()));
    const bridge = new AnimationBridge({ outputDir });
    const loaded = await bridge.loadProject({ filePath: sourcePath });
    const projectId = (loaded.structuredContent as Record<string, unknown>).projectId as string;
    const firstPath = path.join(outputDir, 'first');
    const secondPath = path.join(outputDir, 'second');
    const first = structured(await bridge.exportAnimationBundle({ projectId, expectedRevision: 0, outputPath: firstPath, reviewStatus: 'draft' }));
    const second = structured(await bridge.exportAnimationBundle({ projectId, expectedRevision: 0, outputPath: secondPath, reviewStatus: 'approved' }));

    expect(first.revision).toBe(0);
    expect(second.revision).toBe(0);
    expect(first.bundleHash).toBe(second.bundleHash);
    expect(fs.readFileSync(path.join(firstPath, 'atlas.png'))).toEqual(fs.readFileSync(path.join(secondPath, 'atlas.png')));
    expect(fs.readFileSync(path.join(firstPath, 'manifest.json'))).toEqual(fs.readFileSync(path.join(secondPath, 'manifest.json')));
    expect(JSON.parse(fs.readFileSync(path.join(firstPath, 'review.json'), 'utf8'))).toEqual(buildBundleReviewSidecar(first.bundleHash as string, 'draft'));
    expect(JSON.parse(fs.readFileSync(path.join(secondPath, 'review.json'), 'utf8'))).toEqual(buildBundleReviewSidecar(second.bundleHash as string, 'approved'));
    expect(bridge.getDocument(projectId)?.revision).toBe(0);
  });
});
