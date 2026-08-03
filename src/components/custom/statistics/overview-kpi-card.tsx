import type { KeyboardEvent, ReactNode } from 'react'

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
    valueClassName?: string
    onClick?: () => void
    ariaLabel?: string
}

export function OverviewKpiCard({
    label,
    value,
    icon,
    iconClassName,
    metrics,
    className,
    valueClassName,
    onClick,
    ariaLabel,
}: OverviewKpiCardProps) {
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (!onClick || (event.key !== 'Enter' && event.key !== ' ')) return
        event.preventDefault()
        onClick()
    }

    return (
        <Card
            className={cn(
                onClick &&
                    'hover:bg-muted/40 focus-visible:ring-primary cursor-pointer transition-colors outline-none focus-visible:ring-2',
                className,
            )}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            aria-label={ariaLabel}
            onClick={onClick}
            onKeyDown={handleKeyDown}
        >
            <CardHeader>
                <CardDescription>{label}</CardDescription>
                <CardTitle className={cn('text-3xl tabular-nums', valueClassName)}>
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
                        <span className="text-muted-foreground">{metric.label}</span>
                        <span className="font-medium tabular-nums">{metric.value}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
