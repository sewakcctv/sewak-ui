// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, expect, it } from 'vitest';
import { ToastProvider, Tooltip, useToast } from '../src/react/index.js';
afterEach(cleanup);
globalThis.ResizeObserver ??= class { observe(){} unobserve(){} disconnect(){} };
function Harness(){ const { toast }=useToast(); return <button onClick={()=>{toast({title:'First'});toast({title:'Second'})}}>Notify</button> }
it('queues and removes accessible toasts', async()=>{ const user=userEvent.setup(); render(<ToastProvider><Harness/></ToastProvider>); await user.click(screen.getByRole('button',{name:'Notify'})); expect(screen.getAllByRole('status')).toHaveLength(2); const dismiss=screen.getAllByRole('button',{name:'Dismiss notification'}).at(0); expect(dismiss).toBeDefined(); if(dismiss) await user.click(dismiss); expect(screen.getAllByRole('status')).toHaveLength(1); });
it('shows a tooltip for a labelled trigger', async()=>{ const user=userEvent.setup(); render(<Tooltip content="Helpful"><button>Help</button></Tooltip>); await user.hover(screen.getByRole('button',{name:'Help'})); expect(await screen.findByRole('tooltip')).toHaveTextContent('Helpful'); });
