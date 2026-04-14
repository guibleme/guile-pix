# SpriteAI Memory

Last update: 2026-02-17

## Current Stage
Stage: "Quality hardening + recovery workflow"

What is stable now:
- Local save/load project flow.
- Command-based execution path (menu + shortcuts share same logic).
- Unsaved-changes safety dialog (`Save / Discard / Cancel`).
- Session Manager with:
  - Recent Projects
  - Recovery Snapshots
  - Thumbnail previews
- Export quality upgrades (PNG multi-size, GIF resolution, Aseprite/LibreSprite metadata JSON).
- Optional freehand stroke stabilizer for Brush/Eraser (configurable, per-stroke frozen settings).
- Stabilizer tuning: adaptive speed response + micro-jitter deadzone, default value now 2.
- Pixel-perfect brush mode with corner cleanup + original pixel restoration.
- Pixel-perfect algorithm parity pass vs LibreSprite intertwiners (path behavior aligned for tested synthetic strokes).
- Keyboard workflow upgrades:
  - `P` toggle pixel-perfect
  - `T` toggle freehand trace policy
  - `[` / `]` adjust stabilizer live
  - `H` / `V` toggle symmetry components
  - `Alt+Arrow` moves active symmetry axes by 1px
- Status bar now surfaces freehand quality state (`Stb`, `Alg`, `Trc`, `Sym`).
- Draw UX audit checklist added in `docs/DRAW_UX_AUDIT.md`.
- Phase 0 parity planning completed:
  - `docs/PARITY_MATRIX.md`
  - `docs/PARITY_BACKLOG.md`
- P0-05 accessibility baseline implemented:
  - Dialog focus trap + Esc + Enter default action + ARIA dialog semantics.
  - Menu keyboard navigation (`Arrow`, `Enter`, `Esc`) with menu roles.
- P0-01 freehand algorithm selector implemented:
  - `default | pixelPerfect | dots` mode in tool settings and UI.
  - Brush/Eraser behavior now algorithm-aware.
- P0-02 shift-constrained line implemented:
  - Brush/Eraser can draw straight constrained strokes while holding `Shift`.
- P0-03 symmetry drawing implemented:
  - freehand symmetry modes (`none/horizontal/vertical/both`) with adjustable axes.
  - symmetry reflection formula aligned with LibreSprite axis-adjust behavior.
- P0-04 brush preview overlay implemented:
  - Dedicated overlay preview canvas for Brush/Eraser.
  - Preview reflects brush shape/size and active symmetry points.
  - Preview clears on leave/cancel to avoid ghost artifacts.
  - Symmetry guide lines rendered in-canvas to improve axis discoverability.
- P1-05 on-canvas symmetry handles implemented:
  - symmetry axes can be dragged directly from viewport guides/handles.
  - pointer capture and cursor feedback keep drag behavior stable during pan/zoom.
- P1-01 freehand trace policy implemented:
  - `accumulate` and `accumulateUpdateLast` exposed in tool settings.
  - Brush/Eraser redraw strategy now follows selected trace policy for non-pixel-perfect freehand.
  - keyboard toggle added (`T`) for fast switching.
- P1-03 grouped undo transactions implemented:
  - History entries now support multi-change transactions with optional layer-state snapshots.
  - Undo/redo command path applies composed transactions atomically.
  - Layer add/duplicate workflows are now single-step undo operations.
- P1-02 timeline advanced operations implemented:
  - linked-like frame reuse (`add linked`, `link to previous`, `unlink active`) added to timeline workflow.
  - bulk frame duration edits added (`Apply All`, `Apply From`) while preserving per-frame playback/export timing.
- P1-04 session manager UX polish implemented:
  - search/filter flow added for recent and recovery lists.
  - recovery reason filters and metadata chips improve large-list scanning speed.
  - empty states now provide actionable context when filters are active.
- P2-01 compatibility expansion implemented:
  - load flow now accepts Aseprite/LibreSprite spritesheet JSON + PNG.
  - supports both JSON frames payload variants (`hash` and `array`).
  - supports trimmed frame placement (`spriteSourceSize` + `sourceSize`) during import.
  - imports spritesheet frames as flattened SpriteAI timeline data.
- P2-02 tablet pressure support implemented:
  - Brush/Eraser now support pressure-aware size and opacity/flow response.
  - pressure controls exposed in tool settings (`PR`, `PS`, `PO`, `PSz`, `POp`).
  - mouse and non-pressure pointers fall back to fixed pressure for predictable behavior.
- P2-03 visual polish/discoverability implemented:
  - new in-app keyboard shortcuts dialog with grouped reference.
  - quick access via `?`, `F1`, and `Help -> Keyboard Shortcuts`.
  - contextual status-bar hints improved for first-use discoverability.
- UI hardening pass started (post-P2):
  - New Project now supports custom width/height selection (not only presets).
  - quick actions bar added for primary commands (new/save/load/import/sessions/export/help).
  - canvas clarity improved with explicit drawable-bounds guide and in-canvas HUD hints.
- LibreSprite-inspired UI overhaul pass (desktop editor style):
  - docked 3-column workspace layout (left tools/colors, center canvas/timeline, right layers/AI),
  - tool settings redesigned from micro-toggle codes to readable controls/selectors,
  - timeline/layer action controls promoted to explicit labeled buttons,
  - neutral dark skin palette adjusted toward LibreSprite-like contrast hierarchy.
- Modern UI refresh (Codex-inspired polish):
  - updated neutral-dark palette with green accent and softer contrast hierarchy,
  - rounded card-style panels and cleaner menu/dropdown/button styling,
  - improved spacing and dock separation for clearer visual hierarchy.
- Production-hardening baseline implemented:
  - security headers + CSP added in Next config.
  - import hard-limits added (file count, total bytes, JSON/image bytes, PNG preflight dimensions, frame/layer/memory limits).
  - runtime observability added (`window.error` + `unhandledrejection` capture to local storage).
  - global runtime error boundary added (`src/app/global-error.tsx`).
  - automated testing baseline added (Vitest unit tests + Playwright e2e smoke tests).
  - CI quality pipeline added (`.github/workflows/quality.yml`) for typecheck/lint/unit/build/e2e.
- Rebranding and onboarding pass implemented:
  - app brand switched to `SpriteDog` across home/loading/menu/metadata.
  - new welcome flow added before editor:
    - ask user name,
    - fake "AI thinking/loading" sequence,
    - reveal joke ("golden retriever mode"),
    - explicit entry to main editor.
  - onboarding includes "Saltar intro" quick path and local name memory.
  - project/session/runtime local keys migrated to `spritedog-*` with legacy `spriteset-*` fallback compatibility.
  - file export extension switched to `.spritedog` while keeping `.spriteset` import compatibility.

## Build Health
- TypeScript check: PASS
- Production build: PASS
- Lint: PASS (warnings only)
- Unit tests: PASS
- E2E smoke tests: PASS

## Immediate Next Focus
1. Run full manual draw-session validation (`docs/DRAW_UX_AUDIT.md`) on mouse/stylus and larger canvases.
2. Validate symmetry parity manually with odd/even brush sizes and axis edge cases.
3. Run manual trace-policy parity session (`accumulate` vs `accumulateUpdateLast`) in real drawing workloads.
4. Run manual grouped-undo validation for layer workflows in multi-frame projects.
5. Run timeline workflow validation for linked-like frames and bulk duration edits (`P1-02`).
6. Run session manager validation with large recent/recovery lists and mixed reason filters (`P1-04`).
7. Stabilizer tuning pass with real pixel sessions.
8. Keyboard shortcut refinement and discoverability.
9. High-math animation preset expansion and tuning for pixel readability.
10. Automated tests for persistence/recovery/export compatibility.
11. Manual validation of new spritesheet import path with external Aseprite/LibreSprite samples.
12. Stylus hardware validation for pressure curve feel and control ranges (`P2-02`).
13. Manual UX pass for shortcuts discoverability and shortcut-collision audit (`P2-03`).
14. Full interface overhaul pass (button reliability, panel hierarchy, visual consistency).
15. Manual UX validation focused on drawing-area clarity and first-project creation flow.
16. Iterate visual polish with direct user feedback (button spacing/iconography/panel density).

## Notes
- Keep architecture local-first and offline-first.
- Keep compatibility path with LibreSprite/Aseprite export/import ecosystem.
