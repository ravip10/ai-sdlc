## /ai-sdlc:progress — Where Am I? What's Next?

Show the user a clear snapshot of project status.

### Context Loading

Read:
1. `AGENTS.md` — project overview
2. `ROADMAP.md` — all phases and their status
3. `.planning/STATE.md` — current position, blockers, decisions
4. `.planning/phases/*/` — scan for what exists (CONTEXT, PLAN, SUMMARY, VERIFICATION)

**If STATE.md doesn't exist**, create it with Phase 0 defaults before proceeding.

### Output Format

```
📍 Project: [Name]
📊 Phase [N] of [total]: [Phase Name]
🔄 Status: [discussed / planned / executing / verified]

Phases:
  ✅ Phase 1: [Name] — verified
  🔨 Phase 2: [Name] — executing (3/5 tasks done)
  ⬜ Phase 3: [Name] — not started
  ⬜ Phase 4: [Name] — not started

Specs: [X] jobs, [Y] domain docs
Design: [Z] prototypes

Blockers: [any from STATE.md]

Next action: /ai-sdlc:[suggested command]
```

Keep it concise. No essays. The user wants a glance, not a report.
