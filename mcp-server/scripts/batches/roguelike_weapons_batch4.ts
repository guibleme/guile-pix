/**
 * Roguelike Weapons Bundle — Batch 4: Staffs & Magic Weapons (32x32 DSL)
 * 20 unique staff/wand/magic weapon templates for roguelike games.
 */
import type { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'weapons',
  exportNames: { templates: 'ROGUELIKE_STAFFS_32_TEMPLATES', schemes: 'ROGUELIKE_STAFFS_32_COLOR_SCHEMES' },
  templates: [

    // ─── 1. WOODEN STAFF ────────────────────────────────────────────
    {
      id: 'wooden_staff_roguelike_32',
      description: 'Simple wooden staff with a rounded knob — basic caster weapon.',
      size: 32,
      draw: [
        // Knob top
        'spans(A, 2:14-17, 3:13-18, 4:13-18, 5:14-17)',
        // Knob highlight
        'pixels(E, 14,3)',
        // Shaft
        'spans(B, 6:14-17, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17, 25:14-17, 26:14-17)',
        // Shaft shadow
        'spans(D, 6:17-17, 7:17-17, 8:17-17, 9:17-17, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17, 17:17-17, 18:17-17, 19:17-17, 20:17-17, 21:17-17, 22:17-17, 23:17-17, 24:17-17, 25:17-17, 26:17-17)',
        // Shaft highlight
        'spans(L, 6:14-14, 7:14-14, 8:14-14, 9:14-14, 10:14-14)',
        // Base cap
        'spans(P, 27:13-18, 28:14-17)',
      ],
      chars: {
        A: { name: 'wood_knob', role: 'accessory' },
        E: { name: 'knob_shine', role: 'eye' },
        B: { name: 'shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        L: { name: 'shaft_highlight', role: 'body', tone: 'highlight' },
        P: { name: 'base_cap', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#d27d2c', base: '#d27d2c', highlight: '#d27d2c' },
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 2. APPRENTICE WAND ─────────────────────────────────────────
    {
      id: 'apprentice_wand_32',
      description: 'Short magic wand with a glowing crystal tip — starter mage weapon.',
      size: 32,
      draw: [
        // Crystal tip
        'spans(A, 4:14-17, 5:13-18, 6:13-18, 7:14-17)',
        // Crystal highlight
        'pixels(E, 14,5, 15,5)',
        // Wand shaft (thinner than staff)
        'spans(B, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16)',
        // Collar (where crystal meets shaft)
        'spans(G, 8:14-17)',
        // Grip wrap
        'spans(H, 17:14-17, 18:14-17, 19:14-17, 20:14-17)',
        // Pommel
        'spans(P, 24:14-17, 25:15-16)',
      ],
      chars: {
        A: { name: 'crystal_tip', role: 'accessory' },
        E: { name: 'crystal_glow', role: 'eye' },
        B: { name: 'wand_shaft', role: 'body' },
        G: { name: 'collar', role: 'head' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 3. FIRE STAFF ──────────────────────────────────────────────
    {
      id: 'fire_staff_roguelike_32',
      description: 'Staff crowned with an ever-burning flame — fire spell damage bonus.',
      size: 32,
      draw: [
        // Flame head (organic flame shape)
        'spans(A, 1:15-16, 2:14-17, 3:13-18, 4:13-18, 5:14-17, 6:14-17)',
        // Flame core (brighter)
        'pixels(E, 15,2, 16,2, 15,3, 16,3, 15,4, 16,4)',
        // Shaft
        'spans(B, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17)',
        // Shaft shadow
        'spans(D, 7:17-17, 8:17-17, 9:17-17, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17, 17:17-17, 18:17-17, 19:17-17, 20:17-17)',
        // Grip wrap
        'spans(H, 19:13-18, 20:13-18, 21:13-18)',
        // Iron cap
        'spans(P, 25:13-18, 26:14-17)',
      ],
      chars: {
        A: { name: 'flame_head', role: 'accessory' },
        E: { name: 'flame_core', role: 'eye' },
        B: { name: 'shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'iron_cap', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 4. ICE SCEPTER ─────────────────────────────────────────────
    {
      id: 'ice_scepter_32',
      description: 'Crystalline scepter with a frozen orb head — frost spell bonus.',
      size: 32,
      draw: [
        // Ice orb
        'circle(15,5,4,A)',
        // Orb highlight
        'pixels(E, 13,4, 14,4)',
        // Metal collar
        'spans(G, 9:13-18, 10:14-17)',
        // Shaft
        'spans(B, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17)',
        // Shaft shadow
        'spans(D, 11:17-17, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17, 17:17-17, 18:17-17, 19:17-17, 20:17-17, 21:17-17, 22:17-17)',
        // Grip
        'spans(H, 23:13-18, 24:14-17)',
        // Cap
        'spans(P, 25:14-17, 26:15-16)',
      ],
      chars: {
        A: { name: 'ice_orb', role: 'accessory' },
        E: { name: 'orb_glow', role: 'eye' },
        G: { name: 'silver_collar', role: 'head' },
        B: { name: 'shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        boot:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 5. LIGHTNING ROD ───────────────────────────────────────────
    {
      id: 'lightning_rod_32',
      description: 'Metal rod that channels lightning — high damage, area stun.',
      size: 32,
      draw: [
        // Pronged top (trident-like lightning rod)
        'spans(A, 1:13-13, 1:15-16, 1:18-18, 2:13-13, 2:15-16, 2:18-18, 3:13-13, 3:15-16, 3:18-18, 4:13-18)',
        // Rod shaft (metal)
        'spans(B, 5:14-17, 6:14-17, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17)',
        // Shadow
        'spans(D, 5:17-17, 6:17-17, 7:17-17, 8:17-17, 9:17-17, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17)',
        // Grip
        'spans(H, 23:13-18, 24:14-17)',
        // Cap
        'spans(P, 25:14-17, 26:15-16)',
        // Lightning sparks
        'pixels(E, 11,1, 20,2, 10,4, 21,5, 12,8, 19,10)',
      ],
      chars: {
        A: { name: 'pronged_top', role: 'accessory' },
        B: { name: 'metal_rod', role: 'body' },
        D: { name: 'rod_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'cap', role: 'boot' },
        E: { name: 'lightning', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        body:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 6. NECRO STAFF ─────────────────────────────────────────────
    {
      id: 'necro_staff_32',
      description: 'Dark staff topped with a skull — raises undead minions.',
      size: 32,
      draw: [
        // Skull head
        'spans(A, 2:13-18, 3:12-19, 4:12-19, 5:12-19, 6:13-18, 7:14-17)',
        // Eye sockets
        'pixels(E, 14,4, 15,4, 17,4, 18,4)',
        // Jaw
        'spans(A, 7:13-14, 7:17-18)',
        // Shaft (dark wood)
        'spans(B, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17)',
        // Shaft shadow
        'spans(D, 8:17-17, 9:17-17, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17, 17:17-17, 18:17-17, 19:17-17, 20:17-17)',
        // Cap
        'spans(P, 25:13-18, 26:14-17)',
      ],
      chars: {
        A: { name: 'skull', role: 'accessory' },
        E: { name: 'eye_sockets', role: 'eye' },
        B: { name: 'dark_shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        P: { name: 'iron_cap', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 7. DRUID BRANCH ────────────────────────────────────────────
    {
      id: 'druid_branch_32',
      description: 'Living branch staff with blooming leaves — nature spell focus.',
      size: 32,
      draw: [
        // Leaf crown (top)
        'spans(A, 1:12-14, 1:17-19, 2:11-15, 2:16-20, 3:12-19, 4:13-18)',
        // Flowers in crown
        'pixels(E, 13,1, 18,1, 15,2, 14,3, 17,3)',
        // Staff shaft (organic, slightly uneven)
        'spans(B, 5:14-17, 6:14-17, 7:14-17, 8:15-17, 9:14-17, 10:14-17, 11:14-16, 12:14-17, 13:14-17, 14:14-17, 15:15-17, 16:14-17, 17:14-17, 18:14-16, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17, 24:14-17)',
        // Shaft shadow
        'spans(D, 5:17-17, 6:17-17, 7:17-17, 9:17-17, 10:17-17, 12:17-17, 13:17-17, 14:17-17, 16:17-17, 17:17-17, 19:17-17, 20:17-17)',
        // Root base (gnarled)
        'spans(P, 25:13-18, 26:12-14, 26:17-19, 27:11-13, 27:18-20)',
      ],
      chars: {
        A: { name: 'leaf_crown', role: 'accessory' },
        E: { name: 'blossoms', role: 'eye' },
        B: { name: 'living_shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        P: { name: 'roots', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#346524', base: '#346524', highlight: '#dad45e' },
        eye:       { shadow: '#d04648', base: '#d27d2c', highlight: '#dad45e' },
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
      },
    },

    // ─── 8. CRYSTAL ORB STAFF ───────────────────────────────────────
    {
      id: 'crystal_orb_staff_32',
      description: 'Staff cradling a floating crystal orb — amplifies all magic.',
      size: 32,
      draw: [
        // Prongs cradling orb
        'spans(G, 2:12-13, 2:18-19, 3:12-12, 3:19-19, 4:12-12, 4:19-19, 7:12-12, 7:19-19, 8:13-13, 8:18-18)',
        // Crystal orb (floating)
        'circle(15,5,3,A)',
        // Orb glow
        'pixels(E, 14,4, 15,4)',
        // Shaft
        'spans(B, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        // Shaft shadow
        'spans(D, 9:17-17, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17, 17:17-17, 18:17-17)',
        // Grip
        'spans(H, 20:13-18, 21:13-18)',
        // Cap
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        G: { name: 'prongs', role: 'head' },
        A: { name: 'crystal_orb', role: 'accessory' },
        E: { name: 'orb_glow', role: 'eye' },
        B: { name: 'shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 9. BLOOD WAND ──────────────────────────────────────────────
    {
      id: 'blood_wand_32',
      description: 'Crimson wand that casts at the cost of HP — high risk, high reward.',
      size: 32,
      draw: [
        // Blood crystal tip
        'spans(A, 3:14-17, 4:13-18, 5:13-18, 6:14-17)',
        'pixels(E, 15,4, 16,4)',
        // Collar
        'spans(G, 7:13-18)',
        // Shaft
        'spans(B, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16)',
        // Grip
        'spans(H, 17:14-17, 18:14-17, 19:14-17)',
        // Pommel
        'spans(P, 22:14-17, 23:15-16)',
        // Blood drips
        'pixels(R, 15,8, 16,10, 15,13, 16,16)',
      ],
      chars: {
        A: { name: 'blood_crystal', role: 'accessory' },
        E: { name: 'crystal_core', role: 'eye' },
        G: { name: 'collar', role: 'head' },
        B: { name: 'shaft', role: 'body' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
        R: { name: 'blood_drips', role: 'accessory', tone: 'shadow' },
      },
      colors: {
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 10. VOID SCEPTER ───────────────────────────────────────────
    {
      id: 'void_scepter_32',
      description: 'Scepter containing a fragment of the void — warps reality around it.',
      size: 32,
      draw: [
        // Void orb (dark center)
        'circle(15,5,4,A)',
        // Orb void center
        'pixels(V, 15,5, 16,5, 15,4, 16,4)',
        // Collar
        'spans(G, 9:13-18)',
        // Shaft
        'spans(B, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17)',
        // Shadow
        'spans(D, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17, 17:17-17, 18:17-17, 19:17-17)',
        // Grip
        'spans(H, 23:13-18, 24:14-17)',
        // Cap
        'spans(P, 25:14-17, 26:15-16)',
        // Void particles
        'pixels(E, 10,3, 20,3, 10,7, 20,7)',
      ],
      chars: {
        A: { name: 'void_orb', role: 'accessory' },
        V: { name: 'void_core', role: 'accessory', tone: 'shadow' },
        G: { name: 'collar', role: 'head' },
        B: { name: 'shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'cap', role: 'boot' },
        E: { name: 'void_particles', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#140c1c', base: '#30346d', highlight: '#597dce' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        boot:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#597dce', base: '#6dc2ca', highlight: '#deeed6' },
      },
    },

    // ─── 11. HOLY STAFF ─────────────────────────────────────────────
    {
      id: 'holy_staff_roguelike_32',
      description: 'Blessed golden staff with radiant cross — heals allies, smites undead.',
      size: 32,
      draw: [
        // Cross head
        'spans(A, 1:15-16, 2:15-16, 3:12-19, 4:12-19, 5:15-16, 6:15-16)',
        // Cross glow
        'pixels(E, 15,2, 16,2, 14,3, 17,3)',
        // Gold collar
        'spans(G, 7:13-18)',
        // Shaft
        'spans(B, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        // Shadow
        'spans(D, 8:17-17, 9:17-17, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17, 17:17-17)',
        // Cap
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        A: { name: 'holy_cross', role: 'accessory' },
        E: { name: 'divine_glow', role: 'eye' },
        G: { name: 'gold_collar', role: 'head' },
        B: { name: 'shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        boot:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

    // ─── 12. SHADOW WAND ────────────────────────────────────────────
    {
      id: 'shadow_wand_32',
      description: 'Wand wreathed in shadow — invisibility and shadow magic focus.',
      size: 32,
      draw: [
        // Shadow orb tip
        'spans(A, 4:14-17, 5:13-18, 6:13-18, 7:14-17)',
        'pixels(E, 15,5, 16,5)',
        // Collar
        'spans(G, 8:13-18)',
        // Shaft
        'spans(B, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16)',
        // Grip
        'spans(H, 17:14-17, 18:14-17, 19:14-17)',
        // Pommel
        'spans(P, 21:14-17, 22:15-16)',
        // Shadow wisps
        'pixels(W, 12,4, 19,6, 11,8, 20,10)',
      ],
      chars: {
        A: { name: 'shadow_orb', role: 'accessory' },
        E: { name: 'orb_eye', role: 'eye' },
        G: { name: 'collar', role: 'head' },
        B: { name: 'shaft', role: 'body' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
        W: { name: 'shadow_wisps', role: 'eye' },
      },
      colors: {
        accessory: { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        eye:       { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        belt:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        boot:      { shadow: '#30346d', base: '#442434', highlight: '#597dce' },
      },
    },

    // ─── 13. STORM STAFF ────────────────────────────────────────────
    {
      id: 'storm_staff_roguelike_32',
      description: 'Crackling staff that summons thunderstorms — chain lightning AoE.',
      size: 32,
      draw: [
        // Lightning bolt head
        'spans(A, 1:14-17, 2:13-16, 3:14-18, 4:13-16, 5:14-17)',
        'pixels(E, 15,2, 16,3)',
        // Collar
        'spans(G, 6:13-18)',
        // Shaft
        'spans(B, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17)',
        'spans(D, 7:17-17, 8:17-17, 9:17-17, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17, 15:17-17)',
        // Grip
        'spans(H, 23:13-18, 24:14-17)',
        // Cap
        'spans(P, 25:14-17, 26:15-16)',
        // Sparks
        'pixels(E, 11,1, 20,3, 10,5, 21,6)',
      ],
      chars: {
        A: { name: 'bolt_head', role: 'accessory' },
        E: { name: 'lightning', role: 'eye' },
        G: { name: 'collar', role: 'head' },
        B: { name: 'shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        eye:       { shadow: '#dad45e', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#4e4a4e', highlight: '#757161' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 14. TOME STAFF ─────────────────────────────────────────────
    {
      id: 'tome_staff_32',
      description: 'Staff with an open spellbook bound to the top — living grimoire.',
      size: 32,
      draw: [
        // Open book (top)
        'spans(A, 2:10-14, 2:17-21, 3:10-14, 3:17-21, 4:10-14, 4:17-21, 5:11-13, 5:18-20, 6:12-13, 6:18-19)',
        // Book spine
        'spans(G, 2:15-16, 3:15-16, 4:15-16, 5:15-16, 6:14-17)',
        // Page glow (runes on pages)
        'pixels(E, 11,3, 13,3, 18,3, 20,3)',
        // Shaft
        'spans(B, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        'spans(D, 7:17-17, 8:17-17, 9:17-17, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17)',
        // Cap
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        A: { name: 'book_pages', role: 'accessory' },
        G: { name: 'book_spine', role: 'head' },
        E: { name: 'page_runes', role: 'eye' },
        B: { name: 'shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        head:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 15. BONE SCEPTER ───────────────────────────────────────────
    {
      id: 'bone_scepter_32',
      description: 'Scepter made from a spine — summons skeletal warriors.',
      size: 32,
      draw: [
        // Vertebrae head
        'spans(A, 2:13-18, 3:12-19, 4:13-18, 5:14-17)',
        'pixels(E, 15,3, 16,3)',
        // Shaft (vertebrae pattern)
        'spans(B, 6:14-17, 7:15-16, 8:14-17, 9:15-16, 10:14-17, 11:15-16, 12:14-17, 13:15-16, 14:14-17, 15:15-16, 16:14-17, 17:15-16, 18:14-17, 19:15-16, 20:14-17, 21:15-16, 22:14-17)',
        // Shadow
        'spans(D, 6:17-17, 8:17-17, 10:17-17, 12:17-17, 14:17-17, 16:17-17, 18:17-17, 20:17-17, 22:17-17)',
        // Base
        'spans(P, 23:13-18, 24:14-17)',
      ],
      chars: {
        A: { name: 'skull_head', role: 'accessory' },
        E: { name: 'eye_glow', role: 'eye' },
        B: { name: 'bone_shaft', role: 'body' },
        D: { name: 'bone_shadow', role: 'body', tone: 'shadow' },
        P: { name: 'base', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        eye:       { shadow: '#346524', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#757161', base: '#d2aa99', highlight: '#deeed6' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#d2aa99' },
      },
    },

    // ─── 16. CHAOS WAND ─────────────────────────────────────────────
    {
      id: 'chaos_wand_32',
      description: 'Unstable wand that casts random spells — wild magic focus.',
      size: 32,
      draw: [
        // Swirling crystal tip
        'spans(A, 3:13-18, 4:12-19, 5:12-19, 6:13-18, 7:14-17)',
        // Multi-color sparkles (chaos)
        'pixels(E, 14,4, 17,4, 13,5, 18,5, 15,3, 16,6)',
        // Collar
        'spans(G, 8:13-18)',
        // Shaft (slightly crooked)
        'spans(B, 9:15-16, 10:15-17, 11:14-16, 12:15-16, 13:15-17, 14:14-16, 15:15-16, 16:15-17, 17:14-16, 18:15-16)',
        // Grip
        'spans(H, 16:14-17, 17:14-17, 18:14-17)',
        // Pommel
        'spans(P, 19:14-17, 20:15-16)',
      ],
      chars: {
        A: { name: 'chaos_crystal', role: 'accessory' },
        E: { name: 'chaos_sparks', role: 'eye' },
        G: { name: 'collar', role: 'head' },
        B: { name: 'twisted_shaft', role: 'body' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'pommel', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#597dce', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 17. ARCANE FOCUS ───────────────────────────────────────────
    {
      id: 'arcane_focus_32',
      description: 'Pure arcane conduit — reduces mana cost for all spells.',
      size: 32,
      draw: [
        // Arcane diamond (top)
        'spans(A, 2:15-16, 3:14-17, 4:13-18, 5:12-19, 6:13-18, 7:14-17, 8:15-16)',
        'pixels(E, 15,4, 16,4, 15,5, 16,5)',
        // Collar
        'spans(G, 9:13-18)',
        // Shaft
        'spans(B, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17)',
        'spans(D, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17)',
        // Grip
        'spans(H, 22:13-18, 23:14-17)',
        // Cap
        'spans(P, 24:14-17, 25:15-16)',
      ],
      chars: {
        A: { name: 'arcane_diamond', role: 'accessory' },
        E: { name: 'arcane_core', role: 'eye' },
        G: { name: 'collar', role: 'head' },
        B: { name: 'shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        H: { name: 'grip', role: 'belt' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
        body:      { shadow: '#30346d', base: '#597dce', highlight: '#6dc2ca' },
        belt:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#8595a1', highlight: '#deeed6' },
      },
    },

    // ─── 18. TOTEM STAFF ────────────────────────────────────────────
    {
      id: 'totem_staff_32',
      description: 'Shamanic staff with carved spirit faces — summons elemental totems.',
      size: 32,
      draw: [
        // Top face
        'spans(A, 2:12-19, 3:12-19, 4:12-19, 5:12-19)',
        // Face eyes
        'pixels(E, 14,3, 15,3, 17,3, 18,3)',
        // Middle face
        'spans(A, 7:13-18, 8:13-18, 9:13-18)',
        'pixels(E, 14,8, 17,8)',
        // Shaft
        'spans(B, 6:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        'spans(D, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17, 15:17-17, 16:17-17, 17:17-17)',
        // Cap
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        A: { name: 'spirit_faces', role: 'accessory' },
        E: { name: 'spirit_eyes', role: 'eye' },
        B: { name: 'carved_shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        P: { name: 'base', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        eye:       { shadow: '#6dc2ca', base: '#deeed6', highlight: '#deeed6' },
        body:      { shadow: '#442434', base: '#854c30', highlight: '#d27d2c' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 19. DEMON SCEPTER ──────────────────────────────────────────
    {
      id: 'demon_scepter_32',
      description: 'Demonic scepter with a burning eye — dark magic amplifier.',
      size: 32,
      draw: [
        // Demon eye top
        'spans(A, 2:12-19, 3:11-20, 4:11-20, 5:12-19, 6:13-18)',
        // Eye pupil
        'pixels(E, 15,3, 16,3, 15,4, 16,4)',
        // Horn prongs
        'spans(K, 1:11-12, 1:19-20, 2:11-11, 2:20-20)',
        // Collar
        'spans(G, 7:13-18)',
        // Shaft
        'spans(B, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17)',
        'spans(D, 8:17-17, 9:17-17, 10:17-17, 11:17-17, 12:17-17, 13:17-17, 14:17-17)',
        // Cap
        'spans(P, 23:13-18, 24:14-17)',
      ],
      chars: {
        A: { name: 'demon_eye', role: 'accessory' },
        E: { name: 'eye_pupil', role: 'eye' },
        K: { name: 'horn_prongs', role: 'head' },
        G: { name: 'collar', role: 'head' },
        B: { name: 'shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#442434', base: '#d04648', highlight: '#d27d2c' },
        eye:       { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        head:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        body:      { shadow: '#140c1c', base: '#442434', highlight: '#4e4a4e' },
        boot:      { shadow: '#4e4a4e', base: '#757161', highlight: '#8595a1' },
      },
    },

    // ─── 20. CELESTIAL STAFF ────────────────────────────────────────
    {
      id: 'celestial_staff_32',
      description: 'Holy staff crowned with a radiant star — ultimate divine weapon.',
      size: 32,
      draw: [
        // Star head (8-pointed)
        'spans(A, 1:15-16, 2:14-17, 3:12-19, 4:14-17, 5:15-16)',
        // Star cross beams
        'spans(A, 3:15-16)',
        // Star glow
        'pixels(E, 15,2, 16,2, 13,3, 18,3, 15,4, 16,4)',
        // Gold collar
        'spans(G, 6:13-18)',
        // Shaft
        'spans(B, 7:14-17, 8:14-17, 9:14-17, 10:14-17, 11:14-17, 12:14-17, 13:14-17, 14:14-17, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17, 20:14-17, 21:14-17, 22:14-17, 23:14-17)',
        'spans(D, 7:17-17, 8:17-17, 9:17-17, 10:17-17, 11:17-17, 12:17-17, 13:17-17)',
        // Cap
        'spans(P, 24:13-18, 25:14-17)',
      ],
      chars: {
        A: { name: 'star_head', role: 'accessory' },
        E: { name: 'divine_glow', role: 'eye' },
        G: { name: 'gold_collar', role: 'head' },
        B: { name: 'shaft', role: 'body' },
        D: { name: 'shaft_shadow', role: 'body', tone: 'shadow' },
        P: { name: 'cap', role: 'boot' },
      },
      colors: {
        accessory: { shadow: '#d2aa99', base: '#deeed6', highlight: '#deeed6' },
        eye:       { shadow: '#deeed6', base: '#deeed6', highlight: '#deeed6' },
        head:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        body:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
        boot:      { shadow: '#d27d2c', base: '#dad45e', highlight: '#deeed6' },
      },
    },

  ],
};

export default batch;
