---
name: quality-check
description: "Run full quality validation: MCP build, gallery export, bundle export, editor typecheck. Reports pass/fail for each check."
user-invocable: true
---

# /quality-check — Full Project Quality Validation

Run all quality checks and report results.

## Checks (run in order)

### 1. MCP Server Build
```bash
cd mcp-server && npm run build 2>&1
```

### 2. Template Gallery Export
```bash
cd mcp-server && npx tsx scripts/exportAllTemplates.ts 2>&1
```

### 3. Bundle Export
```bash
cd mcp-server && npx tsx scripts/exportBundles.ts 2>&1
```

### 4. Editor TypeScript Check
```bash
npx tsc --noEmit 2>&1
```

### 5. Template Spot-Check
Read 3 random template files from `mcp-server/src/templates/` and verify:
- Grid dimensions correct (16x16 or 32x32)
- 3-6 roles per template
- `chars` field used (not `roles`)
- DB16 colors only
- No pure black (#000000) or pure white (#ffffff)

## Report Format

```
=== QUALITY REPORT ===
BUILD:     PASS/FAIL
GALLERY:   X templates, Y errors
BUNDLES:   X sprites across Y bundles
TYPECHECK: PASS/FAIL
SPOT-CHECK: X/3 templates OK

ISSUES:
- [any failures or warnings]

TOTALS:
- Gallery: X templates
- Bundles: X sprites / Y bundles
```
