## /ai-sdlc:discuss-phase — Shape Implementation Decisions

You are helping the user define HOW a phase should be implemented before any planning or coding happens. The roadmap says WHAT to build. This step captures the user's vision for HOW.

### Usage
```
/ai-sdlc:discuss-phase [phase_number]
```

### Context Loading

Read:
1. `AGENTS.md` — project map
2. `ROADMAP.md` — find the phase
3. `specs/jobs/` — specs mapped to this phase
4. `specs/domain/` — relevant business rules
5. `design/` — any existing design specs
6. `.planning/STATE.md` — current state
7. Previous phase summaries (if phase > 1)

### Discussion Flow

**Step 1: Present Phase Context**

Show the user:
- Phase name and description from ROADMAP.md
- Which specs/jobs/ map to this phase
- Which domain rules apply
- What design exists (if any)

**Step 2: Identify Gray Areas**

Based on what's being built, identify implementation decisions that aren't specified in the specs. Categories:

**If building UI:**
- Layout and density preferences
- Interaction patterns (click vs. drag, inline vs. modal)
- Empty states, loading states, error states
- Mobile vs. desktop behavior
- Accessibility requirements

**If building API/backend:**
- Response format and pagination
- Error handling strategy
- Authentication/authorization model
- Performance targets
- Data migration needs

**If building integrations:**
- Sync vs. async
- Retry and failure handling
- Data mapping decisions
- Rate limiting approach

**If building data/ML:**
- Input format and validation
- Output format and confidence thresholds
- Fallback behavior
- Human-in-the-loop decision points

**Step 3: Ask, Don't Assume**

For each gray area, ask the user what they prefer. Present options with trade-offs when relevant. Don't ask all at once — group by category.

Example:
> "For the voice recording interface, I see a few decisions we should make:
> 1. **Recording feedback** — waveform visualization vs. simple timer? Waveform is richer but more complex.
> 2. **Error handling** — if mic permission is denied, redirect to settings or show inline instructions?
> 3. **Max recording length** — cap it or let it run? Capping simplifies storage but limits users."

**Step 4: Capture Decisions**

When discussion is complete, create `.planning/phases/[NN]-[phase-name]/CONTEXT.md`:

```markdown
---
phase: [N]
title: [Phase Name]
status: discussed
specs: [list of specs/jobs/ files]
domain: [list of specs/domain/ files]
design: [list of design/ files]
date: [date]
---

# Phase [N]: [Name] — Implementation Context

## Decisions

### [Category 1: e.g., UI Behavior]
- **[Decision 1]:** [What was decided and why]
- **[Decision 2]:** [What was decided and why]

### [Category 2: e.g., Error Handling]
- **[Decision 1]:** [What was decided and why]

## Deferred to Claude's Discretion
- [Things the user explicitly said "you decide"]

## Out of Scope for This Phase
- [Things that came up but belong in a later phase]

## Open Questions
- [Anything still unresolved]
```

**Step 5: Update State**

Update `.planning/STATE.md`:
- Current phase status → "discussed"
- Log the session

**Step 6: Next Step**

> "Phase [N] decisions captured. The researcher and planner will use these to build your implementation plan.
> Run `/ai-sdlc:plan-phase [N]` when ready."
