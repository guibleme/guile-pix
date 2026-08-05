/** Concise workflow guidance delivered in the MCP initialize result. */
export const PIXEL_ART_INSTRUCTIONS = `
# Guile Pix revisioned animation workflow

Use only the registered tools.

1. Start with create_sprite or load_project. Keep the returned projectId and revision.
2. Inspect first with get_project_snapshot. Target pixels with set_pixels, clear_layer, draw_primitives, masks, palette operations, or transform_region. #00000000 selectively erases RGBA pixels.
3. Build timelines with the revisioned frame, clip, layer, and linked-cel tools. Editing a linked cel affects every reference until unlink_cel is used.
4. Use set_active_layer and select_frame to change defaults. Selection does not increment revision.
5. generate_walk_right is only for source cornerfall-fighter-right-16 at pixel hash 7ca4f48ddf57c8efbf48e9fc40bbac41ebd1802d5c4104715d5082c099fdd3ee. Pass the exact fixed brief: walk_right, right, four 100 ms frames, DB16, pivot (8,15), ground line 15, root motion none. It returns 1x/4x review paths and always reports artistic approval as pending human review.
6. Before approval, call validate_animation, get_animation_review, and export_animation_preview. Diagnostics are caller-declared raw structural metrics, grids are configurable, APNG preserves arbitrary millisecond durations, and GIF is available only for centisecond-exact timing. WebP requests fail explicitly. Artistic approval always remains human-owned.
7. Persist with save_project after validation and review.
8. Call export_animation_bundle for a deterministic 1x atlas/manifest with rectangles, exact durations, pivot, production metadata, hashes, and Godot hints. The frozen walk_right remains a compatibility fixture; generic bundles still report pending human review.

Every document mutation, save, export, undo, and redo requires expectedRevision. Save and preview outputs preserve existing files unless overwrite is explicitly true. A successful mutation, undo, or redo increments revision once. A stale revision or invalid target changes nothing; read currentRevision from the structured error and retry deliberately. Load, selection, validation, review, save, and export do not increment document revision.

Undo/redo history is labeled and bounded by 32 entries and 32 MiB. Named masks are session-scoped and do not persist in .dogsprite files. Output paths remain confined to the server-authorized root (configure stdio with GUILE_PIX_OUTPUT_DIR); inline review images are the portable client delivery. Templates, artistic scoring, and automatic approval remain unavailable.
`.trim();
