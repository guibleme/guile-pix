'use client';

import { useCallback } from 'react';
import { translate } from '@/lib/i18n';
import { useLocaleStore } from '@/stores/useLocaleStore';

export default function useI18n() {
  const locale = useLocaleStore((s) => s.locale);

  const t = useCallback(
    (key: string, fallback?: string, params?: Record<string, string | number>) => {
      return translate(locale, key, fallback, params);
    },
    [locale]
  );

  return { locale, t };
}
