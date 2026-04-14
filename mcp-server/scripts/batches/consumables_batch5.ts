import { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'consumables',
  exportNames: {
    templates: 'COZY_FOOD_32_TEMPLATES',
    schemes: 'COZY_FOOD_32_COLOR_SCHEMES',
  },
  templates: [
    // ── 1. Pizza Slice ──
    {
      id: 'pizza_slice_32',
      description: 'Triangle pizza slice with pepperoni and melted cheese',
      size: 32,
      draw: [
        // Crust (outer edge)
        'spans(C, 8:14-17, 9:12-19)',
        // Cheese body (triangle)
        'spans(B, 10:11-20, 11:10-21, 12:9-22, 13:9-23, 14:8-23, 15:8-24, 16:7-24, 17:7-25, 18:7-25, 19:6-25)',
        // Cheese shadow
        'spans(D, 18:22-25, 19:21-25)',
        // Cheese highlight
        'spans(H, 10:12-16, 11:11-14)',
        // Pepperoni
        'spans(P, 12:13-15, 13:13-15, 15:17-19, 16:17-19, 17:11-13, 18:11-13)',
        // Sauce peek
        'pixels(S, 13:10, 15:9, 17:8, 19:7)',
        // Drip cheese
        'pixels(M, 19:12, 19:16, 19:20, 19:24)',
        // Crust bottom
        'spans(C, 20:6-25)',
      ],
      chars: {
        B: { name: 'cheese', role: 'body' },
        D: { name: 'cheese', role: 'body', tone: 'shadow' },
        H: { name: 'cheese', role: 'body', tone: 'highlight' },
        C: { name: 'crust', role: 'trim' },
        P: { name: 'pepperoni', role: 'accent' },
        S: { name: 'sauce', role: 'accent', tone: 'shadow' },
        M: { name: 'melt', role: 'body', tone: 'highlight' },
      },
      colors: {
        body: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        trim: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        accent: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
    // ── 2. Hamburger ──
    {
      id: 'hamburger_32',
      description: 'Classic hamburger with lettuce, cheese and patty',
      size: 32,
      draw: [
        // Top bun
        'spans(B, 9:9-22, 10:8-23, 11:7-24, 12:7-24, 13:7-24)',
        // Bun highlight
        'spans(H, 9:10-16, 10:9-12)',
        // Sesame seeds
        'pixels(S, 10,14, 10,18, 11,11, 11,16, 11,21)',
        // Lettuce
        'spans(L, 14:6-25, 15:6-25)',
        'pixels(L, 14:5, 14:26, 15:5, 15:26)',
        // Cheese
        'spans(C, 16:7-24)',
        'pixels(C, 17:6, 17:7, 17:24, 17:25)',
        // Patty
        'spans(P, 17:7-24, 18:7-24, 19:7-24)',
        // Patty shadow
        'spans(D, 19:20-24)',
        // Bottom bun
        'spans(B, 20:7-24, 21:8-23, 22:9-22)',
        // Bottom shadow
        'spans(W, 21:20-23, 22:18-22)',
      ],
      chars: {
        B: { name: 'bun', role: 'body' },
        H: { name: 'bun', role: 'body', tone: 'highlight' },
        W: { name: 'bun', role: 'body', tone: 'shadow' },
        S: { name: 'sesame', role: 'trim' },
        L: { name: 'lettuce', role: 'accent' },
        C: { name: 'cheese', role: 'eye' },
        P: { name: 'patty', role: 'belt' },
        D: { name: 'patty', role: 'belt', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        accent: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        eye: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        belt: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },
    // ── 3. Croissant ──
    {
      id: 'croissant_32',
      description: 'Flaky golden croissant with layered texture',
      size: 32,
      draw: [
        // Body (crescent shape)
        'spans(B, 12:7-24, 13:6-25, 14:6-25, 15:6-25, 16:7-24, 17:8-23, 18:9-22)',
        // Highlight
        'spans(H, 12:8-14, 13:7-10, 14:7-9)',
        // Shadow
        'spans(D, 17:20-23, 18:19-22)',
        // Layer lines
        'spans(L, 13:10-22, 15:8-24, 17:10-20)',
        // Tips (curved ends)
        'spans(B, 11:6-8, 11:23-25, 19:8-10, 19:21-23)',
        // Flaky texture
        'pixels(F, 12,16, 12,20, 14,12, 14,18, 14,22, 16,10, 16,14, 16,20)',
        // Shadow beneath
        'spans(S, 19:10-21, 20:12-19)',
      ],
      chars: {
        B: { name: 'pastry', role: 'body' },
        H: { name: 'pastry', role: 'body', tone: 'highlight' },
        D: { name: 'pastry', role: 'body', tone: 'shadow' },
        L: { name: 'layers', role: 'trim' },
        F: { name: 'flaky', role: 'body', tone: 'highlight' },
        S: { name: 'shadow', role: 'accent' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },
    // ── 4. Milkshake ──
    {
      id: 'milkshake_32',
      description: 'Tall milkshake glass with whipped cream and cherry',
      size: 32,
      draw: [
        // Cherry
        'spans(R, 5:14-17, 6:14-17)',
        'pixels(T, 4,15, 3,14)',
        // Whipped cream
        'spans(W, 7:11-20, 8:10-21, 9:10-21)',
        // Glass body
        'spans(G, 10:10-21, 11:10-21, 12:10-21, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:12-19, 18:12-19, 19:12-19, 20:12-19)',
        // Glass highlight
        'spans(H, 10:10-11, 11:10-11, 12:10-11, 13:11-12, 14:11-12, 15:11-12)',
        // Milkshake
        'spans(M, 10:12-20, 11:12-20, 12:12-20, 13:13-19, 14:13-19, 15:13-19, 16:13-19, 17:13-18, 18:13-18, 19:13-18, 20:13-18)',
        // Straw
        'spans(S, 4:19, 5:19, 6:19, 7:19, 8:19, 9:19, 10:19, 11:19, 12:19, 13:19, 14:19, 15:19)',
        // Stem
        'spans(G, 21:14-17, 22:14-17)',
        // Base
        'spans(F, 23:12-19)',
      ],
      chars: {
        G: { name: 'glass', role: 'body' },
        H: { name: 'glass', role: 'body', tone: 'highlight' },
        M: { name: 'shake', role: 'accent' },
        W: { name: 'cream', role: 'trim' },
        R: { name: 'cherry', role: 'belt' },
        T: { name: 'stem', role: 'belt', tone: 'shadow' },
        S: { name: 'straw', role: 'eye' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        belt: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        eye: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
    // ── 5. Fried Egg ──
    {
      id: 'fried_egg_32',
      description: 'Sunny-side up fried egg on plate',
      size: 32,
      draw: [
        // Plate
        'spans(P, 21:6-25, 22:8-23, 23:10-21)',
        'spans(Q, 21:7-24)',
        // Egg white (irregular blob)
        'spans(W, 11:10-20, 12:8-22, 13:7-23, 14:6-24, 15:6-24, 16:6-24, 17:7-23, 18:8-22, 19:10-20)',
        // White highlight
        'spans(H, 11:11-15, 12:9-12)',
        // White shadow
        'spans(D, 18:19-22, 19:17-20)',
        // Yolk
        'spans(Y, 13:12-18, 14:11-19, 15:11-19, 16:12-18)',
        // Yolk highlight
        'spans(L, 13:13-15, 14:12-14)',
        // Shadow on plate
        'spans(S, 20:8-23)',
      ],
      chars: {
        W: { name: 'white', role: 'body' },
        H: { name: 'white', role: 'body', tone: 'highlight' },
        D: { name: 'white', role: 'body', tone: 'shadow' },
        Y: { name: 'yolk', role: 'accent' },
        L: { name: 'yolk', role: 'accent', tone: 'highlight' },
        P: { name: 'plate', role: 'trim' },
        Q: { name: 'plate', role: 'trim', tone: 'highlight' },
        S: { name: 'shadow', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 6. Wine Glass ──
    {
      id: 'wine_glass_32',
      description: 'Elegant wine glass filled with red wine',
      size: 32,
      draw: [
        // Bowl top
        'spans(G, 7:11-20, 8:10-21, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:10-21, 14:11-20)',
        // Glass highlight
        'spans(H, 8:10-12, 9:9-11, 10:9-10, 11:9-10)',
        // Wine
        'spans(W, 10:10-21, 11:10-21, 12:10-21, 13:11-20, 14:12-19)',
        // Wine highlight
        'pixels(L, 10,12, 11,11, 12,11)',
        // Stem
        'spans(G, 15:14-17, 16:14-17, 17:14-17, 18:14-17, 19:14-17)',
        // Base
        'spans(F, 20:10-21, 21:11-20)',
        'spans(K, 20:11-14)',
      ],
      chars: {
        G: { name: 'glass', role: 'body' },
        H: { name: 'glass', role: 'body', tone: 'highlight' },
        W: { name: 'wine', role: 'accent' },
        L: { name: 'wine', role: 'accent', tone: 'highlight' },
        F: { name: 'base', role: 'trim' },
        K: { name: 'base', role: 'trim', tone: 'highlight' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 7. Sandwich ──
    {
      id: 'club_sandwich_32',
      description: 'Club sandwich with layers of meat, lettuce and tomato',
      size: 32,
      draw: [
        // Top bread
        'spans(B, 9:7-24, 10:7-24, 11:7-24)',
        'spans(H, 9:8-14, 10:8-10)',
        // Lettuce
        'spans(L, 12:6-25)',
        'pixels(L, 13:5, 13:26)',
        // Tomato
        'spans(T, 13:7-24)',
        // Cheese
        'spans(C, 14:7-24)',
        'pixels(C, 14:6, 14:25)',
        // Meat
        'spans(M, 15:7-24, 16:7-24)',
        // Middle bread
        'spans(B, 17:7-24)',
        // Lettuce 2
        'spans(L, 18:6-25)',
        // Meat 2
        'spans(M, 19:7-24)',
        // Bottom bread
        'spans(B, 20:7-24, 21:7-24)',
        'spans(D, 21:20-24)',
        // Toothpick
        'spans(P, 6:15-16, 7:15-16, 8:15-16)',
        'pixels(F, 5,15, 5,16)',
      ],
      chars: {
        B: { name: 'bread', role: 'body' },
        H: { name: 'bread', role: 'body', tone: 'highlight' },
        D: { name: 'bread', role: 'body', tone: 'shadow' },
        L: { name: 'lettuce', role: 'accent' },
        T: { name: 'tomato', role: 'belt' },
        C: { name: 'cheese', role: 'eye' },
        M: { name: 'meat', role: 'trim' },
        P: { name: 'toothpick', role: 'body', tone: 'shadow' },
        F: { name: 'flag', role: 'belt', tone: 'highlight' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        accent: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        belt: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        eye: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        trim: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
      },
    },
    // ── 8. Cupcake ──
    {
      id: 'frosted_cupcake_32',
      description: 'Cupcake with swirled frosting and sprinkles',
      size: 32,
      draw: [
        // Frosting swirl
        'spans(F, 8:11-20, 9:10-21, 10:9-22, 11:9-22, 12:10-21, 13:11-20)',
        // Frosting highlight
        'spans(H, 8:12-15, 9:11-13, 10:10-12)',
        // Sprinkles
        'pixels(S, 9,14, 9,18, 10,12, 10,20, 11,14, 11,19, 12,12, 12,18)',
        // Cherry on top
        'spans(R, 7:14-17)',
        'pixels(T, 6,15)',
        // Wrapper
        'spans(W, 14:10-21, 15:10-21, 16:10-21, 17:11-20, 18:11-20, 19:11-20, 20:12-19)',
        // Wrapper shadow
        'spans(D, 18:18-20, 19:17-20, 20:17-19)',
        // Wrapper ridges
        'pixels(L, 15,10, 15,13, 15,16, 15,19, 17,11, 17,14, 17,17, 17,20, 19,12, 19,15, 19,18)',
        // Cake visible
        'spans(C, 14:11-20)',
        // Base
        'spans(X, 21:13-18)',
      ],
      chars: {
        F: { name: 'frosting', role: 'body' },
        H: { name: 'frosting', role: 'body', tone: 'highlight' },
        S: { name: 'sprinkles', role: 'accent' },
        R: { name: 'cherry', role: 'belt' },
        T: { name: 'stem', role: 'belt', tone: 'shadow' },
        W: { name: 'wrapper', role: 'trim' },
        D: { name: 'wrapper', role: 'trim', tone: 'shadow' },
        L: { name: 'ridges', role: 'trim', tone: 'highlight' },
        C: { name: 'cake', role: 'eye' },
        X: { name: 'base', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        accent: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        belt: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        eye: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
      },
    },
    // ── 9. Soda Can ──
    {
      id: 'soda_can_32',
      description: 'Aluminum soda can with colorful label',
      size: 32,
      draw: [
        // Tab
        'pixels(M, 6,14, 6,15, 6,16, 6,17, 7,13, 7,18)',
        // Top
        'spans(T, 7:14-17, 8:12-19)',
        // Body
        'spans(B, 9:11-20, 10:11-20, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:11-20, 19:11-20, 20:11-20, 21:11-20)',
        // Shadow
        'spans(D, 9:18-20, 10:18-20, 11:18-20, 12:18-20, 13:18-20, 14:18-20, 15:18-20, 16:18-20, 17:18-20, 18:18-20, 19:18-20, 20:18-20, 21:18-20)',
        // Highlight
        'spans(H, 9:11-12, 10:11-12, 11:11-12, 12:11-12, 13:11-12, 14:11-12, 15:11-12, 16:11-12, 17:11-12, 18:11-12, 19:11-12, 20:11-12, 21:11-12)',
        // Label stripe
        'spans(L, 12:13-17, 13:13-17, 14:13-17, 15:13-17, 16:13-17, 17:13-17)',
        // Logo area
        'spans(G, 14:14-16, 15:14-16)',
        // Bottom
        'spans(T, 22:12-19, 23:13-18)',
      ],
      chars: {
        B: { name: 'can', role: 'body' },
        D: { name: 'can', role: 'body', tone: 'shadow' },
        H: { name: 'can', role: 'body', tone: 'highlight' },
        T: { name: 'top', role: 'trim' },
        M: { name: 'tab', role: 'trim', tone: 'highlight' },
        L: { name: 'label', role: 'accent' },
        G: { name: 'logo', role: 'accent', tone: 'highlight' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#deeed6', shadow: '#8595a1', highlight: '#deeed6' },
      },
    },
    // ── 10. Donut ──
    {
      id: 'glazed_donut_32',
      description: 'Ring donut with chocolate glaze and sprinkles',
      size: 32,
      draw: [
        // Donut body (ring shape)
        'spans(B, 9:10-21, 10:8-23, 11:7-24, 12:7-24, 13:7-14, 13:17-24, 14:7-13, 14:18-24, 15:7-13, 15:18-24, 16:7-14, 16:17-24, 17:8-23, 18:9-22, 19:10-21)',
        // Shadow
        'spans(D, 17:20-23, 18:19-22, 19:18-21)',
        // Highlight
        'spans(H, 9:11-16, 10:9-12)',
        // Chocolate glaze top
        'spans(G, 9:11-20, 10:9-22, 11:8-23, 12:8-14, 12:17-23, 13:8-13, 13:18-23)',
        // Sprinkles
        'pixels(S, 10,12, 10,16, 10,20, 11,10, 11,14, 11,21, 12,11, 12,20)',
        // Inner hole shadow
        'spans(I, 14:14-17, 15:14-17)',
      ],
      chars: {
        B: { name: 'dough', role: 'body' },
        D: { name: 'dough', role: 'body', tone: 'shadow' },
        H: { name: 'dough', role: 'body', tone: 'highlight' },
        G: { name: 'glaze', role: 'accent' },
        S: { name: 'sprinkles', role: 'trim' },
        I: { name: 'hole', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
      },
    },
    // ── 11. Pancake Stack ──
    {
      id: 'pancake_stack_32',
      description: 'Stack of 3 pancakes with butter and syrup drip',
      size: 32,
      draw: [
        // Butter pat on top
        'spans(U, 8:13-18, 9:13-18)',
        // Top pancake
        'spans(B, 10:8-23, 11:7-24, 12:7-24)',
        'spans(H, 10:9-14)',
        // Syrup drip
        'spans(S, 12:8-9, 12:22-24, 13:7-8, 13:23-24)',
        // Middle pancake
        'spans(B, 13:8-23, 14:7-24, 15:7-24)',
        // Bottom pancake
        'spans(B, 16:8-23, 17:7-24, 18:7-24)',
        // Shadow
        'spans(D, 17:20-24, 18:20-24)',
        // Plate
        'spans(P, 19:5-26, 20:4-27, 21:5-26)',
        'spans(Q, 19:6-25)',
        // Syrup pool
        'spans(S, 19:8-14, 20:7-12)',
      ],
      chars: {
        B: { name: 'pancake', role: 'body' },
        H: { name: 'pancake', role: 'body', tone: 'highlight' },
        D: { name: 'pancake', role: 'body', tone: 'shadow' },
        U: { name: 'butter', role: 'accent' },
        S: { name: 'syrup', role: 'trim' },
        P: { name: 'plate', role: 'belt' },
        Q: { name: 'plate', role: 'belt', tone: 'highlight' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        accent: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        belt: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 12. French Fries ──
    {
      id: 'french_fries_32',
      description: 'Paper cone of golden French fries',
      size: 32,
      draw: [
        // Fries sticking up
        'spans(F, 6:11-13, 7:11-13, 8:11-13)',
        'spans(F, 6:15-16, 7:15-16, 8:15-16)',
        'spans(F, 7:18-20, 8:18-20)',
        'spans(F, 7:9-10, 8:9-10)',
        'spans(F, 6:21-22, 7:21-22, 8:21-22)',
        // Paper cone
        'spans(C, 9:7-24, 10:8-23, 11:8-23, 12:9-22, 13:9-22, 14:10-21, 15:10-21, 16:11-20, 17:11-20, 18:12-19, 19:12-19, 20:13-18, 21:14-17)',
        // Cone shadow
        'spans(D, 18:17-19, 19:17-19, 20:16-18, 21:16-17)',
        // Cone stripe
        'spans(S, 12:10-21, 16:12-19, 20:14-17)',
        // Fry highlight
        'spans(H, 6:12, 7:15, 6:21)',
      ],
      chars: {
        F: { name: 'fries', role: 'body' },
        H: { name: 'fries', role: 'body', tone: 'highlight' },
        C: { name: 'cone', role: 'trim' },
        D: { name: 'cone', role: 'trim', tone: 'shadow' },
        S: { name: 'stripe', role: 'accent' },
      },
      colors: {
        body: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        trim: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        accent: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 13. Ice Cream Cone ──
    {
      id: 'ice_cream_cone_32',
      description: 'Waffle cone with two scoops of ice cream',
      size: 32,
      draw: [
        // Top scoop
        'spans(A, 6:11-20, 7:10-21, 8:10-21, 9:10-21, 10:11-20)',
        'spans(Z, 6:12-15, 7:11-13)',
        // Bottom scoop
        'spans(B, 10:9-22, 11:8-23, 12:8-23, 13:9-22)',
        'spans(H, 10:10-14, 11:9-11)',
        // Cone
        'spans(C, 14:9-22, 15:10-21, 16:10-21, 17:11-20, 18:11-20, 19:12-19, 20:12-19, 21:13-18, 22:14-17, 23:15-16)',
        // Cone shadow
        'spans(D, 21:16-18, 22:16-17, 23:16)',
        // Waffle pattern
        'pixels(W, 15,12, 15,16, 15,20, 17,13, 17,17, 19,14, 19,18, 21,15, 21,17)',
        // Drip
        'pixels(B, 14,10, 14,21)',
      ],
      chars: {
        A: { name: 'scoop1', role: 'accent' },
        Z: { name: 'scoop1', role: 'accent', tone: 'highlight' },
        B: { name: 'scoop2', role: 'body' },
        H: { name: 'scoop2', role: 'body', tone: 'highlight' },
        C: { name: 'cone', role: 'trim' },
        D: { name: 'cone', role: 'trim', tone: 'shadow' },
        W: { name: 'waffle', role: 'trim', tone: 'highlight' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        accent: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
      },
    },
    // ── 14. Taco ──
    {
      id: 'taco_32',
      description: 'Loaded taco with meat, lettuce, cheese and tomato',
      size: 32,
      draw: [
        // Tortilla shell (U shape)
        'spans(T, 10:7-8, 10:23-24, 11:6-7, 11:24-25, 12:6, 12:25, 13:5-6, 13:25-26, 14:5, 14:26, 15:5, 15:26, 16:5, 16:26, 17:5-6, 17:25-26, 18:6-7, 18:24-25, 19:7-24)',
        // Tortilla fill
        'spans(T, 19:8-23)',
        // Lettuce (top)
        'spans(L, 10:9-22, 11:8-23)',
        'pixels(L, 9:10, 9:14, 9:18, 9:22)',
        // Meat
        'spans(M, 12:7-24, 13:7-24, 14:6-25)',
        // Cheese
        'spans(C, 15:6-25, 16:6-25)',
        'pixels(C, 17:6, 17:25)',
        // Tomato bits
        'pixels(R, 11,10, 11,15, 11,20, 10,12, 10,17)',
        // Shadow
        'spans(D, 17:7-24, 18:8-23)',
      ],
      chars: {
        T: { name: 'tortilla', role: 'body' },
        L: { name: 'lettuce', role: 'accent' },
        M: { name: 'meat', role: 'trim' },
        C: { name: 'cheese', role: 'eye' },
        R: { name: 'tomato', role: 'belt' },
        D: { name: 'shadow', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        accent: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        eye: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        belt: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
    // ── 15. Water Bottle ──
    {
      id: 'water_bottle_32',
      description: 'Plastic water bottle with blue label',
      size: 32,
      draw: [
        // Cap
        'spans(C, 5:14-17, 6:14-17)',
        // Neck
        'spans(B, 7:14-17, 8:14-17)',
        // Shoulder
        'spans(B, 9:12-19, 10:11-20)',
        // Body
        'spans(B, 11:11-20, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20, 17:11-20, 18:11-20, 19:11-20, 20:11-20, 21:11-20, 22:11-20)',
        // Shadow
        'spans(D, 11:18-20, 12:18-20, 13:18-20, 14:18-20, 15:18-20, 16:18-20, 17:18-20, 18:18-20, 19:18-20, 20:18-20, 21:18-20, 22:18-20)',
        // Highlight
        'spans(H, 11:11-12, 12:11-12, 13:11-12, 14:11-12, 15:11-12, 16:11-12, 17:11-12, 18:11-12, 19:11-12, 20:11-12, 21:11-12, 22:11-12)',
        // Label
        'spans(L, 14:13-17, 15:13-17, 16:13-17, 17:13-17, 18:13-17)',
        // Water level line
        'spans(W, 19:13-17)',
        // Base
        'spans(F, 23:12-19)',
      ],
      chars: {
        B: { name: 'bottle', role: 'body' },
        D: { name: 'bottle', role: 'body', tone: 'shadow' },
        H: { name: 'bottle', role: 'body', tone: 'highlight' },
        C: { name: 'cap', role: 'trim' },
        L: { name: 'label', role: 'accent' },
        W: { name: 'water', role: 'accent', tone: 'highlight' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        trim: { base: '#deeed6', shadow: '#8595a1', highlight: '#deeed6' },
        accent: { base: '#597dce', shadow: '#30346d', highlight: '#6dc2ca' },
      },
    },
    // ── 16. Cookie ──
    {
      id: 'chocolate_chip_cookie_32',
      description: 'Round chocolate chip cookie with visible chips',
      size: 32,
      draw: [
        // Cookie body
        'spans(B, 10:11-20, 11:9-22, 12:8-23, 13:8-23, 14:7-24, 15:7-24, 16:7-24, 17:8-23, 18:8-23, 19:9-22, 20:10-21)',
        // Shadow
        'spans(D, 18:20-23, 19:19-22, 20:18-21)',
        // Highlight
        'spans(H, 10:12-16, 11:10-13, 12:9-11)',
        // Chocolate chips
        'pixels(C, 11,13, 11,18, 13,10, 13,16, 13,21, 15,12, 15,19, 15,23, 17,9, 17,14, 17,20, 19,12, 19,17)',
        // Surface texture
        'pixels(T, 12,14, 14,11, 14,20, 16,16, 18,13, 18,21)',
        // Shadow beneath
        'spans(S, 21:11-20)',
      ],
      chars: {
        B: { name: 'cookie', role: 'body' },
        D: { name: 'cookie', role: 'body', tone: 'shadow' },
        H: { name: 'cookie', role: 'body', tone: 'highlight' },
        C: { name: 'chips', role: 'accent' },
        T: { name: 'texture', role: 'body', tone: 'shadow' },
        S: { name: 'shadow', role: 'trim' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },
    // ── 17. Soup Bowl ──
    {
      id: 'tomato_soup_bowl_32',
      description: 'Bowl of tomato soup with cream swirl and bread',
      size: 32,
      draw: [
        // Bowl
        'spans(B, 14:6-25, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:6-25, 20:7-24, 21:8-23, 22:10-21)',
        // Shadow
        'spans(D, 20:22-25, 21:20-23, 22:18-21)',
        // Highlight
        'spans(H, 14:7-12, 15:6-8)',
        // Soup surface
        'spans(S, 14:7-24, 15:6-25)',
        // Cream swirl
        'pixels(C, 14,13, 14,14, 14,17, 14,18, 15,12, 15,15, 15,16, 15,19)',
        // Rim
        'spans(M, 13:6-25)',
        // Base
        'spans(F, 23:11-20)',
        // Bread on side
        'spans(W, 11:22-27, 12:21-28, 13:22-27)',
        // Steam
        'pixels(V, 11,12, 10,15, 12,18, 11,10)',
      ],
      chars: {
        B: { name: 'bowl', role: 'body' },
        D: { name: 'bowl', role: 'body', tone: 'shadow' },
        H: { name: 'bowl', role: 'body', tone: 'highlight' },
        S: { name: 'soup', role: 'accent' },
        C: { name: 'cream', role: 'trim' },
        M: { name: 'rim', role: 'body', tone: 'shadow' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
        W: { name: 'bread', role: 'belt' },
        V: { name: 'steam', role: 'trim', tone: 'highlight' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        accent: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        belt: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
      },
    },
    // ── 18. Juice Box ──
    {
      id: 'juice_box_32',
      description: 'Small juice box with straw and fruit label',
      size: 32,
      draw: [
        // Box body
        'spans(B, 9:9-22, 10:9-22, 11:9-22, 12:9-22, 13:9-22, 14:9-22, 15:9-22, 16:9-22, 17:9-22, 18:9-22, 19:9-22, 20:9-22, 21:9-22)',
        // Shadow
        'spans(D, 20:19-22, 21:19-22)',
        // Highlight
        'spans(H, 9:10-13, 10:10-11)',
        // Top fold
        'spans(T, 8:10-21, 9:9-10, 9:21-22)',
        // Straw
        'spans(W, 4:18, 5:18, 6:18, 7:18, 8:18, 9:18)',
        // Label area
        'spans(L, 12:11-20, 13:11-20, 14:11-20, 15:11-20, 16:11-20)',
        // Fruit icon
        'spans(F, 13:14-17, 14:13-18, 15:14-17)',
        // Brand text
        'spans(X, 18:11-20, 19:11-18)',
        // Base
        'spans(K, 22:10-21)',
      ],
      chars: {
        B: { name: 'box', role: 'body' },
        D: { name: 'box', role: 'body', tone: 'shadow' },
        H: { name: 'box', role: 'body', tone: 'highlight' },
        T: { name: 'top', role: 'body', tone: 'shadow' },
        W: { name: 'straw', role: 'trim' },
        L: { name: 'label', role: 'accent' },
        F: { name: 'fruit', role: 'belt' },
        X: { name: 'text', role: 'accent', tone: 'shadow' },
        K: { name: 'base', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        trim: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        belt: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
    // ── 19. Pretzel ──
    {
      id: 'pretzel_32',
      description: 'Traditional twisted pretzel with salt crystals',
      size: 32,
      draw: [
        // Pretzel shape (twisted loops)
        // Top loop left
        'spans(B, 8:7-12, 9:6-8, 9:11-13, 10:6-8, 10:11-13, 11:7-12)',
        // Top loop right
        'spans(B, 8:19-24, 9:18-20, 9:23-25, 10:18-20, 10:23-25, 11:19-24)',
        // Cross
        'spans(B, 12:11-20, 13:12-19)',
        // Bottom loop left
        'spans(B, 14:7-12, 15:6-8, 15:11-13, 16:6-8, 16:11-13, 17:7-12)',
        // Bottom loop right
        'spans(B, 14:19-24, 15:18-20, 15:23-25, 16:18-20, 16:23-25, 17:19-24)',
        // Highlight
        'spans(H, 8:8-10, 8:20-22, 14:8-10, 14:20-22)',
        // Shadow
        'spans(D, 11:9-12, 11:20-24, 17:9-12, 17:20-24)',
        // Salt crystals
        'pixels(S, 8,9, 9,12, 10,7, 12,15, 12,17, 14,21, 15,7, 16,24, 17,10)',
        // Center twist overlap
        'spans(B, 12:15-16, 13:15-16)',
      ],
      chars: {
        B: { name: 'pretzel', role: 'body' },
        H: { name: 'pretzel', role: 'body', tone: 'highlight' },
        D: { name: 'pretzel', role: 'body', tone: 'shadow' },
        S: { name: 'salt', role: 'trim' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 20. Smoothie ──
    {
      id: 'fruit_smoothie_32',
      description: 'Tall fruit smoothie in a clear cup with fruit garnish',
      size: 32,
      draw: [
        // Cup body
        'spans(G, 8:10-21, 9:10-21, 10:10-21, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:11-20, 17:11-20, 18:11-20, 19:11-20, 20:12-19, 21:12-19, 22:13-18)',
        // Glass highlight
        'spans(H, 9:10-11, 10:10-11, 11:10-11, 12:10-11, 13:10-11, 14:10-11, 15:10-11)',
        // Smoothie fill
        'spans(S, 9:12-20, 10:12-20, 11:12-20, 12:12-20, 13:12-20, 14:12-20, 15:12-20, 16:12-19, 17:12-19, 18:12-19, 19:12-19, 20:13-18, 21:13-18)',
        // Fruit layer visible
        'spans(F, 16:12-19, 17:12-19)',
        // Lid
        'spans(L, 7:10-21, 8:10-21)',
        // Straw
        'spans(W, 4:18, 5:18, 6:18, 7:18, 8:18, 9:18, 10:18, 11:18)',
        // Fruit garnish (strawberry on rim)
        'spans(R, 6:9-11, 7:8-10)',
        'pixels(V, 5,9, 5,10)',
        // Base
        'spans(X, 23:14-17)',
      ],
      chars: {
        G: { name: 'cup', role: 'body' },
        H: { name: 'cup', role: 'body', tone: 'highlight' },
        S: { name: 'smoothie', role: 'accent' },
        F: { name: 'fruit_layer', role: 'accent', tone: 'shadow' },
        L: { name: 'lid', role: 'trim' },
        W: { name: 'straw', role: 'belt' },
        R: { name: 'strawberry', role: 'eye' },
        V: { name: 'leaves', role: 'eye', tone: 'shadow' },
        X: { name: 'base', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#deeed6', shadow: '#8595a1', highlight: '#deeed6' },
        belt: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        eye: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
  ],
};

export default batch;
