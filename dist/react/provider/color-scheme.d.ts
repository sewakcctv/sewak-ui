export type ColorScheme = 'light' | 'dark' | 'system';
export type ResolvedColorScheme = Exclude<ColorScheme, 'system'>;
export declare function useResolvedColorScheme(colorScheme: ColorScheme): ResolvedColorScheme;
