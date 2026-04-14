'use client';

import React from 'react';
import { useUIStore } from '@/stores/useUIStore';
import Dialog from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import useI18n from '@/hooks/useI18n';

export default function UnsavedChangesDialog() {
  const { t } = useI18n();
  const {
    showUnsavedChangesDialog,
    unsavedChangesActionLabel,
    resolveUnsavedChanges,
  } = useUIStore();

  return (
    <Dialog
      open={showUnsavedChangesDialog}
      onClose={() => resolveUnsavedChanges('cancel')}
      title={t('unsaved.title', 'Unsaved Changes')}
    >
      <div className="space-y-4">
        <p className="text-sm text-muted">
          {t('unsaved.body', 'You have unsaved changes. Save before continuing with {action}?', {
            action: unsavedChangesActionLabel,
          })}
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => resolveUnsavedChanges('cancel')}>
            {t('unsaved.cancel', 'Cancel')}
          </Button>
          <Button variant="danger" onClick={() => resolveUnsavedChanges('discard')}>
            {t('unsaved.discard', 'Discard')}
          </Button>
          <Button data-dialog-default="true" data-dialog-autofocus="true" onClick={() => resolveUnsavedChanges('save')}>
            {t('unsaved.saveContinue', 'Save & Continue')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
