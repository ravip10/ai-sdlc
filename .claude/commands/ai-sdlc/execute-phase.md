## /ai-sdlc:execute-phase — Run Tasks from PLAN.md

Execute tasks interactively inside Claude Code, or get instructions for the autonomous Ralph loop.

### Usage
```
/ai-sdlc:execute-phase [phase_number]
/ai-sdlc:execute-phase [phase_number] --ralph
```

### Context Loading

Read:
1. `AGENTS.md` — project map
2. `.planning/phases/[N]-*/PLAN.md` — the task checklist
3. `.planning/phases/[N]-*/CONTEXT.md` — implementation decisions
4. `.planning/STATE.md` — current progress

### Pre-flight Checks

1. If PLAN.md doesn't exist → "Run `/ai-sdlc:plan-phase [N]` first."
2. If STACK.md doesn't exist → "Run `/ai-sdlc:init` first."

### Two Execution Paths

Both paths work from the same PLAN.md. Tasks are marked `- [ ]` → `- [x]` as they complete.

#### Path A — Interactive (default)

Use the executor agent inside Claude Code. Good for:
- Complex work needing human judgment
- Learning a new codebase
- Tasks requiring back-and-forth discussion

**Flow:**
1. Spawn executor agent (`.claude/agents/executor.md`)
2. Feed it PLAN.md, STACK.md, CONVENTIONS.md
3. Executor finds next `- [ ]` task, implements it
4. You review, provide feedback if needed
5. Executor commits and moves to next task
6. Repeat until all tasks are `- [x]`

**Commands during execution:**
- "skip this task" → marks `- [!]` blocked, moves on
- "pause" → stops execution, you can resume later
- "show progress" → displays task completion status

#### Path B — Ralph Loop (--ralph flag or standalone)

Run autonomously outside Claude Code. Good for:
- Well-specified phases with clear tasks
- Overnight/batch execution
- Maximizing throughput (fresh context per task)

**To use Ralph:**

Print these instructions:

```
═══════════════════════════════════════════════════════════════
                    RALPH LOOP EXECUTION
═══════════════════════════════════════════════════════════════

Phase [N]: [Phase Name]
Tasks: [X] tasks in PLAN.md ([Y] remaining)

TO EXECUTE:

1. Exit Claude Code (type 'exit' or Ctrl+D)

2. In a regular terminal, run:

   ./scripts/loop.sh build [N]-[name]

3. Ralph will:
   - Read PLAN.md and find the next `- [ ]` task
   - Implement it completely
   - Mark `- [x]` and commit
   - Push to git
   - Loop with fresh context until all tasks complete

4. Monitor:
   - Watch terminal output
   - Check git log for commits
   - Ctrl+C to stop at any time

5. When done, return to Claude Code and run:

   /ai-sdlc:verify-work [N]

═══════════════════════════════════════════════════════════════

OPTIONS:

  ./scripts/loop.sh build [N]-[name] 10    # Max 10 iterations
  ./scripts/loop.sh plan [N]-[name]        # Analyze only, don't build

═══════════════════════════════════════════════════════════════
```

### Progress Tracking

Both paths update the same files:
- `PLAN.md` — `- [ ]` → `- [x]` for completed tasks
- `IMPLEMENTATION.md` — log of what was built
- `SUMMARY.md` — generated when all tasks complete

### Update State

Update `.planning/STATE.md`:
- Phase status → "executing" or "executing-ralph"
- Log session with timestamp

### When Complete

When all tasks in PLAN.md are `- [x]`:

```
═══════════════════════════════════════════════════════════════
                 PHASE [N] EXECUTION COMPLETE
═══════════════════════════════════════════════════════════════

All [X] tasks completed.

Files generated:
- IMPLEMENTATION.md (what was built)
- SUMMARY.md (phase report)

Next: /ai-sdlc:verify-work [N]
═══════════════════════════════════════════════════════════════
```
