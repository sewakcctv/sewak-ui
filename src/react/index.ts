export { SewakProvider, useSewak } from './provider/SewakProvider.js';
export type {
  Density,
  SewakContextValue,
  SewakProviderProps,
} from './provider/SewakProvider.js';
export type { ColorScheme, ResolvedColorScheme } from './provider/color-scheme.js';

export { Button } from './controls/Button.js';
export type { ButtonProps } from './controls/Button.js';
export { IconButton } from './controls/IconButton.js';
export type { IconButtonProps } from './controls/IconButton.js';
export { Input } from './controls/Input.js';
export type { InputProps } from './controls/Input.js';
export { Textarea } from './controls/Textarea.js';
export type { TextareaProps } from './controls/Textarea.js';
export { Select } from './controls/Select.js';
export type { SelectProps } from './controls/Select.js';
export { Checkbox } from './controls/Checkbox.js';
export type { CheckboxProps } from './controls/Checkbox.js';
export { Radio } from './controls/Radio.js';
export type { RadioProps } from './controls/Radio.js';
export { Switch } from './controls/Switch.js';
export type { SwitchProps } from './controls/Switch.js';
export { Field } from './controls/Field.js';
export type { FieldProps } from './controls/Field.js';

export { Card, Badge, Alert, EmptyState, Skeleton, Spinner, Separator } from './surfaces/index.js';
export type { BadgeProps, AlertProps, EmptyStateProps, SpinnerProps } from './surfaces/index.js';
export { ToastProvider, useToast, Tooltip } from './feedback/index.js';
export type { ToastInput, ToastProviderProps, TooltipProps } from './feedback/index.js';
export { Dialog, ConfirmDialog, DropdownMenu, Drawer } from './overlays/index.js';
export type { DialogProps, ConfirmDialogProps, DropdownMenuProps, MenuItem, DrawerProps } from './overlays/index.js';
export { Table, Pagination, Tabs, StatCard } from './data/index.js';
export type { TableProps, PaginationProps, TabsProps, TabItem, StatCardProps } from './data/index.js';

const Placeholder = ({children}:{children?:ReactNode}) => children ?? null;
export const AppShell = Placeholder;
export const Header = Placeholder;
export const Sidebar = Placeholder;
export const MobileNav = Placeholder;
export const PageHeader = Placeholder;
export const ContentSection = Placeholder;
export const ActionBar = Placeholder;
import type { ReactNode } from 'react';
