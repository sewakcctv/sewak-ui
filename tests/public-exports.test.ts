import { describe, expect, it } from 'vitest';
import {
  AppShell,
  Button,
  Dialog,
  Field,
  SewakProvider,
  ToastProvider,
} from '../src/react/index.js';

describe('React public exports', () => {
  it('defines the approved package entry points', () => {
    expect(SewakProvider).toBeDefined();
    expect(Button).toBeDefined();
    expect(Field).toBeDefined();
    expect(Dialog).toBeDefined();
    expect(ToastProvider).toBeDefined();
    expect(AppShell).toBeDefined();
  });
});
