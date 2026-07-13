import type { HTMLAttributes, ReactNode } from 'react';
export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
    header: ReactNode;
    sidebar?: ReactNode;
    children: ReactNode;
    mainId?: string;
    skipLinkLabel?: string;
}
export declare const AppShell: import("react").ForwardRefExoticComponent<AppShellProps & import("react").RefAttributes<HTMLDivElement>>;
