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

import { LineChart } from './line-chart'

export type LineChartCardProps = {
    action?: React.ReactNode
    title: string
    description?: string
    data: object[]
    config: ChartConfig
    categoryKey: string
    series: string[]
    className?: string
    xAxisLabel?: string
    yAxisLabel?: string
    showYAxis?: boolean
    angledXAxis?: boolean
    showDots?: boolean
}

export function LineChartCard({
    action,
    title,
    description,
    data,
    config,
    categoryKey,
    series,
    className,
    xAxisLabel,
    yAxisLabel,
    showYAxis = false,
    angledXAxis = false,
    showDots = false,
}: LineChartCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
                {action && <CardAction>{action}</CardAction>}
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
                <LineChart
                    data={data}
                    config={config}
                    categoryKey={categoryKey}
                    series={series}
                    xAxisLabel={xAxisLabel}
                    yAxisLabel={yAxisLabel}
                    showYAxis={showYAxis}
                    angledXAxis={angledXAxis}
                    showDots={showDots}
                />
            </CardContent>
        </Card>
    )
}
