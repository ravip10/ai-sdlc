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

**Step 3:** Create a mini plan:

```xml
<plan id="quick-[NNN]" title="[Description]">
  <task type="auto">
    <n>[Task]</n>
    <files>[files]</files>
    <action>[instructions]</action>
    <verify>[check]</verify>
    <done>[success]</done>
  </task>
</plan>
```

**Step 4:** Execute immediately. Commit with format `fix/feat/chore(quick): description`

**Step 5:** Update STATE.md with a log entry.

Quick tasks are tracked in `.planning/STATE.md` under a "Quick Tasks" section, not in phases/.
