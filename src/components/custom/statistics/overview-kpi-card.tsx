import type { ReactNode } from 'react'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type OverviewKpiMetric = {
    label: string
    value: ReactNode
}

export type OverviewKpiCardProps = {
    label: string
    value?: ReactNode
    icon?: ReactNode
    iconClassName?: string
    metrics?: OverviewKpiMetric[]
    className?: string
}

export function OverviewKpiCard({
    label,
    value,
    icon,
    iconClassName,
    metrics,
    className,
}: OverviewKpiCardProps) {
    const hasValue = value != null && value !== ''
    const hasMetrics = Boolean(metrics?.length)

    return (
        <Card className={cn('gap-0', className)}>
            <CardHeader className={cn(!hasValue && 'pb-2')}>
                {hasValue ? (
                    <>
                        <CardDescription>{label}</CardDescription>
                        <CardTitle className="text-3xl tabular-nums">
                            {value}
                        </CardTitle>
                    </>
                ) : (
                    <CardTitle className="truncate text-sm font-medium">
                        {label}
                    </CardTitle>
                )}
                {icon && (
                    <CardAction>
                        <div
                            className={cn(
                                'flex size-9 items-center justify-center rounded-lg',
                                iconClassName,
                            )}
                        >
                            {icon}
                        </div>
                    </CardAction>
                )}
            </CardHeader>
            {hasMetrics && (
                <CardContent
                    className={cn(
                        hasValue
                            ? 'space-y-2 border-t pt-4'
                            : 'flex flex-1 flex-col justify-center gap-4 py-6',
                    )}
                >
                    {metrics?.map((metric) => (
                        <div
                            key={metric.label}
                            className="flex items-center justify-between gap-4"
                        >
                            <span className="text-muted-foreground text-sm">
                                {metric.label}
                            </span>
                            <span className="text-sm font-medium tabular-nums">
                                {metric.value}
                            </span>
                        </div>
                    ))}
                </CardContent>
            )}
        </Card>
    )
}
