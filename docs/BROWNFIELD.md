# Brownfield — Using AI-SDLC with Existing Codebases

## Setup

```bash
# 1. Copy AI-SDLC files into your existing project
cp -r ai-sdlc/.claude .
cp -r ai-sdlc/specs .
cp -r ai-sdlc/design .
cp -r ai-sdlc/.planning .
cp ai-sdlc/CLAUDE.md .

# 2. Launch Claude Code
claude

# 3. Map your codebase (generates STACK.md, ARCHITECTURE.md, CONVENTIONS.md)
/ai-sdlc:map-codebase

# 4. Initialize project (knows your codebase, focuses questions on what you're adding)
/ai-sdlc:init
```

## What's Different from Greenfield

1. **map-codebase runs first** — analyzes your existing code and generates the engineer territory files automatically
2. **Init questions focus on additions** — "What are you building on top of this?" not "What tech stack?"
3. **CONVENTIONS.md is extracted, not invented** — the system learns your patterns from existing code
4. **Plans reference existing code** — tasks say "modify src/components/Header.tsx" not "create Header component"
5. **Verification checks for regressions** — existing tests must still pass after each task

## AGENTS.md for Brownfield

The brownfield AGENTS.md includes a codebase context section:

```markdown
## Codebase Context
| File | Summary |
|------|---------|
| STACK.md | Next.js 14, TypeScript, Prisma, PostgreSQL |
| ARCHITECTURE.md | App Router, server components, tRPC API layer |
| CONVENTIONS.md | Named exports, server-first, Tailwind only, Vitest |
```

This gives every agent instant awareness of what exists before they start planning or executing.
