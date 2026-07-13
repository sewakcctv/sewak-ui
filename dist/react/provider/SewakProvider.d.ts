import type { ReactNode } from 'react';
import type { ColorScheme, ResolvedColorScheme } from './color-scheme.js';
export type Density = 'comfortable' | 'compact';
export interface SewakContextValue {
    density: Density;
    colorScheme: ColorScheme;
    resolvedColorScheme: ResolvedColorScheme;
}
export interface SewakProviderProps {
    density?: Density;
    colorScheme?: ColorScheme;
    children: ReactNode;
}
export declare function SewakProvider({ density, colorScheme, children, }: SewakProviderProps): import("react").JSX.Element;
export declare function useSewak(): SewakContextValue;
