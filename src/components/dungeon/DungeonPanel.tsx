'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDungeonStore } from '@/stores/useDungeonStore';
import { usePlayerStatsStore } from '@/stores/usePlayerStatsStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useUIStore } from '@/stores/useUIStore';
import useI18n from '@/hooks/useI18n';
import { loadCategoryData } from '@/lib/sprites/catalogLoader';
import { renderTemplate, resolveScheme } from '@/lib/sprites/templateRenderer';
import { PixelBuffer } from '@/lib/canvas/PixelBuffer';
import type { CategoryData } from '@/lib/sprites/types';

const CREATURE_SLUG = 'dungeon-creatures-32';
const RPG_UI_SLUG = 'rpg-ui-32';
const PLAYER_SPRITE_SRC = '/sprites/player-warrior.png';

// ─── Bar templates ──────────────────────────────────────────
const PLAYER_BAR_FULL = 'boss_hp_bar_full_32';
const PLAYER_BAR_EMPTY = 'boss_hp_bar_empty_32';
const ENEMY_BAR_FULL = 'boss_hp_bar_full_32';
const ENEMY_BAR_EMPTY = 'boss_hp_bar_empty_32';

// ─── Display sizes ──────────────────────────────────────────
const BAR_SIZE = 48;
const ICON_SM = 18;
const FRAME_SIZE = 68;

// ─── Types ──────────────────────────────────────────────────
interface RenderedBar {
  fullData: ImageData;
  emptyData: ImageData;
  w: number;
  h: number;
}

interface RenderedAsset {
  data: ImageData;
  w: number;
  h: number;
}

// ─── Helpers ────────────────────────────────────────────────
function renderFromCategory(
  catData: CategoryData,
  name: string,
  customColors?: Record<string, { shadow: string; base: string; highlight: string }>,
): RenderedAsset | null {
  const tpl = catData.templates[name];
  if (!tpl) return null;
  const scheme = resolveScheme(name, catData.schemes);
  return { data: renderTemplate(tpl, scheme, customColors), w: tpl.width, h: tpl.height };
}

function paintBar(canvas: HTMLCanvasElement, bar: RenderedBar, pct: number): void {
  const { w, h, fullData, emptyData } = bar;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.putImageData(emptyData, 0, 0);
  const clip = Math.round(w * Math.max(0, Math.min(1, pct)));
  if (clip > 0) {
    const tmp = document.createElement('canvas');
    tmp.width = w; tmp.height = h;
    tmp.getContext('2d')!.putImageData(fullData, 0, 0);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, clip, h);
    ctx.clip();
    ctx.drawImage(tmp, 0, 0);
    ctx.restore();
  }
}

function paintAsset(canvas: HTMLCanvasElement | null, asset: RenderedAsset | null): void {
  if (!canvas || !asset) return;
  canvas.width = asset.w;
  canvas.height = asset.h;
  canvas.getContext('2d')!.putImageData(asset.data, 0, 0);
}

// ─── Composite current editor sprite (proven export pattern) ─
function compositeCurrentSprite(): string | null {
  const { project } = useProjectStore.getState();
  const { layers } = useLayerStore.getState();
  const ts = useTimelineStore.getState();
  const frame = ts.frames[ts.activeFrameIndex];
  if (!frame) return null;

  const { width, height } = project;
  if (width <= 0 || height <= 0) return null;

  // Use the exact same compositing as exportPng (renderFrameToCanvas)
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  let hasContent = false;

  for (const layer of layers) {
    if (!layer.visible) continue;
    const raw = frame.layerData[layer.id];
    if (!raw) continue;

    // Check for any non-transparent pixel
    if (!hasContent) {
      for (let i = 3; i < raw.length; i += 4) {
        if (raw[i] > 0) { hasContent = true; break; }
      }
    }

    const buf = new PixelBuffer(width, height, raw);
    const tmp = document.createElement('canvas');
    tmp.width = width;
    tmp.height = height;
    tmp.getContext('2d')!.putImageData(buf.toImageData(), 0, 0);

    ctx.globalAlpha = layer.opacity;
    ctx.drawImage(tmp, 0, 0);
    ctx.globalAlpha = 1;
  }

  if (!hasContent) return null;
  return canvas.toDataURL('image/png');
}

// ─── Component ──────────────────────────────────────────────
export default function DungeonPanel() {
  const active = useDungeonStore((s) => s.active);
  const floor = useDungeonStore((s) => s.floor);
  const killsOnFloor = useDungeonStore((s) => s.killsOnFloor);
  const totalKills = useDungeonStore((s) => s.totalKills);
  const totalGold = useDungeonStore((s) => s.totalGold);
  const highestFloor = useDungeonStore((s) => s.highestFloor);
  const enemyDef = useDungeonStore((s) => s.enemyDef);
  const enemyHp = useDungeonStore((s) => s.enemyHp);
  const enemyMaxHp = useDungeonStore((s) => s.enemyMaxHp);
  const log = useDungeonStore((s) => s.log);
  const gameOver = useDungeonStore((s) => s.gameOver);
  const streak = useDungeonStore((s) => s.streak);
  const soulPower = useDungeonStore((s) => s.soulPower);
  const playerSpriteDataUrl = useDungeonStore((s) => s.playerSpriteDataUrl);

  const hp = usePlayerStatsStore((s) => s.hp);
  const level = usePlayerStatsStore((s) => s.level);
  const maxHp = usePlayerStatsStore((s) => s.maxHp);
  const theme = useUIStore((s) => s.theme);
  const { t } = useI18n();
  const dark = theme === 'dark';

  // ─── Drag state ───────────────────────────────────────────
  const [pos, setPos] = useState({ x: -1, y: -1 });
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // ─── Stable individual canvas refs ────────────────────────
  const enemyCanvasRef = useRef<HTMLCanvasElement>(null);
  const playerBarRef = useRef<HTMLCanvasElement>(null);
  const enemyBarRef = useRef<HTMLCanvasElement>(null);
  const heartRef = useRef<HTMLCanvasElement>(null);
  const swordHdrRef = useRef<HTMLCanvasElement>(null);
  const swordEnRef = useRef<HTMLCanvasElement>(null);
  const coinRef = useRef<HTMLCanvasElement>(null);
  const starRef = useRef<HTMLCanvasElement>(null);
  // portrait frames removed — template is opaque, covers sprites
  const badgeRef = useRef<HTMLCanvasElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // ─── Pre-rendered data ────────────────────────────────────
  const playerBarData = useRef<RenderedBar | null>(null);
  const enemyBarData = useRef<RenderedBar | null>(null);
  const iconAssets = useRef<Record<string, RenderedAsset | null>>({});
  const frameAssets = useRef<Record<string, RenderedAsset | null>>({});

  const [creatureData, setCreatureData] = useState<CategoryData | null>(null);
  const [uiLoaded, setUiLoaded] = useState(false);
  const [shakeEnemy, setShakeEnemy] = useState(false);
  const [shakePlayer, setShakePlayer] = useState(false);
  const [charFeedback, setCharFeedback] = useState('');
  const prevEnemyHpRef = useRef(enemyHp);
  const prevPlayerHpRef = useRef(hp);

  // ─── Load all data ────────────────────────────────────────
  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    Promise.all([
      loadCategoryData(RPG_UI_SLUG),
      loadCategoryData(CREATURE_SLUG),
    ]).then(([ui, creatures]) => {
      if (cancelled) return;

      // Bars — both use boss_hp_bar (bright red, visible on dark bg)
      for (const [key, fullName, emptyName] of [
        ['player', PLAYER_BAR_FULL, PLAYER_BAR_EMPTY],
        ['enemy', ENEMY_BAR_FULL, ENEMY_BAR_EMPTY],
      ] as const) {
        const full = renderFromCategory(ui, fullName);
        const empty = renderFromCategory(ui, emptyName);
        if (full && empty) {
          const ref = key === 'player' ? playerBarData : enemyBarData;
          ref.current = { fullData: full.data, emptyData: empty.data, w: full.w, h: full.h };
        }
      }

      // Icons
      iconAssets.current.heart = renderFromCategory(ui, 'rpg_heart_icon_32');
      iconAssets.current.sword = renderFromCategory(ui, 'rpg_sword_icon_32');
      iconAssets.current.coin = renderFromCategory(ui, 'rpg_coin_icon_32');
      iconAssets.current.star = renderFromCategory(ui, 'rpg_star_icon_32');

      // Frames
      frameAssets.current.portrait = renderFromCategory(ui, 'portrait_frame_32');
      frameAssets.current.badge = renderFromCategory(ui, 'rpg_level_badge_32');

      setCreatureData(creatures);
      setUiLoaded(true);
    }).catch(() => {});

    return () => { cancelled = true; };
  }, [active]);

  // ─── Paint enemy sprite (stable ref) ─────────────────────
  useEffect(() => {
    const canvas = enemyCanvasRef.current;
    if (!creatureData || !enemyDef || !canvas) return;
    const tpl = creatureData.templates[enemyDef.id];
    if (!tpl) return;
    const scheme = resolveScheme(enemyDef.id, creatureData.schemes);
    const img = renderTemplate(tpl, scheme);
    canvas.width = tpl.width;
    canvas.height = tpl.height;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.putImageData(img, 0, 0);
  }, [creatureData, enemyDef]);

  // ─── Paint static UI once after load ─────────────────────
  useEffect(() => {
    if (!uiLoaded) return;
    paintAsset(heartRef.current, iconAssets.current.heart ?? null);
    paintAsset(swordHdrRef.current, iconAssets.current.sword ?? null);
    paintAsset(swordEnRef.current, iconAssets.current.sword ?? null);
    paintAsset(coinRef.current, iconAssets.current.coin ?? null);
    paintAsset(starRef.current, iconAssets.current.star ?? null);
    // portrait frames not used (opaque template covers sprites)
    paintAsset(badgeRef.current, frameAssets.current.badge ?? null);
  }, [uiLoaded]);

  // ─── Update HP bars ──────────────────────────────────────
  useEffect(() => {
    if (!uiLoaded) return;
    const mhp = maxHp();
    if (playerBarData.current && playerBarRef.current)
      paintBar(playerBarRef.current, playerBarData.current, mhp > 0 ? hp / mhp : 0);
    if (enemyBarData.current && enemyBarRef.current)
      paintBar(enemyBarRef.current, enemyBarData.current, enemyMaxHp > 0 ? enemyHp / enemyMaxHp : 0);
  }, [uiLoaded, hp, maxHp, enemyHp, enemyMaxHp]);

  // ─── Scroll log ──────────────────────────────────────────
  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [log]);

  // ─── Shake animations ───────────────────────────────────
  useEffect(() => {
    if (enemyHp < prevEnemyHpRef.current && enemyHp > 0) {
      setShakeEnemy(true);
      const t = setTimeout(() => setShakeEnemy(false), 200);
      prevEnemyHpRef.current = enemyHp;
      return () => clearTimeout(t);
    }
    prevEnemyHpRef.current = enemyHp;
  }, [enemyHp]);

  useEffect(() => {
    if (hp < prevPlayerHpRef.current) {
      setShakePlayer(true);
      const t = setTimeout(() => setShakePlayer(false), 200);
      prevPlayerHpRef.current = hp;
      return () => clearTimeout(t);
    }
    prevPlayerHpRef.current = hp;
  }, [hp]);

  // ─── Drag handlers ──────────────────────────────────────
  const onDragStart = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const curX = pos.x === -1 ? rect.left : pos.x;
    const curY = pos.y === -1 ? rect.top : pos.y;
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: curX, oy: curY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos]);

  const onDragMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    setPos({ x: d.ox + e.clientX - d.sx, y: d.oy + e.clientY - d.sy });
  }, []);

  const onDragEnd = useCallback(() => { dragRef.current = null; }, []);

  // ─── Set Character ───────────────────────────────────────
  const handleSetCharacter = useCallback(() => {
    const dataUrl = compositeCurrentSprite();
    if (!dataUrl) {
      setCharFeedback(t('dungeon.drawFirst', 'Draw something first!'));
      setTimeout(() => setCharFeedback(''), 2000);
      return;
    }
    const { project } = useProjectStore.getState();
    useDungeonStore.getState().setPlayerSprite(dataUrl, project.width, project.height);
    setCharFeedback(t('dungeon.charSet', 'Character set!'));
    setTimeout(() => setCharFeedback(''), 2000);
  }, [t]);

  if (!active) return null;

  const currentMaxHp = maxHp();
  const potCost = useDungeonStore.getState().getPotionCost();
  const px: React.CSSProperties = { imageRendering: 'pixelated' };

  const posStyle: React.CSSProperties = pos.x === -1
    ? { position: 'fixed', bottom: 16, right: 16 }
    : { position: 'fixed', left: pos.x, top: pos.y };

  // ─── Theme-adaptive colors ─────────────────────────────
  const c = dark ? {
    panelBg: '#1a1520', headerBg: '#2a2030', border: '#4e4a4e',
    frameBg: '#0e0a12', frameBorder: '#854c30',
    title: '#deeed6', sub: '#8595a1', muted: '#757161', sep: '#4e4a4e',
    gold: '#dad45e', hp: '#6dc2ca', enemy: '#d04648', crit: '#d27d2c',
    boss: '#597dce', soul: '#597dce', streak: '#d27d2c', drop: '#6dc2ca',
    logBg: '#0e0a12', logDefault: '#757161',
    btnAttackBg: '#854c30', btnAttackHover: '#d27d2c',
    btnPotionBg: '#346524', btnPotionHover: '#6dc2ca',
    btnCharBg: '#30346d', btnCharHover: '#597dce',
    btnText: '#deeed6', gameOverBg: 'rgba(0,0,0,0.85)',
    feedbackBg: 'rgba(109,194,202,0.1)',
    retryBg: '#d27d2c', retryHover: '#dad45e', retryText: '#140c1c',
  } : {
    panelBg: '#f8f6f4', headerBg: '#ece6f4', border: '#d4cbea',
    frameBg: '#f0ecf8', frameBorder: '#b89a6a',
    title: '#1a1528', sub: '#7b6e9e', muted: '#9b8ec4', sep: '#d4cbea',
    gold: '#a88a10', hp: '#0e8a8a', enemy: '#c03030', crit: '#c06010',
    boss: '#4060b0', soul: '#4060b0', streak: '#c06010', drop: '#0e8a8a',
    logBg: '#f0ecf8', logDefault: '#9b8ec4',
    btnAttackBg: '#c08040', btnAttackHover: '#e8a050',
    btnPotionBg: '#40884c', btnPotionHover: '#60b070',
    btnCharBg: '#5060a8', btnCharHover: '#7080cc',
    btnText: '#ffffff', gameOverBg: 'rgba(0,0,0,0.70)',
    feedbackBg: 'rgba(14,138,138,0.1)',
    retryBg: '#e8a050', retryHover: '#f0c070', retryText: '#1a1528',
  };

  function logColor(msg: string): string {
    if (msg.startsWith('★')) return c.drop;
    if (msg.startsWith('🔥')) return c.streak;
    if (msg.startsWith('Soul Power')) return c.soul;
    if (msg.startsWith('Defeated') || msg.startsWith('---')) return c.gold;
    if (msg.includes('CRIT')) return c.crit;
    if (msg.includes('hits you')) return c.enemy;
    if (msg.startsWith('BOSS') || msg.includes('appears')) return c.boss;
    if (msg.includes('Potion') || msg.includes('+')) return c.hp;
    return c.logDefault;
  }

  function logBold(msg: string): boolean {
    return msg.startsWith('★') || msg.startsWith('🔥') || msg.startsWith('Soul Power')
      || msg.startsWith('Defeated') || msg.startsWith('---') || msg.includes('CRIT');
  }

  return (
    <div
      ref={panelRef}
      className="z-50 flex flex-col rounded overflow-hidden shadow-2xl"
      style={{ ...posStyle, width: 340, maxHeight: 540, background: c.panelBg, border: `2px solid ${c.border}` }}
    >
      {/* ── Header / drag handle ───────────────────────────── */}
      <div
        className="flex items-center justify-between px-3 py-1.5 select-none"
        style={{ background: c.headerBg, borderBottom: `1px solid ${c.border}`, cursor: dragRef.current ? 'grabbing' : 'grab' }}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <div className="flex items-center gap-2 pointer-events-none">
          <canvas ref={swordHdrRef} style={{ width: ICON_SM, height: ICON_SM, ...px }} />
          <span className="text-xs font-bold" style={{ color: c.title }}>{t('dungeon.title', 'Monster Arena')}</span>
          <span className="text-[10px]" style={{ color: c.sub }}>F{floor}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 pointer-events-none">
            <canvas ref={coinRef} style={{ width: 14, height: 14, ...px }} />
            <span className="text-[10px] font-bold" style={{ color: c.gold }}>{totalGold}g</span>
          </div>
          <button
            onClick={() => useDungeonStore.getState().closeGame()}
            className="text-base leading-none px-1 transition-colors"
            style={{ color: c.sub }}
            title={t('dungeon.close', 'Close')}
          >&times;</button>
        </div>
      </div>

      {/* ── Battle Scene ───────────────────────────────────── */}
      <div className="flex items-start justify-center gap-3 px-3 pt-2 pb-1">
        {/* Player column */}
        <div className="flex flex-col items-center gap-0.5">
          <div
            className={`${shakePlayer ? 'animate-shake' : ''} rounded`}
            style={{ width: FRAME_SIZE, height: FRAME_SIZE, display: 'flex', alignItems: 'center', justifyContent: 'center', background: c.frameBg, border: `2px solid ${c.frameBorder}` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={playerSpriteDataUrl ?? PLAYER_SPRITE_SRC}
              alt="Player"
              width={FRAME_SIZE - 8}
              height={FRAME_SIZE - 8}
              style={{ ...px, objectFit: 'contain' }}
            />
          </div>
          <span className="text-[9px] font-bold" style={{ color: c.title }}>Lv.{level}</span>
          <div className="flex items-center gap-1">
            <canvas ref={heartRef} style={{ width: ICON_SM, height: ICON_SM, ...px }} />
            <span className="text-[9px] font-bold" style={{ color: c.hp }}>HP</span>
          </div>
          <div className="relative" style={{ width: BAR_SIZE, height: BAR_SIZE }}>
            <canvas ref={playerBarRef} style={{ width: BAR_SIZE, height: BAR_SIZE, ...px }} />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white" style={{ textShadow: '0 1px 3px #000, 0 0 4px #000' }}>
              {hp}/{currentMaxHp}
            </span>
          </div>
        </div>

        {/* VS */}
        <div className="flex items-center pt-6">
          <span className="text-xs font-bold" style={{ color: c.sep }}>{t('dungeon.vs', 'VS')}</span>
        </div>

        {/* Enemy column */}
        <div className="flex flex-col items-center gap-0.5">
          <div
            className={`${shakeEnemy ? 'animate-shake' : ''} rounded`}
            style={{ width: FRAME_SIZE, height: FRAME_SIZE, display: 'flex', alignItems: 'center', justifyContent: 'center', background: c.frameBg, border: `2px solid ${c.frameBorder}` }}
          >
            <canvas
              ref={enemyCanvasRef}
              style={{ width: FRAME_SIZE - 8, height: FRAME_SIZE - 8, ...px }}
            />
          </div>
          <span className="text-[9px] truncate max-w-[90px]" style={{ color: c.title }}>{enemyDef?.name ?? '???'}</span>
          <div className="flex items-center gap-1">
            <canvas ref={swordEnRef} style={{ width: ICON_SM, height: ICON_SM, ...px }} />
            <span className="text-[9px] font-bold" style={{ color: c.enemy }}>EN</span>
          </div>
          <div className="relative" style={{ width: BAR_SIZE, height: BAR_SIZE }}>
            <canvas ref={enemyBarRef} style={{ width: BAR_SIZE, height: BAR_SIZE, ...px }} />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white" style={{ textShadow: '0 1px 3px #000, 0 0 4px #000' }}>
              {enemyHp}/{enemyMaxHp}
            </span>
          </div>
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────────────── */}
      <div className="px-3 py-0.5 flex items-center justify-center gap-3 text-[9px]" style={{ color: c.sub }}>
        <div className="relative flex items-center">
          <canvas ref={badgeRef} style={{ width: 22, height: 22, ...px }} />
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}>{level}</span>
        </div>
        <canvas ref={starRef} style={{ width: 14, height: 14, ...px }} />
        <span>{t('dungeon.kills', 'Kills {value}', { value: totalKills })}</span>
        <span style={{ color: c.sep }}>|</span>
        <span>{t('dungeon.bestFloor', 'Best F{value}', { value: highestFloor })}</span>
        <span style={{ color: c.sep }}>|</span>
        <span>{killsOnFloor}/5</span>
        {streak > 0 && <><span style={{ color: c.sep }}>|</span><span className="font-bold" style={{ color: c.streak }}>x{streak}</span></>}
        {soulPower > 0 && <><span style={{ color: c.sep }}>|</span><span className="font-bold" style={{ color: c.soul }}>{t('dungeon.soulLabel', 'Soul +{value}%', { value: Math.round(soulPower * 100) })}</span></>}
      </div>

      {/* ── Hint ───────────────────────────────────────────── */}
      <p className="text-[9px] italic text-center px-3 pb-0.5" style={{ color: c.muted }}>{t('dungeon.hint', 'Draw on the canvas to attack!')}</p>

      {/* ── Combat Log ─────────────────────────────────────── */}
      <div className="mx-3 mb-1 p-1.5 rounded" style={{ maxHeight: 80, overflowY: 'auto', background: c.logBg, border: `1px solid ${c.border}` }}>
        <div className="flex flex-col gap-px">
          {log.map((msg, i) => (
            <p key={i} className="text-[9px] leading-snug" style={{ color: logColor(msg), fontWeight: logBold(msg) ? 700 : 400 }}>&gt; {msg}</p>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>

      {/* ── Feedback ───────────────────────────────────────── */}
      {charFeedback && (
        <div className="mx-3 mb-1 text-center text-[9px] font-bold rounded py-0.5" style={{ color: c.hp, background: c.feedbackBg }}>
          {charFeedback}
        </div>
      )}

      {/* ── Buttons ────────────────────────────────────────── */}
      <div className="px-3 py-1.5 flex gap-2 justify-center" style={{ borderTop: `1px solid ${c.border}` }}>
        <button
          onClick={() => useDungeonStore.getState().attack()}
          disabled={gameOver}
          className="px-3 py-1 text-[10px] font-bold rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          style={{ background: c.btnAttackBg, color: c.btnText, border: `1px solid ${c.border}` }}
        >{t('dungeon.attack', 'Attack')}</button>
        <button
          onClick={() => useDungeonStore.getState().usePotion()}
          disabled={gameOver || totalGold < potCost}
          className="px-3 py-1 text-[10px] font-bold rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          style={{ background: c.btnPotionBg, color: c.btnText, border: `1px solid ${c.border}` }}
          title={t('dungeon.potionTitle', 'Heal (costs {cost}g)', { cost: potCost })}
        >{t('dungeon.potion', 'Potion {cost}g', { cost: potCost })}</button>
        <button
          onClick={handleSetCharacter}
          className="px-3 py-1 text-[10px] font-bold rounded transition-colors"
          style={{ background: c.btnCharBg, color: c.btnText, border: `1px solid ${c.border}` }}
          title={t('dungeon.setCharTitle', 'Capture current sprite as your character')}
        >{t('dungeon.setChar', 'Set Char')}</button>
      </div>

      {/* ── Game Over ──────────────────────────────────────── */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ zIndex: 10, background: c.gameOverBg }}>
          <p className="text-lg font-bold" style={{ color: c.enemy }}>{t('dungeon.gameOver', 'Game Over')}</p>
          <p className="text-[10px]" style={{ color: c.sub }}>{t('dungeon.gameOverStats', 'Floor {floor} | {kills} kills | Best F{best}', { floor, kills: totalKills, best: highestFloor })}</p>
          <p className="text-[10px] font-bold" style={{ color: c.soul }}>{t('dungeon.soulGained', 'Soul Power +{value}% this run', { value: Math.round(floor * 2) })}</p>
          <button
            onClick={() => useDungeonStore.getState().restart()}
            className="px-4 py-1.5 text-xs font-bold transition-colors rounded"
            style={{ background: c.retryBg, color: c.retryText }}
          >{t('dungeon.tryAgain', 'Try Again')}</button>
        </div>
      )}

      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
        .animate-shake { animation: shake .2s ease-in-out; }
      `}</style>
    </div>
  );
}
