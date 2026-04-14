import { createProject } from '../project.js';
import { getPalette } from '../palettes/builtIn.js';

export interface CreateSpriteArgs {
  width: number;
  height: number;
  name?: string;
  palette?: string;
}

export function handleCreateSprite(args: CreateSpriteArgs) {
  const width = Math.max(1, Math.min(1024, Math.round(args.width)));
  const height = Math.max(1, Math.min(1024, Math.round(args.height)));
  const name = args.name || 'Untitled Sprite';

  const project = createProject(width, height, name);

  if (args.palette) {
    const paletteData = getPalette(args.palette);
    if (paletteData) {
      project.palette = [...paletteData.colors];
    }
  }

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({
          projectId: project.id,
          name: project.name,
          width: project.width,
          height: project.height,
          layers: project.layers.map(l => ({ id: l.id, name: l.name })),
          activeLayerId: project.activeLayerId,
          palette: project.palette.length > 0 ? `${args.palette} (${project.palette.length} colors)` : 'none',
        }, null, 2),
      },
    ],
  };
}
