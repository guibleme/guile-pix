/**
 * get_drawing_guide tool — returns category-specific pixel art instructions.
 */

interface GuideEntry {
  proportions: string;
  curveProgressions: Record<string, number[]>;
  materialHierarchy: string;
  layerOrder: string[];
  densityTarget: string;
  commonMistakes: string[];
  workflow: string[];
}

const GUIDES: Record<string, GuideEntry> = {
  character: {
    proportions: '32x32: 3-head ratio (head 8-10px, torso 8-10px, legs 8-10px). Head width 6-8px. Shoulders 10-14px wide. Arms 3px wide minimum. 16x16: 2-head ratio (head 5-6px, body+legs 10-11px).',
    curveProgressions: {
      head_dome: [4, 6, 8, 8, 8, 6, 4],
      head_side: [2, 4, 6, 6, 6, 4, 2],
      shoulder: [4, 8, 10, 12, 12],
      torso_taper: [12, 12, 10, 10, 8, 8],
      boot: [6, 8, 8],
    },
    materialHierarchy: 'High contrast: armor/metal. Medium: cloth/leather. Low: skin/hair. Eyes: pure black (#140c1c) for humanoids.',
    layerOrder: ['outline', 'base_color', 'shading', 'highlights', 'details'],
    densityTarget: '50-65% fill (non-transparent pixels / total canvas)',
    commonMistakes: [
      'Arms thinner than 3px — looks like sticks',
      'Head too small relative to body',
      'Legs same width as torso — no taper',
      'Eyes not at vertical center of head',
      'No visible neck or connection between head and body',
      'Symmetry breaking on front-facing characters',
    ],
    workflow: [
      '1. Block head dome using draw_smooth_shape with head curve',
      '2. Add torso below — widest at shoulders, tapering to waist',
      '3. Add legs — each leg 3-4px wide, separated by 1-2px gap',
      '4. Add arms — start at shoulder level, 3px wide',
      '5. Fill base colors per body region (skin, cloth, armor)',
      '6. Add shadows on right side and bottom of each form',
      '7. Add highlights on top-left of each form',
      '8. Draw colored selout outline — darkened surface colors',
      '9. Add face details: eyes at head center, mouth optional at 16x16',
    ],
  },
  creature: {
    proportions: '32x32: flexible — no strict head ratio. Body dominates (60-80% of sprite). Eyes should be large and visible (2-4px). 16x16: simplified silhouette, eyes 1-2px.',
    curveProgressions: {
      round_body: [4, 8, 12, 14, 16, 16, 14, 12, 8, 4],
      slime_blob: [6, 10, 14, 16, 16, 14, 10, 6],
      wing: [2, 4, 6, 8, 8, 6, 4],
      tail_taper: [6, 5, 4, 3, 2, 1],
    },
    materialHierarchy: 'High contrast: scales/shell/carapace. Medium: fur/hide. Low: gel/slime. Eyes: themed colors (NOT black — use creature-specific colors).',
    layerOrder: ['outline', 'base_color', 'pattern_detail', 'shading', 'highlights', 'eyes'],
    densityTarget: '45-60% fill',
    commonMistakes: [
      'Eyes too small to read — use 2x2 minimum for 32x32',
      'No clear silhouette — creature should be identifiable by outline alone',
      'Body too angular — creatures need organic curves',
      'Limbs disconnected from body',
      'Missing ground contact shadow',
    ],
    workflow: [
      '1. Sketch body mass with draw_smooth_shape — largest form first',
      '2. Add limbs/appendages extending from body',
      '3. Place eyes — prominent position, themed colors',
      '4. Add surface details (scales, spots, fur texture)',
      '5. Shade with cool shadows, warm highlights',
      '6. Add colored selout outline',
      '7. Optional: ground shadow below creature feet',
    ],
  },
  prop: {
    proportions: '32x32: object fills 60-80% of canvas. Leave 2-4px padding. 16x16: fills 70-90%. Key features must be readable at small size.',
    curveProgressions: {
      potion_bottle: [2, 2, 4, 6, 8, 10, 10, 10, 10, 8, 6],
      round_gem: [4, 6, 8, 8, 6, 4],
      shield_curve: [6, 10, 12, 14, 14, 14, 12, 10, 6],
      coin: [6, 8, 10, 10, 10, 8, 6],
    },
    materialHierarchy: 'Varies by material. Metal props: high contrast. Wooden props: medium with grain. Glass props: reflective band. Food/organic: low contrast, warm.',
    layerOrder: ['outline', 'base_color', 'material_detail', 'shading', 'highlights'],
    densityTarget: '35-55% fill',
    commonMistakes: [
      'Object too small — wasting canvas space',
      'No material differentiation — everything looks the same',
      'Missing specular highlight on metal/glass surfaces',
      'Floating/disconnected parts',
      'Handle/grip too thin (< 2px)',
    ],
    workflow: [
      '1. Block main shape with draw_smooth_shape or set_pixels',
      '2. Add material-specific base color',
      '3. Add secondary elements (handle, cap, detail)',
      '4. Shade: shadows bottom-right, highlights top-left',
      '5. Add specular highlight for metal/glass (1-2px bright dot)',
      '6. Draw colored selout outline',
    ],
  },
  weapon: {
    proportions: '32x32: blade/head fills top 40-60%, handle fills bottom. Blade width 3-5px for swords, wider for axes. Handle 2px minimum. 16x16: simplified, blade 2-3px.',
    curveProgressions: {
      sword_blade: [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
      axe_head: [2, 4, 6, 8, 8, 8, 6, 4, 2],
      mace_head: [4, 6, 8, 8, 8, 6, 4],
      staff_orb: [4, 6, 8, 8, 6, 4],
    },
    materialHierarchy: 'Blade: highest contrast (sharp specular). Guard/pommel: medium (gold/bronze). Grip: low contrast (leather/wood). Gems: saturated accent.',
    layerOrder: ['outline', 'blade', 'guard', 'grip', 'gem_detail', 'shading', 'highlights'],
    densityTarget: '28-45% fill',
    commonMistakes: [
      'Blade too thin (< 2px) — unreadable',
      'Handle thinner than 2px',
      'No contrast between blade and guard metals',
      'Missing blade highlight edge (specular reflection)',
      'Grip wrapping not visible',
    ],
    workflow: [
      '1. Draw blade shape — straight or curved, 3px+ wide',
      '2. Add crossguard/head — contrasting metal color',
      '3. Add grip — alternating wrap for texture',
      '4. Add pommel/endcap',
      '5. Shade blade: bright edge (top-left), dark spine (bottom-right)',
      '6. Add specular highlight line on blade edge',
      '7. Draw colored selout outline',
    ],
  },
  ui_panel: {
    proportions: '32x32: 2-4px border, inner area 24-28px. Content zones clearly separated. 16x16: 1-2px border, maximize inner space.',
    curveProgressions: {
      rounded_corner: [2, 4],
      frame_top: [4, 8, 12, 14, 14, 14, 14],
    },
    materialHierarchy: 'Frame: high contrast (stone/metal/wood). Background: low contrast (dark fill). Text/icons: medium contrast. Active/selected: accent color.',
    layerOrder: ['background', 'frame', 'dividers', 'content', 'highlights'],
    densityTarget: '40-80% fill',
    commonMistakes: [
      'Frame too thick — wastes content space',
      'No visual separation between content zones',
      'Background too bright — competes with content',
      'Inconsistent corner rounding',
      'Missing inner shadow for depth',
    ],
    workflow: [
      '1. Draw outer frame rectangle (draw_rect)',
      '2. Fill background with dark color',
      '3. Add frame material shading (stone, wood, metal)',
      '4. Add divider lines for content zones',
      '5. Add content elements (icons, text placeholders)',
      '6. Shade frame: lit top-left edge, shadowed bottom-right',
    ],
  },
  tile: {
    proportions: 'Must tile seamlessly — edges must match. 16x16: 1-2 key features. 32x32: room for surface detail. Leave corners simple for tiling.',
    curveProgressions: {
      stone_bump: [2, 3, 4, 3, 2],
      grass_tuft: [1, 2, 3, 2, 1],
    },
    materialHierarchy: 'Ground: low contrast (subtle variation). Wall: medium contrast (brick/stone pattern). Special: accent color for interactive tiles.',
    layerOrder: ['base_fill', 'pattern', 'variation', 'edge_detail'],
    densityTarget: '90-100% fill (tiles should fill the canvas)',
    commonMistakes: [
      'Edges dont match — visible seams when tiled',
      'Too much detail — competes with entities placed on top',
      'Single flat color — no visual interest',
      'Pattern too regular — looks artificial',
      'Strong features at edges that create obvious repeats',
    ],
    workflow: [
      '1. Fill entire canvas with base color (fill_area)',
      '2. Add subtle variation (2-3 shades of base)',
      '3. Add surface pattern (cracks, grass, stones)',
      '4. Ensure edges match: left↔right, top↔bottom',
      '5. Test tiling mentally or with tile_repeat tool',
    ],
  },
  food: {
    proportions: '32x32: item fills 60-80% of canvas. Bowl/plate: use curved rim technique. 16x16: simplified, focus on color identity.',
    curveProgressions: {
      bowl_rim: [6, 8, 10, 12, 12, 10],
      round_fruit: [4, 6, 8, 8, 8, 6, 4],
      bread_loaf: [6, 8, 10, 10, 8],
      plate: [8, 10, 12, 12, 10, 8],
    },
    materialHierarchy: 'Main food: warm, saturated. Container: neutral (ceramic/wood). Garnish: accent color. Steam: low-opacity white.',
    layerOrder: ['container', 'food_base', 'toppings', 'shading', 'highlights', 'steam'],
    densityTarget: '35-55% fill',
    commonMistakes: [
      'Bowl looks flat — back rim must be shorter than front (curved elliptical technique)',
      'Food color too similar to container',
      'No volume — food looks like flat circles',
      'Missing specular on sauces/liquids',
      'Straight horizontal line for bowl back rim — use progressive curve',
    ],
    workflow: [
      '1. Draw container (bowl/plate) with curved rim technique',
      '2. Fill with main food shape inside container',
      '3. Add toppings/garnish on top',
      '4. Shade food: warm shadows, avoid pure black',
      '5. Add specular highlights on glossy surfaces (sauce, fruit skin)',
      '6. Draw colored selout outline',
    ],
  },
  vehicle: {
    proportions: '32x32: fills 70-90% canvas. Wheels 4-6px diameter. Body longest dimension 20-28px. 16x16: simplified to key silhouette.',
    curveProgressions: {
      wheel: [4, 6, 6, 6, 4],
      car_roof: [4, 8, 12, 14, 14, 12, 8],
      ship_hull: [4, 6, 8, 10, 12, 14, 14, 14, 12],
    },
    materialHierarchy: 'Body: medium contrast (painted metal). Windows: reflective/dark. Wheels: high contrast (rubber/metal). Trim: accent.',
    layerOrder: ['outline', 'body', 'windows', 'wheels', 'trim', 'shading', 'highlights'],
    densityTarget: '45-65% fill',
    commonMistakes: [
      'Wheels too small or not round',
      'No window reflection highlight',
      'Body too blocky — vehicles need curves',
      'Axle/wheel not touching ground line',
    ],
    workflow: [
      '1. Block body silhouette with draw_smooth_shape',
      '2. Add wheel wells and wheels',
      '3. Add windows (dark with highlight band)',
      '4. Add details: headlights, bumper, trim',
      '5. Shade body panels with metallic shading',
      '6. Draw colored selout outline',
    ],
  },
  building: {
    proportions: '32x32: fills 80-95% canvas. 3/4 or front view. Door 4-6px wide, windows 3-4px. Roof occupies top 30-40%. 16x16: simplified facade.',
    curveProgressions: {
      dome_roof: [4, 8, 12, 14, 14, 12, 8],
      arch: [2, 4, 6, 6, 4, 2],
      tower: [6, 6, 6, 6, 6, 8, 8],
    },
    materialHierarchy: 'Walls: medium contrast (stone/brick/wood). Roof: different material than walls. Door/windows: dark recesses. Trim: accent color.',
    layerOrder: ['wall', 'roof', 'windows', 'door', 'trim', 'shading', 'details'],
    densityTarget: '55-80% fill',
    commonMistakes: [
      'No perspective consistency (mixing top-down and side view)',
      'Door too small to read',
      'Windows not aligned or evenly spaced',
      'Roof same color as walls — no material separation',
      'No ground shadow or base',
    ],
    workflow: [
      '1. Draw wall rectangle (main structure)',
      '2. Add roof on top — different color/material',
      '3. Add door at ground level, centered or offset',
      '4. Add windows — evenly spaced, recessed (dark)',
      '5. Add architectural details (chimney, signs, trim)',
      '6. Shade walls and roof from top-left light',
      '7. Draw colored selout outline',
    ],
  },
  effect: {
    proportions: '32x32: effect fills 50-80% canvas. Radiates from center or source point. 16x16: simplified to core shape + glow.',
    curveProgressions: {
      explosion: [2, 6, 10, 14, 16, 14, 10, 6, 2],
      flame: [2, 4, 6, 8, 6, 4, 2],
      sparkle: [1, 3, 5, 3, 1],
      smoke: [4, 8, 10, 12, 10, 8, 4],
    },
    materialHierarchy: 'Core: brightest, most saturated. Mid: medium saturation. Outer: desaturated, fading. Use warm colors for fire/explosion, cool for ice/magic.',
    layerOrder: ['outer_glow', 'mid_ring', 'core', 'sparks', 'highlights'],
    densityTarget: '25-50% fill (effects are often sparse)',
    commonMistakes: [
      'Too dense — effects should breathe, have transparency',
      'No color temperature gradient (hot core → cool edges)',
      'Static shape — effects need implied motion',
      'Using pure white for brightest point (cap at #deeed6)',
      'No directional energy — fire should point up, explosions radiate out',
    ],
    workflow: [
      '1. Define core shape (brightest point)',
      '2. Add mid-ring around core (medium brightness)',
      '3. Add outer particles/wisps (scattered, low opacity)',
      '4. Color gradient: saturated center → desaturated edges',
      '5. Add sparks or floating particles for energy',
      '6. Keep outline minimal — effects often have no hard outline',
    ],
  },
};

export function handleGetDrawingGuide(args: {
  category: string;
  size?: number;
}) {
  const guide = GUIDES[args.category];
  if (!guide) {
    const available = Object.keys(GUIDES).join(', ');
    return {
      content: [{
        type: 'text' as const,
        text: `Unknown category "${args.category}". Available: ${available}`,
      }],
    };
  }

  const size = args.size ?? 32;
  const sizeNote = size === 16
    ? '\n\nNote: At 16x16, simplify all proportions. Reduce detail — focus on silhouette readability and color identity.'
    : '';

  const curvesStr = Object.entries(guide.curveProgressions)
    .map(([name, arr]) => `  ${name}: [${arr.join(', ')}]`)
    .join('\n');

  const text = [
    `# Drawing Guide: ${args.category} (${size}x${size})`,
    '',
    `## Proportions`,
    guide.proportions,
    '',
    `## Curve Progressions (width arrays for draw_smooth_shape)`,
    curvesStr,
    '',
    `## Material Hierarchy`,
    guide.materialHierarchy,
    '',
    `## Recommended Layer Order`,
    guide.layerOrder.map((l, i) => `  ${i + 1}. ${l}`).join('\n'),
    '',
    `## Density Target`,
    guide.densityTarget,
    '',
    `## Common Mistakes to Avoid`,
    guide.commonMistakes.map(m => `  - ${m}`).join('\n'),
    '',
    `## Step-by-Step Workflow`,
    guide.workflow.join('\n'),
    sizeNote,
  ].join('\n');

  return {
    content: [{ type: 'text' as const, text }],
  };
}
