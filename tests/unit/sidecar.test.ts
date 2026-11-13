import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { createHash } from 'node:crypto';
import type * as http from 'node:http';
import { afterEach, describe, expect, it } from 'vitest';
import { createSidecarServer, SIDECAR_VERSION } from '../../mcp-server/src/sidecar';
import { makeGoldenWalkDocument } from '../fixtures/sprite-core/fixtures';

const temporaryDirectories: string[] = [];
const servers: http.Server[] = [];

afterEach(async () => {
  while (servers.length > 0) {
    const server = servers.pop()!;
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
  while (temporaryDirectories.length > 0) {
    fs.rmSync(temporaryDirectories.pop()!, { recursive: true, force: true });
  }
});

async function startServer(outputDir: string): Promise<string> {
  const server = createSidecarServer({ outputDir });
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
