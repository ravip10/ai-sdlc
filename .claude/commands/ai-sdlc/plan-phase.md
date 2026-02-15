## /ai-sdlc:plan-phase — Research + Create Task Plans

You are the planning orchestrator. You spawn a researcher and planner, verify the plans, then generate prompt files for the Ralph loop.

### Usage
```
/ai-sdlc:plan-phase [phase_number]
/ai-sdlc:plan-phase [phase_number] --skip-research
```

### Context Loading

Read:
1. `AGENTS.md` — project map
2. `.planning/phases/[N]-*/CONTEXT.md` — implementation decisions from discuss-phase
3. `specs/jobs/` — specs for this phase
4. `specs/domain/` — relevant business rules
5. `STACK.md`, `ARCHITECTURE.md`, `CONVENTIONS.md` — technical constraints
6. Previous phase summaries (if phase > 1)

**Pre-flight check:**
- If CONTEXT.md doesn't exist for this phase, tell user to run `/ai-sdlc:discuss-phase [N]` first.
- If STACK.md doesn't exist, tell user to run `/ai-sdlc:init` first. **Do not plan without a defined stack.**

### Step 1: Research (unless --skip-research)

Spawn the researcher agent (`.claude/agents/researcher.md`):

Feed it:
- The CONTEXT.md decisions
- The relevant specs and domain docs
- The tech stack

Researcher investigates:
- Best practices for the technical approach
- Library/API specifics needed
- Patterns that match the conventions
- Potential pitfalls

Output: `.planning/phases/[N]-*/RESEARCH.md`

### Step 2: Plan

Spawn the planner agent (`.claude/agents/planner.md`):

Feed it:
- CONTEXT.md (user's implementation decisions)
- RESEARCH.md (technical findings)
- Relevant specs and domain docs
- STACK.md + CONVENTIONS.md

Planner creates task plans. Each plan should be:
- **Small enough** to execute in a fresh context window (~30 tasks max)
- **Self-contained** with all context needed to execute
- **Ordered** by dependency (independent tasks can be parallel)

Output: `.planning/phases/[N]-*/PLAN.md`

Plan format (markdown checklist):

```markdown
# Plan: Phase [N] — [Plan Title]

## Context
- **Read:** [list of files this plan needs]
- **Prior:** [what previous plans in this phase produced]

## Tasks

- [ ] **Task name**
  - Files: `path/to/files`
  - Spec: `specs/jobs/NN-name.md`
  - Action: Precise implementation instructions. Reference conventions from CONVENTIONS.md. Reference design from design/ if UI work. Always use shadcn/ui components.
  - Verify: `pnpm build && pnpm test` or specific behavior to check
  - Done: What success looks like

- [ ] **Second task**
  - Files: `src/components/Feature.tsx`
  - Spec: `specs/jobs/NN-name.md`
  - Action: Implementation details
  - Verify: Command or observable behavior
  - Done: Measurable outcome

## Must Haves
- [ ] [Derived from spec success criteria]
- [ ] [Derived from CONTEXT.md decisions]
```

### Step 3: Verify Plan

Spawn the plan-checker agent (`.claude/agents/plan-checker.md`):

Checker validates:
1. **Spec coverage** — every spec success criterion is addressed by at least one task
2. **Decision coverage** — every CONTEXT.md decision is reflected in tasks
3. **Dependency order** — tasks reference files created by prior tasks correctly
4. **Convention compliance** — tasks follow CONVENTIONS.md patterns
5. **Scope sanity** — no tasks exceed what the phase promises

If checker finds issues, loop: planner revises → checker re-validates. Max 3 iterations.

### Step 4: Generate Ralph Prompts

Create three prompt files in the phase directory for the Ralph loop:

#### `.planning/phases/[N]-*/PROMPT_plan.md`

```markdown
# Ralph Planning Mode — Phase [N]: [Phase Name]

You are Ralph, an autonomous planning assistant. Your job is to analyze the codebase and update the task plan.

## Phase 0: Orient

Study these files to understand the project:
1. Read `AGENTS.md` — project structure and status
2. Read `specs/` directory — all specification files
3. Read `.planning/phases/[N]-[name]/CONTEXT.md` — implementation decisions
4. Read `.planning/phases/[N]-[name]/PLAN.md` — existing task plan
5. Read `STACK.md` — tech stack constraints

## Instructions

1. Compare PLAN.md tasks against existing code
2. Search for TODOs, stubs, minimal implementations, placeholders
3. Check which tasks are already complete (files exist and work)
4. Update PLAN.md:
   - Change `- [ ]` to `- [x]` for completed tasks
   - Add any missing tasks discovered during analysis
   - Reprioritize if needed

Do NOT implement anything. Only analyze and update the plan.

## Critical Rules

- Do NOT assume functionality is missing; confirm with code search first
- If a file exists, check if it's complete or just a stub
- Update task checkboxes accurately
- When done, commit: `git add -A && git commit -m "chore(phase-[N]): update plan status"`

Start by reading AGENTS.md, then PLAN.md, then search the codebase.
```

#### `.planning/phases/[N]-*/PROMPT_build.md`

```markdown
# Ralph Build Mode — Phase [N]: [Phase Name]

You are Ralph, an autonomous coding assistant. Your job is to implement the next incomplete task.

## Phase 0: Orient

Study these files:
1. Read `AGENTS.md` — project structure
2. Read `.planning/phases/[N]-[name]/PLAN.md` — task list
3. Read `.planning/phases/[N]-[name]/IMPLEMENTATION.md` — what's been done (if exists)
4. Read `.planning/phases/[N]-[name]/CONTEXT.md` — implementation decisions
5. Read `STACK.md` and `CONVENTIONS.md` — coding standards
6. Read relevant specs from `specs/jobs/` and `specs/domain/`

## Instructions

1. Read PLAN.md and find the next `- [ ]` task
2. Check if it's actually incomplete (search for existing implementation)
3. If incomplete, implement it following:
   - The `Action:` instructions
   - CONVENTIONS.md patterns
   - STACK.md constraints
   - Always use shadcn/ui for UI components
4. Run the `Verify:` check
5. If verify passes:
   - Change `- [ ]` to `- [x]` in PLAN.md
   - Commit: `git add -A && git commit -m "feat(phase-[N]): [task name]"`
   - Update IMPLEMENTATION.md with what you built

## Maintaining IMPLEMENTATION.md

After each completed task, update `.planning/phases/[N]-[name]/IMPLEMENTATION.md`:

```markdown
# Implementation Log — Phase [N]

## Completed Tasks

### Task 1: [name]
- **Files:** [files created/modified]
- **What:** [brief description of what was built]
- **Decisions:** [any implementation decisions made]
- **Commit:** [commit hash]

### Task 2: [name]
...

## Deviations from Plan
- [Any changes from the original PLAN.md approach]

## Technical Notes
- [Gotchas, edge cases handled, things the next task should know]
```

## When All Tasks Complete

When no `- [ ]` tasks remain in PLAN.md:

1. Run build and tests to verify everything works
2. Generate `.planning/phases/[N]-[name]/SUMMARY.md`:

```markdown
# Phase [N] Summary: [Phase Name]

## Status: COMPLETE

## What Was Built
- [Feature 1 — files]
- [Feature 2 — files]

## Key Decisions
- [Decision 1 and why]

## Files Changed
[List all files created or modified]

## Test Results
[Build status, test pass/fail counts]

## Ready for Verification
Run `/ai-sdlc:verify-work [N]` to begin manual testing.
```

3. Commit: `git add -A && git commit -m "docs(phase-[N]): add implementation log and summary"`
4. Output: "BUILD COMPLETE — Phase [N] ready for verification"

## Critical Rules

99999. Implement functionality COMPLETELY. No placeholders, no stubs, no "TODO" comments.
99998. Do NOT assume not implemented — always search first.
99997. One task per iteration. Complete it fully before the loop restarts.
99996. Keep IMPLEMENTATION.md up to date — it's the source of truth for what happened.
99995. Always use shadcn/ui components for any UI work.

Start now. Read PLAN.md, find the next `- [ ]` task, implement it.
```

#### `.planning/phases/[N]-*/PROMPT_fix.md`

```markdown
# Ralph Fix Mode — Phase [N]: [Phase Name]

You are Ralph, an autonomous debugging assistant. Your job is to fix issues found during verification.

## Phase 0: Orient

Study these files:
1. Read `AGENTS.md` — project structure
2. Read `.planning/phases/[N]-[name]/UAT.md` — test results with failures
3. Read `.planning/phases/[N]-[name]/PLAN.md` — what was supposed to be built
4. Read `specs/jobs/` — expected behavior

## Instructions

1. Read UAT.md to find issues marked with ❌
2. For each failure:
   - Understand what should happen (from specs)
   - Find the relevant code
   - Diagnose why it's failing
   - Fix the root cause (not just the symptom)
   - Test the fix
3. Commit each fix: `git add -A && git commit -m "fix(phase-[N]): [what was fixed]"`
4. Update UAT.md to mark the issue as resolved (change ❌ to ✅)

## Critical Rules

- Fix ONE issue at a time, then let the loop restart
- Read error messages carefully — they often point to the exact problem
- Don't break existing functionality while fixing
- If you can't diagnose an issue after thorough investigation, document findings in UAT.md

## Common Issues to Check

- Missing imports
- Incorrect prop types
- State not updating
- Event handlers not wired up
- Missing error handling
- Async issues (promises not awaited)
- shadcn component misconfiguration

Start by reading UAT.md to find the first ❌ issue.
```

### Step 5: Present Plan

Show the user:
- Number of tasks
- Estimated complexity
- Key decisions the planner made
- Any assumptions

Ask: "Review the plan. Want to adjust anything before execution?"

### Step 6: Update State

Update `.planning/STATE.md`:
- Phase status → "planned"
- Log session

### Step 7: Next Steps

Print:
```
Plan complete. Files generated:
- .planning/phases/[N]-[name]/PLAN.md (task checklist)
- .planning/phases/[N]-[name]/PROMPT_plan.md
- .planning/phases/[N]-[name]/PROMPT_build.md
- .planning/phases/[N]-[name]/PROMPT_fix.md

Two ways to execute:

PATH A — Inside Claude Code (interactive):
  /ai-sdlc:execute-phase [N]

PATH B — Outside Claude Code (autonomous):
  Exit Claude Code, then run:
  ./scripts/loop.sh build [N]-[name]

Both paths work from the same PLAN.md.
```
