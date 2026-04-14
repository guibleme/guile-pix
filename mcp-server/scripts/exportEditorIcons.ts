/**
 * Export editor icons as 128x128 PNGs (4x scale of 32x32).
 *
 * Renders all editor icon templates + reused gameIcons32v5 templates
 * with full auto-processing (outline, shade, highlight).
 *
 * Usage: cd mcp-server && npx tsx scripts/exportEditorIcons.ts
 * Output: ../public/icons/{name}.png
 */

import * as fs from 'fs';
import * as path from 'path';
import { createProject, deleteProject } from '../src/project.js';
import { handleDrawTemplate } from '../src/tools/templateTools.js';
import { renderProjectToPng } from '../src/render.js';

// Editor icon batches
import { EDITOR_ICONS_BATCH1_TEMPLATES } from '../src/templates/editorIcons32.js';
import { EDITOR_ICONS_BATCH2_TEMPLATES } from '../src/templates/editorIcons32v2.js';
// Reused icons from gameIcons32v5
import { GAME_ICONS_32_BATCH5_TEMPLATES } from '../src/templates/gameIcons32v5.js';

const SCALE = 4; // 32x32 * 4 = 128x128 retina-quality PNGs
const outDir = path.resolve(import.meta.dirname, '..', '..', 'public', 'icons');

// All editor icons (new + reused)
const editorIcons: Record<string, string> = {
  // Batch 1 — Drawing Tools + Layer Controls
  ...Object.fromEntries(Object.keys(EDITOR_ICONS_BATCH1_TEMPLATES).map(k => [k, k])),
  // Batch 2 — Timeline, Palette, UI & Branding
  ...Object.fromEntries(Object.keys(EDITOR_ICONS_BATCH2_TEMPLATES).map(k => [k, k])),
};

// Reused icons from gameIcons32v5
const reusedIcons: Record<string, string> = {
  gear_settings_icon_32: 'gear_settings_icon_32',
  save_icon_32: 'save_icon_32',
  load_icon_32: 'load_icon_32',
  magnify_icon_32: 'magnify_icon_32',
  trash_icon_32: 'trash_icon_32',  // also in editor batch, but render from game batch too
};

// Merge all
const allIcons = { ...editorIcons, ...reusedIcons };

// Clean & create output dir
fs.mkdirSync(outDir, { recursive: true });

let exported = 0;
const errors: string[] = [];

console.log(`\nExporting ${Object.keys(allIcons).length} editor icons to ${outDir}...\n`);

for (const [outputName, templateName] of Object.entries(allIcons)) {
  try {
    const project = createProject(32, 32, templateName);

    const result = handleDrawTemplate({
      projectId: project.id,
      template: templateName,
      autoOutline: true,
      autoShade: true,
      autoHighlight: true,
    });

    if (result.isError) {
      errors.push(`${templateName}: ${(result.content[0] as any).text}`);
      deleteProject(project.id);
      continue;
    }

    const pngBuffer = renderProjectToPng(project, SCALE);
    const outFile = path.join(outDir, `${outputName}.png`);
    fs.writeFileSync(outFile, pngBuffer);

    exported++;
    process.stdout.write('.');
    deleteProject(project.id);
  } catch (err: any) {
    errors.push(`${templateName}: ${err.message}`);
  }
}

console.log(`\n\n✓ Exported ${exported} icons`);
if (errors.length > 0) {
  console.log(`✗ ${errors.length} errors:`);
  errors.forEach(e => console.log(`  - ${e}`));
}
