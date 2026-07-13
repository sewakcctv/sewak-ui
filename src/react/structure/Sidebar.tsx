import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { NavigationLinks } from './navigation.js';
import type { NavigationItem } from './navigation.js';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  items: NavigationItem[];
  activeHref?: string;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { items, activeHref, className, 'aria-label': ariaLabel = 'Primary navigation', ...props },
  ref,
) {
  return (
    <aside {...props} ref={ref} className={clsx('sewak-sidebar', className)} aria-label={ariaLabel}>
      <nav aria-label={ariaLabel} className="sewak-nav">
        <NavigationLinks items={items} activeHref={activeHref} />
      </nav>
    </aside>
  );
});
