'use client'

import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { useTablePage } from '../context'

type HeadingCellProps = {
    field: string
    label: React.ReactNode
    align?: 'left' | 'right' | 'center'
    className?: string
}

export function HeadingCell({
    field,
    label,
    align = 'left',
    className,
}: HeadingCellProps) {
    const { sortBy, sortDir, toggleSort } = useTablePage()
    const active = sortBy === field
    const direction = active ? sortDir : null

    const Icon =
        direction === 'asc'
            ? ArrowUpIcon
            : direction === 'desc'
              ? ArrowDownIcon
              : ChevronsUpDownIcon

    const justify =
        align === 'right'
            ? 'justify-end'
            : align === 'center'
              ? 'justify-center'
              : 'justify-start'

    const content = (iconClass: string) =>
        align === 'right' ? (
            <>
                <Icon className={cn('size-3.5 shrink-0', iconClass)} />
                <span>{label}</span>
            </>
        ) : (
            <>
                <span>{label}</span>
                <Icon className={cn('size-3.5 shrink-0', iconClass)} />
            </>
        )

    return (
        <>
            <span
                aria-hidden="true"
                className={cn(
                    'pointer-events-none invisible flex items-center gap-1.5',
                    justify,
                )}
            >
                {content('')}
            </span>
            <button
                type="button"
                onClick={() => toggleSort(field)}
                className={cn(
                    'group/heading absolute inset-x-0 top-0 bottom-px flex cursor-pointer items-center gap-1.5 px-2 text-sm font-medium whitespace-nowrap outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50',
                    justify,
                    className,
                )}
            >
                {content(
                    active
                        ? 'text-foreground'
                        : 'text-muted-foreground/70 group-hover/heading:text-muted-foreground',
                )}
            </button>
        </>
    )
}
