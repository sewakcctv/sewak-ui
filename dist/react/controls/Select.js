import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
export const Select = forwardRef(function Select({ className, ...props }, ref) {
    return _jsx("select", { ...props, ref: ref, className: clsx('sewak-select', className) });
});
