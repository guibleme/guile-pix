import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { AnimationBridge } from '../../mcp-server/src/animationBridge';
import { encodeAnimationAtlas } from '../../mcp-server/src/animationBundle';
import {
  WALK_RIGHT_BRIEF,
  WALK_RIGHT_POSE_RECIPE,
  WALK_RIGHT_SEMANTIC_REGION_ROWS,
  buildAnimationBundle,
  canonicalJson,
  compositeFrame,
  generateWalkRightDocument,
  hashDocumentPixels,
  hashDocumentSemantic,
  validateAsepriteManifestSubset,
  validateDocumentV2,
  type SpriteDocumentV2,
  type WalkRightBrief,
} from '../../packages/sprite-core/src';
import { cloneFixture, makeGoldenWalkDocument } from '../fixtures/sprite-core/fixtures';
import semanticRecipeFixture from '../fixtures/sprite-core/cornerfall-fighter-right-16.walk-right-semantic-v1.json';

const temporaryDirectories: string[] = [];

afterEach(() => {
  while (temporaryDirectories.length > 0) fs.rmSync(temporaryDirectories.pop()!, { recursive: true, force: true });
});

function fixedBrief(): WalkRightBrief {
  return JSON.parse(JSON.stringify(WALK_RIGHT_BRIEF)) as WalkRightBrief;
}

function structured(result: { structuredContent?: unknown }): Record<string, unknown> {
  return result.structuredContent as Record<string, unknown>;
}

function resizeInvalidSource(document: SpriteDocumentV2): void {
  document.project.width = 15;
  Object.values(document.cels).forEach((cel) => { cel.data = cel.data.slice(0, 15 * 16 * 4); });
}

describe('constrained semantic walk_right generator', () => {
  it('owns every source pixel once and deterministically transforms semantic regions instead of replaying golden outputs', async () => {
    const source = makeGoldenWalkDocument();
    const sourceBefore = canonicalJson(source);
    const first = await generateWalkRightDocument(source, fixedBrief());
    const second = await generateWalkRightDocument(source, fixedBrief());
    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
    if (!first.ok || !second.ok) return;

    expect(WALK_RIGHT_SEMANTIC_REGION_ROWS).toEqual(semanticRecipeFixture.regionRows);
    expect(WALK_RIGHT_POSE_RECIPE).toEqual(semanticRecipeFixture.poses);
    const sourcePixels = compositeFrame(source, source.frames[0].id);
    const opaqueSourcePixels = Array.from(sourcePixels)
      .filter((_, index) => index % 4 === 3 && sourcePixels[index] > 0).length;
    const ownedPixels = WALK_RIGHT_SEMANTIC_REGION_ROWS.join('').replaceAll('.', '').length;
    expect(ownedPixels).toBe(opaqueSourcePixels);
    expect(canonicalJson(first.value.document)).toBe(canonicalJson(second.value.document));
    expect(canonicalJson(source)).toBe(sourceBefore);
    expect(first.value.bundleHash).toBe(second.value.bundleHash);
    expect(first.value.poseIds).toEqual(['contact_a', 'passing_a', 'contact_b', 'passing_b']);
    expect(compositeFrame(first.value.document, 'frame-0')).toEqual(compositeFrame(source, 'frame-0'));
    for (const frameId of ['frame-1', 'frame-2', 'frame-3']) {
      expect(compositeFrame(first.value.document, frameId)).not.toEqual(compositeFrame(source, frameId));
    }
    expect(await hashDocumentPixels(first.value.document)).not.toBe(await hashDocumentPixels(source));
  });

  it('satisfies document, deterministic bundle, Aseprite-subset, and runtime metadata gates', async () => {
    const generated = await generateWalkRightDocument(makeGoldenWalkDocument(), fixedBrief());
    expect(generated.ok).toBe(true);
    if (!generated.ok) return;
    expect(validateDocumentV2(generated.value.document).ok).toBe(true);
    const firstBundle = await buildAnimationBundle(generated.value.document);
    const secondBundle = await buildAnimationBundle(generated.value.document);
    expect(firstBundle.ok).toBe(true);
    expect(secondBundle.ok).toBe(true);
    if (!firstBundle.ok || !secondBundle.ok) return;
    expect(firstBundle.value.atlasRgba).toEqual(secondBundle.value.atlasRgba);
    expect(firstBundle.value.manifestJson).toBe(secondBundle.value.manifestJson);
    expect(encodeAnimationAtlas(firstBundle.value)).toEqual(encodeAnimationAtlas(secondBundle.value));
    expect((await validateAsepriteManifestSubset(firstBundle.value.manifest)).ok).toBe(true);
    expect(firstBundle.value.manifest.meta.guile_pix).toEqual(expect.objectContaining({
      facing: 'right',
      groundLineY: 15,
      rootMotion: 'none',
    }));
  });

  it('depends only on the approved base frame and ignores all pre-existing later-frame pixels', async () => {
    const baseline = makeGoldenWalkDocument();
    const changedLaterFrames = cloneFixture(baseline);
    for (const frame of changedLaterFrames.frames.slice(1)) {
      const cel = changedLaterFrames.cels[frame.celRefs.base];
      cel.data = cel.data.map((_, index) => (index % 4 === 3 ? 255 : (index * 37) % 256));
    }
    const first = await generateWalkRightDocument(baseline, fixedBrief());
    const second = await generateWalkRightDocument(changedLaterFrames, fixedBrief());
    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
    if (!first.ok || !second.ok) return;
    expect(canonicalJson(first.value.document)).toBe(canonicalJson(second.value.document));
    expect(first.value.bundleHash).toBe(second.value.bundleHash);
    const firstBundle = await buildAnimationBundle(first.value.document);
    const secondBundle = await buildAnimationBundle(second.value.document);
    expect(firstBundle.ok).toBe(true);
    expect(secondBundle.ok).toBe(true);
    if (!firstBundle.ok || !secondBundle.ok) return;
    expect(encodeAnimationAtlas(firstBundle.value)).toEqual(encodeAnimationAtlas(secondBundle.value));
    expect(firstBundle.value.manifestJson).toBe(secondBundle.value.manifestJson);
  });

  it.each([
    ['source pixels', (document: SpriteDocumentV2) => { document.cels['cel-0'].data.splice((1 * 16 + 6) * 4, 4, 255, 255, 255, 255); }],
    ['source ID', (document: SpriteDocumentV2) => { document.source!.artifactId = 'wrong-source'; }],
    ['size', (document: SpriteDocumentV2) => { resizeInvalidSource(document); }],
    ['palette', (document: SpriteDocumentV2) => { document.palette[0] = '#000000'; }],
    ['brief', (_document: SpriteDocumentV2, brief: WalkRightBrief) => { brief.durationMs = 120; }],
  ])('rejects %s mismatch without changing the input', async (_, mutate) => {
    const document = cloneFixture(makeGoldenWalkDocument());
    const brief = fixedBrief();
    mutate(document, brief);
    const before = canonicalJson(document);
    const result = await generateWalkRightDocument(document, brief);
    expect(result.ok).toBe(false);
    expect(canonicalJson(document)).toBe(before);
  });

  it('commits once, writes 1x/4x review evidence, reports pending human review, and remains one-step undoable', async () => {
    const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-walk-'));
    temporaryDirectories.push(outputDir);
    const sourcePath = path.join(outputDir, 'source.dogsprite');
    const source = makeGoldenWalkDocument();
    fs.writeFileSync(sourcePath, JSON.stringify(source));
    const bridge = new AnimationBridge({ outputDir });
    const loaded = structured(await bridge.loadProject({ filePath: sourcePath }));
    const projectId = loaded.projectId as string;
    const generated = await bridge.generateWalkRight({ projectId, expectedRevision: 0, brief: fixedBrief() });
    const result = structured(generated);

    expect(result).toEqual(expect.objectContaining({
      ok: true,
      operation: 'generate_walk_right',
      revision: 1,
      artisticApproval: 'pending_human_review',
    }));
    expect(result.structuralValidation).toEqual(expect.objectContaining({ document: 'valid', animationBundle: 'valid' }));
    expect(result.beforeHashes).toEqual(expect.objectContaining({ semantic: expect.any(String), pixels: expect.any(String) }));
    expect(result.afterHashes).toEqual(expect.objectContaining({ semantic: expect.any(String), pixels: expect.any(String) }));
    const artifacts = result.reviewArtifacts as Record<string, string>;
    expect(Object.keys(artifacts).sort()).toEqual(['baseline1x', 'baseline4x', 'current1x', 'current4x', 'diff1x', 'diff4x']);
    Object.values(artifacts).forEach((artifact) => expect(fs.existsSync(artifact)).toBe(true));
    expect(generated.content.some((item) => item.type === 'image')).toBe(true);
    expect(bridge.getDocument(projectId)?.revision).toBe(1);

    const generatedSemantic = await hashDocumentSemantic(bridge.getDocument(projectId)!);
    expect(generatedSemantic).not.toBe(await hashDocumentSemantic(source));
    const undone = structured(await bridge.undo({ projectId, expectedRevision: 1 }));
    expect(undone.revision).toBe(2);
    expect(await hashDocumentSemantic(bridge.getDocument(projectId)!)).toBe(await hashDocumentSemantic(source));
  });

  it('rejects brief mismatch and stale revision without mutation or review artifacts', async () => {
    const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-walk-reject-'));
    temporaryDirectories.push(outputDir);
    const sourcePath = path.join(outputDir, 'source.dogsprite');
    fs.writeFileSync(sourcePath, JSON.stringify(makeGoldenWalkDocument()));
    const bridge = new AnimationBridge({ outputDir });
    const loaded = structured(await bridge.loadProject({ filePath: sourcePath }));
    const projectId = loaded.projectId as string;
    const before = canonicalJson(bridge.getDocument(projectId));
    const mismatched = fixedBrief();
    mismatched.facing = 'left';
    expect((await bridge.generateWalkRight({ projectId, expectedRevision: 0, brief: mismatched })).isError).toBe(true);
    expect(canonicalJson(bridge.getDocument(projectId))).toBe(before);
    expect(fs.existsSync(path.join(outputDir, 'reviews'))).toBe(false);

    const successful = await bridge.generateWalkRight({ projectId, expectedRevision: 0, brief: fixedBrief() });
    expect(successful.isError).not.toBe(true);
    const after = canonicalJson(bridge.getDocument(projectId));
    expect((await bridge.generateWalkRight({ projectId, expectedRevision: 0, brief: fixedBrief() })).isError).toBe(true);
    expect(canonicalJson(bridge.getDocument(projectId))).toBe(after);
  });

  it('reports committed success with retry metadata when review persistence fails after generation', async () => {
    const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-walk-review-failure-'));
    temporaryDirectories.push(outputDir);
    const sourcePath = path.join(outputDir, 'source.dogsprite');
    fs.writeFileSync(sourcePath, JSON.stringify(makeGoldenWalkDocument()));
    fs.writeFileSync(path.join(outputDir, 'reviews'), 'blocks review directory creation');
    const bridge = new AnimationBridge({ outputDir });
    const loaded = structured(await bridge.loadProject({ filePath: sourcePath }));
    const projectId = loaded.projectId as string;

    const generated = await bridge.generateWalkRight({ projectId, expectedRevision: 0, brief: fixedBrief() });
    expect(generated.isError).not.toBe(true);
    expect(structured(generated)).toEqual(expect.objectContaining({
      ok: true,
      operation: 'generate_walk_right',
      revision: 1,
      reviewStatus: 'generation_failed',
      reviewArtifacts: null,
      artisticApproval: 'pending_human_review',
      reviewRetry: { tool: 'get_animation_review', arguments: { projectId, scale: 4 } },
    }));
    expect(bridge.getDocument(projectId)?.revision).toBe(1);
    expect((await bridge.undo({ projectId, expectedRevision: 1 })).isError).not.toBe(true);
  });
});
