import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import source from '../src/tokens.json' with { type: 'json' };
import { hexToRgb, rgbToHsl } from '../src/convert.js';

const canonicalDeclarations = `  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --color-brand-50: #eff6ff;
  --color-brand-100: #D4E4F4;
  --color-brand-200: #A7C9E8;
  --color-brand-300: #6A9DD4;
  --color-brand-400: #508BCA;
  --color-brand-500: #3874BC;
  --color-brand-600: #3164A4;
  --color-brand-700: #2A5A94;
  --color-brand-800: #214A79;
  --color-brand-900: #18385C;`;

describe('generated token formats', () => {
  it('contains exactly the canonical Tailwind declarations', async () => {
    const theme = await readFile('dist/theme.css', 'utf8');
    expect(theme).toBe(`@theme {\n${canonicalDeclarations}\n}\n`);
  });

  it('round-trips theme hex values exactly', async () => {
    const theme = await readFile('dist/theme.css', 'utf8');
    const entries = [...theme.matchAll(/--color-brand-(\d+): (#[\da-fA-F]+);/g)]
      .map((match) => [match[1], match[2]]);
    expect(Object.fromEntries(entries)).toEqual(source.color.brand);
  });

  it('round-trips shadcn HSL values within display rounding tolerance', async () => {
    const css = await readFile('dist/shadcn.css', 'utf8');
    for (const [stop, hex] of Object.entries(source.color.brand)) {
      const match = css.match(new RegExp(`--brand-${stop}: ([\\d.]+) ([\\d.]+)% ([\\d.]+)%;`));
      expect(match).not.toBeNull();
      const actual = match?.slice(1).map(Number) ?? [];
      const expected = rgbToHsl(hexToRgb(hex));
      expected.forEach((value, index) => expect(actual[index]).toBeCloseTo(value, 1));
    }
  });

  it('expands JSON and exposes the typed API', async () => {
    const expanded = JSON.parse(await readFile('dist/tokens.json', 'utf8')) as {
      color: { brand: Record<string, { hex: string; rgb: number[]; hsl: number[] }> };
      alias: { primary: string };
      font: { sans: string };
    };
    expect(expanded.color.brand['500']?.rgb).toEqual([56, 116, 188]);
    expect(expanded.alias.primary).toBe(source.alias.primary);
    expect(expanded.font.sans).toBe(source.font.sans);

    const api = await import('../dist/index.js');
    expect(api.tokens).toEqual(expanded);
    expect(api.brand).toEqual(expanded.color.brand);
    expect(api.fontSans).toBe(source.font.sans);
  });
});
