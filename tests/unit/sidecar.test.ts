import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { createHash } from 'node:crypto';
import * as http from 'node:http';
import type * as httpServer from 'node:http';
import { afterEach, describe, expect, it } from 'vitest';
import { closeSidecarServer, createSidecarServer, SIDECAR_VERSION } from '../../mcp-server/src/sidecar';
import { AnimationBridge } from '../../mcp-server/src/animationBridge';
import { makeGoldenWalkDocument } from '../fixtures/sprite-core/fixtures';

const temporaryDirectories: string[] = [];
const servers: httpServer.Server[] = [];

afterEach(async () => {
  while (servers.length > 0) {
    await closeSidecarServer(servers.pop()!);
  }
  while (temporaryDirectories.length > 0) {
    fs.rmSync(temporaryDirectories.pop()!, { recursive: true, force: true });
  }
});

async function startServer(outputDir: string, bridge?: AnimationBridge): Promise<string> {
  const server = createSidecarServer({ outputDir, bridge });
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
  const address = server.address();
  if (typeof address !== 'object' || !address) throw new Error('Sidecar did not bind');
  return `http://127.0.0.1:${address.port}`;
}

function writeDoc(dir: string, fileName: string, doc: unknown, mtimeMs?: number): string {
  const fullPath = path.join(dir, fileName);
  fs.writeFileSync(fullPath, JSON.stringify(doc));
  if (mtimeMs !== undefined) {
    const atime = new Date(mtimeMs);
    fs.utimesSync(fullPath, atime, atime);
  }
  return fullPath;
}

function sha256Hex(text: string): string {
  return createHash('sha256').update(text).digest('hex');
}

describe('sync sidecar (V1)', () => {
  it('answers /health and lists valid projects, skipping invalid files', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-sidecar-'));
    temporaryDirectories.push(dir);
    const walk = makeGoldenWalkDocument();
    writeDoc(dir, 'walk.dogsprite', walk);
    const other = makeGoldenWalkDocument();
    other.project.id = 'second-project';
    other.project.name = 'Second Project';
    other.revision = 3;
    writeDoc(dir, 'second.dogsprite', other);
    fs.writeFileSync(path.join(dir, 'broken.dogsprite'), '{ not json');
    fs.writeFileSync(path.join(dir, 'notes.txt'), 'not a sprite');

    const base = await startServer(dir);
    const health = await (await fetch(`${base}/health`)).json() as Record<string, unknown>;
    expect(health).toEqual({ ok: true, service: 'guile-pix-sidecar', version: SIDECAR_VERSION });

    const listed = await (await fetch(`${base}/projects`)).json() as {
      projects: Array<{ id: string; name: string; revision: number; sha256: string }>;
    };
    expect(listed.projects.map((p) => p.id).sort()).toEqual(['cornerfall-fighter-right', 'second-project']);
    const second = listed.projects.find((p) => p.id === 'second-project')!;
    expect(second.revision).toBe(3);
    expect(second.sha256).toBe(sha256Hex(JSON.stringify(other)));
  });

  it('serves revision and file bytes, and 404s unknown projects', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-sidecar-'));
    temporaryDirectories.push(dir);
    const walk = makeGoldenWalkDocument();
    const text = JSON.stringify(walk);
    writeDoc(dir, 'walk.dogsprite', walk);

    const base = await startServer(dir);
    const revision = await (await fetch(`${base}/projects/cornerfall-fighter-right/revision`)).json() as Record<string, unknown>;
    expect(revision).toMatchObject({ projectId: 'cornerfall-fighter-right', revision: 0, sha256: sha256Hex(text), fileName: 'walk.dogsprite' });

    const fileText = await (await fetch(`${base}/projects/cornerfall-fighter-right/file`)).text();
    expect(fileText).toBe(text);

    const missingRevision = await fetch(`${base}/projects/nope/revision`);
    expect(missingRevision.status).toBe(404);
    const missingFile = await fetch(`${base}/projects/nope/file`);
    expect(missingFile.status).toBe(404);
    const missingRoute = await fetch(`${base}/nope`);
    expect(missingRoute.status).toBe(404);
  });

  it('reflects an agent save: revision and hash move, file content is new', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-sidecar-'));
    temporaryDirectories.push(dir);
    const before = makeGoldenWalkDocument();
    const filePath = writeDoc(dir, 'walk.dogsprite', before, 1_700_000_000_000);

    const base = await startServer(dir);
    const first = await (await fetch(`${base}/projects/cornerfall-fighter-right/revision`)).json() as Record<string, unknown>;
    expect(first.revision).toBe(0);

    const after = makeGoldenWalkDocument();
    after.revision = 1;
    after.cels['cel-0'].data[0] = 255;
    fs.writeFileSync(filePath, JSON.stringify(after));
    const later = new Date(1_700_000_001_000);
    fs.utimesSync(filePath, later, later);

    const second = await (await fetch(`${base}/projects/cornerfall-fighter-right/revision`)).json() as Record<string, unknown>;
    expect(second.revision).toBe(1);
    expect(second.sha256).not.toBe(first.sha256);
    const fileText = await (await fetch(`${base}/projects/cornerfall-fighter-right/file`)).text();
    expect(JSON.parse(fileText).revision).toBe(1);
    expect(JSON.parse(fileText).cels['cel-0'].data[0]).toBe(255);
  });

  it('prefers the most recently modified file when two files share a project id', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-sidecar-'));
    temporaryDirectories.push(dir);
    const older = makeGoldenWalkDocument();
    older.revision = 5;
    writeDoc(dir, 'old.dogsprite', older, 1_700_000_000_000);
    const newer = makeGoldenWalkDocument();
    newer.revision = 9;
    writeDoc(dir, 'new.dogsprite', newer, 1_700_000_002_000);

    const base = await startServer(dir);
    const revision = await (await fetch(`${base}/projects/cornerfall-fighter-right/revision`)).json() as Record<string, unknown>;
    expect(revision).toMatchObject({ revision: 9, fileName: 'new.dogsprite' });
  });
});

describe('sync sidecar (V2: POST + SSE)', () => {
  it('saves a posted document to disk and serves the new content', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-sidecar-'));
    temporaryDirectories.push(dir);
    const base = await startServer(dir);

    const doc = makeGoldenWalkDocument();
    doc.cels['cel-0'].data[0] = 255;
    const response = await fetch(`${base}/projects/cornerfall-fighter-right/file`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(doc),
    });
    expect(response.status).toBe(200);
    const saved = await response.json() as Record<string, unknown>;
    expect(saved).toMatchObject({ ok: true, projectId: 'cornerfall-fighter-right', revision: 0, sessionRefreshed: false });
    expect(saved.fileName).toBe('Cornerfall_Fighter_Walk_Right.dogsprite');

    const fileText = await (await fetch(`${base}/projects/cornerfall-fighter-right/file`)).text();
    expect(JSON.parse(fileText).cels['cel-0'].data[0]).toBe(255);
    const revision = await (await fetch(`${base}/projects/cornerfall-fighter-right/revision`)).json() as Record<string, unknown>;
    expect(revision.sha256).toBe(saved.sha256);
  });

  it('rejects invalid documents, id mismatches, and v1 payloads', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-sidecar-'));
    temporaryDirectories.push(dir);
    const base = await startServer(dir);

    const invalid = await fetch(`${base}/projects/cornerfall-fighter-right/file`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{ nope',
    });
    expect(invalid.status).toBe(400);

    const mismatched = makeGoldenWalkDocument();
    const mismatch = await fetch(`${base}/projects/someone-else/file`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(mismatched),
    });
    expect(mismatch.status).toBe(400);

    const v1 = { version: 1, project: { id: 'cornerfall-fighter-right' }, layers: [], frames: [] };
    const legacy = await fetch(`${base}/projects/cornerfall-fighter-right/file`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(v1),
    });
    expect(legacy.status).toBe(400);
    expect(fs.readdirSync(dir)).toEqual([]);
  });

  it('409s when the bridge holds newer unsaved work, and refreshes the session on success', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-sidecar-'));
    temporaryDirectories.push(dir);
    const original = makeGoldenWalkDocument();
    const filePath = writeDoc(dir, 'walk.dogsprite', original);
    const bridge = new AnimationBridge({ outputDir: dir });
    const loaded = await bridge.loadProject({ filePath });
    expect(loaded.isError).toBeFalsy();
    // Pick a transparent pixel so set_pixels is guaranteed to change the doc.
    const sessionBefore = bridge.getDocument('cornerfall-fighter-right')!;
    const celData = sessionBefore.cels['cel-0'].data;
    let target = { x: 0, y: 0 };
    outer: for (let y = 0; y < 16; y += 1) {
      for (let x = 0; x < 16; x += 1) {
        if (celData[(y * 16 + x) * 4 + 3] === 0) { target = { x, y }; break outer; }
      }
    }
    const mutated = await bridge.setPixels({
      projectId: 'cornerfall-fighter-right',
      expectedRevision: 0,
      pixels: [{ x: target.x, y: target.y, color: '#FF0000' }],
    });
    expect(mutated.isError).toBeFalsy();

    const base = await startServer(dir, bridge);

    // The posted rev-0 doc is stale: the bridge is at rev 1 in memory.
    const stale = await fetch(`${base}/projects/cornerfall-fighter-right/file`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(original),
    });
    expect(stale.status).toBe(409);
    const staleBody = await stale.json() as Record<string, unknown>;
    expect(staleBody).toMatchObject({ code: 'STALE_REVISION', currentRevision: 1 });
    // The stale POST must not have touched the file.
    expect(JSON.parse(fs.readFileSync(filePath, 'utf8')).revision).toBe(0);

    // A rev-1 doc (matching the session) saves and refreshes the session.
    const current = makeGoldenWalkDocument();
    current.revision = 1;
    current.cels['cel-0'].data[0] = 0;
    current.cels['cel-0'].data[1] = 255;
    current.cels['cel-0'].data[2] = 0;
    current.cels['cel-0'].data[3] = 255;
    const ok = await fetch(`${base}/projects/cornerfall-fighter-right/file`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(current),
    });
    expect(ok.status).toBe(200);
    const saved = await ok.json() as Record<string, unknown>;
    expect(saved).toMatchObject({ ok: true, revision: 1, sessionRefreshed: true });
    const sessionDoc = bridge.getDocument('cornerfall-fighter-right');
    expect(sessionDoc?.cels['cel-0'].data.slice(0, 4)).toEqual([0, 255, 0, 255]);
  });

  it('streams the current state on subscribe and pushes on POST', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-sidecar-'));
    temporaryDirectories.push(dir);
    writeDoc(dir, 'walk.dogsprite', makeGoldenWalkDocument());
    const base = await startServer(dir);

    const events: Array<Record<string, unknown>> = [];
    const response = await new Promise<http.IncomingMessage>((resolve, reject) => {
      const request = http.get(`${base}/projects/cornerfall-fighter-right/events`, (res) => resolve(res));
      request.on('error', reject);
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('text/event-stream');
    let buffer = '';
    response.on('data', (chunk: Buffer) => {
      buffer += chunk.toString('utf8');
      let boundary = buffer.indexOf('\n\n');
      while (boundary !== -1) {
        const raw = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const dataLine = raw.split('\n').find((line) => line.startsWith('data: '));
        if (dataLine) events.push(JSON.parse(dataLine.slice('data: '.length)) as Record<string, unknown>);
        boundary = buffer.indexOf('\n\n');
      }
    });

    const waitFor = async (count: number, timeoutMs = 5000): Promise<void> => {
      const started = Date.now();
      while (events.length < count) {
        if (Date.now() - started > timeoutMs) throw new Error(`Timed out waiting for ${count} SSE events (got ${events.length})`);
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
    };
    try {
      await waitFor(1);
      expect(events[0]).toMatchObject({ projectId: 'cornerfall-fighter-right', revision: 0 });

      const edited = makeGoldenWalkDocument();
      edited.revision = 4;
      const posted = await fetch(`${base}/projects/cornerfall-fighter-right/file`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(edited),
      });
      expect(posted.status).toBe(200);
      await waitFor(2);
      expect(events[1]).toMatchObject({ projectId: 'cornerfall-fighter-right', revision: 4 });
    } finally {
      response.destroy();
    }
  });

  it('404s the event stream for unknown projects', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-sidecar-'));
    temporaryDirectories.push(dir);
    const base = await startServer(dir);
    const response = await fetch(`${base}/projects/nope/events`);
    expect(response.status).toBe(404);
  });
});
