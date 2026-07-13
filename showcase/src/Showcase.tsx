import { useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  ActionBar, Alert, AppShell, Badge, Button, Card, Checkbox, ConfirmDialog, ContentSection,
  Dialog, Drawer, DropdownMenu, EmptyState, Field, Header, IconButton, Input, MobileNav,
  PageHeader, Pagination, Radio, Select, Separator, SewakProvider, Sidebar, Skeleton, Spinner,
  StatCard, Switch, Table, Tabs, Textarea, ToastProvider, Tooltip, useToast,
} from '../../src/react/index.js';
import type { ColorScheme, Density, NavigationItem } from '../../src/react/index.js';

const navItems: NavigationItem[] = [
  { href: '#overview', label: 'Overview' },
  { href: '#sites', label: 'Sites' },
  { href: '#proposals', label: 'Proposals' },
  { href: '#settings', label: 'Settings' },
];

function readOption<T extends string>(name: string, allowed: readonly T[], fallback: T): T {
  const candidate = new URLSearchParams(window.location.search).get(name);
  return allowed.includes(candidate as T) ? candidate as T : fallback;
}

function setQuery(name: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.replaceState({}, '', url);
}

function ToastDemo() {
  const { toast } = useToast();
  return <Button variant="secondary" onClick={() => toast({ title: 'Proposal saved', description: 'Changes are ready for review.', variant: 'success', duration: 30000 })}>Show toast</Button>;
}

function HeaderContent({ customer = false }: { customer?: boolean }) {
  return <>
    <a className="brand" href="#top" aria-label="Sewak Security home"><span className="brand__mark" aria-hidden="true">S</span><span>Sewak Security</span></a>
    <div className="header-actions"><Badge variant={customer ? 'success' : 'primary'}>{customer ? 'Protected' : 'Draft'}</Badge><IconButton aria-label="Open notifications">●</IconButton></div>
  </>;
}

function ShellExamples() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="gallery-section" aria-labelledby="shells-title">
    <div className="section-heading"><p className="eyebrow">Structure</p><h2 id="shells-title">Two products, one shell language</h2><p>Operational clarity for Plan Builder and comfortable assurance for customer-facing work.</p></div>
    <div className="shell-stack">
      <div className="shell-frame" aria-label="Compact operational shell example">
        <AppShell mainId="operations-main" mainRole="region" mainLabel="Operational shell content" header={<Header><HeaderContent /><Button className="mobile-menu" variant="secondary" onClick={() => setMobileOpen(true)}>Menu</Button></Header>} sidebar={<Sidebar items={navItems} activeHref="#overview" />}>
          <PageHeader title="North York retrofit" description="Proposal PB-1042 · Last saved 2 minutes ago" actions={<Button>Share proposal</Button>} />
          <div className="stats"><StatCard label="Cameras" value="18" trend="3 exterior" /><StatCard label="Coverage" value="94%" trend="On target" /><StatCard label="Estimate" value="$12,840" trend="Before tax" /></div>
          <ContentSection title="Site readiness" description="Resolve field notes before client review." actions={<Badge variant="warning">2 open</Badge>}>
            <Table caption="Readiness checks"><thead><tr><th scope="col">Area</th><th scope="col">Status</th><th scope="col">Owner</th></tr></thead><tbody><tr><td>Loading bay</td><td><Badge variant="success">Ready</Badge></td><td>Amrinder</td></tr><tr><td>West entrance</td><td><Badge variant="warning">Review</Badge></td><td>Gagandeep</td></tr></tbody></Table>
          </ContentSection>
          <ActionBar><Button variant="secondary">Save draft</Button><Button>Continue</Button></ActionBar>
        </AppShell>
        <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} items={navItems} activeHref="#overview" />
      </div>
      <div className="shell-frame shell-frame--customer" aria-label="Comfortable customer shell example">
        <div className="sewak-app-shell"><Header><HeaderContent customer /></Header><div className="sewak-app-shell__body sewak-app-shell__body--full"><div className="sewak-app-shell__main">
          <PageHeader title="Your security, clearly managed" description="A single view of service visits, system health, and the people protecting your property." actions={<Button>Book a visit</Button>} />
          <div className="customer-grid"><Card><p className="eyebrow">System health</p><h2>All locations online</h2><p className="muted">42 cameras checked at 9:32 AM.</p><Alert variant="success">No action is needed.</Alert></Card><Card><p className="eyebrow">Next visit</p><h2>Wednesday, July 22</h2><p className="muted">Preventive maintenance · 10:00 AM–12:00 PM</p><Button variant="secondary">View appointment</Button></Card></div>
        </div></div></div>
      </div>
    </div>
  </div>;
}

function ShowcaseBody() {
  const [page, setPage] = useState(2);
  return <main id="top" className="showcase-main">
    <div className="showcase-intro"><p className="eyebrow">Sewak UI · Phase 2</p><h1>Shared components for every security touchpoint.</h1><p>One accessible system adapts from reassuring customer experiences to focused operational work—without local forks.</p><div className="context-strip" aria-label="Showcase coverage"><span>32 components</span><span>4 visual modes</span><span>2 shell patterns</span></div></div>

    <section className="gallery-section" aria-labelledby="controls-title"><div className="section-heading"><p className="eyebrow">Controls</p><h2 id="controls-title">Actions and input states</h2></div>
      <div className="demo-grid"><Card><h3>Buttons</h3><div className="row wrap"><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Danger</Button><Button disabled>Disabled</Button><Button loading>Saving…</Button></div><div className="row wrap"><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button><IconButton aria-label="Add camera">＋</IconButton><IconButton aria-label="Delete camera" variant="danger">×</IconButton></div></Card>
      <Card><h3>Fields</h3><div className="form-grid"><Field label="Site name" description="Used on the customer proposal."><Input defaultValue="North York warehouse" /></Field><Field label="Contact email" error="Enter a valid email address." required><Input defaultValue="invalid@" /></Field><Field label="System type"><Select defaultValue="ip"><option value="ip">IP surveillance</option><option value="access">Access control</option></Select></Field><Field label="Installation notes"><Textarea defaultValue="Confirm lift access before arrival." /></Field><Field label="Disabled field"><Input disabled defaultValue="Managed by account" /></Field></div></Card>
      <Card><h3>Selection</h3><div className="choice-list"><label><Checkbox defaultChecked /> Include remote monitoring</label><label><Checkbox disabled /> Archived option</label><label><Radio name="term" defaultChecked /> Monthly service</label><label><Radio name="term" /> Annual service</label><label><Switch defaultChecked /> Email service alerts</label><label><Switch disabled /> SMS alerts unavailable</label></div></Card></div>
    </section>

    <section className="gallery-section" aria-labelledby="surface-title"><div className="section-heading"><p className="eyebrow">Surfaces and feedback</p><h2 id="surface-title">Status that stays unmistakable</h2></div><div className="demo-grid"><Card><h3>Badges</h3><div className="row wrap"><Badge>Neutral</Badge><Badge variant="primary">Primary</Badge><Badge variant="success">Online</Badge><Badge variant="warning">Needs review</Badge><Badge variant="danger">Offline</Badge></div><Separator /><h3>Alerts</h3><div className="stack"><Alert>New firmware is available.</Alert><Alert variant="success">Configuration saved.</Alert><Alert variant="warning">Two cameras need review.</Alert><Alert variant="danger">Recorder connection lost.</Alert></div></Card>
      <Card><h3>Loading and empty</h3><div className="row"><Spinner label="Loading camera list" /><span>Loading camera list</span></div><div className="skeletons" role="status" aria-label="Loading placeholder"><Skeleton /><Skeleton /><Skeleton /></div><EmptyState title="No service visits" description="Scheduled visits will appear here."><Button variant="secondary">Book a visit</Button></EmptyState></Card>
      <Card><h3>Transient feedback</h3><div className="row wrap"><ToastDemo /><Tooltip content="Uses the customer’s local time"><Button variant="ghost">Timezone help</Button></Tooltip></div></Card></div></section>

    <section className="gallery-section" aria-labelledby="overlay-title"><div className="section-heading"><p className="eyebrow">Overlays</p><h2 id="overlay-title">Focused tasks, predictable escape routes</h2></div><Card><div className="row wrap"><Dialog title="Add a camera" description="Create a camera placeholder for the site plan." trigger={<Button>Open dialog</Button>}><Field label="Camera label"><Input defaultValue="West entrance" /></Field></Dialog><ConfirmDialog title="Delete proposal?" description="This cannot be undone." danger onConfirm={() => undefined} trigger={<Button variant="danger">Confirm dialog</Button>} /><DropdownMenu trigger={<Button variant="secondary">Proposal actions</Button>} items={[{ label: 'Duplicate', onSelect: () => undefined }, { label: 'Archive', onSelect: () => undefined }, { label: 'Delete unavailable', disabled: true, onSelect: () => undefined }]} /><Drawer title="Proposal details" description="Reference information for PB-1042." trigger={<Button variant="secondary">Open drawer</Button>}><p>Created July 13, 2026 · North York</p></Drawer></div></Card></section>

    <section className="gallery-section" aria-labelledby="data-title"><div className="section-heading"><p className="eyebrow">Data and navigation</p><h2 id="data-title">Dense when useful, readable everywhere</h2></div><div className="demo-grid"><StatCard label="Active sites" value="24" trend="+2 this month" /><StatCard label="Open proposals" value="7" trend="3 ready to send" /><Card><Tabs defaultValue="coverage" tabs={[{ id: 'coverage', label: 'Coverage', content: 'Camera coverage is within the target range.' }, { id: 'equipment', label: 'Equipment', content: '18 devices are included.' }, { id: 'locked', label: 'Locked', content: 'Unavailable', disabled: true }]} /><Pagination page={page} pageCount={5} onPageChange={setPage} /></Card></div><Card className="table-card"><Table caption="Recent proposals"><thead><tr><th scope="col">Proposal</th><th scope="col">Customer</th><th scope="col">Status</th><th scope="col">Value</th></tr></thead><tbody><tr><td>PB-1042</td><td>North York Logistics</td><td><Badge variant="warning">Draft</Badge></td><td>$12,840</td></tr><tr><td>PB-1041</td><td>King West Dental</td><td><Badge variant="success">Approved</Badge></td><td>$8,240</td></tr></tbody></Table></Card></section>
    <ShellExamples />
  </main>;
}

export function Showcase() {
  const [density, setDensity] = useState<Density>(() => readOption('density', ['comfortable', 'compact'], 'comfortable'));
  const [scheme, setScheme] = useState<ColorScheme>(() => readOption('scheme', ['light', 'dark'], 'light'));
  const changeDensity = (event: ChangeEvent<HTMLSelectElement>) => { const value = event.target.value as Density; setDensity(value); setQuery('density', value); };
  const changeScheme = (event: ChangeEvent<HTMLSelectElement>) => { const value = event.target.value as ColorScheme; setScheme(value); setQuery('scheme', value); };
  return <SewakProvider density={density} colorScheme={scheme}><ToastProvider><div data-testid="showcase-root" className="showcase" data-sewak-density={density} data-sewak-color-scheme={scheme}>
    <header className="toolbar"><strong>Sewak UI showcase</strong><div className="toolbar__controls"><label>Density <select aria-label="Density" value={density} onChange={changeDensity}><option value="comfortable">Comfortable</option><option value="compact">Compact</option></select></label><label>Colour scheme <select aria-label="Colour scheme" value={scheme} onChange={changeScheme}><option value="light">Light</option><option value="dark">Dark</option></select></label></div></header>
    <ShowcaseBody />
  </div></ToastProvider></SewakProvider>;
}
