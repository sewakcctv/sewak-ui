import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
export interface ToastInput {title:string;description?:string;variant?:'info'|'success'|'warning'|'danger'}
interface ToastItem extends ToastInput{id:number}
interface ToastContextValue{toast:(value:ToastInput)=>number;dismiss:(id:number)=>void}
const ToastContext=createContext<ToastContextValue|null>(null);
export function ToastProvider({children}:{children:ReactNode}){const [items,setItems]=useState<ToastItem[]>([]);const toast=useCallback((value:ToastInput)=>{const id=Date.now()+Math.random();setItems(current=>[...current,{...value,id}]);return id},[]);const dismiss=useCallback((id:number)=>setItems(current=>current.filter(item=>item.id!==id)),[]);const value=useMemo(()=>({toast,dismiss}),[toast,dismiss]);return <ToastContext.Provider value={value}>{children}<div className="sewak-toast-viewport" aria-label="Notifications">{items.map(item=><Toast key={item.id} {...item} onDismiss={()=>dismiss(item.id)}/>)}</div></ToastContext.Provider>}
export function useToast(){const value=useContext(ToastContext);if(!value)throw new Error('useToast must be used within ToastProvider');return value}
export function Toast({title,description,variant='info',onDismiss}:{title:string;description?:string;variant?:ToastInput['variant'];onDismiss:()=>void}){return <div role="status" className={clsx('sewak-toast',`sewak-toast--${variant}`)}><div><strong>{title}</strong>{description&&<p>{description}</p>}</div><button type="button" aria-label="Dismiss notification" onClick={onDismiss}>×</button></div>}
export function Tooltip({children,content}:{children:ReactElement;content:ReactNode}){return <TooltipPrimitive.Provider><TooltipPrimitive.Root><TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger><TooltipPrimitive.Portal><TooltipPrimitive.Content className="sewak-tooltip" sideOffset={6}>{content}<TooltipPrimitive.Arrow className="sewak-tooltip__arrow"/></TooltipPrimitive.Content></TooltipPrimitive.Portal></TooltipPrimitive.Root></TooltipPrimitive.Provider>}
