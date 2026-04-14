'use client';

import { create } from 'zustand';
import type { CategoryMeta, CatalogEntry, SpriteTemplate, ColorScheme, CategoryData } from '@/lib/sprites/types';
import { loadCatalog, loadCategoryData } from '@/lib/sprites/catalogLoader';
import { resolveScheme } from '@/lib/sprites/templateRenderer';

interface SpriteLibraryState {
  // Catalog
  catalogLoaded: boolean;
  catalogLoading: boolean;
  categories: CategoryMeta[];
  allTemplates: CatalogEntry[];

  // Filters
  searchQuery: string;
  sizeFilter: 'all' | '16' | '32';
  activeCategory: string | null;

  // Category data (lazy loaded)
  loadedCategoryData: Record<string, CategoryData>;

  // Selection & customization
  selectedTemplateId: string | null;
  selectedTemplate: SpriteTemplate | null;
  selectedScheme: ColorScheme | null;
  customColors: Record<string, { shadow: string; base: string; highlight: string }>;

  // Actions
  loadCatalog: () => Promise<void>;
  setSearch: (q: string) => void;
  setSizeFilter: (f: 'all' | '16' | '32') => void;
  selectCategory: (slug: string | null) => Promise<void>;
  selectTemplate: (id: string) => Promise<void>;
  clearSelection: () => void;
  setCustomColor: (role: string, triad: { shadow: string; base: string; highlight: string }) => void;
  resetColors: () => void;
}

export const useSpriteLibraryStore = create<SpriteLibraryState>((set, get) => ({
  catalogLoaded: false,
  catalogLoading: false,
  categories: [],
  allTemplates: [],

  searchQuery: '',
  sizeFilter: 'all',
  activeCategory: null,

  loadedCategoryData: {},

  selectedTemplateId: null,
  selectedTemplate: null,
  selectedScheme: null,
  customColors: {},

  loadCatalog: async () => {
    if (get().catalogLoaded || get().catalogLoading) return;
    set({ catalogLoading: true });
    try {
      const catalog = await loadCatalog();
      set({
        catalogLoaded: true,
        catalogLoading: false,
        categories: catalog.categories,
        allTemplates: catalog.templates,
      });
    } catch {
      set({ catalogLoading: false });
    }
  },

  setSearch: (q) => set({ searchQuery: q }),
  setSizeFilter: (f) => set({ sizeFilter: f }),

  selectCategory: async (slug) => {
    set({ activeCategory: slug, selectedTemplateId: null, selectedTemplate: null, selectedScheme: null, customColors: {} });
    if (!slug) return;
    const loaded = get().loadedCategoryData;
    if (!loaded[slug]) {
      try {
        const data = await loadCategoryData(slug);
        set({ loadedCategoryData: { ...get().loadedCategoryData, [slug]: data } });
      } catch {
        // Category data failed to load
      }
    }
  },

  selectTemplate: async (id) => {
    const state = get();
    // Find which category this template belongs to
    const entry = state.allTemplates.find(t => t.id === id);
    if (!entry) return;

    // Ensure category data is loaded
    let catData = state.loadedCategoryData[entry.category];
    if (!catData) {
      try {
        catData = await loadCategoryData(entry.category);
        set({ loadedCategoryData: { ...get().loadedCategoryData, [entry.category]: catData } });
      } catch {
        return;
      }
    }

    const template = catData.templates[id] as SpriteTemplate | undefined;
    if (!template) return;

    const scheme = resolveScheme(id, catData.schemes as Record<string, ColorScheme>);

    set({
      selectedTemplateId: id,
      selectedTemplate: template,
      selectedScheme: scheme,
      customColors: {},
    });
  },

  clearSelection: () => set({
    selectedTemplateId: null,
    selectedTemplate: null,
    selectedScheme: null,
    customColors: {},
  }),

  setCustomColor: (role, triad) => set((s) => ({
    customColors: { ...s.customColors, [role]: triad },
  })),

  resetColors: () => set({ customColors: {} }),
}));
