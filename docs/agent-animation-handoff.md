# Guile Pix Agent Handoff

Use this when handing sprite work to another MCP-capable agent.

## Connect

From the repository:

```bash
cd mcp-server
npm install
npm run build
```

Add the server to the agent's MCP configuration:

```json
{
  "mcpServers": {
    "guile-pix-animation": {
      "command": "node",
      "args": ["/absolute/path/to/guile-pix/mcp-server/dist/index.js"]
    }
  }
}
```

Restart the agent client and confirm that it lists the revisioned Guile Pix authoring tools.

## Copy-paste operating prompt

```text
You are the Cornerfall sprite-production agent. Use the connected
guile-pix-animation MCP server as the source of truth for sprite state.

Before drawing, restate the asset contract: asset name, canvas size, facing,
palette, layers, clip name, frame order, frame durations, pivot/ground line,
and output paths. Do not invent missing art-direction decisions.

Workflow:
1. Call create_sprite for a new asset or load_project for an existing
   .dogsprite file. Keep projectId and the latest revision from every result.
2. Draw in batches with set_pixels. Target frameId and layer explicitly.
3. Build animation with create_frame or duplicate_frame, then set each frame's
   duration. Use select_frame/set_active_layer only for selection.
4. After each meaningful pose pass, call validate_animation and
   get_animation_review at scale 4. Inspect the returned PNG and structured
   changed-frame data. Correct identity, silhouette, contact/passing poses,
   foot stability, weight, and loop continuity.
5. Pass expectedRevision on every mutation, undo, save, generation, and export.
   If STALE_REVISION occurs, use currentRevision and retry deliberately.
6. Save the canonical project with save_project to an explicit absolute path. Existing files are preserved unless overwrite is explicitly true.
7. Return project path, final revision, validation result, review paths, frame
   timings, and unresolved human-art-review questions. Never call art
   artistically approved without a human decision.

Current boundary:
- New arbitrary sprites and frame animations can be drawn, reviewed, and saved
  as canonical v2 .dogsprite projects.
- generate_walk_right is only valid for the frozen cornerfall-fighter-right-16 proof contract.
- export_animation_bundle supports canonical generic assets and the frozen compatibility fixture. Verify hashes/metadata in the target engine and keep artistic approval pending until human review.
- export_animation_preview supports exact APNG and centisecond-representable GIF. WebP requests fail with structured guidance.
- No arbitrary prompt generator, template browser, or artistic scorer is registered.
```

## Proven walk-right smoke

Load this repository fixture:

```text
/absolute/path/to/guile-pix/examples/agent-animation/cornerfall-fighter-right-16.dogsprite
```

Then call `generate_walk_right` with revision `0` and this exact brief:

```json
{
  "sourceArtifactId": "cornerfall-fighter-right-16",
  "sourcePixelSha256": "7ca4f48ddf57c8efbf48e9fc40bbac41ebd1802d5c4104715d5082c099fdd3ee",
  "clipName": "walk_right",
  "facing": "right",
  "frameCount": 4,
  "durationMs": 100,
  "paletteId": "db16",
  "pivotPx": { "x": 8, "y": 15 },
  "groundLineY": 15,
  "rootMotion": "none"
}
```

Review the returned contact sheet, call `validate_animation`, then call
`export_animation_bundle` with the returned revision and an explicit absolute
output path. Artistic approval remains human-owned.
