import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { Client } from '../../mcp-server/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import { InMemoryTransport } from '../../mcp-server/node_modules/@modelcontextprotocol/sdk/dist/esm/inMemory.js';
import type { CallToolResult } from '../../mcp-server/node_modules/@modelcontextprotocol/sdk/dist/esm/types.js';
import { afterEach, describe, expect, it } from 'vitest';
import { createMcpServer } from '../../mcp-server/src/server';
import { WALK_RIGHT_BRIEF } from '../../packages/sprite-core/src';
import { makeGoldenWalkDocument } from '../fixtures/sprite-core/fixtures';

const temporaryDirectories: string[] = [];

afterEach(() => {
  while (temporaryDirectories.length > 0) fs.rmSync(temporaryDirectories.pop()!, { recursive: true, force: true });
});

describe('MCP animation protocol', () => {
  it('exposes only the lean schema surface and returns structured/text/image results with actionable errors', async () => {
    const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-protocol-'));
    temporaryDirectories.push(outputDir);
    const walkSourcePath = path.join(outputDir, 'approved-walk-source.dogsprite');
    fs.writeFileSync(walkSourcePath, JSON.stringify(makeGoldenWalkDocument()));
    const server = createMcpServer({ outputDir });
    const client = new Client({ name: 'guile-pix-test-client', version: '1.0.0' });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await server.connect(serverTransport);
    await client.connect(clientTransport);

    try {
      const instructions = client.getInstructions() ?? '';
      expect(instructions).toContain('expectedRevision');
      expect(instructions).toContain('get_animation_review');
      expect(instructions).toContain('validate_animation');
      expect(instructions).toContain('export_animation_bundle');
      expect(instructions).toContain('generate_walk_right');
      expect(instructions).toContain('pending human review');
      for (const removedTool of [
        'draw_smooth_shape', 'get_preview', 'validate_sprite_quality',
        'get_drawing_guide', 'list_templates', 'draw_template',
      ]) {
        expect(instructions).not.toContain(removedTool);
      }

      const listed = await client.listTools();
      const expectedNames = [
        'apply_mask', 'cancel_assist_request', 'claim_assist_request', 'clear_layer', 'complete_assist_request', 'create_clip', 'create_frame', 'create_layer', 'create_sprite', 'define_mask', 'delete_clip', 'delete_frame', 'delete_layer',
        'draw_primitives', 'duplicate_frame', 'duplicate_frame_range', 'export_animation_bundle', 'export_animation_preview', 'fail_assist_request', 'generate_walk_right', 'get_animation_review',
        'get_mask', 'get_palette', 'get_project_snapshot', 'link_cels', 'list_assist_requests', 'load_project', 'map_to_palette', 'redo', 'rename_clip', 'reorder_frames', 'reorder_layers', 'replace_color',
        'save_project', 'select_frame', 'set_active_layer', 'set_clip_metadata', 'set_frame_duration', 'set_pixels', 'set_project_metadata', 'set_project_palette',
        'transform_region', 'undo', 'unlink_cel', 'update_layer', 'validate_animation',
      ];
      expect(listed.tools.map((tool) => tool.name).sort()).toEqual(expectedNames);
      expect(listed.tools.every((tool) => tool.inputSchema && tool.outputSchema)).toBe(true);
      expect(listed.tools.some((tool) => tool.name === 'draw_line')).toBe(false);
      expect(listed.tools.some((tool) => tool.name === 'walk_cycle')).toBe(false);

      const created = await client.callTool({
        name: 'create_sprite',
        arguments: { width: 16, height: 16, name: 'Protocol' },
      }) as CallToolResult;
      const createdData = created.structuredContent as Record<string, unknown>;
      const createdText = created.content.find((item) => item.type === 'text');
      expect(createdText?.type).toBe('text');
      if (createdText?.type === 'text') expect(JSON.parse(createdText.text)).toEqual(createdData);
      const projectId = createdData.projectId as string;

      const malformedPrimitive = await client.callTool({
        name: 'draw_primitives',
        arguments: { projectId, expectedRevision: 0, operations: [{ kind: 'line', color: '#ff0000ff' }] },
      }) as CallToolResult;
      expect(malformedPrimitive.isError).toBe(true);
      const unchanged = await client.callTool({ name: 'get_project_snapshot', arguments: { projectId, includePixels: true } }) as CallToolResult;
      expect((unchanged.structuredContent as Record<string, unknown>).revision).toBe(0);

      const changed = await client.callTool({
        name: 'set_pixels',
        arguments: { projectId, expectedRevision: 0, pixels: [{ x: 2, y: 2, color: '#ff0000' }] },
      }) as CallToolResult;
      expect((changed.structuredContent as Record<string, unknown>).revision).toBe(1);

      const stale = await client.callTool({
        name: 'set_pixels',
        arguments: { projectId, expectedRevision: 0, pixels: [{ x: 3, y: 3, color: '#00ff00' }] },
      }) as CallToolResult;
      expect(stale.isError).toBe(true);
      expect(stale.structuredContent).toEqual(expect.objectContaining({
        ok: false,
        code: 'STALE_REVISION',
        currentRevision: 1,
        correctiveAction: 'Retry with expectedRevision 1.',
      }));

      const review = await client.callTool({
        name: 'get_animation_review',
        arguments: { projectId, scale: 4 },
      }) as CallToolResult;
      const reviewData = review.structuredContent as Record<string, unknown>;
      const reviewText = review.content.find((item) => item.type === 'text');
      if (reviewText?.type === 'text') expect(JSON.parse(reviewText.text)).toEqual(reviewData);
      const image = review.content.find((item) => item.type === 'image');
      expect(image?.type).toBe('image');
      if (image?.type === 'image') {
        expect(image.mimeType).toBe('image/png');
        expect(Buffer.from(image.data, 'base64').subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
      }

      const loadedWalk = await client.callTool({
        name: 'load_project',
        arguments: { filePath: walkSourcePath },
      }) as CallToolResult;
      const walkProjectId = (loadedWalk.structuredContent as Record<string, unknown>).projectId as string;
      const generatedWalk = await client.callTool({
        name: 'generate_walk_right',
        arguments: { projectId: walkProjectId, expectedRevision: 0, brief: WALK_RIGHT_BRIEF },
      }) as CallToolResult;
      expect(generatedWalk.isError).not.toBe(true);
      expect(generatedWalk.structuredContent).toEqual(expect.objectContaining({
        ok: true,
        operation: 'generate_walk_right',
        revision: 1,
        reviewStatus: 'ready',
        artisticApproval: 'pending_human_review',
      }));
      expect(generatedWalk.content.some((item) => item.type === 'image')).toBe(true);
    } finally {
      await client.close();
      await server.close();
    }
  });

  it('works the assist queue end to end: list -> claim -> double-claim rejected -> complete', async () => {
    const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-protocol-assist-'));
    temporaryDirectories.push(outputDir);
    // Seed a request the way the sidecar would (same file store).
    const { AssistRequestStore } = await import('../../mcp-server/src/assistRequests');
    const store = new AssistRequestStore(outputDir);
    const seeded = store.create({
      projectId: 'proj-1',
      projectName: 'Pearl Knight',
      prompt: 'make this circle red',
      target: { kind: 'pin', point: { x: 12, y: 8 } },
      context: { frameId: 'frame-0', layerId: 'layer-1', width: 24, height: 54, revision: 4 },
      mask: { runs: [{ y: 8, xStart: 12, xEnd: 12 }] },
    });

    const server = createMcpServer({ outputDir });
    const client = new Client({ name: 'guile-pix-test-client', version: '1.0.0' });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await server.connect(serverTransport);
    await client.connect(clientTransport);

    try {
      const listed = (await client.callTool({
        name: 'list_assist_requests',
        arguments: { projectId: 'proj-1', status: 'pending' },
      })) as CallToolResult;
      const listedData = listed.structuredContent as { ok: boolean; requests: Array<{ id: string }> };
      expect(listedData.ok).toBe(true);
      expect(listedData.requests.map((entry) => entry.id)).toEqual([seeded.id]);

      const claimed = (await client.callTool({
        name: 'claim_assist_request',
        arguments: { requestId: seeded.id, agent: 'opencode' },
      })) as CallToolResult;
      expect(claimed.isError).not.toBe(true);
      expect(claimed.structuredContent).toEqual(expect.objectContaining({
        ok: true,
        operation: 'claim_assist_request',
      }));

      const doubleClaim = (await client.callTool({
        name: 'claim_assist_request',
        arguments: { requestId: seeded.id, agent: 'codex' },
      })) as CallToolResult;
      expect(doubleClaim.isError).toBe(true);
      expect(doubleClaim.structuredContent).toEqual(expect.objectContaining({
        ok: false,
        code: 'ILLEGAL_TRANSITION',
      }));

      const completed = (await client.callTool({
        name: 'complete_assist_request',
        arguments: { requestId: seeded.id, note: 'recolored 1 px to #ff0000' },
      })) as CallToolResult;
      expect(completed.isError).not.toBe(true);
      expect(completed.structuredContent).toEqual(expect.objectContaining({
        ok: true,
        operation: 'complete_assist_request',
      }));

      const done = store.get(seeded.id);
      expect(done?.status).toBe('done');
      expect(done?.note).toBe('recolored 1 px to #ff0000');
      expect(done?.claimedBy).toBe('opencode');
    } finally {
      await client.close();
      await server.close();
    }
  });
});
