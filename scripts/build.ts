import { execFile } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { hexToRgb, rgbToHsl } from '../src/convert.js';

interface SourceTokens {
  color: {
    brand: Record<string, string>;
    semanticPalette: Record<string, string>;
  };
  alias: { primary: string };
  font: { sans: string };
}

const source = JSON.parse(await readFile('src/tokens.json', 'utf8')) as SourceTokens;
const brandEntries = Object.entries(source.color.brand);
const formatNumber = (value: number): number => Number(value.toFixed(2));

const expandedBrand = Object.fromEntries(brandEntries.map(([stop, hex]) => {
  const rgb = hexToRgb(hex);
  return [stop, { hex, rgb, hsl: rgbToHsl(rgb).map(formatNumber) }];
}));
const tokens = { color: { brand: expandedBrand }, alias: source.alias, font: source.font };

const theme = [
  '@theme {',
  `  --font-sans: ${source.font.sans};`,
  '',
  ...brandEntries.map(([stop, hex]) => `  --color-brand-${stop}: ${hex};`),
  '}',
  '',
].join('\n');

const shadcn = [
  ':root {',
  `  --font-sans: ${source.font.sans};`,
  ...brandEntries.map(([stop, hex]) => {
    const [hue, saturation, lightness] = rgbToHsl(hexToRgb(hex)).map(formatNumber);
    return `  --brand-${stop}: ${hue} ${saturation}% ${lightness}%;`;
  }),
  '  --primary: var(--brand-500);',
  '}',
  '',
].join('\n');

const json = `${JSON.stringify(tokens, null, 2)}\n`;
const index = [
  `export const tokens = ${JSON.stringify(tokens, null, 2)};`,
  'export const brand = tokens.color.brand;',
  'export const fontSans = tokens.font.sans;',
  '',
].join('\n');
const declarations = `export interface ColorToken {
  readonly hex: string;
  readonly rgb: readonly [number, number, number];
  readonly hsl: readonly [number, number, number];
}

export interface Tokens {
  readonly color: { readonly brand: Readonly<Record<string, ColorToken>> };
  readonly alias: { readonly primary: string };
  readonly font: { readonly sans: string };
}

export declare const tokens: Tokens;
export declare const brand: Tokens['color']['brand'];
export declare const fontSans: string;
`;

const semantic = await readFile('src/styles/semantic.css', 'utf8');
const components = await readFile('src/styles/components.css', 'utf8');
const semanticPalette = [
  ':root {',
  `  --font-sans: ${source.font.sans};`,
  ...brandEntries.map(([name, value]) => `  --color-brand-${name}: ${value};`),
  ...Object.entries(source.color.semanticPalette)
    .map(([name, value]) => `  --sewak-palette-${name}: ${value};`),
  '}',
  '',
].join('\n');

await mkdir('dist', { recursive: true });
await Promise.all([
  writeFile('dist/theme.css', theme),
  writeFile('dist/shadcn.css', shadcn),
  writeFile('dist/tokens.json', json),
  writeFile('dist/index.js', index),
  writeFile('dist/index.d.ts', declarations),
]);

await promisify(execFile)(process.execPath, [
  'node_modules/typescript/bin/tsc',
  '-p',
  'tsconfig.build.json',
]);
await writeFile('dist/components.css', `${semanticPalette}${semantic}\n${components}`);
