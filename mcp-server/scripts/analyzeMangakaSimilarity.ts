import { MANGAKA_BATCH1_TEMPLATES } from '../src/templates/mangakaVariety.js';
import { MANGAKA_BATCH2_TEMPLATES } from '../src/templates/mangakaVariety2.js';
import { MANGAKA_BATCH3_TEMPLATES } from '../src/templates/mangakaVariety3.js';
import { MANGAKA_BATCH4_TEMPLATES } from '../src/templates/mangakaVariety4.js';
import { MANGAKA_BATCH5_TEMPLATES } from '../src/templates/mangakaVariety5.js';

type Pix = `${number},${number}`;

const all = {
  ...MANGAKA_BATCH1_TEMPLATES,
  ...MANGAKA_BATCH2_TEMPLATES,
  ...MANGAKA_BATCH3_TEMPLATES,
  ...MANGAKA_BATCH4_TEMPLATES,
  ...MANGAKA_BATCH5_TEMPLATES,
};

function toPixelSet(name: string): Set<Pix> {
  const t = (all as Record<string, any>)[name];
  const s = new Set<Pix>();
  for (const r of t.regions) {
    for (const [x, y] of r.pixels as Array<[number, number]>) {
      s.add(`${x},${y}`);
    }
  }
  return s;
}

function jaccard(a: Set<Pix>, b: Set<Pix>): number {
  let inter = 0;
  for (const k of a) {
    if (b.has(k)) inter++;
  }
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

const names = Object.keys(all);
const sets = names.map((n) => ({ n, s: toPixelSet(n) }));
const pairs: Array<{ a: string; b: string; j: number }> = [];
const exactGroups = new Map<string, string[]>();

for (const { n, s } of sets) {
  const sig = [...s].sort().join('|');
  if (!exactGroups.has(sig)) exactGroups.set(sig, []);
  exactGroups.get(sig)!.push(n);
}

const duplicateExactGroups = [...exactGroups.values()].filter((g) => g.length > 1);

for (let i = 0; i < sets.length; i++) {
  for (let j = i + 1; j < sets.length; j++) {
    const score = jaccard(sets[i].s, sets[j].s);
    if (score >= 0.75) {
      pairs.push({ a: sets[i].n, b: sets[j].n, j: score });
    }
  }
}

pairs.sort((x, y) => y.j - x.j);

console.log(`Mangaka templates: ${names.length}`);
console.log(`Exact silhouette duplicate groups: ${duplicateExactGroups.length}`);
if (duplicateExactGroups.length > 0) {
  for (const g of duplicateExactGroups.slice(0, 20)) {
    console.log(`EXACT: ${g.join(' | ')}`);
  }
}
console.log(`Highly similar pairs (Jaccard >= 0.75): ${pairs.length}`);
for (const p of pairs.slice(0, 50)) {
  console.log(`${p.a} | ${p.b} | ${p.j.toFixed(3)}`);
}
