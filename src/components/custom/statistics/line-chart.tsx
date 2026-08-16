'use client'

import { useId, useMemo } from 'react'
import {
    CartesianGrid,
    Line,
    LineChart as RechartsLineChart,
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

import { formatCompactNumber } from './format-compact-number'
import { useMutedSeries } from './use-muted-series'

const AVERAGE_KEY = 'average'

export type LineChartProps = {
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
    /**
     * When true, draws a gray “Průměr” line averaging the (visible) series
     * values at each category.
     */
    showAverage?: boolean
    formatValue?: (value: number) => string
    /** When set, legend clicks mute/unmute series and persist state in the URL. */
    legendQueryKey?: string
}

function averageOfRow(
    row: object,
    keys: readonly string[],
): number | undefined {
    const values = keys
        .map((key) => Number((row as Record<string, unknown>)[key]))
        .filter((value) => Number.isFinite(value))
    if (values.length === 0) return undefined
    return values.reduce((sum, value) => sum + value, 0) / values.length
}

export function LineChart({
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
    showAverage = false,
    formatValue,
    legendQueryKey,
}: LineChartProps) {
    const reactId = useId().replace(/:/g, '')
    const chartId = legendQueryKey ?? `line-chart-${reactId}`

    const chartSeries = useMemo(
        () => (showAverage ? [...series, AVERAGE_KEY] : series),
        [series, showAverage],
    )

    const chartConfig = useMemo(
        () =>
            showAverage
                ? ({
                      ...config,
                      [AVERAGE_KEY]: {
                          label: 'Průměr',
                          color: 'var(--muted-foreground)',
                      },
                  } satisfies ChartConfig)
                : config,
        [config, showAverage],
    )

    const { orderedSeries, visibleSeries, mutedKeys, toggleSeries } =
        useMutedSeries(legendQueryKey, chartSeries)

    const dataWithAverage = useMemo(() => {
        if (!showAverage) return data

        const unmutedDataSeries = series.filter((key) =>
            visibleSeries.includes(key),
        )
        const keysForAverage =
            unmutedDataSeries.length > 0 ? unmutedDataSeries : series

        return data.map((row) => ({
            ...row,
            [AVERAGE_KEY]: averageOfRow(row, keysForAverage),
        }))
    }, [data, series, showAverage, visibleSeries])

    const xAxisHeight = angledXAxis
        ? xAxisLabel
            ? 78
            : 56
        : xAxisLabel
          ? 40
          : undefined
    const bottomMargin =
        (angledXAxis ? (xAxisLabel ? 28 : 12) : xAxisLabel ? 12 : 4) + 24
    const legendItems = orderedSeries.map((key) => ({
        dataKey: key,
        color: chartConfig[key]?.color ?? `var(--color-${key})`,
    }))

    return (
        <ChartContainer
            id={chartId}
            config={chartConfig}
            className={cn(
                'aspect-auto h-full min-h-56 w-full [&_.recharts-legend-wrapper]:!bottom-0 [&_.recharts-legend-wrapper]:!h-auto [&_.recharts-legend-wrapper]:!w-full',
                className,
            )}
        >
            <RechartsLineChart
                id={chartId}
                accessibilityLayer
                data={dataWithAverage}
                margin={{
                    top: showDots ? 12 : 8,
                    left: showYAxis ? (yAxisLabel ? 16 : 0) : 12,
                    right: 12,
                    bottom: bottomMargin,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={categoryKey}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    angle={angledXAxis ? -35 : 0}
                    textAnchor={angledXAxis ? 'end' : 'middle'}
                    height={xAxisHeight}
                    interval="preserveStartEnd"
                    label={
                        xAxisLabel
                            ? {
                                  value: xAxisLabel,
                                  position: 'insideBottom',
                                  offset: angledXAxis ? 2 : -2,
                                  style: { textAnchor: 'middle' },
                              }
                            : undefined
                    }
                />
                {showYAxis && (
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        width={48}
                        tickFormatter={(value) =>
                            formatCompactNumber(Number(value))
                        }
                        label={
                            yAxisLabel
                                ? {
                                      value: yAxisLabel,
                                      angle: -90,
                                      position: 'left',
                                      offset: 8,
                                      style: { textAnchor: 'middle' },
                                  }
                                : undefined
                        }
                    />
                )}
                <ChartTooltip
                    position={{ y: 0 }}
                    content={
                        <ChartTooltipContent valueFormatter={formatValue} />
                    }
                />
                <ChartLegend
                    content={
                        <ChartLegendContent
                            items={legendItems}
                            mutedKeys={mutedKeys}
                            onItemClick={toggleSeries}
                        />
                    }
                />
                {visibleSeries.map((key) => {
                    const isAverage = key === AVERAGE_KEY
                    return (
                        <Line
                            key={key}
                            dataKey={key}
                            type="monotone"
                            stroke={`var(--color-${key})`}
                            strokeWidth={2}
                            strokeDasharray={isAverage ? '6 4' : undefined}
                            dot={
                                showDots && !isAverage
                                    ? {
                                          r: 3,
                                          fill: 'var(--background)',
                                          stroke: `var(--color-${key})`,
                                          strokeWidth: 2,
                                      }
                                    : false
                            }
                            activeDot={isAverage ? false : { r: 4 }}
                        />
                    )
                })}
            </RechartsLineChart>
        </ChartContainer>
    )
}
