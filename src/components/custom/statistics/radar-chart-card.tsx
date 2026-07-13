'use client'

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'

export type RadarChartCardProps = {
    action?: React.ReactNode
    title: string
    description?: string
    data: object[]
    config: ChartConfig
    categoryKey: string
    series: string[]
    className?: string
}

export function RadarChartCard({
    action,
    title,
    description,
    data,
    config,
    categoryKey,
    series,
    className,
}: RadarChartCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
                {action && <CardAction>{action}</CardAction>}
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={config}
                    className="mx-auto aspect-square max-h-65"
                >
                    <RadarChart data={data}>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <PolarGrid />
                        <PolarAngleAxis dataKey={categoryKey} />
                        {series.map((key) => (
                            <Radar
                                key={key}
                                dataKey={key}
                                stroke={`var(--color-${key})`}
                                fill={`var(--color-${key})`}
                                fillOpacity={0.4}
                            />
                        ))}
                        <ChartLegend content={<ChartLegendContent />} />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
