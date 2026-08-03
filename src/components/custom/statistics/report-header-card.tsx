'use client'

import type { ReactNode } from 'react'
import { parseAsBoolean, useQueryState } from 'nuqs'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type ReportHeaderCardItem = {
    title: string
    value: string
}

export type ReportHeaderCardProps = {
    title: string
    description?: ReactNode
    icon?: ReactNode
    items?: ReportHeaderCardItem[]
    itemsClassName?: string
    className?: string
    /** Only render when `headerVisible=true` is in the URL (used for PDF export). */
    exportOnly?: boolean
}

export function ReportHeaderCard({
    title,
    description,
    icon,
    items = [],
    itemsClassName,
    className,
    exportOnly = false,
}: ReportHeaderCardProps) {
    const [headerVisible] = useQueryState(
        'headerVisible',
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
    )

    if (exportOnly && !headerVisible) return null

    return (
        <Card className={cn('relative gap-0 overflow-hidden py-0', className)}>
            <CardHeader className="bg-primary/8 gap-3 border-b p-4">
                <div className="flex items-start gap-3">
                    {icon && (
                        <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-xl">
                            {icon}
                        </div>
                    )}
                    <div className="space-y-1">
                        <CardTitle className="text-2xl sm:text-3xl">
                            {title}
                        </CardTitle>
                        {description && (
                            <CardDescription>{description}</CardDescription>
                        )}
                    </div>
                </div>
            </CardHeader>
            {items.length > 0 && (
                <CardContent
                    className={cn(
                        'grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4',
                        itemsClassName,
                    )}
                >
                    {items.map((item) => (
                        <div key={item.title} className="flex items-start gap-3">
                            <div>
                                <p className="text-muted-foreground text-xs">
                                    {item.title}
                                </p>
                                <p className="mt-1 font-medium tabular-nums">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            )}
        </Card>
    )
}
