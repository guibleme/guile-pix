import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import type * as httpServer from 'node:http';
import { afterEach, describe, expect, it } from 'vitest';
import {
  AssistRequestError,
  AssistRequestStore,
  type AssistRequestCreate,
} from '../../mcp-server/src/assistRequests';
import { closeSidecarServer, createSidecarServer } from '../../mcp-server/src/sidecar';

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

function tempDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-assist-'));
  temporaryDirectories.push(dir);
  return dir;
}

function makeCreateInput(overrides: Partial<AssistRequestCreate> = {}): AssistRequestCreate {
  return {
    projectId: 'proj-1',
    projectName: 'Pearl Knight',
    prompt: 'make this circle red',
    target: { kind: 'pin', point: { x: 12, y: 8 } },
    context: { frameId: 'frame-0', layerId: 'layer-1', width: 24, height: 54, revision: 4 },
    mask: { runs: [{ y: 8, xStart: 12, xEnd: 12 }] },
    ...overrides,
  };
}

/** Minimal v2 doc — only the fields the sidecar index reads. */
function writeProjectDoc(dir: string, fileName: string, projectId: string): void {
  fs.writeFileSync(
    path.join(dir, fileName),
    JSON.stringify({ version: 2, project: { id: projectId, name: 'Pearl Knight' }, revision: 4 }),
  );
}

async function startServer(outputDir: string): Promise<string> {
  const server = createSidecarServer({ outputDir });
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
  const address = server.address();
  if (typeof address !== 'object' || !address) throw new Error('Sidecar did not bind');
  return `http://127.0.0.1:${address.port}`;
}

describe('AssistRequestStore', () => {
  it('creates a pending request with server-assigned id and createdAt, and reads it back', () => {
    const store = new AssistRequestStore(tempDir());
    const created = store.create(makeCreateInput());
    expect(created.id).toMatch(/^asr-/);
    expect(created.version).toBe(1);
    expect(created.status).toBe('pending');
    expect(created.claimedBy).toBeNull();
    expect(created.note).toBeNull();
    expect(created.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(store.get(created.id)).toEqual(created);
    expect(fs.existsSync(path.join(store.directory, `${created.id}.json`))).toBe(true);
  });

  it('rejects invalid creates (empty prompt, bad rect, empty mask, inverted run)', () => {
    const store = new AssistRequestStore(tempDir());
    expect(() => store.create(makeCreateInput({ prompt: '' }))).toThrow(AssistRequestError);
    expect(() =>
      store.create(makeCreateInput({ target: { kind: 'rect', rect: { x: 0, y: 0, w: 0, h: 5 } } })),
    ).toThrow(AssistRequestError);
    expect(() => store.create(makeCreateInput({ mask: { runs: [] } }))).toThrow(AssistRequestError);
    expect(() =>
      store.create(makeCreateInput({ mask: { runs: [{ y: 0, xStart: 5, xEnd: 2 }] } })),
    ).toThrow(AssistRequestError);
    try {
      store.create(makeCreateInput({ prompt: '' }));
      expect.unreachable();
    } catch (error) {
      expect((error as AssistRequestError).status).toBe(400);
    }
  });

  it('runs the legal lifecycle: claim (with agent), complete with note', () => {
    const store = new AssistRequestStore(tempDir());
    const created = store.create(makeCreateInput());
    const claimed = store.update(created.id, { status: 'claimed', claimedBy: 'opencode' });
    expect(claimed.status).toBe('claimed');
    expect(claimed.claimedBy).toBe('opencode');
    const done = store.update(created.id, { status: 'done', note: 'recolored 42 px to #ff0000' });
    expect(done.status).toBe('done');
    expect(done.note).toBe('recolored 42 px to #ff0000');
    expect(done.claimedBy).toBe('opencode');
  });

  it('defaults the claimer to "agent" and supports fail + cancel', () => {
    const store = new AssistRequestStore(tempDir());
    const a = store.create(makeCreateInput());
    expect(store.update(a.id, { status: 'claimed' }).claimedBy).toBe('agent');
    expect(store.update(a.id, { status: 'failed', note: 'no red in palette' }).status).toBe('failed');
    const b = store.create(makeCreateInput({ prompt: 'second' }));
    expect(store.update(b.id, { status: 'cancelled' }).status).toBe('cancelled');
  });

  it('rejects illegal transitions with 409, including a double claim', () => {
    const store = new AssistRequestStore(tempDir());
    const created = store.create(makeCreateInput());
    store.update(created.id, { status: 'claimed', claimedBy: 'codex' });
    expect(() => store.update(created.id, { status: 'claimed', claimedBy: 'claude' })).toThrowError(
      expect.objectContaining({ status: 409, code: 'illegal_transition' }),
    );
    expect(() => store.update(created.id, { status: 'cancelled' })).toThrowError(
      expect.objectContaining({ status: 409 }),
    );
    const pending = store.create(makeCreateInput({ prompt: 'pending one' }));
    expect(() => store.update(pending.id, { status: 'done' })).toThrowError(
      expect.objectContaining({ status: 409 }),
    );
    const done = store.create(makeCreateInput({ prompt: 'done one' }));
    store.update(done.id, { status: 'claimed' });
    store.update(done.id, { status: 'done' });
    expect(() => store.update(done.id, { status: 'claimed' })).toThrowError(
      expect.objectContaining({ status: 409 }),
    );
  });

  it('returns 404 for unknown ids and refuses unsafe ids', () => {
    const store = new AssistRequestStore(tempDir());
    expect(store.get('asr-does-not-exist')).toBeUndefined();
    expect(store.get('../sidecar')).toBeUndefined();
    expect(() => store.update('asr-does-not-exist', { status: 'claimed' })).toThrowError(
      expect.objectContaining({ status: 404, code: 'not_found' }),
    );
  });

  it('lists newest first and filters by project and status', () => {
    const store = new AssistRequestStore(tempDir());
    const a = store.create(makeCreateInput({ prompt: 'first' }));
    const b = store.create(makeCreateInput({ prompt: 'second', projectId: 'proj-2', projectName: 'Other' }));
    const c = store.create(makeCreateInput({ prompt: 'third' }));
    store.update(c.id, { status: 'claimed' });
    // Creates within one millisecond tie on createdAt: pin distinct
    // timestamps so the newest-first order is deterministic.
    const stamp = (id: string, createdAt: string): void => {
      const file = path.join(store.directory, `${id}.json`);
      const doc = JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, unknown>;
      fs.writeFileSync(file, JSON.stringify({ ...doc, createdAt }));
    };
    stamp(a.id, '2026-11-13T16:00:01.000Z');
    stamp(b.id, '2026-11-13T16:00:02.000Z');
    stamp(c.id, '2026-11-13T16:00:03.000Z');
    const all = store.list();
    expect(all.map((entry) => entry.id)).toEqual([c.id, b.id, a.id]);
    expect(store.list({ projectId: 'proj-1' }).map((entry) => entry.id)).toEqual([c.id, a.id]);
    expect(store.list({ status: 'claimed' }).map((entry) => entry.id)).toEqual([c.id]);
    expect(store.list({ projectId: 'proj-1', status: 'pending' }).map((entry) => entry.id)).toEqual([a.id]);
  });

  it('skips corrupt files on list and reads them as missing on get', () => {
    const store = new AssistRequestStore(tempDir());
    const created = store.create(makeCreateInput());
    fs.writeFileSync(path.join(store.directory, 'asr-broken.json'), '{ not json');
    fs.writeFileSync(path.join(store.directory, 'asr-wrong-shape.json'), JSON.stringify({ nope: true }));
    expect(store.get('asr-broken')).toBeUndefined();
    expect(store.list().map((entry) => entry.id)).toEqual([created.id]);
  });
});

describe('assist sidecar routes', () => {
  it('submits (201), lists, gets, and patches through HTTP', async () => {
    const dir = tempDir();
    writeProjectDoc(dir, 'pearl.dogsprite', 'proj-1');
    const base = await startServer(dir);

    const submitted = await fetch(`${base}/assist-requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(makeCreateInput()),
    });
    expect(submitted.status).toBe(201);
    const { id, status } = (await submitted.json()) as { id: string; status: string };
    expect(id).toMatch(/^asr-/);
    expect(status).toBe('pending');

    const listed = (await (await fetch(`${base}/assist-requests?projectId=proj-1`)).json()) as {
      requests: Array<{ id: string }>;
    };
    expect(listed.requests.map((entry) => entry.id)).toEqual([id]);

    const fetched = await (await fetch(`${base}/assist-requests/${id}`)).json() as {
      prompt: string;
      status: string;
    };
    expect(fetched.prompt).toBe('make this circle red');
    expect(fetched.status).toBe('pending');

    const claimed = await fetch(`${base}/assist-requests/${id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: 'claimed', claimedBy: 'codex' }),
    });
    expect(claimed.status).toBe(200);
    expect(((await claimed.json()) as { claimedBy: string }).claimedBy).toBe('codex');
  });

  it('rejects unknown projects, bad bodies, and illegal transitions over HTTP', async () => {
    const dir = tempDir();
    writeProjectDoc(dir, 'pearl.dogsprite', 'proj-1');
    const base = await startServer(dir);

    const unknownProject = await fetch(`${base}/assist-requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(makeCreateInput({ projectId: 'nope' })),
    });
    expect(unknownProject.status).toBe(400);
    expect(((await unknownProject.json()) as { code: string }).code).toBe('unknown_project');

    const badTarget = await fetch(`${base}/assist-requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(makeCreateInput({ target: { kind: 'rect', rect: { x: 0, y: 0, w: 0, h: 1 } } })),
    });
    expect(badTarget.status).toBe(400);

    const badStatus = await fetch(`${base}/assist-requests?status=bogus`);
    expect(badStatus.status).toBe(400);

    const missing = await fetch(`${base}/assist-requests/asr-nope`);
    expect(missing.status).toBe(404);

    const { id } = (await (
      await fetch(`${base}/assist-requests`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(makeCreateInput()),
      })
    ).json()) as { id: string };

    const doubleClaim = async () =>
      fetch(`${base}/assist-requests/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: 'claimed', claimedBy: 'x' }),
      });
    expect((await doubleClaim()).status).toBe(200);
    const second = await doubleClaim();
    expect(second.status).toBe(409);
    expect(((await second.json()) as { code: string }).code).toBe('illegal_transition');
  });
});
