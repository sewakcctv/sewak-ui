import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import source from '../src/tokens.json' with { type: 'json' };

const linearize = (channel: number): number => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string): number => {
  const channels = hex.match(/[\da-f]{2}/gi)?.map((channel) => linearize(Number.parseInt(channel, 16)));
  if (!channels || channels.length !== 3) throw new Error(`Invalid hex colour: ${hex}`);
  const [red, green, blue] = channels;
  if (red === undefined || green === undefined || blue === undefined) {
    throw new Error(`Invalid hex colour: ${hex}`);
  }
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrastRatio = (first: string, second: string): number => {
  const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  if (lighter === undefined || darker === undefined) throw new Error('Expected two luminance values');
  return (lighter + 0.05) / (darker + 0.05);
};

describe('semantic border contrast', () => {
  it.each(['light', 'dark'] as const)(
    'keeps the %s border at 3:1 or greater against every surface',
    async (scheme) => {
      const css = await readFile('src/styles/semantic.css', 'utf8');
      const block = css.match(new RegExp(`\\[data-sewak-color-scheme='${scheme}'\\] \\{([\\s\\S]*?)\\n\\}`))?.[1];
      expect(block).toBeDefined();

      const role = (name: string): string => {
        const paletteName = block?.match(new RegExp(`--sewak-color-${name}: var\\(--sewak-palette-([\\w-]+)\\);`))?.[1];
        expect(paletteName, `missing ${name} palette reference for ${scheme}`).toBeDefined();
        return source.color.semanticPalette[paletteName as keyof typeof source.color.semanticPalette];
      };

      const border = role('border');
      for (const surface of ['canvas', 'surface', 'elevated']) {
        expect(
          contrastRatio(border, role(surface)),
          `${scheme} border must contrast with ${surface}`,
        ).toBeGreaterThanOrEqual(3);
      }
    },
  );
});

describe('Task 4 semantic foreground contrast', () => {
  it.each(['light', 'dark'] as const)('keeps actual %s component text pairs at WCAG AA', async (scheme) => {
    const css = await readFile('src/styles/semantic.css', 'utf8');
    const block = css.match(new RegExp(`\\[data-sewak-color-scheme='${scheme}'\\] \\{([\\s\\S]*?)\\n\\}`))?.[1];
    const role = (name:string):string => { const palette=block?.match(new RegExp(`--sewak-color-${name}: var\\(--(?:sewak-palette-|color-brand-)([\\w-]+)\\);`))?.[1]; expect(palette,`missing ${name} for ${scheme}`).toBeDefined(); const value=source.color.semanticPalette[palette as keyof typeof source.color.semanticPalette]??source.color.brand[palette as keyof typeof source.color.brand]; expect(value,`missing palette ${palette}`).toBeDefined(); return value };
    const pairs:[string,string][]=[['text','surface'],['text','elevated'],['text-muted','surface'],['text-muted','elevated'],['primary-text','primary'],['success','elevated'],['warning','elevated'],['danger','elevated']];
    for(const [foreground,background] of pairs) expect(contrastRatio(role(foreground),role(background)),`${scheme} ${foreground} on ${background}`).toBeGreaterThanOrEqual(4.5);
  });
});
