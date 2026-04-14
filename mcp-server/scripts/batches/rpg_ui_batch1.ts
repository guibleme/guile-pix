import { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'ui',
  exportNames: {
    templates: 'RPG_BARS_32_TEMPLATES',
    schemes: 'RPG_BARS_32_COLOR_SCHEMES',
  },
  templates: [
    // ═══════════════════════════════════════════════════
    // HP BARS — Classic style (full + empty pair)
    // ═══════════════════════════════════════════════════

    // ── 1. HP Bar Full (Classic) ──
    {
      id: 'hp_bar_classic_full_32',
      description: 'Classic RPG health bar at 100% — red fill with metallic frame',
      size: 32,
      draw: [
        // Outer frame (metal)
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        // Frame highlight (top-left)
        'spans(H, 10:3-28, 11:3)',
        // Frame shadow (bottom-right)
        'spans(S, 21:3-28, 20:29)',
        // Inner background
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        // Fill (red — FULL)
        'spans(B, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26)',
        // Fill highlight (top band)
        'spans(L, 12:5-26, 13:5-26)',
        // Fill shadow (bottom band)
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
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 2. HP Bar Empty (Classic) ──
    {
      id: 'hp_bar_classic_empty_32',
      description: 'Classic RPG health bar at 0% — empty with metallic frame',
      size: 32,
      draw: [
        // Outer frame (metal) — IDENTICAL to full
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        // Inner background — same
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        // NO fill — empty bar shows only background
        // Slight inner shadow for depth
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
    // MP BARS — Classic style (full + empty pair)
    // ═══════════════════════════════════════════════════

    // ── 3. MP Bar Full (Classic) ──
    {
      id: 'mp_bar_classic_full_32',
      description: 'Classic RPG mana bar at 100% — blue fill with metallic frame',
      size: 32,
      draw: [
        'spans(F, 10:2-29, 21:2-29)',
        'spans(F, 11:2-3, 12:2-3, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3, 19:2-3, 20:2-3)',
        'spans(F, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(H, 10:3-28, 11:3)',
        'spans(S, 21:3-28, 20:29)',
        'spans(K, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        // Fill (blue — FULL)
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
        body: { base: '#597dce', shadow: '#30346d', highlight: '#6dc2ca' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 4. MP Bar Empty (Classic) ──
    {
      id: 'mp_bar_classic_empty_32',
      description: 'Classic RPG mana bar at 0% — empty with metallic frame',
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
    // XP BAR — Classic style (full + empty pair)
    // ═══════════════════════════════════════════════════

    // ── 5. XP Bar Full (Classic) ──
    {
      id: 'xp_bar_classic_full_32',
      description: 'Classic RPG experience bar at 100% — yellow/gold fill',
      size: 32,
      draw: [
        'spans(F, 12:2-29, 19:2-29)',
        'spans(F, 13:2-3, 14:2-3, 15:2-3, 16:2-3, 17:2-3, 18:2-3)',
        'spans(F, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29)',
        'spans(H, 12:3-28, 13:3)',
        'spans(S, 19:3-28, 18:29)',
        'spans(K, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27)',
        // Fill (gold — FULL)
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
        body: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 6. XP Bar Empty (Classic) ──
    {
      id: 'xp_bar_classic_empty_32',
      description: 'Classic RPG experience bar at 0% — empty',
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
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════
    // HP BAR — Ornate / Fantasy style (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 7. HP Bar Full (Ornate) ──
    {
      id: 'hp_bar_ornate_full_32',
      description: 'Ornate gold-framed HP bar at 100% — fantasy RPG style',
      size: 32,
      draw: [
        // Gold ornate frame
        'spans(F, 9:2-29, 22:2-29)',
        'spans(F, 10:1-3, 11:1-2, 12:1-2, 13:1-2, 14:1-2, 15:1-2, 16:1-2, 17:1-2, 18:1-2, 19:1-2, 20:1-2, 21:1-3)',
        'spans(F, 10:28-30, 11:29-30, 12:29-30, 13:29-30, 14:29-30, 15:29-30, 16:29-30, 17:29-30, 18:29-30, 19:29-30, 20:29-30, 21:28-30)',
        // Frame highlight
        'spans(H, 9:3-28, 10:2-3)',
        // Frame shadow
        'spans(S, 22:3-28, 21:29-30)',
        // Background
        'spans(K, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28, 21:3-28)',
        // Fill (red — FULL)
        'spans(B, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(L, 11:4-27, 12:4-27, 13:4-27)',
        'spans(D, 18:4-27, 19:4-27, 20:4-27)',
      ],
      chars: {
        F: { name: 'frame', role: 'accent' },
        H: { name: 'frame', role: 'accent', tone: 'highlight' },
        S: { name: 'frame', role: 'accent', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
      },
    },
    // ── 8. HP Bar Empty (Ornate) ──
    {
      id: 'hp_bar_ornate_empty_32',
      description: 'Ornate gold-framed HP bar at 0% — empty fantasy style',
      size: 32,
      draw: [
        'spans(F, 9:2-29, 22:2-29)',
        'spans(F, 10:1-3, 11:1-2, 12:1-2, 13:1-2, 14:1-2, 15:1-2, 16:1-2, 17:1-2, 18:1-2, 19:1-2, 20:1-2, 21:1-3)',
        'spans(F, 10:28-30, 11:29-30, 12:29-30, 13:29-30, 14:29-30, 15:29-30, 16:29-30, 17:29-30, 18:29-30, 19:29-30, 20:29-30, 21:28-30)',
        'spans(H, 9:3-28, 10:2-3)',
        'spans(S, 22:3-28, 21:29-30)',
        'spans(K, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28, 21:3-28)',
        'spans(E, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
      ],
      chars: {
        F: { name: 'frame', role: 'accent' },
        H: { name: 'frame', role: 'accent', tone: 'highlight' },
        S: { name: 'frame', role: 'accent', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════
    // MP BAR — Ornate / Fantasy style (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 9. MP Bar Full (Ornate) ──
    {
      id: 'mp_bar_ornate_full_32',
      description: 'Ornate gold-framed MP bar at 100% — blue fill',
      size: 32,
      draw: [
        'spans(F, 9:2-29, 22:2-29)',
        'spans(F, 10:1-3, 11:1-2, 12:1-2, 13:1-2, 14:1-2, 15:1-2, 16:1-2, 17:1-2, 18:1-2, 19:1-2, 20:1-2, 21:1-3)',
        'spans(F, 10:28-30, 11:29-30, 12:29-30, 13:29-30, 14:29-30, 15:29-30, 16:29-30, 17:29-30, 18:29-30, 19:29-30, 20:29-30, 21:28-30)',
        'spans(H, 9:3-28, 10:2-3)',
        'spans(S, 22:3-28, 21:29-30)',
        'spans(K, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28, 21:3-28)',
        'spans(B, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        'spans(L, 11:4-27, 12:4-27, 13:4-27)',
        'spans(D, 18:4-27, 19:4-27, 20:4-27)',
      ],
      chars: {
        F: { name: 'frame', role: 'accent' },
        H: { name: 'frame', role: 'accent', tone: 'highlight' },
        S: { name: 'frame', role: 'accent', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#597dce', shadow: '#30346d', highlight: '#6dc2ca' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
      },
    },
    // ── 10. MP Bar Empty (Ornate) ──
    {
      id: 'mp_bar_ornate_empty_32',
      description: 'Ornate gold-framed MP bar at 0% — empty',
      size: 32,
      draw: [
        'spans(F, 9:2-29, 22:2-29)',
        'spans(F, 10:1-3, 11:1-2, 12:1-2, 13:1-2, 14:1-2, 15:1-2, 16:1-2, 17:1-2, 18:1-2, 19:1-2, 20:1-2, 21:1-3)',
        'spans(F, 10:28-30, 11:29-30, 12:29-30, 13:29-30, 14:29-30, 15:29-30, 16:29-30, 17:29-30, 18:29-30, 19:29-30, 20:29-30, 21:28-30)',
        'spans(H, 9:3-28, 10:2-3)',
        'spans(S, 22:3-28, 21:29-30)',
        'spans(K, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28, 21:3-28)',
        'spans(E, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
      ],
      chars: {
        F: { name: 'frame', role: 'accent' },
        H: { name: 'frame', role: 'accent', tone: 'highlight' },
        S: { name: 'frame', role: 'accent', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════
    // HP BAR — Minimal / Modern style (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 11. HP Bar Full (Minimal) ──
    {
      id: 'hp_bar_minimal_full_32',
      description: 'Minimal thin HP bar at 100% — clean modern RPG style',
      size: 32,
      draw: [
        // Thin frame
        'spans(F, 13:3-28, 18:3-28)',
        'spans(F, 14:3, 15:3, 16:3, 17:3)',
        'spans(F, 14:28, 15:28, 16:28, 17:28)',
        // Background
        'spans(K, 14:4-27, 15:4-27, 16:4-27, 17:4-27)',
        // Fill (FULL)
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
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },
    // ── 12. HP Bar Empty (Minimal) ──
    {
      id: 'hp_bar_minimal_empty_32',
      description: 'Minimal thin HP bar at 0% — empty modern style',
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
    // MP BAR — Minimal (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 13. MP Bar Full (Minimal) ──
    {
      id: 'mp_bar_minimal_full_32',
      description: 'Minimal thin MP bar at 100% — blue fill',
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
        body: { base: '#597dce', shadow: '#30346d', highlight: '#6dc2ca' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },
    // ── 14. MP Bar Empty (Minimal) ──
    {
      id: 'mp_bar_minimal_empty_32',
      description: 'Minimal thin MP bar at 0% — empty',
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
    // XP BAR — Ornate (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 15. XP Bar Full (Ornate) ──
    {
      id: 'xp_bar_ornate_full_32',
      description: 'Ornate gold-framed XP bar at 100% — golden fill',
      size: 32,
      draw: [
        'spans(F, 11:2-29, 20:2-29)',
        'spans(F, 12:1-2, 13:1-2, 14:1-2, 15:1-2, 16:1-2, 17:1-2, 18:1-2, 19:1-2)',
        'spans(F, 12:29-30, 13:29-30, 14:29-30, 15:29-30, 16:29-30, 17:29-30, 18:29-30, 19:29-30)',
        'spans(H, 11:3-28, 12:2)',
        'spans(S, 20:3-28, 19:30)',
        'spans(K, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28)',
        'spans(B, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27)',
        'spans(L, 13:4-27, 14:4-27)',
        'spans(D, 17:4-27, 18:4-27)',
      ],
      chars: {
        F: { name: 'frame', role: 'accent' },
        H: { name: 'frame', role: 'accent', tone: 'highlight' },
        S: { name: 'frame', role: 'accent', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        B: { name: 'fill', role: 'body' },
        L: { name: 'fill', role: 'body', tone: 'highlight' },
        D: { name: 'fill', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
      },
    },
    // ── 16. XP Bar Empty (Ornate) ──
    {
      id: 'xp_bar_ornate_empty_32',
      description: 'Ornate gold-framed XP bar at 0% — empty',
      size: 32,
      draw: [
        'spans(F, 11:2-29, 20:2-29)',
        'spans(F, 12:1-2, 13:1-2, 14:1-2, 15:1-2, 16:1-2, 17:1-2, 18:1-2, 19:1-2)',
        'spans(F, 12:29-30, 13:29-30, 14:29-30, 15:29-30, 16:29-30, 17:29-30, 18:29-30, 19:29-30)',
        'spans(H, 11:3-28, 12:2)',
        'spans(S, 20:3-28, 19:30)',
        'spans(K, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28)',
        'spans(E, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27)',
      ],
      chars: {
        F: { name: 'frame', role: 'accent' },
        H: { name: 'frame', role: 'accent', tone: 'highlight' },
        S: { name: 'frame', role: 'accent', tone: 'shadow' },
        K: { name: 'background', role: 'body', tone: 'shadow' },
        E: { name: 'empty', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════
    // XP BAR — Minimal (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 17. XP Bar Full (Minimal) ──
    {
      id: 'xp_bar_minimal_full_32',
      description: 'Minimal thin XP bar at 100% — gold fill',
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
        body: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },
    // ── 18. XP Bar Empty (Minimal) ──
    {
      id: 'xp_bar_minimal_empty_32',
      description: 'Minimal thin XP bar at 0% — empty',
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
    // HP BAR — Pointed/Chevron style (full + empty)
    // ═══════════════════════════════════════════════════

    // ── 19. HP Bar Full (Pointed) ──
    {
      id: 'hp_bar_pointed_full_32',
      description: 'Chevron-pointed HP bar at 100% — action RPG style',
      size: 32,
      draw: [
        // Pointed frame (chevron shape on right end)
        'spans(F, 11:2-26, 20:2-26)',
        'spans(F, 12:2, 13:2, 14:2, 15:2, 16:2, 17:2, 18:2, 19:2)',
        // Right chevron point
        'spans(F, 11:26-27, 12:27-28, 13:28-29, 14:29-30, 15:30-31, 16:29-30, 17:28-29, 18:27-28, 19:26-27, 20:26-27)',
        // Left rounded cap
        'pixels(F, 11,1, 20,1)',
        'spans(H, 11:2-25, 12:2)',
        'spans(S, 20:2-25)',
        'spans(K, 12:3-27, 13:3-28, 14:3-29, 15:3-30, 16:3-29, 17:3-28, 18:3-27, 19:3-26)',
        // Fill (FULL)
        'spans(B, 12:3-27, 13:3-28, 14:3-29, 15:3-30, 16:3-29, 17:3-28, 18:3-27, 19:3-26)',
        'spans(L, 12:3-27, 13:3-28)',
        'spans(D, 18:3-27, 19:3-26)',
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
        trim: { base: '#757161', shadow: '#4e4a4e', highlight: '#8595a1' },
      },
    },
    // ── 20. HP Bar Empty (Pointed) ──
    {
      id: 'hp_bar_pointed_empty_32',
      description: 'Chevron-pointed HP bar at 0% — empty action style',
      size: 32,
      draw: [
        'spans(F, 11:2-26, 20:2-26)',
        'spans(F, 12:2, 13:2, 14:2, 15:2, 16:2, 17:2, 18:2, 19:2)',
        'spans(F, 11:26-27, 12:27-28, 13:28-29, 14:29-30, 15:30-31, 16:29-30, 17:28-29, 18:27-28, 19:26-27, 20:26-27)',
        'pixels(F, 11,1, 20,1)',
        'spans(H, 11:2-25, 12:2)',
        'spans(S, 20:2-25)',
        'spans(K, 12:3-27, 13:3-28, 14:3-29, 15:3-30, 16:3-29, 17:3-28, 18:3-27, 19:3-26)',
        'spans(E, 12:3-27, 13:3-28, 14:3-29, 15:3-30, 16:3-29, 17:3-28, 18:3-27, 19:3-26)',
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
  ],
};

export default batch;
