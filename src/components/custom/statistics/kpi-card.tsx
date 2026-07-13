import { TrendingDown, TrendingUp } from 'lucide-react'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export type KpiCardProps = {
    label: string
    value: string
    delta: string
    hint?: string
    trend: 'up' | 'down'
    action?: React.ReactNode
}

export function KpiCard({ label, value, delta, hint, trend, action }: KpiCardProps) {
    const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown
    const trendColor = trend === 'up' ? 'text-chart-1' : 'text-chart-3'

    return (
        <Card>
            <CardHeader>
                <CardDescription>{label}</CardDescription>
                <CardTitle className="text-2xl">{value}</CardTitle>
                {action && <CardAction>{action}</CardAction>}
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-1.5 text-xs">
                    <TrendIcon className={`size-3.5 ${trendColor}`} />
                    <span className={`font-medium ${trendColor}`}>{delta}</span>
                    {hint && <span className="text-muted-foreground">{hint}</span>}
                </div>
            </CardContent>
        </Card>
    )
}
