'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import DogSpriteWelcome from '@/components/onboarding/DogSpriteWelcome';
import { getPlayerName } from '@/lib/profile/playerIdentity';
import { localeToHtmlLang, readStoredLocalePreference } from '@/lib/i18n';
import { useLocaleStore } from '@/stores/useLocaleStore';
import useI18n from '@/hooks/useI18n';

const EditorShell = dynamic(() => import('@/components/editor/EditorShell'), {
  ssr: false,
  loading: () => <LoadingScreen messageKey="home.loading" fallback="Loading DogSprite..." />,
});

function LoadingScreen({ messageKey, fallback }: { messageKey: string; fallback: string }) {
  const { t } = useI18n();
  // Use fallback on first render to match SSR output, then translate after hydration
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-background text-foreground">
      <div className="text-sm text-muted animate-glow-pulse">{mounted ? t(messageKey, fallback) : fallback}</div>
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = React.useState<'loading' | 'onboarding' | 'editor'>('loading');
  const locale = useLocaleStore((s) => s.locale);
  const setPreference = useLocaleStore((s) => s.setPreference);

  React.useEffect(() => {
    const preference = readStoredLocalePreference() ?? 'auto';
    setPreference(preference);
    const existing = getPlayerName();
    setScreen(existing ? 'editor' : 'onboarding');
  }, [setPreference]);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = localeToHtmlLang(locale);
  }, [locale]);

  if (screen === 'loading') {
    return <LoadingScreen messageKey="home.preparing" fallback="Preparing DogSprite..." />;
  }

  if (screen === 'onboarding') {
    return <DogSpriteWelcome onEnterEditor={() => setScreen('editor')} />;
  }

  return <EditorShell />;
}
