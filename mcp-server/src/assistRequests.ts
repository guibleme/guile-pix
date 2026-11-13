/**
 * Assist-request queue: the file store shared by the HTTP sidecar and the
 * MCP tools. One module, no duplicated read/write logic.
 *
 * A request is one JSON file in `<outputDir>/assist-requests/<id>.json`
 * (durable, inspectable, daemon-ready for a v2 auto-daemon). The editor
 * submits (via the sidecar), the agent lists/claims/completes (via MCP
 * tools), and the agent's save lands on disk where the disk sync picks it
 * up. No pixel snapshots: the agent loads the project via MCP.
 *
 * Lifecycle: pending -> claimed -> done | failed; pending -> cancelled.
 * Terminal states are final; any other transition is rejected (409).
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { getOutputDir } from './outputDir.js';

export const ASSIST_STATUSES = ['pending', 'claimed', 'done', 'failed', 'cancelled'] as const;
export type AssistStatus = (typeof ASSIST_STATUSES)[number];

export const assistStatusSchema = z.enum(ASSIST_STATUSES);

/** Same runs shape as the MCP `mask` schema, so the agent can pass it straight to define_mask/apply_mask/transform_region. */
export const assistMaskSchema = z
  .object({
    runs: z
      .array(
        z.object({
          y: z.number().int().nonnegative(),
          xStart: z.number().int().nonnegative(),
          xEnd: z.number().int().nonnegative(),
        }),
      )
      .min(1),
  })
  .refine((mask) => mask.runs.every((run) => run.xEnd >= run.xStart), {
    message: 'mask run xEnd must be >= xStart',
  });

export const assistTargetSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('pin'),
    point: z.object({ x: z.number().int().nonnegative(), y: z.number().int().nonnegative() }),
  }),
  z.object({
    kind: z.literal('rect'),
    rect: z.object({
      x: z.number().int().nonnegative(),
      y: z.number().int().nonnegative(),
      w: z.number().int().positive(),
      h: z.number().int().positive(),
    }),
  }),
  z.object({ kind: z.literal('frame') }),
]);

export const assistContextSchema = z.object({
  frameId: z.string().min(1),
  layerId: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  revision: z.number().int().nonnegative(),
});

/** POST body: everything the editor sends; the server assigns id/createdAt/status. */
export const assistRequestCreateSchema = z.object({
  projectId: z.string().min(1),
  projectName: z.string().min(1),
  prompt: z.string().min(1).max(2000),
  target: assistTargetSchema,
  context: assistContextSchema,
  mask: assistMaskSchema,
});

export const assistRequestSchema = assistRequestCreateSchema.extend({
  id: z.string().min(1),
  version: z.literal(1),
  createdAt: z.string().min(1),
  status: assistStatusSchema,
  claimedBy: z.string().nullable(),
  note: z.string().nullable(),
});

/** PATCH body: a status transition, with the claimer and/or a note. */
export const assistRequestPatchSchema = z.object({
  status: assistStatusSchema,
  claimedBy: z.string().min(1).max(100).optional(),
  note: z.string().max(2000).optional(),
});

export type AssistTarget = z.infer<typeof assistTargetSchema>;
export type AssistRequest = z.infer<typeof assistRequestSchema>;
export type AssistRequestCreate = z.infer<typeof assistRequestCreateSchema>;
export type AssistRequestPatch = z.infer<typeof assistRequestPatchSchema>;

const LEGAL_TRANSITIONS: Record<AssistStatus, AssistStatus[]> = {
  pending: ['claimed', 'cancelled'],
  claimed: ['done', 'failed'],
  done: [],
  failed: [],
  cancelled: [],
};

/** Error with an HTTP status, so the sidecar and the MCP tools map it the same way. */
export class AssistRequestError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'AssistRequestError';
    this.status = status;
    this.code = code;
  }
}

function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? 'Invalid request';
}

export class AssistRequestStore {
  private readonly dir: string;

  constructor(outputDir?: string) {
    this.dir = path.join(path.resolve(outputDir ?? getOutputDir()), 'assist-requests');
    // The directory is created lazily on first write: constructing the store
    // (e.g. when the sidecar starts) must not touch the filesystem.
  }

  get directory(): string {
    return this.dir;
  }

  create(input: unknown): AssistRequest {
    const parsed = assistRequestCreateSchema.safeParse(input);
    if (!parsed.success) {
      throw new AssistRequestError(400, 'validation_failed', firstIssue(parsed.error));
    }
    const request: AssistRequest = {
      ...parsed.data,
      id: `asr-${randomUUID()}`,
      version: 1,
      createdAt: new Date().toISOString(),
      status: 'pending',
      claimedBy: null,
      note: null,
    };
    this.write(request);
    return request;
  }

  get(id: string): AssistRequest | undefined {
    if (!this.isSafeId(id)) return undefined;
    const file = path.join(this.dir, `${id}.json`);
    let raw: string;
    try {
      raw = fs.readFileSync(file, 'utf8');
    } catch {
      return undefined;
    }
    try {
      const parsed = assistRequestSchema.safeParse(JSON.parse(raw) as unknown);
      return parsed.success ? parsed.data : undefined;
    } catch {
      return undefined;
    }
  }

  list(filter: { projectId?: string; status?: AssistStatus } = {}): AssistRequest[] {
    let fileNames: string[];
    try {
      fileNames = fs.readdirSync(this.dir);
    } catch {
      return [];
    }
    const requests: AssistRequest[] = [];
    for (const fileName of fileNames) {
      if (!fileName.toLowerCase().endsWith('.json') || fileName.startsWith('.')) continue;
      const request = this.get(fileName.slice(0, -'.json'.length));
      if (!request) continue;
      if (filter.projectId !== undefined && request.projectId !== filter.projectId) continue;
      if (filter.status !== undefined && request.status !== filter.status) continue;
      requests.push(request);
    }
    // Newest first; id breaks createdAt ties deterministically.
    requests.sort((a, b) => {
      const byTime = b.createdAt.localeCompare(a.createdAt);
      return byTime !== 0 ? byTime : b.id.localeCompare(a.id);
    });
    return requests;
  }

  /**
   * Apply a status transition. Throws AssistRequestError 404 (unknown id)
   * or 409 (illegal transition). Claiming without a claimer records
   * 'agent'; a provided note is stored on any transition.
   */
  update(id: string, patch: AssistRequestPatch): AssistRequest {
    const current = this.get(id);
    if (!current) {
      throw new AssistRequestError(404, 'not_found', `No assist request "${id}"`);
    }
    if (!LEGAL_TRANSITIONS[current.status].includes(patch.status)) {
      throw new AssistRequestError(
        409,
        'illegal_transition',
        `Cannot move assist request "${id}" from ${current.status} to ${patch.status}`,
      );
    }
    const next: AssistRequest = {
      ...current,
      status: patch.status,
      ...(patch.status === 'claimed' ? { claimedBy: patch.claimedBy ?? 'agent' } : {}),
      ...(patch.note !== undefined ? { note: patch.note } : {}),
    };
    this.write(next);
    return next;
  }

  private isSafeId(id: string): boolean {
    return /^asr-[A-Za-z0-9-]+$/.test(id);
  }

  private write(request: AssistRequest): void {
    fs.mkdirSync(this.dir, { recursive: true });
    const target = path.join(this.dir, `${request.id}.json`);
    const temporary = path.join(this.dir, `.${request.id}.${randomUUID()}.tmp`);
    try {
      fs.writeFileSync(temporary, JSON.stringify(request, null, 2), { flag: 'wx' });
      fs.renameSync(temporary, target);
    } catch (error) {
      if (fs.existsSync(temporary)) fs.rmSync(temporary);
      throw error;
    }
  }
}
