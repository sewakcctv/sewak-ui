import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useEffect, useRef } from 'react';
import { Drawer } from '../overlays/index.js';
import { NavigationLinks } from './navigation.js';
export const MobileNav = forwardRef(function MobileNav({ open, onOpenChange, items, activeHref, title = 'Navigation', side = 'left', ...drawerProps }, ref) {
    const previousHref = useRef(activeHref);
    useEffect(() => {
        if (open && previousHref.current !== activeHref)
            onOpenChange(false);
        previousHref.current = activeHref;
    }, [activeHref, onOpenChange, open]);
    return (_jsx(Drawer, { ...drawerProps, ref: ref, open: open, onOpenChange: onOpenChange, title: title, side: side, children: _jsx("nav", { "aria-label": "Primary navigation", className: "sewak-mobile-nav", children: _jsx(NavigationLinks, { items: items, activeHref: activeHref, onActivate: () => onOpenChange(false) }) }) }));
});
