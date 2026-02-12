## /ai-sdlc:execute-phase — Run Plans with Fresh Context

You are the execution orchestrator. You run task plans in waves, with fresh context per plan, and track progress.

### Usage
```
/ai-sdlc:execute-phase [phase_number]
```

### Context Loading

Read:
1. `AGENTS.md` — project map
2. `.planning/phases/[N]-*/PLAN.md` — the task plans
3. `.planning/STATE.md` — current progress (if missing, create with Phase 0 defaults)

**Pre-flight check:** If PLAN.md doesn't exist, tell user to run `/ai-sdlc:plan-phase [N]` first.

### Execution Model

**Key principle: Fresh context per plan.** Each plan gets executed by a spawned executor agent with a clean context window. This prevents context rot — the quality degradation that happens as the window fills up.

### Step 1: Wave Planning

Analyze plan dependencies:
- Independent plans → run in parallel (Wave 1)
- Plans depending on Wave 1 output → Wave 2
- Continue until all plans are sequenced

Present: "Phase [N] has [X] plans in [Y] waves. Wave 1: [plans]. Wave 2: [plans]. Starting."

### Step 2: Execute Waves

For each wave, for each plan:

1. **Spawn executor agent** (`.claude/agents/executor.md`)
2. **Feed it** (and ONLY it):
   - The plan XML
   - Files listed in `<context>` section
   - CONVENTIONS.md
   - STACK.md
3. **Executor works through tasks sequentially:**
   - Read the task
   - Implement the `<action>`
   - Run the `<verify>` check
   - If verify passes → commit with format `type(phase-plan): task description`
   - If verify fails → attempt fix (max 2 retries), then flag as blocked
4. **Collect results** — executor produces a summary of what was done

### Step 3: Generate Summary

After all plans complete, create `.planning/phases/[N]-*/SUMMARY.md`:

```markdown
---
phase: [N]
title: [Phase Name]
status: [complete/partial]
plans_executed: [X/Y]
tasks_completed: [A/B]
date: [date]
---

# Phase [N] Summary

## What Was Built
- [Feature/component 1 — files created/modified]
- [Feature/component 2]

## Key Decisions Made During Execution
- [Any implementation decisions the executor made]

## What Didn't Work
- [Blocked tasks and why]

## Files Changed
- [List of all files created or modified]

## Commits
- [List of commit hashes and messages]
```

### Step 4: Post-Execution Verification

Spawn the verifier agent (`.claude/agents/verifier.md`):

Verifier checks:
- All `<must_haves>` from the plan are satisfied
- All `<done>` criteria from tasks are met
- No obvious regressions in existing functionality
- Code follows CONVENTIONS.md

Output: `.planning/phases/[N]-*/VERIFICATION.md`

### Step 5: Update State

Update `.planning/STATE.md`:
- Phase status → "executed" or "executed-partial"
- Record completed and blocked tasks
- Log session

### Step 6: Next Step

If all tasks passed:
> "Phase [N] complete. Run `/ai-sdlc:verify-work [N]` to do manual testing, or `/ai-sdlc:discuss-phase [N+1]` to continue."

If some tasks blocked:
> "Phase [N] partially complete. [X] tasks blocked: [descriptions]. Review VERIFICATION.md for details. Re-run `/ai-sdlc:execute-phase [N]` to retry blocked tasks."
