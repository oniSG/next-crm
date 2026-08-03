'use client'

import { useState, type ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
    checked?: boolean
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean) => void
    name?: string
}

function Switch({
    checked,
    defaultChecked = false,
    onCheckedChange,
    name,
    className,
    disabled,
    onClick,
    ...props
}: SwitchProps) {
    const [internalChecked, setInternalChecked] = useState(defaultChecked)
    const isControlled = checked !== undefined
    const active = isControlled ? checked : internalChecked

    return (
        <>
            {name && (
                <input type="hidden" name={name} value={active ? 'true' : 'false'} />
            )}
            <button
                type="button"
                role="switch"
                aria-checked={active}
                disabled={disabled}
                className={cn(
                    'group bg-input focus-visible:ring-ring/50 aria-checked:bg-primary relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                onClick={(event) => {
                    onClick?.(event)
                    if (event.defaultPrevented) return
                    const next = !active
                    if (!isControlled) setInternalChecked(next)
                    onCheckedChange?.(next)
                }}
                {...props}
            >
                <span className="bg-background pointer-events-none absolute top-0.5 left-0.5 size-4 rounded-full shadow-sm transition-transform group-aria-checked:translate-x-4" />
            </button>
        </>
    )
}

export { Switch }
