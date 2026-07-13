import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { Drawer } from '../overlays/index.js';
import type { NavigationItem } from './navigation.js';
export interface MobileNavProps extends Omit<ComponentPropsWithoutRef<typeof Drawer>, 'children' | 'open' | 'defaultOpen' | 'onOpenChange' | 'title'> {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    items: NavigationItem[];
    activeHref?: string;
    title?: string;
}
export declare const MobileNav: import("react").ForwardRefExoticComponent<MobileNavProps & import("react").RefAttributes<HTMLDivElement>>;
export type MobileNavElement = ElementRef<typeof Drawer>;
