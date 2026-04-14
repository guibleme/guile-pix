export interface ProjectSettings {
  id: string;
  name: string;
  width: number;
  height: number;
  createdAt: number;
  updatedAt: number;
}

export type SpriteSize = 8 | 16 | 32 | 64 | 128;

export interface NewProjectOptions {
  name: string;
  width: number;
  height: number;
}
