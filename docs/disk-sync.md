# Disk ↔ editor sync (guile-pix)

How the browser editor notices agent saves, and (V2) how editor saves reach
the disk. The MCP server speaks stdio, which a browser cannot reach, so a
small HTTP sidecar runs in the same MCP process and serves the `.dogsprite`
files in the output directory on localhost.

## Running it

```bash
# 1. Build + start the MCP server with the sidecar (port 3101 by default)
cd mcp-server
npm run build
GUILE_PIX_SIDECAR=1 GUILE_PIX_SIDECAR_PORT=3101 npm start

# 2. In another terminal, run the editor (it polls the sidecar automatically)
npm run dev   # http://localhost:3000
```

Environment:

| Variable | Default | Meaning |
|---|---|---|
| `GUILE_PIX_SIDECAR` | off | Set to `1` to start the sidecar |
| `GUILE_PIX_SIDECAR_PORT` | `3101` | Sidecar listen port (127.0.0.1 only) |
| `GUILE_PIX_OUTPUT_DIR` | `mcp-server/output/` | Directory the sidecar indexes |
| `NEXT_PUBLIC_GUILE_PIX_SIDECAR_URL` | `http://127.0.0.1:3101` | Sidecar base URL, baked into the editor build |

A sidecar failure (e.g. port in use) is logged to stderr and never takes the
MCP server down. The editor works normally without a sidecar: polling just
reports `unreachable` and retries silently.

## V1 protocol (read-only sidecar)

| Route | Response |
|---|---|
| `GET /health` | `{ ok, service, version }` |
| `GET /projects` | `{ projects: [{ id, name, fileName, revision, mtimeMs, sha256 }] }` |
| `GET /projects/:id/revision` | `{ projectId, revision, mtimeMs, sha256, fileName }` (404 `project_not_found`) |
| `GET /projects/:id/file` | Raw `.dogsprite` bytes, `application/json` (404 `project_not_found`) |

## V2 protocol (push + editor save)

| Route | Response |
|---|---|
| `GET /projects/:id/events` | SSE stream of `revision` events `{ projectId, revision, sha256, mtimeMs, fileName }`, plus a `:heartbeat` comment every 20 s |
| `POST /projects/:id/file` | Body: a v2 `.dogsprite` JSON. Validates, writes atomically, refreshes the bridge session. Returns `{ ok, projectId, revision, sha256, mtimeMs, fileName, sessionRefreshed }`; 400 on invalid JSON / id mismatch, 409 `STALE_REVISION` when the bridge holds newer unsaved work |

## Identity and discovery

- A project is addressed by its document id (`document.project.id`). The editor
  preserves it when loading and saving v2 documents, so the id is stable across
  renames.
- The editor polls every 2 s (V1) for the ACTIVE document only. Without disk
  identity it runs discovery (`GET /projects`, match by project id):
  - Disk revision at or behind the revision the editor opened → baseline
    silently (`lastSeenRevision`/`lastSeenHash`).
  - Disk revision ahead → treated as a remote change (see below).
- V2 adds push: with disk identity the editor opens an EventSource to
  `/projects/:id/events`. Polling stays as the fallback — every 2 s while SSE
  is not connected, and every 10 s as a safety net while it is (fs.watch is
  best-effort; the net catches anything the stream misses).
- If several files share a project id, the most recently modified one wins.
- Disk identity lives per document in the workspace store (`diskSync`, next to
  `sourceDocumentV2`) and is deliberately NOT persisted in the workspace
  session: every session re-discovers, so agent saves that landed while the
  editor was closed are picked up.

## Conflict rules

- A remote change is detected by revision **or** content hash: the editor
  preserves the revision it loaded when it saves, so a same-revision content
  change is possible and must still be noticed.
- Editor clean → auto-reload from disk via `applyProjectFile()` (nothing to
  lose). A recovery snapshot is captured with reason `disk-sync`.
- Editor dirty → banner with three explicit exits. Local edits are NEVER
  overwritten silently:
  - **Reload and discard my edits** — take the disk version.
  - **Save mine as a copy** — download the editor version, then keep editing
    it while acknowledging the disk version.
  - **Ignore** — keep editing the local version, acknowledge the disk version.
- V2 save: the editor POSTs its snapshot to the sidecar when the document has
  disk identity; on any failure (sidecar unreachable, 409, validation) it
  falls back to the download. A 409 means the agent holds newer unsaved work
  in memory — the agent's next save will surface through the normal flow.

## Known limitations

- V1 polls; V2 pushes via SSE with polling as fallback. Neither is
  real-time-collaboration: two editor tabs (or editor + agent) editing at
  once can still race; the banner and the 409 are the safety nets, not a
  merge.
- The editor does not bump `revision` when it saves: an editor save keeps the
  revision it loaded. Ordering across editor/agent saves is therefore
  hash-based, not revision-based.
- `set_active_layer` / `select_frame` mutate the bridge session without
  bumping revision; an editor save right after one of those can overwrite the
  agent's layer/frame selection (pixels are unaffected).
- CORS allows localhost origins only. The sidecar binds 127.0.0.1 and serves
  only top-level `*.dogsprite` files inside the output directory.

## Manual browser check (needs the mini)

1. Start the sidecar + editor as above.
2. Load a `.dogsprite` from the output directory (File → Open).
3. In a terminal, drive the MCP server (or edit the file) and `save_project`
   with `overwrite: true`. With a clean editor the canvas reloads within ~2 s.
4. Edit a pixel in the editor (dirty), save again from the agent: the banner
   appears with the three options.
5. (V2) With disk identity, File → Save writes through the sidecar: the file
   on disk updates and no download happens. Stop the sidecar and save again:
   the download fallback appears.
