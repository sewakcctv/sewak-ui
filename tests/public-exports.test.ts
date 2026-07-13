import { describe, expect, it } from 'vitest';
import {
  AppShell,
  Button,
  Dialog,
  Field,
  SewakProvider,
  ToastProvider,
} from '../src/react/index.js';
import * as reactExports from '../src/react/index.js';

describe('React public exports', () => {
  it('defines the approved package entry points', () => {
    expect(SewakProvider).toBeDefined();
    expect(Button).toBeDefined();
    expect(Field).toBeDefined();
    expect(Dialog).toBeDefined();
    expect(ToastProvider).toBeDefined();
    expect(AppShell).toBeDefined();
  });

  it('exposes the exact approved Task 4 runtime surface without a raw Toast', () => {
    const task4 = ['Alert','Badge','Card','ConfirmDialog','Dialog','Drawer','DropdownMenu','EmptyState','Pagination','Separator','Skeleton','Spinner','StatCard','Table','Tabs','ToastProvider','Tooltip','useToast'];
    expect(task4.every((name) => name in reactExports)).toBe(true);
    expect('Toast' in reactExports).toBe(false);
  });
});
