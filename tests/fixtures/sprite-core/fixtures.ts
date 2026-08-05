import {
  SPRITE_DOCUMENT_VERSION,
  type BlendMode,
  type SpriteDocumentV2,
} from '../../../packages/sprite-core/src';

const SOURCE_ROWS = [
  '0000000000000000',
  '0000001222000000',
  '0000000122200000',
  '0000001111100000',
  '0000001344310000',
  '0000001331511100',
  '0000001335556100',
  '0000111111110000',
  '0001781899111000',
  '0001711888833500',
  '0001711888811100',
  '000171AAAAA10000',
  '0000111BB1B10000',
  '0000001BB0B10000',
  '000001CC11B10000',
  '0000055501CCC000',
] as const;

const RGBA_BY_SYMBOL: Record<string, [number, number, number, number]> = {
  '0': [0, 0, 0, 0],
  '1': [20, 12, 28, 255],
  '2': [208, 70, 72, 255],
  '3': [133, 149, 161, 255],
  '4': [222, 238, 214, 255],
  '5': [210, 170, 153, 255],
  '6': [117, 113, 97, 255],
  '7': [48, 52, 109, 255],
  '8': [89, 125, 206, 255],
  '9': [109, 194, 202, 255],
  A: [210, 125, 44, 255],
  B: [78, 74, 78, 255],
  C: [133, 76, 48, 255],
};

export const DB16_FIXTURE_PALETTE = [
  '#140c1c', '#442434', '#30346d', '#4e4a4e',
  '#854c30', '#346524', '#d04648', '#757161',
  '#597dce', '#d27d2c', '#8595a1', '#6daa2c',
  '#d2aa99', '#6dc2ca', '#dad45e', '#deeed6',
];

function sourcePixels(): number[] {
  return SOURCE_ROWS.flatMap((row) => [...row].flatMap((symbol) => RGBA_BY_SYMBOL[symbol]));
}

function setPixel(data: number[], x: number, y: number, rgba: [number, number, number, number]): void {
  const offset = (y * 16 + x) * 4;
  data.splice(offset, 4, ...rgba);
}

function clearPixel(data: number[], x: number, y: number): void {
  setPixel(data, x, y, [0, 0, 0, 0]);
}

function makeWalkPose(index: number): number[] {
  const data = sourcePixels();
  if (index === 1) {
    clearPixel(data, 7, 15);
    setPixel(data, 4, 15, RGBA_BY_SYMBOL['5']);
    setPixel(data, 13, 15, RGBA_BY_SYMBOL.C);
  } else if (index === 2) {
    clearPixel(data, 5, 15);
    setPixel(data, 8, 15, RGBA_BY_SYMBOL['1']);
    clearPixel(data, 12, 15);
    setPixel(data, 9, 14, RGBA_BY_SYMBOL.C);
  } else if (index === 3) {
    clearPixel(data, 10, 15);
    setPixel(data, 8, 15, RGBA_BY_SYMBOL.C);
    clearPixel(data, 5, 15);
    setPixel(data, 4, 15, RGBA_BY_SYMBOL['5']);
  }
  return data;
}

export function cloneFixture(document: SpriteDocumentV2): SpriteDocumentV2 {
  return JSON.parse(JSON.stringify(document)) as SpriteDocumentV2;
}

export function makeGoldenWalkDocument(): SpriteDocumentV2 {
  const frames = [0, 1, 2, 3].map((index) => ({
    id: `frame-${index}`,
    durationMs: 100,
    celRefs: { base: `cel-${index}` },
  }));
  return {
    version: SPRITE_DOCUMENT_VERSION,
    project: {
      id: 'cornerfall-fighter-right',
      name: 'Cornerfall Fighter Walk Right',
      width: 16,
      height: 16,
      createdAt: 0,
      updatedAt: 0,
    },
    layers: [{
      id: 'base',
      name: 'Base',
      visible: true,
      locked: false,
      opacity: 1,
      blendMode: 'normal',
    }],
    cels: Object.fromEntries([0, 1, 2, 3].map((index) => [
      `cel-${index}`,
      { id: `cel-${index}`, data: makeWalkPose(index) },
    ])),
    frames,
    clip: {
      id: 'clip-walk-right',
      name: 'walk_right',
      frameIds: frames.map((frame) => frame.id),
      loop: 'linear',
    },
    palette: DB16_FIXTURE_PALETTE,
    pivotPx: { x: 8, y: 15 },
    activeLayerId: 'base',
    activeFrameId: 'frame-0',
    revision: 0,
    source: {
      artifactId: 'cornerfall-fighter-right-16',
      sha256: '1b465fc4de87da68ce0158d8de21062ac1b7da26dc3b9806fa2f5766a1a0aa8c',
      paletteId: 'db16',
      renderProcedure: 'Frozen 16x16 RGBA rows from the approved source artifact; no resampling',
    },
  };
}

function addOverlay(
  document: SpriteDocumentV2,
  blendMode: BlendMode,
  opacity: number,
  visible = true,
  bottom = false,
): void {
  const layer = { id: 'overlay', name: 'Overlay', visible, locked: false, opacity, blendMode };
  if (bottom) document.layers.unshift(layer);
  else document.layers.push(layer);
  document.frames.forEach((frame, index) => {
    const celId = `overlay-${index}`;
    const data = new Array<number>(16 * 16 * 4).fill(0);
    setPixel(data, 8, 8, [208, 70, 72, 255]);
    document.cels[celId] = { id: celId, data };
    frame.celRefs.overlay = celId;
  });
}

export const FIXTURE_MATRIX: Array<{ name: string; document: SpriteDocumentV2 }> = [
  { name: 'golden four-frame walk', document: makeGoldenWalkDocument() },
  { name: 'hidden layer', document: (() => { const d = makeGoldenWalkDocument(); addOverlay(d, 'normal', 1, false); return d; })() },
  { name: 'translucent normal layer', document: (() => { const d = makeGoldenWalkDocument(); addOverlay(d, 'normal', 0.5); return d; })() },
  { name: 'multiply layer', document: (() => { const d = makeGoldenWalkDocument(); addOverlay(d, 'multiply', 1); return d; })() },
  { name: 'screen layer', document: (() => { const d = makeGoldenWalkDocument(); addOverlay(d, 'screen', 1); return d; })() },
  { name: 'overlay blend layer', document: (() => { const d = makeGoldenWalkDocument(); addOverlay(d, 'overlay', 1); return d; })() },
  { name: 'explicit layer ordering', document: (() => { const d = makeGoldenWalkDocument(); addOverlay(d, 'normal', 1, true, true); return d; })() },
  { name: 'linked cel identity', document: (() => { const d = makeGoldenWalkDocument(); d.frames[1].celRefs.base = 'cel-0'; delete d.cels['cel-1']; return d; })() },
  { name: 'varied frame durations', document: (() => { const d = makeGoldenWalkDocument(); d.frames.forEach((f, i) => { f.durationMs = 80 + i * 20; }); return d; })() },
  { name: 'selection revision and timestamps', document: (() => { const d = makeGoldenWalkDocument(); d.activeFrameId = 'frame-3'; d.revision = 9; d.project.createdAt = 123; d.project.updatedAt = 456; return d; })() },
];
