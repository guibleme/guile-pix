/**
 * UI Bars batch — 7 bar pairs (empty/full) + 6 UI elements = 20 templates.
 * Bar pairs have IDENTICAL grids — only fill colors differ — so buyers can animate between 0% and 100%.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'ui',
  exportNames: { templates: 'UI_BARS_TEMPLATES', schemes: 'UI_BARS_COLOR_SCHEMES' },
  templates: [

    // ═══════════════════════════════════════════════════════════
    // 1. HEALTH BAR — EMPTY (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'health_bar_empty_16',
      description: 'Health bar at 0% — empty dark interior, heart icon, metal frame.',
      grid: [
        '................',
        '..A.A...........',
        '.AAAAA..........',
        '..AAA...........',
        '...A............',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'heart_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 2. HEALTH BAR — FULL (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'health_bar_full_16',
      description: 'Health bar at 100% — bright red fill, heart icon, metal frame.',
      grid: [
        '................',
        '..A.A...........',
        '.AAAAA..........',
        '..AAA...........',
        '...A............',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'heart_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 3. MANA BAR — EMPTY (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'mana_bar_empty_16',
      description: 'Mana bar at 0% — empty dark interior, droplet icon, metal frame.',
      grid: [
        '................',
        '...A............',
        '..AAA...........',
        '.AAAAA..........',
        '..AAA...........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'drop_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 4. MANA BAR — FULL (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'mana_bar_full_16',
      description: 'Mana bar at 100% — bright blue fill, droplet icon, metal frame.',
      grid: [
        '................',
        '...A............',
        '..AAA...........',
        '.AAAAA..........',
        '..AAA...........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'drop_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 5. STAMINA BAR — EMPTY (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'stamina_bar_empty_16',
      description: 'Stamina bar at 0% — empty dark interior, lightning icon, metal frame.',
      grid: [
        '................',
        '...AA...........',
        '..AA............',
        '.AAAA...........',
        '...AA...........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'bolt_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#140c1c', base: '#346524', highlight: '#346524' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 6. STAMINA BAR — FULL (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'stamina_bar_full_16',
      description: 'Stamina bar at 100% — bright green fill, lightning icon, metal frame.',
      grid: [
        '................',
        '...AA...........',
        '..AA............',
        '.AAAA...........',
        '...AA...........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'bolt_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 7. SHIELD BAR — EMPTY (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'shield_bar_empty_16',
      description: 'Shield bar at 0% — empty dark interior, shield icon, metal frame.',
      grid: [
        '................',
        '.AAAAA..........',
        '.AAAAA..........',
        '..AAA...........',
        '...A............',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'shield_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 8. SHIELD BAR — FULL (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'shield_bar_full_16',
      description: 'Shield bar at 100% — bright cyan fill, shield icon, metal frame.',
      grid: [
        '................',
        '.AAAAA..........',
        '.AAAAA..........',
        '..AAA...........',
        '...A............',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'shield_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 9. XP BAR — EMPTY (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'xp_bar_empty_16',
      description: 'XP bar at 0% — empty dark interior, star icon, metal frame.',
      grid: [
        '................',
        '...A............',
        '..AAA...........',
        '.AAAAA..........',
        '..A.A...........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'star_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#140c1c', base: '#854c30', highlight: '#854c30' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 10. XP BAR — FULL (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'xp_bar_full_16',
      description: 'XP bar at 100% — bright gold fill, star icon, metal frame.',
      grid: [
        '................',
        '...A............',
        '..AAA...........',
        '.AAAAA..........',
        '..A.A...........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'star_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 11. RAGE BAR — EMPTY (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'rage_bar_empty_16',
      description: 'Rage bar at 0% — empty dark interior, flame icon, metal frame.',
      grid: [
        '................',
        '...A............',
        '..AAA...........',
        '..AAA...........',
        '.AAAAA..........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'flame_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 12. RAGE BAR — FULL (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'rage_bar_full_16',
      description: 'Rage bar at 100% — bright orange fill, flame icon, metal frame.',
      grid: [
        '................',
        '...A............',
        '..AAA...........',
        '..AAA...........',
        '.AAAAA..........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'flame_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 13. AMMO BAR — EMPTY (0%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'ammo_bar_empty_16',
      description: 'Ammo bar at 0% — empty dark interior, bullet icon, metal frame.',
      grid: [
        '................',
        '..AAA...........',
        '.AAAAA..........',
        '.AAAAA..........',
        '..AAA...........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'bullet_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 14. AMMO BAR — FULL (100%)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'ammo_bar_full_16',
      description: 'Ammo bar at 100% — bright silver fill, bullet icon, metal frame.',
      grid: [
        '................',
        '..AAA...........',
        '.AAAAA..........',
        '.AAAAA..........',
        '..AAA...........',
        '.HHHHHHHHHHHHHH.',
        '.EBBBBBBBBBBBBE.',
        '.BBBBBBBBBBBBBB.',
        '.BBBBBBBBBBBBBB.',
        '.EBBBBBBBBBBBBE.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        A: { name: 'bullet_icon', role: 'accessory' },
        H: { name: 'frame', role: 'head' },
        E: { name: 'frame_detail', role: 'eye' },
        B: { name: 'fill', role: 'body' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 15. WINDOW FRAME — Draggable modal/panel
    // ═══════════════════════════════════════════════════════════
    {
      id: 'window_frame_ui_16',
      description: 'Modal window frame with title bar, close button, and content area.',
      grid: [
        'HHHHHHHHHHHHHHHH',
        'HAAAAAAAAAAAA.EH',
        'HHHHHHHHHHHHHHHH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HBBBBBBBBBBBBBBH',
        'HHHHHHHHHHHHHHHH',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'frame', role: 'head' },
        A: { name: 'title_bar', role: 'accessory' },
        E: { name: 'close_btn', role: 'eye' },
        B: { name: 'content', role: 'body' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        body:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 16. SCROLL BAR — Vertical scrollbar with thumb
    // ═══════════════════════════════════════════════════════════
    {
      id: 'scroll_bar_ui_16',
      description: 'Vertical scrollbar with arrow buttons, track, and draggable thumb.',
      grid: [
        '................',
        '..........HHHHHH',
        '..........HAAAHH',
        '..........HHHHHH',
        '..........HEEEHH',
        '..........HEEEHH',
        '..........HBBBBH',
        '..........HBBBBH',
        '..........HBBBBH',
        '..........HBBBBH',
        '..........HEEEHH',
        '..........HEEEHH',
        '..........HHHHHH',
        '..........HAAAHH',
        '..........HHHHHH',
        '................',
      ],
      chars: {
        H: { name: 'frame', role: 'head' },
        A: { name: 'arrows', role: 'accessory' },
        E: { name: 'track', role: 'eye' },
        B: { name: 'thumb', role: 'body' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 17. TAB ACTIVE — Selected tab panel
    // ═══════════════════════════════════════════════════════════
    {
      id: 'tab_active_ui_16',
      description: 'Active/selected tab with raised appearance and highlighted label area.',
      grid: [
        '................',
        '...HHHHHHHHH....',
        '..HBBBBBBBBBH...',
        '..HBBBBBBBBBH...',
        '.HBBBBBBBBBBBH..',
        'HBBBBBBBBBBBBBH.',
        'HHHHHHHHHHHHHHHH',
        'EEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEE',
        'EEEEEEEEEEEEEEEE',
        'HHHHHHHHHHHHHHHH',
        '................',
      ],
      chars: {
        H: { name: 'frame', role: 'head' },
        B: { name: 'tab_label', role: 'body' },
        E: { name: 'content', role: 'eye' },
      },
      colors: {
        head:  { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:  { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:   { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 18. TEXT INPUT — Input field with cursor
    // ═══════════════════════════════════════════════════════════
    {
      id: 'text_input_ui_16',
      description: 'Text input field with border, text placeholder area, and blinking cursor.',
      grid: [
        '................',
        '................',
        '................',
        '................',
        '.HHHHHHHHHHHHHH.',
        '.HBBBBBBBBBBBBH.',
        '.HBB.EEEEEE.BBH.',
        '.HBB.EEEEEE.BBH.',
        '.HBB.........BH.',
        '.HBBAA.......BH.',
        '.HBBBBBBBBBBBBH.',
        '.HHHHHHHHHHHHHH.',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'border', role: 'head' },
        B: { name: 'field_bg', role: 'body' },
        E: { name: 'text', role: 'eye' },
        A: { name: 'cursor', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 19. ACHIEVEMENT POPUP — Toast notification with medal
    // ═══════════════════════════════════════════════════════════
    {
      id: 'achievement_popup_ui_16',
      description: 'Achievement popup toast with medal icon, title area, and description area.',
      grid: [
        '................',
        'HHHHHHHHHHHHHHHH',
        'HBBBBBBBBBBBBBBH',
        'HBAAAA.EEEEEEEBH',
        'HBAAAA.EEEEEEEBH',
        'HBAAAA.EEEEEEEBH',
        'HBAAAA.EEEEEEEBH',
        'HBBBBBBBBBBBBBBH',
        'HBEEEEEEEEEEEEBH',
        'HBEEEEEEEEEEEEBH',
        'HBBBBBBBBBBBBBBH',
        'HHHHHHHHHHHHHHHH',
        '................',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'frame', role: 'head' },
        B: { name: 'background', role: 'body' },
        A: { name: 'medal', role: 'accessory' },
        E: { name: 'text_lines', role: 'eye' },
      },
      colors: {
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ═══════════════════════════════════════════════════════════
    // 20. RADIAL MENU — Circular context menu
    // ═══════════════════════════════════════════════════════════
    {
      id: 'radial_menu_ui_16',
      description: 'Radial/pie context menu with 4 option slots and center button.',
      grid: [
        '................',
        '....HHHHHHHH....',
        '...HBBBBBBBBH...',
        '..HBBBB..BBBBH..',
        '..HBB......BBH..',
        '.HBB..AAAA..BBH.',
        '.HBB..AAAA..BBH.',
        '.HBB..AAAA..BBH.',
        '.HBB..AAAA..BBH.',
        '..HBB......BBH..',
        '..HBBBB..BBBBH..',
        '...HBBBBBBBBH...',
        '....HHHHHHHH....',
        '................',
        '................',
        '................',
      ],
      chars: {
        H: { name: 'ring', role: 'head' },
        B: { name: 'segments', role: 'body' },
        A: { name: 'center', role: 'accessory' },
      },
      colors: {
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        body:      { shadow: '#30346d', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

  ],
};

export default batch;
