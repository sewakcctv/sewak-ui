// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';
import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Pagination, StatCard, Table, Tabs } from '../src/react/index.js';
afterEach(cleanup);
it('provides table captions',()=>{render(<Table caption="Plans"><thead><tr><th>Name</th></tr></thead><tbody><tr><td>A</td></tr></tbody></Table>);expect(screen.getByRole('table',{name:'Plans'})).toBeInTheDocument();});
it('activates tabs with arrow keys',async()=>{const user=userEvent.setup();render(<Tabs tabs={[{id:'one',label:'One',content:'First'},{id:'two',label:'Two',content:'Second'}]}/>);screen.getByRole('tab',{name:'One'}).focus();await user.keyboard('{ArrowRight}');expect(screen.getByRole('tab',{name:'Two'})).toHaveAttribute('aria-selected','true');expect(screen.getByRole('tabpanel')).toHaveTextContent('Second');});
it('supports controlled tabs and forwards root DOM props',async()=>{const user=userEvent.setup();const change=vi.fn();render(<Tabs data-testid="tabs" value="two" onValueChange={change} tabs={[{id:'one',label:'One',content:'First'},{id:'two',label:'Two',content:'Second'}]}/>);expect(screen.getByTestId('tabs')).toBeInTheDocument();expect(screen.getByRole('tab',{name:'Two'})).toHaveAttribute('aria-selected','true');await user.click(screen.getByRole('tab',{name:'One'}));expect(change).toHaveBeenCalledWith('one');expect(screen.getByRole('tab',{name:'Two'})).toHaveAttribute('aria-selected','true');});
it('labels pagination controls',async()=>{const user=userEvent.setup();const change=vi.fn();render(<Pagination page={2} pageCount={4} onPageChange={change}/>);await user.click(screen.getByRole('button',{name:'Go to next page'}));expect(change).toHaveBeenCalledWith(3);expect(screen.getByRole('navigation',{name:'Pagination'})).toBeInTheDocument();});
it('renders a labelled statistic',()=>{render(<StatCard label="Revenue" value="$10"/>);expect(screen.getByText('Revenue')).toBeInTheDocument();});
it('has no axe violations',async()=>{const {container}=render(<><Table caption="Plans"><tbody><tr><th scope="row">Plan</th><td>Active</td></tr></tbody></Table><Pagination page={1} pageCount={2} onPageChange={()=>{}}/></>);expect((await axe(container,{rules:{'color-contrast':{enabled:false}}})).violations).toEqual([]);});
