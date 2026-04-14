import type { AIGenerationRequest, AIGenerationResult } from '@/types/ai';
import type { AnimationType } from '@/types/animation';
import {
  mirrorPixelsH,
  shiftPixels,
  scalePixels,
  rotatePixels,
  waveDistort,
  explodePixels,
  brightnessShift,
  glitchPixels,
  meltPixels,
} from './pixelTransforms';

type FrameGenerator = (
  src: Uint8ClampedArray,
  w: number,
  h: number,
  frameIndex: number,
  totalFrames: number
) => Uint8ClampedArray;

const TAU = Math.PI * 2;

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

function loopPhase(frameIndex: number, totalFrames: number): number {
  if (totalFrames <= 0) return 0;
  return (frameIndex % totalFrames) / totalFrames;
}

function oneShotPhase(frameIndex: number, totalFrames: number): number {
  if (totalFrames <= 1) return 1;
  return frameIndex / (totalFrames - 1);
}

function easeInCubic(t: number): number {
  const x = clamp01(t);
  return x * x * x;
}

function easeOutCubic(t: number): number {
  const x = clamp01(t);
  return 1 - Math.pow(1 - x, 3);
}

function easeInOutSine(t: number): number {
  const x = clamp01(t);
  return -(Math.cos(Math.PI * x) - 1) * 0.5;
}

function easeOutBack(t: number): number {
  const x = clamp01(t);
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function smoothstep(start: number, end: number, x: number): number {
  if (Math.abs(end - start) < 1e-6) return x >= end ? 1 : 0;
  const t = clamp01((x - start) / (end - start));
  return t * t * (3 - 2 * t);
}

function gaussianPulse(t: number, center: number, width: number): number {
  const safeWidth = Math.max(0.0001, width);
  const x = (t - center) / safeWidth;
  return Math.exp(-0.5 * x * x);
}

function dampedSine(t: number, frequency: number, decay: number): number {
  return Math.sin(TAU * frequency * t) * Math.exp(-decay * t);
}

function harmonic(
  t: number,
  terms: Array<{ amp: number; freq: number; phase?: number }>
): number {
  let sum = 0;
  let ampSum = 0;
  for (const term of terms) {
    const a = Math.abs(term.amp);
    ampSum += a;
    sum += Math.sin(TAU * term.freq * t + (term.phase ?? 0)) * term.amp;
  }
  if (ampSum <= 1e-6) return 0;
  return sum / ampSum;
}

function fadeAlpha(data: Uint8ClampedArray, factor: number): Uint8ClampedArray {
  const f = clamp01(factor);
  const result = new Uint8ClampedArray(data);
  for (let i = 3; i < result.length; i += 4) {
    result[i] = Math.round(result[i] * f);
  }
  return result;
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const generators: Record<AnimationType, FrameGenerator> = {
  idle: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const breath = harmonic(t, [
      { amp: 1, freq: 1 },
      { amp: 0.32, freq: 2, phase: 0.14 },
      { amp: 0.18, freq: 3, phase: 0.4 },
    ]);
    const dy = -breath * 1.15;
    const sx = 1 - breath * 0.014;
    const sy = 1 + breath * 0.024;
    return scalePixels(shiftPixels(src, w, h, 0, dy), w, h, sx, sy);
  },

  walk: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const stride = Math.sin(theta);
    const bob = Math.abs(Math.sin(theta * 2));
    const lean = Math.sin(theta + 0.3) * 0.06;
    const dx = stride * 2.15;
    const dy = -bob * 1.7;
    const squash = Math.max(0, Math.sin(theta * 2)) * 0.05;
    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, lean);
    return scalePixels(frame, w, h, 1 + squash, 1 - squash * 0.65);
  },

  run: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const stride = Math.sin(theta);
    const impact = Math.abs(Math.sin(theta * 2));
    const dx = stride * 3.4;
    const dy = -impact * 2.55;
    const lean = Math.sin(theta + 0.25) * 0.11;
    const stretch = impact * 0.1;
    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, lean);
    return scalePixels(frame, w, h, 1 + stretch, 1 - stretch * 0.75);
  },

  dash: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    let dx = 0;
    let sx = 1;
    let sy = 1;
    let smear = 0;
    let glow = 0;

    if (t < 0.18) {
      const p = easeInOutSine(t / 0.18);
      dx = -1.6 * p;
      sx = 1 - 0.04 * p;
      sy = 1 + 0.08 * p;
    } else if (t < 0.68) {
      const p = easeOutCubic((t - 0.18) / 0.5);
      dx = lerp(-1.6, 8.4, p);
      sx = 1 + 0.22 * p;
      sy = 1 - 0.09 * p;
      smear = 1 + Math.sin(Math.PI * p) * 1.4;
      glow = 16 + p * 18;
    } else {
      const p = easeInOutSine((t - 0.68) / 0.32);
      dx = lerp(8.4, 0, p);
      sx = lerp(1.22, 1, p);
      sy = lerp(0.91, 1, p);
      glow = (1 - p) * 10;
    }

    let frame = shiftPixels(src, w, h, dx, 0);
    if (smear > 0.01) {
      frame = waveDistort(frame, w, h, smear, 2.8, TAU * t);
    }
    if (glow > 0.01) {
      frame = brightnessShift(frame, glow);
    }
    return scalePixels(frame, w, h, sx, sy);
  },

  attack: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    let dx = 0;
    let dy = 0;
    let angle = 0;
    let sx = 1;
    let sy = 1;

    if (t < 0.28) {
      const p = easeInOutSine(t / 0.28);
      dx = -3 * p;
      angle = -0.18 * p;
      sx = 1 - 0.05 * p;
      sy = 1 + 0.05 * p;
    } else if (t < 0.52) {
      const p = easeOutCubic((t - 0.28) / 0.24);
      dx = lerp(-3, 6.5, p);
      dy = -1.2 * p;
      angle = lerp(-0.18, 0.09, p);
      sx = 1 + 0.12 * p;
      sy = 1 - 0.06 * p;
    } else {
      const raw = (t - 0.52) / 0.48;
      const p = easeOutBack(raw);
      const recover = easeInOutSine(raw);
      dx = lerp(6.5, 0, p);
      angle = lerp(0.09, 0, recover);
      sx = lerp(1.12, 1, p);
      sy = lerp(0.94, 1, p);
    }

    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    return scalePixels(frame, w, h, sx, sy);
  },

  uppercut: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    let dx = 0;
    let dy = 0;
    let angle = 0;
    let sx = 1;
    let sy = 1;
    let glow = 0;

    if (t < 0.25) {
      const p = easeInOutSine(t / 0.25);
      dx = -0.9 * p;
      dy = 1.4 * p;
      angle = -0.1 * p;
      sx = 1 + 0.08 * p;
      sy = 1 - 0.08 * p;
    } else if (t < 0.62) {
      const p = easeOutCubic((t - 0.25) / 0.37);
      dx = lerp(-0.9, 2.6, p);
      dy = lerp(1.4, -4.8, p);
      angle = lerp(-0.1, 0.28, p);
      sx = lerp(1.08, 0.95, p);
      sy = lerp(0.92, 1.18, p);
      glow = 10 + 24 * p;
    } else {
      const p = easeInOutSine((t - 0.62) / 0.38);
      dx = lerp(2.6, 0, p);
      dy = lerp(-4.8, 0, p);
      angle = lerp(0.28, 0, p);
      sx = lerp(0.95, 1, p);
      sy = lerp(1.18, 1, p);
      glow = (1 - p) * 10;
    }

    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    frame = brightnessShift(frame, glow);
    return scalePixels(frame, w, h, sx, sy);
  },

  jump: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const air = Math.max(0, Math.sin(Math.PI * clamp01((t - 0.12) / 0.76)));
    const anticipation = 1 - smoothstep(0, 0.12, t);
    const landing = smoothstep(0.82, 1, t);

    const dy = anticipation * 1.25 - air * 5.2 + landing * 1.75;
    const sx = 1 + anticipation * 0.16 + landing * 0.18 - air * 0.05;
    const sy = 1 - anticipation * 0.14 - landing * 0.14 + air * 0.14;
    return scalePixels(shiftPixels(src, w, h, 0, dy), w, h, sx, sy);
  },

  land: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    let dy = 0;
    if (t < 0.34) {
      dy = lerp(-3.2, 2.2, easeInCubic(t / 0.34));
    } else {
      dy = lerp(2.2, 0, easeOutCubic((t - 0.34) / 0.66));
    }

    const impact = gaussianPulse(t, 0.38, 0.09);
    const sx = 1 + impact * 0.24;
    const sy = 1 - impact * 0.18;
    const glow = impact * 14;
    return scalePixels(brightnessShift(shiftPixels(src, w, h, 0, dy), glow), w, h, sx, sy);
  },

  roll: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const travel = Math.sin(Math.PI * t);
    const dx = travel * 5.3;
    const dy = -Math.abs(Math.sin(TAU * t)) * 0.9 + travel * 0.2;
    const angle = Math.sin(TAU * 1.7 * t) * 0.95 * travel;
    const sx = 1 + travel * 0.09;
    const sy = 1 - travel * 0.08;
    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    return scalePixels(frame, w, h, sx, sy);
  },

  backstep: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const retreat = t < 0.42
      ? easeOutCubic(t / 0.42)
      : lerp(1, 0, easeOutCubic((t - 0.42) / 0.58));
    const dx = -4.4 * retreat;
    const dy = -gaussianPulse(t, 0.16, 0.1) * 0.85 + gaussianPulse(t, 0.5, 0.18) * 0.28;
    const angle = -0.14 * retreat + smoothstep(0.45, 1, t) * 0.06;
    const sx = 1 - retreat * 0.03;
    const sy = 1 + retreat * 0.05;
    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    return scalePixels(frame, w, h, sx, sy);
  },

  sidestep: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const out = t < 0.35
      ? easeOutCubic(t / 0.35)
      : lerp(1, 0, easeInOutSine((t - 0.35) / 0.65));
    const dx = out * 3.3;
    const dy = -Math.sin(Math.PI * t) * 0.65;
    const angle = out * 0.06;
    const flash = gaussianPulse(t, 0.32, 0.13) * 18;
    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    return brightnessShift(frame, flash);
  },

  parry: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const window = gaussianPulse(t, 0.35, 0.065);
    const prep = smoothstep(0, 0.2, t);
    const recover = smoothstep(0.55, 1, t);

    const dx = -1.15 * prep + window * 2.4 - 0.6 * recover;
    const angle = -0.12 * prep + window * 0.36 - 0.08 * recover;
    const sx = 1 - prep * 0.03 + window * 0.05;
    const sy = 1 + prep * 0.04 + window * 0.07 - recover * 0.03;
    const glow = window * 72;

    let frame = shiftPixels(src, w, h, dx, 0);
    frame = rotatePixels(frame, w, h, angle);
    frame = brightnessShift(frame, glow);
    return scalePixels(frame, w, h, sx, sy);
  },

  guard: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const brace = Math.abs(Math.sin(theta));
    const dx = Math.sin(theta) * 0.45;
    const dy = brace * 0.35;
    const angle = Math.sin(theta + 0.6) * 0.05;
    const sx = 1 - brace * 0.04;
    const sy = 1 + brace * 0.05;
    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    frame = scalePixels(frame, w, h, sx, sy);
    return brightnessShift(frame, brace * 6);
  },

  charge: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const build = smoothstep(0, 0.78, t);
    const burst = gaussianPulse(t, 0.84, 0.085);
    const jitter = (pseudoRandom((i + 1) * 97 + n * 31) - 0.5) * 2;

    const dx = -build * 0.9 + burst * 1.4 + jitter * build * 0.25;
    const dy = -build * 0.5;
    const sx = 1 + build * 0.12 + burst * 0.2;
    const sy = 1 - build * 0.08 - burst * 0.14;
    const glow = build * 26 + burst * 38;

    let frame = shiftPixels(src, w, h, dx, dy);
    if (build > 0.2) {
      frame = waveDistort(frame, w, h, 0.8 + build * 1.8, 2.6, TAU * t * 1.5);
    }
    frame = brightnessShift(frame, glow);
    return scalePixels(frame, w, h, sx, sy);
  },

  cast: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    let dx = 0;
    let dy = 0;
    let angle = 0;
    let sx = 1;
    let sy = 1;
    let glow = 0;

    if (t < 0.28) {
      const p = easeInOutSine(t / 0.28);
      dx = -2.1 * p;
      dy = 0.5 * p;
      angle = -0.14 * p;
      sx = 1 - 0.03 * p;
      sy = 1 + 0.06 * p;
    } else if (t < 0.62) {
      const p = easeOutCubic((t - 0.28) / 0.34);
      dx = lerp(-2.1, 3.2, p);
      dy = lerp(0.5, -1.4, p);
      angle = lerp(-0.14, 0.22, p);
      sx = lerp(0.97, 1.08, p);
      sy = lerp(1.06, 0.95, p);
      glow = 12 + 24 * p;
    } else {
      const p = easeInOutSine((t - 0.62) / 0.38);
      dx = lerp(3.2, 0, p);
      dy = lerp(-1.4, 0, p);
      angle = lerp(0.22, 0, p);
      sx = lerp(1.08, 1, p);
      sy = lerp(0.95, 1, p);
      glow = (1 - p) * 12;
    }

    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    if (glow > 8) {
      frame = waveDistort(frame, w, h, 1.1, 2.4, TAU * t);
    }
    frame = brightnessShift(frame, glow);
    return scalePixels(frame, w, h, sx, sy);
  },

  wallslide: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const drop = easeOutCubic(t);
    const dy = lerp(-1, 2.4, drop);
    const contact = Math.max(0, Math.sin(TAU * t * 3));
    const dx = -0.7 + Math.sin(TAU * t * 4) * 0.18;
    const sx = 0.98;
    const sy = 1.04 + contact * 0.03;
    const sparks = contact * 18 - 6;
    let frame = shiftPixels(src, w, h, dx, dy);
    frame = scalePixels(frame, w, h, sx, sy);
    return brightnessShift(frame, sparks);
  },

  climb: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const step = Math.sin(theta);
    const lift = Math.abs(Math.sin(theta));
    const dx = step * 0.8;
    const dy = -lift * 2.4 + Math.sin(theta * 2 + 0.2) * 0.35;
    const angle = step * 0.08;
    const sx = 1 + Math.max(0, -step) * 0.06;
    const sy = 1 + Math.max(0, step) * 0.06;
    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    return scalePixels(frame, w, h, sx, sy);
  },

  crouch: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const down = t < 0.45
      ? easeOutCubic(t / 0.45)
      : lerp(1, 0, easeOutCubic((t - 0.45) / 0.55));
    const dy = down * 1.9;
    const sx = 1 + down * 0.2;
    const sy = 1 - down * 0.24;
    const angle = -down * 0.04;
    let frame = shiftPixels(src, w, h, 0, dy);
    frame = scalePixels(frame, w, h, sx, sy);
    return rotatePixels(frame, w, h, angle);
  },

  comboRunAttack: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    if (t < 0.45) {
      const p = t / 0.45;
      const theta = TAU * p * 1.25;
      const stride = Math.sin(theta);
      const bob = Math.abs(Math.sin(theta * 2));
      const dx = stride * 2 + p * 3.2;
      const dy = -bob * 1.8;
      const angle = Math.sin(theta + 0.2) * 0.08;
      const sx = 1 + Math.max(0, Math.sin(theta * 2)) * 0.06;
      const sy = 1 - Math.max(0, Math.sin(theta * 2)) * 0.04;
      let frame = shiftPixels(src, w, h, dx, dy);
      frame = rotatePixels(frame, w, h, angle);
      return scalePixels(frame, w, h, sx, sy);
    }

    const p = (t - 0.45) / 0.55;
    let dx = 0;
    let dy = 0;
    let angle = 0;
    let glow = 0;

    if (p < 0.3) {
      const q = easeInOutSine(p / 0.3);
      dx = lerp(3.2, 1.2, q);
      angle = lerp(0.06, -0.16, q);
    } else if (p < 0.62) {
      const q = easeOutCubic((p - 0.3) / 0.32);
      dx = lerp(1.2, 7.2, q);
      dy = -q * 1.2;
      angle = lerp(-0.16, 0.12, q);
      glow = 10 + 18 * q;
    } else {
      const q = easeInOutSine((p - 0.62) / 0.38);
      dx = lerp(7.2, 0, q);
      angle = lerp(0.12, 0, q);
      glow = (1 - q) * 8;
    }

    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    return brightnessShift(frame, glow);
  },

  comboJumpCast: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const jumpAir = Math.max(0, Math.sin(Math.PI * clamp01((t - 0.05) / 0.65)));
    const landing = smoothstep(0.72, 1, t);
    const dy = -jumpAir * 4.8 + landing * 1.5;
    const castPulse = gaussianPulse(t, 0.55, 0.1) + gaussianPulse(t, 0.64, 0.08) * 0.8;
    const angle = Math.sin(TAU * t * 1.2) * 0.08 + castPulse * 0.14;
    const sx = 1 + castPulse * 0.1 - landing * 0.05;
    const sy = 1 + jumpAir * 0.08 - castPulse * 0.06;
    const glow = castPulse * 40;

    let frame = shiftPixels(src, w, h, 0, dy);
    if (castPulse > 0.2) {
      frame = waveDistort(frame, w, h, 1 + castPulse * 1.8, 2.4, TAU * t);
    }
    frame = rotatePixels(frame, w, h, angle);
    frame = brightnessShift(frame, glow);
    return scalePixels(frame, w, h, sx, sy);
  },

  comboDashUppercut: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    if (t < 0.42) {
      const p = t / 0.42;
      const dx = lerp(-1.2, 7.8, easeOutCubic(p));
      const sx = 1 + p * 0.18;
      const sy = 1 - p * 0.08;
      let frame = shiftPixels(src, w, h, dx, -p * 0.4);
      frame = brightnessShift(frame, p * 20);
      return scalePixels(frame, w, h, sx, sy);
    }

    const p = (t - 0.42) / 0.58;
    let dx = 0;
    let dy = 0;
    let angle = 0;
    let sx = 1;
    let sy = 1;
    if (p < 0.32) {
      const q = easeInOutSine(p / 0.32);
      dx = lerp(7.8, 5.8, q);
      dy = lerp(-0.4, -4.6, q);
      angle = lerp(0, 0.24, q);
      sx = lerp(1.18, 0.98, q);
      sy = lerp(0.92, 1.16, q);
    } else {
      const q = easeOutCubic((p - 0.32) / 0.68);
      dx = lerp(5.8, 0, q);
      dy = lerp(-4.6, 0, q);
      angle = lerp(0.24, 0, q);
      sx = lerp(0.98, 1, q);
      sy = lerp(1.16, 1, q);
    }
    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    frame = brightnessShift(frame, (1 - p) * 14);
    return scalePixels(frame, w, h, sx, sy);
  },

  comboParryRiposte: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    if (t < 0.4) {
      const p = t / 0.4;
      const window = gaussianPulse(p, 0.65, 0.12);
      const dx = -p * 0.8 + window * 2;
      const angle = -p * 0.1 + window * 0.28;
      let frame = shiftPixels(src, w, h, dx, 0);
      frame = rotatePixels(frame, w, h, angle);
      return brightnessShift(frame, window * 74);
    }

    const p = (t - 0.4) / 0.6;
    let dx = 0;
    let dy = 0;
    let angle = 0;
    if (p < 0.35) {
      const q = easeOutCubic(p / 0.35);
      dx = lerp(0.8, 6.4, q);
      dy = -q * 1.1;
      angle = lerp(0.08, 0.18, q);
    } else {
      const q = easeInOutSine((p - 0.35) / 0.65);
      dx = lerp(6.4, 0, q);
      angle = lerp(0.18, 0, q);
    }
    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    return brightnessShift(frame, (1 - p) * 16);
  },

  comboRollStrike: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    if (t < 0.56) {
      const p = t / 0.56;
      const travel = Math.sin(Math.PI * p);
      const dx = travel * 5.1;
      const dy = -Math.abs(Math.sin(TAU * p)) * 0.85;
      const angle = Math.sin(TAU * 1.7 * p) * 0.92 * travel;
      let frame = shiftPixels(src, w, h, dx, dy);
      frame = rotatePixels(frame, w, h, angle);
      return scalePixels(frame, w, h, 1 + travel * 0.08, 1 - travel * 0.07);
    }

    const p = (t - 0.56) / 0.44;
    let dx = 0;
    let dy = 0;
    let angle = 0;
    if (p < 0.34) {
      const q = easeOutCubic(p / 0.34);
      dx = lerp(5.1, 8, q);
      dy = lerp(-0.2, -1.1, q);
      angle = lerp(0.05, 0.16, q);
    } else {
      const q = easeInOutSine((p - 0.34) / 0.66);
      dx = lerp(8, 0, q);
      angle = lerp(0.16, 0, q);
    }
    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    return brightnessShift(frame, (1 - p) * 12);
  },

  recoil: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const kick = dampedSine(t, 2.6, 3.8);
    const dx = -kick * 4.4;
    const dy = Math.abs(kick) * 0.4;
    const angle = -kick * 0.16;
    return rotatePixels(shiftPixels(src, w, h, dx, dy), w, h, angle);
  },

  stomp: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    let dy = 0;
    if (t < 0.22) {
      dy = lerp(0, -2.4, easeInOutSine(t / 0.22));
    } else if (t < 0.62) {
      dy = lerp(-2.4, 3.6, easeInCubic((t - 0.22) / 0.4));
    } else {
      dy = lerp(3.6, 0, easeOutCubic((t - 0.62) / 0.38));
    }

    const impact = gaussianPulse(t, 0.62, 0.08);
    const sx = 1 + impact * 0.24;
    const sy = 1 - impact * 0.18;
    const flash = impact * 14;
    return scalePixels(brightnessShift(shiftPixels(src, w, h, 0, dy), flash), w, h, sx, sy);
  },

  bounce: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const airborne = Math.abs(Math.sin(theta));
    const contact = 1 - airborne;
    const dy = -airborne * 4.3;
    const sx = 1 + contact * 0.18 - airborne * 0.03;
    const sy = 1 - contact * 0.16 + airborne * 0.1;
    return scalePixels(shiftPixels(src, w, h, 0, dy), w, h, sx, sy);
  },

  spin: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const angle = TAU * t;
    const wobble = Math.sin(angle * 2) * 0.03;
    return scalePixels(rotatePixels(src, w, h, angle), w, h, 1 + wobble, 1 - wobble);
  },

  shake: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const dx = dampedSine(t, 13, 4.5) * 2.8;
    const dy = dampedSine(t, 17, 5.2) * 1.3;
    const frame = shiftPixels(src, w, h, dx, dy);
    return brightnessShift(frame, (1 - t) * 10);
  },

  pulse: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const mix = Math.sin(theta) * 0.7 + Math.sin(theta * 2 + 0.7) * 0.3;
    const scale = 1 + mix * 0.07;
    const glow = mix * 46;
    return scalePixels(brightnessShift(src, glow), w, h, scale, scale);
  },

  heartbeat: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const beat = clamp01(
      gaussianPulse(t, 0.1, 0.05) +
      gaussianPulse(t, 0.24, 0.045) * 0.85
    );
    const scale = 1 + beat * 0.22;
    const glow = beat * 42;
    const dy = -beat * 1.5;
    return scalePixels(brightnessShift(shiftPixels(src, w, h, 0, dy), glow), w, h, scale, scale);
  },

  explode: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const intensity = easeInCubic(t);
    let frame = explodePixels(src, w, h, intensity);
    frame = rotatePixels(frame, w, h, intensity * 0.35);
    frame = shiftPixels(frame, w, h, 0, intensity * 2.2);
    if (t > 0.35) {
      const visibility = 1 - smoothstep(0.35, 1, t);
      frame = fadeAlpha(frame, visibility);
    }
    return frame;
  },

  float: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const dy = Math.sin(theta) * 2.7 + Math.sin(theta * 2 + 0.3) * 0.4;
    const dx = Math.sin(theta * 0.5 + 0.4) * 0.9;
    const tilt = Math.sin(theta * 0.5) * 0.04;
    return rotatePixels(shiftPixels(src, w, h, dx, dy), w, h, tilt);
  },

  hover: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const dy = Math.sin(theta) * 1.9 + Math.sin(theta * 3 + 0.2) * 0.3;
    const dx = Math.sin(theta * 0.5) * 0.6;
    const glow = (Math.sin(theta + Math.PI * 0.5) * 0.5 + 0.5) * 18 - 9;
    return brightnessShift(shiftPixels(src, w, h, dx, dy), glow);
  },

  orbit: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const dx = Math.cos(theta) * 2.5;
    const dy = Math.sin(theta * 2) * 1.4;
    const angle = Math.sin(theta + Math.PI * 0.5) * 0.08 + Math.sin(theta * 2) * 0.04;
    return rotatePixels(shiftPixels(src, w, h, dx, dy), w, h, angle);
  },

  wobble: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const phase = Math.sin(theta);
    const sx = 1 + phase * 0.11;
    const sy = 1 - phase * 0.09;
    const angle = phase * 0.2;
    const dx = Math.sin(theta * 0.5) * 0.9;
    let frame = shiftPixels(src, w, h, dx, 0);
    frame = rotatePixels(frame, w, h, angle);
    return scalePixels(frame, w, h, sx, sy);
  },

  flutter: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const wing = TAU * t * 3;
    const flap = Math.sin(wing);
    const lift = Math.abs(flap);
    const dx = flap * 1.2;
    const dy = -lift * 2.3 + Math.sin(TAU * t) * 0.7;
    const angle = flap * 0.13;
    const sx = 1 + lift * 0.05;
    const sy = 1 - lift * 0.04;
    let frame = shiftPixels(src, w, h, dx, dy);
    frame = rotatePixels(frame, w, h, angle);
    return scalePixels(frame, w, h, sx, sy);
  },

  squash: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const phase = Math.sin(theta);
    const contact = Math.max(0, -phase);
    const airborne = Math.max(0, phase);
    const sx = 1 + contact * 0.2 - airborne * 0.05;
    const sy = 1 - contact * 0.15 + airborne * 0.13;
    const dy = contact * 1.8 - airborne * 0.6;
    return scalePixels(shiftPixels(src, w, h, 0, dy), w, h, sx, sy);
  },

  wave: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const amplitude = 1.1 + (Math.sin(theta) + 1) * 0.9;
    const frequency = 1.6 + Math.sin(theta * 0.5) * 0.45;
    return waveDistort(src, w, h, amplitude, frequency, theta);
  },

  glitch: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const intensity = 0.22 + (Math.sin(TAU * t * 1.7) * 0.5 + 0.5) * 0.45;
    const seed = (i + 1) * 92821 + n * 131;
    let frame = glitchPixels(src, w, h, seed, intensity);
    const jitter = (pseudoRandom(seed * 1.37) - 0.5) * 2.2;
    frame = shiftPixels(frame, w, h, jitter, 0);
    const sparks = (Math.sin(TAU * t * 7) + Math.sin(TAU * t * 13 + 0.9)) * 8;
    return brightnessShift(frame, sparks);
  },

  flicker: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const flicker =
      Math.sin(theta * 5) * 0.55 +
      Math.sin(theta * 11 + 0.2) * 0.3 +
      Math.sin(theta * 17 + 1.3) * 0.15;
    const glow = flicker * 45;
    const jitterX = flicker > 0.45 ? 1 : flicker < -0.45 ? -1 : 0;
    let frame = brightnessShift(src, glow);
    if (jitterX !== 0) {
      frame = shiftPixels(frame, w, h, jitterX, 0);
    }
    return frame;
  },

  melt: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const intensity = easeInCubic(t);
    let frame = meltPixels(src, w, h, intensity);
    const dx = Math.sin(TAU * t * 2.5) * intensity * 1.4;
    frame = shiftPixels(frame, w, h, dx, 0);
    if (t > 0.65) {
      frame = brightnessShift(frame, -smoothstep(0.65, 1, t) * 18);
    }
    return frame;
  },

  rotate: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    return rotatePixels(src, w, h, TAU * t);
  },

  swing: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const angle = Math.sin(theta) * 0.3;
    const dx = Math.sin(theta) * 2.2;
    const dy = Math.abs(Math.sin(theta)) * 0.35;
    return rotatePixels(shiftPixels(src, w, h, dx, dy), w, h, angle);
  },

  spiral: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const radius = easeOutCubic(t) * 4.4;
    const angle = TAU * 2.5 * t;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;
    const tilt = Math.sin(angle * 0.5) * 0.18;
    let frame = rotatePixels(shiftPixels(src, w, h, dx, dy), w, h, tilt);
    if (t > 0.7) {
      frame = fadeAlpha(frame, 1 - smoothstep(0.7, 1, t));
    }
    return frame;
  },

  teleport: (src, w, h, i, n) => {
    const t = oneShotPhase(i, n);
    const fadeOut = 1 - smoothstep(0.06, 0.42, t);
    const fadeIn = smoothstep(0.62, 1, t);
    const visibility = t < 0.5 ? fadeOut : fadeIn;
    const phaseShift = t < 0.5 ? 0 : (1 - fadeIn) * 6;

    let frame = shiftPixels(src, w, h, phaseShift, 0);
    if (t < 0.5) {
      const seed = (i + 1) * 7177 + n * 19;
      const glitchIntensity = 0.2 + (1 - fadeOut) * 0.5;
      frame = glitchPixels(frame, w, h, seed, glitchIntensity);
    }
    return fadeAlpha(frame, visibility);
  },

  custom: (src, w, h, i, n) => {
    const t = loopPhase(i, n);
    const theta = TAU * t;
    const dx = Math.sin(theta) * 1;
    const dy = Math.sin(theta * 2) * 0.7;
    const angle = Math.sin(theta * 0.5) * 0.05;
    return rotatePixels(shiftPixels(src, w, h, dx, dy), w, h, angle);
  },
};

export async function generateAnimation(
  request: AIGenerationRequest,
  sourcePixels: Uint8ClampedArray,
  width: number,
  height: number,
  onProgress?: (progress: number) => void
): Promise<AIGenerationResult> {
  const animationType = request.animationType || 'idle';
  const facing = request.facing === 'left' ? 'left' : 'right';
  const gen = generators[animationType] ?? generators.idle;
  const frameCount = Math.max(1, request.frameCount || 4);
  const frames: AIGenerationResult['frames'] = [];

  for (let i = 0; i < frameCount; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 45));
    let pixels = gen(sourcePixels, width, height, i, frameCount);
    if (facing === 'left') {
      pixels = mirrorPixelsH(pixels, width, height);
    }
    frames.push({ pixels, width, height });
    if (onProgress) {
      onProgress(Math.round(((i + 1) / frameCount) * 100));
    }
  }

  return { frames, status: 'preview' };
}
