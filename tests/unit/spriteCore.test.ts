import { describe, expect, it } from 'vitest';
import {
  canonicalJson,
  compositeFrame,
  deserializeDocumentV2,
  hashDocumentPixels,
  hashDocumentSemantic,
  migrateProjectFileV1,
  serializeDocumentV2,
  validateDocumentV2,
  type ProjectFileV1,
} from '../../packages/sprite-core/src';
import {
  DB16_FIXTURE_PALETTE,
  FIXTURE_MATRIX,
  cloneFixture,
  makeGoldenWalkDocument,
} from '../fixtures/sprite-core/fixtures';

describe('sprite-core P0 contract', () => {
  it('matches the frozen golden semantic and pixel hashes', async () => {
    const document = makeGoldenWalkDocument();
    expect(await hashDocumentSemantic(document)).toBe('3bc7b730a2c2436ccd00d0728398cac0890172b3c80beb2f316ce994691a378d');
    expect(await hashDocumentPixels(document)).toBe('6f8a2a2f4a5d1146546b86ae95f66c7d5fc454a1733e32dfc125d3178fdb7f8c');
  });

  describe.each(FIXTURE_MATRIX)('$name', ({ document }) => {
    it('roundtrips supported semantics and deterministic hashes', async () => {
      const validated = validateDocumentV2(document);
      expect(validated.ok).toBe(true);
      if (!validated.ok) return;

      const serialized = serializeDocumentV2(validated.value);
      expect(serialized.ok).toBe(true);
      if (!serialized.ok) return;

      const reloaded = deserializeDocumentV2(serialized.value);
      expect(reloaded.ok).toBe(true);
      if (!reloaded.ok) return;

      expect(canonicalJson(reloaded.value)).toBe(canonicalJson(validated.value));
      expect(await hashDocumentSemantic(reloaded.value)).toBe(await hashDocumentSemantic(validated.value));
      expect(await hashDocumentPixels(reloaded.value)).toBe(await hashDocumentPixels(validated.value));
      expect(compositeFrame(reloaded.value, reloaded.value.frames[0].id)).toHaveLength(16 * 16 * 4);
    });
  });

  it('excludes timestamps, revision, and active selection from semantic hashes', async () => {
    const baseline = makeGoldenWalkDocument();
    const changed = cloneFixture(baseline);
    changed.project.createdAt = 100;
    changed.project.updatedAt = 200;
    changed.revision = 8;
    changed.activeFrameId = 'frame-3';

    expect(await hashDocumentSemantic(changed)).toBe(await hashDocumentSemantic(baseline));
    expect(await hashDocumentPixels(changed)).toBe(await hashDocumentPixels(baseline));
  });

  it('preserves linked cel identity and propagation', () => {
    const document = cloneFixture(FIXTURE_MATRIX.find((fixture) => fixture.name === 'linked cel identity')!.document);
    const before0 = compositeFrame(document, 'frame-0');
    const before1 = compositeFrame(document, 'frame-1');
    expect(before1).toEqual(before0);

    document.cels['cel-0'].data.splice(0, 4, 255, 255, 255, 255);
    expect(compositeFrame(document, 'frame-1')).toEqual(compositeFrame(document, 'frame-0'));
  });

  it('fails closed for invalid cel references', () => {
    const document = makeGoldenWalkDocument();
    document.frames[0].celRefs.base = 'missing-cel';
    const result = validateDocumentV2(document);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.some((entry) => entry.code === 'INVALID_CEL_REF')).toBe(true);
  });

  it('fails closed for malformed pixel data', () => {
    const document = makeGoldenWalkDocument();
    document.cels['cel-0'].data.pop();
    const result = validateDocumentV2(document);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.some((entry) => entry.code === 'INVALID_CEL_DATA')).toBe(true);
  });

  it('fails closed instead of throwing for cyclic v2 input', () => {
    const input = makeGoldenWalkDocument() as unknown as Record<string, unknown>;
    input.cycle = input;
    expect(() => validateDocumentV2(input)).not.toThrow();
    expect(validateDocumentV2(input).ok).toBe(false);
  });

  it('fails closed instead of throwing for malformed v1 collections', () => {
    const malformed = {
      version: 1,
      project: makeGoldenWalkDocument().project,
      layers: [null],
      activeLayerId: 'base',
      frames: [null],
      fps: 10,
    };
    expect(() => migrateProjectFileV1(malformed)).not.toThrow();
    expect(migrateProjectFileV1(malformed).ok).toBe(false);
  });

  it('fails closed before allocation for unsafe v1 dimensions and collection sizes', () => {
    const source = makeGoldenWalkDocument();
    const layer = source.layers[0];
    const frame = {
      id: 'frame-0',
      index: 0,
      duration: 100,
      layerData: {},
    };
    const makeV1 = (width: number, height: number, layers = [layer], frames = [frame]) => ({
      version: 1,
      project: { ...source.project, width, height },
      layers,
      activeLayerId: layer.id,
      frames,
      fps: 10,
    });
    const unsafe = [
      makeV1(Number.POSITIVE_INFINITY, 16),
      makeV1(Number.MAX_VALUE, 16),
      makeV1(1025, 16),
      makeV1(16, 0),
      makeV1(16, 16, new Array(65).fill(layer)),
      makeV1(16, 16, [layer], new Array(241).fill(frame)),
      makeV1(1024, 1024, [layer], new Array(17).fill(frame)),
    ];

    for (const candidate of unsafe) {
      expect(() => migrateProjectFileV1(candidate)).not.toThrow();
      expect(migrateProjectFileV1(candidate).ok).toBe(false);
    }
  });

  it('migrates observable v1 semantics with stable independent cel IDs', () => {
    const source = makeGoldenWalkDocument();
    const v1: ProjectFileV1 = {
      version: 1,
      project: source.project,
      layers: source.layers,
      activeLayerId: source.activeLayerId,
      frames: source.frames.map((frame, index) => ({
        id: frame.id,
        index,
        duration: frame.durationMs,
        layerData: Object.fromEntries(Object.entries(frame.celRefs).map(([layerId, celId]) => [
          layerId,
          source.cels[celId].data,
        ])),
      })),
      fps: 10,
    };

    const migrated = migrateProjectFileV1(v1, {
      clipId: source.clip.id,
      clipName: source.clip.name,
      palette: DB16_FIXTURE_PALETTE,
      pivotPx: source.pivotPx,
      source: source.source,
    });

    expect(migrated.ok).toBe(true);
    if (!migrated.ok) return;
    expect(migrated.value.frames).toHaveLength(4);
    expect(new Set(Object.keys(migrated.value.cels))).toHaveProperty('size', 4);
    expect(migrated.value.frames.map((frame) => frame.durationMs)).toEqual([100, 100, 100, 100]);
    expect(migrated.value.pivotPx).toEqual({ x: 8, y: 15 });
  });
});
