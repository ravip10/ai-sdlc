# Example: JHA Safety Forms

A mobile-first digital Job Hazard Analysis (JHA) form for construction field workers.

## Overview

This example demonstrates a complete AI-SDLC project for building safety compliance forms. It shows how:

- **Product specs** capture user jobs and domain knowledge
- **Planning artifacts** record implementation decisions
- **Code** traces back to specs and decisions

## Structure

```
jha-safety-forms/
├── PROJECT.md          # Vision: replace paper JHA forms
├── REQUIREMENTS.md     # v1/v2 scope definition
├── ROADMAP.md          # 5 phases from MVP to dashboard
├── STACK.md            # Next.js 14 + TypeScript + Tailwind
├── specs/
│   ├── jobs/
│   │   └── 01-field-worker-completes-jha.md   # JTBD spec
│   └── domain/
│       └── jha-compliance.md                   # OSHA rules
├── .planning/
│   ├── STATE.md        # Where we are
│   └── phases/
│       └── 01-core-mobile-form/
│           └── CONTEXT.md   # UI/UX decisions
└── src/
    └── components/
        ├── JHAForm.tsx     # React implementation
        └── JHAForm.css     # Mobile-first styles
```

## Key Learnings

### 1. Domain Knowledge is Separate
`specs/domain/jha-compliance.md` captures OSHA requirements independently of any feature. Multiple specs can reference the same domain file.

### 2. Decisions are Documented
`CONTEXT.md` records why we chose typed signatures over drawn ones, why we use a single scrolling page, etc. Future developers understand the reasoning.

### 3. Specs Drive Code
The `JHAForm.tsx` component implements exactly what's in the JTBD spec — no more, no less. Every field traces back to a requirement.

## Using This Example

To learn from this example:
1. Read `PROJECT.md` → `specs/jobs/01-field-worker-completes-jha.md` → `specs/domain/jha-compliance.md`
2. See how `.planning/phases/01-core-mobile-form/CONTEXT.md` bridges spec to code
3. Compare `JHAForm.tsx` against the spec flow

To use as a template:
1. Copy structure to your project root
2. Replace JHA content with your domain
3. Run `/ai-sdlc:generate-agents` to update AGENTS.md
