'use client'

import { useId, useMemo } from 'react'
import {
    Bar,
    BarChart as RechartsBarChart,
    CartesianGrid,
    Rectangle,
    ReferenceLine,
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
const AVERAGE_COLOR = '#000'
const AVERAGE_OPACITY = 0.6

export type BarChartProps = {
    data: object[]
    config: ChartConfig
    categoryKey: string
    series: string[]
    /** Series keys rendered against the right Y-axis (vertical charts only). */
    secondarySeries?: string[]
    orientation?: 'vertical' | 'horizontal'
    stacked?: boolean
    /** Gap between category groups; use `0` for bars without spacing. */
    barCategoryGap?: number | string
    showYAxis?: boolean
    hideCategoryTicks?: boolean
    angledXAxis?: boolean
    /** Max characters for category axis ticks; longer labels get an ellipsis. */
    categoryMaxLength?: number
    xAxisLabel?: string
    yAxisLabel?: string
    /** Caps the left/value Y-axis (vertical charts) at this number. */
    yAxisMax?: number
    secondaryYAxisLabel?: string
    className?: string
    formatValue?: (value: number) => string
    formatSecondaryValue?: (value: number) => string
    emptyMessage?: string
    /** When true, draws a dashed reference line at the mean of bar totals. */
    showAverage?: boolean
    /** When false, hides the average entry from the legend (line still renders). */
    showAverageInLegend?: boolean
    /** When set, legend clicks mute/unmute series and persist state in the URL. */
    legendQueryKey?: string
}

function truncateCategoryLabel(value: unknown, maxLength: number) {
    const label = String(value)
    if (label.length <= maxLength) return label
    return `${label.slice(0, Math.max(0, maxLength - 1))}…`
}

/** Fit Y-axis ticks to the longest displayed label, without leftover gutter. */
function categoryYAxisWidth(labels: readonly string[], maxLength?: number) {
    const longest = labels.reduce((max, label) => {
        const displayed = maxLength ? truncateCategoryLabel(label, maxLength) : label
        return Math.max(max, displayed.length)
    }, 0)

    return Math.min(240, Math.max(72, longest * 7 + 16))
}

function rowHasVisibleValue(row: object, keys: string[]) {
    return keys.some((key) => {
        const value = (row as Record<string, unknown>)[key]
        return typeof value === 'number' ? value !== 0 : value != null && value !== ''
    })
}

function isNonZeroValue(value: unknown) {
    return typeof value === 'number' ? value !== 0 : value != null && value !== ''
}

function rowSeriesTotal(row: object, keys: readonly string[]) {
    return keys.reduce((sum, key) => {
        const value = (row as Record<string, unknown>)[key]
        return sum + (typeof value === 'number' && Number.isFinite(value) ? value : 0)
    }, 0)
}

function averageOfChartRows(rows: object[], keys: readonly string[]) {
    if (rows.length === 0 || keys.length === 0) return undefined

    const total = rows.reduce((sum, row) => sum + rowSeriesTotal(row, keys), 0)
    return total / rows.length
}

type BarRadius = number | [number, number, number, number]

/** Round only the outer ends of a stack; middle segments stay square. */
function stackedSegmentRadius(
    payload: Record<string, unknown> | undefined,
    dataKey: string,
    seriesKeys: readonly string[],
    isHorizontal: boolean,
): BarRadius {
    if (!payload) return 4

    const active = seriesKeys.filter((key) => isNonZeroValue(payload[key]))
    if (active.length <= 1) return 4

    const index = active.indexOf(dataKey)
    if (index < 0) return 0

    const isFirst = index === 0
    const isLast = index === active.length - 1

    if (isHorizontal) {
        // Stack grows rightward: round left of first, right of last.
        if (isFirst && isLast) return 4
        if (isFirst) return [4, 0, 0, 4]
        if (isLast) return [0, 4, 4, 0]
        return 0
    }

    // Stack grows upward: round bottom of first, top of last.
    if (isFirst && isLast) return 4
    if (isFirst) return [0, 0, 4, 4]
    if (isLast) return [4, 4, 0, 0]
    return 0
}

export function BarChart({
    data,
    config,
    categoryKey,
    series,
    secondarySeries = [],
    orientation = 'vertical',
    stacked = false,
    barCategoryGap,
    showYAxis = false,
    hideCategoryTicks = false,
    angledXAxis = false,
    categoryMaxLength,
    xAxisLabel,
    yAxisLabel,
    yAxisMax,
    secondaryYAxisLabel,
    className,
    formatValue,
    formatSecondaryValue,
    emptyMessage = 'No data for the selected period.',
    showAverage = false,
    showAverageInLegend = true,
    legendQueryKey,
}: BarChartProps) {
    const reactId = useId().replace(/:/g, '')
    const chartId = legendQueryKey ?? `bar-chart-${reactId}`

    const chartConfig = useMemo(
        () =>
            showAverage && showAverageInLegend
                ? ({
                      ...config,
                      [AVERAGE_KEY]: {
                          label: 'Průměr',
                          color: AVERAGE_COLOR,
                      },
                  } satisfies ChartConfig)
                : config,
        [config, showAverage, showAverageInLegend],
    )

    const { orderedSeries, visibleSeries, mutedKeys, toggleSeries } = useMutedSeries(
        legendQueryKey,
        series,
    )

    const chartData =
        visibleSeries.length === 0
            ? []
            : data.filter((row) => rowHasVisibleValue(row, visibleSeries))

    const keysForAverage = visibleSeries.length > 0 ? visibleSeries : series
    const averageValue = useMemo(() => {
        if (!showAverage) return undefined
        return averageOfChartRows(chartData, keysForAverage)
    }, [showAverage, chartData, keysForAverage])

    const legendItems = [
        ...orderedSeries.map((key) => ({
            dataKey: key,
            color: chartConfig[key]?.color ?? `var(--color-${key})`,
        })),
        ...(showAverage && showAverageInLegend && averageValue != null
            ? [{ dataKey: AVERAGE_KEY, color: AVERAGE_COLOR }]
            : []),
    ]

    if (
        chartData.length === 0 ||
        !chartData.some((row) => rowHasVisibleValue(row, visibleSeries))
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

    const isHorizontal = orientation === 'horizontal'
    const hasSecondaryAxis = !isHorizontal && secondarySeries.length > 0
    const secondarySet = new Set(secondarySeries)
    const visiblePrimarySeries = visibleSeries.filter((key) => !secondarySet.has(key))
    const visibleSecondarySeries = visibleSeries.filter((key) => secondarySet.has(key))
    const formatCategoryTick = categoryMaxLength
        ? (value: unknown) => truncateCategoryLabel(value, categoryMaxLength)
        : undefined
    const categoryAxisWidth = categoryYAxisWidth(
        chartData.map((row) =>
            String((row as Record<string, unknown>)[categoryKey] ?? ''),
        ),
        categoryMaxLength,
    )
    const xAxisHeight = angledXAxis ? (xAxisLabel ? 78 : 56) : xAxisLabel ? 40 : undefined
    // Room for axis label + legend row; legend is pinned to container bottom.
    const bottomMargin = (angledXAxis ? (xAxisLabel ? 28 : 12) : xAxisLabel ? 12 : 4) + 24
    const secondaryKeys = new Set(secondarySeries)
    const leftStackId = `${chartId}-left`
    const rightStackId = `${chartId}-right`

    return (
        <ChartContainer
            id={chartId}
            config={chartConfig}
            className={cn(
                'aspect-auto h-full min-h-56 w-full [&_.recharts-legend-wrapper]:!bottom-0 [&_.recharts-legend-wrapper]:!h-auto [&_.recharts-legend-wrapper]:!w-full',
                className,
            )}
        >
            <RechartsBarChart
                id={chartId}
                accessibilityLayer
                data={chartData}
                layout={isHorizontal ? 'vertical' : 'horizontal'}
                barCategoryGap={barCategoryGap}
                margin={
                    isHorizontal
                        ? {
                              left: yAxisLabel ? 20 : 0,
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
                            tickFormatter={(value) => formatCompactNumber(Number(value))}
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
                            width={categoryAxisWidth}
                            tickFormatter={formatCategoryTick}
                            label={
                                yAxisLabel
                                    ? {
                                          value: yAxisLabel,
                                          angle: -90,
                                          position: 'left',
                                          offset: 12,
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
                            tickFormatter={formatCategoryTick}
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
                                domain={yAxisMax != null ? [0, yAxisMax] : undefined}
                                allowDataOverflow={yAxisMax != null}
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
                    content={(tooltipProps) => {
                        const { content: _content, ...tooltipContentProps } = tooltipProps

                        if (!tooltipProps.active) {
                            return null
                        }

                        const filteredPayload = stacked
                            ? tooltipProps.payload?.filter(
                                  (item) =>
                                      item.type !== 'none' && Number(item.value) !== 0,
                              )
                            : tooltipProps.payload

                        if (!filteredPayload?.length) {
                            return null
                        }

                        const singleValueTooltip =
                            !hasSecondaryAxis && filteredPayload.length === 1

                        const tooltipPayload = singleValueTooltip
                            ? filteredPayload.map((item) => {
                                  const key = String(item.dataKey ?? item.name)
                                  return {
                                      ...item,
                                      name: xAxisLabel ?? 'Hodnota',
                                      color: config[key]?.color ?? `var(--color-${key})`,
                                  }
                              })
                            : filteredPayload

                        return (
                            <ChartTooltipContent
                                {...tooltipContentProps}
                                payload={tooltipPayload}
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
                                                  itemConfig?.color ??
                                                  item.color ??
                                                  (
                                                      item.payload as
                                                          { fill?: string } | undefined
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
                                        : singleValueTooltip
                                          ? (value, name, item) => {
                                                const key = String(
                                                    item.dataKey ?? item.name,
                                                )
                                                const numeric = Number(value)
                                                const formatted = formatValue
                                                    ? formatValue(numeric)
                                                    : formatCompactNumber(numeric)
                                                const color =
                                                    config[key]?.color ??
                                                    item.color ??
                                                    `var(--color-${key})`

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
                                                                {String(name)}
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
                                        Record<string, unknown> | undefined
                                    const category = row?.[categoryKey]
                                    return category != null ? String(category) : ''
                                }}
                            />
                        )
                    }}
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
                {visiblePrimarySeries.map((key, i) => {
                    const barRadius: BarRadius = stacked ? 0 : 4
                    return (
                        <Bar
                            // Remount when stack position changes — Recharts won't
                            // reliably update `radius` on an existing Bar instance.
                            key={`${chartId}-${key}-${i}-${visiblePrimarySeries.length}`}
                            dataKey={key}
                            fill={`var(--color-${key})`}
                            yAxisId={hasSecondaryAxis ? 'left' : undefined}
                            stackId={stacked ? leftStackId : undefined}
                            radius={barRadius}
                            shape={
                                stacked
                                    ? (props) => {
                                          const radius = stackedSegmentRadius(
                                              props.payload as
                                                  Record<string, unknown> | undefined,
                                              key,
                                              visiblePrimarySeries,
                                              isHorizontal,
                                          )
                                          return <Rectangle {...props} radius={radius} />
                                      }
                                    : undefined
                            }
                        />
                    )
                })}
                {hasSecondaryAxis &&
                    visibleSecondarySeries.map((key, i) => {
                        const barRadius: BarRadius = stacked ? 0 : 4
                        return (
                            <Bar
                                key={`${chartId}-${key}-${i}-${visibleSecondarySeries.length}`}
                                dataKey={key}
                                fill={`var(--color-${key})`}
                                yAxisId="right"
                                stackId={stacked ? rightStackId : undefined}
                                radius={barRadius}
                                shape={
                                    stacked
                                        ? (props) => {
                                              const radius = stackedSegmentRadius(
                                                  props.payload as
                                                      Record<string, unknown> | undefined,
                                                  key,
                                                  visibleSecondarySeries,
                                                  isHorizontal,
                                              )
                                              return (
                                                  <Rectangle {...props} radius={radius} />
                                              )
                                          }
                                        : undefined
                                }
                            />
                        )
                    })}
                {showAverage && averageValue != null ? (
                    isHorizontal ? (
                        <ReferenceLine
                            x={averageValue}
                            stroke={AVERAGE_COLOR}
                            strokeDasharray="6 4"
                            strokeWidth={2}
                            strokeOpacity={AVERAGE_OPACITY}
                        />
                    ) : (
                        <ReferenceLine
                            y={averageValue}
                            yAxisId={hasSecondaryAxis ? 'left' : undefined}
                            stroke={AVERAGE_COLOR}
                            strokeDasharray="6 4"
                            strokeWidth={2}
                            strokeOpacity={AVERAGE_OPACITY}
                        />
                    )
                ) : null}
            </RechartsBarChart>
        </ChartContainer>
    )
}
