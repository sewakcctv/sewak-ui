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
    /** Resolved system scheme embedded in SSR markup to keep hydration and first paint deterministic. */
    systemColorScheme?: ResolvedColorScheme;
    children: ReactNode;
}
export declare function SewakProvider({ density, colorScheme, systemColorScheme, children, }: SewakProviderProps): import("react").JSX.Element;
export declare function useSewak(): SewakContextValue;
