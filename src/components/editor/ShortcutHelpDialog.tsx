'use client';

import React from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { SHORTCUTS } from '@/constants/shortcuts';
import Dialog from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import useI18n from '@/hooks/useI18n';

type ShortcutId = keyof typeof SHORTCUTS;

const GROUPS: Array<{ titleKey: string; fallbackTitle: string; ids: ShortcutId[] }> = [
  {
    titleKey: 'shortcuts.group.fileView',
    fallbackTitle: 'File & View',
    ids: ['saveProject', 'loadProject', 'reopenClosedDocument', 'showShortcutHelp', 'undo', 'redo', 'zoomIn', 'zoomOut', 'toggleGrid', 'toggleGhostFrames'],
  },
  {
    titleKey: 'shortcuts.group.toolsDraw',
    fallbackTitle: 'Tools & Draw',
    ids: [
      'copyPixels',
      'cutPixels',
      'pastePixels',
      'brush',
      'eraser',
      'fill',
      'colorPicker',
      'line',
      'rect',
      'togglePixelPerfect',
      'toggleTracePolicy',
      'constrainLine',
      'quickColorPicker',
      'decreaseStabilizer',
      'increaseStabilizer',
      'toggleSymmetryHorizontal',
      'toggleSymmetryVertical',
      'moveSymmetryAxisX',
      'moveSymmetryAxisY',
    ],
  },
  {
    titleKey: 'shortcuts.group.timelineColors',
    fallbackTitle: 'Timeline & Colors',
    ids: ['playPause', 'nextFrame', 'prevFrame', 'swapColors'],
  },
];

function formatShortcutKey(id: ShortcutId): string {
  const shortcut = SHORTCUTS[id];
  if (!shortcut) return '';
  const parts: string[] = [];
  if (shortcut.ctrl) parts.push('Ctrl');
  if (shortcut.shift) parts.push('Shift');
  if (shortcut.alt) parts.push('Alt');
  parts.push(shortcut.key);
  return parts.join('+');
}

export default function ShortcutHelpDialog() {
  const { t } = useI18n();
  const isOpen = useUIStore((s) => s.showShortcutHelpDialog);
  const setOpen = useUIStore((s) => s.setShortcutHelpDialog);

  return (
    <Dialog open={isOpen} onClose={() => setOpen(false)} title={t('shortcuts.title', 'Keyboard Shortcuts')}>
      <div className="max-h-[70vh] overflow-y-auto space-y-4">
        <p className="text-xs text-muted">
          {t('shortcuts.tip', 'Tip: press ? to open this panel quickly.')}
        </p>

        {GROUPS.map((group) => (
          <section key={group.titleKey}>
            <h3 className="text-xs font-semibold mb-2">{t(group.titleKey, group.fallbackTitle)}</h3>
            <div className="space-y-1">
              {group.ids.map((id) => (
                <div
                  key={id}
                  className="flex items-center justify-between gap-3 rounded px-2 py-1 bg-background/40 border border-border/40"
                >
                  <span className="text-xs text-foreground">{t(`shortcuts.description.${id}`, SHORTCUTS[id].description)}</span>
                  <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-surface border border-border text-muted">
                    {formatShortcutKey(id)}
                  </kbd>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="pt-2 flex justify-end">
          <Button data-dialog-default="true" size="sm" onClick={() => setOpen(false)}>
            {t('shortcuts.close', 'Close')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
