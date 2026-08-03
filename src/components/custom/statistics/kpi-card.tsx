'use client'

import type { KeyboardEvent, ReactNode } from 'react'
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
    value: string | number
}

export type KpiCardProps = {
    label: string
    value?: string | number
    content?: KpiCardContent[]
    trend?: KpiTrend
    metric?: KpiMetric
    action?: ReactNode
    icon?: ReactNode
    iconClassName?: string
    className?: string
    valueClassName?: string
    onClick?: () => void
    ariaLabel?: string
}

export function KpiCard({
    label,
    value,
    content,
    trend,
    metric,
    action,
    icon,
    iconClassName,
    className,
    valueClassName,
    onClick,
    ariaLabel,
}: KpiCardProps) {
    const TrendIcon = trend?.direction === 'up' ? TrendingUp : TrendingDown
    const trendColor = trend?.direction === 'up' ? 'text-chart-1' : 'text-chart-3'

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (!onClick || (event.key !== 'Enter' && event.key !== ' ')) return
        event.preventDefault()
        onClick()
    }

    return (
        <Card
            className={cn(
                'h-full gap-0',
                onClick &&
                    'hover:bg-muted/40 focus-visible:ring-primary cursor-pointer transition-colors outline-none focus-visible:ring-2',
                className,
            )}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            aria-label={ariaLabel}
            onClick={onClick}
            onKeyDown={onClick ? handleKeyDown : undefined}
        >
            <CardHeader className={cn(content || metric ? 'pb-2' : 'pb-0')}>
                <div className="flex min-w-0 items-center gap-2">
                    {icon && (
                        <div
                            className={cn(
                                'flex size-9 shrink-0 items-center justify-center rounded-lg',
                                iconClassName,
                            )}
                        >
                            {icon}
                        </div>
                    )}
                    <CardTitle className="truncate text-sm font-medium">
                        {label}
                    </CardTitle>
                </div>
                {action && <CardAction>{action}</CardAction>}
            </CardHeader>

            {value && (
                <CardContent
                    className={cn(
                        'flex shrink-0',
                        !content && 'flex-1',
                        metric
                            ? cn(
                                  'items-baseline justify-between gap-4',
                                  content ? 'py-6' : 'py-2',
                              )
                            : cn(
                                  'flex-col py-6',
                                  !content && 'items-center justify-center',
                              ),
                    )}
                >
                    <span
                        className={cn(
                            'text-3xl font-medium tabular-nums',
                            !metric && 'text-center',
                            valueClassName,
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

            {content && (
                <CardContent className={cn('flex-1 space-y-1 py-4', value && 'border-t')}>
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
                        <span className={`font-medium ${trendColor}`}>{trend.delta}</span>
                        {trend.hint && (
                            <span className="text-muted-foreground">{trend.hint}</span>
                        )}
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}
