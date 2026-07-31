import type { ReactNode } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
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

export type KpiCardContent = {
    label?: string
    value: ReactNode
}

export type KpiCardProps = {
    label: string
    content: KpiCardContent[]
    trend?: KpiTrend
    action?: ReactNode
    icon?: ReactNode
    iconClassName?: string
    className?: string
}

export function KpiTrendFooter({ trend }: { trend: KpiTrend }) {
    const TrendIcon = trend.direction === 'up' ? TrendingUp : TrendingDown
    const trendColor =
        trend.direction === 'up' ? 'text-chart-1' : 'text-chart-3'

    return (
        <div className="flex items-center gap-1.5 text-xs">
            <TrendIcon className={`size-3.5 ${trendColor}`} />
            <span className={`font-medium ${trendColor}`}>{trend.delta}</span>
            {trend.hint && (
                <span className="text-muted-foreground">{trend.hint}</span>
            )}
        </div>
    )
}

export function KpiCard({
    label,
    content,
    trend,
    action,
    icon,
    iconClassName,
    className,
}: KpiCardProps) {
    const hero = content.find((item) => item.label == null)
    const rows = content.filter((item) => item.label != null)
    const isTableOnly = !hero && rows.length > 0

    return (
        <Card className={cn('h-full gap-0', className)}>
            <CardHeader className={cn(isTableOnly ? 'pb-2' : 'pb-0')}>
                {isTableOnly ? (
                    <CardTitle className="truncate text-sm font-medium">
                        {label}
                    </CardTitle>
                ) : (
                    <CardDescription>{label}</CardDescription>
                )}
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

            {hero && (
                <CardContent
                    className={cn(
                        'flex flex-1 flex-col py-6',
                        rows.length === 0 && 'items-center justify-center',
                    )}
                >
                    <div className="text-center text-3xl font-medium tabular-nums">
                        {hero.value}
                    </div>
                </CardContent>
            )}

            {rows.length > 0 && (
                <CardContent
                    className={cn(
                        'space-y-3 py-4',
                        hero && 'border-t',
                        !hero && 'flex-1',
                    )}
                >
                    {rows.map((item) => (
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
                    <KpiTrendFooter trend={trend} />
                </CardFooter>
            )}
        </Card>
    )
}
