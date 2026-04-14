export class ViewTransform {
  zoom: number;
  panX: number;
  panY: number;

  constructor(zoom = 8, panX = 0, panY = 0) {
    this.zoom = zoom;
    this.panX = panX;
    this.panY = panY;
  }

  screenToPixel(screenX: number, screenY: number, canvasWidth: number, canvasHeight: number, spriteWidth: number, spriteHeight: number): { x: number; y: number } {
    const offsetX = (canvasWidth - spriteWidth * this.zoom) / 2 + this.panX;
    const offsetY = (canvasHeight - spriteHeight * this.zoom) / 2 + this.panY;
    return {
      x: Math.floor((screenX - offsetX) / this.zoom),
      y: Math.floor((screenY - offsetY) / this.zoom),
    };
  }

  pixelToScreen(pixelX: number, pixelY: number, canvasWidth: number, canvasHeight: number, spriteWidth: number, spriteHeight: number): { x: number; y: number } {
    const offsetX = (canvasWidth - spriteWidth * this.zoom) / 2 + this.panX;
    const offsetY = (canvasHeight - spriteHeight * this.zoom) / 2 + this.panY;
    return {
      x: pixelX * this.zoom + offsetX,
      y: pixelY * this.zoom + offsetY,
    };
  }

  getOffset(canvasWidth: number, canvasHeight: number, spriteWidth: number, spriteHeight: number): { x: number; y: number } {
    return {
      x: (canvasWidth - spriteWidth * this.zoom) / 2 + this.panX,
      y: (canvasHeight - spriteHeight * this.zoom) / 2 + this.panY,
    };
  }
}
