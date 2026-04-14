import type { ToolType, ITool } from '@/types/tool';
import { BrushTool } from './BrushTool';
import { EraserTool } from './EraserTool';
import { FillTool } from './FillTool';
import { ColorPickerTool } from './ColorPickerTool';
import { LineTool } from './LineTool';
import { RectTool } from './RectTool';
import { SelectTool } from './SelectTool';

class ToolRegistryClass {
  private tools: Map<ToolType, ITool> = new Map();

  constructor() {
    this.register(new BrushTool());
    this.register(new EraserTool());
    this.register(new FillTool());
    this.register(new ColorPickerTool());
    this.register(new LineTool());
    this.register(new RectTool());
    this.register(new SelectTool());
  }

  private register(tool: ITool): void {
    this.tools.set(tool.type, tool);
  }

  getTool(type: ToolType): ITool {
    const tool = this.tools.get(type);
    if (!tool) throw new Error(`Unknown tool: ${type}`);
    return tool;
  }

  getColorPickerTool(): ColorPickerTool {
    return this.tools.get('colorPicker') as ColorPickerTool;
  }
}

export const toolRegistry = new ToolRegistryClass();
