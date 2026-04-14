'use client';

import React from 'react';
import { useTimelineStore } from '@/stores/useTimelineStore';
import Panel from '@/components/ui/Panel';
import IconButton from '@/components/ui/IconButton';
import Slider from '@/components/ui/Slider';
import Button from '@/components/ui/Button';
import {
  MIN_FPS,
  MAX_FPS,
  MIN_FRAME_DURATION,
  MAX_FRAME_DURATION,
} from '@/constants/animation';
import PixelIcon from '@/components/ui/PixelIcon';
import useI18n from '@/hooks/useI18n';

function hasSharedLayerReferenceWithOtherFrames(
  frames: Array<{ id: string; layerData: Record<string, Uint8ClampedArray> }>,
  frameIndex: number
): boolean {
  const frame = frames[frameIndex];
  if (!frame) return false;
  const entries = Object.entries(frame.layerData);
  if (entries.length === 0) return false;
  for (let i = 0; i < frames.length; i += 1) {
    if (i === frameIndex) continue;
    const otherLayerData = frames[i].layerData;
    for (const [layerId, data] of entries) {
      if (otherLayerData[layerId] === data) return true;
    }
  }
  return false;
}

function isLinkedToPreviousFrame(
  frames: Array<{ layerData: Record<string, Uint8ClampedArray> }>,
  frameIndex: number
): boolean {
  if (frameIndex <= 0) return false;
  const current = frames[frameIndex];
  const previous = frames[frameIndex - 1];
  const keys = Object.keys(current.layerData);
  if (keys.length === 0) return false;
  return keys.some((layerId) => previous.layerData[layerId] === current.layerData[layerId]);
}

export default function TimelinePanel() {
  const { t } = useI18n();
  const {
    frames, activeFrameIndex, fps, isPlaying, loop,
    addFrame, addLinkedFrame, duplicateFrame, linkFrameTo, unlinkFrame, removeFrame, setActiveFrame,
    setFps, setFrameDuration, setAllFrameDurations, setFrameDurationsFrom, play, pause, stop, toggleLoop,
  } = useTimelineStore();
  const activeFrame = frames[activeFrameIndex];
  const activeDuration = activeFrame?.duration ?? 100;
  const canLinkToPrevious = activeFrameIndex > 0;
  const activeFrameIsLinked = hasSharedLayerReferenceWithOtherFrames(frames, activeFrameIndex);

  return (
    <Panel title={t('timeline.panelTitle', 'Timeline')} className="h-full">
      {/* Playback controls */}
      <div className="flex items-center gap-1 px-3 py-1.5 border-b border-border">
        <IconButton tooltip={t('timeline.stop', 'Stop')} onClick={stop} className="!w-7 !h-7">
          <PixelIcon name="stop" size={14} />
        </IconButton>
        <IconButton
          tooltip={isPlaying ? t('timeline.pause', 'Pause') : t('timeline.play', 'Play')}
          onClick={isPlaying ? pause : play}
          className="!w-7 !h-7"
        >
          {isPlaying ? <PixelIcon name="pause" size={14} /> : <PixelIcon name="play" size={14} />}
        </IconButton>
        <IconButton tooltip={t('timeline.loop', 'Loop')} active={loop} onClick={toggleLoop} className="!w-7 !h-7">
          <PixelIcon name="loop" size={14} />
        </IconButton>
        <div className="flex-1 ml-2">
          <Slider label={t('timeline.fps', 'FPS')} value={fps} min={MIN_FPS} max={MAX_FPS} onChange={setFps} />
        </div>
      </div>

      {/* Frame strip */}
      <div className="flex gap-1 p-2 overflow-x-auto border-b border-border">
        {frames.map((frame, i) => (
          <button
            key={frame.id}
            onClick={() => setActiveFrame(i)}
            className={`flex-shrink-0 w-14 h-14 rounded border-2 flex items-center justify-center text-xs font-mono transition-colors
              ${i === activeFrameIndex
                ? 'border-accent bg-accent/20 text-foreground'
                : 'border-border bg-surface-hover text-muted hover:border-border-light'
              }`}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <span>{i + 1}</span>
              {isLinkedToPreviousFrame(frames, i) && (
                <span className="absolute top-1 right-1 text-[9px] leading-none text-accent">L</span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="px-3 py-2 border-b border-border flex flex-wrap gap-1">
        <Button variant="ghost" size="sm" onClick={addFrame}>
          <PixelIcon name="plus" size={12} className="mr-1" /> {t('timeline.add', 'Add')}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => duplicateFrame(activeFrameIndex)}>
          <PixelIcon name="copy" size={12} className="mr-1" /> {t('timeline.duplicate', 'Duplicate')}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => addLinkedFrame(activeFrameIndex)}>
          <PixelIcon name="link" size={12} className="mr-1" /> {t('timeline.addLinked', 'Add Linked')}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (!canLinkToPrevious) return;
            linkFrameTo(activeFrameIndex, activeFrameIndex - 1);
          }}
          disabled={!canLinkToPrevious}
        >
          <PixelIcon name="link" size={12} className="mr-1" /> {t('timeline.linkPrev', 'Link Prev')}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => unlinkFrame(activeFrameIndex)}
          disabled={!activeFrameIsLinked}
        >
          <PixelIcon name="unlink" size={12} className="mr-1" /> {t('timeline.unlink', 'Unlink')}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => removeFrame(activeFrameIndex)}>
          <PixelIcon name="trash" size={12} className="mr-1" /> {t('timeline.delete', 'Delete')}
        </Button>
      </div>

      <div className="px-3 py-2 border-b border-border">
        <label className="text-[11px] text-muted block mb-1">{t('timeline.frameDuration', 'Frame Duration (ms)')}</label>
        <input
          type="number"
          min={MIN_FRAME_DURATION}
          max={MAX_FRAME_DURATION}
          value={activeDuration}
          onChange={(e) => {
            if (!activeFrame) return;
            const value = Number(e.target.value);
            if (!Number.isFinite(value)) return;
            const next = Math.max(MIN_FRAME_DURATION, Math.min(MAX_FRAME_DURATION, Math.round(value)));
            setFrameDuration(activeFrame.id, next);
          }}
          className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
        />
        <div className="flex gap-1 mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => setAllFrameDurations(activeDuration)}
          >
            {t('timeline.applyAll', 'Apply All')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => setFrameDurationsFrom(activeFrameIndex, activeDuration)}
          >
            {t('timeline.applyFrom', 'Apply From')}
          </Button>
        </div>
      </div>
    </Panel>
  );
}
