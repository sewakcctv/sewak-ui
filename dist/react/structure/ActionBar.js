import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
export const ActionBar = forwardRef(function ActionBar({ className, ...props }, ref) {
    return _jsx("div", { ...props, ref: ref, className: clsx('sewak-action-bar', className) });
});
