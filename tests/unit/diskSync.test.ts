import { describe, expect, it } from 'vitest';
import { hasRemoteChange } from '@/lib/diskSync/sidecarClient';

describe('hasRemoteChange', () => {
  it('treats a first sighting as a change', () => {
    expect(hasRemoteChange(undefined, { revision: 0, sha256: 'abc' })).toBe(true);
  });

  it('reports no change when revision and hash match', () => {
    expect(hasRemoteChange(
      { revision: 2, sha256: 'abc' },
      { revision: 2, sha256: 'abc' },
    )).toBe(false);
  });

  it('reports a change when the revision moves', () => {
    expect(hasRemoteChange(
      { revision: 2, sha256: 'abc' },
      { revision: 3, sha256: 'abc' },
    )).toBe(true);
  });

  it('reports a change when only the content hash moves (same-revision edit)', () => {
    expect(hasRemoteChange(
      { revision: 2, sha256: 'abc' },
      { revision: 2, sha256: 'def' },
    )).toBe(true);
  });
});
