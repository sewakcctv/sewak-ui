import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
export const AppShell = forwardRef(function AppShell({ header, sidebar, children, mainId = 'sewak-main-content', mainRole = 'main', mainLabel, skipLinkLabel = 'Skip to main content', className, ...props }, ref) {
    return (_jsxs("div", { ...props, ref: ref, className: clsx('sewak-app-shell', className), children: [_jsx("a", { className: "sewak-skip-link", href: `#${mainId}`, children: skipLinkLabel }), header, _jsxs("div", { className: clsx('sewak-app-shell__body', !sidebar && 'sewak-app-shell__body--full'), children: [sidebar, mainRole === 'main'
                        ? _jsx("main", { id: mainId, "aria-label": mainLabel, className: "sewak-app-shell__main", tabIndex: -1, children: children })
                        : _jsx("div", { id: mainId, role: mainRole, "aria-label": mainLabel, className: "sewak-app-shell__main", tabIndex: -1, children: children })] })] }));
});
