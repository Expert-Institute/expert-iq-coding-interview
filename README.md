# Expert Review Challenge

This repo is a self-contained TypeScript workspace for a live, paired senior/staff engineering exercise.

It includes:

- a small API-backed product slice
- an intentionally realistic codebase with one seeded logic bug
- a candidate-facing workflow for debugging and feature work
- an interviewer kit with rubric, answer key, and hidden verification assets

## Workspace

- `apps/api` - Express API with Zod validation and Vitest/Supertest
- `apps/web` - Vite + React + TypeScript frontend
- `packages/contracts` - shared domain types and schemas
- `packages/fixtures` - deterministic seed data and in-memory helpers
- `interviewer-kit` - private interviewer artifacts and hidden tests

## Scripts

- `npm install`
- `npm run dev`
- `npm run test`
- `npm run lint`
- `npm run package:candidate`
- `npm run test:author`

## Notes

- The seeded bug is part of the exercise. The visible test suite stays green so the challenge is not reduced to "run tests and fix failures."
- `npm run package:candidate` produces a bundle that excludes `interviewer-kit`.
