'use client';

import React, { useEffect, useMemo } from 'react';
import { useSpriteLibraryStore } from '@/stores/useSpriteLibraryStore';
import CategoryList from './CategoryList';
import SpriteThumbnailGrid from './SpriteThumbnailGrid';
import SpriteDetailView from './SpriteDetailView';
import PixelIcon from '@/components/ui/PixelIcon';

export default function SpriteLibraryPanel() {
  const catalogLoaded = useSpriteLibraryStore((s) => s.catalogLoaded);
  const catalogLoading = useSpriteLibraryStore((s) => s.catalogLoading);
  const categories = useSpriteLibraryStore((s) => s.categories);
  const allTemplates = useSpriteLibraryStore((s) => s.allTemplates);
  const searchQuery = useSpriteLibraryStore((s) => s.searchQuery);
  const sizeFilter = useSpriteLibraryStore((s) => s.sizeFilter);
  const activeCategory = useSpriteLibraryStore((s) => s.activeCategory);
  const selectedTemplateId = useSpriteLibraryStore((s) => s.selectedTemplateId);
  const loadCatalog = useSpriteLibraryStore((s) => s.loadCatalog);
  const setSearch = useSpriteLibraryStore((s) => s.setSearch);
  const setSizeFilter = useSpriteLibraryStore((s) => s.setSizeFilter);
  const selectCategory = useSpriteLibraryStore((s) => s.selectCategory);
  const selectTemplate = useSpriteLibraryStore((s) => s.selectTemplate);

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  // Filter templates by search and size
  const filteredTemplates = useMemo(() => {
    let result = allTemplates;
    if (activeCategory) {
      result = result.filter(t => t.category === activeCategory);
    }
    if (sizeFilter !== 'all') {
      result = result.filter(t => t.width === Number(sizeFilter));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allTemplates, activeCategory, sizeFilter, searchQuery]);

  // If a template is selected, show detail view
  if (selectedTemplateId) {
    return (
      <div className="flex flex-col h-full bg-surface/95 border border-border rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--ui-shadow)' }}>
        <SpriteDetailView />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-surface/95 border border-border rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--ui-shadow)' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b border-border backdrop-blur"
        style={{ backgroundImage: 'var(--ui-panel-header-gradient)' }}
      >
        <h3 className="text-xs font-semibold tracking-wide text-muted">Sprite Library</h3>
        <span className="text-[10px] text-muted tabular-nums">{allTemplates.length.toLocaleString()}</span>
      </div>

      {/* Search + filters */}
      <div className="px-2 py-2 space-y-2 border-b border-border">
        <div className="relative">
          <PixelIcon name="search" size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sprites..."
            className="w-full h-7 pl-7 pr-2 text-xs bg-background border border-border rounded-lg text-foreground outline-none focus:border-accent/50"
          />
        </div>
        <div className="flex gap-1">
          {(['all', '16', '32'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSizeFilter(f)}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-md border transition-colors ${
                sizeFilter === f
                  ? 'bg-accent/15 text-accent border-accent/30'
                  : 'border-border/50 text-muted hover:bg-surface-hover'
              }`}
            >
              {f === 'all' ? 'All' : `${f}x${f}`}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {catalogLoading && (
          <div className="flex items-center justify-center p-8">
            <span className="text-xs text-muted animate-pulse">Loading sprite library...</span>
          </div>
        )}

        {catalogLoaded && !activeCategory && (
          <CategoryList
            categories={searchQuery.trim()
              ? categories.filter(c => {
                  const q = searchQuery.toLowerCase();
                  // Show categories that match by name or have matching templates
                  if (c.label.toLowerCase().includes(q)) return true;
                  return allTemplates.some(t => t.category === c.slug && (
                    t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
                  ));
                })
              : categories
            }
            activeCategory={activeCategory}
            sizeFilter={sizeFilter}
            onSelect={(slug) => void selectCategory(slug)}
          />
        )}

        {catalogLoaded && activeCategory && (
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-border/50">
              <button
                type="button"
                onClick={() => void selectCategory(null)}
                className="text-[10px] text-accent hover:underline"
              >
                All
              </button>
              <span className="text-[10px] text-muted">/</span>
              <span className="text-[10px] text-foreground truncate">
                {categories.find(c => c.slug === activeCategory)?.emoji}{' '}
                {categories.find(c => c.slug === activeCategory)?.label}
              </span>
              <span className="ml-auto text-[10px] text-muted tabular-nums">
                {filteredTemplates.length}
              </span>
            </div>

            {filteredTemplates.length > 0 ? (
              <SpriteThumbnailGrid
                categorySlug={activeCategory}
                templates={filteredTemplates}
                selectedId={selectedTemplateId}
                onSelect={(id) => void selectTemplate(id)}
              />
            ) : (
              <div className="flex items-center justify-center p-8">
                <span className="text-xs text-muted">No sprites found</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
