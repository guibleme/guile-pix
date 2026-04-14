'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { CatalogEntry } from '@/lib/sprites/types';
import { getAtlasUrl, getAtlasLayoutUrl } from '@/lib/sprites/catalogLoader';

interface AtlasEntry {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface SpriteThumbnailGridProps {
  categorySlug: string;
  templates: CatalogEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function SpriteThumbnailGrid({ categorySlug, templates, selectedId, onSelect }: SpriteThumbnailGridProps) {
  const [atlasLayout, setAtlasLayout] = useState<AtlasEntry[]>([]);
  const [atlasLoaded, setAtlasLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAtlasLoaded(false);
    setAtlasLayout([]);

    // Load atlas layout
    fetch(getAtlasLayoutUrl(categorySlug))
      .then(r => r.json())
      .then((layout: AtlasEntry[]) => setAtlasLayout(layout))
      .catch(() => {});

    // Preload atlas image
    const img = new Image();
    img.src = getAtlasUrl(categorySlug);
    img.onload = () => {
      imgRef.current = img;
      setAtlasLoaded(true);
    };
  }, [categorySlug]);

  if (!atlasLoaded || atlasLayout.length === 0) {
    // Loading skeleton
    return (
      <div className="grid grid-cols-5 gap-1 p-1">
        {Array.from({ length: Math.min(templates.length, 20) }).map((_, i) => (
          <div key={i} className="aspect-square rounded-md bg-surface-hover/50 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="grid grid-cols-5 gap-1 p-1">
      {templates.map((t) => {
        const entry = atlasLayout.find(a => a.id === t.id);
        const isSelected = selectedId === t.id;

        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            className={`group relative aspect-square rounded-lg overflow-hidden border transition-all ${
              isSelected
                ? 'border-accent ring-1 ring-accent/30 scale-105 z-10'
                : 'border-border/30 hover:border-accent/50 hover:scale-105'
            }`}
            title={t.name}
            style={{
              background: 'repeating-conic-gradient(#2a2a3e 0% 25%, #232336 0% 50%) 50% / 8px 8px',
            }}
          >
            {entry && imgRef.current && (
              <AtlasThumbnail
                img={imgRef.current}
                sx={entry.x}
                sy={entry.y}
                sw={entry.w}
                sh={entry.h}
              />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[8px] text-white/90 truncate block">{t.name.replace(/_16$|_32$/, '').replace(/_/g, ' ')}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function AtlasThumbnail({ img, sx, sy, sw, sh }: { img: HTMLImageElement; sx: number; sy: number; sw: number; sh: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
  }, [img, sx, sy, sw, sh]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
