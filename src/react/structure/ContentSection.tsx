import { clsx } from 'clsx';
import { forwardRef, useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface ContentSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export const ContentSection = forwardRef<HTMLElement, ContentSectionProps>(function ContentSection(
  { title, description, actions, children, className, 'aria-label': ariaLabel, 'aria-labelledby': labelledBy, ...props },
  ref,
) {
  const headingId = useId();
  return (
    <section
      {...props}
      ref={ref}
      className={clsx('sewak-content-section', className)}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy ?? (title ? headingId : undefined)}
    >
      {(title || description || actions) && (
        <div className="sewak-content-section__header">
          <div>
            {title && <h2 id={headingId} className="sewak-content-section__title">{title}</h2>}
            {description && <div className="sewak-content-section__description">{description}</div>}
          </div>
          {actions && <div className="sewak-content-section__actions">{actions}</div>}
        </div>
      )}
      <div className="sewak-content-section__body">{children}</div>
    </section>
  );
});
