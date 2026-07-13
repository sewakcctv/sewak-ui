import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
export const PageHeader = forwardRef(function PageHeader({ title, description, actions, className, ...props }, ref) {
    return (_jsxs("div", { ...props, ref: ref, className: clsx('sewak-page-header', className), children: [_jsxs("div", { className: "sewak-page-header__content", children: [_jsx("h1", { className: "sewak-page-header__title", children: title }), description && _jsx("div", { className: "sewak-page-header__description", children: description })] }), actions && _jsx("div", { className: "sewak-page-header__actions", children: actions })] }));
});
