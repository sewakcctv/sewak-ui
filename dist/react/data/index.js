import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef, useId, useState } from 'react';
export const Table = forwardRef(function Table({ caption, className, children, ...props }, ref) { return _jsx("div", { className: "sewak-table-wrap", children: _jsxs("table", { ref: ref, className: clsx('sewak-table', className), ...props, children: [_jsx("caption", { children: caption }), children] }) }); });
export const Pagination = forwardRef(function Pagination({ page, pageCount, onPageChange, className, ...props }, ref) { return _jsxs("nav", { ref: ref, "aria-label": "Pagination", className: clsx('sewak-pagination', className), ...props, children: [_jsx("button", { type: "button", "aria-label": "Go to previous page", disabled: page <= 1, onClick: () => onPageChange(page - 1), children: "Previous" }), _jsxs("span", { "aria-live": "polite", children: ["Page ", page, " of ", pageCount] }), _jsx("button", { type: "button", "aria-label": "Go to next page", disabled: page >= pageCount, onClick: () => onPageChange(page + 1), children: "Next" })] }); });
export const Tabs = forwardRef(function Tabs({ tabs, value, defaultValue, onValueChange, className, ...props }, ref) { const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id); const active = value ?? internal; const base = useId(); const activate = (id) => { if (value === undefined)
    setInternal(id); onValueChange?.(id); }; const move = (index, direction) => { let next = index; do {
    next = (next + direction + tabs.length) % tabs.length;
} while (tabs[next]?.disabled && next !== index); const id = tabs[next]?.id; if (id) {
    activate(id);
    document.getElementById(`${base}-tab-${id}`)?.focus();
} }; return _jsxs("div", { ref: ref, className: clsx('sewak-tabs', className), ...props, children: [_jsx("div", { role: "tablist", children: tabs.map((tab, index) => _jsx("button", { id: `${base}-tab-${tab.id}`, role: "tab", "aria-selected": active === tab.id, "aria-controls": `${base}-panel-${tab.id}`, tabIndex: active === tab.id ? 0 : -1, disabled: tab.disabled, onClick: () => activate(tab.id), onKeyDown: event => { if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    move(index, 1);
                } if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    move(index, -1);
                } }, children: tab.label }, tab.id)) }), tabs.map(tab => active === tab.id && _jsx("div", { id: `${base}-panel-${tab.id}`, role: "tabpanel", "aria-labelledby": `${base}-tab-${tab.id}`, tabIndex: 0, children: tab.content }, tab.id))] }); });
export const StatCard = forwardRef(function StatCard({ label, value, trend, className, ...props }, ref) { return _jsxs("div", { ref: ref, className: clsx('sewak-stat-card', className), ...props, children: [_jsx("span", { className: "sewak-stat-card__label", children: label }), _jsx("strong", { className: "sewak-stat-card__value", children: value }), trend && _jsx("span", { className: "sewak-stat-card__trend", children: trend })] }); });
