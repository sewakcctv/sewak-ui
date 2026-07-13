import { forwardRef, useEffect, useRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { Drawer } from '../overlays/index.js';
import { NavigationLinks } from './navigation.js';
import type { NavigationItem } from './navigation.js';

export interface MobileNavProps extends Omit<ComponentPropsWithoutRef<typeof Drawer>, 'children' | 'open' | 'defaultOpen' | 'onOpenChange' | 'title'> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: NavigationItem[];
  activeHref?: string;
  title?: string;
}

export const MobileNav = forwardRef<ElementRef<typeof Drawer>, MobileNavProps>(function MobileNav({
  open,
  onOpenChange,
  items,
  activeHref,
  title = 'Navigation',
  side = 'left',
  ...drawerProps
}, ref) {
  const previousHref = useRef(activeHref);

  useEffect(() => {
    if (open && previousHref.current !== activeHref) onOpenChange(false);
    previousHref.current = activeHref;
  }, [activeHref, onOpenChange, open]);

  return (
    <Drawer {...drawerProps} ref={ref} open={open} onOpenChange={onOpenChange} title={title} side={side}>
      <nav aria-label="Primary navigation" className="sewak-mobile-nav">
        <NavigationLinks items={items} activeHref={activeHref} onActivate={() => onOpenChange(false)} />
      </nav>
    </Drawer>
  );
});

export type MobileNavElement = ElementRef<typeof Drawer>;
