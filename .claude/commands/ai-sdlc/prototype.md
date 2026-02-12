## /ai-sdlc:prototype — Generate Interactive Prototype

Create a working prototype from specs and design docs. Supports v0, Lovable, Bolt, or direct HTML/React.

### Context Loading

Read:
1. `specs/jobs/` — what the feature does
2. `design/prototype/` — UI specs if they exist
3. `design/components.md` — component library
4. `design/flows.md` — user flows

### Flow

**Step 1: Ask what to prototype**
- "Which spec or feature do you want to prototype?"
- If design specs exist, reference them. If not, offer to sketch UI from the spec.

**Step 2: Choose output format**
Ask user preference:
- **HTML artifact** — quick, runs right here
- **React component** — for projects using React
- **v0.dev prompt** — generates a prompt to paste into v0
- **Lovable/Bolt prompt** — generates a prompt for those tools

**Step 3: Generate**

For HTML/React: Create the prototype directly with working interactions, realistic data, and proper states (loading, empty, error, success).

For tool prompts: Generate a detailed prompt that includes:
- Feature description from spec
- UI requirements from design docs
- Specific component and interaction requirements
- Sample data
- State requirements

**Step 4: Iterate**
Ask: "How does this look? What should change?"
Iterate until the user is satisfied.

**Note:** Prototypes are for validation, not production. They help PMs and designers align before engineering plans are created.
