import { PixelBuffer, type RGBA } from './lib/pixelBuffer.js';
import type { ProjectFileLayer, ProjectFileSettings } from './lib/projectFile.js';

export interface McpLayer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay';
  buffer: PixelBuffer;
}

export interface UndoEntry {
  layerId: string;
  data: Uint8ClampedArray;
}

export interface McpProject {
  id: string;
  name: string;
  width: number;
  height: number;
  createdAt: number;
  updatedAt: number;
  layers: McpLayer[];
  activeLayerId: string;
  palette: string[]; // hex colors
  undoStack: UndoEntry[][];
  redoStack: UndoEntry[][];
  fps: number;
  frameDuration: number;
}

const projects = new Map<string, McpProject>();
let nextId = 1;

export function generateId(): string {
  return `proj-${nextId++}`;
}

export function createProject(
  width: number,
  height: number,
  name: string,
  id?: string
): McpProject {
  const projectId = id ?? generateId();
  const layerId = `layer-${Date.now()}`;
  const now = Date.now();

  const project: McpProject = {
    id: projectId,
    name,
    width,
    height,
    createdAt: now,
    updatedAt: now,
    layers: [
      {
        id: layerId,
        name: 'Layer 1',
        visible: true,
        locked: false,
        opacity: 1,
        blendMode: 'normal',
        buffer: new PixelBuffer(width, height),
      },
    ],
    activeLayerId: layerId,
    palette: [],
    undoStack: [],
    redoStack: [],
    fps: 12,
    frameDuration: 100,
  };

  projects.set(projectId, project);
  return project;
}

export function getProject(id: string): McpProject | undefined {
  return projects.get(id);
}

export function getAllProjects(): McpProject[] {
  return Array.from(projects.values());
}

export function deleteProject(id: string): boolean {
  return projects.delete(id);
}

export function getLayer(project: McpProject, layerId?: string): McpLayer | undefined {
  if (layerId) {
    return project.layers.find(l => l.id === layerId);
  }
  return project.layers.find(l => l.id === project.activeLayerId);
}

export function addLayer(
  project: McpProject,
  name: string,
  position?: number
): McpLayer {
  const layerId = `layer-${Date.now()}-${project.layers.length}`;
  const layer: McpLayer = {
    id: layerId,
    name,
    visible: true,
    locked: false,
    opacity: 1,
    blendMode: 'normal',
    buffer: new PixelBuffer(project.width, project.height),
  };

  if (position !== undefined && position >= 0 && position <= project.layers.length) {
    project.layers.splice(position, 0, layer);
  } else {
    project.layers.push(layer);
  }

  project.activeLayerId = layerId;
  project.updatedAt = Date.now();
  return layer;
}

export function pushUndo(project: McpProject, entries: UndoEntry[]): void {
  project.undoStack.push(entries);
  project.redoStack = [];
  // Limit undo stack
  if (project.undoStack.length > 100) {
    project.undoStack.shift();
  }
}

export function undo(project: McpProject): boolean {
  const entries = project.undoStack.pop();
  if (!entries) return false;

  const redoEntries: UndoEntry[] = [];
  for (const entry of entries) {
    const layer = project.layers.find(l => l.id === entry.layerId);
    if (layer) {
      redoEntries.push({ layerId: entry.layerId, data: new Uint8ClampedArray(layer.buffer.data) });
      layer.buffer = new PixelBuffer(project.width, project.height, entry.data);
    }
  }
  project.redoStack.push(redoEntries);
  project.updatedAt = Date.now();
  return true;
}

export function redo(project: McpProject): boolean {
  const entries = project.redoStack.pop();
  if (!entries) return false;

  const undoEntries: UndoEntry[] = [];
  for (const entry of entries) {
    const layer = project.layers.find(l => l.id === entry.layerId);
    if (layer) {
      undoEntries.push({ layerId: entry.layerId, data: new Uint8ClampedArray(layer.buffer.data) });
      layer.buffer = new PixelBuffer(project.width, project.height, entry.data);
    }
  }
  project.undoStack.push(undoEntries);
  project.updatedAt = Date.now();
  return true;
}

export function setProjectInStore(project: McpProject): void {
  projects.set(project.id, project);
}

export function toProjectFileSettings(project: McpProject): ProjectFileSettings {
  return {
    id: project.id,
    name: project.name,
    width: project.width,
    height: project.height,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

export function toProjectFileLayers(project: McpProject): ProjectFileLayer[] {
  return project.layers.map(l => ({
    id: l.id,
    name: l.name,
    visible: l.visible,
    locked: l.locked,
    opacity: l.opacity,
    blendMode: l.blendMode,
  }));
}
