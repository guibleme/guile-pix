---
globs: src/stores/**/*.ts
---

# Zustand Store Rules

## Import
- `create` from `'zustand'` (Zustand v5 API)

## Subscriptions
- `subscribe()` fires on ALL state changes — track transitions manually
- For animation playback: only start/stop rAF on `isPlaying` transitions

## Drawing Data Flow (CRITICAL)
1. pointerDown: copy pixel data from store to mutable Uint8ClampedArray
2. pointerMove: tool writes directly to this mutable array (render reads from it)
3. pointerUp: commit mutable array back to store via `setFrameLayerData`, push undo
- NEVER let tools write to store mid-stroke (immutable updates break the reference)

## Conventions
- Persistence keys use `dogsprite-*` prefix (with legacy fallback for `spritedog-*`, `spriteset-*`)
- Project file extension: `.dogsprite` (with `.spritedog` and `.spriteset` import compatibility)
- Keep stores focused on one domain — do not mix concerns across stores

## Current Stores (9)
- useProjectStore — name, dimensions, timestamps
- useCanvasStore — zoom, pan, grid, onion skin
- useToolStore — active tool, brush size/shape
- useLayerStore — layers array, active layer, visibility/lock/opacity
- useTimelineStore — frames with layerData, playback
- usePaletteStore — FG/BG colors, palette arrays
- useHistoryStore — undo/redo stacks (pixel snapshots)
- useAIStore — generation status, progress, result preview
- useUIStore — panel visibility, dialog states
