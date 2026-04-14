export interface Frame {
  id: string;
  index: number;
  duration: number; // ms per frame
  layerData: Record<string, Uint8ClampedArray>; // layerId -> pixel data
}

export interface FrameRef {
  frameId: string;
  layerId: string;
}
