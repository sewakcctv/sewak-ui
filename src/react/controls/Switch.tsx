import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'>;

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({ className, ...props }, ref) {
  return <input {...props} ref={ref} type="checkbox" role="switch" className={clsx('sewak-switch', className)} />;
});
