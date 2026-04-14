import { getProject, undo as undoProject, redo as redoProject } from '../project.js';

export interface UndoArgs {
  projectId: string;
}

export function handleUndo(args: UndoArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const success = undoProject(project);
  if (!success) {
    return { content: [{ type: 'text' as const, text: 'Nothing to undo' }] };
  }

  return {
    content: [{ type: 'text' as const, text: `Undo successful (${project.undoStack.length} steps remaining)` }],
  };
}

export function handleRedo(args: UndoArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  const success = redoProject(project);
  if (!success) {
    return { content: [{ type: 'text' as const, text: 'Nothing to redo' }] };
  }

  return {
    content: [{ type: 'text' as const, text: `Redo successful (${project.redoStack.length} steps remaining)` }],
  };
}
