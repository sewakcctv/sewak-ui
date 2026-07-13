import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
export const Button = forwardRef(function Button({ variant = 'primary', size = 'md', loading = false, disabled, className, type = 'button', ...props }, ref) {
    return _jsx("button", { ...props, ref: ref, type: type, disabled: disabled || loading, "aria-busy": loading || undefined, className: clsx('sewak-button', `sewak-button--${variant}`, `sewak-button--${size}`, loading && 'sewak-button--loading', className) });
});
