/**
 * Retro Computing & 90s Tech — Batch 4: Modern PC Hardware & Current Tech (32x32 DSL)
 * 20 unique templates: gaming PCs, GPUs, SSDs, RGB peripherals, streaming gear.
 * Neo-SNES style, DB16 palette, 5-value shading.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'retro_tech',
  exportNames: { templates: 'RETRO_COMPUTING_32_BATCH4_TEMPLATES', schemes: 'RETRO_COMPUTING_32_BATCH4_COLOR_SCHEMES' },
  templates: [

    // ─── 1. GAMING PC TOWER ─────────────────────────────────────────
    {
      id: 'gaming_pc_tower_32',
      description: 'Modern RGB gaming PC tower with tempered glass side panel and front mesh.',
      size: 32,
      draw: [
        // Tower body (dark metal shell)
        'spans(B, 2:8-23, 3:7-24, 4:7-24, 5:7-24, 6:7-24, 7:7-24, 8:7-24, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24, 20:7-24, 21:7-24, 22:7-24, 23:7-24, 24:7-24, 25:7-24, 26:8-23)',
        // Shadow (right + bottom)
        'spans(D, 4:23-24, 5:23-24, 6:23-24, 7:23-24, 8:23-24, 9:23-24, 10:23-24, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:23-24, 20:23-24, 21:23-24, 22:23-24, 23:23-24, 24:23-24, 25:23-24)',
        'spans(D, 25:7-24, 26:8-23)',
        // Highlight (top edge)
        'spans(L, 2:10-21, 3:7-8)',
        // Glass side panel
        'spans(G, 5:9-21, 6:9-21, 7:9-21, 8:9-21, 9:9-21, 10:9-21, 11:9-21, 12:9-21, 13:9-21, 14:9-21, 15:9-21, 16:9-21, 17:9-21, 18:9-21, 19:9-21, 20:9-21, 21:9-21, 22:9-21)',
        // RGB strip inside glass (top)
        'spans(R, 5:10-20)',
        // RGB strip inside glass (bottom)
        'spans(R, 22:10-20)',
        // RGB fan glow inside (3 fans visible)
        'spans(R, 9:13-18, 13:13-18, 17:13-18)',
        // Motherboard hint through glass
        'spans(L, 7:11-12, 8:11-12, 10:11-12, 11:11-20, 14:11-12, 15:11-20, 18:11-12, 19:11-12)',
        // Front mesh vents
        'spans(D, 4:7-8, 6:7-8, 8:7-8, 10:7-8, 12:7-8, 14:7-8, 16:7-8, 18:7-8, 20:7-8)',
        // Power button (top)
        'spans(R, 2:15-16)',
        // Front USB ports
        'spans(A, 3:9-10, 3:12-13)',
        // Feet
        'spans(D, 27:9-11, 27:20-22)',
      ],
      chars: {
        B: { name: 'tower_shell', role: 'body' },
        D: { name: 'shell_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'shell_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'glass_panel', role: 'head' },
        R: { name: 'rgb_lighting', role: 'eye' },
        A: { name: 'front_ports', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 2. GAMING MONITOR ──────────────────────────────────────────
    {
      id: 'gaming_monitor_32',
      description: 'Ultra-wide gaming monitor with thin bezels and RGB accent on stand.',
      size: 32,
      draw: [
        // Screen bezel (thin)
        'spans(B, 4:3-28, 5:2-29, 6:2-29, 7:2-29, 8:2-29, 9:2-29, 10:2-29, 11:2-29, 12:2-29, 13:2-29, 14:2-29, 15:2-29, 16:2-29, 17:2-29, 18:3-28)',
        // Bezel shadow
        'spans(D, 6:28-29, 7:28-29, 8:28-29, 9:28-29, 10:28-29, 11:28-29, 12:28-29, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29)',
        'spans(D, 17:2-29, 18:3-28)',
        // Bezel highlight
        'spans(L, 4:5-26)',
        // Screen display
        'spans(S, 5:4-27, 6:4-27, 7:4-27, 8:4-27, 9:4-27, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27)',
        // Screen glare
        'spans(L, 5:5-10, 6:4-7)',
        // Stand neck
        'spans(B, 19:13-18, 20:13-18)',
        // Stand neck shadow
        'spans(D, 19:17-18, 20:17-18)',
        // Stand base
        'spans(G, 21:8-23, 22:7-24, 23:7-24)',
        // Base shadow
        'spans(D, 22:23-24, 23:23-24, 23:7-24)',
        // RGB strip on base
        'spans(R, 21:9-22)',
        // Logo on chin
        'spans(G, 17:14-17)',
      ],
      chars: {
        B: { name: 'bezel', role: 'body' },
        D: { name: 'bezel_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'bezel_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'screen', role: 'head' },
        G: { name: 'stand', role: 'belt' },
        R: { name: 'rgb_accent', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 3. MECHANICAL KEYBOARD ─────────────────────────────────────
    {
      id: 'mechanical_keyboard_32',
      description: 'RGB mechanical gaming keyboard with floating keycap design.',
      size: 32,
      draw: [
        // Keyboard plate
        'spans(B, 11:2-29, 12:2-29, 13:2-29, 14:2-29, 15:2-29, 16:2-29, 17:2-29, 18:2-29, 19:2-29, 20:2-29, 21:2-29)',
        // Shadow
        'spans(D, 13:28-29, 14:28-29, 15:28-29, 16:28-29, 17:28-29, 18:28-29, 19:28-29, 20:28-29, 21:28-29)',
        'spans(D, 20:2-29, 21:2-29)',
        // Highlight
        'spans(L, 11:3-28)',
        // RGB underglow
        'spans(R, 21:4-27)',
        // Function key row (dark keycaps)
        'spans(G, 12:4-5, 12:7-8, 12:10-11, 12:13-14, 12:16-17, 12:19-20, 12:22-23, 12:25-26)',
        // Main key rows
        'spans(G, 14:4-27, 15:4-27, 16:4-27, 17:4-27)',
        // Spacebar
        'spans(G, 18:9-22)',
        // Escape key (red accent)
        'spans(A, 12:4-5)',
        // WASD keys (highlighted)
        'spans(A, 15:7-8, 16:5-6, 16:8-9, 16:11-12)',
        // Enter key
        'spans(A, 16:24-27)',
        // Arrow keys
        'spans(G, 18:24-25, 18:27-27, 19:26-26)',
        // RGB key glow between rows
        'spans(R, 13:4-27)',
        // Cable (braided, centered)
        'spans(B, 10:15-16, 9:15-16)',
        // Cable accent
        'spans(R, 10:15-16)',
      ],
      chars: {
        B: { name: 'plate', role: 'body' },
        D: { name: 'plate_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'plate_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'keycaps', role: 'head' },
        A: { name: 'accent_keys', role: 'accessory' },
        R: { name: 'rgb_glow', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 4. GAMING MOUSE ────────────────────────────────────────────
    {
      id: 'gaming_mouse_32',
      description: 'Modern ergonomic gaming mouse with RGB scroll wheel and side buttons.',
      size: 32,
      draw: [
        // Mouse body
        'spans(B, 5:12-19, 6:11-20, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:11-20, 16:11-20, 17:12-19, 18:13-18)',
        // Shadow
        'spans(D, 8:20-21, 9:20-21, 10:20-21, 11:20-21, 12:20-21, 13:20-21, 14:20-21, 15:19-20)',
        'spans(D, 16:11-20, 17:12-19, 18:13-18)',
        // Highlight
        'spans(L, 5:14-17, 6:11-13)',
        // Left button
        'spans(G, 5:12-15, 6:11-15, 7:10-15)',
        // Right button
        'spans(G, 5:16-19, 6:16-20, 7:16-21)',
        // Button divider
        'spans(D, 5:15-16, 6:15-16, 7:15-16)',
        // RGB scroll wheel
        'spans(R, 8:15-16, 9:15-16)',
        // Side buttons
        'spans(A, 9:10-10, 10:10-10)',
        // Side grip texture
        'spans(D, 11:10-10, 13:10-10, 11:21-21, 13:21-21)',
        // DPI button
        'spans(A, 11:15-16)',
        // RGB strip along sides
        'spans(R, 14:11-12, 14:19-20)',
        // Logo (center)
        'spans(R, 12:14-17)',
        // Cable
        'spans(B, 4:15-16, 3:15-16)',
      ],
      chars: {
        B: { name: 'mouse_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'buttons', role: 'head' },
        A: { name: 'side_buttons', role: 'accessory' },
        R: { name: 'rgb_lighting', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 5. GAMING HEADSET ──────────────────────────────────────────
    {
      id: 'gaming_headset_32',
      description: 'Gaming headset with padded earcups, headband, and boom microphone.',
      size: 32,
      draw: [
        // Headband
        'spans(B, 4:10-21, 3:12-19, 5:9-10, 5:21-22)',
        // Headband highlight
        'spans(L, 3:13-18)',
        // Headband padding
        'spans(G, 4:12-19)',
        // Left earcup
        'spans(B, 6:5-12, 7:4-13, 8:4-13, 9:4-13, 10:4-13, 11:4-13, 12:4-13, 13:5-12)',
        // Left cup shadow
        'spans(D, 8:12-13, 9:12-13, 10:12-13, 11:12-13, 12:12-13, 13:11-12)',
        // Left cup highlight
        'spans(L, 6:7-10)',
        // Left ear pad
        'spans(A, 7:6-11, 8:5-12, 9:5-12, 10:5-12, 11:5-12, 12:6-11)',
        // Left RGB ring
        'spans(R, 7:4-4, 8:4-4, 9:4-4, 10:4-4, 11:4-4, 12:4-4)',
        // Right earcup
        'spans(B, 6:19-26, 7:18-27, 8:18-27, 9:18-27, 10:18-27, 11:18-27, 12:18-27, 13:19-26)',
        // Right cup shadow
        'spans(D, 8:26-27, 9:26-27, 10:26-27, 11:26-27, 12:26-27, 13:25-26)',
        // Right cup highlight
        'spans(L, 6:21-24)',
        // Right ear pad
        'spans(A, 7:20-25, 8:19-26, 9:19-26, 10:19-26, 11:19-26, 12:20-25)',
        // Right RGB ring
        'spans(R, 7:27-27, 8:27-27, 9:27-27, 10:27-27, 11:27-27, 12:27-27)',
        // Mic boom arm
        'spans(B, 13:4-4, 14:3-4, 15:3-3, 16:3-3, 17:3-4)',
        // Mic tip
        'spans(G, 17:2-3, 18:2-3)',
        // Mic foam
        'spans(A, 18:2-3)',
      ],
      chars: {
        B: { name: 'headset_frame', role: 'body' },
        D: { name: 'frame_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'frame_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'ear_pads', role: 'accessory' },
        G: { name: 'cushion_mic', role: 'head' },
        R: { name: 'rgb_rings', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 6. GPU CARD ────────────────────────────────────────────────
    {
      id: 'gpu_card_32',
      description: 'Modern triple-fan graphics card with backplate and power connectors.',
      size: 32,
      draw: [
        // PCB board
        'spans(P, 5:3-28, 6:3-28, 7:3-28, 8:3-28, 9:3-28, 10:3-28)',
        // Heatsink/shroud body
        'spans(B, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28, 21:3-28)',
        // Shroud shadow
        'spans(D, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28, 19:27-28, 20:27-28, 21:27-28)',
        'spans(D, 20:3-28, 21:3-28)',
        // Shroud highlight
        'spans(L, 11:4-27)',
        // Fan 1 (left)
        'spans(G, 13:5-10, 14:4-11, 15:4-11, 16:4-11, 17:4-11, 18:5-10)',
        // Fan 2 (center)
        'spans(G, 13:13-18, 14:12-19, 15:12-19, 16:12-19, 17:12-19, 18:13-18)',
        // Fan 3 (right)
        'spans(G, 13:21-26, 14:20-27, 15:20-27, 16:20-27, 17:20-27, 18:21-26)',
        // Fan centers
        'spans(D, 15:7-8, 16:7-8, 15:15-16, 16:15-16, 15:23-24, 16:23-24)',
        // RGB strip between fans
        'spans(R, 12:4-27)',
        // Gold PCI contacts
        'spans(A, 22:5-14)',
        // PCI bracket
        'spans(B, 5:2-2, 6:2-2, 7:2-2, 8:2-2, 9:2-2, 10:2-2, 11:2-2)',
        // Power connectors
        'spans(A, 6:26-28, 8:26-28)',
        // Backplate logo
        'spans(R, 7:12-19)',
      ],
      chars: {
        B: { name: 'shroud', role: 'body' },
        D: { name: 'shroud_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'shroud_highlight', role: 'body', tone: 'highlight' },
        P: { name: 'pcb', role: 'belt' },
        G: { name: 'fans', role: 'head' },
        A: { name: 'contacts_power', role: 'accessory' },
        R: { name: 'rgb_strip', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 7. SSD DRIVE ───────────────────────────────────────────────
    {
      id: 'ssd_drive_32',
      description: 'M.2 NVMe SSD stick with NAND chips and copper heatsink label.',
      size: 32,
      draw: [
        // PCB board (green, slim stick shape)
        'spans(P, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28)',
        // PCB edge shadow
        'spans(D, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28)',
        'spans(D, 17:3-28, 18:3-28)',
        // PCB highlight
        'spans(L, 13:4-27)',
        // M.2 connector (gold edge contacts)
        'spans(A, 13:3-3, 14:3-3, 15:3-3, 16:3-3, 17:3-3, 18:3-3)',
        // Connector notch
        'spans(D, 15:3-3, 16:3-3)',
        // NAND chip 1
        'spans(B, 14:6-12, 15:6-12, 16:6-12)',
        // NAND chip 2
        'spans(B, 14:14-20, 15:14-20, 16:14-20)',
        // Chip shadows
        'spans(D, 16:6-12, 16:14-20)',
        // Chip highlights
        'spans(L, 14:7-11, 14:15-19)',
        // Controller chip
        'spans(G, 14:22-26, 15:22-26, 16:22-26)',
        // Controller shadow
        'spans(D, 16:22-26)',
        // Controller highlight
        'spans(L, 14:23-25)',
        // Heatsink label (copper)
        'spans(A, 13:5-27)',
        // Label text
        'spans(P, 13:8-14, 13:17-23)',
        // Screw hole
        'pixels(L, 28,15)',
        // Small capacitors
        'pixels(G, 5,17, 7,17, 9,17)',
      ],
      chars: {
        P: { name: 'pcb_board', role: 'belt' },
        D: { name: 'pcb_shadow', role: 'belt', tone: 'shadow' },
        L: { name: 'pcb_highlight', role: 'belt', tone: 'highlight' },
        B: { name: 'nand_chips', role: 'body' },
        G: { name: 'controller', role: 'head' },
        A: { name: 'contacts_label', role: 'accessory' },
      },
      colors: {
        belt:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 8. RAM STICK ───────────────────────────────────────────────
    {
      id: 'ram_stick_32',
      description: 'DDR5 RAM module with aluminum heatsink fins and RGB light bar.',
      size: 32,
      draw: [
        // Heatsink body (tall fin profile)
        'spans(B, 5:6-25, 6:5-26, 7:5-26, 8:5-26, 9:5-26, 10:5-26, 11:5-26, 12:5-26, 13:5-26, 14:5-26)',
        // Heatsink shadow
        'spans(D, 7:25-26, 8:25-26, 9:25-26, 10:25-26, 11:25-26, 12:25-26, 13:25-26, 14:25-26)',
        'spans(D, 13:5-26, 14:5-26)',
        // Heatsink highlight
        'spans(L, 5:8-23, 6:5-7)',
        // Heatsink fin grooves
        'spans(D, 8:6-6, 8:10-10, 8:14-14, 8:18-18, 8:22-22, 8:26-26)',
        'spans(D, 10:6-6, 10:10-10, 10:14-14, 10:18-18, 10:22-22, 10:26-26)',
        'spans(D, 12:6-6, 12:10-10, 12:14-14, 12:18-18, 12:22-22, 12:26-26)',
        // RGB light bar on top
        'spans(R, 5:7-24)',
        // PCB exposed at bottom
        'spans(P, 15:5-26, 16:5-26, 17:5-26)',
        // DRAM chips on PCB
        'spans(G, 15:7-10, 15:12-15, 15:17-20, 15:22-25)',
        // Gold edge contacts
        'spans(A, 18:6-14, 18:17-25)',
        // Notch in contacts
        'spans(P, 18:15-16)',
        // Label sticker
        'spans(G, 16:8-23)',
      ],
      chars: {
        B: { name: 'heatsink', role: 'body' },
        D: { name: 'heatsink_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'heatsink_highlight', role: 'body', tone: 'highlight' },
        R: { name: 'rgb_bar', role: 'eye' },
        P: { name: 'pcb', role: 'belt' },
        G: { name: 'chips_label', role: 'head' },
        A: { name: 'gold_contacts', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 9. CPU CHIP ────────────────────────────────────────────────
    {
      id: 'cpu_chip_32',
      description: 'Modern processor chip with IHS (integrated heat spreader) and gold pads.',
      size: 32,
      draw: [
        // PCB substrate
        'spans(P, 6:6-25, 7:6-25, 8:6-25, 9:6-25, 10:6-25, 11:6-25, 12:6-25, 13:6-25, 14:6-25, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:6-25, 20:6-25, 21:6-25, 22:6-25, 23:6-25, 24:6-25)',
        // Substrate shadow
        'spans(D, 8:24-25, 9:24-25, 10:24-25, 11:24-25, 12:24-25, 13:24-25, 14:24-25, 15:24-25, 16:24-25, 17:24-25, 18:24-25, 19:24-25, 20:24-25, 21:24-25, 22:24-25, 23:24-25, 24:24-25)',
        'spans(D, 23:6-25, 24:6-25)',
        // Substrate highlight
        'spans(L, 6:7-24)',
        // IHS (heat spreader - metal)
        'spans(B, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:9-22)',
        // IHS shadow
        'spans(D, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22, 20:21-22, 21:21-22)',
        'spans(D, 20:9-22, 21:9-22)',
        // IHS highlight
        'spans(L, 9:10-21, 10:9-10)',
        // IHS text (logo)
        'spans(G, 12:12-19, 14:11-20)',
        // Gold contact pads (bottom row)
        'spans(A, 25:8-11, 25:13-14, 25:17-18, 25:20-23)',
        // Gold contact pads (left column)
        'spans(A, 8:6-6, 10:6-6, 12:6-6, 14:6-6, 16:6-6, 18:6-6, 20:6-6, 22:6-6)',
        // Gold contact pads (right column)
        'spans(A, 8:25-25, 10:25-25, 12:25-25, 14:25-25, 16:25-25, 18:25-25, 20:25-25, 22:25-25)',
        // Alignment triangle
        'pixels(A, 8,7)',
      ],
      chars: {
        P: { name: 'substrate', role: 'belt' },
        D: { name: 'shadow', role: 'belt', tone: 'shadow' },
        L: { name: 'highlight', role: 'belt', tone: 'highlight' },
        B: { name: 'heat_spreader', role: 'body' },
        G: { name: 'ihs_text', role: 'head' },
        A: { name: 'gold_pads', role: 'accessory' },
      },
      colors: {
        belt:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 10. MOTHERBOARD ────────────────────────────────────────────
    {
      id: 'motherboard_32',
      description: 'PC motherboard with CPU socket, RAM slots, chipset, and IO panel.',
      size: 32,
      draw: [
        // PCB board
        'spans(P, 3:3-28, 4:3-28, 5:3-28, 6:3-28, 7:3-28, 8:3-28, 9:3-28, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28, 21:3-28, 22:3-28, 23:3-28, 24:3-28, 25:3-28, 26:3-28)',
        // Board shadow
        'spans(D, 25:3-28, 26:3-28)',
        // Board highlight
        'spans(L, 3:4-27)',
        // CPU socket
        'spans(G, 6:6-13, 7:6-13, 8:6-13, 9:6-13, 10:6-13, 11:6-13)',
        // Socket center
        'spans(B, 7:7-12, 8:7-12, 9:7-12, 10:7-12)',
        // RAM slots (4)
        'spans(A, 5:16-17, 6:16-17, 7:16-17, 8:16-17, 9:16-17, 10:16-17, 11:16-17)',
        'spans(A, 5:19-20, 6:19-20, 7:19-20, 8:19-20, 9:19-20, 10:19-20, 11:19-20)',
        // PCI-E slots
        'spans(B, 15:5-24, 17:5-24, 19:5-24)',
        // PCI-E slot detail
        'spans(D, 15:5-6, 17:5-6, 19:5-6)',
        // Chipset heatsink
        'spans(G, 14:18-24, 15:18-24, 16:18-24)',
        // Chipset highlight
        'spans(L, 14:19-23)',
        // IO panel (top-left)
        'spans(B, 3:3-5, 4:3-5, 5:3-5, 6:3-5)',
        // IO ports
        'spans(R, 4:4-4, 5:4-4)',
        // SATA connectors
        'spans(A, 22:25-27, 23:25-27, 24:25-27)',
        // 24-pin power
        'spans(A, 6:26-27, 7:26-27, 8:26-27, 9:26-27, 10:26-27, 11:26-27)',
        // VRM heatsink
        'spans(G, 4:6-13, 5:6-6, 5:13-13)',
        // Traces (decorative)
        'spans(P, 13:6-24, 21:6-24)',
        // Screw holes
        'pixels(L, 4,4, 27,4, 4,25, 27,25)',
        // RGB header
        'spans(R, 24:5-7)',
      ],
      chars: {
        P: { name: 'pcb', role: 'belt' },
        D: { name: 'pcb_shadow', role: 'belt', tone: 'shadow' },
        L: { name: 'pcb_highlight', role: 'belt', tone: 'highlight' },
        B: { name: 'slots_io', role: 'body' },
        G: { name: 'socket_chipset', role: 'head' },
        A: { name: 'connectors', role: 'accessory' },
        R: { name: 'rgb_accents', role: 'eye' },
      },
      colors: {
        belt:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 11. POWER SUPPLY ───────────────────────────────────────────
    {
      id: 'power_supply_32',
      description: 'PC PSU with modular cable panel, fan grille, and power switch.',
      size: 32,
      draw: [
        // PSU body
        'spans(B, 5:5-26, 6:5-26, 7:5-26, 8:5-26, 9:5-26, 10:5-26, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26, 20:5-26, 21:5-26)',
        // Shadow
        'spans(D, 7:25-26, 8:25-26, 9:25-26, 10:25-26, 11:25-26, 12:25-26, 13:25-26, 14:25-26, 15:25-26, 16:25-26, 17:25-26, 18:25-26, 19:25-26, 20:25-26, 21:25-26)',
        'spans(D, 20:5-26, 21:5-26)',
        // Highlight
        'spans(L, 5:6-25)',
        // Fan grille (large circular)
        'spans(G, 8:9-22, 9:8-23, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:8-23, 17:9-22)',
        // Fan center
        'spans(D, 12:14-17, 13:14-17)',
        // Fan blades hint
        'spans(L, 10:12-12, 10:19-19, 14:9-9, 14:22-22, 12:8-8, 12:23-23)',
        // Power switch
        'spans(A, 6:23-25)',
        // Power inlet (IEC)
        'spans(G, 6:7-10, 7:7-10)',
        // Brand label
        'spans(G, 19:10-21)',
        // Label text
        'spans(L, 19:12-19)',
        // Modular cable ports (back face concept)
        'spans(A, 18:7-9, 18:11-13, 18:15-17, 18:19-21, 18:23-25)',
        // Wattage label
        'spans(R, 5:12-19)',
      ],
      chars: {
        B: { name: 'psu_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'grille_inlet', role: 'head' },
        A: { name: 'switch_ports', role: 'accessory' },
        R: { name: 'wattage_label', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 12. AIO COOLER ─────────────────────────────────────────────
    {
      id: 'aio_cooler_32',
      description: 'All-in-one liquid CPU cooler with pump head, hoses, and radiator.',
      size: 32,
      draw: [
        // Radiator body
        'spans(B, 4:17-28, 5:17-28, 6:17-28, 7:17-28, 8:17-28, 9:17-28, 10:17-28, 11:17-28, 12:17-28, 13:17-28, 14:17-28, 15:17-28, 16:17-28, 17:17-28, 18:17-28, 19:17-28, 20:17-28)',
        // Radiator shadow
        'spans(D, 6:27-28, 7:27-28, 8:27-28, 9:27-28, 10:27-28, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28, 19:27-28, 20:27-28)',
        'spans(D, 19:17-28, 20:17-28)',
        // Radiator highlight
        'spans(L, 4:18-27)',
        // Radiator fins
        'spans(D, 6:18-18, 8:18-18, 10:18-18, 12:18-18, 14:18-18, 16:18-18, 18:18-18)',
        // Fan on radiator
        'spans(G, 7:20-25, 8:19-26, 9:19-26, 10:19-26, 11:19-26, 12:20-25)',
        // Fan 2
        'spans(G, 14:20-25, 15:19-26, 16:19-26, 17:19-26, 18:19-26, 19:20-25)',
        // Fan centers
        'spans(D, 9:22-23, 10:22-23, 16:22-23, 17:22-23)',
        // Pump head (circular)
        'spans(B, 12:3-12, 13:2-13, 14:2-13, 15:2-13, 16:2-13, 17:3-12)',
        // Pump shadow
        'spans(D, 14:12-13, 15:12-13, 16:12-13, 17:11-12)',
        // Pump highlight
        'spans(L, 12:5-10)',
        // Pump RGB ring
        'spans(R, 12:4-11, 13:3-3, 13:12-12, 14:2-2, 14:13-13, 15:2-2, 15:13-13, 16:3-3, 16:12-12, 17:4-11)',
        // Pump logo center
        'spans(G, 14:6-9, 15:6-9)',
        // Hoses
        'spans(A, 11:9-17, 12:13-17)',
        'spans(A, 18:9-17, 19:13-17)',
      ],
      chars: {
        B: { name: 'radiator_pump', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'fans_logo', role: 'head' },
        A: { name: 'hoses', role: 'accessory' },
        R: { name: 'pump_rgb', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 13. USB FLASH DRIVE ────────────────────────────────────────
    {
      id: 'usb_flash_drive_32',
      description: 'USB thumb drive with cap, activity LED, and lanyard loop.',
      size: 32,
      draw: [
        // Drive body
        'spans(B, 11:8-23, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:8-23)',
        // Body shadow
        'spans(D, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24)',
        'spans(D, 17:7-24, 18:8-23)',
        // Body highlight
        'spans(L, 11:10-21, 12:7-9)',
        // USB connector (metal)
        'spans(G, 12:3-7, 13:3-7, 14:3-7, 15:3-7, 16:3-7, 17:3-7)',
        // Connector shadow
        'spans(D, 14:3-4, 15:3-4, 16:3-4, 17:3-7)',
        // Connector contacts (gold)
        'spans(A, 13:4-6, 14:4-6, 15:4-6, 16:4-6)',
        // Cap (protective)
        'spans(S, 12:24-28, 13:24-28, 14:24-28, 15:24-28, 16:24-28, 17:24-28)',
        // Cap shadow
        'spans(D, 14:27-28, 15:27-28, 16:27-28, 17:24-28)',
        // Activity LED
        'spans(R, 12:9-9)',
        // Brand label
        'spans(G, 14:10-21, 15:10-21)',
        // Capacity text
        'spans(L, 15:12-19)',
        // Lanyard loop
        'spans(B, 14:25-25, 15:25-25)',
      ],
      chars: {
        B: { name: 'drive_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'connector_label', role: 'head' },
        A: { name: 'contacts', role: 'accessory' },
        S: { name: 'cap', role: 'belt' },
        R: { name: 'led', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ─── 14. EXTERNAL HDD ───────────────────────────────────────────
    {
      id: 'external_hdd_32',
      description: 'External portable hard drive with USB cable and activity light.',
      size: 32,
      draw: [
        // Drive body
        'spans(B, 8:6-25, 9:5-26, 10:5-26, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26, 20:6-25)',
        // Shadow
        'spans(D, 10:25-26, 11:25-26, 12:25-26, 13:25-26, 14:25-26, 15:25-26, 16:25-26, 17:25-26, 18:25-26, 19:25-26)',
        'spans(D, 19:5-26, 20:6-25)',
        // Highlight
        'spans(L, 8:8-23, 9:5-7)',
        // Top surface texture lines
        'spans(D, 10:7-24, 12:7-24, 14:7-24)',
        // Logo area
        'spans(G, 16:10-21)',
        // Brand text
        'spans(L, 16:12-19)',
        // Activity LED
        'spans(R, 9:7-7)',
        // USB-C port
        'spans(A, 20:14-17)',
        // Port detail
        'spans(D, 20:15-16)',
        // USB cable
        'spans(G, 21:14-17, 22:15-16, 23:15-16)',
        // Cable connector
        'spans(A, 24:14-17)',
        // Rubber feet
        'spans(D, 21:7-8, 21:23-24)',
        // Capacity label (side)
        'spans(G, 18:8-14)',
      ],
      chars: {
        B: { name: 'drive_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'logo_cable', role: 'head' },
        A: { name: 'usb_port', role: 'accessory' },
        R: { name: 'activity_led', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 15. WIFI ROUTER ────────────────────────────────────────────
    {
      id: 'wifi_router_32',
      description: 'Modern WiFi router with multiple antennas and LED status bar.',
      size: 32,
      draw: [
        // Router body
        'spans(B, 14:4-27, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:3-28, 21:4-27)',
        // Shadow
        'spans(D, 16:27-28, 17:27-28, 18:27-28, 19:27-28, 20:27-28)',
        'spans(D, 20:3-28, 21:4-27)',
        // Highlight
        'spans(L, 14:6-25)',
        // LED status bar
        'spans(R, 15:6-25)',
        // LED indicators (individual)
        'spans(G, 15:7-7, 15:10-10, 15:13-13, 15:16-16, 15:19-19, 15:22-22, 15:25-25)',
        // Vent grilles
        'spans(D, 17:5-26, 19:5-26)',
        // Logo
        'spans(G, 18:10-21)',
        // Antenna 1 (left)
        'spans(B, 5:6-7, 6:6-7, 7:6-7, 8:6-7, 9:6-7, 10:6-7, 11:6-7, 12:6-7, 13:6-7)',
        // Antenna 1 tip
        'spans(L, 5:6-7)',
        // Antenna 2 (center-left)
        'spans(B, 7:12-13, 8:12-13, 9:12-13, 10:12-13, 11:12-13, 12:12-13, 13:12-13)',
        // Antenna 3 (center-right)
        'spans(B, 7:18-19, 8:18-19, 9:18-19, 10:18-19, 11:18-19, 12:18-19, 13:18-19)',
        // Antenna 4 (right)
        'spans(B, 5:24-25, 6:24-25, 7:24-25, 8:24-25, 9:24-25, 10:24-25, 11:24-25, 12:24-25, 13:24-25)',
        // Antenna 4 tip
        'spans(L, 5:24-25)',
        // Antenna shadows
        'spans(D, 9:7-7, 10:7-7, 11:7-7, 12:7-7, 9:13-13, 10:13-13, 11:13-13, 12:13-13)',
        'spans(D, 9:19-19, 10:19-19, 11:19-19, 12:19-19, 9:25-25, 10:25-25, 11:25-25, 12:25-25)',
        // Feet
        'spans(D, 22:5-7, 22:24-26)',
        // Ethernet ports (back hint)
        'spans(A, 21:8-10, 21:12-14, 21:17-19, 21:21-23)',
      ],
      chars: {
        B: { name: 'router_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'logo_indicators', role: 'head' },
        A: { name: 'ports', role: 'accessory' },
        R: { name: 'led_bar', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 16. WEBCAM MODERN ──────────────────────────────────────────
    {
      id: 'webcam_modern_32',
      description: 'Modern 4K webcam on monitor-clip mount with privacy shutter.',
      size: 32,
      draw: [
        // Camera body (cylindrical)
        'spans(B, 7:9-22, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:9-22)',
        // Body shadow
        'spans(D, 9:22-23, 10:22-23, 11:22-23, 12:21-22)',
        'spans(D, 11:8-23, 12:9-22)',
        // Body highlight
        'spans(L, 7:11-20, 8:8-10)',
        // Lens housing (center)
        'spans(G, 8:13-18, 9:12-19, 10:12-19, 11:13-18)',
        // Lens glass
        'spans(S, 9:14-17, 10:14-17)',
        // Lens center (dark)
        'spans(D, 9:15-16, 10:15-16)',
        // Lens ring highlight
        'spans(L, 9:14-14, 8:15-16)',
        // Status LED
        'spans(R, 8:10-10)',
        // Privacy shutter (half-open)
        'spans(B, 8:18-18, 9:19-19)',
        // Monitor clip mount
        'spans(G, 13:12-19, 14:12-19)',
        // Clip jaw (front)
        'spans(G, 15:12-19, 16:12-19, 17:12-19)',
        // Clip jaw shadow
        'spans(D, 16:18-19, 17:18-19, 17:12-19)',
        // Clip rubber pad
        'spans(A, 17:13-18)',
        // Clip back support
        'spans(G, 18:14-17, 19:14-17, 20:14-17)',
        // Tripod thread (bottom)
        'spans(A, 13:15-16)',
      ],
      chars: {
        B: { name: 'camera_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'lens_mount', role: 'head' },
        S: { name: 'lens_glass', role: 'belt' },
        A: { name: 'rubber_thread', role: 'accessory' },
        R: { name: 'status_led', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        belt:      { shadow: '#30346d', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ─── 17. USB MICROPHONE ─────────────────────────────────────────
    {
      id: 'microphone_usb_32',
      description: 'USB condenser microphone for streaming with shock mount and gain knob.',
      size: 32,
      draw: [
        // Mic capsule (cylindrical)
        'spans(B, 3:11-20, 4:10-21, 5:10-21, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:11-20)',
        // Capsule shadow
        'spans(D, 5:20-21, 6:20-21, 7:20-21, 8:20-21, 9:20-21, 10:20-21, 11:20-21)',
        'spans(D, 11:10-21, 12:11-20)',
        // Capsule highlight
        'spans(L, 3:13-18, 4:10-12)',
        // Grille mesh pattern
        'spans(G, 4:12-19, 5:11-20, 6:11-20, 7:11-20, 8:11-20, 9:12-19)',
        // Grille highlight dots
        'spans(L, 5:13-13, 5:17-17, 7:12-12, 7:18-18)',
        // Mute button (front)
        'spans(R, 10:15-16)',
        // Gain knob
        'spans(A, 11:13-14)',
        // Headphone volume
        'spans(A, 11:17-18)',
        // Shock mount ring
        'spans(G, 13:10-21, 14:10-21)',
        // Mount shadow
        'spans(D, 14:10-21)',
        // Stand arm
        'spans(B, 15:14-17, 16:14-17, 17:14-17)',
        // Stand arm shadow
        'spans(D, 15:17-17, 16:17-17, 17:17-17)',
        // Stand base
        'spans(G, 18:9-22, 19:8-23, 20:8-23)',
        // Base shadow
        'spans(D, 19:22-23, 20:22-23, 20:8-23)',
        // Base highlight
        'spans(L, 18:11-20)',
        // USB port (back)
        'spans(A, 12:14-17)',
        // LED ring
        'spans(R, 3:12-19)',
      ],
      chars: {
        B: { name: 'mic_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'grille_mount', role: 'head' },
        A: { name: 'controls_port', role: 'accessory' },
        R: { name: 'led_mute', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
      },
    },

    // ─── 18. STREAM DECK ────────────────────────────────────────────
    {
      id: 'stream_deck_32',
      description: 'Streaming control deck with 15 LCD buttons in a 3x5 grid.',
      size: 32,
      draw: [
        // Deck body
        'spans(B, 8:4-27, 9:3-28, 10:3-28, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:3-28, 19:3-28, 20:4-27)',
        // Shadow
        'spans(D, 10:27-28, 11:27-28, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28, 18:27-28, 19:27-28)',
        'spans(D, 19:3-28, 20:4-27)',
        // Highlight
        'spans(L, 8:6-25)',
        // Button row 1 (top)
        'spans(R, 10:5-8, 10:10-13, 10:15-18, 10:20-23, 10:25-27)',
        'spans(R, 11:5-8, 11:10-13, 11:15-18, 11:20-23, 11:25-27)',
        // Button row 2 (middle)
        'spans(S, 13:5-8, 13:10-13, 13:15-18, 13:20-23, 13:25-27)',
        'spans(S, 14:5-8, 14:10-13, 14:15-18, 14:20-23, 14:25-27)',
        // Button row 3 (bottom)
        'spans(A, 16:5-8, 16:10-13, 16:15-18, 16:20-23, 16:25-27)',
        'spans(A, 17:5-8, 17:10-13, 17:15-18, 17:20-23, 17:25-27)',
        // Button divider lines (vertical)
        'spans(D, 10:9-9, 11:9-9, 13:9-9, 14:9-9, 16:9-9, 17:9-9)',
        'spans(D, 10:14-14, 11:14-14, 13:14-14, 14:14-14, 16:14-14, 17:14-14)',
        'spans(D, 10:19-19, 11:19-19, 13:19-19, 14:19-19, 16:19-19, 17:19-19)',
        'spans(D, 10:24-24, 11:24-24, 13:24-24, 14:24-24, 16:24-24, 17:24-24)',
        // Button divider lines (horizontal)
        'spans(D, 12:5-27)',
        'spans(D, 15:5-27)',
        // Logo
        'spans(G, 9:12-19)',
        // USB-C port (back)
        'spans(G, 20:14-17)',
        // Stand hinge
        'spans(G, 20:6-8, 20:23-25)',
      ],
      chars: {
        B: { name: 'deck_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        R: { name: 'buttons_row1', role: 'eye' },
        S: { name: 'buttons_row2', role: 'belt' },
        A: { name: 'buttons_row3', role: 'accessory' },
        G: { name: 'logo_ports', role: 'head' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        accessory: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 19. DOCKING STATION ────────────────────────────────────────
    {
      id: 'docking_station_32',
      description: 'USB-C docking station hub with multiple ports and card reader.',
      size: 32,
      draw: [
        // Dock body
        'spans(B, 10:4-27, 11:3-28, 12:3-28, 13:3-28, 14:3-28, 15:3-28, 16:3-28, 17:3-28, 18:4-27)',
        // Shadow
        'spans(D, 12:27-28, 13:27-28, 14:27-28, 15:27-28, 16:27-28, 17:27-28)',
        'spans(D, 17:3-28, 18:4-27)',
        // Highlight
        'spans(L, 10:6-25)',
        // USB-A ports (3)
        'spans(A, 11:5-8, 11:10-13, 11:15-18)',
        // Port interiors
        'spans(D, 11:6-7, 11:11-12, 11:16-17)',
        // HDMI port
        'spans(G, 11:20-24)',
        // HDMI interior
        'spans(D, 11:21-23)',
        // Ethernet port
        'spans(G, 13:5-9)',
        'spans(D, 13:6-8)',
        // SD card slot
        'spans(G, 13:11-14)',
        // USB-C port (upstream)
        'spans(A, 13:22-25)',
        'spans(D, 13:23-24)',
        // Power delivery LED
        'spans(R, 12:26-26)',
        // Status LEDs
        'spans(R, 12:5-5, 12:10-10, 12:15-15)',
        // Brand logo
        'spans(G, 15:9-22)',
        // Logo text
        'spans(L, 15:11-20)',
        // Rubber feet
        'spans(D, 19:5-7, 19:24-26)',
        // Vent holes (bottom)
        'spans(D, 16:6-8, 16:12-14, 16:18-20, 16:24-26)',
        // Cable (attached USB-C)
        'spans(B, 14:27-29, 15:29-30)',
      ],
      chars: {
        B: { name: 'dock_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'usb_ports', role: 'accessory' },
        G: { name: 'hdmi_slots', role: 'head' },
        R: { name: 'status_leds', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

    // ─── 20. RGB CASE FAN ───────────────────────────────────────────
    {
      id: 'rgb_fan_32',
      description: 'RGB case fan with translucent blades and glowing light ring.',
      size: 32,
      draw: [
        // Fan frame (square with rounded corners)
        'spans(B, 4:6-25, 5:5-26, 6:4-27, 7:4-27, 8:4-27, 9:4-27, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27, 21:4-27, 22:4-27, 23:4-27, 24:4-27, 25:5-26, 26:6-25)',
        // Frame shadow
        'spans(D, 8:26-27, 9:26-27, 10:26-27, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27, 19:26-27, 20:26-27, 21:26-27, 22:26-27, 23:26-27, 24:26-27)',
        'spans(D, 24:4-27, 25:5-26, 26:6-25)',
        // Frame highlight
        'spans(L, 4:8-23, 5:5-7)',
        // RGB light ring (outer)
        'spans(R, 5:8-23, 6:5-7, 6:24-27, 7:4-5, 7:26-27, 8:4-5, 9:4-4, 10:4-4, 11:4-4, 12:4-4, 13:4-4, 14:4-4, 15:4-4, 16:4-4, 17:4-4, 18:4-4, 19:4-4, 20:4-4, 21:4-5, 22:4-5, 23:5-7, 23:24-27, 24:8-23)',
        'spans(R, 8:26-27, 9:27-27, 10:27-27, 11:27-27, 12:27-27, 13:27-27, 14:27-27, 15:27-27, 16:27-27, 17:27-27, 18:27-27, 19:27-27, 20:27-27, 21:26-27, 22:26-27)',
        // Fan blade area (dark interior)
        'spans(G, 7:7-24, 8:6-25, 9:5-26, 10:5-26, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26, 20:5-26, 21:6-25, 22:7-24)',
        // Fan blades (7 blades radiating from center)
        'spans(A, 8:14-17, 9:13-14, 10:12-13, 11:11-12)',
        'spans(A, 9:18-19, 10:20-21, 11:22-23)',
        'spans(A, 12:7-9, 13:6-7)',
        'spans(A, 12:22-24, 13:24-25)',
        'spans(A, 17:7-9, 18:6-7)',
        'spans(A, 17:22-24, 18:24-25)',
        'spans(A, 19:13-14, 20:12-13, 21:14-17)',
        'spans(A, 19:18-19, 20:20-21)',
        // Hub center
        'spans(B, 13:13-18, 14:12-19, 15:12-19, 16:12-19, 17:13-18)',
        // Hub shadow
        'spans(D, 15:18-19, 16:18-19, 17:17-18)',
        // Hub highlight
        'spans(L, 13:14-17, 14:12-13)',
        // Hub logo
        'spans(R, 15:14-17)',
        // Screw holes (corners)
        'pixels(D, 6,5, 25,5, 6,26, 25,26)',
      ],
      chars: {
        B: { name: 'frame_hub', role: 'body' },
        D: { name: 'frame_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'frame_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'fan_interior', role: 'head' },
        A: { name: 'fan_blades', role: 'accessory' },
        R: { name: 'rgb_ring', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#442434' },
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
      },
    },

  ],
};

export default batch;
