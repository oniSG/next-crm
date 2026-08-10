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
    /** Series keys rendered against the right Y-axis (vertical charts only). */
    secondarySeries?: string[]
    orientation?: 'vertical' | 'horizontal'
    stacked?: boolean
    showYAxis?: boolean
    hideCategoryTicks?: boolean
    angledXAxis?: boolean
    xAxisLabel?: string
    yAxisLabel?: string
    secondaryYAxisLabel?: string
    className?: string
    formatValue?: (value: number) => string
    formatSecondaryValue?: (value: number) => string
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
    secondarySeries = [],
    orientation = 'vertical',
    stacked = false,
    showYAxis = false,
    hideCategoryTicks = false,
    angledXAxis = false,
    xAxisLabel,
    yAxisLabel,
    secondaryYAxisLabel,
    className,
    formatValue,
    formatSecondaryValue,
}: BarChartProps) {
    const isHorizontal = orientation === 'horizontal'
    const hasSecondaryAxis = !isHorizontal && secondarySeries.length > 0
    const primarySeries = hasSecondaryAxis
        ? series.filter((key) => !secondarySeries.includes(key))
        : series
    const xAxisHeight = angledXAxis
        ? xAxisLabel
            ? 78
            : 56
        : xAxisLabel
          ? 40
          : undefined
    // Room for axis label + legend row; legend is pinned to container bottom.
    const bottomMargin = (angledXAxis ? (xAxisLabel ? 28 : 12) : xAxisLabel ? 12 : 4) + 24
    const secondaryKeys = new Set(secondarySeries)

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
                              right: hasSecondaryAxis
                                  ? secondaryYAxisLabel
                                      ? 28
                                      : 16
                                  : 12,
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
                            angle={angledXAxis ? -35 : 0}
                            textAnchor={angledXAxis ? 'end' : 'middle'}
                            minTickGap={angledXAxis ? 24 : undefined}
                            interval={angledXAxis ? 'preserveStartEnd' : undefined}
                            tick={hideCategoryTicks ? false : undefined}
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
                        {(showYAxis || hasSecondaryAxis) && (
                            <YAxis
                                yAxisId={hasSecondaryAxis ? 'left' : undefined}
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
                        {hasSecondaryAxis && (
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                width={52}
                                tickFormatter={(value) =>
                                    formatCompactNumber(Number(value))
                                }
                                label={
                                    secondaryYAxisLabel
                                        ? {
                                              value: secondaryYAxisLabel,
                                              angle: 90,
                                              position: 'right',
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
                            formatter={
                                hasSecondaryAxis
                                    ? (value, name, item) => {
                                          const key = String(
                                              typeof item.dataKey === 'function'
                                                  ? name
                                                  : (item.dataKey ?? name),
                                          )
                                          const numeric = Number(value)
                                          const formatted =
                                              secondaryKeys.has(key) &&
                                              formatSecondaryValue
                                                  ? formatSecondaryValue(numeric)
                                                  : formatValue
                                                    ? formatValue(numeric)
                                                    : formatCompactNumber(numeric)
                                          const itemConfig = config[key]
                                          const color =
                                              item.color ??
                                              (
                                                  item.payload as
                                                      | { fill?: string }
                                                      | undefined
                                              )?.fill

                                          return (
                                              <div className="flex w-full items-center gap-2">
                                                  <div
                                                      className="h-2 w-2 shrink-0 rounded-[2px]"
                                                      style={{
                                                          backgroundColor: color,
                                                      }}
                                                  />
                                                  <div className="flex flex-1 items-center justify-between gap-4 leading-none">
                                                      <span className="text-muted-foreground">
                                                          {itemConfig?.label ??
                                                              String(name)}
                                                      </span>
                                                      <span className="font-mono font-medium tabular-nums">
                                                          {formatted}
                                                      </span>
                                                  </div>
                                              </div>
                                          )
                                      }
                                    : undefined
                            }
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
                {primarySeries.map((key, i) => (
                    <Bar
                        key={key}
                        dataKey={key}
                        fill={`var(--color-${key})`}
                        yAxisId={hasSecondaryAxis ? 'left' : undefined}
                        stackId={stacked ? 'left' : undefined}
                        radius={getBarRadius(
                            i,
                            primarySeries.length,
                            stacked,
                            orientation,
                        )}
                    />
                ))}
                {hasSecondaryAxis &&
                    secondarySeries.map((key, i) => (
                        <Bar
                            key={key}
                            dataKey={key}
                            fill={`var(--color-${key})`}
                            yAxisId="right"
                            stackId={stacked ? 'right' : undefined}
                            radius={getBarRadius(
                                i,
                                secondarySeries.length,
                                stacked,
                                orientation,
                            )}
                        />
                    ))}
            </RechartsBarChart>
        </ChartContainer>
    )
}
