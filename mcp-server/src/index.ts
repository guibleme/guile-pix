#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer } from './server.js';
import { SIDECAR_DEFAULT_PORT, startSidecar } from './sidecar.js';

async function main(): Promise<void> {
  const server = createMcpServer({ outputDir: process.env.GUILE_PIX_OUTPUT_DIR });
  await server.connect(new StdioServerTransport());
  console.error('Guile Pix MCP server running on stdio');

  // Opt-in HTTP sidecar for the disk <-> editor sync loop. It only serves the
  // .dogsprite files in the output directory on localhost. A sidecar failure
  // must never take the MCP server down with it.
  if (process.env.GUILE_PIX_SIDECAR === '1') {
    const requestedPort = Number.parseInt(process.env.GUILE_PIX_SIDECAR_PORT ?? '', 10);
    const port = Number.isInteger(requestedPort) && requestedPort > 0 ? requestedPort : SIDECAR_DEFAULT_PORT;
    try {
      await startSidecar({ outputDir: process.env.GUILE_PIX_OUTPUT_DIR, port });
    } catch (error) {
      console.error('Guile Pix sync sidecar failed to start (stdio MCP unaffected):', error);
    }
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
