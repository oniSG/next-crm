'use client'

import { useId } from 'react'
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

import { useMutedSeries } from './use-muted-series'

function rowHasVisibleValue(row: object, keys: readonly string[]) {
    return keys.some((key) => {
        const value = (row as Record<string, unknown>)[key]
        return typeof value === 'number' ? value !== 0 : value != null && value !== ''
    })
}

export type AreaChartProps = {
    data: object[]
    config: ChartConfig
    categoryKey: string
    series: string[]
    stacked?: boolean
    className?: string
    emptyMessage?: string
    /** When set, legend clicks mute/unmute series and persist state in the URL. */
    legendQueryKey?: string
}

export function AreaChart({
    data,
    config,
    categoryKey,
    series,
    stacked = true,
    className,
    emptyMessage = 'No data for the selected period.',
    legendQueryKey,
}: AreaChartProps) {
    const reactId = useId().replace(/:/g, '')
    const chartId = legendQueryKey ?? `area-chart-${reactId}`
    const { orderedSeries, visibleSeries, mutedKeys, toggleSeries } =
        useMutedSeries(legendQueryKey, series)

    const legendItems = orderedSeries.map((key) => ({
        dataKey: key,
        color: config[key]?.color ?? `var(--color-${key})`,
    }))

    if (
        data.length === 0 ||
        !data.some((row) => rowHasVisibleValue(row, visibleSeries))
    ) {
        return (
            <div
                className={cn(
                    'text-muted-foreground flex h-full min-h-56 w-full items-center justify-center px-4 text-center text-sm',
                    className,
                )}
            >
                {emptyMessage}
            </div>
        )
    }

    return (
        <ChartContainer
            id={chartId}
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
                <ChartLegend
                    content={
                        <ChartLegendContent
                            items={legendItems}
                            mutedKeys={mutedKeys}
                            onItemClick={toggleSeries}
                        />
                    }
                />
                {visibleSeries.map((key) => (
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
