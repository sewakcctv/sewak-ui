import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { NavigationLinks } from './navigation.js';
export const Sidebar = forwardRef(function Sidebar({ items, activeHref, className, 'aria-label': ariaLabel = 'Primary navigation', ...props }, ref) {
    return (_jsx("aside", { ...props, ref: ref, className: clsx('sewak-sidebar', className), "aria-label": ariaLabel, children: _jsx("nav", { "aria-label": ariaLabel, className: "sewak-nav", children: _jsx(NavigationLinks, { items: items, activeHref: activeHref }) }) }));
});
