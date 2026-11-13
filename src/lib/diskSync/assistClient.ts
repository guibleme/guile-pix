/**
 * Fetch client for the assist-request sidecar routes (see
 * mcp-server/src/sidecar.ts and docs/assist-box.md). Same localhost base
 * URL, timeout, and error conventions as the disk-sync client.
 */
import { SIDECAR_BASE_URL, SidecarHttpError } from './sidecarClient';
import type { AssistRequest, AssistRequestCreateInput, AssistStatus } from '@/types/ai';

const REQUEST_TIMEOUT_MS = 2000;

async function assistFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${SIDECAR_BASE_URL}${path}`, {
    ...init,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

async function throwFromResponse(response: Response, fallback: string): Promise<never> {
  let code = 'assist_failed';
  let message = fallback;
  try {
    const payload = (await response.json()) as { code?: unknown; message?: unknown };
    if (typeof payload.code === 'string') code = payload.code;
    if (typeof payload.message === 'string') message = payload.message;
  } catch {
    // Fall back to the generic message above.
  }
  throw new SidecarHttpError(response.status, code, message);
}

/** Submit a request. The server assigns id/createdAt/status. 201 { id, status }. */
export async function submitAssistRequest(
  input: AssistRequestCreateInput,
): Promise<{ id: string; status: AssistStatus }> {
  const response = await assistFetch('/assist-requests', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    await throwFromResponse(response, `Assist submit failed: HTTP ${response.status}`);
  }
  return (await response.json()) as { id: string; status: AssistStatus };
}

/** List requests, newest first. Filter by project and/or status. */
export async function listAssistRequests(filter?: {
  projectId?: string;
  status?: AssistStatus;
}): Promise<AssistRequest[]> {
  const params = new URLSearchParams();
  if (filter?.projectId) params.set('projectId', filter.projectId);
  if (filter?.status) params.set('status', filter.status);
  const query = params.toString();
  const response = await assistFetch(`/assist-requests${query ? `?${query}` : ''}`);
  if (!response.ok) {
    await throwFromResponse(response, `Assist list failed: HTTP ${response.status}`);
  }
  const payload = (await response.json()) as { requests?: unknown };
  if (!Array.isArray(payload.requests)) {
    throw new Error('Sidecar /assist-requests returned an unexpected payload');
  }
  return payload.requests as AssistRequest[];
}

/** One request, or null when it does not exist (404). */
export async function getAssistRequest(id: string): Promise<AssistRequest | null> {
  const response = await assistFetch(`/assist-requests/${encodeURIComponent(id)}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    await throwFromResponse(response, `Assist fetch failed: HTTP ${response.status}`);
  }
  return (await response.json()) as AssistRequest;
}

/** Status transition. Throws SidecarHttpError 409 on an illegal transition. */
export async function patchAssistRequest(
  id: string,
  patch: { status: AssistStatus; claimedBy?: string; note?: string },
): Promise<AssistRequest> {
  const response = await assistFetch(`/assist-requests/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!response.ok) {
    await throwFromResponse(response, `Assist update failed: HTTP ${response.status}`);
  }
  return (await response.json()) as AssistRequest;
}
