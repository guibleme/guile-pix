/**
 * Pixel art instructions delivered via MCP instructions field.
 * Sent automatically on connection — every interaction benefits.
 */
export const PIXEL_ART_INSTRUCTIONS = `
# DogSprite Pixel Art — Drawing Rules

## DB16 Palette (ONLY these 16 colors)
#140c1c #442434 #30346d #4e4a4e #854c30 #346524 #d04648 #757161
#597dce #d27d2c #8595a1 #6dc2ca #dad45e #deeed6 #d2aa99 #346524
Floor: RGB >= 12 per channel (never pure black #000000).
Cap: RGB <= 245 per channel (never pure white #ffffff).

## Light Direction
Always top-left. Shadows fall bottom-right, highlights face top-left.

## 5-Value Shading System
Deep shadow: 5-10% area | Shadow: 25-30% | Base: 45-50% | Light: 10-15% | Highlight: 5%
Shadows shift COOL (boost blue, reduce red). Highlights shift WARM (boost red/yellow, cap blue).

## Material Profiles
- Metal: sharp specular highlight (1-2px white dot), high contrast shadow
- Cloth/fabric: soft gradient transitions, low contrast
- Wood: visible grain lines using alternating shadow rows
- Stone: bumpy texture with scattered shadow pixels
- Skin: smooth blending, warm base tones
- Glass/crystal: reflective highlight band, transparent core
- Leather: medium contrast, warm brown ramp

## Character Proportions (32x32)
3-head ratio: head 8-10px tall, torso 8-10px, legs 8-10px.
Minimum structural widths: 3px for limbs/body, 2px for handles/shafts, 2px for fine details.

## Smooth Curves — Progressive Width Arrays
Build organic shapes row by row with width arrays. Max 2px width change between adjacent rows.
- Head dome: [4, 6, 8, 8, 8, 6, 4]
- Circle 8px: [4, 6, 8, 8, 8, 8, 6, 4]
- Teardrop: [2, 4, 6, 8, 8, 6, 4, 2]
- Bowl: [6, 8, 10, 12, 12, 10]
NEVER rely on draw_ellipse for organic shapes — use draw_smooth_shape or manual set_pixels.

## Colored Selout Outlines
NEVER use pure black (#140c1c) for outlines. Use a darkened version of the adjacent surface color.
Warm (slightly brighter) selout on light-facing edges (top-left).
Cool (slightly darker) selout on shadow-facing edges (bottom-right).

## Anti-Patterns (AVOID)
- Orphan pixels: isolated 1px with no same-color orthogonal neighbor
- Pillow shading: symmetric highlight ring around sprite center
- Banding: parallel lines of equal length creating a striped look
- 1px body parts: limbs, handles, or structures thinner than 2px
- Jaggies: staircase edges with inconsistent step sizes

## Recommended Workflow
1. create_sprite → set dimensions (16x16 or 32x32)
2. Plan layers: base_color (bottom), shading, highlights, outline (top)
3. Block in base colors with set_pixels or draw_smooth_shape
4. Add shadows (bottom-right), then highlights (top-left)
5. Add colored selout outline
6. get_preview → inspect → iterate
7. Use validate_sprite_quality for automated quality checks
8. Use get_drawing_guide for category-specific tips before starting

## Template System
Use list_templates to see 3000+ pre-made sprites. Use draw_template to render them instantly.
Templates come in 16x16 and 32x32 sizes with professional DB16 shading.
`.trim();
