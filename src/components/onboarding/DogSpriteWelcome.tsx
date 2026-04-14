'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import PixelIcon from '@/components/ui/PixelIcon';
import { setPlayerName } from '@/lib/profile/playerIdentity';
import { loadCategoryData } from '@/lib/sprites/catalogLoader';
import { renderTemplate, resolveScheme } from '@/lib/sprites/templateRenderer';
import type { CategoryData } from '@/lib/sprites/types';
import useI18n from '@/hooks/useI18n';

type IntroPhase = 'collect-name' | 'booting' | 'reveal';

interface DogSpriteWelcomeProps {
  onEnterEditor: () => void;
}

const MAX_BOOT_DURATION_MS = 9000;
const RPG_CATEGORY = 'rpg-ui-32';

const BOOT_ICON_TEMPLATES = [
  'rpg_sword_icon_32',
  'rpg_shield_icon_32',
  'rpg_heart_icon_32',
  'rpg_star_icon_32',
  'rpg_coin_icon_32',
];

function sanitizeName(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ').slice(0, 28);
}

function PixelDog({ size = 'md', animated = false }: { size?: 'sm' | 'md' | 'lg'; animated?: boolean }) {
  const dims = { sm: 'text-3xl', md: 'text-6xl', lg: 'text-8xl' }[size];
  return (
    <div className={`${dims} select-none ${animated ? 'animate-float-bounce' : ''}`}>
      <span className="inline-block" role="img" aria-label="pixel dog">
        <span className="relative inline-flex items-end gap-0.5">
          <span className="text-amber-400">U</span>
          <span className="text-amber-300">^</span>
          <span className="text-pink-400">ェ</span>
          <span className="text-amber-300">^</span>
          <span className="text-amber-400">U</span>
          <span className={`text-amber-500 ${animated ? 'animate-tail-wag inline-block' : ''}`}>~</span>
        </span>
      </span>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 text-amber-400">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:140ms]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:280ms]" />
    </span>
  );
}

/** Renders a single RPG template icon from the rpg-ui-32 category data */
function RpgIcon({ data, templateName, size = 24, className = '' }: {
  data: CategoryData;
  templateName: string;
  size?: number;
  className?: string;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const template = data.templates[templateName];
    if (!template || !canvasRef.current) return;
    const scheme = resolveScheme(templateName, data.schemes);
    const imageData = renderTemplate(template, scheme);
    const canvas = canvasRef.current;
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.putImageData(imageData, 0, 0);
  }, [data, templateName]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size, imageRendering: 'pixelated' as const }}
    />
  );
}

export default function DogSpriteWelcome({ onEnterEditor }: DogSpriteWelcomeProps) {
  const { t } = useI18n();
  const bootSteps = React.useMemo(() => ([
    t('onboarding.boot.step1', 'Sniffing your creative energy...'),
    t('onboarding.boot.step2', 'Collecting your art supplies...'),
    t('onboarding.boot.step3', 'Shaking off the loading screen...'),
    t('onboarding.boot.step4', 'Preparing your sketchbook...'),
    t('onboarding.boot.step5', 'Getting everything just right...'),
  ]), [t]);
  const [phase, setPhase] = React.useState<IntroPhase>('collect-name');
  const [nameInput, setNameInput] = React.useState('');
  const [playerName, setPlayerNameState] = React.useState('');
  const [activeStep, setActiveStep] = React.useState(-1);
  const [progress, setProgress] = React.useState(0);
  const [rpgData, setRpgData] = React.useState<CategoryData | null>(null);

  // Load RPG icon data on mount
  React.useEffect(() => {
    let cancelled = false;
    loadCategoryData(RPG_CATEGORY)
      .then((data) => { if (!cancelled) setRpgData(data); })
      .catch(() => { /* silently fail — icons are decorative */ });
    return () => { cancelled = true; };
  }, []);

  React.useEffect(() => {
    if (phase !== 'booting') return;

    let disposed = false;
    const tickMs = 900;
    let stepIndex = -1;

    const promoteReveal = () => {
      if (disposed) return;
      setProgress(100);
      setPhase('reveal');
    };

    const interval = window.setInterval(() => {
      if (disposed) return;
      stepIndex += 1;
      setActiveStep(Math.min(stepIndex, bootSteps.length - 1));
      setProgress(Math.min(96, Math.round(((stepIndex + 1) / bootSteps.length) * 90)));
      if (stepIndex >= bootSteps.length - 1) {
        window.clearInterval(interval);
        window.setTimeout(promoteReveal, 700);
      }
    }, tickMs);

    const hardTimeout = window.setTimeout(promoteReveal, MAX_BOOT_DURATION_MS);

    return () => {
      disposed = true;
      window.clearInterval(interval);
      window.clearTimeout(hardTimeout);
    };
  }, [bootSteps.length, phase]);

  const startSequence = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const safe = sanitizeName(nameInput);
    if (!safe) return;
    setPlayerName(safe);
    setPlayerNameState(safe);
    setProgress(6);
    setActiveStep(-1);
    setPhase('booting');
  };

  const enterEditor = () => {
    if (playerName) {
      setPlayerName(playerName);
    }
    onEnterEditor();
  };

  return (
    <main className="min-h-screen w-full overflow-auto bg-[#06050a] text-[#f0ecf8]">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[960px] flex-col items-center justify-center px-4 py-8">
        {/* Decorative ambient glows */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[10%] top-[-8%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,_rgba(245,166,35,0.22)_0%,_rgba(245,166,35,0.02)_70%,_transparent_100%)]" />
          <div className="absolute bottom-[-15%] right-[5%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,_rgba(232,123,232,0.16)_0%,_rgba(232,123,232,0.01)_75%,_transparent_100%)]" />
          <div className="absolute left-[50%] top-[30%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(140,100,200,0.10)_0%,_transparent_70%)]" />
        </div>

        {/* Skip button */}
        <div className="absolute right-4 top-4 z-20">
          <button
            type="button"
            onClick={onEnterEditor}
            className="rounded-xl border border-[#2a2240] bg-[#110e18]/80 px-4 py-2 text-xs text-[#9b8ec4] backdrop-blur transition-all hover:border-[#3d3360] hover:text-[#f0ecf8]"
          >
            {t('onboarding.skip', 'Skip intro')}
          </button>
        </div>

        {/* Main card */}
        <section className="w-full max-w-[580px] overflow-hidden rounded-3xl border border-[#2a2240] bg-[linear-gradient(180deg,rgba(17,14,24,0.97),rgba(6,5,10,0.98))] shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-[#2a2240] px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#f5a623,#e87be8)] shadow-[0_0_16px_rgba(245,166,35,0.3)]">
              <PixelIcon name="dog" size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wide">
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #ffbe4a, #e87be8)' }}>
                  DogSprite
                </span>
              </h1>
              <p className="text-[10px] text-[#9b8ec4]">{t('onboarding.tagline', 'Your pixel buddy')}</p>
            </div>
          </header>

          {/* Content area */}
          <div className="flex flex-col gap-4 p-6">
            {/* Mascot */}
            <div className="flex justify-center py-2">
              <PixelDog size={phase === 'reveal' ? 'lg' : 'md'} animated={phase === 'reveal'} />
            </div>

            {/* Phase: collect name */}
            {phase === 'collect-name' && (
              <form onSubmit={startSequence} className="space-y-4">
                <div className="rounded-2xl border border-[#2a2240] bg-[#110e18]/60 p-4">
                  <p className="mb-3 text-sm text-[#d4cbea]">
                    {t('onboarding.askName', 'Woof! I am your pixel companion. What should I call you?')}
                  </p>
                  <input
                    value={nameInput}
                    onChange={(event) => setNameInput(event.target.value)}
                    className="h-11 w-full rounded-xl border border-[#3d3360] bg-[#06050a] px-4 text-sm text-[#f0ecf8] outline-none transition-all placeholder:text-[#9b8ec4]/50 focus:border-amber-500 focus:shadow-[0_0_12px_rgba(245,166,35,0.15)] focus:ring-1 focus:ring-amber-500/30"
                    placeholder={t('onboarding.namePlaceholder', 'Your name...')}
                    maxLength={28}
                    autoFocus
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-amber-500/60 bg-[linear-gradient(135deg,#f5a623,#ff7eb3)] px-5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(245,166,35,0.25)] transition-all hover:scale-[1.02] hover:shadow-[0_6px_28px_rgba(245,166,35,0.35)] active:scale-[0.98]"
                  >
                    {t('onboarding.letsGo', "Let's go!")}
                    <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}

            {/* Phase: booting */}
            {phase === 'booting' && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#2a2240] bg-[#110e18]/60 p-4">
                  <p className="mb-3 text-sm text-[#d4cbea]">
                    {t('onboarding.bootTitle', 'Good boy moment for {name}', { name: playerName || t('menu.artist.fallback', 'Artist') })}
                    <TypingDots />
                  </p>

                  <div className="space-y-2">
                    {bootSteps.map((step, index) => {
                      const done = index < activeStep;
                      const active = index === activeStep;
                      const iconTemplate = rpgData ? BOOT_ICON_TEMPLATES[index % BOOT_ICON_TEMPLATES.length] : null;
                      return (
                        <div
                          key={step}
                          className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-xs transition-all duration-300 ${
                            done
                              ? 'border-[#2a2240] bg-[#1a1525] text-[#d4cbea]'
                              : active
                                ? 'border-amber-500/40 bg-amber-500/5 text-amber-300'
                                : 'border-[#2a2240]/50 bg-[#110e18]/40 text-[#9b8ec4]/40'
                          }`}
                        >
                          {rpgData && iconTemplate ? (
                            <RpgIcon
                              data={rpgData}
                              templateName={iconTemplate}
                              size={16}
                              className={`${active ? 'animate-spin' : ''} ${!done && !active ? 'opacity-20' : ''}`}
                            />
                          ) : active ? (
                            <PixelIcon name="loader" size={13} className="animate-spin text-amber-400" />
                          ) : done ? (
                            <PixelIcon name="dog" size={13} className="text-amber-500/60" />
                          ) : (
                            <PixelIcon name="dog" size={13} className="opacity-20" />
                          )}
                          <span>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="h-2 overflow-hidden rounded-full border border-[#2a2240] bg-[#06050a]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#f5a623,#ff7eb3)] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#9b8ec4]">
                    <span>{progress}%</span>
                    <button
                      type="button"
                      onClick={enterEditor}
                      className="rounded-lg border border-[#2a2240] bg-[#110e18] px-3 py-1 text-[10px] text-[#d4cbea] transition-all hover:border-[#3d3360]"
                    >
                      {t('onboarding.enterNow', 'Enter now')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Phase: reveal */}
            {phase === 'reveal' && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-amber-500/30 bg-[radial-gradient(ellipse_at_center,rgba(245,166,35,0.08),rgba(17,14,24,0.95)_70%)] p-5 text-center">
                  <p className="text-sm text-[#d4cbea]">
                    {t('onboarding.revealLine1', 'Just kidding, {name}. I am not AI, I am a pixel dog.', {
                      name: playerName || t('menu.artist.fallback', 'Artist'),
                    })}
                  </p>
                  <p className="mt-2 text-xs text-[#9b8ec4]">
                    {t('onboarding.revealLine2', '100% local. Zero cloud. All pixels. Much wow.')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={enterEditor}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-amber-500/60 bg-[linear-gradient(135deg,#f5a623,#ff7eb3)] px-5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(245,166,35,0.25)] transition-all hover:scale-[1.02] hover:shadow-[0_6px_28px_rgba(245,166,35,0.35)] active:scale-[0.98]"
                >
                  <PixelIcon name="dog" size={16} />
                  {t('onboarding.startCreating', 'Start creating')}
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="border-t border-[#2a2240] px-6 py-3">
            <div className="flex items-center justify-between text-[10px] text-[#9b8ec4]/60">
              <span>{t('onboarding.footer', 'Local-first pixel art editor')}</span>
              <span>v1.0 - 2026</span>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
