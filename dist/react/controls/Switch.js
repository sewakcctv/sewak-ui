import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
export const Switch = forwardRef(function Switch({ className, ...props }, ref) {
    return _jsx("input", { ...props, ref: ref, type: "checkbox", role: "switch", className: clsx('sewak-switch', className) });
});
