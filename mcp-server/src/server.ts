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
    inputSchema: z.object({ projectId, expectedRevision, outputPath: z.string().min(1).optional() }),
    outputSchema: resultSchema,
  }, (args) => bridge.saveProject(args));

  server.registerTool('export_animation_bundle', {
    description: 'Atomically export the fixed walk_right runtime bundle without changing document revision.',
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
    description: 'Atomically set a batch of pixels on one real frame/layer cel.',
    inputSchema: z.object({
      projectId,
      expectedRevision,
      frameId: frameId.optional(),
      layer: z.string().min(1).optional(),
      pixels: z.array(z.object({
        x: z.number().int(),
        y: z.number().int(),
        color: z.string(),
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
    description: 'Undo only the latest document mutation while advancing revision.',
    inputSchema: z.object({ projectId, expectedRevision }),
    outputSchema: resultSchema,
  }, (args) => bridge.undo(args));

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
    description: 'Persist numbered baseline/current/diff contact sheets and return structured change metadata plus a PNG image.',
    inputSchema: z.object({ projectId, scale: z.number().int().min(2).max(32).optional() }),
    outputSchema: resultSchema,
  }, (args) => bridge.getAnimationReview(args));

  server.registerTool('validate_animation', {
    description: 'Validate the canonical v2 animation without mutating it.',
    inputSchema: z.object({ projectId }),
    outputSchema: resultSchema,
  }, (args) => bridge.validateAnimation(args));

  return server;
}
