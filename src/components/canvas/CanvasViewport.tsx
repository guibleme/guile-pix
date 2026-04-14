'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { CanvasEngine } from '@/lib/canvas/CanvasEngine';
import { PixelBuffer } from '@/lib/canvas/PixelBuffer';
import { useCanvasStore } from '@/stores/useCanvasStore';
import { useLayerStore } from '@/stores/useLayerStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useToolStore } from '@/stores/useToolStore';
import { usePaletteStore } from '@/stores/usePaletteStore';
import { useHistoryStore } from '@/stores/useHistoryStore';
import { toolRegistry } from '@/lib/tools/ToolRegistry';
import { getSymmetryPoints } from '@/lib/tools/symmetry';
import { getPixelClipboard, setPixelClipboard } from '@/lib/editor/pixelClipboard';
import {
  readPixelsFromPasteEvent,
  readPixelsFromSystemClipboard,
  writePixelsToSystemClipboard,
} from '@/lib/editor/systemClipboard';
import { TRANSPARENT } from '@/lib/utils/color';
import { bresenhamLine } from '@/lib/utils/math';
import type { RGBA } from '@/types/color';
import type {
  BrushShape,
  FreehandAlgorithm,
  FreehandTracePolicy,
  SymmetryMode,
  ToolContext,
  ToolType,
} from '@/types/tool';
import useI18n from '@/hooks/useI18n';
import { usePlayerStatsStore } from '@/stores/usePlayerStatsStore';
import { useDungeonStore } from '@/stores/useDungeonStore';

const EMPTY_PIXEL_BUFFER = new Uint8ClampedArray(0);
const SYMMETRY_GUIDE_HANDLE_SIZE = 6;
const SYMMETRY_GUIDE_EDGE_MARGIN = 2;
const SYMMETRY_HANDLE_HIT_PADDING = 6;
const SYMMETRY_LINE_HIT_TOLERANCE = 4;

type SymmetryDragAxis = 'x' | 'y';

interface SelectionRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface SelectionContextRef {
  frameId: string;
  layerId: string;
}

function clampPixelCoordinate(value: number, max: number): number {
  return Math.max(0, Math.min(max - 1, value));
}

function buildSelectionRectFromPoints(
  from: { x: number; y: number },
  to: { x: number; y: number },
  width: number,
  height: number
): SelectionRect | null {
  if (width <= 0 || height <= 0) return null;

  const x0 = clampPixelCoordinate(from.x, width);
  const y0 = clampPixelCoordinate(from.y, height);
  const x1 = clampPixelCoordinate(to.x, width);
  const y1 = clampPixelCoordinate(to.y, height);

  const x = Math.min(x0, x1);
  const y = Math.min(y0, y1);
  const w = Math.abs(x1 - x0) + 1;
  const h = Math.abs(y1 - y0) + 1;
  if (w <= 0 || h <= 0) return null;
  return { x, y, w, h };
}

function isPointInsideSelectionRect(x: number, y: number, rect: SelectionRect): boolean {
  return x >= rect.x && x < rect.x + rect.w && y >= rect.y && y < rect.y + rect.h;
}

function extractSelectionPixels(
  source: Uint8ClampedArray,
  width: number,
  height: number,
  rect: SelectionRect
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(rect.w * rect.h * 4);
  for (let y = 0; y < rect.h; y += 1) {
    const srcY = rect.y + y;
    if (srcY < 0 || srcY >= height) continue;
    for (let x = 0; x < rect.w; x += 1) {
      const srcX = rect.x + x;
      if (srcX < 0 || srcX >= width) continue;
      const srcI = (srcY * width + srcX) * 4;
      const dstI = (y * rect.w + x) * 4;
      out[dstI] = source[srcI];
      out[dstI + 1] = source[srcI + 1];
      out[dstI + 2] = source[srcI + 2];
      out[dstI + 3] = source[srcI + 3];
    }
  }
  return out;
}

function clearSelectionPixels(
  target: Uint8ClampedArray,
  width: number,
  height: number,
  rect: SelectionRect
): void {
  for (let y = 0; y < rect.h; y += 1) {
    const dstY = rect.y + y;
    if (dstY < 0 || dstY >= height) continue;
    for (let x = 0; x < rect.w; x += 1) {
      const dstX = rect.x + x;
      if (dstX < 0 || dstX >= width) continue;
      const i = (dstY * width + dstX) * 4;
      target[i] = 0;
      target[i + 1] = 0;
      target[i + 2] = 0;
      target[i + 3] = 0;
    }
  }
}

function stampSelectionPixels(
  target: Uint8ClampedArray,
  width: number,
  height: number,
  selectionPixels: Uint8ClampedArray,
  sourceRect: SelectionRect,
  offsetX: number,
  offsetY: number
): void {
  for (let y = 0; y < sourceRect.h; y += 1) {
    for (let x = 0; x < sourceRect.w; x += 1) {
      const dstX = sourceRect.x + x + offsetX;
      const dstY = sourceRect.y + y + offsetY;
      if (dstX < 0 || dstX >= width || dstY < 0 || dstY >= height) continue;

      const srcI = (y * sourceRect.w + x) * 4;
      const dstI = (dstY * width + dstX) * 4;
      target[dstI] = selectionPixels[srcI];
      target[dstI + 1] = selectionPixels[srcI + 1];
      target[dstI + 2] = selectionPixels[srcI + 2];
      target[dstI + 3] = selectionPixels[srcI + 3];
    }
  }
}

function stampPixelBlock(
  target: Uint8ClampedArray,
  width: number,
  height: number,
  pixels: Uint8ClampedArray,
  pixelsWidth: number,
  pixelsHeight: number,
  dstX: number,
  dstY: number
): void {
  for (let y = 0; y < pixelsHeight; y += 1) {
    for (let x = 0; x < pixelsWidth; x += 1) {
      const xOut = dstX + x;
      const yOut = dstY + y;
      if (xOut < 0 || xOut >= width || yOut < 0 || yOut >= height) continue;

      const srcI = (y * pixelsWidth + x) * 4;
      const dstI = (yOut * width + xOut) * 4;
      target[dstI] = pixels[srcI];
      target[dstI + 1] = pixels[srcI + 1];
      target[dstI + 2] = pixels[srcI + 2];
      target[dstI + 3] = pixels[srcI + 3];
    }
  }
}

function getVisibleRectWithinCanvas(
  x: number,
  y: number,
  w: number,
  h: number,
  canvasWidth: number,
  canvasHeight: number
): SelectionRect | null {
  const x0 = Math.max(0, x);
  const y0 = Math.max(0, y);
  const x1 = Math.min(canvasWidth, x + w);
  const y1 = Math.min(canvasHeight, y + h);
  if (x1 <= x0 || y1 <= y0) return null;
  return {
    x: x0,
    y: y0,
    w: x1 - x0,
    h: y1 - y0,
  };
}

function hasPixelDataChanged(a: Uint8ClampedArray, b: Uint8ClampedArray): boolean {
  if (a.length !== b.length) return true;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return true;
  }
  return false;
}

function isShapePreviewTool(toolId: ToolType): boolean {
  return toolId === 'line' || toolId === 'rect';
}

function isFreehandTool(toolId: ToolType): boolean {
  return toolId === 'brush' || toolId === 'eraser';
}

function isSelectionTool(toolId: ToolType): boolean {
  return toolId === 'select';
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.max(0, Math.min(1, value));
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function isEditableEventTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

function resolveStampPressureBrushSize(ctx: ToolContext): number {
  if (ctx.pressureMode !== 'size' && ctx.pressureMode !== 'sizeOpacity') {
    return ctx.brushSize;
  }
  const pressure = clamp01(ctx.pressure);
  const factor = clamp01(lerp(ctx.pressureSizeMin, 1, pressure));
  return Math.max(1, Math.round(ctx.brushSize * factor));
}

function resolveStampPressureFlow(ctx: ToolContext): number {
  if (ctx.pressureMode !== 'opacity' && ctx.pressureMode !== 'sizeOpacity') {
    return 1;
  }
  const pressure = clamp01(ctx.pressure);
  return clamp01(lerp(ctx.pressureOpacityMin, 1, pressure));
}

function applyStampWithFlow(x: number, y: number, ctx: ToolContext, color: RGBA, flow: number): void {
  if (x < 0 || x >= ctx.width || y < 0 || y >= ctx.height) return;

  const resolvedFlow = clamp01(flow);
  if (resolvedFlow <= 0) return;

  if (resolvedFlow >= 0.999 && color.a >= 255) {
    ctx.setPixel(x, y, color);
    return;
  }

  const source = ctx.getPixel(x, y);
  if (color.a === 0) {
    const nextAlpha = Math.round(source.a * (1 - resolvedFlow));
    if (nextAlpha <= 0) {
      ctx.setPixel(x, y, { r: 0, g: 0, b: 0, a: 0 });
    } else {
      ctx.setPixel(x, y, { r: source.r, g: source.g, b: source.b, a: nextAlpha });
    }
    return;
  }

  const sourceAlpha = source.a / 255;
  const paintAlpha = (color.a / 255) * resolvedFlow;
  const outAlpha = paintAlpha + sourceAlpha * (1 - paintAlpha);
  if (outAlpha <= 0) {
    ctx.setPixel(x, y, { r: 0, g: 0, b: 0, a: 0 });
    return;
  }

  const outR = Math.round((color.r * paintAlpha + source.r * sourceAlpha * (1 - paintAlpha)) / outAlpha);
  const outG = Math.round((color.g * paintAlpha + source.g * sourceAlpha * (1 - paintAlpha)) / outAlpha);
  const outB = Math.round((color.b * paintAlpha + source.b * sourceAlpha * (1 - paintAlpha)) / outAlpha);
  const outA = Math.round(outAlpha * 255);
  ctx.setPixel(x, y, { r: outR, g: outG, b: outB, a: outA });
}

function drawBrushStamp(x: number, y: number, ctx: ToolContext, color: RGBA): void {
  const size = resolveStampPressureBrushSize(ctx);
  const flow = resolveStampPressureFlow(ctx);
  const half = Math.floor(size / 2);

  if (ctx.brushShape === 'square') {
    for (let dy = 0; dy < size; dy += 1) {
      for (let dx = 0; dx < size; dx += 1) {
        applyStampWithFlow(x - half + dx, y - half + dy, ctx, color, flow);
      }
    }
    return;
  }

  const radius = size / 2;
  const ceilRadius = Math.ceil(radius);
  for (let dy = -ceilRadius; dy <= ceilRadius; dy += 1) {
    for (let dx = -ceilRadius; dx <= ceilRadius; dx += 1) {
      if (dx * dx + dy * dy <= radius * radius) {
        applyStampWithFlow(x + dx, y + dy, ctx, color, flow);
      }
    }
  }
}

function drawConstrainedFreehandLine(
  toolId: ToolType,
  from: { x: number; y: number },
  to: { x: number; y: number },
  ctx: ToolContext
): void {
  const color = toolId === 'eraser' ? TRANSPARENT : ctx.color;
  const points = bresenhamLine(from.x, from.y, to.x, to.y);
  for (const point of points) {
    const symmetryPoints = getSymmetryPoints(point.x, point.y, ctx);
    for (const symmetryPoint of symmetryPoints) {
      drawBrushStamp(symmetryPoint.x, symmetryPoint.y, ctx, color);
    }
  }
}

function clampSymmetryAxis(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}

function drawCanvasBoundsGuide(
  ctx: CanvasRenderingContext2D,
  engine: CanvasEngine,
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): void {
  const transform = engine.transform;
  const topLeft = transform.pixelToScreen(0, 0, canvas.width, canvas.height, width, height);
  const bottomRight = transform.pixelToScreen(width, height, canvas.width, canvas.height, width, height);
  const rectWidth = Math.max(0, bottomRight.x - topLeft.x);
  const rectHeight = Math.max(0, bottomRight.y - topLeft.y);

  if (rectWidth < 1 || rectHeight < 1) return;

  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.92)';
  ctx.strokeRect(topLeft.x + 0.5, topLeft.y + 0.5, Math.max(0, rectWidth - 1), Math.max(0, rectHeight - 1));

  if (rectWidth > 4 && rectHeight > 4) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.strokeRect(topLeft.x + 1.5, topLeft.y + 1.5, Math.max(0, rectWidth - 3), Math.max(0, rectHeight - 3));
  }
  ctx.restore();
}

function drawWorkspaceMask(
  ctx: CanvasRenderingContext2D,
  engine: CanvasEngine,
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): void {
  const transform = engine.transform;
  const topLeft = transform.pixelToScreen(0, 0, canvas.width, canvas.height, width, height);
  const bottomRight = transform.pixelToScreen(width, height, canvas.width, canvas.height, width, height);
  const x = Math.floor(topLeft.x);
  const y = Math.floor(topLeft.y);
  const w = Math.ceil(bottomRight.x - topLeft.x);
  const h = Math.ceil(bottomRight.y - topLeft.y);

  if (w <= 0 || h <= 0) return;

  ctx.save();
  const maskColor = typeof document !== 'undefined'
    ? (getComputedStyle(document.documentElement).getPropertyValue('--ui-workspace-mask').trim() || 'rgba(0, 0, 0, 0.24)')
    : 'rgba(0, 0, 0, 0.24)';
  ctx.fillStyle = maskColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(x, y, w, h);
  ctx.restore();
}

function resolvePointerPressureSample(
  pointerType: string,
  rawPressure: number,
  pressureEnabled: boolean,
  previous: number
): number {
  if (!pressureEnabled) return 1;
  if (pointerType === 'mouse' || pointerType.length === 0) return 1;

  const sample = clamp01(rawPressure);
  if (sample > 0) return sample;
  return clamp01(previous || 1);
}

function getSymmetryDragAxisAtPosition(
  localX: number,
  localY: number,
  engine: CanvasEngine,
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  mode: SymmetryMode,
  axisX: number,
  axisY: number,
  allowLineHit: boolean
): SymmetryDragAxis | null {
  if (mode === 'none') return null;

  const transform = engine.transform;
  const candidates: Array<{ axis: SymmetryDragAxis; distance: number }> = [];
  const half = Math.floor(SYMMETRY_GUIDE_HANDLE_SIZE / 2);

  const hasHorizontal = mode === 'horizontal' || mode === 'both';
  if (hasHorizontal) {
    const top = transform.pixelToScreen(axisX, 0, canvas.width, canvas.height, width, height);
    const x = top.x;
    const nearHandleX = Math.abs(localX - x) <= half + SYMMETRY_HANDLE_HIT_PADDING;
    const nearTopHandle = localY <= SYMMETRY_GUIDE_HANDLE_SIZE + SYMMETRY_GUIDE_EDGE_MARGIN + SYMMETRY_HANDLE_HIT_PADDING;
    const nearBottomHandle =
      localY >= canvas.height - (SYMMETRY_GUIDE_HANDLE_SIZE + SYMMETRY_GUIDE_EDGE_MARGIN + SYMMETRY_HANDLE_HIT_PADDING);
    if (nearHandleX && (nearTopHandle || nearBottomHandle)) {
      candidates.push({ axis: 'x', distance: Math.abs(localX - x) });
    } else if (allowLineHit && Math.abs(localX - x) <= SYMMETRY_LINE_HIT_TOLERANCE) {
      candidates.push({ axis: 'x', distance: Math.abs(localX - x) });
    }
  }

  const hasVertical = mode === 'vertical' || mode === 'both';
  if (hasVertical) {
    const left = transform.pixelToScreen(0, axisY, canvas.width, canvas.height, width, height);
    const y = left.y;
    const nearHandleY = Math.abs(localY - y) <= half + SYMMETRY_HANDLE_HIT_PADDING;
    const nearLeftHandle = localX <= SYMMETRY_GUIDE_HANDLE_SIZE + SYMMETRY_GUIDE_EDGE_MARGIN + SYMMETRY_HANDLE_HIT_PADDING;
    const nearRightHandle =
      localX >= canvas.width - (SYMMETRY_GUIDE_HANDLE_SIZE + SYMMETRY_GUIDE_EDGE_MARGIN + SYMMETRY_HANDLE_HIT_PADDING);
    if (nearHandleY && (nearLeftHandle || nearRightHandle)) {
      candidates.push({ axis: 'y', distance: Math.abs(localY - y) });
    } else if (allowLineHit && Math.abs(localY - y) <= SYMMETRY_LINE_HIT_TOLERANCE) {
      candidates.push({ axis: 'y', distance: Math.abs(localY - y) });
    }
  }

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a.distance - b.distance);
  return candidates[0].axis;
}

function drawSymmetryGuides(
  ctx: CanvasRenderingContext2D,
  engine: CanvasEngine,
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  mode: SymmetryMode,
  axisX: number,
  axisY: number
): void {
  if (mode === 'none') return;

  const transform = engine.transform;
  const hasHorizontal = mode === 'horizontal' || mode === 'both';
  const hasVertical = mode === 'vertical' || mode === 'both';

  ctx.save();
  ctx.setLineDash([6, 4]);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(255, 196, 0, 0.95)';
  ctx.fillStyle = 'rgba(255, 196, 0, 0.95)';

  if (hasHorizontal) {
    const top = transform.pixelToScreen(axisX, 0, canvas.width, canvas.height, width, height);
    const x = Math.round(top.x) + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  if (hasVertical) {
    const left = transform.pixelToScreen(0, axisY, canvas.width, canvas.height, width, height);
    const y = Math.round(left.y) + 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  ctx.setLineDash([]);

  const handleSize = SYMMETRY_GUIDE_HANDLE_SIZE;
  if (hasHorizontal) {
    const top = transform.pixelToScreen(axisX, 0, canvas.width, canvas.height, width, height);
    const x = Math.round(top.x);
    ctx.fillRect(x - Math.floor(handleSize / 2), SYMMETRY_GUIDE_EDGE_MARGIN, handleSize, handleSize);
    ctx.fillRect(
      x - Math.floor(handleSize / 2),
      canvas.height - handleSize - SYMMETRY_GUIDE_EDGE_MARGIN,
      handleSize,
      handleSize
    );
  }

  if (hasVertical) {
    const left = transform.pixelToScreen(0, axisY, canvas.width, canvas.height, width, height);
    const y = Math.round(left.y);
    ctx.fillRect(SYMMETRY_GUIDE_EDGE_MARGIN, y - Math.floor(handleSize / 2), handleSize, handleSize);
    ctx.fillRect(
      canvas.width - handleSize - SYMMETRY_GUIDE_EDGE_MARGIN,
      y - Math.floor(handleSize / 2),
      handleSize,
      handleSize
    );
  }

  ctx.restore();
}

function stabilizeFreehandPoint(
  raw: { x: number; y: number },
  previous: { x: number; y: number } | null,
  stabilizer: number
): { x: number; y: number } {
  if (stabilizer <= 0 || !previous) return raw;

  const dx = raw.x - previous.x;
  const dy = raw.y - previous.y;
  const distance = Math.hypot(dx, dy);

  // Suppress tiny hand jitter but still allow slow drift toward the pointer.
  const deadZone = Math.min(1.25 + stabilizer * 0.12, 3.5);
  if (distance <= deadZone) {
    const creepAlpha = Math.max(0.08, 1 / (stabilizer * 12));
    return {
      x: previous.x + dx * creepAlpha,
      y: previous.y + dy * creepAlpha,
    };
  }

  // Adaptive response: fast motions reduce smoothing to avoid visible lag.
  const baseAlpha = 1 / (1 + stabilizer * 1.35);
  const speedBoost = Math.min(distance / (10 + stabilizer * 2), 0.55);
  const alpha = Math.min(baseAlpha + speedBoost, 0.95);

  return {
    x: previous.x + dx * alpha,
    y: previous.y + dy * alpha,
  };
}

interface StrokeSettings {
  color: RGBA;
  brushSize: number;
  brushShape: BrushShape;
  strokeStabilizer: number;
  freehandAlgorithm: FreehandAlgorithm;
  freehandTracePolicy: FreehandTracePolicy;
  symmetryMode: SymmetryMode;
  symmetryAxisX: number;
  symmetryAxisY: number;
  pressureEnabled: boolean;
  pressureAffectsSize: boolean;
  pressureAffectsOpacity: boolean;
  pressureSizeMinPercent: number;
  pressureOpacityMinPercent: number;
}

export default function CanvasViewport() {
  const { t } = useI18n();
  const project = useProjectStore((s) => s.project);
  const zoomUi = useCanvasStore((s) => s.zoom);
  const activeToolUi = useToolStore((s) => s.activeTool);
  const activeFrameIndexUi = useTimelineStore((s) => s.activeFrameIndex);
  const frameCountUi = useTimelineStore((s) => s.frames.length);

  const containerRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<HTMLCanvasElement>(null);
  const onionRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<CanvasEngine | null>(null);

  const isDrawingRef = useRef(false);
  const activeToolRef = useRef<ToolType>('brush');
  const activePointerIdRef = useRef<number | null>(null);
  const lastStrokePixelRef = useRef({ x: 0, y: 0 });
  const lastStrokeEndRef = useRef<{ x: number; y: number } | null>(null);
  const hoverPreviewPixelRef = useRef<{ x: number; y: number } | null>(null);
  const strokeAnchorPixelRef = useRef<{ x: number; y: number } | null>(null);
  const wasShiftConstrainedRef = useRef(false);
  const smoothedPointerRef = useRef<{ x: number; y: number } | null>(null);
  const activePressureRef = useRef(1);

  const snapshotRef = useRef<Uint8ClampedArray | null>(null);
  const activePixelDataRef = useRef<Uint8ClampedArray | null>(null);
  const previewPixelDataRef = useRef<Uint8ClampedArray | null>(null);
  const activeFrameIdRef = useRef('');
  const activeLayerIdRef = useRef('');
  const strokeSettingsRef = useRef<StrokeSettings | null>(null);

  const isPanningRef = useRef(false);
  const panPointerIdRef = useRef<number | null>(null);
  const lastPanRef = useRef({ x: 0, y: 0 });
  const symmetryDragAxisRef = useRef<SymmetryDragAxis | null>(null);
  const symmetryDragPointerIdRef = useRef<number | null>(null);
  const cursorRef = useRef<'crosshair' | 'grab' | 'grabbing'>('crosshair');
  const selectionRectRef = useRef<SelectionRect | null>(null);
  const selectionContextRef = useRef<SelectionContextRef | null>(null);
  const selectionMarqueeAnchorRef = useRef<{ x: number; y: number } | null>(null);
  const selectionMarqueeCurrentRef = useRef<{ x: number; y: number } | null>(null);
  const selectionMarqueePointerIdRef = useRef<number | null>(null);
  const selectionMoveStartRef = useRef<{ x: number; y: number } | null>(null);
  const selectionMoveSourceRectRef = useRef<SelectionRect | null>(null);
  const selectionMovePixelsRef = useRef<Uint8ClampedArray | null>(null);
  const selectionMoveBasePixelsRef = useRef<Uint8ClampedArray | null>(null);
  const selectionMoveOffsetRef = useRef({ x: 0, y: 0 });
  const selectionMovePointerIdRef = useRef<number | null>(null);
  const selectionMoveCopyRef = useRef(false);

  const clearStrokeState = useCallback(() => {
    isDrawingRef.current = false;
    activePointerIdRef.current = null;
    snapshotRef.current = null;
    activePixelDataRef.current = null;
    previewPixelDataRef.current = null;
    activeFrameIdRef.current = '';
    activeLayerIdRef.current = '';
    strokeSettingsRef.current = null;
    strokeAnchorPixelRef.current = null;
    wasShiftConstrainedRef.current = false;
    smoothedPointerRef.current = null;
    activePressureRef.current = 1;
    selectionMoveStartRef.current = null;
    selectionMoveSourceRectRef.current = null;
    selectionMovePixelsRef.current = null;
    selectionMoveBasePixelsRef.current = null;
    selectionMoveOffsetRef.current = { x: 0, y: 0 };
    selectionMovePointerIdRef.current = null;
    selectionMoveCopyRef.current = false;
  }, []);

  const clearBrushPreview = useCallback(() => {
    const canvas = previewRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const setCanvasCursor = useCallback(
    (cursor: 'crosshair' | 'grab' | 'grabbing') => {
      if (cursorRef.current === cursor) return;
      cursorRef.current = cursor;
      if (gridRef.current) {
        gridRef.current.style.cursor = cursor;
      }
    },
    []
  );

  const clearSymmetryDragState = useCallback(() => {
    symmetryDragAxisRef.current = null;
    symmetryDragPointerIdRef.current = null;
  }, []);

  const clearSelectionState = useCallback(() => {
    selectionRectRef.current = null;
    selectionContextRef.current = null;
    selectionMarqueeAnchorRef.current = null;
    selectionMarqueeCurrentRef.current = null;
    selectionMarqueePointerIdRef.current = null;
    selectionMoveStartRef.current = null;
    selectionMoveSourceRectRef.current = null;
    selectionMovePixelsRef.current = null;
    selectionMoveBasePixelsRef.current = null;
    selectionMoveOffsetRef.current = { x: 0, y: 0 };
    selectionMovePointerIdRef.current = null;
    selectionMoveCopyRef.current = false;
  }, []);

  const isSelectionInActiveContext = useCallback((): boolean => {
    const selectionContext = selectionContextRef.current;
    if (!selectionContext) return false;
    const frameId = useTimelineStore.getState().getActiveFrame().id;
    const { activeLayerId } = useLayerStore.getState();
    return selectionContext.frameId === frameId && selectionContext.layerId === activeLayerId;
  }, []);

  const getMarqueeSelectionRect = useCallback((): SelectionRect | null => {
    const anchor = selectionMarqueeAnchorRef.current;
    const current = selectionMarqueeCurrentRef.current;
    if (!anchor || !current) return null;
    const { width, height } = useProjectStore.getState().project;
    return buildSelectionRectFromPoints(anchor, current, width, height);
  }, []);

  const getVisibleSelectionRect = useCallback((): SelectionRect | null => {
    if (!selectionRectRef.current || !isSelectionInActiveContext()) return null;

    if (
      isDrawingRef.current &&
      activeToolRef.current === 'select' &&
      selectionMoveSourceRectRef.current
    ) {
      const source = selectionMoveSourceRectRef.current;
      const offset = selectionMoveOffsetRef.current;
      return {
        x: source.x + offset.x,
        y: source.y + offset.y,
        w: source.w,
        h: source.h,
      };
    }

    return selectionRectRef.current;
  }, [isSelectionInActiveContext]);

  const drawSelectionRectOverlay = useCallback((
    ctx: CanvasRenderingContext2D,
    engine: CanvasEngine,
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    rect: SelectionRect,
    accent: 'active' | 'draft'
  ) => {
    const topLeft = engine.transform.pixelToScreen(rect.x, rect.y, canvas.width, canvas.height, width, height);
    const bottomRight = engine.transform.pixelToScreen(rect.x + rect.w, rect.y + rect.h, canvas.width, canvas.height, width, height);
    const x = topLeft.x;
    const y = topLeft.y;
    const w = Math.max(0, bottomRight.x - topLeft.x);
    const h = Math.max(0, bottomRight.y - topLeft.y);
    if (w <= 0 || h <= 0) return;

    const dashOffset = -(Date.now() / 80);
    const isActive = accent === 'active';
    
    ctx.save();
    
    // Semi-transparent fill inside selection
    ctx.fillStyle = isActive ? 'rgba(245, 166, 35, 0.08)' : 'rgba(148, 198, 255, 0.08)';
    ctx.fillRect(x, y, w, h);
    
    // Outer glow effect
    ctx.shadowColor = isActive ? 'rgba(245, 166, 35, 0.6)' : 'rgba(148, 198, 255, 0.6)';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.lineDashOffset = dashOffset;
    ctx.strokeStyle = isActive ? 'rgba(245, 166, 35, 1)' : 'rgba(148, 198, 255, 1)';
    ctx.strokeRect(x + 0.5, y + 0.5, Math.max(0, w - 1), Math.max(0, h - 1));
    
    // Second outline (darker, offset) for contrast
    ctx.shadowBlur = 0;
    ctx.lineDashOffset = dashOffset + 4.5;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.strokeRect(x + 0.5, y + 0.5, Math.max(0, w - 1), Math.max(0, h - 1));
    
    // Corner handles for active selection
    if (isActive && w > 16 && h > 16) {
      const handleSize = 6;
      const corners = [
        { x: x - handleSize/2, y: y - handleSize/2 },
        { x: x + w - handleSize/2, y: y - handleSize/2 },
        { x: x - handleSize/2, y: y + h - handleSize/2 },
        { x: x + w - handleSize/2, y: y + h - handleSize/2 },
      ];
      
      ctx.fillStyle = 'rgba(245, 166, 35, 1)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.lineWidth = 1;
      
      corners.forEach(corner => {
        ctx.fillRect(corner.x, corner.y, handleSize, handleSize);
        ctx.strokeRect(corner.x, corner.y, handleSize, handleSize);
      });
    }
    
    ctx.restore();
  }, []);

  const renderBrushPreview = useCallback(() => {
    const canvas = previewRef.current;
    const engine = engineRef.current;
    if (!canvas || !engine) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isPanningRef.current) return;

    const { width, height } = useProjectStore.getState().project;
    drawWorkspaceMask(ctx, engine, canvas, width, height);
    drawCanvasBoundsGuide(ctx, engine, canvas, width, height);

    const { activeTool, brushSize, brushShape, symmetryMode, symmetryAxisX, symmetryAxisY } = useToolStore.getState();
    const activeSelectionRect = getVisibleSelectionRect();
    if (activeSelectionRect) {
      drawSelectionRectOverlay(ctx, engine, canvas, width, height, activeSelectionRect, 'active');
    }
    const marqueeRect = getMarqueeSelectionRect();
    if (marqueeRect) {
      drawSelectionRectOverlay(ctx, engine, canvas, width, height, marqueeRect, 'draft');
    }
    if (!isFreehandTool(activeTool)) return;

    const { zoom } = useCanvasStore.getState();
    const resolvedAxisX = Math.max(
      0,
      Math.min(width, symmetryAxisX ?? Math.floor(width / 2))
    );
    const resolvedAxisY = Math.max(
      0,
      Math.min(height, symmetryAxisY ?? Math.floor(height / 2))
    );
    drawSymmetryGuides(ctx, engine, canvas, width, height, symmetryMode, resolvedAxisX, resolvedAxisY);
    if (symmetryDragAxisRef.current) return;

    const hoverPixel = hoverPreviewPixelRef.current;
    if (!hoverPixel) return;

    const previewToolContext: ToolContext = {
      width,
      height,
      color: { r: 0, g: 0, b: 0, a: 255 },
      brushSize,
      brushShape,
      freehandAlgorithm: 'default',
      freehandTracePolicy: 'accumulate',
      symmetryMode,
      symmetryAxisX: resolvedAxisX,
      symmetryAxisY: resolvedAxisY,
      pressure: 1,
      pressureMode: 'off',
      pressureSizeMin: 1,
      pressureOpacityMin: 1,
      getPixel: () => ({ r: 0, g: 0, b: 0, a: 0 }),
      setPixel: () => {},
      getPixelBuffer: () => EMPTY_PIXEL_BUFFER,
    };

    const symmetryPoints = getSymmetryPoints(hoverPixel.x, hoverPixel.y, previewToolContext);
    const transform = engine.transform;

    const drawDoubleOutlineRect = (x: number, y: number, w: number, h: number) => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.95)';
      ctx.strokeRect(x + 0.5, y + 0.5, Math.max(0, w - 1), Math.max(0, h - 1));
      if (w > 3 && h > 3) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.strokeRect(x + 1.5, y + 1.5, Math.max(0, w - 3), Math.max(0, h - 3));
      }
    };

    for (const point of symmetryPoints) {
      if (point.x < 0 || point.x >= width || point.y < 0 || point.y >= height) continue;

      const half = Math.floor(brushSize / 2);
      if (brushShape === 'square') {
        const topLeft = transform.pixelToScreen(
          point.x - half,
          point.y - half,
          canvas.width,
          canvas.height,
          width,
          height
        );
        drawDoubleOutlineRect(topLeft.x, topLeft.y, brushSize * zoom, brushSize * zoom);
        continue;
      }

      const center = transform.pixelToScreen(
        point.x,
        point.y,
        canvas.width,
        canvas.height,
        width,
        height
      );
      const centerX = center.x + zoom / 2;
      const centerY = center.y + zoom / 2;
      const radius = (brushSize / 2) * zoom;

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.95)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.max(0.5, radius - 0.5), 0, Math.PI * 2);
      ctx.stroke();

      if (radius > 2) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.max(0.5, radius - 1.5), 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }, [drawSelectionRectOverlay, getMarqueeSelectionRect, getVisibleSelectionRect]);

  const render = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const { zoom, showGrid, showOnionSkin, panX, panY, showTileGrid, tileGridWidth, tileGridHeight, tileGridOffsetX, tileGridOffsetY } = useCanvasStore.getState();
    const { layers } = useLayerStore.getState();
    const { width, height } = useProjectStore.getState().project;
    const frame = useTimelineStore.getState().getActiveFrame();
    const { frames, activeFrameIndex } = useTimelineStore.getState();

    engine.setZoom(zoom);
    engine.setPan(panX, panY);

    const layerBuffers = new Map<string, PixelBuffer>();
    for (const layer of layers) {
      if (isDrawingRef.current && layer.id === activeLayerIdRef.current) {
        const previewData =
          isShapePreviewTool(activeToolRef.current) && previewPixelDataRef.current
            ? previewPixelDataRef.current
            : null;
        const drawingData = previewData ?? activePixelDataRef.current;
        if (drawingData) {
          layerBuffers.set(layer.id, new PixelBuffer(width, height, drawingData));
          continue;
        }
      }

      const data = frame.layerData[layer.id];
      layerBuffers.set(
        layer.id,
        data ? new PixelBuffer(width, height, data) : new PixelBuffer(width, height)
      );
    }

    const tileGrid = showTileGrid ? { tileWidth: tileGridWidth, tileHeight: tileGridHeight, offsetX: tileGridOffsetX, offsetY: tileGridOffsetY } : undefined;
    engine.render(layers, layerBuffers, showGrid, tileGrid);

    if (showOnionSkin && frames.length > 1) {
      const prevFrame = activeFrameIndex > 0 ? frames[activeFrameIndex - 1] : null;
      const nextFrame = activeFrameIndex < frames.length - 1 ? frames[activeFrameIndex + 1] : null;

      let prevBuffer: PixelBuffer | null = null;
      let nextBuffer: PixelBuffer | null = null;

      if (prevFrame) {
        prevBuffer = new PixelBuffer(width, height);
        for (const layer of layers) {
          if (!layer.visible) continue;
          const data = prevFrame.layerData[layer.id];
          if (!data) continue;
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) {
              prevBuffer.data[i] = data[i];
              prevBuffer.data[i + 1] = data[i + 1];
              prevBuffer.data[i + 2] = data[i + 2];
              prevBuffer.data[i + 3] = data[i + 3];
            }
          }
        }
      }

      if (nextFrame) {
        nextBuffer = new PixelBuffer(width, height);
        for (const layer of layers) {
          if (!layer.visible) continue;
          const data = nextFrame.layerData[layer.id];
          if (!data) continue;
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) {
              nextBuffer.data[i] = data[i];
              nextBuffer.data[i + 1] = data[i + 1];
              nextBuffer.data[i + 2] = data[i + 2];
              nextBuffer.data[i + 3] = data[i + 3];
            }
          }
        }
      }

      engine.renderOnionSkin(prevBuffer, nextBuffer);
    } else {
      engine.clearOnionSkin();
    }

    renderBrushPreview();
  }, [renderBrushPreview]);

  const deleteSelection = useCallback((): boolean => {
    if (isDrawingRef.current || isPanningRef.current || symmetryDragAxisRef.current) return false;
    const rect = selectionRectRef.current;
    if (!rect || !isSelectionInActiveContext()) return false;

    const { width, height } = useProjectStore.getState().project;
    const { activeLayerId, layers } = useLayerStore.getState();
    const activeLayer = layers.find((layer) => layer.id === activeLayerId);
    if (!activeLayer || activeLayer.locked) return false;

    const timeline = useTimelineStore.getState();
    const frame = timeline.getActiveFrame();
    if (!frame.layerData[activeLayerId]) {
      timeline.initFrameLayer(frame.id, activeLayerId, width, height);
    }

    const refetched = timeline.getActiveFrame();
    const storeData = refetched.layerData[activeLayerId];
    if (!storeData) return false;

    const before = new Uint8ClampedArray(storeData);
    const after = new Uint8ClampedArray(before);
    clearSelectionPixels(after, width, height, rect);

    if (!hasPixelDataChanged(before, after)) return false;

    useHistoryStore.getState().pushEntry(
      'deleteSelection',
      refetched.id,
      activeLayerId,
      before,
      after
    );
    timeline.setFrameLayerData(refetched.id, activeLayerId, after);

    render();
    return true;
  }, [isSelectionInActiveContext, render]);

  const makeToolContext = useCallback((createSnapshot: boolean): ToolContext | null => {
    const { width, height } = useProjectStore.getState().project;

    let settings: StrokeSettings;

    if (createSnapshot) {
      const { foreground } = usePaletteStore.getState();
      const {
        brushSize,
        brushShape,
        strokeStabilizer,
        freehandAlgorithm,
        freehandTracePolicy,
        symmetryMode,
        symmetryAxisX,
        symmetryAxisY,
        pressureEnabled,
        pressureAffectsSize,
        pressureAffectsOpacity,
        pressureSizeMinPercent,
        pressureOpacityMinPercent,
      } = useToolStore.getState();
      const { activeLayerId, layers } = useLayerStore.getState();
      const activeLayer = layers.find((layer) => layer.id === activeLayerId);
      if (!activeLayer || activeLayer.locked) return null;

      const timeline = useTimelineStore.getState();
      const frame = timeline.getActiveFrame();
      if (!frame.layerData[activeLayerId]) {
        timeline.initFrameLayer(frame.id, activeLayerId, width, height);
      }
      const refetched = timeline.getActiveFrame();
      const storeData = refetched.layerData[activeLayerId];
      if (!storeData) return null;

      activePixelDataRef.current = new Uint8ClampedArray(storeData);
      if (isShapePreviewTool(activeToolRef.current)) {
        previewPixelDataRef.current = new Uint8ClampedArray(storeData);
      } else {
        previewPixelDataRef.current = null;
      }
      snapshotRef.current = new Uint8ClampedArray(storeData);
      activeFrameIdRef.current = refetched.id;
      activeLayerIdRef.current = activeLayerId;

      const resolvedAxisX = Math.max(
        0,
        Math.min(width, symmetryAxisX ?? Math.floor(width / 2))
      );
      const resolvedAxisY = Math.max(
        0,
        Math.min(height, symmetryAxisY ?? Math.floor(height / 2))
      );

      settings = {
        color: { ...foreground },
        brushSize,
        brushShape,
        strokeStabilizer,
        freehandAlgorithm,
        freehandTracePolicy,
        symmetryMode,
        symmetryAxisX: resolvedAxisX,
        symmetryAxisY: resolvedAxisY,
        pressureEnabled,
        pressureAffectsSize,
        pressureAffectsOpacity,
        pressureSizeMinPercent,
        pressureOpacityMinPercent,
      };
      strokeSettingsRef.current = settings;
    } else {
      if (!activePixelDataRef.current || !strokeSettingsRef.current) return null;
      settings = strokeSettingsRef.current;
    }

    const previewData =
      isShapePreviewTool(activeToolRef.current) && previewPixelDataRef.current
        ? previewPixelDataRef.current
        : null;
    const pixelData = previewData ?? activePixelDataRef.current!;

    return {
      width,
      height,
      color: settings.color,
      brushSize: settings.brushSize,
      brushShape: settings.brushShape,
      freehandAlgorithm: settings.freehandAlgorithm,
      freehandTracePolicy: settings.freehandTracePolicy,
      symmetryMode: settings.symmetryMode,
      symmetryAxisX: settings.symmetryAxisX,
      symmetryAxisY: settings.symmetryAxisY,
      pressure: clamp01(activePressureRef.current),
      pressureMode: !settings.pressureEnabled
        ? 'off'
        : settings.pressureAffectsSize
          ? settings.pressureAffectsOpacity
            ? 'sizeOpacity'
            : 'size'
          : settings.pressureAffectsOpacity
            ? 'opacity'
            : 'off',
      pressureSizeMin: clamp01(settings.pressureSizeMinPercent / 100),
      pressureOpacityMin: clamp01(settings.pressureOpacityMinPercent / 100),
      getPixel: (x: number, y: number) => {
        if (x < 0 || x >= width || y < 0 || y >= height) return { r: 0, g: 0, b: 0, a: 0 };
        const i = (y * width + x) * 4;
        return {
          r: pixelData[i],
          g: pixelData[i + 1],
          b: pixelData[i + 2],
          a: pixelData[i + 3],
        };
      },
      setPixel: (x: number, y: number, color) => {
        if (x < 0 || x >= width || y < 0 || y >= height) return;
        const i = (y * width + x) * 4;
        pixelData[i] = color.r;
        pixelData[i + 1] = color.g;
        pixelData[i + 2] = color.b;
        pixelData[i + 3] = color.a;
      },
      getPixelBuffer: () => pixelData,
    };
  }, []);

  const finalizeDrawingStroke = useCallback(
    (pixelX: number, pixelY: number, runToolPointerUp: boolean) => {
      if (!isDrawingRef.current) return;

      const toolId = activeToolRef.current;
      if (runToolPointerUp && !isSelectionTool(toolId)) {
        const ctx = makeToolContext(false);
        if (ctx) {
          const tool = toolRegistry.getTool(toolId);
          tool.onPointerUp(pixelX, pixelY, ctx);
        }
      }

      if (isShapePreviewTool(toolId) && previewPixelDataRef.current) {
        activePixelDataRef.current = new Uint8ClampedArray(previewPixelDataRef.current);
      }

      const before = snapshotRef.current;
      const after = activePixelDataRef.current;
      const historyLabel =
        toolId === 'select' && selectionMoveCopyRef.current
          ? 'select-copy'
          : toolId;
      if (
        before &&
        after &&
        toolId !== 'colorPicker' &&
        hasPixelDataChanged(before, after)
      ) {
        useHistoryStore.getState().pushEntry(
          historyLabel,
          activeFrameIdRef.current,
          activeLayerIdRef.current,
          before,
          after
        );
        useTimelineStore.getState().setFrameLayerData(
          activeFrameIdRef.current,
          activeLayerIdRef.current,
          after
        );
        usePlayerStatsStore.getState().addExp(1);
        useDungeonStore.getState().onStrokeComplete();
      }

      clearStrokeState();
      render();
    },
    [clearStrokeState, makeToolContext, render]
  );

  useEffect(() => {
    if (
      !displayRef.current ||
      !gridRef.current ||
      !onionRef.current ||
      !previewRef.current ||
      !containerRef.current
    ) return;

    const cont = containerRef.current;
    const disp = displayRef.current;
    const grid = gridRef.current;
    const onion = onionRef.current;
    const preview = previewRef.current;

    const resizeCanvases = () => {
      const rect = cont.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (w === 0 || h === 0) return;
      [disp, grid, onion, preview].forEach((canvas) => {
        canvas.width = w;
        canvas.height = h;
      });
      render();
    };

    const { width, height } = useProjectStore.getState().project;
    const engine = new CanvasEngine(width, height);
    engine.setDisplayCanvas(disp);
    engine.setGridCanvas(grid);
    engine.setOnionCanvas(onion);
    engineRef.current = engine;
    grid.style.cursor = 'crosshair';
    cursorRef.current = 'crosshair';

    const { activeLayerId } = useLayerStore.getState();
    const frame = useTimelineStore.getState().getActiveFrame();
    if (!frame.layerData[activeLayerId]) {
      useTimelineStore.getState().initFrameLayer(frame.id, activeLayerId, width, height);
    }

    resizeCanvases();

    const observer = new ResizeObserver(() => resizeCanvases());
    observer.observe(cont);
    return () => observer.disconnect();
  }, [render]);

  useEffect(() => {
    const unsubs = [
      useCanvasStore.subscribe(() => render()),
      useLayerStore.subscribe(() => render()),
      useTimelineStore.subscribe(() => render()),
      useToolStore.subscribe(() => render()),
      useProjectStore.subscribe(() => {
        const engine = engineRef.current;
        if (engine) {
          const { width, height } = useProjectStore.getState().project;
          engine.resize(width, height);
        }
        render();
      }),
    ];
    return () => unsubs.forEach((unsubscribe) => unsubscribe());
  }, [render]);

  const nudgeSelection = useCallback((dx: number, dy: number): boolean => {
    if (isDrawingRef.current || isPanningRef.current || symmetryDragAxisRef.current) return false;
    const rect = selectionRectRef.current;
    if (!rect || !isSelectionInActiveContext()) return false;

    const { width, height } = useProjectStore.getState().project;
    const clampedDx = clampNumber(dx, -rect.x, width - (rect.x + rect.w));
    const clampedDy = clampNumber(dy, -rect.y, height - (rect.y + rect.h));
    if (clampedDx === 0 && clampedDy === 0) return false;

    const { activeLayerId, layers } = useLayerStore.getState();
    const activeLayer = layers.find((layer) => layer.id === activeLayerId);
    if (!activeLayer || activeLayer.locked) return false;

    const timeline = useTimelineStore.getState();
    const frame = timeline.getActiveFrame();
    if (!frame.layerData[activeLayerId]) {
      timeline.initFrameLayer(frame.id, activeLayerId, width, height);
    }

    const refetched = timeline.getActiveFrame();
    const storeData = refetched.layerData[activeLayerId];
    if (!storeData) return false;

    const before = new Uint8ClampedArray(storeData);
    const sourcePixels = extractSelectionPixels(before, width, height, rect);
    const after = new Uint8ClampedArray(before);
    clearSelectionPixels(after, width, height, rect);
    stampSelectionPixels(after, width, height, sourcePixels, rect, clampedDx, clampedDy);

    if (!hasPixelDataChanged(before, after)) return false;

    useHistoryStore.getState().pushEntry(
      'select',
      refetched.id,
      activeLayerId,
      before,
      after
    );
    timeline.setFrameLayerData(refetched.id, activeLayerId, after);

    selectionRectRef.current = {
      x: rect.x + clampedDx,
      y: rect.y + clampedDy,
      w: rect.w,
      h: rect.h,
    };
    selectionContextRef.current = {
      frameId: refetched.id,
      layerId: activeLayerId,
    };

    render();
    return true;
  }, [isSelectionInActiveContext, render]);

  const copyFromActiveLayer = useCallback((cutSelection: boolean): boolean => {
    if (isDrawingRef.current || isPanningRef.current || symmetryDragAxisRef.current) return false;

    const { width, height } = useProjectStore.getState().project;
    const { activeLayerId, layers } = useLayerStore.getState();
    const activeLayer = layers.find((layer) => layer.id === activeLayerId);
    if (!activeLayer) return false;

    const timeline = useTimelineStore.getState();
    const frame = timeline.getActiveFrame();
    if (!frame.layerData[activeLayerId]) {
      timeline.initFrameLayer(frame.id, activeLayerId, width, height);
    }

    const refetched = timeline.getActiveFrame();
    const storeData = refetched.layerData[activeLayerId];
    if (!storeData) return false;

    const selectionRect = selectionRectRef.current;
    const hasActiveSelection = Boolean(selectionRect && isSelectionInActiveContext());
    const sourceRect = hasActiveSelection && selectionRect
      ? selectionRect
      : { x: 0, y: 0, w: width, h: height };
    const pixels = extractSelectionPixels(storeData, width, height, sourceRect);
    const payload = {
      pixels,
      width: sourceRect.w,
      height: sourceRect.h,
      sourceRect: { ...sourceRect },
      origin: hasActiveSelection ? 'selection' : 'layer',
    } as const;

    setPixelClipboard(payload);
    void writePixelsToSystemClipboard(payload);

    if (!cutSelection || !hasActiveSelection || !selectionRect) {
      return true;
    }

    if (activeLayer.locked) return true;

    const before = new Uint8ClampedArray(storeData);
    const after = new Uint8ClampedArray(storeData);
    clearSelectionPixels(after, width, height, selectionRect);
    if (!hasPixelDataChanged(before, after)) return true;

    useHistoryStore.getState().pushEntry(
      'cut',
      refetched.id,
      activeLayerId,
      before,
      after
    );
    timeline.setFrameLayerData(refetched.id, activeLayerId, after);
    clearSelectionState();
    setCanvasCursor('crosshair');
    render();
    return true;
  }, [clearSelectionState, isSelectionInActiveContext, render, setCanvasCursor]);

  const pasteFromClipboard = useCallback((): boolean => {
    if (isDrawingRef.current || isPanningRef.current || symmetryDragAxisRef.current) return false;

    const clipboard = getPixelClipboard();
    if (!clipboard) return false;

    const { width, height } = useProjectStore.getState().project;
    const { activeLayerId, layers } = useLayerStore.getState();
    const activeLayer = layers.find((layer) => layer.id === activeLayerId);
    if (!activeLayer || activeLayer.locked) return false;

    const timeline = useTimelineStore.getState();
    const frame = timeline.getActiveFrame();
    if (!frame.layerData[activeLayerId]) {
      timeline.initFrameLayer(frame.id, activeLayerId, width, height);
    }

    const refetched = timeline.getActiveFrame();
    const storeData = refetched.layerData[activeLayerId];
    if (!storeData) return false;

    const before = new Uint8ClampedArray(storeData);
    const after = new Uint8ClampedArray(storeData);
    const selectionRect = getVisibleSelectionRect();

    let dstX = 0;
    let dstY = 0;

    if (selectionRect) {
      dstX = selectionRect.x;
      dstY = selectionRect.y;
    } else if (clipboard.sourceRect) {
      dstX = clipboard.sourceRect.x;
      dstY = clipboard.sourceRect.y;
    } else {
      dstX = Math.floor((width - clipboard.width) / 2);
      dstY = Math.floor((height - clipboard.height) / 2);
    }

    stampPixelBlock(
      after,
      width,
      height,
      clipboard.pixels,
      clipboard.width,
      clipboard.height,
      dstX,
      dstY
    );

    if (!hasPixelDataChanged(before, after)) return false;

    useHistoryStore.getState().pushEntry(
      'paste',
      refetched.id,
      activeLayerId,
      before,
      after
    );
    timeline.setFrameLayerData(refetched.id, activeLayerId, after);

    const visibleRect = getVisibleRectWithinCanvas(dstX, dstY, clipboard.width, clipboard.height, width, height);
    if (visibleRect) {
      selectionRectRef.current = visibleRect;
      selectionContextRef.current = {
        frameId: refetched.id,
        layerId: activeLayerId,
      };
    } else {
      clearSelectionState();
    }

    setCanvasCursor('crosshair');
    render();
    return true;
  }, [clearSelectionState, getVisibleSelectionRect, render, setCanvasCursor]);

  const pasteFromSystemClipboard = useCallback(async (): Promise<boolean> => {
    const payload = await readPixelsFromSystemClipboard();
    if (!payload) return false;
    setPixelClipboard(payload);
    return pasteFromClipboard();
  }, [pasteFromClipboard]);

  useEffect(() => {
    const handleSelectionShortcuts = (e: KeyboardEvent) => {
      if (isEditableEventTarget(e.target)) {
        return;
      }

      const selectionRect = selectionRectRef.current;
      const hasActiveSelection = Boolean(selectionRect && isSelectionInActiveContext());
      const ctrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      if (ctrl && key === 'c') {
        e.preventDefault();
        copyFromActiveLayer(false);
        return;
      }

      if (ctrl && key === 'x') {
        e.preventDefault();
        copyFromActiveLayer(true);
        return;
      }

      if (ctrl && key === 'v') {
        e.preventDefault();
        if (pasteFromClipboard()) {
          return;
        }
        void pasteFromSystemClipboard();
        return;
      }

      if (ctrl && key === 'd' && hasActiveSelection) {
        e.preventDefault();
        clearSelectionState();
        setCanvasCursor('crosshair');
        render();
        return;
      }

      if (key === 'escape' && hasActiveSelection) {
        e.preventDefault();
        clearSelectionState();
        setCanvasCursor('crosshair');
        render();
        return;
      }

      if ((key === 'delete' || key === 'del') && hasActiveSelection) {
        e.preventDefault();
        deleteSelection();
        return;
      }

      if (!hasActiveSelection) return;
      if (ctrl || e.altKey) return;

      const step = e.shiftKey ? 10 : 1;
      let dx = 0;
      let dy = 0;
      if (e.key === 'ArrowLeft') dx = -step;
      if (e.key === 'ArrowRight') dx = step;
      if (e.key === 'ArrowUp') dy = -step;
      if (e.key === 'ArrowDown') dy = step;
      if (dx === 0 && dy === 0) return;

      e.preventDefault();
      nudgeSelection(dx, dy);
    };

    window.addEventListener('keydown', handleSelectionShortcuts);
    return () => window.removeEventListener('keydown', handleSelectionShortcuts);
  }, [
    clearSelectionState,
    copyFromActiveLayer,
    deleteSelection,
    isSelectionInActiveContext,
    nudgeSelection,
    pasteFromClipboard,
    pasteFromSystemClipboard,
    render,
    setCanvasCursor,
  ]);

  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      if (isEditableEventTarget(e.target)) return;
      if (copyFromActiveLayer(false)) {
        e.preventDefault();
      }
    };

    const handleCut = (e: ClipboardEvent) => {
      if (isEditableEventTarget(e.target)) return;
      if (copyFromActiveLayer(true)) {
        e.preventDefault();
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      if (isEditableEventTarget(e.target)) return;

      if (pasteFromClipboard()) {
        e.preventDefault();
        return;
      }

      if (!e.clipboardData) return;
      e.preventDefault();

      void (async () => {
        const payload = await readPixelsFromPasteEvent(e.clipboardData as DataTransfer);
        if (!payload) return;
        setPixelClipboard(payload);
        pasteFromClipboard();
      })();
    };

    window.addEventListener('copy', handleCopy);
    window.addEventListener('cut', handleCut);
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('cut', handleCut);
      window.removeEventListener('paste', handlePaste);
    };
  }, [copyFromActiveLayer, pasteFromClipboard]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button === 1) {
        isPanningRef.current = true;
        panPointerIdRef.current = e.pointerId;
        lastPanRef.current = { x: e.clientX, y: e.clientY };
        setCanvasCursor('grabbing');
        e.currentTarget.setPointerCapture(e.pointerId);
        return;
      }
      if (e.button !== 0) return;
      if (isDrawingRef.current) return;

      const engine = engineRef.current;
      if (!engine) return;
      const targetCanvas = e.currentTarget as HTMLCanvasElement;

      const rect = targetCanvas.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      smoothedPointerRef.current = { x: localX, y: localY };
      const pixel = engine.screenToPixel(localX, localY);
      hoverPreviewPixelRef.current = pixel;
      lastStrokePixelRef.current = pixel;
      strokeAnchorPixelRef.current = pixel;
      wasShiftConstrainedRef.current = false;

      const activeTool = useToolStore.getState().activeTool;
      activeToolRef.current = activeTool;

      if (isSelectionTool(activeTool)) {
        const { width, height } = useProjectStore.getState().project;
        const resolvedPixel = {
          x: clampPixelCoordinate(pixel.x, width),
          y: clampPixelCoordinate(pixel.y, height),
        };
        const visibleSelectionRect = getVisibleSelectionRect();

        if (
          visibleSelectionRect &&
          isPointInsideSelectionRect(resolvedPixel.x, resolvedPixel.y, visibleSelectionRect)
        ) {
          const ctx = makeToolContext(true);
          if (!ctx || !snapshotRef.current) return;

          const sourceRect = { ...visibleSelectionRect };
          const sourcePixels = extractSelectionPixels(snapshotRef.current, width, height, sourceRect);
          const basePixels = new Uint8ClampedArray(snapshotRef.current);
          const copySelection = e.altKey;
          if (!copySelection) {
            clearSelectionPixels(basePixels, width, height, sourceRect);
          }
          const composed = new Uint8ClampedArray(basePixels);
          stampSelectionPixels(composed, width, height, sourcePixels, sourceRect, 0, 0);

          isDrawingRef.current = true;
          activePointerIdRef.current = e.pointerId;
          activeToolRef.current = 'select';
          activePixelDataRef.current = composed;
          selectionMoveStartRef.current = resolvedPixel;
          selectionMoveSourceRectRef.current = sourceRect;
          selectionMovePixelsRef.current = sourcePixels;
          selectionMoveBasePixelsRef.current = basePixels;
          selectionMoveOffsetRef.current = { x: 0, y: 0 };
          selectionMovePointerIdRef.current = e.pointerId;
          selectionMoveCopyRef.current = copySelection;
          selectionMarqueeAnchorRef.current = null;
          selectionMarqueeCurrentRef.current = null;
          selectionMarqueePointerIdRef.current = null;
          setCanvasCursor('grabbing');
          e.currentTarget.setPointerCapture(e.pointerId);
          render();
          return;
        }

        selectionRectRef.current = null;
        selectionContextRef.current = null;
        selectionMarqueeAnchorRef.current = resolvedPixel;
        selectionMarqueeCurrentRef.current = resolvedPixel;
        selectionMarqueePointerIdRef.current = e.pointerId;
        selectionMovePointerIdRef.current = null;
        selectionMoveCopyRef.current = false;
        setCanvasCursor('crosshair');
        e.currentTarget.setPointerCapture(e.pointerId);
        render();
        return;
      }

      if (isFreehandTool(activeTool)) {
        const { width, height } = useProjectStore.getState().project;
        const { symmetryMode, symmetryAxisX, symmetryAxisY } = useToolStore.getState();
        const resolvedAxisX = clampSymmetryAxis(symmetryAxisX ?? Math.floor(width / 2), width);
        const resolvedAxisY = clampSymmetryAxis(symmetryAxisY ?? Math.floor(height / 2), height);
        const dragAxis = getSymmetryDragAxisAtPosition(
          localX,
          localY,
          engine,
          targetCanvas,
          width,
          height,
          symmetryMode,
          resolvedAxisX,
          resolvedAxisY,
          e.altKey
        );

        if (dragAxis) {
          symmetryDragAxisRef.current = dragAxis;
          symmetryDragPointerIdRef.current = e.pointerId;
          setCanvasCursor('grabbing');
          e.currentTarget.setPointerCapture(e.pointerId);

          if (dragAxis === 'x') {
            const nextAxis = clampSymmetryAxis(pixel.x, width);
            if (nextAxis !== resolvedAxisX) {
              useToolStore.getState().setSymmetryAxisX(nextAxis);
            }
          } else {
            const nextAxis = clampSymmetryAxis(pixel.y, height);
            if (nextAxis !== resolvedAxisY) {
              useToolStore.getState().setSymmetryAxisY(nextAxis);
            }
          }
          render();
          return;
        }
      }

      // Quick color picker with Alt+click for brush/eraser tools
      if ((activeTool === 'brush' || activeTool === 'eraser') && e.altKey) {
        const { width, height } = useProjectStore.getState().project;
        const frame = useTimelineStore.getState().frames[useTimelineStore.getState().activeFrameIndex];
        const layerId = useLayerStore.getState().activeLayerId;
        const layerData = frame?.layerData[layerId];
        if (layerData) {
          const buffer = new PixelBuffer(width, height, layerData);
          const color = buffer.getPixel(pixel.x, pixel.y);
          if (color.a > 0) {
            usePaletteStore.getState().setForeground(color);
          }
        }
        return;
      }

      // Shift+Click: draw line from last stroke end to current point
      if (e.shiftKey && isFreehandTool(activeTool) && lastStrokeEndRef.current) {
        activePressureRef.current = resolvePointerPressureSample(
          e.pointerType, e.pressure,
          useToolStore.getState().pressureEnabled,
          activePressureRef.current
        );
        activeToolRef.current = activeTool;
        const ctx = makeToolContext(true);
        if (!ctx) return;

        isDrawingRef.current = true;
        activePointerIdRef.current = e.pointerId;
        drawConstrainedFreehandLine(activeTool, lastStrokeEndRef.current, pixel, ctx);
        lastStrokeEndRef.current = pixel;
        lastStrokePixelRef.current = pixel;
        finalizeDrawingStroke(pixel.x, pixel.y, false);
        render();
        return;
      }

      if (activeTool === 'colorPicker') {
        const cpTool = toolRegistry.getColorPickerTool();
        cpTool.onColorPick = (color) => usePaletteStore.getState().setForeground(color);
      }

      activePressureRef.current = resolvePointerPressureSample(
        e.pointerType,
        e.pressure,
        useToolStore.getState().pressureEnabled,
        activePressureRef.current
      );
      const ctx = makeToolContext(true);
      if (!ctx) return;

      isDrawingRef.current = true;
      activePointerIdRef.current = e.pointerId;
      setCanvasCursor('crosshair');

      toolRegistry.getTool(activeTool).onPointerDown(pixel.x, pixel.y, ctx);
      e.currentTarget.setPointerCapture(e.pointerId);
      render();
    },
    [finalizeDrawingStroke, getVisibleSelectionRect, makeToolContext, render, setCanvasCursor]
  );

      const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const engine = engineRef.current;
      if (!engine) return;
      const targetCanvas = e.currentTarget as HTMLCanvasElement;

      const rect = targetCanvas.getBoundingClientRect();
      const rawLocalX = e.clientX - rect.left;
      const rawLocalY = e.clientY - rect.top;
      const rawPixel = engine.screenToPixel(rawLocalX, rawLocalY);
      hoverPreviewPixelRef.current = rawPixel;

      if (isPanningRef.current) {
        if (panPointerIdRef.current !== e.pointerId) return;
        const dx = e.clientX - lastPanRef.current.x;
        const dy = e.clientY - lastPanRef.current.y;
        useCanvasStore.getState().adjustPan(dx, dy);
        lastPanRef.current = { x: e.clientX, y: e.clientY };
        setCanvasCursor('grabbing');
        clearBrushPreview();
        return;
      }

      if (symmetryDragAxisRef.current) {
        if (symmetryDragPointerIdRef.current !== e.pointerId) return;
        const { width, height } = useProjectStore.getState().project;
        const dragAxis = symmetryDragAxisRef.current;
        if (dragAxis === 'x') {
          const nextAxis = clampSymmetryAxis(rawPixel.x, width);
          if (nextAxis !== useToolStore.getState().symmetryAxisX) {
            useToolStore.getState().setSymmetryAxisX(nextAxis);
          }
        } else {
          const nextAxis = clampSymmetryAxis(rawPixel.y, height);
          if (nextAxis !== useToolStore.getState().symmetryAxisY) {
            useToolStore.getState().setSymmetryAxisY(nextAxis);
          }
        }
        setCanvasCursor('grabbing');
        render();
        return;
      }

      if (selectionMarqueePointerIdRef.current === e.pointerId && selectionMarqueeAnchorRef.current) {
        const { width, height } = useProjectStore.getState().project;
        selectionMarqueeCurrentRef.current = {
          x: clampPixelCoordinate(rawPixel.x, width),
          y: clampPixelCoordinate(rawPixel.y, height),
        };
        setCanvasCursor('crosshair');
        render();
        return;
      }

      if (
        isDrawingRef.current &&
        activeToolRef.current === 'select' &&
        activePointerIdRef.current === e.pointerId &&
        selectionMovePointerIdRef.current === e.pointerId
      ) {
        const sourceRect = selectionMoveSourceRectRef.current;
        const sourcePixels = selectionMovePixelsRef.current;
        const basePixels = selectionMoveBasePixelsRef.current;
        const moveStart = selectionMoveStartRef.current;
        if (!sourceRect || !sourcePixels || !basePixels || !moveStart) return;

        const { width, height } = useProjectStore.getState().project;
        let dx = rawPixel.x - moveStart.x;
        let dy = rawPixel.y - moveStart.y;
        if (e.shiftKey) {
          if (Math.abs(dx) >= Math.abs(dy)) dy = 0;
          else dx = 0;
        }
        dx = clampNumber(dx, -sourceRect.x, width - (sourceRect.x + sourceRect.w));
        dy = clampNumber(dy, -sourceRect.y, height - (sourceRect.y + sourceRect.h));

        selectionMoveOffsetRef.current = { x: dx, y: dy };
        const composed = new Uint8ClampedArray(basePixels);
        stampSelectionPixels(composed, width, height, sourcePixels, sourceRect, dx, dy);
        activePixelDataRef.current = composed;
        setCanvasCursor('grabbing');
        render();
        return;
      }

      if (!isDrawingRef.current || activePointerIdRef.current !== e.pointerId) {
        const { activeTool, symmetryMode, symmetryAxisX, symmetryAxisY } = useToolStore.getState();
        if (isSelectionTool(activeTool)) {
          const selectionRect = getVisibleSelectionRect();
          if (selectionRect && isPointInsideSelectionRect(rawPixel.x, rawPixel.y, selectionRect)) {
            setCanvasCursor('grab');
          } else {
            setCanvasCursor('crosshair');
          }
        } else if (isFreehandTool(activeTool)) {
          const { width, height } = useProjectStore.getState().project;
          const resolvedAxisX = clampSymmetryAxis(symmetryAxisX ?? Math.floor(width / 2), width);
          const resolvedAxisY = clampSymmetryAxis(symmetryAxisY ?? Math.floor(height / 2), height);
          const hoverAxis = getSymmetryDragAxisAtPosition(
            rawLocalX,
            rawLocalY,
            engine,
            targetCanvas,
            width,
            height,
            symmetryMode,
            resolvedAxisX,
            resolvedAxisY,
            e.altKey
          );
          setCanvasCursor(hoverAxis ? 'grab' : 'crosshair');
        } else {
          setCanvasCursor('crosshair');
        }
        renderBrushPreview();
        return;
      }

      activePressureRef.current = resolvePointerPressureSample(
        e.pointerType,
        e.pressure,
        strokeSettingsRef.current?.pressureEnabled ?? false,
        activePressureRef.current
      );

      const isShiftConstrained =
        isFreehandTool(activeToolRef.current) &&
        e.shiftKey &&
        Boolean(strokeAnchorPixelRef.current) &&
        Boolean(snapshotRef.current);

      if (isShiftConstrained && strokeAnchorPixelRef.current && snapshotRef.current) {
        activePixelDataRef.current = new Uint8ClampedArray(snapshotRef.current);
        const ctx = makeToolContext(false);
        if (!ctx) return;

        drawConstrainedFreehandLine(
          activeToolRef.current,
          strokeAnchorPixelRef.current,
          rawPixel,
          ctx
        );
        smoothedPointerRef.current = { x: rawLocalX, y: rawLocalY };
        lastStrokePixelRef.current = rawPixel;
        wasShiftConstrainedRef.current = true;
        render();
        return;
      }

      if (wasShiftConstrainedRef.current && isFreehandTool(activeToolRef.current)) {
        const ctx = makeToolContext(false);
        if (ctx) {
          const tool = toolRegistry.getTool(activeToolRef.current);
          tool.onPointerUp(rawPixel.x, rawPixel.y, ctx);
          tool.onPointerDown(rawPixel.x, rawPixel.y, ctx);
        }
        wasShiftConstrainedRef.current = false;
      }

      let localX = rawLocalX;
      let localY = rawLocalY;
      if (isFreehandTool(activeToolRef.current)) {
        const strokeStabilizer = strokeSettingsRef.current?.strokeStabilizer ?? 0;
        if (strokeStabilizer > 0) {
          const stabilized = stabilizeFreehandPoint(
            { x: rawLocalX, y: rawLocalY },
            smoothedPointerRef.current,
            strokeStabilizer
          );
          localX = stabilized.x;
          localY = stabilized.y;
          smoothedPointerRef.current = stabilized;
        } else {
          smoothedPointerRef.current = { x: rawLocalX, y: rawLocalY };
        }
      } else {
        smoothedPointerRef.current = { x: rawLocalX, y: rawLocalY };
      }

      const pixel = engine.screenToPixel(localX, localY);
      lastStrokePixelRef.current = pixel;

      const ctx = makeToolContext(false);
      if (!ctx) return;

      if (!isSelectionTool(activeToolRef.current)) {
        toolRegistry.getTool(activeToolRef.current).onPointerMove(pixel.x, pixel.y, ctx);
      }
      render();
    },
    [clearBrushPreview, getVisibleSelectionRect, makeToolContext, render, renderBrushPreview, setCanvasCursor]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (isPanningRef.current && panPointerIdRef.current === e.pointerId) {
        isPanningRef.current = false;
        panPointerIdRef.current = null;
        setCanvasCursor('crosshair');
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
        return;
      }

      if (symmetryDragAxisRef.current && symmetryDragPointerIdRef.current === e.pointerId) {
        clearSymmetryDragState();
        setCanvasCursor('crosshair');
        render();
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
        return;
      }

      if (selectionMarqueePointerIdRef.current === e.pointerId && selectionMarqueeAnchorRef.current) {
        const engine = engineRef.current;
        const rect = e.currentTarget.getBoundingClientRect();
        const pixel = engine
          ? engine.screenToPixel(e.clientX - rect.left, e.clientY - rect.top)
          : selectionMarqueeAnchorRef.current;
        const { width, height } = useProjectStore.getState().project;
        selectionMarqueeCurrentRef.current = {
          x: clampPixelCoordinate(pixel.x, width),
          y: clampPixelCoordinate(pixel.y, height),
        };
        const marqueeRect = getMarqueeSelectionRect();
        if (marqueeRect) {
          selectionRectRef.current = marqueeRect;
          selectionContextRef.current = {
            frameId: useTimelineStore.getState().getActiveFrame().id,
            layerId: useLayerStore.getState().activeLayerId,
          };
        } else {
          selectionRectRef.current = null;
          selectionContextRef.current = null;
        }
        selectionMarqueeAnchorRef.current = null;
        selectionMarqueeCurrentRef.current = null;
        selectionMarqueePointerIdRef.current = null;
        setCanvasCursor('crosshair');
        render();
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
        return;
      }

      if (!isDrawingRef.current || activePointerIdRef.current !== e.pointerId) return;

      const engine = engineRef.current;
      const rect = e.currentTarget.getBoundingClientRect();
      const pixel = engine
        ? engine.screenToPixel(e.clientX - rect.left, e.clientY - rect.top)
        : lastStrokePixelRef.current;
      hoverPreviewPixelRef.current = pixel;
      lastStrokePixelRef.current = pixel;
      activePressureRef.current = resolvePointerPressureSample(
        e.pointerType,
        e.pressure,
        strokeSettingsRef.current?.pressureEnabled ?? false,
        activePressureRef.current
      );

      if (
        isFreehandTool(activeToolRef.current) &&
        (strokeSettingsRef.current?.strokeStabilizer ?? 0) > 0 &&
        !wasShiftConstrainedRef.current
      ) {
        const ctx = makeToolContext(false);
        if (ctx) {
          toolRegistry.getTool(activeToolRef.current).onPointerMove(pixel.x, pixel.y, ctx);
        }
      }

      if (isSelectionTool(activeToolRef.current) && selectionMoveSourceRectRef.current) {
        const source = selectionMoveSourceRectRef.current;
        const offset = selectionMoveOffsetRef.current;
        selectionRectRef.current = {
          x: source.x + offset.x,
          y: source.y + offset.y,
          w: source.w,
          h: source.h,
        };
        selectionContextRef.current = {
          frameId: activeFrameIdRef.current,
          layerId: activeLayerIdRef.current,
        };
      }

      if (isFreehandTool(activeToolRef.current)) {
        lastStrokeEndRef.current = pixel;
      }

      finalizeDrawingStroke(pixel.x, pixel.y, !isSelectionTool(activeToolRef.current));

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    },
    [clearSymmetryDragState, finalizeDrawingStroke, getMarqueeSelectionRect, makeToolContext, render, setCanvasCursor]
  );

  const onPointerCancel = useCallback(
    (e: React.PointerEvent) => {
      hoverPreviewPixelRef.current = null;
      clearBrushPreview();

      if (isPanningRef.current && panPointerIdRef.current === e.pointerId) {
        isPanningRef.current = false;
        panPointerIdRef.current = null;
        setCanvasCursor('crosshair');
      }

      if (symmetryDragAxisRef.current && symmetryDragPointerIdRef.current === e.pointerId) {
        clearSymmetryDragState();
        setCanvasCursor('crosshair');
      }

      if (selectionMarqueePointerIdRef.current === e.pointerId) {
        selectionMarqueeAnchorRef.current = null;
        selectionMarqueeCurrentRef.current = null;
        selectionMarqueePointerIdRef.current = null;
      }

      if (isDrawingRef.current && activePointerIdRef.current === e.pointerId) {
        const pixel = lastStrokePixelRef.current;
        if (isSelectionTool(activeToolRef.current) && selectionMoveSourceRectRef.current) {
          const source = selectionMoveSourceRectRef.current;
          const offset = selectionMoveOffsetRef.current;
          selectionRectRef.current = {
            x: source.x + offset.x,
            y: source.y + offset.y,
            w: source.w,
            h: source.h,
          };
          selectionContextRef.current = {
            frameId: activeFrameIdRef.current,
            layerId: activeLayerIdRef.current,
          };
        }
        finalizeDrawingStroke(pixel.x, pixel.y, !isSelectionTool(activeToolRef.current));
      }

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    },
    [clearBrushPreview, clearSymmetryDragState, finalizeDrawingStroke, setCanvasCursor]
  );

  const onLostPointerCapture = useCallback(
    (e: React.PointerEvent) => {
      hoverPreviewPixelRef.current = null;
      clearBrushPreview();

      if (isPanningRef.current && panPointerIdRef.current === e.pointerId) {
        isPanningRef.current = false;
        panPointerIdRef.current = null;
        setCanvasCursor('crosshair');
      }

      if (symmetryDragAxisRef.current && symmetryDragPointerIdRef.current === e.pointerId) {
        clearSymmetryDragState();
        setCanvasCursor('crosshair');
      }

      if (selectionMarqueePointerIdRef.current === e.pointerId) {
        selectionMarqueeAnchorRef.current = null;
        selectionMarqueeCurrentRef.current = null;
        selectionMarqueePointerIdRef.current = null;
      }

      if (isDrawingRef.current && activePointerIdRef.current === e.pointerId) {
        const pixel = lastStrokePixelRef.current;
        if (isSelectionTool(activeToolRef.current) && selectionMoveSourceRectRef.current) {
          const source = selectionMoveSourceRectRef.current;
          const offset = selectionMoveOffsetRef.current;
          selectionRectRef.current = {
            x: source.x + offset.x,
            y: source.y + offset.y,
            w: source.w,
            h: source.h,
          };
          selectionContextRef.current = {
            frameId: activeFrameIdRef.current,
            layerId: activeLayerIdRef.current,
          };
        }
        finalizeDrawingStroke(pixel.x, pixel.y, !isSelectionTool(activeToolRef.current));
      }
    },
    [clearBrushPreview, clearSymmetryDragState, finalizeDrawingStroke, setCanvasCursor]
  );

  const onPointerLeave = useCallback(() => {
    if (isDrawingRef.current || isPanningRef.current || symmetryDragAxisRef.current || selectionMarqueePointerIdRef.current) return;
    hoverPreviewPixelRef.current = null;
    setCanvasCursor('crosshair');
    clearBrushPreview();
  }, [clearBrushPreview, setCanvasCursor]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) useCanvasStore.getState().zoomIn();
    else useCanvasStore.getState().zoomOut();
  }, []);

  const toolLabel = activeToolUi === 'select'
    ? t('tools.tool.select', 'Select')
    : activeToolUi === 'brush'
      ? t('tools.tool.brush', 'Brush')
      : activeToolUi === 'eraser'
        ? t('tools.tool.eraser', 'Eraser')
        : activeToolUi === 'fill'
          ? t('tools.tool.fill', 'Fill')
          : activeToolUi === 'colorPicker'
            ? t('tools.tool.colorPicker', 'Color Picker')
            : activeToolUi === 'line'
              ? t('tools.tool.line', 'Line')
              : t('tools.tool.rect', 'Rectangle');

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-hidden bg-background cursor-crosshair"
      onWheel={onWheel}
    >
      <canvas ref={displayRef} className="absolute inset-0" />
      <canvas ref={onionRef} className="absolute inset-0 pointer-events-none" />
      <canvas ref={previewRef} className="absolute inset-0 pointer-events-none" />
      <canvas
        ref={gridRef}
        className="absolute inset-0"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onLostPointerCapture={onLostPointerCapture}
        onPointerLeave={onPointerLeave}
        style={{ touchAction: 'none' }}
      />


      <div className="absolute left-3 top-3 pointer-events-none">
        <div className="px-2 py-1 rounded-md border border-border/80 bg-surface/85 text-[10px] text-muted shadow-sm backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-foreground font-semibold">{project.width}x{project.height}</span>
            <span>{t('canvas.zoom', 'Zoom {value}%', { value: Math.round(zoomUi * 100) })}</span>
            <span>{t('canvas.tool', 'Tool {value}', { value: toolLabel })}</span>
            <span>{t('canvas.frame', 'Frame {current}/{total}', { current: activeFrameIndexUi + 1, total: frameCountUi })}</span>
          </div>
          <div className="mt-0.5">{t('canvas.hint', 'Wheel: zoom | Middle mouse: pan | Shift: line')}</div>
        </div>
      </div>
    </div>
  );
}
