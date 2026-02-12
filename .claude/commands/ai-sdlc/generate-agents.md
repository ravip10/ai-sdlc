## /ai-sdlc:generate-agents — Rebuild AGENTS.md

Regenerates the AGENTS.md project map from current state. Run after any spec, design, or planning changes.

### Flow

1. Read all files in `specs/jobs/`, `specs/domain/`, `design/`
2. Read `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`
3. Read `STACK.md`, `ARCHITECTURE.md`, `CONVENTIONS.md` (if they exist)
4. Read `.planning/STATE.md` (if it exists)
5. Generate AGENTS.md:

```markdown
# AGENTS.md
> Auto-generated. Run /ai-sdlc:generate-agents to rebuild.
> Last updated: [date]

## Project
- **Name:** [from PROJECT.md title]
- **Status:** [from STATE.md or "not started"]
- **Stack:** [from STACK.md first line, or "not set"]

## Spec Index
| File | Type | Status | Summary |
|------|------|--------|---------|
| specs/jobs/01-name.md | JTBD | [status] | [title from frontmatter] |
| specs/domain/name.md | Domain | [status] | [title from frontmatter] |
| design/prototype/name.md | UI Spec | — | [description] |

## Codebase Context
| File | Exists | Summary |
|------|--------|---------|
| STACK.md | [yes/no] | [first line or "needs setup"] |
| ARCHITECTURE.md | [yes/no] | [first line or "needs setup"] |
| CONVENTIONS.md | [yes/no] | [first line or "needs setup"] |

## Phase Progress
| Phase | Name | Status | Artifacts |
|-------|------|--------|-----------|
| 1 | [name] | [status] | [which files exist: CONTEXT, PLAN, SUMMARY, etc.] |

## Current State
- **Phase:** [N] — [status]
- **Blockers:** [from STATE.md]
- **Last Session:** [from STATE.md]
```

6. Write to `AGENTS.md` at project root.
7. Confirm: "AGENTS.md updated with [X] specs, [Y] domain docs, [Z] phases tracked."
