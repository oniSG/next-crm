'use client'

import { useState } from 'react'
import { ChevronsUpDownIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function TagsSelect({
    id,
    options,
    value,
    onValueChange,
}: {
    id: string
    options: readonly string[]
    value: string[]
    onValueChange: (value: string[]) => void
}) {
    const [open, setOpen] = useState(false)

    function toggleTag(tag: string) {
        onValueChange(
            value.includes(tag) ? value.filter((item) => item !== tag) : [...value, tag],
        )
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                render={
                    <Button
                        id={id}
                        type="button"
                        variant="outline"
                        className="h-auto min-h-8 w-full justify-between whitespace-normal"
                    />
                }
            >
                <span className="flex flex-wrap gap-1">
                    {value.length > 0 ? (
                        value.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))
                    ) : (
                        <span className="text-muted-foreground">Select tags</span>
                    )}
                </span>
                <ChevronsUpDownIcon className="text-muted-foreground size-4 shrink-0" />
            </PopoverTrigger>
            <PopoverContent align="start" className="w-(--anchor-width) p-0">
                <Command>
                    <CommandInput placeholder="Search tags…" />
                    <CommandList>
                        <CommandEmpty>No tags found.</CommandEmpty>
                        {options.map((tag) => {
                            const selected = value.includes(tag)

                            return (
                                <CommandItem
                                    key={tag}
                                    value={tag}
                                    data-checked={selected}
                                    onSelect={() => toggleTag(tag)}
                                >
                                    {tag}
                                </CommandItem>
                            )
                        })}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
