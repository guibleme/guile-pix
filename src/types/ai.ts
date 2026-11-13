import type { AnimationType } from './animation';

export type AIGenerationStatus = 'idle' | 'generating' | 'preview' | 'error';

export type LightDirection = 'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';
export type AnimationFacing = 'right' | 'left';

export interface AIGenerationRequest {
  type: 'animation' | 'inbetween' | 'shading';
  animationType?: AnimationType;
  facing?: AnimationFacing;
  frameCount?: number;
  lightDirection?: LightDirection;
  sourceFrameIds?: string[];
}

export interface AIGenerationResult {
  frames: Array<{
    pixels: Uint8ClampedArray;
    width: number;
    height: number;
  }>;
  status: AIGenerationStatus;
  error?: string;
}

// --- AI assist queue (see docs/assist-box.md) ------------------------------
// Mirrors the MCP server's assistRequestSchema (mcp-server/src/assistRequests.ts).

export type AssistStatus = 'pending' | 'claimed' | 'done' | 'failed' | 'cancelled';

export type AssistPickMode = 'pin' | 'rect';

export type AssistTarget =
  | { kind: 'pin'; point: { x: number; y: number } }
  | { kind: 'rect'; rect: { x: number; y: number; w: number; h: number } }
  | { kind: 'frame' };

export interface AssistMaskRun {
  y: number;
  xStart: number;
  xEnd: number;
}

export interface AssistRequest {
  id: string;
  version: 1;
  projectId: string;
  projectName: string;
  createdAt: string;
  status: AssistStatus;
  prompt: string;
  target: AssistTarget;
  context: {
    frameId: string;
    layerId: string;
    width: number;
    height: number;
    revision: number;
  };
  mask: { runs: AssistMaskRun[] };
  claimedBy: string | null;
  note: string | null;
}

export type AssistRequestCreateInput = Omit<AssistRequest, 'id' | 'version' | 'createdAt' | 'status' | 'claimedBy' | 'note'>;
