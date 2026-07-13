// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { readFile } from 'node:fs/promises';
import { Alert, Badge, Card, EmptyState, Separator, Skeleton, Spinner } from '../src/react/index.js';
afterEach(cleanup);
it('renders semantic surfaces and feedback', () => {
  render(<><Card>Details</Card><Badge variant="success">Active</Badge><Alert variant="danger">Failed</Alert><EmptyState title="No plans" description="Create one"/><Skeleton aria-label="Loading plans"/><Spinner label="Saving"/><Separator/></>);
  expect(screen.getByText('Details')).toHaveClass('sewak-card');
  expect(screen.getByRole('alert')).toHaveTextContent('Failed');
  expect(screen.getByRole('status', { name: 'Saving' })).toBeInTheDocument();
  expect(screen.getByRole('separator')).toBeInTheDocument();
});
it('has no axe violations',async()=>{const {container}=render(<main><Card><h2>Details</h2></Card><Alert>Notice</Alert><Spinner label="Loading"/></main>);expect((await axe(container,{rules:{'color-contrast':{enabled:false}}})).violations).toEqual([]);});
it('defines density and state styling for every Task 4 surface',async()=>{const css=await readFile('src/styles/components.css','utf8');for(const selector of ['.sewak-badge','.sewak-alert','.sewak-toast','.sewak-menu__item','.sewak-table th','.sewak-pagination button','.sewak-tabs [role=\'tab\']'])expect(css).toContain(selector);for(const variant of ['info','success','warning','danger'])expect(css).toContain(`.sewak-toast--${variant}`);expect(css).toContain('var(--sewak-component-padding-block)');expect(css).toContain('min-block-size:var(--sewak-interactive-min)');expect(css).toContain('@media (prefers-reduced-motion:reduce)');});
