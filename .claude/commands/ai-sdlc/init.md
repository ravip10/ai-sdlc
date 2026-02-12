## /ai-sdlc:init — Bootstrap a New Project

You are initializing a new AI-SDLC project. Follow this flow exactly.

### Step 1: Discovery Questions

Ask the user these questions one at a time. Don't dump all questions at once. Listen, then ask the next.

**Product Discovery:**
1. **What are you building?** (one sentence)
2. **Who is it for?** (specific user persona, not "everyone")
3. **What's the core problem?** (what pain exists today)
4. **What's the hypothesis?** If we build X, then Y will happen because Z.
5. **What's v1 vs. later?** What's the smallest thing that proves the hypothesis?

**Technical Stack (REQUIRED — do not skip):**
6. **What platform?** Ask explicitly: "Is this a web app, mobile app, CLI tool, API/backend service, desktop app, or something else?"
7. **What language and framework?** Based on the platform answer, ask specifically. Examples:
   - Web → "React? Next.js? Vue? Svelte? Plain HTML? What CSS approach — Tailwind, CSS modules, vanilla?"
   - Mobile → "React Native? Flutter? Swift? Kotlin?"
   - Backend → "Node/Express? Python/FastAPI? Go? Rust?"
   - CLI → "Node? Python? Rust? Go?"
   - If they don't know, recommend based on the use case. But get a decision.
8. **Database?** "What's the data layer? PostgreSQL, SQLite, MongoDB, Supabase, Firebase, none?"
9. **Any existing code?** "Starting from scratch or adding to an existing project?" If existing, suggest `/ai-sdlc:map-codebase` instead.

**Domain:**
10. **Any domain rules I should know?** (compliance, business logic, industry standards)

### Step 2: Generate Project Files

**CRITICAL: Create STACK.md FIRST.** This locks the tech stack before any other files reference it.

**STACK.md:**
```markdown
# Stack

## Platform
[Web / Mobile / CLI / API / Desktop]

## Runtime
- Language: [e.g., TypeScript]
- Framework: [e.g., Next.js 14]
- Runtime: [e.g., Node.js 20]

## Key Dependencies
| Package | Purpose |
|---------|---------|
| [e.g., prisma] | [ORM / database access] |
| [e.g., tailwindcss] | [Styling] |
| [e.g., shadcn/ui] | [Component library] |

## Database
[e.g., PostgreSQL via Supabase]

## Infrastructure
[e.g., Vercel, Docker, AWS — or "TBD"]

## Constraints
[Any hard constraints — e.g., "must run offline", "no external APIs", "Python 3.11 only"]
```

**PROJECT.md:**
```markdown
# [Project Name]

## Problem
[Specific user pain — use the user's words]

## Hypothesis
If we build [X], then [Y] will happen because [Z].

## Audience
[Specific persona with context]

## Success Criteria
- [Measurable outcome 1]
- [Measurable outcome 2]
```

**REQUIREMENTS.md:**
```markdown
# Requirements

## v1 (Must Have)
- [ ] [Requirement tied to hypothesis]

## v2 (Next)
- [ ] [Enhancement]

## Out of Scope
- [Explicitly excluded]
```

**ROADMAP.md:**
```markdown
# Roadmap

## Phase 1: [Name] — [1-sentence description]
- Status: not started
- Requirements: R1, R2
- Estimated complexity: [low/medium/high]

## Phase 2: [Name]
...
```

**CONVENTIONS.md** (generate sensible defaults based on the chosen stack):
```markdown
# Conventions

## File Organization
[Based on framework — e.g., Next.js App Router structure]

## Naming
[e.g., kebab-case files, PascalCase components, camelCase functions]

## Component Patterns (if frontend)
[e.g., server components by default, 'use client' only when needed]

## Exports
[e.g., named exports only, no default exports]

## Styling
[e.g., Tailwind utility classes, no custom CSS files]

## Testing
[e.g., Vitest for unit, Playwright for e2e]

## Error Handling
[e.g., try/catch with typed errors, error boundaries for UI]
```

**ARCHITECTURE.md** (scaffold based on stack):
```markdown
# Architecture

## Overview
[1-2 sentence system description]

## Structure
[Initial directory layout based on framework conventions]

## Data Model
[TBD — filled in as specs are created]

## Key Patterns
[Based on stack — e.g., "Server Components + Server Actions" for Next.js]
```

### Step 3: Capture Domain Knowledge

If the user mentioned any domain rules, compliance requirements, or business logic during discovery:

1. Create files in `specs/domain/` for each distinct domain area
2. Use the domain template format

### Step 4: Generate AGENTS.md

Run the AGENTS.md generation logic to create the initial project map. STACK.md should now show ✅.

### Step 5: Update Planning State

Update `.planning/STATE.md`:
```markdown
# State

## Current Position
- Phase: 0 (setup complete)
- Status: Ready for spec creation
- Last updated: [date]

## Decisions
- Stack: [language + framework] (decided during init)
- [Any other decisions made during init]

## Blockers
- None

## Quick Tasks
_None._

## Session Log
- [date]: Project initialized via /ai-sdlc:init
```

### Step 6: Next Steps

Tell the user:
> Project initialized with [stack]. Here's what to do next:
>
> 1. **Create specs:** Run `/ai-sdlc:spec-draft` for each v1 feature
> 2. **Fill design:** Have your designer add flows and prototypes to `design/`
> 3. **Start building:** Run `/ai-sdlc:discuss-phase 1` when specs are ready
>
> Run `/ai-sdlc:progress` anytime to see where you are.

Note: Do NOT tell them to "fill out STACK.md" — you already did it.
