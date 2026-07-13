// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { act, cleanup, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SewakProvider, useSewak } from '../src/react/index.js';

type ChangeListener = (event: MediaQueryListEvent) => void;

function installMatchMedia(initialMatches = false) {
  let matches = initialMatches;
  const listeners = new Set<ChangeListener>();
  const mediaQuery = {
    get matches() { return matches; },
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: vi.fn((_type: string, listener: ChangeListener) => listeners.add(listener)),
    removeEventListener: vi.fn((_type: string, listener: ChangeListener) => listeners.delete(listener)),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;

  const matchMedia = vi.fn(() => mediaQuery);
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: matchMedia });

  return {
    matchMedia,
    mediaQuery,
    setMatches(nextMatches: boolean) {
      matches = nextMatches;
      const event = { matches, media: mediaQuery.media } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
}

function ContextProbe({ label = 'context' }: { label?: string }) {
  const value = useSewak();
  return <output data-testid={label}>{JSON.stringify(value)}</output>;
}

function Surface({ children }: { children?: ReactNode }) {
  return <div data-testid="surface">{children}</div>;
}

describe('SewakProvider', () => {
  afterEach(cleanup);

  beforeEach(() => {
    installMatchMedia(false);
  });

  it('defaults to comfortable density and the system colour scheme', () => {
    render(<SewakProvider><ContextProbe /></SewakProvider>);

    const provider = screen.getByTestId('context').parentElement;
    expect(provider).toHaveAttribute('data-sewak-density', 'comfortable');
    expect(provider).toHaveAttribute('data-sewak-color-scheme', 'light');
    expect(screen.getByTestId('context')).toHaveTextContent(
      '{"density":"comfortable","colorScheme":"system","resolvedColorScheme":"light"}',
    );
  });

  it('sets explicit compact and dark attributes', () => {
    render(
      <SewakProvider density="compact" colorScheme="dark">
        <ContextProbe />
      </SewakProvider>,
    );

    const provider = screen.getByTestId('context').parentElement;
    expect(provider).toHaveAttribute('data-sewak-density', 'compact');
    expect(provider).toHaveAttribute('data-sewak-color-scheme', 'dark');
  });

  it('allows a nested provider to override its subtree', () => {
    render(
      <SewakProvider density="compact" colorScheme="dark">
        <ContextProbe label="outer" />
        <SewakProvider density="comfortable" colorScheme="light">
          <ContextProbe label="inner" />
        </SewakProvider>
      </SewakProvider>,
    );

    expect(screen.getByTestId('outer').parentElement).toHaveAttribute('data-sewak-density', 'compact');
    expect(screen.getByTestId('inner').parentElement).toHaveAttribute('data-sewak-density', 'comfortable');
    expect(screen.getByTestId('inner').parentElement).toHaveAttribute('data-sewak-color-scheme', 'light');
  });

  it('resolves system mode through prefers-color-scheme', () => {
    const media = installMatchMedia(true);
    render(<SewakProvider><Surface /></SewakProvider>);

    expect(screen.getByTestId('surface').parentElement).toHaveAttribute('data-sewak-color-scheme', 'dark');
    expect(media.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    expect(media.mediaQuery.addEventListener).toHaveBeenCalledOnce();
  });

  it('responds to live system colour-scheme changes', () => {
    const media = installMatchMedia(false);
    render(<SewakProvider><ContextProbe /></SewakProvider>);

    act(() => media.setMatches(true));

    expect(screen.getByTestId('context').parentElement).toHaveAttribute('data-sewak-color-scheme', 'dark');
    expect(screen.getByTestId('context')).toHaveTextContent('"resolvedColorScheme":"dark"');
  });

  it('does not subscribe to system changes for an explicit scheme', () => {
    const media = installMatchMedia(false);
    render(<SewakProvider colorScheme="light"><Surface /></SewakProvider>);

    expect(media.matchMedia).not.toHaveBeenCalled();
  });

  it('falls back to defaults and warns once when useSewak has no provider', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    render(<><ContextProbe label="first" /><ContextProbe label="second" /></>);

    expect(screen.getByTestId('first')).toHaveTextContent(
      '{"density":"comfortable","colorScheme":"system","resolvedColorScheme":"light"}',
    );
    expect(warning).toHaveBeenCalledOnce();
    warning.mockRestore();
  });
});

describe.each([['comfortable','light'],['comfortable','dark'],['compact','light'],['compact','dark']] as const)('%s %s combination',(density,scheme)=>{it('sets both independent adaptive dimensions',()=>{const view=render(<SewakProvider density={density} colorScheme={scheme}><Surface/></SewakProvider>);const root=view.getByTestId('surface').parentElement;expect(root).toHaveAttribute('data-sewak-density',density);expect(root).toHaveAttribute('data-sewak-color-scheme',scheme);view.unmount()});});
