# Answer Key

## Seeded Bug

Root cause:
- `apps/api/src/service.ts`
- Specialty filtering is applied after pagination.
- `pagination.total` is calculated from the unfiltered review-scoped list.

Symptoms:
- Specialty-filtered results can show too few items on a page.
- Total counts remain wrong while the specialty filter is active.
- At larger scale, the current implementation would also waste work by paginating the wrong set before narrowing it.

Good fix shape:
- Filter the review-scoped collection by specialty before paginating.
- Compute `total` from the fully filtered collection.
- Preserve current response shape and available specialty list.

Passing answers:
- Candidate identifies the service-layer ordering bug and fixes both page contents and total count.

Strong answers:
- Candidate talks about filtering at the data source in a real system.
- Candidate mentions tests for totals, page boundaries, and combined filters.
- Candidate notices that UI symptoms were downstream of backend logic, not a frontend-only issue.

Fail signals:
- Candidate only patches the UI count.
- Candidate treats it as a rendering bug without tracing the API.
- Candidate accepts AI output that "works" without checking the contract or totals.

## Extension Problem

Acceptable MVP:
- `POST /api/experts/:expertId/review-flag`
- require `reason` and `flaggedBy`
- overwrite or create a single active review flag
- show flagged state in the queue UI

Strong implementation signals:
- validation at the boundary
- shared types/contracts
- clear state update path after submission
- candidate can explain what they would do for audit/history later

Trapdoor answers to watch for:
- adding a boolean only with no way to explain why the profile was flagged
- adding excessive infrastructure for an MVP
- skipping validation entirely because "it is internal"

## Reflection

Good reflection answers mention:
- missing edge-case tests
- hidden scale concerns around filtering, pagination, or persistence
- future audit/history needs for review flags
- tradeoffs made to keep the MVP tight
