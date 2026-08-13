'use client'

import type { ReactNode } from 'react'
import { ChevronDown, ListFilter } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export type FiltersPopoverProps = {
    children: ReactNode
    /** Number of filters that differ from defaults; shown as a badge. */
    activeCount?: number
    className?: string
    label?: string
}

export function FiltersPopover({
    children,
    activeCount = 0,
    className,
    label = 'Filtry',
}: FiltersPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button
                        variant="outline"
                        className={cn('gap-2', className)}
                        aria-label={label}
                    >
                        <ListFilter data-icon="inline-start" />
                        <span>{label}</span>
                        {activeCount > 0 ? (
                            <Badge variant="secondary" className="h-5 min-w-5 px-1.5">
                                {activeCount}
                            </Badge>
                        ) : null}
                        <ChevronDown className="opacity-50" data-icon="inline-end" />
                    </Button>
                }
            />
            <PopoverContent align="end" className="w-80 gap-0 p-3">
                <div className="flex flex-col gap-3">{children}</div>
            </PopoverContent>
        </Popover>
    )
}
