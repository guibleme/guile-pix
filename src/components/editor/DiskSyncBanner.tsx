'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { useDiskSyncStore } from '@/stores/useDiskSyncStore';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { applyProjectFile, saveCurrentProjectToDisk } from '@/lib/project/projectPersistence';
import { fetchSidecarProjectFile } from '@/lib/diskSync/sidecarClient';
import useI18n from '@/hooks/useI18n';

/**
 * Conflict banner: the .dogsprite file on disk changed (an agent saved it)
 * while the editor has unsaved edits. Three exits, all explicit:
 * - Reload: discard local edits, take the disk version.
 * - Save mine as a copy: download the editor version, then keep editing it
 *   while acknowledging the disk version (no more banner until disk moves).
 * - Ignore: keep editing the local version, acknowledge the disk version.
 */
export default function DiskSyncBanner() {
  const { t } = useI18n();
  const pending = useDiskSyncStore((s) => s.pending);
  const activeDocumentId = useWorkspaceStore((s) => s.activeDocumentId);
  const setActiveDiskSync = useWorkspaceStore((s) => s.setActiveDiskSync);
  const setPending = useDiskSyncStore((s) => s.setPending);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!pending || pending.documentId !== activeDocumentId) return null;

  const acknowledgeRemote = () => {
    setActiveDiskSync({
      projectId: pending.projectId,
      lastSeenRevision: pending.remoteRevision,
      lastSeenHash: pending.remoteHash,
    });
    setPending(null);
  };

  const handleReload = async () => {
    setBusy(true);
    setError(null);
    try {
      const file = await fetchSidecarProjectFile(pending.projectId);
      applyProjectFile(file, 'disk-sync');
      acknowledgeRemote();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reload failed');
    } finally {
      setBusy(false);
    }
  };

  const handleSaveCopy = () => {
    void saveCurrentProjectToDisk();
    acknowledgeRemote();
  };

  const handleIgnore = () => {
    acknowledgeRemote();
  };

  return (
    <div className="shrink-0 border-b border-border bg-amber-500/15 px-3 py-2 flex flex-wrap items-center gap-2 text-xs text-foreground">
      <span className="font-medium">
        {t(
          'diskSync.banner.message',
          'This project changed on disk (revision {revision}) while you have unsaved edits.',
          { revision: pending.remoteRevision },
        )}
      </span>
      <span className="flex items-center gap-2 ml-auto">
        <Button size="sm" variant="danger" disabled={busy} onClick={() => void handleReload()}>
          {t('diskSync.banner.reload', 'Reload and discard my edits')}
        </Button>
        <Button size="sm" variant="ghost" disabled={busy} onClick={handleSaveCopy}>
          {t('diskSync.banner.saveCopy', 'Save mine as a copy')}
        </Button>
        <Button size="sm" variant="ghost" disabled={busy} onClick={handleIgnore}>
          {t('diskSync.banner.ignore', 'Ignore')}
        </Button>
      </span>
      {error && <span className="w-full text-danger">{error}</span>}
    </div>
  );
}
