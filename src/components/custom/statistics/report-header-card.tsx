import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type ReportHeaderCardItem = {
    title: string
    value: string
}

export type ReportHeaderCardProps = {
    title: string
    description?: ReactNode
    items?: ReportHeaderCardItem[]
    itemsClassName?: string
    className?: string
}

export function ReportHeaderCard({
    title,
    description,
    items = [],
    itemsClassName,
    className,
}: ReportHeaderCardProps) {
    return (
        <div className={cn('mt-3 mb-2 flex flex-col gap-6', className)}>
            <div className="space-y-1">
                <h2 className="text-2xl font-medium sm:text-3xl">{title}</h2>
                {description && (
                    <p className="text-muted-foreground text-sm">{description}</p>
                )}
            </div>
            {items.length > 0 && (
                <div
                    className={cn(
                        'grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
                        itemsClassName,
                    )}
                >
                    {items.map((item) => (
                        <div key={item.title}>
                            <p className="text-muted-foreground text-xs">
                                {item.title}
                            </p>
                            <p className="mt-1 font-medium tabular-nums">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
