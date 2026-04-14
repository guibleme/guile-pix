export function shiftPixels(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  dx: number,
  dy: number
): Uint8ClampedArray {
  const result = new Uint8ClampedArray(data.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sx = x - Math.round(dx);
      const sy = y - Math.round(dy);
      if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
        const di = (y * width + x) * 4;
        const si = (sy * width + sx) * 4;
        result[di] = data[si];
        result[di + 1] = data[si + 1];
        result[di + 2] = data[si + 2];
        result[di + 3] = data[si + 3];
      }
    }
  }
  return result;
}

export function mirrorPixelsH(
  data: Uint8ClampedArray,
  width: number,
  height: number
): Uint8ClampedArray {
  const result = new Uint8ClampedArray(data.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const di = (y * width + x) * 4;
      const si = (y * width + (width - 1 - x)) * 4;
      result[di] = data[si]; result[di + 1] = data[si + 1];
      result[di + 2] = data[si + 2]; result[di + 3] = data[si + 3];
    }
  }
  return result;
}

export function scalePixels(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  scaleX: number,
  scaleY: number
): Uint8ClampedArray {
  const result = new Uint8ClampedArray(data.length);
  const cx = width / 2, cy = height / 2;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sx = Math.round(cx + (x - cx) / scaleX);
      const sy = Math.round(cy + (y - cy) / scaleY);
      if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
        const di = (y * width + x) * 4;
        const si = (sy * width + sx) * 4;
        result[di] = data[si]; result[di + 1] = data[si + 1];
        result[di + 2] = data[si + 2]; result[di + 3] = data[si + 3];
      }
    }
  }
  return result;
}

// Rotate sprite around center by angle (radians)
export function rotatePixels(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  angle: number
): Uint8ClampedArray {
  const result = new Uint8ClampedArray(data.length);
  const cx = width / 2, cy = height / 2;
  const cos = Math.cos(-angle), sin = Math.sin(-angle);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const rx = cos * (x - cx) - sin * (y - cy) + cx;
      const ry = sin * (x - cx) + cos * (y - cy) + cy;
      const sx = Math.round(rx), sy = Math.round(ry);
      if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
        const di = (y * width + x) * 4;
        const si = (sy * width + sx) * 4;
        result[di] = data[si]; result[di + 1] = data[si + 1];
        result[di + 2] = data[si + 2]; result[di + 3] = data[si + 3];
      }
    }
  }
  return result;
}

// Sine wave distortion (flag/wave effect)
export function waveDistort(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  amplitude: number,
  frequency: number,
  phase: number
): Uint8ClampedArray {
  const result = new Uint8ClampedArray(data.length);
  for (let y = 0; y < height; y++) {
    const offset = Math.round(amplitude * Math.sin(frequency * y / height * Math.PI * 2 + phase));
    for (let x = 0; x < width; x++) {
      const sx = x - offset;
      if (sx >= 0 && sx < width) {
        const di = (y * width + x) * 4;
        const si = (y * width + sx) * 4;
        result[di] = data[si]; result[di + 1] = data[si + 1];
        result[di + 2] = data[si + 2]; result[di + 3] = data[si + 3];
      }
    }
  }
  return result;
}

// Explode: scatter pixels outward from center
export function explodePixels(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  intensity: number // 0 = original, 1 = fully scattered
): Uint8ClampedArray {
  const result = new Uint8ClampedArray(data.length);
  const cx = width / 2, cy = height / 2;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const si = (y * width + x) * 4;
      if (data[si + 3] === 0) continue;
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = Math.round(x + dx / dist * intensity * dist * 0.3);
      const ny = Math.round(y + dy / dist * intensity * dist * 0.3);
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const di = (ny * width + nx) * 4;
        result[di] = data[si]; result[di + 1] = data[si + 1];
        result[di + 2] = data[si + 2]; result[di + 3] = data[si + 3];
      }
    }
  }
  return result;
}

// Brightness shift
export function brightnessShift(
  data: Uint8ClampedArray,
  amount: number // -255 to 255
): Uint8ClampedArray {
  const result = new Uint8ClampedArray(data);
  for (let i = 0; i < result.length; i += 4) {
    if (result[i + 3] === 0) continue;
    result[i] = Math.max(0, Math.min(255, result[i] + amount));
    result[i + 1] = Math.max(0, Math.min(255, result[i + 1] + amount));
    result[i + 2] = Math.max(0, Math.min(255, result[i + 2] + amount));
  }
  return result;
}

// Glitch: random horizontal slice offsets
export function glitchPixels(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  seed: number,
  intensity: number
): Uint8ClampedArray {
  const result = new Uint8ClampedArray(data.length);
  // Simple deterministic PRNG
  let rng = seed;
  const rand = () => { rng = (rng * 1103515245 + 12345) & 0x7fffffff; return rng / 0x7fffffff; };

  for (let y = 0; y < height; y++) {
    const shouldGlitch = rand() < 0.3;
    const offset = shouldGlitch ? Math.round((rand() - 0.5) * width * intensity) : 0;
    for (let x = 0; x < width; x++) {
      const sx = ((x - offset) % width + width) % width;
      const di = (y * width + x) * 4;
      const si = (y * width + sx) * 4;
      result[di] = data[si]; result[di + 1] = data[si + 1];
      result[di + 2] = data[si + 2]; result[di + 3] = data[si + 3];
    }
  }
  return result;
}

// Melt: drip pixels downward
export function meltPixels(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  intensity: number // 0-1
): Uint8ClampedArray {
  const result = new Uint8ClampedArray(data.length);
  for (let x = 0; x < width; x++) {
    // Find bottom of sprite in this column
    let bottomY = -1;
    for (let y = height - 1; y >= 0; y--) {
      if (data[(y * width + x) * 4 + 3] > 0) { bottomY = y; break; }
    }
    const drip = Math.round(intensity * (height - bottomY) * 0.5);
    for (let y = 0; y < height; y++) {
      const sy = y - drip;
      if (sy >= 0 && sy < height) {
        const di = (y * width + x) * 4;
        const si = (sy * width + x) * 4;
        result[di] = data[si]; result[di + 1] = data[si + 1];
        result[di + 2] = data[si + 2]; result[di + 3] = data[si + 3];
      }
    }
  }
  return result;
}

export function lerpPixelData(
  a: Uint8ClampedArray,
  b: Uint8ClampedArray,
  t: number
): Uint8ClampedArray {
  const result = new Uint8ClampedArray(a.length);
  for (let i = 0; i < a.length; i++) {
    result[i] = Math.round(a[i] + (b[i] - a[i]) * t);
  }
  return result;
}
