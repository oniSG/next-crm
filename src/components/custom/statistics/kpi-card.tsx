import type { ReactNode } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'

import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type KpiTrend = {
    direction: 'up' | 'down'
    delta: string
    hint?: string
}

export type KpiMetric = {
    label: string
    value: string
}

export type KpiCardContent = {
    label: string
    value: ReactNode
}

export type KpiCardProps = {
    label: string
    value?: ReactNode
    content?: KpiCardContent[]
    trend?: KpiTrend
    metric?: KpiMetric
    action?: ReactNode
    icon?: ReactNode
    iconClassName?: string
    className?: string
}

export function KpiCard({
    label,
    value,
    content = [],
    trend,
    metric,
    action,
    icon,
    iconClassName,
    className,
}: KpiCardProps) {
    const TrendIcon = trend?.direction === 'up' ? TrendingUp : TrendingDown
    const trendColor =
        trend?.direction === 'up' ? 'text-chart-1' : 'text-chart-3'

    return (
        <Card className={cn('h-full gap-0', className)}>
            <CardHeader
                className={cn(content.length > 0 || metric ? 'pb-2' : 'pb-0')}
            >
                <CardTitle className="truncate text-sm font-medium">
                    {label}
                </CardTitle>
                {(action || icon) && (
                    <CardAction>
                        {action ?? (
                            <div
                                className={cn(
                                    'flex size-9 items-center justify-center rounded-lg',
                                    iconClassName,
                                )}
                            >
                                {icon}
                            </div>
                        )}
                    </CardAction>
                )}
            </CardHeader>

            {value && (
                <CardContent
                    className={cn(
                        'flex',
                        content.length === 0 && 'flex-1',
                        metric
                            ? 'items-baseline justify-between gap-4 py-2'
                            : cn(
                                  'flex-col py-6',
                                  content.length === 0 &&
                                      'items-center justify-center',
                              ),
                    )}
                >
                    <span
                        className={cn(
                            'text-3xl font-medium tabular-nums',
                            !metric && 'text-center',
                        )}
                    >
                        {value}
                    </span>
                    {metric && (
                        <div className="text-muted-foreground flex items-baseline gap-1.5 text-sm">
                            <span>{metric.label}</span>
                            <span aria-hidden>—</span>
                            <span className="tabular-nums">{metric.value}</span>
                        </div>
                    )}
                </CardContent>
            )}

            {content.length > 0 && (
                <CardContent
                    className={cn(
                        'space-y-3 py-4',
                        value && 'border-t',
                        !value && 'flex-1',
                    )}
                >
                    {content.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center justify-between gap-4"
                        >
                            <span className="text-muted-foreground text-sm">
                                {item.label}
                            </span>
                            <span className="text-sm font-medium tabular-nums">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </CardContent>
            )}

            {trend && (
                <CardFooter className="mt-auto">
                    <div className="flex items-center gap-1.5 text-xs">
                        <TrendIcon className={`size-3.5 ${trendColor}`} />
                        <span className={`font-medium ${trendColor}`}>
                            {trend.delta}
                        </span>
                        {trend.hint && (
                            <span className="text-muted-foreground">
                                {trend.hint}
                            </span>
                        )}
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}
