export function ticksToDurationsMs(ticks: number[], fps: number): number[] {
  if (!Number.isFinite(fps) || fps <= 0 || ticks.length < 1 || ticks.some((tick) => !Number.isInteger(tick) || tick < 1)) {
    throw new Error('Ticks must be positive integers and fps must be positive');
  }
  let cumulative = 0;
  const boundaries = [0];
  for (const tick of ticks) {
    cumulative += tick;
    boundaries.push(Math.round(cumulative * 1000 / fps));
  }
  const durations = ticks.map((_, index) => boundaries[index + 1] - boundaries[index]);
  if (durations.some((duration) => duration < 1)) throw new Error('Tick exposures resolve below one millisecond');
  return durations;
}
