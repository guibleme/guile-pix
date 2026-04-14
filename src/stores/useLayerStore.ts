import { create } from 'zustand';
import type { Layer } from '@/types/layer';
import { nanoid } from 'nanoid';
import { appendCopySuffix, getLayerName } from '@/lib/i18nRuntime';

interface LayerState {
  layers: Layer[];
  activeLayerId: string;
  addLayer: (name?: string) => string;
  removeLayer: (id: string) => void;
  setActiveLayer: (id: string) => void;
  updateLayer: (id: string, updates: Partial<Layer>) => void;
  toggleVisibility: (id: string) => void;
  toggleLock: (id: string) => void;
  moveLayer: (id: string, direction: 'up' | 'down') => void;
  duplicateLayer: (id: string) => string;
}

const createDefaultLayer = (name = getLayerName(1)): Layer => ({
  id: nanoid(),
  name,
  visible: true,
  locked: false,
  opacity: 1,
  blendMode: 'normal',
});

const defaultLayer = createDefaultLayer();

export const useLayerStore = create<LayerState>((set, get) => ({
  layers: [defaultLayer],
  activeLayerId: defaultLayer.id,

  addLayer: (name) => {
    const count = get().layers.length + 1;
    const layer = createDefaultLayer(name || getLayerName(count));
    set((s) => ({
      layers: [...s.layers, layer],
      activeLayerId: layer.id,
    }));
    return layer.id;
  },

  removeLayer: (id) => {
    const { layers, activeLayerId } = get();
    if (layers.length <= 1) return;
    const filtered = layers.filter((l) => l.id !== id);
    set({
      layers: filtered,
      activeLayerId: activeLayerId === id ? filtered[filtered.length - 1].id : activeLayerId,
    });
  },

  setActiveLayer: (id) => set({ activeLayerId: id }),

  updateLayer: (id, updates) =>
    set((s) => ({
      layers: s.layers.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    })),

  toggleVisibility: (id) =>
    set((s) => ({
      layers: s.layers.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)),
    })),

  toggleLock: (id) =>
    set((s) => ({
      layers: s.layers.map((l) => (l.id === id ? { ...l, locked: !l.locked } : l)),
    })),

  moveLayer: (id, direction) =>
    set((s) => {
      const idx = s.layers.findIndex((l) => l.id === id);
      if (idx === -1) return s;
      const newIdx = direction === 'up' ? idx + 1 : idx - 1;
      if (newIdx < 0 || newIdx >= s.layers.length) return s;
      const newLayers = [...s.layers];
      [newLayers[idx], newLayers[newIdx]] = [newLayers[newIdx], newLayers[idx]];
      return { layers: newLayers };
    }),

  duplicateLayer: (id) => {
    const layer = get().layers.find((l) => l.id === id);
    if (!layer) return id;
    const newLayer: Layer = {
      ...layer,
      id: nanoid(),
      name: appendCopySuffix(layer.name),
    };
    set((s) => ({
      layers: [...s.layers, newLayer],
      activeLayerId: newLayer.id,
    }));
    return newLayer.id;
  },
}));
