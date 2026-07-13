import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef, useId } from 'react';
export const ContentSection = forwardRef(function ContentSection({ title, description, actions, children, className, 'aria-label': ariaLabel, 'aria-labelledby': labelledBy, ...props }, ref) {
    const headingId = useId();
    return (_jsxs("section", { ...props, ref: ref, className: clsx('sewak-content-section', className), "aria-label": ariaLabel, "aria-labelledby": labelledBy ?? (title ? headingId : undefined), children: [(title || description || actions) && (_jsxs("div", { className: "sewak-content-section__header", children: [_jsxs("div", { children: [title && _jsx("h2", { id: headingId, className: "sewak-content-section__title", children: title }), description && _jsx("div", { className: "sewak-content-section__description", children: description })] }), actions && _jsx("div", { className: "sewak-content-section__actions", children: actions })] })), _jsx("div", { className: "sewak-content-section__body", children: children })] }));
});
