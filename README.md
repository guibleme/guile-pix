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

mcp-server/           # MCP pixel art server (template generation pipeline)
.claude/              # Claude Code agent architecture (agents, skills, rules)
```

## MCP Pixel Art Server

DogSprite includes a built-in **MCP (Model Context Protocol) server** — an AI-powered pixel art toolkit with **3,900+ hand-crafted sprite templates** and **46 drawing tools**.

### What is MCP?

[MCP](https://modelcontextprotocol.io) is an open protocol that lets AI assistants (like Claude, Cursor, Windsurf, etc.) use external tools. DogSprite's MCP server gives any MCP-compatible AI the ability to:

- **Draw pixel art** — create sprites, set pixels, draw lines/rects/ellipses, fill areas
- **Use 3,900+ templates** — pre-made sprites in DB16 palette (characters, items, UI, environments, effects, vehicles, and more)
- **Layer management** — add/merge/reorder layers, set opacity
- **Auto-shading** — material-aware shadows and highlights
- **Export** — PNG output of finished sprites

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
       "dogsprite-pixel-art": {
         "command": "node",
         "args": ["mcp-server/dist/index.js"]
       }
     }
   }
   ```

3. **Ask your AI to draw** — example prompts:
   - "Draw a fire sword template" → renders `fire_sword_16` instantly
   - "List all food templates" → shows 140+ food/consumable sprites
   - "Create a 16x16 health potion with custom colors"
   - "Create a 32x32 dungeon torch with shading"

### Template Categories

| Category | Count | Size |
|----------|-------|------|
| Characters & NPCs | 100+ | 16x16 |
| Food & Consumables | 140+ | 16x16 |
| Buildings & Structures | 100+ | 16x16 |
| UI Elements | 100+ | 16x16 |
| Effects & Particles | 100+ | 16x16 |
| Vehicles & Transport | 100+ | 16x16 |
| Modern & Retro Tech | 200+ | 16x16 |
| Dungeon Creatures | 100+ | 32x32 |
| RPG UI Kit | 100+ | 32x32 |
| ...and 25+ more categories | | |

All templates use the **DB16 palette** (16 colors) with professional colored selout outlines and material-aware shading.

### MCP Tools (46 commands)

The server exposes 46 tools grouped by category:

| Group | Tools | What they do |
|-------|-------|-------------|
| **Canvas** | `create_sprite`, `resize_sprite`, `crop_to_content` | Create and manage sprites |
| **Drawing** | `set_pixels`, `draw_line`, `draw_rect`, `draw_ellipse`, `fill_area`, `draw_smooth_shape` | Place pixels and shapes |
| **Layers** | `add_layer`, `set_active_layer`, `merge_layers`, `clear_layer` | Layer management |
| **Colors** | `set_palette`, `replace_color`, `color_swap`, `color_ramp`, `hsb_adjust`, `invert_colors` | Color operations |
| **Transform** | `mirror_horizontal`, `mirror_vertical`, `flip_layer`, `rotate_layer`, `shift_pixels`, `copy_region` | Transform pixels |
| **Effects** | `auto_shade`, `auto_highlight`, `outline_layer`, `drop_shadow`, `dither`, `anti_alias`, `gradient_fill` | Shading and effects |
| **Templates** | `draw_template`, `list_templates` | Browse and render 3,900+ templates |
| **Export** | `export_png`, `get_preview`, `get_canvas_state`, `analyze_sprite` | Preview and export |
| **Quality** | `validate_sprite_quality`, `get_drawing_guide`, `palette_extract`, `palette_reduce` | Quality checks |

### Creating Your Own Templates

The template generator converts ASCII grids or DSL draw commands into TypeScript template files:

```bash
cd mcp-server
npx tsx scripts/templateGenerator.ts scripts/batches/my_batch.ts 2>/dev/null > src/templates/myTemplates.ts
```

See `memory/template-quality-guide.md` for the full quality guide and `.claude/README.md` for the AI agent architecture.

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
