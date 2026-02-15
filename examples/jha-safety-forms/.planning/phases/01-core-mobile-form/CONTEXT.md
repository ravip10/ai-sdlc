---
phase: 1
title: Core Mobile Form
status: discussed
specs:
  - specs/jobs/01-field-worker-completes-jha.md
domain:
  - specs/domain/jha-compliance.md
design: []
date: 2025-02-11
---

# Phase 1: Core Mobile Form — Implementation Context

## Decisions

### UI Layout & Density
- **Form structure:** Single scrolling page (fewer taps, faster for experienced users)
- **Input size:** Large touch targets throughout (optimized for gloves, sun glare, field conditions)
- **Hazard table:** Card-based rows (mobile-friendly, easy add/remove, one hazard per card)

### Signatures
- **Capture method:** Type name as signature (faster, legally compliant, no fiddly drawing)
- **Collection flow:** Pass single device around crew (simpler, one form session, no sync complexity)

### States & Feedback
- **Loading:** Skeleton shimmer while form initializes
- **Empty hazard table:** Start with one blank row + "Add hazard" button
- **Submit success:** Full-screen confirmation with checkmark, message "Work can begin"
- **Auto-save:** Debounced save to localStorage every 2 seconds (resume on refresh)

### Form Sections (in order)
1. Job info: date (auto-filled today), location (text), task description (textarea)
2. Crew: crew member names (text, comma-separated or add rows), supervisor name
3. Hazard analysis: cards with step/hazard/control fields, add/remove buttons
4. PPE checklist: large checkboxes for 8 standard items + "other" text field
5. Signatures: typed name + date for each crew member, add row button
6. Submit button (sticky at bottom)

## Deferred to Claude's Discretion
- Exact spacing/padding values
- Animation timing
- Icon choices (use Lucide)
- shadcn/ui component selection

## Out of Scope for This Phase
- Notifications to GC admin/supervisor (Phase 3)
- Offline support (Phase 2)
- Backend persistence (Phase 3)
- Form validation beyond required fields

## Open Questions
- None — ready to plan
