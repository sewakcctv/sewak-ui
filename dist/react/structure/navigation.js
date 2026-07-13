import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
export function NavigationLinks({ items, activeHref, onActivate }) {
    return (_jsx("ul", { className: "sewak-nav__list", children: items.map(({ href, label, className, onClick, ...linkProps }) => (_jsx("li", { className: "sewak-nav__item", children: _jsx("a", { ...linkProps, href: href, className: clsx('sewak-nav__link', className), "aria-current": href === activeHref ? 'page' : undefined, onClick: (event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented)
                        onActivate?.();
                }, children: label }) }, href))) }));
}
