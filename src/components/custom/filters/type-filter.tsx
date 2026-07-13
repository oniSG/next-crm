'use client'

import { useState } from 'react'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export type TypeFilterOption = {
    value: string
    label: string
}

type TypeFilterProps = {
    options: TypeFilterOption[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
    searchPlaceholder?: string
    emptyMessage?: string
    className?: string
}

export function TypeFilter({
    options,
    value,
    onChange,
    placeholder = 'Select…',
    searchPlaceholder = 'Search…',
    emptyMessage = 'No results.',
    className,
}: TypeFilterProps) {
    const [open, setOpen] = useState(false)
    const selected = options.find((o) => o.value === value)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                render={
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn('w-56 justify-between', className)}
                    >
                        <span className="truncate">{selected?.label ?? placeholder}</span>
                        <ChevronDown className="size-4 opacity-50" />
                    </Button>
                }
            />
            <PopoverContent className="w-56 p-0" align="start">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {options.map((opt) => (
                                <CommandItem
                                    key={opt.value}
                                    value={opt.value}
                                    onSelect={() => {
                                        onChange(opt.value)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'size-4',
                                            value === opt.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    {opt.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
