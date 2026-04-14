export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number; // 0-1
  blendMode: BlendMode;
}

export type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay';
