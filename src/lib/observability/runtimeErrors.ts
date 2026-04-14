export interface RuntimeErrorEntry {
  id: string;
  timestamp: number;
  type: 'error' | 'unhandledrejection';
  message: string;
  stack?: string;
  source?: string;
}

const RUNTIME_ERRORS_KEY = 'dogsprite-runtime-errors-v1';
const LEGACY_RUNTIME_ERRORS_KEY = 'spritedog-runtime-errors-v1';
const MAX_RUNTIME_ERRORS = 60;

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function isEntry(value: unknown): value is RuntimeErrorEntry {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.id === 'string' &&
    typeof entry.timestamp === 'number' &&
    (entry.type === 'error' || entry.type === 'unhandledrejection') &&
    typeof entry.message === 'string' &&
    (typeof entry.stack === 'undefined' || typeof entry.stack === 'string') &&
    (typeof entry.source === 'undefined' || typeof entry.source === 'string')
  );
}

function readEntries(): RuntimeErrorEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RUNTIME_ERRORS_KEY) ?? window.localStorage.getItem(LEGACY_RUNTIME_ERRORS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isEntry);
  } catch {
    return [];
  }
}

function writeEntries(entries: RuntimeErrorEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(RUNTIME_ERRORS_KEY, JSON.stringify(entries.slice(-MAX_RUNTIME_ERRORS)));
    window.localStorage.removeItem(LEGACY_RUNTIME_ERRORS_KEY);
  } catch {
    // Ignore storage quota failures.
  }
}

export function listRuntimeErrors(): RuntimeErrorEntry[] {
  return readEntries();
}

export function clearRuntimeErrors(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(RUNTIME_ERRORS_KEY);
    window.localStorage.removeItem(LEGACY_RUNTIME_ERRORS_KEY);
  } catch {
    // Ignore storage failures.
  }
}

export function recordRuntimeError(input: Omit<RuntimeErrorEntry, 'id' | 'timestamp'>): RuntimeErrorEntry {
  const entry: RuntimeErrorEntry = {
    id: createId(),
    timestamp: Date.now(),
    ...input,
  };

  const entries = readEntries();
  entries.push(entry);
  writeEntries(entries);
  return entry;
}

export function installRuntimeErrorHandlers(): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const onError = (event: ErrorEvent) => {
    const error = event.error instanceof Error ? event.error : null;
    recordRuntimeError({
      type: 'error',
      message: error?.message || event.message || 'Unknown runtime error',
      stack: error?.stack,
      source: event.filename,
    });
  };

  const onUnhandledRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    let message = 'Unhandled promise rejection';
    let stack: string | undefined;

    if (reason instanceof Error) {
      message = reason.message || message;
      stack = reason.stack;
    } else if (typeof reason === 'string') {
      message = reason;
    } else if (reason && typeof reason === 'object') {
      try {
        message = JSON.stringify(reason);
      } catch {
        message = String(reason);
      }
    }

    recordRuntimeError({
      type: 'unhandledrejection',
      message,
      stack,
      source: window.location.href,
    });
  };

  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onUnhandledRejection);

  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onUnhandledRejection);
  };
}
