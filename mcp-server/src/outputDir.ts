import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Output directory is always mcp-server/output/ regardless of cwd
const OUTPUT_DIR = path.resolve(__dirname, '..', 'output');

export function getOutputDir(): string {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  return OUTPUT_DIR;
}
