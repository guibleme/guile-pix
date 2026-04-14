#!/bin/bash
# Validates MCP server builds cleanly after template changes.
# Triggered as a PostToolUse hook when template files are written/edited.

TEMPLATE_DIR="mcp-server/src/templates"
BATCH_DIR="mcp-server/scripts/batches"

# Check if the changed file is in templates or batches
CHANGED_FILE="$1"
if [[ "$CHANGED_FILE" != *"$TEMPLATE_DIR"* ]] && [[ "$CHANGED_FILE" != *"$BATCH_DIR"* ]]; then
  exit 0
fi

echo "[hook] Template file changed: $CHANGED_FILE"
echo "[hook] Running MCP server build check..."

cd "$(dirname "$0")/../../mcp-server" || exit 1

# Quick TypeScript syntax check on the changed file
if command -v npx &> /dev/null; then
  npx tsc --noEmit --pretty 2>&1 | head -20
  BUILD_STATUS=$?
  if [ $BUILD_STATUS -ne 0 ]; then
    echo "[hook] BUILD FAILED — fix TypeScript errors before committing"
    exit 1
  fi
  echo "[hook] Build check PASSED"
fi

exit 0
