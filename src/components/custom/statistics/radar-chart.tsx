'use client'

import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart as RechartsRadarChart,
} from 'recharts'

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

export type RadarChartProps = {
    data: object[]
    config: ChartConfig
    categoryKey: string
    series: string[]
    className?: string
}

export function RadarChart({
    data,
    config,
    categoryKey,
    series,
    className,
}: RadarChartProps) {
    return (
        <ChartContainer
            config={config}
            className={cn('mx-auto aspect-square max-h-65', className)}
        >
            <RechartsRadarChart data={data}>
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
            </RechartsRadarChart>
        </ChartContainer>
    )
}
