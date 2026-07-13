import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
export const Header = forwardRef(function Header({ className, ...props }, ref) {
    return _jsx("header", { ...props, ref: ref, className: clsx('sewak-header', className) });
});
