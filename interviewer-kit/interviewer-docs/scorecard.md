# Scorecard

Score each dimension from `1` to `4`.

## 1. Judgment Under Ambiguity

- `1` Jumped into coding with little framing, missed important constraints, or made brittle assumptions without naming them.
- `2` Asked a few useful questions but missed consequential product or data-model tradeoffs.
- `3` Scoped thoughtfully, surfaced the right ambiguities, and made solid MVP choices.
- `4` Drove the ambiguity reduction themselves, made crisp tradeoffs, and clearly separated MVP from future hardening.

## 2. Technical Quality

- `1` Code mostly works or almost works, but structure, contracts, edge cases, or state handling would make the PR hard to approve.
- `2` Shipped something serviceable with noticeable weaknesses in modeling, validation, or maintainability.
- `3` Produced code you would be comfortable reviewing and merging with modest feedback.
- `4` Produced clean, well-shaped code with strong boundaries, sensible contracts, and good taste under time pressure.

## 3. Debugging And Code Reading

- `1` Mostly poked around or ran random changes without a clear model of the system.
- `2` Eventually found the issue, but the path was noisy or shallow.
- `3` Built and tested reasonable hypotheses, traced behavior across layers, and explained the root cause.
- `4` Read the system quickly, found the bug with discipline, and articulated deeper implications like pagination correctness or scale.

## 4. Communication

- `1` Hard to follow, defensive, or did not expose reasoning.
- `2` Communicated enough to work with, but tradeoffs or assumptions stayed fuzzy.
- `3` Clear, collaborative, and easy to pair with.
- `4` Especially strong at teaching their thinking, handling pushback, and keeping the session aligned.

## Hiring Notes Template

- Evidence for strongest dimension:
- Evidence for weakest dimension:
- Would I want to review this PR?
- Final recommendation:
