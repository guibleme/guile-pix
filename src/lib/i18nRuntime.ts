import { translate } from '@/lib/i18n';
import { useLocaleStore } from '@/stores/useLocaleStore';

type MessageParams = Record<string, string | number>;

export function tRuntime(key: string, fallback?: string, params?: MessageParams): string {
  const locale = useLocaleStore.getState().locale;
  return translate(locale, key, fallback, params);
}

export function getDefaultProjectName(): string {
  return tRuntime('newProject.defaultName', 'Untitled Sprite');
}

export function getLayerName(index: number): string {
  return tRuntime('runtime.layerNumber', 'Layer {index}', { index });
}

export function appendCopySuffix(name: string): string {
  const suffix = tRuntime('runtime.copySuffix', ' Copy');
  const knownSuffixes = [' Copy', ' Copia', ' コピー'];
  if (knownSuffixes.some((known) => name.endsWith(known))) {
    return name;
  }
  return `${name}${suffix}`;
}
