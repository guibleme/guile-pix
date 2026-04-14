'use client';

import React from 'react';
import { ArrowRight, Bot } from 'lucide-react';
import PixelIcon from '@/components/ui/PixelIcon';
import { setPlayerName } from '@/lib/profile/playerIdentity';

type IntroPhase = 'collect-name' | 'booting' | 'reveal';

interface SpriteDogWelcomeProps {
  onEnterEditor: () => void;
}

const BOOT_STEPS = [
  'Leyendo firma del artista...',
  'Sincronizando motor de pixeles...',
  'Calculando presets de animacion...',
  'Ajustando paletas kawaii...',
  'Cargando modo ultra doggo...',
] as const;

const MAX_BOOT_DURATION_MS = 9000;

function sanitizeName(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ').slice(0, 28);
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 text-[#f4c28c]">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:140ms]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:280ms]" />
    </span>
  );
}

export default function SpriteDogWelcome({ onEnterEditor }: SpriteDogWelcomeProps) {
  const [phase, setPhase] = React.useState<IntroPhase>('collect-name');
  const [nameInput, setNameInput] = React.useState('');
  const [playerName, setPlayerNameState] = React.useState('');
  const [activeStep, setActiveStep] = React.useState(-1);
  const [progress, setProgress] = React.useState(0);

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
      setActiveStep(Math.min(stepIndex, BOOT_STEPS.length - 1));
      setProgress(Math.min(96, Math.round(((stepIndex + 1) / BOOT_STEPS.length) * 90)));
      if (stepIndex >= BOOT_STEPS.length - 1) {
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
  }, [phase]);

  const startSequence = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const safe = sanitizeName(nameInput);
    if (!safe) return;
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
    <main className="min-h-screen w-full overflow-auto bg-[#040507] text-[#f7f0e7]">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1220px] items-center px-3 py-5 sm:px-6">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[6%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(255,150,36,0.34)_0%,_rgba(255,150,36,0.03)_70%,_transparent_100%)]" />
          <div className="absolute bottom-[-20%] right-[8%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(255,109,12,0.26)_0%,_rgba(255,109,12,0.02)_75%,_transparent_100%)]" />
        </div>

        <section className="grid w-full overflow-hidden rounded-[28px] border border-[#2f2213] bg-[linear-gradient(180deg,rgba(13,10,8,0.98),rgba(8,8,8,0.98))] shadow-[0_30px_90px_rgba(0,0,0,0.62)] md:grid-cols-[250px_minmax(0,1fr)_300px]">
          <aside className="hidden border-r border-[#2f2213] bg-[#0c0b09] p-5 md:block">
            <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#eabf86]">
              <PixelIcon name="dog" size={14} />
              <span>Threads</span>
            </div>
            <div className="space-y-2">
              {[
                ['SpriteDog AI', 'online'],
                ['Pixel bootstrap', 'local'],
                ['Welcome flow', 'active'],
                ['Editor handoff', 'queued'],
              ].map(([title, meta]) => (
                <article key={title} className="rounded-xl border border-[#2c2114] bg-[#13100c] px-3 py-2">
                  <p className="text-xs text-[#fae9d3]">{title}</p>
                  <p className="text-[10px] text-[#a98b66]">{meta}</p>
                </article>
              ))}
            </div>
          </aside>

          <div className="flex min-h-[680px] flex-col border-r border-[#2f2213]">
            <header className="flex items-center justify-between border-b border-[#2f2213] px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2 text-[#ffcd8b]">
                <PixelIcon name="sparkles" size={14} />
                <span className="text-xs uppercase tracking-[0.18em]">SpriteDog Welcome</span>
              </div>
              <button
                type="button"
                onClick={onEnterEditor}
                className="rounded-md border border-[#594023] bg-[#17120d] px-3 py-1.5 text-[11px] text-[#f6ce95] hover:border-[#7b562b] hover:bg-[#21170f]"
              >
                Saltar intro
              </button>
            </header>

            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
              <div className="max-w-[760px] rounded-2xl border border-[#3a2a17] bg-[#100d0a] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#ffd29a]">
                  <Bot size={16} />
                  <span className="text-xs font-medium">square-ui-chat mode: SpriteDog</span>
                </div>
                <p className="rounded-xl border border-[#332616] bg-[#1a130d] px-3 py-2 text-sm text-[#f4e3cc]">
                  Simulando asistente IA local. Todo en tu maquina, sin nube.
                </p>
              </div>

              {phase === 'collect-name' && (
                <form onSubmit={startSequence} className="max-w-[760px] space-y-3 rounded-2xl border border-[#362717] bg-[#0f0c09] p-4">
                  <p className="text-sm text-[#ffe7c3]">
                    Hola. Soy tu pseudo-IA. Primero dime tu nombre para personalizar SpriteDog.
                  </p>
                  <input
                    value={nameInput}
                    onChange={(event) => setNameInput(event.target.value)}
                    className="h-11 w-full rounded-xl border border-[#4d371d] bg-[#080706] px-3 text-sm text-[#fff0d7] outline-none transition focus:border-[#ffbb60] focus:ring-1 focus:ring-[#ffbb60]"
                    placeholder="Nombre de piloto..."
                    maxLength={28}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center gap-1 rounded-xl border border-[#ffbb5d] bg-[linear-gradient(135deg,#ffd27f,#ff9d35)] px-4 text-sm font-semibold text-[#2b1808] transition hover:brightness-105"
                  >
                    Iniciar
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}

              {phase === 'booting' && (
                <div className="max-w-[760px] space-y-3 rounded-2xl border border-[#3c2b18] bg-[#0d0b09] p-4">
                  <p className="text-sm text-[#f6e4ca]">
                    Perfecto, <span className="text-[#ffcf8f]">{playerName}</span>. Pensando como IA...
                    <TypingDots />
                  </p>

                  <div className="space-y-2">
                    {BOOT_STEPS.map((step, index) => {
                      const done = index < activeStep;
                      const active = index === activeStep;
                      return (
                        <div
                          key={step}
                          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                            done
                              ? 'border-[#47331c] bg-[#17110c] text-[#f3ddbb]'
                              : active
                                ? 'border-[#6d4a22] bg-[#22170d] text-[#ffe4bb]'
                                : 'border-[#2a2014] bg-[#120e0a] text-[#967856]'
                          }`}
                        >
                          {active ? <PixelIcon name="loader" size={13} className="animate-spin text-[#ffbf67]" /> : <PixelIcon name="dog" size={13} />}
                          <span>{step}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-1">
                    <div className="h-2 overflow-hidden rounded-full border border-[#47311a] bg-[#0a0806]">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#ffd179,#ff9e2f)] transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#b89569]">
                      <span>{progress}%</span>
                      <button
                        type="button"
                        onClick={enterEditor}
                        className="rounded-md border border-[#5c3f1d] bg-[#17110a] px-2 py-0.5 text-[10px] text-[#f8c982]"
                      >
                        Entrar ahora
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {phase === 'reveal' && (
                <div className="max-w-[760px] space-y-3 rounded-2xl border border-[#4b351a] bg-[#110d09] p-4">
                  <p className="rounded-xl border border-[#5e4120] bg-[#23170d] px-3 py-2 text-sm text-[#ffe6c1]">
                    Es broma, {playerName}. No soy una IA, soy un golden retriever pixel.
                    Bienvenido a SpriteDog.
                  </p>
                  <div className="rounded-2xl border border-[#6e4a22] bg-[radial-gradient(circle_at_center,rgba(255,190,92,0.35),rgba(20,12,7,0.93)_62%)] px-4 py-5 text-center">
                    <p className="text-5xl text-[#ffd18f]">U^_^U</p>
                    <p className="mt-2 text-xs text-[#f8ddb6]">Local. Free. Offline. Pixel power.</p>
                  </div>
                  <button
                    type="button"
                    onClick={enterEditor}
                    className="inline-flex h-10 items-center gap-1 rounded-xl border border-[#ffbf61] bg-[linear-gradient(135deg,#ffd487,#ff9f33)] px-4 text-sm font-semibold text-[#2f1a08] transition hover:brightness-105"
                  >
                    Entrar a SpriteDog
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <aside className="hidden bg-[#0b0a08] p-5 md:block">
            <div className="mb-4 text-xs uppercase tracking-[0.16em] text-[#d3a972]">Session</div>
            <div className="space-y-2">
              <div className="rounded-xl border border-[#312213] bg-[#14100b] px-3 py-2">
                <p className="text-[11px] text-[#a98a62]">App</p>
                <p className="text-sm text-[#f8e5cb]">SpriteDog</p>
              </div>
              <div className="rounded-xl border border-[#312213] bg-[#14100b] px-3 py-2">
                <p className="text-[11px] text-[#a98a62]">Mode</p>
                <p className="text-sm text-[#f8e5cb]">100% Local</p>
              </div>
              <div className="rounded-xl border border-[#312213] bg-[#14100b] px-3 py-2">
                <p className="text-[11px] text-[#a98a62]">Access</p>
                <p className="text-sm text-[#f8e5cb]">Offline-ready</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
