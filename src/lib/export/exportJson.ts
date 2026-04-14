import type { Layer } from '@/types/layer';
import type { Frame } from '@/types/frame';
import type { ProjectSettings } from '@/types/project';

export function exportJson(
  project: ProjectSettings,
  frames: Frame[],
  layers: Layer[]
): void {
  const data = {
    name: project.name,
    width: project.width,
    height: project.height,
    layers: layers.map((l) => ({
      id: l.id,
      name: l.name,
      visible: l.visible,
      opacity: l.opacity,
    })),
    frames: frames.map((f, i) => ({
      index: i,
      duration: f.duration,
      layerData: Object.fromEntries(
        Object.entries(f.layerData).map(([layerId, data]) => [
          layerId,
          Array.from(data),
        ])
      ),
    })),
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${project.name}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
