'use client';

import React from 'react';
import { useAIStore, isAssistTerminal } from '@/stores/useAIStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { ANIMATION_PRESETS } from '@/constants/animation';
import { generateAnimation } from '@/lib/ai/generateAnimation';
import { generateShading } from '@/lib/ai/generateShading';
import { buildAssistMask } from '@/lib/ai/assistMask';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';
import type { AnimationType } from '@/types/animation';
import type { AnimationFacing, AssistTarget, LightDirection } from '@/types/ai';
import PixelIcon from '@/components/ui/PixelIcon';
import { useUIStore } from '@/stores/useUIStore';
import useI18n from '@/hooks/useI18n';

export default function AIPanel() {
  const { t } = useI18n();
  const { status, progress, result, startGeneration, setResult, setProgress, setError, acceptResult, rejectResult } = useAIStore();
  const [facing, setFacing] = React.useState<AnimationFacing>('right');

  const handleGenerateAnimation = async (animationType: AnimationType) => {
    startGeneration({ type: 'animation', animationType, facing });

    try {
      const { width, height } = useProjectStore.getState().project;
      const { activeLayerId } = useLayerStore.getState();
      const frame = useTimelineStore.getState().getActiveFrame();
      const sourcePixels = frame.layerData[activeLayerId];

      if (!sourcePixels) {
        setError(t('ai.noActiveLayerPixels', 'No pixel data on active layer'));
        return;
      }

      const preset = ANIMATION_PRESETS.find(p => p.type === animationType)!;
      const result = await generateAnimation(
        { type: 'animation', animationType, facing, frameCount: preset.frameCount },
        sourcePixels,
        width,
        height,
        (p) => setProgress(p)
      );

      setResult(result);
    } catch (err) {
      setError(String(err));
    }
  };

  const handleGenerateShading = async (direction: LightDirection) => {
    startGeneration({ type: 'shading', lightDirection: direction });

    try {
      const { width, height } = useProjectStore.getState().project;
      const { activeLayerId } = useLayerStore.getState();
      const frame = useTimelineStore.getState().getActiveFrame();
      const sourcePixels = frame.layerData[activeLayerId];

      if (!sourcePixels) {
        setError(t('ai.noActiveLayerPixels', 'No pixel data on active layer'));
        return;
      }

      const result = await generateShading(sourcePixels, width, height, direction, (p) => setProgress(p));
      setResult(result);
    } catch (err) {
      setError(String(err));
    }
  };

  const normalizeFramePixels = (
    pixels: Uint8ClampedArray,
    width: number,
    height: number
  ): Uint8ClampedArray => {
    const expectedLength = width * height * 4;
    if (pixels.length === expectedLength) return new Uint8ClampedArray(pixels);

    const normalized = new Uint8ClampedArray(expectedLength);
    normalized.set(pixels.subarray(0, expectedLength));
    return normalized;
  };

  const handleAccept = () => {
    if (!result) return;
    const { width, height } = useProjectStore.getState().project;
    const { activeLayerId } = useLayerStore.getState();
    const timelineState = useTimelineStore.getState();

    // Add frames from AI result
    result.frames.forEach((frameData) => {
      const frameId = timelineState.addFrame();
      const nextPixels = normalizeFramePixels(frameData.pixels, width, height);
      timelineState.setFrameLayerData(frameId, activeLayerId, nextPixels);
    });

    acceptResult();
  };

  return (
    <Panel title={t('ai.panelTitle', 'Animation Presets')} className="h-full">
      <div className="p-3 space-y-3">
        {status === 'idle' && (
          <>
            <div className="flex items-center gap-1 mb-2">
              <PixelIcon name="sparkles" size={14} className="text-accent" />
              <span className="text-xs text-muted">{t('ai.animationPresets', 'Animation Presets')}</span>
            </div>

            <div className="space-y-1 mb-2">
              <span className="text-xs text-muted">{t('ai.facing', 'Facing')}</span>
              <div className="grid grid-cols-2 gap-1">
                <Button
                  variant={facing === 'right' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFacing('right')}
                  title={t('ai.facingRightTitle', 'Generate movement facing right')}
                >
                  {t('ai.right', 'Right')}
                </Button>
                <Button
                  variant={facing === 'left' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFacing('left')}
                  title={t('ai.facingLeftTitle', 'Generate movement facing left')}
                >
                  {t('ai.left', 'Left')}
                </Button>
              </div>
            </div>

            {ANIMATION_PRESETS.map((preset) => {
              const presetName = t(`ai.preset.${preset.type}.name`, preset.name);
              const presetDescription = t(`ai.preset.${preset.type}.description`, preset.description);
              return (
                <Button
                  key={preset.type}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => handleGenerateAnimation(preset.type)}
                  title={presetDescription}
                >
                  <span className="truncate">{presetName}</span>
                  <span className="ml-auto text-muted text-[10px]">{preset.frameCount}f</span>
                </Button>
              );
            })}

            <div className="border-t border-border pt-2 mt-2">
              <span className="text-xs text-muted">{t('ai.shading', 'Shading')}</span>
              <div className="grid grid-cols-3 gap-1 mt-1">
                {(['top-left', 'top', 'top-right'] as LightDirection[]).map((d) => {
                  const label = d === 'top-left'
                    ? t('ai.shading.topLeft', 'top left')
                    : d === 'top-right'
                      ? t('ai.shading.topRight', 'top right')
                      : t('ai.shading.top', 'top');
                  return (
                    <Button key={d} variant="ghost" size="sm" onClick={() => handleGenerateShading(d)}>
                      {label}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-border pt-2 mt-2">
              <span className="text-xs text-muted">{t('ai.3d.sectionTitle', '3D Rotation')}</span>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-1"
                onClick={() => useUIStore.getState().setRotation3DDialog(true)}
              >
                <PixelIcon name="rotate3d" size={12} className="mr-1" /> {t('ai.3d.title', 'Generate 3D Views')}
              </Button>
            </div>
          </>
        )}

        {status === 'generating' && (
          <div className="flex flex-col items-center gap-2 py-4">
            <PixelIcon name="loader" size={24} className="animate-spin text-accent" />
            <div className="w-full bg-border rounded-full h-1.5">
              <div className="bg-accent h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs text-muted">{t('ai.generating', 'Generating... {progress}%', { progress })}</span>
          </div>
        )}

        {status === 'preview' && result && (
          <div className="space-y-2">
            <p className="text-xs text-muted">{t('ai.generatedFrames', 'Generated {count} frames', { count: result.frames.length })}</p>
            <div className="flex gap-2">
              <Button variant="default" size="sm" onClick={handleAccept}>
                <PixelIcon name="check" size={12} className="mr-1" /> {t('ai.accept', 'Accept')}
              </Button>
              <Button variant="danger" size="sm" onClick={rejectResult}>
                <PixelIcon name="close" size={12} className="mr-1" /> {t('ai.reject', 'Reject')}
              </Button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-xs text-danger">
            {t('ai.errorGenerating', 'Error generating.')}{' '}
            <button onClick={rejectResult} className="underline">{t('ai.dismiss', 'Dismiss')}</button>
          </div>
        )}

        <AssistSection />
      </div>
    </Panel>
  );
}

function describeTarget(t: (key: string, fallback?: string, params?: Record<string, string | number>) => string, target: AssistTarget): string {
  switch (target.kind) {
    case 'pin':
      return t('ai.assist.pinAt', 'Pin at ({x}, {y})', { x: target.point.x, y: target.point.y });
    case 'rect':
      return t('ai.assist.regionAt', 'Region {w}×{h} at ({x}, {y})', {
        w: target.rect.w, h: target.rect.h, x: target.rect.x, y: target.rect.y,
      });
    case 'frame':
      return t('ai.assist.wholeFrame', 'Whole frame');
  }
}

function AssistSection() {
  const { t } = useI18n();
  const {
    pickMode,
    pickedTarget,
    activeRequest,
    assistHistory,
    assistError,
    assistSubmitting,
    armPick,
    cancelPick,
    setPickedTarget,
    clearPickedTarget,
    setAssistError,
    submitAssist,
    cancelActiveAssist,
    selectAssistFromHistory,
    resetAssist,
  } = useAIStore();
  const activeFrameId = useTimelineStore((s) => s.frames[s.activeFrameIndex]?.id ?? '');
  const activeLayerId = useLayerStore((s) => s.activeLayerId);
  const [prompt, setPrompt] = React.useState('');

  const hasOutstanding = Boolean(activeRequest && !isAssistTerminal(activeRequest.status));
  const canSubmit = prompt.trim().length > 0 && pickedTarget !== null && !assistSubmitting && !hasOutstanding;

  const handleSubmit = async () => {
    if (!canSubmit || !pickedTarget) return;
    const { project } = useProjectStore.getState();
    const frame = useTimelineStore.getState().getActiveFrame();
    const layerId = useLayerStore.getState().activeLayerId;
    const workspace = useWorkspaceStore.getState();
    const activeDoc = workspace.documents.find((doc) => doc.id === workspace.activeDocumentId);
    const revision = activeDoc?.sourceDocumentV2?.revision ?? 0;
    let mask;
    try {
      mask = buildAssistMask(pickedTarget, project.width, project.height);
    } catch (err) {
      setAssistError(err instanceof Error ? err.message : String(err));
      return;
    }
    const ok = await submitAssist({
      projectId: project.id,
      projectName: project.name,
      prompt: prompt.trim(),
      target: pickedTarget,
      context: {
        frameId: frame.id,
        layerId,
        width: project.width,
        height: project.height,
        revision,
      },
      mask,
    });
    if (ok) setPrompt('');
  };

  return (
    <div className="border-t border-border pt-2 mt-2 space-y-2">
      <div className="flex items-center gap-1">
        <PixelIcon name="sparkles" size={14} className="text-accent" />
        <span className="text-xs text-muted">{t('ai.assist.title', 'AI Assist')}</span>
      </div>

      <p className="text-xs text-muted">
        {t('ai.assist.hint', 'Pick a target, describe the edit, and an agent applies it. The result appears on canvas through the disk sync.')}
      </p>

      <div className="grid grid-cols-3 gap-1">
        <Button
          variant={pickMode === 'pin' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => (pickMode === 'pin' ? cancelPick() : armPick('pin'))}
          title={t('ai.assist.pinTitle', 'Click the canvas to drop a pin')}
        >
          {t('ai.assist.pin', 'Pin')}
        </Button>
        <Button
          variant={pickMode === 'rect' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => (pickMode === 'rect' ? cancelPick() : armPick('rect'))}
          title={t('ai.assist.regionTitle', 'Drag on the canvas to select a region')}
        >
          {t('ai.assist.region', 'Region')}
        </Button>
        <Button
          variant={pickedTarget?.kind === 'frame' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setPickedTarget({ kind: 'frame' })}
          title={t('ai.assist.frameTitle', 'Target the whole active frame')}
        >
          {t('ai.assist.frame', 'Frame')}
        </Button>
      </div>

      {pickMode && (
        <p className="text-xs text-accent">
          {pickMode === 'pin'
            ? t('ai.assist.pickPinHint', 'Click the canvas to drop a pin (Esc to cancel).')
            : t('ai.assist.pickRectHint', 'Drag on the canvas to select a region (Esc to cancel).')}
        </p>
      )}

      {pickedTarget && (
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted">{t('ai.assist.target', 'Target')}:</span>
          <span className="truncate">{describeTarget(t, pickedTarget)}</span>
          <button onClick={clearPickedTarget} className="ml-auto underline text-muted" title={t('ai.assist.clearTarget', 'Clear target')}>
            {t('ai.assist.clear', 'Clear')}
          </button>
        </div>
      )}

      <p className="text-xs text-muted">
        {t('ai.assist.context', 'Frame {frame} · Layer {layer}', { frame: activeFrameId, layer: activeLayerId })}
      </p>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') void handleSubmit();
        }}
        placeholder={t('ai.assist.promptPlaceholder', 'make this circle red…')}
        disabled={hasOutstanding}
        className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
      />

      <Button variant="default" size="sm" className="w-full" onClick={() => void handleSubmit()} disabled={!canSubmit}>
        {assistSubmitting
          ? t('ai.assist.submitting', 'Submitting…')
          : t('ai.assist.submit', 'Ask the agent')}
      </Button>

      {!pickedTarget && !hasOutstanding && (
        <p className="text-xs text-muted">{t('ai.assist.pickTargetFirst', 'Pick a target first (Pin, Region, or Frame).')}</p>
      )}
      {hasOutstanding && (
        <p className="text-xs text-muted">{t('ai.assist.oneAtATime', 'One request at a time — wait for the active one to finish.')}</p>
      )}

      {assistError && (
        <p className="text-xs text-danger">{assistError}</p>
      )}

      {activeRequest && (
        <div className="space-y-1 rounded border border-border p-2">
          <div className="flex items-center gap-1 text-xs">
            <span className="font-medium capitalize">{activeRequest.status}</span>
            {activeRequest.status === 'claimed' && activeRequest.claimedBy && (
              <span className="text-muted">{t('ai.assist.claimedBy', 'by {agent}', { agent: activeRequest.claimedBy })}</span>
            )}
            {activeRequest.status === 'pending' && (
              <Button variant="ghost" size="sm" className="ml-auto" onClick={() => void cancelActiveAssist()}>
                {t('ai.assist.cancel', 'Cancel')}
              </Button>
            )}
            {isAssistTerminal(activeRequest.status) && (
              <Button variant="ghost" size="sm" className="ml-auto" onClick={resetAssist}>
                {t('ai.assist.newRequest', 'New request')}
              </Button>
            )}
          </div>
          <p className="text-xs text-muted truncate" title={activeRequest.prompt}>{activeRequest.prompt}</p>
          {activeRequest.note && (
            <p className="text-xs">{activeRequest.note}</p>
          )}
        </div>
      )}

      {assistHistory.length > 0 && (
        <div className="space-y-1">
          <span className="text-xs text-muted">{t('ai.assist.history', 'Recent')}</span>
          {assistHistory.map((entry) => (
            <button
              key={entry.id}
              onClick={() => void selectAssistFromHistory(entry.id)}
              className={`w-full text-left text-xs px-2 py-1 rounded hover:bg-border/50 ${
                entry.id === activeRequest?.id ? 'bg-border/50' : ''
              }`}
              title={entry.prompt}
            >
              <span className="capitalize text-muted">{entry.status}</span>
              {' · '}
              <span className="truncate">{entry.prompt}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
