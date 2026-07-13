import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useResolvedColorScheme } from './color-scheme.js';
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

const SewakContext = createContext<SewakContextValue | undefined>(undefined);
const fallbackValue: SewakContextValue = {
  density: 'comfortable',
  colorScheme: 'system',
  resolvedColorScheme: 'light',
};
let hasWarnedAboutMissingProvider = false;

export function SewakProvider({
  density = 'comfortable',
  colorScheme = 'system',
  systemColorScheme = 'light',
  children,
}: SewakProviderProps) {
  const resolvedColorScheme = useResolvedColorScheme(colorScheme, systemColorScheme);
  const value: SewakContextValue = { density, colorScheme, resolvedColorScheme };

  return (
    <SewakContext.Provider value={value}>
      <div
        data-sewak-density={density}
        data-sewak-color-scheme={resolvedColorScheme}
      >
        {children}
      </div>
    </SewakContext.Provider>
  );
}

export function useSewak(): SewakContextValue {
  const value = useContext(SewakContext);
  if (value) return value;

  if (process.env.NODE_ENV !== 'production' && !hasWarnedAboutMissingProvider) {
    hasWarnedAboutMissingProvider = true;
    console.warn('useSewak() was called outside SewakProvider; using comfortable/system defaults.');
  }

  return fallbackValue;
}
