---
id: JOB-01
title: Field Worker Completes JHA
status: approved
owner: PM
created: 2025-02-11
requirements: R1-R6 (mobile form, job info, hazard table, PPE, signatures, submission)
domain_refs:
  - specs/domain/jha-compliance.md
---

# Field Worker Completes JHA

## Job Statement
When a field worker arrives at a job site and the crew is waiting to start,
I want to complete the JHA form quickly on my phone,
So I can get the crew working while staying safety compliant.

## Actor
**Field worker** on a construction site. Using a mobile phone, possibly in challenging conditions (sun glare, wearing gloves). Under time pressure — crew is waiting. Needs to complete compliance paperwork before work can begin.

## Trigger
Crew arrives at job site ready to work. Supervisor confirms: "We can't begin until the JHA is done."

## Success Criteria
- Form submitted in under 2 minutes
- All crew signatures collected
- GC admin and supervisor notified
- Crew can start work immediately after submission

## Flow
1. Field worker opens JHA form on mobile device
2. Enters job info: date (auto-filled), location, task description
3. Adds crew members and supervisor name
4. Fills hazard analysis table: job step → hazard → control measure (can add multiple rows)
5. Checks applicable PPE items
6. Passes device to each crew member for signature (or collects verbally and signs on behalf)
7. Submits form
8. System sends notification to GC admin and supervisor
9. Confirmation shown — work can begin

## Edge Cases
| Scenario | Expected Behavior |
|----------|------------------|
| Interrupted mid-form | Auto-save progress; resume where left off |
| No cell signal | Queue submission; sync when back online (Phase 2) |
| Field worker unavailable | Superintendent can complete form on their behalf (delegation) |
| Incomplete data | Allow submission (no strict validation for v1) |

## Domain Dependencies
- [specs/domain/jha-compliance.md](../domain/jha-compliance.md) — required elements, signature rules, delegation rules

## Open Questions
- How do crew members sign? Pass the device around, or individual devices?
- What info is included in the notification? Just "JHA submitted" or a link to view?
- Should we track who submitted vs. who is the "responsible" field worker (for delegation cases)?
