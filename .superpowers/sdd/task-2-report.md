# Task 2 report — Semantic tokens, density, and colour scheme

## Status

Complete on `codex/sewak-ui-phase-2-package`.

## Commit

- `0977ceb8edbd71efdd48c11433f8f302c83358c7` — `feat: add semantic themes and density provider`

## Changed files

- `src/react/provider/SewakProvider.tsx` — real provider, context, defaults, subtree attributes, and missing-provider fallback/warning.
- `src/react/provider/color-scheme.ts` — typed colour-scheme contract and live `matchMedia` subscription via `useSyncExternalStore`.
- `src/react/index.ts` — public value and type exports.
- `src/styles/semantic.css` — light/dark semantic roles, density dimensions, radii, shadows, focus, motion, and reduced-motion overrides.
- `src/styles/components.css` — shared subtree box sizing, semantic text colour, and shared font baseline.
- `src/tokens.json` — neutral and status palette source values, keeping authored colours in the canonical token source.
- `scripts/build.ts` — compiles the palette, semantic CSS, and component CSS into the public `dist/components.css` artifact.
- `tests/provider.test.tsx` — provider defaults, explicit values, nesting, system resolution, live changes, explicit-mode subscription avoidance, and missing-provider warning.
- `dist/components.css` — regenerated public stylesheet.
- `dist/react/index.js`
- `dist/react/index.d.ts`
- `dist/react/provider/SewakProvider.js`
- `dist/react/provider/SewakProvider.d.ts`
- `dist/react/provider/color-scheme.js`
- `dist/react/provider/color-scheme.d.ts`

## TDD and verification commands

1. `npm test -- provider.test.tsx`
   - RED: exit 1; 6 of 7 tests failed because `useSewak` did not exist and the provider scaffold emitted no data attributes.
2. `npm test -- provider.test.tsx`
   - Intermediate: exit 1; 5 passed and 2 failed due to DOM not being cleaned between tests. Added explicit Testing Library cleanup.
3. `npm test -- provider.test.tsx`
   - GREEN: exit 0; 7 of 7 tests passed.
4. `npm run typecheck`
   - Exit 0; strict TypeScript passed.
5. `npm run lint`
   - Exit 0; ESLint passed.
6. `npm run check:dist`
   - Initial expected exit 1 after build because the newly generated committed distribution differed from HEAD.
7. `npm test`
   - Exit 0; 4 files and 15 tests passed.
8. `git diff --check`
   - Exit 0; no whitespace errors.
9. `npm run build; git add .; npm run check:dist; npm run lint; npm run typecheck; npm test; git diff --cached --check`
   - Final verification exit 0.
   - Distribution freshness passed.
   - ESLint passed.
   - Strict TypeScript passed.
   - Vitest passed: 4 files, 15 tests, 0 failures.
   - Staged diff whitespace check passed.

## Self-review

- Confirmed the public provider prop signature and exported unions match the approved task brief.
- Confirmed system mode is the only mode that calls and subscribes to `matchMedia`; cleanup removes its listener.
- Confirmed server snapshot resolution is deterministic (`light`) while client system mode resolves and updates from the media query.
- Confirmed nested providers scope attributes and context to their own wrapper subtree.
- Confirmed compact interactive height remains 40px and comfortable height is 44px.
- Confirmed semantic roles cover canvas, surface, elevated, text, muted text, border, primary, success, warning, danger, focus, radii, shadows, motion, and density dimensions.
- Confirmed reduced motion sets shared motion durations to zero.
- Confirmed all authored colour literals remain in `src/tokens.json`; the public CSS literals are generated artifacts.
- Confirmed generated JS, declarations, and CSS were committed together.
- Confirmed the worktree was clean after the commit and no push, tag, merge, deployment, vault edit, or other-repository edit was performed.

## Concerns

- None for Task 2. The documented bootstrap/framework theme mechanism remains consumer integration work; the provider supplies deterministic light server markup and live client resolution as specified.

## Review fix — semantic border non-text contrast

### Status and commit

- Fixed the Important review finding for WCAG 2.2 SC 1.4.11 control-boundary contrast.
- Fix commit: `b34e95afedf9ee29163fb829b3385b136e6252e1` (`fix: ensure semantic borders meet non-text contrast`).
- No push, tag, merge, or deployment was performed.

### Files

- `src/styles/semantic.css` — maps the light border role to `neutral-600` and the dark border role to `neutral-400`, preserving semantic-token-only component usage and using only canonical palette values.
- `tests/semantic-contrast.test.ts` — resolves the authored semantic palette references and enforces a minimum 3:1 border contrast against canvas, surface, and elevated in both colour schemes.
- `dist/components.css` — regenerated public CSS containing the corrected semantic mappings.

### TDD and verification commands

1. `npm test -- semantic-contrast.test.ts`
   - RED: exit 1; 2 of 2 cases failed for the intended contrast regression.
   - Light first failure: 1.1782566861951076:1 against canvas; dark first failure: 2.6621454326460454:1 against canvas.
2. `npm test -- semantic-contrast.test.ts`
   - GREEN after the two semantic mapping changes: exit 0; 1 file and 2 tests passed.
3. `npm run build; npm test -- semantic-contrast.test.ts; npm test; npm run lint; npm run typecheck; npm run check:dist; git diff --check`
   - Build passed; focused contrast tests passed 2/2; full Vitest suite passed 17/17.
   - First lint attempt exited 1 on five forbidden non-null assertions in the new test helper; the helper was corrected with explicit runtime guards.
4. `npm run build; npm test -- semantic-contrast.test.ts; npm test; npm run lint; npm run typecheck; npm run check:dist; git diff --check`
   - Build, focused tests (2/2), full suite (17/17), lint, and typecheck passed.
   - `check:dist` exited 1 solely because the regenerated `dist/components.css` was an intended unstaged difference from `HEAD`.
5. `git add -- src/styles/semantic.css tests/semantic-contrast.test.ts dist/components.css; npm run check:dist; npm run lint; npm run typecheck; npm test; git diff --cached --check`
   - Final verification exit 0: distribution freshness passed, ESLint passed, strict TypeScript passed, Vitest passed 5 files and 17 tests with 0 failures, and the staged diff had no whitespace errors.
