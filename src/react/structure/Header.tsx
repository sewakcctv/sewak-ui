import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

export type HeaderProps = HTMLAttributes<HTMLElement>;

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header({ className, ...props }, ref) {
  return <header {...props} ref={ref} className={clsx('sewak-header', className)} />;
});
