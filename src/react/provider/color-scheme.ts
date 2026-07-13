import { useSyncExternalStore } from 'react';

export type ColorScheme = 'light' | 'dark' | 'system';
export type ResolvedColorScheme = Exclude<ColorScheme, 'system'>;

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

function getMediaQuery(): MediaQueryList | undefined {
  return typeof window === 'undefined' || typeof window.matchMedia !== 'function'
    ? undefined
    : window.matchMedia(DARK_SCHEME_QUERY);
}

function subscribeToSystemScheme(onStoreChange: () => void): () => void {
  const mediaQuery = getMediaQuery();
  if (!mediaQuery) return () => undefined;

  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

function getSystemScheme(): ResolvedColorScheme {
  return getMediaQuery()?.matches === true ? 'dark' : 'light';
}

export function useResolvedColorScheme(
  colorScheme: ColorScheme,
  systemColorScheme: ResolvedColorScheme = 'light',
): ResolvedColorScheme {
  const systemScheme = useSyncExternalStore(
    colorScheme === 'system' ? subscribeToSystemScheme : () => () => undefined,
    colorScheme === 'system' ? getSystemScheme : () => colorScheme,
    () => colorScheme === 'system' ? systemColorScheme : colorScheme,
  );

  return colorScheme === 'system' ? systemScheme : colorScheme;
}
