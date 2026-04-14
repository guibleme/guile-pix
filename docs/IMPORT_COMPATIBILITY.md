# Import Compatibility (Aseprite/LibreSprite)

Date: 2026-02-16

## Stable Path Implemented

`File -> Load Project...` now supports:
- Native SpriteAI project files: `.spriteset` / normalized `.json`
- Interchange import: Aseprite/LibreSprite spritesheet metadata `.json` + spritesheet image `.png`

Expected JSON metadata shapes:
- `frames` as object/hash (`json-hash`)
- `frames` as array (`json-array`)

Supported frame metadata:
- `frame` bounds
- `duration`
- `trimmed`
- `spriteSourceSize`
- `sourceSize`

## Current Limits

- Native `.aseprite` binary import is not implemented.
- Rotated spritesheet frames (`"rotated": true`) are rejected.
- Imported spritesheet data is flattened into a single layer in SpriteAI.

## Manual Validation Checklist

1. Export a spritesheet from Aseprite/LibreSprite with JSON (`Hash` or `Array`) and PNG.
2. In SpriteAI, select both files in one `Load Project...` action.
3. Verify:
- frame count matches expected
- frame size matches source sprite size
- per-frame duration is preserved
- trimmed sprites are placed correctly in frame space
