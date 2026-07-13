import type { ReactElement, ReactNode } from 'react';
export interface ToastInput {
    title: string;
    description?: string;
    variant?: 'info' | 'success' | 'warning' | 'danger';
}
interface ToastContextValue {
    toast: (value: ToastInput) => number;
    dismiss: (id: number) => void;
}
export declare function ToastProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useToast(): ToastContextValue;
export declare function Toast({ title, description, variant, onDismiss }: {
    title: string;
    description?: string;
    variant?: ToastInput['variant'];
    onDismiss: () => void;
}): import("react").JSX.Element;
export declare function Tooltip({ children, content }: {
    children: ReactElement;
    content: ReactNode;
}): import("react").JSX.Element;
export {};
