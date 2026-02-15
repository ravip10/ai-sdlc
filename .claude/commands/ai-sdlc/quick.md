## /ai-sdlc:quick — Ad-Hoc Task with SDLC Guarantees

For tasks that don't need full phase planning: bug fixes, small features, config changes.

Same quality guarantees (atomic commits, state tracking) with a faster path.

### Usage
```
/ai-sdlc:quick
/ai-sdlc:quick "Add dark mode toggle to settings"
```

### Flow

**Step 1:** Ask what they want done (if not provided in command).

**Step 2:** Check if this should actually be a phase:
- If it touches multiple specs or requires design → suggest full flow
- If it's a single, well-scoped task → proceed with quick mode

**Step 3:** Create a mini plan (markdown checklist):

```markdown
# Quick Task: [Description]

## Tasks

- [ ] **[Task name]**
  - Files: `[files to modify]`
  - Action: [implementation instructions]
  - Verify: [how to check it works]
  - Done: [success criteria]
```

**Step 4:** Execute immediately.

After completion, mark the task:
```markdown
- [x] **[Task name]**
```

Commit with format: `fix/feat/chore(quick): description`

**Step 5:** Update STATE.md with a log entry.

Quick tasks are tracked in `.planning/STATE.md` under a "Quick Tasks" section, not in phases/.

### Example

```markdown
# Quick Task: Add dark mode toggle

## Tasks

- [x] **Add dark mode toggle to settings page**
  - Files: `src/app/settings/page.tsx`, `src/components/ThemeToggle.tsx`
  - Action: Create ThemeToggle using shadcn Switch component. Use next-themes for theme switching. Add to settings page layout.
  - Verify: Toggle appears, clicking switches between light/dark themes
  - Done: Dark mode persists across page refreshes
```
