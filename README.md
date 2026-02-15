# AI-SDLC

A spec-driven development system for building products with AI. Combines the PM rigor of structured specs with the execution engine of phase-based AI coding.

**Three territories, one flow:**

```
PM writes specs/  →  Designer fills design/  →  Engineer builds with .planning/
                          ↓
                    AGENTS.md (auto-generated map)
                          ↓
              discuss → plan → execute → verify
                          ↓
                    Shipped product
```

## Philosophy

Most AI coding tools skip the hard part. You describe an idea, AI generates code, and you get inconsistent results that fall apart at scale. The problem isn't the AI — it's the inputs.

This system enforces a simple rule: **spec before code.** Every feature needs a JTBD spec. Every domain rule needs documentation. Every phase gets explicit implementation decisions before planning starts. The AI reads these specs and builds exactly what was specified.

The result: product decisions live in specs (where PMs can review them), not buried in prompts or code comments.

## Quick Start

### New Project (Greenfield)

```bash
cd your-project
# Copy this template into your project
cp -r ai-sdlc/* .
cp -r ai-sdlc/.claude .

# Launch Claude Code
claude

# Bootstrap
/ai-sdlc:init
```

### Existing Project (Brownfield)

```bash
# Copy template files
cp -r ai-sdlc/.claude .
cp -r ai-sdlc/specs .
cp -r ai-sdlc/design .
cp -r ai-sdlc/.planning .
cp ai-sdlc/CLAUDE.md .

# Launch Claude Code
claude

# Map your codebase first
/ai-sdlc:map-codebase

# Then bootstrap
/ai-sdlc:init
```

## Commands

| Command | Phase | What It Does |
|---------|-------|-------------|
| `/ai-sdlc:init` | Setup | Bootstrap project: questions → specs → roadmap |
| `/ai-sdlc:spec-draft` | PM | Coach through JTBD spec creation |
| `/ai-sdlc:domain-capture` | PM | Extract business rules from conversation |
| `/ai-sdlc:spec-review` | PM | Multi-agent review (engineer, designer, skeptic) |
| `/ai-sdlc:discuss-phase N` | Build | Shape implementation decisions |
| `/ai-sdlc:plan-phase N` | Build | Research + create XML task plans |
| `/ai-sdlc:execute-phase N` | Build | Run plans with fresh context per task |
| `/ai-sdlc:verify-work N` | Build | UAT + automatic debug routing |
| `/ai-sdlc:quick` | Build | Ad-hoc task with SDLC guarantees |
| `/ai-sdlc:progress` | Nav | Where am I? What's next? |
| `/ai-sdlc:map-codebase` | Nav | Analyze existing codebase |
| `/ai-sdlc:generate-agents` | Nav | Rebuild AGENTS.md |

## Directory Structure

```
project/
├── CLAUDE.md                    # System prompt (read by Claude Code)
├── AGENTS.md                    # Auto-generated project map
├── PROJECT.md                   # Vision, problem, hypothesis
├── REQUIREMENTS.md              # v1 / v2 / out-of-scope
├── ROADMAP.md                   # Phases + progress
│
├── specs/                       # [PM TERRITORY]
│   ├── jobs/                    # JTBD specs (product decisions)
│   └── domain/                  # Business rules (timeless truth)
│
├── design/                      # [DESIGNER TERRITORY]
│   ├── components.md            # Component catalog
│   ├── flows.md                 # User flows
│   └── prototype/               # Per-feature UI specs
│
├── STACK.md                     # [ENGINEER TERRITORY]
├── ARCHITECTURE.md              # System design
├── CONVENTIONS.md               # Code patterns
│
├── .planning/                   # Execution state
│   ├── STATE.md                 # Living memory
│   └── phases/                  # Per-phase work
│       └── 01-phase-name/
│           ├── CONTEXT.md       # Implementation decisions
│           ├── RESEARCH.md      # Technical research
│           ├── PLAN.md          # XML task plans
│           ├── SUMMARY.md       # What happened
│           └── VERIFICATION.md  # Did it work?
│
├── .claude/
│   ├── commands/ai-sdlc/        # Slash commands
│   └── agents/                  # Sub-agent definitions
│
├── scripts/                     # Automation
└── docs/                        # Methodology docs
```

## Who Fills What

| File | Owner | When |
|------|-------|------|
| PROJECT.md | PM | Project kickoff |
| REQUIREMENTS.md | PM | After discovery |
| specs/jobs/*.md | PM (or PMCoach) | Before each feature |
| specs/domain/*.md | PM (or PMCoach) | When domain rules surface |
| design/*.md | Designer | After specs, before build |
| STACK.md | Engineer | Project kickoff |
| ARCHITECTURE.md | Engineer | After specs review |
| CONVENTIONS.md | Engineer | Project kickoff |
| .planning/* | System (AI) | During execution |
| AGENTS.md | System (auto) | Regenerated on changes |

## PMCoach Integration

This repo is the output target for PMCoach. PMCoach coaches PMs through spec creation and writes directly to `specs/`. You don't need PMCoach to use this repo — specs can be created manually or via `/ai-sdlc:spec-draft`. PMCoach just makes it faster and higher quality.

## Examples

See `examples/` for complete worked examples of the framework in action:
- **jha-safety-forms/** — Mobile safety compliance forms for construction (shows specs, domain rules, planning, and implementation)

## Credits

Built on patterns from:
- **GSD** (TÂCHES) — Phase execution, XML tasks, multi-agent orchestration
- **PM-OS** — Skills architecture, sub-agent reviewers, context management
- **AI-SDLC Framework** — Role separation, AGENTS.md, domain persistence
