/**
 * Cozy Consumables Bundle — Batch 1: Potions & Bottles (32x32 DSL)
 * 20 unique potion/bottle templates. Neo-SNES style, DB16 palette.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'consumables',
  exportNames: { templates: 'COZY_POTIONS_32_TEMPLATES', schemes: 'COZY_POTIONS_32_COLOR_SCHEMES' },
  templates: [

    // ─── 1. RED POTION ROUND ──────────────────────────────────────
    {
      id: 'red_potion_round_32',
      description: 'Classic round red potion flask with cork stopper.',
      size: 32,
      draw: [
        'spans(C, 5:14-17, 6:14-17)',
        'spans(G, 7:14-17, 8:13-18)',
        'spans(B, 9:12-19, 10:11-20, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:11-20, 16:12-19)',
        'spans(D, 13:19-21, 14:19-21, 15:19-20, 16:18-19)',
        'spans(L, 9:13-15, 10:11-13, 11:10-12)',
        'pixels(H, 12,11, 11,12)',
        'spans(G, 17:12-19, 18:13-18)',
      ],
      chars: {
        B: { name: 'red_liquid', role: 'body' },
        D: { name: 'liquid_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        H: { name: 'specular', role: 'accessory' },
        G: { name: 'glass_rim', role: 'head' },
        C: { name: 'cork', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 2. BLUE MANA FLASK ───────────────────────────────────────
    {
      id: 'blue_mana_flask_32',
      description: 'Tall blue mana flask with swirling energy inside.',
      size: 32,
      draw: [
        'spans(C, 4:15-16, 5:15-16)',
        'spans(G, 6:15-16, 7:14-17, 8:13-18)',
        'spans(B, 9:12-19, 10:12-19, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19, 16:12-19)',
        'spans(D, 13:18-19, 14:18-19, 15:18-19, 16:18-19)',
        'spans(L, 9:12-13, 10:12-13, 11:12-13)',
        'pixels(A, 14,11, 15,13, 16,12, 17,14)',
        'spans(G, 17:12-19, 18:13-18)',
      ],
      chars: {
        B: { name: 'blue_liquid', role: 'body' },
        D: { name: 'liquid_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        G: { name: 'glass', role: 'head' },
        C: { name: 'cork', role: 'belt' },
        A: { name: 'mana_swirl', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#deeed6' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 3. GREEN ELIXIR ──────────────────────────────────────────
    {
      id: 'green_elixir_32',
      description: 'Triangular green elixir bottle with leaf label.',
      size: 32,
      draw: [
        'spans(C, 5:15-16, 6:15-16)',
        'spans(G, 7:15-16, 8:14-17)',
        'spans(B, 9:13-18, 10:12-19, 11:11-20, 12:11-20, 13:10-21, 14:10-21, 15:10-21, 16:9-22)',
        'spans(D, 14:20-21, 15:20-21, 16:21-22)',
        'spans(L, 9:13-14, 10:12-13, 11:11-12)',
        'spans(A, 13:14-17, 14:14-17)',
        'spans(G, 17:9-22, 18:10-21)',
      ],
      chars: {
        B: { name: 'green_liquid', role: 'body' },
        D: { name: 'liquid_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        G: { name: 'glass', role: 'head' },
        C: { name: 'cork', role: 'belt' },
        A: { name: 'leaf_label', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#346524', highlight: '#deeed6' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 4. WINE BOTTLE ───────────────────────────────────────────
    {
      id: 'wine_bottle_32',
      description: 'Elegant wine bottle with label and wax seal.',
      size: 32,
      draw: [
        'spans(A, 3:15-16, 4:14-17)',
        'spans(G, 5:14-17, 6:14-17, 7:15-16, 8:15-16)',
        'spans(B, 9:14-17, 10:13-18, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19, 16:12-19, 17:12-19, 18:12-19, 19:12-19)',
        'spans(D, 15:18-19, 16:18-19, 17:18-19, 18:18-19, 19:18-19)',
        'spans(L, 11:12-13, 12:12-13, 13:12-13, 14:12-13)',
        'spans(E, 14:14-17, 15:14-17, 16:14-17, 17:14-17)',
        'spans(G, 20:12-19, 21:13-18)',
      ],
      chars: {
        B: { name: 'dark_glass', role: 'body' },
        D: { name: 'glass_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        G: { name: 'bottle_neck', role: 'head' },
        A: { name: 'wax_seal', role: 'accessory' },
        E: { name: 'label', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#346524', highlight: '#8595a1' },
        head:      { shadow: '#346524', base: '#346524', highlight: '#757161' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 5. GOLDEN ELIXIR ─────────────────────────────────────────
    {
      id: 'golden_elixir_32',
      description: 'Rare golden elixir in ornate bottle with metal stopper.',
      size: 32,
      draw: [
        'spans(G, 5:14-17, 6:13-18)',
        'spans(G, 7:14-17)',
        'spans(B, 8:13-18, 9:12-19, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:12-19, 15:13-18)',
        'spans(D, 12:19-20, 13:19-20, 14:18-19)',
        'spans(L, 8:13-15, 9:12-14, 10:11-13)',
        'pixels(H, 11,12, 10,13)',
        'spans(A, 12:14-17, 13:14-17)',
        'spans(G, 16:13-18, 17:14-17)',
      ],
      chars: {
        B: { name: 'golden_liquid', role: 'body' },
        D: { name: 'liquid_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        H: { name: 'specular', role: 'accessory' },
        G: { name: 'ornate_metal', role: 'head' },
        A: { name: 'emblem', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },
      },
    },

    // ─── 6. PURPLE POISON ─────────────────────────────────────────
    {
      id: 'purple_poison_32',
      description: 'Sinister purple poison bottle with skull and crossbones.',
      size: 32,
      draw: [
        'spans(C, 5:15-16, 6:15-16)',
        'spans(G, 7:14-17, 8:13-18)',
        'spans(B, 9:12-19, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:12-19)',
        'spans(D, 12:19-20, 13:19-20, 14:18-19)',
        'spans(L, 9:12-13, 10:11-12)',
        'spans(A, 11:14-17, 12:14-17)',
        'pixels(E, 15,11, 16,11, 15,12)',
        'pixels(B, 11,8, 19,9)',
        'spans(G, 15:12-19, 16:13-18)',
      ],
      chars: {
        B: { name: 'purple_liquid', role: 'body' },
        D: { name: 'liquid_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        G: { name: 'glass', role: 'head' },
        C: { name: 'cork', role: 'belt' },
        A: { name: 'skull_label', role: 'accessory' },
        E: { name: 'skull_detail', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#597dce', highlight: '#deeed6' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        leg:       { shadow: '#140c1c', base: '#442434', highlight: '#442434' },
      },
    },

    // ─── 7. MILK BOTTLE ───────────────────────────────────────────
    {
      id: 'milk_bottle_32',
      description: 'Classic glass milk bottle with cream cap — cozy farm item.',
      size: 32,
      draw: [
        'spans(A, 4:14-17, 5:14-17)',
        'spans(G, 6:14-17, 7:14-17, 8:14-17)',
        'spans(B, 9:13-18, 10:12-19, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19, 16:12-19, 17:12-19, 18:12-19)',
        'spans(D, 15:18-19, 16:18-19, 17:18-19, 18:18-19)',
        'spans(L, 10:12-13, 11:12-13, 12:12-13, 13:12-13)',
        'pixels(H, 11,12)',
        'spans(G, 19:12-19, 20:13-18)',
      ],
      chars: {
        B: { name: 'milk', role: 'body' },
        D: { name: 'milk_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        H: { name: 'specular', role: 'accessory' },
        G: { name: 'glass_rim', role: 'head' },
        A: { name: 'cream_cap', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 8. HONEY JAR ────────────────────────────────────────────
    {
      id: 'honey_jar_32',
      description: 'Glass honey jar with cloth lid and tied string — sweet golden nectar.',
      size: 32,
      draw: [
        'spans(A, 5:12-19, 6:11-20, 7:12-19)',
        'spans(E, 7:14-17)',
        'spans(G, 8:12-19)',
        'spans(B, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20)',
        'spans(D, 14:19-20, 15:19-20, 16:19-20)',
        'spans(L, 9:11-12, 10:11-12, 11:11-12)',
        'pixels(H, 10,11)',
        'spans(F, 13:14-17, 14:14-17)',
        'spans(G, 17:11-20, 18:12-19)',
      ],
      chars: {
        B: { name: 'honey', role: 'body' },
        D: { name: 'honey_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        H: { name: 'specular', role: 'accessory' },
        G: { name: 'glass_rim', role: 'head' },
        A: { name: 'cloth_lid', role: 'belt' },
        E: { name: 'string_tie', role: 'leg' },
        F: { name: 'honey_label', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' },
        leg:       { shadow: '#854c30', base: '#d27d2c', highlight: '#d27d2c' },
        arm:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 9. INK BOTTLE ────────────────────────────────────────────
    {
      id: 'ink_bottle_32',
      description: 'Small ink bottle with quill — writer\'s essential.',
      size: 32,
      draw: [
        'spans(A, 3:19-20, 4:18-19, 5:17-18, 6:16-17, 7:15-16)',
        'spans(G, 7:13-16, 8:12-17)',
        'spans(B, 9:11-18, 10:11-18, 11:11-18, 12:11-18, 13:11-18, 14:11-18)',
        'spans(D, 12:17-18, 13:17-18, 14:17-18)',
        'spans(L, 9:11-12, 10:11-12, 11:11-12)',
        'spans(G, 15:11-18, 16:12-17)',
      ],
      chars: {
        B: { name: 'ink', role: 'body' },
        D: { name: 'ink_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        G: { name: 'glass_rim', role: 'head' },
        A: { name: 'quill', role: 'accessory' },
      },
      colors: {
        body:      { shadow: '#140c1c', base: '#30346d', highlight: '#8595a1' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
      },
    },

    // ─── 10. SAKE BOTTLE ──────────────────────────────────────────
    {
      id: 'sake_bottle_32',
      description: 'Traditional Japanese sake bottle (tokkuri) — ceramic white with blue.',
      size: 32,
      draw: [
        'spans(B, 4:14-17, 5:14-17, 6:14-17, 7:14-17)',
        'spans(L, 4:14-15)',
        'spans(B, 8:13-18, 9:12-19, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:12-19)',
        'spans(D, 13:19-20, 14:19-20, 15:19-20, 16:18-19)',
        'spans(L, 9:12-13, 10:11-12, 11:11-12)',
        'spans(A, 12:13-18, 13:13-18, 14:13-18)',
        'spans(G, 17:12-19, 18:13-18)',
      ],
      chars: {
        B: { name: 'ceramic', role: 'body' },
        D: { name: 'ceramic_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'ceramic_shine', role: 'body', tone: 'highlight' },
        A: { name: 'blue_pattern', role: 'accessory' },
        G: { name: 'base', role: 'head' },
      },
      colors: {
        body:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#deeed6' },
      },
    },

    // ─── 11. BEER MUG ─────────────────────────────────────────────
    {
      id: 'beer_mug_32',
      description: 'Frothy beer mug with foam overflowing — tavern classic.',
      size: 32,
      draw: [
        'spans(A, 5:11-20, 6:11-20)',
        'pixels(A, 10,5, 21,5, 13,4, 18,4)',
        'spans(B, 7:11-20, 8:11-20, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20)',
        'spans(D, 13:19-20, 14:19-20, 15:19-20, 16:19-20)',
        'spans(L, 7:11-12, 8:11-12, 9:11-12, 10:11-12)',
        'spans(G, 8:21-23, 9:21-23, 10:21-21, 10:23-23, 11:21-21, 11:23-23, 12:21-21, 12:23-23, 13:21-23, 14:21-23)',
        'spans(G, 17:11-20, 18:12-19)',
      ],
      chars: {
        B: { name: 'beer', role: 'body' },
        D: { name: 'beer_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        A: { name: 'foam', role: 'accessory' },
        G: { name: 'mug_handle', role: 'head' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 12. PERFUME BOTTLE ───────────────────────────────────────
    {
      id: 'perfume_bottle_32',
      description: 'Elegant perfume bottle with atomizer bulb — luxury item.',
      size: 32,
      draw: [
        'spans(A, 4:17-19, 5:17-19, 6:17-18)',
        'spans(G, 5:14-16, 6:14-17, 7:14-17)',
        'spans(B, 8:12-19, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:12-19)',
        'spans(D, 11:19-20, 12:19-20, 13:18-19)',
        'spans(L, 8:12-13, 9:11-12, 10:11-12)',
        'pixels(H, 10,12)',
        'spans(E, 10:14-17, 11:14-17)',
        'spans(G, 14:12-19, 15:13-18)',
      ],
      chars: {
        B: { name: 'pink_liquid', role: 'body' },
        D: { name: 'liquid_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        H: { name: 'specular', role: 'leg' },
        G: { name: 'crystal_cap', role: 'head' },
        A: { name: 'atomizer', role: 'accessory' },
        E: { name: 'label', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#deeed6' },
        leg:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        accessory: { shadow: '#d04648', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 13. HEALING HERB BOTTLE ──────────────────────────────────
    {
      id: 'herb_bottle_32',
      description: 'Apothecary herb bottle with dried herbs inside.',
      size: 32,
      draw: [
        'spans(C, 5:14-17, 6:14-17)',
        'spans(G, 7:13-18, 8:13-18)',
        'spans(B, 9:12-19, 10:12-19, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19, 16:12-19)',
        'spans(D, 14:18-19, 15:18-19, 16:18-19)',
        'spans(L, 9:12-13, 10:12-13, 11:12-13)',
        'spans(A, 11:14-17, 12:13-18, 13:14-17)',
        'pixels(E, 15,12, 17,13, 14,14)',
        'spans(G, 17:12-19, 18:13-18)',
      ],
      chars: {
        B: { name: 'glass', role: 'body' },
        D: { name: 'glass_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        G: { name: 'glass_rim', role: 'head' },
        C: { name: 'cork', role: 'belt' },
        A: { name: 'herbs_inside', role: 'accessory' },
        E: { name: 'leaf_bits', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        accessory: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        leg:       { shadow: '#346524', base: '#dad45e', highlight: '#dad45e' },
      },
    },

    // ─── 14. POTION VIAL RACK ─────────────────────────────────────
    {
      id: 'potion_vial_rack_32',
      description: 'Wooden rack holding 3 small colorful potion vials.',
      size: 32,
      draw: [
        'spans(B, 7:10-11, 7:15-16, 7:20-21)',
        'spans(B, 8:10-11, 8:15-16, 8:20-21)',
        'spans(B, 9:10-11, 9:15-16, 9:20-21)',
        'spans(A, 7:10-11, 8:10-11, 9:10-11)',
        'spans(E, 7:15-16, 8:15-16, 9:15-16)',
        'spans(F, 7:20-21, 8:20-21, 9:20-21)',
        'spans(C, 6:10-11, 6:15-16, 6:20-21)',
        'spans(G, 10:8-23, 11:8-23)',
        'spans(D, 11:8-9, 11:22-23)',
        'spans(L, 10:9-22)',
        'spans(G, 12:8-9, 12:22-23, 13:8-9, 13:22-23, 14:8-9, 14:22-23)',
        'spans(G, 15:8-23)',
      ],
      chars: {
        B: { name: 'vial_glass', role: 'body' },
        A: { name: 'red_potion', role: 'accessory' },
        E: { name: 'blue_potion', role: 'belt' },
        F: { name: 'green_potion', role: 'leg' },
        C: { name: 'cork', role: 'arm' },
        G: { name: 'wood_rack', role: 'head' },
        D: { name: 'wood_shadow', role: 'head', tone: 'shadow' },
        L: { name: 'wood_highlight', role: 'head', tone: 'highlight' },
      },
      colors: {
        body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        leg:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 15. WATER FLASK ──────────────────────────────────────────
    {
      id: 'water_flask_32',
      description: 'Leather-wrapped water flask with strap — adventurer essential.',
      size: 32,
      draw: [
        'spans(G, 5:14-17, 6:14-17)',
        'spans(B, 7:12-19, 8:11-20, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:12-19)',
        'spans(D, 12:19-20, 13:19-20, 14:18-19)',
        'spans(L, 7:12-14, 8:11-13, 9:11-12)',
        'spans(A, 10:10-10, 11:9-10, 12:8-10, 13:8-9, 14:7-8)',
        'spans(G, 15:12-19, 16:13-18)',
        'spans(E, 10:14-17, 11:14-17)',
      ],
      chars: {
        B: { name: 'leather', role: 'body' },
        D: { name: 'leather_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'leather_shine', role: 'body', tone: 'highlight' },
        G: { name: 'metal_cap', role: 'head' },
        A: { name: 'strap', role: 'accessory' },
        E: { name: 'stitch_detail', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#dad45e' },
      },
    },

    // ─── 16. LOVE POTION ──────────────────────────────────────────
    {
      id: 'love_potion_32',
      description: 'Heart-shaped pink love potion with sparkles.',
      size: 32,
      draw: [
        'spans(C, 4:15-16, 5:15-16)',
        'spans(G, 6:14-17)',
        'spans(B, 7:10-14, 7:17-21, 8:9-22, 9:9-22, 10:10-21, 11:11-20, 12:12-19, 13:13-18, 14:14-17)',
        'spans(D, 10:20-21, 11:19-20, 12:18-19, 13:17-18)',
        'spans(L, 7:10-12, 8:9-11, 9:9-10)',
        'pixels(H, 10,10, 9,11)',
        'pixels(A, 13,8, 20,9, 10,12)',
      ],
      chars: {
        B: { name: 'pink_potion', role: 'body' },
        D: { name: 'potion_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        H: { name: 'specular', role: 'accessory' },
        G: { name: 'glass_neck', role: 'head' },
        C: { name: 'cork', role: 'belt' },
        A: { name: 'sparkle', role: 'leg' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#d04648', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 17. OLIVE OIL BOTTLE ─────────────────────────────────────
    {
      id: 'olive_oil_bottle_32',
      description: 'Mediterranean olive oil bottle with handle and pouring spout.',
      size: 32,
      draw: [
        'spans(G, 4:15-16, 5:14-17, 6:14-17, 7:15-16)',
        'spans(B, 8:14-17, 9:13-18, 10:12-19, 11:12-19, 12:12-19, 13:12-19, 14:12-19, 15:12-19, 16:12-19, 17:13-18)',
        'spans(D, 14:18-19, 15:18-19, 16:18-19, 17:17-18)',
        'spans(L, 9:13-14, 10:12-13, 11:12-13)',
        'spans(A, 8:19-21, 9:20-21, 10:20-20, 11:20-20, 12:20-21, 13:19-21)',
        'spans(E, 13:14-17, 14:14-17)',
        'spans(G, 18:13-18, 19:14-17)',
      ],
      chars: {
        B: { name: 'oil', role: 'body' },
        D: { name: 'oil_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        G: { name: 'ceramic', role: 'head' },
        A: { name: 'handle', role: 'accessory' },
        E: { name: 'label', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        accessory: { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
        belt:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
      },
    },

    // ─── 18. CRYSTAL DECANTER ─────────────────────────────────────
    {
      id: 'crystal_decanter_32',
      description: 'Ornate crystal decanter with faceted glass pattern.',
      size: 32,
      draw: [
        'spans(G, 3:14-17, 4:15-16, 5:15-16, 6:14-17)',
        'spans(B, 7:13-18, 8:12-19, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:12-19, 15:13-18)',
        'spans(D, 12:19-20, 13:19-20, 14:18-19)',
        'spans(L, 7:13-15, 8:12-14, 9:11-13)',
        'pixels(A, 14,10, 17,10, 14,12, 17,12, 14,14, 17,14)',
        'pixels(H, 13,9, 12,10)',
        'spans(G, 16:13-18, 17:14-17)',
      ],
      chars: {
        B: { name: 'crystal', role: 'body' },
        D: { name: 'crystal_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'crystal_shine', role: 'body', tone: 'highlight' },
        H: { name: 'specular', role: 'accessory' },
        G: { name: 'crystal_stopper', role: 'head' },
        A: { name: 'facet_lines', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        accessory: { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#8595a1', base: '#d2aa99', highlight: '#d2aa99' },
      },
    },

    // ─── 19. HOT SAUCE BOTTLE ─────────────────────────────────────
    {
      id: 'hot_sauce_bottle_32',
      description: 'Small hot sauce bottle with fire label — spicy condiment.',
      size: 32,
      draw: [
        'spans(G, 5:15-16, 6:15-16, 7:14-17)',
        'spans(B, 8:13-18, 9:13-18, 10:13-18, 11:13-18, 12:13-18, 13:13-18, 14:13-18, 15:13-18, 16:13-18)',
        'spans(D, 14:17-18, 15:17-18, 16:17-18)',
        'spans(L, 8:13-14, 9:13-14, 10:13-14)',
        'spans(A, 11:14-17, 12:14-17, 13:14-17)',
        'pixels(E, 15,12, 16,12, 15,13, 17,12)',
        'spans(G, 17:13-18, 18:14-17)',
      ],
      chars: {
        B: { name: 'red_sauce', role: 'body' },
        D: { name: 'sauce_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        G: { name: 'cap', role: 'head' },
        A: { name: 'label_bg', role: 'accessory' },
        E: { name: 'fire_symbol', role: 'belt' },
      },
      colors: {
        body:      { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        head:      { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        belt:      { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
      },
    },

    // ─── 20. STAMINA TONIC ────────────────────────────────────────
    {
      id: 'stamina_tonic_32',
      description: 'Orange stamina tonic in a flask — restores energy for adventuring.',
      size: 32,
      draw: [
        'spans(C, 5:15-16, 6:15-16)',
        'spans(G, 7:14-17, 8:13-18)',
        'spans(B, 9:12-19, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:12-19)',
        'spans(D, 12:19-20, 13:19-20, 14:18-19)',
        'spans(L, 9:12-14, 10:11-13, 11:11-12)',
        'pixels(H, 12,11)',
        'spans(A, 11:14-17, 12:14-17)',
        'pixels(E, 15,11, 16,11, 15,12, 16,12)',
        'spans(G, 15:12-19, 16:13-18)',
      ],
      chars: {
        B: { name: 'orange_liquid', role: 'body' },
        D: { name: 'liquid_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'glass_shine', role: 'body', tone: 'highlight' },
        H: { name: 'specular', role: 'accessory' },
        G: { name: 'glass', role: 'head' },
        C: { name: 'cork', role: 'belt' },
        A: { name: 'label', role: 'leg' },
        E: { name: 'star_icon', role: 'arm' },
      },
      colors: {
        body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#deeed6' },
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
        belt:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
        leg:       { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        arm:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
