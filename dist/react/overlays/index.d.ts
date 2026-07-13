import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as MenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactElement, ReactNode } from 'react';
export interface DialogProps extends Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, 'title' | 'children'> {
    trigger?: ReactElement;
    title: string;
    description?: string;
    children: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare const Dialog: import("react").ForwardRefExoticComponent<DialogProps & import("react").RefAttributes<HTMLDivElement>>;
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
type DataAttributes = {
    [key: `data-${string}`]: string | undefined;
};
export interface DropdownMenuProps {
    trigger: ReactElement;
    items: MenuItem[];
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    contentProps?: (ComponentPropsWithoutRef<typeof MenuPrimitive.Content> & HTMLAttributes<HTMLDivElement> & DataAttributes);
}
export declare const DropdownMenu: import("react").ForwardRefExoticComponent<DropdownMenuProps & import("react").RefAttributes<HTMLDivElement>>;
export interface DrawerProps extends DialogProps {
    side?: 'left' | 'right';
}
export declare const Drawer: import("react").ForwardRefExoticComponent<DrawerProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
