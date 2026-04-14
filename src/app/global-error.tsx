'use client';

import { useEffect } from 'react';
import { recordRuntimeError } from '@/lib/observability/runtimeErrors';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    recordRuntimeError({
      type: 'error',
      message: error.message || 'Unhandled application error',
      stack: error.stack,
      source: error.digest ? `digest:${error.digest}` : undefined,
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-lg border border-border bg-surface p-4 space-y-3">
            <h1 className="text-sm font-semibold">Something went wrong</h1>
            <p className="text-xs text-muted">
              A runtime error was captured. You can retry without losing your current session files.
            </p>
            <button
              type="button"
              onClick={reset}
              className="h-8 px-3 rounded-md border border-border bg-surface-hover text-xs hover:opacity-90"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
