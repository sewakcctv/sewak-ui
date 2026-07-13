# sewak-ui conventions

This repository is Sewak Security's shared token, React component, and structural UI package. Keep it strict, deterministic, and free of app-specific behaviour.

## Exports and consumers

- `@sewak/ui/theme.css`: Tailwind v4 `@theme` declarations for Plan Builder, Referral System, and future tools.
- `@sewak/ui/shadcn.css`: space-separated HSL custom properties for the website's shadcn/Tailwind v3 setup.
- `@sewak/ui/tokens.json`: expanded hex/RGB/HSL values for jsPDF, Konva, email, and other non-CSS consumers.
- `@sewak/ui`: typed `tokens`, `brand`, and `fontSans` JavaScript exports.
- `@sewak/ui/react`: shared React components and structural primitives.
- `@sewak/ui/components.css`: compiled semantic, component, and structural styles.

Existing export paths are compatibility commitments. Never export a raw `Toast`; the supported toast API is `ToastProvider` plus `useToast`.

## Component rules

- Consumers compose public APIs and may wrap behaviour, but may not copy/fork component source or restyle `sewak-*` appearance and states.
- Comfortable density is customer-facing; compact density is operational. Both must work in light and dark.
- Use named variants and public props instead of app-local variants or internal selectors.
- Keep proposal/PDF/canvas/chart/business logic and marketing sections app-local.
- New behaviour requires tests first; visual changes require all eight reviewed showcase references.

## Changing tokens

1. Edit `src/tokens.json`, the only authored token source.
2. Run `npm run build` to regenerate committed `dist/`.
3. Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run check:dist`.
4. Run the showcase build and visual matrix when semantic/component output changes.
5. Bump only when an explicitly approved release task requires it; commit source and generated outputs together.
6. Push and tag only with explicit human release approval.

No authored brand or semantic color value may appear outside `src/tokens.json` and the semantic token source. The only unavoidable repetitions are generated `dist/` artifacts and canonical snapshot fixtures required to detect visual drift. Do not hand-edit `dist/`, add app-local shadows/animations/utilities, add print typography, or publish this package to npm.
