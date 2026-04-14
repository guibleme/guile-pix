# SpriteAI Parity Backlog (LibreSprite-Oriented)

Date: 2026-02-16

## P0 (Critical)

1. `P0-01` Freehand algorithm selector (Implemented 2026-02-16)
- Add `DEFAULT | PIXEL_PERFECT | DOTS` mode selector for freehand tools.
- Files: `src/stores/useToolStore.ts`, `src/components/tools/ToolPanel.tsx`, `src/lib/tools/*`.
- Done when:
  - modes are switchable in UI + shortcut flow,
  - deterministic stroke tests exist for each mode.

2. `P0-02` Shift-constrained line for brush/eraser (Implemented 2026-02-16)
- Hold `Shift` to constrain freehand stroke to straight line from stroke origin.
- Files: `src/components/canvas/CanvasViewport.tsx`, `src/hooks/useKeyboardShortcuts.ts`.
- Done when:
  - constrained lines are stable across zoom/pan,
  - undo remains one entry per stroke.

3. `P0-03` Symmetry drawing modes (Implemented 2026-02-16)
- Implement Horizontal / Vertical / Both symmetry for freehand tools.
- Files: `src/stores/useToolStore.ts`, `src/components/tools/ToolPanel.tsx`, `src/lib/tools/BaseTool.ts`, `src/lib/tools/BrushTool.ts`, `src/lib/tools/EraserTool.ts`.
- Done when:
  - mirrored stroke output is deterministic,
  - symmetry axis controls are visible and editable.

4. `P0-04` Brush preview overlay (Implemented 2026-02-16)
- Show brush boundary/cursor preview reflecting size and shape.
- Files: `src/components/canvas/CanvasViewport.tsx`, optional new helper under `src/lib/canvas/`.
- Done when:
  - preview remains correct while zooming/panning,
  - no preview ghost artifacts after cancel/end stroke.

5. `P0-05` Dialog and menu keyboard accessibility (Implemented 2026-02-16)
- Add focus trap, `Esc`, Enter default action, ARIA labels/roles.
- Add keyboard nav for menu (`Arrow`, `Enter`, `Esc`).
- Files: `src/components/ui/Dialog.tsx`, `src/components/editor/MenuBar.tsx`.
- Done when:
  - dialogs/menus fully operable by keyboard only,
  - focus never escapes modal while open.

## P1 (High)

1. `P1-01` Trace policy options for freehand (Implemented 2026-02-16)
- Expose and implement practical trace policies (`Accumulate`, `AccumulateUpdateLast`).
- Files: `src/stores/useToolStore.ts`, `src/components/tools/ToolPanel.tsx`, `src/lib/tools/BrushTool.ts`, `src/lib/tools/EraserTool.ts`.
- Done when:
  - behavior differences are visible and documented,
  - no regressions in existing stroke commit logic.

2. `P1-02` Timeline advanced operations (Implemented 2026-02-16)
- Add frame linking-like reuse workflow and bulk frame duration edits.
- Files: `src/stores/useTimelineStore.ts`, `src/components/timeline/TimelinePanel.tsx`.
- Done when:
  - repeated animation tasks need fewer interactions,
  - GIF export remains consistent with per-frame timing.

3. `P1-03` Grouped undo transactions (Implemented 2026-02-16)
- Multi-step editor actions should become single undo units.
- Files: `src/stores/useHistoryStore.ts`, `src/lib/editor/editorCommands.ts`, `src/components/layers/LayersPanel.tsx`, `src/stores/useTimelineStore.ts`.
- Done when:
  - duplicate-layer+copy-data and similar actions undo in one step.

4. `P1-04` Session manager UX polish (Implemented 2026-02-16)
- Add search/filter and clearer snapshot metadata chips.
- Files: `src/components/editor/SessionManagerDialog.tsx`.
- Done when:
  - large session lists are navigable quickly by name/date/reason.

5. `P1-05` On-canvas symmetry handles (Implemented 2026-02-16)
- Add draggable symmetry handles/lines in viewport (not only sliders).
- Files: `src/components/canvas/CanvasViewport.tsx`, `src/components/tools/ToolPanel.tsx`.
- Done when:
  - users can move symmetry axes directly on canvas,
  - axis feedback stays stable while zooming/panning.

## P2 (Medium)

1. `P2-01` Compatibility expansion (Implemented 2026-02-16)
- Define import pathways and test fixtures for interoperability cases.
- Done when:
  - at least one stable import path is documented and tested.

2. `P2-02` Tablet pressure support (Implemented 2026-02-16)
- Add pressure-aware brush response (with robust fallback).
- Done when:
  - pressure input behaves predictably on supported devices.

3. `P2-03` Visual polish and discoverability (Implemented 2026-02-16)
- Improve shortcut surfacing, contextual hints, and panel ergonomics.
- Done when:
  - first-use discoverability is improved without increasing click depth.

## Recommended Execution Sequence

1. `P0-05` (accessibility foundation).
2. `P0-01`, `P0-02`, `P0-03`, `P0-04` (draw parity block).
3. `P1-01`, `P1-03` (behavior and undo consistency).
4. `P1-02`, `P1-04` (animation/session productivity).
5. `P2-*` compatibility and long-tail enhancements.
