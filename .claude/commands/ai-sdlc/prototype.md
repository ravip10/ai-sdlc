## /ai-sdlc:prototype — Generate Interactive Prototype

Create a working prototype from specs and design docs using **shadcn/ui components**.

### Context Loading

Read:
1. `specs/jobs/` — what the feature does
2. `design/prototype/` — UI specs if they exist
3. `design/components.md` — component library (shadcn mappings)
4. `design/flows.md` — user flows
5. `STACK.md` — framework (Next.js, React, etc.)

### Flow

**Step 1: Ask what to prototype**
- "Which spec or feature do you want to prototype?"
- If design specs exist, reference them. If not, offer to sketch UI from the spec.

**Step 2: Choose output format**
Ask user preference:
- **React + shadcn** — Full component with shadcn/ui (recommended)
- **v0.dev prompt** — Prompt for v0 (uses shadcn natively)
- **HTML artifact** — Quick preview (shadcn styling approximated)

**Step 3: Generate with shadcn**

Always use shadcn/ui components:
- `Button`, `Input`, `Card`, `Dialog`, `Select`, `Table`, etc.
- Use `sonner` for toasts
- Use `react-hook-form` + `zod` for form handling
- Follow shadcn patterns: composition over configuration

Example structure:
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function FeaturePrototype() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Name</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Implementation */}
      </CardContent>
    </Card>
  )
}
```

For v0 prompts: Always specify "use shadcn/ui components" and list the specific components needed.

**Step 4: Iterate**
Ask: "How does this look? What should change?"
Iterate until the user is satisfied.

**Step 5: Save (optional)**
Offer to save the prototype:
- As a component: `src/components/prototypes/{feature}.tsx`
- Update design spec: `design/prototype/{spec}.md` with final decisions

**Note:** Prototypes validate UX before engineering. They may not be production-ready but should use real shadcn components for accurate feel.
