import type { HTMLAttributes } from 'react';
import type { NavigationItem } from './navigation.js';
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
    items: NavigationItem[];
    activeHref?: string;
}
export declare const Sidebar: import("react").ForwardRefExoticComponent<SidebarProps & import("react").RefAttributes<HTMLElement>>;
