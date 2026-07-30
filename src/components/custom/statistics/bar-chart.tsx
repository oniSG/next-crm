'use client'

import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

export type BarChartProps = {
    data: object[]
    config: ChartConfig
    categoryKey: string
    series: string[]
    className?: string
    stacked?: boolean
    showYAxis?: boolean
}

function getBarRadius(
    index: number,
    total: number,
    stacked: boolean,
): number | [number, number, number, number] {
    if (!stacked || total === 1) return 4
    if (index === 0) return [0, 0, 4, 4]
    if (index === total - 1) return [4, 4, 0, 0]
    return [0, 0, 0, 0]
}

export function BarChart({
    data,
    config,
    categoryKey,
    series,
    className,
    stacked = false,
    showYAxis = false,
}: BarChartProps) {
    return (
        <ChartContainer
            config={config}
            className={cn('aspect-auto h-56 w-full', className)}
        >
            <RechartsBarChart
                accessibilityLayer
                data={data}
                margin={{ left: 12, right: 12 }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={categoryKey}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                {showYAxis && (
                    <YAxis
                        allowDecimals={false}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        width={64}
                        tickFormatter={(value) => Number(value).toLocaleString('cs-CZ')}
                    />
                )}
                <ChartTooltip content={<ChartTooltipContent />} />
                {series.length > 1 && <ChartLegend content={<ChartLegendContent />} />}
                {series.map((key, index) => (
                    <Bar
                        key={key}
                        dataKey={key}
                        fill={`var(--color-${key})`}
                        stackId={stacked ? 'value' : undefined}
                        radius={getBarRadius(index, series.length, stacked)}
                    />
                ))}
            </RechartsBarChart>
        </ChartContainer>
    )
}
