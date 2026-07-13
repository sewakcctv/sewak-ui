import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { AriaRole, HTMLAttributes, ReactNode } from 'react';

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  header: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
  mainId?: string;
  mainRole?: AriaRole;
  mainLabel?: string;
  skipLinkLabel?: string;
}

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  { header, sidebar, children, mainId = 'sewak-main-content', mainRole = 'main', mainLabel, skipLinkLabel = 'Skip to main content', className, ...props },
  ref,
) {
  return (
    <div {...props} ref={ref} className={clsx('sewak-app-shell', className)}>
      <a className="sewak-skip-link" href={`#${mainId}`}>{skipLinkLabel}</a>
      {header}
      <div className={clsx('sewak-app-shell__body', !sidebar && 'sewak-app-shell__body--full')}>
        {sidebar}
        {mainRole === 'main'
          ? <main id={mainId} aria-label={mainLabel} className="sewak-app-shell__main" tabIndex={-1}>{children}</main>
          : <div id={mainId} role={mainRole} aria-label={mainLabel} className="sewak-app-shell__main" tabIndex={-1}>{children}</div>}
      </div>
    </div>
  );
});
