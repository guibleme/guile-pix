'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePlayerStatsStore } from '@/stores/usePlayerStatsStore';
import { loadCategoryData } from '@/lib/sprites/catalogLoader';
import { renderTemplate, resolveScheme } from '@/lib/sprites/templateRenderer';
import { getPlayerName, subscribePlayerName } from '@/lib/profile/playerIdentity';
import PixelIcon from '@/components/ui/PixelIcon';
import useI18n from '@/hooks/useI18n';
import { useDungeonStore } from '@/stores/useDungeonStore';

const CATEGORY_SLUG = 'rpg-ui-32';
const LEVEL_BADGE = 'rpg_level_badge_32';

export default function RpgStatusBar() {
  const { t } = useI18n();
  const level = usePlayerStatsStore((s) => s.level);

  const [playerName, setPlayerName] = useState(() => getPlayerName() ?? '');
  const [loaded, setLoaded] = useState(false);

  const levelIconRef = useRef<HTMLCanvasElement>(null);
  const badgeDataRef = useRef<{ imageData: ImageData; width: number; height: number } | null>(null);

  // Passive regen tick
  useEffect(() => {
    const id = window.setInterval(() => {
      usePlayerStatsStore.getState().tick();
    }, 10_000);
    return () => window.clearInterval(id);
  }, []);

  // Subscribe to player name
  useEffect(() => {
    return subscribePlayerName((next) => setPlayerName(next ?? ''));
  }, []);

  // Load level badge template
  useEffect(() => {
    let cancelled = false;

    loadCategoryData(CATEGORY_SLUG)
      .then((data) => {
        if (cancelled) return;
        const tpl = data.templates[LEVEL_BADGE];
        if (tpl) {
          const scheme = resolveScheme(LEVEL_BADGE, data.schemes);
          badgeDataRef.current = {
            imageData: renderTemplate(tpl, scheme),
            width: tpl.width,
            height: tpl.height,
          };
        }
        setLoaded(true);
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, []);

  // Paint badge
  useEffect(() => {
    if (!loaded) return;
    const canvas = levelIconRef.current;
    const badge = badgeDataRef.current;
    if (canvas && badge) {
      canvas.width = badge.width;
      canvas.height = badge.height;
      canvas.getContext('2d')!.putImageData(badge.imageData, 0, 0);
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <div className="flex items-center gap-2 opacity-40">
        <PixelIcon name="dog" size={13} />
        <span className="text-xs truncate max-w-[120px]">{playerName || t('menu.artist.fallback', 'Artist')}</span>
      </div>
    );
  }

  const BADGE_SIZE = 32;

  return (
    <div className="flex items-center gap-2">
      {/* Level badge */}
      <div className="relative flex items-center" title={`Lv.${level}`}>
        <canvas
          ref={levelIconRef}
          style={{ width: BADGE_SIZE, height: BADGE_SIZE, imageRendering: 'pixelated' as const }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white leading-none" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
          {level}
        </span>
      </div>

      {/* Player name */}
      <span className="text-xs text-muted truncate max-w-[100px] hidden sm:inline" title={playerName}>
        {playerName || t('menu.artist.fallback', 'Artist')}
      </span>

      {/* Monster Arena toggle */}
      <button
        onClick={() => {
          const s = useDungeonStore.getState();
          if (s.active) s.closeGame(); else s.openGame();
        }}
        className="ml-1 px-1.5 py-0.5 text-sm hover:bg-white/10 rounded transition-colors"
        title="Monster Arena"
      >
        &#9876;
      </button>
    </div>
  );
}
