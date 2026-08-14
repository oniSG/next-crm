'use client'

import { useId, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export type MultiSelectFilterOption = {
    label: string
    value: string
}

export type MultiSelectFilterProps = {
    options: ReadonlyArray<MultiSelectFilterOption>
    value: string[]
    onChange: (value: string[]) => void
    placeholder?: string
    label?: string
    /** Compact label shown inside the trigger (for toolbars). */
    leadingLabel?: string
    searchPlaceholder?: string
    emptyMessage?: string
    searchable?: boolean
    className?: string
}

export function MultiSelectFilter({
    options,
    value,
    onChange,
    placeholder = 'Vybrat…',
    label,
    leadingLabel,
    searchPlaceholder = 'Hledat…',
    emptyMessage = 'Žádné výsledky.',
    searchable = true,
    className,
}: MultiSelectFilterProps) {
    const id = useId()
    const [open, setOpen] = useState(false)
    const selectedLabels = options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label)

    const orderedOptions = [
        ...options.filter((option) => value.includes(option.value)),
        ...options.filter((option) => !value.includes(option.value)),
    ]

    const display =
        selectedLabels.length === 0
            ? placeholder
            : selectedLabels.length === 1
              ? selectedLabels[0]
              : `${selectedLabels.length} vybráno`

    function toggle(optionValue: string) {
        if (value.includes(optionValue)) {
            onChange(value.filter((item) => item !== optionValue))
            return
        }
        onChange([...value, optionValue])
    }

    const trigger = (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                render={
                    <Button
                        id={label ? id : undefined}
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            'w-44 min-w-0 justify-between gap-2 overflow-hidden font-normal',
                            className,
                        )}
                    >
                        <span className="flex min-w-0 items-center gap-2 truncate">
                            {leadingLabel ? (
                                <span className="text-muted-foreground shrink-0 text-sm">
                                    {leadingLabel}
                                </span>
                            ) : null}
                            <span className="truncate">{display}</span>
                        </span>
                        <ChevronDown className="size-4 shrink-0 opacity-50" />
                    </Button>
                }
            />
            <PopoverContent className="w-64 p-0" align="end">
                <Command>
                    {searchable ? (
                        <CommandInput placeholder={searchPlaceholder} />
                    ) : null}
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {orderedOptions.map((option) => {
                                const selected = value.includes(option.value)
                                return (
                                    <CommandItem
                                        key={option.value}
                                        value={option.label}
                                        onSelect={() => toggle(option.value)}
                                    >
                                        <Check
                                            className={cn(
                                                'size-4',
                                                selected ? 'opacity-100' : 'opacity-0',
                                            )}
                                        />
                                        <span className="truncate">{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )

    if (!label) return trigger

    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor={id}>{label}</Label>
            {trigger}
        </div>
    )
}
