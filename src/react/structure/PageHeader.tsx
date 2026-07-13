import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { title, description, actions, className, ...props },
  ref,
) {
  return (
    <div {...props} ref={ref} className={clsx('sewak-page-header', className)}>
      <div className="sewak-page-header__content">
        <h1 className="sewak-page-header__title">{title}</h1>
        {description && <div className="sewak-page-header__description">{description}</div>}
      </div>
      {actions && <div className="sewak-page-header__actions">{actions}</div>}
    </div>
  );
});
