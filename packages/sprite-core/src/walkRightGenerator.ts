import { ANIMATION_BUNDLE_CONTRACT, buildAnimationBundle } from './animationBundle.js';
import { compositeFrame } from './composite.js';
import { validateDocumentV2 } from './document.js';
import { sha256Hex } from './hash.js';
import type { CoreResult, SpriteDocumentV2, ValidationIssue } from './types.js';

export const WALK_RIGHT_BRIEF = {
  sourceArtifactId: ANIMATION_BUNDLE_CONTRACT.sourceArtifactId,
  sourcePixelSha256: ANIMATION_BUNDLE_CONTRACT.sourcePixelSha256,
  clipName: 'walk_right',
  facing: 'right',
  frameCount: 4,
  durationMs: 100,
  paletteId: 'db16',
  pivotPx: { x: 8, y: 15 },
  groundLineY: 15,
  rootMotion: 'none',
} as const;

export interface WalkRightBrief {
  sourceArtifactId: string;
  sourcePixelSha256: string;
  clipName: string;
  facing: string;
  frameCount: number;
  durationMs: number;
  paletteId: string;
  pivotPx: { x: number; y: number };
  groundLineY: number;
  rootMotion: string;
}

type RegionSymbol = 'B' | 'A' | 'C' | 'R' | 'F';
type RegionId = 'body' | 'rear_arm' | 'front_arm' | 'rear_leg' | 'front_leg';

interface RegionTransform {
  dx: number;
  dy: number;
}

interface WalkPose {
  id: 'contact_a' | 'passing_a' | 'contact_b' | 'passing_b';
  transforms: Record<RegionId, RegionTransform>;
}

const REGION_BY_SYMBOL: Record<RegionSymbol, RegionId> = {
  B: 'body',
  A: 'rear_arm',
  C: 'front_arm',
  R: 'rear_leg',
  F: 'front_leg',
};

/**
 * Frozen semantic ownership for every opaque source pixel.
 * Dots must remain transparent; letters assign pixels to rigid body regions.
 */
export const WALK_RIGHT_SEMANTIC_REGION_ROWS = [
  '................',
  '......BBBB......',
  '.......BBBB.....',
  '......BBBBB.....',
  '......BBBBBB....',
  '......BBBBBBBB..',
  '......BBBBBBBB..',
  '....AABBBBBB....',
  '...AAABBBBBCC...',
  '...AABBBBBBCCC..',
  '...AABBBBBBCCC..',
  '...AABBBBBBB....',
  '....BBBRRBFF....',
  '......RRR.FF....',
  '.....RRRRFFF....',
  '.....RRR.FFFF...',
] as const;

/** Closed four-pose recipe. No user parameters or general transform surface. */
export const WALK_RIGHT_POSE_RECIPE: readonly WalkPose[] = [
  {
    id: 'contact_a',
    transforms: {
      rear_arm: { dx: 0, dy: 0 },
      rear_leg: { dx: 0, dy: 0 },
      body: { dx: 0, dy: 0 },
      front_leg: { dx: 0, dy: 0 },
      front_arm: { dx: 0, dy: 0 },
    },
  },
  {
    id: 'passing_a',
    transforms: {
      rear_arm: { dx: 1, dy: -1 },
      rear_leg: { dx: 1, dy: 0 },
      body: { dx: 0, dy: -1 },
      front_leg: { dx: -1, dy: 0 },
      front_arm: { dx: -1, dy: -1 },
    },
  },
  {
    id: 'contact_b',
    transforms: {
      rear_arm: { dx: 1, dy: 0 },
      rear_leg: { dx: 3, dy: 0 },
      body: { dx: 0, dy: 0 },
      front_leg: { dx: -3, dy: 0 },
      front_arm: { dx: -1, dy: 0 },
    },
  },
  {
    id: 'passing_b',
    transforms: {
      rear_arm: { dx: -1, dy: -1 },
      rear_leg: { dx: 2, dy: 0 },
      body: { dx: 0, dy: -1 },
      front_leg: { dx: -2, dy: 0 },
      front_arm: { dx: 1, dy: -1 },
    },
  },
] as const;

const PAINTER_ORDER: readonly RegionId[] = ['rear_arm', 'rear_leg', 'body', 'front_leg', 'front_arm'];

export interface GeneratedWalkRight {
  document: SpriteDocumentV2;
  recipeId: 'cornerfall-fighter-right-16/walk-right-regions-v1';
  poseIds: string[];
  sourcePixelSha256: string;
  bundleHash: string;
  atlasSha256: string;
}

function issue(code: string, path: string, message: string): ValidationIssue {
  return { code, path, message };
}

function fail(issues: ValidationIssue[]): CoreResult<never> {
  return { ok: false, issues };
}

function sameBrief(brief: WalkRightBrief): boolean {
  return brief.sourceArtifactId === WALK_RIGHT_BRIEF.sourceArtifactId
    && brief.sourcePixelSha256 === WALK_RIGHT_BRIEF.sourcePixelSha256
    && brief.clipName === WALK_RIGHT_BRIEF.clipName
    && brief.facing === WALK_RIGHT_BRIEF.facing
    && brief.frameCount === WALK_RIGHT_BRIEF.frameCount
    && brief.durationMs === WALK_RIGHT_BRIEF.durationMs
    && brief.paletteId === WALK_RIGHT_BRIEF.paletteId
    && brief.pivotPx?.x === WALK_RIGHT_BRIEF.pivotPx.x
    && brief.pivotPx?.y === WALK_RIGHT_BRIEF.pivotPx.y
    && brief.groundLineY === WALK_RIGHT_BRIEF.groundLineY
    && brief.rootMotion === WALK_RIGHT_BRIEF.rootMotion;
}

function validateSourceContract(document: SpriteDocumentV2, brief: WalkRightBrief): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!sameBrief(brief)) issues.push(issue('WALK_BRIEF_MISMATCH', '$.brief', 'Brief must exactly match the frozen walk_right contract'));
  if (document.project.width !== 16 || document.project.height !== 16) {
    issues.push(issue('WALK_SIZE_MISMATCH', '$.project', 'Source must be exactly 16x16'));
  }
  if (document.source?.artifactId !== WALK_RIGHT_BRIEF.sourceArtifactId || document.source.paletteId !== WALK_RIGHT_BRIEF.paletteId) {
    issues.push(issue('WALK_SOURCE_MISMATCH', '$.source', 'Source identity must be cornerfall-fighter-right-16 with DB16'));
  }
  if (document.palette.length !== ANIMATION_BUNDLE_CONTRACT.palette.length
    || document.palette.some((color, index) => color.toLowerCase() !== ANIMATION_BUNDLE_CONTRACT.palette[index])) {
    issues.push(issue('WALK_PALETTE_MISMATCH', '$.palette', 'Source must use the ordered DB16 palette'));
  }
  if (document.layers.length !== 1
    || !document.layers[0].visible
    || document.layers[0].locked
    || document.layers[0].opacity !== 1
    || document.layers[0].blendMode !== 'normal') {
    issues.push(issue('WALK_SOURCE_MISMATCH', '$.layers', 'Frozen source requires one visible, unlocked, opaque normal layer'));
  }
  return issues;
}

function validateRegionOwnership(source: Uint8Array): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  WALK_RIGHT_SEMANTIC_REGION_ROWS.forEach((row, y) => {
    if (row.length !== 16) issues.push(issue('SEMANTIC_RECIPE_MISMATCH', `$.recipe.rows[${y}]`, 'Region row must contain 16 entries'));
    [...row].forEach((symbol, x) => {
      const alpha = source[(y * 16 + x) * 4 + 3];
      const assigned = symbol !== '.';
      if ((alpha > 0) !== assigned) {
        issues.push(issue('SEMANTIC_RECIPE_MISMATCH', `$.recipe.rows[${y}][${x}]`, 'Every opaque pixel must have exactly one semantic owner'));
      }
      if (assigned && !REGION_BY_SYMBOL[symbol as RegionSymbol]) {
        issues.push(issue('SEMANTIC_RECIPE_MISMATCH', `$.recipe.rows[${y}][${x}]`, `Unknown semantic region ${symbol}`));
      }
    });
  });
  return issues;
}

function renderPose(source: Uint8Array, pose: WalkPose): number[] {
  const output = new Uint8Array(16 * 16 * 4);
  for (const regionId of PAINTER_ORDER) {
    const transform = pose.transforms[regionId];
    WALK_RIGHT_SEMANTIC_REGION_ROWS.forEach((row, y) => {
      [...row].forEach((symbol, x) => {
        if (symbol === '.' || REGION_BY_SYMBOL[symbol as RegionSymbol] !== regionId) return;
        const targetX = x + transform.dx;
        const targetY = y + transform.dy;
        if (targetX < 0 || targetX >= 16 || targetY < 0 || targetY >= 16) return;
        const sourceOffset = (y * 16 + x) * 4;
        const targetOffset = (targetY * 16 + targetX) * 4;
        output.set(source.subarray(sourceOffset, sourceOffset + 4), targetOffset);
      });
    });
  }
  return Array.from(output);
}

export async function generateWalkRightDocument(
  input: unknown,
  brief: WalkRightBrief,
): Promise<CoreResult<GeneratedWalkRight>> {
  const validated = validateDocumentV2(input);
  if (!validated.ok) return validated;
  const sourceDocument = validated.value;
  const contractIssues = validateSourceContract(sourceDocument, brief);
  if (contractIssues.length > 0) return fail(contractIssues);

  const sourcePixels = new Uint8Array(compositeFrame(sourceDocument, sourceDocument.frames[0].id));
  const sourcePixelSha256 = await sha256Hex(sourcePixels);
  if (sourcePixelSha256 !== WALK_RIGHT_BRIEF.sourcePixelSha256) {
    return fail([issue('WALK_SOURCE_HASH_MISMATCH', '$.frames[0]', `Source pixels must hash to ${WALK_RIGHT_BRIEF.sourcePixelSha256}`)]);
  }
  const ownershipIssues = validateRegionOwnership(sourcePixels);
  if (ownershipIssues.length > 0) return fail(ownershipIssues);

  const layer = { ...sourceDocument.layers[0] };
  const frames = WALK_RIGHT_POSE_RECIPE.map((_, index) => ({
    id: `frame-${index}`,
    durationMs: 100,
    celRefs: { [layer.id]: `walk-right:cel-${index}` },
  }));
  const cels = Object.fromEntries(WALK_RIGHT_POSE_RECIPE.map((pose, index) => {
    const id = `walk-right:cel-${index}`;
    return [id, { id, data: renderPose(sourcePixels, pose) }];
  }));
  const document: SpriteDocumentV2 = {
    ...JSON.parse(JSON.stringify(sourceDocument)) as SpriteDocumentV2,
    layers: [layer],
    cels,
    frames,
    clip: { id: 'clip-walk-right', name: 'walk_right', frameIds: frames.map((frame) => frame.id), loop: 'linear' },
    palette: [...ANIMATION_BUNDLE_CONTRACT.palette],
    pivotPx: { x: 8, y: 15 },
    activeLayerId: layer.id,
    activeFrameId: frames[0].id,
  };
  const generatedValidation = validateDocumentV2(document);
  if (!generatedValidation.ok) return generatedValidation;
  const bundle = await buildAnimationBundle(generatedValidation.value);
  if (!bundle.ok) return bundle;
  return {
    ok: true,
    value: {
      document: generatedValidation.value,
      recipeId: 'cornerfall-fighter-right-16/walk-right-regions-v1',
      poseIds: WALK_RIGHT_POSE_RECIPE.map((pose) => pose.id),
      sourcePixelSha256,
      bundleHash: bundle.value.bundleHash,
      atlasSha256: bundle.value.atlasSha256,
    },
  };
}
