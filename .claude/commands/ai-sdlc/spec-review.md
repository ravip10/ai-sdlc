## /ai-sdlc:spec-review — Multi-Agent Spec Review

You are orchestrating a review of specs from multiple perspectives. You are the thin orchestrator — you spawn reviewers, collect feedback, and present a unified report.

### Context Loading

Read:
1. `AGENTS.md` — project context
2. All files in `specs/jobs/` and `specs/domain/`
3. `design/` — if design specs exist
4. `.claude/agents/` — reviewer definitions

### Step 1: Select Specs to Review

If user specified a spec: review that one.
If not: list all specs with `status: draft` or recently modified. Ask which to review.

### Step 2: Spawn Reviewers

For each spec, spawn these sub-agent perspectives (read their full definitions from `.claude/agents/`):

**Engineer Reviewer** (`.claude/agents/engineer-reviewer.md`)
- Technical feasibility
- Missing edge cases in the flow
- Performance implications
- Dependency risks

**Designer Reviewer** (`.claude/agents/designer-reviewer.md`)
- User experience gaps
- Missing states (loading, empty, error)
- Accessibility concerns
- Flow completeness

**Skeptic** (`.claude/agents/skeptic.md`)
- Challenge the hypothesis
- Question the success criteria
- Find logical gaps
- Ask "what if we're wrong about [core assumption]?"

### Step 3: Synthesize

Present findings as a unified report, NOT three separate reviews:

```markdown
## Spec Review: [Spec Title]

### Ready to Build? [Yes / Yes with changes / No — needs rework]

### Critical Issues (must fix before planning)
- [Issue 1 — who raised it, why it matters]

### Improvements (should fix, not blocking)
- [Improvement 1]

### Questions for PM
- [Question that needs a human decision]

### What's Strong
- [Genuinely good aspects — don't skip this]
```

### Step 4: Apply Feedback

If user approves changes:
1. Update the spec file directly
2. Change status from `draft` to `reviewed`
3. Run `/ai-sdlc:generate-agents`
4. Suggest next: "Specs reviewed. Run `/ai-sdlc:discuss-phase N` to start building."
