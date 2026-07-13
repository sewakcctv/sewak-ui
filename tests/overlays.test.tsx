// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { Dialog, Drawer, DropdownMenu } from '../src/react/index.js';
afterEach(cleanup);
it('labels, traps, closes, and returns focus for dialogs', async()=>{const user=userEvent.setup();render(<Dialog trigger={<button>Open</button>} title="Edit plan"><button>Inside</button></Dialog>);const trigger=screen.getByRole('button',{name:'Open'});await user.click(trigger);const dialog=screen.getByRole('dialog',{name:'Edit plan'});expect(dialog).toContainElement(document.activeElement as HTMLElement);await user.tab();expect(dialog).toContainElement(document.activeElement as HTMLElement);await user.keyboard('{Escape}');expect(screen.queryByRole('dialog')).not.toBeInTheDocument();expect(trigger).toHaveFocus();});
it('Drawer uses controlled composition', async()=>{const changed=vi.fn();function H(){const [open,setOpen]=useState(true);return <Drawer open={open} onOpenChange={v=>{changed(v);setOpen(v)}} title="Filters">Body</Drawer>}const user=userEvent.setup();render(<H/>);await user.keyboard('{Escape}');expect(changed).toHaveBeenCalledWith(false);});
it('closes on an outside pointer interaction',async()=>{const user=userEvent.setup();render(<Dialog trigger={<button>Open</button>} title="Details">Body</Dialog>);await user.click(screen.getByRole('button',{name:'Open'}));fireEvent.pointerDown(document.body);fireEvent.click(document.body);expect(screen.queryByRole('dialog')).not.toBeInTheDocument();});
it('menu supports arrows and escape',async()=>{const user=userEvent.setup();render(<DropdownMenu trigger={<button>Actions</button>} items={[{label:'Edit',onSelect:vi.fn()},{label:'Delete',onSelect:vi.fn()}]}/>);await user.click(screen.getByRole('button',{name:'Actions'}));await user.keyboard('{ArrowDown}');expect(screen.getByRole('menuitem',{name:'Edit'})).toHaveFocus();await user.keyboard('{Escape}');expect(screen.queryByRole('menu')).not.toBeInTheDocument();});
