// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ActionBar,
  AppShell,
  ContentSection,
  Header,
  MobileNav,
  PageHeader,
  Sidebar,
} from '../src/react/index.js';

const items = [
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#customers', label: 'Customers' },
];

afterEach(cleanup);

describe('shared structure', () => {
  it('renders a skip link and the application landmarks in logical DOM order', async () => {
    const user = userEvent.setup();
    render(
      <AppShell header={<Header>Brand</Header>} sidebar={<Sidebar items={items} activeHref="#dashboard" />}>
        <button>Page action</button>
      </AppShell>,
    );

    const skip = screen.getByRole('link', { name: 'Skip to main content' });
    expect(skip).toHaveAttribute('href', '#sewak-main-content');
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('id', 'sewak-main-content');
    expect([...document.querySelectorAll('header,aside,main')].map((node) => node.tagName)).toEqual(['HEADER', 'ASIDE', 'MAIN']);
    await user.tab();
    expect(skip).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveFocus();
  });

  it('marks only the active sidebar destination as the current page', () => {
    render(<Sidebar items={items} activeHref="#customers" aria-label="Workspace" />);
    expect(screen.getByRole('navigation', { name: 'Workspace' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Customers' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveAttribute('aria-current');
  });

  it('uses the shared controlled Drawer and closes on activation and Escape', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <MobileNav open onOpenChange={onOpenChange} items={items} activeHref="#dashboard" />,
    );
    expect(screen.getByRole('dialog', { name: 'Navigation' })).toHaveClass('sewak-drawer');
    await user.click(screen.getByRole('link', { name: 'Customers' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();
    rerender(<MobileNav open onOpenChange={onOpenChange} items={items} activeHref="#customers" />);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('provides typed ref and DOM-prop contracts for every structural root', () => {
    const shellRef = createRef<HTMLDivElement>();
    const headerRef = createRef<HTMLElement>();
    const sidebarRef = createRef<HTMLElement>();
    const pageHeaderRef = createRef<HTMLDivElement>();
    const sectionRef = createRef<HTMLElement>();
    const actionsRef = createRef<HTMLDivElement>();
    render(
      <AppShell ref={shellRef} data-testid="shell" header={<Header ref={headerRef} data-testid="header">Brand</Header>} sidebar={<Sidebar ref={sidebarRef} data-testid="sidebar" items={items} />}>
        <PageHeader ref={pageHeaderRef} data-testid="page-header" title="Customers" description="Manage customer records" actions={<button>Add</button>} />
        <ContentSection ref={sectionRef} data-testid="section" title="Recent">Content</ContentSection>
        <ActionBar ref={actionsRef} data-testid="actions"><button>Save</button></ActionBar>
      </AppShell>,
    );
    expect(shellRef.current).toBe(screen.getByTestId('shell'));
    expect(headerRef.current).toBe(screen.getByTestId('header'));
    expect(sidebarRef.current).toBe(screen.getByTestId('sidebar'));
    expect(pageHeaderRef.current).toBe(screen.getByTestId('page-header'));
    expect(sectionRef.current).toBe(screen.getByTestId('section'));
    expect(actionsRef.current).toBe(screen.getByTestId('actions'));
    expect(screen.getByRole('heading', { name: 'Customers', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Recent' })).toBeInTheDocument();
  });

  it('defines narrow responsive, density, scheme, overflow, focus, and compact target rules', async () => {
    const css = await import('node:fs/promises').then(({ readFile }) => readFile('src/styles/components.css', 'utf8'));
    expect(css).toContain('@media (max-width:48rem)');
    expect(css).toMatch(/\.sewak-app-shell__body\s*\{[^}]*grid-template-columns/s);
    expect(css).toMatch(/\.sewak-app-shell__main\s*\{[^}]*min-inline-size:\s*0/s);
    expect(css).toMatch(/\.sewak-mobile-nav[^}]*min-block-size:\s*var\(--sewak-interactive-min\)/s);
    expect(css).toContain("[data-sewak-density='compact'] .sewak-page-header");
    expect(css).toContain("[data-sewak-color-scheme='dark']");
    expect(css).toContain('.sewak-skip-link:focus');
  });
});
