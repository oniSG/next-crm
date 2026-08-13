import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type FiltersProps = {
    filters: ReactNode[]
    className?: string
}

export function Filters({ filters, className }: FiltersProps) {
    if (filters.length === 0) return null

    return (
        <div
            className={cn('flex flex-wrap items-end gap-3', className)}
            role="group"
            aria-label="Filtry"
        >
            {filters.map((filter, index) => (
                <div key={index} className="min-w-0">
                    {filter}
                </div>
            ))}
        </div>
    )
}
