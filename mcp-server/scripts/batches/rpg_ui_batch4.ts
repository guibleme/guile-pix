import { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'ui',
  exportNames: {
    templates: 'RPG_BUTTONS_32_TEMPLATES',
    schemes: 'RPG_BUTTONS_32_COLOR_SCHEMES',
  },
  templates: [
    // ═══════════════════════════════════════════════════
    // RPG BUTTONS — Normal / Pressed / Disabled states
    // ═══════════════════════════════════════════════════

    // ── 1. Button Normal ──
    {
      id: 'rpg_button_normal_32',
      description: 'Standard RPG menu button — raised metallic style, idle state',
      size: 32,
      draw: [
        // Outer frame
        'spans(F, 10:4-27, 20:4-27)',
        'spans(F, 11:4-5, 12:4-5, 13:4-5, 14:4-5, 15:4-5, 16:4-5, 17:4-5, 18:4-5, 19:4-5)',
        'spans(F, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27, 19:26-27)',
        // Highlight edge (top-left)
        'spans(H, 10:5-26, 11:5)',
        // Shadow edge (bottom-right)
        'spans(S, 20:5-26, 19:27)',
        // Body fill
        'spans(B, 11:6-25, 12:6-25, 13:6-25, 14:6-25, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:6-25)',
        // Body highlight top band
        'spans(L, 11:6-25, 12:6-25)',
        // Body shadow bottom band
        'spans(D, 18:6-25, 19:6-25)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        B: { name: 'face', role: 'body' },
        L: { name: 'face', role: 'body', tone: 'highlight' },
        D: { name: 'face', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#597dce', shadow: '#30346d', highlight: '#8595a1' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },

    // ── 2. Button Pressed ──
    {
      id: 'rpg_button_pressed_32',
      description: 'RPG button pressed/active state — sunken look with inverted shading',
      size: 32,
      draw: [
        // Outer frame
        'spans(F, 10:4-27, 20:4-27)',
        'spans(F, 11:4-5, 12:4-5, 13:4-5, 14:4-5, 15:4-5, 16:4-5, 17:4-5, 18:4-5, 19:4-5)',
        'spans(F, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27, 19:26-27)',
        // Shadow edge (top-left — inverted for pressed)
        'spans(S, 10:5-26, 11:5)',
        // Highlight edge (bottom-right — inverted for pressed)
        'spans(H, 20:5-26, 19:27)',
        // Body fill (darker base)
        'spans(D, 11:6-25, 12:6-25, 13:6-25, 14:6-25, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:6-25)',
        // Subtle light in center
        'spans(B, 14:8-23, 15:8-23, 16:8-23)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        B: { name: 'face', role: 'body' },
        D: { name: 'face', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#597dce', shadow: '#30346d', highlight: '#8595a1' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },

    // ── 3. Button Disabled ──
    {
      id: 'rpg_button_disabled_32',
      description: 'RPG button disabled/grayed out state',
      size: 32,
      draw: [
        // Outer frame (muted)
        'spans(F, 10:4-27, 20:4-27)',
        'spans(F, 11:4-5, 12:4-5, 13:4-5, 14:4-5, 15:4-5, 16:4-5, 17:4-5, 18:4-5, 19:4-5)',
        'spans(F, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27, 19:26-27)',
        // Flat body — no highlight/shadow for flat disabled look
        'spans(B, 11:6-25, 12:6-25, 13:6-25, 14:6-25, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:6-25)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        B: { name: 'face', role: 'body' },
      },
      colors: {
        body: { base: '#757161', shadow: '#4e4a4e', highlight: '#8595a1' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },

    // ── 4. Button Gold ──
    {
      id: 'rpg_button_gold_32',
      description: 'Gold RPG button — confirm/accept style with warm gold frame',
      size: 32,
      draw: [
        'spans(F, 10:4-27, 20:4-27)',
        'spans(F, 11:4-5, 12:4-5, 13:4-5, 14:4-5, 15:4-5, 16:4-5, 17:4-5, 18:4-5, 19:4-5)',
        'spans(F, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27, 19:26-27)',
        'spans(H, 10:5-26, 11:5)',
        'spans(S, 20:5-26, 19:27)',
        'spans(B, 11:6-25, 12:6-25, 13:6-25, 14:6-25, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:6-25)',
        'spans(L, 11:6-25, 12:6-25)',
        'spans(D, 18:6-25, 19:6-25)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        S: { name: 'frame', role: 'trim', tone: 'shadow' },
        B: { name: 'face', role: 'body' },
        L: { name: 'face', role: 'body', tone: 'highlight' },
        D: { name: 'face', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════
    // CURSORS & ARROWS
    // ═══════════════════════════════════════════════════

    // ── 5. Cursor Arrow ──
    {
      id: 'rpg_cursor_arrow_32',
      description: 'Classic RPG selection cursor — right-pointing arrow/gauntlet',
      size: 32,
      draw: [
        // Arrow pointing right
        'spans(B, 10:6-8, 11:6-10, 12:6-12, 13:6-14, 14:6-16, 15:6-18, 16:6-20)',
        'spans(B, 17:6-18, 18:6-16, 19:6-14, 20:6-12, 21:6-10, 22:6-8)',
        // Highlight (top edge)
        'spans(L, 10:6-8, 11:6-7, 12:6-7, 13:6-7, 14:6-7, 15:6-7, 16:6-7)',
        // Shadow (bottom edge)
        'spans(D, 22:6-8, 21:6-7, 20:6-7, 19:6-7, 18:6-7, 17:6-7)',
        // Outline
        'spans(F, 9:6-8, 10:5-6, 10:9, 11:5, 11:11, 12:5, 12:13, 13:5, 13:15, 14:5, 14:17, 15:5, 15:19, 16:5, 16:21)',
        'spans(F, 17:5, 17:19, 18:5, 18:17, 19:5, 19:15, 20:5, 20:13, 21:5, 21:11, 22:5, 22:9, 23:6-8)',
      ],
      chars: {
        F: { name: 'outline', role: 'trim', tone: 'shadow' },
        B: { name: 'body', role: 'body' },
        L: { name: 'body', role: 'body', tone: 'highlight' },
        D: { name: 'body', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#8595a1', highlight: '#deeed6' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#8595a1' },
      },
    },

    // ── 6. Cursor Hand ──
    {
      id: 'rpg_cursor_hand_32',
      description: 'Pointing hand cursor for interactive elements',
      size: 32,
      draw: [
        // Finger pointing up
        'spans(B, 8:14-16, 9:14-16, 10:14-16, 11:14-16)',
        // Palm area
        'spans(B, 12:10-12, 12:14-16, 12:18-20)',
        'spans(B, 13:10-20, 14:10-20, 15:10-20, 16:10-20)',
        'spans(B, 17:10-18, 18:12-18, 19:12-16, 20:12-16)',
        // Highlight
        'spans(L, 8:14-15, 9:14-15, 12:10-11, 13:10-11)',
        // Shadow
        'spans(D, 19:12-16, 20:12-16)',
        // Outline
        'spans(F, 7:14-16, 8:13, 8:17, 9:13, 9:17, 10:13, 10:17, 11:13, 11:17)',
        'spans(F, 12:9, 12:13, 12:17, 12:21, 13:9, 13:21, 14:9, 14:21, 15:9, 15:21, 16:9, 16:21)',
        'spans(F, 17:9, 17:19, 18:11, 18:19, 19:11, 19:17, 20:11, 20:17, 21:12-16)',
      ],
      chars: {
        F: { name: 'outline', role: 'trim', tone: 'shadow' },
        B: { name: 'skin', role: 'body' },
        L: { name: 'skin', role: 'body', tone: 'highlight' },
        D: { name: 'skin', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },

    // ── 7. Arrow Up ──
    {
      id: 'rpg_arrow_up_32',
      description: 'UI scroll arrow — upward pointing triangle in metallic frame',
      size: 32,
      draw: [
        // Frame box
        'spans(F, 9:9-22, 22:9-22)',
        'spans(F, 10:9-10, 11:9-10, 12:9-10, 13:9-10, 14:9-10, 15:9-10, 16:9-10, 17:9-10, 18:9-10, 19:9-10, 20:9-10, 21:9-10)',
        'spans(F, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:21-22, 21:21-22)',
        // Background
        'spans(K, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:11-20, 19:11-20, 20:11-20, 21:11-20)',
        // Arrow triangle pointing up
        'spans(B, 12:15-16, 13:14-17, 14:13-18, 15:12-19, 16:12-19, 17:14-17, 18:14-17, 19:14-17)',
        // Highlight
        'spans(L, 12:15-16, 13:14-15, 14:13-14)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        K: { name: 'background', role: 'accessory', tone: 'shadow' },
        B: { name: 'arrow', role: 'body' },
        L: { name: 'arrow', role: 'body', tone: 'highlight' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#8595a1', highlight: '#deeed6' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accessory: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },

    // ── 8. Arrow Down ──
    {
      id: 'rpg_arrow_down_32',
      description: 'UI scroll arrow — downward pointing triangle in metallic frame',
      size: 32,
      draw: [
        // Frame box
        'spans(F, 9:9-22, 22:9-22)',
        'spans(F, 10:9-10, 11:9-10, 12:9-10, 13:9-10, 14:9-10, 15:9-10, 16:9-10, 17:9-10, 18:9-10, 19:9-10, 20:9-10, 21:9-10)',
        'spans(F, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:21-22, 21:21-22)',
        // Background
        'spans(K, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:11-20, 19:11-20, 20:11-20, 21:11-20)',
        // Arrow triangle pointing down
        'spans(B, 12:14-17, 13:14-17, 14:14-17, 15:12-19, 16:12-19, 17:13-18, 18:14-17, 19:15-16)',
        // Highlight
        'spans(L, 12:14-15, 13:14-15, 15:12-13)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        K: { name: 'background', role: 'accessory', tone: 'shadow' },
        B: { name: 'arrow', role: 'body' },
        L: { name: 'arrow', role: 'body', tone: 'highlight' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#8595a1', highlight: '#deeed6' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accessory: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
      },
    },

    // ═══════════════════════════════════════════════════
    // INDICATORS & MARKERS
    // ═══════════════════════════════════════════════════

    // ── 9. Quest Marker Active ──
    {
      id: 'rpg_quest_marker_active_32',
      description: 'Floating exclamation mark quest indicator — active/available quest',
      size: 32,
      draw: [
        // Exclamation mark body
        'spans(B, 6:14-17, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:15-16, 14:15-16)',
        // Dot
        'spans(B, 17:15-16, 18:15-16)',
        // Highlight
        'spans(L, 6:14-15, 7:14-15, 8:14-15, 9:14-15)',
        // Shadow
        'spans(D, 11:16-17, 12:16-17)',
        // Glow around
        'spans(G, 5:13-18, 6:13, 6:18, 7:13, 7:18, 8:13, 8:18, 15:14-17, 16:14-17, 17:14, 17:17, 19:15-16)',
        // Outline
        'spans(O, 5:14-17, 6:13, 6:18, 13:14, 13:17, 14:14, 14:17, 15:15-16, 16:15-16, 17:14, 17:17, 18:14, 18:17, 19:15-16)',
      ],
      chars: {
        B: { name: 'mark', role: 'body' },
        L: { name: 'mark', role: 'body', tone: 'highlight' },
        D: { name: 'mark', role: 'body', tone: 'shadow' },
        G: { name: 'glow', role: 'accent' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },

    // ── 10. Quest Marker Complete ──
    {
      id: 'rpg_quest_marker_complete_32',
      description: 'Floating question mark — quest ready to turn in',
      size: 32,
      draw: [
        // Question mark curve
        'spans(B, 6:13-18, 7:12-13, 7:17-18, 8:17-18, 9:16-17, 10:15-16, 11:15-16, 12:15-16)',
        // Dot
        'spans(B, 15:15-16, 16:15-16)',
        // Highlight
        'spans(L, 6:13-15, 7:12-13)',
        // Shadow
        'spans(D, 9:17, 10:16, 8:18)',
        // Outline
        'spans(O, 5:13-18, 6:12, 6:19, 7:11, 7:14-16, 7:19, 8:16, 8:19, 9:15, 9:18, 10:14, 10:17, 11:14, 11:17, 12:14, 12:17, 13:15-16, 14:15-16, 15:14, 15:17, 16:14, 16:17, 17:15-16)',
      ],
      chars: {
        B: { name: 'mark', role: 'body' },
        L: { name: 'mark', role: 'body', tone: 'highlight' },
        D: { name: 'mark', role: 'body', tone: 'shadow' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },

    // ── 11. Coin Counter Icon ──
    {
      id: 'rpg_coin_icon_32',
      description: 'Gold coin icon for currency display in UI',
      size: 32,
      draw: [
        // Coin body (circle-ish)
        'spans(B, 10:12-19, 11:11-20, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:11-20, 20:12-19)',
        // Highlight (top-left)
        'spans(L, 10:12-15, 11:11-14, 12:10-12, 13:10-11)',
        // Shadow (bottom-right)
        'spans(D, 18:19-21, 19:18-20, 20:16-19)',
        // Inner emblem circle
        'spans(A, 13:14-17, 14:13-14, 14:17-18, 15:13-14, 15:17-18, 16:13-14, 16:17-18, 17:14-17)',
        // Outline
        'spans(O, 9:12-19, 10:11, 10:20, 11:10, 11:21, 12:9, 12:22, 13:9, 13:22, 14:9, 14:22, 15:9, 15:22, 16:9, 16:22, 17:9, 17:22, 18:9, 18:22, 19:10, 19:21, 20:11, 20:20, 21:12-19)',
      ],
      chars: {
        B: { name: 'coin', role: 'body' },
        L: { name: 'coin', role: 'body', tone: 'highlight' },
        D: { name: 'coin', role: 'body', tone: 'shadow' },
        A: { name: 'emblem', role: 'accent' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },

    // ── 12. Notification Badge ──
    {
      id: 'rpg_notification_badge_32',
      description: 'Small red notification dot/badge for alerts',
      size: 32,
      draw: [
        // Badge circle
        'spans(B, 11:13-18, 12:12-19, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:12-19, 18:13-18)',
        // Highlight
        'spans(L, 11:13-15, 12:12-14)',
        // Shadow
        'spans(D, 17:17-19, 18:16-18)',
        // Outline
        'spans(O, 10:13-18, 11:12, 11:19, 12:11, 12:20, 13:10, 13:21, 14:10, 14:21, 15:10, 15:21, 16:10, 16:21, 17:11, 17:20, 18:12, 18:19, 19:13-18)',
      ],
      chars: {
        B: { name: 'badge', role: 'body' },
        L: { name: 'badge', role: 'body', tone: 'highlight' },
        D: { name: 'badge', role: 'body', tone: 'shadow' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
      },
    },

    // ── 13. Minimap Frame ──
    {
      id: 'rpg_minimap_frame_32',
      description: 'Ornate minimap frame with compass points',
      size: 32,
      draw: [
        // Outer border
        'spans(F, 4:4-27, 27:4-27)',
        'spans(F, 5:4-5, 6:4-5, 7:4-5, 8:4-5, 9:4-5, 10:4-5, 11:4-5, 12:4-5, 13:4-5, 14:4-5, 15:4-5, 16:4-5, 17:4-5, 18:4-5, 19:4-5, 20:4-5, 21:4-5, 22:4-5, 23:4-5, 24:4-5, 25:4-5, 26:4-5)',
        'spans(F, 5:26-27, 6:26-27, 7:26-27, 8:26-27, 9:26-27, 10:26-27, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27, 19:26-27, 20:26-27, 21:26-27, 22:26-27, 23:26-27, 24:26-27, 25:26-27, 26:26-27)',
        // Inner border
        'spans(H, 5:6-25, 26:6-25)',
        'spans(H, 5:6, 6:6, 7:6, 8:6, 9:6, 10:6, 11:6, 12:6, 13:6, 14:6, 15:6, 16:6, 17:6, 18:6, 19:6, 20:6, 21:6, 22:6, 23:6, 24:6, 25:6, 26:6)',
        // Corner accents
        'spans(A, 5:5, 5:26, 26:5, 26:26)',
        'spans(A, 4:15-16, 27:15-16)',
        'spans(A, 15:4-5, 16:4-5, 15:26-27, 16:26-27)',
        // Inner map area (dark)
        'spans(K, 6:7-25, 7:7-25, 8:7-25, 9:7-25, 10:7-25, 11:7-25, 12:7-25, 13:7-25, 14:7-25, 15:7-25, 16:7-25, 17:7-25, 18:7-25, 19:7-25, 20:7-25, 21:7-25, 22:7-25, 23:7-25, 24:7-25, 25:7-25)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        A: { name: 'compass', role: 'accent' },
        K: { name: 'map_bg', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#346524', shadow: '#140c1c', highlight: '#6dc2ca' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d2aa99' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
      },
    },

    // ── 14. Tab Button Active ──
    {
      id: 'rpg_tab_active_32',
      description: 'Active tab button for menus — raised with highlighted edge',
      size: 32,
      draw: [
        // Tab shape (open bottom)
        'spans(F, 10:6-25, 11:6-7, 11:24-25)',
        'spans(F, 12:6-7, 13:6-7, 14:6-7, 15:6-7, 16:6-7, 17:6-7, 18:6-7, 19:6-7)',
        'spans(F, 12:24-25, 13:24-25, 14:24-25, 15:24-25, 16:24-25, 17:24-25, 18:24-25, 19:24-25)',
        // Highlight edge
        'spans(H, 10:7-24, 11:7)',
        // Body fill
        'spans(B, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23)',
        // Highlight band
        'spans(L, 11:8-23, 12:8-23)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        H: { name: 'frame', role: 'trim', tone: 'highlight' },
        B: { name: 'face', role: 'body' },
        L: { name: 'face', role: 'body', tone: 'highlight' },
      },
      colors: {
        body: { base: '#597dce', shadow: '#30346d', highlight: '#8595a1' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },

    // ── 15. Tab Button Inactive ──
    {
      id: 'rpg_tab_inactive_32',
      description: 'Inactive tab button — darker, recessed',
      size: 32,
      draw: [
        // Tab shape (open bottom)
        'spans(F, 12:6-25, 13:6-7, 13:24-25)',
        'spans(F, 14:6-7, 15:6-7, 16:6-7, 17:6-7, 18:6-7, 19:6-7)',
        'spans(F, 14:24-25, 15:24-25, 16:24-25, 17:24-25, 18:24-25, 19:24-25)',
        // Body fill (darker)
        'spans(D, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23)',
      ],
      chars: {
        F: { name: 'frame', role: 'trim' },
        D: { name: 'face', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#597dce', shadow: '#30346d', highlight: '#8595a1' },
        trim: { base: '#757161', shadow: '#4e4a4e', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════
    // STATUS ICONS
    // ═══════════════════════════════════════════════════

    // ── 16. Heart Icon ──
    {
      id: 'rpg_heart_icon_32',
      description: 'Heart icon for lives/health display — Zelda-style',
      size: 32,
      draw: [
        // Heart shape
        'spans(B, 10:8-13, 10:18-23)',
        'spans(B, 11:7-14, 11:17-24)',
        'spans(B, 12:7-24, 13:7-24, 14:8-23, 15:9-22, 16:10-21, 17:11-20, 18:12-19, 19:13-18, 20:14-17, 21:15-16)',
        // Highlight (top-left)
        'spans(L, 10:8-10, 11:7-9, 12:7-8)',
        // Shadow (bottom-right)
        'spans(D, 18:17-19, 19:16-18, 20:15-17)',
        // Outline
        'spans(O, 9:8-13, 9:18-23, 10:7, 10:14-17, 10:24, 11:6, 11:15-16, 11:25, 12:6, 12:25, 13:6, 13:25, 14:7, 14:24, 15:8, 15:23, 16:9, 16:22, 17:10, 17:21, 18:11, 18:20, 19:12, 19:19, 20:13, 20:18, 21:14, 21:17, 22:15-16)',
      ],
      chars: {
        B: { name: 'heart', role: 'body' },
        L: { name: 'heart', role: 'body', tone: 'highlight' },
        D: { name: 'heart', role: 'body', tone: 'shadow' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
      },
    },

    // ── 17. Heart Icon Empty ──
    {
      id: 'rpg_heart_icon_empty_32',
      description: 'Empty heart icon — lost health container',
      size: 32,
      draw: [
        // Heart shape (dark fill)
        'spans(K, 10:8-13, 10:18-23)',
        'spans(K, 11:7-14, 11:17-24)',
        'spans(K, 12:7-24, 13:7-24, 14:8-23, 15:9-22, 16:10-21, 17:11-20, 18:12-19, 19:13-18, 20:14-17, 21:15-16)',
        // Outline
        'spans(O, 9:8-13, 9:18-23, 10:7, 10:14-17, 10:24, 11:6, 11:15-16, 11:25, 12:6, 12:25, 13:6, 13:25, 14:7, 14:24, 15:8, 15:23, 16:9, 16:22, 17:10, 17:21, 18:11, 18:20, 19:12, 19:19, 20:13, 20:18, 21:14, 21:17, 22:15-16)',
      ],
      chars: {
        K: { name: 'heart_empty', role: 'body', tone: 'shadow' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        trim: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
      },
    },

    // ── 18. Star Icon ──
    {
      id: 'rpg_star_icon_32',
      description: 'Star icon for ratings, favorites, or special items',
      size: 32,
      draw: [
        // Star shape (5-pointed)
        'spans(B, 8:15-16, 9:14-17, 10:14-17, 11:13-18)',
        'spans(B, 12:8-23, 13:9-22, 14:10-21)',
        'spans(B, 15:11-20, 16:12-19, 17:12-19)',
        'spans(B, 18:11-14, 18:17-20, 19:10-14, 19:17-21, 20:9-13, 20:18-22)',
        // Highlight
        'spans(L, 8:15, 9:14-15, 10:14-15, 12:8-12)',
        // Shadow
        'spans(D, 19:19-21, 20:20-22, 18:18-20)',
        // Outline
        'spans(O, 7:15-16, 8:14, 8:17, 9:13, 9:18, 10:13, 10:18, 11:12, 11:19, 12:7, 12:24, 13:8, 13:23, 14:9, 14:22, 15:10, 15:21, 16:11, 16:20, 17:11, 17:20, 18:10, 18:15-16, 18:21, 19:9, 19:15-16, 19:22, 20:8, 20:14, 20:17, 20:23, 21:9-13, 21:18-22)',
      ],
      chars: {
        B: { name: 'star', role: 'body' },
        L: { name: 'star', role: 'body', tone: 'highlight' },
        D: { name: 'star', role: 'body', tone: 'shadow' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },

    // ── 19. Shield Icon ──
    {
      id: 'rpg_shield_icon_32',
      description: 'Shield/defense icon for armor rating display',
      size: 32,
      draw: [
        // Shield body
        'spans(B, 8:10-21, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:10-21, 17:10-21, 18:11-20, 19:11-20, 20:12-19, 21:13-18, 22:14-17, 23:15-16)',
        // Highlight (top-left)
        'spans(L, 8:10-14, 9:9-12, 10:9-11, 11:9-10)',
        // Shadow (bottom-right)
        'spans(D, 19:18-20, 20:17-19, 21:16-18, 22:15-17)',
        // Emblem stripe
        'spans(A, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16)',
        'spans(A, 14:11-20, 15:11-20)',
        // Outline
        'spans(O, 7:10-21, 8:9, 8:22, 9:8, 9:23, 10:8, 10:23, 11:8, 11:23, 12:8, 12:23, 13:8, 13:23, 14:8, 14:23, 15:8, 15:23, 16:9, 16:22, 17:9, 17:22, 18:10, 18:21, 19:10, 19:21, 20:11, 20:20, 21:12, 21:19, 22:13, 22:18, 23:14, 23:17, 24:15-16)',
      ],
      chars: {
        B: { name: 'shield', role: 'body' },
        L: { name: 'shield', role: 'body', tone: 'highlight' },
        D: { name: 'shield', role: 'body', tone: 'shadow' },
        A: { name: 'emblem', role: 'accent' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#597dce', shadow: '#30346d', highlight: '#8595a1' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#30346d', shadow: '#140c1c', highlight: '#597dce' },
      },
    },

    // ── 20. Sword Icon ──
    {
      id: 'rpg_sword_icon_32',
      description: 'Sword/attack icon for weapon damage display',
      size: 32,
      draw: [
        // Blade
        'spans(B, 6:22-23, 7:21-22, 8:20-21, 9:19-20, 10:18-19, 11:17-18, 12:16-17, 13:15-16, 14:14-15, 15:13-14)',
        // Highlight
        'spans(L, 6:22, 7:21, 8:20, 9:19, 10:18, 11:17, 12:16)',
        // Guard (crossguard)
        'spans(A, 16:10-11, 16:14-17, 17:10-11, 17:14-17)',
        // Grip
        'spans(G, 18:12-13, 19:12-13, 20:12-13)',
        // Pommel
        'spans(A, 21:11-14, 22:12-13)',
        // Outline
        'spans(O, 5:22-23, 6:21, 6:24, 7:20, 7:23, 8:19, 8:22, 9:18, 9:21, 10:17, 10:20, 11:16, 11:19, 12:15, 12:18, 13:14, 13:17, 14:13, 14:16, 15:12, 15:15)',
        'spans(O, 16:9, 16:12-13, 16:18, 17:9, 17:12-13, 17:18)',
        'spans(O, 18:11, 18:14, 19:11, 19:14, 20:11, 20:14)',
        'spans(O, 21:10, 21:15, 22:11, 22:14, 23:12-13)',
      ],
      chars: {
        B: { name: 'blade', role: 'body' },
        L: { name: 'blade', role: 'body', tone: 'highlight' },
        A: { name: 'guard', role: 'accent' },
        G: { name: 'grip', role: 'trim' },
        O: { name: 'outline', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },
  ],
};

export default batch;
