---
globs: mcp-server/src/templates/**/*.ts
---

# Template Code Rules

## Palette
- DB16 ONLY — 16 colors, no exceptions
- Floor: RGB >= 12 per channel (never pure black #000000)
- Cap: RGB <= 245 per channel (never pure white #ffffff)

## Roles
- 3-6 roles per template, semantically named (flame_core, blade_edge — NOT region1, detail)
- Adjacent roles MUST use different DB16 material ramps for visual separation
- Each role = recolorable region (spatially coherent, connected pixels)

## Grid
- 16x16: exactly 16 rows of exactly 16 characters
- 32x32: exactly 32 rows of exactly 32 characters
- `.` = transparent pixel
- Leave 1px transparent border on at least 2 sides for selout outline space

## Shading
- Light from top-left, shadows fall bottom-right
- Colored selout outlines — NEVER pure black (#140c1c) for outlines
- Hue-shift: shadows cool (boost blue), highlights warm (boost red/yellow)

## Structural
- Minimum 2px width for posts, handles, shafts
- Minimum 3px width for body parts (torso, head, limbs)
- No orphan pixels (isolated 1px without same-color orthogonal neighbor)
- No pillow shading (symmetric highlight ring)

## Eyes
- Black (#140c1c) for ALL humanoids
- Themed/colored eyes ONLY for creatures, enemies, bosses

## Batch Files
- Field name is `chars` NOT `roles` — using `roles` causes runtime errors
- UI bars: always create 0%/100% pairs (identical grid, different body color)

## Before Committing
- Verify all grids match expected dimensions
- Verify each template has 3-6 roles with different material ramps
- Run `cd mcp-server && npm run build` to confirm compilation
