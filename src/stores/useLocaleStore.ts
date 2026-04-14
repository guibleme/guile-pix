import { create } from 'zustand';
import {
  DEFAULT_LOCALE,
  detectPreferredLocale,
  resolveLocaleFromPreference,
  type Locale,
  type LocalePreference,
} from '@/lib/i18n';

interface LocaleState {
  locale: Locale;
  preference: LocalePreference;
  setLocale: (locale: Locale) => void;
  setPreference: (preference: LocalePreference) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: detectPreferredLocale() ?? DEFAULT_LOCALE,
  preference: 'auto',
  setLocale: (locale) => set({ locale }),
  setPreference: (preference) => {
    set({
      preference,
      locale: preference === 'auto' ? detectPreferredLocale() : resolveLocaleFromPreference(preference),
    });
  },
}));
