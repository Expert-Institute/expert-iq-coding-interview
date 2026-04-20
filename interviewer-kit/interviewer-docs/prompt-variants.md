# Prompt Variants

Use the same repo and rotate one of these feature prompts after the debug round.

## Variant A: Review Flag

Add the ability for internal reviewers to flag an expert profile for review from the queue.

Required MVP:
- backend endpoint
- request validation
- UI action from the list
- visible flagged state

## Variant B: Review Owner

Add the ability for an internal reviewer to claim an expert profile for follow-up from the queue.

Required MVP:
- endpoint to assign `reviewOwner`
- list view should show owner state
- no concurrency handling required for MVP

## Variant C: Review Note Preview

Add a lightweight internal note preview to the queue so a reviewer can save a short note and see it inline on the table.

Required MVP:
- endpoint to save a short note
- table display of saved note preview
- input validation
