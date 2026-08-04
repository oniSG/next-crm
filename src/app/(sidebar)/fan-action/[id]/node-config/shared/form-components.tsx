'use client'

import * as React from 'react'
import { InfoIcon } from 'lucide-react'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

import { labelClass, selectTriggerClass } from './constants'

export function FieldLabel({
    htmlFor,
    children,
    required,
    className,
}: {
    htmlFor?: string
    children: React.ReactNode
    required?: boolean
    className?: string
}) {
    return (
        <label htmlFor={htmlFor} className={cn(labelClass, className)}>
            {children}
            {required ? (
                <span className="text-destructive" aria-hidden>
                    *
                </span>
            ) : null}
        </label>
    )
}

export function FieldLabelWithInfo({
    label,
    description,
    htmlFor,
    required,
}: {
    label: string
    description: string
    htmlFor?: string
    required?: boolean
}) {
    return (
        <div className="flex items-center gap-1.5">
            <FieldLabel htmlFor={htmlFor} required={required}>
                {label}
            </FieldLabel>
            <HoverCard>
                <HoverCardTrigger
                    render={
                        <button
                            type="button"
                            className="inline-flex shrink-0 cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                        />
                    }
                >
                    <InfoIcon className="size-3.5" />
                    <span className="sr-only">{label}</span>
                </HoverCardTrigger>
                <HoverCardContent side="left" className="w-56">
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{label}</h4>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}

export function FieldSelect({
    value,
    onValueChange,
    options,
    placeholder,
    className,
    triggerClassName,
}: {
    value: string
    onValueChange: (value: string) => void
    options: readonly { value: string; label: string }[] | readonly string[]
    placeholder?: string
    className?: string
    triggerClassName?: string
}) {
    const items = React.useMemo(
        () =>
            options.map((option) =>
                typeof option === 'string'
                    ? { value: option, label: option }
                    : option,
            ),
        [options],
    )

    return (
        <Select
            items={items}
            value={value || null}
            onValueChange={(next) => {
                if (typeof next === 'string' && next !== value) {
                    onValueChange(next)
                }
            }}
        >
            <SelectTrigger
                className={cn(selectTriggerClass, triggerClassName, className)}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export function FieldError({ message }: { message?: string }) {
    if (!message) return null
    return <p className="text-destructive text-sm">{message}</p>
}
