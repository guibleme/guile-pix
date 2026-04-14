/**
 * Retro Computing & 90s Tech — Batch 5: Miscellaneous Retro & Modern Tech (32x32 DSL)
 * 20 unique templates: arcade cabinets, CRT TVs, boomboxes, portable devices, modern tech.
 * Neo-SNES style, DB16 palette, 5-value shading.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'retro_tech',
  exportNames: { templates: 'RETRO_COMPUTING_32_BATCH5_TEMPLATES', schemes: 'RETRO_COMPUTING_32_BATCH5_COLOR_SCHEMES' },
  templates: [

    // ─── 1. ARCADE CABINET ─────────────────────────────────────────
    {
      id: 'arcade_cabinet_32',
      description: 'Classic upright arcade cabinet with marquee, CRT screen, and joystick panel.',
      size: 32,
      draw: [
        // Marquee top
        'spans(A, 3:9-22, 4:9-22)',
        // Marquee highlight
        'spans(L, 3:11-20)',
        // Cabinet body
        'spans(B, 5:8-23, 6:8-23, 7:8-23, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23, 21:8-23, 22:8-23, 23:8-23, 24:8-23)',
        // Body shadow
        'spans(D, 6:22-23, 7:22-23, 8:22-23, 9:22-23, 10:22-23, 11:22-23, 12:22-23, 13:22-23, 14:22-23, 15:22-23, 16:22-23, 17:22-23, 18:22-23, 19:22-23, 20:22-23, 21:22-23, 22:22-23, 23:22-23, 24:22-23)',
        // Body highlight
        'spans(L, 5:9-10)',
        // Screen area
        'spans(E, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21)',
        // Screen glare
        'spans(L, 6:11-14, 7:10-12)',
        // Control panel (angled)
        'spans(G, 15:9-22, 16:9-22, 17:9-22)',
        // Joystick
        'spans(G, 14:13-14, 15:13-14)',
        // Buttons
        'spans(A, 16:17-18, 16:20-21)',
        // Coin slot area
        'spans(G, 20:13-18)',
        // Coin slot
        'spans(D, 20:15-16)',
        // Speaker grille
        'spans(D, 22:11-14, 23:11-14)',
        // Legs
        'spans(D, 25:9-11, 25:20-22)',
        // T-molding edge
        'spans(A, 5:8-8, 6:8-8, 7:8-8, 8:8-8, 9:8-8, 10:8-8, 11:8-8, 12:8-8, 13:8-8, 14:8-8)',
      ],
      chars: {
        B: { name: 'cabinet_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'screen', role: 'eye' },
        G: { name: 'control_panel', role: 'head' },
        A: { name: 'marquee_accents', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 2. CRT TV ─────────────────────────────────────────────────
    {
      id: 'crt_tv_32',
      description: 'Old CRT television with rabbit-ear antenna and channel knobs.',
      size: 32,
      draw: [
        // Left antenna
        'spans(B, 2:10-10, 3:11-11, 4:12-12, 5:13-13)',
        // Right antenna
        'spans(B, 2:21-21, 3:20-20, 4:19-19, 5:18-18)',
        // Antenna tips
        'pixels(A, 10,2, 21,2)',
        // TV body
        'spans(B, 6:5-26, 7:4-27, 8:4-27, 9:4-27, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:5-26)',
        // Body shadow
        'spans(D, 8:26-27, 9:26-27, 10:26-27, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27, 19:26-27)',
        'spans(D, 19:4-27, 20:5-26)',
        // Body highlight
        'spans(L, 6:7-24)',
        // Screen
        'spans(E, 8:6-22, 9:6-22, 10:6-22, 11:6-22, 12:6-22, 13:6-22, 14:6-22, 15:6-22, 16:6-22, 17:6-22)',
        // Screen glare
        'spans(L, 8:7-10, 9:6-8)',
        // Channel knobs
        'spans(G, 10:24-25, 13:24-25)',
        // Volume knob
        'spans(G, 16:24-25)',
        // Power button
        'spans(A, 18:24-25)',
        // Speaker grille
        'spans(D, 9:24-25, 11:24-25, 14:24-25)',
        // Stand/feet
        'spans(D, 21:7-9, 21:22-24)',
        // Power LED
        'pixels(A, 25,18)',
      ],
      chars: {
        B: { name: 'tv_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'screen', role: 'eye' },
        G: { name: 'knobs', role: 'head' },
        A: { name: 'power_accents', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 3. BOOMBOX ────────────────────────────────────────────────
    {
      id: 'boombox_32',
      description: '90s boombox/ghetto blaster with dual speakers, cassette deck, and handle.',
      size: 32,
      draw: [
        // Handle
        'spans(G, 5:12-19, 6:11-11, 6:20-20)',
        // Main body
        'spans(B, 7:3-28, 8:3-28, 9:3-28, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28)',
        // Body shadow
        'spans(D, 8:27-28, 9:27-28, 10:27-28, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28, 19:27-28, 20:27-28)',
        'spans(D, 19:3-28, 20:3-28)',
        // Body highlight
        'spans(L, 7:4-27)',
        // Left speaker cone
        'spans(S, 9:5-10, 10:4-11, 11:4-11, 12:4-11, 13:5-10)',
        // Left speaker center
        'spans(D, 10:7-8, 11:7-8)',
        // Right speaker cone
        'spans(S, 9:21-26, 10:20-27, 11:20-27, 12:20-27, 13:21-26)',
        // Right speaker center
        'spans(D, 10:23-24, 11:23-24)',
        // Cassette deck
        'spans(G, 9:13-18, 10:13-18, 11:13-18)',
        // Cassette window
        'spans(E, 10:14-17)',
        // Tuner display
        'spans(E, 14:12-19)',
        // Tuner dial
        'spans(A, 15:12-19)',
        // EQ sliders
        'spans(G, 17:8-9, 17:11-12, 17:14-15, 17:17-18, 17:20-21, 17:23-24)',
        // Bass boost button
        'spans(A, 13:13-14)',
        // Power button
        'spans(A, 8:4-5)',
        // Feet
        'spans(D, 21:5-7, 21:24-26)',
      ],
      chars: {
        B: { name: 'boombox_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'speaker_cones', role: 'head' },
        E: { name: 'displays', role: 'eye' },
        G: { name: 'controls_handle', role: 'belt' },
        A: { name: 'accents_buttons', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 4. WALKMAN ────────────────────────────────────────────────
    {
      id: 'walkman_32',
      description: 'Sony Walkman portable cassette player with headphone jack and belt clip.',
      size: 32,
      draw: [
        // Main body
        'spans(B, 5:10-21, 6:9-22, 7:9-22, 8:9-22, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:9-22, 22:10-21)',
        // Body shadow
        'spans(D, 7:21-22, 8:21-22, 9:21-22, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:21-22, 21:21-22)',
        'spans(D, 21:9-22, 22:10-21)',
        // Body highlight
        'spans(L, 5:12-19)',
        // Cassette window
        'spans(E, 7:11-20, 8:11-20, 9:11-20, 10:11-20, 11:11-20)',
        // Cassette reels
        'spans(G, 8:13-14, 8:17-18, 9:13-14, 9:17-18)',
        // Window frame
        'spans(S, 6:11-20, 12:11-20)',
        // Play button
        'spans(A, 15:11-14)',
        // Stop button
        'spans(A, 15:16-17)',
        // FF/RW buttons
        'spans(G, 15:19-20)',
        // Volume wheel (side)
        'spans(G, 10:9-9, 11:9-9, 12:9-9)',
        // Headphone jack
        'spans(G, 5:15-16)',
        // Belt clip (back)
        'spans(S, 8:22-23, 9:22-23, 10:22-23, 11:22-23, 12:22-23)',
        // Logo area
        'spans(A, 18:12-19)',
        // Hold switch
        'spans(G, 22:14-17)',
      ],
      chars: {
        B: { name: 'walkman_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'cassette_window', role: 'eye' },
        S: { name: 'frame_clip', role: 'head' },
        G: { name: 'controls', role: 'belt' },
        A: { name: 'buttons_logo', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 5. DISCMAN ────────────────────────────────────────────────
    {
      id: 'discman_32',
      description: 'Portable CD player (Discman) with flip lid and LCD display.',
      size: 32,
      draw: [
        // Main body (circular form)
        'spans(B, 7:8-23, 8:6-25, 9:5-26, 10:5-26, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:6-25, 19:8-23)',
        // Body shadow
        'spans(D, 10:25-26, 11:25-26, 12:25-26, 13:25-26, 14:25-26, 15:25-26, 16:25-26, 17:25-26)',
        'spans(D, 17:5-26, 18:6-25, 19:8-23)',
        // Body highlight
        'spans(L, 7:10-21, 8:6-8)',
        // Disc lid outline
        'spans(S, 8:9-22, 9:7-24, 16:7-24, 17:9-22)',
        // Disc lid surface
        'spans(S, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24)',
        // Lid center ring
        'spans(G, 12:13-18, 13:12-19, 14:13-18)',
        // LCD display
        'spans(E, 18:10-16)',
        // Play button
        'spans(A, 18:18-19)',
        // Skip buttons
        'spans(A, 18:21-22)',
        // Stop button
        'spans(G, 18:8-9)',
        // Headphone jack
        'spans(G, 9:5-5)',
        // Anti-skip indicator
        'pixels(A, 24,8)',
        // Hinge
        'spans(D, 7:8-8, 7:23-23)',
      ],
      chars: {
        B: { name: 'player_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'disc_lid', role: 'head' },
        E: { name: 'lcd_display', role: 'eye' },
        G: { name: 'controls', role: 'belt' },
        A: { name: 'buttons', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 6. PAGER ──────────────────────────────────────────────────
    {
      id: 'pager_32',
      description: '90s pager/beeper with small LCD screen and belt clip.',
      size: 32,
      draw: [
        // Pager body
        'spans(B, 6:12-19, 7:11-20, 8:11-20, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:11-20, 19:11-20, 20:11-20, 21:11-20, 22:11-20, 23:12-19)',
        // Body shadow
        'spans(D, 8:19-20, 9:19-20, 10:19-20, 11:19-20, 12:19-20, 13:19-20, 14:19-20, 15:19-20, 16:19-20, 17:19-20, 18:19-20, 19:19-20, 20:19-20, 21:19-20, 22:19-20)',
        'spans(D, 22:11-20, 23:12-19)',
        // Body highlight
        'spans(L, 6:14-17, 7:11-12)',
        // Screen area
        'spans(E, 8:13-18, 9:13-18, 10:13-18, 11:13-18)',
        // Screen bezel
        'spans(S, 7:12-19, 12:12-19)',
        // Notification LED
        'spans(A, 7:15-16)',
        // Arrow buttons
        'spans(G, 14:13-14, 14:17-18)',
        // Select button
        'spans(G, 15:15-16)',
        // Menu button
        'spans(G, 17:13-14)',
        // Back button
        'spans(G, 17:17-18)',
        // Belt clip (side)
        'spans(S, 9:20-21, 10:20-21, 11:20-21, 12:20-21, 13:20-21, 14:20-21)',
        // Speaker holes
        'pixels(D, 14,20, 15,19, 16,20)',
        // Logo
        'spans(A, 20:13-18)',
      ],
      chars: {
        B: { name: 'pager_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'screen', role: 'eye' },
        S: { name: 'bezel_clip', role: 'head' },
        G: { name: 'buttons', role: 'belt' },
        A: { name: 'led_logo', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 7. NOKIA PHONE ────────────────────────────────────────────
    {
      id: 'nokia_phone_32',
      description: 'Nokia 3310 style brick phone with monochrome screen and chunky keypad.',
      size: 32,
      draw: [
        // Phone body
        'spans(B, 3:11-20, 4:10-21, 5:10-21, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:10-21, 21:10-21, 22:10-21, 23:10-21, 24:10-21, 25:11-20)',
        // Body shadow
        'spans(D, 5:20-21, 6:20-21, 7:20-21, 8:20-21, 9:20-21, 10:20-21, 11:20-21, 12:20-21, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21, 19:20-21, 20:20-21, 21:20-21, 22:20-21, 23:20-21, 24:20-21)',
        'spans(D, 24:10-21, 25:11-20)',
        // Body highlight
        'spans(L, 3:13-18, 4:10-11)',
        // Screen
        'spans(E, 5:12-19, 6:12-19, 7:12-19, 8:12-19, 9:12-19, 10:12-19)',
        // Screen bezel
        'spans(S, 4:11-20, 11:11-20)',
        // Nokia logo area
        'spans(S, 3:12-19)',
        // Nav button (round)
        'spans(G, 13:14-17, 14:13-18, 15:14-17)',
        // Left soft key
        'spans(G, 12:12-13)',
        // Right soft key
        'spans(G, 12:18-19)',
        // Keypad row 1
        'spans(G, 17:12-13, 17:15-16, 17:18-19)',
        // Keypad row 2
        'spans(G, 19:12-13, 19:15-16, 19:18-19)',
        // Keypad row 3
        'spans(G, 21:12-13, 21:15-16, 21:18-19)',
        // Bottom row
        'spans(G, 23:12-13, 23:15-16, 23:18-19)',
        // Earpiece
        'spans(D, 4:14-17)',
        // Microphone holes
        'spans(D, 25:14-17)',
      ],
      chars: {
        B: { name: 'phone_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'screen', role: 'eye' },
        S: { name: 'bezel_logo', role: 'head' },
        G: { name: 'keypad', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 8. FLIP PHONE ─────────────────────────────────────────────
    {
      id: 'flip_phone_32',
      description: '2000s flip phone open with color screen and keypad.',
      size: 32,
      draw: [
        // Top half (screen section)
        'spans(B, 2:11-20, 3:10-21, 4:10-21, 5:10-21, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21)',
        // Top shadow
        'spans(D, 4:20-21, 5:20-21, 6:20-21, 7:20-21, 8:20-21, 9:20-21, 10:20-21, 11:20-21)',
        // Top highlight
        'spans(L, 2:13-18)',
        // Screen
        'spans(E, 4:12-19, 5:12-19, 6:12-19, 7:12-19, 8:12-19, 9:12-19, 10:12-19)',
        // Earpiece
        'spans(D, 3:14-17)',
        // Camera lens
        'pixels(G, 13,3)',
        // Hinge
        'spans(G, 13:10-21)',
        // Bottom half (keypad section)
        'spans(B, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:10-21, 21:10-21, 22:10-21, 23:10-21, 24:10-21, 25:11-20)',
        // Bottom shadow
        'spans(D, 15:20-21, 16:20-21, 17:20-21, 18:20-21, 19:20-21, 20:20-21, 21:20-21, 22:20-21, 23:20-21, 24:20-21)',
        'spans(D, 24:10-21, 25:11-20)',
        // Nav pad
        'spans(A, 15:14-17, 16:13-18, 17:14-17)',
        // Soft keys
        'spans(G, 14:12-13, 14:18-19)',
        // Keypad rows
        'spans(G, 19:12-13, 19:15-16, 19:18-19)',
        'spans(G, 21:12-13, 21:15-16, 21:18-19)',
        'spans(G, 23:12-13, 23:15-16, 23:18-19)',
        // Microphone
        'spans(D, 25:14-17)',
      ],
      chars: {
        B: { name: 'phone_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'screen', role: 'eye' },
        G: { name: 'keypad_hinge', role: 'belt' },
        A: { name: 'nav_pad', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 9. MP3 PLAYER ─────────────────────────────────────────────
    {
      id: 'mp3_player_32',
      description: 'Early MP3 player (iPod-style) with click wheel and small screen.',
      size: 32,
      draw: [
        // Body
        'spans(B, 4:10-21, 5:9-22, 6:9-22, 7:9-22, 8:9-22, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:9-22, 22:9-22, 23:9-22, 24:10-21)',
        // Body shadow
        'spans(D, 6:21-22, 7:21-22, 8:21-22, 9:21-22, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:21-22, 21:21-22, 22:21-22, 23:21-22)',
        'spans(D, 23:9-22, 24:10-21)',
        // Body highlight
        'spans(L, 4:12-19, 5:9-10)',
        // Screen
        'spans(E, 6:11-20, 7:11-20, 8:11-20, 9:11-20, 10:11-20, 11:11-20)',
        // Screen bezel
        'spans(S, 5:10-21, 12:10-21)',
        // Click wheel outer
        'spans(G, 15:12-19, 16:11-20, 17:10-21, 18:10-21, 19:11-20, 20:12-19)',
        // Click wheel center button
        'spans(A, 17:14-17, 18:14-17)',
        // Click wheel inner clear
        'spans(B, 16:13-18, 17:12-13, 17:18-19, 18:12-13, 18:18-19, 19:13-18)',
        // Headphone jack
        'spans(G, 4:15-16)',
        // Hold switch
        'spans(G, 4:19-20)',
        // Dock connector
        'spans(G, 24:13-18)',
      ],
      chars: {
        B: { name: 'player_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'screen', role: 'eye' },
        S: { name: 'screen_bezel', role: 'head' },
        G: { name: 'click_wheel', role: 'belt' },
        A: { name: 'center_button', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#757161' },
        belt:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 10. DIGITAL CAMERA ────────────────────────────────────────
    {
      id: 'digital_camera_32',
      description: '90s digital camera with LCD viewfinder and built-in flash.',
      size: 32,
      draw: [
        // Flash bump
        'spans(A, 6:5-8)',
        // Camera body
        'spans(B, 7:4-27, 8:4-27, 9:4-27, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:5-26)',
        // Body shadow
        'spans(D, 8:26-27, 9:26-27, 10:26-27, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27)',
        'spans(D, 18:4-27, 19:5-26)',
        // Body highlight
        'spans(L, 7:5-26)',
        // Lens housing
        'spans(S, 9:8-15, 10:7-16, 11:7-16, 12:7-16, 13:7-16, 14:8-15)',
        // Lens glass
        'spans(E, 10:9-14, 11:8-15, 12:8-15, 13:9-14)',
        // Lens center
        'spans(D, 11:11-12, 12:11-12)',
        // Viewfinder
        'spans(G, 8:21-24, 9:21-24)',
        // LCD screen (back)
        'spans(E, 11:19-26, 12:19-26, 13:19-26, 14:19-26, 15:19-26)',
        // Shutter button
        'spans(A, 7:10-11)',
        // Mode dial
        'spans(G, 7:22-24)',
        // Grip texture
        'spans(G, 9:4-5, 10:4-5, 11:4-5, 12:4-5, 13:4-5)',
        // Memory card slot
        'spans(G, 17:22-25)',
        // Power button
        'spans(A, 7:14-15)',
        // Strap loop
        'spans(G, 8:27-27, 9:27-27)',
      ],
      chars: {
        B: { name: 'camera_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'lens_housing', role: 'head' },
        E: { name: 'lens_screen', role: 'eye' },
        G: { name: 'controls_grip', role: 'belt' },
        A: { name: 'flash_buttons', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 11. HANDHELD TV ───────────────────────────────────────────
    {
      id: 'handheld_tv_32',
      description: 'Portable mini TV with telescopic antenna, small CRT screen, and dial.',
      size: 32,
      draw: [
        // Antenna
        'spans(G, 2:8-8, 3:9-9, 4:10-10, 5:11-11)',
        // Antenna tip
        'pixels(A, 8,2)',
        // TV body
        'spans(B, 6:7-24, 7:6-25, 8:6-25, 9:6-25, 10:6-25, 11:6-25, 12:6-25, 13:6-25, 14:6-25, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:7-24)',
        // Body shadow
        'spans(D, 8:24-25, 9:24-25, 10:24-25, 11:24-25, 12:24-25, 13:24-25, 14:24-25, 15:24-25, 16:24-25, 17:24-25, 18:24-25)',
        'spans(D, 18:6-25, 19:7-24)',
        // Body highlight
        'spans(L, 6:9-22)',
        // Screen
        'spans(E, 8:8-19, 9:8-19, 10:8-19, 11:8-19, 12:8-19, 13:8-19, 14:8-19, 15:8-19, 16:8-19)',
        // Screen glare
        'spans(L, 8:9-12, 9:8-10)',
        // Channel dial
        'spans(G, 9:21-23, 10:21-23, 11:21-23)',
        // Volume dial
        'spans(G, 13:21-23, 14:21-23)',
        // Speaker grille
        'spans(D, 16:21-23, 17:21-23)',
        // Power switch
        'spans(A, 7:21-22)',
        // Handle/grip
        'spans(G, 19:9-12)',
        // Stand foot
        'spans(D, 20:10-14, 20:18-22)',
      ],
      chars: {
        B: { name: 'tv_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'screen', role: 'eye' },
        G: { name: 'dials_antenna', role: 'head' },
        A: { name: 'power_tip', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 12. CALCULATOR ────────────────────────────────────────────
    {
      id: 'calculator_32',
      description: 'Scientific calculator with LCD display, function keys, and solar panel.',
      size: 32,
      draw: [
        // Calculator body
        'spans(B, 3:9-22, 4:8-23, 5:8-23, 6:8-23, 7:8-23, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23, 21:8-23, 22:8-23, 23:8-23, 24:8-23, 25:9-22)',
        // Body shadow
        'spans(D, 5:22-23, 6:22-23, 7:22-23, 8:22-23, 9:22-23, 10:22-23, 11:22-23, 12:22-23, 13:22-23, 14:22-23, 15:22-23, 16:22-23, 17:22-23, 18:22-23, 19:22-23, 20:22-23, 21:22-23, 22:22-23, 23:22-23, 24:22-23)',
        'spans(D, 24:8-23, 25:9-22)',
        // Body highlight
        'spans(L, 3:11-20, 4:8-9)',
        // Solar panel
        'spans(S, 4:10-21, 5:10-21)',
        // LCD screen
        'spans(E, 7:10-21, 8:10-21, 9:10-21)',
        // Screen bezel
        'spans(G, 6:9-22, 10:9-22)',
        // Function keys row 1
        'spans(G, 12:10-11, 12:13-14, 12:16-17, 12:19-20)',
        // Function keys row 2
        'spans(G, 14:10-11, 14:13-14, 14:16-17, 14:19-20)',
        // Number keys row 1
        'spans(A, 16:10-12, 16:14-16, 16:18-20)',
        // Number keys row 2
        'spans(A, 18:10-12, 18:14-16, 18:18-20)',
        // Number keys row 3
        'spans(A, 20:10-12, 20:14-16, 20:18-20)',
        // Zero and decimal
        'spans(A, 22:10-14, 22:16-17)',
        // Operator keys
        'spans(E, 16:21-22, 18:21-22, 20:21-22)',
        // Equals key
        'spans(E, 22:19-22)',
      ],
      chars: {
        B: { name: 'calc_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'screen_ops', role: 'eye' },
        G: { name: 'func_keys', role: 'head' },
        S: { name: 'solar_panel', role: 'belt' },
        A: { name: 'number_keys', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 13. DIGITAL WRISTWATCH ────────────────────────────────────
    {
      id: 'wristwatch_digital_32',
      description: 'Digital Casio-style wristwatch with LCD time display and rubber strap.',
      size: 32,
      draw: [
        // Top strap
        'spans(S, 2:12-19, 3:12-19, 4:12-19, 5:12-19, 6:12-19)',
        // Strap holes
        'pixels(D, 15,3, 16,4, 15,5)',
        // Watch case top
        'spans(B, 7:10-21, 8:9-22)',
        // Watch case main
        'spans(B, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22)',
        // Watch case bottom
        'spans(B, 19:9-22, 20:10-21)',
        // Case shadow
        'spans(D, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22)',
        'spans(D, 19:9-22, 20:10-21)',
        // Case highlight
        'spans(L, 7:12-19, 8:9-10)',
        // LCD display
        'spans(E, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20)',
        // Display bezel
        'spans(G, 9:10-21, 15:10-21)',
        // Side buttons
        'spans(G, 11:8-8, 14:8-8, 11:23-23, 14:23-23)',
        // Bottom strap
        'spans(S, 21:12-19, 22:12-19, 23:12-19, 24:12-19, 25:12-19)',
        // Buckle
        'spans(A, 25:13-18, 26:14-17)',
        // Light button
        'spans(A, 17:15-16)',
        // Mode label
        'spans(G, 16:12-14, 16:17-19)',
      ],
      chars: {
        B: { name: 'watch_case', role: 'body' },
        D: { name: 'case_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'case_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'lcd_display', role: 'eye' },
        G: { name: 'bezel_buttons', role: 'head' },
        S: { name: 'rubber_strap', role: 'belt' },
        A: { name: 'buckle_light', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 14. LASERDISC ─────────────────────────────────────────────
    {
      id: 'laser_disc_32',
      description: 'LaserDisc large format optical disc with iridescent surface and center hole.',
      size: 32,
      draw: [
        // Disc outer ring
        'spans(B, 4:12-19, 5:9-22, 6:7-24, 7:6-25, 8:5-26, 9:4-27, 10:4-27, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:4-27, 20:4-27, 21:5-26, 22:6-25, 23:7-24, 24:9-22, 25:12-19)',
        // Disc shadow
        'spans(D, 10:26-27, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28, 19:26-27, 20:26-27, 21:25-26, 22:24-25)',
        'spans(D, 22:6-25, 23:7-24, 24:9-22, 25:12-19)',
        // Iridescent highlight band
        'spans(L, 4:14-17, 5:9-12, 6:7-9, 7:6-7, 8:5-6, 9:4-5)',
        // Data groove area (subtle ring)
        'spans(S, 9:8-10, 9:21-23, 14:4-5, 14:26-27, 19:8-10, 19:21-23)',
        // Center label area
        'spans(A, 11:11-20, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:11-20)',
        // Label text
        'spans(G, 13:11-20, 15:11-20)',
        // Center hole
        'spans(E, 13:14-17, 14:14-17)',
        // Rainbow shimmer pixels
        'pixels(A, 8,10, 10,7, 20,7, 22,10)',
      ],
      chars: {
        B: { name: 'disc_surface', role: 'body' },
        D: { name: 'disc_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'disc_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'data_grooves', role: 'head' },
        A: { name: 'center_label', role: 'accessory' },
        G: { name: 'label_text', role: 'belt' },
        E: { name: 'center_hole', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
      },
    },

    // ─── 15. MINIDISC PLAYER ───────────────────────────────────────
    {
      id: 'minidisc_32',
      description: 'Sony MiniDisc player with disc slot, jog dial, and remote port.',
      size: 32,
      draw: [
        // Player body
        'spans(B, 7:8-23, 8:7-24, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:8-23)',
        // Body shadow
        'spans(D, 9:23-24, 10:23-24, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24)',
        'spans(D, 18:7-24, 19:8-23)',
        // Body highlight
        'spans(L, 7:10-21, 8:7-9)',
        // Disc slot lid
        'spans(S, 8:9-18, 9:9-18, 10:9-18, 11:9-18, 12:9-18)',
        // Disc window
        'spans(E, 9:11-16, 10:10-17, 11:10-17)',
        // Lid latch
        'spans(G, 8:16-17)',
        // Jog dial
        'spans(G, 11:20-22, 12:19-23, 13:19-23, 14:20-22)',
        // Jog center
        'pixels(A, 21,12, 21,13)',
        // LCD display
        'spans(E, 14:9-17, 15:9-17)',
        // Play/stop buttons
        'spans(A, 17:10-11, 17:13-14, 17:16-17)',
        // Volume buttons
        'spans(G, 17:20-21, 17:23-23)',
        // Headphone port
        'spans(G, 7:12-13)',
        // Remote port
        'spans(G, 7:20-21)',
        // Hold switch
        'spans(G, 19:11-14)',
      ],
      chars: {
        B: { name: 'player_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'disc_lid', role: 'head' },
        E: { name: 'window_lcd', role: 'eye' },
        G: { name: 'controls', role: 'belt' },
        A: { name: 'buttons', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 16. SMART SPEAKER ─────────────────────────────────────────
    {
      id: 'smart_speaker_32',
      description: 'Modern cylindrical smart speaker with fabric grille and LED ring.',
      size: 32,
      draw: [
        // LED ring top
        'spans(A, 5:11-20, 6:10-21)',
        // Top cap
        'spans(B, 7:10-21, 8:10-21)',
        // Top highlight
        'spans(L, 7:12-19)',
        // Fabric body
        'spans(S, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22)',
        // Fabric shadow
        'spans(D, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:21-22)',
        'spans(D, 19:9-22, 20:9-22)',
        // Fabric texture lines
        'spans(G, 11:10-11, 13:10-11, 15:10-11, 17:10-11, 19:10-11)',
        // Base
        'spans(B, 21:10-21, 22:10-21)',
        // Base shadow
        'spans(D, 22:10-21)',
        // Base highlight
        'spans(L, 21:11-20)',
        // Mute button (top)
        'spans(G, 6:14-17)',
        // Volume buttons
        'spans(G, 7:11-12, 7:19-20)',
        // Light ring glow effect
        'pixels(A, 10,5, 21,5, 10,6, 21,6)',
      ],
      chars: {
        B: { name: 'speaker_cap', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'fabric_body', role: 'head' },
        G: { name: 'buttons_texture', role: 'belt' },
        A: { name: 'led_ring', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 17. VR HEADSET ────────────────────────────────────────────
    {
      id: 'vr_headset_32',
      description: 'Modern VR headset with visor, head strap, and front cameras.',
      size: 32,
      draw: [
        // Head strap top
        'spans(S, 5:8-23, 6:7-24)',
        // Main visor
        'spans(B, 7:5-26, 8:4-27, 9:4-27, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:5-26, 15:6-25)',
        // Visor shadow
        'spans(D, 9:26-27, 10:26-27, 11:26-27, 12:26-27, 13:26-27, 14:25-26)',
        'spans(D, 14:5-26, 15:6-25)',
        // Visor highlight
        'spans(L, 7:7-24)',
        // Front lens area (dark visor face)
        'spans(E, 9:6-25, 10:6-25, 11:6-25, 12:6-25)',
        // Front cameras
        'spans(G, 8:8-9, 8:22-23)',
        // Nose gap
        'spans(D, 13:14-17)',
        // Side strap connectors
        'spans(G, 10:4-5, 10:26-27)',
        // IPD slider
        'spans(G, 13:10-11)',
        // Power button
        'spans(A, 7:25-26)',
        // Side straps going back
        'spans(S, 10:3-4, 11:2-3, 10:27-28, 11:28-29)',
        // Volume rocker
        'spans(G, 13:20-21)',
        // Padding rim
        'spans(S, 14:8-13, 14:18-23)',
        // Front tracking dots
        'pixels(G, 12,7, 18,7, 24,7, 7,12, 13,12, 19,12, 25,12)',
      ],
      chars: {
        B: { name: 'visor_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'visor_face', role: 'eye' },
        S: { name: 'straps_padding', role: 'head' },
        G: { name: 'cameras_controls', role: 'belt' },
        A: { name: 'power_button', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 18. DRONE ─────────────────────────────────────────────────
    {
      id: 'drone_32',
      description: 'Quadcopter drone top view with four rotors, camera gimbal, and LED indicators.',
      size: 32,
      draw: [
        // Center body
        'spans(B, 12:12-19, 13:11-20, 14:11-20, 15:11-20, 16:12-19)',
        // Body highlight
        'spans(L, 12:14-17)',
        // Body shadow
        'spans(D, 15:11-20, 16:12-19)',
        // Arms to rotors
        'spans(G, 10:9-11, 11:10-12)',
        'spans(G, 10:20-22, 11:19-21)',
        'spans(G, 17:10-12, 18:9-11)',
        'spans(G, 17:19-21, 18:20-22)',
        // Front-left rotor
        'spans(S, 6:5-12, 7:4-13, 8:4-13, 9:5-12)',
        // Front-right rotor
        'spans(S, 6:19-26, 7:18-27, 8:18-27, 9:19-26)',
        // Back-left rotor
        'spans(S, 19:5-12, 20:4-13, 21:4-13, 22:5-12)',
        // Back-right rotor
        'spans(S, 19:19-26, 20:18-27, 21:18-27, 22:19-26)',
        // Rotor center hubs
        'spans(G, 7:8-9, 8:8-9)',
        'spans(G, 7:22-23, 8:22-23)',
        'spans(G, 20:8-9, 21:8-9)',
        'spans(G, 20:22-23, 21:22-23)',
        // Camera (bottom center)
        'spans(E, 14:14-17, 15:14-17)',
        // Front LED indicators
        'spans(A, 6:8-9, 6:22-23)',
        // Back LED indicators
        'spans(A, 22:8-9, 22:22-23)',
        // Landing gear hints
        'spans(D, 13:10-10, 13:21-21, 15:10-10, 15:21-21)',
      ],
      chars: {
        B: { name: 'drone_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'rotors', role: 'head' },
        G: { name: 'arms_hubs', role: 'belt' },
        E: { name: 'camera', role: 'eye' },
        A: { name: 'leds', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#346524', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 19. POWER BANK ────────────────────────────────────────────
    {
      id: 'power_bank_32',
      description: 'Portable battery charger with LED charge indicators and USB ports.',
      size: 32,
      draw: [
        // Main body
        'spans(B, 5:9-22, 6:8-23, 7:8-23, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23, 21:8-23, 22:8-23, 23:9-22)',
        // Body shadow
        'spans(D, 7:22-23, 8:22-23, 9:22-23, 10:22-23, 11:22-23, 12:22-23, 13:22-23, 14:22-23, 15:22-23, 16:22-23, 17:22-23, 18:22-23, 19:22-23, 20:22-23, 21:22-23, 22:22-23)',
        'spans(D, 22:8-23, 23:9-22)',
        // Body highlight
        'spans(L, 5:11-20, 6:8-9)',
        // Charge LED indicators (4 dots)
        'spans(A, 8:12-13, 8:15-16, 8:18-19)',
        'spans(E, 8:12-12, 8:15-15, 8:18-18)',
        // Check button
        'spans(G, 10:15-16)',
        // USB-A output port
        'spans(G, 23:11-14)',
        // USB-A output port 2
        'spans(G, 23:17-20)',
        // USB-C input port
        'spans(G, 5:14-17)',
        // Capacity label
        'spans(S, 14:11-20, 15:11-20)',
        // Brand logo
        'spans(S, 18:12-19)',
        // Corner radius details
        'spans(L, 5:10-10, 5:21-21)',
        // Rubber grip strip
        'spans(D, 7:8-8, 8:8-8, 9:8-8, 10:8-8, 11:8-8, 12:8-8, 13:8-8, 14:8-8)',
        // Power indicator ring
        'spans(A, 9:15-16, 11:14-14, 11:17-17, 10:14-14, 10:17-17)',
      ],
      chars: {
        B: { name: 'bank_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'ports_button', role: 'head' },
        S: { name: 'labels', role: 'belt' },
        A: { name: 'led_ring', role: 'accessory' },
        E: { name: 'led_active', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#346524', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 20. RETRO TV REMOTE ───────────────────────────────────────
    {
      id: 'retro_tv_remote_32',
      description: 'TV remote control with rubber buttons, channel pad, and IR emitter.',
      size: 32,
      draw: [
        // Remote body
        'spans(B, 3:12-19, 4:11-20, 5:11-20, 6:11-20, 7:11-20, 8:11-20, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:11-20, 19:11-20, 20:11-20, 21:11-20, 22:11-20, 23:11-20, 24:11-20, 25:12-19)',
        // Body shadow
        'spans(D, 5:19-20, 6:19-20, 7:19-20, 8:19-20, 9:19-20, 10:19-20, 11:19-20, 12:19-20, 13:19-20, 14:19-20, 15:19-20, 16:19-20, 17:19-20, 18:19-20, 19:19-20, 20:19-20, 21:19-20, 22:19-20, 23:19-20, 24:19-20)',
        'spans(D, 24:11-20, 25:12-19)',
        // Body highlight
        'spans(L, 3:14-17, 4:11-12)',
        // IR emitter window
        'spans(E, 3:13-18)',
        // Power button (red, top)
        'spans(A, 5:14-17, 6:14-17)',
        // Channel up/down
        'spans(G, 8:13-14, 10:13-14)',
        // Channel label
        'spans(D, 9:13-14)',
        // Volume up/down
        'spans(G, 8:17-18, 10:17-18)',
        // Volume label
        'spans(D, 9:17-18)',
        // Number pad row 1
        'spans(G, 13:12-13, 13:15-16, 13:18-19)',
        // Number pad row 2
        'spans(G, 15:12-13, 15:15-16, 15:18-19)',
        // Number pad row 3
        'spans(G, 17:12-13, 17:15-16, 17:18-19)',
        // Zero and enter
        'spans(G, 19:12-13, 19:15-16, 19:18-19)',
        // Mute button
        'spans(A, 21:15-16)',
        // Input/source button
        'spans(G, 22:13-14)',
        // Menu button
        'spans(G, 22:17-18)',
        // Battery bump (back)
        'spans(D, 24:13-18)',
      ],
      chars: {
        B: { name: 'remote_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'rubber_buttons', role: 'head' },
        A: { name: 'power_mute', role: 'accessory' },
        E: { name: 'ir_emitter', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

  ],
};

export default batch;
