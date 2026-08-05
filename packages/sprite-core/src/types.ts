export const SPRITE_DOCUMENT_VERSION = 2 as const;

export type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay';
export type ClipLoopMode = 'linear' | 'ping_pong' | 'once';

export interface SpriteProjectV2 {
  id: string;
  name: string;
  width: number;
  height: number;
  createdAt: number;
  updatedAt: number;
}

export interface SpriteLayerV2 {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: BlendMode;
}

export interface SpriteCelV2 {
  id: string;
  data: number[];
}

export interface SpriteFrameV2 {
  id: string;
  durationMs: number;
  celRefs: Record<string, string>;
}

export interface SpriteClipV2 {
  id: string;
  name: string;
  frameIds: string[];
  loop: ClipLoopMode;
  direction?: 'forward' | 'reverse';
}

export interface SpriteProductionMetadataV2 {
  paletteId?: string;
  paletteName?: string;
  groundLineY?: number;
  facing?: 'left' | 'right' | 'up' | 'down' | 'front' | 'back' | 'none';
  rootMotion?:
    | { mode: 'none' }
    | { mode: 'per_frame'; offsetsPx: Record<string, { x: number; y: number }> };
}

export interface SpriteSourceProvenance {
  artifactId: string;
  sha256: string;
  paletteId: string;
  renderProcedure: string;
}

export interface SpriteDocumentV2 {
  version: typeof SPRITE_DOCUMENT_VERSION;
  project: SpriteProjectV2;
  layers: SpriteLayerV2[];
  cels: Record<string, SpriteCelV2>;
  frames: SpriteFrameV2[];
  clip: SpriteClipV2;
  clips?: SpriteClipV2[];
  activeClipId?: string;
  production?: SpriteProductionMetadataV2;
  palette: string[];
  pivotPx: { x: number; y: number };
  activeLayerId: string;
  activeFrameId: string;
  revision: number;
  source?: SpriteSourceProvenance;
}

export interface ProjectFileV1 {
  version: 1;
  project: SpriteProjectV2;
  layers: SpriteLayerV2[];
  activeLayerId: string;
  frames: Array<{
    id: string;
    index: number;
    duration: number;
    layerData: Record<string, number[] | Uint8ClampedArray>;
  }>;
  fps: number;
}

export interface ValidationIssue {
  code: string;
  path: string;
  message: string;
}

export type CoreResult<T> =
  | { ok: true; value: T }
  | { ok: false; issues: ValidationIssue[] };

export interface V1MigrationOptions {
  clipId?: string;
  clipName?: string;
  loop?: ClipLoopMode;
  palette?: string[];
  pivotPx?: { x: number; y: number };
  source?: SpriteSourceProvenance;
}
