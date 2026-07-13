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
export declare function Field({ label, description, error, required, htmlFor, className, children }: FieldProps): import("react").JSX.Element | null;
export {};
