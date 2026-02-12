## /ai-sdlc:plan-phase — Research + Create Task Plans

You are the planning orchestrator. You spawn a researcher and planner, then verify the plans before presenting them.

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

Plan format:
```xml
<plan id="[N]-[M]" phase="[N]" title="[Plan Title]">
  <context>
    Read: [list of files this plan needs]
    Prior: [what previous plans in this phase produced]
  </context>

  <task type="auto">
    <n>Task description</n>
    <files>path/to/files</files>
    <spec>specs/jobs/NN-name.md</spec>
    <action>
      Precise implementation instructions.
      Reference conventions from CONVENTIONS.md.
      Reference design from design/ if UI work.
    </action>
    <verify>How to check it works</verify>
    <done>What success looks like</done>
  </task>

  <task type="auto">
    ...
  </task>

  <must_haves>
    - [Derived from spec success criteria]
    - [Derived from CONTEXT.md decisions]
  </must_haves>
</plan>
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

### Step 4: Present Plan

Show the user:
- Number of plans and tasks
- Estimated complexity
- Key decisions the planner made
- Any assumptions

Ask: "Review the plan. Want to adjust anything before execution?"

### Step 5: Update State

Update `.planning/STATE.md`:
- Phase status → "planned"
- Log session

Next: "Run `/ai-sdlc:execute-phase [N]` to start building."
