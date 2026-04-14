'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { runEditorCommand, type EditorCommandId } from '@/lib/editor/editorCommands';
import { useCanvasStore } from '@/stores/useCanvasStore';
import { usePersistenceStore } from '@/stores/usePersistenceStore';
import { useUIStore } from '@/stores/useUIStore';
import PixelIcon from '@/components/ui/PixelIcon';
import useI18n from '@/hooks/useI18n';

export default function QuickActionsBar() {
  const { t } = useI18n();
  const isDirty = usePersistenceStore((s) => s.isDirty);
  const showGrid = useCanvasStore((s) => s.showGrid);
  const showOnionSkin = useCanvasStore((s) => s.showOnionSkin);
  const onLabel = t('common.on', 'On');
  const offLabel = t('common.off', 'Off');

  const actions: Array<{ label: string; commandId: EditorCommandId; shortcut?: string }> = [
    { label: t('quick.new', 'New'), commandId: 'file.newProject' },
    { label: t('quick.save', 'Save'), commandId: 'file.saveProject', shortcut: 'Ctrl+S' },
    { label: t('quick.loadImport', 'Load/Import'), commandId: 'file.loadProject', shortcut: 'Ctrl+Shift+O' },
    { label: t('quick.sessions', 'Sessions'), commandId: 'file.openSession' },
    { label: t('quick.export', 'Export'), commandId: 'file.openExport' },
    { label: t('quick.shortcuts', 'Shortcuts'), commandId: 'help.shortcuts', shortcut: '?' },
  ];

  const runAction = async (commandId: EditorCommandId) => {
    const result = await runEditorCommand(commandId);
    if (!result.ok && result.error && !result.error.startsWith('Command disabled')) {
      window.alert(result.error);
    }
  };

  return (
    <div className="h-10 shrink-0 border-b border-border bg-surface/90 px-2 flex items-center gap-1 no-select backdrop-blur relative">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ backgroundImage: 'var(--ui-chrome-gradient)' }}
      />
      {actions.map((action) => (
        <Button
          key={action.commandId}
          size="sm"
          variant="ghost"
          title={action.shortcut ? `${action.label} (${action.shortcut})` : action.label}
          onClick={() => { void runAction(action.commandId); }}
          className="!h-7 px-2.5 text-xs relative z-10"
        >
          {action.label}
        </Button>
      ))}

      <Button
        size="sm"
        variant="default"
        onClick={() => useUIStore.getState().setRotation3DDialog(true)}
        className="!h-7 px-2.5 text-xs relative z-10 ml-1"
        title={t('ai.3d.title', 'Generate 3D Views')}
      >
        <PixelIcon name="rotate3d" size={12} className="mr-1" />
        {t('ai.3d.sectionTitle', '3D Rotation')}
      </Button>

      <Button
        size="sm"
        variant="default"
        onClick={() => { void runAction('view.toggleSpriteLibrary'); }}
        className="!h-7 px-2.5 text-xs relative z-10"
        title={t('menu.view.spriteLibrary', 'Sprite Library') + ' (Ctrl+Shift+L)'}
      >
        <PixelIcon name="sparkles" size={12} className="mr-1" />
        {t('menu.view.spriteLibrary', 'Sprite Library')}
      </Button>

      <div className="ml-auto flex items-center gap-2 text-[11px] text-muted relative z-10">
        <span className={isDirty ? 'text-accent font-medium' : ''}>{isDirty ? t('quick.unsaved', 'Unsaved changes') : t('quick.saved', 'Saved')}</span>
        <span>{t('quick.grid', 'Grid: {value}', { value: showGrid ? onLabel : offLabel })}</span>
        <span>{t('quick.ghost', 'Ghost: {value}', { value: showOnionSkin ? onLabel : offLabel })}</span>
      </div>
    </div>
  );
}
