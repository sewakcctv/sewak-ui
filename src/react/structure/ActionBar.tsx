import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

export type ActionBarProps = HTMLAttributes<HTMLDivElement>;

export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(function ActionBar({ className, ...props }, ref) {
  return <div {...props} ref={ref} className={clsx('sewak-action-bar', className)} />;
});
