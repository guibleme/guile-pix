'use client';

import React from 'react';
import { useToolStore } from '@/stores/useToolStore';
import { useProjectStore } from '@/stores/useProjectStore';
import {
  TOOL_LIST,
  MAX_BRUSH_SIZE,
  MAX_STROKE_STABILIZER,
  FREEHAND_ALGORITHM_LIST,
  FREEHAND_TRACE_POLICY_LIST,
  MIN_PRESSURE_OPACITY_MIN_PERCENT,
  MAX_PRESSURE_OPACITY_MIN_PERCENT,
  MIN_PRESSURE_SIZE_MIN_PERCENT,
  MAX_PRESSURE_SIZE_MIN_PERCENT,
} from '@/constants/tools';
import Panel from '@/components/ui/Panel';
import Slider from '@/components/ui/Slider';
import PixelIcon from '@/components/ui/PixelIcon';
import type { PixelIconName } from '@/constants/pixelIcons';
import type { SymmetryMode, ToolType } from '@/types/tool';
import useI18n from '@/hooks/useI18n';

const SYMMETRY_MODES: Array<{ value: SymmetryMode; label: string }> = [
  { value: 'none', label: 'None' },
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' },
  { value: 'both', label: 'Both' },
];

type PressureModeValue = 'off' | 'size' | 'opacity' | 'sizeOpacity';

function resolvePressureMode(
  enabled: boolean,
  affectsSize: boolean,
  affectsOpacity: boolean
): PressureModeValue {
  if (!enabled) return 'off';
  if (affectsSize && affectsOpacity) return 'sizeOpacity';
  if (affectsSize) return 'size';
  if (affectsOpacity) return 'opacity';
  return 'off';
}

export default function ToolPanel() {
  const { t } = useI18n();
  const {
    activeTool,
    setTool,
    brushSize,
    setBrushSize,
    brushShape,
    setBrushShape,
    strokeStabilizer,
    setStrokeStabilizer,
    freehandAlgorithm,
    setFreehandAlgorithm,
    freehandTracePolicy,
    setFreehandTracePolicy,
    symmetryMode,
    setSymmetryMode,
    symmetryAxisX,
    symmetryAxisY,
    setSymmetryAxisX,
    setSymmetryAxisY,
    pressureEnabled,
    pressureAffectsSize,
    pressureAffectsOpacity,
    pressureSizeMinPercent,
    pressureOpacityMinPercent,
    setPressureEnabled,
    setPressureAffectsSize,
    setPressureAffectsOpacity,
    setPressureSizeMinPercent,
    setPressureOpacityMinPercent,
  } = useToolStore();

  const { width, height } = useProjectStore((s) => s.project);
  const isFreehandTool = activeTool === 'brush' || activeTool === 'eraser';
  const resolvedAxisX = Math.max(0, Math.min(width, symmetryAxisX ?? Math.floor(width / 2)));
  const resolvedAxisY = Math.max(0, Math.min(height, symmetryAxisY ?? Math.floor(height / 2)));
  const showsAxisX = symmetryMode === 'horizontal' || symmetryMode === 'both';
  const showsAxisY = symmetryMode === 'vertical' || symmetryMode === 'both';
  const pressureMode = resolvePressureMode(pressureEnabled, pressureAffectsSize, pressureAffectsOpacity);

  const toolLabels: Record<ToolType, string> = {
    select: t('tools.tool.select', 'Select'),
    brush: t('tools.tool.brush', 'Brush'),
    eraser: t('tools.tool.eraser', 'Eraser'),
    fill: t('tools.tool.fill', 'Fill'),
    colorPicker: t('tools.tool.colorPicker', 'Color Picker'),
    line: t('tools.tool.line', 'Line'),
    rect: t('tools.tool.rect', 'Rectangle'),
  };

  const algorithmLabels: Record<string, string> = {
    default: t('tools.algorithm.default', 'Default'),
    pixelPerfect: t('tools.algorithm.pixelPerfect', 'Pixel Perfect'),
    dots: t('tools.algorithm.dots', 'Dots'),
  };

  const tracePolicyLabels: Record<string, string> = {
    accumulate: t('tools.trace.accumulate', 'Accumulate'),
    accumulateUpdateLast: t('tools.trace.accumulateUpdateLast', 'Update Last'),
  };

  const symmetryModeLabels: Record<SymmetryMode, string> = {
    none: t('tools.symmetry.none', 'None'),
    horizontal: t('tools.symmetry.horizontal', 'Horizontal'),
    vertical: t('tools.symmetry.vertical', 'Vertical'),
    both: t('tools.symmetry.both', 'Both'),
  };

  const setPressureMode = (mode: PressureModeValue) => {
    if (mode === 'off') {
      setPressureEnabled(false);
      setPressureAffectsSize(false);
      setPressureAffectsOpacity(false);
      return;
    }

    setPressureEnabled(true);
    if (mode === 'size') {
      setPressureAffectsSize(true);
      setPressureAffectsOpacity(false);
      return;
    }
    if (mode === 'opacity') {
      setPressureAffectsSize(false);
      setPressureAffectsOpacity(true);
      return;
    }
    setPressureAffectsSize(true);
    setPressureAffectsOpacity(true);
  };

  return (
    <Panel title={t('tools.panelTitle', 'Tools')} className="h-full">
      <div className="p-2 space-y-3">
        <div className="grid grid-cols-2 gap-1">
          {TOOL_LIST.map((tool) => (
            <button
              key={tool.type}
              type="button"
              onClick={() => setTool(tool.type as ToolType)}
              className={`h-8 px-2 rounded border text-xs flex items-center justify-between transition-colors
                ${
                  activeTool === tool.type
                    ? 'border-accent bg-accent/25 text-foreground'
                    : 'border-border bg-background hover:bg-surface-hover text-muted'
                }`}
              title={`${toolLabels[tool.type as ToolType] ?? tool.label} (${tool.shortcut})`}
            >
              <span className="inline-flex items-center gap-1.5">
                <PixelIcon name={tool.icon as PixelIconName} size={14} />
                <span>{toolLabels[tool.type as ToolType] ?? tool.label}</span>
              </span>
              <span className="text-[10px] opacity-75">{tool.shortcut}</span>
            </button>
          ))}
        </div>

        <div className="space-y-2 p-2 rounded border border-border bg-background/60">
          <Slider
            value={brushSize}
            min={1}
            max={MAX_BRUSH_SIZE}
            label={t('tools.slider.brush', 'Brush')}
            onChange={setBrushSize}
          />

          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted">{t('tools.shape', 'Shape')}</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setBrushShape('square')}
                className={`h-7 px-2 rounded border text-xs ${
                  brushShape === 'square'
                    ? 'border-accent bg-accent/25 text-foreground'
                    : 'border-border bg-background text-muted hover:bg-surface-hover'
                }`}
              >
                {t('tools.square', 'Square')}
              </button>
              <button
                type="button"
                onClick={() => setBrushShape('circle')}
                className={`h-7 px-2 rounded border text-xs ${
                  brushShape === 'circle'
                    ? 'border-accent bg-accent/25 text-foreground'
                    : 'border-border bg-background text-muted hover:bg-surface-hover'
                }`}
              >
                {t('tools.circle', 'Circle')}
              </button>
            </div>
          </div>
        </div>

        {isFreehandTool && (
          <div className="space-y-2 p-2 rounded border border-border bg-background/60">
            <Slider
              value={strokeStabilizer}
              min={0}
              max={MAX_STROKE_STABILIZER}
              label={t('tools.slider.stabilizer', 'Stabilizer')}
              onChange={setStrokeStabilizer}
            />

            <div className="space-y-1">
              <label className="text-[11px] text-muted block">{t('tools.algorithm', 'Algorithm')}</label>
              <select
                value={freehandAlgorithm}
                onChange={(e) => setFreehandAlgorithm(e.target.value as typeof freehandAlgorithm)}
                className="w-full h-8 px-2 text-xs rounded border border-border bg-background text-foreground"
              >
                {FREEHAND_ALGORITHM_LIST.map((mode) => (
                  <option key={mode.value} value={mode.value}>{algorithmLabels[mode.value] ?? mode.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-muted block">{t('tools.tracePolicy', 'Trace Policy')}</label>
              <select
                value={freehandTracePolicy}
                onChange={(e) => setFreehandTracePolicy(e.target.value as typeof freehandTracePolicy)}
                className="w-full h-8 px-2 text-xs rounded border border-border bg-background text-foreground"
              >
                {FREEHAND_TRACE_POLICY_LIST.map((policy) => (
                  <option key={policy.value} value={policy.value}>{tracePolicyLabels[policy.value] ?? policy.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-muted block">{t('tools.symmetry', 'Symmetry')}</label>
              <select
                value={symmetryMode}
                onChange={(e) => setSymmetryMode(e.target.value as SymmetryMode)}
                className="w-full h-8 px-2 text-xs rounded border border-border bg-background text-foreground"
              >
                {SYMMETRY_MODES.map((mode) => (
                  <option key={mode.value} value={mode.value}>{symmetryModeLabels[mode.value]}</option>
                ))}
              </select>
            </div>

            {showsAxisX && (
              <Slider
                value={resolvedAxisX}
                min={0}
                max={Math.max(0, width)}
                label={t('tools.slider.axisX', 'Axis X')}
                onChange={setSymmetryAxisX}
              />
            )}

            {showsAxisY && (
              <Slider
                value={resolvedAxisY}
                min={0}
                max={Math.max(0, height)}
                label={t('tools.slider.axisY', 'Axis Y')}
                onChange={setSymmetryAxisY}
              />
            )}

            <div className="space-y-1">
              <label className="text-[11px] text-muted block">{t('tools.pressure', 'Pressure')}</label>
              <select
                value={pressureMode}
                onChange={(e) => setPressureMode(e.target.value as PressureModeValue)}
                className="w-full h-8 px-2 text-xs rounded border border-border bg-background text-foreground"
              >
                <option value="off">{t('tools.pressure.off', 'Off')}</option>
                <option value="size">{t('tools.pressure.size', 'Size')}</option>
                <option value="opacity">{t('tools.pressure.opacity', 'Opacity')}</option>
                <option value="sizeOpacity">{t('tools.pressure.sizeOpacity', 'Size + Opacity')}</option>
              </select>
            </div>

            {(pressureMode === 'size' || pressureMode === 'sizeOpacity') && (
              <Slider
                value={pressureSizeMinPercent}
                min={MIN_PRESSURE_SIZE_MIN_PERCENT}
                max={MAX_PRESSURE_SIZE_MIN_PERCENT}
                label={t('tools.slider.minSize', 'Min Size %')}
                onChange={setPressureSizeMinPercent}
              />
            )}

            {(pressureMode === 'opacity' || pressureMode === 'sizeOpacity') && (
              <Slider
                value={pressureOpacityMinPercent}
                min={MIN_PRESSURE_OPACITY_MIN_PERCENT}
                max={MAX_PRESSURE_OPACITY_MIN_PERCENT}
                label={t('tools.slider.minOpacity', 'Min Opacity %')}
                onChange={setPressureOpacityMinPercent}
              />
            )}
          </div>
        )}
      </div>
    </Panel>
  );
}
