import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { cloneElement, isValidElement, useId } from 'react';
export function Field({ label, description, error, required = false, htmlFor, className, children }) {
    const generatedId = useId();
    const controlId = htmlFor ?? children.props.id ?? `${generatedId}-control`;
    const descriptionId = description ? `${generatedId}-description` : undefined;
    const errorId = error ? `${generatedId}-error` : undefined;
    const describedBy = [children.props['aria-describedby'], descriptionId, errorId].filter(Boolean).join(' ') || undefined;
    if (!isValidElement(children))
        return null;
    return _jsxs("div", { className: clsx('sewak-field', error && 'sewak-field--invalid', className), children: [_jsxs("label", { className: "sewak-field__label", htmlFor: controlId, children: [label, required && _jsx("span", { className: "sewak-field__required", "aria-hidden": "true", children: " *" })] }), cloneElement(children, {
                id: controlId,
                required: children.props.required ?? required,
                ...(children.props['aria-invalid'] !== undefined || error
                    ? { 'aria-invalid': children.props['aria-invalid'] ?? true }
                    : {}),
                ...(describedBy ? { 'aria-describedby': describedBy } : {}),
            }), description && _jsx("div", { id: descriptionId, className: "sewak-field__description", children: description }), error && _jsx("div", { id: errorId, className: "sewak-field__error", role: "alert", children: error })] });
}
