import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
export const Radio = forwardRef(function Radio({ className, ...props }, ref) {
    return _jsx("input", { ...props, ref: ref, type: "radio", className: clsx('sewak-radio', className) });
});
