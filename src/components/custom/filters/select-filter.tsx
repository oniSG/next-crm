'use client'

import { useId } from 'react'

import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export type SelectFilterOption = {
    label: string
    value: string
}

export type SelectFilterProps = {
    options: ReadonlyArray<SelectFilterOption>
    value: string
    onChange: (value: string) => void
    placeholder?: string
    label?: string
    labelClassName?: string
    /** Compact label shown inside the trigger (for toolbars). */
    leadingLabel?: string
    className?: string
    contentAlign?: 'start' | 'center' | 'end'
}

export function SelectFilter({
    options,
    value,
    onChange,
    placeholder,
    label,
    labelClassName,
    leadingLabel,
    className,
    contentAlign = 'end',
}: SelectFilterProps) {
    const id = useId()

    const select = (
        <Select
            items={[...options]}
            value={value}
            onValueChange={(next) => {
                if (next) onChange(next)
            }}
        >
            <SelectTrigger
                id={label ? id : undefined}
                className={cn(
                    label
                        ? 'w-full min-w-0 overflow-hidden'
                        : leadingLabel
                          ? 'w-auto min-w-0'
                          : 'w-40 min-w-0 overflow-hidden',
                    leadingLabel && 'gap-2 whitespace-nowrap',
                    leadingLabel &&
                        '*:data-[slot=select-value]:line-clamp-none *:data-[slot=select-value]:overflow-visible *:data-[slot=select-value]:text-clip',
                    className,
                )}
            >
                {leadingLabel ? (
                    <span className="text-muted-foreground shrink-0 text-sm">
                        {leadingLabel}
                    </span>
                ) : null}
                <SelectValue
                    placeholder={placeholder ?? label}
                    className={leadingLabel ? 'shrink-0' : undefined}
                />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} align={contentAlign}>
                <SelectGroup>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )

    if (!label) return select

    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor={id} className={labelClassName}>
                {label}
            </Label>
            {select}
        </div>
    )
}
