import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterEach, describe, expect, it } from 'vitest';
import { AnimationBridge } from '../../mcp-server/src/animationBridge';
import { WALK_RIGHT_BRIEF, type WalkRightBrief } from '../../packages/sprite-core/src';
import { makeGoldenWalkDocument } from '../fixtures/sprite-core/fixtures';

const GODOT = '/opt/homebrew/bin/godot';
const temporaryDirectories: string[] = [];

afterEach(() => {
  while (temporaryDirectories.length > 0) fs.rmSync(temporaryDirectories.pop()!, { recursive: true, force: true });
  fs.rmSync(path.resolve('tests/runtime/godot-4.7/.godot'), { recursive: true, force: true });
});

describe('Godot 4.7 unchanged bundle consumer', () => {
  it.skipIf(!fs.existsSync(GODOT))('loads and plays a generic manifest-driven bundle through public APIs', async () => {
    const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-godot-generic-'));
    temporaryDirectories.push(outputDir);
    const bridge = new AnimationBridge({ outputDir });
    const created = await bridge.createSprite({ width: 7, height: 5, name: 'generic-godot', palette: 'gameboy' });
    const projectId = (created.structuredContent as Record<string, unknown>).projectId as string;
    await bridge.setProjectMetadata({ projectId, expectedRevision: 0, groundLineY: 4, facing: 'left', rootMotion: { mode: 'none' } });
    await bridge.setPixels({ projectId, expectedRevision: 1, pixels: [{ x: 1, y: 1, color: '#9bbc0fff' }] });
    await bridge.createFrame({ projectId, expectedRevision: 2, frameId: 'frame-1', durationMs: 170 });
    await bridge.setPixels({ projectId, expectedRevision: 3, frameId: 'frame-1', pixels: [{ x: 2, y: 1, color: '#306230ff' }] });
    const bundlePath = path.join(outputDir, 'generic-bundle');
    const exported = await bridge.exportAnimationBundle({ projectId, expectedRevision: 4, outputPath: bundlePath });
    expect(exported.isError).not.toBe(true);
    const result = spawnSync(GODOT, ['--headless', '--path', path.resolve('tests/runtime/godot-4.7'), '--script', path.resolve('tests/runtime/godot-4.7/verify_generic_bundle.gd'), '--', bundlePath], { encoding: 'utf8' });
    expect(result.status, `${result.stdout}\n${result.stderr}`).toBe(0);
    expect(result.stdout).toContain('GODOT_GENERIC_BUNDLE_OK');
  }, 20_000);

  it.skipIf(!fs.existsSync(GODOT))('loads, validates, builds SpriteFrames, and plays the exported files through public APIs', async () => {
    const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'guile-pix-godot-'));
    temporaryDirectories.push(outputDir);
    const sourcePath = path.join(outputDir, 'golden.dogsprite');
    const bundlePath = path.join(outputDir, 'bundle');
    fs.writeFileSync(sourcePath, JSON.stringify(makeGoldenWalkDocument()));
    const bridge = new AnimationBridge({ outputDir });
    const loaded = await bridge.loadProject({ filePath: sourcePath });
    const projectId = (loaded.structuredContent as Record<string, unknown>).projectId as string;
    const generated = await bridge.generateWalkRight({
      projectId,
      expectedRevision: 0,
      brief: JSON.parse(JSON.stringify(WALK_RIGHT_BRIEF)) as WalkRightBrief,
    });
    expect(generated.isError).not.toBe(true);
    const exported = await bridge.exportAnimationBundle({ projectId, expectedRevision: 1, outputPath: bundlePath });
    expect(exported.isError).not.toBe(true);

    const result = spawnSync(GODOT, [
      '--headless',
      '--path', path.resolve('tests/runtime/godot-4.7'),
      '--script', path.resolve('tests/runtime/godot-4.7/verify_bundle.gd'),
      '--', bundlePath,
    ], { encoding: 'utf8' });
    expect(result.status, `${result.stdout}\n${result.stderr}`).toBe(0);
    expect(result.stdout).toContain('GODOT_BUNDLE_OK');
  }, 20_000);
});
