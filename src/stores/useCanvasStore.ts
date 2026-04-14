import { create } from 'zustand';
import { DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM, ZOOM_STEP, TILE_GRID_DEFAULT_WIDTH, TILE_GRID_DEFAULT_HEIGHT } from '@/constants/canvas';
import { clamp } from '@/lib/utils/math';

interface CanvasState {
  zoom: number;
  panX: number;
  panY: number;
  showGrid: boolean;
  showOnionSkin: boolean;
  showTileGrid: boolean;
  tileGridWidth: number;
  tileGridHeight: number;
  tileGridOffsetX: number;
  tileGridOffsetY: number;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setPan: (x: number, y: number) => void;
  adjustPan: (dx: number, dy: number) => void;
  toggleGrid: () => void;
  toggleOnionSkin: () => void;
  toggleTileGrid: () => void;
  setTileGridSize: (w: number, h: number) => void;
  setTileGridOffset: (x: number, y: number) => void;
  resetView: () => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  zoom: DEFAULT_ZOOM,
  panX: 0,
  panY: 0,
  showGrid: true,
  showOnionSkin: false,
  showTileGrid: false,
  tileGridWidth: TILE_GRID_DEFAULT_WIDTH,
  tileGridHeight: TILE_GRID_DEFAULT_HEIGHT,
  tileGridOffsetX: 0,
  tileGridOffsetY: 0,
  setZoom: (zoom) => set({ zoom: clamp(zoom, MIN_ZOOM, MAX_ZOOM) }),
  zoomIn: () => set((s) => ({ zoom: clamp(s.zoom * ZOOM_STEP, MIN_ZOOM, MAX_ZOOM) })),
  zoomOut: () => set((s) => ({ zoom: clamp(s.zoom / ZOOM_STEP, MIN_ZOOM, MAX_ZOOM) })),
  setPan: (x, y) => set({ panX: x, panY: y }),
  adjustPan: (dx, dy) => set((s) => ({ panX: s.panX + dx, panY: s.panY + dy })),
  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
  toggleOnionSkin: () => set((s) => ({ showOnionSkin: !s.showOnionSkin })),
  toggleTileGrid: () => set((s) => ({ showTileGrid: !s.showTileGrid })),
  setTileGridSize: (w, h) => set({ tileGridWidth: Math.max(2, w), tileGridHeight: Math.max(2, h) }),
  setTileGridOffset: (x, y) => set({ tileGridOffsetX: x, tileGridOffsetY: y }),
  resetView: () => set({ zoom: DEFAULT_ZOOM, panX: 0, panY: 0 }),
}));
