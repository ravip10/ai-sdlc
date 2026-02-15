## /ai-sdlc:generate-agents — Rebuild AGENTS.md

Regenerates AGENTS.md as **compressed passive context** (~60 lines, <10KB). This is NOT a status dashboard — status tracking belongs in `.planning/STATE.md`.

AGENTS.md is loaded into every Claude Code session. Keep it minimal: just enough context for Claude to orient without reading every file.

### What AGENTS.md Contains

1. **Stack summary** — 3-5 lines from STACK.md
2. **Architecture summary** — 3-5 lines from ARCHITECTURE.md
3. **Conventions summary** — 3-5 lines from CONVENTIONS.md
4. **Commands** — build/dev/test/lint from package.json
5. **Domain index** — one-line summary per spec (the core of AGENTS.md)
6. **Operational notes** — user-added notes (preserved across regeneration)

### Flow

1. Read STACK.md → compress to 3-5 lines (framework, language, key libs)
2. Read ARCHITECTURE.md → compress to 3-5 lines (structure, patterns)
3. Read CONVENTIONS.md → compress to 3-5 lines (naming, file org, patterns)
4. Read package.json → extract scripts (dev, build, test, lint)
5. Read all specs/jobs/*.md → one-line index entry per file
6. Read all specs/domain/*.md → one-line index entry per file
7. Read design/*.md → add to index if they exist
8. If AGENTS.md exists → **preserve the "Operational Notes" section**
9. Regenerate everything else

### Output Format

```markdown
# AGENTS.md
> Auto-generated. Run /ai-sdlc:generate-agents to rebuild.

## Stack
[3-5 lines compressed from STACK.md]
- Framework: Next.js 14 App Router
- Language: TypeScript strict
- UI: shadcn/ui + Tailwind
- State: React Context + react-hook-form

## Architecture
[3-5 lines compressed from ARCHITECTURE.md]
- src/app/ — pages and API routes
- src/components/ — React components (shadcn-based)
- src/lib/ — utilities and shared logic

## Conventions
[3-5 lines compressed from CONVENTIONS.md]
- Components: PascalCase, one per file
- Hooks: use* prefix, colocated with consumers
- All UI uses shadcn/ui primitives

## Commands
```bash
pnpm dev      # Start dev server
pnpm build    # Production build
pnpm test     # Run tests
pnpm lint     # Lint check
```

## Domain Index

| Spec | Covers |
|------|--------|
| specs/jobs/01-user-completes-form.md | Mobile form submission flow with offline support |
| specs/jobs/02-admin-reviews.md | Dashboard for reviewing and approving submissions |
| specs/domain/validation-rules.md | Field validation, required fields, error messages |
| specs/domain/permissions.md | Role-based access: admin, user, reviewer |
| design/components.md | shadcn component catalog |
| design/flows.md | User journey diagrams |

## Operational Notes
[This section is preserved across regeneration. Add project-specific notes here.]
```

### What NOT to Include

- Status columns (draft/approved/complete) — use STATE.md
- Phase progress tables — use STATE.md
- Current blockers — use STATE.md
- Last session logs — use STATE.md
- File existence checks (yes/no) — just omit if file doesn't exist

### After Generation

Confirm: "AGENTS.md updated: [X] lines, [Y] specs indexed."

If over 80 lines or 12KB, warn: "AGENTS.md is getting large. Consider compressing summaries."
