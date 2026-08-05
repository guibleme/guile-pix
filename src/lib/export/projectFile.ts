import { nanoid } from 'nanoid';
import type { ProjectSettings } from '@/types/project';
import type { Layer, BlendMode } from '@/types/layer';
import type { Frame } from '@/types/frame';
import { importSpriteDocumentV2 } from '@/lib/project/spriteDocumentV2Import';
export interface ProjectFile {
  version: 1;
  project: ProjectSettings;
  layers: Layer[];
  activeLayerId: string;
  activeFrameId?: string;
  loop?: boolean;
  frames: Array<{
    id: string;
    index: number;
    duration: number;
    layerData: Record<string, number[]>;
  }>;
  fps: number;
}

const DEFAULT_FPS = 12;
const DEFAULT_FRAME_DURATION = 100;
const DEFAULT_PROJECT_NAME = 'Untitled Sprite';
const DEFAULT_DIMENSION = 32;
const MIN_DIMENSION = 1;
const MAX_DIMENSION = 1024;
const MAX_IMPORT_IMAGE_DIMENSION = 4096;
const MAX_IMPORT_IMAGE_PIXELS = MAX_IMPORT_IMAGE_DIMENSION * MAX_IMPORT_IMAGE_DIMENSION;
const BLEND_MODES = new Set<BlendMode>(['normal', 'multiply', 'screen', 'overlay']);
const SUPPORTED_IMPORT_IMAGE_EXTENSIONS = new Set(['.png']);
const PROJECT_FILE_EXTENSION = '.dogsprite';
const LEGACY_PROJECT_FILE_EXTENSION = '.spritedog';

export const PROJECT_FILE_LIMITS = {
  maxDimension: MAX_DIMENSION,
  maxFrames: 240,
  maxLayers: 64,
  maxImportFiles: 8,
  maxImportTotalBytes: 40 * 1024 * 1024,
  maxImportJsonBytes: 6 * 1024 * 1024,
  maxImportImageBytes: 18 * 1024 * 1024,
  maxImportImageDimension: MAX_IMPORT_IMAGE_DIMENSION,
  maxImportImagePixels: MAX_IMPORT_IMAGE_PIXELS,
  maxProjectPixelBytes: 256 * 1024 * 1024,
} as const;

interface AsepriteRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface AsepriteSourceSize {
  w: number;
  h: number;
}

interface AsepriteFrameEntry {
  filename?: string;
  frame?: AsepriteRect;
  rotated?: boolean;
  trimmed?: boolean;
  spriteSourceSize?: AsepriteRect;
  sourceSize?: AsepriteSourceSize;
  duration?: number;
}

interface NormalizedAsepriteFrameEntry {
  filename: string;
  frame: AsepriteRect;
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: AsepriteRect;
  sourceSize: AsepriteSourceSize;
  duration: number;
}

interface NormalizedAsepriteImport {
  frameWidth: number;
  frameHeight: number;
  frames: NormalizedAsepriteFrameEntry[];
  imageFileHint: string | null;
  layerNames: string[];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function extensionFromFilename(filename: string): string {
  const i = filename.lastIndexOf('.');
  return i === -1 ? '' : filename.slice(i).toLowerCase();
}

function isProjectJsonExtension(ext: string): boolean {
  return ext === PROJECT_FILE_EXTENSION || ext === LEGACY_PROJECT_FILE_EXTENSION || ext === '.json';
}

function basenameWithoutExtension(filename: string): string {
  const i = filename.lastIndexOf('.');
  return i === -1 ? filename : filename.slice(0, i);
}

function decodePngUInt32(bytes: Uint8Array, offset: number): number {
  return (
    bytes[offset] * 0x1000000 +
    bytes[offset + 1] * 0x10000 +
    bytes[offset + 2] * 0x100 +
    bytes[offset + 3]
  );
}

function toInteger(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return clamp(Math.round(value), min, max);
}

function toTimestamp(value: unknown, fallback: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.max(0, Math.round(value));
}

function toOpacity(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 1;
  return clamp(value, 0, 1);
}

function toByte(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0;
  return clamp(Math.round(value), 0, 255);
}

function toNonNegativeInteger(value: unknown): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  const rounded = Math.round(value);
  if (rounded < 0) return null;
  return rounded;
}

function toPositiveInteger(value: unknown): number | null {
  const normalized = toNonNegativeInteger(value);
  if (normalized === null || normalized <= 0) return null;
  return normalized;
}

function normalizeLayer(entry: unknown, index: number): Layer | null {
  if (!isObject(entry)) return null;

  const blend = typeof entry.blendMode === 'string' && BLEND_MODES.has(entry.blendMode as BlendMode)
    ? entry.blendMode as BlendMode
    : 'normal';

  return {
    id: typeof entry.id === 'string' && entry.id.length > 0 ? entry.id : nanoid(),
    name: typeof entry.name === 'string' && entry.name.length > 0 ? entry.name : `Layer ${index + 1}`,
    visible: typeof entry.visible === 'boolean' ? entry.visible : true,
    locked: typeof entry.locked === 'boolean' ? entry.locked : false,
    opacity: toOpacity(entry.opacity),
    blendMode: blend,
  };
}

function normalizeLayerData(
  rawLayerData: unknown,
  expectedLength: number,
  validLayerIds: Set<string>
): Record<string, number[]> {
  if (!isObject(rawLayerData)) return {};

  const normalized: Record<string, number[]> = {};

  for (const [layerId, value] of Object.entries(rawLayerData)) {
    if (!validLayerIds.has(layerId) || !Array.isArray(value)) continue;
    const row = new Array<number>(expectedLength).fill(0);
    const copyLength = Math.min(expectedLength, value.length);
    for (let i = 0; i < copyLength; i += 1) {
      row[i] = toByte(value[i]);
    }
    normalized[layerId] = row;
  }

  return normalized;
}

function normalizeAsepriteRect(raw: unknown): AsepriteRect | null {
  if (!isObject(raw)) return null;
  const x = toNonNegativeInteger(raw.x);
  const y = toNonNegativeInteger(raw.y);
  const w = toPositiveInteger(raw.w);
  const h = toPositiveInteger(raw.h);
  if (x === null || y === null || w === null || h === null) return null;
  return { x, y, w, h };
}

function normalizeAsepriteSourceSize(raw: unknown): AsepriteSourceSize | null {
  if (!isObject(raw)) return null;
  const w = toPositiveInteger(raw.w);
  const h = toPositiveInteger(raw.h);
  if (w === null || h === null) return null;
  return { w, h };
}

function normalizeAsepriteFrameEntry(entry: unknown, fallbackName: string): NormalizedAsepriteFrameEntry | null {
  if (!isObject(entry)) return null;

  const frame = normalizeAsepriteRect(entry.frame);
  if (!frame) return null;

  const sourceSize = normalizeAsepriteSourceSize(entry.sourceSize) ?? { w: frame.w, h: frame.h };
  const rawSpriteSourceSize = normalizeAsepriteRect(entry.spriteSourceSize);
  const trimmed = entry.trimmed === true;
  const spriteSourceSize = rawSpriteSourceSize ?? { x: 0, y: 0, w: frame.w, h: frame.h };
  const filename = typeof entry.filename === 'string' && entry.filename.length > 0 ? entry.filename : fallbackName;
  const duration = toInteger(entry.duration, DEFAULT_FRAME_DURATION, 1, 10000);

  return {
    filename,
    frame,
    rotated: entry.rotated === true,
    trimmed,
    spriteSourceSize,
    sourceSize,
    duration,
  };
}

function normalizeAsepriteImport(raw: unknown): NormalizedAsepriteImport | null {
  if (!isObject(raw)) return null;

  const frameEntriesSource = raw.frames;
  const normalizedFrames: NormalizedAsepriteFrameEntry[] = [];

  if (Array.isArray(frameEntriesSource)) {
    for (let i = 0; i < frameEntriesSource.length; i += 1) {
      const frame = normalizeAsepriteFrameEntry(frameEntriesSource[i], `frame-${i}.png`);
      if (frame) normalizedFrames.push(frame);
    }
  } else if (isObject(frameEntriesSource)) {
    for (const [key, value] of Object.entries(frameEntriesSource)) {
      const frame = normalizeAsepriteFrameEntry(value, key);
      if (frame) normalizedFrames.push(frame);
    }
  } else {
    return null;
  }

  if (normalizedFrames.length === 0) {
    return null;
  }

  const first = normalizedFrames[0];
  const frameWidth = clamp(first.sourceSize.w, MIN_DIMENSION, MAX_DIMENSION);
  const frameHeight = clamp(first.sourceSize.h, MIN_DIMENSION, MAX_DIMENSION);

  for (const frame of normalizedFrames) {
    const sourceWidth = clamp(frame.sourceSize.w, MIN_DIMENSION, MAX_DIMENSION);
    const sourceHeight = clamp(frame.sourceSize.h, MIN_DIMENSION, MAX_DIMENSION);
    frame.sourceSize = { w: sourceWidth, h: sourceHeight };
    frame.spriteSourceSize = {
      x: frame.spriteSourceSize.x,
      y: frame.spriteSourceSize.y,
      w: Math.min(frame.spriteSourceSize.w, sourceWidth),
      h: Math.min(frame.spriteSourceSize.h, sourceHeight),
    };
  }

  const meta = isObject(raw.meta) ? raw.meta : null;
  const imageFileHint = meta && typeof meta.image === 'string' && meta.image.length > 0
    ? meta.image
    : null;
  const layerNames = meta && Array.isArray(meta.layers)
    ? meta.layers
      .map((layer) => (isObject(layer) && typeof layer.name === 'string' && layer.name.trim().length > 0
        ? layer.name.trim()
        : null))
      .filter((name): name is string => name !== null)
    : [];

  return {
    frameWidth,
    frameHeight,
    frames: normalizedFrames,
    imageFileHint,
    layerNames,
  };
}

async function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
    reader.readAsText(file);
  });
}

async function readPngDimensions(file: File): Promise<{ width: number; height: number } | null> {
  const header = new Uint8Array(await file.slice(0, 24).arrayBuffer());
  if (header.length < 24) return null;

  const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
  for (let i = 0; i < pngSignature.length; i += 1) {
    if (header[i] !== pngSignature[i]) return null;
  }

  const chunkType = String.fromCharCode(header[12], header[13], header[14], header[15]);
  if (chunkType !== 'IHDR') return null;

  const width = decodePngUInt32(header, 16);
  const height = decodePngUInt32(header, 20);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return null;
  }

  return { width, height };
}

async function validateSelectedFiles(files: File[]): Promise<void> {
  if (files.length === 0) {
    throw new Error('No file selected');
  }

  if (files.length > PROJECT_FILE_LIMITS.maxImportFiles) {
    throw new Error(`Select up to ${PROJECT_FILE_LIMITS.maxImportFiles} files per import`);
  }

  let totalBytes = 0;

  for (const file of files) {
    const ext = extensionFromFilename(file.name);
    totalBytes += file.size;

    if (totalBytes > PROJECT_FILE_LIMITS.maxImportTotalBytes) {
      throw new Error(`Import exceeds ${Math.floor(PROJECT_FILE_LIMITS.maxImportTotalBytes / (1024 * 1024))}MB total size limit`);
    }

    if (isProjectJsonExtension(ext)) {
      if (file.size > PROJECT_FILE_LIMITS.maxImportJsonBytes) {
        throw new Error(`Project JSON too large: ${file.name}`);
      }
      continue;
    }

    if (SUPPORTED_IMPORT_IMAGE_EXTENSIONS.has(ext)) {
      if (file.size > PROJECT_FILE_LIMITS.maxImportImageBytes) {
        throw new Error(`Image too large: ${file.name}`);
      }

      const dimensions = await readPngDimensions(file);
      if (!dimensions) {
        throw new Error(`Invalid PNG file: ${file.name}`);
      }

      if (
        dimensions.width > PROJECT_FILE_LIMITS.maxImportImageDimension ||
        dimensions.height > PROJECT_FILE_LIMITS.maxImportImageDimension ||
        dimensions.width * dimensions.height > PROJECT_FILE_LIMITS.maxImportImagePixels
      ) {
        throw new Error(`PNG dimensions exceed import limits: ${file.name}`);
      }

      continue;
    }

    throw new Error(`Unsupported import file type: ${file.name}`);
  }
}

async function readImageDataFile(file: File): Promise<ImageData> {
  const bitmap = await createImageBitmap(file);
  if (
    bitmap.width > PROJECT_FILE_LIMITS.maxImportImageDimension ||
    bitmap.height > PROJECT_FILE_LIMITS.maxImportImageDimension ||
    bitmap.width * bitmap.height > PROJECT_FILE_LIMITS.maxImportImagePixels
  ) {
    bitmap.close();
    throw new Error(`Decoded image exceeds import limits: ${file.name}`);
  }

  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    throw new Error('Canvas context unavailable');
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function copySheetRectToFrame(
  sheetData: Uint8ClampedArray,
  sheetWidth: number,
  sheetHeight: number,
  srcRect: AsepriteRect,
  dstData: Uint8ClampedArray,
  dstWidth: number,
  dstHeight: number,
  dstX: number,
  dstY: number
): void {
  if (srcRect.x >= sheetWidth || srcRect.y >= sheetHeight) return;
  if (dstX >= dstWidth || dstY >= dstHeight) return;

  const maxWidthBySheet = Math.max(0, sheetWidth - srcRect.x);
  const maxHeightBySheet = Math.max(0, sheetHeight - srcRect.y);
  const maxWidthByDst = Math.max(0, dstWidth - dstX);
  const maxHeightByDst = Math.max(0, dstHeight - dstY);
  const width = Math.min(srcRect.w, maxWidthBySheet, maxWidthByDst);
  const height = Math.min(srcRect.h, maxHeightBySheet, maxHeightByDst);

  if (width <= 0 || height <= 0) return;

  for (let y = 0; y < height; y += 1) {
    const srcOffset = ((srcRect.y + y) * sheetWidth + srcRect.x) * 4;
    const dstOffset = ((dstY + y) * dstWidth + dstX) * 4;
    dstData.set(sheetData.subarray(srcOffset, srcOffset + width * 4), dstOffset);
  }
}

function pickImportLayerName(layerNames: string[]): string {
  if (layerNames.length === 1) return layerNames[0];
  if (layerNames.length > 1) return `Flattened (${layerNames.length} layers)`;
  return 'Imported Layer 1';
}

function estimateFpsFromDurations(durations: number[]): number {
  if (durations.length === 0) return DEFAULT_FPS;
  const total = durations.reduce((sum, value) => sum + value, 0);
  const avg = total / durations.length;
  if (!Number.isFinite(avg) || avg <= 0) return DEFAULT_FPS;
  return clamp(Math.round(1000 / avg), 1, 120);
}

function buildProjectFromAsepriteSpritesheet(
  parsed: NormalizedAsepriteImport,
  imageData: ImageData,
  sourceFilename: string
): ProjectFile {
  const now = Date.now();
  const layerId = nanoid();
  const frameWidth = parsed.frameWidth;
  const frameHeight = parsed.frameHeight;
  const framePixelLength = frameWidth * frameHeight * 4;
  if (parsed.frames.length > PROJECT_FILE_LIMITS.maxFrames) {
    throw new Error(`Spritesheet contains too many frames (max ${PROJECT_FILE_LIMITS.maxFrames})`);
  }
  if (framePixelLength * parsed.frames.length > PROJECT_FILE_LIMITS.maxProjectPixelBytes) {
    throw new Error('Spritesheet import exceeds runtime memory safety limits');
  }
  const frameDurations: number[] = [];
  const sheetPixels = imageData.data;

  const frames = parsed.frames.map((entry, index) => {
    if (entry.rotated) {
      throw new Error('Spritesheet import does not support rotated frames yet');
    }

    const framePixels = new Uint8ClampedArray(framePixelLength);
    const dstX = clamp(entry.spriteSourceSize.x, 0, frameWidth);
    const dstY = clamp(entry.spriteSourceSize.y, 0, frameHeight);
    const srcRect: AsepriteRect = {
      x: entry.frame.x,
      y: entry.frame.y,
      w: entry.trimmed
        ? Math.min(entry.spriteSourceSize.w, entry.frame.w)
        : Math.min(entry.frame.w, frameWidth),
      h: entry.trimmed
        ? Math.min(entry.spriteSourceSize.h, entry.frame.h)
        : Math.min(entry.frame.h, frameHeight),
    };

    copySheetRectToFrame(
      sheetPixels,
      imageData.width,
      imageData.height,
      srcRect,
      framePixels,
      frameWidth,
      frameHeight,
      dstX,
      dstY
    );

    const duration = clamp(Math.round(entry.duration), 1, 10000);
    frameDurations.push(duration);

    return {
      id: nanoid(),
      index,
      duration,
      layerData: {
        [layerId]: Array.from(framePixels),
      },
    };
  });

  const layerName = pickImportLayerName(parsed.layerNames);
  const projectName = basenameWithoutExtension(sourceFilename) || DEFAULT_PROJECT_NAME;

  return {
    version: 1,
    project: {
      id: nanoid(),
      name: projectName,
      width: frameWidth,
      height: frameHeight,
      createdAt: now,
      updatedAt: now,
    },
    layers: [
      {
        id: layerId,
        name: layerName,
        visible: true,
        locked: false,
        opacity: 1,
        blendMode: 'normal',
      },
    ],
    activeLayerId: layerId,
    frames,
    fps: estimateFpsFromDurations(frameDurations),
  };
}

function buildProjectFromSingleImage(imageData: ImageData, sourceFilename: string): ProjectFile {
  const now = Date.now();
  const width = toInteger(imageData.width, DEFAULT_DIMENSION, MIN_DIMENSION, MAX_DIMENSION);
  const height = toInteger(imageData.height, DEFAULT_DIMENSION, MIN_DIMENSION, MAX_DIMENSION);
  if (width * height * 4 > PROJECT_FILE_LIMITS.maxProjectPixelBytes) {
    throw new Error('PNG import exceeds runtime memory safety limits');
  }
  if (width !== imageData.width || height !== imageData.height) {
    throw new Error(`PNG import supports up to ${MAX_DIMENSION}x${MAX_DIMENSION} pixels`);
  }

  const layerId = nanoid();
  const layerPixels = Array.from(new Uint8ClampedArray(imageData.data));
  const projectName = basenameWithoutExtension(sourceFilename) || DEFAULT_PROJECT_NAME;

  return {
    version: 1,
    project: {
      id: nanoid(),
      name: projectName,
      width,
      height,
      createdAt: now,
      updatedAt: now,
    },
    layers: [
      {
        id: layerId,
        name: 'Imported Layer 1',
        visible: true,
        locked: false,
        opacity: 1,
        blendMode: 'normal',
      },
    ],
    activeLayerId: layerId,
    frames: [
      {
        id: nanoid(),
        index: 0,
        duration: DEFAULT_FRAME_DURATION,
        layerData: {
          [layerId]: layerPixels,
        },
      },
    ],
    fps: DEFAULT_FPS,
  };
}

function chooseImageFile(
  images: File[],
  imageFileHint: string | null
): File | null {
  if (images.length === 0) return null;
  if (images.length === 1) return images[0];
  if (!imageFileHint) return null;

  const expected = imageFileHint.split(/[\\/]/).pop()?.toLowerCase() ?? imageFileHint.toLowerCase();
  return images.find((file) => file.name.toLowerCase() === expected) ?? null;
}

async function resolveProjectFromSelectedFiles(files: File[]): Promise<ProjectFile> {
  await validateSelectedFiles(files);

  const jsonLikeFiles = files.filter((file) => {
    const ext = extensionFromFilename(file.name);
    return isProjectJsonExtension(ext);
  });
  const imageFiles = files.filter((file) => SUPPORTED_IMPORT_IMAGE_EXTENSIONS.has(extensionFromFilename(file.name)));
  let foundAsepriteMetadata = false;

  for (const file of jsonLikeFiles) {
    const rawText = await readTextFile(file);
    let parsedRaw: unknown;
    try {
      parsedRaw = JSON.parse(rawText) as unknown;
    } catch {
      continue;
    }
    const normalized = normalizeProjectFile(parsedRaw);
    if (normalized) return normalized;

    if (isObject(parsedRaw) && parsedRaw.version === 2) {
      const imported = importSpriteDocumentV2(parsedRaw, PROJECT_FILE_LIMITS.maxProjectPixelBytes);
      if (!imported.ok) throw new Error(imported.message);
      return imported.value;
    }
  }

  for (const jsonFile of jsonLikeFiles) {
    const rawText = await readTextFile(jsonFile);
    let parsedRaw: unknown;
    try {
      parsedRaw = JSON.parse(rawText) as unknown;
    } catch {
      continue;
    }

    const asepriteImport = normalizeAsepriteImport(parsedRaw);
    if (!asepriteImport) continue;
    foundAsepriteMetadata = true;

    const imageFile = chooseImageFile(imageFiles, asepriteImport.imageFileHint);
    if (!imageFile) continue;

    const sheetImage = await readImageDataFile(imageFile);
    return buildProjectFromAsepriteSpritesheet(asepriteImport, sheetImage, jsonFile.name);
  }

  if (foundAsepriteMetadata) {
    throw new Error('Select spritesheet JSON and its PNG image together to import');
  }

  if (imageFiles.length > 0) {
    const image = await readImageDataFile(imageFiles[0]);
    return buildProjectFromSingleImage(image, imageFiles[0].name);
  }

  throw new Error('Invalid project file');
}

export function normalizeProjectFile(raw: unknown): ProjectFile | null {
  if (isObject(raw) && raw.version === 2) {
    const imported = importSpriteDocumentV2(raw, PROJECT_FILE_LIMITS.maxProjectPixelBytes);
    return imported.ok ? imported.value : null;
  }
  if (!isObject(raw) || !Array.isArray(raw.layers) || !Array.isArray(raw.frames)) {
    return null;
  }
  if (raw.layers.length > PROJECT_FILE_LIMITS.maxLayers) {
    return null;
  }
  if (raw.frames.length > PROJECT_FILE_LIMITS.maxFrames) {
    return null;
  }

  const now = Date.now();
  const projectSource = isObject(raw.project) ? raw.project : raw;

  const width = toInteger(projectSource.width, DEFAULT_DIMENSION, MIN_DIMENSION, MAX_DIMENSION);
  const height = toInteger(projectSource.height, DEFAULT_DIMENSION, MIN_DIMENSION, MAX_DIMENSION);
  const expectedLength = width * height * 4;
  if (!Number.isFinite(expectedLength) || expectedLength <= 0) {
    return null;
  }
  const projectedBytes = expectedLength * Math.max(1, raw.frames.length);
  if (!Number.isFinite(projectedBytes) || projectedBytes > PROJECT_FILE_LIMITS.maxProjectPixelBytes) {
    return null;
  }

  const layers = raw.layers
    .map((layer, index) => normalizeLayer(layer, index))
    .filter((layer): layer is Layer => layer !== null);

  if (layers.length === 0) {
    layers.push({
      id: nanoid(),
      name: 'Layer 1',
      visible: true,
      locked: false,
      opacity: 1,
      blendMode: 'normal',
    });
  }

  const layerIds = new Set(layers.map((layer) => layer.id));
  const activeLayerIdCandidate = typeof raw.activeLayerId === 'string' ? raw.activeLayerId : '';
  const activeLayerId = layerIds.has(activeLayerIdCandidate) ? activeLayerIdCandidate : layers[0].id;

  const frames: ProjectFile['frames'] = [];
  for (let i = 0; i < raw.frames.length; i += 1) {
    const frame = raw.frames[i];
    if (!isObject(frame)) continue;

    const duration = toInteger(frame.duration, DEFAULT_FRAME_DURATION, 1, 10000);
    const layerData = normalizeLayerData(frame.layerData, expectedLength, layerIds);
    if (!layerData[activeLayerId]) {
      layerData[activeLayerId] = new Array<number>(expectedLength).fill(0);
    }

    frames.push({
      id: typeof frame.id === 'string' && frame.id.length > 0 ? frame.id : nanoid(),
      index: i,
      duration,
      layerData,
    });
  }

  if (frames.length === 0) {
    frames.push({
      id: nanoid(),
      index: 0,
      duration: DEFAULT_FRAME_DURATION,
      layerData: {
        [activeLayerId]: new Array<number>(expectedLength).fill(0),
      },
    });
  }

  const createdAt = toTimestamp(projectSource.createdAt, now);
  const updatedAt = toTimestamp(projectSource.updatedAt, createdAt);
  const fps = toInteger(raw.fps, DEFAULT_FPS, 1, 120);
  const activeFrameId = typeof raw.activeFrameId === 'string'
    && frames.some((frame) => frame.id === raw.activeFrameId)
    ? raw.activeFrameId
    : frames[0].id;

  return {
    version: 1,
    project: {
      id: typeof projectSource.id === 'string' && projectSource.id.length > 0 ? projectSource.id : nanoid(),
      name: typeof projectSource.name === 'string' && projectSource.name.length > 0
        ? projectSource.name
        : DEFAULT_PROJECT_NAME,
      width,
      height,
      createdAt,
      updatedAt,
    },
    layers,
    activeLayerId,
    activeFrameId,
    loop: typeof raw.loop === 'boolean' ? raw.loop : true,
    frames,
    fps,
  };
}

export function serializeProject(
  project: ProjectSettings,
  layers: Layer[],
  activeLayerId: string,
  frames: Frame[],
  fps: number,
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

export function deserializeProject(file: unknown): {
  project: ProjectSettings;
  layers: Layer[];
  activeLayerId: string;
  frames: Frame[];
  fps: number;
  activeFrameIndex: number;
  loop: boolean;
} {
  const normalized = normalizeProjectFile(file);
  if (!normalized) {
    throw new Error('Invalid project file');
  }

  return {
    project: normalized.project,
    layers: normalized.layers,
    activeLayerId: normalized.activeLayerId,
    frames: normalized.frames.map((f) => ({
      id: f.id,
      index: f.index,
      duration: f.duration,
      layerData: Object.fromEntries(
        Object.entries(f.layerData).map(([layerId, data]) => [
          layerId,
          new Uint8ClampedArray(data),
        ])
      ),
    })),
    fps: normalized.fps,
    activeFrameIndex: Math.max(0, normalized.frames.findIndex((frame) => frame.id === normalized.activeFrameId)),
    loop: normalized.loop ?? true,
  };
}

export function saveProjectToFile(
  project: ProjectSettings,
  layers: Layer[],
  activeLayerId: string,
  frames: Frame[],
  fps: number
): void {
  const data = serializeProject(project, layers, activeLayerId, frames, fps);
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${project.name}${PROJECT_FILE_EXTENSION}`;
  a.click();
  URL.revokeObjectURL(url);
}

export function loadProjectFromFile(): Promise<ProjectFile> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = `${PROJECT_FILE_EXTENSION},${LEGACY_PROJECT_FILE_EXTENSION},.json,.png`;
    input.onchange = () => {
      const selected = Array.from(input.files ?? []);
      if (selected.length === 0) {
        reject(new Error('No file selected'));
        return;
      }

      void (async () => {
        try {
          const project = await resolveProjectFromSelectedFiles(selected);
          resolve(project);
        } catch (error) {
          reject(error instanceof Error ? error : new Error('Invalid project file'));
        }
      })();
    };
    input.click();
  });
}

// Helper to check if a file is an image
export function isImageFile(filename: string): boolean {
  return SUPPORTED_IMPORT_IMAGE_EXTENSIONS.has(extensionFromFilename(filename));
}

// Import image and show dialog for scaling options
export function importImageFile(
  onImageSelected: (imageData: ImageData, filename: string) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }

      void (async () => {
        try {
          const imageData = await readImageDataFile(file);
          onImageSelected(imageData, file.name);
          resolve();
        } catch (error) {
          reject(error instanceof Error ? error : new Error('Failed to read image'));
        }
      })();
    };
    input.click();
  });
}

// Auto-save to localStorage
const AUTOSAVE_KEY = 'dogsprite-autosave-v1';
const LEGACY_AUTOSAVE_KEY = 'spritedog-autosave-v1';

export function autoSave(
  project: ProjectSettings,
  layers: Layer[],
  activeLayerId: string,
  frames: Frame[],
  fps: number
): void {
  try {
    const data = serializeProject(project, layers, activeLayerId, frames, fps);
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data));
  } catch {
    // localStorage might be full, ignore
  }
}

export function loadAutoSave(): ProjectFile | null {
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY) ?? localStorage.getItem(LEGACY_AUTOSAVE_KEY);
    if (!raw) return null;
    return normalizeProjectFile(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function clearAutoSave(): void {
  localStorage.removeItem(AUTOSAVE_KEY);
  localStorage.removeItem(LEGACY_AUTOSAVE_KEY);
}
