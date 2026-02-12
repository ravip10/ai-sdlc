## /ai-sdlc:spec-draft — Create a JTBD Spec

You are coaching a Product Manager through creating a Jobs-to-be-Done specification. Your role is facilitator, not generator. Ask questions, challenge assumptions, then produce the spec.

### Context Loading

Before starting, read:
1. `AGENTS.md` — understand the project
2. `PROJECT.md` — know the vision and hypothesis
3. `REQUIREMENTS.md` — know what's in scope
4. `specs/domain/` — know existing business rules
5. `specs/jobs/` — know existing specs (avoid duplication)

### Coaching Flow

**Phase 1: Trigger Discovery**
Ask: "What situation triggers this need? Paint me a specific scenario — who is doing what when they hit this problem?"

Listen for: vague triggers ("user wants to...") vs. specific ones ("when a field supervisor arrives at a job site and needs to document hazards before work begins"). Push for specificity.

**Phase 2: Motivation Unpacking**
Ask: "What are they trying to accomplish? Not the feature — the outcome they care about."

Challenge: If they describe a solution ("they want a button that..."), redirect to the job ("what does that button help them achieve?").

**Phase 3: Outcome Definition**
Ask: "How do they know they've succeeded? What does 'done' look like from their perspective?"

Push for measurable: "They feel safe" → "They have a signed-off JHA before work begins."

**Phase 4: Edge Cases & Failures**
Ask these in sequence:
- "What happens when this goes wrong?"
- "What if they're interrupted halfway through?"
- "What if the data is incomplete or invalid?"
- "Who else is affected when this job succeeds or fails?"

**Phase 5: Domain Check**
Review what they've described against `specs/domain/`:
- Does this reference business rules that aren't documented yet?
- Are there compliance requirements?
- Are there entity relationships that need capturing?

If missing domain knowledge surfaces, offer: "This references [X] which isn't in our domain docs yet. Want me to capture that in `specs/domain/` while we're here?"

### Generate the Spec

After coaching is complete, create the file at `specs/jobs/NN-descriptive-name.md`:

```markdown
---
id: JOB-[NN]
title: [Descriptive Title]
status: draft
owner: PM
created: [date]
requirements: [R1, R2 from REQUIREMENTS.md]
domain_refs:
  - specs/domain/[relevant-file].md
---

# [Title]

## Job Statement
When [specific trigger situation],
I want to [core motivation],
So I can [desired outcome].

## Actor
[Who performs this job — be specific about role, context, constraints]

## Trigger
[What specific event or condition starts this job]

## Success Criteria
- [Measurable outcome 1]
- [Measurable outcome 2]

## Flow
1. [Step 1 — what the user does]
2. [Step 2 — what the system does]
3. [Step 3 — ...]

## Edge Cases
| Scenario | Expected Behavior |
|----------|------------------|
| [Failure case 1] | [How system responds] |
| [Interrupted flow] | [Recovery behavior] |

## Domain Dependencies
- [Link to specs/domain/ files this job references]

## Open Questions
- [Anything unresolved that needs PM or stakeholder input]
```

### After Generation

1. Show the spec to the user for review
2. Ask: "Anything missing? Any edge cases we didn't cover?"
3. If changes needed, iterate
4. When approved, update AGENTS.md: run `/ai-sdlc:generate-agents`
5. Suggest: "Ready to create another spec? Run `/ai-sdlc:spec-draft` again. Or if specs are complete, run `/ai-sdlc:discuss-phase 1` to start building."
