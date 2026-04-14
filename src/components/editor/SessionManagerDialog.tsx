'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import {
  clearRecoverySnapshots,
  clearRecentProjects,
  deleteRecoverySnapshot,
  listRecentProjects,
  listRecoverySnapshots,
  loadRecoverySnapshot,
  removeRecentProject,
  type RecentProjectEntry,
  type RecoveryReason,
  type RecoverySnapshotMeta,
} from '@/lib/project/sessionStorage';
import Dialog from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import useI18n from '@/hooks/useI18n';

type SessionTab = 'recent' | 'recovery';
type RecoveryReasonFilter = 'all' | RecoveryReason;

function formatTimestamp(ts: number): string {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return String(ts);
  }
}

function getInitials(name: string): string {
  const clean = name.trim();
  if (!clean) return 'SP';
  const words = clean.split(/\s+/).slice(0, 2);
  return words.map((w) => w[0]?.toUpperCase() ?? '').join('') || 'SP';
}

function formatRecoveryReason(
  reason: RecoveryReason,
  t: (key: string, fallback?: string) => string
): string {
  switch (reason) {
    case 'autosave': return t('session.reason.autosave', 'Autosave');
    case 'manual-save': return t('session.reason.manualSave', 'Manual Save');
    case 'manual-load': return t('session.reason.manualLoad', 'Manual Load');
    case 'new-project': return t('session.reason.newProject', 'New Sketch');
    case 'session-open': return t('session.reason.sessionOpen', 'Session Open');
    default: return reason;
  }
}

function MetadataChip({
  label,
  variant = 'neutral',
}: {
  label: string;
  variant?: 'neutral' | 'accent';
}) {
  const className = variant === 'accent'
    ? 'text-accent border-accent/50 bg-accent/10'
    : 'text-muted border-border bg-surface-hover';
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] leading-none ${className}`}>
      {label}
    </span>
  );
}

function Thumbnail({
  src,
  name,
  width,
  height,
  altText,
}: {
  src?: string;
  name: string;
  width: number;
  height: number;
  altText: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={altText}
        className="w-12 h-12 border border-border rounded bg-background object-contain"
        style={{ imageRendering: 'pixelated' }}
      />
    );
  }

  return (
    <div className="w-12 h-12 border border-border rounded bg-surface-hover flex flex-col items-center justify-center text-[9px] leading-tight text-muted">
      <span className="text-[10px] font-semibold text-foreground">{getInitials(name)}</span>
      <span>{width}x{height}</span>
    </div>
  );
}

export default function SessionManagerDialog() {
  const { t } = useI18n();
  const { showSessionDialog, setSessionDialog } = useUIStore();
  const openProjectFileAsDocument = useWorkspaceStore((s) => s.openProjectFileAsDocument);
  const [tab, setTab] = useState<SessionTab>('recent');
  const [recent, setRecent] = useState<RecentProjectEntry[]>([]);
  const [recovery, setRecovery] = useState<RecoverySnapshotMeta[]>([]);
  const [query, setQuery] = useState('');
  const [recoveryReasonFilter, setRecoveryReasonFilter] = useState<RecoveryReasonFilter>('all');

  const refreshLists = useCallback(() => {
    setRecent(listRecentProjects());
    setRecovery(listRecoverySnapshots());
  }, []);

  useEffect(() => {
    if (!showSessionDialog) return;
    const raf = window.requestAnimationFrame(() => {
      refreshLists();
      setTab('recent');
      setQuery('');
      setRecoveryReasonFilter('all');
    });
    return () => window.cancelAnimationFrame(raf);
  }, [showSessionDialog, refreshLists]);

  const openRecentEntry = async (entry: RecentProjectEntry) => {
    const snapshot = loadRecoverySnapshot(entry.snapshotId);
    if (!snapshot) {
      removeRecentProject(entry.projectId);
      refreshLists();
      window.alert(t('session.alert.recentUnavailable', 'Recent entry is no longer available.'));
      return;
    }

    openProjectFileAsDocument(snapshot, { setActive: true });
    setSessionDialog(false);
  };

  const openRecoveryEntry = async (entry: RecoverySnapshotMeta) => {
    const snapshot = loadRecoverySnapshot(entry.id);
    if (!snapshot) {
      deleteRecoverySnapshot(entry.id);
      refreshLists();
      window.alert(t('session.alert.recoveryUnavailable', 'Recovery snapshot is no longer available.'));
      return;
    }

    openProjectFileAsDocument(snapshot, { setActive: true });
    setSessionDialog(false);
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredRecent = useMemo(() => {
    if (!normalizedQuery) return recent;
    return recent.filter((entry) => {
      const haystack = `${entry.name} ${entry.width}x${entry.height}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [recent, normalizedQuery]);
  const filteredRecovery = useMemo(() => {
    return recovery.filter((entry) => {
      const matchesReason = recoveryReasonFilter === 'all' || entry.reason === recoveryReasonFilter;
      if (!matchesReason) return false;
      if (!normalizedQuery) return true;
      const haystack = `${entry.name} ${entry.reason} ${entry.width}x${entry.height}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [recovery, recoveryReasonFilter, normalizedQuery]);
  const content = tab === 'recent' ? filteredRecent : filteredRecovery;
  const activeTotal = tab === 'recent' ? recent.length : recovery.length;
  const hasActiveFilters = normalizedQuery.length > 0 || (tab === 'recovery' && recoveryReasonFilter !== 'all');

  return (
    <Dialog open={showSessionDialog} onClose={() => setSessionDialog(false)} title={t('session.title', 'Session Manager')}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => setTab('recent')}
            data-dialog-autofocus="true"
            className={`px-2 py-1.5 text-xs rounded border transition-colors
              ${tab === 'recent' ? 'border-accent bg-accent/20 text-foreground' : 'border-border text-muted hover:border-border-light'}`}
          >
            {t('session.recentTab', 'Recent Sketches')}
          </button>
          <button
            onClick={() => setTab('recovery')}
            className={`px-2 py-1.5 text-xs rounded border transition-colors
              ${tab === 'recovery' ? 'border-accent bg-accent/20 text-foreground' : 'border-border text-muted hover:border-border-light'}`}
          >
            {t('session.recoveryTab', 'Recovery Snapshots')}
          </button>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tab === 'recent'
              ? t('session.searchRecent', 'Search by project name or size...')
              : t('session.searchRecovery', 'Search by name, reason, or size...')}
            className="w-full px-2 py-1.5 text-xs bg-background border border-border rounded text-foreground"
          />
          {tab === 'recovery' && (
            <div className="flex flex-wrap gap-1">
              {(['all', 'autosave', 'manual-save', 'manual-load', 'new-project', 'session-open'] as RecoveryReasonFilter[]).map((reason) => (
                <button
                  key={reason}
                  onClick={() => setRecoveryReasonFilter(reason)}
                  className={`px-2 py-1 text-[10px] rounded border transition-colors ${
                    recoveryReasonFilter === reason
                      ? 'border-accent bg-accent/20 text-foreground'
                      : 'border-border text-muted hover:border-border-light'
                  }`}
                >
                  {reason === 'all' ? t('session.reasons.all', 'All Reasons') : formatRecoveryReason(reason, t)}
                </button>
              ))}
            </div>
          )}
          <div className="text-[11px] text-muted">
            {tab === 'recent'
              ? t('session.count.entries', 'Showing {shown} of {total} entries', { shown: content.length, total: activeTotal })
              : t('session.count.snapshots', 'Showing {shown} of {total} snapshots', { shown: content.length, total: activeTotal })}
          </div>
        </div>

        <div className="border border-border rounded max-h-[260px] overflow-auto">
          {content.length === 0 && (
            <div className="px-3 py-8 text-xs text-center text-muted">
              {hasActiveFilters
                ? (tab === 'recent'
                  ? t('session.empty.recent.filtered', 'No recent projects match current filters.')
                  : t('session.empty.recovery.filtered', 'No recovery snapshots match current filters.'))
                : tab === 'recent'
                  ? t('session.empty.recent', 'No recent projects yet. Open or save a project to populate this list.')
                  : t('session.empty.recovery', 'No recovery snapshots yet. Autosave/session events will appear here.')}
            </div>
          )}

          {tab === 'recent' && filteredRecent.map((entry) => (
            <div key={entry.projectId} className="px-3 py-2 border-b last:border-b-0 border-border">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Thumbnail
                    src={entry.thumbnailDataUrl}
                    name={entry.name}
                    width={entry.width}
                    height={entry.height}
                    altText={t('session.thumbnail.alt', '{name} thumbnail', { name: entry.name })}
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-medium truncate">{entry.name}</div>
                    <div className="flex flex-wrap items-center gap-1 mt-1">
                      <MetadataChip label={`${entry.width}x${entry.height}`} />
                      <MetadataChip label={formatTimestamp(entry.updatedAt)} />
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" onClick={() => { void openRecentEntry(entry); }}>
                    {t('session.open', 'Open')}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => { removeRecentProject(entry.projectId); refreshLists(); }}>
                    {t('session.remove', 'Remove')}
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {tab === 'recovery' && filteredRecovery.map((entry) => (
            <div key={entry.id} className="px-3 py-2 border-b last:border-b-0 border-border">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Thumbnail
                    src={entry.thumbnailDataUrl}
                    name={entry.name}
                    width={entry.width}
                    height={entry.height}
                    altText={t('session.thumbnail.alt', '{name} thumbnail', { name: entry.name })}
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-medium truncate">{entry.name}</div>
                    <div className="flex flex-wrap items-center gap-1 mt-1">
                      <MetadataChip label={`${entry.width}x${entry.height}`} />
                      <MetadataChip label={formatRecoveryReason(entry.reason, t)} variant="accent" />
                      <MetadataChip label={formatTimestamp(entry.createdAt)} />
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" onClick={() => { void openRecoveryEntry(entry); }}>
                    {t('session.open', 'Open')}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => { deleteRecoverySnapshot(entry.id); refreshLists(); }}>
                    {t('session.delete', 'Delete')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              if (tab === 'recent') clearRecentProjects();
              else clearRecoverySnapshots();
              refreshLists();
            }}
          >
            {tab === 'recent' ? t('session.clearRecent', 'Clear Recent') : t('session.clearRecovery', 'Clear Recovery')}
          </Button>
          <Button size="sm" variant="ghost" onClick={refreshLists}>
            {t('session.refresh', 'Refresh')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
