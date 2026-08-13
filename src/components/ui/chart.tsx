'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'
import type { TooltipValueType } from 'recharts'

import { cn } from '@/lib/utils'

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const

const INITIAL_DIMENSION = { width: 320, height: 200 } as const
type TooltipNameType = number | string

export type ChartConfig = Record<
    string,
    {
        label?: React.ReactNode
        icon?: React.ComponentType
    } & (
        | { color?: string; theme?: never }
        | { color?: never; theme: Record<keyof typeof THEMES, string> }
    )
>

type ChartContextProps = {
    config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
    const context = React.useContext(ChartContext)

    if (!context) {
        throw new Error('useChart must be used within a <ChartContainer />')
    }

    return context
}

function ChartContainer({
    id,
    className,
    children,
    config,
    initialDimension = INITIAL_DIMENSION,
    ...props
}: React.ComponentProps<'div'> & {
    config: ChartConfig
    children: React.ComponentProps<
        typeof RechartsPrimitive.ResponsiveContainer
    >['children']
    initialDimension?: {
        width: number
        height: number
    }
}) {
    const uniqueId = React.useId()
    const chartId = `chart-${id ?? uniqueId.replace(/:/g, '')}`

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-slot="chart"
                data-chart={chartId}
                className={cn(
                    "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
                    className,
                )}
                {...props}
            >
                <ChartStyle id={chartId} config={config} />
                <RechartsPrimitive.ResponsiveContainer
                    initialDimension={initialDimension}
                >
                    {children}
                </RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
    const colorConfig = Object.entries(config).filter(
        ([, config]) => config.theme ?? config.color,
    )

    if (!colorConfig.length) {
        return null
    }

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
    .map(([key, itemConfig]) => {
        const color =
            itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color
        return color ? `  --color-${key}: ${color};` : null
    })
    .join('\n')}
}
`,
                    )
                    .join('\n'),
            }}
        />
    )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
    active,
    payload,
    className,
    indicator = 'dot',
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey,
    valueFormatter,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<'div'> & {
        hideLabel?: boolean
        hideIndicator?: boolean
        indicator?: 'line' | 'dot' | 'dashed'
        nameKey?: string
        labelKey?: string
        valueFormatter?: (value: number) => string
    } & Omit<
        RechartsPrimitive.DefaultTooltipContentProps<TooltipValueType, TooltipNameType>,
        'accessibilityLayer'
    >) {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
        if (hideLabel || !payload?.length) {
            return null
        }

        const [item] = payload
        const key = `${labelKey ?? item?.dataKey ?? item?.name ?? 'value'}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)
        const value =
            !labelKey && typeof label === 'string'
                ? (config[label]?.label ?? label)
                : itemConfig?.label

        if (labelFormatter) {
            return (
                <div className={cn('font-medium', labelClassName)}>
                    {labelFormatter(value, payload)}
                </div>
            )
        }

        if (!value) {
            return null
        }

        return <div className={cn('font-medium', labelClassName)}>{value}</div>
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])

    if (!active || !payload?.length) {
        return null
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot'

    return (
        <div
            className={cn(
                'border-border/50 bg-background grid w-max min-w-32 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
                className,
            )}
        >
            {!nestLabel ? tooltipLabel : null}
            <div className="grid gap-1.5">
                {payload
                    .filter((item) => item.type !== 'none')
                    .map((item, index) => {
                        const key = `${nameKey ?? item.name ?? item.dataKey ?? 'value'}`
                        const itemConfig = getPayloadConfigFromPayload(config, item, key)
                        const indicatorColor = color ?? item.payload?.fill ?? item.color

                        return (
                            <div
                                key={index}
                                className={cn(
                                    '[&>svg]:text-muted-foreground flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                                    indicator === 'dot' && 'items-center',
                                )}
                            >
                                {formatter && item?.value !== undefined && item.name ? (
                                    formatter(
                                        item.value,
                                        item.name,
                                        item,
                                        index,
                                        item.payload,
                                    )
                                ) : (
                                    <>
                                        {itemConfig?.icon ? (
                                            <itemConfig.icon />
                                        ) : (
                                            !hideIndicator && (
                                                <div
                                                    className={cn(
                                                        'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
                                                        {
                                                            'h-2.5 w-2.5':
                                                                indicator === 'dot',
                                                            'w-1': indicator === 'line',
                                                            'w-0 border-[1.5px] border-dashed bg-transparent':
                                                                indicator === 'dashed',
                                                            'my-0.5':
                                                                nestLabel &&
                                                                indicator === 'dashed',
                                                        },
                                                    )}
                                                    style={
                                                        {
                                                            '--color-bg': indicatorColor,
                                                            '--color-border':
                                                                indicatorColor,
                                                        } as React.CSSProperties
                                                    }
                                                />
                                            )
                                        )}
                                        <div
                                            className={cn(
                                                'flex flex-1 justify-between gap-4 leading-none',
                                                nestLabel ? 'items-end' : 'items-center',
                                            )}
                                        >
                                            <div className="grid gap-1.5">
                                                {nestLabel ? tooltipLabel : null}
                                                <span className="text-muted-foreground whitespace-nowrap">
                                                    {itemConfig?.label ?? item.name}
                                                </span>
                                            </div>
                                            {item.value != null && (
                                                <span className="text-foreground font-mono font-medium whitespace-nowrap tabular-nums">
                                                    {typeof item.value === 'number'
                                                        ? valueFormatter
                                                            ? valueFormatter(item.value)
                                                            : item.value.toLocaleString(
                                                                  'cs-CZ',
                                                              )
                                                        : String(item.value)}
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

const ChartLegend = RechartsPrimitive.Legend

export type ChartLegendItem = {
    dataKey: string
    color?: string
}

type LegendPayloadItem = NonNullable<
    RechartsPrimitive.DefaultLegendContentProps['payload']
>[number]

type ResolvedLegendItem = {
    /** Unique React key; deduplicated when two items share a dataKey. */
    key: string
    /** Semantic series key used for config lookup, muting and clicks. */
    dataKey: string
    color?: string
    payloadItem?: LegendPayloadItem
}

function getLegendItemKey(item: LegendPayloadItem, nameKey?: string): string {
    if (nameKey) {
        const nestedPayload =
            typeof item.payload === 'object' && item.payload !== null
                ? (item.payload as Record<string, unknown>)
                : undefined
        const candidates = [
            (item as unknown as Record<string, unknown>)[nameKey],
            nestedPayload?.[nameKey],
            // Pie legend payload often stores the slice name in `value`.
            item.value,
        ]
        for (const candidate of candidates) {
            if (typeof candidate === 'string' || typeof candidate === 'number') {
                return String(candidate)
            }
        }
    }

    // `dataKey` may also be an accessor function; only literals are usable.
    if (typeof item.dataKey === 'string' || typeof item.dataKey === 'number') {
        return String(item.dataKey)
    }

    return 'value'
}

function resolveLegendItems(
    config: ChartConfig,
    items: ChartLegendItem[] | undefined,
    payload: RechartsPrimitive.DefaultLegendContentProps['payload'],
    nameKey?: string,
): ResolvedLegendItem[] {
    const withoutKeys = items
        ? items.map((item) => ({
              dataKey: item.dataKey,
              color:
                  item.color ??
                  config[item.dataKey]?.color ??
                  `var(--color-${item.dataKey})`,
          }))
        : (payload ?? [])
              .filter((item) => item.type !== 'none')
              .map((item) => ({
                  dataKey: getLegendItemKey(item, nameKey),
                  color: item.color,
                  payloadItem: item,
              }))

    // Two items can resolve to the same dataKey (e.g. shared fallback);
    // suffix duplicates so React keys stay unique.
    const seen = new Map<string, number>()
    return withoutKeys.map((item) => {
        const occurrence = seen.get(item.dataKey) ?? 0
        seen.set(item.dataKey, occurrence + 1)
        return {
            ...item,
            key: occurrence === 0 ? item.dataKey : `${item.dataKey}-${occurrence}`,
        }
    })
}

function ChartLegendContent({
    className,
    hideIcon = false,
    payload,
    verticalAlign = 'bottom',
    nameKey,
    mutedKeys,
    onItemClick,
    items,
}: React.ComponentProps<'div'> & {
    hideIcon?: boolean
    nameKey?: string
    mutedKeys?: string[]
    onItemClick?: (key: string) => void
    items?: ChartLegendItem[]
} & RechartsPrimitive.DefaultLegendContentProps) {
    const { config } = useChart()
    const mutedSet = new Set(mutedKeys)
    const interactive = Boolean(onItemClick)

    const legendItems = resolveLegendItems(config, items, payload, nameKey)
    if (!legendItems.length) {
        return null
    }

    return (
        <div
            className={cn(
                'flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5',
                verticalAlign === 'top' ? 'pb-2' : 'pt-2 pb-0',
                className,
            )}
        >
            {legendItems.map((item) => {
                const itemConfig = item.payloadItem
                    ? getPayloadConfigFromPayload(config, item.payloadItem, item.dataKey)
                    : config[item.dataKey]
                const isMuted = mutedSet.has(item.dataKey)

                const content = (
                    <>
                        {itemConfig?.icon && !hideIcon ? (
                            <itemConfig.icon />
                        ) : (
                            <div
                                className="h-2 w-2 shrink-0 rounded-[2px]"
                                style={{ backgroundColor: item.color }}
                            />
                        )}
                        {itemConfig?.label ?? item.dataKey}
                    </>
                )

                const itemClassName = cn(
                    '[&>svg]:text-muted-foreground flex shrink-0 items-center gap-1.5 whitespace-nowrap [&>svg]:h-3 [&>svg]:w-3',
                    isMuted && 'text-muted-foreground opacity-50',
                    interactive &&
                        'hover:text-foreground cursor-pointer hover:underline',
                )

                if (interactive) {
                    return (
                        <button
                            key={item.key}
                            type="button"
                            className={itemClassName}
                            aria-pressed={!isMuted}
                            onClick={() => onItemClick?.(item.dataKey)}
                        >
                            {content}
                        </button>
                    )
                }

                return (
                    <div key={item.key} className={itemClassName}>
                        {content}
                    </div>
                )
            })}
        </div>
    )
}

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
    if (typeof payload !== 'object' || payload === null) {
        return undefined
    }

    const payloadPayload =
        'payload' in payload &&
        typeof payload.payload === 'object' &&
        payload.payload !== null
            ? payload.payload
            : undefined

    let configLabelKey: string = key

    if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
        configLabelKey = payload[key as keyof typeof payload] as string
    } else if (
        payloadPayload &&
        key in payloadPayload &&
        typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
    ) {
        configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string
    }

    return configLabelKey in config ? config[configLabelKey] : config[key]
}

export {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
}
