import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Card({className,...props},ref){return <div ref={ref} className={clsx('sewak-card',className)} {...props}/>});
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>{variant?:'neutral'|'primary'|'success'|'warning'|'danger'}
export const Badge=forwardRef<HTMLSpanElement,BadgeProps>(function Badge({variant='neutral',className,...props},ref){return <span ref={ref} className={clsx('sewak-badge',`sewak-badge--${variant}`,className)} {...props}/>});
export interface AlertProps extends HTMLAttributes<HTMLDivElement>{variant?:'info'|'success'|'warning'|'danger'}
export const Alert=forwardRef<HTMLDivElement,AlertProps>(function Alert({variant='info',className,...props},ref){return <div ref={ref} role="alert" className={clsx('sewak-alert',`sewak-alert--${variant}`,className)} {...props}/>});
export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement>{title:string;description?:string}
export const EmptyState=forwardRef<HTMLDivElement,EmptyStateProps>(function EmptyState({title,description,children,className,...props},ref){return <div ref={ref} className={clsx('sewak-empty-state',className)} {...props}><h3>{title}</h3>{description&&<p>{description}</p>}{children}</div>});
export const Skeleton=forwardRef<HTMLDivElement,HTMLAttributes<HTMLDivElement>>(function Skeleton({className,...props},ref){return <div ref={ref} className={clsx('sewak-skeleton',className)} {...props}/>});
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement>{label?:string}
export const Spinner=forwardRef<HTMLSpanElement,SpinnerProps>(function Spinner({label='Loading',className,...props},ref){return <span ref={ref} role="status" aria-label={label} className={clsx('sewak-spinner',className)} {...props}><span className="sewak-visually-hidden">{label}</span></span>});
export const Separator=forwardRef<HTMLHRElement,React.ComponentPropsWithoutRef<'hr'>>(function Separator({className,...props},ref){return <hr ref={ref} className={clsx('sewak-separator',className)} {...props}/>});
