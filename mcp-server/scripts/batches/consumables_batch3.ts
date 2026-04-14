import { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'consumables',
  exportNames: {
    templates: 'COZY_COFFEE_32_TEMPLATES',
    schemes: 'COZY_COFFEE_32_COLOR_SCHEMES',
  },
  templates: [
    // ── 1. Espresso Cup ──
    {
      id: 'espresso_cup_32',
      description: 'Small ceramic espresso cup with saucer',
      size: 32,
      draw: [
        // Saucer
        'spans(S, 22:8-23, 23:10-21, 24:12-19)',
        'spans(R, 22:9-22, 23:11-20)',
        // Cup body
        'spans(B, 14:12-19, 15:11-20, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:11-20, 21:12-19)',
        // Cup shadow
        'spans(D, 19:18-21, 20:18-20, 21:17-19)',
        // Cup highlight
        'spans(H, 14:13-16, 15:12-14, 16:11-12)',
        // Coffee surface
        'spans(C, 14:13-18, 15:12-19)',
        // Steam
        'pixels(V, 11,14, 10,15, 12,16, 11,17, 9,14, 10,17)',
        // Handle
        'spans(A, 16:22-23, 17:23-24, 18:23-24, 19:22-23)',
      ],
      chars: {
        B: { name: 'cup', role: 'body' },
        D: { name: 'cup', role: 'body', tone: 'shadow' },
        H: { name: 'cup', role: 'body', tone: 'highlight' },
        C: { name: 'coffee', role: 'accent' },
        S: { name: 'saucer', role: 'trim' },
        R: { name: 'saucer', role: 'trim', tone: 'highlight' },
        V: { name: 'steam', role: 'belt' },
        A: { name: 'handle', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        belt: { base: '#8595a1', shadow: '#757161', highlight: '#deeed6' },
      },
    },
    // ── 2. Latte Art Cup ──
    {
      id: 'latte_art_cup_32',
      description: 'Wide latte cup with leaf art on foam surface',
      size: 32,
      draw: [
        // Saucer
        'spans(S, 23:7-24, 24:9-22)',
        'spans(R, 23:8-23)',
        // Cup body (wider)
        'spans(B, 15:9-22, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:9-22, 21:10-21, 22:11-20)',
        // Shadow
        'spans(D, 20:20-22, 21:19-21, 22:18-20)',
        // Highlight
        'spans(H, 15:10-14, 16:9-11)',
        // Foam surface
        'spans(F, 15:10-21, 16:9-22)',
        // Leaf art on foam
        'pixels(L, 15,15, 15,16, 16,14, 16,15, 16,16, 16,17)',
        'pixels(L, 15,14, 15,17, 16,13, 16,18)',
        // Handle
        'spans(A, 17:24-25, 18:25-26, 19:25-26, 20:24-25)',
        // Steam
        'pixels(V, 13,13, 12,14, 13,17, 12,18, 11,15)',
      ],
      chars: {
        B: { name: 'cup', role: 'body' },
        D: { name: 'cup', role: 'body', tone: 'shadow' },
        H: { name: 'cup', role: 'body', tone: 'highlight' },
        F: { name: 'foam', role: 'trim' },
        L: { name: 'art', role: 'accent' },
        S: { name: 'saucer', role: 'belt' },
        R: { name: 'saucer', role: 'belt', tone: 'highlight' },
        V: { name: 'steam', role: 'eye' },
        A: { name: 'handle', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        trim: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        belt: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        eye: { base: '#8595a1', shadow: '#757161', highlight: '#deeed6' },
      },
    },
    // ── 3. Iced Coffee ──
    {
      id: 'iced_coffee_32',
      description: 'Tall glass of iced coffee with straw and ice cubes',
      size: 32,
      draw: [
        // Glass body
        'spans(B, 8:11-20, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:10-21, 21:11-20, 22:12-19)',
        // Glass highlight
        'spans(H, 9:10-11, 10:10-11, 11:10-11, 12:10-11, 13:10-11, 14:10-11, 15:10-11, 16:10-11, 17:10-11, 18:10-11, 19:10-11)',
        // Coffee liquid
        'spans(C, 10:12-20, 11:12-20, 12:12-20, 13:12-20, 14:12-20, 15:12-20, 16:12-20, 17:12-20, 18:12-20, 19:12-20, 20:12-20, 21:12-19)',
        // Ice cubes
        'spans(I, 10:13-15, 11:13-15, 12:17-19, 13:17-19, 15:13-15, 16:13-15)',
        // Cream layer top
        'spans(F, 8:12-19, 9:12-14)',
        // Straw
        'spans(W, 5:18, 6:18, 7:18, 8:18, 9:18, 10:18, 11:18, 12:18, 13:18, 14:18, 15:18, 16:18, 17:18, 18:18, 19:18, 20:18)',
        // Rim
        'spans(R, 8:10-20)',
      ],
      chars: {
        B: { name: 'glass', role: 'body' },
        H: { name: 'glass', role: 'body', tone: 'highlight' },
        C: { name: 'coffee', role: 'accent' },
        I: { name: 'ice', role: 'trim' },
        F: { name: 'cream', role: 'belt' },
        W: { name: 'straw', role: 'eye' },
        R: { name: 'rim', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#6dc2ca', shadow: '#597dce', highlight: '#deeed6' },
        belt: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        eye: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
    // ── 4. Tea Kettle ──
    {
      id: 'tea_kettle_32',
      description: 'Round ceramic tea kettle with lid and spout',
      size: 32,
      draw: [
        // Lid knob
        'spans(K, 8:14-17, 9:14-17)',
        // Lid
        'spans(L, 10:11-20, 11:10-21)',
        // Body
        'spans(B, 12:9-22, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:8-23, 18:9-22, 19:10-21, 20:11-20)',
        // Shadow
        'spans(D, 18:19-22, 19:18-21, 20:17-20)',
        // Highlight
        'spans(H, 12:10-14, 13:9-11, 14:9-10)',
        // Spout
        'spans(P, 14:24-26, 15:25-27, 16:25-27, 17:24-26)',
        'pixels(P, 13,24, 18,24)',
        // Handle
        'spans(A, 13:5-7, 14:5-6, 15:5-6, 16:5-6, 17:5-7)',
        'pixels(A, 12,7, 18,7)',
        // Base
        'spans(F, 21:12-19)',
        // Decorative band
        'spans(G, 15:9-22)',
        // Steam
        'pixels(V, 7,15, 6,16, 7,17, 5,15)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'body', role: 'body', tone: 'shadow' },
        H: { name: 'body', role: 'body', tone: 'highlight' },
        L: { name: 'lid', role: 'trim' },
        K: { name: 'knob', role: 'accent' },
        P: { name: 'spout', role: 'body', tone: 'shadow' },
        A: { name: 'handle', role: 'trim', tone: 'shadow' },
        F: { name: 'base', role: 'trim', tone: 'shadow' },
        G: { name: 'band', role: 'accent' },
        V: { name: 'steam', role: 'belt' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#597dce', shadow: '#30346d', highlight: '#6dc2ca' },
        belt: { base: '#8595a1', shadow: '#757161', highlight: '#deeed6' },
      },
    },
    // ── 5. Green Tea Cup ──
    {
      id: 'green_tea_cup_32',
      description: 'Traditional Japanese green tea cup (yunomi)',
      size: 32,
      draw: [
        // Cup body (cylindrical, no handle)
        'spans(B, 12:10-21, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:10-21, 21:11-20)',
        // Shadow
        'spans(D, 19:19-22, 20:18-21, 21:17-20)',
        // Highlight
        'spans(H, 12:11-14, 13:10-12, 14:10-11)',
        // Tea surface
        'spans(T, 12:11-20, 13:10-12)',
        // Decorative pattern
        'spans(G, 16:10-21)',
        'pixels(G, 14,12, 14,15, 14,18, 18,11, 18,14, 18,17, 18,20)',
        // Base
        'spans(F, 22:12-19)',
        // Steam wisps
        'pixels(V, 10,14, 9,16, 11,18, 10,13)',
      ],
      chars: {
        B: { name: 'cup', role: 'body' },
        D: { name: 'cup', role: 'body', tone: 'shadow' },
        H: { name: 'cup', role: 'body', tone: 'highlight' },
        T: { name: 'tea', role: 'accent' },
        G: { name: 'pattern', role: 'trim' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
        V: { name: 'steam', role: 'belt' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        trim: { base: '#30346d', shadow: '#140c1c', highlight: '#597dce' },
        belt: { base: '#8595a1', shadow: '#757161', highlight: '#deeed6' },
      },
    },
    // ── 6. Coffee Beans Bag ──
    {
      id: 'coffee_beans_bag_32',
      description: 'Burlap sack of coffee beans, slightly open at top',
      size: 32,
      draw: [
        // Bag body
        'spans(B, 12:9-22, 13:8-23, 14:8-23, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24, 20:8-23, 21:9-22, 22:10-21)',
        // Shadow
        'spans(D, 20:20-23, 21:19-22, 22:18-21)',
        // Highlight
        'spans(H, 12:10-14, 13:9-11, 14:9-10)',
        // Bag top (gathered)
        'spans(T, 10:11-20, 11:10-21, 12:10-21)',
        // Tie string
        'spans(S, 11:11-12, 11:19-20)',
        'pixels(S, 10,11, 10,20)',
        // Coffee beans visible
        'spans(C, 10:13-18, 11:13-18)',
        'pixels(C, 10,14, 10,16, 10,18, 11,13, 11,15, 11,17)',
        // Label
        'spans(L, 15:12-19, 16:12-19, 17:12-19, 18:12-19)',
        // Label text
        'spans(X, 16:13-18, 17:13-17)',
      ],
      chars: {
        B: { name: 'burlap', role: 'body' },
        D: { name: 'burlap', role: 'body', tone: 'shadow' },
        H: { name: 'burlap', role: 'body', tone: 'highlight' },
        T: { name: 'top', role: 'body', tone: 'shadow' },
        S: { name: 'string', role: 'trim' },
        C: { name: 'beans', role: 'accent' },
        L: { name: 'label', role: 'belt' },
        X: { name: 'labeltext', role: 'accent', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        belt: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 7. French Press ──
    {
      id: 'french_press_32',
      description: 'Glass French press coffee maker with plunger',
      size: 32,
      draw: [
        // Plunger knob
        'spans(M, 5:14-17, 6:14-17)',
        // Plunger rod
        'spans(M, 7:15-16, 8:15-16, 9:15-16, 10:15-16)',
        // Glass body
        'spans(G, 10:10-21, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:10-21)',
        // Glass highlight
        'spans(H, 11:9-10, 12:9-10, 13:9-10, 14:9-10, 15:9-10, 16:9-10, 17:9-10, 18:9-10, 19:9-10)',
        // Coffee inside
        'spans(C, 12:11-21, 13:11-21, 14:11-21, 15:11-21, 16:11-21, 17:11-21, 18:11-21, 19:11-21, 20:11-21)',
        // Metal frame
        'spans(M, 10:9-10, 10:21-22, 22:10-21)',
        'spans(M, 11:8, 12:8, 13:8, 14:8, 15:8, 16:8, 17:8, 18:8, 19:8, 20:8, 21:8)',
        'spans(M, 11:23, 12:23, 13:23, 14:23, 15:23, 16:23, 17:23, 18:23, 19:23, 20:23, 21:23)',
        // Handle
        'spans(A, 13:24-26, 14:26-27, 15:26-27, 16:26-27, 17:26-27, 18:24-26)',
        // Base
        'spans(M, 22:9-22, 23:10-21)',
        // Lid
        'spans(M, 10:11-20)',
      ],
      chars: {
        G: { name: 'glass', role: 'body' },
        H: { name: 'glass', role: 'body', tone: 'highlight' },
        C: { name: 'coffee', role: 'accent' },
        M: { name: 'metal', role: 'trim' },
        A: { name: 'handle', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#757161', shadow: '#4e4a4e', highlight: '#8595a1' },
      },
    },
    // ── 8. Bubble Tea ──
    {
      id: 'bubble_tea_32',
      description: 'Tall bubble tea drink with tapioca pearls and dome lid',
      size: 32,
      draw: [
        // Dome lid
        'spans(L, 7:11-20, 8:10-21, 9:10-21)',
        'spans(P, 7:12-19, 8:11-20)',
        // Cup body
        'spans(B, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:11-20, 17:11-20, 18:11-20, 19:11-20, 20:12-19, 21:12-19, 22:13-18)',
        // Tea color fill
        'spans(T, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:12-19, 17:12-19, 18:12-19, 19:12-19, 20:13-18, 21:13-18)',
        // Tapioca pearls
        'pixels(K, 19,13, 19,15, 19,17, 19,19, 20,14, 20,16, 20,18, 21,14, 21,16, 21,18)',
        // Straw
        'spans(S, 4:17, 5:17, 6:17, 7:17, 8:17, 9:17, 10:17, 11:17, 12:17, 13:17, 14:17, 15:17)',
        // Base
        'spans(F, 23:14-17)',
      ],
      chars: {
        B: { name: 'cup', role: 'body' },
        T: { name: 'tea', role: 'accent' },
        K: { name: 'tapioca', role: 'trim' },
        L: { name: 'lid', role: 'body', tone: 'highlight' },
        P: { name: 'lid_dome', role: 'body', tone: 'highlight' },
        S: { name: 'straw', role: 'belt' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
        belt: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
    // ── 9. Teapot ──
    {
      id: 'ceramic_teapot_32',
      description: 'Round ceramic teapot with floral pattern',
      size: 32,
      draw: [
        // Lid knob
        'spans(K, 8:14-17)',
        // Lid
        'spans(L, 9:12-19, 10:11-20)',
        // Body
        'spans(B, 11:9-22, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:9-22, 18:10-21, 19:11-20)',
        // Shadow
        'spans(D, 17:19-22, 18:18-21, 19:17-20)',
        // Highlight
        'spans(H, 11:10-14, 12:9-11)',
        // Spout
        'spans(P, 12:24-25, 13:25-27, 14:25-27, 15:24-26)',
        'pixels(P, 11,24, 16,24)',
        // Handle
        'spans(A, 12:5-7, 13:4-5, 14:4-5, 15:4-5, 16:5-7)',
        // Floral pattern
        'pixels(F, 14,13, 13,14, 15,14, 14,15, 14,18, 13,19, 15,19, 14,20)',
        // Base
        'spans(R, 20:12-19)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'body', role: 'body', tone: 'shadow' },
        H: { name: 'body', role: 'body', tone: 'highlight' },
        L: { name: 'lid', role: 'trim' },
        K: { name: 'knob', role: 'trim', tone: 'shadow' },
        P: { name: 'spout', role: 'body', tone: 'shadow' },
        A: { name: 'handle', role: 'trim', tone: 'shadow' },
        F: { name: 'floral', role: 'accent' },
        R: { name: 'base', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
    // ── 10. Matcha Latte ──
    {
      id: 'matcha_latte_32',
      description: 'Matcha green tea latte in a wide bowl',
      size: 32,
      draw: [
        // Bowl body
        'spans(B, 14:8-23, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:8-23, 20:9-22, 21:10-21, 22:12-19)',
        // Shadow
        'spans(D, 20:20-23, 21:19-21, 22:18-19)',
        // Highlight
        'spans(H, 14:9-14, 15:8-10)',
        // Matcha surface
        'spans(M, 14:9-22, 15:8-23)',
        // Foam art (spiral)
        'pixels(F, 14,14, 14,15, 14,16, 14,17, 15,13, 15,18, 14,12, 14,19)',
        'pixels(F, 15,12, 15,19)',
        // Bowl rim
        'spans(R, 13:8-23)',
        // Base
        'spans(X, 23:13-18)',
        // Steam
        'pixels(V, 11,13, 10,15, 12,17, 11,19)',
      ],
      chars: {
        B: { name: 'bowl', role: 'body' },
        D: { name: 'bowl', role: 'body', tone: 'shadow' },
        H: { name: 'bowl', role: 'body', tone: 'highlight' },
        M: { name: 'matcha', role: 'accent' },
        F: { name: 'foam', role: 'trim' },
        R: { name: 'rim', role: 'body', tone: 'shadow' },
        X: { name: 'base', role: 'body', tone: 'shadow' },
        V: { name: 'steam', role: 'belt' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        accent: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        belt: { base: '#8595a1', shadow: '#757161', highlight: '#deeed6' },
      },
    },
    // ── 11. Takeout Coffee Cup ──
    {
      id: 'takeout_coffee_32',
      description: 'Paper takeout coffee cup with sleeve and lid',
      size: 32,
      draw: [
        // Lid
        'spans(L, 8:11-20, 9:10-21)',
        'spans(P, 8:14-17)',
        // Cup body
        'spans(B, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:11-20, 18:11-20, 19:11-20, 20:11-20, 21:12-19, 22:12-19)',
        // Shadow
        'spans(D, 10:19-21, 11:19-21, 12:19-21, 13:19-21, 14:19-21, 15:19-21, 16:19-21, 17:19-20, 18:19-20, 19:19-20, 20:19-20, 21:18-19, 22:18-19)',
        // Sleeve
        'spans(S, 14:11-20, 15:11-20, 16:11-20, 17:12-19, 18:12-19)',
        // Logo on sleeve
        'pixels(G, 15,14, 15,15, 15,16, 15,17, 16,15, 16,16)',
        // Base
        'spans(F, 23:13-18)',
      ],
      chars: {
        B: { name: 'cup', role: 'body' },
        D: { name: 'cup', role: 'body', tone: 'shadow' },
        L: { name: 'lid', role: 'trim' },
        P: { name: 'siphole', role: 'trim', tone: 'shadow' },
        S: { name: 'sleeve', role: 'accent' },
        G: { name: 'logo', role: 'belt' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        belt: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
      },
    },
    // ── 12. Tea Bag ──
    {
      id: 'tea_bag_32',
      description: 'Single tea bag with tag hanging from string',
      size: 32,
      draw: [
        // Tag
        'spans(T, 6:8-12, 7:8-12, 8:8-12)',
        'spans(X, 7:9-11)',
        // String
        'pixels(S, 9,12, 10,13, 11,14, 12,15, 13,15)',
        // Tea bag body
        'spans(B, 14:11-20, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:10-21, 21:10-21, 22:11-20, 23:12-19)',
        // Shadow
        'spans(D, 21:18-21, 22:17-20, 23:16-19)',
        // Highlight
        'spans(H, 14:12-16, 15:11-13)',
        // Tea stain
        'spans(C, 18:13-18, 19:12-19, 20:13-18)',
        // Fold line
        'spans(F, 14:11-20)',
      ],
      chars: {
        B: { name: 'bag', role: 'body' },
        D: { name: 'bag', role: 'body', tone: 'shadow' },
        H: { name: 'bag', role: 'body', tone: 'highlight' },
        T: { name: 'tag', role: 'trim' },
        X: { name: 'tagtext', role: 'accent' },
        S: { name: 'string', role: 'trim', tone: 'shadow' },
        C: { name: 'stain', role: 'accent', tone: 'shadow' },
        F: { name: 'fold', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        trim: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },
    // ── 13. Coffee Grinder ──
    {
      id: 'coffee_grinder_32',
      description: 'Manual hand coffee grinder with drawer',
      size: 32,
      draw: [
        // Crank handle
        'spans(M, 5:17-22, 6:22-23)',
        'pixels(K, 6,24)',
        // Hopper top
        'spans(B, 7:11-20, 8:10-21)',
        // Body
        'spans(B, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22)',
        // Shadow
        'spans(D, 14:19-22, 15:19-22, 16:19-22)',
        // Highlight
        'spans(H, 7:12-15, 8:11-13, 9:10-11)',
        // Drawer
        'spans(W, 17:9-22, 18:9-22, 19:9-22, 20:9-22)',
        // Drawer shadow
        'spans(V, 19:19-22, 20:19-22)',
        // Drawer knob
        'spans(K, 18:23-24, 19:23-24)',
        // Crank shaft
        'spans(M, 5:15-16, 6:15-16, 7:15-16)',
        // Base
        'spans(F, 21:9-22, 22:10-21)',
        // Metal band
        'spans(M, 12:9-22)',
      ],
      chars: {
        B: { name: 'body', role: 'body' },
        D: { name: 'body', role: 'body', tone: 'shadow' },
        H: { name: 'body', role: 'body', tone: 'highlight' },
        W: { name: 'drawer', role: 'trim' },
        V: { name: 'drawer', role: 'trim', tone: 'shadow' },
        M: { name: 'metal', role: 'accent' },
        K: { name: 'knob', role: 'accent', tone: 'highlight' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        accent: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 14. Hot Chocolate Mug ──
    {
      id: 'hot_chocolate_mug_32',
      description: 'Ceramic mug of hot chocolate with whipped cream and marshmallows',
      size: 32,
      draw: [
        // Mug body
        'spans(B, 12:10-21, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:10-21, 21:11-20)',
        // Shadow
        'spans(D, 19:19-22, 20:18-21, 21:17-20)',
        // Highlight
        'spans(H, 12:11-14, 13:10-12)',
        // Chocolate
        'spans(C, 12:11-20, 13:10-21)',
        // Whipped cream
        'spans(W, 10:12-19, 11:11-20, 12:11-20)',
        // Marshmallows
        'pixels(M, 10,14, 10,17, 11,13, 11,16, 11,19)',
        // Handle
        'spans(A, 14:23-25, 15:25-26, 16:25-26, 17:25-26, 18:23-25)',
        // Base
        'spans(F, 22:12-19)',
        // Steam
        'pixels(V, 8,14, 7,16, 9,18, 8,12)',
      ],
      chars: {
        B: { name: 'mug', role: 'body' },
        D: { name: 'mug', role: 'body', tone: 'shadow' },
        H: { name: 'mug', role: 'body', tone: 'highlight' },
        C: { name: 'chocolate', role: 'accent' },
        W: { name: 'cream', role: 'trim' },
        M: { name: 'marshmallow', role: 'trim', tone: 'highlight' },
        A: { name: 'handle', role: 'body', tone: 'shadow' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
        V: { name: 'steam', role: 'belt' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        belt: { base: '#8595a1', shadow: '#757161', highlight: '#deeed6' },
      },
    },
    // ── 15. Chai Tea Glass ──
    {
      id: 'chai_tea_glass_32',
      description: 'Traditional chai tea in a small glass with saucer',
      size: 32,
      draw: [
        // Saucer
        'spans(S, 23:9-22, 24:11-20)',
        'spans(R, 23:10-21)',
        // Glass body (tapered)
        'spans(G, 12:12-19, 13:11-20, 14:11-20, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:11-20, 20:11-20, 21:12-19, 22:13-18)',
        // Glass highlight
        'spans(H, 13:11-12, 14:11-12, 15:10-11, 16:10-11, 17:10-11, 18:10-11, 19:11-12)',
        // Chai liquid
        'spans(C, 13:13-19, 14:13-19, 15:12-20, 16:12-20, 17:12-20, 18:12-20, 19:13-19, 20:13-19, 21:13-18)',
        // Foam top
        'spans(F, 12:13-18, 13:12-13)',
        // Steam
        'pixels(V, 10,14, 9,16, 11,18, 10,13)',
      ],
      chars: {
        G: { name: 'glass', role: 'body' },
        H: { name: 'glass', role: 'body', tone: 'highlight' },
        C: { name: 'chai', role: 'accent' },
        F: { name: 'foam', role: 'trim' },
        S: { name: 'saucer', role: 'belt' },
        R: { name: 'saucer', role: 'belt', tone: 'highlight' },
        V: { name: 'steam', role: 'eye' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        belt: { base: '#757161', shadow: '#4e4a4e', highlight: '#8595a1' },
        eye: { base: '#8595a1', shadow: '#757161', highlight: '#deeed6' },
      },
    },
    // ── 16. Sugar Pot ──
    {
      id: 'sugar_pot_32',
      description: 'Small ceramic sugar pot with lid and spoon',
      size: 32,
      draw: [
        // Lid knob
        'spans(K, 9:14-17)',
        // Lid
        'spans(L, 10:11-20, 11:10-21)',
        // Body
        'spans(B, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:10-21, 19:11-20)',
        // Shadow
        'spans(D, 17:19-22, 18:18-21, 19:17-20)',
        // Highlight
        'spans(H, 12:10-14, 13:10-12)',
        // Sugar visible (lid opening)
        'spans(S, 10:14-17)',
        // Spoon handle
        'spans(P, 8:21-24, 9:22-24)',
        'pixels(P, 10,22, 11,22)',
        // Spoon bowl
        'spans(P, 7:22-24)',
        // Base
        'spans(F, 20:12-19)',
        // Decorative line
        'spans(G, 15:10-21)',
      ],
      chars: {
        B: { name: 'pot', role: 'body' },
        D: { name: 'pot', role: 'body', tone: 'shadow' },
        H: { name: 'pot', role: 'body', tone: 'highlight' },
        L: { name: 'lid', role: 'trim' },
        K: { name: 'knob', role: 'trim', tone: 'shadow' },
        S: { name: 'sugar', role: 'accent' },
        P: { name: 'spoon', role: 'belt' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
        G: { name: 'band', role: 'accent', tone: 'highlight' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        belt: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 17. Coffee Moka Pot ──
    {
      id: 'moka_pot_32',
      description: 'Italian moka stovetop espresso maker',
      size: 32,
      draw: [
        // Lid knob
        'spans(K, 6:14-17)',
        // Lid
        'spans(M, 7:13-18, 8:12-19)',
        // Upper chamber
        'spans(M, 9:11-20, 10:11-20, 11:11-20, 12:11-20)',
        // Waist
        'spans(B, 13:12-19, 14:13-18)',
        // Lower chamber
        'spans(M, 15:10-21, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:10-21, 21:11-20)',
        // Shadow
        'spans(D, 19:19-22, 20:18-21, 21:17-20)',
        // Highlight
        'spans(H, 9:12-14, 10:12-13, 15:11-14, 16:10-12, 17:10-11)',
        // Handle
        'spans(A, 11:22-25, 12:24-25, 13:24-25, 14:24-25, 15:24-25, 16:22-25)',
        // Spout
        'spans(P, 10:8-10, 11:7-9, 12:7-8)',
        // Base
        'spans(F, 22:12-19)',
      ],
      chars: {
        M: { name: 'metal', role: 'body' },
        D: { name: 'metal', role: 'body', tone: 'shadow' },
        H: { name: 'metal', role: 'body', tone: 'highlight' },
        B: { name: 'waist', role: 'trim' },
        K: { name: 'knob', role: 'accent' },
        A: { name: 'handle', role: 'accent', tone: 'shadow' },
        P: { name: 'spout', role: 'body', tone: 'shadow' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        accent: { base: '#140c1c', shadow: '#140c1c', highlight: '#4e4a4e' },
      },
    },
    // ── 18. Herbal Tea Infuser ──
    {
      id: 'tea_infuser_32',
      description: 'Metal ball tea infuser with chain and herbs visible',
      size: 32,
      draw: [
        // Chain
        'pixels(C, 5,15, 5,16, 6,16, 7,16, 8,15, 8,16)',
        // Hook
        'pixels(C, 4,15, 4,16, 3,16)',
        // Top half (open)
        'spans(M, 9:12-19, 10:11-20, 11:10-21, 12:10-21)',
        // Hinge
        'pixels(M, 13,10, 13,21)',
        // Bottom half
        'spans(M, 14:10-21, 15:10-21, 16:11-20, 17:12-19)',
        // Holes pattern
        'pixels(H, 10,13, 10,16, 10,19, 11,12, 11,15, 11,18, 11,21, 14,12, 14,15, 14,18, 14,21, 15,13, 15,16, 15,19, 16,14, 16,17)',
        // Herbs visible through holes
        'pixels(G, 11,14, 11,17, 14,14, 14,17, 15,15, 15,18)',
        // Shadow
        'spans(D, 16:18-20, 17:16-19)',
        // Highlight
        'spans(L, 9:13-16, 10:12-14)',
      ],
      chars: {
        M: { name: 'metal', role: 'body' },
        D: { name: 'metal', role: 'body', tone: 'shadow' },
        L: { name: 'metal', role: 'body', tone: 'highlight' },
        H: { name: 'holes', role: 'trim' },
        G: { name: 'herbs', role: 'accent' },
        C: { name: 'chain', role: 'belt' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        trim: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        accent: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        belt: { base: '#757161', shadow: '#4e4a4e', highlight: '#8595a1' },
      },
    },
    // ── 19. Cappuccino ──
    {
      id: 'cappuccino_cup_32',
      description: 'Classic cappuccino cup with foamy top and cocoa dust',
      size: 32,
      draw: [
        // Saucer
        'spans(S, 23:8-23, 24:10-21)',
        'spans(R, 23:9-22)',
        // Cup body (wide)
        'spans(B, 15:9-22, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:9-22, 21:10-21, 22:11-20)',
        // Shadow
        'spans(D, 20:20-22, 21:19-21, 22:18-20)',
        // Highlight
        'spans(H, 15:10-14, 16:9-11)',
        // Foam dome
        'spans(F, 13:11-20, 14:10-21, 15:10-21)',
        // Cocoa dust
        'pixels(C, 13,14, 13,17, 14,12, 14,15, 14,19, 15,13, 15,16, 15,20)',
        // Handle
        'spans(A, 17:24-26, 18:26-27, 19:26-27, 20:24-26)',
        // Steam
        'pixels(V, 11,14, 10,16, 12,18, 11,12)',
      ],
      chars: {
        B: { name: 'cup', role: 'body' },
        D: { name: 'cup', role: 'body', tone: 'shadow' },
        H: { name: 'cup', role: 'body', tone: 'highlight' },
        F: { name: 'foam', role: 'trim' },
        C: { name: 'cocoa', role: 'accent' },
        S: { name: 'saucer', role: 'belt' },
        R: { name: 'saucer', role: 'belt', tone: 'highlight' },
        A: { name: 'handle', role: 'body', tone: 'shadow' },
        V: { name: 'steam', role: 'eye' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        trim: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        belt: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        eye: { base: '#8595a1', shadow: '#757161', highlight: '#deeed6' },
      },
    },
    // ── 20. Tea Ceremony Set ──
    {
      id: 'tea_ceremony_set_32',
      description: 'Japanese tea ceremony set with whisk and bowl',
      size: 32,
      draw: [
        // Chawan (tea bowl)
        'spans(B, 15:5-16, 16:4-17, 17:4-17, 18:4-17, 19:4-17, 20:5-16, 21:6-15)',
        // Bowl shadow
        'spans(D, 19:14-17, 20:13-16, 21:12-15)',
        // Bowl highlight
        'spans(H, 15:6-10, 16:5-7)',
        // Matcha in bowl
        'spans(M, 15:6-15, 16:5-16)',
        // Bowl base
        'spans(F, 22:7-14)',
        // Chasen (whisk)
        'spans(W, 8:20-23, 9:19-24, 10:19-24, 11:19-24, 12:20-23)',
        'pixels(W, 13,21, 13,22, 7,21, 7,22)',
        // Whisk tines
        'pixels(T, 13,19, 13,20, 13,23, 13,24, 14,19, 14,24)',
        // Whisk handle
        'spans(A, 6:20-23, 7:20-23, 8:20-23)',
        // Natsume (tea caddy)
        'spans(N, 16:24-28, 17:23-29, 18:23-29, 19:23-29, 20:24-28)',
        'spans(L, 15:24-28)',
        'pixels(L, 14,25, 14,27)',
      ],
      chars: {
        B: { name: 'bowl', role: 'body' },
        D: { name: 'bowl', role: 'body', tone: 'shadow' },
        H: { name: 'bowl', role: 'body', tone: 'highlight' },
        M: { name: 'matcha', role: 'accent' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
        W: { name: 'whisk', role: 'trim' },
        T: { name: 'tines', role: 'trim', tone: 'highlight' },
        A: { name: 'handle', role: 'belt' },
        N: { name: 'caddy', role: 'eye' },
        L: { name: 'lid', role: 'eye', tone: 'highlight' },
      },
      colors: {
        body: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        trim: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        belt: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        eye: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
  ],
};

export default batch;
