export interface SpriteRegion {
  name: string;
  role: string;
  tone?: 'shadow' | 'base' | 'highlight';
  pixels: [number, number][];
}

export interface SpriteTemplate {
  name: string;
  width: number;
  height: number;
  description: string;
  regions: SpriteRegion[];
}

export interface ColorScheme {
  name: string;
  mapping: Record<string, { shadow: string; base: string; highlight: string }>;
}

export interface CatalogEntry {
  id: string;
  name: string;
  category: string;
  width: number;
  height: number;
  roles: string[];
  description: string;
}

export interface CategoryMeta {
  slug: string;
  label: string;
  emoji: string;
  count: number;
  sizes: number[];
}

export interface SpriteCatalog {
  categories: CategoryMeta[];
  templates: CatalogEntry[];
}

export interface CategoryData {
  templates: Record<string, SpriteTemplate>;
  schemes: Record<string, ColorScheme>;
}
