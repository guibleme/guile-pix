import { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'ui',
  exportNames: {
    templates: 'RPG_HUD_32_TEMPLATES',
    schemes: 'RPG_HUD_32_COLOR_SCHEMES',
  },
  templates: [
    // ═══════════════════════════════════════════════════
    // HEALTH/MANA ORBS — Full + Empty pairs
    // ═══════════════════════════════════════════════════

    // ── 1. Health Orb Full ──
    {
      id: 'rpg_health_orb_full_32',
      description: 'Diablo-style health orb at 100% — glowing red sphere in stone frame',
      size: 32,
      draw: [
        // Stone frame (outer ring)
        'spans(F, 6:12-19, 7:10-11, 7:20-21, 8:9-10, 8:21-22, 9:8-9, 9:22-23, 10:7-8, 10:23-24, 11:7-8, 11:23-24)',
        'spans(F, 12:7-8, 12:23-24, 13:7-8, 13:23-24, 14:7-8, 14:23-24, 15:7-8, 15:23-24, 16:7-8, 16:23-24, 17:7-8, 17:23-24, 18:7-8, 18:23-24)',
        'spans(F, 19:7-8, 19:23-24, 20:7-8, 20:23-24, 21:8-9, 21:22-23, 22:9-10, 22:21-22, 23:10-11, 23:20-21, 24:12-19)',
        // Frame highlight
        'spans(H, 6:12-15, 7:10-11, 8:9-10, 9:8-9)',
        // Fill (red liquid)
        'spans(B, 9:10-21, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:10-21, 22:11-20, 23:12-19)',
        // Fill highlight (specular)
        'spans(L, 10:11-14, 11:10-13, 12:10-12)',
        // Fill shadow (bottom curve)
        'spans(D, 21:16-21, 22:14-20, 23:14-19)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        B: { name: 'liquid', role: 'body' },
        L: { name: 'liquid', role: 'body', tone: 'highlight' },
        D: { name: 'liquid', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#757161', shadow: '#4e4a4e', highlight: '#8595a1' },
      },
    },

    // ── 2. Health Orb Empty ──
    {
      id: 'rpg_health_orb_empty_32',
      description: 'Diablo-style health orb at 0% — dark empty sphere in stone frame',
      size: 32,
      draw: [
        // Stone frame (identical to full)
        'spans(F, 6:12-19, 7:10-11, 7:20-21, 8:9-10, 8:21-22, 9:8-9, 9:22-23, 10:7-8, 10:23-24, 11:7-8, 11:23-24)',
        'spans(F, 12:7-8, 12:23-24, 13:7-8, 13:23-24, 14:7-8, 14:23-24, 15:7-8, 15:23-24, 16:7-8, 16:23-24, 17:7-8, 17:23-24, 18:7-8, 18:23-24)',
        'spans(F, 19:7-8, 19:23-24, 20:7-8, 20:23-24, 21:8-9, 21:22-23, 22:9-10, 22:21-22, 23:10-11, 23:20-21, 24:12-19)',
        // Frame highlight
        'spans(H, 6:12-15, 7:10-11, 8:9-10, 9:8-9)',
        // Empty interior (dark)
        'spans(K, 9:10-21, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:10-21, 22:11-20, 23:12-19)',
        // Subtle glass highlight
        'spans(G, 10:11-13, 11:10-12)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        K: { name: 'empty', role: 'body', tone: 'shadow' },
        G: { name: 'glass', role: 'accent' },
      },
      colors: {
        body: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        trim: { base: '#757161', shadow: '#4e4a4e', highlight: '#8595a1' },
        accent: { base: '#442434', shadow: '#140c1c', highlight: '#4e4a4e' },
      },
    },

    // ── 3. Mana Orb Full ──
    {
      id: 'rpg_mana_orb_full_32',
      description: 'Diablo-style mana orb at 100% — glowing blue sphere in stone frame',
      size: 32,
      draw: [
        // Stone frame
        'spans(F, 6:12-19, 7:10-11, 7:20-21, 8:9-10, 8:21-22, 9:8-9, 9:22-23, 10:7-8, 10:23-24, 11:7-8, 11:23-24)',
        'spans(F, 12:7-8, 12:23-24, 13:7-8, 13:23-24, 14:7-8, 14:23-24, 15:7-8, 15:23-24, 16:7-8, 16:23-24, 17:7-8, 17:23-24, 18:7-8, 18:23-24)',
        'spans(F, 19:7-8, 19:23-24, 20:7-8, 20:23-24, 21:8-9, 21:22-23, 22:9-10, 22:21-22, 23:10-11, 23:20-21, 24:12-19)',
        // Frame highlight
        'spans(H, 6:12-15, 7:10-11, 8:9-10, 9:8-9)',
        // Fill (blue liquid)
        'spans(B, 9:10-21, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:10-21, 22:11-20, 23:12-19)',
        // Fill highlight
        'spans(L, 10:11-14, 11:10-13, 12:10-12)',
        // Fill shadow
        'spans(D, 21:16-21, 22:14-20, 23:14-19)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        B: { name: 'liquid', role: 'body' },
        L: { name: 'liquid', role: 'body', tone: 'highlight' },
        D: { name: 'liquid', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#597dce', shadow: '#30346d', highlight: '#6dc2ca' },
        trim: { base: '#757161', shadow: '#4e4a4e', highlight: '#8595a1' },
      },
    },

    // ── 4. Mana Orb Empty ──
    {
      id: 'rpg_mana_orb_empty_32',
      description: 'Diablo-style mana orb at 0% — dark empty sphere in stone frame',
      size: 32,
      draw: [
        // Stone frame
        'spans(F, 6:12-19, 7:10-11, 7:20-21, 8:9-10, 8:21-22, 9:8-9, 9:22-23, 10:7-8, 10:23-24, 11:7-8, 11:23-24)',
        'spans(F, 12:7-8, 12:23-24, 13:7-8, 13:23-24, 14:7-8, 14:23-24, 15:7-8, 15:23-24, 16:7-8, 16:23-24, 17:7-8, 17:23-24, 18:7-8, 18:23-24)',
        'spans(F, 19:7-8, 19:23-24, 20:7-8, 20:23-24, 21:8-9, 21:22-23, 22:9-10, 22:21-22, 23:10-11, 23:20-21, 24:12-19)',
        // Frame highlight
        'spans(H, 6:12-15, 7:10-11, 8:9-10, 9:8-9)',
        // Empty interior
        'spans(K, 9:10-21, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:10-21, 22:11-20, 23:12-19)',
        // Subtle glass highlight
        'spans(G, 10:11-13, 11:10-12)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        K: { name: 'empty', role: 'body', tone: 'shadow' },
        G: { name: 'glass', role: 'accent' },
      },
      colors: {
        body: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        trim: { base: '#757161', shadow: '#4e4a4e', highlight: '#8595a1' },
        accent: { base: '#30346d', shadow: '#140c1c', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════
    // CHAT & DIALOG ELEMENTS
    // ═══════════════════════════════════════════════════

    // ── 5. Chat Bubble ──
    {
      id: 'rpg_chat_bubble_32',
      description: 'Speech bubble for NPC dialog — rounded with tail',
      size: 32,
      draw: [
        // Bubble body
        'spans(B, 7:6-25, 8:5-26, 9:5-26, 10:5-26, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:6-25)',
        // Tail
        'spans(B, 18:8-12, 19:9-11, 20:10-11)',
        // Outline
        'spans(O, 6:6-25, 7:5, 7:26, 8:4, 8:27, 17:5, 17:26, 18:6-7, 18:13, 19:8, 19:12, 20:9, 20:12, 21:10-11)',
        'spans(O, 9:4, 9:27, 10:4, 10:27, 11:4, 11:27, 12:4, 12:27, 13:4, 13:27, 14:4, 14:27, 15:4, 15:27, 16:4, 16:27)',
        // Text lines (decorative)
        'spans(T, 9:8-23, 11:8-20, 13:8-22, 15:8-18)',
      ],
      chars: {
        B: { name: 'bubble', role: 'body' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
        T: { name: 'text', role: 'accent' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#8595a1', highlight: '#deeed6' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        accent: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },

    // ── 6. Thought Bubble ──
    {
      id: 'rpg_thought_bubble_32',
      description: 'Thought bubble with cloud shape and dots trail',
      size: 32,
      draw: [
        // Cloud body
        'spans(B, 6:8-23, 7:6-25, 8:5-26, 9:5-26, 10:5-26, 11:5-26, 12:5-26, 13:5-26, 14:6-25, 15:7-24)',
        // Outline
        'spans(O, 5:8-23, 6:6-7, 6:24-25, 7:5, 7:26, 8:4, 8:27, 14:5, 14:26, 15:6, 15:25, 16:7-24)',
        'spans(O, 9:4, 9:27, 10:4, 10:27, 11:4, 11:27, 12:4, 12:27, 13:4, 13:27)',
        // Trail dots
        'spans(B, 18:10-12, 19:10-12)',
        'spans(O, 17:10-12, 18:9, 18:13, 19:9, 19:13, 20:10-12)',
        'spans(B, 22:8-9)',
        'spans(O, 21:8-9, 22:7, 22:10, 23:8-9)',
      ],
      chars: {
        B: { name: 'cloud', role: 'body' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#8595a1', highlight: '#deeed6' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },

    // ── 7. Exclamation Alert ──
    {
      id: 'rpg_alert_exclamation_32',
      description: 'Alert icon — exclamation in red triangle for warnings',
      size: 32,
      draw: [
        // Triangle body
        'spans(B, 8:15-16, 9:14-17, 10:13-18, 11:12-19, 12:12-19, 13:11-20, 14:10-21, 15:10-21, 16:9-22, 17:8-23, 18:8-23, 19:7-24, 20:6-25, 21:6-25, 22:5-26, 23:5-26)',
        // Shadow
        'spans(D, 21:20-25, 22:21-26, 23:22-26)',
        // Highlight
        'spans(L, 9:14-15, 10:13-14, 11:12-13)',
        // Exclamation mark (dark)
        'spans(A, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16)',
        'spans(A, 20:15-16, 21:15-16)',
        // Outline
        'spans(O, 7:15-16, 8:14, 8:17, 9:13, 9:18, 10:12, 10:19, 11:11, 11:20, 12:11, 12:20, 13:10, 13:21, 14:9, 14:22, 15:9, 15:22, 16:8, 16:23, 17:7, 17:24, 18:7, 18:24, 19:6, 19:25, 20:5, 20:26, 21:5, 21:26, 22:4, 22:27, 23:4, 23:27, 24:5-26)',
      ],
      chars: {
        B: { name: 'triangle', role: 'body' },
        L: { name: 'triangle', role: 'body', tone: 'highlight' },
        D: { name: 'triangle', role: 'body', tone: 'shadow' },
        A: { name: 'exclamation', role: 'accent' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        accent: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════
    // HUD ELEMENTS
    // ═══════════════════════════════════════════════════

    // ── 8. Level Badge ──
    {
      id: 'rpg_level_badge_32',
      description: 'Circular level/rank badge with ornate border',
      size: 32,
      draw: [
        // Outer ring
        'spans(A, 8:12-19, 9:10-11, 9:20-21, 10:9-10, 10:21-22, 11:8-9, 11:22-23, 12:8-9, 12:22-23)',
        'spans(A, 13:8-9, 13:22-23, 14:8-9, 14:22-23, 15:8-9, 15:22-23, 16:8-9, 16:22-23, 17:8-9, 17:22-23, 18:8-9, 18:22-23)',
        'spans(A, 19:8-9, 19:22-23, 20:9-10, 20:21-22, 21:10-11, 21:20-21, 22:12-19)',
        // Inner fill
        'spans(B, 10:12-19, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:12-19)',
        // Highlight
        'spans(L, 10:12-15, 11:10-13, 12:10-11)',
        // Shadow
        'spans(D, 19:18-21, 20:16-19)',
        // Crown accent on top
        'spans(A, 6:14-17, 7:13-14, 7:17-18, 7:15-16)',
      ],
      chars: {
        A: { name: 'border', role: 'accent' },
        B: { name: 'face', role: 'body' },
        L: { name: 'face', role: 'body', tone: 'highlight' },
        D: { name: 'face', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#30346d', shadow: '#140c1c', highlight: '#597dce' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
      },
    },

    // ── 9. XP Orb ──
    {
      id: 'rpg_xp_orb_32',
      description: 'Floating experience orb — glowing green collectible',
      size: 32,
      draw: [
        // Orb body
        'spans(B, 11:13-18, 12:11-20, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:11-20, 18:13-18)',
        // Highlight
        'spans(L, 11:13-15, 12:11-14, 13:10-12)',
        // Shadow
        'spans(D, 17:17-20, 18:16-18)',
        // Glow
        'spans(G, 9:14-17, 10:12-13, 10:18-19, 11:11-12, 11:19-20, 19:12-13, 19:18-19, 20:14-17)',
        // Outline
        'spans(O, 10:13-18, 11:12, 11:19, 12:10, 12:21, 13:9, 13:22, 14:9, 14:22, 15:9, 15:22, 16:9, 16:22, 17:10, 17:21, 18:12, 18:19, 19:13-18)',
      ],
      chars: {
        B: { name: 'orb', role: 'body' },
        L: { name: 'orb', role: 'body', tone: 'highlight' },
        D: { name: 'orb', role: 'body', tone: 'shadow' },
        G: { name: 'glow', role: 'accent' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#346524', shadow: '#140c1c', highlight: '#dad45e' },
        accent: { base: '#346524', shadow: '#140c1c', highlight: '#6dc2ca' },
        trim: { base: '#140c1c', shadow: '#140c1c', highlight: '#346524' },
      },
    },

    // ── 10. Damage Number Frame ──
    {
      id: 'rpg_damage_frame_32',
      description: 'Floating damage/hit number display frame',
      size: 32,
      draw: [
        // Body (rounded rectangle)
        'spans(B, 10:6-25, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26, 20:6-25)',
        // Highlight
        'spans(L, 10:6-15, 11:5-10)',
        // Shadow
        'spans(D, 19:20-26, 20:18-25)',
        // Border
        'spans(O, 9:6-25, 10:5, 10:26, 11:4, 11:27, 19:4, 19:27, 20:5, 20:26, 21:6-25)',
        'spans(O, 12:4, 12:27, 13:4, 13:27, 14:4, 14:27, 15:4, 15:27, 16:4, 16:27, 17:4, 17:27, 18:4, 18:27)',
      ],
      chars: {
        B: { name: 'panel', role: 'body' },
        L: { name: 'panel', role: 'body', tone: 'highlight' },
        D: { name: 'panel', role: 'body', tone: 'shadow' },
        O: { name: 'border', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
      },
    },

    // ── 11. Heal Number Frame ──
    {
      id: 'rpg_heal_frame_32',
      description: 'Floating heal number display frame — green version',
      size: 32,
      draw: [
        'spans(B, 10:6-25, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26, 20:6-25)',
        'spans(L, 10:6-15, 11:5-10)',
        'spans(D, 19:20-26, 20:18-25)',
        'spans(O, 9:6-25, 10:5, 10:26, 11:4, 11:27, 19:4, 19:27, 20:5, 20:26, 21:6-25)',
        'spans(O, 12:4, 12:27, 13:4, 13:27, 14:4, 14:27, 15:4, 15:27, 16:4, 16:27, 17:4, 17:27, 18:4, 18:27)',
      ],
      chars: {
        B: { name: 'panel', role: 'body' },
        L: { name: 'panel', role: 'body', tone: 'highlight' },
        D: { name: 'panel', role: 'body', tone: 'shadow' },
        O: { name: 'border', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#346524', shadow: '#140c1c', highlight: '#dad45e' },
        trim: { base: '#140c1c', shadow: '#140c1c', highlight: '#346524' },
      },
    },

    // ── 12. Mana Number Frame ──
    {
      id: 'rpg_mana_number_frame_32',
      description: 'Floating mana cost number display frame — blue version',
      size: 32,
      draw: [
        'spans(B, 10:6-25, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26, 20:6-25)',
        'spans(L, 10:6-15, 11:5-10)',
        'spans(D, 19:20-26, 20:18-25)',
        'spans(O, 9:6-25, 10:5, 10:26, 11:4, 11:27, 19:4, 19:27, 20:5, 20:26, 21:6-25)',
        'spans(O, 12:4, 12:27, 13:4, 13:27, 14:4, 14:27, 15:4, 15:27, 16:4, 16:27, 17:4, 17:27, 18:4, 18:27)',
      ],
      chars: {
        B: { name: 'panel', role: 'body' },
        L: { name: 'panel', role: 'body', tone: 'highlight' },
        D: { name: 'panel', role: 'body', tone: 'shadow' },
        O: { name: 'border', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#597dce', shadow: '#30346d', highlight: '#6dc2ca' },
        trim: { base: '#30346d', shadow: '#140c1c', highlight: '#597dce' },
      },
    },

    // ═══════════════════════════════════════════════════
    // WINDOW / PANEL FRAMES
    // ═══════════════════════════════════════════════════

    // ── 13. Menu Window ──
    {
      id: 'rpg_menu_window_32',
      description: 'RPG menu window frame — dark panel with metallic border',
      size: 32,
      draw: [
        // Outer frame
        'spans(F, 3:3-28, 28:3-28)',
        'spans(F, 4:3-4, 5:3-4, 6:3-4, 7:3-4, 8:3-4, 9:3-4, 10:3-4, 11:3-4, 12:3-4, 13:3-4, 14:3-4, 15:3-4, 16:3-4, 17:3-4, 18:3-4, 19:3-4, 20:3-4, 21:3-4, 22:3-4, 23:3-4, 24:3-4, 25:3-4, 26:3-4, 27:3-4)',
        'spans(F, 4:27-28, 5:27-28, 6:27-28, 7:27-28, 8:27-28, 9:27-28, 10:27-28, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28, 19:27-28, 20:27-28, 21:27-28, 22:27-28, 23:27-28, 24:27-28, 25:27-28, 26:27-28, 27:27-28)',
        // Frame highlight
        'spans(H, 3:4-27, 4:4)',
        // Frame shadow
        'spans(S, 28:4-27, 27:28)',
        // Title bar
        'spans(A, 4:5-26, 5:5-26, 6:5-26)',
        // Body
        'spans(B, 7:5-26, 8:5-26, 9:5-26, 10:5-26, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26, 20:5-26, 21:5-26, 22:5-26, 23:5-26, 24:5-26, 25:5-26, 26:5-26, 27:5-26)',
        // Separator line
        'spans(F, 7:5-26)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        A: { name: 'titlebar', role: 'accent' },
        B: { name: 'body', role: 'body' },
      },
      colors: {
        body: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#30346d', shadow: '#140c1c', highlight: '#597dce' },
      },
    },

    // ── 14. Info Panel ──
    {
      id: 'rpg_info_panel_32',
      description: 'Small info/stats panel — parchment style',
      size: 32,
      draw: [
        // Outer frame
        'spans(F, 5:4-27, 26:4-27)',
        'spans(F, 6:4-5, 7:4-5, 8:4-5, 9:4-5, 10:4-5, 11:4-5, 12:4-5, 13:4-5, 14:4-5, 15:4-5, 16:4-5, 17:4-5, 18:4-5, 19:4-5, 20:4-5, 21:4-5, 22:4-5, 23:4-5, 24:4-5, 25:4-5)',
        'spans(F, 6:26-27, 7:26-27, 8:26-27, 9:26-27, 10:26-27, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27, 19:26-27, 20:26-27, 21:26-27, 22:26-27, 23:26-27, 24:26-27, 25:26-27)',
        // Body
        'spans(B, 6:6-25, 7:6-25, 8:6-25, 9:6-25, 10:6-25, 11:6-25, 12:6-25, 13:6-25, 14:6-25, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:6-25, 20:6-25, 21:6-25, 22:6-25, 23:6-25, 24:6-25, 25:6-25)',
        // Highlight
        'spans(L, 6:6-25, 7:6-8)',
        // Shadow
        'spans(D, 24:22-25, 25:20-25)',
        // Decorative header line
        'spans(A, 8:7-24)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        B: { name: 'parchment', role: 'body' },
        L: { name: 'parchment', role: 'body', tone: 'highlight' },
        D: { name: 'parchment', role: 'body', tone: 'shadow' },
        A: { name: 'decoration', role: 'accent' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════
    // SPECIAL EFFECTS
    // ═══════════════════════════════════════════════════

    // ── 15. Status Effect Buff ──
    {
      id: 'rpg_buff_icon_32',
      description: 'Upward green arrow — active buff status icon',
      size: 32,
      draw: [
        // Background circle
        'spans(K, 10:12-19, 11:10-21, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:10-21, 19:12-19)',
        // Arrow pointing up
        'spans(B, 10:15-16, 11:14-17, 12:13-18, 13:12-19, 14:15-16, 15:15-16, 16:15-16, 17:15-16)',
        // Highlight
        'spans(L, 10:15, 11:14-15, 12:13-14)',
        // Outline
        'spans(O, 9:12-19, 10:10-11, 10:20-21, 11:9, 11:22, 12:8, 12:23, 13:8, 13:23, 14:8, 14:23, 15:8, 15:23, 16:8, 16:23, 17:8, 17:23, 18:9, 18:22, 19:10-11, 19:20-21, 20:12-19)',
      ],
      chars: {
        K: { name: 'bg', role: 'accessory', tone: 'shadow' },
        B: { name: 'arrow', role: 'body' },
        L: { name: 'arrow', role: 'body', tone: 'highlight' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#346524', shadow: '#140c1c', highlight: '#dad45e' },
        trim: { base: '#140c1c', shadow: '#140c1c', highlight: '#346524' },
        accessory: { base: '#346524', shadow: '#140c1c', highlight: '#346524' },
      },
    },

    // ── 16. Status Effect Debuff ──
    {
      id: 'rpg_debuff_icon_32',
      description: 'Downward red arrow — active debuff status icon',
      size: 32,
      draw: [
        // Background circle
        'spans(K, 10:12-19, 11:10-21, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:10-21, 19:12-19)',
        // Arrow pointing down
        'spans(B, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:12-19, 17:13-18, 18:14-17, 19:15-16)',
        // Highlight
        'spans(L, 12:15, 13:15, 16:12-13)',
        // Outline
        'spans(O, 9:12-19, 10:10-11, 10:20-21, 11:9, 11:22, 12:8, 12:23, 13:8, 13:23, 14:8, 14:23, 15:8, 15:23, 16:8, 16:23, 17:8, 17:23, 18:9, 18:22, 19:10-11, 19:20-21, 20:12-19)',
      ],
      chars: {
        K: { name: 'bg', role: 'accessory', tone: 'shadow' },
        B: { name: 'arrow', role: 'body' },
        L: { name: 'arrow', role: 'body', tone: 'highlight' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        accessory: { base: '#442434', shadow: '#140c1c', highlight: '#442434' },
      },
    },

    // ── 17. Checkmark Icon ──
    {
      id: 'rpg_checkmark_32',
      description: 'Green checkmark icon — quest complete/task done',
      size: 32,
      draw: [
        // Background circle
        'spans(K, 10:12-19, 11:10-21, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:10-21, 19:12-19)',
        // Checkmark
        'spans(B, 12:18-19, 13:17-18, 14:16-17, 15:10-11, 15:15-16, 16:11-12, 16:14-15, 17:12-14)',
        // Highlight
        'spans(L, 12:18, 13:17, 14:16)',
        // Outline
        'spans(O, 9:12-19, 10:10-11, 10:20-21, 11:9, 11:22, 12:8, 12:23, 13:8, 13:23, 14:8, 14:23, 15:8, 15:23, 16:8, 16:23, 17:8, 17:23, 18:9, 18:22, 19:10-11, 19:20-21, 20:12-19)',
      ],
      chars: {
        K: { name: 'bg', role: 'accessory', tone: 'shadow' },
        B: { name: 'check', role: 'body' },
        L: { name: 'check', role: 'body', tone: 'highlight' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#346524', shadow: '#140c1c', highlight: '#dad45e' },
        trim: { base: '#140c1c', shadow: '#140c1c', highlight: '#346524' },
        accessory: { base: '#346524', shadow: '#140c1c', highlight: '#346524' },
      },
    },

    // ── 18. Cross/X Icon ──
    {
      id: 'rpg_cross_icon_32',
      description: 'Red X icon — cancel/close/fail indicator',
      size: 32,
      draw: [
        // Background circle
        'spans(K, 10:12-19, 11:10-21, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:10-21, 19:12-19)',
        // X shape
        'spans(B, 12:11-12, 12:19-20, 13:12-13, 13:18-19, 14:13-14, 14:17-18, 15:14-17)',
        'spans(B, 16:14-17, 17:13-14, 17:17-18, 18:12-13, 18:18-19)',
        // Outline
        'spans(O, 9:12-19, 10:10-11, 10:20-21, 11:9, 11:22, 12:8, 12:23, 13:8, 13:23, 14:8, 14:23, 15:8, 15:23, 16:8, 16:23, 17:8, 17:23, 18:9, 18:22, 19:10-11, 19:20-21, 20:12-19)',
      ],
      chars: {
        K: { name: 'bg', role: 'accessory', tone: 'shadow' },
        B: { name: 'cross', role: 'body' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
        accessory: { base: '#442434', shadow: '#140c1c', highlight: '#442434' },
      },
    },

    // ── 19. Loading Spinner Frame ──
    {
      id: 'rpg_spinner_frame_32',
      description: 'Circular loading spinner — partial arc in metallic frame',
      size: 32,
      draw: [
        // Outer ring track
        'spans(K, 8:13-18, 9:11-12, 9:19-20, 10:10-11, 10:20-21, 11:9-10, 11:21-22, 12:9, 12:22)',
        'spans(K, 13:9, 13:22, 14:9, 14:22, 15:9, 15:22, 16:9, 16:22, 17:9, 17:22)',
        'spans(K, 18:9-10, 18:21-22, 19:10-11, 19:20-21, 20:11-12, 20:19-20, 21:13-18)',
        // Active arc (top half — represents spinning)
        'spans(B, 8:13-18, 9:11-12, 9:19-20, 10:10-11, 10:20-21, 11:9-10, 12:9, 13:9)',
        // Highlight
        'spans(L, 8:13-15, 9:11-12)',
        // Outline
        'spans(O, 7:13-18, 8:11-12, 8:19-20, 9:10, 9:21, 10:9, 10:22, 11:8, 11:23, 12:8, 12:23, 13:8, 13:23, 14:8, 14:23, 15:8, 15:23, 16:8, 16:23, 17:8, 17:23, 18:8, 18:23, 19:9, 19:22, 20:10, 20:21, 21:11-12, 21:19-20, 22:13-18)',
      ],
      chars: {
        K: { name: 'track', role: 'accessory', tone: 'shadow' },
        B: { name: 'arc', role: 'body' },
        L: { name: 'arc', role: 'body', tone: 'highlight' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#6dc2ca', shadow: '#30346d', highlight: '#deeed6' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        accessory: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },

    // ── 20. Map Pin ──
    {
      id: 'rpg_map_pin_32',
      description: 'Map location pin/marker — classic teardrop shape',
      size: 32,
      draw: [
        // Pin body (teardrop)
        'spans(B, 7:13-18, 8:11-20, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:11-20, 14:12-19, 15:13-18, 16:14-17, 17:15-16)',
        // Highlight
        'spans(L, 7:13-15, 8:11-14, 9:10-12, 10:10-11)',
        // Shadow
        'spans(D, 12:18-21, 13:17-20, 14:17-19)',
        // Inner dot (white)
        'spans(A, 10:14-17, 11:13-18, 12:13-18, 13:14-17)',
        // Shadow of pin on ground
        'spans(S, 20:13-18, 21:14-17)',
        // Outline
        'spans(O, 6:13-18, 7:11-12, 7:19-20, 8:10, 8:21, 9:9, 9:22, 10:9, 10:22, 11:9, 11:22, 12:9, 12:22, 13:10, 13:21, 14:11, 14:20, 15:12, 15:19, 16:13, 16:18, 17:14, 17:17, 18:15-16)',
      ],
      chars: {
        B: { name: 'pin', role: 'body' },
        L: { name: 'pin', role: 'body', tone: 'highlight' },
        D: { name: 'pin', role: 'body', tone: 'shadow' },
        A: { name: 'dot', role: 'accent' },
        S: { name: 'shadow', role: 'trim', tone: 'shadow' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        accent: { base: '#deeed6', shadow: '#8595a1', highlight: '#deeed6' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },
  ],
};

export default batch;
