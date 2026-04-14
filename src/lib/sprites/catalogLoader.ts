/**
 * Fetch + cache sprite library data from /sprites/ static files.
 * Three tiers: catalog (instant), category data (lazy per category).
 */

import type { SpriteCatalog, CategoryData } from './types';

let catalogCache: SpriteCatalog | null = null;
const categoryDataCache = new Map<string, CategoryData>();
const MAX_CACHED_CATEGORIES = 8;

export async function loadCatalog(): Promise<SpriteCatalog> {
  if (catalogCache) return catalogCache;
  const res = await fetch('/sprites/catalog.json');
  if (!res.ok) throw new Error(`Failed to load sprite catalog: ${res.status}`);
  catalogCache = await res.json() as SpriteCatalog;
  return catalogCache;
}

export async function loadCategoryData(slug: string): Promise<CategoryData> {
  const cached = categoryDataCache.get(slug);
  if (cached) return cached;

  const res = await fetch(`/sprites/data/${slug}.json`);
  if (!res.ok) throw new Error(`Failed to load category data: ${slug} (${res.status})`);
  const data = await res.json() as CategoryData;

  // LRU eviction
  if (categoryDataCache.size >= MAX_CACHED_CATEGORIES) {
    const oldest = categoryDataCache.keys().next().value;
    if (oldest) categoryDataCache.delete(oldest);
  }
  categoryDataCache.set(slug, data);
  return data;
}

export function getAtlasUrl(slug: string): string {
  return `/sprites/atlases/${slug}.png`;
}

export function getAtlasLayoutUrl(slug: string): string {
  return `/sprites/atlases/${slug}.json`;
}
