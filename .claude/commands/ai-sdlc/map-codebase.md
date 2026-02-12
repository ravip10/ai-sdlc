## /ai-sdlc:map-codebase — Analyze Existing Codebase

For brownfield projects. Analyzes the existing codebase and generates STACK.md, ARCHITECTURE.md, and CONVENTIONS.md.

### Usage
```
/ai-sdlc:map-codebase
```

### Flow

**Step 1: Scan the project**
- Read package.json / requirements.txt / Cargo.toml (dependencies)
- Read directory structure
- Read key config files (tsconfig, vite config, docker-compose, etc.)
- Sample 5-10 representative source files across the codebase

**Step 2: Generate STACK.md**
```markdown
# Stack

## Runtime
- [Language + version]
- [Framework + version]

## Key Dependencies
| Package | Purpose | Version |
|---------|---------|---------|
| [dep] | [why it's used] | [ver] |

## Infrastructure
- [Database, cache, queue, hosting]

## Dev Tools
- [Testing, linting, build tools]
```

**Step 3: Generate ARCHITECTURE.md**
```markdown
# Architecture

## Overview
[1-2 sentence system description]

## Structure
[Directory layout with purpose annotations]

## Data Model
[Key entities and relationships]

## API Surface
[Routes/endpoints if applicable]

## Key Patterns
[Architecture patterns used — MVC, service layer, etc.]
```

**Step 4: Generate CONVENTIONS.md**
```markdown
# Conventions

## Code Style
[Observed patterns — naming, exports, imports]

## Component Patterns (if frontend)
[How components are structured]

## Testing
[Testing patterns, file locations, frameworks]

## Error Handling
[Observed error handling patterns]

## File Organization
[Where things go — routes, components, utils, types]
```

**Step 5: Present findings**

Show the user what was discovered. Ask:
- "Does this match your understanding of the codebase?"
- "Anything I missed or got wrong?"
- "Any concerns or tech debt I should note?"

Update files based on feedback. These three files become the engineer's territory baseline.
