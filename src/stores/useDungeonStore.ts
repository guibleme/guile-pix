'use client';

import { create } from 'zustand';
import { usePlayerStatsStore } from './usePlayerStatsStore';

// ─── Monster Definitions ─────────────────────────────────────

interface MonsterDef {
  id: string;       // template name from dungeon-creatures-32
  name: string;
  hp: number;
  power: number;
  xp: number;
  gold: number;
  isBoss?: boolean;
}

const TIER_1: MonsterDef[] = [
  { id: 'green_slime_32', name: 'Green Slime', hp: 20, power: 2, xp: 8, gold: 3 },
  { id: 'dungeon_bat_32', name: 'Dungeon Bat', hp: 15, power: 3, xp: 10, gold: 4 },
  { id: 'giant_spider_32', name: 'Giant Spider', hp: 25, power: 3, xp: 12, gold: 5 },
  { id: 'cave_beetle_32', name: 'Cave Beetle', hp: 22, power: 2, xp: 9, gold: 3 },
  { id: 'cave_moth_32', name: 'Cave Moth', hp: 12, power: 2, xp: 7, gold: 2 },
  { id: 'poison_mushroom_32', name: 'Poison Mushroom', hp: 18, power: 3, xp: 10, gold: 4 },
];

const TIER_2: MonsterDef[] = [
  { id: 'fire_slime_32', name: 'Fire Slime', hp: 35, power: 5, xp: 18, gold: 8 },
  { id: 'floating_skull_32', name: 'Floating Skull', hp: 30, power: 6, xp: 20, gold: 9 },
  { id: 'evil_eye_32', name: 'Evil Eye', hp: 28, power: 7, xp: 22, gold: 10 },
  { id: 'bone_serpent_32', name: 'Bone Serpent', hp: 40, power: 5, xp: 20, gold: 8 },
  { id: 'cave_snake_32', name: 'Cave Snake', hp: 32, power: 6, xp: 18, gold: 7 },
  { id: 'silk_spider_32', name: 'Silk Spider', hp: 34, power: 5, xp: 19, gold: 8 },
];

const TIER_3: MonsterDef[] = [
  { id: 'fire_elemental_32', name: 'Fire Elemental', hp: 55, power: 8, xp: 30, gold: 15 },
  { id: 'shadow_elemental_32', name: 'Shadow Elemental', hp: 50, power: 9, xp: 35, gold: 16 },
  { id: 'ice_elemental_32', name: 'Ice Elemental', hp: 52, power: 8, xp: 32, gold: 14 },
  { id: 'death_worm_32', name: 'Death Worm', hp: 60, power: 7, xp: 28, gold: 13 },
  { id: 'living_crystal_32', name: 'Living Crystal', hp: 65, power: 6, xp: 25, gold: 12 },
  { id: 'arcane_orb_32', name: 'Arcane Orb', hp: 45, power: 10, xp: 35, gold: 18 },
];

const BOSSES: MonsterDef[] = [
  { id: 'king_slime_32', name: 'King Slime', hp: 80, power: 8, xp: 60, gold: 40, isBoss: true },
  { id: 'mimic_chest_32', name: 'Mimic Chest', hp: 90, power: 10, xp: 70, gold: 50, isBoss: true },
  { id: 'phantom_eye_32', name: 'Phantom Eye', hp: 100, power: 12, xp: 80, gold: 60, isBoss: true },
];

const ALL_TIERS = [TIER_1, TIER_2, TIER_3];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─── Infinite progression scaling ────────────────────────────
// Exponential growth: stats double roughly every 10 floors
function floorScale(floor: number): number {
  return Math.pow(1.08, floor - 1);
}

function getMonsterForFloor(floor: number, killsOnFloor: number): MonsterDef {
  const scale = floorScale(floor);

  // Boss every 5th kill on the floor
  if (killsOnFloor === 4) {
    const boss = pickRandom(BOSSES);
    return {
      ...boss,
      hp: Math.round(boss.hp * scale * 1.2),
      power: Math.round(boss.power * scale * 1.1),
      xp: Math.round(boss.xp * scale),
      gold: Math.round(boss.gold * scale),
      isBoss: true,
    };
  }

  // Pick from tier based on floor, cycling through all tiers
  const tierIndex = Math.min(Math.floor((floor - 1) / 2), ALL_TIERS.length - 1);
  const pool = ALL_TIERS[tierIndex];
  const base = pickRandom(pool);
  return {
    ...base,
    hp: Math.round(base.hp * scale),
    power: Math.round(base.power * scale),
    xp: Math.round(base.xp * scale),
    gold: Math.round(base.gold * scale),
  };
}

// ─── Combat math ─────────────────────────────────────────────
function calcPlayerDamage(level: number, soulPower: number): { damage: number; crit: boolean } {
  const base = 3 + level * 2;
  const variance = Math.max(1, Math.floor(base * 0.25));
  let damage = randRange(base - variance, base + variance);
  const crit = Math.random() < 0.12; // 12% crit chance
  if (crit) damage = Math.round(damage * 1.8);
  damage = Math.round(damage * (1 + soulPower));
  return { damage, crit };
}

function calcEnemyDamage(power: number): number {
  const variance = Math.max(1, Math.floor(power * 0.2));
  return randRange(Math.max(1, power - variance), power + variance);
}

function potionCost(floor: number): number {
  return 20 + Math.floor((floor - 1) / 3) * 10;
}

function potionHeal(floor: number): number {
  return 30 + Math.floor((floor - 1) / 2) * 5;
}

// ─── Store ────────────────────────────────────────────────────

const STORAGE_KEY = 'dogsprite-dungeon-v2';
const SPRITE_STORAGE_KEY = 'dogsprite-dungeon-player-sprite';

interface DungeonPersist {
  floor: number;
  killsOnFloor: number;
  totalKills: number;
  totalGold: number;
  highestFloor: number;
  soulPower: number;
}

interface PlayerSpritePersist {
  dataUrl: string;
  width: number;
  height: number;
}

interface DungeonState {
  active: boolean;
  floor: number;
  killsOnFloor: number;
  totalKills: number;
  totalGold: number;
  highestFloor: number;
  soulPower: number;
  streak: number;

  enemyDef: MonsterDef | null;
  enemyHp: number;
  enemyMaxHp: number;

  log: string[];
  gameOver: boolean;

  playerSpriteDataUrl: string | null;
  playerSpriteWidth: number;
  playerSpriteHeight: number;
}

interface DungeonActions {
  openGame: () => void;
  closeGame: () => void;
  attack: () => void;
  onStrokeComplete: () => void;
  usePotion: () => void;
  spawnNextMonster: () => void;
  restart: () => void;
  setPlayerSprite: (dataUrl: string, w: number, h: number) => void;
  clearPlayerSprite: () => void;
  getPotionCost: () => number;
  getPotionHeal: () => number;
}

function loadPersist(): DungeonPersist {
  try {
    // Try v2 first, fall back to v1
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) raw = localStorage.getItem('dogsprite-dungeon-v1');
    if (raw) {
      const p = JSON.parse(raw) as Partial<DungeonPersist>;
      return {
        floor: Math.max(1, p.floor ?? 1),
        killsOnFloor: Math.max(0, p.killsOnFloor ?? 0),
        totalKills: Math.max(0, p.totalKills ?? 0),
        totalGold: Math.max(0, p.totalGold ?? 0),
        highestFloor: Math.max(1, p.highestFloor ?? p.floor ?? 1),
        soulPower: Math.max(0, p.soulPower ?? 0),
      };
    }
  } catch { /* ignore */ }
  return { floor: 1, killsOnFloor: 0, totalKills: 0, totalGold: 0, highestFloor: 1, soulPower: 0 };
}

function savePersist(s: DungeonPersist): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch { /* ignore */ }
}

function loadPlayerSprite(): PlayerSpritePersist | null {
  try {
    const raw = localStorage.getItem(SPRITE_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as PlayerSpritePersist;
  } catch { /* ignore */ }
  return null;
}

function savePlayerSprite(sprite: PlayerSpritePersist | null): void {
  try {
    if (sprite) {
      localStorage.setItem(SPRITE_STORAGE_KEY, JSON.stringify(sprite));
    } else {
      localStorage.removeItem(SPRITE_STORAGE_KEY);
    }
  } catch { /* ignore */ }
}

function addLog(log: string[], msg: string): string[] {
  const next = [...log, msg];
  if (next.length > 10) next.splice(0, next.length - 10);
  return next;
}

export const useDungeonStore = create<DungeonState & DungeonActions>((set, get) => {
  const persist = loadPersist();
  const savedSprite = loadPlayerSprite();

  return {
    active: false,
    ...persist,
    streak: 0,
    enemyDef: null,
    enemyHp: 0,
    enemyMaxHp: 0,
    log: [],
    gameOver: false,
    playerSpriteDataUrl: savedSprite?.dataUrl ?? null,
    playerSpriteWidth: savedSprite?.width ?? 0,
    playerSpriteHeight: savedSprite?.height ?? 0,

    openGame: () => {
      const s = get();
      if (s.active) return;
      set({ active: true });
      if (!s.enemyDef) get().spawnNextMonster();
    },

    closeGame: () => set({ active: false }),

    spawnNextMonster: () => {
      const s = get();
      const monster = getMonsterForFloor(s.floor, s.killsOnFloor);
      const label = monster.isBoss ? `BOSS: ${monster.name} appears!` : `A ${monster.name} appears!`;
      set({
        enemyDef: monster,
        enemyHp: monster.hp,
        enemyMaxHp: monster.hp,
        log: addLog(s.log, label),
      });
    },

    attack: () => {
      const s = get();
      if (!s.active || s.gameOver || !s.enemyDef) return;

      const player = usePlayerStatsStore.getState();
      const { damage: playerDmg, crit } = calcPlayerDamage(player.level, s.soulPower);
      const newEnemyHp = Math.max(0, s.enemyHp - playerDmg);
      const critTag = crit ? ' CRIT!' : '';
      let log = addLog(s.log, `Hit ${s.enemyDef.name} for ${playerDmg}!${critTag}`);

      if (newEnemyHp <= 0) {
        // Enemy killed — streak + rewards
        let streak = s.streak + 1;
        const streakMul = Math.min(3, 1 + streak * 0.1);

        let xpGain = s.enemyDef.xp;
        let goldGain = s.enemyDef.gold;

        // Random loot drops (check in order)
        const roll = Math.random();
        if (roll < 0.08) {
          goldGain *= 2;
          log = addLog(log, '★ Lucky Drop! Double gold!');
        } else if (roll < 0.16) {
          xpGain = Math.round(xpGain * 1.5);
          log = addLog(log, '★ Bonus XP! +50%!');
        } else if (roll < 0.22) {
          const healAmt = Math.round(player.maxHp() * 0.15);
          player.healHp(healAmt);
          log = addLog(log, `★ Life Steal! +${healAmt} HP!`);
        }

        // Apply streak multiplier to gold/XP
        goldGain = Math.round(goldGain * streakMul);
        xpGain = Math.round(xpGain * streakMul);

        player.addExp(xpGain);

        let { floor, killsOnFloor, totalKills, totalGold, highestFloor, soulPower } = s;
        totalKills += 1;
        totalGold += goldGain;
        killsOnFloor += 1;

        const streakTag = streakMul > 1 ? ` (x${streak})` : '';
        log = addLog(log, `Defeated! +${xpGain}XP +${goldGain}g${streakTag}`);

        // Streak milestones
        if (streak === 3 || streak === 5 || streak === 10 || streak === 15 || streak === 20) {
          log = addLog(log, `🔥 ${streak} kill streak!`);
        }

        // Floor advance
        if (killsOnFloor >= 5) {
          floor += 1;
          killsOnFloor = 0;
          highestFloor = Math.max(highestFloor, floor);
          // Floor clear heal: 25% max HP
          const floorHeal = Math.round(player.maxHp() * 0.25);
          player.healHp(floorHeal);
          log = addLog(log, `--- Floor ${floor} --- +${floorHeal} HP`);
        }

        savePersist({ floor, killsOnFloor, totalKills, totalGold, highestFloor, soulPower });

        const next = getMonsterForFloor(floor, killsOnFloor);
        const nextLabel = next.isBoss ? `BOSS: ${next.name}!` : `A ${next.name} appears!`;
        set({
          floor,
          killsOnFloor,
          totalKills,
          totalGold,
          highestFloor,
          streak,
          enemyDef: next,
          enemyHp: next.hp,
          enemyMaxHp: next.hp,
          log: addLog(log, nextLabel),
        });
        return;
      }

      // Enemy attacks back
      const enemyDmg = calcEnemyDamage(s.enemyDef.power);
      player.damageHp(enemyDmg);
      log = addLog(log, `${s.enemyDef.name} hits you for ${enemyDmg}!`);

      const currentHp = usePlayerStatsStore.getState().hp;
      if (currentHp <= 0) {
        set({
          enemyHp: newEnemyHp,
          log: addLog(log, 'You have been defeated...'),
          gameOver: true,
          streak: 0,
        });
        return;
      }

      set({ enemyHp: newEnemyHp, log });
    },

    onStrokeComplete: () => {
      const s = get();
      if (s.active && !s.gameOver) {
        get().attack();
      }
    },

    usePotion: () => {
      const s = get();
      const cost = potionCost(s.floor);
      if (s.totalGold < cost) return;
      const player = usePlayerStatsStore.getState();
      const maxHp = player.maxHp();
      if (player.hp >= maxHp) return;

      const heal = potionHeal(s.floor);
      player.healHp(heal);
      set({
        totalGold: s.totalGold - cost,
        streak: 0,
        log: addLog(s.log, `Potion! +${heal} HP (-${cost}g) — streak reset`),
      });
      savePersist({ ...s, totalGold: s.totalGold - cost });
    },

    restart: () => {
      const player = usePlayerStatsStore.getState();
      player.healHp(player.maxHp());

      const s = get();
      // Prestige: gain soul power based on highest floor reached this run
      const gained = Math.round(s.floor * 0.02 * 100) / 100;
      const newSoulPower = Math.round((s.soulPower + gained) * 100) / 100;

      const persist: DungeonPersist = {
        floor: 1,
        killsOnFloor: 0,
        totalKills: s.totalKills,
        totalGold: s.totalGold,
        highestFloor: s.highestFloor,
        soulPower: newSoulPower,
      };
      savePersist(persist);

      const monster = getMonsterForFloor(1, 0);
      const soulMsg = gained > 0 ? `Soul Power +${Math.round(gained * 100)}%! (Total: +${Math.round(newSoulPower * 100)}%)` : '';
      const startLog = [`Restarting from Floor 1...`];
      if (soulMsg) startLog.push(soulMsg);
      startLog.push(`A ${monster.name} appears!`);

      set({
        ...persist,
        streak: 0,
        enemyDef: monster,
        enemyHp: monster.hp,
        enemyMaxHp: monster.hp,
        log: startLog,
        gameOver: false,
      });
    },

    setPlayerSprite: (dataUrl: string, w: number, h: number) => {
      savePlayerSprite({ dataUrl, width: w, height: h });
      set({ playerSpriteDataUrl: dataUrl, playerSpriteWidth: w, playerSpriteHeight: h });
    },

    clearPlayerSprite: () => {
      savePlayerSprite(null);
      set({ playerSpriteDataUrl: null, playerSpriteWidth: 0, playerSpriteHeight: 0 });
    },

    getPotionCost: () => potionCost(get().floor),
    getPotionHeal: () => potionHeal(get().floor),
  };
});
