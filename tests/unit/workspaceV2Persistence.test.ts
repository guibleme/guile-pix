import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { AnimationBridge } from '../../mcp-server/src/animationBridge';
import { hashDocumentPixels, hashDocumentSemantic, serializeDocumentV2, type SpriteDocumentV2 } from '../../packages/sprite-core/src';
import { normalizeProjectFile } from '../../src/lib/export/projectFile';
import { snapshotEditorDocumentV2 } from '../../src/lib/project/editorSpriteDocumentAdapter';
import { loadWorkspaceSession, saveWorkspaceSession } from '../../src/lib/project/workspaceSessionStorage';
import { useWorkspaceStore } from '../../src/stores/useWorkspaceStore';

class MemoryStorage implements Storage {
  private readonly values = new Map<string, string>();
  get length() { return this.values.size; }
  clear() { this.values.clear(); }
  getItem(key: string) { return this.values.get(key) ?? null; }
  key(index: number) { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string) { this.values.delete(key); }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

const previousStorage = globalThis.localStorage;

afterEach(() => {
  useWorkspaceStore.setState({ initialized: false, documents: [], closedDocuments: [], activeDocumentId: null });
  if (previousStorage) Object.defineProperty(globalThis, 'localStorage', { value: previousStorage, configurable: true });
  else Reflect.deleteProperty(globalThis, 'localStorage');
});

function sourceDocument(): SpriteDocumentV2 {
  const pixels = new Array(2 * 2 * 4).fill(0); pixels.splice(0, 4, 255, 0, 0, 255);
  return {
    version: 2, project: { id: 'workspace-v2', name: 'Workspace v2', width: 2, height: 2, createdAt: 1, updatedAt: 2 },
    layers: [{ id: 'base', name: 'Base', visible: true, locked: false, opacity: 1, blendMode: 'normal' }],
    cels: { linked: { id: 'linked', data: pixels }, retained: { id: 'retained', data: new Array(16).fill(7) } },
    frames: [{ id: 'a', durationMs: 80, celRefs: { base: 'linked' } }, { id: 'b', durationMs: 120, celRefs: { base: 'linked' } }],
    clip: { id: 'idle', name: 'idle', frameIds: ['a', 'b'], loop: 'ping_pong' }, palette: ['#ff0000'], pivotPx: { x: 1, y: 1 },
    production: { paletteId: 'custom', groundLineY: 1, facing: 'left', rootMotion: { mode: 'none' } }, activeLayerId: 'base', activeFrameId: 'b', revision: 4,
  };
}

describe('workspace canonical v2 provenance', () => {
  it('survives production open, clone, switch, workspace session, save, and MCP reload', async () => {
    Object.defineProperty(globalThis, 'localStorage', { value: new MemoryStorage(), configurable: true });
    const source = sourceDocument();
    const file = normalizeProjectFile(source)!;
    const workspace = useWorkspaceStore.getState();
    const openedId = workspace.openProjectFileAsDocument(file, { setActive: true });
    let opened = useWorkspaceStore.getState().documents.find((document) => document.id === openedId)!;
    expect(opened.sourceDocumentV2).toEqual(source);
    expect(opened.frames[0].layerData.base).toBe(opened.frames[1].layerData.base);
    expect(opened.sourceDocumentV2?.cels.retained).toEqual(source.cels.retained);

    const copyId = useWorkspaceStore.getState().duplicateDocument(openedId, { setActive: false })!;
    const copy = useWorkspaceStore.getState().documents.find((document) => document.id === copyId)!;
    expect(copy.frames[0].layerData.base).toBe(copy.frames[1].layerData.base);
    expect(copy.sourceDocumentV2?.cels.retained).toEqual(source.cels.retained);
    expect(useWorkspaceStore.getState().switchToDocument(copyId)).toBe(true);
    expect(useWorkspaceStore.getState().switchToDocument(openedId)).toBe(true);
    opened = useWorkspaceStore.getState().documents.find((document) => document.id === openedId)!;
    expect(opened.frames[0].layerData.base).toBe(opened.frames[1].layerData.base);

    saveWorkspaceSession(useWorkspaceStore.getState().documents, openedId);
    const restored = loadWorkspaceSession()!;
    const restoredOpen = restored.documents.find((document) => document.id === openedId)!;
    expect(restoredOpen.sourceDocumentV2?.cels.retained).toEqual(source.cels.retained);
    expect(restoredOpen.frames[0].layerData.base).toBe(restoredOpen.frames[1].layerData.base);

    const snapshot = snapshotEditorDocumentV2({ ...restoredOpen, loop: true, sourceDocument: restoredOpen.sourceDocumentV2 });
    expect(snapshot.ok).toBe(true);
    if (!snapshot.ok) return;
    expect(await hashDocumentSemantic(snapshot.value)).toBe(await hashDocumentSemantic(source));
    expect(await hashDocumentPixels(snapshot.value)).toBe(await hashDocumentPixels(source));
    const serialized = serializeDocumentV2(snapshot.value);
    expect(serialized.ok).toBe(true);
    if (!serialized.ok) return;
    const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-workspace-v2-'));
    const filePath = path.join(outputDir, 'roundtrip.dogsprite'); fs.writeFileSync(filePath, serialized.value);
    const bridge = new AnimationBridge({ outputDir });
    const loaded = await bridge.loadProject({ filePath });
    const projectId = (loaded.structuredContent as Record<string, unknown>).projectId as string;
    expect(await hashDocumentSemantic(bridge.getDocument(projectId)!)).toBe(await hashDocumentSemantic(source));
    expect(await hashDocumentPixels(bridge.getDocument(projectId)!)).toBe(await hashDocumentPixels(source));
    fs.rmSync(outputDir, { recursive: true, force: true });
  });
});
