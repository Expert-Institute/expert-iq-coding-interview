# Interviewer Guide

## Goal

Run a live, paired exercise that reveals how a senior or staff engineer reads code, debugs, handles ambiguity, and chooses pragmatic tradeoffs in a small product slice.

## Timing

1. `0:00-0:05` Setup and framing
2. `0:05-0:20` Debug existing behavior issue
3. `0:20-0:50` Implement the review-flag feature
4. `0:50-1:00` Reflection and debrief

## Opening Script

Use this wording or something very close to it:

> Please think out loud when you can. If something is ambiguous, ask when it matters or make a reasonable assumption and tell me.

## Challenge Flow

### Part 1: Debug

Prompt:

> We’ve been told the expert review queue behaves inconsistently when people filter by specialty. Please investigate, explain what you find, and make a fix you’d be comfortable shipping.

Watch for:

- whether they read before poking
- whether they form a hypothesis
- whether they notice pagination and total-count correctness

### Part 2: Extend

Prompt:

> We want internal reviewers to be able to flag an expert profile for review from the queue. Please implement the backend and UI changes needed for an MVP.

If they ask good clarifying questions, answer consistently:

- One active flag per expert is enough for now.
- No audit history is required for MVP.
- A reason and reviewer name are required.
- It is okay to state what you would add later.

If they ask about auth, background jobs, notifications, or persistence durability:

- Wave those off for now and ask them to state the assumption they are making.

### Part 3: Reflection

Ask all four:

- What did you cut for time?
- What would you want code review to catch?
- How would this break at 100x scale?
- If you had to ship this tomorrow, what is the minimum extra work you would want?
