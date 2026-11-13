/**
 * Local HTTP sidecar for the disk <-> editor sync loop.
 *
 * The MCP server speaks stdio, which a browser cannot reach. This sidecar runs
 * in the same process and exposes the .dogsprite files in the MCP output
 * directory so the editor can notice agent saves (V1) and save back to disk
 * (V2):
 *
 *   GET  /health                  -> { ok, service, version }
 *   GET  /projects                -> { projects: [{ id, name, fileName, revision, mtimeMs, sha256 }] }
 *   GET  /projects/:id/revision   -> { projectId, revision, mtimeMs, sha256, fileName }
 *   GET  /projects/:id/file       -> the raw .dogsprite bytes (application/json)
 *   GET  /projects/:id/events     -> SSE stream of `revision` events (+ :heartbeat every 20 s)
 *   POST /projects/:id/file       -> validate + atomically write a v2 .dogsprite,
 *                                    refresh the bridge session, notify subscribers
 *   POST /assist-requests         -> submit an AI assist request (201 { id, status })
 *   GET  /assist-requests         -> list requests (?projectId=&status=, newest first)
 *   GET  /assist-requests/:id     -> one request
 *   PATCH /assist-requests/:id    -> status transition ({ status, claimedBy?, note? });
 *                                    409 on an illegal transition
 *
 * Assist requests are JSON files in <outputDir>/assist-requests/ (see
 * assistRequests.ts, shared with the MCP tools). The editor submits; the
 * agent lists/claims/completes via MCP; the agent's save lands on disk
 * where the sync loop picks it up.
 *
 * Identity: a project is addressed by its document id (`document.project.id`),
 * which the editor preserves when it loads and saves v2 documents. If several
 * files carry the same project id, the most recently modified one wins.
 *
 * Safety notes:
 * - Binds 127.0.0.1 only; the editor runs on the same machine.
 * - Project ids are map keys, never interpolated into a filesystem path.
 * - Only top-level *.dogsprite files inside the output directory are indexed.
 * - POST bodies are capped at 64 MiB and must be valid v2 documents.
 * - A POST is rejected with 409 STALE_REVISION when the bridge holds newer
 *   unsaved work for the same project (its in-memory revision is higher).
 * - All logging goes to stderr: stdout is the MCP stdio channel.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import * as http from 'node:http';
import { deserializeDocumentV2 } from '@guile-pix/sprite-core';
import { AnimationBridge, safeName } from './animationBridge.js';
import { getOutputDir } from './outputDir.js';
import {
  AssistRequestError,
  AssistRequestStore,
  assistRequestCreateSchema,
  assistRequestPatchSchema,
  assistStatusSchema,
  type AssistStatus,
} from './assistRequests.js';

export const SIDECAR_VERSION = '2.1.0';
export const SIDECAR_DEFAULT_PORT = 3101;
export const SIDECAR_DEFAULT_HOST = '127.0.0.1';
export const SIDECAR_MAX_BODY_BYTES = 64 * 1024 * 1024;
export const ASSIST_MAX_BODY_BYTES = 1024 * 1024;
const HEARTBEAT_MS = 20_000;
const WATCH_DEBOUNCE_MS = 100;
const RESCAN_MS = 5_000;

export interface SidecarProjectEntry {
  id: string;
  name: string;
  fileName: string;
  revision: number;
  mtimeMs: number;
  sha256: string;
}

export interface SidecarOptions {
  outputDir?: string;
  port?: number;
  host?: string;
  /**
   * The bridge this sidecar shares a process with. When present, POST refreshes
   * the bridge session from the written file and rejects saves that would
   * clobber newer unsaved agent work. When absent, POST is disk-only.
   */
  bridge?: AnimationBridge;
}

interface CachedFile {
  mtimeMs: number;
  size: number;
  entry: SidecarProjectEntry | null;
}

function sha256Hex(bytes: Buffer): string {
  return createHash('sha256').update(bytes).digest('hex');
}

function safeJsonProject(bytes: Buffer): { id: string; name: string; revision: number } | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(bytes.toString('utf8'));
  } catch {
    return null;
  }
  if (typeof parsed !== 'object' || parsed === null) return null;
  const doc = parsed as Record<string, unknown>;
  if (doc.version !== 2) return null;
  const project = doc.project;
  if (typeof project !== 'object' || project === null) return null;
  const { id, name } = project as Record<string, unknown>;
  if (typeof id !== 'string' || id.length === 0) return null;
  if (typeof name !== 'string' || name.length === 0) return null;
  if (typeof doc.revision !== 'number' || !Number.isInteger(doc.revision) || doc.revision < 0) return null;
  return { id, name, revision: doc.revision };
}

/** Scans the output directory for .dogsprite files, re-parsing only changed ones. */
export class ProjectDiskIndex {
  private readonly dir: string;
  private readonly cache = new Map<string, CachedFile>();

  constructor(outputDir?: string) {
    this.dir = path.resolve(outputDir ?? getOutputDir());
  }

  get directory(): string {
    return this.dir;
  }

  list(): SidecarProjectEntry[] {
    let fileNames: string[];
    try {
      fileNames = fs.readdirSync(this.dir);
    } catch {
      return [];
    }
    const byId = new Map<string, SidecarProjectEntry>();
    const seen = new Set<string>();
    for (const fileName of fileNames) {
      if (!fileName.toLowerCase().endsWith('.dogsprite')) continue;
      seen.add(fileName);
      const fullPath = path.join(this.dir, fileName);
      let stat: fs.Stats;
      try {
        stat = fs.statSync(fullPath);
      } catch {
        continue;
      }
      if (!stat.isFile()) continue;
      const cached = this.cache.get(fileName);
      if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) {
        if (cached.entry) this.keepNewest(byId, cached.entry);
        continue;
      }
      let entry: SidecarProjectEntry | null = null;
      try {
        const bytes = fs.readFileSync(fullPath);
        const parsed = safeJsonProject(bytes);
        if (parsed) {
          entry = {
            id: parsed.id,
            name: parsed.name,
            fileName,
            revision: parsed.revision,
            mtimeMs: stat.mtimeMs,
            sha256: sha256Hex(bytes),
          };
        }
      } catch {
        entry = null;
      }
      this.cache.set(fileName, { mtimeMs: stat.mtimeMs, size: stat.size, entry });
      if (entry) this.keepNewest(byId, entry);
    }
    for (const fileName of [...this.cache.keys()]) {
      if (!seen.has(fileName)) this.cache.delete(fileName);
    }
    return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  get(projectId: string): SidecarProjectEntry | undefined {
    return this.list().find((entry) => entry.id === projectId);
  }

  readFile(entry: SidecarProjectEntry): Buffer {
    return fs.readFileSync(path.join(this.dir, entry.fileName));
  }

  private keepNewest(byId: Map<string, SidecarProjectEntry>, entry: SidecarProjectEntry): void {
    const existing = byId.get(entry.id);
    if (!existing || entry.mtimeMs >= existing.mtimeMs) byId.set(entry.id, entry);
  }
}

/** Fan-out for SSE revision events, keyed by project id. */
class RevisionEventHub {
  private readonly subscribers = new Map<string, Set<http.ServerResponse>>();

  subscribe(projectId: string, res: http.ServerResponse): void {
    let set = this.subscribers.get(projectId);
    if (!set) {
      set = new Set();
      this.subscribers.set(projectId, set);
    }
    set.add(res);
  }

  unsubscribe(projectId: string, res: http.ServerResponse): void {
    const set = this.subscribers.get(projectId);
    if (!set) return;
    set.delete(res);
    if (set.size === 0) this.subscribers.delete(projectId);
  }

  notify(entry: SidecarProjectEntry): void {
    const set = this.subscribers.get(entry.id);
    if (!set || set.size === 0) return;
    const payload = `event: revision\ndata: ${JSON.stringify({ projectId: entry.id, revision: entry.revision, sha256: entry.sha256, mtimeMs: entry.mtimeMs, fileName: entry.fileName })}\n\n`;
    for (const res of [...set]) {
      if (res.writableEnded) {
        set.delete(res);
        continue;
      }
      res.write(payload);
    }
    if (set.size === 0) this.subscribers.delete(entry.id);
  }

  close(): void {
    for (const set of this.subscribers.values()) {
      for (const res of set) {
        if (!res.writableEnded) res.end();
      }
    }
    this.subscribers.clear();
  }
}

interface SidecarInternals {
  index: ProjectDiskIndex;
  hub: RevisionEventHub;
  watcher: fs.FSWatcher | null;
  rescanTimer: NodeJS.Timeout | null;
}

const internalsByServer = new WeakMap<http.Server, SidecarInternals>();

export async function closeSidecarServer(server: http.Server): Promise<void> {
  const internals = internalsByServer.get(server);
  if (internals) {
    internals.watcher?.close();
    if (internals.rescanTimer) clearInterval(internals.rescanTimer);
    internals.hub.close();
    internalsByServer.delete(server);
  }
  if (!server.listening) return;
  await new Promise<void>((resolve) => server.close(() => resolve()));
}

function isLocalhostOrigin(origin: string | undefined): boolean {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    return url.protocol === 'http:' && (url.hostname === 'localhost' || url.hostname === '127.0.0.1');
  } catch {
    return false;
  }
}

function sendJson(res: http.ServerResponse, status: number, payload: unknown): void {
  if (res.writableEnded || res.headersSent) return;
  const body = JSON.stringify(payload);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'content-length': Buffer.byteLength(body) });
  res.end(body);
}

function sendError(res: http.ServerResponse, status: number, code: string, message: string, extra?: Record<string, unknown>): void {
  sendJson(res, status, { ok: false, code, message, ...extra });
}

async function readBody(req: http.IncomingMessage, maxBytes: number): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let total = 0;
  for await (const chunk of req) {
    const buffer = chunk as Buffer;
    total += buffer.length;
    if (total > maxBytes) {
      const error = new Error('Request body too large') as Error & { code?: string };
      error.code = 'BODY_TOO_LARGE';
      throw error;
    }
    chunks.push(buffer);
  }
  return Buffer.concat(chunks);
}

/** Reads a JSON body for the small assist routes. Returns null after sending the error. */
async function readJsonBody(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  maxBytes: number,
): Promise<unknown | null> {
  let body: Buffer;
  try {
    body = await readBody(req, maxBytes);
  } catch (error) {
    if ((error as Error & { code?: string }).code === 'BODY_TOO_LARGE') {
      sendError(res, 413, 'body_too_large', `Request body exceeds ${maxBytes} bytes`);
      return null;
    }
    sendError(res, 400, 'bad_request', `Could not read request body: ${(error as Error).message}`);
    return null;
  }
  try {
    return JSON.parse(body.toString('utf8')) as unknown;
  } catch {
    sendError(res, 400, 'invalid_json', 'Request body is not valid JSON');
    return null;
  }
}

export function createSidecarServer(options: SidecarOptions = {}): http.Server {
  const index = new ProjectDiskIndex(options.outputDir);
  const assistStore = new AssistRequestStore(options.outputDir);
  const hub = new RevisionEventHub();
  const lastEmitted = new Map<string, { revision: number; sha256: string }>();
  const bridge = options.bridge;

  const rescanAndNotify = (): void => {
    for (const entry of index.list()) {
      const previous = lastEmitted.get(entry.id);
      if (previous && previous.revision === entry.revision && previous.sha256 === entry.sha256) continue;
      lastEmitted.set(entry.id, { revision: entry.revision, sha256: entry.sha256 });
      hub.notify(entry);
    }
  };

  let watcher: fs.FSWatcher | null = null;
  try {
    fs.mkdirSync(index.directory, { recursive: true });
    let debounce: NodeJS.Timeout | null = null;
    watcher = fs.watch(index.directory, (eventType, fileName) => {
      if (typeof fileName === 'string' && !fileName.toLowerCase().endsWith('.dogsprite')) return;
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(rescanAndNotify, WATCH_DEBOUNCE_MS);
    });
    watcher.on('error', (error) => {
      console.error('Guile Pix sync sidecar watcher failed (periodic rescan continues):', error);
    });
  } catch (error) {
    console.error('Guile Pix sync sidecar could not watch the output directory (periodic rescan continues):', error);
  }
  // Safety net for missed watch events (fs.watch is best-effort).
  const rescanTimer = setInterval(rescanAndNotify, RESCAN_MS);
  rescanTimer.unref();

  const handlePostFile = async (req: http.IncomingMessage, res: http.ServerResponse, projectId: string): Promise<void> => {
    let body: Buffer;
    try {
      body = await readBody(req, SIDECAR_MAX_BODY_BYTES);
    } catch (error) {
      if ((error as Error & { code?: string }).code === 'BODY_TOO_LARGE') {
        sendError(res, 413, 'body_too_large', `Project body exceeds ${SIDECAR_MAX_BODY_BYTES} bytes`);
        return;
      }
      sendError(res, 400, 'bad_request', `Could not read request body: ${(error as Error).message}`);
      return;
    }
    const parsed = deserializeDocumentV2(body.toString('utf8'));
    if (!parsed.ok) {
      sendError(res, 400, 'invalid_document', parsed.issues[0]?.message ?? 'Project is not a valid v2 document');
      return;
    }
    const document = parsed.value;
    if (document.project.id !== projectId) {
      sendError(res, 400, 'id_mismatch', `Document project id "${document.project.id}" does not match URL project "${projectId}"`);
      return;
    }
    const session = bridge?.getDocument(projectId);
    if (session && session.revision > document.revision) {
      sendError(res, 409, 'STALE_REVISION', `The agent holds newer unsaved work (revision ${session.revision}); reload before saving`, { currentRevision: session.revision });
      return;
    }

    const existing = index.get(projectId);
    let fileName: string;
    if (existing) {
      fileName = existing.fileName;
    } else {
      fileName = `${safeName(document.project.name)}.dogsprite`;
      const collision = path.join(index.directory, fileName);
      if (fs.existsSync(collision)) fileName = `${safeName(document.project.name)}-${safeName(projectId)}.dogsprite`;
    }
    const target = path.join(index.directory, fileName);
    const temporary = path.join(index.directory, `.${fileName}.${randomUUID()}.tmp`);
    try {
      fs.writeFileSync(temporary, body, { flag: 'wx' });
      fs.renameSync(temporary, target);
    } catch (error) {
      if (fs.existsSync(temporary)) fs.rmSync(temporary);
      sendError(res, 500, 'write_failed', `Could not write "${fileName}": ${(error as Error).message}`);
      return;
    }

    let sessionRefreshed = false;
    if (bridge) {
      try {
        const reloaded = await bridge.loadProject({ filePath: target });
        sessionRefreshed = !reloaded.isError;
      } catch {
        sessionRefreshed = false;
      }
      if (!sessionRefreshed) console.error(`Guile Pix sync sidecar: bridge session refresh failed for "${projectId}" (file was written)`);
    }

    const entry = index.get(projectId);
    if (!entry) {
      sendError(res, 500, 'write_failed', 'File was written but could not be re-read');
      return;
    }
    lastEmitted.set(entry.id, { revision: entry.revision, sha256: entry.sha256 });
    hub.notify(entry);
    sendJson(res, 200, { ok: true, projectId: entry.id, revision: entry.revision, sha256: entry.sha256, mtimeMs: entry.mtimeMs, fileName: entry.fileName, sessionRefreshed });
  };

  const server = http.createServer((req, res) => {
    const origin = req.headers.origin;
    if (isLocalhostOrigin(origin)) {
      res.setHeader('access-control-allow-origin', origin as string);
      res.setHeader('access-control-allow-methods', 'GET, POST, PATCH, OPTIONS');
      res.setHeader('access-control-allow-headers', 'content-type');
      res.setHeader('vary', 'Origin');
    }
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    void (async () => {
      try {
        let url: URL;
        try {
          url = new URL(req.url ?? '/', 'http://127.0.0.1');
        } catch {
          sendError(res, 400, 'bad_request', 'Malformed request URL');
          return;
        }
        const segments = url.pathname.split('/').filter((segment) => segment.length > 0);

        if (req.method === 'GET' && segments.length === 1 && segments[0] === 'health') {
          sendJson(res, 200, { ok: true, service: 'guile-pix-sidecar', version: SIDECAR_VERSION });
          return;
        }

        if (req.method === 'GET' && segments.length === 1 && segments[0] === 'projects') {
          sendJson(res, 200, { projects: index.list() });
          return;
        }

        if (req.method === 'POST' && segments.length === 1 && segments[0] === 'assist-requests') {
          const body = await readJsonBody(req, res, ASSIST_MAX_BODY_BYTES);
          if (body === null) return;
          const validated = assistRequestCreateSchema.safeParse(body);
          if (!validated.success) {
            sendError(res, 400, 'validation_failed', validated.error.issues[0]?.message ?? 'Invalid assist request');
            return;
          }
          if (!index.get(validated.data.projectId)) {
            sendError(res, 400, 'unknown_project', `No .dogsprite file for project "${validated.data.projectId}"`);
            return;
          }
          const created = assistStore.create(validated.data);
          sendJson(res, 201, { id: created.id, status: created.status });
          return;
        }

        if (req.method === 'GET' && segments.length === 1 && segments[0] === 'assist-requests') {
          const projectId = url.searchParams.get('projectId') ?? undefined;
          const statusParam = url.searchParams.get('status');
          let status: AssistStatus | undefined;
          if (statusParam !== null) {
            const parsed = assistStatusSchema.safeParse(statusParam);
            if (!parsed.success) {
              sendError(res, 400, 'validation_failed', `Unknown assist status "${statusParam}"`);
              return;
            }
            status = parsed.data;
          }
          sendJson(res, 200, { requests: assistStore.list({ projectId, status }) });
          return;
        }

        if (segments.length === 2 && segments[0] === 'assist-requests') {
          const requestId = decodeURIComponent(segments[1]);
          if (req.method === 'GET') {
            const request = assistStore.get(requestId);
            if (!request) {
              sendError(res, 404, 'not_found', `No assist request "${requestId}"`);
              return;
            }
            sendJson(res, 200, request);
            return;
          }
          if (req.method === 'PATCH') {
            const body = await readJsonBody(req, res, ASSIST_MAX_BODY_BYTES);
            if (body === null) return;
            const validated = assistRequestPatchSchema.safeParse(body);
            if (!validated.success) {
              sendError(res, 400, 'validation_failed', validated.error.issues[0]?.message ?? 'Invalid assist patch');
              return;
            }
            try {
              const updated = assistStore.update(requestId, validated.data);
              sendJson(res, 200, updated);
            } catch (error) {
              if (error instanceof AssistRequestError) {
                sendError(res, error.status, error.code, error.message);
                return;
              }
              throw error;
            }
            return;
          }
        }

        if (segments.length === 3 && segments[0] === 'projects') {
          const projectId = decodeURIComponent(segments[1]);
          const action = segments[2];
          if (req.method === 'GET' && action === 'revision') {
            const entry = index.get(projectId);
            if (!entry) {
              sendError(res, 404, 'project_not_found', `No .dogsprite file for project "${projectId}"`);
              return;
            }
            sendJson(res, 200, { projectId: entry.id, revision: entry.revision, mtimeMs: entry.mtimeMs, sha256: entry.sha256, fileName: entry.fileName });
            return;
          }
          if (req.method === 'GET' && action === 'file') {
            const entry = index.get(projectId);
            if (!entry) {
              sendError(res, 404, 'project_not_found', `No .dogsprite file for project "${projectId}"`);
              return;
            }
            let bytes: Buffer;
            try {
              bytes = index.readFile(entry);
            } catch {
              sendError(res, 500, 'read_failed', `Could not read "${entry.fileName}"`);
              return;
            }
            res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'content-length': bytes.length });
            res.end(bytes);
            return;
          }
          if (req.method === 'GET' && action === 'events') {
            const entry = index.get(projectId);
            if (!entry) {
              sendError(res, 404, 'project_not_found', `No .dogsprite file for project "${projectId}"`);
              return;
            }
            res.writeHead(200, {
              'content-type': 'text/event-stream; charset=utf-8',
              'cache-control': 'no-cache',
              connection: 'keep-alive',
            });
            const sendRevision = (state: SidecarProjectEntry): void => {
              res.write(`event: revision\ndata: ${JSON.stringify({ projectId: state.id, revision: state.revision, sha256: state.sha256, mtimeMs: state.mtimeMs, fileName: state.fileName })}\n\n`);
            };
            sendRevision(entry);
            lastEmitted.set(entry.id, { revision: entry.revision, sha256: entry.sha256 });
            hub.subscribe(projectId, res);
            const heartbeat = setInterval(() => {
              if (!res.writableEnded) res.write(':heartbeat\n\n');
            }, HEARTBEAT_MS);
            heartbeat.unref();
            req.on('close', () => {
              clearInterval(heartbeat);
              hub.unsubscribe(projectId, res);
            });
            return;
          }
          if (req.method === 'POST' && action === 'file') {
            await handlePostFile(req, res, projectId);
            return;
          }
        }

        sendError(res, 404, 'not_found', `No route for ${req.method ?? '?'} ${url.pathname}`);
      } catch (error) {
        console.error('Guile Pix sync sidecar request failed:', error);
        sendError(res, 500, 'internal_error', (error as Error).message);
      }
    })();
  });

  internalsByServer.set(server, { index, hub, watcher, rescanTimer });
  return server;
}

export async function startSidecar(options: SidecarOptions = {}): Promise<{ server: http.Server; port: number }> {
  const host = options.host ?? SIDECAR_DEFAULT_HOST;
  const port = options.port ?? SIDECAR_DEFAULT_PORT;
  const server = createSidecarServer(options);
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => {
      server.removeListener('error', reject);
      resolve();
    });
  });
  const address = server.address();
  const actualPort = typeof address === 'object' && address ? address.port : port;
  console.error(`Guile Pix sync sidecar listening on http://${host}:${actualPort}`);
  return { server, port: actualPort };
}
