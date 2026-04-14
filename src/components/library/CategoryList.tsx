'use client';

import React from 'react';
import type { CategoryMeta } from '@/lib/sprites/types';

interface CategoryListProps {
  categories: CategoryMeta[];
  activeCategory: string | null;
  sizeFilter: 'all' | '16' | '32';
  onSelect: (slug: string) => void;
}

export default function CategoryList({ categories, activeCategory, sizeFilter, onSelect }: CategoryListProps) {
  const filtered = sizeFilter === 'all'
    ? categories
    : categories.filter(c => c.sizes.includes(Number(sizeFilter)));

  const total = filtered.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-2 py-1">
        <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Categories</span>
        <span className="text-[10px] text-muted tabular-nums">{total.toLocaleString()}</span>
      </div>
      <div className="space-y-0.5 pr-1">
        {filtered.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => onSelect(cat.slug)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-xs transition-colors ${
              activeCategory === cat.slug
                ? 'bg-accent/15 text-accent border border-accent/20'
                : 'hover:bg-surface-hover border border-transparent'
            }`}
          >
            <span className="text-sm shrink-0">{cat.emoji}</span>
            <span className="flex-1 truncate">{cat.label}</span>
            <span className="text-[10px] text-muted tabular-nums shrink-0">({cat.count})</span>
            <div className="flex gap-0.5 shrink-0">
              {cat.sizes.map((s) => (
                <span
                  key={s}
                  className={`text-[9px] px-1 rounded font-medium ${
                    s === 16 ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
