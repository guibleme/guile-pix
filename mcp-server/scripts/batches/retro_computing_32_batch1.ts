/**
 * Retro Computing & 90s Tech — Batch 1: Classic Consoles (32x32 DSL)
 * 20 unique retro console templates. Neo-SNES style, DB16 palette, 5-value shading.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'retro_tech',
  exportNames: { templates: 'RETRO_COMPUTING_32_BATCH1_TEMPLATES', schemes: 'RETRO_COMPUTING_32_BATCH1_COLOR_SCHEMES' },
  templates: [

    // ─── 1. SNES CONSOLE ────────────────────────────────────────────
    {
      id: 'snes_console_32',
      description: 'Super Nintendo/Super Famicom console with purple accents and cartridge slot.',
      size: 32,
      draw: [
        // Main body top
        'spans(B, 8:4-27, 9:4-27, 10:4-27)',
        // Main body
        'spans(B, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28)',
        // Body shadow (right + bottom)
        'spans(D, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28, 19:27-28, 20:27-28)',
        'spans(D, 19:3-28, 20:3-28)',
        // Body highlight (top-left)
        'spans(L, 8:5-26, 9:4-5)',
        // Cartridge slot
        'spans(S, 9:10-21, 10:10-21)',
        // Purple accent stripes
        'spans(A, 11:4-6, 11:25-27)',
        'spans(A, 12:4-6, 12:25-27)',
        // Power/reset buttons
        'spans(G, 14:5-7)',
        'spans(G, 14:9-11)',
        // Controller ports
        'spans(G, 20:8-11, 20:14-17)',
        // Logo area
        'spans(A, 16:12-19)',
        // Eject lever
        'spans(G, 10:23-25)',
        // Base feet
        'spans(D, 21:5-7, 21:24-26)',
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'cartridge_slot', role: 'head' },
        A: { name: 'accent_stripe', role: 'accessory' },
        G: { name: 'buttons_ports', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 2. SEGA GENESIS ────────────────────────────────────────────
    {
      id: 'sega_genesis_32',
      description: 'Sega Genesis/Mega Drive console with volume slider and cartridge slot.',
      size: 32,
      draw: [
        // Raised cart area
        'spans(B, 7:6-18, 8:5-19, 9:5-19)',
        // Cart slot
        'spans(S, 8:8-16)',
        // Main body
        'spans(B, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28)',
        // Body shadow
        'spans(D, 10:27-28, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28, 19:27-28)',
        'spans(D, 18:3-28, 19:3-28)',
        // Body highlight
        'spans(L, 10:4-8)',
        // Volume slider track
        'spans(G, 12:22-26)',
        // Volume knob
        'spans(A, 12:24-25)',
        // Reset button
        'spans(A, 14:5-6)',
        // Power switch
        'spans(G, 14:8-9)',
        // Logo plate
        'spans(L, 15:12-20)',
        // Expansion port (bottom)
        'spans(S, 19:10-16)',
        // Controller port
        'spans(G, 19:20-24)',
        // Vent lines
        'spans(D, 11:10-12, 13:10-12, 15:10-11)',
        // Feet
        'spans(D, 20:5-7, 20:24-26)',
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'cart_slot', role: 'head' },
        A: { name: 'controls', role: 'accessory' },
        G: { name: 'ports', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 3. GAME BOY ────────────────────────────────────────────────
    {
      id: 'game_boy_32',
      description: 'Original Nintendo Game Boy handheld with green-tint screen and D-pad.',
      size: 32,
      draw: [
        // Body top rounded
        'spans(B, 3:10-21, 4:9-22, 5:9-22)',
        // Main body
        'spans(B, 6:9-22, 7:9-22, 8:9-22, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:9-22, 22:9-22, 23:9-22, 24:9-22, 25:10-21)',
        // Body shadow
        'spans(D, 6:21-22, 7:21-22, 8:21-22, 9:21-22, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:21-22, 21:21-22, 22:21-22, 23:21-22, 24:21-22)',
        'spans(D, 24:9-22, 25:10-21)',
        // Body highlight
        'spans(L, 3:12-19, 4:9-10)',
        // Screen bezel
        'spans(S, 5:11-18, 6:11-18, 7:11-18, 8:11-18, 9:11-18, 10:11-18, 11:11-18, 12:11-18, 13:11-18)',
        // Screen (green tint)
        'spans(E, 6:12-17, 7:12-17, 8:12-17, 9:12-17, 10:12-17, 11:12-17, 12:12-17)',
        // Screen highlight
        'pixels(L, 12,6, 13,6, 14,6)',
        // D-pad horizontal
        'spans(G, 17:11-15)',
        // D-pad vertical
        'spans(G, 16:13-13, 18:13-13)',
        // A button
        'spans(A, 17:19-20)',
        // B button
        'spans(A, 18:17-18)',
        // Start/Select
        'spans(G, 21:13-14, 21:16-17)',
        // Speaker grille
        'pixels(D, 14,20, 15,19, 16,20, 17,19)',
      ],
      chars: {
        B: { name: 'shell', role: 'body' },
        D: { name: 'shell_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'shell_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'screen_bezel', role: 'head' },
        E: { name: 'screen_lcd', role: 'eye' },
        G: { name: 'dpad_buttons', role: 'belt' },
        A: { name: 'ab_buttons', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        belt:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 4. PLAYSTATION 1 ───────────────────────────────────────────
    {
      id: 'playstation_1_32',
      description: 'Sony PlayStation 1 console with disc lid, power/reset buttons.',
      size: 32,
      draw: [
        // Main body
        'spans(B, 9:3-28, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28)',
        // Body shadow
        'spans(D, 9:27-28, 10:27-28, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28, 19:27-28, 20:27-28)',
        'spans(D, 19:3-28, 20:3-28)',
        // Body highlight
        'spans(L, 9:4-27)',
        // Disc lid (circle shape)
        'spans(S, 11:9-22, 12:7-24, 13:6-25, 14:6-25, 15:6-25, 16:7-24, 17:9-22)',
        // Disc center ring
        'spans(G, 13:13-18, 14:12-19, 15:13-18)',
        // Open button
        'spans(A, 11:4-5)',
        // Power button
        'spans(A, 18:4-5)',
        // Reset button
        'spans(A, 18:7-8)',
        // Controller ports
        'spans(G, 20:7-10, 20:13-16)',
        // Memory card slots
        'spans(G, 20:19-21, 20:23-25)',
        // Logo
        'spans(A, 18:14-19)',
        // Vent lines right
        'spans(D, 12:26-27, 14:26-27, 16:26-27)',
        // Feet
        'spans(D, 21:5-6, 21:25-26)',
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'disc_lid', role: 'head' },
        A: { name: 'buttons_logo', role: 'accessory' },
        G: { name: 'ports_ring', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ─── 5. NINTENDO 64 ─────────────────────────────────────────────
    {
      id: 'nintendo_64_32',
      description: 'Nintendo 64 console with unique curved design and cartridge slot.',
      size: 32,
      draw: [
        // Cart slot top
        'spans(S, 7:11-20)',
        // Body top surface
        'spans(B, 8:5-26, 9:4-27, 10:4-27)',
        // Body main
        'spans(B, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:4-27, 19:5-26)',
        // Body shadow
        'spans(D, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:26-27)',
        'spans(D, 17:3-28, 18:4-27, 19:5-26)',
        // Body highlight
        'spans(L, 8:7-24)',
        // Power button
        'spans(A, 10:6-7)',
        // Reset button
        'spans(A, 10:9-10)',
        // Logo embossed N
        'spans(E, 12:14-17, 13:13-14, 13:17-18, 14:13-14, 14:17-18, 15:14-17)',
        // Controller ports (4 ports = N64 signature)
        'spans(G, 19:7-9, 19:12-14, 19:17-19, 19:22-24)',
        // Expansion bay
        'spans(S, 11:12-19)',
        // Vent grilles
        'spans(D, 14:4-6, 15:4-6, 14:25-27, 15:25-27)',
        // Feet
        'spans(D, 20:6-8, 20:23-25)',
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'slots', role: 'head' },
        A: { name: 'buttons', role: 'accessory' },
        G: { name: 'controller_ports', role: 'belt' },
        E: { name: 'logo_emboss', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 6. NES CONSOLE ─────────────────────────────────────────────
    {
      id: 'nes_console_32',
      description: 'Nintendo Entertainment System with front-loading cartridge slot and controllers.',
      size: 32,
      draw: [
        // Main body
        'spans(B, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28)',
        // Body shadow
        'spans(D, 10:27-28, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28, 19:27-28, 20:27-28)',
        'spans(D, 19:3-28, 20:3-28)',
        // Body highlight
        'spans(L, 10:4-27)',
        // Cart door / flap
        'spans(S, 10:7-18, 11:7-18)',
        // Flap lid line
        'spans(D, 10:7-18)',
        // Stripe accent
        'spans(A, 12:3-28)',
        // Power button
        'spans(G, 15:5-7)',
        // Reset button
        'spans(G, 15:9-11)',
        // LED indicator
        'spans(E, 15:13-13)',
        // Controller ports
        'spans(G, 20:8-12, 20:15-19)',
        // Logo area
        'spans(A, 17:14-24)',
        // Vent grilles
        'spans(D, 14:22-26, 16:22-26)',
        // Feet
        'spans(D, 21:5-7, 21:24-26)',
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'cart_door', role: 'head' },
        A: { name: 'accent_stripe', role: 'accessory' },
        G: { name: 'buttons_ports', role: 'belt' },
        E: { name: 'power_led', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#346524', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 7. GAME BOY ADVANCE ────────────────────────────────────────
    {
      id: 'game_boy_advance_32',
      description: 'Nintendo Game Boy Advance handheld with wide landscape screen and shoulder buttons.',
      size: 32,
      draw: [
        // Left wing
        'spans(B, 10:2-8, 11:2-8, 12:2-8, 13:2-8, 14:2-8, 15:2-8, 16:2-8, 17:2-8, 18:3-7)',
        // Right wing
        'spans(B, 10:23-29, 11:23-29, 12:23-29, 13:23-29, 14:23-29, 15:23-29, 16:23-29, 17:23-29, 18:24-28)',
        // Center body
        'spans(B, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23)',
        // Shadow right wing
        'spans(D, 10:28-29, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29)',
        // Shadow bottom
        'spans(D, 17:2-29, 18:3-28)',
        // Highlight
        'spans(L, 9:10-21)',
        // Screen
        'spans(E, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21)',
        // Screen frame
        'spans(S, 9:9-22, 16:9-22)',
        // D-pad
        'spans(G, 13:4-6, 12:5-5, 14:5-5)',
        // A/B buttons
        'spans(A, 12:26-27, 13:25-25)',
        // Start/Select
        'spans(G, 16:13-14, 16:17-18)',
        // Shoulder bumps
        'spans(D, 9:3-5, 9:26-28)',
        // Speaker grille
        'pixels(D, 15,3, 16,4, 15,5)',
      ],
      chars: {
        B: { name: 'shell', role: 'body' },
        D: { name: 'shell_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'shell_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'screen_frame', role: 'head' },
        E: { name: 'screen', role: 'eye' },
        G: { name: 'dpad_buttons', role: 'belt' },
        A: { name: 'ab_buttons', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 8. SEGA GAME GEAR ──────────────────────────────────────────
    {
      id: 'sega_game_gear_32',
      description: 'Sega Game Gear handheld with backlit color screen and wide body.',
      size: 32,
      draw: [
        // Body
        'spans(B, 9:3-28, 10:2-29, 11:2-29, 12:2-29, 13:2-29, 14:2-29, 15:2-29, 16:2-29, 17:2-29, 18:2-29, 19:3-28)',
        // Shadow
        'spans(D, 10:28-29, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29)',
        'spans(D, 18:2-29, 19:3-28)',
        // Highlight
        'spans(L, 9:5-26)',
        // Screen
        'spans(E, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22)',
        // Screen bezel
        'spans(S, 10:8-23, 17:8-23)',
        'spans(S, 11:8-8, 12:8-8, 13:8-8, 14:8-8, 15:8-8, 16:8-8)',
        'spans(S, 11:23-23, 12:23-23, 13:23-23, 14:23-23, 15:23-23, 16:23-23)',
        // D-pad
        'spans(G, 14:4-6, 13:5-5, 15:5-5)',
        // Action buttons (1 & 2)
        'spans(A, 14:25-26, 15:26-27)',
        // Start button
        'spans(G, 18:15-16)',
        // Volume wheel
        'spans(G, 10:4-5)',
        // Speaker dots
        'pixels(D, 12,4, 13,3, 14,4, 15,3, 16,4)',
      ],
      chars: {
        B: { name: 'shell', role: 'body' },
        D: { name: 'shell_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'shell_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'screen_bezel', role: 'head' },
        E: { name: 'screen', role: 'eye' },
        G: { name: 'controls', role: 'belt' },
        A: { name: 'action_buttons', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#deeed6' },
      },
    },

    // ─── 9. ATARI 2600 ──────────────────────────────────────────────
    {
      id: 'atari_2600_32',
      description: 'Atari 2600 console with wood-grain panel and cartridge slot.',
      size: 32,
      draw: [
        // Top black section
        'spans(S, 10:3-28, 11:3-28, 12:3-28)',
        // Cart slot
        'spans(G, 10:10-21)',
        // Wood grain panel
        'spans(A, 13:3-28, 14:3-28, 15:3-28, 16:3-28)',
        // Wood grain lines
        'spans(W, 14:4-27, 16:5-26)',
        // Main body (black lower)
        'spans(B, 17:3-28, 18:3-28, 19:3-28, 20:3-28)',
        // Body shadow
        'spans(D, 17:27-28, 18:27-28, 19:27-28, 20:27-28, 19:3-4, 20:3-28)',
        // Switches row
        'spans(G, 13:5-6, 13:9-10, 13:13-14, 13:17-18, 13:21-22, 13:25-26)',
        // Difficulty switches
        'spans(G, 11:24-26)',
        // Controller ports
        'spans(G, 20:8-11, 20:16-19)',
        // Ridge detail
        'spans(D, 17:3-28)',
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        S: { name: 'top_section', role: 'head' },
        A: { name: 'wood_panel', role: 'accessory' },
        W: { name: 'wood_grain', role: 'accessory', tone: 'shadow' },
        G: { name: 'switches_ports', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 10. DREAMCAST ──────────────────────────────────────────────
    {
      id: 'dreamcast_32',
      description: 'Sega Dreamcast console with swirl logo, disc lid, and modem port.',
      size: 32,
      draw: [
        // Main body
        'spans(B, 8:5-26, 9:4-27, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:5-26)',
        // Body shadow
        'spans(D, 9:26-27, 10:26-27, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27)',
        'spans(D, 18:4-27, 19:5-26)',
        // Body highlight
        'spans(L, 8:7-24)',
        // Disc lid circle
        'spans(S, 10:10-21, 11:8-23, 12:7-24, 13:7-24, 14:7-24, 15:8-23, 16:10-21)',
        // Disc center
        'spans(G, 12:13-18, 13:12-19, 14:13-18)',
        // Swirl logo
        'pixels(A, 15,13, 14,14, 13,15, 14,16, 15,16)',
        // Open button
        'spans(A, 10:5-6)',
        // Power button
        'spans(G, 17:5-6)',
        // Controller ports
        'spans(G, 19:8-11, 19:14-17, 19:20-23)',
        // Modem port
        'spans(G, 9:22-25)',
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'disc_lid', role: 'head' },
        A: { name: 'logo_button', role: 'accessory' },
        G: { name: 'ports_controls', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 11. SNES CONTROLLER ────────────────────────────────────────
    {
      id: 'snes_controller_32',
      description: 'SNES gamepad with purple/lavender buttons and D-pad.',
      size: 32,
      draw: [
        // Left grip
        'spans(B, 12:3-8, 13:2-9, 14:2-9, 15:2-9, 16:2-9, 17:3-8)',
        // Right grip
        'spans(B, 12:23-28, 13:22-29, 14:22-29, 15:22-29, 16:22-29, 17:23-28)',
        // Center body
        'spans(B, 10:8-23, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:8-23, 18:9-22)',
        // Shadow
        'spans(D, 13:28-29, 14:28-29, 15:28-29, 16:28-29)',
        'spans(D, 16:2-9, 17:3-28, 18:9-22)',
        // Highlight
        'spans(L, 10:10-21)',
        // D-pad
        'spans(G, 13:4-7, 12:5-6, 14:5-6)',
        // X button (top)
        'spans(A, 11:24-25)',
        // Y button (left)
        'spans(E, 12:23-24)',
        // A button (right)
        'spans(A, 12:26-27)',
        // B button (bottom)
        'spans(E, 13:24-25)',
        // Start
        'spans(G, 15:16-17)',
        // Select
        'spans(G, 15:13-14)',
        // Shoulder L hint
        'spans(D, 10:8-10)',
        // Shoulder R hint
        'spans(D, 10:21-23)',
        // Cable
        'spans(G, 10:15-16, 9:15-16)',
      ],
      chars: {
        B: { name: 'controller_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'dpad_misc', role: 'head' },
        A: { name: 'xa_buttons', role: 'accessory' },
        E: { name: 'yb_buttons', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ─── 12. N64 CONTROLLER ─────────────────────────────────────────
    {
      id: 'n64_controller_32',
      description: 'Nintendo 64 trident-shaped controller with analog stick and C-buttons.',
      size: 32,
      draw: [
        // Left prong
        'spans(B, 10:2-7, 11:2-7, 12:3-7, 13:3-8, 14:3-8, 15:3-9, 16:4-9, 17:5-10)',
        // Center prong
        'spans(B, 13:12-19, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:12-19)',
        // Right prong
        'spans(B, 10:24-29, 11:24-29, 12:24-28, 13:23-28, 14:23-28, 15:22-28, 16:22-27, 17:21-26)',
        // Center cross body
        'spans(B, 10:7-24, 11:7-24, 12:7-24)',
        // Shadow
        'spans(D, 10:23-24, 11:23-24, 16:27-28, 17:26-27)',
        'spans(D, 17:5-26, 18:12-19)',
        // Highlight
        'spans(L, 10:9-22)',
        // Analog stick
        'spans(G, 14:14-17, 15:14-17)',
        // D-pad
        'spans(G, 11:3-5, 10:4-4, 12:4-4)',
        // A button (green)
        'spans(A, 10:22-23)',
        // B button
        'spans(E, 11:20-21)',
        // C buttons (yellow, diamond)
        'spans(E, 10:26-27, 11:25-25, 11:28-28, 12:26-27)',
        // Start
        'spans(G, 12:14-17)',
        // Z trigger hint (center bottom)
        'spans(G, 16:14-17)',
        // L shoulder
        'spans(D, 9:3-5)',
        // R shoulder
        'spans(D, 9:26-28)',
      ],
      chars: {
        B: { name: 'controller_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'analog_dpad', role: 'head' },
        A: { name: 'a_button', role: 'accessory' },
        E: { name: 'bc_buttons', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 13. PS1 CONTROLLER ─────────────────────────────────────────
    {
      id: 'ps1_controller_32',
      description: 'PlayStation 1 DualShock controller with iconic shape buttons.',
      size: 32,
      draw: [
        // Left grip handle
        'spans(B, 14:2-7, 15:2-7, 16:2-7, 17:3-6, 18:4-5)',
        // Right grip handle
        'spans(B, 14:24-29, 15:24-29, 16:24-29, 17:25-28, 18:26-27)',
        // Center body
        'spans(B, 10:7-24, 11:6-25, 12:6-25, 13:6-25, 14:6-25, 15:7-24)',
        // Shadow
        'spans(D, 12:24-25, 13:24-25, 14:24-25, 15:23-24)',
        'spans(D, 15:7-24, 16:2-7, 16:24-29)',
        // Highlight
        'spans(L, 10:9-22)',
        // D-pad
        'spans(G, 12:8-10, 11:9-9, 13:9-9)',
        // Triangle (top)
        'spans(A, 10:22-23)',
        // Circle (right)
        'spans(E, 11:24-24)',
        // Cross (bottom)
        'spans(A, 12:22-23)',
        // Square (left)
        'spans(E, 11:21-21)',
        // Start
        'spans(G, 13:17-18)',
        // Select
        'spans(G, 13:13-14)',
        // Analog sticks
        'spans(G, 14:10-11, 14:20-21)',
        // L1/L2
        'spans(D, 10:7-9)',
        // R1/R2
        'spans(D, 10:22-24)',
        // Cable
        'spans(G, 10:15-16, 9:15-16)',
      ],
      chars: {
        B: { name: 'controller_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'dpad_misc', role: 'head' },
        A: { name: 'triangle_cross', role: 'accessory' },
        E: { name: 'circle_square', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#346524', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 14. GAME BOY COLOR ─────────────────────────────────────────
    {
      id: 'game_boy_color_32',
      description: 'Nintendo Game Boy Color handheld with color screen and translucent shell.',
      size: 32,
      draw: [
        // Body top rounded
        'spans(B, 4:11-20, 5:10-21, 6:10-21)',
        // Main body
        'spans(B, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:10-21, 21:10-21, 22:10-21, 23:11-20)',
        // Body shadow
        'spans(D, 7:20-21, 8:20-21, 9:20-21, 10:20-21, 11:20-21, 12:20-21, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21, 19:20-21, 20:20-21, 21:20-21, 22:20-21)',
        'spans(D, 22:10-21, 23:11-20)',
        // Highlight
        'spans(L, 4:13-18)',
        // Screen
        'spans(E, 7:12-19, 8:12-19, 9:12-19, 10:12-19, 11:12-19, 12:12-19)',
        // Screen bezel
        'spans(S, 6:11-20, 13:11-20)',
        // D-pad
        'spans(G, 16:12-14, 15:13-13, 17:13-13)',
        // A button
        'spans(A, 16:19-19)',
        // B button
        'spans(A, 17:17-17)',
        // Start/Select
        'spans(G, 20:14-14, 20:17-17)',
        // IR port top
        'spans(G, 4:15-16)',
        // Speaker grille
        'pixels(D, 14,19, 15,20, 16,19)',
      ],
      chars: {
        B: { name: 'shell', role: 'body' },
        D: { name: 'shell_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'shell_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'screen_frame', role: 'head' },
        E: { name: 'color_screen', role: 'eye' },
        G: { name: 'dpad_misc', role: 'belt' },
        A: { name: 'ab_buttons', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 15. TURBOGRAFX-16 ──────────────────────────────────────────
    {
      id: 'turbografx_16_32',
      description: 'NEC TurboGrafx-16 console with HuCard slot and turbo switches.',
      size: 32,
      draw: [
        // Main body
        'spans(B, 10:4-27, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:4-27)',
        // Shadow
        'spans(D, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28)',
        'spans(D, 18:3-28, 19:4-27)',
        // Highlight
        'spans(L, 10:6-25)',
        // HuCard slot
        'spans(S, 10:10-16)',
        // Turbo switches
        'spans(G, 12:5-6, 12:8-9)',
        // Run button
        'spans(A, 12:22-24)',
        // Select button
        'spans(A, 12:18-20)',
        // Controller port
        'spans(G, 19:12-17)',
        // Logo area
        'spans(A, 15:10-22)',
        // Expansion connector
        'spans(G, 19:21-25)',
        // Vent grilles
        'spans(D, 14:4-7, 16:4-7)',
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'hucard_slot', role: 'head' },
        A: { name: 'buttons_logo', role: 'accessory' },
        G: { name: 'ports_switches', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 16. NEO GEO AES ────────────────────────────────────────────
    {
      id: 'neo_geo_aes_32',
      description: 'SNK Neo Geo AES home console with large cartridge slot and joystick port.',
      size: 32,
      draw: [
        // Cart slot (raised)
        'spans(S, 6:6-16, 7:6-16, 8:6-16)',
        // Main body
        'spans(B, 9:3-28, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28)',
        // Shadow
        'spans(D, 9:27-28, 10:27-28, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28, 19:27-28, 20:27-28)',
        'spans(D, 19:3-28, 20:3-28)',
        // Highlight
        'spans(L, 9:4-14)',
        // Power switch
        'spans(G, 11:5-6)',
        // Headphone jack
        'spans(G, 11:8-9)',
        // Memory card slot
        'spans(G, 11:18-22)',
        // Logo
        'spans(A, 14:18-26)',
        // Joystick ports
        'spans(G, 20:8-12, 20:16-20)',
        // Red accent line
        'spans(A, 12:3-28)',
        // Vent grilles
        'spans(D, 15:4-8, 17:4-8)',
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'cart_slot', role: 'head' },
        A: { name: 'accent_logo', role: 'accessory' },
        G: { name: 'ports_controls', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 17. VIRTUAL BOY ────────────────────────────────────────────
    {
      id: 'virtual_boy_32',
      description: 'Nintendo Virtual Boy head-mounted display with red visor and stand.',
      size: 32,
      draw: [
        // Visor body
        'spans(B, 6:8-23, 7:7-24, 8:6-25, 9:6-25, 10:6-25, 11:6-25, 12:7-24, 13:8-23)',
        // Visor shadow
        'spans(D, 8:24-25, 9:24-25, 10:24-25, 11:24-25, 12:23-24)',
        'spans(D, 12:7-24, 13:8-23)',
        // Visor highlight
        'spans(L, 6:10-21)',
        // Eye pieces (red lenses)
        'spans(E, 8:9-13, 9:9-13, 10:9-13, 11:9-13)',
        'spans(E, 8:18-22, 9:18-22, 10:18-22, 11:18-22)',
        // Nose bridge
        'spans(B, 9:14-17, 10:14-17)',
        // Stand legs
        'spans(G, 14:10-11, 15:10-11, 16:10-11, 17:10-11, 18:9-12)',
        'spans(G, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:19-22)',
        // Controller wire
        'spans(G, 13:15-16, 14:15-16)',
        // IPD dial
        'spans(A, 7:8-8)',
        // Focus slider
        'spans(A, 7:24-25)',
      ],
      chars: {
        B: { name: 'visor_body', role: 'body' },
        D: { name: 'visor_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'visor_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'red_lenses', role: 'eye' },
        G: { name: 'stand', role: 'head' },
        A: { name: 'dials', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 18. SEGA SATURN ────────────────────────────────────────────
    {
      id: 'sega_saturn_32',
      description: 'Sega Saturn console with oval disc lid, access light, and dual controller ports.',
      size: 32,
      draw: [
        // Main body
        'spans(B, 9:4-27, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:4-27)',
        // Shadow
        'spans(D, 10:27-28, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28)',
        'spans(D, 18:3-28, 19:4-27)',
        // Highlight
        'spans(L, 9:6-25)',
        // Disc lid (oval)
        'spans(S, 11:8-23, 12:6-25, 13:6-25, 14:6-25, 15:8-23)',
        // Disc center
        'spans(G, 12:13-18, 13:12-19, 14:13-18)',
        // Open button
        'spans(A, 10:5-6)',
        // Power button
        'spans(A, 17:5-6)',
        // Reset
        'spans(A, 17:8-9)',
        // Access LED
        'spans(E, 10:8-8)',
        // Controller ports
        'spans(G, 19:8-12, 19:16-20)',
        // Card slot
        'spans(G, 10:22-25)',
      ],
      chars: {
        B: { name: 'console_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'disc_lid', role: 'head' },
        A: { name: 'buttons', role: 'accessory' },
        G: { name: 'ports', role: 'belt' },
        E: { name: 'access_led', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#deeed6' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#346524', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 19. GAME BOY ADVANCE SP ────────────────────────────────────
    {
      id: 'gba_sp_32',
      description: 'Nintendo Game Boy Advance SP clamshell handheld — open position with backlit screen.',
      size: 32,
      draw: [
        // Top screen section (open, tilted back)
        'spans(B, 3:9-22, 4:9-22, 5:9-22, 6:9-22, 7:9-22, 8:9-22, 9:9-22, 10:9-22, 11:9-22, 12:9-22)',
        // Screen shadow
        'spans(D, 3:21-22, 4:21-22, 5:21-22, 6:21-22, 7:21-22, 8:21-22, 9:21-22, 10:21-22, 11:21-22)',
        // Screen
        'spans(E, 4:11-20, 5:11-20, 6:11-20, 7:11-20, 8:11-20, 9:11-20, 10:11-20)',
        // Hinge
        'spans(G, 13:9-22)',
        // Bottom body
        'spans(B, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:9-22, 22:10-21)',
        // Bottom shadow
        'spans(D, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:21-22, 21:21-22)',
        'spans(D, 21:9-22, 22:10-21)',
        // Highlight
        'spans(L, 3:11-20, 14:9-10)',
        // D-pad
        'spans(G, 17:11-13, 16:12-12, 18:12-12)',
        // A button
        'spans(A, 17:19-19)',
        // B button
        'spans(A, 18:17-17)',
        // Start/Select
        'spans(G, 20:14-14, 20:17-17)',
        // Power LED
        'spans(E, 12:10-10)',
      ],
      chars: {
        B: { name: 'shell', role: 'body' },
        D: { name: 'shell_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'shell_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'screen', role: 'eye' },
        G: { name: 'hinge_dpad', role: 'head' },
        A: { name: 'ab_buttons', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 20. TAMAGOTCHI ─────────────────────────────────────────────
    {
      id: 'tamagotchi_32',
      description: '90s Tamagotchi virtual pet with egg-shaped body, pixel screen, and 3 buttons.',
      size: 32,
      draw: [
        // Egg body
        'spans(B, 5:11-20, 6:9-22, 7:8-23, 8:7-24, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:8-23, 18:9-22, 19:10-21)',
        // Shadow
        'spans(D, 8:23-24, 9:23-24, 10:23-24, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24)',
        'spans(D, 17:22-23, 18:21-22, 19:20-21)',
        // Highlight
        'spans(L, 5:13-18, 6:9-10)',
        // Screen bezel
        'spans(S, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21)',
        // Screen LCD
        'spans(E, 8:11-20, 9:11-20, 10:11-20, 11:11-20, 12:11-20)',
        // Three buttons
        'spans(A, 16:10-11)',
        'spans(A, 16:15-16)',
        'spans(A, 16:20-21)',
        // Keychain ring
        'spans(G, 3:15-16, 4:14-14, 4:17-17)',
        // Chain
        'spans(G, 2:15-16)',
        // Crack/pattern decoration
        'pixels(D, 9,8, 11,8, 13,24, 15,7)',
      ],
      chars: {
        B: { name: 'egg_shell', role: 'body' },
        D: { name: 'shell_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'shell_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'screen_frame', role: 'head' },
        E: { name: 'lcd_screen', role: 'eye' },
        A: { name: 'buttons', role: 'accessory' },
        G: { name: 'keychain', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
