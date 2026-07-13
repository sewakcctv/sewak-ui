# @sewak/ui

Sewak Security's shared foundations, React components, and application-shell primitives. The same implementation supports comfortable customer experiences and compact operational tools in light or dark colour schemes.

The package version remains `1.0.0` while Phase 2 is under review. Do not cut or consume a Phase 2 release tag until the pilot review is approved.

## Installation

Install an immutable HTTPS tag tarball. Replace `<approved-tag>` only with the exact tag approved for the coordinated pilots:

```bash
npm install "https://github.com/sewakcctv/sewak-ui/archive/refs/tags/<approved-tag>.tar.gz"
```

Do not use a floating branch, Git dependency, local copy, or `github:` shorthand. The shorthand can resolve to `git+ssh` and break `npm ci` in environments without GitHub SSH keys.

React and React DOM 18.2–19 are peer dependencies.

## CSS and provider setup

Import shared CSS before application CSS. Product CSS may position a component through `className`, but must not restyle `sewak-*` states or duplicate shared rules.

```tsx
import '@sewak/ui/theme.css';      // Tailwind v4 foundations, if used
import '@sewak/ui/components.css'; // semantic tokens + shared components
import './app.css';                // product-specific layout only

import { SewakProvider, ToastProvider } from '@sewak/ui/react';

export function Root({ children }: { children: React.ReactNode }) {
  return (
    <SewakProvider density="compact" colorScheme="system">
      <ToastProvider>{children}</ToastProvider>
    </SewakProvider>
  );
}
```

Tailwind v3/shadcn consumers import `@sewak/ui/shadcn.css` before `components.css`. Do not import both `theme.css` and `shadcn.css` in one consumer unless its existing build explicitly needs both token formats.

Provider order is `SewakProvider` → optional app providers → `ToastProvider` → application. A missing `SewakProvider` falls back to comfortable/system and warns once in development.

### SSR colour-scheme bootstrap

For `colorScheme="system"`, run this inline script in `<head>` before CSS paints, or use the framework's existing equivalent. Keep the provider set to `system`; the bootstrap only supplies the first resolved value.

```html
<script>
  document.documentElement.dataset.sewakColorScheme =
    matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
</script>
```

If the framework theme mechanism already emits deterministic light/dark markup, pass that resolved scheme to the initial provider render instead. Avoid rendering one scheme on the server and changing it only after hydration.

## React API

Import all components and their TypeScript types from `@sewak/ui/react`.

| Group | Public components | Key contract |
| --- | --- | --- |
| Provider | `SewakProvider`, `useSewak` | `density`: `comfortable \| compact`; `colorScheme`: `light \| dark \| system` |
| Controls | `Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Field` | Forward refs; native DOM props; named variants/sizes; Field links labels, descriptions, and errors |
| Surfaces | `Card`, `Badge`, `Alert`, `EmptyState`, `Skeleton`, `Spinner`, `Separator` | Semantic status variants; empty/loading states remain readable at narrow widths |
| Feedback | `ToastProvider`, `useToast`, `Tooltip` | Trigger toasts with `useToast().toast(...)`; there is intentionally **no raw `Toast` API** |
| Overlays | `Dialog`, `ConfirmDialog`, `DropdownMenu`, `Drawer` | Radix-managed keyboard interaction, escape, focus trap, and focus return |
| Data | `Table`, `Pagination`, `Tabs`, `StatCard` | Tables require captions; pagination and tabs expose controlled callbacks |
| Structure | `AppShell`, `Header`, `Sidebar`, `MobileNav`, `PageHeader`, `ContentSection`, `ActionBar` | Shared responsive shell; `mainId` makes skip-link targets unique; `mainRole`/`mainLabel` support embedded shell demos |

Example:

```tsx
import { Button, Card, Field, Input, useToast } from '@sewak/ui/react';

function SiteEditor() {
  const { toast } = useToast();
  return (
    <Card>
      <Field label="Site name" required><Input name="siteName" /></Field>
      <Button onClick={() => toast({ title: 'Site saved', variant: 'success' })}>
        Save site
      </Button>
    </Card>
  );
}
```

## Density and scheme guidance

- Use `comfortable` for the Website and customer-facing flows. Use `compact` for Plan Builder and other operational tools.
- Density changes spacing and dimensions, never meaning, hierarchy, focus, keyboard behaviour, or colour.
- Use `system` when the product already follows the OS. Explicit `light`/`dark` is appropriate for a persisted user selection or deterministic visual testing.
- Keep nested providers exceptional and limited to embedded surfaces that truly need an independent scheme.
- Shared interactive targets remain at least 40 px in compact density.

## Wrappers and no-fork rule

Product wrappers may compose shared components, supply defaults, connect routing/state, and add product behaviour. They may not copy component source, reach into package internals, duplicate `sewak-*` CSS, replace appearance through `className`, or create app-local variants. If an API is missing, propose it in this package with tests and pilot evidence.

Marketing sections, proposal steps, PDFs, camera/network canvases, charts, and business logic remain local. Local CSS owns only product-specific composition and layout.

## Pilot mappings

| Existing pilot area | Shared mapping | Remains local |
| --- | --- | --- |
| Plan Builder frame | `SewakProvider density="compact"`, `AppShell`, `Header`, `Sidebar`, `MobileNav` | Workflow state, URLs, API/PDF logic |
| Plan Builder forms/actions | `Field`, controls, `ContentSection`, `ActionBar`, dialogs/toasts | Validation rules and proposal calculations |
| Website frame | `SewakProvider density="comfortable"`, `Header`, `PageHeader`, `ContentSection` | Marketing composition, SEO, content, analytics/referral attribution |
| Website forms/feedback | Shared controls, `Alert`, `ToastProvider`/`useToast`, overlays | Submission endpoints and tracking |
| Referral System / NDT | No migration in this phase | Track as follow-up after both pilots validate |

## Accessibility and keyboard behaviour

Native controls retain native keyboard behaviour. Tabs use Left/Right arrows. Dialogs, drawers, dropdowns, and tooltips use Radix focus/escape behaviour. Mobile navigation closes on activation or Escape. Focus indicators, form error association, announcements, reduced motion, narrow-screen overflow, and all density/scheme combinations are automated gates; pilots still require manual keyboard review.

## Tokens and non-React consumers

Existing exports remain unchanged: `@sewak/ui`, `theme.css`, `shadcn.css`, and `tokens.json`. Expanded JSON supports jsPDF, Konva, email, and other non-CSS consumers.

```ts
import { brand, fontSans, tokens } from '@sewak/ui';
import expanded from '@sewak/ui/tokens.json' with { type: 'json' };

console.log(brand['500'].hex, fontSans, tokens.alias.primary, expanded.color.brand['500'].rgb);
```

## Showcase and development

```bash
npm install
npm run showcase
npm run lint
npm run typecheck
npm test
npm run build
npm run check:dist
npm run showcase:build
npm run test:visual
```

The showcase accepts `?density=comfortable|compact&scheme=light|dark`. Playwright checks all four combinations at 390×844 and 1440×900, with axe, horizontal-overflow assertions, and reviewed screenshots.

`dist/` and visual references are committed. `showcase-dist/`, reports, and test results are generated locally and ignored.

## Review notes and limitations

Phase 2 adds the React/component/shell contract while preserving all token exports. It does not migrate either pilot, generalize marketing or proposal layouts, or release an RC. System-scheme flash prevention depends on consumer SSR bootstrap/framework integration. Manual keyboard and deployed pilot reviews remain required before a stable release.
