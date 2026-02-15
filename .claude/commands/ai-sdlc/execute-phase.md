## /ai-sdlc:execute-phase — Run Plans with Ralph Loop

Execution happens OUTSIDE Claude Code using the Ralph loop. This command prepares and instructs the user.

### Usage
```
/ai-sdlc:execute-phase [phase_number]
```

### Context Loading

Read:
1. `AGENTS.md` — project map
2. `.planning/phases/[N]-*/PLAN.md` — verify plan exists
3. `.planning/phases/[N]-*/PROMPT_build.md` — verify prompt exists
4. `.planning/STATE.md` — current progress

### Pre-flight Checks

1. If PLAN.md doesn't exist → "Run `/ai-sdlc:plan-phase [N]` first."
2. If PROMPT_build.md doesn't exist → "Run `/ai-sdlc:plan-phase [N]` to regenerate prompts."
3. If STACK.md doesn't exist → "Run `/ai-sdlc:init` first."

### Why External Execution?

The Ralph loop runs in a regular terminal, OUTSIDE Claude Code, because:

1. **Fresh context per iteration** — Each loop iteration starts with a clean context window. No accumulated garbage, no context rot.
2. **Autonomous operation** — Uses `--dangerously-skip-permissions` to auto-approve tool calls. The loop runs unattended.
3. **Persistent progress** — PLAN.md tracks task completion on disk. Each iteration reads it fresh and picks up where the last left off.
4. **Git integration** — Commits happen per-task, pushes happen per-iteration. Progress is always saved.

### Instructions

Print the following:

```
═══════════════════════════════════════════════════════════════
                    RALPH LOOP EXECUTION
═══════════════════════════════════════════════════════════════

Phase [N]: [Phase Name]
Tasks: [X] tasks in PLAN.md
Prompt: .planning/phases/[N]-[name]/PROMPT_build.md

TO EXECUTE:

1. Exit Claude Code (type 'exit' or Ctrl+D)

2. In a regular terminal, run:

   ./scripts/loop.sh build [N]-[name]

3. Ralph will:
   - Read PLAN.md and find the next incomplete task
   - Implement it fully (no stubs, no TODOs)
   - Run verification checks
   - Commit and push
   - Loop with fresh context until all tasks complete

4. Monitor progress:
   - Watch terminal output
   - Check git log for commits
   - Ctrl+C to stop at any time

5. When done, return to Claude Code and run:

   /ai-sdlc:verify-work [N]

═══════════════════════════════════════════════════════════════

OPTIONAL FLAGS:

  ./scripts/loop.sh build [N]-[name] 10    # Max 10 iterations
  ./scripts/loop.sh plan [N]-[name]        # Planning mode (analyze, don't build)

═══════════════════════════════════════════════════════════════
```

### Update State

Update `.planning/STATE.md`:
- Phase status → "executing"
- Log session with timestamp

### Do NOT

- Do NOT try to execute tasks inside Claude Code
- Do NOT spawn executor agents
- Do NOT run the loop from within this conversation

The whole point is fresh context per iteration, which requires exiting and re-entering.
