# Sewak UI Tokens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and privately publish `@sewak/ui` v1.0.0 as the canonical Sewak Security digital brand-token package.

**Architecture:** `src/tokens.json` is the sole authored color source. A strict TypeScript generator converts it into CSS, expanded JSON, JavaScript, and declarations in committed `dist/`; Vitest parses the generated formats back and enforces canonical consistency.

**Tech Stack:** Node.js 22, TypeScript strict, ESLint, Vitest, GitHub Actions; zero runtime dependencies.

## Global Constraints

- Work only in `sewakcctv/sewak-ui`; never touch consumer repositories.
- Copy canonical token values, casing, and property names exactly.
- Keep every authored color literal exclusively in `src/tokens.json`, except the required canonical test fixture.
- Generate and commit all four specified exports.
- Do not publish to npm.
- Tag `v1.0.0` only after local gates and GitHub CI are green.

---

### Task 1: Package foundation and canonical source

**Files:** Create package/tooling configuration, `src/tokens.json`, and source-validation tests.

- [ ] Write failing tests for canonical source shape, alias resolution, and brand-500 RGB.
- [ ] Run the focused test and confirm failure for missing implementation.
- [ ] Add strict package configuration, linting, TypeScript configuration, and canonical `src/tokens.json`.
- [ ] Implement minimal typed parsing/conversion helpers and confirm focused tests pass.
- [ ] Commit the independently working foundation.

### Task 2: Generated formats and consistency

**Files:** Create `scripts/build.ts`, `dist/theme.css`, `dist/shadcn.css`, `dist/tokens.json`, `dist/index.js`, `dist/index.d.ts`, and format tests.

- [ ] Write failing round-trip and canonical-snapshot tests against absent `dist` files.
- [ ] Confirm the tests fail for the expected missing-output reason.
- [ ] Implement deterministic generation of all outputs from `src/tokens.json`.
- [ ] Build, run tests, and confirm CSS/JSON/programmatic exports agree.
- [ ] Commit generated outputs and generator together.

### Task 3: Documentation and CI quality gate

**Files:** Create `README.md`, `CLAUDE.md`, `.github/workflows/ci.yml`, and repository metadata files.

- [ ] Document installation and one example per export, plus any implementation notes.
- [ ] Document token-change conventions and source-of-truth rule for agents.
- [ ] Add CI steps for install, lint, typecheck, test, build, and `dist` freshness.
- [ ] Run every local gate from a clean install and confirm success.
- [ ] Commit documentation and CI.

### Task 4: Publish and release

**Files:** Git history, GitHub repository settings/status, annotated tag `v1.0.0`.

- [ ] Push `main`, observe GitHub Actions to a successful conclusion, and inspect all job conclusions.
- [ ] Verify repository privacy and required committed exports remotely.
- [ ] Add a final summary commit whose body records built deliverables and implementation notes.
- [ ] Re-run all local gates and wait for final-commit CI to turn green.
- [ ] Create and push `v1.0.0`, then verify the remote tag resolves to the green final commit.

## Self-review

- Spec coverage: repository privacy, exact canon, strict TypeScript, zero runtime dependencies, four exports, tests, freshness, docs, CI, and guarded tag are each assigned.
- Placeholder scan: no deferred implementation placeholders.
- Type consistency: the programmatic API is `tokens`, `brand`, and `fontSans`; output names match package exports.
