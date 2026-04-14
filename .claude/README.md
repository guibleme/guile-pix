# DogSprite — Claude Code Agent Architecture

This project uses [Claude Code](https://claude.com/claude-code) with a structured agent architecture for AI-assisted development. No extra dependencies needed — everything runs natively within Claude Code.

## Quick Start

1. Install [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code)
2. Clone this repo and `cd` into it
3. Run `claude` — the agents, skills, and rules activate automatically

## Structure

```
.claude/
├── agents/          # 3 specialized AI agents
├── skills/          # 3 slash commands
├── rules/           # 3 path-scoped coding standards
├── hooks/           # Build validation scripts
└── settings.local.json
```

## Agents

Agents are specialized AI personas you can invoke for domain-specific tasks. Each has its own model, tools, and context.

| Agent | Model | Purpose | Invoke with |
|-------|-------|---------|-------------|
| `template-artist` | Haiku | Generate pixel art template batches (20 templates at a time) | `@template-artist` |
| `editor-architect` | Sonnet | Architectural consultation for the Next.js/React editor | `@editor-architect` |
| `qa-validator` | Haiku | Run build, gallery, bundle, and typecheck validation | `@qa-validator` |

### How agents work

Each agent is a `.md` file in `.claude/agents/` with YAML frontmatter:

```yaml
---
name: template-artist
description: "What this agent does"
tools: Read, Glob, Grep, Write, Edit, Bash   # allowed tools
model: haiku                                   # haiku, sonnet, or opus
maxTurns: 25                                   # max conversation turns
---

# Agent Name

System prompt and instructions go here...
```

**Model selection guide:**
- **Haiku** — fast and cheap, for repetitive/mechanical tasks (batch generation, validation)
- **Sonnet** — balanced, for analysis and implementation decisions
- **Opus** — most capable, for complex multi-system reasoning (not used here to keep costs low)

### Creating your own agent

1. Create a `.md` file in `.claude/agents/`
2. Add YAML frontmatter with `name`, `description`, `tools`, `model`, `maxTurns`
3. Write the system prompt below the frontmatter
4. The agent is immediately available — no restart needed

## Skills (Slash Commands)

Skills are reusable workflows you trigger with `/command-name` in the Claude Code chat.

| Command | What it does |
|---------|-------------|
| `/batch` | Generate 20 pixel art templates for the lowest-count category |
| `/batch [category]` | Generate 20 templates for a specific category |
| `/export-bundles` | Rebuild MCP server + export gallery + export itch.io bundles |
| `/quality-check` | Run full validation (build, gallery, bundles, typecheck, spot-check) |

### How skills work

Each skill is a directory in `.claude/skills/` with a `prompt.md` file:

```
.claude/skills/my-skill/
└── prompt.md
```

The `prompt.md` has YAML frontmatter + instructions:

```yaml
---
name: my-skill
description: "One-line description shown in /help"
user-invocable: true
---

# /my-skill — Title

Step-by-step instructions for what Claude should do when this skill is invoked...
```

### Creating your own skill

1. Create a directory in `.claude/skills/your-skill-name/`
2. Add a `prompt.md` with frontmatter (`name`, `description`, `user-invocable: true`)
3. Write clear step-by-step instructions
4. Use it immediately with `/your-skill-name`

## Rules (Path-Scoped Standards)

Rules automatically inject coding standards when you edit files matching specific glob patterns. You don't invoke them — they activate on their own.

| Rule file | Applies to | What it enforces |
|-----------|-----------|-----------------|
| `templates.md` | `mcp-server/src/templates/**/*.ts` | DB16 palette, 3-6 roles, colored selout, grid dimensions |
| `editor-components.md` | `src/components/**/*.tsx` | 'use client' directive, Zustand patterns, accessibility, dark theme |
| `stores.md` | `src/stores/**/*.ts` | Zustand v5 conventions, drawing data flow, persistence keys |

### How rules work

Each rule is a `.md` file in `.claude/rules/` with a `globs` frontmatter:

```yaml
---
globs: src/components/**/*.tsx
---

# Component Rules

- All components must use 'use client' directive
- Use useCallback with store.getState() for performance
- ...
```

When Claude edits any file matching the glob, these rules are included in its context automatically.

### Creating your own rule

1. Create a `.md` file in `.claude/rules/`
2. Add `globs` frontmatter with the file pattern
3. Write your coding standards below
4. Standards apply automatically — no configuration needed

## Hooks

Hooks are shell scripts that run on specific events (post-edit, pre-commit, etc.).

| Hook | Trigger | What it does |
|------|---------|-------------|
| `validate-template-build.sh` | After editing template files | Runs TypeScript check on MCP server |

### How hooks work

Hooks live in `.claude/hooks/` and are registered in `settings.json` (or `settings.local.json`). They run automatically on the configured event.

## Example: Adding a New Agent for Your Fork

Say you want a `sprite-animator` agent that creates walk cycle animations:

```yaml
# .claude/agents/sprite-animator.md
---
name: sprite-animator
description: "Creates walk cycle and idle animation frame templates."
tools: Read, Glob, Grep, Write, Edit, Bash
model: haiku
maxTurns: 20
---

# Sprite Animator

You create animation frame templates for the DogSprite MCP pipeline.

## Rules
- Each animation needs 4-8 frames
- Use the existing character skeleton from humanoid16.ts
- Maintain consistent proportions across frames
- ...
```

That's it — `@sprite-animator` is now available in your Claude Code session.

## Tips

- **Agents are cheap with Haiku** — use them for repetitive tasks like batch generation or validation
- **Rules are free** — they just add context, no API cost
- **Skills save time** — encode your common multi-step workflows as slash commands
- **Keep agents focused** — 3-5 well-defined agents beat 49 generic ones
- **Model matters**: Haiku for mechanical tasks, Sonnet for thinking, Opus for complex reasoning
