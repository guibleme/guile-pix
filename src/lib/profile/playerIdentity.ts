const PLAYER_NAME_KEY = 'dogsprite-player-name-v1';
const LEGACY_PLAYER_NAME_KEYS = ['dogsprite-player-name', 'spritedog-player-name-v1', 'spritedog-player-name'];
const NAME_UPDATED_EVENT = 'dogsprite:player-name-updated';

function sanitize(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ').slice(0, 28);
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getPlayerName(): string | null {
  if (!isBrowser()) return null;

  const raw =
    window.localStorage.getItem(PLAYER_NAME_KEY) ??
    LEGACY_PLAYER_NAME_KEYS.map((key) => window.localStorage.getItem(key)).find((value) => Boolean(value)) ??
    null;

  if (!raw) return null;
  const safe = sanitize(raw);
  if (!safe) return null;

  window.localStorage.setItem(PLAYER_NAME_KEY, safe);
  for (const key of LEGACY_PLAYER_NAME_KEYS) {
    window.localStorage.removeItem(key);
  }

  return safe;
}

export function setPlayerName(rawName: string): string | null {
  if (!isBrowser()) return null;
  const safe = sanitize(rawName);
  if (!safe) {
    clearPlayerName();
    return null;
  }

  window.localStorage.setItem(PLAYER_NAME_KEY, safe);
  for (const key of LEGACY_PLAYER_NAME_KEYS) {
    window.localStorage.removeItem(key);
  }
  window.dispatchEvent(new CustomEvent(NAME_UPDATED_EVENT, { detail: safe }));
  return safe;
}

export function clearPlayerName(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(PLAYER_NAME_KEY);
  for (const key of LEGACY_PLAYER_NAME_KEYS) {
    window.localStorage.removeItem(key);
  }
  window.dispatchEvent(new CustomEvent(NAME_UPDATED_EVENT, { detail: '' }));
}

export function subscribePlayerName(listener: (name: string | null) => void): () => void {
  if (!isBrowser()) return () => {};

  const notify = () => listener(getPlayerName());
  const onStorage = (event: StorageEvent) => {
    if (!event.key) return;
    if (event.key === PLAYER_NAME_KEY || LEGACY_PLAYER_NAME_KEYS.includes(event.key)) {
      notify();
    }
  };
  const onCustom = () => notify();

  window.addEventListener('storage', onStorage);
  window.addEventListener(NAME_UPDATED_EVENT, onCustom as EventListener);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(NAME_UPDATED_EVENT, onCustom as EventListener);
  };
}
