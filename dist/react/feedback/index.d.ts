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
type DataAttributes = {
    [key: `data-${string}`]: string | undefined;
};
export interface ToastProviderProps {
    children: ReactNode;
    duration?: number;
    viewportProps?: (ComponentPropsWithoutRef<'div'> & DataAttributes);
}
export declare const ToastProvider: import("react").ForwardRefExoticComponent<ToastProviderProps & import("react").RefAttributes<HTMLDivElement>>;
export declare function useToast(): ToastContextValue;
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
