# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in DogSprite, please report it responsibly:

1. **Email:** Send details to systemcrash92@users.noreply.github.com
2. **Do NOT** open a public GitHub issue for security vulnerabilities

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

I will acknowledge receipt within 48 hours and work on a fix as quickly as possible.

## Scope

DogSprite is a client-side browser application. The main attack surface is:

- **MCP Server** (`mcp-server/`) — local Node.js process for AI-assisted pixel art
- **Content Security Policy** — configured in `next.config.ts`
- **File import/export** — project files, PNG, GIF, spritesheet JSON

## Out of Scope

- The hosted version at dogsprite.org runs on Vercel's infrastructure — Vercel platform issues should be reported to [Vercel](https://vercel.com/security)
- Browser-level vulnerabilities
