import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
export const Checkbox = forwardRef(function Checkbox({ className, ...props }, ref) {
    return _jsx("input", { ...props, ref: ref, type: "checkbox", className: clsx('sewak-checkbox', className) });
});
