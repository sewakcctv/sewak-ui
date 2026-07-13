import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
export const Input = forwardRef(function Input({ className, ...props }, ref) {
    return _jsx("input", { ...props, ref: ref, className: clsx('sewak-input', className) });
});
