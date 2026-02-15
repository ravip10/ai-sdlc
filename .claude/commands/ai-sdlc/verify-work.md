## /ai-sdlc:verify-work — Manual Testing + Debug Routing

You guide the user through verifying that the built feature works, then route fixes to the Ralph loop.

### Usage
```
/ai-sdlc:verify-work [phase_number]
```

### Context Loading

Read:
1. `.planning/phases/[N]-*/SUMMARY.md` — what was built (if exists)
2. `.planning/phases/[N]-*/PLAN.md` — what was supposed to be built
3. `specs/jobs/` — the specs this phase implements (source of truth)
4. `.planning/phases/[N]-*/CONTEXT.md` — implementation decisions

### Step 1: Extract Testable Deliverables

From the spec success criteria and CONTEXT.md decisions, create a checklist:

```
Phase [N] Verification Checklist:

1. [ ] [Testable thing — e.g., "Form submits and shows confirmation"]
2. [ ] [Testable thing — e.g., "Validation errors display correctly"]
3. [ ] [Testable thing — e.g., "Data persists after page refresh"]
4. [ ] [Testable thing — e.g., "Mobile layout works on iPhone"]
```

### Step 2: Walk Through Testing

Present each item and ask:
> "Try this: [action]. Did it work? (yes / no / partially — describe what happened)"

### Step 3: Record Results

Create/update `.planning/phases/[N]-*/UAT.md`:

```markdown
# User Acceptance Testing — Phase [N]

## Date: [date]

## Results
| # | Test | Result | Notes |
|---|------|--------|-------|
| 1 | [test] | ✅ Pass | |
| 2 | [test] | ❌ Fail | [what happened] |
| 3 | [test] | ⚠️ Partial | [what worked, what didn't] |

## Issues to Fix
- [ ] Issue 1: [description of failure]
- [ ] Issue 2: [description of failure]

## Fixes Applied
_(none yet)_
```

### Step 4: Route Fixes

If there are failures, print:

```
═══════════════════════════════════════════════════════════════
                    RALPH FIX MODE
═══════════════════════════════════════════════════════════════

[X] issues found during verification.
UAT.md updated with failure details.

TO FIX:

1. Exit Claude Code (type 'exit' or Ctrl+D)

2. In a regular terminal, run:

   ./scripts/loop.sh fix [N]-[name]

3. Ralph will:
   - Read UAT.md to find unresolved issues
   - Diagnose and fix each issue
   - Commit fixes
   - Loop until all issues resolved

4. When done, return to Claude Code and run:

   /ai-sdlc:verify-work [N]

   to re-test the fixes.

═══════════════════════════════════════════════════════════════
```

### Step 5: Handle All Pass

If all tests pass:

```
═══════════════════════════════════════════════════════════════
                    PHASE [N] VERIFIED ✓
═══════════════════════════════════════════════════════════════

All [X] tests passed.

Next steps:
- /ai-sdlc:discuss-phase [N+1]  — Start next phase
- /ai-sdlc:progress             — See the big picture

═══════════════════════════════════════════════════════════════
```

### Step 6: Update State

Update `.planning/STATE.md`:
- Phase status → "verified" or "needs-fixes"
- Log session

### Interactive Fix Option

If the user prefers to fix issues interactively (inside Claude Code) instead of using the Ralph loop, they can say so. In that case:

1. Read the failing test details from UAT.md
2. Diagnose the issue by reading relevant code
3. Propose a fix
4. Implement with user approval
5. Re-test

But recommend the Ralph loop for multiple fixes — it's faster with fresh context per fix.
