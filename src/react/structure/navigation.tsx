import { clsx } from 'clsx';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface NavigationItem extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> {
  href: string;
  label: ReactNode;
}

interface NavigationLinksProps {
  items: NavigationItem[];
  activeHref?: string | undefined;
  onActivate?: () => void;
}

export function NavigationLinks({ items, activeHref, onActivate }: NavigationLinksProps) {
  return (
    <ul className="sewak-nav__list">
      {items.map(({ href, label, className, onClick, ...linkProps }) => (
        <li key={href} className="sewak-nav__item">
          <a
            {...linkProps}
            href={href}
            className={clsx('sewak-nav__link', className)}
            aria-current={href === activeHref ? 'page' : undefined}
            onClick={(event) => {
              onClick?.(event);
              if (!event.defaultPrevented) onActivate?.();
            }}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
