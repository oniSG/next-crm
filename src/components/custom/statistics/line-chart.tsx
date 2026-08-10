'use client'

import {
    CartesianGrid,
    Line,
    LineChart as RechartsLineChart,
    XAxis,
    YAxis,
} from 'recharts'

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

import { formatCompactNumber } from './format-compact-number'

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
    formatValue?: (value: number) => string
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
    formatValue,
}: LineChartProps) {
    const xAxisHeight = angledXAxis
        ? xAxisLabel
            ? 78
            : 56
        : xAxisLabel
          ? 40
          : undefined
    const bottomMargin = angledXAxis ? (xAxisLabel ? 28 : 12) : xAxisLabel ? 12 : 4

    return (
        <div className={cn('flex w-full flex-col', className)}>
            <ChartContainer
                config={config}
                className="aspect-auto min-h-56 w-full flex-1"
            >
                <RechartsLineChart
                    accessibilityLayer
                    data={data}
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
                        content={
                            <ChartTooltipContent valueFormatter={formatValue} />
                        }
                    />
                    {series.map((key) => (
                        <Line
                            key={key}
                            dataKey={key}
                            type="monotone"
                            stroke={`var(--color-${key})`}
                            strokeWidth={2}
                            dot={
                                showDots
                                    ? {
                                          r: 3,
                                          fill: 'var(--background)',
                                          stroke: `var(--color-${key})`,
                                          strokeWidth: 2,
                                      }
                                    : false
                            }
                            activeDot={{ r: 4 }}
                        />
                    ))}
                </RechartsLineChart>
            </ChartContainer>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs">
                {series.map((key) => {
                    const item = config[key]
                    const color =
                        item && 'color' in item
                            ? item.color
                            : item && 'theme' in item
                              ? item.theme?.light
                              : undefined
                    return (
                        <div key={key} className="flex items-center gap-1.5">
                            <div
                                className="h-2 w-2 shrink-0 rounded-[2px]"
                                style={{ backgroundColor: color }}
                            />
                            <span className="text-muted-foreground">
                                {item?.label ?? key}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
