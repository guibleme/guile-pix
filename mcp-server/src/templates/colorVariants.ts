/**
 * Color variant system for existing templates.
 *
 * Provides alternate color schemes for popular templates without
 * needing new pixel data. Each variant re-maps the same role slots
 * to a different DB16 palette combination.
 *
 * Naming convention: `{template_name}_{variant_name}`
 * e.g. knight_fire, knight_ice, mage_dark
 *
 * The templateTools resolver strips suffixes to find the base template,
 * then applies the variant color scheme.
 *
 * Variant types:
 *   fire   - warm reds/oranges/yellows
 *   ice    - cool blues/cyans/whites
 *   dark   - deep purples/blacks with sinister accents
 *   nature - forest greens/browns
 *   desert - sandy browns/oranges/warm whites
 *   royal  - golds/purples/rich tones
 */

import { ColorScheme } from './humanoid16.js';

// ═══════════════════════════════════════════════════════════════
// KNIGHT VARIANTS (16x16 and 32x32 share same role layout)
// ═══════════════════════════════════════════════════════════════

export const KNIGHT_FIRE_COLORS: ColorScheme = {
  name: 'knight_fire',
  mapping: {
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },   // bronze helmet
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },   // warm skin
    eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },   // fiery eyes
    body:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },   // red plate armor
    arm:       { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // golden crest/shield
  },
};

export const KNIGHT_ICE_COLORS: ColorScheme = {
  name: 'knight_ice',
  mapping: {
    head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // frost-blue helmet
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },   // icy blue eyes
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },   // ice-blue armor
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#8595a1' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
    leg:       { shadow: '#30346d', base: '#4e4a4e', highlight: '#8595a1' },
    boot:      { shadow: '#30346d', base: '#4e4a4e', highlight: '#757161' },
    accessory: { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },   // frost accents
  },
};

export const KNIGHT_DARK_COLORS: ColorScheme = {
  name: 'knight_dark',
  mapping: {
    head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // black iron helm
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#d04648', base: '#d04648', highlight: '#d27d2c' },   // sinister red glow
    body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },   // dark plate
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    hand:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
    accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },   // blood-red accents
  },
};

// ═══════════════════════════════════════════════════════════════
// MAGE VARIANTS
// ═══════════════════════════════════════════════════════════════

export const MAGE_FIRE_COLORS: ColorScheme = {
  name: 'mage_fire',
  mapping: {
    head:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },   // red hat
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // flame eyes
    body:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },   // crimson robes
    arm:       { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // golden sash
    leg:       { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // flame magic
    hair:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  },
};

export const MAGE_NATURE_COLORS: ColorScheme = {
  name: 'mage_nature',
  mapping: {
    head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green hat
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // nature eyes
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // leaf-green robes
    arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },   // bark sash
    leg:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#6daa2c', base: '#dad45e', highlight: '#deeed6' },   // leaf/nature magic
    hair:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
  },
};

export const MAGE_DARK_COLORS: ColorScheme = {
  name: 'mage_dark',
  mapping: {
    head:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },   // shadow hat
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },   // evil glowing eyes
    body:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },   // dark robes
    arm:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
    leg:       { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
    boot:      { shadow: '#140c1c', base: '#442434', highlight: '#854c30' },
    accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },   // dark magic
    hair:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },   // white beard (evil)
  },
};

// ═══════════════════════════════════════════════════════════════
// ROGUE VARIANTS
// ═══════════════════════════════════════════════════════════════

export const ROGUE_FOREST_COLORS: ColorScheme = {
  name: 'rogue_forest',
  mapping: {
    head:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // forest hood
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
    body:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green tunic
    arm:       { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },   // green cape
    hair:      { shadow: '#346524', base: '#6daa2c', highlight: '#dad45e' },
  },
};

export const ROGUE_DESERT_COLORS: ColorScheme = {
  name: 'rogue_desert',
  mapping: {
    head:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },   // sand hood
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
    body:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },   // sand tunic
    arm:       { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },   // desert cape
    hair:      { shadow: '#854c30', base: '#d27d2c', highlight: '#dad45e' },
  },
};

export const ROGUE_ROYAL_COLORS: ColorScheme = {
  name: 'rogue_royal',
  mapping: {
    head:      { shadow: '#30346d', base: '#442434', highlight: '#854c30' },   // purple hood
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // golden eyes
    body:      { shadow: '#30346d', base: '#442434', highlight: '#854c30' },   // royal purple
    arm:       { shadow: '#30346d', base: '#442434', highlight: '#854c30' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // gold belt
    leg:       { shadow: '#30346d', base: '#442434', highlight: '#854c30' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },   // gold accents
    hair:      { shadow: '#30346d', base: '#442434', highlight: '#854c30' },
  },
};

// ═══════════════════════════════════════════════════════════════
// ARCHER VARIANTS
// ═══════════════════════════════════════════════════════════════

export const ARCHER_ICE_COLORS: ColorScheme = {
  name: 'archer_ice',
  mapping: {
    hair:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    head:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // frost hood
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
    body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },   // ice-blue tunic
    arm:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#757161', base: '#8595a1', highlight: '#deeed6' },
    leg:       { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
    accessory: { shadow: '#8595a1', base: '#deeed6', highlight: '#deeed6' },   // frost bow
  },
};

export const ARCHER_FIRE_COLORS: ColorScheme = {
  name: 'archer_fire',
  mapping: {
    hair:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
    head:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },   // ember hood
    face:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
    body:      { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },   // fire tunic
    arm:       { shadow: '#854c30', base: '#d04648', highlight: '#d27d2c' },
    hand:      { shadow: '#854c30', base: '#d2aa99', highlight: '#deeed6' },
    belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    leg:       { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
    accessory: { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },   // flame bow
  },
};


// ═══════════════════════════════════════════════════════════════
// Export registry
// ═══════════════════════════════════════════════════════════════

export const COLOR_VARIANT_SCHEMES: Record<string, ColorScheme> = {
  // Knight variants
  knight_fire: KNIGHT_FIRE_COLORS,
  knight_ice: KNIGHT_ICE_COLORS,
  knight_dark: KNIGHT_DARK_COLORS,
  // Mage variants
  mage_fire: MAGE_FIRE_COLORS,
  mage_nature: MAGE_NATURE_COLORS,
  mage_dark: MAGE_DARK_COLORS,
  // Rogue variants
  rogue_forest: ROGUE_FOREST_COLORS,
  rogue_desert: ROGUE_DESERT_COLORS,
  rogue_royal: ROGUE_ROYAL_COLORS,
  // Archer variants
  archer_ice: ARCHER_ICE_COLORS,
  archer_fire: ARCHER_FIRE_COLORS,
};
