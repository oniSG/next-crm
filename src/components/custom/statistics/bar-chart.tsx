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

import { formatCompactNumber } from './format-compact-number'

export type BarChartProps = {
    data: object[]
    config: ChartConfig
    categoryKey: string
    series: string[]
    orientation?: 'vertical' | 'horizontal'
    stacked?: boolean
    showYAxis?: boolean
    hideCategoryTicks?: boolean
    xAxisLabel?: string
    yAxisLabel?: string
    className?: string
    formatValue?: (value: number) => string
}

function getBarRadius(
    index: number,
    total: number,
    stacked: boolean,
    orientation: 'vertical' | 'horizontal',
): number | [number, number, number, number] {
    if (!stacked || total === 1) return 4
    if (orientation === 'vertical') {
        if (index === 0) return [0, 0, 4, 4]
        if (index === total - 1) return [4, 4, 0, 0]
        return [0, 0, 0, 0]
    }
    if (index === 0) return [4, 0, 0, 4]
    if (index === total - 1) return [0, 4, 4, 0]
    return [0, 0, 0, 0]
}

export function BarChart({
    data,
    config,
    categoryKey,
    series,
    orientation = 'vertical',
    stacked = false,
    showYAxis = false,
    hideCategoryTicks = false,
    xAxisLabel,
    yAxisLabel,
    className,
    formatValue,
}: BarChartProps) {
    const isHorizontal = orientation === 'horizontal'
    const xAxisHeight = xAxisLabel ? 40 : undefined
    // Room for axis label + legend row; legend is pinned to container bottom.
    const bottomMargin = (xAxisLabel ? 12 : 4) + 24

    return (
        <ChartContainer
            config={config}
            className={cn(
                'aspect-auto h-full min-h-56 w-full [&_.recharts-legend-wrapper]:!bottom-0 [&_.recharts-legend-wrapper]:!h-auto',
                className,
            )}
        >
            <RechartsBarChart
                accessibilityLayer
                data={data}
                layout={isHorizontal ? 'vertical' : 'horizontal'}
                margin={
                    isHorizontal
                        ? {
                              left: yAxisLabel ? 16 : 8,
                              right: 12,
                              bottom: bottomMargin,
                          }
                        : {
                              left: yAxisLabel ? 16 : 12,
                              right: 12,
                              bottom: bottomMargin,
                          }
                }
            >
                {isHorizontal ? (
                    <>
                        <CartesianGrid horizontal={false} />
                        <XAxis
                            type="number"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            height={xAxisHeight}
                            tickFormatter={(value) =>
                                formatCompactNumber(Number(value))
                            }
                            label={
                                xAxisLabel
                                    ? {
                                          value: xAxisLabel,
                                          position: 'insideBottom',
                                          offset: -2,
                                          style: { textAnchor: 'middle' },
                                      }
                                    : undefined
                            }
                        />
                        <YAxis
                            dataKey={categoryKey}
                            type="category"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            width={88}
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
                    </>
                ) : (
                    <>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={categoryKey}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            height={xAxisHeight}
                            tick={hideCategoryTicks ? false : undefined}
                            label={
                                xAxisLabel
                                    ? {
                                          value: xAxisLabel,
                                          position: 'insideBottom',
                                          offset: -2,
                                          style: { textAnchor: 'middle' },
                                      }
                                    : undefined
                            }
                        />
                        {showYAxis && (
                            <YAxis
                                allowDecimals={false}
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
                    </>
                )}
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            valueFormatter={formatValue}
                            labelFormatter={(_value, tooltipPayload) => {
                                const row = tooltipPayload?.[0]?.payload as
                                    | Record<string, unknown>
                                    | undefined
                                const category = row?.[categoryKey]
                                return category != null ? String(category) : ''
                            }}
                        />
                    }
                />
                <ChartLegend content={<ChartLegendContent />} />
                {series.map((key, i) => (
                    <Bar
                        key={key}
                        dataKey={key}
                        fill={`var(--color-${key})`}
                        stackId={stacked ? 'a' : undefined}
                        radius={getBarRadius(i, series.length, stacked, orientation)}
                    />
                ))}
            </RechartsBarChart>
        </ChartContainer>
    )
}
