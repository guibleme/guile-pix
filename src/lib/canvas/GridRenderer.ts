import { GRID_COLOR_DARK, GRID_COLOR_LIGHT, GRID_MIN_ZOOM, TILE_GRID_COLOR_DARK, TILE_GRID_COLOR_LIGHT } from '@/constants/canvas';

export interface TileGridOptions {
  tileWidth: number;
  tileHeight: number;
  offsetX: number;
  offsetY: number;
}

export class GridRenderer {
  draw(
    ctx: CanvasRenderingContext2D,
    spriteWidth: number,
    spriteHeight: number,
    zoom: number,
    offsetX: number,
    offsetY: number,
    showPixelGrid: boolean,
    tileGrid?: TileGridOptions
  ): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const theme = typeof document !== 'undefined'
      ? document.documentElement.getAttribute('data-theme')
      : 'dark';

    // Pixel grid (only at high zoom, only when enabled)
    if (showPixelGrid && zoom >= GRID_MIN_ZOOM) {
      ctx.strokeStyle = theme === 'light' ? GRID_COLOR_LIGHT : GRID_COLOR_DARK;
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x <= spriteWidth; x++) {
        const sx = Math.round(offsetX + x * zoom) + 0.5;
        ctx.moveTo(sx, offsetY);
        ctx.lineTo(sx, offsetY + spriteHeight * zoom);
      }
      for (let y = 0; y <= spriteHeight; y++) {
        const sy = Math.round(offsetY + y * zoom) + 0.5;
        ctx.moveTo(offsetX, sy);
        ctx.lineTo(offsetX + spriteWidth * zoom, sy);
      }
      ctx.stroke();
    }

    // Tile grid (always visible when enabled, thicker lines)
    if (tileGrid) {
      const { tileWidth, tileHeight, offsetX: tileOx, offsetY: tileOy } = tileGrid;
      ctx.strokeStyle = theme === 'light' ? TILE_GRID_COLOR_LIGHT : TILE_GRID_COLOR_DARK;
      ctx.lineWidth = zoom >= 4 ? 2 : 1;

      ctx.beginPath();
      // Vertical tile lines
      const startX = tileOx % tileWidth;
      for (let x = startX; x <= spriteWidth; x += tileWidth) {
        if (x < 0) continue;
        const sx = Math.round(offsetX + x * zoom) + 0.5;
        ctx.moveTo(sx, offsetY);
        ctx.lineTo(sx, offsetY + spriteHeight * zoom);
      }
      // Horizontal tile lines
      const startY = tileOy % tileHeight;
      for (let y = startY; y <= spriteHeight; y += tileHeight) {
        if (y < 0) continue;
        const sy = Math.round(offsetY + y * zoom) + 0.5;
        ctx.moveTo(offsetX, sy);
        ctx.lineTo(offsetX + spriteWidth * zoom, sy);
      }
      ctx.stroke();
    }
  }

  clear(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
