# @sewak/ui

Sewak Security's private, versioned source of truth for digital brand tokens: the Sewak Blue scale and Inter font stack. It has zero runtime dependencies and generates every distributed format from `src/tokens.json`.

## Install

```bash
npm install "@sewak/ui@github:sewakcctv/sewak-ui#v1.0.0"
```

## Usage

Tailwind v4 theme tokens:

```css
@import "@sewak/ui/theme.css";
```

shadcn/Tailwind v3 HSL properties:

```css
@import "@sewak/ui/shadcn.css";
```

Expanded JSON for non-CSS consumers:

```ts
import tokens from '@sewak/ui/tokens.json' with { type: 'json' };

const primaryRgb = tokens.color.brand['500'].rgb;
```

Typed programmatic API:

```ts
import { brand, fontSans, tokens } from '@sewak/ui';

const primary = brand['500'];
console.log(primary.hex, fontSans, tokens.alias.primary);
```

## Development

Edit only `src/tokens.json`, then run:

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
npm run check:dist
```

`dist/` is intentionally committed because consumers install from GitHub and there is no registry build hook.

## Implementation notes

- HSL channels are generated to two decimal places; tests compare them within rounding tolerance.
- `primary` remains the semantic reference `brand.500`; CSS exposes it as `var(--brand-500)` and programmatic formats retain the reference string.
- Local development was moved from Google Drive to a normal local filesystem because the sync driver produced npm `EBADF`/`EPERM` errors while creating `node_modules`. This does not affect repository contents or CI.
- Authored color literals live only in `src/tokens.json`. The committed generated files and the required canonical snapshot test necessarily repeat them as verification artifacts.
