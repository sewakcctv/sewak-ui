import type { ReactNode } from 'react';

export { SewakProvider, useSewak } from './provider/SewakProvider.js';
export type {
  Density,
  SewakContextValue,
  SewakProviderProps,
} from './provider/SewakProvider.js';
export type { ColorScheme, ResolvedColorScheme } from './provider/color-scheme.js';

interface PlaceholderProps {
  children?: ReactNode;
}

function Placeholder({ children }: PlaceholderProps): ReactNode {
  return children ?? null;
}

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

export const Card = Placeholder;
export const Badge = Placeholder;
export const Alert = Placeholder;
export const Toast = Placeholder;
export const ToastProvider = Placeholder;
export const Tooltip = Placeholder;
export const EmptyState = Placeholder;
export const Skeleton = Placeholder;
export const Spinner = Placeholder;
export const Separator = Placeholder;

export const Dialog = Placeholder;
export const ConfirmDialog = Placeholder;
export const DropdownMenu = Placeholder;
export const Drawer = Placeholder;

export const Table = Placeholder;
export const Pagination = Placeholder;
export const Tabs = Placeholder;
export const StatCard = Placeholder;

export const AppShell = Placeholder;
export const Header = Placeholder;
export const Sidebar = Placeholder;
export const MobileNav = Placeholder;
export const PageHeader = Placeholder;
export const ContentSection = Placeholder;
export const ActionBar = Placeholder;
