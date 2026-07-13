import type { AnchorHTMLAttributes, ReactNode } from 'react';
export interface NavigationItem extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> {
    href: string;
    label: ReactNode;
}
interface NavigationLinksProps {
    items: NavigationItem[];
    activeHref?: string | undefined;
    onActivate?: () => void;
}
export declare function NavigationLinks({ items, activeHref, onActivate }: NavigationLinksProps): import("react").JSX.Element;
export {};
