/**
 * .dogsprite file serialization/deserialization.
 * Compatible with the editor's src/lib/export/projectFile.ts format.
 */

export interface ProjectFileLayer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay';
}

export interface ProjectFileFrame {
  id: string;
  index: number;
  duration: number;
  layerData: Record<string, number[]>;
}

export interface ProjectFileSettings {
  id: string;
  name: string;
  width: number;
  height: number;
  createdAt: number;
  updatedAt: number;
}

export interface ProjectFile {
  version: 1;
  project: ProjectFileSettings;
  layers: ProjectFileLayer[];
  activeLayerId: string;
  frames: ProjectFileFrame[];
  fps: number;
}

export function serializeProject(
  project: ProjectFileSettings,
  layers: ProjectFileLayer[],
  activeLayerId: string,
  frames: Array<{
    id: string;
    index: number;
    duration: number;
    layerData: Record<string, Uint8ClampedArray>;
  }>,
  fps: number
): ProjectFile {
  return {
    version: 1,
    project,
    layers,
    activeLayerId,
    frames: frames.map((f, i) => ({
      id: f.id,
      index: i,
      duration: f.duration,
      layerData: Object.fromEntries(
        Object.entries(f.layerData).map(([layerId, data]) => [
          layerId,
          Array.from(data),
        ])
      ),
    })),
    fps,
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function toInteger(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return clamp(Math.round(value), min, max);
}

function toByte(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0;
  return clamp(Math.round(value), 0, 255);
}

const BLEND_MODES = new Set(['normal', 'multiply', 'screen', 'overlay']);

export function normalizeProjectFile(raw: unknown): ProjectFile | null {
  if (!isObject(raw) || !Array.isArray(raw.layers) || !Array.isArray(raw.frames)) {
    return null;
  }

  const now = Date.now();
  const projectSource = isObject(raw.project) ? raw.project : raw;

  const width = toInteger(projectSource.width, 32, 1, 1024);
  const height = toInteger(projectSource.height, 32, 1, 1024);
  const expectedLength = width * height * 4;

  const layers: ProjectFileLayer[] = [];
  for (let i = 0; i < raw.layers.length && i < 64; i++) {
    const entry = raw.layers[i];
    if (!isObject(entry)) continue;
    const blend = typeof entry.blendMode === 'string' && BLEND_MODES.has(entry.blendMode as string)
      ? entry.blendMode as ProjectFileLayer['blendMode']
      : 'normal';
    layers.push({
      id: typeof entry.id === 'string' && entry.id.length > 0 ? entry.id : `layer-${i}`,
      name: typeof entry.name === 'string' && entry.name.length > 0 ? entry.name : `Layer ${i + 1}`,
      visible: typeof entry.visible === 'boolean' ? entry.visible : true,
      locked: typeof entry.locked === 'boolean' ? entry.locked : false,
      opacity: typeof entry.opacity === 'number' ? clamp(entry.opacity, 0, 1) : 1,
      blendMode: blend,
    });
  }

  if (layers.length === 0) return null;

  const layerIds = new Set(layers.map(l => l.id));
  const activeLayerId = typeof raw.activeLayerId === 'string' && layerIds.has(raw.activeLayerId)
    ? raw.activeLayerId
    : layers[0].id;

  const frames: ProjectFileFrame[] = [];
  for (let i = 0; i < raw.frames.length && i < 240; i++) {
    const frame = raw.frames[i];
    if (!isObject(frame)) continue;

    const duration = toInteger(frame.duration, 100, 1, 10000);
    const layerData: Record<string, number[]> = {};

    if (isObject(frame.layerData)) {
      for (const [layerId, value] of Object.entries(frame.layerData)) {
        if (!layerIds.has(layerId) || !Array.isArray(value)) continue;
        const row = new Array<number>(expectedLength).fill(0);
        const copyLength = Math.min(expectedLength, value.length);
        for (let j = 0; j < copyLength; j++) {
          row[j] = toByte(value[j]);
        }
        layerData[layerId] = row;
      }
    }

    frames.push({
      id: typeof frame.id === 'string' && frame.id.length > 0 ? frame.id : `frame-${i}`,
      index: i,
      duration,
      layerData,
    });
  }

  if (frames.length === 0) return null;

  const createdAt = typeof projectSource.createdAt === 'number' ? projectSource.createdAt : now;
  const updatedAt = typeof projectSource.updatedAt === 'number' ? projectSource.updatedAt : createdAt;
  const fps = toInteger(raw.fps, 12, 1, 120);

  return {
    version: 1,
    project: {
      id: typeof projectSource.id === 'string' && projectSource.id.length > 0 ? projectSource.id : 'project-1',
      name: typeof projectSource.name === 'string' && projectSource.name.length > 0
        ? projectSource.name
        : 'Untitled Sprite',
      width,
      height,
      createdAt,
      updatedAt,
    },
    layers,
    activeLayerId,
    frames,
    fps,
  };
}
