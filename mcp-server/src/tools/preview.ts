import * as fs from 'node:fs';
import * as path from 'node:path';
import { getProject } from '../project.js';
import { renderProjectToPng } from '../render.js';
import { getOutputDir } from '../outputDir.js';

export interface GetPreviewArgs {
  projectId: string;
  scale?: number;
}

export function handleGetPreview(args: GetPreviewArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const scale = Math.max(1, Math.min(32, Math.round(args.scale ?? 8)));
  const pngBuffer = renderProjectToPng(project, scale);

  const outputDir = getOutputDir();
  const filename = `preview-${project.id}.png`;
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, pngBuffer);

  const absolutePath = path.resolve(filePath);

  return {
    content: [
      {
        type: 'text' as const,
        text: `Preview saved: ${absolutePath}\nSize: ${project.width}x${project.height} (${scale}x scale → ${project.width * scale}x${project.height * scale}px)\nLayers: ${project.layers.filter(l => l.visible).length} visible of ${project.layers.length}\n\nUse Read tool to view this PNG file visually.`,
      },
    ],
  };
}
