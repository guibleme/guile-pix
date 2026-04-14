---
globs: src/components/**/*.tsx
---

# Editor Component Rules

## Directives
- ALL components must start with `'use client'` directive
- SSR is disabled globally — never add server-side logic

## State Access
- Prefer `useCallback` with `store.getState()` over reactive hooks for performance
- NEVER write to Zustand stores mid-stroke (breaks mutable pixel reference)
- Use `useXxxStore(selector)` with narrow selectors to minimize re-renders

## Canvas
- NEVER use OffscreenCanvas for drawImage targets — use `document.createElement('canvas')`
- Pointer handlers must access engine via `engineRef.current` (not hook parameter — captures stale null)

## Styling
- Dark theme only, colors via CSS custom properties defined in globals.css
- TailwindCSS v4 with `@theme inline` variables
- No hardcoded color values — use theme tokens

## Accessibility
- Dialogs: focus trap, Esc close, Enter default-action, ARIA semantics
- Menus: keyboard navigation (Arrow, Enter, Esc) with ARIA roles
- Interactive elements must have visible focus indicators

## Animation
- Track `isPlaying` transitions for rAF start/stop — not every store update
- First frame starts with empty `layerData: {}` — must call `initFrameLayer` on mount

## Dependencies
- Icons: lucide-react only
- IDs: nanoid
- GIF: gifenc (needs `src/types/gifenc.d.ts`, use `.buffer as ArrayBuffer` for Blob)
