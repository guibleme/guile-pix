'use client';

import React from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import { useCanvasStore } from '@/stores/useCanvasStore';
import { useToolStore } from '@/stores/useToolStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { usePersistenceStore } from '@/stores/usePersistenceStore';
import useI18n from '@/hooks/useI18n';

export default function StatusBar() {
  const { t } = useI18n();
  const { width, height } = useProjectStore((s) => s.project);
  const zoom = useCanvasStore((s) => s.zoom);
  const activeTool = useToolStore((s) => s.activeTool);
  const strokeStabilizer = useToolStore((s) => s.strokeStabilizer);
  const freehandAlgorithm = useToolStore((s) => s.freehandAlgorithm);
  const freehandTracePolicy = useToolStore((s) => s.freehandTracePolicy);
  const symmetryMode = useToolStore((s) => s.symmetryMode);
  const symmetryAxisX = useToolStore((s) => s.symmetryAxisX);
  const symmetryAxisY = useToolStore((s) => s.symmetryAxisY);
  const pressureEnabled = useToolStore((s) => s.pressureEnabled);
  const pressureAffectsSize = useToolStore((s) => s.pressureAffectsSize);
  const pressureAffectsOpacity = useToolStore((s) => s.pressureAffectsOpacity);
  const showTileGrid = useCanvasStore((s) => s.showTileGrid);
  const tileGridWidth = useCanvasStore((s) => s.tileGridWidth);
  const tileGridHeight = useCanvasStore((s) => s.tileGridHeight);
  const { activeFrameIndex, frames } = useTimelineStore();
  const isDirty = usePersistenceStore((s) => s.isDirty);
  const resolvedAxisX = Math.max(0, Math.min(width, symmetryAxisX ?? Math.floor(width / 2)));
  const resolvedAxisY = Math.max(0, Math.min(height, symmetryAxisY ?? Math.floor(height / 2)));
  const showsAxisX = symmetryMode === 'horizontal' || symmetryMode === 'both';
  const showsAxisY = symmetryMode === 'vertical' || symmetryMode === 'both';
  const isFreehand = activeTool === 'brush' || activeTool === 'eraser';
  const quickHint = isFreehand
    ? t('status.hint.freehand', 'Hold Shift for straight lines • Press ? for help')
    : t('status.hint.general', 'Press ? for keyboard shortcuts');

  const pressureLabel = pressureAffectsSize && pressureAffectsOpacity
    ? t('status.pressure.sizeFlow', 'size+flow')
    : pressureAffectsSize
      ? t('status.pressure.size', 'size')
      : pressureAffectsOpacity
        ? t('status.pressure.flow', 'flow')
        : t('status.pressure.active', 'active');

  const modeLabel = freehandAlgorithm === 'default'
    ? t('status.algorithm.normal', 'normal')
    : freehandAlgorithm;

  return (
    <div className="flex items-center h-6 bg-surface border-t border-border px-3 text-muted gap-4 no-select font-mono text-[10px]">
      <span className="px-1.5 py-0.5 bg-accent/20 text-accent border border-accent/40 rounded text-[9px] font-bold">BETA</span>
      <span>{width} × {height}</span>
      <span className={isDirty ? 'text-accent font-medium' : ''}>{isDirty ? t('status.modified', '• Modified') : t('status.saved', 'Saved')}</span>
      <span>{Math.round(zoom * 100)}%</span>
      <span className="capitalize">{activeTool}</span>
      {isFreehand && <span>{t('status.smooth', 'Smooth: {value}', { value: strokeStabilizer })}</span>}
      {isFreehand && <span>{t('status.mode', 'Mode: {value}', { value: modeLabel })}</span>}
      {isFreehand && freehandTracePolicy !== 'accumulate' && <span>{t('status.trace', 'Trace: {value}', { value: freehandTracePolicy })}</span>}
      {isFreehand && symmetryMode !== 'none' && <span>{t('status.mirror', 'Mirror: {value}', { value: symmetryMode })}</span>}
      {isFreehand && pressureEnabled && (
        <span>
          {t('status.pressure', 'Pressure: {value}', { value: pressureLabel })}
        </span>
      )}
      {isFreehand && showsAxisX && <span>{t('status.axisX', 'Axis X: {value}', { value: resolvedAxisX })}</span>}
      {isFreehand && showsAxisY && <span>{t('status.axisY', 'Axis Y: {value}', { value: resolvedAxisY })}</span>}
      {showTileGrid && <span className="text-accent">{t('status.tileGrid', 'Tile Grid: {w}×{h}', { w: tileGridWidth, h: tileGridHeight })}</span>}
      <span>{t('status.frameOf', 'Frame {current} of {total}', { current: activeFrameIndex + 1, total: frames.length })}</span>
      <span className="ml-auto text-muted/60">{quickHint}</span>
    </div>
  );
}
