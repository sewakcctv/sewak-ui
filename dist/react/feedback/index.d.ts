import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactElement, ReactNode } from 'react';
export interface ToastInput {
    title: string;
    description?: string;
    variant?: 'info' | 'success' | 'warning' | 'danger';
    duration?: number;
}
interface ToastContextValue {
    toast: (value: ToastInput) => number;
    dismiss: (id: number) => void;
}
export interface ToastProviderProps {
    children: ReactNode;
    duration?: number;
    viewportProps?: HTMLAttributes<HTMLDivElement>;
}
export declare function ToastProvider({ children, duration, viewportProps }: ToastProviderProps): import("react").JSX.Element;
export declare function useToast(): ToastContextValue;
type DataAttributes = {
    [key: `data-${string}`]: string | undefined;
};
export interface TooltipProps {
    children: ReactElement;
    content: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    contentProps?: (ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & HTMLAttributes<HTMLDivElement> & DataAttributes);
}
export declare const Tooltip: import("react").ForwardRefExoticComponent<TooltipProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
