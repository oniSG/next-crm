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
    className?: string
    contentAlign?: 'start' | 'center' | 'end'
}

export function SelectFilter({
    options,
    value,
    onChange,
    placeholder,
    label,
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
                    label ? 'w-full min-w-0 overflow-hidden' : 'w-40 min-w-0 overflow-hidden',
                    className,
                )}
            >
                <SelectValue placeholder={placeholder ?? label} />
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
            <Label htmlFor={id}>{label}</Label>
            {select}
        </div>
    )
}
