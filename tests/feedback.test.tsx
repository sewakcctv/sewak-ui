// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { act } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { ToastProvider, Tooltip, useToast } from '../src/react/index.js';
afterEach(()=>{cleanup();vi.useRealTimers()});
globalThis.ResizeObserver ??= class { observe(){} unobserve(){} disconnect(){} };
function Harness(){ const { toast }=useToast(); return <button onClick={()=>{toast({title:'First'});toast({title:'Second'})}}>Notify</button> }
it('queues and removes accessible toasts', async()=>{ const user=userEvent.setup(); render(<ToastProvider><Harness/></ToastProvider>); await user.click(screen.getByRole('button',{name:'Notify'})); expect(screen.getAllByRole('status')).toHaveLength(2); const dismiss=screen.getAllByRole('button',{name:'Dismiss notification'}).at(0); expect(dismiss).toBeDefined(); if(dismiss) await user.click(dismiss); expect(screen.getAllByRole('status')).toHaveLength(1); });
it('auto-dismisses provider-owned toasts after the configured duration', async()=>{vi.useFakeTimers();render(<ToastProvider duration={3000}><Harness/></ToastProvider>);act(()=>fireEvent.click(screen.getByRole('button',{name:'Notify'})));expect(screen.getAllByRole('status')).toHaveLength(2);act(()=>vi.advanceTimersByTime(2999));expect(screen.getAllByRole('status')).toHaveLength(2);act(()=>vi.advanceTimersByTime(1));expect(screen.queryAllByRole('status')).toHaveLength(0);});
it('supports controlled tooltip state and forwards content DOM props',()=>{const change=vi.fn();render(<Tooltip content="Helpful" open onOpenChange={change} contentProps={{'data-testid':'tip'}}><button>Help</button></Tooltip>);expect(screen.getByTestId('tip')).toBeInTheDocument();expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful');});
it('shows a tooltip for a labelled trigger', async()=>{ const user=userEvent.setup(); render(<Tooltip content="Helpful"><button>Help</button></Tooltip>); await user.hover(screen.getByRole('button',{name:'Help'})); expect(await screen.findByRole('tooltip')).toHaveTextContent('Helpful'); });
