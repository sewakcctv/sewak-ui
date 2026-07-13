// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { readFileSync } from 'node:fs';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  Button,
  Checkbox,
  Field,
  IconButton,
  Input,
  Radio,
  Select,
  Switch,
  Textarea,
} from '../src/react/index.js';

afterEach(cleanup);

const componentCss = readFileSync('src/styles/components.css', 'utf8');
const semanticCss = readFileSync('src/styles/semantic.css', 'utf8');

function declarationsFor(selector: string) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = [...componentCss.matchAll(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, 'g'))];
  expect(matches, `missing CSS rule for ${selector}`).not.toHaveLength(0);
  return matches.map((match) => match[1]).join('\n');
}

describe('controls', () => {
  it('defines exact button heights and square icon-button sizes for every density-safe size', () => {
    expect(semanticCss).toMatch(/\[data-sewak-density='comfortable'\]\s*\{[^}]*--sewak-control-height:\s*2\.75rem/s);
    expect(semanticCss).toMatch(/\[data-sewak-density='compact'\]\s*\{[^}]*--sewak-control-height:\s*2\.5rem/s);
    expect(declarationsFor('.sewak-button,\n.sewak-icon-button')).toMatch(/block-size:\s*var\(--sewak-button-size\)/);
    expect(declarationsFor('.sewak-icon-button')).toMatch(/inline-size:\s*var\(--sewak-button-size\)/);

    for (const [size, dimension] of [
      ['sm', '2.5rem'],
      ['md', 'var\\(--sewak-control-height\\)'],
      ['lg', '3rem'],
    ]) {
      expect(declarationsFor(`.sewak-button--${size}`)).toMatch(new RegExp(`--sewak-button-size:\\s*${dimension}`));
    }
  });

  it('keeps every control and selection target at least 40px in compact density', () => {
    expect(declarationsFor('.sewak-button--sm')).toMatch(/--sewak-button-size:\s*2\.5rem/);
    expect(declarationsFor('.sewak-button--md')).toMatch(/--sewak-button-size:\s*var\(--sewak-control-height\)/);
    expect(declarationsFor('.sewak-button--lg')).toMatch(/--sewak-button-size:\s*3rem/);
    expect(declarationsFor('.sewak-input,\n.sewak-textarea,\n.sewak-select')).toMatch(/min-block-size:\s*2\.5rem/);
    expect(declarationsFor('.sewak-checkbox,\n.sewak-radio,\n.sewak-switch')).toMatch(/inline-size:\s*2\.5rem/);
    expect(declarationsFor('.sewak-checkbox,\n.sewak-radio,\n.sewak-switch')).toMatch(/block-size:\s*2\.5rem/);
  });

  it('visibly marks every invalid control with the semantic danger colour', () => {
    expect(declarationsFor(".sewak-input[aria-invalid='true'], .sewak-textarea[aria-invalid='true'], .sewak-select[aria-invalid='true']"))
      .toMatch(/border-color:\s*var\(--sewak-color-danger\)/);
    expect(declarationsFor(".sewak-checkbox[aria-invalid='true'], .sewak-radio[aria-invalid='true'], .sewak-switch[aria-invalid='true']"))
      .toMatch(/box-shadow:\s*0 0 0 var\(--sewak-focus-width\) var\(--sewak-color-danger\)/);
  });

  it('applies named button variants and sizes while preserving native props and refs', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref} variant="danger" size="sm" name="remove" className="positioned">Remove</Button>);

    const button = screen.getByRole('button', { name: 'Remove' });
    expect(button).toBe(ref.current);
    expect(button).toHaveAttribute('name', 'remove');
    expect(button).toHaveClass('sewak-button', 'sewak-button--danger', 'sewak-button--sm', 'positioned');
  });

  it('prevents activation while loading or disabled and exposes busy state', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(<Button loading onClick={onClick}>Save</Button>);

    const loading = screen.getByRole('button', { name: 'Save' });
    expect(loading).toBeDisabled();
    expect(loading).toHaveAttribute('aria-busy', 'true');
    await user.click(loading);

    rerender(<Button disabled onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('requires an accessible label for icon buttons and forwards the ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} aria-label="Close"><span aria-hidden>×</span></IconButton>);
    expect(screen.getByRole('button', { name: 'Close' })).toBe(ref.current);
  });

  it('forwards native props and refs for text and select controls', () => {
    const inputRef = createRef<HTMLInputElement>();
    const textareaRef = createRef<HTMLTextAreaElement>();
    const selectRef = createRef<HTMLSelectElement>();
    render(<>
      <Input ref={inputRef} aria-label="Name" autoComplete="name" />
      <Textarea ref={textareaRef} aria-label="Notes" rows={4} />
      <Select ref={selectRef} aria-label="Province" defaultValue="on"><option value="on">Ontario</option></Select>
    </>);
    expect(screen.getByLabelText('Name')).toBe(inputRef.current);
    expect(screen.getByLabelText('Name')).toHaveAttribute('autocomplete', 'name');
    expect(screen.getByLabelText('Notes')).toBe(textareaRef.current);
    expect(screen.getByLabelText('Notes')).toHaveAttribute('rows', '4');
    expect(screen.getByLabelText('Province')).toBe(selectRef.current);
  });

  it('associates field labels, descriptions, required state, and announced errors', () => {
    render(
      <Field label="Email" description="Work address" error="Enter a valid email" required>
        <Input name="email" />
      </Field>,
    );

    const input = screen.getByLabelText(/Email/);
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const describedBy = input.getAttribute('aria-describedby')?.split(' ') ?? [];
    expect(describedBy).toHaveLength(2);
    expect(describedBy.map((id) => document.getElementById(id)?.textContent)).toEqual([
      'Work address',
      'Enter a valid email',
    ]);
    expect(screen.getByText('Enter a valid email')).toHaveAttribute('role', 'alert');
  });

  it('honours explicit field ids and merges control aria-describedby', () => {
    render(
      <Field label="Reference" description="Optional" htmlFor="reference">
        <Input aria-describedby="external-help" />
      </Field>,
    );
    expect(screen.getByLabelText('Reference')).toHaveAttribute('id', 'reference');
    expect(screen.getByLabelText('Reference').getAttribute('aria-describedby')).toContain('external-help');
  });

  it('uses native keyboard toggling for checkbox, radio, and switch', async () => {
    const user = userEvent.setup();
    render(<>
      <label><Checkbox />Accept</label>
      <label><Radio name="choice" />Choose</label>
      <label><Switch />Notifications</label>
    </>);

    for (const control of [
      screen.getByRole('checkbox', { name: 'Accept' }),
      screen.getByRole('radio', { name: 'Choose' }),
      screen.getByRole('switch', { name: 'Notifications' }),
    ]) {
      control.focus();
      await user.keyboard(' ');
      expect(control).toBeChecked();
    }
  });
});
