import { BatchDefinition } from '../templateGenerator.js';

const batch: BatchDefinition = {
  category: 'consumables',
  exportNames: {
    templates: 'COZY_RAMEN_32_TEMPLATES',
    schemes: 'COZY_RAMEN_32_COLOR_SCHEMES',
  },
  templates: [
    // ── 1. Tonkotsu Ramen Bowl ──
    {
      id: 'tonkotsu_ramen_32',
      description: 'Classic tonkotsu ramen bowl with egg, noodles and chashu',
      size: 32,
      draw: [
        // Bowl body
        'spans(B, 14:6-25, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:6-25, 20:7-24, 21:8-23, 22:10-21)',
        // Bowl shadow
        'spans(D, 20:22-25, 21:20-23, 22:18-21)',
        // Bowl highlight
        'spans(H, 14:7-12, 15:6-8)',
        // Broth surface
        'spans(S, 14:7-24, 15:6-25)',
        // Noodles
        'spans(N, 16:10-21, 17:9-22, 18:8-23)',
        // Egg half (left)
        'spans(E, 14:9-12, 15:8-13)',
        'pixels(Y, 14,10, 14,11, 15,10, 15,11)',
        // Chashu (right)
        'spans(C, 14:18-22, 15:17-23)',
        // Green onion
        'pixels(G, 14,14, 14,16, 15,15, 15,13)',
        // Nori
        'spans(R, 13:22-24, 14:23-24)',
        // Rim
        'spans(M, 13:6-25)',
        // Base
        'spans(F, 23:11-20)',
        // Steam
        'pixels(V, 11,12, 10,15, 12,18, 11,21)',
      ],
      chars: {
        B: { name: 'bowl', role: 'body' },
        D: { name: 'bowl', role: 'body', tone: 'shadow' },
        H: { name: 'bowl', role: 'body', tone: 'highlight' },
        S: { name: 'broth', role: 'accent' },
        N: { name: 'noodles', role: 'trim' },
        E: { name: 'egg_white', role: 'belt' },
        Y: { name: 'egg_yolk', role: 'eye' },
        C: { name: 'chashu', role: 'accent', tone: 'shadow' },
        G: { name: 'onion', role: 'trim', tone: 'highlight' },
        R: { name: 'nori', role: 'body', tone: 'shadow' },
        M: { name: 'rim', role: 'body', tone: 'shadow' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
        V: { name: 'steam', role: 'belt', tone: 'highlight' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        accent: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        trim: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        belt: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        eye: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
      },
    },
    // ── 2. Miso Ramen ──
    {
      id: 'miso_ramen_32',
      description: 'Miso ramen with corn, butter and bean sprouts',
      size: 32,
      draw: [
        // Bowl body
        'spans(B, 14:6-25, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:6-25, 20:7-24, 21:8-23, 22:10-21)',
        // Shadow
        'spans(D, 20:22-25, 21:20-23, 22:18-21)',
        // Highlight
        'spans(H, 14:7-12, 15:6-8)',
        // Miso broth
        'spans(S, 14:7-24, 15:6-25)',
        // Noodles
        'spans(N, 16:10-21, 17:9-22, 18:8-23)',
        // Corn kernels
        'pixels(C, 14:8-10, 15:8-11)',
        // Butter pat
        'spans(U, 14:20-22, 15:20-22)',
        // Bean sprouts
        'pixels(P, 14,14, 14,16, 15,13, 15,15, 15,17)',
        // Rim
        'spans(M, 13:6-25)',
        // Base
        'spans(F, 23:11-20)',
        // Steam
        'pixels(V, 11,13, 10,16, 12,19, 11,10)',
      ],
      chars: {
        B: { name: 'bowl', role: 'body' },
        D: { name: 'bowl', role: 'body', tone: 'shadow' },
        H: { name: 'bowl', role: 'body', tone: 'highlight' },
        S: { name: 'broth', role: 'accent' },
        N: { name: 'noodles', role: 'trim' },
        C: { name: 'corn', role: 'eye' },
        U: { name: 'butter', role: 'belt' },
        P: { name: 'sprouts', role: 'trim', tone: 'highlight' },
        M: { name: 'rim', role: 'body', tone: 'shadow' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
        V: { name: 'steam', role: 'belt', tone: 'highlight' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        eye: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        belt: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
      },
    },
    // ── 3. Sushi Plate ──
    {
      id: 'sushi_plate_32',
      description: 'Wooden plate with 3 pieces of nigiri sushi',
      size: 32,
      draw: [
        // Wooden plate
        'spans(W, 19:5-26, 20:4-27, 21:4-27, 22:5-26)',
        'spans(X, 22:6-25)',
        // Sushi 1 (salmon)
        'spans(A, 14:6-10, 15:5-11, 16:5-11)',
        'spans(R, 17:5-11, 18:6-10)',
        // Sushi 2 (tuna)
        'spans(T, 14:13-17, 15:12-18, 16:12-18)',
        'spans(R, 17:12-18, 18:13-17)',
        // Sushi 3 (shrimp)
        'spans(P, 14:20-24, 15:19-25, 16:19-25)',
        'spans(R, 17:19-25, 18:20-24)',
        // Wasabi
        'spans(G, 19:15-16, 20:14-17)',
        // Ginger
        'spans(K, 19:21-24, 20:21-24)',
      ],
      chars: {
        W: { name: 'plate', role: 'body' },
        X: { name: 'plate', role: 'body', tone: 'shadow' },
        A: { name: 'salmon', role: 'accent' },
        T: { name: 'tuna', role: 'trim' },
        P: { name: 'shrimp', role: 'eye' },
        R: { name: 'rice', role: 'belt' },
        G: { name: 'wasabi', role: 'trim', tone: 'highlight' },
        K: { name: 'ginger', role: 'accent', tone: 'highlight' },
      },
      colors: {
        body: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        trim: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        eye: { base: '#d2aa99', shadow: '#d27d2c', highlight: '#deeed6' },
        belt: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 4. Dumpling Steamer ──
    {
      id: 'dumpling_steamer_32',
      description: 'Bamboo steamer basket with dumplings inside',
      size: 32,
      draw: [
        // Lid (bamboo woven)
        'spans(L, 7:10-21, 8:9-22, 9:8-23, 10:8-23)',
        'spans(K, 7:11-20, 8:10-21)',
        // Lid knob
        'spans(N, 6:14-17)',
        // Basket body
        'spans(B, 11:8-23, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:8-23, 19:9-22)',
        // Shadow
        'spans(D, 17:21-24, 18:20-23, 19:19-22)',
        // Highlight
        'spans(H, 11:9-13, 12:8-10)',
        // Dumplings visible
        'spans(W, 12:11-15, 13:10-16, 14:11-15)',
        'spans(W, 12:17-21, 13:16-22, 14:17-21)',
        'spans(W, 15:14-18, 16:13-19)',
        // Base plate
        'spans(F, 20:10-21, 21:11-20)',
        // Steam
        'pixels(V, 5,14, 4,16, 5,18, 4,13)',
      ],
      chars: {
        B: { name: 'basket', role: 'body' },
        D: { name: 'basket', role: 'body', tone: 'shadow' },
        H: { name: 'basket', role: 'body', tone: 'highlight' },
        L: { name: 'lid', role: 'trim' },
        K: { name: 'lid', role: 'trim', tone: 'highlight' },
        N: { name: 'knob', role: 'trim', tone: 'shadow' },
        W: { name: 'dumplings', role: 'accent' },
        F: { name: 'plate', role: 'belt' },
        V: { name: 'steam', role: 'eye' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        belt: { base: '#4e4a4e', shadow: '#140c1c', highlight: '#757161' },
        eye: { base: '#8595a1', shadow: '#757161', highlight: '#deeed6' },
      },
    },
    // ── 5. Onigiri ──
    {
      id: 'onigiri_32',
      description: 'Rice ball wrapped with nori seaweed strip',
      size: 32,
      draw: [
        // Rice body (triangle shape)
        'spans(R, 9:13-18, 10:12-19, 11:11-20, 12:10-21, 13:10-21, 14:9-22, 15:9-22, 16:8-23, 17:8-23, 18:8-23, 19:8-23, 20:8-23)',
        // Rice highlight
        'spans(H, 10:13-16, 11:12-14, 12:11-13)',
        // Nori wrap (bottom third)
        'spans(N, 17:9-22, 18:9-22, 19:9-22, 20:9-22)',
        // Nori shadow
        'spans(D, 19:19-22, 20:19-22)',
        // Filling visible (center)
        'pixels(F, 13,15, 13,16, 14,14, 14,15, 14,16, 14,17, 15,15, 15,16)',
        // Base shadow
        'spans(S, 21:9-22)',
      ],
      chars: {
        R: { name: 'rice', role: 'body' },
        H: { name: 'rice', role: 'body', tone: 'highlight' },
        N: { name: 'nori', role: 'trim' },
        D: { name: 'nori', role: 'trim', tone: 'shadow' },
        F: { name: 'filling', role: 'accent' },
        S: { name: 'shadow', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        trim: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        accent: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
    // ── 6. Bento Box ──
    {
      id: 'bento_box_32',
      description: 'Japanese bento lunch box with compartments',
      size: 32,
      draw: [
        // Box body
        'spans(B, 10:5-26, 11:5-26, 12:5-26, 13:5-26, 14:5-26, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:5-26, 20:5-26, 21:5-26, 22:5-26)',
        // Shadow
        'spans(D, 21:22-26, 22:22-26)',
        // Highlight
        'spans(H, 10:6-10)',
        // Dividers
        'spans(V, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16, 22:15-16)',
        'spans(V, 16:5-15)',
        // Rice section (top-left)
        'spans(R, 11:6-14, 12:6-14, 13:6-14, 14:6-14, 15:6-14)',
        // Protein section (bottom-left)
        'spans(P, 17:6-14, 18:6-14, 19:6-14, 20:6-14, 21:6-14)',
        // Veggie section (right)
        'spans(G, 11:17-25, 12:17-25, 13:17-25, 14:17-25, 15:17-25, 16:17-25, 17:17-25, 18:17-25, 19:17-25, 20:17-25, 21:17-25)',
        // Box rim
        'spans(M, 9:5-26)',
        'spans(M, 10:5, 11:5, 12:5, 13:5, 14:5, 15:5, 16:5, 17:5, 18:5, 19:5, 20:5, 21:5, 22:5)',
        'spans(M, 10:26, 11:26, 12:26, 13:26, 14:26, 15:26, 16:26, 17:26, 18:26, 19:26, 20:26, 21:26, 22:26)',
      ],
      chars: {
        B: { name: 'box', role: 'body' },
        D: { name: 'box', role: 'body', tone: 'shadow' },
        H: { name: 'box', role: 'body', tone: 'highlight' },
        V: { name: 'divider', role: 'body', tone: 'shadow' },
        R: { name: 'rice', role: 'trim' },
        P: { name: 'protein', role: 'accent' },
        G: { name: 'veggies', role: 'belt' },
        M: { name: 'rim', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        belt: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
      },
    },
    // ── 7. Takoyaki Plate ──
    {
      id: 'takoyaki_plate_32',
      description: 'Plate of takoyaki octopus balls with sauce and mayo',
      size: 32,
      draw: [
        // Boat/plate
        'spans(W, 18:5-26, 19:4-27, 20:4-27, 21:5-26)',
        'spans(X, 20:5-26, 21:6-25)',
        // Takoyaki balls (6)
        'spans(B, 13:6-10, 14:5-11, 15:6-10)',
        'spans(B, 13:12-16, 14:11-17, 15:12-16)',
        'spans(B, 13:18-22, 14:17-23, 15:18-22)',
        'spans(B, 16:9-13, 17:8-14, 18:9-13)',
        'spans(B, 16:15-19, 17:14-20, 18:15-19)',
        'spans(B, 16:21-25, 17:20-26, 18:21-25)',
        // Sauce drizzle
        'pixels(S, 13,8, 14,7, 14,14, 13,20, 14,19, 17,10, 17,17, 17,23)',
        // Mayo drizzle
        'pixels(M, 13,7, 14,13, 14,21, 17,12, 17,18, 17,24)',
        // Bonito flakes
        'pixels(F, 14,9, 14,15, 17,9, 17,15, 17,21)',
        // Green onion bits
        'pixels(G, 13,9, 14,16, 17,11, 17,22)',
      ],
      chars: {
        B: { name: 'takoyaki', role: 'body' },
        W: { name: 'plate', role: 'trim' },
        X: { name: 'plate', role: 'trim', tone: 'shadow' },
        S: { name: 'sauce', role: 'accent' },
        M: { name: 'mayo', role: 'belt' },
        F: { name: 'bonito', role: 'accent', tone: 'shadow' },
        G: { name: 'onion', role: 'eye' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        belt: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        eye: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
      },
    },
    // ── 8. Chopsticks with Rest ──
    {
      id: 'chopsticks_rest_32',
      description: 'Pair of chopsticks on a ceramic rest',
      size: 32,
      draw: [
        // Chopstick rest (ceramic)
        'spans(R, 19:10-21, 20:9-22, 21:10-21)',
        'spans(H, 19:11-15, 20:10-13)',
        // Chopstick 1
        'pixels(C, 8,8, 9,9, 10,10, 11,11, 12,12, 13,13, 14,14, 15,15, 16,16, 17,17, 18,18, 19,19, 20,20)',
        // Chopstick 2
        'pixels(C, 8,10, 9,11, 10,12, 11,13, 12,14, 13,15, 14,16, 15,17, 16,18, 17,19, 18,20, 19,21, 20,22)',
        // Chopstick tips (darker)
        'pixels(T, 18,18, 19,19, 20,20, 18,20, 19,21, 20,22)',
        // Chopstick top decoration
        'pixels(D, 8,8, 8,10, 9,9, 9,11)',
      ],
      chars: {
        R: { name: 'rest', role: 'body' },
        H: { name: 'rest', role: 'body', tone: 'highlight' },
        C: { name: 'chopstick', role: 'trim' },
        T: { name: 'tip', role: 'trim', tone: 'shadow' },
        D: { name: 'decor', role: 'accent' },
      },
      colors: {
        body: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
    // ── 9. Mochi ──
    {
      id: 'mochi_trio_32',
      description: 'Three colorful mochi on a plate (pink, green, white)',
      size: 32,
      draw: [
        // Plate
        'spans(P, 21:6-25, 22:8-23, 23:10-21)',
        'spans(Q, 21:7-24)',
        // Pink mochi
        'spans(A, 14:6-12, 15:5-13, 16:5-13, 17:5-13, 18:6-12)',
        'spans(Z, 14:7-9, 15:6-8)',
        // Green mochi
        'spans(G, 14:13-19, 15:12-20, 16:12-20, 17:12-20, 18:13-19)',
        'spans(X, 14:14-16, 15:13-15)',
        // White mochi
        'spans(W, 14:20-26, 15:19-27, 16:19-27, 17:19-27, 18:20-26)',
        'spans(Y, 14:21-23, 15:20-22)',
        // Shadow on plate
        'spans(S, 19:7-24, 20:6-25)',
      ],
      chars: {
        P: { name: 'plate', role: 'belt' },
        Q: { name: 'plate', role: 'belt', tone: 'highlight' },
        A: { name: 'pink_mochi', role: 'body' },
        Z: { name: 'pink_mochi', role: 'body', tone: 'highlight' },
        G: { name: 'green_mochi', role: 'accent' },
        X: { name: 'green_mochi', role: 'accent', tone: 'highlight' },
        W: { name: 'white_mochi', role: 'trim' },
        Y: { name: 'white_mochi', role: 'trim', tone: 'highlight' },
        S: { name: 'shadow', role: 'belt', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        accent: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        belt: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
      },
    },
    // ── 10. Soy Sauce Bottle ──
    {
      id: 'soy_sauce_bottle_32',
      description: 'Small table-top soy sauce dispenser bottle',
      size: 32,
      draw: [
        // Cap
        'spans(C, 6:13-18, 7:12-19)',
        // Neck
        'spans(B, 8:13-18, 9:13-18)',
        // Shoulder
        'spans(B, 10:11-20, 11:10-21)',
        // Body
        'spans(B, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21, 17:10-21, 18:10-21, 19:10-21, 20:10-21)',
        // Shadow
        'spans(D, 18:18-21, 19:18-21, 20:18-21)',
        // Highlight
        'spans(H, 8:13-14, 9:13-14, 10:11-13, 11:10-12, 12:10-12, 13:10-12, 14:10-12)',
        // Label
        'spans(L, 14:12-19, 15:12-19, 16:12-19, 17:12-19)',
        // Label text
        'spans(T, 15:13-18, 16:13-17)',
        // Base
        'spans(F, 21:11-20)',
        // Spout tip
        'pixels(S, 5,15, 5,16)',
      ],
      chars: {
        B: { name: 'bottle', role: 'body' },
        D: { name: 'bottle', role: 'body', tone: 'shadow' },
        H: { name: 'bottle', role: 'body', tone: 'highlight' },
        C: { name: 'cap', role: 'trim' },
        L: { name: 'label', role: 'accent' },
        T: { name: 'text', role: 'accent', tone: 'shadow' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
        S: { name: 'spout', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
        trim: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        accent: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 11. Gyoza Plate ──
    {
      id: 'gyoza_plate_32',
      description: 'Plate of pan-fried gyoza dumplings in a row',
      size: 32,
      draw: [
        // Plate
        'spans(P, 19:5-26, 20:4-27, 21:4-27, 22:5-26)',
        'spans(Q, 19:6-25, 20:5-26)',
        // Gyoza 1
        'spans(G, 13:6-12, 14:5-13, 15:5-13, 16:6-12)',
        'spans(C, 16:7-11)',
        // Gyoza 2
        'spans(G, 13:14-20, 14:13-21, 15:13-21, 16:14-20)',
        'spans(C, 16:15-19)',
        // Gyoza 3
        'spans(G, 13:22-28, 14:21-29, 15:21-29, 16:22-28)',
        'spans(C, 16:23-27)',
        // Crispy bottom
        'spans(B, 17:6-12, 17:14-20, 17:22-28)',
        // Pleat marks
        'pixels(M, 13,8, 13,10, 13,16, 13,18, 13,24, 13,26)',
        // Dipping sauce cup
        'spans(S, 18:13-18, 19:12-19)',
        'spans(D, 18:14-17, 19:13-18)',
      ],
      chars: {
        G: { name: 'gyoza', role: 'body' },
        C: { name: 'crisp', role: 'body', tone: 'shadow' },
        B: { name: 'bottom', role: 'accent' },
        M: { name: 'pleats', role: 'body', tone: 'shadow' },
        P: { name: 'plate', role: 'trim' },
        Q: { name: 'plate', role: 'trim', tone: 'highlight' },
        S: { name: 'sauce_cup', role: 'belt' },
        D: { name: 'sauce', role: 'belt', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        belt: { base: '#deeed6', shadow: '#442434', highlight: '#deeed6' },
      },
    },
    // ── 12. Ramen Egg (Ajitama) ──
    {
      id: 'ramen_egg_32',
      description: 'Marinated soft-boiled ramen egg cut in half',
      size: 32,
      draw: [
        // Egg white (oval)
        'spans(W, 9:11-20, 10:9-22, 11:8-23, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:9-22, 17:10-21, 18:11-20)',
        // Egg white highlight
        'spans(H, 9:12-16, 10:10-13, 11:9-11)',
        // Egg white shadow
        'spans(D, 16:20-22, 17:19-21, 18:18-20)',
        // Yolk (center)
        'spans(Y, 12:12-19, 13:11-20, 14:11-20, 15:12-19)',
        // Yolk highlight (runny center)
        'spans(L, 13:14-17, 14:13-18)',
        // Marinade color rim
        'spans(M, 9:12-19, 10:10-11, 10:21-22, 17:10-11, 17:20-21, 18:12-19)',
        // Shadow beneath
        'spans(S, 19:10-21, 20:12-19)',
      ],
      chars: {
        W: { name: 'white', role: 'body' },
        H: { name: 'white', role: 'body', tone: 'highlight' },
        D: { name: 'white', role: 'body', tone: 'shadow' },
        Y: { name: 'yolk', role: 'accent' },
        L: { name: 'yolk', role: 'accent', tone: 'highlight' },
        M: { name: 'marinade', role: 'trim' },
        S: { name: 'shadow', role: 'belt' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        accent: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        belt: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
      },
    },
    // ── 13. Udon Bowl ──
    {
      id: 'udon_bowl_32',
      description: 'Hot udon noodle bowl with tempura and green onion',
      size: 32,
      draw: [
        // Bowl
        'spans(B, 14:6-25, 15:5-26, 16:5-26, 17:5-26, 18:5-26, 19:6-25, 20:7-24, 21:8-23, 22:10-21)',
        // Shadow
        'spans(D, 20:22-25, 21:20-23, 22:18-21)',
        // Highlight
        'spans(H, 14:7-12, 15:6-8)',
        // Broth
        'spans(S, 14:7-24, 15:6-25)',
        // Thick udon noodles
        'spans(N, 16:9-22, 17:8-23, 18:8-23)',
        // Tempura piece
        'spans(T, 13:18-23, 14:18-23)',
        // Green onion
        'pixels(G, 14,8, 14,10, 14,12, 15,9, 15,11)',
        // Kamaboko (fish cake)
        'spans(K, 14:14-16, 15:14-16)',
        // Rim
        'spans(M, 13:6-25)',
        // Base
        'spans(F, 23:11-20)',
        // Steam
        'pixels(V, 11,12, 10,15, 12,18, 11,21)',
      ],
      chars: {
        B: { name: 'bowl', role: 'body' },
        D: { name: 'bowl', role: 'body', tone: 'shadow' },
        H: { name: 'bowl', role: 'body', tone: 'highlight' },
        S: { name: 'broth', role: 'accent' },
        N: { name: 'noodles', role: 'trim' },
        T: { name: 'tempura', role: 'belt' },
        G: { name: 'onion', role: 'eye' },
        K: { name: 'kamaboko', role: 'accent', tone: 'highlight' },
        M: { name: 'rim', role: 'body', tone: 'shadow' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
        V: { name: 'steam', role: 'trim', tone: 'highlight' },
      },
      colors: {
        body: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        accent: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        belt: { base: '#d27d2c', shadow: '#854c30', highlight: '#dad45e' },
        eye: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
      },
    },
    // ── 14. Taiyaki ──
    {
      id: 'taiyaki_32',
      description: 'Fish-shaped taiyaki pastry with red bean filling',
      size: 32,
      draw: [
        // Body (fish shape)
        'spans(B, 12:7-22, 13:6-23, 14:5-24, 15:5-24, 16:5-24, 17:6-23, 18:7-22)',
        // Tail
        'spans(B, 14:3-5, 15:2-5, 16:3-5, 13:4-6, 17:4-6)',
        // Shadow
        'spans(D, 17:19-23, 18:18-22)',
        // Highlight
        'spans(H, 12:8-14, 13:7-10)',
        // Filling visible (crack)
        'spans(F, 14:12-18, 15:11-19, 16:12-18)',
        // Eye
        'pixels(E, 14,21, 15,21)',
        // Fin marks
        'pixels(M, 12,10, 12,14, 12,18, 18,10, 18,14, 18,18)',
        // Waffle pattern
        'pixels(P, 13,9, 13,12, 13,15, 13,18, 13,21, 17,9, 17,12, 17,15, 17,18, 17,21)',
      ],
      chars: {
        B: { name: 'pastry', role: 'body' },
        D: { name: 'pastry', role: 'body', tone: 'shadow' },
        H: { name: 'pastry', role: 'body', tone: 'highlight' },
        F: { name: 'filling', role: 'accent' },
        E: { name: 'eye', role: 'trim' },
        M: { name: 'fins', role: 'body', tone: 'shadow' },
        P: { name: 'pattern', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        accent: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
        trim: { base: '#140c1c', shadow: '#140c1c', highlight: '#442434' },
      },
    },
    // ── 15. Sake Set ──
    {
      id: 'sake_set_32',
      description: 'Sake bottle (tokkuri) with two cups (ochoko)',
      size: 32,
      draw: [
        // Tokkuri (bottle) - neck
        'spans(B, 7:13-18, 8:12-19, 9:13-18)',
        // Tokkuri body
        'spans(B, 10:11-20, 11:10-21, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:11-20, 17:12-19)',
        // Shadow
        'spans(D, 15:18-21, 16:17-20, 17:16-19)',
        // Highlight
        'spans(H, 7:14-15, 10:11-13, 11:10-12, 12:10-12)',
        // Cup 1 (left)
        'spans(C, 19:4-10, 20:4-10, 21:4-10, 22:5-9)',
        'spans(S, 18:5-9)',
        // Cup 2 (right)
        'spans(C, 19:21-27, 20:21-27, 21:21-27, 22:22-26)',
        'spans(S, 18:22-26)',
        // Sake in cups
        'spans(K, 18:6-8, 18:23-25)',
        // Base
        'spans(F, 18:12-19)',
        // Decorative band
        'spans(G, 13:11-20)',
      ],
      chars: {
        B: { name: 'bottle', role: 'body' },
        D: { name: 'bottle', role: 'body', tone: 'shadow' },
        H: { name: 'bottle', role: 'body', tone: 'highlight' },
        C: { name: 'cup', role: 'trim' },
        S: { name: 'cup_rim', role: 'trim', tone: 'highlight' },
        K: { name: 'sake', role: 'accent' },
        F: { name: 'base', role: 'body', tone: 'shadow' },
        G: { name: 'band', role: 'belt' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        trim: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        accent: { base: '#deeed6', shadow: '#8595a1', highlight: '#deeed6' },
        belt: { base: '#597dce', shadow: '#30346d', highlight: '#6dc2ca' },
      },
    },
    // ── 16. Ramen Noodle Pack ──
    {
      id: 'instant_ramen_pack_32',
      description: 'Instant ramen noodle pack with Japanese text',
      size: 32,
      draw: [
        // Pack body
        'spans(B, 8:7-24, 9:7-24, 10:7-24, 11:7-24, 12:7-24, 13:7-24, 14:7-24, 15:7-24, 16:7-24, 17:7-24, 18:7-24, 19:7-24, 20:7-24, 21:7-24, 22:7-24)',
        // Shadow
        'spans(D, 21:20-24, 22:20-24)',
        // Highlight
        'spans(H, 8:8-12, 9:8-10)',
        // Zigzag top seal
        'spans(S, 7:7-24)',
        'pixels(S, 8:7, 8:24)',
        // Bowl image area
        'spans(I, 12:10-21, 13:10-21, 14:10-21, 15:10-21, 16:10-21)',
        // Noodle illustration
        'spans(N, 13:12-19, 14:11-20, 15:12-19)',
        // Text area (brand)
        'spans(T, 9:10-21, 10:10-21)',
        // Flavor text
        'spans(T, 18:10-21, 19:10-18)',
        // Nutrition bar
        'spans(G, 20:9-22)',
      ],
      chars: {
        B: { name: 'pack', role: 'body' },
        D: { name: 'pack', role: 'body', tone: 'shadow' },
        H: { name: 'pack', role: 'body', tone: 'highlight' },
        S: { name: 'seal', role: 'trim' },
        I: { name: 'image', role: 'accent' },
        N: { name: 'noodle_art', role: 'accent', tone: 'highlight' },
        T: { name: 'text', role: 'belt' },
        G: { name: 'bar', role: 'trim', tone: 'shadow' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        trim: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
        accent: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
        belt: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
      },
    },
    // ── 17. Matcha Mochi ──
    {
      id: 'matcha_mochi_32',
      description: 'Green matcha mochi ball dusted with powder',
      size: 32,
      draw: [
        // Mochi body (round)
        'spans(B, 10:11-20, 11:9-22, 12:8-23, 13:8-23, 14:8-23, 15:8-23, 16:8-23, 17:9-22, 18:10-21, 19:11-20)',
        // Shadow
        'spans(D, 17:19-22, 18:18-21, 19:17-20)',
        // Highlight
        'spans(H, 10:12-16, 11:10-13, 12:9-11)',
        // Powder dusting
        'pixels(P, 10,14, 10,18, 11,11, 11,16, 11,21, 12,13, 12,20, 13,10, 13,22)',
        // Crack showing filling
        'spans(F, 14:14-17, 15:13-18)',
        // Shadow on surface
        'spans(S, 20:12-19, 21:14-17)',
      ],
      chars: {
        B: { name: 'mochi', role: 'body' },
        D: { name: 'mochi', role: 'body', tone: 'shadow' },
        H: { name: 'mochi', role: 'body', tone: 'highlight' },
        P: { name: 'powder', role: 'trim' },
        F: { name: 'filling', role: 'accent' },
        S: { name: 'shadow', role: 'body', tone: 'shadow' },
      },
      colors: {
        body: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        trim: { base: '#757161', shadow: '#346524', highlight: '#8595a1' },
        accent: { base: '#d04648', shadow: '#442434', highlight: '#d2aa99' },
      },
    },
    // ── 18. Dango Skewer ──
    {
      id: 'dango_skewer_32',
      description: 'Three-color dango on a bamboo skewer (pink, white, green)',
      size: 32,
      draw: [
        // Skewer
        'spans(S, 6:15-16, 7:15-16, 8:15-16, 9:15-16, 10:15-16, 11:15-16, 12:15-16, 13:15-16, 14:15-16, 15:15-16, 16:15-16, 17:15-16, 18:15-16, 19:15-16, 20:15-16, 21:15-16, 22:15-16, 23:15-16, 24:15-16)',
        // Pink ball (top)
        'spans(A, 7:12-19, 8:11-20, 9:11-20, 10:11-20, 11:12-19)',
        'spans(Z, 7:13-15, 8:12-14)',
        // White ball (middle)
        'spans(W, 12:12-19, 13:11-20, 14:11-20, 15:11-20, 16:12-19)',
        'spans(Y, 12:13-15, 13:12-14)',
        // Green ball (bottom)
        'spans(G, 17:12-19, 18:11-20, 19:11-20, 20:11-20, 21:12-19)',
        'spans(X, 17:13-15, 18:12-14)',
      ],
      chars: {
        S: { name: 'skewer', role: 'belt' },
        A: { name: 'pink', role: 'body' },
        Z: { name: 'pink', role: 'body', tone: 'highlight' },
        W: { name: 'white', role: 'trim' },
        Y: { name: 'white', role: 'trim', tone: 'highlight' },
        G: { name: 'green', role: 'accent' },
        X: { name: 'green', role: 'accent', tone: 'highlight' },
      },
      colors: {
        body: { base: '#d2aa99', shadow: '#854c30', highlight: '#deeed6' },
        trim: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        accent: { base: '#346524', shadow: '#140c1c', highlight: '#757161' },
        belt: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },
    // ── 19. Curry Rice ──
    {
      id: 'curry_rice_32',
      description: 'Japanese curry rice plate with rice and curry side by side',
      size: 32,
      draw: [
        // Plate
        'spans(P, 20:5-26, 21:4-27, 22:4-27, 23:5-26)',
        'spans(Q, 20:6-25, 21:5-26)',
        // Rice mound (left)
        'spans(R, 13:5-14, 14:4-15, 15:4-15, 16:4-15, 17:4-15, 18:5-14, 19:6-13)',
        'spans(H, 13:6-9, 14:5-7)',
        // Curry (right)
        'spans(C, 13:16-26, 14:15-27, 15:15-27, 16:15-27, 17:15-27, 18:16-26, 19:17-25)',
        // Curry shadow
        'spans(D, 18:22-26, 19:21-25)',
        // Meat chunks in curry
        'pixels(M, 14,19, 14,23, 16,17, 16,21, 16,25, 18,19, 18,23)',
        // Potato chunks
        'pixels(V, 15,18, 15,22, 17,20, 17,24)',
      ],
      chars: {
        P: { name: 'plate', role: 'belt' },
        Q: { name: 'plate', role: 'belt', tone: 'highlight' },
        R: { name: 'rice', role: 'body' },
        H: { name: 'rice', role: 'body', tone: 'highlight' },
        C: { name: 'curry', role: 'accent' },
        D: { name: 'curry', role: 'accent', tone: 'shadow' },
        M: { name: 'meat', role: 'trim' },
        V: { name: 'potato', role: 'eye' },
      },
      colors: {
        body: { base: '#deeed6', shadow: '#d2aa99', highlight: '#deeed6' },
        accent: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
        trim: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        belt: { base: '#8595a1', shadow: '#4e4a4e', highlight: '#deeed6' },
        eye: { base: '#dad45e', shadow: '#d27d2c', highlight: '#deeed6' },
      },
    },
    // ── 20. Dorayaki ──
    {
      id: 'dorayaki_32',
      description: 'Japanese dorayaki pancake sandwich with red bean filling',
      size: 32,
      draw: [
        // Top pancake
        'spans(B, 10:8-23, 11:7-24, 12:7-24, 13:7-24, 14:8-23)',
        // Highlight
        'spans(H, 10:9-15, 11:8-11)',
        // Shadow
        'spans(D, 13:20-24, 14:19-23)',
        // Filling visible (center)
        'spans(F, 15:9-22, 16:8-23)',
        // Bottom pancake
        'spans(B, 17:8-23, 18:7-24, 19:7-24, 20:7-24, 21:8-23)',
        // Bottom shadow
        'spans(D, 20:20-24, 21:19-23)',
        // Bottom highlight
        'spans(H, 17:9-14, 18:8-10)',
        // Shadow on surface
        'spans(S, 22:9-22)',
      ],
      chars: {
        B: { name: 'pancake', role: 'body' },
        H: { name: 'pancake', role: 'body', tone: 'highlight' },
        D: { name: 'pancake', role: 'body', tone: 'shadow' },
        F: { name: 'filling', role: 'accent' },
        S: { name: 'shadow', role: 'trim' },
      },
      colors: {
        body: { base: '#d27d2c', shadow: '#854c30', highlight: '#d2aa99' },
        accent: { base: '#442434', shadow: '#140c1c', highlight: '#854c30' },
        trim: { base: '#854c30', shadow: '#442434', highlight: '#d27d2c' },
      },
    },
  ],
};

export default batch;
