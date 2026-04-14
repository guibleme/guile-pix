/**
 * Retro Computing & 90s Tech — Batch 3: 90s PC & Peripherals (32x32 DSL)
 * 20 unique templates: CRT monitors, keyboards, mice, printers, speakers.
 * Neo-SNES style, DB16 palette, 5-value shading.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'retro_tech',
  exportNames: { templates: 'RETRO_COMPUTING_32_BATCH3_TEMPLATES', schemes: 'RETRO_COMPUTING_32_BATCH3_COLOR_SCHEMES' },
  templates: [

    // ─── 1. CRT MONITOR ─────────────────────────────────────────────
    {
      id: 'crt_monitor_32',
      description: 'Classic 90s CRT computer monitor with thick bezel and power LED.',
      size: 32,
      draw: [
        // Outer shell
        'spans(B, 3:5-26, 4:4-27, 5:4-27, 6:4-27, 7:4-27, 8:4-27, 9:4-27, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:5-26)',
        // Shadow
        'spans(D, 5:26-27, 6:26-27, 7:26-27, 8:26-27, 9:26-27, 10:26-27, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27)',
        'spans(D, 18:4-27, 19:5-26)',
        // Highlight
        'spans(L, 3:7-24)',
        // Screen
        'spans(E, 5:7-24, 6:7-24, 7:7-24, 8:7-24, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24)',
        // Screen glare
        'spans(L, 5:8-12, 6:7-9)',
        // Power LED
        'spans(A, 18:6-6)',
        // Buttons
        'spans(G, 18:22-23, 18:25-25)',
        // Logo plate
        'spans(G, 17:12-19)',
        // Stand
        'spans(B, 20:10-21, 21:10-21)',
        // Stand base
        'spans(D, 22:8-23, 23:8-23)',
        // Stand highlight
        'spans(L, 20:11-20)',
      ],
      chars: {
        B: { name: 'monitor_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'screen', role: 'eye' },
        G: { name: 'buttons_logo', role: 'head' },
        A: { name: 'power_led', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ─── 2. 90s KEYBOARD ────────────────────────────────────────────
    {
      id: 'keyboard_90s_32',
      description: 'Beige 90s mechanical keyboard with function keys and numpad.',
      size: 32,
      draw: [
        // Keyboard body
        'spans(B, 11:2-29, 12:2-29, 13:2-29, 14:2-29, 15:2-29, 16:2-29, 17:2-29, 18:2-29, 19:2-29, 20:2-29)',
        // Shadow
        'spans(D, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29)',
        'spans(D, 19:2-29, 20:2-29)',
        // Highlight
        'spans(L, 11:3-28)',
        // Function keys row
        'spans(G, 12:4-5, 12:7-8, 12:10-11, 12:13-14, 12:16-17, 12:19-20, 12:22-23, 12:25-26)',
        // Main key rows
        'spans(G, 14:4-27, 15:4-27, 16:4-27, 17:4-27)',
        // Spacebar
        'spans(A, 18:10-21)',
        // Numpad area
        'spans(G, 14:24-27, 15:24-27, 16:24-27, 17:24-27, 18:24-27)',
        // Arrow keys
        'spans(G, 18:4-5, 18:7-7, 18:8-9)',
        // Escape key (red)
        'spans(E, 12:4-5)',
        // Enter key
        'spans(A, 16:22-23)',
        // LED indicators
        'pixels(A, 4,11, 6,11, 8,11)',
        // Cable
        'spans(B, 10:15-16)',
      ],
      chars: {
        B: { name: 'keyboard_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'keycaps', role: 'head' },
        A: { name: 'special_keys', role: 'accessory' },
        E: { name: 'escape_key', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 3. BALL MOUSE ──────────────────────────────────────────────
    {
      id: 'ball_mouse_32',
      description: 'Classic 90s ball mouse with two buttons and scroll wheel.',
      size: 32,
      draw: [
        // Mouse body
        'spans(B, 7:11-20, 8:10-21, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:10-21, 17:11-20)',
        // Shadow
        'spans(D, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:20-21)',
        'spans(D, 16:10-21, 17:11-20)',
        // Highlight
        'spans(L, 7:13-18, 8:10-12)',
        // Left button
        'spans(G, 7:11-15, 8:10-15, 9:9-15)',
        // Right button
        'spans(G, 7:16-20, 8:16-21, 9:16-22)',
        // Button divider
        'spans(D, 7:15-16, 8:15-16, 9:15-16)',
        // Scroll wheel
        'spans(A, 10:15-16)',
        // Ball underneath hint
        'spans(S, 14:14-17, 15:14-17)',
        // Cable
        'spans(B, 6:15-16, 5:15-16, 4:15-16)',
        // Logo
        'pixels(A, 15,12)',
      ],
      chars: {
        B: { name: 'mouse_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'buttons', role: 'head' },
        A: { name: 'scroll_wheel', role: 'accessory' },
        S: { name: 'ball_area', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ─── 4. DOT MATRIX PRINTER ──────────────────────────────────────
    {
      id: 'dot_matrix_printer_32',
      description: '90s dot matrix printer with paper feed tray and continuous paper.',
      size: 32,
      draw: [
        // Paper sticking out top
        'spans(A, 4:10-21, 5:10-21, 6:10-21)',
        // Paper text
        'spans(E, 5:12-19)',
        // Printer body
        'spans(B, 7:4-27, 8:4-27, 9:4-27, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27)',
        // Shadow
        'spans(D, 8:26-27, 9:26-27, 10:26-27, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27)',
        'spans(D, 17:4-27, 18:4-27)',
        // Highlight
        'spans(L, 7:5-26)',
        // Paper feed slot
        'spans(S, 7:9-22)',
        // Control buttons
        'spans(G, 9:5-7, 9:9-11)',
        // Power button
        'spans(G, 9:24-25)',
        // LED
        'spans(E, 9:22-22)',
        // Paper guide
        'spans(G, 7:10-10, 7:21-21)',
        // Vent grilles
        'spans(D, 12:5-8, 14:5-8, 16:5-8)',
        // Paper output tray
        'spans(B, 18:8-23, 19:8-23)',
        'spans(D, 19:8-23)',
      ],
      chars: {
        B: { name: 'printer_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'paper', role: 'accessory' },
        E: { name: 'text_led', role: 'eye' },
        G: { name: 'buttons_guides', role: 'head' },
        S: { name: 'feed_slot', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
      },
    },

    // ─── 5. DESKTOP PC TOWER (90s) ──────────────────────────────────
    {
      id: 'desktop_pc_tower_90s_32',
      description: 'Beige 90s desktop PC tower with floppy drive, CD-ROM, and power button.',
      size: 32,
      draw: [
        // Tower body
        'spans(B, 3:8-23, 4:8-23, 5:8-23, 6:8-23, 7:8-23, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23, 21:8-23, 22:8-23, 23:8-23, 24:8-23)',
        // Shadow
        'spans(D, 4:22-23, 5:22-23, 6:22-23, 7:22-23, 8:22-23, 9:22-23, 10:22-23, 11:22-23, 12:22-23, 13:22-23, 14:22-23, 15:22-23, 16:22-23, 17:22-23, 18:22-23, 19:22-23, 20:22-23, 21:22-23, 22:22-23, 23:22-23, 24:22-23)',
        'spans(D, 23:8-23, 24:8-23)',
        // Highlight
        'spans(L, 3:9-22)',
        // Floppy drive bay
        'spans(G, 5:10-21, 6:10-21)',
        // Floppy slot
        'spans(S, 5:12-19)',
        // CD-ROM drive bay
        'spans(G, 8:10-21, 9:10-21, 10:10-21)',
        // CD tray line
        'spans(S, 9:11-20)',
        // CD eject button
        'spans(A, 10:20-20)',
        // Power button
        'spans(A, 20:14-17, 21:14-17)',
        // Power LED
        'spans(E, 19:15-15)',
        // HDD LED
        'spans(E, 19:17-17)',
        // Reset button
        'spans(G, 22:15-16)',
        // Vent grilles
        'spans(D, 14:9-10, 16:9-10, 18:9-10)',
        // Brand logo
        'spans(G, 13:13-18)',
        // Feet
        'spans(D, 25:9-11, 25:20-22)',
      ],
      chars: {
        B: { name: 'tower_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'drive_bays', role: 'head' },
        S: { name: 'drive_slots', role: 'belt' },
        A: { name: 'buttons', role: 'accessory' },
        E: { name: 'leds', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ─── 6. 56K MODEM ───────────────────────────────────────────────
    {
      id: 'modem_56k_32',
      description: 'External 56K dial-up modem with blinking LED indicators.',
      size: 32,
      draw: [
        // Modem body
        'spans(B, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26)',
        // Shadow
        'spans(D, 12:25-26, 13:25-26, 14:25-26, 15:25-26, 16:25-26, 17:25-26)',
        'spans(D, 16:5-26, 17:5-26)',
        // Highlight
        'spans(L, 11:6-25)',
        // LED row
        'spans(E, 12:7-7, 12:9-9, 12:11-11, 12:13-13, 12:15-15, 12:17-17, 12:19-19, 12:21-21)',
        // LED labels
        'spans(G, 13:7-7, 13:9-9, 13:11-11, 13:13-13, 13:15-15, 13:17-17, 13:19-19, 13:21-21)',
        // Logo
        'spans(G, 15:12-19)',
        // Phone jack (back)
        'spans(G, 14:24-25)',
        // Serial port (back)
        'spans(G, 14:6-8)',
        // Power jack
        'spans(G, 17:24-25)',
        // Feet
        'spans(D, 18:7-8, 18:23-24)',
      ],
      chars: {
        B: { name: 'modem_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'leds', role: 'eye' },
        G: { name: 'labels_ports', role: 'head' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 7. PC SPEAKER ──────────────────────────────────────────────
    {
      id: 'pc_speaker_90s_32',
      description: '90s desktop PC speaker — small beige box with front grille.',
      size: 32,
      draw: [
        // Speaker body
        'spans(B, 5:10-21, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:10-21)',
        // Shadow
        'spans(D, 6:20-21, 7:20-21, 8:20-21, 9:20-21, 10:20-21, 11:20-21, 12:20-21, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21, 19:20-21, 20:20-21)',
        'spans(D, 19:10-21, 20:10-21)',
        // Highlight
        'spans(L, 5:11-20)',
        // Speaker grille (horizontal lines)
        'spans(G, 7:12-19, 9:12-19, 11:12-19, 13:12-19, 15:12-19)',
        // Speaker cone (big)
        'spans(S, 8:13-18, 9:12-19, 10:12-19, 11:13-18)',
        // Cone center
        'pixels(A, 15,10, 16,10)',
        // Tweeter (small)
        'spans(S, 14:14-17, 15:14-17)',
        // Volume knob
        'spans(A, 18:15-16)',
        // Power LED
        'spans(E, 6:11-11)',
        // Cable
        'spans(B, 20:15-16, 21:15-16)',
        // Brand logo
        'spans(G, 17:13-18)',
      ],
      chars: {
        B: { name: 'speaker_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'grille', role: 'head' },
        S: { name: 'speaker_cone', role: 'belt' },
        A: { name: 'controls', role: 'accessory' },
        E: { name: 'power_led', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ─── 8. JOYSTICK (PC) ───────────────────────────────────────────
    {
      id: 'joystick_pc_32',
      description: 'Classic PC flight joystick with stick, trigger, and base buttons.',
      size: 32,
      draw: [
        // Stick top grip
        'spans(B, 3:14-17, 4:13-18, 5:13-18, 6:14-17)',
        // Stick highlight
        'spans(L, 3:15-16)',
        // Trigger button
        'spans(A, 5:13-13)',
        // Top button
        'spans(A, 3:14-14)',
        // Stick shaft
        'spans(B, 7:15-16, 8:15-16, 9:15-16, 10:15-16, 11:15-16)',
        // Shaft shadow
        'spans(D, 7:16-16, 8:16-16, 9:16-16, 10:16-16, 11:16-16)',
        // Base body
        'spans(G, 12:6-25, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:6-25)',
        // Base shadow
        'spans(D, 14:25-26, 15:25-26, 16:25-26, 17:25-26)',
        'spans(D, 17:5-26, 18:6-25)',
        // Base highlight
        'spans(L, 12:8-23)',
        // Base buttons
        'spans(E, 14:8-9, 14:12-13)',
        // Throttle slider
        'spans(A, 15:22-24, 16:22-24)',
        // Suction cups
        'spans(D, 19:7-8, 19:23-24)',
        // Cable
        'spans(B, 18:15-16, 19:15-16)',
      ],
      chars: {
        B: { name: 'stick', role: 'body' },
        D: { name: 'stick_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'stick_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'base', role: 'head' },
        A: { name: 'trigger_buttons', role: 'accessory' },
        E: { name: 'base_buttons', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 9. SCANNER (FLATBED) ───────────────────────────────────────
    {
      id: 'flatbed_scanner_32',
      description: '90s flatbed scanner with glass plate and scanning light bar.',
      size: 32,
      draw: [
        // Scanner body
        'spans(B, 9:4-27, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27)',
        // Shadow
        'spans(D, 10:26-27, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27, 19:26-27)',
        'spans(D, 18:4-27, 19:4-27)',
        // Highlight
        'spans(L, 9:5-26)',
        // Glass plate (lid open slightly)
        'spans(S, 9:5-26, 10:5-26)',
        // Scanning light bar
        'spans(E, 13:6-25)',
        // Document on glass
        'spans(A, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23)',
        // Buttons
        'spans(G, 17:6-8, 17:10-12, 17:14-16)',
        // Power LED
        'spans(E, 17:24-24)',
        // Hinge
        'spans(D, 9:4-4, 9:27-27)',
        // Cable
        'spans(B, 19:14-17)',
      ],
      chars: {
        B: { name: 'scanner_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'glass_plate', role: 'head' },
        A: { name: 'document', role: 'accessory' },
        G: { name: 'buttons', role: 'belt' },
        E: { name: 'scan_light', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 10. WEBCAM (90s) ───────────────────────────────────────────
    {
      id: 'webcam_90s_32',
      description: '90s ball-shaped webcam on a flexible clip mount.',
      size: 32,
      draw: [
        // Camera ball
        'spans(B, 5:12-19, 6:10-21, 7:9-22, 8:9-22, 9:9-22, 10:10-21, 11:12-19)',
        // Ball shadow
        'spans(D, 8:21-22, 9:21-22, 10:20-21)',
        'spans(D, 10:10-21, 11:12-19)',
        // Ball highlight
        'spans(L, 5:14-17, 6:10-12)',
        // Lens
        'spans(S, 7:14-17, 8:13-18, 9:14-17)',
        // Lens center
        'spans(E, 8:15-16)',
        // Lens ring
        'spans(G, 7:13-13, 7:18-18, 9:13-13, 9:18-18)',
        // LED
        'spans(A, 6:15-15)',
        // Neck
        'spans(G, 12:15-16, 13:15-16)',
        // Flexible joint
        'spans(G, 14:14-17)',
        // Base clip
        'spans(B, 15:10-21, 16:10-21, 17:10-21)',
        // Base shadow
        'spans(D, 16:20-21, 17:20-21, 17:10-21)',
        // Clip jaw
        'spans(G, 18:10-12, 18:19-21)',
      ],
      chars: {
        B: { name: 'camera_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'lens_housing', role: 'head' },
        E: { name: 'lens_center', role: 'eye' },
        G: { name: 'mount_ring', role: 'belt' },
        A: { name: 'led', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 11. ZIP DRIVE ──────────────────────────────────────────────
    {
      id: 'zip_drive_32',
      description: 'Iomega Zip drive — portable external storage with disk slot.',
      size: 32,
      draw: [
        // Body
        'spans(B, 10:6-25, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:6-25)',
        // Shadow
        'spans(D, 11:25-26, 12:25-26, 13:25-26, 14:25-26, 15:25-26, 16:25-26)',
        'spans(D, 16:5-26, 17:6-25)',
        // Highlight
        'spans(L, 10:8-23)',
        // Disk slot
        'spans(S, 11:9-22)',
        // Eject button
        'spans(A, 12:23-24)',
        // Logo
        'spans(A, 14:10-18)',
        // LED
        'spans(E, 12:7-7)',
        // Feet
        'spans(D, 18:7-9, 18:22-24)',
        // Cable port
        'spans(G, 15:24-25)',
      ],
      chars: {
        B: { name: 'drive_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'disk_slot', role: 'head' },
        A: { name: 'button_logo', role: 'accessory' },
        E: { name: 'led', role: 'eye' },
        G: { name: 'port', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 12. CD-ROM DRIVE (EXTERNAL) ────────────────────────────────
    {
      id: 'cdrom_drive_32',
      description: 'External CD-ROM drive with tray and headphone jack.',
      size: 32,
      draw: [
        // Body
        'spans(B, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27)',
        // Shadow
        'spans(D, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27)',
        'spans(D, 17:4-27, 18:4-27)',
        // Highlight
        'spans(L, 10:5-26)',
        // Tray line
        'spans(S, 11:7-24)',
        // Tray handle notch
        'spans(S, 12:14-17)',
        // Eject button
        'spans(A, 13:24-25)',
        // Headphone jack
        'spans(G, 13:6-7)',
        // Volume dial
        'spans(G, 13:9-10)',
        // LED
        'spans(E, 11:6-6)',
        // Logo
        'spans(G, 15:12-19)',
        // Feet
        'spans(D, 19:6-8, 19:23-25)',
        // Cable
        'spans(B, 18:15-16)',
      ],
      chars: {
        B: { name: 'drive_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'tray', role: 'head' },
        A: { name: 'eject', role: 'accessory' },
        G: { name: 'controls', role: 'belt' },
        E: { name: 'led', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ─── 13. TRACKBALL MOUSE ────────────────────────────────────────
    {
      id: 'trackball_mouse_32',
      description: '90s trackball mouse with large exposed ball and 3 buttons.',
      size: 32,
      draw: [
        // Body
        'spans(B, 8:8-23, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:8-23, 17:9-22)',
        // Shadow
        'spans(D, 10:23-24, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:22-23)',
        'spans(D, 16:8-23, 17:9-22)',
        // Highlight
        'spans(L, 8:10-21)',
        // Trackball
        'spans(A, 10:12-19, 11:11-20, 12:11-20, 13:11-20, 14:12-19)',
        // Ball highlight
        'pixels(L, 13,11, 14,11)',
        // Left button
        'spans(G, 8:8-12, 9:7-12)',
        // Middle button
        'spans(G, 8:13-18, 9:13-18)',
        // Right button
        'spans(G, 8:19-23, 9:19-24)',
        // Button dividers
        'spans(D, 8:12-13, 9:12-13, 8:18-19, 9:18-19)',
        // Cable
        'spans(B, 7:15-16)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'buttons', role: 'head' },
        A: { name: 'trackball', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 14. GAMEPAD (PC/USB) ───────────────────────────────────────
    {
      id: 'usb_gamepad_32',
      description: 'Generic USB PC gamepad with D-pad and colored face buttons.',
      size: 32,
      draw: [
        // Left grip
        'spans(B, 12:3-8, 13:2-9, 14:2-9, 15:2-9, 16:3-8)',
        // Right grip
        'spans(B, 12:23-28, 13:22-29, 14:22-29, 15:22-29, 16:23-28)',
        // Center body
        'spans(B, 10:8-23, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:8-23)',
        // Shadow
        'spans(D, 13:28-29, 14:28-29, 15:28-29)',
        'spans(D, 15:2-28, 16:3-28)',
        // Highlight
        'spans(L, 10:10-21)',
        // D-pad
        'spans(G, 13:4-6, 12:5-5, 14:5-5)',
        // Face buttons (4 colors)
        'spans(A, 11:23-24)',
        'spans(E, 12:22-22, 12:25-25)',
        'spans(A, 13:23-24)',
        // Start/Select
        'spans(G, 14:13-14, 14:17-18)',
        // Analog sticks
        'spans(G, 13:10-11, 13:20-21)',
        // Shoulder hints
        'spans(D, 10:8-10, 10:21-23)',
        // Cable
        'spans(B, 10:15-16, 9:15-16)',
      ],
      chars: {
        B: { name: 'gamepad_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'dpad_misc', role: 'head' },
        A: { name: 'face_buttons_a', role: 'accessory' },
        E: { name: 'face_buttons_b', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 15. FLOPPY DISK 5.25" ──────────────────────────────────────
    {
      id: 'floppy_disk_525_32',
      description: '5.25-inch floppy disk — flexible with oval read window.',
      size: 32,
      draw: [
        // Disk envelope
        'spans(B, 4:6-25, 5:6-25, 6:6-25, 7:6-25, 8:6-25, 9:6-25, 10:6-25, 11:6-25, 12:6-25, 13:6-25, 14:6-25, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:6-25, 20:6-25, 21:6-25, 22:6-25, 23:6-25)',
        // Shadow
        'spans(D, 5:24-25, 6:24-25, 7:24-25, 8:24-25, 9:24-25, 10:24-25, 11:24-25, 12:24-25, 13:24-25, 14:24-25, 15:24-25, 16:24-25, 17:24-25, 18:24-25, 19:24-25, 20:24-25, 21:24-25, 22:24-25, 23:24-25)',
        'spans(D, 22:6-25, 23:6-25)',
        // Highlight
        'spans(L, 4:7-24)',
        // Center hub hole
        'spans(S, 8:13-18, 9:12-19, 10:12-19, 11:13-18)',
        // Hub ring
        'spans(G, 9:13-13, 9:18-18, 10:13-13, 10:18-18)',
        // Read/write window (oval)
        'spans(S, 14:12-19, 15:11-20, 16:11-20, 17:12-19)',
        // Label
        'spans(A, 5:8-23, 6:8-23, 7:8-23)',
        // Label text
        'spans(E, 6:10-21)',
        // Write notch
        'spans(S, 10:6-6, 11:6-6, 12:6-6)',
        // Index hole
        'pixels(S, 13,8)',
      ],
      chars: {
        B: { name: 'envelope', role: 'body' },
        D: { name: 'envelope_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'envelope_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'openings', role: 'head' },
        G: { name: 'hub_ring', role: 'belt' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'label_text', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#4e4a4e', highlight: '#4e4a4e' },
      },
    },

    // ─── 16. ETHERNET HUB ───────────────────────────────────────────
    {
      id: 'ethernet_hub_32',
      description: '90s 4-port Ethernet hub with LEDs and daisy-chain port.',
      size: 32,
      draw: [
        // Body
        'spans(B, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27)',
        // Shadow
        'spans(D, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27)',
        'spans(D, 15:4-27, 16:4-27)',
        // Highlight
        'spans(L, 11:5-26)',
        // Ports (front)
        'spans(G, 16:6-8, 16:10-12, 16:14-16, 16:18-20)',
        // Uplink port
        'spans(G, 16:23-25)',
        // LEDs row
        'spans(E, 12:7-7, 12:11-11, 12:15-15, 12:19-19)',
        // Uplink LED
        'spans(A, 12:24-24)',
        // Power LED
        'spans(E, 12:5-5)',
        // Logo
        'spans(A, 14:10-21)',
        // Feet
        'spans(D, 17:6-7, 17:24-25)',
      ],
      chars: {
        B: { name: 'hub_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'ports', role: 'head' },
        E: { name: 'leds', role: 'eye' },
        A: { name: 'logo_uplink', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── 17. PDA / PALM PILOT ───────────────────────────────────────
    {
      id: 'palm_pilot_32',
      description: 'Palm Pilot PDA with stylus slot, LCD screen, and graffiti area.',
      size: 32,
      draw: [
        // Body
        'spans(B, 4:10-21, 5:9-22, 6:9-22, 7:9-22, 8:9-22, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:9-22, 22:9-22, 23:10-21)',
        // Shadow
        'spans(D, 6:21-22, 7:21-22, 8:21-22, 9:21-22, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:21-22, 21:21-22, 22:21-22)',
        'spans(D, 22:9-22, 23:10-21)',
        // Highlight
        'spans(L, 4:12-19)',
        // Screen
        'spans(E, 6:11-20, 7:11-20, 8:11-20, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:11-20)',
        // Graffiti area
        'spans(S, 15:11-20, 16:11-20, 17:11-20, 18:11-20)',
        // Graffiti divider line
        'spans(D, 16:15-16)',
        // Buttons
        'spans(A, 20:11-13, 20:18-20)',
        // Up/Down buttons
        'spans(G, 20:15-16)',
        // Stylus slot
        'spans(G, 5:22-22, 6:22-22, 7:22-22, 8:22-22)',
        // Power button
        'spans(G, 4:15-16)',
      ],
      chars: {
        B: { name: 'pda_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        E: { name: 'screen', role: 'eye' },
        S: { name: 'graffiti_area', role: 'head' },
        A: { name: 'app_buttons', role: 'accessory' },
        G: { name: 'nav_stylus', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ─── 18. INK CARTRIDGE ──────────────────────────────────────────
    {
      id: 'ink_cartridge_32',
      description: 'Printer ink cartridge with color indicator and nozzle plate.',
      size: 32,
      draw: [
        // Cart body
        'spans(B, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21)',
        // Shadow
        'spans(D, 7:20-21, 8:20-21, 9:20-21, 10:20-21, 11:20-21, 12:20-21, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21)',
        'spans(D, 17:10-21, 18:10-21)',
        // Highlight
        'spans(L, 6:11-20)',
        // Color window (shows ink level)
        'spans(A, 8:12-19, 9:12-19, 10:12-19, 11:12-19)',
        // Ink level
        'spans(E, 10:12-19, 11:12-19)',
        // Label
        'spans(G, 13:12-19, 14:12-19)',
        // Contact pads (bottom)
        'spans(S, 19:12-13, 19:15-16, 19:18-19)',
        // Nozzle plate
        'spans(S, 20:11-20)',
        // Chip
        'spans(G, 16:14-17)',
        // Top clip
        'spans(B, 5:13-18)',
      ],
      chars: {
        B: { name: 'cartridge_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'ink_window', role: 'accessory' },
        E: { name: 'ink_level', role: 'eye' },
        G: { name: 'label_chip', role: 'head' },
        S: { name: 'contacts_nozzle', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 19. MOUSE PAD ──────────────────────────────────────────────
    {
      id: 'mouse_pad_32',
      description: 'Classic mouse pad with wrist rest and printed design.',
      size: 32,
      draw: [
        // Pad body
        'spans(B, 12:4-27, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:4-27)',
        // Shadow
        'spans(D, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28, 19:27-28)',
        'spans(D, 19:3-28, 20:4-27)',
        // Highlight
        'spans(L, 12:6-25)',
        // Printed design (landscape scene)
        'spans(A, 14:6-25, 15:6-25, 16:6-25)',
        // Design mountains
        'spans(E, 14:8-12, 14:18-22)',
        // Design sun
        'pixels(E, 24,14)',
        // Wrist rest (gel)
        'spans(G, 20:6-25, 21:7-24)',
        // Rest highlight
        'spans(L, 20:8-20)',
        // Edge stitching
        'spans(D, 12:4-27)',
      ],
      chars: {
        B: { name: 'pad_surface', role: 'body' },
        D: { name: 'pad_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'pad_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'print_design', role: 'accessory' },
        E: { name: 'design_detail', role: 'eye' },
        G: { name: 'wrist_rest', role: 'head' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 20. PARALLEL PORT CABLE ────────────────────────────────────
    {
      id: 'parallel_cable_32',
      description: 'DB25 parallel printer cable with large connectors.',
      size: 32,
      draw: [
        // Left connector (DB25 male)
        'spans(B, 9:3-12, 10:3-12, 11:3-12, 12:3-12, 13:3-12)',
        // Left shadow
        'spans(D, 11:11-12, 12:11-12, 13:11-12)',
        // Left highlight
        'spans(L, 9:4-11)',
        // Left pins
        'spans(G, 10:5-11, 12:5-11)',
        // Left screws
        'pixels(G, 4,9, 4,13)',
        // Cable
        'spans(A, 11:12-19)',
        'spans(A, 10:13-14, 12:17-18)',
        // Right connector (Centronics)
        'spans(B, 9:19-28, 10:19-28, 11:19-28, 12:19-28, 13:19-28)',
        // Right shadow
        'spans(D, 11:27-28, 12:27-28, 13:27-28)',
        // Right highlight
        'spans(L, 9:20-27)',
        // Right clip
        'spans(G, 9:19-19, 9:28-28, 13:19-19, 13:28-28)',
        // Right pins
        'spans(G, 10:21-27, 12:21-27)',
      ],
      chars: {
        B: { name: 'connector', role: 'body' },
        D: { name: 'connector_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'connector_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'pins_clips', role: 'head' },
        A: { name: 'cable', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
      },
    },

  ],
};

export default batch;
