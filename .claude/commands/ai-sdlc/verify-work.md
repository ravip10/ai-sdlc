## /ai-sdlc:verify-work — Manual Testing + Debug Routing

You are guiding the user through verifying that the built feature actually works as expected.

### Usage
```
/ai-sdlc:verify-work [phase_number]
```

### Context Loading

Read:
1. `.planning/phases/[N]-*/VERIFICATION.md` — automated verification results
2. `.planning/phases/[N]-*/SUMMARY.md` — what was built
3. `specs/jobs/` — the specs this phase implements (source of truth for "what should work")
4. `.planning/phases/[N]-*/CONTEXT.md` — implementation decisions

### Step 1: Extract Testable Deliverables

From the spec success criteria and CONTEXT.md decisions, create a checklist of things the user can manually test:

```
Phase [N] Verification Checklist:

1. [ ] [Testable thing — e.g., "Can you record a 10-second voice memo?"]
2. [ ] [Testable thing — e.g., "Does the waveform display while recording?"]
3. [ ] [Testable thing — e.g., "Does it handle denied mic permission gracefully?"]
4. [ ] [Testable thing — e.g., "Does the recording save and appear in the list?"]
```

### Step 2: Walk Through One at a Time

Present each item and ask:
> "Try this: [action]. Did it work? (yes / no / partially — describe what happened)"

### Step 3: Handle Failures

For each failed item:

1. **Gather details:** "What did you see? Any error messages? What did you expect instead?"
2. **Diagnose:** Read relevant code files, check logs if available
3. **Create fix plan:** Generate a targeted task plan for the fix

```xml
<plan id="[N]-fix-[issue]" phase="[N]" title="Fix: [description]">
  <context>
    Read: [relevant files]
    Issue: [what's broken and why]
  </context>

  <task type="auto">
    <n>Fix [issue description]</n>
    <files>[files to modify]</files>
    <spec>[original spec]</spec>
    <action>[specific fix instructions]</action>
    <verify>[how to confirm fix works]</verify>
    <done>[expected behavior after fix]</done>
  </task>
</plan>
```

4. **Offer:** "Want me to execute this fix now? Or continue testing first and batch all fixes?"

### Step 4: Record Results

Create/update `.planning/phases/[N]-*/UAT.md`:

```markdown
# User Acceptance Testing — Phase [N]

## Date: [date]

## Results
| # | Test | Result | Notes |
|---|------|--------|-------|
| 1 | [test] | ✅ Pass | |
| 2 | [test] | ❌ Fail | [what happened] |
| 3 | [test] | ✅ Pass | |

## Fixes Applied
- [Fix 1 — commit hash]

## Outstanding Issues
- [Any issues deferred to next phase]
```

### Step 5: Update State

Update `.planning/STATE.md`:
- Phase status → "verified" or "needs-fixes"
- Log session

### Step 6: Next Step

If all tests pass:
> "Phase [N] verified. Nice work. Run `/ai-sdlc:discuss-phase [N+1]` for the next phase, or `/ai-sdlc:progress` for the big picture."

If fixes needed:
> "Created fix plans. Run `/ai-sdlc:execute-phase [N]` to apply fixes, then re-run `/ai-sdlc:verify-work [N]`."
