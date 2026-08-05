# Guile Pix MCP and DogSprite integration feedback

Date: 2026-08-05

## Context

This feedback comes from building and repeatedly reviewing Kite idle and run
animations through the 15-tool `guile-pix-animation` MCP surface. The skill
design also distilled useful workflow ideas from the MIT-licensed
[`pixel-plugin` pixel-art skills](https://github.com/willibrandon/pixel-plugin/tree/main/skills)
at commit `dee350645b705916655c013f208bf5580ecb9317`.

The current revision-safe core is a strong foundation. `expectedRevision`,
atomic mutations, validation, persisted review diffs, and explicit human
approval boundaries all worked well. The gaps below prevent a complete
agent-to-editor-to-runtime production loop.

## P0: blocks the production loop

### 1. DogSprite must open MCP v2 projects

`save_project` writes canonical version 2 `.dogsprite` files, but the current
editor rejects them as `Invalid project file`. In
`src/lib/export/projectFile.ts`, `normalizeProjectFile` returns `null` when
`raw.version === 2`.

Required outcome:

- DogSprite imports v2 losslessly; or
- MCP exposes an explicit, tested `save_editor_project` v1 adapter.

The server must not describe a saved file as editor-compatible until the
editor round-trip test passes.

### 2. Add an animated review artifact

Contact sheets exposed transparent holes and identity drift, but could not
prove timing or last-to-first loop continuity. We had to build external GIFs
to review both animations.

Proposed tool:

```text
export_animation_preview(
  projectId,
  scale,
  format: gif | webp | apng,
  background: transparent | checkerboard | solid,
  repeat
)
```

It must preserve exact frame durations and return a renderer-accessible path.

### 3. Generalize runtime export

`export_animation_bundle` and `generate_walk_right` are correctly locked to
the proof fixture, but arbitrary assets therefore stop at
`runtime_export_pending`.

Required generic output:

- lossless 1x PNG atlas or PNG sequence;
- frame rectangles and exact durations;
- pivot, ground line, facing, loop, and root-motion metadata;
- deterministic hashes;
- optional Godot-ready metadata;
- review status that remains human-owned.

### 4. Add project and pixel inspection

Agents can load a project but cannot read its actual pixels or regions through
MCP. Repairing existing art currently requires reconstructing pixels from an
external PNG.

Proposed tool:

```text
get_project_snapshot(
  projectId,
  frameIds?,
  layers?,
  region?,
  includePixels?
)
```

Return project metadata, ordered frames, cel references, palette, and compact
pixel data or runs.

## P1: needed for reliable character animation

### 5. Editable production metadata

Add revisioned setters for:

- pivot;
- ground line;
- facing;
- root motion;
- clip name and loop mode;
- project palette identity.

`create_sprite` currently chooses a bottom-center pivot that cannot be changed.

### 6. Region transforms with attachment semantics

Kite's first breathing pass tore the scarf, shoulder, and cloak because
connected regions were translated without preserving root pixels. A later
connector patch made the cannon appear to shrink because overlapping pixels
overwrote part of a rigid prop.

Proposed mutation:

```text
transform_region(
  projectId,
  expectedRevision,
  frameId,
  layer,
  mask,
  pivot,
  translate?,
  rotateDegrees?,
  fillMode: transparent | source | bridge,
  preservePixelMass?,
  anchoredRegions?
)
```

Rigid transforms should preserve pixel count and report collisions, holes, and
out-of-bounds pixels.

### 7. Frame and clip operations

Add revision-safe:

- `delete_frame`;
- `reorder_frames`;
- `create_clip`, `rename_clip`, `delete_clip`;
- clip direction and loop mode;
- frame range duplication.

The run poses were stored spatially rather than in motion-phase order. Without
reordering, the document had to be repainted frame by frame.

### 8. Layer and linked-cel operations

Add layer CRUD, visibility, opacity, ordering, and safe link/unlink operations.
Character parts such as body, scarf, cloak, prop, and effects need independent
editing to avoid destructive full-cel reconstruction.

### 9. Palette operations

Add custom palette creation, palette reads, color replacement, and optional
nearest-palette mapping. `create_sprite` currently accepts built-in palette
names only, while its response does not return the chosen swatches. Agents
must currently inspect server source to obtain exact palette-approved colors.

### 10. Animation-aware validation

Extend validation with optional quality diagnostics:

- connected-component breaks and new transparent seams;
- foot and pivot drift;
- rigid-region pixel-mass and bounds changes;
- last-to-first discontinuity;
- duplicate or missing locomotion phases;
- large identity changes outside declared moving regions;
- timing symmetry and zero/implausible exposures.

These should be diagnostics, not artistic scores.

Also document or expose selective erasure. The current `set_pixels` parser
accepts `#RRGGBBAA`, so `#00000000` works, but neither the tool schema nor MCP
instructions describe that. This is essential when moving regions on copied
cels without leaving stale pixels.

## P2: improves authoring efficiency

### 11. Revision-safe drawing primitives

The reference Aseprite skills rely on lines, rectangles, contours, fills, and
palette tools. Guile Pix intentionally omits these until they use the same
transaction model. Adding revision-safe primitives would reduce enormous
`set_pixels` payloads while keeping deterministic diffs.

### 12. Selection and mask tools

Add named regions or masks with previewable bounds. Masks should support
copy/paste, translate, recolor, and transform while preserving untouched
pixels.

### 13. Better review delivery

Return compact grids as well as horizontal sheets. Very wide 12-frame review
images are difficult to inspect in chat clients. Allow grid columns and an
output root that the client can render directly.

### 14. Multiple undo and redo

Single-step undo is safe but expensive during visual iteration. A bounded,
revisioned history with operation labels would make repairs much faster.

## Suggested acceptance tests

1. Create a 96x112, 12-frame idle; save it; open it in DogSprite; save again;
   load it through MCP; compare semantic and pixel hashes.
2. Export a 4x animated preview and verify frame delays sum to the document's
   total duration.
3. Translate a scarf tip with an anchored root and assert no new transparent
   seam appears.
4. Sway a cannon around its grip and assert its pixel mass and local bounds do
   not shrink.
5. Reorder a six-pose run and verify review shows only frame-order changes.
6. Export a generic Godot bundle and verify atlas rectangles, pivot, durations,
   hashes, and loop metadata.
7. Create a 48x48 sprite and assert the documented zero-based bottom-center
   pivot is `(24, 47)`; cover odd widths too.
8. Convert a 48-tick loop at 24 fps with cumulative-boundary rounding and
   assert exact durations sum to 2000 ms.

## Skill-side rules now encoded

Until the tools grow, the Codex skills enforce these rules:

- 24 fps is a presentation timeline, not a demand for 24 drawings;
- pose order follows semantic motion phases, not source-sheet position;
- contacts may hold longer than passing poses;
- idle feet and attachment roots stay anchored;
- free cloth tips may move after the body;
- rigid props sway without changing volume;
- contact sheets, animated playback, human approval, and runtime readiness are
  separate gates;
- arbitrary assets always report `runtime_export_pending`.
