# Workflow — End to End

## The Full Flow

```
1. INIT         /ai-sdlc:init              → PROJECT.md, REQUIREMENTS.md, ROADMAP.md
2. SPEC         /ai-sdlc:spec-draft        → specs/jobs/*.md (repeat per feature)
3. DOMAIN       /ai-sdlc:domain-capture    → specs/domain/*.md (as rules surface)
4. DESIGN       [Designer fills design/]    → design/prototype/*.md
5. REVIEW       /ai-sdlc:spec-review       → Feedback from eng, design, skeptic
6. DISCUSS      /ai-sdlc:discuss-phase N   → .planning/phases/N/CONTEXT.md
7. PLAN         /ai-sdlc:plan-phase N      → RESEARCH.md, PLAN.md
8. EXECUTE      /ai-sdlc:execute-phase N   → Code + SUMMARY.md
9. VERIFY       /ai-sdlc:verify-work N     → UAT.md + fixes
10. REPEAT      → next phase (step 6-9) until roadmap complete
```

## When to Use What

| Situation | Command |
|-----------|---------|
| Starting a new project | `/ai-sdlc:init` |
| Adding a feature to spec | `/ai-sdlc:spec-draft` |
| Business rules came up in conversation | `/ai-sdlc:domain-capture` |
| Ready to get feedback on specs | `/ai-sdlc:spec-review` |
| About to start building a phase | `/ai-sdlc:discuss-phase N` |
| Ready to create task plans | `/ai-sdlc:plan-phase N` |
| Ready to code | `/ai-sdlc:execute-phase N` |
| Code is written, need to test | `/ai-sdlc:verify-work N` |
| Quick bug fix or small task | `/ai-sdlc:quick` |
| Lost track of where I am | `/ai-sdlc:progress` |
| Working with existing codebase | `/ai-sdlc:map-codebase` |
| Changed specs or structure | `/ai-sdlc:generate-agents` |

## PMCoach Integration Point

If using PMCoach, it replaces steps 2-3:

```
PMCoach coaching session
    ↓ generates
specs/jobs/*.md + specs/domain/*.md
    ↓ run
/ai-sdlc:generate-agents
    ↓ continue from step 5
/ai-sdlc:spec-review
```

Everything downstream stays the same. PMCoach is an optional accelerator for spec creation.
