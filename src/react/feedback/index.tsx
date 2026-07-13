import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';
import { createContext, forwardRef, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, ReactElement, ReactNode } from 'react';

export interface ToastInput { title:string; description?:string; variant?:'info'|'success'|'warning'|'danger'; duration?:number }
interface ToastItem extends ToastInput { id:number }
interface ToastContextValue { toast:(value:ToastInput)=>number; dismiss:(id:number)=>void }
const ToastContext=createContext<ToastContextValue|null>(null);
let nextToastId=0;

interface ToastViewProps extends Omit<HTMLAttributes<HTMLDivElement>,'title'|'id'>, ToastInput { onDismiss:()=>void }
const ToastView=forwardRef<HTMLDivElement,ToastViewProps>(function ToastView({title,description,variant='info',onDismiss,className,...props},ref){return <div ref={ref} role="status" className={clsx('sewak-toast',`sewak-toast--${variant}`,className)} {...props}><div><strong>{title}</strong>{description&&<p>{description}</p>}</div><button type="button" aria-label="Dismiss notification" onClick={onDismiss}>×</button></div>});
function ManagedToast({item,duration,onDismiss}:{item:ToastItem;duration:number;onDismiss:()=>void}){useEffect(()=>{const timeout=window.setTimeout(onDismiss,item.duration??duration);return()=>window.clearTimeout(timeout)},[duration,item.duration,onDismiss]);return <ToastView title={item.title} {...(item.description?{description:item.description}:{})} {...(item.variant?{variant:item.variant}:{})} onDismiss={onDismiss}/>}
export interface ToastProviderProps { children:ReactNode; duration?:number; viewportProps?:HTMLAttributes<HTMLDivElement> }
export function ToastProvider({children,duration=5000,viewportProps}:ToastProviderProps){const [items,setItems]=useState<ToastItem[]>([]);const toast=useCallback((value:ToastInput)=>{const id=++nextToastId;setItems(current=>[...current,{...value,id}]);return id},[]);const dismiss=useCallback((id:number)=>setItems(current=>current.filter(item=>item.id!==id)),[]);const value=useMemo(()=>({toast,dismiss}),[toast,dismiss]);return <ToastContext.Provider value={value}>{children}<div {...viewportProps} className={clsx('sewak-toast-viewport',viewportProps?.className)} aria-label={viewportProps?.['aria-label']??'Notifications'}>{items.map(item=><ManagedToast key={item.id} item={item} duration={duration} onDismiss={()=>dismiss(item.id)}/>)}</div></ToastContext.Provider>}
export function useToast(){const value=useContext(ToastContext);if(!value)throw new Error('useToast must be used within ToastProvider');return value}

type DataAttributes = { [key:`data-${string}`]: string|undefined };
export interface TooltipProps { children:ReactElement; content:ReactNode; open?:boolean; defaultOpen?:boolean; onOpenChange?:(open:boolean)=>void; contentProps?:(ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>&HTMLAttributes<HTMLDivElement>&DataAttributes) }
export const Tooltip=forwardRef<ElementRef<typeof TooltipPrimitive.Content>,TooltipProps>(function Tooltip({children,content,open,defaultOpen,onOpenChange,contentProps},ref){const rootProps={...(open!==undefined?{open}:{}),...(defaultOpen!==undefined?{defaultOpen}:{}),...(onOpenChange?{onOpenChange}:{})};return <TooltipPrimitive.Provider><TooltipPrimitive.Root {...rootProps}><TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger><TooltipPrimitive.Portal><TooltipPrimitive.Content {...contentProps} ref={ref} className={clsx('sewak-tooltip',contentProps?.className)} sideOffset={contentProps?.sideOffset??6}>{content}<TooltipPrimitive.Arrow className="sewak-tooltip__arrow"/></TooltipPrimitive.Content></TooltipPrimitive.Portal></TooltipPrimitive.Root></TooltipPrimitive.Provider>});
