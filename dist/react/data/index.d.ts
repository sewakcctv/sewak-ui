import type { HTMLAttributes, ReactNode, TableHTMLAttributes } from 'react';
export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    caption: string;
}
export declare const Table: import("react").ForwardRefExoticComponent<TableProps & import("react").RefAttributes<HTMLTableElement>>;
export interface PaginationProps extends HTMLAttributes<HTMLElement> {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
}
export declare function Pagination({ page, pageCount, onPageChange, className, ...props }: PaginationProps): import("react").JSX.Element;
export interface TabItem {
    id: string;
    label: string;
    content: ReactNode;
    disabled?: boolean;
}
export declare function Tabs({ tabs, defaultValue, onValueChange }: {
    tabs: TabItem[];
    defaultValue?: string;
    onValueChange?: (id: string) => void;
}): import("react").JSX.Element;
export declare function StatCard({ label, value, trend, className, ...props }: {
    label: string;
    value: ReactNode;
    trend?: ReactNode;
} & HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
