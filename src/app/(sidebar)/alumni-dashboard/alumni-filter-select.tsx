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

type AlumniFilterSelectProps = {
    options: ReadonlyArray<{ label: string; value: string }>
    value: string
    onChange: (value: string) => void
    placeholder: string
    /** When set, renders a labeled stack useful inside FiltersPopover. */
    label?: string
    className?: string
}

export function AlumniFilterSelect({
    options,
    value,
    onChange,
    placeholder,
    label,
    className,
}: AlumniFilterSelectProps) {
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
                    label ? 'w-full min-w-0 overflow-hidden' : 'w-40 min-w-0 overflow-hidden',
                    className,
                )}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} align="end">
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
            <Label htmlFor={id}>{label}</Label>
            {select}
        </div>
    )
}
