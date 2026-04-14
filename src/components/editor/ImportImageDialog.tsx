'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import Dialog from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import { clamp } from '@/lib/utils/math';
import useI18n from '@/hooks/useI18n';
import { isDefaultProjectName } from '@/lib/i18n';

interface ImportImageDialogProps {
  imageData: ImageData;
  sourceName: string;
  onImport: (imageData: ImageData, importMode: 'new-project' | 'current-project') => void;
  onCancel: () => void;
}

export default function ImportImageDialog({ imageData, sourceName, onImport, onCancel }: ImportImageDialogProps) {
  const { t } = useI18n();
  const currentProject = useProjectStore((s) => s.project);
  const isCurrentProjectEmpty = useProjectStore((s) => isDefaultProjectName(s.project.name) && s.project.width === 32 && s.project.height === 32);

  const computeSuggestedSizing = React.useCallback((mode: 'new-project' | 'current-project') => {
    if (!isCurrentProjectEmpty && mode === 'current-project') {
      const projectAspect = currentProject.width / currentProject.height;
      const imageAspect = imageData.width / imageData.height;

      let newWidth: number;
      let newHeight: number;
      if (imageAspect > projectAspect) {
        newWidth = currentProject.width;
        newHeight = Math.round(currentProject.width / imageAspect);
      } else {
        newHeight = currentProject.height;
        newWidth = Math.round(currentProject.height * imageAspect);
      }

      return {
        width: newWidth,
        height: newHeight,
        scale: Math.round((newWidth / imageData.width) * 100),
      };
    }

    return {
      width: imageData.width,
      height: imageData.height,
      scale: 100,
    };
  }, [currentProject.height, currentProject.width, imageData.height, imageData.width, isCurrentProjectEmpty]);

  const initialSizing = React.useMemo(() => computeSuggestedSizing('current-project'), [computeSuggestedSizing]);
  const [importMode, setImportMode] = useState<'new-project' | 'current-project'>('current-project');
  const [targetWidth, setTargetWidth] = useState(initialSizing.width);
  const [targetHeight, setTargetHeight] = useState(initialSizing.height);
  const [scale, setScale] = useState(initialSizing.scale);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const applySuggestedSizing = (mode: 'new-project' | 'current-project') => {
    const next = computeSuggestedSizing(mode);
    setTargetWidth(next.width);
    setTargetHeight(next.height);
    setScale(next.scale);
  };
  
  // Render preview
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Create temp canvas with original image
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    tempCtx.putImageData(imageData, 0, 0);
    
    // Clear and draw scaled version
    ctx.fillStyle = '#1a1525';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Calculate preview dimensions
    const maxPreviewSize = 200;
    const aspect = targetWidth / targetHeight;
    let previewWidth, previewHeight;
    
    if (aspect > 1) {
      previewWidth = maxPreviewSize;
      previewHeight = maxPreviewSize / aspect;
    } else {
      previewHeight = maxPreviewSize;
      previewWidth = maxPreviewSize * aspect;
    }
    
    const offsetX = (canvas.width - previewWidth) / 2;
    const offsetY = (canvas.height - previewHeight) / 2;
    
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, imageData.width, imageData.height, offsetX, offsetY, previewWidth, previewHeight);
    
    // Draw border
    ctx.strokeStyle = '#f5a623';
    ctx.lineWidth = 2;
    ctx.strokeRect(offsetX, offsetY, previewWidth, previewHeight);
  }, [imageData, targetWidth, targetHeight]);
  
  const handleWidthChange = (value: number) => {
    const clamped = clamp(Math.round(value), 1, 1024);
    setTargetWidth(clamped);
    
    if (maintainAspectRatio) {
      const aspect = imageData.width / imageData.height;
      const newHeight = Math.round(clamped / aspect);
      setTargetHeight(newHeight);
      setScale(Math.round((clamped / imageData.width) * 100));
    }
  };
  
  const handleHeightChange = (value: number) => {
    const clamped = clamp(Math.round(value), 1, 1024);
    setTargetHeight(clamped);
    
    if (maintainAspectRatio) {
      const aspect = imageData.width / imageData.height;
      const newWidth = Math.round(clamped * aspect);
      setTargetWidth(newWidth);
      setScale(Math.round((clamped / imageData.height) * 100));
    }
  };
  
  const handleScaleChange = (newScale: number) => {
    const clamped = clamp(Math.round(newScale), 1, 400);
    setScale(clamped);
    
    const newWidth = Math.round(imageData.width * (clamped / 100));
    const newHeight = Math.round(imageData.height * (clamped / 100));
    
    setTargetWidth(newWidth);
    setTargetHeight(newHeight);
  };
  
  const handleImport = () => {
    // Rescale image data to target size
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    tempCtx.putImageData(imageData, 0, 0);
    
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = targetWidth;
    outputCanvas.height = targetHeight;
    const outputCtx = outputCanvas.getContext('2d');
    if (!outputCtx) return;
    
    outputCtx.imageSmoothingEnabled = false;
    outputCtx.drawImage(tempCanvas, 0, 0, targetWidth, targetHeight);
    
    const scaledImageData = outputCtx.getImageData(0, 0, targetWidth, targetHeight);
    onImport(scaledImageData, importMode);
  };
  
  return (
    <Dialog open={true} onClose={onCancel} title={t('import.title', 'Import Image')}>
      <div className="space-y-4 w-[400px]">
        <div className="text-xs text-muted">
          {t('import.importing', 'Importing:')} <span className="text-foreground">{sourceName}</span>
          <br />
          {t('import.originalSize', 'Original size:')} {imageData.width} × {imageData.height}
        </div>
        
        {/* Preview */}
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={220}
            height={220}
            className="border border-border rounded bg-background"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        
        {/* Import Mode */}
        <div>
          <label className="text-xs text-muted block mb-2">{t('import.mode', 'Import Mode')}</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setImportMode('current-project');
                applySuggestedSizing('current-project');
              }}
              disabled={isCurrentProjectEmpty}
              className={`px-3 py-2 text-xs rounded border transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                ${importMode === 'current-project' ? 'border-accent bg-accent/20 text-foreground' : 'border-border text-muted hover:border-border-light'}`}
            >
              {t('import.toCurrent', 'Import to Current')}
            </button>
            <button
              type="button"
              onClick={() => {
                setImportMode('new-project');
                applySuggestedSizing('new-project');
              }}
              className={`px-3 py-2 text-xs rounded border transition-colors
                ${importMode === 'new-project' ? 'border-accent bg-accent/20 text-foreground' : 'border-border text-muted hover:border-border-light'}`}
            >
              {t('import.newProject', 'New Project')}
            </button>
          </div>
          {isCurrentProjectEmpty && (
            <p className="text-[10px] text-muted mt-1">
              {t('import.noActiveProject', 'No active project. Will create new project.')}
            </p>
          )}
        </div>
        
        {/* Scale Control */}
        <div>
          <label className="text-xs text-muted block mb-2">{t('import.scale', 'Scale: {value}%', { value: scale })}</label>
          <input
            type="range"
            min="1"
            max="400"
            value={scale}
            onChange={(e) => handleScaleChange(Number(e.target.value))}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between text-[10px] text-muted mt-1">
            <span>1%</span>
            <span>100%</span>
            <span>400%</span>
          </div>
        </div>
        
        {/* Dimensions */}
        <div>
          <label className="text-xs text-muted block mb-2">{t('import.dimensions', 'Dimensions')}</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-muted block mb-1">{t('import.width', 'Width')}</label>
              <input
                type="number"
                min="1"
                max="1024"
                value={targetWidth}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted block mb-1">{t('import.height', 'Height')}</label>
              <input
                type="number"
                min="1"
                max="1024"
                value={targetHeight}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-full px-2 py-1.5 text-sm bg-background border border-border rounded text-foreground"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 mt-2 text-xs text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={maintainAspectRatio}
              onChange={(e) => setMaintainAspectRatio(e.target.checked)}
              className="rounded border-border"
            />
            {t('import.maintainAspect', 'Maintain aspect ratio')}
          </label>
        </div>
        
        {/* Final Size Info */}
        <div className="text-xs text-center text-muted bg-surface/50 rounded p-2">
          {t('import.finalSize', 'Final size:')} <span className="text-foreground font-medium">{targetWidth} × {targetHeight}</span>
          {importMode === 'current-project' && (
            <span className="block text-[10px] mt-1">
              {t('import.projectCanvas', 'Project canvas:')} {currentProject.width} × {currentProject.height}
            </span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="ghost" onClick={onCancel} className="flex-1">
            {t('import.cancel', 'Cancel')}
          </Button>
          <Button data-dialog-default="true" onClick={handleImport} className="flex-1">
            {t('import.importButton', 'Import')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
