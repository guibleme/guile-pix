'use client';

import React, { useCallback } from 'react';
import { useSpriteLibraryStore } from '@/stores/useSpriteLibraryStore';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { renderTemplate } from '@/lib/sprites/templateRenderer';
import SpritePreviewCanvas from './SpritePreviewCanvas';
import SpriteColorCustomizer from './SpriteColorCustomizer';
import Button from '@/components/ui/Button';
import PixelIcon from '@/components/ui/PixelIcon';
import { nanoid } from 'nanoid';
import { DEFAULT_FPS, DEFAULT_FRAME_DURATION } from '@/constants/animation';

export default function SpriteDetailView() {
  const template = useSpriteLibraryStore((s) => s.selectedTemplate);
  const scheme = useSpriteLibraryStore((s) => s.selectedScheme);
  const customColors = useSpriteLibraryStore((s) => s.customColors);
  const clearSelection = useSpriteLibraryStore((s) => s.clearSelection);
  const createDocument = useWorkspaceStore((s) => s.createDocument);

  const handleUseInProject = useCallback(() => {
    if (!template) return;

    const imageData = renderTemplate(template, scheme, Object.keys(customColors).length > 0 ? customColors : undefined);
    const layerId = nanoid();
    const frameId = nanoid();
    const projectId = nanoid();

    createDocument({
      project: {
        id: projectId,
        name: template.name.replace(/_16$|_32$/, '').replace(/_/g, ' '),
        width: template.width,
        height: template.height,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      layers: [{
        id: layerId,
        name: 'Layer 1',
        visible: true,
        locked: false,
        opacity: 1,
        blendMode: 'normal' as const,
      }],
      activeLayerId: layerId,
      frames: [{
        id: frameId,
        index: 0,
        duration: DEFAULT_FRAME_DURATION,
        layerData: {
          [layerId]: new Uint8ClampedArray(imageData.data),
        },
      }],
      fps: DEFAULT_FPS,
      activeFrameIndex: 0,
    }, { setActive: true });
  }, [template, scheme, customColors, createDocument]);

  if (!template) return null;

  const displayName = template.name.replace(/_16$|_32$/, '').replace(/_/g, ' ');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
        <button
          type="button"
          onClick={clearSelection}
          className="p-1 rounded-md hover:bg-surface-hover"
        >
          <PixelIcon name="arrowLeft" size={14} />
        </button>
        <span className="text-xs font-semibold truncate">{displayName}</span>
        <span className="ml-auto text-[10px] text-muted">{template.width}x{template.height}</span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Live preview */}
        <div className="flex justify-center">
          <SpritePreviewCanvas
            template={template}
            scheme={scheme}
            customColors={Object.keys(customColors).length > 0 ? customColors : undefined}
            scale={template.width >= 32 ? 4 : 8}
            className="border border-border/50"
          />
        </div>

        {/* Info */}
        {template.description && (
          <p className="text-[11px] text-muted leading-relaxed">{template.description}</p>
        )}

        {/* Color customizer */}
        <SpriteColorCustomizer />

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <Button
            size="sm"
            onClick={handleUseInProject}
            className="w-full"
          >
            Open as New Tab
          </Button>
        </div>
      </div>
    </div>
  );
}
