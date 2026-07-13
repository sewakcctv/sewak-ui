import type { HTMLAttributes } from 'react';
export declare const Card: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
}
export declare const Badge: import("react").ForwardRefExoticComponent<BadgeProps & import("react").RefAttributes<HTMLSpanElement>>;
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'info' | 'success' | 'warning' | 'danger';
}
export declare const Alert: import("react").ForwardRefExoticComponent<AlertProps & import("react").RefAttributes<HTMLDivElement>>;
export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
}
export declare const EmptyState: import("react").ForwardRefExoticComponent<EmptyStateProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const Skeleton: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    label?: string;
}
export declare const Spinner: import("react").ForwardRefExoticComponent<SpinnerProps & import("react").RefAttributes<HTMLSpanElement>>;
export declare const Separator: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>, "ref"> & import("react").RefAttributes<HTMLHRElement>>;
