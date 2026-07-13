import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ className, ...props }, ref) {
  return <select {...props} ref={ref} className={clsx('sewak-select', className)} />;
});
