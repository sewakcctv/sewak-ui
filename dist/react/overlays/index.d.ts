import type { ReactElement, ReactNode } from 'react';
export interface DialogProps {
    trigger?: ReactElement;
    title: string;
    description?: string;
    children: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}
export declare function Dialog({ trigger, title, description, children, open, defaultOpen, onOpenChange, className }: DialogProps): import("react").JSX.Element;
export interface ConfirmDialogProps extends Omit<DialogProps, 'children'> {
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    danger?: boolean;
}
export declare function ConfirmDialog({ confirmLabel, cancelLabel, onConfirm, danger, ...props }: ConfirmDialogProps): import("react").JSX.Element;
export interface MenuItem {
    label: string;
    onSelect: () => void;
    disabled?: boolean;
}
export declare function DropdownMenu({ trigger, items }: {
    trigger: ReactElement;
    items: MenuItem[];
}): import("react").JSX.Element;
export interface DrawerProps extends DialogProps {
    side?: 'left' | 'right';
}
export declare function Drawer({ side, className, ...props }: DrawerProps): import("react").JSX.Element;
