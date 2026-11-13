import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getAssistRequest,
  listAssistRequests,
  patchAssistRequest,
  submitAssistRequest,
} from '@/lib/diskSync/assistClient';
import { SidecarHttpError } from '@/lib/diskSync/sidecarClient';
import type { AssistRequest, AssistRequestCreateInput } from '@/types/ai';

const fetchMock = vi.fn();

afterEach(() => {
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

function mockFetchOnce(status: number, payload: unknown): void {
  fetchMock.mockResolvedValueOnce(
    new Response(JSON.stringify(payload), {
      status,
      headers: { 'content-type': 'application/json' },
    }),
  );
  vi.stubGlobal('fetch', fetchMock);
}

function makeInput(overrides: Partial<AssistRequestCreateInput> = {}): AssistRequestCreateInput {
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

function makeRequest(overrides: Partial<AssistRequest> = {}): AssistRequest {
  return {
    id: 'asr-1',
    version: 1,
    projectId: 'proj-1',
    projectName: 'Pearl Knight',
    createdAt: '2026-11-13T16:00:00.000Z',
    status: 'pending',
    prompt: 'make this circle red',
    target: { kind: 'pin', point: { x: 12, y: 8 } },
    context: { frameId: 'frame-0', layerId: 'layer-1', width: 24, height: 54, revision: 4 },
    mask: { runs: [{ y: 8, xStart: 12, xEnd: 12 }] },
    claimedBy: null,
    note: null,
    ...overrides,
  };
}

describe('assistClient', () => {
  it('submits a request and returns the server-assigned id and status', async () => {
    mockFetchOnce(201, { id: 'asr-1', status: 'pending' });
    const result = await submitAssistRequest(makeInput());
    expect(result).toEqual({ id: 'asr-1', status: 'pending' });
    expect(fetchMock).toHaveBeenCalledWith(
      'http://127.0.0.1:3101/assist-requests',
      expect.objectContaining({ method: 'POST' }),
    );
    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string) as AssistRequestCreateInput;
    expect(body.prompt).toBe('make this circle red');
    expect(body.target).toEqual({ kind: 'pin', point: { x: 12, y: 8 } });
  });

  it('throws SidecarHttpError with the server code/message on a failed submit', async () => {
    mockFetchOnce(400, { ok: false, code: 'unknown_project', message: 'No .dogsprite file for project "nope"' });
    await expect(submitAssistRequest(makeInput({ projectId: 'nope' }))).rejects.toMatchObject({
      status: 400,
      code: 'unknown_project',
    } satisfies Partial<SidecarHttpError>);
  });

  it('lists requests with project/status filters in the query string', async () => {
    mockFetchOnce(200, { requests: [makeRequest()] });
    const requests = await listAssistRequests({ projectId: 'proj-1', status: 'pending' });
    expect(requests).toHaveLength(1);
    expect(requests[0].id).toBe('asr-1');
    expect(fetchMock).toHaveBeenCalledWith(
      'http://127.0.0.1:3101/assist-requests?projectId=proj-1&status=pending',
      expect.anything(),
    );
  });

  it('rejects a malformed list payload', async () => {
    mockFetchOnce(200, { requests: 'not-an-array' });
    await expect(listAssistRequests()).rejects.toThrow('unexpected payload');
  });

  it('gets one request and returns null on 404', async () => {
    mockFetchOnce(200, makeRequest({ status: 'claimed', claimedBy: 'opencode' }));
    const found = await getAssistRequest('asr-1');
    expect(found?.claimedBy).toBe('opencode');
    mockFetchOnce(404, { ok: false, code: 'not_found', message: 'No assist request "asr-nope"' });
    expect(await getAssistRequest('asr-nope')).toBeNull();
  });

  it('patches a request and surfaces a 409 as SidecarHttpError', async () => {
    mockFetchOnce(200, makeRequest({ status: 'cancelled' }));
    const cancelled = await patchAssistRequest('asr-1', { status: 'cancelled' });
    expect(cancelled.status).toBe('cancelled');
    expect(fetchMock).toHaveBeenCalledWith(
      'http://127.0.0.1:3101/assist-requests/asr-1',
      expect.objectContaining({ method: 'PATCH' }),
    );

    mockFetchOnce(409, { ok: false, code: 'illegal_transition', message: 'Cannot move assist request' });
    await expect(patchAssistRequest('asr-1', { status: 'claimed' })).rejects.toMatchObject({
      status: 409,
      code: 'illegal_transition',
    } satisfies Partial<SidecarHttpError>);
  });
});
