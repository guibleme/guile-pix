# Module Audit (LibreSprite Baseline)

Date: 2026-02-16

## Goal
Align SpriteAI quality with key editor behaviors used in LibreSprite.

## 1) Draw/Input Pipeline
- Reference pattern: robust pointer lifecycle + consistent tool state during stroke.
- Status: improved.
- Applied:
  - Stroke tool/settings frozen during stroke.
  - Pointer cancel/lost capture finalize stroke safely.
  - Undo commit only when pixel data actually changed.
  - Freehand stabilizer (adaptive smoothing + jitter deadzone).
  - Pixel-perfect brush mode with corner cleanup behavior.
  - Live draw-quality controls via keyboard (`P`, `[`, `]`).
- Files:
  - `src/components/canvas/CanvasViewport.tsx`
  - `src/lib/tools/BrushTool.ts`
  - `src/hooks/useKeyboardShortcuts.ts`

## 2) Commands/Actions
- Reference pattern: single command layer (`isEnabled`, `execute`) used by UI and shortcuts.
- Status: improved.
- Applied:
  - Central command dispatcher for file/edit/view actions.
  - Menu + shortcuts call same command path.
- Files:
  - `src/lib/editor/editorCommands.ts`
  - `src/components/editor/MenuBar.tsx`
  - `src/hooks/useKeyboardShortcuts.ts`

## 3) Timeline/Playback Durations
- Reference pattern: per-frame duration is first-class in playback/export.
- Status: improved in this iteration.
- Applied:
  - Per-frame duration editor in timeline panel.
  - Playback loop now uses frame duration (fps fallback).
  - GIF export writes per-frame delay (fps fallback).
- Files:
  - `src/stores/useTimelineStore.ts`
  - `src/hooks/useAnimationPlayback.ts`
  - `src/components/timeline/TimelinePanel.tsx`
  - `src/lib/export/exportGif.ts`

## 4) Persistence/Recovery
- Reference pattern: backup/recovery and recent history.
- Status: improved.
- Applied:
  - Dirty-state with save/discard/cancel gate.
  - Session manager (recent + recovery snapshots).
  - Snapshot thumbnails for fast visual restore.
- Files:
  - `src/hooks/useProjectAutoSave.ts`
  - `src/lib/project/sessionStorage.ts`
  - `src/components/editor/SessionManagerDialog.tsx`

## Remaining Gaps (Next)
1. Tool behavior refinement:
- Line/rect live preview overlays separated from working buffer.
- Pen/tablet pressure support and optional dynamic brush response.

2. Timeline UX:
- Multi-select frames, bulk duration edits, and tags/ranges.

3. Palette workflow:
- Indexed palette operations and controlled quantization workflow.

4. Test coverage:
- Draw pipeline edge cases, recovery snapshot lifecycle, per-frame duration playback/export consistency.
