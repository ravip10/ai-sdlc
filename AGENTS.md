# AGENTS.md

## Project
**Not yet initialized** — Run `/ai-sdlc:init` to configure.

IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning.
Read the relevant spec or domain doc before writing any code.

## Stack
- Runtime: —
- Framework: —
- UI: —
- Database: —
- Testing: —

## Build & Test
```
pnpm install        # install dependencies
pnpm dev            # start dev server
pnpm build          # production build
pnpm test           # run tests
pnpm lint           # lint check
```
Run build and test after every change. Fix failures before committing.

## Structure
```
src/                      # application code
specs/jobs/               # JTBD specs — read before implementing any feature
specs/domain/             # business rules — timeless domain truth
design/                   # UI specs — read before building any interface
design/prototype/         # per-feature wireframes and interaction specs
.planning/STATE.md        # current execution state
.planning/phases/         # per-phase context, plans, and results
```

## Specs Index
Read the relevant file before implementing. One spec = one user job.

| File | Covers |
|------|--------|
| _None yet — run `/ai-sdlc:spec-draft` to create specs_ | |

## Domain Index
Business rules independent of product decisions.

| File | Covers |
|------|--------|
| _None yet — run `/ai-sdlc:domain-capture` to extract rules_ | |

## Design Index
Read before building any UI component or screen.

| File | Covers |
|------|--------|
| design/components.md | Component catalog and usage patterns |
| design/flows.md | End-to-end user journeys |

## Conventions

### Files & Naming
- kebab-case for files, PascalCase for components, camelCase for functions
- Components in `src/components/`, pages in `src/app/`

### Code Patterns
- Server components by default, `'use client'` only when needed
- Named exports, no default exports
- Use the UI library specified in Stack for all components

### Commits
- Format: `type(phase-N): description`
- Types: feat, fix, refactor, test, docs, chore
- Atomic: one commit per task

### Error Handling
- try/catch with typed errors
- Error boundaries for UI
- User-facing errors via toast

## Rules
- Never write code without reading the relevant spec in `specs/jobs/`
- Never build UI without reading the relevant file in `design/`
- Never add dependencies not in Stack without discussing
- If a spec is missing or unclear, stop and flag it — do not guess
- Always run build + test after changes
