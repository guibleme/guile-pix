#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer } from './server.js';

async function main(): Promise<void> {
  const server = createMcpServer({ outputDir: process.env.GUILE_PIX_OUTPUT_DIR });
  await server.connect(new StdioServerTransport());
  console.error('Guile Pix MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
