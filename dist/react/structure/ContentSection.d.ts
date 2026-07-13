import type { HTMLAttributes, ReactNode } from 'react';
export interface ContentSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    title?: ReactNode;
    description?: ReactNode;
    actions?: ReactNode;
}
export declare const ContentSection: import("react").ForwardRefExoticComponent<ContentSectionProps & import("react").RefAttributes<HTMLElement>>;
