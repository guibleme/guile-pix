/**
 * Minimal fetch client for the guile-pix sync sidecar (see mcp-server/src/sidecar.ts).
 * The sidecar runs on the same machine as the editor; the base URL is overridable
 * at build time via NEXT_PUBLIC_GUILE_PIX_SIDECAR_URL.
 */

export const SIDECAR_BASE_URL =
  process.env.NEXT_PUBLIC_GUILE_PIX_SIDECAR_URL ?? 'http://127.0.0.1:3101';

const REQUEST_TIMEOUT_MS = 2000;

export interface SidecarProjectEntry {
  id: string;
  name: string;
  fileName: string;
  revision: number;
  mtimeMs: number;
  sha256: string;
}

export interface SidecarRevision {
  projectId: string;
  revision: number;
  mtimeMs: number;
  sha256: string;
  fileName: string;
}

export interface LastSeenDiskState {
  revision: number;
  sha256: string;
}

/**
 * The disk version counts as "new" when either the revision or the content hash
 * moved. Revision alone is not enough: the editor preserves the revision it
 * loaded when it saves, so a same-revision content change is possible.
 */
export function hasRemoteChange(
  lastSeen: LastSeenDiskState | undefined,
  remote: LastSeenDiskState,
): boolean {
  if (!lastSeen) return true;
  return lastSeen.revision !== remote.revision || lastSeen.sha256 !== remote.sha256;
}

async function sidecarFetch(path: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(`${SIDECAR_BASE_URL}${path}`, {
    ...init,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  return response;
}

export async function listSidecarProjects(): Promise<SidecarProjectEntry[]> {
  const response = await sidecarFetch('/projects');
  if (!response.ok) throw new Error(`Sidecar /projects failed: HTTP ${response.status}`);
  const payload = (await response.json()) as { projects?: unknown };
  if (!Array.isArray(payload.projects)) throw new Error('Sidecar /projects returned an unexpected payload');
  return payload.projects as SidecarProjectEntry[];
}

export async function getSidecarRevision(projectId: string): Promise<SidecarRevision | null> {
  const response = await sidecarFetch(`/projects/${encodeURIComponent(projectId)}/revision`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Sidecar revision check failed: HTTP ${response.status}`);
  return (await response.json()) as SidecarRevision;
}

export async function fetchSidecarProjectFile(projectId: string): Promise<unknown> {
  const response = await sidecarFetch(`/projects/${encodeURIComponent(projectId)}/file`);
  if (response.status === 404) throw new Error(`Project "${projectId}" is not on disk anymore`);
  if (!response.ok) throw new Error(`Sidecar file fetch failed: HTTP ${response.status}`);
  return (await response.json()) as unknown;
}
