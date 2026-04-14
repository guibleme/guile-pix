/**
 * Retro Computing & 90s Tech — Batch 2: Game Media & Accessories (32x32 DSL)
 * 20 unique templates: cartridges, discs, memory cards, cables, adapters.
 * Neo-SNES style, DB16 palette, 5-value shading.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'retro_tech',
  exportNames: { templates: 'RETRO_COMPUTING_32_BATCH2_TEMPLATES', schemes: 'RETRO_COMPUTING_32_BATCH2_COLOR_SCHEMES' },
  templates: [

    // ─── 1. NES CARTRIDGE ───────────────────────────────────────────
    {
      id: 'nes_cartridge_32',
      description: 'Classic NES game cartridge with label and edge connector.',
      size: 32,
      draw: [
        // Cart body
        'spans(B, 4:8-23, 5:8-23, 6:8-23, 7:8-23, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23, 19:8-23)',
        // Shadow
        'spans(D, 5:22-23, 6:22-23, 7:22-23, 8:22-23, 9:22-23, 10:22-23, 11:22-23, 12:22-23, 13:22-23, 14:22-23, 15:22-23, 16:22-23, 17:22-23, 18:22-23, 19:22-23)',
        'spans(D, 18:8-23, 19:8-23)',
        // Highlight
        'spans(L, 4:9-22)',
        // Label area
        'spans(A, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21)',
        // Label art (mini scene)
        'spans(E, 8:12-14, 9:11-15, 10:12-14)',
        // Label text lines
        'spans(E, 12:12-19)',
        // Edge connector (bottom gold)
        'spans(G, 20:10-21, 21:10-21, 22:10-21)',
        // Connector pins
        'spans(L, 20:11-11, 20:13-13, 20:15-15, 20:17-17, 20:19-19)',
        // Cutout notches
        'spans(S, 4:8-9, 4:22-23)',
        // Top grip ridges
        'spans(D, 5:9-10, 5:21-22)',
      ],
      chars: {
        B: { name: 'cart_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'label_art', role: 'eye' },
        G: { name: 'gold_connector', role: 'belt' },
        S: { name: 'notches', role: 'head' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
      },
    },

    // ─── 2. SNES CARTRIDGE ──────────────────────────────────────────
    {
      id: 'snes_cartridge_32',
      description: 'Super Nintendo game cartridge with curved top and label.',
      size: 32,
      draw: [
        // Curved top
        'spans(B, 4:10-21, 5:9-22)',
        // Cart body
        'spans(B, 6:8-23, 7:8-23, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:8-23)',
        // Shadow
        'spans(D, 6:22-23, 7:22-23, 8:22-23, 9:22-23, 10:22-23, 11:22-23, 12:22-23, 13:22-23, 14:22-23, 15:22-23, 16:22-23, 17:22-23, 18:22-23)',
        'spans(D, 17:8-23, 18:8-23)',
        // Highlight
        'spans(L, 4:12-19)',
        // Label
        'spans(A, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21)',
        // Label art
        'spans(E, 8:12-19, 9:12-19)',
        // Label title
        'spans(E, 11:12-19)',
        // Connector
        'spans(G, 19:10-21, 20:10-21, 21:10-21)',
        // Ridges top
        'spans(D, 5:10-11, 5:20-21)',
        // Lock tab
        'spans(B, 14:7-7, 15:7-7)',
      ],
      chars: {
        B: { name: 'cart_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'label_art', role: 'eye' },
        G: { name: 'connector', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 3. N64 CARTRIDGE ───────────────────────────────────────────
    {
      id: 'n64_cartridge_32',
      description: 'Nintendo 64 game cartridge — compact shape with back label.',
      size: 32,
      draw: [
        // Cart body
        'spans(B, 6:9-22, 7:9-22, 8:9-22, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22)',
        // Shadow
        'spans(D, 7:21-22, 8:21-22, 9:21-22, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22)',
        'spans(D, 16:9-22, 17:9-22)',
        // Highlight
        'spans(L, 6:10-21)',
        // Label
        'spans(A, 7:11-20, 8:11-20, 9:11-20, 10:11-20, 11:11-20, 12:11-20)',
        // Label art
        'spans(E, 9:13-18)',
        'spans(E, 8:14-17)',
        // Connector
        'spans(G, 18:11-20, 19:11-20)',
        // Back ridge
        'spans(D, 6:9-10)',
        // Region lock notch
        'spans(S, 14:9-9, 15:9-9)',
      ],
      chars: {
        B: { name: 'cart_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'label_art', role: 'eye' },
        G: { name: 'connector', role: 'belt' },
        S: { name: 'region_notch', role: 'head' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#4e4a4e' },
      },
    },

    // ─── 4. GAME BOY CARTRIDGE ──────────────────────────────────────
    {
      id: 'gb_cartridge_32',
      description: 'Game Boy game cartridge — small with notched corner and label.',
      size: 32,
      draw: [
        // Cart body
        'spans(B, 6:10-21, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21)',
        // Shadow
        'spans(D, 7:20-21, 8:20-21, 9:20-21, 10:20-21, 11:20-21, 12:20-21, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21, 19:20-21)',
        'spans(D, 18:10-21, 19:10-21)',
        // Highlight
        'spans(L, 6:11-20)',
        // Notched corner
        'spans(S, 6:10-11)',
        // Label
        'spans(A, 7:12-19, 8:12-19, 9:12-19, 10:12-19, 11:12-19, 12:12-19, 13:12-19)',
        // Label art
        'spans(E, 9:14-17, 10:13-18)',
        // Connector
        'spans(G, 20:12-19, 21:12-19)',
        // Screw hole
        'pixels(G, 15,16)',
        // Top notch
        'spans(D, 6:15-16)',
      ],
      chars: {
        B: { name: 'cart_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'label_art', role: 'eye' },
        G: { name: 'connector', role: 'belt' },
        S: { name: 'notch', role: 'head' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ─── 5. PS1 MEMORY CARD ─────────────────────────────────────────
    {
      id: 'ps1_memory_card_32',
      description: 'PlayStation 1 memory card with 15-block capacity indicator.',
      size: 32,
      draw: [
        // Card body
        'spans(B, 7:10-21, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:10-21)',
        // Shadow
        'spans(D, 8:20-21, 9:20-21, 10:20-21, 11:20-21, 12:20-21, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21, 19:20-21, 20:20-21)',
        'spans(D, 19:10-21, 20:10-21)',
        // Highlight
        'spans(L, 7:11-20)',
        // Connector edge
        'spans(G, 21:12-19)',
        // Label
        'spans(A, 8:12-19, 9:12-19, 10:12-19, 11:12-19)',
        // PS logo on label
        'spans(E, 9:14-17, 10:14-17)',
        // Block indicators (3x5 grid)
        'pixels(G, 12,13, 14,13, 16,13, 18,13, 12,15, 14,15, 16,15, 18,15, 12,17, 14,17, 16,17, 18,17, 12,19, 14,19, 16,19)',
        // Screw holes
        'pixels(D, 11,14, 11,18)',
      ],
      chars: {
        B: { name: 'card_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'ps_logo', role: 'eye' },
        G: { name: 'connector_blocks', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 6. CD-ROM DISC ─────────────────────────────────────────────
    {
      id: 'cd_rom_disc_32',
      description: 'CD-ROM game disc with rainbow refraction and center ring.',
      size: 32,
      draw: [
        // Disc outer
        'spans(B, 7:11-20, 8:8-23, 9:7-24, 10:6-25, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:6-25, 19:7-24, 20:8-23, 21:11-20)',
        // Shadow (lower right)
        'spans(D, 14:24-26, 15:24-26, 16:24-26, 17:24-26, 18:23-25, 19:22-24, 20:20-23)',
        // Highlight (upper left)
        'spans(L, 8:9-14, 9:7-10, 10:6-8)',
        // Rainbow refraction
        'spans(A, 10:18-22, 12:20-24, 14:6-8, 16:6-10)',
        // Center hole
        'spans(S, 12:14-17, 13:13-18, 14:13-18, 15:14-17)',
        // Center ring
        'spans(G, 11:13-18, 12:12-13, 12:18-19, 15:12-13, 15:18-19, 16:13-18)',
        // Data tracks (concentric lines)
        'pixels(D, 10,10, 10,21, 18,10, 18,21, 8,15, 20,16)',
      ],
      chars: {
        B: { name: 'disc_surface', role: 'body' },
        D: { name: 'disc_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'disc_shine', role: 'body', tone: 'highlight' },
        S: { name: 'center_hole', role: 'head' },
        G: { name: 'center_ring', role: 'belt' },
        A: { name: 'rainbow_refract', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#597dce', base: '#8595a1', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#6dc2ca', highlight: '#dad45e' },
      },
    },

    // ─── 7. FLOPPY DISK 3.5" ────────────────────────────────────────
    {
      id: 'floppy_disk_35_32',
      description: '3.5-inch floppy disk with metal shutter and label.',
      size: 32,
      draw: [
        // Disk body
        'spans(B, 5:7-24, 6:7-24, 7:7-24, 8:7-24, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24, 20:7-24, 21:7-24, 22:7-24)',
        // Shadow
        'spans(D, 6:23-24, 7:23-24, 8:23-24, 9:23-24, 10:23-24, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24, 19:23-24, 20:23-24, 21:23-24, 22:23-24)',
        'spans(D, 21:7-24, 22:7-24)',
        // Highlight
        'spans(L, 5:8-23)',
        // Metal shutter
        'spans(G, 5:11-20, 6:11-20, 7:11-20)',
        // Shutter opening
        'spans(S, 5:14-17, 6:14-17)',
        // Label
        'spans(A, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22)',
        // Label text lines
        'spans(E, 13:11-20, 15:11-17, 17:11-15)',
        // Write protect tab
        'spans(G, 22:8-9)',
        // Hub hole
        'spans(S, 19:14-17, 20:14-17)',
        // Corner notch
        'spans(B, 5:7-8)',
      ],
      chars: {
        B: { name: 'disk_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'metal_shutter', role: 'head' },
        S: { name: 'openings', role: 'belt' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'label_text', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#140c1c', base: '#140c1c', highlight: '#140c1c' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#4e4a4e', highlight: '#4e4a4e' },
      },
    },

    // ─── 8. VHS TAPE ────────────────────────────────────────────────
    {
      id: 'vhs_tape_32',
      description: 'VHS videotape cassette with visible tape reels and label window.',
      size: 32,
      draw: [
        // Cassette body
        'spans(B, 6:4-27, 7:4-27, 8:4-27, 9:4-27, 10:4-27, 11:4-27, 12:4-27, 13:4-27, 14:4-27, 15:4-27, 16:4-27, 17:4-27, 18:4-27, 19:4-27, 20:4-27)',
        // Shadow
        'spans(D, 7:26-27, 8:26-27, 9:26-27, 10:26-27, 11:26-27, 12:26-27, 13:26-27, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:26-27, 19:26-27, 20:26-27)',
        'spans(D, 19:4-27, 20:4-27)',
        // Highlight
        'spans(L, 6:5-26)',
        // Label
        'spans(A, 7:6-25, 8:6-25, 9:6-25)',
        // Label text
        'spans(E, 8:8-23)',
        // Window (see-through to tape)
        'spans(S, 11:8-23, 12:8-23, 13:8-23)',
        // Left reel
        'spans(G, 11:10-13, 12:9-14, 13:10-13)',
        // Right reel
        'spans(G, 11:18-21, 12:17-22, 13:18-21)',
        // Tape between reels
        'spans(G, 12:14-17)',
        // Bottom edge
        'spans(D, 18:5-26)',
        // Flap guard
        'spans(B, 16:6-25, 17:6-25)',
      ],
      chars: {
        B: { name: 'cassette_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'label_text', role: 'eye' },
        S: { name: 'tape_window', role: 'head' },
        G: { name: 'tape_reels', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#4e4a4e', highlight: '#4e4a4e' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 9. CASSETTE TAPE (AUDIO) ───────────────────────────────────
    {
      id: 'audio_cassette_32',
      description: 'Compact audio cassette tape with transparent window and tape spools.',
      size: 32,
      draw: [
        // Cassette body
        'spans(B, 8:6-25, 9:6-25, 10:6-25, 11:6-25, 12:6-25, 13:6-25, 14:6-25, 15:6-25, 16:6-25, 17:6-25, 18:6-25, 19:6-25)',
        // Shadow
        'spans(D, 9:24-25, 10:24-25, 11:24-25, 12:24-25, 13:24-25, 14:24-25, 15:24-25, 16:24-25, 17:24-25, 18:24-25, 19:24-25)',
        'spans(D, 18:6-25, 19:6-25)',
        // Highlight
        'spans(L, 8:7-24)',
        // Label area
        'spans(A, 9:8-23, 10:8-23, 11:8-23)',
        // Label text
        'spans(E, 10:10-21)',
        // Tape window
        'spans(S, 13:10-21, 14:10-21, 15:10-21)',
        // Left spool
        'spans(G, 13:11-14, 14:11-14, 15:11-14)',
        // Right spool
        'spans(G, 13:17-20, 14:17-20, 15:17-20)',
        // Spool centers
        'pixels(D, 13,14, 13,18)',
        // Tape visible
        'spans(G, 14:14-17)',
        // Screw holes
        'pixels(D, 12,8, 12,23, 17,8, 17,23)',
        // Write protect tabs
        'spans(S, 19:8-9, 19:22-23)',
        // Head opening
        'spans(S, 19:13-18)',
      ],
      chars: {
        B: { name: 'cassette_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'label_text', role: 'eye' },
        S: { name: 'window_openings', role: 'head' },
        G: { name: 'tape_spools', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#854c30', highlight: '#854c30' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 10. AV CABLE (RED/WHITE/YELLOW) ────────────────────────────
    {
      id: 'av_cable_rca_32',
      description: 'Classic RCA composite AV cable with red, white, and yellow connectors.',
      size: 32,
      draw: [
        // Cable bundle
        'spans(B, 5:14-17, 6:14-17, 7:14-17, 8:14-17)',
        // Cable splits
        'spans(B, 9:10-11, 9:15-16, 9:20-21)',
        'spans(B, 10:9-10, 10:15-16, 10:21-22)',
        // Left connector body (white/audio L)
        'spans(G, 11:7-12, 12:7-12, 13:7-12, 14:7-12, 15:7-12)',
        // Center connector body (yellow/video)
        'spans(A, 11:13-18, 12:13-18, 13:13-18, 14:13-18, 15:13-18)',
        // Right connector body (red/audio R)
        'spans(E, 11:19-24, 12:19-24, 13:19-24, 14:19-24, 15:19-24)',
        // Metal tips
        'spans(S, 16:8-11, 16:14-17, 16:20-23)',
        'spans(S, 17:9-10, 17:15-16, 17:21-22)',
        // Center pins
        'pixels(S, 10,17, 16,17, 10,18, 16,18)',
        // Ring grooves
        'spans(D, 12:7-7, 12:12-12, 12:13-13, 12:18-18, 12:19-19, 12:24-24)',
        // Shadow
        'spans(D, 13:11-12, 14:11-12, 13:17-18, 14:17-18, 13:23-24, 14:23-24)',
      ],
      chars: {
        B: { name: 'cable', role: 'body' },
        D: { name: 'cable_shadow', role: 'body', tone: 'shadow' },
        G: { name: 'white_plug', role: 'head' },
        A: { name: 'yellow_plug', role: 'accessory' },
        E: { name: 'red_plug', role: 'eye' },
        S: { name: 'metal_tip', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        head:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 11. RUMBLE PAK (N64) ───────────────────────────────────────
    {
      id: 'n64_rumble_pak_32',
      description: 'Nintendo 64 Rumble Pak controller accessory with vibration motor.',
      size: 32,
      draw: [
        // Body
        'spans(B, 7:9-22, 8:9-22, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22)',
        // Shadow
        'spans(D, 8:21-22, 9:21-22, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22, 19:21-22)',
        'spans(D, 18:9-22, 19:9-22)',
        // Highlight
        'spans(L, 7:10-21)',
        // Connector
        'spans(G, 6:12-19)',
        // Label
        'spans(A, 8:11-20, 9:11-20, 10:11-20)',
        // Label N logo
        'spans(E, 9:14-17)',
        // Vibration icon
        'pixels(A, 13,13, 12,14, 14,14, 13,15, 12,16, 14,16, 13,17)',
        // Texture ridges
        'spans(D, 16:10-11, 16:20-21)',
        // Bottom edge
        'spans(D, 19:10-21)',
      ],
      chars: {
        B: { name: 'pak_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'label_icon', role: 'accessory' },
        E: { name: 'n_logo', role: 'eye' },
        G: { name: 'connector', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ─── 12. GENESIS CARTRIDGE ──────────────────────────────────────
    {
      id: 'genesis_cartridge_32',
      description: 'Sega Genesis/Mega Drive cartridge with distinctive shape.',
      size: 32,
      draw: [
        // Cart body (taller than SNES)
        'spans(B, 3:9-22, 4:9-22, 5:9-22, 6:9-22, 7:9-22, 8:9-22, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22)',
        // Shadow
        'spans(D, 4:21-22, 5:21-22, 6:21-22, 7:21-22, 8:21-22, 9:21-22, 10:21-22, 11:21-22, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 16:21-22, 17:21-22, 18:21-22)',
        'spans(D, 17:9-22, 18:9-22)',
        // Highlight
        'spans(L, 3:10-21)',
        // Label
        'spans(A, 4:11-20, 5:11-20, 6:11-20, 7:11-20, 8:11-20, 9:11-20, 10:11-20, 11:11-20)',
        // Label art
        'spans(E, 6:13-18, 7:13-18, 8:13-18)',
        // Label title
        'spans(E, 10:13-18)',
        // Connector
        'spans(G, 19:11-20, 20:11-20)',
        // Top ridge
        'spans(D, 3:9-10, 3:21-22)',
        // Grip texture
        'spans(D, 13:10-10, 14:10-10, 15:10-10)',
      ],
      chars: {
        B: { name: 'cart_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'label_art', role: 'eye' },
        G: { name: 'connector', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 13. LINK CABLE ─────────────────────────────────────────────
    {
      id: 'link_cable_32',
      description: 'Game Boy link cable for multiplayer — two connectors joined by cord.',
      size: 32,
      draw: [
        // Left connector
        'spans(B, 10:4-10, 11:4-10, 12:4-10, 13:4-10, 14:5-9)',
        // Left shadow
        'spans(D, 12:9-10, 13:9-10, 14:8-9)',
        // Left highlight
        'spans(L, 10:5-9)',
        // Left plug pins
        'spans(G, 14:6-8)',
        // Cable
        'spans(A, 11:10-11, 12:11-14, 13:14-17, 14:17-20, 13:20-21)',
        // Right connector
        'spans(B, 10:21-27, 11:21-27, 12:21-27, 13:21-27, 14:22-26)',
        // Right shadow
        'spans(D, 12:26-27, 13:26-27, 14:25-26)',
        // Right highlight
        'spans(L, 10:22-26)',
        // Right plug pins
        'spans(G, 14:23-25)',
        // Cable droop
        'spans(A, 15:15-16)',
      ],
      chars: {
        B: { name: 'connector', role: 'body' },
        D: { name: 'connector_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'connector_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'cable', role: 'accessory' },
        G: { name: 'pins', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 14. GAME SHARK / ACTION REPLAY ─────────────────────────────
    {
      id: 'game_shark_32',
      description: 'Game Shark cheat cartridge with pass-through slot.',
      size: 32,
      draw: [
        // Cart body (wider)
        'spans(B, 4:7-24, 5:7-24, 6:7-24, 7:7-24, 8:7-24, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24)',
        // Shadow
        'spans(D, 5:23-24, 6:23-24, 7:23-24, 8:23-24, 9:23-24, 10:23-24, 11:23-24, 12:23-24, 13:23-24, 14:23-24, 15:23-24, 16:23-24, 17:23-24, 18:23-24)',
        'spans(D, 17:7-24, 18:7-24)',
        // Highlight
        'spans(L, 4:8-23)',
        // Pass-through slot
        'spans(S, 4:12-19, 5:12-19)',
        // Label (shark graphic)
        'spans(A, 7:9-22, 8:9-22, 9:9-22, 10:9-22, 11:9-22)',
        // Shark silhouette on label
        'spans(E, 8:11-20, 9:12-18, 10:11-16)',
        // Connector
        'spans(G, 19:10-21, 20:10-21)',
        // Status LED
        'spans(E, 13:9-9)',
        // Switch
        'spans(G, 14:9-10)',
      ],
      chars: {
        B: { name: 'cart_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'passthrough', role: 'head' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'label_art_led', role: 'eye' },
        G: { name: 'connector_switch', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 15. MULTITAP ADAPTER ───────────────────────────────────────
    {
      id: 'multitap_adapter_32',
      description: 'Multi-player adapter hub — 4 controller ports from one console port.',
      size: 32,
      draw: [
        // Cable in
        'spans(B, 7:15-16, 8:15-16)',
        // Hub body
        'spans(B, 9:6-25, 10:6-25, 11:6-25, 12:6-25, 13:6-25, 14:6-25, 15:6-25, 16:6-25, 17:6-25)',
        // Shadow
        'spans(D, 10:24-25, 11:24-25, 12:24-25, 13:24-25, 14:24-25, 15:24-25, 16:24-25, 17:24-25)',
        'spans(D, 16:6-25, 17:6-25)',
        // Highlight
        'spans(L, 9:7-24)',
        // Port 1
        'spans(G, 17:7-10)',
        // Port 2
        'spans(G, 17:12-15)',
        // Port 3
        'spans(G, 17:16-19)',
        // Port 4
        'spans(G, 17:21-24)',
        // Port labels (1-4)
        'pixels(A, 8,15, 14,15, 18,15, 22,15)',
        // Logo
        'spans(A, 11:12-19)',
        // LED indicators
        'pixels(E, 8,13, 14,13, 18,13, 22,13)',
      ],
      chars: {
        B: { name: 'hub_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'ports', role: 'head' },
        A: { name: 'labels_logo', role: 'accessory' },
        E: { name: 'leds', role: 'eye' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#140c1c', base: '#4e4a4e', highlight: '#757161' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ─── 16. MEMORY CARD (N64) ──────────────────────────────────────
    {
      id: 'n64_memory_card_32',
      description: 'Nintendo 64 Controller Pak memory card for game saves.',
      size: 32,
      draw: [
        // Body
        'spans(B, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21)',
        // Shadow
        'spans(D, 9:20-21, 10:20-21, 11:20-21, 12:20-21, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21, 18:20-21)',
        'spans(D, 17:10-21, 18:10-21)',
        // Highlight
        'spans(L, 8:11-20)',
        // Connector
        'spans(G, 7:13-18)',
        // Label
        'spans(A, 9:12-19, 10:12-19, 11:12-19)',
        // N logo
        'spans(E, 10:14-17)',
        // Pages indicator dots
        'pixels(G, 12,13, 14,13, 16,13, 18,13)',
        // Texture lines
        'spans(D, 14:11-11, 15:11-11)',
      ],
      chars: {
        B: { name: 'card_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'n_logo', role: 'eye' },
        G: { name: 'connector_dots', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#4e4a4e', base: '#4e4a4e', highlight: '#757161' },
      },
    },

    // ─── 17. GAME GENIE ─────────────────────────────────────────────
    {
      id: 'game_genie_32',
      description: 'Game Genie cheat device — pass-through cartridge with code entry.',
      size: 32,
      draw: [
        // Top (game slot)
        'spans(S, 4:9-22, 5:9-22)',
        // Body
        'spans(B, 6:8-23, 7:8-23, 8:8-23, 9:8-23, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23)',
        // Shadow
        'spans(D, 7:22-23, 8:22-23, 9:22-23, 10:22-23, 11:22-23, 12:22-23, 13:22-23, 14:22-23, 15:22-23, 16:22-23, 17:22-23)',
        'spans(D, 16:8-23, 17:8-23)',
        // Highlight
        'spans(L, 6:9-22)',
        // Label
        'spans(A, 7:10-21, 8:10-21, 9:10-21, 10:10-21)',
        // Genie lamp graphic
        'spans(E, 8:13-18, 9:14-17)',
        // Code switches/DIP
        'spans(G, 12:10-21)',
        // Switch positions
        'pixels(G, 11,12, 13,12, 11,14, 13,14, 11,16, 13,16, 11,18, 13,18)',
        // Connector
        'spans(G, 18:10-21, 19:10-21)',
      ],
      chars: {
        B: { name: 'device_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        S: { name: 'game_slot', role: 'head' },
        A: { name: 'label', role: 'accessory' },
        E: { name: 'genie_art', role: 'eye' },
        G: { name: 'switches_connector', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#30346d', highlight: '#30346d' },
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 18. RF SWITCH / ADAPTER ────────────────────────────────────
    {
      id: 'rf_switch_32',
      description: 'RF switch box for connecting consoles to coaxial TV input.',
      size: 32,
      draw: [
        // Box body
        'spans(B, 10:8-23, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23)',
        // Shadow
        'spans(D, 11:22-23, 12:22-23, 13:22-23, 14:22-23, 15:22-23, 16:22-23, 17:22-23)',
        'spans(D, 16:8-23, 17:8-23)',
        // Highlight
        'spans(L, 10:9-22)',
        // Coax in (from antenna)
        'spans(G, 9:10-11)',
        'spans(G, 8:10-11)',
        // Coax out (to TV)
        'spans(G, 9:20-21)',
        'spans(G, 8:20-21)',
        // Console input
        'spans(G, 18:14-17)',
        // Switch (game/tv)
        'spans(A, 13:14-17, 14:14-17)',
        // Labels
        'spans(A, 11:10-12)',
        'spans(A, 11:19-21)',
        // Cable stubs
        'spans(B, 7:10-11, 7:20-21)',
        'spans(B, 19:15-16, 20:15-16)',
      ],
      chars: {
        B: { name: 'box_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        G: { name: 'connectors', role: 'head' },
        A: { name: 'switch_labels', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── 19. EXPANSION PAK (N64) ────────────────────────────────────
    {
      id: 'n64_expansion_pak_32',
      description: 'Nintendo 64 Expansion Pak — red top RAM upgrade module.',
      size: 32,
      draw: [
        // Red top cap
        'spans(A, 9:11-20, 10:11-20, 11:11-20)',
        // Top highlight
        'spans(E, 9:12-19)',
        // Body
        'spans(B, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21)',
        // Shadow
        'spans(D, 13:20-21, 14:20-21, 15:20-21, 16:20-21, 17:20-21)',
        'spans(D, 16:10-21, 17:10-21)',
        // Highlight
        'spans(L, 12:11-12)',
        // Connector pins
        'spans(G, 18:12-19, 19:12-19)',
        // Label
        'spans(A, 13:12-19, 14:12-19)',
        // Chip markings
        'pixels(D, 13,15, 14,16)',
        // Eject handle
        'spans(G, 10:14-17)',
      ],
      chars: {
        B: { name: 'module_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'red_top_label', role: 'accessory' },
        E: { name: 'top_highlight', role: 'accessory', tone: 'highlight' },
        G: { name: 'connector_handle', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 20. LIGHT GUN (NES ZAPPER) ─────────────────────────────────
    {
      id: 'nes_zapper_32',
      description: 'NES Zapper light gun — orange and gray with trigger and barrel.',
      size: 32,
      draw: [
        // Barrel
        'spans(A, 8:4-14, 9:4-14, 10:4-14, 11:4-14)',
        // Barrel shadow
        'spans(E, 10:4-14, 11:4-14)',
        // Barrel tip (dark)
        'spans(S, 8:4-5, 9:4-5, 10:4-5, 11:4-5)',
        // Barrel highlight
        'spans(L, 8:6-10)',
        // Body
        'spans(B, 10:14-22, 11:14-22, 12:14-22, 13:14-22, 14:14-22, 15:14-22)',
        // Body shadow
        'spans(D, 12:21-22, 13:21-22, 14:21-22, 15:21-22, 14:14-15, 15:14-15)',
        // Body highlight
        'spans(L, 10:15-20)',
        // Trigger
        'spans(G, 14:17-19, 15:17-17, 16:17-17)',
        // Trigger guard
        'spans(B, 16:15-16, 16:18-20)',
        // Grip
        'spans(B, 16:18-22, 17:19-22, 18:19-22, 19:20-21)',
        // Grip shadow
        'spans(D, 17:21-22, 18:21-22)',
        // Sight
        'spans(S, 7:7-8)',
      ],
      chars: {
        B: { name: 'gun_body', role: 'body' },
        D: { name: 'body_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'body_highlight', role: 'body', tone: 'highlight' },
        A: { name: 'barrel', role: 'accessory' },
        E: { name: 'barrel_shadow', role: 'accessory', tone: 'shadow' },
        S: { name: 'barrel_tip', role: 'head' },
        G: { name: 'trigger', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

  ],
};

export default batch;
