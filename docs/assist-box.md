# AI assist box

The in-editor AI assist loop: drop a pin or select a region, type a small
prompt ("make this circle red", "add a white aura"), an agent applies it via
the MCP tools, and the result appears on canvas through the disk sync (see
`docs/disk-sync.md`).

## V1 boundary

V1 is the **request queue + UI + agent tools**. There is NO auto-daemon: a
human (Gui, or Kairo in a CLI session) tells their agent
(OpenCode/Codex/Claude) to work the queue. A watcher that spawns the agent
automatically is v2 — the request files are designed so a daemon can
consume them later (one JSON file per request, durable, inspectable).

## The flow

1. The user opens the AI panel → **Assist** section: a text input for the
   prompt + a target picker (Pin / Region / Whole frame) + read-only
   context (active frame id, active layer id).
2. Target picking is a one-shot pick mode armed from the panel:
   `useAIStore.pickMode` is `'pin' | 'rect' | null`. The canvas pointer
   handlers check pick mode first: pin = one click → a point; rect = drag
   → a pixel rect (clamped to canvas, drawn with the draft marquee). After
   a pick the mode disarms and the panel shows the target ("Pin at (12, 8)"
   / "Region 10×10 at (4, 6)"). Esc cancels the pick. The pick mode is
   self-contained — it does not use the select tool's `selectionRectRef`.
3. Submit: the editor builds an AssistRequest (prompt + target + context +
   mask) and POSTs it to the sidecar (`POST /assist-requests`). On success
   the panel shows status `pending`. If the sidecar is down, the panel
   shows a clear error ("Start the MCP server with GUILE_PIX_SIDECAR=1") —
   no silent failure, no download fallback.
4. The editor polls the request status every 2 s while it is `pending` or
   `claimed` (`useAssistPolling`, same cadence as the disk-sync tick). On
   mount it re-attaches to any outstanding request for the active project.
5. The agent (any MCP client) lists the queue, claims one, loads the
   project, applies the edit with the existing tools, saves, then marks it
   done (see "Agent flow" below).
6. The agent's save lands on disk → the disk sync auto-reloads the editor
   (clean) or raises the banner (dirty). The panel shows `done` + the
   agent's note. "New request" resets the form. The panel keeps a small
   history (last 5 requests for the project; click one to re-attach and
   read its note).

One request at a time in the panel: submit is disabled while a request is
outstanding. The queue itself accepts many — the agent works them in order.

## Request schema (v1)

```json
{
  "id": "asr-<uuid>",
  "version": 1,
  "projectId": "proj-1",
  "projectName": "Pearl Knight",
  "createdAt": "2026-11-13T16:00:00.000Z",
  "status": "pending",
  "prompt": "make this circle red",
  "target": { "kind": "pin", "point": { "x": 12, "y": 8 } },
  "context": { "frameId": "frame-0", "layerId": "layer-1", "width": 24, "height": 54, "revision": 4 },
  "mask": { "runs": [{ "y": 8, "xStart": 12, "xEnd": 12 }] },
  "claimedBy": null,
  "note": null
}
```

- `target.kind`: `pin` (point) | `rect` (`rect: {x, y, w, h}`) | `frame`
  (whole active frame, no point/rect).
- `mask` uses the MCP `mask` schema (`runs: [{y, xStart, xEnd}]`, inclusive)
  so the agent can pass it straight to `define_mask`/`apply_mask`/
  `transform_region`. Rect → full-rect runs (every row). Pin → a single
  1px run; the agent may expand it (e.g. flood fill from the point) and
  define its own mask. Frame → full-canvas runs.
- `status`: `pending` → `claimed` → `done` | `failed`. `cancelled` by the
  editor (only from `pending`). Terminal states are final; any other
  transition is rejected (400 on the store, 409 over HTTP/MCP).
- `note` holds the completion note ("recolored 42 px to #ff0000") or, on
  `failed`, the failure reason.
- No pixel snapshots in v1: the agent loads the project via MCP and
  inspects it with the existing tools. Requests stay small.

## Storage

One JSON file per request in `<outputDir>/assist-requests/<id>.json`,
written atomically (temp file + rename). The file store lives in ONE
shared module, `mcp-server/src/assistRequests.ts`, imported by both the
sidecar and the MCP server — no duplicated read/write logic. Corrupt files
are skipped on list and read as missing on get; request ids are validated
(`asr-` + alphanumerics/dashes) so ids from the URL can never escape the
directory.

## Sidecar endpoints (same localhost binding and CORS as the sync routes)

| Route | Notes |
|---|---|
| `POST /assist-requests` | Body = AssistRequest minus `id`/`createdAt`/`status` (server assigns `id`, `createdAt`, `status: pending`). Validates with zod. 201 `{ id, status }`. 400 on invalid body / unknown project id (must match a known `.dogsprite` in the output dir). |
| `GET /assist-requests?projectId=&status=` | List, newest first. 400 on an unknown `status` value. |
| `GET /assist-requests/:id` | One request. 404 if unknown. |
| `PATCH /assist-requests/:id` | Body `{ status, claimedBy?, note? }`; only legal transitions. 409 on an illegal transition, 404 if unknown. |

Bodies are capped at 1 MiB. No new origins: the CSP already allows the
sidecar origin.

## MCP tools

| Tool | Args | Notes |
|---|---|---|
| `list_assist_requests` | `{ projectId?, status? }` | → `{ ok, requests }`, newest first. |
| `claim_assist_request` | `{ requestId, agent? }` | 409 if already claimed/done. `agent` is a free string ("opencode", "codex", "claude", …); defaults to `"agent"`. |
| `complete_assist_request` | `{ requestId, note? }` | → `done`. The note should say what changed. |
| `fail_assist_request` | `{ requestId, reason }` | → `failed`; the reason is stored as the note. |
| `cancel_assist_request` | `{ requestId }` | → `cancelled` (pending only; the editor uses PATCH). |

Error results carry `code` `NOT_FOUND` / `ILLEGAL_TRANSITION` /
`VALIDATION_FAILED` plus a `correctiveAction`.

## Agent flow

```
list_assist_requests            (find a pending request for the project)
claim_assist_request            (only work requests you claimed)
load_project                    (load the .dogsprite from the output dir)
define_mask / apply_mask / transform_region / set_pixels
                                (apply the edit; the request's mask is
                                ready to pass to define_mask as-is)
save_project (overwrite: true)  (lands on disk; the disk sync reloads
                                the editor)
complete_assist_request         (with a note saying what changed)
```

The flow is also in `PIXEL_ART_INSTRUCTIONS` (step 9) so any MCP client
picks it up at connect time. Rules: only work requests you claimed; never
edit the request files directly; if the edit cannot be done, fail the
request with a reason instead of leaving it claimed.

## Editor pieces

- `src/types/ai.ts` — `AssistTarget`, `AssistRequest`, `AssistStatus`
  (mirrors the MCP zod schemas).
- `src/lib/ai/assistMask.ts` — pure mask builder (pin/rect/frame → runs,
  clamped to canvas; empty rect rejected). Unit-tested.
- `src/lib/diskSync/assistClient.ts` — `submitAssistRequest`,
  `listAssistRequests`, `getAssistRequest`, `patchAssistRequest` (same
  base URL/timeout/error conventions as `sidecarClient.ts`). Unit-tested
  against a mocked fetch.
- `src/stores/useAIStore.ts` — assist slice, separate from the generation
  state machine: `pickMode`, `pickedTarget`, `activeRequest`, `history`,
  actions to arm/cancel pick, set target, submit, poll, re-attach,
  cancel, reset. `reset()` (document load/tab switch) drops the
  canvas-tied pick state but keeps the queue state.
- `src/hooks/useAssistPolling.ts` — 2 s poll while pending/claimed,
  re-attach on mount and on project change. Mounted in `EditorShell`
  next to `useDiskSync`.
- `src/components/ai/AIPanel.tsx` — the Assist section (always visible,
  below the generation sections).
- `src/components/canvas/CanvasViewport.tsx` — pick-mode handling in the
  pointer handlers + Esc + draft marquee. Normal tool behavior is
  unchanged when pick mode is off.

## Manual test steps

1. Start the MCP server with the sidecar:
   `GUILE_PIX_SIDECAR=1 GUILE_PIX_OUTPUT_DIR=<dir> node mcp-server/dist/index.js`
   (the output dir must contain a `.dogsprite` for the project).
2. Open the editor, load that project, open the AI panel → Assist.
3. Click **Pin**, click the canvas (a pin readout appears), type a prompt,
   submit. The panel shows `pending`; a file appears in
   `<dir>/assist-requests/`.
4. From any MCP client (or curl): list the queue, claim the request.
   The panel shows `claimed` (+ agent name) within ~2 s.
5. Load the project in the MCP client, apply an edit with the mask tools,
   save with `overwrite: true`, complete with a note. The canvas reloads
   through the disk sync and the panel shows `done` + the note.
6. Submit another request, then **Cancel** while it is pending: the
   status becomes `cancelled`. Click a history entry to re-attach.
7. With the sidecar down, submit: the panel shows the
   "Start the MCP server with GUILE_PIX_SIDECAR=1" error (no silent
   failure).

Automated coverage: `tests/unit/assistRequests.test.ts` (store + HTTP),
`tests/unit/assistMask.test.ts`, `tests/unit/assistClient.test.ts`.
