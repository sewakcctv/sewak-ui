import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
export const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
    return _jsx("textarea", { ...props, ref: ref, className: clsx('sewak-textarea', className) });
});
