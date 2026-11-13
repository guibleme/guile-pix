/**
 * Local HTTP sidecar for the disk <-> editor sync loop.
 *
 * The MCP server speaks stdio, which a browser cannot reach. This sidecar runs
 * in the same process and exposes a read-only view of the .dogsprite files in
 * the MCP output directory so the editor can notice agent saves:
 *
 *   GET /health                  -> { ok, service, version }
 *   GET /projects                -> { projects: [{ id, name, fileName, revision, mtimeMs, sha256 }] }
 *   GET /projects/:id/revision   -> { projectId, revision, mtimeMs, sha256, fileName }
 *   GET /projects/:id/file       -> the raw .dogsprite bytes (application/json)
 *
 * Identity: a project is addressed by its document id (`document.project.id`),
 * which the editor preserves when it loads and saves v2 documents. If several
 * files carry the same project id, the most recently modified one wins.
 *
 * Safety notes:
 * - Binds 127.0.0.1 only; the editor runs on the same machine.
 * - Project ids are map keys, never interpolated into a filesystem path.
 * - Only top-level *.dogsprite files inside the output directory are indexed.
 * - All logging goes to stderr: stdout is the MCP stdio channel.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { createHash } from 'node:crypto';
import * as http from 'node:http';
import { getOutputDir } from './outputDir.js';

export const SIDECAR_VERSION = '1.0.0';
export const SIDECAR_DEFAULT_PORT = 3101;
export const SIDECAR_DEFAULT_HOST = '127.0.0.1';

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
  const body = JSON.stringify(payload);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'content-length': Buffer.byteLength(body) });
  res.end(body);
}

function sendError(res: http.ServerResponse, status: number, code: string, message: string): void {
  sendJson(res, status, { ok: false, code, message });
}

export function createSidecarServer(options: SidecarOptions = {}): http.Server {
  const index = new ProjectDiskIndex(options.outputDir);

  const server = http.createServer((req, res) => {
    const origin = req.headers.origin;
    if (isLocalhostOrigin(origin)) {
      res.setHeader('access-control-allow-origin', origin as string);
      res.setHeader('access-control-allow-methods', 'GET, POST, OPTIONS');
      res.setHeader('access-control-allow-headers', 'content-type');
      res.setHeader('vary', 'Origin');
    }
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

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
    }

    sendError(res, 404, 'not_found', `No route for ${req.method ?? '?'} ${url.pathname}`);
  });

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
