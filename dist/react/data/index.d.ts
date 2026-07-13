import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode, TableHTMLAttributes } from 'react';
export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    caption: string;
}
export declare const Table: import("react").ForwardRefExoticComponent<TableProps & import("react").RefAttributes<HTMLTableElement>>;
export interface PaginationProps extends ComponentPropsWithoutRef<'nav'> {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
}
export declare const Pagination: import("react").ForwardRefExoticComponent<PaginationProps & import("react").RefAttributes<HTMLElement>>;
export interface TabItem {
    id: string;
    label: string;
    content: ReactNode;
    disabled?: boolean;
}
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
    tabs: TabItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (id: string) => void;
}
export declare const Tabs: import("react").ForwardRefExoticComponent<TabsProps & import("react").RefAttributes<HTMLDivElement>>;
export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    value: ReactNode;
    trend?: ReactNode;
}
export declare const StatCard: import("react").ForwardRefExoticComponent<StatCardProps & import("react").RefAttributes<HTMLDivElement>>;
