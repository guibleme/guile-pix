---
name: export-bundles
description: "Rebuild the MCP server and export all template bundles for itch.io. Runs build, gallery export, and bundle export in sequence."
user-invocable: true
---

# /export-bundles — Full Bundle Export Pipeline

Rebuild everything and export all itch.io bundles.

## Steps

1. **Build MCP server**:
   ```bash
   cd mcp-server && npm run build 2>&1
   ```
   Stop if build fails.

2. **Export template gallery**:
   ```bash
   cd mcp-server && npx tsx scripts/exportAllTemplates.ts 2>&1
   ```
   Report: total templates, errors.

3. **Export itch.io bundles**:
   ```bash
   cd mcp-server && npx tsx scripts/exportBundles.ts 2>&1
   ```
   Report: per-bundle sprite counts, total sprites, total bundles.

4. **Summary**: Report final counts:
   - Gallery: X templates, Y errors
   - Bundles: X sprites across Y bundles
   - Any bundles below 100 sprites (flag as warning)

## Output Location

- Gallery: `mcp-server/output/template-gallery/`
- Bundles: `mcp-server/output/bundles/`
