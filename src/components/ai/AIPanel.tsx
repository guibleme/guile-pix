'use client';

import React from 'react';
import { useAIStore } from '@/stores/useAIStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { ANIMATION_PRESETS } from '@/constants/animation';
import { generateAnimation } from '@/lib/ai/generateAnimation';
import { generateShading } from '@/lib/ai/generateShading';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';
import type { AnimationType } from '@/types/animation';
import type { AnimationFacing, LightDirection } from '@/types/ai';
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
      </div>
    </Panel>
  );
}
