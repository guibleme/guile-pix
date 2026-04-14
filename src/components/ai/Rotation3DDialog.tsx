'use client';

import React from 'react';
import Dialog from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import DepthMapCanvas from './DepthMapCanvas';
import { useRotation3DStore } from '@/stores/useRotation3DStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useUIStore } from '@/stores/useUIStore';
import { usePaletteStore } from '@/stores/usePaletteStore';
import { estimateDepth, estimateDepthEdgeBased } from '@/lib/ai/depthEstimation';
import { generate3DRotation } from '@/lib/ai/rotation3DGenerator';
import type { RotationAngle } from '@/types/rotation3d';
import type { RGBA } from '@/types/color';
import PixelIcon from '@/components/ui/PixelIcon';
import useI18n from '@/hooks/useI18n';

function useAngleLabels(): Record<RotationAngle, string> {
  const { t } = useI18n();
  return {
    N: t('ai.3d.front', 'Front'),
    NE: 'NE',
    E: t('ai.3d.right', 'Right'),
    SE: 'SE',
    S: t('ai.3d.back', 'Back'),
    SW: 'SW',
    W: t('ai.3d.left', 'Left'),
    NW: 'NW',
  };
}

export default function Rotation3DDialog() {
  const { t } = useI18n();
  const ANGLE_LABELS = useAngleLabels();
  const showDialog = useUIStore((s) => s.showRotation3DDialog);
  const setDialog = useUIStore((s) => s.setRotation3DDialog);

  const {
    status, progress, depthMap, selectedAngles, maxDepthLayers,
    paletteConstrain, depthEstimationMethod, result, previewAngle,
    setStatus, setProgress, setDepthMap, toggleAngle, setSelectedAngles,
    setMaxDepthLayers, setPaletteConstrain, setDepthEstimationMethod,
    setResult, setPreviewAngle, paintDepth, reset,
  } = useRotation3DStore();

  const previewCanvasRef = React.useRef<HTMLCanvasElement>(null);

  // Get source pixel data
  const getSourcePixels = (): { pixels: Uint8ClampedArray; width: number; height: number } | null => {
    const { width, height } = useProjectStore.getState().project;
    const { activeLayerId } = useLayerStore.getState();
    const frame = useTimelineStore.getState().getActiveFrame();
    const px = frame.layerData[activeLayerId];
    if (!px) return null;
    return { pixels: px, width, height };
  };

  const handleEstimateDepth = () => {
    const source = getSourcePixels();
    if (!source) return;

    const dm = depthEstimationMethod === 'edgeBased'
      ? estimateDepthEdgeBased(source.pixels, source.width, source.height)
      : estimateDepth(source.pixels, source.width, source.height);
    setDepthMap(dm);
  };

  const handleGenerate = async () => {
    const source = getSourcePixels();
    if (!source || selectedAngles.length === 0) return;

    setStatus('estimatingDepth');
    setProgress(0);

    try {
      // Get palette if constraining
      let palette: RGBA[] | undefined;
      if (paletteConstrain) {
        palette = usePaletteStore.getState().palette;
      }

      const genResult = await generate3DRotation(
        source.pixels,
        source.width,
        source.height,
        {
          angles: selectedAngles,
          depthMethod: depthEstimationMethod,
          depthMap: depthMap ?? undefined,
          maxDepthLayers,
          palette,
          paletteConstrain,
          onProgress: setProgress,
        }
      );

      setResult(genResult);
      setStatus('preview');
    } catch {
      setStatus('error');
    }
  };

  const handleAcceptAll = () => {
    if (!result) return;
    const { width, height } = useProjectStore.getState().project;
    const { activeLayerId } = useLayerStore.getState();
    const timelineState = useTimelineStore.getState();

    for (const view of result.views) {
      const frameId = timelineState.addFrame();
      // Resize to match project dimensions if needed
      const expectedLength = width * height * 4;
      let pixels: Uint8ClampedArray;
      if (view.width === width && view.height === height) {
        pixels = new Uint8ClampedArray(view.pixels);
      } else {
        // Center the view in the project canvas
        pixels = new Uint8ClampedArray(expectedLength);
        const ox = Math.floor((width - view.width) / 2);
        const oy = Math.floor((height - view.height) / 2);
        for (let y = 0; y < view.height; y++) {
          for (let x = 0; x < view.width; x++) {
            const srcIdx = (y * view.width + x) * 4;
            const dstX = ox + x;
            const dstY = oy + y;
            if (dstX >= 0 && dstX < width && dstY >= 0 && dstY < height) {
              const dstIdx = (dstY * width + dstX) * 4;
              pixels[dstIdx] = view.pixels[srcIdx];
              pixels[dstIdx + 1] = view.pixels[srcIdx + 1];
              pixels[dstIdx + 2] = view.pixels[srcIdx + 2];
              pixels[dstIdx + 3] = view.pixels[srcIdx + 3];
            }
          }
        }
      }
      timelineState.setFrameLayerData(frameId, activeLayerId, pixels);
    }

    reset();
    setDialog(false);
  };

  // Draw preview when result changes
  React.useEffect(() => {
    if (!result || !previewCanvasRef.current) return;
    const view = result.views.find(v => v.angle === previewAngle);
    if (!view) return;

    const canvas = previewCanvasRef.current;
    const scale = Math.min(4, Math.max(1, Math.floor(200 / Math.max(view.width, view.height))));
    canvas.width = view.width * scale;
    canvas.height = view.height * scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    const imgData = new ImageData(new Uint8ClampedArray(view.pixels), view.width, view.height);
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = view.width;
    tempCanvas.height = view.height;
    tempCanvas.getContext('2d')!.putImageData(imgData, 0, 0);
    ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
  }, [result, previewAngle]);

  // Auto-estimate depth when dialog opens
  React.useEffect(() => {
    if (showDialog && !depthMap) {
      handleEstimateDepth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDialog]);

  const source = getSourcePixels();
  if (!source) return null;

  return (
    <Dialog
      open={showDialog}
      onClose={() => { reset(); setDialog(false); }}
      title={t('ai.3d.title', 'Generate 3D Views')}
    >
      <div className="space-y-4">
        {/* Depth Map Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted font-medium">{t('ai.3d.depthMap', 'Depth Map')}</span>
            <div className="flex gap-1">
              <Button
                variant={depthEstimationMethod === 'heuristic' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => { setDepthEstimationMethod('heuristic'); handleEstimateDepth(); }}
              >
                EDT
              </Button>
              <Button
                variant={depthEstimationMethod === 'edgeBased' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => { setDepthEstimationMethod('edgeBased'); handleEstimateDepth(); }}
              >
                Edge
              </Button>
            </div>
          </div>

          <DepthMapCanvas
            depthMap={depthMap}
            sourcePixels={source.pixels}
            width={source.width}
            height={source.height}
            onPaintDepth={paintDepth}
          />
        </div>

        {/* Angle Selector — Compass Rose + Presets */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted font-medium">{t('ai.3d.angles', 'Angles')}</span>
            <div className="flex gap-1">
              <Button
                variant={selectedAngles.length === 4 && (['N', 'E', 'S', 'W'] as RotationAngle[]).every(a => selectedAngles.includes(a)) ? 'default' : 'ghost'}
                size="sm"
                className="!px-2 !text-[10px]"
                onClick={() => setSelectedAngles(['N', 'E', 'S', 'W'])}
              >
                {t('ai.3d.cardinal', '4 Cardinal')}
              </Button>
              <Button
                variant={selectedAngles.length === 8 ? 'default' : 'ghost'}
                size="sm"
                className="!px-2 !text-[10px]"
                onClick={() => setSelectedAngles(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'])}
              >
                {t('ai.3d.all8', 'All 8')}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 w-fit">
            {(['NW', 'N', 'NE', 'W', null, 'E', 'SW', 'S', 'SE'] as (RotationAngle | null)[]).map(
              (angle, i) => {
                if (angle === null) {
                  return <div key={i} className="w-10 h-7" />;
                }
                const selected = selectedAngles.includes(angle);
                return (
                  <Button
                    key={angle}
                    variant={selected ? 'default' : 'ghost'}
                    size="sm"
                    className="!w-10 !px-0"
                    onClick={() => toggleAngle(angle)}
                  >
                    {ANGLE_LABELS[angle]}
                  </Button>
                );
              }
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-2">
          <Slider
            label={t('ai.3d.depth', 'Depth')}
            value={maxDepthLayers}
            min={4}
            max={32}
            step={4}
            onChange={setMaxDepthLayers}
          />
          <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={paletteConstrain}
              onChange={(e) => setPaletteConstrain(e.target.checked)}
              className="accent-accent"
            />
            {t('ai.3d.constrainPalette', 'Constrain to palette')}
          </label>
        </div>

        {/* Generate Button / Progress / Preview */}
        {(status === 'idle' || status === 'error') && (
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={handleGenerate}
            disabled={selectedAngles.length === 0}
          >
            <PixelIcon name="rotate3d" size={12} className="mr-1" />
            {t('ai.3d.generate', 'Generate {count} Views', { count: selectedAngles.length })}
          </Button>
        )}

        {(status === 'estimatingDepth' || status === 'buildingVoxels' || status === 'rendering') && (
          <div className="flex flex-col items-center gap-2 py-2">
            <PixelIcon name="loader" size={20} className="animate-spin text-accent" />
            <div className="w-full bg-border rounded-full h-1.5">
              <div className="bg-accent h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs text-muted">{t('ai.3d.generating', 'Generating... {progress}%', { progress })}</span>
          </div>
        )}

        {status === 'preview' && result && (
          <div className="space-y-2">
            {/* Angle preview tabs */}
            <div className="flex gap-1 flex-wrap">
              {result.views.map(view => (
                <Button
                  key={view.angle}
                  variant={previewAngle === view.angle ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewAngle(view.angle)}
                  className="!px-2"
                >
                  {ANGLE_LABELS[view.angle]}
                </Button>
              ))}
            </div>

            {/* Preview canvas */}
            <div className="flex justify-center bg-background rounded-lg p-2 border border-border">
              <canvas
                ref={previewCanvasRef}
                className="border border-border/50"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>

            {/* Accept/Reject */}
            <div className="flex gap-2">
              <Button variant="default" size="sm" className="flex-1" onClick={handleAcceptAll}>
                <PixelIcon name="check" size={12} className="mr-1" /> {t('ai.3d.acceptAll', 'Accept All')}
              </Button>
              <Button variant="danger" size="sm" className="flex-1" onClick={() => { reset(); }}>
                <PixelIcon name="close" size={12} className="mr-1" /> {t('ai.3d.reject', 'Reject')}
              </Button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <p className="text-xs text-danger">{t('ai.3d.error', 'Error generating views. Try again.')}</p>
        )}
      </div>
    </Dialog>
  );
}
