import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
const ToastContext = createContext(null);
export function ToastProvider({ children }) { const [items, setItems] = useState([]); const toast = useCallback((value) => { const id = Date.now() + Math.random(); setItems(current => [...current, { ...value, id }]); return id; }, []); const dismiss = useCallback((id) => setItems(current => current.filter(item => item.id !== id)), []); const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]); return _jsxs(ToastContext.Provider, { value: value, children: [children, _jsx("div", { className: "sewak-toast-viewport", "aria-label": "Notifications", children: items.map(item => _jsx(Toast, { ...item, onDismiss: () => dismiss(item.id) }, item.id)) })] }); }
export function useToast() { const value = useContext(ToastContext); if (!value)
    throw new Error('useToast must be used within ToastProvider'); return value; }
export function Toast({ title, description, variant = 'info', onDismiss }) { return _jsxs("div", { role: "status", className: clsx('sewak-toast', `sewak-toast--${variant}`), children: [_jsxs("div", { children: [_jsx("strong", { children: title }), description && _jsx("p", { children: description })] }), _jsx("button", { type: "button", "aria-label": "Dismiss notification", onClick: onDismiss, children: "\u00D7" })] }); }
export function Tooltip({ children, content }) { return _jsx(TooltipPrimitive.Provider, { children: _jsxs(TooltipPrimitive.Root, { children: [_jsx(TooltipPrimitive.Trigger, { asChild: true, children: children }), _jsx(TooltipPrimitive.Portal, { children: _jsxs(TooltipPrimitive.Content, { className: "sewak-tooltip", sideOffset: 6, children: [content, _jsx(TooltipPrimitive.Arrow, { className: "sewak-tooltip__arrow" })] }) })] }) }); }
