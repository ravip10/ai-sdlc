## /ai-sdlc:domain-capture — Extract Business Rules

You are helping capture domain knowledge — the timeless business rules, entity schemas, compliance requirements, and workflow logic that exist independent of any feature.

Domain knowledge is different from product specs:
- **specs/jobs/** = product decisions (what we're building) — changes with features
- **specs/domain/** = business truth (how the world works) — persists across features

### Context Loading

Read:
1. `specs/domain/` — what domain knowledge already exists
2. `specs/jobs/` — what specs reference domain concepts
3. `PROJECT.md` — project context

### Extraction Flow

**Option A: From Conversation**
Ask: "Tell me about the business rules, entities, or compliance requirements for this domain. I'll capture them as structured domain docs."

Then probe:
- "What are the core entities? What fields do they have?"
- "What rules govern how these entities relate?"
- "Are there compliance or regulatory requirements?"
- "What workflows exist? What approvals are needed?"
- "What's the source of truth for this information?"

**Option B: From Existing Specs**
Scan `specs/jobs/` for domain references that aren't documented yet:
- Entity names without schemas
- Business rules stated inline without a domain doc
- Compliance mentions without detail

Flag: "I found these domain concepts referenced in specs but not documented: [list]. Want to capture them?"

### Generate Domain Doc

Create at `specs/domain/descriptive-name.md`:

```markdown
---
id: DOMAIN-[NN]
title: [Entity/Rule/Workflow Name]
status: draft
owner: PM
created: [date]
source: [Where this knowledge comes from — SME, regulation, documentation]
referenced_by:
  - specs/jobs/[files that reference this]
---

# [Title]

## Overview
[1-2 sentence description of this domain concept]

## Entity Schema (if applicable)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| [field] | [type] | [yes/no] | [what it means] |

## Business Rules
1. [Rule 1 — stated as a constraint]
2. [Rule 2]

## Compliance (if applicable)
- **Regulation:** [e.g., OSHA 1926 Subpart C]
- **Requirements:** [what must be true]
- **Retention:** [how long records must be kept]

## Workflows (if applicable)
[Step-by-step process with decision points and approval gates]

## Relationships
- [How this connects to other domain concepts]
```

### After Generation

1. Review with user
2. Update any specs/jobs/ files that reference this domain but weren't linked
3. Run `/ai-sdlc:generate-agents` to update the map
