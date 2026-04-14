'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { exportPng, exportPngMultipleSizes } from '@/lib/export/exportPng';
import { exportSpritesheet } from '@/lib/export/exportSpritesheet';
import { exportGif } from '@/lib/export/exportGif';
import { exportJson } from '@/lib/export/exportJson';
import Dialog from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import type { ExportFormat } from '@/types/export';
import useI18n from '@/hooks/useI18n';

const SCALE_OPTIONS = [1, 2, 3, 4, 6, 8, 12, 16];
type SpritesheetDataFormat = 'none' | 'json-array' | 'json-hash';

function toSafeFileBase(name: string, fallback: string): string {
  const normalized = name
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return normalized.length > 0 ? normalized : fallback;
}

export default function ExportDialog() {
  const { t } = useI18n();
  const { showExportDialog, setExportDialog } = useUIStore();
  const project = useProjectStore((s) => s.project);
  const timelineFps = useTimelineStore((s) => s.fps);
  const [format, setFormat] = useState<ExportFormat>('png');
  const [pngScale, setPngScale] = useState(1);
  const [pngExportMultiple, setPngExportMultiple] = useState(false);
  const [pngBatchScales, setPngBatchScales] = useState<number[]>([1, 2, 4]);
  const [spritesheetScale, setSpritesheetScale] = useState(1);
  const [columns, setColumns] = useState(4);
  const [spritesheetDataFormat, setSpritesheetDataFormat] = useState<SpritesheetDataFormat>('json-hash');
  const [gifScale, setGifScale] = useState(2);

  const togglePngScale = (scale: number) => {
    setPngBatchScales((current) => {
      if (current.includes(scale)) {
        return current.filter((s) => s !== scale);
      }
      return [...current, scale].sort((a, b) => a - b);
    });
  };

  const handleExport = async () => {
    const { project: latestProject } = useProjectStore.getState();
    const { frames, fps } = useTimelineStore.getState();
    const { layers } = useLayerStore.getState();
    const safeProjectName = toSafeFileBase(latestProject.name, 'sprite');

    try {
      switch (format) {
        case 'png': {
          const activeFrame = useTimelineStore.getState().getActiveFrame();
          if (pngExportMultiple) {
            const scalesToExport = pngBatchScales.length > 0 ? pngBatchScales : [1];
            await exportPngMultipleSizes(
              activeFrame,
              layers,
              latestProject.width,
              latestProject.height,
              scalesToExport,
              safeProjectName
            );
            break;
          }

          exportPng(activeFrame, layers, latestProject.width, latestProject.height, {
            scale: pngScale,
            filename: `${safeProjectName}-${latestProject.width * pngScale}x${latestProject.height * pngScale}.png`,
          });
          break;
        }
        case 'spritesheet':
          {
            const frameSizeSuffix = `${latestProject.width * spritesheetScale}x${latestProject.height * spritesheetScale}`;
            const spriteFilename = `${safeProjectName}-sheet-${frameSizeSuffix}.png`;
            const dataFilename = `${safeProjectName}-sheet-${frameSizeSuffix}.json`;
          exportSpritesheet(frames, layers, latestProject.width, latestProject.height, {
            columns,
            scale: spritesheetScale,
            filename: spriteFilename,
            dataFilename,
            asepriteDataFormat: spritesheetDataFormat === 'none' ? null : spritesheetDataFormat,
          });
          break;
          }
        case 'gif':
          exportGif(frames, layers, latestProject.width, latestProject.height, {
            fps,
            scale: gifScale,
            filename: `${safeProjectName}-${latestProject.width * gifScale}x${latestProject.height * gifScale}.gif`,
          });
          break;
        case 'json':
          exportJson(latestProject, frames, layers);
          break;
      }
      setExportDialog(false);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : t('export.failed', 'Export failed'));
    }
  };

  return (
    <Dialog open={showExportDialog} onClose={() => setExportDialog(false)} title={t('export.title', 'Export')}>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-muted block mb-1">{t('export.format', 'Format')}</label>
          <div className="grid grid-cols-4 gap-1">
            {(['png', 'spritesheet', 'gif', 'json'] as ExportFormat[]).map((f) => (
              <button
                key={f}
                className={`px-2 py-1.5 text-xs rounded border transition-colors
                  ${format === f ? 'border-accent bg-accent/20 text-foreground' : 'border-border text-muted hover:border-border-light'}`}
                onClick={() => setFormat(f)}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {format === 'png' && (
          <div>
            <label className="text-xs text-muted block mb-1">{t('export.pngOutput', 'PNG Output')}</label>
            <label className="flex items-center gap-2 text-xs text-foreground mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={pngExportMultiple}
                onChange={(e) => setPngExportMultiple(e.target.checked)}
              />
              {t('export.multipleSizes', 'Export multiple sizes')}
            </label>

            {!pngExportMultiple && (
              <select
                value={pngScale}
                onChange={(e) => setPngScale(Number(e.target.value))}
                className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
              >
                {SCALE_OPTIONS.map((scale) => (
                  <option key={scale} value={scale}>
                    {scale}x ({scale * project.width}x{scale * project.height})
                  </option>
                ))}
              </select>
            )}

            {pngExportMultiple && (
              <div className="grid grid-cols-2 gap-1">
                {SCALE_OPTIONS.map((scale) => {
                  const active = pngBatchScales.includes(scale);
                  const w = scale * project.width;
                  const h = scale * project.height;
                  return (
                    <button
                      key={scale}
                      onClick={() => togglePngScale(scale)}
                      className={`px-2 py-1.5 text-xs rounded border transition-colors text-left
                        ${active ? 'border-accent bg-accent/20 text-foreground' : 'border-border text-muted hover:border-border-light'}`}
                    >
                      {scale}x ({w}x{h})
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {format === 'spritesheet' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted block mb-1">{t('export.scale', 'Scale')}</label>
                <select
                value={spritesheetScale}
                onChange={(e) => setSpritesheetScale(Number(e.target.value))}
                className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
              >
                {SCALE_OPTIONS.map((scale) => (
                  <option key={scale} value={scale}>
                    {scale}x
                  </option>
                ))}
              </select>
            </div>

              <div>
                <label className="text-xs text-muted block mb-1">{t('export.columns', 'Columns')}</label>
                <input
                type="number"
                min={1}
                max={16}
                value={columns}
                onChange={(e) => setColumns(Math.max(1, Math.min(16, Number(e.target.value) || 1)))}
                className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
              />
            </div>

              <div>
                <label className="text-xs text-muted block mb-1">{t('export.dataFile', 'Data File')}</label>
                <select
                value={spritesheetDataFormat}
                onChange={(e) => setSpritesheetDataFormat(e.target.value as SpritesheetDataFormat)}
                className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
                >
                  <option value="none">{t('export.pngOnly', 'PNG only')}</option>
                  <option value="json-hash">{t('export.jsonHash', 'Standard JSON (Hash)')}</option>
                  <option value="json-array">{t('export.jsonArray', 'Standard JSON (Array)')}</option>
                </select>
                <p className="text-[11px] text-muted mt-1">
                  {t('export.industryNote', 'Industry-standard sprite sheet metadata format.')}
                </p>
              </div>
            </div>
          )}

        {format === 'gif' && (
          <div>
            <label className="text-xs text-muted block mb-1">{t('export.gifResolution', 'GIF Resolution')}</label>
            <select
              value={gifScale}
              onChange={(e) => setGifScale(Number(e.target.value))}
              className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
            >
              {SCALE_OPTIONS.map((scale) => (
                <option key={scale} value={scale}>
                  {scale}x ({scale * project.width}x{scale * project.height})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-muted mt-1">
              {t('export.gifFpsFallback', 'Uses each frame duration (FPS {fps} as fallback).', { fps: timelineFps })}
            </p>
          </div>
        )}

        <Button data-dialog-default="true" onClick={() => { void handleExport(); }} className="w-full">
          {t('export.exportFormat', 'Export {format}', { format: format.toUpperCase() })}
        </Button>
      </div>
    </Dialog>
  );
}
