#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import { handleCreateSprite } from './tools/createSprite.js';
import { handleSetPixels } from './tools/setPixels.js';
import { handleDrawLine, handleDrawRect, handleFillArea } from './tools/drawPrimitives.js';
import { handleAddLayer, handleSetActiveLayer } from './tools/layers.js';
import { handleSetPalette } from './tools/palette.js';
import { handleGetPreview } from './tools/preview.js';
import { handleGetCanvasState, handleClearLayer } from './tools/canvas.js';
import { handleUndo } from './tools/undo.js';
import { handleSaveProject, handleExportPng, handleLoadProject } from './tools/exportTools.js';
import {
  handleMirrorHorizontal,
  handleMirrorVertical,
  handleShiftPixels,
  handleReplaceColor,
  handleDrawEllipse,
  handleCopyRegion,
  handleFlipLayer,
  handleRotateLayer,
  handleOutlineLayer,
  handleAutoShade,
  handleAutoHighlight,
} from './tools/utilityTools.js';
import { handleDrawTemplate, handleListTemplates } from './tools/templateTools.js';
import { handleGetDrawingGuide } from './tools/drawingGuide.js';
import { handleValidateSpriteQuality } from './tools/qualityValidation.js';
import { handleDrawSmoothShape } from './tools/smoothShape.js';
import { PIXEL_ART_INSTRUCTIONS } from './instructions.js';
import {
  handleDither, handleDitherOver, handleColorRamp,
  handleWalkCycle, handleAntiAlias, handlePaletteReduce,
  handleGradientFill, handleDropShadow,
} from './tools/advancedTools.js';
import {
  handleResizeSprite, handleCropToContent, handleTileRepeat,
  handleColorSwap, handleHsbAdjust, handleInvertColors,
  handleMergeLayers, handleStampLayer, handleAnalyzeSprite,
  handlePaletteExtract,
} from './tools/transformTools.js';


const server = new McpServer(
  { name: 'dogsprite-pixel-art', version: '4.0.0' },
  { instructions: PIXEL_ART_INSTRUCTIONS },
);

// --- Project Management ---

server.tool(
  'create_sprite',
  'Create a new pixel art sprite project in memory. Returns projectId for use in other tools.',
  {
    width: z.number().int().min(1).max(1024).describe('Sprite width in pixels (e.g. 16, 32, 64)'),
    height: z.number().int().min(1).max(1024).describe('Sprite height in pixels (e.g. 16, 32, 64)'),
    name: z.string().optional().describe('Project name (default: "Untitled Sprite")'),
    palette: z.string().optional().describe('Built-in palette preset: db16, db32, pico8, nes, gameboy, endesga32, resurrect64'),
  },
  async (args) => handleCreateSprite(args),
);

server.tool(
  'load_project',
  'Load an existing .dogsprite project file into memory for editing.',
  {
    filePath: z.string().describe('Absolute path to the .dogsprite file'),
  },
  async (args) => handleLoadProject(args),
);

server.tool(
  'save_project',
  'Save project as .dogsprite file (compatible with DogSprite editor).',
  {
    projectId: z.string().describe('Project ID'),
    outputPath: z.string().optional().describe('Output file path (default: output/<name>.dogsprite)'),
  },
  async (args) => handleSaveProject(args),
);

// --- Drawing ---

server.tool(
  'set_pixels',
  'Set individual pixels by coordinates. Main drawing tool for precise pixel placement. Supports batch operations.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    pixels: z.array(z.object({
      x: z.number().int().describe('X coordinate'),
      y: z.number().int().describe('Y coordinate'),
      color: z.string().describe('Hex color (e.g. "#ff0000", "#00ff00ff")'),
    })).describe('Array of pixels to set'),
  },
  async (args) => handleSetPixels(args),
);

server.tool(
  'draw_line',
  'Draw a line between two points using Bresenham algorithm.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    x1: z.number().int().describe('Start X'),
    y1: z.number().int().describe('Start Y'),
    x2: z.number().int().describe('End X'),
    y2: z.number().int().describe('End Y'),
    color: z.string().describe('Hex color'),
    thickness: z.number().int().min(1).max(16).optional().describe('Line thickness (default: 1)'),
  },
  async (args) => handleDrawLine(args),
);

server.tool(
  'draw_rect',
  'Draw a rectangle (outline or filled).',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    x: z.number().int().describe('Top-left X'),
    y: z.number().int().describe('Top-left Y'),
    w: z.number().int().min(1).describe('Width'),
    h: z.number().int().min(1).describe('Height'),
    color: z.string().describe('Hex color'),
    filled: z.boolean().optional().describe('Fill the rectangle (default: false, outline only)'),
  },
  async (args) => handleDrawRect(args),
);

server.tool(
  'fill_area',
  'Flood fill from a point (like paint bucket tool).',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    x: z.number().int().describe('Start X'),
    y: z.number().int().describe('Start Y'),
    color: z.string().describe('Fill hex color'),
  },
  async (args) => handleFillArea(args),
);

server.tool(
  'clear_layer',
  'Clear all pixels on a layer (make fully transparent).',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
  },
  async (args) => handleClearLayer(args),
);

// --- Layers ---

server.tool(
  'add_layer',
  'Add a new empty layer to the project. Common workflow: outline, base_color, shading, highlights.',
  {
    projectId: z.string().describe('Project ID'),
    name: z.string().describe('Layer name (e.g. "outline", "base_color", "shading")'),
    position: z.number().int().min(0).optional().describe('Insert position (0 = bottom). Default: top'),
  },
  async (args) => handleAddLayer(args),
);

server.tool(
  'set_active_layer',
  'Set which layer is the default target for drawing operations.',
  {
    projectId: z.string().describe('Project ID'),
    layerId: z.string().describe('Layer ID to make active'),
  },
  async (args) => handleSetActiveLayer(args),
);

// --- Palette ---

server.tool(
  'set_palette',
  'Set the project color palette. Use a built-in preset or custom hex colors. Available presets: db16, db32, pico8, nes, gameboy, endesga32, resurrect64.',
  {
    projectId: z.string().describe('Project ID'),
    colors: z.array(z.string()).optional().describe('Array of hex colors (e.g. ["#ff0000", "#00ff00"])'),
    preset: z.string().optional().describe('Built-in palette name (e.g. "db16", "pico8")'),
  },
  async (args) => handleSetPalette(args),
);

// --- Visual Feedback ---

server.tool(
  'get_preview',
  'Render the sprite to a PNG file for visual inspection. Use the Read tool on the returned file path to see the image. Essential for iterative quality refinement.',
  {
    projectId: z.string().describe('Project ID'),
    scale: z.number().int().min(1).max(32).optional().describe('Upscale factor (default: 8). 16x16 sprite at 8x = 128x128px preview'),
  },
  async (args) => handleGetPreview(args),
);

server.tool(
  'get_canvas_state',
  'Get a text-grid representation of pixel data. Useful as fallback when visual preview is not available.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
  },
  async (args) => handleGetCanvasState(args),
);

// --- History ---

server.tool(
  'undo',
  'Undo the last drawing operation.',
  {
    projectId: z.string().describe('Project ID'),
  },
  async (args) => handleUndo(args),
);

// --- Export ---

server.tool(
  'export_png',
  'Export the sprite as a PNG file. Use scale=1 for true pixel size, higher for larger output.',
  {
    projectId: z.string().describe('Project ID'),
    scale: z.number().int().min(1).max(32).optional().describe('Upscale factor (default: 1)'),
    filename: z.string().optional().describe('Output filename (default: <projectName>.png)'),
  },
  async (args) => handleExportPng(args),
);

// --- Transform & Utility ---

server.tool(
  'mirror_horizontal',
  'Mirror layer content horizontally. Draw the left half of a character, then mirror left_to_right to create perfect symmetry.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    direction: z.enum(['left_to_right', 'right_to_left']).describe('Which half to copy from'),
  },
  async (args) => handleMirrorHorizontal(args),
);

server.tool(
  'mirror_vertical',
  'Mirror layer content vertically.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    direction: z.enum(['top_to_bottom', 'bottom_to_top']).describe('Which half to copy from'),
  },
  async (args) => handleMirrorVertical(args),
);

server.tool(
  'flip_layer',
  'Flip entire layer content horizontally or vertically (all pixels are rearranged).',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    axis: z.enum(['horizontal', 'vertical']).describe('Flip axis'),
  },
  async (args) => handleFlipLayer(args),
);

server.tool(
  'rotate_layer',
  'Rotate layer content by 90, 180, or 270 degrees. 90/270 require square canvas.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    angle: z.enum(['90', '180', '270']).transform(Number).describe('Rotation angle'),
  },
  async (args) => handleRotateLayer({ ...args, angle: args.angle as 90 | 180 | 270 }),
);

server.tool(
  'shift_pixels',
  'Move all pixels on a layer by (dx, dy). Useful for repositioning or centering content.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    dx: z.number().int().describe('Horizontal shift (positive = right)'),
    dy: z.number().int().describe('Vertical shift (positive = down)'),
    wrap: z.boolean().optional().describe('Wrap pixels around edges (default: false)'),
  },
  async (args) => handleShiftPixels(args),
);

server.tool(
  'replace_color',
  'Replace all pixels of one color with another on a layer. Useful for iterating on color choices.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    fromColor: z.string().describe('Hex color to replace'),
    toColor: z.string().describe('New hex color'),
  },
  async (args) => handleReplaceColor(args),
);

server.tool(
  'draw_ellipse',
  'Draw an ellipse or circle. For a circle, use rx == ry.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    cx: z.number().int().describe('Center X'),
    cy: z.number().int().describe('Center Y'),
    rx: z.number().int().min(1).describe('Horizontal radius'),
    ry: z.number().int().min(1).describe('Vertical radius'),
    color: z.string().describe('Hex color'),
    filled: z.boolean().optional().describe('Fill the ellipse (default: false)'),
  },
  async (args) => handleDrawEllipse(args),
);

server.tool(
  'copy_region',
  'Copy a rectangular region from one layer to another. Useful for duplicating parts of the sprite.',
  {
    projectId: z.string().describe('Project ID'),
    sourceLayer: z.string().describe('Source layer ID'),
    targetLayer: z.string().describe('Target layer ID'),
    sx: z.number().int().describe('Source X'),
    sy: z.number().int().describe('Source Y'),
    sw: z.number().int().min(1).describe('Region width'),
    sh: z.number().int().min(1).describe('Region height'),
    tx: z.number().int().describe('Target X'),
    ty: z.number().int().describe('Target Y'),
  },
  async (args) => handleCopyRegion(args),
);

// --- Auto-generation ---

server.tool(
  'outline_layer',
  'Auto-generate a 1px outline around non-transparent pixels. Draw your shapes on one layer, then auto-outline on another for clean pixel art borders.',
  {
    projectId: z.string().describe('Project ID'),
    sourceLayer: z.string().describe('Layer with the shapes to outline'),
    targetLayer: z.string().describe('Layer where outline pixels will be placed'),
    color: z.string().describe('Outline hex color (typically dark: "#140c1c")'),
  },
  async (args) => handleOutlineLayer(args),
);

server.tool(
  'auto_shade',
  'Auto-generate directional shading on a target layer based on source layer content. Places darkened pixels on edges facing away from the light source.',
  {
    projectId: z.string().describe('Project ID'),
    sourceLayer: z.string().describe('Source layer to analyze'),
    targetLayer: z.string().describe('Layer where shadow pixels will be placed'),
    lightDirection: z.enum(['top_left', 'top_right', 'top', 'left']).describe('Where light comes from'),
    intensity: z.number().int().min(10).max(80).optional().describe('Shadow darkness 10-80% (default: 30)'),
  },
  async (args) => handleAutoShade(args),
);

server.tool(
  'auto_highlight',
  'Auto-generate highlights on a target layer based on source layer content. Places brightened pixels on edges facing the light source.',
  {
    projectId: z.string().describe('Project ID'),
    sourceLayer: z.string().describe('Source layer to analyze'),
    targetLayer: z.string().describe('Layer where highlight pixels will be placed'),
    lightDirection: z.enum(['top_left', 'top_right', 'top', 'left']).describe('Where light comes from'),
    intensity: z.number().int().min(10).max(80).optional().describe('Highlight brightness 10-80% (default: 25)'),
  },
  async (args) => handleAutoHighlight(args),
);

// --- Templates ---

server.tool(
  'draw_template',
  'Generate a complete sprite from a professional template with auto-shading/outline. 3000+ templates in 16x16 and 32x32 across 30+ categories. Use list_templates for full catalog. 32x32 templates include pro_knight_32, pro_mage_32, broadsword_32, clean_sword_32, etc.',
  {
    projectId: z.string().describe('Project ID'),
    template: z.string().describe('Template name. Use list_templates to see all available.'),
    colorScheme: z.string().optional().describe('Color scheme (auto-detected from template name)'),
    colors: z.record(z.string(), z.string()).optional().describe('Override base colors by role: { head: "#hex", body: "#hex", ... }. Roles: head, face, eye, body, arm, hand, belt, leg, boot, accessory'),
    autoOutline: z.boolean().optional().describe('Generate selective outline (default: true)'),
    autoShade: z.boolean().optional().describe('Generate directional shadows with hue-shift (default: true)'),
    autoHighlight: z.boolean().optional().describe('Generate directional highlights with hue-shift (default: true)'),
  },
  async (args) => handleDrawTemplate(args),
);

server.tool(
  'list_templates',
  'List all available sprite templates and color schemes.',
  {
    _dummy: z.string().optional().describe('Unused, pass nothing'),
  },
  async () => handleListTemplates(),
);

// --- Advanced Tools ---

server.tool(
  'dither',
  'Apply dithering pattern between two colors. Patterns: checkerboard, bayer2x2, bayer4x4, horizontal_lines, vertical_lines, diagonal. Essential for color transitions with limited palettes.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    color1: z.string().describe('First hex color'),
    color2: z.string().describe('Second hex color'),
    pattern: z.enum(['checkerboard', 'bayer2x2', 'bayer4x4', 'horizontal_lines', 'vertical_lines', 'diagonal']).describe('Dither pattern'),
    region: z.object({
      x: z.number().int(), y: z.number().int(),
      w: z.number().int().min(1), h: z.number().int().min(1),
    }).optional().describe('Region to dither (default: full canvas)'),
    mix: z.number().int().min(0).max(100).optional().describe('Mix threshold 0-100 for bayer patterns (default: 50)'),
  },
  async (args) => handleDither(args),
);

server.tool(
  'dither_over',
  'Apply dithering blend over existing non-transparent pixels. Mixes a color into existing art using a dither pattern.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    blendColor: z.string().describe('Hex color to blend in'),
    pattern: z.enum(['checkerboard', 'bayer2x2', 'bayer4x4']).describe('Dither pattern'),
    mix: z.number().int().min(0).max(100).optional().describe('Mix threshold 0-100 (default: 50)'),
  },
  async (args) => handleDitherOver(args),
);

server.tool(
  'color_ramp',
  'Generate a professional color ramp (palette gradient) between two colors with optional hue-shifting. Returns hex colors for use in other tools.',
  {
    startColor: z.string().describe('Start hex color (darkest)'),
    endColor: z.string().describe('End hex color (lightest)'),
    steps: z.number().int().min(3).max(16).describe('Number of colors in ramp'),
    hueShift: z.enum(['none', 'warm_highlights', 'cool_shadows', 'full']).optional().describe('Hue shift mode (default: full). Full = cool shadows + warm highlights + saturation peak at midtones'),
  },
  async (args) => handleColorRamp(args),
);

server.tool(
  'walk_cycle',
  'Auto-generate a 4-frame walk cycle from a standing sprite. Creates 4 layers (walk_frame_1-4) with leg shifts and body bob.',
  {
    projectId: z.string().describe('Project ID'),
    sourceLayer: z.string().optional().describe('Layer with standing pose (default: active layer)'),
    amplitude: z.number().int().min(1).max(4).optional().describe('Leg swing in pixels (default: 2)'),
    bob: z.number().int().min(0).max(3).optional().describe('Vertical bounce in pixels (default: 1)'),
  },
  async (args) => handleWalkCycle(args),
);

server.tool(
  'anti_alias',
  'Smooth jagged edges on a layer by adding semi-transparent pixels at corners.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    strength: z.number().int().min(1).max(3).optional().describe('AA strength 1-3 (default: 1)'),
  },
  async (args) => handleAntiAlias(args),
);

server.tool(
  'palette_reduce',
  'Reduce the colors on a layer to N most-used colors. Optional dithering to preserve gradations.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    maxColors: z.number().int().min(2).max(64).describe('Maximum number of colors to keep'),
    dither: z.boolean().optional().describe('Apply dithering during reduction (default: false)'),
  },
  async (args) => handlePaletteReduce(args),
);

server.tool(
  'gradient_fill',
  'Fill a region with a smooth gradient between two colors. Supports horizontal, vertical, and diagonal directions.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    color1: z.string().describe('Start hex color'),
    color2: z.string().describe('End hex color'),
    direction: z.enum(['horizontal', 'vertical', 'diagonal']).describe('Gradient direction'),
    region: z.object({
      x: z.number().int(), y: z.number().int(),
      w: z.number().int().min(1), h: z.number().int().min(1),
    }).optional().describe('Region to fill (default: full canvas)'),
    dither: z.boolean().optional().describe('Use dithering between gradient steps (default: true)'),
  },
  async (args) => handleGradientFill(args),
);

server.tool(
  'drop_shadow',
  'Add a directional drop shadow behind sprite content. Places shadow pixels on a target layer.',
  {
    projectId: z.string().describe('Project ID'),
    sourceLayer: z.string().describe('Source layer to cast shadow from'),
    targetLayer: z.string().describe('Layer where shadow pixels will be placed'),
    offsetX: z.number().int().optional().describe('Horizontal shadow offset (default: 1)'),
    offsetY: z.number().int().optional().describe('Vertical shadow offset (default: 1)'),
    color: z.string().optional().describe('Shadow hex color (default: #140c1c)'),
    opacity: z.number().int().min(0).max(255).optional().describe('Shadow opacity 0-255 (default: 128)'),
  },
  async (args) => handleDropShadow(args),
);

// --- Transform & Analysis Tools ---

server.tool(
  'resize_sprite',
  'Resize the entire sprite (all layers) using nearest-neighbor scaling. Good for upscaling 16x16 to 32x32 or downscaling.',
  {
    projectId: z.string().describe('Project ID'),
    newWidth: z.number().int().min(1).max(256).describe('New width'),
    newHeight: z.number().int().min(1).max(256).describe('New height'),
  },
  async (args) => handleResizeSprite(args),
);

server.tool(
  'crop_to_content',
  'Trim transparent edges from sprite. Shrinks canvas to tightly fit content across all layers.',
  {
    projectId: z.string().describe('Project ID'),
    padding: z.number().int().min(0).max(8).optional().describe('Extra transparent padding pixels (default: 0)'),
  },
  async (args) => handleCropToContent(args),
);

server.tool(
  'tile_repeat',
  'Repeat sprite content in a tiling grid pattern. Useful for previewing tileable textures.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Source layer ID (default: active layer)'),
    repeatX: z.number().int().min(1).max(8).describe('Horizontal repeats'),
    repeatY: z.number().int().min(1).max(8).describe('Vertical repeats'),
    targetLayer: z.string().describe('Target layer name/ID for tiled output'),
  },
  async (args) => handleTileRepeat(args),
);

server.tool(
  'color_swap',
  'Swap two colors on a layer (A becomes B, B becomes A simultaneously).',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    colorA: z.string().describe('First hex color'),
    colorB: z.string().describe('Second hex color'),
  },
  async (args) => handleColorSwap(args),
);

server.tool(
  'hsb_adjust',
  'Adjust hue, saturation, and brightness of all pixels on a layer. Use to recolor sprites or create palette variations.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    hueShift: z.number().int().min(-180).max(180).optional().describe('Hue shift in degrees (-180 to 180)'),
    saturationShift: z.number().int().min(-100).max(100).optional().describe('Saturation shift (-100 to 100)'),
    brightnessShift: z.number().int().min(-100).max(100).optional().describe('Brightness shift (-100 to 100)'),
  },
  async (args) => handleHsbAdjust(args),
);

server.tool(
  'invert_colors',
  'Invert all colors on a layer (RGB negative). Creates eerie/ghost variations.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
  },
  async (args) => handleInvertColors(args),
);

server.tool(
  'merge_layers',
  'Flatten multiple layers into one via alpha compositing. Useful for preparing final export.',
  {
    projectId: z.string().describe('Project ID'),
    layerIds: z.array(z.string()).optional().describe('Layer IDs/names to merge (default: all visible)'),
    targetName: z.string().optional().describe('Name for merged layer (default: "merged")'),
  },
  async (args) => handleMergeLayers(args),
);

server.tool(
  'stamp_layer',
  'Paste one layer onto another at an offset. Useful for combining sprite parts or compositing.',
  {
    projectId: z.string().describe('Project ID'),
    sourceLayer: z.string().describe('Source layer ID/name'),
    targetLayer: z.string().describe('Target layer ID/name'),
    offsetX: z.number().int().optional().describe('Horizontal offset (default: 0)'),
    offsetY: z.number().int().optional().describe('Vertical offset (default: 0)'),
    blendMode: z.enum(['over', 'replace']).optional().describe('Blend mode (default: over)'),
  },
  async (args) => handleStampLayer(args),
);

server.tool(
  'analyze_sprite',
  'Get detailed statistics about a layer: pixel count, bounding box, color breakdown, fill percentage. Useful for quality assessment.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
  },
  async (args) => handleAnalyzeSprite(args),
);

server.tool(
  'palette_extract',
  'Extract all unique colors from a layer, sorted by frequency/hue/lightness. Use to derive color schemes from existing art.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    sortBy: z.enum(['frequency', 'hue', 'lightness']).optional().describe('Sort order (default: frequency)'),
  },
  async (args) => handlePaletteExtract(args),
);

// ============================================================
// === DRAWING KNOWLEDGE TOOLS ===
// ============================================================

server.tool(
  'get_drawing_guide',
  'Get category-specific pixel art drawing instructions with proportions, curve progressions, material hierarchies, and step-by-step workflows. Call BEFORE starting a new sprite for best results.',
  {
    category: z.enum([
      'character', 'creature', 'prop', 'weapon', 'ui_panel',
      'tile', 'food', 'vehicle', 'building', 'effect',
    ]).describe('Sprite category'),
    size: z.union([z.literal(16), z.literal(32)]).optional().describe('Target sprite size (default: 32)'),
  },
  async (args) => handleGetDrawingGuide(args),
);

server.tool(
  'validate_sprite_quality',
  'Run 7 automated quality checks on a sprite: orphan pixels, structural width, density, DB16 palette compliance, color count, shading direction, bounding box utilization. Returns score 0-100 with fix suggestions.',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID to check, or "all" for merged (default: all visible layers merged)'),
    targetCategory: z.enum([
      'character', 'creature', 'prop', 'weapon', 'ui_panel',
      'tile', 'food', 'vehicle', 'building', 'effect',
    ]).optional().describe('Expected sprite category (adjusts density targets)'),
  },
  async (args) => handleValidateSpriteQuality(args),
);

server.tool(
  'draw_smooth_shape',
  'Draw smooth organic shapes using progressive width arrays — better than draw_ellipse for pixel art curves. Each entry defines the width of one row. Common presets: circle_8px=[4,6,8,8,8,8,6,4], head_dome=[4,6,8,8,8,6,4], teardrop=[2,4,6,8,8,6,4,2], bowl=[6,8,10,12,12,10].',
  {
    projectId: z.string().describe('Project ID'),
    layer: z.string().optional().describe('Layer ID (default: active layer)'),
    centerX: z.number().int().describe('Horizontal center of the shape'),
    startY: z.number().int().describe('Y coordinate of the first row'),
    widths: z.array(z.number().int().min(0)).min(1).describe('Width of each row from top to bottom (e.g. [4,6,8,8,6,4] for a dome)'),
    color: z.string().describe('Fill color (hex, e.g. "#854c30")'),
    filled: z.boolean().optional().describe('Fill the shape solid (default: true)'),
    outline: z.boolean().optional().describe('Draw only edge pixels + top/bottom rows (default: false)'),
  },
  async (args) => handleDrawSmoothShape(args),
);

// --- Start server ---

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('DogSprite MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
