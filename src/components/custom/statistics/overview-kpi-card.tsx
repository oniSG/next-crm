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
    value: ReactNode
    icon: ReactNode
    iconClassName?: string
    metrics: OverviewKpiMetric[]
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
    return (
        <Card className={className}>
            <CardHeader>
                <CardDescription>{label}</CardDescription>
                <CardTitle className="text-3xl tabular-nums">
                    {value}
                </CardTitle>
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
            </CardHeader>
            <CardContent className="space-y-2 border-t pt-4">
                {metrics.map((metric) => (
                    <div
                        key={metric.label}
                        className="flex items-center justify-between gap-4"
                    >
                        <span className="text-muted-foreground">
                            {metric.label}
                        </span>
                        <span className="font-medium tabular-nums">
                            {metric.value}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
