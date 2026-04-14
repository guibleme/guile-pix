/**
 * draw_smooth_shape tool — progressive-width curve drawing for pixel art.
 */

import {
  getProject, getLayer, pushUndo,
  type McpProject, type McpLayer,
} from '../project.js';
import { type RGBA } from '../lib/pixelBuffer.js';
import { hexToRgba } from '../lib/colorUtils.js';

export function handleDrawSmoothShape(args: {
  projectId: string;
  layer?: string;
  centerX: number;
  startY: number;
  widths: number[];
  color: string;
  filled?: boolean;
  outline?: boolean;
}) {
  const project = getProject(args.projectId);
  if (!project) {
    return {
      content: [{ type: 'text' as const, text: `Error: Project "${args.projectId}" not found.` }],
    };
  }

  const layer = args.layer
    ? project.layers.find(l => l.id === args.layer || l.name === args.layer)
    : project.layers.find(l => l.id === project.activeLayerId);

  if (!layer) {
    return {
      content: [{ type: 'text' as const, text: `Error: Layer not found.` }],
    };
  }

  if (layer.locked) {
    return {
      content: [{ type: 'text' as const, text: `Error: Layer "${layer.name}" is locked.` }],
    };
  }

  const rgba = hexToRgba(args.color);
  if (!rgba) {
    return {
      content: [{ type: 'text' as const, text: `Error: Invalid color "${args.color}".` }],
    };
  }

  const filled = args.filled !== false; // default true
  const outlineOnly = args.outline === true;

  // Save undo
  pushUndo(project, [{ layerId: layer.id, data: new Uint8ClampedArray(layer.buffer.data) }]);

  let pixelCount = 0;
  const centerX = args.centerX;
  const startY = args.startY;

  for (let i = 0; i < args.widths.length; i++) {
    const w = args.widths[i];
    if (w <= 0) continue;

    const y = startY + i;
    if (y < 0 || y >= project.height) continue;

    const left = Math.round(centerX - w / 2);
    const right = left + w - 1;

    if (outlineOnly) {
      // Draw only the left and right edge pixels
      if (left >= 0 && left < project.width) {
        layer.buffer.setPixel(left, y, rgba);
        pixelCount++;
      }
      if (right >= 0 && right < project.width && right !== left) {
        layer.buffer.setPixel(right, y, rgba);
        pixelCount++;
      }
      // Also draw top/bottom edge rows fully
      const isTopRow = i === 0 || args.widths[i - 1] <= 0;
      const isBottomRow = i === args.widths.length - 1 || args.widths[i + 1] <= 0;
      if (isTopRow || isBottomRow) {
        for (let x = left; x <= right; x++) {
          if (x >= 0 && x < project.width) {
            layer.buffer.setPixel(x, y, rgba);
            pixelCount++;
          }
        }
      }
    } else if (filled) {
      // Fill entire row
      for (let x = left; x <= right; x++) {
        if (x >= 0 && x < project.width) {
          layer.buffer.setPixel(x, y, rgba);
          pixelCount++;
        }
      }
    }
  }

  project.updatedAt = Date.now();

  return {
    content: [{
      type: 'text' as const,
      text: `Drew smooth shape: ${args.widths.length} rows, ${pixelCount} pixels set. Center X=${centerX}, start Y=${startY}, widths=[${args.widths.join(',')}].`,
    }],
  };
}
