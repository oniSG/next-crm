'use client'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import type { ChartConfig } from '@/components/ui/chart'

import { PieChart } from './pie-chart'

export type PieChartCardProps = {
    action?: React.ReactNode
    title: string
    description?: string
    data: { name: string; value: number; fill: string }[]
    config: ChartConfig
    className?: string
}

export function PieChartCard({
    action,
    title,
    description,
    data,
    config,
    className,
}: PieChartCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
                {action && <CardAction>{action}</CardAction>}
            </CardHeader>
            <CardContent>
                <PieChart data={data} config={config} />
            </CardContent>
        </Card>
    )
}
