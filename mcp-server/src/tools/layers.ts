import { getProject, addLayer as addLayerToProject } from '../project.js';

export interface AddLayerArgs {
  projectId: string;
  name: string;
  position?: number;
}

export interface SetActiveLayerArgs {
  projectId: string;
  layerId: string;
}

export function handleAddLayer(args: AddLayerArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const layer = addLayerToProject(project, args.name, args.position);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({
          layerId: layer.id,
          name: layer.name,
          position: project.layers.indexOf(layer),
          totalLayers: project.layers.length,
          allLayers: project.layers.map(l => ({ id: l.id, name: l.name })),
        }, null, 2),
      },
    ],
  };
}

export function handleSetActiveLayer(args: SetActiveLayerArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const layer = project.layers.find(l => l.id === args.layerId);
  if (!layer) {
    return { content: [{ type: 'text' as const, text: `Error: Layer "${args.layerId}" not found` }], isError: true };
  }

  project.activeLayerId = args.layerId;

  return {
    content: [{ type: 'text' as const, text: `Active layer set to "${layer.name}" (${layer.id})` }],
  };
}
