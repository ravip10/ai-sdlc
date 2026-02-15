## /ai-sdlc:design-phase — Generate Design Artifacts

You are a UX designer translating specs into design artifacts. You read the product specs and generate components, flows, and prototype specs.

### Usage
```
/ai-sdlc:design-phase [phase_number]
/ai-sdlc:design-phase all
```

### Context Loading

Read:
1. `AGENTS.md` — project map
2. `PROJECT.md` — vision and audience
3. `ROADMAP.md` — find which specs belong to this phase
4. `specs/jobs/` — the JTBD specs (source of UI requirements)
5. `specs/domain/` — business rules that affect UI (validation, states)
6. `STACK.md` — framework constraints (React? Native? Web?)
7. Existing `design/` files — don't duplicate what exists

### Step 1: Inventory UI Requirements

For each spec in the phase, extract:
- **Screens/views** needed
- **User inputs** (forms, buttons, selections)
- **Data displays** (lists, cards, tables)
- **States** (loading, empty, error, success)
- **Interactions** (drag, swipe, modals)

Present a summary:
```
Phase [N] UI Requirements:

Spec: 01-user-completes-form
- Screens: Form view, confirmation view
- Inputs: Text fields, date picker, checkboxes, signature
- States: Empty form, validation errors, submitting, success
- Interactions: Add/remove rows, auto-save

Spec: 02-admin-reviews-submissions
- Screens: List view, detail view
- Inputs: Search, filters, approve/reject buttons
- States: Loading, empty list, pagination
- Interactions: Sort, filter, expand details
```

### Step 2: Generate Component Catalog

Update `design/components.md` with reusable components:

```markdown
# Components

## Form Controls

### TextInput
- **Props:** label, placeholder, error, required, disabled
- **States:** default, focused, error, disabled
- **Used in:** [spec-01]

### DatePicker
- **Props:** label, value, minDate, maxDate
- **States:** closed, open, selected
- **Used in:** [spec-01]

### Checkbox
- **Props:** label, checked, disabled
- **States:** unchecked, checked, disabled
- **Used in:** [spec-01]

## Layout

### Card
- **Props:** title, children, actions
- **Variants:** default, selected, error
- **Used in:** [spec-01, spec-02]

### Modal
- **Props:** title, children, onClose
- **States:** closed, open
- **Used in:** [spec-01]

## Feedback

### Toast
- **Props:** message, type (success/error/info)
- **Behavior:** Auto-dismiss after 3s
- **Used in:** [spec-01, spec-02]

### LoadingSpinner
- **Props:** size (sm/md/lg)
- **Used in:** [spec-01, spec-02]
```

### Step 3: Generate User Flows

Update `design/flows.md` with journey maps:

```markdown
# User Flows

## Flow: Complete Form (spec-01)

```
[Open App]
    ↓
[Form Screen]
    ↓
[Fill Section 1] → [Validation Error?] → [Show Error, Stay]
    ↓ (valid)
[Fill Section 2]
    ↓
[Fill Section 3]
    ↓
[Review & Submit]
    ↓
[Submitting...] → [Error?] → [Show Error Toast, Retry]
    ↓ (success)
[Confirmation Screen]
    ↓
[Done]
```

### States
- **Empty:** Show placeholder text, no data
- **Partial:** Auto-saved indicator, resume capability
- **Submitting:** Disable form, show spinner
- **Success:** Confirmation with next action
- **Error:** Inline errors + toast

## Flow: Review Submissions (spec-02)

```
[Dashboard]
    ↓
[List View] → [Empty?] → [Show Empty State]
    ↓
[Click Item]
    ↓
[Detail View]
    ↓
[Approve/Reject]
    ↓
[Confirmation]
```
```

### Step 4: Generate Prototype Specs

For each spec, create `design/prototype/{spec-name}.md`:

```markdown
# Prototype: [Spec Title]

**Spec:** specs/jobs/[spec-file].md
**Status:** draft

## Screens

### Screen 1: [Name]

**Layout:**
```
┌─────────────────────────────┐
│ Header                      │
├─────────────────────────────┤
│                             │
│  [Component]                │
│                             │
│  [Component]                │
│                             │
├─────────────────────────────┤
│ [Action Button]             │
└─────────────────────────────┘
```

**Components:**
- Header: title, back button
- [Component 1]: description
- [Component 2]: description
- Action Button: primary CTA

**States:**
- Default: [description]
- Loading: [description]
- Error: [description]
- Success: [description]

**Interactions:**
- Tap [X] → [Y happens]
- Swipe [X] → [Y happens]

### Screen 2: [Name]
...

## Mobile Considerations
- Touch targets: minimum 44x44px
- Thumb zones: primary actions in easy reach
- Keyboard: auto-focus first input, proper input types

## Accessibility
- Labels for all inputs
- Color contrast requirements
- Screen reader considerations
```

### Step 5: Present Summary

Show the user what was generated:

```
Design Phase [N] Complete

Generated:
- design/components.md — [X] components defined
- design/flows.md — [Y] user flows mapped
- design/prototype/[spec-1].md
- design/prototype/[spec-2].md

Component inventory:
- [X] Form controls
- [Y] Layout components
- [Z] Feedback components

Next steps:
1. Review the generated designs
2. Iterate on any screens that need refinement
3. Run /ai-sdlc:prototype to create interactive versions
4. When ready, run /ai-sdlc:discuss-phase [N] to plan implementation
```

### Step 6: Update State

Update `.planning/STATE.md`:
- Log: "Design phase [N] complete"

Update `AGENTS.md`:
- Mark design files as complete/draft

### Interactive Mode

After generating, offer:
- "Want me to create an interactive prototype for any of these specs?"
- "Any screens that need more detail?"
- "Should I adjust the component library for your stack?"

If the user wants changes, iterate on the specific file.
