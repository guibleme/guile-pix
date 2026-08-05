<h1 align="center">DogSprite</h1>

<p align="center">
  <strong>Free, offline, ultra-lightweight pixel art editor for artists & game devs.</strong><br>
  Works in your browser. No accounts. No cloud. No install. Just pixels.
</p>

<p align="center">
  <a href="https://dogsprite.org">dogsprite.org</a> &nbsp;|&nbsp;
  <a href="https://buymeacoffee.com/pmseto">Buy Me a Coffee</a> &nbsp;|&nbsp;
  <a href="https://setodev.com">Author</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" />
  <img src="https://img.shields.io/badge/offline-100%25-blue" alt="100% Offline" />
  <img src="https://img.shields.io/badge/cost-free-brightgreen" alt="Free" />
  <img src="https://img.shields.io/badge/platform-browser-orange" alt="Browser" />
</p>

---

## What is DogSprite?

DogSprite is a **100% free, offline pixel art sprite editor** that runs entirely in your browser. No servers, no subscriptions, no data collection. Your art stays on your machine.

> **Privacy note:** The hosted version at dogsprite.org includes [Vercel Analytics](https://vercel.com/analytics) for anonymous page view counts (no cookies, no personal data). All drawing, saving, and exporting happens 100% locally — no art data ever leaves your browser.

Built for pixel artists, indie game developers, and anyone who wants a fast, focused tool without the bloat.

## Features

- **Multi-tab workspace** — work on multiple sprites like browser tabs
- **Full drawing toolkit** — brush, eraser, fill, line, rect, color picker
- **Pixel-perfect mode** — clean corners, no staircase artifacts
- **Stroke stabilizer** — smooth freehand lines with adjustable smoothing
- **Symmetry painting** — horizontal, vertical, or both axes with draggable guides
- **Ghost frames (onion skin)** — see past/future frames while animating
- **Pressure-sensitive** — full support for drawing tablets (Wacom, iPad, etc.)
- **Layer system** — add, duplicate, merge, reorder, opacity, visibility
- **Animation timeline** — frame management, linked cels, adjustable durations
- **Multi-format export** — PNG, GIF, spritesheets with Aseprite-compatible JSON
- **Session recovery** — automatic snapshots, never lose your work
- **Import/Export** — .dogsprite projects, Aseprite/LibreSprite spritesheet import
- **3,500+ sprite templates** — built-in library with live color customization
- **Dark & light themes**
- **Keyboard shortcuts** — full shortcut system with in-app reference
- **Multi-language** — English, Spanish, Japanese

## Quick Start

### Use it online (recommended)

Go to **[dogsprite.org](https://dogsprite.org)** — no install needed.

### Run locally

```bash
git clone https://github.com/systemcrash92/DogSprite.git
cd DogSprite
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 | App framework |
| React 19 | UI components |
| TypeScript | Type safety |
| Zustand v5 | State management |
| HTML5 Canvas | Pixel rendering |
| TailwindCSS v4 | Styling |
| gifenc | Client-side GIF encoding |

Zero external APIs. Everything runs in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components (canvas, editor, tools, palette, layers, timeline)
├── stores/           # Zustand stores (project, canvas, tool, layer, timeline, palette, history, UI)
├── lib/              # Core logic (canvas engine, drawing tools, export, AI mock)
├── hooks/            # Custom hooks (shortcuts, animation, autosave)
├── types/            # TypeScript interfaces
└── constants/        # Configuration constants

packages/sprite-core/ # Shared v2 document, compositing, hashing, generation, and bundle logic
mcp-server/           # Revisioned MCP sprite-animation bridge
.claude/              # Claude Code agent architecture (agents, skills, rules)
```

## MCP Sprite Animation Bridge

DogSprite includes a local **MCP (Model Context Protocol) server** for deterministic, revisioned sprite-animation work. Its tools share the same canonical v2 document, compositing, hashing, validation, and export rules.

It runs over local Node/stdin with no account, API key, cloud model, or art upload.

### What is MCP?

[MCP](https://modelcontextprotocol.io) lets compatible agents call local tools. This server can:

- edit real frames and cels with stale-safe `expectedRevision` mutations;
- create, reorder, duplicate, select, time, validate, undo, and redo animation frames;
- return numbered baseline/current/diff contact sheets as structured data and PNG content;
- load v1 projects, save canonical v2 projects, and export deterministic PNG/JSON bundles;
- generate one source-locked four-frame `walk_right` clip for the approved Cornerfall fixture.

Structural readiness is automated. Artistic approval remains human-owned.

### Quick Start

1. **Install dependencies:**
   ```bash
   cd mcp-server
   npm install
   npm run build
   ```

2. **Configure your AI tool** — add this to your MCP config (e.g. `.mcp.json`, Claude Desktop settings, or Cursor config):
   ```json
   {
     "mcpServers": {
      "guile-pix-animation": {
         "command": "node",
        "args": ["/absolute/path/to/guile-pix/mcp-server/dist/index.js"]
       }
     }
   }
   ```

3. **Use the revisioned workflow:** load or create a project, mutate with the returned revision, validate, request review, then save or export.

### MCP Tools

| Group | Tools | What they do |
|-------|-------|-------------|
| **Project** | `create_sprite`, `load_project`, `save_project`, `get_project_snapshot`, `set_project_metadata` | Inspect and persist canonical v2 projects and production metadata |
| **Pixels** | `set_pixels`, `clear_layer`, `draw_primitives`, `transform_region`, mask and palette tools | Deterministic revision-safe authoring; `#00000000` erases |
| **Frames** | frame, clip, layer, and linked-cel operations | Manage ordered animation structure without repainting |
| **History** | `undo`, `redo` | Traverse bounded labeled history while revisions remain monotonic |
| **Review** | `validate_animation`, `get_animation_review`, `export_animation_preview` | Return declared raw diagnostics, compact grids, exact APNG, or centisecond-exact GIF; WebP fails explicitly |
| **Runtime** | `export_animation_bundle` | Write generic deterministic atlas/manifest bundles with hashes and Godot hints |
| **Generation** | `generate_walk_right` | Run the approved source-locked semantic recipe |

Named masks are session-scoped, output stays under the configured server root, and artistic/runtime approval remains human-owned. Template rendering and artistic scoring are intentionally not part of the revisioned animation bridge.

For a copy-paste production-agent prompt, exact smoke fixture, and current capability boundaries, see [Guile Pix Agent Handoff](docs/agent-animation-handoff.md).

## Contributing

Contributions are welcome! Whether it's bug fixes, new features, translations, or template designs.

1. Fork the repo
2. Create your branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push and open a Pull Request

Please keep it friendly, keep it local-first.

## Support the Project

DogSprite is **free and open source**. If it helps your workflow, consider supporting development:

<a href="https://buymeacoffee.com/pmseto">
  <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee" />
</a>

## Credits

**Created by [SETO](https://setodev.com)**

- Website: [setodev.com](https://setodev.com)
- Editor: [dogsprite.org](https://dogsprite.org)

## License

[MIT License](LICENSE) — free for personal and commercial use.

---

<p align="center">
  <em>Made with pixels and passion for the game dev community</em>
</p>
