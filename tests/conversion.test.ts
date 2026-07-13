import source from '../src/tokens.json' with { type: 'json' };
import { describe, expect, it } from 'vitest';
import { hexToRgb } from '../src/convert.js';

describe('canonical token source', () => {
  it('contains the ten ordered brand stops', () => {
    expect(Object.keys(source.color.brand)).toEqual([
      '50', '100', '200', '300', '400', '500', '600', '700', '800', '900',
    ]);
  });

  it('resolves primary to brand 500', () => {
    const [, stop] = source.alias.primary.split('.');
    expect(source.color.brand[stop as keyof typeof source.color.brand]).toBe(source.color.brand['500']);
  });

  it('converts brand 500 to its canonical RGB triple', () => {
    expect(hexToRgb(source.color.brand['500'])).toEqual([56, 116, 188]);
  });
});
