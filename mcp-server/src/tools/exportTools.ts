import * as fs from 'node:fs';
import * as path from 'node:path';
import { getProject, toProjectFileSettings, toProjectFileLayers, setProjectInStore, createProject, addLayer as addLayerToProject, type McpProject } from '../project.js';
import { PixelBuffer } from '../lib/pixelBuffer.js';
import { renderProjectToPng } from '../render.js';
import { serializeProject, normalizeProjectFile, type ProjectFile } from '../lib/projectFile.js';
import { getOutputDir } from '../outputDir.js';

/** Ensure resolved path stays within the allowed base directory */
function assertWithinDir(resolved: string, baseDir: string, label: string) {
  const normalizedBase = path.resolve(baseDir) + path.sep;
  const normalizedTarget = path.resolve(resolved);
  if (!normalizedTarget.startsWith(normalizedBase) && normalizedTarget !== path.resolve(baseDir)) {
    throw new Error(`${label} must be within ${baseDir} (path traversal blocked)`);
  }
}

/** Sanitize a filename to prevent path traversal */
function sanitizeFilename(filename: string): string {
  return path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
}

export interface SaveProjectArgs {
  projectId: string;
  outputPath?: string;
}

export interface ExportPngArgs {
  projectId: string;
  scale?: number;
  filename?: string;
}

export interface LoadProjectArgs {
  filePath: string;
}

export function handleSaveProject(args: SaveProjectArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const settings = toProjectFileSettings(project);
  const layers = toProjectFileLayers(project);
  const frames = [{
    id: `frame-${Date.now()}`,
    index: 0,
    duration: project.frameDuration,
    layerData: Object.fromEntries(
      project.layers.map(l => [l.id, l.buffer.data])
    ) as Record<string, Uint8ClampedArray>,
  }];

  const projectFile = serializeProject(settings, layers, project.activeLayerId, frames, project.fps);
  const json = JSON.stringify(projectFile, null, 2);

  const outputDir = getOutputDir();
  const outputPath = args.outputPath
    ? path.resolve(args.outputPath)
    : path.join(outputDir, `${project.name.replace(/[^a-zA-Z0-9_-]/g, '_')}.dogsprite`);

  try {
    assertWithinDir(outputPath, outputDir, 'outputPath');
  } catch (err) {
    return { content: [{ type: 'text' as const, text: `Error: ${(err as Error).message}` }], isError: true };
  }

  // Ensure parent directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, json, 'utf-8');

  return {
    content: [{
      type: 'text' as const,
      text: `Project saved: ${outputPath}\nFormat: .dogsprite (compatible with DogSprite editor)\nLayers: ${layers.length}\nSize: ${project.width}x${project.height}`,
    }],
  };
}

export function handleExportPng(args: ExportPngArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const scale = Math.max(1, Math.min(32, Math.round(args.scale ?? 1)));
  const pngBuffer = renderProjectToPng(project, scale);

  const outputDir = getOutputDir();
  const filename = args.filename ? sanitizeFilename(args.filename) : `${project.name.replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;
  const filePath = path.join(outputDir, filename);

  fs.writeFileSync(filePath, pngBuffer);

  return {
    content: [{
      type: 'text' as const,
      text: `PNG exported: ${path.resolve(filePath)}\nSize: ${project.width * scale}x${project.height * scale}px (${scale}x scale)\nOriginal: ${project.width}x${project.height}`,
    }],
  };
}

export function handleLoadProject(args: LoadProjectArgs) {
  const filePath = path.resolve(args.filePath);
  const ext = path.extname(filePath).toLowerCase();
  if (!['.dogsprite', '.spritedog', '.spriteset', '.json'].includes(ext)) {
    return { content: [{ type: 'text' as const, text: `Error: Only .dogsprite/.spritedog/.json files can be loaded` }], isError: true };
  }
  if (!fs.existsSync(filePath)) {
    return { content: [{ type: 'text' as const, text: `Error: File not found` }], isError: true };
  }

  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const normalized = normalizeProjectFile(raw);
  if (!normalized) {
    return { content: [{ type: 'text' as const, text: `Error: Invalid .dogsprite file` }], isError: true };
  }

  // Create project from normalized data
  const project = createProject(
    normalized.project.width,
    normalized.project.height,
    normalized.project.name,
    normalized.project.id
  );

  project.createdAt = normalized.project.createdAt;
  project.updatedAt = normalized.project.updatedAt;
  project.fps = normalized.fps;

  // Clear default layer and rebuild from file
  project.layers = [];
  for (const fileLayer of normalized.layers) {
    const layer = addLayerToProject(project, fileLayer.name);
    // Override auto-generated id with the one from file
    layer.id = fileLayer.id;
    layer.visible = fileLayer.visible;
    layer.locked = fileLayer.locked;
    layer.opacity = fileLayer.opacity;
    layer.blendMode = fileLayer.blendMode;
  }

  project.activeLayerId = normalized.activeLayerId;

  // Load pixel data from first frame
  if (normalized.frames.length > 0) {
    const frame = normalized.frames[0];
    for (const [layerId, data] of Object.entries(frame.layerData)) {
      const layer = project.layers.find(l => l.id === layerId);
      if (layer) {
        layer.buffer = new PixelBuffer(project.width, project.height, new Uint8ClampedArray(data));
      }
    }
    project.frameDuration = frame.duration;
  }

  setProjectInStore(project);

  return {
    content: [{
      type: 'text' as const,
      text: JSON.stringify({
        projectId: project.id,
        name: project.name,
        width: project.width,
        height: project.height,
        layers: project.layers.map(l => ({ id: l.id, name: l.name })),
        activeLayerId: project.activeLayerId,
      }, null, 2),
    }],
  };
}
