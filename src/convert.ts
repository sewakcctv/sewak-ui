export type Rgb = readonly [number, number, number];
export type Hsl = readonly [number, number, number];

export function hexToRgb(hex: string): Rgb {
  const value = hex.slice(1);
  if (!/^[\da-f]{6}$/i.test(value)) throw new Error(`Invalid six-digit hex color: ${hex}`);
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

export function rgbToHsl([red, green, blue]: Rgb): Hsl {
  const [r, g, b] = [red / 255, green / 255, blue / 255];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  if (max === min) return [0, 0, lightness * 100];

  const delta = max - min;
  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  let hue = max === r
    ? ((g - b) / delta) % 6
    : max === g
      ? (b - r) / delta + 2
      : (r - g) / delta + 4;
  hue = (hue * 60 + 360) % 360;
  return [hue, saturation * 100, lightness * 100];
}
