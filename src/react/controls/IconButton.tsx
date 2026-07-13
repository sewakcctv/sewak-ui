import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'ghost', size = 'md', loading = false, disabled, className, type = 'button', ...props },
  ref,
) {
  return <button
    {...props}
    ref={ref}
    type={type}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    className={clsx('sewak-icon-button', `sewak-button--${variant}`, `sewak-button--${size}`, loading && 'sewak-button--loading', className)}
  />;
});
