export type AnimationType =
  | 'idle' | 'walk' | 'run' | 'dash'
  | 'attack' | 'jump' | 'recoil' | 'stomp' | 'uppercut'
  | 'roll' | 'backstep' | 'sidestep'
  | 'parry' | 'guard' | 'charge' | 'cast'
  | 'wallslide' | 'climb' | 'crouch' | 'land'
  | 'comboRunAttack' | 'comboJumpCast' | 'comboDashUppercut'
  | 'comboParryRiposte' | 'comboRollStrike'
  | 'bounce' | 'spin' | 'shake' | 'pulse' | 'heartbeat'
  | 'explode' | 'float' | 'hover' | 'orbit' | 'wobble' | 'flutter'
  | 'squash' | 'wave' | 'glitch' | 'flicker' | 'melt'
  | 'rotate' | 'swing' | 'spiral' | 'teleport'
  | 'custom';

export interface AnimationPreset {
  type: AnimationType;
  name: string;
  frameCount: number;
  description: string;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentFrameIndex: number;
  fps: number;
  loop: boolean;
}
