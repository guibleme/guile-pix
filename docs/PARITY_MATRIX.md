# SpriteAI <> LibreSprite Parity Matrix

Date: 2026-02-16

## Scope
Goal: reach LibreSprite-level quality for core pixel-art workflows while keeping SpriteAI local-first/offline-first architecture.

Parity levels:
- `L0`: Missing or clearly below baseline.
- `L1`: Partial implementation, usable but with notable gaps.
- `L2`: Practical parity for daily use.
- `L3`: Parity + quality polish.

## Matrix

| Area | LibreSprite baseline | SpriteAI status | Level | Gap summary | Priority | Acceptance criteria |
|---|---|---|---|---|---|---|
| Stroke lifecycle robustness | Tool loop with explicit cancel/commit/rollback | Pointer lifecycle hardened (`up/cancel/lostcapture`) | L2 | Need broader stress validation | P0 | 10+ minute draw sessions without stuck states or dropped commits |
| Freehand algorithms | `DEFAULT`, `PIXEL_PERFECT`, `DOTS` | `DEFAULT`, `PIXEL_PERFECT`, `DOTS` implemented for Brush/Eraser | L2 | Needs deterministic output tests per mode in CI | P0 | User can switch all 3 algorithms; deterministic output tests pass |
| Pixel-perfect brush behavior | `IntertwineAsPixelPerfect` corner cleanup | Aligned path behavior vs synthetic parity tests | L2 | Need manual artist validation at scale | P0 | Real-session validation checklist passes in `docs/DRAW_UX_AUDIT.md` |
| Trace policy behavior | `Accumulate`, `AccumulateUpdateLast`, `Last`, `Overlap` | `Accumulate` + `AccumulateUpdateLast` implemented for freehand with UI + shortcut control | L2 | Missing `Last/Overlap` exposure and deterministic test coverage | P1 | At least `Accumulate` + `AccumulateUpdateLast` configurable for freehand |
| Symmetry drawing | Horizontal/Vertical/Both symmetry modes | Implemented for freehand tools with axis controls, on-canvas drag handles, and LibreSprite-aligned reflection math | L2 | Needs manual parity validation for odd/even brush sizes and edge-axis ranges | P0 | Toggle symmetry modes + axes; mirrored stroke output validated |
| Brush preview overlay | Dedicated preview controller | Dedicated overlay preview for Brush/Eraser with symmetry-aware outlines + symmetry guide lines | L2 | Needs final visual polish pass for high-zoom edge cases | P0 | Brush preview reflects size/shape and stays stable during pan/zoom |
| Shift-straight line from freehand | Supported in editor states | Implemented for brush/eraser (anchor-to-cursor constrained stroke) | L2 | Needs dedicated manual UX validation with stylus/mouse | P0 | Holding `Shift` constrains freehand stroke to straight line |
| Tablet/pressure support | Pressure-aware pipeline | Pressure-aware Brush/Eraser pipeline with size/opacity controls and mouse-safe fallback | L1 | Needs broader device validation on real stylus hardware | P1 | Pen pressure maps to brush size/opacity with fallback behavior |
| Tools breadth | Mature ink/controller ecosystem | Core tools only (brush, eraser, fill, picker, line, rect) | L1 | Missing advanced tool modes | P1 | Lock alpha + shading-like flow added for core pixel use cases |
| Timeline animation workflow | Mature cel/frame operations | Per-frame duration + playback/export integrated + linked-like frame reuse + bulk duration edits | L2 | Needs manual workflow validation and further timeline ergonomics polish | P1 | Link/unlink-like frame reuse and bulk timeline edits available |
| Undo/redo model | Transaction-driven operations | Snapshot-based per-stroke undo + grouped transactions for layer add/duplicate operations | L2 | Broader grouped-transaction coverage still needed for more non-draw workflows | P1 | Multi-step editor actions can be committed as one undo entry |
| Save/recovery/session | Robust recovery patterns | Recent projects + recovery snapshots + autosave + search/filter + reason chips in Session Manager | L2 | Needs broader workflow validation on very large session histories | P1 | Session Manager supports filter/search and fast recovery actions |
| Keyboard UX | Strong shortcut workflows | Core shortcuts + tool toggles + in-app shortcuts dialog (`?`/`F1`) + contextual status-bar hints | L2 | Needs broader collision audit and manual ergonomics pass with artists | P1 | Shortcut map complete, collision-audited, visible in UI hints |
| Dialog/menu accessibility | Desktop-grade keyboard navigation | Basic dialogs/menus without full keyboard a11y | L0 | Accessibility and speed gap | P0 | Esc/Enter/focus trap/arrow navigation supported and tested |
| File compatibility | Native `.aseprite` and rich ecosystem | JSON project + Aseprite/LibreSprite spritesheet JSON export path + spritesheet JSON+PNG import path | L2 | No native `.aseprite` binary import yet; rotated spritesheet frames are not supported | P2 | Load flow supports at least one stable interoperable import path (Aseprite/LibreSprite JSON+PNG) |

## Phase Order (Execution)

1. `Phase 1 (P0)` Draw parity foundation:
- freehand modes, shift-line, symmetry, brush preview.

2. `Phase 2 (P0)` UI/UX access and keyboard quality:
- dialogs, menus, shortcut discoverability.

3. `Phase 3 (P1)` workflow depth:
- timeline/linking behavior, grouped undo, advanced tool modes.

4. `Phase 4 (P2)` compatibility expansion:
- targeted import/interchange and regression test packs.

## Quality Gates

- `npx tsc --noEmit` must pass on every parity milestone.
- `npm run build` must pass on every parity milestone.
- Lint remains blocked by environment dependency issue (`math-intrinsics`) until dependency repair is addressed separately.
- Each completed matrix row must include:
  - at least one deterministic test or scripted check,
  - one manual UX validation note.
