'use client';

import React from 'react';
import { useLayerStore } from '@/stores/useLayerStore';
import { useHistoryStore } from '@/stores/useHistoryStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useProjectStore } from '@/stores/useProjectStore';
import Panel from '@/components/ui/Panel';
import IconButton from '@/components/ui/IconButton';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import PixelIcon from '@/components/ui/PixelIcon';
import type { HistoryLayerStateSnapshot, HistoryPixelChange } from '@/types/history';
import useI18n from '@/hooks/useI18n';

function captureLayerStateSnapshot(): HistoryLayerStateSnapshot {
  const { layers, activeLayerId } = useLayerStore.getState();
  return {
    layers: layers.map((layer) => ({ ...layer })),
    activeLayerId,
  };
}

export default function LayersPanel() {
  const { t } = useI18n();
  const { layers, activeLayerId, setActiveLayer, addLayer, removeLayer, toggleVisibility, toggleLock, moveLayer, duplicateLayer, updateLayer } = useLayerStore();
  const { width, height } = useProjectStore((s) => s.project);
  const activeLayer = layers.find((layer) => layer.id === activeLayerId) ?? null;

  const handleAddLayer = () => {
    const beforeLayerState = captureLayerStateSnapshot();
    const layerId = addLayer();
    const changes: HistoryPixelChange[] = [];
    // Initialize layer data for all frames
    const { frames } = useTimelineStore.getState();
    frames.forEach((frame) => {
      useTimelineStore.getState().initFrameLayer(frame.id, layerId, width, height);
      const createdData = useTimelineStore.getState().frames.find((f) => f.id === frame.id)?.layerData[layerId];
      if (createdData) {
        changes.push({
          frameId: frame.id,
          layerId,
          previousPixelData: null,
          pixelData: createdData,
        });
      }
    });
    const afterLayerState = captureLayerStateSnapshot();
    useHistoryStore
      .getState()
      .pushTransaction('addLayer', changes, { beforeLayerState, afterLayerState });
  };

  const handleDuplicate = (id: string) => {
    const beforeLayerState = captureLayerStateSnapshot();
    const newId = duplicateLayer(id);
    const changes: HistoryPixelChange[] = [];
    // Copy pixel data for all frames
    const { frames } = useTimelineStore.getState();
    frames.forEach((frame) => {
      const srcData = frame.layerData[id];
      if (srcData) {
        const previousData = frame.layerData[newId] ?? null;
        useTimelineStore.getState().setFrameLayerData(frame.id, newId, srcData);
        changes.push({
          frameId: frame.id,
          layerId: newId,
          previousPixelData: previousData,
          pixelData: srcData,
        });
      }
    });
    const afterLayerState = captureLayerStateSnapshot();
    useHistoryStore
      .getState()
      .pushTransaction('duplicateLayer', changes, { beforeLayerState, afterLayerState });
  };

  return (
    <Panel
      title={t('layers.panelTitle', 'Layers')}
      actions={
        <div className="flex gap-1">
          <IconButton tooltip={t('layers.moveUp', 'Move layer up')} onClick={() => activeLayer && moveLayer(activeLayer.id, 'up')} className="!w-7 !h-7" disabled={!activeLayer}>
            <PixelIcon name="arrowUp" size={13} />
          </IconButton>
          <IconButton tooltip={t('layers.moveDown', 'Move layer down')} onClick={() => activeLayer && moveLayer(activeLayer.id, 'down')} className="!w-7 !h-7" disabled={!activeLayer}>
            <PixelIcon name="arrowDown" size={13} />
          </IconButton>
          <IconButton tooltip={t('layers.add', 'Add layer')} onClick={handleAddLayer} className="!w-7 !h-7">
            <PixelIcon name="plus" size={12} />
          </IconButton>
        </div>
      }
    >
      <div className="flex flex-col">
        {[...layers].reverse().map((layer) => (
          <div
            key={layer.id}
            className={`flex items-center gap-1 px-2 py-1.5 cursor-pointer border-b border-border/50 transition-colors
              ${layer.id === activeLayerId ? 'bg-accent/20' : 'hover:bg-surface-hover'}`}
            onClick={() => setActiveLayer(layer.id)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); toggleVisibility(layer.id); }}
              className="text-muted hover:text-foreground"
            >
              {layer.visible ? <PixelIcon name="eye" size={12} /> : <PixelIcon name="eyeOff" size={12} />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggleLock(layer.id); }}
              className="text-muted hover:text-foreground"
            >
              {layer.locked ? <PixelIcon name="lock" size={12} /> : <PixelIcon name="unlock" size={12} />}
            </button>
            <span className="flex-1 text-xs truncate">{layer.name}</span>
          </div>
        ))}
      </div>

      <div className="p-2 border-t border-border flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 justify-start"
          onClick={() => activeLayer && handleDuplicate(activeLayer.id)}
          disabled={!activeLayer}
        >
          <PixelIcon name="copy" size={12} className="mr-1" /> {t('layers.duplicate', 'Duplicate')}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 justify-start"
          onClick={() => activeLayer && removeLayer(activeLayer.id)}
          disabled={!activeLayer}
        >
          <PixelIcon name="trash" size={12} className="mr-1" /> {t('layers.delete', 'Delete')}
        </Button>
      </div>

      {/* Opacity slider for active layer */}
      <div className="p-2 border-t border-border">
        <Slider
          label={t('layers.opacity', 'Opacity')}
          value={Math.round((layers.find(l => l.id === activeLayerId)?.opacity ?? 1) * 100)}
          min={0}
          max={100}
          onChange={(v) => updateLayer(activeLayerId, { opacity: v / 100 })}
        />
      </div>
    </Panel>
  );
}
