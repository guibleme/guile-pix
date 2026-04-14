'use client';

import React, { useCallback } from 'react';
import type { RGBA, HSB } from '@/types/color';
import { hsbToRgba } from '@/lib/utils/color';
import GradientSlider from './GradientSlider';
import type { ColorMode } from './ColorModeTabs';

interface ColorSlidersProps {
  mode: ColorMode;
  rgba: RGBA;
  hsb: HSB;
  onChangeRgba: (rgba: RGBA) => void;
  onChangeHsb: (hsb: HSB) => void;
  onChangeAlpha: (a: number) => void;
}

function drawCheckerboard(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const size = 5;
  for (let y = 0; y < h; y += size) {
    for (let x = 0; x < w; x += size) {
      ctx.fillStyle = ((x / size + y / size) % 2 === 0) ? '#bbb' : '#888';
      ctx.fillRect(x, y, size, size);
    }
  }
}

export default function ColorSliders({
  mode,
  rgba,
  hsb,
  onChangeRgba,
  onChangeHsb,
  onChangeAlpha,
}: ColorSlidersProps) {
  const renderR = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, `rgb(0,${rgba.g},${rgba.b})`);
      grad.addColorStop(1, `rgb(255,${rgba.g},${rgba.b})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    },
    [rgba.g, rgba.b]
  );

  const renderG = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, `rgb(${rgba.r},0,${rgba.b})`);
      grad.addColorStop(1, `rgb(${rgba.r},255,${rgba.b})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    },
    [rgba.r, rgba.b]
  );

  const renderB = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, `rgb(${rgba.r},${rgba.g},0)`);
      grad.addColorStop(1, `rgb(${rgba.r},${rgba.g},255)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    },
    [rgba.r, rgba.g]
  );

  const renderH = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      for (let i = 0; i <= 6; i++) {
        const c = hsbToRgba({ h: i * 60, s: hsb.s || 100, b: hsb.b || 100 });
        grad.addColorStop(i / 6, `rgb(${c.r},${c.g},${c.b})`);
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    },
    [hsb.s, hsb.b]
  );

  const renderS = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      const c0 = hsbToRgba({ h: hsb.h, s: 0, b: hsb.b });
      const c1 = hsbToRgba({ h: hsb.h, s: 100, b: hsb.b });
      grad.addColorStop(0, `rgb(${c0.r},${c0.g},${c0.b})`);
      grad.addColorStop(1, `rgb(${c1.r},${c1.g},${c1.b})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    },
    [hsb.h, hsb.b]
  );

  const renderBr = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      const c0 = hsbToRgba({ h: hsb.h, s: hsb.s, b: 0 });
      const c1 = hsbToRgba({ h: hsb.h, s: hsb.s, b: 100 });
      grad.addColorStop(0, `rgb(${c0.r},${c0.g},${c0.b})`);
      grad.addColorStop(1, `rgb(${c1.r},${c1.g},${c1.b})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    },
    [hsb.h, hsb.s]
  );

  const renderGray = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, 'rgb(0,0,0)');
      grad.addColorStop(1, 'rgb(255,255,255)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    },
    []
  );

  const renderAlpha = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      drawCheckerboard(ctx, w, h);
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, `rgba(${rgba.r},${rgba.g},${rgba.b},0)`);
      grad.addColorStop(1, `rgba(${rgba.r},${rgba.g},${rgba.b},1)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    },
    [rgba.r, rgba.g, rgba.b]
  );

  const grayValue = Math.round(0.299 * rgba.r + 0.587 * rgba.g + 0.114 * rgba.b);

  return (
    <div className="space-y-1">
      {mode === 'RGB' && (
        <>
          <GradientSlider label="R" min={0} max={255} value={rgba.r} renderGradient={renderR} onChange={(v) => onChangeRgba({ ...rgba, r: v })} />
          <GradientSlider label="G" min={0} max={255} value={rgba.g} renderGradient={renderG} onChange={(v) => onChangeRgba({ ...rgba, g: v })} />
          <GradientSlider label="B" min={0} max={255} value={rgba.b} renderGradient={renderB} onChange={(v) => onChangeRgba({ ...rgba, b: v })} />
        </>
      )}
      {mode === 'HSB' && (
        <>
          <GradientSlider label="H" min={0} max={360} value={hsb.h} renderGradient={renderH} onChange={(v) => onChangeHsb({ ...hsb, h: v })} />
          <GradientSlider label="S" min={0} max={100} value={hsb.s} renderGradient={renderS} onChange={(v) => onChangeHsb({ ...hsb, s: v })} />
          <GradientSlider label="B" min={0} max={100} value={hsb.b} renderGradient={renderBr} onChange={(v) => onChangeHsb({ ...hsb, b: v })} />
        </>
      )}
      {mode === 'Gray' && (
        <GradientSlider
          label="V"
          min={0}
          max={255}
          value={grayValue}
          renderGradient={renderGray}
          onChange={(v) => onChangeRgba({ r: v, g: v, b: v, a: rgba.a })}
        />
      )}
      <GradientSlider label="A" min={0} max={255} value={rgba.a} renderGradient={renderAlpha} onChange={onChangeAlpha} />
    </div>
  );
}
