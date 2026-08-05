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
    ChartLegend,
    ChartLegendContent,
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
    const xAxisHeight = angledXAxis
        ? xAxisLabel
            ? 78
            : 56
        : xAxisLabel
          ? 40
          : undefined
    const bottomMargin = angledXAxis
        ? xAxisLabel
            ? 28
            : 12
        : xAxisLabel
          ? 20
          : 0

    return (
        <ChartContainer
            config={config}
            className={cn('aspect-auto h-full min-h-56 w-full', className)}
        >
            <RechartsLineChart
                accessibilityLayer
                data={data}
                margin={{
                    top: showDots ? 12 : 8,
                    left: showYAxis ? (yAxisLabel ? 8 : 0) : 12,
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
                        width={yAxisLabel ? 56 : 48}
                        tickFormatter={(value) => formatCompactNumber(Number(value))}
                        label={
                            yAxisLabel
                                ? {
                                      value: yAxisLabel,
                                      angle: -90,
                                      position: 'insideLeft',
                                      offset: 12,
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
