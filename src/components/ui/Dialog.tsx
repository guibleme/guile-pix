'use client';

import React, { useCallback, useEffect, useId, useRef } from 'react';
import PixelIcon from '@/components/ui/PixelIcon';
import { createPortal } from 'react-dom';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Dialog({ open, onClose, title, children }: DialogProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback((): HTMLElement[] => {
    const container = containerRef.current;
    if (!container) return [];

    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter((el) => {
      if (el.hasAttribute('disabled')) return false;
      if (el.getAttribute('aria-hidden') === 'true') return false;
      return true;
    });
  }, []);

  const focusInitialElement = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const preferred = container.querySelector<HTMLElement>('[data-dialog-autofocus="true"]');
    if (preferred && !preferred.hasAttribute('disabled')) {
      preferred.focus();
      return;
    }

    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
      return;
    }

    container.focus();
  }, [getFocusableElements]);

  useEffect(() => {
    if (!open) return;

    previousActiveElementRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const raf = window.requestAnimationFrame(() => {
      focusInitialElement();
    });

    return () => {
      window.cancelAnimationFrame(raf);
      previousActiveElementRef.current?.focus();
    };
  }, [focusInitialElement, open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        e.preventDefault();
        containerRef.current?.focus();
        return;
      }

      const active = document.activeElement as HTMLElement | null;
      const currentIndex = active ? focusable.indexOf(active) : -1;

      if (e.shiftKey) {
        if (currentIndex <= 0) {
          e.preventDefault();
          focusable[focusable.length - 1].focus();
        }
      } else if (currentIndex === -1 || currentIndex === focusable.length - 1) {
        e.preventDefault();
        focusable[0].focus();
      }
      return;
    }

    if (e.key === 'Enter' && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target instanceof HTMLTextAreaElement || target.isContentEditable) return;
      if (target instanceof HTMLButtonElement || target instanceof HTMLAnchorElement) return;

      const container = containerRef.current;
      if (!container) return;
      const defaultAction = container.querySelector<HTMLButtonElement>(
        '[data-dialog-default="true"]:not([disabled])'
      );
      if (defaultAction) {
        e.preventDefault();
        defaultAction.click();
      }
    }
  };

  if (!open) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center" onKeyDown={handleKeyDown}>
      <div className="absolute inset-0" style={{ background: 'var(--ui-overlay)' }} onClick={onClose} />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative bg-surface border border-border rounded-lg shadow-xl max-w-md w-full mx-4 outline-none"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 id={titleId} className="text-sm font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-foreground transition-colors"
            aria-label="Close dialog"
          >
            <PixelIcon name="close" size={16} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
