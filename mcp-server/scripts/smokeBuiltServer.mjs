import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const serverDirectory = fileURLToPath(new URL('..', import.meta.url));
const entryPoint = fileURLToPath(new URL('../dist/index.js', import.meta.url));
const client = new Client({ name: 'guile-pix-built-smoke', version: '1.0.0' });
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [entryPoint],
  cwd: serverDirectory,
  stderr: 'pipe',
});

let stderr = '';
transport.stderr?.on('data', (chunk) => { stderr += chunk.toString(); });

try {
  await client.connect(transport, { timeout: 10_000 });
  const server = client.getServerVersion();
  if (server?.name !== 'guile-pix-animation') throw new Error(`Unexpected initialized server: ${JSON.stringify(server)}`);

  const { tools } = await client.listTools(undefined, { timeout: 10_000 });
  const bundle = tools.find((tool) => tool.name === 'export_animation_bundle');
  if (!bundle?.description?.includes('generic v2 atlas')) throw new Error('Generic bundle tool schema was not exposed by the built server');
  if (!tools.some((tool) => tool.name === 'generate_walk_right')) throw new Error('Fixed walk_right compatibility tool was not exposed by the built server');

  console.log(`MCP_BUILT_DIST_OK server=${server.name}@${server.version} tools=${tools.length}`);
} catch (error) {
  const detail = stderr.trim();
  throw new Error(`${error instanceof Error ? error.message : String(error)}${detail ? `\nBuilt server stderr:\n${detail}` : ''}`);
} finally {
  await client.close().catch(() => undefined);
}
