import type { AnimationPreset } from '@/types/animation';

export const DEFAULT_FPS = 12;
export const MIN_FPS = 1;
export const MAX_FPS = 60;
export const DEFAULT_FRAME_DURATION = 100;
export const MIN_FRAME_DURATION = 16;
export const MAX_FRAME_DURATION = 2000;

export const ANIMATION_PRESETS: AnimationPreset[] = [
  { type: 'idle', name: 'Idle / Breathe', frameCount: 8, description: 'Layered harmonic breathing motion' },
  { type: 'walk', name: 'Walk Cycle', frameCount: 8, description: 'Stride + bob + torso lean' },
  { type: 'run', name: 'Run Cycle', frameCount: 8, description: 'Faster stride with stronger impact rhythm' },
  { type: 'dash', name: 'Dash Burst', frameCount: 8, description: 'Anticipation, burst speed, and settle' },
  { type: 'attack', name: 'Attack / Strike', frameCount: 7, description: 'Wind-up, strike acceleration, recovery' },
  { type: 'uppercut', name: 'Uppercut', frameCount: 8, description: 'Lower body load then rising strike arc' },
  { type: 'jump', name: 'Jump Arc', frameCount: 8, description: 'Anticipation, ballistic arc, and landing' },
  { type: 'land', name: 'Landing', frameCount: 8, description: 'Fall impact, squash, and settle' },
  { type: 'roll', name: 'Dodge Roll', frameCount: 10, description: 'Forward tumble with rotational recovery' },
  { type: 'backstep', name: 'Backstep', frameCount: 8, description: 'Quick retreat with defensive posture' },
  { type: 'sidestep', name: 'Sidestep', frameCount: 8, description: 'Fast evasive lateral displacement' },
  { type: 'parry', name: 'Parry', frameCount: 8, description: 'Counter-timed deflect window with flash' },
  { type: 'guard', name: 'Guard / Block', frameCount: 8, description: 'Defensive hold with micro recoil' },
  { type: 'charge', name: 'Charge', frameCount: 10, description: 'Energy build-up with compression and glow' },
  { type: 'cast', name: 'Spell Cast', frameCount: 10, description: 'Wind-up, release burst, and recovery' },
  { type: 'wallslide', name: 'Wall Slide', frameCount: 8, description: 'Friction descent with contact sparks' },
  { type: 'climb', name: 'Climb', frameCount: 8, description: 'Alternating pull-up cadence cycle' },
  { type: 'crouch', name: 'Crouch', frameCount: 8, description: 'Compression down and stand recovery' },
  { type: 'comboRunAttack', name: 'Combo: Run -> Attack', frameCount: 12, description: 'Momentum run transition into strike finish' },
  { type: 'comboJumpCast', name: 'Combo: Jump -> Cast', frameCount: 12, description: 'Airborne setup and spell-release landing' },
  { type: 'comboDashUppercut', name: 'Combo: Dash -> Uppercut', frameCount: 12, description: 'Burst movement chained into rising hit' },
  { type: 'comboParryRiposte', name: 'Combo: Parry -> Riposte', frameCount: 10, description: 'Deflect window followed by fast counter' },
  { type: 'comboRollStrike', name: 'Combo: Roll -> Strike', frameCount: 12, description: 'Evasive tumble transitioning to slash' },
  { type: 'recoil', name: 'Recoil / Knockback', frameCount: 8, description: 'Damped spring recoil oscillation' },
  { type: 'stomp', name: 'Stomp / Slam', frameCount: 8, description: 'Lift, slam impact, rebound settle' },
  { type: 'bounce', name: 'Bounce', frameCount: 8, description: 'Elastic bounce with squash/stretch coupling' },
  { type: 'spin', name: 'Spin', frameCount: 12, description: 'Continuous 360-degree rotation with wobble' },
  { type: 'shake', name: 'Shake / Hit', frameCount: 8, description: 'High-frequency damped shake response' },
  { type: 'pulse', name: 'Pulse / Glow', frameCount: 8, description: 'Scale and brightness pulse harmonics' },
  { type: 'heartbeat', name: 'Heartbeat', frameCount: 8, description: 'Double-beat profile with recovery gap' },
  { type: 'explode', name: 'Explode', frameCount: 8, description: 'Radial expansion with fade envelope' },
  { type: 'float', name: 'Float', frameCount: 10, description: 'Slow sinusoidal vertical drift and tilt' },
  { type: 'hover', name: 'Hover', frameCount: 8, description: 'Stable hover with micro motion and glow' },
  { type: 'orbit', name: 'Orbit Drift', frameCount: 10, description: 'Elliptic orbit path with tangent tilt' },
  { type: 'wobble', name: 'Wobble / Jelly', frameCount: 8, description: 'Phase-shifted rotation and scale wobble' },
  { type: 'flutter', name: 'Flutter', frameCount: 8, description: 'Fast oscillation for wings/capes' },
  { type: 'squash', name: 'Squash & Stretch', frameCount: 8, description: 'Volume-preserving deformation cycle' },
  { type: 'wave', name: 'Wave / Flag', frameCount: 8, description: 'Amplitude and frequency modulated wave' },
  { type: 'glitch', name: 'Glitch', frameCount: 8, description: 'Deterministic slice shifts and jitter' },
  { type: 'flicker', name: 'Flicker / Neon', frameCount: 8, description: 'Multi-frequency luminance flicker' },
  { type: 'melt', name: 'Melt / Drip', frameCount: 8, description: 'Progressive gravity melt with slide' },
  { type: 'rotate', name: 'Rotate 90deg', frameCount: 4, description: 'Quarter-turn rotation sequence' },
  { type: 'swing', name: 'Swing / Pendulum', frameCount: 10, description: 'Pendulum swing with weighted return' },
  { type: 'spiral', name: 'Spiral Out', frameCount: 10, description: 'Outward spiral motion with fade' },
  { type: 'teleport', name: 'Teleport', frameCount: 8, description: 'Disappear, phase shift, reappear' },
];
