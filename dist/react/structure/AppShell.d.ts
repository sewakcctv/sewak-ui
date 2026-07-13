import type { AriaRole, HTMLAttributes, ReactNode } from 'react';
export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
    header: ReactNode;
    sidebar?: ReactNode;
    children: ReactNode;
    mainId?: string;
    mainRole?: AriaRole;
    mainLabel?: string;
    skipLinkLabel?: string;
}
export declare const AppShell: import("react").ForwardRefExoticComponent<AppShellProps & import("react").RefAttributes<HTMLDivElement>>;
