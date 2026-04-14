'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { SPRITE_SIZES, DEFAULT_SPRITE_SIZE } from '@/constants/sprites';
import { DEFAULT_FPS, DEFAULT_FRAME_DURATION } from '@/constants/animation';
import {
  captureRecoverySnapshot,
  markCurrentProjectAsSavedBaseline,
  rememberCurrentProject,
} from '@/lib/project/projectPersistence';
import Dialog from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import { nanoid } from 'nanoid';
import { clamp } from '@/lib/utils/math';
import type { ProjectSettings } from '@/types/project';
import useI18n from '@/hooks/useI18n';

const MIN_DIMENSION = 1;
const MAX_DIMENSION = 1024;

function parseDimensionInput(value: string): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return MIN_DIMENSION;
  return clamp(Math.round(parsed), MIN_DIMENSION, MAX_DIMENSION);
}

export default function NewProjectDialog() {
  const { t } = useI18n();
  const { showNewProjectDialog, setNewProjectDialog } = useUIStore();
  const [name, setName] = useState(() => t('newProject.defaultName', 'Untitled Sprite'));
  const [width, setWidth] = useState<number>(DEFAULT_SPRITE_SIZE);
  const [height, setHeight] = useState<number>(DEFAULT_SPRITE_SIZE);

  const normalizedWidth = clamp(Math.round(width), MIN_DIMENSION, MAX_DIMENSION);
  const normalizedHeight = clamp(Math.round(height), MIN_DIMENSION, MAX_DIMENSION);
  const selectedPreset = SPRITE_SIZES.find((preset) => preset.value === normalizedWidth && preset.value === normalizedHeight);

  const handleCreate = () => {
    const safeName = name.trim().length > 0 ? name.trim() : t('newProject.defaultName', 'Untitled Sprite');
    const safeWidth = normalizedWidth;
    const safeHeight = normalizedHeight;
    const layerId = nanoid();
    const project: ProjectSettings = {
      id: nanoid(),
      name: safeName,
      width: safeWidth,
      height: safeHeight,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    useWorkspaceStore.getState().createDocument({
      project,
      layers: [{ id: layerId, name: t('newProject.layer1', 'Layer 1'), visible: true, locked: false, opacity: 1, blendMode: 'normal' }],
      activeLayerId: layerId,
      frames: [{
        id: nanoid(),
        index: 0,
        duration: DEFAULT_FRAME_DURATION,
        layerData: {
          [layerId]: new Uint8ClampedArray(safeWidth * safeHeight * 4),
        },
      }],
      fps: DEFAULT_FPS,
      activeFrameIndex: 0,
    }, { setActive: true });

    // Initialize new document as clean baseline (no unsaved changes yet).
    window.setTimeout(() => {
      markCurrentProjectAsSavedBaseline();
      const snapshotId = captureRecoverySnapshot('new-project');
      rememberCurrentProject(snapshotId);
    }, 0);

    setNewProjectDialog(false);
  };

  return (
    <Dialog open={showNewProjectDialog} onClose={() => setNewProjectDialog(false)} title={t('newProject.title', 'New Sketch')}>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-muted block mb-1">{t('newProject.name', 'Sketch Name')}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-dialog-autofocus="true"
            className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
          />
        </div>

        <div>
          <label className="text-xs text-muted block mb-1">{t('newProject.quickPresets', 'Quick Presets')}</label>
          <div className="grid grid-cols-5 gap-1">
            {SPRITE_SIZES.map((s) => (
              <button
                key={s.value}
                type="button"
                className={`px-2 py-2 text-xs rounded border transition-colors
                  ${selectedPreset?.value === s.value ? 'border-accent bg-accent/20 text-foreground' : 'border-border text-muted hover:border-border-light'}`}
                onClick={() => {
                  setWidth(s.value);
                  setHeight(s.value);
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-muted block mb-1">{t('newProject.canvasDimensions', 'Canvas Dimensions')}</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-muted block mb-1">{t('newProject.width', 'Width')}</label>
              <input
                type="number"
                min={MIN_DIMENSION}
                max={MAX_DIMENSION}
                value={normalizedWidth}
                onChange={(e) => setWidth(parseDimensionInput(e.target.value))}
                className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted block mb-1">{t('newProject.height', 'Height')}</label>
              <input
                type="number"
                min={MIN_DIMENSION}
                max={MAX_DIMENSION}
                value={normalizedHeight}
                onChange={(e) => setHeight(parseDimensionInput(e.target.value))}
                className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
              />
            </div>
          </div>
          <p className="text-[10px] text-muted mt-1">
            {t('newProject.range', 'Range: {min} - {max}px', { min: MIN_DIMENSION, max: MAX_DIMENSION })}
          </p>
        </div>

        <Button data-dialog-default="true" onClick={handleCreate} className="w-full">
          {t('newProject.create', 'Create Sketch')}
        </Button>
      </div>
    </Dialog>
  );
}
