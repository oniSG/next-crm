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

function rowHasVisibleValue(row: object, keys: readonly string[]) {
    return keys.some((key) => {
        const value = (row as Record<string, unknown>)[key]
        return typeof value === 'number' ? value !== 0 : value != null && value !== ''
    })
}

export type RadarChartProps = {
    data: object[]
    config: ChartConfig
    categoryKey: string
    series: string[]
    className?: string
    emptyMessage?: string
}

export function RadarChart({
    data,
    config,
    categoryKey,
    series,
    className,
    emptyMessage = 'No data for the selected period.',
}: RadarChartProps) {
    if (
        data.length === 0 ||
        !data.some((row) => rowHasVisibleValue(row, series))
    ) {
        return (
            <div
                className={cn(
                    'text-muted-foreground mx-auto flex aspect-square max-h-65 w-full items-center justify-center px-4 text-center text-sm',
                    className,
                )}
            >
                {emptyMessage}
            </div>
        )
    }

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
