'use client'

import { numericFormatter } from 'react-number-format'
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
}

function formatCompactNumber(value: number): string {
    const abs = Math.abs(value)

    if (abs >= 1_000_000) {
        return `${numericFormatter(String(value / 1_000_000), {
            decimalScale: 1,
            decimalSeparator: ',',
        })}M`
    }

    if (abs >= 1_000) {
        return `${numericFormatter(String(value / 1_000), {
            decimalScale: 1,
            decimalSeparator: ',',
        })}k`
    }

    return numericFormatter(String(value), {
        thousandSeparator: ' ',
        decimalScale: 0,
    })
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
}: LineChartProps) {
    return (
        <ChartContainer
            config={config}
            className={cn('aspect-auto h-full min-h-56 w-full', className)}
        >
            <RechartsLineChart
                accessibilityLayer
                data={data}
                margin={{
                    left: showYAxis ? 0 : 12,
                    right: 12,
                    bottom: xAxisLabel || angledXAxis ? 24 : 0,
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
                    height={angledXAxis ? 56 : undefined}
                    label={
                        xAxisLabel
                            ? {
                                  value: xAxisLabel,
                                  position: 'insideBottom',
                                  offset: -4,
                              }
                            : undefined
                    }
                />
                {showYAxis && (
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={4}
                        width={48}
                        tickFormatter={(value) => formatCompactNumber(Number(value))}
                        label={
                            yAxisLabel
                                ? {
                                      value: yAxisLabel,
                                      angle: -90,
                                      position: 'insideLeft',
                                      style: { textAnchor: 'middle' },
                                  }
                                : undefined
                        }
                    />
                )}
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
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
    )
}
