# Roles — Who Fills What

## PM Territory

| File | When | What Goes In |
|------|------|-------------|
| `PROJECT.md` | Kickoff | Vision, problem, hypothesis, audience, success criteria |
| `REQUIREMENTS.md` | After discovery | v1/v2/out-of-scope with traceability |
| `ROADMAP.md` | After requirements | Phases mapped to requirements |
| `specs/jobs/*.md` | Before each feature | JTBD specs — one per user job |
| `specs/domain/*.md` | When rules surface | Business rules, entities, compliance |

**PM creates the "what" and "why." Never the "how."**

## Designer Territory

| File | When | What Goes In |
|------|------|-------------|
| `design/components.md` | Project setup | Component catalog / design system |
| `design/flows.md` | After specs | User flows, state diagrams |
| `design/prototype/*.md` | Before build | Per-feature UI specs with all states |

**Designer creates the "how it feels." References specs for requirements.**

## Engineer Territory

| File | When | What Goes In |
|------|------|-------------|
| `STACK.md` | Project setup | Tech stack, dependencies, infrastructure |
| `ARCHITECTURE.md` | After specs review | System design, data model, API surface |
| `CONVENTIONS.md` | Project setup | Code patterns, naming, testing, file org |

**Engineer creates the "how it's built." References specs for requirements, design for UI.**

## System (AI-Generated)

| File | When | What Goes In |
|------|------|-------------|
| `AGENTS.md` | Auto on changes | Project map — the index AI reads first |
| `.planning/STATE.md` | During execution | Living memory, decisions, blockers |
| `.planning/phases/*/` | During execution | Per-phase context, plans, summaries |

## Boundary Rules

1. PMs don't write in `.planning/` or engineer files
2. Engineers don't modify `specs/` without PM approval
3. Designers own `design/` — engineers implement from it, don't modify it
4. `AGENTS.md` is never manually edited — always regenerated
5. Anyone can READ anything — boundaries are about WRITE ownership
