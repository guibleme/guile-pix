---
name: batch
description: "Generate a batch of 20 pixel art templates for a target category. Reads the scaling tracker, identifies the priority category, and creates a complete batch file."
user-invocable: true
---

# /batch — Template Batch Generator

Generate a batch of 20 pixel art templates for the DogSprite MCP template pipeline.

## Steps

1. **Read the tracker**: Open `memory/template-scaling-tracker.md` and identify which category has the lowest count or needs more templates.

2. **Read quality guide**: Open `memory/template-quality-guide.md` for mandatory quality rules.

3. **Read an existing batch** from `mcp-server/scripts/batches/` to match the format exactly.

4. **Create the batch file** at `mcp-server/scripts/batches/<category>_batchN.ts`:
   - 20 templates per batch
   - Genre diversity (RPG, sci-fi, horror, farming, puzzle, fighting, survival, racing, roguelike)
   - 3-6 roles per template with semantic names
   - DB16 palette only, colored selout, proper density
   - Field name `chars` (NOT `roles`)

5. **Generate TypeScript output**:
   ```bash
   cd mcp-server && npx tsx scripts/templateGenerator.ts scripts/batches/<file>.ts 2>/dev/null > src/templates/<output>.ts
   ```

6. **Register** the output in:
   - `mcp-server/src/tools/templateTools.ts` (import + merge)
   - `mcp-server/scripts/exportAllTemplates.ts`
   - `mcp-server/scripts/exportBundles.ts` (if bundled)

7. **Build and verify**:
   ```bash
   cd mcp-server && npm run build 2>&1
   ```

8. **Update tracker**: Update `memory/template-scaling-tracker.md` with new counts.

## Arguments

- Category name (optional) — if provided, generate for that specific category instead of auto-detecting the lowest count.

## Output

Report: template names, category, count, build status, updated totals.
