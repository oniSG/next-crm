import { TrendingDown, TrendingUp } from 'lucide-react'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export type KpiTrend = {
    direction: 'up' | 'down'
    delta: string
    hint?: string
}

export type KpiCardProps = {
    label: string
    value: string
    trend?: KpiTrend
    action?: React.ReactNode
}

export function KpiCard({ label, value, trend, action }: KpiCardProps) {
    const TrendIcon = trend?.direction === 'up' ? TrendingUp : TrendingDown
    const trendColor =
        trend?.direction === 'up' ? 'text-chart-1' : 'text-chart-3'

    return (
        <Card>
            <CardHeader>
                <CardDescription>{label}</CardDescription>
                <CardTitle className="text-2xl">{value}</CardTitle>
                {action && <CardAction>{action}</CardAction>}
            </CardHeader>
            {trend && (
                <CardContent>
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
                </CardContent>
            )}
        </Card>
    )
}
