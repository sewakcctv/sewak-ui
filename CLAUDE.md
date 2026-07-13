# sewak-ui conventions

This repository is Sewak Security's Phase 1 digital brand-token package. Keep it small, strict, deterministic, and free of runtime dependencies.

## Exports and consumers

- `@sewak/ui/theme.css`: Tailwind v4 `@theme` declarations for Plan Builder, Referral System, and future tools.
- `@sewak/ui/shadcn.css`: space-separated HSL custom properties for the website's shadcn/Tailwind v3 setup.
- `@sewak/ui/tokens.json`: expanded hex/RGB/HSL values for jsPDF, Konva, email, and other non-CSS consumers.
- `@sewak/ui`: typed `tokens`, `brand`, and `fontSans` JavaScript exports.

## Changing tokens

1. Edit `src/tokens.json`, the only authored token source.
2. Run `npm run build` to regenerate committed `dist/`.
3. Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run check:dist`.
4. Bump the package version and commit source plus generated outputs together.
5. Push and wait for green CI before creating the matching version tag.

No authored color value may appear outside `src/tokens.json`. The only unavoidable repetitions are generated `dist/` artifacts and the literal canonical snapshot fixture required to detect visual drift. Do not hand-edit `dist/`, add app-local shadows/animations/utilities, add print typography, or publish this package to npm.
