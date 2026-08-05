import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { AnimationBridge } from './animationBridge.js';
import { PIXEL_ART_INSTRUCTIONS } from './instructions.js';

const resultSchema = z.object({
  ok: z.boolean(),
  operation: z.string().optional(),
  projectId: z.string().optional(),
  revision: z.number().int().nonnegative().optional(),
  code: z.enum(['STALE_REVISION', 'INVALID_TARGET', 'INVALID_CEL_REF', 'VALIDATION_FAILED']).optional(),
  message: z.string().optional(),
  correctiveAction: z.string().optional(),
}).passthrough();

const projectId = z.string().min(1).describe('Project ID returned by create_sprite or load_project');
const expectedRevision = z.number().int().nonnegative().describe('Current project revision; stale values fail without mutation');
const frameId = z.string().min(1).describe('Stable frame ID');
const point = z.object({ x: z.number().int(), y: z.number().int() });
const mask = z.object({ runs: z.array(z.object({ y: z.number().int(), xStart: z.number().int(), xEnd: z.number().int() })).min(1) }).describe('Inclusive row runs; named masks are session-scoped and are not saved in .dogsprite files');
const hexColor = z.string().regex(/^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/).describe('Hex RGBA color; #00000000 selectively erases pixels');
const primitiveOperation = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('line'), color: hexColor, x1: z.number().int(), y1: z.number().int(), x2: z.number().int(), y2: z.number().int() }),
  z.object({ kind: z.literal('rectangle'), color: hexColor, x1: z.number().int(), y1: z.number().int(), x2: z.number().int(), y2: z.number().int(), filled: z.boolean().optional() }),
  z.object({ kind: z.literal('contour'), color: hexColor, points: z.array(point).min(2) }),
  z.object({ kind: z.literal('flood_fill'), color: hexColor, x: z.number().int(), y: z.number().int() }),
]);

export interface McpServerOptions {
  outputDir?: string;
}

export function createMcpServer(options: McpServerOptions = {}): McpServer {
  const bridge = new AnimationBridge(options);
  const server = new McpServer(
    { name: 'guile-pix-animation', version: '5.0.0' },
    { instructions: PIXEL_ART_INSTRUCTIONS },
  );

  server.registerTool('create_sprite', {
    description: 'Create a canonical revisioned v2 sprite document with one blank frame.',
    inputSchema: z.object({
      width: z.number().int().min(1).max(1024),
      height: z.number().int().min(1).max(1024),
      name: z.string().min(1).optional(),
      palette: z.string().optional(),
    }),
    outputSchema: resultSchema,
  }, (args) => bridge.createSprite(args));

  server.registerTool('load_project', {
    description: 'Load a v1 project through migration or a v2 project losslessly.',
    inputSchema: z.object({ filePath: z.string().min(1) }),
    outputSchema: resultSchema,
  }, (args) => bridge.loadProject(args));

  server.registerTool('save_project', {
    description: 'Atomically save the current v2 project and establish a new review baseline.',
    inputSchema: z.object({ projectId, expectedRevision, outputPath: z.string().min(1).optional(), overwrite: z.boolean().default(false).describe('Must be true to replace an existing file') }),
    outputSchema: resultSchema,
  }, (args) => bridge.saveProject(args));

  server.registerTool('export_animation_bundle', {
    description: 'Atomically export a deterministic generic v2 atlas and manifest without changing document revision; generate_walk_right remains the fixed compatibility recipe.',
    inputSchema: z.object({
      projectId,
      expectedRevision,
      outputPath: z.string().min(1).optional(),
      reviewStatus: z.enum(['draft', 'pending', 'approved', 'rejected']).optional(),
    }),
    outputSchema: resultSchema,
  }, (args) => bridge.exportAnimationBundle(args));

  server.registerTool('generate_walk_right', {
    description: 'Generate the one approved four-frame walk_right using its frozen semantic region recipe; artistic approval remains human-only.',
    inputSchema: z.object({
      projectId,
      expectedRevision,
      brief: z.object({
        sourceArtifactId: z.literal('cornerfall-fighter-right-16'),
        sourcePixelSha256: z.literal('7ca4f48ddf57c8efbf48e9fc40bbac41ebd1802d5c4104715d5082c099fdd3ee'),
        clipName: z.literal('walk_right'),
        facing: z.literal('right'),
        frameCount: z.literal(4),
        durationMs: z.literal(100),
        paletteId: z.literal('db16'),
        pivotPx: z.object({ x: z.literal(8), y: z.literal(15) }),
        groundLineY: z.literal(15),
        rootMotion: z.literal('none'),
      }),
    }),
    outputSchema: resultSchema,
  }, (args) => bridge.generateWalkRight(args));

  server.registerTool('set_pixels', {
    description: 'Atomically set a batch of pixels on one real frame/layer cel. RGBA #00000000 selectively erases.',
    inputSchema: z.object({
      projectId,
      expectedRevision,
      frameId: frameId.optional(),
      layer: z.string().min(1).optional(),
      pixels: z.array(z.object({
        x: z.number().int(),
        y: z.number().int(),
        color: hexColor,
      })).min(1),
    }),
    outputSchema: resultSchema,
  }, (args) => bridge.setPixels(args));

  server.registerTool('clear_layer', {
    description: 'Atomically clear one real frame/layer cel.',
    inputSchema: z.object({ projectId, expectedRevision, frameId: frameId.optional(), layer: z.string().min(1).optional() }),
    outputSchema: resultSchema,
  }, (args) => bridge.clearLayer(args));

  server.registerTool('set_active_layer', {
    description: 'Select the default target layer without incrementing document revision.',
    inputSchema: z.object({ projectId, layerId: z.string().min(1) }),
    outputSchema: resultSchema,
  }, (args) => bridge.setActiveLayer(args));

  server.registerTool('undo', {
    description: 'Undo one step from the bounded labeled history while advancing revision.',
    inputSchema: z.object({ projectId, expectedRevision }),
    outputSchema: resultSchema,
  }, (args) => bridge.undo(args));

  server.registerTool('redo', {
    description: 'Redo one step from the bounded labeled history while advancing revision.',
    inputSchema: z.object({ projectId, expectedRevision }), outputSchema: resultSchema,
  }, (args) => bridge.redo(args));

  server.registerTool('create_frame', {
    description: 'Create one blank frame after an existing frame.',
    inputSchema: z.object({
      projectId,
      expectedRevision,
      frameId,
      afterFrameId: frameId.optional(),
      durationMs: z.number().int().min(1).max(10000),
    }),
    outputSchema: resultSchema,
  }, (args) => bridge.createFrame(args));

  server.registerTool('duplicate_frame', {
    description: 'Duplicate a frame with fresh cels while preserving aliases inside the new frame.',
    inputSchema: z.object({
      projectId,
      expectedRevision,
      sourceFrameId: frameId.optional(),
      frameId,
      afterFrameId: frameId.optional(),
    }),
    outputSchema: resultSchema,
  }, (args) => bridge.duplicateFrame(args));

  server.registerTool('select_frame', {
    description: 'Select the default target frame without incrementing document revision.',
    inputSchema: z.object({ projectId, frameId }),
    outputSchema: resultSchema,
  }, (args) => bridge.selectFrame(args));

  server.registerTool('set_frame_duration', {
    description: 'Atomically set the duration of one real frame.',
    inputSchema: z.object({
      projectId,
      expectedRevision,
      frameId: frameId.optional(),
      durationMs: z.number().int().min(1).max(10000),
    }),
    outputSchema: resultSchema,
  }, (args) => bridge.setFrameDuration(args));

  server.registerTool('get_animation_review', {
    description: 'Persist numbered baseline/current/diff contact sheets under the configured confined output root and return structured grid metadata plus an inline PNG.',
    inputSchema: z.object({ projectId, scale: z.number().int().min(2).max(32).optional(), columns: z.number().int().min(1).max(240).optional() }),
    outputSchema: resultSchema,
  }, (args) => bridge.getAnimationReview(args));

  server.registerTool('validate_animation', {
    description: 'Validate canonical v2 structure and optionally return raw animation diagnostics; never an artistic score or approval.',
    inputSchema: z.object({ projectId, diagnostics: z.object({
      minDurationMs: z.number().int().positive().optional(), maxDurationMs: z.number().int().positive().optional(), includeLoopDiscontinuity: z.boolean().optional(), detectDuplicateFrames: z.boolean().optional(),
      componentRegions: z.array(z.object({ name: z.string().min(1), layerId: z.string().min(1), mask, frameIds: z.array(frameId).optional() })).optional(),
      trackedRegions: z.array(z.object({ name: z.string().min(1), layerId: z.string().min(1), mask, frameIds: z.array(frameId).optional() })).optional(),
      rigidRegions: z.array(z.object({ name: z.string().min(1), layerId: z.string().min(1), mask, frameIds: z.array(frameId).optional() })).optional(),
      phaseSequence: z.object({ expected: z.array(z.string().min(1)).min(1), observed: z.array(z.object({ frameId, phase: z.string().min(1) })) }).optional(),
      movingRegions: z.array(z.object({ fromFrameId: frameId, toFrameId: frameId, mask })).optional(),
      symmetryPairs: z.array(z.object({ frameIdA: frameId, frameIdB: frameId })).optional(),
    }).optional() }),
    outputSchema: resultSchema,
  }, (args) => bridge.validateAnimation(args));

  server.registerTool('export_animation_preview', {
    description: 'Export an exact-duration APNG review artifact and return it inline; artistic approval remains human-owned.',
    inputSchema: z.object({ projectId, expectedRevision, format: z.enum(['apng', 'gif', 'webp']).default('apng').describe('APNG preserves arbitrary millisecond delays; GIF requires centisecond-representable delays; WebP returns unsupported guidance'), scale: z.number().int().min(1).max(32).optional(), background: z.enum(['transparent', 'checkerboard', 'solid']).optional(), backgroundColor: hexColor.optional(), repeat: z.number().int().min(0).optional(), outputPath: z.string().min(1).optional(), overwrite: z.boolean().default(false).describe('Must be true to replace an existing file') }), outputSchema: resultSchema,
  }, (args) => bridge.exportAnimationPreview(args));

  server.registerTool('get_project_snapshot', {
    description: 'Read bounded project metadata and optional row-major RGBA8 RLE pixels without mutation.',
    inputSchema: z.object({ projectId, frameIds: z.array(frameId).optional(), layers: z.array(z.string().min(1)).optional(), region: z.object({ x: z.number().int().nonnegative(), y: z.number().int().nonnegative(), width: z.number().int().positive(), height: z.number().int().positive() }).optional(), includePixels: z.boolean().optional() }), outputSchema: resultSchema,
  }, (args) => bridge.getProjectSnapshot(args));

  server.registerTool('set_project_metadata', {
    description: 'Revisioned pivot, ground, facing, root-motion, and palette identity update.',
    inputSchema: z.object({ projectId, expectedRevision, pivotPx: point.optional(), groundLineY: z.number().int().optional(), facing: z.enum(['left', 'right', 'up', 'down', 'front', 'back', 'none']).optional(), rootMotion: z.union([z.object({ mode: z.literal('none') }), z.object({ mode: z.literal('per_frame'), offsetsPx: z.record(z.string(), point) })]).optional(), paletteId: z.string().min(1).optional(), paletteName: z.string().min(1).optional() }), outputSchema: resultSchema,
  }, (args) => bridge.setProjectMetadata(args));

  server.registerTool('set_clip_metadata', {
    description: 'Revisioned clip name, loop mode, and playback direction update.',
    inputSchema: z.object({ projectId, expectedRevision, clipId: z.string().min(1).optional(), name: z.string().min(1).optional(), loop: z.enum(['linear', 'ping_pong', 'once']).optional(), direction: z.enum(['forward', 'reverse']).optional() }), outputSchema: resultSchema,
  }, (args) => bridge.setClipMetadata(args));

  server.registerTool('delete_frame', { description: 'Delete a frame atomically without leaving orphan cels.', inputSchema: z.object({ projectId, expectedRevision, frameId }), outputSchema: resultSchema }, (args) => bridge.deleteFrame(args));
  server.registerTool('reorder_frames', { description: 'Reorder frames by complete permutation without repainting cels.', inputSchema: z.object({ projectId, expectedRevision, frameIds: z.array(frameId).min(1) }), outputSchema: resultSchema }, (args) => bridge.reorderFrames(args));
  server.registerTool('duplicate_frame_range', { description: 'Atomically duplicate a contiguous frame range with fresh cels.', inputSchema: z.object({ projectId, expectedRevision, sourceFrameIds: z.array(frameId).min(1), targetFrameIds: z.array(frameId).min(1), afterFrameId: frameId.optional() }), outputSchema: resultSchema }, (args) => bridge.duplicateFrameRange(args));
  server.registerTool('create_clip', { description: 'Create and activate a named clip.', inputSchema: z.object({ projectId, expectedRevision, clipId: z.string().min(1), name: z.string().min(1), frameIds: z.array(frameId).min(1), loop: z.enum(['linear', 'ping_pong', 'once']), direction: z.enum(['forward', 'reverse']).optional() }), outputSchema: resultSchema }, (args) => bridge.createClip(args));
  server.registerTool('rename_clip', { description: 'Revision-safely rename a clip with unique runtime identity.', inputSchema: z.object({ projectId, expectedRevision, clipId: z.string().min(1), name: z.string().min(1) }), outputSchema: resultSchema }, (args) => bridge.setClipMetadata(args));
  server.registerTool('delete_clip', { description: 'Delete a non-final clip and select a deterministic active clip.', inputSchema: z.object({ projectId, expectedRevision, clipId: z.string().min(1) }), outputSchema: resultSchema }, (args) => bridge.deleteClip(args));

  server.registerTool('create_layer', { description: 'Create a revisioned transparent or copied layer across every frame.', inputSchema: z.object({ projectId, expectedRevision, layerId: z.string().min(1), name: z.string().min(1), sourceLayerId: z.string().min(1).optional(), preserveLinks: z.boolean().optional() }), outputSchema: resultSchema }, (args) => bridge.createLayer(args));
  server.registerTool('update_layer', { description: 'Revisioned layer metadata update.', inputSchema: z.object({ projectId, expectedRevision, layerId: z.string().min(1), name: z.string().min(1).optional(), visible: z.boolean().optional(), locked: z.boolean().optional(), opacity: z.number().min(0).max(1).optional(), blendMode: z.enum(['normal', 'multiply', 'screen', 'overlay']).optional() }), outputSchema: resultSchema }, (args) => bridge.updateLayer(args));
  server.registerTool('delete_layer', { description: 'Delete a non-final layer and garbage-collect orphan cels.', inputSchema: z.object({ projectId, expectedRevision, layerId: z.string().min(1) }), outputSchema: resultSchema }, (args) => bridge.deleteLayer(args));
  server.registerTool('reorder_layers', { description: 'Reorder layers by complete permutation without changing pixel data.', inputSchema: z.object({ projectId, expectedRevision, layerIds: z.array(z.string().min(1)).min(1) }), outputSchema: resultSchema }, (args) => bridge.reorderLayers(args));
  const celTarget = z.object({ frameId, layerId: z.string().min(1) });
  server.registerTool('link_cels', { description: 'Revision-safely point target frame/layer references at one source cel.', inputSchema: z.object({ projectId, expectedRevision, source: celTarget, targets: z.array(celTarget).min(1) }), outputSchema: resultSchema }, (args) => bridge.linkCels(args));
  server.registerTool('unlink_cel', { description: 'Clone one shared cel and repoint only the requested reference.', inputSchema: z.object({ projectId, expectedRevision, frameId, layerId: z.string().min(1) }), outputSchema: resultSchema }, (args) => bridge.unlinkCel(args));

  server.registerTool('get_palette', { description: 'Read project palette identity and ordered swatches.', inputSchema: z.object({ projectId }), outputSchema: resultSchema }, (args) => bridge.getPalette(args));
  server.registerTool('set_project_palette', { description: 'Set palette identity and swatches without recoloring pixels.', inputSchema: z.object({ projectId, expectedRevision, builtIn: z.string().min(1).optional(), id: z.string().min(1).optional(), name: z.string().min(1).optional(), colors: z.array(z.string().regex(/^#[0-9A-Fa-f]{6}$/)).min(1).optional() }), outputSchema: resultSchema }, (args) => bridge.setProjectPalette(args));
  server.registerTool('replace_color', { description: 'Deterministically replace exact RGBA colors, preserving linked-cel identity.', inputSchema: z.object({ projectId, expectedRevision, source: hexColor, target: hexColor, frameIds: z.array(frameId).optional(), layerIds: z.array(z.string().min(1)).optional(), mask: mask.optional() }), outputSchema: resultSchema }, (args) => bridge.replaceColor(args));
  server.registerTool('map_to_palette', { description: 'Opt-in nearest-palette mapping using squared sRGB distance and palette-order tie break.', inputSchema: z.object({ projectId, expectedRevision, frameIds: z.array(frameId).optional(), layerIds: z.array(z.string().min(1)).optional() }), outputSchema: resultSchema }, (args) => bridge.mapToPalette(args));

  server.registerTool('draw_primitives', { description: 'Draw an ordered atomic batch of deterministic revision-safe primitives; #00000000 erases.', inputSchema: z.object({ projectId, expectedRevision, frameId: frameId.optional(), layer: z.string().min(1).optional(), operations: z.array(primitiveOperation).min(1) }), outputSchema: resultSchema }, (args) => bridge.drawPrimitives(args));
  server.registerTool('define_mask', { description: 'Define or replace a normalized named session mask; masks are not persisted.', inputSchema: z.object({ projectId, name: z.string().min(1), mask }), outputSchema: resultSchema }, (args) => bridge.defineMask(args));
  server.registerTool('get_mask', { description: 'Read a named session mask and its preview bounds.', inputSchema: z.object({ projectId, name: z.string().min(1) }), outputSchema: resultSchema }, (args) => bridge.getMask(args));
  server.registerTool('apply_mask', { description: 'Revision-safely clear, recolor, copy, or move pixels through a session mask.', inputSchema: z.object({ projectId, expectedRevision, name: z.string().min(1), frameId: frameId.optional(), layer: z.string().min(1).optional(), action: z.enum(['clear', 'recolor', 'copy', 'move']), color: hexColor.optional(), translatePx: point.optional() }), outputSchema: resultSchema }, (args) => bridge.applyMask(args));
  server.registerTool('transform_region', { description: 'Transform a masked region about a zero-based pixel pivot with atomic collision, hole, bounds, and mass reporting.', inputSchema: z.object({ projectId, expectedRevision, frameId: frameId.optional(), layer: z.string().min(1).optional(), mask, pivotPx: point, translatePx: point.optional(), rotateDegrees: z.number().finite().optional(), fillMode: z.enum(['transparent', 'source', 'bridge']), preservePixelMass: z.boolean().optional(), anchoredRegions: z.array(z.object({ name: z.string().min(1), mask })).optional() }), outputSchema: resultSchema }, (args) => bridge.transformRegion(args));

  return server;
}
