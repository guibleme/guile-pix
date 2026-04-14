import { create } from 'zustand';

const STORAGE_KEY = 'dogsprite-player-stats-v1';

interface PlayerStats {
  level: number;
  exp: number;
  expTotal: number;
  hp: number;
  mp: number;
}

interface PlayerStatsStore extends PlayerStats {
  maxHp: () => number;
  maxMp: () => number;
  expToNext: () => number;
  addExp: (amount: number) => void;
  spendMp: (amount: number) => void;
  recoverMp: (amount: number) => void;
  damageHp: (amount: number) => void;
  healHp: (amount: number) => void;
  tick: () => void;
}

function getMaxHp(level: number): number {
  return 100 + level * 10;
}

function getMaxMp(level: number): number {
  return 50 + level * 5;
}

function getExpToNext(level: number): number {
  return level * 100;
}

function loadStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PlayerStats>;
      return {
        level: Math.max(1, parsed.level ?? 1),
        exp: Math.max(0, parsed.exp ?? 0),
        expTotal: Math.max(0, parsed.expTotal ?? 0),
        hp: Math.max(0, parsed.hp ?? getMaxHp(parsed.level ?? 1)),
        mp: Math.max(0, parsed.mp ?? getMaxMp(parsed.level ?? 1)),
      };
    }
  } catch { /* ignore */ }
  return { level: 1, exp: 0, expTotal: 0, hp: getMaxHp(1), mp: getMaxMp(1) };
}

function saveStats(state: PlayerStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      level: state.level,
      exp: state.exp,
      expTotal: state.expTotal,
      hp: state.hp,
      mp: state.mp,
    }));
  } catch { /* ignore */ }
}

export const usePlayerStatsStore = create<PlayerStatsStore>((set, get) => {
  const initial = loadStats();

  return {
    ...initial,

    maxHp: () => getMaxHp(get().level),
    maxMp: () => getMaxMp(get().level),
    expToNext: () => getExpToNext(get().level),

    addExp: (amount: number) => {
      set((state) => {
        let { level, exp, expTotal } = state;
        exp += amount;
        expTotal += amount;

        let needed = getExpToNext(level);
        while (exp >= needed) {
          exp -= needed;
          level += 1;
          needed = getExpToNext(level);
        }

        const maxHp = getMaxHp(level);
        const maxMp = getMaxMp(level);
        const next: PlayerStats = {
          level,
          exp,
          expTotal,
          hp: Math.min(state.hp + (level > state.level ? maxHp : 0), maxHp),
          mp: Math.min(state.mp + (level > state.level ? maxMp : 0), maxMp),
        };
        saveStats(next);
        return next;
      });
    },

    spendMp: (amount: number) => {
      set((state) => {
        const next = { ...state, mp: Math.max(0, state.mp - amount) };
        saveStats(next);
        return { mp: next.mp };
      });
    },

    recoverMp: (amount: number) => {
      set((state) => {
        const max = getMaxMp(state.level);
        const next = { ...state, mp: Math.min(max, state.mp + amount) };
        saveStats(next);
        return { mp: next.mp };
      });
    },

    damageHp: (amount: number) => {
      set((state) => {
        const next = { ...state, hp: Math.max(0, state.hp - amount) };
        saveStats(next);
        return { hp: next.hp };
      });
    },

    healHp: (amount: number) => {
      set((state) => {
        const max = getMaxHp(state.level);
        const next = { ...state, hp: Math.min(max, state.hp + amount) };
        saveStats(next);
        return { hp: next.hp };
      });
    },

    tick: () => {
      set((state) => {
        const maxHp = getMaxHp(state.level);
        const maxMp = getMaxMp(state.level);
        const hp = Math.min(maxHp, state.hp + 1);
        const mp = Math.min(maxMp, state.mp + 1);
        if (hp === state.hp && mp === state.mp) return state;
        const next = { ...state, hp, mp };
        saveStats(next);
        return { hp, mp };
      });
    },
  };
});
