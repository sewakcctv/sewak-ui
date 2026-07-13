import { clsx } from 'clsx';
import { cloneElement, isValidElement, useId } from 'react';
import type { AriaAttributes, ReactElement, ReactNode } from 'react';

interface FieldControlProps {
  id?: string;
  required?: boolean;
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-describedby'?: string;
}

export interface FieldProps {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: ReactElement<FieldControlProps>;
}

export function Field({ label, description, error, required = false, htmlFor, className, children }: FieldProps) {
  const generatedId = useId();
  const controlId = htmlFor ?? children.props.id ?? `${generatedId}-control`;
  const descriptionId = description ? `${generatedId}-description` : undefined;
  const errorId = error ? `${generatedId}-error` : undefined;
  const describedBy = [children.props['aria-describedby'], descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  if (!isValidElement<FieldControlProps>(children)) return null;

  return <div className={clsx('sewak-field', error && 'sewak-field--invalid', className)}>
    <label className="sewak-field__label" htmlFor={controlId}>
      {label}{required && <span className="sewak-field__required" aria-hidden="true"> *</span>}
    </label>
    {cloneElement(children, {
      id: controlId,
      required: children.props.required ?? required,
      ...(children.props['aria-invalid'] !== undefined || error
        ? { 'aria-invalid': children.props['aria-invalid'] ?? true }
        : {}),
      ...(describedBy ? { 'aria-describedby': describedBy } : {}),
    })}
    {description && <div id={descriptionId} className="sewak-field__description">{description}</div>}
    {error && <div id={errorId} className="sewak-field__error" role="alert">{error}</div>}
  </div>;
}
