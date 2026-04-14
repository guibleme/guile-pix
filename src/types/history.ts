import type { Layer } from './layer';

export interface HistoryPixelChange {
  frameId: string;
  layerId: string;
  pixelData: Uint8ClampedArray | null;
  previousPixelData: Uint8ClampedArray | null;
}

export interface HistoryLayerStateSnapshot {
  layers: Layer[];
  activeLayerId: string;
}

export interface HistoryEntry {
  id: string;
  label: string;
  timestamp: number;
  changes: HistoryPixelChange[];
  beforeLayerState?: HistoryLayerStateSnapshot;
  afterLayerState?: HistoryLayerStateSnapshot;
}
