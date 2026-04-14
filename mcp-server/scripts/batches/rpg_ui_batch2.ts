import { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'ui',
  exportNames: {
    templates: 'RPG_STATUS_32_TEMPLATES',
    schemes: 'RPG_STATUS_32_COLOR_SCHEMES',
  },
  templates: [
    // ═══════════════════════════════════════════════════
    // STAMINA BAR — Green (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 1. Stamina Bar Full (Classic) ──
    {
      id: 'stamina_bar_full_32',
      description: 'Stamina bar at 100% — green fill with metallic frame',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(B, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
        'spans(L, 12:5-26, 13:5-26)',
        'spans(D, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 2. Stamina Bar Empty ──
    {
      id: 'stamina_bar_empty_32',
      description: 'Stamina bar at 0% — empty with metallic frame',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(E, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════
    // SHIELD/ARMOR BAR — Cyan (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 3. Shield Bar Full ──
    {
      id: 'shield_bar_full_32',
      description: 'Shield/armor bar at 100% — cyan fill for damage absorption',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(B, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
        'spans(L, 12:5-26, 13:5-26)',
        'spans(D, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#6dc2ca', shadow: '#597dce', highlight: '#deeed6' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 4. Shield Bar Empty ──
    {
      id: 'shield_bar_empty_32',
      description: 'Shield/armor bar at 0% — empty',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(E, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════
    // RAGE BAR — Orange/Red (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 5. Rage Bar Full ──
    {
      id: 'rage_bar_full_32',
      description: 'Rage/fury bar at 100% — orange fill, iron frame',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(B, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
        'spans(L, 12:5-26, 13:5-26)',
        'spans(D, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#757161', shadow: '#4e4a4e', highlight: '#8595a1' },
      },
    },
    // ── 6. Rage Bar Empty ──
    {
      id: 'rage_bar_empty_32',
      description: 'Rage/fury bar at 0% — empty',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(E, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#757161', shadow: '#4e4a4e', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════
    // POISON BAR — Purple (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 7. Poison Bar Full ──
    {
      id: 'poison_bar_full_32',
      description: 'Poison/toxin bar at 100% — purple fill',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(B, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
        'spans(L, 12:5-26, 13:5-26)',
        'spans(D, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 8. Poison Bar Empty ──
    {
      id: 'poison_bar_empty_32',
      description: 'Poison/toxin bar at 0% — empty',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(E, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════
    // HUNGER BAR — Brown/Yellow (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 9. Hunger Bar Full ──
    {
      id: 'hunger_bar_full_32',
      description: 'Hunger/food bar at 100% — warm brown fill, survival RPG',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(B, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
        'spans(L, 12:5-26, 13:5-26)',
        'spans(D, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 10. Hunger Bar Empty ──
    {
      id: 'hunger_bar_empty_32',
      description: 'Hunger/food bar at 0% — empty survival style',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(E, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════
    // THIRST BAR — Light blue (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 11. Thirst Bar Full ──
    {
      id: 'thirst_bar_full_32',
      description: 'Thirst/water bar at 100% — light blue fill',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(B, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
        'spans(L, 12:5-26, 13:5-26)',
        'spans(D, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#597dce', highlight: '#deeed6' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 12. Thirst Bar Empty ──
    {
      id: 'thirst_bar_empty_32',
      description: 'Thirst/water bar at 0% — empty',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(E, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════
    // BOSS HP BAR — Wide, ornate, red (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 13. Boss HP Bar Full ──
    {
      id: 'boss_hp_bar_full_32',
      description: 'Wide boss HP bar at 100% — ornate dark iron frame with red fill',
      size: 32,
      draw: [
        // Dark iron frame (wider)
        'spans(F, 8:1-30, 23:1-30)',
        'spans(F, 9:1-2, 10:1-2, 11:1-2, 12:1-2, 13:1-2, 14:1-2, 15:1-2, 16:1-2, 17:1-2, 18:1-2, 19:1-2, 20:1-2, 21:1-2, 22:1-2)',
        'spans(F, 9:29-30, 10:29-30, 11:29-30, 12:29-30, 13:29-30, 14:29-30, 15:29-30, 16:29-30, 17:29-30, 18:29-30, 19:29-30, 20:29-30, 21:29-30, 22:29-30)',
        'spans(H, 8:2-29, 9:2)',
        'spans(S, 23:2-29, 22:30)',
        // Background
        'spans(K, 9:3-28, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28, 21:3-28, 22:3-28)',
        // Fill (FULL)
        'spans(B, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27, 21:4-27)',
        'spans(L, 10:4-27, 11:4-27, 12:4-27)',
        'spans(D, 19:4-27, 20:4-27, 21:4-27)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        accent: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
      },
    },
    // ── 14. Boss HP Bar Empty ──
    {
      id: 'boss_hp_bar_empty_32',
      description: 'Wide boss HP bar at 0% — empty dark iron frame',
      size: 32,
      draw: [
        'spans(F, 8:1-30, 23:1-30)',
        'spans(F, 9:1-2, 10:1-2, 11:1-2, 12:1-2, 13:1-2, 14:1-2, 15:1-2, 16:1-2, 17:1-2, 18:1-2, 19:1-2, 20:1-2, 21:1-2, 22:1-2)',
        'spans(F, 9:29-30, 10:29-30, 11:29-30, 12:29-30, 13:29-30, 14:29-30, 15:29-30, 16:29-30, 17:29-30, 18:29-30, 19:29-30, 20:29-30, 21:29-30, 22:29-30)',
        'spans(H, 8:2-29, 9:2)',
        'spans(S, 23:2-29, 22:30)',
        'spans(K, 9:3-28, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28, 21:3-28, 22:3-28)',
        'spans(E, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27, 21:4-27)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        accent: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },

    // ═══════════════════════════════════════════════════
    // CASTING BAR — Purple/Magenta (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 15. Casting Bar Full ──
    {
      id: 'casting_bar_full_32',
      description: 'Spell casting bar at 100% — purple fill, arcane frame',
      size: 32,
      draw: [
        'spans(F, 12:2-29, 19:2-29)',
        'spans(F, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3)',
        'spans(F, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29)',
        'spans(H, 12:3-28, 13:3)',
        'spans(S, 19:3-28, 18:29)',
        'spans(K, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27)',
        'spans(B, 14:5-26, 15:5-26, 16:5-26, 17:5-26)',
        'spans(L, 14:5-26)',
        'spans(D, 17:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#597dce', shadow: '#30346d', highlight: '#8595a1' },
        trim: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
        accent: { base: '#6dc2ca', shadow: '#597dce', highlight: '#deeed6' },
      },
    },
    // ── 16. Casting Bar Empty ──
    {
      id: 'casting_bar_empty_32',
      description: 'Spell casting bar at 0% — empty arcane frame',
      size: 32,
      draw: [
        'spans(F, 12:2-29, 19:2-29)',
        'spans(F, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3)',
        'spans(F, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29)',
        'spans(H, 12:3-28, 13:3)',
        'spans(S, 19:3-28, 18:29)',
        'spans(K, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27)',
        'spans(E, 14:5-26, 15:5-26, 16:5-26, 17:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
        accent: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },

    // ═══════════════════════════════════════════════════
    // COOLDOWN BAR — Gray (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 17. Cooldown Bar Full ──
    {
      id: 'cooldown_bar_full_32',
      description: 'Ability cooldown bar at 100% — gray fill, ready state',
      size: 32,
      draw: [
        'spans(F, 13:3-28, 18:3-28)',
        'spans(F, 14:3, 15:3, 16:3, 17:3)',
        'spans(F, 14:28, 15:28, 16:28, 17:28)',
        'spans(K, 14:4-27, 15:4-27, 16:4-27, 17:4-27)',
        'spans(B, 14:4-27, 15:4-27, 16:4-27, 17:4-27)',
        'spans(L, 14:4-27)',
        'spans(D, 17:4-27)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },
    // ── 18. Cooldown Bar Empty ──
    {
      id: 'cooldown_bar_empty_32',
      description: 'Ability cooldown bar at 0% — on cooldown, empty',
      size: 32,
      draw: [
        'spans(F, 13:3-28, 18:3-28)',
        'spans(F, 14:3, 15:3, 16:3, 17:3)',
        'spans(F, 14:28, 15:28, 16:28, 17:28)',
        'spans(K, 14:4-27, 15:4-27, 16:4-27, 17:4-27)',
        'spans(E, 14:4-27, 15:4-27, 16:4-27, 17:4-27)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },

    // ═══════════════════════════════════════════════════
    // ENERGY BAR — Yellow/Electric (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 19. Energy Bar Full ──
    {
      id: 'energy_bar_full_32',
      description: 'Energy/power bar at 100% — bright yellow fill, tech frame',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        // Segment dividers
        'pixels(F, 12,9, 13,9, 14,9, 15,9, 16,9, 17,9, 18,9, 19,9)',
        'pixels(F, 12,15, 13,15, 14,15, 15,15, 16,15, 17,15, 18,15, 19,15)',
        'pixels(F, 12,21, 13,21, 14,21, 15,21, 16,21, 17,21, 18,21, 19,21)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(B, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
        'spans(L, 12:5-26, 13:5-26)',
        'spans(D, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },
    // ── 20. Energy Bar Empty ──
    {
      id: 'energy_bar_empty_32',
      description: 'Energy/power bar at 0% — depleted, segmented frame',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'pixels(F, 12,9, 13,9, 14,9, 15,9, 16,9, 17,9, 18,9, 19,9)',
        'pixels(F, 12,15, 13,15, 14,15, 15,15, 16,15, 17,15, 18,15, 19,15)',
        'pixels(F, 12,21, 13,21, 14,21, 15,21, 16,21, 17,21, 18,21, 19,21)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(E, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },
  ],
};

export default batch;
