export type ExportFormat = 'png' | 'spritesheet' | 'gif' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  scale: number;
  includeAllFrames: boolean;
  spritesheetColumns?: number;
  gifLoop?: boolean;
  backgroundColor?: string;
}
