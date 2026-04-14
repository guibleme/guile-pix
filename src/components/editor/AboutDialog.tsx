'use client';

import React from 'react';
import Dialog from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import PixelIcon from '@/components/ui/PixelIcon';
import useI18n from '@/hooks/useI18n';

interface AboutDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutDialog({ open, onClose }: AboutDialogProps) {
  const { t } = useI18n();

  return (
    <Dialog open={open} onClose={onClose} title={t('about.title', 'About DogSprite')}>
      <div className="space-y-5 max-w-sm">
        <div className="flex items-center gap-3">
          <PixelIcon name="dog" size={28} className="text-accent" />
          <div>
            <h2 className="text-base font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'var(--ui-logo-gradient)' }}>
              DogSprite
            </h2>
            <p className="text-xs text-muted">{t('about.tagline', 'Free, offline pixel art editor')}</p>
          </div>
        </div>

        <p className="text-xs text-foreground/80 leading-relaxed">
          {t('about.description', 'A lightweight, 100% offline pixel art editor for artists and game developers. No accounts, no cloud, no subscriptions. Your art stays on your machine.')}
        </p>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-foreground">{t('about.credits', 'Credits')}</h3>
          <div className="bg-surface-hover/50 rounded-lg p-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">{t('about.createdBy', 'Created by')}</span>
              <a
                href="https://setodev.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-medium"
              >
                SETO
              </a>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">{t('about.website', 'Website')}</span>
              <a
                href="https://dogsprite.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                dogsprite.org
              </a>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">{t('about.license', 'License')}</span>
              <span className="text-foreground/70">MIT</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-foreground">{t('about.support', 'Support the project')}</h3>
          <p className="text-[11px] text-muted leading-relaxed">
            {t('about.supportDescription', 'DogSprite is free and open source. If it helps your workflow, consider buying me a coffee!')}
          </p>
          <a
            href="https://buymeacoffee.com/pmseto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full h-9 rounded-lg text-xs font-medium transition-colors"
            style={{ backgroundColor: '#ffdd00', color: '#000000' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
            Buy Me a Coffee
          </a>
        </div>

        <div className="flex justify-end pt-1">
          <Button data-dialog-default="true" size="sm" onClick={onClose}>
            {t('about.close', 'Close')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
