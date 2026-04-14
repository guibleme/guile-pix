# Draw UX Audit (LibreSprite Baseline)

Date: 2026-02-16

## Scope
- Brush/Eraser stroke feel
- Pointer robustness
- Undo granularity for drawing
- Shortcut-driven high-frequency draw flow

## Current Status
- Pointer lifecycle hardening: PASS
  - `pointerup`, `pointercancel`, and `lostpointercapture` finalize strokes safely.
- Undo granularity (per-stroke commit only on real pixel diff): PASS
- Grouped undo transactions (multi-step layer ops): PASS
  - Layer add/duplicate operations are recorded as single undoable transactions.
  - Undo/redo now applies composed pixel and layer-state changes atomically.
- Freehand stabilizer: PASS
  - Adaptive smoothing + micro-jitter deadzone.
- Freehand mode selector: PASS
  - `default`, `pixelPerfect`, `dots` available for Brush/Eraser.
- Freehand trace policy selector: PASS
  - `accumulate` and `accumulateUpdateLast` available for Brush/Eraser.
  - `accumulateUpdateLast` redraws stroke from restored pixels to avoid incremental artifacts.
- Shift-constrained straight line: PASS
  - Brush/Eraser can constrain stroke from anchor point while `Shift` is held.
- Freehand symmetry modes: PASS
  - `none`, `horizontal`, `vertical`, `both` with editable symmetry axes.
  - Reflection math aligned with LibreSprite symmetry transform (axis-adjust parity by brush size).
  - On-canvas symmetry handles/guide lines support direct axis dragging.
- Brush preview overlay: PASS
  - Dedicated preview canvas for Brush/Eraser, shape/size-aware and symmetry-aware.
  - Symmetry guide lines are rendered on-canvas for active symmetry modes.
- Pixel-perfect brush mode: PASS
  - Corner cleanup behavior with original-pixel restoration.
  - Synthetic parity check against LibreSprite pixel-perfect path logic: 0 mismatches in 2000 randomized stroke paths (algorithm-level test).
- Live draw controls by keyboard: PASS
  - `P` toggle pixel-perfect.
  - `T` toggle freehand trace policy.
  - `[` / `]` stabilizer down/up.
  - `H`/`V` toggle symmetry components.
  - `Alt+Arrow` nudges active symmetry axes by 1px.
- Shortcut discoverability layer: PASS (implementation)
  - Keyboard shortcuts dialog available via `?` / `F1`.
  - Menu entry added under `Help`.
  - Status bar provides always-visible quick hint.
- Canvas readability pass: PASS (implementation)
  - Visible drawable-bounds guide rendered in viewport.
  - In-canvas HUD shows dimensions/zoom/tool/frame and core interaction hints.
- Pressure-aware freehand response: PASS (implementation)
  - Brush/Eraser now support pressure-based size and opacity/flow mapping.
  - Mouse input safely falls back to fixed pressure behavior to avoid accidental stroke variation.

## Remaining Validation (Manual Session Needed)
1. Fast mouse zig-zag with `stabilizer=0..6`:
- Confirm no visible lag spikes and predictable trailing.
2. Pixel-perfect corner turns on detailed sprites:
- Confirm no unintended pixel holes on repeated tight curves.
3. Long draw sessions (10+ minutes) on larger canvases:
- Confirm no interaction degradation or accidental stroke drops.
4. Tablet pass (if hardware available):
- Verify pressure curves on stylus (`size`, `opacity`, and `size+opacity`) and no pointer-cancel regressions.
5. Symmetry parity pass with odd/even brush sizes:
- Verify mirrored result matches expected axis behavior for brush sizes `1..8`.
6. Trace policy parity pass:
- Compare `accumulate` vs `accumulateUpdateLast` with fast directional changes and confirm expected visual difference.
7. Layer workflow undo pass:
- Verify add-layer and duplicate-layer undo/redo sequences across multi-frame projects.
