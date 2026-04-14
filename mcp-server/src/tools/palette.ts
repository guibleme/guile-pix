import { getProject } from '../project.js';
import { getPalette, getPaletteNames, BUILT_IN_PALETTES } from '../palettes/builtIn.js';
import { isValidHex } from '../lib/colorUtils.js';

export interface SetPaletteArgs {
  projectId: string;
  colors?: string[];
  preset?: string;
}

export function handleSetPalette(args: SetPaletteArgs) {
  const project = getProject(args.projectId);
  if (!project) {
    return { content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found` }], isError: true };
  }

  if (args.preset) {
    const paletteData = getPalette(args.preset);
    if (!paletteData) {
      const available = getPaletteNames().join(', ');
      return {
        content: [{
          type: 'text' as const,
          text: `Error: Unknown palette "${args.preset}". Available: ${available}`,
        }],
        isError: true,
      };
    }
    project.palette = [...paletteData.colors];
    project.updatedAt = Date.now();
    return {
      content: [{
        type: 'text' as const,
        text: `Palette set to "${paletteData.name}" (${paletteData.colors.length} colors): ${paletteData.colors.join(', ')}`,
      }],
    };
  }

  if (args.colors && Array.isArray(args.colors)) {
    const valid = args.colors.filter(c => isValidHex(c));
    if (valid.length === 0) {
      return { content: [{ type: 'text' as const, text: 'Error: No valid hex colors provided' }], isError: true };
    }
    // Normalize to # prefix
    project.palette = valid.map(c => c.startsWith('#') ? c : `#${c}`);
    project.updatedAt = Date.now();
    return {
      content: [{
        type: 'text' as const,
        text: `Palette set to ${project.palette.length} custom colors: ${project.palette.join(', ')}`,
      }],
    };
  }

  // List available palettes
  const list = Object.entries(BUILT_IN_PALETTES)
    .map(([key, p]) => `  ${key}: ${p.name} (${p.colors.length} colors)`)
    .join('\n');
  return {
    content: [{
      type: 'text' as const,
      text: `Available palettes:\n${list}\n\nUse preset: "<name>" or colors: ["#hex", ...]`,
    }],
  };
}
