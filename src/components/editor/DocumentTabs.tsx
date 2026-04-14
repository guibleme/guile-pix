'use client';

import React, { useEffect, useState } from 'react';
import PixelIcon from '@/components/ui/PixelIcon';
import Button from '@/components/ui/Button';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { usePersistenceStore } from '@/stores/usePersistenceStore';
import { useUIStore } from '@/stores/useUIStore';
import { saveCurrentProjectToDisk } from '@/lib/project/projectPersistence';
import useI18n from '@/hooks/useI18n';

interface TabContextMenuState {
  docId: string;
  x: number;
  y: number;
}

export default function DocumentTabs() {
  const { t } = useI18n();
  const documents = useWorkspaceStore((s) => s.documents);
  const activeDocumentId = useWorkspaceStore((s) => s.activeDocumentId);
  const switchToDocument = useWorkspaceStore((s) => s.switchToDocument);
  const closeDocument = useWorkspaceStore((s) => s.closeDocument);
  const closeOtherDocuments = useWorkspaceStore((s) => s.closeOtherDocuments);
  const duplicateDocument = useWorkspaceStore((s) => s.duplicateDocument);
  const reopenLastClosedDocument = useWorkspaceStore((s) => s.reopenLastClosedDocument);
  const hasClosedDocuments = useWorkspaceStore((s) => s.closedDocuments.length > 0);
  const setNewProjectDialog = useUIStore((s) => s.setNewProjectDialog);
  const promptUnsavedChanges = useUIStore((s) => s.promptUnsavedChanges);
  const activeProjectName = useProjectStore((s) => s.project.name);
  const activeDirty = usePersistenceStore((s) => s.isDirty);
  const [contextMenu, setContextMenu] = useState<TabContextMenuState | null>(null);

  useEffect(() => {
    if (!contextMenu) return;

    const closeMenu = () => setContextMenu(null);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
      }
    };

    window.addEventListener('mousedown', closeMenu);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('mousedown', closeMenu);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [contextMenu]);

  const closeTab = async (docId: string) => {
    const isActive = docId === activeDocumentId;
    const tab = documents.find((doc) => doc.id === docId);
    if (!tab) return;

    if (isActive && activeDirty) {
      const decision = await promptUnsavedChanges(t('tabs.action.closeDocument', 'Close Document'));
      if (decision === 'cancel') return;
      if (decision === 'save') {
        saveCurrentProjectToDisk();
      }
    }

    closeDocument(docId);
    setContextMenu(null);
  };

  const duplicateTab = (docId: string) => {
    duplicateDocument(docId, { setActive: true });
    setContextMenu(null);
  };

  const closeOtherTabs = async (docId: string) => {
    if (activeDocumentId && activeDocumentId !== docId && activeDirty) {
      const decision = await promptUnsavedChanges(t('tabs.action.closeOthers', 'Close Other Documents'));
      if (decision === 'cancel') {
        return;
      }
      if (decision === 'save') {
        saveCurrentProjectToDisk();
      }
    }
    closeOtherDocuments(docId);
    setContextMenu(null);
  };

  const reopenClosedTab = () => {
    reopenLastClosedDocument({ setActive: true });
    setContextMenu(null);
  };

  return (
    <div className="h-10 shrink-0 border-b border-border bg-surface/90 px-2 flex items-center gap-1 no-select backdrop-blur relative overflow-x-auto">
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: 'var(--ui-chrome-gradient)' }} />

      <div className="relative z-10 flex items-center gap-1 min-w-0">
        {documents.map((doc) => {
          const isActive = doc.id === activeDocumentId;
          const title = isActive ? activeProjectName : doc.project.name;
          const dirty = isActive ? activeDirty : doc.isDirty;

          return (
            <div
              key={doc.id}
              className={`h-8 max-w-[220px] min-w-[120px] rounded-lg border flex items-center gap-1 px-2 transition-colors ${
                isActive
                  ? 'border-accent bg-accent/15 text-foreground'
                  : 'border-border bg-surface-hover/40 text-muted hover:bg-surface-hover'
              }`}
              onContextMenu={(event) => {
                event.preventDefault();
                setContextMenu({ docId: doc.id, x: event.clientX, y: event.clientY });
              }}
            >
              <button
                type="button"
                className="min-w-0 flex-1 text-left text-xs truncate"
                title={title}
                onClick={() => switchToDocument(doc.id)}
              >
                {dirty ? '* ' : ''}
                {title}
              </button>
              <button
                type="button"
                className="h-5 w-5 inline-flex items-center justify-center rounded text-muted hover:text-foreground hover:bg-surface"
                title={t('tabs.closeDocument', 'Close document')}
                onClick={(event) => {
                  event.stopPropagation();
                  void closeTab(doc.id);
                }}
                disabled={documents.length <= 1}
              >
                <PixelIcon name="close" size={12} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="ml-auto relative z-10">
        <Button
          variant="ghost"
          size="sm"
          className="!h-7 px-2 mr-1"
          title={t('tabs.reopenClosed', 'Reopen closed document')}
          onClick={reopenClosedTab}
          disabled={!hasClosedDocuments}
        >
          <PixelIcon name="history" size={13} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="!h-7 px-2"
          title={t('tabs.newDocument', 'New document')}
          onClick={() => setNewProjectDialog(true)}
        >
          <PixelIcon name="plus" size={13} />
        </Button>
      </div>

      {contextMenu && (
        <div
          className="fixed z-[130] min-w-[180px] rounded-xl border border-border bg-surface shadow-[0_16px_36px_rgba(0,0,0,0.35)] p-1"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="w-full h-8 px-2 rounded-lg text-xs text-left text-foreground hover:bg-surface-hover flex items-center gap-2"
            onClick={() => duplicateTab(contextMenu.docId)}
          >
            <PixelIcon name="copy" size={12} />
            {t('tabs.menu.duplicate', 'Duplicate Document')}
          </button>
          <button
            type="button"
            className="w-full h-8 px-2 rounded-lg text-xs text-left text-foreground hover:bg-surface-hover flex items-center gap-2 disabled:opacity-50"
            onClick={() => { void closeOtherTabs(contextMenu.docId); }}
            disabled={documents.length <= 1}
          >
            <PixelIcon name="close" size={12} />
            {t('tabs.menu.closeOthers', 'Close Other Documents')}
          </button>
          <button
            type="button"
            className="w-full h-8 px-2 rounded-lg text-xs text-left text-foreground hover:bg-surface-hover flex items-center gap-2 disabled:opacity-50"
            onClick={reopenClosedTab}
            disabled={!hasClosedDocuments}
          >
            <PixelIcon name="history" size={12} />
            {t('tabs.menu.reopenClosed', 'Reopen Closed Document')}
          </button>
          <button
            type="button"
            className="w-full h-8 px-2 rounded-lg text-xs text-left text-foreground hover:bg-surface-hover flex items-center gap-2 disabled:opacity-50"
            onClick={() => { void closeTab(contextMenu.docId); }}
            disabled={documents.length <= 1}
          >
            <PixelIcon name="close" size={12} />
            {t('tabs.menu.close', 'Close Document')}
          </button>
        </div>
      )}
    </div>
  );
}
