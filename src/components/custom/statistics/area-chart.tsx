'use client'

import {
    Area,
    AreaChart as RechartsAreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
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

export type AreaChartProps = {
    data: object[]
    config: ChartConfig
    categoryKey: string
    series: string[]
    stacked?: boolean
    className?: string
}

export function AreaChart({
    data,
    config,
    categoryKey,
    series,
    stacked = true,
    className,
}: AreaChartProps) {
    return (
        <ChartContainer
            config={config}
            className={cn('aspect-auto h-full min-h-56 w-full', className)}
        >
            <RechartsAreaChart
                accessibilityLayer
                data={data}
                margin={{ left: 0, right: 12 }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={categoryKey}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                {series.map((key) => (
                    <Area
                        key={key}
                        dataKey={key}
                        type="monotone"
                        stackId={stacked ? 'a' : undefined}
                        stroke={`var(--color-${key})`}
                        fill={`var(--color-${key})`}
                        fillOpacity={0.4}
                    />
                ))}
            </RechartsAreaChart>
        </ChartContainer>
    )
}
