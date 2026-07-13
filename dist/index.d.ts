export interface ColorToken {
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
