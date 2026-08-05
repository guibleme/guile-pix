/** Concise workflow guidance delivered in the MCP initialize result. */
export const PIXEL_ART_INSTRUCTIONS = `
# Guile Pix revisioned animation workflow

Use only the registered tools.

1. Start with create_sprite or load_project. Keep the returned projectId and revision.
2. Target pixels with set_pixels or clear_layer. Pass frameId and layer when the active selections are not the intended target.
3. Build the timeline with create_frame, duplicate_frame, select_frame, and set_frame_duration. New frames are blank; duplicated frames receive fresh cels. Editing a linked cel loaded from a project can affect every frame that references it.
4. Use set_active_layer and select_frame to change defaults. Selection does not increment revision.
5. generate_walk_right is only for source cornerfall-fighter-right-16 at pixel hash 7ca4f48ddf57c8efbf48e9fc40bbac41ebd1802d5c4104715d5082c099fdd3ee. Pass the exact fixed brief: walk_right, right, four 100 ms frames, DB16, pivot (8,15), ground line 15, root motion none. It returns 1x/4x review paths and always reports artistic approval as pending human review.
6. Before approval, call validate_animation and get_animation_review. Review compares the current document with the last successful create, load, or save baseline and returns structured changes, persisted contact sheets, and a PNG image.
7. Persist with save_project after validation and review.
8. For the approved fixed walk_right contract, call export_animation_bundle with the current expectedRevision. It writes one unchanged 1x PNG/JSON runtime bundle atomically. reviewStatus is optional and only writes a hash-bound review.json sidecar.

Every document mutation, save, export, and undo requires expectedRevision. A successful mutation or undo increments revision once. A stale revision or invalid target changes nothing; read currentRevision from the structured error and retry deliberately. Load, selection, validation, review, save, and export do not increment document revision.

undo restores only the latest document mutation; redo is unavailable. The current surface has one ordered clip and no layer CRUD, drawing primitives, transforms, templates, quality scoring, standalone preview, comments, clip CRUD, or general export profiles. Use set_pixels for all drawing and get_animation_review for visual inspection.
`.trim();
